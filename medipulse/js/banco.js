// ===================================================================
// BANCO DE CASOS: buscador y 3 selectores (especialidad, tipo de pregunta, estado), lista por
// especialidad SIN tema ni fuente (mostrarlos antes de responder sería una pista: sesgo de anclaje),
// corregir la especialidad de un caso y los casos archivados para restaurarlos.
// ===================================================================
let qSpec = null, qSt = "all", qTipo = null, qQuery = "", qEspOpen = null;
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
function renderBanco(){
  const st = specStats(), txt = norm(qQuery.trim());
  const enSpec = q => !qSpec || q.specialty === qSpec, enTipo = q => !qTipo || qKind(q) === qTipo;
  const base = QUESTIONS.filter(q => enSpec(q) && enTipo(q) && qCoincide(q, txt));
  const nFail = base.filter(isFail).length, nNew = base.filter(q => !S.srs["q"+q.id]).length, nDue = base.filter(q => isDue("q"+q.id)).length;
  if (qSt === "due" && !nDue) qSt = "all";
  const cuenta = f => QUESTIONS.filter(q => f(q) && qCoincide(q, txt)).length;
  $("#qFiltros").innerHTML = `
    <label class="fld">Especialidad<select id="qSelSpec">${opt("", `Todas (${cuenta(q => enTipo(q))})`, !qSpec)}${SPECS.map(s => opt(s, `${s} (${cuenta(q => q.specialty === s && enTipo(q))})`, qSpec === s)).join("")}</select></label>
    <label class="fld">Tipo de pregunta<select id="qSelTipo">${opt("", "Todos los tipos", !qTipo)}${FOCUS.slice(1).map(f => opt(f.k, `${f.t} (${cuenta(q => enSpec(q) && qKind(q) === f.k)})`, qTipo === f.k)).join("")}</select></label>
    <label class="fld">Estado<select id="qSelSt">${opt("all", `Todos (${base.length})`, qSt === "all")}${opt("new", `Sin responder (${nNew})`, qSt === "new")}${opt("fail", `Mis fallos (${nFail})`, qSt === "fail")}${nDue ? opt("due", `Para repasar (${nDue})`, qSt === "due") : ""}</select></label>`;
  $("#qSelSpec").onchange = e => { qSpec = e.target.value || null; renderBanco(); };
  $("#qSelTipo").onchange = e => { qTipo = e.target.value || null; renderBanco(); };
  $("#qSelSt").onchange = e => { qSt = e.target.value; renderBanco(); };
  const q0 = $("#qQuery"); if (q0 && document.activeElement !== q0) q0.value = qQuery;

  const pool = qSt === "fail" ? base.filter(isFail) : qSt === "new" ? base.filter(q => !S.srs["q"+q.id]) : qSt === "due" ? base.filter(q => isDue("q"+q.id)) : base;
  const seen = pool.filter(q => S.srs["q"+q.id]).length;
  const n = qSpec ? st[qSpec].n : SPECS.reduce((a, s) => a + st[s].n, 0), ok = qSpec ? st[qSpec].ok : SPECS.reduce((a, s) => a + st[s].ok, 0);
  const filtrado = !!(qTipo || txt || qSt !== "all");
  const titulo = [qSpec, qTipo && FOCUS.find(f => f.k === qTipo).t].filter(Boolean).join(" · ") || "Práctica mixta";
  $("#qInfo").innerHTML = `<div class="grid3">
      <div class="kpi"><b>${pool.length}</b><span>casos</span></div>
      <div class="kpi"><b>${seen}</b><span>vistos</span></div>
      <div class="kpi"><b>${n ? Math.round(ok / n * 100) + "%" : "—"}</b><span>aciertos</span></div></div>
    <div class="stack" style="margin-top:14px">
      <button class="btn primary block" id="pr10" ${pool.length ? "" : "disabled"}>Practicar ${Math.min(10, pool.length)} casos</button>
      <button class="btn ghost block" data-go="new">➕ Crear pregunta o ficha high-yield</button>
    </div>`;
  // El banco incluido es una demostración: cuando se acaba, se dice y se sugiere qué hacer.
  if (base.length && !nNew && qSt !== "fail" && !filtrado) $("#qInfo").insertAdjacentHTML("beforeend", `<div class="note" style="margin-top:12px" id="qDone"><b>Ya respondiste los ${base.length} casos${qSpec ? ` de ${esc(qSpec)}` : ""}.</b> Lo incluido en MediPulse es una muestra del método; para seguir:
    <div class="row" style="margin-top:8px;gap:6px">${nFail ? `<button class="btn sm primary" data-qs2="fail">❌ Repasar mis fallos (${nFail})</button>` : ""}<button class="btn sm" data-go="lib">📚 Crear desde tus PDF</button><button class="btn sm" data-go="apuntes">📓 Desde tus apuntes</button></div></div>`);
  document.querySelectorAll("[data-qs2]").forEach(b => b.onclick = () => { qSt = b.dataset.qs2; renderBanco(); });
  $("#pr10").onclick = () => startSession({label: qSpec || "Práctica mixta", tag: "norm", stages: [{name: titulo,
    items: qSt === "all" && !qTipo && !txt ? pickQuestions(10, {spec: qSpec}) : shuffle(pool).slice(0, 10).map(q => ({t: "q", id: q.id}))}]});

  // Lista por especialidad: sin tema ni fuente, para no dar pistas antes de responder.
  const grupos = SPECS.map(s => [s, pool.filter(q => q.specialty === s)]).filter(([, qs]) => qs.length);
  const abierto = filtrado || !!qSpec;
  $("#qList").innerHTML = pool.length ? `<h3 style="font-size:16px">Casos por especialidad</h3>
    <p class="xs muted" style="margin:4px 0 6px">Sin el tema ni la fuente, para no darte pistas: los ves al responder. Si un caso quedó en la especialidad equivocada, corrígelo con 🏷️.</p>` + grupos.map(([s, qs]) => `
    <details class="qgrupo" ${abierto ? "open" : ""}><summary><span class="dot" style="background:${SPEC_COLOR[s]}"></span> <b>${esc(s)}</b> <span class="xs muted">${qs.length}</span></summary>
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
