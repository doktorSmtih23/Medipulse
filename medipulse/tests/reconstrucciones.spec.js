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
  await page.fill("#rcTotal", "5");
  await page.click("#rcGuardar");
  expect(await page.evaluate(() => S.recons.map(r => [r.univ, r.anio, r.perfil.n, r.total]))).toEqual([["USCO", "2027-1", 6, 5]]);
  // El número real del examen: se ofrece esa cantidad y se avisa que se leyeron más preguntas
  await expect(page.locator('#rcNs [data-rcn="5"]')).toHaveText("5 casos (como el examen)");
  await expect(page.locator('#rcNs [data-rcn="5"]')).toHaveClass(/on/);
  await page.click("#qRecons summary >> text=Tus reconstrucciones"); await page.click("#qRecons summary >> text=Ver el patrón");
  await expect(page.locator("#qRecons")).toContainText("Se leyeron 6 preguntas y el examen tenía 5");
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

// ---------- parte 2: crear casos con el estilo de un examen ----------
const PATRON = {id: "rc1", univ: "UdeA", anio: "2026", total: 70, fecha: 1, titulo: "x",
  perfil: {n: 100, areas: {"Medicina Interna": 100}, tipos: {conducta: 50, diagnostico: 30, critica: 0, datos: 20}, casos: 80, conOpc: 90, palabras: 35, temas: []},
  muestras: ["Paciente de 42 años con fiebre y cefalea de 3 días, ¿cuál es la conducta inicial?", "Vida media plaquetas"]};

test("el estilo de un examen se describe para la IA: solo la forma, con preguntas de muestra, y el contenido sale del documento", async ({ page }) => {
  const t = await page.evaluate(p => { S.recons = [p]; return rcEstiloLinea("rc1"); }, PATRON);
  expect(t).toContain("Estilo del examen UdeA 2026");
  expect(t).toContain("80 % son casos clínicos");
  expect(t).toContain("unas 35 palabras");
  expect(t).toContain("conducta clínica 50 %");
  expect(t).toContain("nunca de los ejemplos");
  expect(t).toContain("- Paciente de 42 años");
  expect(t).not.toContain("Vida media");   // muestras muy cortas no sirven de ejemplo de forma
  // reparto por tipo de pregunta entre las clases del Taller (dos clases de diagnóstico se reparten su parte)
  const r = await page.evaluate(() => rcRepartirClases("rc1", CASO_TIPOS.revision, 10));
  expect(r).toEqual({conducta: 5, diagnostico: 2, diferenciales: 1, datos: 2});
});

test("sin clave de IA: el prompt para otra IA lleva el estilo elegido", async ({ page }) => {
  await page.evaluate(p => { S.recons = [p]; save(); newType = "i"; go("new"); }, PATRON);
  await page.click("summary:has-text('Prompt para tu IA')");
  await expect(page.locator("#impPrompt")).not.toContainText("Estilo del examen");
  await page.click('[data-iest="rc1"]');
  await expect(page.locator("#impPrompt")).toContainText("Estilo del examen UdeA 2026");
  await expect(page.locator('[data-iest="rc1"]')).toHaveClass(/on/);
  await page.click('[data-iest=""]');
  await expect(page.locator("#impPrompt")).not.toContainText("Estilo del examen");
});

// ---------- grupo B: cómo pregunta, notas de estilo y temas que se repiten ----------
const RASGOS = `RECONSTRUCCIÓN UDEA 2025

1. Hombre de 60 años en un hospital de primer nivel a 3 horas de un centro con ICP, con dolor torácico y supradesnivel del ST. Además de la aspirina, ¿cuál es la conducta más adecuada?
a. Alteplasa + enoxaparina + clopidogrel
b. Clopidogrel + heparina no fraccionada
c. Remitir sin otra medida
d. Observar con troponinas seriadas
2. Todas las siguientes son causas de pancreatitis aguda, excepto:
a. Alcohol
b. Cálculos biliares
c. Hipertrigliceridemia
d. Hipocalcemia
3. Niño de 3 años con tos perruna y estridor en reposo, ¿cuál es el manejo?
a. Dexametasona
b. Salbutamol
c. Amoxicilina
d. Observación`;

