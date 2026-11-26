// ===================================================================
// BANCO DE CASOS: «Arma tu práctica» (especialidades, cantidad de 1 a 100, al azar, mis
// vulnerabilidades o con filtros, y modo examen), «Tus vulnerabilidades» (vulnerabilidades.js) y
// «Explorar el banco»: búsqueda, tipo y estado, lista por especialidad SIN tema ni fuente (serían una
// pista: sesgo de anclaje), corregir la especialidad y los casos archivados para restaurarlos.
// ===================================================================
let qSt = "all", qQuery = "", qEspOpen = null, qFuenteQ = "";
const isFail = q => { const r = S.srs["q"+q.id]; return !!r && (r.last !== undefined ? r.last === 0 : (r.b === 0 && r.n > r.ok)); };
// Estado de un caso para el usuario.
function qEstado(q){
  const r = S.srs["q"+q.id];
  if (!r) return {k: "new", t: "Nuevo"};
  if (isDue("q"+q.id)) return {k: "due", t: "Toca repasar"};
  if (isFail(q)) return {k: "fail", t: "Fallado"};
  return r.b >= 3 ? {k: "ok", t: "Dominado"} : {k: "rev", t: "En repaso"};
}
function qCoincide(q, txt){
  if (!txt) return true;
  const s = srcInfo(q.src) || {};
  const h = norm([q.topic, q.specialty, String(q.vignette).replace(/<[^>]+>/g, ""), s.t || "", s.r || ""].join(" "));
  return txt.split(/\s+/).every(w => h.includes(w));
}
function estudiarCasos(qs, label){
  if (!qs.length) return toast("No hay casos con esos filtros.");
  startSession({label, tag: "norm", stages: [{name: label, items: qs.map(q => ({t: "q", id: q.id}))}]});
}
// Cambiar la especialidad de un caso: lo propio directamente; lo incluido, como corrección en S.over.
function cambiarEspecialidad(q, spec){
  const propio = S.userQ.find(x => String(x.id) === String(q.id));
  if (propio) propio.specialty = spec;
  else corregirIncluido("q" + q.id, {specialty: spec, edited: Date.now()});
  rebuild(); save(); toast(`Ahora está en ${spec} ✓`);
}
const opt = (v, l, sel) => `<option value="${esc(v)}" ${sel ? "selected" : ""}>${esc(l)}</option>`;
// Cómo se eligen los casos de la práctica.
const MODOS_PRAC = [
  {k: "azar", t: "🎲 Al azar", d: "La app mezcla las especialidades y pone primero lo que no has visto y lo que toca repasar."},
  {k: "vuln", t: "🎯 Mis vulnerabilidades", d: "Lo que más te cuesta según tu rendimiento: tipo de pregunta, especialidad y casos que fallas."},
  {k: "filtros", t: "🔧 Con mis filtros", d: "Tú eliges las fuentes, los tipos de pregunta, el tema y el estado."}
];
const PRAC_MAX = 100;
const prac = () => { const P = S.prac || (S.prac = {specs: [], modo: "azar", n: 20, examen: false}); P.tipos = P.tipos || []; P.fuentes = P.fuentes || []; P.niveles = P.niveles || []; return P; };

// ---- Fuentes por categoría (para «Con mis filtros») ----
// Cada caso tiene su fuente («src»): una del contenido incluido (data/fuentes.js), un documento del usuario
// (S.sources) o ninguna (creado o importado a mano). La categoría agrupa las fuentes para elegir rápido.
const FUENTE_PROPIAS = "__propias";
const CATS_FUENTE = [["udea", "🎓 Memorias UdeA"], ["guideline", "📜 Guías de práctica clínica"], ["article", "📄 Artículos y revisiones"],
  ["book", "📚 Libros de texto"], ["tuyas", "📂 Tus documentos"], ["propias", "✍️ Creadas por ti o importadas"]];
