// Epidemiología y Estadística (antes «Salud Pública»): contenido incluido en la app · paquete "salud-publica" (módulo aparte: epidemiología y estadística).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: sp-c01 (casos), sp-f01 (fichas), sp-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Epidemiología y Estadística",
  "prefijo": "sp",
  "paquete": "salud-publica",
  "actualizado": "2026-11-24",
  "casos": [
    {
      "id": 19,
      "topic": "Epidemiología · Pruebas diagnósticas",
      "difficulty": "residencia",
      "src": "cto_ep",
      "vignette": "Se evalúa una nueva prueba rápida para VIH con <span class='hy'>sensibilidad 99%</span> y <span class='hy'>especificidad 92%</span>. Un comité quiere usarla en población general. ¿Cuál es el uso más adecuado de esta prueba?",
      "options": [
        "Como prueba de tamizaje, confirmando los positivos con una prueba más específica",
        "No sirve porque su especificidad es menor a 95%",
        "Como prueba confirmatoria única antes de iniciar tratamiento",
        "Solo en población de alto riesgo porque el VPP no depende de la prevalencia"
      ],
      "correct": 0,
      "whyCorrect": "Una sensibilidad muy alta deja pocos falsos negativos: un resultado negativo descarta la enfermedad (SnNout). Por eso es ideal para tamizaje. Los positivos se confirman con una prueba de alta especificidad (SpPin).",
      "pearl": "SnNout: Sensible + Negativo = descarta. SpPin: Específica + Positivo = confirma. Los valores predictivos SÍ cambian con la prevalencia; la sensibilidad y la especificidad no.",
      "trap": "Creer que el VPP es fijo. A menor prevalencia, cae el VPP y aumentan los falsos positivos.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Si lo que interesa es detectar el mayor número posible de enfermos, se debe usar un test con alta sensibilidad."
        },
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "La sensibilidad y la especificidad no dependen de la prevalencia."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "Correcta: con sensibilidad alta un negativo descarta; los positivos se confirman con una prueba más específica.",
        "No: su alta sensibilidad la hace útil para tamizaje, confirmando los positivos.",
        "No: la confirmación se hace con una prueba de alta especificidad.",
        "No: el VPP sí depende de la prevalencia."
      ]
    },
    {
      "id": 20,
      "topic": "Epidemiología · Diseño de estudios",
      "difficulty": "residencia",
      "src": "cto_ep",
      "vignette": "Investigadores identifican a 120 pacientes con <span class='hy'>carcinoma hepatocelular</span> y 240 sin la enfermedad, y revisan <span class='hy'>retrospectivamente</span> su exposición previa a aflatoxinas. ¿Qué diseño es y qué medida de asociación corresponde?",
      "options": [
        "Ensayo clínico · Número necesario a tratar",
        "Casos y controles · Odds ratio",
        "Transversal · Prevalencia",
        "Cohorte prospectiva · Riesgo relativo"
      ],
      "correct": 1,
      "whyCorrect": "Se parte del desenlace (con y sin enfermedad) y se busca la exposición hacia atrás: eso es un estudio de casos y controles. No permite calcular incidencia, así que la medida es el odds ratio.",
      "pearl": "Cohorte: parte de la exposición → RR. Casos y controles: parte de la enfermedad → OR. Útil para enfermedades raras.",
      "trap": "Calcular riesgo relativo en un estudio de casos y controles: no se puede porque el investigador fija la proporción de casos.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Debido a ello, la fuerza de la asociación no se puede calcular directamente, como en el estudio de cohortes, sino de forma indirecta mediante la odds ratio."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: no hay intervención asignada; se parte del desenlace y se busca la exposición hacia atrás.",
        "Correcta: parte de la enfermedad y busca la exposición hacia atrás: casos y controles, con odds ratio.",
        "No: se parte de casos y controles y se busca la exposición pasada; la medida es el odds ratio.",
        "No: la cohorte parte de la exposición; aquí se parte de la enfermedad."
      ]
    },
    {
      "id": "sp-c01",
      "topic": "Lectura crítica · NNT",
      "difficulty": "residencia",
      "src": "cto_ep",
      "vignette": "Un ensayo clínico aleatorizado compara un nuevo antiagregante con placebo en pacientes con infarto. La mortalidad a 1 año fue <span class='hy'>10 % con placebo</span> y <span class='hy'>8 % con el fármaco</span>. El laboratorio anuncia que el fármaco “reduce la mortalidad un 20 %”. ¿Cuántos pacientes hay que tratar durante 1 año para evitar una muerte?",
      "options": [
        "5",
        "20",
        "50",
        "100"
      ],
      "correct": 2,
      "whyCorrect": "La reducción absoluta del riesgo (RRA) es 10 % − 8 % = 2 % (0,02). El NNT es 1 / RRA = 1 / 0,02 = 50. El 20 % del anuncio es la reducción relativa del riesgo: 2 / 10.",
      "pearl": "NNT = 1 / RRA. La reducción relativa (RRR) se ve siempre más grande que la absoluta; para decidir en un paciente, mira la RRA y el NNT.",
      "trap": "Calcular el NNT con la reducción relativa (1 / 0,20 = 5).",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Se obtiene como el inverso de la RAR multiplicado por 100, y es el número de pacientes que se deben tratar para prevenir un suceso indeseable adicional."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: 5 sale de usar la reducción relativa (1/0,20).",
        "No: el NNT es 1/0,02 = 50.",
        "Correcta: RRA = 10 % − 8 % = 2 %; NNT = 1/0,02 = 50.",
        "No: el NNT es 1/0,02 = 50, no 100."
      ]
    },
    {
      "id": "sp-c02",
      "topic": "Lectura crítica · Intención de tratar",
      "difficulty": "dificil",
      "src": "cto_ep",
      "vignette": "En un ensayo clínico aleatorizado de un antihipertensivo, el <span class='hy'>15 % de los pacientes abandonó el tratamiento</span> por efectos adversos, la mayoría en el grupo intervención. Los autores presentan como resultado principal solo a quienes completaron el tratamiento según el protocolo, y muestran un gran beneficio. ¿Qué análisis debió ser el principal para conservar los beneficios de la aleatorización?",
      "options": [
        "Análisis por protocolo, con los que completaron el tratamiento",
        "Análisis de subgrupos por edad para encontrar quién se beneficia",
        "Análisis solo de los pacientes con buena adherencia al tratamiento",
        "Análisis por intención de tratar: cada uno en su grupo asignado"
      ],
      "correct": 3,
      "whyCorrect": "El análisis por intención de tratar incluye a todos los pacientes en el grupo al que fueron aleatorizados, hayan completado o no el tratamiento. Así conserva la comparabilidad que da la aleatorización y refleja lo que pasa en la práctica. Excluir a quienes abandonan, sobre todo si son más en un grupo, rompe esa comparabilidad y exagera el beneficio.",
      "pearl": "En ensayos de superioridad, el análisis principal es por intención de tratar; el análisis por protocolo es complementario.",
      "trap": "Creer que el análisis por protocolo es más “real” porque solo cuenta a quienes recibieron el tratamiento.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Por intención de tratar. El análisis incluye a todos los pacientes que han sido seleccionados y en el grupo en el que fueron asignados, aunque no hayan finalizado el estudio o hayan cambiado de grupo."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: excluir a quienes abandonan rompe la comparabilidad y exagera el beneficio.",
        "No: en un ensayo de superioridad, el análisis principal es por intención de tratar.",
        "No: contar solo a los adherentes rompe la comparabilidad de la aleatorización.",
        "Correcta: intención de tratar: todos en el grupo asignado, para conservar la aleatorización."
      ]
    },
    {
      "id": "sp-c03",
      "topic": "Epidemiología · Valores predictivos",
      "difficulty": "dificil",
      "src": "cto_ep",
      "vignette": "Una prueba de tamizaje tiene <span class='hy'>sensibilidad 90 %</span> y <span class='hy'>especificidad 90 %</span>. Se aplica a 1000 personas de una población donde la <span class='hy'>prevalencia es 1 %</span>. Un paciente tiene un resultado positivo y pregunta qué probabilidad tiene de estar enfermo. ¿Cuál es aproximadamente el valor predictivo positivo?",
      "options": [
        "8 %",
        "50 %",
        "90 %",
        "99 %"
      ],
      "correct": 0,
      "whyCorrect": "De 1000 personas, 10 están enfermas: la prueba detecta 9 (verdaderos positivos). De las 990 sanas, el 10 % da positivo: 99 falsos positivos. VPP = 9 / (9 + 99) ≈ 8 %. Con prevalencia baja, la mayoría de los positivos son falsos aunque la prueba sea buena.",
      "pearl": "Los valores predictivos dependen de la prevalencia; la sensibilidad y la especificidad no. Con prevalencia baja, el VPP cae y el VPN sube.",
      "trap": "Responder 90 %, confundiendo la sensibilidad con el valor predictivo positivo.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Por el contrario, si la prevalencia de la enfermedad decrece, aumenta el valor predictivo negativo y se reduce el valor predictivo positivo."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "Correcta: 9 verdaderos positivos y 99 falsos positivos: VPP = 9/108 ≈ 8 %.",
        "No: VPP = 9/(9 + 99) ≈ 8 %.",
        "No: 90 % es la sensibilidad, no el valor predictivo positivo.",
        "No: con prevalencia de 1 %, la mayoría de los positivos son falsos: VPP ≈ 8 %."
      ]
    },
    {
      "id": "sp-c04",
      "topic": "Lectura crítica · Sesgos en tamizaje",
      "difficulty": "dificil",
      "src": "cto_ep",
      "vignette": "Tras implementar un programa de tamizaje de un cáncer, la <span class='hy'>supervivencia a 5 años desde el diagnóstico aumentó</span> de 40 % a 60 %. Sin embargo, la <span class='hy'>mortalidad por ese cáncer en la población no cambió</span>. ¿Qué explica mejor este hallazgo?",
      "options": [
        "El tratamiento mejoró gracias al diagnóstico más temprano",
        "Error tipo I por un tamaño de muestra demasiado grande para el estudio",
        "Sesgo de memoria de los pacientes encuestados en el seguimiento",
        "Sesgo de anticipación: el diagnóstico se adelantó, la muerte no"
      ],
      "correct": 3,
      "whyCorrect": "El tamizaje adelanta el momento del diagnóstico. Si la muerte ocurre en la misma fecha, el tiempo medido desde el diagnóstico se alarga y la supervivencia parece mejor, sin beneficio real. Por eso el desenlace que demuestra beneficio de un tamizaje es la mortalidad, no la supervivencia desde el diagnóstico.",
      "pearl": "Sesgos del tamizaje: anticipación (lead time), duración (length time: detecta más los tumores lentos) y sobrediagnóstico. Se evitan midiendo mortalidad en ensayos aleatorizados.",
      "trap": "Tomar el aumento de la supervivencia como prueba de que el tamizaje salva vidas.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "En este caso la prueba de cribado detecta antes la enfermedad, pero no cambia su pronóstico. Por tanto, el paciente no vive más, si no que vive más tiempo diagnosticado."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: el desenlace que demuestra el beneficio es la mortalidad, y no cambió.",
        "No: el diagnóstico se adelantó sin cambiar la fecha de muerte: es sesgo de anticipación.",
        "No: el hallazgo se explica por el adelanto del diagnóstico, no por la memoria.",
        "Correcta: el diagnóstico se adelantó sin cambiar la muerte: más tiempo diagnosticado, no más vida."
      ]
    },
    {
      "id": "sp-c05",
      "topic": "Lectura crítica · Confusión",
      "difficulty": "residencia",
      "src": "cto_ep",
      "vignette": "Un estudio de casos y controles encuentra que tomar <span class='hy'>más de 3 tazas de café al día</span> se asocia con cáncer de páncreas (OR 2,1). En ese estudio, los bebedores de café <span class='hy'>fumaban mucho más</span> que los no bebedores, y el tabaco es causa conocida de cáncer de páncreas. Al ajustar por tabaquismo, la asociación desaparece. ¿Qué fenómeno explica la asociación inicial?",
      "options": [
        "Confusión por tabaquismo",
        "Sesgo de selección",
        "Interacción (modificación del efecto)",
        "Causalidad inversa"
      ],
      "correct": 0,
      "whyCorrect": "Un factor de confusión se asocia con la exposición (los bebedores de café fuman más) y es causa del desenlace (el tabaco causa cáncer de páncreas), sin estar en el camino causal. Al ajustar por él, la asociación aparente desaparece.",
      "pearl": "La confusión se controla en el diseño (aleatorización, restricción, pareamiento) o en el análisis (estratificación, regresión multivariada).",
      "trap": "Llamarlo interacción: en la interacción el efecto cambia según el nivel de un tercer factor, no desaparece al ajustar.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "El sesgo de confusión se debe a la existencia de un factor de confusión, que es esencialmente un factor que está desigualmente distribuido entre los dos grupos de pacientes del estudio, y que se relaciona etiológicamente con la enfermedad final."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "Correcta: el tabaco se asocia con el café y causa el cáncer; al ajustar, la asociación desaparece.",
        "No: la asociación desaparece al ajustar por un factor desigualmente distribuido: es confusión.",
        "No: en la interacción el efecto cambia según un tercer factor; no desaparece al ajustar.",
        "No: la asociación desaparece al ajustar por tabaquismo: es confusión."
      ]
    },
    {
      "id": "sp-c06",
      "topic": "Epidemiología · Estudio de brote",
      "difficulty": "residencia",
      "src": "cto_ep",
      "vignette": "Después de un almuerzo comunitario, varias personas presentan vómito y diarrea en las 6 horas siguientes. De <span class='hy'>120 que comieron ensalada de papa, 60 enfermaron</span>; de <span class='hy'>80 que no la comieron, 4 enfermaron</span>. Con el pollo, enfermaron 30 de 100 que lo comieron y 34 de 100 que no. ¿Cuál es el alimento sospechoso y su riesgo relativo?",
      "options": [
        "Pollo, RR ≈ 0,9",
        "No se puede calcular: falta un grupo control",
        "Ensalada de papa, RR = 2",
        "Ensalada de papa, RR = 10"
      ],
      "correct": 3,
      "whyCorrect": "Tasa de ataque en quienes comieron ensalada: 60/120 = 50 %; en quienes no: 4/80 = 5 %. RR = 50 / 5 = 10. Con el pollo, 30 % frente a 34 %: RR ≈ 0,9, sin asociación. En un brote con población definida se comparan tasas de ataque (un estudio de cohorte retrospectivo).",
      "pearl": "Tasa de ataque = enfermos / expuestos. El alimento sospechoso es el que tiene alta tasa de ataque en los expuestos, baja en los no expuestos y la mayoría de los casos entre quienes lo comieron.",
      "trap": "Elegir el alimento con más enfermos en números absolutos sin comparar con quienes no lo comieron.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "El riesgo relativo (RR) es la medida de asociación en los estudios de cohortes."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: con el pollo, 30 % frente a 34 %: RR ≈ 0,9, sin asociación.",
        "No: el grupo de comparación son quienes no comieron el alimento.",
        "No: 50 % frente a 5 % da un RR de 10, no de 2.",
        "Correcta: tasa de ataque de 60/120 = 50 % frente a 4/80 = 5 %: RR = 10."
      ]
    },
    {
      "id": "sp-c07",
      "topic": "Epidemiología · Incidencia y prevalencia",
      "difficulty": "residencia",
      "src": "gordis",
      "vignette": "Se introduce un tratamiento que <span class='hy'>prolonga la supervivencia</span> de los pacientes con una enfermedad crónica, pero <span class='hy'>no la cura</span>. El número de casos nuevos por año se mantiene igual. ¿Qué ocurrirá con la incidencia y la prevalencia en los próximos años?",
      "options": [
        "Incidencia igual y prevalencia mayor",
        "Incidencia mayor y prevalencia igual",
        "Las dos disminuyen",
        "Incidencia menor y prevalencia menor"
      ],
      "correct": 0,
      "whyCorrect": "La incidencia mide casos nuevos y no cambia. La prevalencia depende de la incidencia y de la duración de la enfermedad (P ≈ I × D): si los pacientes viven más sin curarse, se acumulan y la prevalencia sube.",
      "pearl": "P ≈ I × D. Aumentan la prevalencia: más casos nuevos o más duración (tratamientos que no curan, mejor supervivencia). La disminuyen: curación o muerte rápida.",
      "trap": "Pensar que un mejor tratamiento siempre baja la prevalencia: solo lo hace si cura.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Relationship between incidence and prevalence»",
          "texto": "in a steady-state situation, in which the rates are not changing, and in-migration equals out-migration in the populations being examined, and when the prevalence is not too high, the following equation applies: Prevalence = Incidence × Duration of Disease"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Relationship between incidence and prevalence»",
          "texto": "there is a higher prevalence in Hitown people than in Lotown people, not because the risk of disease is higher in Hitown people, but because affected Hitown people survive longer; the prevalence of disease (incidence × duration) is therefore higher in Hitown people than in Lotown people."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "Correcta: los casos nuevos no cambian y, al vivir más sin curarse, la prevalencia sube (P ≈ I × D).",
        "No: la incidencia no cambia: los casos nuevos son los mismos.",
        "No: el tratamiento no cura; los pacientes se acumulan y la prevalencia sube.",
        "No: los casos nuevos no cambian y la duración aumenta: la prevalencia sube."
      ]
    },
    {
      "id": "sp-c08",
      "topic": "Lectura crítica · Error tipo II",
      "difficulty": "dificil",
      "src": "cto_ep",
      "vignette": "Un ensayo clínico con <span class='hy'>80 pacientes</span> compara dos analgésicos y no encuentra diferencia significativa en el dolor (p = 0,30). Los autores reconocen que el estudio tenía un <span class='hy'>poder estadístico de 40 %</span> para detectar la diferencia que consideraban importante. ¿Cuál es la conclusión correcta?",
      "options": [
        "Los dos analgésicos son igual de eficaces para el dolor",
        "El nuevo analgésico es inferior al de comparación",
        "No se puede concluir que sean iguales: alto riesgo de error tipo II",
        "Hubo un error tipo I porque el valor de p fue mayor de 0,05 en la comparación"
      ],
      "correct": 2,
      "whyCorrect": "Con poder de 40 %, el estudio tenía 60 % de probabilidad de no detectar una diferencia real (error tipo II, β). Un resultado no significativo en un estudio con poco poder no demuestra equivalencia: la ausencia de evidencia no es evidencia de ausencia.",
      "pearl": "Error tipo I (α): encontrar una diferencia que no existe. Error tipo II (β): no encontrar una que sí existe. Poder = 1 − β; se busca ≥ 80 %.",
      "trap": "Concluir que los tratamientos son equivalentes porque p > 0,05.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Se denomina β a la probabilidad de cometer un error tipo II"
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: un resultado no significativo con poco poder no demuestra equivalencia.",
        "No: un resultado no significativo tampoco demuestra inferioridad.",
        "Correcta: con poder de 40 %, había 60 % de probabilidad de no detectar una diferencia real.",
        "No: el error tipo I es encontrar una diferencia que no existe; aquí no se encontró ninguna."
      ]
    },
    {
      "id": "sp-c09",
      "area": "Ensayos clínicos y lectura crítica",
      "topic": "Lectura crítica · Guías de reporte",
      "difficulty": "residencia",
      "src": "udea_mi26",
      "vignette": "Un grupo publica un <span class='hy'>ensayo clínico aleatorizado</span> que compara una alerta de sepsis basada en inteligencia artificial frente al manejo convencional, con mortalidad como desenlace. ¿Qué guía de reporte corresponde a su informe de resultados?",
      "options": [
        "STROBE",
        "SPIRIT-AI",
        "PRISMA-AI",
        "CONSORT-AI"
      ],
      "correct": 3,
      "whyCorrect": "Los informes de resultados de ensayos clínicos que evalúan una intervención con IA usan CONSORT-AI; sus protocolos usan SPIRIT-AI. PRISMA-AI es para revisiones sistemáticas y metaanálisis sobre IA, y STROBE para estudios observacionales.",
      "pearl": "Guías de reporte por diseño: ECA → CONSORT (protocolo: SPIRIT); observacional → STROBE; revisión sistemática → PRISMA. Con IA, sus extensiones «-AI».",
      "trap": "Confundir la guía del protocolo (SPIRIT) con la del informe de resultados (CONSORT).",
      "cita": [
        {
          "donde": "Manual de lectura crítica de artículos científicos con inteligencia artificial en medicina interna",
          "texto": "se utiliza el SPIRIT-AI (9) para los protocolos de RCT y los informes de resultados de ensayos clínicos el CONSORT-AI (10)"
        },
        {
          "donde": "Manual de lectura crítica de artículos científicos con inteligencia artificial en medicina interna",
          "texto": "PRISMA-AI (15), diseñada para estandarizar las revisiones sistemáticas y metaanálisis que evalúan intervenciones basadas en IA"
        }
      ],
      "verificado": "2026-11-21",
      "porOpcion": [
        "No: STROBE es para estudios observacionales.",
        "No: SPIRIT-AI es para los protocolos, no para el informe de resultados.",
        "No: PRISMA-AI es para revisiones sistemáticas y metaanálisis.",
        "Correcta: informe de resultados de un ensayo aleatorizado con IA: CONSORT-AI."
      ]
    },
    {
      "id": "sp-c10",
      "topic": "Pruebas diagnósticas · Dímero D ajustado por edad",
      "difficulty": "residencia",
      "src": "adjust_pe",
      "vignette": "Mujer de 80 años con disnea súbita. Probabilidad clínica <span class='hy'>no alta</span> (Ginebra simplificado). Dímero D de <span class='hy'>650 µg/L</span>. ¿Qué haces?",
      "options": [
        "Angiotomografía, porque supera los 500 µg/L",
        "Repetir el dímero D en 24 horas antes de decidir",
        "Anticoagular de forma empírica sin imagen",
        "Descartas TEP: está bajo su corte de 800 µg/L"
      ],
      "correct": 3,
      "whyCorrect": "En mayores de 50 años el corte es edad × 10: a los 80 años, 800 µg/L. Con probabilidad clínica no alta y dímero D bajo ese corte, el TEP queda descartado sin imagen.",
      "pearl": "En ADJUST-PE, en mayores de 75 años con probabilidad no alta, el corte ajustado subió la proporción en que se descartó el TEP con el dímero D de 6,4 % a 29,7 %.",
      "trap": "Aplicar el corte fijo de 500 µg/L a un anciano: casi siempre sale positivo y lleva a imágenes innecesarias.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "an age-adjusted D-dimer cutoff, defined as age × 10 in patients 50 years or older"
        },
        {
          "donde": "Resumen",
          "texto": "using the age-adjusted cutoff instead of the 500 μg/L cutoff increased the proportion of patients in whom PE could be excluded on the basis of D-dimer from 43 of 673 patients (6.4% [95% CI, 4.8%-8.5%) to 200 of 673 patients (29.7% [95% CI, 26.4%-33.3%), without any additional false-negative findings."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: a los 80 años el corte es de 800 µg/L, y 650 está por debajo.",
        "No: con probabilidad no alta y dímero D bajo el corte por edad, el TEP ya queda descartado.",
        "No: con el dímero D bajo su corte por edad se descarta el TEP; no se anticoagula.",
        "Correcta: edad × 10 = 800 µg/L; con probabilidad no alta y 650, se descarta sin imagen."
      ]
    },
    {
      "id": "sp-c11",
      "topic": "Lectura crítica · Estudio de manejo diagnóstico",
      "difficulty": "dificil",
      "src": "adjust_pe",
      "vignette": "En ADJUST-PE, a los pacientes con dímero D entre 500 µg/L y su corte por edad <span class='hy'>no se les hizo angiotomografía ni se les anticoaguló</span>, y se siguieron 3 meses. ¿Qué tipo de estudio es y cuál es su principal limitación?",
      "options": [
        "Ensayo aleatorizado; su limitación es el cegamiento",
        "Casos y controles; tiene sesgo de memoria",
        "Estudio prospectivo de manejo sin grupo control",
        "Cohorte retrospectiva con datos incompletos"
      ],
      "correct": 2,
      "whyCorrect": "Es un estudio prospectivo de resultado del manejo (management outcome study): se aplica la estrategia y se mide cuántos tienen eventos sin tratar. Al no ser aleatorizado, no hay un grupo control manejado con el corte de 500 µg/L para comparar.",
      "pearl": "Se acepta como seguro si el límite superior del IC 95 % de eventos a 3 meses no pasa de 3 %, la tasa que se observa tras una angiografía pulmonar negativa.",
      "trap": "Pensar que toda estrategia diagnóstica se valida con un ensayo aleatorizado; lo usual es este diseño.",
      "cita": [
        {
          "donde": "Resumen · diseño",
          "texto": "A multicenter, multinational, prospective management outcome study in 19 centers in Belgium, France, the Netherlands, and Switzerland"
        },
        {
          "donde": "Discusión · limitaciones",
          "texto": "this study was not designed as a randomized clinic al study. Therefore, we could not compare the 3-month thromboembolic risk with that of a control group that would have been managed using the conventional 500 μg/L cutoff."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: no fue diseñado como estudio aleatorizado.",
        "No: es un estudio prospectivo de manejo, no de casos y controles.",
        "Correcta: estudio prospectivo de manejo; no hay grupo control con el corte de 500 µg/L.",
        "No: fue prospectivo, y su limitación es la falta de grupo control."
      ]
    },
    {
      "id": "sp-c12",
      "topic": "Lectura crítica · Intervalo de confianza y seguridad",
      "difficulty": "dificil",
      "src": "adjust_pe",
      "vignette": "El criterio de seguridad de ADJUST-PE era que el <span class='hy'>límite superior del IC 95 %</span> de eventos tromboembólicos a 3 meses no pasara de 3 %. Resultado: 1 de 331 pacientes, <span class='hy'>0,3 % (IC 95 % 0,1 % a 1,7 %)</span>. ¿Qué concluyes?",
      "options": [
        "Es seguro: aun el peor escenario (1,7 %) queda bajo 3 %",
        "No es seguro, porque hubo un evento tromboembólico",
        "No se puede concluir sin un valor de p ni un grupo de comparación",
        "Es seguro solo porque 0,3 % es menor que 3 %"
      ],
      "correct": 0,
      "whyCorrect": "La seguridad se juzga con el límite superior del intervalo, no con el valor puntual: si el peor escenario compatible con los datos (1,7 %) está bajo el umbral de 3 %, la estrategia es segura.",
      "pearl": "El umbral de 3 % corresponde a la tasa de eventos tras una angiografía pulmonar negativa.",
      "trap": "Mirar solo el valor puntual (0,3 %) y no el límite superior del intervalo.",
      "cita": [
        {
          "donde": "Métodos · tamaño de la muestra",
          "texto": "the upper limit of the 95% CI around the 3-month thromboembolic risk (failure rate) in patients left untreated on the basis of such a D-dimer result should not be higher than 3%."
        },
        {
          "donde": "Resumen",
          "texto": "The 3-month failure rate in patients with a D-dimer level higher than 500 μg/L but below the age-adjusted cutoff was 1 of 331 patients (0.3% [95% CI, 0.1%-1.7%])."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "Correcta: el límite superior del IC (1,7 %) queda bajo el umbral de 3 %.",
        "No: la seguridad se juzga con el límite superior del IC, que quedó bajo 3 %.",
        "No: el criterio de seguridad era el límite superior del IC 95 %, y se cumplió.",
        "No: se juzga con el límite superior del intervalo, no con el valor puntual."
      ]
    },
    {
      "id": "sp-c13",
      "topic": "Epidemiología · Diferencia absoluta y relativa",
      "difficulty": "residencia",
      "src": "adjust_pe",
      "vignette": "Con el corte por edad, la proporción de dímeros D negativos subió <span class='hy'>11,6 puntos porcentuales</span>, que equivale a un <span class='hy'>41,2 %</span> más. ¿Qué es cada cifra?",
      "options": [
        "11,6 % es relativo y 41,2 % es absoluto",
        "11,6 % es absoluto y 41,2 % es relativo",
        "Las dos son relativas, con distinta base",
        "Las dos son absolutas, de distintos grupos"
      ],
      "correct": 1,
      "whyCorrect": "11,6 % es el aumento absoluto (diferencia de proporciones en puntos porcentuales); 41,2 % es el aumento relativo (ese 11,6 dividido entre la proporción de negativos con el corte de 500). El relativo siempre suena más grande.",
      "pearl": "Para decidir en la práctica sirve la diferencia absoluta: dice a cuántos de cada 100 pacientes les cambia el manejo.",
      "trap": "Presentar el cambio relativo como si fuera absoluto exagera el efecto.",
      "cita": [
        {
          "donde": "Resultados",
          "texto": "the use of the age-adjusted cutoff resulted in an 11.6% absolute increase (95% CI, 10.5%-12.9%) or a 41.2% relative increase (95% CI, 31.3%-52.0%) in the proportion of negative D-dimer results."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: al revés: 11,6 son puntos porcentuales (absoluto) y 41,2 % es relativo.",
        "Correcta: 11,6 es la diferencia absoluta en puntos porcentuales y 41,2 % el aumento relativo.",
        "No: 11,6 es una diferencia absoluta de proporciones.",
        "No: 41,2 % es el aumento relativo sobre la proporción con el corte de 500."
      ]
    },
    {
      "id": "sp-c14",
      "topic": "Lectura crítica · Validación de un puntaje",
      "difficulty": "dificil",
      "src": "precise_dapt",
      "vignette": "El puntaje PRECISE-DAPT tuvo un <span class='hy'>índice c de 0,73</span> para sangrado en la cohorte donde se creó, y de <span class='hy'>0,70 y 0,66</span> en dos cohortes de validación externa. ¿Cómo se interpreta?",
      "options": [
        "Predice con exactitud el sangrado de cada paciente individual",
        "No sirve, porque su desempeño bajó en las cohortes de validación",
        "Discrimina moderadamente; bajar al validarlo es lo esperado",
        "El índice c mide la calibración: riesgo predicho igual al observado"
      ],
      "correct": 2,
      "whyCorrect": "El índice c (área bajo la curva) indica con qué frecuencia el puntaje asigna más riesgo a quien sangra que a quien no: 0,5 es azar y 1 es perfecto; 0,66 a 0,73 es discriminación moderada. Que baje en cohortes externas es lo usual y por eso se exige validarlo fuera de donde se creó.",
      "pearl": "Discriminación (índice c) y calibración (si el riesgo predicho coincide con el observado) son cosas distintas.",
      "trap": "Confundir discriminación con calibración, o esperar el mismo desempeño en la validación externa.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "showed a c-index for out-of-hospital TIMI major or minor bleeding of 0·73 (95% CI 0·61–0·85) in the derivation cohort, and 0·70 (0·65–0·74) in the PLATO trial validation cohort and 0·66 (0·61–0·71) in the BernPCI registry validation cohort."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: un índice c de 0,66 a 0,73 es discriminación moderada, no exactitud individual.",
        "No: que el desempeño baje en cohortes externas es lo usual.",
        "Correcta: 0,66 a 0,73 es discriminación moderada, y bajar en la validación externa es lo usual.",
        "No: el índice c mide discriminación, no calibración."
      ]
    },
    {
      "id": "sp-c15",
      "topic": "Lectura crítica · Número necesario para dañar",
      "difficulty": "residencia",
      "src": "precise_dapt",
      "vignette": "En pacientes con PRECISE-DAPT de 25 o más, la doble antiagregación larga (12 a 24 meses) frente a corta (3 a 6) aumentó el sangrado con una <span class='hy'>diferencia absoluta de riesgo de +2,59 %</span>. ¿Cuántos hay que tratar con el esquema largo para causar un sangrado más?",
      "options": [
        "Unos 4",
        "Unos 26",
        "Unos 38",
        "Unos 259"
      ],
      "correct": 2,
      "whyCorrect": "El número necesario para dañar es 1 dividido por la diferencia absoluta de riesgo: 1 / 0,0259 ≈ 38.",
      "pearl": "En esos mismos pacientes de alto riesgo de sangrado, el esquema largo no redujo los eventos isquémicos; en los de riesgo no alto sí (NNT 65).",
      "trap": "Dividir 100 entre 2,59 mal ubicando la coma, o usar la reducción relativa en lugar de la absoluta.",
      "cita": [
        {
          "donde": "Resultados",
          "texto": "exclusively in patients at high bleeding risk (absolute risk difference [ARD] +2·59% [95% CI +0·82 to +4·34]; number needed to treat: 38)"
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: el NNH es 1/0,0259 ≈ 38.",
        "No: 1 dividido por la diferencia absoluta (0,0259) da ≈ 38.",
        "Correcta: NNH = 1 / diferencia absoluta = 1/0,0259 ≈ 38.",
        "No: 259 sale de ubicar mal la coma; el NNH es ≈ 38."
      ]
    },
    {
      "id": "sp-c16",
      "topic": "Lectura crítica · Interacción entre subgrupos",
      "difficulty": "dificil",
      "src": "precise_dapt",
      "vignette": "En el análisis de PRECISE-DAPT, la doble antiagregación larga aumentó el sangrado en los de alto riesgo (+2,59 %) pero no en los demás (+0,14 %), con <span class='hy'>p de interacción = 0,007</span>. ¿Qué significa ese valor?",
      "options": [
        "Que el tratamiento no sirve en ningún grupo",
        "Que el efecto difiere según el riesgo de sangrado",
        "Que los dos subgrupos tienen el mismo efecto con distinta precisión",
        "Que el estudio tiene poco poder estadístico"
      ],
      "correct": 1,
      "whyCorrect": "La prueba de interacción compara el efecto entre subgrupos. Un p de interacción bajo indica que el efecto del tratamiento cambia según el subgrupo (modificación del efecto), no solo que en uno fue significativo y en el otro no.",
      "pearl": "Comparar un subgrupo «significativo» con otro «no significativo» no basta; hay que mirar la p de interacción.",
      "trap": "Concluir diferencias entre subgrupos sin prueba de interacción.",
      "cita": [
        {
          "donde": "Resultados",
          "texto": "but not in those without a high bleeding risk profile (ie, very low risk, low risk, and moderate risk: mean of the first three quartiles ARD +0·14% [–0·22 to +0·49]; pinteraction=0·007; figure 3)."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: el sangrado aumentó en los de alto riesgo y no en los demás: el efecto difiere.",
        "Correcta: un p de interacción bajo indica que el efecto cambia según el subgrupo.",
        "No: un p de interacción de 0,007 indica que el efecto difiere entre subgrupos.",
        "No: el p de interacción compara el efecto entre subgrupos; no mide el poder."
      ]
    },
    {
      "id": "sp-c17",
      "topic": "Lectura crítica · Desenlace compuesto",
      "difficulty": "dificil",
      "src": "triton",
      "vignette": "En TRITON-TIMI 38, el desenlace primario (muerte cardiovascular, IAM no fatal o ACV no fatal) bajó de <span class='hy'>12,1 % a 9,9 %</span> con prasugrel. El IAM bajó de <span class='hy'>9,7 % a 7,4 %</span> y la mortalidad global no difirió. ¿Qué concluyes?",
      "options": [
        "Prasugrel reduce la mortalidad cardiovascular",
        "El beneficio lo explica sobre todo el infarto",
        "Cada componente bajó en la misma proporción",
        "El compuesto no sirve si la mortalidad no cambia"
      ],
      "correct": 1,
      "whyCorrect": "En un desenlace compuesto hay que mirar cada componente: aquí la reducción la explica casi toda el infarto (bajó 2,3 puntos, tanto como el compuesto, que bajó 2,2), sin diferencia en la mortalidad global.",
      "pearl": "El beneficio neto (muerte, IAM, ACV y sangrado mayor) favoreció a prasugrel: 13,9 % frente a 12,2 %.",
      "trap": "Leer la reducción del compuesto como si cada componente, incluida la muerte, hubiera bajado igual.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "The primary efficacy end point occurred in 12.1% of patients receiving clopidogrel and 9.9% of patients receiving prasugrel (hazard ratio for prasugrel vs. clopidogrel, 0.81; 95% confidence interval [CI], 0.73 to 0.90; P<0.001). We also found significant reductions in the prasugrel group in the rates of myocardial infarction (9.7% for clopidogrel vs. 7.4% for prasugrel; P<0.001)"
        },
        {
          "donde": "Resumen",
          "texto": "Overall mortality did not differ significantly between treatment groups."
        }
      ],
      "verificado": "2026-11-22",
      "porOpcion": [
        "No: la mortalidad global no difirió entre los grupos; el compuesto bajó por otro componente.",
        "Correcta: el infarto bajó 2,3 puntos, casi lo mismo que el compuesto (2,2): él explica el beneficio.",
        "No: los componentes no bajaron igual; el infarto explica casi toda la reducción y la mortalidad no cambió.",
        "No: el compuesto sí es válido, pero se lee mirando cada componente por separado."
      ]
    },
    {
      "id": "sp-c18",
      "topic": "Salud pública · Mama: tamizaje de cáncer",
      "difficulty": "basica",
      "src": "res3280",
      "vignette": "Mujer de 52 años, sin antecedentes familiares, en el control de promoción y mantenimiento. ¿Qué tamizaje de mama le corresponde?",
      "options": [
        "Ecografía mamaria cada año desde los 40 años",
        "Mamografía cada 2 años hasta los 69",
        "Mamografía cada año desde los 40 años de edad",
        "Solo autoexamen mensual y consulta si nota una masa"
      ],
      "correct": 1,
      "whyCorrect": "La ruta de promoción y mantenimiento indica examen clínico de la mama cada año desde los 40 y mamografía de 2 proyecciones cada 2 años entre los 50 y 69 años. Con BI-RADS 1 o 2, se sigue el mismo esquema.",
      "pearl": "BI-RADS 3: adelantar el seguimiento según la ruta de cáncer de mama. BI-RADS 4 o 5: búsqueda activa y confirmación diagnóstica.",
      "trap": "Usar la ecografía como tamizaje poblacional.",
      "cita": [
        {
          "donde": "Resolución 3280 de 2018 · Tamización de cáncer de mama",
          "texto": "Mujeres a partir de los 40 años: Examen clínico de la mama cada año. Mujeres de 50 a 69 años: Mamografía de 2 proyecciones cada 2 años."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: el tamizaje es la mamografía cada 2 años de los 50 a los 69, no la ecografía.",
        "Correcta: mamografía de 2 proyecciones cada 2 años entre los 50 y los 69 años.",
        "No: desde los 40 va el examen clínico anual; la mamografía es cada 2 años de 50 a 69.",
        "No: le corresponden examen clínico anual y mamografía cada 2 años."
      ]
    },
    {
      "id": "sp-c19",
      "topic": "Salud pública · Colon: tamizaje de cáncer colorrectal",
      "difficulty": "basica",
      "src": "res3280",
      "vignette": "Hombre de 55 años, sin antecedentes familiares ni síntomas. Nunca se ha tamizado para cáncer colorrectal y en su municipio no hay colonoscopia disponible. ¿Qué le ordenas?",
      "options": [
        "Sangre oculta inmunoquímica cada 2 años",
        "Colonoscopia cada 5 años, obligatoria aunque no haya",
        "Antígeno carcinoembrionario anual como tamizaje",
        "Nada hasta que tenga sangrado o cambio del hábito"
      ],
      "correct": 0,
      "whyCorrect": "Desde los 50 años, el tamizaje es sangre oculta en materia fecal inmunoquímica cada dos años, o colonoscopia cada diez años si está disponible. Quien tiene factores de riesgo pasa a la ruta de cáncer de colon.",
      "pearl": "Sangre oculta positiva → colonoscopia.",
      "trap": "Pedir antígeno carcinoembrionario como tamizaje: no sirve para eso.",
      "cita": [
        {
          "donde": "Resolución 3280 de 2018 · Tamización de cáncer de colon y recto",
          "texto": "Hombres y mujeres iguales o mayores a 50 años: sangre oculta en materia fecal inmunoquímica cada dos años o colonoscopia cada diez años cuando esta se encuentre disponible."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "Correcta: sin colonoscopia disponible, sangre oculta inmunoquímica cada 2 años desde los 50.",
        "No: la colonoscopia cada 10 años es la opción cuando está disponible.",
        "No: el antígeno carcinoembrionario no sirve como tamizaje.",
        "No: desde los 50 años se tamiza sin esperar síntomas."
      ]
    },
    {
      "id": "sp-c20",
      "topic": "Salud pública · Próstata: tamizaje de cáncer",
      "difficulty": "residencia",
      "src": "res3280",
      "vignette": "Hombre de 44 años cuyo <span class='hy'>padre tuvo cáncer de próstata</span>. Pregunta si debe tamizarse. ¿Qué le respondes según la ruta?",
      "options": [
        "No: el tamizaje empieza a los 50 años para todos los hombres",
        "Sí: tacto rectal desde los 40 por su antecedente",
        "Solo PSA anual desde ya, sin tacto rectal",
        "Biopsia de próstata por el antecedente familiar"
      ],
      "correct": 1,
      "whyCorrect": "Entre los 50 y 75 años se hace tacto rectal y antígeno prostático cada 5 años, con decisión informada. Con factores de riesgo (antecedente familiar o raza negra) el tacto rectal se ofrece desde los 40 años.",
      "pearl": "PSA y tacto rectal cada 5 años, previa explicación de riesgos y beneficios: decisión compartida.",
      "trap": "Esperar a los 50 años en un hombre con antecedente familiar.",
      "cita": [
        {
          "donde": "Resolución 3280 de 2018 · Tamización de cáncer de próstata",
          "texto": "Hombres entre 50 y 75 años: Examen clínico de la próstata (tacto rectal) cada cinco (5) años; o en mayores de 40 años con factores de riesgo (antecedentes familiares o que sean de raza negra)."
        }
      ],
      "verificado": "2026-11-23",
      "porOpcion": [
        "No: con antecedente familiar, el tacto rectal se ofrece desde los 40 años.",
        "Correcta: con antecedente familiar, tacto rectal desde los 40 años.",
        "No: la ruta ofrece el tacto rectal desde los 40 a quien tiene factores de riesgo.",
        "No: el tamizaje es el tacto rectal desde los 40, no la biopsia."
      ]
    }
  ],
  "fichas": [
    {
      "id": "sp-f01",
      "title": "Pruebas diagnósticas: qué depende de la prevalencia",
      "badge": "Pruebas diagnósticas",
      "area": "Pruebas diagnósticas",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Sensibilidad",
          "val": "Capacidad de identificar bien a quienes tienen la enfermedad: VP / (VP + FN)"
        },
        {
          "label": "Especificidad",
          "val": "Capacidad de identificar bien a quienes no la tienen: VN / (VN + FP)"
        },
        {
          "label": "Valor predictivo positivo",
          "val": "VP / todos los positivos (VP + FP): probabilidad de enfermedad si sale positiva"
        },
        {
          "label": "Valor predictivo negativo",
          "val": "VN / todos los negativos (VN + FN)"
        },
        {
          "label": "Prevalencia",
          "val": "A mayor prevalencia, mayor VPP: la misma prueba rinde distinto en población de alto y de bajo riesgo"
        }
      ],
      "redFlag": "Con prevalencia de 1 %, una prueba con sensibilidad y especificidad de 90 % tiene un VPP de solo ≈ 8 %.",
      "trap": "Decirle a un paciente con prueba positiva que tiene 90 % de probabilidad de estar enfermo porque la sensibilidad es 90 %.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Validity of screening tests»",
          "texto": "The sensitivity of the test is defined as the ability of the test to correctly identify those who have the disease. The specificity of the test is defined as the ability of the test to correctly identify those who do not have the disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Predictive value of a test»",
          "texto": "To calculate the PPV, we divide the number of true positives by the total number who tested positive (true positives + false positives)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Predictive value of a test»",
          "texto": "It is calculated by dividing the number of true negatives by all those who tested negative (true negatives + false negatives)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Relationship between positive predictive value and disease prevalence»",
          "texto": "As we have seen, the higher the prevalence, the higher the predictive value."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f02",
      "title": "Impacto de un tratamiento: eficacia, NNT y NNH",
      "badge": "Medidas de efecto",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Diferencia de riesgo (reducción absoluta)",
          "val": "Tasa en no tratados − tasa en tratados"
        },
        {
          "label": "Eficacia (reducción relativa)",
          "val": "(Tasa con placebo − tasa con la intervención) / tasa con placebo"
        },
        {
          "label": "NNT",
          "val": "1 / (tasa en no tratados − tasa en tratados): pacientes a tratar para evitar un evento; se redondea hacia arriba"
        },
        {
          "label": "NNH",
          "val": "El mismo cálculo con los efectos adversos: tratados para que uno más sufra daño"
        }
      ],
      "trap": "Dejarse convencer por la reducción relativa: 50 % relativo puede ser solo 1 % absoluto (NNT 100).",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Number needed to treat»",
          "texto": "Another approach, therefore, for expressing the results of randomized trials is to estimate the number of patients who would need to be treated (NNT) to prevent one adverse outcome such as one death."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Number needed to treat»",
          "texto": "Estimates of NNT are usually rounded up to the next highest whole number."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Number needed to treat»",
          "texto": "The same approach can also be used to look at the risk of side effects by calculating the number needed to harm (NNH) to cause one additional person to be harmed."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), eficacia",
          "texto": "This formula tells us the extent of the reduction in disease by use of the vaccine."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f03",
      "title": "Diseños de estudio y su medida de asociación",
      "badge": "Diseños",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Cohorte",
          "val": "Parte de expuestos y no expuestos, todos sin la enfermedad; el RR se calcula directamente"
        },
        {
          "label": "Casos y controles",
          "val": "Parte de enfermos (casos) y no enfermos (controles); se estima con odds ratio"
        },
        {
          "label": "Transversal («de prevalencia»)",
          "val": "Exposición y enfermedad a la vez: casos prevalentes, sin saber si la exposición precedió"
        },
        {
          "label": "Enfermedad rara",
          "val": "Una cohorte necesitaría una población enorme"
        },
        {
          "label": "Ensayo clínico aleatorizado",
          "val": "Diseño ideal para evaluar eficacia y efectos adversos de una intervención"
        }
      ],
      "trap": "Calcular riesgo relativo o incidencia en un estudio de casos y controles.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Case-control studies»",
          "texto": "At this point, we should emphasize that the hallmark of the case-control study is that it begins with people with the disease (cases) and compares them to people without the disease (controls)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Case-control studies»",
          "texto": "This is in contrast to the design of a cohort study that will be discussed in Chapter 8, which begins with a group of exposed people and compares them to an unexposed group, all of whom are free of the disease at baseline or at the time of enrollment to the study."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Cross-sectional studies»",
          "texto": "which is the reason why a cross-sectional study is also called a “prevalence study”), because we know that they existed at the time of the study, but we do not know their duration (the interval between the onset of the disease and “today”), or whether the exposure happened before the outcome."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), cohortes y enfermedades raras",
          "texto": "In contrast, if we conduct a cohort study for a rare disease, an extremely large study population may be needed in order to observe a sufficient number of individuals in the cohort develop the disease in question."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Randomization»",
          "texto": "The randomized trial is considered the ideal design for evaluating both the efficacy and the side effects of new forms of intervention."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), «Calculating the relative risk in cohort studies»",
          "texto": "In a cohort study the relative risk can be calculated directly."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f04",
      "title": "Sesgos y confusión",
      "badge": "Validez",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Selección",
          "val": "La forma de elegir casos y controles (o expuestos y no expuestos) crea una asociación que no existe"
        },
        {
          "label": "Información (memoria)",
          "val": "Los casos recuerdan su exposición mejor que los controles"
        },
        {
          "label": "Confusión",
          "val": "Tercer factor que es factor de riesgo de la enfermedad y se asocia a la exposición sin ser resultado de ella"
        },
        {
          "label": "Anticipación (lead time)",
          "val": "El tamizaje alarga la supervivencia desde el diagnóstico sin retrasar la muerte"
        }
      ],
      "redFlag": "El beneficio de un tamizaje se demuestra con menor mortalidad por la enfermedad, no con mayor supervivencia desde el diagnóstico.",
      "trap": "Llamar sesgo a la confusión: el sesgo es un error del estudio; la confusión es un hallazgo real que hay que entender.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Selection bias»",
          "texto": "If the way in which cases and controls, or exposed and unexposed individuals, were selected is such that an apparent association is observed—even if, in reality, exposure and disease are not associated—the apparent association is the result of selection bias."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Information bias»",
          "texto": "This bias operates to enhance recall in cases compared with controls."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Confounding»",
          "texto": "we say that a third factor, factor X, is a confounder if the following are true: 1. Factor X is a known risk factor for disease B. 2. Factor X is associated with exposure A, but is not a result of exposure A."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Lead time bias»",
          "texto": "Survival seems better because the interval from diagnosis to death is longer, but the patient is not any better off because death has not been delayed."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), confusión frente a sesgo",
          "texto": "Bias is a result of an error in the way that the study has been carried out, but confounding is a valid finding that describes the nature of the relationship among several factors and the risk of disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Lead time bias»",
          "texto": "Another strategy is to compare mortality from the disease in the entire screened group with that in the unscreened group, rather than just the cumulative survival or its reciprocal, the case fatality rate, in those in whom disease was detected by screening."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f05",
      "title": "Errores tipo I y II, y poder",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Error tipo I (α)",
          "val": "Concluir que hay diferencia entre los tratamientos cuando no la hay"
        },
        {
          "label": "Error tipo II (β)",
          "val": "No detectar una diferencia que sí existe"
        },
        {
          "label": "Poder",
          "val": "1 − β: probabilidad de detectar la diferencia si existe"
        },
        {
          "label": "Valores habituales",
          "val": "α de 0,05 o 0,01; poder de 80 % o 90 %"
        }
      ],
      "trap": "Tomar un ensayo pequeño sin diferencias como prueba de que los tratamientos son iguales: puede ser un error tipo II.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Sample size»",
          "texto": "There are times when there is no difference between the therapies, but on the basis of the samples of subjects included in our study, we erroneously conclude that they differ (cell c). This is called a type I error."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Sample size»",
          "texto": "It is also possible that there really is a difference between the therapies, but on the basis of the samples included in our study we erroneously conclude that there is no difference (cell b); this is called a type II error."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Sample size»",
          "texto": "This probability, 1 − β, is called the power of the study."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Sample size»",
          "texto": "values of 0.05 or 0.01 are commonly used in research."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Sample size»",
          "texto": "powers of 80% or 90% are commonly used."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f06",
      "title": "Bayes en la cabecera: de la probabilidad pre-test a la post-test",
      "badge": "Pruebas diagnósticas",
      "area": "Pruebas diagnósticas",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Odds pre-test",
          "val": "probabilidad / (1 − probabilidad): 20 % → 0,25"
        },
        {
          "label": "Odds post-test",
          "val": "odds pre-test × razón de verosimilitud (LR)"
        },
        {
          "label": "Volver a probabilidad",
          "val": "odds / (1 + odds): 0,25 × 10 = 2,5 → 71 %"
        },
        {
          "label": "LR que cambian la conducta",
          "val": "LR+ > 10 confirma; LR− < 0,1 descarta; entre 0,5 y 2 casi no cambia nada"
        }
      ],
      "redFlag": "Una prueba excelente no sirve si la probabilidad pre-test es muy baja o muy alta: el resultado casi no cambia la decisión.",
      "trap": "Sumar el LR a la probabilidad: el LR multiplica odds, no porcentajes.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f07",
      "title": "Punto de corte: sensibilidad frente a especificidad",
      "badge": "Pruebas diagnósticas",
      "area": "Pruebas diagnósticas",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Bajar el punto de corte",
          "val": "Más positivos: sube la sensibilidad y baja la especificidad"
        },
        {
          "label": "Subir el punto de corte",
          "val": "Sube la especificidad y baja la sensibilidad"
        },
        {
          "label": "Cómo elegirlo",
          "val": "Según la importancia que se dé a los falsos positivos y a los falsos negativos"
        },
        {
          "label": "Costo de los falsos positivos",
          "val": "Emocional y económico, y la dificultad de «quitar la etiqueta» a quien no estaba enfermo"
        }
      ],
      "trap": "Creer que moviendo el punto de corte se gana sensibilidad sin perder especificidad.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Validity of screening tests»",
          "texto": "Thus, there is a tradeoff between sensitivity and specificity: if we increase the sensitivity by lowering the cutoff level, we decrease the specificity; if we increase the specificity by raising the cutoff level, we decrease the sensitivity."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Validity of screening tests»",
          "texto": "The choice of a high or a low cutoff level for screening therefore depends on the importance we attach to false positives and false negatives."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Validity of screening tests»",
          "texto": "False positives are associated with costs—emotional and financial—as well as with the difficulty of “delabeling” a person who tests positive and is later found not to have the disease."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f08",
      "title": "Pruebas en serie y en paralelo",
      "badge": "Pruebas diagnósticas",
      "area": "Pruebas diagnósticas",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "En serie (la segunda solo a los positivos)",
          "val": "Pierde sensibilidad neta y gana especificidad neta: reduce los falsos positivos"
        },
        {
          "label": "Sensibilidad neta en serie",
          "val": "S1 × S2 (por ejemplo, 0,70 × 0,90 = 0,63)"
        },
        {
          "label": "Simultáneas (positivo si cualquiera lo es)",
          "val": "Gana sensibilidad neta y pierde especificidad neta"
        },
        {
          "label": "Negativo en simultáneas",
          "val": "Solo quien sale negativo en todas las pruebas"
        }
      ],
      "redFlag": "Tamizaje en dos etapas: primero la prueba más barata o menos invasiva y luego, solo a los positivos, la más costosa.",
      "trap": "Esperar que una segunda prueba a los positivos aumente la sensibilidad: en serie, la sensibilidad neta baja.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Sequential (two-stage) testing»",
          "texto": "In sequential (or two-stage) screening, a less expensive, less invasive, or less uncomfortable test is generally performed first, and those who screen positive are recalled for further testing with a more expensive, more invasive, or more uncomfortable test, which may have greater sensitivity and specificity. It is hoped that bringing back for further testing only those who screen positive will reduce the problem of false positives."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Use of multiple tests»",
          "texto": "In sequential testing, when we retest those who tested positive on the first test, there is a loss in net sensitivity and a gain in net specificity."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Sequential (two-stage) testing»",
          "texto": "which can also be calculated by multiplying the sensitivity of the first test times the sensitivity of the second test"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Use of multiple tests»",
          "texto": "In simultaneous testing, because an individual who tests positive on any one or multiple tests is considered positive, there is a gain in net sensitivity. However, to be considered negative, a person would have to test negative on all the tests performed. As a result, there is a loss in net specificity."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f09",
      "title": "Concordancia entre observadores: índice kappa",
      "badge": "Confiabilidad",
      "area": "Confiabilidad y validez",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Qué mide",
          "val": "Cuánto supera el acuerdo observado al esperado por azar, como proporción de la mejora máxima posible"
        },
        {
          "label": "Fórmula",
          "val": "(% acuerdo observado − % esperado por azar) / (100 % − % esperado por azar)"
        },
        {
          "label": "Interpretación (Landis y Koch, citados por Gordis)",
          "val": "> 0,75 excelente · 0,40 a 0,75 intermedia a buena · < 0,40 pobre"
        },
        {
          "label": "Kappa = 0",
          "val": "El acuerdo es el que daría el azar"
        }
      ],
      "trap": "Un porcentaje de acuerdo alto no basta: si casi todo es normal, dos observadores coinciden mucho por azar.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Rationale of the kappa statistic»",
          "texto": "Thus, kappa quantifies the extent to which the observed agreement that the observers achieved exceeds that which would be expected by chance alone, and expresses it as the proportion of the maximum improvement that could occur beyond the agreement expected by chance alone."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Calculation of the kappa statistic»",
          "texto": "Landis and Koch 5 suggested that a kappa greater than 0.75 represents excellent agreement beyond chance, a kappa below 0.40 represents poor agreement, and a kappa of 0.40 to 0.75 represents intermediate to good agreement."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f10",
      "title": "Validez y confiabilidad: no son lo mismo",
      "badge": "Confiabilidad",
      "area": "Confiabilidad y validez",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Validez",
          "val": "Los resultados se agrupan alrededor del valor real"
        },
        {
          "label": "Confiabilidad (repetibilidad)",
          "val": "Da el mismo resultado al repetir la prueba"
        },
        {
          "label": "Fuentes de variación",
          "val": "Intrasujeto, intraobservador e interobservador"
        },
        {
          "label": "Lo que se busca",
          "val": "Resultados válidos y confiables a la vez"
        }
      ],
      "trap": "Una prueba puede ser muy reproducible y estar siempre equivocada: un tensiómetro mal calibrado da cifras estables pero falsas.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Relationship between validity and reliability» (Fig. 5.16)",
          "texto": "The curve is narrow, indicating that the results are quite reliable (repeatable); unfortunately, however, they cluster far from the true value, so they are not valid."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Relationship between validity and reliability» (Fig. 5.17)",
          "texto": "However, the values obtained cluster around the true value and thus are valid."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Reliability (repeatability) of tests»",
          "texto": "intrasubject variation (variation within individual subjects), intraobserver variation (variation in the reading of test results by the same reader), and interobserver variation (variation between those reading the test results)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Relationship between validity and reliability»",
          "texto": "Clearly, what we would like to achieve are results that are both valid and reliable"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f11",
      "title": "Incidencia, densidad de incidencia y prevalencia",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Incidencia acumulada (riesgo)",
          "val": "Casos nuevos / población en riesgo, en un periodo definido"
        },
        {
          "label": "Densidad de incidencia (tasa)",
          "val": "Casos nuevos / personas-tiempo en riesgo; útil con seguimientos de distinta duración"
        },
        {
          "label": "Prevalencia",
          "val": "Casos existentes / población total, en un momento dado"
        },
        {
          "label": "Relación",
          "val": "Prevalencia ≈ incidencia × duración (estado estable y prevalencia no muy alta)"
        }
      ],
      "trap": "En la población en riesgo de la incidencia no entran quienes ya tienen la enfermedad.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Cumulative incidence»",
          "texto": "It is defined as the frequency of new cases of a disease that occur during a specified period of time in a population at risk for developing the disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Incidence»",
          "texto": "For the incidence to be meaningful, any individual who is included in the denominator must have the potential to become part of the group that is counted in the numerator."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Incidence rate»",
          "texto": "When different individuals are observed for different lengths of time, as occurs most commonly in longitudinal studies, we can calculate an incidence rate (also called an incidence density), in which the denominator consists of the sum of the units of time that each individual was at risk and was observed."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Prevalence»",
          "texto": "Prevalence proportion is defined as the number of affected persons present in the population at a specific time divided by the number of persons in the population at that time"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Relationship between incidence and prevalence»",
          "texto": "in a steady-state situation, in which the rates are not changing, and in-migration equals out-migration in the populations being examined, and when the prevalence is not too high, the following equation applies: Prevalence = Incidence × Duration of Disease"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f12",
      "title": "Mortalidad y letalidad",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Tasa de mortalidad",
          "val": "Muertes en un periodo / población a mitad del periodo; lo que se restrinja en el numerador (edad, causa) se restringe en el denominador"
        },
        {
          "label": "Letalidad",
          "val": "Muertes por la enfermedad en un tiempo dado / personas con la enfermedad: mide gravedad"
        },
        {
          "label": "Mortalidad como reflejo de la incidencia",
          "val": "Solo si la letalidad es alta y la enfermedad dura poco (rabia no tratada)"
        }
      ],
      "trap": "Confundir mortalidad con letalidad: una enfermedad rara puede tener baja mortalidad poblacional y letalidad altísima (rabia).",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Case-fatality»",
          "texto": "Thus, case-fatality is a measure of the severity or fatality of the disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), tasas de mortalidad",
          "texto": "In putting a restriction on age, for example, the same restriction must apply to both the numerator and the denominator, so that every person in the denominator group will be at risk for entering the numerator group."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), mortalidad e incidencia",
          "texto": "A mortality rate is a good reflection of the incidence rate under two conditions: first, when the case-fatality is high (as in untreated rabies), and second, when the duration of disease (survival) is short (as in COVID-19)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), tasas de mortalidad",
          "texto": "Note that because the population changes over time, the number of persons in the population at midyear is generally used as an approximation of average population in that year."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Case-fatality»",
          "texto": "In other words, what percentage of people who have a certain disease die within a certain time after their disease was diagnosed?"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f13",
      "title": "Ajuste de tasas por edad: directo e indirecto",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Para qué",
          "val": "Eliminar el efecto de las diferencias de edad al comparar poblaciones"
        },
        {
          "label": "Método directo",
          "val": "Aplica las tasas por edad de cada población a una misma población estándar"
        },
        {
          "label": "Método indirecto (RME)",
          "val": "Se usa cuando no se conocen las muertes por grupo de edad: muertes observadas / esperadas"
        },
        {
          "label": "Razón de mortalidad estandarizada",
          "val": "> 100: más muertes de las esperadas; < 100: menos"
        }
      ],
      "trap": "Las tasas ajustadas sirven solo para comparar: no son la tasa real de ninguna de las dos poblaciones.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Direct age adjustment»",
          "texto": "In direct age adjustment, a standard population is used in order to eliminate the effects of any differences in age between two or more populations being compared"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Indirect age adjustment»",
          "texto": "Indirect age adjustment is often used when numbers of deaths for each age-specific stratum are not available."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Indirect age adjustment»",
          "texto": "An SMR greater than 100 indicates that the observed number of deaths exceeds the expected number, and an SMR less than 100 indicates that the observed number of deaths is less than the expected number."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), tasas ajustadas",
          "texto": "They do not reflect the true mortality risk of a “real” population because the numerical value of an age-adjusted death rate depends on the standard population used."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f14",
      "title": "Riesgo atribuible: cuánto se evitaría quitando la exposición",
      "badge": "Medidas de impacto",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Riesgo atribuible en expuestos",
          "val": "Incidencia en expuestos − incidencia en no expuestos"
        },
        {
          "label": "Proporción atribuible en expuestos",
          "val": "(Incidencia en expuestos − en no expuestos) / incidencia en expuestos"
        },
        {
          "label": "Riesgo atribuible poblacional",
          "val": "Incidencia en la población total − incidencia en no expuestos"
        },
        {
          "label": "Proporción atribuible poblacional",
          "val": "Lo anterior / incidencia total; con la fórmula de Levin depende de la proporción de expuestos y del RR"
        }
      ],
      "redFlag": "Para decidir políticas de salud pública pesa el riesgo atribuible poblacional; el RR sirve para estudiar la etiología.",
      "trap": "Un RR alto con una exposición rara puede evitar menos casos en la población que un RR modesto con una exposición frecuente.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 13 (pp. 258–267), «Attributable risk»",
          "texto": "the attributable risk, which is defined as the amount or proportion of disease incidence (or disease risk) that can be attributed to a specific exposure."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 13 (pp. 258–267), riesgo atribuible poblacional",
          "texto": "The attributable risk for the total population (population attributable risk [PAR]) is a valuable concept for the public health worker."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 13 (pp. 258–267), fórmula de Levin",
          "texto": "where p is the proportion of the population with the characteristic or exposure and r is the relative risk (or odds ratio)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 13 (pp. 258–267), riesgo relativo frente a atribuible",
          "texto": "Thus, the attributable risk has major applications in clinical practice and public health whereas the relative risk is valuable in etiologic studies of disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 13 (pp. 258–267), «Attributable risk for the exposed group»",
          "texto": "We could instead ask, “What proportion of the risk in exposed persons is due to the exposure?”"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f15",
      "title": "Odds ratio frente a riesgo relativo",
      "badge": "Medidas de asociación",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Odds ratio (tabla 2 × 2)",
          "val": "(a × d) / (b × c): razón de productos cruzados"
        },
        {
          "label": "Riesgo relativo",
          "val": "Riesgo en expuestos / riesgo en no expuestos; en cohortes se calcula directamente"
        },
        {
          "label": "Enfermedad rara",
          "val": "El OR se aproxima al RR"
        },
        {
          "label": "Valor nulo",
          "val": "RR = 1: sin asociación; > 1: asociación positiva; < 1: posible protección"
        }
      ],
      "trap": "Leer el OR de un estudio de casos y controles como riesgo relativo cuando la enfermedad no es rara.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), «Relative risk»",
          "texto": "“What is the ratio of the risk of disease in exposed individuals to the risk of disease in unexposed individuals?” This ratio is called the relative risk (RR):"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), «Odds ratio»",
          "texto": "The odds ratio is also known as the cross-products ratio, because it can be obtained by multiplying"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), OR como estimador del RR",
          "texto": "If a disease is rare, both"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), OR como estimador del RR",
          "texto": "the odds ratio will then approximate the relative risk."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), tabla 12.4",
          "texto": "If RR = 1 Risk in exposed equal to risk in unexposed (no association)"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), tabla 12.4",
          "texto": "If RR < 1 Risk in exposed less than risk in unexposed (negative association; possibly protective)"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f16",
      "title": "Supervivencia: Kaplan-Meier y hazard ratio",
      "badge": "Análisis de supervivencia",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Kaplan-Meier",
          "val": "Sin intervalos fijos: cada muerte (o evento) cierra un intervalo y abre otro"
        },
        {
          "label": "Pérdidas en el seguimiento (censura)",
          "val": "Se asume que su supervivencia es igual a la de quienes siguen en el estudio"
        },
        {
          "label": "Mediana de supervivencia",
          "val": "Tiempo en que sobrevive la mitad (50 %) de la población estudiada"
        },
        {
          "label": "Mediana frente a media",
          "val": "La mediana se afecta menos por valores extremos"
        }
      ],
      "trap": "Suponer que las pérdidas en el seguimiento no importan: el análisis asume que les fue igual que a los demás, y eso a menudo es dudoso.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «The Kaplan-Meier method»",
          "texto": "Rather, we identify the exact point in time when each death, or the event of interest, occurred so that each death, or event, terminates the previous interval and a new interval (and a new row in the Kaplan-Meier table) is started."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), supuestos del análisis de supervivencia",
          "texto": "the second assumption made in survival analysis is that the survival experience of people who are lost to follow-up is the same as the experience of those who are followed up (also named, “not-informative censoring”)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Median survival time»",
          "texto": "Another approach to expressing prognosis is the median survival time, which is defined as the length of time that half (50%) of the study population survives."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Median survival time»",
          "texto": "First, it is less affected by extremes, whereas the mean can be significantly affected by even a single outlier."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f17",
      "title": "Intención de tratar, por protocolo y ocultamiento de la asignación",
      "badge": "Ensayos clínicos",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Intención de tratar (ITT)",
          "val": "Cada paciente se analiza en el grupo asignado, lo haya recibido o no; conserva la aleatorización"
        },
        {
          "label": "Por protocolo",
          "val": "Solo quienes cumplieron el tratamiento; rompe la aleatorización y tiende a exagerar el efecto"
        },
        {
          "label": "Ocultamiento de la asignación",
          "val": "Quien recluta no sabe a qué grupo irá el siguiente paciente: protege la aleatorización"
        },
        {
          "label": "Cegamiento",
          "val": "Pacientes, tratantes o evaluadores no saben qué recibió cada uno: protege la medición"
        }
      ],
      "trap": "Confundir ocultamiento de la asignación con cegamiento: el ocultamiento siempre es posible, el cegamiento no (cirugía frente a fármaco).",
      "estado": "pendiente"
    },
    {
      "id": "sp-f18",
      "title": "Ensayos de no inferioridad",
      "badge": "Ensayos clínicos",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Pregunta",
          "val": "¿El nuevo tratamiento no es peor que el estándar en más de un margen aceptable?"
        },
        {
          "label": "Margen de no inferioridad (Δ)",
          "val": "Definido antes del estudio, con argumentos clínicos y estadísticos"
        },
        {
          "label": "Conclusión",
          "val": "No inferior si el límite del IC 95 % de la diferencia no cruza el margen"
        },
        {
          "label": "Por qué se hace",
          "val": "El nuevo ofrece otra ventaja: vía oral, menos efectos adversos, menor costo"
        }
      ],
      "redFlag": "En no inferioridad, la ITT puede favorecer una falsa conclusión de no inferioridad: se revisan ITT y por protocolo, y deben coincidir.",
      "trap": "Concluir superioridad o equivalencia de un estudio diseñado solo para no inferioridad.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f19",
      "title": "Desenlaces subrogados y compuestos",
      "badge": "Lectura crítica",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Desenlace subrogado",
          "val": "Marcador intermedio (HbA1c, LDL, presión arterial, carga viral) en lugar de muerte, infarto o ictus"
        },
        {
          "label": "Riesgo del subrogado",
          "val": "Mejorar el marcador no garantiza mejorar lo que importa al paciente (y a veces empeora)"
        },
        {
          "label": "Desenlace compuesto",
          "val": "Suma varios eventos (muerte, infarto, revascularización) para tener más eventos y menor muestra"
        },
        {
          "label": "Cómo leer un compuesto",
          "val": "Mirar qué componente impulsa el efecto: si es el más leve, el beneficio importa menos"
        }
      ],
      "trap": "Aceptar un fármaco nuevo solo porque baja un marcador, sin datos de desenlaces clínicos.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f20",
      "title": "Análisis de subgrupos: cuándo creerle",
      "badge": "Lectura crítica",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Más creíble si",
          "val": "Fue especificado antes del estudio, con hipótesis y dirección previstas"
        },
        {
          "label": "Prueba de interacción",
          "val": "La diferencia entre subgrupos debe ser significativa en la prueba de interacción, no solo dentro de uno"
        },
        {
          "label": "Pocos subgrupos",
          "val": "Con muchos subgrupos, alguno sale significativo por azar"
        },
        {
          "label": "Coherencia",
          "val": "Plausible biológicamente y repetido en otros estudios"
        }
      ],
      "trap": "Concluir que un fármaco «solo sirve en mujeres» porque el subgrupo de hombres no fue significativo: eso suele ser falta de poder.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f21",
      "title": "Sesgos del tamizaje: anticipación, duración, sobrediagnóstico y voluntario",
      "badge": "Tamizaje",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Anticipación (lead time)",
          "val": "Se diagnostica antes: la supervivencia parece mayor aunque la muerte no se retrasa"
        },
        {
          "label": "Duración (length-biased sampling)",
          "val": "El tamizaje detecta selectivamente los casos de mejor pronóstico"
        },
        {
          "label": "Sobrediagnóstico (según Gordis)",
          "val": "Sobrelectura: sanos etiquetados como enfermos que inflan la supervivencia de los «casos»"
        },
        {
          "label": "Voluntario",
          "val": "Quien acude suele ser más sano y adherente que la población general"
        },
        {
          "label": "Cómo se evitan",
          "val": "Ensayo aleatorizado con grupos de pronóstico comparable"
        }
      ],
      "redFlag": "Más casos detectados y mejor supervivencia tras el diagnóstico no prueban que el tamizaje salve vidas.",
      "trap": "Atribuir al tamizaje el mejor pronóstico de los casos detectados por él.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Length-biased sampling (prognostic selection)»",
          "texto": "The question is: Does screening selectively identify cases of the disease which have a better prognosis?"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Overdiagnosis bias»",
          "texto": "In addition, because many of the persons with a diagnosis of cancer in the screened group would actually not have cancer and would therefore have a good survival, the results would represent an inflated estimate of survival after screening in persons thought to have cancer"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Referral bias (volunteer bias)»",
          "texto": "Many studies have shown volunteers to be healthier than the general population and to be more likely to comply (to be adherent) with medical recommendations."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), sesgos y diseño aleatorizado",
          "texto": "The problem of selection bias that most significantly affects our interpretation of the findings is best addressed by carrying out the comparison with a randomized study in which care is taken that the two groups have comparable initial prognostic profiles"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Lead time bias»",
          "texto": "Survival seems better because the interval from diagnosis to death is longer, but the patient is not any better off because death has not been delayed."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f22",
      "title": "Casos prevalentes frente a incidentes",
      "badge": "Sesgos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Casos prevalentes",
          "val": "Los que existen al momento del estudio; no se sabe cuánto llevan con la enfermedad"
        },
        {
          "label": "Qué les falta",
          "val": "Excluyen a quienes murieron pronto después de enfermar"
        },
        {
          "label": "Consecuencia",
          "val": "La exposición puede verse menos en prevalentes que en incidentes (tabaquismo previo y enfisema)"
        },
        {
          "label": "Solución",
          "val": "Usar casos incidentes (nuevos), que además permiten ver la secuencia temporal"
        }
      ],
      "trap": "Confundirlo con un sesgo de memoria: el problema es quién sigue vivo para ser estudiado, no qué recuerda.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Cross-sectional studies»",
          "texto": "In other words, identifying only prevalent cases would exclude those who died sooner after the disease developed but before the study was carried out."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Cross-sectional studies»",
          "texto": "In view of its biases, the results of a cross-sectional study should be used to generate hypotheses that can then be evaluated using a study design that includes the identification of incident cases and allows establishing the temporal sequence of the exposure and the outcome."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Cross-sectional studies»",
          "texto": "As a result, past smoking will be observed less frequently in prevalent than in incident cases of emphysema."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f23",
      "title": "Estudios observacionales de fármacos: confusión por indicación y tiempo inmortal",
      "badge": "Sesgos",
      "area": "Diseños, sesgos y causalidad",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Confusión por indicación",
          "val": "Quien recibe el fármaco está más enfermo (o más sano) por eso mismo: el fármaco parece dañar o proteger"
        },
        {
          "label": "Sesgo de tiempo inmortal",
          "val": "Se cuenta como «tratado» un periodo en que el paciente no podía morir porque aún no recibía el fármaco"
        },
        {
          "label": "Efecto del tiempo inmortal",
          "val": "Hace parecer protector al tratamiento"
        },
        {
          "label": "Usuario prevalente",
          "val": "Incluir a quienes ya toleraron el fármaco años excluye a quienes se dañaron al inicio"
        }
      ],
      "trap": "Aceptar un beneficio de un estudio observacional cuando un ensayo aleatorizado del mismo fármaco no lo encontró.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f24",
      "title": "Control de la confusión e interacción",
      "badge": "Confusión",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "En el diseño",
          "val": "Emparejamiento de casos y controles (individual o por grupos)"
        },
        {
          "label": "En el análisis",
          "val": "Estratificación o ajuste"
        },
        {
          "label": "Confusión frente a sesgo",
          "val": "El sesgo es un error del estudio; la confusión es un hallazgo real"
        },
        {
          "label": "Interacción",
          "val": "Efecto conjunto mayor que el esperado por los efectos separados: se especifica y se reporta, no se controla"
        }
      ],
      "trap": "Tratar una interacción como confusión y «ajustarla»: la interacción se reporta.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), control de la confusión",
          "texto": "As seen in Box 15.2, the issue of confounding can be addressed either in designing and carrying out a study or in analysis of the data."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), control de la confusión",
          "texto": "Alternatively, we can handle the problem of confounding in the data analysis in one of two ways: stratification or adjustment."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), confusión frente a sesgo",
          "texto": "Bias is a result of an error in the way that the study has been carried out, but confounding is a valid finding that describes the nature of the relationship among several factors and the risk of disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Interaction»",
          "texto": "While confounding is a problem that needs to be addressed at the study design or analysis stage, interaction is an important phenomenon that we should prespecify (preferably) and report."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Interaction»",
          "texto": "interaction is present—that is, an effect greater than would be expected from the independent effects of the two separate factors."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f25",
      "title": "Criterios de causalidad",
      "badge": "Causalidad",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Temporalidad",
          "val": "La exposición debe ocurrir antes de la enfermedad"
        },
        {
          "label": "Fuerza de la asociación",
          "val": "Medida por el RR (u OR)"
        },
        {
          "label": "Dosis-respuesta",
          "val": "Si existe, es fuerte evidencia; su ausencia no descarta causalidad"
        },
        {
          "label": "Plausibilidad biológica",
          "val": "Coherencia con el conocimiento biológico actual"
        },
        {
          "label": "Cese de la exposición",
          "val": "Si al suspenderla baja el riesgo, apoya la causalidad"
        }
      ],
      "trap": "Exigir especificidad (una causa, un efecto): su ausencia no niega la causalidad; el tabaco causa muchas enfermedades.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Temporal relationship»",
          "texto": "It is clear that if a factor is believed to be the cause of a disease, exposure to the factor must occur before the disease develops."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Strength of the association»",
          "texto": "The strength of the association is measured by the relative risk (or odds ratio)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Dose-response relationship»",
          "texto": "If a dose-response relationship is present, it is strong evidence for a causal relationship."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Biologic plausibility»",
          "texto": "Biologic plausibility refers to coherence with the current body of biologic knowledge."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Cessation of exposure»",
          "texto": "When cessation data are available, they provide helpful supporting evidence for a causal association."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Specificity of the association»",
          "texto": "However, as with a doseresponse relationship, absence of specificity in no way negates a causal relationship."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f26",
      "title": "Metaanálisis: forest plot, heterogeneidad y sesgo de publicación",
      "badge": "Metaanálisis",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Forest plot",
          "val": "Cada cuadro es un estudio (su tamaño, el peso); la línea, su IC; el rombo, el efecto combinado"
        },
        {
          "label": "Significativo",
          "val": "El rombo no toca la línea del valor nulo (1 para RR u OR; 0 para diferencias)"
        },
        {
          "label": "Heterogeneidad (I²)",
          "val": "≈ 25 % baja · 50 % moderada · 75 % alta: los estudios no miden el mismo efecto"
        },
        {
          "label": "Efectos fijos frente a aleatorios",
          "val": "Aleatorios cuando hay heterogeneidad: IC más amplio"
        },
        {
          "label": "Sesgo de publicación",
          "val": "Gráfico en embudo (funnel plot) asimétrico: faltan estudios pequeños negativos"
        }
      ],
      "trap": "Confiar en un metaanálisis con I² alto sin preguntar por qué los estudios difieren.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f27",
      "title": "Certeza de la evidencia con GRADE",
      "badge": "Medicina basada en la evidencia",
      "area": "Ensayos clínicos y lectura crítica",
      "src": "guyatt",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Punto de partida",
          "val": "Ensayos aleatorizados: certeza alta · observacionales: baja"
        },
        {
          "label": "Bajan la certeza",
          "val": "Riesgo de sesgo, inconsistencia, evidencia indirecta, imprecisión y sesgo de publicación"
        },
        {
          "label": "Suben la certeza (observacionales)",
          "val": "Efecto muy grande, gradiente dosis-respuesta, confusión que reduciría el efecto observado"
        },
        {
          "label": "Niveles",
          "val": "Alta, moderada, baja y muy baja"
        },
        {
          "label": "Fuerza de la recomendación",
          "val": "Fuerte o débil (condicional): depende también del balance beneficio-daño, valores y costos"
        }
      ],
      "trap": "Creer que una recomendación fuerte exige evidencia de certeza alta: puede haber recomendaciones fuertes con certeza baja.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f28",
      "title": "Cuándo vale la pena tamizar: criterios de Wilson y Jungner",
      "badge": "Tamizaje",
      "area": "Tamizaje y prevención",
      "src": "wilson_jungner",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "La enfermedad",
          "val": "Problema de salud importante, con historia natural conocida y una fase latente o temprana detectable"
        },
        {
          "label": "La prueba",
          "val": "Adecuada y aceptable para la población"
        },
        {
          "label": "El tratamiento",
          "val": "Existe un tratamiento aceptado y es más eficaz si se da temprano"
        },
        {
          "label": "El sistema",
          "val": "Hay recursos para diagnosticar y tratar; el costo es razonable; el tamizaje es un proceso continuo"
        }
      ],
      "trap": "Tamizar solo porque existe una prueba sensible: sin tratamiento eficaz en fase temprana, el tamizaje no aporta y puede dañar.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f29",
      "title": "Niveles de prevención",
      "badge": "Prevención",
      "area": "Tamizaje y prevención",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Primordial",
          "val": "Evita la exposición al factor de riesgo: actividad física, poca sal y sin bebidas azucaradas desde la infancia para prevenir la hipertensión"
        },
        {
          "label": "Primaria",
          "val": "Evita que la enfermedad aparezca: vacunación, reducir la exposición a un factor de riesgo"
        },
        {
          "label": "Secundaria",
          "val": "Detecta la enfermedad ya iniciada, antes de los síntomas: tamizaje del cáncer"
        },
        {
          "label": "Terciaria",
          "val": "Evita complicaciones en quien ya tiene la enfermedad diagnosticada: rehabilitación tras un ictus"
        }
      ],
      "trap": "Clasificar el tamizaje como prevención primaria: no evita la enfermedad, la detecta antes.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 1 (pp. 2–20), «Primary, secondary, and tertiary prevention»",
          "texto": "Primordial prevention denotes the prevention of the exposure to the risk factor of the disease of interest."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 1 (pp. 2–20), «Primary, secondary, and tertiary prevention»",
          "texto": "For example, primordial prevention of hypertension should start in childhood through physical activity, low-sodium diet, no consumption of sugar-sweetened beverages, etc."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 1 (pp. 2–20), tabla 1.2",
          "texto": "Primary Preventing the initial development of a disease Immunization, reducing exposure to a risk factor"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 1 (pp. 2–20), «Primary, secondary, and tertiary prevention»",
          "texto": "Secondary prevention involves identifying people in whom a disease process has already begun, but who have not yet developed clinical signs and symptoms of the illness."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 1 (pp. 2–20), «Primary, secondary, and tertiary prevention»",
          "texto": "Tertiary prevention denotes preventing complications in those who have already developed signs and symptoms of an illness and have been diagnosed (i.e., people who are in the clinical phase of their illness)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f30",
      "title": "Brotes: endemia, epidemia e inmunidad colectiva",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Endemia",
          "val": "Presencia habitual de una enfermedad en una zona"
        },
        {
          "label": "Epidemia",
          "val": "Casos claramente por encima de lo esperado, de fuente común o propagada"
        },
        {
          "label": "Pandemia",
          "val": "Epidemia mundial"
        },
        {
          "label": "Brote por vehículo común (exposición única)",
          "val": "Explosivo: aumento súbito y rápido de casos, limitados a quienes compartieron la exposición"
        },
        {
          "label": "Inmunidad colectiva",
          "val": "Inmunizando a gran parte de la población, el resto queda protegido"
        }
      ],
      "trap": "Contar con la inmunidad colectiva cuando el microorganismo tiene un reservorio fuera del humano: ahí no opera.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Endemic, epidemic, and pandemic»",
          "texto": "Endemic is defined as the habitual presence of a disease within a given geographic area."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Endemic, epidemic, and pandemic»",
          "texto": "Epidemic is defined as the occurrence in a community or region of a group of illnesses of similar nature, clearly in excess of normal expectancy and derived from a common or a propagated source"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Endemic, epidemic, and pandemic»",
          "texto": "Pandemic refers to a worldwide epidemic."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), brotes por vehículo común",
          "texto": "First, such outbreaks are generally explosive—that is, there is a sudden and rapid increase in the number of cases of the disease or condition in a population."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Herd immunity»",
          "texto": "We can achieve highly effective protection by immunizing a large part of the population; the remaining part will be protected because of herd immunity."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Herd immunity»",
          "texto": "If we have a reservoir in which the organism can exist outside the human host, herd immunity will not operate because other means of transmission may be available."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f31",
      "title": "Incubación, casos secundarios, aislamiento y cuarentena",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Periodo de incubación",
          "val": "De la infección al inicio de los síntomas"
        },
        {
          "label": "Caso primario y secundario",
          "val": "Primario: se infectó en la exposición; secundario: se contagió de un caso primario"
        },
        {
          "label": "Tasa de ataque secundaria",
          "val": "Tasa de ataque en susceptibles no expuestos a la fuente que estuvieron en contacto con un caso primario"
        },
        {
          "label": "Aislar al enfermo",
          "val": "No siempre basta: en muchas enfermedades infantiles el niño ya contagió antes de los síntomas"
        },
        {
          "label": "Cuarentena",
          "val": "Retener a quien llega el tiempo suficiente para ver si enferma (de los 40 días de Ragusa)"
        }
      ],
      "trap": "Creer que aislar al niño cuando aparecen los síntomas corta la transmisión.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Incubation period»",
          "texto": "The incubation period is defined as the interval from receipt of infection to the time of onset of clinical illness (the onset of recognizable symptoms)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Attack rate»",
          "texto": "A person who acquires the disease from that exposure (e.g., from a contaminated food) is called a primary case."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Attack rate»",
          "texto": "A person who acquires the disease from exposure to a primary case is called a secondary case."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Attack rate»",
          "texto": "The secondary attack rate is therefore defined as the attack rate in susceptible people who were not exposed to the suspected agent who have been exposed to a primary case."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), aislamiento",
          "texto": "For many common childhood diseases, by the time clinical disease develops in the child, he or she has already transmitted the disease to others. Therefore, isolating such a person at the point at which he or she becomes clinically ill will not necessarily be effective."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), cuarentena",
          "texto": "In 1377, in the Italian seaport of Ragusa, travelers were detained in an isolated area for 30 days (trentini giorni) after arrival to see whether infection developed."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-f32",
      "title": "Qué prueba estadística usar",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Dos proporciones (variable cualitativa)",
          "val": "Chi cuadrado; Fisher si algún valor esperado es < 5"
        },
        {
          "label": "Dos medias, distribución normal",
          "val": "t de Student (pareada si son los mismos sujetos antes y después)"
        },
        {
          "label": "Más de dos medias",
          "val": "ANOVA"
        },
        {
          "label": "Sin distribución normal",
          "val": "Mann-Whitney (2 grupos), Wilcoxon (pareada), Kruskal-Wallis (más de 2)"
        },
        {
          "label": "Asociación entre dos variables numéricas",
          "val": "Correlación de Pearson (normal) o Spearman (no normal u ordinal)"
        }
      ],
      "trap": "Usar t de Student no pareada para mediciones antes y después en los mismos pacientes.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f33",
      "title": "Tendencia central, dispersión y distribución normal",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Asimetría positiva (cola a la derecha)",
          "val": "Media > mediana > moda: la media se va hacia los valores extremos"
        },
        {
          "label": "Datos asimétricos",
          "val": "Se describen con mediana y rango intercuartílico"
        },
        {
          "label": "Distribución normal",
          "val": "Media ± 1 DE ≈ 68 % · ± 2 DE ≈ 95 % · ± 3 DE ≈ 99,7 %"
        },
        {
          "label": "Desviación estándar frente a error estándar",
          "val": "DE describe la dispersión de los datos; EE = DE/√n, la precisión de la media"
        }
      ],
      "trap": "Presentar el error estándar en lugar de la desviación estándar hace que los datos parezcan menos dispersos.",
      "estado": "pendiente"
    },
    {
      "id": "sp-f34",
      "title": "Correlación y regresión: qué modelo para qué desenlace",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Coeficiente r",
          "val": "De −1 a +1: dirección y fuerza de una relación lineal; 0 = sin relación lineal"
        },
        {
          "label": "r²",
          "val": "Proporción de la variabilidad de una variable explicada por la otra"
        },
        {
          "label": "Regresión lineal",
          "val": "Desenlace numérico continuo (presión arterial)"
        },
        {
          "label": "Regresión logística",
          "val": "Desenlace binario (sí/no): da odds ratios ajustados"
        },
        {
          "label": "Regresión de Cox",
          "val": "Tiempo hasta un evento: da hazard ratios ajustados"
        }
      ],
      "trap": "Leer causalidad en una correlación, o creer que r = 0 significa ninguna relación (puede ser no lineal).",
      "estado": "pendiente"
    },
    {
      "id": "sp-f35",
      "title": "Tamaño de muestra: qué hay que definir",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "1. Diferencia a detectar",
          "val": "Cuánto mejor se espera que sea la nueva terapia"
        },
        {
          "label": "2. Respuesta en un grupo",
          "val": "Estimación de la respuesta con el tratamiento actual"
        },
        {
          "label": "3. Nivel de significancia",
          "val": "α"
        },
        {
          "label": "4. Poder deseado",
          "val": "1 − β"
        },
        {
          "label": "5. Prueba de una o dos colas",
          "val": "Si solo interesa una dirección del efecto o ambas"
        }
      ],
      "trap": "Calcular la muestra sin fijar antes la diferencia que se quiere detectar: es el primer dato que se necesita.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), Recuadro 11.2",
          "texto": "What Must Be Specified to Estimate the Sample Size Needed in a Randomized Trial? 1. The difference in response rates to be detected 2. An estimate of the response rate in one of the groups 3. Level of statistical significance (α) 4. The value of the power desired (1 − β) 5. Whether the test should be one-sided or two-sided"
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f36",
      "title": "Validez interna y externa",
      "badge": "Validez",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Validez externa (generalización)",
          "val": "Poder aplicar los resultados a una población más amplia que la estudiada"
        },
        {
          "label": "Validez interna",
          "val": "Aleatorización bien hecha y sin otros sesgos: las diferencias se atribuyen a la intervención"
        },
        {
          "label": "Por qué el ensayo es el estándar de oro",
          "val": "La aleatorización impide que los investigadores influyan en la asignación"
        }
      ],
      "trap": "Suponer que un ensayo con buena validez interna se aplica a cualquier población.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Generalizability of results»",
          "texto": "Our ability to apply the results obtained in our study population to a broader population is called the generalizability, or external validity, of the study."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Generalizability of results»",
          "texto": "A randomized trial is internally valid if the randomization has been properly done and the study is free of other biases and is without any of the major methodologic problems that have been discussed."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Generalizability of results»",
          "texto": "Randomized trials are considered the gold standard of study designs because randomization, if correctly conducted, prevents biases on the part of the study investigators from influencing the treatment assignment for each patient."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f37",
      "title": "Fases de los ensayos clínicos",
      "badge": "Ensayos clínicos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Fase I",
          "val": "20 a 80 pacientes: seguridad, dosis seguras y efectos tóxicos"
        },
        {
          "label": "Fase II",
          "val": "100 a 300 pacientes: eficacia y más datos de seguridad"
        },
        {
          "label": "Fase III",
          "val": "Ensayos aleatorizados grandes (1.000 a 3.000 o más); si los pasa, el medicamento se aprueba"
        },
        {
          "label": "Fase IV",
          "val": "Después de la comercialización: vigilancia de efectos adversos, sin aleatorización"
        }
      ],
      "trap": "Llamar ensayo aleatorizado a la fase IV: es vigilancia poscomercialización.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Phases of randomized trials»",
          "texto": "These trials are clinical pharmacologic studies—small studies of 20 to 80 patients that look at safety issues with the new drug or other treatment."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Phases of randomized trials»",
          "texto": "Phase II studies consist of clinical investigations of 100 to 300 patients in order to evaluate the efficacy of the new drug or treatment and to further assess its relative safety."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Phases of randomized trials»",
          "texto": "These studies are large-scale randomized controlled trials for efficacy and relative safety. These studies often include 1000 to 3000 or more participants."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Phases of randomized trials»",
          "texto": "Phase IV studies are not randomized studies and are not really trials at all, unlike phase I, II, and III trials."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f38",
      "title": "Ensayos: aleatorización, enmascaramiento y diseños",
      "badge": "Ensayos clínicos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Aleatorización",
          "val": "Asignación impredecible: evita los sesgos del investigador; su aporte a la comparabilidad incluye variables no medidas"
        },
        {
          "label": "Aleatorización estratificada",
          "val": "Se estratifica por las variables importantes y se aleatoriza dentro de cada estrato"
        },
        {
          "label": "Doble enmascaramiento",
          "val": "Ni participantes ni personal saben el grupo; clave con desenlaces subjetivos"
        },
        {
          "label": "Cruzado planeado",
          "val": "Cada grupo recibe un tratamiento y luego se cambia al otro"
        },
        {
          "label": "Factorial",
          "val": "Dos tratamientos independientes probados en la misma población"
        }
      ],
      "trap": "Creer que el placebo basta para que el paciente esté enmascarado.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Randomization»",
          "texto": "If we randomize properly, we achieve non-predictability of the next assignment; we do not have to worry that any subjective biases of the investigators, either overt or covert, may be introduced into the process of selecting patients for one treatment group or the other."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Randomization»",
          "texto": "Another benefit of randomization is that to whatever extent it contributes to comparability, this contribution applies both to variables we can measure and to variables that we cannot measure and may not even be aware of"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Stratified randomization»",
          "texto": "In stratified randomization, we first stratify (stratum = layer or level) our study population by each variable that we consider important and then randomize participants to treatment groups within each stratum."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Masking»",
          "texto": "The masking of both participants and study personnel is called “double masking.”"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Masking»",
          "texto": "However, use of a placebo does not automatically guarantee that the patients are masked (blinded)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Factorial design»",
          "texto": "Assuming that two drugs are to be tested, the anticipated outcomes for the two drugs are different, and their modes of action are independent, one can economically use the same study population for testing both drugs."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f39",
      "title": "Incumplimiento y análisis por intención de tratar",
      "badge": "Ensayos clínicos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Incumplimiento",
          "val": "Abierto (abandonos) o encubierto (deja de tomar el tratamiento sin decirlo)"
        },
        {
          "label": "Intención de tratar",
          "val": "Se analiza según el grupo asignado al azar, sin importar lo que recibió: el análisis más conservador"
        },
        {
          "label": "Según lo recibido (as treated)",
          "val": "Rompe la aleatorización: equivale a analizar un estudio de cohorte"
        }
      ],
      "trap": "Analizar según lo que cada paciente recibió «porque es más real»: se pierden los beneficios de la aleatorización.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Noncompliance»",
          "texto": "Noncompliance may be overt or covert: On the one hand, people may overtly articulate their refusal to comply or may stop participating in the study."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Crossover»",
          "texto": "In other words, we would compare the patients according to the treatment to which they were originally randomized, regardless of what treatment actually occurred."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Crossover»",
          "texto": "Although it may be counterintuitive, it is the most conservative analysis of randomized trials, and also highly regarded by regulatory authorities for the purpose of new drug approvals."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 10 (pp. 200–218), «Crossover»",
          "texto": "If, however, we analyze according to the treatment that the patients actually receive (as treated analysis), we will have broken, and therefore lost the benefits of, the randomization."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f40",
      "title": "Estudios ecológicos y falacia ecológica",
      "badge": "Diseños",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Estudio ecológico",
          "val": "Solo hay datos de grupos (países, regiones), no de cada persona"
        },
        {
          "label": "Falacia ecológica",
          "val": "Atribuir a los individuos una característica que como individuos no tienen"
        },
        {
          "label": "Ejemplo",
          "val": "Cobertura de BCG por país y mortalidad por COVID-19: hipótesis luego descartada"
        }
      ],
      "trap": "Concluir que una persona vacunada se protege porque los países con más vacunación tuvieron menos muertes.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Ecologic studies»",
          "texto": "This problem is called the ecologic fallacy—we may be ascribing to members of a group some characteristic that they in fact do not possess as individuals."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Ecologic studies»",
          "texto": "This problem arises in an ecologic study because data are only available for groups; we do not have exposure and outcome data for each person in the population."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Ecologic studies»",
          "texto": "The hypothesis of the association between BCG vaccination and COVID-19 clinical outcomes was later dismissed by further research."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f41",
      "title": "Casos y controles: emparejamiento y controles múltiples",
      "badge": "Diseños",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Emparejar",
          "val": "Igualar casos y controles en un posible confusor"
        },
        {
          "label": "Emparejar por muchas variables",
          "val": "Cada vez es más difícil encontrar un control adecuado"
        },
        {
          "label": "Lo que se pierde",
          "val": "La característica emparejada ya no se puede estudiar como factor de riesgo"
        },
        {
          "label": "Controles múltiples",
          "val": "Aumentan el poder, pero la ganancia es poca más allá de 4 controles por caso"
        },
        {
          "label": "Proporción de casos",
          "val": "La fija el investigador: no refleja la prevalencia de la enfermedad"
        }
      ],
      "trap": "Emparejar por la misma variable que se quiere estudiar como causa.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Matching»",
          "texto": "Therefore, the more variables on which we choose to match, the more difficult it will be to find a suitable control."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Matching»",
          "texto": "once we have matched controls to cases according to a given characteristic, we cannot study that characteristic."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Use of multiple controls»",
          "texto": "Practically speaking, a noticeable increase in power is gained only up to a ratio of about 1 case to 4 controls."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 7 (pp. 151–180), «Use of multiple controls»",
          "texto": "Because the proportion of the entire study population that consists of cases is determined by the ratio of controls per case, and this proportion is determined by the investigator, it clearly does not reflect the true prevalence of the disease in the population in which the study is carried out."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f42",
      "title": "Mortalidad proporcional y años potenciales de vida perdidos",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Mortalidad proporcional",
          "val": "Muertes por una causa / total de muertes: no es una tasa"
        },
        {
          "label": "Su límite",
          "val": "Dos comunidades con igual mortalidad proporcional (30 %) pueden tener tasas distintas (3 y 6 por 1.000)"
        },
        {
          "label": "Años potenciales de vida perdidos",
          "val": "Miden la muerte prematura: pesa más morir joven; se usan para fijar prioridades"
        }
      ],
      "trap": "Leer la mortalidad proporcional como si fuera el riesgo de morir por esa causa.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Proportionate mortality»",
          "texto": "Another commonly used measure of mortality is proportionate mortality, which is not a rate."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Proportionate mortality»",
          "texto": "Proportionate mortality from heart disease 30% 30% Mortality rate from heart disease 3/1,000 6/1,000"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Years of potential life lost»",
          "texto": "YPLL is a measure of premature mortality, or early death."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 4 (pp. 67–95), «Years of potential life lost»",
          "texto": "YPLL recognizes that death occurring in a person at a younger age clearly involves a greater loss of future productive years than death occurring at an older age."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f43",
      "title": "Pronóstico: supervivencia a 5 años y supervivencia relativa",
      "badge": "Análisis de supervivencia",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Supervivencia a 5 años",
          "val": "Proporción de pacientes vivos 5 años después del diagnóstico o del inicio del tratamiento"
        },
        {
          "label": "Su problema",
          "val": "Se distorsiona con los programas de tamizaje que adelantan el diagnóstico"
        },
        {
          "label": "Supervivencia relativa",
          "val": "Supervivencia observada / supervivencia esperada si no tuvieran la enfermedad"
        },
        {
          "label": "Cuándo importa",
          "val": "En edades avanzadas, con alta mortalidad por otras causas"
        }
      ],
      "trap": "Comparar la supervivencia observada de ancianos y jóvenes sin tener en cuenta la mortalidad esperada por la edad.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Five-year survival»",
          "texto": "The 5-year survival is the proportion of patients who are alive 5 years after treatment begins or 5 years after diagnosis."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Five-year survival»",
          "texto": "One problem with the use of 5-year survival has become more prominent in recent years with the advent of better screening programs."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Relative survival»",
          "texto": "Relative survival is thus defined as the ratio of the observed survival to the expected survival:"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Relative survival»",
          "texto": "When we look at the older age groups, which have high rates of mortality from other causes, there is a large difference between the observed and the relative survival."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f44",
      "title": "Migración de estadio",
      "badge": "Análisis de supervivencia",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Qué es",
          "val": "Un mejor diagnóstico pasa a estadios más avanzados a pacientes con micrometástasis antes no detectadas"
        },
        {
          "label": "Su efecto",
          "val": "La supervivencia mejora en cada estadio aunque el tratamiento no haya cambiado"
        },
        {
          "label": "Qué hacer",
          "val": "Descartarla antes de atribuir la mejoría a la atención médica"
        }
      ],
      "trap": "Atribuir a un mejor tratamiento la mejoría de la supervivencia por estadio cuando cambió la forma de diagnosticar.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Stage migration»",
          "texto": "The apparent improvements in survival in both stage I and stage II patients result only from the changed classification of patients with micro-metastases in the later period."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 6 (pp. 125–150), «Stage migration»",
          "texto": "It is therefore important to exclude the possibility of stage migration before attributing any apparent improvement in prognosis to improved effectiveness of medical care."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f45",
      "title": "Vigilancia y prevalencia puntual o de periodo",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Vigilancia pasiva",
          "val": "Usa la notificación obligatoria; reporta el prestador o el funcionario de salud"
        },
        {
          "label": "Vigilancia activa",
          "val": "Personal contratado busca los casos: el reporte suele ser más exacto"
        },
        {
          "label": "Prevalencia puntual",
          "val": "«¿Tiene asma actualmente?»"
        },
        {
          "label": "Prevalencia de periodo",
          "val": "«¿Ha tenido asma en los últimos n años?»"
        },
        {
          "label": "Incidencia acumulada",
          "val": "«¿Alguna vez ha tenido asma?»"
        }
      ],
      "trap": "Llamar prevalencia de periodo a la pregunta «¿alguna vez…?»: en la encuesta mide incidencia acumulada.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Passive and active surveillance»",
          "texto": "Passive surveillance denotes surveillance in which available data on reportable diseases are used, or in which disease reporting is mandated or requested by the government or the local health authority, with the responsibility for the reporting often falling on the health care provider or district health officer."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), «Passive and active surveillance»",
          "texto": "Reporting is generally more accurate when surveillance is active than when it is passive because active surveillance is conducted by individuals who have been specifically employed and trained to carry out this responsibility."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 3 (pp. 43–66), Tabla 3.1",
          "texto": "Interview Question Type of Measure “Do you currently have asthma?” Point prevalence “Have you had asthma during the last [ n ] years?” Period prevalence “Have you ever had asthma?” Cumulative incidence"
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f46",
      "title": "Causa necesaria y suficiente",
      "badge": "Causalidad",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Necesaria y suficiente",
          "val": "Sin el factor nunca hay enfermedad y con él siempre: casi no ocurre en humanos"
        },
        {
          "label": "Necesaria pero no suficiente",
          "val": "Hacen falta otros factores (H. pylori, junto con tabaco o nitratos, en el cáncer gástrico)"
        },
        {
          "label": "Suficiente pero no necesaria",
          "val": "Produce la enfermedad por sí solo, pero otros factores también"
        },
        {
          "label": "Ni suficiente ni necesaria",
          "val": "Como cada factor de riesgo coronario"
        }
      ],
      "trap": "Exigir que una causa produzca la enfermedad en todos los expuestos: la mayoría de las causas no son suficientes.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Types of causal relationships»",
          "texto": "If a relationship is causal, four types of causal relationships are possible: (1) necessary and sufficient; (2) necessary but not sufficient; (3) sufficient but not necessary; and (4) neither sufficient nor necessary."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Types of causal relationships»",
          "texto": "A one-to-one relationship of exposure to disease, which is a consequence of a necessary and sufficient relationship, rarely if ever occurs in humans."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Types of causal relationships»",
          "texto": "Thus, in addition to H. pylori, individuals must be exposed to other risk factors (e.g., smoking and intake of foods containing nitrates) to develop gastric cancer."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 14 (pp. 268–287), «Types of causal relationships»",
          "texto": "Each of these CHD risk factors is neither sufficient nor necessary."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f47",
      "title": "Clasificación errónea diferencial y no diferencial",
      "badge": "Sesgos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Diferencial",
          "val": "El error es distinto entre grupos: puede crear una asociación falsa o esconder una real"
        },
        {
          "label": "No diferencial",
          "val": "Igual inexactitud en todos los grupos: con dos categorías diluye el RR u OR hacia 1"
        },
        {
          "label": "Ejemplo de diferencial",
          "val": "Madres de niños con malformaciones que recuerdan más infecciones en el embarazo"
        }
      ],
      "trap": "Creer que el error no diferencial produce asociaciones falsas: lo usual es que las acerque a 1.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Misclassification»",
          "texto": "In differential misclassification, the proportion of misclassification differs in different study groups."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Misclassification»",
          "texto": "A differential misclassification bias can lead either to an apparent association even if one does not really exist or to an apparent lack of association when one does in fact exist."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 15 (pp. 288–305), «Misclassification»",
          "texto": "The usual effect of nondifferential misclassification when there are two exposure categories is that the relative risk (RR) or OR tends to be diluted, and it is shifted toward 1.0."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f48",
      "title": "Historia natural de la enfermedad y tamizaje",
      "badge": "Tamizaje",
      "area": "Tamizaje y prevención",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Fase preclínica detectable",
          "val": "Desde que la prueba puede detectar la enfermedad hasta que aparecen los síntomas"
        },
        {
          "label": "Punto crítico",
          "val": "Antes de él el tratamiento es más eficaz o más fácil (cáncer de mama: paso a los ganglios axilares)"
        },
        {
          "label": "Supuesto 1 para tamizar",
          "val": "Casi todos los casos clínicos pasan antes por una fase preclínica detectable"
        },
        {
          "label": "Supuesto 2 para tamizar",
          "val": "Sin intervención, casi todos los casos preclínicos progresan a la fase clínica"
        }
      ],
      "trap": "Tamizar una enfermedad cuyos casos preclínicos casi nunca progresan: no hay beneficio que buscar.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Natural history of disease»",
          "texto": "The interval from this point to the development of signs and symptoms is the detectable preclinical phase of the disease"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Critical point»",
          "texto": "This is a point in the natural history before which treatment is more effective and/or less difficult to administer."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Critical point»",
          "texto": "For example, in a patient with breast cancer, one critical point would be that at which the disease spreads from the breast to the axillary lymph nodes."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 18 (pp. 354–380), «Pattern of disease progression»",
          "texto": "1. All or most clinical cases of a disease first go through a detectable preclinical phase. 2. In the absence of intervention, all or most cases in a preclinical phase progress to a clinical phase."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f49",
      "title": "Tríada epidemiológica, portadores e infección inaparente",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Tríada epidemiológica",
          "val": "Interacción del huésped, el agente y el ambiente"
        },
        {
          "label": "Portador",
          "val": "Alberga el microorganismo sin enfermedad clínica; puede ser breve o crónico (Mary Mallon, fiebre tifoidea)"
        },
        {
          "label": "Concepto del iceberg",
          "val": "Contar solo los casos clínicos no basta: en la polio prevacunal la mayoría era subclínica"
        }
      ],
      "trap": "Explicar la propagación de una infección contando solo los casos con síntomas.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), introducción",
          "texto": "It results from an interaction of the host (a person), the agent (e.g., a bacterium), and the environment (e.g., polluted air)."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Carrier status»",
          "texto": "Carrier status may be of limited duration or may be chronic, lasting for months or years."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Carrier status»",
          "texto": "Carrier status also refers to those individuals who have the causative organism without a clinical disease."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Clinical and subclinical disease»",
          "texto": "The iceberg concept is important because it is not sufficient to count only the clinically apparent cases we see; for example, most cases of polio in pre-vaccine days were subclinical—that is, many people who contracted polio infection were not clinically ill."
        }
      ],
      "verificado": "2026-11-24"
    },
    {
      "id": "sp-f50",
      "title": "Investigación de un brote",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "1. Confirmar el brote",
          "val": "Definir los casos y la población en riesgo; ver si los casos superan claramente lo esperado; calcular tasas de ataque"
        },
        {
          "label": "2. Describir",
          "val": "Distribución de los casos por tiempo y lugar"
        },
        {
          "label": "3. Hipótesis",
          "val": "A partir de lo conocido, la analogía con otras enfermedades y los hallazgos"
        },
        {
          "label": "4. Probarlas",
          "val": "Analizar los datos (por ejemplo, con casos y controles)"
        },
        {
          "label": "5. Controlar y comunicar",
          "val": "Medidas de control y prevención, informe escrito y comunicación"
        },
        {
          "label": "Tabla cruzada",
          "val": "Para identificar, entre varios alimentos, el responsable de un brote"
        }
      ],
      "trap": "Empezar a buscar la fuente sin confirmar que los casos superan lo esperado.",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Steps in an outbreak investigation»",
          "texto": "c. Determine whether the observed number of cases clearly exceeds the expected number. d. Calculate the attack rates."
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Steps in an outbreak investigation»",
          "texto": "Communicate findings to those involved in policy development and implementation and to the public"
        },
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 2 (pp. 21–42), «Cross-tabulation»",
          "texto": "When confronted with several possible causal agents, as is often the case in a food-borne disease outbreak, a very helpful method for determining which of the possible agents is suspected to be the cause is called cross-tabulation."
        }
      ],
      "verificado": "2026-11-24"
    }
  ],
  "tarjetas": [
    {
      "id": 42,
      "src": "gordis",
      "front": "Prueba ideal para descartar enfermedad",
      "back": "Alta sensibilidad (SnNout)",
      "estado": "pendiente"
    },
    {
      "id": 43,
      "src": "gordis",
      "front": "Prueba ideal para confirmar enfermedad",
      "back": "Alta especificidad (SpPin)",
      "estado": "pendiente"
    },
    {
      "id": 44,
      "src": "gordis",
      "front": "Fórmula del NNT",
      "back": "1 / (tasa en no tratados − tasa en tratados), redondeado hacia arriba",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 11 (pp. 219–239), «Number needed to treat»",
          "texto": "Thus if, for example, the mortality rate in the untreated group is 17% and mortality in the treated group is 12%, we would need to treat:"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": 45,
      "src": "gordis",
      "front": "Medida de asociación en casos y controles",
      "back": "Odds ratio: en casos y controles el riesgo relativo no se calcula directamente",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 12 (pp. 240–257), «Odds ratio in a case-control study»",
          "texto": "in a case-control study, we cannot calculate the relative risk directly to determine whether there is an association between the exposure and the disease."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": 46,
      "src": "gordis",
      "front": "¿Qué cambia con la prevalencia: sensibilidad o VPP?",
      "back": "Los valores predictivos (VPP y VPN)",
      "cita": [
        {
          "donde": "Gordis Epidemiology 7ª ed., cap. 5 (pp. 96–124), «Relationship between positive predictive value and disease prevalence»",
          "texto": "It is possible that the same test can have a very different predictive value when it is administered to a high-risk (high prevalence) population or to a low-risk (low prevalence) population."
        }
      ],
      "verificado": "2026-11-23"
    }
  ],
  "revision": "verificada"
});
