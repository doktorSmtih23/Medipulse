// Procesamiento del texto de un documento (js/texto-pdf.js): limpieza y detección de capítulos, sin IA.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, subirPdf } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("quita encabezados alternos, pies y marcas de agua, y conserva el contenido", async ({ page }) => {
  const temas = ["sobre sepsis", "de la CAD", "de preeclampsia", "sobre hiperkalemia", "del crup", "del neumotórax"];
  const limpio = await page.evaluate(temas => stripRepeated(temas.map((t, i) => {
    const n = i + 1, enc = n % 2 ? `Revista ${100 + n} www.revista.com Vol 7` : `www.revista.com Vol 7 ${100 + n}`;
    return `${enc}\nTexto clínico ${t}.\nDescargado para Dra. Ejemplo (ejemplo@correo.com) el 1 de enero.`;
  })), temas);
  expect(limpio).toEqual(temas.map(t => `Texto clínico ${t}.`));
});

test("una marca de agua de descarga se quita aunque el documento tenga una sola página", async ({ page }) => {
  const limpio = await page.evaluate(() => stripRepeated(["Dosis: 30 mL/kg.\nDownloaded for Jane Doe (jane@mail.com) at Hospital."]));
  expect(limpio).toEqual(["Dosis: 30 mL/kg."]);
});

test("reconoce títulos de sección y descarta renglones de párrafo y afiliaciones", async ({ page }) => {
  const r = await page.evaluate(() => ({
    titulo: isHeading("Clinical presentation"),
    parrafo: isHeading("IWG perspective: clinical–biological definition of"),
    afiliacion: isHeading("Department of Neurology, Boston"),
    figura: isHeading("Figure 2: Neuropathological stages")
  }));
  expect(r).toEqual({titulo: true, parrafo: false, afiliacion: false, figura: false});
});

test("una marca de agua con letras espaciadas también se quita", async ({ page }) => {
  const limpio = await page.evaluate(() => stripRepeated(["Texto.\nD e s c a r g a d o p a r a D r a . X ( x @ c o r r e o . c o m )"]));
  expect(limpio).toEqual(["Texto."]);
});

test("PDF de prueba: temas sin IA, sin referencias y sin pie personal", async ({ page }) => {
  await subirPdf(page);
  // el PDF de prueba sí trae el pie con el correo en cada página (si no, esta prueba no comprobaría nada)
  const crudo = await page.evaluate(() => recCache[cur().id].pages);
  expect(crudo.every(p => /prueba@correo\.com/.test(p.replace(/\s+/g, "")))).toBe(true);
  const d = await page.evaluate(() => { const s = cur(), i = docInfo(s.id), t = i.pages.join("\n");
    return {caps: (indiceDeTitulos(s, i, s.pages) || []).length, refs: /Fearnley/.test(t), pie: /prueba@correo|Descargado para/.test(t), contenido: /AAV2-GAD/.test(t)}; });
  expect(d).toEqual({caps: expect.any(Number), refs: false, pie: false, contenido: true});
  expect(d.caps).toBeGreaterThanOrEqual(2);
});
