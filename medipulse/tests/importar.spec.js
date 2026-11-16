// Pegar preguntas de otra IA o de otro banco (js/importar.js): se organizan solas, sin IA, se guardan
// tal como vienen (4 o 5 opciones) y se muestran con su análisis por opción y la exención de responsabilidad.
const { test, expect } = require("@playwright/test");
const fs = require("fs"), path = require("path");
const { vigilarErrores, sinDesborde } = require("./ayudas");
const EJEMPLO = fs.readFileSync(path.join(__dirname, "fixtures", "pregunta-otra-ia.txt"), "utf8");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); await page.evaluate(() => { newType = "i"; go("new"); }); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("organiza una pregunta de Gemini: caso, 5 opciones, correcta, análisis, dato clave y trampa", async ({ page }) => {
  const q = await page.evaluate(t => parsearPregunta(partirBloques(t)[0]), EJEMPLO);
  expect(q.vignette).toMatch(/^Niño de 7 años.*¿Cuál es el manejo más apropiado\?$/s);
  expect(q.options).toHaveLength(5);
  expect(q.correct).toBe(2);
  expect(q.porOpcion[0]).toMatch(/^Técnica de distracción utilizada/);
  expect(q.porOpcion[0]).toContain("\nPor qué es incorrecta:");
  expect(q.pearl).toContain("hamartoma hipotalámico sin efecto de masa");
  expect(q.trap).toContain("> 0.3 UI/L");      // sin los $ de las fórmulas
  expect(q.specialty).toBe("Pediatría");        // sugerida por «Niño de 7 años»
});

test("pegar, confirmar y guardar tal como viene; al estudiar se ve el análisis y la exención de responsabilidad", async ({ page }) => {
  await page.fill("#impTxt", EJEMPLO);
  await page.click("#impGo");
  await expect(page.locator("#impOut")).toContainText("sin revisar ni auditar su contenido");
  await page.fill("#impOut [data-if=topic]", "Pubertad precoz central");
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#impSave");
  const q = await page.evaluate(() => { const q = S.userQ.at(-1); return {n: q.options.length, c: q.correct, spec: q.specialty, topic: q.topic, src: srcLine(q)}; });
  expect(q).toMatchObject({n: 5, c: 2, spec: "Pediatría", topic: "Pubertad precoz central"});
  expect(q.src).toContain("MediPulse no revisa ni audita este contenido");
  await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: S.userQ.at(-1).id}]}]}));
  await expect(page.locator("#opts .opt")).toHaveCount(5);
  await page.click("#opts .opt >> nth=0");
  await expect(page.locator("#fbBox")).toContainText("Análisis de cada opción");
  await expect(page.locator("#fbBox .porop.mia")).toContainText("tu respuesta");
  await expect(page.locator("#fbBox .porop.ok")).toContainText("GnRH");
});

test("varias preguntas separadas por --- y con el formato del prompt", async ({ page }) => {
  const texto = `Pregunta 1
Mujer de 30 años con disuria y polaquiuria sin fiebre. ¿Diagnóstico más probable?
A) Pielonefritis
B) Cistitis aguda no complicada
C) Uretritis gonocócica
D) Vaginosis
Respuesta correcta: B
Especialidad: Medicina Interna
Tipo: Diagnóstico
Tema: Infección urinaria baja
---
Pregunta 2
¿Cuál es la dosis de adrenalina IM en anafilaxia del adulto?
A) 0,5 mg
B) 1 mg
C) 0,1 mg
D) 5 mg
Respuesta correcta: A
Tipo: Datos duros`;
  const qs = await page.evaluate(t => partirBloques(t).map(parsearPregunta), texto);
  expect(qs.map(q => [q.correct, q.specialty, q.tipo, q.topic])).toEqual([[1, "Medicina Interna", "diagnostico", "Infección urinaria baja"], [0, "", "datos", ""]]);
});

