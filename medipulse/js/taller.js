// ===================================================================
// DETALLE DE UNA FUENTE
// ===================================================================
// La pantalla de un documento: índice, pestañas (Leer, Recomendaciones, IA…), ítems guardados y eliminar.
// El Taller se divide en: texto-pdf.js (el texto), este archivo, taller-ia.js (generar con IA),
// taller-leer.js (leer y crear a mano) y taller-revision.js (datos clave y revisión antes de guardar).
// ---------- estado del taller ----------
let curSrc = null, gen = null, cands = null, genBusy = false;
const cur = () => S.sources.find(x=>x.id===curSrc);
// Deja lista una fuente para trabajar con ella (sin cambiar de pantalla); extra ajusta la pestaña, la página…
function prepSrc(id, extra){
  curSrc = id; cands = null;
  const s = cur();
  gen = Object.assign(TEMPLATE_DEFAULT(), {tab: (anIntent && anIntent.id === id && anIntent.kind) || "read", tema: null, manual: null, from: 1, to: Math.max(1, Math.min(s.pages, 10)), pageSet: null, topic: "", spec: s.spec || "Medicina Interna", n: 10, rdPage: 1, rdQuery: ""}, extra || {});
  anIntent = null;
}
function openSrc(id){ prepSrc(id); go("src"); }
async function renderSrc(){
  const s = cur(); if (!s) return go("lib");
  const c = S.check[s.id];
  // Abrirlo cuenta como abierto antes de dibujar: si no, la primera vez mostraría «Sin abrir».
  if (pdfCuenta(s) && !s.abierto) { s.abierto = Date.now(); save(); }
  const pl = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const tipo = s.apunte ? `📓 Tus apuntes · ${pl(s.pages, "punto", "puntos")}` : s.kind === "text" ? `Texto pegado · ${pl(s.pages, "parte", "partes")}`
    : s.kind === "pack" ? "Pack importado" : `PDF · ${s.pages} págs · versión ${s.version || 1}`;
  const datos = esc([s.org, s.year].filter(Boolean).join(", ") || "Sin organización ni año")
    + (s.updated ? ` · versión nueva subida el ${fmtDate(s.updated)}` : "") + (c ? ` · vigencia revisada el ${fmtDate(c.at)}` : "");
  const boton = (id, txt, clase = "btn sm") => `<button class="${clase}" id="${id}">${txt}</button>`;
  const botones = (s.apunte ? boton("srcLib", "📓 Ir a la libreta", "btn primary sm") : "")
    + boton("srcOpen", "📄 Abrir PDF") + boton("srcMeta", "✏️ Datos") + boton("srcVer", "⬆ Subir versión nueva")
    + (getKey() ? boton("srcChk", "🔎 ¿Hay versión más nueva?") : "") + boton("srcPack", "📦 Exportar pack")
    + `<button class="btn ghost sm" id="srcDel" style="color:var(--bad)">Eliminar</button>`;
  $("#srcHead").innerHTML = `<div class="row" style="gap:6px"><span class="tag">${tipo}</span>${badge(srcState(s.id))}</div>
    <h2 style="margin-top:8px;word-break:break-word">${esc(s.title)}</h2>
    <div class="xs muted" style="margin-top:4px">${datos}</div>
    <div class="row" style="margin-top:10px;gap:6px">${botones}</div>
    <div id="pdfCompBox">${pdfCompromisoHTML(s)}</div>
    <input type="file" id="verIn" accept="application/pdf" hidden>
    <div id="srcMetaForm"></div>`;
  $("#srcOpen").onclick = ()=>openPdf(s.id, 1);
  $("#srcMeta").onclick = editSrcMeta;
  $("#srcVer").onclick = ()=>$("#verIn").click();
  $("#verIn").onchange = e=>{ const f = e.target.files[0]; e.target.value = ""; if (f) uploadNewVersion(f); };
  $("#srcChk") && ($("#srcChk").onclick = ()=>{ chkSel = new Set([s.id]); go("check"); runCheck(); });
  $("#srcDel").onclick = ()=>deleteSource(s.id);
  $("#srcPack").onclick = ()=>exportSourcePack(s.id);
  if (s.kind==="text" || s.kind==="pack") { $("#srcOpen").hidden = true; $("#srcVer").hidden = true; }
  if (s.apunte) { $("#srcMeta").hidden = true; $("#srcLib").onclick = ()=>{ apCur = s.apunte; apEdit = null; go("apuntes"); }; }
  renderSrcBanner(); renderItemReview(); renderReview(); renderSrcItems();
  if (s.kind==="pack") { $("#genCard").hidden = true; $("#anCard").hidden = true; return; }
  $("#genCard").hidden = false;
  $("#genCard").innerHTML = `<p class="small muted" style="margin:0"><span class="spin"></span> Preparando el documento…</p>`;
  try { await getRec(s.id); } catch(e) {}
  if (curSrc === s.id && currentView === "src") { $("#anCard").hidden = true; renderGen(); }
}

