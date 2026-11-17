// ===================================================================
// LABORATORIO MBE: lectura crítica
// ===================================================================
const MBE = {
  GPC: {name:"Guía clínica", icon:"📜", time:"15 min",
    title:"Cómo estudiar una guía de práctica clínica (ESC, AHA, IDSA, GPC MinSalud/IETS)",
    intro:"No leas primero las páginas de justificación. El examen y la práctica preguntan por los algoritmos, los puntos de corte y la diferencia entre lo que siempre se hace (Clase I) y lo que nunca se hace (Clase III).",
    steps:["Filtra las tablas de recomendaciones: extrae primero las Clase I (hacer) y las Clase III (no hacer, dañino).",
      "Dibuja el algoritmo en 3 pasos: prueba inicial, prueba confirmatoria (estándar de oro) y tratamiento de primera línea.",
      "Caza los umbrales exactos (p. ej. K⁺ < 3.3 mEq/L en CAD, PA < 185/110 antes de trombolizar, PAM ≥ 65 mmHg en choque séptico; 60–65 en ≥ 65 años según SSC 2026).",
      "Identifica qué cambió frente a la versión anterior de la guía: es lo que más se pregunta el año siguiente.",
      "Convierte cada Clase III en una trampa de examen: los distractores suelen salir de ahí."],
    pitfall:"Gastar tiempo memorizando recomendaciones Clase IIb (“puede considerarse”): casi nunca son la respuesta correcta.",
    ex:{title:"Insuficiencia cardíaca con FEVI reducida (≤ 40 %)", src:"Guías ESC 2021 / AHA-ACC-HFSA 2022",
      grid:[["Clase I: los 4 pilares","ARNI (o IECA/ARA-II) + betabloqueador + antagonista mineralocorticoide + iSGLT2 (dapagliflozina o empagliflozina)"],
        ["Umbral","FEVI ≤ 40 %: iniciar los 4 pilares temprano reduce mortalidad y hospitalizaciones"],
        ["Diuréticos de asa","Alivian la congestión, pero no reducen la mortalidad por sí solos"],
        ["Clase III (no hacer)","Diltiazem o verapamilo y tiazolidinedionas (pioglitazona): empeoran la falla cardíaca"]],
      take:"Con FEVI ≤ 40 %, los iSGLT2 están indicados (Clase I) tenga o no diabetes el paciente."},
    labels:["Población y criterio diagnóstico (umbral)", "Conducta Clase I (primera línea)", "Clase III: lo que nunca debes hacer"]},
  ECA: {name:"Ensayo clínico", icon:"🧪", time:"10 min",
    title:"Cómo desglosar un ensayo clínico aleatorizado sin perderte en la estadística",
    intro:"Un ECA evalúa si un tratamiento causa un beneficio. Arma la pregunta PICO, verifica que la comparación fue limpia (validez interna) y mide el tamaño real del beneficio con la reducción absoluta y el NNT.",
    steps:["Define el PICO en 30 segundos: pacientes, intervención, comparador y desenlace primario.",
      "Revisa la tabla 1: ¿los grupos quedaron balanceados tras la aleatorización?",
      "Verifica el análisis por intención de tratar: conserva la aleatorización y evita inflar el beneficio.",
      "Mira el desenlace primario: ¿es duro (muerte, IAM, ACV) o un compuesto inflado por desenlaces blandos?",
      "Calcula RRA y NNT, y comprueba que el IC 95 % del RR o HR no cruce el 1."],
    pitfall:"Impresionarse con una reducción relativa del 50 % cuando el riesgo absoluto baja de 0.2 % a 0.1 % (NNT de 1 000).",
    ex:{title:"CRASH-2: ácido tranexámico en trauma con sangrado", src:"The Lancet, 2010 · 20 211 pacientes",
      grid:[["PICO","P: trauma con sangrado · I: ácido tranexámico 1 g IV en 10 min + 1 g en 8 h · C: placebo · O: muerte a 4 semanas"],
        ["Resultado primario","Mortalidad 14.5 % vs 16.0 % → RR 0.91 (IC 95 % 0.85–0.97)"],
        ["Impacto absoluto","RRA 1.5 % → NNT ≈ 67 para evitar una muerte, sin más eventos trombóticos"],
        ["Ventana","El beneficio se concentra en las primeras 3 h; después puede ser dañino"]],
      take:"El ácido tranexámico reduce la mortalidad en trauma con sangrado y en hemorragia posparto (WOMAN) si se da en las primeras 3 horas."},
    labels:["PICO (población, intervención, comparador, desenlace)", "Resultado primario (RR/HR, IC 95 %, RRA, NNT)", "Validez interna y a quién aplica"]},
  META: {name:"Metaanálisis", icon:"📊", time:"8 min",
    title:"Cómo leer un forest plot y un metaanálisis en 5 minutos",
    intro:"El metaanálisis combina estudios para ganar poder estadístico. La clave está en el forest plot y en saber si los estudios eran combinables (heterogeneidad I²).",
    steps:["Revisa la calidad de los estudios incluidos: si entran estudios malos, el resultado es malo.",
      "Ubica la línea de efecto nulo: 1 para RR, OR o HR; 0 para diferencia de medias.",
      "Mira el diamante: su centro es el efecto global y sus extremos el IC 95 %. Si no toca la línea de nulidad, el resultado es significativo.",
      "Revisa la heterogeneidad (I²): < 25 % baja, 25–50 % moderada, > 50 % alta.",
      "Busca sesgo de publicación: un gráfico de embudo asimétrico lo sugiere."],
    pitfall:"Creer en el diamante global cuando el I² es > 75 %: se están mezclando estudios que no son comparables.",
    ex:{title:"WHO REACT: corticoides sistémicos en COVID-19 crítico", src:"JAMA, 2020 · 7 ECA",
      grid:[["Pregunta y estudios","7 ECA en pacientes críticos con COVID-19 (incluye RECOVERY)"],
        ["Diamante","Mortalidad a 28 días: OR 0.66 (IC 95 % 0.53–0.82) a favor de los corticoides"],
        ["Heterogeneidad","I² = 15.6 %: estudios muy consistentes entre sí"],
        ["Peso","RECOVERY aportó la mayor parte de los pacientes; el beneficio se mantuvo en el análisis de sensibilidad"]],
      take:"Diamante que no cruza el 1 + I² bajo = evidencia sólida para cambiar la conducta."},
    labels:["Pregunta PICO y número/calidad de estudios", "Resultado global (OR/RR + IC 95 %) e I²", "Sesgo de publicación y conclusión práctica"]},
  OBS: {name:"Observacional", icon:"🔭", time:"8 min",
    title:"Cómo estudiar una cohorte o un estudio de casos y controles",
    intro:"Cuando no es ético o posible aleatorizar (tabaco, tóxicos, pronóstico, enfermedades raras) se usan estudios observacionales. El enemigo número uno es el factor de confusión.",
    steps:["Identifica la dirección: de la exposición hacia el desenlace (cohorte → incidencia y RR) o del desenlace hacia la exposición (casos y controles → OR).",
      "Enfermedad rara o de latencia larga → casos y controles. Incidencia o varios desenlaces → cohorte.",
      "Busca los confusores: ¿ajustaron por edad, sexo y comorbilidades (regresión, propensity score)?",
      "Compara la medida cruda con la ajustada: si tras ajustar el IC 95 % cruza el 1, la asociación no se sostiene.",
      "Aplica los criterios de Bradford Hill: fuerza, dosis-respuesta, temporalidad, consistencia."],
    pitfall:"Asumir causalidad sin descartar confusión, sesgo de memoria (casos y controles) o pérdidas de seguimiento > 20 % (cohortes).",
    ex:{title:"Framingham (cohorte) vs síndrome de Reye (casos y controles)", src:"Epidemiología clínica clásica",
      grid:[["Cohorte (Framingham)","Parte de personas sanas con y sin exposición (HTA, tabaco, colesterol) y mide la incidencia de IAM y ACV → RR/HR"],
        ["Casos y controles (Reye)","Niños con síndrome de Reye vs sin él → uso previo de aspirina → OR muy elevado"],
        ["Sesgo típico","Cohorte: pérdidas de seguimiento · Casos y controles: sesgo de memoria y mala selección de controles"],
        ["Interpretación","RR u OR = 1 sin asociación · > 1 riesgo · < 1 protección, siempre que el IC 95 % no incluya el 1"]],
      take:"Para el examen: cohorte = incidencia + RR. Casos y controles = enfermedad rara + rápido y barato + OR + sesgo de memoria."},
    labels:["Diseño (cohorte, casos y controles, transversal)", "Medida ajustada (RR, HR u OR con IC 95 %)", "Confusores ajustados y sesgo principal"]},
  REV: {name:"Revisión de tema", icon:"📖", time:"20 min",
    title:"Cómo estudiar una revisión de tema (NEJM, Lancet, UpToDate) sin subrayar todo",
    intro:"Cuando estás cansado, el error es releer 12 páginas subrayando el 80 %. Resúmela en cuatro bloques que puedas usar.",
    steps:["Lee primero tablas, figuras y recuadros de resumen: ahí está la mayor parte de lo que se pregunta.",
      "Resume la fisiopatología en una cadena de 3 pasos: causa → mecanismo → signo clínico.",
      "Separa la clínica en presentación típica y banderas rojas (cuándo sospechar una complicación grave).",
      "Arma la escalera diagnóstica: prueba inicial (sensible) vs estándar de oro (específica).",
      "Cierra con recuerdo activo: escribe de memoria el tratamiento de primera línea en el paciente estable y en el inestable."],
    pitfall:"Sentir familiaridad al releer y bloquearte ante la pregunta porque no separaste la prueba inicial del estándar de oro.",
    ex:{title:"Tromboembolismo pulmonar agudo", src:"Revisión de tema + AHA/ACC 2026",
      grid:[["Fisiopatología","Tríada de Virchow → obstrucción arterial pulmonar → sobrecarga aguda del VD → falla del VD y choque obstructivo"],
        ["Estratificación","¿PAS < 90 mmHg? → alto riesgo. ¿Estable? → probabilidad clínica (Wells)"],
        ["Escalera diagnóstica","Probabilidad baja o intermedia → dímero D. Alta, o dímero D positivo → angioTAC pulmonar"],
        ["Tratamiento","Estable: anticoagulación (ACOD o HBPM). Inestable: trombólisis sistémica o reperfusión por catéter"]],
      take:"Cualquier revisión cabe en una ficha: fisiopatología clave + regla de decisión + estándar de oro + tratamiento de primera línea."},
    labels:["Fisiopatología y presentación típica", "Prueba inicial vs estándar de oro", "Tratamiento de primera línea (estable vs inestable)"]}
};
// La revisión de tema ya no es lectura crítica: su guía pasa a la Sesión de estudio (estudio.js).
const GUIA_REV = MBE.REV; delete MBE.REV;
let mbeType = "GPC";
function renderMbe(){
  const b = MBE[mbeType];
  $("#mbeTabs").innerHTML = Object.entries(MBE).map(([k,v])=>`<button class="btn${k===mbeType?" on":""}" data-mt="${k}">${v.icon} ${v.name}</button>`).join("");
  document.querySelectorAll("[data-mt]").forEach(x=>x.onclick=()=>{ mbeType = x.dataset.mt; renderMbe(); });
  $("#mbeGuide").innerHTML = `
    <div class="row xs" style="gap:6px"><span class="tag">${b.icon} ${esc(b.name)}</span><span class="muted">⏱ lectura de ${b.time}</span></div>
    <h3 style="font-size:18px">${esc(b.title)}</h3>
    <p class="small" style="margin:0">${esc(b.intro)}</p>
    <ol class="mbesteps">${b.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>
    <div class="note trap"><b>🚨 Trampa metodológica:</b> ${esc(b.pitfall)}</div>
    <div class="mbeex"><div class="xs muted">📌 Ejemplo desglosado · ${esc(b.ex.src)}</div><h4>${esc(b.ex.title)}</h4>
      <dl>${b.ex.grid.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <div class="note pearl"><b>💡 Lo que cambia tu conducta:</b> ${esc(b.ex.take)}</div></div>`;
  renderMbeDocs(); renderDistill(); renderNotes(); calcRR(); calcDx();
}
function renderDistill(){
  const b = MBE[mbeType];
  $("#mbeForm").innerHTML = `
    <div class="grid2"><label class="fld">Tipo<select id="dType">${Object.entries(MBE).map(([k,v])=>`<option value="${k}" ${k===mbeType?"selected":""}>${v.icon} ${v.name}</option>`).join("")}</select></label>
      <label class="fld">Especialidad<select id="dSpec">${SPECS.map(s=>`<option>${s}</option>`).join("")}</select></label></div>
    <label class="fld">Título del estudio, guía o revisión<input type="text" id="dTitle" placeholder="p. ej. PARADIGM-HF"></label>
    ${b.labels.map((l,i)=>`<label class="fld">${esc(l)}<textarea id="dF${i}" rows="2"></textarea></label>`).join("")}
    <label class="fld">Perla de examen o “no hacer”<textarea id="dF3" rows="2"></textarea></label>
    <div class="row"><button class="btn primary" id="dSave">💾 Guardar ficha</button><button class="btn ghost sm" id="dEx">Usar el ejemplo</button></div>`;
  $("#dType").onchange = ()=>{ mbeType = $("#dType").value; renderMbe(); };
  $("#dEx").onclick = ()=>{ $("#dTitle").value = b.ex.title; b.ex.grid.slice(0,3).forEach(([k,v],i)=>{ $("#dF"+i).value = `${k}: ${v}`; }); $("#dF3").value = b.ex.take; };
  $("#dSave").onclick = ()=>{
    const title = $("#dTitle").value.trim(), f = [0,1,2,3].map(i=>$("#dF"+i).value.trim());
    if (!title || !f.some(Boolean)) return toast("Escribe al menos el título y un campo.");
    S.notes.unshift({id: "n"+Date.now().toString(36), type: mbeType, spec: $("#dSpec").value, title, labels: [...b.labels, "Perla o “no hacer”"], f, at: Date.now()});
    save(); renderDistill(); renderNotes(); toast("Ficha guardada ✓");
  };
}
function calcRR(){
  const cer = parseFloat($("#cCer").value), eer = parseFloat($("#cEer").value), out = $("#cOut");
  if (!(cer>0 && cer<=100 && eer>=0 && eer<=100)) { out.innerHTML = `<p class="xs muted" style="margin:0">Escribe porcentajes entre 0 y 100 (el del grupo control mayor que 0).</p>`; return; }
  const rr = eer/cer, rrr = (1-rr)*100, arr = cer-eer, nn = arr!==0 ? Math.ceil(100/Math.abs(arr)) : Infinity;
  out.innerHTML = `<div class="calcres"><div><span>RR</span><b>${rr.toFixed(2)}</b></div><div><span>RRR</span><b>${rrr.toFixed(0)} %</b></div><div><span>RRA</span><b>${arr.toFixed(1)} %</b></div><div><span>${arr<0?"NNH":"NNT"}</span><b>${isFinite(nn)?nn:"∞"}</b></div></div>
    <p class="small" style="margin:8px 0 0">${arr>0 ? `✅ Por cada <b>${nn}</b> pacientes tratados se evita un evento.` : arr<0 ? `⚠️ La intervención aumenta los eventos: por cada <b>${nn}</b> tratados aparece uno más (NNH).` : "➖ Sin diferencia entre los grupos (RR = 1)."}</p>`;
}
function calcDx(){
  const v = id => Math.max(0, parseInt($(id).value) || 0);
  const vp = v("#dVP"), fp = v("#dFP"), fn = v("#dFN"), vn = v("#dVN"), out = $("#dOut");
  const pct = (a,b) => b ? (a/b*100).toFixed(1)+" %" : "—";
  const sen = vp+fn ? vp/(vp+fn) : null, spe = fp+vn ? vn/(fp+vn) : null;
  const lrp = sen!=null && spe!=null && spe<1 ? (sen/(1-spe)).toFixed(1) : "—", lrn = sen!=null && spe ? ((1-sen)/spe).toFixed(2) : "—";
  out.innerHTML = `<div class="calcres six"><div><span>Sensibilidad</span><b>${pct(vp,vp+fn)}</b></div><div><span>Especificidad</span><b>${pct(vn,fp+vn)}</b></div><div><span>VPP</span><b>${pct(vp,vp+fp)}</b></div><div><span>VPN</span><b>${pct(vn,fn+vn)}</b></div><div><span>LR+</span><b>${lrp}</b></div><div><span>LR−</span><b>${lrn}</b></div></div>
    <p class="xs muted" style="margin:8px 0 0">Prevalencia en la muestra: ${pct(vp+fn, vp+fp+fn+vn)}. Recuerda: alta sensibilidad descarta (SnNout), alta especificidad confirma (SpPin), y los valores predictivos cambian con la prevalencia.</p>`;
}
["#cCer","#cEer"].forEach(q=>$(q).oninput = calcRR);
["#dVP","#dFP","#dFN","#dVN"].forEach(q=>$(q).oninput = calcDx);


