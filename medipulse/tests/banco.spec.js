// Banco de casos (js/banco.js) y la pregunta en sesión: filtros, búsqueda, lista por tema, pasar,
// archivar y restaurar, cita según el tipo de fuente y especialidad editable.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/");
  await page.evaluate(() => { PLEG.bqlista = true; });   // «Ver los casos» está plegada; aquí se usa abierta
  await page.click("nav [data-go=banco]"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("especialidades, tipo y estado; la lista no muestra el tema ni la fuente", async ({ page }) => {
  await expect(page.locator('#qSpecs [data-sp="Medicina Interna"]')).toContainText(/Medicina Interna \d+/);
  await page.click('#qModo [data-modo="filtros"]');   // los filtros viven en «Con mis filtros»
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
  await page.click('#qSpecs [data-sp="Pediatría"]');
  await page.locator("#qList details.qgrupo summary").first().click();   // la lista está plegada
  await page.locator("#qList [data-q1]").first().click();
  expect(await page.evaluate(() => sess.stages[0].items.length)).toBe(1);
  const topic = await page.evaluate(() => qById(sess.stages[0].items[0].id).topic);
  await expect(page.locator("#sessBody")).not.toContainText(topic);
  await page.click("#opts .opt >> nth=0");
  await expect(page.locator("#fbBox")).toContainText("Tema: " + topic);
  await page.click("#quitBtn");
  await page.click("nav [data-go=banco]");
  if (!(await page.locator("#qList [data-qg]").first().isVisible())) await page.locator("#qList details.qgrupo summary").first().click();
  await page.locator("#qList [data-qg]").first().click();
  expect(await page.evaluate(() => sess.stages[0].items.length)).toBeGreaterThan(1);
});

test("corregir la especialidad de un caso desde el banco", async ({ page }) => {
  await page.click('#qSpecs [data-sp="Medicina Interna"]');
  await page.locator("#qList details.qgrupo summary").first().click();
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

test("crear un caso propio: especialidad, tipo de pregunta y fuente «elaboración propia»; luego corregirlo", async ({ page }) => {
  await page.evaluate(() => { newType = "q"; go("new"); });
  await page.selectOption("#nSpec", "Pediatría");
  await page.selectOption("#nTipo", "diagnostico");
  await page.fill("#nVig", "Niño de 4 años con fiebre y exantema. ¿Diagnóstico más probable?");
  for (const [i, t] of ["Sarampión", "Varicela", "Rubéola", "Escarlatina"].entries()) await page.fill(`#nOpt${i}`, t);
  await expect(page.locator("#nSrc option >> nth=0")).toContainText("Elaboración propia");
  await page.click("#nSave");
  const q = await page.evaluate(() => { const q = S.userQ.at(-1); return [q.specialty, qKind(q), srcLine(q)]; });
  expect(q.slice(0, 2)).toEqual(["Pediatría", "diagnostico"]);
  expect(q[2]).toContain("Elaboración propia");
  expect(q[2]).toContain("responsabilidad del contenido es de quien la creó");
  // corregirlo desde «Creadas por ti»
  await page.click('#mineList [data-pleg="mias"] summary');   // «Creadas por ti» está plegada
  await page.click("#mineList [data-medit]");
  await page.selectOption("#mineList [data-qe=specialty]", "Medicina Interna");
  await page.selectOption("#mineList [data-qe=tipo]", "conducta");
  await page.click("#mineList [data-corr-save]");
  expect(await page.evaluate(() => { const q = S.userQ.at(-1); return [q.specialty, qKind(q)]; })).toEqual(["Medicina Interna", "conducta"]);
});

test("el tipo de pregunta de un caso incluido se puede corregir", async ({ page }) => {
  await page.evaluate(() => { const b = document.createElement("div"); b.id = "tbox"; document.body.appendChild(b); openCorregir("q", qById(2), b); });
  await page.selectOption("#tbox [data-qe=tipo]", "datos");
  await page.click("#tbox [data-corr-save]");
  expect(await page.evaluate(() => qKind(qById(2)))).toBe("datos");
});

test.describe("arma tu práctica", () => {
  test("varias especialidades y la cantidad que el usuario quiera (máximo 100)", async ({ page }) => {
    await page.click('#qSpecs [data-sp="Pediatría"]');
    await page.click('#qSpecs [data-sp="Medicina Interna"]');
    await page.fill("#qN", "7"); await page.locator("#qN").dispatchEvent("change");
    await page.click("#pr10");
    const specs = await page.evaluate(() => sess.stages[0].items.map(it => qById(it.id).specialty));
    expect(specs.length).toBe(7);
    expect(specs.every(s => ["Pediatría", "Medicina Interna"].includes(s))).toBe(true);
    await page.click("#quitBtn"); await page.click("nav [data-go=banco]");
    await page.fill("#qN", "500"); await page.locator("#qN").dispatchEvent("change");
    expect(await page.evaluate(() => S.prac.n)).toBe(100);
    expect(await sinDesborde(page)).toBe(true);
  });

  test("al azar reparte entre especialidades; modo examen es un simulacro con tiempo", async ({ page }) => {
    await page.fill("#qN", "10"); await page.locator("#qN").dispatchEvent("change");
    await page.check("#qExam");
    await expect(page.locator("#pr10")).toContainText("Empezar simulacro");
    await page.click("#pr10");
    const r = await page.evaluate(() => [sess.stages[0].exam, sess.stages[0].limit, new Set(sess.stages[0].items.map(it => qById(it.id).specialty)).size]);
    expect(r[0]).toBe(true); expect(r[1]).toBe(720); expect(r[2]).toBeGreaterThan(2);
  });

  test("mis vulnerabilidades: detecta el tipo de pregunta que fallas y elige esos casos", async ({ page }) => {
    // Falla todas las de conducta y acierta todas las demás
    await page.evaluate(() => { QUESTIONS.forEach(q => { const malo = qKind(q) === "conducta";
      S.srs["q" + q.id] = {b: malo ? 0 : 3, due: Date.now() + 9e9, n: 2, ok: malo ? 0 : 2, last: malo ? 0 : 2}; }); save(); renderBanco(); });
    await expect(page.locator("#qVuln")).toContainText("Conducta en");
    await expect(page.locator("#qVuln")).toContainText("fallaste dos veces o más");
    await page.click('#qModo [data-modo="vuln"]');
    await page.fill("#qN", "10"); await page.locator("#qN").dispatchEvent("change");
    await page.click("#pr10");
    const tipos = await page.evaluate(() => sess.stages[0].items.map(it => qKind(qById(it.id))));
    expect(tipos.filter(t => t === "conducta").length).toBeGreaterThanOrEqual(8);
  });

  test("al fallar se marca el motivo y aparece como patrón de error", async ({ page }) => {
    await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: 2}]}]}));
    const mala = await page.evaluate(() => (qById(2).correct + 1) % qById(2).options.length);
    await page.click(`#opts .opt >> nth=${mala}`);
    await page.click('#fbBox [data-mot="dato"]');
    expect(await page.evaluate(() => S.resp.at(-1))).toMatchObject({id: "2", ok: false, m: "dato"});
    await page.click("#nextBtn");
    await page.click("#sessBody [data-go=hoy]"); await page.click("nav [data-go=banco]");
    await page.evaluate(() => { QUESTIONS.slice(0, 8).forEach(q => S.srs["q" + q.id] = S.srs["q" + q.id] || {b: 1, due: Date.now() + 9e9, n: 1, ok: 1, last: 2}); renderBanco(); });
    await expect(page.locator("#qVuln")).toContainText("Tu error más frecuente: 🔍 No vi un dato del caso");
  });
});

