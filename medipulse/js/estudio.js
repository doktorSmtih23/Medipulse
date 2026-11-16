// ===================================================================
// SESIÓN DE ESTUDIO: estudiar un tema (revisión, capítulo, guía o tus apuntes) con método:
//   1. Antes de leer: pre-test con casos del banco del tema o «¿qué sabes ya?».
//   2. Leer por bloques con pomodoro y una plantilla de qué extraer.
//   3. Al final de cada bloque, recuerdo activo: escribir de memoria y luego comparar.
//   4. Cierre: los puntos se vuelven ficha, post-test (¿cuánto mejoraste?) y repaso espaciado.
// «📊 Cómo estudias»: métricas y consejos sin IA, e informe detallado con IA (solo cifras, nunca tus textos).
// La sesión en curso vive en S.estudio.actual: el reloj se calcula con marcas de tiempo y sobrevive a recargar.
// ===================================================================
const EST_RITMOS = [{k: "25/5", t: 25, d: 5, l: 15, n: "Clásico"}, {k: "50/10", t: 50, d: 10, l: 20, n: "Bloques largos"}, {k: "15/3", t: 15, d: 3, l: 10, n: "Si estás cansado"}];
const EST_PLANTILLA = [["fisio", "🧬 Fisiopatología", "Causa → mecanismo → signo clínico"], ["cuadro", "🩺 Cuadro típico", "Quién, cómo se presenta, hallazgos clave"],
  ["banderas", "🚩 Banderas rojas", "Cuándo sospechar algo grave"], ["algoritmo", "🧭 Algoritmo", "Prueba inicial → confirmatoria → tratamiento de primera línea"],
  ["dif", "🔀 Diferenciales", "Con qué se confunde y el dato que los separa"], ["perlas", "💎 Perlas", "Cifras, umbrales y trampas de examen"]];
