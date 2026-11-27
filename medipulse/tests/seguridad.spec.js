// Seguridad del lector de PDF: pdf.js 3.x puede ejecutar código desde un PDF manipulado (CVE-2024-4367) si no se
// desactiva isEvalSupported. Se comprueba en la app funcionando y en el código fuente (toda apertura pasa por abrirPdf).
const fs = require("fs"), path = require("path");
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("todo PDF se abre con isEvalSupported: false", async ({ page }) => {
  await page.goto("/");
  const bytes = [...fs.readFileSync(path.join(__dirname, "fixtures", "articulo-prueba.pdf"))];
  const r = await page.evaluate(async bytes => {
    // Las opciones con que abrirPdf llama a pdf.js (con un pdf.js simulado: el real no deja espiar getDocument)
    const opciones = await abrirPdf({getDocument: o => ({promise: Promise.resolve(o)})}, new Uint8Array([1]));
    // Y un PDF real se sigue leyendo con esas opciones
    const paginas = await extractPages(new Uint8Array(bytes).buffer);
    return {eval: opciones.isEvalSupported, datos: opciones.data.length, paginas: paginas.length};
  }, bytes);
  expect(r).toEqual({eval: false, datos: 1, paginas: expect.any(Number)});
  expect(r.paginas).toBeGreaterThan(0);
});

test("en el código, getDocument solo se llama desde abrirPdf", () => {
  const dir = path.join(__dirname, "..", "js");
  const llamadas = fs.readdirSync(dir).filter(f => f.endsWith(".js")).flatMap(f =>
    fs.readFileSync(path.join(dir, f), "utf8").split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => /getDocument\(/.test(l)));
  expect(llamadas.map(([f, i]) => `${f}:${i}`)).toEqual([expect.stringMatching(/^fuentes\.js:/)]);
  expect(llamadas[0][2]).toContain("const abrirPdf");
  expect(fs.readFileSync(path.join(dir, "fuentes.js"), "utf8")).toMatch(/PDF_OPCIONES = \{isEvalSupported: false\}/);
});

test("el enunciado se sanea al mostrarlo: aunque llegue HTML sin escapar, solo queda el resaltado permitido", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    window.__xss = 0;
    // Un caso propio guardado sin pasar por ningún saneamiento (como si una vía nueva lo olvidara)
    S.userQ.push({id: "u990", specialty: "Medicina Interna", topic: "Prueba", qtype: "caso",
      vignette: "Paciente <img src=x onerror=\"window.__xss=1\"> con <span class='hy'>dato clave</span> y <b>negrita</b> &amp; más",
      options: ["Uno", "Dos", "Tres", "Cuatro"], correct: 0, whyCorrect: "Porque sí."});
    rebuild(); save();
    startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: "u990"}]}]});
  });
  const v = page.locator("#sessBody .vignette");
  await expect(v).toContainText("dato clave");
  expect(await v.locator("img, b").count()).toBe(0);
  expect(await v.locator("span.hy").count()).toBe(1);
  await expect(v).toContainText("y negrita & más");   // las demás etiquetas se quitan; queda el texto
  expect(await page.evaluate(() => window.__xss)).toBe(0);
});

test("la CSP está activa en la app y nada de la app la viola (pantallas, sesión y un PDF)", async ({ page }) => {
  await page.addInitScript(() => { window.__csp = []; document.addEventListener("securitypolicyviolation", e => window.__csp.push(e.violatedDirective + " " + e.blockedURI)); });
  await page.goto("/");
  expect(await page.locator('meta[http-equiv="Content-Security-Policy"]').count()).toBe(1);
  const bytes = [...fs.readFileSync(path.join(__dirname, "fixtures", "articulo-prueba.pdf"))];
  await page.evaluate(async bytes => {
    for (const v of ["banco", "estudio", "lib", "mbe", "apuntes", "prog", "hoy"]) go(v);
    startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: QUESTIONS[0].id}]}]});
    await extractPages(new Uint8Array(bytes).buffer);
  }, bytes);
  // Un código inyectado en línea sí queda bloqueado
  const bloqueado = await page.evaluate(() => { window.__inl = 0; const s = document.createElement("script"); s.textContent = "window.__inl = 1"; document.body.appendChild(s); return window.__inl; });
  expect(bloqueado).toBe(0);
  // Ese bloqueo es el que se provocó a propósito: no cuenta como error de la app
  errores.splice(0, errores.length, ...errores.filter(e => !/inline script|Refused to execute|Content Security Policy/i.test(e)));
  const v = await page.evaluate(() => window.__csp.filter(x => !/^script-src/.test(x) || !/inline/.test(x)));
  expect(v).toEqual([]);
});

test("la CSP permite conectarse al servidor de la beta configurado en data/servidor.js", () => {
  const url = fs.readFileSync(path.join(__dirname, "..", "data", "servidor.js"), "utf8").match(/url: "(https:\/\/[^"]+)"/)[1];
  const csp = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").match(/Content-Security-Policy" content="([^"]+)"/)[1];
  expect(csp.match(/connect-src ([^;]+)/)[1].split(" ")).toContain(url);
});
