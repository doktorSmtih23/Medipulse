// ===================================================================
// MAQUETA DEL PDF: el índice sin IA a partir de cómo está impreso el documento, no solo de su texto.
// Cada línea trae su fuente y su tamaño (pdf.js). En una revista o una guía, los títulos usan un
// estilo propio (fuente + tamaño) que se repite en varias páginas, con textos cortos y distintos; el
// cuerpo del texto, los encabezados de página (iguales en todas), los rótulos de figuras (en una sola
// página, letra chica) y las afiliaciones (líneas largas) tienen otro perfil. Se agrupan las líneas
// por estilo, se eligen los estilos de título y se arma el índice. Probado con 17 PDF reales
// (tools/banco-pdf.js); todo corre en el dispositivo.
// ===================================================================
// Líneas de cada página: {p, y, x, s (tamaño), f (fuente), g (mayor espacio entre palabras, en tamaños de letra), t}.
async function lineasDelPdf(doc, last){
  const out = [], n = Math.min(doc.numPages, last || doc.numPages);
  for (let p = 1; p <= n; p++) {
    const tc = await (await doc.getPage(p)).getTextContent();
    let cur = null;
    const cerrar = () => { if (cur && cur.t.trim()) out.push({p, y: cur.y, x: cur.x, s: cur.s, g: Math.round(cur.g * 10) / 10,
      f: Object.entries(cur.fc).sort((a, b) => b[1] - a[1])[0][0], t: cur.t.replace(/\s+/g, " ").trim()}); cur = null; };
    for (const it of tc.items) {
      if (!it.str.trim()) { if (cur) cur.t += " "; if (it.hasEOL) cerrar(); continue; }
      const s = Math.round(Math.hypot(it.transform[2], it.transform[3]) * 10) / 10, y = Math.round(it.transform[5]), x = Math.round(it.transform[4]);
      if (!cur || Math.abs(cur.y - y) > 2 || x < cur.xe - 5) { cerrar(); cur = {y, x, xe: x, s, t: "", fc: {}, g: 0}; }
      else if (cur.t.trim()) cur.g = Math.max(cur.g, (x - cur.xe) / (s || 1));
      cur.t += it.str; cur.xe = x + it.width; cur.s = Math.max(cur.s, s);
      cur.fc[it.fontName] = (cur.fc[it.fontName] || 0) + it.str.length;
      if (it.hasEOL) cerrar();
    }
    cerrar();
  }
  return out;
}

