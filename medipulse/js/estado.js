// ===================================================================
// ESTADO (localStorage) + REPASO ESPACIADO
// ===================================================================
const KEY = "medipulse_v2";
const DAY = 864e5;
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
// En algunos visores (por ejemplo, la vista previa de un solo archivo) el navegador bloquea el
// almacenamiento. La app funciona igual, en memoria, y avisa que nada se guarda al cerrar.
const CAN_STORE = (()=>{ try { localStorage.setItem("medipulse_t", "1"); localStorage.removeItem("medipulse_t"); return true; } catch(e) { return false; } })();
const BLANK = () => ({srs:{}, log:{}, sims:[], theme:null, palette:"bosque", userQ:[], userC:[], sources:[], seq:0, check:{}, over:{}, hidden:{}, notes:[], reports:[], exam:"", focus:"mixto", hints:false, tpls:[], userH:[], apuntes:[], resp:[], prac:{specs:[], modo:"azar", n:20, examen:false}, estudio:{cfg:{ritmo:"25/5"}, ses:[], informes:[], actual:null}, metaPdf:null, perlas:{vista:{}, sabe:{}, hoy:null}, especialidades:[]});
let S = BLANK();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e) {}
// "Urgencias" dejó de ser un área aparte (una urgencia va en la especialidad del paciente):
// lo que el usuario creó con ella pasa a Medicina Interna.
["userQ","userH","userC"].forEach(k=>(S[k]||[]).forEach(x=>{ if (x.specialty === "Urgencias") x.specialty = "Medicina Interna"; }));
(S.notes||[]).forEach(n=>{ if (n.spec === "Urgencias") n.spec = "Medicina Interna"; });
// «Salud Pública» pasó a llamarse «Epidemiología y Estadística»: se renombra en todo lo guardado.
{ const V = "Salud Pública", N = "Epidemiología y Estadística", c = x => x === V ? N : x;
  ["userQ","userH","userC"].forEach(k=>(S[k]||[]).forEach(x=>{ x.specialty = c(x.specialty); }));
  (S.notes||[]).forEach(n=>{ n.spec = c(n.spec); });
  (S.apuntes||[]).forEach(l=>{ l.spec = c(l.spec); });
  (S.sources||[]).forEach(s=>{ s.spec = c(s.spec); });
  Object.values(S.over||{}).forEach(o=>{ if (o && o.specialty) o.specialty = c(o.specialty); });
  if (S.prac && Array.isArray(S.prac.specs)) S.prac.specs = S.prac.specs.map(c); }
// Aplica las correcciones (S.over) a los ítems incluidos y quita los archivados (S.hidden).
let HYS = [];
function rebuild(){
  const ov = (k,x) => S.over[k+x.id] ? Object.assign({}, x, S.over[k+x.id], {updated: S.over[k+x.id].upd}) : x;
  QUESTIONS = [...BUILTIN_Q.map(q=>ov("q",q)), ...S.userQ].filter(q=>!S.hidden["q"+q.id]);
  FLASH = [...BUILTIN_F.map(c=>ov("c",c)), ...S.userC].filter(c=>!S.hidden["c"+c.id]);
  HYS = [...HY_CARDS.map(h=>ov("h",h)), ...(S.userH || [])].filter(h=>!S.hidden["h"+h.id]);
}
rebuild();
// Si guardar falla (almacenamiento lleno o bloqueado), se avisa en Hoy para que el usuario descargue su copia.
let SAVE_FAILED = false;
// El navegador da unos 5 MB por sitio para el progreso (los PDF van aparte, en IndexedDB). Desde 3,5 MB se avisa
// en Hoy, antes de que se llene: así hay tiempo de descargar la copia.
const ESPACIO_AVISO = 3.5e6;
let ESPACIO_USADO = (() => { try { return (localStorage.getItem(KEY) || "").length * 2; } catch(e) { return 0; } })();
function save(){
  let ok = true;
  const txt = JSON.stringify(S), alto = ESPACIO_USADO > ESPACIO_AVISO;
  ESPACIO_USADO = txt.length * 2;   // localStorage guarda texto en UTF-16: 2 bytes por carácter
  try { localStorage.setItem(KEY, txt); } catch(e) { ok = !CAN_STORE; }
  if (SAVE_FAILED === ok || alto !== ESPACIO_USADO > ESPACIO_AVISO) { SAVE_FAILED = !ok; if (typeof renderDataWarn === "function") renderDataWarn(); }
}

