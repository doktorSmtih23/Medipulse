// ===================================================================
// HOY
// ===================================================================
function renderHoy(){
  const h = new Date().getHours();
  $("#greet").textContent = h<12 ? "Buenos días ☀️" : h<19 ? "Buenas tardes 👋" : "Buenas noches 🌙";
  renderFocusSel();
  renderPdfHoy();
  const tope = document.querySelector('[data-mode="beast"] small'); if (tope) tope.textContent = diagHecho() ? "90 min" : "🔒 diagnóstico";
  if (typeof renderDataWarn === "function") renderDataWarn();
  $("#hoyFecha").textContent = new Date().toLocaleDateString("es", {weekday: "long", day: "numeric", month: "long"}).replace(/^./, c => c.toUpperCase());
  const l = logToday(), st = streak(), due = dueKeys().length;
  renderHoyCard(l, st, due);
  const weak = weakestSpec();
  // El siguiente paso: un botón grande («Seguir») y debajo por qué se eligió. s = {id, t: lo que hace, sub, por, mas}.
  let s;
  if (due>0) s = {id: "doDue", ico: "🔁", t: "Repasar ahora", sub: `${due} repaso${due>1?"s":""} pendiente${due>1?"s":""}`, por: "Es lo que más rinde: estás a punto de olvidarlo."};
  // Residente o especialista (lo eligió en la bienvenida) sin guías todavía: lo primero es traer su material.
  else if (perfilUso() === "residente" && !(S.sources || []).length && !diagHecho())
    s = {id: "doGuia", ico: "📚", t: "Sube tu primera guía", sub: "Un PDF de una guía o un artículo", por: "Te armo fichas y casos desde tu material y te aviso cuando una guía cambie de versión. El diagnóstico sigue disponible si quieres medirte."};
  else if (!diagHecho()) { const p = diagProgreso();
    s = p.hechos ? {id: "doDiag", ico: "🎯", t: "Seguir el diagnóstico", sub: `Vas en ${p.hechos} de ${p.total} casos`, por: "Termínalo y te armo un plan con tus puntos débiles; mientras tanto, lo personalizado espera."}
      : {id: "doDiag", ico: "🎯", t: "Empezar el diagnóstico", sub: `${p.total} casos en bloques de ${DIAG_BLOQUE}`, por: `<b>Primero, tu diagnóstico.</b> Antes de recomendarte qué estudiar necesito conocerte: los casos (unos 12 minutos cada bloque), un cuestionario de cómo estudias y un caso de juicio clínico. Puedes hacerlo por partes.`}; }
  else if (diagFocoHoy() && diagFocoHoy().qs.length) { const f = diagFocoHoy();
    s = {id: "doFoco", ico: "🩺", t: `Seguir · ${f.qs.length} casos`, sub: `${esc(QMETODO[f.tipo].t)} · ${esc(f.area)}`, por: `Según tu diagnóstico, es tu punto más débil. Primero los que toca repasar y los que no has visto.`,
      mas: `<button class="btn sm sig-sec" data-go="diag">Ver mi plan</button>`}; }
  else if (!l.sec && st>0) s = {id: "doOne", ico: "🔥", t: "Mantener racha", sub: "2 fichas · 1 min", por: `Llevas <b>${st} día${st>1?"s":""}</b> de racha. Aunque hoy no tengas ganas, con dos fichas la mantienes.`};
  else if (newUserItems().length) s = {id: "doNew", ico: "📄", t: "Practicar lo nuevo", sub: `${newUserItems().length} ítems de tus PDF sin estudiar`, por: "Lo que acabas de leer se fija mejor si lo practicas hoy."};
  else if (!SPECS.some(x => specStats()[x].n >= 3)) s = {id: "doDiag", ico: "🎯", t: "Hacer el diagnóstico", sub: "Empieza por aquí", por: "Todavía no sé cuál es tu punto más débil: necesito que respondas algunos casos. Con el diagnóstico te recomiendo desde el primer día."};
  else { const x = specStats()[weak];
    s = {id: "doWeak", ico: "💪", t: `Seguir · 5 casos`, sub: `${esc(weak)} · ${Math.round(x.ok / x.n * 100)} % de aciertos`, por: "Elegido porque es tu área más baja: una ronda de 5 casos de ese tema."}; }
  // Con la parte 1 hecha, sea cual sea el paso de hoy, se recuerda lo que falta del diagnóstico.
  const resto = diagFaltan().length ? `<p class="xs sig-resto">Para completar tu plan te falta ${diagFaltan().join(" y ")}. <button class="linkbtn xs" id="doDiagResto">Terminar el diagnóstico</button></p>` : "";
  // Usuario nuevo (sin respuestas y sin diagnóstico): Hoy se queda con lo esencial. El enfoque y «Tu examen
  // completo» aparecen cuando hay algo que ajustar o que mostrar; el atajo «Diagnóstico» no repite el paso siguiente.
  const nuevo = !Object.keys(S.srs).length && !(S.resp || []).length && !diagHecho();
  $("#enfoqueBox").hidden = nuevo; $("#areasCard").hidden = nuevo;
  $("#diagBtn").hidden = s.id === "doDiag";
  $(".atajos").classList.toggle("dos", s.id === "doDiag");
  if (nuevo && !$("#bienvenida")) bienvenida();
  $("#suggestCard").innerHTML = `<p class="sig-k">💡 Tu siguiente paso</p>
    <button class="seguir" id="${s.id}"><span class="sig-ico" aria-hidden="true">${s.ico || "▶"}</span><span class="sig-txt"><b>${s.t}</b><small>${s.sub}</small></span><span class="flecha" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></button>
    <p class="sig-por small">${s.por}</p>${s.mas ? `<div class="row" style="margin-top:8px">${s.mas}</div>` : ""}${resto}`;
  $("#doDue") && ($("#doDue").onclick = startDue);
  $("#doDiag") && ($("#doDiag").onclick = () => go("diag"));
  $("#doGuia") && ($("#doGuia").onclick = () => go("lib"));
  $("#doDiagResto") && ($("#doDiagResto").onclick = diagIrAlInicio);
  $("#doFoco") && ($("#doFoco").onclick = () => { const f = diagFocoHoy(); startSession({label: "Foco del día", tag: "norm", stages: [{name: `${QMETODO[f.tipo].t} · ${f.area}`, items: f.qs.map(q => ({t: "q", id: q.id}))}]}); });
  $("#doNew") && ($("#doNew").onclick = ()=>startSession({label:"Mis PDF",tag:"norm",stages:[{name:"Nuevo de tus fuentes",items:newUserItems().slice(0,15)}]}));
  $("#doOne") && ($("#doOne").onclick = ()=>startSession({label:"Mantener racha",tag:"lazy",stages:[{name:"Fichas",items:pickHY(2)}]}));
  $("#doWeak") && ($("#doWeak").onclick = ()=>startSession({label:"Tema débil",tag:"norm",stages:[{name:weak,items:pickQuestions(5,{spec:weak})}]}));
  renderRota(st);
  renderAreas();
  renderDirected();
  refreshChips();
}
// ¿Qué estudiar hoy? Áreas ordenadas por precisión (las no exploradas primero). La práctica del enfoque está en Mi enfoque (perfil.js).
function renderDirected(){
  const st = specStats();
  const rank = s => st[s].n < 3 ? -1 + st[s].seen/Math.max(1, st[s].total) : st[s].ok/st[s].n;
  const top = SPECS.slice().sort((a,b)=>rank(a)-rank(b)).slice(0, 3);
  $("#directCard").innerHTML = plegable("queestudiar", `<b>🧭 ¿Qué estudiar hoy?</b> <span class="xs muted">${top.length} áreas</span>`, `
    <p class="xs muted" style="margin:4px 0 8px">Primero lo que no has explorado y lo que más fallas.</p>
    ${top.map(s=>{ const x = st[s], pct = x.n >= 3 ? Math.round(x.ok/x.n*100) : null;
      const todo = x.total && x.seen >= x.total;   // ya vio todos los casos de esa área
      const estado = (pct === null ? `sin explorar · ${x.seen} de ${x.total} casos vistos` : `${pct} % de aciertos`) + (todo ? ` · ya viste los ${x.total} casos` : "");
      const accion = todo ? `<button class="btn sm" data-dbank="${esc(s)}">Ver opciones</button>` : `<button class="btn sm" data-dspec="${esc(s)}">5 casos</button>`;
      return `<div class="row" style="margin-top:6px;gap:8px"><span class="dot" style="background:${SPEC_COLOR[s]}"></span>`
        + `<div style="flex:1;min-width:0"><b class="small">${esc(s)}</b><div class="xs muted">${estado}</div></div>${accion}</div>`; }).join("")}`);
  document.querySelectorAll("[data-dbank]").forEach(b=>b.onclick=()=>{ prac().specs = [b.dataset.dbank]; qSt = "all"; save(); go("banco"); });
  document.querySelectorAll("[data-dspec]").forEach(b=>b.onclick=()=>startSession({label:"Estudio dirigido",tag:"norm",stages:[{name:b.dataset.dspec,items:pickQuestions(5,{spec:b.dataset.dspec})}]}));
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{
  const m=b.dataset.mode;
  if (m==="beast" && !diagHecho()) { toast("🔒 «A tope» se abre con tu diagnóstico: arma el plan con tus puntos débiles."); return go("diag"); }
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

// Perla del día: arriba y destacada (puede ser lo único que el usuario vea). No es al azar: primero
// las de casos que fallaste o que toca repasar, luego las de tu propio contenido y al final las
// incluidas. Ninguna se repite antes de 30 días; «✓ Me la sé» la saca por 60. La perla sale de un
// caso, así que se gestiona con su caso: «Ponerla a prueba» lo abre y «A mis repasos» lo agenda.
const PERLA_VISTA = 30 * DAY, PERLA_SABE = 60 * DAY;
const perlaEst = () => S.perlas || (S.perlas = {vista: {}, sabe: {}, hoy: null});
function perlaMotivo(q){
  const k = "q" + q.id, r = S.srs[k];
  if (r && (r.last === 0 || isDue(k))) return {n: 0, t: r.last === 0 ? "De un caso que fallaste" : "De un caso que toca repasar"};
  if (S.userQ.some(x => String(x.id) === String(q.id))) return {n: 1, t: "De tu propio contenido"};
  return {n: 2, t: ""};
}
function elegirPerla(){
  const E = perlaEst(), ahora = Date.now(), dia = todayKey();
  const pool = QUESTIONS.filter(q => q.pearl && !S.hidden["q" + q.id]);
  if (!pool.length) return null;
  if (E.hoy && E.hoy.dia === dia) { const q = pool.find(x => String(x.id) === String(E.hoy.id)); if (q) return q; }
  const libre = q => !(ahora - (E.vista[q.id] || 0) < PERLA_VISTA) && !(ahora - (E.sabe[q.id] || 0) < PERLA_SABE);
  let cand = pool.filter(libre);
  if (!cand.length) cand = pool.filter(q => !(ahora - (E.sabe[q.id] || 0) < PERLA_SABE)).sort((a, b) => (E.vista[a.id] || 0) - (E.vista[b.id] || 0)).slice(0, 5);
  if (!cand.length) cand = pool;
  const mejor = Math.min(...cand.map(q => perlaMotivo(q).n));
  const tier = cand.filter(q => perlaMotivo(q).n === mejor), q = tier[Math.floor(Math.random() * tier.length)];
  E.vista[q.id] = ahora; E.hoy = {dia, id: String(q.id)}; save();
  return q;
}
function renderPerla(){
  const p = elegirPerla(); $("#pearlCard").hidden = !p; if (!p) return;
  const m = perlaMotivo(p), r = S.srs["q" + p.id], agendado = r && r.due > Date.now() && r.due - Date.now() <= 1.5 * DAY && r.agendado;
  $("#pearlCard").innerHTML = `<span class="gema" aria-hidden="true">💎</span>
    <div class="et"><b>PERLA DEL DÍA</b><span class="muted">${esc(p.topic || p.specialty)}</span></div>
    ${m.t ? `<div class="xs" style="margin-top:6px;color:var(--warn);font-weight:700">🎯 ${esc(m.t)}</div>` : ""}
    <div class="perla-txt">${perlaHTML(p.pearl)}</div>
    <div class="row" style="gap:6px"><button class="btn sm primary" id="perlaCaso">🩺 Ponerla a prueba</button>
      <button class="btn sm" id="perlaRep" ${agendado ? "disabled" : ""}>${agendado ? "✓ En tus repasos" : "🔁 A mis repasos"}</button>
      <button class="btn sm ghost" id="perlaSabe">✓ Me la sé</button></div>`;
  $("#perlaCaso").onclick = () => startSession({label: "Perla del día", tag: "norm", stages: [{name: "El caso de la perla", items: [{t: "q", id: p.id}]}]});
  // El caso entra al repaso espaciado y vuelve mañana (si ya estaba, se adelanta a mañana).
  $("#perlaRep").onclick = () => { const k = "q" + p.id, x = repasoDe(k);
    const manana = new Date(); manana.setHours(24, 0, 0, 0); x.due = Math.min(x.due && x.due > Date.now() ? x.due : Infinity, manana.getTime()); x.agendado = true;
    save(); toast("El caso vuelve mañana en tus repasos ✓"); renderPerla(); };
  $("#perlaSabe").onclick = () => { const E = perlaEst(); E.sabe[p.id] = Date.now(); E.hoy = null; save(); toast("No vuelve en 60 días. Otra perla:"); renderPerla(); };
}
// El pulso de hoy: los minutos estudiados contra la meta diaria (la elige el usuario). La línea de
// electrocardiograma se llena hasta la meta; debajo, casos, fichas, repasos y racha.
const META_MIN = [15, 25, 45, 60, 90];
const ECG = "0,30 30,30 38,24 44,30 56,30 62,6 70,44 78,30 98,30 108,22 120,30 150,30 158,24 164,30 176,30 182,6 190,44 198,30 218,30 228,22 240,30 270,30 278,24 284,30 296,30 302,6 310,44 318,30 350,30";
// Altura de la línea en una x (ahí va el punto que late): la línea se llena de izquierda a derecha.
function ecgY(x){
  const P = ECG.split(" ").map(p => p.split(",").map(Number));
  for (let i = 1; i < P.length; i++) if (x <= P[i][0]) { const [a, b] = [P[i-1], P[i]]; return a[1] + (b[1] - a[1]) * (x - a[0]) / Math.max(1e-6, b[0] - a[0]); }
  return 30;
}
function renderHoyCard(l, st, due){
  const meta = S.metaMin || 25, min = Math.round(l.sec / 60), frac = Math.min(1, min / meta), x = 350 * frac, lleno = frac >= 1;
  $("#todayCard").innerHTML = `
    <div class="pulso-min"><span><b>${min}</b> de ${meta} min</span>
      <label class="metamin">Meta<select id="metaMin" aria-label="Meta diaria en minutos">${META_MIN.map(m => `<option value="${m}" ${m === meta ? "selected" : ""}>${m} min</option>`).join("")}</select></label></div>
    <div class="ecg-caja"><svg class="ecg" viewBox="0 0 350 48" preserveAspectRatio="none" role="img" aria-label="${min} de ${meta} minutos de tu meta diaria">
      <polyline class="ecg-base" points="${ECG}"/>
      <clipPath id="ecgLleno"><rect class="ecg-clip" x="0" y="-10" width="${x.toFixed(1)}" height="70"/></clipPath>
      ${frac > 0 ? `<polyline class="ecg-on${lleno ? " lleno" : ""}" points="${ECG}" clip-path="url(#ecgLleno)"/>` : ""}
      </svg><i class="ecg-pto${lleno ? " lleno" : ""}" style="left:${(frac * 100).toFixed(1)}%;top:${(ecgY(x) / 48 * 100).toFixed(1)}%"></i></div>
    <div class="pulso-pie"><span>Tu pulso de hoy</span><b>${lleno ? "✓ Meta cumplida" : `faltan ${meta - min} min`}</b></div>
    <div class="pulso-datos"><span>🩺 <b>${l.q}</b> caso${l.q === 1 ? "" : "s"}${l.q ? ` · ${Math.round(l.ok / l.q * 100)} % ✓` : ""}</span><span>💎 <b>${l.c}</b> ficha${l.c === 1 ? "" : "s"}</span>
      <span>🔁 ${due ? `<b>${due}</b> repaso${due === 1 ? "" : "s"}` : "repasos al día ✓"}</span><span>🔥 ${st ? `<b>${st}</b> día${st === 1 ? "" : "s"}` : "empieza hoy"}</span></div>`;
  $("#metaMin").onchange = e => { S.metaMin = +e.target.value; save(); renderHoy(); };
}

// Recuadro que cambia: perla del día, pregunta relámpago, tu semana y reto de 3 minutos. Se desliza de lado;
// cada día abre en uno distinto para que Hoy no se vea siempre igual. Si el usuario lo mueve, se queda ahí.
let rotaDia = null;
function renderRota(st){
  renderPerla(); renderRelampago(); renderSemana(st); renderReto();
  const pista = $("#rotaPista"), slides = [...pista.children].filter(x => !x.hidden), dots = $("#rotaDots");
  dots.innerHTML = slides.map((x, i) => `<button type="button" data-rota="${i}" aria-label="${esc(x.dataset.nombre)}"></button>`).join("");
  const x0 = i => slides[i].offsetLeft - slides[0].offsetLeft;
  const ir = (i, suave) => pista.scrollTo({left: x0(i), behavior: suave ? "smooth" : "auto"});
  const marcar = () => { let i = 0; slides.forEach((_, k) => { if (Math.abs(x0(k) - pista.scrollLeft) < Math.abs(x0(i) - pista.scrollLeft)) i = k; });
    dots.querySelectorAll("button").forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-current", k === i); });
    pista.style.height = slides[i].offsetHeight + "px"; };   // el recuadro toma la altura del que se ve
  dots.querySelectorAll("button").forEach(b => b.onclick = () => ir(+b.dataset.rota, true));
  pista.onscroll = () => { clearTimeout(pista._t); pista._t = setTimeout(marcar, 60); };
  if (rotaDia !== todayKey()) { rotaDia = todayKey(); const n = Math.floor(Date.now() / DAY); ir(n % slides.length, false); }
  marcar();
}
// Pregunta relámpago: un caso corto que no has visto, se responde aquí mismo con un toque y cuenta como
// cualquier caso (repaso, aciertos del día, vulnerabilidades). Es la misma durante el día.
let relHoy = null;
function relPregunta(){
  const dia = todayKey();
  if (relHoy && relHoy.dia === dia) { const q = qById(relHoy.id); if (q) return q; }
  const corta = q => !S.hidden["q" + q.id] && q.vignette && q.vignette.length < 420 && q.options.every(o => o.length < 90);
  const pool = QUESTIONS.filter(corta), nuevos = pool.filter(q => !S.srs["q" + q.id]), base = nuevos.length ? nuevos : pool;
  if (!base.length) return null;
  const q = base[[...dia].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 1e9, 7) % base.length];
  relHoy = {dia, id: String(q.id), o: null};
  return q;
}
function renderRelampago(){
  const box = $("#relCard"), q = relPregunta(); box.hidden = !q; if (!q) return;
  const o = relHoy.o, hecho = o != null, ok = o === q.correct;
  box.innerHTML = `<div class="rota-k"><b>⚡ PREGUNTA RELÁMPAGO</b><span class="muted">${esc(q.specialty)}</span></div>
    <p class="vignette rel-v">${q.vignette}</p>
    <div class="rel-ops">${q.options.map((x, i) => `<button class="rel-op${hecho && i === q.correct ? " ok" : ""}${hecho && i === o && !ok ? " bad" : ""}" data-rel="${i}" ${hecho ? "disabled" : ""}><b>${"ABCDE"[i]}</b> ${esc(x)}</button>`).join("")}</div>
    ${hecho ? `<p class="small rel-fb ${ok ? "ok" : "bad"}"><b>${ok ? "✓ Correcto." : `✗ Era la ${"ABCDE"[q.correct]}. Vuelve en tu repaso.`}</b> ${esc(q.whyCorrect || "")}</p>` : `<p class="xs muted" style="margin:8px 0 0">Responde con un toque: cuenta como cualquier caso.</p>`}`;
  box.querySelectorAll("[data-rel]").forEach(b => b.onclick = () => {
    const e = +b.dataset.rel, bien = e === q.correct;
    grade("q" + q.id, bien ? 2 : 0); contarCaso(q.specialty, bien); registrarRespuesta(q, e, bien, false); relHoy.o = e; save(); renderHoy();
  });
}
// Suma del registro entre «desde» y «hasta» días atrás (0 = hoy).
function sumaDias(desde, hasta){
  const r = {sec: 0, q: 0, ok: 0, c: 0, dias: 0};
  for (let i = desde; i < hasta; i++) { const x = S.log[todayKey(new Date(Date.now() - i * DAY))]; if (!x) continue;
    r.sec += x.sec || 0; r.q += x.q || 0; r.ok += x.ok || 0; r.c += x.c || 0; if (x.sec > 0 || x.q > 0 || x.c > 0) r.dias++; }
  return r;
}
const FLECHA = {up: '<span class="tend up" title="Subió">↑</span>', down: '<span class="tend down" title="Bajó">↓</span>', igual: '<span class="tend" title="Igual">→</span>'};
const flechaDe = (a, b, margen) => a - b >= margen ? FLECHA.up : b - a >= margen ? FLECHA.down : FLECHA.igual;
function renderSemana(st){
  const a = sumaDias(0, 7), b = sumaDias(7, 14), pa = a.q >= 3 ? Math.round(a.ok / a.q * 100) : null, pb = b.q >= 3 ? Math.round(b.ok / b.q * 100) : null;
  const hayAntes = b.dias > 0;
  const fila = (t, va, vb, fl) => `<div class="sem-f"><span>${t}</span><b>${va}</b><span class="muted">${hayAntes ? vb : "—"}</span>${hayAntes ? fl : "<span></span>"}</div>`;
  const dias = [...Array(7)].map((_, i) => { const d = new Date(Date.now() - (6 - i) * DAY), x = S.log[todayKey(d)];
    return {ini: d.toLocaleDateString("es", {weekday: "narrow"}).toUpperCase(), on: !!(x && (x.sec > 0 || x.q > 0 || x.c > 0)), hoy: i === 6}; });
  $("#semCard").innerHTML = `<div class="rota-k"><b>📅 TU SEMANA</b><span class="muted">últimos 7 días</span></div>
    <div class="sem-f sem-cab"><span></span><span>Esta</span><span>Anterior</span><span></span></div>
    ${fila("⏱️ Minutos", Math.round(a.sec / 60), Math.round(b.sec / 60), flechaDe(a.sec / 60, b.sec / 60, 5))}
    ${fila("🩺 Casos", a.q, b.q, flechaDe(a.q, b.q, 3))}
    ${fila("✓ Aciertos", pa == null ? "—" : pa + " %", pb == null ? "—" : pb + " %", pa != null && pb != null ? flechaDe(pa, pb, 3) : "<span></span>")}
    ${fila("📆 Días", a.dias, b.dias, flechaDe(a.dias, b.dias, 1))}
    ${hayAntes ? "" : `<p class="xs muted" style="margin:6px 0 0">La comparación aparece cuando tengas una semana anterior registrada.</p>`}
    <div class="racha7" aria-label="Tus últimos 7 días">${dias.map(d => `<span class="d${d.on ? " on" : ""}${d.hoy ? " hoy" : ""}">${d.ini}</span>`).join("")}
      <span class="small" style="margin-left:4px">${st ? `🔥 <b>${st} día${st === 1 ? "" : "s"}</b>` : "Empieza tu racha hoy"}</span></div>`;
}
function renderReto(){
  const w = weakestSpec();
  $("#retoCard").innerHTML = `<div class="rota-k"><b>⏱️ RETO DE 3 MINUTOS</b><span class="muted">contra el reloj</span></div>
    <p class="reto-t">3 casos de <b>${esc(w)}</b> en 3 minutos.</p>
    <p class="xs muted" style="margin:0 0 10px">Como en el examen: sin pistas y con el reloj corriendo. Al final ves cuáles fallaste y por qué.</p>
    <button class="btn primary" id="doReto">Aceptar el reto</button>`;
  $("#doReto").onclick = () => startSession({label: "Reto de 3 minutos", tag: "fire", stages: [{name: "Reto · " + w, items: pickQuestions(3, {spec: w}), exam: true, limit: 180}]});
}

// Tu examen completo: el porcentaje de aciertos de cada especialidad con datos (3 respuestas o más), de la más
// baja a la más alta, con la flecha de los últimos 7 días contra los 7 anteriores (sin flecha si falta con qué
// comparar). Con muchas especialidades la barra se agrupa en tres y la lista muestra 6 con «Ver las N».
const AREA_NIVEL = p => p < 50 ? "baja" : p < 60 ? "riesgo" : "bien";
let areasTodas = false;
const AREA_CORTO = {"Medicina Interna": "M. Interna", "Epidemiología y Estadística": "Epidemiología", "Ortopedia y Traumatología": "Ortopedia"};
function tendenciaEsp(spec){
  const v = (a, b) => { let n = 0, ok = 0;
    for (let i = a; i < b; i++) { const x = S.log[todayKey(new Date(Date.now() - i * DAY))]; const e = !x ? null : spec ? x.esp && x.esp[spec] : [x.q, x.ok];
      if (e) { n += e[0] || 0; ok += e[1] || 0; } }
    return n >= 3 ? ok / n * 100 : null; };
  const a = v(0, 7), b = v(7, 14);
  return a == null || b == null ? "" : flechaDe(a, b, 3);
}
function renderAreas(){
  const st = specStats(), con = ESPS().filter(s => st[s] && st[s].n >= 3).map(s => ({s, p: Math.round(st[s].ok / st[s].n * 100)})).sort((a, b) => a.p - b.p);
  const sin = ESPS().length - con.length;
  if (!con.length) { $("#areasCard").innerHTML = `<div class="areas-cab"><span>TU EXAMEN COMPLETO</span></div>
    <p class="small muted" style="margin:8px 0 0">Responde 3 casos o más de un área y aquí verás su porcentaje de aciertos y si va subiendo o bajando.</p>`; return; }
  const n = con.reduce((a, x) => a + st[x.s].n, 0), ok = con.reduce((a, x) => a + st[x.s].ok, 0);
  const grupos = con.length > 12;
  const barra = grupos
    ? ["bien", "riesgo", "baja"].map(k => { const c = con.filter(x => AREA_NIVEL(x.p) === k).length;
        return c ? `<i class="nv-${k}" style="flex:${c}" title="${c}">${c} ${({bien: "bien", riesgo: "en riesgo", baja: "bajas"})[k]}</i>` : ""; }).join("")
    : con.slice().reverse().map(x => `<i class="nv-${AREA_NIVEL(x.p)}" style="opacity:${(.4 + x.p / 170).toFixed(2)}" title="${esc(x.s)}: ${x.p} %"></i>`).join("");
  const vis = areasTodas ? con : con.slice(0, 6);
  $("#areasCard").innerHTML = `<div class="areas-cab"><span>TU EXAMEN COMPLETO</span><b>${Math.round(ok / n * 100)} % global ${tendenciaEsp(null)}</b></div>
    <div class="areas-barra${grupos ? " grupos" : ""}">${barra}</div>
    <div class="areas-lista">${vis.map(x => `<button class="area" data-aspec="${esc(x.s)}" title="${esc(x.s)}: 5 casos"><span class="dot" style="background:${SPEC_COLOR[x.s]}"></span><span class="area-n">${esc(AREA_CORTO[x.s] || x.s)}</span><b class="nv-t-${AREA_NIVEL(x.p)}">${x.p}</b>${tendenciaEsp(x.s) || '<span class="tend"></span>'}</button>`).join("")}</div>
    ${con.length > 6 ? `<button class="linkbtn areas-mas" id="areasMas">${areasTodas ? "Ver menos" : `Ver las ${con.length} especialidades ›`}</button>` : ""}
    <p class="xs muted" style="margin:8px 0 0">Bajas: menos de 50 %. En riesgo: 50 a 59 %. Toca un área para 5 casos.${sin ? ` ${sin} sin datos todavía.` : ""}</p>`;
  $("#areasMas") && ($("#areasMas").onclick = () => { areasTodas = !areasTodas; renderAreas(); });
  document.querySelectorAll("[data-aspec]").forEach(b => b.onclick = () => startSession({label: "Estudio dirigido", tag: "norm", stages: [{name: b.dataset.aspec, items: pickQuestions(5, {spec: b.dataset.aspec})}]}));
}

// La perla se escribe en una línea; para leerla de un vistazo se ordena sola: el rótulo inicial
// («SSC 2026:», «UKKA:») en negrita, los pasos «1) 2) 3)» o las oraciones en viñetas, y lo que va
// entre paréntesis con varios datos («(insulina…; salbutamol…)») en sub-viñetas.
function partirFuera(s, sep){   // parte por «sep» solo fuera de paréntesis
  const out = []; let d = 0, cur = "";
  for (const ch of s) { if (ch === "(") d++; if (ch === ")") d = Math.max(0, d - 1);
    if (ch === sep && !d) { out.push(cur); cur = ""; } else cur += ch; }
  out.push(cur); return out.map(x => x.trim()).filter(Boolean);
}
const perlaMay = s => s.charAt(0).toUpperCase() + s.slice(1);
function perlaItem(s){
  s = s.trim().replace(/[;.]$/, "");
  const m = s.match(/^(.*?)\s*\(([^()]*;[^()]*)\)\s*(.*)$/);      // paréntesis con varios datos → sub-viñetas
  if (m && !m[3]) return `${esc(perlaMay(m[1]))}<ul>${m[2].split(";").map(x => `<li>${esc(perlaMay(x.trim()))}</li>`).join("")}</ul>`;
  const l = s.match(/^([^:()]{2,40}(?:\([^)]{1,20}\))?):\s+(.+)$/);    // «Gravedad moderada: amoxicilina…»
  return l ? `<b>${esc(perlaMay(l[1].trim()))}:</b> ${esc(l[2])}` : esc(perlaMay(s));
}
function perlaHTML(texto){
  let t = String(texto || "").trim(), titulo = "";
  // Rótulo de arriba solo si es una fuente o una sigla («SSC 2026», «NICE», «UKKA», «Metotrexato (NICE)»);
  // si no («Error tipo I (α): …»), cada viñeta lleva su propio rótulo en negrita.
  const r = t.match(/^([^:.;()]{2,40}(?:\([^)]{1,20}\))?):\s+(.+)$/s);
  if (r && r[1].trim().split(/\s+/).length <= 3 && /\b[A-Z]{2,}\d*\b|\b(19|20)\d{2}\b/.test(r[1])) { titulo = r[1].trim(); t = r[2]; }
  let items, num = false;
  if (/(^|\s)1\)\s/.test(t) && /\s2\)\s/.test(t)) {
    num = true;
    const partes = t.split(/(?:^|\s)\d\)\s+/).map(x => x.trim()).filter(Boolean);
    // Lo que sigue al último paso, después de un punto, es una nota aparte.
    const ult = partirFuera(partes.pop(), ".");
    items = partes.concat(ult.slice(0, 1)); var notas = ult.slice(1);
  } else {
    items = t.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ«¿])/).flatMap(o => partirFuera(o, ";"));
  }
  if (!titulo && items.length <= 1 && !num) return `<p>${esc(t)}</p>`;
  const tag = num ? "ol" : "ul";
  return `${titulo ? `<div class="perla-t">${esc(titulo)}</div>` : ""}<${tag} class="perla-l">${items.map(x => `<li>${perlaItem(x)}</li>`).join("")}</${tag}>`
    + (num && notas && notas.length ? `<ul class="perla-l nota">${notas.map(x => `<li>${perlaItem(x)}</li>`).join("")}</ul>` : "");
}

