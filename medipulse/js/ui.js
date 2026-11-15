// ===================================================================
// UI BÁSICA
// ===================================================================
// Dirección pública de la app (si cambia el nombre del repositorio, se cambia solo aquí y en README/MAPA).
const APP_URL = "https://doktorsmtih23.github.io/Medipulse/medipulse/";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),2600); }
function applyTheme(){ if (S.theme) document.documentElement.dataset.theme=S.theme; else delete document.documentElement.dataset.theme; }
$("#themeBtn").onclick = () => {
  const dark = S.theme ? S.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  S.theme = dark ? "light" : "dark"; save(); applyTheme();
};
let currentView = "hoy";
function go(v){
  if (sess && v!=="sess" && !confirmLeave()) return;
  currentView = v;
  document.querySelectorAll(".view").forEach(el=>el.classList.toggle("on", el.id==="v-"+v));
  document.querySelectorAll("nav.bottom button").forEach(b=>b.classList.toggle("on", b.dataset.go===v || ((v==="src"||v==="check"||v==="guide"||v==="rep") && b.dataset.go==="lib") || (v==="new" && b.dataset.go==="banco")));
  ({hoy:renderHoy, banco:renderBanco, tarjetas:renderHY, sim:renderSim, prog:renderProg, lib:renderLib, src:renderSrc, check:renderCheck, guide:renderGuide, mbe:renderMbe, new:renderNew, rep:renderRep})[v]?.();
  scrollTo(0,0);
}
document.addEventListener("click", e=>{ const g=e.target.closest("[data-go]"); if(g) go(g.dataset.go); });
function refreshChips(){ $("#streakChip").textContent = "🔥 " + streak(); $("#dueChip").textContent = "🔁 " + dueKeys().length; }
const fmt = s => { s=Math.max(0,Math.round(s)); return String(s/60|0).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
