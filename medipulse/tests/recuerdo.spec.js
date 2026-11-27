// Recuerdo libre (recuerdo.js): la pregunta abierta de lo que fallas. El caso sin opciones, las cifras de la
// perla de memoria, la respuesta y la autocalificación (solo agenda el repaso; no cambia las estadísticas).
// Con clave de IA, la IA corrige lo escrito comparándolo solo con el caso.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("las cifras de la perla se completan de memoria; los años no se ocultan", async ({ page }) => {
  await page.goto("/");
  const r = await page.evaluate(() => [recuerdoCifras("NICE 2019: bolo de 10 mg/kg en 1 h, meta 135/85").map(c => c.v), recuerdoPregunta({vignette: "Mujer de 30 años. <b>Dato</b>. ¿Qué haces ahora?"})]);
  expect(r).toEqual([["10", "1", "135"], {caso: "Mujer de 30 años. Dato.", preg: "¿Qué haces ahora?"}]);
});

test("tras fallar, el resumen ofrece el recuerdo libre: sin opciones, cifras de memoria y autocalificación", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: 4}]}]}));
  await page.click("#opts .opt >> nth=2");   // incorrecta
  await page.click("#nextBtn");
  await page.click("#recBtn");
  await expect(page.locator("#opts")).toHaveCount(0);
  await expect(page.locator("#sessBody")).toContainText("Sin opciones:");
  await expect(page.locator("#sessBody [data-hueco]")).toHaveCount(2);   // 135/85 de la perla
  expect(await sinDesborde(page)).toBe(true);
  const antes = await page.evaluate(() => ({n: S.srs.q4.n, ok: S.srs.q4.ok}));
  await page.fill("#recTxt", "Sulfato de magnesio y labetalol");
  await page.fill('[data-hueco="0"]', "135"); await page.fill('[data-hueco="1"]', "80");
  await page.click("#recVer");
  await expect(page.locator("#recFb")).toContainText("Respuesta: Sulfato de magnesio");
  await expect(page.locator("#sessBody")).toContainText("Cifras: 1 de 2 (escribiste 135, 80)");
  await expect(page.locator(".rc-cifra.mal")).toHaveText("85");
  await page.click('[data-rg="0"]');
  // No la tenía: vuelve mañana desde el principio, sin sumar respuestas a las estadísticas
  const r = await page.evaluate(() => ({n: S.srs.q4.n, ok: S.srs.q4.ok, b: S.srs.q4.b, dias: Math.round((S.srs.q4.due - Date.now()) / 864e5)}));
  expect(r).toEqual({...antes, b: 0, dias: 1});
  await expect(page.locator("#sessBody")).toContainText("Recuerdo libre: la tenías en 0 de 1 · cifras de memoria: 1 de 2");
});

test("lo que más fallas: errores con seguridad primero, luego lo fallado varias veces y por umbral o dosis", async ({ page }) => {
  await page.goto("/");
  const ids = await page.evaluate(() => {
    const [a, b, c, d] = QUESTIONS.slice(0, 4).map(q => String(q.id)), t = Date.now();
    S.resp = [{id: a, d: t, ok: false, o: 0, ex: 1, c: "seguro"}, {id: c, d: t, ok: false, o: 0, ex: 0, m: "umbral"}];
    S.srs["q" + b] = {b: 0, due: t, n: 3, ok: 1, last: 0}; S.srs["q" + d] = {b: 2, due: t, n: 2, ok: 2, last: 2};
    save(); return {a, b, c, lista: recuerdoVulnerables()};
  });
  expect(ids.lista.slice(0, 3)).toEqual([ids.a, ids.b, ids.c]);
  expect(ids.lista).toHaveLength(3);   // el que domina no entra
  // En «Mis vulnerabilidades» del banco
  await page.evaluate(() => { for (let i = 0; i < 10; i++) S.srs["q" + QUESTIONS[10 + i].id] = {b: 1, due: Date.now() + DAY, n: 1, ok: 1, last: 2}; prac().modo = "vuln"; save(); go("banco"); });
  await page.click("#vulnRec");
  expect(await page.evaluate(() => stage().items.map(it => it.t + it.id))).toEqual(ids.lista.map(id => "o" + id));
});

test("con clave de IA: corrige lo escrito solo con la explicación del caso", async ({ page, browserName }) => {
  test.fixme(browserName === "webkit", "En WebKit la llamada simulada a la IA llega al servidor real (401): page.route no intercepta esa petición; limitación del entorno de pruebas");
  const pet = await simularIA(page, () => ({tool: "corregir_recuerdo", input: {nota: "parcial", bien: "El magnesio.", falta: "El antihipertensivo de acción rápida.", error: ""}}));
  await abrirConClave(page);
  await page.evaluate(() => empezarRecuerdo(["4"], "Prueba"));
  await page.fill("#recTxt", "Sulfato de magnesio");
  await page.click("#recVer");
  await page.click("#recIA");
  await expect(page.locator("#recIABox")).toContainText("~ Parcial");
  await expect(page.locator("#recIABox")).toContainText("Te faltó: El antihipertensivo de acción rápida.");
  expect(pet.at(-1).system).toContain("no uses conocimiento propio");
  expect(JSON.stringify(pet.at(-1).messages)).toContain("LO QUE ESCRIBIÓ EL MÉDICO: Sulfato de magnesio");
});
