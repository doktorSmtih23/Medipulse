// ===================================================================
// INSTALAR EN EL CELULAR: MediPulse es una app web (PWA). No va en una tienda: se agrega a la pantalla
// de inicio desde el navegador. Esta pantalla detecta el sistema (iPhone, Android o computador) y
// muestra los pasos; en Android y en Chrome de computador ofrece el botón «Instalar» del propio navegador.
// ===================================================================
let instalarEvt = null, instTab = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); instalarEvt = e; if (currentView === "instalar") renderInstalar(); });
window.addEventListener("appinstalled", () => { instalarEvt = null; toast("MediPulse quedó instalada ✓"); if (currentView === "instalar") renderInstalar(); renderDataWarn(); });

const ua = () => navigator.userAgent || "";
function plataforma(){
  if (isIOS()) return "ios";
  if (/Android/i.test(ua())) return "android";
  return "pc";
}
// Navegadores dentro de otra app (Instagram, Facebook, TikTok…): no permiten instalar.
const enOtraApp = () => /FBAN|FBAV|Instagram|Line\/|TikTok|Snapchat|; wv\)/i.test(ua());
const iosNoSafari = () => isIOS() && /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua());

const paso = (n, html) => `<li class="paso"><span class="pnum">${n}</span><div>${html}</div></li>`;
const PASOS = {
  ios: () => `<ol class="pasos">
      ${paso(1, `Abre MediPulse en <b>Safari</b>.${iosNoSafari() ? ` <span style="color:var(--warn)">Ahora estás en otro navegador: copia el enlace de abajo y pégalo en Safari.</span>` : ""}`)}
      ${paso(2, `Toca el botón <b>Compartir</b> <span class="ico">⬆︎</span> (el cuadrado con la flecha hacia arriba, abajo en el centro o arriba a la derecha).`)}
      ${paso(3, `Desliza hacia abajo y toca <b>«Agregar a pantalla de inicio»</b> <span class="ico">➕</span>.`)}
      ${paso(4, `Toca <b>Agregar</b>. Aparece el ícono de MediPulse junto a tus otras apps.`)}
      ${paso(5, `<b>Ábrela siempre desde ese ícono.</b> Si la abres desde Safari, Safari puede borrar tu progreso cuando pasan 7 días sin entrar.`)}</ol>`,
  android: () => `<ol class="pasos">
      ${paso(1, `Abre MediPulse en <b>Chrome</b>.`)}
      ${paso(2, `Toca el menú <b>⋮</b> (arriba a la derecha).`)}
      ${paso(3, `Toca <b>«Instalar app»</b> o <b>«Agregar a la pantalla principal»</b>.`)}
      ${paso(4, `Confirma con <b>Instalar</b>. El ícono queda en tu pantalla y en el cajón de apps.`)}</ol>
    <p class="xs muted" style="margin:6px 0 0">En Samsung Internet: menú ☰ → «Agregar página a» → «Pantalla de inicio».</p>`,
  pc: () => `<ol class="pasos">
      ${paso(1, `Abre MediPulse en <b>Chrome</b> o <b>Edge</b>.`)}
      ${paso(2, `En la barra de direcciones, a la derecha, toca el ícono de <b>instalar</b> <span class="ico">⊕</span> (o menú ⋮ → «Transmitir, guardar y compartir» → «Instalar página como app»).`)}
      ${paso(3, `Confirma con <b>Instalar</b>: se abre en su propia ventana y queda en tu escritorio.`)}</ol>
    <p class="xs muted" style="margin:6px 0 0">En Mac con Safari: menú Archivo → «Agregar al Dock».</p>`
};
function renderInstalar(){
  const box = $("#instBox"); if (!box) return;
  const pl = plataforma(), tab = instTab || pl, ya = isInstalled();
  const nombre = {ios: "📱 iPhone / iPad", android: "🤖 Android", pc: "💻 Computador"};
  box.innerHTML = `
    ${ya ? `<div class="note" style="border-left-color:var(--ok)"><b>✓ Ya estás usando MediPulse instalada.</b> Ábrela siempre desde su ícono.</div>` : ""}
    ${!ya && enOtraApp() ? `<div class="note trap"><b>Estás dentro de otra app</b> (por ejemplo, Instagram o WhatsApp): desde aquí no se puede instalar. Toca ⋮ o ••• y elige «Abrir en el navegador», o copia el enlace de abajo.</div>` : ""}
    ${!ya && instalarEvt ? `<div class="card stack center"><b>Tu navegador permite instalarla con un toque</b><button class="btn primary block" id="instBtn">📲 Instalar MediPulse</button></div>` : ""}
    <div class="card stack">
      <div class="tabs3 inst3">${["ios", "android", "pc"].map(k => `<button data-it="${k}" class="${tab === k ? "on" : ""}"><b>${nombre[k]}</b>${k === pl ? `<span>tu dispositivo</span>` : ""}</button>`).join("")}</div>
      ${PASOS[tab]()}
    </div>
    <div class="card stack">
      <b class="small">Enlace de la app</b>
      <div class="row" style="gap:6px;flex-wrap:nowrap"><input type="text" readonly value="${esc(APP_URL)}" id="instUrl" style="flex:1;min-width:0"><button class="btn sm" id="instCopy">Copiar</button></div>
    </div>
    <div class="card">
      <h3 style="font-size:16px">Por qué instalarla</h3>
      <ul class="small" style="margin:6px 0 0;padding-left:18px">
        <li><b>Funciona sin internet</b> después de abrirla una vez con conexión. Solo la IA necesita internet.</li>
        <li>Se abre a <b>pantalla completa</b>, como cualquier app, y se actualiza sola.</li>
        <li>En iPhone, <b>protege tu progreso</b>: Safari borra los datos de las páginas que no abres en 7 días; las apps instaladas no.</li>
      </ul>
      <p class="xs muted" style="margin:8px 0 0">Tu progreso vive en cada dispositivo y no se sincroniza entre ellos. Para pasarlo a otro celular: <button class="linkbtn" data-go="prog">Progreso → Descargar copia</button> y cárgala en el nuevo.</p>
    </div>`;
  box.querySelectorAll("[data-it]").forEach(b => b.onclick = () => { instTab = b.dataset.it; renderInstalar(); });
  $("#instCopy").onclick = async () => {
    try { await navigator.clipboard.writeText(APP_URL); toast("Enlace copiado ✓"); }
    catch(e) { const i = $("#instUrl"); i.select(); toast("Selecciona y copia el enlace"); }
  };
  $("#instBtn") && ($("#instBtn").onclick = async () => {
    const e = instalarEvt; if (!e) return;
    e.prompt(); const r = await e.userChoice.catch(() => null);
    instalarEvt = null; if (r && r.outcome !== "accepted") toast("Puedes instalarla cuando quieras desde aquí."); renderInstalar();
  });
}
