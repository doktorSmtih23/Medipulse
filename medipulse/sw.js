// Caché sin conexión: sirve la app aunque no haya internet y la actualiza en segundo plano.
// Sube la versión de CACHE cada vez que cambies algún archivo.
const CACHE = "medipulse-v10";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg",
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