test.describe("auditoría a ciegas al final del modo examen", () => {
  test("se marca la confianza sin ver el resultado; luego nota real, frágiles y errores con seguridad", async ({ page }) => {
    await page.evaluate(() => startSession({label: "Simulacro", tag: "fire", stages: [{name: "x", exam: true, limit: 999, items: [{t: "q", id: 2}, {t: "q", id: 3}, {t: "q", id: 4}]}]}));
    const r = await page.evaluate(() => [2, 3, 4].map(i => qById(i).correct));
    const mal = c => (c + 1) % 4;
    // 1: correcta y segura · 2: correcta al azar · 3: incorrecta y segura
    await page.click(`#opts .opt >> nth=${r[0]}`); await page.click("#nextBtn");
    await page.click(`#opts .opt >> nth=${r[1]}`); await page.click("#nextBtn");
    await page.click(`#opts .opt >> nth=${mal(r[2])}`); await page.click("#nextBtn");
    await page.click("#auditGo");
    // a ciegas: no se ve cuál es la correcta ni el porcentaje
    await expect(page.locator("#sessBody .opt.right")).toHaveCount(0);
    await expect(page.locator("#sessBody .big")).toHaveCount(0);
    await page.click('#confBtns [data-conf="seguro"]');
    await page.keyboard.press("3");   // al azar
    await page.click('#confBtns [data-conf="seguro"]');
    await expect(page.locator("#sessBody")).toContainText("Nota real (solo aciertos seguros): 33 %");
    await expect(page.locator("#sessBody .audtag.peligro")).toHaveCount(1);
    await expect(page.locator("#sessBody .audtag.fragil")).toHaveCount(1);
    // el acierto al azar no queda como dominado: vuelve mañana
    const x = await page.evaluate(() => S.srs.q3);
    expect(x.last).toBe(1); expect(x.b).toBe(0);
    expect(await page.evaluate(() => S.resp.slice(-3).map(e => e.c))).toEqual(["seguro", "azar", "seguro"]);
    // y en el banco aparece en el análisis
    await page.click("#contBtn"); await page.click("#sessBody [data-go=hoy]"); await page.click("nav [data-go=banco]");
    await page.evaluate(() => { QUESTIONS.slice(5, 12).forEach(q => S.srs["q" + q.id] = {b: 1, due: Date.now() + 9e9, n: 1, ok: 1, last: 2}); renderBanco(); });
    await expect(page.locator("#qVuln")).toContainText("1 error con seguridad");
  });

  test("se puede ver el resultado sin auditar", async ({ page }) => {
    await page.evaluate(() => startSession({label: "Simulacro", tag: "fire", stages: [{name: "x", exam: true, limit: 999, items: [{t: "q", id: 2}]}]}));
    await page.click("#opts .opt >> nth=0"); await page.click("#nextBtn");
    await page.click("#auditSkip");
    await expect(page.locator("#sessBody .big")).toContainText("%");
  });
});

