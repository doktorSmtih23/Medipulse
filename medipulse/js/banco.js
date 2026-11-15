// ===================================================================
// BANCO DE CASOS: filtros por especialidad, estado y tipo de pregunta, búsqueda, lista por tema
// (estudiar un caso o un tema) y los casos archivados para restaurarlos.
// ===================================================================
let qSpec = null, qSt = "all", qTipo = null, qQuery = "";
const isFail = q => { const r = S.srs["q"+q.id]; return !!r && (r.last !== undefined ? r.last === 0 : (r.b === 0 && r.n > r.ok)); };
// Estado de un caso para el usuario.
function qEstado(q){
  const r = S.srs["q"+q.id];
  if (!r) return {k: "new", t: "Nuevo"};
  if (isDue("q"+q.id)) return {k: "due", t: "Toca repasar"};
  if (isFail(q)) return {k: "fail", t: "Fallado"};
  return r.b >= 3 ? {k: "ok", t: "Dominado"} : {k: "rev", t: "En repaso"};
}
// El tema es lo que va antes de « · » (p. ej. «Neumología · NAC grave» → Neumología).
const qGrupo = q => String(q.topic || "Otros").split(" · ")[0];
const qSub = q => { const p = String(q.topic || "").split(" · "); return p.length > 1 ? p.slice(1).join(" · ") : (q.topic || "Caso clínico"); };
const srcCorta = q => { const s = srcInfo(q.src); return s ? (s.t.length > 60 ? s.t.slice(0, 60) + "…" : s.t) : ""; };
function qCoincide(q, txt){
  if (!txt) return true;
  const h = norm([q.topic, q.specialty, String(q.vignette).replace(/<[^>]+>/g, ""), srcCorta(q), (srcInfo(q.src) || {}).r || ""].join(" "));
  return txt.split(/\s+/).every(w => h.includes(w));
}
function estudiarCasos(qs, label){
  if (!qs.length) return toast("No hay casos con esos filtros.");
  startSession({label, tag: "norm", stages: [{name: label, items: qs.map(q => ({t: "q", id: q.id}))}]});
}
function renderBanco(){
  const st = specStats(), txt = norm(qQuery.trim());
  const porSpec = s => QUESTIONS.filter(q => !s || q.specialty === s).length;
  const filtros = (arr, sel, attr) => arr.map(([k, l, n]) => `<button class="btn${sel === k ? " on" : ""}" ${attr}="${k || ""}">${l}${n != null ? ` <span class="cnt">${n}</span>` : ""}</button>`).join("");
  $("#qFilters").innerHTML = filtros([[null, "Todas", porSpec(null)], ...SPECS.map(s => [s, s, porSpec(s)])], qSpec, "data-s");
  document.querySelectorAll("#qFilters button").forEach(b => b.onclick = () => { qSpec = b.dataset.s || null; renderBanco(); });
  const base = QUESTIONS.filter(q => (!qSpec || q.specialty === qSpec) && (!qTipo || qKind(q) === qTipo) && qCoincide(q, txt));
  const nFail = base.filter(isFail).length, nNew = base.filter(q => !S.srs["q"+q.id]).length, nDue = base.filter(q => isDue("q"+q.id)).length;
  const estados = [["all", "📚 Todas", base.length], ["new", "🆕 Sin responder", nNew], ["fail", "❌ Mis fallos", nFail]];
  if (nDue) estados.push(["due", "🔁 Para repasar", nDue]);
  if (qSt === "due" && !nDue) qSt = "all";
  $("#qStatus").innerHTML = filtros(estados, qSt, "data-qs");
  document.querySelectorAll("[data-qs]").forEach(b => b.onclick = () => { qSt = b.dataset.qs; renderBanco(); });
  const tipos = FOCUS.slice(1).map(f => [f.k, f.t, QUESTIONS.filter(q => (!qSpec || q.specialty === qSpec) && qKind(q) === f.k).length]);
  $("#qTipos").innerHTML = filtros([[null, "Todos los tipos", null], ...tipos], qTipo, "data-qt");
  document.querySelectorAll("[data-qt]").forEach(b => b.onclick = () => { qTipo = b.dataset.qt || null; renderBanco(); });
  const q0 = $("#qQuery"); if (q0 && document.activeElement !== q0) q0.value = qQuery;

  const pool = qSt === "fail" ? base.filter(isFail) : qSt === "new" ? base.filter(q => !S.srs["q"+q.id]) : qSt === "due" ? base.filter(q => isDue("q"+q.id)) : base;
  const seen = pool.filter(q => S.srs["q"+q.id]).length;
  const n = qSpec ? st[qSpec].n : SPECS.reduce((a, s) => a + st[s].n, 0), ok = qSpec ? st[qSpec].ok : SPECS.reduce((a, s) => a + st[s].ok, 0);
  const filtrado = !!(qTipo || txt || qSt !== "all");
  const titulo = [qSpec, qTipo && FOCUS.find(f => f.k === qTipo).t, txt && `«${qQuery.trim()}»`].filter(Boolean).join(" · ") || "Todas las especialidades";
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
  $("#pr10").onclick = () => startSession({label: qSpec || "Práctica mixta", tag: "norm", stages: [{name: titulo + (qSt === "fail" ? " · mis fallos" : qSt === "new" ? " · sin responder" : qSt === "due" ? " · para repasar" : ""),
    items: qSt === "all" && !qTipo && !txt ? pickQuestions(10, {spec: qSpec}) : shuffle(pool).slice(0, 10).map(q => ({t: "q", id: q.id}))}]});

  // Lista por tema
  const grupos = new Map();
  pool.forEach(q => { const g = qGrupo(q); if (!grupos.has(g)) grupos.set(g, []); grupos.get(g).push(q); });
  const orden = [...grupos.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  const abierto = filtrado || pool.length <= 12;
  $("#qList").innerHTML = pool.length ? `<h3 style="font-size:16px">Casos por tema <span class="xs muted">(${pool.length})</span></h3>` + orden.map(([g, qs]) => `
    <details class="qgrupo" ${abierto ? "open" : ""}><summary><b>${esc(g)}</b> <span class="xs muted">${qs.length} caso${qs.length === 1 ? "" : "s"}</span></summary>
      <div class="stack" style="gap:0;margin-top:6px">${qs.map(q => { const e = qEstado(q); return `<div class="qrow">
        <div style="flex:1;min-width:0"><div class="small">${esc(qSub(q))}</div>
          <div class="row xs muted" style="gap:6px;margin-top:3px"><span class="est ${e.k}">${e.t}</span>${tipoChip(q)}<span class="muted" style="overflow-wrap:anywhere">${esc(q.specialty)}${srcCorta(q) ? " · " + esc(srcCorta(q)) : ""}</span></div></div>
        <button class="btn sm" data-q1="${esc(String(q.id))}">Estudiar</button></div>`; }).join("")}
      ${qs.length > 1 ? `<button class="btn ghost sm" data-qg="${esc(g)}" style="margin-top:6px">Estudiar los ${qs.length} de ${esc(g)}</button>` : ""}</div></details>`).join("")
    : `<p class="muted small" style="margin:0">No hay casos con esos filtros.</p>`;
  $("#qList").insertAdjacentHTML("beforeend", hiddenListHTML("q"));
  document.querySelectorAll("[data-q1]").forEach(b => b.onclick = () => { const q = qById(b.dataset.q1); estudiarCasos([q], qSub(q)); });
  document.querySelectorAll("[data-qg]").forEach(b => b.onclick = () => estudiarCasos(shuffle(grupos.get(b.dataset.qg)), b.dataset.qg));
  bindHiddenList(renderBanco, "q");
}
$("#qQuery") && ($("#qQuery").oninput = () => { qQuery = $("#qQuery").value; clearTimeout(renderBanco._t); renderBanco._t = setTimeout(renderBanco, 250); });
