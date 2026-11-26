// Flujos principales de la app, sin IA ni internet.
const { test, expect } = require("@playwright/test");
const { vigilarErrores, sinDesborde } = require("./ayudas");

let errores;
test.beforeEach(async ({ page }) => { errores = vigilarErrores(page); await page.goto("/"); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test.describe("Contenido", () => {
  test("carga casos, fichas HY y fuentes", async ({ page }) => {
    const n = await page.evaluate(() => ({q: QUESTIONS.length, h: HYS.length, s: SOURCES.length}));
    expect(n.q).toBeGreaterThan(0); expect(n.h).toBeGreaterThan(0); expect(n.s).toBeGreaterThan(0);
  });
  test("todo el contenido incluido cita una fuente existente", async ({ page }) => {
    const sinFuente = await page.evaluate(() => [...BUILTIN_Q, ...BUILTIN_F, ...HY_CARDS].filter(x => !SRC_BY_ID[x.src]).map(x => x.id));
    expect(sinFuente).toEqual([]);
  });
  test("cada caso tiene 4 opciones y una respuesta válida", async ({ page }) => {
    const malos = await page.evaluate(() => BUILTIN_Q.filter(q => q.options.length !== 4 || !(q.correct >= 0 && q.correct < 4) || !q.whyCorrect).map(q => q.id));
    expect(malos).toEqual([]);
  });
});

test.describe("Estudio", () => {
  test("lo pendiente no se muestra y el caso verificado enseña su cita textual", async ({ page }) => {
    const r = await page.evaluate(() => ({pend: [...BUILTIN_Q, ...HY_CARDS, ...BUILTIN_F].filter(x => x.estado === "pendiente").length,
      cita: srcLine(BUILTIN_Q.find(q => q.id === 2))}));
    expect(r.pend).toBe(0);
    expect(r.cita).toContain("Ver la cita textual");
    expect(r.cita).toContain("norepinephrine as the first-line agent");
  });
  test("modo sin ganas: 5 fichas rápidas", async ({ page }) => {
    await page.click("[data-mode=lazy]"); await page.click("[data-lazy=fichas]");
    for (let i = 0; i < 3; i++) { await page.click("#flipBtn"); await page.click('[data-g="2"]'); }
    expect(await page.evaluate(() => Object.keys(S.srs).filter(k => k[0] === "h").length)).toBe(3);
  });
  test("caso clínico con pistas, tachar y explicación", async ({ page }) => {
    await page.click("nav [data-go=banco]"); await page.click("#pr10");
    await page.click("#hintBtn"); await page.click(".xbtn >> nth=0"); await page.click("#opts .opt >> nth=1");
    await expect(page.locator("#fbBox .fb")).toBeVisible();
  });
  test("simulacro con marca y mapa termina y califica", async ({ page }) => {
    // el simulacro ahora se arma en el banco con «Modo examen»
    await page.click("nav [data-go=banco]"); await page.check("#qExam"); await page.fill("#qN", "5"); await page.locator("#qN").dispatchEvent("change"); await page.click("#pr10");
    await page.click("#opts .opt >> nth=0"); await page.click("#flagBtn"); await page.click('.simmap [data-j="4"]'); await page.click("#nextBtn");
    await expect(page.locator("#sessBody .big")).toBeVisible();
  });
  test("ficha high-yield se estudia y entra al repaso", async ({ page }) => {
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyStudy");
    await page.keyboard.press("Space"); await page.keyboard.press("3");
    expect(await page.evaluate(() => Object.keys(S.srs).some(k => k[0] === "h"))).toBe(true);
  });
  test("crear ficha a mano", async ({ page }) => {
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyNew");
    // El formulario termina de armarse (y enfoca el título) unos milisegundos después de abrirse.
    await expect(page.locator("#newForm .eTitle")).toBeFocused();
    await page.fill("#newForm .eTitle", "Prueba"); await page.fill("#newForm .eL >> nth=0", "Dato"); await page.fill("#newForm .eV >> nth=0", "Valor");
    await expect(page.locator("#newForm .eTitle")).toHaveValue("Prueba");
    await page.click("#newForm .eSave");
    await expect.poll(() => page.evaluate(() => S.userH.some(h => h.title === "Prueba"))).toBe(true);
  });
});

test.describe("Mi enfoque", () => {
  test("se guarda y propone práctica del tipo elegido", async ({ page }) => {
    await page.selectOption("#focusSel", "critica");
    expect(await page.evaluate(() => S.focus)).toBe("critica");
    await expect(page.locator("#focusBox")).toContainText("preguntas en tu banco");
    await page.click("#focGo");
    const tipos = await page.evaluate(() => sess.stages[0].items.map(i => qKind(qById(i.id))));
    expect(tipos.length).toBeGreaterThan(0);
    expect(new Set(tipos)).toEqual(new Set(["critica"]));
    // en la pregunta: el tipo, que es tu enfoque, y el método
    await expect(page.locator("#sessBody .tipo.mio")).toContainText("tu enfoque");
    await page.click("#sessBody details.metodo summary");
    await expect(page.locator("#sessBody details.metodo")).toContainText("Identifica el diseño");
    await page.click("#opts .opt >> nth=0");
    await expect(page.locator("#fbBox")).toContainText("Tu enfoque");
  });
  test("datos duros se practica con fichas high-yield", async ({ page }) => {
    await page.selectOption("#focusSel", "datos");
    await expect(page.locator("#focusBox")).toContainText("fichas HY");
    await page.click("#focGo");
    expect(await page.evaluate(() => sess.stages[0].items.filter(i => i.t === "h").length)).toBeGreaterThan(3);
  });
  test("si hay pocas preguntas de un tipo, lo dice y ofrece crearlas", async ({ page }) => {
    // se simula un banco con casi nada de diagnóstico archivando esas preguntas
    await page.evaluate(() => { QUESTIONS.filter(q => qKind(q) === "diagnostico").slice(1).forEach(q => S.hidden["q" + q.id] = 1); rebuild(); });
    await page.selectOption("#focusSel", "diagnostico");
    await expect(page.locator("#focusBox")).toContainText("pocas preguntas de este tipo");
    await expect(page.locator("#focusBox [data-go=apuntes]")).toBeVisible();
  });
  test("los casos que propone la IA suman uno al tipo de tu enfoque", async ({ page }) => {
    const sel = {pages: ["Texto de una revisión."], nums: [1]};
    const antes = await page.evaluate(sel => casosPropuesta("revision", sel).cant.diagnostico, sel);
    await page.selectOption("#focusSel", "diagnostico");
    expect(await page.evaluate(sel => casosPropuesta("revision", sel).cant.diagnostico, sel)).toBe(antes + 1);
  });
  test("Progreso muestra el acierto por tipo de pregunta y permite elegir el enfoque", async ({ page }) => {
    await page.click("nav [data-go=prog]");
    await expect(page.locator("#tipoBars .bar")).toHaveCount(4);
    await page.click("[data-btipo=conducta]");
    expect(await page.evaluate(() => S.focus)).toBe("conducta");
  });
  test("la IA recibe el enfoque", async ({ page }) => {
    await page.selectOption("#focusSel", "datos");
    expect(await page.evaluate(() => focusLine())).toContain("datos duros");
    await page.selectOption("#focusSel", "mixto");
    expect(await page.evaluate(() => focusLine())).toBe("");
  });
});

test.describe("MBE", () => {
  test("calculadora NNT (16 % vs 14.5 % → 67), plegada y explicando que funciona sola", async ({ page }) => {
    await page.click("nav [data-go=mbe]");
    await expect(page.locator("#mbeCalc")).toContainText("escribes los números de cualquier estudio");
    await expect(page.locator("#cCer")).toBeHidden();
    await page.locator('[data-pleg="calcrr"] summary').click();
    await page.fill("#cCer", "16"); await page.fill("#cEer", "14.5");
    await expect(page.locator("#cOut")).toContainText("67");
  });
  test("ofrece auditar un PDF", async ({ page }) => {
    await page.click("nav [data-go=mbe]");
    await expect(page.locator("#mbeDocs #mbeUp")).toBeVisible();
  });
});

test("ninguna pantalla se desborda a 360 px", async ({ page }) => {
  const anchas = [];
  for (const v of ["hoy", "banco", "tarjetas", "estudio", "mbe", "lib", "prog", "new", "rep", "check", "guide", "instalar", "ahorro"]) {
    await page.evaluate(v => go(v), v);
    if (!(await sinDesborde(page))) anchas.push(v);
  }
  expect(anchas).toEqual([]);
});

test("Apariencia: 4 combinaciones de color y modo claro, oscuro o automático; se guarda y cambia los colores de las especialidades", async ({ page }) => {
  const fondo = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await page.evaluate(() => document.documentElement.dataset.pal)).toBe("bosque");
  await page.click("#themeBtn");
  await expect(page.locator("#apariencia")).toBeVisible();
  await expect(page.locator("#apariencia .pal")).toHaveCount(4);
  await page.click('#apariencia [data-modo="light"]');
  const claro = await fondo();
  await page.click('#apariencia [data-modo="dark"]');
  const oscuro = await fondo();
  expect(oscuro).not.toBe(claro);
  expect(await page.evaluate(() => S.theme)).toBe("dark");
  await page.click('#apariencia [data-pal="turquesa"]');
  expect(await fondo()).toBe("rgb(11, 18, 32)");               // turquesa oscuro: los colores de antes
  expect(await page.evaluate(() => [S.palette, SPEC_COLOR["Cirugía"]])).toEqual(["turquesa", "#7c3aed"]);
  await page.click('#apariencia [data-pal="petroleo"]');
  expect(await page.evaluate(() => SPEC_COLOR["Cirugía"])).toBe("#e36414");
  await page.click('#apariencia [data-modo="auto"]');
  expect(await page.evaluate(() => S.theme)).toBe(null);
  await page.click('#apariencia button[value="cerrar"]');
  await expect(page.locator("#apariencia")).toBeHidden();
  // Se guarda en el dispositivo.
  await page.reload();
  expect(await page.evaluate(() => [document.documentElement.dataset.pal, S.palette])).toEqual(["petroleo", "petroleo"]);
});

test("lo creado con la antigua especialidad Urgencias pasa a Medicina Interna", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem("medipulse_v2", JSON.stringify({userQ: [{id: "u1", specialty: "Urgencias", topic: "Propio", vignette: "Caso", options: ["a","b","c","d"], correct: 0, whyCorrect: "x", pearl: "", trap: ""}], notes: [{id: "n1", spec: "Urgencias", title: "Nota", f: []}], seq: 1}));
  });
  await page.reload();
  expect(await page.evaluate(() => [S.userQ[0].specialty, S.notes[0].spec, SPECS.includes("Urgencias")])).toEqual(["Medicina Interna", "Medicina Interna", false]);
});

