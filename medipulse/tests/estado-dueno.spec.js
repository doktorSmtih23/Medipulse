// Las funciones del dueño del progreso (js/estado.js, js/fuentes.js): los flujos que las usan y que no tenían
// prueba propia. Cada uno revisa que el cambio quede en S y que el repaso del ítem se vaya con él.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, subirPdf } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });   // vigilarErrores acepta los «¿Seguro?»
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

const caso = id => ({id, specialty: "Medicina Interna", tipo: "conducta", qtype: "caso", topic: "Prueba · Caso propio", vignette: "Viñeta de prueba",
  options: ["Uno", "Dos", "Tres", "Cuatro"], correct: 0, whyCorrect: "Porque sí", manual: true});

test("Crear: eliminar un caso propio lo quita del banco y de los repasos", async ({ page }) => {
  const id = await page.evaluate(c => { const q = agregarPropio("q", Object.assign(c, {id: nuevoIdPropio()})); grade("q" + q.id, 0); rebuild(); save(); return q.id; }, caso(""));
  await page.evaluate(() => go("new"));
  await page.evaluate(k => document.querySelector(`[data-mdel="${k}"]`).click(), "q" + id);
  expect(await page.evaluate(k => [S.userQ.length, !!S.srs[k], !!qById(k.slice(1))], "q" + id)).toEqual([0, false, false]);
});

test("Fichas: eliminar una ficha propia la quita y borra su repaso", async ({ page }) => {
  const id = await page.evaluate(() => { const h = agregarPropio("h", {id: nuevoIdPropio(), specialty: "Pediatría", title: "Ficha de prueba", badge: "", thresholds: [{label: "Dato", val: "1"}], redFlag: "", trap: "", manual: true});
    grade("h" + h.id, 2); rebuild(); save(); return h.id; });
  await page.click("nav [data-go=banco]"); await page.click(".grupotabs [data-go=tarjetas]");
  // La ficha se arma al abrirla.
  await page.evaluate(id => { const d = document.querySelector(`#hyList .hyrow[data-hid="${id}"]`); d.open = true; d.ontoggle(); }, id);
  await page.evaluate(id => document.querySelector(`[data-hdel="${id}"]`).click(), id);
  expect(await page.evaluate(id => [S.userH.length, !!S.srs["h" + id]], id)).toEqual([0, false]);
});

test("Fuentes: eliminar un documento quita la fuente, sus ítems y sus repasos", async ({ page }) => {
  await subirPdf(page);
  const src = await page.evaluate(() => S.sources[0].id);
  await page.evaluate(src => { const q = agregarPropio("q", Object.assign({}, {id: nuevoIdPropio(), specialty: "Cirugía", topic: "De la fuente", vignette: "V", options: ["a", "b", "c", "d"], correct: 1, whyCorrect: "w", src}));
    grade("q" + q.id, 0); rebuild(); save(); }, src);
  await page.click("#srcDel");
  await expect.poll(() => page.evaluate(() => S.sources.length)).toBe(0);
  expect(await page.evaluate(() => [S.userQ.length, Object.keys(S.srs).filter(k => k.startsWith("qu")).length])).toEqual([0, 0]);
});

test("Reportes: archivar el ítem reportado lo saca del banco y cierra el reporte", async ({ page }) => {
  const id = await page.evaluate(() => { const q = QUESTIONS[0]; S.reports.push({id: "r1", key: "q" + q.id, at: Date.now(), reason: "dato", comment: "", status: "open"}); save(); go("rep"); return q.id; });
  await page.evaluate(() => document.querySelector('[data-rarch="r1"]').click());
  expect(await page.evaluate(id => [!!S.hidden["q" + id], !!qById(id), S.reports[0].status], id)).toEqual([true, false, "done"]);
});
