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
