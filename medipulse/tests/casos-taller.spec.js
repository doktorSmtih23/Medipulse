// «🩺 Casos» del Taller (js/taller-casos.js): los tipos de caso y las cantidades se adaptan al documento
// (guía, revisión o estudio), solo se muestran los conteos que existen, y cada caso se guarda con su tipo.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

const CASOS = {fichas: [], questions: [
  {qtype: "caso", clase: "diferenciales", specialty: "Medicina Interna", area: "Neurología", topic: "Parkinson · Diferenciales", vignette: "Hombre de 70 años con temblor…",
    options: ["Parkinson", "Temblor esencial", "Parálisis supranuclear", "Atrofia multisistémica"], correct: 0, whyCorrect: "Por el temblor de reposo.", pearl: "", trap: "", page: 1, citas: []},
  {qtype: "critica", clase: "diseno", specialty: "Medicina Interna", area: "Neurología", topic: "Ensayo · Diseño", vignette: "¿Qué sesgo…?",
    options: ["Selección", "Memoria", "Detección", "Ninguno"], correct: 2, whyCorrect: "Por el cegamiento.", pearl: "", trap: "", page: 1, citas: []}]};

let errores, peticiones;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  peticiones = await simularIA(page, () => ({json: CASOS}));
  await abrirConClave(page);
  await subirPdf(page);
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

// Abre la sección de casos con el documento marcado como «design» (GPC, REV, ECA…).
async function abrirCasos(page, design){
  await page.evaluate(d => { const s = S.sources[0]; s.design = d; gen.casos = null; save(); }, design);
  await page.click('#genCard [data-gt="ai"]');
  await page.click('[data-gsub="casos"]');
  await expect(page.locator("#casosBox")).toBeVisible();
}

test("la pestaña se llama «Fichas y casos» y tiene dos secciones; las fichas automáticas siguen igual", async ({ page }) => {
  await expect(page.locator('#genCard [data-gt="ai"]')).toContainText("Fichas y casos");
  await page.click('#genCard [data-gt="ai"]');
  await expect(page.locator('[data-gsub="fichas"]')).toHaveClass(/on/);
  await expect(page.locator("#aGo")).toBeVisible();
  await expect(page.locator("#gBody")).not.toContainText("Preguntas directas");
  await expect(page.locator("#gBody")).not.toContainText("Personalizar");
});

test("con una revisión: sus cuatro tipos de caso, sin «Lo que encontré» si no hay recomendaciones graduadas, y sin desbordar", async ({ page }) => {
  await abrirCasos(page, "REV");
  await expect(page.locator("#casosBox .tag")).toContainText("Revisión");
  await expect(page.locator("#casosBox .ct b")).toHaveText(["🩺 Conducta", "🔎 Diagnóstico", "🔀 Diferenciales", "📏 Datos duros"]);
  await expect(page.locator("#casosBox")).not.toContainText("Lo que encontré");
  await expect(page.locator("#casosBox")).not.toContainText("recomendaciones graduadas");
  await expect(page.locator("#cGo")).toHaveText("🩺 Crear 10 casos");
  await page.click('[data-cmas="diferenciales"]');
  await expect(page.locator("#cGo")).toHaveText("🩺 Crear 11 casos");
  await page.click('[data-cmenos="conducta"]');
  await expect(page.locator("#cGo")).toHaveText("🩺 Crear 10 casos");
  expect(await sinDesborde(page)).toBe(true);
});

test("con un estudio original: diseño, resultados, aplicabilidad y desenlace sustituto", async ({ page }) => {
  await abrirCasos(page, "ECA");
  await expect(page.locator("#casosBox .ct b")).toHaveText(["🔬 Diseño y sesgos", "📊 Resultados con cifras", "🩺 ¿Cambia tu conducta?", "⚖️ Desenlace sustituto"]);
});

