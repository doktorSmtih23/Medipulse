// ===================================================================
// TALLER · CASOS DE ESTE DOCUMENTO
// ===================================================================
// Casos tipo examen hechos con el documento abierto. Se adaptan a lo que es el documento (guía, revisión o
// estudio original) y al tema elegido en el índice: tipos de caso propios de cada clase, cantidades
// propuestas según lo que la app encuentra sin IA (recomendaciones por grado, resultados con cifras) y las
// partes del índice que el usuario quiere cubrir. Las fichas se crean aparte, en «💎 Fichas».
// Este archivo es el dueño de las plantillas (S.tpls).

// Tipos de caso por clase de documento. «tipo» es el tipo de pregunta de la app (qKind) y «qtype» el formato.
const CASO_TIPOS = {
  guia: [
    {k: "conducta", t: "🩺 Conducta", d: "Qué hacer según las recomendaciones fuertes", tipo: "conducta", qtype: "caso",
      pide: "viñeta clínica cuya respuesta correcta es la conducta que el documento recomienda con más fuerza"},
    {k: "nohacer", t: "🚫 Lo que no se hace", d: "Distractores sacados de las recomendaciones en contra", tipo: "conducta", qtype: "caso",
      pide: "viñeta clínica en la que los distractores son conductas que el documento desaconseja o contraindica"},
    {k: "diagnostico", t: "🔎 Diagnóstico y algoritmo", d: "Qué prueba, en qué orden y con qué punto de corte", tipo: "diagnostico", qtype: "caso",
      pide: "viñeta clínica sobre qué prueba pedir, en qué orden o cómo interpretarla, según el algoritmo del documento"},
    {k: "umbrales", t: "📏 Umbrales y dosis", d: "Cifras exactas del documento", tipo: "datos", qtype: "caso",
      pide: "viñeta clínica cuya respuesta depende de un umbral, una dosis, una escala o un plazo exacto del documento"}
  ],
  revision: [
    {k: "conducta", t: "🩺 Conducta", d: "Tratamiento de primera línea y qué hacer si no responde", tipo: "conducta", qtype: "caso",
      pide: "viñeta clínica sobre el tratamiento de primera línea o qué hacer si no responde, según el documento"},
    {k: "diagnostico", t: "🔎 Diagnóstico", d: "Criterios, pruebas y en qué orden pedirlas", tipo: "diagnostico", qtype: "caso",
      pide: "viñeta clínica sobre los criterios diagnósticos o qué pruebas pedir y en qué orden"},
    {k: "diferenciales", t: "🔀 Diferenciales", d: "Lo que se confunde con este cuadro y cómo separarlo", tipo: "diagnostico", qtype: "caso",
      pide: "viñeta clínica cuyos distractores son los diagnósticos diferenciales que el documento menciona, con el dato que los separa"},
    {k: "datos", t: "📏 Datos duros", d: "Cifras del texto: frecuencias, tiempos, valores", tipo: "datos", qtype: "caso",
      pide: "viñeta clínica cuya respuesta depende de una cifra del documento (frecuencia, tiempo, valor o dosis)"}
  ],
  estudio: [
    {k: "diseno", t: "🔬 Diseño y sesgos", d: "Aleatorización, cegamiento, pérdidas, análisis por intención de tratar", tipo: "critica", qtype: "critica",
      pide: "pregunta de lectura crítica sobre el diseño del estudio y sus posibles sesgos"},
    {k: "resultados", t: "📊 Resultados con cifras", d: "Interpretar HR, IC 95 %, RRA y NNT del propio estudio", tipo: "critica", qtype: "critica",
      pide: "pregunta que pide interpretar un resultado del estudio con sus cifras (HR, RR, IC 95 %, RRA o NNT)"},
    {k: "aplicabilidad", t: "🩺 ¿Cambia tu conducta?", d: "Aplicabilidad: a quién sí y a quién no se le aplica", tipo: "critica", qtype: "caso",
      pide: "viñeta clínica de un paciente en la que hay que decidir si los resultados del estudio se le aplican"},
    {k: "sustituto", t: "⚖️ Desenlace sustituto", d: "Qué mide de verdad y qué no demuestra", tipo: "critica", qtype: "critica",
      pide: "pregunta sobre qué demuestra y qué no demuestra el desenlace principal del estudio"}
  ]
};
// El tipo de pregunta de la app para cada clase de caso que devuelve la IA.
const CASO_TIPO_DE = Object.fromEntries(Object.values(CASO_TIPOS).flat().map(x => [x.k, x.tipo]));
const CASO_CLASES = [...new Set(Object.values(CASO_TIPOS).flat().map(x => x.k))];