function fuenteDe(q){
  if (q.src && SRC_BY_ID[q.src]) { const f = SRC_BY_ID[q.src]; return {id: q.src, cat: /^udea_/.test(q.src) ? "udea" : f.k || "article", nombre: nombreFuente(f)}; }
  const d = q.src && S.sources.find(x => x.id === q.src);
  return d ? {id: d.id, cat: "tuyas", nombre: d.title} : {id: FUENTE_PROPIAS, cat: "propias", nombre: "Creadas por ti o importadas"};
}
// Nombre corto: «Memorias del XXVI Curso de actualización en Medicina Interna 2026» → «Medicina Interna 2026».
const nombreFuente = f => String(f.t).replace(/^Memorias del? .*?(?:Curso de actualización en|Simposio de) /i, "").replace(/\s*\(.*$/, "");
// Las fuentes que tienen casos, por categoría, con cuántos casos aportan.
function fuentesDelBanco(qs){
  const por = {};
  qs.forEach(q => { const f = fuenteDe(q), c = por[f.cat] || (por[f.cat] = {}); (c[f.id] || (c[f.id] = {id: f.id, nombre: f.nombre, n: 0})).n++; });
  return CATS_FUENTE.filter(([k]) => por[k]).map(([k, t]) => ({k, t, fuentes: Object.values(por[k]).sort((a, b) => b.n - a.n || a.nombre.localeCompare(b.nombre))}));
}
// Las fuentes para elegir. Con texto en el buscador: solo las que coinciden, sin plegar. Sin texto: por categoría, plegadas.
function fuentesHTML(cats, fuentes){
  const chip = x => `<button class="chip2${fuentes.includes(x.id) ? " on" : ""}" data-qsrc="${esc(x.id)}" title="${esc(x.nombre)}">${esc(x.nombre)} <span class="cnt">${x.n}</span></button>`;
  const q = norm(qFuenteQ.trim());
  if (q) {
    const hits = cats.flatMap(c => c.fuentes.filter(x => norm(x.nombre + " " + x.id + " " + c.t).includes(q)));
    return hits.length ? `<div class="chips fuentes">${hits.map(chip).join("")}</div>` : `<p class="xs muted" style="margin:0">Ninguna fuente coincide con «${esc(qFuenteQ.trim())}».</p>`;
  }
  return cats.map(cat => {
    const ids = cat.fuentes.map(x => x.id), todas = ids.every(id => fuentes.includes(id)), algunas = ids.filter(id => fuentes.includes(id)).length;
    return plegable("qcat_" + cat.k, `<span class="row" style="gap:8px;display:inline-flex"><button class="chip2${todas ? " on" : ""}" data-qcat="${cat.k}">${cat.t} <span class="cnt">${cat.fuentes.reduce((a, x) => a + x.n, 0)}</span></button>${algunas && !todas ? `<span class="xs muted">${algunas} de ${ids.length}</span>` : ""}</span>`,
      `<div class="chips fuentes" style="margin-top:6px">${cat.fuentes.map(chip).join("")}</div>`);
  }).join("");
}
// Con varios tipos elegidos, la práctica los intercala por turnos para que salga mezclada, como un examen.
function mezclarPorTipo(qs, tipos){
  if (tipos.length < 2) return qs;
  const g = tipos.map(t => qs.filter(q => qKind(q) === t)), out = [];
  for (let i = 0; out.length < qs.length; i++) { let algo = false; g.forEach(x => { if (x[i]) { out.push(x[i]); algo = true; } }); if (!algo) break; }
  return out;
}
const specsSel = () => prac().specs.filter(s => ESPS().includes(s));
// Practicar: arma la sesión según el modo, la cantidad y si es en modo examen (un simulacro).
function empezarPractica(pool, n, modo, examen, rd){
  let qs;
  if (modo === "vuln") qs = elegirVulnerables(pool, n, rd);
  else if (modo === "azar") qs = elegirAlAzar(pool, n);
  else qs = mezclarPorTipo(shuffle(pool), prac().tipos).slice(0, n);
  if (!qs.length) return toast("No hay casos con esa selección.");
  const sp = specsSel(), donde = sp.length && sp.length < ESPS().length ? sp.join(" · ") : "Todas las especialidades";
  const nombre = (modo === "vuln" ? "🎯 Mis vulnerabilidades" : modo === "azar" ? "🎲 Al azar" : "🔧 Con mis filtros") + " · " + donde;
  const items = qs.map(q => ({t: "q", id: q.id}));
  if (examen) startSession({label: "Simulacro", tag: "fire", stages: [{name: nombre, items, exam: true, limit: items.length * 72}]});
  else startSession({label: modo === "vuln" ? "Vulnerabilidades" : "Práctica", tag: "norm", stages: [{name: nombre, items}]});
}
function renderBanco(){
  const P = prac(), sp = specsSel(), txt = norm(qQuery.trim());
  const tipos = P.tipos, fuentes = P.fuentes, niveles = P.niveles;
  const enSpec = q => !sp.length || sp.includes(q.specialty), enTipo = q => !tipos.length || tipos.includes(qKind(q));
  const enFuente = q => !fuentes.length || fuentes.includes(fuenteDe(q).id), enNivel = q => !niveles.length || niveles.includes(nivelCaso(q));
  const enEst = q => qSt === "fail" ? isFail(q) : qSt === "new" ? !S.srs["q"+q.id] : qSt === "due" ? isDue("q"+q.id) : true;
  const base = QUESTIONS.filter(q => enSpec(q) && enTipo(q) && enFuente(q) && enNivel(q) && qCoincide(q, txt));
  const nFail = base.filter(isFail).length, nNew = base.filter(q => !S.srs["q"+q.id]).length, nDue = base.filter(q => isDue("q"+q.id)).length;
  if (qSt === "due" && !nDue) qSt = "all";
  const pool = base.filter(enEst);
  const deSpecs = QUESTIONS.filter(enSpec);
  const rd = rendimiento(sp);
  const vpool = P.modo === "vuln" ? vulnPool(deSpecs, rd) : [];
  const fuente = P.modo === "filtros" ? pool : P.modo === "vuln" ? vpool : deSpecs;
  // Antes del diagnóstico: 10 casos libres al día, sin simulacro ni vulnerabilidades (diagnostico.js).
  const hecho = diagHecho(), libres = hecho ? PRAC_MAX : Math.max(0, DIAG_LIBRES_DIA - diagLibresHoy());
  if (!hecho) P.examen = false;
  const max = Math.min(PRAC_MAX, fuente.length, libres || 1), n = Math.max(1, Math.min(P.n || 20, max));
  const seen = deSpecs.filter(q => S.srs["q"+q.id]).length;
  const cuentaF = f => deSpecs.filter(q => f(q) && qCoincide(q, txt)).length;

  // ---- Arma tu práctica ----
  $("#qInfo").innerHTML = `<h3 style="font-size:16px">Arma tu práctica</h3>
    <div class="xs muted" style="margin:4px 0 6px">Especialidades (elige una o varias)</div>
    <div class="chips" id="qSpecs"><button class="chip2${sp.length ? "" : " on"}" data-sp="">Todas <span class="cnt">${QUESTIONS.length}</span></button>${ESPS().filter(s => esBasica(s) || QUESTIONS.some(q => q.specialty === s)).map(s => { const c = QUESTIONS.filter(q => q.specialty === s).length;
      return `<button class="chip2${sp.includes(s) ? " on" : ""}" data-sp="${esc(s)}" ${c ? "" : "disabled"}>${esc(s)} <span class="cnt">${c}</span></button>`; }).join("")}</div>
    <div class="xs muted" style="margin:12px 0 6px">Cómo elegir los casos</div>
    <div class="seg seg3" id="qModo">${MODOS_PRAC.map(m => `<button class="${P.modo === m.k ? "on" : ""}" data-modo="${m.k}"><b>${m.t}</b><span>${m.d}</span></button>`).join("")}</div>
    ${P.modo === "vuln" ? (hecho ? `<div class="vulnbox stack" id="qVuln">${vulnHTML(sp)}</div>` : `<div style="margin-top:10px" id="qVulnCand">${diagCandadoHTML("«Mis vulnerabilidades»")}</div>`) : ""}
    ${P.modo === "filtros" ? `<div class="filtrosbox stack">
      <input type="search" id="qQuery" placeholder="Tema: TEP, Kawasaki, NNT…" aria-label="Buscar casos por tema">
      <div><div class="xs muted" style="margin-bottom:6px">Tipos de pregunta <span>(elige uno o varios; se mezclan como en el examen)</span></div>
        <div class="chips" id="qTipos"><button class="chip2${tipos.length ? "" : " on"}" data-qtipo="">Todos</button>${FOCUS.slice(1).map(f => { const c = cuentaF(q => qKind(q) === f.k && enFuente(q) && enNivel(q));
          return `<button class="chip2${tipos.includes(f.k) ? " on" : ""}" data-qtipo="${f.k}" ${c ? "" : "disabled"}>${f.t} <span class="cnt">${c}</span></button>`; }).join("")}</div></div>
      <div><div class="xs muted" style="margin-bottom:6px">Dificultad <span>(la misma escala del Taller; lo tuyo sin nivel solo sale con «Todas»)</span></div>
        <div class="chips" id="qNiveles"><button class="chip2${niveles.length ? "" : " on"}" data-qnivel="">Todas</button>${LEVELS.map(([k, t, d]) => { const c = cuentaF(q => nivelCaso(q) === k && enTipo(q) && enFuente(q));
          return `<button class="chip2${niveles.includes(k) ? " on" : ""}" data-qnivel="${k}" title="${esc(d)}" ${c ? "" : "disabled"}>${t} <span class="cnt">${c}</span></button>`; }).join("")}</div></div>
      <div><div class="xs muted" style="margin-bottom:6px">Fuentes <span>(${fuentes.length ? `${fuentes.length} elegida${fuentes.length === 1 ? "" : "s"}` : "todas"})</span>${fuentes.length ? ` · <button class="linkbtn xs" id="qFuentesTodas">Todas</button>` : ""}</div>
        <input type="search" id="qFuenteQ" placeholder="Buscar fuente: NAC, sepsis…" aria-label="Buscar una fuente" style="margin-bottom:6px">
        <div class="stack" style="gap:6px" id="qFuentes">${fuentesHTML(fuentesDelBanco(deSpecs.filter(q => enTipo(q) && enNivel(q) && qCoincide(q, txt))), fuentes)}</div></div>
      <div class="grid2">
        <label class="fld">Estado<select id="qSelSt">${opt("all", `Todos (${base.length})`, qSt === "all")}${opt("new", `Sin responder (${nNew})`, qSt === "new")}${opt("fail", `Mis fallos (${nFail})`, qSt === "fail")}${nDue ? opt("due", `Para repasar (${nDue})`, qSt === "due") : ""}</select></label></div></div>` : ""}
    <div class="row" style="margin-top:12px;gap:8px;align-items:flex-end">
      <label class="fld cantidad"><span>Cantidad de casos</span><input type="number" id="qN" min="1" max="${max}" value="${n}" inputmode="numeric"></label>
      <div class="chips" id="qNs">${[10, 20, 50, 100].filter(x => x < max).map(x => `<button class="chip2${n === x ? " on" : ""}" data-n="${x}">${x}</button>`).join("")}<button class="chip2${n === max ? " on" : ""}" data-n="${max}">${max === PRAC_MAX ? "100 (máximo)" : `Todos (${max})`}</button></div></div>
    <p class="xs muted" style="margin:4px 0 0" id="qDisp">${fuente.length} caso${fuente.length === 1 ? "" : "s"} ${P.modo === "vuln" ? `de tus vulnerabilidades` : `disponible${fuente.length === 1 ? "" : "s"} con esta selección`} · máximo ${PRAC_MAX} por práctica.</p>
    ${hecho ? "" : `<p class="xs muted" style="margin:8px 0 0" id="qLibres">${libres ? `Antes del diagnóstico tienes <b>${libres} caso${libres === 1 ? "" : "s"} libre${libres === 1 ? "" : "s"}</b> hoy.` : ""} 🔒 El modo examen (simulacro) se abre con tu diagnóstico.</p>${libres ? "" : `<div style="margin-top:8px" id="qCand">${diagCandadoHTML("Seguir practicando hoy")}</div>`}`}
    <label class="row check" style="margin-top:10px;gap:8px;align-items:flex-start" ${hecho ? "" : "hidden"}><input type="checkbox" id="qExam" ${P.examen ? "checked" : ""}><span class="small"><b>⏱️ Modo examen</b><br><span class="xs muted">Con tiempo (~72 s por caso) y sin explicaciones hasta el final. Al elegir cada respuesta marcas si la respondiste seguro, dudando o al azar, sin saber si acertaste.${n >= 40 ? " Con " + n + " casos ya es un simulacro." : ""}</span></span></label>
    <button class="btn primary block" id="pr10" style="margin-top:12px" ${fuente.length ? "" : "disabled"}>${P.examen ? "⏱️ Empezar simulacro" : P.modo === "vuln" ? "🎯 Practicar mis vulnerabilidades" : "Empezar"} · ${n} caso${n === 1 ? "" : "s"}${P.examen ? ` · ${fmt(n * 72)}` : ""}</button>
    <div class="grid3" style="margin-top:12px">
      <div class="kpi"><b>${deSpecs.length}</b><span>casos</span></div>
      <div class="kpi"><b>${seen}</b><span>vistos</span></div>
      <div class="kpi"><b>${rd.general.n ? Math.round(rd.general.ok / rd.general.n * 100) + "%" : "—"}</b><span>aciertos</span></div></div>
    ${S.sims.length ? plegable("simhist", `<b>⏱️ Tus simulacros</b> <span class="xs muted">${S.sims.length}</span>`, S.sims.slice(-15).reverse().map(x => { const p = Math.round(x.ok / x.n * 100);
      return `<div class="row small" style="margin-top:8px"><span class="muted">${new Date(x.d).toLocaleDateString("es", {day: "numeric", month: "short"})}</span><div class="spacer"></div><span>${x.ok}/${x.n}</span><b style="width:48px;text-align:right;color:${p >= 70 ? "var(--ok)" : p >= 50 ? "var(--warn)" : "var(--bad)"}">${p}%</b></div>`; }).join("")) : ""}
    <button class="btn ghost block" data-go="new" style="margin-top:10px">➕ Crear pregunta o ficha high-yield</button>`;
  // El banco incluido es una demostración: cuando se acaba, se dice y se sugiere qué hacer.
  const nNewSp = deSpecs.filter(q => !S.srs["q"+q.id]).length, nFailSp = deSpecs.filter(isFail).length;
  if (deSpecs.length && !nNewSp) $("#qInfo").insertAdjacentHTML("beforeend", `<div class="note" style="margin-top:12px" id="qDone"><b>Ya respondiste los ${deSpecs.length} casos${sp.length === 1 ? ` de ${esc(sp[0])}` : ""}.</b> Lo incluido en MediPulse es una muestra del método; para seguir:
    <div class="row" style="margin-top:8px;gap:6px">${nFailSp ? `<button class="btn sm primary" data-qs2="fail">❌ Repasar mis fallos (${nFailSp})</button>` : ""}<button class="btn sm" data-go="lib">📚 Crear desde tus PDF</button><button class="btn sm" data-go="apuntes">📓 Desde tus apuntes</button></div></div>`);
  document.querySelectorAll("[data-qs2]").forEach(b => b.onclick = () => estudiarCasos(shuffle(deSpecs.filter(isFail)).slice(0, PRAC_MAX), "Mis fallos"));
  document.querySelectorAll("#qSpecs [data-sp]").forEach(b => b.onclick = () => {
    const s = b.dataset.sp; P.specs = !s ? [] : sp.includes(s) ? sp.filter(x => x !== s) : [...sp, s];
    if (P.specs.length === ESPS().length) P.specs = [];
    save(); renderBanco(); });
  document.querySelectorAll("#qModo [data-modo]").forEach(b => b.onclick = () => { P.modo = b.dataset.modo; save(); renderBanco(); });
  if (P.modo === "filtros") {
    const q0 = $("#qQuery"); q0.value = qQuery;
    if (renderBanco._foco) { q0.focus(); q0.setSelectionRange(q0.value.length, q0.value.length); renderBanco._foco = false; }
    q0.oninput = () => { qQuery = q0.value; clearTimeout(renderBanco._t); renderBanco._t = setTimeout(() => { renderBanco._foco = document.activeElement === $("#qQuery"); renderBanco(); }, 250); };
    document.querySelectorAll("#qTipos [data-qtipo]").forEach(b => b.onclick = () => { const k = b.dataset.qtipo;
      P.tipos = !k ? [] : tipos.includes(k) ? tipos.filter(x => x !== k) : [...tipos, k]; if (P.tipos.length === FOCUS.length - 1) P.tipos = []; save(); renderBanco(); });
    document.querySelectorAll("#qNiveles [data-qnivel]").forEach(b => b.onclick = () => { const k = b.dataset.qnivel;
      P.niveles = !k ? [] : niveles.includes(k) ? niveles.filter(x => x !== k) : [...niveles, k]; if (P.niveles.length === LEVELS.length) P.niveles = []; save(); renderBanco(); });
    document.querySelectorAll("#qFuentes [data-qsrc]").forEach(b => b.onclick = () => { const id = b.dataset.qsrc;
      P.fuentes = fuentes.includes(id) ? fuentes.filter(x => x !== id) : [...fuentes, id]; save(); renderBanco(); });
    document.querySelectorAll("#qFuentes [data-qcat]").forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation();
      const cat = fuentesDelBanco(deSpecs).find(c => c.k === b.dataset.qcat), ids = cat ? cat.fuentes.map(x => x.id) : [];
      P.fuentes = ids.every(id => fuentes.includes(id)) ? fuentes.filter(x => !ids.includes(x)) : [...new Set([...fuentes, ...ids])]; save(); renderBanco(); });
    $("#qFuentesTodas") && ($("#qFuentesTodas").onclick = () => { P.fuentes = []; save(); renderBanco(); });
    const fq = $("#qFuenteQ"); fq.value = qFuenteQ;
    if (renderBanco._focoF) { fq.focus(); fq.setSelectionRange(fq.value.length, fq.value.length); renderBanco._focoF = false; }
    fq.oninput = () => { qFuenteQ = fq.value; clearTimeout(renderBanco._tf); renderBanco._tf = setTimeout(() => { renderBanco._focoF = document.activeElement === $("#qFuenteQ"); renderBanco(); }, 200); };
    $("#qSelSt").onchange = e => { qSt = e.target.value; renderBanco(); };
  }
  document.querySelectorAll("#qNs [data-n]").forEach(b => b.onclick = () => { P.n = +b.dataset.n; save(); renderBanco(); });
  $("#qN").onchange = e => { P.n = Math.max(1, Math.min(PRAC_MAX, Math.round(+e.target.value) || 1)); save(); renderBanco(); };
  $("#qExam").onchange = e => { P.examen = e.target.checked; save(); renderBanco(); };
  $("#pr10").onclick = () => empezarPractica(fuente, n, P.modo, P.examen, rd);
  // Sin datos no hay vulnerabilidades que practicar: ni cantidad ni botón, solo qué falta para detectarlas.
  if ((P.modo === "vuln" && (!rd.suficiente || !hecho)) || !libres) [$("#qN").closest(".row"), $("#qDisp"), $("#qExam").closest("label"), $("#pr10")].forEach(e => e.hidden = true);

  // ---- Tus vulnerabilidades (dentro de la opción) ----
  $("#vulnAzar") && ($("#vulnAzar").onclick = () => { P.modo = "azar"; save(); renderBanco(); });
  $("#vulnRep") && ($("#vulnRep").onclick = () => estudiarCasos(shuffle(rd.repetidos), "Fallos que se repiten"));

  // Lista por especialidad: sin tema ni fuente, para no dar pistas antes de responder.
  // La lista sigue lo elegido arriba: con «Con mis filtros», solo esos casos; si no, los de las especialidades.
  const lista = P.modo === "filtros" ? pool : P.modo === "vuln" ? vpool : deSpecs, busca = P.modo === "filtros" && !!txt;
  const grupos = ESPS().map(s => [s, lista.filter(q => q.specialty === s)]).filter(([, qs]) => qs.length);
  const abierto = busca;   // plegadas salvo que se esté buscando
  if (busca) PLEG.bqlista = true;
  $("#qList").innerHTML = plegable("bqlista", `<b>Ver los casos</b> <span class="xs muted">${lista.length}${P.modo === "filtros" ? " con tus filtros" : P.modo === "vuln" ? " de tus vulnerabilidades" : ""}</span>`, lista.length ? `<p class="xs muted" style="margin:0 0 6px">Sin el tema ni la fuente, para no darte pistas: los ves al responder. Si un caso quedó en la especialidad equivocada, corrígelo con 🏷️.</p>` + grupos.map(([s, qs]) => `
    <details class="qgrupo" data-pleg="bq_${esc(s)}" ${abierto || PLEG["bq_" + s] ? "open" : ""}><summary><span class="dot" style="background:${SPEC_COLOR[s]}"></span> <b>${esc(s)}</b> <span class="xs muted">${qs.length}</span></summary>
      <div style="margin-top:4px">${qs.map((q, i) => { const e = qEstado(q), id = esc(String(q.id)); return `<div class="qrow">
        <div style="flex:1;min-width:0" class="row" ><b class="small">Caso ${i + 1}</b>${tipoChip(q)}${origenChip(q)}<span class="xs est ${e.k}">${e.t}</span></div>
        <button class="iconbtn" data-qe="${id}" aria-label="Cambiar la especialidad del caso ${i + 1}" title="Cambiar especialidad">🏷️</button>
        <button class="btn sm" data-q1="${id}">Estudiar</button></div>
        ${qEspOpen === String(q.id) ? `<div class="qesp row"><span class="xs">Mover a</span><select data-qesel="${id}">${ESPS().map(x => opt(x, x, x === q.specialty)).join("")}</select></div>` : ""}`; }).join("")}
      ${qs.length > 1 ? `<button class="btn ghost sm" data-qg="${esc(s)}" style="margin-top:6px">Estudiar los ${qs.length} de ${esc(s)}</button>` : ""}</div></details>`).join("")
    : `<p class="muted small" style="margin:0">No hay casos con esos filtros.</p>`, busca);
  $("#qList").insertAdjacentHTML("beforeend", hiddenListHTML("q"));
  document.querySelectorAll("[data-q1]").forEach(b => b.onclick = () => estudiarCasos([qById(b.dataset.q1)], qById(b.dataset.q1).specialty));
  document.querySelectorAll("[data-qg]").forEach(b => b.onclick = () => estudiarCasos(shuffle(lista.filter(q => q.specialty === b.dataset.qg)), b.dataset.qg));
  document.querySelectorAll("[data-qe]").forEach(b => b.onclick = () => { qEspOpen = qEspOpen === b.dataset.qe ? null : b.dataset.qe; renderBanco(); });
  document.querySelectorAll("[data-qesel]").forEach(s => s.onchange = () => { cambiarEspecialidad(qById(s.dataset.qesel), s.value); qEspOpen = null; renderBanco(); });
  bindHiddenList(renderBanco, "q");
}

