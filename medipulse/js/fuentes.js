// ===================================================================
// BIBLIOTECA DE FUENTES
// ===================================================================
const KEY_API = "medipulse_api_key";
let memKey = "";   // respaldo en memoria cuando el navegador no deja guardar
function getKey(){ try { return localStorage.getItem(KEY_API) || memKey; } catch(e) { return memKey; } }
function setKey(k){ memKey = k || ""; try { k ? localStorage.setItem(KEY_API, k) : localStorage.removeItem(KEY_API); } catch(e) {} }
const pubmed = t => "https://pubmed.ncbi.nlm.nih.gov/?term=" + encodeURIComponent(t);

function srcInfo(id){
  if (!id) return null;
  if (SRC_BY_ID[id]) {
    const b = Object.assign({builtin:true}, SRC_BY_ID[id]), c = S.check[id];
    if (c && c.adopted && c.latest && c.latest.t) Object.assign(b, {t: c.latest.t, r: [c.latest.org, c.latest.y||""].filter(Boolean).join(", ") || b.r, adopted: true});
    return b;
  }
  const s = S.sources.find(x=>x.id===id);
  return s ? {builtin:false, id:s.id, t:s.title, kind:s.kind||"pdf", apunte:s.apunte} : null;
}
// Cita textual de la fuente (contenido incluido verificado): dónde está y qué dice, para comparar.
function citaHtml(item){
  if (!Array.isArray(item.cita) || !item.cita.length) return "";
  const v = item.verificado ? ` · verificado el ${esc(item.verificado)}` : "";
  return `<details class="cita"><summary>📍 Ver la cita textual de la guía${v}</summary>${item.cita.map(c => `<div class="cita-i"><b>${esc(c.donde)}</b><blockquote>“${esc(c.texto)}”</blockquote></div>`).join("")}</details>`;
}
function srcLine(item){
  const s = srcInfo(item.src); if (!s) return "";
  const st = srcState(item.src);
  const warn = msg => `<div class="srcline" style="color:var(--warn)">⚠ <span>${msg}</span></div>`;
  const upd = (item.updated ? " · ✓ actualizado a la versión nueva con IA, verifícalo" : "") + (item.edited ? " · ✏️ corregido por ti" : "");
  const marca = typeof tieneMarca === "function" && tieneMarca(item) ? warn("Este ítem tiene un signo por verificar en el PDF. Compáralo con la página y corrígelo con ✏️ Corregir.") : "";
  if (s.builtin) return `<div class="srcline">📚 <span>${esc(s.t)} — ${esc(s.r)}${upd}${s.u?` · <a href="${esc(s.u)}" target="_blank" rel="noopener">abrir la guía</a>`:s.k!=="book"?` · <a href="${pubmed(s.t)}" target="_blank" rel="noopener">buscar en PubMed</a>`:""}</span></div>` + citaHtml(item)
    + (st==="outdated" && !item.updated ? warn("Hay una versión más nueva de esta fuente; este dato podría haber cambiado. Revísalo en Fuentes → Vigencia.") : "") + marca;
  const how = item.ai ? " · generada con IA, verifícala" : item.auto ? " · generada automáticamente" : "";
  const pdf = s.kind==="pdf", where = item.page ? (s.apunte ? ` · punto ${item.page}` : s.kind==="text" ? ` · parte ${item.page}` : ` · pág. ${item.page}`) : "";
  return `<div class="srcline">${pdf?"📄":s.kind==="pack"?"📦":s.apunte?"📓":"📋"} <span>${esc(s.t)}${where}${how}${upd}${pdf?` · <button class="linkbtn" onclick="openPdf('${s.id}',${item.page||1})">abrir PDF</button>`:""}</span></div>`
    + (item.stale ? warn("Viene de la versión anterior de este PDF.") : st==="outdated" ? warn("Hay una versión más nueva de este documento.") : "") + marca;
}

