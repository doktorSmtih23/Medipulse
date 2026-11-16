// ===================================================================
// ANÁLISIS DE UN DOCUMENTO
// Visor de la página original, mapa por capítulos y tres análisis con IA:
// auditoría MBE, revisión de tema y pase de revista. Cada dato cita su página.
// (Idea tomada de la versión de Gemini; adaptada a Claude, sin respaldo que invente contenido.)
// ===================================================================
const AN_MAX_CHARS = 100000;   // ~28 mil tokens: más es lento (1–2 min) y en el celular la espera se puede cortar
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
    OBS: n(/cohort|casos y controles|case-control|transversal|cross-sectional|strobe/g) * 2,
    REV: n(/\bprimer\b|\breview\b|narrative review|revision narrativa|\bcapitulo\b|\bchapter\b|this (?:review|primer)/g) * 3
  };
  const best = Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];
  // Solo se afirma un diseño si las palabras clave son claras (una revisión cita metaanálisis y ensayos).
  return best[1] >= 6 ? best[0] : "REV";
}

// ---------- estado ----------
let an = null, anIntent = null;
const pdfDocs = {};
function anReset(s){
  an = {id: s.id, kind: "audit", busy: "", err: ""};
}
function openAnalysis(id, kind, ver){ anIntent = {id, kind}; anVerPend = ver || null; openSrc(id); }
// Historial: cada análisis queda guardado (antes solo el último de cada tipo). s.an[tipo] sigue siendo el más reciente.
let anVerPend = null;
const anCuando = at => `${fmtDate(at)}, ${new Date(at).toLocaleTimeString("es", {hour: "2-digit", minute: "2-digit"})}`;
const AN_HIST_MAX = 40;
function anHist(s){
  if (!s.anHist) s.anHist = Object.entries(s.an || {}).map(([kind, v]) => Object.assign({id: "a" + v.at, kind}, v)).sort((a, b) => a.at - b.at);
  return s.anHist;
}

