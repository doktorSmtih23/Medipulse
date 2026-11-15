// Arranque: tema, pantalla Hoy y modo sin conexión.
applyTheme(); renderHoy();
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
