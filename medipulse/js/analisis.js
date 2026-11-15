// ===================================================================
// ANÁLISIS DE UN DOCUMENTO
// Visor de la página original, mapa por capítulos y tres análisis con IA:
// auditoría MBE, revisión de tema y pase de revista. Cada dato cita su página.
// (Idea tomada de la versión de Gemini; adaptada a Claude, sin respaldo que invente contenido.)
// ===================================================================
const AN_MAX_CHARS = 160000;
const AN_KINDS = {
  audit: {icon:"🔬", name:"Auditoría MBE", desc:"Veredicto, algoritmo, qué hacer y qué no, umbrales y qué cambió."},
  tema: {icon:"📖", name:"Revisión de tema", desc:"Fisiopatología, cuadro típico y banderas rojas, algoritmo y diferenciales."},
  revista: {icon:"🩺", name:"Pase de revista", desc:"Resumen de 60 s, conductas en el turno y preguntas del profesor."}
};
const DESIGNS = {GPC:"📋 Guía de práctica clínica", ECA:"⚖️ Ensayo clínico aleatorizado", META:"📊 Metaanálisis o revisión sistemática", OBS:"🔍 Estudio observacional", REV:"📚 Revisión o capítulo", OTRO:"📄 Otro documento"};

// Tipo de documento estimado por palabras clave (sin IA). Solo orienta; la IA lo confirma.
function detectDesign(text){
  const t = norm(String(text).slice(0, 15000));
  const n = re => (t.match(re) || []).length;
  const sc = {
    GPC: n(/guia de practica clinica|clinical practice guideline|clase i\b|class i\b|clase iii|class iii|grade\b|nivel de evidencia|level of evidence|recomendacion/g) * 3,
    META: n(/meta-?anali|meta-?analys|systematic review|revision sistematica|prisma|heterogeneidad|heterogeneity|forest plot/g) * 2,
    ECA: n(/randomi[sz]ed|aleatoriz|placebo|double-blind|doble ciego|intention-to-treat|intencion de tratar|consort/g) * 2,
    OBS: n(/cohort|casos y controles|case-control|transversal|cross-sectional|strobe/g) * 2
  };
  const best = Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];
  return best[1] > 0 ? best[0] : "REV";
}

// ---------- estado ----------
let an = null, anIntent = null;
const pdfDocs = {};
function anReset(s){
  an = {id: s.id, kind: (anIntent && anIntent.id === s.id && anIntent.kind) || "audit", scope: "all", from: 1, to: Math.min(s.pages, 10),
        view: {on: false, page: 1, zoom: 1}, busy: "", err: ""};
}
function openAnalysis(id, kind){ anIntent = {id, kind}; openSrc(id); }

// ---------- páginas a analizar ----------
function anChapters(s){
  if (s.chapters && s.chapters.length) return s.chapters;
  // Sin IA: capítulos a partir de los títulos detectados en el propio documento.
  const info = docInfo(s.id); if (!info) return [];
  const heads = info.heads.slice().sort((a,b)=>a.page-b.page).filter((h,i,a)=>!i || h.page !== a[i-1].page);
  if (heads.length < 2) return [];
  const last = Math.min(s.pages, info.refFrom === Infinity ? s.pages : info.refFrom);
  return heads.slice(0, 10).map((h,i,a)=>({title: h.t, from: h.page, to: Math.max(h.page, (a[i+1] ? a[i+1].page - 1 : last)), summary: "", local: true}));
}
function anSelection(s){
  const info = docInfo(s.id); if (!info) return null;
  let nums = [], label;
  if (an.scope === "range") {
    const a = Math.max(1, Math.min(an.from, s.pages)), b = Math.max(a, Math.min(an.to, s.pages));
    for (let i = a; i <= b; i++) nums.push(i);
    label = a === b ? `pág. ${a}` : `págs. ${a}–${b}`;
  } else if (an.scope.startsWith("c")) {
    const c = anChapters(s)[+an.scope.slice(1)];
    if (c) { for (let i = c.from; i <= c.to; i++) nums.push(i); label = `${c.title} (págs. ${c.from}–${c.to})`; }
  }
  if (!nums.length) { nums = info.pages.map((p,i)=>i+1).filter(n=>info.pages[n-1].trim()); label = "todo el documento"; }
  nums = nums.filter(n=>(info.pages[n-1] || "").trim());
  // Si no cabe, prioriza las páginas con recomendaciones, cifras y algoritmos.
  let trimmed = false, total = nums.reduce((a,n)=>a + info.pages[n-1].length, 0);
  if (total > AN_MAX_CHARS) {
    trimmed = true;
    const score = n => (info.pages[n-1].match(/clase i|class i|recomend|recommend|hr\s*=|rr\s*=|or\s*=|ic\s*95|95\s*%\s*ci|nnt|algoritm|algorithm|tabla|table|dosis|dose/gi) || []).length;
    const keep = []; let len = 0;
    for (const n of nums.slice().sort((a,b)=>score(b)-score(a) || a-b)) { const l = info.pages[n-1].length; if (len + l > AN_MAX_CHARS) continue; keep.push(n); len += l; }
    nums = keep.sort((a,b)=>a-b);
  }
  return {nums, label, trimmed, text: nums.map(n=>`[pág. ${n}]\n${info.pages[n-1]}`).join("\n\n")};
}

