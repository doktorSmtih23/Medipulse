// ===================================================================
// COSTO DE LA IA: nivel de calidad (modelo), estimación antes de usarla,
// costo real después y total del mes. Los precios son de la API de Anthropic (US$ por millón de tokens).
// ===================================================================
const AI_LEVELS = {
  max: {name: "Calidad máxima", model: "claude-opus-5-5",   mname: "Claude Opus 5.5",   inp: 4,    out: 20,  read: 0.20},
  eq:  {name: "Equilibrado",    model: "claude-sonnet-5-5", mname: "Claude Sonnet 5.5", inp: 2,    out: 10,  read: 0.10},
  eco: {name: "Económico",      model: "claude-haiku-5-5",  mname: "Claude Haiku 5.5",  inp: 0.10, out: 0.50, read: 0.01}
};
const CHARS_PER_TOKEN = 3.5;   // aproximado para texto médico en español o inglés

function aiLevel(){ return AI_LEVELS[S.aiLevel] ? S.aiLevel : "eq"; }

// Modelo y parámetros de cada llamada.
// light: tarea mecánica (el mapa de capítulos), va con el modelo económico salvo en Calidad máxima.
// web: la búsqueda web no está disponible en Haiku, así que en Económico se usa el modelo Equilibrado.
function aiParams({light = false, web = false} = {}){
  let lv = aiLevel();
  if (light && lv !== "max") lv = "eco";
  if (web && lv === "eco") lv = "eq";
  const p = {model: AI_LEVELS[lv].model};
  // Si el modelo rechaza la solicitud, la API la repite con otro modelo (Haiku no tiene esta opción).
  if (lv !== "eco") { p.betas = ["server-side-fallback-2026-07-01"]; p.fallbacks = "default"; }
  return {params: p, level: lv};
}

const fmtUsd = c => c < 0.01 ? "menos de 0,01" : c.toFixed(2).replace(".", ",");

// Estimación antes de usar la IA: el texto que se envía y una respuesta típica.
function aiEstimate(chars, {light = false, web = false, outTokens = 5000} = {}){
  const L = AI_LEVELS[aiParams({light, web}).level];
  return ((chars / CHARS_PER_TOKEN + 1500) * L.inp + outTokens * L.out) / 1e6;
}
function aiEstimateLine(chars, opts){
  const lv = aiParams(opts || {}).level;
  return `≈ US$${fmtUsd(aiEstimate(chars, opts))} · ${AI_LEVELS[lv].name}`;
}

// Suma el uso de varias respuestas (una acción puede tener varias vueltas).
function addUsage(acc, u){
  if (!u) return acc;
  ["input_tokens", "output_tokens", "cache_creation_input_tokens", "cache_read_input_tokens"].forEach(k => acc[k] = (acc[k] || 0) + (u[k] || 0));
  acc.web = (acc.web || 0) + ((u.server_tool_use && u.server_tool_use.web_search_requests) || 0);
  return acc;
}
function aiCost(level, u){
  const L = AI_LEVELS[level];
  return ((u.input_tokens || 0) * L.inp + (u.cache_creation_input_tokens || 0) * L.inp * 1.25 +
          (u.cache_read_input_tokens || 0) * L.read + (u.output_tokens || 0) * L.out) / 1e6;
}
// Registra el costo real de una acción, lo suma al mes y lo muestra.
function aiRecord(level, usage, label){
  const c = aiCost(level, usage), m = todayKey().slice(0, 7);
  S.aiSpend = S.aiSpend || {}; S.aiSpend[m] = (S.aiSpend[m] || 0) + c; save();
  const w = usage.web || 0;
  toast(`${label}: ≈ US$${fmtUsd(c)}${w ? ` + ${w} búsqueda${w > 1 ? "s" : ""} web (se cobran aparte)` : ""}`);
  return c;
}
// Mantiene la pantalla encendida mientras la IA responde: si el celular se bloquea, el navegador
// puede cortar la conexión y se pierde el resultado (y lo que costó). Si el navegador no lo permite, no pasa nada.
async function pantallaEncendida(){
  let lock = null;
  try { if (navigator.wakeLock) lock = await navigator.wakeLock.request("screen"); } catch(e) {}
  return () => { try { lock && lock.release(); } catch(e) {} };
}
function aiSpendMonth(){ return (S.aiSpend || {})[todayKey().slice(0, 7)] || 0; }

// Selector de nivel (en Fuentes, junto a la clave).
function aiLevelHTML(){
  return `<label class="fld">Nivel de la IA<select id="aiLevelSel">${Object.entries(AI_LEVELS).map(([k, L]) =>
    `<option value="${k}" ${aiLevel() === k ? "selected" : ""}>${L.name} · ${L.mname}</option>`).join("")}</select></label>
    <p class="xs muted" style="margin:6px 0 0">Equilibrado cuesta la mitad que Calidad máxima; Económico, unas 40 veces menos, con más riesgo de errores. Gastado este mes: <b>≈ US$${fmtUsd(aiSpendMonth())}</b> (estimado; el valor exacto está en tu cuenta de Anthropic). <button class="linkbtn" data-go="ahorro">💸 Cómo gastar menos</button></p>`;
}
function bindAiLevel(after){
  $("#aiLevelSel") && ($("#aiLevelSel").onchange = () => { S.aiLevel = $("#aiLevelSel").value; save(); toast("Nivel de la IA: " + AI_LEVELS[aiLevel()].name); after && after(); });
}
