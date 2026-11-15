// Mis apuntes (js/apuntes.js): libretas, atajos al escribir, puntos → fichas y preguntas, por verificar.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, simularIA, abrirConClave, sinDesborde } = require("./ayudas");

const LIBRETA = {id: "l1", title: "Semana 18", spec: "Medicina Interna", created: 1, upd: 1, entries: [{id: "e1", day: "Martes 29 oct", at: 1,
  text: "1. EMJ -> Mioclonías matutinas\n   - adolescencia inicio\n   NO -> CBZ, fenitoína\n2. Osteocondroma: metáfisis de huesos largos ??"}]};
const conLibreta = page => page.evaluate(l => { S.apuntes = [l]; save(); apCur = "l1"; apEdit = null; go("apuntes"); }, LIBRETA);
const RESP = {questions: [{qtype: "directa", specialty: "Medicina Interna", topic: "EMJ", vignette: "¿Qué fármaco evitar en la EMJ?",
  options: ["Carbamazepina", "Valproato", "Levetiracetam", "Lamotrigina"], correct: 0, whyCorrect: "Empeora las mioclonías.", pearl: "p", trap: "t", page: 1}], fichas: []};

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("crear una libreta y escribir con atajos y numeración automática", async ({ page }) => {
  await page.goto("/");
  await page.click("#v-hoy [data-go=apuntes]");
  await page.fill("#apTitle", "Semana 18");
  await page.click("#apNew");
  const ta = page.locator(".apta");
  await expect(ta).toBeFocused();
  await page.keyboard.type("Crisis asmática -> salbutamol, meta SatO2 92-95 %");
  await page.keyboard.press("Enter");
  await page.keyboard.type("ALCAPA -> origen anómalo de la coronaria izq ??");
  await page.keyboard.press("Enter"); await page.keyboard.press("Enter");   // en un ítem vacío, Enter termina la lista
  expect((await ta.inputValue()).trim()).toBe("1. Crisis asmática → salbutamol, meta SatO₂ 92-95 %\n2. ALCAPA → origen anómalo de la coronaria izq ??");
  await page.click("[data-apdone]");
  await expect(page.locator(".appt")).toHaveCount(2);
  await expect(page.locator(".appt.verif")).toHaveCount(1);
  expect(await sinDesborde(page)).toBe(true);
  await page.reload();
  const guardado = await page.evaluate(() => JSON.parse(localStorage.getItem("medipulse_v2")).apuntes[0]);
  expect(guardado.title).toBe("Semana 18");
  expect(guardado.entries[0].text).toContain("SatO₂");
});

test("un punto se vuelve ficha con título y datos ya separados", async ({ page }) => {
  await page.goto("/"); await conLibreta(page);
  await page.click(".appt >> nth=0 >> [data-apf]");
  await expect(page.locator(".eTitle")).toHaveValue("EMJ");
  await expect(page.locator(".eL >> nth=0")).toHaveValue("EMJ");
  await expect(page.locator(".eV >> nth=0")).toHaveValue("Mioclonías matutinas · adolescencia inicio");
  await expect(page.locator(".eL >> nth=1")).toHaveValue("NO");
  await expect(page.locator(".eV >> nth=1")).toHaveValue("CBZ, fenitoína");
  await page.click(".eSave");
  const h = await page.evaluate(() => { const h = S.userH[0]; return [h.apLib, h.src === S.apuntes[0].srcId, h.page, srcLine(h)]; });
  expect(h.slice(0, 3)).toEqual(["l1", true, 1]);
  expect(h[3]).toContain("📓");
  await expect(page.locator(".appt >> nth=0")).toContainText("ficha creada");
});

test("un dato por verificar se confirma y deja de estar marcado", async ({ page }) => {
  await page.goto("/"); await conLibreta(page);
  await expect(page.locator(".appt.verif")).toHaveCount(1);
  await page.click("[data-apok]");
  await expect(page.locator(".appt.verif")).toHaveCount(0);
  expect(await page.evaluate(() => S.apuntes[0].entries[0].text)).not.toContain("??");
});

test("buscar en todos los apuntes y filtrar lo que falta verificar", async ({ page }) => {
  await page.goto("/"); await conLibreta(page);
  await page.click("#apBack");
  await page.fill("#apQ", "fenitoina");
  await expect(page.locator("#apRes .appt")).toHaveCount(1);
  await expect(page.locator("#apRes")).toContainText("EMJ");
  await page.fill("#apQ", "");
  await page.click("#apVf");
  await expect(page.locator("#apRes .appt")).toHaveCount(1);
  await expect(page.locator("#apRes")).toContainText("Osteocondroma");
});

test("estudiar la libreta la abre como documento con un tema por día", async ({ page }) => {
  await page.goto("/"); await conLibreta(page);
  await page.click("#apStudy");
  await expect(page.locator("#srcHead")).toContainText("Tus apuntes · 2 puntos");
  await expect(page.locator("#genCard")).toContainText("Martes 29 oct");
  await page.click("#srcLib");
  await expect(page.locator("#apBox h2")).toContainText("Semana 18");
});

test("preguntas con IA de un punto: envía solo ese punto y abre la revisión", async ({ page }) => {
  const peticiones = await simularIA(page, () => ({json: RESP}));
  await abrirConClave(page); await conLibreta(page);
  await page.click(".appt >> nth=0 >> [data-apia]");
  await expect(page.locator("#candList")).toBeVisible();
  const c = JSON.stringify(peticiones.at(-1).messages[0].content);
  expect(c).toContain("EMJ");
  expect(c).not.toContain("Osteocondroma");
  expect(c).toContain("REVISA TU APUNTE");
  await page.click("#candSave");
  expect(await page.evaluate(() => S.userQ[0].src === S.apuntes[0].srcId)).toBe(true);
});

test("el área de la libreta es libre y se edita; las fichas la llevan como etiqueta", async ({ page }) => {
  await page.goto("/"); await conLibreta(page);
  await page.click("#apRen");
  await page.fill("#apRenA", "Otorrinolaringología");
  await page.click("#apRenOk");
  await expect(page.locator("#apBox")).toContainText("Otorrinolaringología");
  await page.click(".appt >> nth=0 >> [data-apf]");
  await expect(page.locator(".eBadge")).toHaveValue("Otorrinolaringología");
  await page.click(".eSave");
  expect(await page.evaluate(() => [S.userH[0].specialty, S.userH[0].badge])).toEqual(["Medicina Interna", "Otorrinolaringología"]);
});
