// Medicina Interna: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: mi-c01 (casos), mi-f01 (fichas), mi-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Medicina Interna",
  "prefijo": "mi",
  "paquete": "starter",
  "actualizado": "2026-11-15",
  "casos": [
    {
      "id": 1,
      "topic": "Cardiología · SCA",
      "difficulty": "Nivel 3",
      "src": "acc_acs",
      "vignette": "Hombre de 62 años con HTA y tabaquismo consulta por <span class='hy'>dolor retroesternal opresivo de 90 minutos</span> irradiado a mandíbula y diaforesis. PA 135/85 mmHg, FC 92 lpm, SatO2 96%. ECG muestra <span class='hy'>supradesnivel del ST de 3 mm en V1-V4</span>. El centro cuenta con sala de hemodinamia disponible en 45 minutos. ¿Cuál es la conducta de reperfusión prioritaria?",
      "options": [
        "Administrar alteplasa intravenosa inmediata antes del traslado a sala",
        "Iniciar heparina de bajo peso molecular y esperar troponinas seriadas a las 3 horas",
        "Intervención coronaria percutánea (ICP) primaria dentro de los próximos 90 minutos",
        "Realizar ecocardiograma transtorácico antes de definir terapia antitrombótica"
      ],
      "correct": 2,
      "whyCorrect": "En el IAMCEST, la ICP primaria es la reperfusión de elección cuando el dispositivo se activa dentro de los 90 minutos desde el primer contacto médico (120 minutos si el paciente viene trasladado de un centro sin hemodinamia). Aquí la sala está disponible en 45 minutos. No se retrasa por troponinas ni por ecocardiograma.",
      "pearl": "ICP primaria: ≤ 90 min del primer contacto médico al dispositivo; ≤ 120 min si hay traslado. Si el traslado a un centro con hemodinamia tardaría más de 120 minutos, fibrinólisis.",
      "trap": "Esperar troponinas cuando el ECG ya muestra supradesnivel del ST: el diagnóstico de IAMCEST no las necesita y la espera retrasa la reperfusión.",
      "cita": [
        {
          "donde": "IAMCEST, reperfusión: recomendación de ICP primaria (COR 1, LOE A)",
          "texto": "PPCI as soon as possible after the diagnosis of STEMI is made with first device activation within 90 minutes from FMC among walk-in and EMS-transported patients and 120 minutes for transfer patients from non–PCI-capable facilities."
        },
        {
          "donde": "IAMCEST, reperfusión: texto de apoyo",
          "texto": "PPCI is superior to fibrinolytic therapy, which is used when the patient is in a non–PCI-capable hospital and transfer time to a PCI-capable hospital is anticipated to be >120 minutes."
        }
      ],
      "verificado": "2026-11-15"
    },
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
      "whyCorrect": "Persiste la hipotensión tras la reanimación inicial con cristaloides: se inicia noradrenalina, el vasopresor de primera línea, y se titula a la PAM objetivo. En adultos de 65 años o más, como esta paciente, la SSC 2026 sugiere una PAM inicial de 60–65 mmHg.",
      "pearl": "SSC 2026: noradrenalina de primera línea; se puede iniciar por vía periférica sin esperar el catéter central. PAM inicial 65 mmHg (60–65 en ≥ 65 años).",
      "trap": "Retrasar la noradrenalina hasta tener un acceso venoso central: la SSC 2026 sugiere iniciarla por vía periférica.",
      "cita": [
        {
          "donde": "Recomendación 55 (condicional)",
          "texto": "For adults with septic shock, we “suggest” using norepinephrine as the first-line agent over vasopressin or angiotensin II."
        },
        {
          "donde": "Recomendación 14 (condicional)",
          "texto": "For adults with septic shock 65 years old or older, we “suggest” an initial MAP range of 60–65 mm Hg over higher ranges."
        },
        {
          "donde": "Recomendación 12 (condicional, certeza muy baja)",
          "texto": "In adults with septic shock, we “suggest” starting vasopressors peripherally to restore mean arterial pressure rather than delaying initiation until central venous access is secured."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 3,
      "topic": "Endocrinología · Crisis Hiperglucémica",
      "difficulty": "Nivel 3",
      "src": "ada_cri",
      "vignette": "Joven de 22 años con DM1 ingresa por vómitos y respiración de Kussmaul. Glucemia 480 mg/dL, pH arterial 7.14, HCO3 10 mEq/L, cetonuria +++, Na+ 132 mEq/L, <span class='hy'>K+ sérico 3.1 mEq/L</span>. ¿Qué acción es obligatoria ANTES de iniciar la infusión de insulina?",
      "options": [
        "Iniciar reposición de potasio IV junto con hidratación y diferir la insulina hasta K+ > 3.5 mmol/L",
        "Administrar bicarbonato de sodio IV para corregir el pH < 7.20",
        "Pasar bolo de insulina regular 0.15 U/kg IV de inmediato",
        "Corregir el sodio sérico con solución salina hipertónica al 3%"
      ],
      "correct": 0,
      "whyCorrect": "La insulina mete potasio a la célula. Con K+ < 3.5 mmol/L se repone potasio primero y se difiere la insulina hasta que el K+ supere 3.5, para evitar arritmias letales y debilidad de los músculos respiratorios.",
      "pearl": "CAD: K+ < 3.5 → reponer potasio y diferir la insulina. Bicarbonato solo si la acidosis es grave (pH < 7.0).",
      "trap": "Dar insulina de inmediato por la glucemia de 480, o bicarbonato por el pH de 7.14. Siempre mira el potasio primero.",
      "cita": [
        {
          "donde": "Tratamiento: potasio",
          "texto": "Low-normal or low potassium levels (<3.5 mmol/L) are present on admission in 5–10% of patients with DKA; in such cases, potassium replacement should begin at a rate of 10 mmol/h, and insulin therapy should be delayed until the potassium level increases to >3.5 mmol/L to avoid life-threatening arrhythmias and respiratory muscle weakness."
        },
        {
          "donde": "Tratamiento: bicarbonato",
          "texto": "bicarbonate administration should be considered if the acidosis is severe (i.e., pH <7.0)"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 7,
      "topic": "Neurología · ACV Isquémico",
      "difficulty": "Nivel 3",
      "src": "aha_acv",
      "vignette": "Hombre de 68 años llega a urgencias con <span class='hy'>hemiparesia derecha y afasia de inicio súbito hace 2 horas</span>. NIHSS 12. <span class='hy'>TAC cerebral simple sin hemorragia</span> ni signos de infarto extenso. PA 172/94 mmHg, glucemia 118 mg/dL, sin cirugías recientes ni anticoagulación. ¿Conducta inmediata?",
      "options": [
        "Administrar ácido acetilsalicílico 300 mg VO y observar evolución 24 horas",
        "Bajar la presión arterial a < 120/80 mmHg con nitroprusiato antes de trombolizar",
        "Iniciar heparina no fraccionada en infusión continua",
        "Trombólisis intravenosa con alteplasa (o tenecteplasa) de inmediato"
      ],
      "correct": 3,
      "whyCorrect": "Está dentro de la ventana terapéutica (< 4.5 horas), con TAC sin sangrado y PA < 185/110 mmHg. No tiene contraindicaciones, por lo que debe recibir trombólisis IV de inmediato.",
      "pearl": "Meta de PA ANTES de trombólisis en ACV isquémico: < 185/110 mmHg (luego mantener < 180/105). No bajar agresivamente si no se tromboliza.",
      "trap": "Dar aspirina o bajar demasiado la PA antes de decidir trombólisis compromete la penumbra isquémica.",
      "estado": "pendiente"
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
      "trap": "Confiarse porque el paciente está asintomático a las 3 horas: la necrosis hepática aparece entre las 24 y 72 horas.",
      "estado": "pendiente"
    },
    {
      "id": 9,
      "topic": "Infectología · Meningitis",
      "difficulty": "Nivel 3",
      "src": "who_men",
      "vignette": "Adulto de 35 años con fiebre, cefalea intensa, rigidez de nuca y petequias en tronco. Glasgow 13/15, sin déficit focal ni papiledema. ¿Cuál es la secuencia correcta?",
      "options": [
        "TAC cerebral primero; luego punción lumbar y al tener el resultado iniciar antibióticos",
        "Hemocultivos + dexametasona IV + ceftriaxona + vancomicina de inmediato, y realizar PL",
        "Solo aciclovir IV hasta confirmar etiología bacteriana en LCR",
        "Punción lumbar inmediata sin hemocultivos y observar respuesta a antipiréticos"
      ],
      "correct": 1,
      "whyCorrect": "Ante sospecha de meningitis bacteriana aguda sin indicación de TAC previa (no inmunosuprimido, sin focalización, sin convulsiones recientes ni papiledema), nunca se deben retrasar los antibióticos ni la dexametasona; se toman hemocultivos y se inicia terapia empírica + dexametasona de inmediato.",
      "pearl": "Dexametasona se administra ANTES o CON la primera dosis de antibiótico para reducir inflamación meníngea y secuelas neurológicas (sobre todo S. pneumoniae).",
      "trap": "Esperar a tener una TAC o el citoquímico del LCR antes de dar antibióticos aumenta exponencialmente la mortalidad.",
      "estado": "pendiente"
    },
    {
      "id": 13,
      "topic": "Nefrología · Hiperkalemia",
      "difficulty": "Nivel 3",
      "src": "ukka_k",
      "vignette": "Paciente con ERC estadio 5 llega por debilidad muscular. <span class='hy'>K+ sérico 7.1 mEq/L</span> y ECG muestra <span class='hy'>ondas T picudas y ensanchamiento del QRS</span>. ¿Cuál es el primer fármaco a administrar?",
      "options": [
        "Gluconato de calcio al 10 %, 30 mL IV en 10 minutos",
        "Resina de intercambio iónico (poliestireno sulfonato) vía oral",
        "Insulina 10 U con 25 g de glucosa IV como única medida",
        "Furosemida oral y restricción dietética de potasio"
      ],
      "correct": 0,
      "whyCorrect": "Con hiperkalemia y cambios en el ECG, lo primero es proteger el corazón con calcio IV: gluconato de calcio al 10 %, 30 mL en 10 minutos (o cloruro de calcio al 10 %, 10 mL en 5 minutos, en el contexto de reanimación). El calcio no baja el K+; después se redistribuye y se elimina.",
      "pearl": "UKKA: 1) proteger el corazón (calcio IV); 2) meter K+ a la célula (insulina 10 U con 25 g de glucosa si K+ ≥ 6.5; salbutamol nebulizado 10–20 mg como adyuvante); 3) sacar K+ del cuerpo. El resonio ya no se usa de rutina.",
      "trap": "Empezar por la insulina sin proteger el corazón cuando el ECG ya muestra QRS ancho.",
      "cita": [
        {
          "donde": "Guideline 16.2a (2C)",
          "texto": "We suggest that an equivalent dose (6.8 mmol) of IV calcium is given to patients with hyperkalaemia in the presence of ECG changes at a dose and rate of 30ml 10% Calcium Gluconate over 10 minutes OR 10ml 10% Calcium Chloride over 5 minutes guided by the clinical setting."
        },
        {
          "donde": "Guideline 16.3.1 (1B)",
          "texto": "We recommend that insulin-glucose (10 units soluble insulin in 25g glucose) by intravenous infusion is used to treat severe hyperkalaemia (K+ ≥ 6.5 mmol/l)."
        },
        {
          "donde": "Cation-exchange resin (2B)",
          "texto": "We recommend that calcium resonium should no longer be routinely used in the management of acute hyperkalaemia."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 14,
      "topic": "Anafilaxia · Vía Aérea",
      "difficulty": "Nivel 2",
      "src": "rcuk_ana",
      "vignette": "Mujer de 28 años desarrolla <span class='hy'>urticaria generalizada, estridor laríngeo, sibilancias y PA 80/50 mmHg</span> 10 minutos después de recibir penicilina IM. ¿Tratamiento de primera línea?",
      "options": [
        "Difenhidramina 50 mg IV + hidrocortisona 200 mg IV",
        "Adrenalina 1 mg IV en bolo rápido",
        "Salbutamol nebulizado seguido de observación",
        "Adrenalina 0.3–0.5 mg IM en cara anterolateral del muslo"
      ],
      "correct": 3,
      "whyCorrect": "La adrenalina intramuscular es el tratamiento de primera línea: en adultos, 500 microgramos IM (0.5 mL de adrenalina 1 mg/mL) en la cara anterolateral del muslo. Se repite a los 5 minutos si persisten los problemas de vía aérea, respiración o circulación.",
      "pearl": "Antihistamínicos y corticoides no son el tratamiento de primera línea. Si no mejora, repetir la adrenalina IM a los 5 minutos.",
      "trap": "Dar adrenalina 1 mg IV en bolo (dosis de paro) en un paciente con pulso causa crisis hipertensiva y arritmias letales.",
      "cita": [
        {
          "donde": "Dosis de adrenalina IM",
          "texto": "Adult and child > 12 years: 500 micrograms IM (0.5 mL of 1 mg/ml adrenaline)"
        },
        {
          "donde": "Resumen de recomendaciones",
          "texto": "Repeat IM adrenaline after 5 minutes if Airway/Breathing/Circulation problems persist."
        }
      ],
      "verificado": "2026-11-15",
      "estado": "pendiente"
    },
    {
      "id": 16,
      "topic": "Neumología · TEP",
      "difficulty": "Nivel 3",
      "src": "aha_tep",
      "vignette": "Mujer de 54 años en posoperatorio de reemplazo de cadera presenta <span class='hy'>disnea súbita, dolor pleurítico, FC 116 lpm, FR 26 rpm y SatO2 88%</span>. PA 115/75 mmHg. Probabilidad clínica por Wells: 7.5 puntos (alta). ¿Estudio diagnóstico de elección?",
      "options": [
        "Solicitar Dímero D y si es negativo descartar TEP",
        "Espirometría forzada con broncodilatador",
        "AngioTAC de tórax (protocolo TEP) e inicio empírico de anticoagulación si no hay contraindicación",
        "Radiografía de tórax normal descarta el diagnóstico"
      ],
      "correct": 2,
      "whyCorrect": "Con probabilidad clínica alta (Wells > 6 o > 4 en modelo dicotomizado), el Dímero D NO se solicita porque un resultado negativo no descarta con seguridad suficiente; se va directo a AngioTAC pulmonar y anticoagulación.",
      "pearl": "El D-dímero solo sirve para descartar TEP con probabilidad clínica baja o intermedia. Si se requiere anticoagulación parenteral inicial, HBPM antes que heparina no fraccionada.",
      "trap": "Pedir Dímero D en un paciente con Wells alto es un error clásico de examen que retrasa el diagnóstico.",
      "cita": [
        {
          "donde": "Diagnóstico: D-dímero (COR 2a, LOE B-R)",
          "texto": "Acute PE is unlikely in patients who meet all 3 of the following criteria: 1) D-dimer levels that do not exceed the threshold of normal; 2) a low or intermediate clinical pretest probability (<50%) of PE; and 3) are not anticoagulated at baseline."
        },
        {
          "donde": "Anticoagulación, recomendación 2 (COR 1, LOE B-R)",
          "texto": "In patients with acute PE in AHA/ACC Categories C1-E1 who require parenteral anticoagulant therapy initially, LMWH is recommended over UFH to reduce recurrent VTE and major bleeding."
        }
      ],
      "verificado": "2026-11-15",
      "estado": "pendiente"
    },
    {
      "id": 21,
      "topic": "Cardiología · Arritmias",
      "difficulty": "Nivel 2",
      "src": "acc_fa",
      "vignette": "Mujer de 70 años con palpitaciones de 6 horas. FC 168 lpm irregular, <span class='hy'>PA 76/48 mmHg</span>, diaforética y somnolienta. ECG: fibrilación auricular con respuesta ventricular rápida. ¿Conducta inmediata?",
      "options": [
        "Amiodarona IV en infusión y reevaluar en 24 horas",
        "Cardioversión eléctrica sincronizada",
        "Metoprolol IV en bolos para control de frecuencia",
        "Anticoagular 3 semanas y luego cardiovertir"
      ],
      "correct": 1,
      "whyCorrect": "Toda taquiarritmia con inestabilidad hemodinámica (hipotensión, alteración de conciencia, dolor torácico isquémico o insuficiencia cardíaca aguda) se trata con cardioversión eléctrica sincronizada inmediata, sin importar el tiempo de evolución.",
      "pearl": "Inestable = electricidad. Estable = fármacos (control de frecuencia o de ritmo).",
      "trap": "Dar betabloqueador IV a una paciente hipotensa: empeora el choque.",
      "estado": "pendiente"
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
      "trap": "Usar la midriasis o la FC como meta de atropinización: el objetivo es secar los pulmones.",
      "estado": "pendiente"
    },
    {
      "id": 26,
      "topic": "Nefrología · Hiponatremia",
      "difficulty": "Nivel 3",
      "src": "eu_hna",
      "vignette": "Mujer de 74 años con náuseas y somnolencia leve de 1 semana de evolución tras iniciar tiazida. <span class='hy'>Na⁺ 112 mEq/L</span>, sin convulsiones. Se inicia corrección. ¿Cuál es el límite de corrección en las primeras 24 h?",
      "options": [
        "Hasta normalizar el sodio (135 mEq/L) en 24 horas",
        "Al menos 20 mEq/L en 24 horas para evitar edema cerebral",
        "No importa la velocidad si la paciente está asintomática",
        "No más de 8–10 mEq/L en 24 horas"
      ],
      "correct": 3,
      "whyCorrect": "En la hiponatremia crónica (> 48 h), la corrección rápida causa el síndrome de desmielinización osmótica (mielinólisis pontina). El límite es de 8–10 mEq/L en 24 h; en pacientes de alto riesgo, 8 mEq/L.",
      "pearl": "Síntomas graves (convulsiones, coma): bolo de NaCl 3% para subir 4–6 mEq/L rápido, sin pasar el límite diario.",
      "trap": "Normalizar el sodio en un día porque la paciente se ve bien.",
      "estado": "pendiente"
    },
    {
      "id": "mi-c01",
      "topic": "Cardiología · Insuficiencia cardíaca",
      "difficulty": "Nivel 2",
      "src": "esc_ic26",
      "vignette": "Hombre de 68 años con disnea de esfuerzo progresiva y edema maleolar. NT-proBNP 1.200 pg/mL. El ecocardiograma muestra <span class='hy'>FEVI 45 %</span>. Según la guía ESC 2026 de insuficiencia cardíaca, ¿cómo se clasifica?",
      "options": [
        "Insuficiencia cardíaca con fracción de eyección levemente reducida",
        "Insuficiencia cardíaca con fracción de eyección reducida",
        "Insuficiencia cardíaca con fracción de eyección preservada",
        "No es insuficiencia cardíaca porque la FEVI es mayor de 40 %"
      ],
      "correct": 1,
      "whyCorrect": "La guía ESC 2026 eliminó la categoría de fracción de eyección levemente reducida (antes FEVI 41–49 %) y amplió la IC con fracción de eyección reducida hasta una FEVI menor de 50 %. Con síntomas y FEVI de 45 %, es IC con FE reducida.",
      "pearl": "ESC 2026: IC con FE reducida = FEVI < 50 %; IC con FE preservada = FEVI ≥ 50 % con evidencia objetiva de alteración estructural o funcional. «IC descompensada» reemplaza a «IC aguda».",
      "trap": "Responder «levemente reducida» con la clasificación de 2021: en la guía vigente esa categoría ya no existe.",
      "cita": [
        {
          "donde": "Tabla 4: nuevos conceptos",
          "texto": "HFrEF has been expanded to include LVEF up to 50% · HFmrEF has been removed · HFpEF includes LVEF from 50% and above · Decompensated HF replaces acute HF"
        },
        {
          "donde": "Definición y clasificación de la IC",
          "texto": "(i) HFrEF: characterized by LVEF <50% and symptoms and/or signs of HF. (ii) HFpEF: characterized by LVEF ≥50% and symptoms and/or signs of HF and objective evidence of cardiac structural and/or functional abnormalities consistent with the presence of left ventricular (LV) diastolic dysfunction/raised LV filling pressures"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c02",
      "topic": "Neumología · Neumonía adquirida en la comunidad",
      "difficulty": "Nivel 2",
      "src": "nice_nm",
      "vignette": "Mujer de 72 años con fiebre, tos productiva y crepitantes en la base derecha; la radiografía muestra consolidación. Está <span class='hy'>orientada</span>, FR 24 rpm, PA 128/76 mmHg, <span class='hy'>urea en sangre 9 mmol/L</span>. Según NICE, ¿cuál es su CURB65 y qué se considera para el lugar de atención?",
      "options": [
        "CURB65 de 1: alta con seguimiento en atención primaria",
        "CURB65 de 2: hospitalización, hospital en casa, sala virtual o unidad de atención el mismo día",
        "CURB65 de 3: hospitalización y valoración por cuidados críticos",
        "CURB65 de 0: no requiere antibiótico"
      ],
      "correct": 1,
      "whyCorrect": "Suma 1 punto por urea mayor de 7 mmol/L y 1 por edad de 65 años o más: CURB65 de 2, riesgo intermedio (mortalidad del 3 al 15 %). NICE propone considerar hospitalización u opciones supervisadas como hospital en casa, siempre con juicio clínico.",
      "pearl": "NICE: antibiótico por 5 días en todos los niveles de gravedad. Gravedad moderada: amoxicilina, más claritromicina si se sospechan atípicos. Gravedad alta en el hospital: considerar un corticoide de 4 a 7 días.",
      "trap": "Calcular el CURB65 sin la edad: tener 65 años o más ya suma 1 punto.",
      "cita": [
        {
          "donde": "Recuadro 2: CURB65",
          "texto": "1 point for each of the following prognostic features: confusion (abbreviated Mental Test score 8 or less, or new disorientation in person, place or time) · raised blood urea nitrogen (over 7 mmol/litre) · raised respiratory rate (30 breaths per minute or more) · low blood pressure (diastolic 60 mmHg or less, or systolic less than 90 mmHg) · age 65 years or more. 0 or 1: low risk (less than 3% mortality risk) · 2: intermediate risk (3% to 15% mortality risk) · 3 to 5: high risk (more than 15% mortality risk)."
        },
        {
          "donde": "Recomendación 1.2.9 [2025]",
          "texto": "Consider: inpatient care for adults with a CURB65 score of 3 or more, with referral to critical care services if appropriate · one of the following options for adults with a CURB65 score of 2: virtual ward or SDEC unit or hospital at home service or inpatient care · discharge home, with referral to primary care-led services and safety netting advice for adults with a CURB65 score of 0 or 1."
        },
        {
          "donde": "Tabla 1: antibióticos en neumonía adquirida en la comunidad",
          "texto": "Moderate-severity disease: first-line oral antibiotics Amoxicillin: 500 mg three times a day (higher doses can be used; see the BNF) for 5 days With (if atypical pathogens suspected) Clarithromycin: 500 mg twice a day for 5 days"
        },
        {
          "donde": "Recomendación 1.8.1 [2025]",
          "texto": "For adults with high-severity community-acquired pneumonia in hospital, consider a corticosteroid, in addition to antibiotics, for 4 to 7 days or until discharge, if sooner."
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "fichas": [
    {
      "id": "hy1",
      "title": "Sepsis y choque séptico",
      "badge": "Surviving Sepsis",
      "src": "ssc26",
      "accent": "#06b6d4",
      "thresholds": [
        {
          "label": "Cristaloides",
          "val": "≥ 30 mL/kg en 3 h (sugerencia)"
        },
        {
          "label": "PAM inicial",
          "val": "65 mmHg; 60–65 si ≥ 65 años"
        },
        {
          "label": "Vasopresor 1.ª línea",
          "val": "Noradrenalina"
        },
        {
          "label": "Vía",
          "val": "Periférica, sin esperar la central"
        }
      ],
      "redFlag": "Hipotensión que persiste tras los líquidos: iniciar noradrenalina ya, por vía periférica si no hay acceso central.",
      "trap": "Tomar los 30 mL/kg como obligatorios: en la SSC 2026 es una sugerencia condicional con certeza baja.",
      "cita": [
        {
          "donde": "Recomendación 10 (condicional, certeza baja)",
          "texto": "For adults with sepsis-induced hypoperfusion or septic shock, we “suggest” administering at least 30 mL/kg of IV crystalloid in the first 3 hr."
        },
        {
          "donde": "Recomendación 13 (fuerte, certeza moderada)",
          "texto": "For adults with septic shock, we “recommend” an initial MAP target of 65 mm Hg over higher MAP targets."
        },
        {
          "donde": "Recomendación 14 (condicional)",
          "texto": "For adults with septic shock 65 years old or older, we “suggest” an initial MAP range of 60–65 mm Hg over higher ranges."
        },
        {
          "donde": "Recomendación 55 (condicional)",
          "texto": "For adults with septic shock, we “suggest” using norepinephrine as the first-line agent over vasopressin or angiotensin II."
        },
        {
          "donde": "Recomendación 12 (condicional, certeza muy baja)",
          "texto": "In adults with septic shock, we “suggest” starting vasopressors peripherally to restore mean arterial pressure rather than delaying initiation until central venous access is secured."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "hy2",
      "title": "Cetoacidosis diabética (CAD)",
      "badge": "Emergencia Endocrina",
      "src": "ada_cri",
      "accent": "#f59e0b",
      "thresholds": [
        {
          "label": "Glucosa",
          "val": "≥ 200 mg/dL o diabetes conocida"
        },
        {
          "label": "Cetosis",
          "val": "β-hidroxibutirato ≥ 3.0 mmol/L"
        },
        {
          "label": "Acidosis",
          "val": "pH < 7.3 y/o HCO₃ < 18"
        },
        {
          "label": "Regla del K+",
          "val": "< 3.5: reponer K+ y diferir la insulina"
        },
        {
          "label": "Bicarbonato",
          "val": "Solo si pH < 7.0"
        }
      ],
      "redFlag": "K+ < 3.5 mmol/L: reponer potasio antes de la insulina; si no, arritmias y debilidad respiratoria.",
      "trap": "Suspender la insulina cuando la glucosa baja de 250 mg/dL: se agrega dextrosa al 5 o 10 % y se sigue con la insulina.",
      "cita": [
        {
          "donde": "Criterios diagnósticos de CAD (figura)",
          "texto": "Glucose ≥200 mg/dL (11.1 mmol/L) OR prior history of diabetes · β-Hydroxybutyrate concentration ≥3.0 mmol/L OR urine ketone strip 2+ or greater · pH <7.3 and/or bicarbonate concentration <18 mmol/L"
        },
        {
          "donde": "Tratamiento: potasio",
          "texto": "Low-normal or low potassium levels (<3.5 mmol/L) are present on admission in 5–10% of patients with DKA; in such cases, potassium replacement should begin at a rate of 10 mmol/h, and insulin therapy should be delayed until the potassium level increases to >3.5 mmol/L to avoid life-threatening arrhythmias and respiratory muscle weakness."
        },
        {
          "donde": "Tratamiento: bicarbonato",
          "texto": "bicarbonate administration should be considered if the acidosis is severe (i.e., pH <7.0)"
        },
        {
          "donde": "Algoritmo de manejo: líquidos IV (figura)",
          "texto": "When glucose reaches <250 mg/dL, add 5% or 10% dextrose to the 0.9% NaCl/crystalloid"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "hy4",
      "title": "Hiperkalemia grave",
      "badge": "Electrocardiograma",
      "src": "ukka_k",
      "accent": "#10b981",
      "thresholds": [
        {
          "label": "1.° Proteger el corazón",
          "val": "Gluconato de Ca 10 %, 30 mL en 10 min"
        },
        {
          "label": "2.° Meter K+ a la célula",
          "val": "Insulina 10 U + glucosa 25 g IV (K+ ≥ 6.5)"
        },
        {
          "label": "Adyuvante",
          "val": "Salbutamol nebulizado 10–20 mg"
        },
        {
          "label": "3.° Sacar K+",
          "val": "Resonio ya no de rutina"
        }
      ],
      "redFlag": "El salbutamol nunca va solo en la hiperkalemia grave: siempre acompaña a la insulina-glucosa.",
      "trap": "Creer que el calcio baja el K+: solo protege el corazón; después hay que redistribuir y eliminar.",
      "cita": [
        {
          "donde": "Guideline 16.2a (2C)",
          "texto": "We suggest that an equivalent dose (6.8 mmol) of IV calcium is given to patients with hyperkalaemia in the presence of ECG changes at a dose and rate of 30ml 10% Calcium Gluconate over 10 minutes OR 10ml 10% Calcium Chloride over 5 minutes guided by the clinical setting."
        },
        {
          "donde": "Guideline 16.3.1 (1B)",
          "texto": "We recommend that insulin-glucose (10 units soluble insulin in 25g glucose) by intravenous infusion is used to treat severe hyperkalaemia (K+ ≥ 6.5 mmol/l)."
        },
        {
          "donde": "Guideline 16.4.1 (1B)",
          "texto": "We recommend nebulised salbutamol 10-20 mg is used as adjuvant therapy for severe (K+ ≥ 6.5 mmol/L) hyperkalaemia."
        },
        {
          "donde": "Guideline 16.4.3 (1A)",
          "texto": "We recommend that salbutamol is not used as monotherapy in the treatment of severe hyperkalaemia."
        },
        {
          "donde": "Cation-exchange resin (2B)",
          "texto": "We recommend that calcium resonium should no longer be routinely used in the management of acute hyperkalaemia."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f01",
      "title": "Insuficiencia cardíaca: clasificación ESC 2026",
      "badge": "ESC 2026",
      "src": "esc_ic26",
      "thresholds": [
        {
          "label": "FE reducida",
          "val": "FEVI < 50 % + síntomas o signos"
        },
        {
          "label": "FE preservada",
          "val": "FEVI ≥ 50 % + alteración estructural o funcional"
        },
        {
          "label": "FE levemente reducida",
          "val": "Eliminada en 2026"
        },
        {
          "label": "NT-proBNP: IC probable (ambulatorio)",
          "val": "≥ 125 (< 50 años) · ≥ 250 (50–75) · ≥ 500 (> 75) pg/mL"
        },
        {
          "label": "NT-proBNP muy alto",
          "val": "> 5.000 pg/mL: suele indicarse ingreso"
        }
      ],
      "redFlag": "NT-proBNP > 5.000 pg/mL en IC descompensada: riesgo muy alto; por lo general se recomienda hospitalizar.",
      "trap": "Usar el umbral único de 125 pg/mL en ancianos: más del 75 % de las personas sanas mayores de 80 años lo superan.",
      "cita": [
        {
          "donde": "Tabla 4: nuevos conceptos",
          "texto": "HFrEF has been expanded to include LVEF up to 50% · HFmrEF has been removed · HFpEF includes LVEF from 50% and above · Decompensated HF replaces acute HF"
        },
        {
          "donde": "Definición y clasificación de la IC",
          "texto": "(i) HFrEF: characterized by LVEF <50% and symptoms and/or signs of HF. (ii) HFpEF: characterized by LVEF ≥50% and symptoms and/or signs of HF and objective evidence of cardiac structural and/or functional abnormalities consistent with the presence of left ventricular (LV) diastolic dysfunction/raised LV filling pressures"
        },
        {
          "donde": "Diagnóstico: péptidos natriuréticos",
          "texto": "The suggested age-adjusted NT-proBNP levels, above which HF is ‘likely’ in the outpatient setting, were ≥125 pg/mL for those aged <50 years, ≥250 pg/mL between 50 and 75 years, and ≥500 pg/mL over 75 years."
        },
        {
          "donde": "Diagnóstico: péptidos natriuréticos",
          "texto": "More than 75% of a healthy population >80 years were found to exceed the 125 pg/mL NT-proBNP threshold."
        },
        {
          "donde": "IC descompensada: diagnóstico",
          "texto": "NT-pro-BNP >5000 pg/mL indicates very high risk, and admission is generally recommended."
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "tarjetas": [
    {
      "id": 1,
      "src": "aha_acv",
      "front": "Meta de PA antes de trombolizar un ACV isquémico",
      "back": "< 185/110 mmHg",
      "estado": "pendiente"
    },
    {
      "id": 2,
      "src": "aha_acv",
      "front": "Ventana para alteplasa IV en ACV isquémico",
      "back": "Hasta 4.5 h desde la última vez que se vio bien al paciente",
      "estado": "pendiente"
    },
    {
      "id": 3,
      "src": "ada_soc",
      "front": "Glucosa en ayunas diagnóstica de diabetes",
      "back": "≥ 126 mg/dL (confirmar en 2 ocasiones)",
      "estado": "pendiente"
    },
    {
      "id": 4,
      "src": "ada_soc",
      "front": "HbA1c diagnóstica de diabetes",
      "back": "≥ 6.5 %",
      "estado": "pendiente"
    },
    {
      "id": 5,
      "src": "eu_hna",
      "front": "Velocidad máxima de corrección de Na⁺ en hiponatremia crónica",
      "back": "8–10 mEq/L en 24 h (riesgo de desmielinización osmótica)",
      "estado": "pendiente"
    },
    {
      "id": 6,
      "src": "atls11",
      "front": "Tríada de Beck",
      "back": "Hipotensión + ingurgitación yugular + ruidos cardíacos apagados → taponamiento",
      "estado": "pendiente"
    },
    {
      "id": 7,
      "src": "acc_fa",
      "front": "FA con inestabilidad hemodinámica",
      "back": "Cardioversión eléctrica sincronizada",
      "estado": "pendiente"
    },
    {
      "id": 8,
      "src": "nice_fa",
      "front": "Umbral para anticoagular en FA (NICE)",
      "back": "Ofrecer un anticoagulante oral directo con CHA₂DS₂-VASc ≥ 2; considerarlo en hombres con 1. Siempre valorando el riesgo de sangrado.",
      "cita": [
        {
          "donde": "Recomendaciones 1.6.3 y 1.6.4 [2021]",
          "texto": "Offer anticoagulation with a direct‑acting oral anticoagulant to people with atrial fibrillation and a CHA2DS2‑VASc score of 2 or above, taking into account the risk of bleeding. · Consider anticoagulation with a direct‑acting oral anticoagulant for men with atrial fibrillation and a CHA2DS2‑VASc score of 1, taking into account the risk of bleeding."
        }
      ],
      "verificado": "2026-11-15",
      "estado": "pendiente"
    },
    {
      "id": 9,
      "src": "nice_nm",
      "front": "CURB-65: riesgo y conducta",
      "back": "0–1: riesgo bajo (< 3 %), alta con seguimiento · 2: intermedio (3–15 %), considerar hospital, hospital en casa o atención el mismo día · 3–5: alto (> 15 %), hospitalizar y valorar cuidados críticos",
      "cita": [
        {
          "donde": "Recuadro 2: CURB65",
          "texto": "1 point for each of the following prognostic features: confusion (abbreviated Mental Test score 8 or less, or new disorientation in person, place or time) · raised blood urea nitrogen (over 7 mmol/litre) · raised respiratory rate (30 breaths per minute or more) · low blood pressure (diastolic 60 mmHg or less, or systolic less than 90 mmHg) · age 65 years or more. 0 or 1: low risk (less than 3% mortality risk) · 2: intermediate risk (3% to 15% mortality risk) · 3 to 5: high risk (more than 15% mortality risk)."
        },
        {
          "donde": "Recomendación 1.2.9 [2025]",
          "texto": "Consider: inpatient care for adults with a CURB65 score of 3 or more, with referral to critical care services if appropriate · one of the following options for adults with a CURB65 score of 2: virtual ward or SDEC unit or hospital at home service or inpatient care · discharge home, with referral to primary care-led services and safety netting advice for adults with a CURB65 score of 0 or 1."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 10,
      "src": "ukka_k",
      "front": "Primer paso en hiperkalemia con cambios en ECG",
      "back": "Gluconato de calcio al 10 %, 30 mL IV en 10 min (protege el corazón, no baja el K⁺)",
      "cita": [
        {
          "donde": "Guideline 16.2a (2C)",
          "texto": "We suggest that an equivalent dose (6.8 mmol) of IV calcium is given to patients with hyperkalaemia in the presence of ECG changes at a dose and rate of 30ml 10% Calcium Gluconate over 10 minutes OR 10ml 10% Calcium Chloride over 5 minutes guided by the clinical setting."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 11,
      "src": "ada_soc",
      "front": "Hipoglucemia en paciente consciente",
      "back": "15 g de carbohidrato oral, glucemia de control a los 15 min",
      "estado": "pendiente"
    },
    {
      "id": 12,
      "src": "goldf",
      "front": "Antídoto de opioides",
      "back": "Naloxona",
      "estado": "pendiente"
    },
    {
      "id": 13,
      "src": "goldf",
      "front": "Antídoto de benzodiacepinas",
      "back": "Flumazenil (cuidado: convulsiones en consumidores crónicos)",
      "estado": "pendiente"
    },
    {
      "id": 14,
      "src": "goldf",
      "front": "Antídoto de organofosforados",
      "back": "Atropina (meta: secar secreciones) + pralidoxima",
      "estado": "pendiente"
    },
    {
      "id": 15,
      "src": "apap",
      "front": "Antídoto del paracetamol",
      "back": "N-acetilcisteína (ideal < 8 h)",
      "estado": "pendiente"
    },
    {
      "id": 16,
      "src": "goldf",
      "front": "Antídoto de la metahemoglobinemia",
      "back": "Azul de metileno",
      "estado": "pendiente"
    },
    {
      "id": 17,
      "src": "aha_rcp",
      "front": "Adrenalina en paro cardíaco del adulto (AHA 2025)",
      "back": "1 mg cada 3–5 min, vía IV preferida sobre IO; en FV/TV sin pulso, después de que fallen las primeras descargas",
      "estado": "pendiente"
    },
    {
      "id": 18,
      "src": "aha_rcp",
      "front": "Ritmos desfibrilables",
      "back": "FV y TV sin pulso",
      "estado": "pendiente"
    },
    {
      "id": 19,
      "src": "aha_rcp",
      "front": "RCP de calidad en adulto: profundidad y frecuencia",
      "back": "5–6 cm · 100–120 compresiones/min",
      "estado": "pendiente"
    },
    {
      "id": 20,
      "src": "rcuk_ana",
      "front": "Adrenalina en anafilaxia (adulto)",
      "back": "500 µg IM (0.5 mL de adrenalina 1 mg/mL) en la cara anterolateral del muslo; repetir a los 5 min si persisten problemas de vía aérea, respiración o circulación",
      "cita": [
        {
          "donde": "Dosis de adrenalina IM",
          "texto": "Adult and child > 12 years: 500 micrograms IM (0.5 mL of 1 mg/ml adrenaline)"
        },
        {
          "donde": "Resumen de recomendaciones",
          "texto": "Repeat IM adrenaline after 5 minutes if Airway/Breathing/Circulation problems persist."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 21,
      "src": "ssc26",
      "front": "Choque séptico: vasopresor de primera línea",
      "back": "Noradrenalina; PAM inicial 65 mmHg (60–65 en ≥ 65 años)",
      "cita": [
        {
          "donde": "Recomendación 55 (condicional)",
          "texto": "For adults with septic shock, we “suggest” using norepinephrine as the first-line agent over vasopressin or angiotensin II."
        },
        {
          "donde": "Recomendación 13 (fuerte, certeza moderada)",
          "texto": "For adults with septic shock, we “recommend” an initial MAP target of 65 mm Hg over higher MAP targets."
        },
        {
          "donde": "Recomendación 14 (condicional)",
          "texto": "For adults with septic shock 65 years old or older, we “suggest” an initial MAP range of 60–65 mm Hg over higher ranges."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 47,
      "src": "aha_acv",
      "front": "Tenecteplasa en ACV isquémico: dosis",
      "back": "0.25 mg/kg IV en bolo (máx. 25 mg), alternativa a la alteplasa en < 4.5 h",
      "estado": "pendiente"
    },
    {
      "id": 48,
      "src": "aha_acv",
      "front": "PA durante y 24 h después de trombolizar un ACV",
      "back": "< 180/105 mmHg (bajar < 140 de sistólica no aporta beneficio)",
      "estado": "pendiente"
    },
    {
      "id": 49,
      "src": "ssc26",
      "front": "Choque séptico en ≥ 65 años: PAM inicial objetivo (SSC 2026)",
      "back": "60–65 mmHg",
      "cita": [
        {
          "donde": "Recomendación 14 (condicional)",
          "texto": "For adults with septic shock 65 years old or older, we “suggest” an initial MAP range of 60–65 mm Hg over higher ranges."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 53,
      "src": "aha_tep",
      "front": "TEP: heparina parenteral inicial (AHA/ACC 2026)",
      "back": "HBPM recomendada sobre heparina no fraccionada (categorías C1–E1): menos recurrencia y menos sangrado mayor",
      "cita": [
        {
          "donde": "Anticoagulación, recomendación 2 (COR 1, LOE B-R)",
          "texto": "In patients with acute PE in AHA/ACC Categories C1-E1 who require parenteral anticoagulant therapy initially, LMWH is recommended over UFH to reduce recurrent VTE and major bleeding."
        }
      ],
      "verificado": "2026-11-15",
      "estado": "pendiente"
    }
  ],
  "revision": "verificada"
});