// Una sola tarjeta: índice del documento (temas y subtemas) y qué hacer con el tema elegido.
const ACCIONES = {
  read: ["📖 Leer", "El PDF tal como es: selecciona, recorta o sube capturas."],
  recs: ["⚡ Recomendaciones", "Las de la guía, separadas por grado: lo que se hace, lo que puede considerarse y lo que no."],
  ai: ["💎 Fichas y casos", "La IA arma fichas o casos tipo examen del tema."],
  audit: ["🔬 Auditoría", "Veredicto, algoritmo, qué hacer y qué no, umbrales."],
  tema: ["📖 Revisión de tema", "Fisiopatología, cuadro típico, banderas rojas, diferenciales."],
  revista: ["🩺 Pase de revista", "Resumen de 60 s, conductas y preguntas del profesor."]
};
// Índice y selector de páginas: se redibujan solos cuando termina de cargarse el índice,
// sin tocar el resto (así no se pierde una captura o una selección en curso).
function indiceHTML(){
  const s = cur(), ind = s.indice, items = ind ? ind.items : [];
  return `
      <div class="row"><b class="small">📑 Índice</b><div class="spacer"></div>${getKey() && s.kind !== "pack" ? `<button class="btn ghost sm" id="indAI" ${gen.indBusy?"disabled":""}>${gen.indBusy ? `<span class="spin"></span> Creando…` : items.length ? "✨ Rehacer con IA" : "✨ Crear con IA"}</button>` : ""}</div>
      ${!ind ? `<p class="xs muted" style="margin:0"><span class="spin"></span> Buscando el índice…</p>` : plegable("indice", `<b class="small">Elegir un tema</b> <span class="xs muted">${items.length ? `${items.length} temas` : "todo el documento"}</span>`, `<div class="indice">
        <button class="ind-it${gen.tema==null && !gen.manual?" on":""}" data-tema="-1"><span>Todo el documento</span></button>
        ${items.map((x,i)=>`<button class="ind-it lvl${x.lvl}${gen.tema===i && !gen.manual?" on":""}" data-tema="${i}"><span>${esc(x.title)}</span><small>${x.from===x.to?`pág. ${x.from}`:`págs. ${x.from}–${x.to}`}</small></button>`).join("")}
      </div>`) + `
      <p class="xs muted" style="margin:0">${items.length ? IND_FUENTE[ind.fuente] + (["maqueta", "titulos", "numerado"].includes(ind.fuente) ? (getKey() && s.kind !== "pack" ? " Para un índice más preciso, usa ✨ Crear con IA." : " Con tu clave de IA puedes crear uno más preciso.") : "") + " Toca un tema para trabajar solo con él." : `No encontré un índice en este documento${getKey() ? "; puedes crearlo con IA (≈ US$0,01)" : ""}, o elige las páginas a mano.`}</p>`}
      ${gen.indErr ? `<p class="small" style="margin:0;color:var(--bad)">${esc(gen.indErr)}</p>` : ""}
      <details class="custom" ${gen.manual ? "open" : ""}><summary>Elegir páginas a mano</summary><div class="row" style="gap:6px;margin-top:8px;align-items:flex-end">
        <label class="fld" style="flex:1">Desde<input type="number" id="manFrom" min="1" max="${s.pages}" value="${gen.manual ? gen.manual.from : 1}"></label>
        <label class="fld" style="flex:1">Hasta<input type="number" id="manTo" min="1" max="${s.pages}" value="${gen.manual ? gen.manual.to : Math.min(s.pages, 5)}"></label>
        <button class="btn sm" id="manGo">Usar</button></div></details>
    `;
}
function bindIndice(){
  const s = cur();
  const elegir = v => { gen.tema = v; gen.manual = null; const x = temaActual(); gen.topic = x ? x.title : ""; if (x) gen.rdPage = x.from; renderGen(); };
  document.querySelectorAll("[data-tema]").forEach(b=>b.onclick=()=>elegir(+b.dataset.tema < 0 ? null : +b.dataset.tema));
  $("#manGo").onclick = ()=>{ const a = Math.max(1, Math.min(s.pages, +$("#manFrom").value || 1)), z = Math.max(a, Math.min(s.pages, +$("#manTo").value || a));
    gen.manual = {from: a, to: z}; gen.tema = null; gen.topic = ""; gen.rdPage = a; renderGen(); };
  $("#indAI") && ($("#indAI").onclick = runChapters);
}
// Redibuja solo el índice cuando termina de calcularse, sin cerrar «Elegir páginas a mano» ni borrar
// lo que el usuario ya escribió ahí (si no, la sección se cerraba en medio de la escritura).
// Si el usuario está escribiendo en «Desde» o «Hasta», espera a que salga del campo: redibujar en medio de
// la escritura mezclaba lo tecleado con el valor anterior («2» quedaba «21»).
function refrescarIndice(){
  const activo = document.activeElement;
  if (activo && /^man(From|To)$/.test(activo.id)) { activo.addEventListener("blur", () => setTimeout(refrescarIndice), {once: true}); return; }
  const box = $("#indBox"), d = box.querySelector("details.custom"), abierto = d && d.open;
  const desde = $("#manFrom") && $("#manFrom").value, hasta = $("#manTo") && $("#manTo").value, foco = document.activeElement && document.activeElement.id;
  box.innerHTML = indiceHTML(); bindIndice();
  if (abierto) box.querySelector("details.custom").open = true;
  if (desde != null && $("#manFrom")) $("#manFrom").value = desde;
  if (hasta != null && $("#manTo")) $("#manTo").value = hasta;
  if (foco && /^man(From|To)$/.test(foco) && $("#" + foco)) $("#" + foco).focus({preventScroll: true});
}
function renderGen(){
  const s = cur(), info = docInfo(s.id);
  if (!info) { $("#genCard").innerHTML = `<p class="small" style="margin:0;color:var(--bad)">No encuentro el texto de esta fuente en este dispositivo. Vuelve a agregarla.</p>`; return; }
  if (!indiceAlDia(s) && !gen.indCargando) { gen.indCargando = true; buildIndice(s).catch(()=>{}).then(()=>{ gen.indCargando = false; if (cur() === s && currentView === "src" && $("#indBox")) refrescarIndice(); }); }
  const t = temaActual(), sel = temaSel();
  const est = s.design || detectDesign(info.pages.slice(0, 6).join(" "));
  const chars = sel ? sel.pages.reduce((a, p)=>a + p.length, 0) : 0;
  // En un estudio original la pestaña gratis no son recomendaciones (no las hay) sino sus resultados con cifras.
  const acc = k => k === "recs" && recEsEstudio(s) ? ["📊 Resultados con cifras", "Las frases de los resultados con el efecto y sus cifras."] : ACCIONES[k];
  const btn = k => `<button data-gt="${k}" class="${gen.tab===k?"on":""}"><b>${acc(k)[0]}</b><span>${acc(k)[1]}</span></button>`;
  $("#genCard").innerHTML = `
    <div class="row"><h3 style="font-size:16px">📚 Estudiar este documento</h3><div class="spacer"></div><span class="tag" title="${s.design ? "Según la IA" : "Estimado por palabras clave"}">${esc(DESIGNS[est] || DESIGNS.OTRO)}</span></div>
    ${info.danados ? `<div class="note trap" role="note"><b>⚠️ Este PDF tiene símbolos que no se leyeron bien</b> (por ejemplo «${esc(info.danados.ejemplo)}»). Los signos ≥, ≤, &lt; o &gt; pueden salir cambiados: revisa las cifras con signos en la página original.</div>` : ""}
    <div class="stack" style="gap:6px" id="indBox">${indiceHTML()}</div>
    <div class="note" style="margin:0"><b>Tema:</b> ${esc(t ? t.title : "Todo el documento")}${sel ? ` · ${pagesLabel(sel)}` : ""}</div>
    <div class="xs muted">Gratis</div>
    <div class="tabs3 acc2">${btn("read")}${btn("recs")}</div>
    <div class="xs muted">Con IA${getKey() ? ` · ${aiEstimateLine(Math.min(chars, AN_MAX_CHARS), {outTokens: 5000})} aprox. por acción · <button class="linkbtn" data-go="ahorro">💸 Cómo gastar menos</button>` : " · requiere tu clave"}</div>
    ${getKey() && chars > TEXTO_LARGO ? `<div class="note" style="margin:0">⏱️ <b>Texto largo</b> (${Math.round(chars/1000)} mil caracteres): con IA puede tardar 1–2 minutos y, mientras tanto, no bloquees la pantalla ni cambies de app. Para que sea más rápido y barato, elige un tema del índice.</div>` : ""}
    <div class="tabs3 acc4">${btn("ai")}${btn("audit")}${btn("revista")}</div>
    <div id="gBody" class="stack"></div>`;
  bindIndice();
  document.querySelectorAll("[data-gt]").forEach(b=>b.onclick=()=>{ gen.tab = b.dataset.gt; renderGen(); });
  ({read: renderReader, recs: renderRecs, ai: renderAiTab, audit: ()=>renderAnTab("audit"), tema: ()=>renderAnTab("tema"), revista: ()=>renderAnTab("revista")})[gen.tab]();
}