test("mide cómo pregunta: paso complementario, contexto de atención, la mejor opción, negativa y opciones combinadas", async ({ page }) => {
  const p = await page.evaluate(t => rcPerfil(rcParsear(t)), RASGOS);
  expect(p.n).toBe(3);
  expect(p.rasgos).toEqual({comp: 1, ctx: 1, mejor: 1, neg: 1, comb: 1});
  expect(p.clin).toEqual({"Síndrome coronario agudo": 1, "Pancreatitis": 1, "Crup y epiglotitis": 1});
  await page.click("nav [data-go=banco]");
  await page.click("#rcPegar");
  await page.fill("#rcTxt", RASGOS);
  await page.click("#rcLeer");
  await expect(page.locator("#qRecons")).toContainText("pide el paso complementario («Además de…», «aparte de…»)");
  await expect(page.locator("#qRecons")).toContainText("usa opciones combinadas");
  // Notas de estilo escritas por quien presentó el examen: se guardan con el patrón
  await page.fill("#rcNotasIn", "Les gusta la conducta en primer nivel antes de remitir.");
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#rcGuardar");
  expect(await page.evaluate(() => S.recons[0].notas)).toBe("Les gusta la conducta en primer nivel antes de remitir.");
  const t = await page.evaluate(() => rcEstiloLinea(S.recons[0].id));
  expect(t).toContain("Cómo pregunta (reprodúcelo en esa proporción): 33 % pide el paso complementario");
  expect(t).toContain("medias verdades");
  expect(t).toContain("Observaciones de quien presentó ese examen");
  expect(t).toContain("Les gusta la conducta en primer nivel");
  // Se editan después desde la lista
  await page.click("#qRecons summary >> text=Tus reconstrucciones");
  await page.click("#qRecons summary >> text=Notas de estilo");
  await page.fill("[data-rcnotas]", "Preguntan dosis exactas.");
  await page.locator("[data-rcnotas]").blur();
  expect(await page.evaluate(() => S.recons[0].notas)).toBe("Preguntan dosis exactas.");
});

test("temas que se repiten entre años de la misma universidad, y practicar los casos de esos temas", async ({ page }) => {
  await page.evaluate(() => {
    const per = clin => ({n: 70, areas: {"Pediatría": 70}, tipos: {conducta: 70, diagnostico: 0, critica: 0, datos: 0}, casos: 60, conOpc: 70, palabras: 30, temas: [], rasgos: {}, clin});
    S.recons = [{id: "a", univ: "UdeA", anio: "2023", titulo: "a", fecha: 1, perfil: per({"Dengue": 1, "TEC y escala de Glasgow": 2, "Malaria": 1, "EPOC": 1}), muestras: []},
      {id: "b", univ: "UdeA", anio: "2025", titulo: "b", fecha: 2, perfil: per({"Dengue": 3, "TEC y escala de Glasgow": 1, "Sífilis": 1, "EPOC": 2}), muestras: []},
      {id: "c", univ: "Univalle", anio: "2025", titulo: "c", fecha: 3, perfil: per({"Malaria": 1}), muestras: []}];
    save(); go("banco");
  });
  // Solo cuenta la misma universidad: Malaria está en UdeA 2023 y en Univalle, no se repite en la UdeA.
  // Primero lo que más veces salió (a igual número, en orden alfabético).
  expect(await page.evaluate(() => rcRepetidos("UdeA").temas.map(x => x[0]))).toEqual(["Dengue", "EPOC", "TEC y escala de Glasgow"]);
  await page.click('[data-rcsel="c"]');   // deja seleccionada la UdeA
  await page.click('[data-rcsel="a"]');
  await expect(page.locator("#qRecons")).toContainText("Lo que se repite en UdeA");
  await expect(page.locator("#qRecons")).toContainText("Dengue · 2");
  // Se avisa lo que no tiene casos en el banco (sirve para saber qué falta)
  const sinCasos = await page.evaluate(() => ["Dengue", "TEC y escala de Glasgow", "EPOC"].filter(k => !rcCasosDeTema(k).length));
  if (sinCasos.length) await expect(page.locator("#qRecons")).toContainText("Sin casos en tu banco: " + sinCasos.join(", "));
  expect(await sinDesborde(page)).toBe(true);
  await page.click("#rcRepGo");
  const ok = await page.evaluate(() => sess.stages[0].items.every(it => { const q = qById(it.id); return ["Dengue", "TEC y escala de Glasgow", "EPOC"].some(k => rcCasosDeTema(k).includes(q)); }));
  expect(ok).toBe(true);
  // Con un solo año se invita a subir otro
  expect(await page.evaluate(() => rcRepetidosHTML("Univalle"))).toContain("Sube la reconstrucción de otro año de Univalle");
});
