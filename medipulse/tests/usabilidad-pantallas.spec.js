// Hallazgos de la prueba de usabilidad: primero la acción y plegada la explicación, filtros con chips,
// la clave de API plegada y detalles de forma (chips de 44 px, coma decimal, interruptor de Pistas).
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

const NUMERADAS = `RECONSTRUCCIÓN UCALDAS 2024

Paciente de 50 años con enfermedad renal crónica, cuál es el criterio para indicar diálisis

1.  BUN >50
2.  TFG < 6 ml/min
3.  Potasio > 4.9

La diálisis se indica por la tasa de filtración y los síntomas.

Cuál de las siguientes no es causa de anión gap elevado

1.  Acidosis hiperclorémica
2.  Cetoacidosis
3.  Acidosis láctica

en la diabetes puede haber hipoglucemia, el factor de riesgo es

1.  insuficiencia renal
2.  falla cardiaca

Un estudio de casos y controles es útil en, excepto

1.  Enfermedades raras
2.  Estudio experimental`;

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });

const arriba = (page, a, b) => page.evaluate(([x, y]) => document.querySelector(x).getBoundingClientRect().top < document.querySelector(y).getBoundingClientRect().top, [a, b]);

test("Lectura crítica: primero resumir lo que leíste; el método y el ejemplo van plegados", async ({ page }) => {
  await page.click("nav [data-go=estudio]"); await page.click(".grupotabs [data-go=mbe]");
  expect(await arriba(page, "#mbeForm", "#mbeGuide")).toBe(true);
  await expect(page.locator('[data-pleg="mbeguia"]')).not.toHaveAttribute("open", "");
  await expect(page.locator("#mbeGuide .mbesteps")).toBeHidden();
  await page.click('[data-pleg="mbeguia"] > summary');
  await expect(page.locator("#mbeGuide .mbesteps")).toBeVisible();
  await expect(page.locator('[data-pleg="mbeej"]')).not.toHaveAttribute("open", "");
  expect(await sinDesborde(page)).toBe(true);
});

test("Sesión de estudio: «Empezar la sesión» va antes de las opciones, que quedan plegadas", async ({ page }) => {
  await page.click("nav [data-go=estudio]");
  expect(await arriba(page, "#estGo", '[data-pleg="estopc"]')).toBe(true);
  await expect(page.locator('[data-pleg="estopc"]')).not.toHaveAttribute("open", "");
  // Cerrado, el plegable mide lo mismo que su título: las opciones no ocupan pantalla (WebKit deja cajas
  // dentro de un <details> cerrado, así que se mide el plegable y no lo de adentro)
  const alto = await page.locator('[data-pleg="estopc"]').evaluate(d => d.getBoundingClientRect().height - d.querySelector("summary").getBoundingClientRect().height);
  expect(alto).toBeLessThan(40);
  const y = await page.locator("#estGo").evaluate(b => b.getBoundingClientRect().bottom);
  expect(y).toBeLessThan(800);   // se ve sin deslizar en un celular
  await page.click('[data-pleg="estopc"] > summary');
  await expect(page.locator("#estMias")).toBeVisible();
});

test("Casos: con una reconstrucción guardada, el simulacro va primero y la explicación plegada", async ({ page }) => {
  await page.click("nav [data-go=banco]");
  await expect(page.locator('[data-pleg="rcexp"]')).not.toHaveAttribute("open", "");
  await page.click("#rcPegar"); await page.fill("#rcTxt", NUMERADAS); await page.click("#rcLeer"); await page.click("#rcGuardar");
  expect(await arriba(page, "#rcGo", '[data-pleg="rcsubir"]')).toBe(true);
  expect(await arriba(page, "#rcGo", '[data-pleg="rcexp"]')).toBe(true);
  await expect(page.locator("#rcPegar")).toBeHidden();
  await expect(page.locator('[data-pleg="rcexp"]')).not.toHaveAttribute("open", "");
  await page.click('[data-pleg="rcsubir"] > summary');
  await expect(page.locator("#rcPegar")).toBeVisible();
  expect(await sinDesborde(page)).toBe(true);
});

test("Fuentes: la clave de API va plegada y dice si hay o no clave", async ({ page }) => {
  await page.click("nav [data-go=lib]");
  await expect(page.locator("#aiEstado")).toContainText("sin clave");
  await expect(page.locator("#keyIn")).toBeHidden();
  await page.click("#aiDet > summary");
  await expect(page.locator("#keyIn")).toBeVisible();
  await page.fill("#keyIn", "sk-ant-prueba"); await page.click("#keySave");
  await expect(page.locator("#aiEstado")).toContainText("clave guardada");
});

test("quien necesita la clave llega a Fuentes con la tarjeta abierta", async ({ page }) => {
  await page.evaluate(() => irAClave());
  await expect(page.locator("#keyIn")).toBeVisible();
});

test("los chips se tocan con el pulgar: 44 px de alto como mínimo", async ({ page }) => {
  const altos = async sel => page.$$eval(sel, cs => cs.filter(c => c.offsetParent).map(c => Math.round(c.getBoundingClientRect().height)));
  await page.click("nav [data-go=banco]");
  const a = await altos(".chip2"); expect(a.length).toBeGreaterThan(0); expect(Math.min(...a)).toBeGreaterThanOrEqual(44);
  await page.click("nav [data-go=estudio]");
  const b = await altos(".chip2"); expect(b.length).toBeGreaterThan(0); expect(Math.min(...b)).toBeGreaterThanOrEqual(44);
  await page.click(".grupotabs [data-go=mbe]");
  const c = await altos(".filters.wrap .btn"); expect(c.length).toBeGreaterThan(0); expect(Math.min(...c)).toBeGreaterThanOrEqual(44);
});

test("Progreso: las horas llevan coma decimal («0,0 h»)", async ({ page }) => {
  await page.click("nav [data-go=prog]");
  await expect(page.locator("#progKpis")).toContainText("0,0 h");
  await expect(page.locator("#progKpis")).not.toContainText("0.0 h");
  await page.evaluate(() => { S.log[todayKey()] = {sec: 5400, q: 0, ok: 0}; renderProg(); });
  await expect(page.locator("#progKpis")).toContainText("1,5 h");
});

test("«Pistas» es un interruptor que se ve y se toca (≥ 44 px) y cambia de estado", async ({ page }) => {
  await page.click("nav [data-go=banco]"); await page.click("#pr10");
  const sw = page.locator("#hintBtn");
  await expect(sw).toHaveAttribute("role", "switch");
  const antes = await sw.getAttribute("aria-checked");
  expect((await sw.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await sw.click();
  await expect(page.locator("#hintBtn")).not.toHaveAttribute("aria-checked", antes);
});
