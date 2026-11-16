// ===================================================================
// CUENTA: inicio de sesión de la beta. Solo controla quién entra: los datos de estudio siguen en el
// dispositivo y al servidor solo va el correo. Usa Supabase Auth con llamadas directas a su API (sin
// librerías). El registro está cerrado en Supabase: solo entran los correos invitados.
// El correo trae un enlace y un código de 6 dígitos. El código sirve en iPhone con la app instalada:
// el enlace se abre en Safari, que no comparte la sesión con la app de la pantalla de inicio.
// Sin internet se entra igual con la sesión guardada; con internet se renueva y, si a la persona le
// quitaron el acceso, vuelve a pedir el correo.
// Si data/servidor.js no tiene dirección, no se pide inicio de sesión.
// ===================================================================
const KEY_SESION = "medipulse_sesion";
let memSesion = null;

// La clave secreta nunca debe ir en el navegador: si alguien la pone por error, no se usa.
function claveSecreta(k){
  if (/^sb_secret_/.test(k)) return true;
  try { return JSON.parse(atob(k.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).role === "service_role"; } catch(e) { return false; }
}
const cuentaActiva = () => {
  const ok = !!(typeof MP_SERVIDOR === "object" && MP_SERVIDOR.url && MP_SERVIDOR.anon);
  if (ok && claveSecreta(MP_SERVIDOR.anon)) { console.error("data/servidor.js tiene la clave secreta (service_role). Usa la clave anon/publishable."); return false; }
  return ok;
};
function leerSesion(){ try { const v = localStorage.getItem(KEY_SESION); return v ? JSON.parse(v) : memSesion; } catch(e) { return memSesion; } }
function guardarSesion(s){ memSesion = s; try { s ? localStorage.setItem(KEY_SESION, JSON.stringify(s)) : localStorage.removeItem(KEY_SESION); } catch(e) {} }
function correoDelToken(t){ try { return JSON.parse(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).email || ""; } catch(e) { return ""; } }
const desdeTokens = d => ({access: d.access_token, refresh: d.refresh_token, email: (d.user && d.user.email) || correoDelToken(d.access_token),
  exp: d.expires_at ? d.expires_at * 1000 : Date.now() + (+d.expires_in || 3600) * 1000});

async function authApi(ruta, {body, token} = {}){
  const r = await fetch(MP_SERVIDOR.url.replace(/\/+$/, "") + "/auth/v1/" + ruta, {method: "POST",
    headers: Object.assign({"apikey": MP_SERVIDOR.anon, "content-type": "application/json"}, token ? {authorization: "Bearer " + token} : {}),
    body: body ? JSON.stringify(body) : undefined});
  let d = null; try { d = await r.json(); } catch(e) {}
  if (!r.ok) { const e = new Error((d && (d.msg || d.error_description || d.message || d.error)) || ("HTTP " + r.status)); e.status = r.status; e.code = d && (d.error_code || d.code); throw e; }
  return d;
}
function errorCuenta(e, paso){
  const m = (e && e.message) || "";
  if (!e || !e.status) return "Sin conexión. Para entrar la primera vez necesitas internet.";
  if (e.status === 429) return "Pediste varios correos seguidos. Espera un minuto y vuelve a intentarlo.";
  if (paso === "codigo") return "El código no es válido o ya venció. Revisa el último correo o pide uno nuevo.";
  if (/signup|not allowed|otp_disabled|user not found|not found/i.test(m + " " + (e.code || ""))) return "Ese correo no está invitado a la beta. Pide acceso a quien te invitó o revisa que esté bien escrito.";
  return "No se pudo completar (" + e.status + "). Inténtalo de nuevo en un momento.";
}

// Lo que trae el enlace del correo al abrir la app: #access_token=…&refresh_token=… o #error_description=…
function sesionDelEnlace(){
  const h = location.hash.slice(1);
  if (!/(^|&)(access_token|error_description)=/.test(h)) return null;
  const p = new URLSearchParams(h);
  try { history.replaceState(null, "", location.pathname + location.search); } catch(e) {}
  if (p.get("error_description")) return {error: p.get("error_code") || p.get("error_description")};
  return desdeTokens({access_token: p.get("access_token"), refresh_token: p.get("refresh_token"), expires_at: +p.get("expires_at") || 0, expires_in: p.get("expires_in")});
}

// ---------- pantalla de entrada ----------
let lgCorreo = "";
function mostrarLogin(msg){
  document.body.classList.add("gated");
  const g = $("#loginGate"); g.hidden = false;
  g.innerHTML = `<div class="card stack login-card">
    <div class="brand" style="font-size:20px"><svg width="28" height="28" aria-hidden="true" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#13233f"/><g transform="translate(256 256) scale(0.9) translate(-256 -256)"><g fill="#f4efe6"><path d="M244 104 A34 34 0 0 0 186 92 A34 34 0 0 0 134 124 A36 36 0 0 0 102 182 A36 36 0 0 0 92 248 A36 36 0 0 0 104 314 A36 36 0 0 0 136 368 A34 34 0 0 0 190 410 A30 30 0 0 0 244 412 Z"/><path d="M244 104 A34 34 0 0 0 186 92 A34 34 0 0 0 134 124 A36 36 0 0 0 102 182 A36 36 0 0 0 92 248 A36 36 0 0 0 104 314 A36 36 0 0 0 136 368 A34 34 0 0 0 190 410 A30 30 0 0 0 244 412 Z" transform="translate(512 0) scale(-1 1)"/></g><g fill="none" stroke="#13233f" stroke-width="15" stroke-linecap="round"><path d="M128 186 q34 -12 56 12"/><path d="M118 300 q40 10 62 -16"/><path d="M196 132 q-10 30 18 50"/><path d="M180 374 q16 -30 50 -28"/><g transform="translate(512 0) scale(-1 1)"><path d="M128 186 q34 -12 56 12"/><path d="M118 300 q40 10 62 -16"/><path d="M196 132 q-10 30 18 50"/><path d="M180 374 q16 -30 50 -28"/></g></g><path d="M78 258 H180 L204 222 L230 296 L256 170 L282 330 L306 232 L328 258 H434" fill="none" stroke="#13233f" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/><path d="M78 258 H180 L204 222 L230 296 L256 170 L282 330 L306 232 L328 258 H434" fill="none" stroke="#ff6b4a" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></g></svg>MediPulse</div>
    <div><h2>Beta de MediPulse</h2><p class="muted small" style="margin:4px 0 0">Entra con el correo con el que te invitaron. Te llega un correo con un enlace y un código.</p></div>
    ${msg ? `<div class="note" role="status">${esc(msg)}</div>` : ""}
    <label class="fld">Correo<input type="email" id="lgMail" autocomplete="email" inputmode="email" value="${esc(lgCorreo)}" placeholder="tu@correo.com"></label>
    <button class="btn primary block" id="lgGo">Enviarme el correo</button>
    <div id="lgCode" hidden class="stack">
      <p class="small" style="margin:0">📬 Revisa tu correo (también la carpeta de spam). <b>Abre el enlace en este mismo dispositivo</b> o escribe aquí el código:</p>
      <label class="fld">Código del correo<input type="text" id="lgTok" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"></label>
      <button class="btn primary block" id="lgVer">Entrar</button>
      <p class="xs muted" style="margin:0">¿Tienes la app instalada en el iPhone? Usa el código: el enlace se abre en Safari y no en la app.</p>
    </div>
    <div id="lgMsg" class="small" role="alert"></div>
    <p class="xs muted" style="margin:0">Solo usamos tu correo para dejarte entrar. Tu progreso, tus fichas y tus apuntes se quedan en este dispositivo.</p>
    <p class="xs muted legal" style="margin:0">⚕️ MediPulse es una herramienta de estudio. No sustituye el juicio clínico.</p></div>`;
  const msgEl = $("#lgMsg"), go = $("#lgGo");
  const enviar = async () => {
    const c = $("#lgMail").value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) { msgEl.textContent = "Escribe un correo válido."; return; }
    lgCorreo = c; go.disabled = true; go.innerHTML = `<span class="spin"></span> Enviando…`; msgEl.textContent = "";
    try {
      await authApi("otp?redirect_to=" + encodeURIComponent(location.origin + location.pathname), {body: {email: c, create_user: false}});
      $("#lgCode").hidden = false; go.textContent = "Reenviar el correo"; go.className = "btn block"; $("#lgTok").focus();
    } catch(e) { msgEl.textContent = errorCuenta(e, "correo"); go.textContent = "Enviarme el correo"; }
    finally { go.disabled = false; }
  };
  const verificar = async () => {
    const t = $("#lgTok").value.replace(/\D/g, "");
    if (t.length < 6) { msgEl.textContent = "El código tiene al menos 6 dígitos."; return; }
    const b = $("#lgVer"); b.disabled = true; msgEl.textContent = "";
    try { entrar(desdeTokens(await authApi("verify", {body: {type: "email", email: lgCorreo, token: t}}))); }
    catch(e) { msgEl.textContent = errorCuenta(e, "codigo"); }
    finally { b.disabled = false; }
  };
  go.onclick = enviar;
  $("#lgMail").onkeydown = e => { if (e.key === "Enter") enviar(); };
  $("#lgVer").onclick = verificar;
  $("#lgTok").onkeydown = e => { if (e.key === "Enter") verificar(); };
  setTimeout(() => $("#lgMail") && !lgCorreo && $("#lgMail").focus(), 50);
}
function ocultarLogin(){ document.body.classList.remove("gated"); const g = $("#loginGate"); g.hidden = true; g.innerHTML = ""; }
function entrar(s){
  guardarSesion(s); ocultarLogin(); toast("Sesión iniciada ✓");
  if (currentView === "prog") renderProg();
}