test("el prompt usa la fuente que da el usuario; también se puede copiar solo el formato para una skill", async ({ page }) => {
  await page.click("summary:has-text('Prompt para tu IA')");
  await expect(page.locator("pre.prompt >> nth=0")).toContainText("Usa SOLO la información del documento que te di");
  const prompt = page.locator("pre.prompt >> nth=0");
  await expect(prompt).toContainText("Pídeme solo la fuente: que suba el PDF, pegue el texto o mande una foto");
  await expect(prompt).toContainText("Identifica tú el título del documento");
  await expect(prompt).toContainText("mapa conceptual");
  await expect(prompt).toContainText("recomiéndame 4");
  await expect(page.locator("pre.prompt >> nth=1")).toContainText("Respuesta correcta: [letra]");
  await expect(page.locator("[data-copiar=prompt]")).toBeVisible();
  await expect(page.locator("[data-copiar=formato]")).toBeVisible();
  // lo que devuelve la IA con ese formato se lee completo, con su fuente y página
  const q = await page.evaluate(() => organizarTexto(`Pregunta 1
Mujer de 40 años con disnea. ¿Diagnóstico más probable?
A) Uno
B) Dos
C) Tres
D) Cuatro
Respuesta correcta: C
Especialidad: Medicina Interna
Tipo: Diagnóstico
Tema: Disnea
Explicación: la explicación
Perla: el dato
Trampa: la trampa
Fuente: Guía de prueba, ACIN, 2026 · pág. 12`)[0]);
  expect([q.correct, q.specialty, q.tipo, q.topic, q.fundamento, q.pearl, q.trap, q.fuenteTxt]).toEqual([2, "Medicina Interna", "diagnostico", "Disnea", "la explicación", "el dato", "la trampa", "Guía de prueba, ACIN, 2026 · pág. 12"]);
  await expect(page.locator("pre.prompt >> nth=1")).toContainText("Perla:");
});

test("crear a mano admite una quinta opción opcional", async ({ page }) => {
  await page.evaluate(() => { newType = "q"; renderNew(); });
  await page.fill("#nVig", "Caso de prueba con cinco opciones");
  for (const [i, t] of ["Uno", "Dos", "Tres", "Cuatro", "Cinco"].entries()) await page.fill(`#nOpt${i}`, t);
  await page.check("input[name=nCor][value='4']");
  await page.click("#nSave");
  expect(await page.evaluate(() => { const q = S.userQ.at(-1); return [q.options.length, q.correct]; })).toEqual([5, 4]);
});

test("lo importado lleva el rótulo «Importada por el usuario» en la pregunta y en el banco", async ({ page }) => {
  await page.evaluate(t => { impCands = partirBloques(t).map(parsearPregunta); guardarImportadas(); }, EJEMPLO);
  const id = await page.evaluate(() => S.userQ.at(-1).id);
  await page.evaluate(i => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: i}]}]}), id);
  await expect(page.locator("#sessBody .origen")).toContainText("Importada por el usuario");
  await page.click("#quitBtn"); await page.click("nav [data-go=banco]");
  await page.evaluate(() => { PLEG.bqlista = true; PLEG["bq_Pediatría"] = true; });
  await page.click('#qSpecs [data-sp="Pediatría"]');
  await expect(page.locator("#qList .origen").first()).toContainText("Importada por el usuario");
});

test("preguntas primero y respuestas al final (otro formato de Gemini): las empareja en orden", async ({ page }) => {
  const texto = fs.readFileSync(path.join(__dirname, "fixtures", "preguntas-respuestas-al-final.txt"), "utf8");
  const qs = await page.evaluate(t => organizarTexto(t).map(q => ({n: q.options.length, c: q.correct, fund: q.fundamento.slice(0, 20), dato: q.pearl.slice(0, 20), trampa: q.trap.slice(0, 20), spec: q.specialty, guion: /-\nPor qu/.test(q.porOpcion.join("\n"))})), texto);
  expect(qs).toEqual([
    {n: 4, c: 1, fund: "De acuerdo con el ar", dato: "Los estudios neurofi", trampa: "Recuerda siempre qué", spec: "", guion: false},
    {n: 4, c: 1, fund: "El sistema de gradua", dato: "La presencia de sign", trampa: "Al evaluar algoritmo", spec: "", guion: false}]);
  // «diabetes de 10 años de evolución» no es la edad del paciente
  expect(await page.evaluate(() => [esPediatrico("Un hombre de 55 años, con diabetes de 10 años de evolución"), esPediatrico("Lactante de 4 meses")])).toEqual([false, true]);
});

test("formato con «Dato clave» y la explicación dentro de la opción correcta: se llena Explicación, Perla y Trampa", async ({ page }) => {
  const texto = require("fs").readFileSync(require("path").join(__dirname, "fixtures/preguntas-inph-modo-a.txt"), "utf8");
  const qs = await page.evaluate(t => organizarTexto(t).map(q => [q.correct, q.specialty, q.tipo, !!q.fundamento, !!q.pearl, !!q.trap, /pág/.test(q.fuenteTxt), q.fundamento.slice(0, 20)]), texto);
  expect(qs.map(q => q.slice(0, 7))).toEqual([[2, "Medicina Interna", "conducta", true, true, true, true], [0, "Cirugía", "diagnostico", true, true, true, true], [0, "Salud Pública", "datos", true, true, true, true]]);
  expect(qs[0][7]).toMatch(/^Es correcta porque/);
});
