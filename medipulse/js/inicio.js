// Arranque: tema, pantalla Hoy y modo sin conexión.
applyTheme(); renderHoy();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(()=>{});
