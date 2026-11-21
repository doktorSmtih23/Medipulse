// ===================================================================
// TALLER · REVISIÓN ANTES DE GUARDAR
// ===================================================================
// La revisión de lo propuesto (por la IA o sin ella) antes de guardarlo.
// ---------- Revisión antes de guardar ----------
// Vista previa de una ficha propuesta, tal como se verá en la app
const hyPrevHTML = c => `<div class="hyprev" style="border-top-color:${SPEC_COLOR[c.specialty]||"var(--accent)"}">
  <div class="row"><span class="tag">${esc(c.badge || "Ficha HY")}</span><span class="xs muted">${esc(c.specialty)}</span>${c.relevance ? `<div class="spacer"></div><span class="stars xs" title="Relevancia ${c.relevance} de 5">${"★".repeat(c.relevance)}${"☆".repeat(5-c.relevance)}</span>` : ""}</div>
  <h4 style="margin:6px 0 0;font-size:15.5px">${esc(c.title)}</h4>
  <div class="th">${c.thresholds.map(t=>`<div><span class="muted">${esc(t.label)}</span><b>${esc(t.val)}</b></div>`).join("")}</div>
  ${c.why ? `<div class="note pearl"><b>💡 Por qué es high-yield:</b> ${esc(c.why)}</div>` : ""}
  ${c.redFlag ? `<div class="note" style="border-color:var(--bad);margin-top:6px"><b>🚩</b> ${esc(c.redFlag)}</div>` : ""}
  ${c.trap ? `<div class="note trap" style="margin-top:6px"><b>⚠️ Trampa:</b> ${esc(c.trap)}</div>` : ""}</div>`;
