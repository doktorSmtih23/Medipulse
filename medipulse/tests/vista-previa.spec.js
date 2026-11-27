// Versión de un solo archivo (tools/un-archivo.js) y visores que bloquean el almacenamiento.
const fs = require("fs"), os = require("os"), path = require("path");
const { test, expect } = require("@playwright/test");
const { build, OUT, PRESUPUESTO_CASOS } = require("../tools/un-archivo.js");

test.beforeAll(() => build());

test("el archivo único abre solo, sin las carpetas al lado", async ({ page }) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "medipulse-")), solo = path.join(dir, "index.html");
  fs.copyFileSync(OUT, solo);
  const errores = []; page.on("pageerror", e => errores.push(e.message));
  await page.goto("file://" + solo);
  expect(await page.evaluate(() => QUESTIONS.length)).toBeGreaterThan(0);
  await expect(page.locator("#v-banco")).toBeHidden();   // los estilos cargaron: las vistas ocultas no se ven
  // Lleva solo las 4 básicas (paquete "starter") y lo dice en Casos.
  const r = await page.evaluate(() => [...new Set(QUESTIONS.map(q => q.specialty))].sort());
  expect(r).toEqual(["Cirugía", "Ginecología", "Medicina Interna", "Pediatría"]);
  await page.evaluate(() => go("banco"));
  await expect(page.locator("#soloBasicas")).toContainText("Urología, Mastología, Psiquiatría y Toxicología están en la app web");
  // Con el banco creciendo, lleva una muestra dentro del presupuesto y lo dice
  const m = await page.evaluate(() => window.MP_MUESTRA);
  if (m) await expect(page.locator("#soloBasicas")).toContainText(`una muestra de las 4 básicas: ${m[0]} de ${m[1]} casos`);
  const casosBytes = await page.evaluate(() => MP_CONTENIDO.especialidades.filter(e => e.paquete === "starter").reduce((a, e) => a + new TextEncoder().encode(JSON.stringify(e.casos || [])).length, 0));
  expect(casosBytes).toBeLessThanOrEqual(PRESUPUESTO_CASOS);
  expect(errores).toEqual([]);
  fs.rmSync(dir, {recursive: true});
});

test("el archivo único pesa poco (los visores se cuelgan con archivos grandes)", () => {
  expect(fs.statSync(OUT).size).toBeLessThan(1.5 * 1024 * 1024);   // 1,5 MiB (decisión del autor, para que quepan más casos)
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
  await f.locator("#aiDet summary").click(); await f.locator("#keyIn").fill("sk-ant-prueba"); await f.locator("#keySave").click();
  await expect(f.locator("#toast")).toContainText("no se guarda");   // no dice "guardada" si no la guardó
  await f.locator("nav [data-go=banco]").click(); await f.locator("#pr10").click(); await f.locator("#opts .opt >> nth=1").click();
  // Sin almacenamiento la pregunta de confianza queda prendida (es lo predeterminado): se ve sin marcar
  await f.locator("#confVer").click();
  await expect(f.locator("#fbBox .fb")).toBeVisible();
});
