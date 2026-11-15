// ===================================================================
// MIS APUNTES: el cuaderno dentro de la app. Una libreta por semana o rotación, una entrada por día y
// puntos numerados (como se toma nota en GoodNotes o en papel; la app no lee escritura a mano).
// Cada punto se vuelve ficha a mano o preguntas con IA, y la libreta entera se estudia con las
// herramientas de Fuentes (índice por día, fichas, auditoría, revisión de tema, pase de revista).
// Un punto con «??» o «(?)» queda por verificar hasta que el usuario lo confirme en la fuente.
// ===================================================================
let apCur = null, apEdit = null, apQuery = "", apSoloVerif = false;

const AP_DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const AP_MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const apDiaHoy = (d = new Date()) => `${AP_DIAS[d.getDay()]} ${d.getDate()} ${AP_MESES[d.getMonth()]}`;
const apLibs = () => S.apuntes || (S.apuntes = []);
const apLib = id => apLibs().find(l => l.id === id);
const apId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
// El área de la libreta es libre (Otorrino, Neurología, Urgencias…). Las fichas y preguntas van a una de
// las especialidades de la app (para estadísticas y simulacros) y llevan el área como etiqueta.
const apBase = lib => SPECS.includes(lib.spec) ? lib.spec : "Medicina Interna";
const apEtiqueta = lib => SPECS.includes(lib.spec) ? "" : (lib.spec || "");
const apAreasHTML = () => `<datalist id="apAreas">${[...new Set([...SPECS, ...apLibs().map(l => l.spec).filter(Boolean)])].map(a => `<option value="${esc(a)}">`).join("")}</datalist>`;
const AP_VERIF = /\s*(?:\(\?\)|\?\?)/g, AP_HAY_VERIF = /\(\?\)|\?\?/;

// ---------- atajos al escribir ----------
// Se aplican al terminar de escribir el atajo: «->» queda «→» apenas se escribe «>».
const AP_ATAJOS = [[/->$/, "→"], [/<-$/, "←"], [/=>$/, "⇒"], [/>=$/, "≥"], [/<=$/, "≤"], [/!=$/, "≠"], [/\+-$/, "±"],
  // O2, CO2, SatO2, PaO2, PaCO2, FiO2… y ug, al escribir el espacio o el signo que sigue
  [/(^|[^\p{L}\p{N}])((?:sat|pa|sp|fi|et|p)?c?o)2([\s.,;:)\]<>=≤≥%])$/iu, "$1$2₂$3"],
  [/(^|[^\p{L}\p{N}])ug([\s.,;:)\/])$/u, "$1µg$2"]];
const AP_ATAJOS_AYUDA = [["->", "→"], ["=>", "⇒"], [">=", "≥"], ["<=", "≤"], ["!=", "≠"], ["+-", "±"], ["O2, SatO2, PaCO2", "O₂, SatO₂, PaCO₂"], ["ug", "µg"]];
function apAtajo(ta){
  const pos = ta.selectionStart; if (pos !== ta.selectionEnd) return;
  const antes = ta.value.slice(0, pos), cola = antes.slice(-14);
  let nueva = cola;
  for (const [re, rep] of AP_ATAJOS) nueva = nueva.replace(re, rep);
  if (nueva === cola) return;
  ta.value = antes.slice(0, -cola.length) + nueva + ta.value.slice(pos);
  const p = pos - cola.length + nueva.length; ta.setSelectionRange(p, p);
}
// Enter continúa la lista: «3. …» sigue con «4. », «- …» con «- »; en un ítem vacío, termina la lista.
function apEnter(e){
  if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
  const ta = e.target, pos = ta.selectionStart; if (pos !== ta.selectionEnd) return;
  const v = ta.value, ini = v.lastIndexOf("\n", pos - 1) + 1, linea = v.slice(ini, pos);
  const num = linea.match(/^(\s*)(\d+)([.)])\s*(.*)$/), vin = linea.match(/^(\s*)([-•+*])\s*(.*)$/);
  const m = num || vin; if (!m) return;
  e.preventDefault();
  let ins, desde = pos;
  if (!(num ? num[4] : vin[3]).trim()) { desde = ini; ins = ""; }        // ítem vacío: se borra el marcador
  else ins = "\n" + m[1] + (num ? (+num[2] + 1) + num[3] + " " : vin[2] + " ");
  ta.value = v.slice(0, desde) + ins + v.slice(pos);
  const p = desde + ins.length; ta.setSelectionRange(p, p);
  ta.dispatchEvent(new Event("input", {bubbles: true}));
}

