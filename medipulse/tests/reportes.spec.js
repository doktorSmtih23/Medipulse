// Reportes de preguntas (reportes.js): se guardan en el dispositivo y se pueden enviar a quien revisa la app
// con el menú de compartir del teléfono (o copiados en el computador). No pasan por ningún servidor.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  // El menú de compartir del sistema, simulado: guarda lo que se compartió.
  await page.addInitScript(() => { window.__compartido = []; navigator.share = d => { window.__compartido.push(d); return Promise.resolve(); }; });
  await page.goto("/");
});

test("después de reportar un caso, se envía con un toque y el texto dice qué caso, el motivo y el detalle", async ({ page }) => {
  const q = await page.evaluate(() => { const q = QUESTIONS[0]; startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: q.id}]}]}); return {id: q.id, spec: q.specialty}; });
  await page.click("#opts .opt >> nth=0");
  await page.click("#repBtn");
  await page.selectOption(".repR", {index: 2});
  await page.fill(".repC", "La B también parece correcta");
  await page.click(".repSend");
  await expect(page.locator(".repShare")).toBeVisible();
  expect(await sinDesborde(page)).toBe(true);
  await page.click(".repShare");
  const d = await page.evaluate(() => window.__compartido);
  expect(d.length).toBe(1);
  expect(d[0].text).toContain("Dos opciones parecen correctas");
  expect(d[0].text).toContain("Detalle: La B también parece correcta");
  expect(d[0].text).toContain("Ítem: q" + q.id);
  expect(d[0].text).toContain(q.spec);
});

test("en Reportes: enviar todos los abiertos juntos o uno solo", async ({ page }) => {
  await page.evaluate(() => {
    [0, 1, 2].forEach(i => S.reports.push({id: "r" + i, key: "q" + QUESTIONS[i].id, at: Date.now(), reason: REP_REASONS[0], comment: "", status: i === 2 ? "done" : "open"}));
    save(); go("rep");
  });
  await expect(page.locator("#repShareAll")).toHaveText("📤 Enviar los 2 abiertos a quien revisa la app");
  await page.click("#repShareAll");
  await page.click('#repList summary >> text=Abiertos');
  await page.click('[data-rsh="r0"]');
  const d = await page.evaluate(() => window.__compartido.map(x => x.text));
  expect(d[0]).toContain("Reportes de MediPulse (2)");
  expect(d[1]).toContain("Reporte de MediPulse (1)");
});
