// ===================================================================
// RECUERDO LIBRE: la pregunta abierta de lo que más fallas. El caso se muestra sin opciones (hay que
// producir la respuesta, no reconocerla) y las cifras de la perla se completan de memoria. Luego se ve la
// respuesta y uno mismo se califica; con clave de IA, la IA puede corregir lo escrito comparándolo solo con la
// explicación del propio caso. Funciona sin IA. No toca las estadísticas de aciertos: solo agenda el repaso.
// ===================================================================
const RECUERDO_N = 10;
// La pregunta del caso, sin opciones.
function recuerdoPregunta(q){
  const t = String(q.vignette || "").replace(/<[^>]+>/g, ""), m = t.match(/[^.?!¿]*\?\s*$/);
  const preg = m ? m[0].replace(/^[\s¿]+/, "").trim() : "";
  // El caso sin su pregunta final (la pregunta va aparte, después de «Sin opciones»).
  return {caso: m ? t.slice(0, m.index).replace(/[\s¿]+$/, "").trim() : t, preg: preg ? "¿" + preg : "¿Qué harías y por qué?"};
}
// Las cifras de la perla, para completar de memoria (máximo 3; no se ocultan los años).
function recuerdoCifras(perla){
  const out = []; const re = /\d+(?:[.,]\d+)?/g; let m;
  while ((m = re.exec(perla || "")) && out.length < 3) {
    const n = +m[0].replace(",", "."); if (m[0].length === 4 && n >= 1900 && n <= 2100) continue;
    out.push({i: m.index, v: m[0]});
  }
  return out;
}
const recuerdoNum = s => String(s || "").trim().replace(",", ".").replace(/^0+(?=\d)/, "");
function recuerdoPerlaHTML(perla, cifras, abierta){
  let html = "", k = 0;
  cifras.forEach((c, j) => {
    html += esc(perla.slice(k, c.i));
    html += abierta ? `<b class="rc-cifra ${recuerdoNum(sess.recCifras && sess.recCifras[j]) === recuerdoNum(c.v) ? "ok" : "mal"}">${esc(c.v)}</b>`
      : `<input class="rc-hueco" data-hueco="${j}" inputmode="decimal" aria-label="Cifra ${j + 1}" size="${Math.max(2, c.v.length)}">`;
    k = c.i + c.v.length;
  });
  return html + esc(perla.slice(k));
}

// Casos para el recuerdo: los que fallaste en esta sesión.
const recuerdoDeSesion = results => [...new Set(results.filter(r => r.t === "q" && !r.ok && qById(r.id)).map(r => String(r.id)))].slice(0, RECUERDO_N);
// Lo que más fallas: errores con seguridad, casos fallados dos veces o más, fallos por umbral o dosis y lo fallado.
function recuerdoVulnerables(){
  const aud = ultimaAuditoria(), puntos = {};
  const suma = (id, p) => { if (qById(id)) puntos[id] = (puntos[id] || 0) + p; };
  Object.entries(aud).forEach(([id, k]) => { if (k === "peligro") suma(id, 3); });
  Object.entries(S.srs).forEach(([k, r]) => { if (k[0] !== "q") return; const id = k.slice(1);
    if (r.n - r.ok >= 2 && r.last !== 2) suma(id, 2); else if (r.last === 0) suma(id, 1); });
  (S.resp || []).forEach(r => { if (!r.ok && r.m === "umbral") suma(r.id, 2); });
  return Object.entries(puntos).sort((a, b) => b[1] - a[1]).slice(0, RECUERDO_N).map(([id]) => id);
}
function empezarRecuerdo(ids, nombre){
  if (!ids.length) return toast("Todavía no hay fallos para el recuerdo libre.");
  startSession({label: "Recuerdo libre", tag: "norm", stages: [{name: "✍️ " + nombre, items: ids.map(id => ({t: "o", id}))}]});
}