const todayKey = (d=new Date()) => new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
function logToday(){ const k = todayKey(); return S.log[k] || (S.log[k] = {sec:0,q:0,ok:0,c:0}); }
// Cuenta un caso respondido en el registro de hoy: el total y por especialidad ([respondidos, acertados]),
// para las flechas de «Tu examen completo» en Hoy (últimos 7 días contra los 7 anteriores).
function contarCaso(spec, ok){
  const l = logToday(); l.q++; if (ok) l.ok++;
  const e = l.esp || (l.esp = {}), x = e[spec] || (e[spec] = [0, 0]); x[0]++; if (ok) x[1]++;
}

// ---------- Lo que guarda el usuario: sus ítems, su repaso y lo archivado ----------
// Este archivo es el único que escribe en S.userQ, S.userC, S.userH, S.seq, S.srs, S.hidden y S.over.
// Los demás usan estas funciones (el revisor, eslint.config.js, lo comprueba). Ninguna llama a save():
// cada pantalla guarda una vez, después de hacer todos sus cambios.
// Las claves son el tipo más el id: «q12» (caso), «c3» (repaso rápido), «hu7» (ficha high-yield).
const LISTA_PROPIA = {q: "userQ", c: "userC", h: "userH"};
const nuevoIdPropio = () => "u" + (++S.seq);
function agregarPropio(tipo, item){ S[LISTA_PROPIA[tipo]].push(item); return item; }
// Quita un ítem propio y su repaso.
function quitarPropio(key){ const k = LISTA_PROPIA[key[0]], id = key.slice(1); S[k] = S[k].filter(o => String(o.id) !== id); delete S.srs[key]; }
// Quita todos los ítems de una fuente y sus repasos.
function quitarPropiosDeFuente(srcId){
  for (const [t, k] of Object.entries(LISTA_PROPIA)) { S[k].filter(o => o.src === srcId).forEach(o => delete S.srs[t + o.id]); S[k] = S[k].filter(o => o.src !== srcId); }
}
const archivar = key => { S.hidden[key] = Date.now(); };
const desarchivar = key => { delete S.hidden[key]; };
const olvidarRepaso = key => { delete S.srs[key]; };
// El registro de repaso de un ítem; lo crea si no existe.
const repasoDe = key => S.srs[key] || (S.srs[key] = {b:0,due:0,n:0,ok:0});
// Corrección de un ítem incluido: se suma a la anterior, o la reemplaza.
function corregirIncluido(key, cambios, reemplazar){ S.over[key] = Object.assign({}, reemplazar ? {} : S.over[key], cambios); }

// grade: 0 = fallé, 1 = dudé, 2 = la sabía
function grade(key, g){
  const r = repasoDe(key);
  r.n++; if (g === 2) r.ok++; r.last = g;
  if (g === 0) { r.b = 0; r.due = Date.now() + 10*6e4; }
  else if (g === 1) { r.due = Date.now() + DAY; }
  else { r.b = Math.min(r.b+1, BOX_DAYS.length-1); r.due = Date.now() + BOX_DAYS[r.b]*DAY; }
  delete r.frag;
  save();
}
// Un acierto sin seguridad no cuenta como dominado: vuelve mañana. Si dudaste, baja un escalón;
// si adivinaste o no lo sabías, vuelve al principio, junto con lo que fallaste.
function ajustarPorConfianza(key, c){
  const r = S.srs[key]; if (!r || !c || c === "seguro") return;
  r.b = c === "dude" ? Math.max(0, r.b - 1) : 0; r.due = Date.now() + DAY; r.last = 1; r.frag = 1;
  save();
}
const isDue = k => S.srs[k] && S.srs[k].due <= Date.now();
const itemExists = k => k[0]==="q" ? !!qById(k.slice(1)) : k[0]==="h" ? !!hyById(k.slice(1)) : !!cById(k.slice(1));
const dueKeys = () => Object.keys(S.srs).filter(k=>isDue(k) && itemExists(k)).sort((a,b)=>S.srs[a].due-S.srs[b].due);

