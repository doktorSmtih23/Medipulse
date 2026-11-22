// ===================================================================
// CORREGIR A MANO: preguntas y fichas, antes de guardarlas (revisión) o ya guardadas.
// Lo creado por el usuario se cambia directamente; lo incluido en la app se corrige en S.over,
// así el original se conserva y la corrección vale solo en este dispositivo.
// ===================================================================
const MARCA_SIGNO = "verificar el signo";   // la IA lo agrega cuando el PDF trae los signos dañados
const tieneMarca = x => !!x && JSON.stringify(x).includes(MARCA_SIGNO);
// El enunciado guardado es HTML (escapado, con <span class='hy'> para resaltar); al editar se usa [[texto]].
const vigToText = v => String(v || "").replace(/<span class='hy'>([\s\S]*?)<\/span>/g, "[[$1]]")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const textToVig = t => esc(t).replace(/\[\[([\s\S]+?)\]\]/g, "<span class='hy'>$1</span>");

let corrSeq = 0;
// Especialidad: la IA a veces la asigna mal; se puede cambiar al revisar o al corregir.
const specSelHTML = (attr, val) => `<label class="fld">Especialidad<select ${attr}>${ESPS().map(s => `<option ${s === val ? "selected" : ""}>${esc(s)}</option>`).join("")}${ESP_NUEVA_OPT}</select></label>`;
function qEditHTML(q, crudo){
  const n = "qeOk" + (++corrSeq);
  return `<div class="stack qedit" style="gap:6px">
    <div class="grid2">${specSelHTML('data-qe="specialty"', q.specialty)}
    <label class="fld">Tipo de pregunta<select data-qe="tipo">${FOCUS.slice(1).map(f => `<option value="${f.k}" ${qKind(q) === f.k ? "selected" : ""}>${esc(f.t)}</option>`).join("")}</select></label></div>
    <label class="fld">Enunciado<textarea rows="4" data-qe="vignette">${esc(crudo ? q.vignette : vigToText(q.vignette))}</textarea></label>
    <span class="xs muted">Marca la respuesta correcta:</span>
    ${q.options.map((o, j) => `<div class="row" style="gap:6px;align-items:center;flex-wrap:nowrap"><input type="radio" name="${n}" value="${j}" ${j === q.correct ? "checked" : ""} aria-label="Correcta: ${"ABCDE"[j]}"><b>${"ABCDE"[j]}</b><input type="text" data-qo="${j}" value="${esc(o)}" style="flex:1;min-width:0"></div>`).join("")}
    <label class="fld">Explicación<textarea rows="3" data-qe="whyCorrect">${esc(q.whyCorrect || "")}</textarea></label>
    <label class="fld">💎 Perla<textarea rows="2" data-qe="pearl">${esc(q.pearl || "")}</textarea></label>
    <label class="fld">⚠️ Trampa<textarea rows="2" data-qe="trap">${esc(q.trap || "")}</textarea></label></div>`;
}
function qEditRead(box){
  const v = {options: [...box.querySelectorAll("[data-qo]")].map(i => i.value.trim())};
  box.querySelectorAll("[data-qe]").forEach(t => v[t.dataset.qe] = t.value.trim());
  const r = box.querySelector("input[type=radio]:checked"); v.correct = r ? +r.value : 0;
  return v;
}
function qEditError(v){
  if (!v.vignette) return "El enunciado no puede quedar vacío.";
  if (v.options.some(o => !o)) return "Todas las opciones deben tener texto.";
  if (v.options.length < 4 || v.options.length > 5) return "La pregunta debe tener 4 o 5 opciones.";
  if (new Set(v.options).size !== v.options.length) return "Hay dos opciones iguales.";
  return "";
}
function hEditHTML(h){
  return `<div class="stack hedit" style="gap:6px">
    ${specSelHTML('data-he="specialty"', h.specialty)}
    <label class="fld">Título<input type="text" data-he="title" value="${esc(h.title)}"></label>
    ${h.thresholds.map((x, j) => `<div class="erow two"><textarea rows="2" data-hl="${j}" aria-label="Qué es">${esc(x.label)}</textarea><textarea rows="2" data-hv="${j}" aria-label="Dato">${esc(x.val)}</textarea></div>`).join("")}
    <label class="fld">🚩 Bandera roja<textarea rows="2" data-he="redFlag">${esc(h.redFlag || "")}</textarea></label>
    <label class="fld">⚠️ Trampa<textarea rows="2" data-he="trap">${esc(h.trap || "")}</textarea></label></div>`;
}
function hEditRead(box){
  const v = {thresholds: [...box.querySelectorAll("[data-hl]")].map(t => ({label: t.value.trim(), val: box.querySelector(`[data-hv="${t.dataset.hl}"]`).value.trim()}))};
  box.querySelectorAll("[data-he]").forEach(t => v[t.dataset.he] = t.value.trim());
  return v;
}
function hEditError(v){
  if (!v.title) return "Ponle un título a la ficha.";
  if (v.thresholds.some(x => !x.label || !x.val)) return "Cada dato necesita qué es y su valor.";
  return "";
}

// Corregir un ítem ya guardado. kind: "q" (pregunta) o "h" (ficha).
function openCorregir(kind, item, box, onDone){
  if (!box) return;
  if (box.innerHTML) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="repform stack" style="text-align:left">
    ${kind === "q" ? qEditHTML(item) : hEditHTML(item)}
    <p class="xs muted" style="margin:0">Compara con la página original antes de guardar.${item.src && item.page ? ` <button class="linkbtn" data-corr-pg>Abrir pág. ${item.page}</button>` : ""}</p>
    <div class="row"><button class="btn primary sm" data-corr-save>Guardar corrección</button><button class="btn ghost sm" data-corr-x>Cancelar</button></div></div>`;
  const pg = box.querySelector("[data-corr-pg]"); if (pg) pg.onclick = () => openPdf(item.src, item.page);
  box.querySelector("[data-corr-x]").onclick = () => { box.innerHTML = ""; };
  box.querySelector("[data-corr-save]").onclick = () => {
    const v = kind === "q" ? qEditRead(box) : hEditRead(box), err = kind === "q" ? qEditError(v) : hEditError(v);
    if (err) return toast(err);
    if (kind === "q") v.vignette = textToVig(v.vignette);
    if (kind === "h" && v.specialty) v.accent = SPEC_COLOR[v.specialty];
    v.edited = Date.now();
    const propio = (kind === "q" ? S.userQ : S.userH).find(x => String(x.id) === String(item.id));
    if (propio) Object.assign(propio, v);
    else corregirIncluido(kind + item.id, v);
    rebuild(); save(); box.innerHTML = "";
    toast("Corregido ✓");
    onDone && onDone(kind === "q" ? qById(item.id) : hyById(item.id));
  };
}