// ---------- puntos de una entrada ----------
// Un punto empieza en una línea numerada («1.», «2)») o después de una línea en blanco; las líneas
// que siguen (viñetas, continuaciones) son parte del mismo punto.
function apPuntos(texto){
  const out = []; let p = null, nuevo = true;
  (texto || "").replace(/\r/g, "").split("\n").forEach(l => {
    if (!l.trim()) { nuevo = true; return; }
    if (!p || nuevo || /^\s{0,3}\d+[.)]\s/.test(l)) { p = {lines: []}; out.push(p); }
    p.lines.push(l); nuevo = false;
  });
  return out.map(x => {
    const raw = x.lines.join("\n"), text = raw.trim();
    return {raw, text, verif: AP_HAY_VERIF.test(text), key: norm(x.lines[0].replace(/^\s*\d+[.)]\s*/, "")).slice(0, 60)};
  }).filter(x => x.text.replace(/^\d+[.)]\s*/, "").trim());
}
// Ficha a partir del punto: el título es lo que va antes de la primera flecha o «:», y cada línea
// «qué → dato» o «qué: dato» es un dato clave; una línea sin separador se suma al dato anterior.
const AP_SEP = /\s*(?:→|⇒|->|=>|:\s)\s*/;
function apFicha(text){
  const lines = text.split("\n").map(l => l.replace(/^\s*(?:\d+[.)]|[-•+*])\s*/, "").replace(AP_VERIF, "").trim()).filter(Boolean);
  let title = "", rows = [];
  lines.forEach((l, i) => {
    const parts = l.split(AP_SEP).map(x => x.replace(/^[-•+*]\s*/, "").trim()).filter(Boolean);
    if (parts.length >= 2 && !/^\d+$/.test(parts[0])) {
      if (!i) title = parts[0];
      rows.push({label: parts[0], val: parts.slice(1).join(" → ")});
    } else if (!i) title = l;
    else if (rows.length) rows[rows.length - 1].val += " · " + l;
    else rows.push({label: title, val: l});
  });
  return {title: title.replace(/[:.]$/, "").slice(0, 90), rows: rows.slice(0, 8)};
}
// Muestra el punto con su numeración, viñetas y las marcas de «por verificar».
function apPuntoHTML(text){
  return text.split("\n").map(l => {
    const t = esc(l.trim()).replace(/\(\?\)|\?\?/g, `<span class="apv" title="Por verificar">⚠</span>`);
    if (/^\d+[.)]\s/.test(l.trim())) return `<div class="aph">${t.replace(/^(\d+[.)])/, "<b>$1</b>")}</div>`;
    return `<div class="${/^\s*[-•+*]/.test(l) || /^\s{2,}/.test(l) ? "apsub" : "apl"}">${t}</div>`;
  }).join("");
}
const apTodos = () => apLibs().flatMap(lib => lib.entries.flatMap(e => apPuntos(e.text).map(pt => ({lib, e, pt}))));

// ---------- la libreta como documento para estudiar ----------
// Cada punto es una «parte» del documento y cada día, un tema del índice. Así funcionan con los
// apuntes las mismas herramientas que con un PDF.
function apSync(lib){
  const ents = lib.entries.slice().sort((a, b) => a.at - b.at), pages = [], items = [];
  ents.forEach(e => { const pts = apPuntos(e.text); if (!pts.length) return;
    items.push({title: e.day || "Sin fecha", from: pages.length + 1, to: pages.length + pts.length, lvl: 1});
    pts.forEach(p => pages.push(p.text)); });
  if (!pages.length) return null;
  let s = S.sources.find(x => x.id === lib.srcId);
  if (!s) { s = {id: apId("a"), added: Date.now(), kind: "text", apunte: lib.id}; S.sources.push(s); lib.srcId = s.id; }
  Object.assign(s, {title: lib.title, spec: apBase(lib), pages: pages.length, chars: pages.reduce((a, p) => a + p.length, 0), indice: {fuente: "apuntes", items}});
  const rec = {blob: null, pages};
  recCache[s.id] = rec; idb.put(s.id, rec).catch(() => {});
  save();
  return s;
}
const apParte = (s, pt) => Math.max(1, recCache[s.id].pages.indexOf(pt.text) + 1);
function apEstudiar(lib){
  const s = apSync(lib);
  if (!s) return toast("Escribe algo en la libreta primero.");
  openSrc(s.id);
}
function apSalirEdicion(lib){ apEdit = null; if (lib.srcId) apSync(lib); }

