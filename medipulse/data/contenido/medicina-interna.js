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
        "Reponer potasio IV con la hidratación; insulina cuando el K+ pase de 3.5 mmol/L",
        "Bicarbonato de sodio IV para corregir el pH menor de 7.20 antes de la insulina",
        "Bolo de insulina regular 0.15 U/kg IV de inmediato y luego infusión continua",
        "Corregir el sodio sérico con solución salina hipertónica al 3 % en la primera hora"
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
        "Dímero D y, si es negativo, descartar el TEP sin hacer más estudios de imagen",
        "Espirometría con broncodilatador para descartar broncoespasmo",
        "AngioTAC de tórax y anticoagulación empírica si no hay contraindicación",
        "Radiografía de tórax: si es normal, se descarta el diagnóstico"
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
        "Naloxona IV en bolos hasta revertir la depresión respiratoria",
        "Atropina IV en dosis crecientes hasta secar las secreciones",
        "Flumazenil IV para revertir la sedación",
        "N-acetilcisteína IV en el esquema de 21 horas"
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
        "CURB65 de 1: alta con seguimiento en atención primaria en 48 horas",
        "CURB65 de 2: atención en el hospital o en casa con supervisión hospitalaria",
        "CURB65 de 3: hospitalización inmediata y valoración temprana por cuidados críticos",
        "CURB65 de 0: no requiere antibiótico, solo manejo sintomático en casa"
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
    },
    {
      "id": "mi-c03",
      "topic": "Neumología · NAC ambulatoria",
      "difficulty": "Nivel 1",
      "src": "acin_nac26",
      "vignette": "Hombre de 42 años, sin comorbilidades ni antibióticos en los últimos 90 días, con 3 días de tos productiva y fiebre. FC 104 lpm, <span class='hy'>FR 22 rpm</span>, PA 124/78 mmHg, <span class='hy'>SatO₂ 95 %</span> al aire ambiente, orientado. Crepitantes basales derechos y consolidación en la radiografía. <span class='hy'>CRB-65: 0</span>. ¿Conducta?",
      "options": [
        "Hospitalizar y dar ceftriaxona intravenosa por 7 días",
        "Levofloxacino 750 mg al día por vía oral durante 10 días",
        "Amoxicilina 1 g cada 8 horas oral, ambulatorio, por 5 días",
        "Ceftriaxona más claritromicina en sala general de hospitalización"
      ],
      "correct": 2,
      "whyCorrect": "Con CRB-65 de 0 a 1 el riesgo de muerte es bajo y se trata en casa, salvo hipoxemia o intolerancia a la vía oral. Sin factores de riesgo para SAMR ni Pseudomonas, la primera línea es oral: amoxicilina 1 g cada 8 horas (alternativas: claritromicina o doxiciclina). En la NAC no grave la duración es de 5 días en total, según la estabilidad clínica.",
      "pearl": "La saturación < 90 % es criterio de hospitalización aunque el CURB-65 sea bajo.",
      "trap": "Elegir una quinolona «por cobertura»: la guía colombiana pide evitarlas en NAC por resistencia y efectos adversos graves.",
      "cita": [
        {
          "donde": "Anexo, Tarjeta 1: CURB-65 y lugar de atención",
          "texto": "0-1 Bajo (< 1.5%) Ambulatorio (Considerar ingreso si hay hipoxemia o intolerancia oral) 2 Intermedio (9.2%) Hospitalización (Sala General o Estancia Corta) 3-5 Alto (22%) Hospitalización Urgente (Evaluar criterios de UCI)"
        },
        {
          "donde": "Anexo, Tarjeta 1: nota",
          "texto": "La saturación de oxígeno < 90% es criterio de hospitalización independiente del CURB-65."
        },
        {
          "donde": "Recomendación 11 (fuerte, moderada calidad)",
          "texto": "Recomendamos el uso de antibióticos orales como amoxicilina 1 g cada 8 horas, claritromicina 500 mg cada 12 horas (existen presentaciones que ofrecen la posibilidad de administrar 1g en una dosis única diaria), doxiciclina 100 mg cada 12 horas en pacientes adultos con diagnóstico de NAC que requieren manejo ambulatorio sin factores de riesgo para SAMR o P. aeruginosa."
        },
        {
          "donde": "Recomendación 17.1 (fuerte, moderada calidad)",
          "texto": "En pacientes adultos con diagnóstico de NAC no grave, recomendamos una duración de 5 días en total, teniendo en cuenta como criterio para la suspensión del tratamiento la estabilidad clínica."
        },
        {
          "donde": "Punto de buena práctica (pregunta 12)",
          "texto": "Evitar el uso de quinolonas en pacientes adultos con diagnóstico de NAC, debido a su impacto en la resistencia antimicrobiana y efectos adversos graves."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c04",
      "topic": "Neumología · NAC hospitalizada",
      "difficulty": "Nivel 2",
      "src": "acin_nac26",
      "vignette": "Mujer de 74 años con hipertensión, 4 días de fiebre y tos, ahora <span class='hy'>confusa</span>. FR 24 rpm, PA 112/70 mmHg, SatO₂ 93 %. Infiltrado en el lóbulo inferior izquierdo. <span class='hy'>CURB-65: 2</span>. Sin hospitalizaciones, antibióticos recientes ni cultivos previos con SAMR o Pseudomonas, y sin criterios de UCI. ¿Tratamiento empírico?",
      "options": [
        "Piperacilina-tazobactam más vancomicina por posible germen resistente",
        "Ceftriaxona sola, ajustada luego según cultivos",
        "Moxifloxacino intravenoso como monoterapia de amplio espectro",
        "Amoxicilina oral y control en 48 horas en casa"
      ],
      "correct": 1,
      "whyCorrect": "CURB-65 de 2 indica hospitalización en sala general. Sin gravedad y sin factores de riesgo para SAMR o P. aeruginosa, la guía recomienda un betalactámico en monoterapia (ampicilina/sulbactam o ceftriaxona) y ajustar con los resultados microbiológicos. El macrólido se agrega si una prueba molecular identifica un germen atípico o si la evolución es tórpida a las 48–72 horas.",
      "pearl": "En sala general sin gravedad, el macrólido no va de rutina: se agrega ante evolución tórpida a las 48–72 horas o un atípico identificado.",
      "trap": "Cubrir SAMR y Pseudomonas «por si acaso»: sin factores de riesgo no se da cobertura empírica para SAMR.",
      "cita": [
        {
          "donde": "Anexo, Tarjeta 1: CURB-65 y lugar de atención",
          "texto": "0-1 Bajo (< 1.5%) Ambulatorio (Considerar ingreso si hay hipoxemia o intolerancia oral) 2 Intermedio (9.2%) Hospitalización (Sala General o Estancia Corta) 3-5 Alto (22%) Hospitalización Urgente (Evaluar criterios de UCI)"
        },
        {
          "donde": "Recomendación 12.1 (fuerte, moderada calidad)",
          "texto": "Recomendamos la terapia empírica con un betalactámico como ampicilina/sulbactam o ceftriaxona en monoterapia en pacientes adultos con diagnóstico de NAC que requieren manejo intrahospitalario sin criterios de gravedad y sin factores de riesgo para SAMR o P. aeruginosa"
        },
        {
          "donde": "Punto de buena práctica (pregunta 12)",
          "texto": "En los pacientes con evolución clínica tórpida a las 48 a 72 horas de iniciado el tratamiento antibiótico se recomienda adicionar terapia empírica con macrólido"
        },
        {
          "donde": "Punto de buena práctica (pregunta 14)",
          "texto": "No dar cubrimiento de manera empírica para SAMR en pacientes sin factores de riesgo."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c05",
      "topic": "Neumología · NAC grave",
      "difficulty": "Nivel 3",
      "src": "acin_nac26",
      "vignette": "Hombre de 63 años con NAC: <span class='hy'>FR 34 rpm</span>, <span class='hy'>PaO₂/FiO₂ 220</span>, <span class='hy'>infiltrados multilobares</span>, confusión y BUN 28 mg/dL. PA 100/62 mmHg sin vasopresores. Sin factores de riesgo para SAMR ni Pseudomonas. Ingresa a la UCI. ¿Esquema antibiótico empírico?",
      "options": [
        "Ceftriaxona en monoterapia ajustada a la gravedad",
        "Levofloxacino en monoterapia a dosis de 750 mg al día",
        "Meropenem más vancomicina para cubrir gérmenes resistentes en UCI",
        "Ceftriaxona (o ampicilina/sulbactam) más claritromicina"
      ],
      "correct": 3,
      "whyCorrect": "Tiene 5 criterios menores de gravedad (FR ≥ 30, PaO₂/FiO₂ ≤ 250, infiltrados multilobares, confusión y BUN ≥ 20): con ≥ 3 menores se indica UCI. En NAC grave sin riesgo de SAMR o Pseudomonas, la guía recomienda un betalactámico más claritromicina, con hemocultivos tomados antes del antibiótico. En NAC grave se sugieren corticosteroides (hidrocortisona 200 mg IV al día por 7 días).",
      "pearl": "Hidrocortisona en NAC grave: 200 mg IV al día por 7 días; se puede suspender el día 7 sin retiro progresivo.",
      "trap": "Usar corticoides si la NAC es por influenza: ahí la guía sugiere no usarlos.",
      "cita": [
        {
          "donde": "Anexo, Tarjeta 2: ingreso a UCI (IDSA/ATS modificados)",
          "texto": "Se recomienda ingreso a UCI si cumple 1 Criterio Mayor o ≥ 3 Criterios Menores."
        },
        {
          "donde": "Anexo, Tarjeta 2: criterios menores",
          "texto": "Frecuencia respiratoria ≥ 30 rpm PaO2/FiO2 ≤ 250 Infiltrados multilobares Confusión / Desorientación Uremia (BUN ≥ 20 mg/dL)"
        },
        {
          "donde": "Recomendación 13 (fuerte, moderada calidad)",
          "texto": "Recomendamos la terapia con un betalactámico como ampicilina/sulbactam o ceftriaxona en combinación con claritromicina en adultos con diagnóstico de NAC grave."
        },
        {
          "donde": "Recomendación 5.3 (fuerte, baja calidad)",
          "texto": "Recomendamos en pacientes con diagnóstico de NAC grave tomar hemocultivos previos al inicio de antibióticos."
        },
        {
          "donde": "Recomendación 18.2 (débil, moderada calidad)",
          "texto": "En pacientes adultos con diagnóstico de NAC grave sugerimos la utilización de corticosteroides."
        },
        {
          "donde": "Punto de buena práctica (pregunta 18)",
          "texto": "En pacientes adultos con diagnóstico de NAC grave puede utilizarse hidrocortisona 200 mg intravenosos al día por un lapso de siete días."
        },
        {
          "donde": "Recomendación 18.4 (débil, baja calidad)",
          "texto": "Sugerimos la no utilización de corticosteroides en pacientes adultos con diagnóstico de NAC por influenza."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c06",
      "topic": "Neumología · NAC e influenza",
      "difficulty": "Nivel 2",
      "src": "acin_nac26",
      "vignette": "Mujer de 58 años hospitalizada por NAC no grave, con ceftriaxona. Lleva <span class='hy'>5 días de síntomas</span> y la PCR para <span class='hy'>influenza A es positiva</span>. Está estable. ¿Qué conducta agregas?",
      "options": [
        "Iniciar oseltamivir aunque hayan pasado más de 48 horas de síntomas",
        "No dar antiviral: ya pasó la ventana de 48 horas",
        "Suspender la ceftriaxona porque la causa es viral",
        "Agregar metilprednisolona para reducir la inflamación"
      ],
      "correct": 0,
      "whyCorrect": "En NAC con influenza confirmada, la guía recomienda antiviral (oseltamivir) independientemente del tiempo de evolución. En el paciente hospitalizado con virus positivo se mantienen los antibióticos empíricos por la alta probabilidad de coinfección bacteriana.",
      "pearl": "En NAC por influenza no se sugieren corticosteroides.",
      "trap": "Aplicar la «regla de las 48 horas» y no dar oseltamivir en la neumonía con influenza.",
      "cita": [
        {
          "donde": "Recomendación 20 (fuerte, moderada calidad)",
          "texto": "Recomendamos iniciar tratamiento antiviral, como oseltamivir, en pacientes adultos con diagnóstico de NAC con prueba positiva para influenza, independientemente del tiempo de evolución."
        },
        {
          "donde": "Recomendación 21.3 (débil, muy baja calidad)",
          "texto": "Sugerimos prescribir antibióticos empíricos en adultos hospitalizados con diagnóstico de NAC grave y no grave, y prueba positiva para virus respiratorio (excepto COVID-19), ante la alta probabilidad de coinfección bacteriana-viral."
        },
        {
          "donde": "Recomendación 18.4 (débil, baja calidad)",
          "texto": "Sugerimos la no utilización de corticosteroides en pacientes adultos con diagnóstico de NAC por influenza."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c07",
      "qtype": "directa",
      "topic": "Neumología · NAC: duración del antibiótico",
      "difficulty": "Nivel 1",
      "src": "acin_nac26",
      "vignette": "Según la guía colombiana de NAC 2026, ¿cuánto debe durar el antibiótico en un adulto con NAC no grave que mejora y está clínicamente estable?",
      "options": [
        "3 días en total",
        "7 días en total",
        "10 días en total",
        "5 días en total"
      ],
      "correct": 3,
      "whyCorrect": "En NAC no grave se recomiendan 5 días en total, con la estabilidad clínica como criterio para suspender. En la NAC grave, la duración depende de la evolución, la microbiología y los biomarcadores.",
      "pearl": "La procalcitonina sola no decide el inicio del antibiótico, pero con la evolución clínica ayuda a acortarlo.",
      "trap": "Completar 7 a 10 días «por costumbre» en un paciente estable.",
      "cita": [
        {
          "donde": "Recomendación 17.1 (fuerte, moderada calidad)",
          "texto": "En pacientes adultos con diagnóstico de NAC no grave, recomendamos una duración de 5 días en total, teniendo en cuenta como criterio para la suspensión del tratamiento la estabilidad clínica."
        },
        {
          "donde": "Recomendaciones 9.1 y 9.2",
          "texto": "Recomendamos no usar procalcitonina sérica como criterio aislado para decidir el inicio de antibióticos en pacientes adultos con diagnóstico de NAC. · Sugerimos usar procalcitonina y la evolución clínica para reducir la duración del tratamiento antibiótico en pacientes adultos con diagnóstico de NAC."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c08",
      "qtype": "directa",
      "topic": "Neumología · NAC con derrame",
      "difficulty": "Nivel 2",
      "src": "acin_nac26",
      "vignette": "En un adulto con NAC y derrame pleural, ¿a partir de qué tamaño en imágenes se sugiere toracocentesis diagnóstica temprana?",
      "options": [
        "≥ 5 mm",
        "≥ 10 mm",
        "≥ 20 mm",
        "Solo si ocupa más de un tercio del hemitórax"
      ],
      "correct": 1,
      "whyCorrect": "Con derrame moderado o grande (≥ 10 mm en imágenes) se sugiere toracocentesis diagnóstica temprana para clasificarlo en no complicado o complicado/empiema y decidir el drenaje a tiempo.",
      "pearl": "La TC de tórax no se usa de rutina para confirmar la NAC; se reserva para casos con radiografía negativa o dudosa y alta sospecha.",
      "trap": "Esperar a que el derrame crezca o a que falle el antibiótico para puncionar.",
      "cita": [
        {
          "donde": "Recomendación 8 (débil, baja calidad)",
          "texto": "Sugerimos realizar toracocentesis diagnostica temprana en pacientes adultos con diagnóstico de NAC con derrame moderado/grande ≥10 mm en imágenes con el fin de clasificar el derrame en no complicado vs. complicado/empiema y decidir drenaje oportuno."
        },
        {
          "donde": "Recomendación 3.1 (fuerte, moderada calidad)",
          "texto": "Recomendamos no usar la tomografía computarizada de tórax de rutina para confirmar el diagnóstico de NAC."
        },
        {
          "donde": "Recomendación 3.2 (débil, baja calidad)",
          "texto": "Sugerimos reservar el uso de la TC para situaciones específicas, cuando la radiografía es negativa o equívoca, pero persiste una alta sospecha clínica de NAC"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c09",
      "qtype": "critica",
      "topic": "Nefrología · Lectura crítica: CONFIDENCE",
      "difficulty": "Nivel 3",
      "src": "confidence",
      "vignette": "El ensayo CONFIDENCE aleatorizó (1:1:1) a adultos con ERC, albuminuria y diabetes tipo 2, ya con IECA o ARA II, a finerenona, empagliflozina o ambas. El desenlace primario fue el <span class='hy'>cambio de la relación albúmina/creatinina urinaria a 180 días</span>. La combinación la redujo 29 % más que la finerenona y 32 % más que la empagliflozina (p menor de 0,001). ¿Cuál es la principal limitación para la práctica?",
      "options": [
        "No fue aleatorizado, así que hay riesgo de confusión",
        "El resultado no fue estadísticamente significativo",
        "No tuvo un grupo de comparación activo frente a la combinación de los dos fármacos",
        "Mide la albuminuria a 180 días, no la falla renal ni los eventos"
      ],
      "correct": 3,
      "whyCorrect": "Fue aleatorizado, doble ciego y con comparadores activos, y el resultado fue significativo. Pero la albuminuria es un desenlace sustituto, y los autores reconocen que el seguimiento no alcanzó para medir eventos cardiovasculares ni progresión clínica de la enfermedad renal.",
      "pearl": "Un desenlace sustituto (albuminuria) sugiere beneficio; un desenlace clínico (diálisis, muerte, eventos CV) lo demuestra.",
      "trap": "Leer «29 % menos albuminuria» como «29 % menos pacientes en diálisis».",
      "cita": [
        {
          "donde": "Resumen, métodos",
          "texto": "We randomly assigned participants with chronic kidney disease (estimated glomerular filtration rate [eGFR], 30 to 90 ml per minute per 1.73 m2 of body-surface area), albuminuria (a urinary albumin-to-creatinine ratio of 100 to ≤5000 [with albumin measured in milligrams and creatinine measured in grams]), and type 2 diabetes, who were already taking a renin–angiotensin system inhibitor, in a 1:1:1 ratio"
        },
        {
          "donde": "Métodos, diseño",
          "texto": "was a double-blind, randomized, active-controlled trial of finerenone alone, empagliflozin alone, or the combination of the two therapies"
        },
        {
          "donde": "Resumen, métodos",
          "texto": "The primary outcome was the relative change in the log-transformed mean urinary albumin-to-creatinine ratio from baseline to 180 days."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "At day 180, the reduction in the urinary albumin-to-creatinine ratio with combination therapy was 29% greater than that with finerenone alone (least-squares mean ratio of the difference in the change from baseline, 0.71; 95% confidence interval [CI], 0.61 to 0.82; P<0.001) and 32% greater than that with empagliflozin alone (least-squares mean ratio of the difference in the change from baseline, 0.68; 95% CI, 0.59 to 0.79; P<0.001)."
        },
        {
          "donde": "Discusión, limitaciones",
          "texto": "The trial used a surrogate end point, and we did not follow the participants long enough to adequately measure differences among groups in cardiovascular outcomes or clinical kidney disease progression."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c10",
      "qtype": "critica",
      "topic": "Nefrología · Lectura crítica: interpretar el resultado",
      "difficulty": "Nivel 3",
      "src": "confidence",
      "vignette": "En CONFIDENCE, la combinación de finerenona y empagliflozina frente a finerenona sola tuvo una <span class='hy'>razón de 0,71 (IC 95 % 0,61 a 0,82)</span> en el cambio de la relación albúmina/creatinina urinaria a 180 días. ¿Cómo se interpreta?",
      "options": [
        "Redujo la albuminuria 29 % más que la finerenona y es significativo",
        "La combinación redujo un 29 % la progresión a diálisis en el seguimiento",
        "El intervalo incluye 0, así que la diferencia no es estadísticamente significativa",
        "La combinación redujo la albuminuria en 0,71 mg/g en términos absolutos"
      ],
      "correct": 0,
      "whyCorrect": "Una razón de 0,71 significa que el cambio con la combinación fue 29 % mayor (1 − 0,71). En una razón, el valor nulo es 1: como el IC 95 % (0,61 a 0,82) no incluye 1, la diferencia es estadísticamente significativa. Es un desenlace sustituto, no de diálisis.",
      "pearl": "En razones (RR, OR, HR, razón de medias) el valor nulo es 1; en diferencias, es 0.",
      "trap": "Buscar el 0 en el intervalo de una razón, o leer la razón como una diferencia absoluta.",
      "cita": [
        {
          "donde": "Resumen, métodos",
          "texto": "The primary outcome was the relative change in the log-transformed mean urinary albumin-to-creatinine ratio from baseline to 180 days."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "At day 180, the reduction in the urinary albumin-to-creatinine ratio with combination therapy was 29% greater than that with finerenone alone (least-squares mean ratio of the difference in the change from baseline, 0.71; 95% confidence interval [CI], 0.61 to 0.82; P<0.001) and 32% greater than that with empagliflozin alone (least-squares mean ratio of the difference in the change from baseline, 0.68; 95% CI, 0.59 to 0.79; P<0.001)."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c11",
      "topic": "Neumología · TEP: dímero D ajustado por edad",
      "difficulty": "Nivel 2",
      "src": "tep26",
      "vignette": "Mujer de <span class='hy'>82 años</span> con disnea de 2 días. FC 96 lpm, SatO₂ 94 %, sin signos de trombosis venosa. La probabilidad clínica de TEP es <span class='hy'>baja a intermedia (menor de 50 %)</span>. <span class='hy'>Dímero D 650 μg/L</span> (FEU). ¿Cuál es el siguiente paso diagnóstico?",
      "options": [
        "AngioTC de tórax, porque el dímero D supera el umbral habitual de 500 μg/L",
        "Ninguno: está bajo su umbral por edad (820 μg/L); se descarta el TEP",
        "Gammagrafía de ventilación/perfusión para no exponerla al contraste",
        "Ecocardiograma para confirmar o descartar el TEP con certeza"
      ],
      "correct": 1,
      "whyCorrect": "Con probabilidad clínica baja o intermedia (< 50 %), un dímero D por debajo del umbral ajustado por edad (edad × 10 μg/L desde los 50 años; aquí 820) excluye el TEP y la necesidad de imágenes. En ADJUST-PE, en mayores de 75 años, el umbral ajustado aumentó los pacientes en quienes se descartó el TEP de 6,4 % a 29,7 %, sin falsos negativos adicionales.",
      "pearl": "Umbral ajustado = edad × 10 μg/L (desde los 50 años). A los 82 años: 820 μg/L.",
      "trap": "Usar el corte fijo de 500 μg/L en un anciano: casi todos dan «positivo» y se piden angioTC innecesarias.",
      "cita": [
        {
          "donde": "Evaluación clínica, recomendación 2 (2a, B-R)",
          "texto": "In adult patients undergoing evaluation for PE and who have a low or intermediate clinical probability of PE (<50%) by risk assessment, an age-adjusted D-dimer value below the threshold (age × 10 μg/L for fibrinogen equivalent units assays) effectively excludes PE and the need for imaging."
        },
        {
          "donde": "ADJUST-PE · Resumen, objetivo",
          "texto": "To prospectively validate whether an age-adjusted D-dimer cutoff, defined as age × 10 in patients 50 years or older, is associated with an increased diagnostic yield of D-dimer in elderly patients with suspected PE."
        },
        {
          "donde": "ADJUST-PE · Resumen, resultados",
          "texto": "Among the 766 patients 75 years or older, of whom 673 had a nonhigh clinical probability, using the age-adjusted cutoff instead of the 500 μg/L cutoff increased the proportion of patients in whom PE could be excluded on the basis of D-dimer from 43 of 673 patients (6.4% [95% CI, 4.8%-8.5%) to 200 of 673 patients (29.7% [95% CI, 26.4%-33.3%), without any additional false-negative findings."
        },
        {
          "donde": "ADJUST-PE · Resumen, resultados",
          "texto": "The 3-month failure rate in patients with a D-dimer level higher than 500 μg/L but below the age-adjusted cutoff was 1 of 331 patients (0.3% [95% CI, 0.1%-1.7%])."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c12",
      "topic": "Neumología · TEP: algoritmo YEARS",
      "difficulty": "Nivel 2",
      "src": "tep26",
      "vignette": "Hombre de 45 años con dolor torácico pleurítico. <span class='hy'>Sin signos de trombosis venosa profunda, sin hemoptisis</span>, y el TEP <span class='hy'>no es el diagnóstico más probable</span>. <span class='hy'>Dímero D 800 μg/L</span>. Según el algoritmo YEARS, ¿cuál es la conducta diagnóstica?",
      "options": [
        "AngioTC de tórax, porque el dímero D supera el umbral de 500 μg/L",
        "Gammagrafía de ventilación/perfusión como primera imagen",
        "Sin imágenes: sin criterios YEARS el umbral es 1000 μg/L",
        "Ultrasonido venoso de miembros inferiores antes de cualquier otra imagen"
      ],
      "correct": 2,
      "whyCorrect": "El algoritmo YEARS usa 3 criterios: signos de TVP, hemoptisis y TEP como diagnóstico más probable. Sin ninguno, el umbral del dímero D es 1000 μg/L; con 1 o más, es 500 μg/L. Con 800 μg/L y ningún criterio, no necesita imágenes para descartar el TEP.",
      "pearl": "YEARS: 0 criterios → umbral 1000 μg/L; ≥ 1 criterio → 500 μg/L.",
      "trap": "Aplicar siempre el corte de 500 μg/L sin mirar cuántos criterios YEARS tiene el paciente.",
      "cita": [
        {
          "donde": "Evaluación clínica, recomendación 3 (2a, B-R)",
          "texto": "In adult patients with suspected PE, the YEARS algorithm* can be useful to identify which patients do not need imaging to rule out a PE."
        },
        {
          "donde": "Evaluación clínica, nota del algoritmo YEARS",
          "texto": "YEARS algorithm: A D-dimer threshold of 500 μg/L in patients who have ≥1 of the following: 1) clinical signs of DVT; 2) hemoptysis; and/or 3) PE as the most likely diagnosis. A D-dimer threshold of 1000 μg/L is used for patients who have no YEARS criteria."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c13",
      "topic": "Neumología · TEP: alta probabilidad",
      "difficulty": "Nivel 1",
      "src": "tep26",
      "vignette": "Hombre de 60 años en el día 5 de una cirugía de cadera, con disnea súbita, <span class='hy'>pierna derecha edematosa y dolorosa</span>, FC 118 lpm y SatO₂ 89 %. PA 118/74 mmHg. La probabilidad clínica de TEP es <span class='hy'>alta (mayor de 50 %)</span>. ¿Cuál es el estudio diagnóstico indicado?",
      "options": [
        "Dímero D primero y decidir según el resultado",
        "Ecocardiograma transtorácico",
        "Ultrasonido venoso de miembros inferiores como única prueba",
        "AngioTC de tórax"
      ],
      "correct": 3,
      "whyCorrect": "Con probabilidad clínica alta (> 50 %) se indica imagen para confirmar o descartar el TEP; el dímero D se usa para excluir en probabilidad baja o intermedia. La angioTC es la imagen recomendada sobre la gammagrafía V/Q.",
      "pearl": "El ecocardiograma no confirma ni descarta el TEP: sirve para valorar el ventrículo derecho cuando el TEP ya está confirmado.",
      "trap": "Pedir dímero D en alta probabilidad: un resultado negativo no basta para descartar y retrasa el diagnóstico.",
      "cita": [
        {
          "donde": "Pruebas diagnósticas, recomendación 1 (1, A)",
          "texto": "In patients presenting with symptoms and signs suggestive of acute PE, imaging is recommended for those who are deemed high probability (>50% probability of PE) by a validated clinic risk prediction score or an elevated D-dimer level in order to confirm or exclude PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 3 (1, B-R)",
          "texto": "In patients undergoing imaging evaluation, a CTPA is recommended in preference to a V/Q scan to confirm the diagnosis of acute PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 9 (3: sin beneficio, B-NR)",
          "texto": "In patients with suspected acute PE, an echocardiogram is not recommended to confirm or refute the diagnosis of PE."
        },
        {
          "donde": "Pruebas diagnósticas, sinopsis",
          "texto": "Echocardiography is an inadequate test for the diagnosis of PE but is important in the assessment of RV function for symptomatic patients with confirmed acute PE."
        },
        {
          "donde": "Evaluación clínica, recomendación 2 (2a, B-R)",
          "texto": "In adult patients undergoing evaluation for PE and who have a low or intermediate clinical probability of PE (<50%) by risk assessment, an age-adjusted D-dimer value below the threshold (age × 10 μg/L for fibrinogen equivalent units assays) effectively excludes PE and the need for imaging."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c14",
      "topic": "Neumología · TEP sin angioTC posible",
      "difficulty": "Nivel 2",
      "src": "tep26",
      "vignette": "Mujer de 54 años con <span class='hy'>anafilaxia previa al contraste yodado</span>, sospecha de TEP, estable, y dímero D elevado. No se le puede hacer angioTC. ¿Cuál es el estudio diagnóstico de elección?",
      "options": [
        "Gammagrafía de ventilación/perfusión, idealmente con SPECT",
        "AngioRM con contraste",
        "Ecocardiograma transtorácico",
        "Ultrasonido venoso: si es normal, se descarta el TEP"
      ],
      "correct": 0,
      "whyCorrect": "Si no se puede hacer angioTC, es razonable la gammagrafía V/Q antes que la angioRM, por su mejor rendimiento diagnóstico; y la V/Q SPECT es preferible a la planar. El ecocardiograma no sirve para confirmar ni descartar el TEP.",
      "pearl": "Una gammagrafía V/Q de alta probabilidad basta para diagnosticar TEP, igual que una angioTC positiva.",
      "trap": "Elegir la angioRM porque «no usa yodo»: rinde menos que la V/Q para el diagnóstico.",
      "cita": [
        {
          "donde": "Pruebas diagnósticas, recomendación 6 (2a, B-R)",
          "texto": "In patients with suspected acute PE who cannot undergo a CTPA, it is reasonable to perform a V/Q scan in preference to contrast-enhanced magnetic resonance angiography (MRA) to improve the diagnostic yield."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 5 (2a, B-R)",
          "texto": "In patients undergoing evaluation for PE, V/Q single-photon emission computed tomography (SPECT) is reasonable in preference to a planar V/Q scan as a diagnostic study."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 9 (3: sin beneficio, B-NR)",
          "texto": "In patients with suspected acute PE, an echocardiogram is not recommended to confirm or refute the diagnosis of PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 2 (1, A)",
          "texto": "In patients undergoing imaging evaluation for suspected PE, a positive CTPA or high probability ventilation/perfusion (V/Q) scan is sufficient to diagnose PE."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c15",
      "topic": "Neumología · TEP en el embarazo",
      "difficulty": "Nivel 3",
      "src": "tep26",
      "vignette": "Gestante de 28 semanas con disnea y taquicardia. Tiene <span class='hy'>criterios YEARS que sugieren TEP</span> y la <span class='hy'>radiografía de tórax es normal</span>. Requiere imagen. ¿Cuál es el estudio diagnóstico razonable?",
      "options": [
        "No hacer imágenes por el riesgo fetal y anticoagular empíricamente",
        "Gammagrafía de perfusión de dosis baja, siempre",
        "AngioTC de tórax de baja dosis de radiación",
        "Ecocardiograma para confirmar el diagnóstico"
      ],
      "correct": 2,
      "whyCorrect": "En la gestante sintomática con criterios YEARS sugestivos de TEP y radiografía normal, es razonable la angioTC de baja dosis de radiación sobre la gammagrafía de perfusión de dosis baja. Para decidir si necesita imágenes se pueden usar los criterios YEARS adaptados al embarazo.",
      "pearl": "El TEP causa hasta el 11 % de las muertes relacionadas con el embarazo en Estados Unidos.",
      "trap": "Evitar toda imagen por miedo a la radiación y dejar sin diagnóstico una causa principal de muerte materna.",
      "cita": [
        {
          "donde": "Pruebas diagnósticas, recomendación 4 (2a, B-NR)",
          "texto": "In pregnant patients presenting with symptoms, YEARS criteria suggestive of acute PE, and a normal chest x-ray, imaging evaluation with lowradiation dose CTPA is reasonable over low-dose perfusion scintigraphy."
        },
        {
          "donde": "Evaluación clínica, recomendación 4 (2b, B-NR)",
          "texto": "In pregnant adults, it may be reasonable to use pregnancy-adapted YEARS criteria to identify patients who do not need imaging for PE."
        },
        {
          "donde": "Pruebas diagnósticas, texto de apoyo",
          "texto": "Pregnancy is an acquired and independent risk factor for VTE, and PE accounts for up to 11% of pregnancy-related deaths in the United States."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c16",
      "qtype": "directa",
      "topic": "Cardiología · PRECISE-DAPT",
      "difficulty": "Nivel 2",
      "src": "precise_dapt",
      "vignette": "Con el puntaje PRECISE-DAPT (edad, depuración de creatinina, hemoglobina, leucocitos y sangrado espontáneo previo), ¿desde qué valor se considera alto riesgo de sangrado, en el que la doble antiagregación larga aumenta el sangrado?",
      "options": [
        "≥ 10",
        "≥ 25",
        "≥ 40",
        "≥ 50"
      ],
      "correct": 1,
      "whyCorrect": "Con PRECISE-DAPT ≥ 25 (alto riesgo de sangrado), la doble antiagregación larga aumentó el sangrado sin beneficio isquémico significativo; en riesgo menor no aumentó el sangrado y sí dio beneficio isquémico. Por eso, con ≥ 25 se puede considerar una doble antiagregación más corta (< 12 meses).",
      "pearl": "Los 5 ítems de PRECISE-DAPT: edad, depuración de creatinina, hemoglobina, leucocitos y sangrado espontáneo previo.",
      "trap": "Dar 12 o más meses de doble antiagregación a todos por igual, sin estimar el riesgo de sangrado.",
      "cita": [
        {
          "donde": "Resumen, hallazgos",
          "texto": "The PRECISE-DAPT score (age, creatinine clearance, haemoglobin, white-blood-cell count, and previous spontaneous bleeding) showed a c-index for out-of-hospital TIMI major or minor bleeding of 0·73 (95% CI 0·61–0·85) in the derivation cohort"
        },
        {
          "donde": "Resumen, hallazgos",
          "texto": "A longer DAPT duration significantly increased bleeding in patients at high risk (score ≥25), but not in those with lower risk profiles (pinteraction=0·007), and exerted a significant ischaemic benefit only in this latter group."
        },
        {
          "donde": "Discusión",
          "texto": "PRECISE-DAPT score showed potential to identify patients at high bleeding risk (score ≥25) who might benefit from a shortened (ie, <12 months) DAPT duration."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c17",
      "topic": "Cardiología · Prasugrel: a quién no",
      "difficulty": "Nivel 2",
      "src": "triton",
      "vignette": "Hombre de 66 años, 78 kg, con IAM sin elevación del ST y angioplastia programada. Tuvo un <span class='hy'>ataque isquémico transitorio hace 2 años</span>. ¿Qué inhibidor P2Y12 no debe usarse por este antecedente?",
      "options": [
        "Clopidogrel",
        "Ticagrelor",
        "Cangrelor",
        "Prasugrel"
      ],
      "correct": 3,
      "whyCorrect": "En TRITON-TIMI 38, los pacientes con ACV o AIT previo tuvieron daño clínico neto con prasugrel (HR 1,54). Los de 75 años o más y los de menos de 60 kg no tuvieron beneficio neto.",
      "pearl": "Prasugrel: no en ACV/AIT previo; sin beneficio neto en ≥ 75 años o < 60 kg.",
      "trap": "Elegir prasugrel por ser «más potente» sin revisar el antecedente cerebrovascular.",
      "cita": [
        {
          "donde": "Resultados, beneficio clínico neto",
          "texto": "patients who had a previous stroke or transient ischemic attack had net harm from prasugrel (hazard ratio, 1.54; 95% CI, 1.02 to 2.32; P = 0.04), patients 75 years of age or older had no net benefit from prasugrel (hazard ratio, 0.99; 95% CI, 0.81 to 1.21; P = 0.92), and patients weighing less than 60 kg had no net benefit from prasugrel (hazard ratio, 1.03; 95% CI, 0.69 to 1.53; P = 0.89)."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c18",
      "qtype": "critica",
      "topic": "Cardiología · Lectura crítica: TRITON-TIMI 38",
      "difficulty": "Nivel 3",
      "src": "triton",
      "vignette": "En TRITON-TIMI 38 (13.608 pacientes con SCA y angioplastia programada), el desenlace primario ocurrió en <span class='hy'>12,1 % con clopidogrel y 9,9 % con prasugrel</span>; el sangrado mayor, en <span class='hy'>1,8 % y 2,4 %</span>. ¿Cuántos pacientes hay que tratar con prasugrel en vez de clopidogrel para evitar un evento, y cuántos para causar un sangrado mayor?",
      "options": [
        "NNT ≈ 10 y NNH ≈ 17",
        "NNT ≈ 46 y NNH ≈ 167",
        "NNT ≈ 81 y NNH ≈ 132",
        "NNT ≈ 22 y NNH ≈ 60"
      ],
      "correct": 1,
      "whyCorrect": "Reducción absoluta del riesgo: 12,1 − 9,9 = 2,2 % → NNT = 100/2,2 ≈ 46. Aumento absoluto del sangrado mayor: 2,4 − 1,8 = 0,6 % → NNH = 100/0,6 ≈ 167. La mortalidad total no difirió entre los grupos.",
      "pearl": "NNT = 100 / reducción absoluta en %. No uses el HR (0,81) para calcularlo.",
      "trap": "Calcular el NNT con la reducción relativa (19 %) en lugar de la absoluta (2,2 %).",
      "cita": [
        {
          "donde": "Resumen, métodos",
          "texto": "we randomly assigned 13,608 patients with moderate-to-high-risk acute coronary syndromes with scheduled percutaneous coronary intervention to receive prasugrel (a 60-mg loading dose and a 10-mg daily maintenance dose) or clopidogrel (a 300-mg loading dose and a 75-mg daily maintenance dose), for 6 to 15 months."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "The primary efficacy end point occurred in 12.1% of patients receiving clopidogrel and 9.9% of patients receiving prasugrel (hazard ratio for prasugrel vs. clopidogrel, 0.81; 95% confidence interval [CI], 0.73 to 0.90; P<0.001)."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "Major bleeding was observed in 2.4% of patients receiving prasugrel and in 1.8% of patients receiving clopidogrel (hazard ratio, 1.32; 95% CI, 1.03 to 1.68; P = 0.03)."
        },
        {
          "donde": "Resumen, conclusiones",
          "texto": "Overall mortality did not differ significantly between treatment groups."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c19",
      "topic": "Cardiología · SCA con anticoagulación oral",
      "difficulty": "Nivel 3",
      "src": "acc_antiag26",
      "vignette": "Mujer de 72 años con <span class='hy'>fibrilación auricular anticoagulada</span> que presenta un SCA tratado con angioplastia y stent. Recibe triple terapia (aspirina, clopidogrel y anticoagulante oral). ¿Qué conducta antitrombótica sigue?",
      "options": [
        "Mantener la triple terapia completa durante 12 meses",
        "Suspender el anticoagulante oral y dejar doble antiagregación por un año",
        "Suspender la aspirina a las 1 a 4 semanas; clopidogrel más anticoagulante",
        "Cambiar clopidogrel por prasugrel para mayor protección del stent y seguir triple"
      ],
      "correct": 2,
      "whyCorrect": "En SCA que requiere anticoagulación oral, la aspirina se suspende tras 1 a 4 semanas de triple terapia, y se continúa un inhibidor P2Y12 (preferiblemente clopidogrel) más el anticoagulante oral, para reducir el sangrado.",
      "pearl": "Con anticoagulante oral, el P2Y12 preferido es clopidogrel.",
      "trap": "Prolongar la triple terapia «por seguridad»: multiplica el sangrado.",
      "cita": [
        {
          "donde": "Tabla de recomendaciones: necesidad de anticoagulante oral (2025 ACC/AHA SCA, clase 1)",
          "texto": "In patients with ACS who require oral anticoagulant therapy, aspirin should be discontinued after 1–4 wks of triple antithrombotic therapy, with continued use of a P2Y12 inhibitor (preferably clopidogrel) and an oral anticoagulant to reduce bleeding risk."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c20",
      "topic": "Neurología · Hidrocefalia de presión normal",
      "difficulty": "Nivel 2",
      "src": "jama_inph",
      "vignette": "Hombre de 76 años con 1 año de <span class='hy'>marcha lenta, de base amplia, «magnética»</span>, con dificultad para girar, y <span class='hy'>urgencia urinaria</span>. Fuerza y sensibilidad normales. La RM muestra <span class='hy'>ventriculomegalia (índice de Evans 0,34)</span>. ¿Qué prueba confirma el diagnóstico y predice la respuesta a la derivación?",
      "options": [
        "Punción lumbar de gran volumen con medición de la marcha antes y después",
        "Una segunda resonancia a los 6 meses para ver si los ventrículos siguen creciendo",
        "PET con amiloide para descartar enfermedad de Alzheimer",
        "Electromiografía de miembros inferiores para buscar neuropatía"
      ],
      "correct": 0,
      "whyCorrect": "La HPN idiopática se diagnostica con la clínica característica y la neuroimagen con ventrículos y espacio subaracnoideo agrandados, pero la imagen no predice la respuesta al tratamiento. Por eso se hace una punción lumbar de gran volumen (30 a 50 mL de LCR): la mejoría objetiva de la marcha en horas confirma el diagnóstico y predice la respuesta a la derivación. El drenaje lumbar prolongado (200 a 300 mL en varios días) tiene mayor precisión pronóstica.",
      "pearl": "La marcha falla primero (85 a 95 %), luego la orina (75 a 90 %) y la cognición (60 a 80 %).",
      "trap": "Atribuir la marcha y el olvido a la edad o a Parkinson: el diagnóstico temprano mejora el resultado de la derivación.",
      "cita": [
        {
          "donde": "Resumen, observaciones",
          "texto": "Gait disturbance, including a broad-based, slow, shuffling gait and impaired turning, occurs in 85% to 95% of patients with iNPH and is often the earliest symptom."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Urinary dysfunction occurs in approximately 75% to 90% of patients with iNPH and commonly includes urgency, nocturia, urge incontinence, or leakage."
        },
        {
          "donde": "Tabla: diagnóstico diferencial",
          "texto": "Strength and sensation are usually normal"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "iNPH is diagnosed primarily based on characteristic clinical findings and neuroimaging (typically brain magnetic resonance imaging) demonstrating cerebral ventricular and subarachnoid space enlargement. Although necessary for diagnosis, these neuroimaging findings are not reliably associated with response to treatment."
        },
        {
          "donde": "Tabla: diagnóstico diferencial",
          "texto": "Evans index often >0.30 (CT/MRI)"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Patients being evaluated for iNPH should undergo large-volume lumbar puncture with removal of 30 to 50 mL of CSF to confirm the diagnosis and predict shunt responsiveness, measured as improvement in objective gait measures starting within hours after drainage."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Extended lumbar drainage with removal of 200 to 300 mL of CSF over several days in an inpatient setting provides higher prognostic accuracy"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Early diagnosis of NPH is important because shorter symptom duration and less advanced disease are associated with more favorable outcomes."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c21",
      "topic": "Neurología · HPN vs Parkinson vs Alzheimer",
      "difficulty": "Nivel 2",
      "src": "jama_inph",
      "vignette": "Mujer de 79 años con marcha lenta de <span class='hy'>base amplia</span> que «se pega al piso», le cuesta levantarse de la silla y girar. Desde hace meses tiene <span class='hy'>urgencia e incontinencia urinaria</span> y lentitud mental. La memoria episódica está relativamente conservada. La TC muestra ventrículos grandes. ¿Cuál es el diagnóstico más probable?",
      "options": [
        "Enfermedad de Parkinson con disautonomía urinaria",
        "Enfermedad de Alzheimer en fase moderada",
        "Hidrocefalia de presión normal idiopática",
        "Envejecimiento normal con incontinencia de esfuerzo"
      ],
      "correct": 2,
      "whyCorrect": "La marcha de base amplia «magnética» con problemas para girar, temprana y dominante, más urgencia urinaria y lentitud cognitiva con ventriculomegalia orientan a HPN idiopática. En el Parkinson la marcha es de base estrecha, y en el Alzheimer el déficit de memoria episódica domina desde el inicio. Ojo: Parkinson o Alzheimer coexisten en el 20 a 30 % de los pacientes con HPN.",
      "pearl": "Marcha: base amplia en HPN; base estrecha en Parkinson.",
      "trap": "Diagnosticar Parkinson por la marcha arrastrada sin mirar la base de sustentación ni la imagen.",
      "cita": [
        {
          "donde": "Resumen, observaciones",
          "texto": "Gait disturbance, including a broad-based, slow, shuffling gait and impaired turning, occurs in 85% to 95% of patients with iNPH and is often the earliest symptom."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Urinary dysfunction occurs in approximately 75% to 90% of patients with iNPH and commonly includes urgency, nocturia, urge incontinence, or leakage."
        },
        {
          "donde": "Tabla: diagnóstico diferencial",
          "texto": "Broad-based “magnetic” gait"
        },
        {
          "donde": "Tabla: diagnóstico diferencial",
          "texto": "Difficulty rising from a chair"
        },
        {
          "donde": "Tabla: diagnóstico diferencial (Parkinson)",
          "texto": "Narrow-based shuffling gait"
        },
        {
          "donde": "Tabla: diagnóstico diferencial (Alzheimer)",
          "texto": "Episodic memory impairment"
        },
        {
          "donde": "Diagnóstico diferencial",
          "texto": "Symptoms of iNPH may be attributed to normal aging or misdiagnosed as Parkinson disease or Alzheimer disease, which are present in 20% to 30% of patients with iNPH and may have overlapping clinical features such as gait disturbance and cognitive dysfunction."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c22",
      "topic": "Neurología · Demencia atípica",
      "difficulty": "Nivel 3",
      "src": "jama_dem",
      "vignette": "Hombre de <span class='hy'>58 años</span> con deterioro cognitivo de <span class='hy'>inicio rápido</span> en pocos meses, que ya le impide trabajar. Su esposa lo confirma. La RM no muestra infartos ni tumor. ¿Qué evaluación diagnóstica adicional debe considerarse?",
      "options": [
        "Ninguna: es Alzheimer típico y basta iniciar donepezilo",
        "Estudios de LCR o pruebas genéticas, por ser una demencia atípica",
        "Repetir el MoCA en 1 año",
        "Solo pruebas de tiroides y vitamina B12"
      ],
      "correct": 1,
      "whyCorrect": "Inicio antes de los 65 años, comienzo rápido o compromiso de varios dominios sin afectar la memoria episódica son rasgos de demencia atípica. En esos casos puede considerarse evaluar con biomarcadores en LCR o pruebas genéticas, además de la historia corroborada por un familiar y el examen mental.",
      "pearl": "El diagnóstico de demencia exige pérdida en varios dominios que afecte la vida diaria, corroborada por alguien cercano.",
      "trap": "Etiquetar como Alzheimer típico a un paciente joven con curso rápido.",
      "cita": [
        {
          "donde": "Resumen, observaciones",
          "texto": "Dementia is an acquired loss of cognition in multiple cognitive domains sufficiently severe to affect social or occupational function."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Diagnosing dementia requires a history evaluating for cognitive decline and impairment in daily activities, with corroboration from a close friend or family member, in addition to a thorough mental status examination by a clinician"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Additional evaluation with cerebrospinal fluid assays or genetic testing may be considered in atypical dementia cases, such as age of onset younger than 65 years, rapid symptom onset, and/or impairment in multiple cognitive domains but not episodic memory."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Brain neuroimaging may demonstrate structural changes including, but not limited to, focal atrophy, infarcts, and tumor, that may not be identified on physical examination."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c23",
      "qtype": "directa",
      "topic": "Neurología · Tamizaje cognitivo (MoCA)",
      "difficulty": "Nivel 1",
      "src": "jama_dem",
      "vignette": "En el Montreal Cognitive Assessment (MoCA, de 0 a 30 puntos), ¿por debajo de qué puntaje se recomienda una evaluación de seguimiento?",
      "options": [
        "18",
        "20",
        "22",
        "24"
      ],
      "correct": 3,
      "whyCorrect": "Con un MoCA menor de 24 se recomienda una evaluación de seguimiento. El tamizaje solo organiza la evaluación: el diagnóstico de demencia requiere la historia, la corroboración de un familiar y un examen mental completo; si queda dudoso, pruebas neuropsicológicas.",
      "pearl": "Síntomas con examen normal: las pruebas neuropsicológicas ayudan a definir si hay demencia.",
      "trap": "Diagnosticar demencia solo por un puntaje de tamizaje, sin compromiso funcional.",
      "cita": [
        {
          "donde": "Evaluación cognitiva",
          "texto": "One commonly used screening tool is the Montreal Cognitive Assessment (MoCA; range, 0-30; follow-up evaluation to screening recommended if score is <24)."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Diagnosing dementia requires a history evaluating for cognitive decline and impairment in daily activities, with corroboration from a close friend or family member, in addition to a thorough mental status examination by a clinician"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "if the assessment is inconclusive (eg, symptoms present, but normal examination findings), neuropsychological testing can help determine whether dementia is present."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c24",
      "topic": "Neurología · Dolor neuropático: graduación",
      "difficulty": "Nivel 2",
      "src": "nrdp_np",
      "vignette": "Mujer de 61 años con diabetes y dolor quemante en ambos pies, en distribución de «calcetín». En el examen, el roce suave con un algodón le produce dolor (<span class='hy'>alodinia</span>) y hay hipoestesia en la misma zona. Aún no tiene estudios de conducción nerviosa. Según el sistema de graduación, ¿cómo se clasifica el diagnóstico de dolor neuropático?",
      "options": [
        "Posible: no justifica tratamiento hasta confirmarlo",
        "Definitivo, porque hay alodinia",
        "Probable: ya justifica iniciar tratamiento",
        "No es neuropático hasta tener la electromiografía"
      ],
      "correct": 2,
      "whyCorrect": "Historia de lesión o enfermedad neurológica con distribución plausible es dolor neuropático «posible». Si el examen confirma signos sensitivos (como alodinia e hipoestesia), es «probable». Es «definitivo» solo cuando una prueba objetiva (neurofisiología, biopsia de piel) confirma la lesión. Con dolor neuropático probable ya se debe tratar.",
      "pearl": "Alodinia: dolor por un estímulo que normalmente no duele.",
      "trap": "Esperar la electromiografía para tratar a un paciente con dolor neuropático probable.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "Neuropathic pain is caused by a lesion or disease of the somatosensory system, including peripheral fibres (Aβ, Aδ and C fibres) and central neurons, and affects 7–10% of the general population."
        },
        {
          "donde": "Diagnóstico: sistema de graduación",
          "texto": "If the patient’s history suggests the presence of a neurological lesion or disease and the pain could be related to such (for example, using validated screening tools) and the pain distribution is neuroanatomically plausible, the pain is termed ‘possible’ neuropathic pain."
        },
        {
          "donde": "Diagnóstico: sistema de graduación",
          "texto": "‘Probable’ neuropathic pain requires supporting evidence obtained by a clinical examination of sensory signs (for example, bedside testing and quantitative sensory testing). ‘Definite’ neuropathic pain requires that an objective diagnostic test confirms the lesion or disease of the somatosensory nervous system (for example, neurophysiological tests and skin biopsy). A minimum finding of probable neuropathic pain should lead to treatment."
        },
        {
          "donde": "Glosario",
          "texto": "Allodynia Pain caused by a normally non-painful stimulus."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c25",
      "topic": "Neurología · Dolor neuropático: tratamiento",
      "difficulty": "Nivel 1",
      "src": "nrdp_np",
      "vignette": "Hombre de 66 años con neuropatía diabética dolorosa que le impide dormir. Función renal normal. ¿Cuál es una opción de primera línea?",
      "options": [
        "Pregabalina, gabapentina, duloxetina o un tricíclico",
        "Tramadol como primer fármaco, por ser un dolor intenso",
        "Ibuprofeno a dosis altas de forma continua",
        "Topiramato como estabilizador de membrana"
      ],
      "correct": 0,
      "whyCorrect": "Pregabalina, gabapentina, duloxetina y los antidepresivos tricíclicos tienen recomendación fuerte y son de primera línea para el dolor neuropático periférico y central. Otros antiepilépticos (como topiramato) no tienen esa evidencia, aunque algunos sirven en subgrupos.",
      "pearl": "Para tamizar el componente neuropático existen cuestionarios simples como el DN4 o la escala LANSS.",
      "trap": "Usar AINE o un opioide como primera opción en un dolor neuropático.",
      "cita": [
        {
          "donde": "Tratamiento de primera línea",
          "texto": "pregabalin (a GABA analogue), gabapentin (a GABA inhibitor), duloxetine (a serotonin–noradrenaline reuptake inhibitor) and various tricyclic antidepressants have strong recommendations for use and are recommended as first-line treatments for peripheral and central neuropathic pain."
        },
        {
          "donde": "Tratamiento",
          "texto": "Antiepileptics other than α2δ ligands (for example, topiramate, oxcarbazepine, carbamazepine, valproate, zonisamide, lacosamide and levetiracetam) fall into these categories, although some agents are probably effective in subgroups of patients."
        },
        {
          "donde": "Epidemiología: herramientas de tamizaje",
          "texto": "In using screening tools, such as the Douleur Neuropathique 4 questions (DN4) or the Leeds Assessment of Neuropathic Symptoms and Signs (LANSS) pain scale"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c26",
      "topic": "Dermatología · Onicomicosis",
      "difficulty": "Nivel 1",
      "src": "afp_tinea",
      "vignette": "Hombre de 52 años con la uña del primer dedo del pie <span class='hy'>engrosada, amarillenta y friable</span> desde hace 2 años. Pide tratamiento oral. ¿Cuál es el siguiente paso diagnóstico?",
      "options": [
        "Iniciar terbinafina oral por 12 semanas sin más pruebas",
        "Itraconazol empírico en pulsos",
        "Esmalte de ciclopirox y control en 1 año",
        "Confirmar con KOH, cultivo, PAS o PCR antes de tratar"
      ],
      "correct": 3,
      "whyCorrect": "Antes de tratar, la sospecha de onicomicosis debe confirmarse con una prueba diagnóstica (KOH, cultivo, PAS o PCR), porque otras distrofias ungueales se le parecen. Confirmada, la terbinafina oral es la preferida: bien tolerada, barata y más eficaz que otros agentes.",
      "pearl": "La uña distrófica por microtrauma repetido imita a la onicomicosis.",
      "trap": "Tratar meses con terbinafina una uña que no tiene hongos.",
      "cita": [
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "Before initiating treatment, suspected onychomycosis should be confirmed with diagnostic testing, such as potassium hydroxide preparation, culture, periodic acid– Schiff stain, or polymerase chain reaction."
        },
        {
          "donde": "Recomendaciones clave (A)",
          "texto": "Oral terbinafine is preferred for onychomycosis because it is well-tolerated, inexpensive, and more effective than other agents."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "When feasible, in-office diagnostic testing (eg, potassium hydroxide preparation with direct microscopy) should be used for the diagnosis of tinea infection."
        },
        {
          "donde": "Resumen",
          "texto": "Clinical diagnosis without testing may be unreliable because other conditions can resemble tinea infections (eg, tinea corporis can be confused with eczema, and onychomycosis with dystrophic toenails from repeated low-level trauma or psoriasis)."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-c27",
      "topic": "Dermatología · Tiña crural vs candidiasis",
      "difficulty": "Nivel 2",
      "src": "afp_tinea",
      "vignette": "Hombre de 19 años con placa eritematosa pruriginosa de borde activo en la <span class='hy'>cara interna de ambos muslos</span>, frente al escroto. El <span class='hy'>escroto está respetado</span>. ¿Cuál es el diagnóstico más probable?",
      "options": [
        "Candidiasis intertriginosa",
        "Tiña crural",
        "Psoriasis inversa",
        "Dermatitis de contacto"
      ],
      "correct": 1,
      "whyCorrect": "La tiña crural afecta la piel del muslo frente al escroto y suele respetar el escroto; el compromiso escrotal orienta a candidiasis. Cuando es posible, se confirma con KOH y microscopía directa.",
      "pearl": "Evita las cremas que combinan antimicótico y corticoide (como clotrimazol-betametasona).",
      "trap": "Tratar con una crema combinada con corticoide potente «para que mejore rápido».",
      "cita": [
        {
          "donde": "Tiña crural",
          "texto": "It usually involves the skin on the upper thigh opposite the scrotum"
        },
        {
          "donde": "Tiña crural",
          "texto": "The scrotum typically is spared, and scrotal involvement may help differentiate tinea cruris from candidiasis."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "When feasible, in-office diagnostic testing (eg, potassium hydroxide preparation with direct microscopy) should be used for the diagnosis of tinea infection."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "Combination antifungal-corticosteroid products, such as clotrimazole- betamethasone, generally should be avoided."
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
    },
    {
      "id": "mi-f02",
      "title": "NAC: dónde tratarla (Colombia 2026)",
      "badge": "Guía ACIN 2026",
      "src": "acin_nac26",
      "thresholds": [
        {
          "label": "CURB-65 0–1",
          "val": "Riesgo bajo (< 1,5 %): ambulatorio"
        },
        {
          "label": "CURB-65 2",
          "val": "Riesgo intermedio (9,2 %): hospitalización en sala"
        },
        {
          "label": "CURB-65 3–5",
          "val": "Riesgo alto (22 %): hospitalización urgente, evaluar UCI"
        },
        {
          "label": "SatO₂ < 90 %",
          "val": "Hospitalizar aunque el CURB-65 sea bajo"
        },
        {
          "label": "Ingreso a UCI",
          "val": "1 criterio mayor o ≥ 3 menores (IDSA/ATS)"
        }
      ],
      "redFlag": "Hipotensión con vasopresores o insuficiencia respiratoria con ventilación mecánica: ingreso directo a UCI.",
      "trap": "Decidir solo con el puntaje: el juicio clínico prevalece sobre la escala.",
      "cita": [
        {
          "donde": "Anexo, Tarjeta 1: CURB-65 y lugar de atención",
          "texto": "0-1 Bajo (< 1.5%) Ambulatorio (Considerar ingreso si hay hipoxemia o intolerancia oral) 2 Intermedio (9.2%) Hospitalización (Sala General o Estancia Corta) 3-5 Alto (22%) Hospitalización Urgente (Evaluar criterios de UCI)"
        },
        {
          "donde": "Anexo, Tarjeta 1: nota",
          "texto": "La saturación de oxígeno < 90% es criterio de hospitalización independiente del CURB-65."
        },
        {
          "donde": "Anexo, Tarjeta 1: nota",
          "texto": "Nota: el juicio clínico prevalece sobre la escala."
        },
        {
          "donde": "Anexo, Tarjeta 2: ingreso a UCI (IDSA/ATS modificados)",
          "texto": "Se recomienda ingreso a UCI si cumple 1 Criterio Mayor o ≥ 3 Criterios Menores."
        },
        {
          "donde": "Recomendación 10.2 (fuerte, moderada calidad)",
          "texto": "Recomendamos admisión directa a UCI en pacientes con hipotensión que requiere vasopresores o insuficiencia respiratoria que requiere ventilación mecánica."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f03",
      "title": "NAC: antibiótico empírico (Colombia 2026)",
      "badge": "Guía ACIN 2026",
      "src": "acin_nac26",
      "thresholds": [
        {
          "label": "Ambulatoria",
          "val": "Amoxicilina 1 g c/8 h VO (o claritromicina, o doxiciclina)"
        },
        {
          "label": "Hospitalizada no grave",
          "val": "Ampicilina/sulbactam o ceftriaxona en monoterapia"
        },
        {
          "label": "Grave",
          "val": "Betalactámico + claritromicina"
        },
        {
          "label": "Riesgo de SAMR",
          "val": "Vancomicina o linezolid; confirmar con cultivo o PCR"
        },
        {
          "label": "Riesgo de P. aeruginosa",
          "val": "Cefepime o piperacilina-tazobactam"
        },
        {
          "label": "Duración (no grave)",
          "val": "5 días en total, según estabilidad clínica"
        }
      ],
      "redFlag": "Evolución tórpida a las 48–72 horas en sala: agregar un macrólido.",
      "trap": "Quinolonas en NAC: la guía pide evitarlas por resistencia y efectos adversos graves.",
      "cita": [
        {
          "donde": "Recomendación 11 (fuerte, moderada calidad)",
          "texto": "Recomendamos el uso de antibióticos orales como amoxicilina 1 g cada 8 horas, claritromicina 500 mg cada 12 horas (existen presentaciones que ofrecen la posibilidad de administrar 1g en una dosis única diaria), doxiciclina 100 mg cada 12 horas en pacientes adultos con diagnóstico de NAC que requieren manejo ambulatorio sin factores de riesgo para SAMR o P. aeruginosa."
        },
        {
          "donde": "Recomendación 12.1 (fuerte, moderada calidad)",
          "texto": "Recomendamos la terapia empírica con un betalactámico como ampicilina/sulbactam o ceftriaxona en monoterapia en pacientes adultos con diagnóstico de NAC que requieren manejo intrahospitalario sin criterios de gravedad y sin factores de riesgo para SAMR o P. aeruginosa"
        },
        {
          "donde": "Recomendación 13 (fuerte, moderada calidad)",
          "texto": "Recomendamos la terapia con un betalactámico como ampicilina/sulbactam o ceftriaxona en combinación con claritromicina en adultos con diagnóstico de NAC grave."
        },
        {
          "donde": "Recomendaciones 14.2 y 14.4 (fuertes, baja calidad)",
          "texto": "Recomendamos iniciar tratamiento con vancomicina o linezolid, según disponibilidad y perfil clínico, realizar cultivo o PCR para confirmar o descartar la necesidad de continuar la terapia. · Recomendamos iniciar tratamiento con cefepime o piperacilina-tazobactam, según disponibilidad y perfil clínico, realizar cultivo o PCR para confirmar o descartar la necesidad de continuar la terapia."
        },
        {
          "donde": "Recomendación 17.1 (fuerte, moderada calidad)",
          "texto": "En pacientes adultos con diagnóstico de NAC no grave, recomendamos una duración de 5 días en total, teniendo en cuenta como criterio para la suspensión del tratamiento la estabilidad clínica."
        },
        {
          "donde": "Punto de buena práctica (pregunta 12)",
          "texto": "En los pacientes con evolución clínica tórpida a las 48 a 72 horas de iniciado el tratamiento antibiótico se recomienda adicionar terapia empírica con macrólido"
        },
        {
          "donde": "Punto de buena práctica (pregunta 12)",
          "texto": "Evitar el uso de quinolonas en pacientes adultos con diagnóstico de NAC, debido a su impacto en la resistencia antimicrobiana y efectos adversos graves."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f04",
      "title": "CONFIDENCE: finerenona + empagliflozina en ERC con DM2",
      "badge": "Ensayo NEJM 2025",
      "src": "confidence",
      "thresholds": [
        {
          "label": "Población",
          "val": "ERC (TFGe 30–90) con albuminuria y DM2, ya con IECA o ARA II"
        },
        {
          "label": "Diseño",
          "val": "Aleatorizado 1:1:1, doble ciego, comparador activo"
        },
        {
          "label": "Desenlace primario",
          "val": "Cambio de la albúmina/creatinina urinaria a 180 días (sustituto)"
        },
        {
          "label": "Combinación vs finerenona",
          "val": "29 % más reducción (razón 0,71; IC 95 % 0,61–0,82)"
        },
        {
          "label": "Combinación vs empagliflozina",
          "val": "32 % más reducción (razón 0,68; IC 95 % 0,59–0,79)"
        },
        {
          "label": "Seguridad",
          "val": "Poco frecuentes: hipotensión, lesión renal aguda e hiperpotasemia que obligaran a suspender"
        }
      ],
      "redFlag": "La caída temprana de la TFGe fue mayor con la combinación, pero en su mayoría reversible al suspender.",
      "trap": "Es un desenlace sustituto a 6 meses: no demuestra menos diálisis ni menos eventos cardiovasculares.",
      "cita": [
        {
          "donde": "Resumen, métodos",
          "texto": "We randomly assigned participants with chronic kidney disease (estimated glomerular filtration rate [eGFR], 30 to 90 ml per minute per 1.73 m2 of body-surface area), albuminuria (a urinary albumin-to-creatinine ratio of 100 to ≤5000 [with albumin measured in milligrams and creatinine measured in grams]), and type 2 diabetes, who were already taking a renin–angiotensin system inhibitor, in a 1:1:1 ratio"
        },
        {
          "donde": "Métodos, diseño",
          "texto": "was a double-blind, randomized, active-controlled trial of finerenone alone, empagliflozin alone, or the combination of the two therapies"
        },
        {
          "donde": "Resumen, métodos",
          "texto": "The primary outcome was the relative change in the log-transformed mean urinary albumin-to-creatinine ratio from baseline to 180 days."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "At day 180, the reduction in the urinary albumin-to-creatinine ratio with combination therapy was 29% greater than that with finerenone alone (least-squares mean ratio of the difference in the change from baseline, 0.71; 95% confidence interval [CI], 0.61 to 0.82; P<0.001) and 32% greater than that with empagliflozin alone (least-squares mean ratio of the difference in the change from baseline, 0.68; 95% CI, 0.59 to 0.79; P<0.001)."
        },
        {
          "donde": "Resumen, resultados",
          "texto": "Symptomatic hypotension, acute kidney injury, and hyperkalemia leading to drug discontinuation were uncommon."
        },
        {
          "donde": "Resultados, seguridad",
          "texto": "Most of the early decline in the eGFR was reversible with drug discontinuation at 180 days."
        },
        {
          "donde": "Discusión, limitaciones",
          "texto": "The trial used a surrogate end point, and we did not follow the participants long enough to adequately measure differences among groups in cardiovascular outcomes or clinical kidney disease progression."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f05",
      "title": "TEP: cómo confirmarlo o descartarlo",
      "badge": "AHA/ACC 2026",
      "src": "tep26",
      "thresholds": [
        {
          "label": "Probabilidad < 50 %",
          "val": "Dímero D ajustado por edad (edad × 10 μg/L desde los 50 años)"
        },
        {
          "label": "YEARS sin criterios",
          "val": "Umbral de dímero D 1000 μg/L"
        },
        {
          "label": "YEARS con ≥ 1 criterio",
          "val": "Umbral 500 μg/L (TVP, hemoptisis, TEP más probable)"
        },
        {
          "label": "Probabilidad > 50 %",
          "val": "Imagen directa: angioTC (preferida sobre V/Q)"
        },
        {
          "label": "No puede angioTC",
          "val": "Gammagrafía V/Q (mejor SPECT) antes que angioRM"
        },
        {
          "label": "Ecocardiograma",
          "val": "No confirma ni descarta el TEP"
        }
      ],
      "redFlag": "Gestante con criterios YEARS y radiografía normal: angioTC de baja dosis.",
      "trap": "Corte fijo de 500 μg/L en ancianos: más angioTC innecesarias sin ganar seguridad.",
      "cita": [
        {
          "donde": "Evaluación clínica, recomendación 2 (2a, B-R)",
          "texto": "In adult patients undergoing evaluation for PE and who have a low or intermediate clinical probability of PE (<50%) by risk assessment, an age-adjusted D-dimer value below the threshold (age × 10 μg/L for fibrinogen equivalent units assays) effectively excludes PE and the need for imaging."
        },
        {
          "donde": "Evaluación clínica, nota del algoritmo YEARS",
          "texto": "YEARS algorithm: A D-dimer threshold of 500 μg/L in patients who have ≥1 of the following: 1) clinical signs of DVT; 2) hemoptysis; and/or 3) PE as the most likely diagnosis. A D-dimer threshold of 1000 μg/L is used for patients who have no YEARS criteria."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 1 (1, A)",
          "texto": "In patients presenting with symptoms and signs suggestive of acute PE, imaging is recommended for those who are deemed high probability (>50% probability of PE) by a validated clinic risk prediction score or an elevated D-dimer level in order to confirm or exclude PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 3 (1, B-R)",
          "texto": "In patients undergoing imaging evaluation, a CTPA is recommended in preference to a V/Q scan to confirm the diagnosis of acute PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 6 (2a, B-R)",
          "texto": "In patients with suspected acute PE who cannot undergo a CTPA, it is reasonable to perform a V/Q scan in preference to contrast-enhanced magnetic resonance angiography (MRA) to improve the diagnostic yield."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 5 (2a, B-R)",
          "texto": "In patients undergoing evaluation for PE, V/Q single-photon emission computed tomography (SPECT) is reasonable in preference to a planar V/Q scan as a diagnostic study."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 9 (3: sin beneficio, B-NR)",
          "texto": "In patients with suspected acute PE, an echocardiogram is not recommended to confirm or refute the diagnosis of PE."
        },
        {
          "donde": "Pruebas diagnósticas, recomendación 4 (2a, B-NR)",
          "texto": "In pregnant patients presenting with symptoms, YEARS criteria suggestive of acute PE, and a normal chest x-ray, imaging evaluation with lowradiation dose CTPA is reasonable over low-dose perfusion scintigraphy."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f06",
      "title": "Doble antiagregación: elegir y dosificar el riesgo",
      "badge": "Antiagregación",
      "src": "acc_antiag26",
      "thresholds": [
        {
          "label": "Prasugrel vs clopidogrel (SCA + ICP)",
          "val": "Menos eventos (12,1 → 9,9 %), más sangrado mayor (1,8 → 2,4 %)"
        },
        {
          "label": "Prasugrel: no usar",
          "val": "ACV o AIT previo (daño neto)"
        },
        {
          "label": "Prasugrel: sin beneficio neto",
          "val": "≥ 75 años o < 60 kg"
        },
        {
          "label": "PRECISE-DAPT ≥ 25",
          "val": "Alto riesgo de sangrado: considerar doble antiagregación < 12 meses"
        },
        {
          "label": "SCA + anticoagulante oral",
          "val": "Aspirina solo 1–4 semanas; luego clopidogrel + anticoagulante"
        },
        {
          "label": "Aspirina en prevención primaria",
          "val": "No de rutina; solo en muy alto riesgo isquémico"
        }
      ],
      "redFlag": "Triple terapia más allá de 4 semanas: el sangrado sube sin ganancia clara.",
      "trap": "Elegir el antiagregante más potente sin estimar el riesgo de sangrado.",
      "cita": [
        {
          "donde": "TRITON-TIMI 38 · Resumen, resultados",
          "texto": "The primary efficacy end point occurred in 12.1% of patients receiving clopidogrel and 9.9% of patients receiving prasugrel (hazard ratio for prasugrel vs. clopidogrel, 0.81; 95% confidence interval [CI], 0.73 to 0.90; P<0.001)."
        },
        {
          "donde": "TRITON-TIMI 38 · Resumen, resultados",
          "texto": "Major bleeding was observed in 2.4% of patients receiving prasugrel and in 1.8% of patients receiving clopidogrel (hazard ratio, 1.32; 95% CI, 1.03 to 1.68; P = 0.03)."
        },
        {
          "donde": "TRITON-TIMI 38 · Resultados, beneficio clínico neto",
          "texto": "patients who had a previous stroke or transient ischemic attack had net harm from prasugrel (hazard ratio, 1.54; 95% CI, 1.02 to 2.32; P = 0.04), patients 75 years of age or older had no net benefit from prasugrel (hazard ratio, 0.99; 95% CI, 0.81 to 1.21; P = 0.92), and patients weighing less than 60 kg had no net benefit from prasugrel (hazard ratio, 1.03; 95% CI, 0.69 to 1.53; P = 0.89)."
        },
        {
          "donde": "PRECISE-DAPT · Discusión",
          "texto": "PRECISE-DAPT score showed potential to identify patients at high bleeding risk (score ≥25) who might benefit from a shortened (ie, <12 months) DAPT duration."
        },
        {
          "donde": "Tabla de recomendaciones: necesidad de anticoagulante oral (2025 ACC/AHA SCA, clase 1)",
          "texto": "In patients with ACS who require oral anticoagulant therapy, aspirin should be discontinued after 1–4 wks of triple antithrombotic therapy, with continued use of a P2Y12 inhibitor (preferably clopidogrel) and an oral anticoagulant to reduce bleeding risk."
        },
        {
          "donde": "Resumen",
          "texto": "Recent data do not support a benefit for primary prevention of ASCVD in unselected populations with routine aspirin use; consideration should be reserved for those at highest ischemic risk."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f07",
      "title": "Hidrocefalia de presión normal idiopática",
      "badge": "JAMA 2026",
      "src": "jama_inph",
      "thresholds": [
        {
          "label": "Marcha",
          "val": "Base amplia, lenta, «magnética», con mal giro: 85–95 %, suele ser lo primero"
        },
        {
          "label": "Orina",
          "val": "Urgencia, nicturia o incontinencia: 75–90 %"
        },
        {
          "label": "Cognición",
          "val": "Atención y velocidad de procesamiento: 60–80 %"
        },
        {
          "label": "Imagen",
          "val": "Ventriculomegalia; índice de Evans a menudo > 0,30"
        },
        {
          "label": "Prueba clave",
          "val": "Punción lumbar de 30–50 mL con medición objetiva de la marcha"
        },
        {
          "label": "Tratamiento",
          "val": "Derivación de LCR, sobre todo ventriculoperitoneal"
        }
      ],
      "redFlag": "La imagen es necesaria para el diagnóstico, pero no predice quién responde a la derivación.",
      "trap": "Confundirla con Parkinson (marcha de base estrecha) o Alzheimer, que además coexisten en 20–30 %.",
      "cita": [
        {
          "donde": "Resumen, observaciones",
          "texto": "Gait disturbance, including a broad-based, slow, shuffling gait and impaired turning, occurs in 85% to 95% of patients with iNPH and is often the earliest symptom."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Urinary dysfunction occurs in approximately 75% to 90% of patients with iNPH and commonly includes urgency, nocturia, urge incontinence, or leakage."
        },
        {
          "donde": "Tabla: diagnóstico diferencial",
          "texto": "Evans index often >0.30 (CT/MRI)"
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Patients being evaluated for iNPH should undergo large-volume lumbar puncture with removal of 30 to 50 mL of CSF to confirm the diagnosis and predict shunt responsiveness, measured as improvement in objective gait measures starting within hours after drainage."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "iNPH is diagnosed primarily based on characteristic clinical findings and neuroimaging (typically brain magnetic resonance imaging) demonstrating cerebral ventricular and subarachnoid space enlargement. Although necessary for diagnosis, these neuroimaging findings are not reliably associated with response to treatment."
        },
        {
          "donde": "Tratamiento",
          "texto": "Treatment for iNPH is CSF diversion with shunt placement, most commonly performed with ventriculoperitoneal shunts, although ventriculoatrial and lumboperitoneal shunts may have similar efficacy."
        },
        {
          "donde": "Tabla: diagnóstico diferencial (Parkinson)",
          "texto": "Narrow-based shuffling gait"
        },
        {
          "donde": "Diagnóstico diferencial",
          "texto": "Symptoms of iNPH may be attributed to normal aging or misdiagnosed as Parkinson disease or Alzheimer disease, which are present in 20% to 30% of patients with iNPH and may have overlapping clinical features such as gait disturbance and cognitive dysfunction."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f08",
      "title": "Dolor neuropático: diagnóstico y primera línea",
      "badge": "Nat Rev Dis Primers",
      "src": "nrdp_np",
      "thresholds": [
        {
          "label": "Definición",
          "val": "Lesión o enfermedad del sistema somatosensorial"
        },
        {
          "label": "Posible",
          "val": "Historia compatible y distribución neuroanatómica plausible"
        },
        {
          "label": "Probable",
          "val": "+ signos sensitivos en el examen: ya se trata"
        },
        {
          "label": "Definitivo",
          "val": "+ prueba objetiva (neurofisiología, biopsia de piel)"
        },
        {
          "label": "Primera línea",
          "val": "Pregabalina, gabapentina, duloxetina, tricíclicos"
        },
        {
          "label": "Tamizaje",
          "val": "DN4 o LANSS"
        }
      ],
      "redFlag": "Alodinia: dolor por un estímulo que normalmente no duele.",
      "trap": "Esperar la confirmación objetiva para empezar el tratamiento.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "Neuropathic pain is caused by a lesion or disease of the somatosensory system, including peripheral fibres (Aβ, Aδ and C fibres) and central neurons, and affects 7–10% of the general population."
        },
        {
          "donde": "Diagnóstico: sistema de graduación",
          "texto": "If the patient’s history suggests the presence of a neurological lesion or disease and the pain could be related to such (for example, using validated screening tools) and the pain distribution is neuroanatomically plausible, the pain is termed ‘possible’ neuropathic pain."
        },
        {
          "donde": "Diagnóstico: sistema de graduación",
          "texto": "‘Probable’ neuropathic pain requires supporting evidence obtained by a clinical examination of sensory signs (for example, bedside testing and quantitative sensory testing). ‘Definite’ neuropathic pain requires that an objective diagnostic test confirms the lesion or disease of the somatosensory nervous system (for example, neurophysiological tests and skin biopsy). A minimum finding of probable neuropathic pain should lead to treatment."
        },
        {
          "donde": "Tratamiento de primera línea",
          "texto": "pregabalin (a GABA analogue), gabapentin (a GABA inhibitor), duloxetine (a serotonin–noradrenaline reuptake inhibitor) and various tricyclic antidepressants have strong recommendations for use and are recommended as first-line treatments for peripheral and central neuropathic pain."
        },
        {
          "donde": "Epidemiología: herramientas de tamizaje",
          "texto": "In using screening tools, such as the Douleur Neuropathique 4 questions (DN4) or the Leeds Assessment of Neuropathic Symptoms and Signs (LANSS) pain scale"
        },
        {
          "donde": "Glosario",
          "texto": "Allodynia Pain caused by a normally non-painful stimulus."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f09",
      "title": "Demencia: cómo se diagnostica",
      "badge": "JAMA 2019",
      "src": "jama_dem",
      "thresholds": [
        {
          "label": "Definición",
          "val": "Pérdida adquirida en varios dominios cognitivos que afecta la función social o laboral"
        },
        {
          "label": "Historia",
          "val": "Deterioro y actividades diarias, corroborado por un familiar o amigo"
        },
        {
          "label": "Tamizaje MoCA",
          "val": "< 24 puntos: evaluación de seguimiento"
        },
        {
          "label": "Examen dudoso",
          "val": "Pruebas neuropsicológicas"
        },
        {
          "label": "Neuroimagen",
          "val": "Atrofia focal, infartos o tumor"
        },
        {
          "label": "Atípica (< 65 años, rápida)",
          "val": "Considerar LCR o pruebas genéticas"
        }
      ],
      "redFlag": "Focalidad neurológica en el examen: piensa en ACV.",
      "trap": "Suponer una sola causa: lo habitual es Alzheimer más enfermedad cerebrovascular.",
      "cita": [
        {
          "donde": "Resumen, observaciones",
          "texto": "Dementia is an acquired loss of cognition in multiple cognitive domains sufficiently severe to affect social or occupational function."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Diagnosing dementia requires a history evaluating for cognitive decline and impairment in daily activities, with corroboration from a close friend or family member, in addition to a thorough mental status examination by a clinician"
        },
        {
          "donde": "Evaluación cognitiva",
          "texto": "One commonly used screening tool is the Montreal Cognitive Assessment (MoCA; range, 0-30; follow-up evaluation to screening recommended if score is <24)."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "if the assessment is inconclusive (eg, symptoms present, but normal examination findings), neuropsychological testing can help determine whether dementia is present."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Brain neuroimaging may demonstrate structural changes including, but not limited to, focal atrophy, infarcts, and tumor, that may not be identified on physical examination."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Additional evaluation with cerebrospinal fluid assays or genetic testing may be considered in atypical dementia cases, such as age of onset younger than 65 years, rapid symptom onset, and/or impairment in multiple cognitive domains but not episodic memory."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Dementia is commonly associated with more than 1 neuropathology, usually Alzheimer disease with cerebrovascular pathology."
        },
        {
          "donde": "Resumen, observaciones",
          "texto": "Physical examination may help identify the etiology of dementia. For example, focal neurologic abnormalities suggest stroke."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "mi-f10",
      "title": "Tiñas: diagnóstico y tratamiento",
      "badge": "AFP 2025",
      "src": "afp_tinea",
      "thresholds": [
        {
          "label": "Diagnóstico",
          "val": "KOH con microscopía directa, cuando sea posible"
        },
        {
          "label": "Onicomicosis",
          "val": "Confirmar antes de tratar (KOH, cultivo, PAS o PCR)"
        },
        {
          "label": "Onicomicosis: tratamiento",
          "val": "Terbinafina oral"
        },
        {
          "label": "Tiña de la cabeza",
          "val": "Terbinafina oral (cursos más cortos que griseofulvina)"
        },
        {
          "label": "Tiña crural",
          "val": "Respeta el escroto; si lo compromete, piensa en candidiasis"
        },
        {
          "label": "Sin pruebas ni dermatólogo",
          "val": "Prueba de 2 semanas con antimicótico tópico sin corticoide"
        }
      ],
      "redFlag": "Kerion: tratar pronto para evitar cicatriz y alopecia permanente.",
      "trap": "Cremas que combinan antimicótico y corticoide: generalmente se deben evitar.",
      "cita": [
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "When feasible, in-office diagnostic testing (eg, potassium hydroxide preparation with direct microscopy) should be used for the diagnosis of tinea infection."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "Before initiating treatment, suspected onychomycosis should be confirmed with diagnostic testing, such as potassium hydroxide preparation, culture, periodic acid– Schiff stain, or polymerase chain reaction."
        },
        {
          "donde": "Recomendaciones clave (A)",
          "texto": "Oral terbinafine is preferred for onychomycosis because it is well-tolerated, inexpensive, and more effective than other agents."
        },
        {
          "donde": "Recomendaciones clave (A)",
          "texto": "Terbinafine is preferred for the treatment of tinea capitis, with shorter treatment courses than griseofulvin."
        },
        {
          "donde": "Tiña crural",
          "texto": "The scrotum typically is spared, and scrotal involvement may help differentiate tinea cruris from candidiasis."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "When diagnostic testing or dermatology referral is impractical for suspected tinea corporis, a 2-week trial of topical antifungal therapy (without a corticosteroid component), with follow-up to document improvement, should be considered."
        },
        {
          "donde": "Tiña de la cabeza",
          "texto": "Prompt treatment of kerion is critical to prevent scarring and permanent hair loss."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "Combination antifungal-corticosteroid products, such as clotrimazole- betamethasone, generally should be avoided."
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