// ---------- sesión ----------
async function renovarSesion(){
  const s = leerSesion(); if (!s || renovarSesion.busy) return;
  renovarSesion.busy = true;
  try { const d = await authApi("token?grant_type=refresh_token", {body: {refresh_token: s.refresh}}); guardarSesion(Object.assign(desdeTokens(d), {email: s.email || correoDelToken(d.access_token)})); }
  catch(e) {
    // Sin internet o servidor caído: se sigue con la sesión guardada. Rechazada (acceso retirado o vencida): se pide el correo.
    if (e.status >= 400 && e.status < 500 && e.status !== 429) { guardarSesion(null); mostrarLogin("Tu sesión terminó. Escribe tu correo para entrar de nuevo."); }
  } finally { renovarSesion.busy = false; }
}
const porVencer = s => !s.exp || s.exp - Date.now() < 10 * 60e3;
function iniciarCuenta(){
  if (!cuentaActiva()) return;
  const del = sesionDelEnlace();
  if (del && del.error) { guardarSesion(null); return mostrarLogin(/expired/i.test(del.error) ? "El enlace venció o ya se usó. Pide un correo nuevo." : "No se pudo entrar con ese enlace. Pide un correo nuevo."); }
  if (del) { guardarSesion(del); toast("Sesión iniciada ✓"); }
  const s = leerSesion();
  if (!s) return mostrarLogin();
  if (navigator.onLine !== false && porVencer(s)) renovarSesion();
}
document.addEventListener("visibilitychange", () => {
  const s = cuentaActiva() && document.visibilityState === "visible" && leerSesion();
  if (s && navigator.onLine !== false && porVencer(s)) renovarSesion();
});
async function cerrarSesion(){
  if (!confirm("¿Cerrar sesión en este dispositivo? Tu progreso, tus fichas y tus apuntes se quedan guardados aquí.")) return;
  const s = leerSesion();
  if (s) authApi("logout", {token: s.access}).catch(() => {});
  guardarSesion(null); lgCorreo = "";
  mostrarLogin("Cerraste sesión. Tus datos siguen en este dispositivo.");
}
// En Progreso → Tus datos.
function renderCuentaInfo(){
  const el = $("#cuentaBox"); if (!el) return;
  const s = cuentaActiva() && leerSesion();
  el.innerHTML = s ? `<div class="row" style="gap:8px"><span class="small">👤 Sesión de la beta: <b>${esc(s.email || "activa")}</b></span><div class="spacer"></div><button class="btn ghost sm" id="logoutBtn">Cerrar sesión</button></div>` : "";
  $("#logoutBtn") && ($("#logoutBtn").onclick = cerrarSesion);
}
iniciarCuenta();
