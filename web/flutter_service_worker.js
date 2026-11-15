// La app anterior (Flutter) ya no existe. Este archivo reemplaza su service worker:
// borra su caché, se desinstala y lleva a MediPulse a quien la tenga abierta o instalada.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("flutter")) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({type: "window"})) c.navigate(new URL("../medipulse/", self.registration.scope).href);
})()));
