// ===================================================================
// DIAGNÓSTICO INICIAL: conocer al usuario antes de recomendarle qué estudiar.
// Parte 1 · Conocimientos: 50 casos (10 por área, mezclando tipos de pregunta) en 5 bloques de 10
//   en modo examen, con auditoría a ciegas. Se puede hacer un bloque hoy y el resto otro día.
// Parte 2 · Cómo estudias: cuestionario de hábitos comparado con la evidencia.
// Parte 3 · Juicio clínico: un expediente con ruido (el usuario elige entre 3): filtrar, resumir,
//   priorizar y decidir.
// La app no se bloquea: lo personalizado (casos sin límite, simulacro, vulnerabilidades, A tope,
// plan) se abre al terminar la parte 1. Con ?prueba=1 se activa el modo de prueba (sin candados).
// ===================================================================
const DIAG_POR_AREA = 10, DIAG_BLOQUE = 10, DIAG_LIBRES_DIA = 10;
const DIAG_TIPOS = {conducta: 4, diagnostico: 3, datos: 2, critica: 1};   // mezcla por área
const diagEst = () => S.diag || (S.diag = {p1: null, p2: null, p3: null, visto: 0});

// Modo de prueba: para el autor y los probadores. Se activa abriendo la app con ?prueba=1 (y se apaga
// con ?prueba=0 o desde Progreso). Vive aparte del progreso: «Borrar progreso» no lo quita.
const KEY_PRUEBA = "medipulse_prueba";
const modoPrueba = () => { try { return localStorage.getItem(KEY_PRUEBA) === "1"; } catch(e) { return false; } };
function setModoPrueba(on){ try { on ? localStorage.setItem(KEY_PRUEBA, "1") : localStorage.removeItem(KEY_PRUEBA); } catch(e) {} }
(function(){ try { const q = new URLSearchParams(location.search);
  if (q.has("prueba")) { setModoPrueba(q.get("prueba") !== "0"); history.replaceState(null, "", location.pathname + location.hash); } } catch(e) {} })();
const diagHecho = () => modoPrueba() || !!(S.diag && S.diag.p1 && S.diag.p1.fin);

// Los casos del diagnóstico: los mismos para siempre (se eligen la primera vez).
function diagSeleccion(){
  const out = [];
  SPECS.forEach(sp => {
    const pool = shuffle(QUESTIONS.filter(q => q.specialty === sp && !S.hidden["q" + q.id]));
    const elegidos = [];
    Object.entries(DIAG_TIPOS).forEach(([k, n]) => pool.filter(q => qKind(q) === k && !elegidos.includes(q)).slice(0, n).forEach(q => elegidos.push(q)));
    pool.filter(q => !elegidos.includes(q)).slice(0, DIAG_POR_AREA - elegidos.length).forEach(q => elegidos.push(q));
    out.push(elegidos.slice(0, DIAG_POR_AREA).map(q => String(q.id)));
  });
  // Bloques de 10 con todas las áreas mezcladas: se toma uno de cada área por turno.
  const mezcla = [];
  for (let i = 0; out.some(a => i < a.length); i++) out.forEach(a => { if (i < a.length) mezcla.push(a[i]); });
  return mezcla;
}
function diagP1(){
  const D = diagEst();
  if (!D.p1) { D.p1 = {ids: diagSeleccion(), hechos: [], ini: Date.now(), fin: 0}; save(); }
  return D.p1;
}
const diagBloques = p1 => { const b = []; for (let i = 0; i < p1.ids.length; i += DIAG_BLOQUE) b.push(p1.ids.slice(i, i + DIAG_BLOQUE)); return b; };
function diagProgreso(){
  const p1 = S.diag && S.diag.p1; if (!p1) return {hechos: 0, total: DIAG_POR_AREA * SPECS.length};
  return {hechos: p1.hechos.length, total: p1.ids.length};
}
function diagEmpezarBloque(n){
  const p1 = diagP1(), b = diagBloques(p1)[n]; if (!b) return;
  startSession({label: "Diagnóstico", tag: "fire", diagBloque: n, stages: [{name: `Diagnóstico · bloque ${n + 1} de ${diagBloques(p1).length}`, items: b.map(id => ({t: "q", id})), exam: true, limit: b.length * 72}]});
}
// Al terminar un bloque (finishExam): se guardan sus casos como hechos.
function diagRegistrarBloque(n, rs){
  const p1 = diagP1(), ids = rs.map(r => String(r.q.id));
  ids.forEach(id => { if (!p1.hechos.includes(id)) p1.hechos.push(id); });
  if (p1.hechos.length >= p1.ids.length && !p1.fin) p1.fin = Date.now();
  save();
}

