// Caché sin conexión: sirve la app aunque no haya internet y la actualiza en segundo plano.
// Sube la versión de CACHE cada vez que cambies algún archivo.
const CACHE = "medipulse-v18";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg", "css/app.css",
  "data/especialidades.js",
  "data/preguntas.js",
  "data/fuentes.js",
  "data/fichas-hy.js",
  "data/tarjetas.js",
  "js/estado.js",
  "js/ui.js",
  "js/hoy.js",
  "js/sesion.js",
  "js/banco.js",
  "js/fichas-hy.js",
  "js/simulacro.js",
  "js/progreso.js",
  "js/fuentes.js",
  "js/taller.js",
  "js/vigencia.js","js/analisis.js",
  "js/perfil.js",
  "js/reportes.js",
  "js/mbe.js",
  "js/crear-y-compartir.js",
  "js/inicio.js",
  "vendor/pdf.min.js", "vendor/pdf.worker.min.js", "vendor/anthropic-sdk.mjs"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
