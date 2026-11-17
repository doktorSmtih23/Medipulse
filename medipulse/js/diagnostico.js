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
  box.innerHTML = (p1.hechos.length ? diagPerfilHTML() : "") + `
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


// ---------- Parte 3 · Juicio clínico ----------
// Un expediente con señal y ruido (data/expedientes.js): leer, filtrar, resumir sin mirar, comparar con las
// ideas clave, elegir el problema principal y decidir. Mide cuánta señal encuentra, cuánto ruido arrastra,
// si se ancla en el distractor y cómo decide.
function expDocHTML(E, marcar){
  return E.doc.map(s => `<div class="expsec"><b class="small">${esc(s.h)}</b>
    ${s.p ? `<p class="small" style="margin:4px 0 0">${esc(s.p)}</p>` : ""}
    ${s.li ? `<ul class="small" style="margin:4px 0 0;padding-left:18px">${s.li.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${s.tabla ? `<table class="tabla exptab small" style="margin-top:4px">${s.tabla.map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td class="xs muted">${esc(r[2])}</td></tr>`).join("")}</table>` : ""}</div>`).join("");
}
function diagP3Resultado(){
  const p3 = S.diag && S.diag.p3; if (!p3 || !p3.caso) return null;
  const E = EXPEDIENTES.find(x => x.k === p3.caso); if (!E) return null;
  const senal = E.datos.map((d, i) => i).filter(i => E.datos[i].s), ruido = E.datos.map((d, i) => i).filter(i => !E.datos[i].s);
  const sel = new Set(p3.sel || []);
  return {E, senal: senal.filter(i => sel.has(i)).length, nSenal: senal.length, ruido: ruido.filter(i => sel.has(i)).length, nRuido: ruido.length,
    ideas: (p3.ideas || []).filter(Boolean).length, nIdeas: E.ideas.length, problema: p3.prob === E.problema.c, ancla: p3.prob === E.problema.ancla,
    dec: E.decisiones.filter((d, i) => (p3.dec || [])[i] === d.c).length, nDec: E.decisiones.length};
}
function renderDiagP3(box){
  const D = diagEst(), p3 = D.p3 || (D.p3 = {caso: null, paso: "elegir"});
  const volver = `<button class="linkbtn small" id="p3Salir">← Volver al diagnóstico</button>`;
  const bind = () => { $("#p3Salir") && ($("#p3Salir").onclick = () => { D.vista = null; save(); renderDiag(); }); };
  const ir = paso => { p3.paso = paso; save(); renderDiag(); scrollTo(0, 0); };
  const E = EXPEDIENTES.find(x => x.k === p3.caso);
  const cab = n => `<div class="row"><span class="xs muted">Parte 3 · ${esc(E.t)}</span><div class="spacer"></div><span class="xs muted">Paso ${n} de 6</span></div>`;
  if (!E || p3.paso === "elegir") {
    box.innerHTML = `<div class="card stack"><b>🩺 Elige un caso</b><p class="xs muted" style="margin:0">Es un expediente como los de un turno: hay datos que importan y otros que distraen. Lo vas a leer, filtrar, resumir y decidir. Unos 25 minutos.</p>
      ${EXPEDIENTES.map(x => `<button class="btn" style="text-align:left" data-exp="${x.k}"><b>${x.icono} ${esc(x.t)}</b><br><span class="xs muted">${esc(x.area)} · ${esc(x.gancho)}</span></button>`).join("")}${volver}</div>`;
    box.querySelectorAll("[data-exp]").forEach(b => b.onclick = () => { D.p3 = {caso: b.dataset.exp, paso: "leer", ini: Date.now()}; save(); renderDiag(); scrollTo(0, 0); });
    return bind();
  }
  if (p3.paso === "leer") {
    box.innerHTML = `<div class="card stack">${cab(1)}<b>Lee el expediente</b><p class="xs muted" style="margin:0">Léelo como en un turno, unos 8 minutos. Cuando sigas, ya no lo tendrás a la vista hasta el final.</p></div>
      <div class="card stack expdoc">${expDocHTML(E)}</div>
      <button class="btn primary block" id="p3Sig">Ya lo leí →</button>${volver}`;
    $("#p3Sig").onclick = () => ir("filtrar"); return bind();
  }
  if (p3.paso === "filtrar") {
    const sel = new Set(p3.sel || []);
    box.innerHTML = `<div class="card stack">${cab(2)}<b>¿Cuáles de estos datos cambian lo que vas a hacer?</b><p class="xs muted" style="margin:0">Marca solo los que importan para decidir. Los demás son ruido.</p>
      ${E.datos.map((d, i) => `<label class="row check" style="gap:8px;align-items:flex-start"><input type="checkbox" data-dato="${i}" ${sel.has(i) ? "checked" : ""}><span class="small">${esc(d.t)}</span></label>`).join("")}
      <button class="btn primary block" id="p3Sig">Listo →</button></div>${volver}`;
    box.querySelectorAll("[data-dato]").forEach(c => c.onchange = () => { p3.sel = [...box.querySelectorAll("[data-dato]:checked")].map(x => +x.dataset.dato); save(); });
    $("#p3Sig").onclick = () => { p3.sel = [...box.querySelectorAll("[data-dato]:checked")].map(x => +x.dataset.dato); ir("resumen"); }; return bind();
  }
  if (p3.paso === "resumen") {
    box.innerHTML = `<div class="card stack">${cab(3)}<b>Resume el caso en 3 líneas, sin mirar</b><p class="xs muted" style="margin:0">Como si se lo presentaras al especialista de turno: qué tiene, por qué lo crees y qué vas a hacer.</p>
      <textarea id="p3Res" rows="5" placeholder="1. …">${esc(p3.resumen || "")}</textarea>
      <button class="btn primary block" id="p3Sig">Comparar →</button></div>${volver}`;
    $("#p3Res").oninput = e => { p3.resumen = e.target.value; save(); };
    $("#p3Sig").onclick = () => { p3.resumen = $("#p3Res").value; ir("ideas"); }; return bind();
  }
  if (p3.paso === "ideas") {
    const ok = p3.ideas || E.ideas.map(() => false);
    box.innerHTML = `<div class="card stack">${cab(4)}<b>Compara tu resumen con las ideas clave</b>
      <div class="note" style="margin:0"><span class="xs muted">Tu resumen:</span><p class="small" style="margin:4px 0 0;white-space:pre-wrap">${esc(p3.resumen || "(vacío)")}</p></div>
      <p class="xs muted" style="margin:0">Marca las ideas que tu resumen incluye, aunque las hayas dicho con otras palabras.</p>
      ${E.ideas.map((x, i) => `<label class="row check" style="gap:8px;align-items:flex-start"><input type="checkbox" data-idea="${i}" ${ok[i] ? "checked" : ""}><span class="small">${esc(x)}</span></label>`).join("")}
      <button class="btn primary block" id="p3Sig">Seguir →</button></div>${volver}`;
    $("#p3Sig").onclick = () => { p3.ideas = E.ideas.map((_, i) => !!box.querySelector(`[data-idea="${i}"]`).checked); ir("problema"); }; return bind();
  }
  if (p3.paso === "problema" || p3.paso === "dec") {
    const enDec = p3.paso === "dec", j = enDec ? (p3.j || 0) : -1, P = enDec ? E.decisiones[j] : E.problema;
    const r = enDec ? (p3.dec || [])[j] : p3.prob, resp = r != null;
    box.innerHTML = `<div class="card stack">${cab(enDec ? 6 : 5)}<b>${esc(P.p)}</b>
      <div class="stack" style="gap:6px">${P.o.map((o, i) => `<button class="btn${resp ? (i === P.c ? " ok" : i === r ? " mal" : "") : ""}" style="text-align:left" data-pr="${i}" ${resp ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
      ${resp ? `<div class="note" style="margin:0"><b class="small">${r === P.c ? "✓ Bien." : "✗ No era esa."}</b> <span class="small">${esc(P.por)}</span>${P.fuente ? `<div class="xs muted" style="margin-top:4px">📚 ${esc(P.fuente)}</div>` : ""}</div>
        <button class="btn primary block" id="p3Sig">${enDec && j === E.decisiones.length - 1 ? "Ver tu resultado →" : "Seguir →"}</button>` : ""}</div>${volver}`;
    box.querySelectorAll("[data-pr]").forEach(b => b.onclick = () => { if (enDec) { p3.dec = p3.dec || []; p3.dec[j] = +b.dataset.pr; } else p3.prob = +b.dataset.pr; save(); renderDiag(); });
    $("#p3Sig") && ($("#p3Sig").onclick = () => { if (!enDec) { p3.j = 0; ir("dec"); } else if (j < E.decisiones.length - 1) { p3.j = j + 1; ir("dec"); } else { p3.fin = Date.now(); ir("fin"); } });
    return bind();
  }
  // Resultado
  const R = diagP3Resultado();
  box.innerHTML = `<div class="card stack"><b>🩺 Tu juicio clínico · ${esc(E.t)}</b>
    <div class="grid2"><div class="kpi"><b>${R.senal}/${R.nSenal}</b><span>datos clave encontrados</span></div><div class="kpi${R.ruido > 2 ? " alerta" : ""}"><b>${R.ruido}/${R.nRuido}</b><span>datos de ruido que marcaste</span></div>
      <div class="kpi"><b>${R.ideas}/${R.nIdeas}</b><span>ideas clave en tu resumen</span></div><div class="kpi"><b>${R.dec}/${R.nDec}</b><span>decisiones correctas</span></div></div>
    <p class="small" style="margin:0">${R.problema ? "✓ Identificaste el problema principal." : R.ancla ? `⚓ <b>Te anclaste en el distractor</b>: «${esc(E.problema.o[E.problema.ancla])}». Es el error más común en este caso: un dato llamativo que no explica el cuadro.` : "✗ El problema principal no era ese."}</p>
    ${R.ruido > 2 ? `<p class="xs" style="margin:0;color:var(--warn)">Marcaste varios datos que no cambian la conducta: en el examen, el ruido está para eso. Antes de usar un dato, pregúntate si cambia lo que vas a hacer.</p>` : ""}
    ${plegable("p3exp", `<span class="small">Ver el expediente y qué era señal y qué ruido</span>`, `<div class="stack" style="gap:6px">${E.datos.map(d => `<div class="small"><b>${d.s ? "✅ Señal" : "🔇 Ruido"}:</b> ${esc(d.t)} <span class="xs muted">· ${esc(d.por)}</span></div>`).join("")}</div><div class="stack expdoc" style="margin-top:8px">${expDocHTML(E)}</div>`)}
    <div class="row" style="gap:6px"><button class="btn primary" id="p3Fin">Volver al diagnóstico</button><button class="btn ghost sm" id="p3Otro">Probar otro caso</button></div></div>`;
  $("#p3Fin").onclick = () => { D.vista = null; save(); renderDiag(); };
  $("#p3Otro").onclick = () => { D.p3hist = (D.p3hist || []).concat([Object.assign({}, p3)]); D.p3 = {caso: null, paso: "elegir"}; save(); renderDiag(); };
}

// ---------- Resultado: tu perfil y tu plan ----------
const DIAG_HORAS = [4, 8, 15, 25, 32];   // horas por semana según la respuesta de la parte 2
function diagPerfil(){
  const p1 = S.diag && S.diag.p1; if (!p1 || !p1.hechos.length) return null;
  const ids = new Set(p1.ids.map(String)), primera = {};
  (S.resp || []).forEach(r => { if (ids.has(String(r.id)) && r.d >= p1.ini && !primera[r.id]) primera[r.id] = r; });
  const area = {}, tipo = {}, celda = {}, add = (o, k, ok) => { const x = o[k] || (o[k] = {n: 0, ok: 0}); x.n++; if (ok) x.ok++; };
  let n = 0, ok = 0, peligro = 0, fragil = 0;
  Object.values(primera).forEach(r => { const q = qById(r.id); if (!q) return; const k = qKind(q);
    add(area, q.specialty, r.ok); add(tipo, k, r.ok); add(celda, q.specialty + "|" + k, r.ok); n++; if (r.ok) ok++;
    if (r.c) { const c = clasifConfianza(r.ok, r.c).k; if (c === "peligro") peligro++; if (c === "fragil") fragil++; } });
  // Lo más débil primero (con al menos 2 casos para no sacar conclusiones de uno).
  const pct = x => x.ok / x.n;
  const areas = SPECS.filter(s => area[s]).sort((a, b) => pct(area[a]) - pct(area[b]));
  const tipos = Object.keys(tipo).filter(k => tipo[k].n >= 2).sort((a, b) => pct(tipo[a]) - pct(tipo[b]));
  const p2 = S.diag.p2 && S.diag.p2.resp || {}, horas = DIAG_HORAS[p2.horas] || 10;
  // Plan: las horas de la semana repartidas según la brecha de cada área (mínimo 10 % para no abandonar ninguna).
  const peso = s => Math.max(0.1, 1 - (area[s] ? pct(area[s]) : 0.5)), tot = SPECS.reduce((a, s) => a + peso(s), 0);
  const plan = SPECS.map(s => ({s, h: Math.max(0.5, Math.round(horas * peso(s) / tot * 2) / 2)})).sort((a, b) => b.h - a.h);
  return {n, ok, area, tipo, celda, areas, tipos, peligro, fragil, horas, plan, examen: p2.examen, control: p1.fin ? p1.fin + 35 * DAY : 0};
}
// El foco de hoy según el diagnóstico: el tipo de pregunta más débil en el área más débil.
function diagFocoHoy(){
  const P = diagPerfil(); if (!P || !(S.diag.p1 && S.diag.p1.fin) || !P.areas.length) return null;
  const area = P.areas[0], tipo = P.tipos[0] || "conducta";
  const pool = QUESTIONS.filter(q => q.specialty === area && !S.hidden["q" + q.id]);
  const delTipo = pool.filter(q => qKind(q) === tipo);
  const orden = qs => qs.slice().sort((a, b) => (isDue("q" + a.id) ? -2 : !S.srs["q" + a.id] ? -1 : isFail(a) ? 0 : 1) - (isDue("q" + b.id) ? -2 : !S.srs["q" + b.id] ? -1 : isFail(b) ? 0 : 1));
  const qs = orden(delTipo).concat(orden(pool.filter(q => !delTipo.includes(q)))).slice(0, 10);
  return {area, tipo, qs};
}
function diagPerfilHTML(){
  const P = diagPerfil(); if (!P) return "";
  const D = S.diag, R2 = D.p2 && D.p2.fin ? diagP2Resultado() : null, R3 = D.p3 && D.p3.fin ? diagP3Resultado() : null;
  const color = x => !x ? "var(--subtle)" : x.ok / x.n >= 0.7 ? "var(--ok-soft)" : x.ok / x.n >= 0.5 ? "var(--warn-soft)" : "var(--bad-soft)";
  const pctT = x => x ? `${Math.round(x.ok / x.n * 100)} %` : "—";
  const tiposK = ["conducta", "diagnostico", "datos", "critica"];
  const mapa = `<table class="tabla mapa small"><tr><td></td>${tiposK.map(k => `<td class="xs" style="text-align:center">${esc(QMETODO[k].t)}</td>`).join("")}</tr>
    ${SPECS.map(s => `<tr><td class="xs">${esc(s)}</td>${tiposK.map(k => { const x = P.celda[s + "|" + k]; return `<td style="background:${color(x)};text-align:center">${x ? `${x.ok}/${x.n}` : "·"}</td>`; }).join("")}</tr>`).join("")}</table>`;
  const prox = P.control ? new Date(P.control).toLocaleDateString("es", {day: "numeric", month: "long"}) : "";
  return `<div class="card stack" id="diagPerfil"><h3 style="font-size:16px">📊 Tu perfil</h3>
    <p class="small" style="margin:0">${P.ok} de ${P.n} casos correctos (${Math.round(P.ok / P.n * 100)} %).${P.n < 30 ? " Con pocos casos el perfil orienta; se afina al terminar." : " Son 10 casos por área: tómalo como orientación, el control lo afina."}</p>
    ${P.areas.length ? `<p class="small" style="margin:0">Tu área más débil: <b>${esc(P.areas[0])}</b> (${pctT(P.area[P.areas[0]])})${P.tipos.length ? ` · tipo de pregunta: <b>${esc(QMETODO[P.tipos[0]].t)}</b> (${pctT(P.tipo[P.tipos[0]])})` : ""}.</p>` : ""}
    ${plegable("diagmapa", `<span class="small">Ver el mapa por área y tipo de pregunta</span>`, mapa + `<p class="xs muted" style="margin:6px 0 0">Verde ≥ 70 % · amarillo 50–69 % · rojo &lt; 50 % · gris: sin casos.</p>`)}
    ${P.peligro ? `<div class="note trap" style="margin:0"><b class="small">🚨 ${P.peligro} error${P.peligro === 1 ? "" : "es"} con seguridad</b><div class="xs" style="margin-top:2px">Respondiste convencido y estaba mal: son conceptos mal aprendidos. Ya están en tus repasos; corrígelos primero.</div></div>` : ""}
    ${R2 ? `<p class="small" style="margin:0">📋 Tus hábitos suman <b>${R2.pct} %</b> de lo recomendado.${R2.cambiar[0] ? ` Lo primero que conviene cambiar: ${esc(R2.cambiar[0].tip)}` : ""}</p>` : `<p class="xs muted" style="margin:0">📋 Haz la parte 2 para sumar tus hábitos al plan.</p>`}
    ${R3 ? `<p class="small" style="margin:0">🩺 Juicio clínico: encontraste ${R3.senal} de ${R3.nSenal} datos clave y marcaste ${R3.ruido} de ruido.${R3.ancla ? " Te anclaste en el distractor: practica preguntarte si cada dato cambia la conducta." : ""}</p>` : `<p class="xs muted" style="margin:0">🩺 Haz la parte 3 para medir cómo filtras y decides.</p>`}
    <h3 style="font-size:16px;margin-top:6px">🗓️ Tu plan semanal</h3>
    <p class="xs muted" style="margin:0">${P.horas} horas por semana${D.p2 && D.p2.resp && D.p2.resp.horas != null ? " (lo que dijiste en la parte 2)" : " (estimado: responde la parte 2 para ajustarlo)"}, repartidas según tu brecha.${P.examen === 0 ? " Tu examen es en menos de un mes: prioriza repasos y simulacros sobre temas nuevos." : ""}</p>
    ${P.plan.map(x => `<div class="row small" style="gap:8px"><span class="dot" style="background:${SPEC_COLOR[x.s]}"></span><span style="flex:1">${esc(x.s)}</span><b>${String(x.h).replace(".", ",")} h</b></div>`).join("")}
    <p class="xs muted" style="margin:0">Cada día, Hoy te propone el foco: tu tipo de pregunta más débil en tu área más débil.${prox ? ` Próximo control (25 casos): ${prox}.` : ""}</p></div>`;
}