function renderNotes(){
  $("#mbeNotesN").textContent = S.notes.length;
  $("#mbeNotes").innerHTML = S.notes.length ? S.notes.map(n=>`
    <div class="srcitem"><div style="flex:1;min-width:0">
      <div class="row xs" style="gap:6px"><span class="tag">${MBE[n.type] ? MBE[n.type].icon + " " + esc(MBE[n.type].name) : ""}</span><span class="muted">${esc(n.spec)} · ${fmtDate(n.at)}</span></div>
      <div class="small" style="margin-top:4px"><b>${esc(n.title)}</b></div>
      <dl class="notedl">${n.f.map((v,i)=>v?`<div><dt>${esc(n.labels[i])}</dt><dd>${esc(v)}</dd></div>`:"").join("")}</dl>
      <div class="row" style="gap:6px;margin-top:6px">${n.hy ? `<span class="xs" style="color:var(--ok)">✓ Ficha high-yield creada</span>` : n.cards ? `<span class="xs" style="color:var(--ok)">✓ Ya está en tu repaso</span>` : `<button class="btn sm" data-nhy="${n.id}">💎 Crear ficha high-yield</button>`}<button class="btn ghost sm" data-ndel="${n.id}" style="color:var(--bad)">Borrar</button></div>
      <div id="nhyEd-${n.id}"></div>
    </div></div>`).join("") : `<p class="muted small" style="margin:0">Aún no tienes resúmenes. Cuando termines un estudio o una guía, resúmelo arriba en «📝 Resume lo que leíste» y conviértelo en una ficha high-yield.</p>`;
  document.querySelectorAll("[data-ndel]").forEach(b=>b.onclick=()=>{ S.notes = S.notes.filter(n=>n.id!==b.dataset.ndel); save(); renderNotes(); });
  document.querySelectorAll("[data-nhy]").forEach(b=>b.onclick=()=>{
    const n = S.notes.find(x=>x.id===b.dataset.nhy);
    hyEditor($("#nhyEd-"+n.id), {title: n.title, badge: MBE[n.type] ? MBE[n.type].name : "", spec: n.spec,
      rows: n.f.slice(0,3).map((v,i)=>v ? {label: n.labels[i], val: v} : null).filter(Boolean), trap: n.f[3] || "",
      heading: "💎 Ficha high-yield de esta lectura", flags: {manual: true, mbe: true}, onSave: ()=>{ n.hy = true; save(); renderNotes(); }});
  });
}
