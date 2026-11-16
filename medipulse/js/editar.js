// ===================================================================
// EDITAR UN CASO: el usuario toma una pregunta del banco, una importada o una suya y crea SU versión
// (más difícil o a su estilo). El original no cambia: la versión editada se guarda aparte, marcada
// como «✏️ Editada por ti» y con la fuente del original. Para no arruinar una pregunta sin responder,
// se muestran primero las ya respondidas y se avisa antes de ver la respuesta de otra.
// Con IA (clave del usuario): «🤖 Hazla más difícil» y «🤖 Revisar mi versión».
// ===================================================================
let edQ = "", edSpec = "", edOrigen = "", edBase = null, edAviso = null, edMas = false;
const ED_IDEAS = [
  {k: "pista", t: "🙈 Quita el dato que delata la respuesta"},
  {k: "distractor", t: "🎭 Agrega un distractor plausible"},
  {k: "integrar", t: "🧩 Agrega un dato que obligue a integrar (laboratorio o imagen)"},
  {k: "contexto", t: "⏱️ Cambia el contexto: edad, comorbilidad o tiempo de evolución"},
  {k: "conducta", t: "🩺 Conviértela en pregunta de conducta"},
  {k: "cinco", t: "➕ Pasa a 5 opciones"}
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
  box.innerHTML = `<div class="stack">
    <div><b>✏️ Edita un caso: hazlo más difícil o a tu estilo</b><p class="xs muted" style="margin:4px 0 0">Elige una pregunta del banco, una importada o una tuya. Se guarda como <b>tu versión</b>; el original no cambia.</p></div>
    <input type="search" id="edQ" placeholder="Buscar: tema o palabra clave" aria-label="Buscar casos para editar">
    <div class="grid2"><label class="fld">Especialidad<select id="edSpec">${opt("", "Todas", !edSpec)}${SPECS.map(s => opt(s, s, edSpec === s)).join("")}</select></label>
      <label class="fld">Origen<select id="edOri">${opt("", "Todas", !edOrigen)}${opt("banco", "Del banco de MediPulse", edOrigen === "banco")}${opt("importada", "Importadas", edOrigen === "importada")}${opt("mia", "Creadas o editadas por ti", edOrigen === "mia")}</select></label></div>
    <div><b class="small">Ya respondidas (${resp.length})</b>${resp.length ? resp.slice(0, lim).map(q => fila(q, true)).join("") : `<p class="xs muted" style="margin:4px 0 0">Aún no has respondido casos con estos filtros. Lo ideal es editar los que ya respondiste: así no te arruinas la pregunta.</p>`}</div>
    ${sin.length ? `<details ${edAviso ? "open" : ""}><summary class="small" style="cursor:pointer"><b>Sin responder (${sin.length})</b> <span class="xs muted">· sin el tema, para no darte pistas</span></summary>${sin.slice(0, lim).map(q => fila(q, false)).join("")}</details>` : ""}
    ${!edMas && Math.max(resp.length, sin.length) > lim ? `<button class="btn ghost sm" id="edMas">Ver más</button>` : ""}
    <p class="xs muted" style="margin:0">¿Un caso que viste en tu rotación? <button class="linkbtn" id="edBlanco">✍️ Empieza en blanco</button></p></div>`;
  const q0 = $("#edQ"); q0.value = edQ;
  q0.oninput = () => { edQ = q0.value; clearTimeout(renderEditarCaso._t); renderEditarCaso._t = setTimeout(() => { renderEditarCaso(box); const n = $("#edQ"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 250); };
  $("#edSpec").onchange = e => { edSpec = e.target.value; renderEditarCaso(box); };
  $("#edOri").onchange = e => { edOrigen = e.target.value; renderEditarCaso(box); };
  $("#edMas") && ($("#edMas").onclick = () => { edMas = true; renderEditarCaso(box); });
  $("#edBlanco").onclick = () => { newType = "q"; renderNew(); };
  box.querySelectorAll("[data-ed]").forEach(b => b.onclick = () => {
    const q = qById(b.dataset.ed);
    if (!S.srs["q" + q.id]) { edAviso = edAviso === String(q.id) ? null : String(q.id); return renderEditarCaso(box); }
    editarCaso(q);
  });
  box.querySelectorAll("[data-edr]").forEach(b => b.onclick = () => { edAviso = null; estudiarCasos([qById(b.dataset.edr)], "Antes de editarlo"); });
  box.querySelectorAll("[data-edy]").forEach(b => b.onclick = () => editarCaso(qById(b.dataset.edy)));
}
// Abre el editor con un caso (desde Crear o desde la pregunta ya respondida).
function editarCaso(q){
  edAviso = null; newType = "e";
  edBase = {id: String(q.id), ideas: [], instr: "", cambios: null, revision: null, ia: false,
    v: {specialty: q.specialty, tipo: qKind(q), topic: q.topic || "", vignette: vigToText(q.vignette), options: q.options.slice(), correct: q.correct,
      whyCorrect: q.whyCorrect || "", pearl: q.pearl || "", trap: q.trap || "", porOpcion: Array.isArray(q.porOpcion) ? q.porOpcion.slice() : null}};
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
function renderEditor(box){
  const q = qById(edBase.id), v = edBase.v, clave = !!getKey();
  if (!q) { edBase = null; return renderEditarCaso(box); }
  const base = origenDe(q) === "banco" ? "un caso del banco de MediPulse" : q.externa ? "una pregunta importada" : "una pregunta tuya";
  box.innerHTML = `<div class="stack">
    <div class="row" style="gap:8px"><button class="btn ghost sm" id="edVolver">← Elegir otro caso</button></div>
    <div class="note" style="margin:0">Editando ${base}${q.topic ? `: <b>${esc(q.topic)}</b>` : ""}. Tu versión se guarda aparte; <b>el original queda igual</b>.</div>
    <div class="edideas"><b class="small">Ideas para hacerla más difícil</b>
      <div class="chips" style="margin-top:6px">${ED_IDEAS.filter(i => !(i.k === "conducta" && v.tipo === "conducta") && !(i.k === "cinco" && v.options.length >= 5)).map(i => `<button class="chip2${edBase.ideas.includes(i.k) ? " on" : ""}" data-idea="${i.k}">${esc(i.t)}</button>`).join("")}</div>
      <p class="xs muted" style="margin:6px 0 0">Úsalas como guía al editar a mano, o márcalas y pídeselas a la IA.</p>
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
    ${v.options.map((o, j) => `<div class="row" style="gap:6px;align-items:center;flex-wrap:nowrap"><input type="radio" name="edCor" value="${j}" ${j === v.correct ? "checked" : ""} aria-label="Correcta: ${"ABCDE"[j]}"><b>${"ABCDE"[j]}</b><textarea data-edo="${j}" rows="${Math.min(4, Math.max(1, Math.ceil(o.length / 30)))}" class="edopt">${esc(o)}</textarea>${v.options.length > 4 ? `<button class="xbtn" data-edx="${j}" aria-label="Quitar la opción ${"ABCDE"[j]}">✕</button>` : ""}</div>`).join("")}
    ${v.options.length < 5 ? `<button class="btn ghost sm" id="edAddE" style="align-self:flex-start">➕ Agregar opción E</button>` : ""}
    <label class="fld">Explicación<textarea id="edfWhy" rows="3">${esc(v.whyCorrect)}</textarea></label>
    <div class="grid2"><label class="fld">💎 Perla<textarea id="edfPearl" rows="2">${esc(v.pearl)}</textarea></label><label class="fld">⚠️ Trampa<textarea id="edfTrap" rows="2">${esc(v.trap)}</textarea></label></div>
    ${edBase.revision ? revisionHTML(edBase.revision) : ""}
    <label class="row check" style="gap:8px"><input type="checkbox" id="edOcultar"><span class="small">Ocultar el original en mis prácticas (lo restauras desde la lista de archivados)</span></label>
    <div class="row" style="gap:6px"><button class="btn primary" id="edSave">💾 Guardar mi versión</button>${clave ? `<button class="btn" id="edRev">🤖 Revisar mi versión</button>` : ""}<button class="btn ghost" id="edCancel">Cancelar</button></div>
    <p class="xs" style="margin:0;color:var(--bad)" id="edErr"></p></div>`;
  $("#edVolver").onclick = () => { edBase = null; renderEditarCaso(box); };
  $("#edCancel").onclick = () => { edBase = null; renderEditarCaso(box); };
  box.querySelectorAll("[data-idea]").forEach(b => b.onclick = () => { edLeer(box); const k = b.dataset.idea, i = edBase.ideas.indexOf(k); i >= 0 ? edBase.ideas.splice(i, 1) : edBase.ideas.push(k); renderEditor(box); });
  box.querySelectorAll("[data-edx]").forEach(b => b.onclick = () => { edLeer(box); const j = +b.dataset.edx; v.options.splice(j, 1); if (v.porOpcion) v.porOpcion.splice(j, 1);
    v.correct = v.correct === j ? 0 : v.correct > j ? v.correct - 1 : v.correct; renderEditor(box); });
  $("#edAddE") && ($("#edAddE").onclick = () => { edLeer(box); v.options.push(""); if (v.porOpcion) v.porOpcion.push(""); renderEditor(box); setTimeout(() => box.querySelector('[data-edo="4"]').focus(), 30); });
  $("#edIA").onclick = () => hacerMasDificil(box);
  $("#edRev") && ($("#edRev").onclick = () => revisarVersion(box));
  $("#edSave").onclick = () => guardarVersion(box);
}
function revisionHTML(r){
  const ic = {error: "🚨", ambigua: "⚖️", pista: "🙈", estilo: "✍️"};
  return `<div class="note ${r.veredicto === "bien" ? "" : "trap"}" style="margin:0"><b>🤖 Revisión de la IA: ${r.veredicto === "bien" ? "se ve bien" : "revisa esto"}</b>
    ${r.observaciones.length ? `<ul class="small" style="margin:4px 0 0;padding-left:18px">${r.observaciones.map(o => `<li>${ic[o.tipo] || "•"} ${esc(o.texto)}</li>`).join("")}</ul>` : ""}
    <p class="xs muted" style="margin:6px 0 0">La IA puede equivocarse: verifica en la fuente lo que marque como error.</p></div>`;
}
function guardarVersion(box){
  const v = edLeer(box), q = qById(edBase.id), err = qEditError(v) || (v.correct >= v.options.length ? "Marca cuál es la respuesta correcta." : "");
  if (err) { $("#edErr").textContent = err; return; }
  // El análisis por opción del original solo sirve si las opciones no cambiaron.
  const mismo = edBase.v.porOpcion && edBase.v.porOpcion.length === v.options.length && v.options.every((o, j) => q.options[j] === o) && v.correct === q.correct;
  const nueva = {id: "u" + (++S.seq), specialty: v.specialty, tipo: v.tipo, qtype: v.tipo === "critica" ? "critica" : v.tipo === "datos" ? "directa" : "caso",
    topic: v.topic || q.topic || "Caso editado", vignette: textToVig(v.vignette), options: v.options, correct: v.correct,
    whyCorrect: v.whyCorrect, pearl: v.pearl, trap: v.trap, porOpcion: edBase.ia || mismo ? (v.porOpcion || undefined) : undefined,
    src: q.src || null, page: q.page || 0, area: q.area, fuenteTxt: q.fuenteTxt, externa: q.externa || undefined,
    manual: true, editada: true, baseId: String(q.id), ia: edBase.ia || undefined, difficulty: "Editada"};
  S.userQ.push(nueva);
  if ($("#edOcultar").checked) S.hidden["q" + q.id] = Date.now();
  rebuild(); save(); refreshChips();
  edBase = null; toast("Tu versión quedó guardada ✓ Entra a tu banco y a tu repaso.");
  renderNew();
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
  const v = edLeer(box), bt = $("#edIA"), msg = $("#edIAMsg");
  if (qEditError(v)) { msg.innerHTML = `<span style="color:var(--bad)">${esc(qEditError(v))}</span>`; return; }
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
    edBase.cambios = (r.cambios || []).filter(Boolean).slice(0, 5); edBase.ia = true; edBase.revision = null;
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
