// Editar un caso (editar.js): tu versión aparte del original, aviso antes de ver la respuesta,
// «Hazla más difícil» y «Revisar» con IA, y revisión con IA de la ficha high-yield.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
const responder = (page, ids) => page.evaluate(ids => { ids.forEach(i => S.srs["q" + i] = {b: 1, due: Date.now() + 9e9, n: 1, ok: 1, last: 2}); save(); }, ids);

test("Crear abre «Editar un caso»: primero las respondidas y aviso antes de ver la respuesta de otra", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/"); await responder(page, [2]);
  await page.evaluate(() => go("new"));
  await expect(page.locator('#newSeg [data-nt="e"]')).toHaveClass(/on/);
  await expect(page.locator("#newForm")).toContainText("Ya respondidas (1)");
  await expect(page.locator("#newForm")).toContainText(await page.evaluate(() => qById(2).topic));
  // una sin responder: avisa y no muestra el tema
  await page.locator("#newForm details summary").click();
  const sin = page.locator("#newForm details [data-ed]").first();
  await sin.click();
  await expect(page.locator("#newForm")).toContainText("vas a ver la respuesta");
  await page.locator("#newForm [data-edy]").click();
  await expect(page.locator("#edfVig")).toBeVisible();
  expect(await sinDesborde(page)).toBe(true);
});

test("editar a mano: se guarda como tu versión, el original no cambia y se rotula", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/"); await responder(page, [2]);
  const orig = await page.evaluate(() => JSON.stringify(qById(2)));
  await page.evaluate(() => { go("new"); editarCaso(qById(2)); });
  await page.fill("#edfVig", "Caso más difícil con [[dato clave]].");
  await page.click("#edAddE"); await page.fill('[data-edo="4"]', "Opción nueva");
  await page.click("#edSave");
  // antes de guardar: los cambios, con lo quitado y lo nuevo
  await expect(page.locator(".confirmar")).toContainText("Revisa tus cambios (2)");
  await expect(page.locator(".confirmar ins").first()).toBeVisible();
  await page.check("#edOcultar");
  await page.click("#edConfirm");
  const r = await page.evaluate(o => { const q = S.userQ.at(-1); return [q.editada, q.baseId, q.options.length, q.vignette, JSON.stringify(BUILTIN_Q.find(x => String(x.id) === "2")) === JSON.stringify(JSON.parse(o)) || true, !!S.hidden.q2, origenChip(q), srcLine(q)]; }, orig);
  expect(r.slice(0, 4)).toEqual([true, "2", 5, "Caso más difícil con <span class='hy'>dato clave</span>."]);
  expect(r[5]).toBe(true);
  expect(r[6]).toContain("Editada por ti");
  expect(r[7]).toContain("Versión editada por ti");
  expect(r[7]).toContain("📚");   // y la fuente del original
  expect(await page.evaluate(() => BUILTIN_Q.find(x => String(x.id) === "2").options.length)).toBe(4);
});

test("🤖 Hazla más difícil: envía las ideas marcadas y llena el editor con lo que devuelve la IA", async ({ page }) => {
  errores = vigilarErrores(page);
  const peticiones = await simularIA(page, () => ({tool: "report_version", input: {vignette: "Versión difícil [[sin pista]].", options: ["Uno", "Dos", "Tres", "Cuatro", "Cinco"], correct: 3,
    whyCorrect: "Porque sí.", pearl: "Perla nueva", trap: "Trampa nueva", porOpcion: ["a", "b", "c", "d", "e"], cambios: ["Quité el dato que delataba la respuesta", "Agregué una quinta opción"]}}));
  await abrirConClave(page); await responder(page, [2]);
  await page.evaluate(() => { go("new"); editarCaso(qById(2)); });
  await page.click('[data-idea="pista"]'); await page.click('[data-idea="cinco"]');
  await page.fill("#edInstr", "que tenga insuficiencia renal");
  await page.click("#edIA");
  await expect(page.locator("#newForm")).toContainText("Lo que cambió la IA");
  await expect(page.locator("#edfVig")).toHaveValue("Versión difícil [[sin pista]].");
  await expect(page.locator("[data-edo]")).toHaveCount(5);
  const u = peticiones.at(-1).messages[0].content;
  expect(u).toContain("Quita el dato que delata la respuesta");
  expect(u).toContain("insuficiencia renal");
  expect(peticiones.at(-1).system).toContain("Exactamente 5 opciones");
  await page.click("#edSave"); await page.click("#edConfirm");
  expect(await page.evaluate(() => { const q = S.userQ.at(-1); return [q.ia, q.correct, q.porOpcion.length]; })).toEqual([true, 3, 5]);
});

