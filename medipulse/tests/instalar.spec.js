// Instalar en el celular (instalar.js): pasos según el sistema, botón «Instalar» del navegador,
// aviso en Hoy e íconos PNG para la pantalla de inicio.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const IPHONE_CHROME = IPHONE.replace("Version/17.5", "CriOS/126.0.0.0");
let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test.describe("en Android", () => {
  test.use({userAgent: ANDROID});
  test("aviso en Hoy, pasos de Android y el botón del navegador", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/");
    await expect(page.locator("#dataWarn")).toContainText("Instala MediPulse");
    await page.click("#dataWarn [data-go=instalar]");
    await expect(page.locator('#instBox [data-it="android"]')).toHaveClass(/on/);
    await expect(page.locator('#instBox [data-it="android"]')).toContainText("tu dispositivo");
    await expect(page.locator("#instBox")).toContainText("Instalar app");
    // el navegador ofrece instalar: aparece el botón y abre su diálogo
    await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => { window._pedido = true; }; e.userChoice = Promise.resolve({outcome: "accepted"}); window.dispatchEvent(e); });
    await page.click("#instBtn");
    expect(await page.evaluate(() => window._pedido)).toBe(true);
    expect(await sinDesborde(page)).toBe(true);
  });
});

test.describe("en iPhone", () => {
  test.use({userAgent: IPHONE});
  test("pasos de Safari y se puede ver otro sistema", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/"); await page.evaluate(() => go("instalar"));
    await expect(page.locator("#instBox")).toContainText("Agregar a pantalla de inicio");
    await page.click('#instBox [data-it="pc"]');
    await expect(page.locator("#instBox")).toContainText("Instalar página como app");
  });
});

test.describe("en Chrome de iPhone", () => {
  test.use({userAgent: IPHONE_CHROME});
  test("pide abrirla en Safari", async ({ page }) => {
    errores = vigilarErrores(page);
    await page.goto("/"); await page.evaluate(() => go("instalar"));
    await expect(page.locator("#instBox")).toContainText("Ahora estás en otro navegador");
  });
});

test("íconos PNG para instalar (Android) y para la pantalla de inicio del iPhone", async ({ page, request }) => {
  errores = vigilarErrores(page);
  const m = await (await request.get("/manifest.webmanifest")).json();
  expect(m.icons.map(i => i.sizes + " " + i.purpose)).toEqual(expect.arrayContaining(["192x192 any", "512x512 any", "512x512 maskable"]));
  for (const i of m.icons) expect((await request.get("/" + i.src)).ok()).toBe(true);
  await page.goto("/");
  const apple = await page.getAttribute('link[rel="apple-touch-icon"]', "href");
  expect(apple).toMatch(/\.png$/);
  expect((await request.get("/" + apple)).ok()).toBe(true);
});

test("la app no lleva firma de autor (ni en Progreso ni al entrar)", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/"); await page.click("nav [data-go=prog]");
  await expect(page.locator("body")).not.toContainText("Creado por");
  expect(await page.content()).not.toContain("Christian");
});

test("guía «Gasta menos con la IA»: cómo se cobra, ejemplos con el nivel elegido y 7 reglas; se llega desde Fuentes", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await page.evaluate(() => { localStorage.setItem("medipulse_api_key", "sk-ant-prueba"); });
  await page.reload(); await page.click("nav [data-go=lib]");
  await page.click("#aiBox [data-go=ahorro]");
  await expect(page.locator("#ahorroBox")).toContainText("vuelve a leer el texto que le envías");
  await expect(page.locator("#ahorroBox .tabla tr")).toHaveCount(3);
  await expect(page.locator("#ahorroBox .regla")).toHaveCount(7);
  // el tema corto cuesta menos que la guía larga
  const usd = await page.$$eval("#ahorroBox .tabla td b", bs => bs.map(b => parseFloat(b.textContent.replace(/[^\d,]/g, "").replace(",", "."))));
  expect(usd[0]).toBeLessThan(usd[2]);
  expect(await sinDesborde(page)).toBe(true);
});
