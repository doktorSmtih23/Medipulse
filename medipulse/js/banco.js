// ===================================================================
// BANCO DE CASOS: «Arma tu práctica» (especialidades, cantidad de 1 a 100, al azar, mis
// vulnerabilidades o con filtros, y modo examen), «Tus vulnerabilidades» (vulnerabilidades.js) y
// «Explorar el banco»: búsqueda, tipo y estado, lista por especialidad SIN tema ni fuente (serían una
// pista: sesgo de anclaje), corregir la especialidad y los casos archivados para restaurarlos.
// ===================================================================
let qSt = "all", qTipo = null, qQuery = "", qEspOpen = null;
const isFail = q => { const r = S.srs["q"+q.id]; return !!r && (r.last !== undefined ? r.last === 0 : (r.b === 0 && r.n > r.ok)); };
// Estado de un caso para el usuario.
function qEstado(q){
  const r = S.srs["q"+q.id];
  if (!r) return {k: "new", t: "Nuevo"};
  if (isDue("q"+q.id)) return {k: "due", t: "Toca repasar"};
  if (isFail(q)) return {k: "fail", t: "Fallado"};
  return r.b >= 3 ? {k: "ok", t: "Dominado"} : {k: "rev", t: "En repaso"};
}
function qCoincide(q, txt){
  if (!txt) return true;
  const s = srcInfo(q.src) || {};
  const h = norm([q.topic, q.specialty, String(q.vignette).replace(/<[^>]+>/g, ""), s.t || "", s.r || ""].join(" "));
  return txt.split(/\s+/).every(w => h.includes(w));
}
function estudiarCasos(qs, label){
  if (!qs.length) return toast("No hay casos con esos filtros.");
  startSession({label, tag: "norm", stages: [{name: label, items: qs.map(q => ({t: "q", id: q.id}))}]});
}
// Cambiar la especialidad de un caso: lo propio directamente; lo incluido, como corrección en S.over.
function cambiarEspecialidad(q, spec){
  const propio = S.userQ.find(x => String(x.id) === String(q.id));
  if (propio) propio.specialty = spec;
  else S.over["q" + q.id] = Object.assign({}, S.over["q" + q.id], {specialty: spec, edited: Date.now()});
  rebuild(); save(); toast(`Ahora está en ${spec} ✓`);
}
const opt = (v, l, sel) => `<option value="${esc(v)}" ${sel ? "selected" : ""}>${esc(l)}</option>`;
// Cómo se eligen los casos de la práctica.
const MODOS_PRAC = [
  {k: "azar", t: "🎲 Al azar", d: "La app mezcla las especialidades y pone primero lo que no has visto y lo que toca repasar."},
  {k: "vuln", t: "🎯 Mis vulnerabilidades", d: "Lo que más te cuesta según tu rendimiento: tipo de pregunta, especialidad y casos que fallas."},
  {k: "filtros", t: "🔧 Con mis filtros", d: "Los casos del tipo, estado o búsqueda que elijas abajo, en «Explorar el banco»."}
];
const PRAC_MAX = 100;
const prac = () => S.prac || (S.prac = {specs: [], modo: "azar", n: 20, examen: false});
const specsSel = () => prac().specs.filter(s => SPECS.includes(s));
// Practicar: arma la sesión según el modo, la cantidad y si es en modo examen (un simulacro).
function empezarPractica(pool, n, modo, examen, rd){
  let qs;
  if (modo === "vuln") qs = elegirVulnerables(pool, n, rd);
  else if (modo === "azar") qs = elegirAlAzar(pool, n);
  else qs = shuffle(pool).slice(0, n);
  if (!qs.length) return toast("No hay casos con esa selección.");
  const sp = specsSel(), donde = sp.length && sp.length < SPECS.length ? sp.join(" · ") : "Todas las especialidades";
  const nombre = (modo === "vuln" ? "🎯 Mis vulnerabilidades" : modo === "azar" ? "🎲 Al azar" : "🔧 Con mis filtros") + " · " + donde;
  const items = qs.map(q => ({t: "q", id: q.id}));
  if (examen) startSession({label: "Simulacro", tag: "fire", stages: [{name: nombre, items, exam: true, limit: items.length * 72}]});
  else startSession({label: modo === "vuln" ? "Vulnerabilidades" : "Práctica", tag: "norm", stages: [{name: nombre, items}]});
}
function renderBanco(){
  const P = prac(), sp = specsSel(), txt = norm(qQuery.trim());
  const enSpec = q => !sp.length || sp.includes(q.specialty), enTipo = q => !qTipo || qKind(q) === qTipo;
  const enEst = q => qSt === "fail" ? isFail(q) : qSt === "new" ? !S.srs["q"+q.id] : qSt === "due" ? isDue("q"+q.id) : true;
  const base = QUESTIONS.filter(q => enSpec(q) && enTipo(q) && qCoincide(q, txt));
  const nFail = base.filter(isFail).length, nNew = base.filter(q => !S.srs["q"+q.id]).length, nDue = base.filter(q => isDue("q"+q.id)).length;
  if (qSt === "due" && !nDue) qSt = "all";
  const pool = base.filter(enEst);
  const deSpecs = QUESTIONS.filter(enSpec);
  const rd = rendimiento(sp);
  const fuente = P.modo === "filtros" ? pool : deSpecs;
  const max = Math.min(PRAC_MAX, fuente.length), n = Math.max(1, Math.min(P.n || 20, max));
  const seen = deSpecs.filter(q => S.srs["q"+q.id]).length;

  // ---- Arma tu práctica ----
  $("#qInfo").innerHTML = `<h3 style="font-size:16px">Arma tu práctica</h3>
    <div class="xs muted" style="margin:4px 0 6px">Especialidades (elige una o varias)</div>
    <div class="chips" id="qSpecs"><button class="chip2${sp.length ? "" : " on"}" data-sp="">Todas <span class="cnt">${QUESTIONS.length}</span></button>${SPECS.map(s => { const c = QUESTIONS.filter(q => q.specialty === s).length;
      return `<button class="chip2${sp.includes(s) ? " on" : ""}" data-sp="${esc(s)}" ${c ? "" : "disabled"}>${esc(s)} <span class="cnt">${c}</span></button>`; }).join("")}</div>
    <div class="xs muted" style="margin:12px 0 6px">Cómo elegir los casos</div>
    <div class="seg seg3" id="qModo">${MODOS_PRAC.map(m => `<button class="${P.modo === m.k ? "on" : ""}" data-modo="${m.k}"><b>${m.t}</b><span>${m.d}</span></button>`).join("")}</div>
    ${P.modo === "vuln" && !rd.suficiente ? `<p class="xs" style="margin:8px 0 0;color:var(--warn)">Aún hay pocos datos para saber qué te cuesta: por ahora se eligen al azar, con prioridad en lo que no has visto. Con 8 respuestas o más empieza a apuntar a tus fallos.</p>` : ""}
    <div class="row" style="margin-top:12px;gap:8px;align-items:flex-end">
      <label class="fld cantidad"><span>Cantidad de casos</span><input type="number" id="qN" min="1" max="${max}" value="${n}" inputmode="numeric"></label>
      <div class="chips" id="qNs">${[10, 20, 50, 100].filter(x => x < max).map(x => `<button class="chip2${n === x ? " on" : ""}" data-n="${x}">${x}</button>`).join("")}<button class="chip2${n === max ? " on" : ""}" data-n="${max}">${max === PRAC_MAX ? "100 (máximo)" : `Todos (${max})`}</button></div></div>
    <p class="xs muted" style="margin:4px 0 0">${fuente.length} caso${fuente.length === 1 ? "" : "s"} disponible${fuente.length === 1 ? "" : "s"} con esta selección · máximo ${PRAC_MAX} por práctica.</p>
    <label class="row check" style="margin-top:10px;gap:8px;align-items:flex-start"><input type="checkbox" id="qExam" ${P.examen ? "checked" : ""}><span class="small"><b>⏱️ Modo examen</b><br><span class="xs muted">Con tiempo (~72 s por caso) y sin explicaciones hasta el final. Al terminar, auditoría a ciegas: marcas si respondiste seguro, dudando o al azar antes de ver tu nota.${n >= 40 ? " Con " + n + " casos ya es un simulacro." : ""}</span></span></label>
    <button class="btn primary block" id="pr10" style="margin-top:12px" ${fuente.length ? "" : "disabled"}>${P.examen ? "⏱️ Empezar simulacro" : "Empezar"} · ${n} caso${n === 1 ? "" : "s"}${P.examen ? ` · ${fmt(n * 72)}` : ""}</button>
    <div class="grid3" style="margin-top:12px">
      <div class="kpi"><b>${deSpecs.length}</b><span>casos</span></div>
      <div class="kpi"><b>${seen}</b><span>vistos</span></div>
      <div class="kpi"><b>${rd.general.n ? Math.round(rd.general.ok / rd.general.n * 100) + "%" : "—"}</b><span>aciertos</span></div></div>
    <button class="btn ghost block" data-go="new" style="margin-top:10px">➕ Crear pregunta o ficha high-yield</button>`;
  // El banco incluido es una demostración: cuando se acaba, se dice y se sugiere qué hacer.
  const nNewSp = deSpecs.filter(q => !S.srs["q"+q.id]).length, nFailSp = deSpecs.filter(isFail).length;
  if (deSpecs.length && !nNewSp) $("#qInfo").insertAdjacentHTML("beforeend", `<div class="note" style="margin-top:12px" id="qDone"><b>Ya respondiste los ${deSpecs.length} casos${sp.length === 1 ? ` de ${esc(sp[0])}` : ""}.</b> Lo incluido en MediPulse es una muestra del método; para seguir:
    <div class="row" style="margin-top:8px;gap:6px">${nFailSp ? `<button class="btn sm primary" data-qs2="fail">❌ Repasar mis fallos (${nFailSp})</button>` : ""}<button class="btn sm" data-go="lib">📚 Crear desde tus PDF</button><button class="btn sm" data-go="apuntes">📓 Desde tus apuntes</button></div></div>`);
  document.querySelectorAll("[data-qs2]").forEach(b => b.onclick = () => estudiarCasos(shuffle(deSpecs.filter(isFail)).slice(0, PRAC_MAX), "Mis fallos"));
  document.querySelectorAll("#qSpecs [data-sp]").forEach(b => b.onclick = () => {
    const s = b.dataset.sp; P.specs = !s ? [] : sp.includes(s) ? sp.filter(x => x !== s) : [...sp, s];
    if (P.specs.length === SPECS.length) P.specs = [];
    save(); renderBanco(); });
  document.querySelectorAll("#qModo [data-modo]").forEach(b => b.onclick = () => { P.modo = b.dataset.modo; save(); renderBanco(); });
  document.querySelectorAll("#qNs [data-n]").forEach(b => b.onclick = () => { P.n = +b.dataset.n; save(); renderBanco(); });
  $("#qN").onchange = e => { P.n = Math.max(1, Math.min(PRAC_MAX, Math.round(+e.target.value) || 1)); save(); renderBanco(); };
  $("#qExam").onchange = e => { P.examen = e.target.checked; save(); renderBanco(); };
  $("#pr10").onclick = () => empezarPractica(fuente, n, P.modo === "vuln" && !rd.suficiente ? "azar" : P.modo, P.examen, rd);

  // ---- Tus vulnerabilidades ----
  $("#qVuln").innerHTML = vulnHTML(sp);
  $("#vulnGo") && ($("#vulnGo").onclick = () => empezarPractica(deSpecs, Math.min(n, deSpecs.length), "vuln", P.examen, rd));
  $("#vulnRep") && ($("#vulnRep").onclick = () => estudiarCasos(shuffle(rd.repetidos), "Fallos que se repiten"));

  // ---- Explorar el banco: tipo, estado, búsqueda y la lista ----
  const cuenta = f => deSpecs.filter(q => f(q) && qCoincide(q, txt)).length;
  $("#qFiltros").innerHTML = `
    <label class="fld">Tipo de pregunta<select id="qSelTipo">${opt("", "Todos los tipos", !qTipo)}${FOCUS.slice(1).map(f => opt(f.k, `${f.t} (${cuenta(q => qKind(q) === f.k)})`, qTipo === f.k)).join("")}</select></label>
    <label class="fld">Estado<select id="qSelSt">${opt("all", `Todos (${base.length})`, qSt === "all")}${opt("new", `Sin responder (${nNew})`, qSt === "new")}${opt("fail", `Mis fallos (${nFail})`, qSt === "fail")}${nDue ? opt("due", `Para repasar (${nDue})`, qSt === "due") : ""}</select></label>`;
  $("#qSelTipo").onchange = e => { qTipo = e.target.value || null; renderBanco(); };
  $("#qSelSt").onchange = e => { qSt = e.target.value; renderBanco(); };
  const q0 = $("#qQuery"); if (q0 && document.activeElement !== q0) q0.value = qQuery;
  const filtrado = !!(qTipo || txt || qSt !== "all");

  // Lista por especialidad: sin tema ni fuente, para no dar pistas antes de responder.
  const grupos = SPECS.map(s => [s, pool.filter(q => q.specialty === s)]).filter(([, qs]) => qs.length);
  const abierto = !!txt;   // plegadas salvo que se esté buscando
  $("#qList").innerHTML = pool.length ? `<p class="xs muted" style="margin:0 0 6px">Sin el tema ni la fuente, para no darte pistas: los ves al responder. Si un caso quedó en la especialidad equivocada, corrígelo con 🏷️.</p>` + grupos.map(([s, qs]) => `
    <details class="qgrupo" data-pleg="bq_${esc(s)}" ${abierto || PLEG["bq_" + s] ? "open" : ""}><summary><span class="dot" style="background:${SPEC_COLOR[s]}"></span> <b>${esc(s)}</b> <span class="xs muted">${qs.length}</span></summary>
      <div style="margin-top:4px">${qs.map((q, i) => { const e = qEstado(q), id = esc(String(q.id)); return `<div class="qrow">
        <div style="flex:1;min-width:0" class="row" ><b class="small">Caso ${i + 1}</b>${tipoChip(q)}${origenChip(q)}<span class="xs est ${e.k}">${e.t}</span></div>
        <button class="iconbtn" data-qe="${id}" aria-label="Cambiar la especialidad del caso ${i + 1}" title="Cambiar especialidad">🏷️</button>
        <button class="btn sm" data-q1="${id}">Estudiar</button></div>
        ${qEspOpen === String(q.id) ? `<div class="qesp row"><span class="xs">Mover a</span><select data-qesel="${id}">${SPECS.map(x => opt(x, x, x === q.specialty)).join("")}</select></div>` : ""}`; }).join("")}
      ${qs.length > 1 ? `<button class="btn ghost sm" data-qg="${esc(s)}" style="margin-top:6px">Estudiar los ${qs.length} de ${esc(s)}</button>` : ""}</div></details>`).join("")
    : `<p class="muted small" style="margin:0">No hay casos con esos filtros.</p>`;
  $("#qList").insertAdjacentHTML("beforeend", hiddenListHTML("q"));
  document.querySelectorAll("[data-q1]").forEach(b => b.onclick = () => estudiarCasos([qById(b.dataset.q1)], qById(b.dataset.q1).specialty));
  document.querySelectorAll("[data-qg]").forEach(b => b.onclick = () => estudiarCasos(shuffle(pool.filter(q => q.specialty === b.dataset.qg)), b.dataset.qg));
  document.querySelectorAll("[data-qe]").forEach(b => b.onclick = () => { qEspOpen = qEspOpen === b.dataset.qe ? null : b.dataset.qe; renderBanco(); });
  document.querySelectorAll("[data-qesel]").forEach(s => s.onchange = () => { cambiarEspecialidad(qById(s.dataset.qesel), s.value); qEspOpen = null; renderBanco(); });
  bindHiddenList(renderBanco, "q");
}
$("#qQuery") && ($("#qQuery").oninput = () => { qQuery = $("#qQuery").value; clearTimeout(renderBanco._t); renderBanco._t = setTimeout(renderBanco, 250); });
