// ===================================================================
// SIMULACRO
// ===================================================================
let simN=10;
function renderSim(){
  const opts=[5,10,20,QUESTIONS.length];
  const nm = n => n===5?"Micro-sprint":n===10?"Bloque":n===20?"Intermedio":"Completo";
  $("#simN").innerHTML=opts.map(n=>`<button class="btn${simN===n?" on":""}" data-n="${n}">${nm(n)} · ${n} preg · ${fmt(n*72)}</button>`).join("");
  document.querySelectorAll("#simN button").forEach(b=>b.onclick=()=>{simN=+b.dataset.n;renderSim();});
  const h=S.sims.slice(-8).reverse();
  $("#simHist").innerHTML = h.length ? plegable("simhist", `<b>Historial</b> <span class="xs muted">${h.length}</span>`, h.map(s=>{const p=Math.round(s.ok/s.n*100);return `<div class="row small" style="margin-top:10px"><span class="muted">${new Date(s.d).toLocaleDateString("es",{day:"numeric",month:"short"})}</span><div class="spacer"></div><span>${s.ok}/${s.n}</span><b style="width:48px;text-align:right;color:${p>=70?"var(--ok)":p>=50?"var(--warn)":"var(--bad)"}">${p}%</b></div>`;}).join("")) : `<h3 style="font-size:16px">Historial</h3><p class="muted small" style="margin:6px 0 0">Aún no haces simulacros. Empieza con 10.</p>`;
}
$("#simStart").onclick=()=>{ const items=shuffle(QUESTIONS).slice(0,simN).map(q=>({t:"q",id:q.id})); startSession({label:"Simulacro",tag:"fire",stages:[{name:`Simulacro de ${simN}`,items,exam:true,limit:simN*72}]}); };
