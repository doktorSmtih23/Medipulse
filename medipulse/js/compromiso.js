// ===================================================================
// COMPROMISO CON LOS PDF: subir un PDF no es estudiarlo. Cada documento tiene un estado (🆕 sin abrir,
// 📖 en estudio, ✅ estudiado, ⏸️ en espera), Hoy recuerda los pendientes y el usuario elige su meta
// semanal (cuántos PDF estudia por semana). Al subir uno más con la meta ya llena, la app pregunta si
// lo estudia esta semana o lo deja en espera. Todo queda en el dispositivo.
// ===================================================================
const PDF_METAS = [1, 2, 3, 5];
// Documentos que cuentan: PDF y textos pegados (no los packs ni la libreta de apuntes).
const pdfCuenta = s => s && !s.apunte && s.kind !== "pack";
function pdfEstado(s){
  if (s.hecho) return {k: "hecho", t: "✅ Estudiado"};
  if (s.espera) return {k: "espera", t: "⏸️ En espera"};
  const usado = s.abierto || itemsOfSource(s.id).length || ((S.estudio && S.estudio.ses) || []).some(x => x.src === s.id);
  return usado ? {k: "estudio", t: "📖 En estudio"} : {k: "nuevo", t: "🆕 Sin abrir"};
}
const pdfPendientes = () => S.sources.filter(s => pdfCuenta(s) && !s.hecho && !s.espera).sort((a, b) => a.added - b.added);
// La semana empieza el lunes.
function semanaIni(){ const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.getTime(); }
const pdfHechosSemana = () => S.sources.filter(s => pdfCuenta(s) && s.hecho >= semanaIni()).length;
const hace = t => { const d = Math.floor((Date.now() - t) / DAY); return d <= 0 ? "hoy" : d === 1 ? "ayer" : `hace ${d} días`; };
const pdfChip = s => { const e = pdfEstado(s); return `<span class="xs pdfest ${e.k}">${e.t}</span>`; };

// Meta semanal: la elige el usuario (o ninguna).
function metaHTML(){
  const m = S.metaPdf, k = pdfHechosSemana();
  const chips = `<div class="chips">${PDF_METAS.map(n => `<button class="chip2${m === n ? " on" : ""}" data-meta="${n}">${n} por semana</button>`).join("")}${m ? `<button class="chip2" data-meta="0">Sin meta</button>` : ""}</div>`;
  if (!m) return `<div class="metapdf stack" id="metaPdf"><b class="small">🎯 Mi meta semanal</b>
    <p class="xs muted" style="margin:0">¿Cuántos PDF quieres estudiar por semana? La app te recuerda los pendientes y te avisa cuando subes más de los que alcanzas.</p>${chips}</div>`;
  // Con la meta elegida: solo el avance; cambiarla queda plegado.
  return `<div class="metapdf stack" id="metaPdf">
    <div class="row" style="gap:6px"><b class="small">🎯 Mi meta: ${m} PDF por semana</b><div class="spacer"></div><span class="small"><b>${k}</b> de ${m}</span></div>
    <div class="track" aria-label="Avance de la meta"><i style="width:${Math.min(100, Math.round(k / m * 100))}%;background:var(--ok)"></i></div>
    <p class="xs muted" style="margin:0">${k >= m ? "✅ Cumpliste la meta de esta semana." : `Te falta${m - k === 1 ? "" : "n"} ${m - k} esta semana (empieza el lunes).`}</p>
    ${plegable("metacambiar", `<span class="xs">Cambiar la meta</span>`, chips)}</div>`;
}

