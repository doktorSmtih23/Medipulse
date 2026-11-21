// ===================================================================
// TALLER · LEER Y CREAR
// ===================================================================
// El PDF tal como es: buscar, seleccionar, recortar o subir capturas y armar fichas a mano.
// ---------- 📖 Leer y crear ----------
let rdSel = "";
function markText(txt, words){
  if (!words.length) return esc(txt);
  const n = norm(txt), re = new RegExp(words.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g"); let i = 0, m, html = "";
  while ((m = re.exec(n))) { html += esc(txt.slice(i, m.index)) + "<mark>" + esc(txt.slice(m.index, m.index + m[0].length)) + "</mark>"; i = m.index + m[0].length; }
  return html + esc(txt.slice(i));
}
// Rearma párrafos y títulos a partir de las líneas del PDF
function hlText(txt, q){
  const words = norm(q||"").split(/[^a-z0-9ñ\-]+/).filter(w=>w.length>2 && !STOP.has(w)), blocks = [];
  txt.split("\n").map(l=>l.trim()).filter(Boolean).forEach(l=>{
    const last = blocks[blocks.length-1], ended = !last || last.h || /[.!?:]$/.test(last.t);
    const head = ended && l.length < 70 && !/[.,;:]$/.test(l) && /^[A-Z0-9ÁÉÍÓÚÑ]/.test(l) && l.split(/\s+/).length <= 9;
    if (head) blocks.push({h: true, t: l});
    else if (last && !last.h && !ended) last.t += " " + l;
    else blocks.push({h: false, t: l});
  });
  return blocks.map(b=>b.h ? `<h5 class="rdh">${markText(b.t, words)}</h5>` : `<p>${markText(b.t, words)}</p>`).join("");
}
let newPrefill = null;
function renderReader(){
  const s = cur(), info = docInfo(s.id), r = recCache[s.id], total = s.pages;
  gen.rdPage = Math.max(1, Math.min(gen.rdPage, total));
  const hits = gen.rdQuery.trim() ? topicPages(s.id, gen.rdQuery) : [];
  const pageTxt = r.pages[gen.rdPage-1] || "";
  const building = !!($("#rdEditor") && $("#rdEditor")._addRow);
  const esPdf = s.kind === "pdf" || !s.kind;   // los PDF se leen como son; el texto pegado, como texto
  $("#gBody").innerHTML = `
    <p class="xs muted" style="margin:0">Lee el documento aquí y arma tus <b>fichas high-yield</b>: selecciona una frase o una cifra (en el celular, mantén presionado y arrastra) y agrégala como dato de la ficha. Puedes juntar datos de varias páginas en la misma ficha. Para un algoritmo, una tabla o una gráfica, usa <b>✂️ Recortar una zona</b> o <b>📷 Subir captura</b>.</p>
    <div class="row" style="gap:6px"><input type="text" id="rdQ" value="${esc(gen.rdQuery)}" placeholder="Buscar en el documento: p. ej. AAV, GDNF, ensayo fase II…" style="flex:1;min-width:0"></div>
    ${gen.rdQuery.trim() ? `<div class="chips">${hits.length ? hits.slice(0,15).map(h=>`<button class="chip2${h.page===gen.rdPage?" on":""}" data-rp="${h.page}">pág. ${h.page} · ${h.hits}</button>`).join("") : `<span class="xs muted">Sin resultados.</span>`}</div>` : ""}
    <div class="row" style="gap:6px"><button class="btn sm" id="rdPrev" ${gen.rdPage<=1?"disabled":""}>‹ Anterior</button><span class="small" style="flex:1;text-align:center">${s.apunte?"Punto":s.kind==="text"?"Parte":"Página"} <b>${gen.rdPage}</b> de ${total}${info.refFrom < gen.rdPage ? " · referencias" : info.refFrom === gen.rdPage ? " · al final, referencias" : ""}</span><button class="btn sm" id="rdNext" ${gen.rdPage>=total?"disabled":""}>Siguiente ›</button></div>
    <div class="row" style="gap:6px">${esPdf ? `<button class="btn sm" id="rdOut" aria-label="Alejar">−</button><button class="btn sm" id="rdIn" aria-label="Acercar">+</button><button class="btn sm" id="rdCrop">✂️ Recortar una zona</button>` : ""}<label class="btn sm" style="display:inline-block">📷 Subir captura<input type="file" id="rdImg" accept="image/*" hidden></label></div>
    ${esPdf ? `<div class="pdfread" id="rdText"></div>`
      : `<div class="reader" id="rdText">${pageTxt.trim() ? hlText(pageTxt, gen.rdQuery) : `<p class="muted">Esta página no tiene texto seleccionable.</p>`}</div>`}
    <div id="rdCap"></div>
    <div class="selbar" id="rdBar" hidden>
      <div class="xs muted" id="rdSelTxt"></div>
      <div class="row" style="gap:6px;margin-top:6px"><button class="btn primary sm" id="rdHY">💎 Nueva ficha</button><button class="btn sm" id="rdAdd" hidden>➕ Añadir a la ficha</button><button class="btn sm" id="rdAI">✨ Ficha con IA</button><button class="btn sm" id="rdCase">🩺 Caso clínico</button><button class="btn ghost sm" id="rdX">✕</button></div>
    </div>
    <div class="row" style="gap:6px">${building ? "" : `<button class="btn ghost sm" id="rdBlank">💎 Empezar una ficha en blanco</button>`}<button class="btn sm" id="rdPageAI">✨ Fichas de esta página con IA</button></div>`;
  // el editor vive fuera de #gBody para no perder la ficha al cambiar de página
  if (!$("#rdEditor")) { const ed = document.createElement("div"); ed.id = "rdEditor"; $("#genCard").appendChild(ed); }
  const refreshBar = ()=>{ const on = !!$("#rdEditor")._addRow; $("#rdAdd").hidden = !on; $("#rdHY").className = on ? "btn sm" : "btn primary sm"; if (on) $("#rdAdd").className = "btn primary sm"; };
  $("#rdQ").oninput = ()=>{ gen.rdQuery = $("#rdQ").value; clearTimeout(renderReader._t); renderReader._t = setTimeout(()=>{ const h = topicPages(s.id, gen.rdQuery); if (h.length && !h.some(x=>x.page===gen.rdPage)) gen.rdPage = h[0].page; renderReader(); const q = $("#rdQ"); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }, 350); };
  document.querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>{ gen.rdPage = +b.dataset.rp; renderReader(); });
  $("#rdPrev").onclick = ()=>{ gen.rdPage--; renderReader(); };
  $("#rdNext").onclick = ()=>{ gen.rdPage++; renderReader(); };
  const box = $("#rdText"), capCtx = {src: s.id, page: gen.rdPage, title: s.title};
  let pagina = null;
  if (esPdf) {
    gen.rdZoom = gen.rdZoom || 1;
    renderPdfPage(box, s.id, gen.rdPage, gen.rdZoom).then(r=>{ pagina = r; });
    $("#rdIn").onclick = ()=>{ gen.rdZoom = Math.min(3, gen.rdZoom + 0.25); renderReader(); };
    $("#rdOut").onclick = ()=>{ gen.rdZoom = Math.max(0.5, gen.rdZoom - 0.25); renderReader(); };
    $("#rdCrop").onclick = ()=>{
      if (!pagina) return toast("Espera a que cargue la página.");
      toast("Arrastra sobre la página para marcar la zona.");
      startCrop(pagina.wrap, pagina.canvas, url=>showCapture($("#rdCap"), url, capCtx));
    };
  }
  $("#rdImg").onchange = async e=>{
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    try { showCapture($("#rdCap"), await shrink(await fileToDataUrl(f)), capCtx); } catch(err) { toast(err.message); }
  };
  const check = ()=>{
    const sl = window.getSelection(); const t = sl && sl.rangeCount ? sl.toString().replace(/[\u0000-\u0008\u000E-\u001F\u007F\uFFFD]/g, "").replace(/\s+/g," ").trim() : "";   // sin caracteres de control (fuentes mal codificadas)
    if (t.length >= 1 && t.length <= 1200 && sl.anchorNode && box.contains(sl.anchorNode)) { rdSel = t; $("#rdBar").hidden = false; refreshBar(); $("#rdSelTxt").textContent = "“" + (t.length > 160 ? t.slice(0,160) + "…" : t) + "”"; }
  };
  box.addEventListener("mouseup", check); box.addEventListener("touchend", ()=>setTimeout(check, 50)); box.addEventListener("keyup", check);
  document.onselectionchange = ()=>{ if (currentView === "src" && gen && gen.tab === "read" && $("#rdText")) { clearTimeout(document._selT); document._selT = setTimeout(check, 250); } };
  const clearSel = ()=>{ $("#rdBar").hidden = true; rdSel = ""; try { window.getSelection().removeAllRanges(); } catch(e) {} };
  $("#rdX").onclick = clearSel;
  const ed = $("#rdEditor");
  const startFicha = firstVal => hyEditor(ed, {title: gen.rdQuery.trim(), spec: gen.spec, src: s.id, page: gen.rdPage, ctx: firstVal || "",
    rows: firstVal ? [{label: "", val: firstVal}, {}] : [], heading: `💎 Nueva ficha · ${s.apunte?"punto":s.kind==="text"?"parte":"pág."} ${gen.rdPage}`,
    flags: {manual: true}, onSave: ()=>{ renderSrcItems(); renderReader(); }, onCancel: ()=>renderReader()});
  $("#rdHY").onclick = ()=>{ const v = rdSel; clearSel(); startFicha(v); renderReaderBarOnly(); };
  $("#rdAdd").onclick = ()=>{ const v = rdSel; clearSel(); ed._addRow("", v, v); toast("Dato agregado: escribe a la izquierda qué es"); };
  $("#rdCase").onclick = ()=>{ newPrefill = {why: rdSel, src: s.id, page: gen.rdPage}; newType = "q"; go("new"); };
  $("#rdBlank") && ($("#rdBlank").onclick = ()=>{ startFicha(""); $("#rdBlank").remove(); });
  const pageSel = ()=>{ const pg = gen.rdPage; return {a: pg, b: pg, nums: [pg], pages: [(info.pages[pg-1] || "").trim() ? info.pages[pg-1] : info.clean[pg-1]]}; };
  $("#rdAI").onclick = async ()=>{
    if (!getKey()) { toast("Para crear fichas con IA necesitas una clave de API."); return go("guide"); }
    const frag = rdSel, pg = gen.rdPage; clearSel();
    ed.innerHTML = `<div class="card small"><span class="spin"></span> Claude está armando la ficha con lo más relevante de ese fragmento…</div>`;
    try {
      const res = await aiGenerate(pageSel(), s.title, autoAsk({fragment: frag, page: pg}));
      const h = res.find(x=>x.kind==="h"); if (!h) throw uerr("La IA no encontró datos relevantes en ese fragmento.");
      hyEditor(ed, {title: h.title, badge: h.badge, spec: h.specialty, rows: h.thresholds, redFlag: h.redFlag, trap: h.trap, src: s.id, page: h.page || pg, ctx: frag,
        heading: `✨ Ficha creada por la IA (relevancia ${"★".repeat(h.relevance)}) · revísala y guárdala`, flags: {ai: true, relevance: h.relevance, why: h.why},
        onSave: ()=>{ renderSrcItems(); renderReader(); }, onCancel: ()=>renderReader()});
      if (h.why) ed.querySelector(".hyed h4").insertAdjacentHTML("afterend", `<p class="xs" style="margin:0">💡 ${esc(h.why)}</p>`);
    } catch(err) { ed.innerHTML = `<div class="card small" style="color:var(--bad)">${esc(err.userMsg || err.message)}</div>`; }
  };
  $("#rdPageAI").onclick = async ()=>{
    if (!getKey()) { toast("Para crear fichas con IA necesitas una clave de API."); return go("guide"); }
    if (genBusy) return; genBusy = true; const b = $("#rdPageAI"); b.disabled = true; b.innerHTML = `<span class="spin"></span> Analizando la página…`;
    try { cands = await aiGenerate(pageSel(), s.title, autoAsk({page: true})); }
    catch(err) { toast(err.userMsg || err.message); cands = null; }
    finally { genBusy = false; }
    renderReader(); renderReview();
    if (cands && cands.length) $("#reviewBox").scrollIntoView({behavior:"smooth", block:"start"});
  };
  function renderReaderBarOnly(){ const b = $("#rdBlank"); if (b) b.remove(); }
}