const AP_ASK = () => ["Es un apunte que el médico escribió durante su rotación o su estudio: frases cortas, flechas y abreviaturas (Tto = tratamiento, Dx = diagnóstico, Sx = síndrome, Rx = radiografía, → = lleva a o se maneja con).",
  "Crea 1 ficha high-yield con lo que dice el apunte y hasta 2 preguntas (qtype \"caso\" o \"directa\") que lo evalúen. Usa solo los datos del apunte, sin agregar otros.",
  "Si un dato del apunte contradice lo establecido en las guías o los textos de referencia vigentes, no lo uses como respuesta correcta: en el campo trap de la ficha escribe «REVISA TU APUNTE:» y explica en una frase qué dato parece incorrecto y por qué.",
  "Si el apunte no tiene información médica suficiente, deja \"fichas\" y \"questions\" vacíos.",
  gen.lang === "en" ? "Idioma: escribe todo en inglés." : "Idioma: escribe en español neutro y conserva los términos técnicos tal como aparecen."].join("\n") + focusLine();
async function apIA(lib, pt, btn){
  if (!getKey()) { toast("Para usar la IA, guarda primero tu clave en Fuentes."); go("lib"); const k = $("#keyIn"); k && k.focus(); return; }
  if (genBusy) return;
  const s = apSync(lib); if (!s) return;
  const n = apParte(s, pt);
  genBusy = true; btn.disabled = true; btn.innerHTML = `<span class="spin"></span> Creando…`;
  try {
    prepSrc(s.id, {tab: "ai", rdPage: n, label: apEtiqueta(lib)});
    const res = await aiGenerate({a: n, b: n, nums: [n], pages: [pt.text]}, lib.title, AP_ASK());
    if (!res.length) { toast("La IA no encontró qué preguntar en este punto."); return; }
    cands = res; go("src");
    setTimeout(() => $("#reviewBox").scrollIntoView({behavior: "smooth", block: "start"}), 150);
  } catch(err) { toast(err.userMsg || err.message); }
  finally { genBusy = false; if (btn.isConnected) { btn.disabled = false; btn.textContent = "✨ Preguntas con IA"; } }
}
function apNuevaFicha(lib, pt, box){
  const s = apSync(lib), f = apFicha(pt.text);
  hyEditor(box, {title: f.title, badge: apEtiqueta(lib), spec: apBase(lib), rows: f.rows, src: s.id, page: apParte(s, pt), ctx: pt.text.replace(AP_VERIF, ""),
    heading: "💎 Ficha de tu apunte", flags: {manual: true, apLib: lib.id, apKey: pt.key},
    onSave: () => renderApuntes(), onCancel: () => { box.innerHTML = ""; }});
}
function apVerificado(lib, e, pt){
  e.text = e.text.replace(pt.raw, pt.raw.replace(AP_VERIF, "")); lib.upd = Date.now(); save();
  if (lib.srcId) apSync(lib);
  toast("Marcado como verificado ✓"); renderApuntes();
}

