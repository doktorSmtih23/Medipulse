// ===================================================================
// VIGENCIA DE FUENTES: revisar y actualizar
// ===================================================================
const STALE_DAYS = 180;
function uerr(msg, e){ const x = new Error((e && e.message) || msg); x.userMsg = msg; return x; }
async function loadSDK(){
  const inl = vendorUrl("vend-sdk");
  if (inl) try { return (await import(inl)).default; } catch(e) {}
  try { return (await import(new URL("vendor/anthropic-sdk.mjs", document.baseURI).href)).default; }
  catch(e) {
    try { return (await import("https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@1.2.0/+esm")).default; }
    catch(e2) { throw uerr("No se pudo cargar el módulo de IA. Revisa tu conexión y recarga la página.", e2); }
  }
}
function apiErr(A, e){
  if (e instanceof A.AuthenticationError) return uerr("La clave de API no es válida. Revísala en Fuentes.", e);
  if (e instanceof A.PermissionDeniedError) return uerr("Tu clave no tiene permiso para esta función o este modelo.", e);
  if (e instanceof A.RateLimitError) return uerr("Llegaste al límite de uso de la API. Espera un minuto e inténtalo de nuevo.", e);
  if (e instanceof A.BadRequestError) {
    const m = e.error?.error?.message || e.message || "";
    return uerr(/web.?search/i.test(m) ? "La búsqueda web no está activada para tu cuenta. Actívala en console.anthropic.com y vuelve a intentarlo." : "La API rechazó la solicitud: " + m, e);
  }
  if (e instanceof A.APIConnectionError) return uerr("Sin conexión con la API. Esta función necesita internet.", e);
  if (e instanceof A.APIError) return uerr("Error del servicio de IA (" + (e.status || "?") + "). Inténtalo de nuevo en unos minutos.", e);
  return uerr("No se pudo completar: " + (e.message || e), e);
}

// Llama a Claude y devuelve el input de la herramienta `toolName` (resultado estructurado).
// Maneja pause_turn de la búsqueda web reenviando la respuesta tal cual.
async function callForTool({system, tools, user}, toolName){
  const A = await loadSDK();
  const client = new A({apiKey: getKey(), dangerouslyAllowBrowser: true});
  const messages = [{role: "user", content: user}];
  for (let turn = 0; turn < 5; turn++) {
    let msg;
    try {
      msg = await client.beta.messages.stream({
        model: "claude-opus-5-5",
        max_tokens: 32000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: {effort: "medium"},
        tool_choice: {type: "auto"},
        system, tools, messages
      }).finalMessage();
    } catch(e) { throw apiErr(A, e); }
    if (msg.stop_reason === "refusal") throw uerr("La IA no procesó esta solicitud.");
    if (msg.stop_reason === "max_tokens") throw uerr("La respuesta quedó incompleta. Prueba con menos elementos a la vez.");
    const tu = msg.content.find(b => b.type === "tool_use" && b.name === toolName);
    if (tu && msg.stop_reason === "tool_use") return tu.input;
    messages.push({role: "assistant", content: msg.content});
    if (msg.stop_reason !== "pause_turn") messages.push({role: "user", content: `Entrega ahora tu resultado llamando a la herramienta ${toolName}.`});
  }
  throw uerr("La IA no entregó un resultado. Inténtalo de nuevo.");
}

const T_SOURCES = {
  name: "report_sources",
  description: "Entrega el resultado de la revisión de vigencia de todas las fuentes recibidas. Llámala una sola vez, al final.",
  strict: true, eager_input_streaming: true,
  input_schema: {type: "object", additionalProperties: false, required: ["results"], properties: {
    results: {type: "array", items: {type: "object", additionalProperties: false,
      required: ["id","status","latest_title","latest_org","latest_year","latest_url","changes","note"],
      properties: {
        id: {type: "string", description: "El id de la fuente tal como se recibió"},
        status: {type: "string", enum: ["current","outdated","unknown"], description: "current = es la versión más reciente; outdated = existe una versión que la reemplaza; unknown = no se pudo confirmar"},
        latest_title: {type: "string", description: "Título de la versión más reciente (vacío si status es current o unknown)"},
        latest_org: {type: "string", description: "Organización o revista de la versión más reciente"},
        latest_year: {type: "integer", description: "Año de la versión más reciente; 0 si no aplica"},
        latest_url: {type: "string", description: "Enlace oficial a la versión más reciente; vacío si no hay"},
        changes: {type: "array", items: {type: "string"}, description: "Hasta 5 cambios clínicos relevantes para el examen"},
        note: {type: "string", description: "Una frase sobre lo encontrado"}
      }}}
  }}
};
const CHECK_SYSTEM = `Eres un bibliotecario médico. Revisas si las fuentes de un banco de preguntas para el examen de residencia médica siguen siendo la versión más reciente.

Para cada fuente:
- Busca en la web si existe una edición, actualización o guía que la reemplace, publicada por la misma organización o autores. Prioriza el sitio oficial de la organización, la revista que la publicó y PubMed.
- "current": la fuente es la versión vigente (una reafirmación sin cambios cuenta como vigente).
- "outdated": existe una versión que la reemplaza. Da su título, organización, año y enlace oficial, y en "changes" hasta 5 cambios clínicos relevantes para el examen (umbrales, fármacos, criterios, definiciones), en español.
- "unknown": no pudiste confirmarlo. No adivines ni inventes títulos, años o enlaces.
- Si la fuente es un PDF del usuario, identifica primero qué documento es a partir del título y del extracto.

Cuando termines, llama una sola vez a report_sources con el resultado de todas las fuentes.`;

