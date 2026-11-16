// ===================================================================
// MOTOR DE SESIÓN
// ===================================================================
let sess = null, tick = null;
function confirmLeave(){ if(!sess) return true; if(confirm("¿Salir de la sesión? Lo que ya respondiste queda guardado.")){ endSession(false); return true; } return false; }
$("#quitBtn").onclick = ()=>{ if(confirmLeave()) go("hoy"); };

function startSession(cfg){
  cfg.stages = cfg.stages.filter(s=>s.items.length);
  if (!cfg.stages.length) return toast("No hay contenido para esta sesión todavía.");
  sess = Object.assign({si:0, i:0, answers:{}, results:[], start:Date.now(), last:Date.now(), stageStart:Date.now(), state:"ask"}, cfg);
  currentView="sess";
  document.querySelectorAll(".view").forEach(el=>el.classList.toggle("on", el.id==="v-sess"));
  document.querySelectorAll("nav.bottom button").forEach(b=>b.classList.remove("on"));
  const tag=$("#sessTag"); tag.className="tag "+(cfg.tag||""); tag.textContent=cfg.label;
  clearInterval(tick); tick=setInterval(updTimer,1000); updTimer();
  renderItem();
}
function stage(){ return sess.stages[sess.si]; }
function addTime(){ const now=Date.now(); const d=Math.min((now-sess.last)/1000, 300); logToday().sec+=d; sess.last=now; save(); }
function updTimer(){
  if(!sess) return;
  const st=stage(), el=(Date.now()-sess.start)/1000;
  if (st.exam && st.limit){ const left=st.limit-(Date.now()-sess.stageStart)/1000; $("#sessTimer").textContent="⏱ "+fmt(left); $("#sessTimer").style.color=left<60?"var(--bad)":""; if(left<=0 && sess.state==="ask") finishExam(true); }
  else if (sess.limit){ const left=sess.limit-el; $("#sessTimer").textContent=left>0?"⏳ "+fmt(left):"✓ "+fmt(el); if(left<=0 && !sess._warned){sess._warned=1; toast("⏰ Se cumplió tu tiempo. Termina esta y descansa.");} }
  else { $("#sessTimer").textContent=fmt(el); $("#sessTimer").style.color=""; }
}
function renderHead(){
  const st=stage(), n=st.items.length;
  $("#sessStage").textContent = (sess.stages.length>1?`Parte ${sess.si+1}/${sess.stages.length} · `:"")+st.name;
  $("#sessCount").textContent = `${Math.min(sess.i+1,n)} / ${n}`;
  $("#sessBar").style.width = (sess.i/n*100)+"%";
}
function renderItem(){
  const st=stage(); if (sess.i>=st.items.length) return st.exam ? finishExam(false) : nextStage();
  sess.state="ask"; renderHead();
  const it=st.items[sess.i];
  if (it.t==="q") renderQ(qById(it.id), st.exam);
  else if (it.t==="c") renderC(cById(it.id));
  else if (it.t==="h") renderH(hyById(it.id));
  else renderHYItem(hyById(it.id));
}

