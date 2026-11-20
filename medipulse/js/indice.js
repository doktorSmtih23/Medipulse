// ===================================================================
// ESTUDIAR UN DOCUMENTO POR TEMAS
// Índice (temas y subtemas): primero el índice propio del PDF (marcadores); si no tiene, los títulos
// detectados (sin glosarios de abreviaturas ni palabras sueltas); si tampoco, con IA.
// El tema elegido es el alcance de todo: leer, recomendaciones, fichas y preguntas, y análisis.
// Recomendaciones (sin IA): los enunciados de recomendación del tema, completos, con su clase y nivel
// de evidencia cuando la guía los trae, y sus cifras con la unidad completa.
// ===================================================================

// ---------- índice ----------
const IND_FUERA = /^(references?|referencias|bibliograf|abbreviations|abreviaturas|acknowledg|agradec|author|autores|disclosures?|conflicts?|funding|financiaci|footnotes?|supplement|article information|copyright|contents|índice|table of contents)/i;
// Una línea de glosario: sigla en mayúsculas seguida de su significado («CT computed tomography»).
const ES_GLOSARIO = t => /^[A-Z][A-Z0-9&\-\/]{1,9}s?\s+\S/.test(t) && !/^[A-Z0-9&\-\/]+(\s+[A-Z0-9&\-\/:]+)*$/.test(t) && /^[A-Z0-9&\-\/]+s?\s+(?:[a-z]|[A-Z][a-z])/.test(t);
function tituloValido(t){
  t = (t || "").trim();
  if (t.length < 4 || t.length > 100 || IND_FUERA.test(t)) return false;
  if (ES_GLOSARIO(t)) return false;
  if (/\d\s*%/.test(t)) return false;                                                       // rótulos de figuras («Rare (10%) Common»)
  if ((t.match(/\(/g) || []).length !== (t.match(/\)/g) || []).length) return false;   // «Brain Swelling (Medical» cortado
  if (/^[a-z]/.test(t)) return false;                                                     // «patients», «stroke»
  if (!/\s/.test(t) && t.length < 6) return false;
  // Celdas y encabezados de tablas: terminan en una cifra, un rango, un signo o letras de nota al pie
  // («Possible 4–5», «Non-PNS ≤3», «Antibody assay a,b», «on CBA. d»), o llevan un paréntesis explicativo largo.
  if (/\s[≤≥<>~]?\d+(?:[–\-]\d+)?\s*$|[\s.][a-e](?:,[a-e])*$/.test(t)) return false;
  if (/\(([^)]*\s){3,}[^)]*\)/.test(t) || /\bthan\b|\bque\b/.test(t)) return false;
  return true;
}
// Secciones principales habituales de artículos y revisiones: siempre son temas de primer nivel.
const SECC_PRINCIPAL = /^(introduc|background|antecedentes|epidemiolog|mechanism|pathophysiolog|fisiopatolog|diagnos|management|treatment|tratamiento|manejo|prognos|pron[oó]stic|quality of life|calidad de vida|outlook|perspectiva|methods|m[eé]todos|results|resultados|discussion|discusi[oó]n|conclusi|prevention|prevenci|clinical (?:features|presentation)|presentaci[oó]n cl[ií]nica|summary)/i;
// Agrega a cada entrada la página donde termina: justo donde empieza la siguiente del mismo nivel o superior.
function conHasta(items, last){
  return items.map((it, i) => {
    const sig = items.slice(i + 1).find(x => x.lvl <= it.lvl);
    const to = it.to != null ? it.to : sig ? sig.from : last;   // el índice con IA ya trae dónde termina cada tema
    return Object.assign({}, it, {to: Math.max(it.from, Math.min(last, to))});
  });
}
async function indiceDelPdf(s, last){
  if (s.kind === "text") return null;
  const doc = await anDoc(s.id), out = await doc.getOutline().catch(() => null);
  if (!out || out.length < 2) return null;
  const pagina = async it => {
    try {
      const d = typeof it.dest === "string" ? await doc.getDestination(it.dest) : it.dest;
      if (!Array.isArray(d)) return null;
      return typeof d[0] === "object" ? (await doc.getPageIndex(d[0])) + 1 : Number.isInteger(d[0]) ? d[0] + 1 : null;
    } catch(e) { return null; }
  };
  const items = [];
  for (const a of out) {
    const pa = await pagina(a); if (!pa || pa > last || IND_FUERA.test(a.title.trim())) continue;
    items.push({title: a.title.trim(), from: pa, lvl: 1});
    for (const b of (a.items || []).slice(0, 25)) {
      const pb = await pagina(b); if (pb && pb <= last && !IND_FUERA.test(b.title.trim())) items.push({title: b.title.trim(), from: pb, lvl: 2});
    }
  }
  return items.length >= 2 ? items : null;
}
// Secciones numeradas («2. Methods», «3.1.1. Prehospital care»): mucho más confiables que adivinar títulos.
function indiceNumerado(info, last){
  const vistos = new Map();
  info.pages.slice(0, last).forEach((p, i) => (p || "").split("\n").forEach(l => {
    const m = l.trim().match(/^(\d{1,2}(?:\.\d{1,2}){0,3})\.?\s+([A-ZÁÉÍÓÚÑ][^\n]{2,80})$/);
    if (!m) return;
    const t = m[2].replace(/\.$/, "").trim(), palabras = t.split(/\s+/);
    if (palabras.length > 8 || /\b(a|an|the|of|with|and|or|de|la|el|con|y|para|por)$/i.test(t) || IND_FUERA.test(t) || ES_GLOSARIO(t)) return;
    if (!vistos.has(m[1])) vistos.set(m[1], {num: m[1], title: t, from: i + 1, nivel: m[1].split(".").length});
  }));
  const clave = n => n.split(".").map(x => x.padStart(2, "0")).join(".");
  let items = [...vistos.values()].filter(x => x.nivel <= 3).sort((a, b) => clave(a.num) < clave(b.num) ? -1 : 1);
  if (new Set(items.filter(x => x.nivel === 1).map(x => x.num)).size < 3) return null;
  // En un PDF a dos columnas una sección puede leerse antes que la anterior: la página nunca retrocede.
  items.forEach((x, i) => { if (i && x.from < items[i - 1].from) x.from = items[i - 1].from; });
  return items.map(x => ({title: `${x.num}. ${x.title}`, from: x.from, lvl: x.nivel === 1 ? 1 : 2}));
}
function indiceDeTitulos(s, info, last){
  const all = (info.allHeads || info.heads || []).filter(h => h.page <= last && tituloValido(h.t)).sort((a, b) => a.page - b.page);
  const top = all.filter(h => h.lvl === 1);
  const principales = all.filter(h => SECC_PRINCIPAL.test(h.t) && h.t.split(/\s+/).length <= 5).length;
  let items;
  if (principales >= 3) {
    items = all.map(h => ({title: h.t, from: h.page, lvl: SECC_PRINCIPAL.test(h.t) && h.t.split(/\s+/).length <= 5 ? 1 : 2}));
    // A dos columnas, la introducción puede leerse después de la sección siguiente de la misma página: va primero.
    const intro = items.findIndex(x => x.lvl === 1 && /^(introduc|background|antecedentes)/i.test(x.title));
    if (intro > 0) { const x = items[intro], k = items.findIndex(y => y.from === x.from); if (k >= 0 && k < intro) { items.splice(intro, 1); items.splice(k, 0, x); } }
  }
  else items = (top.length >= 3 ? all : all.filter((h, i, a) => a.findIndex(x => x.page === h.page) === i))
    .map(h => ({title: h.t, from: h.page, lvl: top.length >= 3 ? h.lvl : 1}));
  if (items.length > 40) items = items.filter(x => x.lvl === 1);
  return items.length >= 2 ? items : null;
}
// Versión del índice automático: al mejorar cómo se calcula, los índices viejos se rehacen solos
// (no los hechos con IA, los del propio PDF ni los que el usuario editó a mano).
const IND_VERSION = 2;
const indiceAlDia = s => !!s.indice && (s.indice.v >= IND_VERSION || ["ia", "pdf", "apuntes"].includes(s.indice.fuente));
async function buildIndice(s){
  if (indiceAlDia(s)) return s.indice;
  const viejo = s.indice;
  const info = docInfo(s.id); if (!info) return null;
  const last = Math.min(s.pages, info.refFrom === Infinity ? s.pages : info.refFrom);
  let items = null, fuente = "";
  const deIA = () => s.chapters && s.chapters.length ? s.chapters.map(c => ({title: c.title, from: c.from, to: c.to, lvl: 1, summary: c.summary})) : null;
  if ((items = deIA())) fuente = "ia";
  if (!items) { try { items = await indiceDelPdf(s, last); fuente = "pdf"; } catch(e) {} }
  if (!items && s.kind !== "text") { try { items = indiceDeMaqueta(await lineasDelPdf(await anDoc(s.id), last), last, s.title); fuente = "maqueta"; } catch(e) {} }
  if (!items) { items = indiceNumerado(info, last); fuente = "numerado"; }
  if (!items) { items = indiceDeTitulos(s, info, last); fuente = "titulos"; }
  // Mientras se buscaba, pudo terminar otro cálculo o crearse el índice con IA: ese manda.
  if (s.indice && s.indice !== viejo) return s.indice;
  if (fuente !== "ia" && deIA()) { items = deIA(); fuente = "ia"; }
  s.indice = {v: IND_VERSION, fuente: items ? fuente : "", items: items ? conHasta(items, last) : []};
  save();
  return s.indice;
}
const IND_FUENTE = {apuntes: "Tus entradas por día.", pdf: "Índice del propio PDF.", maqueta: "Detectado sin IA por los títulos del documento (su letra y su tamaño).", numerado: "Secciones numeradas del documento.", titulos: "Detectado sin IA por los títulos del documento: a veces confunde rótulos de figuras o tablas con secciones.", ia: "Creado con IA a partir del documento."};

