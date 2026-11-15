// ===================================================================
// LECTOR DEL PDF REAL: la página como es (pdf.js) con una capa de texto invisible encima para
// seleccionar frases, recorte de una zona (algoritmo, tabla, gráfica) y capturas subidas.
// Las imágenes se guardan en el dispositivo (IndexedDB) y se ven al estudiar la ficha o la pregunta.
// ===================================================================

// ---------- imágenes guardadas ----------
const imgMem = new Map();
async function imgPut(dataUrl){
  const key = "img:" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  imgMem.set(key, dataUrl);
  try { await idb.put(key, dataUrl); } catch(e) { toast("No se pudo guardar la imagen en este dispositivo."); }
  return key;
}
async function imgGet(key){
  if (imgMem.has(key)) return imgMem.get(key);
  let v = null; try { v = await idb.get(key); } catch(e) {}
  if (v) imgMem.set(key, v);
  return v;
}
// Cualquier <img data-img="img:…"> que aparezca en la app se completa solo.
function hydrateImgs(root){
  (root || document).querySelectorAll("img[data-img]:not([src])").forEach(async im => {
    const v = await imgGet(im.dataset.img);
    if (v) im.src = v; else im.replaceWith(Object.assign(document.createElement("p"), {className: "xs muted", textContent: "(La imagen no está guardada en este dispositivo.)"}));
  });
}
try { new MutationObserver(() => hydrateImgs()).observe(document.body, {childList: true, subtree: true}); } catch(e) {}
const imgTag = key => key ? `<img class="itimg" data-img="${esc(key)}" alt="Imagen del documento">` : "";

// Reduce una imagen a JPEG de máximo 1200 px de lado (menos espacio y menos costo si va a la IA).
function shrink(src, max = 1200){
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL("image/jpeg", 0.85));
    };
    im.onerror = () => rej(new Error("No se pudo leer la imagen."));
    im.src = src;
  });
}
const fileToDataUrl = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(f); });

// ---------- página real con capa de texto ----------
let lectTask = null;
async function renderPdfPage(box, srcId, pageNum, zoom){
  box.innerHTML = `<p class="small muted" style="margin:12px"><span class="spin"></span> Cargando la página…</p>`;
  try {
    const doc = await anDoc(srcId), page = await doc.getPage(pageNum), lib = await loadPdfJs();
    const base = page.getViewport({scale: 1}), fit = Math.max(200, box.clientWidth - 2) / base.width, vp = page.getViewport({scale: fit * zoom});
    const dpr = Math.min(window.devicePixelRatio || 1, 2), cv = document.createElement("canvas");
    cv.width = Math.floor(vp.width * dpr); cv.height = Math.floor(vp.height * dpr);
    cv.style.width = Math.floor(vp.width) + "px"; cv.style.height = Math.floor(vp.height) + "px";
    if (lectTask) try { lectTask.cancel(); } catch(e) {}
    lectTask = page.render({canvasContext: cv.getContext("2d"), viewport: vp, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null});
    await lectTask.promise; lectTask = null;
    const wrap = document.createElement("div");
    wrap.className = "pdfpage"; wrap.style.width = cv.style.width; wrap.style.height = cv.style.height;
    wrap.style.setProperty("--scale-factor", vp.scale);
    wrap.appendChild(cv);
    const tl = document.createElement("div"); tl.className = "textLayer"; wrap.appendChild(tl);
    box.innerHTML = ""; box.appendChild(wrap);
    try { await lib.renderTextLayer({textContentSource: await page.getTextContent(), container: tl, viewport: vp, textDivs: []}).promise; } catch(e) {}
    return {wrap, canvas: cv};
  } catch(e) {
    if (e && e.name === "RenderingCancelledException") return null;
    box.innerHTML = `<p class="small" style="margin:12px;color:var(--bad)">No se pudo mostrar la página: ${esc(e && e.message || e)}</p>`;
    return null;
  }
}

