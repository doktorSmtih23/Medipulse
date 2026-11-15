// ===================================================================
// PROTEGER LOS DATOS DEL USUARIO
// Todo vive solo en este dispositivo. Aquí: copia de seguridad (exportar/importar), recordatorio
// de copia, aviso de iPhone (Safari borra los datos de un sitio que no se abre en 7 días),
// alerta si no se pudo guardar y almacenamiento persistente.
// ===================================================================
const BACKUP_DAYS = 14, SNOOZE_DAYS = 3, KEY_ANTES = KEY + "_antes_de_importar";

function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
function isInstalled(){ return navigator.standalone === true || !!(window.matchMedia && matchMedia("(display-mode: standalone)").matches); }
function hasData(){ return Object.keys(S.srs).length > 0 || S.userQ.length > 0 || S.userC.length > 0 || (S.userH || []).length > 0 || S.notes.length > 0 || S.sources.length > 0; }
function backupDue(){
  if (!CAN_STORE || !hasData()) return false;
  if (S.backupSnooze && S.backupSnooze > Date.now()) return false;
  return !S.lastBackup || Date.now() - S.lastBackup > BACKUP_DAYS * DAY;
}

// Pide al navegador que no borre los datos de la app cuando falte espacio (si lo permite).
try { if (CAN_STORE && navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => { if (!p) navigator.storage.persist(); }).catch(()=>{}); } catch(e) {}