test("el aviso de versión nueva aparece una sola vez y ofrece actualizar", async ({ page }) => {
  await page.evaluate(() => { avisoVersionNueva(); avisoVersionNueva(); });
  await expect(page.locator("#nuevaVersion")).toHaveCount(1);
  await expect(page.locator("#nuevaVersionBtn")).toHaveText("Actualizar");
  expect(await sinDesborde(page)).toBe(true);
});

test("la versión nueva se instala con archivos pedidos al servidor, no a la caché del navegador", async ({ request }) => {
  const sw = await (await request.get("/sw.js")).text();
  expect(sw).toContain('cache: "reload"');
});

test("modo a tope: ninguna pregunta se repite entre bloques", async ({ page }) => {
  await page.goto("/");
  await page.click("[data-mode=beast]");
  const ids = await page.evaluate(() => sess.stages.flatMap(st => st.items.filter(i => i.t === "q").map(i => String(i.id))));
  expect(ids.length).toBeGreaterThan(5);
  expect(new Set(ids).size).toBe(ids.length);
});

test("ninguna pantalla dice «tarjetas» (ahora son fichas); solo la tarjeta de crédito de la guía", async ({ page }) => {
  for (const v of ["hoy", "banco", "tarjetas", "estudio", "mbe", "lib", "prog", "new", "rep", "guide", "instalar", "ahorro"]) {
    await page.evaluate(v => go(v), v);
    const t = await page.evaluate(() => document.querySelector(".view.on").innerText.replace(/tarjeta de crédito|registra tu tarjeta/gi, ""));
    expect(t, `pantalla ${v}`).not.toMatch(/tarjeta/i);
  }
});

