// ===================================================================
// FICHAS HY
// ===================================================================
// ===================================================================
// FICHAS HIGH-YIELD: estudio con repaso espaciado y editor
// ===================================================================
const hyById = id => HYS.find(h=>String(h.id)===String(id));
function pickHY(n, spec){
  const pool = HYS.filter(h=>!spec || h.specialty===spec);
  const due = pool.filter(h=>isDue("h"+h.id));
  const unseen = shuffle(pool.filter(h=>!S.srs["h"+h.id])).sort((a,b)=>(b.relevance||3)-(a.relevance||3));   // las nuevas, primero las más relevantes
  const rest = shuffle(pool.filter(h=>S.srs["h"+h.id] && !isDue("h"+h.id))).sort((a,b)=>S.srs["h"+a.id].b - S.srs["h"+b.id].b);
  const out = []; for (const h of [...due, ...unseen, ...rest]) { if (!out.includes(h)) out.push(h); if (out.length >= n) break; }
  return out.map(h=>({t:"h", id:h.id}));
}
const hyAccent = h => h.accent || SPEC_COLOR[h.specialty] || "var(--accent)";
function hyCardHTML(c){
  return `<div class="card hycard" style="border-top-color:${hyAccent(c)}">
    <div class="row"><span class="tag">${esc(c.badge || "Ficha HY")}</span><span class="xs muted">${esc(c.specialty)}</span>${c.relevance ? `<div class="spacer"></div><span class="stars xs" title="Relevancia ${c.relevance} de 5">${"★".repeat(c.relevance)}${"☆".repeat(5-c.relevance)}</span>` : ""}</div>
    <h3 style="margin-top:8px;font-size:18px">${esc(c.title)}</h3>
    <div class="th">${c.thresholds.map(t=>`<div><span class="muted">${esc(t.label)}</span><b>${esc(t.val)}</b></div>`).join("")}</div>
    ${c.why ? `<div class="note pearl"><b>💡 Por qué es high-yield:</b> ${esc(c.why)}</div>` : ""}
    ${c.redFlag ? `<div class="note" style="border-color:var(--bad)"><b>🚩 Bandera roja:</b> ${esc(c.redFlag)}</div>` : ""}
    ${c.trap ? `<div class="note trap" style="margin-top:8px;border-color:var(--warn)"><b>⚠️ Trampa:</b> ${esc(c.trap)}</div>` : ""}${srcLine(c)}</div>`;
}
// Estudio: se muestran los rótulos y se ocultan los valores hasta que intentas recordarlos
function renderH(h){
  $("#sessBody").innerHTML = `<div class="card hycard" style="border-top-color:${hyAccent(h)}">
      <div class="row"><span class="tag">${esc(h.badge || "Ficha HY")}</span><span class="xs muted">${esc(h.specialty)}</span></div>
      <h3 style="margin-top:8px;font-size:18px">${esc(h.title)}</h3>
      <p class="xs muted" style="margin:6px 0 0">Intenta recordar cada dato antes de mostrar la ficha.</p>
      <div class="th">${h.thresholds.map(t=>`<div><span class="muted">${esc(t.label)}</span><b class="hidev">?</b></div>`).join("")}</div>
      <div id="hBack"></div></div>
    <div id="cBtns" style="margin-top:12px"><button class="btn primary block" id="flipBtn">Mostrar la ficha <kbd>espacio</kbd></button></div>`;
  $("#flipBtn").onclick = ()=>flipH(h);
}
function flipH(h){
  if (sess.state !== "ask") return; sess.state = "flip";
  document.querySelectorAll("#sessBody .hidev").forEach((b,i)=>{ b.textContent = h.thresholds[i].val; b.classList.remove("hidev"); });
  $("#hBack").innerHTML = `${h.why ? `<div class="note pearl" style="margin-bottom:8px"><b>💡 Por qué es high-yield:</b> ${esc(h.why)}</div>` : ""}${h.redFlag ? `<div class="note" style="border-color:var(--bad)"><b>🚩 Bandera roja:</b> ${esc(h.redFlag)}</div>` : ""}
    ${h.trap ? `<div class="note trap" style="margin-top:8px;border-color:var(--warn)"><b>⚠️ Trampa:</b> ${esc(h.trap)}</div>` : ""}
    ${h.ctx && h.ctx.length >= 40 ? `<div class="ctx">“${esc(h.ctx.length > 300 ? h.ctx.slice(0,300) + "…" : h.ctx)}”</div>` : ""}${srcLine(h)}
    <div style="font-size:13px;margin-top:8px"><button class="linkbtn" id="repBtnH">🚩 Reportar</button><div id="repBoxH"></div></div>`;
  $("#repBtnH").onclick = ()=>openReportForm("h"+h.id, $("#repBoxH"));
  $("#cBtns").innerHTML = `<div class="grid3">
    <button class="btn" data-g="0" style="border-color:var(--bad)">✗ No la sabía <kbd>1</kbd></button>
    <button class="btn" data-g="1" style="border-color:var(--warn)">~ Dudé <kbd>2</kbd></button>
    <button class="btn" data-g="2" style="border-color:var(--ok)">✓ La sabía <kbd>3</kbd></button></div>`;
  document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>gradeH(h, +b.dataset.g));
}
function gradeH(h, g){
  if (sess.state !== "flip") return; sess.state = "done"; addTime();
  grade("h"+h.id, g); logToday().c++; save();
  sess.results.push({t:"h", id:h.id, ok:g===2});
  sess.i++; renderItem();
}

