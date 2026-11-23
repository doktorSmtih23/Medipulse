// Epidemiología y Estadística (antes «Salud Pública»): contenido incluido en la app · paquete "salud-publica" (módulo aparte: epidemiología y estadística).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: sp-c01 (casos), sp-f01 (fichas), sp-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Epidemiología y Estadística",
  "prefijo": "sp",
  "paquete": "salud-publica",
  "actualizado": "2026-11-23",
  "casos": [
    {
      "id": 19,
      "topic": "Epidemiología · Pruebas diagnósticas",
      "difficulty": "Nivel 2",
      "src": "cto_ep",
      "vignette": "Se evalúa una nueva prueba rápida para VIH con <span class='hy'>sensibilidad 99%</span> y <span class='hy'>especificidad 92%</span>. Un comité quiere usarla en población general. ¿Cuál es el uso más adecuado de esta prueba?",
      "options": [
        "Como prueba confirmatoria única antes de iniciar tratamiento",
        "No sirve porque su especificidad es menor a 95%",
        "Como prueba de tamizaje, confirmando los positivos con una prueba más específica",
        "Solo en población de alto riesgo porque el VPP no depende de la prevalencia"
      ],
      "correct": 2,
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
      "verificado": "2026-11-23"
    },
    {
      "id": 20,
      "topic": "Epidemiología · Diseño de estudios",
      "difficulty": "Nivel 2",
      "src": "cto_ep",
      "vignette": "Investigadores identifican a 120 pacientes con <span class='hy'>carcinoma hepatocelular</span> y 240 sin la enfermedad, y revisan <span class='hy'>retrospectivamente</span> su exposición previa a aflatoxinas. ¿Qué diseño es y qué medida de asociación corresponde?",
      "options": [
        "Ensayo clínico · Número necesario a tratar",
        "Cohorte prospectiva · Riesgo relativo",
        "Transversal · Prevalencia",
        "Casos y controles · Odds ratio"
      ],
      "correct": 3,
      "whyCorrect": "Se parte del desenlace (con y sin enfermedad) y se busca la exposición hacia atrás: eso es un estudio de casos y controles. No permite calcular incidencia, así que la medida es el odds ratio.",
      "pearl": "Cohorte: parte de la exposición → RR. Casos y controles: parte de la enfermedad → OR. Útil para enfermedades raras.",
      "trap": "Calcular riesgo relativo en un estudio de casos y controles: no se puede porque el investigador fija la proporción de casos.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Epidemiología y Estadística",
          "texto": "Debido a ello, la fuerza de la asociación no se puede calcular directamente, como en el estudio de cohortes, sino de forma indirecta mediante la odds ratio."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c01",
      "topic": "Lectura crítica · NNT",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c02",
      "topic": "Lectura crítica · Intención de tratar",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c03",
      "topic": "Epidemiología · Valores predictivos",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c04",
      "topic": "Lectura crítica · Sesgos en tamizaje",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c05",
      "topic": "Lectura crítica · Confusión",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c06",
      "topic": "Epidemiología · Estudio de brote",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c07",
      "topic": "Epidemiología · Incidencia y prevalencia",
      "difficulty": "Nivel 2",
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
      "trap": "Pensar que un mejor tratamiento siempre baja la prevalencia: solo lo hace si cura."
    },
    {
      "id": "sp-c08",
      "topic": "Lectura crítica · Error tipo II",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c09",
      "area": "Ensayos clínicos y lectura crítica",
      "topic": "Lectura crítica · Guías de reporte",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-21"
    },
    {
      "id": "sp-c10",
      "topic": "Pruebas diagnósticas · Dímero D ajustado por edad",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c11",
      "topic": "Lectura crítica · Estudio de manejo diagnóstico",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c12",
      "topic": "Lectura crítica · Intervalo de confianza y seguridad",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c13",
      "topic": "Epidemiología · Diferencia absoluta y relativa",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c14",
      "topic": "Lectura crítica · Validación de un puntaje",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c15",
      "topic": "Lectura crítica · Número necesario para dañar",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c16",
      "topic": "Lectura crítica · Interacción entre subgrupos",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c17",
      "topic": "Lectura crítica · Desenlace compuesto",
      "difficulty": "Nivel 3",
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
      "verificado": "2026-11-22"
    },
    {
      "id": "sp-c18",
      "topic": "Salud pública · Mama: tamizaje de cáncer",
      "difficulty": "Nivel 1",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c19",
      "topic": "Salud pública · Colon: tamizaje de cáncer colorrectal",
      "difficulty": "Nivel 1",
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
      "verificado": "2026-11-23"
    },
    {
      "id": "sp-c20",
      "topic": "Salud pública · Próstata: tamizaje de cáncer",
      "difficulty": "Nivel 2",
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
      "verificado": "2026-11-23"
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
          "val": "VP / (VP + FN): alta → un negativo descarta (SnNout)"
        },
        {
          "label": "Especificidad",
          "val": "VN / (VN + FP): alta → un positivo confirma (SpPin)"
        },
        {
          "label": "Valores predictivos",
          "val": "Cambian con la prevalencia: baja prevalencia → VPP baja, VPN sube"
        },
        {
          "label": "Razón de verosimilitud +",
          "val": "Sensibilidad / (1 − especificidad); > 10 confirma con fuerza"
        }
      ],
      "redFlag": "Con prevalencia de 1 %, una prueba con sensibilidad y especificidad de 90 % tiene un VPP de solo ≈ 8 %.",
      "trap": "Decirle a un paciente con prueba positiva que tiene 90 % de probabilidad de estar enfermo porque la sensibilidad es 90 %."
    },
    {
      "id": "sp-f02",
      "title": "Impacto de un tratamiento: RRA, RRR y NNT",
      "badge": "Medidas de efecto",
      "area": "Medidas de asociación e impacto",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Reducción absoluta (RRA)",
          "val": "Riesgo control − riesgo tratados"
        },
        {
          "label": "Reducción relativa (RRR)",
          "val": "RRA / riesgo control"
        },
        {
          "label": "NNT",
          "val": "1 / RRA (redondear hacia arriba)"
        },
        {
          "label": "NNH",
          "val": "1 / aumento absoluto del riesgo de daño"
        }
      ],
      "trap": "Dejarse convencer por la RRR: un 50 % de reducción relativa puede ser solo 1 % absoluto (NNT 100)."
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
          "label": "Cohorte (parte de la exposición)",
          "val": "Incidencia y riesgo relativo (RR)"
        },
        {
          "label": "Casos y controles (parte de la enfermedad)",
          "val": "Odds ratio (OR); útil en enfermedades raras"
        },
        {
          "label": "Transversal",
          "val": "Prevalencia; no establece temporalidad"
        },
        {
          "label": "Ensayo clínico aleatorizado",
          "val": "El que mejor demuestra causalidad: controla confusión conocida y desconocida"
        }
      ],
      "trap": "Calcular riesgo relativo o incidencia en un estudio de casos y controles."
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
          "val": "Los grupos difieren por cómo se eligieron o por pérdidas en el seguimiento"
        },
        {
          "label": "Información (memoria)",
          "val": "Los casos recuerdan su exposición mejor que los controles"
        },
        {
          "label": "Confusión",
          "val": "Tercer factor ligado a la exposición y causa del desenlace; se controla con aleatorización o ajuste"
        },
        {
          "label": "Anticipación (lead time)",
          "val": "El tamizaje alarga la supervivencia desde el diagnóstico sin cambiar la muerte"
        }
      ],
      "redFlag": "El beneficio de un tamizaje se demuestra con menor mortalidad, no con mayor supervivencia desde el diagnóstico.",
      "trap": "Creer que un tamaño de muestra grande corrige un sesgo: solo reduce el error aleatorio."
    },
    {
      "id": "sp-f05",
      "title": "Significancia, errores α y β, e intervalos de confianza",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Error tipo I (α)",
          "val": "Encontrar una diferencia que no existe; se acepta 5 % (p < 0,05)"
        },
        {
          "label": "Error tipo II (β)",
          "val": "No encontrar una diferencia que sí existe"
        },
        {
          "label": "Poder",
          "val": "1 − β; se busca ≥ 80 %"
        },
        {
          "label": "IC 95 % no significativo",
          "val": "Incluye 1 en RR u OR; incluye 0 en diferencias"
        }
      ],
      "trap": "Concluir que dos tratamientos son iguales porque p > 0,05 en un estudio con poco poder."
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
      "trap": "Sumar el LR a la probabilidad: el LR multiplica odds, no porcentajes."
    },
    {
      "id": "sp-f07",
      "title": "Curva ROC y punto de corte",
      "badge": "Pruebas diagnósticas",
      "area": "Pruebas diagnósticas",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Ejes",
          "val": "Sensibilidad (eje Y) contra 1 − especificidad (eje X), para cada punto de corte"
        },
        {
          "label": "Área bajo la curva",
          "val": "0,5 = azar (la diagonal); 1 = prueba perfecta; cuanto más arriba y a la izquierda, mejor"
        },
        {
          "label": "Bajar el punto de corte",
          "val": "Más positivos: sube la sensibilidad y baja la especificidad"
        },
        {
          "label": "Corte «óptimo» (índice de Youden)",
          "val": "Máximo de sensibilidad + especificidad − 1; no siempre es el clínicamente adecuado"
        }
      ],
      "trap": "Elegir el corte solo por el área: si perder un caso es grave (tamizaje de algo letal y tratable), se prioriza sensibilidad."
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
          "label": "En serie (la segunda solo si la primera es positiva)",
          "val": "Gana especificidad y pierde sensibilidad; útil para confirmar"
        },
        {
          "label": "Especificidad neta en serie",
          "val": "E1 + E2 − (E1 × E2)"
        },
        {
          "label": "En paralelo (positivo si cualquiera lo es)",
          "val": "Gana sensibilidad y pierde especificidad; útil para no dejar pasar casos"
        },
        {
          "label": "Sensibilidad neta en paralelo",
          "val": "S1 + S2 − (S1 × S2)"
        }
      ],
      "redFlag": "Tamizaje en dos pasos (VIH, sífilis): primero una prueba sensible y luego una específica, es decir, en serie.",
      "trap": "Las fórmulas suponen pruebas independientes; si miden lo mismo, la ganancia real es menor."
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
          "val": "Acuerdo más allá del esperado por azar entre dos observadores o dos mediciones"
        },
        {
          "label": "Fórmula",
          "val": "(acuerdo observado − acuerdo por azar) / (1 − acuerdo por azar)"
        },
        {
          "label": "Interpretación (Landis y Koch)",
          "val": "> 0,80 casi perfecta · 0,61–0,80 sustancial · 0,41–0,60 moderada · 0,21–0,40 aceptable · ≤ 0,20 leve"
        },
        {
          "label": "Kappa = 0",
          "val": "El acuerdo es el que daría el azar"
        }
      ],
      "trap": "Un porcentaje de acuerdo alto no basta: si casi todo es normal, dos observadores coinciden mucho por azar."
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
          "label": "Validez (exactitud)",
          "val": "Mide lo que dice medir: se acerca al valor real"
        },
        {
          "label": "Confiabilidad (precisión, reproducibilidad)",
          "val": "Da el mismo resultado al repetirla"
        },
        {
          "label": "Error sistemático",
          "val": "Afecta la validez (sesgo): todas las mediciones se corren hacia un lado"
        },
        {
          "label": "Error aleatorio",
          "val": "Afecta la precisión; se reduce aumentando el número de mediciones o la muestra"
        }
      ],
      "trap": "Una prueba puede ser muy reproducible y estar siempre equivocada: un tensiómetro mal calibrado da cifras estables pero falsas."
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
          "val": "Casos nuevos / población en riesgo al inicio, en un periodo definido"
        },
        {
          "label": "Densidad de incidencia (tasa)",
          "val": "Casos nuevos / personas-tiempo en riesgo; útil con seguimientos de distinta duración"
        },
        {
          "label": "Prevalencia",
          "val": "Casos existentes (nuevos y antiguos) / población total, en un momento"
        },
        {
          "label": "Relación",
          "val": "Prevalencia ≈ incidencia × duración media de la enfermedad (estado estable, enfermedad poco frecuente)"
        }
      ],
      "redFlag": "Un tratamiento que prolonga la vida sin curar aumenta la prevalencia aunque la incidencia no cambie.",
      "trap": "En la población en riesgo de la incidencia no entran quienes ya tienen la enfermedad."
    },
    {
      "id": "sp-f12",
      "title": "Mortalidad, letalidad y tasa de ataque",
      "badge": "Medidas de frecuencia",
      "area": "Medidas de frecuencia",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Tasa de mortalidad",
          "val": "Muertes por una causa / población total en el periodo"
        },
        {
          "label": "Letalidad",
          "val": "Muertes por la enfermedad / personas con la enfermedad: mide gravedad"
        },
        {
          "label": "Tasa de ataque",
          "val": "Incidencia acumulada durante un brote: enfermos / expuestos"
        },
        {
          "label": "Tasa de ataque secundaria",
          "val": "Casos entre contactos de un caso primario / contactos susceptibles"
        }
      ],
      "trap": "Confundir mortalidad con letalidad: una enfermedad rara puede tener baja mortalidad poblacional y letalidad altísima (rabia)."
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
          "val": "Comparar poblaciones con distinta estructura de edad (una más envejecida tiene más muertes)"
        },
        {
          "label": "Método directo",
          "val": "Aplica las tasas por edad de cada población a una población estándar; da tasas ajustadas comparables"
        },
        {
          "label": "Método indirecto",
          "val": "Aplica tasas estándar a la población estudiada para obtener las muertes esperadas"
        },
        {
          "label": "Razón de mortalidad estandarizada (RME)",
          "val": "Muertes observadas / esperadas; > 1 (o 100 %) = más muertes de las esperadas"
        }
      ],
      "trap": "Las tasas ajustadas sirven solo para comparar: no son la tasa real de ninguna de las dos poblaciones."
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
          "label": "Fracción atribuible en expuestos",
          "val": "(RR − 1) / RR: qué parte del riesgo de los expuestos se debe a la exposición"
        },
        {
          "label": "Riesgo atribuible poblacional",
          "val": "Incidencia en la población total − incidencia en no expuestos"
        },
        {
          "label": "Fracción atribuible poblacional",
          "val": "Riesgo atribuible poblacional / incidencia total: depende de cuán frecuente es la exposición"
        }
      ],
      "redFlag": "Para decidir políticas de salud pública pesa el riesgo atribuible poblacional, no solo el RR.",
      "trap": "Un RR alto con una exposición rara puede evitar menos casos en la población que un RR modesto con una exposición frecuente."
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
          "label": "Odds ratio (tabla 2×2)",
          "val": "(a × d) / (b × c)"
        },
        {
          "label": "Riesgo relativo",
          "val": "[a / (a + b)] / [c / (c + d)]: requiere incidencias (cohorte o ensayo)"
        },
        {
          "label": "Enfermedad rara (< 10 %)",
          "val": "El OR se aproxima al RR"
        },
        {
          "label": "Enfermedad frecuente",
          "val": "El OR se aleja de 1 más que el RR: exagera la magnitud de la asociación"
        },
        {
          "label": "Valor nulo",
          "val": "1 en ambos; un IC 95 % que incluye 1 no es significativo"
        }
      ],
      "trap": "Leer un OR de 3 como «el triple de riesgo» cuando el desenlace es frecuente."
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
          "label": "Curva de Kaplan-Meier",
          "val": "Proporción sin el evento a lo largo del tiempo; cada escalón es un evento"
        },
        {
          "label": "Censura",
          "val": "Pacientes que salen sin presentar el evento (fin del estudio, pérdida): aportan tiempo hasta que salen"
        },
        {
          "label": "Hazard ratio (HR)",
          "val": "Razón de las tasas instantáneas del evento entre grupos; < 1 favorece la intervención"
        },
        {
          "label": "Supuesto del modelo de Cox",
          "val": "Riesgos proporcionales: el HR se mantiene en el tiempo (curvas que no se cruzan)"
        },
        {
          "label": "Mediana de supervivencia",
          "val": "Tiempo en que la curva cruza el 50 %"
        }
      ],
      "trap": "Leer un HR de 0,70 como «30 % menos eventos al final»: es una razón de tasas, no una reducción de riesgo acumulado."
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
      "trap": "Confundir ocultamiento de la asignación con cegamiento: el ocultamiento siempre es posible, el cegamiento no (cirugía frente a fármaco)."
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
      "trap": "Concluir superioridad o equivalencia de un estudio diseñado solo para no inferioridad."
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
      "trap": "Aceptar un fármaco nuevo solo porque baja un marcador, sin datos de desenlaces clínicos."
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
      "trap": "Concluir que un fármaco «solo sirve en mujeres» porque el subgrupo de hombres no fue significativo: eso suele ser falta de poder."
    },
    {
      "id": "sp-f21",
      "title": "Más sesgos del tamizaje: duración, sobrediagnóstico y voluntario sano",
      "badge": "Tamizaje",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Sesgo de duración (length bias)",
          "val": "El tamizaje detecta más los tumores lentos, de mejor pronóstico"
        },
        {
          "label": "Sobrediagnóstico",
          "val": "Se detecta enfermedad que nunca habría causado síntomas ni muerte (cáncer de próstata indolente)"
        },
        {
          "label": "Voluntario sano",
          "val": "Quien acude al tamizaje suele ser más sano y cuidadoso que quien no acude"
        },
        {
          "label": "Cómo se evitan",
          "val": "Ensayo aleatorizado con mortalidad por la enfermedad (o total) como desenlace"
        }
      ],
      "redFlag": "Más casos detectados y mejor supervivencia tras el diagnóstico no prueban que el tamizaje salve vidas.",
      "trap": "Atribuir al tamizaje el mejor pronóstico de los casos detectados por él."
    },
    {
      "id": "sp-f22",
      "title": "Sesgos de Berkson y de Neyman",
      "badge": "Sesgos",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Berkson (de admisión hospitalaria)",
          "val": "Casos y controles tomados del hospital: la probabilidad de hospitalizarse depende de la exposición y de la enfermedad"
        },
        {
          "label": "Consecuencia de Berkson",
          "val": "Asociaciones falsas o distorsionadas que no existen en la población general"
        },
        {
          "label": "Neyman (prevalencia-incidencia)",
          "val": "Se estudian casos prevalentes: faltan los que murieron pronto o se curaron rápido"
        },
        {
          "label": "Cómo evitar Neyman",
          "val": "Usar casos incidentes (recién diagnosticados)"
        }
      ],
      "trap": "Llamar sesgo de memoria a lo que es de Neyman: aquí el problema es quién sobrevive para ser estudiado, no qué recuerda."
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
      "trap": "Aceptar un beneficio de un estudio observacional cuando un ensayo aleatorizado del mismo fármaco no lo encontró."
    },
    {
      "id": "sp-f24",
      "title": "Control de la confusión y modificación del efecto",
      "badge": "Confusión",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "En el diseño",
          "val": "Aleatorización (también para confusores desconocidos), restricción y emparejamiento"
        },
        {
          "label": "En el análisis",
          "val": "Estratificación (Mantel-Haenszel) y regresión multivariable (solo confusores medidos)"
        },
        {
          "label": "Señal de confusión",
          "val": "La medida cruda cambia al ajustar, pero es igual en todos los estratos"
        },
        {
          "label": "Modificación del efecto (interacción)",
          "val": "El efecto es distinto en cada estrato: se informa por separado, no se «ajusta»"
        }
      ],
      "trap": "Ajustar por una variable intermedia del camino causal (por ejemplo, la presión al estudiar sal y accidente cerebrovascular): borra el efecto real."
    },
    {
      "id": "sp-f25",
      "title": "Criterios de causalidad de Bradford Hill",
      "badge": "Causalidad",
      "area": "Diseños, sesgos y causalidad",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Temporalidad",
          "val": "La exposición precede al efecto: el único criterio indispensable"
        },
        {
          "label": "Fuerza y gradiente",
          "val": "Asociación fuerte (RR alto) y dosis-respuesta"
        },
        {
          "label": "Consistencia",
          "val": "Se repite en distintos estudios, poblaciones y diseños"
        },
        {
          "label": "Plausibilidad y coherencia",
          "val": "Tiene sentido biológico y no contradice lo conocido"
        },
        {
          "label": "Experimento",
          "val": "Al quitar la exposición, el efecto disminuye"
        }
      ],
      "trap": "Exigir especificidad (una causa, un efecto): el tabaco causa muchas enfermedades y aun así es causal."
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
      "trap": "Confiar en un metaanálisis con I² alto sin preguntar por qué los estudios difieren."
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
      "trap": "Creer que una recomendación fuerte exige evidencia de certeza alta: puede haber recomendaciones fuertes con certeza baja."
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
      "trap": "Tamizar solo porque existe una prueba sensible: sin tratamiento eficaz en fase temprana, el tamizaje no aporta y puede dañar."
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
          "label": "Primordial (Strasser, OMS)",
          "val": "Evita que aparezcan los factores de riesgo en la población: políticas y entornos (menos sal en los alimentos, impuestos a bebidas azucaradas, espacios para la actividad física desde la infancia)"
        },
        {
          "label": "Primaria",
          "val": "Evita que la enfermedad aparezca: vacunas, dejar de fumar, ácido fólico"
        },
        {
          "label": "Secundaria",
          "val": "Detecta la enfermedad temprana, sin síntomas: tamizaje (citología, mamografía)"
        },
        {
          "label": "Terciaria",
          "val": "Limita secuelas y complicaciones de una enfermedad ya establecida: rehabilitación tras un ictus"
        },
        {
          "label": "Cuaternaria (concepto de la medicina familiar, WONCA)",
          "val": "Evita el daño por exceso de intervenciones médicas (sobrediagnóstico, sobretratamiento)"
        }
      ],
      "trap": "Clasificar el tamizaje como prevención primaria (no evita la enfermedad, la detecta antes), o confundir primordial con primaria: la primordial actúa antes de que exista el factor de riesgo; la primaria, sobre personas con el factor de riesgo o expuestas (vacunar, tratar la hipertensión para evitar el ictus)."
    },
    {
      "id": "sp-f30",
      "title": "Brotes: curva epidémica, R0 e inmunidad colectiva",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Endemia, epidemia y pandemia",
          "val": "Lo habitual en una zona · más casos de los esperados · epidemia en varios continentes"
        },
        {
          "label": "Fuente común puntual",
          "val": "Un solo pico, en el lapso de un periodo de incubación (intoxicación alimentaria)"
        },
        {
          "label": "Propagada (persona a persona)",
          "val": "Picos sucesivos separados por un periodo de incubación"
        },
        {
          "label": "Número reproductivo básico (R0)",
          "val": "Casos secundarios por caso en una población totalmente susceptible; > 1 la epidemia crece"
        },
        {
          "label": "Umbral de inmunidad colectiva",
          "val": "1 − 1/R0: con R0 = 4, hace falta ≈ 75 % de inmunes"
        }
      ],
      "trap": "Llamar epidemia solo a muchos casos: un caso de una enfermedad erradicada ya es un brote."
    },
    {
      "id": "sp-f31",
      "title": "Aislamiento, cuarentena y periodos de una infección",
      "badge": "Enfermedades transmisibles",
      "area": "Enfermedades transmisibles",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Aislamiento",
          "val": "Separa a los enfermos (casos) durante el periodo de transmisibilidad"
        },
        {
          "label": "Cuarentena",
          "val": "Restringe a los expuestos sanos durante el periodo de incubación máximo"
        },
        {
          "label": "Periodo de incubación",
          "val": "De la infección a los síntomas"
        },
        {
          "label": "Periodo de latencia",
          "val": "De la infección a la capacidad de contagiar; si es menor que la incubación, hay contagio antes de los síntomas"
        },
        {
          "label": "Caso índice frente a caso primario",
          "val": "El primero que llama la atención del sistema · el primero que se infectó"
        }
      ],
      "trap": "Invertir cuarentena y aislamiento."
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
      "trap": "Usar t de Student no pareada para mediciones antes y después en los mismos pacientes."
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
      "trap": "Presentar el error estándar en lugar de la desviación estándar hace que los datos parezcan menos dispersos."
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
      "trap": "Leer causalidad en una correlación, o creer que r = 0 significa ninguna relación (puede ser no lineal)."
    },
    {
      "id": "sp-f35",
      "title": "Tamaño de muestra: qué lo aumenta",
      "badge": "Bioestadística",
      "area": "Bioestadística",
      "src": "gordis",
      "accent": "#b45309",
      "thresholds": [
        {
          "label": "Diferencia a detectar más pequeña",
          "val": "Más pacientes"
        },
        {
          "label": "Más poder (de 80 % a 90 %)",
          "val": "Más pacientes"
        },
        {
          "label": "α más exigente (de 0,05 a 0,01)",
          "val": "Más pacientes"
        },
        {
          "label": "Más variabilidad del desenlace o eventos más raros",
          "val": "Más pacientes"
        }
      ],
      "redFlag": "Un estudio pequeño «negativo» no prueba que no haya efecto: mira si calculó la muestra y si el IC incluye un beneficio importante.",
      "trap": "Pensar que aumentar la muestra corrige un sesgo: solo reduce el error aleatorio."
    }
  ],
  "tarjetas": [
    {
      "id": 42,
      "src": "gordis",
      "front": "Prueba ideal para descartar enfermedad",
      "back": "Alta sensibilidad (SnNout)"
    },
    {
      "id": 43,
      "src": "gordis",
      "front": "Prueba ideal para confirmar enfermedad",
      "back": "Alta especificidad (SpPin)"
    },
    {
      "id": 44,
      "src": "gordis",
      "front": "Fórmula del NNT",
      "back": "1 / reducción absoluta del riesgo"
    },
    {
      "id": 45,
      "src": "gordis",
      "front": "Medida de asociación en casos y controles",
      "back": "Odds ratio"
    },
    {
      "id": 46,
      "src": "gordis",
      "front": "¿Qué cambia con la prevalencia: sensibilidad o VPP?",
      "back": "Los valores predictivos (VPP y VPN)"
    }
  ]
});
