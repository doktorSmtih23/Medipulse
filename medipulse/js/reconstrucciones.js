// ===================================================================
// RECONSTRUCCIONES DE EXÁMENES: cómo pregunta cada universidad (Casos → «Simulacro estilo universidad»)
// ===================================================================
// Una reconstrucción es lo que los aspirantes recuerdan de un examen después de presentarlo. Las respuestas
// no son confiables (dependen de la memoria), pero el PATRÓN sí sirve: cuántas preguntas por área, de qué
// tipo, cuántas son casos clínicos y qué tan largas. Aquí se lee el texto (PDF o pegado), se calcula ese
// patrón SIN IA y se arma un simulacro con casos del banco en esas proporciones. Del documento solo se
// guarda el patrón y unas pocas preguntas de muestra (S.recons): nada sale del dispositivo.

const rcLista = () => S.recons || (S.recons = []);
const rcNorm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Universidad y periodo, del nombre del archivo o de la primera línea («RECONSTRUCCIÓN EXAMEN UNIVALLE 2024-1»).
const RC_UNIV = [[/\bu\.?\s*de\s*a\b|\budea\b|antioquia/, "UdeA"], [/univalle|del valle/, "Univalle"], [/caldas/, "U. de Caldas"],
  [/\buis\b|industrial de santander/, "UIS"], [/\bunal\b|nacional de colombia|\bu\.? nacional/, "U. Nacional"], [/\busco\b|surcolombiana/, "USCO"],
  [/cartagena|\budc\b/, "U. de Cartagena"], [/\bunab\b|autonoma de bucaramanga/, "UNAB"], [/\bumng\b|militar/, "U. Militar"],
  [/javeriana/, "Javeriana"], [/rosario/, "U. del Rosario"], [/\bces\b/, "CES"], [/sabana/, "U. de La Sabana"], [/el bosque/, "U. El Bosque"],
  [/icesi/, "Icesi"], [/del cauca|\bunicauca\b/, "U. del Cauca"], [/\butp\b|tecnologica de pereira/, "UTP"], [/\bupb\b|bolivariana/, "UPB"],
  [/narino/, "U. de Nariño"], [/tolima/, "U. del Tolima"], [/\buninorte\b|del norte/, "Uninorte"], [/quindio/, "U. del Quindío"]];
const rcUniv = t => { const n = rcNorm(t); const u = RC_UNIV.find(([re]) => re.test(n)); return u ? u[1] : ""; };
const rcAnio = t => { const m = String(t || "").match(/\b(20\d{2})(?:\s*[-–_ ]\s*([12])\b)?/); return m ? m[1] + (m[2] ? "-" + m[2] : "") : ""; };

// Encabezado de sección («# PEDIATRÍA», «GINECOLOGÍA Y OBSTETRICIA»): las preguntas siguientes son de esa área.
// Una sección que no es de las especialidades del banco (Anestesiología, Psiquiatría…) se clasifica pregunta por pregunta.
const RC_SECC = [[/pediatr|neonatolog/, "Pediatría"], [/ginecolog|obstetric/, "Ginecología"], [/cirugia/, "Cirugía"],
  [/medicina interna|^interna$/, "Medicina Interna"], [/epidemiolog|salud publica|estadistic/, "Epidemiología y Estadística"],
  [/ortoped|traumatolog/, "Ortopedia y Traumatología"], [/urolog/, "Urología"], [/mastolog/, "Mastología"],
  [/anestesi|urgencias|psiquiatr|neurolog|dermatolog|oftalmolog|otorrino|infectolog|cardiolog|toxicolog|inmunolog|farmacolog|basicas|fisiolog|patologia|genetica|radiolog/, ""]];
