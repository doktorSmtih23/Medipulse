// ===================================================================
// TEXTO DE UN DOCUMENTO
// ===================================================================
// Limpieza del texto del PDF (encabezados repetidos, marcas de agua), capítulos y páginas de un tema,
// y utilidades de texto que usan el Taller y las recomendaciones (indice.js).
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

// ---------- utilidades de texto (las usan las recomendaciones de indice.js) ----------
const KEYW = /(primera l[ií]nea|de elecci[oó]n|tratamiento|diagn[oó]stic|contraindicad|est[aá]ndar de oro|gold standard|se define|causa m[aá]s|signo|criterio|indicad|ant[ií]doto|factor(?:es)? de riesgo|complicaci[oó]n|m[aá]s frecuente|patognom|meta|objetivo|dosis|umbral|sospech|urgencia|significant|improv|reduc|increas|efficacy|safety|adverse|primary (?:end ?point|outcome)|randomi[sz]ed|trial|ensayo|eficacia|seguridad|adverso|desenlace)/i;
const JUNK = /(doi|https?:|www\.|©|copyright|e-?mail|@|received|accepted|published|correspond|affiliat|department of|university|universidad|hospital de|licen[cs]e|funding|conflict|et al\.?\s*\(|^fig(ure|ura)?\.?\s|^table|^tabla)/i;
const cleanSent = s => s.replace(/\[\d+(?:[,–-]\s*\d+)*\]/g, "").replace(/\((?:\d+(?:[,–-]\s*\d+)*)\)/g, "").replace(/(\D)\d{1,3}(?:[,–-]\d{1,3})+(?=[\s.,;])/g, "$1").replace(/\s{2,}/g, " ").trim();