// ---------- IndexedDB: guarda los PDF y su texto ----------
const idb = (()=>{
  let dbp;
  const db = () => dbp || (dbp = new Promise((res,rej)=>{
    let r; try { r = indexedDB.open("medipulse", 1); } catch(e) { dbp = null; return rej(e); }
    r.onupgradeneeded = () => r.result.createObjectStore("pdfs");
    r.onsuccess = () => res(r.result); r.onerror = () => { dbp = null; rej(r.error); };
  }));
  const mem = new Map(); let useMem = false;
  const memOp = (mode, fn) => { const s = {get: k=>({result: mem.get(k)}), put: (v,k)=>{ mem.set(k, v); return {}; }, delete: k=>{ mem.delete(k); return {}; }}; const r = fn(s); return Promise.resolve(r && r.result); };
  const tx = async (mode, fn) => {
    if (useMem) return memOp(mode, fn);
    let d; try { d = await db(); } catch(e) { useMem = true; return memOp(mode, fn); }
    return new Promise((res,rej)=>{
    const t = d.transaction("pdfs", mode), req = fn(t.objectStore("pdfs"));
    t.oncomplete = () => res(req && req.result); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error || new Error("Sin espacio de almacenamiento"));
  }); };
  return { get:id=>tx("readonly",s=>s.get(id)), put:(id,v)=>tx("readwrite",s=>s.put(v,id)), del:id=>tx("readwrite",s=>s.delete(id)) };
})();
const recCache = {};
async function getRec(id){ return recCache[id] || (recCache[id] = await idb.get(id)); }

async function openPdf(id, page){
  const r = await getRec(id).catch(()=>null);
  if (!r) return toast("Este PDF no está guardado en este dispositivo.");
  window.open(URL.createObjectURL(r.blob) + "#page=" + (page||1), "_blank", "noopener");
}

// ---------- pdf.js (incluido en vendor/, funciona sin internet) ----------
let pdfjsP = null;
// Lector de PDF: primero la copia incluida en la app (funciona sin internet); si no carga, una copia idéntica en un CDN.
const PDFJS_SOURCES = [
  {lib: "vendor/pdf.min.js", worker: "vendor/pdf.worker.min.js"},
  {lib: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", worker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"},
  {lib: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js", worker: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js"}
];
function loadScript(src){
  return new Promise((res, rej)=>{
    const s = document.createElement("script"); s.src = src;
    s.onload = ()=>res(); s.onerror = ()=>{ s.remove(); rej(new Error(src)); };
    document.head.appendChild(s);
  });
}
// En la versión de un solo archivo, las librerías vienen dentro del HTML (<script type="text/plain" id="vend-…">).
const vendorUrl = id => { const el = document.getElementById(id); if (!el) return "";
  const bin = atob(el.textContent.trim()), bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], {type: "text/javascript"})); };
function loadPdfJs(){
  return pdfjsP || (pdfjsP = (async ()=>{
    const failed = [];
    const inl = vendorUrl("vend-pdf");
    if (inl) {
      try { await loadScript(inl); pdfjsLib.GlobalWorkerOptions.workerSrc = vendorUrl("vend-pdfw"); return pdfjsLib; }
      catch(e) { failed.push("copia incluida en el archivo"); }
    }
    for (const src of PDFJS_SOURCES) {
      try {
        await loadScript(src.lib);
        if (!window.pdfjsLib) throw new Error(src.lib + " (no definió pdfjsLib)");
        pdfjsLib.GlobalWorkerOptions.workerSrc = src.worker;
        return pdfjsLib;
      } catch(e) { failed.push(e.message); }
    }
    pdfjsP = null;
    console.error("No cargó el lector de PDF desde:", failed);
    throw new Error("no se pudo cargar el lector de PDF. Revisa tu conexión y recarga la página; si sigue igual, abre la app desde " + APP_URL);
  })());
}
async function extractPages(buf, onProg){
  const lib = await loadPdfJs();
  const doc = await lib.getDocument({data: new Uint8Array(buf.slice(0))}).promise;
  const pages = [];
  for (let i=1; i<=doc.numPages; i++){
    const tc = await (await doc.getPage(i)).getTextContent();
    let s = ""; for (const it of tc.items) s += it.str + (it.hasEOL ? "\n" : " ");
    pages.push(s.replace(/[ \t]+/g," ").replace(/(\p{L})-\s*\n\s*(\p{Ll})/gu,"$1$2").replace(/\s*\n\s*/g,"\n").trim());
    onProg && onProg(i, doc.numPages);
  }
  return pages;
}

