// Validación del contenido médico incluido (data/contenido/*.js).
// Corre con npm test. Si agregas o editas contenido y algo no cumple el formato, esta prueba dice qué y dónde.
const { test, expect } = require("@playwright/test");

// Ids publicados antes de pasar a un archivo por especialidad. El progreso de los usuarios está guardado
// con ellos: nunca deben desaparecer ni cambiar (si un ítem queda obsoleto, se corrige su texto).
const IDS_HISTORICOS = {
  casos: Array.from({length: 26}, (_, i) => i + 1),
  fichas: ["hy1", "hy2", "hy3", "hy4", "hy5", "hy6"],
  tarjetas: Array.from({length: 53}, (_, i) => i + 1)
};
const ARCHIVOS = ["medicina-interna", "cirugia", "pediatria", "ginecologia", "salud-publica"];

let C;   // contenido tal como lo carga la app
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto("/");
  C = await page.evaluate(() => ({
    specs: SPECS, fuentes: SOURCES.map(s => s.id),
    esp: MP_CONTENIDO.especialidades,
    total: {casos: BUILTIN_Q.length, fichas: HY_CARDS.length, tarjetas: BUILTIN_F.length}
  }));
  await page.close();
});
const todos = tipo => C.esp.flatMap(e => (e[tipo] || []).map(x => Object.assign({_esp: e.especialidad, _pref: e.prefijo}, x)));
const donde = x => `${x._esp} · ${x.id}`;

test("hay un archivo por especialidad, sin repetir", () => {
  expect(C.esp.map(e => e.especialidad).sort()).toEqual([...C.specs].sort());
  expect(new Set(C.esp.map(e => e.prefijo)).size).toBe(C.esp.length);
  expect(ARCHIVOS.length).toBe(C.specs.length);
  for (const e of C.esp) expect(e.actualizado, e.especialidad).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test("el starter pack son las 4 básicas y Salud Pública va aparte", () => {
  const paq = Object.fromEntries(C.esp.map(e => [e.especialidad, e.paquete]));
  expect(paq).toEqual({"Medicina Interna": "starter", "Cirugía": "starter", "Pediatría": "starter", "Ginecología": "starter", "Salud Pública": "salud-publica"});
});

const visibles = tipo => todos(tipo).filter(x => x.estado !== "pendiente");

test("la app usa todo el contenido de los archivos, menos lo pendiente", () => {
  expect(C.total).toEqual({casos: visibles("casos").length, fichas: visibles("fichas").length, tarjetas: visibles("tarjetas").length});
});

test("el único estado permitido es \"pendiente\"", () => {
  const mal = ["casos", "fichas", "tarjetas"].flatMap(t => todos(t)).filter(x => x.estado !== undefined && x.estado !== "pendiente").map(donde);
  expect(mal).toEqual([]);
});

test("en una especialidad verificada, todo lo visible trae su cita textual y la fecha de verificación", () => {
  const verificadas = C.esp.filter(e => e.revision === "verificada").map(e => e.especialidad);
  expect(verificadas).toEqual(expect.arrayContaining(["Medicina Interna", "Pediatría", "Ginecología"]));
  const mal = ["casos", "fichas", "tarjetas"].flatMap(t => visibles(t)).filter(x => verificadas.includes(x._esp)).filter(x =>
    !Array.isArray(x.cita) || !x.cita.length || x.cita.some(c => !c.donde || !c.texto || c.texto.length < 20) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(x.verificado || "")).map(donde);
  expect(mal).toEqual([]);
});

test("la demostración de Medicina Interna es corta (máximo 8 casos y 5 fichas)", () => {
  const mi = tipo => visibles(tipo).filter(x => x._esp === "Medicina Interna").length;
  expect(mi("casos")).toBeGreaterThan(0); expect(mi("casos")).toBeLessThanOrEqual(8);
  expect(mi("fichas")).toBeLessThanOrEqual(5);
});

test("ningún id histórico desapareció (protege el progreso de los usuarios)", () => {
  for (const tipo of ["casos", "fichas", "tarjetas"]) {
    const ids = new Set(todos(tipo).map(x => String(x.id)));
    const faltan = IDS_HISTORICOS[tipo].filter(id => !ids.has(String(id)));
    expect(faltan, `${tipo} sin su id histórico`).toEqual([]);
  }
});

test("los ids no se repiten y los nuevos llevan el prefijo de su especialidad", () => {
  const letra = {casos: "c", fichas: "f", tarjetas: "t"};
  for (const tipo of ["casos", "fichas", "tarjetas"]) {
    const ids = todos(tipo).map(x => String(x.id));
    expect(ids.filter((id, i) => ids.indexOf(id) !== i), `${tipo} con id repetido`).toEqual([]);
    const historicos = new Set(IDS_HISTORICOS[tipo].map(String));
    const mal = todos(tipo).filter(x => !historicos.has(String(x.id)) && !new RegExp(`^${x._pref}-${letra[tipo]}\\d{2,}$`).test(String(x.id))).map(donde);
    expect(mal, `${tipo} nuevos sin el formato <prefijo>-${letra[tipo]}01`).toEqual([]);
  }
});

test("todo cita una fuente de la biblioteca", () => {
  const fuentes = new Set(C.fuentes);
  const sin = ["casos", "fichas", "tarjetas"].flatMap(t => todos(t)).filter(x => !fuentes.has(x.src)).map(donde);
  expect(sin).toEqual([]);
});

test("cada caso está completo: 4 opciones distintas, una respuesta, explicación, perla y trampa", () => {
  const mal = todos("casos").filter(q =>
    !q.topic || !q.vignette || !Array.isArray(q.options) || q.options.length !== 4 || q.options.some(o => !String(o).trim()) ||
    new Set(q.options).size !== 4 || !Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3 ||
    !q.whyCorrect || !q.pearl || !q.trap || !q.difficulty).map(donde);
  expect(mal).toEqual([]);
});

test("el enunciado de un caso solo usa el resaltado permitido (<span class='hy'>)", () => {
  // El enunciado se muestra como HTML: cualquier otra etiqueta podría romper la pantalla o ser peligrosa.
  const mal = todos("casos").filter(q => q.vignette.replace(/<span class='hy'>|<\/span>/g, "").match(/[<>]/)).map(donde);
  expect(mal).toEqual([]);
});

test("las respuestas correctas no están siempre en la misma posición", () => {
  for (const e of C.esp) {
    const pos = (e.casos || []).filter(q => q.estado !== "pendiente").map(q => q.correct);
    if (pos.length >= 5) expect(new Set(pos).size, `${e.especialidad}: respuestas correctas siempre en la misma letra`).toBeGreaterThan(1);
  }
});

test("cada ficha HY tiene título, 2 a 6 datos clave y una fuente", () => {
  const mal = todos("fichas").filter(h => !h.title || !h.badge || !Array.isArray(h.thresholds) || h.thresholds.length < 2 || h.thresholds.length > 6 ||
    h.thresholds.some(t => !t.label || !t.val)).map(donde);
  expect(mal).toEqual([]);
});

test("cada tarjeta tiene frente y reverso", () => {
  expect(todos("tarjetas").filter(c => !c.front || !c.back).map(donde)).toEqual([]);
});