function renderO(q){
  const {caso, preg} = recuerdoPregunta(q), cifras = recuerdoCifras(q.pearl);
  sess.recCifras = []; sess.recTxt = "";
  $("#sessBody").innerHTML = `<div class="card">
      <div class="row xs"><span class="tag" style="color:${SPEC_COLOR[q.specialty]}">${esc(q.specialty)}</span><span class="muted">✍️ Recuerdo libre · ${esc(q.topic || "")}</span></div>
      <p class="vignette" style="margin:12px 0 4px">${esc(caso)}</p>
      <p class="small" style="margin:10px 0 6px"><b>Sin opciones:</b> ${esc(preg)} Escribe la conducta y el dato que la decide.</p>
      <textarea id="recTxt" rows="3" placeholder="Tu respuesta, de memoria…"></textarea>
      ${cifras.length ? `<div class="note pearl" style="margin-top:10px"><b>Completa de memoria:</b><div class="small rc-perla" style="margin-top:6px">${recuerdoPerlaHTML(q.pearl, cifras, false)}</div></div>` : ""}
      <div id="recFb"></div>
      <button class="btn primary block" id="recVer" style="margin-top:12px">Ver la respuesta</button></div>`;
  $("#recVer").onclick = () => mostrarRecuerdo(q, cifras);
}
function mostrarRecuerdo(q, cifras){
  if (sess.state !== "ask") return; sess.state = "flip";
  sess.recTxt = $("#recTxt").value.trim();
  sess.recCifras = [...document.querySelectorAll("#sessBody [data-hueco]")].map(i => i.value);
  const bien = cifras.filter((c, j) => recuerdoNum(sess.recCifras[j]) === recuerdoNum(c.v)).length;
  $("#recTxt").readOnly = true; $("#recVer").remove();
  if (cifras.length) document.querySelector("#sessBody .rc-perla").innerHTML = recuerdoPerlaHTML(q.pearl, cifras, true)
    + `<div class="xs muted" style="margin-top:4px">Cifras: ${bien} de ${cifras.length}${bien < cifras.length ? ` (escribiste ${sess.recCifras.map(v => esc(v || "—")).join(", ")})` : ""}.</div>`;
  const ia = getKey() ? `<div class="row" style="gap:8px;margin-top:8px;align-items:center"><button class="btn sm" id="recIA" ${sess.recTxt ? "" : "disabled"}>🤖 Que la IA corrija lo que escribí</button><span class="xs muted">${esc(aiEstimateLine(1500 + sess.recTxt.length, {light: true, outTokens: 400}))}</span></div><div id="recIABox"></div>` : "";
  $("#recFb").innerHTML = `<div class="stack" style="margin-top:12px">
      <div class="fb ok"><h4>Respuesta: ${esc(q.options[q.correct])}</h4>${esc(q.whyCorrect)}</div>
      ${porOpcionHTML(q, -1)}
      ${q.trap ? `<div class="note trap" style="white-space:pre-line"><b>⚠️ Trampa:</b> ${esc(q.trap)}</div>` : ""}${srcLine(q)}${ia}
      <p class="small" style="margin:4px 0 0"><b>¿La tenías?</b> <span class="muted">Compara lo que escribiste con la respuesta.</span></p>
      <div class="grid3"><button class="btn" data-rg="0" style="border-color:var(--bad)">✗ No la tenía</button><button class="btn" data-rg="1" style="border-color:var(--warn)">~ A medias</button><button class="btn" data-rg="2" style="border-color:var(--ok)">✓ La tenía</button></div></div>`;
  document.querySelectorAll("[data-rg]").forEach(b => b.onclick = () => calificarRecuerdo(q, +b.dataset.rg, bien, cifras.length));
  $("#recIA") && ($("#recIA").onclick = () => corregirRecuerdoIA(q));
}
function calificarRecuerdo(q, g, bien, nCifras){
  if (sess.state !== "flip") return; sess.state = "done"; addTime();
  recuerdoAgenda("q" + q.id, g); save();
  sess.results.push({t: "o", id: q.id, g, cifras: nCifras ? [bien, nCifras] : null});
  sess.i++; renderItem();
}

// Corrección con IA: solo contra la respuesta, la explicación, la perla y la cita del caso.
const T_RECUERDO = {name: "corregir_recuerdo", description: "Corrige la respuesta libre del médico.",
  input_schema: {type: "object", additionalProperties: false, required: ["nota", "bien", "falta", "error"], properties: {
    nota: {type: "string", enum: ["completa", "parcial", "incorrecta"]}, bien: {type: "string"}, falta: {type: "string"}, error: {type: "string"}}}};
async function corregirRecuerdoIA(q){
  const bt = $("#recIA"); bt.disabled = true; bt.innerHTML = `<span class="spin"></span> Corrigiendo…`;
  const cita = (q.cita || []).map(c => "- " + c.texto).join("\n");
  try {
    const r = await callForTool({system: `Corriges la respuesta libre de un médico que se prepara para el examen de residencia. Compara lo que escribió SOLO con la respuesta correcta, la explicación, la perla y la cita del caso que recibes; no uses conocimiento propio. "nota": completa (tiene la conducta y el dato que la decide), parcial o incorrecta. "bien": lo que acertó. "falta": lo que le faltó decir. "error": lo que afirmó y es falso según el caso (vacío si nada). Si la explicación del caso no alcanza para juzgar algo, dilo en vez de suponer. Frases cortas, español neutro, sin markdown.`,
      tools: [T_RECUERDO], light: true, label: "Corregir recuerdo libre",
      user: `CASO: ${recuerdoPregunta(q).caso}\nRESPUESTA CORRECTA: ${q.options[q.correct]}\nEXPLICACIÓN: ${q.whyCorrect}\nPERLA: ${q.pearl || ""}\nCITA:\n${cita}\n\nLO QUE ESCRIBIÓ EL MÉDICO: ${sess.recTxt}`}, "corregir_recuerdo");
    const t = {completa: "✓ Completa", parcial: "~ Parcial", incorrecta: "✗ Incorrecta"}[r.nota] || "Revisada";
    $("#recIABox").innerHTML = `<div class="note small" style="margin-top:8px"><b>${t}</b>${r.bien ? `<div style="margin-top:4px">✓ ${esc(r.bien)}</div>` : ""}${r.falta ? `<div style="margin-top:4px">➕ Te faltó: ${esc(r.falta)}</div>` : ""}${r.error ? `<div style="margin-top:4px;color:var(--bad)">✗ ${esc(r.error)}</div>` : ""}</div>`;
    bt.remove();
  } catch(e) { toast(e.userMsg || e.message); bt.disabled = false; bt.textContent = "🤖 Que la IA corrija lo que escribí"; }
}
// En el resumen de la sesión.
function recuerdoResumenHTML(results){
  const os = results.filter(r => r.t === "o"); if (!os.length) return "";
  const si = os.filter(r => r.g === 2).length, cf = os.filter(r => r.cifras), cb = cf.reduce((a, r) => a + r.cifras[0], 0), ct = cf.reduce((a, r) => a + r.cifras[1], 0);
  return `<p class="small" style="margin:0">✍️ Recuerdo libre: la tenías en <b>${si} de ${os.length}</b>${ct ? ` · cifras de memoria: <b>${cb} de ${ct}</b>` : ""}. Lo que no tenías vuelve mañana a tu repaso.</p>`;
}