// ---------- recortar una zona de la página ----------
// Se arrastra un rectángulo con el dedo o el mouse; devuelve la zona como imagen.
function startCrop(wrap, canvas, onDone){
  const ov = document.createElement("div"); ov.className = "cropov"; ov.setAttribute("role", "application"); ov.setAttribute("aria-label", "Arrastra para elegir la zona");
  const sel = document.createElement("div"); sel.className = "cropsel"; ov.appendChild(sel); wrap.appendChild(ov);
  let a = null, b = null;
  const pt = e => { const r = ov.getBoundingClientRect(); return {x: Math.max(0, Math.min(r.width, e.clientX - r.left)), y: Math.max(0, Math.min(r.height, e.clientY - r.top))}; };
  const draw = () => { if (!a || !b) return; Object.assign(sel.style, {left: Math.min(a.x, b.x) + "px", top: Math.min(a.y, b.y) + "px", width: Math.abs(a.x - b.x) + "px", height: Math.abs(a.y - b.y) + "px", display: "block"}); };
  ov.onpointerdown = e => { a = pt(e); b = a; ov.setPointerCapture(e.pointerId); draw(); e.preventDefault(); };
  ov.onpointermove = e => { if (!a) return; b = pt(e); draw(); };
  ov.onpointerup = async () => {
    if (!a || !b) return;
    const w = Math.abs(a.x - b.x), h = Math.abs(a.y - b.y);
    if (w < 20 || h < 20) { a = b = null; sel.style.display = "none"; return toast("Arrastra para marcar una zona más grande."); }
    const k = canvas.width / ov.getBoundingClientRect().width, c = document.createElement("canvas");
    c.width = Math.round(w * k); c.height = Math.round(h * k);
    c.getContext("2d").drawImage(canvas, Math.round(Math.min(a.x, b.x) * k), Math.round(Math.min(a.y, b.y) * k), c.width, c.height, 0, 0, c.width, c.height);
    ov.remove();
    onDone(await shrink(c.toDataURL("image/png")));
  };
  return () => ov.remove();
}

// ---------- qué hacer con una imagen (recorte o captura) ----------
// ctx: {src, page, title}. La imagen queda adjunta a la ficha o a las preguntas que se creen con ella.
function showCapture(box, dataUrl, ctx){
  box.innerHTML = `<div class="card stack capbox">
    <div class="row"><b class="small">🖼️ Imagen${ctx.page ? ` · pág. ${ctx.page}` : ""}</b><div class="spacer"></div><button class="btn ghost sm" data-cap-x>✕</button></div>
    <img class="itimg" src="${dataUrl}" alt="Zona elegida">
    <div class="row" style="gap:6px"><button class="btn sm" data-cap-hy>💎 Ficha a mano con esta imagen</button>
      ${getKey() ? `<button class="btn primary sm" data-cap-ai>✨ Preguntas y ficha con IA</button>` : ""}</div>
    ${getKey() ? `<p class="xs muted" style="margin:0">Con IA: ${aiEstimateLine(0, {outTokens: 3500})} (la imagen cuenta como ~1.600 tokens). Útil para algoritmos, tablas y gráficas.</p>` : ""}
    <div data-cap-out></div></div>`;
  box.scrollIntoView({behavior: "smooth", block: "nearest"});
  box.querySelector("[data-cap-x]").onclick = () => { box.innerHTML = ""; };
  box.querySelector("[data-cap-hy]").onclick = async () => {
    const key = await imgPut(dataUrl), out = box.querySelector("[data-cap-out]");
    hyEditor(out, {spec: gen.spec, src: ctx.src, page: ctx.page, rows: [], heading: "💎 Nueva ficha con imagen", flags: {manual: true, img: key},
      onSave: () => { box.innerHTML = ""; renderSrcItems && renderSrcItems(); }, onCancel: () => { out.innerHTML = ""; }});
  };
  const ai = box.querySelector("[data-cap-ai]");
  ai && (ai.onclick = async () => {
    if (genBusy) return; genBusy = true; ai.disabled = true; ai.innerHTML = `<span class="spin"></span> Analizando la imagen…`;
    try {
      const key = await imgPut(dataUrl);
      cands = (await aiGenerateImage(dataUrl, ctx)).map(c => Object.assign(c, {img: key}));
      box.innerHTML = "";
      renderReview();
      if (cands.length) $("#reviewBox").scrollIntoView({behavior: "smooth", block: "start"});
      else toast("La IA no encontró información útil en esa imagen.");
    } catch(err) { toast(err.userMsg || err.message); ai.disabled = false; ai.textContent = "✨ Preguntas y ficha con IA"; }
    finally { genBusy = false; }
  });
}