const T_REVIEW = {
  name: "report_item_review",
  description: "Entrega la revisión de todos los ítems recibidos. Llámala una sola vez, al final.",
  strict: true, eager_input_streaming: true,
  input_schema: {type: "object", additionalProperties: false, required: ["reviews"], properties: {
    reviews: {type: "array", items: {type: "object", additionalProperties: false,
      required: ["key","verdict","reason","vignette","options","correct","whyCorrect","pearl","trap","front","back"],
      properties: {
        key: {type: "string"},
        verdict: {type: "string", enum: ["keep","update","remove"]},
        reason: {type: "string", description: "Una frase: qué cambió o por qué se mantiene"},
        vignette: {type: "string"}, options: {type: "array", items: {type: "string"}}, correct: {type: "integer"},
        whyCorrect: {type: "string"}, pearl: {type: "string"}, trap: {type: "string"},
        front: {type: "string"}, back: {type: "string"}
      }}}
  }}
};
const REVIEW_RULES = `Para cada ítem decide:
- "keep": sigue siendo correcto con la versión nueva.
- "update": algún dato cambió. Escribe la versión corregida completa. Conserva el estilo, el tema y la dificultad; cambia solo lo desactualizado.
- "remove": ya no es válido y no tiene arreglo razonable.
En "reason" explica en una frase qué cambió o por qué se mantiene.
Casos clínicos: llena vignette, options (exactamente 4), correct (índice 0 a 3), whyCorrect, pearl y trap; deja front y back vacíos. Tarjetas: llena front y back; deja los demás campos vacíos, options como lista vacía y correct en -1. Si el veredicto es keep o remove, deja todos los campos de contenido vacíos (correct en -1).
Escribe en español neutro, en texto plano. Cuando termines, llama una sola vez a report_item_review con todos los ítems.`;
const REVIEW_SYSTEM_WEB = `Eres un revisor de contenido médico para un banco de preguntas del examen de residencia. Una de las fuentes del banco tiene una versión más reciente y debes revisar los ítems que se basan en ella.
Antes de marcar un ítem como "update" o "remove", verifica el dato concreto en la versión nueva con la búsqueda web (sitio oficial, revista o PubMed). Si no puedes verificarlo, usa "keep" y di en "reason" qué no pudiste confirmar.

${REVIEW_RULES}`;
const REVIEW_SYSTEM_DOC = `Eres un revisor de contenido médico para un banco de preguntas del examen de residencia. El estudiante subió una versión nueva de un documento; debes revisar los ítems que se crearon con la versión anterior.
Compara cada ítem solo con el texto de la versión nueva que se adjunta. No uses información de otras fuentes. Si el texto adjunto no trata el tema de un ítem, usa "keep" y dilo en "reason".

${REVIEW_RULES}`;

