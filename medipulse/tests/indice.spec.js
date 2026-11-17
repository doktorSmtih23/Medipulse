// Estudiar por temas (js/indice.js): índice limpio y recomendaciones completas sin IA.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, abrirConClave, subirPdf } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  await abrirConClave(page);
  await subirPdf(page);
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("el índice descarta glosarios de abreviaturas, palabras sueltas y títulos cortados", async ({ page }) => {
  const r = await page.evaluate(() => ["Intravenous Thrombolysis", "TOP TAKE-HOME MESSAGES", "Imaging Approaches", "Management",
    "ASA American Stroke Association", "CT computed tomography", "COR class of recommendation", "patients", "Brain Swelling (Medical", "References"].map(t => [t, tituloValido(t)]));
  expect(Object.fromEntries(r)).toEqual({"Intravenous Thrombolysis": true, "TOP TAKE-HOME MESSAGES": true, "Imaging Approaches": true, "Management": true,
    "ASA American Stroke Association": false, "CT computed tomography": false, "COR class of recommendation": false, "patients": false, "Brain Swelling (Medical": false, "References": false});
});

test("cada tema termina donde empieza el siguiente del mismo nivel", async ({ page }) => {
  const r = await page.evaluate(() => conHasta([{title: "A", from: 2, lvl: 1}, {title: "A.1", from: 3, lvl: 2}, {title: "A.2", from: 5, lvl: 2}, {title: "B", from: 8, lvl: 1}], 12).map(x => [x.title, x.from, x.to]));
  expect(r).toEqual([["A", 2, 8], ["A.1", 3, 5], ["A.2", 5, 8], ["B", 8, 12]]);
});

test("recomendaciones: enunciados completos, con su clase y la cifra con unidad completa", async ({ page }) => {
  const r = await page.evaluate(() => buscarRecomendaciones({nums: [4], pages: [
    "Blood pressure management\n1 B-NR In patients with AIS, intensive systolic BP lowering to\n< 140 mm Hg is not recommended even after complete reperfusion. 2a B-R Tenecteplase 0.25 mg/kg is reasonable within 4.5 hours of onset. Figure 2 shows the algorithm."]}));
  expect(r.map(x => [x.clase, x.cifras, x.page])).toEqual([["COR 1 · LOE B-NR", ["< 140 mm Hg"], 4], ["COR 2a · LOE B-R", ["0.25 mg/kg", "4.5 hours"], 4]]);
  expect(r[0].text).toBe("In patients with AIS, intensive systolic BP lowering to < 140 mm Hg is not recommended even after complete reperfusion.");
});

test("recomendaciones en pantalla: se marcan y pasan a una ficha con su clase como rótulo", async ({ page }) => {
  await page.evaluate(() => { docInfo(cur().id).pages[1] = "1 B-NR In patients with AIS, intensive systolic BP lowering to < 140 mm Hg is not recommended. 2a B-R Tenecteplase 0.25 mg/kg is reasonable within 4.5 hours."; gen.tab = "recs"; renderGen(); });
  await expect(page.locator("#gBody .cand")).toHaveCount(2);
  // Plegadas por grado: lo que se hace (clase 1) y lo que puede considerarse (2a).
  await expect(page.locator('[data-pleg="recg_hace"] summary')).toContainText("Lo que se hace");
  await expect(page.locator('[data-pleg="recg_considerar"] summary')).toContainText("Puede considerarse");
  await page.locator('[data-pleg="recg_hace"] summary').click();
  await expect(page.locator("#gBody")).toContainText("COR 1 · LOE B-NR");
  await page.check('[data-ri="0"]');
  await page.click("#recMake");
  expect(await page.inputValue("#recEd .eL >> nth=0")).toContain("COR 1 · LOE B-NR");
  expect(await page.inputValue("#recEd .eV >> nth=0")).toContain("< 140 mm Hg is not recommended");
});

test("elegir páginas a mano sigue disponible", async ({ page }) => {
  await page.click("#genCard summary:has-text('Elegir páginas a mano')");
  await page.fill("#manFrom", "2"); await page.fill("#manTo", "3"); await page.click("#manGo");
  await expect(page.locator("#genCard")).toContainText("Tema: Págs. 2–3");
  expect(await page.evaluate(() => temaSel().nums)).toEqual([2, 3]);
});