// ---------- herramientas (salida con esquema estricto) ----------
const itemT = {type:"object", additionalProperties:false, required:["text","page"], properties:{text:{type:"string"}, page:{type:"integer"}}};
const listT = {type:"array", items: itemT};
const stepT = {type:"array", items:{type:"object", additionalProperties:false, required:["step","text","page"], properties:{step:{type:"string"}, text:{type:"string"}, page:{type:"integer"}}}};
const tool = (name, description, props) => ({name, description, strict: true,
  input_schema: {type:"object", additionalProperties:false, required: Object.keys(props), properties: props}});
const T_CHAPTERS = tool("report_chapters", "Entrega el tipo de documento y su mapa por capítulos clínicos.", {
  design: {type:"string", enum: Object.keys(DESIGNS)},
  chapters: {type:"array", items:{type:"object", additionalProperties:false, required:["title","from","to","summary"],
    properties:{title:{type:"string"}, from:{type:"integer"}, to:{type:"integer"}, summary:{type:"string"}}}}
});
const AN_TOOLS = {
  audit: tool("report_audit", "Entrega la auditoría del documento.", {
    design: {type:"string", enum: Object.keys(DESIGNS)}, headline: {type:"string"}, verdict: itemT, algorithm: stepT,
    doList: listT, dontList: listT,
    thresholds: {type:"array", items:{type:"object", additionalProperties:false, required:["metric","value","page"], properties:{metric:{type:"string"}, value:{type:"string"}, page:{type:"integer"}}}},
    delta: itemT}),
  tema: tool("report_topic", "Entrega la revisión del tema.", {
    title: {type:"string"}, pathophys: itemT, typical: listT, redFlags: listT, algorithm: stepT,
    differentials: {type:"array", items:{type:"object", additionalProperties:false, required:["entity","clue","page"], properties:{entity:{type:"string"}, clue:{type:"string"}, page:{type:"integer"}}}},
    pearls: listT}),
  revista: tool("report_rounds", "Entrega la preparación para el pase de revista.", {
    pitch: itemT, checklist: listT,
    questions: {type:"array", items:{type:"object", additionalProperties:false, required:["q","a","page"], properties:{q:{type:"string"}, a:{type:"string"}, page:{type:"integer"}}}}})
};
const AN_RULES = `Trabajas solo con el documento que te entrega el médico; sus páginas están marcadas como [pág. N].
Reglas:
- Usa únicamente información del documento. No completes con conocimiento propio ni de otras fuentes. Si algo no aparece, deja la lista vacía o el texto vacío. Nunca inventes cifras, dosis, clases de recomendación ni páginas.
- En "page" va la página de donde sale cada dato, según las marcas [pág. N]. Usa 0 solo si el texto resume varias páginas.
- Habla de Clase I o Clase III solo si el documento usa clases de recomendación. Si no, en "hacer" van las recomendaciones o hallazgos que el documento respalda, y en "no hacer" lo que desaconseja, sus riesgos o sus limitaciones.
- Escribe en español neutro, con frases cortas y sin markdown. Conserva los términos técnicos y copia las cifras tal como aparecen.`;
const AN_SYSTEM = {
  audit: `Eres un especialista en medicina basada en la evidencia. Auditas el documento para que un médico tome decisiones en el turno y responda preguntas de examen.
"design": tipo de documento. "headline": título clínico del bloque auditado. "verdict": conclusión práctica en 1 o 2 frases. "algorithm": de 2 a 4 pasos de la decisión clínica que plantea el documento (prueba inicial, confirmación, tratamiento de primera línea…), en "step" el nombre corto del paso; vacío si el documento no plantea una secuencia. "doList": lo que hay que hacer. "dontList": lo que no se debe hacer, los riesgos o las trampas de examen. "thresholds": umbrales, puntos de corte, dosis y resultados con su cifra exacta. "delta": qué cambió frente a la versión o la práctica anterior, o el sesgo metodológico principal; vacío si el documento no lo permite saber.
${AN_RULES}`,
  tema: `Eres un profesor de medicina interna. Sintetizas el tema clínico del documento para estudiarlo rápido.
"title": la patología o el tema. "pathophys": la fisiopatología clave y la diana terapéutica en 2 o 3 frases. "typical": la presentación típica. "redFlags": las banderas rojas. "algorithm": de 2 a 4 pasos (sospecha y prueba inicial, confirmación y estratificación, manejo de primera línea…), en "step" el nombre corto del paso. "differentials": diagnósticos diferenciales con el dato que los distingue ("clue"). "pearls": perlas de examen.
${AN_RULES}`,
  revista: `Preparas a un residente para presentar este documento o este caso en el pase de revista.
"pitch": resumen oral que se pueda decir en 60 segundos. "checklist": conductas concretas para el turno. "questions": de 3 a 6 preguntas difíciles que haría el profesor, con su respuesta según el documento.
${AN_RULES}`
};

