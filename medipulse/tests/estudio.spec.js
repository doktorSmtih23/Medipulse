// Sesión de estudio (estudio.js): pre-test, lectura con pomodoro y plantilla, recuerdo activo, cierre con
// ficha y post-test; «Cómo estudias» sin IA y con IA (solo cifras).
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
const terminarBloque = page => page.evaluate(() => { S.estudio.actual.fase.ini -= 60 * 60 * 1000; estTic(); });

test("la barra tiene Estudio en vez de Simulacro y MBE ya no tiene «Revisión de tema»", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  await expect(page.locator("nav [data-go=estudio]")).toBeVisible();
  await expect(page.locator("nav [data-go=sim]")).toHaveCount(0);
  await page.click("nav [data-go=mbe]");
  await expect(page.locator('#mbeTabs [data-mt="REV"]')).toHaveCount(0);
});

test("sesión completa sin IA: pre-test, lectura, recuerdo, ficha y post-test", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  await page.click("nav [data-go=estudio]");
  await page.fill("#estTema", "Kawasaki");
  await page.click("#estGo");
  // pre-test con casos del banco del tema; no califica ni muestra la respuesta
  const n = await page.evaluate(() => S.estudio.actual.pre.ids.length);
  expect(n).toBeGreaterThan(1);
  const srs = await page.evaluate(() => JSON.stringify(S.srs));
  for (let i = 0; i < n; i++) await page.click("#estBox [data-eo] >> nth=0");
  expect(await page.evaluate(() => JSON.stringify(S.srs))).toBe(srs);
  await page.fill("#estSaber", "Fiebre de varios días y conjuntivitis");
  await page.click("#estLeer");
  await expect(page.locator("#estReloj")).toHaveText(/2[45]:\d\d/);
  await page.fill('[data-pl="algoritmo"]', "Ecocardiograma al diagnóstico");
  // pausa: el reloj no avanza
  await page.click("#estPausa");
  expect(await page.evaluate(() => !!S.estudio.actual.fase.pausa)).toBe(true);
  await page.click("#estPausa");
  // termina el bloque → recuerdo activo
  await terminarBloque(page);
  await expect(page.locator("#estRec")).toBeVisible();
  await page.fill("#estRec", "1. Fiebre → ≥ 5 días\n2. Coronarias → ecocardiograma\n3. Tratamiento → IGIV y aspirina");
  await page.click("#estComp");
  await page.click('[data-auto="mitad"]');
  await page.click("#estCerrar");
  // cierre
  await expect(page.locator("#estBox")).toContainText("3");
  await page.click("#estPost");
  for (let i = 0; i < n; i++) await page.click("#estBox [data-eo] >> nth=0");
  await expect(page.locator("#estBox")).toContainText("Pre-test");
  await expect(page.locator("#estBox")).toContainText("post-test");
  await page.click("#estFicha");
  await expect(page.locator("#estFichaBox .eTitle")).toHaveValue("Kawasaki");
  await expect(page.locator("#estFichaBox .eL >> nth=0")).toHaveValue("Fiebre");
  await page.click("#estFichaBox .eSave");
  await page.click("#estGuardar");
  const ses = await page.evaluate(() => [S.estudio.actual, S.estudio.ses.length, S.estudio.ses[0].puntos, S.estudio.ses[0].ficha, S.estudio.ses[0].auto]);
  expect(ses).toEqual([null, 1, 3, true, ["mitad"]]);
  await expect(page.locator("#estBox")).toContainText("Tus sesiones");
  expect(await sinDesborde(page)).toBe(true);
});

test("la sesión sigue después de recargar, con el reloj en curso", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  await page.click("nav [data-go=estudio]");
  await page.fill("#estTema", "Tema sin casos xyz"); await page.click("#estGo");
  await page.click("#estLeer");
  await page.reload(); await page.click("nav [data-go=estudio]");
  await expect(page.locator("#estReloj")).toBeVisible();
  expect(await page.evaluate(() => S.estudio.actual.paso)).toBe("leer");
});

