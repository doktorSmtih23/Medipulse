// Diagnóstico inicial (diagnostico.js): parte 1 en bloques de 10, candados sin bloquear la app y modo de prueba.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
// Estas pruebas apagan el modo de prueba (las demás corren con él) para ver los candados.
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/?prueba=0");
});

test("la selección: hasta 10 casos por área, mezclando tipos de pregunta, siempre los mismos y en bloques de 10 con todas las áreas", async ({ page }) => {
  const r = await page.evaluate(() => { const p1 = diagP1(), por = {}, tipos = new Set();
    p1.ids.forEach(id => { const q = qById(id); por[q.specialty] = (por[q.specialty] || 0) + 1; tipos.add(qKind(q)); });
    const otra = diagP1().ids.join(); const b1 = new Set(diagBloques(p1)[0].map(id => qById(id).specialty));
    return {por, tipos: tipos.size, igual: otra === p1.ids.join(), bloques: diagBloques(p1).map(b => b.length), areasB1: b1.size}; });
  Object.values(r.por).forEach(n => expect(n).toBeLessThanOrEqual(10));
  Object.values(r.por).forEach(n => expect(n).toBe(10));                 // 10 casos por área
  expect(Object.keys(r.por)).toHaveLength(6);
  expect(r.tipos).toBeGreaterThanOrEqual(3);
  expect(r.igual).toBe(true);
  expect(r.bloques.every(n => n <= 10)).toBe(true);
  expect(r.areasB1).toBe(6);
});

test("Hoy propone el diagnóstico y «A tope» espera; Casos deja 10 libres al día, sin simulacro ni vulnerabilidades; Progreso también espera", async ({ page }) => {
  await expect(page.locator("#suggestCard")).toContainText("Primero, tu diagnóstico");
  await expect(page.locator('[data-mode="beast"]')).toContainText("🔒");
  await page.click('[data-mode="beast"]');
  await expect(page.locator("#v-diag")).toBeVisible();
  await page.click("nav [data-go=banco]");
  await expect(page.locator("#qLibres")).toContainText("10 casos libres");
  await expect(page.locator("#qExam")).toBeHidden();
  await page.click('#qModo [data-modo="vuln"]');
  await expect(page.locator("#qVulnCand")).toContainText("se abre con tu diagnóstico");
  // Gastados los 10 casos libres de hoy, el botón cambia por el candado.
  await page.evaluate(() => { for (let i = 0; i < 10; i++) S.resp.push({id: "x" + i, d: Date.now(), ok: true, o: 0}); save(); });
  await page.click('#qModo [data-modo="azar"]');
  await expect(page.locator("#qCand")).toBeVisible();
  await expect(page.locator("#pr10")).toBeHidden();
  await page.click("nav [data-go=prog]");
  await expect(page.locator("#progDiag")).toContainText("se abre con tu diagnóstico");
  await expect(page.locator("#v-prog .progdet").first()).toBeHidden();
  expect(await sinDesborde(page)).toBe(true);
});

test("un bloque del diagnóstico: modo examen, auditoría y queda hecho; al terminar todos se abren los candados", async ({ page }) => {
  await page.click("#doDiag");
  await expect(page.locator("#diagBox")).toContainText("Bloque 1");
  await expect(page.locator("#diagBox")).toContainText("16 preguntas sobre tu tiempo");
  await expect(page.locator("#diagBox")).not.toContainText("${");
  await page.click('[data-dbl="0"]');
  const n = await page.evaluate(() => sess.stages[0].items.length);
  expect(await page.evaluate(() => sess.stages[0].exam)).toBe(true);
  for (let i = 0; i < n; i++) { await page.click("#opts .opt >> nth=0"); await page.click("#nextBtn"); }
  await page.click("#auditSkip");
  await page.click("#contBtn");
  await page.click("nav [data-go=hoy]"); await page.click("#doDiag");
  await expect(page.locator("#diagBox")).toContainText(`Parte 1: ${n} de`);
  // Todos los bloques hechos → diagnóstico de la parte 1 terminado.
  await page.evaluate(() => { const p1 = diagP1(); p1.hechos = p1.ids.slice(); p1.fin = Date.now(); save(); });
  expect(await page.evaluate(() => diagHecho())).toBe(true);
  await page.click("nav [data-go=banco]");
  await expect(page.locator("#qExam")).toBeAttached();
  await expect(page.locator("#qLibres")).toHaveCount(0);
});