// ---------- normalización (lo que llega de la IA o del almacenamiento) ----------
const anStr = v => typeof v === "string" ? v.trim() : "";
const anPage = v => Number.isInteger(v) && v > 0 ? v : 0;
const anItems = a => (Array.isArray(a) ? a : []).map(x=>({text: anStr(x && x.text), page: anPage(x && x.page)})).filter(x=>x.text);
const anItem = x => ({text: anStr(x && x.text), page: anPage(x && x.page)});
function anClean(kind, d){
  d = d || {};
  if (kind === "audit") return {design: DESIGNS[d.design] ? d.design : "OTRO", headline: anStr(d.headline), verdict: anItem(d.verdict),
    algorithm: (Array.isArray(d.algorithm) ? d.algorithm : []).map(x=>({step: anStr(x && x.step), text: anStr(x && x.text), page: anPage(x && x.page)})).filter(x=>x.text).slice(0, 5),
    doList: anItems(d.doList), dontList: anItems(d.dontList),
    thresholds: (Array.isArray(d.thresholds) ? d.thresholds : []).map(x=>({metric: anStr(x && x.metric), value: anStr(x && x.value), page: anPage(x && x.page)})).filter(x=>x.metric && x.value),
    delta: anItem(d.delta)};
  if (kind === "tema") return {title: anStr(d.title), pathophys: anItem(d.pathophys), typical: anItems(d.typical), redFlags: anItems(d.redFlags),
    algorithm: (Array.isArray(d.algorithm) ? d.algorithm : []).map(x=>({step: anStr(x && x.step), text: anStr(x && x.text), page: anPage(x && x.page)})).filter(x=>x.text).slice(0, 5),
    differentials: (Array.isArray(d.differentials) ? d.differentials : []).map(x=>({entity: anStr(x && x.entity), clue: anStr(x && x.clue), page: anPage(x && x.page)})).filter(x=>x.entity),
    pearls: anItems(d.pearls)};
  return {pitch: anItem(d.pitch), checklist: anItems(d.checklist),
    questions: (Array.isArray(d.questions) ? d.questions : []).map(x=>({q: anStr(x && x.q), a: anStr(x && x.a), page: anPage(x && x.page)})).filter(x=>x.q && x.a)};
}