// ---------- Bienvenida (solo la primera vez, en este dispositivo) ----------
// Para qué usa la app: "examen" (aspirante) o "residente" (residente o especialista). Solo cambia el paso sugerido.
function perfilUso(v){
  try { if (v) localStorage.setItem("medipulse_perfil", v); return localStorage.getItem("medipulse_perfil") || ""; } catch(e) { return ""; }
}
// Tres pantallas: qué es, cómo se usa y por dónde empezar. Se guarda en localStorage que ya se vio.
const BIENV = [
  {ico: "🩺", t: "Bienvenido a MediPulse", d: "Para quien prepara el examen de residencia y para residentes y especialistas que quieren estar al día: casos tipo examen, repaso de lo que fallas, estudio desde tus propias guías y aviso cuando una guía cambia de versión."},
  {ico: "🧭", t: "Así se usa", lista: [["🏠", "Hoy", "te dice qué hacer cada día"], ["🩺", "Casos", "practica y descubre dónde fallas"], ["💎", "Fichas", "datos clave para repasar"], ["📚", "Fuentes", "tus PDF y guías"]],
    d: "Todo se guarda en tu celular."},
  {ico: "🎯", t: "¿Por dónde empiezas?", d: "Si preparas el examen, empieza por tu diagnóstico: 60 casos en bloques de 10, unos 12 minutos cada uno, por partes. Si ya eres residente o especialista, empieza por tus guías."}
];
function bienvenida(paso = 0){
  try { if (localStorage.getItem("medipulse_bienvenida")) return; } catch(e) { return; }
  let d = $("#bienvenida");
  if (!d) { d = document.createElement("div"); d.id = "bienvenida"; d.className = "bienv"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); document.body.appendChild(d); }
  const b = BIENV[paso], ult = paso === BIENV.length - 1;
  d.innerHTML = `<div class="bienv-in">
    <button class="linkbtn xs bienv-saltar" id="bienvSaltar">Saltar</button>
    <div class="bienv-ico" aria-hidden="true">${b.ico}</div>
    <h2>${b.t}</h2>
    ${b.lista ? `<div class="bienv-lista">${b.lista.map(([i, t, x]) => `<div><span>${i}</span><p><b>${t}</b> · ${x}</p></div>`).join("")}</div>` : ""}
    <p class="muted">${b.d}</p>
    <div class="bienv-dots">${BIENV.map((_, i) => `<i class="${i === paso ? "on" : ""}"></i>`).join("")}</div>
    ${ult ? `<button class="btn primary block" id="bienvDiag">🎯 Preparo el examen: empezar el diagnóstico</button>
      <button class="btn block" id="bienvRes">📚 Soy residente o especialista: ir a mis guías</button>
      <button class="linkbtn" id="bienvFin">Explorar primero</button>`
      : `<button class="btn primary block" id="bienvSig">Siguiente</button>`}</div>`;
  const cerrar = () => { try { localStorage.setItem("medipulse_bienvenida", "1"); } catch(e) {} d.remove(); };
  $("#bienvSaltar").onclick = cerrar;
  $("#bienvSig") && ($("#bienvSig").onclick = () => bienvenida(paso + 1));
  $("#bienvFin") && ($("#bienvFin").onclick = cerrar);
  $("#bienvDiag") && ($("#bienvDiag").onclick = () => { perfilUso("examen"); cerrar(); go("diag"); });
  $("#bienvRes") && ($("#bienvRes").onclick = () => { perfilUso("residente"); cerrar(); go("lib"); });
}