test("recomendaciones: la clase que queda al final del enunciado anterior pasa al siguiente (tablas AHA)", async ({ page }) => {
  const r = await page.evaluate(() => buscarRecomendaciones({nums: [37], pages: [
    "1 B-NR 1. In patients with AIS, blood glucose should be measured before starting thrombolysis. 2a C-LD 2. In patients with AIS and hypoglycemia (blood glucose < 60 mg/dL), it is reasonable to treat it promptly."]}));
  expect(r.map(x => [x.clase, x.text, x.cifras])).toEqual([
    ["COR 1 · LOE B-NR", "In patients with AIS, blood glucose should be measured before starting thrombolysis.", []],
    ["COR 2a · LOE C-LD", "In patients with AIS and hypoglycemia (blood glucose < 60 mg/dL), it is reasonable to treat it promptly.", ["< 60 mg/dL"]]]);
});

test("si el índice termina de cargar mientras se eligen páginas a mano, no se cierra ni borra lo escrito", async ({ page }) => {
  await page.click("#genCard summary:has-text('Elegir páginas a mano')");
  await page.fill("#manFrom", "2");
  await page.evaluate(() => refrescarIndice());   // como si el índice terminara justo ahora
  await expect(page.locator("#manTo")).toBeVisible();
  await expect(page.locator("#manFrom")).toHaveValue("2");
});

test("recomendaciones por grado: GRADE en español (texto y tabla resumen, sin repetir), en contra, buena práctica, y AHA con la clase arriba", async ({ page }) => {
  const r = await page.evaluate(() => recsPorGrado({nums: [6, 28, 10], pages: [
    "Recomendación 1.1 Sugerimos realizar una radiografía de tórax en pacientes adultos con sospecha de NAC. (Débil, Moderada calidad).\nRecomendación 3.1 Recomendamos no usar la tomografía de tórax de rutina para confirmar el diagnós -\ntico de NAC. (Fuerte, Moderada calidad).\nPunto de buena práctica Antes de procesar una muestra de esputo se debe evaluar su calidad con los criterios de Murray-Washington. La NAC sigue siendo frecuente.",
    "Resumen recomendaciones\n1.1 Sugerimos realizar una radiografía de tórax en pacientes adultos con sospecha de NAC. Débil Moderada calidad\n2 Recomendamos considerar la ecografía pulmonar como alternativa a la radiografía de tórax. Fuerte Moderada calidad",
    "COR LOE Recommendations\n1 A\n1. In patients presenting with symptoms suggestive\nof acute PE, a targeted history is recommend -\ned. 1 , 2\n3: Harm B-R\n2. In patients with acute PE, routine use of an\ninferior vena cava filter is not recommended. 3\nSynopsis\nTexto."]}).map(x => [x.grupo, x.clase, x.text]));
  expect(r).toEqual([
    ["considerar", "Débil · Moderada calidad · Rec. 1.1", "Sugerimos realizar una radiografía de tórax en pacientes adultos con sospecha de NAC."],
    ["no", "Fuerte · Moderada calidad · Rec. 3.1", "Recomendamos no usar la tomografía de tórax de rutina para confirmar el diagnóstico de NAC."],
    ["bp", "Buena práctica", "Antes de procesar una muestra de esputo se debe evaluar su calidad con los criterios de Murray-Washington."],
    ["hace", "Fuerte · Moderada calidad · Rec. 2", "Recomendamos considerar la ecografía pulmonar como alternativa a la radiografía de tórax."],
    ["hace", "COR 1 · LOE A", "In patients presenting with symptoms suggestive of acute PE, a targeted history is recommended."],
    ["no", "COR 3: Harm · LOE B-R", "In patients with acute PE, routine use of an inferior vena cava filter is not recommended."]]);
});

