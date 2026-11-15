// Banco de casos (js/banco.js) y la pregunta en sesión: filtros, búsqueda, lista por tema, pasar,
// archivar y restaurar, cita según el tipo de fuente y especialidad editable.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); await page.click("nav [data-go=banco]"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("selectores de especialidad, tipo y estado; la lista no muestra el tema ni la fuente", async ({ page }) => {
  await expect(page.locator("#qSelSpec option >> nth=1")).toContainText(/Medicina Interna \(\d+\)/);
  await page.selectOption("#qSelTipo", "diagnostico");
  const tipos = await page.$$eval("#qList [data-q1]", bs => bs.map(b => qKind(qById(b.dataset.q1))));
  expect(tipos.length).toBeGreaterThan(5);
  expect(new Set(tipos)).toEqual(new Set(["diagnostico"]));
  // sin pistas: ni el tema ni la fuente aparecen en la lista
  const texto = await page.textContent("#qList");
  expect(texto).not.toMatch(/Kawasaki|TEP|Tourette|Neumolog/);
  await page.selectOption("#qSelTipo", "");
  await page.fill("#qQuery", "kawasaki");
  await expect.poll(() => page.$$eval("#qList [data-q1]", bs => bs.length > 3 && bs.every(b => { const q = qById(b.dataset.q1); return /kawasaki/i.test(q.topic + q.vignette + (srcInfo(q.src) || {}).t); }))).toBe(true);
  expect(await sinDesborde(page)).toBe(true);
});

test("estudiar un caso o una especialidad desde la lista; el tema se ve solo al responder", async ({ page }) => {
  await page.selectOption("#qSelSpec", "Pediatría");
  await page.locator("#qList [data-q1]").first().click();
  expect(await page.evaluate(() => sess.stages[0].items.length)).toBe(1);
  const topic = await page.evaluate(() => qById(sess.stages[0].items[0].id).topic);
  await expect(page.locator("#sessBody")).not.toContainText(topic);
  await page.click("#opts .opt >> nth=0");
  await expect(page.locator("#fbBox")).toContainText("Tema: " + topic);
  await page.click("#quitBtn");
  await page.click("nav [data-go=banco]");
  await page.locator("#qList [data-qg]").first().click();
  expect(await page.evaluate(() => sess.stages[0].items.length)).toBeGreaterThan(1);
});

test("corregir la especialidad de un caso desde el banco", async ({ page }) => {
  await page.selectOption("#qSelSpec", "Medicina Interna");
  const id = await page.locator("#qList [data-qe]").first().getAttribute("data-qe");
  await page.click(`#qList [data-qe="${id}"]`);
  await page.selectOption(`#qList [data-qesel="${id}"]`, "Pediatría");
  expect(await page.evaluate(i => qById(i).specialty, id)).toBe("Pediatría");
});

test("pasar una pregunta no la califica y el resumen lo dice", async ({ page }) => {
  await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: 2}, {t: "q", id: 3}]}]}));
  await page.click("#skipBtn");
  expect(await page.evaluate(() => [sess.i, !!S.srs.q2])).toEqual([1, false]);
  await page.click("#opts .opt >> nth=0");
  await expect(page.locator("#skipBtn")).toHaveCount(0);
  await page.click("#nextBtn");
  await expect(page.locator("#sessBody")).toContainText("Pasaste 1 pregunta");
});

test("archivar un caso al responder y restaurarlo desde el banco", async ({ page }) => {
  await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: 2}]}]}));
  await page.click("#opts .opt >> nth=0");
  await page.click("#archBtn");
  await expect(page.locator("#fbBox")).toContainText("Archivado");
  expect(await page.evaluate(() => !!qById(2))).toBe(false);
  await page.click("#nextBtn");
  await page.click("nav [data-go=banco]");
  await page.click("#qList details.ocultos summary");
  await page.click("#qList [data-unh='q2']");
  expect(await page.evaluate(() => !!qById(2))).toBe(true);
});

test("la cita dice «del documento» cuando la fuente es un artículo", async ({ page }) => {
  const r = await page.evaluate(() => [citaHtml(qById("mi-c09")), citaHtml(qById("mi-c03"))]);
  expect(r[0]).toContain("cita textual del documento");
  expect(r[1]).toContain("cita textual de la guía");
});

test("corregir la especialidad de una pregunta guardada", async ({ page }) => {
  await page.evaluate(() => { S.userQ.push({id: "u9", specialty: "Medicina Interna", topic: "Tics", vignette: "Niño con tics…", options: ["a", "b", "c", "d"], correct: 0, whyCorrect: "w", pearl: "p", trap: "t", ai: true}); rebuild();
    const b = document.createElement("div"); b.id = "tbox"; document.body.appendChild(b); openCorregir("q", qById("u9"), b); });
  await page.selectOption("#tbox [data-qe=specialty]", "Pediatría");
  await page.click("#tbox [data-corr-save]");
  expect(await page.evaluate(() => qById("u9").specialty)).toBe("Pediatría");
});

test.describe("al revisar lo generado con IA", () => {
  test("se puede reasignar la especialidad antes de guardar", async ({ page }) => {
    await simularIA(page, () => ({json: {fichas: [{specialty: "Medicina Interna", title: "Tourette", badge: "", thresholds: [{label: "Tics", val: "Motores + fónico, > 1 año"}], redFlag: "", trap: "", relevance: 4, why: "", page: 1}],
      questions: [{qtype: "caso", specialty: "Medicina Interna", topic: "Tics", vignette: "Niño de 9 años con tics…", options: ["Tourette", "TOC", "Tics provisionales", "Corea"], correct: 0, whyCorrect: "w", pearl: "p", trap: "t", page: 1}]}}));
    await abrirConClave(page); await subirPdf(page);
    await page.click('#genCard [data-gt="ai"]'); await page.click("#aGo");
    await expect(page.locator("#candList")).toBeVisible();
    await page.click("#candList summary:has-text('Editar esta pregunta')");
    await page.selectOption("#candList [data-qe=specialty]", "Pediatría");
    await page.click("#candList summary:has-text('Editar esta ficha')");
    await page.selectOption("#candList [data-k=specialty]", "Pediatría");
    await page.click("#candSave");
    expect(await page.evaluate(() => [S.userQ[0].specialty, S.userH[0].specialty])).toEqual(["Pediatría", "Pediatría"]);
  });
});