function renderQ(q, exam){
  const k = sess.si+":"+sess.i, sel = sess.answers[k];
  sess.struck = sess.struck || {}; sess.flags = sess.flags || {};
  const struck = sess.struck[k] || (sess.struck[k] = []), flagged = !!sess.flags[k], hints = !exam && S.hints;
  const items = stage().items;
  $("#sessBody").innerHTML = `
    <div class="card">
      <div class="row xs"><span class="tag" style="color:${SPEC_COLOR[q.specialty]}">${esc(q.specialty)}</span>${exam ? (q.qtype && q.qtype!=="caso" ? `<span class="muted">${qtLabel(q.qtype)}</span>` : "") : tipoChip(q)}${origenChip(q)}<div class="spacer"></div>
        ${exam ? `<button class="btn sm${flagged?" flagon":""}" id="flagBtn">🚩 ${flagged?"Marcada":"Marcar para revisar"}</button>` : `<button class="btn sm${hints?" on":""}" id="hintBtn" title="Resalta los datos clave del caso">🔍 Pistas: ${hints?"sí":"no"}</button>`}</div>
      ${imgTag(q.img)}<p class="vignette${hints?" hints":""}" style="margin:12px 0 4px">${q.vignette}</p>
      <div id="opts">${q.options.map((o,i)=>`<div class="optrow${struck.includes(i)?" struck":""}"><button class="opt${sel===i?" sel":""}" data-o="${i}"><span class="l">${"ABCDE"[i]}</span><span>${esc(o)}</span></button><button class="xbtn" data-x="${i}" aria-label="Tachar la opción ${"ABCDE"[i]}" title="Tachar">✕</button></div>`).join("")}</div>
      ${exam ? "" : metodoPregunta(q)}
      <div id="fbBox"></div>
      ${exam ? "" : `<div class="row" id="skipRow" style="margin-top:10px"><div class="spacer"></div><button class="btn ghost sm" id="skipBtn">Pasar esta pregunta →</button></div>`}
    </div>
    ${exam ? `<div class="row" style="margin-top:12px">${sess.i>0?'<button class="btn" id="prevBtn">← Anterior</button>':""}<div class="spacer"></div><button class="btn primary" id="nextBtn">${sess.i+1<items.length?"Siguiente →":"Terminar simulacro"}</button></div>
      <div class="card" style="margin-top:12px;padding:14px"><div class="row xs muted"><b style="color:var(--text)">Mapa del simulacro</b><div class="spacer"></div><span>${items.filter((_,j)=>sess.answers[sess.si+":"+j]!=null).length}/${items.length} respondidas</span></div>
        <div class="simmap">${items.map((_,j)=>{ const kk = sess.si+":"+j; return `<button data-j="${j}" class="${[j===sess.i?"cur":"", sess.answers[kk]!=null?"ans":"", sess.flags[kk]?"flag":""].join(" ")}" aria-label="Ir a la pregunta ${j+1}">${j+1}</button>`; }).join("")}</div>
        <p class="xs muted" style="margin:8px 0 0">Azul: respondida · Naranja: marcada 🚩 · Blanco: pendiente</p></div>` : ""}
    <p class="xs muted center kbhint" style="margin-top:10px">Atajos: <kbd>1</kbd>–<kbd>4</kbd> elegir · <kbd>Enter</kbd> seguir</p>`;
  document.querySelectorAll("#opts .opt").forEach(b=>b.onclick=()=>answerQ(q,+b.dataset.o,exam));
  document.querySelectorAll("#opts .xbtn").forEach(b=>b.onclick=()=>{ const i = +b.dataset.x, at = struck.indexOf(i);
    at>=0 ? struck.splice(at,1) : struck.push(i); b.parentElement.classList.toggle("struck", at<0); });
  $("#hintBtn") && ($("#hintBtn").onclick = ()=>{ S.hints = !S.hints; save(); renderQ(q, exam); });
  // Pasar sin responder: no cuenta como fallo ni como acierto, y la pregunta sigue nueva o donde estaba en el repaso.
  $("#skipBtn") && ($("#skipBtn").onclick = ()=>{ addTime(); sess.skipped = (sess.skipped||0) + 1; sess.i++; renderItem(); });
  $("#flagBtn") && ($("#flagBtn").onclick = ()=>{ sess.flags[k] = !sess.flags[k]; renderQ(q, exam); });
  if (exam) {
    $("#nextBtn").onclick = ()=>{
      if (sess.i+1 >= items.length) {
        const pend = items.filter((_,j)=>sess.answers[sess.si+":"+j]==null).length, fl = items.filter((_,j)=>sess.flags[sess.si+":"+j]).length;
        if ((pend || fl) && !confirm(`${pend ? pend+" sin responder" : ""}${pend && fl ? " y " : ""}${fl ? fl+" marcada"+(fl>1?"s":"")+" para revisar" : ""}. ¿Terminar de todos modos?`)) return;
      }
      addTime(); sess.i++; renderItem(); };
    $("#prevBtn") && ($("#prevBtn").onclick = ()=>{ sess.i--; renderItem(); });
    document.querySelectorAll(".simmap [data-j]").forEach(b=>b.onclick=()=>{ addTime(); sess.i = +b.dataset.j; renderItem(); });
  }
}
function answerQ(q, o, exam){
  if (sess.state!=="ask") return;
  if (exam){ sess.answers[sess.si+":"+sess.i]=o; document.querySelectorAll("#opts .opt").forEach((b,i)=>b.classList.toggle("sel",i===o));
    const m = document.querySelector('.simmap [data-j="'+sess.i+'"]'); m && m.classList.add("ans"); return; }
  sess.state="fb"; addTime();
  const ok = o===q.correct;
  grade("q"+q.id, ok?2:0);
  const l=logToday(); l.q++; if(ok) l.ok++;
  const ri = registrarRespuesta(q, o, ok, false); save();
  sess.results.push({t:"q",id:q.id,ok,ri});
  $("#opts").classList.add("done"); $(".vignette").classList.add("hints"); $("#skipRow") && $("#skipRow").remove();
  document.querySelectorAll("#opts .opt").forEach((b,i)=>{ b.disabled=true; if(i===q.correct) b.classList.add("right"); else if(i===o) b.classList.add("wrong"); });
  $("#fbBox").innerHTML = `
    <div class="stack" style="margin-top:14px">
      <div class="xs muted">Tema: <b>${esc(q.topic || "Caso clínico")}</b>${q.area ? ` · Área: ${esc(q.area)}` : ""}</div>
      <div class="fb ${ok?"ok":"bad"}"><h4>${ok?"✓ Correcto":"✗ Incorrecto — volverá en tu repaso"}</h4>${esc(q.whyCorrect)}</div>
      ${ok ? "" : motivoHTML(ri)}
      ${porOpcionHTML(q, o)}
      ${q.pearl ? `<div class="note pearl"><b>💎 Perla:</b> ${esc(q.pearl)}</div>` : ""}
      ${q.trap ? `<div class="note trap" style="white-space:pre-line"><b>⚠️ Trampa:</b> ${esc(q.trap)}</div>` : ""}
      ${srcLine(q)}
      ${enfoqueTrasResponder(q)}
      <div><button class="linkbtn xs" id="repBtn">🚩 ¿Error o dato desactualizado? Repórtalo</button> · <button class="linkbtn xs" id="fixBtn">✏️ Corregir</button> · <button class="linkbtn xs" id="verBtn">✏️ Hacer mi versión</button> · <button class="linkbtn xs" id="archBtn">🗄️ Archivar este caso</button><div id="repBox"></div><div id="fixBox"></div></div>
      <button class="btn primary block" id="nextBtn">Siguiente →</button>
    </div>`;
  $("#repBtn").onclick = ()=>openReportForm("q"+q.id, $("#repBox"));
  $("#fixBtn").onclick = ()=>openCorregir("q", q, $("#fixBox"));
  $("#verBtn").onclick = ()=>{ if (confirmLeave()) { go("new"); editarCaso(q); } };
  $("#archBtn").onclick = ()=>{ S.hidden["q"+q.id] = Date.now(); delete S.srs["q"+q.id]; rebuild(); save(); refreshChips();
    $("#archBtn").replaceWith(Object.assign(document.createElement("span"), {className: "xs muted", textContent: "🗄️ Archivado: no volverá a salir. Lo restauras en Casos, al final de la lista."})); };
  $("#nextBtn").onclick=()=>{ sess.i++; renderItem(); };
  $("#nextBtn").focus({preventScroll:true});
}

