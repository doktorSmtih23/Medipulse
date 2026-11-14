// Arma medipulse-un-archivo.html: la app completa en un solo archivo (estilos, datos y código
// incluidos), para verla en visores que abren un solo HTML o para pasarla a otra IA.
//
// Uso (desde la carpeta medipulse):
//   node tools/un-archivo.js            → lo genera una vez
//   node tools/un-archivo.js --watch    → lo vuelve a generar cada vez que cambia un módulo
//
// El archivo generado no se sube al repo (.gitignore): la fuente de verdad son los módulos.
// pdf.js y el SDK de Claude siguen saliendo de vendor/; si no están al lado, la app usa los
// respaldos de internet que ya tiene.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "medipulse-un-archivo.html");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
// Un "</script" dentro del código cerraría la etiqueta antes de tiempo.
const safeJs = s => s.replace(/<\/script/gi, "<\\/script");
const safeCss = s => s.replace(/<\/style/gi, "<\\/style");

function build() {
  let html = read("index.html");
  const parts = [];
  html = html.replace(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g, (_, href) => {
    parts.push(href); return `<style>\n${safeCss(read(href))}</style>`;
  });
  html = html.replace(/<script src="((?:data|js)\/[^"]+)"><\/script>/g, (_, src) => {
    parts.push(src); return `<script>\n// ===== ${src} =====\n${safeJs(read(src))}</script>`;
  });
  // Ícono incrustado; el manifiesto solo sirve en el sitio publicado.
  const icon = "data:image/svg+xml;base64," + Buffer.from(read("icon.svg")).toString("base64");
  html = html.replace(/href="icon\.svg"/g, `href="${icon}"`).replace(/<link rel="manifest"[^>]*>\n?/, "");
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