const EST_AUTO = [["todo", "Casi todo"], ["mitad", "La mitad"], ["poco", "Poco"]];
let estNuevo = {src: "", tema: "", indice: -1, guiaIA: true, mias: ""};
const estD = () => S.estudio || (S.estudio = {cfg: {ritmo: "25/5"}, ses: [], informes: [], actual: null});
const estRitmo = () => EST_RITMOS.find(r => r.k === (estD().cfg.ritmo || "25/5")) || EST_RITMOS[0];
const estAct = () => estD().actual;
const mmss = s => { s = Math.max(0, Math.round(s)); return `${String(s / 60 | 0).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };

// ---------- casos del banco sobre el tema (pre-test y post-test) ----------
function estCasos(tema, src){
  const T = dupTokens(tema);
  if (!T.size) return [];
  const score = q => { const Q = dupTokens([q.topic, String(q.vignette).replace(/<[^>]+>/g, " ")].join(" ")); let c = 0; T.forEach(w => { if (Q.has(w)) c++; }); return c / T.size + (src && q.src === src ? 0.5 : 0); };
  return QUESTIONS.map(q => [score(q), q]).filter(([s]) => s >= 0.5).sort((a, b) => b[0] - a[0]).slice(0, 5).map(([, q]) => String(q.id));
}

// ---------- reloj ----------
function estRestante(a){
  if (!a || !a.fase) return 0;
  const pausa = a.fase.pausa ? Date.now() - a.fase.pausa : 0;
  return a.fase.dur - (Date.now() - a.fase.ini - (a.fase.pausado || 0) - pausa) / 1000;
}
function estFase(tipo, min){ const a = estAct(); a.fase = {tipo, ini: Date.now(), dur: min * 60, pausado: 0, pausa: null}; save(); }
function estTic(){
  const a = estAct(); if (!a || !a.fase) return;
  const r = estRestante(a), el = $("#estReloj");
  if (el) el.textContent = mmss(r);
  if (r <= 0 && !a.fase.pausa) {
    const tipo = a.fase.tipo; a.fase = null;
    estAviso();
    if (tipo === "leer") { const b = a.bloques.at(-1); b.fin = Date.now(); b.completo = true; a.paso = "recordar"; }
    else a.paso = "listo";
    save(); if (currentView === "estudio") renderEstudio();
  }
}
// Aviso al terminar un bloque o un descanso: sonido corto y vibración (si el teléfono lo permite).
function estAviso(){
  try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch(e) {}
  try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; const c = new C(), o = c.createOscillator(), g = c.createGain();
    o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.4); } catch(e) {}
  toast(estAct() && estAct().paso === "recordar" ? "⏰ Terminó el bloque: escribe lo que recuerdas" : "⏰ Terminó el descanso");
}
setInterval(() => { if (estAct()) estTic(); }, 1000);

// ---------- pantalla ----------
async function renderEstudio(){
  const box = $("#estBox"); if (!box) return;
  const a = estAct();
  if (!a) return renderEstInicio(box);
  estPantalla(!!a.fase);
  ({preparando: estPreparando, antes: estAntes, leer: estLeer, recordar: estRecordar, descanso: estDescanso, listo: estListo, cierre: estCierre})[a.paso](box, a);
}
// Mientras corre un bloque o un descanso, la pantalla no se apaga: así el aviso suena a tiempo.
let estLock = null;
async function estPantalla(on){
  try {
    if (on && !estLock && navigator.wakeLock && document.visibilityState === "visible") { estLock = await navigator.wakeLock.request("screen"); estLock.addEventListener("release", () => { estLock = null; }); }
    if (!on && estLock) { const l = estLock; estLock = null; await l.release(); }
  } catch(e) {}
}
document.addEventListener("visibilitychange", () => { const a = estAct(); if (document.visibilityState === "visible" && a && a.fase) estPantalla(true); });
function estCabecera(a, sub){
  return `<div class="row" style="gap:8px"><div style="min-width:0;flex:1"><div class="xs muted">Sesión de estudio · ${esc(sub)}</div><b style="overflow-wrap:anywhere">${esc(a.tema)}</b></div>
    <button class="btn ghost sm" id="estSalir">Terminar</button></div>`;
}
function estBindCab(box, a){ $("#estSalir").onclick = () => { a.paso = "cierre"; if (a.fase && a.fase.tipo === "leer") estCerrarBloque(a, false); a.fase = null; save(); renderEstudio(); }; }

// ---------- inicio ----------
async function renderEstInicio(box){
  const docs = S.sources.filter(s => s.kind !== "pack").slice().reverse(), r = estRitmo();
  const s = estNuevo.src && S.sources.find(x => x.id === estNuevo.src);
  if (s) { try { await getRec(s.id); if (!s.indice) await buildIndice(s); } catch(e) {} }   // el texto también dice si es un estudio original
  const items = s && s.indice ? s.indice.items : [];
  const ses = estD().ses;
  box.innerHTML = `
    <div class="card stack">
      <h3 style="font-size:16px">Nueva sesión</h3>
      <label class="fld">¿Qué vas a estudiar?<select id="estDoc"><option value="">Solo un tema (sin documento)</option>${docs.map(d => `<option value="${esc(d.id)}" ${estNuevo.src === d.id ? "selected" : ""}>${esc(d.title)}</option>`).join("")}</select></label>
      ${items.length ? `<label class="fld">Tema del documento<select id="estInd"><option value="-1">Todo el documento</option>${items.map((x, i) => `<option value="${i}" ${estNuevo.indice === i ? "selected" : ""}>${esc(x.title)} (${x.from === x.to ? `pág. ${x.from}` : `págs. ${x.from}–${x.to}`})</option>`).join("")}</select></label>` : ""}
      ${estEsPaper(s) ? `<div class="dupaviso repetida" role="note" id="estNotaPaper">🔬 Es un <b>estudio original</b> (${esc(DESIGNS[estDiseno(s)].replace(/^\S+\s/, ""))}). Los estudios se analizan en el <button class="linkbtn" data-go="mbe">laboratorio MBE</button>; aquí puedes leerlo con el reloj y tus propias preguntas, pero <b>sin IA</b>, para no gastar en algo que MBE hace mejor. <button class="linkbtn" id="estNoPaper">¿Es una revisión?</button></div>` : ""}
      ${!estEsPaper(s) && estNuevo.indice >= 0 && items[estNuevo.indice] && estSoloMetodos(items[estNuevo.indice].title) ? `<div class="dupaviso repetida" role="note" id="estNotaMet">⚠️ Elegiste solo <b>${esc(items[estNuevo.indice].title)}</b>: ahí no están los resultados y las preguntas saldrían de detalles sin valor. Mejor elige <b>Todo el documento</b> o los resultados.</div>` : ""}
      <label class="fld">Tema<input type="text" id="estTema" value="${esc(estNuevo.tema)}" placeholder="p. ej. Encefalitis autoinmune"></label>
      <div class="xs muted">Ritmo (pomodoro)</div>
      <div class="chips">${EST_RITMOS.map(x => `<button class="chip2${x.k === r.k ? " on" : ""}" data-ritmo="${x.k}">${x.k} · ${x.n}</button>`).join("")}</div>
      <p class="xs muted" style="margin:0">${r.t} min de lectura y ${r.d} de descanso; cada 4 bloques, un descanso de ${r.l}.</p>
      <div class="guiabox stack">
        <b class="small">🔎 Preguntas de búsqueda activa</b>
        <p class="xs muted" style="margin:0">${estEsPaper(s) ? "Escribe 3 a 5 preguntas que quieras responder al leer (p. ej. resultado principal, NNT, seguridad). Leerás buscándolas." : "Antes de leer recibes 5 o 6 preguntas sobre lo fundamental del tema. Lees buscando esas respuestas: tu cerebro queda enganchado a encontrarlas y retiene justo lo importante."}</p>
        ${estEsPaper(s) ? "" : getKey() ? `<label class="row check" style="gap:8px"><input type="checkbox" id="estGuiaIA" ${estNuevo.guiaIA ? "checked" : ""}><span class="small">Que la IA las diseñe${s ? " a partir de tu documento" : " sobre el tema"} (${aiEstimateLine(s ? 30000 : 500, {outTokens: 1500})})</span></label>` : `<p class="xs muted" style="margin:0">Con tu clave de API, la IA las diseña. Sin ella, escribe las tuyas:</p>`}
        ${plegable("estmias", `<span class="small">✍️ Escribir mis propias preguntas</span>`, `<textarea id="estMias" rows="4" placeholder="Una por línea. p. ej.\n¿Cuál es el criterio para sospecharla?\n¿Cuál es el tratamiento de primera línea?">${esc(estNuevo.mias)}</textarea>`, !getKey() || estEsPaper(s))}
      </div>
      <button class="btn primary block" id="estGo">▶ Empezar la sesión</button>
      <p class="xs" style="margin:0;color:var(--bad)" id="estErr"></p>
    </div>
    <div class="card">${plegable("estguia", `<b>📘 Cómo estudiar una revisión de tema</b>`, estGuiaHTML())}</div>
    <div class="card stack" id="estAnalisis">${estAnalisisHTML()}</div>
    ${ses.length ? `<div class="card">${plegable("estses", `<b>Tus sesiones</b> <span class="xs muted">${ses.length}</span>`, ses.slice().reverse().slice(0, 30).map(x => `<div class="qrow"><div style="flex:1;min-width:0"><b class="small" style="overflow-wrap:anywhere">${esc(x.tema)}</b>
      <div class="xs muted">${fmtDate(x.ini)} · ${x.min} min · ${x.completos}/${x.bloques} bloques · ${x.puntos} puntos${x.pre && x.post ? ` · pre ${x.pre.ok}/${x.pre.n} → post ${x.post.ok}/${x.post.n}` : ""}</div></div></div>`).join(""))}</div>` : ""}`;
  $("#estDoc").onchange = e => { estNuevo.src = e.target.value; estNuevo.indice = -1; const d = S.sources.find(x => x.id === estNuevo.src); if (d && !estNuevo.tema) estNuevo.tema = d.title; renderEstudio(); };
  $("#estInd") && ($("#estInd").onchange = e => { estNuevo.indice = +e.target.value; estNuevo.tema = estNuevo.indice >= 0 ? items[estNuevo.indice].title : (s ? s.title : estNuevo.tema); renderEstudio(); });
  $("#estTema").oninput = e => { estNuevo.tema = e.target.value; };
  $("#estNoPaper") && ($("#estNoPaper").onclick = () => { s.design = "REV"; save(); renderEstudio(); });
  $("#estGuiaIA") && ($("#estGuiaIA").onchange = e => { estNuevo.guiaIA = e.target.checked; });
  $("#estMias").oninput = e => { estNuevo.mias = e.target.value; };
  box.querySelectorAll("[data-ritmo]").forEach(b => b.onclick = () => { estD().cfg.ritmo = b.dataset.ritmo; save(); renderEstudio(); });
  $("#estGo").onclick = () => {
    const tema = $("#estTema").value.trim();
    if (!tema) return $("#estErr").textContent = "Escribe el tema que vas a estudiar.";
    const it = estNuevo.indice >= 0 ? items[estNuevo.indice] : null;
    estD().actual = {id: "e" + Date.now(), ini: Date.now(), tema, src: estNuevo.src || null, desde: it ? it.from : 1, hasta: it ? it.to : (s ? s.pages : 0),
      ritmo: r.k, paso: "antes", saber: "", pre: {ids: estCasos(tema, estNuevo.src), resp: {}}, post: {resp: {}}, bloques: [], plantilla: {}, auto: [], ia: null, fase: null,
      guia: estNuevo.mias.split("\n").map(x => x.replace(/^\s*(?:\d+[.)]|[-•*])\s*/, "").trim()).filter(Boolean).slice(0, 10).map(p => ({p, r: "", page: 0, propia: true, mia: "", auto: ""}))};
    const conIA = getKey() && estNuevo.guiaIA && !estEsPaper(s);
    estNuevo = {src: "", tema: "", indice: -1, guiaIA: true, mias: ""};
    if (conIA) { estD().actual.paso = "preparando"; save(); renderEstudio(); estGenGuia(estD().actual); }
    else { save(); renderEstudio(); }
  };
  estBindAnalisis();
}
function estGuiaHTML(){
  const g = typeof GUIA_REV !== "undefined" ? GUIA_REV : null; if (!g) return "";
  return `<p class="small" style="margin:6px 0">${esc(g.intro)}</p><ol class="small" style="margin:0;padding-left:18px">${g.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
    <p class="xs" style="margin:8px 0 0"><b>⚠️ Error típico:</b> ${esc(g.pitfall)}</p>`;
}

// ---------- 1. antes de leer ----------
function estAntes(box, a){
  const ids = a.pre.ids, hechas = Object.keys(a.pre.resp).length;
  if (ids.length && hechas < ids.length) return estQuiz(box, a, "pre");
  box.innerHTML = `<div class="card stack">${estCabecera(a, "antes de leer")}
    ${ids.length ? `<p class="small" style="margin:0">✓ Pre-test hecho (${hechas} casos). Verás cómo te fue al final, comparado con el post-test.</p>` : ""}
    ${a.guia.length ? `<div class="guiabox"><b class="small">🔎 Lee buscando la respuesta a estas preguntas</b>${estGuiaLista(a)}<p class="xs muted" style="margin:6px 0 0">Las tendrás a la vista mientras lees y las responderás de memoria al final de cada bloque.</p></div>` : ""}
    <label class="fld">¿Qué sabes ya de este tema? Escríbelo sin mirar nada (2 minutos).<textarea id="estSaber" rows="5" placeholder="Lo que recuerdes: definición, causas, cómo se presenta, cómo se trata…">${esc(a.saber)}</textarea></label>
    <p class="xs muted" style="margin:0">Recordar antes de leer activa lo que ya sabes y te muestra qué buscar en el texto.</p>
    <button class="btn primary block" id="estLeer">▶ Empezar a leer · bloque de ${estRitmo().t} min</button></div>`;
  estBindCab(box, a);
  $("#estSaber").oninput = e => { a.saber = e.target.value; save(); };
  $("#estLeer").onclick = () => estNuevoBloque(a);
}
function estNuevoBloque(a){
  const r = EST_RITMOS.find(x => x.k === a.ritmo) || estRitmo();
  a.bloques.push({ini: Date.now(), fin: null, completo: false, recuerdo: "", auto: ""});
  a.paso = "leer"; estFase("leer", r.t); renderEstudio();
}
// Pre-test y post-test: los mismos casos. En el pre-test no se muestra la respuesta (sería una pista).
function estQuiz(box, a, cual){
  const ids = a.pre.ids, resp = a[cual].resp, i = ids.findIndex(id => resp[id] === undefined), q = qById(ids[i]);
  if (!q) { ids.forEach(id => { if (resp[id] === undefined) resp[id] = -1; }); save(); return renderEstudio(); }
  box.innerHTML = `<div class="card stack">${estCabecera(a, cual === "pre" ? "pre-test" : "post-test")}
    <p class="xs muted" style="margin:0">${cual === "pre" ? `Pre-test: ${ids.length} casos del banco sobre este tema. Responde lo que puedas; las respuestas las verás al final.` : `Post-test: los mismos casos del inicio. Ahora sí verás cómo te fue.`} · ${i + 1} de ${ids.length}</p>
    <p class="vignette" style="margin:4px 0">${q.vignette}</p>
    <div id="opts">${q.options.map((o, j) => `<div class="optrow"><button class="opt" data-eo="${j}"><span class="l">${"ABCDE"[j]}</span><span>${esc(o)}</span></button></div>`).join("")}</div>
    ${cual === "pre" ? `<button class="linkbtn xs" id="estSaltar" style="align-self:flex-start">Saltar el pre-test</button>` : ""}</div>`;
  estBindCab(box, a);
  box.querySelectorAll("[data-eo]").forEach(b => b.onclick = () => {
    resp[q.id] = +b.dataset.eo;
    if (cual === "post") { const ok = +b.dataset.eo === q.correct; grade("q" + q.id, ok ? 2 : 0); const l = logToday(); l.q++; if (ok) l.ok++; registrarRespuesta(q, +b.dataset.eo, ok, false); }
    save(); renderEstudio(); });
  $("#estSaltar") && ($("#estSaltar").onclick = () => { a.pre = {ids: [], resp: {}}; save(); renderEstudio(); });   // sin pre-test no hay post-test
}

// ---------- 2. leer ----------
function estLeer(box, a){
  const n = a.bloques.length, src = a.src && S.sources.find(x => x.id === a.src), pdf = src && src.kind === "pdf";
  box.innerHTML = `<div class="card stack">${estCabecera(a, `bloque ${n} · lectura`)}
    <div class="reloj"><span id="estReloj">${mmss(estRestante(a))}</span><small>${a.fase && a.fase.pausa ? "en pausa" : "leyendo"}</small></div>
    <div class="row" style="gap:6px;justify-content:center"><button class="btn sm" id="estPausa">${a.fase && a.fase.pausa ? "▶ Seguir" : "⏸ Pausa"}</button><button class="btn sm" id="estFin">Terminé el bloque</button></div>
    ${src ? `<div class="row" style="gap:6px;justify-content:center">${pdf ? `<button class="btn sm ghost" id="estPdf">📄 Abrir el PDF${a.desde ? ` (pág. ${a.desde})` : ""}</button>` : ""}<button class="btn sm ghost" id="estApp">📖 Leer en la app</button></div>` : ""}
    <p class="xs muted" style="margin:0;text-align:center">Lee con un objetivo: llena la plantilla con tus palabras. Al terminar el bloque escribirás de memoria lo más importante.</p>
    <p class="xs muted" style="margin:0;text-align:center">📵 La pantalla se queda encendida para avisarte al terminar. Deja el celular boca abajo y lee en papel o en el computador.</p></div>
    ${a.guia.length ? `<div class="card">${plegable("estbusca", `<b>🔎 Lo que estás buscando</b> <span class="xs muted">${a.guia.length} preguntas</span>`, estGuiaLista(a), true)}</div>` : ""}
    <div class="card">${plegable("estplant", `<b>📝 Plantilla de lectura: qué extraer</b>`, `<div class="stack" style="gap:6px;margin-top:6px">${EST_PLANTILLA.map(([k, t, d]) => `<label class="fld">${t}<textarea rows="2" data-pl="${k}" placeholder="${esc(d)}">${esc(a.plantilla[k] || "")}</textarea></label>`).join("")}</div>`, true)}</div>`;
  estBindCab(box, a);
  $("#estPausa").onclick = () => { const f = a.fase; if (!f) return; if (f.pausa) { f.pausado += Date.now() - f.pausa; f.pausa = null; } else { f.pausa = Date.now(); a.bloques.at(-1).pausas = (a.bloques.at(-1).pausas || 0) + 1; } save(); renderEstudio(); };
  $("#estFin").onclick = () => { estCerrarBloque(a, estRestante(a) <= 60); a.fase = null; a.paso = "recordar"; save(); renderEstudio(); };
  $("#estPdf") && ($("#estPdf").onclick = () => openPdf(a.src, a.desde || 1));
  $("#estApp") && ($("#estApp").onclick = () => { prepSrc(a.src, {tab: "read", rdPage: a.desde || 1}); go("src"); toast("El reloj sigue corriendo: vuelve a 🧠 Estudio cuando termine el bloque."); });
  box.querySelectorAll("[data-pl]").forEach(t => t.oninput = () => { a.plantilla[t.dataset.pl] = t.value; save(); });
}
function estCerrarBloque(a, completo){ const b = a.bloques.at(-1); if (b && !b.fin) { b.fin = Date.now(); b.completo = completo; } }

// ---------- 3. recuerdo activo ----------
function estRecordar(box, a){
  const b = a.bloques.at(-1), clave = !!getKey(), src = a.src && S.sources.find(x => x.id === a.src);
  const comparando = !!b.comparar;
  box.innerHTML = `<div class="card stack">${estCabecera(a, `bloque ${a.bloques.length} · recuerdo activo`)}
    <p class="small" style="margin:0"><b>Sin mirar el documento</b>, escribe de memoria los 3 a 5 puntos más importantes del bloque. Uno por línea; si es un dato, usa «→» (p. ej. «Pleocitosis → > 5/μl»).</p>
    <textarea id="estRec" rows="6" ${comparando ? "readonly" : ""} placeholder="1. …">${esc(b.recuerdo)}</textarea>
    ${a.guia.length ? `<div class="guiabox stack"><b class="small">🔎 Tus preguntas: respóndelas de memoria (las que puedas)</b>${a.guia.map((g, i) => `<label class="fld">${i + 1}. ${esc(g.p)}<textarea rows="2" data-gm="${i}" placeholder="Tu respuesta, sin mirar">${esc(g.mia)}</textarea></label>`).join("")}</div>` : ""}
    ${comparando ? `<div class="note" style="margin:0"><b>Ahora compara:</b> abre el documento y revisa qué faltó o quedó mal. Lo que no recordaste es justo lo que debes repasar.</div>
      <div class="xs muted">¿Cuánto recordaste del bloque?</div>
      <div class="chips">${EST_AUTO.map(([k, t]) => `<button class="chip2${b.auto === k ? " on" : ""}" data-auto="${k}">${t}</button>`).join("")}</div>
      ${a.ia ? plegable("estia", `<b>🤖 Revisión de la IA para comparar</b>`, estIaHTML(a.ia)) : clave && src && !estEsPaper(src) ? `<button class="btn sm ghost" id="estIA">🤖 Comparar con una revisión de la IA (${aiEstimateLine(4000, {outTokens: 2500})})</button>` : ""}
      <div class="row" style="gap:6px"><button class="btn primary" id="estDesc">☕ Descanso</button><button class="btn" id="estOtro">Otro bloque sin descanso</button><button class="btn ghost" id="estCerrar">Terminar la sesión</button></div>`
      : `<button class="btn primary block" id="estComp">Listo: comparar con el documento</button>`}
    <div id="estIAMsg" class="small"></div></div>`;
  estBindCab(box, a);
  $("#estRec").oninput = e => { b.recuerdo = e.target.value; save(); };
  box.querySelectorAll("[data-gm]").forEach(t => t.oninput = () => { a.guia[+t.dataset.gm].mia = t.value; save(); });
  $("#estComp") && ($("#estComp").onclick = () => { if (!b.recuerdo.trim()) return toast("Escribe al menos un punto de memoria antes de comparar."); b.comparar = true; save(); renderEstudio(); });
  box.querySelectorAll("[data-auto]").forEach(x => x.onclick = () => { b.auto = x.dataset.auto; save(); renderEstudio(); });
  $("#estDesc") && ($("#estDesc").onclick = () => { const r = EST_RITMOS.find(x => x.k === a.ritmo) || estRitmo(), largo = a.bloques.length % 4 === 0; a.paso = "descanso"; estFase("descanso", largo ? r.l : r.d); renderEstudio(); });
  $("#estOtro") && ($("#estOtro").onclick = () => estNuevoBloque(a));
  $("#estCerrar") && ($("#estCerrar").onclick = () => { a.paso = "cierre"; save(); renderEstudio(); });
  $("#estIA") && ($("#estIA").onclick = () => estRevisionIA(a));
}
// La «Revisión de tema» con IA ahora vive aquí: se muestra solo después de recordar, para comparar.
async function estRevisionIA(a){
  const s = S.sources.find(x => x.id === a.src), bt = $("#estIA"); if (!s || estEsPaper(s)) return;
  bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Leyendo el documento…`;
  try {
    await getRec(s.id); const info = docInfo(s.id);
    const nums = []; for (let p = a.desde || 1; p <= (a.hasta || s.pages); p++) if (info.pages[p - 1]) nums.push(p);
    const texto = nums.map(p => `[pág. ${p}]\n${info.pages[p - 1]}`).join("\n\n").slice(0, AN_MAX_CHARS);
    const r = await callForTool({system: AN_SHARED_SYSTEM + focusLine(), tools: [AN_TOOLS.tema], label: "Revisión de tema",
      user: [{type: "text", text: `<documento titulo="${s.title.replace(/"/g, "'")}">\n${texto}\n</documento>`, cache_control: {type: "ephemeral"}},
             {type: "text", text: `Tarea: ${AN_KINDS.tema.name}. Analiza: ${a.tema}. Entrega el resultado llamando a la herramienta ${AN_TOOLS.tema.name}.`}]}, AN_TOOLS.tema.name);
    a.ia = anClean("tema", r); PLEG.estia = true; save(); renderEstudio();
  } catch(e) { $("#estIAMsg").innerHTML = `<span style="color:var(--bad)">${esc(e.userMsg || e.message)}</span>`; bt.disabled = false; bt.textContent = "🤖 Comparar con una revisión de la IA"; }
}
function estIaHTML(d){
  const li = x => `<li>${esc(x.text)}${x.page ? ` <span class="xs muted">(pág. ${x.page})</span>` : ""}</li>`;
  return `<div class="small stack" style="gap:6px;margin-top:6px">${d.pathophys && d.pathophys.text ? `<div><b>🧬 Fisiopatología:</b> ${esc(d.pathophys.text)}</div>` : ""}
    ${d.typical.length ? `<div><b>🩺 Cuadro típico</b><ul>${d.typical.map(li).join("")}</ul></div>` : ""}
    ${d.redFlags.length ? `<div><b>🚩 Banderas rojas</b><ul>${d.redFlags.map(li).join("")}</ul></div>` : ""}
    ${d.algorithm.length ? `<div><b>🧭 Algoritmo</b><ol>${d.algorithm.map(x => `<li>${x.step ? `<b>${esc(x.step)}:</b> ` : ""}${esc(x.text)}</li>`).join("")}</ol></div>` : ""}
    ${d.differentials.length ? `<div><b>🔀 Diferenciales</b><ul>${d.differentials.map(x => `<li><b>${esc(x.entity)}</b>: ${esc(x.clue)}</li>`).join("")}</ul></div>` : ""}
    ${d.pearls.length ? `<div><b>💎 Perlas</b><ul>${d.pearls.map(li).join("")}</ul></div>` : ""}
    <p class="xs muted" style="margin:0">Generado con IA a partir del documento: verifica en la página citada.</p></div>`;
}

// ---------- descanso ----------
function estDescanso(box, a){
  box.innerHTML = `<div class="card stack">${estCabecera(a, "descanso")}
    <div class="reloj descanso"><span id="estReloj">${mmss(estRestante(a))}</span><small>descanso</small></div>
    <p class="small" style="margin:0;text-align:center">Levántate, toma agua y mira lejos. Nada de pantallas: el descanso también consolida lo que leíste.</p>
    <button class="btn block" id="estSaltar">Saltar el descanso · empezar el bloque ${a.bloques.length + 1}</button></div>`;
  estBindCab(box, a);
  $("#estSaltar").onclick = () => { a.fase = null; estNuevoBloque(a); };
}
function estListo(box, a){
  box.innerHTML = `<div class="card stack">${estCabecera(a, "descanso terminado")}
    <p class="small" style="margin:0;text-align:center">Terminó el descanso. ¿Seguimos?</p>
    <button class="btn primary block" id="estOtro">▶ Empezar el bloque ${a.bloques.length + 1}</button>
    <button class="btn ghost block" id="estCerrar">Terminar la sesión</button></div>`;
  estBindCab(box, a);
  $("#estOtro").onclick = () => estNuevoBloque(a);
  $("#estCerrar").onclick = () => { a.paso = "cierre"; save(); renderEstudio(); };
}

// ---------- 4. cierre ----------
const estPuntos = a => a.bloques.flatMap(b => String(b.recuerdo || "").split("\n").map(l => l.replace(/^\s*(?:\d+[.)]|[-•*])\s*/, "").trim()).filter(Boolean));
function estResumen(a){
  const min = Math.round(a.bloques.reduce((s, b) => s + ((b.fin || Date.now()) - b.ini) / 6e4, 0));
  const pre = a.pre.ids.length ? {n: a.pre.ids.length, ok: a.pre.ids.filter(id => { const q = qById(id); return q && a.pre.resp[id] === q.correct; }).length} : null;
  const postN = Object.keys(a.post.resp).length;
  const post = postN ? {n: postN, ok: a.pre.ids.filter(id => { const q = qById(id); return q && a.post.resp[id] === q.correct; }).length} : null;
  return {min, pre, post, puntos: estPuntos(a).length, completos: a.bloques.filter(b => b.completo).length};
}
function estCierre(box, a){
  if (a.postHaciendo && a.pre.ids.length && Object.keys(a.post.resp).length < a.pre.ids.length) return estQuiz(box, a, "post");
  const r = estResumen(a), pts = estPuntos(a);
  const tabla = r.post ? `<div class="stack" style="gap:4px">${a.pre.ids.map((id, i) => { const q = qById(id); if (!q) return ""; const p = a.pre.resp[id] === q.correct, s = a.post.resp[id] === q.correct;
      return `<div class="xs">${i + 1}. ${esc(q.topic || "Caso")}: antes ${p ? "✅" : "❌"} · después ${s ? "✅" : "❌"}${!s ? ` · correcta: <b>${esc(q.options[q.correct])}</b>` : ""}</div>`; }).join("")}</div>` : "";
  box.innerHTML = `<div class="card stack">
    <div class="xs muted">Sesión de estudio · cierre</div><b style="overflow-wrap:anywhere">${esc(a.tema)}</b>
    <div class="grid3"><div class="kpi"><b>${r.min}</b><span>min de lectura</span></div><div class="kpi"><b>${r.completos}/${a.bloques.length}</b><span>bloques completos</span></div><div class="kpi"><b>${r.puntos}</b><span>puntos recordados</span></div></div>
    ${r.pre && r.post ? `<div class="note pearl" style="margin:0"><b>Pre-test ${r.pre.ok}/${r.pre.n} → post-test ${r.post.ok}/${r.post.n}</b>${r.post.ok > r.pre.ok ? " · mejoraste en esta sesión." : r.post.ok === r.pre.ok ? " · sin cambio: repasa lo que fallaste." : ""}${tabla}<div class="xs muted" style="margin-top:4px">Lo que fallaste en el post-test vuelve en tu repaso.</div></div>`
      : a.pre.ids.length ? `<button class="btn" id="estPost">📝 Hacer el post-test (${a.pre.ids.length} casos) y ver cuánto mejoraste</button>` : ""}
    ${a.guia.length ? `<div class="guiabox stack"><b class="small">🔎 Tus preguntas de búsqueda activa</b>
      <p class="xs muted" style="margin:0">Mira la respuesta y marca si la tenías. Lo que no tenías es lo primero que debes repasar.</p>
      ${a.guia.map((g, i) => `<div class="gcierre"><b class="small">${i + 1}. ${esc(g.p)}</b>
        <div class="xs" style="margin-top:4px"><span class="muted">Tu respuesta:</span> ${g.mia.trim() ? esc(g.mia) : "<i class=\"muted\">(no la respondiste)</i>"}</div>
        ${g.r ? plegable("gr" + i, `<span class="xs">Ver la respuesta${g.page ? ` (pág. ${g.page})` : ""}</span>`, `<div class="small" style="margin-top:4px">${esc(g.r)}</div>${g.fuente === "ia" ? `<div class="xs muted">Respuesta de la IA sin documento: verifícala en tu fuente.</div>` : ""}`) : `<div class="xs muted">Búscala en tu fuente para comprobarla.</div>`}
        <div class="chips" style="margin-top:6px">${[["si", "✓ La tenía"], ["medio", "~ A medias"], ["no", "✗ No la tenía"]].map(([k, t]) => `<button class="chip2${g.auto === k ? " on" : ""}" data-ga="${i}:${k}">${t}</button>`).join("")}</div></div>`).join("")}
      ${a.guia.some(g => g.r) ? `<button class="btn" id="estFichaGuia">💎 Ficha con las preguntas y sus respuestas</button><div id="estFichaGuiaBox"></div>` : ""}</div>` : ""}
    ${pts.length ? `<button class="btn" id="estFicha">💎 Convertir mis ${pts.length} puntos en una ficha</button><div id="estFichaBox"></div>` : `<p class="xs muted" style="margin:0">No escribiste puntos de memoria: en la próxima sesión, el recuerdo activo es lo que más fija lo leído.</p>`}
    <button class="btn primary block" id="estGuardar">✓ Terminar y guardar la sesión</button>
    <button class="linkbtn xs" id="estDescartar" style="align-self:center;color:var(--bad)">Descartar esta sesión</button></div>`;
  $("#estPost") && ($("#estPost").onclick = () => { a.postHaciendo = true; save(); renderEstudio(); });
  box.querySelectorAll("[data-ga]").forEach(b => b.onclick = () => { const [i, k] = b.dataset.ga.split(":"); a.guia[+i].auto = k; save(); renderEstudio(); });
  $("#estFichaGuia") && ($("#estFichaGuia").onclick = () => {
    const src = a.src && S.sources.find(x => x.id === a.src), rows = a.guia.filter(g => g.r).slice(0, 8).map(g => ({label: g.p, val: g.r}));
    hyEditor($("#estFichaGuiaBox"), {title: a.tema + " · preguntas clave", rows, spec: (src && src.spec) || "Medicina Interna", src: a.src, page: (a.guia.find(g => g.page) || {}).page || a.desde || 0,
      heading: "💎 Ficha de preguntas clave · revísala y guárdala", flags: {manual: true, ai: a.guia.some(g => g.fuente)}, onSave: () => { a.ficha = true; save(); toast("Ficha guardada: las preguntas vuelven en tu repaso."); renderEstudio(); }, onCancel: () => {}});
  });
  $("#estFicha") && ($("#estFicha").onclick = () => {
    const rows = pts.map((p, i) => { const parts = p.split(AP_SEP).filter(Boolean); return parts.length >= 2 ? {label: parts[0], val: parts.slice(1).join(" → ")} : {label: `Punto ${i + 1}`, val: p}; }).slice(0, 8);
    const src = a.src && S.sources.find(x => x.id === a.src);
    hyEditor($("#estFichaBox"), {title: a.tema, rows, spec: (src && src.spec) || "Medicina Interna", src: a.src, page: a.desde || 0, heading: "💎 Ficha con lo que recordaste · revísala y guárdala",
      flags: {manual: true}, onSave: () => { a.ficha = true; save(); toast("Ficha guardada: entra a tu repaso espaciado."); renderEstudio(); }, onCancel: () => {}});
  });
  $("#estGuardar").onclick = () => {
    const ses = Object.assign({id: a.id, tema: a.tema, src: a.src, ini: a.ini, fin: Date.now(), ritmo: a.ritmo, hora: new Date(a.ini).getHours(), bloques: a.bloques.length,
      pausas: a.bloques.reduce((s, b) => s + (b.pausas || 0), 0), auto: a.bloques.map(b => b.auto).filter(Boolean), saber: !!a.saber.trim(), plantilla: Object.values(a.plantilla).filter(x => x && x.trim()).length,
      ficha: !!a.ficha, ia: !!a.ia, guia: a.guia.length ? {n: a.guia.length, respondidas: a.guia.filter(g => g.mia.trim()).length, si: a.guia.filter(g => g.auto === "si").length, medio: a.guia.filter(g => g.auto === "medio").length, no: a.guia.filter(g => g.auto === "no").length, ia: a.guia.some(g => g.fuente)} : null}, r);
    estD().ses.push(ses); if (estD().ses.length > 300) estD().ses.splice(0, estD().ses.length - 300);
    logToday().sec += r.min * 60;
    estD().actual = null; save(); refreshChips(); toast("Sesión guardada ✓"); renderEstudio();
  };
  $("#estDescartar").onclick = () => { if (!confirm("¿Descartar esta sesión? No quedará en tu historial.")) return; estD().actual = null; save(); renderEstudio(); };
}

