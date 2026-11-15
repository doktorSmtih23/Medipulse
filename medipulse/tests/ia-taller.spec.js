// Taller de preguntas con IA (js/taller.js): fichas automáticas por relevancia, siempre con revisión.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf } = require("./ayudas");

const FICHAS = {questions: [], fichas: [
  {specialty: "Medicina Interna", title: "Seguridad de la terapia génica", badge: "Seguridad", thresholds: [{label: "Eventos graves", val: "Del procedimiento neuroquirúrgico"}], redFlag: "Hemorragia intracraneal", trap: "Atribuirlos al vector", relevance: 3, why: "Riesgo principal", page: 3},
  {specialty: "Medicina Interna", title: "AAV2-GAD fase II", badge: "Ensayo fase II", thresholds: [{label: "UPDRS (GAD)", val: "23.1 %"}, {label: "UPDRS (sham)", val: "12.7 %"}], redFlag: "", trap: "", relevance: 5, why: "Ensayo controlado positivo", page: 2},
  {specialty: "Especialidad inventada", title: "Ficha sin datos", badge: "", thresholds: [], redFlag: "", trap: "", relevance: 9, why: "", page: 40}]};

let errores, peticiones;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  peticiones = await simularIA(page, () => ({json: FICHAS}));
  await abrirConClave(page);
  await subirPdf(page);
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("fichas automáticas: ordenadas por relevancia, filtradas y revisadas antes de guardar", async ({ page }) => {
  await page.click("#aGo");
  await expect(page.locator("#candList")).toBeVisible();
  // la ficha sin datos se descarta; la más relevante va primero
  await expect(page.locator("#candList [data-k=title]")).toHaveCount(2);
  expect(await page.locator("#candList [data-k=title]").evaluateAll(els => els.map(e => e.value))).toEqual(["AAV2-GAD fase II", "Seguridad de la terapia génica"]);
  expect(await page.evaluate(() => S.userH.length)).toBe(0);
  await page.click("#candSave");
  const fichas = await page.evaluate(() => S.userH.map(h => [h.title, h.relevance, h.ai]));
  expect(fichas).toEqual([["AAV2-GAD fase II", 5, true], ["Seguridad de la terapia génica", 3, true]]);
});

test("la petición usa esquema JSON y no envía referencias ni datos personales", async ({ page }) => {
  await page.click("#aGo"); await expect(page.locator("#candList")).toBeVisible();
  const p = peticiones[0], texto = p.messages[0].content.map(b => b.text).join("\n");
  expect(p.output_config.format.type).toBe("json_schema");
  expect(texto).toContain("23.1%");
  expect(texto).not.toContain("Fearnley");
  expect(texto.replace(/\s+/g, "")).not.toMatch(/prueba@correo\.com|Descargadopara|RevistadePrueba/);
});
