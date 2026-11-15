// Estudiar por temas (js/indice.js): índice limpio y recomendaciones completas sin IA.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, abrirConClave, subirPdf } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  await abrirConClave(page);
  await subirPdf(page);
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("el índice descarta glosarios de abreviaturas, palabras sueltas y títulos cortados", async ({ page }) => {
  const r = await page.evaluate(() => ["Intravenous Thrombolysis", "TOP TAKE-HOME MESSAGES", "Imaging Approaches", "Management",
    "ASA American Stroke Association", "CT computed tomography", "COR class of recommendation", "patients", "Brain Swelling (Medical", "References"].map(t => [t, tituloValido(t)]));
  expect(Object.fromEntries(r)).toEqual({"Intravenous Thrombolysis": true, "TOP TAKE-HOME MESSAGES": true, "Imaging Approaches": true, "Management": true,
    "ASA American Stroke Association": false, "CT computed tomography": false, "COR class of recommendation": false, "patients": false, "Brain Swelling (Medical": false, "References": false});
});

test("cada tema termina donde empieza el siguiente del mismo nivel", async ({ page }) => {
  const r = await page.evaluate(() => conHasta([{title: "A", from: 2, lvl: 1}, {title: "A.1", from: 3, lvl: 2}, {title: "A.2", from: 5, lvl: 2}, {title: "B", from: 8, lvl: 1}], 12).map(x => [x.title, x.from, x.to]));
  expect(r).toEqual([["A", 2, 8], ["A.1", 3, 5], ["A.2", 5, 8], ["B", 8, 12]]);
});

test("recomendaciones: enunciados completos, con su clase y la cifra con unidad completa", async ({ page }) => {
  const r = await page.evaluate(() => buscarRecomendaciones({nums: [4], pages: [
    "Blood pressure management\n1 B-NR In patients with AIS, intensive systolic BP lowering to\n< 140 mm Hg is not recommended even after complete reperfusion. 2a B-R Tenecteplase 0.25 mg/kg is reasonable within 4.5 hours of onset. Figure 2 shows the algorithm."]}));
  expect(r.map(x => [x.clase, x.cifras, x.page])).toEqual([["COR 1 · LOE B-NR", ["< 140 mm Hg"], 4], ["COR 2a · LOE B-R", ["0.25 mg/kg", "4.5 hours"], 4]]);
  expect(r[0].text).toBe("In patients with AIS, intensive systolic BP lowering to < 140 mm Hg is not recommended even after complete reperfusion.");
});

test("recomendaciones en pantalla: se marcan y pasan a una ficha con su clase como rótulo", async ({ page }) => {
  await page.evaluate(() => { docInfo(cur().id).pages[1] = "1 B-NR In patients with AIS, intensive systolic BP lowering to < 140 mm Hg is not recommended. 2a B-R Tenecteplase 0.25 mg/kg is reasonable within 4.5 hours."; gen.tab = "recs"; renderGen(); });
  await expect(page.locator("#gBody .cand")).toHaveCount(2);
  await expect(page.locator("#gBody")).toContainText("COR 1 · LOE B-NR");
  await page.check('[data-ri="0"]');
  await page.click("#recMake");
  expect(await page.inputValue("#recEd .eL >> nth=0")).toContain("COR 1 · LOE B-NR");
  expect(await page.inputValue("#recEd .eV >> nth=0")).toContain("< 140 mm Hg is not recommended");
});

test("elegir páginas a mano sigue disponible", async ({ page }) => {
  await page.click("#genCard summary:has-text('Elegir páginas a mano')");
  await page.fill("#manFrom", "2"); await page.fill("#manTo", "3"); await page.click("#manGo");
  await expect(page.locator("#genCard")).toContainText("Tema: Págs. 2–3");
  expect(await page.evaluate(() => temaSel().nums)).toEqual([2, 3]);
});