// ---------- tema elegido ----------
function temaActual(){
  const s = cur(), items = (s && s.indice && s.indice.items) || [];
  if (gen.manual) return {title: `Págs. ${gen.manual.from}–${gen.manual.to}`, from: gen.manual.from, to: gen.manual.to};
  return gen.tema != null && items[gen.tema] ? items[gen.tema] : null;
}
// Texto del tema elegido (o de todo el documento sin referencias), con el mismo formato que usa la IA.
function temaSel(){
  const s = cur(), info = docInfo(curSrc); if (!info) return null;
  const t = temaActual();
  let nums = [];
  if (t) for (let i = Math.max(1, t.from); i <= Math.min(s.pages, t.to); i++) nums.push(i);
  else nums = info.pages.map((p, i) => i + 1);
  nums = nums.filter(n => (info.pages[n - 1] || "").trim());
  if (!nums.length) return null;
  return {a: nums[0], b: nums[nums.length - 1], nums, pages: nums.map(n => info.pages[n - 1]), title: t ? t.title : "Todo el documento"};
}

// ---------- recomendaciones (sin IA) ----------
const REC_RE = /\b(?:is|are) (?:not )?recommended\b|\bshould(?: not)? (?:be|receive|undergo)\b|\bis (?:reasonable|not beneficial|harmful|potentially harmful|not useful|not well established|uncertain)\b|\bmay be (?:reasonable|considered)\b|\bwe (?:recommend|suggest)\b|^(?:Offer|Consider|Do not|Use|Give|Treat|Measure|Perform|Refer)\b|\bse recomienda\b|\bno se recomienda\b|\bse sugiere\b|\bes razonable\b|\bdebe(?:n|r[ií]a)? (?:ser|realizarse|administrarse|considerarse|evitarse)\b|\best[aá] (?:indicad|contraindicad)\w*/i;
const CLASE_RE = /(?:^|\s)(1|2a|2b|3:\s?(?:No Benefit|Harm)|III|IIb|IIa|I)\s+(A|B-R|B-NR|C-LD|C-EO|B|C)(?=\s|$)/;
const CIFRA_RE = /(?:[<>≤≥]\s*=?\s*)?\d+(?:[.,]\d+)?(?:\s*(?:-|–|to|a)\s*\d+(?:[.,]\d+)?)?\s*(?:mm\s?Hg|mg\/kg\/(?:h|d[ií]a|day|min)|[µu]g\/kg\/min|mcg\/kg\/min|mL\/kg\/h|ml\/kg\/h|mL\/kg|ml\/kg|mg\/kg|mg\/dL|mmol\/L|mEq\/L|g\/dL|U\/kg|UI\/kg|mg|[µu]g|mcg|mL|ml|kg|%|°C|hours?|horas?|minutes?|minutos?|min\b|h\b|days?|d[ií]as?|weeks?|semanas?|months?|meses|years?|años|cm|mm\b|points?|puntos)/gi;
const lineas = txt => txt.replace(/ ?-\n(?=[a-záéíóúñ])/g, "").replace(/\s*\n\s*/g, " ");   // une las palabras cortadas al final de línea («appro -⏎priate»)
function subtemaDe(page){
  const s = cur(); if (!s) return "";
  const items = (s.indice && s.indice.items) || [], t = temaActual();
  const dentro = items.filter(x => x.from <= page && page <= x.to && (!t || (x.from >= t.from && x.to <= t.to)));
  dentro.sort((a, b) => b.lvl - a.lvl || b.from - a.from);
  return dentro[0] ? dentro[0].title : (t ? t.title : "");
}
function buscarRecomendaciones(sel, max = 40){
  const out = [], datos = [];
  sel.pages.forEach((txt, i) => {
    const page = sel.nums[i], plano = lineas(txt);
    const partes = plano.split(/(?<=[.!?])\s+(?=(?:\d{1,2}\.\s)?[A-Z¿¡ÁÉÍÓÚÑ]|(?:1|2a|2b|3:)\s+[ABC])/);
    // En las tablas de las guías (AHA) la clase y el nivel a veces quedan al final del enunciado anterior,
    // pegados al número del siguiente («… 2a C-LD 2.»): esa clase es del enunciado que sigue.
    let pendiente = "";
    const fmt = m => /^\d/.test(m[1]) ? `COR ${m[1]} · LOE ${m[2]}` : `Clase ${m[1]} · ${m[2]}`;
    for (let p of partes) {
      p = cleanSent(p).replace(/\s+\d+(?:\.\d+)+\.?$/, "");   // sin «3.1.1.» al final
      const heredada = pendiente; pendiente = "";
      const fin = p.match(/(?:^|\s)(1|2a|2b|3:\s?(?:No Benefit|Harm)|III|IIb|IIa|I)\s+(A|B-R|B-NR|C-LD|C-EO|B|C)(?:\s+\d{1,2}\.?)?\s*$/);
      if (fin) { pendiente = fmt(fin); p = p.slice(0, fin.index).trim(); }
      p = p.replace(/^\d{1,2}\.\s+/, "");
      // La clase justo antes del enunciado (a veces pegada a un título): se toma y se quita del texto.
      let clase = heredada, texto = p;
      const cm = p.slice(0, 120).match(CLASE_RE);
      if (cm && !/[.!?]/.test(p.slice(0, cm.index))) { clase = fmt(cm); texto = p.slice(cm.index + cm[0].length).trim().replace(/^\d{1,2}\.\s+/, ""); }
      if (texto.length < 40 || texto.length > 600 || JUNK.test(texto)) continue;
      if (/^[a-záéíóúñ(,;]/.test(texto)) continue;   // continuación de una frase de la columna o página anterior
      if ((texto.match(/\d/g) || []).length > texto.length * 0.2) continue;
      const cifras = [...new Set((texto.match(CIFRA_RE) || []).map(x => x.trim()))].filter(x => !/^(19|20)\d{2}$/.test(x)).slice(0, 4);
      const item = {text: texto, page, cifras, clase, on: false};
      if (REC_RE.test(texto)) out.push(item);
      else if (cifras.length && KEYW.test(texto)) datos.push(item);
    }
  });
  const unicos = arr => { const v = new Set(); return arr.filter(x => { const k = x.text.slice(0, 90); if (v.has(k)) return false; v.add(k); return true; }); };
  const recs = unicos(out), extra = recs.length ? [] : unicos(datos).map(x => Object.assign(x, {dato: true}));
  return [...recs, ...extra].slice(0, max).map(x => Object.assign(x, {subtema: subtemaDe(x.page)}));
}

let recs = null, recsKey = "";
// Qué muestra la pestaña: recomendaciones por grado (guías), resultados con cifras (estudios originales).
const recEsEstudio = s => { try { return ESTUDIO_PAPERS.includes(s.design || detectDesign((docInfo(s.id) || {pages: []}).pages.slice(0, 6).join(" "))); } catch(e) { return false; } };
function renderRecs(){
  const b = $("#gBody"), sel = temaSel(), t = temaActual(), s = cur();
  if (!sel) { b.innerHTML = `<p class="small muted" style="margin:0">Ese tema no tiene texto que se pueda leer.</p>`; return; }
  const estudio = recEsEstudio(s), key = s.id + "|" + sel.nums.join(",") + "|" + estudio;
  if (recsKey !== key) { recs = estudio ? resultadosConCifras(sel) : recsPorGrado(sel); recsKey = key; }
  const n = recs.filter(r => r.on).length, donde = esc(sel.title);
  const fila = i => { const r = recs[i]; return `<div class="cand"><input type="checkbox" data-ri="${i}" ${r.on ? "checked" : ""} aria-label="Usar">
    <div class="stack" style="min-width:0;gap:4px"><p class="small" style="margin:0">${esc(r.text)}</p>
    <div class="row" style="gap:6px">${r.clase ? `<span class="tag">${esc(r.clase)}</span>` : ""}${r.cifras.map(c => `<span class="tag" style="background:var(--subtle)">${esc(c)}</span>`).join("")}<button class="linkbtn xs" data-rpg="${r.page}">pág. ${r.page}</button>${r.subtema && (!t || r.subtema !== t.title) ? `<span class="xs muted">${esc(r.subtema)}</span>` : ""}</div></div></div>`; };
  let cuerpo;
  if (!recs.length) cuerpo = estudio
    ? `<p class="small" style="margin:0">No encontré frases de resultados con su efecto (hazard ratio, riesgo relativo, IC 95 %) en «${donde}». Prueba con <b>Todo el documento</b> o con el tema de resultados.</p>`
    : `<div class="note stack" style="margin:0" id="recSinGrado"><p class="small" style="margin:0">${donde === "Todo el documento" ? "En <b>todo el documento</b>" : `En «${donde}»`} <b>no encontré recomendaciones con su grado</b> (la clase o la fuerza, como en las guías AHA/ACC, ESC, GRADE o NICE), así que sin IA no puedo separarlas con seguridad.</p>
        <p class="xs muted" style="margin:0">${getKey() ? "Con IA, «💎 Fichas y preguntas» saca lo importante del tema. " : ""}Sin IA, en «📖 Leer» marca tú lo importante y crea la ficha.</p>
        <div class="row" style="gap:6px"><button class="btn sm" data-gtab="read">📖 Leer</button>${getKey() ? `<button class="btn sm" data-gtab="ai">💎 Fichas y preguntas</button>` : ""}</div></div>`;
  else if (estudio) cuerpo = `<p class="xs muted" style="margin:0">Es un estudio original: no trae recomendaciones. Estas son las frases de «${donde}» con el efecto y sus cifras. Para leerlo con método, usa 🔬 Auditoría o el laboratorio MBE.</p>
      ${plegable("recres", `<b>📊 Ver las ${recs.length} frases con cifras</b>`, recs.map((r, i) => fila(i)).join(""), recs.some(r => r.on))}`;
  else cuerpo = `<p class="xs muted" style="margin:0">Las recomendaciones de «${donde}» separadas por su grado (${recs.length}). Marca las que quieras y crea la ficha.</p>
      ${Object.entries(REC_GRUPOS).map(([g, G]) => { const ix = recs.map((r, i) => r.grupo === g ? i : -1).filter(i => i >= 0); if (!ix.length) return "";
        return plegable("recg_" + g, `<b>${G.t}</b> <span class="xs muted">${ix.length} · ${G.d}</span>`, ix.map(fila).join(""), recs.some((r, i) => r.on && r.grupo === g)); }).join("")}`;
  b.innerHTML = cuerpo + (recs.length ? `
    <div class="row" style="gap:6px;margin-top:6px"><button class="btn primary" id="recMake" ${n ? "" : "disabled"}>💎 Crear ficha con ${n}</button>
      ${getKey() ? `<button class="btn" id="recAI" ${n ? "" : "disabled"}>✨ Redactar la ficha con IA</button>` : ""}</div>
    ${getKey() && n ? `<p class="xs muted" style="margin:0">Con IA: ${aiEstimateLine(recs.filter(r => r.on).reduce((a, r) => a + r.text.length, 0), {light: true, outTokens: 800})}; escribe rótulos cortos con los mismos datos.</p>` : ""}
    <div id="recEd"></div>` : "");
  b.querySelectorAll("[data-gtab]").forEach(x => x.onclick = () => { gen.tab = x.dataset.gtab; renderGen(); });
  b.querySelectorAll("[data-ri]").forEach(c => c.onchange = () => { recs[+c.dataset.ri].on = c.checked; renderRecs(); });
  b.querySelectorAll("[data-rpg]").forEach(x => x.onclick = () => { gen.tab = "read"; gen.rdPage = +x.dataset.rpg; renderGen(); });
  const marcadas = () => recs.filter(r => r.on);
  const abrir = (o) => hyEditor($("#recEd"), Object.assign({spec: gen.spec, src: s.id, page: marcadas()[0].page, ctx: marcadas().map(r => r.text).join(" … "),
    onSave: () => { recs.forEach(r => r.on = false); renderRecs(); renderSrcItems(); }}, o));
  $("#recMake") && ($("#recMake").onclick = () => {
    const m = marcadas();
    abrir({title: (t ? t.title : s.title), rows: m.slice(0, 6).map(r => ({label: [r.subtema !== (t && t.title) ? r.subtema : "", r.clase].filter(Boolean).join(" · ") || (estudio ? "Resultado" : "Recomendación"), val: r.text})),
      heading: estudio ? "💎 Nueva ficha con los resultados marcados" : "💎 Nueva ficha con las recomendaciones marcadas", flags: {auto: true}});
  });
  $("#recAI") && ($("#recAI").onclick = async () => {
    const m = marcadas(), bt = $("#recAI"); bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Redactando…`;
    try {
      const r = await callForTool({system: "Eres un profesor de medicina. Conviertes enunciados de una guía en una ficha high-yield: un título corto, de 2 a 6 filas con un rótulo breve (qué es) y el dato exacto (cifra, conducta o clase de recomendación), una bandera roja y una trampa de examen si el texto las permite. Usa solo el texto recibido; copia las cifras tal como aparecen. Español neutro, sin markdown.",
        tools: [T_FICHA], user: `Tema: ${t ? t.title : s.title}\n\n${m.map(x => `[pág. ${x.page}]${x.clase ? ` (${x.clase})` : ""} ${x.text}`).join("\n")}`, light: true, label: "Redactar ficha"}, "report_ficha");
      const rows = (r.rows || []).filter(x => x && x.label && x.val).slice(0, 6);
      if (!rows.length) throw uerr("La IA no pudo armar la ficha con esos enunciados.");
      abrir({title: r.title || (t ? t.title : s.title), rows, redFlag: r.redFlag || "", trap: r.trap || "", heading: "✨ Ficha redactada por la IA · revísala y guárdala", flags: {ai: true}});
    } catch(e) { toast(e.userMsg || e.message); }
    bt.disabled = false; bt.textContent = "✨ Redactar la ficha con IA";
  });
}
const T_FICHA = {name: "report_ficha", description: "Entrega la ficha redactada.", strict: true,
  input_schema: {type: "object", additionalProperties: false, required: ["title", "rows", "redFlag", "trap"], properties: {
    title: {type: "string"}, redFlag: {type: "string"}, trap: {type: "string"},
    rows: {type: "array", items: {type: "object", additionalProperties: false, required: ["label", "val"], properties: {label: {type: "string"}, val: {type: "string"}}}}}}};

