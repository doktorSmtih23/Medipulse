// ===================================================================
// REPETIDOS: antes de guardar una pregunta o una ficha, se compara con lo que ya hay en el banco
// (incluido, generado, importado o propio). Sin IA: palabras en común, sin tildes ni palabras vacías,
// ponderando las cifras (un umbral distinto no es lo mismo). «Repetida» se desmarca sola al revisar;
// «Parecida» solo avisa. A la IA, además, se le pasan los temas que ya existen del documento.
// ===================================================================
const DUP_VACIAS = new Set("el la los las un una unos unas de del al a en y o u e con sin por para que se su sus es son lo le les como mas más muy ya no si sí entre sobre tras desde hasta cual cuál cuales cuáles qué este esta estos estas ese esa paciente pacientes años año caso clinico clínico cual siguiente conducta adecuada diagnostico diagnóstico probable mas mejor the of and in to with for on is are".split(" ").map(w => norm(w)));
// Texto que identifica un ítem: el caso y su respuesta, o el título y los datos de la ficha.
function dupTexto(x, kind){
  if (kind === "q") return [x.topic, String(x.vignette || "").replace(/<[^>]+>/g, " "), (x.options || [])[x.correct]].join(" ");
  return [x.title, ...(x.thresholds || []).map(t => t.label + " " + t.val)].join(" ");
}
function dupTokens(t){
  const w = norm(String(t || "")).replace(/[^a-z0-9ñ%.,<>≥≤\s-]/g, " ").split(/\s+/).map(x => x.replace(/^[.,-]+|[.,-]+$/g, "")).filter(x => x.length > 2 && !DUP_VACIAS.has(x) || /\d/.test(x));
  return new Set(w);
}
// Parecido de 0 a 1 (coeficiente de Dice); las cifras pesan el doble.
function dupScore(A, B){
  if (!A.size || !B.size) return 0;
  const peso = w => /\d/.test(w) ? 2 : 1;
  let comun = 0, ta = 0, tb = 0;
  A.forEach(w => { ta += peso(w); if (B.has(w)) comun += peso(w); });
  B.forEach(w => { tb += peso(w); });
  return 2 * comun / (ta + tb);
}
const DUP_REPETIDA = 0.72, DUP_PARECIDA = 0.5;
// El ítem del banco más parecido (sin contar los de «excluir», p. ej. el original de una versión editada).
function dupBuscar(x, kind, {excluir = [], extra = []} = {}){
  const A = dupTokens(dupTexto(x, kind)), pool = (kind === "q" ? QUESTIONS : HYS).concat(extra);
  let best = null;
  for (const y of pool) {
    if (y === x || excluir.includes(String(y.id))) continue;
    const s = dupScore(A, dupTokens(dupTexto(y, kind)));   // sin guardar nada en el ítem (se grabaría en el celular)
    if (!best || s > best.score) best = {item: y, score: s};
  }
  if (!best || best.score < DUP_PARECIDA) return null;
  return Object.assign(best, {nivel: best.score >= DUP_REPETIDA ? "repetida" : "parecida"});
}
const dupNombre = (y, kind) => kind === "q" ? (y.topic || String(y.vignette).replace(/<[^>]+>/g, "").slice(0, 60) + "…") : y.title;
function dupAvisoHTML(d, kind){
  if (!d) return "";
  const pct = Math.round(d.score * 100), q = kind === "q" ? "pregunta" : "ficha";
  return `<div class="dupaviso ${d.nivel}" role="note">${d.nivel === "repetida" ? `⚠️ <b>Parece repetida</b> (${pct} % igual)` : `ℹ️ <b>Se parece a otra ${q}</b> (${pct} %)`}: «${esc(dupNombre(d.item, kind))}».${d.nivel === "repetida" ? " La desmarqué; márcala si de verdad la quieres." : ""}</div>`;
}
// Confirmación al guardar a mano.
function dupConfirmar(x, kind, opts){
  const d = dupBuscar(x, kind, opts); if (!d || d.nivel !== "repetida") return true;
  return confirm(`Ya tienes una ${kind === "q" ? "pregunta" : "ficha"} muy parecida (${Math.round(d.score * 100)} % igual): «${dupNombre(d.item, kind)}».\n\n¿Guardarla igual?`);
}
// Para la IA: lo que ya existe de este documento, para que no lo repita.
function dupYaExiste(srcId){
  const qs = QUESTIONS.filter(q => q.src === srcId).map(q => q.topic).filter(Boolean), hs = HYS.filter(h => h.src === srcId).map(h => h.title);
  const temas = [...new Set([...qs, ...hs])].slice(0, 60);
  return temas.length ? `\nYa existen preguntas o fichas de este documento sobre: ${temas.join("; ")}. No repitas esos mismos datos; si un tema ya está, cubre otro aspecto distinto o no lo incluyas.` : "";
}
// Al revisar: lo repetido queda plegado (solo el aviso a la vista), para no llenar la pantalla.
const dupPliega = (c, html) => c._dup && c._dup.nivel === "repetida" ? `<details class="pleg"><summary class="xs">Ver de todos modos</summary>${html}</details>` : html;
