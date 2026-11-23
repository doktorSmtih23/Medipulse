// Caché sin conexión: sirve la app aunque no haya internet y la actualiza en segundo plano.
// Sube la versión de CACHE cada vez que cambies algún archivo.
const CACHE = "medipulse-v138";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "css/app.css",
  "data/especialidades.js","data/fuentes.js","data/servidor.js","data/contenido/registro.js","data/contenido/medicina-interna.js","data/contenido/cirugia.js","data/contenido/pediatria.js","data/contenido/ginecologia.js","data/contenido/salud-publica.js","data/contenido/armar.js","data/expedientes.js",
  "js/estado.js",
  "js/especialidades.js",
  "js/ui.js",
  "js/hoy.js",
  "js/sesion.js",
  "js/banco.js",
  "js/vulnerabilidades.js",
  "js/fichas-hy.js",
  "js/progreso.js",
  "js/fuentes.js",
  "js/compromiso.js",
  "js/ia-costo.js",
  "js/ahorro.js",
  "js/texto-pdf.js",
  "js/taller.js",
  "js/taller-ia.js",
  "js/taller-casos.js",
  "js/taller-leer.js",
  "js/taller-revision.js",
  "js/vigencia.js","js/analisis.js","js/lector.js","js/indice.js","js/maqueta.js","js/recomendaciones.js",
  "js/perfil.js",
  "js/reportes.js",
  "js/mbe.js",
  "js/crear-y-compartir.js",
  "js/importar.js",
  "js/editar.js",
  "js/duplicados.js",
  "js/datos.js",
  "js/corregir.js",
  "js/apuntes.js",
  "js/estudio-tipos.js",
  "js/estudio.js",
  "js/diagnostico.js",
  "js/cuenta.js",
  "js/instalar.js",
  "js/inicio.js",
  "vendor/pdf.min.js", "vendor/pdf.worker.min.js", "vendor/anthropic-sdk.mjs"];
// Al instalar se piden los archivos al servidor, no a la caché HTTP del navegador:
// si no, la versión nueva podría guardarse con archivos viejos.
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"}))))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request.mode === "navigate" ? e.request : new Request(e.request, {cache: "no-cache"})).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
