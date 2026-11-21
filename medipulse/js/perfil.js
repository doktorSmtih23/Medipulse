// ===================================================================
// PERFIL: ENFOQUE DE ESTUDIO (tipo de pregunta, no un examen en particular)
// ===================================================================
// Los exámenes cambian sin aviso; lo que se mantiene es el tipo de pregunta. El enfoque ordena
// las sesiones, ajusta lo que pide la IA y sugiere qué estudiar.
const FOCUS = [
  {k:"mixto", t:"⚖️ Mixto", d:"Un poco de todo: conducta, diagnóstico, lectura crítica y datos clave.", ai:""},
  {k:"conducta", t:"🩺 Conducta clínica", d:"¿Qué haces ahora? Manejo inicial, prioridades y primera línea.", ai:"preguntas de conducta: qué hacer ahora, manejo inicial, prioridades y tratamiento de primera línea"},
  {k:"diagnostico", t:"🔎 Diagnóstico", d:"Del cuadro clínico al diagnóstico y a la prueba que lo confirma.", ai:"preguntas de diagnóstico: reconocer el cuadro, el diagnóstico más probable y la prueba inicial y la confirmatoria"},
  {k:"critica", t:"🔬 Lectura crítica y MBE", d:"Diseños, sesgos, NNT, sensibilidad y especificidad.", ai:"preguntas de lectura crítica: diseño del estudio, sesgos, medidas de asociación, NNT y pruebas diagnósticas"},
  {k:"datos", t:"📏 Datos duros", d:"Umbrales, dosis, criterios y puntos de corte.", ai:"datos duros: umbrales, puntos de corte, dosis, criterios diagnósticos y metas terapéuticas"}
];
const focusOf = () => FOCUS.find(f=>f.k===S.focus) || FOCUS[0];
// Tipo de una pregunta: el que trae (las generadas) o el que se deduce del tema y de la pregunta final.
// El enfoque de estudio (conducta, diagnóstico…): solo este archivo lo cambia.
const elegirEnfoque = k => { S.focus = k; };
function qKind(q){
  if (q.tipo && QMETODO[q.tipo]) return q.tipo;   // elegido o corregido por el usuario
  if (q.qtype === "critica") return "critica";
  if (q.qtype === "directa") return "datos";
  if (/epidemiolog|bioestad|lectura cr[ií]tica/i.test(q.topic || "")) return "critica";
  const t = String(q.vignette || "").replace(/<[^>]+>/g, ""), stem = (t.match(/[^.?!]*\?\s*$/) || [t.slice(-120)])[0];
  if (/diagn[oó]stic|causa m[aá]s probable|etiolog|agente/i.test(stem)) return "diagnostico";
  if (/l[ií]mite|dosis|puntaje|cu[aá]nto|umbral|valor|meta/i.test(stem)) return "datos";
  return "conducta";
}
function focusLine(){
  const f = focusOf();
  return f.ai ? `\nEnfoque del estudiante: ${f.ai}. Cuando haya que elegir qué preguntar o qué incluir, prioriza ese tipo, sin dejar de lado lo imprescindible del documento.` : "";
}
// Cómo se piensa cada tipo de pregunta: el método que la app muestra en las preguntas de tu enfoque.
// Es método de examen, no contenido médico: vale para cualquier tema.
const QMETODO = {
  conducta: {t: "🩺 Conducta", pasos: ["¿Está estable? Si no, lo primero es estabilizar (vía aérea, respiración, circulación).", "¿Qué lo mata primero o qué cambia el pronóstico ahora?", "Elige la conducta de primera línea según la guía vigente, no la definitiva."], trampa: "Saltar al tratamiento definitivo o a un estudio antes de estabilizar."},
  diagnostico: {t: "🔎 Diagnóstico", pasos: ["Busca el dato que define el cuadro: el más específico o patognomónico.", "Ajusta por edad, sexo, antecedentes y contexto: lo más frecuente en ese paciente.", "Distingue la prueba inicial de la confirmatoria y del estándar de oro."], trampa: "Elegir la prueba más precisa cuando preguntan por la inicial, o al revés."},
  critica: {t: "🔬 Lectura crítica", pasos: ["Identifica el diseño: ¿el investigador asignó la exposición? ¿Hay grupo control?", "Busca el sesgo o la confusión que amenaza a ese diseño.", "Elige la medida correcta (RR, OR, NNT, sensibilidad, VPP…) y arma la tabla antes de calcular."], trampa: "Confundir significancia estadística con relevancia clínica."},
  datos: {t: "📏 Datos duros", pasos: ["Recuerda el número con su unidad y su contexto: en quién y cuándo aplica.", "Fíjate si piden el umbral para diagnosticar, para tratar o la meta del tratamiento.", "Descarta las opciones con unidad, población o guía equivocadas."], trampa: "Responder con el valor de otra guía, otra edad u otra población."}
};
// Rendimiento por tipo de pregunta (con lo respondido hasta ahora). En «datos» también cuentan las fichas HY.
function tipoStats(){
  const st = {}; FOCUS.slice(1).forEach(f => st[f.k] = {total: 0, n: 0, ok: 0});
  QUESTIONS.forEach(q => { const x = st[qKind(q)], r = S.srs["q" + q.id]; x.total++; if (r) { x.n += r.n; x.ok += r.ok; } });
  st.datos.fichas = HYS.length;
  return st;
}
const pct = x => x.n >= 3 ? Math.round(x.ok / x.n * 100) : null;
// Ítems para practicar el enfoque: primero lo vencido y lo no visto. «Datos duros» practica con fichas HY.
function focusItems(n){
  const k = focusOf().k; if (k === "mixto") return [];
  const qs = shuffle(QUESTIONS.filter(q => qKind(q) === k)).sort((a, b) => (isDue("q"+b.id) - isDue("q"+a.id)) || (!S.srs["q"+b.id]) - (!S.srs["q"+a.id]));
  if (k === "datos") return [...qs.slice(0, 2).map(q => ({t: "q", id: q.id})), ...pickHY(n)];
  return qs.slice(0, n).map(q => ({t: "q", id: q.id}));
}
function practicarEnfoque(){
  const f = focusOf(), items = focusItems(f.k === "datos" ? 6 : 5);
  startSession({label: "Mi enfoque", tag: "norm", stages: [{name: f.t, items}]});
}
// La tarjeta del enfoque en Hoy: cuánto hay para practicar, cómo vas y qué hacer.
function renderFocusBox(){
  const box = $("#focusBox"); if (!box) return;
  const f = focusOf(), st = tipoStats();
  if (f.k === "mixto") {
    const con = FOCUS.slice(1).map(x => ({x, p: pct(st[x.k])})).filter(y => y.p != null).sort((a, b) => a.p - b.p);
    box.innerHTML = con.length ? `<p class="xs muted" style="margin:6px 0 0">Tu tipo de pregunta más débil: <b>${esc(con[0].x.t)}</b> (${con[0].p} %). <button class="linkbtn" id="focWeak">Ponerlo como enfoque</button></p>` : "";
    $("#focWeak") && ($("#focWeak").onclick = () => { elegirEnfoque(con[0].x.k); save(); renderHoy(); toast("Enfoque: " + con[0].x.t); });
    return;
  }
  const x = st[f.k], p = pct(x), cuantos = f.k === "datos" ? x.total + x.fichas : x.total, poco = cuantos < 3;
  box.innerHTML = `<div class="focusbox">
    <div class="row" style="gap:8px"><b class="small">${esc(f.t)}</b><span class="xs muted">${f.k === "datos" ? `${x.fichas} fichas HY y ${x.total} preguntas` : `${x.total} pregunta${x.total === 1 ? "" : "s"} en tu banco`}${p != null ? ` · <b>${p} %</b> de aciertos` : ""}</span></div>
    ${poco ? `<p class="xs" style="margin:6px 0 0">Hay pocas preguntas de este tipo en tu banco. Créalas desde tu material: la IA las hará de este tipo.</p>
      <div class="row" style="gap:6px;margin-top:6px"><button class="btn sm" data-go="lib">📚 Desde tus PDF</button><button class="btn sm" data-go="apuntes">📓 Desde tus apuntes</button></div>`
      : `<button class="btn primary sm" id="focGo" style="margin-top:8px">🎯 Practicar mi enfoque</button>`}
    <details class="metodo" style="margin-top:8px"><summary>Cómo se piensa una pregunta de ${esc(QMETODO[f.k].t.replace(/^\S+\s/, "").toLowerCase())}</summary>${metodoHTML(f.k)}</details></div>`;
  $("#focGo") && ($("#focGo").onclick = practicarEnfoque);
}
function metodoHTML(k){
  const m = QMETODO[k];
  return `<ol>${m.pasos.map(x => `<li>${esc(x)}</li>`).join("")}</ol><p class="xs" style="margin:4px 0 0"><b>⚠️ Trampa típica:</b> ${esc(m.trampa)}</p>`;
}
// En la pregunta: tipo, si es de tu enfoque y el método. Después de responder, cómo vas en tu enfoque.
function tipoChip(q){
  const k = qKind(q), mio = focusOf().k === k;
  return `<span class="tipo${mio ? " mio" : ""}">${esc(QMETODO[k].t)}${mio ? " · 🎯 tu enfoque" : ""}</span>`;
}
// Rótulo de origen para lo que aportó el usuario (no es una pista: no dice el tema).
function origenChip(q){
  if (q.editada) return `<span class="origen">✏️ Editada por ti</span>`;
  if (q.externa) return `<span class="origen">📥 Importada por el usuario</span>`;
  if (q.manual && !q.src) return `<span class="origen">✍️ Elaborada por el usuario</span>`;
  return "";
}
function metodoPregunta(q){
  const k = qKind(q); if (focusOf().k !== k) return "";
  return `<details class="metodo"><summary>🎯 Cómo pensarla (tu enfoque)</summary>${metodoHTML(k)}</details>`;
}
function enfoqueTrasResponder(q){
  const k = qKind(q); if (focusOf().k !== k) return "";
  const x = tipoStats()[k], p = pct(x);
  return `<p class="xs muted" style="margin:0">🎯 Tu enfoque, ${esc(QMETODO[k].t)}: ${p != null ? `<b>${p} %</b> de aciertos` : "aún pocos datos"} (${x.ok}/${x.n}).</p>`;
}
// Resumen de la sesión: cómo te fue en tu enfoque.
function enfoqueResumen(results){
  const k = focusOf().k; if (k === "mixto") return "";
  const qs = results.filter(r => r.t === "q" && qById(r.id) && qKind(qById(r.id)) === k);
  if (!qs.length) return "";
  return `<p class="small" style="margin:0">🎯 Tu enfoque (${esc(QMETODO[k].t)}): <b>${qs.filter(r => r.ok).length}/${qs.length}</b> en esta sesión.</p>`;
}
function renderFocusSel(){
  const sel = $("#focusSel"); if (!sel) return;
  sel.innerHTML = FOCUS.map(f=>`<option value="${f.k}" ${focusOf().k===f.k?"selected":""}>${esc(f.t)}</option>`).join("");
  $("#focusDesc").textContent = focusOf().d;
  sel.onchange = ()=>{ elegirEnfoque(sel.value); save(); toast("Enfoque: " + focusOf().t); renderHoy(); };
  renderFocusBox();
}

