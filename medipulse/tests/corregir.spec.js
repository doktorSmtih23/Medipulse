// Corregir a mano preguntas y fichas (js/corregir.js): antes de guardarlas y ya guardadas.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf } = require("./ayudas");

test.describe("ya guardadas", () => {
  let errores;
  test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });
  test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

  test("corregir una pregunta incluida guarda la corrección aparte y conserva el original", async ({ page }) => {
    await page.evaluate(() => startSession({label: "Prueba", tag: "norm", stages: [{name: "Uno", items: [{t: "q", id: 2}]}]}));
    await page.click("#opts .opt >> nth=0");
    await page.click("#fixBtn");
    await page.fill("#fixBox [data-qo='1']", "Opción corregida");
    await page.fill("#fixBox [data-qe='pearl']", "Perla corregida");
    await page.click("#fixBox [data-corr-save]");
    const r = await page.evaluate(() => [qById(2).options[1], qById(2).pearl, BUILTIN_Q.find(q => q.id === 2).options[1] !== "Opción corregida", !!S.over.q2.edited]);
    expect(r).toEqual(["Opción corregida", "Perla corregida", true, true]);
    expect(await page.evaluate(() => srcLine(qById(2)))).toContain("corregido por ti");
  });

  test("el resaltado del enunciado se conserva al corregir", async ({ page }) => {
    await page.evaluate(() => { const b = document.createElement("div"); b.id = "tbox"; document.body.appendChild(b); openCorregir("q", qById(2), b); });
    const texto = await page.inputValue("#tbox [data-qe='vignette']");
    expect(texto).toContain("[[");   // <span class='hy'> se edita como [[texto]]
    await page.click("#tbox [data-corr-save]");
    expect(await page.evaluate(() => qById(2).vignette)).toContain("<span class='hy'>");
  });

  test("no deja guardar una pregunta con opciones repetidas", async ({ page }) => {
    await page.evaluate(() => { const b = document.createElement("div"); b.id = "tbox"; document.body.appendChild(b); openCorregir("q", qById(2), b); });
    await page.fill("#tbox [data-qo='1']", await page.inputValue("#tbox [data-qo='0']"));
    await page.click("#tbox [data-corr-save]");
    await expect(page.locator("#toast")).toContainText("dos opciones iguales");
    expect(await page.evaluate(() => !!S.over.q2)).toBe(false);
  });

  test("corregir una ficha incluida mientras se estudia", async ({ page }) => {
    await page.evaluate(() => startSession({label: "Prueba", tag: "norm", stages: [{name: "Uno", items: [{t: "h", id: "hy1"}]}]}));
    await page.keyboard.press("Space");
    await page.click("#fixBtnH");
    await page.fill("#fixBoxH [data-hv='0']", "≥ 30 mL/kg en 3 h");
    await page.click("#fixBoxH [data-corr-save]");
    expect(await page.evaluate(() => hyById("hy1").thresholds[0].val)).toBe("≥ 30 mL/kg en 3 h");
  });

  test("un ítem con signo por verificar lo avisa al estudiarlo", async ({ page }) => {
    const aviso = await page.evaluate(() => srcLine({src: "ssc26", whyCorrect: "PAM 65 (verificar el signo en el PDF)"}));
    expect(aviso).toContain("signo por verificar");
  });
});

test.describe("antes de guardar (revisión de lo generado con IA)", () => {
  const PREG = {fichas: [], questions: [{qtype: "caso", specialty: "Medicina Interna", topic: "Terapia génica", vignette: "Paciente con Parkinson avanzado…",
    options: ["AAV2-GAD", "Levodopa sola", "CERE-120", "Sham"], correct: 0, whyCorrect: "Mejoró el UPDRS ε23.1 % (verificar el signo en el PDF).", pearl: "Fase II", trap: "Confundir con CERE-120", page: 2}]};
  let errores;
  test.beforeEach(async ({ page }) => {
    errores = vigilarErrores(page);
    await simularIA(page, () => ({json: PREG}));
    await abrirConClave(page);
    await subirPdf(page);
  });
  test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

  test("la pregunta se puede editar, avisa el signo por verificar y guarda lo corregido", async ({ page }) => {
    await page.click("#aGo");
    await expect(page.locator("#candList")).toBeVisible();
    await expect(page.locator("#candList .note.trap")).toContainText("signo por verificar");
    await page.click("#candList summary:has-text('Editar esta pregunta')");
    await page.fill("#candList [data-qe='whyCorrect']", "Mejoró el UPDRS 23.1 % frente a 12.7 % con sham.");
    await page.check("#candList input[type=radio][value='2']");
    await page.click("#candSave");
    const q = await page.evaluate(() => S.userQ.map(q => [q.whyCorrect, q.correct]));
    expect(q).toEqual([["Mejoró el UPDRS 23.1 % frente a 12.7 % con sham.", 2]]);
  });
});