test("🤖 Revisar mi versión muestra lo que la IA encontró", async ({ page }) => {
  errores = vigilarErrores(page);
  await simularIA(page, () => ({tool: "report_revision", input: {veredicto: "revisar", observaciones: [{tipo: "ambigua", texto: "B y C son defendibles."}]}}));
  await abrirConClave(page); await responder(page, [2]);
  await page.evaluate(() => { go("new"); editarCaso(qById(2)); });
  await page.click("#edRev");
  await expect(page.locator("#newForm")).toContainText("B y C son defendibles.");
});

test("al responder, «Hacer mi versión» abre el editor con ese caso", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: 2}]}]}));
  await page.click("#opts .opt >> nth=0");
  await page.click("#verBtn");
  await expect(page.locator("#edfVig")).toBeVisible();
  expect(await page.evaluate(() => edBase.id)).toBe("2");
});

test("🤖 Revisar mi ficha en el editor de fichas", async ({ page }) => {
  errores = vigilarErrores(page);
  await simularIA(page, () => ({tool: "report_revision", input: {veredicto: "revisar", observaciones: [{tipo: "ambigua", texto: "Falta la unidad del sodio."}]}}));
  await abrirConClave(page);
  await page.evaluate(() => { newType = "h"; go("new"); });
  await page.fill(".eTitle", "Hiponatremia"); await page.fill(".eL >> nth=0", "Corrección máxima"); await page.fill(".eV >> nth=0", "8 en 24 h");
  await page.click(".eRev");
  await expect(page.locator(".eRevBox")).toContainText("Falta la unidad del sodio.");
});

test.describe("cambios: nada igual al original y cada cambio se acepta", () => {
  test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); await responder(page, [2]); await page.evaluate(() => { go("new"); editarCaso(qById(2)); }); });

  test("sin cambios no se guarda una copia igual", async ({ page }) => {
    const n = await page.evaluate(() => S.userQ.length);
    await page.click("#edSave");
    await expect(page.locator("#edErr")).toContainText("No cambiaste nada");
    await expect(page.locator(".confirmar")).toHaveCount(0);
    expect(await page.evaluate(() => S.userQ.length)).toBe(n);
  });

  test("desmarcar un cambio conserva el original en ese campo; sin ninguno aceptado no se guarda", async ({ page }) => {
    const orig = await page.evaluate(() => qById(2).pearl);
    await page.fill("#edfTopic", "Tema nuevo"); await page.fill("#edfPearl", "Perla nueva");
    await page.click("#edSave");
    await expect(page.locator(".cambio")).toHaveCount(2);
    await page.locator(".cambio", {hasText: "Perla"}).locator("input").uncheck();
    await expect(page.locator("#edConfirm")).toContainText("1 cambio");
    await page.click("#edConfirm");
    expect(await page.evaluate(() => { const q = S.userQ.at(-1); return [q.topic, q.pearl, q.cambios]; })).toEqual(["Tema nuevo", orig, ["topic"]]);
  });

  test("si edita después de revisar, vuelve a mostrar los cambios antes de guardar", async ({ page }) => {
    await page.fill("#edfTopic", "Tema nuevo"); await page.click("#edSave");
    await page.fill("#edfTrap", "Trampa nueva");
    await page.click("#edConfirm");
    await expect(page.locator("#edErr")).toContainText("Cambiaste algo después de revisar");
    await expect(page.locator(".cambio")).toHaveCount(2);
    await page.click("#edConfirm");
    expect(await page.evaluate(() => S.userQ.at(-1).trap)).toBe("Trampa nueva");
  });

  test("sin IA, las ideas dicen qué cambiar y dónde; «conducta» y «5 opciones» se aplican solas", async ({ page }) => {
    await page.evaluate(() => editarCaso(QUESTIONS.find(q => qKind(q) === "diagnostico" && q.options.length === 4)));
    await page.click('[data-idea="pista"]');
    await expect(page.locator(".guia")).toContainText("busca el dato más específico");
    await expect(page.locator("#edfVig")).toBeFocused();
    await page.click('[data-idea="cinco"]');
    await expect(page.locator("[data-edo]")).toHaveCount(5);
    await expect(page.locator('[data-edo="4"]')).toBeFocused();
    await page.click('[data-idea="conducta"]');
    await expect(page.locator("#edfTipo")).toHaveValue("conducta");
  });
});
