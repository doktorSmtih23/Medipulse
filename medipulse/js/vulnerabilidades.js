// ===================================================================
// VULNERABILIDADES: la app no potencia errores, los evidencia. Con lo que respondes (S.srs) y el
// registro de respuestas (S.resp: cada respuesta con su fecha y, si fallaste, el motivo que marcaste)
// calcula dónde fallas por tipo de pregunta × especialidad, qué casos fallas una y otra vez y qué
// patrón de error se repite. Incluye la auditoría a ciegas del modo examen: aciertos frágiles y errores
// cometidos con seguridad. Todo se calcula en el dispositivo: no se envía a ningún lado.
// ===================================================================
const RESP_MAX = 5000;
// Motivos de un fallo: un toque después de fallar. Cada uno trae la estrategia que lo corrige.
const MOTIVOS = [
  {k: "nosabia", t: "📚 No lo sabía", d: "vacío de contenido", tip: "Es un vacío de contenido, no de razonamiento: estudia la ficha high-yield o la guía del tema antes de volver a practicarlo."},
  {k: "umbral", t: "🎯 Umbral o dosis", d: "cifra exacta", tip: "Es un dato que se sabe de memoria o no se sabe: repasa las fichas de umbrales y dosis del tema y dilos en voz alta sin mirar antes de volver a practicar."},
  {k: "dato", t: "🔍 No vi un dato del caso", d: "lectura del caso", tip: "Lee primero la pregunta final y después el caso buscando edad, tiempo de evolución, signos vitales y antecedentes. Practica con 🔍 Pistas activadas."},
  {k: "dude", t: "⚖️ Dudé entre dos", d: "discriminar entre opciones", tip: "Antes de ver las opciones, di tu respuesta. Si dudas entre dos, busca el dato del caso que descarta una: siempre lo hay."},
  {k: "confundi", t: "🔀 Lo confundí con otra cosa", d: "conceptos que se mezclan", tip: "Haz una ficha de diferencias «A vs. B» con el dato que las separa (edad, tiempo, umbral o primera línea)."}
];
// Registra cada respuesta a un caso. Devuelve su índice para poder marcarle el motivo del fallo.
function registrarRespuesta(q, elegida, ok, examen, conf){
  S.resp = S.resp || [];
  S.resp.push({id: String(q.id), d: Date.now(), ok, o: elegida == null ? -1 : elegida, ex: examen ? 1 : 0, ...(conf ? {c: conf} : {})});
  if (S.resp.length > RESP_MAX) S.resp.splice(0, S.resp.length - RESP_MAX);
  return S.resp.length - 1;
}
function motivoHTML(idx){
  const r = S.resp && S.resp[idx]; if (!r) return "";
  return `<div class="motivos" data-ridx="${idx}"><div class="xs muted">¿Por qué fallaste? Un toque y la app encuentra tus patrones:</div>
    <div class="chips" style="margin-top:6px">${MOTIVOS.map(m => `<button class="chip2${r.m === m.k ? " on" : ""}" data-mot="${m.k}">${esc(m.t)}</button>`).join("")}</div></div>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-mot]"); if (!b) return;
  const box = b.closest("[data-ridx]"), r = S.resp && S.resp[+box.dataset.ridx]; if (!r) return;
  r.m = r.m === b.dataset.mot ? undefined : b.dataset.mot; save();
  box.querySelectorAll("[data-mot]").forEach(x => x.classList.toggle("on", x.dataset.mot === r.m));
});

// ---------- Auditoría a ciegas (modo examen: se marca al responder) ----------
// Cómo respondió el usuario cada pregunta, marcado ANTES de saber si acertó.
const CONFIANZA = [
  {k: "seguro", t: "✅ Seguro", d: "Sé por qué es esa"},
  {k: "dude", t: "🤔 Dudé", d: "Entre dos o más"},
  {k: "azar", t: "🎲 Al azar", d: "Descarté y adiviné"},
  {k: "nosabia", t: "❓ No lo sabía", d: "No conocía el tema"}
];
// Cruce de confianza y resultado: lo que de verdad dice cada respuesta.
function clasifConfianza(ok, c){
  if (!c) return null;
  if (ok) return c === "seguro" ? {k: "solida", t: "✅ Sólida"} : {k: "fragil", t: "🍀 Acierto frágil", msg: "Acertaste sin certeza: no cuenta como dominada y vuelve mañana a tu repaso."};
  return c === "seguro" ? {k: "peligro", t: "🚨 Error con seguridad", msg: "Lo más importante de corregir: respondiste convencido y estaba mal. Hay un concepto mal aprendido; revisa la explicación y la fuente."}
    : {k: "vacio", t: "🕳️ Fallo reconocido", msg: "Sabías que no lo dominabas: es un vacío identificado, estúdialo antes de volver a practicarlo."};
}
function marcarConfianza(r, c){
  r.c = c;
  const e = S.resp && S.resp[r.ri]; if (e) e.c = c;
  // Un acierto sin certeza no avanza en el repaso como si estuviera dominado: vuelve mañana.
  if (r.good && c && c !== "seguro" && !r.ajustado) { ajustarPorConfianza("q" + r.q.id, c); r.ajustado = true; }
  save();
}
function auditoriaResumen(rs, total){
  const aud = rs.filter(r => r.c); if (!aud.length) return "";
  const cnt = {solida: 0, fragil: 0, peligro: 0, vacio: 0}; aud.forEach(r => cnt[clasifConfianza(r.good, r.c).k]++);
  const real = Math.round(cnt.solida / total * 100);
  return `<div class="audres">
      <p class="small" style="margin:0">Nota real (solo aciertos seguros): <b>${real} %</b></p>
      <div class="grid2" style="margin-top:8px;text-align:left">
        <div class="kpi"><b>${cnt.solida}</b><span>✅ Sólidas</span></div>
        <div class="kpi"><b>${cnt.fragil}</b><span>🍀 Aciertos frágiles</span></div>
        <div class="kpi${cnt.peligro ? " alerta" : ""}"><b>${cnt.peligro}</b><span>🚨 Errores con seguridad</span></div>
        <div class="kpi"><b>${cnt.vacio}</b><span>🕳️ Fallos reconocidos</span></div></div>
      ${cnt.peligro ? `<p class="xs" style="margin:8px 0 0;color:var(--bad)">${cnt.peligro} error${cnt.peligro === 1 ? "" : "es"} con seguridad: son conceptos mal aprendidos, lo primero que debes corregir. Están marcados 🚨 abajo.</p>` : ""}
      ${cnt.fragil ? `<p class="xs muted" style="margin:6px 0 0">${cnt.fragil === 1 ? "El acierto frágil no cuenta como dominado: vuelve" : `Los ${cnt.fragil} aciertos frágiles no cuentan como dominados: vuelven`} mañana a tu repaso.</p>` : ""}</div>`;
}
// Última confianza auditada de cada caso (para el análisis y para elegir casos).
function ultimaAuditoria(){
  const m = {}; (S.resp || []).forEach(r => { if (r.c) m[r.id] = clasifConfianza(r.ok, r.c).k; }); return m;
}

// Tasa suavizada: con pocas respuestas no salta a 0 % o 100 %.
const tasa = x => (x.ok + 1) / (x.n + 2);
function rendimiento(specs){
  const en = q => !specs || !specs.length || specs.includes(q.specialty);
  const tipo = {}, esp = {}, celda = {}, add = (o, k, r) => { const x = o[k] || (o[k] = {n: 0, ok: 0}); x.n += r.n; x.ok += r.ok; };
  let n = 0, ok = 0;
  const qs = QUESTIONS.filter(en);
  qs.forEach(q => { const r = S.srs["q" + q.id]; if (!r || !r.n) return; const k = qKind(q);
    add(tipo, k, r); add(esp, q.specialty, r); add(celda, q.specialty + "|" + k, r); n += r.n; ok += r.ok; });
  const general = {n, ok};
  // Casos que fallas una y otra vez (dos fallos o más) y que aún no dominas.
  const repetidos = qs.filter(q => { const r = S.srs["q" + q.id]; return r && r.n - r.ok >= 2 && r.last !== 2; });
  // Focos: tipo de pregunta en una especialidad, con al menos 3 respuestas y por debajo de lo esperado.
  const ref = Math.min(tasa(general), 0.75);
  const focos = Object.entries(celda).filter(([, x]) => x.n >= 3 && tasa(x) < ref).map(([k, x]) => ({spec: k.split("|")[0], tipo: k.split("|")[1], ...x}))
    .sort((a, b) => tasa(a) - tasa(b) || b.n - a.n).slice(0, 3);
  // Patrón de error: los motivos que marcaste en los fallos de estas especialidades.
  const ids = new Set(qs.map(q => String(q.id))), mot = {};
  (S.resp || []).forEach(r => { if (!r.ok && r.m && ids.has(r.id)) mot[r.m] = (mot[r.m] || 0) + 1; });
  const nMot = Object.values(mot).reduce((a, b) => a + b, 0);
  const aud = ultimaAuditoria(), audN = {fragil: 0, peligro: 0};
  Object.entries(aud).forEach(([id, k]) => { if (ids.has(id) && audN[k] != null) audN[k]++; });
  return {tipo, esp, celda, general, repetidos, focos, mot, nMot, aud, audN, suficiente: n >= 8};
}

// Elige los casos que más te cuestan: los de tus focos débiles (también los que no has visto, para
// medir el área y no memorizar las mismas preguntas), lo que fallaste y lo que toca repasar.
function elegirVulnerables(pool, n, rd){
  const debil = (o, k) => o[k] && o[k].n >= 3 ? 1 - tasa(o[k]) : 0.3;
  const score = q => {
    const k = qKind(q), r = S.srs["q" + q.id];
    let s = 1.5 * debil(rd.celda, q.specialty + "|" + k) + debil(rd.tipo, k) + 0.5 * debil(rd.esp, q.specialty);
    if (r) {
      if (r.last === 0) s += 1.2;
      if (r.n - r.ok >= 2) s += 0.8;
      if (isDue("q" + q.id)) s += 0.6;
      if (r.b >= 3 && r.last === 2) s -= 1.2;   // ya dominado
    }
    const au = rd.aud && rd.aud[String(q.id)];
    if (au === "peligro") s += 1.5; else if (au === "fragil") s += 0.8;
    return s + Math.random() * 0.3;
  };
  return shuffle(pool.map(q => [score(q), q]).sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]));
}
// Al azar, pero balanceado: reparte entre las especialidades y dentro de cada una pone primero
// lo que toca repasar y lo que no has visto.
function elegirAlAzar(pool, n){
  const grupos = shuffle(ESPS().map(s => pool.filter(q => q.specialty === s)).filter(g => g.length)).map(g => {
    const due = g.filter(q => isDue("q" + q.id)), nuevo = g.filter(q => !S.srs["q" + q.id]);
    return [...shuffle(due), ...shuffle(nuevo), ...shuffle(g.filter(q => !due.includes(q) && !nuevo.includes(q)))];
  });
  const out = [];
  for (let i = 0; out.length < n && grupos.some(g => i < g.length); i++) grupos.forEach(g => { if (i < g.length && out.length < n) out.push(g[i]); });
  return shuffle(out);
}

const pctTxt = x => Math.round(tasa(x) * 100);
const barra = (lbl, x, color) => `<div class="bar"><span class="small">${lbl}</span><div class="track"><i style="width:${Math.round(x.ok / x.n * 100)}%;background:${color || "var(--accent)"}"></i></div><b class="small">${Math.round(x.ok / x.n * 100)} %</b></div>`;
// Los casos de tus vulnerabilidades: los del tipo de pregunta y especialidad donde fallas (también los
// que no has visto, para medir el área), los que fallaste, los que fallas una y otra vez y los errores
// con seguridad o aciertos frágiles de tus auditorías. Nada más: «Mis vulnerabilidades» no es al azar.
function vulnPool(pool, rd){
  if (!rd.suficiente) return [];
  const celdas = new Set(rd.focos.map(f => f.spec + "|" + f.tipo));
  return pool.filter(q => { const r = S.srs["q" + q.id], au = rd.aud[String(q.id)];
    return celdas.has(q.specialty + "|" + qKind(q)) || isFail(q) || (r && r.n - r.ok >= 2 && r.last !== 2) || au === "peligro" || au === "fragil"; });
}
// Análisis «Tus vulnerabilidades»: va dentro de la opción «🎯 Mis vulnerabilidades» del banco.
function vulnHTML(specs){
  const rd = rendimiento(specs), alcance = specs && specs.length && specs.length < ESPS().length ? ` en ${specs.join(", ")}` : "";
  if (!rd.suficiente) return `<p class="small" style="margin:0">🎯 Aquí aparecerán <b>los casos donde más fallas</b>: el tipo de pregunta y la especialidad que te cuestan, los casos que fallas una y otra vez y el error que repites.</p>
    <p class="xs muted" style="margin:6px 0 0">Para detectarlo necesito al menos 8 respuestas${esc(alcance)}; llevas ${rd.general.n}. Empieza con casos al azar y vuelve aquí.</p>
    <button class="btn sm" id="vulnAzar" style="margin-top:8px">🎲 Practicar al azar</button>`;
  const tipos = FOCUS.slice(1).filter(f => rd.tipo[f.k] && rd.tipo[f.k].n >= 3);
  const motTop = MOTIVOS.filter(m => rd.mot[m.k]).sort((a, b) => rd.mot[b.k] - rd.mot[a.k]);
  return `<p class="xs muted" style="margin:0">Calculado con tus ${rd.general.n} respuestas${esc(alcance)} (${Math.round(rd.general.ok / rd.general.n * 100)} % de aciertos), en tu dispositivo.</p>
    ${rd.focos.length ? `<div class="stack" style="gap:6px;margin-top:10px">${rd.focos.map((f, i) => `<div class="foco"><b class="small">${i + 1}. ${esc(QMETODO[f.tipo].t)} en ${esc(f.spec)}</b><span class="xs muted"> · ${f.ok} de ${f.n} (${Math.round(f.ok / f.n * 100)} %)</span>
        <div class="xs muted" style="margin-top:2px">⚠️ ${esc(QMETODO[f.tipo].trampa)}</div></div>`).join("")}</div>`
      : `<p class="small" style="margin:10px 0 0">No hay un tipo de pregunta claramente por debajo de tu promedio. Sube la exigencia con más casos o con modo examen.</p>`}
    ${tipos.length ? `<details style="margin-top:10px"><summary class="small" style="cursor:pointer">Por tipo de pregunta y por especialidad</summary><div class="bars">
      ${tipos.map(f => barra(esc(QMETODO[f.k].t), rd.tipo[f.k])).join("")}
      ${ESPS().filter(s => rd.esp[s] && rd.esp[s].n >= 3).map(s => barra(esc(s), rd.esp[s], SPEC_COLOR[s])).join("")}</div></details>` : ""}
    ${rd.audN.peligro || rd.audN.fragil ? `<p class="small" style="margin:10px 0 0">Según tus auditorías: ${rd.audN.peligro ? `<b>🚨 ${rd.audN.peligro} error${rd.audN.peligro === 1 ? "" : "es"} con seguridad</b>` : ""}${rd.audN.peligro && rd.audN.fragil ? " · " : ""}${rd.audN.fragil ? `<b>🍀 ${rd.audN.fragil} acierto${rd.audN.fragil === 1 ? "" : "s"} frágil${rd.audN.fragil === 1 ? "" : "es"}</b>` : ""}. Entran primero en «Mis vulnerabilidades».</p>` : ""}
    ${rd.repetidos.length ? `<p class="small" style="margin:10px 0 0">🔁 <b>${rd.repetidos.length} caso${rd.repetidos.length === 1 ? "" : "s"}</b> que fallaste dos veces o más: ahí hay un error que se repite.</p>` : ""}
    ${motTop.length ? `<div class="note trap" style="margin-top:10px"><b>Tu error más frecuente: ${esc(motTop[0].t)}</b> (${rd.mot[motTop[0].k]} de ${rd.nMot} fallos con motivo).<div class="small" style="margin-top:4px">${esc(motTop[0].tip)}</div></div>`
      : `<p class="xs muted" style="margin:10px 0 0">Cuando falles, marca el motivo (no lo sabía, umbral o dosis, no vi un dato, dudé entre dos, lo confundí): así la app encuentra el error que repites.</p>`}
    <div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">${rd.repetidos.length ? `<button class="btn sm" id="vulnRep">🔁 Los que fallo una y otra vez (${rd.repetidos.length})</button>` : ""}${recuerdoVulnerables().length ? `<button class="btn sm" id="vulnRec">✍️ Recuerdo libre de lo que más fallo</button>` : ""}</div>
    ${recuerdoVulnerables().length ? `<p class="xs muted" style="margin:6px 0 0">Recuerdo libre: los casos sin opciones y las cifras de memoria. Lo que más fallas tienes que saberlo sin pistas.</p>` : ""}`;
}
// En el resumen de la sesión: cómo te fue por tipo de pregunta y los motivos de tus fallos.
function vulnResumen(results){
  const qs = results.filter(r => r.t === "q" && qById(r.id)); if (qs.length < 3) return "";
  const por = {}; qs.forEach(r => { const k = qKind(qById(r.id)), x = por[k] || (por[k] = {n: 0, ok: 0}); x.n++; if (r.ok) x.ok++; });
  const mot = {}; qs.forEach(r => { const e = r.ri != null && S.resp && S.resp[r.ri]; if (e && e.m) mot[e.m] = (mot[e.m] || 0) + 1; });
  const peor = Object.entries(por).filter(([, x]) => x.ok < x.n).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)[0];
  return `<div class="small" style="text-align:left"><div class="chips" style="justify-content:center">${Object.entries(por).map(([k, x]) => `<span class="chip">${esc(QMETODO[k].t)} ${x.ok}/${x.n}</span>`).join("")}</div>
    ${peor ? `<p class="xs muted" style="margin:6px 0 0;text-align:center">Lo que más te costó hoy: <b>${esc(QMETODO[peor[0]].t)}</b>.${Object.keys(mot).length ? ` Motivo más marcado: ${esc(MOTIVOS.find(m => m.k === Object.entries(mot).sort((a, b) => b[1] - a[1])[0][0]).t)}.` : ""}</p>` : ""}</div>`;
}

// ---------- Bloque de refuerzo ----------
// Cuando un tipo de pregunta en una especialidad (una «celda») acumula 3 fallos o más en 14 días, la app
// ofrece un bloque con preguntas de esa celda: primero las que no has visto, luego las demás. Al empezarlo,
// esos fallos dejan de contar (S.refuerzo guarda cuándo se hizo el último bloque de cada celda).
const REF_DIAS = 14, REF_FALLOS = 3, REF_N = 10;
function refuerzoPendiente(){
  // Los fallos del diagnóstico (sus casos, respondidos en modo examen) no cuentan: el diagnóstico arma su propio foco del día.
  const desde = Date.now() - REF_DIAS * DAY, hecho = S.refuerzo || {}, fallos = {};
  const diag = new Set(((S.diag && S.diag.p1 && S.diag.p1.ids) || []).map(String));
  (S.resp || []).forEach(r => {
    if (r.ok || r.d < desde || (r.ex && diag.has(r.id))) return; const q = qById(r.id); if (!q) return;
    const k = q.specialty + "|" + qKind(q); if (r.d > (hecho[k] || 0)) fallos[k] = (fallos[k] || 0) + 1; });
  const top = Object.entries(fallos).filter(([, n]) => n >= REF_FALLOS).sort((a, b) => b[1] - a[1])[0]; if (!top) return null;
  const [spec, tipo] = top[0].split("|"), pool = QUESTIONS.filter(q => q.specialty === spec && qKind(q) === tipo);
  const visto = q => !!S.srs["q" + q.id];
  const qs = [...shuffle(pool.filter(q => !visto(q))), ...shuffle(pool.filter(q => visto(q) && !isFail(q))), ...shuffle(pool.filter(isFail))].slice(0, REF_N);
  if (!qs.length) return null;
  return {k: top[0], spec, tipo, fallos: top[1], nuevos: qs.filter(q => !visto(q)).length, items: qs.map(q => ({t: "q", id: q.id}))};
}
const tipoNombre = k => QMETODO[k].t.replace(/^[^\p{L}]+/u, "");
const refuerzoTitulo = ref => `${tipoNombre(ref.tipo)} en ${ref.spec}`;
const refuerzoPor = ref => `Fallaste ${ref.fallos} preguntas de ${tipoNombre(ref.tipo).toLowerCase()} en ${esc(ref.spec)} en los últimos ${REF_DIAS} días. ${ref.nuevos ? `Van primero ${ref.nuevos === ref.items.length ? "preguntas" : ref.nuevos} que no has visto` : "Ya viste todas las de esta celda: van primero las que no fallaste"}, para practicar el razonamiento y no la memoria del caso.`;
function empezarRefuerzo(ref){
  S.refuerzo = Object.assign({}, S.refuerzo, {[ref.k]: Date.now()}); save();
  startSession({label: "Bloque de refuerzo", tag: "norm", stages: [{name: "🧱 " + refuerzoTitulo(ref), items: ref.items}]});
}

// ---------- Fichas de lo que fallaste ----------
// Al final de la sesión: las fichas high-yield (umbrales, dosis y algoritmos) de la misma especialidad
// cuyo título comparte una palabra del tema de un caso fallado.
const FICHA_VACIAS = new Set(["paciente", "manejo", "conducta", "tratamiento", "diagnostico", "inicial", "clinico", "clinica", "sindrome", "enfermedad", "aguda", "agudo", "cronica", "cronico", "severa", "severo", "grave", "embarazo", "adulto", "nino", "ninos"]);
function fichasDeFallos(results){
  const fallados = results.filter(r => r.t === "q" && !r.ok).map(r => qById(r.id)).filter(Boolean);
  const palabras = t => norm(t || "").split(/[^a-z0-9ñ]+/).filter(w => w.length >= 5 && !FICHA_VACIAS.has(w));
  const fichas = [], sin = [];
  fallados.forEach(q => {
    const ws = palabras(q.topic);
    const hs = HYS.filter(h => h.specialty === q.specialty && palabras(h.title).some(w => ws.includes(w)));
    hs.forEach(h => { if (!fichas.includes(h)) fichas.push(h); });
    if (!hs.length && q.topic && !sin.includes(q.topic)) sin.push(q.topic);
  });
  return {fichas: fichas.slice(0, 8), sin, n: fallados.length};
}
function fichasFallosHTML(f){
  if (!f.n) return "";
  if (f.fichas.length) return `<button class="btn block" id="fichasFallo">📌 Fichas de umbrales y dosis de lo que fallaste (${f.fichas.length})</button>`;
  return `<p class="xs muted" style="margin:0">Todavía no hay fichas de umbrales y dosis de ${f.sin.length === 1 ? "este tema" : "estos temas"}: ${esc(f.sin.slice(0, 3).join(", "))}${f.sin.length > 3 ? "…" : ""}. Puedes crearlas en «Crear pregunta o ficha».</p>`;
}
