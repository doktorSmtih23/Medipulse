// ===================================================================
// DETALLE DE FUENTE + GENERADOR
// ===================================================================
// ===================================================================
// TALLER DE PREGUNTAS: leer y crear · IA a medida · sugerencias
// ===================================================================
const MAX_AI_CHARS = 150000;
const TEXTO_LARGO = 50000;   // desde aquí se avisa que con IA tarda y no hay que bloquear la pantalla
const STOP = new Set(("a al ante bajo con contra de del desde durante e el en entre hacia hasta la las le les lo los mediante para por que se según sin sobre su sus tras un una unas unos y o u ni es son fue fueron ser está están como más menos muy también pero cuando donde porque cual cuales este esta estos estas ese esa esos esas aquel otro otra otros otras puede pueden entre the of and to in for with on by from at as is are was were be been this that these those an or not which their its it we our than into after before between during within without over under about also may can such these both each other more most than only per via vs").split(" "));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
// Cantidades iniciales de cada tipo: dependen del enfoque del estudiante (perfil.js).
const COUNTS_ENFOQUE = {conducta: {caso: 6, critica: 1, directa: 0, ficha: 3}, diagnostico: {caso: 6, critica: 1, directa: 0, ficha: 3},
  critica: {caso: 2, critica: 6, directa: 0, ficha: 2}, datos: {caso: 2, critica: 0, directa: 5, ficha: 5}};
const TEMPLATE_DEFAULT = () => ({counts: Object.assign({caso: 5, critica: 3, directa: 0, ficha: 3}, COUNTS_ENFOQUE[S.focus] || {}), level: "residencia", emph: [], lang: "es", instr: "", label: ""});

