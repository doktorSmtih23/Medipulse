// Versión de un solo archivo (tools/un-archivo.js) y visores que bloquean el almacenamiento.
const fs = require("fs"), os = require("os"), path = require("path");
const { test, expect } = require("@playwright/test");
const { build, OUT } = require("../tools/un-archivo.js");

test.beforeAll(() => build());

test("el archivo único abre solo, sin las carpetas al lado", async ({ page }) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "medipulse-")), solo = path.join(dir, "index.html");
  fs.copyFileSync(OUT, solo);
  const errores = []; page.on("pageerror", e => errores.push(e.message));
  await page.goto("file://" + solo);
  expect(await page.evaluate(() => QUESTIONS.length)).toBeGreaterThan(0);
  await expect(page.locator("#v-banco")).toBeHidden();   // los estilos cargaron: las vistas ocultas no se ven
  expect(errores).toEqual([]);
  fs.rmSync(dir, {recursive: true});
});

test("el archivo único pesa poco (los visores se cuelgan con archivos grandes)", () => {
  expect(fs.statSync(OUT).size).toBeLessThan(1024 * 1024);   // 1 MB: la mayoría de los visores lo aguanta
});

test("en un visor sin almacenamiento funciona en memoria y lo avisa", async ({ page }) => {
  const html = fs.readFileSync(OUT, "utf8");
  await page.route("**/visor", r => r.fulfill({contentType: "text/html", body: `<iframe sandbox="allow-scripts allow-forms" src="/app-sola" style="width:360px;height:800px;border:0"></iframe>`}));
  await page.route("**/app-sola", r => r.fulfill({contentType: "text/html", body: html}));
  await page.setViewportSize({width: 400, height: 860});
  await page.goto("/visor");
  const f = page.frameLocator("iframe");
  await expect(f.locator(".previewnote")).toBeVisible();
  await f.locator("nav [data-go=lib]").click();
  await f.locator("#keyIn").fill("sk-ant-prueba"); await f.locator("#keySave").click();
  await expect(f.locator("#toast")).toContainText("no se guarda");   // no dice "guardada" si no la guardó
  await f.locator("nav [data-go=banco]").click(); await f.locator("#pr10").click(); await f.locator("#opts .opt >> nth=1").click();
  await expect(f.locator("#fbBox .fb")).toBeVisible();
});