function rcSeccion(linea){
  if (RC_LETRA.test(linea) || RC_VINETA.test(linea) || /^\d/.test(linea)) return null;   // una opción no es una sección
  const t = rcNorm(linea).replace(/[#*_:\d.\\]/g, " ").replace(/\s+/g, " ").trim();
  if (!t || t.length > 40 || /\?/.test(linea)) return null;
  const letras = linea.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "");
  const esTitulo = /^\s*#/.test(linea) || (letras.length >= 5 && letras === letras.toUpperCase());
  if (!esTitulo) return null;
  // El título empieza por el área («CIRUGÍA GENERAL», «GINECOLOGÍA Y OBSTETRICIA»); un comentario en mayúsculas
  // que la menciona («PS DICE CIRUGÍA») no es una sección.
  const s = RC_SECC.find(([re]) => new RegExp("^(?:medicina |cirugia )?(?:" + re.source + ")").test(t) && t.split(" ").length <= 4);
  return s ? {spec: s[1], nombre: t} : null;
}

// Área de una pregunta sin sección: por las palabras del caso. Lo que no encaja en otra va a Medicina Interna.
const RC_AREA = [
  ["Epidemiología y Estadística", /casos y controles|cohorte|ensayo clinico|sensibilidad|especificidad|valor predictivo|\bnnt\b|riesgo relativo|odds ratio|prevalencia|incidencia|sesgo|intervalo de confianza|resolucion \d|\bley \d|decreto|\bcrue\b|salud publica|sivigila|notificacion obligatoria|tasa de|estudio (de|transversal|ecologico)/],
  ["Ginecología", /gestante|embaraz|semanas de gestacion|trabajo de parto|\bparto\b|posparto|postparto|puerper|cervix|\bvph\b|citologia|ovari|utero|uterin|endometri|menstrua|anticoncep|planificacion|amenorrea|vagin|vulv|mioma|preeclampsia|placenta|cesarea|obstetric|monitoria fetal|frecuencia cardiaca fetal|\bive\b|primigesta|multigesta/],
  ["Pediatría", /lactante|neonat|recien nacid|pediatr|\bnin[oa]s?\b|escolar|preescolar|\bpai\b|esquema de vacunacion/],
  ["Ortopedia y Traumatología", /fractur|luxacion|esguince|menisc|ligamento cruzado|gustilo|tendon|manguito rotador|osteomielitis|epifisiolisis|trendelenburg|sindrome compartimental|dolor (en|de) (la )?(rodilla|cadera|hombro|tobillo|codo|muneca)/],
  ["Urología", /prostat|testic|escrot|litiasis renal|calculo renal|urolitiasis|colico renal|varicocele|fimosis|hidrocele/],
  ["Mastología", /mamograf|\bmama\b|\bmamas\b|brca|birads|bi-rads/],
  ["Cirugía", /apendic|hernia|colecist|coledoc|via biliar|diverticul|obstruccion intestinal|abdomen agudo|laparotom|laparoscop|trauma (abdominal|toracic|penetrante|cerrado|de torax|de abdomen|de cuello)|politrauma|herida|arma (blanca|de fuego|cortopunzante)|quemadura|aneurisma|esofag|colon\b|rectal|hemorroid|fistula|isquemia mesenteric|esplenect|neumotorax|hemotorax|sutur|cirugia|quirurgic|postoperatori|posoperatori|hinchey|marjolin|zona i+ del cuello/]
];
function rcArea(t){
  const n = rcNorm(t);
  if (esPediatrico(t) && !/gestante|embaraz/.test(n)) return "Pediatría";
  const a = RC_AREA.find(([, re]) => re.test(n));
  return a ? a[0] : "Medicina Interna";
}
// Tipo de pregunta, con las mismas cuatro categorías del banco (FOCUS en perfil.js).
function rcTipo(t, area){
  const n = rcNorm(t);
  if (area === "Epidemiología y Estadística" || /sensibilidad|especificidad|\bnnt\b|sesgo|odds|riesgo relativo|valor predictivo|tipo de estudio/.test(n)) return "critica";
  if (/manejo|tratamiento|conducta|paso a seguir|que (se )?(hace|haria|debe|deberia)|se debe|indicad|de eleccion|recomend|primera linea|que hacer|como proceder|se le informa/.test(n)) return "conducta";
  if (/diagnostic|causa mas probable|sospech|etiolog|agente|microorganismo|que tiene|mas probable|corresponde a|se trata de/.test(n)) return "diagnostico";
  return "datos";
}
// ¿Es un caso clínico (paciente con datos) o una pregunta directa («Vida media de las plaquetas»)?
const rcEsCaso = t => /^(paciente|mujer|hombre|femenin|masculin|nin[oa]|lactante|neonat|recien|gestante|primigest|multigest|adolescente|varon|senora|joven|anciano|adulto|usted|se (presenta|trata)|consulta)/.test(rcNorm(t).replace(/^[^a-z]+/, ""))
  || /\b\d{1,3}\s*(anos|meses|dias|semanas)\b/.test(rcNorm(t).slice(0, 90));

// ---------- lectura del texto ----------
// Formatos reales: opciones «a. b. c. d.» en la misma línea; preguntas numeradas con viñetas; preguntas sin
// número seguidas de opciones numeradas; secciones por especialidad; o solo la pregunta con la respuesta
// recordada. No hace falta entender cada respuesta: basta con encontrar cada pregunta y su sección.
const RC_LETRA = /^\(?[a-eA-E]\s*[.)]\s+\S/, RC_VINETA = /^[-•*·]\s+\S/, RC_NUM = /^\d{1,3}\s*[.)]\s+\S/;
const RC_RESP = /^(r\/|rta\b|rpta\b|respuesta\b)/i;
const rcPareceEnunciado = t => t.length >= 12 && (/\?/.test(t) || /:\s*$/.test(t) || rcEsCaso(t)
  || /^(cual|que|como|cuando|donde|cuanto|segun|respecto|acerca|en (un|una|el|la|los|las|pacientes?)|por que|senale|indique|de las siguientes|la (principal|primera|mejor)|el (principal|primer|mejor))\b/.test(rcNorm(t).replace(/^[^a-z]+/, "")));