// El texto con el que trabaja la IA es el del tema elegido en el índice (indice.js).
const selectedText = () => temaSel();
const pagesLabel = sel => sel.nums.length > 1 && sel.nums.some((n,i)=>i && n !== sel.nums[i-1]+1) ? `págs. ${sel.nums.join(", ")}` : sel.nums.length > 1 ? `págs. ${sel.a}–${sel.b}` : `pág. ${sel.a}`;

function renderSrcItems(){
  const s = cur(), vis = (k,o)=>o.src===s.id && !S.hidden[k+o.id];
  const qs = S.userQ.filter(q=>vis("q",q)), hs = S.userH.filter(h=>vis("h",h)), cs = S.userC.filter(c=>vis("c",c));
  const box = $("#srcItems");
  if (!qs.length && !hs.length && !cs.length) { box.innerHTML = `<h3 style="font-size:16px">En tu banco</h3><p class="muted small" style="margin:6px 0 0">Todavía no hay preguntas ni fichas de esta fuente.</p>`; return; }
  const status = k => { const r = S.srs[k]; return !r ? "nueva" : isDue(k) ? "toca repasar" : r.b>=3 ? "dominada" : "en repaso"; };
  const rows = [...qs.map(q=>({k:"q"+q.id, t:(q.qtype && q.qtype!=="caso" ? qtLabel(q.qtype) : "🩺") + " " + (q.topic||"Caso clínico"), p:q.page, o:q})),
    ...hs.map(h=>({k:"h"+h.id, t:"💎 "+h.title, p:h.page, o:h})), ...cs.map(c=>({k:"c"+c.id, t:"🃏 "+c.front, p:c.page, o:c}))];
  // Resumen a la vista y la lista plegada (con muchas preguntas era una lista larga).
  const abierta = !!(box.querySelector("details.srclista") && box.querySelector("details.srclista").open);
  const est = rows.map(x=>status(x.k)), cuenta = t => est.filter(e=>e===t).length;
  const partes = [qs.length && `${qs.length} pregunta${qs.length===1?"":"s"}`, hs.length && `${hs.length} ficha${hs.length===1?"":"s"}`, cs.length && `${cs.length} repaso${cs.length===1?"":"s"} rápido${cs.length===1?"":"s"}`].filter(Boolean).join(" · ");
  const estados = [["nueva","nuevas"],["toca repasar","para repasar"],["en repaso","en repaso"],["dominada","dominadas"]].map(([k,t])=>cuenta(k) ? `${cuenta(k)} ${t}` : "").filter(Boolean).join(" · ");
  box.innerHTML = `<div class="row"><h3 style="font-size:16px">En tu banco</h3><div class="spacer"></div><button class="btn primary" id="srcStudy">Estudiar esta fuente (${rows.length})</button></div>
    <p class="small" style="margin:6px 0 0">${partes}</p><p class="xs muted" style="margin:2px 0 0">${estados}</p>
    <details class="srclista" ${abierta ? "open" : ""}><summary class="small">Ver la lista (${rows.length})</summary>
    <div style="margin-top:8px">${rows.map(x=>`
      <div class="srcitem"><div style="flex:1;min-width:0" class="small">${esc(x.t)}<div class="xs muted">${x.p ? "pág. " + x.p + " · " : ""}${status(x.k)}${x.o.stale?' · <span style="color:var(--warn)">versión anterior</span>':""}${x.o.updated?" · actualizado":""}</div></div><button class="btn ghost xs" data-del="${x.k}" aria-label="Eliminar" style="color:var(--bad)">✕</button></div>`).join("")}</div></details>`;
  $("#srcStudy").onclick = ()=>studySource(s.id);
  box.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
    const k = b.dataset.del;
    quitarPropio(k); rebuild(); save(); renderSrcItems(); refreshChips();
  });
}

async function deleteSource(id){
  const s = S.sources.find(x=>x.id===id); if (!s) return;
  const n = S.userQ.filter(q=>q.src===id).length + S.userC.filter(c=>c.src===id).length + S.userH.filter(h=>h.src===id).length;
  const na = s.anHist ? s.anHist.length : Object.keys(s.an || {}).length;
  if (!confirm(`¿Eliminar “${s.title}”${n?` y sus ${n} preguntas y fichas`:""}${na ? `${n ? " y" : " y sus"} ${na} análisis (descárgalos antes si los quieres conservar)` : ""}? No se puede deshacer.`)) return;
  quitarPropiosDeFuente(id);
  quitarFuente(id);
  rebuild(); save(); delete recCache[id];
  try { await idb.del(id); } catch(e) {}
  toast("Fuente eliminada"); go("lib");
}
