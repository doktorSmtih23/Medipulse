// ===================================================================
// REPORTES DE PREGUNTAS
// ===================================================================
const REP_REASONS = ["La guía cambió o el dato está desactualizado", "Punto de corte o dato numérico dudoso", "Dos opciones parecen correctas", "La respuesta marcada es incorrecta", "Error de redacción"];
function openReportForm(key, box){
  if (!box) return;
  if (box.innerHTML) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="repform stack">
    <label class="fld">Motivo<select class="repR">${REP_REASONS.map(r=>`<option>${r}</option>`).join("")}</select></label>
    <label class="fld">Detalle o referencia (opcional)<textarea class="repC" rows="2" placeholder="p. ej. la guía 2026 cambió el umbral a…"></textarea></label>
    <div class="row"><button class="btn primary sm repSend">Guardar reporte</button><button class="btn ghost sm repCancel">Cancelar</button></div></div>`;
  box.querySelector(".repSend").onclick = ()=>{
    S.reports.push({id: "r"+Date.now().toString(36), key, at: Date.now(), reason: box.querySelector(".repR").value, comment: box.querySelector(".repC").value.trim(), status: "open"});
    save();
    box.innerHTML = `<p class="xs" style="color:var(--ok);margin:6px 0 0">✓ Reporte guardado. Lo revisas en Fuentes → Reportes.</p>`;
  };
  box.querySelector(".repCancel").onclick = ()=>{ box.innerHTML = ""; };
}
const itemByKey = k => k[0]==="q" ? qById(k.slice(1)) : k[0]==="h" ? hyById(k.slice(1)) : cById(k.slice(1));
const itemLabel = (k, x) => !x ? "(ítem archivado o eliminado)" : k[0]==="q" ? "🩺 " + (x.topic || "Caso clínico") : k[0]==="h" ? "💎 " + x.title : "🃏 " + x.front;
function renderRepCard(){
  const open = S.reports.filter(r=>r.status==="open").length;
  $("#repCard").innerHTML = `<div class="row"><h3 style="font-size:16px">🚩 Reportes de preguntas</h3><div class="spacer"></div><button class="btn sm" data-go="rep">Ver</button></div>
    <p class="small muted" style="margin:6px 0 0">${S.reports.length ? `${open} abierto${open===1?"":"s"} de ${S.reports.length}.` : "Cuando una pregunta tenga un error o un dato viejo, repórtala desde la explicación con 🚩."}</p>`;
}
const REVIEW_SYSTEM_REPORT = `Eres un revisor de contenido médico para un banco de preguntas del examen de residencia. Un estudiante reportó un posible error en un ítem.
Verifica el reporte con la búsqueda web en fuentes oficiales y actuales (guías vigentes, revistas, PubMed). Si el reporte tiene razón, corrige el ítem; si no, mantenlo y explica en "reason" por qué sigue siendo correcto.

${REVIEW_RULES}`;
function renderRep(){
  const list = S.reports.slice().sort((a,b)=>(a.status==="open"?0:1)-(b.status==="open"?0:1) || b.at-a.at);
  const stTag = s => s==="open" ? `<span class="tag" style="color:var(--warn);background:var(--warn-soft)">Abierto</span>` : s==="fixed" ? `<span class="tag" style="color:var(--ok);background:var(--ok-soft)">Corregido</span>` : `<span class="tag">Resuelto</span>`;
  const fila = r=>{
    const x = itemByKey(r.key);
    return `<div class="srcitem"><div style="flex:1;min-width:0">
      <div class="small" style="word-break:break-word"><b>${esc(itemLabel(r.key, x))}</b></div>
      <div class="row xs muted" style="gap:6px;margin-top:4px">${stTag(r.status)}<span>${esc(r.reason)}</span><span>· ${fmtDate(r.at)}</span></div>
      ${r.comment ? `<div class="xs" style="margin-top:4px">“${esc(r.comment)}”</div>` : ""}
      <div class="row" style="gap:6px;margin-top:8px">
        ${x ? `<button class="btn sm" data-rv="${r.id}">Ver</button>` : ""}
        ${x && getKey() && r.status==="open" && r.key[0]!=="h" ? `<button class="btn primary sm" data-rai="${r.id}">Corregir con IA</button>` : ""}
        ${x && r.status==="open" ? `<button class="btn ghost sm" data-rarch="${r.id}">Archivar ítem</button>` : ""}
        <button class="btn ghost sm" data-rst="${r.id}">${r.status==="open" ? "Marcar resuelto" : "Reabrir"}</button>
        <button class="btn ghost sm" data-rdel="${r.id}" style="color:var(--bad)">Borrar</button>
      </div></div></div>`;
  };
  // Plegados por estado: abiertos y resueltos.
  const ab = list.filter(r=>r.status==="open"), ce = list.filter(r=>r.status!=="open");
  $("#repList").innerHTML = list.length ? (ab.length ? plegable("repab", `<b>Abiertos</b> <span class="xs muted">${ab.length}</span>`, ab.map(fila).join("")) : "")
    + (ce.length ? plegable("repce", `<b>Resueltos o archivados</b> <span class="xs muted">${ce.length}</span>`, ce.map(fila).join("")) : "")
    : `<p class="muted small" style="margin:0">No hay reportes todavía.</p>`;
  const R = id => S.reports.find(r=>r.id===id), L = $("#repList");
  L.querySelectorAll("[data-rv]").forEach(b=>b.onclick=()=>{ const r = R(b.dataset.rv); startSession({label:"Reporte", tag:"norm", stages:[{name:"Ítem reportado", items:[{t:r.key[0], id:r.key.slice(1)}]}]}); });
  L.querySelectorAll("[data-rst]").forEach(b=>b.onclick=()=>{ const r = R(b.dataset.rst); r.status = r.status==="open" ? "done" : "open"; save(); renderRep(); });
  L.querySelectorAll("[data-rdel]").forEach(b=>b.onclick=()=>{ S.reports = S.reports.filter(r=>r.id!==b.dataset.rdel); save(); renderRep(); });
  L.querySelectorAll("[data-rarch]").forEach(b=>b.onclick=()=>{ const r = R(b.dataset.rarch); S.hidden[r.key] = Date.now(); r.status = "done"; rebuild(); save(); refreshChips(); toast("Ítem archivado. Puedes restaurarlo en Fuentes → Vigencia."); renderRep(); });
  L.querySelectorAll("[data-rai]").forEach(b=>b.onclick=()=>{
    const r = R(b.dataset.rai), x = itemByKey(r.key), s = x.src ? srcInfo(x.src) : null;
    const ctx = `Reporte del estudiante: ${r.reason}.${r.comment ? `\nDetalle: ${r.comment}` : ""}${s ? `\nFuente citada por el ítem: ${s.t}${s.r ? " ("+s.r+")" : ""}.` : ""}`;
    runItemReview({items:[{t:r.key[0], key:r.key, x:Object.assign({}, x)}], ctx, system:REVIEW_SYSTEM_REPORT, web:true, mode:"report", where:"rep", srcId:x.src||null, repId:r.id});
  });
  renderItemReview();
}
