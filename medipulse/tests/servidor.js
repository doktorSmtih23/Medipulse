// Servidor estático mínimo (sirve la carpeta medipulse/). Para ver la app: npm start  (o node tests/servidor.js [puerto])
// Si el puerto está ocupado, prueba con el siguiente libre.
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const TYPES = {".html":"text/html",".js":"text/javascript",".mjs":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".pdf":"application/pdf"};
function crearServidor(){
  return http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/\/$/, "/index.html"));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, {"content-type": TYPES[path.extname(p)] || "application/octet-stream"});
    fs.createReadStream(p).pipe(res);
  });
}
if (require.main === module) {
  const pedido = +process.argv[2] || 4173;
  const intentar = (port) => {
    const s = crearServidor();
    s.once("error", e => {
      if (e.code === "EADDRINUSE" && port < pedido + 20) { console.log(`El puerto ${port} está ocupado (¿la app ya está abierta en http://localhost:${port}/ ?). Pruebo con ${port + 1}…`); intentar(port + 1); }
      else { console.error("No se pudo iniciar el servidor:", e.message); process.exit(1); }
    });
    s.listen(port, () => console.log(`MediPulse en http://localhost:${port}/  (Ctrl + C para detener)`));
  };
  intentar(pedido);
}
module.exports = { crearServidor };