function rcLimpiar(texto){
  let t = String(texto || "").replace(/\r/g, "").replace(/<!--[^>]*-->/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\\([.\-*#>!()[\]_&+<|])/g, "$1").replace(/\*\*|__|`/g, "").replace(/\u00a0/g, " ");
  // Opciones seguidas en la misma línea («a. X b. Y c. Z d. W 2. Siguiente pregunta»): una por línea.
  t = t.split("\n").map(l => {
    if (!/(^|\s)[aA]\s*[.)]\s/.test(l) || !/\s[bB]\s*[.)]\s/.test(l) || !/\s[cC]\s*[.)]\s/.test(l)) return l;
    return l.replace(/\s+(?=[b-eB-E]\s*[.)]\s+\S)/g, "\n").replace(/\s+(?=[aA]\s*[.)]\s+\S)/g, "\n").replace(/\s+(?=\d{1,3}\s?\.\s?[¿A-ZÁÉÍÓÚÑ])/g, "\n");
  }).join("\n");
  return t.split("\n").map(l => l.replace(/^\s*>\s*/, "").replace(/^\*+(?=\S)/, "").trim());
}
// Comentarios de quienes reconstruyen el examen («De acuerdo con la C», «Gracias!!», enlaces): no son preguntas.
const rcDiscusion = l => /https?:|www\./i.test(l) || /^(de acuerdo|creo\b|yo\b|la respuesta|respuesta|rta\b|ojo\b|gracias|alguien|oigan|esta era|era la|sip\b|si claro|no tenia|recordar|recuerdo|explicaci|fuente|bibliograf|nota\b|opiniones|comentario|resi\b|jaja|x\d|pd\b|edit)/i.test(rcNorm(l).replace(/^[^a-z]+/, ""));
// La numeración propia del examen («1. Paciente…», «2. La presión…»), distinta de las listas automáticas del
// procesador de texto («1.  » con dos espacios, que se repiten en cada pregunta y en cada opción).
const RC_PROPIA = /^(\d{1,3})[.)]\s?(?=[^\s\d])/;
function rcSecuencia(L){
  const E = []; L.forEach((l, i) => { const m = l.match(RC_PROPIA); if (m && !/^\d{1,3}\.\s{2,}/.test(l) && l.length >= 25 && !rcDiscusion(l.replace(RC_PROPIA, ""))) E.push([i, +m[1]]); });
  const mejor = E.map(() => 1), prev = E.map(() => -1);
  for (let k = 0; k < E.length; k++) for (let j = Math.max(0, k - 40); j < k; j++) { const d = E[k][1] - E[j][1];
    if (d >= 1 && d <= 3 && mejor[j] + 1 > mejor[k]) { mejor[k] = mejor[j] + 1; prev[k] = j; } }
  let k = mejor.indexOf(Math.max(0, ...mejor)); const out = new Set();
  while (k >= 0) { out.add(E[k][0]); k = prev[k]; }
  return out;
}
function rcParsear(texto){
  const L = rcLimpiar(texto).filter(l => l && !/^[-_=*]{3,}$/.test(l));
  const esOpcion = l => RC_LETRA.test(l) || RC_VINETA.test(l) || RC_NUM.test(l);
  // Modo 1: el examen trae su propia numeración: las preguntas son esas líneas y lo demás (opciones aparte)
  // es discusión de quienes lo reconstruyen. Modo 2: sin numeración propia, se reconoce cada pregunta por su forma.
  const conSecuencia = idx => {
    const qs = []; let q = null, secc = null, seccNombre = "", cerrada = false;
    L.forEach((l, i) => {
      const sec = rcSeccion(l); if (sec) { secc = sec.spec; seccNombre = sec.nombre; q = null; return; }
      if (idx.has(i)) { if (rcDiscusion(l.replace(RC_PROPIA, ""))) { q = null; return; } q = {t: l.replace(RC_PROPIA, "").trim(), opc: 0, secc, seccNombre}; qs.push(q); cerrada = false; return; }
      if (!q || cerrada || RC_RESP.test(l)) return;
      if (esOpcion(l) && l.length < 200 && q.opc < 6) q.opc++;
      else if (!q.opc && l.length < 400 && !/\?\s*$/.test(q.t)) q.t += " " + l;
      else cerrada = true;
    });
    return qs;
  };
  const porForma = () => {
    const qs = []; let q = null, secc = null, seccNombre = "";
    const nueva = (t, esperaOpc) => { q = {t: t.replace(/^\d{1,3}\s*[.)]\s*/, "").trim(), opc: 0, tipoOpc: "", secc, seccNombre, num: RC_NUM.test(t), esperaOpc}; qs.push(q); };
    const opcion = l => RC_LETRA.test(l) || RC_VINETA.test(l) || RC_NUM.test(l);
    const completa = t => /\?\s*$|:\s*$/.test(t) || t.length >= 60 || rcPareceEnunciado(t);
    for (let i = 0; i < L.length; i++) {
      const l = L[i], sec = rcSeccion(l);
      if (sec) { secc = sec.spec; seccNombre = sec.nombre; q = null; continue; }
      if (RC_RESP.test(l) || rcDiscusion(l)) continue;
      if (RC_NUM.test(l)) {
        // Numerada: es opción si sigue a una pregunta completa con opciones numeradas (o aún sin opciones);
        // es pregunta si pregunta algo, es larga, o la pregunta anterior ya tenía opciones de otra forma.
        const t = l.replace(RC_NUM, ""), pregunta = /\?/.test(t) || t.length >= 70 || (t.length >= 30 && rcEsCaso(t));
        if (q && !pregunta && (q.tipoOpc === "num" || (!q.opc && (q.esperaOpc || completa(q.t))))) { q.opc++; q.tipoOpc = "num"; continue; }
        if (t.length >= 6) nueva(l);
        continue;
      }
      if (RC_LETRA.test(l) || RC_VINETA.test(l)) { if (q) { q.opc++; q.tipoOpc = q.tipoOpc || "letra"; } continue; }
      // Línea sin marca: es pregunta si la siguen opciones; si no, continúa la pregunta o es discusión (no cuenta).
      const sig = L.slice(i + 1, i + 3);
      if (sig.length >= 2 && sig.every(opcion) && l.length >= 8 && l.length <= 700) { nueva(l, true); continue; }
      if (q && !q.opc && l.length < 400 && !completa(q.t)) q.t += " " + l; else if (q && !q.opc) q = null;
    }
    return qs;
  };
  const sec = rcSecuencia(L), a = porForma();
  const qs = sec.size >= 15 && sec.size >= a.length * 0.5 ? conSecuencia(sec) : a;
  // Solo cuenta lo que tiene forma de pregunta (pregunta algo, es un caso o trae opciones): las afirmaciones
  // sueltas («Tomar control en 6 meses», «Metanol: es un alcohol…») son respuestas o explicaciones.
  // Una numerada corta sin punto final («Vida media de las plaquetas») es una pregunta recordada sin opciones.
  return qs.filter(x => x.t.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "").length >= 8 && !rcDiscusion(x.t)
    && (x.opc >= 2 || rcPareceEnunciado(x.t) || (x.num && x.t.length < 200 && !/\.\s*$/.test(x.t))));
}

