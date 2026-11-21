// Compromiso con los PDF (compromiso.js): estados, recordatorio en Hoy, meta semanal elegida por el
// usuario y la pregunta al subir uno más con la meta llena.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, subirPdf, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
const pendiente = (page, title, dias) => page.evaluate(([title, dias]) => {
  S.sources.push({id: "p" + title.length + dias, title, pages: 10, chars: 9000, added: Date.now() - dias * 86400000, spec: "Medicina Interna"}); save();
}, [title, dias]);

test("Hoy recuerda el PDF que subiste y no abres; «en espera» lo saca de los pendientes", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await expect(page.locator("#pdfCard")).toBeHidden();
  await pendiente(page, "Guía de neumonía 2026", 5);
  await page.reload();
  await expect(page.locator("#pdfCard")).toContainText("Tus PDF pendientes");
  await expect(page.locator("#pdfCard")).toContainText("hace 5 días");
  await expect(page.locator("#pdfCard")).toContainText("aún no lo abres");
  expect(await sinDesborde(page)).toBe(true);
  await page.click('#pdfCard [data-pdfa^="espera"]');
  await expect(page.locator("#pdfCard")).toBeHidden();
});

test("meta semanal elegida por el usuario: al subir uno más con la meta llena pregunta; «Ya lo estudié» suma a la semana", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/");
  await pendiente(page, "Revisión de demencia", 3); await pendiente(page, "Guía de TEP", 2);
  await page.reload(); await page.click("nav [data-go=lib]");
  await expect(page.locator("#metaPdf")).toContainText("¿Cuántos PDF quieres estudiar por semana?");
  await page.click('#metaPdf [data-meta="2"]');
  await expect(page.locator("#metaPdf")).toContainText("Mi meta: 2 PDF por semana");
  await expect(page.locator("#metaPdf")).toContainText("0 de 2");
  await subirPdf(page);
  await expect(page.locator("#pdfPregunta")).toContainText("tu meta es 2 por semana");
  await page.click('#pdfPregunta [data-pdfa^="semana"]');
  await expect(page.locator("#pdfPregunta")).toHaveCount(0);
  await expect(page.locator("#pdfComp")).toContainText("En estudio");
  await page.click('#pdfComp [data-pdfa^="hecho"]');
  await expect(page.locator("#pdfComp")).toContainText("Estudiado");
  await page.click("nav [data-go=lib]");
  await expect(page.locator("#metaPdf")).toContainText("1 de 2");
  await expect(page.locator("#metaPdf")).toContainText("Te falta 1 esta semana");
  await page.locator('[data-pleg="docs"] summary').click();
  await expect(page.locator("#myDocs .pdfest.hecho")).toHaveCount(1);
  await expect(page.locator("#myDocs .pdfest.nuevo")).toHaveCount(2);
});

test("sin meta y con pocos pendientes no pregunta nada al subir", async ({ page }) => {
  errores = vigilarErrores(page);
  await page.goto("/"); await subirPdf(page);
  await expect(page.locator("#pdfComp")).toBeVisible();
  await expect(page.locator("#pdfPregunta")).toHaveCount(0);
});

test("un PDF recién subido y abierto ya no dice «Sin abrir»: queda «En estudio»", async ({ page }) => {
  const { subirPdf } = require("./ayudas");
  await page.goto("/");
  await subirPdf(page);
  await expect(page.locator("#pdfCompBox")).toContainText("En estudio");
  await expect(page.locator("#pdfCompBox")).not.toContainText("Sin abrir");
});
