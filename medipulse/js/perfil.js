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
function qKind(q){
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
function renderFocusSel(){
  const sel = $("#focusSel"); if (!sel) return;
  sel.innerHTML = FOCUS.map(f=>`<option value="${f.k}" ${focusOf().k===f.k?"selected":""}>${esc(f.t)}</option>`).join("");
  $("#focusDesc").textContent = focusOf().d;
  sel.onchange = ()=>{ S.focus = sel.value; save(); $("#focusDesc").textContent = focusOf().d; toast("Enfoque: " + focusOf().t); renderHoy(); };
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
