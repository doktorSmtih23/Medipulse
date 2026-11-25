// Especialidades y sus colores (las usan las estadísticas, los filtros y la IA).
// Las 4 básicas del examen (paquete "starter"), Epidemiología y Estadística (antes «Salud Pública») y Ortopedia y Traumatología (módulos aparte). Una urgencia va en la especialidad del paciente.
const SPECS = ["Medicina Interna","Cirugía","Pediatría","Ginecología","Epidemiología y Estadística","Ortopedia y Traumatología"];
const SPEC_COLOR = {"Medicina Interna":"#0891b2","Urgencias":"#e11d48","Cirugía":"#7c3aed","Pediatría":"#059669","Ginecología":"#db2777","Epidemiología y Estadística":"#b45309","Ortopedia y Traumatología":"#2563eb"};

// Nombre vigente de una especialidad: acepta el anterior («Salud Pública») y variantes que traen otras IA o packs.
function specCanon(x){
  const t = String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/salud publica|epidemiolog|bioestad|estadistic/.test(t)) return "Epidemiología y Estadística";
  if (/ortoped|traumatolog/.test(t)) return "Ortopedia y Traumatología";
  if (/^urgencias?$/.test(t.trim())) return "Medicina Interna";
  return SPECS.find(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === t.trim()) || x;
}