function specStats(){
  const st = {}; ESPS().forEach(s=>st[s]={n:0,ok:0,seen:0,total:0});
  QUESTIONS.forEach(q=>{ const s=st[q.specialty]; s.total++; const r=S.srs["q"+q.id]; if(r){s.n+=r.n;s.ok+=r.ok;s.seen++;} });
  return st;
}
function weakestSpec(){
  const st = specStats();
  const withData = SPECS.filter(s=>st[s].n>=3);
  if (withData.length) return withData.sort((a,b)=>st[a].ok/st[a].n - st[b].ok/st[b].n)[0];
  return SPECS.slice().sort((a,b)=>st[a].seen/st[a].total - st[b].seen/st[b].total)[0];
}
function streak(){
  let n=0, d=new Date();
  if (!(S.log[todayKey(d)]?.sec>0 || S.log[todayKey(d)]?.c>0 || S.log[todayKey(d)]?.q>0)) d = new Date(d.getTime()-DAY);
  while (true){ const l=S.log[todayKey(d)]; if (l && (l.sec>0||l.q>0||l.c>0)) { n++; d=new Date(d.getTime()-DAY); } else break; }
  return n;
}
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];} return a; };
// Pregunta de prueba (una versión editada que todavía no se guarda): se responde sin tocar el banco ni el progreso.
let PRUEBA_Q = null;
const qById = id => PRUEBA_Q && String(id) === String(PRUEBA_Q.id) ? PRUEBA_Q : QUESTIONS.find(q=>String(q.id)===String(id));
const cById = id => FLASH.find(c=>String(c.id)===String(id));

// Arma una cola: primero lo vencido, luego lo no visto (priorizando un tema), luego lo más débil.
function pickQuestions(n, {spec=null, preferSpec=null}={}){
  let pool = QUESTIONS.filter(q=>!spec || q.specialty===spec);
  const due = pool.filter(q=>isDue("q"+q.id));
  const unseen = shuffle(pool.filter(q=>!S.srs["q"+q.id]));
  const fk = focusOf().k, fit = q => fk !== "mixto" && qKind(q) === fk;
  unseen.sort((a,b)=>(preferSpec ? ((b.specialty===preferSpec)-(a.specialty===preferSpec))*2 : 0) + fit(b) - fit(a));
  const rest = pool.filter(q=>S.srs["q"+q.id] && !isDue("q"+q.id)).sort((a,b)=>S.srs["q"+a.id].b - S.srs["q"+b.id].b || S.srs["q"+a.id].due - S.srs["q"+b.id].due);
  const out=[]; for (const q of [...due,...unseen,...rest]) { if(!out.includes(q)) out.push(q); if(out.length>=n) break; }
  return shuffle(out).map(q=>({t:"q",id:q.id}));
}
function pickCards(n, spec=null){
  let pool = FLASH.filter(c=>!spec||c.specialty===spec);
  const due = pool.filter(c=>isDue("c"+c.id));
  const unseen = shuffle(pool.filter(c=>!S.srs["c"+c.id]));
  const rest = shuffle(pool.filter(c=>S.srs["c"+c.id] && !isDue("c"+c.id))).sort((a,b)=>S.srs["c"+a.id].b - S.srs["c"+b.id].b);
  const out=[]; for (const c of [...due,...unseen,...rest]) { if(!out.includes(c)) out.push(c); if(out.length>=n) break; }
  return out.map(c=>({t:"c",id:c.id}));
}