// ---------- tarjeta de análisis en el detalle de la fuente ----------
function renderAnalysis(){
  const s = cur(), box = $("#anCard");
  if (!s || s.kind === "pack" || !docInfo(s.id)) { box.hidden = true; return; }
  box.hidden = false;
  if (!an || an.id !== s.id) anReset(s);
  if (anIntent && anIntent.id === s.id && anIntent.kind) an.kind = anIntent.kind;
  const chs = anChapters(s), k = AN_KINDS[an.kind], saved = s.an && s.an[an.kind], key = !!getKey(), info = docInfo(s.id);
  const est = s.design || detectDesign(info.pages.slice(0, 6).join(" "));
  box.innerHTML = `
    <div class="row"><h3 style="font-size:16px">🧠 Analizar el documento</h3><div class="spacer"></div><span class="tag" title="${s.design ? "Según la IA" : "Estimado por palabras clave"}">${esc(DESIGNS[est] || DESIGNS.OTRO)}${s.design ? "" : " · estimado"}</span></div>
    ${s.kind === "pdf" || !s.kind ? `<button class="btn sm" id="anViewBtn" style="align-self:flex-start">${an.view.on ? "Ocultar la página original" : "📄 Ver la página original aquí"}</button><div id="anView"${an.view.on ? "" : " hidden"}></div>` : ""}
    <div class="stack" style="gap:6px">
      <div class="row"><b class="small">🗺️ Mapa por capítulos</b><div class="spacer"></div>${key ? `<button class="btn ghost sm" id="anMap" ${an.busy?"disabled":""}>${an.busy === "map" ? `<span class="spin"></span> Creando…` : s.chapters && s.chapters.length ? "↻ Rehacer con IA" : "✨ Crear con IA"}</button>` : ""}</div>
      ${chs.length ? `<div class="chaps">${chs.map((c,i)=>`<button class="chap${an.scope==="c"+i?" on":""}" data-ch="${i}"><b>${esc(c.title)}</b><span class="xs muted">págs. ${c.from}–${c.to}${c.summary ? " · " + esc(c.summary) : ""}</span></button>`).join("")}</div>
        <p class="xs muted" style="margin:0">${chs[0].local ? "Detectados por los títulos del documento." : "Creados con IA a partir del documento."} Toca uno para analizar solo esas páginas.</p>`
        : `<p class="xs muted" style="margin:0">${key ? "No encontré títulos claros. Crea el mapa con IA o elige un rango de páginas." : "No encontré títulos claros. Elige un rango de páginas."}</p>`}
    </div>
    <div class="${an.scope === "range" ? "grid2" : "stack"}"><label class="fld">Analizar<select id="anScope"><option value="all">Todo el documento</option>${chs.map((c,i)=>`<option value="c${i}" ${an.scope==="c"+i?"selected":""}>${esc(c.title.length > 40 ? c.title.slice(0,40) + "…" : c.title)}</option>`).join("")}<option value="range" ${an.scope==="range"?"selected":""}>Un rango de páginas</option></select></label>
      ${an.scope === "range" ? `<div class="grid2"><label class="fld">Desde<input type="number" id="anFrom" min="1" max="${s.pages}" value="${an.from}"></label><label class="fld">Hasta<input type="number" id="anTo" min="1" max="${s.pages}" value="${an.to}"></label></div>` : ""}</div>
    <div class="tabs3">${Object.entries(AN_KINDS).map(([kk,v])=>`<button data-ak="${kk}" class="${an.kind===kk?"on":""}"><b>${v.icon} ${v.name}</b><span>${v.desc}</span></button>`).join("")}</div>
    ${key ? `<button class="btn primary block" id="anGo" ${an.busy?"disabled":""}>${an.busy === "run" ? `<span class="spin"></span> Analizando…` : `✨ ${k.name}${saved ? " (rehacer)" : ""}`}</button>`
          : `<div class="note"><b>Para estos análisis necesitas tu clave de IA.</b> Mientras tanto puedes leer, ver la página original y crear fichas a mano en el taller de abajo. <button class="linkbtn" data-go="guide">¿Cómo consigo una clave?</button></div>`}
    ${an.err ? `<p class="small" style="margin:0;color:var(--bad)">${esc(an.err)}</p>` : ""}
    <div id="anOut">${saved ? anResultHTML(an.kind, saved) : ""}</div>`;
  box.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
  $("#anViewBtn") && ($("#anViewBtn").onclick = ()=>{ an.view.on = !an.view.on; renderAnalysis(); });
  if (an.view.on && $("#anView")) renderViewer();
  $("#anMap") && ($("#anMap").onclick = runChapters);
  box.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{ an.scope = "c" + b.dataset.ch; const c = chs[+b.dataset.ch]; an.view.page = c.from; renderAnalysis(); });
  $("#anScope").onchange = ()=>{ an.scope = $("#anScope").value; renderAnalysis(); };
  ["#anFrom", "#anTo"].forEach(q=>$(q) && ($(q).onchange = ()=>{ an.from = +$("#anFrom").value || 1; an.to = +$("#anTo").value || an.from; }));
  box.querySelectorAll("[data-ak]").forEach(b=>b.onclick=()=>{ an.kind = b.dataset.ak; an.err = ""; renderAnalysis(); });
  $("#anGo") && ($("#anGo").onclick = runAnalysis);
  bindAnResult();
  if (anIntent && anIntent.id === s.id) { anIntent = null; box.scrollIntoView({behavior: "smooth", block: "start"}); }
}

