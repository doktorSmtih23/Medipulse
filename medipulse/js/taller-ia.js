// ===================================================================
// TALLER · GENERAR CON IA
// ===================================================================
// Fichas automáticas, IA a tu medida (plantillas, tipos, dificultad), verificación de citas y la llamada a la IA.
// ---------- 🤖 IA a tu medida ----------
const QTYPES = [["caso","🩺 Casos clínicos","Viñeta tipo examen con 4 opciones"],["critica","🔬 Lectura crítica","Diseño, resultados, sesgos y aplicabilidad del estudio"],["directa","❓ Preguntas directas","Enunciado corto, sin caso clínico"],["ficha","💎 Fichas high-yield","Título, datos clave, bandera roja y trampa"]];
const LEVELS = [["basica","Básica","conceptos y definiciones"],["residencia","Examen de residencia","aplicación clínica y distractores plausibles"],["avanzada","Avanzada","subespecialidad: detalles finos, matices y controversias"]];
const EMPH = [["fisio","Mecanismo y fisiopatología"],["dx","Diagnóstico"],["tx","Tratamiento y dosis"],["result","Resultados y cifras del estudio"],["safety","Seguridad y efectos adversos"],["design","Diseño, sesgos y validez"],["pearls","Perlas y trampas de examen"]];
function renderAiTab(){
  const b = $("#gBody"), tpls = S.tpls || [];
  b.innerHTML = `
    ${getKey() ? "" : `<div class="warnbox small">Para generar con IA necesitas una clave de API. <button class="linkbtn" data-go="guide">Cómo conseguirla</button>. Mientras tanto, usa <b>📖 Leer y crear</b>.</div>`}
    ${focusOf().k !== "mixto" ? `<p class="xs" style="margin:0">🎯 <b>Tu enfoque: ${esc(focusOf().t)}.</b> La IA prioriza ese tipo en todo lo que crea, y las cantidades de abajo ya vienen ajustadas. Cámbialo en Hoy.</p>` : ""}
    <div class="autobox stack">
      <div><b>✨ Fichas automáticas</b><p class="xs muted" style="margin:4px 0 0">La IA lee el documento, decide qué es lo más relevante para tu examen y arma las fichas ordenadas por importancia, con el porqué de cada una. Tú solo revisas y guardas.</p></div>
      <div class="grid2"><label class="fld">Cuántas fichas<select id="aCount"><option value="auto">La IA decide (recomendado)</option><option>5</option><option>10</option><option>15</option></select></label></div>
      <label class="fld">Prioriza (opcional)<input type="text" id="aFocus" placeholder="p. ej. resultados de los ensayos y efectos adversos"></label>
      <div id="aEst" class="xs muted"></div>
      <button class="btn primary block" id="aGo" ${genBusy || !getKey() ? "disabled" : ""}>✨ Crear fichas automáticas</button>
      <div id="aStatus" class="small"></div>
    </div>
    <details class="custom" id="gCustomBox" ${gen.customOpen ? "open" : ""}><summary>⚙️ Personalizar: tema, tipos de pregunta, dificultad, enfoque…</summary><div class="stack" style="margin-top:12px">
    ${tpls.length ? `<div class="row" style="gap:6px"><span class="xs muted">Mis plantillas:</span>${tpls.map((t,i)=>`<button class="chip2" data-tpl="${i}">${esc(t.name)}</button>`).join("")}</div>` : ""}
    <div><div class="fld" style="margin-bottom:6px">¿Qué quieres que te pregunte? (cantidad de cada tipo)</div>
      <div class="qtypes">${QTYPES.map(([k,l,d])=>`<label class="qt"><span><b>${l}</b><small>${d}</small></span><input type="number" min="0" max="20" data-cnt="${k}" value="${gen.counts[k]}" aria-label="${l}"></label>`).join("")}</div></div>
    <div><div class="fld" style="margin-bottom:6px">Dificultad</div><div class="chips">${LEVELS.map(([k,l,d])=>`<button class="chip2${gen.level===k?" on":""}" data-lv="${k}" title="${d}">${l}</button>`).join("")}</div></div>
    <div><div class="fld" style="margin-bottom:6px">Enfoque (elige uno o varios)</div><div class="chips">${EMPH.map(([k,l])=>`<button class="chip2${gen.emph.includes(k)?" on":""}" data-em="${k}">${l}</button>`).join("")}</div></div>
    <div class="grid2">
      <label class="fld">Idioma de las preguntas<select id="gLang"><option value="es" ${gen.lang==="es"?"selected":""}>Español (conserva los términos técnicos)</option><option value="en" ${gen.lang==="en"?"selected":""}>Inglés</option></select></label>
      <label class="fld">Etiqueta del tema (opcional)<input type="text" id="gLabel" value="${esc(gen.label)}" placeholder="p. ej. Neurología · Parkinson"></label>
    </div>
    <label class="fld">Instrucciones adicionales (opcional)<textarea id="gInstr" rows="3" placeholder="p. ej. “Pregúntame como en el examen de la UdeA”, “enfócate en los ensayos con AAV2-GAD”, “incluye una pregunta sobre por qué falló el ensayo fase III”">${esc(gen.instr)}</textarea></label>
    <div class="row" style="gap:6px"><button class="btn ghost sm" id="gSaveTpl">💾 Guardar como plantilla</button>${tpls.length ? `<button class="btn ghost sm" id="gDelTpl">🗑 Borrar plantillas</button>` : ""}</div>
    <div id="gEst" class="xs muted"></div>
    <button class="btn primary block" id="gGo" ${genBusy || !getKey() ? "disabled" : ""}>Generar con IA</button>    <div id="gStatus" class="small"></div></div></details>`;
  b.querySelectorAll("[data-cnt]").forEach(i=>i.oninput = ()=>{ gen.counts[i.dataset.cnt] = Math.max(0, Math.min(20, parseInt(i.value)||0)); updEstimate(); });
  b.querySelectorAll("[data-lv]").forEach(x=>x.onclick = ()=>{ gen.level = x.dataset.lv; b.querySelectorAll("[data-lv]").forEach(y=>y.classList.toggle("on", y===x)); });
  b.querySelectorAll("[data-em]").forEach(x=>x.onclick = ()=>{ const k = x.dataset.em, i = gen.emph.indexOf(k); i>=0 ? gen.emph.splice(i,1) : gen.emph.push(k); x.classList.toggle("on", i<0); });
  $("#gLang").onchange = ()=>{ gen.lang = $("#gLang").value; };
  $("#gLabel").oninput = ()=>{ gen.label = $("#gLabel").value; };
  $("#gInstr").oninput = ()=>{ gen.instr = $("#gInstr").value; };
  b.querySelectorAll("[data-tpl]").forEach(x=>x.onclick = ()=>{ const t = S.tpls[+x.dataset.tpl]; Object.assign(gen, JSON.parse(JSON.stringify({counts: t.counts, level: t.level, emph: t.emph, lang: t.lang, instr: t.instr, label: t.label})));
    if (gen.counts.ficha == null) { gen.counts.ficha = gen.counts.tarjeta || 0; delete gen.counts.tarjeta; } renderAiTab(); toast(`Plantilla “${t.name}” aplicada`); });
  $("#gSaveTpl").onclick = ()=>{
    const name = prompt("Nombre de la plantilla", gen.label || "Mi plantilla"); if (!name || !name.trim()) return;
    S.tpls = (S.tpls || []).filter(t=>t.name !== name.trim());
    S.tpls.push(JSON.parse(JSON.stringify({name: name.trim(), counts: gen.counts, level: gen.level, emph: gen.emph, lang: gen.lang, instr: gen.instr, label: gen.label})));
    save(); renderAiTab(); toast("Plantilla guardada ✓");
  };
  $("#gDelTpl") && ($("#gDelTpl").onclick = ()=>{ if (confirm("¿Borrar todas tus plantillas?")) { S.tpls = []; save(); renderAiTab(); } });
  $("#gGo").onclick = runGenerate;
  bindAuto();
  updEstimate();
}
const autoSel = () => temaSel();
function estAuto(){
  const el = $("#aEst"); if (!el) return;
  const sel = autoSel(); if (!sel) { el.textContent = ""; return; }
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars > MAX_AI_CHARS) { el.innerHTML = `<span style="color:var(--bad)">El documento es muy largo para leerlo completo de una vez. Elige un tema del índice.</span>`; return; }
  el.textContent = `${pagesLabel(sel)} · costo aprox. ${aiEstimateLine(chars, {outTokens: 12*400 + 6000})} (se cobra a tu cuenta de Anthropic).`;
}
function bindAuto(){
  $("#aCount").value = gen.aCount || "auto"; $("#aFocus").value = gen.aFocus || "";
  $("#aCount").onchange = ()=>{ gen.aCount = $("#aCount").value; };
  $("#aFocus").oninput = ()=>{ gen.aFocus = $("#aFocus").value; };
  $("#gCustomBox").ontoggle = ()=>{ gen.customOpen = $("#gCustomBox").open; };
  $("#aGo").onclick = runAuto;
  estAuto();
}
async function runAuto(){
  if (genBusy) return;
  const st = $("#aStatus"), s = cur();
  if (!getKey()) { toast("Primero guarda tu clave de API en Fuentes."); return go("lib"); }
  const sel = autoSel();
  if (!sel) return st.innerHTML = `<span style="color:var(--bad)">No encuentro el texto en este dispositivo. Vuelve a agregar la fuente.</span>`;
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars < 200) return st.innerHTML = `<span style="color:var(--bad)">El documento no tiene texto que se pueda leer.</span>`;
  if (chars > MAX_AI_CHARS) return st.innerHTML = `<span style="color:var(--bad)">Es demasiado texto: elige un tema del índice.</span>`;
  genBusy = true; $("#aGo").disabled = true;
  try {
    st.innerHTML = `<span class="spin"></span> Claude está leyendo las ${pagesLabel(sel)} y eligiendo lo más relevante para tu examen. Puede tardar 1–3 minutos; no cierres la app.`;
    cands = await aiGenerate(sel, s.title, autoAsk({count: gen.aCount || "auto", focus: gen.aFocus || ""}));
    st.innerHTML = cands.length ? "" : `<span style="color:var(--warn)">La IA no encontró información high-yield en ese texto.</span>`;
  } catch(err) {
    st.innerHTML = `<span style="color:var(--bad)">${esc(err.userMsg || ("No se pudo generar: " + (err.message || err)))}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button>`;
  } finally { genBusy = false; const b = $("#aGo"); if (b) b.disabled = false; }
  renderReview();
  if (cands && cands.length) $("#reviewBox").scrollIntoView({behavior:"smooth", block:"start"});
}
function updEstimate(){
  const el = $("#gEst"); if (!el) return;
  const sel = selectedText(); if (!sel) { el.textContent = ""; return; }
  const chars = sel.pages.reduce((x,p)=>x+p.length, 0);
  if (chars < 200) { el.innerHTML = `<span style="color:var(--warn)">Esas páginas casi no tienen texto seleccionable (¿PDF escaneado o solo imágenes?).</span>`; return; }
  if (gen.tab === "ai") {
    if (chars > MAX_AI_CHARS) { el.innerHTML = `<span style="color:var(--bad)">Es demasiado texto para una sola vez (${Math.round(chars/1000)} mil caracteres). Elige menos páginas o un tema más concreto.</span>`; return; }
    const c = gen.counts, nq = c.caso + c.critica + c.directa, est = aiEstimateLine(chars, {outTokens: nq*700 + c.ficha*400 + 4000});
    el.textContent = `${pagesLabel(sel)} · ${nq} preguntas y ${c.ficha} fichas · costo aprox. ${est} (se cobra a tu cuenta de Anthropic).`;
  } else el.textContent = `${pagesLabel(sel)} · ${Math.round(chars/1000)} mil caracteres para analizar.`;
}

