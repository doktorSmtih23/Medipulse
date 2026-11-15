// Salud Pública: contenido incluido en la app (starter pack de la versión gratuita).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: sp-c01 (casos), sp-f01 (fichas), sp-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Salud Pública",
  "prefijo": "sp",
  "actualizado": "2026-11-15",
  "casos": [
    {
      "id": 19,
      "topic": "Epidemiología · Pruebas diagnósticas",
      "difficulty": "Nivel 2",
      "src": "gordis",
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
      "trap": "Creer que el VPP es fijo. A menor prevalencia, cae el VPP y aumentan los falsos positivos."
    },
    {
      "id": 20,
      "topic": "Epidemiología · Diseño de estudios",
      "difficulty": "Nivel 2",
      "src": "gordis",
      "vignette": "Investigadores identifican a 120 pacientes con <span class='hy'>carcinoma hepatocelular</span> y 240 sin la enfermedad, y revisan <span class='hy'>retrospectivamente</span> su exposición previa a aflatoxinas. ¿Qué diseño es y qué medida de asociación corresponde?",
      "options": [
        "Casos y controles · Odds ratio",
        "Cohorte prospectiva · Riesgo relativo",
        "Transversal · Prevalencia",
        "Ensayo clínico · Número necesario a tratar"
      ],
      "correct": 0,
      "whyCorrect": "Se parte del desenlace (con y sin enfermedad) y se busca la exposición hacia atrás: eso es un estudio de casos y controles. No permite calcular incidencia, así que la medida es el odds ratio.",
      "pearl": "Cohorte: parte de la exposición → RR. Casos y controles: parte de la enfermedad → OR. Útil para enfermedades raras.",
      "trap": "Calcular riesgo relativo en un estudio de casos y controles: no se puede porque el investigador fija la proporción de casos."
    },
    {
      "id": "sp-c01",
      "topic": "Lectura crítica · NNT",
      "difficulty": "Nivel 2",
      "src": "gordis",
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
      "trap": "Calcular el NNT con la reducción relativa (1 / 0,20 = 5)."
    },
    {
      "id": "sp-c02",
      "topic": "Lectura crítica · Intención de tratar",
      "difficulty": "Nivel 3",
      "src": "gordis",
      "vignette": "En un ensayo clínico aleatorizado de un antihipertensivo, el <span class='hy'>15 % de los pacientes abandonó el tratamiento</span> por efectos adversos, la mayoría en el grupo intervención. Los autores presentan como resultado principal solo a quienes completaron el tratamiento según el protocolo, y muestran un gran beneficio. ¿Qué análisis debió ser el principal para conservar los beneficios de la aleatorización?",
      "options": [
        "Análisis por protocolo",
        "Análisis por intención de tratar, con todos en el grupo al que fueron asignados",
        "Análisis solo de los pacientes con buena adherencia",
        "Análisis de subgrupos por edad"
      ],
      "correct": 1,
      "whyCorrect": "El análisis por intención de tratar incluye a todos los pacientes en el grupo al que fueron aleatorizados, hayan completado o no el tratamiento. Así conserva la comparabilidad que da la aleatorización y refleja lo que pasa en la práctica. Excluir a quienes abandonan, sobre todo si son más en un grupo, rompe esa comparabilidad y exagera el beneficio.",
      "pearl": "En ensayos de superioridad, el análisis principal es por intención de tratar; el análisis por protocolo es complementario.",
      "trap": "Creer que el análisis por protocolo es más “real” porque solo cuenta a quienes recibieron el tratamiento."
    },
    {
      "id": "sp-c03",
      "topic": "Epidemiología · Valores predictivos",
      "difficulty": "Nivel 3",
      "src": "gordis",
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
      "trap": "Responder 90 %, confundiendo la sensibilidad con el valor predictivo positivo."
    },
    {
      "id": "sp-c04",
      "topic": "Lectura crítica · Sesgos en tamizaje",
      "difficulty": "Nivel 3",
      "src": "gordis",
      "vignette": "Tras implementar un programa de tamizaje de un cáncer, la <span class='hy'>supervivencia a 5 años desde el diagnóstico aumentó</span> de 40 % a 60 %. Sin embargo, la <span class='hy'>mortalidad por ese cáncer en la población no cambió</span>. ¿Qué explica mejor este hallazgo?",
      "options": [
        "El tratamiento mejoró gracias al diagnóstico temprano",
        "Sesgo de anticipación (lead time): el diagnóstico se adelantó sin cambiar la fecha de muerte",
        "Sesgo de memoria de los pacientes encuestados",
        "Error tipo I por un tamaño de muestra grande"
      ],
      "correct": 1,
      "whyCorrect": "El tamizaje adelanta el momento del diagnóstico. Si la muerte ocurre en la misma fecha, el tiempo medido desde el diagnóstico se alarga y la supervivencia parece mejor, sin beneficio real. Por eso el desenlace que demuestra beneficio de un tamizaje es la mortalidad, no la supervivencia desde el diagnóstico.",
      "pearl": "Sesgos del tamizaje: anticipación (lead time), duración (length time: detecta más los tumores lentos) y sobrediagnóstico. Se evitan midiendo mortalidad en ensayos aleatorizados.",
      "trap": "Tomar el aumento de la supervivencia como prueba de que el tamizaje salva vidas."
    },
    {
      "id": "sp-c05",
      "topic": "Lectura crítica · Confusión",
      "difficulty": "Nivel 2",
      "src": "gordis",
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
      "trap": "Llamarlo interacción: en la interacción el efecto cambia según el nivel de un tercer factor, no desaparece al ajustar."
    },
    {
      "id": "sp-c06",
      "topic": "Epidemiología · Estudio de brote",
      "difficulty": "Nivel 2",
      "src": "gordis",
      "vignette": "Después de un almuerzo comunitario, varias personas presentan vómito y diarrea en las 6 horas siguientes. De <span class='hy'>120 que comieron ensalada de papa, 60 enfermaron</span>; de <span class='hy'>80 que no la comieron, 4 enfermaron</span>. Con el pollo, enfermaron 30 de 100 que lo comieron y 34 de 100 que no. ¿Cuál es el alimento sospechoso y su riesgo relativo?",
      "options": [
        "Pollo, RR ≈ 0,9",
        "Ensalada de papa, RR = 10",
        "Ensalada de papa, RR = 2",
        "No se puede calcular: falta un grupo control"
      ],
      "correct": 1,
      "whyCorrect": "Tasa de ataque en quienes comieron ensalada: 60/120 = 50 %; en quienes no: 4/80 = 5 %. RR = 50 / 5 = 10. Con el pollo, 30 % frente a 34 %: RR ≈ 0,9, sin asociación. En un brote con población definida se comparan tasas de ataque (un estudio de cohorte retrospectivo).",
      "pearl": "Tasa de ataque = enfermos / expuestos. El alimento sospechoso es el que tiene alta tasa de ataque en los expuestos, baja en los no expuestos y la mayoría de los casos entre quienes lo comieron.",
      "trap": "Elegir el alimento con más enfermos en números absolutos sin comparar con quienes no lo comieron."
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
      "src": "gordis",
      "vignette": "Un ensayo clínico con <span class='hy'>80 pacientes</span> compara dos analgésicos y no encuentra diferencia significativa en el dolor (p = 0,30). Los autores reconocen que el estudio tenía un <span class='hy'>poder estadístico de 40 %</span> para detectar la diferencia que consideraban importante. ¿Cuál es la conclusión correcta?",
      "options": [
        "Los dos analgésicos son igual de eficaces",
        "El nuevo analgésico es inferior",
        "No se puede concluir que sean iguales: hay alto riesgo de error tipo II",
        "Hubo un error tipo I"
      ],
      "correct": 2,
      "whyCorrect": "Con poder de 40 %, el estudio tenía 60 % de probabilidad de no detectar una diferencia real (error tipo II, β). Un resultado no significativo en un estudio con poco poder no demuestra equivalencia: la ausencia de evidencia no es evidencia de ausencia.",
      "pearl": "Error tipo I (α): encontrar una diferencia que no existe. Error tipo II (β): no encontrar una que sí existe. Poder = 1 − β; se busca ≥ 80 %.",
      "trap": "Concluir que los tratamientos son equivalentes porque p > 0,05."
    }
  ],
  "fichas": [
    {
      "id": "sp-f01",
      "title": "Pruebas diagnósticas: qué depende de la prevalencia",
      "badge": "Pruebas diagnósticas",
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