// ---------- 📊 cómo estudias ----------
function estMetricas(){
  const D = estD(), ahora = Date.now(), dias = n => ahora - n * DAY;
  const ses30 = D.ses.filter(s => s.ini >= dias(30)), ses7 = ses30.filter(s => s.ini >= dias(7));
  const bloques = ses30.reduce((a, s) => a + s.bloques, 0), completos = ses30.reduce((a, s) => a + s.completos, 0);
  const conPrePost = ses30.filter(s => s.pre && s.post);
  const mejora = conPrePost.length ? conPrePost.reduce((a, s) => a + (s.post.ok / s.post.n - s.pre.ok / s.pre.n), 0) / conPrePost.length : null;
  const horas = ses30.map(s => s.hora), franja = h => h < 12 ? "mañana" : h < 19 ? "tarde" : "noche";
  const fr = {}; horas.forEach(h => fr[franja(h)] = (fr[franja(h)] || 0) + 1);
  const auto = {}; ses30.forEach(s => (s.auto || []).forEach(k => auto[k] = (auto[k] || 0) + 1));
  const log = Object.entries(S.log).filter(([k]) => new Date(k).getTime() >= dias(30));
  // Días con estudio: los del registro diario y los días con una sesión de estudio.
  const diasCon = n => new Set([...Object.entries(S.log).filter(([k, l]) => new Date(k).getTime() >= dias(n) && (l.sec > 0 || l.q > 0)).map(([k]) => k),
    ...D.ses.filter(s => s.ini >= dias(n)).map(s => todayKey(new Date(s.ini)))]).size;
  const diasActivos7 = diasCon(7);
  const rd = rendimiento([]), q30 = (S.resp || []).filter(r => r.d >= dias(30));
  return {
    sesiones7: ses7.length, sesiones30: ses30.length, minLectura30: ses30.reduce((a, s) => a + s.min, 0),
    bloques30: bloques, bloquesCompletosPct: bloques ? Math.round(completos / bloques * 100) : null, pausasPorBloque: bloques ? +(ses30.reduce((a, s) => a + (s.pausas || 0), 0) / bloques).toFixed(1) : null,
    puntosPorBloque: bloques ? +(ses30.reduce((a, s) => a + s.puntos, 0) / bloques).toFixed(1) : null, recuerdoAutoevaluado: auto,
    sesionesConPrePost: conPrePost.length, mejoraPrePostPuntos: mejora == null ? null : Math.round(mejora * 100),
    sesionesConFicha: ses30.filter(s => s.ficha).length,
    preguntasBusqueda: (g => g.length ? {sesiones: g.length, preguntas: g.reduce((a, x) => a + x.n, 0), respondidasDeMemoria: g.reduce((a, x) => a + x.respondidas, 0), lasTenia: g.reduce((a, x) => a + x.si, 0), aMedias: g.reduce((a, x) => a + x.medio, 0), noLasTenia: g.reduce((a, x) => a + x.no, 0)} : null)(ses30.filter(s => s.guia).map(s => s.guia)), sesionesConQueSabes: ses30.filter(s => s.saber).length, franjaHoraria: fr, ritmos: ses30.reduce((o, s) => (o[s.ritmo] = (o[s.ritmo] || 0) + 1, o), {}),
    temas30: [...new Set(ses30.map(s => s.tema))].slice(0, 20),
    diasActivos7, diasActivos30: diasCon(30), minutosTotales30: Math.round(log.reduce((a, [, l]) => a + (l.sec || 0), 0) / 60),
    racha: streak(), repasosPendientes: dueKeys().length,
    preguntas30: q30.length, acierto30: q30.length ? Math.round(q30.filter(r => r.ok).length / q30.length * 100) : null,
    focosDebiles: rd.focos.map(f => `${QMETODO[f.tipo].t.replace(/^\S+\s/, "")} en ${f.spec}: ${f.ok}/${f.n}`),
    fallosRepetidos: rd.repetidos.length, motivosFallo: rd.mot, aciertosFragiles: rd.audN.fragil, erroresConSeguridad: rd.audN.peligro,
    fichas: HYS.length, fichasPropias: (S.userH || []).length, simulacros30: S.sims.filter(s => s.d >= dias(30)).map(s => Math.round(s.ok / s.n * 100))
  };
}
// Consejos sin IA: reglas simples sobre las mismas cifras, cada uno con su herramienta.
function estConsejos(m){
  const c = [];
  if (!m.sesiones30) c.push(["Haz tu primera sesión de estudio: pre-test, lectura por bloques y recuerdo activo.", null]);
  if (m.bloques30 >= 3 && m.bloquesCompletosPct < 60) c.push([`Terminas el ${m.bloquesCompletosPct} % de los bloques. Prueba el ritmo 15/3: bloques cortos que sí terminas valen más que largos interrumpidos.`, "ritmo:15/3"]);
  if (m.bloques30 >= 3 && m.puntosPorBloque < 3) c.push([`Recuerdas ${String(m.puntosPorBloque).replace(".", ",")} puntos por bloque. Lee menos páginas por bloque y escribe antes de mirar: el esfuerzo de recordar es lo que fija.`, null]);
  if (m.sesionesConPrePost >= 2 && m.mejoraPrePostPuntos <= 0) c.push(["Tu post-test no mejora frente al pre-test: dedica el último bloque a preguntas del tema en vez de seguir leyendo.", "banco"]);
  if (m.repasosPendientes > 30) c.push([`Tienes ${m.repasosPendientes} repasos acumulados: antes de leer temas nuevos, ponte al día.`, "hoy"]);
  if (m.diasActivos7 < 3) c.push([`Estudiaste ${m.diasActivos7} día${m.diasActivos7 === 1 ? "" : "s"} esta semana. Es mejor 25 minutos diarios que 3 horas un solo día.`, null]);
  if (m.focosDebiles.length) c.push([`Tu punto más débil: ${m.focosDebiles[0]}. Practica tus vulnerabilidades.`, "banco"]);
  if (m.erroresConSeguridad) c.push([`${m.erroresConSeguridad} errores cometidos con seguridad: son conceptos mal aprendidos; estúdialos en una sesión.`, "banco"]);
  if (m.sesiones30 >= 2 && m.sesionesConFicha === 0) c.push(["No conviertes tus puntos en fichas: sin ficha, lo que recordaste no entra al repaso espaciado.", null]);
  return c;
}
const EST_HERRAMIENTAS = {sesion_estudio: ["🧠 Nueva sesión", "estudio"], pomodoro_corto: ["Ritmo 15/3", "ritmo:15/3"], pomodoro_largo: ["Ritmo 50/10", "ritmo:50/10"],
  banco_vulnerabilidades: ["🎯 Mis vulnerabilidades", "banco"], modo_examen: ["⏱️ Modo examen", "examen"], repasos: ["🔁 Repasos de Hoy", "hoy"],
  high_yield: ["💎 Fichas high-yield", "tarjetas"], editar_caso: ["✏️ Editar un caso", "new"], recomendaciones_guia: ["⚡ Recomendaciones de tus guías", "lib"], ninguna: ["", ""]};