// Análisis de cada opción (preguntas importadas de otra IA o de otro banco): la que elegiste, abierta.
function porOpcionHTML(q, elegida){
  if (!Array.isArray(q.porOpcion) || !q.porOpcion.some(Boolean)) return "";
  return `<details class="custom" open><summary>🔎 Análisis de cada opción</summary><div class="stack" style="gap:6px;margin-top:8px">${q.options.map((op, i) => !q.porOpcion[i] ? "" : `
    <div class="small porop${i === q.correct ? " ok" : i === elegida ? " mia" : ""}"><b>${"ABCDE"[i]}) ${esc(op)}</b>${i === q.correct ? " ✓" : i === elegida ? " · tu respuesta" : ""}<div class="xs muted" style="margin-top:2px">${esc(q.porOpcion[i])}</div></div>`).join("")}</div></details>`;
}
function renderC(c){
  $("#sessBody").innerHTML = `
    <div class="card flash" id="flash">
      <div class="xs muted" style="font-weight:600;margin-bottom:10px;color:${SPEC_COLOR[c.specialty]}">${esc(c.specialty)}</div>
      <div>${esc(c.front)}</div>
      <div id="back"></div>
    </div>
    <div id="cBtns" style="margin-top:12px"><button class="btn primary block" id="flipBtn">Mostrar respuesta <kbd>espacio</kbd></button></div>`;
  $("#flipBtn").onclick=()=>flipC(c);
}
function flipC(c){
  if (sess.state!=="ask") return; sess.state="flip";
  $("#back").innerHTML = `<div class="back">${esc(c.back)}${c.ctx?`<div class="ctx">“${esc(c.ctx)}”</div>`:""}</div>${srcLine(c)}<div style="font-size:13px;font-weight:400;margin-top:8px"><button class="linkbtn" id="repBtnC">🚩 Reportar</button><div id="repBoxC" style="text-align:left"></div></div>`;
  $("#repBtnC").onclick = ()=>openReportForm("c"+c.id, $("#repBoxC"));
  $("#cBtns").innerHTML = `<div class="grid3">
    <button class="btn" data-g="0" style="border-color:var(--bad)">✗ No la sabía <kbd>1</kbd></button>
    <button class="btn" data-g="1" style="border-color:var(--warn)">~ Dudé <kbd>2</kbd></button>
    <button class="btn" data-g="2" style="border-color:var(--ok)">✓ La sabía <kbd>3</kbd></button></div>`;
  document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>gradeC(c,+b.dataset.g));
}
function gradeC(c,g){
  if (sess.state!=="flip") return; sess.state="done"; addTime();
  grade("c"+c.id,g); logToday().c++; save();
  sess.results.push({t:"c",id:c.id,ok:g===2});
  sess.i++; renderItem();
}
function renderHYItem(h){
  sess.state="read";
  $("#sessBody").innerHTML = hyCardHTML(h) + `<button class="btn primary block" id="nextBtn" style="margin-top:12px">Listo, la leí ✓</button>`;
  $("#nextBtn").onclick=()=>{ addTime(); logToday().c++; save(); sess.results.push({t:"hy",ok:true}); sess.i++; renderItem(); };
}