// Imágenes adjuntas a fichas y preguntas (recortes o capturas): van en la copia para no perderlas.
function imagenesUsadas(){
  const keys = new Set();
  [...(S.userH || []), ...S.userQ, ...Object.values(S.over || {})].forEach(x => { if (x && typeof x.img === "string" && x.img.startsWith("img:")) keys.add(x.img); });
  return [...keys];
}
async function exportBackup(){
  S.lastBackup = Date.now(); delete S.backupSnooze; save();
  const imagenes = {};
  for (const k of imagenesUsadas()) { const v = typeof imgGet === "function" ? await imgGet(k) : null; if (v) imagenes[k] = v; }
  const b = new Blob([JSON.stringify(Object.keys(imagenes).length ? Object.assign({}, S, {_imagenes: imagenes}) : S, null, 1)], {type: "application/json"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "medipulse-respaldo-" + todayKey() + ".json"; a.click();
  toast("Copia descargada ✓ Guárdala fuera del dispositivo (correo o Drive).");
  renderDataWarn(); if (currentView === "prog") renderProg();
}

function importBackup(file){
  return file.text().then(async t => {
    let d;
    try { d = JSON.parse(t); if (!d || typeof d !== "object" || !d.srs || !d.log) throw 0; }
    catch(_) { toast("Archivo no válido: no es una copia de MediPulse."); return; }
    if (hasData() && !confirm(`Esto reemplaza tus datos actuales por los de la copia (${Object.keys(d.srs).length} ítems con repaso). Lo que tienes ahora se guarda aparte en este dispositivo por si quieres volver. ¿Continuar?`)) return;
    try { localStorage.setItem(KEY_ANTES, JSON.stringify(S)); } catch(e) {}
    const imagenes = d._imagenes && typeof d._imagenes === "object" ? d._imagenes : {}; delete d._imagenes;
    for (const [k, v] of Object.entries(imagenes)) if (/^img:/.test(k) && /^data:image\//.test(v)) await imgSet(k, v);
    S = Object.assign(BLANK(), d); rebuild(); save(); applyTheme(); refreshChips(); renderDataWarn(); renderProg();
    toast("Copia importada ✓");
  });
}

function undoImport(){
  let prev = null; try { prev = JSON.parse(localStorage.getItem(KEY_ANTES) || "null"); } catch(e) {}
  if (!prev) return toast("No hay datos anteriores guardados.");
  if (!confirm("¿Volver a los datos que tenías antes de importar la copia?")) return;
  S = Object.assign(BLANK(), prev); rebuild(); save(); applyTheme(); refreshChips(); renderDataWarn();
  try { localStorage.removeItem(KEY_ANTES); } catch(e) {}
  renderProg(); toast("Datos anteriores restaurados ✓");
}

// Avisos en la pantalla Hoy. Se muestra uno a la vez para no saturar.
function renderDataWarn(){
  const box = $("#dataWarn"); if (!box) return;
  let html = "";
  if (SAVE_FAILED) html = `<div class="note trap" role="alert"><b>No se pudo guardar tu progreso.</b> El almacenamiento del navegador está lleno o bloqueado. Descarga tu copia ahora para no perder lo que has hecho.
    <div class="row" style="margin-top:8px"><button class="btn sm primary" data-dw="exp">⬇ Descargar copia</button></div></div>`;
  else if (CAN_STORE && isIOS() && !isInstalled() && !S.iosWarnOk) html = `<div class="note pearl"><b>En iPhone, agrega MediPulse a la pantalla de inicio.</b> Safari puede borrar los datos de un sitio que no abres en 7 días. Toca Compartir → «Agregar a pantalla de inicio» y abre la app desde ahí.
    <div class="row" style="margin-top:8px"><button class="btn sm" data-dw="ios">Entendido</button></div></div>`;
  else if (backupDue()) html = `<div class="note"><b>${S.lastBackup ? `Hace más de ${BACKUP_DAYS} días que no haces una copia.` : "Aún no tienes una copia de seguridad."}</b> Tu progreso vive solo en este dispositivo: si se borran los datos del navegador o cambias de teléfono, se pierde.
    <div class="row" style="margin-top:8px"><button class="btn sm primary" data-dw="exp">⬇ Descargar copia</button><button class="btn sm ghost" data-dw="later">Más tarde</button></div></div>`;
  box.innerHTML = html;
  box.querySelectorAll("[data-dw]").forEach(b => b.onclick = () => {
    const a = b.dataset.dw;
    if (a === "exp") exportBackup();
    if (a === "later") { S.backupSnooze = Date.now() + SNOOZE_DAYS * DAY; save(); renderDataWarn(); }
    if (a === "ios") { S.iosWarnOk = Date.now(); save(); renderDataWarn(); }
  });
}

// Bloque «Tus datos» en Progreso: fecha de la última copia y opción de deshacer una importación.
function renderBackupInfo(){
  const el = $("#bkInfo"); if (!el) return;
  const fecha = S.lastBackup ? new Date(S.lastBackup).toLocaleDateString("es", {day: "numeric", month: "long", year: "numeric"}) : null;
  let antes = false; try { antes = !!localStorage.getItem(KEY_ANTES); } catch(e) {}
  el.innerHTML = (fecha ? `Última copia: <b>${fecha}</b>.` : `<b>Aún no has hecho una copia.</b>`) +
    (antes ? ` <button class="linkbtn" id="undoImp">Volver a los datos de antes de importar</button>` : "");
  $("#undoImp") && ($("#undoImp").onclick = undoImport);
}

// Ítems archivados (ocultos): se pueden ver y restaurar uno por uno.
function hiddenLabel(k){
  const t = k[0], id = k.slice(1);
  const pools = {q: [...BUILTIN_Q, ...S.userQ], c: [...BUILTIN_F, ...S.userC], h: [...HY_CARDS, ...(S.userH || [])]};
  const x = (pools[t] || []).find(o => String(o.id) === id);
  const kind = {q: "Caso", c: "Tarjeta", h: "Ficha"}[t] || "Ítem";
  return kind + ": " + (x ? (x.topic || x.title || x.front || "sin título") : "ya no está en la app");
}
function hiddenListHTML(){
  const keys = Object.keys(S.hidden);
  if (!keys.length) return "";
  return `<hr><details class="ocultos"><summary class="small">${keys.length} ítem${keys.length === 1 ? "" : "s"} archivado${keys.length === 1 ? "" : "s"}: no aparecen en tus repasos. Ver y restaurar</summary>
    <div class="stack" style="margin-top:8px;gap:6px">${keys.map(k => `<div class="row small" style="gap:8px"><span style="flex:1;min-width:0">${esc(hiddenLabel(k))}</span><button class="btn sm" data-unh="${esc(k)}">Restaurar</button></div>`).join("")}
    <div class="row"><div class="spacer"></div><button class="btn sm" id="unhide">Restaurar todos</button></div></div></details>`;
}
function bindHiddenList(after){
  document.querySelectorAll("[data-unh]").forEach(b => b.onclick = () => { delete S.hidden[b.dataset.unh]; rebuild(); save(); refreshChips(); toast("Ítem restaurado ✓"); after(); });
  $("#unhide") && ($("#unhide").onclick = () => { if (confirm("¿Restaurar todos los ítems archivados a tu banco?")) { S.hidden = {}; rebuild(); save(); refreshChips(); after(); } });
}