test("cómo estudias sin IA: consejos con su herramienta (bloques sin terminar → ritmo 15/3)", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  await page.evaluate(() => { const ahora = Date.now();
    S.estudio.ses = [1, 2, 3].map(i => ({id: "s" + i, tema: "T" + i, ini: ahora - i * 864e5, fin: ahora, ritmo: "25/5", hora: 20, bloques: 3, completos: 1, puntos: 2, min: 30, pausas: 2, auto: ["poco"]})); save(); });
  await page.click("nav [data-go=estudio]");
  await expect(page.locator("#estAnalisis")).toContainText("Terminas el 33 % de los bloques");
  await page.click('#estAnalisis [data-esth="ritmo:15/3"]');
  expect(await page.evaluate(() => S.estudio.cfg.ritmo)).toBe("15/3");
});

test("análisis con IA: envía solo cifras (no tus apuntes) y muestra el informe con herramientas", async ({ page }) => {
  errores = vigilarErrores(page);
  const peticiones = await simularIA(page, () => ({tool: "report_estudio", input: {resumen: "Lees mucho y recuerdas poco.", fortalezas: ["Constancia"],
    problemas: [{titulo: "Recuerdo bajo", evidencia: "2 puntos por bloque"}], recomendaciones: [{accion: "Practica tus vulnerabilidades", porque: "Conducta en Pediatría 1/5", herramienta: "banco_vulnerabilidades"}],
    plan: [{dia: "Lunes", tarea: "Una sesión de 25/5"}]}}));
  await abrirConClave(page);
  await page.evaluate(() => { const ahora = Date.now();
    S.estudio.ses = [1, 2, 3].map(i => ({id: "s" + i, tema: "Tema " + i, ini: ahora - i * 864e5, fin: ahora, ritmo: "25/5", hora: 9, bloques: 2, completos: 2, puntos: 4, min: 50, pausas: 0, auto: ["todo"]}));
    S.estudio.actual = null; S.notes = [{id: "n1", title: "APUNTE SECRETO"}]; save(); });
  await page.click("nav [data-go=estudio]");
  await page.click("#estInforme");
  await expect(page.locator(".informe")).toContainText("Lees mucho y recuerdas poco.");
  const p = peticiones.at(-1), u = JSON.stringify(p.messages);
  expect(p.tools.map(t => t.name)).toEqual(["report_estudio"]);
  expect(u).toContain("bloquesCompletosPct");
  expect(u).not.toContain("APUNTE SECRETO");
  await page.click('.informe [data-esth="banco"]');
  expect(await page.evaluate(() => [currentView, S.prac.modo])).toEqual(["banco", "vuln"]);
});

test("con un documento: al recordar se puede comparar con la revisión de tema de la IA", async ({ page }) => {
  errores = vigilarErrores(page);
  const peticiones = await simularIA(page, () => ({tool: "report_topic", input: {title: "Tema", pathophys: {text: "Mecanismo X", page: 1}, typical: [], redFlags: [{text: "Bandera Y", page: 1}], algorithm: [], differentials: [], pearls: []}}));
  await abrirConClave(page); await subirPdf(page);
  await page.click("nav [data-go=estudio]");
  const id = await page.evaluate(() => S.sources.at(-1).id);
  await page.selectOption("#estDoc", id);
  await expect(page.locator("#estTema")).not.toHaveValue("");   // el tema se llena con el título del documento
  await page.uncheck("#estGuiaIA");
  await page.click("#estGo");
  if (await page.locator("#estSaltar").count()) await page.click("#estSaltar");
  await page.click("#estLeer"); await terminarBloque(page);
  await page.fill("#estRec", "Algo que recuerdo"); await page.click("#estComp");
  await page.click("#estIA");
  await expect(page.locator("#estBox")).toContainText("Bandera Y");
  expect(peticiones.at(-1).tools.map(t => t.name)).toEqual(["report_topic"]);
});

