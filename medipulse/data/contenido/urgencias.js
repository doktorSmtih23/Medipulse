// Urgencias: contenido incluido en la app (starter pack de la versión gratuita).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: urg-c01 (casos), urg-f01 (fichas), urg-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Urgencias",
  "prefijo": "urg",
  "actualizado": "2026-11-15",
  "casos": [
    {
      "id": 2,
      "topic": "Sepsis · Reanimación",
      "difficulty": "Nivel 3",
      "src": "ssc26",
      "vignette": "Mujer de 71 años ingresa por fiebre, disuria y confusión. PA 78/46 mmHg, FC 124 lpm, FR 28 rpm, T° 39.1°C, <span class='hy'>lactato sérico 4.4 mmol/L</span>. Ya recibió 30 mL/kg de cristaloides balanceados en la primera hora, pero persiste con <span class='hy'>PAM en 54 mmHg</span>. ¿Cuál es el siguiente paso inmediato?",
      "options": [
        "Administrar un segundo bolo de 30 mL/kg de solución salina al 0.9%",
        "Iniciar dopamina como vasopresor de primera línea por vía periférica",
        "Iniciar norepinefrina en infusión titulada a la PAM objetivo",
        "Indicar hidrocortisona 200 mg IV en bolo único antes de vasopresores"
      ],
      "correct": 2,
      "whyCorrect": "Si tras el bolo inicial de cristaloides persiste la hipotensión, se trata de choque séptico y se inicia norepinefrina (primera línea) sin esperar más bolos. La SSC 2026 sugiere en adultos ≥ 65 años, como esta paciente, una PAM objetivo inicial de 60–65 mmHg.",
      "pearl": "Choque séptico = sepsis + vasopresor para mantener la PAM + lactato > 2 mmol/L tras reanimación hídrica. SSC 2026: PAM ≥ 65 en general, 60–65 en ≥ 65 años.",
      "trap": "Seguir encharcando al paciente con bolos repetidos sin iniciar norepinefrina empeora el edema pulmonar y la mortalidad."
    },
    {
      "id": 8,
      "topic": "Toxicología · Antídotos",
      "difficulty": "Nivel 2",
      "src": "apap",
      "vignette": "Paciente de 19 años traído por ingesta intencional de <span class='hy'>25 tabletas de acetaminofén (12.5 g) hace 3 horas</span>. Asintomático, signos vitales normales. ¿Cuál es la conducta más apropiada en urgencias?",
      "options": [
        "Carbón activado (si < 4 h) + medir acetaminofén sérico a las 4 horas para nomograma de Rumack-Matthew",
        "Dar de alta con signos de alarma porque está asintomático y con signos normales",
        "Iniciar N-acetilcisteína solo si aparecen náuseas o ictericia a las 24 horas",
        "Realizar lavado gástrico con sonda de gran calibre y administrar flumazenilo"
      ],
      "correct": 0,
      "whyCorrect": "La intoxicación por acetaminofén es inicialmente asintomática (Fase I, 0-24 h). En ingesta < 4 horas se considera carbón activado y se toma nivel sérico a las 4 horas post-ingesta para ubicarlo en el nomograma de Rumack-Matthew e iniciar N-acetilcisteína.",
      "pearl": "El nomograma de Rumack-Matthew solo es válido a partir de las 4 horas post-ingesta aguda. NAC es más efectiva si se inicia en las primeras 8 horas.",
      "trap": "Confiarse porque el paciente está asintomático a las 3 horas: la necrosis hepática aparece entre las 24 y 72 horas."
    },
    {
      "id": 14,
      "topic": "Anafilaxia · Vía Aérea",
      "difficulty": "Nivel 2",
      "src": "ga2len",
      "vignette": "Mujer de 28 años desarrolla <span class='hy'>urticaria generalizada, estridor laríngeo, sibilancias y PA 80/50 mmHg</span> 10 minutos después de recibir penicilina IM. ¿Tratamiento de primera línea?",
      "options": [
        "Difenhidramina 50 mg IV + hidrocortisona 200 mg IV",
        "Adrenalina 1 mg IV en bolo rápido",
        "Salbutamol nebulizado seguido de observación",
        "Adrenalina 0.3–0.5 mg IM en cara anterolateral del muslo"
      ],
      "correct": 3,
      "whyCorrect": "La adrenalina intramuscular (0.01 mg/kg, máx 0.5 mg en adultos, concentración 1:1000) en la cara anterolateral del muslo es el único tratamiento de primera línea que revierte el broncoespasmo, edema laríngeo y vasodilatación.",
      "pearl": "Antihistamínicos y corticoides son adyuvantes (no salvan la vida en agudo). La vía IM en muslo es más segura y rápida que IV en bolo.",
      "trap": "Dar adrenalina 1 mg IV en bolo (dosis de paro) en un paciente con pulso causa crisis hipertensiva y arritmias letales."
    },
    {
      "id": 23,
      "topic": "Toxicología · Organofosforados",
      "difficulty": "Nivel 2",
      "src": "goldf",
      "vignette": "Agricultor de 40 años traído tras fumigar sin protección. Presenta <span class='hy'>miosis puntiforme, sialorrea, broncorrea, bradicardia</span>, diarrea y fasciculaciones. ¿Antídoto de primera línea?",
      "options": [
        "Naloxona IV",
        "Atropina IV en dosis crecientes hasta secar las secreciones bronquiales",
        "Flumazenil IV",
        "N-acetilcisteína"
      ],
      "correct": 1,
      "whyCorrect": "El cuadro colinérgico (muscarínico + nicotínico) es típico de los organofosforados. La atropina revierte los efectos muscarínicos; su meta es secar las secreciones bronquiales, no la midriasis. La pralidoxima es un complemento para los efectos nicotínicos.",
      "pearl": "DUMBELS: Diarrea, Urination, Miosis, Bradicardia/Broncorrea, Emesis, Lagrimeo, Salivación.",
      "trap": "Usar la midriasis o la FC como meta de atropinización: el objetivo es secar los pulmones."
    }
  ],
  "fichas": [
    {
      "id": "hy1",
      "title": "Sepsis & Choque Séptico",
      "badge": "Surviving Sepsis",
      "src": "ssc26",
      "accent": "#06b6d4",
      "thresholds": [
        {
          "label": "Cristaloides",
          "val": "30 mL/kg (1-3 h)"
        },
        {
          "label": "Meta PAM",
          "val": "≥ 65 mmHg"
        },
        {
          "label": "Vasopresor #1",
          "val": "Norepinefrina"
        }
      ],
      "redFlag": "Lactato > 2 mmol/L + vasopresor tras líquidos = Choque séptico (mortalidad > 40%).",
      "trap": "Esperar vía central para iniciar norepinefrina: ¡se puede iniciar por vía periférica proximal mientras se canaliza!"
    }
  ],
  "tarjetas": [
    {
      "id": 12,
      "src": "goldf",
      "front": "Antídoto de opioides",
      "back": "Naloxona"
    },
    {
      "id": 13,
      "src": "goldf",
      "front": "Antídoto de benzodiacepinas",
      "back": "Flumazenil (cuidado: convulsiones en consumidores crónicos)"
    },
    {
      "id": 14,
      "src": "goldf",
      "front": "Antídoto de organofosforados",
      "back": "Atropina (meta: secar secreciones) + pralidoxima"
    },
    {
      "id": 15,
      "src": "apap",
      "front": "Antídoto del paracetamol",
      "back": "N-acetilcisteína (ideal < 8 h)"
    },
    {
      "id": 16,
      "src": "goldf",
      "front": "Antídoto de la metahemoglobinemia",
      "back": "Azul de metileno"
    },
    {
      "id": 17,
      "src": "aha_rcp",
      "front": "Adrenalina en paro cardíaco del adulto (AHA 2025)",
      "back": "1 mg cada 3–5 min, vía IV preferida sobre IO; en FV/TV sin pulso, después de que fallen las primeras descargas"
    },
    {
      "id": 18,
      "src": "aha_rcp",
      "front": "Ritmos desfibrilables",
      "back": "FV y TV sin pulso"
    },
    {
      "id": 19,
      "src": "aha_rcp",
      "front": "RCP de calidad en adulto: profundidad y frecuencia",
      "back": "5–6 cm · 100–120 compresiones/min"
    },
    {
      "id": 20,
      "src": "ga2len",
      "front": "Adrenalina en anafilaxia (adulto)",
      "back": "0.01 mg/kg IM (máx. 0.5 mg) en tercio medio del muslo; repetir cada 5–15 min si no responde"
    },
    {
      "id": 21,
      "src": "ssc26",
      "front": "Choque séptico: vasopresor de primera línea",
      "back": "Norepinefrina; PAM objetivo ≥ 65 mmHg (60–65 en ≥ 65 años, SSC 2026)"
    },
    {
      "id": 49,
      "src": "ssc26",
      "front": "Choque séptico en ≥ 65 años: PAM inicial objetivo (SSC 2026)",
      "back": "60–65 mmHg"
    }
  ]
});
