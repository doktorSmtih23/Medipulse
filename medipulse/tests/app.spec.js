// Flujos principales de la app, sin IA ni internet.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test.describe("Contenido", () => {
  test("carga casos, fichas HY y fuentes", async ({ page }) => {
    const n = await page.evaluate(() => ({q: QUESTIONS.length, h: HYS.length, s: SOURCES.length}));
    expect(n.q).toBeGreaterThan(0); expect(n.h).toBeGreaterThan(0); expect(n.s).toBeGreaterThan(0);
  });
  test("todo el contenido incluido cita una fuente existente", async ({ page }) => {
    const sinFuente = await page.evaluate(() => [...BUILTIN_Q, ...BUILTIN_F, ...HY_CARDS].filter(x => !SRC_BY_ID[x.src]).map(x => x.id));
    expect(sinFuente).toEqual([]);
  });
  test("cada caso tiene 4 opciones y una respuesta válida", async ({ page }) => {
    const malos = await page.evaluate(() => BUILTIN_Q.filter(q => q.options.length !== 4 || !(q.correct >= 0 && q.correct < 4) || !q.whyCorrect).map(q => q.id));
    expect(malos).toEqual([]);
  });
});

test.describe("Estudio", () => {
  test("lo pendiente no se muestra y el caso verificado enseña su cita textual", async ({ page }) => {
    const r = await page.evaluate(() => ({pend: [...BUILTIN_Q, ...HY_CARDS, ...BUILTIN_F].filter(x => x.estado === "pendiente").length,
      cita: srcLine(BUILTIN_Q.find(q => q.id === 2))}));
    expect(r.pend).toBe(0);
    expect(r.cita).toContain("Ver la cita textual");
    expect(r.cita).toContain("norepinephrine as the first-line agent");
  });
  test("modo sin ganas: 3 tarjetas", async ({ page }) => {
    await page.click("[data-mode=lazy]"); await page.click("[data-lazy=cards]");
    for (let i = 0; i < 3; i++) { await page.click("#flipBtn"); await page.click('[data-g="2"]'); }
    expect(await page.evaluate(() => Object.keys(S.srs).filter(k => k[0] === "c").length)).toBe(3);
  });
  test("caso clínico con pistas, tachar y explicación", async ({ page }) => {
    await page.click("nav [data-go=banco]"); await page.click("#pr10");
    await page.click("#hintBtn"); await page.click(".xbtn >> nth=0"); await page.click("#opts .opt >> nth=1");
    await expect(page.locator("#fbBox .fb")).toBeVisible();
  });
  test("simulacro con marca y mapa termina y califica", async ({ page }) => {
    await page.click("nav [data-go=sim]"); await page.click('[data-n="5"]'); await page.click("#simStart");
    await page.click("#opts .opt >> nth=0"); await page.click("#flagBtn"); await page.click('.simmap [data-j="4"]'); await page.click("#nextBtn");
    await expect(page.locator("#sessBody .big")).toBeVisible();
  });
  test("ficha high-yield se estudia y entra al repaso", async ({ page }) => {
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyStudy");
    await page.keyboard.press("Space"); await page.keyboard.press("3");
    expect(await page.evaluate(() => Object.keys(S.srs).some(k => k[0] === "h"))).toBe(true);
  });
  test("crear ficha a mano", async ({ page }) => {
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyNew");
    // El formulario termina de armarse (y enfoca el título) unos milisegundos después de abrirse.
    await expect(page.locator("#newForm .eTitle")).toBeFocused();
    await page.fill("#newForm .eTitle", "Prueba"); await page.fill("#newForm .eL >> nth=0", "Dato"); await page.fill("#newForm .eV >> nth=0", "Valor");
    await expect(page.locator("#newForm .eTitle")).toHaveValue("Prueba");
    await page.click("#newForm .eSave");
    await expect.poll(() => page.evaluate(() => S.userH.some(h => h.title === "Prueba"))).toBe(true);
  });
});

test.describe("Mi enfoque", () => {
  test("se guarda y propone práctica del tipo elegido", async ({ page }) => {
    await page.selectOption("#focusSel", "critica");
    expect(await page.evaluate(() => S.focus)).toBe("critica");
    await page.click("#doFocus");
    const tipos = await page.evaluate(() => sess.stages[0].items.map(i => qKind(qById(i.id))));
    expect(tipos.length).toBeGreaterThan(0);
    expect(new Set(tipos)).toEqual(new Set(["critica"]));
  });
  test("la IA recibe el enfoque", async ({ page }) => {
    await page.selectOption("#focusSel", "datos");
    expect(await page.evaluate(() => focusLine())).toContain("datos duros");
    await page.selectOption("#focusSel", "mixto");
    expect(await page.evaluate(() => focusLine())).toBe("");
  });
});

test.describe("MBE", () => {
  test("calculadora NNT (16 % vs 14.5 % → 67)", async ({ page }) => {
    await page.click("nav [data-go=mbe]"); await page.fill("#cCer", "16"); await page.fill("#cEer", "14.5");
    await expect(page.locator("#cOut")).toContainText("67");
  });
  test("ofrece auditar un PDF", async ({ page }) => {
    await page.click("nav [data-go=mbe]");
    await expect(page.locator("#mbeDocs #mbeUp")).toBeVisible();
  });
});

test("ninguna pantalla se desborda a 360 px", async ({ page }) => {
  const anchas = [];
  for (const v of ["hoy", "banco", "tarjetas", "sim", "mbe", "lib", "prog", "new", "rep", "check", "guide"]) {
    await page.evaluate(v => go(v), v);
    if (!(await sinDesborde(page))) anchas.push(v);
  }
  expect(anchas).toEqual([]);
});

test("tema oscuro aplica sus colores", async ({ page }) => {
  await page.click("#themeBtn");
  const fondo = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.click("#themeBtn");
  expect(fondo).not.toBe(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
});

test("lo creado con la antigua especialidad Urgencias pasa a Medicina Interna", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem("medipulse_v2", JSON.stringify({userQ: [{id: "u1", specialty: "Urgencias", topic: "Propio", vignette: "Caso", options: ["a","b","c","d"], correct: 0, whyCorrect: "x", pearl: "", trap: ""}], notes: [{id: "n1", spec: "Urgencias", title: "Nota", f: []}], seq: 1}));
  });
  await page.reload();
  expect(await page.evaluate(() => [S.userQ[0].specialty, S.notes[0].spec, SPECS.includes("Urgencias")])).toEqual(["Medicina Interna", "Medicina Interna", false]);
});

test("el aviso de versión nueva aparece una sola vez y ofrece actualizar", async ({ page }) => {
  await page.evaluate(() => { avisoVersionNueva(); avisoVersionNueva(); });
  await expect(page.locator("#nuevaVersion")).toHaveCount(1);
  await expect(page.locator("#nuevaVersionBtn")).toHaveText("Actualizar");
  expect(await sinDesborde(page)).toBe(true);
});

test("la versión nueva se instala con archivos pedidos al servidor, no a la caché del navegador", async ({ request }) => {
  const sw = await (await request.get("/sw.js")).text();
  expect(sw).toContain('cache: "reload"');
});