test("Hoy sin respuestas no inventa un «punto débil»: propone el diagnóstico; MBE se presenta como Laboratorio y el resumen ya no es «Destilador»", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#suggestCard")).toContainText("Todavía no sé cuál es tu punto más débil");
  await expect(page.locator("#suggestCard #doDiag")).toBeVisible();
  await expect(page.locator('#v-hoy [data-go="mbe"]')).toContainText("Laboratorio MBE");
  await page.click("nav [data-go=mbe]");
  await expect(page.locator("#v-mbe")).toContainText("Resume lo que leíste");
  await expect(page.locator("#v-mbe")).not.toContainText(/[Dd]estil/);
});

test.describe("Hoy rediseñado", () => {
  test("perla del día ordenada en viñetas; «Ponerla a prueba» abre su caso; Hoy con pulso, «Seguir» y meta que elige el usuario", async ({ page }) => {
    await page.goto("/");
    // Arriba el pulso de hoy, luego el siguiente paso y el recuadro que cambia (con la perla).
    const orden = await page.evaluate(() => [...document.querySelectorAll("#v-hoy .stack > *")].map(e => e.id));
    // el siguiente paso va primero (prueba de usabilidad: debajo del pulso quedaba fuera de la primera vista)
    expect(orden.indexOf("suggestCard")).toBeLessThan(orden.indexOf("todayCard"));
    expect(orden.indexOf("todayCard")).toBeLessThan(orden.indexOf("rotaBox"));
    await expect(page.locator("#rotaBox #pearlCard")).toHaveCount(1);
    const r = await page.evaluate(() => [
      perlaHTML("UKKA: 1) proteger el corazón (calcio IV); 2) meter K+ a la célula (insulina 10 U; salbutamol nebulizado); 3) sacar K+ del cuerpo. El resonio ya no se usa de rutina."),
      perlaHTML("NICE: antibiótico por 5 días. Gravedad moderada: amoxicilina."),
      perlaHTML("En NAC por influenza no se sugieren corticosteroides.")]);
    expect(r[0]).toContain('<div class="perla-t">UKKA</div><ol class="perla-l"><li>Proteger el corazón (calcio IV)</li><li>Meter K+ a la célula<ul><li>Insulina 10 U</li><li>Salbutamol nebulizado</li></ul></li><li>Sacar K+ del cuerpo</li></ol>');
    expect(r[0]).toContain("El resonio ya no se usa de rutina");
    expect(r[1]).toContain("<b>Gravedad moderada:</b> amoxicilina");
    expect(r[2]).toBe("<p>En NAC por influenza no se sugieren corticosteroides.</p>");
    await expect(page.locator("#todayCard .pulso-min")).toContainText("de 25 min");
    await expect(page.locator("#todayCard .pulso-pie")).toContainText("faltan 25 min");
    await page.selectOption("#metaMin", "45");
    await expect(page.locator("#todayCard .pulso-min")).toContainText("de 45 min");
    expect(await page.evaluate(() => S.metaMin)).toBe(45);
    await expect(page.locator("#semCard .racha7 .d")).toHaveCount(7);
    await expect(page.locator("#suggestCard")).toContainText("Tu siguiente paso");
    await expect(page.locator("#pearlCard")).not.toContainText("Guardar como ficha");   // sale de un caso: se gestiona con el caso
    await page.click("#perlaCaso");
    await expect(page.locator("#sessBody")).toBeVisible();
  });

  test("perla inteligente: primero la de un caso que fallaste; «A mis repasos» agenda el caso para mañana; «Me la sé» la saca 60 días; no se repite en 30", async ({ page }) => {
    await page.goto("/");
    const fallado = await page.evaluate(() => { const q = QUESTIONS.filter(x => x.pearl)[7];
      S.srs["q" + q.id] = {b: 0, due: Date.now() + 9e9, n: 1, ok: 0, last: 0}; S.perlas = {vista: {}, sabe: {}, hoy: null}; save(); renderHoy(); return String(q.id); });
    expect(await page.evaluate(() => S.perlas.hoy.id)).toBe(fallado);
    await expect(page.locator("#pearlCard")).toContainText("De un caso que fallaste");
    // Durante el día es la misma perla.
    await page.evaluate(() => renderHoy());
    expect(await page.evaluate(() => S.perlas.hoy.id)).toBe(fallado);
    await page.click("#perlaRep");
    const r = await page.evaluate(id => { const x = S.srs["q" + id], m = new Date(); m.setHours(24, 0, 0, 0); return [x.due === m.getTime(), x.agendado]; }, fallado);
    expect(r).toEqual([true, true]);
    await expect(page.locator("#perlaRep")).toHaveText("✓ En tus repasos");
    await page.click("#perlaSabe");
    const otra = await page.evaluate(() => S.perlas.hoy.id);
    expect(otra).not.toBe(fallado);
    expect(await page.evaluate(id => !!S.perlas.sabe[id], fallado)).toBe(true);
    // Ninguna perla vista en los últimos 30 días vuelve a salir.
    const vistas = await page.evaluate(() => { const ids = new Set(); for (let i = 0; i < 20; i++) { S.perlas.hoy = null; ids.add(elegirPerla().id); } return ids.size; });
    expect(vistas).toBe(20);
  });

  test("la barra usa íconos propios (no emojis), dice «Fichas» y cabe en un renglón a 360 px", async ({ page }) => {
    await page.setViewportSize({width: 360, height: 780});
    await page.goto("/");
    await expect(page.locator("nav.bottom button svg")).toHaveCount(7);
    await expect(page.locator('nav.bottom [data-go="tarjetas"]')).toHaveText("Fichas");
    const alturas = await page.locator("nav.bottom button").evaluateAll(bs => bs.map(b => b.getBoundingClientRect().height));
    expect(Math.max(...alturas) - Math.min(...alturas)).toBeLessThan(1);   // ninguna etiqueta en dos renglones
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});

test("MBE: los 4 tipos de documento se ven completos a 360 px, sin deslizar", async ({ page }) => {
  await page.goto("/");
  await page.click("nav [data-go=mbe]");
  const bordes = await page.$$eval("#mbeTabs button", bs => bs.map(b => b.getBoundingClientRect().right));
  expect(bordes).toHaveLength(4);
  bordes.forEach(r => expect(r).toBeLessThanOrEqual(360));
});

test.describe("usabilidad en el celular (prueba de un usuario exigente)", () => {
  test("durante una sesión no hay barra inferior ni contadores; al salir vuelven", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#streakChip")).toContainText("días");
    await expect(page.locator("#dueChip")).toContainText("repasos");
    await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: QUESTIONS[0].id}]}]}));
    await expect(page.locator("nav.bottom")).toBeHidden();
    await expect(page.locator("#streakChip")).toBeHidden();
    await page.evaluate(() => { endSession(false); go("hoy"); });
    await expect(page.locator("nav.bottom")).toBeVisible();
  });

  test("al responder, la explicación sube a la vista; la ayuda de tachar se va después de usarlo", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => startSession({label: "x", tag: "norm", stages: [{name: "x", items: [{t: "q", id: QUESTIONS[0].id}]}]}));
    await expect(page.locator("#tacharAyuda")).toBeVisible();
    await page.click(".xbtn >> nth=0");
    await expect(page.locator("#tacharAyuda")).toHaveCount(0);
    await page.click("#opts .opt >> nth=1");
    await page.waitForTimeout(700);
    const r = await page.evaluate(() => { const b = document.querySelector("#fbBox").getBoundingClientRect(); return [b.top, innerHeight]; });
    expect(r[0]).toBeLessThan(r[1] * 0.6);
  });
});