test("modo de prueba: ?prueba=1 quita los candados en este dispositivo y se apaga desde Progreso", async ({ page }) => {
  await page.goto("/?prueba=1");
  expect(await page.evaluate(() => [diagHecho(), location.search])).toEqual([true, ""]);
  await page.click("nav [data-go=prog]");
  await page.click("#progPruebaOff");
  expect(await page.evaluate(() => diagHecho())).toBe(false);
});

test("parte 2: un cuestionario, una pregunta por pantalla; al final, cuánto suma lo que haces y qué cambiar primero", async ({ page }) => {
  await page.click("#doDiag");
  await page.click('[data-dpart="p2"]');
  const n = await page.evaluate(() => DIAG_P2.length);
  await expect(page.locator("#diagBox")).toContainText(`1 / ${n}`);
  for (let i = 0; i < n; i++) await page.click("[data-p2] >> nth=0");     // la primera opción: los peores hábitos
  await expect(page.locator("#diagBox")).toContainText("Lo que más te conviene cambiar");
  await expect(page.locator("#diagBox")).toContainText("Releer da sensación de dominio");
  expect(await page.evaluate(() => [S.diag.p2.resp.examen, !!S.diag.p2.fin, diagP2Resultado().pct])).toEqual([0, true, 0]);
  await page.click("#p2Volver");
  await expect(page.locator('[data-dpart="p2"]')).toHaveText("Ver tu resultado");
});

test("parte 3: elige uno de los 3 expedientes; filtra, resume, compara, decide; el resultado mide señal, ruido y el ancla", async ({ page }) => {
  await page.click("#doDiag");
  await page.click('[data-dpart="p3"]');
  await expect(page.locator("[data-exp]")).toHaveCount(3);
  await page.click('[data-exp="delirium"]');
  await expect(page.locator(".expdoc")).toContainText("Sodio");
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#p3Sig");
  // Marca dos datos clave y el uroanálisis (ruido).
  await page.check('[data-dato="0"]'); await page.check('[data-dato="4"]'); await page.check('[data-dato="6"]');
  await page.click("#p3Sig");
  await page.fill("#p3Res", "Delirium por difenhidramina y tramadol, con hiponatremia por tiazida. Suspender y corregir el sodio despacio.");
  await page.click("#p3Sig");
  await page.check('[data-idea="0"]'); await page.check('[data-idea="1"]');
  await page.click("#p3Sig");
  await page.click('[data-pr="0"]');                       // el ancla: infección urinaria
  await expect(page.locator("#diagBox")).toContainText("No era esa");
  await page.click("#p3Sig");
  for (let j = 0; j < 3; j++) { await page.click('[data-pr="1"]'); await page.click("#p3Sig"); }
  await expect(page.locator("#diagBox")).toContainText("Te anclaste en el distractor");
  const r = await page.evaluate(() => diagP3Resultado());
  expect([r.senal, r.ruido, r.ideas, r.problema, r.ancla, r.dec]).toEqual([2, 1, 2, false, true, 2]);
  await page.click("#p3Fin");
  await expect(page.locator('[data-dpart="p3"]')).toHaveText("Ver tu resultado");
});

