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
const ARCHIVOS = ["medicina-interna", "cirugia", "pediatria", "ginecologia", "salud-publica", "ortopedia", "urologia", "mastologia"];
// Casos que se pasaron de especialidad: conservan su id (el progreso está guardado con él) aunque el prefijo sea el de antes.
const IDS_MOVIDOS = {"Ortopedia y Traumatología": ["cir-c27", "cir-c28", "cir-c29", "cir-c30"]};

let C;   // contenido tal como lo carga la app
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto("/");
  C = await page.evaluate(() => ({
    specs: [...SPECS, ...SPECS_MODULOS], fuentes: SOURCES.map(s => s.id),
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

test("el starter pack son las 4 básicas; Epidemiología y Estadística, Ortopedia y Traumatología, Urología y Mastología van aparte", () => {
  const paq = Object.fromEntries(C.esp.map(e => [e.especialidad, e.paquete]));
  expect(paq).toEqual({"Medicina Interna": "starter", "Cirugía": "starter", "Pediatría": "starter", "Ginecología": "starter", "Epidemiología y Estadística": "salud-publica", "Ortopedia y Traumatología": "ortopedia", "Urología": "urologia", "Mastología": "mastologia"});
});

const visibles = tipo => todos(tipo).filter(x => x.estado !== "pendiente");

test("la app usa todo el contenido de los archivos, menos lo pendiente", () => {
  expect(C.total).toEqual({casos: visibles("casos").length, fichas: visibles("fichas").length, tarjetas: visibles("tarjetas").length});
});

test("el único estado permitido es \"pendiente\"", () => {
  const mal = ["casos", "fichas", "tarjetas"].flatMap(t => todos(t)).filter(x => x.estado !== undefined && x.estado !== "pendiente").map(donde);
  expect(mal).toEqual([]);
});

// Excepciones explícitas a la regla de la cita: casos que aún no la tienen porque falta el material.
// Para sacar uno de aquí, agrégale su cita textual y la fecha; la lista solo debe achicarse.
const SIN_CITA_PERMITIDOS = [];
test("todo caso visible de cualquier especialidad trae su cita textual y la fecha de verificación (salvo la lista de excepciones)", () => {
  const sinCita = x => !Array.isArray(x.cita) || !x.cita.length || x.cita.some(c => !c.donde || !c.texto || c.texto.length < 20) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(x.verificado || "");
  const mal = visibles("casos").filter(x => sinCita(x) && !SIN_CITA_PERMITIDOS.includes(String(x.id))).map(donde);
  expect(mal).toEqual([]);
  // la lista no guarda casos que ya cumplen ni ids que no existen
  const sobran = SIN_CITA_PERMITIDOS.filter(id => { const x = visibles("casos").find(q => String(q.id) === id); return !x || !sinCita(x); });
  expect(sobran, "quita estos ids de SIN_CITA_PERMITIDOS").toEqual([]);
});

test("en una especialidad verificada, también las fichas y tarjetas visibles traen su cita y la fecha", () => {
  const verificadas = C.esp.filter(e => e.revision === "verificada").map(e => e.especialidad);
  expect(verificadas).toEqual(expect.arrayContaining(["Medicina Interna", "Pediatría", "Ginecología", "Cirugía", "Epidemiología y Estadística", "Ortopedia y Traumatología", "Urología", "Mastología"]));
  const mal = ["fichas", "tarjetas"].flatMap(t => visibles(t)).filter(x => verificadas.includes(x._esp)).filter(x =>
    !Array.isArray(x.cita) || !x.cita.length || x.cita.some(c => !c.donde || !c.texto || c.texto.length < 20) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(x.verificado || "")).map(donde);
  expect(mal).toEqual([]);
});

test("la dificultad de cada caso usa la escala única del Taller (basica, residencia, dificil, avanzada)", () => {
  const mal = todos("casos").filter(q => !["basica", "residencia", "dificil", "avanzada"].includes(q.difficulty)).map(q => `${donde(q)}: ${q.difficulty}`);
  expect(mal).toEqual([]);
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
    const movido = x => (IDS_MOVIDOS[x._esp] || []).includes(String(x.id));
    const mal = todos(tipo).filter(x => !historicos.has(String(x.id)) && !movido(x) && !new RegExp(`^${x._pref}-${letra[tipo]}\\d{2,}$`).test(String(x.id))).map(donde);
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

test("la respuesta correcta no se delata por ser la opción más larga", async ({ page }) => {
  await page.goto("/");
  const r = await page.evaluate(() => {
    const qs = QUESTIONS.filter(q => q.options && q.options.length >= 4);
    const larga = qs.filter(q => { const L = q.options.map(o => o.length); return L[q.correct] === Math.max(...L); });
    // «Clara»: la correcta mide más de 1,3 veces la siguiente opción más larga.
    const clara = larga.filter(q => { const L = q.options.map(o => o.length).sort((a, b) => b - a); return L[0] > 1.3 * L[1]; });
    return {n: qs.length, larga: larga.length, clara: clara.map(q => q.id)};
  });
  expect(r.clara, "casos donde la correcta es mucho más larga que las demás").toEqual([]);
  expect(r.larga / r.n, "la correcta es la más larga en más casos de lo esperable al azar").toBeLessThanOrEqual(0.3);
});

// Auditoría de noviembre de 2026: la B era la correcta en el 41 % de los casos. Quien marcaba B ante la duda
// acertaba casi la mitad. Cada letra debe ser la correcta en una proporción cercana al 25 %.
test("la letra de la respuesta correcta está repartida: ninguna se puede adivinar", () => {
  const casos = todos("casos"), porEsp = {};
  casos.forEach(q => { const e = q._esp; (porEsp[e] = porEsp[e] || [0, 0, 0, 0])[q.correct]++; });
  const total = [0, 0, 0, 0]; casos.forEach(q => total[q.correct]++);
  total.forEach((c, i) => expect(c / casos.length, `la ${"ABCD"[i]} es la correcta en ${c} de ${casos.length}`).toBeGreaterThanOrEqual(0.2));
  total.forEach((c, i) => expect(c / casos.length, `la ${"ABCD"[i]} es la correcta en ${c} de ${casos.length}`).toBeLessThanOrEqual(0.3));
  Object.entries(porEsp).forEach(([e, c]) => { const n = c.reduce((a, b) => a + b);
    c.forEach((k, i) => expect(k / n, `${e}: la ${"ABCD"[i]} es la correcta en ${k} de ${n}`).toBeLessThanOrEqual(0.35)); });
});

test("si todas las opciones son cifras, van de menor a mayor", () => {
  const cifra = o => { const m = String(o).replace(/CURB65 de/, "").match(/\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(",", ".")) : NaN; };
  const desordenadas = todos("casos").filter(q => q.options.every(o => /^\s*(?:[≥≤<>]\s*)?\d|^(?:CURB65 de|Unos|NNT)/.test(o)))
    .filter(q => q.options.some((o, i) => i && cifra(o) < cifra(q.options[i - 1]))).map(donde);
  expect(desordenadas).toEqual([]);
});

test("una norma colombiana (resolución) no ofrece «buscar en PubMed»; un artículo sí", async ({ page }) => {
  await page.goto("/");
  const r = await page.evaluate(() => [srcLine({src: "res117_26"}), srcLine({src: "lancet_dengue"})]);
  expect(r[0]).toContain("Resolución 117 de 2026");
  expect(r[0]).not.toContain("PubMed");
  expect(r[1]).toContain("PubMed");
});