test("sin sistema de grados no inventa recomendaciones: lo dice y ofrece Leer; ESC suelto (una sola «I C») no cuenta", async ({ page }) => {
  const r = await page.evaluate(() => recsPorGrado({nums: [3], pages: ["iNPH may involve multifactorial mechanisms such as altered CSF dynamics I C\nTreatment should be considered in selected patients."]}));
  expect(r).toEqual([]);
  await page.evaluate(() => { const p = docInfo(cur().id).pages; for (let i = 0; i < p.length; i++) p[i] = "Texto de una revisión sin recomendaciones graduadas. The treatment is reasonable in some patients."; recsKey = ""; gen.tab = "recs"; renderGen(); });
  await expect(page.locator("#recSinGrado")).toContainText("no gradúa sus recomendaciones");
  await page.click('#recSinGrado [data-gtab="read"]');
  await expect(page.locator('#genCard [data-gt="read"]')).toHaveClass(/on/);
});

test("en un ensayo clínico la pestaña gratis es «Resultados con cifras»: frases con el efecto, sin métodos ni direcciones", async ({ page }) => {
  await page.evaluate(() => { const s = cur(); s.design = "ECA"; const p = docInfo(s.id).pages;
    p[0] = "Address reprint requests to Dr. Antman at 350 Longwood Ave., Boston, or at eantman@ejemplo.org. Results The primary end point occurred in 12.1% of patients receiving clopidogrel and 9.9% of patients receiving prasugrel (hazard ratio, 0.81; 95% CI, 0.73 to 0.90; P<0.001). We calculated that 875 end points would be required to have a 90% power to detect a 20% reduction.";
    recsKey = ""; gen.tab = "recs"; renderGen(); });
  await expect(page.locator('#genCard [data-gt="recs"]')).toContainText("Resultados con cifras");
  await expect(page.locator("#gBody .cand")).toHaveCount(1);
  await page.locator('[data-pleg="recres"] summary').click();      // plegadas: pantalla limpia
  await expect(page.locator("#gBody .cand")).toContainText("hazard ratio, 0.81");
  await page.check('[data-ri="0"]'); await page.click("#recMake");
  expect(await page.inputValue("#recEd .eV >> nth=0")).toContain("hazard ratio, 0.81");
});

test("editar el índice a mano: renombrar, cambiar nivel, unir y agregar; antes de guardar muestra los cambios y no se rehace solo", async ({ page }) => {
  await page.evaluate(() => { const s = cur(); s.indice = {v: IND_VERSION, fuente: "maqueta", items: conHasta([
    {title: "Introducción", from: 1, lvl: 1}, {title: "Me thods", from: 2, lvl: 1}, {title: "Clopidogrel Better", from: 2, lvl: 1}, {title: "Resultados", from: 3, lvl: 1}], 4)}; save(); gen.tema = null; renderGen(); });
  await page.locator('[data-pleg="indice"] summary').click();
  await page.click("#indEd");
  await page.fill('[data-iet="1"]', "Métodos");
  await page.click('[data-ieu="2"]');              // «Clopidogrel Better» se une a Métodos
  await page.click('[data-iel="2"]');              // Resultados pasa a subtema
  await page.click("#indAdd"); await page.fill('[data-iet="3"]', "Discusión"); await page.fill('[data-iep="3"]', "4");
  await page.click("#indSave");
  await expect(page.locator("#indConf")).toContainText("«Me thods» → «Métodos»");
  await expect(page.locator("#indConf")).toContainText("Quitas «Clopidogrel Better»");
  await expect(page.locator("#indConf")).toContainText("«Resultados» pasa a subtema");
  await expect(page.locator("#indConf")).toContainText("Agregas «Discusión» (pág. 4)");
  await page.click("#indOk");
  const r = await page.evaluate(() => [cur().indice.fuente, cur().indice.items.map(x => [x.title, x.from, x.to, x.lvl]), indiceAlDia(cur())]);
  expect(r).toEqual(["manual", [["Introducción", 1, 2, 1], ["Métodos", 2, 4, 1], ["Resultados", 3, 4, 2], ["Discusión", 4, 4, 1]], true]);
  // Sin cambios: no guarda nada.
  if (!await page.locator("#indEd").isVisible()) await page.locator('[data-pleg="indice"] summary').click();
  await page.click("#indEd"); await page.click("#indSave");
  await expect(page.locator("#indEdit")).toBeVisible();
  await page.click("#indCancel");
  await expect(page.locator("#genCard")).toContainText("Corregido por ti.");
});