test("con mis filtros: tema, tipo y estado junto a la cantidad; Empezar usa exactamente eso", async ({ page }) => {
  await page.click('#qModo [data-modo="filtros"]');
  await page.selectOption("#qSelTipo", "conducta");
  await page.selectOption("#qSelSt", "new");
  await page.fill("#qN", "3"); await page.locator("#qN").dispatchEvent("change");
  await expect(page.locator("#pr10")).toContainText("3 casos");
  await page.click("#pr10");
  const r = await page.evaluate(() => sess.stages[0].items.map(it => [qKind(qById(it.id)), !!S.srs["q" + it.id]]));
  expect(r.length).toBe(3);
  expect(r.every(([k, visto]) => k === "conducta" && !visto)).toBe(true);
});

test("buscar por tema con mis filtros conserva el cursor y abre la lista con lo encontrado", async ({ page }) => {
  await page.evaluate(() => { PLEG.bqlista = false; });
  await page.click('#qModo [data-modo="filtros"]');
  await page.locator("#qQuery").pressSequentially("tep", {delay: 60});
  await expect(page.locator("#qQuery")).toBeFocused();
  await expect(page.locator("#qQuery")).toHaveValue("tep");
  await expect(page.locator('#qList [data-pleg="bqlista"]')).toHaveAttribute("open", "");
  await expect.poll(() => page.$$eval("#qList details.qgrupo[open] [data-q1]", bs => bs.length)).toBeGreaterThan(2);
});

test("«Salud Pública» pasó a «Epidemiología y Estadística», también en lo guardado y en lo que llega de otras IA", async ({ page }) => {
  await page.evaluate(() => { const d = JSON.parse(localStorage.getItem("medipulse_v2") || "{}");
    d.userQ = [{id: "u1", specialty: "Salud Pública", topic: "NNT", vignette: "v", options: ["a", "b", "c", "d"], correct: 0, whyCorrect: "", pearl: "", trap: ""}];
    d.prac = {specs: ["Salud Pública"], modo: "azar", n: 20, examen: false}; localStorage.setItem("medipulse_v2", JSON.stringify(d)); });
  await page.reload();
  const r = await page.evaluate(() => [SPECS.at(-1), qById("u1").specialty, S.prac.specs, specCanon("Salud publica"), specCanon("Bioestadística"), specCanon("Pediatría")]);
  expect(r).toEqual(["Epidemiología y Estadística", "Epidemiología y Estadística", ["Epidemiología y Estadística"], "Epidemiología y Estadística", "Epidemiología y Estadística", "Pediatría"]);
  await page.click("nav [data-go=banco]");
  await expect(page.locator('#qSpecs [data-sp="Epidemiología y Estadística"]')).toHaveClass(/on/);
  expect(await sinDesborde(page)).toBe(true);
});
