// Avisos para abrir la beta: médico-legal, cuenta sin saldo, banco agotado y packs de colegas.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, abrirConClave } = require("./ayudas");

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("el aviso médico-legal está en Hoy y en Progreso", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#v-hoy .legal")).toContainText("No sustituye el juicio clínico");
  await page.click("nav [data-go=prog]");
  await expect(page.locator("#v-prog .legal")).toContainText("herramienta de estudio");
});

test("si la cuenta de Anthropic no tiene saldo, lo dice en español y qué hacer", async ({ page }) => {
  errores = vigilarErrores(page, {ignorar: [/status of 400/]});   // el navegador anota la respuesta 400 en la consola
  await page.route("https://api.anthropic.com/**", route => route.fulfill({status: 400, headers: {"content-type": "application/json", "access-control-allow-origin": "*"},
    body: JSON.stringify({type: "error", error: {type: "invalid_request_error", message: "Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."}})}));
  await abrirConClave(page);
  await page.evaluate(() => { S.apuntes = [{id: "l1", title: "S", spec: "Pediatría", created: 1, upd: 1, entries: [{id: "e1", day: "Lunes", at: 1, text: "1. Crup -> dexametasona 0,15 mg/kg"}]}]; save(); apCur = "l1"; go("apuntes"); });
  await page.click("[data-apia]");
  await expect(page.locator("#toast")).toContainText("no tiene saldo");
});

test("cuando se acaban los casos de un área, lo dice y propone qué hacer", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => { QUESTIONS.filter(q => q.specialty === "Pediatría").forEach(q => S.srs["q" + q.id] = {b: 0, due: Date.now() + 9e9, n: 1, ok: 0, last: 0}); S.prac.specs = ["Pediatría"]; save(); go("banco"); });
  await expect(page.locator("#qDone")).toContainText("Ya respondiste los");
  await expect(page.locator("#qDone [data-go=apuntes]")).toBeVisible();
});

test("lo importado de un pack dice que MediPulse no lo revisó", async ({ page }) => {
  await page.goto("/");
  const linea = await page.evaluate(() => {
    importPack({format: "medipulse-pack", title: "Pack de un colega", cards: [{specialty: "Cirugía", front: "¿Signo de Murphy?", back: "Colecistitis"}]});
    return srcLine(S.userC[0]);
  });
  expect(linea).toContain("no revisado por MediPulse");
});