// ---------- visor de la página original (pdf.js, sin internet) ----------
async function anDoc(id){
  if (pdfDocs[id]) return pdfDocs[id];
  const lib = await loadPdfJs(), r = await getRec(id);
  if (!r || !r.blob) throw new Error("El PDF no está guardado en este dispositivo.");
  return pdfDocs[id] = await lib.getDocument({data: new Uint8Array(await r.blob.arrayBuffer())}).promise;
}
let viewTask = null;
async function renderViewer(){
  const s = cur(), v = an.view, box = $("#anView"); if (!box) return;
  v.page = Math.max(1, Math.min(v.page, s.pages));
  box.innerHTML = `<div class="pdfbar"><button class="btn sm" id="pvPrev" ${v.page<=1?"disabled":""} aria-label="Página anterior">‹</button>
      <label class="small">Pág. <input type="number" id="pvPage" min="1" max="${s.pages}" value="${v.page}" aria-label="Página"> de ${s.pages}</label>
      <button class="btn sm" id="pvNext" ${v.page>=s.pages?"disabled":""} aria-label="Página siguiente">›</button><div class="spacer"></div>
      <button class="btn sm" id="pvOut" aria-label="Alejar">−</button><button class="btn sm" id="pvIn" aria-label="Acercar">+</button></div>
    <div class="pdfbox" id="pvBox"><p class="small muted" style="margin:12px"><span class="spin"></span> Cargando la página…</p></div>`;
  const goPage = p => { v.page = p; renderViewer(); };
  $("#pvPrev").onclick = ()=>goPage(v.page - 1); $("#pvNext").onclick = ()=>goPage(v.page + 1);
  $("#pvPage").onchange = ()=>goPage(+$("#pvPage").value || 1);
  $("#pvIn").onclick = ()=>{ v.zoom = Math.min(3, v.zoom + 0.25); renderViewer(); };
  $("#pvOut").onclick = ()=>{ v.zoom = Math.max(0.5, v.zoom - 0.25); renderViewer(); };
  try {
    const doc = await anDoc(s.id), page = await doc.getPage(v.page), pv = $("#pvBox"); if (!pv) return;
    const base = page.getViewport({scale: 1}), fit = (pv.clientWidth - 2) / base.width, vp = page.getViewport({scale: fit * v.zoom});
    const dpr = Math.min(window.devicePixelRatio || 1, 2), cv = document.createElement("canvas");
    cv.width = Math.floor(vp.width * dpr); cv.height = Math.floor(vp.height * dpr); cv.style.width = Math.floor(vp.width) + "px";
    if (viewTask) try { viewTask.cancel(); } catch(e) {}
    viewTask = page.render({canvasContext: cv.getContext("2d"), viewport: vp, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null});
    await viewTask.promise; viewTask = null;
    if ($("#pvBox") === pv) { pv.innerHTML = ""; pv.appendChild(cv); }
  } catch(e) {
    if (e && e.name === "RenderingCancelledException") return;
    const pv = $("#pvBox"); pv && (pv.innerHTML = `<p class="small" style="margin:12px;color:var(--bad)">No se pudo mostrar la página: ${esc(e && e.message || e)}</p>`);
  }
}
// Salta a una página citada: en el visor si es un PDF; en el lector del taller si es texto pegado.
function anJump(p){
  const s = cur(); if (!s) return;
  if (s.kind === "text") { gen.tab = "read"; gen.rdPage = p; renderGen(); $("#genCard").scrollIntoView({behavior: "smooth", block: "start"}); return; }
  an.view.on = true; an.view.page = p; renderAnalysis();
  $("#anView") && $("#anView").scrollIntoView({behavior: "smooth", block: "start"});
}

