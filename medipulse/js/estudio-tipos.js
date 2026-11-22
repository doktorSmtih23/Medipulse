// ===================================================================
// SESIÓN DE ESTUDIO · TIPO DE MATERIAL
// ===================================================================
// La sesión se adapta a lo que se estudia: una enfermedad, una guía de práctica clínica, un fármaco, un
// procedimiento o un tema amplio. Cada tipo trae su plantilla de lectura (qué extraer), su guía de cómo
// estudiarlo, sus ejemplos y el foco de las preguntas de búsqueda activa. Todo funciona sin IA.
// Los estudios originales (ensayos, metaanálisis) no usan esto: se leen en MBE.

const EST_TIPOS = {
  enf: {n: "🦠 Enfermedad", como: "una revisión de tema", ej: "p. ej. Encefalitis autoinmune",
    pl: [["fisio", "🧬 Fisiopatología", "Causa → mecanismo → signo clínico"], ["cuadro", "🩺 Cuadro típico", "Quién, cómo se presenta, hallazgos clave"],
      ["banderas", "🚩 Banderas rojas", "Cuándo sospechar algo grave"], ["algoritmo", "🧭 Algoritmo", "Prueba inicial → confirmatoria → tratamiento de primera línea"],
      ["dif", "🔀 Diferenciales", "Con qué se confunde y el dato que los separa"], ["perlas", "💎 Perlas", "Cifras, umbrales y trampas de examen"]],
    preg: "¿Cuál es el criterio para sospecharla?\n¿Cuál es el tratamiento de primera línea?",
    foco: "mecanismo central, criterio o dato diagnóstico clave, primera línea de tratamiento, un umbral o cifra que cambie la conducta, el diferencial que más se confunde y la trampa típica de examen"},
  guia: {n: "📋 Guía de práctica clínica", como: "una guía de práctica clínica", ej: "p. ej. Neumonía adquirida en la comunidad",
    pl: [["aplica", "👥 A quién aplica", "Población, escenario y lo que deja por fuera"], ["hace", "✅ Lo que se hace", "Recomendaciones clave, con su grado o fuerza"],
      ["nohace", "⛔ Lo que no se hace", "Recomendaciones en contra y prácticas que se abandonan"], ["umbrales", "📏 Umbrales y dosis", "Puntos de corte, escalas, dosis y duraciones"],
      ["cambios", "🆕 Qué cambió", "Frente a la versión anterior o a la práctica habitual"]],
    preg: "¿Qué recomendación tiene la evidencia más fuerte?\n¿Qué umbral decide la conducta?",
    foco: "a quién aplica la guía, las recomendaciones fuertes de hacer y de no hacer, los umbrales, escalas y dosis que deciden la conducta, y lo que cambió frente a la versión anterior"},
  farm: {n: "💊 Fármaco o terapéutica", como: "un fármaco o una terapéutica", ej: "p. ej. Vasoactivos en pediatría",
    pl: [["mecanismo", "⚙️ Mecanismo", "Sobre qué actúa y qué efecto produce"], ["indic", "🎯 Indicaciones", "Cuándo se usa y cuál es la primera elección"],
      ["dosis", "💉 Dosis", "Dosis, vía y ajustes por peso o función renal"], ["contra", "⛔ Contraindicaciones", "Cuándo no se usa"],
      ["adversos", "⚠️ Efectos adversos y vigilancia", "Qué vigilar, cada cuánto y cuándo suspender"], ["interac", "🔗 Interacciones", "Con qué no se combina"]],
    preg: "¿Cuál es la primera elección y en qué dosis?\n¿Qué efecto adverso obliga a suspenderlo?",
    foco: "mecanismo, indicación y primera elección, dosis, contraindicaciones, efectos adversos que obligan a vigilar o suspender e interacciones relevantes"},
  proc: {n: "🔧 Procedimiento", como: "un procedimiento", ej: "p. ej. Toracostomía cerrada",
    pl: [["indic", "🎯 Indicaciones", "Cuándo se hace"], ["contra", "⛔ Contraindicaciones", "Cuándo no se hace o se difiere"],
      ["tecnica", "🪜 Técnica paso a paso", "Reparos anatómicos y pasos clave"], ["compl", "⚠️ Complicaciones", "Las frecuentes y las graves, y cómo se reconocen"],
      ["cuidados", "🩹 Cuidados y retiro", "Seguimiento y criterios de retiro o de alta"]],
    preg: "¿Cuál es la indicación principal?\n¿Cuál es la complicación más frecuente?",
    foco: "indicaciones, contraindicaciones, reparos anatómicos y pasos clave de la técnica, complicaciones frecuentes y graves, y cuidados o criterios de retiro"},
  amplio: {n: "📚 Tema amplio", como: "un tema amplio", ej: "p. ej. Analgesia multimodal",
    pl: [["ideas", "💡 Ideas principales", "Las 3 a 5 ideas que resumen el tema"], ["conceptos", "🧩 Conceptos clave", "Definiciones y clasificaciones que hay que saber"],
      ["cifras", "🔢 Cifras", "Números, umbrales y porcentajes que cambian la conducta"], ["examen", "📝 Cómo se pregunta", "Lo que suele caer en el examen y sus trampas"]],
    preg: "¿Cuál es la idea central del tema?\n¿Qué cifra cambia la conducta?",
    foco: "las ideas centrales, los conceptos y clasificaciones clave, las cifras que cambian la conducta y cómo se pregunta en el examen"}
};
const estTipo = k => EST_TIPOS[k] || EST_TIPOS.enf;

