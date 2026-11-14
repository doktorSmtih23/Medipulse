// Fichas high-yield incluidas.
const HY_CARDS = [
      {
        id: "hy1",
        specialty: "Urgencias",
        title: "Sepsis & Choque Séptico",
        badge: "Surviving Sepsis",
        accent: "#06b6d4",
        thresholds: [
          { label: "Cristaloides", val: "30 mL/kg (1-3 h)" },
          { label: "Meta PAM", val: "≥ 65 mmHg" },
          { label: "Vasopresor #1", val: "Norepinefrina" }
        ],
        redFlag: "Lactato > 2 mmol/L + vasopresor tras líquidos = Choque séptico (mortalidad > 40%).",
        trap: "Esperar vía central para iniciar norepinefrina: ¡se puede iniciar por vía periférica proximal mientras se canaliza!"
      },
      {
        id: "hy2",
        specialty: "Medicina Interna",
        title: "Cetoacidosis Diabética (CAD)",
        badge: "Emergencia Endocrina",
        accent: "#f59e0b",
        thresholds: [
          { label: "Glucemia", val: "> 250 mg/dL" },
          { label: "pH / HCO3", val: "< 7.30 / < 18" },
          { label: "Regla K+", val: "Si < 3.3 NO insulina" }
        ],
        redFlag: "K+ < 3.3 mEq/L: reponer potasio antes de insulina o habrá paro por hipokalemia.",
        trap: "Suspender insulina cuando glucemia baja a 200 mg/dL: se debe agregar dextrosa y mantener insulina hasta cerrar brecha aniónica."
      },
      {
        id: "hy3",
        specialty: "Ginecología",
        title: "Preeclampsia con Severidad",
        badge: "Obstetricia Crítica",
        accent: "#f43f5e",
        thresholds: [
          { label: "PA Severa", val: "≥ 160/110 mmHg" },
          { label: "Plaquetas", val: "< 100.000/mm³" },
          { label: "Neuroprotección", val: "Sulfato de Mg" }
        ],
        redFlag: "Cefalea persistente, fosfenos, epigastralgia o clonus = riesgo inminente de eclampsia.",
        trap: "Usar losartán o enalapril en embarazo (teratogénicos) o bajar la PA demasiado rápido (< 130/80 compromete perfusión placentaria)."
      },
      {
        id: "hy4",
        specialty: "Medicina Interna",
        title: "Hiperkalemia Grave",
        badge: "Electrocardiograma",
        accent: "#10b981",
        thresholds: [
          { label: "1° Estabilizar", val: "Gluconato Ca 10%" },
          { label: "2° Redistribuir", val: "Insulina + Dextrosa" },
          { label: "3° Eliminar", val: "Furosemida / Diálisis" }
        ],
        redFlag: "Ondas T picudas → PR largo → QRS ancho → patrón sinusoidal → FV.",
        trap: "Creer que el gluconato de calcio baja el potasio sérico: solo protege el miocardio por 30-60 minutos."
      },
      {
        id: "hy5",
        specialty: "Pediatría",
        title: "Crup vs. Epiglotitis",
        badge: "Estridor Agudo",
        accent: "#06b6d4",
        thresholds: [
          { label: "Crup", val: "Tos perruna + disfonía" },
          { label: "Manejo Crup", val: "Dexametasona + Adren." },
          { label: "Epiglotitis", val: "Babeo + Trípode" }
        ],
        redFlag: "Niño tóxico con babeo y boca abierta = Epiglotitis. NO explorar garganta con bajalenguas.",
        trap: "Dar salbutamol en crup (no actúa en edema subglótico) o pedir Rx antes de asegurar vía aérea en epiglotitis."
      },
      {
        id: "hy6",
        specialty: "Cirugía",
        title: "Neumotórax a Tensión",
        badge: "ATLS Trauma",
        accent: "#f43f5e",
        thresholds: [
          { label: "Diagnóstico", val: "100% Clínico" },
          { label: "Tríada", val: "Choque + IY + MV abolido" },
          { label: "Acción", val: "Descompresión ya" }
        ],
        redFlag: "Hipotensión + ingurgitación yugular + desviación traqueal contralateral.",
        trap: "Solicitar radiografía de tórax para confirmar: el paciente muere en la sala de rayos X."
      }
    ];

const HY_SRC = {hy1:"ssc26",hy2:"ada_cri",hy3:"acog_htn",hy4:"ukka_k",hy5:"cps_croup",hy6:"atls11"};
HY_CARDS.forEach(h=>{ h.src = HY_SRC[h.id]; });