// ---------- llamadas a la IA ----------
async function runChapters(){
  const s = cur(), info = docInfo(s.id); if (!s || an.busy) return;
  an.busy = "map"; an.err = ""; renderAnalysis();
  const idx = info.pages.map((p,i)=>p.trim() ? `pág. ${i+1}: ${p.replace(/\s+/g, " ").slice(0, 320)}` : "").filter(Boolean).join("\n").slice(0, 60000);
  try {
    const r = await callForTool({system: `Eres un médico especialista. Con el inicio de cada página de un documento médico, decides qué tipo de documento es ("design") y lo divides en 3 a 8 capítulos clínicos reales con su rango de páginas ("from" y "to", según las marcas pág. N). No incluyas la bibliografía, los agradecimientos ni la información de los autores. "summary": qué decisión o pregunta clínica resuelve el capítulo, en una línea. Usa solo lo que aparece en el texto. Español neutro, sin markdown.`,
      tools: [T_CHAPTERS], user: `<indice titulo="${s.title.replace(/"/g, "'")}">\n${idx}\n</indice>`}, "report_chapters");
    // Se descartan los capítulos con páginas que no existen o al revés, en vez de "corregirlos".
    const chs = (Array.isArray(r.chapters) ? r.chapters : []).filter(c=>c && Number.isInteger(c.from) && Number.isInteger(c.to) && c.from >= 1 && c.from <= c.to && c.from <= s.pages)
      .map(c=>({title: anStr(c.title), from: c.from, to: Math.min(s.pages, c.to), summary: anStr(c.summary)})).filter(c=>c.title).slice(0, 10);
    if (!chs.length) throw uerr("La IA no encontró capítulos en este documento. Elige un rango de páginas.");
    s.chapters = chs; if (DESIGNS[r.design]) s.design = r.design; an.scope = "all"; save();
  } catch(e) { an.err = e.userMsg || "No se pudo crear el mapa: " + (e.message || e); }
  an.busy = ""; if (cur() === s) renderAnalysis();
}
async function runAnalysis(){
  const s = cur(); if (!s || an.busy) return;
  const sel = anSelection(s), kind = an.kind;
  if (!sel || !sel.nums.length) { an.err = "Esas páginas no tienen texto."; return renderAnalysis(); }
  an.busy = "run"; an.err = ""; renderAnalysis();
  try {
    const r = await callForTool({system: AN_SYSTEM[kind] + focusLine(), tools: [AN_TOOLS[kind]],
      user: `<documento titulo="${s.title.replace(/"/g, "'")}">\n${sel.text}\n</documento>\n\nAnaliza: ${sel.label}.`}, AN_TOOLS[kind].name);
    const data = anClean(kind, r);
    if (kind === "audit" && DESIGNS[data.design] && data.design !== "OTRO") s.design = data.design;
    s.an = Object.assign({}, s.an, {[kind]: {label: sel.label, nums: sel.nums, trimmed: sel.trimmed, at: Date.now(), data}});
    save();
  } catch(e) { an.err = e.userMsg || "No se pudo analizar: " + (e.message || e); }
  an.busy = ""; if (cur() === s) { an.kind = kind; renderAnalysis(); }
}