// Editor de fichas (lector, datos clave, creación manual y revisión)
function hyEditor(box, o){
  o = Object.assign({title:"", badge:"", spec:"Medicina Interna", rows:[], redFlag:"", trap:"", src:null, page:0, ctx:"", showSrc:false, heading:"💎 Nueva ficha high-yield", onSave:null, flags:{}}, o);
  box.innerHTML = `<div class="card stack hyed" style="border-color:var(--accent)">
    <h4 style="margin:0">${esc(o.heading)}</h4>
    <label class="fld">Título de la ficha<input type="text" class="eTitle" value="${esc(o.title)}" placeholder="p. ej. AAV2-GAD en Parkinson: ensayo fase II"></label>
    <div class="grid2"><label class="fld">Etiqueta (opcional)<input type="text" class="eBadge" value="${esc(o.badge)}" placeholder="p. ej. Ensayo fase II, Umbral, Algoritmo"></label>
      <label class="fld">Especialidad<select class="eSpec">${SPECS.map(x=>`<option ${x===o.spec?"selected":""}>${x}</option>`).join("")}</select></label></div>
    <div><div class="fld">Datos clave: lo que tendrás que recordar</div><p class="xs muted" style="margin:2px 0 6px">A la izquierda qué es (se muestra al estudiar); a la derecha el dato (se oculta).</p><div class="eRows stack" style="gap:6px"></div>
      <button class="btn ghost sm eAdd" style="margin-top:6px">➕ Agregar dato</button></div>
    <label class="fld">🚩 Bandera roja (opcional)<textarea class="eRed" rows="2" placeholder="La señal de alarma o el hallazgo que no se te puede pasar">${esc(o.redFlag)}</textarea></label>
    <label class="fld">⚠️ Trampa de examen (opcional)<textarea class="eTrap" rows="2" placeholder="El error típico o el distractor favorito">${esc(o.trap)}</textarea></label>
    ${o.showSrc ? `<div class="grid2"><label class="fld">Fuente<select class="eSrc">${srcOptions(o.src||"")}</select></label><label class="fld">Página (opcional)<input type="number" class="ePage" min="1" value="${o.page||""}"></label></div>` : ""}
    <div class="row"><button class="btn primary sm eSave">💎 Guardar ficha</button><button class="btn ghost sm eCancel">Cancelar</button></div></div>`;
  const rowsBox = box.querySelector(".eRows");
  const addRow = (label, val) => {
    const r = document.createElement("div"); r.className = "erow";
    r.innerHTML = `<input type="text" class="eL" placeholder="Qué es (p. ej. Mejoría UPDRS a 6 meses)"><input type="text" class="eV" placeholder="El dato (p. ej. 23.1 % vs 12.7 %)"><button class="xbtn" aria-label="Quitar este dato">✕</button>`;
    r.querySelector(".eL").value = label || ""; r.querySelector(".eV").value = val || "";
    r.querySelector(".xbtn").onclick = ()=>r.remove();
    rowsBox.appendChild(r); return r;
  };
  (o.rows.length ? o.rows : [{}, {}]).forEach(x=>addRow(x.label, x.val));
  box.querySelector(".eAdd").onclick = ()=>addRow().querySelector(".eL").focus();
  box._addRow = (label, val, ctx) => { const empty = [...rowsBox.querySelectorAll(".erow")].find(r=>!r.querySelector(".eV").value.trim());
    const r = empty || addRow(); if (label) r.querySelector(".eL").value = label; r.querySelector(".eV").value = val; if (ctx) o.ctx = (o.ctx ? o.ctx + " … " : "") + ctx;
    r.querySelector(".eL").focus(); };
  box.querySelector(".eCancel").onclick = ()=>{ box.innerHTML = ""; box._addRow = null; o.onCancel && o.onCancel(); };
  box.querySelector(".eSave").onclick = ()=>{
    const title = box.querySelector(".eTitle").value.trim();
    const rows = [...rowsBox.querySelectorAll(".erow")].map(r=>({label: r.querySelector(".eL").value.trim(), val: r.querySelector(".eV").value.trim()})).filter(x=>x.label || x.val);
    if (!title) return toast("Ponle un título a la ficha.");
    if (!rows.length || rows.some(x=>!x.label || !x.val)) return toast("Cada dato necesita qué es y su valor.");
    const spec = box.querySelector(".eSpec").value;
    const h = Object.assign({id: "u"+(++S.seq), specialty: spec, title, badge: box.querySelector(".eBadge").value.trim(), accent: SPEC_COLOR[spec],
      thresholds: rows, redFlag: box.querySelector(".eRed").value.trim(), trap: box.querySelector(".eTrap").value.trim(),
      src: o.showSrc ? (box.querySelector(".eSrc").value || null) : o.src, page: o.showSrc ? (parseInt(box.querySelector(".ePage").value) || 0) : o.page, ctx: o.ctx || ""}, o.flags);
    S.userH.push(h); rebuild(); save(); box.innerHTML = ""; box._addRow = null;
    toast("Ficha guardada ✓ Entra a tu repaso espaciado."); refreshChips(); o.onSave && o.onSave(h);
  };
  setTimeout(()=>box.querySelector(o.title ? ".eL" : ".eTitle").focus({preventScroll:true}), 50);
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
}