// Cómo estudiar cada tipo. La enfermedad y la guía usan las guías de MBE; las demás, estas.
const EST_GUIAS = {
  farm: {intro: "De un fármaco se pregunta cuándo usarlo, cuánto dar y cuándo suspenderlo, no su historia ni su química.",
    steps: ["Empieza por la indicación: en qué situación es la primera elección y en cuál no.",
      "Anota la dosis con su unidad, vía y ajuste (por peso, función renal o edad).",
      "Separa los efectos adversos frecuentes de los graves, y qué se vigila para detectarlos.",
      "Cierra con recuerdo activo: escribe de memoria la dosis y la contraindicación principal."],
    pitfall: "Memorizar el mecanismo y olvidar la dosis o la contraindicación, que es lo que se pregunta."},
  proc: {intro: "De un procedimiento se pregunta cuándo hacerlo, cuándo no y qué puede salir mal.",
    steps: ["Lee primero las indicaciones y contraindicaciones: deciden si el procedimiento es la respuesta.",
      "Resume la técnica en 4 o 5 pasos con sus reparos anatómicos.",
      "Lista las complicaciones: la más frecuente y la más grave, y cómo se reconocen.",
      "Cierra con recuerdo activo: escribe de memoria la indicación y la complicación más frecuente."],
    pitfall: "Detenerse en el material y los detalles técnicos finos, y no saber cuándo está contraindicado."},
  amplio: {intro: "Un tema amplio (un enfoque, un capítulo de actualización) se olvida si lo lees de corrido. Redúcelo a pocas ideas.",
    steps: ["Lee primero títulos, tablas y conclusiones para ver la estructura.",
      "Escribe las 3 a 5 ideas que resumen el tema con tus palabras.",
      "Caza las cifras y clasificaciones que cambian la conducta.",
      "Cierra con recuerdo activo: explica el tema en 5 líneas sin mirar."],
    pitfall: "Subrayar casi todo: si todo es importante, nada lo es."}
};
function estGuiaDe(k){
  const m = typeof MBE !== "undefined" ? MBE : {};
  if (k === "guia" && m.GPC) return m.GPC;
  if (k === "enf") return typeof GUIA_REV !== "undefined" ? GUIA_REV : null;
  return EST_GUIAS[k] || null;
}

// Tipo sugerido según el documento y el tema (sin IA). El usuario lo puede cambiar.
function estTipoAuto(s, tema){
  if (s && estDiseno(s) === "GPC") return "guia";
  const t = norm(`${s ? s.title : ""} ${tema || ""}`);
  if (/\b(guia|guideline|guidelines|consenso|recomendaciones)\b/.test(t)) return "guia";
  if (/(vasoactiv|farmaco|antibiotic|anticoagul|insulina|inotrop|antiepilept|antihipertens|\bdosis\b|terapia hormonal)/.test(t)) return "farm";
  if (/(toracostom|intubacion|puncion|cateter|traqueostom|paracentesis|toracocentesis|\breboa\b|procedimiento|\btecnica\b)/.test(t)) return "proc";
  return "enf";
}

