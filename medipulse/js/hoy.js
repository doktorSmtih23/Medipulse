// ===================================================================
// HOY
// ===================================================================
function renderHoy(){
  const h = new Date().getHours();
  $("#greet").textContent = h<12 ? "Buenos días ☀️" : h<19 ? "Buenas tardes 👋" : "Buenas noches 🌙";
  renderFocusSel();
  renderPdfHoy();
  if (typeof renderDataWarn === "function") renderDataWarn();
  const l = logToday(), st = streak(), due = dueKeys().length;
  $("#todayCard").innerHTML = `
    <div class="row"><h3 style="font-size:16px">Hoy</h3><div class="spacer"></div>${l.sec>0||l.c>0||l.q>0?'<span class="tag" style="background:var(--ok-soft);color:var(--ok)">✓ Racha asegurada</span>':'<span class="tag">Aún sin estudiar</span>'}</div>
    <div class="grid3" style="margin-top:12px">
      <div class="kpi"><b>${Math.round(l.sec/60)}</b><span>minutos</span></div>
      <div class="kpi"><b>${l.q}</b><span>casos${l.q?" · "+Math.round(l.ok/l.q*100)+"% ✓":""}</span></div>
      <div class="kpi"><b>${l.c}</b><span>fichas</span></div>
    </div>`;
  const weak = weakestSpec();
  let sug;
  if (due>0) sug = `Tienes <b>${due} repaso${due>1?"s":""}</b> pendiente${due>1?"s":""}. Es lo que más rinde: estás a punto de olvidarlo.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDue">Repasar ahora</button></div>`;
  else if (!l.sec && st>0) sug = `Llevas <b>${st} día${st>1?"s":""}</b> de racha. Aunque hoy no tengas ganas, con <b>dos fichas</b> la mantienes.<div class="row" style="margin-top:10px"><button class="btn" id="doOne">Mantener racha (1 min)</button></div>`;
  else if (newUserItems().length) sug = `Tienes <b>${newUserItems().length} ítems nuevos</b> generados de tus PDF sin estudiar. Lo que acabas de leer se fija mejor si lo practicas hoy.<div class="row" style="margin-top:10px"><button class="btn primary" id="doNew">Practicar lo nuevo</button></div>`;
  else if (!SPECS.some(x => specStats()[x].n >= 3)) sug = `Todavía no sé cuál es tu punto más débil: necesito que respondas algunos casos. Empieza por el <b>diagnóstico rápido</b>: 5 casos, uno por área, y desde ahí te recomiendo.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDiag">🎯 Hacer el diagnóstico</button></div>`;
  else sug = `Tu punto más débil ahora: <b>${weak}</b>. Una ronda de 5 casos de ese tema te dará el mayor avance.<div class="row" style="margin-top:10px"><button class="btn" id="doWeak">5 casos de ${weak}</button></div>`;
  $("#suggestCard").innerHTML = `<h3 style="font-size:16px">💡 Recomendación</h3><p style="margin:6px 0 0" class="small">${sug}</p>`;
  $("#doDue") && ($("#doDue").onclick = startDue);
  $("#doDiag") && ($("#doDiag").onclick = startDiag);
  $("#doNew") && ($("#doNew").onclick = ()=>startSession({label:"Mis PDF",tag:"norm",stages:[{name:"Nuevo de tus fuentes",items:newUserItems().slice(0,15)}]}));
  $("#doOne") && ($("#doOne").onclick = ()=>startSession({label:"Mantener racha",tag:"lazy",stages:[{name:"Fichas",items:pickHY(2)}]}));
  $("#doWeak") && ($("#doWeak").onclick = ()=>startSession({label:"Tema débil",tag:"norm",stages:[{name:weak,items:pickQuestions(5,{spec:weak})}]}));
  renderDirected();
  const day = Math.floor(Date.now()/DAY);
  const p = QUESTIONS[day % QUESTIONS.length];
  $("#pearlCard").innerHTML = `<div class="row"><span class="tag" style="background:var(--warn-soft);color:var(--warn)">Perla del día</span><span class="xs muted">${esc(p.topic)}</span></div><p style="margin:8px 0 0">${esc(p.pearl)}</p>`;
  refreshChips();
}
// ¿Qué estudiar hoy? Áreas ordenadas por precisión (las no exploradas primero). La práctica del enfoque está en Mi enfoque (perfil.js).
function renderDirected(){
  const st = specStats(), f = focusOf();
  const rank = s => st[s].n < 3 ? -1 + st[s].seen/Math.max(1, st[s].total) : st[s].ok/st[s].n;
  const top = SPECS.slice().sort((a,b)=>rank(a)-rank(b)).slice(0, 3);
  $("#directCard").innerHTML = `<h3 style="font-size:16px">🧭 ¿Qué estudiar hoy?</h3>
    <p class="xs muted" style="margin:4px 0 8px">Primero lo que no has explorado y lo que más fallas.</p>
    ${top.map(s=>{ const x = st[s], pct = x.n >= 3 ? Math.round(x.ok/x.n*100) : null;
      const todo = x.total && x.seen >= x.total;   // ya vio todos los casos de esa área
      return `<div class="row" style="margin-top:6px;gap:8px"><span class="dot" style="background:${SPEC_COLOR[s]}"></span><div style="flex:1;min-width:0"><b class="small">${esc(s)}</b><div class="xs muted">${pct===null ? `sin explorar · ${x.seen} de ${x.total} casos vistos` : `${pct} % de aciertos`}${todo ? ` · ya viste los ${x.total} casos` : ""}</div></div>${todo ? `<button class="btn sm" data-dbank="${esc(s)}">Ver opciones</button>` : `<button class="btn sm" data-dspec="${esc(s)}">5 casos</button>`}</div>`; }).join("")}`;
  document.querySelectorAll("[data-dbank]").forEach(b=>b.onclick=()=>{ prac().specs = [b.dataset.dbank]; qSt = "all"; save(); go("banco"); });
  document.querySelectorAll("[data-dspec]").forEach(b=>b.onclick=()=>startSession({label:"Estudio dirigido",tag:"norm",stages:[{name:b.dataset.dspec,items:pickQuestions(5,{spec:b.dataset.dspec})}]}));
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{
  const m=b.dataset.mode;
  if (m==="lazy") return go("lazy");
  if (m==="normal") return startSession({label:"Sesión normal",tag:"norm",limit:25*60,stages:[
    {name: focusOf().k==="mixto" ? "Casos clínicos" : "Casos clínicos · primero tu enfoque", items:pickQuestions(10,{preferSpec:weakestSpec()})},
    {name:"Fichas high-yield",items: pickHY(focusOf().k==="datos" ? 10 : 6)}]});
  if (m==="beast") { const w=weakestSpec(); const due=dueKeys();
    const b1 = due.length ? due.slice(0,15).map(k=>({t:k[0],id:k.slice(1)})) : pickHY(8);
    // Ninguna pregunta se repite entre bloques: con un banco pequeño, el simulacro es más corto y lo dice.
    const usadas = new Set(b1.filter(x=>x.t==="q").map(x=>String(x.id)));
    const b2 = pickQuestions(10,{spec:w}).concat(pickQuestions(5,{preferSpec:w})).filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i && !usadas.has(String(x.id))).slice(0,12);
    b2.forEach(x=>usadas.add(String(x.id)));
    const b3 = pickQuestions(15 + usadas.size).filter(x=>!usadas.has(String(x.id))).slice(0,15);
    const fichasB1 = new Set(b1.filter(x=>x.t==="h").map(x=>String(x.id)));
    const b4 = pickHY(8 + fichasB1.size).filter(x=>!fichasB1.has(String(x.id))).slice(0,8);
    return startSession({label:"Modo a tope",tag:"fire",stages:[
      {name:"Bloque 1 · Repaso espaciado", items: b1},
      {name:"Bloque 2 · Tema débil: "+w, items: b2},
      {name: b3.length < 15 ? `Bloque 3 · Simulacro mixto (${b3.length}: tu banco no tiene más sin repetir)` : "Bloque 3 · Simulacro mixto", items: b3, exam:true, limit: Math.max(1, b3.length)*72},
      {name:"Bloque 4 · Cierre con fichas high-yield", items: b4}], breaks:true});
  }
});
document.querySelectorAll("[data-lazy]").forEach(b=>b.onclick=()=>{
  const m=b.dataset.lazy;
  if (m==="fichas") startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"5 fichas rápidas",items:pickHY(5)}]});
  if (m==="one") startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"Un caso",items:pickQuestions(1)}]});
  if (m==="read") { const hy=HYS[Math.random()*HYS.length|0]; startSession({label:"Sin ganas",tag:"lazy",lazy:true,stages:[{name:"Una ficha",items:[{t:"hy",id:hy.id}]}]}); }
});
function startDue(){
  const items = dueKeys().slice(0,20).map(k=>({t:k[0],id:k.slice(1)}));
  startSession({label:"Repaso espaciado",tag:"norm",stages:[{name:"Repasos pendientes",items}]});
}
