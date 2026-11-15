// Prueba rápida de MediPulse: carga la app en Chromium, recorre los flujos principales
// y falla si hay errores de JavaScript o desplazamiento horizontal en el celular.
//
// Uso (desde la carpeta medipulse):
//   npm install --no-save playwright     (solo la primera vez)
//   npx playwright install chromium      (solo la primera vez)
//   node tests/smoke.js
//
// No usa la API de Claude ni internet.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const TYPES = {".html":"text/html",".js":"text/javascript",".mjs":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/\/$/, "/index.html"));
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {"content-type": TYPES[path.extname(p)] || "application/octet-stream"});
  fs.createReadStream(p).pipe(res);
});

const results = [];
const check = (name, ok, extra) => { results.push({name, ok}); console.log(`${ok ? "✓" : "✗"} ${name}${extra ? " — " + extra : ""}`); };

(async () => {
  await new Promise(r => server.listen(0, r));
  const url = `http://localhost:${server.address().port}/`;
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 360, height: 800}});
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("dialog", d => d.accept());
  try {
    await page.goto(url);
    const counts = await page.evaluate(() => ({q: QUESTIONS.length, f: FLASH.length, h: HYS.length, s: SOURCES.length}));
    check("La app carga el contenido", counts.q > 0 && counts.h > 0 && counts.s > 0, JSON.stringify(counts));
    const noSrc = await page.evaluate(() => [...BUILTIN_Q, ...BUILTIN_F, ...HY_CARDS].filter(x => !SRC_BY_ID[x.src]).length);
    check("Todo el contenido incluido cita una fuente", noSrc === 0, noSrc ? `${noSrc} ítems sin fuente` : "");

    // Modo sin ganas: 3 tarjetas
    await page.click("[data-mode=lazy]"); await page.click("[data-lazy=cards]");
    for (let i = 0; i < 3; i++) { await page.click("#flipBtn"); await page.click('[data-g="2"]'); }
    await page.click("#quitBtn");
    check("Modo sin ganas", true);

    // Casos con pistas, tachar y respuesta
    await page.click("nav [data-go=banco]"); await page.click("#pr10");
    await page.click("#hintBtn"); await page.click(".xbtn >> nth=0"); await page.click("#opts .opt >> nth=1");
    check("Caso clínico con explicación", await page.isVisible("#fbBox .fb"));
    await page.click("#quitBtn");

    // Simulacro con marca y mapa
    await page.click("nav [data-go=sim]"); await page.click('[data-n="5"]'); await page.click("#simStart");
    await page.click("#opts .opt >> nth=0"); await page.click("#flagBtn"); await page.click('.simmap [data-j="4"]'); await page.click("#nextBtn");
    check("Simulacro termina y califica", await page.isVisible("#sessBody .big"));
    await page.click("#contBtn"); await page.click("#sessBody [data-go=hoy]");

    // Ficha high-yield: estudio con repaso
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyStudy"); await page.keyboard.press("Space"); await page.keyboard.press("3");
    check("Ficha high-yield se estudia y califica", await page.evaluate(() => Object.keys(S.srs).some(k => k[0] === "h")));
    await page.click("#quitBtn");

    // Pies de página y marcas de agua (con datos personales) no llegan a la IA
    const strip = await page.evaluate(() => stripRepeated([1,2,3,4,5,6].map(n => `${n%2 ? "Revista " + (100+n) + " www.revista.com Vol 7" : "www.revista.com Vol 7 " + (100+n)}\nTexto clínico ${["sobre sepsis","de la CAD","de preeclampsia","sobre hiperkalemia","del crup","del neumotórax"][n-1]}.\nDescargado para Dra. Ejemplo (ejemplo@correo.com) el 1 de enero.`)));
    check("Quita encabezados, pies y marcas de agua", strip.every(p => !/revista\.com|correo|Descargado/.test(p) && /Texto clínico/.test(p)), JSON.stringify(strip[0]));

    // Enfoque por tipo de pregunta (reemplaza la meta por examen)
    await page.selectOption("#focusSel", "critica");
    check("Mi enfoque se guarda y propone práctica", await page.evaluate(() => S.focus === "critica") && await page.isVisible("#doFocus"));
    await page.selectOption("#focusSel", "mixto");

    // MBE: entrada para auditar un PDF
    await page.click("nav [data-go=mbe]");
    check("MBE ofrece auditar un PDF", await page.isVisible("#mbeDocs #mbeUp"));

    // MBE: calculadora
    await page.click("nav [data-go=mbe]"); await page.fill("#cCer", "16"); await page.fill("#cEer", "14.5");
    check("Calculadora NNT (16 % vs 14.5 % → 67)", (await page.textContent("#cOut")).includes("67"));

    // Crear ficha a mano
    await page.click("nav [data-go=tarjetas]"); await page.click("#hyNew");
    await page.fill("#newForm .eTitle", "Prueba"); await page.fill("#newForm .eL >> nth=0", "Dato"); await page.fill("#newForm .eV >> nth=0", "Valor"); await page.click("#newForm .eSave");
    check("Crear ficha a mano", await page.evaluate(() => S.userH.some(h => h.title === "Prueba")));

    // Sin desplazamiento horizontal en ninguna pantalla
    const views = ["hoy","banco","tarjetas","sim","mbe","lib","prog","new","rep","check","guide"], wide = [];
    for (const v of views) { await page.evaluate(v => go(v), v); if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) wide.push(v); }
    check("Sin desplazamiento horizontal a 360 px", !wide.length, wide.join(", "));

    // Versión de un solo archivo: se abre sola (sin css/, data/ ni js/ al lado), con estilos y sin errores
    const os = require("os"), { build, OUT } = require("../tools/un-archivo.js"); build();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mp-")), solo = path.join(dir, "index.html");
    fs.copyFileSync(OUT, solo);
    const p2 = await browser.newPage({viewport: {width: 360, height: 800}});
    p2.on("pageerror", e => errors.push("un archivo: " + e.message));
    await p2.goto("file://" + solo);
    const ok = await p2.evaluate(() => QUESTIONS.length > 0 && getComputedStyle(document.querySelector(".view:not(.on)") || document.body).display === "none");
    check("La versión de un solo archivo abre sola", ok);
    await p2.close(); fs.rmSync(dir, {recursive: true});
  } catch (e) {
    check("Recorrido completo", false, e.message.split("\n")[0]);
  }
  check("Sin errores de JavaScript", !errors.length, errors.slice(0, 3).join(" | "));
  await browser.close(); server.close();
  const failed = results.filter(r => !r.ok).length;
  console.log(failed ? `\n${failed} prueba(s) fallaron.` : "\nTodo bien.");
  process.exit(failed ? 1 : 0);
})();