// Patrón del examen: lo que se guarda.
function rcPerfil(qs){
  const areas = {}, tipos = {conducta: 0, diagnostico: 0, critica: 0, datos: 0}, palabras = [], frec = {};
  let casos = 0, conOpc = 0;
  qs.forEach(q => {
    const area = q.secc || rcArea(q.t), tipo = rcTipo(q.t, area);
    areas[area] = (areas[area] || 0) + 1; tipos[tipo]++;
    if (rcEsCaso(q.t)) casos++; if (q.opc >= 2) conOpc++;
    palabras.push(q.t.split(/\s+/).length);
    new Set(rcNorm(q.t).match(/[a-zñ]{6,}/g) || []).forEach(w => { if (!RC_VACIAS.has(w)) frec[w] = (frec[w] || 0) + 1; });
  });
  palabras.sort((a, b) => a - b);
  const temas = Object.entries(frec).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([w, c]) => [w, c]);
  return {n: qs.length, areas, tipos, casos, conOpc, palabras: palabras.length ? palabras[palabras.length >> 1] : 0, temas};
}
const RC_VACIAS = new Set(("paciente pacientes cuales siguiente siguientes manejo tratamiento diagnostico presenta consulta conducta " +
  "correcta incorrecta respuesta opcion excepto probable evolucion antecedente antecedentes examen fisico inicial debe deberia mientras " +
  "despues durante encuentra realiza realizar tiene tienen porque cuando donde entre sobre desde hasta contra principal principales " +
  "femenina masculino femenino mujeres hombres semana semanas recuerdo algo decia creo pregunta preguntas cuadro clinico clinica asociado " +
  "asociada ingresa urgencias servicio normal normales elevado elevada indicado indicada siempre ninguna anteriores todas mayor menor " +
  "ademas estaba seguir aumenta habia tenia decian tambien porque correcto creemos dijeron alguien gracias entonces opciones manejar").split(" "));

