// Especialidades y sus colores (las usan las estadísticas, los filtros y la IA).
// Las 4 básicas del examen (paquete "starter") y Epidemiología y Estadística (antes «Salud Pública»). Una urgencia va en la especialidad del paciente.
const SPECS = ["Medicina Interna","Cirugía","Pediatría","Ginecología","Epidemiología y Estadística"];
const SPEC_COLOR = {"Medicina Interna":"#0891b2","Urgencias":"#e11d48","Cirugía":"#7c3aed","Pediatría":"#059669","Ginecología":"#db2777","Epidemiología y Estadística":"#b45309"};

// Nombre vigente de una especialidad: acepta el anterior («Salud Pública») y variantes que traen otras IA o packs.
function specCanon(x){
  const t = String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/salud publica|epidemiolog|bioestad|estadistic/.test(t)) return "Epidemiología y Estadística";
  if (/^urgencias?$/.test(t.trim())) return "Medicina Interna";
  return SPECS.find(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === t.trim()) || x;
}