// ---------- resultado ----------
function pgBtn(p){ const s = cur(); return p && s && p <= s.pages ? ` <button class="pgbtn" data-pg="${p}">pág. ${p}</button>` : ""; }
const anLi = (x, cls) => `<li${cls ? ` class="${cls}"` : ""}>${esc(x.text)}${pgBtn(x.page)}</li>`;
const anSteps = a => a.length ? `<ol class="ansteps">${a.map(x=>`<li>${x.step ? `<b>${esc(x.step)}</b>` : ""}<span>${esc(x.text)}${pgBtn(x.page)}</span></li>`).join("")}</ol>` : "";
function anResultHTML(kind, saved){
  const d = anClean(kind, saved.data);
  const head = `<div class="xs muted">${AN_KINDS[kind].icon} ${AN_KINDS[kind].name} · ${esc(saved.label)} · ${fmtDate(saved.at)}${saved.trimmed ? " · el documento era muy largo: se usaron las páginas con más recomendaciones y cifras" : ""}</div>
    <div class="note" style="margin:0">⚠️ Generado con IA a partir del documento. Toca la página citada para comprobar cada dato.</div>`;
  let body = "";
  if (kind === "audit") {
    const gpc = d.design === "GPC";
    body = `<div class="row" style="gap:6px"><span class="tag">${esc(DESIGNS[d.design])}</span></div>
      ${d.headline ? `<h3 style="font-size:17px;margin:0">${esc(d.headline)}</h3>` : ""}
      ${d.verdict.text ? `<div class="note pearl"><b>🎯 Veredicto:</b> ${esc(d.verdict.text)}${pgBtn(d.verdict.page)}</div>` : ""}
      ${d.algorithm.length ? `<div><b class="small">🧭 Algoritmo</b>${anSteps(d.algorithm)}</div>` : ""}
      <div class="ancols">
        <div class="anbox ok"><b class="small">${gpc ? "🟢 Hacer (Clase I / primera línea)" : "🟢 Lo que respalda"}</b>${d.doList.length ? `<ul>${d.doList.map(x=>anLi(x)).join("")}</ul>` : `<p class="xs muted">El documento no lo especifica.</p>`}</div>
        <div class="anbox bad"><b class="small">${gpc ? "🔴 No hacer (Clase III / trampa)" : "🔴 Riesgos, limitaciones o trampas"}</b>${d.dontList.length ? `<ul>${d.dontList.map(x=>anLi(x)).join("")}</ul>` : `<p class="xs muted">El documento no lo especifica.</p>`}</div>
      </div>
      ${d.thresholds.length ? `<div><b class="small">📏 Umbrales y cifras exactas</b><div class="anth">${d.thresholds.map(t=>`<div><span class="xs muted">${esc(t.metric)}</span><b>${esc(t.value)}</b>${pgBtn(t.page)}</div>`).join("")}</div></div>` : ""}
      ${d.delta.text ? `<div class="note"><b>🔄 Qué cambió o punto crítico:</b> ${esc(d.delta.text)}${pgBtn(d.delta.page)}</div>` : ""}`;
  } else if (kind === "tema") {
    body = `${d.title ? `<h3 style="font-size:17px;margin:0">${esc(d.title)}</h3>` : ""}
      ${d.pathophys.text ? `<div class="note"><b>🧬 Fisiopatología:</b> ${esc(d.pathophys.text)}${pgBtn(d.pathophys.page)}</div>` : ""}
      ${d.algorithm.length ? `<div><b class="small">🧭 Algoritmo</b>${anSteps(d.algorithm)}</div>` : ""}
      <div class="ancols">
        <div class="anbox ok"><b class="small">🩺 Presentación típica</b>${d.typical.length ? `<ul>${d.typical.map(x=>anLi(x)).join("")}</ul>` : `<p class="xs muted">No aparece en el documento.</p>`}</div>
        <div class="anbox bad"><b class="small">🚩 Banderas rojas</b>${d.redFlags.length ? `<ul>${d.redFlags.map(x=>anLi(x)).join("")}</ul>` : `<p class="xs muted">No aparecen en el documento.</p>`}</div>
      </div>
      ${d.differentials.length ? `<div><b class="small">🔀 Diagnósticos diferenciales</b><div class="anth">${d.differentials.map(x=>`<div><b>${esc(x.entity)}</b><span class="xs">${esc(x.clue)}</span>${pgBtn(x.page)}</div>`).join("")}</div></div>` : ""}
      ${d.pearls.length ? `<div class="note pearl"><b>💡 Perlas</b><ul>${d.pearls.map(x=>anLi(x)).join("")}</ul></div>` : ""}`;
  } else {
    body = `${d.pitch.text ? `<div class="note pearl"><b>🎙️ En 60 segundos:</b> ${esc(d.pitch.text)}${pgBtn(d.pitch.page)}</div>` : ""}
      ${d.checklist.length ? `<div><b class="small">✅ Conductas en el turno</b><ul class="anchk">${d.checklist.map(x=>anLi(x)).join("")}</ul></div>` : ""}
      ${d.questions.length ? `<div class="stack" style="gap:6px"><b class="small">🔥 Preguntas del profesor</b>${d.questions.map((x,i)=>`<details class="anq"><summary>${i+1}. ${esc(x.q)}</summary><p class="small" style="margin:6px 0 0">${esc(x.a)}${pgBtn(x.page)}</p></details>`).join("")}</div>` : ""}`;
  }
  return `<div class="stack anres">${head}${body}
    <div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm" id="anToHy">💎 Convertir en ficha HY</button><button class="btn sm" id="anToQ">✨ Crear preguntas de estas páginas</button></div></div>`;
}
function bindAnResult(){
  document.querySelectorAll("#anOut [data-pg]").forEach(b=>b.onclick=()=>anJump(+b.dataset.pg));
  $("#anToHy") && ($("#anToHy").onclick = anToHy);
  $("#anToQ") && ($("#anToQ").onclick = ()=>{
    const s = cur(), saved = s.an[an.kind]; if (!saved) return;
    const nums = saved.nums || [];
    gen.tab = "ai"; gen.topic = an.kind === "tema" ? anClean("tema", saved.data).title : "";
    if (nums.length && nums.length <= 40) { gen.pageSet = nums; gen.from = nums[0]; gen.to = nums[nums.length-1]; } else { gen.pageSet = null; gen.from = 1; gen.to = s.pages; }
    renderGen(); $("#genCard").scrollIntoView({behavior: "smooth", block: "start"});
    toast("Elige el tipo y la cantidad de preguntas, y genera.");
  });
}
// El resultado pasa a una ficha HY candidata que el médico revisa y corrige antes de guardar.
function anToHy(){
  const s = cur(), saved = s.an && s.an[an.kind]; if (!saved) return;
  const d = anClean(an.kind, saved.data), rows = [];
  let title, badge, redFlag = "", trap = "", pages = [];
  const add = (label, val, page) => { if (label && val && rows.length < 6) { rows.push({label, val}); page && pages.push(page); } };
  if (an.kind === "audit") {
    title = d.headline || s.title; badge = DESIGNS[d.design].replace(/^\S+\s/, "");
    d.thresholds.slice(0, 4).forEach(t=>add(t.metric, t.value, t.page));
    d.doList.slice(0, 4 - Math.min(rows.length, 3)).forEach(x=>add("Hacer", x.text, x.page));
    trap = d.dontList[0] ? d.dontList[0].text : ""; d.dontList[0] && pages.push(d.dontList[0].page);
  } else if (an.kind === "tema") {
    title = d.title || s.title; badge = "Revisión de tema";
    d.algorithm.slice(0, 3).forEach((x,i)=>add(x.step || `Paso ${i+1}`, x.text, x.page));
    d.differentials.slice(0, 2).forEach(x=>add("Diferencial: " + x.entity, x.clue || "—", x.page));
    redFlag = d.redFlags[0] ? d.redFlags[0].text : "";
  } else {
    title = s.title + " · pase de revista"; badge = "Pase de revista";
    d.questions.slice(0, 4).forEach(x=>add(x.q, x.a, x.page));
    if (!rows.length) d.checklist.slice(0, 4).forEach((x,i)=>add(`Conducta ${i+1}`, x.text, x.page));
  }
  if (!rows.length) return toast("Este análisis no tiene datos suficientes para una ficha.");
  const page = pages.find(p=>p > 0) || (saved.nums && saved.nums[0]) || 1;
  cands = [{kind: "h", on: true, specialty: s.spec || "Medicina Interna", title, badge, thresholds: rows, redFlag, trap, relevance: 0, why: "", page}];
  renderReview(); $("#reviewBox").scrollIntoView({behavior: "smooth", block: "start"});
  toast("Revisa y corrige la ficha antes de guardarla.");
}