// ---------- Candados: la app no se bloquea, pero lo personalizado espera al diagnóstico ----------
function diagLibresHoy(){
  const ini = new Date(); ini.setHours(0, 0, 0, 0);
  const diag = new Set(((S.diag && S.diag.p1 && S.diag.p1.ids) || []).map(String));
  return (S.resp || []).filter(r => r.d >= ini.getTime() && !diag.has(String(r.id))).length;
}
function diagCandadoHTML(que){
  const p = diagProgreso(), faltan = p.total - p.hechos;
  return `<div class="candado" role="note"><b>🔒 ${esc(que)} se abre con tu diagnóstico</b>
    <p class="xs" style="margin:4px 0 8px">${p.hechos ? `Te faltan <b>${faltan}</b> de ${p.total} casos.` : `Son ${p.total} casos, en bloques de ${DIAG_BLOQUE} (unos 12 minutos cada uno).`} Tu diagnóstico decide qué te conviene practicar.</p>
    <button class="btn sm primary" data-go="diag">🎯 ${p.hechos ? "Seguir el diagnóstico" : "Hacer el diagnóstico"}</button></div>`;
}
// ¿Puede practicar libremente? (10 casos al día antes del diagnóstico)
const diagPuedePracticar = () => diagHecho() || diagLibresHoy() < DIAG_LIBRES_DIA;

