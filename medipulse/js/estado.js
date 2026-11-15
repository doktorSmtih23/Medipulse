// ===================================================================
// ESTADO (localStorage) + REPASO ESPACIADO
// ===================================================================
const KEY = "medipulse_v2";
const DAY = 864e5;
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
// En algunos visores (por ejemplo, la vista previa de un solo archivo) el navegador bloquea el
// almacenamiento. La app funciona igual, en memoria, y avisa que nada se guarda al cerrar.
const CAN_STORE = (()=>{ try { localStorage.setItem("medipulse_t", "1"); localStorage.removeItem("medipulse_t"); return true; } catch(e) { return false; } })();
const BLANK = () => ({srs:{}, log:{}, sims:[], theme:null, userQ:[], userC:[], sources:[], seq:0, check:{}, over:{}, hidden:{}, notes:[], reports:[], exam:"", focus:"mixto", hints:false, tpls:[], userH:[], apuntes:[]});
let S = BLANK();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e) {}
// "Urgencias" dejó de ser un área aparte (una urgencia va en la especialidad del paciente):
// lo que el usuario creó con ella pasa a Medicina Interna.
["userQ","userH","userC"].forEach(k=>(S[k]||[]).forEach(x=>{ if (x.specialty === "Urgencias") x.specialty = "Medicina Interna"; }));
(S.notes||[]).forEach(n=>{ if (n.spec === "Urgencias") n.spec = "Medicina Interna"; });
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
function save(){
  let ok = true;
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) { ok = !CAN_STORE; }
  if (SAVE_FAILED === ok) { SAVE_FAILED = !ok; if (typeof renderDataWarn === "function") renderDataWarn(); }
}

const todayKey = (d=new Date()) => new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
function logToday(){ const k = todayKey(); return S.log[k] || (S.log[k] = {sec:0,q:0,ok:0,c:0}); }

// grade: 0 = fallé, 1 = dudé, 2 = la sabía
function grade(key, g){
  const r = S.srs[key] || (S.srs[key] = {b:0,due:0,n:0,ok:0});
  r.n++; if (g === 2) r.ok++; r.last = g;
  if (g === 0) { r.b = 0; r.due = Date.now() + 10*6e4; }
  else if (g === 1) { r.due = Date.now() + DAY; }
  else { r.b = Math.min(r.b+1, BOX_DAYS.length-1); r.due = Date.now() + BOX_DAYS[r.b]*DAY; }
  save();
}
const isDue = k => S.srs[k] && S.srs[k].due <= Date.now();
const itemExists = k => k[0]==="q" ? !!qById(k.slice(1)) : k[0]==="h" ? !!hyById(k.slice(1)) : !!cById(k.slice(1));
const dueKeys = () => Object.keys(S.srs).filter(k=>isDue(k) && itemExists(k)).sort((a,b)=>S.srs[a].due-S.srs[b].due);

function specStats(){
  const st = {}; SPECS.forEach(s=>st[s]={n:0,ok:0,seen:0,total:0});
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
const qById = id => QUESTIONS.find(q=>String(q.id)===String(id));
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