// Clase del documento: guía, estudio original o revisión (lo demás se trata como revisión).
function casosFamilia(s){
  const d = estDiseno(s);
  return d === "GPC" ? "guia" : ESTUDIO_PAPERS.includes(d) ? "estudio" : "revision";
}
// Lo que la app encuentra en el tema sin IA. Solo se muestra lo que hay (nada de «0 …»).
function casosHallazgos(fam, sel){
  if (fam === "estudio") { const n = resultadosConCifras(sel).length; return n ? [[n, n === 1 ? "resultado con cifras" : "resultados con cifras"]] : []; }
  const r = recsPorGrado(sel), cuenta = f => r.filter(f).length;
  return [[cuenta(x => x.grupo === "hace"), "recomendaciones «hacer»"], [cuenta(x => x.grupo === "no"), "«no hacer»"],
    [cuenta(x => x.grupo !== "res" && x.cifras && x.cifras.length), "con cifras o dosis"]].filter(x => x[0] > 0);
}
// Los tipos que se ofrecen y sus cantidades propuestas. «Lo que no se hace» solo si el tema tiene recomendaciones en contra.
function casosPropuesta(fam, sel){
  const r = fam === "estudio" ? [] : recsPorGrado(sel), n = g => r.filter(x => x.grupo === g).length;
  const tipos = CASO_TIPOS[fam].filter(x => x.k !== "nohacer" || n("no") > 0);
  const base = {conducta: fam === "guia" && n("hace") ? Math.min(4, Math.max(2, n("hace"))) : 3, nohacer: Math.min(2, n("no")), diagnostico: fam === "guia" ? 2 : 3,
    umbrales: r.some(x => x.cifras && x.cifras.length) ? 2 : 1, diferenciales: 2, datos: 2,
    diseno: 2, resultados: fam === "estudio" && resultadosConCifras(sel).length ? 2 : 1, aplicabilidad: 2, sustituto: 1};
  const cant = Object.fromEntries(tipos.map(x => [x.k, base[x.k]]));
  // El enfoque de estudio del usuario suma un caso al primer tipo que le corresponde.
  const f = tipos.find(x => x.tipo === S.focus); if (f) cant[f.k]++;
  return {tipos, cant};
}
// Las partes del índice dentro del tema elegido (o las secciones principales si es todo el documento).
function casosPartes(){
  const s = cur(), items = (s && s.indice && s.indice.items) || [], t = temaActual();
  const dentro = t ? items.filter(x => x !== t && x.from >= t.from && x.from <= (t.to || t.from) && (x.lvl || 1) > (t.lvl || 1))
    : items.filter(x => (x.lvl || 1) === 1);
  return [...new Set(dentro.map(x => x.title.trim()).filter(Boolean))].slice(0, 12);
}

// Estado de la sección: se recalcula cuando cambia el documento o el tema.
function casosEstado(){
  const s = cur(), sel = temaSel(), clave = `${s.id}|${sel ? sel.a + "-" + sel.b : ""}|${gen.tema}`;
  if (gen.casos && gen.casos.clave === clave) return gen.casos;
  const fam = casosFamilia(s), p = sel ? casosPropuesta(fam, sel) : {tipos: CASO_TIPOS[fam], cant: {}};
  const partes = casosPartes();
  gen.casos = {clave, fam, sel, tipos: p.tipos, cant: p.cant, hallazgos: sel ? casosHallazgos(fam, sel) : [], partes, partesOn: new Set(partes)};
  return gen.casos;
}
const casosTotal = c => c.tipos.reduce((a, x) => a + (c.cant[x.k] || 0), 0);

