// Cómo se guarda un PDF en el dispositivo: los bytes como ArrayBuffer (Safari en navegación privada no guarda un
// Blob en IndexedDB). Los PDF guardados antes como Blob se siguen abriendo.
const fs = require("fs"), path = require("path");
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

const PDF = path.join(__dirname, "fixtures", "articulo-prueba.pdf");

test("un PDF nuevo se guarda como ArrayBuffer y se vuelve a abrir", async ({ page }) => {
  await page.goto("/");
  await page.click("nav [data-go=lib]");
  await page.setInputFiles("#pdfIn", PDF);
  await expect(page.locator('#genCard [data-gt="read"]')).toBeVisible({timeout: 30_000});
  const r = await page.evaluate(async () => { const id = S.sources[S.sources.length - 1].id; delete recCache[id];
    const rec = await idb.get(id); const doc = await anDoc(id);
    return {datos: rec.datos instanceof ArrayBuffer, blob: "blob" in rec, paginas: doc.numPages}; });
  expect(r).toEqual({datos: true, blob: false, paginas: 4});
});

test("un PDF guardado antes como Blob se sigue abriendo", async ({ page }) => {
  await page.goto("/");
  const bytes = [...fs.readFileSync(PDF)];
  const n = await page.evaluate(async bytes => {
    await idb.put("pviejo", {blob: new Blob([new Uint8Array(bytes)], {type: "application/pdf"}), pages: ["x"]});
    delete recCache.pviejo; return (await anDoc("pviejo")).numPages;
  }, bytes);
  expect(n).toBe(4);
});