const estBoton = (accion, txt) => accion ? `<button class="btn sm" data-esth="${esc(accion)}">${esc(txt || "Ir")}</button>` : "";
function estAnalisisHTML(){
  const m = estMetricas(), cons = estConsejos(m), inf = (estD().informes || []).at(-1), clave = !!getKey();
  const datos = m.sesiones30 + m.preguntas30;
  return `<h3 style="font-size:16px">📊 Cómo estudias</h3>
    <div class="grid3"><div class="kpi"><b>${m.sesiones7}</b><span>sesiones esta semana</span></div><div class="kpi"><b>${m.bloquesCompletosPct == null ? "—" : m.bloquesCompletosPct + "%"}</b><span>bloques completos</span></div><div class="kpi"><b>${m.mejoraPrePostPuntos == null ? "—" : (m.mejoraPrePostPuntos > 0 ? "+" : "") + m.mejoraPrePostPuntos}</b><span>mejora pre→post</span></div></div>
    ${cons.length ? `<div class="stack" style="gap:6px">${cons.slice(0, 4).map(([t, a]) => `<div class="consejo small"><span>${esc(t)}</span>${a ? estBoton(a, a.startsWith("ritmo") ? "Usar " + a.split(":")[1] : a === "hoy" ? "Ir a Hoy" : "Ir al banco") : ""}</div>`).join("")}</div>` : ""}
    <div class="aibox stack">
      <b class="small">🤖 Análisis detallado con IA</b>
      <p class="xs muted" style="margin:0">La IA revisa tus cifras de estudio (sesiones, bloques, recuerdo, pre y post-test, aciertos, vulnerabilidades, repasos) y te dice qué está funcionando, qué no y qué hacer esta semana. Solo se envían cifras: ni tus apuntes ni tus documentos.</p>
      <button class="btn primary" id="estInforme" ${clave && datos >= 3 ? "" : "disabled"}>🤖 Analizar cómo estudio</button>
      ${!clave ? `<p class="xs muted" style="margin:0">Requiere tu clave de API de Claude. <button class="linkbtn" data-go="guide">Cómo conseguirla</button></p>` : datos < 3 ? `<p class="xs muted" style="margin:0">Haz al menos una sesión o responde unos casos para tener qué analizar.</p>` : `<p class="xs muted" style="margin:0">Costo aprox. ${aiEstimateLine(6000, {outTokens: 2500})}.</p>`}
      <div id="estInfMsg" class="small"></div>
    </div>
    ${inf ? estInformeHTML(inf) : ""}`;
}
function estInformeHTML(inf){
  const d = inf.data;
  return `<div class="informe stack">
    <div class="xs muted">Informe del ${fmtDate(inf.at)}</div>
    <p class="small" style="margin:0"><b>${esc(d.resumen)}</b></p>
    ${d.fortalezas.length ? `<div><b class="small">✅ Lo que está funcionando</b><ul class="small">${d.fortalezas.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
    ${d.problemas.length ? `<div><b class="small">⚠️ Lo que te está frenando</b><ul class="small">${d.problemas.map(x => `<li><b>${esc(x.titulo)}</b> — ${esc(x.evidencia)}</li>`).join("")}</ul></div>` : ""}
    ${d.recomendaciones.length ? `<div class="stack" style="gap:6px"><b class="small">🛠️ Qué hacer</b>${d.recomendaciones.map(x => { const h = EST_HERRAMIENTAS[x.herramienta] || EST_HERRAMIENTAS.ninguna;
        return `<div class="consejo small"><span><b>${esc(x.accion)}</b><br><span class="xs muted">${esc(x.porque)}</span></span>${estBoton(h[1], h[0])}</div>`; }).join("")}</div>` : ""}
    ${d.plan.length ? plegable("estplan", `<b class="small">🗓️ Plan para esta semana</b>`, `<ul class="small">${d.plan.map(x => `<li><b>${esc(x.dia)}:</b> ${esc(x.tarea)}</li>`).join("")}</ul>`) : ""}
    <p class="xs muted" style="margin:0">Generado con IA a partir de tus cifras: es una guía, no un diagnóstico.</p></div>`;
}
function estBindAnalisis(){
  document.querySelectorAll("[data-esth]").forEach(b => b.onclick = () => { const a = b.dataset.esth;
    if (a.startsWith("ritmo:")) { estD().cfg.ritmo = a.split(":")[1]; save(); toast("Ritmo " + a.split(":")[1] + " para tus próximas sesiones"); return renderEstudio(); }
    if (a === "banco") { prac().modo = "vuln"; save(); }
    if (a === "examen") { prac().examen = true; save(); return go("banco"); }
    if (a === "new") newType = "e";
    if (a === "estudio") { window.scrollTo(0, 0); return; }
    go(a); });
  $("#estInforme") && ($("#estInforme").onclick = estInformeIA);
}
const T_INFORME = {name: "report_estudio", description: "Entrega el análisis de cómo estudia el médico.", strict: true,
  input_schema: {type: "object", additionalProperties: false, required: ["resumen", "fortalezas", "problemas", "recomendaciones", "plan"], properties: {
    resumen: {type: "string"}, fortalezas: {type: "array", items: {type: "string"}},
    problemas: {type: "array", items: {type: "object", additionalProperties: false, required: ["titulo", "evidencia"], properties: {titulo: {type: "string"}, evidencia: {type: "string"}}}},
    recomendaciones: {type: "array", items: {type: "object", additionalProperties: false, required: ["accion", "porque", "herramienta"], properties: {
      accion: {type: "string"}, porque: {type: "string"}, herramienta: {type: "string", enum: Object.keys(EST_HERRAMIENTAS)}}}},
    plan: {type: "array", items: {type: "object", additionalProperties: false, required: ["dia", "tarea"], properties: {dia: {type: "string"}, tarea: {type: "string"}}}}}}};
async function estInformeIA(){
  const bt = $("#estInforme"), m = estMetricas();
  bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Analizando…`;
  try {
    const r = await callForTool({system: `Eres un experto en ciencia del aprendizaje y en preparación del examen de residencia médica. Analizas las cifras de estudio de un médico y le dices, con franqueza y sin halagos, qué está funcionando, qué lo frena y qué hacer.
Reglas:
- Usa solo las cifras recibidas y cítalas en la evidencia («terminas el 45 % de los bloques»). No inventes datos. Si hay pocos datos para concluir algo, dilo.
- Fundamenta en lo que tiene evidencia: recuerdo activo (testing effect), pre-preguntas o búsqueda activa (leer buscando respuestas), repaso espaciado, práctica intercalada, bloques con descanso, calibración de la confianza (aciertos frágiles y errores con seguridad), y priorizar las vulnerabilidades.
- "problemas": de 1 a 4, los que más pesan. "fortalezas": de 0 a 3, solo si las cifras las respaldan.
- "recomendaciones": de 2 a 5 acciones concretas para esta semana, cada una con la herramienta de MediPulse que la hace posible ("herramienta"; "ninguna" si no aplica).
- "plan": de 3 a 7 días con una tarea corta y realista cada uno.
- "resumen": una o dos frases directas.
Español neutro, sin markdown.${focusLine()}`,
      tools: [T_INFORME], label: "Análisis de estudio", user: `Cifras de estudio de los últimos 30 días (JSON):\n${JSON.stringify(m, null, 1)}`}, "report_estudio");
    const limpio = {resumen: String(r.resumen || ""), fortalezas: (r.fortalezas || []).map(String).slice(0, 3), problemas: (r.problemas || []).filter(x => x && x.titulo).slice(0, 4),
      recomendaciones: (r.recomendaciones || []).filter(x => x && x.accion).slice(0, 5), plan: (r.plan || []).filter(x => x && x.tarea).slice(0, 7)};
    const D = estD(); D.informes = D.informes || []; D.informes.push({at: Date.now(), data: limpio}); if (D.informes.length > 20) D.informes.shift();
    save(); renderEstudio();
  } catch(e) { $("#estInfMsg").innerHTML = `<span style="color:var(--bad)">${esc(e.userMsg || e.message)}</span>`; bt.disabled = false; bt.textContent = "🤖 Analizar cómo estudio"; }
}

// ---------- 🔎 preguntas de búsqueda activa ----------
// Pre-preguntas: leer buscando respuestas concretas fija mejor justo esa información (efecto de las pre-preguntas).
function estGuiaLista(a){ return `<ol class="small guialista">${a.guia.map(g => `<li>${esc(g.p)}</li>`).join("")}</ol>`; }
function estPreparando(box, a){
  box.innerHTML = `<div class="card stack">${estCabecera(a, "preparando")}
    <p class="small" style="margin:0"><span class="spin"></span> La IA está diseñando tus preguntas de búsqueda activa…</p>
    <div id="estGuiaMsg" class="small"></div></div>`;
  estBindCab(box, a);
}
const T_GUIA = {name: "report_preguntas", description: "Entrega las preguntas de búsqueda activa.", strict: true,
  input_schema: {type: "object", additionalProperties: false, required: ["preguntas"], properties: {
    preguntas: {type: "array", items: {type: "object", additionalProperties: false, required: ["pregunta", "concepto", "respuesta", "page"], properties: {
      pregunta: {type: "string"}, concepto: {type: "string"}, respuesta: {type: "string"}, page: {type: "integer"}}}}}}};
// Tipo de documento: el que confirmó la IA al analizarlo o, si no, el estimado por palabras clave (sin IA).
const ESTUDIO_PAPERS = ["ECA", "META", "OBS"];
function estDiseno(s){
  if (!s) return "REV";
  if (DESIGNS[s.design] && s.design !== "OTRO") return s.design;
  const info = docInfo(s.id);
  return info && info.pages ? detectDesign(info.pages.slice(0, 6).join(" ")) : "REV";
}
// Los estudios originales (ensayos, metaanálisis, observacionales) se leen en MBE → Auditoría: aquí no se gasta IA en ellos.
const estEsPaper = s => !!s && ESTUDIO_PAPERS.includes(estDiseno(s));
// Tema del índice que solo cubre los métodos de un estudio: ahí no hay nada que preguntar.
const estSoloMetodos = t => /^\s*(?:\d+[.)]?\s*)?(?:m[eé]todos?|methods?|materials? and methods|materiales y m[eé]todos|dise[ñn]o del estudio|study design|participants?|participantes|population|poblaci[oó]n|patients?|pacientes|statistical analysis|an[aá]lisis estad[ií]stico)\b/i.test(t || "");
async function estGenGuia(a){
  const s = a.src && S.sources.find(x => x.id === a.src);
  if (estEsPaper(s)) { a.paso = "antes"; save(); return; }   // nunca se gasta IA en un estudio original
  try {
    let doc = "";
    if (s) {
      await getRec(s.id); const info = docInfo(s.id), nums = [];
      for (let p = a.desde || 1; p <= (a.hasta || s.pages); p++) if (info && info.pages[p - 1]) nums.push(p);
      doc = nums.map(p => `[pág. ${p}]\n${info.pages[p - 1]}`).join("\n\n").slice(0, AN_MAX_CHARS);
    }
    const r = await callForTool({system: `Eres un profesor de medicina que prepara a médicos para el examen de residencia. Diseñas preguntas de búsqueda activa: preguntas que el médico lee ANTES de estudiar un tema para leer buscando sus respuestas.
Reglas:
- Entre 5 y 6 preguntas, solo sobre lo fundamental del tema: mecanismo central, criterio o dato diagnóstico clave, primera línea de tratamiento, un umbral o cifra que cambie la conducta, el diferencial que más se confunde y la trampa típica de examen.
- NO preguntes por características basales, número de pacientes reclutados o aleatorizados, porcentajes descriptivos de la muestra, escalas de ingreso ni detalles de métodos que no cambian la conclusión: eso no se pregunta en el examen.
- Preguntas abiertas, cortas y concretas («¿Cuál es…?», «¿Qué dato separa…?», «¿Cuándo está indicado…?»), que se respondan en una o dos frases. Sin opciones múltiples. No reveles la respuesta en la pregunta.
- Ordénalas de la más fundamental a la menos.
- "concepto": qué concepto fundamental trabaja la pregunta, en pocas palabras.
- "respuesta": la respuesta breve y exacta${s ? `, tomada SOLO del documento; "page" es la página según las marcas [pág. N]. Si el documento no responde algo fundamental, no hagas esa pregunta` : `, según el conocimiento médico vigente; "page" es 0`}.
Español neutro, sin markdown.${focusLine()}`,
      tools: [T_GUIA], label: "Preguntas de búsqueda activa",
      user: s ? [{type: "text", text: `<documento titulo="${s.title.replace(/"/g, "'")}">\n${doc}\n</documento>`, cache_control: {type: "ephemeral"}}, {type: "text", text: `Tema a estudiar: ${a.tema}.`}]
             : `Tema a estudiar: ${a.tema}.`}, "report_preguntas");
    const ps = (r.preguntas || []).filter(x => x && x.pregunta).slice(0, 6).map(x => ({p: String(x.pregunta).trim(), concepto: String(x.concepto || ""), r: String(x.respuesta || "").trim(),
      page: s && x.page > 0 && x.page <= s.pages ? x.page : 0, fuente: s ? "doc" : "ia", mia: "", auto: ""}));
    if (!ps.length) throw uerr("La IA no devolvió preguntas.");
    a.guia = [...ps, ...a.guia];
  } catch(e) { toast((e.userMsg || e.message) + " · Sigues sin preguntas de la IA."); }
  if (estAct() === a) { a.paso = "antes"; save(); if (currentView === "estudio") renderEstudio(); }
}