test.describe("preguntas de búsqueda activa", () => {
  test("sin IA: mis preguntas se ven antes y durante la lectura, se responden de memoria y se autoevalúan al cerrar", async ({ page }) => {
    errores = vigilarErrores(page); await page.goto("/");
    await page.click("nav [data-go=estudio]");
    await page.fill("#estTema", "Tema sin casos xyz");
    await page.fill("#estMias", "¿Cuál es el criterio diagnóstico?\n¿Cuál es la primera línea?");
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("Lee buscando la respuesta a estas preguntas");
    await page.click("#estLeer");
    await expect(page.locator('[data-pleg="estbusca"]')).toContainText("¿Cuál es la primera línea?");
    await terminarBloque(page);
    await page.fill('[data-gm="0"]', "Fiebre de 5 días");
    await page.fill("#estRec", "Un punto"); await page.click("#estComp"); await page.click("#estCerrar");
    await page.click('[data-ga="0:si"]'); await page.click('[data-ga="1:no"]');
    await page.click("#estGuardar");
    expect(await page.evaluate(() => S.estudio.ses.at(-1).guia)).toEqual({n: 2, respondidas: 1, si: 1, medio: 0, no: 1, ia: false});
  });

  test("con IA y documento: la IA las diseña desde el documento; al cerrar se ve la respuesta con su página y se hace ficha", async ({ page }) => {
    errores = vigilarErrores(page);
    const peticiones = await simularIA(page, () => ({tool: "report_preguntas", input: {preguntas: [
      {pregunta: "¿Qué hallazgo define el caso?", concepto: "diagnóstico", respuesta: "El hallazgo X", page: 1},
      {pregunta: "¿Cuál es la primera línea?", concepto: "tratamiento", respuesta: "El fármaco Y", page: 2}]}}));
    await abrirConClave(page); await subirPdf(page);
    await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await expect(page.locator("#estTema")).not.toHaveValue("");
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("¿Qué hallazgo define el caso?");
    const p = peticiones.at(-1);
    expect(p.tools.map(t => t.name)).toEqual(["report_preguntas"]);
    expect(p.messages[0].content[0].text).toContain("<documento");
    expect(p.system).toContain("tomada SOLO del documento");
    if (await page.locator("#estSaltar").count()) await page.click("#estSaltar");
    await page.click("#estLeer"); await terminarBloque(page);
    await page.fill("#estRec", "Algo"); await page.click("#estComp"); await page.click("#estCerrar");
    await page.locator('[data-pleg="gr1"] summary').click();
    await expect(page.locator('[data-pleg="gr1"]')).toContainText("El fármaco Y");
    await expect(page.locator('[data-pleg="gr1"] summary')).toContainText("pág. 2");
    await page.click("#estFichaGuia");
    await expect(page.locator("#estFichaGuiaBox .eL >> nth=1")).toHaveValue("¿Cuál es la primera línea?");
    await expect(page.locator("#estFichaGuiaBox .eV >> nth=1")).toHaveValue("El fármaco Y");
  });

  test("con un ensayo clínico: no usa IA (remite a MBE), deja leer con mis preguntas y «¿Es una revisión?» la reactiva", async ({ page }) => {
    errores = vigilarErrores(page);
    const peticiones = await simularIA(page, () => ({tool: "report_preguntas", input: {preguntas: [
      {pregunta: "¿Cuál es la primera línea?", concepto: "tratamiento", respuesta: "Y", page: 1}]}}));
    await abrirConClave(page); await subirPdf(page);
    await page.evaluate(() => { const s = S.sources.at(-1); s.design = "ECA";
      s.indice = {items: [{title: "Métodos", from: 1, to: 1}, {title: "Resultados", from: 1, to: 1}]}; save(); });
    await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await expect(page.locator("#estNotaPaper")).toContainText("laboratorio MBE");
    await expect(page.locator("#estGuiaIA")).toHaveCount(0);
    await expect(page.locator("#estMias")).toBeVisible();   // abierto: con un estudio, las preguntas las escribes tú
    await page.fill("#estMias", "¿Cuál fue el NNT?");
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("¿Cuál fue el NNT?");
    if (await page.locator("#estSaltar").count()) await page.click("#estSaltar");
    await page.click("#estLeer"); await terminarBloque(page);
    await page.fill("#estRec", "Algo"); await page.click("#estComp");
    await expect(page.locator("#estIA")).toHaveCount(0);
    expect(peticiones.length).toBe(0);
    // Si la detección se equivocó, el usuario la corrige y vuelve la IA (con su aviso si elige solo «Métodos»).
    await page.evaluate(() => { S.estudio.actual = null; save(); }); await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await page.click("#estNoPaper");
    await expect(page.locator("#estNotaPaper")).toHaveCount(0);
    await expect(page.locator("#estGuiaIA")).toBeVisible();
    await page.selectOption("#estInd", "0");
    await expect(page.locator("#estNotaMet")).toContainText("Todo el documento");
    await page.selectOption("#estInd", "1");
    await expect(page.locator("#estNotaMet")).toHaveCount(0);
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("¿Cuál es la primera línea?");
    const p = peticiones.at(-1);
    expect(p.system).toContain("NO preguntes por características basales");
    expect(p.system).toContain("de la más fundamental a la menos");
    expect(p.system).not.toContain("como aparecen en el documento");
  });

  test("sin documento (un tema): las preguntas siguen siendo de lo fundamental del tema clínico", async ({ page }) => {
    errores = vigilarErrores(page);
    const peticiones = await simularIA(page, () => ({tool: "report_preguntas", input: {preguntas: [
      {pregunta: "¿Cuál es la primera línea?", concepto: "tratamiento", respuesta: "Y", page: 0}]}}));
    await abrirConClave(page);
    await page.click("nav [data-go=estudio]");
    await expect(page.locator("#estNotaPaper")).toHaveCount(0);
    await page.fill("#estTema", "Encefalitis autoinmune");
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("¿Cuál es la primera línea?");
    const p = peticiones.at(-1);
    expect(p.system).toContain("mecanismo central");
    expect(p.system).toContain("NO preguntes por características basales");
  });
});

