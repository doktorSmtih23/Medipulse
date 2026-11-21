// Nombres globales de la app. MediPulse no usa módulos: cada <script> de index.html declara funciones y
// variables en el ámbito global y los demás archivos las usan. Este archivo los lista para dos cosas:
//   1. eslint.config.js los declara como globales, así ESLint avisa de un nombre que no existe en ningún archivo.
//   2. `node tools/globales.js` avisa si dos archivos declaran el mismo nombre (el segundo pisaría al primero).
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

// Los scripts de la app, en el orden de index.html.
function scripts(){
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  return [...html.matchAll(/<script src="((?:data|js)\/[^"]+)"><\/script>/g)].map(m => m[1]);
}

// Los nombres de una declaración «const a = 1, b = [x, y], c = …;»: recorre el texto contando paréntesis,
// corchetes, llaves y comillas, y toma el nombre que sigue a cada coma de primer nivel.
function nombresDeclarados(txt, i){
  const out = [], id = /^\s*([A-Za-z_$][\w$]*)/;
  let prof = 0, comilla = null;
  const primero = txt.slice(i).match(id); if (primero) out.push(primero[1]);
  for (let k = i; k < txt.length; k++) {
    const c = txt[k];
    if (comilla) { if (c === "\\") k++; else if (c === comilla) comilla = null; continue; }
    if (c === '"' || c === "'" || c === "`") comilla = c;
    else if ("([{".includes(c)) prof++;
    else if (")]}".includes(c)) prof--;
    else if (c === ";" && prof <= 0) break;
    else if (c === "\n" && prof <= 0 && !/[,=(\[{]\s*$/.test(txt.slice(i, k))) break;
    else if (c === "," && prof === 0) { const m = txt.slice(k + 1).match(id); if (m) out.push(m[1]); }
  }
  return out;
}

// Declaraciones de primer nivel: las que empiezan en la columna 0. «window.X = …» también crea un global.
function declaraciones(src){
  const txt = fs.readFileSync(path.join(ROOT, src), "utf8"), out = [];
  for (const m of txt.matchAll(/^(?:async\s+)?(?:function\*?|class)\s+([A-Za-z_$][\w$]*)/gm)) out.push(m[1]);
  for (const m of txt.matchAll(/^(?:const|let|var)\s+(?=[A-Za-z_$])/gm)) out.push(...nombresDeclarados(txt, m.index + m[0].length));
  for (const m of txt.matchAll(/^(?:const|let|var)\s+\{([^}]*)\}\s*=/gm)) m[1].split(",").forEach(x => { const n = x.split(":").pop().trim(); if (n) out.push(n); });
  for (const m of txt.matchAll(/^window\.([A-Za-z_$][\w$]*)\s*=/gm)) out.push(m[1]);
  return [...new Set(out)];
}

function mapa(){
  const donde = {};
  for (const src of scripts()) for (const n of declaraciones(src)) (donde[n] = donde[n] || []).push(src);
  return donde;
}

module.exports = { scripts, declaraciones, mapa };

if (require.main === module) {
  const rep = Object.entries(mapa()).filter(([, fs_]) => fs_.length > 1);
  if (!rep.length) { console.log(`Sin nombres repetidos entre los ${scripts().length} scripts.`); process.exit(0); }
  console.error("Nombres globales declarados en más de un archivo (el último pisa a los anteriores):");
  rep.forEach(([n, fs_]) => console.error(`  ${n}: ${fs_.join(", ")}`));
  process.exit(1);
}