// ---------- estado de cada fuente ----------
function allSources(){
  return [
    ...SOURCES.map(s=>{ const i = srcInfo(s.id); return {id:s.id, builtin:true, t:i.t, r:i.r, k:s.k}; }),
    ...S.sources.map(s=>({id:s.id, builtin:false, t:s.title, r:[s.org, s.year].filter(Boolean).join(", ") || "PDF propio", k:"pdf"}))
  ];
}
const chk = id => S.check[id];
function srcState(id){
  const c = chk(id); if (!c) return "none";
  if (c.status === "outdated") return c.adopted || c.replacedBy ? "adopted" : c.dismissed ? "dismissed" : "outdated";
  return c.status;
}
const STATE_UI = {
  none:["Sin revisar","var(--muted)","var(--subtle)"], current:["✓ Vigente","var(--ok)","var(--ok-soft)"],
  outdated:["⚠ Hay versión nueva","var(--bad)","var(--bad-soft)"], unknown:["? Sin confirmar","var(--warn)","var(--warn-soft)"],
  adopted:["✓ Actualizada por ti","var(--ok)","var(--ok-soft)"], dismissed:["Aviso ignorado","var(--muted)","var(--subtle)"]
};
const badge = st => { const [l,c,b] = STATE_UI[st]; return `<span class="tag" style="color:${c};background:${b}">${l}</span>`; };
const needsCheck = id => { const c = chk(id); return !c || Date.now() - c.at > STALE_DAYS*DAY; };
const fmtDate = ms => new Date(ms).toLocaleDateString("es", {day:"numeric", month:"short", year:"numeric"});
const safeUrl = u => /^https?:\/\/[^\s"'<>]+$/i.test(u || "") ? u : "";
const searchUrl = s => "https://www.google.com/search?q=" + encodeURIComponent(s.t + " última versión guía actualización");
function countItems(id){
  if (SRC_BY_ID[id]) return [...BUILTIN_Q.map(q=>"q"+q.id+"|"+q.src), ...BUILTIN_F.map(c=>"c"+c.id+"|"+c.src)].filter(k=>k.endsWith("|"+id) && !S.hidden[k.split("|")[0]]).length;
  return S.userQ.filter(q=>q.src===id && !S.hidden["q"+q.id]).length + S.userC.filter(c=>c.src===id && !S.hidden["c"+c.id]).length + S.userH.filter(h=>h.src===id && !S.hidden["h"+h.id]).length;
}

function renderVigCard(){
  const all = allSources();
  const out = all.filter(s=>srcState(s.id)==="outdated").length, pend = all.filter(s=>needsCheck(s.id)).length;
  $("#vigCard").innerHTML = `<div class="row"><h3 style="font-size:16px">🔎 Vigencia de las fuentes</h3><div class="spacer"></div><button class="btn primary sm" data-go="check">Revisar</button></div>
    <p class="small" style="margin:6px 0 0">${out ? `<b style="color:var(--bad)">${out} con versión más nueva</b> · ` : ""}${pend ? `${pend} sin revisar en los últimos 6 meses` : "Todas revisadas recientemente ✓"}</p>`;
}

// ---------- vista de revisión ----------
let chkSel = null, chkBusy = false, irev = null, pendingNewFor = null;
function renderCheck(){ renderChkTop(); renderChkList(); renderItemReview(); }
function renderChkTop(){
  const all = allSources();
  if (!chkSel) chkSel = new Set(all.filter(s=>needsCheck(s.id)).map(s=>s.id));
  const n = chkSel.size;
  const prevStatus = $("#chkStatus") ? $("#chkStatus").innerHTML : "";
  $("#chkTop").innerHTML = getKey() ? `
    <p class="small" style="margin:0">Claude busca en la web (sitio oficial, revista, PubMed) si hay una edición o actualización más reciente de cada fuente seleccionada y resume qué cambió. Después puedes actualizar las preguntas afectadas.</p>
    <div class="row" style="gap:6px"><span class="xs muted">Seleccionar:</span><button class="btn sm" data-sel="pend">Pendientes</button><button class="btn sm" data-sel="all">Todas</button><button class="btn sm" data-sel="none">Ninguna</button></div>
    <div class="xs muted">${n} seleccionada${n===1?"":"s"} · costo aprox. US$${(Math.ceil(n/5)*0.25).toFixed(2)} (incluye las búsquedas web) · ~1 min por cada 5 fuentes</div>
    <button class="btn primary block" id="chkGo" ${chkBusy || !n ? "disabled" : ""}>Revisar ${n} fuente${n===1?"":"s"} con IA</button>
    <div id="chkStatus" class="small">${prevStatus}</div>`
  : `<p class="small" style="margin:0">Para revisarlas automáticamente necesitas una clave de API (<button class="linkbtn" data-go="guide">cómo conseguirla</button>). También puedes hacerlo a mano: busca cada fuente con 🔗 y márcala como vigente o desactualizada.</p>`;
  document.querySelectorAll("[data-sel]").forEach(b=>b.onclick=()=>{
    const m = b.dataset.sel;
    chkSel = new Set(m==="all" ? all.map(s=>s.id) : m==="pend" ? all.filter(s=>needsCheck(s.id)).map(s=>s.id) : []);
    renderCheck();
  });
  $("#chkGo") && ($("#chkGo").onclick = runCheck);
}
function rowHTML(s){
  const c = chk(s.id), st = srcState(s.id), n = countItems(s.id);
  let det = "";
  if (c && c.latest && c.latest.t && st !== "current") {
    const u = safeUrl(c.latest.url);
    det = `<div class="note" style="margin-top:8px;border-color:${st==="outdated"?"var(--bad)":"var(--ok)"}"><b>Versión más nueva:</b> ${esc(c.latest.t)}${c.latest.org || c.latest.y ? ` — ${esc([c.latest.org, c.latest.y || ""].filter(Boolean).join(", "))}` : ""}${u ? ` · <a class="linkbtn" href="${esc(u)}" target="_blank" rel="noopener">ver</a>` : ""}
      ${c.changes && c.changes.length ? `<ul style="margin:6px 0 0;padding-left:18px">${c.changes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>`;
  }
  if (c && c.note) det += `<div class="xs muted" style="margin-top:4px">${esc(c.note)}</div>`;
  let acts = "";
  if (st === "outdated") acts += `${getKey() && n ? `<button class="btn primary sm" data-rev="${s.id}">Actualizar ${n} ítems con IA</button>` : ""}<button class="btn sm" data-upnew="${s.id}">⬆ Subir PDF de la nueva versión</button><button class="btn ghost sm" data-dis="${s.id}">Ignorar aviso</button>`;
  if (st === "adopted" && c.replacedBy) acts += `<button class="btn sm" data-open="${c.replacedBy}">Abrir la nueva versión</button>`;
  acts += `<a class="btn ghost sm" href="${searchUrl(s)}" target="_blank" rel="noopener">🔗 Buscar</a>`;
  if (st !== "current") acts += `<button class="btn ghost sm" data-man="${s.id}|current">Marcar vigente</button>`;
  if (st !== "outdated" && st !== "adopted") acts += `<button class="btn ghost sm" data-man="${s.id}|outdated">Marcar desactualizada</button>`;
  return `<div class="srcitem"><input type="checkbox" data-cs="${s.id}" ${chkSel.has(s.id)?"checked":""} ${getKey()?"":"hidden"} aria-label="Seleccionar" style="flex:none;width:20px;height:20px;margin-top:2px;accent-color:var(--accent)">
    <div style="flex:1;min-width:0"><div class="small" style="word-break:break-word"><b>${s.builtin ? "" : "📄 "}${esc(s.t)}</b></div>
      <div class="row xs muted" style="gap:6px;margin-top:4px">${badge(st)}<span>${esc(s.r)}</span>${c ? `<span>· revisada el ${fmtDate(c.at)}${c.by==="manual"?" (a mano)":""}</span>` : ""}<span>· ${n} ítems</span></div>
      ${det}<div class="row" style="margin-top:8px;gap:6px">${acts}</div></div></div>`;
}
function renderChkList(){
  const all = allSources(), order = {outdated:0, unknown:1, none:2, dismissed:3, adopted:4, current:5};
  const sorted = all.slice().sort((a,b)=>order[srcState(a.id)] - order[srcState(b.id)]);
  const archived = Object.keys(S.hidden).length;
  $("#chkList").innerHTML = `<h3 style="font-size:16px">Fuentes (${all.length})</h3>` + sorted.map(rowHTML).join("") +
    (archived ? `<hr><div class="row small"><span>${archived} ítem${archived===1?"":"s"} archivado${archived===1?"":"s"}: no aparecen en tus repasos.</span><div class="spacer"></div><button class="btn sm" id="unhide">Restaurar</button></div>` : "");
  const L = $("#chkList");
  L.querySelectorAll("[data-cs]").forEach(cb=>cb.onchange=()=>{ cb.checked ? chkSel.add(cb.dataset.cs) : chkSel.delete(cb.dataset.cs); renderChkTop(); });
  L.querySelectorAll("[data-rev]").forEach(b=>b.onclick=()=>reviewAffected(b.dataset.rev, "web", "check"));
  L.querySelectorAll("[data-dis]").forEach(b=>b.onclick=()=>{ chk(b.dataset.dis).dismissed = Date.now(); save(); renderCheck(); });
  L.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openSrc(b.dataset.open));
  L.querySelectorAll("[data-man]").forEach(b=>b.onclick=()=>{
    const [id, status] = b.dataset.man.split("|"); let latest = null;
    if (status === "outdated") { const v = prompt("¿Cómo se llama la versión nueva? (opcional)"); if (v === null) return; if (v.trim()) latest = {t: v.trim(), org:"", y:0, url:""}; }
    S.check[id] = {at: Date.now(), by: "manual", status, latest, changes: [], note: ""};
    save(); renderCheck();
  });
  L.querySelectorAll("[data-upnew]").forEach(b=>b.onclick=()=>{
    const id = b.dataset.upnew;
    if (SRC_BY_ID[id]) { pendingNewFor = id; $("#newVerIn").click(); }
    else { openSrc(id); $("#verIn") && $("#verIn").click(); }
  });
  $("#unhide") && ($("#unhide").onclick = ()=>{ if (confirm("¿Restaurar todos los ítems archivados a tu banco?")) { S.hidden = {}; rebuild(); save(); renderCheck(); refreshChips(); } });
}
$("#newVerIn").onchange = async e => {
  const f = e.target.files[0]; e.target.value = ""; const id = pendingNewFor; pendingNewFor = null;
  if (!f || !id) return;
  const c = chk(id);
  const newId = await addPdf(f, false, {replaces: id, title: (c && c.latest && c.latest.t) || f.name.replace(/\.pdf$/i,"")});
  if (newId) { c.replacedBy = newId; save(); openSrc(newId); }
};

async function runCheck(){
  const ids = [...chkSel]; if (!ids.length || chkBusy) return;
  chkBusy = true; renderChkTop();
  const status = html => { const el = $("#chkStatus"); if (el) el.innerHTML = html; };
  let done = 0, fails = 0;
  for (let i = 0; i < ids.length; i += 5) {
    const all = allSources();
    const batch = ids.slice(i, i+5).map(id=>all.find(s=>s.id===id)).filter(Boolean);
    status(`<span class="spin"></span> Buscando versiones nuevas: ${done+1}–${done+batch.length} de ${ids.length}…`);
    try {
      const parts = [];
      for (const s of batch) {
        let ex = "";
        if (!s.builtin) { try { const r = await getRec(s.id); ex = r.pages.slice(0,2).join("\n").slice(0,1500); } catch(e) {} }
        parts.push(`<fuente id="${s.id}">\nTítulo: ${s.t}\nReferencia: ${s.r}${ex ? `\nExtracto de las primeras páginas:\n${ex}` : ""}\n</fuente>`);
      }
      const input = await callForTool({
        system: CHECK_SYSTEM,
        tools: [{type: "web_search_20260209", name: "web_search", max_uses: batch.length*3}, T_SOURCES],
        user: `Fecha de hoy: ${todayKey()}.\n\n${parts.join("\n\n")}\n\nRevisa la vigencia de estas ${batch.length} fuentes.`
      }, "report_sources");
      const res = Array.isArray(input && input.results) ? input.results : [];
      for (const s of batch) {
        const r = res.find(x=>x && x.id===s.id);
        if (!r || !["current","outdated","unknown"].includes(r.status)) { fails++; continue; }
        const prev = S.check[s.id];
        const next = {at: Date.now(), by: "ia", status: r.status,
          latest: r.status==="outdated" && r.latest_title ? {t: String(r.latest_title), org: String(r.latest_org||""), y: Number.isInteger(r.latest_year) && r.latest_year>0 ? r.latest_year : 0, url: safeUrl(r.latest_url)} : null,
          changes: (Array.isArray(r.changes) ? r.changes : []).filter(x=>typeof x==="string").slice(0,6), note: String(r.note||"")};
        // si ya habías adoptado esa versión nueva, se conserva
        if (prev && (prev.adopted || prev.replacedBy) && !(next.latest && prev.latest && next.latest.t !== prev.latest.t)) {
          next.adopted = prev.adopted; next.replacedBy = prev.replacedBy; next.latest = next.latest || prev.latest;
          if (next.status === "current") next.status = "outdated";   // sigue mostrándose como “actualizada por ti”
        }
        S.check[s.id] = next; chkSel.delete(s.id);
      }
      save();
    } catch(err) {
      chkBusy = false; renderChkTop(); renderChkList();
      status(`<span style="color:var(--bad)">${esc(err.userMsg || err.message)}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button>`);
      return;
    }
    done += batch.length; renderChkList();
  }
  chkBusy = false; renderChkTop(); renderChkList();
  const out = ids.filter(id=>srcState(id)==="outdated").length;
  status(`✓ Revisión terminada: ${out} con versión más nueva${fails ? ` · ${fails} sin resultado (inténtalo de nuevo)` : ""}.`);
}

// ---------- actualizar los ítems afectados ----------
const strip = h => String(h||"").replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
function affectedItems(srcId, onlyStale){
  const isB = !!SRC_BY_ID[srcId];
  const pick = (arr, t) => arr.filter(o=>o.src===srcId && !S.hidden[t+o.id] && (!onlyStale || o.stale))
    .map(o=>({t, key: t+o.id, x: Object.assign({}, o, isB ? (S.over[t+o.id]||{}) : {})}));
  return [...pick(isB ? BUILTIN_Q : S.userQ, "q"), ...pick(isB ? BUILTIN_F : S.userC, "c")];
}
const serItem = it => it.t==="q"
  ? {key: it.key, tipo: "caso clínico", vineta: strip(it.x.vignette), opciones: it.x.options, correcta: it.x.correct, explicacion: it.x.whyCorrect, perla: it.x.pearl, trampa: it.x.trap}
  : {key: it.key, tipo: "tarjeta", frente: it.x.front, reverso: it.x.back};

async function reviewAffected(srcId, mode, where){
  const items = affectedItems(srcId, mode==="doc");
  if (!items.length) return toast("No hay ítems para revisar.");
  let ctx;
  if (mode === "web") {
    const c = chk(srcId), s = allSources().find(x=>x.id===srcId), L = (c && c.latest) || {};
    ctx = `Fuente anterior: ${s.t} (${s.r}).\nVersión nueva: ${L.t || "(nombre no disponible: búscala)"}${L.org ? ", "+L.org : ""}${L.y ? ", "+L.y : ""}${L.url ? "\nEnlace: "+L.url : ""}\nCambios conocidos:\n${(c && c.changes || []).map(x=>"- "+x).join("\n") || "(no especificados)"}`;
  } else {
    try { await getRec(srcId); } catch(e) {}
    const sel = selectedText();
    if (!sel) return toast("No encuentro el PDF en este dispositivo.");
    const chars = sel.pages.reduce((a,p)=>a+p.length, 0);
    if (chars > MAX_AI_CHARS) return toast("Demasiado texto: elige menos páginas en “Desde/Hasta pág.”.");
    ctx = `<documento_version_nueva paginas="${sel.nums.join(",")}">\n${sel.pages.map((p,i)=>`[pág. ${sel.nums[i]}]\n${p}`).join("\n\n")}\n</documento_version_nueva>`;
  }
  return runItemReview({items, ctx, mode, where, srcId, web: mode==="web", system: mode==="web" ? REVIEW_SYSTEM_WEB : REVIEW_SYSTEM_DOC});
}
async function runItemReview({items, ctx, mode, where, srcId, web, system, repId}){
  irev = {srcId, mode, where, repId, busy: true};
  renderItemReview();
  try {
    const rows = [];
    for (let i = 0; i < items.length; i += 15) {
      const batch = items.slice(i, i+15);
      const input = await callForTool({
        system,
        tools: web ? [{type: "web_search_20260209", name: "web_search", max_uses: 8}, T_REVIEW] : [T_REVIEW],
        user: `${ctx}\n\nÍtems a revisar (JSON):\n${JSON.stringify(batch.map(serItem), null, 1)}`
      }, "report_item_review");
      const revs = Array.isArray(input && input.reviews) ? input.reviews : [];
      batch.forEach(it=>rows.push(normRow(it, revs.find(r=>r && r.key===it.key))));
    }
    irev.rows = rows;
  } catch(err) { irev.err = err.userMsg || err.message; }
  irev.busy = false; renderItemReview();
}
function normRow(it, r){
  const keep = reason => ({it, verdict: "keep", reason, on: false});
  if (!r || !["keep","update","remove"].includes(r.verdict)) return keep("La IA no devolvió resultado para este ítem; se mantiene igual.");
  let nw = null;
  if (r.verdict === "update") {
    const ok = s => typeof s === "string" && s.trim().length > 0;
    if (it.t === "q") {
      if (!(ok(r.vignette) && Array.isArray(r.options) && r.options.length===4 && r.options.every(ok) && Number.isInteger(r.correct) && r.correct>=0 && r.correct<4))
        return keep("La corrección propuesta venía incompleta; se mantiene igual. " + (r.reason||""));
      nw = {vignette: r.vignette.trim(), options: r.options.map(o=>o.trim()), correct: r.correct,
            whyCorrect: ok(r.whyCorrect) ? r.whyCorrect.trim() : it.x.whyCorrect, pearl: ok(r.pearl) ? r.pearl.trim() : it.x.pearl, trap: ok(r.trap) ? r.trap.trim() : it.x.trap};
    } else {
      if (!(ok(r.front) && ok(r.back))) return keep("La corrección propuesta venía incompleta; se mantiene igual. " + (r.reason||""));
      nw = {front: r.front.trim(), back: r.back.trim()};
    }
  }
  return {it, verdict: r.verdict, reason: String(r.reason||""), nw, on: r.verdict !== "keep"};
}
function renderItemReview(){
  const target = irev ? ({src: "#srcRev", rep: "#repRev"}[irev.where] || "#itemReview") : null;
  ["#srcRev","#itemReview","#repRev"].forEach(q=>{ const el = $(q); if (el && q !== target) el.innerHTML = ""; });
  const box = target && $(target); if (!box) return;
  if (irev.busy) { box.innerHTML = `<div class="card"><span class="spin"></span> Claude está comparando cada ítem con la versión nueva${irev.mode==="web" ? " y verificando los datos en la web" : ""}. Puede tardar 1–3 minutos; no cierres la app.</div>`; return; }
  if (irev.err) { box.innerHTML = `<div class="card"><p class="small" style="margin:0"><span style="color:var(--bad)">${esc(irev.err)}</span> · <button class="linkbtn" data-go="guide">ver soluciones</button></p><button class="btn sm" id="irClose" style="margin-top:10px">Cerrar</button></div>`; $("#irClose").onclick = ()=>{ irev = null; renderItemReview(); }; return; }
  const rows = irev.rows, cnt = v => rows.filter(r=>r.verdict===v).length;
  const chip = {keep:["Sin cambios","var(--ok)"], update:["Corregir","var(--warn)"], remove:["Archivar","var(--bad)"]};
  box.innerHTML = `<div class="card">
    <div class="row"><h3 style="font-size:16px">Ítems afectados</h3><div class="spacer"></div><span class="xs muted">${cnt("update")} a corregir · ${cnt("remove")} a archivar · ${cnt("keep")} sin cambios</span></div>
    <p class="xs muted" style="margin:4px 0 6px">Marca los cambios que quieres aplicar. Los ítems corregidos vuelven a tu repaso como nuevos; los archivados dejan de aparecer (puedes restaurarlos). La IA puede equivocarse: revisa cada cambio.</p>
    ${rows.map((r,i)=>{ const x = r.it.x, isQ = r.it.t==="q";
      const before = isQ ? `${esc(strip(x.vignette))}<br><b>Respuesta:</b> ${esc(x.options[x.correct])}` : `${esc(x.front)} → <b>${esc(x.back)}</b>`;
      const after = !r.nw ? "" : isQ
        ? `${esc(r.nw.vignette)}<ol type="A" style="margin:4px 0 0;padding-left:20px">${r.nw.options.map((o,j)=>`<li style="${j===r.nw.correct?"color:var(--ok);font-weight:700":""}">${esc(o)}</li>`).join("")}</ol><div class="muted" style="margin-top:4px">${esc(r.nw.whyCorrect)}</div>`
        : `${esc(r.nw.front)} → <b>${esc(r.nw.back)}</b>`;
      return `<div class="cand ${r.verdict==="keep" || r.on ? "" : "off"}" id="ir${i}">${r.verdict==="keep" ? "<span></span>" : `<input type="checkbox" data-ir="${i}" ${r.on?"checked":""} aria-label="Aplicar">`}
        <div class="small" style="min-width:0"><div class="row xs" style="gap:6px"><span class="tag" style="color:${chip[r.verdict][1]}">${chip[r.verdict][0]}</span><span class="muted">${isQ ? "🩺 "+esc(x.topic||"Caso clínico") : "🃏 Tarjeta"}</span></div>
          ${r.reason ? `<div class="xs" style="margin-top:4px">${esc(r.reason)}</div>` : ""}
          <div class="xs muted" style="margin-top:6px"><b>Antes:</b> ${before}</div>
          ${after ? `<div class="xs" style="margin-top:6px;border-left:3px solid var(--ok);padding-left:8px"><b>Después:</b> ${after}</div>` : ""}</div></div>`; }).join("")}
    <div class="row" style="margin-top:12px"><button class="btn ghost" id="irClose">Cerrar</button><div class="spacer"></div><button class="btn primary" id="irApply">Aplicar ${rows.filter(r=>r.on).length} cambios</button></div></div>`;
  box.querySelectorAll("[data-ir]").forEach(cb=>cb.onchange=()=>{
    const i = +cb.dataset.ir; rows[i].on = cb.checked; $("#ir"+i).classList.toggle("off", !cb.checked);
    $("#irApply").textContent = `Aplicar ${rows.filter(r=>r.on).length} cambios`;
  });
  $("#irClose").onclick = ()=>{ irev = null; renderItemReview(); };
  $("#irApply").onclick = applyReview;
}
function applyReview(){
  const isB = !!SRC_BY_ID[irev.srcId]; let nu = 0, nr = 0;
  for (const r of irev.rows) {
    const key = r.it.key, t = r.it.t, id = key.slice(1);
    const own = isB ? null : (t==="q" ? S.userQ : S.userC).find(o=>String(o.id)===id);
    if (r.verdict === "keep") { if (own) delete own.stale; continue; }
    if (!r.on) continue;
    if (r.verdict === "remove") { S.hidden[key] = Date.now(); nr++; continue; }
    const fields = t==="q" ? Object.assign({}, r.nw, {vignette: esc(r.nw.vignette)}) : r.nw;
    if (isB) S.over[key] = Object.assign({}, fields, {upd: Date.now()});
    else { Object.assign(own, fields, {updated: Date.now()}); delete own.stale; }
    delete S.srs[key]; nu++;
  }
  if (isB && irev.mode === "web" && S.check[irev.srcId]) S.check[irev.srcId].adopted = Date.now();
  const where = irev.where, repId = irev.repId; irev = null;
  if (repId) { const rp = S.reports.find(x=>x.id===repId); if (rp) rp.status = nu || nr ? "fixed" : "done"; }
  rebuild(); save(); refreshChips();
  toast(`Listo: ${nu} ítem${nu===1?"":"s"} corregido${nu===1?"":"s"} y ${nr} archivado${nr===1?"":"s"}.`);
  where === "src" ? renderSrc() : where === "rep" ? renderRep() : renderCheck();
}

// ---------- PDF propio: datos, nueva versión y aviso de ítems viejos ----------
async function uploadNewVersion(f){
  const s = cur(), box = $("#srcBanner");
  box.innerHTML = `<div class="card"><span class="spin"></span> Leyendo la nueva versión…</div>`;
  try {
    const buf = await f.arrayBuffer();
    const pages = await extractPages(buf, (i,n)=> box.innerHTML = `<div class="card"><span class="spin"></span> Extrayendo texto: página ${i} de ${n}…</div>`);
    const rec = {blob: new Blob([buf], {type: "application/pdf"}), pages};
    await idb.put(s.id, rec); recCache[s.id] = rec;
    s.pages = pages.length; s.chars = pages.reduce((a,p)=>a+p.length, 0); s.version = (s.version||1) + 1; s.updated = Date.now();
    let n = 0; [["q",S.userQ],["c",S.userC],["h",S.userH]].forEach(([k,arr])=>arr.forEach(o=>{ if (o.src===s.id && !S.hidden[k+o.id]) { o.stale = true; n++; } }));
    S.check[s.id] = {at: Date.now(), by: "manual", status: "current", latest: null, changes: [], note: "Subiste la versión " + s.version + " de este PDF."};
    gen.from = 1; gen.to = Math.min(s.pages, 10);
    rebuild(); save();
    toast(n ? `Versión nueva cargada. ${n} ítems quedan marcados como de la versión anterior.` : "Versión nueva cargada ✓");
    renderSrc();
  } catch(err) { box.innerHTML = `<div class="card small" style="color:var(--bad)">No se pudo leer el PDF: ${esc(err.message || err)}</div>`; }
}
function renderSrcBanner(){
  const s = cur(), box = $("#srcBanner"); if (!s || !box) return;
  let html = "";
  const stale = [["q",S.userQ],["c",S.userC],["h",S.userH]].reduce((a,[k,arr])=>a + arr.filter(o=>o.src===s.id && o.stale && !S.hidden[k+o.id]).length, 0);
  if (stale) html += `<div class="card stack" style="border-color:var(--warn)">
      <p class="small" style="margin:0"><b>⚠ ${stale} ítem${stale===1?"":"s"} son de la versión anterior de este PDF.</b> ${getKey() ? `Claude puede compararlos con las págs. ${gen.from}–${gen.to} de la versión nueva (cambia el rango en la pestaña 🤖 del taller) y proponer correcciones.` : "Revísalos, o archívalos y genera preguntas nuevas."}</p>
      <div class="row" style="gap:6px">${getKey() ? `<button class="btn primary sm" id="stRev">Revisar con IA</button>` : ""}<button class="btn sm" id="stKeep">Mantener todos</button><button class="btn ghost sm" id="stArch" style="color:var(--bad)">Archivar todos</button></div></div>`;
  if (s.replaces && SRC_BY_ID[s.replaces]) {
    const old = SRC_BY_ID[s.replaces], n = countItems(s.replaces);
    html += `<div class="card small">📌 Esta es la versión nueva de <b>${esc(old.t)}</b> (${esc(old.r)}). Genera preguntas aquí abajo.${n ? `<div class="row" style="margin-top:8px;gap:6px"><span>Los ${n} ítems incluidos de la versión anterior siguen en tu banco.</span><button class="btn sm" id="oldArch">Archivarlos</button></div>` : ""}</div>`;
  }
  box.innerHTML = html;
  $("#stRev") && ($("#stRev").onclick = ()=>reviewAffected(s.id, "doc", "src"));
  $("#stKeep") && ($("#stKeep").onclick = ()=>{ [...S.userQ, ...S.userC, ...S.userH].forEach(o=>{ if (o.src===s.id) delete o.stale; }); save(); renderSrc(); });
  $("#stArch") && ($("#stArch").onclick = ()=>{ if (!confirm("¿Archivar los ítems de la versión anterior? Dejarán de aparecer en tus repasos.")) return;
    [["q",S.userQ],["c",S.userC],["h",S.userH]].forEach(([k,arr])=>arr.forEach(o=>{ if (o.src===s.id && o.stale) S.hidden[k+o.id] = Date.now(); }));
    rebuild(); save(); renderSrc(); refreshChips(); });
  $("#oldArch") && ($("#oldArch").onclick = ()=>{
    BUILTIN_Q.forEach(q=>{ if (q.src===s.replaces) S.hidden["q"+q.id] = Date.now(); }); BUILTIN_F.forEach(c=>{ if (c.src===s.replaces) S.hidden["c"+c.id] = Date.now(); });
    rebuild(); save(); toast("Ítems de la versión anterior archivados."); renderSrc(); refreshChips(); });
}
function editSrcMeta(){
  const s = cur(), box = $("#srcMetaForm");
  if (box.innerHTML) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="card stack" style="margin-top:10px">
    <label class="fld">Título<input type="text" id="mTitle" value="${esc(s.title)}"></label>
    <div class="grid2"><label class="fld">Organización o autor<input type="text" id="mOrg" value="${esc(s.org||"")}" placeholder="p. ej. AHA/ASA"></label><label class="fld">Año<input type="number" id="mYear" value="${s.year||""}" placeholder="2026"></label></div>
    <p class="xs muted" style="margin:0">Estos datos ayudan a identificar el documento al revisar si hay una versión más nueva.</p>
    <div class="row"><button class="btn primary sm" id="mSave">Guardar</button><button class="btn ghost sm" id="mCancel">Cancelar</button></div></div>`;
  $("#mCancel").onclick = ()=>{ box.innerHTML = ""; };
  $("#mSave").onclick = ()=>{ const t = $("#mTitle").value.trim(); if (t) s.title = t; s.org = $("#mOrg").value.trim(); s.year = +$("#mYear").value || ""; save(); renderSrc(); };
}
