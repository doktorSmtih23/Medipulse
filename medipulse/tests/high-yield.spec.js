// Pestaña High Yield (fichas-hy.js): lista compacta con buscador y filtros, y lo que ayuda a crear fichas
// desde un PDF: índice por títulos sin celdas de tablas y nombre de la fuente desde los metadatos.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("la lista es compacta: cada ficha se abre con un toque", async ({ page }) => {
  await page.click("nav [data-go=tarjetas]");
  const n = await page.evaluate(() => HYS.length);
  await expect(page.locator("#hyList .hyrow")).toHaveCount(n);
  await expect(page.locator("#hyList .hycard")).toHaveCount(0);
  await page.locator("#hyList .qgrupo > summary").first().click();
  await page.locator("#hyList .hyrow summary").first().click();
  await expect(page.locator("#hyList .hycard")).toHaveCount(1);
  expect(await sinDesborde(page)).toBe(true);
});

test("buscar, filtrar por especialidad, área y estado; repasar usa lo filtrado", async ({ page }) => {
  await page.evaluate(() => { S.userH.push({id: "u1", specialty: "Medicina Interna", area: "Neurología", title: "Encefalitis anti-NMDAR", badge: "Fenotipo", thresholds: [{label: "Tumor", val: "Teratoma ovárico"}], redFlag: "", trap: "", relevance: 5},
    {id: "u2", specialty: "Medicina Interna", area: "Infectología", title: "Neumonía grave", badge: "", thresholds: [{label: "a", val: "b"}], redFlag: "", trap: "", relevance: 3}); rebuild(); save(); });
  await page.click("nav [data-go=tarjetas]");
  await page.fill("#hyQ", "teratoma");
  await expect(page.locator("#hyList .hyrow")).toHaveCount(1);
  await expect(page.locator("#hyQ")).toBeFocused();
  await page.fill("#hyQ", "");
  await page.selectOption("#hySelSpec", "Medicina Interna");
  await page.selectOption("#hySelArea", "Infectología");
  await expect(page.locator("#hyList .hyrow")).toHaveCount(1);
  await page.selectOption("#hySelArea", "");
  await page.selectOption("#hySelEst", "mine");
  await expect(page.locator("#hyList .hyrow")).toHaveCount(2);
  await page.click("#hyStudy");
  expect(await page.evaluate(() => sess.stages[0].items.map(it => it.id).sort())).toEqual(["u1", "u2"]);
});

test("índice por títulos: descarta celdas de tablas y ordena las secciones principales", async ({ page }) => {
  const r = await page.evaluate(() => ["Possible 4–5", "Non-PNS ≤3", "Antigen Neurological phenotype Systemic tumour Antibody assay a,b", "Tr on IF–IB, DNER on CBA. d",
    "CBA (CSF more sensitive than serum)", "Clinical level a High-risk phenotypes 3", "Antibody testing", "Second-line and third-line immunotherapies", "Type 2 diabetes and stroke"].map(tituloValido));
  expect(r).toEqual([false, false, false, false, false, false, true, true, true]);
  const items = await page.evaluate(() => indiceDeTitulos({}, {allHeads: [
    {t: "Epidemiology", page: 2, lvl: 2}, {t: "Definition and incidence", page: 2, lvl: 2}, {t: "Introduction", page: 2, lvl: 2},
    {t: "Mechanisms/pathophysiology", page: 5, lvl: 2}, {t: "Diagnostic criteria", page: 9, lvl: 2}, {t: "Antibody testing", page: 11, lvl: 2}, {t: "Management", page: 11, lvl: 2}]}, 15));
  expect(items.map(x => x.lvl + " " + x.title)).toEqual(["1 Introduction", "1 Epidemiology", "2 Definition and incidence", "1 Mechanisms/pathophysiology", "1 Diagnostic criteria", "2 Antibody testing", "1 Management"]);
});

