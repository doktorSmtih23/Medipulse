// Simulacro estilo universidad (reconstrucciones.js): se lee una reconstrucción de examen en los formatos
// reales (opciones en la misma línea, viñetas, opciones numeradas, secciones por especialidad), se mide el
// patrón sin IA, se muestra antes de guardar y se arma un simulacro con casos del banco en esas proporciones.
// Los textos son inventados con la forma de las reconstrucciones reales.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });

// Formato 1: numeradas, con las opciones a. b. c. d. seguidas en la misma línea.
const SEGUIDAS = `RECONSTRUCCIÓN EXAMEN UNIVALLE 2024-1

1\\. Niño de 4 años con fiebre y exantema, cuál es el diagnóstico más probable?

a. Sarampión b. Rubéola c. Varicela d. Escarlatina 2. Cuál es el mejor estudio para diverticulitis complicada?

a. Clínica b. TAC de abdomen c. Gammagrafía d. Ecografía 3. Receptores de la serotonina:

a. 5HT b. Muscarínicos c. GABA d. NMDA 4. Gestante de 30 semanas con sangrado indoloro, cuál es la conducta?

a. Tacto vaginal b. Ecografía c. Amniotomía d. Oxitocina
5\\. Mujer de 60 años con disnea y edemas, qué tratamiento inicial?
a. Furosemida b. Digoxina c. Nada d. Amiodarona`;

// Formato 2: secciones por especialidad, preguntas numeradas en negrilla y opciones con viñetas o sin opciones.
const SECCIONES = `**RECONSTRUCCIÓN USCO 2027 - 1**

# PEDIATRÍA

1.  **Lactante de 8 meses con sibilancias, cuál es el manejo?**

<!-- end list -->

  - Salbutamol
  - Oxígeno y soporte
  - Corticoide

1.  **Vida media de las plaquetas**

  - R/10 días

# GINECOLOGÍA

1.  **Paciente de 25 años con flujo fétido y dolor a la movilización del cérvix, diagnóstico?**

  - EPI
  - Vaginosis

1.  **Finalización de la gestación en colestasis intrahepática**

# CIRUGÍA GENERAL

1.  **Manejo del absceso apendicular de 4 cm**
2.  **Valor de presión intraabdominal para síndrome compartimental abdominal**`;

// Formato 3: enunciados sin número y opciones numeradas, con explicaciones después.
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

test("lee los tres formatos reales: cada pregunta, sus opciones y la sección donde está", async ({ page }) => {
  const r = await page.evaluate(([a, b, c]) => [a, b, c].map(t => rcParsear(t).map(q => [q.t.slice(0, 30), q.opc, q.secc || ""])), [SEGUIDAS, SECCIONES, NUMERADAS]);
  expect(r[0].length).toBe(5);
  expect(r[0].map(x => x[1])).toEqual([4, 4, 4, 4, 4]);
  expect(r[1].length).toBe(6);
  expect(r[1].map(x => x[2])).toEqual(["Pediatría", "Pediatría", "Ginecología", "Ginecología", "Cirugía", "Cirugía"]);
  expect(r[1][0][1]).toBe(3);
  expect(r[2].length).toBe(4);
  expect(r[2].map(x => x[1])).toEqual([3, 3, 2, 2]);
});

test("el patrón: áreas, tipos, casos clínicos, universidad y periodo", async ({ page }) => {
  const r = await page.evaluate(t => { const p = rcPerfil(rcParsear(t)); return [p, rcUniv("RECONSTRUCCIÓN EXAMEN UNIVALLE 2024-1"), rcAnio("RECONSTRUCCIÓN EXAMEN UNIVALLE 2024-1"), rcUniv("Reconstrucción examen U de A"), rcUniv("Reconstrucción Uis 2026 2"), rcAnio("Uis 2026 2")]; }, SEGUIDAS);
  const [p, u, a, u2, u3, a3] = r;
  expect(p.n).toBe(5);
  expect(p.areas).toEqual({"Pediatría": 1, "Cirugía": 1, "Medicina Interna": 2, "Ginecología": 1});
  expect(p.casos).toBe(3);
  expect(p.tipos.diagnostico).toBe(1);
  expect(p.tipos.conducta).toBe(2);
  expect([u, a, u2, u3, a3]).toEqual(["Univalle", "2024-1", "UdeA", "UIS", "2026-2"]);
});

