// Arranque: tema, pantalla Hoy y modo sin conexión.
applyTheme(); renderHoy();
// Versión de un solo archivo liviana (tools/un-archivo.js): trae solo las 4 básicas y lo dice en Casos.
if (window.MP_SOLO_BASICAS && $("#soloBasicas")) {
  $("#soloBasicas").hidden = false;
  const m = window.MP_MUESTRA;
  $("#soloBasicas").innerHTML = `Esta versión de un solo archivo trae ${m ? `una muestra de las 4 básicas: ${m[0]} de ${m[1]} casos; el resto está en la app web.` : "los casos de las 4 básicas."} ${esc(window.MP_SOLO_BASICAS.join(", ").replace(/, ([^,]*)$/, " y $1"))} están en <a href="${APP_URL}" target="_blank" rel="noopener">la app web</a>.`;
}
if (!CAN_STORE) {
  const n = document.createElement("div"); n.className = "previewnote";
  n.innerHTML = `👀 <b>Vista previa:</b> puedes usar todo, pero tu progreso, tu clave y tus PDF se borran al cerrar. Para guardarlos, <a href="${APP_URL}" target="_blank" rel="noopener">abre la app en el navegador</a>.`;
  document.querySelector("main").prepend(n);
}
try { if (CAN_STORE && "serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(()=>{});
  // Si ya había una versión guardada y llega otra, se ofrece cargarla sin cerrar la app.
  const habia = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (habia) avisoVersionNueva(); });
} } catch(e) {}
function avisoVersionNueva(){
  if ($("#nuevaVersion")) return;
  const d = document.createElement("div");
  d.id = "nuevaVersion"; d.className = "nueva-version"; d.setAttribute("role", "status");
  d.innerHTML = `<span>Hay una versión nueva de MediPulse.</span><button class="btn primary" id="nuevaVersionBtn">Actualizar</button>`;
  document.body.appendChild(d);
  $("#nuevaVersionBtn").onclick = () => location.reload();
}
// Si la versión nueva se instaló mientras la app estaba cerrada, no hubo aviso: se avisa al abrir.
// La versión es el nombre de la caché del service worker (medipulse-vNN).
function avisarSiSeActualizo(){
  if (!CAN_STORE || !window.caches) return Promise.resolve();
  return caches.keys().then(ks => {
    const num = k => +((k.match(/^medipulse-v(\d+)$/) || [])[1] || 0);
    const v = ks.filter(num).sort((a, b) => num(b) - num(a))[0]; if (!v) return;
    let antes = null; try { antes = localStorage.getItem("medipulse_version"); } catch(e) {}
    if (antes && num(v) > num(antes) && !$("#nuevaVersion")) toast("✓ MediPulse se actualizó a la versión más reciente.");
    try { localStorage.setItem("medipulse_version", v); } catch(e) {}
  }).catch(()=>{});
}
avisarSiSeActualizo();
