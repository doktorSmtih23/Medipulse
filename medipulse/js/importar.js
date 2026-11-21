// ===================================================================
// PEGAR PREGUNTAS DE OTRA IA: el usuario pega el texto de una o varias preguntas (de Gemini, ChatGPT,
// Claude…) y la app las organiza sola, sin IA: caso, opciones, respuesta correcta, análisis de cada
// opción, dato clave y cómo evitar la trampa. MediPulse NO audita el contenido: se guarda tal como
// viene (4 o 5 opciones) y se deja claro que la responsabilidad es de quien lo aporta. El usuario
// solo confirma cómo quedó organizado. Incluye el prompt para pedirlas en el formato ideal.
// ===================================================================
let impCands = null;

// Bloque de formato: lo que la app lee perfecto. Se puede pegar al final de una skill propia.
const FORMATO_IA = `Al final, entrega cada pregunta también en este formato para MediPulse, en texto plano (sin negritas, tablas ni fórmulas), separadas por una línea que diga ---

Pregunta 1
[Caso clínico breve: edad, sexo, cuadro y datos clave.] ¿[Pregunta]?
A) ...
B) ...
C) ...
D) ...
(E) ..., solo si el examen usa 5 opciones)
Respuesta correcta: [letra]
Especialidad: [Medicina Interna | Pediatría | Ginecología | Cirugía | Epidemiología y Estadística]
Tipo: [Conducta | Diagnóstico | Lectura crítica | Datos duros]
Tema: [tema en pocas palabras]
Análisis de las opciones:
Opción A: [por qué parece plausible y por qué es correcta o incorrecta]
Opción B: ...
Opción C: ...
Opción D: ...
(Opción E: ..., si la hay)
Explicación: [por qué la respuesta correcta es la correcta]
Perla: [el dato clave que define la respuesta]
Trampa: [el error típico y cómo no caer]
Fuente: [nombre del documento que te di, organización y año] · [página o sección de donde sale]`;
// Prompt completo: el usuario solo lo pega. Su IA le pide la fuente (PDF, texto o foto), saca sola el
// título y el año, presenta el mapa conceptual y solo entonces pregunta qué preguntas quiere.
const PROMPT_IA = `Eres un profesor que prepara a médicos para el examen de residencia. Vas a convertir en preguntas tipo examen una fuente que yo te daré.

Paso 1. Pídeme solo la fuente: que suba el PDF, pegue el texto o mande una foto de lo que quiero convertir en preguntas. No me pidas nada más todavía.

Paso 2. Cuando te la dé:
- Identifica tú el título del documento, la organización o revista y el año (si no aparecen, dilo).
- Preséntame un mapa conceptual del documento: los temas y subtemas, con su página o sección.

Paso 3. Después del mapa, pregúntame todo junto en un solo mensaje:
- Sobre qué temas del mapa quiero las preguntas.
- Cuántas preguntas quiero.
- De qué tipo: conducta, diagnóstico, lectura crítica o datos duros.
- Si quiero 4 o 5 opciones (recomiéndame 4).

Paso 4. Escribe las preguntas con estas reglas:
- Usa SOLO la información del documento que te di. No agregues datos de otras fuentes ni de tu memoria; si el documento no alcanza para una pregunta, no la hagas y dímelo.
- Cada pregunta y cada explicación deben poder verificarse en el documento: indica la página o sección de donde sale.
- Una sola respuesta correcta, y reparte la letra correcta entre todas las opciones.

${FORMATO_IA.replace(/^Al final, entrega cada pregunta también en este formato para MediPulse/, "Entrega cada pregunta EXACTAMENTE en este formato")}`;

