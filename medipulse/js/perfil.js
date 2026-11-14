// ===================================================================
// PERFIL: EXAMEN OBJETIVO
// ===================================================================
const EXAMS = ["Residencia médica en Colombia (UdeA, Univalle, UNAL, UPB, Sabana…)", "ENARM (México)", "MIR (España)", "EUNACOM (Chile)", "Residencias en Argentina", "Residentado médico en Perú", "Internado o servicio social rural", "Otro examen"];
function examLine(){ return S.exam ? `\nEl estudiante se prepara para: ${S.exam}. Ajusta el estilo, la dificultad y la terminología a ese examen.` : ""; }
function renderExamSel(){
  const sel = $("#examSel"); if (!sel) return;
  sel.innerHTML = `<option value="">Elige tu examen…</option>` + EXAMS.map(x=>`<option ${S.exam===x?"selected":""}>${esc(x)}</option>`).join("");
  sel.onchange = ()=>{ S.exam = sel.value; save(); toast(S.exam ? "Meta guardada ✓" : "Meta borrada"); };
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
