// ===================================================================
// EDITAR UN CASO: el usuario toma una pregunta del banco, una importada o una suya y crea SU versión
// (más difícil o a su estilo). El original no cambia: la versión editada se guarda aparte, marcada
// como «✏️ Editada por ti» y con la fuente del original. Para no arruinar una pregunta sin responder,
// se muestran primero las ya respondidas y se avisa antes de ver la respuesta de otra.
// Con IA (clave del usuario): «🤖 Hazla más difícil» y «🤖 Revisar mi versión».
// ===================================================================
let edQ = "", edSpec = "", edOrigen = "", edBase = null, edAviso = null, edMas = false, edGuardada = null;
// Cada idea dice qué cambiar y dónde (para editar a mano) y sirve de instrucción para la IA.
const ED_IDEAS = [
  {k: "pista", t: "🙈 Quita el dato que delata la respuesta", campo: "#edfVig", guia: "En el caso, busca el dato más específico, el que solo encaja con la respuesta, y quítalo o cámbialo por uno menos obvio. Los que están entre [[ ]] son los que hoy se resaltan como pistas."},
  {k: "distractor", t: "🎭 Agrega un distractor plausible", campo: "[data-edo]", guia: "Cambia la opción incorrecta más fácil de descartar por una que también encaje con parte del caso, pero no con todo."},
  {k: "integrar", t: "🧩 Agrega un dato que obligue a integrar (laboratorio o imagen)", campo: "#edfVig", guia: "Agrega al caso un resultado de laboratorio o de imagen que haya que interpretar para llegar a la respuesta, en vez de darla hecha."},
  {k: "contexto", t: "⏱️ Cambia el contexto: edad, comorbilidad o tiempo de evolución", campo: "#edfVig", guia: "Cambia la edad, una comorbilidad o el tiempo de evolución de forma que la respuesta siga siendo la misma, pero haya que pensarlo."},
  {k: "conducta", t: "🩺 Conviértela en pregunta de conducta", campo: "#edfVig", guia: "Ya cambié el tipo a Conducta. Ahora cambia la pregunta final por «¿Cuál es la conducta más adecuada?» y ajusta las opciones para que sean acciones."},
  {k: "cinco", t: "➕ Pasa a 5 opciones", campo: '[data-edo="4"]', guia: "Ya agregué la opción E. Escríbela: otro distractor plausible."}
];
const origenDe = q => q.editada ? "mia" : q.externa ? "importada" : S.userQ.includes(q) ? "mia" : "banco";