// ---------- Pantalla del diagnóstico ----------
function renderDiag(){
  const box = $("#diagBox"); if (!box) return;
  const D = diagEst(); D.visto = D.visto || Date.now(); save();
  if (D.vista === "p2") return renderDiagP2(box);
  if (D.vista === "p3") return renderDiagP3(box);
  const p1 = diagP1(), bl = diagBloques(p1), p = diagProgreso();
  const parte = (n, t, d, estado, cuerpo) => `<div class="card stack diagparte"><div class="row" style="gap:8px"><span class="pnum">${n}</span><b style="flex:1">${t}</b>${estado}</div>
    <p class="xs muted" style="margin:0">${d}</p>${cuerpo}</div>`;
  const listo = `<span class="tag" style="background:var(--ok-soft);color:var(--ok)">✓ Hecha</span>`;
  box.innerHTML = `
    <div class="card stack"><p class="small" style="margin:0">Antes de recomendarte qué estudiar, necesito conocerte: qué sabes, cómo estudias y cómo razonas un caso. Puedes hacerlo por partes y seguir otro día; todo queda guardado en tu dispositivo.</p>
      <div class="track" aria-label="Avance de la parte 1"><i style="width:${Math.round(p.hechos / p.total * 100)}%;background:var(--accent)"></i></div>
      <p class="xs muted" style="margin:0">Parte 1: ${p.hechos} de ${p.total} casos.${p.total < DIAG_POR_AREA * SPECS.length ? ` Por ahora hay ${p.total}: algunas áreas aún tienen pocos casos.` : ""}</p>
      ${modoPrueba() ? `<p class="xs" style="margin:0;color:var(--warn)">🧪 Modo de prueba: los candados están desactivados en este dispositivo. <button class="linkbtn" id="diagPruebaOff">Apagarlo</button></p>` : ""}</div>
    ${parte(1, "Conocimientos", `${p.total} casos de las 5 áreas, en modo examen (unos 72 s por caso). Al final de cada bloque, una auditoría a ciegas: marcas si respondiste seguro, dudando o al azar antes de ver tu nota.`,
      p1.fin ? listo : "",
      `<div class="stack" style="gap:6px">${bl.map((b, i) => { const hecho = b.every(id => p1.hechos.includes(id));
        return `<div class="row" style="gap:8px"><span class="small" style="flex:1">Bloque ${i + 1} · ${b.length} casos</span>${hecho ? `<span class="xs" style="color:var(--ok)">✓ Hecho</span>` : `<button class="btn sm${i === bl.findIndex(x => !x.every(id => p1.hechos.includes(id))) ? " primary" : ""}" data-dbl="${i}">Empezar</button>`}</div>`; }).join("")}</div>`)}
    ${parte(2, "Cómo estudias", "Unas 15 preguntas sobre tu tiempo, tus técnicas y tus hábitos, comparadas con lo que la evidencia dice que funciona. Unos 10 minutos.",
      D.p2 && D.p2.fin ? listo : "", `<button class="btn sm${p1.fin && !(D.p2 && D.p2.fin) ? " primary" : ""}" data-dpart="p2">${D.p2 && D.p2.fin ? "Ver tu resultado" : D.p2 && D.p2.i ? "Seguir" : "Empezar"}</button>`)}
    ${parte(3, "Juicio clínico", "Un expediente real, con datos que importan y otros que distraen. Eliges el caso; filtras, resumes, priorizas y decides. Unos 25 minutos.",
      D.p3 && D.p3.fin ? listo : "", `<button class="btn sm" data-dpart="p3">${D.p3 && D.p3.fin ? "Ver tu resultado" : D.p3 && D.p3.caso ? "Seguir" : "Elegir el caso"}</button>`)}`;
  box.querySelectorAll("[data-dbl]").forEach(b => b.onclick = () => diagEmpezarBloque(+b.dataset.dbl));
  box.querySelectorAll("[data-dpart]").forEach(b => b.onclick = () => { D.vista = b.dataset.dpart; save(); renderDiag(); scrollTo(0, 0); });
  $("#diagPruebaOff") && ($("#diagPruebaOff").onclick = () => { setModoPrueba(false); toast("Modo de prueba apagado"); renderDiag(); });
}

