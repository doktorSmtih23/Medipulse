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
    <h3 style="margin-top:8px;font-size:18px">${esc(c.title)}</h3>${imgTag(c.img)}
    <div class="th">${c.thresholds.map(t=>`<div><span class="muted">${esc(t.label)}</span><b>${esc(t.val)}</b></div>`).join("")}</div>
    ${c.why ? `<div class="note pearl"><b>💡 Por qué es high-yield:</b> ${esc(c.why)}</div>` : ""}
    ${c.redFlag ? `<div class="note" style="border-color:var(--bad)"><b>🚩 Bandera roja:</b> ${esc(c.redFlag)}</div>` : ""}
    ${c.trap ? `<div class="note trap" style="margin-top:8px;border-color:var(--warn)"><b>⚠️ Trampa:</b> ${esc(c.trap)}</div>` : ""}${srcLine(c)}</div>`;
}
// Estudio: se muestran los rótulos y se ocultan los valores hasta que intentas recordarlos
function renderH(h){
  $("#sessBody").innerHTML = `<div class="card hycard" style="border-top-color:${hyAccent(h)}">
      <div class="row"><span class="tag">${esc(h.badge || "Ficha HY")}</span><span class="xs muted">${esc(h.specialty)}</span></div>
      <h3 style="margin-top:8px;font-size:18px">${esc(h.title)}</h3>${imgTag(h.img)}
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
    <div style="font-size:13px;margin-top:8px"><button class="linkbtn" id="repBtnH">🚩 Reportar</button> · <button class="linkbtn" id="fixBtnH">✏️ Corregir</button><div id="repBoxH"></div><div id="fixBoxH"></div></div>`;
  $("#repBtnH").onclick = ()=>openReportForm("h"+h.id, $("#repBoxH"));
  $("#fixBtnH").onclick = ()=>openCorregir("h", h, $("#fixBoxH"));
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
// Ejemplo que guía el editor: un mismo tema en todos los campos (criterios de Light, estables desde 1972).
const HY_EJEMPLO = [["Proteínas pleura / suero", "> 0,5 → exudado"], ["LDH pleura / suero", "> 0,6 → exudado"], ["LDH pleural", "> 2/3 del límite normal sérico"]];
const HY_BADGES = ["Criterios", "Umbral", "Dosis", "Primera línea", "Algoritmo", "Diagnóstico diferencial", "Bandera roja", "Ensayo clínico", "Epidemiología", "Escala"];
function hyEditor(box, o){
  o = Object.assign({title:"", badge:"", spec:"Medicina Interna", rows:[], redFlag:"", trap:"", src:null, page:0, ctx:"", showSrc:false, heading:"💎 Nueva ficha high-yield", onSave:null, flags:{}}, o);
  box.innerHTML = `<div class="card stack hyed" style="border-color:var(--accent)">
    <div><h4 style="margin:0">${esc(o.heading)}</h4>
      <p class="xs muted" style="margin:4px 0 0">Una ficha es un tema que quieres tener al instante. Al repasar verás el título y lo de la izquierda de cada dato; tendrás que recordar lo de la derecha.</p></div>${o.flags && o.flags.img ? imgTag(o.flags.img) : ""}
    <div class="hysec"><span class="hynum">1</span><b>El tema</b></div>
    <label class="fld">Título<input type="text" class="eTitle" value="${esc(o.title)}" placeholder="Derrame pleural: ¿exudado o trasudado?"></label>
    <p class="xs muted hyayuda">Un tema concreto, como te lo preguntarían. Mejor «Derrame pleural: ¿exudado o trasudado?» que «Neumología».</p>
    <div class="grid2"><label class="fld">Tipo de dato (opcional)<input type="text" class="eBadge" list="hyBadges" value="${esc(o.badge)}" placeholder="Criterios"><datalist id="hyBadges">${HY_BADGES.map(x => `<option value="${x}">`).join("")}</datalist></label>
      <label class="fld">Especialidad<select class="eSpec">${ESPS().map(x=>`<option ${x===o.spec?"selected":""}>${x}</option>`).join("")}${ESP_NUEVA_OPT}</select></label></div>
    <div class="hysec"><span class="hynum">2</span><b>Los datos clave</b></div>
    <p class="xs muted hyayuda">Izquierda: <b>la pregunta que te harás</b> (se ve al repasar). Derecha: <b>la respuesta exacta</b>, con cifra y unidad (se oculta). Entre 2 y 5 datos.</p>
    <div class="eRows stack" style="gap:6px"></div>
    <button class="btn ghost sm eAdd" style="align-self:flex-start">➕ Agregar dato</button>
    <div class="hysec"><span class="hynum">3</span><b>Para no fallar</b> <span class="xs muted">(opcional)</span></div>
    <label class="fld">🚩 Bandera roja: lo que no puedes pasar por alto en el paciente<textarea class="eRed" rows="2" placeholder="Derrame paraneumónico con pH pleural &lt; 7,2: necesita drenaje con tubo de tórax.">${esc(o.redFlag)}</textarea></label>
    <label class="fld">⚠️ Trampa: cómo te harán fallar en el examen<textarea class="eTrap" rows="3" placeholder="Paciente con insuficiencia cardiaca que recibe diuréticos: Light puede llamar exudado a un trasudado.">${esc(o.trap)}</textarea></label>
    ${o.showSrc ? `<div class="hysec"><span class="hynum">4</span><b>De dónde sale</b></div><div class="grid2"><label class="fld">Fuente<select class="eSrc">${srcOptions(o.src||"")}</select></label><label class="fld">Página (opcional)<input type="number" class="ePage" min="1" value="${o.page||""}"></label></div>` : ""}
    <details class="hyprevbox"><summary class="small">👁️ Así la verás al repasar</summary><div class="hyprev-in"></div></details>
    <div class="eRevBox"></div>
    <div class="row"><button class="btn primary sm eSave">💎 Guardar ficha</button>${getKey() ? `<button class="btn sm eRev">🤖 Revisar mi ficha</button>` : ""}<button class="btn ghost sm eCancel">Cancelar</button></div></div>`;
  const rowsBox = box.querySelector(".eRows");
  const addRow = (label, val) => {
    const r = document.createElement("div"); r.className = "erow";
    const ej = HY_EJEMPLO[rowsBox.children.length] || ["Otra pregunta que te harás", "Su respuesta exacta"];
    r.innerHTML = `<input type="text" class="eL" placeholder="${esc(ej[0])}" aria-label="Qué es"><input type="text" class="eV" placeholder="${esc(ej[1])}" aria-label="El dato"><button class="xbtn" aria-label="Quitar este dato">✕</button>`;
    r.querySelector(".eL").value = label || ""; r.querySelector(".eV").value = val || "";
    r.querySelector(".xbtn").onclick = ()=>r.remove();
    rowsBox.appendChild(r); return r;
  };
  (o.rows.length ? o.rows : [{}, {}, {}]).forEach(x=>addRow(x.label, x.val));
  // Vista previa del repaso: título y preguntas a la vista, respuestas ocultas.
  const prev = () => {
    const pb = box.querySelector(".hyprev-in"); if (!pb || !box.querySelector(".hyprevbox").open) return;
    // Mientras el formulario está vacío se ve el ejemplo; apenas escribes, solo lo tuyo.
    const tuyo = [...rowsBox.querySelectorAll(".erow")].map(r => r.querySelector(".eL").value.trim()).filter(Boolean);
    const vacio = !box.querySelector(".eTitle").value.trim() && !tuyo.length;
    const t = box.querySelector(".eTitle").value.trim() || (vacio ? box.querySelector(".eTitle").placeholder : "(sin título)");
    const rs = vacio ? HY_EJEMPLO.map(x => x[0]) : tuyo.length ? tuyo : ["(escribe la pregunta de cada dato)"];
    pb.innerHTML = `<div class="card hycard" style="margin-top:8px"><span class="tag">${esc(box.querySelector(".eBadge").value.trim() || "Ficha HY")}</span><h3 style="margin-top:8px;font-size:17px">${esc(t)}</h3>
      <p class="xs muted" style="margin:2px 0 8px">Intenta recordar cada dato antes de mostrar la ficha.</p><div class="th">${rs.map(l => `<div><span class="muted">${esc(l)}</span><b>?</b></div>`).join("")}</div></div>`;
  };
  box.querySelector(".hyprevbox").ontoggle = prev;
  box.addEventListener("input", prev);
  box.querySelector(".eAdd").onclick = ()=>addRow().querySelector(".eL").focus();
  box._addRow = (label, val, ctx) => { const empty = [...rowsBox.querySelectorAll(".erow")].find(r=>!r.querySelector(".eV").value.trim());
    const r = empty || addRow(); if (label) r.querySelector(".eL").value = label; r.querySelector(".eV").value = val; if (ctx) o.ctx = (o.ctx ? o.ctx + " … " : "") + ctx;
    r.querySelector(".eL").focus(); };
  // Revisión con IA: señala datos dudosos o rótulos poco claros; no agrega contenido por su cuenta.
  box.querySelector(".eRev") && (box.querySelector(".eRev").onclick = async ()=>{
    const bt = box.querySelector(".eRev"), title = box.querySelector(".eTitle").value.trim();
    const rows = [...rowsBox.querySelectorAll(".erow")].map(r=>({label: r.querySelector(".eL").value.trim(), val: r.querySelector(".eV").value.trim()})).filter(x=>x.label || x.val);
    if (!title || !rows.length) return toast("Escribe el título y al menos un dato para revisarla.");
    bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Revisando…`;
    try {
      const r = await callForTool({system: `Eres un revisor de fichas de estudio para el examen de residencia médica. Una ficha tiene un título, datos (qué es → el dato exacto), una bandera roja y una trampa. Señala solo problemas reales:
- "error": un dato médico incorrecto o desactualizado.
- "ambigua": un dato impreciso (sin unidad, sin población o sin contexto) o un rótulo que no deja claro qué hay que recordar.
- "pista": el rótulo ya contiene la respuesta.
- "estilo": título demasiado general o datos que deberían ir en otra ficha.
No propongas datos nuevos que la ficha no tenga. Si no hay problemas, "veredicto" es "bien". Máximo 6 observaciones, cada una en una frase concreta. Español neutro, sin markdown.`,
        tools: [T_REVISION], light: true, label: "Revisar ficha",
        user: `Título: ${title}\nDatos:\n${rows.map(x=>`- ${x.label} → ${x.val}`).join("\n")}\nBandera roja: ${box.querySelector(".eRed").value.trim()}\nTrampa: ${box.querySelector(".eTrap").value.trim()}`}, "report_revision");
      box.querySelector(".eRevBox").innerHTML = revisionHTML({veredicto: r.veredicto === "bien" ? "bien" : "revisar", observaciones: (r.observaciones || []).filter(o => o && o.texto).slice(0, 6)});
    } catch(e) { toast(e.userMsg || e.message); }
    bt.disabled = false; bt.textContent = "🤖 Revisar mi ficha";
  });
  box.querySelector(".eCancel").onclick = ()=>{ box.innerHTML = ""; box._addRow = null; o.onCancel && o.onCancel(); };
  box.querySelector(".eSave").onclick = ()=>{
    const title = box.querySelector(".eTitle").value.trim();
    const rows = [...rowsBox.querySelectorAll(".erow")].map(r=>({label: r.querySelector(".eL").value.trim(), val: r.querySelector(".eV").value.trim()})).filter(x=>x.label || x.val);
    if (!title) return toast("Ponle un título a la ficha.");
    if ((!rows.length && !(o.flags && o.flags.img)) || rows.some(x=>!x.label || !x.val)) return toast("Cada dato necesita qué es y su valor.");
    const spec = box.querySelector(".eSpec").value;
    const h = Object.assign({id: nuevoIdPropio(), specialty: spec, title, badge: box.querySelector(".eBadge").value.trim(), accent: SPEC_COLOR[spec],
      thresholds: rows, redFlag: box.querySelector(".eRed").value.trim(), trap: box.querySelector(".eTrap").value.trim(),
      src: o.showSrc ? (box.querySelector(".eSrc").value || null) : o.src, page: o.showSrc ? (parseInt(box.querySelector(".ePage").value) || 0) : o.page, ctx: o.ctx || ""}, o.flags);
    if (!dupConfirmar(h, "h")) return;
    agregarPropio("h", h); rebuild(); save(); box.innerHTML = ""; box._addRow = null;
    toast("Ficha guardada ✓ Entra a tu repaso espaciado."); refreshChips(); o.onSave && o.onSave(h);
  };
  // Pone el cursor en el primer campo, salvo que el usuario ya esté escribiendo en el editor
  // (en un celular lento, mover el cursor tarde le cambiaba de campo lo que estaba escribiendo).
  setTimeout(()=>{ if (!box.contains(document.activeElement)) box.querySelector(o.title ? ".eL" : ".eTitle").focus({preventScroll:true}); }, 50);
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
}