test("con una guía: «Lo que no se hace» y los conteos solo aparecen si el tema tiene esas recomendaciones", async ({ page }) => {
  const prop = (recs) => page.evaluate(recs => { const orig = recsPorGrado; recsPorGrado = () => recs;
    try { const sel = {pages: ["x"], nums: [1]}; return {tipos: casosPropuesta("guia", sel).tipos.map(t => t.k), hall: casosHallazgos("guia", sel)}; } finally { recsPorGrado = orig; } }, recs);
  const sinNo = await prop([{grupo: "hace", cifras: []}, {grupo: "hace", cifras: ["5 días"]}]);
  expect(sinNo.tipos).toEqual(["conducta", "diagnostico", "umbrales"]);
  expect(sinNo.hall).toEqual([[2, "recomendaciones «hacer»"], [1, "con cifras o dosis"]]);
  const conNo = await prop([{grupo: "hace", cifras: []}, {grupo: "no", cifras: []}]);
  expect(conNo.tipos).toEqual(["conducta", "nohacer", "diagnostico", "umbrales"]);
  expect(conNo.hall.map(h => h[1])).toEqual(["recomendaciones «hacer»", "«no hacer»"]);
});

test("crear casos: la petición pide cada clase con su cantidad, sin fichas, y cada caso se guarda con su tipo de pregunta", async ({ page }) => {
  await abrirCasos(page, "REV");
  await page.click("#cGo");
  await expect(page.locator("#candList")).toBeVisible();
  const pide = peticiones.at(-1).messages[0].content.map(b => b.text).join("\n");
  expect(pide).toContain("Genera solo casos");
  expect(pide).toContain('de clase "diferenciales"');
  expect(pide).not.toContain('de clase "nohacer"');
  expect(peticiones.at(-1).system).toContain("La opción correcta no debe delatarse por ser la más larga");
  await page.click("#candSave");
  expect(await page.evaluate(() => S.userQ.map(q => [q.topic, q.tipo]))).toEqual([["Parkinson · Diferenciales", "diagnostico"], ["Ensayo · Diseño", "critica"]]);
});

test("dificultad: cuatro niveles, y debajo se lee qué significa el elegido (en el celular no hay texto emergente)", async ({ page }) => {
  await abrirCasos(page, "REV");
  await expect(page.locator("[data-lv]")).toHaveText(["Básica", "Examen de residencia", "Difícil", "Especialista"]);
  await expect(page.locator("#cNivel")).toContainText("Examen de residencia: aplicación clínica");
  await page.click('[data-lv="avanzada"]');
  await expect(page.locator("#cNivel")).toContainText("Especialista: nivel de subespecialidad");
  await expect(page.locator("#cNivel")).toContainText("residentes y especialistas");
  await page.click('[data-lv="dificil"]'); await page.click("#cGo");
  await expect(page.locator("#candList")).toBeVisible();
  expect(peticiones.at(-1).messages[0].content.map(b => b.text).join("\n")).toContain("Dificultad: Difícil (distractores muy parecidos");
});

test("desde Casos → Crear → «Generar desde tu PDF», el documento abre directamente en «🩺 Casos»", async ({ page }) => {
  await page.click("nav [data-go=banco]");
  await page.click('[data-go="new"]'); await page.click('[data-nt="g"]');
  await page.click("[data-gen]");
  await expect(page.locator("#casosBox")).toBeVisible();
  await expect(page.locator('[data-gsub="casos"]')).toHaveClass(/on/);
});

test("el tema se elige dentro de la sección y la cantidad de cada tipo se escribe; hay un tope por vez", async ({ page }) => {
  await page.evaluate(() => { const s = S.sources[0]; s.indice = {v: 99, fuente: "ia", items: [{title: "Diagnóstico", from: 1, to: 1, lvl: 1}, {title: "Tratamiento", from: 2, to: 2, lvl: 1}]}; save(); });
  await abrirCasos(page, "REV");
  await expect(page.locator("#cTema option")).toHaveText([/Todo el documento/, /Diagnóstico/, /Tratamiento/]);
  await page.selectOption("#cTema", "1");
  await expect(page.locator("#cTema")).toHaveValue("1");
  expect(await page.evaluate(() => temaActual().title)).toBe("Tratamiento");
  // Escribir la cantidad: 12 casos de diferenciales.
  await page.fill('[data-ccant="diferenciales"]', "12"); await page.locator('[data-ccant="diferenciales"]').dispatchEvent("change");
  await expect(page.locator("#cGo")).toHaveText("🩺 Crear 20 casos");
  // Más de 30 por vez: lo dice y no deja crear.
  await page.fill('[data-ccant="conducta"]', "20"); await page.locator('[data-ccant="conducta"]').dispatchEvent("change");
  await expect(page.locator("#casosBox")).toContainText("Máximo 30 casos por vez");
  await expect(page.locator("#cGo")).toBeDisabled();
  expect(await sinDesborde(page)).toBe(true);
});
