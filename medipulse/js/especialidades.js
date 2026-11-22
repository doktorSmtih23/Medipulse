// ===================================================================
// MIS ESPECIALIDADES
// ===================================================================
// Además de las 5 básicas (SPECS, data/especialidades.js), el usuario puede crear especialidades para sus
// fuentes (Neurología, Psiquiatría…). Aparecen en Casos, Fichas, Crear, Mis apuntes, Progreso y
// vulnerabilidades. El diagnóstico, el plan semanal y las sugerencias de Hoy siguen con las 5 básicas: miden
// lo que tiene alta probabilidad de salir en el examen.
// Este archivo es el dueño de S.especialidades.
const ESP_COLORES = ["#2563eb", "#9333ea", "#c2410c", "#0f766e", "#be123c", "#4d7c0f", "#a16207", "#0369a1", "#7e22ce", "#15803d"];
const espPropias = () => S.especialidades || (S.especialidades = []);
// Todas las especialidades: las 5 básicas y las del usuario.
const ESPS = () => [...SPECS, ...espPropias().map(e => e.nombre)];
const esBasica = n => SPECS.includes(n);
// Si ya existe con otra escritura («neurologia» y «Neurología»), devuelve la que existe.
const espExistente = n => ESPS().find(x => norm(x) === norm(String(n || "").trim()));
// Los colores de las propias se suman a los de las básicas.
function espColores(){ espPropias().forEach(e => { SPEC_COLOR[e.nombre] = e.color; }); }
espColores();

// Crea una especialidad y devuelve su nombre (o el de la que ya existía). No guarda: guarda quien llama.
function crearEspecialidad(nombre){
  const n = String(nombre || "").trim().replace(/\s+/g, " ");
  if (n.length < 3 || n.length > 40) return null;
  const ya = espExistente(n); if (ya) return ya;
  const nombreBonito = n.charAt(0).toUpperCase() + n.slice(1);
  const usados = new Set(espPropias().map(e => e.color)), color = ESP_COLORES.find(c => !usados.has(c)) || ESP_COLORES[espPropias().length % ESP_COLORES.length];
  espPropias().push({nombre: nombreBonito, color, creada: Date.now()});
  espColores();
  return nombreBonito;
}
// Cambia la especialidad de todo lo que la usa: ítems propios, correcciones, documentos, libretas y la práctica.
function espReasignar(de, a){
  [...(S.userQ || []), ...(S.userH || []), ...(S.userC || [])].forEach(x => { if (x.specialty === de) x.specialty = a; });
  Object.values(S.over || {}).forEach(o => { if (o && o.specialty === de) o.specialty = a; });
  (S.sources || []).forEach(s => { if (s.spec === de) s.spec = a; });
  (S.apuntes || []).forEach(l => { if (l.spec === de) l.spec = a; });
  const P = prac(); P.specs = [...new Set(P.specs.map(s => s === de ? a : s))];
}
function renombrarEspecialidad(viejo, nuevo){
  const e = espPropias().find(x => x.nombre === viejo), n = String(nuevo || "").trim().replace(/\s+/g, " ");
  if (!e || n.length < 3 || n.length > 40) return false;
  const ya = espExistente(n); if (ya && ya !== viejo) return false;
  e.nombre = n.charAt(0).toUpperCase() + n.slice(1); delete SPEC_COLOR[viejo]; espColores();
  espReasignar(viejo, e.nombre);
  return true;
}
// Elimina una especialidad propia; lo que tenía pasa a la especialidad «destino».
function eliminarEspecialidad(nombre, destino){
  if (esBasica(nombre) || !ESPS().includes(destino) || destino === nombre) return false;
  espReasignar(nombre, destino);
  S.especialidades = espPropias().filter(e => e.nombre !== nombre); delete SPEC_COLOR[nombre];
  return true;
}
const espCuantos = n => QUESTIONS.filter(q => q.specialty === n).length + HYS.filter(h => h.specialty === n).length;