// ---------- elegir el caso ----------
function renderEditarCaso(box){
  if (edBase) return renderEditor(box);
  const txt = norm(edQ.trim());
  const pool = QUESTIONS.filter(q => (!edSpec || q.specialty === edSpec) && (!edOrigen || origenDe(q) === edOrigen) && qCoincide(q, txt));
  const resp = pool.filter(q => S.srs["q" + q.id]), sin = pool.filter(q => !S.srs["q" + q.id]);
  const opt = (v, l, on) => `<option value="${esc(v)}" ${on ? "selected" : ""}>${esc(l)}</option>`;
  const fila = (q, visto) => { const id = esc(String(q.id));
    return `<div class="qrow"><div style="flex:1;min-width:0"><b class="small" style="overflow-wrap:anywhere">${visto ? esc(q.topic || "Caso clínico") : "Caso sin responder"}</b>
      <div class="row xs" style="gap:6px;margin-top:2px"><span class="muted">${esc(q.specialty)}</span>${tipoChip(q)}${origenChip(q)}</div>
      ${visto ? "" : `<div class="xs muted" style="margin-top:2px">${esc(String(q.vignette).replace(/<[^>]+>/g, "").slice(0, 70))}…</div>`}</div>
      <button class="btn sm" data-ed="${id}">✏️ Editar</button></div>
      ${edAviso === String(q.id) ? `<div class="note" style="margin:6px 0">Al editarlo vas a ver la respuesta, y ya no te servirá para practicar. ¿Lo respondes primero?
        <div class="row" style="gap:6px;margin-top:8px"><button class="btn sm primary" data-edr="${id}">Responderlo primero</button><button class="btn sm ghost" data-edy="${id}">Editar igual</button></div></div>` : ""}`; };
  const lim = edMas ? 200 : 25;
  const guardada = edGuardada && qById(edGuardada);
  box.innerHTML = `<div class="stack">
    ${guardada ? `<div class="note" style="margin:0;border-left-color:var(--ok)"><b>✓ Tu versión quedó guardada</b> («${esc(guardada.topic || "Caso editado")}»). Ya está en tu banco y en tu repaso.
      <div class="row" style="gap:6px;margin-top:8px"><button class="btn sm primary" id="edEstudiar">▶ Estudiarla ahora</button><button class="btn sm ghost" id="edOk">Editar otro caso</button></div></div>` : ""}
    <div><b>✏️ Edita un caso: hazlo más difícil o a tu estilo</b><p class="xs muted" style="margin:4px 0 0">Elige una pregunta del banco, una importada o una tuya. Se guarda como <b>tu versión</b>; el original no cambia.</p></div>
    <input type="search" id="edQ" placeholder="Buscar: tema o palabra clave" aria-label="Buscar casos para editar">
    <div class="grid2"><label class="fld">Especialidad<select id="edSpec">${opt("", "Todas", !edSpec)}${SPECS.map(s => opt(s, s, edSpec === s)).join("")}</select></label>
      <label class="fld">Origen<select id="edOri">${opt("", "Todas", !edOrigen)}${opt("banco", "Del banco de MediPulse", edOrigen === "banco")}${opt("importada", "Importadas", edOrigen === "importada")}${opt("mia", "Creadas o editadas por ti", edOrigen === "mia")}</select></label></div>
    ${resp.length ? plegable("edresp", `<b class="small">Ya respondidas</b> <span class="xs muted">${resp.length}</span>`, resp.slice(0, lim).map(q => fila(q, true)).join("") + (!edMas && resp.length > lim ? `<button class="btn ghost sm" data-edmas>Ver más</button>` : "")) : `<p class="xs muted" style="margin:0">Aún no has respondido casos con estos filtros. Lo ideal es editar los que ya respondiste: así no te arruinas la pregunta.</p>`}
    ${sin.length ? (edAviso ? (PLEG.edsin = true, "") : "") + plegable("edsin", `<b class="small">Sin responder</b> <span class="xs muted">${sin.length} · sin el tema, para no darte pistas</span>`, sin.slice(0, lim).map(q => fila(q, false)).join("") + (!edMas && sin.length > lim ? `<button class="btn ghost sm" data-edmas>Ver más</button>` : "")) : ""}
    <p class="xs muted" style="margin:0">¿Un caso que viste en tu rotación? <button class="linkbtn" id="edBlanco">✍️ Empieza en blanco</button></p></div>`;
  const q0 = $("#edQ"); q0.value = edQ;
  q0.oninput = () => { edQ = q0.value; clearTimeout(renderEditarCaso._t); renderEditarCaso._t = setTimeout(() => { renderEditarCaso(box); const n = $("#edQ"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 250); };
  $("#edSpec").onchange = e => { edSpec = e.target.value; renderEditarCaso(box); };
  $("#edOri").onchange = e => { edOrigen = e.target.value; renderEditarCaso(box); };
  box.querySelectorAll("[data-edmas]").forEach(b => b.onclick = () => { edMas = true; renderEditarCaso(box); });
  $("#edBlanco").onclick = () => { newType = "q"; renderNew(); };
  $("#edEstudiar") && ($("#edEstudiar").onclick = () => { const q = qById(edGuardada); edGuardada = null; estudiarCasos([q], "Tu versión"); });
  $("#edOk") && ($("#edOk").onclick = () => { edGuardada = null; renderEditarCaso(box); });
  box.querySelectorAll("[data-ed]").forEach(b => b.onclick = () => {
    const q = qById(b.dataset.ed);
    if (!S.srs["q" + q.id]) { edAviso = edAviso === String(q.id) ? null : String(q.id); return renderEditarCaso(box); }
    editarCaso(q);
  });
  box.querySelectorAll("[data-edr]").forEach(b => b.onclick = () => { edAviso = null; estudiarCasos([qById(b.dataset.edr)], "Antes de editarlo"); });
  box.querySelectorAll("[data-edy]").forEach(b => b.onclick = () => editarCaso(qById(b.dataset.edy)));
}
const edVersionDe = q => ({specialty: q.specialty, tipo: qKind(q), topic: q.topic || "", vignette: vigToText(q.vignette), options: q.options.slice(), correct: q.correct,
  whyCorrect: q.whyCorrect || "", pearl: q.pearl || "", trap: q.trap || "", porOpcion: Array.isArray(q.porOpcion) ? q.porOpcion.slice() : null});
// Abre el editor con un caso (desde Crear o desde la pregunta ya respondida).
function editarCaso(q){
  edAviso = null; newType = "e";
  edBase = {id: String(q.id), ideas: [], instr: "", cambios: null, revision: null, ia: false,
    v: edVersionDe(q), orig: edVersionDe(q), confirmar: null};
  if (currentView !== "new") { newType = "e"; go("new"); } else renderNew();
}

// ---------- editor ----------
function edLeer(box){
  const v = edBase.v, val = s => (box.querySelector(s) || {}).value;
  v.specialty = val("#edfSpec"); v.tipo = val("#edfTipo"); v.topic = val("#edfTopic").trim(); v.vignette = val("#edfVig").trim();
  v.options = [...box.querySelectorAll("[data-edo]")].map(i => i.value.trim());
  const r = box.querySelector("input[name=edCor]:checked"); v.correct = r ? +r.value : 0;
  v.whyCorrect = val("#edfWhy").trim(); v.pearl = val("#edfPearl").trim(); v.trap = val("#edfTrap").trim();
  edBase.instr = val("#edInstr") || "";
  return v;
}
// Una opción del editor: marcar como correcta, la letra, el texto y quitarla (solo si hay más de 4).
function edOpcionHTML(o, j, v){
  const L = "ABCDE"[j], filas = Math.min(4, Math.max(1, Math.ceil(o.length / 30)));
  const quitar = v.options.length > 4 ? `<button class="xbtn" data-edx="${j}" aria-label="Quitar la opción ${L}">✕</button>` : "";
  return `<div class="row" style="gap:6px;align-items:center;flex-wrap:nowrap">`
    + `<input type="radio" name="edCor" value="${j}" ${j === v.correct ? "checked" : ""} aria-label="Correcta: ${L}"><b>${L}</b>`
    + `<textarea data-edo="${j}" rows="${filas}" class="edopt">${esc(o)}</textarea>${quitar}</div>`;
}
function renderEditor(box){
  const q = qById(edBase.id), v = edBase.v, clave = !!getKey();
  if (!q) { edBase = null; return renderEditarCaso(box); }
  const base = origenDe(q) === "banco" ? "un caso del banco de MediPulse" : q.externa ? "una pregunta importada" : "una pregunta tuya";
  box.innerHTML = `<div class="stack">
    <div class="row" style="gap:8px"><button class="btn ghost sm" id="edVolver">← Elegir otro caso</button></div>
    <div class="note" style="margin:0">Editando ${base}${q.topic ? `: <b>${esc(q.topic)}</b>` : ""}. Tu versión se guarda aparte; <b>el original queda igual</b>.</div>
    <div class="edideas"><b class="small">Ideas para hacerla más difícil</b>
      <div class="chips" style="margin-top:6px">${ED_IDEAS.filter(i => edBase.ideas.includes(i.k) || !(i.k === "conducta" && v.tipo === "conducta") && !(i.k === "cinco" && v.options.length >= 5)).map(i => `<button class="chip2${edBase.ideas.includes(i.k) ? " on" : ""}" data-idea="${i.k}">${esc(i.t)}</button>`).join("")}</div>
      <p class="xs muted" style="margin:6px 0 0">Marca una: te digo qué cambiar y dónde para hacerlo a mano, o pídesela a la IA.</p>
      ${ED_IDEAS.filter(i => edBase.ideas.includes(i.k)).map(i => `<div class="guia small"><b>${esc(i.t)}</b><div>${esc(i.guia)}</div><button class="linkbtn xs" data-ir="${i.k}">Ir al campo →</button></div>`).join("")}
      <div class="aibox stack" style="margin-top:8px">
        <label class="fld">Instrucciones para la IA (opcional)<textarea id="edInstr" rows="2" placeholder="p. ej. «que el paciente tenga insuficiencia renal», «que parezca TEP pero sea otra cosa»">${esc(edBase.instr)}</textarea></label>
        <button class="btn primary block" id="edIA" ${clave ? "" : "disabled"}>🤖 Hazla más difícil</button>
        ${clave ? `<p class="xs muted" style="margin:0">La IA reescribe el caso con la misma respuesta correcta. Revisa lo que cambie antes de guardar.</p>` : `<p class="xs muted" style="margin:0">Requiere tu clave de API de Claude. <button class="linkbtn" data-go="guide">Cómo conseguirla</button></p>`}
        <div id="edIAMsg" class="small"></div>
      </div>
      ${edBase.cambios ? `<div class="note pearl" style="margin-top:8px"><b>🤖 Lo que cambió la IA:</b><ul class="small" style="margin:4px 0 0;padding-left:18px">${edBase.cambios.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>` : ""}</div>
    <div class="grid2">${specSelHTML('id="edfSpec"', v.specialty)}
      <label class="fld">Tipo de pregunta<select id="edfTipo">${FOCUS.slice(1).map(f => `<option value="${f.k}" ${v.tipo === f.k ? "selected" : ""}>${esc(f.t)}</option>`).join("")}</select></label></div>
    <label class="fld">Tema<input type="text" id="edfTopic" value="${esc(v.topic)}"></label>
    <label class="fld">Caso<textarea id="edfVig" rows="6">${esc(v.vignette)}</textarea></label>
    <span class="xs muted">Marca la correcta. Entre [[dobles corchetes]] van los datos clave (se resaltan como pistas).</span>
    ${v.options.map((o, j) => edOpcionHTML(o, j, v)).join("")}
    ${v.options.length < 5 ? `<button class="btn ghost sm" id="edAddE" style="align-self:flex-start">➕ Agregar opción E</button>` : ""}
    <label class="fld">Explicación<textarea id="edfWhy" rows="3">${esc(v.whyCorrect)}</textarea></label>
    <div class="grid2"><label class="fld">💎 Perla<textarea id="edfPearl" rows="2">${esc(v.pearl)}</textarea></label><label class="fld">⚠️ Trampa<textarea id="edfTrap" rows="2">${esc(v.trap)}</textarea></label></div>
    ${edBase.revision ? revisionHTML(edBase.revision) : ""}
    ${edBase.confirmar ? confirmarHTML(edBase.confirmar) : `
    <div class="row" style="gap:6px"><button class="btn primary" id="edSave">Ver mis cambios y guardar →</button><button class="btn" id="edProbar">▶ Probar mi versión</button>${clave ? `<button class="btn" id="edRev">🤖 Revisar mi versión</button>` : ""}<button class="btn ghost" id="edCancel">Cancelar</button></div>`}
    <p class="small" style="margin:0;color:var(--bad)" id="edErr" role="alert"></p></div>`;
  $("#edVolver").onclick = () => { edBase = null; renderEditarCaso(box); };
  $("#edCancel") && ($("#edCancel").onclick = () => { edBase = null; renderEditarCaso(box); });
  box.querySelectorAll("[data-idea]").forEach(b => b.onclick = () => { edLeer(box); const k = b.dataset.idea, i = edBase.ideas.indexOf(k);
    if (i >= 0) edBase.ideas.splice(i, 1);
    else { edBase.ideas.push(k);
      // Las ideas que se pueden aplicar solas se aplican; el resto queda como guía.
      if (k === "conducta") v.tipo = "conducta";
      if (k === "cinco" && v.options.length < 5) { v.options.push(""); if (v.porOpcion) v.porOpcion.push(""); } }
    edBase.confirmar = null; renderEditor(box);
    if (i < 0) setTimeout(() => irCampo(box, k), 30); });
  box.querySelectorAll("[data-ir]").forEach(b => b.onclick = () => irCampo(box, b.dataset.ir));
  box.querySelectorAll("[data-edx]").forEach(b => b.onclick = () => { edLeer(box); const j = +b.dataset.edx; v.options.splice(j, 1); if (v.porOpcion) v.porOpcion.splice(j, 1);
    v.correct = v.correct === j ? 0 : v.correct > j ? v.correct - 1 : v.correct; renderEditor(box); });
  $("#edAddE") && ($("#edAddE").onclick = () => { edLeer(box); v.options.push(""); if (v.porOpcion) v.porOpcion.push(""); renderEditor(box); setTimeout(() => box.querySelector('[data-edo="4"]').focus(), 30); });
  $("#edIA").onclick = () => hacerMasDificil(box);
  $("#edRev") && ($("#edRev").onclick = () => revisarVersion(box));
  $("#edSave") && ($("#edSave").onclick = () => revisarCambios(box));
  $("#edProbar") && ($("#edProbar").onclick = () => probarVersion(box));
  bindConfirmar(box);
}
function irCampo(box, k){
  const i = ED_IDEAS.find(x => x.k === k); if (!i) return;
  let el = box.querySelector(i.campo);
  if (k === "distractor") { const c = edBase.v.correct; el = [...box.querySelectorAll("[data-edo]")].find(x => +x.dataset.edo !== c) || el; }
  if (el) { el.scrollIntoView({block: "center", behavior: "smooth"}); el.focus({preventScroll: true}); el.classList.add("resaltar"); setTimeout(() => el.classList.remove("resaltar"), 1600); }
}

// ---------- cambios: comparar con el original y aceptar uno por uno ----------
const ED_CAMPOS = [["specialty", "Especialidad"], ["tipo", "Tipo de pregunta"], ["topic", "Tema"], ["vignette", "Caso"], ["opciones", "Opciones y respuesta correcta"],
  ["whyCorrect", "Explicación"], ["pearl", "💎 Perla"], ["trap", "⚠️ Trampa"]];
const edTexto = (v, k) => k === "opciones" ? v.options.map((o, j) => `${"ABCDE"[j]}) ${o}${j === v.correct ? " ✓" : ""}`).join("\n")
  : k === "tipo" ? (QMETODO[v.tipo] ? QMETODO[v.tipo].t : v.tipo) : String(v[k] || "").trim();
function edCambios(orig, v){
  return ED_CAMPOS.map(([k, label]) => ({k, label, antes: edTexto(orig, k), despues: edTexto(v, k), ok: true})).filter(c => c.antes !== c.despues);
}
// Diferencia palabra por palabra (lo quitado tachado, lo nuevo resaltado).
function difPalabras(a, b){
  const A = a.split(/(\s+)/), B = b.split(/(\s+)/);
  if (A.length * B.length > 250000) return `<del>${esc(a)}</del> <ins>${esc(b)}</ins>`;
  const L = Array.from({length: A.length + 1}, () => new Uint16Array(B.length + 1));
  for (let i = A.length - 1; i >= 0; i--) for (let j = B.length - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0, out = "";
  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) { out += esc(A[i]); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) { out += `<del>${esc(A[i])}</del>`; i++; }
    else { out += `<ins>${esc(B[j])}</ins>`; j++; }
  }
  while (i < A.length) out += `<del>${esc(A[i++])}</del>`;
  while (j < B.length) out += `<ins>${esc(B[j++])}</ins>`;
  return out.replace(/<\/del><del>/g, "").replace(/<\/ins><ins>/g, "");
}
// Si casi todo cambió, «Antes» y «Ahora» por separado se leen mejor que mezclados palabra por palabra.
function difLegible(a, b){
  const pa = a.split(/\s+/).filter(Boolean), pb = new Set(b.split(/\s+/).filter(Boolean));
  const comunes = pa.filter(w => pb.has(w)).length / Math.max(1, Math.max(pa.length, pb.size));
  if (!a) return `<ins>${esc(b)}</ins>`;
  if (!b) return `<del>${esc(a)}</del>`;
  return comunes < 0.5 ? `<div class="antes"><span class="xs muted">Antes</span><br><del>${esc(a)}</del></div><div><span class="xs muted">Ahora</span><br><ins>${esc(b)}</ins></div>` : difPalabras(a, b);
}
// Opciones: línea por línea; solo se marcan las que cambiaron.
function difOpciones(a, b){
  const A = a.split("\n"), B = b.split("\n");
  return Array.from({length: Math.max(A.length, B.length)}, (_, j) => A[j] === B[j] ? `<div>${esc(A[j])}</div>` : `<div class="opcambio">${difLegible(A[j] || "", B[j] || "")}</div>`).join("");
}
function confirmarHTML(cs){
  const n = cs.filter(c => c.ok).length;
  return `<div class="confirmar stack">
    <b>Revisa tus cambios (${cs.length})</b>
    <p class="xs muted" style="margin:0">Lo tachado se quita y lo resaltado es nuevo. Desmarca lo que no quieras conservar.</p>
    ${cs.map((c, j) => `<label class="cambio${c.ok ? "" : " no"}"><span class="row" style="gap:8px;flex-wrap:nowrap"><input type="checkbox" data-cok="${j}" ${c.ok ? "checked" : ""}><b class="small">${esc(c.label)}</b></span>
      <div class="dif small">${c.k === "opciones" ? difOpciones(c.antes, c.despues) : difLegible(c.antes, c.despues)}</div></label>`).join("")}
    <label class="row check" style="gap:8px"><input type="checkbox" id="edOcultar"><span class="small">Ocultar el original en mis prácticas (lo restauras desde la lista de archivados)</span></label>
    <div class="row" style="gap:6px"><button class="btn primary" id="edConfirm" ${n ? "" : "disabled"}>💾 Guardar mi versión (${n} cambio${n === 1 ? "" : "s"})</button><button class="btn" id="edProbar">▶ Probar</button><button class="btn ghost" id="edSeguir">← Seguir editando</button></div></div>`;
}
function bindConfirmar(box){
  if (!edBase.confirmar) return;
  box.querySelectorAll("[data-cok]").forEach(c => c.onchange = () => { edLeer(box); edBase.confirmar[+c.dataset.cok].ok = c.checked; const oc = $("#edOcultar").checked; renderEditor(box); $("#edOcultar").checked = oc; $("#edConfirm").scrollIntoView({block: "nearest"}); });
  $("#edSeguir").onclick = () => { edLeer(box); edBase.confirmar = null; renderEditor(box); };
  $("#edConfirm").onclick = () => {
    // Si editó algo después de ver los cambios, se le muestran de nuevo antes de guardar.
    const v = edLeer(box), cs = edCambios(edBase.orig, v), clave = x => x.map(c => c.k + "\u0001" + c.despues).join("\u0002");
    if (clave(cs) !== clave(edBase.confirmar)) {
      const ok = Object.fromEntries(edBase.confirmar.map(c => [c.k, c.ok])); cs.forEach(c => { if (c.k in ok) c.ok = ok[c.k]; });
      const oc = $("#edOcultar").checked; edBase.confirmar = cs.length ? cs : null; renderEditor(box); if ($("#edOcultar")) $("#edOcultar").checked = oc;
      $("#edErr").textContent = cs.length ? "Cambiaste algo después de revisar: mira los cambios de nuevo y guarda." : "Ya no hay cambios: tu versión sería igual al original.";
      return;
    }
    guardarVersion(box);
  };
}
function revisarCambios(box){
  const v = edLeer(box), err = qEditError(v) || (v.correct >= v.options.length ? "Marca cuál es la respuesta correcta." : "");
  if (err) { $("#edErr").textContent = err; return; }
  const cs = edCambios(edBase.orig, v);
  if (!cs.length) { $("#edErr").textContent = "No cambiaste nada: tu versión sería igual al original. Cambia el caso, las opciones o la explicación (las ideas de arriba te dicen qué y dónde)."; return; }
  edBase.confirmar = cs; renderEditor(box);
  box.querySelector(".confirmar").scrollIntoView({block: "start", behavior: "smooth"});
}
function revisionHTML(r){
  const ic = {error: "🚨", ambigua: "⚖️", pista: "🙈", estilo: "✍️"};
  return `<div class="note ${r.veredicto === "bien" ? "" : "trap"}" style="margin:0"><b>🤖 Revisión de la IA: ${r.veredicto === "bien" ? "se ve bien" : "revisa esto"}</b>
    ${r.observaciones.length ? `<ul class="small" style="margin:4px 0 0;padding-left:18px">${r.observaciones.map(o => `<li>${ic[o.tipo] || "•"} ${esc(o.texto)}</li>`).join("")}</ul>` : ""}
    <p class="xs muted" style="margin:6px 0 0">La IA puede equivocarse: verifica en la fuente lo que marque como error.</p></div>`;
}
function guardarVersion(box){
  const q = qById(edBase.id), o = edBase.orig, v = edBase.v, acept = new Set(edBase.confirmar.filter(c => c.ok).map(c => c.k));
  if (!acept.size) { $("#edErr").textContent = "No aceptaste ningún cambio: tu versión sería igual al original."; return; }
  const f = k => acept.has(k) ? v[k] : o[k], op = acept.has("opciones");
  const fin = {specialty: f("specialty"), tipo: f("tipo"), topic: f("topic"), vignette: f("vignette"), options: op ? v.options : o.options, correct: op ? v.correct : o.correct,
    whyCorrect: f("whyCorrect"), pearl: f("pearl"), trap: f("trap")};
  const err = qEditError(fin); if (err) { $("#edErr").textContent = err; return; }
  if (!dupConfirmar(fin, "q", {excluir: [String(q.id), String(q.baseId || "")]})) return;
  // El análisis por opción vale si las opciones son las del original o si lo rehízo la IA para las nuevas.
  const porOpcion = !op ? o.porOpcion : edBase.ia && v.porOpcion && v.porOpcion.length === v.options.length ? v.porOpcion : null;
  const nueva = {id: nuevoIdPropio(), specialty: fin.specialty, tipo: fin.tipo, qtype: fin.tipo === "critica" ? "critica" : fin.tipo === "datos" ? "directa" : "caso",
    topic: fin.topic || q.topic || "Caso editado", vignette: textToVig(fin.vignette), options: fin.options, correct: fin.correct,
    whyCorrect: fin.whyCorrect, pearl: fin.pearl, trap: fin.trap, porOpcion: porOpcion || undefined,
    src: q.src || null, page: q.page || 0, area: q.area, fuenteTxt: q.fuenteTxt, externa: q.externa || undefined,
    manual: true, editada: true, baseId: String(q.id), cambios: [...acept], ia: edBase.ia || undefined, difficulty: "Editada"};
  agregarPropio("q", nueva);
  if ($("#edOcultar") && $("#edOcultar").checked) archivar("q" + q.id);
  rebuild(); save(); refreshChips();
  edBase = null; edGuardada = nueva.id; toast(`Tu versión quedó guardada con ${acept.size} cambio${acept.size === 1 ? "" : "s"} ✓`);
  renderNew();
}
// Probar la versión sin guardarla: se responde como en una práctica y se vuelve al editor.
function probarVersion(box){
  const v = edLeer(box), q = qById(edBase.id), err = qEditError(v) || (v.correct >= v.options.length ? "Marca cuál es la respuesta correcta." : "");
  if (err) { $("#edErr").textContent = err; return; }
  PRUEBA_Q = {id: "prueba", specialty: v.specialty, tipo: v.tipo, topic: v.topic || q.topic, vignette: textToVig(v.vignette), options: v.options.slice(), correct: v.correct,
    whyCorrect: v.whyCorrect, pearl: v.pearl, trap: v.trap, porOpcion: v.porOpcion && v.porOpcion.length === v.options.length ? v.porOpcion.slice() : undefined,
    src: q.src || null, page: q.page || 0, externa: q.externa || undefined, manual: true, editada: true, baseId: String(q.id), ia: edBase.ia || undefined};
  startSession({label: "Prueba", tag: "norm", prueba: true, stages: [{name: "Tu versión", items: [{t: "q", id: "prueba"}]}]});
}

// ---------- IA ----------
const T_DIFICIL = {name: "report_version", description: "Entrega la versión más difícil de la pregunta.", strict: true,
  input_schema: {type: "object", additionalProperties: false, required: ["vignette", "options", "correct", "whyCorrect", "pearl", "trap", "porOpcion", "cambios"], properties: {
    vignette: {type: "string"}, options: {type: "array", items: {type: "string"}}, correct: {type: "integer"},
    whyCorrect: {type: "string"}, pearl: {type: "string"}, trap: {type: "string"},
    porOpcion: {type: "array", items: {type: "string"}}, cambios: {type: "array", items: {type: "string"}}}}};
const T_REVISION = {name: "report_revision", description: "Entrega la revisión de la pregunta.", strict: true,
  input_schema: {type: "object", additionalProperties: false, required: ["veredicto", "observaciones"], properties: {
    veredicto: {type: "string", enum: ["bien", "revisar"]},
    observaciones: {type: "array", items: {type: "object", additionalProperties: false, required: ["tipo", "texto"], properties: {
      tipo: {type: "string", enum: ["error", "ambigua", "pista", "estilo"]}, texto: {type: "string"}}}}}}};
const preguntaTexto = v => `Tipo de pregunta: ${QMETODO[v.tipo] ? QMETODO[v.tipo].t : v.tipo}\nEspecialidad: ${v.specialty}\nTema: ${v.topic}\n\nCaso:\n${v.vignette}\n\nOpciones:\n${v.options.map((o, j) => `${"ABCDE"[j]}) ${o}`).join("\n")}\nCorrecta: ${"ABCDE"[v.correct]}\n\nExplicación: ${v.whyCorrect}\nPerla: ${v.pearl}\nTrampa: ${v.trap}`;
async function hacerMasDificil(box){
  // La opción E vacía (de «Pasa a 5 opciones») la escribe la IA: no cuenta como error.
  const v0 = edLeer(box), v = Object.assign({}, v0, {options: v0.options.filter(Boolean)}), bt = $("#edIA"), msg = $("#edIAMsg");
  if (qEditError(v) || v.correct >= v.options.length) { msg.innerHTML = `<span style="color:var(--bad)">${esc(qEditError(v) || "Marca cuál es la respuesta correcta.")}</span>`; return; }
  bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Reescribiendo…`;
  const ideas = ED_IDEAS.filter(i => edBase.ideas.includes(i.k)).map(i => i.t.replace(/^\S+\s/, ""));
  const n = edBase.ideas.includes("cinco") ? 5 : v.options.length;
  try {
    const r = await callForTool({system: `Eres un profesor que escribe preguntas para el examen de residencia médica. Recibes una pregunta y la reescribes más difícil, evaluando el mismo conocimiento.
Reglas:
- La respuesta correcta debe seguir siendo correcta según la explicación original. No cambies el concepto que se evalúa salvo que te pidan cambiar el tipo de pregunta.
- Una sola respuesta correcta y defendible; distractores plausibles, de longitud y estilo parecidos.
- No agregues datos clínicos que contradigan la explicación. Si agregas un dato (laboratorio, imagen, antecedente), que sea coherente y realista.
- Más difícil no es más largo: quita pistas obvias, exige integrar datos y discriminar entre opciones cercanas.
- Exactamente ${n} opciones; "correct" es el índice (0 a ${n - 1}) de la correcta. Reparte la posición de la correcta.
- Marca entre [[dobles corchetes]] los 2 a 4 datos clave del caso.
- "porOpcion": una frase por opción, en el mismo orden: por qué es correcta o por qué no.
- "cambios": de 2 a 5 frases cortas con lo que cambiaste y por qué la hace más difícil.
- Ajusta la explicación, la perla y la trampa a la nueva versión.
Español neutro, sin markdown.${focusLine()}`,
      tools: [T_DIFICIL], label: "Hacer más difícil",
      user: `${preguntaTexto(v)}\n\n${ideas.length ? `Cómo hacerla más difícil:\n- ${ideas.join("\n- ")}\n` : ""}${edBase.instr.trim() ? `Instrucciones del médico: ${edBase.instr.trim()}\n` : ""}`}, "report_version");
    const ops = (r.options || []).map(o => String(o).trim()).filter(Boolean);
    if (ops.length < 4 || ops.length > 5 || !(r.correct >= 0 && r.correct < ops.length) || !r.vignette) throw uerr("La IA no devolvió una pregunta válida. Inténtalo de nuevo.");
    Object.assign(edBase.v, {vignette: r.vignette.trim(), options: ops, correct: r.correct, whyCorrect: r.whyCorrect || v.whyCorrect, pearl: r.pearl || v.pearl, trap: r.trap || v.trap,
      porOpcion: Array.isArray(r.porOpcion) && r.porOpcion.length === ops.length ? r.porOpcion.map(String) : null});
    if (edBase.ideas.includes("conducta")) edBase.v.tipo = "conducta";
    edBase.cambios = (r.cambios || []).filter(Boolean).slice(0, 5); edBase.ia = true; edBase.revision = null; edBase.confirmar = null;
    renderEditor(box); toast("La IA reescribió el caso: revísalo antes de guardar.");
  } catch(e) { msg.innerHTML = `<span style="color:var(--bad)">${esc(e.userMsg || e.message)}</span>`; bt.disabled = false; bt.textContent = "🤖 Hazla más difícil"; }
}
async function revisarVersion(box){
  const v = edLeer(box), bt = $("#edRev");
  if (qEditError(v)) { $("#edErr").textContent = qEditError(v); return; }
  bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Revisando…`;
  try {
    const r = await callForTool({system: `Eres un revisor de preguntas del examen de residencia médica. Revisas una pregunta y señalas solo problemas reales:
- "error": un dato médico incorrecto o desactualizado, o una respuesta marcada como correcta que no lo es.
- "ambigua": más de una opción defendible, o ninguna correcta.
- "pista": algo del enunciado o de las opciones que delata la respuesta sin razonar (la opción más larga, una palabra repetida, un dato patognomónico innecesario).
- "estilo": redacción confusa, opciones heterogéneas o explicación que no coincide con la pregunta.
Si no hay problemas, "veredicto" es "bien" y la lista puede quedar vacía. Máximo 6 observaciones, cada una en una frase concreta que diga qué cambiar. Español neutro, sin markdown.`,
      tools: [T_REVISION], label: "Revisar pregunta", user: preguntaTexto(v)}, "report_revision");
    edBase.revision = {veredicto: r.veredicto === "bien" ? "bien" : "revisar", observaciones: (r.observaciones || []).filter(o => o && o.texto).slice(0, 6)};
    renderEditor(box);
  } catch(e) { toast(e.userMsg || e.message); bt.disabled = false; bt.textContent = "🤖 Revisar mi versión"; }
}