test("el nombre de la fuente usa el título del PDF cuando el archivo tiene un nombre genérico", async ({ page }) => {
  const r = await page.evaluate(() => [tituloFuente("ae.pdf", "Autoimmune encephalitis"), tituloFuente("1-s2.0-S0140673624012345-main.pdf", "Stroke"),
    tituloFuente("Autoimmune_encephalitis_.pdf", "Otro"), tituloFuente("download.pdf", "Microsoft Word - guia.docx")]);
  expect(r).toEqual(["Autoimmune encephalitis", "Stroke", "Autoimmune encephalitis", "download"]);
});

test("editor de ficha: ejemplo guía en todos los campos y vista previa del repaso con lo que escribes", async ({ page }) => {
  await page.evaluate(() => { newType = "h"; go("new"); });
  await expect(page.locator(".eTitle")).toHaveAttribute("placeholder", /exudado o trasudado/);
  await expect(page.locator(".eL")).toHaveCount(3);
  await expect(page.locator(".eL >> nth=0")).toHaveAttribute("placeholder", "Proteínas pleura / suero");
  await page.click(".hyprevbox summary");
  await expect(page.locator(".hyprev-in")).toContainText("Proteínas pleura / suero");   // vacío: muestra el ejemplo
  await page.fill(".eTitle", "Hiponatremia"); await page.fill(".eL >> nth=0", "Velocidad máxima de corrección");
  await expect(page.locator(".hyprev-in")).toContainText("Velocidad máxima de corrección");
  await expect(page.locator(".hyprev-in")).not.toContainText("Proteínas pleura");
  await expect(page.locator(".hyprev-in .th b").first()).toHaveText("?");
});

test("crear → generar desde tu PDF: sin clave ofrece la guía y tu propia IA; con un documento abre «🩺 Casos» de su taller", async ({ page }) => {
  await page.evaluate(() => { newType = "g"; go("new"); });
  await expect(page.locator("#newForm")).toContainText("Necesitas tu clave de API");
  await page.click("#newForm [data-nt2=i]");
  await expect(page.locator("#newForm")).toContainText("Prompt para tu IA");
  await page.evaluate(() => { S.sources.push({id: "t1", title: "Guía de prueba", kind: "text", pages: 2, added: Date.now()}); newType = "g"; go("new"); });
  await page.evaluate(() => { window._abrio = null; prepSrc = (id, extra) => { window._abrio = [id, extra.tab, extra.sub]; }; go = v => { window._vista = v; }; });
  await page.click('#newForm [data-gen="t1"]');
  expect(await page.evaluate(() => [window._abrio, window._vista])).toEqual([["t1", "ai", "casos"], "src"]);
});

test("«En tu banco» de un documento: resumen a la vista y la lista plegada", async ({ page }) => {
  await page.evaluate(() => { S.sources.push({id: "t9", title: "Doc", kind: "text", pages: 1, added: Date.now()});
    for (let i = 0; i < 8; i++) S.userQ.push({id: "z" + i, src: "t9", specialty: "Pediatría", topic: "Tema " + i, vignette: "v", options: ["a", "b", "c", "d"], correct: 0, whyCorrect: "", pearl: "", trap: ""});
    S.srs.qz0 = {b: 3, due: Date.now() + 9e9, n: 1, ok: 1, last: 2}; rebuild(); save(); curSrc = "t9";
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === "v-src")); renderSrcItems(); });
  const box = page.locator("#srcItems");
  await expect(box).toContainText("8 preguntas");
  await expect(box).toContainText("7 nuevas · 1 dominadas");
  await expect(box.locator("details.srclista")).not.toHaveAttribute("open", "");
  await box.locator("details.srclista summary").click();
  await expect(box.locator(".srcitem")).toHaveCount(8);
  // al borrar uno, la lista sigue abierta
  await box.locator("[data-del]").first().click();
  await expect(box.locator("details.srclista")).toHaveAttribute("open", "");
});