test("los 3 expedientes están completos: señal y ruido, 5 ideas, problema con ancla y decisiones con fuente", async ({ page }) => {
  const r = await page.evaluate(() => EXPEDIENTES.map(E => ({k: E.k, s: E.datos.filter(d => d.s).length, ruido: E.datos.filter(d => !d.s).length, ideas: E.ideas.length,
    probOk: E.problema.c !== E.problema.ancla && E.problema.o.length === 4, dec: E.decisiones.length, fuentes: E.decisiones.every(d => d.fuente && d.o.length === 4 && d.c >= 0 && d.c < 4)})));
  expect(r.map(x => x.k)).toEqual(["delirium", "postop", "preeclampsia"]);
  r.forEach(x => { expect(x.s).toBeGreaterThanOrEqual(5); expect(x.ruido).toBeGreaterThanOrEqual(4); expect(x.ideas).toBe(5); expect(x.probOk).toBe(true); expect(x.dec).toBeGreaterThanOrEqual(2); expect(x.fuentes).toBe(true); });
});

test("resultado: perfil con el área y el tipo más débiles, errores con seguridad y plan semanal con las horas de la parte 2; Hoy propone el foco del día", async ({ page }) => {
  await page.evaluate(() => {
    const p1 = diagP1(), t0 = Date.now();
    p1.ids.forEach((id, i) => { const q = qById(id), malo = q.specialty === "Pediatría";
      S.resp.push({id: String(id), d: t0 + i, ok: !malo, o: 0, ex: 1, c: malo && i % 2 ? "seguro" : "seguro"}); });
    p1.hechos = p1.ids.slice(); p1.fin = t0;
    S.diag.p2 = {resp: {examen: 2, horas: 2}, i: DIAG_P2.length, fin: t0};
    save(); go("diag");
  });
  await expect(page.locator("#diagPerfil")).toContainText("Tu área más débil: Pediatría");
  await expect(page.locator("#diagPerfil")).toContainText("errores con seguridad");
  await expect(page.locator("#diagPerfil")).toContainText("15 horas por semana");
  const plan = await page.evaluate(() => diagPerfil().plan);
  expect(plan[0].s).toBe("Pediatría");                         // la mayor parte del tiempo, a la brecha
  expect(await sinDesborde(page)).toBe(true);
  // El informe se ve primero y cada hallazgo trae su acción: repasar los errores con seguridad
  await expect(page.locator("#diagPerfil .diaghero")).toContainText("Hallazgos");
  await expect(page.locator("#diagPerfil .diagscore")).toBeVisible();
  await page.click("#diagPeligro");
  const rep = await page.evaluate(() => [sess.label, sess.stages[0].items.every(it => qById(it.id).specialty === "Pediatría"), sess.stages[0].items.length > 0]);
  expect(rep).toEqual(["Errores con seguridad", true, true]);
  await page.evaluate(() => { endSession(false); go("diag"); });
  await expect(page.locator("#diagFocoPlan")).toContainText("Pediatría");
  await page.click("nav [data-go=hoy]");
  await expect(page.locator("#suggestCard")).toContainText("Según tu diagnóstico");
  await expect(page.locator("#suggestCard")).toContainText("Pediatría");
  await page.click("#doFoco");
  const specs = await page.evaluate(() => sess.stages[0].items.map(it => qById(it.id).specialty));
  expect(specs.every(s => s === "Pediatría")).toBe(true);
});