const MQ_FIGURA = /^(fig(ure|ura)?\.?|table|tabla|cuadro|box|recuadro|panel)\s*(\d|\.)/i;
// Desde aquí ya no hay temas (las referencias) y lo que nunca es tema.
const MQ_FIN = /^(references?|referencias|bibliograf[ií]a|bibliography|literature cited)$/i;
const MQ_FUERA = /^(references?|referencias|bibliograf|acknowledg|agradec|author (contributions|information|affiliations)|corresponding author|article information|informaci[oó]n del art|accepted for publication|published online|(declaration of )?competing interests?|conflicts? of interest|conflictos? de inter|disclosures?|funding|financiaci|additional information|supplementary|supplemental content|multimedia|peer review|data availability|appendix|anexo [a-z0-9]\b|abbreviations|abreviaturas)/i;
const MQ_PERSONA = /\b(MD|PhD|FAHA|FACC|MSc|MPH|MBBS|FRCP)\b|^(chair|vice chair|co-chair)\b|,\s*(chair|vice chair)\b/i;
const MQ_CAJA = /^(what[’']?s new|key (points|messages|recommendations)|sort:|puntos clave|lo nuevo|sections$|abstract$|resumen$|(table of )?contents$|contenido$|keywords|palabras clave|synopsis$|sinopsis$|recommendation-specific supportive text|texto de apoyo)/i;
const MQ_UNE = /\b(de|del|la|las|el|los|y|e|o|en|con|para|por|a|al|of|the|and|or|in|for|with|to|on|vs\.?)$/i;
const mqLetras = t => (t.match(/\p{L}/gu) || []).length;
const mqMayus = t => mqLetras(t) > 3 && t === t.toUpperCase();
// «Me thods», «R esult s», «A bs t r ac t»: títulos con letras espaciadas.
function mqEspaciado(t){
  const w = t.split(/\s+/), j = w.join("");
  if (SECC_PRINCIPAL.test(t) || j.length > 24 || w.length < 2) return t;
  return SECC_PRINCIPAL.test(j) || w.filter(x => x.length === 1).length >= 2 && w.filter(x => x.length <= 3).length / w.length >= 0.5 ? j.charAt(0) + j.slice(1).toLowerCase() : t;
}
// Pregunta PICO de una guía («1. En pacientes adultos con sospecha de NAC, ¿debe considerarse…?»):
// queda la pregunta, más corta.
function mqPregunta(t){
  const m = t.match(/^(\d{1,2})\.\s+.*?(¿[^?]+\?)\s*$/);
  return m ? `${m[1]}. ${m[2].charAt(0) + m[2].charAt(1).toUpperCase() + m[2].slice(2)}` : null;
}

// Índice a partir de las líneas. Devuelve [{title, from, lvl}] o null si no hay estilos de título claros.
function indiceDeMaqueta(L, last, tituloDoc){
  L = L.filter(l => l.p <= last);
  const paginas = new Set(L.map(l => l.p)).size, k = l => l.f + "|" + l.s;
  // Bloques: renglones seguidos del mismo estilo que continúan la frase (títulos de varios renglones).
  const B = [];
  L.forEach(l => {
    const b = B[B.length - 1], u = b && b.ult;
    if (b && b.k === k(l) && u.p === l.p && Math.abs(u.y - l.y) <= l.s * 1.8 && Math.abs(u.x - l.x) <= 80
      && (/^[\p{Ll}¿(]/u.test(l.t) || /[,;:\-–]$/.test(b.t) || MQ_UNE.test(b.t) || (!/[?.]$/.test(b.t) && !/\s/.test(l.t)) || (mqMayus(b.t) && mqMayus(l.t)))) { b.t += " " + l.t; b.ult = l; b.g = Math.max(b.g, l.g || 0); return; }
    B.push({t: l.t, p: l.p, s: l.s, k: k(l), ult: l, g: l.g || 0});
  });
  B.forEach((b, i) => { b.t = b.t.replace(/\s+/g, " ").trim(); b.sig = B[i + 1]; });
  // Cuerpo: el estilo con más letras en bloques largos.
  const grupos = new Map(); B.forEach(b => (grupos.get(b.k) || grupos.set(b.k, []).get(b.k)).push(b));
  let cuerpo = null, max = 0;
  grupos.forEach((bs, key) => { const c = bs.reduce((a, b) => a + (b.t.length > 50 ? b.t.length : 0), 0); if (c > max) { max = c; cuerpo = key; } });
  if (!cuerpo) return null;
  const sCuerpo = +cuerpo.split("|")[1];
  // Encabezados y pies de página: el mismo texto (salvo el número de página) a la misma altura en
  // varias páginas. Un título como «Treatment» se repite en cada sección, pero a otra altura.
  const base = t => norm(t).replace(/[\d•|·]+/g, "").replace(/\s+/g, " ").trim(), pos = new Map();
  B.forEach(b => { const key = base(b.t) + "@" + Math.round(b.ult.y / 15); (pos.get(key) || pos.set(key, new Set()).get(key)).add(b.p); });
  B.forEach(b => { b.corre = pos.get(base(b.t) + "@" + Math.round(b.ult.y / 15)).size >= 3; b.rotulo = MQ_FIGURA.test(b.t) || /^(fig(ure|ura)?|table|tabla)\s*\d+$/i.test(b.t); });
  // El título de una tabla o figura va justo después de su rótulo («TABLE 3» → «Pitfalls in…»).
  B.forEach((b, i) => { const a = B[i - 1]; if (a && a.rotulo && a.p === b.p && (/^(fig(ure|ura)?|table|tabla|cuadro)\s*\d+\.?$/i.test(a.t) || a.k === b.k && Math.abs(a.ult.y - b.ult.y) <= b.s * 1.8)) b.rotulo = true; });
  const estilos = [];
  grupos.forEach((bs, key) => {
    if (key === cuerpo) return;
    const corre = bs.filter(b => b.corre).length / bs.length;
    bs = bs.filter(b => !b.corre && !b.rotulo);
    if (bs.length < 2 || corre > 0.5) return;            // un estilo que es sobre todo encabezado de página
    const ts = bs.map(b => b.t), n = ts.length, s = +key.split("|")[1];
    const avg = ts.reduce((a, t) => a + t.length, 0) / n, pags = new Set(bs.map(b => b.p)).size;
    const mayus = ts.filter(t => /^[\p{Lu}0-9¿]/u.test(t)).length / n;
    const punto = ts.filter(t => /[.;]$/.test(t) && !/\b(al|vs|et)\.$/.test(t)).length / n;
    const cifras = ts.filter(t => mqLetras(t) < t.length * 0.5).length / n;
    const celdas = bs.filter(b => (b.g || 0) > 1.5).length / n;     // encabezados de columnas de una tabla
    // Un título va seguido de texto corrido; un encabezado de tabla, de celdas.
    const prosa = bs.filter(b => b.sig && b.sig.k !== key && b.sig.t.length > 40 && /[\p{Ll}]{3}/u.test(b.sig.t)).length / n;
    if (s < sCuerpo * 0.85 || avg < 4 || avg > 110 || mayus < 0.7 || punto > 0.25 || cifras > 0.2 || prosa < 0.4 || celdas > 0.3) return;
    if (pags < 2 && paginas > 2) return;            // rótulos de una figura o lista de secciones de la portada
    if (n > B.length * 0.2) return;                 // demasiado frecuente para ser título
    estilos.push({key, s, n});
  });
  if (!estilos.length) return null;
  const esTitulo = new Set(estilos.map(e => e.key)), tam = [...new Set(estilos.map(e => e.s))].sort((a, b) => b - a);
  const st = norm(tituloDoc || "");
  let out = [];
  for (const b of B) {
    if (!esTitulo.has(b.k) || b.corre || b.rotulo) continue;
    let t = mqEspaciado(b.t);
    const preg = /^\d{1,2}\.\s+(en|in)\b/i.test(t);
    if (!preg) t = t.replace(/^\d+(\.\d+)*\.?\s+(?=\D)/, "");
    if (MQ_FIN.test(t) && b.p > 1) break;                              // desde las referencias no hay más temas
    if (MQ_FUERA.test(t) || MQ_FIGURA.test(t) || MQ_CAJA.test(t) || MQ_PERSONA.test(t) || mqLetras(t) < 3) continue;
    // Título dentro del párrafo («Genetics. Early studies…»): queda la parte del título.
    const enLinea = t.match(/^([^.]{4,90}?)\.\s+\p{Lu}/u);
    if (enLinea && !/\?$/.test(t)) t = enLinea[1];
    // Definición en línea («High Bleeding Risk (HBR): A system developed by the») o palabra cortada.
    if (/-$/.test(t) || /:\s+\p{Lu}\p{Ll}*(\s+\p{Ll}+){0,6}$/u.test(t)) continue;
    if (st && (norm(t) === st || st.startsWith(norm(t)) && t.length > 20)) continue;
    const q = mqPregunta(t);
    if (!q && t.length > 100) continue;
    out.push({k: b.k, title: q || t.replace(/[.:]$/, ""), from: b.p, lvl: q ? 2 : tam.indexOf(b.s) === 0 && tam.length > 1 ? 1 : tam.length > 1 ? 2 : 1});
  }
  // Glosarios y filas de tablas: muchos «títulos» cortos del mismo estilo en una sola página.
  const cuenta = new Map(); out.forEach(x => { const key = x.from + "|" + x.k; cuenta.set(key, (cuenta.get(key) || 0) + 1); });
  out = out.filter(x => !(cuenta.get(x.from + "|" + x.k) >= 6 && x.lvl === 2 && x.title.split(/\s+/).length <= 5 && !/^\d+\. ¿/.test(x.title)));
  // A dos columnas, la introducción puede leerse después de la sección siguiente de la misma página: va primero.
  const intro = out.findIndex(x => x.lvl === 1 && /^(introduc|background|antecedentes)/i.test(x.title));
  if (intro > 0) { const x = out[intro], j = out.findIndex(y => y.from === x.from && y.lvl === 1); if (j >= 0 && j < intro) { out.splice(intro, 1); out.splice(j, 0, x); } }
  // Con un solo tamaño de título, lo escrito en MAYÚSCULAS es la sección y lo demás, subsección.
  if (tam.length === 1 && out.some(x => x.lvl === 1 && x.title === x.title.toUpperCase() && mqLetras(x.title) > 3) && out.some(x => x.title !== x.title.toUpperCase()))
    out.forEach(x => { if (x.lvl === 1 && x.title !== x.title.toUpperCase()) x.lvl = 2; });
  // El resumen estructurado (Background, Methods, Results…) repite las secciones: se queda la del artículo.
  const despues = (i, k) => out.slice(i + 1).some(y => y.lvl === 1 && norm(y.title) === k);
  out = out.filter((x, i) => !(x.from === 1 && despues(i, norm(x.title))));
  out = out.filter((x, i) => !(x.from === 1 && x.lvl === 2 && SECC_PRINCIPAL.test(x.title) && x.title.split(/\s+/).length <= 2 && out.some(y => y.from > 1)));
  // Sin repetidos.
  // Sin repetidos dentro de la misma sección («Treatment» puede estar en cada una).
  let padre = "", vistos = new Set(); out = out.filter(x => { if (x.lvl === 1) padre = norm(x.title); const k = (x.lvl === 1 ? "" : padre) + "|" + norm(x.title);
    if (vistos.has(k)) return false; vistos.add(k); return true; });
  if (out.length > 150) out = out.filter(x => x.lvl === 1);
  // Si todo quedó en el segundo nivel, sube.
  if (out.length && !out.some(x => x.lvl === 1)) out.forEach(x => x.lvl = 1);
  return out.length >= 3 ? out.map(({title, from, lvl}) => ({title, from, lvl})) : null;
}

// Título del documento: en la primera página, el bloque de letra más grande que no sea la revista,
// el volumen o un enlace. Sirve cuando el archivo se llama «download (3).pdf» o trae tildes rotas.
const MQ_NO_TITULO = /journal|revista|reviews|primers|circulation|jacc\b|jama\b|lancet|vol\.|volume|doi|issn|www\.|https?:|©|copyright|downloaded|established in|elsevier|springer|wiley|contents lists|homepage|check for updates|^(research|original (investigation|article)|review|primer|seminar|cme|articles?|clinical review|special communication|clinical practice guidelines?|scientific statement|gu[ií]a de pr[aá]ctica cl[ií]nica|consensus statement|position statement)$/i;
function tituloDePagina(L){
  const p1 = L.filter(l => l.p === 1), B = [];
  // La cabecera de la revista («Contents lists available at…», «journal homepage»): lo que está a esa altura es el nombre de la revista.
  const cabecera = p1.filter(l => /contents lists|journal homepage|homepage:/i.test(l.t)).map(l => l.y);
  p1.forEach(l => { const b = B[B.length - 1];
    if (b && b.s === l.s && b.f === l.f && Math.abs(b.y - l.y) <= l.s * 1.6) { b.t += " " + l.t; b.y = l.y; } else B.push({t: l.t, s: l.s, f: l.f, y: l.y}); });
  const ok = B.map(b => Object.assign(b, {t: b.t.replace(/\s+/g, " ").trim()}))
    .filter(b => b.t.length >= 10 && b.t.length <= 400 && b.t.split(" ").length >= 2 && mqLetras(b.t) > b.t.length * 0.6 && !MQ_NO_TITULO.test(b.t)
      && !(cabecera.length && b.y >= Math.min(...cabecera) - 30 && b.y <= Math.max(...cabecera) + 30));
  if (!ok.length) return "";
  const max = Math.max(...ok.map(b => b.s));
  const t = ok.find(b => b.s === max);
  return t && t.s >= 12 ? t.t.replace(/\s*[*†‡§:]+$/, "") : "";
}
// Año: el más reciente que aparece en la primera página (fecha de publicación, ©, volumen), sin pasar del
// actual y sin contar la fecha en que se descargó el PDF («Downloaded from nejm.org on November 2026»).
function anioDePagina(lineas){
  const hoy = new Date().getFullYear(), texto = (Array.isArray(lineas) ? lineas : String(lineas || "").split("\n"))
    .filter(l => !/download|descarga|accessed|consultad|personal use|uso personal|printed|impreso|by guest|this article was/i.test(l)).join(" ");
  const a = (texto.match(/\b(19[5-9]\d|20[0-4]\d)\b/g) || []).map(Number).filter(y => y <= hoy);
  return a.length ? Math.max(...a) : "";
}