function nextStage(){
  addTime();
  if (sess.si+1 < sess.stages.length){
    const done=sess.si+1, nxt=sess.stages[sess.si+1];
    sess.state="break";
    $("#sessBar").style.width="100%";
    $("#sessBody").innerHTML = `<div class="card center stack">
      <div class="big">✅</div><h3>Parte ${done} completada</h3>
      ${sess.breaks?`<p class="muted small" style="margin:0">Levántate, toma agua, mira lejos 2–5 minutos. El descanso consolida la memoria.</p>`:""}
      ${planHTML()}
      <button class="btn primary block" id="contBtn">Seguir: ${esc(nxt.name)}</button>
      <button class="btn ghost block" id="stopBtn">Terminar aquí</button></div>`;
    $("#contBtn").onclick=()=>{ sess.si++; sess.i=0; sess.stageStart=Date.now(); sess.last=Date.now(); renderItem(); };
    $("#stopBtn").onclick=()=>endSession(true);
  } else endSession(true);
}
function planHTML(){
  if (sess.stages.length<2) return "";
  return `<ol class="plan small" style="text-align:left;margin:0 auto;max-width:360px">${sess.stages.map((s,i)=>`<li class="${i<=sess.si?"done":i===sess.si+1?"cur":""}">${esc(s.name)} <span class="muted">(${s.items.length})</span></li>`).join("")}</ol>`;
}

