// Especialidades y sus colores (las usan las estadísticas, los filtros y la IA).
// Las 4 básicas del examen (paquete "starter"), Epidemiología y Estadística (antes «Salud Pública») y Ortopedia y Traumatología (módulos aparte). Una urgencia va en la especialidad del paciente.
const SPECS = ["Medicina Interna","Cirugía","Pediatría","Ginecología","Epidemiología y Estadística","Ortopedia y Traumatología"];
// Especialidades incluidas que aún no entran al diagnóstico, al plan ni a las sugerencias de Hoy (tienen pocos
// casos): sí aparecen en Casos, Fichas, Progreso y vulnerabilidades. Cuando tengan unos 10 casos se pueden pasar a SPECS.
const SPECS_MODULOS = ["Urología","Mastología"];
// Colores de cada especialidad según la combinación de colores elegida en Apariencia (js/ui.js). Bosque y
// terracota es la de inicio; «turquesa» conserva los colores de antes. SPEC_COLOR siempre tiene los vigentes.
const SPEC_PALETAS = {
  bosque:   {"Medicina Interna":"#3f8f78","Urgencias":"#c8553d","Cirugía":"#c8643f","Pediatría":"#7d9f3e","Ginecología":"#c25a80","Epidemiología y Estadística":"#c98a2a","Ortopedia y Traumatología":"#5f84a8","Urología":"#4f7d8c","Mastología":"#9b5d9e"},
  petroleo: {"Medicina Interna":"#1d7c8f","Urgencias":"#9a031e","Cirugía":"#e36414","Pediatría":"#3a9d8f","Ginecología":"#d1495b","Epidemiología y Estadística":"#b7791f","Ortopedia y Traumatología":"#5c6fa8","Urología":"#2f6f8f","Mastología":"#a855a0"},
  marino:   {"Medicina Interna":"#3d5a9e","Urgencias":"#d1495b","Cirugía":"#e09a2b","Pediatría":"#2a9d8f","Ginecología":"#d1495b","Epidemiología y Estadística":"#b8862b","Ortopedia y Traumatología":"#6b5ca5","Urología":"#4a7c9b","Mastología":"#9b4f96"},
  turquesa: {"Medicina Interna":"#0891b2","Urgencias":"#e11d48","Cirugía":"#7c3aed","Pediatría":"#059669","Ginecología":"#db2777","Epidemiología y Estadística":"#b45309","Ortopedia y Traumatología":"#2563eb","Urología":"#0369a1","Mastología":"#c026d3"}
};
const SPEC_COLOR = Object.assign({}, SPEC_PALETAS.bosque);
// ¿Es este color el de la especialidad en alguna combinación? (las fichas guardadas con el color de antes siguen la combinación vigente).
const colorDePaleta = (spec, c) => Object.values(SPEC_PALETAS).some(p => p[spec] && String(c).toLowerCase() === p[spec]);

// Nombre vigente de una especialidad: acepta el anterior («Salud Pública») y variantes que traen otras IA o packs.
function specCanon(x){
  const t = String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/salud publica|epidemiolog|bioestad|estadistic/.test(t)) return "Epidemiología y Estadística";
  if (/ortoped|traumatolog/.test(t)) return "Ortopedia y Traumatología";
  if (/^urgencias?$/.test(t.trim())) return "Medicina Interna";
  if (/^urolog/.test(t.trim())) return "Urología";
  if (/^mastolog|^patologia mamaria/.test(t.trim())) return "Mastología";
  return SPECS.find(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === t.trim()) || x;
}
