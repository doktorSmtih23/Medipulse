// ===================================================================
// HOY
// ===================================================================
function renderHoy(){
  const h = new Date().getHours();
  $("#greet").textContent = h<12 ? "Buenos días ☀️" : h<19 ? "Buenas tardes 👋" : "Buenas noches 🌙";
  renderExamSel();
  const l = logToday(), st = streak(), due = dueKeys().length;
  $("#todayCard").innerHTML = `
    <div class="row"><h3 style="font-size:16px">Hoy</h3><div class="spacer"></div>${l.sec>0||l.c>0||l.q>0?'<span class="tag" style="background:var(--ok-soft);color:var(--ok)">✓ Racha asegurada</span>':'<span class="tag">Aún sin estudiar</span>'}</div>
    <div class="grid3" style="margin-top:12px">
      <div class="kpi"><b>${Math.round(l.sec/60)}</b><span>minutos</span></div>
      <div class="kpi"><b>${l.q}</b><span>casos${l.q?" · "+Math.round(l.ok/l.q*100)+"% ✓":""}</span></div>
      <div class="kpi"><b>${l.c}</b><span>tarjetas</span></div>
    </div>`;
  const weak = weakestSpec();
  let sug;
  if (due>0) sug = `Tienes <b>${due} repaso${due>1?"s":""}</b> pendiente${due>1?"s":""}. Es lo que más rinde: estás a punto de olvidarlo.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDue">Repasar ahora</button></div>`;
  else if (!l.sec && st>0) sug = `Llevas <b>${st} día${st>1?"s":""}</b> de racha. Aunque hoy no tengas ganas, con <b>una tarjeta</b> la mantienes.<div class="row" style="margin-top:10px"><button class="btn" id="doOne">Mantener racha (1 min)</button></div>`;
  else if (newUserItems().length) sug = `Tienes <b>${newUserItems().length} ítems nuevos</b> generados de tus PDF sin estudiar. Lo que acabas de leer se fija mejor si lo practicas hoy.<div class="row" style="margin-top:10px"><button class="btn primary" id="doNew">Practicar lo nuevo</button></div>`;
  else sug = `Tu punto más débil ahora: <b>${weak}</b>. Una ronda de 5 casos de ese tema te dará el mayor avance.<div class="row" style="margin-top:10px"><button class="btn" id="doWeak">5 casos de ${weak}</button></div>`;
  $("#suggestCard").innerHTML = `<h3 style="font-size:16px">💡 Recomendación</h3><p style="margin:6px 0 0" class="small">${sug}</p>`;
  $("#doDue") && ($("#doDue").onclick = startDue);
  $("#doNew") && ($("#doNew").onclick = ()=>startSession({label:"Mis PDF",tag:"norm",stages:[{name:"Nuevo de tus fuentes",items:newUserItems().slice(0,15)}]}));
  $("#doOne") && ($("#doOne").onclick = ()=>startSession({label:"Mantener racha",tag:"lazy",stages:[{name:"Tarjetas",items:pickCards(3)}]}));
  $("#doWeak") && ($("#doWeak").onclick = ()=>startSession({label:"Tema débil",tag:"norm",stages:[{name:weak,items:pickQuestions(5,{spec:weak})}]}));
  const day = Math.floor(Date.now()/DAY);
  const p = QUESTIONS[day % QUESTIONS.length];
  $("#pearlCard").innerHTML = `<div class="row"><span class="tag" style="background:var(--warn-soft);color:var(--warn)">Perla del día</span><span class="xs muted">${esc(p.topic)}</span></div><p style="margin:8px 0 0">${esc(p.pearl)}</p>`;
  refreshChips();
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{
  const m=b.dataset.mode;
  if (m==="lazy") return go("lazy");
  if (m==="normal") return startSession({label:"Sesión normal",tag:"norm",limit:25*60,stages:[
    {name:"Casos clínicos",items:pickQuestions(10,{preferSpec:weakestSpec()})},
    {name:"Fichas y tarjetas",items:[...pickHY(4), ...pickCards(4)]}]});
  if (m==="beast") { const w=weakestSpec(); const due=dueKeys();
    return startSession({label:"Modo a tope",tag:"fire",stages:[
      {name:"Bloque 1 · Repaso espaciado", items: due.length? due.slice(0,15).map(k=>({t:k[0],id:k.slice(1)})) : pickCards(12)},
      {name:"Bloque 2 · Tema débil: "+w, items:pickQuestions(10,{spec:w}).concat(pickQuestions(5,{preferSpec:w})).filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).slice(0,12)},
      {name:"Bloque 3 · Simulacro mixto", items:pickQuestions(15), exam:true, limit:15*72},
      {name:"Bloque 4 · Cierre con fichas high-yield", items:[...pickHY(6), ...pickCards(4)]}], breaks:true});
  }
});
document.querySelectorAll("[data-lazy]").forEach(b=>b.onclick=()=>{
  const m=b.dataset.lazy;
  if (m==="cards") startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"10 tarjetas",items:pickCards(10)}]});
  if (m==="one") startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"Un caso",items:pickQuestions(1)}]});
  if (m==="read") { const hy=HYS[Math.random()*HYS.length|0]; startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"Una ficha",items:[{t:"hy",id:hy.id}]}]}); }
});
function startDue(){
  const items = dueKeys().slice(0,20).map(k=>({t:k[0],id:k.slice(1)}));
  startSession({label:"Repaso espaciado",tag:"norm",stages:[{name:"Repasos pendientes",items}]});
}
