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
  let sug;
  if (due>0) sug = `Tienes <b>${due} repaso${due>1?"s":""}</b> pendiente${due>1?"s":""}. Es lo que más rinde: estás a punto de olvidarlo.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDue">Repasar ahora</button></div>`;
  else if (!diagHecho()) { const p = diagProgreso();
    sug = p.hechos ? `Vas en <b>${p.hechos} de ${p.total}</b> casos de tu diagnóstico. Termínalo y te armo un plan con tus puntos débiles; mientras tanto, lo personalizado espera.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDiag">🎯 Seguir el diagnóstico</button></div>`
      : `<b>Primero, tu diagnóstico.</b> Antes de recomendarte qué estudiar necesito conocerte: ${p.total} casos en bloques de ${DIAG_BLOQUE} (unos 12 minutos cada uno), un cuestionario de cómo estudias y un caso de juicio clínico. Puedes hacerlo por partes.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDiag">🎯 Empezar el diagnóstico</button></div>`; }
  else if (!l.sec && st>0) sug = `Llevas <b>${st} día${st>1?"s":""}</b> de racha. Aunque hoy no tengas ganas, con <b>dos fichas</b> la mantienes.<div class="row" style="margin-top:10px"><button class="btn" id="doOne">Mantener racha (1 min)</button></div>`;
  else if (newUserItems().length) sug = `Tienes <b>${newUserItems().length} ítems nuevos</b> generados de tus PDF sin estudiar. Lo que acabas de leer se fija mejor si lo practicas hoy.<div class="row" style="margin-top:10px"><button class="btn primary" id="doNew">Practicar lo nuevo</button></div>`;
  else if (!SPECS.some(x => specStats()[x].n >= 3)) sug = `Todavía no sé cuál es tu punto más débil: necesito que respondas algunos casos. Empieza por el <b>diagnóstico rápido</b>: 5 casos, uno por área, y desde ahí te recomiendo.<div class="row" style="margin-top:10px"><button class="btn primary" id="doDiag">🎯 Hacer el diagnóstico</button></div>`;
  else sug = `Tu punto más débil ahora: <b>${weak}</b>. Una ronda de 5 casos de ese tema te dará el mayor avance.<div class="row" style="margin-top:10px"><button class="btn" id="doWeak">5 casos de ${weak}</button></div>`;
  $("#suggestCard").innerHTML = `<h3 style="font-size:16px">💡 Tu siguiente paso</h3><p style="margin:6px 0 0" class="small">${sug}</p>`;
  $("#doDue") && ($("#doDue").onclick = startDue);
  $("#doDiag") && ($("#doDiag").onclick = () => go("diag"));
  $("#doNew") && ($("#doNew").onclick = ()=>startSession({label:"Mis PDF",tag:"norm",stages:[{name:"Nuevo de tus fuentes",items:newUserItems().slice(0,15)}]}));
  $("#doOne") && ($("#doOne").onclick = ()=>startSession({label:"Mantener racha",tag:"lazy",stages:[{name:"Fichas",items:pickHY(2)}]}));
  $("#doWeak") && ($("#doWeak").onclick = ()=>startSession({label:"Tema débil",tag:"norm",stages:[{name:weak,items:pickQuestions(5,{spec:weak})}]}));
  renderDirected();
  renderPerla();
  refreshChips();
}
// ¿Qué estudiar hoy? Áreas ordenadas por precisión (las no exploradas primero). La práctica del enfoque está en Mi enfoque (perfil.js).
function renderDirected(){
  const st = specStats(), f = focusOf();
  const rank = s => st[s].n < 3 ? -1 + st[s].seen/Math.max(1, st[s].total) : st[s].ok/st[s].n;
  const top = SPECS.slice().sort((a,b)=>rank(a)-rank(b)).slice(0, 3);
  $("#directCard").innerHTML = plegable("queestudiar", `<b>🧭 ¿Qué estudiar hoy?</b> <span class="xs muted">${top.length} áreas</span>`, `
    <p class="xs muted" style="margin:4px 0 8px">Primero lo que no has explorado y lo que más fallas.</p>
    ${top.map(s=>{ const x = st[s], pct = x.n >= 3 ? Math.round(x.ok/x.n*100) : null;
      const todo = x.total && x.seen >= x.total;   // ya vio todos los casos de esa área
      return `<div class="row" style="margin-top:6px;gap:8px"><span class="dot" style="background:${SPEC_COLOR[s]}"></span><div style="flex:1;min-width:0"><b class="small">${esc(s)}</b><div class="xs muted">${pct===null ? `sin explorar · ${x.seen} de ${x.total} casos vistos` : `${pct} % de aciertos`}${todo ? ` · ya viste los ${x.total} casos` : ""}</div></div>${todo ? `<button class="btn sm" data-dbank="${esc(s)}">Ver opciones</button>` : `<button class="btn sm" data-dspec="${esc(s)}">5 casos</button>`}</div>`; }).join("")}`);
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
  $("#perlaRep").onclick = () => { const k = "q" + p.id, x = S.srs[k] || (S.srs[k] = {b: 0, due: 0, n: 0, ok: 0});
    const manana = new Date(); manana.setHours(24, 0, 0, 0); x.due = Math.min(x.due && x.due > Date.now() ? x.due : Infinity, manana.getTime()); x.agendado = true;
    save(); toast("El caso vuelve mañana en tus repasos ✓"); renderPerla(); };
  $("#perlaSabe").onclick = () => { const E = perlaEst(); E.sabe[p.id] = Date.now(); E.hoy = null; save(); toast("No vuelve en 60 días. Otra perla:"); renderPerla(); };
}
// «Hoy» diagramado: anillo hacia la meta diaria (minutos, la elige el usuario), casos, fichas y
// repasos, y la racha de los últimos 7 días.
const META_MIN = [15, 25, 45, 60, 90];
function renderHoyCard(l, st, due){
  const meta = S.metaMin || 25, min = Math.round(l.sec / 60), frac = Math.min(1, min / meta), R = 50, C = 2 * Math.PI * R;
  const dias = [...Array(7)].map((_, i) => { const d = new Date(Date.now() - (6 - i) * DAY), x = S.log[todayKey(d)];
    return {ini: d.toLocaleDateString("es", {weekday: "narrow"}).toUpperCase(), on: !!(x && (x.sec > 0 || x.q > 0 || x.c > 0)), hoy: i === 6}; });
  const fila = (ic, t, v, pct, color) => `<div class="r"><span>${ic}</span><span>${t}</span><b>${v}</b></div>${pct == null ? "" : `<div class="bar"><i style="width:${Math.min(100, pct)}%;background:${color}"></i></div>`}`;
  $("#todayCard").innerHTML = `
    <div class="row"><h3 style="font-size:16px">Hoy</h3><div class="spacer"></div>${l.sec > 0 || l.c > 0 || l.q > 0 ? '<span class="tag" style="background:var(--ok-soft);color:var(--ok)">✓ Racha asegurada</span>' : '<span class="tag">Aún sin estudiar</span>'}</div>
    <div class="hoyd">
      <div><div class="anillo" role="img" aria-label="${min} de ${meta} minutos de tu meta diaria">
        <svg width="118" height="118" viewBox="0 0 118 118"><circle cx="59" cy="59" r="${R}" fill="none" stroke="var(--subtle)" stroke-width="11"/>
          ${frac > 0 ? `<circle cx="59" cy="59" r="${R}" fill="none" stroke="${frac >= 1 ? "var(--ok)" : "var(--accent)"}" stroke-width="11" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - frac)).toFixed(1)}"/>` : ""}</svg>
        <div class="c"><b>${min}</b><span>de ${meta} min</span></div></div>
        <label class="metamin">Meta<select id="metaMin" aria-label="Meta diaria en minutos">${META_MIN.map(m => `<option value="${m}" ${m === meta ? "selected" : ""}>${m} min</option>`).join("")}</select></label></div>
      <div class="met">
        ${fila("🩺", "Casos", l.q ? `${l.q} · ${Math.round(l.ok / l.q * 100)} % ✓` : "0", l.q * 10, "var(--accent)")}
        ${fila("💎", "Fichas", l.c, l.c * 10, "var(--warn)")}
        ${fila("🔁", "Repasos", due ? `${due} pendiente${due === 1 ? "" : "s"}` : "al día ✓", null)}
      </div>
    </div>
    <div class="racha7" aria-label="Tus últimos 7 días">${dias.map(d => `<span class="d${d.on ? " on" : ""}${d.hoy ? " hoy" : ""}">${d.ini}</span>`).join("")}
      <span class="small" style="margin-left:4px">${st ? `🔥 <b>${st} día${st === 1 ? "" : "s"}</b>` : "Empieza tu racha hoy"}</span></div>`;
  $("#metaMin").onchange = e => { S.metaMin = +e.target.value; save(); renderHoy(); };
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
