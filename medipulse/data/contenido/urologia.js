// Urología: contenido incluido en la app · paquete "urologia" (módulo aparte; aún no entra al diagnóstico).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Urología",
  "prefijo": "uro",
  "paquete": "urologia",
  "actualizado": "2026-11-25",
  "casos": [
    {
      "id": "uro-c01",
      "topic": "Litiasis urinaria · Diagnóstico por imagen",
      "difficulty": "basica",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 38 años con <span class='hy'>dolor lumbar izquierdo súbito, tipo cólico, que irradia a la ingle</span>, con náuseas y hematuria microscópica. No tiene fiebre. ¿Qué estudio es el de referencia para confirmar el cálculo?",
      "options": [
        "Tomografía de abdomen sin contraste",
        "Urografía excretora con medio de contraste",
        "Radiografía simple de abdomen de pie",
        "Ecografía renal y de las vías urinarias"
      ],
      "correct": 0,
      "whyCorrect": "La tomografía sin contraste es el patrón de referencia: muestra el cálculo y los signos secundarios de obstrucción (hidronefrosis, edema perirrenal y aumento del tamaño renal).",
      "pearl": "La ecografía detecta 70 % de los cálculos renales, pero solo 57,3 % de los ureterales: sirve de inicio para ver obstrucción, no para descartar un cálculo en el uréter.",
      "trap": "Quedarse con una ecografía normal o pedir urografía con contraste.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "A non-contrast CT scan is the gold standard for diagnosis of kidney stones and secondary signs of obstruction (hydronephrosis, perinephric stranding and renal engorgement)."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "Ultrasonography has a sensitivity of 70% and specificity of 94% for identifying renal stones, but sensitivity is considerably lower, at 57.3%, for ureteral stones."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "Correcta: la tomografía sin contraste es el patrón de referencia.",
        "No: el patrón de referencia es la tomografía sin contraste.",
        "No: el patrón de referencia es la tomografía sin contraste, que también muestra los signos de obstrucción.",
        "No: la ecografía detecta solo 57,3 % de los cálculos ureterales; no es el patrón de referencia."
      ]
    },
    {
      "id": "uro-c02",
      "topic": "Litiasis urinaria · Cólico renal en el embarazo",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 27 años con <span class='hy'>embarazo de 24 semanas</span> consulta por dolor lumbar derecho tipo cólico que irradia a la ingle. Signos vitales normales, sin fiebre. ¿Cuál es el primer estudio de imagen?",
      "options": [
        "Tomografía de abdomen con baja dosis",
        "Ecografía renal y de vías urinarias",
        "Resonancia magnética de abdomen y pelvis",
        "Urografía excretora con pocas placas"
      ],
      "correct": 1,
      "whyCorrect": "En embarazadas y niños la ecografía es el estudio de elección; la resonancia es la segunda opción y la tomografía de baja dosis, la tercera.",
      "pearl": "Orden en el embarazo: ecografía → resonancia → tomografía de baja dosis.",
      "trap": "Pedir tomografía de entrada porque es el patrón de referencia en la población general.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "Ultrasonography has a sensitivity of 70% and specificity of 94% for identifying renal stones, but sensitivity is considerably lower, at 57.3%, for ureteral stones. This imaging modality can be used initially to detect obstruction. It is the test of choice in sensitive populations, such as pregnant women and children, for whom MRI and low-dose CT are the second-line and third-line options, respectively."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: en el embarazo la tomografía de baja dosis es la tercera opción.",
        "Correcta: en embarazadas la ecografía es el estudio de elección.",
        "No: la resonancia es la segunda opción, después de la ecografía.",
        "No: en el embarazo el orden es ecografía, resonancia y tomografía de baja dosis."
      ]
    },
    {
      "id": "uro-c03",
      "topic": "Litiasis urinaria · Tratamiento según el tamaño",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 50 años con un <span class='hy'>cálculo de 26 mm en la pelvis renal</span> derecha, sintomático, con función renal normal. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Litotricia extracorpórea con ondas de choque",
        "Ureteroscopia flexible con láser y canastilla",
        "Observación con control de imagen en 6 meses",
        "Nefrolitotomía percutánea"
      ],
      "correct": 3,
      "whyCorrect": "Para cálculos mayores de 20 mm la nefrolitotomía percutánea es la primera línea. Hasta 20 mm se proponen la ureteroscopia o la litotricia extracorpórea.",
      "pearl": "En cálculos de polo inferior de hasta 20 mm, sobre todo con anatomía desfavorable o cálculos duros, puede preferirse la ureteroscopia.",
      "trap": "Ofrecer litotricia extracorpórea a un cálculo de más de 20 mm.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Manejo",
          "texto": "For stones ≤20 mm, both ureteroscopy and SWL are proposed in international guidelines, although for lower pole stones ≤20 mm, especially those with unfavourable anatomy or hard stones, ureteroscopy might be preferred. For stones >20 mm, PCNL is the proposed first-line treatment option."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: la litotricia se propone para cálculos de hasta 20 mm.",
        "No: la ureteroscopia se propone para cálculos de hasta 20 mm.",
        "No: es un cálculo sintomático de más de 20 mm; se trata.",
        "Correcta: para cálculos de más de 20 mm la nefrolitotomía percutánea es la primera línea."
      ]
    },
    {
      "id": "uro-c04",
      "topic": "Litiasis urinaria · Prevención: calcio en la dieta",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 44 años con su <span class='hy'>primer cálculo de oxalato de calcio</span>, ya expulsado. Leyó que debe dejar los lácteos y pregunta cuánto calcio puede comer. ¿Qué le recomiendas?",
      "options": [
        "Dieta baja en calcio, menos de 400 mg al día",
        "Suspender todos los productos lácteos de por vida",
        "Calcio de 1 a 1,2 g al día, sin restringirlo",
        "Calcio libre, pero solo en suplementos y nunca con comida"
      ],
      "correct": 2,
      "whyCorrect": "Restringir el calcio aumenta el riesgo: el calcio de la comida se une al oxalato en el intestino; si falta, se absorbe más oxalato y se excreta más por la orina. Se recomienda 1 a 1,2 g/día, sin restricción.",
      "pearl": "La sal sí se limita: 4 a 5 g de cloruro de sodio al día (2.000 mg de sodio).",
      "trap": "Indicar dieta baja en calcio a quien forma cálculos de oxalato de calcio.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "Paradoxically, low dietary calcium intake increases stone risk by reducing intestinal binding of oxalate, leading to increased absorption and urinary oxalate excretion."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "Calcium intake should be 1–1.2 g/day and not restricted."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: restringir el calcio aumenta el riesgo, porque se absorbe más oxalato.",
        "No: el calcio no se restringe; se recomienda 1 a 1,2 g al día.",
        "Correcta: 1 a 1,2 g al día de calcio, sin restringirlo.",
        "No: el calcio de la comida es el que se une al oxalato en el intestino."
      ]
    },
    {
      "id": "uro-c05",
      "topic": "Litiasis urinaria · Prevención: líquidos",
      "difficulty": "basica",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 35 años después de su <span class='hy'>primer episodio de litiasis</span>. Quiere saber cuánto líquido debe tomar para no repetir. ¿Qué meta le indicas?",
      "options": [
        "Orinar 2 a 2,5 L al día (tomar 2,5 a 3 L)",
        "Tomar cerca de 1 litro de agua repartido durante el día",
        "Lograr una diuresis de al menos 1 litro diario",
        "Tomar 5 litros de agua al día o incluso más"
      ],
      "correct": 0,
      "whyCorrect": "La meta es producir 2 a 2,5 L de orina al día, lo que exige tomar 2,5 a 3 L. En un ensayo, lograr al menos 2 L/día de orina bajó la recurrencia de 27,0 % a 12,1 % en 5 años.",
      "pearl": "El agua es la base; los jugos cítricos suman porque aumentan el citrato urinario y alcalinizan la orina.",
      "trap": "Dar una meta de líquidos baja (1 L) o expresarla solo como lo que se toma, sin la diuresis.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "A target of producing 2–2.5 l of urine daily, and therefore fluid intake of 2.5–3 l, is advised."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "increased water intake to achieve ≥2 l/day urine volume reduced stone recurrence from 27.0% to 12.1% (P = 0.008) over 5 years"
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "Correcta: la meta es orinar 2 a 2,5 L al día, lo que exige tomar 2,5 a 3 L.",
        "No: 1 L es una meta baja; hay que tomar 2,5 a 3 L.",
        "No: la meta de diuresis es de 2 a 2,5 L al día.",
        "No: la meta es tomar 2,5 a 3 L para orinar 2 a 2,5 L."
      ]
    },
    {
      "id": "uro-c06",
      "topic": "Litiasis urinaria · Cálculo de estruvita",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 61 años con <span class='hy'>infecciones urinarias a repetición por Proteus mirabilis</span> y un cálculo coraliforme en el riñón izquierdo. La orina tiene <span class='hy'>pH alcalino</span>. ¿De qué está hecho probablemente el cálculo?",
      "options": [
        "Oxalato de calcio, el tipo más frecuente",
        "Ácido úrico, que precipita en orina ácida",
        "Fosfato de amonio y magnesio (estruvita)",
        "Cistina, por un defecto hereditario"
      ],
      "correct": 2,
      "whyCorrect": "Las bacterias productoras de ureasa (Proteus mirabilis, Klebsiella y algunos estafilococos) hidrolizan la urea a amoníaco y alcalinizan la orina, lo que precipita el fosfato de amonio y magnesio (estruvita) y la carbonato apatita.",
      "pearl": "El pH orienta: menor de 5,5 favorece el ácido úrico; mayor de 6,5, el fosfato de calcio.",
      "trap": "Pensar en ácido úrico ante un cálculo grande: ese precipita en orina ácida, no alcalina.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Fisiopatología",
          "texto": "Urease-producing bacteria, such as Proteus mirabilis, Klebsiella species and some Staphylococcus strains, hydrolyse urea to ammonia and carbon dioxide, generating alkaline urine, which promotes the precipitation of magnesium ammonium phosphate (struvite) and carbonate apatite."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Fisiopatología",
          "texto": "a persistently low urinary pH (<5.5) favours uric acid precipitation, whereas high urinary pH (>6.5) facilitates calcium phosphate crystallization"
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: la orina alcalina con Proteus orienta a estruvita.",
        "No: el ácido úrico precipita en orina ácida, no alcalina.",
        "Correcta: las bacterias productoras de ureasa alcalinizan la orina y precipitan estruvita.",
        "No: las infecciones por bacterias productoras de ureasa orientan a estruvita."
      ]
    },
    {
      "id": "uro-c07",
      "topic": "Litiasis urinaria · Hipercalciuria",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 47 años con <span class='hy'>cálculos de oxalato de calcio recurrentes</span>. La orina de 24 h muestra <span class='hy'>hipercalciuria</span>; ya toma suficiente agua y come calcio normal. ¿Qué fármaco puede reducir las recurrencias?",
      "options": [
        "Furosemida a dosis bajas",
        "Tiazida o indapamida",
        "Suplemento de calcio con la comida",
        "Bicarbonato de sodio cada 8 horas"
      ],
      "correct": 1,
      "whyCorrect": "En quien forma cálculos de calcio con hipercalciuria, las tiazidas o los diuréticos parecidos a las tiazidas (indapamida) pueden reducir las recurrencias, según ensayos y revisiones sistemáticas.",
      "pearl": "La sal aumenta la calciuria: limitar el sodio a menos de 100 mmol al día puede reducir la hipercalciuria y la recurrencia.",
      "trap": "Usar un diurético de asa, que aumenta la calciuria.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención farmacológica",
          "texto": "Specifically for calcium stone formers with hypercalciuria (calcium oxalate or calcium phosphate), prescription of thiazides or thiazide-like diuretics (that is, indapamide) may reduce recurrences according to historical randomized controlled trials (RCTs) and systematic reviews."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "High sodium intake increases urinary calcium excretion through shared transport mechanisms in the renal tubule; restriction to <100 mmol sodium per day may reduce hypercalciuria and stone recurrence."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: lo que puede reducir las recurrencias en la hipercalciuria son las tiazidas o la indapamida.",
        "Correcta: tiazidas o indapamida en quien forma cálculos de calcio con hipercalciuria.",
        "No: ya come calcio normal; el fármaco indicado es una tiazida o la indapamida.",
        "No: en la hipercalciuria lo que reduce las recurrencias son las tiazidas o la indapamida."
      ]
    },
    {
      "id": "uro-c08",
      "topic": "Litiasis urinaria · Cálculo de ácido úrico",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 58 años con gota y un <span class='hy'>cálculo renal radiolúcido de ácido úrico</span> de 12 mm, sin obstrucción ni infección. La orina tiene <span class='hy'>pH de 5,0</span>. ¿Qué tratamiento puede disolverlo?",
      "options": [
        "Litotricia extracorpórea de urgencia",
        "Acidificar la orina con vitamina C",
        "Restringir el calcio de la dieta",
        "Citrato de potasio para alcalinizar"
      ],
      "correct": 3,
      "whyCorrect": "El citrato disuelve los cálculos de ácido úrico puros porque alcaliniza la orina. En un estudio con 24 pacientes que iban para cirugía, el citrato de potasio (solo o con alopurinol) los disolvió por completo en 67 %.",
      "pearl": "El ácido úrico precipita en orina ácida (pH menor de 5,5): por eso se alcaliniza.",
      "trap": "Mandar a cirugía un cálculo de ácido úrico sin intentar disolverlo.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Tratamiento médico",
          "texto": "Citrate therapy effectively dissolves pure uric acid stones through urinary alkalinization, with dissolution time varying by stone size and degree of alkalinization."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Tratamiento médico",
          "texto": "In a retrospective study in 24 patients with uric acid stones initially referred for surgery, medical dissolution therapy with potassium citrate (alone or with allopurinol) achieved complete stone resolution in 67% of patients and partial reduction (mean 68% decrease in stone burden) in 33% of patients."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: los cálculos de ácido úrico pueden disolverse con citrato antes de intervenir.",
        "No: el ácido úrico precipita en orina ácida; hay que alcalinizar, no acidificar.",
        "No: es un cálculo de ácido úrico; se disuelve alcalinizando la orina.",
        "Correcta: el citrato de potasio alcaliniza la orina y disuelve los cálculos de ácido úrico puros."
      ]
    },
    {
      "id": "uro-c09",
      "topic": "Litiasis urinaria · Hipocitraturia",
      "difficulty": "basica",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 36 años con cálculos de calcio. La orina de 24 h muestra <span class='hy'>citrato de 250 mg/día</span>. Además del agua, ¿qué bebida le suma beneficio?",
      "options": [
        "Jugos de frutas cítricas",
        "Bebidas colas",
        "Té negro concentrado",
        "Leche entera en abundancia"
      ],
      "correct": 0,
      "whyCorrect": "La hipocitraturia (citrato urinario menor de 320 mg/día) quita el efecto inhibidor del citrato sobre la cristalización del calcio. El agua es la base, pero los jugos cítricos suman porque aumentan el citrato urinario y alcalinizan la orina.",
      "pearl": "El citrato inhibe la cristalización del calcio; también el magnesio y la proteína de Tamm-Horsfall son inhibidores en la orina.",
      "trap": "Olvidar el citrato urinario en el estudio metabólico.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Fisiopatología",
          "texto": "Hypocitraturia is characterized by urinary citrate excretion of <320 mg/day and reduces the natural inhibitory effect of citrate on calcium crystallization."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "In general, water is the main component of fluid therapy, although citrus fruit juices show an additional beneficial effect through increasing urinary citrates and urine alkalinization."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "Correcta: los jugos cítricos aumentan el citrato urinario y alcalinizan la orina.",
        "No: lo que suma beneficio son los jugos cítricos, que aumentan el citrato urinario.",
        "No: lo que suma beneficio son los jugos cítricos, que aumentan el citrato urinario.",
        "No: el problema es la hipocitraturia; suman los jugos cítricos, que aumentan el citrato."
      ]
    },
    {
      "id": "uro-c10",
      "topic": "Litiasis urinaria · Catéter doble J tras ureteroscopia",
      "difficulty": "dificil",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 44 años a quien le hicieron una <span class='hy'>ureteroscopia sin complicaciones</span> por un cálculo ureteral. Pregunta si es obligatorio dejarle catéter doble J. ¿Qué dice la evidencia?",
      "options": [
        "Siempre se deja, durante al menos 6 semanas completas",
        "Sin él aumentan las urgencias y reoperaciones",
        "El beneficio de dejarlo de rutina es incierto",
        "Solo se deja en los hombres"
      ],
      "correct": 2,
      "whyCorrect": "Cada vez más cirujanos no dejan doble J después de una ureteroscopia no complicada: una revisión Cochrane encontró un beneficio incierto sobre las consultas de urgencia no planeadas y las intervenciones adicionales.",
      "pearl": "El doble J se ha usado para asegurar el drenaje en los primeros días, porque el edema y los fragmentos pequeños pueden obstruir.",
      "trap": "Creer que el doble J es obligatorio después de toda ureteroscopia.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Manejo quirúrgico",
          "texto": "An increasing number of surgeons are not inserting double-J ureteral stents after uncomplicated ureteroscopies, and a Cochrane review reported uncertain benefit of stent placement regarding unplanned emergency room visits and ancillary interventions."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: no es obligatorio; el beneficio de dejarlo de rutina es incierto.",
        "No: la revisión Cochrane encontró un beneficio incierto sobre urgencias e intervenciones adicionales.",
        "Correcta: tras una ureteroscopia no complicada, el beneficio del doble J de rutina es incierto.",
        "No: la evidencia sobre el doble J no depende del sexo; su beneficio de rutina es incierto."
      ]
    },
    {
      "id": "uro-c11",
      "topic": "Infección urinaria · Prostatitis bacteriana aguda",
      "difficulty": "residencia",
      "src": "jama_prostatitis25",
      "vignette": "Hombre de 52 años con <span class='hy'>fiebre de 39 °C, escalofríos</span>, disuria y dolor perineal. Al tacto, la próstata está caliente y muy dolorosa. ¿Qué haces?",
      "options": [
        "Pedir PSA para descartar un cáncer de próstata",
        "Hemocultivos y antibiótico de amplio espectro",
        "Masaje prostático para tomar el cultivo de secreción",
        "Alfa-bloqueador y control en un mes"
      ],
      "correct": 1,
      "whyCorrect": "La prostatitis bacteriana aguda es una infección urinaria con compromiso de la próstata, casi siempre por gramnegativos (E. coli, Klebsiella, Pseudomonas). Se tratan con antibiótico de amplio espectro (ceftriaxona, piperacilina-tazobactam o ciprofloxacina) por 2 a 4 semanas. Se toman hemocultivos si hay fiebre: 21 % tiene bacteriemia.",
      "pearl": "El PSA no está indicado en la evaluación de la prostatitis aguda.",
      "trap": "Pedir PSA o hacer masaje prostático en una prostatitis aguda.",
      "cita": [
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Resumen",
          "texto": "First-line therapy for acute prostatitis is broad-spectrum intravenous or oral antibiotics, such as intravenous piperacillin-tazobactam, ceftriaxone, or oral ciprofloxacin, which has a 92% to 97% success rate when prescribed for 2 to 4 weeks for people with febrile UTI and acute prostatitis."
        },
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Evaluación",
          "texto": "Blood cultures should be obtained for patients with fever because 21% of patients with acute bacterial prostatitis have bacteremia."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: el PSA no está indicado en la evaluación de la prostatitis aguda.",
        "Correcta: hemocultivos por la fiebre y antibiótico de amplio espectro por 2 a 4 semanas.",
        "No: el masaje prostático no se hace en la prostatitis aguda.",
        "No: es una infección febril; se toman hemocultivos y se da antibiótico de amplio espectro."
      ]
    },
    {
      "id": "uro-c12",
      "topic": "Infección urinaria · Prostatitis bacteriana crónica",
      "difficulty": "residencia",
      "src": "jama_prostatitis25",
      "vignette": "Hombre de 58 años con <span class='hy'>infecciones urinarias a repetición por la misma cepa de E. coli</span> y molestia pélvica intermitente. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Nitrofurantoína por 5 días como en la cistitis",
        "Ciprofloxacina por 3 días",
        "Alfa-bloqueador sin antibiótico",
        "Fluoroquinolona al menos 4 semanas"
      ],
      "correct": 3,
      "whyCorrect": "La prostatitis bacteriana crónica es una infección persistente de la próstata que se presenta como infecciones urinarias recurrentes por la misma cepa. Se trata con levofloxacina o ciprofloxacina al menos 4 semanas.",
      "pearl": "Hasta 74 % la causan gramnegativos como E. coli. El PSA no sirve para diagnosticarla y puede subir por la inflamación.",
      "trap": "Tratarla con un ciclo corto como una cistitis.",
      "cita": [
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Resumen",
          "texto": "Chronic bacterial prostatitis is defined as a persistent bacterial infection of the prostate, typically presenting as recurrent UTIs from the same strain."
        },
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Tratamiento",
          "texto": "Chronic bacterial prostatitis should be treated with at least 4 weeks of oral fluoroquinolones."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: tratarla con un ciclo corto como una cistitis es la trampa.",
        "No: la prostatitis bacteriana crónica se trata al menos 4 semanas.",
        "No: es una infección persistente; se trata con fluoroquinolona al menos 4 semanas.",
        "Correcta: fluoroquinolona oral al menos 4 semanas."
      ]
    },
    {
      "id": "uro-c13",
      "topic": "Dolor pélvico · Prostatitis crónica / dolor pélvico crónico",
      "difficulty": "residencia",
      "src": "jama_prostatitis25",
      "vignette": "Hombre de 36 años con <span class='hy'>dolor pélvico desde hace 5 meses</span>, polaquiuria y chorro débil. Urocultivo negativo, residuo posmiccional normal y sin otra causa. ¿Qué tratamiento oral de primera línea indicas?",
      "options": [
        "Ciprofloxacina por 4 semanas",
        "Ibuprofeno por 6 meses",
        "Alfa-bloqueador",
        "Pregabalina como primera opción"
      ],
      "correct": 2,
      "whyCorrect": "El síndrome de prostatitis crónica o dolor pélvico crónico es dolor pélvico de al menos 3 meses con síntomas urinarios, sin infección, cáncer, obstrucción ni retención. Con síntomas urinarios, la primera línea oral es un alfa-bloqueador (tamsulosina, alfuzosina).",
      "pearl": "Los antiinflamatorios, la pregabalina y el extracto de polen dan cambios modestos en el puntaje de síntomas.",
      "trap": "Dar antibiótico prolongado con urocultivo negativo.",
      "cita": [
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Resumen",
          "texto": "Chronic prostatitis/chronic pelvic pain syndrome (CP/CPPS) presents as pelvic pain or discomfort for at least 3 months and is associated with urinary symptoms, such as urinary frequency."
        },
        {
          "donde": "Prostatitis: A Review, JAMA 2025;334(11), Resumen",
          "texto": "First-line oral therapy for CP/CPPS with urinary symptoms is α-blockers (eg, tamsulosin, alfuzosin; ΔNIH-CPSI score difference vs placebo = −10.8 to −4.8)."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: con urocultivo negativo no se da antibiótico prolongado.",
        "No: los antiinflamatorios dan cambios modestos; la primera línea con síntomas urinarios es el alfa-bloqueador.",
        "Correcta: con síntomas urinarios, la primera línea oral es un alfa-bloqueador.",
        "No: la pregabalina da cambios modestos; la primera línea con síntomas urinarios es el alfa-bloqueador."
      ]
    },
    {
      "id": "uro-c14",
      "topic": "Infección urinaria · Infección urinaria recurrente en la mujer",
      "difficulty": "basica",
      "src": "afp_itu26",
      "vignette": "Mujer de 34 años con su <span class='hy'>tercera cistitis del año</span>; las dos anteriores fueron en marzo y julio. ¿Cómo la clasificas y qué pides en cada episodio?",
      "options": [
        "ITU recurrente; uroanálisis y urocultivo",
        "No es recurrente: necesita 4 episodios al año",
        "ITU recurrente; solo tratar sin cultivo",
        "Cistitis aislada; ecografía renal y cistoscopia"
      ],
      "correct": 0,
      "whyCorrect": "ITU recurrente es 2 o más en 6 meses o 3 o más en un año. En cada episodio se pide uroanálisis y urocultivo con antibiograma: confirma la infección, guía el tratamiento y distingue persistencia de la misma bacteria de reinfección.",
      "pearl": "Las imágenes o la cistoscopia se reservan para banderas rojas: hematuria persistente, sospecha de litiasis, anomalías estructurales o pielonefritis recurrente.",
      "trap": "Tratar cada episodio a ciegas sin cultivo.",
      "cita": [
        {
          "donde": "Recurrent UTI in Women, Am Fam Physician 2026;113(6):568-577, Resumen",
          "texto": "Recurrent urinary tract infection (UTI) is defined as two or more UTIs within 6 months or three or more within 1 year."
        },
        {
          "donde": "Recurrent UTI in Women, Am Fam Physician 2026;113(6):568-577, Resumen",
          "texto": "When women present with recurrent UTI symptoms, urinalysis and urine culture should be obtained."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "Correcta: 3 o más en un año es recurrente; en cada episodio, uroanálisis y urocultivo.",
        "No: es recurrente desde 2 en 6 meses o 3 en un año.",
        "No: en cada episodio se pide urocultivo con antibiograma.",
        "No: es recurrente, y las imágenes o la cistoscopia se reservan para banderas rojas."
      ]
    },
    {
      "id": "uro-c15",
      "topic": "Infección urinaria · Bacteriuria asintomática",
      "difficulty": "basica",
      "src": "afp_itu26",
      "vignette": "Mujer de 70 años, sin síntomas urinarios, con un <span class='hy'>urocultivo de control con más de 100.000 UFC/mL de E. coli</span>. No está embarazada ni la van a operar. ¿Qué haces?",
      "options": [
        "Nitrofurantoína por 5 días",
        "No tratarla",
        "Fosfomicina dosis única",
        "Ciprofloxacina por 7 días"
      ],
      "correct": 1,
      "whyCorrect": "La bacteriuria asintomática no se trata, salvo en embarazadas o antes de un procedimiento urológico invasivo. Puede resolverse sola.",
      "pearl": "Incontinencia y vejiga hiperactiva en mujeres mayores se confunden a menudo con infección y llevan a antibióticos innecesarios.",
      "trap": "Tratar un urocultivo positivo sin síntomas.",
      "cita": [
        {
          "donde": "Recurrent UTI in Women, Am Fam Physician 2026;113(6):568-577, Resumen",
          "texto": "Asymptomatic bacteriuria should not be treated, except in patients who are pregnant or undergoing invasive urologic procedures."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: la bacteriuria asintomática no se trata, salvo en embarazadas o antes de un procedimiento urológico.",
        "Correcta: no se trata; no está embarazada ni la van a operar.",
        "No: la bacteriuria asintomática no se trata.",
        "No: la bacteriuria asintomática no se trata."
      ]
    },
    {
      "id": "uro-c16",
      "topic": "Infección urinaria · Duración del tratamiento y seguimiento",
      "difficulty": "residencia",
      "src": "afp_itu26",
      "vignette": "Mujer de 29 años con ITU recurrente tratada con éxito. Pregunta si un tratamiento más largo o un urocultivo de control evitarán nuevas infecciones. ¿Qué le dices?",
      "options": [
        "Sí: 14 días de antibiótico reducen la recurrencia",
        "Sí: siempre se repite el cultivo al terminar",
        "Alargar el tratamiento no reduce la recurrencia",
        "Necesita cistoscopia tras cada episodio"
      ],
      "correct": 2,
      "whyCorrect": "Un tratamiento más largo no reduce la recurrencia. Tampoco se repiten pruebas al terminar el antibiótico en mujeres no embarazadas, salvo que sigan los síntomas.",
      "pearl": "La prevención empieza con cambios de conducta e higiene; luego, profilaxis antibiótica con decisión compartida.",
      "trap": "Alargar el antibiótico o pedir urocultivo de control a toda paciente.",
      "cita": [
        {
          "donde": "Recurrent UTI in Women, Am Fam Physician 2026;113(6):568-577, Resumen",
          "texto": "Longer duration of therapy does not reduce the risk of recurrent UTI."
        },
        {
          "donde": "Recurrent UTI in Women, Am Fam Physician 2026;113(6):568-577, Seguimiento",
          "texto": "Physicians should not perform follow-up testing after completion of antibiotics in nonpregnant patients unless symptoms persist."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: un tratamiento más largo no reduce la recurrencia.",
        "No: no se repiten pruebas al terminar el antibiótico si no hay síntomas.",
        "Correcta: alargar el tratamiento no reduce la recurrencia.",
        "No: la cistoscopia se reserva para banderas rojas."
      ]
    },
    {
      "id": "uro-c17",
      "topic": "Cáncer de próstata · Tamizaje con PSA y resonancia",
      "difficulty": "dificil",
      "src": "nejm_goteborg24",
      "vignette": "En el ensayo GÖTEBORG-2, a hombres de 50 a 60 años con PSA de 3 ng/mL o más se les hizo resonancia: un grupo recibía biopsia sistemática y otro solo biopsia dirigida a lesiones de la resonancia. ¿Qué mostró omitir la biopsia si la resonancia era negativa?",
      "options": [
        "Aumentó al doble los cánceres avanzados detectados",
        "No cambió el sobrediagnóstico",
        "Duplicó los eventos adversos graves de la biopsia",
        "Bajó más de la mitad los cánceres insignificantes"
      ],
      "correct": 3,
      "whyCorrect": "La biopsia solo dirigida por resonancia redujo el diagnóstico de cáncer clínicamente insignificante (RR 0,43), sin diferencia significativa en el cáncer clínicamente significativo (RR 0,84; IC 0,66 a 1,07). El riesgo de un cáncer incurable fue muy bajo.",
      "pearl": "El sobrediagnóstico es el gran daño del tamizaje con PSA: la resonancia antes de la biopsia lo reduce.",
      "trap": "Creer que omitir la biopsia sistemática deja pasar más cánceres avanzados: no hubo diferencia significativa (15 frente a 23).",
      "cita": [
        {
          "donde": "GÖTEBORG-2, N Engl J Med 2024;391:1083-95, Resultados",
          "texto": "The relative risk of detecting clinically insignificant cancer in the MRI-targeted biopsy group as compared with the systematic biopsy group was 0.43 (95% confidence interval [CI], 0.32 to 0.57; P<0.001)"
        },
        {
          "donde": "GÖTEBORG-2, N Engl J Med 2024;391:1083-95, Conclusiones",
          "texto": "In this trial, omitting biopsy in patients with negative MRI results eliminated more than half of diagnoses of clinically insignificant prostate cancer, and the associated risk of having incurable cancer diagnosed at screening or as interval cancer was very low."
        }
      ],
      "verificado": "2026-11-25",
      "porOpcion": [
        "No: no hubo diferencia significativa en el cáncer clínicamente significativo.",
        "No: el sobrediagnóstico bajó; el RR de cáncer insignificante fue 0,43.",
        "No: lo que mostró fue menos sobrediagnóstico: más de la mitad menos de cánceres insignificantes.",
        "Correcta: omitir la biopsia con resonancia negativa eliminó más de la mitad de los cánceres insignificantes."
      ]
    }
  ],
  "fichas": [],
  "tarjetas": [],
  "revision": "verificada"
});