// Quita encabezados, pies de página y marcas de agua: líneas que se repiten en la mayoría de las páginas
// (p. ej. "Descargado para <nombre> (<correo>)…" o "www.revista.com Vol 407 2242"). Así no se envían datos
// personales a la IA ni ruido que no aporta. Los números se comparan como "#" para atrapar la numeración.
const WATERMARK = /descargado para|downloaded (for|by)|uso personal exclusivamente|for personal use only|no se permiten otros usos|all rights reserved|todos los derechos reservados/i;
const WATERMARK_NOSP = /descargadopara|downloadedfor|downloadedby|usopersonalexclusivamente|forpersonaluseonly|nosepermitenotrosusos/;
function stripRepeated(pages){
  // Sin números ni signos: así "2241 www.revista.com Vol 407" y "www.revista.com Vol 407 2242" cuentan como la misma línea.
  const key = l => norm(l.trim()).replace(/[\d.,·:;()\[\]–-]+/g, " ").replace(/\s+/g, " ").trim();
  const count = new Map();
  pages.forEach(p=>new Set(p.split("\n").map(key).filter(k=>k.length > 3)).forEach(k=>count.set(k, (count.get(k)||0) + 1)));
  const min = Math.max(3, Math.ceil(pages.length * 0.4));   // 40 %: algunos encabezados alternan entre páginas pares e impares
  const rep = pages.length >= 3 ? new Set([...count].filter(([k,n])=>n >= min).map(([k])=>k)) : new Set();
  // La marca de agua también se reconoce si la letra pequeña sale espaciada ("D e s c a r g a d o").
  const isMark = l => WATERMARK.test(l) || WATERMARK_NOSP.test(norm(l).replace(/\s+/g, ""));
  return pages.map(p=>p.split("\n").filter(l=>!rep.has(key(l)) && !isMark(l)).join("\n").trim());
}
// ¿La línea parece un título de sección? (corta, sin punto final, sin pinta de autor o afiliación)
function isHeading(l){
  const t = l.trim().replace(/^\d+(\.\d+)*\.?\s+/, "");
  if (t.length < 3 || t.length > 70 || /[.:;,]$/.test(t) || !/^[A-ZÁÉÍÓÚÑ]/.test(t)) return false;
  if (/^(fig(ure|ura)?|table|tabla|panel|abstract|resumen|keywords|palabras clave|doi|copyright|received|accepted|correspond|author|contributors|declaration|acknowledg|e-?mail|http|www\.)/i.test(t)) return false;
  if (/\b(prof|dr|md|phd|university|universidad|department|departamento|institute|instituto|hospital|cent(er|re|ro)|division|school|college|foundation|fundaci[oó]n|clinic|research|usa|uk)\b/i.test(t)) return false;
  if ((t.match(/\d/g)||[]).length > 4 || t.split(/\s+/).length > 9) return false;
  if ((t.match(/,/g)||[]).length >= 2 || /\b[A-Z]\.\s/.test(t) || /\bet al\b/i.test(t)) return false;
  const last = norm(t).split(/\s+/).pop();
  if (STOP.has(last)) return false;   // "…definition of", "…criteria for": es un renglón de párrafo, no un título
  return true;
}
// Renglón de prosa: largo y con mayoría de palabras en minúscula (descarta etiquetas de figuras y tablas).
function isProse(l){
  const w = (l || "").trim().split(/\s+/);
  return l && l.trim().length >= 35 && w.filter(x=>/^[a-záéíóúñ(]/.test(x)).length / w.length >= 0.5;
}
// Divide cada página en "cuerpo" y quita lo que no sirve para preguntas (referencias, afiliaciones, leyendas).
// Algunos PDF traen los signos mal codificados: ≥ sale como «ε», ≤ como «ω» o una flecha, y el texto
// leído ya no dice lo mismo que la página. Se buscan esos caracteres pegados a una cifra o caracteres
// imposibles (reemplazo o de uso privado). Con 3 o más casos se avisa y se pide a la IA no adivinar el signo.
const SIMB_RARO = /[εωϵ↑↓↗↘↔](?=\s?\d)|[\uFFFD\uE000-\uF8FF]/g;
function simbolosDanados(pages){
  let n = 0, ejemplo = ""; const pags = [];
  pages.forEach((p, i)=>{
    const ms = [...(p || "").matchAll(SIMB_RARO)]; if (!ms.length) return;
    n += ms.length; if (pags.length < 8) pags.push(i+1);
    if (!ejemplo) { const m = ms[0]; ejemplo = p.slice(Math.max(0, m.index - 18), m.index + 8).replace(/\s+/g, " ").trim(); }
  });
  return n >= 3 ? {n, pags, ejemplo} : null;
}
const NOTA_SIMBOLOS = "Nota: en este documento algunos signos junto a las cifras están dañados (aparecen caracteres como ε, ω, ↓ o ↑ donde debería ir ≥, ≤, < o >). No adivines el signo: escribe la cifra y agrega «(verificar el signo en el PDF)».";
function docInfo(id){
  const r = recCache[id]; if (!r) return null;
  if (r._info) return r._info;
  let refFrom = Infinity;
  const clean = stripRepeated(r.pages);
  const pages = clean.map((p, i)=>{
    if (i+1 > refFrom) return "";
    // "References" puede estar a mitad de página o en su primer renglón
    const m = p.match(/(^|\n)\s*(references|referencias|bibliograf[ií]a|bibliography|literature cited)\s*(\n|$)/i);
    if (m && i > 0) { refFrom = i+1; return p.slice(0, m.index); }
    return p;
  });
  // Títulos: una línea con pinta de título seguida de otra que empieza con mayúscula (un renglón de un
  // párrafo partido sigue en minúscula). Si después viene otro título, es una sección principal (nivel 1),
  // p. ej. "Neuropatología" → "Características y estadios"; esto funciona también en PDF a dos columnas.
  const heads = new Map();
  const st = (r.title || (cur() && cur().id === id && cur().title)) ? norm(r.title || cur().title) : "";
  pages.forEach((p, i)=>{
    const L = p.split("\n").map(x=>x.trim()).filter(Boolean);
    L.forEach((l, j)=>{
      if (!isHeading(l)) return;
      const n1 = L[j+1] || "", n2 = L[j+2] || "";
      // Después de un título viene prosa (subsección) o un subtítulo seguido de prosa (sección principal).
      const sub = n1 && /^[A-ZÁÉÍÓÚÑ]/.test(n1) && n1.split(/\s+/).length <= 9 && !/[.;:,]$/.test(n1) && !STOP.has(norm(n1).split(/\s+/).pop())
        && isProse(n2) && /^[A-ZÁÉÍÓÚÑ]/.test(n2) && !/^(fig|table|tabla|panel)/i.test(n2);
      const lvl = sub && /[a-záéíóúñ]{3}/.test(l) && l.split(/\s+/).length <= 6 && !/,/.test(l) ? 1 : isProse(n1) && /^[A-ZÁÉÍÓÚÑ0-9]/.test(n1) ? 2 : 0;
      if (!lvl) return;
      const t = l.replace(/^\d+(\.\d+)*\.?\s+/, "");
      if (st && (norm(t).includes(st.slice(0,30)) || st.includes(norm(t)) && t.length > 25)) return;   // el título del documento
      // La portada de algunas revistas trae la lista de secciones («Sections: Introduction, Epidemiology…»):
      // si el título vuelve a aparecer más adelante, vale esa página.
      const k = norm(t), prev = heads.get(k);
      if (!prev) heads.set(k, {t, page: i+1, lvl});
      else if (prev.page === 1 && i > 0) { heads.delete(k); heads.set(k, {t, page: i+1, lvl}); }
    });
  });
  // términos frecuentes (palabras y pares) como temas sugeridos
  const freq = new Map();
  pages.forEach(p=>{
    const w = norm(p).replace(/[^a-z0-9ñ\-\s]/g, " ").split(/\s+/).filter(x=>x.length>3 && !STOP.has(x) && !/^\d+$/.test(x));
    for (let i = 0; i < w.length; i++) {
      freq.set(w[i], (freq.get(w[i])||0) + 1);
      if (i+1 < w.length) { const b = w[i]+" "+w[i+1]; freq.set(b, (freq.get(b)||0) + 1.6); }
    }
  });
  const terms = [...freq.entries()].filter(([k,v])=>v >= 3).sort((a,b)=>b[1]-a[1]).map(([k])=>k)
    .filter((k,i,arr)=>!arr.slice(0,i).some(o=>o.includes(k) || k.includes(o))).slice(0, 10);
  r._info = {pages, clean, refFrom, heads: [...heads.values()].slice(0, 14), allHeads: [...heads.values()], terms, danados: simbolosDanados(pages)};
  return r._info;
}
function topicPages(id, topic){
  const info = docInfo(id); if (!info || !topic.trim()) return [];
  const words = norm(topic).split(/[^a-z0-9ñ\-]+/).filter(w=>w.length>2 && !STOP.has(w));
  if (!words.length) return [];
  return info.pages.map((p,i)=>{ const n = norm(p); return {page: i+1, hits: words.reduce((a,w)=>a + (n.split(w).length-1), 0)}; })
    .filter(x=>x.hits > 0).sort((a,b)=>b.hits-a.hits);
}

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
  $("#srcHead").innerHTML = `<div class="row" style="gap:6px"><span class="tag">${s.apunte ? `📓 Tus apuntes · ${s.pages} punto${s.pages===1?"":"s"}` : s.kind==="text" ? `Texto pegado · ${s.pages} parte${s.pages===1?"":"s"}` : s.kind==="pack" ? "Pack importado" : `PDF · ${s.pages} págs · versión ${s.version||1}`}</span>${badge(srcState(s.id))}</div>
    <h2 style="margin-top:8px;word-break:break-word">${esc(s.title)}</h2>
    <div class="xs muted" style="margin-top:4px">${esc([s.org, s.year].filter(Boolean).join(", ") || "Sin organización ni año")}${s.updated?` · versión nueva subida el ${fmtDate(s.updated)}`:""}${c?` · vigencia revisada el ${fmtDate(c.at)}`:""}</div>
    <div class="row" style="margin-top:10px;gap:6px">${s.apunte ? `<button class="btn primary sm" id="srcLib">📓 Ir a la libreta</button>` : ""}<button class="btn sm" id="srcOpen">📄 Abrir PDF</button><button class="btn sm" id="srcMeta">✏️ Datos</button><button class="btn sm" id="srcVer">⬆ Subir versión nueva</button>${getKey()?`<button class="btn sm" id="srcChk">🔎 ¿Hay versión más nueva?</button>`:""}<button class="btn sm" id="srcPack">📦 Exportar pack</button><button class="btn ghost sm" id="srcDel" style="color:var(--bad)">Eliminar</button></div>
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
  recs: ["⚡ Recomendaciones", "Lo que recomienda la guía en este tema, completo y con su clase."],
  ai: ["💎 Fichas y preguntas", "La IA arma fichas y preguntas del tema."],
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
      ${!ind ? `<p class="xs muted" style="margin:0"><span class="spin"></span> Buscando el índice…</p>` : `<div class="indice">
        <button class="ind-it${gen.tema==null && !gen.manual?" on":""}" data-tema="-1"><span>Todo el documento</span></button>
        ${items.map((x,i)=>`<button class="ind-it lvl${x.lvl}${gen.tema===i && !gen.manual?" on":""}" data-tema="${i}"><span>${esc(x.title)}</span><small>${x.from===x.to?`pág. ${x.from}`:`págs. ${x.from}–${x.to}`}</small></button>`).join("")}
      </div>
      <p class="xs muted" style="margin:0">${items.length ? IND_FUENTE[ind.fuente] + " Toca un tema para trabajar solo con él." : `No encontré un índice en este documento${getKey() ? "; puedes crearlo con IA (≈ US$0,01)" : ""}, o elige las páginas a mano.`}</p>`}
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
function refrescarIndice(){
  const box = $("#indBox"), d = box.querySelector("details"), abierto = d && d.open;
  const desde = $("#manFrom") && $("#manFrom").value, hasta = $("#manTo") && $("#manTo").value, foco = document.activeElement && document.activeElement.id;
  box.innerHTML = indiceHTML(); bindIndice();
  if (abierto) box.querySelector("details").open = true;
  if (desde != null) $("#manFrom").value = desde;
  if (hasta != null) $("#manTo").value = hasta;
  if (foco && /^man(From|To)$/.test(foco)) $("#" + foco).focus({preventScroll: true});
}
function renderGen(){
  const s = cur(), info = docInfo(s.id);
  if (!info) { $("#genCard").innerHTML = `<p class="small" style="margin:0;color:var(--bad)">No encuentro el texto de esta fuente en este dispositivo. Vuelve a agregarla.</p>`; return; }
  if (!s.indice && !gen.indCargando) { gen.indCargando = true; buildIndice(s).catch(()=>{}).then(()=>{ gen.indCargando = false; if (cur() === s && currentView === "src" && $("#indBox")) refrescarIndice(); }); }
  const t = temaActual(), sel = temaSel();
  const est = s.design || detectDesign(info.pages.slice(0, 6).join(" "));
  const chars = sel ? sel.pages.reduce((a, p)=>a + p.length, 0) : 0;
  const btn = k => `<button data-gt="${k}" class="${gen.tab===k?"on":""}"><b>${ACCIONES[k][0]}</b><span>${ACCIONES[k][1]}</span></button>`;
  $("#genCard").innerHTML = `
    <div class="row"><h3 style="font-size:16px">📚 Estudiar este documento</h3><div class="spacer"></div><span class="tag" title="${s.design ? "Según la IA" : "Estimado por palabras clave"}">${esc(DESIGNS[est] || DESIGNS.OTRO)}</span></div>
    ${info.danados ? `<div class="note trap" role="note"><b>⚠️ Este PDF tiene símbolos que no se leyeron bien</b> (por ejemplo «${esc(info.danados.ejemplo)}»). Los signos ≥, ≤, &lt; o &gt; pueden salir cambiados: revisa las cifras con signos en la página original.</div>` : ""}
    <div class="stack" style="gap:6px" id="indBox">${indiceHTML()}</div>
    <div class="note" style="margin:0"><b>Tema:</b> ${esc(t ? t.title : "Todo el documento")}${sel ? ` · ${pagesLabel(sel)}` : ""}</div>
    <div class="xs muted">Gratis</div>
    <div class="tabs3 acc2">${btn("read")}${btn("recs")}</div>
    <div class="xs muted">Con IA${getKey() ? ` · ${aiEstimateLine(Math.min(chars, AN_MAX_CHARS), {outTokens: 5000})} aprox. por acción · <button class="linkbtn" data-go="ahorro">💸 Cómo gastar menos</button>` : " · requiere tu clave"}</div>
    ${getKey() && chars > TEXTO_LARGO ? `<div class="note" style="margin:0">⏱️ <b>Texto largo</b> (${Math.round(chars/1000)} mil caracteres): con IA puede tardar 1–2 minutos y, mientras tanto, no bloquees la pantalla ni cambies de app. Para que sea más rápido y barato, elige un tema del índice.</div>` : ""}
    <div class="tabs3 acc4">${btn("ai")}${btn("audit")}${btn("tema")}${btn("revista")}</div>
    <div id="gBody" class="stack"></div>`;
  bindIndice();
  document.querySelectorAll("[data-gt]").forEach(b=>b.onclick=()=>{ gen.tab = b.dataset.gt; renderGen(); });
  ({read: renderReader, recs: renderRecs, ai: renderAiTab, audit: ()=>renderAnTab("audit"), tema: ()=>renderAnTab("tema"), revista: ()=>renderAnTab("revista")})[gen.tab]();
}

// El texto con el que trabaja la IA es el del tema elegido en el índice (indice.js).
const selectedText = () => temaSel();
const pagesLabel = sel => sel.nums.length > 1 && sel.nums.some((n,i)=>i && n !== sel.nums[i-1]+1) ? `págs. ${sel.nums.join(", ")}` : sel.nums.length > 1 ? `págs. ${sel.a}–${sel.b}` : `pág. ${sel.a}`;

// ---------- 🤖 IA a tu medida ----------
const QTYPES = [["caso","🩺 Casos clínicos","Viñeta tipo examen con 4 opciones"],["critica","🔬 Lectura crítica","Diseño, resultados, sesgos y aplicabilidad del estudio"],["directa","❓ Preguntas directas","Enunciado corto, sin caso clínico"],["ficha","💎 Fichas high-yield","Título, datos clave, bandera roja y trampa"]];
const LEVELS = [["basica","Básica","conceptos y definiciones"],["residencia","Examen de residencia","aplicación clínica y distractores plausibles"],["avanzada","Avanzada","subespecialidad: detalles finos, matices y controversias"]];
const EMPH = [["fisio","Mecanismo y fisiopatología"],["dx","Diagnóstico"],["tx","Tratamiento y dosis"],["result","Resultados y cifras del estudio"],["safety","Seguridad y efectos adversos"],["design","Diseño, sesgos y validez"],["pearls","Perlas y trampas de examen"]];
function renderAiTab(){
  const b = $("#gBody"), tpls = S.tpls || [];
  b.innerHTML = `
    ${getKey() ? "" : `<div class="warnbox small">Para generar con IA necesitas una clave de API. <button class="linkbtn" data-go="guide">Cómo conseguirla</button>. Mientras tanto, usa <b>📖 Leer y crear</b>.</div>`}
    ${focusOf().k !== "mixto" ? `<p class="xs" style="margin:0">🎯 <b>Tu enfoque: ${esc(focusOf().t)}.</b> La IA prioriza ese tipo en todo lo que crea, y las cantidades de abajo ya vienen ajustadas. Cámbialo en Hoy.</p>` : ""}
    <div class="autobox stack">
      <div><b>✨ Fichas automáticas</b><p class="xs muted" style="margin:4px 0 0">La IA lee el documento, decide qué es lo más relevante para tu examen y arma las fichas ordenadas por importancia, con el porqué de cada una. Tú solo revisas y guardas.</p></div>
      <div class="grid2"><label class="fld">Cuántas fichas<select id="aCount"><option value="auto">La IA decide (recomendado)</option><option>5</option><option>10</option><option>15</option></select></label></div>
      <label class="fld">Prioriza (opcional)<input type="text" id="aFocus" placeholder="p. ej. resultados de los ensayos y efectos adversos"></label>
      <div id="aEst" class="xs muted"></div>
      <button class="btn primary block" id="aGo" ${genBusy || !getKey() ? "disabled" : ""}>✨ Crear fichas automáticas</button>
      <div id="aStatus" class="small"></div>
    </div>
    <details class="custom" id="gCustomBox" ${gen.customOpen ? "open" : ""}><summary>⚙️ Personalizar: tema, tipos de pregunta, dificultad, enfoque…</summary><div class="stack" style="margin-top:12px">
    ${tpls.length ? `<div class="row" style="gap:6px"><span class="xs muted">Mis plantillas:</span>${tpls.map((t,i)=>`<button class="chip2" data-tpl="${i}">${esc(t.name)}</button>`).join("")}</div>` : ""}
    <div><div class="fld" style="margin-bottom:6px">¿Qué quieres que te pregunte? (cantidad de cada tipo)</div>
      <div class="qtypes">${QTYPES.map(([k,l,d])=>`<label class="qt"><span><b>${l}</b><small>${d}</small></span><input type="number" min="0" max="20" data-cnt="${k}" value="${gen.counts[k]}" aria-label="${l}"></label>`).join("")}</div></div>
    <div><div class="fld" style="margin-bottom:6px">Dificultad</div><div class="chips">${LEVELS.map(([k,l,d])=>`<button class="chip2${gen.level===k?" on":""}" data-lv="${k}" title="${d}">${l}</button>`).join("")}</div></div>
    <div><div class="fld" style="margin-bottom:6px">Enfoque (elige uno o varios)</div><div class="chips">${EMPH.map(([k,l])=>`<button class="chip2${gen.emph.includes(k)?" on":""}" data-em="${k}">${l}</button>`).join("")}</div></div>
    <div class="grid2">
      <label class="fld">Idioma de las preguntas<select id="gLang"><option value="es" ${gen.lang==="es"?"selected":""}>Español (conserva los términos técnicos)</option><option value="en" ${gen.lang==="en"?"selected":""}>Inglés</option></select></label>
      <label class="fld">Etiqueta del tema (opcional)<input type="text" id="gLabel" value="${esc(gen.label)}" placeholder="p. ej. Neurología · Parkinson"></label>
    </div>
    <label class="fld">Instrucciones adicionales (opcional)<textarea id="gInstr" rows="3" placeholder="p. ej. “Pregúntame como en el examen de la UdeA”, “enfócate en los ensayos con AAV2-GAD”, “incluye una pregunta sobre por qué falló el ensayo fase III”">${esc(gen.instr)}</textarea></label>
    <div class="row" style="gap:6px"><button class="btn ghost sm" id="gSaveTpl">💾 Guardar como plantilla</button>${tpls.length ? `<button class="btn ghost sm" id="gDelTpl">🗑 Borrar plantillas</button>` : ""}</div>
    <div id="gEst" class="xs muted"></div>
    <button class="btn primary block" id="gGo" ${genBusy || !getKey() ? "disabled" : ""}>Generar con IA</button>    <div id="gStatus" class="small"></div></div></details>`;
  b.querySelectorAll("[data-cnt]").forEach(i=>i.oninput = ()=>{ gen.counts[i.dataset.cnt] = Math.max(0, Math.min(20, parseInt(i.value)||0)); updEstimate(); });
  b.querySelectorAll("[data-lv]").forEach(x=>x.onclick = ()=>{ gen.level = x.dataset.lv; b.querySelectorAll("[data-lv]").forEach(y=>y.classList.toggle("on", y===x)); });
  b.querySelectorAll("[data-em]").forEach(x=>x.onclick = ()=>{ const k = x.dataset.em, i = gen.emph.indexOf(k); i>=0 ? gen.emph.splice(i,1) : gen.emph.push(k); x.classList.toggle("on", i<0); });
  $("#gLang").onchange = ()=>{ gen.lang = $("#gLang").value; };
  $("#gLabel").oninput = ()=>{ gen.label = $("#gLabel").value; };
  $("#gInstr").oninput = ()=>{ gen.instr = $("#gInstr").value; };
  b.querySelectorAll("[data-tpl]").forEach(x=>x.onclick = ()=>{ const t = S.tpls[+x.dataset.tpl]; Object.assign(gen, JSON.parse(JSON.stringify({counts: t.counts, level: t.level, emph: t.emph, lang: t.lang, instr: t.instr, label: t.label})));
    if (gen.counts.ficha == null) { gen.counts.ficha = gen.counts.tarjeta || 0; delete gen.counts.tarjeta; } renderAiTab(); toast(`Plantilla “${t.name}” aplicada`); });
  $("#gSaveTpl").onclick = ()=>{
    const name = prompt("Nombre de la plantilla", gen.label || "Mi plantilla"); if (!name || !name.trim()) return;
    S.tpls = (S.tpls || []).filter(t=>t.name !== name.trim());
    S.tpls.push(JSON.parse(JSON.stringify({name: name.trim(), counts: gen.counts, level: gen.level, emph: gen.emph, lang: gen.lang, instr: gen.instr, label: gen.label})));
    save(); renderAiTab(); toast("Plantilla guardada ✓");
  };
  $("#gDelTpl") && ($("#gDelTpl").onclick = ()=>{ if (confirm("¿Borrar todas tus plantillas?")) { S.tpls = []; save(); renderAiTab(); } });
  $("#gGo").onclick = runGenerate;
  bindAuto();
  updEstimate();
}
const autoSel = () => temaSel();
function estAuto(){
  const el = $("#aEst"); if (!el) return;
  const sel = autoSel(); if (!sel) { el.textContent = ""; return; }
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars > MAX_AI_CHARS) { el.innerHTML = `<span style="color:var(--bad)">El documento es muy largo para leerlo completo de una vez. Elige un tema del índice.</span>`; return; }
  el.textContent = `${pagesLabel(sel)} · costo aprox. ${aiEstimateLine(chars, {outTokens: 12*400 + 6000})} (se cobra a tu cuenta de Anthropic).`;
}
function bindAuto(){
  $("#aCount").value = gen.aCount || "auto"; $("#aFocus").value = gen.aFocus || "";
  $("#aCount").onchange = ()=>{ gen.aCount = $("#aCount").value; };
  $("#aFocus").oninput = ()=>{ gen.aFocus = $("#aFocus").value; };
  $("#gCustomBox").ontoggle = ()=>{ gen.customOpen = $("#gCustomBox").open; };
  $("#aGo").onclick = runAuto;
  estAuto();
}
async function runAuto(){
  if (genBusy) return;
  const st = $("#aStatus"), s = cur();
  if (!getKey()) { toast("Primero guarda tu clave de API en Fuentes."); return go("lib"); }
  const sel = autoSel();
  if (!sel) return st.innerHTML = `<span style="color:var(--bad)">No encuentro el texto en este dispositivo. Vuelve a agregar la fuente.</span>`;
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars < 200) return st.innerHTML = `<span style="color:var(--bad)">El documento no tiene texto que se pueda leer.</span>`;
  if (chars > MAX_AI_CHARS) return st.innerHTML = `<span style="color:var(--bad)">Es demasiado texto: elige un tema del índice.</span>`;
  genBusy = true; $("#aGo").disabled = true;
  try {
    st.innerHTML = `<span class="spin"></span> Claude está leyendo las ${pagesLabel(sel)} y eligiendo lo más relevante para tu examen. Puede tardar 1–3 minutos; no cierres la app.`;
    cands = await aiGenerate(sel, s.title, autoAsk({count: gen.aCount || "auto", focus: gen.aFocus || ""}));
    st.innerHTML = cands.length ? "" : `<span style="color:var(--warn)">La IA no encontró información high-yield en ese texto.</span>`;
  } catch(err) {
    st.innerHTML = `<span style="color:var(--bad)">${esc(err.userMsg || ("No se pudo generar: " + (err.message || err)))}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button>`;
  } finally { genBusy = false; const b = $("#aGo"); if (b) b.disabled = false; }
  renderReview();
  if (cands && cands.length) $("#reviewBox").scrollIntoView({behavior:"smooth", block:"start"});
}
function updEstimate(){
  const el = $("#gEst"); if (!el) return;
  const sel = selectedText(); if (!sel) { el.textContent = ""; return; }
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars < 200) { el.innerHTML = `<span style="color:var(--warn)">Esas páginas casi no tienen texto seleccionable (¿PDF escaneado o solo imágenes?).</span>`; return; }
  if (gen.tab === "ai") {
    if (chars > MAX_AI_CHARS) { el.innerHTML = `<span style="color:var(--bad)">Es demasiado texto para una sola vez (${Math.round(chars/1000)} mil caracteres). Elige menos páginas o un tema más concreto.</span>`; return; }
    const c = gen.counts, nq = c.caso + c.critica + c.directa, est = aiEstimateLine(chars, {outTokens: nq*700 + c.ficha*400 + 4000});
    el.textContent = `${pagesLabel(sel)} · ${nq} preguntas y ${c.ficha} fichas · costo aprox. ${est} (se cobra a tu cuenta de Anthropic).`;
  } else el.textContent = `${pagesLabel(sel)} · ${Math.round(chars/1000)} mil caracteres para analizar.`;
}

// ¿La cita está en el documento? Se comparan solo letras y números (el PDF parte palabras, cambia
// espacios o intercala números de referencia). Si no está completa, basta con que aparezcan casi todos
// sus tramos de 5 palabras.
const soloLetras = t => String(t).toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");
function citaEnTexto(cita, texto){
  const T = soloLetras(texto), c = soloLetras(cita);
  if (c.length < 12) return false;
  if (T.includes(c)) return true;
  const w = String(cita).split(/\s+/).filter(Boolean); if (w.length < 6) return false;
  const tramos = []; for (let i = 0; i + 5 <= w.length; i += 3) tramos.push(soloLetras(w.slice(i, i + 5).join(" ")));
  return tramos.filter(t => T.includes(t)).length / tramos.length >= 0.8;
}
// Frases copiadas tal cual del documento que respaldan el ítem, con su página. La app comprueba que estén en el PDF.
const CITAS_T = {type:"array", items:{type:"object", additionalProperties:false, required:["texto","page"], properties:{texto:{type:"string"}, page:{type:"integer"}}}};
const GEN_SCHEMA = {
  type:"object", additionalProperties:false, required:["questions","fichas"],
  properties:{
    questions:{type:"array", items:{type:"object", additionalProperties:false,
      required:["qtype","specialty","area","topic","vignette","options","correct","whyCorrect","pearl","trap","page","citas"],
      properties:{qtype:{type:"string", enum:["caso","critica","directa"]}, specialty:{type:"string", enum:SPECS}, area:{type:"string"}, topic:{type:"string"}, vignette:{type:"string"}, citas:CITAS_T,
        options:{type:"array", items:{type:"string"}}, correct:{type:"integer"}, whyCorrect:{type:"string"},
        pearl:{type:"string"}, trap:{type:"string"}, page:{type:"integer"}}}},
    fichas:{type:"array", items:{type:"object", additionalProperties:false, required:["specialty","area","title","badge","thresholds","redFlag","trap","relevance","why","page","citas"],
      properties:{specialty:{type:"string", enum:SPECS}, area:{type:"string"}, title:{type:"string"}, badge:{type:"string"}, citas:CITAS_T,
        thresholds:{type:"array", items:{type:"object", additionalProperties:false, required:["label","val"], properties:{label:{type:"string"}, val:{type:"string"}}}},
        redFlag:{type:"string"}, trap:{type:"string"}, relevance:{type:"integer"}, why:{type:"string"}, page:{type:"integer"}}}}
  }
};
const GEN_SYSTEM = `Eres un profesor de medicina que prepara a médicos para el examen de residencia y para su práctica. Redactas preguntas a partir de un documento que te entrega el médico: puede ser una guía, un artículo original, un ensayo clínico, una revisión o sus apuntes.

Reglas:
- Usa solo información que aparezca en el documento. No agregues datos de otras fuentes. Si el texto no alcanza para la cantidad pedida, genera menos ítems.
- Respeta exactamente el tema, los tipos, las cantidades, la dificultad, el enfoque, el idioma y las instrucciones que pida el médico. Sus instrucciones tienen prioridad sobre tus preferencias de estilo.
- En "page" indica la página de donde sale cada ítem, según las marcas [pág. N] del documento.
- Cada pregunta tiene "qtype":
  - "caso": viñeta clínica breve y realista (edad, sexo, cuadro y datos clave) que termina en una pregunta.
  - "critica": pregunta de lectura crítica sobre el estudio del documento (diseño, población, intervención, desenlaces, resultados con sus cifras, sesgos, validez y aplicabilidad). El enunciado puede citar el estudio.
  - "directa": enunciado corto de conocimiento, sin caso clínico.
  El enunciado va en "vignette". Exactamente 4 opciones plausibles y una sola correcta; "correct" es el índice (0 a 3) de la correcta. Reparte la posición de la respuesta correcta. "whyCorrect" explica en 2 a 4 frases por qué es la correcta y por qué fallan las otras. "pearl" es el dato para memorizar. "trap" es el error típico. "topic" es el tema en pocas palabras.
- Fichas high-yield: "title" es el tema concreto de la ficha (que se entienda sin leer el documento); "badge" una etiqueta corta (p. ej. "Ensayo fase II", "Umbral", "Algoritmo"); "thresholds" de 2 a 4 datos clave, cada uno con "label" (qué es, corto) y "val" (el dato exacto: cifra, dosis, criterio, fármaco o resultado); "redFlag" la señal de alarma o el hallazgo que no se puede pasar por alto (vacío si no aplica); "trap" el error típico o el distractor favorito (vacío si no aplica); "relevance" de 1 a 5 según qué tan probable es que se pregunte en el examen o cambie la conducta clínica (5 = imprescindible); "why" una frase que explique por qué es high-yield.
- Qué es high-yield: umbrales y puntos de corte, criterios diagnósticos, tratamiento de primera línea y dosis, contraindicaciones, banderas rojas, resultados principales de los estudios con sus cifras, y lo que cambió frente a la práctica o la guía anterior. No es high-yield: autores, financiación, detalles metodológicos menores, antecedentes históricos ni datos que no cambian decisiones.
- No hagas preguntas sobre autores, revistas, financiación ni la estructura del documento, salvo que el médico lo pida.
- "specialty" es la más cercana de la lista permitida; "area" es la especialidad o subespecialidad real del tema (p. ej. Neurología, Psiquiatría, Infectología, Dermatología).
- "citas": de 1 a 3 frases copiadas textualmente del documento, sin cambiar ni una palabra (máximo 300 caracteres cada una), que respalden los datos del ítem; cada una con su "page". Si el ítem junta datos de varias páginas, incluye una cita de cada página. "page" es la página principal.
- "whyCorrect", "pearl", "trap", "why" y "redFlag" también deben salir del documento. Si el documento no menciona una trampa, una bandera roja o por qué algo es importante, deja ese campo vacío: no lo completes con conocimiento propio.
- Texto plano, sin markdown ni LaTeX.`;
// Petición para que la IA elija por sí misma lo más relevante
function autoAsk(o){
  o = o || {};
  const lang = gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos del documento tal como aparecen.";
  let what;
  if (o.fragment) what = `El médico seleccionó este fragmento de la pág. ${o.page}: «${o.fragment.slice(0, 1500)}».\nCrea 1 ficha high-yield centrada en ese fragmento; complétala con los datos relevantes de la misma página que lo expliquen o le den contexto. Si el fragmento no tiene nada relevante, usa lo más relevante de la página.`;
  else if (o.page) what = `Analiza esta página y crea entre 1 y 4 fichas high-yield con lo más relevante, según cuánta información importante tenga (no rellenes).`;
  else what = `Analiza todo el documento y decide qué información es high-yield. Crea ${o.count && o.count !== "auto" ? `${o.count} fichas high-yield (o menos si no hay suficiente información relevante)` : "entre 3 y 12 fichas high-yield, según cuánta información relevante tenga el documento (no rellenes)"}. Cada ficha agrupa datos de un mismo tema; ordénalas de mayor a menor relevancia.`;
  return [what, "No generes preguntas (deja \"questions\" vacío).", o.focus && o.focus.trim() ? `El médico pide priorizar: ${o.focus.trim()}.` : "", lang].filter(Boolean).join("\n") + focusLine();
}
function genAsk(){
  const c = gen.counts, lv = LEVELS.find(l=>l[0]===gen.level), em = EMPH.filter(e=>gen.emph.includes(e[0])).map(e=>e[1].toLowerCase());
  const lines = [
    gen.topic.trim() ? `Tema: ${gen.topic.trim()}. Pregunta solo sobre este tema.` : "Tema: el contenido de las páginas entregadas.",
    "Genera:",
    c.caso ? `- ${c.caso} preguntas con qtype "caso".` : "", c.critica ? `- ${c.critica} preguntas con qtype "critica".` : "", c.directa ? `- ${c.directa} preguntas con qtype "directa".` : "",
    c.ficha ? `- ${c.ficha} fichas high-yield.` : "- Ninguna ficha (deja \"fichas\" vacío).",
    (c.caso + c.critica + c.directa) ? "" : "- Ninguna pregunta (deja \"questions\" vacío).",
    `Dificultad: ${lv[1]} (${lv[2]}).`,
    em.length ? `Enfoque: ${em.join(", ")}.` : "",
    gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos del documento (genes, vectores, fármacos, escalas) tal como aparecen.",
    gen.instr.trim() ? `Instrucciones del médico: ${gen.instr.trim()}` : ""
  ];
  return lines.filter(Boolean).join("\n") + focusLine();
}
// Preguntas y ficha a partir de una imagen (recorte de la página o captura subida).
function aiGenerateImage(dataUrl, ctx){
  const ask = [`El médico eligió esta imagen${ctx.page ? ` de la pág. ${ctx.page}` : ""} del documento: puede ser un algoritmo, una tabla, una gráfica o una figura.`,
    "Crea 1 ficha high-yield con lo que muestra la imagen y hasta 2 preguntas (qtype \"caso\" o \"directa\") que evalúen entenderla y aplicarla; el estudiante verá la imagen junto a la pregunta.",
    "Usa solo lo que se ve en la imagen. Si no tiene información médica útil, o si es texto escrito a mano (apuntes, cuaderno, notas de tableta), no lo transcribas: deja \"fichas\" y \"questions\" vacíos.",
    gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos tal como aparecen."].join("\n") + focusLine();
  return aiGenerate({nums: [ctx.page || 1], pages: [""]}, ctx.title || "", ask, dataUrl);
}
async function aiGenerate(sel, title, ask, imagen){
  const Anthropic = await loadSDK();
  const client = new Anthropic({apiKey: getKey(), dangerouslyAllowBrowser: true});
  const doc = sel.pages.map((p,i)=>`[pág. ${sel.nums[i]}]\n${p}`).join("\n\n");
  let msg;
  const {params, level} = aiParams();
  const soltar = await pantallaEncendida();
  try {
    // El documento va en un bloque guardado en caché: si se generan más ítems del mismo texto en unos minutos, se cobra ~5–10 % de la lectura.
    const stream = client.beta.messages.stream(Object.assign({
      max_tokens: 32000,
      output_config: {effort: "medium", format: {type: "json_schema", schema: GEN_SCHEMA}},
      system: GEN_SYSTEM,
      messages: [{role: "user", content: imagen ? [
        {type: "image", source: {type: "base64", media_type: "image/jpeg", data: imagen.split(",")[1]}},
        {type: "text", text: `Imagen tomada de «${title.replace(/"/g,"'")}».\n\n${ask}`}] : [
        {type: "text", text: `<documento titulo="${title.replace(/"/g,"'")}">\n${doc}\n</documento>`, cache_control: {type: "ephemeral"}},
        {type: "text", text: (cur() && docInfo(cur().id) && docInfo(cur().id).danados ? NOTA_SIMBOLOS + "\n" : "") + (ask || genAsk())}]}]
    }, params));
    msg = await stream.finalMessage();
  } catch(e) { throw apiErr(Anthropic, e); }
  finally { soltar(); }
  aiRecord(level, addUsage({}, msg.usage), imagen ? "Analizar imagen" : "Generar con IA");
  if (msg.stop_reason === "refusal") throw uerr("La IA no procesó este texto. Prueba con otras páginas.");
  if (msg.stop_reason === "max_tokens") throw uerr("La respuesta quedó incompleta. Pide menos preguntas o menos páginas.");
  const txt = msg.content.filter(b=>b.type==="text").map(b=>b.text).join("");
  let data; try { data = JSON.parse(txt); } catch(e) { throw uerr("La respuesta de la IA no tuvo el formato esperado. Inténtalo de nuevo."); }
  const fixPage = p => sel.nums.includes(+p) ? +p : sel.nums[0];
  const textoDoc = cur() && recCache[cur().id] ? recCache[cur().id].pages.join("\n") : sel.pages.join("\n");
  const citas = x => (Array.isArray(x.citas) ? x.citas : []).filter(c => c && okStr(c.texto)).slice(0, 3)
    .map(c => ({texto: c.texto.trim(), page: fixPage(c.page), ok: imagen ? null : citaEnTexto(c.texto, textoDoc)}));
  const paginas = (x, cs) => [...new Set([fixPage(x.page), ...cs.map(c => c.page)])].sort((a, b) => a - b);
  const okStr = v => typeof v === "string" && v.trim().length > 0;
  const lab = gen.label.trim(), withLab = t => lab ? (t ? `${lab} · ${t}` : lab) : t;
  const qs = (data.questions||[]).filter(q=>okStr(q.vignette) && Array.isArray(q.options) && q.options.length===4 && q.options.every(okStr) && Number.isInteger(q.correct) && q.correct>=0 && q.correct<4)
    .map(q=>{ const cs = citas(q); return {kind:"q", on:true, qtype: ["caso","critica","directa"].includes(q.qtype) ? q.qtype : "caso", specialty: SPECS.includes(q.specialty)?q.specialty:"Medicina Interna", area: (q.area||"").trim(), topic:withLab(q.topic||""), vignette:q.vignette, options:q.options, correct:q.correct, whyCorrect:q.whyCorrect||"", pearl:q.pearl||"", trap:q.trap||"", page:fixPage(q.page), pages: paginas(q, cs), citas: cs}; });
  const hs = (data.fichas||[]).filter(h=>okStr(h.title) && Array.isArray(h.thresholds) && h.thresholds.length && h.thresholds.every(x=>x && okStr(x.label) && okStr(x.val)))
    .map(h=>{ const cs = citas(h); return {kind:"h", on:true, specialty: SPECS.includes(h.specialty)?h.specialty:"Medicina Interna", area: (h.area||"").trim(), title:withLab(h.title), badge:h.badge||"", thresholds:h.thresholds.slice(0,6).map(x=>({label:x.label, val:x.val})), redFlag:h.redFlag||"", trap:h.trap||"", relevance: Math.max(1, Math.min(5, parseInt(h.relevance)||3)), why: h.why||"", page:fixPage(h.page), pages: paginas(h, cs), citas: cs}; })
    .sort((a,b)=>b.relevance-a.relevance);
  return [...qs, ...hs];
}