// ---------- lectura del texto ----------
const limpiarMd = t => String(t || "").replace(/\r/g, "").replace(/\*\*|__|`/g, "").replace(/\$([^$\n]*)\$/g, "$1").replace(/\\\(|\\\)/g, "")
  .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s.,;:)]|$)/gm, "$1$2").replace(/^[ \t]*[*•·]\s+/gm, "").replace(/^[ \t]*[-–]\s+(?=opci[oó]n\b|por qu[eé]\b)/gim, "").replace(/^#+\s*/gm, "").replace(/[ \t]+$/gm, "");
const L = "ABCDE";
const OPC_RE = /^\s*\(?([A-Ea-e])\s*[).:\-–]\s+(.+)$/;
// Encabezados de las secciones que siguen a las opciones (análisis, dato clave, cómo evitar…).
const SECC = [
  // Mismos campos que el banco: Explicación, Perla, Trampa (y sus sinónimos habituales).
  ["fund", /^(?:fundamento|explicaci[oó]n\s*:|justificaci[oó]n\s*:)/i],
  ["analisis", /^(?:identificaci[oó]n de t[eé]cnicas|an[aá]lisis de (?:las |cada )?opci|explicaci[oó]n|justificaci[oó]n)/i],
  ["dato", /^(?:dato clave|perla\s*:)/i],
  ["evitar", /^(?:c[oó]mo evitar|trampa\s*:)/i],
  ["fuente", /^fuente\s*:/i],
  ["resp", /^respuesta(?: correcta)?\s*[:=]/i],
  ["result", /^resultado\s*:/i],
  ["esp", /^especialidad\s*:/i], ["tipo", /^tipo(?: de pregunta)?\s*:/i], ["tema", /^tema\s*:/i]
];
const TIPOS_TXT = [[/conducta|manejo|tratamiento/i, "conducta"], [/diagn/i, "diagnostico"], [/cr[ií]tica|mbe|estad/i, "critica"], [/dato|cifra|umbral|dosis/i, "datos"]];
// «La respuesta correcta … es la opción B», «la correcta es B», «Respuesta: B»
const CORRECTA_RE = /respuesta correcta[^\n]*?\bopci[oó]n\s+\(?([A-E])\b|\b(?:la )?(?:respuesta|opci[oó]n) correcta es (?:la )?(?:opci[oó]n )?\(?([A-E])\b/i;
const SEPARA_RE = /^\s*(?:-{3,}|={3,}|_{3,}|(?:pregunta|caso)\s*(?:n[°º.]?\s*)?\d+\s*[.:)]?)\s*$/im;
const tieneOpciones = b => b.split("\n").some(l => /^\s*\(?[Aa]\s*[).:\-–]\s+/.test(l)) && b.split("\n").filter(l => OPC_RE.test(l)).length >= 4;
const pareceRespuesta = b => /opci[oó]n\s+\(?[A-E]\b|respuesta correcta|dato clave|c[oó]mo evitar|fundamento|^(?:perla|trampa|explicaci[oó]n)\s*:/im.test(b);

function partirBloques(texto){
  return limpiarMd(texto).split(SEPARA_RE).map(b => b.trim()).filter(tieneOpciones);
}
// Lee las secciones que siguen a las opciones (o un bloque de respuestas aparte) y las guarda en q.
function leerSecciones(lineas, i, q, buf){
  let sec = null, opc = -1;
  for (; i < lineas.length; i++) {
    const l = lineas[i].trim(); if (!l) continue;
    const cm = q.correct < 0 && l.match(CORRECTA_RE); if (cm) q.correct = L.indexOf((cm[1] || cm[2]).toUpperCase());
    const hit = SECC.find(([, re]) => re.test(l));
    const mo = l.match(/^opci[oó]n\s+\(?([A-E])\)?\b\s*[:.)\-–]?\s*(.*)$/i);
    if (hit) {
      sec = hit[0]; opc = -1;
      // Lo que va después de los dos puntos del encabezado («DATO CLAVE QUE DEFINÍA LA RESPUESTA: …»)
      const resto = l.includes(":") ? l.slice(l.indexOf(":") + 1).trim() : "";
      if (sec === "resp") { const m = resto.match(/^\(?([A-E])\b/i); if (m) q.correct = L.indexOf(m[1].toUpperCase()); }
      else if (sec === "esp") { const c = specCanon(resto); q.specialty = SPECS.includes(c) ? c : SPECS.find(s => norm(resto).includes(norm(s))) || q.specialty; }
      else if (sec === "tipo") q.tipo = (TIPOS_TXT.find(([re]) => re.test(resto)) || [])[1] || q.tipo;
      else if (sec === "tema") q.topic = resto;
      else if (sec === "fuente") q.fuenteTxt = resto;
      else if ((sec === "dato" || sec === "evitar" || sec === "fund") && resto) buf[sec].push(resto);
      continue;
    }
    if (mo) { opc = L.indexOf(mo[1].toUpperCase()); sec = "opcion"; if (opc < q.porOpcion.length && mo[2]) q.porOpcion[opc] = mo[2].trim(); continue; }
    if (sec === "opcion" && opc >= 0 && opc < q.porOpcion.length) q.porOpcion[opc] = (q.porOpcion[opc] + " " + l).trim();
    else if (sec === "dato" || sec === "evitar" || sec === "fund") buf[sec].push(l);
    else if (sec === "fuente") q.fuenteTxt = (q.fuenteTxt + " " + l).trim();
  }
}
function cerrar(q, buf){
  if (buf.dato.length) q.pearl = buf.dato.join(" ").trim();
  if (buf.evitar.length) q.trap = buf.evitar.join("\n").trim();
  if (buf.fund.length) q.fundamento = buf.fund.join(" ").trim();
  // Respuesta correcta marcada dentro del análisis («(Respuesta correcta)», «es la opción correcta»)
  if (q.correct < 0) q.correct = q.porOpcion.findIndex(t => /respuesta correcta|\(correcta\)|por qu[eé] es correcta|es la (?:opci[oó]n )?correcta/i.test(t) && !/por qu[eé] es incorrecta/i.test(t));
  // Análisis de cada opción, legible: sin el nombre de la opción repetido y cada «Por qué…» en su línea.
  q.porOpcion = q.porOpcion.map(t => t.replace(/^\([^)]*\)\s*[-–:]?\s*/, "").replace(/^[-–]\s*/, "").replace(/\s*[-–]?\s*(Por qu[eé] (?:parece|es|no)\b)/gi, "\n$1").trim());
  // Sin sección «Explicación»: la justificación es el análisis de la opción correcta («Es correcta porque…»).
  if (!q.fundamento && q.correct >= 0 && q.porOpcion[q.correct]) q.fundamento = q.porOpcion[q.correct].replace(/^(?:ninguna identificada[^.]*\.\s*)?(?:\(?respuesta correcta\)?\.?\s*)?/i, "").trim();
  return q;
}
function parsearPregunta(bloque){
  const lineas = bloque.split("\n");
  let i0 = lineas.findIndex(l => /^\s*\(?[Aa]\s*[).:\-–]\s+/.test(l));
  if (i0 < 0) return null;
  const vignette = lineas.slice(0, i0).join("\n").replace(/\n{2,}/g, "\n").trim();
  const options = []; let i = i0;
  // Opciones consecutivas A, B, C… (una opción puede seguir en la línea siguiente)
  for (; i < lineas.length; i++) {
    const m = lineas[i].match(OPC_RE);
    if (m && m[1].toUpperCase() === L[options.length]) { options.push(m[2].trim()); continue; }
    if (!lineas[i].trim()) { if (options.length >= 2) { const sig = lineas.slice(i + 1).find(x => x.trim()); if (!sig || !OPC_RE.test(sig)) break; } continue; }
    if (options.length && !SECC.some(([, re]) => re.test(lineas[i].trim())) && !/^opci[oó]n\s+[A-E]\b/i.test(lineas[i].trim()) && !pareceEncabezado(lineas[i])) { options[options.length - 1] += " " + lineas[i].trim(); continue; }
    break;
  }
  const q = {vignette, options, correct: -1, porOpcion: options.map(() => ""), pearl: "", trap: "", fundamento: "", topic: "", specialty: "", tipo: "", fuenteTxt: ""};
  const buf = {dato: [], evitar: [], fund: []};
  leerSecciones(lineas, i, q, buf);
  cerrar(q, buf);
  // Especialidad sugerida por el caso, si la IA no la dijo (el usuario la confirma al revisar)
  if (!q.specialty) q.specialty = /\b(gestante|embarazada|puérpera|puerpera|semanas de gestaci|primigesta|multigesta)\b/i.test(q.vignette) ? "Ginecología"
    : esPediatrico(q.vignette) ? "Pediatría" : "";
  if (!q.tipo) q.tipo = qKind({vignette: q.vignette, topic: q.topic});
  return q;
}
// ¿El paciente es un niño? Por la palabra o por su edad al inicio del caso («de 7 años»), no por la
// duración de una enfermedad («diabetes de 10 años de evolución»).
function esPediatrico(v){
  if (/\b(lactante|recién nacid|recien nacid|neonat|niñ[oa]s?|escolar|preescolar)\b/i.test(v)) return true;
  const m = String(v).slice(0, 160).match(/\b(\d{1,2})\s*(años|meses|días|dias|semanas)\b(?!\s+de\s+(?:evoluci|duraci|diagn|tratamiento))/i);
  return !!m && (/^(meses|días|dias|semanas)$/i.test(m[2]) || +m[1] < 15);
}
// Un título en mayúsculas («RESPUESTAS Y JUSTIFICACIÓN») no es parte de la última opción.
const pareceEncabezado = l => /^[^a-záéíóúñ]{6,}$/.test(l.trim()) || /^respuestas?\b/i.test(l.trim());
// Todo el texto: las preguntas y, si las respuestas vienen aparte (al final), se emparejan en orden.
function organizarTexto(texto){
  const bloques = limpiarMd(texto).split(SEPARA_RE).map(b => b.trim()).filter(Boolean);
  const qs = [], resp = [];
  bloques.forEach(b => { if (tieneOpciones(b)) qs.push(parsearPregunta(b)); else if (pareceRespuesta(b)) resp.push(b); });
  const sinAnalisis = qs.filter(q => q && !q.porOpcion.some(Boolean) && !q.pearl && !q.trap);
  resp.forEach((b, k) => {
    const q = sinAnalisis[k]; if (!q) return;
    const buf = {dato: [], evitar: [], fund: []};
    leerSecciones(b.split("\n"), 0, q, buf); cerrar(q, buf);
  });
  return qs.filter(Boolean);
}

// ---------- pantalla ----------
function renderImportar(box){
  box.innerHTML = `
    <div class="stack">
      <p class="small" style="margin:0">¿Tienes preguntas que te hizo otra IA (Gemini, ChatGPT…) sueltas en el chat? Pégalas aquí tal cual, una o varias: la app separa el caso, las opciones, la respuesta, el análisis de cada opción, el dato clave y cómo evitar la trampa. Es gratis: no usa IA.</p>
      <textarea id="impTxt" rows="9" placeholder="Pega aquí la pregunta completa, con sus opciones y su explicación…"></textarea>
      <div class="row" style="gap:6px"><button class="btn primary" id="impGo">🧩 Organizar</button></div>
      <details class="custom"><summary>📋 Prompt para tu IA: preguntas desde tu fuente, listas para pegar aquí</summary><div class="stack" style="margin-top:8px">
        <p class="xs muted" style="margin:0"><b>Con tu fuente:</b> copia este prompt y pégalo en Gemini, ChatGPT u otra IA, sin cambiar nada. Tu IA te pedirá la fuente (el PDF, el texto o una foto), sacará sola el título y el año, te mostrará el mapa conceptual y luego te preguntará qué temas, cuántas preguntas, de qué tipo y si quieres 4 o 5 opciones. Usará solo ese documento y dirá la página de cada pregunta.</p>
        <button class="btn sm" data-copiar="prompt">📋 Copiar el prompt completo</button>
        <pre class="prompt">${esc(PROMPT_IA)}</pre>
        <p class="xs muted" style="margin:0"><b>¿Ya tienes una skill o un prompt propio</b> (por ejemplo, uno que arma un mapa conceptual del documento y luego hace preguntas)? No lo cambies: agrega al final solo este bloque de formato.</p>
        <button class="btn sm" data-copiar="formato">📋 Copiar solo el formato</button>
        <pre class="prompt">${esc(FORMATO_IA)}</pre></div></details>
      <div id="impOut" class="stack"></div>
    </div>`;
  box.querySelectorAll("[data-copiar]").forEach(b => b.onclick = () => {
    const txt = b.dataset.copiar === "formato" ? FORMATO_IA : PROMPT_IA, ok = b.dataset.copiar === "formato" ? "Formato copiado ✓ Pégalo al final de tu skill" : "Prompt copiado ✓ Pégalo en tu IA con tu documento";
    try { navigator.clipboard.writeText(txt).then(() => toast(ok), () => toast("Selecciona el texto de abajo y cópialo a mano")); } catch(e) { toast("Selecciona el texto de abajo y cópialo a mano"); }
  });
  $("#impGo").onclick = () => {
    impCands = organizarTexto($("#impTxt").value).filter(q => q.vignette && q.options.length >= 4);
    if (!impCands.length) { $("#impOut").innerHTML = `<p class="small" style="margin:0;color:var(--bad)">No encontré una pregunta con al menos 4 opciones: A), B), C) y D). Revisa que cada opción empiece con su letra.</p>`; return; }
    renderImpCands();
  };
}
function impErr(q){
  if (q.options.length < 4 || q.options.length > 5) return `Tiene ${q.options.length} opciones: la app guarda preguntas de 4 o 5.`;
  if (q.correct < 0 || q.correct >= q.options.length) return "Marca cuál es la respuesta correcta.";
  return qEditError({vignette: q.vignette, options: q.options});
}
function renderImpCands(){
  const box = $("#impOut");
  box.innerHTML = `<h3 style="font-size:16px;margin:4px 0 0">Así quedó organizado (${impCands.length})</h3>
    <p class="xs muted" style="margin:0">Confirma que cada parte quedó en su lugar. MediPulse guarda las preguntas tal como vienen, <b>sin revisar ni auditar su contenido</b>: la responsabilidad del material es de quien lo aporta.</p>` + impCands.map((q, k) => `
    <div class="card stack impq" data-k="${k}">${dupAvisoHTML(impDup(q, k), "q").replace(" La desmarqué; márcala si de verdad la quieres.", " Al guardar te pregunto si la incluyes.")}
      <div class="grid2">${specSelHTML(`data-if="specialty"`, q.specialty || "Medicina Interna")}
        <label class="fld">Tipo de pregunta<select data-if="tipo">${FOCUS.slice(1).map(f => `<option value="${f.k}" ${q.tipo === f.k ? "selected" : ""}>${esc(f.t)}</option>`).join("")}</select></label></div>
      <label class="fld">Tema (se ve después de responder y sirve para buscarla)<input type="text" data-if="topic" value="${esc(q.topic)}" placeholder="p. ej. Pubertad precoz central"></label>
      <label class="fld">Caso<textarea rows="5" data-if="vignette">${esc(q.vignette)}</textarea></label>
      <div class="xs muted">Marca la correcta${q.options.length > 4 ? ` · tiene ${q.options.length} opciones; si quieres dejarla en 4, quita una incorrecta con ✕` : ""}:</div>
      ${q.options.map((o, j) => `<div class="stack" style="gap:2px"><div class="row" style="gap:6px;flex-wrap:nowrap;align-items:center"><input type="radio" name="impC${k}" value="${j}" ${j === q.correct ? "checked" : ""} aria-label="Correcta: ${L[j]}"><b>${L[j]}</b><input type="text" data-io="${j}" value="${esc(o)}" style="flex:1;min-width:0">${q.options.length > 4 ? `<button class="xbtn" data-ix="${j}" aria-label="Quitar la opción ${L[j]}">✕</button>` : ""}</div>
        ${q.porOpcion[j] ? `<p class="xs muted" style="margin:0 0 0 28px">${esc(q.porOpcion[j]).slice(0, 400)}${q.porOpcion[j].length > 400 ? "…" : ""}</p>` : ""}</div>`).join("")}
      <label class="fld">Explicación<textarea rows="3" data-if="fundamento">${esc(q.fundamento || "")}</textarea></label>
      <div class="grid2"><label class="fld">💎 Perla<textarea rows="3" data-if="pearl">${esc(q.pearl)}</textarea></label>
      <label class="fld">⚠️ Trampa<textarea rows="3" data-if="trap">${esc(q.trap)}</textarea></label></div>
      <label class="fld">Fuente<select data-if="src">${srcOptions("")}</select></label>
      ${q.fuenteTxt ? `<p class="xs muted" style="margin:0">Fuente indicada en el texto: «${esc(q.fuenteTxt)}».</p>` : ""}
      <p class="xs" style="margin:0;color:var(--bad)" data-ierr>${esc(impErr(q) || "")}</p>
      <div class="row"><button class="btn ghost sm" data-idel>Descartar</button></div></div>`).join("") +
    `<button class="btn primary block" id="impSave">Guardar ${impCands.length === 1 ? "la pregunta" : `las ${impCands.length} preguntas`} en el banco</button>`;
  box.querySelectorAll(".impq").forEach(el => {
    const q = impCands[+el.dataset.k], err = () => { el.querySelector("[data-ierr]").textContent = impErr(q) || ""; };
    el.querySelectorAll("[data-if]").forEach(x => x.oninput = x.onchange = () => { q[x.dataset.if] = x.value; err(); });
    el.querySelectorAll("[data-io]").forEach(x => x.oninput = () => { q.options[+x.dataset.io] = x.value.trim(); err(); });
    el.querySelectorAll("input[type=radio]").forEach(x => x.onchange = () => { q.correct = +x.value; err(); });
    el.querySelectorAll("[data-ix]").forEach(x => x.onclick = () => {
      const j = +x.dataset.ix; if (j === q.correct) return toast("Esa es la respuesta correcta: quita una incorrecta.");
      q.options.splice(j, 1); q.porOpcion.splice(j, 1); if (q.correct > j) q.correct--; renderImpCands(); });
    el.querySelector("[data-idel]").onclick = () => { impCands.splice(+el.dataset.k, 1); impCands.length ? renderImpCands() : (box.innerHTML = ""); };
  });
  $("#impSave").onclick = guardarImportadas;
}
// Parecido con el banco y con las anteriores de lo pegado.
const impDup = (q, k) => dupBuscar(q, "q", {extra: impCands.slice(0, k)});
function guardarImportadas(){
  const mala = impCands.findIndex(q => impErr(q));
  if (mala >= 0) return toast(`Pregunta ${mala + 1}: ${impErr(impCands[mala])}`);
  const rep = impCands.filter((q, k) => { const d = impDup(q, k); return d && d.nivel === "repetida"; });
  const lista = rep.length && !confirm(`${rep.length === 1 ? "1 pregunta parece repetida" : `${rep.length} preguntas parecen repetidas`} de lo que ya tienes.\n\nAceptar: guardarlas también.\nCancelar: guardar solo las demás.`) ? impCands.filter(q => !rep.includes(q)) : impCands;
  lista.forEach(q => {
    const spec = SPECS.includes(specCanon(q.specialty)) ? specCanon(q.specialty) : "Medicina Interna";
    agregarPropio("q", {id: nuevoIdPropio(), specialty: spec, tipo: q.tipo, qtype: q.tipo === "critica" ? "critica" : q.tipo === "datos" ? "directa" : "caso",
      topic: (q.topic || "Pregunta importada").trim(), difficulty: "Importada", vignette: textToVig(q.vignette), options: q.options.map(o => o.trim()), correct: q.correct,
      // con análisis por opción, la explicación ya está ahí (no se repite arriba)
      whyCorrect: (q.fundamento || (q.porOpcion.some(Boolean) ? "" : q.porOpcion[q.correct] || "")).trim(), porOpcion: q.porOpcion.some(Boolean) ? q.porOpcion.map(t => t.trim()) : undefined,
      pearl: q.pearl.trim(), trap: q.trap.trim(), src: q.src || null, page: 0, manual: true, externa: true, fuenteTxt: q.fuenteTxt || undefined});
  });
  const n = lista.length; impCands = null;
  rebuild(); save(); refreshChips(); toast(`${n === 1 ? "Pregunta guardada" : `${n} preguntas guardadas`} ✓ Entran a tu repaso.`); renderNew();
}