$("#pdfIn").onchange = async e => {
  const files = [...e.target.files]; e.target.value = "";
  for (const f of files) await addPdf(f, files.length===1);
  renderLib();
};
async function addPdf(f, openAfter, meta){
  const prog = $("#pdfProgress");
  try {
    prog.innerHTML = `<span class="spin"></span> Leyendo “${esc(f.name)}”…`;
    const buf = await f.arrayBuffer();
    const pages = await extractPages(buf, (i,n)=> prog.innerHTML = `<span class="spin"></span> Extrayendo texto de “${esc(f.name)}”: página ${i} de ${n}…`);
    const chars = pages.reduce((a,p)=>a+p.length, 0);
    const id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
    const rec = {blob: new Blob([buf], {type:"application/pdf"}), pages};
    await idb.put(id, rec); recCache[id] = rec;
    S.sources.push(Object.assign({id, title: f.name.replace(/\.pdf$/i,""), pages: pages.length, chars, added: Date.now(), spec: "Medicina Interna"}, meta || {}));
    save(); prog.innerHTML = "";
    toast(chars < pages.length*80 ? "PDF agregado, pero casi no tiene texto (¿es escaneado o escrito a mano?)." : "PDF agregado ✓");
    if (openAfter) openSrc(id);
    return id;
  } catch(err) {
    prog.innerHTML = `<span style="color:var(--bad)">No se pudo agregar “${esc(f.name)}”: ${esc(err && err.message || err)}</span>`;
  }
}

function itemsOfSource(id){
  return [...QUESTIONS.filter(q=>q.src===id).map(q=>({t:"q",id:q.id})), ...HYS.filter(h=>h.src===id).map(h=>({t:"h",id:h.id})), ...FLASH.filter(c=>c.src===id).map(c=>({t:"c",id:c.id}))];
}
function newUserItems(){
  return [...S.userQ.map(q=>({t:"q",id:q.id})), ...S.userH.map(h=>({t:"h",id:h.id})), ...S.userC.map(c=>({t:"c",id:c.id}))].filter(it=>!S.srs[it.t+it.id] && !S.hidden[it.t+it.id]);
}
function studySource(id){
  const s = srcInfo(id), items = itemsOfSource(id);
  if (!items.length) return toast("Esta fuente aún no tiene preguntas. Genera algunas primero.");
  const rank = it => { const k = it.t+it.id; return isDue(k) ? 0 : !S.srs[k] ? 1 : 2; };
  const sorted = shuffle(items).sort((a,b)=>rank(a)-rank(b)).slice(0,20);
  startSession({label:"Fuente", tag:"norm", stages:[{name: s.t.length>48 ? s.t.slice(0,48)+"…" : s.t, items: sorted}]});
}