function finishExam(timeUp){
  if (sess.state==="examdone" || sess.state==="audit") return; sess.state="examdone"; addTime();
  const st=stage(); let ok=0;
  const rs = st.items.map((it,i)=>{
    const q=qById(it.id), a=sess.answers[sess.si+":"+i], good=a===q.correct; if(good) ok++;
    grade("q"+q.id, good?2:0); const l=logToday(); l.q++; if(good) l.ok++;
    const ri = registrarRespuesta(q, a, good, true);
    sess.results.push({t:"q",id:q.id,ok:good,ri});
    return {q, a, good, ri, i};
  });
  S.sims.push({d:Date.now(),n:st.items.length,ok}); save();
  sess.exRes = {rs, ok, timeUp};
  $("#sessBar").style.width="100%";
  const n = rs.filter(r=>r.a!=null).length;
  if (!n) return examResults();
  // Antes de ver la nota: auditoría a ciegas (si ves primero que acertaste, tiendes a decir «estaba seguro»).
  $("#sessBody").innerHTML = `<div class="card center stack">
      ${timeUp?'<span class="tag" style="background:var(--bad-soft);color:var(--bad)">Se acabó el tiempo</span>':""}
      <div class="big">🔍</div><h3 style="margin:0">Antes de ver tu nota: auditoría a ciegas</h3>
      <p class="small muted" style="margin:0">Repasa tus ${n} respuesta${n===1?"":"s"} <b>sin saber si acertaste</b> y marca cómo respondiste cada una. Así se separan los aciertos sólidos de los aciertos por suerte, y los fallos que no sabías de los errores cometidos con seguridad.</p>
      <button class="btn primary block" id="auditGo">🔍 Auditar mis respuestas</button>
      <button class="btn ghost block" id="auditSkip">Ver resultados sin auditar</button></div>`;
  $("#auditGo").onclick = ()=>auditar(0);
  $("#auditSkip").onclick = ()=>examResults();
}
function auditar(j){
  const rs = sess.exRes.rs, pend = rs.filter(r=>r.a!=null);
  const r = pend.find((x,k)=>k>=j && !x.c);
  if (!r) return examResults();
  sess.state="audit";
  const k = pend.indexOf(r);
  $("#sessStage").textContent = "Auditoría a ciegas"; $("#sessCount").textContent = `${k+1} / ${pend.length}`;
  $("#sessBar").style.width = (k/pend.length*100)+"%";
  $("#sessBody").innerHTML = `<div class="card">
      <div class="row xs"><span class="tag" style="color:${SPEC_COLOR[r.q.specialty]}">${esc(r.q.specialty)}</span><span class="muted">Pregunta ${r.i+1}</span></div>
      ${imgTag(r.q.img)}<p class="vignette" style="margin:12px 0 4px">${r.q.vignette}</p>
      <div id="opts" class="done">${r.q.options.map((o,i)=>`<div class="optrow"><button class="opt${i===r.a?" sel":""}" disabled><span class="l">${"ABCDE"[i]}</span><span>${esc(o)}</span></button></div>`).join("")}</div>
      <p class="small" style="margin:12px 0 6px"><b>¿Cómo respondiste la ${"ABCDE"[r.a]}?</b></p>
      <div class="grid2" id="confBtns">${CONFIANZA.map((c,i)=>`<button class="btn" data-conf="${c.k}"><b>${c.t}</b><br><span class="xs muted">${esc(c.d)}</span> <kbd>${i+1}</kbd></button>`).join("")}</div>
      <div class="row" style="margin-top:10px"><div class="spacer"></div><button class="linkbtn xs" id="auditEnd">Terminar la auditoría y ver resultados</button></div></div>`;
  window.scrollTo(0, 0);
  document.querySelectorAll("#confBtns [data-conf]").forEach(b=>b.onclick=()=>{ marcarConfianza(r, b.dataset.conf); auditar(k+1); });
  $("#auditEnd").onclick = ()=>examResults();
}
function examResults(){
  sess.state="examdone";
  const st=stage(), {rs, ok, timeUp} = sess.exRes, pct=Math.round(ok/st.items.length*100);
  const more = sess.si+1 < sess.stages.length;
  $("#sessBar").style.width="100%"; $("#sessStage").textContent = st.name; $("#sessCount").textContent = "";
  const rows = rs.map(({q, a, good, ri, i, c})=>{ const cf = CONFIANZA.find(x=>x.k===c), cl = clasifConfianza(good, c);
    return `<details class="card" style="padding:12px 14px;margin-top:10px"><summary style="cursor:pointer"><b style="color:${good?"var(--ok)":"var(--bad)"}">${good?"✓":"✗"}</b> ${i+1}. ${esc(q.topic)}${sess.flags && sess.flags[sess.si+":"+i] ? " 🚩" : ""}${cl ? ` <span class="audtag ${cl.k}">${cl.t}</span>` : ""}</summary>
      ${imgTag(q.img)}<p class="small" style="margin:10px 0">${q.vignette}</p>
      <p class="small" style="margin:0">Tu respuesta: <b>${a==null?"(sin responder)":esc(q.options[a])}</b>${cf ? ` · la marcaste como <b>${cf.t}</b>` : ""}<br>Correcta: <b style="color:var(--ok)">${esc(q.options[q.correct])}</b></p>
      ${cl && cl.msg ? `<p class="xs" style="margin:6px 0 0">${esc(cl.msg)}</p>` : ""}
      <p class="small muted" style="margin:8px 0 0">${esc(q.whyCorrect)}</p>${good ? "" : motivoHTML(ri)}${q.pearl ? `<div class="note pearl" style="margin-top:8px"><b>💎</b> ${esc(q.pearl)}</div>` : ""}${srcLine(q)}<div style="margin-top:6px"><button class="linkbtn xs" data-rep="q${q.id}">🚩 Reportar un error</button><div class="repslot"></div></div></details>`; });
  $("#sessBody").innerHTML = `<div class="card center stack">
      ${timeUp?'<span class="tag" style="background:var(--bad-soft);color:var(--bad)">Se acabó el tiempo</span>':""}
      <div class="big" style="color:${pct>=70?"var(--ok)":pct>=50?"var(--warn)":"var(--bad)"}">${pct}%</div>
      <p style="margin:0">${ok} de ${st.items.length} correctas</p>
      ${auditoriaResumen(rs, st.items.length)}
      <p class="muted small" style="margin:0">${pct>=70?"Nivel competitivo. Las falladas ya están en tu repaso.":pct>=50?"Vas bien. Revisa las falladas abajo: es donde más aprendes.":"Normal al principio. Cada falla queda programada para volver."}</p>
      <button class="btn primary block" id="contBtn">${more?"Seguir con el plan →":"Terminar"}</button></div>
    <h3 style="margin-top:18px;font-size:16px">Revisión</h3>${rows.join("")}`;
  window.scrollTo(0, 0);
  document.querySelectorAll("[data-rep]").forEach(b=>b.onclick=()=>openReportForm(b.dataset.rep, b.nextElementSibling));
  $("#contBtn").onclick = ()=> more ? (sess.state="ask", sess.i=st.items.length, nextStage()) : endSession(true);
}