test("un solo tema (el documento) y el subtema opcional del índice; sin casos del tema explica por qué no hay pre-test", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/"); await subirPdf(page);
  await page.evaluate(() => { const s = S.sources.at(-1); s.title = "Enfermedad de Kikuchi-Fujimoto";
    s.indice = {items: [{title: "Fisiopatología", from: 1, to: 1}, {title: "Tratamiento", from: 2, to: 2}]}; save(); });
  await page.click("nav [data-go=estudio]");
  await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
  await expect(page.locator("#estTema")).toHaveValue("Enfermedad de Kikuchi-Fujimoto");
  await expect(page.locator("label:has(#estInd)")).toContainText("Subtema");
  await page.selectOption("#estInd", "0");
  await expect(page.locator("#estTema")).toHaveValue("Enfermedad de Kikuchi-Fujimoto");   // elegir el subtema no cambia el tema
  await page.click("#estGo");
  await expect(page.locator("#estBox")).toContainText("Enfermedad de Kikuchi-Fujimoto · Fisiopatología");
  await expect(page.locator("#estSinPre")).toContainText("no tiene casos de este tema");
});

test("la detección del tipo de documento lee la cabecera: Primer y Review son revisiones; un ensayo que dice «randomly assigned» es ECA", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  const r = await page.evaluate(() => [
    "nature reviews disease primers Primer Autoimmune encephalitis ... cohort cohort cohort cohort cohort cohort randomized",
    "Clinical Review & Education JAMA | Review Idiopathic Normal Pressure Hydrocephalus",
    "new england journal of medicine Prasugrel versus Clopidogrel ... patients were randomly assigned ... randomly assigned ... double-blind ... intention-to-treat ... cohort cohort cohort cohort",
    "CME Diagnosis and Management of Tinea Infections ... randomized controlled trials ... randomized clinical trials ... randomized controlled trials",
    "GUÍA DE PRÁCTICA CLÍNICA Guía de práctica clínica para el diagnóstico y tratamiento de la neumonía",
    "Research Original Investigation Age-Adjusted D-Dimer ... prospective cohort ... management outcome study ... prospective multicenter study"
  ].map(detectDesign));
  expect(r).toEqual(["REV", "REV", "ECA", "REV", "GPC", "OBS"]);
});
