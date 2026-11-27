// Prueba de escala: el banco va hacia unos 3500 casos (unos 300 por especialidad). Se sirve cada archivo de
// contenido multiplicado hasta llegar a esa cifra y se revisa que la app siga abriendo rápido, que las pantallas
// grandes respondan, que el progreso de un año quepa en el dispositivo y que el detector de duplicados aguante.
// Si una de estas falla, no es un error de hoy: es la señal para cambiar cómo se carga el contenido
// (por ejemplo, cargar cada especialidad solo cuando se abre; ver tools/peso.js).
const fs = require("fs"), path = require("path");
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

const META = 3500;
const LIM = {arranque: 2000, pantalla: 500, duplicados: 300};   // ms en la máquina de pruebas (hoy: ~425, ~75 y ~80); un celular de gama media tarda varias veces más
const DIR = path.join(__dirname, "..", "data", "contenido");
const archivos = fs.readdirSync(DIR).filter(f => f.endsWith(".js") && !["registro.js", "armar.js"].includes(f));
const porArchivo = Math.ceil(META / archivos.length);
// Cada especialidad con sus casos repetidos (ids y enunciados distintos) hasta su parte de la meta.
function inflar(txt){
  return txt.replace(/MP_CONTENIDO\.agregar\(([\s\S]*)\);\s*$/, (_, json) => {
    const d = JSON.parse(json), base = d.casos || []; if (!base.length) return _;
    const casos = [];
    for (let i = 0; casos.length < porArchivo; i++) { const q = base[i % base.length], k = Math.floor(i / base.length);
      casos.push(k ? Object.assign({}, q, {id: `${q.id}-e${k}`, vignette: `${q.vignette} (variante ${k})`}) : q); }
    return `MP_CONTENIDO.agregar(${JSON.stringify(Object.assign({}, d, {casos}))});\n`;
  });
}

test.use({serviceWorkers: "block"});
let errores;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  await page.route(/\/data\/contenido\/[^/]+\.js/, route => { const f = path.basename(new URL(route.request().url()).pathname);
    if (!archivos.includes(f)) return route.continue();
    route.fulfill({contentType: "text/javascript", body: inflar(fs.readFileSync(path.join(DIR, f), "utf8"))}); });
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test(`con ${META} casos la app abre, las pantallas responden y el progreso de un año cabe en el dispositivo`, async ({ page }) => {
  await page.goto("/");
  const r = await page.evaluate(() => ({n: QUESTIONS.length, arranque: Math.round(performance.getEntriesByType("navigation")[0].loadEventEnd)}));
  expect(r.n).toBeGreaterThan(META * 0.95);   // los casos retirados o en revisión no entran al banco
  expect(r.arranque, "la app tarda demasiado en abrir").toBeLessThan(LIM.arranque);
  // Pantallas que recorren todo el banco
  const t = await page.evaluate(() => { const m = {};
    for (const v of ["banco", "hoy", "prog"]) { const t0 = performance.now(); go(v); m[v] = Math.round(performance.now() - t0); }
    const t0 = performance.now(); startSession({label: "x", tag: "norm", stages: [{name: "x", items: QUESTIONS.slice(0, 60).map(q => ({t: "q", id: q.id}))}]});
    m.sesion = Math.round(performance.now() - t0); endSession(false); return m; });
  Object.entries(t).forEach(([k, ms]) => expect(ms, `«${k}» tarda demasiado`).toBeLessThan(LIM.pantalla));
  // Un año de estudio: respuestas hasta el máximo que se guarda, repasos de todo el banco y un registro diario.
  const espacio = await page.evaluate(() => { const ahora = Date.now();
    QUESTIONS.forEach((q, i) => { S.srs["q" + q.id] = {b: 2, due: ahora + 864e5, n: 4, ok: 2, last: 2}; });
    for (let i = 0; i < RESP_MAX; i++) S.resp.push({id: String(QUESTIONS[i % QUESTIONS.length].id), d: ahora - i * 6e5, ok: i % 3 > 0, o: 1, ex: 0, c: "seguro", m: "umbral"});
    for (let d = 0; d < 365; d++) S.log[todayKey(new Date(ahora - d * 864e5))] = {sec: 5400, q: 60, ok: 45, c: 60, e: {"Medicina Interna": [20, 15], "Cirugía": [20, 15], "Pediatría": [20, 15]}};
    save(); return {bytes: ESPACIO_USADO, aviso: ESPACIO_AVISO, fallo: SAVE_FAILED}; });
  expect(espacio.fallo).toBe(false);
  expect(espacio.bytes, "el progreso de un año ya no cabe con margen").toBeLessThan(espacio.aviso);
  // El detector de duplicados contra todo el banco
  const dup = await page.evaluate(() => { const t0 = performance.now(); dupBuscar(QUESTIONS[5], "q"); return Math.round(performance.now() - t0); });
  expect(dup, "el detector de duplicados tarda demasiado").toBeLessThan(LIM.duplicados);
  console.log("escala:", JSON.stringify({casos: r.n, arranque_ms: r.arranque, ...t, progreso_MB: +(espacio.bytes / 1e6).toFixed(2), duplicados_ms: dup}));
});
