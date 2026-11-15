// Analizar un documento (js/analisis.js) con el PDF de prueba y la IA simulada.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

const XSS = '<img src=x onerror="window.__xss=1">';
const RESPUESTAS = {
  report_chapters: {design: "REV", chapters: [
    {title: "Contexto clínico", from: 1, to: 1, summary: "Por qué se busca una terapia nueva"},
    {title: "Ensayos clínicos y vectores", from: 2, to: 2, summary: "Qué mostró cada producto"},
    {title: "Capítulo inventado", from: 9, to: 3, summary: "rango imposible: se debe descartar"}]},
  report_audit: {design: "ECA", headline: "AAV2-GAD fase II " + XSS, verdict: {text: "Mejoró el UPDRS frente a cirugía simulada.", page: 2},
    algorithm: [{step: "Intervención", text: "AAV2-GAD bilateral en el núcleo subtalámico", page: 2}],
    doList: [{text: "Comparar siempre contra el grupo sham", page: 2}], dontList: [{text: "Atribuir los eventos graves al vector", page: 3}],
    thresholds: [{metric: "UPDRS con AAV2-GAD", value: "23.1 %", page: 2}, {metric: "Página inexistente", value: "x", page: 99}],
    delta: {text: "", page: 0}},
  report_topic: {title: "Terapia génica en Parkinson", pathophys: {text: "Pérdida de neuronas dopaminérgicas.", page: 1}, typical: [], redFlags: [],
    algorithm: [], differentials: [{entity: "Neurturina", clue: "Soporte neurotrófico", page: 2}], pearls: []},
  report_rounds: {pitch: {text: "Ensayo fase II controlado: 23.1 % vs 12.7 %.", page: 2}, checklist: [],
    questions: [{q: "¿Por qué importa el grupo sham?", a: "Porque el placebo quirúrgico mejoró 12.7 %.", page: 2}]}
};

let errores, peticiones, fallar;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page, {ignorar: [/status of 500/]});
  fallar = false;
  // Las tres tareas del análisis envían las mismas herramientas; la pedida va nombrada al final del mensaje.
  const pedida = body => { const c = body.messages[0].content, t = Array.isArray(c) ? c.at(-1).text : c;
    return (t.match(/herramienta (report_\w+)/) || [])[1] || body.tools[0].name; };
  peticiones = await simularIA(page, body => fallar ? {status: 500} : {tool: pedida(body), input: RESPUESTAS[pedida(body)]});
  await abrirConClave(page);
  await subirPdf(page);
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("muestra la página original del PDF", async ({ page }) => {
  await page.click("#anViewBtn");
  await expect(page.locator("#pvBox canvas")).toBeVisible({timeout: 20_000});
  expect(await sinDesborde(page)).toBe(true);
});

test("mapa por capítulos con IA descarta rangos imposibles", async ({ page }) => {
  await page.click("#anMap");
  await expect(page.locator(".chap b")).toHaveText(["Contexto clínico", "Ensayos clínicos y vectores"]);
});

test("auditoría: envía solo las páginas del capítulo, cita páginas válidas y escapa el HTML", async ({ page }) => {
  await page.click("#anMap"); await expect(page.locator(".chap")).toHaveCount(2);
  await page.click('[data-ch="1"]'); await page.click("#anGo");
  await expect(page.locator("#anOut .anres")).toBeVisible();
  const p = peticiones.at(-1), doc = p.messages[0].content[0];
  expect(doc.text.match(/\[pág\. \d+\]/g)).toEqual(["[pág. 2]"]);
  expect(doc.cache_control).toEqual({type: "ephemeral"});   // el documento se reutiliza desde la caché
  expect(p.tools.every(t => t.strict)).toBe(true);
  expect(p.model).toBe("claude-sonnet-5-5");                 // nivel Equilibrado por defecto
  expect(peticiones[0].model).toBe("claude-haiku-5-5");      // el mapa de capítulos va con el modelo económico
  await expect(page.locator('#anOut [data-pg="99"]')).toHaveCount(0);
  await expect(page.locator("#anOut img")).toHaveCount(0);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  await expect(page.locator("#anOut h3")).toContainText("<img");   // se ve como texto, no se ejecuta
});

test("tocar una página citada abre el visor en esa página", async ({ page }) => {
  await page.click("#anGo"); await expect(page.locator("#anOut .anres")).toBeVisible();
  await page.click('#anOut [data-pg="3"] >> nth=0');
  await expect(page.locator("#pvPage")).toHaveValue("3", {timeout: 20_000});
});

