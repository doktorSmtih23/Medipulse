// Toxicología: contenido incluido en la app · paquete "toxicologia" (módulo aparte; aún no entra al diagnóstico).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Toxicología",
  "prefijo": "tox",
  "paquete": "toxicologia",
  "actualizado": "2026-11-27",
  "revision": "verificada",
  "casos": [
    {
      "id": "tox-c01",
      "topic": "Acetaminofén · Nivel sobre la línea de tratamiento",
      "difficulty": "residencia",
      "src": "dart_apap23",
      "vignette": "Mujer de 23 años que ingirió acetaminofén en un intento suicida; la hora es confiable. Llega asintomática. El nivel sérico tomado a las <span class='hy'>6 horas</span> de la ingesta es de <span class='hy'>160 µg/mL</span>, por encima de la línea de tratamiento del nomograma. Las transaminasas son normales. ¿Qué haces?",
      "options": [
        "Esperar a que suban las transaminasas para tratar",
        "Acetilcisteína: al menos 300 mg/kg en 20 a 24 h",
        "Repetir el nivel en 4 horas antes de decidir",
        "Carbón activado y alta si sigue asintomática"
      ],
      "correct": 1,
      "whyCorrect": "Un nivel tomado entre las 4 y las 24 horas que cae en la línea de tratamiento o por encima obliga a iniciar acetilcisteína, con un esquema que dé al menos 300 mg/kg en las primeras 20 a 24 horas. No se espera a que suban las transaminasas.",
      "pearl": "La línea de tratamiento empieza en 150 µg/mL a las 4 horas; la de alto riesgo, en 300 µg/mL.",
      "trap": "Esperar el daño hepático o repetir el nivel cuando ya está sobre la línea.",
      "cita": [
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, figura 2",
          "texto": "Acetylcysteine should be initiated if a serum or plasma acetaminophen blood concentration drawn 4 to 24 hours after ingestion falls on or above the treatment line."
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, administración de acetilcisteína",
          "texto": "The panel recommended use of a regimen that delivers at least 300 mg/kg orally or intravenously during the first 20 to 24 hours of treatment."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: con el nivel sobre la línea se trata ya; no se esperan las transaminasas.",
        "Correcta: el nivel a las 6 horas está sobre la línea de tratamiento, así que se inicia acetilcisteína (mínimo 300 mg/kg en 20 a 24 h).",
        "No: un nivel entre 4 y 24 horas sobre la línea ya es indicación de acetilcisteína.",
        "No: el carbón no reemplaza a la acetilcisteína cuando el nivel está sobre la línea."
      ]
    },
    {
      "id": "tox-c02",
      "topic": "Acetaminofén · Hora de ingesta desconocida",
      "difficulty": "dificil",
      "src": "dart_apap23",
      "vignette": "Hombre de 31 años hallado en su casa junto a un frasco vacío de acetaminofén. Está somnoliento por alcohol y <span class='hy'>no sabe a qué hora tomó las tabletas</span>: pudo ser anoche o esta mañana. Nivel de acetaminofén <span class='hy'>40 µg/mL</span>; AST y ALT normales. ¿Qué haces?",
      "options": [
        "Graficar el nivel en el nomograma asumiendo 4 horas",
        "No tratar: 40 µg/mL queda bajo la línea a toda hora",
        "Repetir el nivel en 4 horas y decidir con ese valor",
        "Iniciar acetilcisteína hasta cumplir los criterios"
      ],
      "correct": 3,
      "whyCorrect": "Si la hora de la ingesta no es confiable, no se usa el nomograma: se sigue la ruta de historia desconocida. En ella, un nivel mayor de 10 µg/mL o transaminasas anormales indican acetilcisteína. Ante la duda, el consenso prefiere tratar.",
      "pearl": "Historia dudosa = historia desconocida. El nomograma solo sirve con la hora de ingesta confiable.",
      "trap": "Inventar una hora de ingesta para poder usar el nomograma.",
      "cita": [
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, manejo de la ingesta aguda",
          "texto": "If in doubt, the history should be considered unreliable, and the pathway for unreliable or unknown history should be followed (Figure 1)."
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, figura 1 (historia poco confiable o desconocida)",
          "texto": "Acetaminophen concentration >10 μg/mL or AST/ALT abnormal"
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, discusión",
          "texto": "it is recommended that if there is any doubt about the history, the patient receive acetylcysteine."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: sin una hora confiable el nomograma no se puede usar.",
        "No: con la hora desconocida no se compara con la línea; un nivel mayor de 10 µg/mL basta para tratar.",
        "No: con historia desconocida y un nivel mayor de 10 µg/mL se inicia el tratamiento, no se espera.",
        "Correcta: historia desconocida y nivel mayor de 10 µg/mL indican acetilcisteína hasta cumplir los criterios para suspenderla."
      ]
    },
    {
      "id": "tox-c03",
      "topic": "Acetaminofén · Ingesta supraterapéutica repetida",
      "difficulty": "residencia",
      "src": "dart_apap23",
      "vignette": "Mujer de 46 años con absceso dental que tomó <span class='hy'>5 g de acetaminofén al día durante 4 días</span>. Consulta por vómito y dolor en el hipocondrio derecho. Nivel de acetaminofén 12 µg/mL; <span class='hy'>ALT 420 U/L</span>. ¿Qué haces?",
      "options": [
        "Acetilcisteína hasta los criterios de suspensión",
        "Graficar el nivel en el nomograma de Rumack-Matthew revisado",
        "No tratar: el nivel es menor de 20 µg/mL",
        "Carbón activado en dosis única y nuevo nivel"
      ],
      "correct": 0,
      "whyCorrect": "Es una ingesta supraterapéutica repetida (más de 24 horas): el nomograma no aplica. Se da acetilcisteína si el nivel es de 20 µg/mL o más o si las transaminasas están alteradas; aquí la ALT está en 420.",
      "pearl": "Más de 48 horas por encima de 4 g/día (o 100 mg/kg/día) es ingesta riesgosa; no se recomienda descontaminación intestinal.",
      "trap": "Usar el nomograma o fiarse de un nivel bajo cuando las transaminasas ya subieron.",
      "cita": [
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, ingesta supraterapéutica repetida",
          "texto": "If the acetaminophen concentration is greater than 20 μg/mL (to convert to micromoles per liter, multiply by 6.614) or the aspartate aminotransferase or alanine aminotransferase level is abnormal, acetylcysteine should be administered until stopping criteria are met."
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, figura 4",
          "texto": "The revised nomogram should not be used for assessment of repeated ingestions that span more than 24 hours."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "Correcta: la ALT alterada basta para indicar acetilcisteína en la ingesta repetida, aunque el nivel sea bajo.",
        "No: el nomograma no se usa en ingestas repetidas de más de 24 horas.",
        "No: el nivel menor de 20 µg/mL no excluye; la ALT alterada indica tratar.",
        "No: en la ingesta repetida no se recomienda descontaminación intestinal."
      ]
    },
    {
      "id": "tox-c04",
      "topic": "Acetaminofén · Criterios para suspender la acetilcisteína",
      "difficulty": "avanzada",
      "src": "dart_apap23",
      "vignette": "Hombre de 20 años con sobredosis aguda de acetaminofén que completó <span class='hy'>21 horas de acetilcisteína IV</span>. Antes de terminar la infusión: nivel menor de 10 µg/mL, ALT 380 U/L (ayer 520) e <span class='hy'>INR 2,4</span>. Está bien. ¿Qué haces?",
      "options": [
        "Suspenderla: ya completó el protocolo de 21 horas",
        "Suspenderla: el nivel ya es menor de 10 µg/mL",
        "Seguir a 6,25 mg/kg/h o más y repetir pruebas",
        "Suspenderla y aplicar vitamina K por el INR"
      ],
      "correct": 2,
      "whyCorrect": "La acetilcisteína no se suspende por tiempo sino por criterios: nivel menor de 10 µg/mL, INR menor de 2,0, transaminasas normales o en descenso y paciente bien. Con INR de 2,4 se continúa la infusión a 6,25 mg/kg/h o más y se repiten las pruebas cada 12 a 24 horas.",
      "pearl": "Error frecuente y potencialmente fatal: suspender a las 20 o 21 horas sin reevaluar.",
      "trap": "Suspender al terminar las 21 horas del inserto.",
      "cita": [
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, figura 3 (criterios para suspender)",
          "texto": "Acetaminophen concentration <10 μg/mL • INR <2.0 • ALT/AST normal for patient or if elevated have decreased"
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, figura 3",
          "texto": "Continue IV NAC at rate of at least 6.25 mg/kg/h • Draw acetaminophen concentration, AST/ALT, and PT/INR every 12-24 h"
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, administración de acetilcisteína",
          "texto": "A common clinical error is to administer acetylcysteine for a period of 20 or 21 hours and then discontinue without reassessment of the patient."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: la duración la deciden los criterios de suspensión, no las 21 horas.",
        "No: el nivel cumple, pero el INR de 2,4 no (debe ser menor de 2,0).",
        "Correcta: el INR sigue en 2,0 o más, así que se continúa a 6,25 mg/kg/h o más y se repiten las pruebas en 12 a 24 h.",
        "No: el INR alto refleja el daño hepático y obliga a seguir con acetilcisteína."
      ]
    },
    {
      "id": "tox-c05",
      "topic": "Acetaminofén · Hemodiálisis",
      "difficulty": "avanzada",
      "src": "dart_apap23",
      "vignette": "Mujer de 28 años que ingirió una cantidad masiva de acetaminofén. Llega estuporosa, con <span class='hy'>pH 7,12</span> y lactato alto. Nivel de acetaminofén <span class='hy'>950 µg/mL</span>. Ya recibe acetilcisteína IV. ¿Qué agregas?",
      "options": [
        "Fomepizol de rutina junto a la acetilcisteína",
        "Hemodiálisis y acetilcisteína a ≥12,5 mg/kg/h",
        "Carbón activado en dosis múltiples por sonda",
        "Trasplante hepático urgente sin más medidas"
      ],
      "correct": 1,
      "whyCorrect": "Con un nivel de 900 µg/mL o más y acidosis o alteración de la conciencia por el acetaminofén se recomienda hemodiálisis además de la acetilcisteína. Durante la diálisis, la infusión IV debe ir a 12,5 mg/kg/h o más.",
      "pearl": "El esquema oral de acetilcisteína no requiere ajuste durante la hemodiálisis.",
      "trap": "Pensar que la acetilcisteína sola basta en la ingesta masiva con acidosis.",
      "cita": [
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, eliminación extracorpórea",
          "texto": "Hemodialysis is recommended in addition to treatment with acetylcysteine in a patient with an acetaminophen concentration of 900 μg/mL or greater with acidosis or altered consciousness due to acetaminophen toxic effects. If the intravenous route is used, the rate of acetylcysteine infusion should be at least 12.5 mg/kg per hour during hemodialysis."
        },
        {
          "donde": "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open 2023, discusión",
          "texto": "The panel concluded that the data available did not support a standard recommendation."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: el consenso no encontró datos para recomendar fomepizol de rutina.",
        "Correcta: nivel de 900 µg/mL o más con acidosis y estupor indica hemodiálisis, con la acetilcisteína IV a 12,5 mg/kg/h o más.",
        "No: lo indicado en este escenario es la hemodiálisis, no el carbón en dosis múltiples.",
        "No: el trasplante se consulta ante daño hepático progresivo, no reemplaza la diálisis ni la acetilcisteína."
      ]
    },
    {
      "id": "tox-c06",
      "topic": "Opioides · Depresión respiratoria con pulso",
      "difficulty": "basica",
      "src": "aha_rcp",
      "vignette": "Hombre de 27 años hallado en un baño con una jeringa al lado. Responde solo al dolor, tiene <span class='hy'>frecuencia respiratoria de 4/min</span>, pupilas puntiformes y <span class='hy'>pulso carotídeo claro de 58 lpm</span>. Eres personal de salud entrenado. ¿Qué haces?",
      "options": [
        "Ventilar con bolsa-máscara y administrar naloxona",
        "Iniciar compresiones torácicas de inmediato",
        "Flumazenil IV por una posible coingesta",
        "Dar naloxona y esperar la respuesta para ventilar"
      ],
      "correct": 0,
      "whyCorrect": "En sobredosis de opioides con depresión o paro respiratorio y pulso definido, el reanimador entrenado da ventilaciones con bolsa-máscara y administra un antagonista opioide. No se retrasa el soporte mientras se espera la respuesta a la naloxona.",
      "pearl": "La naloxona puede tardar varios minutos y requerir varias dosis, sobre todo por vía intranasal o IM.",
      "trap": "Esperar la naloxona antes de ventilar.",
      "cita": [
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), recomendación 1",
          "texto": "For trained rescuers assisting an adult or child with suspected opioid overdose who has respiratory depression or respiratory arrest and has a definite pulse, breaths or bag-mask ventilation should be provided."
        },
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), recomendación 3",
          "texto": "For trained rescuers assisting an adult or child with suspected opioid overdose in respiratory arrest with a definite pulse, an opioid antagonist (eg, naloxone) should be administered."
        },
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), recomendación 4",
          "texto": "Lay and trained rescuers should not delay performing standard resuscitation or activating the emergency response system while administering an opioid antagonist (eg, naloxone) or awaiting the person’s response to an opioid antagonist."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "Correcta: tiene pulso definido y casi no respira: ventilación con bolsa-máscara más naloxona.",
        "No: hay pulso definido; lo que falta es ventilación, no compresiones.",
        "No: el antídoto indicado es el antagonista opioide, no el flumazenil.",
        "No: no se retrasa la ventilación mientras se espera la respuesta a la naloxona."
      ]
    },
    {
      "id": "tox-c07",
      "topic": "Opioides · Paro cardiaco",
      "difficulty": "residencia",
      "src": "aha_rcp",
      "vignette": "Mujer de 34 años con sobredosis de heroína presenciada por su pareja. Al llegar, <span class='hy'>no responde, no respira y no tiene pulso</span>. Tienes naloxona intranasal en el maletín. ¿Cuál es la prioridad?",
      "options": [
        "Naloxona intranasal y esperar 2 minutos su efecto",
        "Naloxona en dosis alta antes que el desfibrilador",
        "Solo ventilaciones hasta que actúe la naloxona IN",
        "RCP de alta calidad; naloxona sin interrumpirla"
      ],
      "correct": 3,
      "whyCorrect": "En el paro cardiaco por sospecha de opioides, la prioridad es la RCP de alta calidad con compresiones y ventilaciones. La naloxona puede ser razonable siempre que no interfiera con la RCP; sin gasto cardiaco es poco probable que funcione y no revierte la fibrilación ventricular.",
      "pearl": "Con pulso: ventilar y naloxona. Sin pulso: RCP primero; la naloxona es secundaria.",
      "trap": "Dar prioridad a la naloxona en el paro cardiaco.",
      "cita": [
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), recomendación 5 (2b)",
          "texto": "For lay and trained rescuers, opioid antagonist administration may be reasonable for adults in cardiac arrest with suspected opioid overdose, provided that opioid antagonist (eg, naloxone) administration does not interfere with the delivery of standard resuscitation including high-quality compression-ventilation CPR."
        },
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), texto de apoyo 1, 2 y 4",
          "texto": "Opioid antagonists are extremely unlikely to benefit an adult or child in cardiac arrest who is not receiving CPR and do not reverse VF."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: no se retrasa la RCP esperando el efecto de la naloxona.",
        "No: la naloxona no revierte la fibrilación ventricular; la RCP y la desfibrilación van primero.",
        "No: sin pulso se dan compresiones y ventilaciones, no solo ventilaciones.",
        "Correcta: en paro, RCP de alta calidad; la naloxona solo si no interfiere con ella."
      ]
    },
    {
      "id": "tox-c08",
      "topic": "Opioides · Observación tras la naloxona",
      "difficulty": "residencia",
      "src": "aha_rcp",
      "vignette": "Hombre de 41 años en programa de <span class='hy'>metadona</span> que tomó dosis extra. Llegó con bradipnea y despertó con naloxona IV. A los 40 minutos está alerta, con signos vitales normales, y <span class='hy'>pide el alta</span>. ¿Qué haces?",
      "options": [
        "Alta: lleva más de 30 minutos despierto",
        "Alta sin naloxona y cita por consulta externa",
        "Observarlo: la metadona dura más",
        "Alta si tolera la vía oral y camina sin ayuda"
      ],
      "correct": 2,
      "whyCorrect": "Tras responder a la naloxona, el adulto se observa en el servicio hasta tener bajo riesgo de recaída de la depresión respiratoria, conciencia normal y signos vitales normales. Con un opioide de acción prolongada como la metadona puede requerirse una observación más larga. Al alta se entrega naloxona con educación.",
      "pearl": "Si recae la depresión respiratoria: dosis repetidas de naloxona o infusión IV.",
      "trap": "Dar de alta porque ya despertó: la naloxona se acaba antes que la metadona.",
      "cita": [
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), tras respuesta a antagonistas, recomendación 1",
          "texto": "Adults with opioid overdose who respond to opioid antagonists (eg, naloxone) should be observed in a health care setting until a low risk of recurrent respiratory depression, normal level of consciousness, and normal vital signs are achieved."
        },
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), texto de apoyo",
          "texto": "a period of observation may be required to safely discharge an adult with a life-threatening overdose of a long-acting or sustained-release opioid."
        },
        {
          "donde": "2025 AHA Guidelines for CPR and ECC, Part 10: Special Circumstances (Toxicology: Opioid Overdose), educación y distribución, recomendación 1",
          "texto": "Adults who are treated for opioid overdose should receive an opioid antagonist (eg, naloxone) and teaching at the time of discharge from a health care setting."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: con un opioide de acción prolongada no basta un tiempo fijo corto; se observa hasta tener bajo riesgo de recaída.",
        "No: al alta debe recibir naloxona y educación.",
        "Correcta: la metadona es de acción prolongada; se observa hasta tener bajo riesgo de recaída, conciencia y signos vitales normales.",
        "No: el criterio es el riesgo de recaída de la depresión respiratoria, no tolerar la vía oral."
      ]
    },
    {
      "id": "tox-c09",
      "topic": "Organofosforados · Atropina sin respuesta",
      "difficulty": "residencia",
      "src": "eddleston_op04",
      "vignette": "Agricultor de 38 años que ingirió un insecticida organofosforado. Recibió <span class='hy'>3 mg de atropina IV</span> hace 5 minutos y sigue con crépitos y sibilancias difusas, frecuencia cardiaca de 50 lpm y presión sistólica de 75 mmHg. ¿Cuál es la siguiente dosis de atropina?",
      "options": [
        "6 mg IV: duplicar la dosis",
        "3 mg IV: repetir la misma dosis",
        "1 mg IV cada 5 minutos",
        "Esperar 15 minutos el efecto completo"
      ],
      "correct": 0,
      "whyCorrect": "Si a los 3 a 5 minutos no hay mejoría en los parámetros, se duplica la dosis de atropina y se sigue duplicando mientras no haya respuesta. Repetir la dosis inicial retrasa la atropinización: algunos pacientes requieren decenas o cientos de miligramos.",
      "pearl": "Se titula con 5 signos: auscultación del tórax, frecuencia cardiaca, presión arterial, axilas y pupilas.",
      "trap": "Repetir la dosis inicial en vez de duplicarla.",
      "cita": [
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), continuación de la carga de atropina",
          "texto": "If after 3–5 min a consistent improvement across the five parameters has not occurred, then more atropine is required. Double the dose, and continue to double each time that there is no response [16,17] (Table 1). Do not simply repeat the initial dose of atropine."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "Correcta: sin respuesta a los 5 minutos, se duplica la dosis (de 3 a 6 mg).",
        "No: repetir la dosis inicial retrasa la atropinización; se duplica.",
        "No: dosis menores retrasan aún más la atropinización; se duplica.",
        "No: la atropina actúa en pocos minutos; a los 3 a 5 minutos sin respuesta se duplica."
      ]
    },
    {
      "id": "tox-c10",
      "topic": "Organofosforados · Metas de atropinización",
      "difficulty": "dificil",
      "src": "eddleston_op04",
      "vignette": "Mujer de 30 años con intoxicación por organofosforado. Tras varios bolos de atropina (total 14 mg): <span class='hy'>tórax limpio</span>, FC 92 lpm, PAS 105 mmHg y axilas secas. Las pupilas <span class='hy'>siguen en 1 mm</span>. ¿Qué haces?",
      "options": [
        "Más bolos hasta una FC de 120 a 140 lpm",
        "Infusión: 10–20 % de la carga por hora",
        "Más bolos hasta que se dilaten las pupilas",
        "Suspender la atropina: ya está atropinizada"
      ],
      "correct": 1,
      "whyCorrect": "Las metas son tórax limpio, FC mayor de 80, PAS mayor de 80, axilas secas y pupilas no puntiformes. La dilatación pupilar puede tardar y es razonable esperarla si lo demás mejora. Ya atropinizada, se deja una infusión con el 10–20 % de la dosis total de carga por hora.",
      "pearl": "Una FC de 120 a 140 lpm sugiere toxicidad por atropina, no mejor control.",
      "trap": "Perseguir taquicardia o midriasis con más bolos.",
      "cita": [
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), tabla 2 y notas",
          "texto": "There is no need to aim for a heart rate of 120–140 beats/min. This suggests atropine toxicity rather than simple reversal of cholinergic poisoning."
        },
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), evaluación de la atropinización",
          "texto": "Pupil dilatation is sometimes delayed. Because patients do not die from constricted pupils, and the other parameters may improve more rapidly, it is reasonable to wait for the pupils to dilate."
        },
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), atropina después de la atropinización",
          "texto": "In the infusion, try giving 10–20% of the total amount of atropine that was required to load the patient every hour."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: buscar 120 a 140 lpm sugiere toxicidad por atropina.",
        "Correcta: los parámetros vitales están en meta; se deja infusión con el 10–20 % de la carga por hora.",
        "No: la dilatación pupilar puede tardar y es razonable esperarla.",
        "No: tras la carga se mantiene una infusión para no perder la atropinización."
      ]
    },
    {
      "id": "tox-c11",
      "topic": "Organofosforados · Toxicidad por atropina",
      "difficulty": "dificil",
      "src": "eddleston_op04",
      "vignette": "Hombre de 45 años con infusión de atropina por intoxicación con organofosforado. Ahora está <span class='hy'>agitado y confuso</span>, con temperatura de 38,9 °C, <span class='hy'>ruidos intestinales ausentes</span> y FC de 128 lpm; el tórax está limpio. ¿Qué haces?",
      "options": [
        "Haloperidol IV para controlar la agitación",
        "Doblar la infusión: la agitación es colinérgica",
        "Inmovilizarlo en la cama y seguir igual",
        "Suspender la infusión y reiniciar al 70–80 %"
      ],
      "correct": 3,
      "whyCorrect": "Confusión, fiebre y ausencia de ruidos intestinales juntas indican exceso de atropina. Se suspende la infusión, se revisa cada 30 minutos y, al ceder, se reinicia al 70–80 % de la velocidad previa. Para la agitación se prefiere diazepam y se enfría activamente.",
      "pearl": "No amarrar a un paciente agitado sin sedar: genera calor y puede llevar a paro por hipertermia.",
      "trap": "Leer la agitación como falta de atropina.",
      "cita": [
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), toxicidad por atropina",
          "texto": "The presence of all three suggests that too much atropine is being given. Stop the atropine infusion. Check again after 30 min to see whether the features of toxicity have settled. If not, continue to review every 30 min or so. When they do settle, restart at 70–80% of the previous rate."
        },
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), enfriamiento y sedación",
          "texto": "Diazepam is preferred over haloperidol because large doses of haloperidol may be required in patients receiving atropine."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: se prefiere diazepam; el haloperidol altera la termorregulación y prolonga el QT.",
        "No: confusión, fiebre y sin ruidos intestinales indican exceso de atropina, no falta.",
        "No: amarrar a un paciente agitado sin sedar puede llevar a paro por hipertermia.",
        "Correcta: los tres signos indican toxicidad por atropina; se suspende y se reinicia al 70–80 % al ceder."
      ]
    },
    {
      "id": "tox-c12",
      "topic": "Organofosforados · Síndrome intermedio",
      "difficulty": "avanzada",
      "src": "eddleston_op04",
      "vignette": "Mujer de 33 años en su segundo día de hospitalización por intoxicación con organofosforado; los signos muscarínicos están controlados con atropina. Hoy <span class='hy'>no logra levantar la cabeza de la almohada</span>, tiene taquipnea y usa músculos accesorios. ¿Qué haces?",
      "options": [
        "Doblar el bolo de atropina hasta secar",
        "Corticoide IV por neumonitis química",
        "Medir volúmenes y gases; intubar a tiempo",
        "Fisioterapia de cuello y vigilancia diaria"
      ],
      "correct": 2,
      "whyCorrect": "La debilidad para flexionar el cuello es un signo temprano del síndrome intermedio, que puede progresar a falla respiratoria. Se miden el volumen corriente o minuto y los gases, y un valor acordado localmente dispara la sedación y la intubación profilácticas.",
      "pearl": "El síndrome intermedio causa debilidad proximal con fuerza distal conservada y parálisis de pares craneales.",
      "trap": "Seguir dando atropina: no corrige la debilidad.",
      "cita": [
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), vigilancia de falla respiratoria",
          "texto": "Weakness of neck flexion is common: the patient has difficulty lifting their head off the pillow; subsequent signs include the use of accessory muscles of respiration, nasal flaring, tachypnoea, sweating, cranial nerve palsies and proximal muscle weakness in the limbs with retained distal muscle strength."
        },
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), vigilancia de falla respiratoria",
          "texto": "Measure tidal or minute volume and blood gases, if available. A locally agreed value should act as a trigger for prophylactic sedation and intubation, followed as necessary by ventilation."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: los signos muscarínicos ya están controlados; la debilidad del cuello anuncia el síndrome intermedio.",
        "No: el papel de los corticoides en la neumonitis no se conoce y no trata la falla respiratoria.",
        "Correcta: debilidad del cuello con uso de accesorios: medir volúmenes y gases e intubar de forma profiláctica.",
        "No: estos pacientes pueden progresar a falla respiratoria y requieren vigilancia estrecha."
      ]
    },
    {
      "id": "tox-c13",
      "topic": "Carbamatos · Uso de oximas",
      "difficulty": "residencia",
      "src": "eddleston_op04",
      "vignette": "Adolescente de 16 años que ingirió el raticida ilegal «tres pasitos» (<span class='hy'>aldicarb, un carbamato</span>). Tiene miosis, sudoración profusa y broncorrea. Ya recibe atropina titulada. ¿Qué más indicas?",
      "options": [
        "Atropina titulada, sin oximas",
        "Pralidoxima 30 mg/kg y luego en infusión",
        "Obidoxima 250 mg y luego en infusión",
        "Fisostigmina IV para revertir el cuadro"
      ],
      "correct": 0,
      "whyCorrect": "El manejo inicial del carbamato es el mismo de los organofosforados: estabilizar y atropinizar de forma individual. Pero las oximas no se recomiendan en la intoxicación por carbamatos.",
      "pearl": "Las oximas solo se consideran en organofosforados: pralidoxima 30 mg/kg en 10 a 20 min y luego 8 a 10 mg/kg/h.",
      "trap": "Aplicar oximas en el carbamato como si fuera organofosforado.",
      "cita": [
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), oximas y otras terapias",
          "texto": "Oximes are not recommended for carbamate poisoning."
        },
        {
          "donde": "Eddleston M et al. Crit Care 2004;8:R391 (protocolo de manejo temprano), oximas y otras terapias",
          "texto": "Current World Health Organisation guidelines recommend giving a 30 mg/kg loading dose of pralidoxime over 10–20 min, followed by a continuous infusion of 8–10 mg/kg per hour"
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "Correcta: en el carbamato se titula la atropina y no se recomiendan oximas.",
        "No: es el esquema de pralidoxima para organofosforados; en carbamatos no se recomiendan oximas.",
        "No: la obidoxima también es una oxima; no se recomienda en carbamatos.",
        "No: la fisostigmina inhibe la acetilcolinesterasa y empeoraría el cuadro colinérgico."
      ]
    },
    {
      "id": "tox-c14",
      "topic": "Anticolinérgicos · Antes de la fisostigmina",
      "difficulty": "dificil",
      "src": "hoffman_tox25",
      "vignette": "Adolescente de 15 años que tomó muchas tabletas de difenhidramina. Está <span class='hy'>delirante, rubicundo, con piel seca, midriasis</span> y globo vesical. Consideras fisostigmina. ¿Qué debes tener antes de aplicarla?",
      "options": [
        "Nivel sérico de difenhidramina urgente",
        "ECG sin efecto de tricíclicos",
        "TAC de cráneo simple sin lesiones",
        "Una prueba terapéutica con flumazenil"
      ],
      "correct": 1,
      "whyCorrect": "La fisostigmina puede causar arritmias y muerte si hay toxicidad por antidepresivos tricíclicos. Solo se aplica después de un ECG de 12 derivaciones sin efectos cardiacos de tricíclicos. Debe haber atropina a la cabecera por si se pasa a un exceso colinérgico.",
      "pearl": "«Rojo como un tomate, seco como un hueso, ciego como un murciélago, loco como una cabra y lleno como un frasco».",
      "trap": "Aplicar fisostigmina sin descartar un tricíclico en el ECG.",
      "cita": [
        {
          "donde": "Hoffman RJ, Nillas A. Toxidromes and a general approach to poisoning. Arch Dis Child 2025, toxidrome anticolinérgico",
          "texto": "Physostigmine may cause cardiac dysrhythmia and death in patients with tricyclic antidepressant (TCA) toxicity. Therefore, physostigmine should only be administered after review of a 12- lead ECG is obtained and is confirmed to be absent of any TCA cardiac effects."
        },
        {
          "donde": "Hoffman RJ, Nillas A. Toxidromes and a general approach to poisoning. Arch Dis Child 2025, toxidrome anticolinérgico",
          "texto": "Atropine, a potent and rapidly acting anticholinergic medication, should be available at the bedside when physostigmine is administered"
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: el nivel no decide el uso de fisostigmina; el ECG sí.",
        "Correcta: la fisostigmina solo se aplica tras un ECG sin efectos de tricíclicos.",
        "No: el requisito es el ECG, por el riesgo de arritmias con tricíclicos.",
        "No: el flumazenil es antídoto de benzodiacepinas, no del toxidrome anticolinérgico."
      ]
    },
    {
      "id": "tox-c15",
      "topic": "Benzodiacepinas · Uso de flumazenil",
      "difficulty": "residencia",
      "src": "hoffman_tox25",
      "vignette": "Mujer de 52 años con epilepsia que toma <span class='hy'>alprazolam a diario desde hace años</span>. La traen somnolienta tras tomar muchas tabletas. Responde al estímulo verbal, protege la vía aérea y tiene <span class='hy'>signos vitales normales</span>. ¿Qué haces?",
      "options": [
        "Flumazenil 0,2 mg IV en bolo",
        "Naloxona 2 mg IV en bolo",
        "Carbón activado por sonda",
        "Soporte, sin flumazenil"
      ],
      "correct": 3,
      "whyCorrect": "Coma o somnolencia con signos vitales normales es el toxidrome GABAérgico. El flumazenil puede precipitar abstinencia en pacientes tolerantes y convulsiones; su uso se limita a no tolerantes y se evita en epilepsia. Con depresión del sistema nervioso central, el carbón activado está contraindicado por riesgo de aspiración.",
      "pearl": "El toxidrome GABAérgico se describe como «coma con signos vitales normales».",
      "trap": "Revertir con flumazenil a un paciente tolerante o con epilepsia.",
      "cita": [
        {
          "donde": "Hoffman RJ, Nillas A. Toxidromes and a general approach to poisoning. Arch Dis Child 2025, toxidrome GABAérgico",
          "texto": "Its use should be limited to patients who are not tolerant to benzodiazepines and generally avoided in patients with seizure disorders."
        },
        {
          "donde": "Hoffman RJ, Nillas A. Toxidromes and a general approach to poisoning. Arch Dis Child 2025, descontaminación",
          "texto": "Due to risk of aspiration, AC is contraindicated in patients with compromised airways or CNS depression."
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: es tolerante y tiene epilepsia; el flumazenil puede precipitar abstinencia o convulsiones.",
        "No: no hay depresión respiratoria ni miosis de un toxidrome opioide.",
        "No: con depresión del sistema nervioso central el carbón está contraindicado por aspiración.",
        "Correcta: soporte sin flumazenil por la tolerancia y la epilepsia."
      ]
    },
    {
      "id": "tox-c16",
      "topic": "Tricíclicos · QRS ancho",
      "difficulty": "residencia",
      "src": "vega_afp24",
      "vignette": "Mujer de 35 años que ingirió 30 tabletas de <span class='hy'>amitriptilina</span>. Está somnolienta, con FC de 124 lpm y PA de 92/60 mmHg. El ECG muestra <span class='hy'>QRS de 140 ms</span>. ¿Qué indicas?",
      "options": [
        "Fisostigmina IV para el delirium",
        "Procainamida para el QRS ancho",
        "Bolos de bicarbonato hipertónico",
        "Fenitoína profiláctica para convulsiones"
      ],
      "correct": 2,
      "whyCorrect": "En la toxicidad por bloqueo de canales de sodio (tricíclicos), un QRS mayor de 100 ms se trata con bolos de bicarbonato de sodio hipertónico, repetidos hasta llevar el QRS por debajo de 100 ms. Se evitan la fisostigmina y los antiarrítmicos IA e IC; las convulsiones se tratan con benzodiacepinas.",
      "pearl": "Meta del bicarbonato: QRS menor de 100 ms y pH sérico de 7,5 a 7,55.",
      "trap": "Usar antiarrítmicos IA o IC para el QRS ancho del tricíclico.",
      "cita": [
        {
          "donde": "Vega IL et al. Acute Medication Poisoning. Am Fam Physician 2024, tabla 5 (toxicidad por bloqueadores de canales de sodio)",
          "texto": "hypertonic sodium bicarbonate boluses for prolonged QRS interval (> 100 ms in patient with normal baseline QRS), repeat as needed to decrease the QRS interval to < 100 ms"
        },
        {
          "donde": "Vega IL et al. Acute Medication Poisoning. Am Fam Physician 2024, tabla 5 (toxicidad por bloqueadores de canales de sodio)",
          "texto": "avoid physostigmine and class IA and IC antidysrhythmics"
        },
        {
          "donde": "Vega IL et al. Acute Medication Poisoning. Am Fam Physician 2024, tabla 5 (toxicidad por bloqueadores de canales de sodio)",
          "texto": "Benzodiazepines for seizures (avoid barbiturates and phenytoin)"
        }
      ],
      "verificado": "2026-11-27",
      "porOpcion": [
        "No: en la toxicidad por tricíclicos se evita la fisostigmina.",
        "No: la procainamida es clase IA, que se evita en esta intoxicación.",
        "Correcta: QRS mayor de 100 ms: bolos de bicarbonato hipertónico hasta un QRS menor de 100 ms.",
        "No: para las convulsiones se usan benzodiacepinas y se evita la fenitoína."
      ]
    }
  ],
  "fichas": [],
  "tarjetas": []
});
