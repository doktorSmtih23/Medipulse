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
      D.p2 && D.p2.fin ? listo : "", `<button class="btn sm" data-go="diag2" disabled>Pronto</button>`)}
    ${parte(3, "Juicio clínico", "Un expediente real, con datos que importan y otros que distraen. Eliges el caso; filtras, resumes, priorizas y decides. Unos 25 minutos.",
      D.p3 && D.p3.fin ? listo : "", `<button class="btn sm" disabled>Pronto</button>`)}`;
  box.querySelectorAll("[data-dbl]").forEach(b => b.onclick = () => diagEmpezarBloque(+b.dataset.dbl));
  $("#diagPruebaOff") && ($("#diagPruebaOff").onclick = () => { setModoPrueba(false); toast("Modo de prueba apagado"); renderDiag(); });
}