// ¿La cita está en el documento? Se comparan solo letras y números (el PDF parte palabras, cambia
// espacios o intercala números de referencia). Si no está completa, basta con que aparezcan casi todos
// sus tramos de 5 palabras.
const soloLetras = t => String(t).toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");
function citaEnTexto(cita, texto){
  const T = soloLetras(texto), c = soloLetras(cita);
  if (c.length < 12) return false;
  if (T.includes(c)) return true;
  const w = String(cita).split(/\s+/).filter(Boolean); if (w.length < 6) return false;
  const tramos = []; for (let i = 0; i + 5 <= w.length; i += 3) tramos.push(soloLetras(w.slice(i, i + 5).join(" ")));
  return tramos.filter(t => T.includes(t)).length / tramos.length >= 0.8;
}
// Frases copiadas tal cual del documento que respaldan el ítem, con su página. La app comprueba que estén en el PDF.
const CITAS_T = {type:"array", items:{type:"object", additionalProperties:false, required:["texto","page"], properties:{texto:{type:"string"}, page:{type:"integer"}}}};
const GEN_SCHEMA = {
  type:"object", additionalProperties:false, required:["questions","fichas"],
  properties:{
    questions:{type:"array", items:{type:"object", additionalProperties:false,
      required:["qtype","specialty","area","topic","vignette","options","correct","whyCorrect","pearl","trap","page","citas"],
      properties:{qtype:{type:"string", enum:["caso","critica","directa"]}, specialty:{type:"string", enum:SPECS}, area:{type:"string"}, topic:{type:"string"}, vignette:{type:"string"}, citas:CITAS_T,
        options:{type:"array", items:{type:"string"}}, correct:{type:"integer"}, whyCorrect:{type:"string"},
        pearl:{type:"string"}, trap:{type:"string"}, page:{type:"integer"}}}},
    fichas:{type:"array", items:{type:"object", additionalProperties:false, required:["specialty","area","title","badge","thresholds","redFlag","trap","relevance","why","page","citas"],
      properties:{specialty:{type:"string", enum:SPECS}, area:{type:"string"}, title:{type:"string"}, badge:{type:"string"}, citas:CITAS_T,
        thresholds:{type:"array", items:{type:"object", additionalProperties:false, required:["label","val"], properties:{label:{type:"string"}, val:{type:"string"}}}},
        redFlag:{type:"string"}, trap:{type:"string"}, relevance:{type:"integer"}, why:{type:"string"}, page:{type:"integer"}}}}
  }
};
const GEN_SYSTEM = `Eres un profesor de medicina que prepara a médicos para el examen de residencia y para su práctica. Redactas preguntas a partir de un documento que te entrega el médico: puede ser una guía, un artículo original, un ensayo clínico, una revisión o sus apuntes.

Reglas:
- Usa solo información que aparezca en el documento. No agregues datos de otras fuentes. Si el texto no alcanza para la cantidad pedida, genera menos ítems.
- Respeta exactamente el tema, los tipos, las cantidades, la dificultad, el enfoque, el idioma y las instrucciones que pida el médico. Sus instrucciones tienen prioridad sobre tus preferencias de estilo.
- En "page" indica la página de donde sale cada ítem, según las marcas [pág. N] del documento.
- Cada pregunta tiene "qtype":
  - "caso": viñeta clínica breve y realista (edad, sexo, cuadro y datos clave) que termina en una pregunta.
  - "critica": pregunta de lectura crítica sobre el estudio del documento (diseño, población, intervención, desenlaces, resultados con sus cifras, sesgos, validez y aplicabilidad). El enunciado puede citar el estudio.
  - "directa": enunciado corto de conocimiento, sin caso clínico.
  El enunciado va en "vignette". Exactamente 4 opciones plausibles y una sola correcta; "correct" es el índice (0 a 3) de la correcta. Reparte la posición de la respuesta correcta. "whyCorrect" explica en 2 a 4 frases por qué es la correcta y por qué fallan las otras. "pearl" es el dato para memorizar. "trap" es el error típico. "topic" es el tema en pocas palabras.
- Fichas high-yield: "title" es el tema concreto de la ficha (que se entienda sin leer el documento); "badge" una etiqueta corta (p. ej. "Ensayo fase II", "Umbral", "Algoritmo"); "thresholds" de 2 a 4 datos clave, cada uno con "label" (qué es, corto) y "val" (el dato exacto: cifra, dosis, criterio, fármaco o resultado); "redFlag" la señal de alarma o el hallazgo que no se puede pasar por alto (vacío si no aplica); "trap" el error típico o el distractor favorito (vacío si no aplica); "relevance" de 1 a 5 según qué tan probable es que se pregunte en el examen o cambie la conducta clínica (5 = imprescindible); "why" una frase que explique por qué es high-yield.
- Qué es high-yield: umbrales y puntos de corte, criterios diagnósticos, tratamiento de primera línea y dosis, contraindicaciones, banderas rojas, resultados principales de los estudios con sus cifras, y lo que cambió frente a la práctica o la guía anterior. No es high-yield: autores, financiación, detalles metodológicos menores, antecedentes históricos ni datos que no cambian decisiones.
- No hagas preguntas sobre autores, revistas, financiación ni la estructura del documento, salvo que el médico lo pida.
- "specialty" es la más cercana de la lista permitida; "area" es la especialidad o subespecialidad real del tema (p. ej. Neurología, Psiquiatría, Infectología, Dermatología).
- "citas": de 1 a 3 frases copiadas textualmente del documento, sin cambiar ni una palabra (máximo 300 caracteres cada una), que respalden los datos del ítem; cada una con su "page". Si el ítem junta datos de varias páginas, incluye una cita de cada página. "page" es la página principal.
- "whyCorrect", "pearl", "trap", "why" y "redFlag" también deben salir del documento. Si el documento no menciona una trampa, una bandera roja o por qué algo es importante, deja ese campo vacío: no lo completes con conocimiento propio.
- Texto plano, sin markdown ni LaTeX.`;
// Petición para que la IA elija por sí misma lo más relevante
function autoAsk(o){
  o = o || {};
  const lang = gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos del documento tal como aparecen.";
  let what;
  if (o.fragment) what = `El médico seleccionó este fragmento de la pág. ${o.page}: «${o.fragment.slice(0, 1500)}».\nCrea 1 ficha high-yield centrada en ese fragmento; complétala con los datos relevantes de la misma página que lo expliquen o le den contexto. Si el fragmento no tiene nada relevante, usa lo más relevante de la página.`;
  else if (o.page) what = `Analiza esta página y crea entre 1 y 4 fichas high-yield con lo más relevante, según cuánta información importante tenga (no rellenes).`;
  else what = `Analiza todo el documento y decide qué información es high-yield. Crea ${o.count && o.count !== "auto" ? `${o.count} fichas high-yield (o menos si no hay suficiente información relevante)` : "entre 3 y 12 fichas high-yield, según cuánta información relevante tenga el documento (no rellenes)"}. Cada ficha agrupa datos de un mismo tema; ordénalas de mayor a menor relevancia.`;
  return [what, "No generes preguntas (deja \"questions\" vacío).", o.focus && o.focus.trim() ? `El médico pide priorizar: ${o.focus.trim()}.` : "", lang].filter(Boolean).join("\n") + focusLine();
}
function genAsk(){
  const c = gen.counts, lv = LEVELS.find(l=>l[0]===gen.level), em = EMPH.filter(e=>gen.emph.includes(e[0])).map(e=>e[1].toLowerCase());
  const lines = [
    gen.topic.trim() ? `Tema: ${gen.topic.trim()}. Pregunta solo sobre este tema.` : "Tema: el contenido de las páginas entregadas.",
    "Genera:",
    c.caso ? `- ${c.caso} preguntas con qtype "caso".` : "", c.critica ? `- ${c.critica} preguntas con qtype "critica".` : "", c.directa ? `- ${c.directa} preguntas con qtype "directa".` : "",
    c.ficha ? `- ${c.ficha} fichas high-yield.` : "- Ninguna ficha (deja \"fichas\" vacío).",
    (c.caso + c.critica + c.directa) ? "" : "- Ninguna pregunta (deja \"questions\" vacío).",
    `Dificultad: ${lv[1]} (${lv[2]}).`,
    em.length ? `Enfoque: ${em.join(", ")}.` : "",
    gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos del documento (genes, vectores, fármacos, escalas) tal como aparecen.",
    gen.instr.trim() ? `Instrucciones del médico: ${gen.instr.trim()}` : ""
  ];
  return lines.filter(Boolean).join("\n") + focusLine();
}
// Preguntas y ficha a partir de una imagen (recorte de la página o captura subida).
function aiGenerateImage(dataUrl, ctx){
  const ask = [`El médico eligió esta imagen${ctx.page ? ` de la pág. ${ctx.page}` : ""} del documento: puede ser un algoritmo, una tabla, una gráfica o una figura.`,
    "Crea 1 ficha high-yield con lo que muestra la imagen y hasta 2 preguntas (qtype \"caso\" o \"directa\") que evalúen entenderla y aplicarla; el estudiante verá la imagen junto a la pregunta.",
    "Usa solo lo que se ve en la imagen. Si no tiene información médica útil, o si es texto escrito a mano (apuntes, cuaderno, notas de tableta), no lo transcribas: deja \"fichas\" y \"questions\" vacíos.",
    gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos tal como aparecen."].join("\n") + focusLine();
  return aiGenerate({nums: [ctx.page || 1], pages: [""]}, ctx.title || "", ask, dataUrl);
}
async function aiGenerate(sel, title, ask, imagen){
  const Anthropic = await loadSDK();
  const client = new Anthropic({apiKey: getKey(), dangerouslyAllowBrowser: true});
  const doc = sel.pages.map((p,i)=>`[pág. ${sel.nums[i]}]\n${p}`).join("\n\n");
  let msg;
  const {params, level} = aiParams();
  const soltar = await pantallaEncendida();
  try {
    // El documento va en un bloque guardado en caché: si se generan más ítems del mismo texto en unos minutos, se cobra ~5–10 % de la lectura.
    const stream = client.beta.messages.stream(Object.assign({
      max_tokens: 32000,
      output_config: {effort: "medium", format: {type: "json_schema", schema: GEN_SCHEMA}},
      system: GEN_SYSTEM,
      messages: [{role: "user", content: imagen ? [
        {type: "image", source: {type: "base64", media_type: "image/jpeg", data: imagen.split(",")[1]}},
        {type: "text", text: `Imagen tomada de «${title.replace(/"/g,"'")}».\n\n${ask}${cur() ? dupYaExiste(cur().id) : ""}`}] : [
        {type: "text", text: `<documento titulo="${title.replace(/"/g,"'")}">\n${doc}\n</documento>`, cache_control: {type: "ephemeral"}},
        {type: "text", text: (cur() && docInfo(cur().id) && docInfo(cur().id).danados ? NOTA_SIMBOLOS + "\n" : "") + (ask || genAsk()) + (cur() ? dupYaExiste(cur().id) : "")}]}]
    }, params));
    msg = await stream.finalMessage();
  } catch(e) { throw apiErr(Anthropic, e); }
  finally { soltar(); }
  aiRecord(level, addUsage({}, msg.usage), imagen ? "Analizar imagen" : "Generar con IA");
  if (msg.stop_reason === "refusal") throw uerr("La IA no procesó este texto. Prueba con otras páginas.");
  if (msg.stop_reason === "max_tokens") throw uerr("La respuesta quedó incompleta. Pide menos preguntas o menos páginas.");
  const txt = msg.content.filter(b=>b.type==="text").map(b=>b.text).join("");
  let data; try { data = JSON.parse(txt); } catch(e) { throw uerr("La respuesta de la IA no tuvo el formato esperado. Inténtalo de nuevo."); }
  const fixPage = p => sel.nums.includes(+p) ? +p : sel.nums[0];
  const textoDoc = cur() && recCache[cur().id] ? recCache[cur().id].pages.join("\n") : sel.pages.join("\n");
  const citas = x => (Array.isArray(x.citas) ? x.citas : []).filter(c => c && okStr(c.texto)).slice(0, 3)
    .map(c => ({texto: c.texto.trim(), page: fixPage(c.page), ok: imagen ? null : citaEnTexto(c.texto, textoDoc)}));
  const paginas = (x, cs) => [...new Set([fixPage(x.page), ...cs.map(c => c.page)])].sort((a, b) => a - b);
  const okStr = v => typeof v === "string" && v.trim().length > 0;
  const lab = gen.label.trim(), withLab = t => lab ? (t ? `${lab} · ${t}` : lab) : t;
  const qs = (data.questions||[]).filter(q=>okStr(q.vignette) && Array.isArray(q.options) && q.options.length===4 && q.options.every(okStr) && Number.isInteger(q.correct) && q.correct>=0 && q.correct<4)
    .map(q=>{ const cs = citas(q); return {kind:"q", on:true, qtype: ["caso","critica","directa"].includes(q.qtype) ? q.qtype : "caso", specialty: SPECS.includes(q.specialty)?q.specialty:"Medicina Interna", area: (q.area||"").trim(), topic:withLab(q.topic||""), vignette:q.vignette, options:q.options, correct:q.correct, whyCorrect:q.whyCorrect||"", pearl:q.pearl||"", trap:q.trap||"", page:fixPage(q.page), pages: paginas(q, cs), citas: cs}; });
  const hs = (data.fichas||[]).filter(h=>okStr(h.title) && Array.isArray(h.thresholds) && h.thresholds.length && h.thresholds.every(x=>x && okStr(x.label) && okStr(x.val)))
    .map(h=>{ const cs = citas(h); return {kind:"h", on:true, specialty: SPECS.includes(h.specialty)?h.specialty:"Medicina Interna", area: (h.area||"").trim(), title:withLab(h.title), badge:h.badge||"", thresholds:h.thresholds.slice(0,6).map(x=>({label:x.label, val:x.val})), redFlag:h.redFlag||"", trap:h.trap||"", relevance: Math.max(1, Math.min(5, parseInt(h.relevance)||3)), why: h.why||"", page:fixPage(h.page), pages: paginas(h, cs), citas: cs}; })
    .sort((a,b)=>b.relevance-a.relevance);
  return [...qs, ...hs];
}
