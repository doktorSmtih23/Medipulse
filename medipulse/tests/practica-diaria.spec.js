// Práctica diaria (sesion.js, vulnerabilidades.js, estado.js): la confianza se marca antes de ver la respuesta
// también fuera del simulacro; lo acertado sin seguridad vuelve mañana con lo fallado; el motivo «umbral o dosis»;
// el bloque de refuerzo cuando una celda acumula 3 fallos en 14 días; y al final, las fichas de lo que fallaste.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  // Estas pruebas prenden la pregunta de confianza (en las demás está apagada).
  await page.addInitScript(() => { if (!sessionStorage.getItem("conf")) { localStorage.setItem("medipulse_confianza", "1"); sessionStorage.setItem("conf", "1"); } });
  await page.goto("/");
});

// Abre una sesión con unas preguntas del banco; devuelve id, correcta y una incorrecta de cada una.
const abrir = (page, n = 1) => page.evaluate(n => {
  const qs = QUESTIONS.slice(0, n);
  startSession({label: "x", tag: "norm", stages: [{name: "x", items: qs.map(q => ({t: "q", id: q.id}))}]});
  return qs.map(q => ({id: q.id, ok: q.correct, mal: (q.correct + 1) % q.options.length}));
}, n);

test("antes de ver la respuesta se marca la confianza; un acierto al azar vuelve mañana con lo fallado", async ({ page }) => {
  const [q] = await abrir(page);
  await page.click(`#opts .opt >> nth=${q.ok}`);
  // Elegir no revela la respuesta: primero cómo la respondiste
  await expect(page.locator("#fbBox")).toBeEmpty();
  await expect(page.locator("#confRow")).toContainText("¿Qué tan seguro estás?");
  await expect(page.locator(`#opts .opt >> nth=${q.ok}`)).toHaveClass(/sel/);
  expect(await sinDesborde(page)).toBe(true);
  await page.click('[data-confp="azar"]');
  await expect(page.locator("#fbBox")).toContainText("✓ Correcto");
  await expect(page.locator("#fbBox .audnota")).toContainText("Acierto frágil");
  const r = await page.evaluate(id => { const x = S.srs["q" + id]; return {b: x.b, frag: x.frag, dias: Math.round((x.due - Date.now()) / 864e5), c: S.resp[S.resp.length - 1].c}; }, q.id);
  expect(r).toEqual({b: 0, frag: 1, dias: 1, c: "azar"});
  // Cuando toca el repaso, Hoy dice que incluye lo acertado sin seguridad
  await page.evaluate(id => { S.srs["q" + id].due = 0; save(); endSession(false); go("hoy"); }, q.id);
  await expect(page.locator("#doDue")).toContainText("1 acertada sin seguridad");
});

test("seguro y acierta avanza; seguro y falla es el error más peligroso; el motivo «umbral o dosis»", async ({ page }) => {
  const [a, b] = await abrir(page, 2);
  await page.click(`#opts .opt >> nth=${a.ok}`);
  await page.click('[data-confp="seguro"]');
  await expect(page.locator("#fbBox .audnota")).toHaveCount(0);
  expect(await page.evaluate(id => S.srs["q" + id].b, a.id)).toBe(1);
  await page.click("#nextBtn");
  await page.click(`#opts .opt >> nth=${b.mal}`);
  await page.click('[data-confp="seguro"]');
  await expect(page.locator("#fbBox .audnota")).toContainText("Error con seguridad");
  await page.click('[data-mot="umbral"]');
  expect(await page.evaluate(() => S.resp[S.resp.length - 1].m)).toBe("umbral");
});

test("se puede ver sin marcar o apagar la pregunta, y se vuelve a prender en Practicar", async ({ page }) => {
  const [a, b] = await abrir(page, 2);
  await page.click(`#opts .opt >> nth=${a.ok}`);
  await page.click("#confVer");
  await expect(page.locator("#fbBox")).toContainText("✓ Correcto");
  expect(await page.evaluate(id => S.srs["q" + id].frag, a.id)).toBeUndefined();
  await page.click("#nextBtn");
  await page.click(`#opts .opt >> nth=${b.ok}`);
  await page.click("#confNo");
  await expect(page.locator("#fbBox")).toContainText("✓ Correcto");
  expect(await page.evaluate(() => localStorage.getItem("medipulse_confianza"))).toBe("0");
  await page.evaluate(() => { endSession(false); go("banco"); });
  await expect(page.locator("#qConf")).not.toBeChecked();
  await page.check("#qConf");
  expect(await page.evaluate(() => localStorage.getItem("medipulse_confianza"))).toBe("1");
  // La práctica ofrece 60 casos, la sesión diaria que pide el examen
  await expect(page.locator('#qNs [data-n="60"]')).toBeVisible();
});