// Nombre corto del tema a partir del título del documento: «Guía de práctica clínica para el diagnóstico y
// tratamiento de la NAC 2026» → «NAC». Si no hay nada que quitar, queda el título (sin el año final).
function estTemaCorto(titulo){
  let t = String(titulo || "").replace(/\s+/g, " ").trim();
  const accion = "(?:diagn[oó]stico|manejo|tratamiento|evaluaci[oó]n|abordaje|prevenci[oó]n|enfoque)";
  t = t.replace(new RegExp(`^(?:gu[ií]a(?: de pr[aá]ctica cl[ií]nica)?|consenso(?: [a-záéíóú]+)?|revisi[oó]n|actualizaci[oó]n)(?: (?:para|sobre|en|de))?(?: (?:el|la|los|las))? ?(?:${accion}(?:,? (?:y|e) (?:el |la )?${accion})*)?(?: (?:de|del|en) (?:la |el |los |las )?)?`, "i"), "");
  t = t.replace(/^(?:diagnosis|management|evaluation|treatment|update on|review of)(?: (?:and|&) (?:diagnosis|management|treatment))*(?: of| in)? (?:the )?/i, "");
  t = t.replace(/,?\s*estado del arte\s*$/i, "").replace(/[-–:]?\s*(?:a )?review\s*$/i, "").replace(/[\s,(]*(?:19|20)\d\d\)?\s*$/, "").replace(/[\s:.,-]+$/, "").trim();
  if (!t) return String(titulo || "").trim();
  if (t.length > 70 && t.includes(":")) t = t.split(":")[0].trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ---------- la IA llena la plantilla (opcional) ----------
// Para quien no quiere llenarla a mano: la IA la llena con las secciones del tipo de material, desde el
// documento y con la página de cada dato. El esquema sigue igual: se estudia con el reloj, se escribe de
// memoria al terminar cada bloque y se compara.
function estTextoDoc(s, a){
  const info = docInfo(s.id), nums = [];
  for (let p = a.desde || 1; p <= (a.hasta || s.pages); p++) if (info && info.pages[p - 1]) nums.push(p);
  return nums.map(p => `[pág. ${p}]\n${info.pages[p - 1]}`).join("\n\n").slice(0, AN_MAX_CHARS);
}
async function estGenPlantilla(a){
  const s = a.src && S.sources.find(x => x.id === a.src), T = estTipo(a.tipo);
  try {
    let doc = "";
    if (s) { await getRec(s.id); doc = estTextoDoc(s, a); }
    const seccion = {type: "object", additionalProperties: false, required: ["texto", "page"], properties: {texto: {type: "string"}, page: {type: "integer"}}};
    const tool = {name: "report_plantilla", description: "Entrega la plantilla de lectura llena.", strict: true,
      input_schema: {type: "object", additionalProperties: false, required: T.pl.map(x => x[0]), properties: Object.fromEntries(T.pl.map(([k]) => [k, seccion]))}};
    const r = await callForTool({system: `Eres un profesor de medicina que prepara a médicos para el examen de residencia. Llenas la plantilla de lectura de una sesión de estudio: el médico la estudiará y después la escribirá de memoria.
El material es ${T.n.replace(/^\S+\s/, "").toLowerCase()}. Secciones:
${T.pl.map(([k, t, d]) => `- "${k}" (${t.replace(/^\S+\s/, "")}): ${d}.`).join("\n")}
Reglas:
- Solo lo que se pregunta en el examen y cambia la conducta: criterios, cifras, umbrales, dosis y trampas. Nada de relleno.
- Cada sección en 2 a 4 líneas cortas, una idea por línea, sin viñetas ni markdown. Si es un dato, usa «→» (p. ej. «Pleocitosis → > 5/μl»).
- ${s ? `Tomado SOLO del documento. "page" es la página donde está lo principal de la sección, según las marcas [pág. N]. Si el documento no trae nada de una sección, deja "texto" vacío y "page" en 0.` : `Según el conocimiento médico vigente; "page" es 0.`}
Español neutro.${focusLine()}`,
      tools: [tool], label: "Plantilla de lectura",
      user: s ? [{type: "text", text: `<documento titulo="${s.title.replace(/"/g, "'")}">\n${doc}\n</documento>`, cache_control: {type: "ephemeral"}}, {type: "text", text: `Tema a estudiar: ${a.tema}.`}]
             : `Tema a estudiar: ${a.tema}.`}, "report_plantilla");
    a.plPag = {};
    T.pl.forEach(([k]) => {
      const x = r[k] || {}, t = String(x.texto || "").trim();
      if (t && !(a.plantilla[k] || "").trim()) a.plantilla[k] = t;
      a.plPag[k] = s && x.page > 0 && x.page <= s.pages ? x.page : 0;
    });
    if (!Object.values(a.plantilla).some(x => x && x.trim())) throw uerr("La IA no llenó la plantilla.");
  } catch(e) { a.plIA = false; toast((e.userMsg || e.message) + " · La plantilla queda para llenarla tú."); }
}
