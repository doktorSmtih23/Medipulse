// Repetidos (duplicados.js): antes de guardar se compara con el banco. «Repetida» se desmarca o se
// pregunta; «Parecida» solo avisa. A la IA se le dicen los temas que ya existen del documento.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("calibración: el contenido incluido no se marca como repetido entre sí; una copia sí", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  const r = await page.evaluate(() => {
    let max = 0;
    for (const [k, pool] of [["q", QUESTIONS], ["h", HYS]]) {
      const T = pool.map(x => dupTokens(dupTexto(x, k)));
      for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) max = Math.max(max, dupScore(T[i], T[j]));
    }
    const h = HYS[0], copia = Object.assign({}, h, {id: "x", title: h.title + " (resumen)"});
    return [max, dupBuscar(copia, "h").nivel, dupBuscar(copia, "h").item.id === h.id];
  });
  expect(r[0]).toBeLessThan(0.5);
  expect(r.slice(1)).toEqual(["repetida", true]);
});

test("al revisar lo generado con IA, lo repetido queda desmarcado y avisado; a la IA se le dice lo que ya existe", async ({ page }) => {
  errores = vigilarErrores(page);
  let h0;
  const peticiones = await simularIA(page, () => ({json: {questions: [], fichas: [
    Object.assign({}, h0, {specialty: "Pediatría", area: "", badge: "", relevance: 4, why: "", redFlag: "", trap: "", page: 1, citas: []}),
    {specialty: "Medicina Interna", area: "Neurología", title: "Algo totalmente distinto", badge: "", thresholds: [{label: "Dato", val: "Valor 123"}], redFlag: "", trap: "", relevance: 3, why: "", page: 1, citas: []}]}}));
  await abrirConClave(page);
  h0 = await page.evaluate(() => { const h = HYS[0]; return {title: h.title, thresholds: h.thresholds}; });
  await subirPdf(page);
  // una ficha previa de este documento: su tema va en la petición
  await page.evaluate(() => { S.userH.push({id: "u77", specialty: "Medicina Interna", title: "Tema previo del documento", thresholds: [{label: "a", val: "b"}], src: cur().id}); rebuild(); });
  await page.click('#genCard [data-gt="ai"]'); await page.click("#aGo");
  await expect(page.locator("#candList")).toBeVisible();
  await expect(page.locator("#cand0 .dupaviso.repetida")).toBeVisible();
  await expect(page.locator('#cand0 input[type=checkbox]')).not.toBeChecked();
  await expect(page.locator('#cand1 input[type=checkbox]')).toBeChecked();
  await expect(page.locator("#reviewBox")).toContainText("1 ítem parece repetido");
  expect(JSON.stringify(peticiones.at(-1).messages)).toContain("Tema previo del documento");
});

test("guardar a mano una ficha repetida pregunta antes; si cancelas no se guarda", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  page.removeAllListeners("dialog");
  let pregunto = "";
  page.on("dialog", d => { pregunto = d.message(); d.dismiss(); });
  const h = await page.evaluate(() => { const h = HYS[0]; return {title: h.title, rows: h.thresholds}; });
  await page.evaluate(() => { newType = "h"; go("new"); });
  await page.fill(".eTitle", h.title);
  for (let i = 0; i < h.rows.length; i++) { if (i >= 3) await page.click(".eAdd"); await page.fill(`.eL >> nth=${i}`, h.rows[i].label); await page.fill(`.eV >> nth=${i}`, h.rows[i].val); }
  const n = await page.evaluate(() => S.userH.length);
  await page.click(".eSave");
  expect(pregunto).toContain("muy parecida");
  expect(await page.evaluate(() => S.userH.length)).toBe(n);
});

test("pegar de otra IA: lo repetido se avisa y al guardar puedes dejarlo fuera", async ({ page }) => {
  errores = vigilarErrores(page); await page.goto("/");
  page.removeAllListeners("dialog"); page.on("dialog", d => d.dismiss());
  await page.evaluate(() => { const q = QUESTIONS[0];
    impCands = [{vignette: vigToText(q.vignette), options: q.options.slice(), correct: q.correct, porOpcion: q.options.map(() => ""), pearl: "", trap: "", fundamento: "", topic: q.topic, specialty: q.specialty, tipo: "", fuenteTxt: ""},
      {vignette: "Caso completamente nuevo de un niño con fiebre y exantema en manos.", options: ["Uno", "Dos", "Tres", "Cuatro"], correct: 0, porOpcion: ["", "", "", ""], pearl: "", trap: "", fundamento: "", topic: "Nuevo", specialty: "Pediatría", tipo: "", fuenteTxt: ""}];
    newType = "i"; go("new"); renderImpCands(); });
  await expect(page.locator(".impq >> nth=0").locator(".dupaviso.repetida")).toBeVisible();
  const n = await page.evaluate(() => S.userQ.length);
  await page.evaluate(() => guardarImportadas());
  expect(await page.evaluate(() => S.userQ.length)).toBe(n + 1);
});