test("ajustes escritos: se entienden sin IA y se dice lo que no se entendió", async ({ page }) => {
  const s = await page.evaluate(() => { const s = rcSugerencias("más Ginecología, sin Urología, menos cirugía, casos cortos, más conducta, que sea difícil"); return [s, rcSugTexto(s)]; });
  expect(s[0].mas).toEqual(["Ginecología"]); expect(s[0].sin).toEqual(["Urología"]); expect(s[0].menos).toEqual(["Cirugía"]);
  expect(s[0].tipos).toEqual(["conducta"]); expect(s[0].cortos).toBe(true);
  expect(s[1]).toContain("No entendí: «que sea difícil»");
});

test("pegar una reconstrucción: se ve el patrón antes de guardar; luego el simulacro sigue las proporciones", async ({ page }) => {
  await page.click("nav [data-go=banco]");
  await expect(page.locator("#qRecons")).toContainText("Simulacro estilo universidad");
  await page.click("#rcPegar");
  await page.fill("#rcTxt", SECCIONES);
  await page.fill("#rcTitulo", "Reconstrucción USCO 2027-1");
  await page.click("#rcLeer");
  // Antes de guardar: universidad y periodo editables y el patrón con cuántas preguntas se calculó
  await expect(page.locator("#rcUniv")).toHaveValue("USCO");
  await expect(page.locator("#rcAnioIn")).toHaveValue("2027-1");
  await expect(page.locator("#qRecons")).toContainText("Calculado con 6 preguntas");
  await expect(page.locator("#qRecons")).toContainText("Son pocas: el patrón es aproximado");
  expect(await page.evaluate(() => (S.recons || []).length)).toBe(0);
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#rcGuardar");
  expect(await page.evaluate(() => S.recons.map(r => [r.univ, r.anio, r.perfil.n]))).toEqual([["USCO", "2027-1", 6]]);
  // Del documento solo se guarda el patrón y unas pocas muestras
  expect(await page.evaluate(() => JSON.stringify(S.recons).length)).toBeLessThan(3000);
  // Simulacro de 20: 2/6 de Pediatría, 2/6 de Ginecología y 2/6 de Cirugía, menos lo que diga el ajuste
  await page.fill("#rcSug", "sin Cirugía");
  await expect(page.locator("#rcSugEco")).toHaveText("Entendí: sin Cirugía");
  await page.click('#rcNs [data-rcn="20"]');
  await page.fill("#rcSug", "sin Cirugía");
  await page.click("#rcGo");
  await expect(page.locator("#sessBody")).toBeVisible();
  const r = await page.evaluate(() => { const st = sess.stages[0]; const c = {}; st.items.forEach(it => { const s = qById(it.id).specialty; c[s] = (c[s] || 0) + 1; }); return [st.items.length, st.exam, st.limit, c, sess.label]; });
  expect(r.slice(0, 3)).toEqual([20, true, 20 * 72]);
  expect(r[3]).toEqual({"Pediatría": 10, "Ginecología": 10});
  expect(r[4]).toBe("Simulacro estilo USCO 2027-1");
});

test("un texto sin preguntas lo dice; antes del diagnóstico el simulacro está cerrado pero el patrón se puede medir", async ({ page }) => {
  await page.evaluate(() => { localStorage.removeItem("medipulse_prueba"); });
  await page.reload();
  await page.click("nav [data-go=banco]");
  await page.click("#rcPegar");
  await page.fill("#rcTxt", "Hola");
  await page.click("#rcLeer");
  await expect(page.locator("#qRecons")).toContainText("No encontré preguntas en este texto");
  await page.click("#rcDescartar");
  await page.click("#rcPegar");
  await page.fill("#rcTxt", NUMERADAS);
  await page.click("#rcLeer");
  await page.click("#rcGuardar");
  await expect(page.locator("#rcGo")).toHaveCount(0);
  await expect(page.locator("#qRecons")).toContainText("diagnóstico");
});