test("convertir en ficha HY pasa por revisión y queda marcada como IA", async ({ page }) => {
  await page.click("#anGo"); await expect(page.locator("#anOut .anres")).toBeVisible();
  await page.click("#anToHy");
  await expect(page.locator("#candList")).toBeVisible();
  expect(await page.evaluate(() => S.userH.length)).toBe(0);   // nada se guarda sin revisión
  await page.click("#candSave");
  const fichas = await page.evaluate(() => S.userH.map(h => ({ai: h.ai, page: h.page})));
  expect(fichas).toEqual([{ai: true, page: 2}]);
});

test("revisión de tema y pase de revista", async ({ page }) => {
  await page.click("[data-ak=tema]"); await page.click("#anGo");
  await expect(page.locator("#anOut h3")).toHaveText("Terapia génica en Parkinson");
  await page.click("[data-ak=revista]"); await page.click("#anGo");
  await expect(page.locator("#anOut .anq")).toHaveCount(1);
  expect(await sinDesborde(page)).toBe(true);
});

test("si la IA falla, muestra el error y no inventa un resultado", async ({ page }) => {
  fallar = true;
  await page.click("#anGo");
  await expect(page.locator("#anCard")).toContainText("Error del servicio de IA");
  await expect(page.locator("#anOut .anres")).toHaveCount(0);
});

test("privacidad: el encabezado y el pie con nombre y correo no llegan a la IA", async ({ page }) => {
  await page.click("#anGo"); await expect(page.locator("#anOut .anres")).toBeVisible();
  const texto = peticiones.at(-1).messages[0].content.map(b => b.text).join("\n");
  expect(texto).toContain("AAV2-GAD");
  expect(texto.replace(/\s+/g, "")).not.toMatch(/prueba@correo\.com|Descargadopara|RevistadePrueba/);
  expect(texto).not.toContain("Fearnley");   // tampoco las referencias
});

test("sin clave explica cómo conseguirla y no ofrece analizar", async ({ page }) => {
  await page.evaluate(() => { localStorage.removeItem("medipulse_api_key"); setKey(""); renderAnalysis(); });
  await expect(page.locator("#anGo")).toHaveCount(0);
  await expect(page.locator("#anCard")).toContainText("necesitas tu clave");
});

test("muestra el costo estimado, registra el real y respeta el nivel elegido", async ({ page }) => {
  await expect(page.locator("#anCard")).toContainText("Costo estimado: ≈ US$");
  await page.click("#anGo"); await expect(page.locator("#anOut .anres")).toBeVisible();
  await expect(page.locator("#toast")).toContainText("≈ US$");
  expect(await page.evaluate(() => aiSpendMonth() > 0)).toBe(true);
  await page.evaluate(() => { S.aiLevel = "max"; renderAnalysis(); });
  const antes = peticiones.length;
  await page.click("#anGo");
  await expect.poll(() => peticiones.length).toBe(antes + 1);
  expect(peticiones.at(-1).model).toBe("claude-opus-5-5");
  expect(peticiones.at(-1).fallbacks).toBe("default");
});

test("las tres tareas comparten instrucciones y herramientas para reutilizar la caché", async ({ page }) => {
  for (const k of ["audit", "tema", "revista"]) {
    const antes = peticiones.length;
    await page.click(`[data-ak=${k}]`); await page.click("#anGo");
    await expect.poll(() => peticiones.length).toBe(antes + 1);
    await expect(page.locator("#anGo")).toBeEnabled();
  }
  const prefijos = peticiones.slice(-3).map(p => JSON.stringify([p.system, p.tools, p.messages[0].content[0]]));
  expect(new Set(prefijos).size).toBe(1);
});

test("detecta signos dañados en el texto del PDF, avisa y pide a la IA no adivinarlos", async ({ page }) => {
  // Como en el consenso de TCE: ≥ sale como «ε» y ≤ como «ω».
  const r = await page.evaluate(() => [simbolosDanados(["Epidural hematoma ε30 mL", "ICP ω 22 mmHg y MAP ε80"]), simbolosDanados(["β-bloqueador y α2 normales", "valor ≥ 30 mL"])]);
  expect(r[0]).toMatchObject({n: 3, pags: [1, 2]});
  expect(r[1]).toBeNull();   // letras griegas reales y signos bien leídos no cuentan
  await page.evaluate(() => { docInfo(cur().id).danados = simbolosDanados(["ε30", "ω 22", "ε80"]); renderAnalysis(); });
  await expect(page.locator("#anCard .note.trap")).toContainText("símbolos que no se leyeron bien");
  const antes = peticiones.length;
  await page.click("#anGo");
  await expect.poll(() => peticiones.length).toBe(antes + 1);
  expect(peticiones.at(-1).messages[0].content.at(-1).text).toContain("No adivines el signo");
});
