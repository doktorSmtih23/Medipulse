// ===================================================================
// BANCO
// ===================================================================
let qSpec = null, qSt = "all";
const isFail = q => { const r = S.srs["q"+q.id]; return !!r && (r.last !== undefined ? r.last === 0 : (r.b === 0 && r.n > r.ok)); };
function renderBanco(){
  const st=specStats();
  $("#qFilters").innerHTML = [null,...SPECS].map(s=>`<button class="btn${qSpec===s?" on":""}" data-s="${s||""}">${s||"Todas"}</button>`).join("");
  document.querySelectorAll("#qFilters button").forEach(b=>b.onclick=()=>{ qSpec=b.dataset.s||null; renderBanco(); });
  const base = QUESTIONS.filter(q=>!qSpec||q.specialty===qSpec);
  const nFail = base.filter(isFail).length, nNew = base.filter(q=>!S.srs["q"+q.id]).length;
  $("#qStatus").innerHTML = [["all","📚 Todas",base.length],["fail","❌ Mis fallos",nFail],["new","🆕 Sin responder",nNew]].map(([k,l,n])=>`<button class="btn${qSt===k?" on":""}" data-qs="${k}">${l} (${n})</button>`).join("");
  document.querySelectorAll("[data-qs]").forEach(b=>b.onclick=()=>{ qSt = b.dataset.qs; renderBanco(); });
  const pool = qSt==="fail" ? base.filter(isFail) : qSt==="new" ? base.filter(q=>!S.srs["q"+q.id]) : base;
  const seen = pool.filter(q=>S.srs["q"+q.id]).length, due=pool.filter(q=>isDue("q"+q.id)).length;
  const n=qSpec?st[qSpec].n:SPECS.reduce((a,s)=>a+st[s].n,0), ok=qSpec?st[qSpec].ok:SPECS.reduce((a,s)=>a+st[s].ok,0);
  $("#qInfo").innerHTML = `<div class="grid3">
      <div class="kpi"><b>${pool.length}</b><span>casos</span></div>
      <div class="kpi"><b>${seen}</b><span>vistos</span></div>
      <div class="kpi"><b>${n?Math.round(ok/n*100)+"%":"—"}</b><span>aciertos</span></div></div>
    <div class="stack" style="margin-top:14px">
      <button class="btn primary block" id="pr10" ${pool.length?"":"disabled"}>Practicar ${Math.min(10,pool.length)} casos</button>
      ${due?`<button class="btn block" id="prDue">Solo los pendientes de repaso (${due})</button>`:""}
      <button class="btn ghost block" data-go="new">➕ Crear pregunta o ficha high-yield</button>
    </div>`;
  // El banco incluido es una demostración: cuando se acaba, se dice y se sugiere qué hacer.
  if (base.length && !nNew && qSt !== "fail") $("#qInfo").insertAdjacentHTML("beforeend", `<div class="note" style="margin-top:12px" id="qDone"><b>Ya respondiste los ${base.length} casos${qSpec ? ` de ${esc(qSpec)}` : ""}.</b> Lo incluido en MediPulse es una muestra del método; para seguir:
    <div class="row" style="margin-top:8px;gap:6px">${nFail ? `<button class="btn sm primary" data-qs2="fail">❌ Repasar mis fallos (${nFail})</button>` : ""}<button class="btn sm" data-go="lib">📚 Crear desde tus PDF</button><button class="btn sm" data-go="apuntes">📓 Desde tus apuntes</button></div></div>`);
  document.querySelectorAll("[data-qs2]").forEach(b=>b.onclick=()=>{ qSt = b.dataset.qs2; renderBanco(); });
  $("#pr10").onclick=()=>startSession({label:qSpec||"Práctica mixta",tag:"norm",stages:[{name:(qSpec||"Todas las especialidades")+(qSt==="fail"?" · mis fallos":qSt==="new"?" · sin responder":""),items: qSt==="all" ? pickQuestions(10,{spec:qSpec}) : shuffle(pool).slice(0,10).map(q=>({t:"q",id:q.id}))}]});
  $("#prDue") && ($("#prDue").onclick=()=>startSession({label:"Repaso",tag:"norm",stages:[{name:"Pendientes",items:pool.filter(q=>isDue("q"+q.id)).map(q=>({t:"q",id:q.id}))}]}));
}