// ===================================================================
// DIAGNÓSTICO RÁPIDO
// ===================================================================
function startDiag(){
  const st = specStats();
  const specs = shuffle(SPECS).sort((a,b)=>st[a].seen/st[a].total - st[b].seen/st[b].total).slice(0,5);
  const items = specs.flatMap(s=>pickQuestions(1, {spec:s}));
  startSession({label:"Diagnóstico", tag:"norm", diag:true, stages:[{name:"Diagnóstico rápido · 5 áreas", items}]});
}
function diagSummary(results){
  const rows = results.map(r=>{ const q = qById(r.id); return q ? {spec:q.specialty, ok:r.ok} : null; }).filter(Boolean);
  const miss = rows.filter(r=>!r.ok).map(r=>r.spec);
  return `<div class="stack" style="text-align:left">
    <div class="small">${rows.map(r=>`<div class="row" style="margin-top:4px"><span>${r.ok?"✅":"❌"}</span><span>${esc(r.spec)}</span></div>`).join("")}</div>
    ${miss.length ? `<p class="small" style="margin:0">Tu brecha está en <b>${esc(miss[0])}</b>${miss.length>1?` (y ${miss.length-1} área${miss.length>2?"s":""} más)`:""}. Practícala antes de leer el tema: así sabrás qué buscar.</p><button class="btn primary block" id="diagGo" data-spec="${esc(miss[0])}">5 casos de ${esc(miss[0])}</button>`
                  : `<p class="small" style="margin:0">Sin fallos. Sube la dificultad con un simulacro.</p>`}
  </div>`;
}