function endSession(showSummary){
  if(!sess) return; addTime(); clearInterval(tick);
  const s=sess; sess=null; refreshChips();
  if (!showSummary) return;
  const q=s.results.filter(r=>r.t==="q"), c=s.results.filter(r=>r.t!=="q");
  const qok=q.filter(r=>r.ok).length, mins=Math.max(1,Math.round((Date.now()-s.start)/6e4));
  currentView="sess";
  $("#sessBar").style.width="100%";
  $("#sessStage").textContent="Resumen"; $("#sessCount").textContent=""; $("#sessTimer").textContent=fmt((Date.now()-s.start)/1000);
  $("#sessBody").innerHTML = `<div class="card center stack">
    <div class="big">${s.lazy?"🌱":s.tag==="fire"?"🏆":"🎯"}</div>
    <h3>${s.lazy?"¡Listo! Hoy sí estudiaste.":"Sesión terminada"}</h3>
    <div class="grid3">
      <div class="kpi"><b>${mins}</b><span>min</span></div>
      <div class="kpi"><b>${q.length?qok+"/"+q.length:"—"}</b><span>casos</span></div>
      <div class="kpi"><b>${c.length}</b><span>fichas</span></div>
    </div>
    ${s.skipped ? `<p class="xs muted" style="margin:0">Pasaste ${s.skipped} pregunta${s.skipped===1?"":"s"} sin responder: siguen disponibles.</p>` : ""}
    ${s.diag ? diagSummary(q) : ""}
    ${enfoqueResumen(s.results)}
    ${vulnResumen(s.results)}
    <p class="muted small" style="margin:0">🔥 Racha: <b>${streak()}</b> día${streak()===1?"":"s"}. ${s.lazy?"Lo difícil era empezar. ¿Y si haces otros 5 minutos ahora que ya entraste en ritmo?":"Lo que fallaste vuelve en tu repaso en el momento justo."}</p>
    ${s.lazy?'<button class="btn primary block" id="moreBtn">Otros 5 minutos 💪</button>':""}
    <button class="btn ${s.lazy?"ghost":"primary"} block" data-go="hoy">Volver a Hoy</button></div>`;
  $("#diagGo") && ($("#diagGo").onclick = ()=>{ const sp = $("#diagGo").dataset.spec; startSession({label:sp, tag:"norm", stages:[{name:sp, items:pickQuestions(5,{spec:sp})}]}); });
  $("#moreBtn") && ($("#moreBtn").onclick=()=>startSession({label:"Sin ganas (+5)",tag:"lazy",lazy:true,stages:[{name:"5 casos rápidos",items:pickQuestions(3)},{name:"Fichas",items:pickHY(3)}]}));
}