// ---------- entrada desde el laboratorio MBE ----------
function renderMbeDocs(){
  const box = $("#mbeDocs"); if (!box) return;
  const docs = S.sources.filter(s=>s.kind !== "pack").slice().reverse();
  box.innerHTML = `<h3 style="font-size:16px">🧠 Auditar un PDF</h3>
    <p class="xs muted" style="margin:0">Sube una guía o un artículo, o elige uno de tu biblioteca. Verás el veredicto, el algoritmo, qué hacer y qué no, y los umbrales, cada uno con su página.</p>
    ${docs.length ? docs.slice(0, 6).map(s=>`<div class="srcitem"><div class="ic">📄</div><div style="flex:1;min-width:0"><b class="small" style="word-break:break-word">${esc(s.title)}</b><div class="xs muted">${s.pages} págs${s.an ? " · " + Object.keys(s.an).map(k=>AN_KINDS[k] ? AN_KINDS[k].icon : "").join(" ") : ""}</div></div><button class="btn sm" data-aud="${esc(s.id)}">Analizar</button></div>`).join("") : ""}
    <button class="btn" id="mbeUp">➕ Subir un PDF</button><input type="file" id="mbeIn" accept="application/pdf" hidden><div id="mbeUpMsg" class="xs"></div>`;
  box.querySelectorAll("[data-aud]").forEach(b=>b.onclick=()=>openAnalysis(b.dataset.aud, "audit"));
  $("#mbeUp").onclick = ()=>$("#mbeIn").click();
  $("#mbeIn").onchange = async e=>{
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    $("#mbeUpMsg").innerHTML = `<span class="spin"></span> Leyendo “${esc(f.name)}”…`;
    const id = await addPdf(f, false);
    if (id) openAnalysis(id, "audit"); else $("#mbeUpMsg").innerHTML = `<span style="color:var(--bad)">${$("#pdfProgress").innerHTML || "No se pudo leer el PDF."}</span>`;
  };
}
