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
  await page.click("nav [data-go=estudio]"); await page.click(".grupotabs [data-go=mbe]");
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

test("análisis con IA: recibe el detalle por sesión y comparaciones (no tus apuntes); el informe muestra los patrones que descubre y herramientas", async ({ page }) => {
  errores = vigilarErrores(page);
  const peticiones = await simularIA(page, () => ({tool: "report_estudio", input: {resumen: "Lees mucho y recuerdas poco.", patrones: [{hallazgo: "En bloques de 25 min recuerdas el doble que en los de 50", evidencia: "25/5: 2,0 puntos por bloque; 50/10: 1,0"}], fortalezas: ["Constancia"],
    problemas: [{titulo: "Recuerdo bajo", evidencia: "2 puntos por bloque"}], recomendaciones: [{accion: "Practica tus vulnerabilidades", porque: "Conducta en Pediatría 1/5", herramienta: "banco_vulnerabilidades"}],
    plan: [{dia: "Lunes", tarea: "Una sesión de 25/5"}]}}));
  await abrirConClave(page);
  await page.evaluate(() => { const ahora = Date.now();
    S.estudio.ses = [1, 2, 3].map(i => ({id: "s" + i, tema: "Tema " + i, ini: ahora - i * 864e5, fin: ahora, ritmo: i === 3 ? "50/10" : "25/5", hora: i === 3 ? 22 : 9, bloques: 2, completos: 2, puntos: i === 3 ? 2 : 4, min: 50, pausas: 0, auto: ["todo"], pre: {ok: 1, n: 5}, post: {ok: 4, n: 5}}));
    S.estudio.actual = null; S.notes = [{id: "n1", title: "APUNTE SECRETO"}]; save(); });
  await page.click("nav [data-go=estudio]");
  await page.click("#estInforme");
  await expect(page.locator(".informe")).toContainText("Lees mucho y recuerdas poco.");
  await expect(page.locator(".informe")).toContainText("Lo que descubrí en tus datos");
  await expect(page.locator(".informe")).toContainText("recuerdas el doble");
  const p = peticiones.at(-1), u = JSON.stringify(p.messages);
  expect(p.tools.map(t => t.name)).toEqual(["report_estudio"]);
  expect(u).toContain("bloquesCompletosPct");
  // El detalle para comparar: cada sesión, por ritmo y por franja horaria, y el pre y post-test por tema.
  expect(u).toContain("porRitmo"); expect(u).toContain("porFranjaHoraria"); expect(u).toContain("casosUltimos30dias");
  expect(u).toContain("Tema 1"); expect(u).toContain("postTest");
  expect(p.system).toContain("Interpreta, no recites");
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
  await page.click('[data-pleg="estopc"] summary'); await page.uncheck("#estGuiaIA");
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
    await page.click('[data-pleg="estopc"] summary'); await page.fill("#estMias", "¿Cuál es el criterio diagnóstico?\n¿Cuál es la primera línea?");
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
      s.indice = {v: IND_VERSION, items: [{title: "Métodos", from: 1, to: 1}, {title: "Resultados", from: 1, to: 1}]}; save(); });
    await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await expect(page.locator("#estNotaPaper")).toContainText("laboratorio MBE");
    await page.click('[data-pleg="estopc"] summary'); await expect(page.locator("#estGuiaIA")).toHaveCount(0);
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
    s.indice = {v: IND_VERSION, items: [{title: "Fisiopatología", from: 1, to: 1}, {title: "Tratamiento", from: 2, to: 2}]}; save(); });
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

test("Estudio con un solo caso de pre-test: singular, y sin documento no pide abrir el documento", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.click("nav [data-go=estudio]");
  await page.fill("#estTema", "Bronquiolitis");
  await page.click("#estGo");
  await expect(page.locator("#v-estudio")).toContainText("Pre-test: 1 caso del banco");
  await page.click("[data-eo] >> nth=0");
  await expect(page.locator("#v-estudio")).toContainText("Pre-test hecho (1 caso)");
  await page.click("#estLeer"); await page.click("#estFin");
  await expect(page.locator("#v-estudio")).toContainText("Sin mirar lo que leíste");
});