document.addEventListener("keydown", e=>{
  if (!sess || currentView!=="sess" || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const it = stage()?.items[sess.i];
  if (sess.state==="audit"){ if (/^[1-4]$/.test(e.key)) document.querySelectorAll("#confBtns [data-conf]")[+e.key-1]?.click(); return; }
  if (!it) { if(e.key==="Enter"){ $("#contBtn")?.click(); } return; }
  if (it.t==="q"){
    if (/^[1-5]$/.test(e.key) && sess.state==="ask"){ document.querySelectorAll("#opts .opt")[+e.key-1]?.click(); }
    else if (e.key==="Enter"){ e.preventDefault(); $("#nextBtn")?.click(); }
  } else if (it.t==="c"){
    if ((e.key===" "||e.key==="Enter") && sess.state==="ask"){ e.preventDefault(); flipC(cById(it.id)); }
    else if (/^[1-3]$/.test(e.key) && sess.state==="flip"){ gradeC(cById(it.id), +e.key-1); }
  } else if (it.t==="h"){
    if ((e.key===" "||e.key==="Enter") && sess.state==="ask"){ e.preventDefault(); flipH(hyById(it.id)); }
    else if (/^[1-3]$/.test(e.key) && sess.state==="flip"){ gradeH(hyById(it.id), +e.key-1); }
  } else if (e.key==="Enter") $("#nextBtn")?.click();
});
