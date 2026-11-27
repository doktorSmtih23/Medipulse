// Seguridad del lector de PDF: pdf.js 3.x puede ejecutar código desde un PDF manipulado (CVE-2024-4367) si no se
// desactiva isEvalSupported. Se comprueba en la app funcionando y en el código fuente (toda apertura pasa por abrirPdf).
const fs = require("fs"), path = require("path");
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("todo PDF se abre con isEvalSupported: false", async ({ page }) => {
  await page.goto("/");
  const bytes = [...fs.readFileSync(path.join(__dirname, "fixtures", "articulo-prueba.pdf"))];
  const r = await page.evaluate(async bytes => {
    // Las opciones con que abrirPdf llama a pdf.js (con un pdf.js simulado: el real no deja espiar getDocument)
    const opciones = await abrirPdf({getDocument: o => ({promise: Promise.resolve(o)})}, new Uint8Array([1]));
    // Y un PDF real se sigue leyendo con esas opciones
    const paginas = await extractPages(new Uint8Array(bytes).buffer);
    return {eval: opciones.isEvalSupported, datos: opciones.data.length, paginas: paginas.length};
  }, bytes);
  expect(r).toEqual({eval: false, datos: 1, paginas: expect.any(Number)});
  expect(r.paginas).toBeGreaterThan(0);
});

test("en el código, getDocument solo se llama desde abrirPdf", () => {
  const dir = path.join(__dirname, "..", "js");
  const llamadas = fs.readdirSync(dir).filter(f => f.endsWith(".js")).flatMap(f =>
    fs.readFileSync(path.join(dir, f), "utf8").split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => /getDocument\(/.test(l)));
  expect(llamadas.map(([f, i]) => `${f}:${i}`)).toEqual([expect.stringMatching(/^fuentes\.js:/)]);
  expect(llamadas[0][2]).toContain("const abrirPdf");
  expect(fs.readFileSync(path.join(dir, "fuentes.js"), "utf8")).toMatch(/PDF_OPCIONES = \{isEvalSupported: false\}/);
});