// Pestaña High Yield
let hySpec = null;
function renderHY(){
  const specs = SPECS.filter(s=>HYS.some(h=>h.specialty===s));
  const due = HYS.filter(h=>isDue("h"+h.id)).length, mine = HYS.filter(h=>S.userH.includes(h)).length;
  $("#hyTop").innerHTML = `<button class="btn primary" id="hyStudy">💎 Repasar fichas${due ? ` (${due} pendientes)` : ""}</button><button class="btn" data-go="new" id="hyNew">➕ Crear ficha</button>`;
  $("#hyNew").onclick = ()=>{ newType = "h"; };
  $("#hyStudy").onclick = ()=>startSession({label:"High Yield", tag:"norm", stages:[{name:"Fichas high-yield", items:pickHY(10, hySpec)}]});
  $("#hyFilters").innerHTML = [null, ...specs].map(s=>`<button class="btn${hySpec===s?" on":""}" data-s="${s||""}">${s||"Todas"} (${HYS.filter(h=>!s||h.specialty===s).length})</button>`).join("");
  document.querySelectorAll("#hyFilters button").forEach(b=>b.onclick=()=>{ hySpec = b.dataset.s || null; renderHY(); });
  const list = HYS.filter(c=>!hySpec || c.specialty===hySpec).sort((a,b)=>(S.userH.includes(b)?1:0)-(S.userH.includes(a)?1:0));
  $("#hyList").innerHTML = list.map(h=>{
    const own = S.userH.includes(h), r = S.srs["h"+h.id];
    return `<div>${hyCardHTML(h)}<div class="row xs muted" style="margin:6px 4px 0;gap:8px"><span>${!r ? "Nueva" : isDue("h"+h.id) ? "Toca repasar" : r.b>=3 ? "Dominada" : "En repaso"}${own ? " · creada por ti" : ""}</span><div class="spacer"></div>${own ? `<button class="linkbtn" data-hdel="${h.id}" style="color:var(--bad)">Eliminar</button>` : ""}</div></div>`;
  }).join("") || `<p class="muted small">Aún no hay fichas en esta especialidad.</p>`;
  document.querySelectorAll("[data-hdel]").forEach(b=>b.onclick=()=>{ if (!confirm("¿Eliminar esta ficha?")) return;
    S.userH = S.userH.filter(h=>String(h.id)!==b.dataset.hdel); delete S.srs["h"+b.dataset.hdel]; rebuild(); save(); renderHY(); refreshChips(); });
}
