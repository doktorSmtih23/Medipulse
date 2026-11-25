// Pantalla Hoy (hoy.js): pulso hacia la meta, recuadro que cambia (perla, relámpago, semana, reto) y
// «Tu examen completo» con flechas de tendencia y la lista que escala con muchas especialidades.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });

// Registro de 14 días: «esp» da [respondidos, acertados] por especialidad; «esta» para los últimos 7 días, «antes» para los 7 anteriores.
async function sembrar(page, esta, antes){
  await page.evaluate(([esta, antes]) => {
    for (let d = 0; d < 14; d++) { const esp = JSON.parse(JSON.stringify(d < 7 ? esta : antes));
      const q = Object.values(esp).reduce((a, x) => a + x[0], 0), ok = Object.values(esp).reduce((a, x) => a + x[1], 0);
      S.log[todayKey(new Date(Date.now() - d * DAY))] = {sec: 600, q, ok, c: 0, esp}; }
    save(); renderHoy();
  }, [esta, antes]);
}

test("el pulso avanza con los minutos de hoy y marca la meta cumplida", async ({ page }) => {
  await page.evaluate(() => { logToday().sec = 10 * 60; S.metaMin = 25; save(); renderHoy(); });
  await expect(page.locator("#todayCard .pulso-min")).toContainText("10 de 25 min");
  await expect(page.locator("#todayCard .pulso-pie")).toContainText("faltan 15 min");
  const izq = await page.locator(".ecg-pto").evaluate(e => e.style.left);
  expect(izq).toBe("40%");
  await page.evaluate(() => { logToday().sec = 30 * 60; save(); renderHoy(); });
  await expect(page.locator("#todayCard .pulso-pie")).toContainText("✓ Meta cumplida");
  await expect(page.locator(".ecg-pto.lleno")).toHaveCount(1);
});

test("recuadro que cambia: 4 recuadros con sus puntos; los puntos llevan a cada uno", async ({ page }) => {
  await expect(page.locator("#rotaDots button")).toHaveCount(4);
  await expect(page.locator("#rotaDots button.on")).toHaveCount(1);
  await page.click('#rotaDots [data-rota="3"]');
  await expect(page.locator('#rotaDots [data-rota="3"]')).toHaveClass(/on/);
  await expect(page.locator("#retoCard")).toContainText("RETO DE 3 MINUTOS");
  await page.click("#doReto");
  await expect(page.locator("#sessBody")).toBeVisible();
  expect(await page.evaluate(() => [sess.stages[0].items.length, sess.stages[0].limit, sess.stages[0].exam])).toEqual([3, 180, true]);
});

test("pregunta relámpago: se responde con un toque y cuenta como un caso de su especialidad", async ({ page }) => {
  const q = await page.evaluate(() => { const q = relPregunta(); return {id: q.id, spec: q.specialty, correct: q.correct}; });
  await page.click('#rotaDots [data-rota="1"]');
  await page.click(`#relCard [data-rel="${q.correct}"]`);
  await expect(page.locator("#relCard .rel-fb")).toContainText("✓ Correcto");
  await expect(page.locator("#relCard [data-rel]").first()).toBeDisabled();
  const r = await page.evaluate(spec => { const l = logToday(); return [l.q, l.ok, l.esp[spec]]; }, q.spec);
  expect(r).toEqual([1, 1, [1, 1]]);
  expect(await page.evaluate(id => !!S.srs["q" + id], q.id)).toBe(true);
  // Durante el día es la misma y queda respondida.
  await page.evaluate(() => renderHoy());
  expect(await page.evaluate(() => String(relPregunta().id))).toBe(String(q.id));
  await expect(page.locator("#relCard .rel-fb")).toBeVisible();
});

test("responder un caso en una sesión suma al registro del día por especialidad", async ({ page }) => {
  await page.evaluate(() => { const q = QUESTIONS[0]; startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: q.id}]}]}); });
  const spec = await page.evaluate(() => QUESTIONS[0].specialty);
  await page.click("#opts .opt >> nth=0");
  const e = await page.evaluate(spec => logToday().esp[spec], spec);
  expect(e[0]).toBe(1);
});

