// ===================================================================
// CREAR PREGUNTAS Y TARJETAS A MANO
// ===================================================================
let newType = "e";
function srcOptions(sel){
  return `<option value="">✍️ Elaboración propia (sin fuente publicada)</option><optgroup label="Tus fuentes">${S.sources.map(s=>`<option value="${s.id}" ${sel===s.id?"selected":""}>${esc(s.title)}</option>`).join("")}</optgroup>
    <optgroup label="Guías incluidas">${SOURCES.map(s=>`<option value="${s.id}" ${sel===s.id?"selected":""}>${esc(s.t.length>70?s.t.slice(0,70)+"…":s.t)}</option>`).join("")}</optgroup>`;
}
// ===================================================================
// FUENTES DE TEXTO PEGADO
// ===================================================================
function chunkText(txt, size){
  size = size || 3000;
  const paras = txt.replace(/\r/g,"").split(/\n\s*\n/), out = []; let cur = "";
  for (const p of paras) { if (cur && (cur.length + p.length + 2) > size) { out.push(cur); cur = p; } else cur = cur ? cur + "\n\n" + p : p; }
  if (cur) out.push(cur);
  return out.flatMap(c => c.length > size*1.5 ? c.match(new RegExp(`[\\s\\S]{1,${size}}`, "g")) : [c]);
}
function togglePaste(){
  const box = $("#pasteBox");
  if (box.innerHTML) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="stack" style="margin-top:4px">
    <label class="fld">Título<input type="text" id="pTitle" placeholder="p. ej. KDIGO 2024: lesión renal aguda"></label>
    <label class="fld">Texto de la guía, artículo o tus apuntes<textarea id="pText" rows="7" placeholder="Pega aquí el texto. También puedes pegar el código de un pack de estudio."></textarea></label>
    <div class="row"><button class="btn primary sm" id="pSave">Guardar como fuente</button><button class="btn ghost sm" id="pCancel">Cancelar</button></div></div>`;
  $("#pCancel").onclick = ()=>{ box.innerHTML = ""; };
  $("#pSave").onclick = async ()=>{
    const text = $("#pText").value.trim(), title = $("#pTitle").value.trim();
    if (!text) return toast("Pega un texto primero.");
    if (/^\{[\s\S]*"medipulse-pack"[\s\S]*\}$/.test(text)) { try { importPack(JSON.parse(text)); box.innerHTML = ""; } catch(e) { toast("El código del pack no es válido."); } return; }
    if (text.length < 200) return toast("El texto es muy corto para generar preguntas (mínimo ~200 caracteres).");
    const pages = chunkText(text), id = "t" + Date.now().toString(36) + Math.random().toString(36).slice(2,5), rec = {blob: null, pages};
    try { await idb.put(id, rec); } catch(e) { return toast("No se pudo guardar el texto en este dispositivo."); }
    recCache[id] = rec;
    agregarFuente({id, title: title || text.slice(0,50).replace(/\s+/g," ") + "…", pages: pages.length, chars: text.length, added: Date.now(), spec: "Medicina Interna", kind: "text"});
    save(); box.innerHTML = ""; toast("Texto guardado ✓"); openSrc(id);
  };
}

// ===================================================================
// PACKS DE ESTUDIO (JSON)
// ===================================================================
function downloadPack(pack){
  if (!pack.questions.length && !pack.cards.length) return toast("No hay ítems para exportar.");
  const txt = JSON.stringify(pack);
  const name = ("medipulse-pack-" + pack.title).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").slice(0,60).replace(/-$/,"") + ".json";
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], {type: "application/json"})); a.download = name; a.click();
  const msg = `Pack descargado: ${pack.questions.length} casos y ${(pack.fichas || []).length} fichas`;
  try { navigator.clipboard.writeText(txt).then(()=>toast(msg + " · también copiado ✓"), ()=>toast(msg + " ✓")); } catch(e) { toast(msg + " ✓"); }
}
function sanitizeVig(v){
  const decoded = String(v).replace(/[\u0001\u0002]/g, "")
    .replace(/<span class=['"]hy['"]>([\s\S]*?)<\/span>/gi, "\u0001$1\u0002").replace(/<[^>]*>/g, "")
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&");
  return esc(decoded).replace(/\u0001/g, "<span class='hy'>").replace(/\u0002/g, "</span>");
}
$("#packIn").onchange = e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  f.text().then(t=>{ try { importPack(JSON.parse(t)); } catch(err) { toast("El archivo no es un pack válido."); } }); };
$("#pasteBtn").onclick = togglePaste;
$("#diagBtn").onclick = () => go("diag");

function renderNew(){
  if (!["e", "q", "h", "g", "i"].includes(newType)) newType = "e";
  const MODOS = [
    ["e", "✏️ Editar un caso", "Hazlo más difícil o a tu estilo"],
    ["h", "💎 Ficha high-yield", "Datos clave, bandera roja y trampa"],
    ["g", "🤖 Generar desde tu PDF", "La IA de MediPulse crea casos y fichas"],
    ["i", "📥 Pegar de otra IA", "Gemini, ChatGPT u otro banco"]];
  const activo = k => newType === k || (k === "e" && newType === "q");   // «q» (caso en blanco) vive dentro de «Editar»
  $("#newSeg").innerHTML = MODOS.map(([k, t, d]) => `<button data-nt="${k}" class="${activo(k) ? "on" : ""}"><b>${t}</b><span>${d}</span></button>`).join("");
  document.querySelectorAll("[data-nt]").forEach(b=>b.onclick=()=>{ newType = b.dataset.nt; renderNew(); });
  if (newType === "i") { $("#newForm").classList.add("card"); renderImportar($("#newForm")); renderMine(); return; }
  if (newType === "e") { $("#newForm").classList.add("card"); renderEditarCaso($("#newForm")); renderMine(); return; }
  if (newType === "g") { $("#newForm").classList.add("card"); renderGenerarPdf($("#newForm")); renderMine(); return; }
  if (newType === "h") {
    hyEditor($("#newForm"), {showSrc: true, heading: "💎 Nueva ficha high-yield", flags: {manual: true}, onSave: ()=>renderNew(), onCancel: ()=>go("tarjetas")});
    $("#newForm").classList.remove("card"); renderMine(); return;
  }
  $("#newForm").classList.add("card");
  const specSel = `<label class="fld">Especialidad<select id="nSpec">${ESPS().map(s=>`<option>${s}</option>`).join("")}${ESP_NUEVA_OPT}</select></label>`;
  $("#newForm").innerHTML = `
    <div class="row" style="gap:8px"><button class="btn ghost sm" id="nVolver">← Editar un caso existente</button></div>
    <b>✍️ Caso en blanco</b>
    <div class="grid2">${specSel}<label class="fld">Tipo de pregunta<select id="nTipo">${FOCUS.slice(1).map(f=>`<option value="${f.k}">${esc(f.t)}</option>`).join("")}</select></label></div>
    <label class="fld">Tema<input type="text" id="nTopic" placeholder="p. ej. Nefrología · Hiponatremia"></label>
    <label class="fld">Caso clínico<textarea id="nVig" rows="4" placeholder="Mujer de 74 años con… Marca los datos clave entre [[dobles corchetes]] para que funcionen como pistas."></textarea></label>
    ${[0,1,2,3,4].map(i=>`<div class="optin"><input type="radio" name="nCor" value="${i}" ${i===0?"checked":""} aria-label="Opción ${"ABCDE"[i]} es la correcta"><input type="text" id="nOpt${i}" placeholder="Opción ${"ABCDE"[i]}${i===4?" (opcional)":""}"></div>`).join("")}
    <p class="xs muted" style="margin:0">Marca con el círculo la opción correcta. La E es opcional, para los exámenes de 5 opciones.</p>
    <p class="xs muted" style="margin:0">Si la pregunta es tuya y no viene de una fuente publicada, deja la fuente en «✍️ Elaboración propia»: se mostrará así y la responsabilidad del contenido es de quien la creó.</p>
    <label class="fld">Explicación<textarea id="nWhy" rows="2"></textarea></label>
    <div class="grid2"><label class="fld">💎 Perla<textarea id="nPearl" rows="2"></textarea></label><label class="fld">⚠️ Trampa<textarea id="nTrap" rows="2"></textarea></label></div>
    <div class="grid2"><label class="fld">Fuente<select id="nSrc">${srcOptions("")}</select></label><label class="fld">Página (opcional)<input type="number" id="nPage" min="1"></label></div>
    <button class="btn primary block" id="nSave">➕ Agregar al banco</button>`;
  $("#nSave").onclick = saveNew;
  $("#nVolver").onclick = () => { newType = "e"; renderNew(); };
  if (newPrefill) {
    $("#nWhy").value = newPrefill.why || ""; $("#nSrc").value = newPrefill.src || ""; $("#nPage").value = newPrefill.page || "";
    $("#nVig").placeholder = "Escribe el caso a partir de la frase que seleccionaste (ya está en la explicación). Marca los datos clave entre [[dobles corchetes]].";
    newPrefill = null; setTimeout(()=>$("#nVig").focus(), 50);
  }
  renderMine();
}
function saveNew(){
  const v = id => ($(id) ? $(id).value.trim() : ""), src = v("#nSrc") || null, page = parseInt(v("#nPage")) || 0;
  const opts = [0,1,2,3].map(i=>v("#nOpt"+i)).concat(v("#nOpt4") ? [v("#nOpt4")] : []), cor = +document.querySelector('input[name="nCor"]:checked').value;
  if (!v("#nVig") || opts.some(o=>!o)) return toast("Completa el caso y al menos las opciones A a D.");
  if (cor >= opts.length) return toast("Marcaste la opción E como correcta, pero está vacía.");
  if (new Set(opts).size !== opts.length) return toast("Hay dos opciones iguales.");
  const tipo = v("#nTipo");
  if (!dupConfirmar({topic: v("#nTopic"), vignette: v("#nVig"), options: opts, correct: cor}, "q")) return;
  agregarPropio("q", {id: nuevoIdPropio(), specialty: v("#nSpec"), tipo, qtype: tipo === "critica" ? "critica" : tipo === "datos" ? "directa" : "caso", topic: v("#nTopic") || "Caso propio", difficulty: "Propia",
    vignette: esc(v("#nVig")).replace(/\[\[([\s\S]+?)\]\]/g, "<span class='hy'>$1</span>"), options: opts, correct: cor,
    whyCorrect: v("#nWhy"), pearl: v("#nPearl"), trap: v("#nTrap"), src, page, manual: true});
  rebuild(); save(); toast("Agregado a tu banco ✓ Entra al repaso como nuevo."); renderNew();
}
function renderMine(){
  const qs = S.userQ.filter(q=>q.manual && !S.hidden["q"+q.id]), cs = S.userC.filter(c=>c.manual && !S.hidden["c"+c.id]), hs = S.userH.filter(h=>h.manual && !S.hidden["h"+h.id]);
  const all = [...qs.map(q=>({k:"q"+q.id, t:"🩺 "+q.topic, d: `${q.externa ? "📥 Importada · " : ""}${q.specialty} · ${QMETODO[qKind(q)].t}`})), ...hs.map(h=>({k:"h"+h.id, t:"💎 "+h.title, d: h.specialty})), ...cs.map(c=>({k:"c"+c.id, t:"🃏 "+c.front}))];
  // Una fila: el ítem, sus botones (corregir no aplica a los repasos rápidos) y el espacio donde se abre la corrección.
  const fila = x => {
    const texto = `<div class="small">${esc(x.t)}</div>` + (x.d ? `<div class="xs muted">${esc(x.d)}</div>` : "");
    const corregir = x.k[0] !== "c" ? `<button class="btn ghost sm" data-medit="${x.k}" aria-label="Corregir">✏️</button>` : "";
    const eliminar = `<button class="btn ghost sm" data-mdel="${x.k}" aria-label="Eliminar" style="color:var(--bad)">✕</button>`;
    return `<div><div class="srcitem"><div style="flex:1;min-width:0;word-break:break-word">${texto}</div>${corregir}${eliminar}</div><div data-mbox="${x.k}"></div></div>`;
  };
  const exportar = `<div class="row" style="margin:6px 0"><div class="spacer"></div><button class="btn sm" id="mineExp">📦 Exportar como pack</button></div>`;
  const titulo = `<b>Creadas por ti</b> <span class="xs muted">${all.length}</span>`;
  $("#mineList").innerHTML = all.length ? "\n    " + plegable("mias", titulo, exportar + all.map(fila).join(""))
    : `<p class="muted small" style="margin:0">Lo que crees aquí entra a tu repaso espaciado y lo puedes compartir como pack.</p>`;
  document.querySelectorAll("[data-mdel]").forEach(b=>b.onclick=()=>{ const k = b.dataset.mdel;
    quitarPropio(k); rebuild(); save(); renderMine(); });
  document.querySelectorAll("[data-medit]").forEach(b=>b.onclick=()=>{ const k = b.dataset.medit, id = k.slice(1);
    openCorregir(k[0], k[0]==="q" ? qById(id) : hyById(id), document.querySelector(`[data-mbox="${k}"]`), ()=>renderMine()); });
  $("#mineExp") && ($("#mineExp").onclick = ()=>downloadPack(makePack("Mis preguntas y fichas", qs, cs, {}, hs)));
}
// ---------- packs ----------
function makePack(title, qs, cs, meta, hs){
  hs = hs || [];
  return {format: "medipulse-pack", version: 2, title, org: meta.org || "", year: meta.year || "", created: todayKey(),
    questions: qs.map(q=>({qtype: q.qtype || "caso", specialty: q.specialty, topic: q.topic || "", vignette: q.vignette, options: q.options, correct: q.correct, whyCorrect: q.whyCorrect || "", pearl: q.pearl || "", trap: q.trap || "", page: q.page || 0})),
    fichas: hs.map(h=>({specialty: h.specialty, title: h.title, badge: h.badge || "", thresholds: h.thresholds, redFlag: h.redFlag || "", trap: h.trap || "", ctx: h.ctx || "", page: h.page || 0})),
    cards: cs.map(c=>({specialty: c.specialty, front: c.front, back: c.back, ctx: c.ctx || "", page: c.page || 0}))};
}
function exportSourcePack(id){
  const s = S.sources.find(x=>x.id===id), vis = (k,o)=>o.src===id && !S.hidden[k+o.id];
  downloadPack(makePack(s.title, S.userQ.filter(q=>vis("q",q)), S.userC.filter(c=>vis("c",c)), s, S.userH.filter(h=>vis("h",h))));
}
function importPack(p){
  const str = (x, max) => typeof x === "string" ? x.trim().slice(0, max) : "";
  if (!p || p.format !== "medipulse-pack" || (!Array.isArray(p.questions) && !Array.isArray(p.cards) && !Array.isArray(p.fichas))) return toast("Ese archivo no es un pack de MediPulse.");
  const spec = x => ESPS().includes(specCanon(x)) ? specCanon(x) : "Medicina Interna";
  const qs = (p.questions || []).slice(0, 1000).filter(q=>q && str(q.vignette,1) && Array.isArray(q.options) && (q.options.length===4 || q.options.length===5) && q.options.every(o=>str(o,1)) && Number.isInteger(q.correct) && q.correct>=0 && q.correct<q.options.length);
  const hs = (p.fichas || []).slice(0, 1000).filter(h=>h && str(h.title,1) && Array.isArray(h.thresholds) && h.thresholds.length && h.thresholds.length <= 10 && h.thresholds.every(t=>t && str(t.label,1) && str(t.val,1)));
  const cs = (p.cards || []).slice(0, 2000).filter(c=>c && str(c.front,1) && str(c.back,1));
  if (!qs.length && !cs.length && !hs.length) return toast("El pack no tiene ítems válidos.");
  const id = "k" + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
  agregarFuente({id, title: str(p.title, 120) || "Pack importado", org: str(p.org, 80), year: parseInt(p.year) || "", pages: 0, chars: 0, added: Date.now(), spec: "Medicina Interna", kind: "pack"});
  qs.forEach(q=>agregarPropio("q", {id: nuevoIdPropio(), qtype: ["caso","critica","directa"].includes(q.qtype) ? q.qtype : "caso", specialty: spec(q.specialty), topic: str(q.topic,200) || "Caso del pack", difficulty: "Pack", vignette: sanitizeVig(str(q.vignette,5000)),
    options: q.options.map(o=>str(o,600)), correct: q.correct, whyCorrect: str(q.whyCorrect,3000), pearl: str(q.pearl,1500), trap: str(q.trap,1500), src: id, page: parseInt(q.page) || 0, pack: true}));
  hs.forEach(h=>{ const sp = spec(h.specialty); agregarPropio("h", {id: nuevoIdPropio(), specialty: sp, title: str(h.title,200), badge: str(h.badge,60), accent: SPEC_COLOR[sp],
    thresholds: h.thresholds.map(t=>({label: str(t.label,200), val: str(t.val,400)})), redFlag: str(h.redFlag,1000), trap: str(h.trap,1000), ctx: str(h.ctx,1500), src: id, page: parseInt(h.page) || 0, pack: true}); });
  cs.forEach(c=>agregarPropio("c", {id: nuevoIdPropio(), specialty: spec(c.specialty), front: str(c.front,600), back: str(c.back,1500), ctx: str(c.ctx,1500), src: id, page: parseInt(c.page) || 0, pack: true}));
  rebuild(); save(); toast(`Pack importado: ${qs.length} casos, ${hs.length} fichas${cs.length ? ` y ${cs.length} repasos rápidos` : ""} ✓ No los revisó MediPulse: verifícalos.`); openSrc(id);
}

// ---------- ítems de una fuente ----------

// ---------- 🤖 Generar desde tu PDF: atajo al taller con IA de una fuente ----------
// Elige uno de tus documentos (o sube uno) y abre su taller con IA listo para crear casos y fichas.
// Desde Casos → Crear: abre el documento directamente en «🩺 Casos».
function generarDesde(id){ prepSrc(id, {tab: "ai", sub: "casos"}); go("src"); }
// Un documento en «Generar desde tu PDF»: icono por tipo, título, tamaño y el botón «Crear».
function docGenerarHTML(s, clave){
  const icono = s.apunte ? "📓" : s.kind === "text" ? "📋" : "📄";
  const tam = s.apunte ? `${s.pages} puntos` : s.kind === "text" ? "texto pegado" : `${s.pages} págs`;
  return `<div class="row docrow" style="gap:8px;flex-wrap:nowrap"><span>${icono}</span>`
    + `<div style="flex:1;min-width:0"><b class="small" style="overflow-wrap:anywhere">${esc(s.title)}</b><div class="xs muted">${tam}</div></div>`
    + `<button class="btn sm${clave ? " primary" : ""}" data-gen="${esc(s.id)}">Crear</button></div>`;
}
function renderGenerarPdf(box){
  const docs = S.sources.filter(s => s.kind !== "pack").slice().sort((a, b) => (b.added || 0) - (a.added || 0));
  const clave = !!getKey();
  box.innerHTML = `<div class="stack">
    <div><b>🤖 Casos y fichas con la IA de MediPulse</b><p class="xs muted" style="margin:4px 0 0">Elige el documento: la IA lee solo ese texto, crea casos tipo examen y fichas con la página de donde sale cada dato, y comprueba que las citas estén en el PDF. Tú revisas todo antes de guardar.</p></div>
    ${clave ? "" : `<div class="note"><b>Necesitas tu clave de API de Claude</b> (se paga aparte, unos centavos de dólar por documento). <div class="row" style="gap:6px;margin-top:8px"><button class="btn sm primary" data-go="guide">Cómo conseguirla</button><button class="btn sm" data-nt2="i">📥 Sin clave: usa tu propia IA</button></div></div>`}
    ${docs.length ? `<div class="stack" style="gap:6px">${docs.map(s => docGenerarHTML(s, clave)).join("")}</div>`
      : `<p class="small muted" style="margin:0">Aún no tienes documentos. Sube un PDF (una guía, una revisión, un capítulo) y la IA arma casos y fichas a partir de él.</p>`}
    <label class="btn${docs.length ? "" : " primary"} block center" style="display:block">➕ Subir un PDF nuevo<input type="file" id="genPdfIn" accept="application/pdf" hidden></label>
    <div id="genPdfProg" class="small muted"></div>
  </div>`;
  box.querySelectorAll("[data-gen]").forEach(b => b.onclick = () => generarDesde(b.dataset.gen));
  box.querySelectorAll("[data-nt2]").forEach(b => b.onclick = () => { newType = b.dataset.nt2; renderNew(); });
  $("#genPdfIn").onchange = async e => {
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    $("#genPdfProg").innerHTML = `<span class="spin"></span> Leyendo “${esc(f.name)}”…`;
    const id = await addPdf(f, false);
    $("#genPdfProg").innerHTML = "";
    if (id) generarDesde(id);
  };
}