// Tarjeta «Mis especialidades» en Fuentes (plegada).
function renderEspCard(){
  const box = $("#espCard"); if (!box) return;
  const props = espPropias();
  box.innerHTML = plegable("misesp", `<b>🏷️ Mis especialidades</b> <span class="xs muted">${SPECS.length} básicas${props.length ? ` + ${props.length} tuya${props.length === 1 ? "" : "s"}` : ""}</span>`, `
    <p class="xs muted" style="margin:6px 0">Para tus fuentes de otras áreas (Neurología, Psiquiatría…). Aparecen en Casos, Fichas, Crear y Progreso. El diagnóstico sigue con las ${SPECS.length} básicas.</p>
    ${props.map(e => `<div class="srcitem"><span class="dot" style="background:${e.color}"></span><div style="flex:1;min-width:0"><b class="small">${esc(e.nombre)}</b><div class="xs muted">${espCuantos(e.nombre)} casos y fichas</div></div>
      <button class="btn ghost sm" data-esren="${esc(e.nombre)}">✏️ Renombrar</button><button class="btn ghost sm" data-esdel="${esc(e.nombre)}" style="color:var(--bad)">Eliminar</button></div>`).join("")}
    <div class="row" style="gap:6px;margin-top:8px"><input type="text" id="espNueva" placeholder="Nueva especialidad (p. ej. Neurología)" maxlength="40" style="flex:1;min-width:0"><button class="btn sm" id="espCrear">➕ Crear</button></div>
    <div id="espMsg" class="xs"></div>`);
  $("#espCrear").onclick = () => {
    const v = $("#espNueva").value, ya = espExistente(v);
    if (ya) return $("#espMsg").textContent = `«${ya}» ya existe.`;
    const n = crearEspecialidad(v); if (!n) return $("#espMsg").textContent = "Escribe un nombre de 3 a 40 letras.";
    save(); renderEspCard(); toast(`Especialidad «${n}» creada ✓`);
  };
  box.querySelectorAll("[data-esren]").forEach(b => b.onclick = () => {
    const v = b.dataset.esren, n = prompt("Nuevo nombre de la especialidad", v); if (!n || n.trim() === v) return;
    if (!renombrarEspecialidad(v, n)) return toast("Ese nombre no sirve o ya existe.");
    rebuild(); save(); renderEspCard(); toast("Especialidad renombrada ✓");
  });
  box.querySelectorAll("[data-esdel]").forEach(b => b.onclick = () => {
    const v = b.dataset.esdel, n = espCuantos(v);
    const destino = n ? prompt(`«${v}» tiene ${n} casos y fichas. ¿A qué especialidad los paso? (${ESPS().filter(x => x !== v).join(", ")})`, "Medicina Interna") : "Medicina Interna";
    if (destino == null) return;
    const d = espExistente(destino); if (!d || d === v) return toast("Esa especialidad no existe.");
    if (!confirm(`¿Eliminar «${v}»?${n ? ` Sus ${n} casos y fichas pasan a ${d}.` : ""}`)) return;
    eliminarEspecialidad(v, d); rebuild(); save(); renderEspCard(); toast("Especialidad eliminada");
  });
}

// «➕ Nueva especialidad…» al final de los selectores de especialidad: la crea ahí mismo y la deja elegida.
const ESP_NUEVA = "__nueva", ESP_NUEVA_OPT = `<option value="${ESP_NUEVA}">➕ Nueva especialidad…</option>`;
document.addEventListener("change", e => {
  const sel = e.target; if (!(sel instanceof HTMLSelectElement) || sel.value !== ESP_NUEVA) return;
  e.stopImmediatePropagation();
  const previa = sel.dataset.prev || sel.options[0].value;
  const n = crearEspecialidad(prompt("Nombre de la nueva especialidad (p. ej. Neurología)") || "");
  if (!n) { sel.value = previa; return; }
  save();
  // La nueva opción, en todos los selectores de especialidad abiertos.
  document.querySelectorAll("select").forEach(s => { if ([...s.options].some(o => o.value === ESP_NUEVA) && ![...s.options].some(o => o.value === n)) s.querySelector(`option[value="${ESP_NUEVA}"]`).insertAdjacentHTML("beforebegin", `<option>${esc(n)}</option>`); });
  sel.value = n; sel.dataset.prev = n; toast(`Especialidad «${n}» creada ✓`);
  sel.dispatchEvent(new Event("change", {bubbles: true}));
}, true);
document.addEventListener("focusin", e => { if (e.target instanceof HTMLSelectElement && e.target.value !== ESP_NUEVA) e.target.dataset.prev = e.target.value; });

// En la revisión de lo que generó la IA: si el área real de los ítems no es una de las especialidades, se
// ofrece crearla y pasarle esos ítems (la IA los había puesto en la básica más cercana).
function espSugeridasHTML(cands){
  const por = {};
  cands.forEach(c => { const a = String(c.area || "").trim(); if (a.length >= 3 && !espExistente(a)) (por[norm(a)] = por[norm(a)] || {a, n: 0}).n++; });
  const lista = Object.values(por); if (!lista.length) return "";
  return `<div class="note" style="margin:8px 0" id="espSug"><b class="small">🏷️ Áreas que no están en tus especialidades</b>
    <div class="row" style="gap:6px;margin-top:6px">${lista.map(x => `<button class="btn sm" data-espsug="${esc(x.a)}">➕ Crear «${esc(x.a)}» (${x.n} ítem${x.n === 1 ? "" : "s"})</button>`).join("")}</div>
    <p class="xs muted" style="margin:6px 0 0">Si no la creas, esos ítems quedan en la especialidad básica que ves en cada uno.</p></div>`;
}
function bindEspSugeridas(cands, despues){
  document.querySelectorAll("[data-espsug]").forEach(b => b.onclick = () => {
    const a = b.dataset.espsug, n = crearEspecialidad(a); if (!n) return;
    cands.forEach(c => { if (norm(String(c.area || "").trim()) === norm(a)) c.specialty = n; });
    save(); toast(`Especialidad «${n}» creada ✓`); despues();
  });
}