test("tu semana compara con la anterior; sin semana anterior no inventa la comparación", async ({ page }) => {
  await expect(page.locator("#semCard")).toContainText("La comparación aparece cuando tengas una semana anterior");
  await expect(page.locator("#semCard .tend")).toHaveCount(0);
  await sembrar(page, {"Pediatría": [10, 8]}, {"Pediatría": [10, 5]});
  await expect(page.locator("#semCard")).not.toContainText("La comparación aparece");
  await expect(page.locator("#semCard .sem-f", {hasText: "Aciertos"})).toContainText("80 %");
  await expect(page.locator("#semCard .sem-f", {hasText: "Aciertos"}).locator(".tend.up")).toHaveCount(1);
});

test("tu examen completo: de la más baja a la más alta, flechas solo con datos de ambas semanas", async ({ page }) => {
  await expect(page.locator("#areasCard")).toContainText("Responde 3 casos o más");
  await page.evaluate(() => {
    const pon = (spec, n, ok) => QUESTIONS.filter(q => q.specialty === spec).slice(0, n).forEach((q, i) => { S.srs["q" + q.id] = {b: 1, due: Date.now() + 9e9, n: 1, ok: i < ok ? 1 : 0, last: 2}; });
    pon("Pediatría", 10, 8); pon("Cirugía", 10, 4); pon("Ginecología", 10, 6);
  });
  await sembrar(page, {"Cirugía": [5, 1], "Pediatría": [5, 4]}, {"Cirugía": [5, 4], "Pediatría": [5, 4]});
  const filas = page.locator("#areasCard .area");
  await expect(filas).toHaveCount(3);
  await expect(filas.nth(0)).toContainText("Cirugía");
  await expect(filas.nth(0).locator(".tend.down")).toHaveCount(1);       // bajó: 80 % → 20 %
  await expect(filas.nth(2)).toContainText("Pediatría");
  await expect(filas.nth(2).locator(".tend")).toHaveText("→");           // igual
  await expect(filas.nth(1).locator(".tend")).toHaveText("");             // Ginecología: sin registro por día
  await expect(page.locator("#areasCard .areas-barra i")).toHaveCount(3);
  await expect(page.locator("#areasCard")).toContainText("5 sin datos todavía");
  await filas.nth(0).click();
  await expect(page.locator("#sessBody")).toBeVisible();
});

test("con muchas especialidades: 6 filas y «Ver las N»; más de 12 agrupa la barra en tres", async ({ page }) => {
  await page.evaluate(() => {
    for (let i = 0; i < 9; i++) crearEspecialidad("Especialidad extra " + i);
    const st = {}; ESPS().forEach((s, i) => st[s] = {n: 10, ok: 3 + (i % 6), seen: 1, total: 1});
    window.specStats = () => st; save(); renderHoy();
  });
  await expect(page.locator("#areasCard .area")).toHaveCount(6);
  await expect(page.locator("#areasMas")).toHaveText("Ver las 17 especialidades ›");
  await expect(page.locator("#areasCard .areas-barra.grupos i")).toHaveCount(3);
  await page.click("#areasMas");
  await expect(page.locator("#areasCard .area")).toHaveCount(17);
  expect(await sinDesborde(page)).toBe(true);
});

test("los estilos de Apariencia no pisan los selectores de Casos y Crear (mismo nombre de clase)", async ({ page }) => {
  await page.evaluate(() => go("banco"));
  const casos = await page.locator("#qModo button").first().evaluate(e => [getComputedStyle(e).borderTopWidth, getComputedStyle(e.parentElement).backgroundColor]);
  expect(casos).toEqual(["2px", "rgba(0, 0, 0, 0)"]);   // tarjetas con borde, sin franja de fondo
  await page.click("#themeBtn");
  await expect(page.locator("#apariencia .modo-seg button")).toHaveCount(3);
});