test("correcciones de la prueba como estudiante: hábitos con su respuesta, plan que suma, pasos y bloques que vuelven al diagnóstico", async ({ page }) => {
  // Parte 2: «Casi nunca» subraya → se nombra el hábito con la respuesta, no se felicita por subrayar.
  await page.click("#doDiag"); await page.click('[data-dpart="p2"]');
  const n = await page.evaluate(() => DIAG_P2.length);
  for (let i = 0; i < n; i++) await page.click("[data-p2] >> nth=-1");
  await expect(page.locator("#diagBox")).toContainText("Subrayar (casi nunca)");
  await expect(page.locator("#diagBox")).not.toContainText("subrayas o resaltas");
  // Plan semanal: las horas repartidas suman exactamente las horas dichas.
  const sumas = await page.evaluate(() => [0, 1, 2, 3, 4].map(h => { S.diag.p2.resp.horas = h;
    const p1 = diagP1(); p1.ids.forEach((id, i) => S.resp.push({id: String(id), d: Date.now() + i, ok: i % 3 > 0, o: 0, ex: 1}));
    p1.hechos = p1.ids.slice(); p1.fin = Date.now(); const P = diagPerfil(); return [P.horas, P.plan.reduce((a, x) => a + x.h, 0), Math.min(...P.plan.map(x => x.h))]; }));
  sumas.forEach(([h, suma, min]) => { expect(suma).toBe(h); expect(min).toBeGreaterThanOrEqual(0.5); });
  // Hoy recuerda las partes que faltan.
  await page.click("nav [data-go=hoy]");
  await expect(page.locator("#suggestCard")).toContainText("te falta el caso de juicio clínico");
  // Parte 3: cada decisión tiene su número de paso.
  await page.click("#doDiagResto"); await page.click('[data-dpart="p3"]'); await page.click('[data-exp="postop"]');
  await page.click("#p3Sig"); await page.click("#p3Sig"); await page.fill("#p3Res", "Fuga"); await page.click("#p3Sig"); await page.click("#p3Sig");
  await expect(page.locator("#diagBox")).toContainText("Paso 5 de 7");
  await page.click('[data-pr="2"]'); await page.click("#p3Sig");
  await expect(page.locator("#diagBox")).toContainText("Paso 6 de 7");
  await page.click('[data-pr="2"]'); await page.click("#p3Sig");
  await expect(page.locator("#diagBox")).toContainText("Paso 7 de 7");
});

test("al terminar un bloque del diagnóstico se vuelve al diagnóstico y el bloque no cuenta como simulacro", async ({ page }) => {
  await page.click("#doDiag"); await page.click('[data-dbl="0"]');
  await expect(page.locator("#sessBody")).toContainText("Mapa del bloque");
  const n = await page.evaluate(() => sess.stages[0].items.length);
  for (let i = 0; i < n; i++) { await page.click("#opts .opt >> nth=0"); await page.click("#nextBtn"); }
  await page.click("#auditSkip");
  await expect(page.locator("#contBtn")).toHaveText("Volver al diagnóstico →");
  await page.click("#contBtn");
  await expect(page.locator("#v-diag")).toBeVisible();
  await expect(page.locator("#diagBox")).toContainText(`Parte 1: ${n} de`);
  expect(await page.evaluate(() => S.sims.length)).toBe(0);
});

test("sin promesas ni tareas del autor: el perfil no anuncia un control que no existe y Fuentes no muestra «sin revisar» al estudiante", async ({ page }) => {
  await page.evaluate(() => { const p1 = diagP1(); p1.ids.forEach((id, i) => S.resp.push({id: String(id), d: Date.now() + i, ok: i % 2 > 0, o: 0, ex: 1}));
    p1.hechos = p1.ids.slice(); p1.fin = Date.now(); save(); go("diag"); });
  await expect(page.locator("#diagPerfil")).toContainText("Tu plan semanal");
  await expect(page.locator("#diagPerfil")).not.toContainText("control");
  await page.click("nav [data-go=lib]");
  await expect(page.locator("#vigCard")).toBeHidden();
  await page.goto("/?prueba=1");
  await page.click("nav [data-go=lib]");
  await expect(page.locator("#vigCard")).toContainText("sin revisar en los últimos 6 meses");
});

test("la selección del diagnóstico varía los temas: ningún tema ocupa más de 2 de los 10 casos de un área", async ({ page }) => {
  const r = await page.evaluate(() => { const por = {};
    diagSeleccion().map(qById).forEach(q => { const t = q.specialty + " / " + diagTema(q); por[t] = (por[t] || 0) + 1; });
    return Object.entries(por).filter(([, n]) => n > 2); });
  expect(r).toEqual([]);
});