// Pestaña High Yield: buscador, filtros (especialidad, área, estado) y lista compacta por especialidad.
// Cada ficha se abre con un toque; «Repasar» usa lo filtrado (primero lo pendiente y lo más relevante).
let hySpec = null, hyArea = "", hyEst = "", hyQ = "";
function hyEstado(h){
  const r = S.srs["h"+h.id];
  if (!r) return {k: "new", t: "Nueva"};
  if (isDue("h"+h.id)) return {k: "due", t: "Toca repasar"};
  return r.b >= 3 ? {k: "ok", t: "Dominada"} : {k: "rev", t: "En repaso"};
}
function hyCoincide(h, txt){
  if (!txt) return true;
  const s = srcInfo(h.src) || {};
  const t = norm([h.title, h.badge, h.area, h.specialty, h.redFlag, h.trap, ...(h.thresholds || []).map(x => x.label + " " + x.val), s.t || ""].join(" "));
  return txt.split(/\s+/).every(w => t.includes(w));
}
function renderHY(){
  const txt = norm(hyQ.trim()), mia = h => S.userH.includes(h);
  const enEst = h => !hyEst || (hyEst === "mine" ? mia(h) : hyEstado(h).k === hyEst);
  const base = HYS.filter(h => (!hySpec || h.specialty === hySpec) && (!hyArea || h.area === hyArea) && hyCoincide(h, txt));
  const list = base.filter(enEst).sort((a, b) => (b.relevance || 3) - (a.relevance || 3));
  const due = list.filter(h => isDue("h"+h.id)).length;
  const areas = [...new Set(HYS.filter(h => !hySpec || h.specialty === hySpec).map(h => h.area).filter(Boolean))].sort();
  if (hyArea && !areas.includes(hyArea)) hyArea = "";
  const cnt = f => base.filter(f).length, opt = (v, l, on) => `<option value="${esc(v)}" ${on ? "selected" : ""}>${esc(l)}</option>`;
  $("#hyTop").innerHTML = `<button class="btn primary" id="hyStudy" ${list.length ? "" : "disabled"}>💎 Repasar ${Math.min(10, list.length)} fichas${due ? ` (${due} pendientes)` : ""}</button><button class="btn" data-go="new" id="hyNew">➕ Crear ficha</button>`;
  $("#hyNew").onclick = ()=>{ newType = "h"; };
  $("#hyStudy").onclick = ()=>startSession({label:"High Yield", tag:"norm", stages:[{name:"Fichas high-yield", items:ordenHY(list).slice(0, 10)}]});
  const qPrev = $("#hyQ"), foco = qPrev && document.activeElement === qPrev;
  $("#hyFilters").innerHTML = `<input type="search" id="hyQ" placeholder="Buscar: tema, dato, área o fuente (p. ej. NMDAR, dosis)" aria-label="Buscar fichas" style="grid-column:1/-1">
    <label class="fld">Especialidad<select id="hySelSpec">${opt("", `Todas (${HYS.length})`, !hySpec)}${ESPS().filter(s => HYS.some(h => h.specialty === s)).map(s => opt(s, `${s} (${HYS.filter(h => h.specialty === s).length})`, hySpec === s)).join("")}</select></label>
    ${areas.length ? `<label class="fld">Área<select id="hySelArea">${opt("", "Todas las áreas", !hyArea)}${areas.map(a => opt(a, a, hyArea === a)).join("")}</select></label>` : ""}
    <label class="fld">Estado<select id="hySelEst">${opt("", `Todas (${base.length})`, !hyEst)}${opt("new", `Nuevas (${cnt(h => !S.srs["h"+h.id])})`, hyEst === "new")}${opt("due", `Toca repasar (${cnt(h => isDue("h"+h.id))})`, hyEst === "due")}${opt("rev", `En repaso (${cnt(h => hyEstado(h).k === "rev")})`, hyEst === "rev")}${opt("ok", `Dominadas (${cnt(h => hyEstado(h).k === "ok")})`, hyEst === "ok")}${opt("mine", `Creadas por ti (${cnt(mia)})`, hyEst === "mine")}</select></label>`;
  const q = $("#hyQ"); q.value = hyQ;
  if (foco) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  q.oninput = () => { hyQ = q.value; clearTimeout(renderHY._t); renderHY._t = setTimeout(renderHY, 250); };
  $("#hySelSpec").onchange = e => { hySpec = e.target.value || null; renderHY(); };
  $("#hySelArea") && ($("#hySelArea").onchange = e => { hyArea = e.target.value; renderHY(); });
  $("#hySelEst").onchange = e => { hyEst = e.target.value; renderHY(); };
  const abierto = !!txt;   // plegadas salvo que se esté buscando
  const grupos = ESPS().map(s => [s, list.filter(h => h.specialty === s)]).filter(([, hs]) => hs.length);
  $("#hyList").innerHTML = list.length ? grupos.map(([s, hs]) => `
    <details class="qgrupo card" data-pleg="hy_${esc(s)}" ${abierto || PLEG["hy_" + s] ? "open" : ""}><summary><span class="dot" style="background:${SPEC_COLOR[s]}"></span> <b>${esc(s)}</b> <span class="xs muted">${hs.length}</span></summary>
      ${hs.map(h => { const e = hyEstado(h), id = esc(String(h.id)); return `<details class="hyrow" data-hid="${id}"><summary>
        <div style="min-width:0"><b class="small">${esc(h.title)}</b>
          <div class="row xs" style="gap:6px;margin-top:3px">${h.badge ? `<span class="tipo">${esc(h.badge)}</span>` : ""}${h.area ? `<span class="muted">${esc(h.area)}</span>` : ""}${h.relevance ? `<span class="stars" title="Relevancia ${h.relevance} de 5">${"★".repeat(h.relevance)}</span>` : ""}<span class="est ${e.k}">${e.t}</span>${mia(h) ? `<span class="muted">· tuya</span>` : ""}</div></div></summary>
        <div class="hybody"></div></details>`; }).join("")}</details>`).join("")
    : `<p class="muted small">No hay fichas con esos filtros.</p>`;
  // El contenido de cada ficha se arma al abrirla (con muchas fichas, la lista queda liviana).
  document.querySelectorAll("#hyList .hyrow").forEach(d => d.ontoggle = () => {
    if (!d.open || d.dataset.ok) return; d.dataset.ok = 1;
    const h = hyById(d.dataset.hid);
    d.querySelector(".hybody").innerHTML = hyCardHTML(h) + `<div class="row xs" style="margin:6px 4px 0;gap:10px"><button class="linkbtn" data-h1="${esc(String(h.id))}">💎 Repasar esta</button><div class="spacer"></div>${mia(h) ? `<button class="linkbtn" data-hdel="${esc(String(h.id))}" style="color:var(--bad)">Eliminar</button>` : ""}</div>`;
    d.querySelectorAll("[data-h1]").forEach(b => b.onclick = () => startSession({label:"High Yield", tag:"norm", stages:[{name: h.title, items:[{t:"h", id:h.id}]}]}));
    d.querySelectorAll("[data-hdel]").forEach(b => b.onclick = () => { if (!confirm("¿Eliminar esta ficha?")) return;
      quitarPropio("h" + b.dataset.hdel); rebuild(); save(); renderHY(); refreshChips(); });
  });
}
// Orden para repasar: lo pendiente, luego lo nuevo más relevante, luego lo menos sabido.
function ordenHY(pool){
  const due = pool.filter(h=>isDue("h"+h.id));
  const unseen = shuffle(pool.filter(h=>!S.srs["h"+h.id])).sort((a,b)=>(b.relevance||3)-(a.relevance||3));
  const rest = shuffle(pool.filter(h=>S.srs["h"+h.id] && !isDue("h"+h.id))).sort((a,b)=>S.srs["h"+a.id].b - S.srs["h"+b.id].b);
  return [...due, ...unseen, ...rest].map(h=>({t:"h", id:h.id}));
}
