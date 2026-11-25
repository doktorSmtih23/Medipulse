// «Mis especialidades» (js/especialidades.js): además de las 5 básicas, el usuario crea las suyas para sus
// fuentes. Aparecen en Casos, Fichas, Crear y Progreso; el diagnóstico sigue con las 5 básicas.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("crear, renombrar y eliminar desde Fuentes; la nueva aparece en Casos con sus casos y el diagnóstico no la usa", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.click("nav [data-go=lib]");
  await page.evaluate(() => { PLEG.misesp = true; renderEspCard(); });
  await page.fill("#espNueva", "neurología"); await page.click("#espCrear");
  await expect(page.locator("#espCard")).toContainText("Neurología");
  expect(await page.evaluate(() => [ESPS().length, SPEC_COLOR["Neurología"] != null])).toEqual([9, true]);   // 6 básicas + Urología y Mastología + la nueva
  // Un caso propio de Neurología: sale en Casos como especialidad, con su conteo.
  await page.evaluate(() => { agregarPropio("q", {id: nuevoIdPropio(), specialty: "Neurología", topic: "Cefalea", vignette: "V", options: ["a", "b", "c", "d"], correct: 0, whyCorrect: "w", manual: true}); rebuild(); save(); });
  await page.click("nav [data-go=banco]");
  await expect(page.locator('#qSpecs [data-sp="Neurología"]')).toContainText("Neurología 1");
  expect(await page.evaluate(() => diagSeleccion().map(qById).some(q => q.specialty === "Neurología"))).toBe(false);
  // Renombrar lleva sus casos con ella.
  await page.evaluate(() => { renombrarEspecialidad("Neurología", "Neurociencias"); rebuild(); save(); });
  expect(await page.evaluate(() => S.userQ[0].specialty)).toBe("Neurociencias");
  // Eliminar pasa sus casos a la especialidad elegida.
  await page.evaluate(() => { eliminarEspecialidad("Neurociencias", "Medicina Interna"); rebuild(); save(); });
  expect(await page.evaluate(() => [S.userQ[0].specialty, ESPS().length])).toEqual(["Medicina Interna", 8]);
  expect(await page.evaluate(() => eliminarEspecialidad("Pediatría", "Medicina Interna"))).toBe(false);   // las básicas no se borran
  expect(await page.evaluate(() => eliminarEspecialidad("Urología", "Medicina Interna"))).toBe(false);   // ni las incluidas aparte
  expect(await sinDesborde(page)).toBe(true);
});

test("en la revisión de lo generado con IA, un área que no es especialidad se ofrece crear y se le pasan sus ítems", async ({ page }) => {
  errores = vigilarErrores(page);
  await simularIA(page, () => ({json: {questions: [], fichas: [
    {specialty: "Medicina Interna", area: "Neurología", title: "Migraña: profilaxis", badge: "Umbral", thresholds: [{label: "Indicación", val: "≥ 4 días al mes"}], redFlag: "", trap: "", relevance: 4, why: "", page: 1, citas: []},
    {specialty: "Medicina Interna", area: "Medicina Interna", title: "Otra", badge: "", thresholds: [{label: "a", val: "b"}], redFlag: "", trap: "", relevance: 3, why: "", page: 1, citas: []}]}}));
  await abrirConClave(page);
  await subirPdf(page);
  await page.click('#genCard [data-gt="ai"]'); await page.click("#aGo");
  await expect(page.locator("#espSug")).toContainText("Crear «Neurología» (1 ítem)");
  await page.click('[data-espsug="Neurología"]');
  await expect(page.locator("#espSug")).toHaveCount(0);
  await page.click("#candSave");
  expect(await page.evaluate(() => S.userH.map(h => h.specialty).sort())).toEqual(["Medicina Interna", "Neurología"]);
  // La IA recibe la especialidad nueva entre las permitidas.
  expect(await page.evaluate(() => genSchema().properties.fichas.items.properties.specialty.enum)).toContain("Neurología");
});

test("«➕ Nueva especialidad…» en un selector la crea ahí mismo y la deja elegida", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.evaluate(() => { window.prompt = () => "Psiquiatría"; newType = "h"; go("new"); });
  const sel = page.locator(".eSpec").first();
  await sel.selectOption("__nueva");
  await expect(sel).toHaveValue("Psiquiatría");
  expect(await page.evaluate(() => ESPS())).toContain("Psiquiatría");
});

test("Urología y Mastología vienen incluidas: salen en Casos con sus casos, no entran al diagnóstico y reemplazan a una propia con el mismo nombre", async ({ page }) => {
  errores = vigilarErrores(page);
  // Alguien que ya había creado «Urología» como propia, con un caso suyo.
  await page.goto("/");
  await page.evaluate(() => { S.especialidades = [{nombre: "Urología", color: "#123456"}]; agregarPropio("q", {id: nuevoIdPropio(), specialty: "Urología", topic: "Mío", vignette: "V", options: ["a", "b", "c", "d"], correct: 0, whyCorrect: "w", manual: true}); save(); });
  await page.reload();
  const r = await page.evaluate(() => ({
    esps: ESPS().filter(s => s === "Urología" || s === "Mastología"),
    propias: S.especialidades.length,
    uro: QUESTIONS.filter(q => q.specialty === "Urología").length,
    masto: QUESTIONS.filter(q => q.specialty === "Mastología").length,
    diag: SPECS.includes("Urología") || SPECS.includes("Mastología"),
    color: SPEC_COLOR["Urología"] !== "#123456"
  }));
  expect(r).toEqual({esps: ["Urología", "Mastología"], propias: 0, uro: 11, masto: 10, diag: false, color: true});
  await page.click("nav [data-go=banco]");
  await expect(page.locator('#qSpecs [data-sp="Urología"]')).toContainText("Urología");
  await expect(page.locator('#qSpecs [data-sp="Mastología"]')).toContainText("Mastología 10");
});