// Hoy: los PDF que subiste y no has terminado, del más antiguo al más nuevo.
function renderPdfHoy(){
  const box = $("#pdfCard"); if (!box) return;
  const pend = pdfPendientes(); box.hidden = !pend.length;
  if (!pend.length) return;
  const fila = s => { const e = pdfEstado(s);
    return `<div class="qrow"><div style="flex:1;min-width:0"><b class="small" style="overflow-wrap:anywhere">${esc(s.title)}</b>
      <div class="xs muted">${e.k === "nuevo" ? `Lo subiste ${hace(s.added)} y aún no lo abres` : `En estudio · lo subiste ${hace(s.added)}`}</div></div>
      <button class="btn sm primary" data-pdfa="abrir|${esc(s.id)}">Abrir</button><button class="iconbtn" data-pdfa="espera|${esc(s.id)}" title="Dejar en espera" aria-label="Dejar en espera">⏸️</button></div>`; };
  const m = S.metaPdf, k = pdfHechosSemana(), viejo = pend[0];
  box.innerHTML = `<h3 style="font-size:16px">📚 Tus PDF pendientes <span class="xs muted">${pend.length}</span></h3>
    <p class="small" style="margin:6px 0 0">${pend.length === 1 ? `Subiste <b>«${esc(viejo.title)}»</b> ${hace(viejo.added)}. Lo que subes y no estudias no te sirve: dale un bloque hoy.`
      : `Tienes <b>${pend.length} PDF</b> sin terminar; el más antiguo, <b>«${esc(viejo.title)}»</b>, lo subiste ${hace(viejo.added)}.`}
      ${m ? ` Meta de la semana: <b>${k} de ${m}</b>.` : ""}</p>
    ${plegable("pdfpend", `<span class="small">Ver ${pend.length === 1 ? "el pendiente" : `los ${pend.length} pendientes`}</span>`, pend.map(fila).join(""), pend.length <= 2)}
    ${m ? "" : `<p class="xs muted" style="margin:6px 0 0">¿Cuántos PDF quieres estudiar por semana? <button class="linkbtn" data-go="lib">Elige tu meta en Fuentes</button>.</p>`}`;
}

// En el documento: su estado, «Ya lo estudié» y, si se acaba de subir con la meta llena, la pregunta.
function pdfCompromisoHTML(s){
  if (!pdfCuenta(s)) return "";
  const otros = pdfPendientes().filter(x => x.id !== s.id).length, m = S.metaPdf;
  const preguntar = s.recien && Date.now() - s.recien < DAY && !s.hecho && !s.espera && (m ? otros >= m : otros >= 3);
  return `<div class="row" style="gap:6px;margin-top:8px" id="pdfComp">${pdfChip(s)}
      ${s.hecho ? `<button class="btn sm ghost" data-pdfa="reabrir|${esc(s.id)}">Volver a «en estudio»</button>`
        : `<button class="btn sm" data-pdfa="hecho|${esc(s.id)}">✓ Ya lo estudié</button>${s.espera ? `<button class="btn sm ghost" data-pdfa="activar|${esc(s.id)}">▶ Quitar de espera</button>` : `<button class="btn sm ghost" data-pdfa="espera|${esc(s.id)}">⏸️ En espera</button>`}`}</div>
    ${preguntar ? `<div class="note stack" style="margin-top:8px" id="pdfPregunta">
      <p class="small" style="margin:0">${m ? `Tienes <b>${otros} PDF pendientes</b> y tu meta es <b>${m} por semana</b>.` : `Tienes <b>${otros} PDF pendientes</b>.`} ¿Este lo estudias esta semana o lo dejas en espera para no acumular?</p>
      <div class="row" style="gap:6px"><button class="btn sm primary" data-pdfa="semana|${esc(s.id)}">📅 Esta semana</button><button class="btn sm" data-pdfa="espera|${esc(s.id)}">⏸️ En espera</button></div>
      ${m ? "" : `<p class="xs muted" style="margin:0">Puedes fijar una meta semanal en Fuentes.</p>`}</div>` : ""}`;
}

document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-pdfa]"), mb = e.target.closest && e.target.closest("[data-meta]");
  if (mb) { S.metaPdf = +mb.dataset.meta || null; save(); renderLib(); return; }
  if (!b) return;
  const [acc, id] = b.dataset.pdfa.split("|"), s = S.sources.find(x => x.id === id); if (!s) return;
  if (acc === "abrir") return openSrc(id);
  delete s.recien;
  if (acc === "hecho") { s.hecho = Date.now(); s.espera = false; toast("Marcado como estudiado ✓"); }
  if (acc === "reabrir") delete s.hecho;
  if (acc === "espera") { s.espera = true; toast("En espera: no aparece en tus pendientes"); }
  if (acc === "activar" || acc === "semana") s.espera = false;
  save();
  if (currentView === "hoy") renderPdfHoy();
  else if (currentView === "src") $("#pdfCompBox") && ($("#pdfCompBox").innerHTML = pdfCompromisoHTML(s));
  else if (currentView === "lib") renderLib();
});
