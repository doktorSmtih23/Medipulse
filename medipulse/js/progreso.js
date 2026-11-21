// ===================================================================
// PROGRESO
// ===================================================================
function renderProg(){
  // Antes del diagnóstico el análisis por área y tipo no dice mucho: se abre al terminarlo.
  const hecho = diagHecho();
  $("#progDiag").innerHTML = (hecho ? "" : `<div class="card">${diagCandadoHTML("El análisis por área y por tipo de pregunta")}</div>`)
    + (modoPrueba() ? `<p class="xs" style="margin:0;color:var(--warn)">🧪 Modo de prueba activo en este dispositivo (sin candados del diagnóstico). <button class="linkbtn" id="progPruebaOff">Apagarlo</button></p>` : "");
  document.querySelectorAll("#v-prog .progdet").forEach(e => e.hidden = !hecho);
  $("#progPruebaOff") && ($("#progPruebaOff").onclick = () => { setModoPrueba(false); toast("Modo de prueba apagado"); renderProg(); });
  const days=Object.values(S.log), tot=days.reduce((a,l)=>a+l.sec,0), q=days.reduce((a,l)=>a+l.q,0), ok=days.reduce((a,l)=>a+l.ok,0);
  const mastered=Object.values(S.srs).filter(r=>r.b>=3).length;
  $("#progKpis").innerHTML = `
    <div class="kpi"><b>${streak()}</b><span>días de racha</span></div>
    <div class="kpi"><b>${(tot/3600).toFixed(1)} h</b><span>estudiadas</span></div>
    <div class="kpi"><b>${q?Math.round(ok/q*100)+"%":"—"}</b><span>aciertos en ${q} caso${q===1?"":"s"}</span></div>
    <div class="kpi"><b>${mastered}</b><span>ítems dominados (≥ 1 semana)</span></div>`;
  const st=specStats();
  $("#bars").innerHTML = SPECS.map(s=>{ const x=st[s], p=x.n?Math.round(x.ok/x.n*100):null;
    const col = p==null?"var(--border)":p>=70?"var(--ok)":p>=50?"var(--warn)":"var(--bad)";
    return `<button class="bar barbtn" data-bspec="${s}"><span>${s}</span><div class="track"><i style="width:${p??100}%;background:${col}"></i></div><b style="text-align:right">${p==null?"—":p+"%"}</b></button>`; }).join("");
  document.querySelectorAll("[data-bspec]").forEach(b=>b.onclick=()=>{ const sp = b.dataset.bspec; startSession({label:sp, tag:"norm", stages:[{name:sp, items:pickQuestions(5,{spec:sp})}]}); });
  const ts = tipoStats();
  $("#tipoBars").innerHTML = FOCUS.slice(1).map(f=>{ const x = ts[f.k], p = pct(x), col = p==null?"var(--border)":p>=70?"var(--ok)":p>=50?"var(--warn)":"var(--bad)";
    return `<button class="bar barbtn" data-btipo="${f.k}"><span>${esc(f.t)}${focusOf().k===f.k?" 🎯":""}</span><div class="track"><i style="width:${p??100}%;background:${col}"></i></div><b style="text-align:right">${p==null?"—":p+"%"}</b></button>`; }).join("");
  document.querySelectorAll("[data-btipo]").forEach(b=>b.onclick=()=>{ elegirEnfoque(b.dataset.btipo); save(); toast("Enfoque: " + focusOf().t); renderProg(); });
  const cells=[]; const now=new Date();
  for(let i=34;i>=0;i--){ const d=new Date(now.getTime()-i*DAY), m=(S.log[todayKey(d)]?.sec||0)/60;
    const a = m===0?0: m<10?.3: m<30?.55: m<60?.8:1;
    cells.push(`<i title="${d.toLocaleDateString("es")}: ${Math.round(m)} min" style="${a?`background:color-mix(in srgb,var(--accent) ${a*100}%,var(--subtle))`:""}"></i>`); }
  $("#heat").innerHTML=cells.join("");
  if (typeof renderBackupInfo === "function") renderBackupInfo();
  if (typeof renderCuentaInfo === "function") renderCuentaInfo();
}
$("#expBtn").onclick = () => exportBackup();
$("#impFile").onchange = e => { const f = e.target.files[0]; e.target.value = ""; if (f) importBackup(f); };
// Borrar el progreso: se va la racha, los repasos y las estadísticas; se conserva lo que el usuario creó o configuró.
$("#resetBtn").onclick = () => {
  if (!confirm("¿Borrar tu progreso (racha, repasos, estadísticas)? Tus PDF y las preguntas generadas se conservan. No se puede deshacer.")) return;
  const conserva = {theme: S.theme, userQ: S.userQ, userC: S.userC, sources: S.sources, seq: S.seq, check: S.check, over: S.over, hidden: S.hidden,
    notes: S.notes, reports: S.reports, exam: S.exam, focus: S.focus, hints: S.hints, tpls: S.tpls, userH: S.userH, apuntes: S.apuntes, prac: S.prac,
    estudio: Object.assign({}, S.estudio, {ses: [], informes: [], actual: null})};
  S = Object.assign(BLANK(), conserva);
  save(); renderProg(); refreshChips(); toast("Progreso borrado");
};
