// Citas textuales de lo generado con IA: la app comprueba que estén en el PDF, lo muestra al revisar
// y las guarda con el ítem (área, varias páginas y aviso si no se encontraron).
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("citaEnTexto: encuentra la cita aunque el PDF cambie espacios, guiones o intercale referencias", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  const r = await page.evaluate(() => {
    const doc = "Tics must be present either daily, nearly every day or intermit-\ntently for at least a year 149 for diagnosis. α 2 -adrenergic agonists (clonidine or guanfacine)";
    return [citaEnTexto("Tics must be present either daily, nearly every day or intermittently for at least a year for diagnosis.", doc),
      citaEnTexto("α2-adrenergic agonists (clonidine or guanfacine)", doc),
      citaEnTexto("Tics are preceded by an uncomfortable urge that patients can usually hold back.", doc)];
  });
  expect(r).toEqual([true, true, false]);
});

test("al revisar: cada cita dice si está en el PDF, el área y las páginas; al guardar se conserva", async ({ page }) => {
  errores = vigilarErrores(page);
  await abrirConClave(page); await subirPdf(page);
  // la primera cita se arma con una frase real del PDF de prueba
  const real = await page.evaluate(() => recCache[cur().id].pages[0].replace(/\s+/g, " ").slice(0, 120).trim());
  await simularIA(page, () => ({json: {questions: [], fichas: [
    {specialty: "Medicina Interna", area: "Neurología", title: "Ficha con cita real", badge: "", thresholds: [{label: "a", val: "b"}], redFlag: "", trap: "", relevance: 5, why: "", page: 1, citas: [{texto: real, page: 1}]},
    {specialty: "Medicina Interna", area: "Neurología", title: "Ficha con cita inventada", badge: "", thresholds: [{label: "a", val: "b"}], redFlag: "", trap: "", relevance: 4, why: "", page: 1,
      citas: [{texto: "Esta frase no está en ningún lugar del documento de prueba que se subió.", page: 2}]}]}}));
  await page.click('#genCard [data-gt="ai"]'); await page.click("#aGo");
  await expect(page.locator("#candList")).toBeVisible();
  await expect(page.locator("#reviewBox")).toContainText("1 ítem con citas que no aparecen en el PDF");
  await expect(page.locator("#cand0")).toContainText("✓ Está en el PDF");
  await expect(page.locator("#cand1")).toContainText("No aparece en el PDF");
  await expect(page.locator("#cand1")).toContainText("págs. 1, 2");
  await expect(page.locator("#cand0")).toContainText("Área: Neurología");
  await page.click("#candSave");
  const h = await page.evaluate(() => S.userH.map(h => [h.area, h.pages || null, h.cita[0].donde]));
  expect(h).toEqual([["Neurología", null, "pág. 1"], ["Neurología", [1, 2], "pág. 2 · ⚠️ no se encontró en el PDF"]]);
  expect(await page.evaluate(() => citaHtml(S.userH[0]))).toContain("cita textual del documento");
});

test("las instrucciones piden citas textuales, el área y no inventar trampas ni el porqué", async ({ page }) => {
  errores = vigilarErrores(page);
  const peticiones = await simularIA(page, () => ({json: {questions: [], fichas: []}}));
  await abrirConClave(page); await subirPdf(page);
  await page.click('#genCard [data-gt="ai"]'); await page.click("#aGo");
  await expect.poll(() => peticiones.length).toBeGreaterThan(0);
  const p = peticiones.at(-1);
  expect(p.system).toContain("copiadas textualmente del documento");
  expect(p.system).toContain("deja ese campo vacío");
  expect(p.output_config.format.schema.properties.fichas.items.required).toEqual(expect.arrayContaining(["citas", "area"]));
});