function renderLib(){
  const docs = S.sources.slice().reverse();
  $("#myDocs").innerHTML = docs.length
    ? `<h3 style="font-size:15px;margin:4px 0 0">Tus documentos</h3>` + docs.map(s=>{
        const nq = S.userQ.filter(q=>q.src===s.id).length, nc = S.userC.filter(c=>c.src===s.id).length;
        const nh = S.userH.filter(h=>h.src===s.id).length, cuanto = s.apunte ? `${s.pages} puntos` : s.kind==="text" ? `${s.pages} parte${s.pages===1?"":"s"}` : s.kind==="pack" ? "pack" : `${s.pages} págs`;
        return `<div class="srcitem"><div class="ic">${s.apunte?"📓":s.kind==="text"?"📋":s.kind==="pack"?"📦":"📄"}</div><div style="flex:1;min-width:0"><b style="word-break:break-word">${esc(s.title)}</b><div class="xs muted">${cuanto} · ${nq} casos · ${nh} fichas${nc?` · ${nc} tarjetas`:""}</div></div><button class="btn" data-src="${s.id}">Abrir</button></div>`;
      }).join("")
    : `<p class="muted small" style="margin:0">Aún no tienes documentos. Empieza con el PDF de una guía de práctica clínica o con tus apuntes de una rotación.</p>`;
  document.querySelectorAll("[data-src]").forEach(b=>b.onclick=()=>openSrc(b.dataset.src));
  renderAiBox(); renderVigCard(); renderRepCard();
  const cnt = {}; [...BUILTIN_Q, ...BUILTIN_F, ...HY_CARDS].forEach(x=>{ if (x.src) cnt[x.src] = (cnt[x.src]||0) + 1; });
  $("#bsCount").textContent = `(${SOURCES.length})`; $("#bsChecked").textContent = SOURCES_CHECKED;
  $("#builtinSrc").innerHTML = SOURCES.slice().sort((a,b)=>b.y-a.y || (cnt[b.id]||0)-(cnt[a.id]||0)).map(s=>`
    <div class="srcitem"><div class="ic">${s.k==="book"?"📕":s.k==="article"?"📰":"📋"}</div>
      <div style="flex:1;min-width:0"><div class="small"><b>${esc(s.t)}</b></div><div class="xs muted">${esc(s.r)} · ${cnt[s.id]||0} ítems${s.k!=="book"?` · <a class="linkbtn" href="${pubmed(s.t)}" target="_blank" rel="noopener">PubMed</a>`:""}</div>${s.v?`<div class="xs" style="color:var(--warn);margin-top:2px">${esc(s.v)}</div>`:""}</div>
      <button class="btn" data-bsrc="${s.id}">Estudiar</button></div>`).join("");
  document.querySelectorAll("[data-bsrc]").forEach(b=>b.onclick=()=>studySource(b.dataset.bsrc));
}

function renderAiBox(){
  const k = getKey();
  $("#aiBox").innerHTML = k
    ? `<p class="small" style="margin:0">✓ Clave guardada en este dispositivo (termina en …${esc(k.slice(-4))}). Al generar desde un PDF puedes pedir <b>casos clínicos tipo examen</b> con explicación, perla y trampa.</p>
       <div style="margin-top:10px">${aiLevelHTML()}</div>
       <div class="row" style="margin-top:10px"><button class="btn ghost" id="keyDel" style="color:var(--bad)">Quitar clave</button><button class="btn ghost sm" data-go="guide">📖 Guía y solución de problemas</button></div>`
    : `<p class="small" style="margin:0 0 10px">Sin IA, la app crea <b>tarjetas de completar</b> con las frases que tienen datos clave: gratis y sin internet. Con una clave de la API de Claude también genera <b>casos clínicos tipo examen</b>.</p>
       <label class="fld">Clave de API de Anthropic<input type="password" id="keyIn" placeholder="sk-ant-…" autocomplete="off"></label>
       <div class="row" style="margin-top:10px"><button class="btn primary" id="keySave">Guardar clave</button></div>
       <p class="xs muted" style="margin:10px 0 0">Se guarda solo en este navegador y solo se envía a la API de Anthropic. Se paga aparte de Claude Pro/Max, por uso. Antes de cada acción la app muestra cuánto costará, aproximadamente.</p>
       <button class="btn sm" data-go="guide" style="margin-top:10px">📖 ¿No tienes clave? Guía paso a paso</button>`;
  $("#keySave") && ($("#keySave").onclick = ()=>{ const v = $("#keyIn").value.trim(); if (!/^sk-ant-/.test(v)) return toast("La clave debe empezar con sk-ant-"); setKey(v); renderAiBox(); toast(CAN_STORE ? "Clave guardada ✓" : "Clave lista para esta sesión. En la vista previa no se guarda al cerrar."); });
  $("#keyDel") && ($("#keyDel").onclick = ()=>{ if (confirm("¿Quitar la clave de este dispositivo?")) { setKey(""); renderAiBox(); } });
  bindAiLevel(renderAiBox);
}


function renderGuide(){
  $("#gdToKey").onclick = ()=>{ go("lib"); const k = $("#keyIn") || $("#aiBox"); k && k.scrollIntoView({behavior:"smooth", block:"center"}); $("#keyIn") && $("#keyIn").focus({preventScroll:true}); };
}
