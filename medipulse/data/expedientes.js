// Expedientes de juicio clínico para la parte 3 del diagnóstico (diagnostico.js). Cada uno mezcla datos
// que cambian la conducta («señal», s: 1) con datos que distraen («ruido», s: 0): hallazgos incidentales,
// alteraciones crónicas estables y un diagnóstico que ancla. El usuario filtra, resume, prioriza y decide.
// Contenido de elaboración propia; cada decisión cita su fuente. Revisado por un médico antes de publicar.
const EXPEDIENTES = [
{
  k: "delirium", t: "Adulto mayor con confusión aguda", area: "Medicina Interna", icono: "🧓",
  gancho: "Una mujer de 82 años «está rara» desde hace dos días. El uroanálisis salió positivo.",
  doc: [
    {h: "Motivo de consulta", p: "«Mi mamá está confundida y no duerme», refiere la hija."},
    {h: "Enfermedad actual", p: "Mujer de 82 años, independiente para sus actividades hasta hace una semana. Desde hace 2 días está confundida: por momentos somnolienta y por la noche agitada, intenta levantarse y no reconoce la casa. Durante el día tiene ratos en que conversa casi normal. No ha tenido fiebre, disuria, dolor lumbar ni caídas. Come menos. Hace 5 días le formularon difenhidramina 50 mg en la noche para el insomnio y hace 4 días tramadol 50 mg cada 8 horas por dolor de rodilla. Hace 3 semanas le aumentaron la hidroclorotiazida de 12,5 a 25 mg."},
    {h: "Antecedentes", li: ["Hipertensión arterial desde hace 20 años", "Falla cardiaca con fracción de eyección preservada, estable", "Artrosis de rodillas", "Anemia crónica conocida, en estudio ambulatorio (Hb habitual 11,5 g/dL)", "Bloqueo de rama derecha conocido desde 2019"]},
    {h: "Medicamentos", li: ["Hidroclorotiazida 25 mg al día (aumentada hace 3 semanas)", "Losartán 50 mg cada 12 horas", "Difenhidramina 50 mg en la noche (desde hace 5 días)", "Tramadol 50 mg cada 8 horas (desde hace 4 días)"]},
    {h: "Examen físico", p: "PA 132/78 mmHg, FC 84 lpm, FR 16 rpm, T 36,8 °C, SatO₂ 95 % al aire. Mucosas ligeramente secas. Desorientada en tiempo y lugar; no logra decir los meses del año al revés; pierde el hilo de la conversación. Sin rigidez de nuca ni déficit focal. Ruidos cardiacos rítmicos; pulmones sin agregados; abdomen blando, sin dolor; puño percusión lumbar negativa. Edema grado I en tobillos."},
    {h: "Laboratorios", tabla: [["Sodio", "123 mEq/L", "135–145 (hace 2 meses: 138)"], ["Potasio", "3,4 mEq/L", "3,5–5,0"], ["Creatinina", "1,1 mg/dL", "basal 1,0"], ["Glucosa", "110 mg/dL", "70–110"], ["Hemoglobina", "11,8 g/dL", "habitual 11,5"], ["Leucocitos", "8.900 /mm³", "4.500–11.000"], ["PCR", "6 mg/L", "< 5"], ["TSH", "2,1 mUI/L", "0,4–4,0"], ["Uroanálisis", "Leucocitos 10–15 por campo, nitritos positivos, bacterias ++", ""]]},
    {h: "Imágenes y otros", li: ["Tomografía de cráneo simple: atrofia cortical y leucoaraiosis periventricular, sin lesiones agudas", "Radiografía de tórax: índice cardiotorácico levemente aumentado, sin consolidaciones", "Electrocardiograma: ritmo sinusal, bloqueo de rama derecha (igual al de 2019)"]},
    {h: "Nota de enfermería", p: "«Paciente agitada en la noche, se arrancó el catéter. Uroanálisis positivo: ¿iniciamos antibiótico?»"}
  ],
  datos: [
    {t: "Confusión de inicio agudo (2 días) que fluctúa durante el día", s: 1, por: "Inicio agudo y curso fluctuante: es delirium, no demencia."},
    {t: "No logra decir los meses al revés; pierde el hilo", s: 1, por: "La inatención es el núcleo del delirium."},
    {t: "Difenhidramina iniciada hace 5 días", s: 1, por: "Anticolinérgico potente: causa clásica de delirium en adultos mayores."},
    {t: "Tramadol iniciado hace 4 días", s: 1, por: "Opioide que puede causar delirium y contribuir a la hiponatremia."},
    {t: "Sodio 123 (hace 2 meses 138) con tiazida aumentada hace 3 semanas", s: 1, por: "Hiponatremia nueva, probablemente por la tiazida: causa tratable del delirium."},
    {t: "Sin fiebre, disuria ni dolor lumbar; leucocitos y PCR normales", s: 1, por: "Sin síntomas urinarios ni respuesta sistémica: el uroanálisis no explica el cuadro."},
    {t: "Uroanálisis con nitritos y bacterias", s: 0, por: "Bacteriuria asintomática, frecuentísima a esta edad. Es el ancla del caso: no explica el delirium."},
    {t: "Atrofia cortical y leucoaraiosis en la tomografía", s: 0, por: "Hallazgo crónico propio de la edad; no cambia la conducta aguda."},
    {t: "Hemoglobina 11,8", s: 0, por: "Igual a su valor habitual: anemia crónica estable."},
    {t: "Bloqueo de rama derecha", s: 0, por: "Conocido desde 2019, sin cambios."},
    {t: "Índice cardiotorácico levemente aumentado", s: 0, por: "Esperable con su falla cardiaca estable."},
    {t: "Potasio 3,4", s: 0, por: "Levemente bajo por la tiazida; vale corregirlo, pero no explica la confusión."},
    {t: "Edema grado I en tobillos", s: 0, por: "Crónico, estable."}
  ],
  ideas: ["Delirium (inicio agudo, fluctuante, con inatención)", "Fármacos nuevos que lo causan: difenhidramina y tramadol", "Hiponatremia nueva relacionada con el aumento de la tiazida", "Sin infección: la bacteriuria es asintomática y no se trata", "Plan: suspender los fármacos culpables y corregir el sodio con cuidado"],
  problema: {p: "¿Cuál es el problema principal?", o: ["Infección urinaria complicada con delirium", "Delirium multifactorial por fármacos (difenhidramina, tramadol) e hiponatremia por tiazida", "Demencia de Alzheimer en progresión", "Accidente cerebrovascular de pequeño vaso"], c: 1, ancla: 0,
    por: "El cuadro es agudo y fluctuante, con inatención: delirium. Tiene dos causas nuevas y tratables, los fármacos y la hiponatremia. El uroanálisis positivo sin síntomas ni respuesta sistémica es bacteriuria asintomática."},
  decisiones: [
    {p: "La enfermera pregunta si inicia antibiótico por el uroanálisis. ¿Qué respondes?", o: ["Sí, ceftriaxona: la infección urinaria es la causa más común de delirium", "No: es bacteriuria asintomática; se buscan y corrigen otras causas y se vigilan signos de infección", "Sí, pero oral y por 3 días", "Repetir el uroanálisis y tratar si vuelve a salir positivo"], c: 1,
      por: "En el adulto mayor con delirium, sin síntomas urinarios ni signos sistémicos, se recomienda evaluar otras causas en vez de tratar la bacteriuria. Tratarla no mejora el delirium y expone a efectos adversos y resistencia.", fuente: "IDSA 2019, guía de bacteriuria asintomática"},
    {p: "¿Cómo manejas el sodio de 123 mEq/L?", o: ["Bolos de solución salina al 3 % hasta normalizar el sodio hoy", "Restricción hídrica, sin suspender la tiazida", "Suspender la tiazida y corregir de forma controlada, sin subir más de 10 mEq/L en las primeras 24 horas, con sodios seriados", "No hacer nada: es leve"], c: 2,
      por: "Se retira la causa y se corrige de forma controlada: subir el sodio más de 10 mEq/L en las primeras 24 horas arriesga el síndrome de desmielinización osmótica.", fuente: "Guía europea de hiponatremia (ESE/ESICM/ERA-EDTA), 2014"},
    {p: "Para la agitación nocturna, ¿qué indicas?", o: ["Lorazepam en la noche", "Suspender difenhidramina y tramadol, reorientar, gafas y audífonos, familiar acompañante y favorecer el sueño; antipsicótico solo si hay riesgo y a dosis bajas", "Aumentar la difenhidramina a 100 mg", "Sujeción mecánica toda la noche"], c: 1,
      por: "En el delirium se tratan las causas y se usan medidas no farmacológicas; las benzodiacepinas lo empeoran (salvo en abstinencia de alcohol) y los anticolinérgicos lo causan. El antipsicótico se reserva para la angustia o el riesgo, a dosis bajas y por poco tiempo.", fuente: "NICE CG103, Delirium"}
  ]
},
{
  k: "postop", t: "Postoperatorio, día 5, con taquicardia", area: "Cirugía", icono: "🏥",
  gancho: "Un paciente operado del colon tiene fiebre y taquicardia. La radiografía muestra atelectasia.",
  doc: [
    {h: "Motivo de la interconsulta", p: "Ronda de la mañana: «taquicárdico desde anoche, con fiebre baja; en la radiografía tiene atelectasia»."},
    {h: "Contexto", p: "Hombre de 64 años en el día 5 de una hemicolectomía derecha laparoscópica con anastomosis ileocólica por adenocarcinoma de colon. Evolución inicial sin novedades: toleró líquidos el día 2. Desde ayer refiere dolor abdominal difuso «más fuerte que los días anteriores», distensión y náuseas; hoy no tolera la dieta. Desde la noche, taquicardia de 115 a 120 lpm. Diuresis de las últimas 6 horas: 0,3 mL/kg/h."},
    {h: "Antecedentes", li: ["Tabaquismo, 30 paquetes-año (exfumador)", "Hipertensión arterial controlada", "Trombosis venosa profunda en pierna izquierda hace 10 años, tratada 6 meses", "Profilaxis con enoxaparina desde el día 1"]},
    {h: "Examen físico", p: "PA 102/64 mmHg (basal 135/80), FC 118 lpm, FR 22 rpm, T 38,1 °C, SatO₂ 93 % con cánula a 2 L/min. Murmullo vesicular disminuido en la base derecha. Abdomen distendido, doloroso a la palpación difusa, con defensa voluntaria; heridas de los puertos sin eritema. Pantorrillas simétricas, sin dolor."},
    {h: "Laboratorios", tabla: [["Leucocitos", "16.800 /mm³", "día 2: 11.200"], ["PCR", "280 mg/L", "día 3: 150"], ["Lactato", "3,1 mmol/L", "< 2"], ["Creatinina", "1,6 mg/dL", "basal 0,9"], ["Hemoglobina", "10,9 g/dL", "prequirúrgica 13,0"], ["Dímero D", "3.400 ng/mL", "< 500"], ["Magnesio", "1,6 mg/dL", "1,7–2,2"], ["Troponina", "Negativa", ""]]},
    {h: "Imágenes y otros", li: ["Radiografía de tórax: atelectasia laminar basal derecha", "Electrocardiograma: taquicardia sinusal, sin cambios del ST"]},
    {h: "Nota del residente", p: "«Probable fiebre por atelectasia. Plan: incentivo respiratorio y fisioterapia. ¿Pedimos angio-TC por el dímero D alto?»"}
  ],
  datos: [
    {t: "Día 5 de una anastomosis intestinal", s: 1, por: "Es el momento típico de la fuga anastomótica."},
    {t: "Dolor abdominal mayor que los días previos, distensión e intolerancia a la dieta", s: 1, por: "Un postoperatorio que empeora en vez de mejorar sugiere una complicación intraabdominal."},
    {t: "Taquicardia persistente de 115 a 120 lpm", s: 1, por: "La taquicardia es a menudo el primer signo de la fuga."},
    {t: "PCR que sube después del día 3 (150 → 280)", s: 1, por: "La PCR debería bajar desde el día 3; si sube, sospecha una complicación infecciosa."},
    {t: "Leucocitos en ascenso, lactato de 3,1 y PA más baja que la basal", s: 1, por: "Respuesta sistémica e hipoperfusión: sepsis."},
    {t: "Oliguria y creatinina de 1,6 (basal 0,9)", s: 1, por: "Lesión renal aguda: disfunción orgánica."},
    {t: "Atelectasia laminar basal derecha", s: 0, por: "Frecuentísima después de cirugía abdominal. Es el ancla: no explica este cuadro."},
    {t: "Dímero D de 3.400", s: 0, por: "Se eleva por la cirugía y el cáncer: no sirve para orientar el diagnóstico."},
    {t: "Hemoglobina de 10,9 (13,0 antes de la cirugía)", s: 0, por: "Descenso esperable después de la cirugía, sin sangrado activo."},
    {t: "Magnesio de 1,6", s: 0, por: "Levemente bajo, se repone; no explica el cuadro."},
    {t: "Trombosis venosa hace 10 años", s: 0, por: "Aumenta el riesgo de TEP, pero el cuadro abdominal manda; las pantorrillas son normales."},
    {t: "Fiebre de 38,1 °C", s: 1, por: "Al día 5 la fiebre no se atribuye a la atelectasia: hay que buscar la infección."}
  ],
  ideas: ["Sospecha de fuga anastomótica en el día 5", "Sepsis con disfunción orgánica (lactato elevado, lesión renal, PA más baja)", "Señales que la sostienen: dolor e íleo que empeoran y PCR que sube después del día 3", "La atelectasia y el dímero D son distractores", "Plan: reanimar, antibiótico de amplio espectro, TC con contraste y control del foco"],
  problema: {p: "¿Cuál es el problema principal?", o: ["Fiebre por atelectasia", "Tromboembolismo pulmonar", "Fuga de la anastomosis con sepsis", "Íleo postoperatorio prolongado"], c: 2, ancla: 0,
    por: "Al día 5, un abdomen que empeora con taquicardia, PCR en ascenso, lactato elevado y lesión renal es una fuga anastomótica con sepsis hasta demostrar lo contrario. La atelectasia es un hallazgo frecuente que no explica la disfunción orgánica."},
  decisiones: [
    {p: "¿Cuál es el siguiente paso?", o: ["Incentivo respiratorio y fisioterapia, y control en 24 horas", "Angio-TC de tórax por el dímero D elevado", "Reanimación, hemocultivos, antibiótico de amplio espectro y TC de abdomen con contraste", "Suspender la enoxaparina y observar"], c: 2,
      por: "Con sospecha de sepsis de origen abdominal se reanima, se toman cultivos y se da antibiótico sin demora, mientras se confirma el foco con la tomografía. El dímero D no orienta en el postoperatorio.", fuente: "Surviving Sepsis Campaign 2021"},
    {p: "La TC muestra fuga de la anastomosis con líquido libre difuso y neumoperitoneo. Necesita norepinefrina. ¿Qué haces?", o: ["Drenaje percutáneo guiado por imágenes y antibiótico", "Relaparotomía urgente para controlar el foco", "Nutrición parenteral y ayuno, y nueva TC en 48 horas", "Solo antibiótico de amplio espectro"], c: 1,
      por: "Una fuga con peritonitis difusa y choque exige control quirúrgico del foco tan pronto como sea posible. El drenaje percutáneo sirve para colecciones localizadas en pacientes estables.", fuente: "Surviving Sepsis Campaign 2021 (control del foco)"}
  ]
},
{
  k: "preeclampsia", t: "Embarazada de 34 semanas con cefalea", area: "Ginecología y Obstetricia", icono: "🤰",
  gancho: "Una gestante con antecedente de migraña consulta por cefalea y «gastritis».",
  doc: [
    {h: "Motivo de consulta", p: "«Me duele la cabeza desde ayer y tengo la gastritis alborotada»."},
    {h: "Enfermedad actual", p: "Mujer de 29 años, G2P1, con 34 semanas de gestación por ecografía del primer trimestre. Desde ayer tiene cefalea frontal que no mejora con acetaminofén y, desde la madrugada, dolor epigástrico con náuseas. Refiere que «es igual a sus migrañas» y que «la gastritis le dio por comer frito». Percibe bien los movimientos fetales. No ha tenido sangrado, salida de líquido ni contracciones."},
    {h: "Antecedentes", li: ["Migraña sin aura desde la adolescencia", "Gastritis diagnosticada por endoscopia hace 3 años", "Primer parto vaginal a término, sin complicaciones", "Controles prenatales normales; PA de 118/76 en la semana 30"]},
    {h: "Examen físico", p: "PA 162/104 mmHg; repetida a los 15 minutos, 164/108 mmHg. FC 92 lpm, T 36,9 °C. Alerta, sin déficit focal. Dolor a la palpación en epigastrio e hipocondrio derecho. Altura uterina acorde. Edema grado II en piernas. Reflejos osteotendinosos vivos."},
    {h: "Laboratorios", tabla: [["Plaquetas", "92.000 /mm³", "150.000–450.000"], ["AST", "145 U/L", "< 35"], ["ALT", "160 U/L", "< 35"], ["LDH", "720 U/L", "< 250"], ["Creatinina", "0,8 mg/dL", "< 0,9"], ["Proteinuria (tira)", "++", ""], ["Hemoglobina", "11,4 g/dL", "> 11 en el embarazo"], ["Leucocitos", "12.500 /mm³", "hasta ~15.000 en el embarazo"], ["Ácido úrico", "6,8 mg/dL", ""]]},
    {h: "Bienestar fetal", li: ["Monitoreo fetal reactivo", "Ecografía: feto único, peso estimado en percentil 18, líquido amniótico normal"]},
    {h: "Nota de triage", p: "«Gestante con migraña y gastritis conocidas. Se le dio omeprazol y metoclopramida.»"}
  ],
  datos: [
    {t: "PA de 162/104 y 164/108 en dos tomas", s: 1, por: "Hipertensión en rango severo (≥ 160/110): urgencia que se trata ya."},
    {t: "PA de 118/76 en la semana 30", s: 1, por: "Era normal: la hipertensión es nueva, después de la semana 20."},
    {t: "Cefalea persistente que no cede con analgésicos", s: 1, por: "Síntoma de severidad de la preeclampsia, aunque tenga migraña."},
    {t: "Dolor en epigastrio e hipocondrio derecho", s: 1, por: "Dolor por distensión de la cápsula hepática: severidad o HELLP, no gastritis."},
    {t: "Plaquetas en 92.000", s: 1, por: "Trombocitopenia menor de 100.000: criterio de severidad y de HELLP."},
    {t: "AST 145 y ALT 160", s: 1, por: "Transaminasas más del doble de lo normal: compromiso hepático."},
    {t: "LDH en 720", s: 1, por: "Sugiere hemólisis: con lo anterior, completa el síndrome HELLP."},
    {t: "Antecedente de migraña", s: 0, por: "Es el ancla del caso: hace pensar que la cefalea es la de siempre."},
    {t: "Antecedente de gastritis", s: 0, por: "El otro ancla: el epigastrio aquí es hepático."},
    {t: "Edema grado II en piernas", s: 0, por: "Frecuente en el embarazo normal; no es criterio diagnóstico."},
    {t: "Hemoglobina de 11,4 y leucocitos de 12.500", s: 0, por: "Normales para el embarazo."},
    {t: "Ácido úrico de 6,8", s: 0, por: "No es criterio de diagnóstico ni de severidad."}
  ],
  ideas: ["Preeclampsia con criterios de severidad (PA ≥ 160/110, cefalea, dolor epigástrico)", "Síndrome HELLP: hemólisis (LDH alta), transaminasas elevadas y plaquetas menores de 100.000", "La migraña y la gastritis son anclas que retrasan el diagnóstico", "Plan inmediato: sulfato de magnesio y antihipertensivo de acción rápida", "A las 34 semanas, estabilizar y terminar el embarazo"],
  problema: {p: "¿Cuál es el problema principal?", o: ["Migraña y gastritis exacerbadas", "Hipertensión gestacional sin criterios de severidad", "Hígado graso agudo del embarazo", "Preeclampsia con criterios de severidad y síndrome HELLP"], c: 3, ancla: 0,
    por: "Hipertensión nueva en rango severo, cefalea, dolor en hipocondrio derecho, plaquetas menores de 100.000, transaminasas elevadas y LDH alta: preeclampsia severa con HELLP. Los antecedentes de migraña y gastritis no deben explicar síntomas nuevos con esta presión."},
  decisiones: [
    {p: "¿Qué indicas de inmediato?", o: ["Analgésico para la migraña, omeprazol y control en 1 hora", "Sulfato de magnesio para prevenir la eclampsia y antihipertensivo de acción rápida (labetalol IV, nifedipino oral o hidralazina IV)", "Furosemida por los edemas", "Antihipertensivo solo; el magnesio se da si convulsiona"], c: 1,
      por: "La hipertensión en rango severo se trata en los primeros 30 a 60 minutos con un antihipertensivo de acción rápida, y en la preeclampsia con criterios de severidad se da sulfato de magnesio para prevenir la eclampsia, sin esperar la convulsión.", fuente: "ACOG Practice Bulletin 222, 2020"},
    {p: "Ya estabilizada, a las 34 semanas, ¿cuál es el plan?", o: ["Manejo expectante hasta la semana 37 con controles diarios", "Terminar el embarazo después de estabilizarla; la vía según las condiciones obstétricas", "Cesárea inmediata antes de iniciar el magnesio", "Alta con antihipertensivo oral y control en una semana"], c: 1,
      por: "Con preeclampsia severa y HELLP a partir de las 34 semanas se recomienda terminar el embarazo una vez estabilizada la madre; la cesárea no es obligatoria y la vía depende de las condiciones obstétricas.", fuente: "ACOG Practice Bulletin 222, 2020 · NICE NG133"}
  ]
}
];
