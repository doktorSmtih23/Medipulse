// Cuánto pesa el contenido incluido y cuánto espacio queda. Uso: npm run peso
// El contenido incluido viaja dentro de la app (se descarga al instalar o actualizar y se carga completo en
// memoria al abrir). Los límites de abajo dicen cuándo conviene cambiar cómo se reparte.
const fs = require("fs"), path = require("path"), vm = require("vm");
const RAIZ = path.join(__dirname, "..");
const LIM_ARCHIVO_UNICO = 1.5 * 1024 * 1024;   // el de tests/vista-previa.spec.js
const AVISO_CONTENIDO = 3 * 1024 * 1024;       // desde aquí conviene cargar cada especialidad solo cuando se abre

const ctx = {MP_CONTENIDO: {especialidades: [], agregar(d){ this.especialidades.push(d); }}};
vm.createContext(ctx);
const dir = path.join(RAIZ, "data/contenido");
const archivos = fs.readdirSync(dir).filter(f => f.endsWith(".js") && !["registro.js", "armar.js"].includes(f));
let total = 0, casos = 0;
const filas = archivos.map(f => {
  const txt = fs.readFileSync(path.join(dir, f), "utf8");
  vm.runInContext(txt, ctx);
  const e = ctx.MP_CONTENIDO.especialidades.at(-1), vis = x => x.estado !== "pendiente";
  // En el archivo único el contenido va en JSON sin sangrías: ese es el peso que cuenta.
  const kb = Buffer.byteLength(JSON.stringify(e)) / 1024;
  const n = (e.casos || []).filter(vis).length;
  total += kb; casos += n;
  return [e.especialidad, n, (e.fichas || []).filter(vis).length, kb];
}).sort((a, b) => b[3] - a[3]);

const kbCaso = total / Math.max(1, casos);
console.log("Especialidad".padEnd(30), "Casos", "Fichas", "  KB");
filas.forEach(([e, n, h, kb]) => console.log(e.padEnd(30), String(n).padStart(5), String(h).padStart(6), kb.toFixed(0).padStart(5)));
console.log("-".repeat(48));
console.log("Total".padEnd(30), String(casos).padStart(5), "      ", total.toFixed(0).padStart(5), `KB (≈ ${kbCaso.toFixed(1)} KB por caso con sus fichas)`);

const unico = path.join(RAIZ, "medipulse-un-archivo.html");
if (fs.existsSync(unico)) {
  const t = fs.statSync(unico).size, libre = LIM_ARCHIVO_UNICO - t;
  console.log(`\nArchivo único: ${(t / 1024).toFixed(0)} de ${(LIM_ARCHIVO_UNICO / 1024).toFixed(0)} KB · quedan ${(libre / 1024).toFixed(0)} KB ≈ ${Math.max(0, Math.floor(libre / 1024 / kbCaso))} casos más`);
}
console.log(`Contenido: ${(total / 1024).toFixed(2)} de ${(AVISO_CONTENIDO / 1024 / 1024).toFixed(0)} MB antes de cargar por especialidad · quedan ≈ ${Math.max(0, Math.floor((AVISO_CONTENIDO / 1024 - total) / kbCaso))} casos`);
