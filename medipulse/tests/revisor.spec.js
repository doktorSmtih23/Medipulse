// Revisor automático del código (ESLint, eslint.config.js) y nombres globales (tools/globales.js).
// Corre con las demás pruebas para que nadie tenga que acordarse de `npm run revisar`.
const path = require("path");
const { test, expect } = require("@playwright/test");
const { ESLint } = require("eslint");
const { mapa } = require("../tools/globales.js");

const ROOT = path.join(__dirname, "..");
const eslint = () => new ESLint({cwd: ROOT});
const errores = rs => rs.flatMap(r => r.messages.map(m => `${path.relative(ROOT, r.filePath)}:${m.line} ${m.ruleId}: ${m.message}`));

test("el código de la app pasa el revisor sin errores", async () => {
  const rs = await eslint().lintFiles(["js", "data", "sw.js", "tools", "eslint.config.js", "playwright.config.js"]);
  expect(errores(rs)).toEqual([]);
});

test("ningún nombre global se declara en dos archivos (el segundo pisaría al primero)", () => {
  const rep = Object.entries(mapa()).filter(([, fs]) => fs.length > 1).map(([n, fs]) => `${n}: ${fs.join(", ")}`);
  expect(rep).toEqual([]);
});

test("el revisor sí atrapa los errores típicos: nombre mal escrito, código visible en pantalla y variable sin usar", async () => {
  const codigo = [
    "function pintar(){",
    "  const sobra = 1;",
    "  toastt(\"Listo\");",                                // nombre mal escrito: toast
    "  return \"Son ${DIAG_P2.length} preguntas\";",         // ${…} entre comillas normales: se vería el código
    "}"
  ].join("\n");
  const [r] = await eslint().lintText(codigo, {filePath: path.join(ROOT, "js", "prueba-revisor.js")});
  const reglas = r.messages.map(m => m.ruleId);
  expect(reglas).toContain("no-undef");
  expect(reglas).toContain("no-template-curly-in-string");
  expect(reglas).toContain("no-unused-vars");
  expect(r.messages.find(m => m.ruleId === "no-undef").message).toContain("toastt");
});

test("hallazgo del revisor: al guardar solo repasos rápidos del Taller, el aviso los cuenta (antes decía «nada»)", async ({ page }) => {
  const { subirPdf } = require("./ayudas");
  await page.goto("/");
  await subirPdf(page);
  await page.evaluate(() => { cands = [{kind: "c", on: true, front: "¿Dosis de adrenalina en anafilaxia?", back: "0,5 mg IM", specialty: "Medicina Interna", page: 1}]; saveCands(); });
  await expect(page.locator("#toast")).toContainText("Guardado: 1 repaso rápido");
});

test("cada parte del progreso (S) solo la escribe su archivo dueño", async () => {
  const lint = async (archivo, codigo) => (await eslint().lintText(codigo, {filePath: path.join(ROOT, "js", archivo)}))[0].messages.filter(m => m.ruleId === "medipulse/dueno-del-estado").map(m => m.message);
  // Desde otro archivo, escribir el repaso, archivar o agregar una fuente directamente es un error…
  expect(await lint("hoy.js", 'S.srs["q1"] = {b: 0};')).toEqual(["S.srs solo se escribe en js/estado.js: usa una de sus funciones."]);
  expect(await lint("sesion.js", 'delete S.hidden["q1"];')).toHaveLength(1);
  expect(await lint("taller.js", "S.sources.push({id: 1});")).toHaveLength(1);
  expect((await lint("banco.js", "S.campoNuevo = 1;"))[0]).toContain("no tiene archivo dueño");
  // …el dueño sí puede, y leer está permitido en todas partes.
  expect(await lint("estado.js", 'S.srs["q1"] = {b: 0};')).toEqual([]);
  expect(await lint("fuentes.js", "S.sources.push({id: 1});")).toEqual([]);
  expect(await lint("hoy.js", 'const r = S.srs["q1"]; const n = S.sources.length; console.log(r, n);')).toEqual([]);
});