test("con pre-test, el cierre pone el post-test como paso principal y deja terminar sin él", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.click("nav [data-go=estudio]");
  await page.fill("#estTema", "Bronquiolitis");
  await page.click("#estGo");
  await page.click("[data-eo] >> nth=0");
  await page.click("#estLeer"); await page.click("#estFin");
  await page.fill("#estRec", "VSR → principal agente");
  await page.click("#v-estudio button.primary >> nth=0");
  await page.locator("#v-estudio button", {hasText: "Terminar la sesión"}).click();
  await expect(page.locator("#estPost")).toHaveClass(/primary/);
  await expect(page.locator("#estGuardar")).toHaveText("Terminar sin post-test");
  await page.click("#estPost"); await page.click("[data-eo] >> nth=3");
  await expect(page.locator("#estGuardar")).toHaveText("✓ Terminar y guardar la sesión");
});

// Tipo de material (estudio-tipos.js): la plantilla, la guía, los ejemplos y el foco de las preguntas se
// adaptan a lo que se estudia: enfermedad, guía, fármaco, procedimiento o tema amplio.
test.describe("tipo de material", () => {
  test("con una guía de práctica clínica: se sugiere Guía, el tema queda corto y la plantilla pide recomendaciones, no fisiopatología", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/"); await subirPdf(page);
    await page.evaluate(() => { const s = S.sources.at(-1); s.design = "GPC"; s.title = "Guía de práctica clínica para el diagnóstico y tratamiento de la NAC 2026"; save(); });
    await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await expect(page.locator("#estTema")).toHaveValue("NAC");
    await expect(page.locator('[data-esttipo="guia"]')).toHaveClass(/on/);
    await expect(page.locator('[data-pleg="estguia"] summary')).toContainText("Cómo estudiar una guía de práctica clínica");
    await page.click("#estGo");
    if (await page.locator("#estSaltar").count()) await page.click("#estSaltar");
    await page.click("#estLeer");
    await expect(page.locator("[data-pl]")).toHaveCount(5);
    await expect(page.locator('[data-pleg="estplant"]')).toContainText("Lo que no se hace");
    await expect(page.locator('[data-pleg="estplant"]')).not.toContainText("Fisiopatología");
    expect(await sinDesborde(page)).toBe(true);
  });

  test("sin documento: el tipo sigue al tema al escribir, se puede cambiar y la IA recibe el foco de ese tipo", async ({ page }) => {
    errores = vigilarErrores(page);
    const peticiones = await simularIA(page, () => ({tool: "report_preguntas", input: {preguntas: [
      {pregunta: "¿Cuál es la indicación?", concepto: "indicación", respuesta: "Neumotórax", page: 0}]}}));
    await abrirConClave(page);
    await page.click("nav [data-go=estudio]");
    await expect(page.locator('[data-esttipo="enf"]')).toHaveClass(/on/);
    await page.fill("#estTema", "Toracostomía cerrada");
    await expect(page.locator('[data-esttipo="proc"]')).toHaveClass(/on/);
    await page.click('[data-esttipo="farm"]');
    await expect(page.locator("#estTema")).toHaveValue("Toracostomía cerrada");
    await expect(page.locator('[data-pleg="estguia"] summary')).toContainText("Cómo estudiar un fármaco");
    await page.click('[data-esttipo="proc"]');
    await page.click("#estGo");
    await expect(page.locator("#estBox")).toContainText("¿Cuál es la indicación?");
    expect(peticiones.at(-1).system).toContain("El material es procedimiento");
    expect(peticiones.at(-1).system).toContain("reparos anatómicos");
    expect(await page.evaluate(() => S.estudio.actual.tipo)).toBe("proc");
  });

  test("la IA puede llenar la plantilla del tipo elegido; se estudia con su página, se escribe de memoria y se compara al final", async ({ page }) => {
    errores = vigilarErrores(page);
    const peticiones = await simularIA(page, body => body.tools[0].name === "report_plantilla"
      ? {tool: "report_plantilla", input: {aplica: {texto: "Adultos con NAC", page: 1}, hace: {texto: "Amoxicilina → 1 g cada 8 h", page: 1}, nohace: {texto: "", page: 0}, umbrales: {texto: "CURB-65 ≥ 2 → hospitalizar", page: 1}, cambios: {texto: "", page: 0}}}
      : {tool: "report_preguntas", input: {preguntas: [{pregunta: "¿Qué umbral decide hospitalizar?", concepto: "umbral", respuesta: "CURB-65 ≥ 2", page: 1}]}});
    await abrirConClave(page); await subirPdf(page);
    await page.evaluate(() => { const s = S.sources.at(-1); s.design = "GPC"; s.title = "Guía de práctica clínica de la NAC"; save(); });
    await page.click("nav [data-go=estudio]");
    await page.selectOption("#estDoc", await page.evaluate(() => S.sources.at(-1).id));
    await page.click('[data-pleg="estopc"] summary'); await expect(page.locator('[data-estpl="yo"]')).toHaveClass(/on/);       // por defecto la llena el usuario
    await page.click('[data-estpl="ia"]');
    await expect(page.locator("#estPlNota")).toContainText("con la página de cada dato");
    await page.click("#estGo");
    // primero esperar a que la petición salga (si no, «preparando» aún no aparece y la espera pasa de largo)
    await expect.poll(() => peticiones.some(p => p.tools[0].name === "report_plantilla")).toBe(true);
    await expect(page.locator("#estBox")).not.toContainText("preparando");
    const pide = peticiones.find(p => p.tools[0].name === "report_plantilla");
    expect(pide.system).toContain('"nohace" (Lo que no se hace)');
    expect(Object.keys(pide.tools[0].input_schema.properties)).toEqual(["aplica", "hace", "nohace", "umbrales", "cambios"]);
    await expect(page.locator("#estSaltar, #estLeer").first()).toBeVisible();   // esperar a que la pantalla siguiente cargue
    if (await page.locator("#estSaltar").count()) await page.click("#estSaltar");
    await page.click("#estLeer");
    await expect(page.locator('[data-pleg="estbusca"]')).toContainText("¿Qué umbral decide hospitalizar?");
    await expect(page.locator('[data-pleg="estplant"] summary')).toContainText("llenada por la IA");
    await expect(page.locator('[data-pl="hace"]')).toHaveValue("Amoxicilina → 1 g cada 8 h");
    await expect(page.locator('[data-plpag="1"]').first()).toBeVisible();
    await expect(page.locator("#estPdf")).toBeVisible();   // los PDF subidos no guardan «kind»: igual se ofrece abrirlo
    await terminarBloque(page);
    await page.fill("#estRec", "CURB-65"); await page.click("#estComp");
    await expect(page.locator('[data-pleg="estplcomp"]')).toContainText("CURB-65 ≥ 2 → hospitalizar");
    expect(await sinDesborde(page)).toBe(true);
  });

  test("sin clave de IA la plantilla se llena a mano y se ofrece la opción con la clave", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/");
    await page.click("nav [data-go=estudio]");
    await expect(page.locator("[data-estpl]")).toHaveCount(0);
    await expect(page.locator("#estPlBox")).toContainText("Con tu clave de API, la IA puede llenarla por ti");
  });

  test("el tema corto quita «Guía de…», «Diagnosis and management of», «Estado del arte» y el año", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/");
    expect(await page.evaluate(() => ["Guía de práctica clínica para el diagnóstico y tratamiento de la NAC 2026", "Diagnosis and Management of Dementia- Review",
      "Toracostomía cerrada, Estado del Arte", "Autoimmune encephalitis", "Consenso Colombiano para TEC"].map(estTemaCorto)))
      .toEqual(["NAC", "Dementia", "Toracostomía cerrada", "Autoimmune encephalitis", "TEC"]);
  });
});
