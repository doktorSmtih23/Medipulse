// ===================================================================
// UI BÁSICA
// ===================================================================
// Dirección pública de la app (si cambia el nombre del repositorio, se cambia solo aquí y en README/MAPA).
const APP_URL = "https://doktorsmtih23.github.io/Medipulse/medipulse/";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),2600); }
// Apariencia: combinación de colores (S.palette) y modo (S.theme: "light", "dark" o null = automático, sigue al
// teléfono). Se guarda en este dispositivo. Los colores salen de css/app.css (data-pal) y SPEC_PALETAS.
// [id, nombre, fondo, pulso, botón, detalle] — los últimos cuatro solo pintan la muestra del selector.
const PALETAS = [
  ["bosque", "Bosque y terracota", "#f3efe6", "#2f5d50", "#2f5d50", "#e07a5f"],
  ["petroleo", "Petróleo y salmón", "#eef5f4", "#e36414", "#0f4c5c", "#fbc4ab"],
  ["marino", "Marino y mostaza", "#f6f1e7", "#e9a03b", "#14213d", "#f2b134"],
  ["turquesa", "Turquesa clásico", "#f6f7fb", "#0891b2", "#0891b2", "#fde68a"]
];
const paletaActual = () => PALETAS.some(p => p[0] === S.palette) ? S.palette : "bosque";
function applyTheme(){
  const r = document.documentElement;
  if (S.theme) r.dataset.theme = S.theme; else delete r.dataset.theme;
  const pal = paletaActual();
  r.dataset.pal = pal;
  Object.assign(SPEC_COLOR, SPEC_PALETAS[pal]); espColores();
  const m = document.querySelector('meta[name="theme-color"]'), bg = getComputedStyle(r).getPropertyValue("--bg").trim();
  if (m && bg) m.content = bg;
}
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { if (!S.theme) applyTheme(); });
const ECG_MINI = "0,10 20,10 26,2 32,15 38,10 60,10 66,2 72,15 78,10 120,10";
function renderApariencia(){
  const d = $("#apariencia"), pal = paletaActual(), modo = S.theme || "auto";
  d.innerHTML = `<form method="dialog" class="hoja">
    <div class="hoja-tit"><h2>Apariencia</h2><button class="iconbtn" value="cerrar" aria-label="Cerrar">✕</button></div>
    <p class="small muted">Se guarda en este dispositivo. Puedes cambiarla cuando quieras.</p>
    <p class="hoja-lbl">COLORES</p>
    <div class="pal-grid">${PALETAS.map(([id, nom, bg, pulso, boton, det]) => `
      <button type="button" class="pal${id === pal ? " on" : ""}" data-pal="${id}" aria-pressed="${id === pal}">
        <span class="pal-mini" style="background:${bg}"><svg viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="${pulso}" stroke-width="2.5" points="${ECG_MINI}"/></svg>
        <i style="background:${boton}"></i><i style="background:${det};width:60%"></i></span>
        <span class="pal-n">${nom}${id === pal ? ' <span class="pal-ck">✓</span>' : ""}</span></button>`).join("")}</div>
    <p class="hoja-lbl">MODO</p>
    <div class="seg">${[["light", "☀️ Claro"], ["dark", "🌙 Oscuro"], ["auto", "🔄 Automático"]].map(([v, t]) =>
      `<button type="button" data-modo="${v}" class="${v === modo ? "on" : ""}" aria-pressed="${v === modo}">${t}</button>`).join("")}</div>
    <p class="xs muted" style="margin-top:8px">Automático sigue el modo de tu teléfono.</p>
  </form>`;
  d.querySelectorAll("[data-pal]").forEach(b => b.onclick = () => { S.palette = b.dataset.pal; cambioApariencia(); });
  d.querySelectorAll("[data-modo]").forEach(b => b.onclick = () => { S.theme = b.dataset.modo === "auto" ? null : b.dataset.modo; cambioApariencia(); });
}
function cambioApariencia(){ save(); applyTheme(); renderApariencia(); if (["hoy", "banco", "tarjetas", "prog"].includes(currentView)) vistas()[currentView](); }
$("#themeBtn").onclick = () => { renderApariencia(); $("#apariencia").showModal(); };
$("#apariencia").addEventListener("click", e => { if (e.target.id === "apariencia") e.target.close(); });
// Listas plegadas: la pantalla queda limpia y cada lista se abre con un toque. Se recuerda si el
// usuario la abrió, para que siga abierta al redibujar la pantalla.
const PLEG = {};
function plegable(id, resumen, cuerpo, abierta = false){
  const open = id in PLEG ? PLEG[id] : abierta;
  return `<details class="pleg" data-pleg="${id}" ${open ? "open" : ""}><summary>${resumen}</summary><div class="pleg-in">${cuerpo}</div></details>`;
}
document.addEventListener("toggle", e => { const d = e.target; if (d && d.dataset && d.dataset.pleg) PLEG[d.dataset.pleg] = d.open; }, true);
let currentView = "hoy";
function go(v){
  if (sess && v!=="sess" && !confirmLeave()) return;
  currentView = v;
  document.querySelectorAll(".view").forEach(el=>el.classList.toggle("on", el.id==="v-"+v));
  document.querySelectorAll("nav.bottom button").forEach(b=>b.classList.toggle("on", b.dataset.go===v || ((v==="src"||v==="check"||v==="guide"||v==="rep"||v==="apuntes") && b.dataset.go==="lib") || (v==="new" && b.dataset.go==="banco") || (v==="instalar" && b.dataset.go==="prog") || (v==="ahorro" && b.dataset.go==="lib")));
  vistas()[v]?.();
  scrollTo(0,0);
}
// Qué dibuja cada pantalla.
const vistas = () => ({hoy:renderHoy, banco:renderBanco, tarjetas:renderHY, prog:renderProg, lib:renderLib, src:renderSrc, check:renderCheck, guide:renderGuide, mbe:renderMbe, new:renderNew, rep:renderRep, apuntes:renderApuntes, instalar:renderInstalar, ahorro:renderAhorro, estudio:renderEstudio, diag:renderDiag});
document.addEventListener("click", e=>{ const g=e.target.closest("[data-go]"); if(g) go(g.dataset.go); });
function refreshChips(){ $("#streakChip").textContent = "🔥 " + streak(); $("#dueChip").textContent = "🔁 " + dueKeys().length; }
const fmt = s => { s=Math.max(0,Math.round(s)); return String(s/60|0).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