// ---------- utilidades de texto (las usan las recomendaciones de indice.js) ----------
const KEYW = /(primera l[ií]nea|de elecci[oó]n|tratamiento|diagn[oó]stic|contraindicad|est[aá]ndar de oro|gold standard|se define|causa m[aá]s|signo|criterio|indicad|ant[ií]doto|factor(?:es)? de riesgo|complicaci[oó]n|m[aá]s frecuente|patognom|meta|objetivo|dosis|umbral|sospech|urgencia|significant|improv|reduc|increas|efficacy|safety|adverse|primary (?:end ?point|outcome)|randomi[sz]ed|trial|ensayo|eficacia|seguridad|adverso|desenlace)/i;
const JUNK = /(doi|https?:|www\.|©|copyright|e-?mail|@|received|accepted|published|correspond|affiliat|department of|university|universidad|hospital de|licen[cs]e|funding|conflict|et al\.?\s*\(|^fig(ure|ura)?\.?\s|^table|^tabla)/i;
const cleanSent = s => s.replace(/\[\d+(?:[,–-]\s*\d+)*\]/g, "").replace(/\((?:\d+(?:[,–-]\s*\d+)*)\)/g, "").replace(/(\D)\d{1,3}(?:[,–-]\d{1,3})+(?=[\s.,;])/g, "$1").replace(/\s{2,}/g, " ").trim();

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

// ---------- ⚡ Datos clave (sin internet) ----------
async function runGenerate(){
  if (genBusy) return;
  const st = $("#gStatus"), s = cur();
  if (gen.tab === "ai" && !getKey()) { toast("Primero guarda tu clave de API en Fuentes."); return go("lib"); }
  const sel = selectedText();
  if (!sel) return st.innerHTML = `<span style="color:var(--bad)">No encuentro el texto en este dispositivo. Vuelve a agregar la fuente.</span>`;
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars < 200) return st.innerHTML = `<span style="color:var(--bad)">Esas páginas no tienen texto que se pueda leer.</span>`;
  if (chars > MAX_AI_CHARS) return st.innerHTML = `<span style="color:var(--bad)">Demasiado texto: elige menos páginas o un tema más concreto.</span>`;
  const c = gen.counts; if (!(c.caso + c.critica + c.directa + c.ficha)) return st.innerHTML = `<span style="color:var(--bad)">Pide al menos una pregunta o una ficha.</span>`;
  genBusy = true; $("#gGo").disabled = true;
  try {
    st.innerHTML = `<span class="spin"></span> Claude está leyendo las ${pagesLabel(sel)}${gen.topic.trim() ? ` sobre “${esc(gen.topic.trim())}”` : ""} y redactando lo que pediste. Puede tardar 1–3 minutos; no cierres la app.`;
    cands = await aiGenerate(sel, s.title);
    st.innerHTML = "";
  } catch(err) {
    st.innerHTML = `<span style="color:var(--bad)">${esc(err.userMsg || ("No se pudo generar: " + (err.message || err)))}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button>`;
  } finally { genBusy = false; const b = $("#gGo"); if (b) b.disabled = false; }
  renderReview();
  if (cands) $("#reviewBox").scrollIntoView({behavior:"smooth", block:"start"});
}

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
  if (!cands.length) { box.innerHTML = `<div class="card"><p class="small" style="margin:0">No encontré frases útiles${gen && gen.topic ? ` sobre “${esc(gen.topic)}”` : ""} en esas páginas. Prueba otro tema u otras páginas, o crea tus tarjetas en <b>📖 Leer y crear</b>.</p></div>`; return; }
  const on = cands.filter(c=>c.on).length, hasAI = cands.some(c=>c.kind==="q" || c.ai);
  box.innerHTML = `<div class="card">
    <div class="row"><h3 style="font-size:16px">Revisa antes de guardar</h3><div class="spacer"></div><span class="xs muted" id="candCount">${on}/${cands.length} seleccionadas</span></div>
    <p class="xs muted" style="margin:4px 0 6px">Desmarca lo que no sirva y corrige lo que quieras.${hasAI ? " La IA puede equivocarse: compara con la página indicada." : ""}</p>
    ${(n => n ? `<div class="note trap xs" style="margin:0 0 8px">⚠️ <b>${n} ítem${n===1?"":"s"}</b> con citas que no aparecen en el PDF: la IA pudo haber inventado o cambiado algo. Revísalos antes de guardar.</div>` : "")(cands.filter(c => (c.citas||[]).some(x => x.ok === false)).length)}
    <div id="candList">${cands.map((c,i)=> c.kind==="h" ? `
      <div class="cand ${c.on?"":"off"}" id="cand${i}"><input type="checkbox" data-ci="${i}" ${c.on?"checked":""} aria-label="Incluir">
        <div class="stack" style="min-width:0;gap:6px">
          <div class="xs muted">💎 Ficha high-yield · ${pagsTxt(c)}${c.area ? ` · Área: ${esc(c.area)}` : ""}</div>
          ${imgTag(c.img)}<div id="hp${i}">${hyPrevHTML(c)}</div>
          ${citasRevHTML(c)}${marcaHTML(c)}
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
          <div class="xs muted">🃏 Tarjeta · ${esc(c.specialty)} · pág. ${c.page}</div>
        </div></div>` : `
      <div class="cand ${c.on?"":"off"}" id="cand${i}"><input type="checkbox" data-ci="${i}" ${c.on?"checked":""} aria-label="Incluir">
        <div style="min-width:0">
          <div class="xs muted">${qtLabel(c.qtype)} · ${esc(c.specialty)}${c.area ? ` (${esc(c.area)})` : ""} · ${esc(c.topic)} · ${pagsTxt(c)}</div>
          ${imgTag(c.img)}<p class="small" style="margin:6px 0">${esc(c.vignette)}</p>
          <ol type="A" class="small" style="margin:0;padding-left:22px">${c.options.map((o,j)=>`<li style="${j===c.correct?"color:var(--ok);font-weight:700":""}">${esc(o)}${j===c.correct?" ✓":""}</li>`).join("")}</ol>
          <p class="xs muted" style="margin:6px 0 0">${esc(c.whyCorrect)}</p>
          ${citasRevHTML(c)}${marcaHTML(c)}
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
    const id = "u" + (++S.seq);
    if (c.kind === "h") {
      const rows = c.thresholds.map(x=>({label:x.label.trim(), val:x.val.trim()})).filter(x=>x.label && x.val);
      if (!c.title.trim() || !rows.length) return;
      S.userH.push(Object.assign({id, specialty:c.specialty, title:c.title.trim(), badge:c.badge, accent:SPEC_COLOR[c.specialty], thresholds:rows, redFlag:c.redFlag.trim(), trap:c.trap.trim(), relevance:c.relevance||0, why:c.why||"", ctx:"", src:s.id, page:c.page, ai:true, img:c.img||undefined}, extrasIA(c)));
      nh++;
    } else if (c.kind === "c") {
      if (!c.front.trim() || !c.back.trim()) return;
      S.userC.push({id, specialty:c.specialty, front:c.front.trim(), back:c.back.trim(), ctx:c.ctx||"", src:s.id, page:c.page, ai:!!c.ai, auto:!c.ai});
      nc++;
    } else {
      S.userQ.push(Object.assign({id, qtype:c.qtype||"caso", tipo:c.tipo||undefined, specialty:c.specialty, topic:c.topic, difficulty:"IA", vignette:esc(c.vignette), options:c.options, correct:c.correct,
        whyCorrect:c.whyCorrect, pearl:c.pearl, trap:c.trap, src:s.id, page:c.page, ai:true, img:c.img||undefined}, extrasIA(c)));
      nq++;
    }
  });
  rebuild(); save(); cands = null;
  toast(`Guardado: ${[nq ? `${nq} pregunta${nq===1?"":"s"}` : "", nh ? `${nh} ficha${nh===1?"":"s"}` : ""].filter(Boolean).join(" y ") || "nada"} ✓ Ya está en tu repaso.`);
  renderSrc(); refreshChips();
}



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
  const partes = [qs.length && `${qs.length} pregunta${qs.length===1?"":"s"}`, hs.length && `${hs.length} ficha${hs.length===1?"":"s"}`, cs.length && `${cs.length} tarjeta${cs.length===1?"":"s"}`].filter(Boolean).join(" · ");
  const estados = [["nueva","nuevas"],["toca repasar","para repasar"],["en repaso","en repaso"],["dominada","dominadas"]].map(([k,t])=>cuenta(k) ? `${cuenta(k)} ${t}` : "").filter(Boolean).join(" · ");
  box.innerHTML = `<div class="row"><h3 style="font-size:16px">En tu banco</h3><div class="spacer"></div><button class="btn primary" id="srcStudy">Estudiar esta fuente (${rows.length})</button></div>
    <p class="small" style="margin:6px 0 0">${partes}</p><p class="xs muted" style="margin:2px 0 0">${estados}</p>
    <details class="srclista" ${abierta ? "open" : ""}><summary class="small">Ver la lista (${rows.length})</summary>
    <div style="margin-top:8px">${rows.map(x=>`
      <div class="srcitem"><div style="flex:1;min-width:0" class="small">${esc(x.t)}<div class="xs muted">${x.p ? "pág. " + x.p + " · " : ""}${status(x.k)}${x.o.stale?' · <span style="color:var(--warn)">versión anterior</span>':""}${x.o.updated?" · actualizado":""}</div></div><button class="btn ghost xs" data-del="${x.k}" aria-label="Eliminar" style="color:var(--bad)">✕</button></div>`).join("")}</div></details>`;
  $("#srcStudy").onclick = ()=>studySource(s.id);
  box.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
    const k = b.dataset.del, id = k.slice(1);
    if (k[0]==="q") S.userQ = S.userQ.filter(q=>q.id!==id); else if (k[0]==="h") S.userH = S.userH.filter(h=>h.id!==id); else S.userC = S.userC.filter(c=>c.id!==id);
    delete S.srs[k]; rebuild(); save(); renderSrcItems(); refreshChips();
  });
}

async function deleteSource(id){
  const s = S.sources.find(x=>x.id===id); if (!s) return;
  const n = S.userQ.filter(q=>q.src===id).length + S.userC.filter(c=>c.src===id).length + S.userH.filter(h=>h.src===id).length;
  const na = s.anHist ? s.anHist.length : Object.keys(s.an || {}).length;
  if (!confirm(`¿Eliminar “${s.title}”${n?` y sus ${n} preguntas y fichas`:""}${na ? `${n ? " y" : " y sus"} ${na} análisis (descárgalos antes si los quieres conservar)` : ""}? No se puede deshacer.`)) return;
  [["q",S.userQ],["c",S.userC],["h",S.userH]].forEach(([k,arr])=>arr.filter(o=>o.src===id).forEach(o=>delete S.srs[k+o.id]));
  S.userQ = S.userQ.filter(q=>q.src!==id); S.userC = S.userC.filter(c=>c.src!==id); S.userH = S.userH.filter(h=>h.src!==id);
  S.sources = S.sources.filter(x=>x.id!==id);
  rebuild(); save(); delete recCache[id];
  try { await idb.del(id); } catch(e) {}
  toast("Fuente eliminada"); go("lib");
}