test("3 fallos en 14 días en un tipo de pregunta de una especialidad: bloque de refuerzo con preguntas nuevas", async ({ page }) => {
  const info = await page.evaluate(() => {
    // La celda con más casos en el banco, para que haya preguntas nuevas
    const c = {}; QUESTIONS.forEach(q => { const k = q.specialty + "|" + qKind(q); (c[k] = c[k] || []).push(q); });
    const [k, qs] = Object.entries(c).sort((a, b) => b[1].length - a[1].length)[0];
    const ahora = Date.now();
    // Dos fallos recientes y uno de hace 20 días: todavía no hay bloque
    S.resp = [qs[0], qs[1], qs[2]].map((q, i) => ({id: String(q.id), d: i === 2 ? ahora - 20 * DAY : ahora - DAY, ok: false, o: 0, ex: 0}));
    [qs[0], qs[1], qs[2]].forEach(q => grade("q" + q.id, 0)); S.srs["q" + qs[0].id].due = ahora + DAY; S.srs["q" + qs[1].id].due = ahora + DAY; S.srs["q" + qs[2].id].due = ahora + DAY;
    const antes = refuerzoPendiente();
    S.resp.push({id: String(qs[3].id), d: ahora - 2 * DAY, ok: false, o: 0, ex: 0}); grade("q" + qs[3].id, 0); S.srs["q" + qs[3].id].due = ahora + DAY;
    save(); go("hoy");
    return {k, antes, fallados: [qs[0], qs[1], qs[2], qs[3]].map(q => q.id)};
  });
  expect(info.antes).toBeNull();
  await expect(page.locator("#doRef")).toContainText("Bloque de refuerzo");
  await expect(page.locator("#suggestCard")).toContainText("Fallaste 3 preguntas");
  await page.click("#doRef");
  await expect(page.locator("#sessBody")).toBeVisible();
  const r = await page.evaluate(k => ({celda: sess.stages[0].items.every(it => { const q = qById(it.id); return q.specialty + "|" + qKind(q) === k; }),
    n: sess.stages[0].items.length, primeras: sess.stages[0].items.slice(0, 3).map(it => !!S.srs["q" + it.id]), hecho: !!S.refuerzo[k]}), info.k);
  expect(r).toEqual({celda: true, n: 10, primeras: [false, false, false], hecho: true});
  // Hecho el bloque, esos fallos ya no lo vuelven a pedir
  expect(await page.evaluate(() => refuerzoPendiente())).toBeNull();
});

test("al terminar: las fichas de umbrales y dosis de lo que fallaste", async ({ page }) => {
  const q = await page.evaluate(() => {
    const q = QUESTIONS.find(x => /[a-zñ]{6,}/i.test(norm(x.topic || "")));
    const w = norm(q.topic).split(/[^a-z0-9ñ]+/).find(x => x.length >= 6 && !FICHA_VACIAS.has(x));
    S.userH.push({id: "u900", specialty: q.specialty, title: "Umbrales de " + w, thresholds: [{label: "Dosis", val: "10 mg/kg"}]}); rebuild(); save();
    startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: q.id}]}]});
    return {id: q.id, mal: (q.correct + 1) % q.options.length};
  });
  await page.click(`#opts .opt >> nth=${q.mal}`);
  await page.click('[data-confp="dude"]');
  await page.click("#nextBtn");
  await expect(page.locator("#fichasFallo")).toHaveText("📌 Fichas de umbrales y dosis de lo que fallaste (1)");
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#fichasFallo");
  expect(await page.evaluate(() => sess.stages[0].items)).toEqual([{t: "h", id: "u900"}]);
});

test("si no hay fichas del tema fallado, se dice cuál y dónde crearlas", async ({ page }) => {
  await page.evaluate(() => { HYS = []; });
  const [q] = await abrir(page);
  await page.click(`#opts .opt >> nth=${q.mal}`);
  await page.click("#confVer");
  await page.click("#nextBtn");
  await expect(page.locator("#sessBody")).toContainText("Todavía no hay fichas de umbrales y dosis de este tema");
  await expect(page.locator("#sessBody")).toContainText("«Crear pregunta o ficha»");
});