// ---------- pantallas ----------
function renderApuntes(){
  const lib = apCur && apLib(apCur);
  if (!lib) { apCur = null; return renderLibretas(); }
  renderLibreta(lib);
}
function puntoHTML(lib, e, pt, i, conOrigen){
  const hecha = S.userH.some(h => h.apLib === lib.id && h.apKey === pt.key && !S.hidden["h" + h.id]);
  return `<div class="appt${pt.verif ? " verif" : ""}" data-pt="${i}">
    ${conOrigen ? `<div class="xs muted">📓 ${esc(lib.title)} · ${esc(e.day)}</div>` : ""}
    <div class="aptx">${apPuntoHTML(pt.text)}</div>
    <div class="row" style="gap:6px;margin-top:6px">
      <button class="btn sm" data-apf>💎 Ficha</button><button class="btn sm" data-apia>✨ Preguntas con IA</button>
      ${pt.verif ? `<button class="btn ghost sm" data-apok>✓ Ya lo verifiqué</button>` : ""}
      ${hecha ? `<span class="xs muted">✓ ficha creada</span>` : ""}</div>
    <div data-aped></div></div>`;
}
function bindPuntos(box, lista){
  box.querySelectorAll(".appt").forEach(el => {
    const {lib, e, pt} = lista[+el.dataset.pt];
    el.querySelector("[data-apf]").onclick = () => apNuevaFicha(lib, pt, el.querySelector("[data-aped]"));
    el.querySelector("[data-apia]").onclick = ev => apIA(lib, pt, ev.currentTarget);
    const ok = el.querySelector("[data-apok]"); ok && (ok.onclick = () => apVerificado(lib, e, pt));
  });
}
function renderLibretas(){
  const libs = apLibs().slice().sort((a, b) => (b.upd || 0) - (a.upd || 0)), todos = apTodos(), nVerif = todos.filter(x => x.pt.verif).length;
  const q = norm(apQuery.trim()), filtrar = !!q || apSoloVerif;
  const res = filtrar ? todos.filter(x => (!apSoloVerif || x.pt.verif) && (!q || norm(x.pt.text).includes(q) || norm(x.e.day).includes(q))) : [];
  $("#apBox").innerHTML = `
    <div><h2>📓 Mis apuntes</h2><p class="muted small" style="margin:4px 0 0">Escribe aquí lo que antes anotabas en el cuaderno o en GoodNotes: una libreta por semana o rotación, una entrada por día y tus puntos numerados. Cada punto se vuelve ficha o preguntas con un toque.</p></div>
    <div class="card stack">
      <div class="grid2"><label class="fld">Nueva libreta<input type="text" id="apTitle" placeholder="p. ej. Semana 18 · Rotación de Pediatría"></label>
        <label class="fld">Área<input type="text" id="apSpec" list="apAreas" placeholder="p. ej. Pediatría, Otorrino, Neurología"></label>${apAreasHTML()}</div>
      <button class="btn primary" id="apNew">➕ Crear libreta</button></div>
    ${libs.length ? `<div class="row" style="gap:6px"><input type="search" id="apQ" value="${esc(apQuery)}" placeholder="Buscar en tus apuntes: p. ej. HINTS, Ramsay, salbutamol…" style="flex:1;min-width:0">
      ${nVerif ? `<button class="chip2${apSoloVerif ? " on" : ""}" id="apVf">⚠ Por verificar (${nVerif})</button>` : ""}</div>` : ""}
    <div id="apRes" class="stack"></div>
    ${filtrar ? "" : libs.map(l => { const pts = l.entries.flatMap(e => apPuntos(e.text)), v = pts.filter(p => p.verif).length;
      return `<div class="card apcard"><div class="ic">📓</div><div style="flex:1;min-width:0"><b style="word-break:break-word">${esc(l.title)}</b>
        <div class="xs muted">${esc(l.spec)} · ${l.entries.length} entrada${l.entries.length === 1 ? "" : "s"} · ${pts.length} punto${pts.length === 1 ? "" : "s"}${v ? ` · <span style="color:var(--warn)">⚠ ${v} por verificar</span>` : ""}${l.upd ? ` · ${fmtDate(l.upd)}` : ""}</div></div>
        <button class="btn" data-apopen="${l.id}">Abrir</button></div>`; }).join("")
      || `<p class="muted small" style="margin:0">Aún no tienes libretas. Crea la de esta semana y escribe lo de hoy.</p>`}`;
  if (filtrar) {
    $("#apRes").innerHTML = res.length ? `<p class="xs muted" style="margin:0">${res.length} punto${res.length === 1 ? "" : "s"}</p>` + res.map((x, i) => puntoHTML(x.lib, x.e, x.pt, i, true)).join("")
      : `<p class="muted small" style="margin:0">Sin resultados.</p>`;
    bindPuntos($("#apRes"), res);
  }
  $("#apNew").onclick = () => {
    const title = $("#apTitle").value.trim() || `Semana del ${apDiaHoy()}`;
    const lib = {id: apId("l"), title, spec: $("#apSpec").value.trim() || "Medicina Interna", created: Date.now(), upd: Date.now(), entries: []};
    apLibs().push(lib); save(); apCur = lib.id; apNuevaEntrada(lib);
  };
  $("#apQ") && ($("#apQ").oninput = () => { apQuery = $("#apQ").value; clearTimeout(renderLibretas._t);
    renderLibretas._t = setTimeout(() => { renderLibretas(); const i = $("#apQ"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); });
  $("#apVf") && ($("#apVf").onclick = () => { apSoloVerif = !apSoloVerif; renderLibretas(); });
  document.querySelectorAll("[data-apopen]").forEach(b => b.onclick = () => { apCur = b.dataset.apopen; apEdit = null; renderApuntes(); scrollTo(0, 0); });
}
function apNuevaEntrada(lib){
  const hoy = apDiaHoy(), e = lib.entries.find(x => x.day === hoy) || (lib.entries.push({id: apId("e"), day: hoy, text: "1. ", at: Date.now()}), lib.entries[lib.entries.length - 1]);
  apEdit = e.id; save(); renderApuntes();
  const ta = document.querySelector(`[data-ent="${e.id}"] textarea`);
  if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); ta.scrollIntoView({behavior: "smooth", block: "center"}); }
}
function renderLibreta(lib){
  const ents = lib.entries.slice().sort((a, b) => b.at - a.at), pts = ents.flatMap(e => apPuntos(e.text));
  const lista = [];
  $("#apBox").innerHTML = `
    <button class="btn ghost" id="apBack" style="align-self:flex-start">← Mis apuntes</button>
    <div><h2 style="word-break:break-word">📓 ${esc(lib.title)}</h2><div class="xs muted" style="margin-top:4px">${esc(lib.spec)} · ${pts.length} punto${pts.length === 1 ? "" : "s"}${pts.some(p => p.verif) ? ` · ⚠ ${pts.filter(p => p.verif).length} por verificar` : ""}</div></div>
    <div class="row" style="gap:6px"><button class="btn primary" id="apHoy">✏️ Escribir lo de hoy</button><button class="btn" id="apStudy" ${pts.length ? "" : "disabled"}>📚 Estudiar la libreta</button></div>
    <p class="xs muted" style="margin:0">📚 <b>Estudiar la libreta</b> la abre como un documento: índice por día, fichas y preguntas con IA, auditoría, revisión de tema y pase de revista.</p>
    ${ents.map(e => {
      if (apEdit === e.id) return `<div class="card stack" data-ent="${e.id}">
        <div class="row" style="gap:6px"><input type="text" class="apday" value="${esc(e.day)}" aria-label="Día" style="flex:1;min-width:0;font-weight:600"><button class="btn primary sm" data-apdone>✓ Listo</button></div>
        <textarea class="apta" rows="8" spellcheck="true" aria-label="Apuntes de ${esc(e.day)}" placeholder="1. Crisis asmática moderada -> salbutamol 4-6 inh c/20 min&#10;   - O2 si SatO2 < 92 %&#10;2. …">${esc(e.text)}</textarea>
        <div class="row xs muted" style="gap:8px"><span data-apsaved>Se guarda solo mientras escribes.</span><div class="spacer"></div><button class="linkbtn" data-apdel style="color:var(--bad)">Borrar esta entrada</button></div>
        <details class="xs muted"><summary>⌨️ Atajos y dictado</summary>
          <div style="margin-top:6px">${AP_ATAJOS_AYUDA.map(([a, b]) => `<code>${esc(a)}</code> → ${b}`).join(" · ")}</div>
          <div style="margin-top:4px">Enter sigue la numeración (1. → 2.) y las viñetas (-). Escribe <code>??</code> en un dato que debas confirmar: queda ⚠ por verificar.</div>
          <div style="margin-top:4px">🎙️ Para dictar en vez de escribir, toca el micrófono del teclado de tu celular o iPad: es gratis y no usa la IA de la app.</div></details></div>`;
      const ps = apPuntos(e.text), base = lista.length; ps.forEach(pt => lista.push({lib, e, pt}));
      return `<div class="card stack" data-ent="${e.id}"><div class="row"><b>${esc(e.day)}</b><div class="spacer"></div><button class="btn ghost sm" data-apedit>✏️ Escribir</button></div>
        ${ps.length ? ps.map((pt, i) => puntoHTML(lib, e, pt, base + i)).join("") : `<p class="muted small" style="margin:0">Vacía.</p>`}</div>`;
    }).join("") || `<p class="muted small" style="margin:0">La libreta está vacía. Toca <b>✏️ Escribir lo de hoy</b>.</p>`}
    <div id="apRenBox"></div>
    <div class="row" style="gap:6px"><button class="btn ghost sm" id="apRen">✏️ Nombre y área</button><button class="btn ghost sm" id="apDel" style="color:var(--bad)">Eliminar libreta</button></div>`;
  bindPuntos($("#apBox"), lista);
  $("#apBack").onclick = () => { apSalirEdicion(lib); apCur = null; renderApuntes(); scrollTo(0, 0); };
  $("#apHoy").onclick = () => apNuevaEntrada(lib);
  $("#apStudy").onclick = () => { apSalirEdicion(lib); apEstudiar(lib); };
  $("#apRen").onclick = () => {
    const b = $("#apRenBox"); if (b.innerHTML) { b.innerHTML = ""; return; }
    b.innerHTML = `<div class="card stack"><div class="grid2"><label class="fld">Nombre<input type="text" id="apRenT" value="${esc(lib.title)}"></label>
      <label class="fld">Área<input type="text" id="apRenA" list="apAreas" value="${esc(lib.spec)}"></label>${apAreasHTML()}</div>
      <p class="xs muted" style="margin:0">El área es libre. Si no es una de las especialidades de la app (${SPECS.join(", ")}), tus fichas y preguntas la llevan como etiqueta y cuentan en Medicina Interna para las estadísticas.</p>
      <div class="row" style="gap:6px"><button class="btn primary sm" id="apRenOk">Guardar</button><button class="btn ghost sm" id="apRenX">Cancelar</button></div></div>`;
    $("#apRenT").focus();
    $("#apRenX").onclick = () => { b.innerHTML = ""; };
    $("#apRenOk").onclick = () => { const t = $("#apRenT").value.trim(); if (!t) return toast("Ponle un nombre a la libreta.");
      lib.title = t; lib.spec = $("#apRenA").value.trim() || lib.spec; lib.upd = Date.now(); save(); if (lib.srcId) apSync(lib); renderApuntes(); toast("Libreta actualizada ✓"); };
  };
  $("#apDel").onclick = async () => {
    if (!confirm(`¿Eliminar la libreta «${lib.title}»? Las fichas y preguntas que ya creaste con ella se conservan. No se puede deshacer.`)) return;
    S.apuntes = apLibs().filter(l => l !== lib);
    if (lib.srcId) { S.sources = S.sources.filter(s => s.id !== lib.srcId); delete recCache[lib.srcId]; try { await idb.del(lib.srcId); } catch(e) {} }
    save(); apCur = null; apEdit = null; renderApuntes(); toast("Libreta eliminada");
  };
  document.querySelectorAll("[data-apedit]").forEach(b => b.onclick = () => {
    apEdit = b.closest("[data-ent]").dataset.ent; renderApuntes();
    const ta = document.querySelector(`[data-ent="${apEdit}"] textarea`); ta && (ta.focus(), ta.setSelectionRange(ta.value.length, ta.value.length));
  });
  const ed = document.querySelector(`[data-ent="${apEdit}"]`); if (!ed) return;
  const e = lib.entries.find(x => x.id === apEdit), ta = ed.querySelector("textarea"), dia = ed.querySelector(".apday");
  const crecer = () => { ta.style.height = "auto"; ta.style.height = Math.max(160, ta.scrollHeight + 4) + "px"; };
  let t = null;
  const guardar = () => { e.text = ta.value; e.day = dia.value.trim() || e.day; lib.upd = Date.now(); clearTimeout(t); t = setTimeout(save, 400); ed.querySelector("[data-apsaved]").textContent = "Guardado ✓"; };
  ta.addEventListener("input", ev => { if (ev.inputType && ev.inputType.startsWith("insert")) apAtajo(ta); crecer(); guardar(); });
  ta.addEventListener("keydown", apEnter);
  dia.addEventListener("input", guardar);
  crecer();
  ed.querySelector("[data-apdone]").onclick = () => { e.text = ta.value; save(); apSalirEdicion(lib); renderApuntes(); };
  ed.querySelector("[data-apdel]").onclick = () => {
    if (ta.value.trim() && ta.value.trim() !== "1." && !confirm(`¿Borrar la entrada «${e.day}»?`)) return;
    lib.entries = lib.entries.filter(x => x !== e); save(); apSalirEdicion(lib); renderApuntes();
  };
}
