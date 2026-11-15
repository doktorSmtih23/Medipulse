// Arranque: tema, pantalla Hoy y modo sin conexión.
applyTheme(); renderHoy();
if (!CAN_STORE) {
  const n = document.createElement("div"); n.className = "previewnote";
  n.innerHTML = `👀 <b>Vista previa:</b> puedes usar todo, pero tu progreso, tu clave y tus PDF se borran al cerrar. Para guardarlos, <a href="https://doktorsmtih23.github.io/checkerexam/medipulse/" target="_blank" rel="noopener">abre la app en el navegador</a>.`;
  document.querySelector("main").prepend(n);
}
try { if (CAN_STORE && "serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(()=>{}); } catch(e) {}
