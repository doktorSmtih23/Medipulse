// Lector del PDF real (js/lector.js): la página como es, selección de texto, recorte y capturas.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde } = require("./ayudas");

// PNG de 2×2 píxeles para simular una captura de pantalla.
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP8z8DAwMDAxMDAwMDAAAANHQEDasKb6QAAAABJRU5ErkJggg==", "base64");
const RESP = {questions: [{qtype: "caso", specialty: "Medicina Interna", topic: "Algoritmo", vignette: "Según el algoritmo de la imagen…", options: ["A1", "B1", "C1", "D1"], correct: 1,
  whyCorrect: "Lo muestra el algoritmo.", pearl: "p", trap: "t", page: 2}], fichas: []};

let errores, peticiones;
test.beforeEach(async ({ page }) => {
  errores = vigilarErrores(page);
  peticiones = await simularIA(page, () => ({json: RESP}));
  await abrirConClave(page);
  await subirPdf(page);
  await page.click('[data-gt="read"]');
});
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("muestra la página real del PDF con texto seleccionable encima", async ({ page }) => {
  await expect(page.locator("#rdText .pdfpage canvas")).toBeVisible({timeout: 20_000});
  await expect(page.locator("#rdText .textLayer span").first()).toBeAttached();
  expect(await page.locator("#rdText .textLayer").innerText()).toContain("Parkinson");
  expect(await sinDesborde(page)).toBe(true);
});

test("seleccionar texto sobre la página abre las opciones para crear la ficha", async ({ page }) => {
  await page.click("#rdNext");
  await expect(page.locator("#rdText .textLayer span").first()).toBeAttached({timeout: 20_000});
  await page.evaluate(() => {
    const sp = [...document.querySelectorAll("#rdText .textLayer span")].find(s => s.textContent.includes("23.1"));
    const r = document.createRange(); r.selectNodeContents(sp); const sl = getSelection(); sl.removeAllRanges(); sl.addRange(r);
    sp.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));
  });
  await expect(page.locator("#rdBar")).toBeVisible();
  await expect(page.locator("#rdSelTxt")).toContainText("23.1");
});

test("recortar una zona del PDF y crear una ficha a mano con la imagen", async ({ page }) => {
  await expect(page.locator("#rdText .pdfpage canvas")).toBeVisible({timeout: 20_000});
  await page.click("#rdCrop");
  const b = await page.locator("#rdText .cropov").boundingBox();
  await page.mouse.move(b.x + 20, b.y + 20); await page.mouse.down();
  await page.mouse.move(b.x + 200, b.y + 160, {steps: 5}); await page.mouse.up();
  await expect(page.locator("#rdCap .capbox img")).toBeVisible();
  await page.click("[data-cap-hy]");
  await page.fill("#rdCap .eTitle", "Algoritmo recortado");
  await page.fill("#rdCap .eL >> nth=0", "Paso 1"); await page.fill("#rdCap .eV >> nth=0", "Evaluar");
  await page.click("#rdCap .eSave");
  const h = await page.evaluate(() => S.userH.find(x => x.title === "Algoritmo recortado"));
  expect(h.img).toMatch(/^img:/);
  // al estudiarla, la imagen aparece
  await page.evaluate(id => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "h", id}]}]}), h.id);
  await expect(page.locator("#sessBody img.itimg")).toHaveAttribute("src", /^data:image\/jpeg/);
});

test("subir una captura y pedir preguntas a la IA: envía la imagen y la pregunta la conserva", async ({ page }) => {
  await page.setInputFiles("#rdImg", {name: "captura.png", mimeType: "image/png", buffer: PNG});
  await expect(page.locator("#rdCap .capbox img")).toBeVisible();
  await expect(page.locator("#rdCap")).toContainText("≈ US$");
  await page.click("[data-cap-ai]");
  await expect(page.locator("#candList")).toBeVisible();
  const c = peticiones.at(-1).messages[0].content;
  expect(c[0].type).toBe("image");
  expect(c[0].source.media_type).toBe("image/jpeg");
  await expect(page.locator("#candList img.itimg")).toBeVisible();
  await page.click("#candSave");
  expect(await page.evaluate(() => S.userQ[0].img)).toMatch(/^img:/);
});

test("sin clave de IA el botón de la IA también aparece y lleva a guardar la clave", async ({ page }) => {
  await page.evaluate(() => { setKey(""); });
  await page.setInputFiles("#rdImg", {name: "captura.png", mimeType: "image/png", buffer: PNG});
  await expect(page.locator("[data-cap-ai]")).toBeVisible();
  await expect(page.locator("#rdCap")).toContainText("Requiere tu clave");
  await page.click("[data-cap-ai]");
  await expect(page.locator("#keyIn")).toBeVisible();
  expect(peticiones.length).toBe(0);
});
