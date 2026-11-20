// Arma medipulse-un-archivo.html: la app completa en un solo archivo (estilos, datos y código
// incluidos), para verla en visores que abren un solo HTML o para pasarla a otra IA.
//
// Uso (desde la carpeta medipulse):
//   node tools/un-archivo.js            → lo genera una vez
//   node tools/un-archivo.js --watch    → lo vuelve a generar cada vez que cambia un módulo
//
// El archivo generado no se sube al repo (.gitignore): la fuente de verdad son los módulos.
//   node tools/un-archivo.js --con-librerias  → incluye además pdf.js y el SDK de Claude (~2,8 MB),
//                                               para usar PDF e IA sin internet
// Sin esa opción, el lector de PDF y la IA se cargan desde internet.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "medipulse-un-archivo.html");
const WITH_LIBS = process.argv.includes("--con-librerias");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
// Un "</script" dentro del código cerraría la etiqueta antes de tiempo.
const safeJs = s => s.replace(/<\/script/gi, "<\\/script");
// Quita las líneas que son solo un comentario («// …») para que el archivo pese menos. Cuenta las
// comillas invertidas para no tocar líneas dentro de una plantilla de texto (`…`).
function sinComentarios(js){
  let abiertas = 0;
  return js.split("\n").filter(l => {
    const quitar = abiertas % 2 === 0 && /^\s*\/\/(?!#)/.test(l);
    if (!quitar) abiertas += (l.replace(/\\`/g, "").match(/`/g) || []).length;
    return !quitar;
  }).join("\n");
}
const safeCss = s => s.replace(/<\/style/gi, "<\\/style");

// El contenido incluido (data/contenido/*.js) va en JSON sin sangrías: pesa bastante menos y es idéntico.
function compactar(src, js) {
  if (!/^data\/contenido\//.test(src)) return js;
  return js.replace(/MP_CONTENIDO\.agregar\(([\s\S]*)\);\s*$/, (_, json) => {
    try { return `MP_CONTENIDO.agregar(${JSON.stringify(JSON.parse(json))});\n`; } catch (e) { return _; }
  });
}
function build() {
  let html = read("index.html");
  const parts = [];
  html = html.replace(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g, (_, href) => {
    parts.push(href); return `<style>\n${safeCss(read(href))}</style>`;
  });
  html = html.replace(/<script src="((?:data|js)\/[^"]+)"><\/script>/g, (_, src) => {
    parts.push(src); return `<script>\n// ===== ${src} =====\n${safeJs(sinComentarios(compactar(src, read(src))))}</script>`;
  });
  // Librerías de vendor/ como texto: la app las carga desde aquí si no tiene la carpeta al lado.
  // Solo con --con-librerias (pesa ~2,8 MB y algunos visores se cuelgan). Por defecto, la app las busca
  // en internet (respaldos que ya tiene) y el archivo queda liviano.
  const vend = !WITH_LIBS ? "" : [["vend-pdf", "vendor/pdf.min.js"], ["vend-pdfw", "vendor/pdf.worker.min.js"], ["vend-sdk", "vendor/anthropic-sdk.mjs"]]
    // en base64: así ningún "<!--" ni "</script" del código puede romper el HTML
    .map(([id, f]) => `<script type="text/plain" id="${id}">${fs.readFileSync(path.join(ROOT, f)).toString("base64")}</script>`).join("\n");
  if (vend) html = html.replace(/(<script>\n\/\/ ===== data\/)/, vend + "\n$1");
  // Ícono incrustado; el manifiesto solo sirve en el sitio publicado.
  const icon = "data:image/svg+xml;base64," + Buffer.from(read("icon.svg")).toString("base64");
  html = html.replace(/(href|src)="icon\.svg"/g, (m, a) => `${a}="${icon}"`).replace(/<link rel="manifest"[^>]*>\n?/, "");
  const left = html.match(/<(?:script src|link rel="stylesheet" href)="(?:css|data|js)\/[^"]+"/g);
  if (left) throw new Error("Quedaron archivos sin incluir: " + left.join(", "));
  html = html.replace("<head>", `<head>\n<!-- Archivo generado por tools/un-archivo.js a partir de los módulos. No lo edites: cambia los módulos y vuelve a generarlo. -->`);
  fs.writeFileSync(OUT, html);
  return parts.length;
}

const stamp = () => new Date().toLocaleTimeString();
if (require.main === module) {
try { console.log(`${stamp()} medipulse-un-archivo.html listo (${build()} archivos incluidos)`); }
catch (e) { console.error(e.message); process.exitCode = 1; }

if (process.argv.includes("--watch")) {
  let t = null;
  const again = () => { clearTimeout(t); t = setTimeout(() => {
    try { console.log(`${stamp()} actualizado (${build()} archivos)`); } catch (e) { console.error(e.message); }
  }, 150); };
  fs.watch(path.join(ROOT, "index.html"), again);
  for (const d of ["css", "data", "js"]) fs.watch(path.join(ROOT, d), again);
  console.log("Vigilando cambios en index.html, css/, data/ y js/ (Ctrl+C para salir)…");
}
}

module.exports = { build, OUT };
