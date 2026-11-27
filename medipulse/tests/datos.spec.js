// Proteger los datos del usuario: copia de seguridad, avisos y ocultos.
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/");
  // En iPhone primero sale el aviso de agregarla a la pantalla de inicio (va antes que el de la copia): se descarta aquí.
  await page.evaluate(() => { if (isIOS()) { S.iosWarnOk = Date.now(); save(); renderDataWarn(); } }); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

// Simula a alguien que ya estudió (con datos que vale la pena respaldar).
const conProgreso = page => page.evaluate(() => { grade("q2", 2); renderHoy(); });

test("sin datos no se pide copia; con progreso aparece el recordatorio", async ({ page }) => {
  await expect(page.locator("#dataWarn")).toBeEmpty();
  await conProgreso(page);
  await expect(page.locator("#dataWarn")).toContainText("Aún no tienes una copia de seguridad");
});

test("descargar la copia guarda la fecha y quita el recordatorio", async ({ page }) => {
  await conProgreso(page);
  const [descarga] = await Promise.all([page.waitForEvent("download"), page.click('#dataWarn [data-dw="exp"]')]);
  expect(descarga.suggestedFilename()).toMatch(/^medipulse-respaldo-\d{4}-\d{2}-\d{2}\.json$/);
  await expect(page.locator("#dataWarn")).toBeEmpty();
  expect(await page.evaluate(() => typeof S.lastBackup)).toBe("number");
  await page.click("nav [data-go=prog]");
  await expect(page.locator("#bkInfo")).toContainText("Última copia");
});

test("«Más tarde» pospone el recordatorio; vuelve si pasan más de 14 días desde la copia", async ({ page }) => {
  await conProgreso(page);
  await page.click('#dataWarn [data-dw="later"]');
  await expect(page.locator("#dataWarn")).toBeEmpty();
  await page.evaluate(() => { delete S.backupSnooze; S.lastBackup = Date.now() - 15 * DAY; renderDataWarn(); });
  await expect(page.locator("#dataWarn")).toContainText("Hace más de 14 días");
});

test("en iPhone sin instalar avisa que Safari puede borrar los datos", async ({ page }) => {
  await page.evaluate(() => { isIOS = () => true; isInstalled = () => false; renderDataWarn(); });
  await expect(page.locator("#dataWarn")).toContainText("Agregar a pantalla de inicio");
  await page.click('#dataWarn [data-dw="ios"]');
  await expect(page.locator("#dataWarn")).toBeEmpty();
  await page.evaluate(() => { isInstalled = () => true; delete S.iosWarnOk; renderDataWarn(); });
  await expect(page.locator("#dataWarn")).toBeEmpty();
});

test("si no se puede guardar, lo dice y ofrece descargar la copia", async ({ page }) => {
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("QuotaExceededError"); }; save(); });
  await expect(page.locator("#dataWarn [role=alert]")).toContainText("No se pudo guardar");
});

test("cargar una copia pide confirmación, guarda lo anterior y se puede deshacer", async ({ page }) => {
  await conProgreso(page);
  const copia = JSON.stringify({srs: {q1: {b: 1, due: 0, n: 1, ok: 1}, q3: {b: 1, due: 0, n: 1, ok: 1}}, log: {}, userQ: [], notes: []});
  await page.click("nav [data-go=prog]");
  await page.setInputFiles("#impFile", {name: "copia.json", mimeType: "application/json", buffer: Buffer.from(copia)});
  await expect.poll(() => page.evaluate(() => Object.keys(S.srs).sort().join(","))).toBe("q1,q3");
  await page.click("#undoImp");
  await expect.poll(() => page.evaluate(() => Object.keys(S.srs).join(","))).toBe("q2");
});

test("un archivo que no es una copia no toca los datos", async ({ page }) => {
  await conProgreso(page);
  await page.click("nav [data-go=prog]");
  await page.setInputFiles("#impFile", {name: "otra.json", mimeType: "application/json", buffer: Buffer.from('{"hola":1}')});
  await expect(page.locator("#toast")).toContainText("no es una copia de MediPulse");
  expect(await page.evaluate(() => Object.keys(S.srs))).toEqual(["q2"]);
});

test("los ítems archivados se ven y se restauran uno por uno", async ({ page }) => {
  await page.evaluate(() => { S.hidden = {q2: Date.now(), hhy1: Date.now()}; rebuild(); save(); go("check"); });
  await page.click("details.ocultos summary");
  await expect(page.locator("details.ocultos")).toContainText("Caso: Sepsis");
  await page.click('[data-unh="q2"]');
  expect(await page.evaluate(() => [Object.keys(S.hidden), QUESTIONS.some(q => q.id === 2)])).toEqual([["hhy1"], true]);
});

test("al abrir una versión que se instaló con la app cerrada, avisa que se actualizó", async ({ page }) => {
  await page.evaluate(async () => { localStorage.setItem("medipulse_version", "medipulse-v1"); await caches.open("medipulse-v9999"); });
  await page.evaluate(() => avisarSiSeActualizo());
  await expect(page.locator("#toast")).toContainText("se actualizó");
  expect(await page.evaluate(() => localStorage.getItem("medipulse_version"))).toBe("medipulse-v9999");
});

test("las imágenes de fichas y preguntas viajan en la copia y se restauran al cargarla", async ({ page }) => {
  const IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ==";
  await page.evaluate(async img => { const k = await imgPut(img); S.userH.push({id: "u1", specialty: "Cirugía", title: "Algoritmo", thresholds: [], img: k}); save(); }, IMG);
  const [descarga] = await Promise.all([page.waitForEvent("download"), page.evaluate(() => exportBackup())]);
  const copia = JSON.parse(require("fs").readFileSync(await descarga.path(), "utf8"));
  const key = copia.userH[0].img;
  expect(copia._imagenes[key]).toBe(IMG);
  // otro dispositivo: sin la imagen guardada
  await page.evaluate(async k => { imgMem.clear(); await idb.del(k); S = BLANK(); save(); }, key);
  await page.click("nav [data-go=prog]");
  await page.setInputFiles("#impFile", {name: "copia.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(copia))});
  await expect.poll(() => page.evaluate(async k => { imgMem.clear(); return await imgGet(k); }, key)).toBe(IMG);
  expect(await page.evaluate(() => "_imagenes" in S)).toBe(false);
});

test("si el progreso guardado pasa de 3,5 MB, Hoy avisa antes de que el navegador se llene", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#dataWarn")).not.toContainText("ya ocupa");
  await page.evaluate(() => { S.notes.push({id: "relleno", texto: "x".repeat(1.8e6)}); save(); });
  await expect(page.locator("#dataWarn")).toContainText("Tu progreso ya ocupa 3,6 MB");
  await page.evaluate(() => { S.notes = S.notes.filter(n => n.id !== "relleno"); save(); });
  await expect(page.locator("#dataWarn")).not.toContainText("ya ocupa");
});

test("en iPhone (Safari) sin instalar, primero pide agregarla a la pantalla de inicio por el borrado a los 7 días", async ({ page, browserName }) => {
  test.skip(browserName !== "webkit", "solo aplica a Safari en iPhone");
  await page.evaluate(() => { delete S.iosWarnOk; renderDataWarn(); });
  await expect(page.locator("#dataWarn")).toContainText("agrega MediPulse a la pantalla de inicio");
  await page.click('#dataWarn [data-dw="ios"]');
  await expect(page.locator("#dataWarn")).not.toContainText("pantalla de inicio");
});