// ---------- simulacro con el patrón ----------
const RC_SPEC_TXT = [[/ginecolog|obstetric|gineco/, "Ginecología"], [/pediatr|neonat/, "Pediatría"], [/cirug/, "Cirugía"],
  [/interna/, "Medicina Interna"], [/epidemiolog|estadistic|salud publica/, "Epidemiología y Estadística"],
  [/ortoped|traumatolog|\btrauma\b/, "Ortopedia y Traumatología"], [/urolog/, "Urología"], [/mastolog|\bmama\b/, "Mastología"]];
const RC_TIPO_TXT = [[/conducta|manejo|tratamiento/, "conducta"], [/diagnost/, "diagnostico"], [/lectura critica|\bmbe\b|critica/, "critica"], [/datos|cifras|dosis|umbral/, "datos"]];
// «más Ginecología, sin Urología, casos cortos, más conducta»: se entiende sin IA y se muestra lo entendido.
function rcSugerencias(txt){
  const r = {mas: [], menos: [], sin: [], tipos: [], cortos: false, largos: false, casos: false, noEntendi: []};
  String(txt || "").split(/[,;.\n]+|\s+y\s+/).map(s => s.trim()).filter(Boolean).forEach(frag => {
    const n = rcNorm(frag); let ok = false;
    const sp = RC_SPEC_TXT.filter(([re]) => re.test(n)).map(([, s]) => s);
    const neg = /\b(sin|nada de|no|quitar|excluir|excepto)\b/.test(n), menos = /\bmenos\b/.test(n);
    sp.forEach(s => { (neg ? r.sin : menos ? r.menos : r.mas).push(s); ok = true; });
    RC_TIPO_TXT.forEach(([re, k]) => { if (re.test(n) && !sp.length) { r.tipos.push(k); ok = true; } });
    if (/cort[oa]s|breves/.test(n)) { r.cortos = true; ok = true; }
    if (/larg[oa]s|extens/.test(n)) { r.largos = true; ok = true; }
    if (/casos clinicos|mas casos/.test(n) && !sp.length) { r.casos = true; ok = true; }
    if (!ok) r.noEntendi.push(frag);
  });
  return r;
}
function rcSugTexto(s){
  const p = [...s.mas.map(x => "más " + x), ...s.menos.map(x => "menos " + x), ...s.sin.map(x => "sin " + x),
    ...s.tipos.map(k => "más " + ((FOCUS.find(f => f.k === k) || {}).t || k).replace(/^\S+\s/, "").toLowerCase()),
    ...(s.cortos ? ["casos cortos"] : []), ...(s.largos ? ["casos largos"] : []), ...(s.casos ? ["más casos clínicos"] : [])];
  return (p.length ? "Entendí: " + p.join(" · ") : "") + (s.noEntendi.length ? `${p.length ? ". " : ""}No entendí: «${s.noEntendi.join("», «")}» (escribe áreas, tipos de pregunta o «cortos»/«largos»).` : "");
}
// Reparte n por mayores restos.
function rcRepartir(pesos, n){
  const tot = Object.values(pesos).reduce((a, b) => a + b, 0); if (!tot) return {};
  const base = Object.entries(pesos).map(([k, w]) => [k, n * w / tot]);
  const out = Object.fromEntries(base.map(([k, x]) => [k, Math.floor(x)]));
  let resto = n - Object.values(out).reduce((a, b) => a + b, 0);
  base.sort((a, b) => (b[1] % 1) - (a[1] % 1)).forEach(([k]) => { if (resto > 0) { out[k]++; resto--; } });
  return out;
}
function rcArmar(perfiles, n, sug){
  const areas = {}, tipos = {}; let casos = 0, tot = 0;
  perfiles.forEach(p => { Object.entries(p.areas).forEach(([a, c]) => areas[a] = (areas[a] || 0) + c);
    Object.entries(p.tipos).forEach(([k, c]) => tipos[k] = (tipos[k] || 0) + c); casos += p.casos; tot += p.n; });
  const notas = [];
  sug.mas.forEach(s => areas[s] = (areas[s] || Math.max(1, tot * 0.05)) * 2);
  sug.menos.forEach(s => { if (areas[s]) areas[s] /= 2; });
  sug.sin.forEach(s => delete areas[s]);
  sug.tipos.forEach(k => tipos[k] = (tipos[k] || 1) * 2);
  // Solo áreas que tienen casos en tu banco; lo demás se reparte entre las que sí.
  const sinCasos = Object.keys(areas).filter(a => !QUESTIONS.some(q => q.specialty === a));
  if (sinCasos.length) notas.push(`Tu banco no tiene casos de ${sinCasos.join(", ")}: esa parte se repartió entre las demás áreas.`);
  sinCasos.forEach(a => delete areas[a]);
  const cupo = rcRepartir(areas, n), cupoT = rcRepartir(tipos, n), quiereCaso = sug.casos ? 1 : tot ? casos / tot : .5;
  const usados = new Set(), items = [], cortos = sug.cortos, largos = sug.largos;
  const largo = q => String(q.vignette || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
  const puntos = q => (cupoT[qKind(q)] > 0 ? 3 : 0) + (S.srs["q" + q.id] ? 0 : 2) + (cortos ? (largo(q) < 45 ? 2 : 0) : largos ? (largo(q) > 70 ? 2 : 0) : 0)
    + ((q.qtype === "directa") === (quiereCaso < .5) ? 1 : 0) + Math.random();
  const tomar = (pool, k) => pool.filter(q => !usados.has(q.id)).map(q => [puntos(q), q]).sort((a, b) => b[0] - a[0]).slice(0, k).forEach(([, q]) => {
    usados.add(q.id); items.push(q); cupoT[qKind(q)] = (cupoT[qKind(q)] || 0) - 1; });
  Object.entries(cupo).sort((a, b) => b[1] - a[1]).forEach(([a, k]) => {
    const pool = QUESTIONS.filter(q => q.specialty === a), antes = items.length; tomar(pool, k);
    if (items.length - antes < k) notas.push(`De ${a} tu banco solo tenía ${items.length - antes} de ${k}: completé con otras áreas.`); });
  if (items.length < n) tomar(QUESTIONS.filter(q => Object.keys(areas).includes(q.specialty)), n - items.length);
  if (items.length < n) tomar(QUESTIONS, n - items.length);
  return {items: shuffle(items), notas};
}

// ---------- pantalla ----------
let rcBorrador = null;   // patrón leído y aún sin guardar (se muestra antes de guardar)
let rcSugTxt = "", rcSel = [], rcN = 50;   // lo elegido para el simulacro (no hace falta guardarlo)
const rcNombre = r => [r.univ || "Examen", r.anio].filter(Boolean).join(" ");
function rcPatronHTML(p, total){
  const pct = c => Math.round(c / Math.max(1, p.n) * 100);
  const areas = Object.entries(p.areas).sort((a, b) => b[1] - a[1]);
  return `<div class="stack" style="gap:8px">
    <div class="areas-barra">${areas.map(([a, c]) => `<i style="flex:${c};background:${SPEC_COLOR[a] || "var(--muted)"}" title="${esc(a)}: ${c}"></i>`).join("")}</div>
    <div class="small">${areas.map(([a, c]) => `<div class="row"><span><b style="color:${SPEC_COLOR[a] || "inherit"}">●</b> ${esc(a)}</span><div class="spacer"></div><span class="muted">${c} · ${pct(c)} %</span></div>`).join("")}</div>
    <div class="grid2">
      <div class="kpi"><b>${pct(p.casos)} %</b><span>casos clínicos (el resto, preguntas directas)</span></div>
      <div class="kpi"><b>${p.palabras}</b><span>palabras por enunciado (mediana)</span></div></div>
    <div class="chips">${FOCUS.slice(1).map(f => `<span class="chip2">${f.t} ${pct(p.tipos[f.k] || 0)} %</span>`).join("")}</div>
    ${p.temas.length ? `<p class="xs muted" style="margin:0">Palabras que más se repiten: ${p.temas.map(([w, c]) => `${esc(w)} (${c})`).join(", ")}</p>` : ""}
    <p class="xs muted" style="margin:0">Calculado con ${p.n} pregunta${p.n === 1 ? "" : "s"}${p.conOpc < p.n ? ` (${p.conOpc} con opciones; las demás se recordaron sin ellas)` : ""}.${p.n < 30 ? " <b>Son pocas: el patrón es aproximado.</b>" : ""} El área y el tipo se deducen de las palabras de cada pregunta o de la sección donde está.</p>
    ${total && p.n > total * 1.15 ? `<p class="xs" style="margin:0;color:var(--warn)">Se leyeron ${p.n} preguntas y el examen tenía ${total}: la reconstrucción repite preguntas o mezcla discusión. Las proporciones siguen sirviendo; el simulacro usa ${total} casos.</p>` : ""}</div>`;
}
function renderRecons(){
  const box = $("#qRecons"); if (!box) return;
  const L = rcLista(), hecho = diagHecho();
  rcSel = rcSel.filter(id => L.some(r => r.id === id));
  if (!rcSel.length && L.length) rcSel = [L[L.length - 1].id];
  const sel = L.filter(r => rcSel.includes(r.id)), nRc = rcN;
  const sug = rcSugerencias(rcSugTxt);
  box.innerHTML = `<h3 style="font-size:16px">🏛️ Simulacro estilo universidad</h3>
    <p class="xs muted" style="margin:4px 0 10px">Sube la <b>reconstrucción</b> de un examen (lo que recuerdan quienes lo presentaron). MediPulse mide cómo pregunta esa universidad (áreas, tipo de pregunta, casos clínicos o directas) y arma un simulacro con casos de tu banco en esas proporciones. Sus respuestas no se usan: dependen de la memoria. El documento no sale de tu dispositivo; solo se guarda el patrón.</p>
    ${rcBorrador ? rcBorradorHTML() : `<div class="row" style="gap:8px;flex-wrap:wrap">
      <label class="btn sm">📄 Subir PDF<input type="file" id="rcPdf" accept="application/pdf" hidden></label>
      <button class="btn sm" id="rcPegar">📋 Pegar texto</button></div>
      <div id="rcPegarBox" hidden style="margin-top:8px"><textarea id="rcTxt" rows="6" placeholder="Pega aquí la reconstrucción (por ejemplo, desde Google Docs o Word)."></textarea>
        <div class="row" style="margin-top:6px;gap:8px"><input id="rcTitulo" placeholder="Nombre: Reconstrucción UdeA 2025-1" aria-label="Nombre de la reconstrucción"><button class="btn sm primary" id="rcLeer">Medir el patrón</button></div></div>
      <p class="xs" id="rcMsg" style="margin:6px 0 0"></p>`}
    ${L.length ? `<div style="margin-top:12px">${plegable("rclista", `<b>Tus reconstrucciones</b> <span class="xs muted">${L.length}</span>`, L.map(r => `
      <div class="card" style="padding:10px 12px;margin-top:8px"><div class="row"><b class="small">${esc(rcNombre(r))}</b><span class="xs muted" style="margin-left:6px">${r.total ? r.total + " en el examen" : r.perfil.n + " leídas"}</span><div class="spacer"></div><button class="linkbtn xs" data-rcdel="${r.id}">🗑️ Quitar</button></div>
        ${plegable("rcp" + r.id, `<span class="xs">Ver el patrón</span>`, rcPatronHTML(r.perfil, r.total))}</div>`).join(""))}</div>
      <div class="xs muted" style="margin:12px 0 6px">Imitar (elige una o varias del mismo examen: se suman)</div>
      <div class="chips" id="rcSel">${L.map(r => `<button class="chip2${rcSel.includes(r.id) ? " on" : ""}" data-rcsel="${r.id}">${esc(rcNombre(r))} <span class="cnt">${r.total || r.perfil.n}</span></button>`).join("")}</div>
      <label class="fld" style="margin-top:10px"><span>Ajustes (opcional)</span><textarea id="rcSug" rows="2" placeholder="Ej.: más Ginecología, sin Urología, casos cortos, más conducta">${esc(rcSugTxt)}</textarea></label>
      <p class="xs muted" id="rcSugEco" style="margin:4px 0 0">${esc(rcSugTexto(sug))}</p>
      <div class="row" style="margin-top:10px;gap:8px;align-items:flex-end">
        <div class="chips" id="rcNs">${[...new Set([20, 50, 100, ...sel.map(r => r.total).filter(Boolean).map(t => Math.min(PRAC_MAX, t))])].sort((a, b) => a - b).map(x => `<button class="chip2${nRc === x ? " on" : ""}" data-rcn="${x}">${x} casos${sel.some(r => r.total === x) ? " (como el examen)" : ""}</button>`).join("")}</div></div>
      ${hecho ? `<button class="btn primary block" id="rcGo" style="margin-top:10px" ${sel.length ? "" : "disabled"}>⏱️ Simulacro estilo ${esc(sel.length ? [...new Set(sel.map(r => r.univ || "examen"))].join(" + ") : "…")} · ${nRc} casos · ${fmt(nRc * 72)}</button>`
        : `<div style="margin-top:10px">${diagCandadoHTML("El simulacro estilo universidad")}</div>`}
      <p class="xs muted" id="rcNotas" style="margin:6px 0 0"></p>` : ""}`;
  // Subir o pegar
  $("#rcPdf") && ($("#rcPdf").onchange = async e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    $("#rcMsg").innerHTML = `<span class="spin"></span> Leyendo “${esc(f.name)}”…`;
    try { const pages = await extractPages(await f.arrayBuffer()); rcMedir(pages.join("\n"), f.name.replace(/\.pdf$/i, "") + " " + (pages.tituloPag || "")); }
    catch(err) { $("#rcMsg").innerHTML = `<span style="color:var(--bad)">No se pudo leer el PDF: ${esc(err.message || err)}</span>`; } });
  $("#rcPegar") && ($("#rcPegar").onclick = () => { $("#rcPegarBox").hidden = false; $("#rcTxt").focus(); });
  $("#rcLeer") && ($("#rcLeer").onclick = () => rcMedir($("#rcTxt").value, $("#rcTitulo").value || $("#rcTxt").value.split("\n").find(l => l.trim()) || ""));
  // Borrador: guardar o descartar
  $("#rcGuardar") && ($("#rcGuardar").onclick = () => {
    const r = Object.assign({}, rcBorrador, {univ: $("#rcUniv").value.trim(), anio: $("#rcAnioIn").value.trim()});
    const tot = Math.round(+$("#rcTotal").value); if (tot >= 5 && tot <= 300) r.total = tot; else delete r.total;
    rcLista().push(r); rcSel = [r.id]; if (r.total) rcN = Math.min(PRAC_MAX, r.total); rcBorrador = null; save(); renderRecons(); toast("Patrón guardado ✓"); });
  $("#rcDescartar") && ($("#rcDescartar").onclick = () => { rcBorrador = null; renderRecons(); });
  // Lista y simulacro
  box.querySelectorAll("[data-rcdel]").forEach(b => b.onclick = () => { const r = L.find(x => x.id === b.dataset.rcdel);
    if (!confirm(`¿Quitar el patrón de «${rcNombre(r)}»?`)) return; S.recons = L.filter(x => x !== r); save(); renderRecons(); });
  box.querySelectorAll("[data-rcsel]").forEach(b => b.onclick = () => { const id = b.dataset.rcsel;
    rcSel = rcSel.includes(id) ? rcSel.filter(x => x !== id) : [...rcSel, id]; renderRecons(); });
  box.querySelectorAll("[data-rcn]").forEach(b => b.onclick = () => { rcN = +b.dataset.rcn; renderRecons(); });
  $("#rcSug") && ($("#rcSug").oninput = e => { rcSugTxt = e.target.value; $("#rcSugEco").textContent = rcSugTexto(rcSugerencias(rcSugTxt)); });
  $("#rcGo") && ($("#rcGo").onclick = () => {
    const s = rcSugerencias(rcSugTxt), {items, notas} = rcArmar(sel.map(r => r.perfil), nRc, s);
    if (!items.length) { $("#rcNotas").textContent = "Tu banco no tiene casos para armar este simulacro."; return; }
    if (notas.length) toast(notas[0]);
    const nombre = "Simulacro estilo " + sel.map(rcNombre).join(" + ");
    startSession({label: nombre, tag: "fire", stages: [{name: nombre, items: items.map(q => ({t: "q", id: q.id})), exam: true, limit: items.length * 72}]});
  });
}
function rcBorradorHTML(){
  const b = rcBorrador;
  if (!b.perfil.n) return `<div class="note"><b>No encontré preguntas en este texto.</b> Revisa que sea la reconstrucción con las preguntas escritas (no imágenes escaneadas).<div style="margin-top:8px"><button class="btn sm" id="rcDescartar">Volver</button></div></div>`;
  return `<div class="note stack" style="gap:8px"><b>Patrón de «${esc(b.titulo)}»</b>
    <div class="grid2" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)"><label class="fld"><span>Universidad</span><input id="rcUniv" style="width:100%;min-width:0" value="${esc(b.univ)}" placeholder="UdeA, Univalle…"></label>
      <label class="fld"><span>Año y periodo</span><input id="rcAnioIn" style="width:100%;min-width:0" value="${esc(b.anio)}" placeholder="2025-1"></label></div>
    <label class="fld"><span>Preguntas del examen real (opcional)</span><input id="rcTotal" type="number" min="5" max="300" inputmode="numeric" style="width:100%;min-width:0" value="${b.total || ""}" placeholder="Ej.: 70 en la UdeA"></label>
    ${rcPatronHTML(b.perfil)}
    ${plegable("rcmuestra", `<span class="xs">Así leí algunas preguntas</span>`, b.muestras.map(t => `<p class="xs" style="margin:6px 0">• ${esc(t)}</p>`).join(""))}
    <div class="row" style="gap:8px"><button class="btn primary sm" id="rcGuardar">Guardar el patrón</button><button class="btn ghost sm" id="rcDescartar">Descartar</button></div></div>`;
}
function rcMedir(texto, titulo){
  const qs = rcParsear(texto), t = String(titulo || "").trim();
  rcBorrador = {id: "rc" + Date.now().toString(36), titulo: t.slice(0, 120) || "Reconstrucción", univ: rcUniv(t) || rcUniv(texto.slice(0, 300)),
    anio: rcAnio(t) || rcAnio(texto.slice(0, 300)), fecha: Date.now(), perfil: rcPerfil(qs),
    // Unas pocas preguntas de muestra, para que se vea cómo se leyó (no el documento completo).
    muestras: qs.filter((_, i) => i % Math.max(1, Math.floor(qs.length / 6)) === 0).slice(0, 6).map(q => q.t.length > 220 ? q.t.slice(0, 217) + "…" : q.t)};
  renderRecons();
}
