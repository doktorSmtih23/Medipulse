// Banco de PDF de referencia: mide qué tan bien lee la app los PDF SIN IA (tipo de documento, título,
// año e índice) contra lo esperado en tools/banco-pdf.json. Corre el mismo código de la app en Chromium.
//
//   node tools/banco-pdf.js <carpeta con los PDF>
//
// Los PDF no están en el repo (derechos de autor): cada quien usa su carpeta. Cada archivo se busca en
// banco-pdf.json por parte de su nombre. Antes de cambiar maqueta.js, indice.js o detectDesign, corre
// esto y compara el puntaje: un cambio no debe arreglar un PDF rompiendo otro.
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path"), { spawn } = require("child_process");
const dir = process.argv[2];
if (!dir) { console.error("Uso: node tools/banco-pdf.js <carpeta con los PDF>"); process.exit(1); }
const esperado = JSON.parse(fs.readFileSync(path.join(__dirname, "banco-pdf.json"), "utf8"));
const PORT = 4799, raiz = path.join(__dirname, "..");
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();

(async () => {
  const srv = spawn("node", [path.join(raiz, "tests/servidor.js"), String(PORT)], {stdio: "ignore"});
  await new Promise(r => setTimeout(r, 800));
  const b = await chromium.launch(), page = await b.newPage();
  try {
    await page.goto(`http://localhost:${PORT}/`); await page.evaluate(() => loadPdfJs());
    let total = 0, puntos = 0;
    for (const f of fs.readdirSync(dir).filter(x => /\.pdf$/i.test(x)).sort()) {
      // La clave que aparece primero en el nombre del archivo (PRECISE-DAPT también dice «antiplatelet therapy»).
      const clave = Object.keys(esperado).filter(k => k !== "_" && f.toLowerCase().includes(k.toLowerCase()))
        .sort((a, b) => f.toLowerCase().indexOf(a.toLowerCase()) - f.toLowerCase().indexOf(b.toLowerCase()))[0];
      if (!clave) continue;
      const e = esperado[clave], b64 = fs.readFileSync(path.join(dir, f)).toString("base64");
      const r = await page.evaluate(async b64 => {
        const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const doc = await pdfjsLib.getDocument({data: u}).promise, L = await lineasDelPdf(doc);
        const texto = [...new Set(L.map(l => l.p))].slice(0, 6).map(p => L.filter(l => l.p === p).map(l => l.t).join("\n")).join("\n");
        const titulo = tituloDePagina(L);
        return {tipo: detectDesign(texto), titulo, anio: anioDePagina(L.filter(l => l.p === 1).map(l => l.t)),
          indice: (indiceDeMaqueta(L, doc.numPages, titulo) || []).map(x => x.title)};
      }, b64);
      const ind = r.indice.map(norm);
      const faltan = (e.debe || []).filter(d => !ind.includes(norm(d)));
      const sobran = (e.no || []).filter(n => ind.some(x => x.includes(norm(n))));
      const ok = {tipo: !e.tipo || r.tipo === e.tipo, titulo: !e.titulo || norm(r.titulo).includes(norm(e.titulo)), anio: !e.anio || r.anio === e.anio};
      const pIndice = (e.debe.length - faltan.length) / e.debe.length - sobran.length * 0.1;
      const p = (ok.tipo + ok.titulo + ok.anio + Math.max(0, pIndice)) / 4;
      total++; puntos += p;
      console.log(`${(p * 100).toFixed(0).padStart(3)} %  ${clave}`);
      if (!ok.tipo) console.log(`       tipo: ${r.tipo} (esperado ${e.tipo})`);
      if (!ok.titulo) console.log(`       título: «${r.titulo}»`);
      if (!ok.anio) console.log(`       año: ${r.anio} (esperado ${e.anio})`);
      if (faltan.length) console.log(`       faltan en el índice: ${faltan.join(" · ")}`);
      if (sobran.length) console.log(`       sobran en el índice: ${sobran.join(" · ")}`);
    }
    console.log(`\nPuntaje: ${(puntos / Math.max(1, total) * 100).toFixed(1)} % en ${total} PDF`);
  } finally { await b.close(); srv.kill(); }
})();
