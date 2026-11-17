// Índice, título y año sin IA a partir de la maqueta del PDF (maqueta.js), con líneas de ejemplo.
// La medición con PDF reales está en tools/banco-pdf.js.
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

// Un artículo de 4 páginas: cuerpo «B|9», títulos «H|11», subtítulos «S|9.5», pie de página repetido,
// rótulos de una figura (una sola página) y encabezados de columnas de una tabla (con espacios grandes).
function articulo(){
  const L = [], cuerpo = "Texto corrido del artículo con suficientes palabras para ser un párrafo normal y largo.";
  const add = (p, y, f, s, t, g = 0, x = 50) => L.push({p, y, x, s, f, t, g});
  add(1, 760, "H", 22, "Tratamiento de la neumonía en adultos");
  add(1, 700, "S", 9.5, "Me thods"); add(1, 690, "B", 9, cuerpo);
  for (let p = 1; p <= 4; p++) add(p, 20, "S", 9.5, `Revista de Medicina · 2025 · página ${p}`);
  add(2, 700, "H", 11, "Introducción"); add(2, 690, "B", 9, cuerpo); add(2, 680, "B", 9, cuerpo);
  add(2, 600, "S", 9.5, "Epidemiología"); add(2, 590, "B", 9, cuerpo);
  add(2, 400, "F", 7, "Grupo A"); add(2, 390, "F", 7, "Grupo B"); add(2, 380, "F", 7, "Grupo A");
  add(3, 700, "H", 11, "Diagnóstico"); add(3, 690, "B", 9, cuerpo);
  add(3, 650, "S", 9.5, "1. En pacientes adultos con sospecha de neumonía,"); add(3, 640, "S", 9.5, "¿debe pedirse una radiografía de tórax?"); add(3, 630, "B", 9, cuerpo);
  add(3, 500, "T", 9.5, "Fármaco Dosis Duración", 4); add(3, 490, "B", 9, cuerpo);
  add(3, 300, "T", 9.5, "Hallazgo Sensibilidad Especificidad", 5); add(3, 290, "B", 9, cuerpo);
  add(4, 700, "H", 11, "Tratamiento"); add(4, 690, "B", 9, cuerpo);
  add(4, 600, "S", 9.5, "Antibióticos"); add(4, 590, "B", 9, cuerpo);
  add(4, 500, "H", 11, "Referencias"); add(4, 490, "B", 9, "1. Autor A. Título. Revista. 2020.");
  add(4, 400, "S", 9.5, "No debe aparecer"); add(4, 390, "B", 9, cuerpo);
  return L;
}

test("el índice sale de los estilos de título: secciones y subsecciones, sin pies de página, figuras ni tablas", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  const r = await page.evaluate(L => indiceDeMaqueta(L, 4, "Tratamiento de la neumonía en adultos"), articulo());
  expect(r.map(x => (x.lvl === 1 ? "" : "· ") + x.title)).toEqual([
    "Introducción", "· Epidemiología", "Diagnóstico", "· 1. ¿Debe pedirse una radiografía de tórax?", "Tratamiento", "· Antibióticos"]);
  expect(r.find(x => x.title === "Diagnóstico").from).toBe(3);
});

test("título y año desde la primera página; no se toma la fecha de descarga ni el nombre de la revista", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  const r = await page.evaluate(() => {
    const L = [
      {p: 1, y: 780, x: 50, s: 8, f: "A", t: "Contents lists available at ScienceDirect"},
      {p: 1, y: 760, x: 50, s: 16, f: "A", t: "Brain and Spine"},
      {p: 1, y: 740, x: 50, s: 8, f: "A", t: "journal homepage: www.ejemplo.com"},
      {p: 1, y: 650, x: 50, s: 14, f: "A", t: "Guía de manejo del trauma craneoencefálico"},
      {p: 1, y: 632, x: 50, s: 14, f: "A", t: "en urgencias"},
      {p: 1, y: 600, x: 50, s: 9, f: "B", t: "Publicado en marzo de 2019. © 2019"},
      {p: 1, y: 20, x: 50, s: 7, f: "B", t: "Downloaded from ejemplo.org on November 2026"}];
    return [tituloDePagina(L), anioDePagina(L.map(l => l.t)), tituloFuente("download (3).pdf", "", tituloDePagina(L))];
  });
  expect(r).toEqual(["Guía de manejo del trauma craneoencefálico en urgencias", 2019, "Guía de manejo del trauma craneoencefálico en urgencias"]);
});

test("un índice automático viejo se rehace solo; uno hecho con IA o del propio PDF no", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  const r = await page.evaluate(() => [
    indiceAlDia({indice: {fuente: "titulos", items: []}}),
    indiceAlDia({indice: {v: IND_VERSION, fuente: "maqueta", items: []}}),
    indiceAlDia({indice: {fuente: "pdf", items: []}}),
    indiceAlDia({indice: {fuente: "ia", items: []}})]);
  expect(r).toEqual([false, true, true, true]);
});