// ---------- Parte 2 · Cómo estudias ----------
// Cada opción suma de 0 (poco útil) a 2 (lo que la evidencia respalda). Técnicas según Dunlosky y cols.,
// Psychol Sci Public Interest 2013: autoevaluación y práctica espaciada, utilidad alta; explicarse e
// intercalar temas, moderada; releer, subrayar y resumir, baja. «situacion» no suma: alimenta el plan.
const DIAG_P2 = [
  {k: "examen", g: "situacion", p: "¿Cuándo es tu examen?", o: ["En menos de 1 mes", "En 1 a 3 meses", "En 3 a 6 meses", "En 6 a 12 meses", "En más de 1 año", "Aún no lo sé"]},
  {k: "horas", g: "situacion", p: "¿Cuántas horas a la semana puedes estudiar de verdad?", o: ["Menos de 5", "5 a 10", "10 a 20", "20 a 30", "Más de 30"]},
  {k: "intentos", g: "situacion", p: "¿Cuántas veces has presentado el examen?", o: ["Ninguna, es la primera", "1 vez", "2 veces", "3 o más"]},
  {k: "trabajo", g: "situacion", p: "¿Trabajas mientras te preparas?", o: ["No", "Medio tiempo", "Tiempo completo", "Turnos o rural"]},
  {k: "releer", g: "tecnica", p: "¿Con qué frecuencia relees el material para estudiar?", o: ["Casi siempre", "A veces", "Casi nunca"], s: [0, 1, 2],
    tip: "Releer da sensación de dominio, pero se olvida rápido. Cambia la segunda lectura por responder preguntas sin mirar.", h: "Casos"},
  {k: "subrayar", g: "tecnica", p: "¿Subrayas o resaltas mientras lees?", o: ["Casi siempre", "A veces", "Casi nunca"], s: [0, 1, 2],
    tip: "Subrayar casi no mejora lo que recuerdas. Al terminar cada bloque, escribe de memoria los 3 puntos clave (Sesión de estudio).", h: "Estudio"},
  {k: "resumir", g: "tecnica", p: "¿Haces resúmenes de lo que estudias?", o: ["Casi siempre, largos", "Sí, cortos y con mis palabras", "Casi nunca"], s: [0, 2, 1],
    tip: "Un resumen largo copia el libro. Si resumes, que sea corto, con tus palabras y en forma de preguntas o fichas.", h: "Fichas"},
  {k: "autoevaluar", g: "tecnica", p: "¿Respondes preguntas o casos para ponerte a prueba?", o: ["Casi nunca", "A veces", "Casi siempre"], s: [0, 1, 2],
    tip: "Ponerse a prueba es la técnica con más evidencia: recordar fija más que releer. Haz casos todos los días, aunque sean 10.", h: "Casos"},
  {k: "espaciar", g: "tecnica", p: "¿Repasas lo mismo en días separados (no todo el mismo día)?", o: ["Casi nunca", "A veces", "Casi siempre"], s: [0, 1, 2],
    tip: "Repasar en días separados vence la curva del olvido. Deja que la app te traiga los repasos pendientes cada día.", h: "Hoy"},
  {k: "explicar", g: "tecnica", p: "¿Te explicas (o explicas a otro) por qué algo es así?", o: ["Casi nunca", "A veces", "Casi siempre"], s: [0, 1, 2],
    tip: "Preguntarte «¿por qué?» une el dato con el mecanismo y se recuerda mejor. Úsalo con la explicación de cada caso que fallas.", h: "Casos"},
  {k: "intercalar", g: "tecnica", p: "En una sesión, ¿mezclas temas o especialidades?", o: ["No, un tema por sesión", "A veces", "Sí, mezclo"], s: [0, 1, 2],
    tip: "Mezclar temas obliga a reconocer qué tipo de problema es, como en el examen. Practica casos al azar entre especialidades.", h: "Casos"},
  {k: "apuntes", g: "habito", p: "¿Cómo tomas apuntes?", o: ["Copio casi textual", "Resumo con mis palabras", "Esquemas o tablas comparativas", "Preguntas que luego respondo", "No tomo apuntes"], s: [0, 1, 2, 2, 1],
    tip: "Copiar textual no procesa la información. Anota en forma de pregunta o de comparación «A frente a B»: luego te sirven para repasar.", h: "Mis apuntes"},
  {k: "fallo", g: "habito", p: "Cuando fallas una pregunta, ¿qué haces?", o: ["Sigo con la siguiente", "Leo la respuesta correcta", "Busco por qué fallé y lo anoto", "La vuelvo a hacer días después"], s: [0, 1, 2, 2],
    tip: "El error es la mejor información que tienes. Marca por qué fallaste (no lo sabía, no vi un dato, dudé, lo confundí) y deja que vuelva a tu repaso.", h: "Casos"},
  {k: "celular", g: "habito", p: "¿Dónde está el celular cuando estudias?", o: ["En la mano o la mesa, con notificaciones", "En la mesa, en silencio", "En otra habitación"], s: [0, 1, 2],
    tip: "Con el celular a la vista rindes menos aunque no lo toques. Déjalo en otra habitación durante cada bloque.", h: "Estudio"},
  {k: "sueno", g: "habito", p: "¿Cuántas horas duermes la noche antes de estudiar?", o: ["Menos de 6", "6 a 7", "7 a 8", "Más de 8"], s: [0, 1, 2, 2],
    tip: "Lo que estudias se consolida mientras duermes. Recortar sueño para estudiar más suele salir caro.", h: ""},
  {k: "plan", g: "habito", p: "¿Cómo organizas tu tiempo de estudio?", o: ["Sin plan, según el día", "Con un plan semanal", "Por bloques con descansos"], s: [0, 2, 2],
    tip: "Sin plan, se estudia lo que gusta y no lo que falta. Sigue el plan que arma tu diagnóstico y estudia en bloques con descanso.", h: "Estudio"}
];
function diagP2Resultado(){
  const r = (S.diag && S.diag.p2 && S.diag.p2.resp) || {};
  const puntuables = DIAG_P2.filter(q => q.s && r[q.k] != null);
  const total = puntuables.reduce((a, q) => a + q.s[r[q.k]], 0), max = puntuables.length * 2;
  const cambiar = puntuables.filter(q => q.s[r[q.k]] === 0).concat(puntuables.filter(q => q.s[r[q.k]] === 1));
  const suman = puntuables.filter(q => q.s[r[q.k]] === 2);
  return {pct: max ? Math.round(total / max * 100) : 0, cambiar, suman, r};
}
function renderDiagP2(box){
  const D = diagEst(), p2 = D.p2 || (D.p2 = {resp: {}, i: 0, fin: 0});
  if (p2.i >= DIAG_P2.length) {
    if (!p2.fin) { p2.fin = Date.now(); save(); }
    const R = diagP2Resultado();
    box.innerHTML = `<div class="card stack"><h3 style="font-size:16px">📋 Cómo estudias</h3>
      <p class="small" style="margin:0">Tus hábitos suman <b>${R.pct} %</b> de lo que la evidencia recomienda.</p>
      ${R.cambiar.length ? `<b class="small">Lo que más te conviene cambiar</b>${R.cambiar.slice(0, 3).map(q => `<div class="note" style="margin:0"><b class="small">${esc(q.o[R.r[q.k]])}</b> → <span class="small">${esc(q.tip)}</span>${q.h ? ` <span class="xs muted">· en la app: ${esc(q.h)}</span>` : ""}</div>`).join("")}` : ""}
      ${R.suman.length ? `<p class="xs muted" style="margin:0">✓ Ya haces bien: ${R.suman.map(q => esc(q.p.replace(/^¿|\?$/g, "").toLowerCase())).slice(0, 4).join(" · ")}.</p>` : ""}
      <div class="row" style="gap:6px"><button class="btn primary" id="p2Volver">Volver al diagnóstico</button><button class="btn ghost sm" id="p2Rehacer">Responder de nuevo</button></div></div>`;
    $("#p2Volver").onclick = () => { D.vista = null; save(); renderDiag(); };
    $("#p2Rehacer").onclick = () => { D.p2 = {resp: {}, i: 0, fin: 0}; save(); renderDiag(); };
    return;
  }
  const q = DIAG_P2[p2.i];
  box.innerHTML = `<div class="card stack"><div class="row"><span class="xs muted">Parte 2 · Cómo estudias</span><div class="spacer"></div><span class="xs muted">${p2.i + 1} / ${DIAG_P2.length}</span></div>
    <div class="track"><i style="width:${Math.round(p2.i / DIAG_P2.length * 100)}%;background:var(--accent)"></i></div>
    <b style="font-size:17px">${esc(q.p)}</b>
    <div class="stack" style="gap:6px">${q.o.map((o, i) => `<button class="btn${p2.resp[q.k] === i ? " primary" : ""}" style="text-align:left" data-p2="${i}">${esc(o)}</button>`).join("")}</div>
    <div class="row">${p2.i ? `<button class="linkbtn small" id="p2Atras">← Anterior</button>` : ""}<div class="spacer"></div><button class="linkbtn small" id="p2Salir">Seguir después</button></div></div>`;
  box.querySelectorAll("[data-p2]").forEach(b => b.onclick = () => { p2.resp[q.k] = +b.dataset.p2; p2.i++; save(); renderDiag(); });
  $("#p2Atras") && ($("#p2Atras").onclick = () => { p2.i--; save(); renderDiag(); });
  $("#p2Salir").onclick = () => { D.vista = null; save(); renderDiag(); };
}

function renderDiagP3(box){ box.innerHTML = `<div class="card"><p class="small" style="margin:0">Los expedientes están en camino.</p><button class="btn sm" id="p3Volver">Volver</button></div>`; $("#p3Volver").onclick = () => { diagEst().vista = null; save(); renderDiag(); }; }