const qtLabel = k => k==="critica" ? "🔬 Lectura crítica" : k==="directa" ? "❓ Pregunta directa" : "🩺 Caso";
function renderReview(){
  const box = $("#reviewBox");
  if (!cands) { box.innerHTML = ""; return; }
  if (!cands.length) { box.innerHTML = `<div class="card"><p class="small" style="margin:0">No encontré frases útiles${gen && gen.topic ? ` sobre “${esc(gen.topic)}”` : ""} en esas páginas. Prueba otro tema u otras páginas, o crea tus fichas en <b>📖 Leer</b>.</p></div>`; return; }
  // Repetidas: se comparan con el banco y con las anteriores de esta misma tanda (una sola vez).
  cands.forEach((c, i) => { if (c._dup !== undefined || c.kind === "c") return;
    const k = c.kind === "h" ? "h" : "q";
    c._dup = dupBuscar(c, k, {extra: cands.slice(0, i).filter(x => (x.kind === "h" ? "h" : "q") === k && x.on)}) || null;
    if (c._dup && c._dup.nivel === "repetida") c.on = false; });
  const on = cands.filter(c=>c.on).length, hasAI = cands.some(c=>c.kind==="q" || c.ai);
  box.innerHTML = `<div class="card">
    <div class="row"><h3 style="font-size:16px">Revisa antes de guardar</h3><div class="spacer"></div><span class="xs muted" id="candCount">${on}/${cands.length} seleccionadas</span></div>
    <p class="xs muted" style="margin:4px 0 6px">Desmarca lo que no sirva y corrige lo que quieras.${hasAI ? " La IA puede equivocarse: compara con la página indicada." : ""}</p>
    ${(n => n ? `<div class="note xs" style="margin:0 0 8px">🔁 <b>${n} ítem${n===1?"":"s"}</b> ${n===1?"parece repetido":"parecen repetidos"} de lo que ya tienes en el banco: ${n===1?"lo dejé desmarcado":"los dejé desmarcados"}.</div>` : "")(cands.filter(c => c._dup && c._dup.nivel === "repetida").length)}
    ${(n => n ? `<div class="note trap xs" style="margin:0 0 8px">⚠️ <b>${n} ítem${n===1?"":"s"}</b> con citas que no aparecen en el PDF: la IA pudo haber inventado o cambiado algo. Revísalos antes de guardar.</div>` : "")(cands.filter(c => (c.citas||[]).some(x => x.ok === false)).length)}
    <div id="candList">${cands.map((c,i)=> c.kind==="h" ? `
      <div class="cand ${c.on?"":"off"}" id="cand${i}"><input type="checkbox" data-ci="${i}" ${c.on?"checked":""} aria-label="Incluir">
        <div class="stack" style="min-width:0;gap:6px">
          <div class="xs muted">💎 Ficha high-yield · ${pagsTxt(c)}${c.area ? ` · Área: ${esc(c.area)}` : ""}</div>${dupAvisoHTML(c._dup, "h")}
          ${dupPliega(c, `${imgTag(c.img)}<div id="hp${i}">${hyPrevHTML(c)}</div>
          ${citasRevHTML(c)}${marcaHTML(c)}`)}
          <details class="custom"><summary>✏️ Editar esta ficha</summary><div class="stack" style="margin-top:10px;gap:6px">
          ${specSelHTML(`data-hf="${i}" data-k="specialty"`, c.specialty)}
          <label class="fld">Título<input type="text" data-hf="${i}" data-k="title" value="${esc(c.title)}"></label>
          ${c.thresholds.map((x,j)=>`<div class="erow two"><textarea rows="2" data-hr="${i}:${j}:label" aria-label="Qué es">${esc(x.label)}</textarea><textarea rows="2" data-hr="${i}:${j}:val" aria-label="Dato">${esc(x.val)}</textarea></div>`).join("")}
          <label class="fld">🚩 Bandera roja<textarea data-hf="${i}" data-k="redFlag" rows="2">${esc(c.redFlag)}</textarea></label>
          <label class="fld">⚠️ Trampa<textarea data-hf="${i}" data-k="trap" rows="2">${esc(c.trap)}</textarea></label></div></details>
        </div></div>` : c.kind==="c" ? `
      <div class="cand ${c.on?"":"off"}" id="cand${i}"><input type="checkbox" data-ci="${i}" ${c.on?"checked":""} aria-label="Incluir">
        <div class="stack" style="min-width:0">
          <label class="fld">Pregunta<textarea data-cf="${i}" data-k="front" rows="2">${esc(c.front)}</textarea></label>
          <label class="fld">Respuesta<textarea data-cf="${i}" data-k="back" rows="1">${esc(c.back)}</textarea></label>
          <div class="xs muted">🃏 Repaso rápido · ${esc(c.specialty)} · pág. ${c.page}</div>
        </div></div>` : `
      <div class="cand ${c.on?"":"off"}" id="cand${i}"><input type="checkbox" data-ci="${i}" ${c.on?"checked":""} aria-label="Incluir">
        <div style="min-width:0">
          <div class="xs muted">${qtLabel(c.qtype)} · ${esc(c.specialty)}${c.area ? ` (${esc(c.area)})` : ""} · ${esc(c.topic)} · ${pagsTxt(c)}</div>${dupAvisoHTML(c._dup, "q")}
          ${dupPliega(c, `${imgTag(c.img)}<p class="small" style="margin:6px 0">${esc(c.vignette)}</p>
          <ol type="A" class="small" style="margin:0;padding-left:22px">${c.options.map((o,j)=>`<li style="${j===c.correct?"color:var(--ok);font-weight:700":""}">${esc(o)}${j===c.correct?" ✓":""}</li>`).join("")}</ol>
          <p class="xs muted" style="margin:6px 0 0">${esc(c.whyCorrect)}</p>
          ${citasRevHTML(c)}${marcaHTML(c)}`)}
          <details class="custom" style="margin-top:6px"><summary>✏️ Editar esta pregunta</summary><div data-qbox="${i}" style="margin-top:10px">${qEditHTML(c, true)}</div></details>
        </div></div>`).join("")}</div>
    <div class="row" style="margin-top:12px"><button class="btn ghost" id="candCancel">Descartar todo</button><div class="spacer"></div><button class="btn primary" id="candSave">Guardar ${on} en el banco</button></div>
  </div>`;
  box.querySelectorAll("[data-ci]").forEach(cb=>cb.onchange=()=>{
    const i = +cb.dataset.ci; cands[i].on = cb.checked; $("#cand"+i).classList.toggle("off", !cb.checked);
    const n = cands.filter(c=>c.on).length; $("#candCount").textContent = `${n}/${cands.length} seleccionadas`; $("#candSave").textContent = `Guardar ${n} en el banco`;
  });
  box.querySelectorAll("[data-cf]").forEach(ta=>ta.oninput=()=>{ cands[+ta.dataset.cf][ta.dataset.k] = ta.value; });
  box.querySelectorAll("[data-hf]").forEach(x=>x.oninput=x.onchange=()=>{ const i = +x.dataset.hf; cands[i][x.dataset.k] = x.value; $("#hp"+i).innerHTML = hyPrevHTML(cands[i]); });
  box.querySelectorAll("[data-hr]").forEach(x=>x.oninput=()=>{ const [i,j,k] = x.dataset.hr.split(":"); cands[+i].thresholds[+j][k] = x.value; $("#hp"+i).innerHTML = hyPrevHTML(cands[+i]); });
  box.querySelectorAll("[data-qbox]").forEach(qb=>qb.oninput = qb.onchange = ()=>{ Object.assign(cands[+qb.dataset.qbox], qEditRead(qb)); });
  box.querySelectorAll("[data-marca-pg]").forEach(b=>b.onclick=()=>openPdf(cur().id, +b.dataset.marcaPg));
  $("#candCancel").onclick = ()=>{ cands = null; renderReview(); };
  $("#candSave").onclick = saveCands;
}
const pagsTxt = c => c.pages && c.pages.length > 1 ? `págs. ${c.pages.join(", ")}` : `pág. ${c.page}`;
// Las citas que la IA dice haber copiado del documento, con la comprobación automática.
function citasRevHTML(c){
  if (!c.citas || !c.citas.length) return c.kind === "q" || c.kind === "h" ? `<div class="xs" style="margin-top:6px;color:var(--warn)">⚠️ Sin cita del documento: compáralo con la página.</div>` : "";
  return `<div class="citasrev">${c.citas.map(x => `<div class="xs"><span style="color:${x.ok === false ? "var(--bad)" : "var(--ok)"}">${x.ok === false ? "⚠️ No aparece en el PDF" : x.ok ? "✓ Está en el PDF" : "📍"}</span> · pág. ${x.page}: «${esc(x.texto)}»</div>`).join("")}</div>`;
}
function marcaHTML(c){
  return tieneMarca(c) ? `<div class="note trap xs" style="margin-top:6px">⚠️ Tiene un signo por verificar: en el PDF ese símbolo no se leyó bien. <button class="linkbtn" data-marca-pg="${c.page}">Ver pág. ${c.page}</button> y corrígelo antes de guardar.</div>` : "";
}
// Lo que se guarda además: área, páginas y citas (con aviso si no se encontraron en el PDF).
function extrasIA(c){
  const x = {};
  if (c.area) x.area = c.area;
  if (c.pages && c.pages.length > 1) x.pages = c.pages;
  if (c.citas && c.citas.length) x.cita = c.citas.map(k => ({donde: `pág. ${k.page}${k.ok === false ? " · ⚠️ no se encontró en el PDF" : ""}`, texto: k.texto}));
  return x;
}
function saveCands(){
  const sel = cands.filter(c=>c.on);
  const malas = sel.filter(c=>c.kind==="q" && qEditError(c));
  if (malas.length) return toast("Revisa la pregunta editada: " + qEditError(malas[0]));
  const conMarca = sel.filter(tieneMarca).length;
  if (conMarca && !confirm(`${conMarca} ${conMarca === 1 ? "ítem todavía dice" : "ítems todavía dicen"} «verificar el signo en el PDF». ¿Guardar igual? Después puedes corregirlos con ✏️ Corregir.`)) return;
  const s = cur(); let nq = 0, nc = 0, nh = 0;
  cands.filter(c=>c.on).forEach(c=>{
    const id = nuevoIdPropio();
    if (c.kind === "h") {
      const rows = c.thresholds.map(x=>({label:x.label.trim(), val:x.val.trim()})).filter(x=>x.label && x.val);
      if (!c.title.trim() || !rows.length) return;
      agregarPropio("h", Object.assign({id, specialty:c.specialty, title:c.title.trim(), badge:c.badge, accent:SPEC_COLOR[c.specialty], thresholds:rows, redFlag:c.redFlag.trim(), trap:c.trap.trim(), relevance:c.relevance||0, why:c.why||"", ctx:"", src:s.id, page:c.page, ai:true, img:c.img||undefined}, extrasIA(c)));
      nh++;
    } else if (c.kind === "c") {
      if (!c.front.trim() || !c.back.trim()) return;
      agregarPropio("c", {id, specialty:c.specialty, front:c.front.trim(), back:c.back.trim(), ctx:c.ctx||"", src:s.id, page:c.page, ai:!!c.ai, auto:!c.ai});
      nc++;
    } else {
      agregarPropio("q", Object.assign({id, qtype:c.qtype||"caso", tipo:c.tipo||undefined, specialty:c.specialty, topic:c.topic, difficulty:"IA", vignette:esc(c.vignette), options:c.options, correct:c.correct,
        whyCorrect:c.whyCorrect, pearl:c.pearl, trap:c.trap, src:s.id, page:c.page, ai:true, img:c.img||undefined}, extrasIA(c)));
      nq++;
    }
  });
  rebuild(); save(); cands = null;
  toast(`Guardado: ${[nq ? `${nq} pregunta${nq===1?"":"s"}` : "", nh ? `${nh} ficha${nh===1?"":"s"}` : "", nc ? `${nc} repaso${nc===1?"":"s"} rápido${nc===1?"":"s"}` : ""].filter(Boolean).join(", ").replace(/, ([^,]*)$/, " y $1") || "nada"} ✓ Ya está en tu repaso.`);
  renderSrc(); refreshChips();
}