// ---------- páginas a analizar: las del tema elegido en el índice ----------
function anSelection(s){
  const info = docInfo(s.id); if (!info) return null;
  const t = temaSel(); if (!t) return null;
  let nums = t.nums.slice(); const label = t.title === "Todo el documento" ? "todo el documento" : `${t.title} (${pagesLabel(t)})`;
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
// Instrucciones y herramientas comunes a las tres tareas (así el documento se reutiliza desde la caché).
// Cada tarea envía solo su herramienta: las tres juntas, con formato estricto, superan el límite de la API
// («The compiled grammar is too large»).
const AN_SHARED_SYSTEM = `Analizas documentos médicos para un médico. La tarea se indica al final del mensaje: sigue solo las instrucciones de esa tarea y entrega el resultado con su herramienta.

[Tarea: ${AN_KINDS.audit.name} · herramienta report_audit]
${AN_SYSTEM.audit}

[Tarea: ${AN_KINDS.tema.name} · herramienta report_topic]
${AN_SYSTEM.tema}

[Tarea: ${AN_KINDS.revista.name} · herramienta report_rounds]
${AN_SYSTEM.revista}`;

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
// El análisis se muestra dentro de «Estudiar este documento», sobre el tema elegido en el índice.
function renderAnTab(kind){
  const s = cur(); if (!s) return;
  if (!an || an.id !== s.id) anReset(s);
  an.kind = kind;
  if (anVerPend) { if (anHist(s).some(x => x.id === anVerPend)) an.ver = anVerPend; anVerPend = null; }
  const previos = anHist(s).filter(x => x.kind === kind).slice().reverse();
  const elegido = an.ver && previos.find(x => x.id === an.ver);
  const k = AN_KINDS[kind], saved = elegido || (s.an && s.an[kind]), key = !!getKey();
  const otros = previos.filter(x => x.at !== (saved && saved.at));
  $("#gBody").innerHTML = `<p class="xs muted" style="margin:0">${k.desc} Sobre el tema elegido; cada dato cita su página.</p>
    ${key ? `<button class="btn primary block" id="anGo" ${an.busy?"disabled":""}>${an.busy === "run" ? `<span class="spin"></span> Analizando…` : `✨ ${k.name}${saved ? " (rehacer)" : ""}`}</button>
      <p class="xs muted" style="margin:0;text-align:center">Costo estimado: ${anCostLine(s)}. Si la repites sobre el mismo texto en unos minutos, cuesta menos.</p>`
          : `<div class="note"><b>Para estos análisis necesitas tu clave de IA.</b> Mientras tanto puedes leer el PDF y ver las recomendaciones. <button class="linkbtn" data-go="guide">¿Cómo consigo una clave?</button></div>`}
    ${an.err ? `<p class="small" style="margin:0;color:var(--bad)">${esc(an.err)}</p>` : ""}
    <div id="anOut">${saved ? anResultHTML(kind, saved) : ""}</div>
    ${otros.length ? `<details class="anhist"><summary class="small"><b>🕘 ${k.name}: análisis anteriores de este documento (${otros.length})</b></summary>
      ${otros.map(x => `<div class="qrow"><div style="flex:1;min-width:0"><b class="small">${esc(x.label)}</b><div class="xs muted">${anCuando(x.at)}</div></div><button class="btn sm" data-anver="${x.id}">Ver</button><button class="iconbtn" data-andel="${x.id}" aria-label="Borrar este análisis" title="Borrar">🗑</button></div>`).join("")}</details>` : ""}`;
  $("#gBody").querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
  $("#anGo") && ($("#anGo").onclick = runAnalysis);
  $("#gBody").querySelectorAll("[data-anver]").forEach(b => b.onclick = () => { an.ver = b.dataset.anver; renderAnTab(kind); $("#anOut").scrollIntoView({behavior: "smooth", block: "start"}); });
  $("#gBody").querySelectorAll("[data-andel]").forEach(b => b.onclick = () => { if (!confirm("¿Borrar este análisis? No se puede deshacer.")) return;
    s.anHist = anHist(s).filter(x => x.id !== b.dataset.andel); save(); renderAnTab(kind); });
  bindAnResult(saved);
}
function renderAnalysis(){
  const c = $("#anCard"); if (c) c.hidden = true;
  if (gen && AN_KINDS[gen.tab] && $("#gBody")) renderAnTab(gen.tab);
}

// ---------- documento pdf.js (lo usan el lector y el índice) ----------
async function anDoc(id){
  if (pdfDocs[id]) return pdfDocs[id];
  const lib = await loadPdfJs(), r = await getRec(id);
  if (!r || !r.blob) throw new Error("El PDF no está guardado en este dispositivo.");
  return pdfDocs[id] = await lib.getDocument({data: new Uint8Array(await r.blob.arrayBuffer())}).promise;
}
// Salta a una página citada: en el visor si es un PDF; en el lector del taller si es texto pegado.
function anJump(p){
  const s = cur(); if (!s) return;
  gen.tab = "read"; gen.rdPage = p; renderGen(); $("#genCard").scrollIntoView({behavior: "smooth", block: "start"});
}

// ---------- llamadas a la IA ----------
function anCostLine(s){ let chars = 0; try { const sel = anSelection(s); chars = sel ? sel.text.length : 0; } catch(e) {} return aiEstimateLine(chars, {outTokens: 6000}); }
async function runChapters(){
  const s = cur(), info = docInfo(s.id); if (!s || gen.indBusy) return;
  gen.indBusy = true; gen.indErr = ""; renderGen();
  const idx = info.pages.map((p,i)=>p.trim() ? `pág. ${i+1}: ${p.replace(/\s+/g, " ").slice(0, 320)}` : "").filter(Boolean).join("\n").slice(0, 60000);
  try {
    const r = await callForTool({system: `Eres un médico especialista. Con el inicio de cada página de un documento médico, decides qué tipo de documento es ("design") y lo divides en 3 a 8 capítulos clínicos reales con su rango de páginas ("from" y "to", según las marcas pág. N). No incluyas la bibliografía, los agradecimientos ni la información de los autores. "summary": qué decisión o pregunta clínica resuelve el capítulo, en una línea. Usa solo lo que aparece en el texto. Español neutro, sin markdown.`,
      tools: [T_CHAPTERS], user: `<indice titulo="${s.title.replace(/"/g, "'")}">\n${idx}\n</indice>`, light: true, label: "Índice con IA"}, "report_chapters");
    // Se descartan los capítulos con páginas que no existen o al revés, en vez de "corregirlos".
    const chs = (Array.isArray(r.chapters) ? r.chapters : []).filter(c=>c && Number.isInteger(c.from) && Number.isInteger(c.to) && c.from >= 1 && c.from <= c.to && c.from <= s.pages)
      .map(c=>({title: anStr(c.title), from: c.from, to: Math.min(s.pages, c.to), summary: anStr(c.summary)})).filter(c=>c.title).slice(0, 10);
    if (!chs.length) throw uerr("La IA no encontró temas en este documento. Elige las páginas a mano.");
    s.chapters = chs; s.indice = null; if (DESIGNS[r.design]) s.design = r.design; gen.tema = null; gen.manual = null; save();
    await buildIndice(s);
  } catch(e) { gen.indErr = e.userMsg || "No se pudo crear el índice: " + (e.message || e); }
  gen.indBusy = false; if (cur() === s) renderGen();
}
async function runAnalysis(){
  const s = cur(); if (!s || an.busy) return;
  const sel = anSelection(s), kind = an.kind;
  if (!sel || !sel.nums.length) { an.err = "Esas páginas no tienen texto."; return renderAnalysis(); }
  an.busy = "run"; an.err = ""; renderAnalysis();
  try {
    // El documento va en caché: repetir la misma tarea sobre el mismo texto en unos minutos paga ~10 % de la lectura.
    const r = await callForTool({system: AN_SHARED_SYSTEM + focusLine(), tools: [AN_TOOLS[kind]],
      user: [{type: "text", text: `<documento titulo="${s.title.replace(/"/g, "'")}">\n${sel.text}\n</documento>`, cache_control: {type: "ephemeral"}},
             {type: "text", text: `${docInfo(s.id).danados ? NOTA_SIMBOLOS + "\n" : ""}Tarea: ${AN_KINDS[kind].name}. Analiza: ${sel.label}. Entrega el resultado llamando a la herramienta ${AN_TOOLS[kind].name}.`}],
      label: AN_KINDS[kind].name}, AN_TOOLS[kind].name);
    const data = anClean(kind, r);
    if (kind === "audit" && DESIGNS[data.design] && data.design !== "OTRO") s.design = data.design;
    const nuevo = {label: sel.label, nums: sel.nums, trimmed: sel.trimmed, at: Date.now(), data};
    s.an = Object.assign({}, s.an, {[kind]: nuevo});
    const h = anHist(s); h.push(Object.assign({id: "a" + nuevo.at, kind}, nuevo)); if (h.length > AN_HIST_MAX) h.splice(0, h.length - AN_HIST_MAX);
    an.ver = null; save();
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
    <div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm primary" id="anPdf">🖨️ Guardar como PDF</button><button class="btn sm" id="anDl">⬇ Descargar</button><button class="btn sm" id="anToHy">💎 Convertir en ficha HY</button><button class="btn sm" id="anToQ">✨ Crear preguntas de estas páginas</button></div></div>`;
}
function bindAnResult(saved){
  document.querySelectorAll("#anOut [data-pg]").forEach(b=>b.onclick=()=>anJump(+b.dataset.pg));
  $("#anPdf") && ($("#anPdf").onclick = ()=>anImprimir(cur(), an.kind, saved));
  $("#anDl") && ($("#anDl").onclick = ()=>anDescargar(cur(), an.kind, saved));
  $("#anToHy") && ($("#anToHy").onclick = anToHy);
  $("#anToQ") && ($("#anToQ").onclick = ()=>{
    const s = cur(), saved = s.an[an.kind]; if (!saved) return;
    gen.tab = "ai"; renderGen(); $("#genCard").scrollIntoView({behavior: "smooth", block: "start"});
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
    ${docs.length ? plegable("mbedocs", `<b class="small">Elegir de tu biblioteca</b> <span class="xs muted">${docs.length}</span>`, docs.slice(0, 12).map(s=>`<div class="srcitem"><div class="ic">📄</div><div style="flex:1;min-width:0"><b class="small" style="word-break:break-word">${esc(s.title)}</b><div class="xs muted">${s.pages} págs${s.an ? " · " + Object.keys(s.an).map(k=>AN_KINDS[k] ? AN_KINDS[k].icon : "").join(" ") : ""}</div></div><button class="btn sm" data-aud="${esc(s.id)}">Analizar</button></div>`).join("")) : ""}
    <button class="btn" id="mbeUp">➕ Subir un PDF</button><input type="file" id="mbeIn" accept="application/pdf" hidden><div id="mbeUpMsg" class="xs"></div>`;
  box.insertAdjacentHTML("beforeend", misAnalisisHTML());
  box.querySelectorAll("[data-misan]").forEach(b=>b.onclick=()=>{ const [id, kind, ver] = b.dataset.misan.split("|"); openAnalysis(id, kind, ver); });
  box.querySelectorAll("[data-aud]").forEach(b=>b.onclick=()=>openAnalysis(b.dataset.aud, "audit"));
  $("#mbeUp").onclick = ()=>$("#mbeIn").click();
  $("#mbeIn").onchange = async e=>{
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    $("#mbeUpMsg").innerHTML = `<span class="spin"></span> Leyendo “${esc(f.name)}”…`;
    const id = await addPdf(f, false);
    if (id) openAnalysis(id, "audit"); else $("#mbeUpMsg").innerHTML = `<span style="color:var(--bad)">${$("#pdfProgress").innerHTML || "No se pudo leer el PDF."}</span>`;
  };
}

// ---------- sacar el análisis de la app: PDF (imprimir) o archivo ----------
// Un documento limpio, sin botones: título del documento, tipo de análisis, tema, fecha, páginas citadas
// como texto y el aviso de que lo generó la IA. Se abre igual sin internet y sin MediPulse.
function anExportHTML(s, kind, saved){
  const k = AN_KINDS[kind];
  let cuerpo = anResultHTML(kind, saved)
    .replace(/<button class="pgbtn" data-pg="(\d+)">pág\. \d+<\/button>/g, '<span class="pg">(pág. $1)</span>')
    .replace(/<div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm primary" id="anPdf">[\s\S]*?<\/div><\/div>$/, "</div>")
    .replace(/<details class="anq">/g, '<details class="anq" open>')
    .replace(/<div class="xs muted">[^<]*?·[\s\S]*?<\/div>\s*/, "")   // el encabezado ya va arriba
    .replace("Toca la página citada para comprobar cada dato.", "Verifica cada dato en la página citada del documento.");
  const titulo = `${k.name} · ${s.title}`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(titulo)}</title>
<style>
body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#13233f;background:#fff;max-width:760px;margin:24px auto;padding:0 18px;line-height:1.45;font-size:14px}
h1{font-size:20px;margin:0 0 4px}h3{font-size:16px;margin:8px 0}.meta{color:#5b6475;font-size:12.5px;margin-bottom:14px}
.note{border-left:4px solid #0891b2;background:#f1f5f9;border-radius:8px;padding:8px 10px;margin:8px 0}.note.pearl{border-color:#d97706}
.tag{display:inline-block;border:1px solid #cbd5e1;border-radius:999px;padding:1px 8px;font-size:12px}
.ancols{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0}.anbox{border:1px solid #cbd5e1;border-radius:10px;padding:8px 10px}
.anbox.ok{border-color:#059669;background:#ecfdf5}.anbox.bad{border-color:#e11d48;background:#fff1f2}
.anth{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-top:6px}.anth div{background:#f1f5f9;border-radius:8px;padding:6px 8px;display:flex;flex-direction:column}
.ansteps li{margin:5px 0}.ansteps b{display:block;color:#0891b2;font-size:12.5px}ul{padding-left:18px}li{margin:3px 0}
.anq{border:1px solid #cbd5e1;border-radius:8px;padding:6px 8px;margin:6px 0}.anq summary{font-weight:600}
.pg{color:#0891b2;font-size:11.5px;font-weight:600;white-space:nowrap}.xs{font-size:12px}.muted{color:#5b6475}.small{font-size:13.5px}
.pie{margin-top:18px;border-top:1px solid #cbd5e1;padding-top:8px;color:#5b6475;font-size:11.5px}
@media print{body{margin:0}.anbox,.anth div,.note,.anq{break-inside:avoid}}
@media (max-width:560px){.ancols{grid-template-columns:1fr}}
</style></head><body>
<h1>${esc(k.icon + " " + k.name)}</h1>
<div class="meta"><b>${esc(s.title)}</b>${s.org || s.year ? ` · ${esc([s.org, s.year].filter(Boolean).join(", "))}` : ""}<br>${esc(saved.label)} · ${esc(fmtDate(saved.at))}</div>
${cuerpo}
<div class="pie">Generado con IA en MediPulse a partir del documento: verifica cada dato en la página citada. No sustituye el juicio clínico ni las guías de tu institución.</div>
</body></html>`;
}
// Nombre del archivo sin tildes ni símbolos: con caracteres no ASCII algunos navegadores lo bajan como «download».
const anNombre = (s, kind) => `MediPulse - ${AN_KINDS[kind].name} - ${s.title}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7e]+/g, "").replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
function anDescargar(s, kind, saved){
  if (!s || !saved) return;
  const url = URL.createObjectURL(new Blob([anExportHTML(s, kind, saved)], {type: "text/html"}));
  const a = Object.assign(document.createElement("a"), {href: url, download: anNombre(s, kind) + ".html"});
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast("Descargado ✓ Ábrelo en cualquier navegador; también se puede imprimir desde ahí.");
}
// Imprimir en un marco oculto: el navegador ofrece «Guardar como PDF».
function anImprimir(s, kind, saved){
  if (!s || !saved) return;
  const f = document.createElement("iframe");
  f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  f.setAttribute("aria-hidden", "true");
  f.onload = () => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch(e) { anDescargar(s, kind, saved); } setTimeout(() => f.remove(), 60000); };
  f.srcdoc = anExportHTML(s, kind, saved);
  document.body.appendChild(f);
  toast("Elige «Guardar como PDF» en el diálogo de impresión.");
}
// «Mis análisis»: todos los análisis guardados, de todos los documentos (en MBE).
function misAnalisisHTML(){
  const todos = S.sources.filter(s => s.kind !== "pack").flatMap(s => anHist(s).map(x => ({s, x}))).sort((a, b) => b.x.at - a.x.at);
  if (!todos.length) return "";
  return plegable("misan", `<b class="small">📚 Mis análisis</b> <span class="xs muted">${todos.length}</span>`, `${todos.slice(0, 12).map(({s, x}) => `<div class="qrow"><span>${AN_KINDS[x.kind] ? AN_KINDS[x.kind].icon : "📄"}</span><div style="flex:1;min-width:0"><b class="small" style="overflow-wrap:anywhere">${esc(s.title)}</b><div class="xs muted">${esc(AN_KINDS[x.kind] ? AN_KINDS[x.kind].name : "")} · ${esc(x.label)} · ${anCuando(x.at)}</div></div><button class="btn sm" data-misan="${esc(s.id)}|${x.kind}|${x.id}">Abrir</button></div>`).join("")}
    ${todos.length > 12 ? `<p class="xs muted" style="margin:6px 0 0">Y ${todos.length - 12} más: ábrelos desde su documento.</p>` : ""}`);
}