function casosHTML(){
  const s = cur(), c = casosEstado(), tpls = S.tpls || [], total = casosTotal(c), t = temaActual();
  const paso = x => `<div class="ct"><span><b>${x.t}</b><small>${esc(x.d)}</small></span>
    <div class="step"><button class="btn sm" data-cmenos="${x.k}" aria-label="Menos">−</button><output>${c.cant[x.k] || 0}</output><button class="btn sm" data-cmas="${x.k}" aria-label="Más">+</button></div></div>`;
  return `<div class="autobox stack" id="casosBox">
    <div><b>🩺 Casos de este documento</b> <span class="tag">${esc(DESIGNS[estDiseno(s)] || "📄 Documento")}</span>
      <p class="xs muted" style="margin:4px 0 0">La IA arma casos tipo examen solo con lo que dice este texto, con la página de cada dato. Tú revisas todo antes de guardar.</p></div>
    <div class="basado">📍 <b>Basado en:</b> ${esc(t ? t.title : "Todo el documento")}${c.sel ? ` · ${pagesLabel(c.sel)}` : ""} <button class="linkbtn xs" id="cTema">Cambiar el tema</button></div>
    ${c.hallazgos.length ? `<div><div class="fld" style="margin-bottom:6px">Lo que encontré en el tema <span class="xs muted">(sin IA, gratis)</span></div>
      <div class="hall">${c.hallazgos.map(([n, txt]) => `<div><b>${n}</b><span>${esc(txt)}</span></div>`).join("")}</div></div>` : ""}
    <div><div class="fld" style="margin-bottom:6px">Casos que te propongo <span class="xs muted">· ajusta las cantidades</span></div>
      <div class="stack" style="gap:8px">${c.tipos.map(paso).join("")}</div></div>
    ${c.partes.length >= 2 ? `<div><div class="fld" style="margin-bottom:6px">Partes del documento que quieres cubrir</div>
      <div class="chips">${c.partes.map((p, i) => `<button class="chip2${c.partesOn.has(p) ? " on" : ""}" data-cparte="${i}">${esc(p)}</button>`).join("")}</div></div>` : ""}
    <div><div class="fld" style="margin-bottom:6px">Dificultad</div><div class="chips">${LEVELS.map(([k, l, d]) => `<button class="chip2${gen.level === k ? " on" : ""}" data-lv="${k}" title="${esc(d)}">${l}</button>`).join("")}</div></div>
    <details class="custom" id="cMas" ${gen.casosMas ? "open" : ""}><summary>Más opciones: idioma, instrucciones, plantillas</summary><div class="stack" style="margin-top:10px">
      ${tpls.length ? `<div class="row" style="gap:6px"><span class="xs muted">Mis plantillas:</span>${tpls.map((x, i) => `<button class="chip2" data-tpl="${i}">${esc(x.name)}</button>`).join("")}</div>` : ""}
      <div class="grid2">
        <label class="fld">Idioma de los casos<select id="gLang"><option value="es" ${gen.lang === "es" ? "selected" : ""}>Español (conserva los términos técnicos)</option><option value="en" ${gen.lang === "en" ? "selected" : ""}>Inglés</option></select></label>
        <label class="fld">Etiqueta del tema (opcional)<input type="text" id="gLabel" value="${esc(gen.label)}" placeholder="p. ej. Neurología · Parkinson"></label>
      </div>
      <label class="fld">Instrucciones adicionales (opcional)<textarea id="gInstr" rows="3" placeholder="p. ej. «Pregúntame como en el examen de la UdeA», «incluye un caso en embarazo»">${esc(gen.instr)}</textarea></label>
      <div class="row" style="gap:6px"><button class="btn ghost sm" id="gSaveTpl">💾 Guardar como plantilla</button>${tpls.length ? `<button class="btn ghost sm" id="gDelTpl">🗑 Borrar plantillas</button>` : ""}</div>
    </div></details>
    <div id="cEst" class="xs muted"></div>
    <button class="btn primary block" id="cGo" ${genBusy || !getKey() || !total ? "disabled" : ""}>🩺 Crear ${total} caso${total === 1 ? "" : "s"}</button>
    <div id="cStatus" class="small"></div>
  </div>`;
}
function casosEstimar(){
  const el = $("#cEst"), c = gen.casos; if (!el || !c) return;
  if (!c.sel) { el.innerHTML = `<span style="color:var(--bad)">No encuentro el texto en este dispositivo. Vuelve a agregar la fuente.</span>`; return; }
  const chars = c.sel.pages.reduce((x, p) => x + p.length, 0), n = casosTotal(c);
  if (chars > MAX_AI_CHARS) { el.innerHTML = `<span style="color:var(--bad)">Es demasiado texto para una sola vez. Elige un tema del índice.</span>`; return; }
  el.textContent = `${n} caso${n === 1 ? "" : "s"} · costo aprox. ${aiEstimateLine(chars, {outTokens: n * 700 + 4000})} (se cobra a tu cuenta de Anthropic).`;
}
function bindCasos(){
  const box = $("#casosBox"); if (!box) return;
  const c = gen.casos, refrescar = () => renderAiTab();
  box.querySelectorAll("[data-cmas]").forEach(b => b.onclick = () => { const k = b.dataset.cmas; c.cant[k] = Math.min(10, (c.cant[k] || 0) + 1); refrescar(); });
  box.querySelectorAll("[data-cmenos]").forEach(b => b.onclick = () => { const k = b.dataset.cmenos; c.cant[k] = Math.max(0, (c.cant[k] || 0) - 1); refrescar(); });
  box.querySelectorAll("[data-cparte]").forEach(b => b.onclick = () => { const p = c.partes[+b.dataset.cparte]; c.partesOn.has(p) ? c.partesOn.delete(p) : c.partesOn.add(p); b.classList.toggle("on"); });
  box.querySelectorAll("[data-lv]").forEach(x => x.onclick = () => { gen.level = x.dataset.lv; box.querySelectorAll("[data-lv]").forEach(y => y.classList.toggle("on", y === x)); });
  $("#cTema").onclick = () => { const i = document.querySelector("#genCard details"); if (i) { i.open = true; i.scrollIntoView({behavior: "smooth", block: "center"}); } };
  $("#cMas").ontoggle = () => { gen.casosMas = $("#cMas").open; };
  $("#gLang").onchange = () => { gen.lang = $("#gLang").value; };
  $("#gLabel").oninput = () => { gen.label = $("#gLabel").value; };
  $("#gInstr").oninput = () => { gen.instr = $("#gInstr").value; };
  box.querySelectorAll("[data-tpl]").forEach(x => x.onclick = () => { const t = S.tpls[+x.dataset.tpl];
    Object.assign(gen, JSON.parse(JSON.stringify({level: t.level || gen.level, lang: t.lang || gen.lang, instr: t.instr || "", label: t.label || ""})));
    if (t.casos && t.fam === c.fam) Object.keys(c.cant).forEach(k => { if (t.casos[k] != null) c.cant[k] = t.casos[k]; });
    refrescar(); toast(`Plantilla «${t.name}» aplicada`); });
  $("#gSaveTpl").onclick = () => {
    const name = prompt("Nombre de la plantilla", gen.label || "Mi plantilla"); if (!name || !name.trim()) return;
    S.tpls = (S.tpls || []).filter(t => t.name !== name.trim());
    S.tpls.push(JSON.parse(JSON.stringify({name: name.trim(), fam: c.fam, casos: c.cant, level: gen.level, lang: gen.lang, instr: gen.instr, label: gen.label})));
    save(); refrescar(); toast("Plantilla guardada ✓");
  };
  $("#gDelTpl") && ($("#gDelTpl").onclick = () => { if (confirm("¿Borrar todas tus plantillas?")) { S.tpls = []; save(); refrescar(); } });
  $("#cGo").onclick = runCasos;
  casosEstimar();
}
// Lo que se le pide a la IA: cuántos casos de cada clase, qué partes cubrir, dificultad, idioma e instrucciones.
function casosAsk(c){
  const lv = LEVELS.find(l => l[0] === gen.level) || LEVELS[1], t = temaActual();
  const partes = c.partes.filter(p => c.partesOn.has(p));
  return [
    `Documento: ${DESIGNS[estDiseno(cur())] || "documento"}.`,
    t ? `Tema: ${t.title}. Pregunta solo sobre este tema.` : "Tema: el contenido de las páginas entregadas.",
    "Genera solo casos (deja \"fichas\" vacío). Cantidad por clase; en \"clase\" pon la clave indicada:",
    ...c.tipos.filter(x => c.cant[x.k] > 0).map(x => `- ${c.cant[x.k]} de clase "${x.k}" (qtype "${x.qtype}"): ${x.pide}.`),
    partes.length && partes.length < c.partes.length ? `Reparte los casos entre estas partes del documento: ${partes.join("; ")}.` : "",
    `Dificultad: ${lv[1]} (${lv[2]}).`,
    gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos del documento tal como aparecen.",
    gen.instr.trim() ? `Instrucciones del médico: ${gen.instr.trim()}` : ""
  ].filter(Boolean).join("\n") + focusLine();
}
async function runCasos(){
  if (genBusy) return;
  const st = $("#cStatus"), s = cur(), c = gen.casos;
  if (!getKey()) { toast("Primero guarda tu clave de API en Fuentes."); return go("lib"); }
  if (!c || !c.sel) return st.innerHTML = `<span style="color:var(--bad)">No encuentro el texto en este dispositivo. Vuelve a agregar la fuente.</span>`;
  const chars = c.sel.pages.reduce((x, p) => x + p.length, 0);
  if (chars < 200) return st.innerHTML = `<span style="color:var(--bad)">Esas páginas no tienen texto que se pueda leer.</span>`;
  if (chars > MAX_AI_CHARS) return st.innerHTML = `<span style="color:var(--bad)">Demasiado texto: elige un tema del índice.</span>`;
  if (!casosTotal(c)) return st.innerHTML = `<span style="color:var(--bad)">Pide al menos un caso.</span>`;
  genBusy = true; $("#cGo").disabled = true;
  try {
    st.innerHTML = `<span class="spin"></span> Claude está leyendo las ${pagesLabel(c.sel)} y redactando los casos. Puede tardar 1–3 minutos; no cierres la app.`;
    cands = await aiGenerate(c.sel, s.title, casosAsk(c));
    st.innerHTML = cands.length ? "" : `<span style="color:var(--warn)">La IA no encontró suficiente información para esos casos en este tema.</span>`;
  } catch(err) {
    st.innerHTML = `<span style="color:var(--bad)">${esc(err.userMsg || ("No se pudo generar: " + (err.message || err)))}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button>`;
  } finally { genBusy = false; const b = $("#cGo"); if (b) b.disabled = false; }
  renderReview();
  if (cands && cands.length) $("#reviewBox").scrollIntoView({behavior: "smooth", block: "start"});
}
