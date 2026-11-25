// Ortopedia y Traumatología: contenido incluido en la app · paquete "ortopedia" (módulo aparte).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Ortopedia y Traumatología",
  "prefijo": "ort",
  "paquete": "ortopedia",
  "actualizado": "2026-11-25",
  "casos": [
    {
      "id": "ort-c01",
      "topic": "Ortopedia infantil · Artritis séptica de cadera",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Lactante de 9 meses con fiebre de 39 °C, irritable, que <span class='hy'>no mueve la pierna derecha</span> y llora mucho al movilizarle la cadera. La ecografía muestra <span class='hy'>derrame en la cadera</span>. ¿Qué haces?",
      "options": [
        "Artrotomía urgente y antibiótico intravenoso",
        "Artrocentesis con aguja y antibiótico oral en casa",
        "Reposo y antiinflamatorio, con control en una semana",
        "Esperar la radiografía de control a las 3 semanas"
      ],
      "correct": 0,
      "whyCorrect": "La sospecha de artritis séptica de cadera obliga a la artrotomía urgente para descomprimir, lavar y drenar; la artrocentesis con aguja es insuficiente. Se suma antibiótico intravenoso.",
      "pearl": "En la radiografía, la afectación ósea aparece solo 2 a 3 semanas después del inicio: no se espera a verla.",
      "trap": "Tratar con artrocentesis o esperar cambios radiológicos.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "La sospecha de artritis séptica justifica la artrotomía urgente de la cadera para su adecuada descompresión, lavado y posterior drenaje; la artrocentesis con jeringa y aguja es insuficiente. Simultáneamente, es necesario el empleo de antibioterapia intravenosa."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c02",
      "topic": "Ortopedia infantil · Sinovitis transitoria de cadera",
      "difficulty": "basica",
      "src": "cto_tm",
      "vignette": "Niño de 4 años con cojera y dolor en la cadera que se irradia a la rodilla desde ayer. Tuvo un <span class='hy'>resfriado hace 10 días</span>. Está <span class='hy'>afebril y con buen estado general</span>; los exámenes descartan infección. ¿Qué tratamiento indicas?",
      "options": [
        "Antibiótico intravenoso por 3 semanas",
        "Artrotomía para lavado de la articulación",
        "Arnés de Pavlik durante 6 semanas",
        "Reposo, analgésicos y observación"
      ],
      "correct": 3,
      "whyCorrect": "La sinovitis transitoria es la causa más frecuente de dolor de cadera de 3 a 8 años, suele seguir a una infección respiratoria viral y remite en 1 a 4 semanas: el tratamiento es solo sintomático.",
      "pearl": "Es un diagnóstico de exclusión: primero se descartan la artritis séptica, el Perthes y la osteomielitis.",
      "trap": "Tratar como artritis séptica a un niño sin fiebre ni compromiso sistémico.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "es la causa más frecuente de dolor coxofemoral en niños de 3 a 8 años"
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "La mayor parte de los casos remiten en 1-4 semanas. El único tratamiento necesario es sintomático: observación, reposo y analgésicos o antiinflamatorios."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c03",
      "topic": "Ortopedia infantil · Perthes",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Niño de 6 años, de talla baja, con <span class='hy'>cojera de inicio insidioso</span> desde hace 2 meses y dolor leve en la cadera. Al examen hay <span class='hy'>limitación de la abducción y de la rotación interna</span>; los laboratorios son normales. ¿Cuál es el diagnóstico más probable?",
      "options": [
        "Artritis séptica de la cadera",
        "Epifisiólisis femoral proximal",
        "Enfermedad de Legg-Calvé-Perthes",
        "Displasia del desarrollo de la cadera"
      ],
      "correct": 2,
      "whyCorrect": "El Perthes es una isquemia de la epífisis femoral en crecimiento; es más frecuente de 4 a 8 años, en varones, con retraso de la edad ósea, claudicación insidiosa y limitación de la abducción y la rotación interna.",
      "pearl": "Laboratorio normal y radiografía en cinco fases: inicial, densificación, fragmentación, reosificación y remodelación.",
      "trap": "Pensar en epifisiólisis: esa es del adolescente.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "Puede aparecer entre los 2 y los 13 años, pero la mayor parte de los casos ocurren entre los 4 y 8 años."
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "La clínica se presenta con claudicación insidiosa de la marcha, dolor moderado y limitación de la movilidad de la cadera, especialmente abducción y rotación interna. Los estudios de laboratorio son negativos."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c04",
      "topic": "Ortopedia infantil · Epifisiólisis femoral proximal",
      "difficulty": "dificil",
      "src": "cto_tm",
      "vignette": "Adolescente de 13 años, <span class='hy'>obeso</span>, con dolor en la rodilla izquierda y cojera de 2 meses; camina sin apoyo. Al flexionar la cadera, el muslo <span class='hy'>se va a rotación externa</span>. La radiografía muestra un deslizamiento leve de la epífisis. ¿Qué tratamiento corresponde?",
      "options": [
        "Reducción forzada de la epífisis y luego tornillo",
        "Fijación in situ con tornillo, sin reducir",
        "Yeso pelvipédico por 8 semanas sin cirugía",
        "Reposo y antiinflamatorios hasta que cierre la fisis"
      ],
      "correct": 1,
      "whyCorrect": "Con deslizamiento leve se fija in situ con un tornillo canulado y sin reducción, por el riesgo de necrosis. El dolor en la rodilla retrasa el diagnóstico y la rotación externa al flexionar (signo de Drehmann) es muy característica.",
      "pearl": "Epifisiólisis: varón preadolescente, obeso, con retraso de la madurez sexual.",
      "trap": "Reducir la epífisis antes de fijarla.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 80",
          "texto": "El miembro se encuentra en rotación externa y la limitación de la rotación interna aumenta a medida que se flexiona la cadera (signo de Drehmann), lo que supone un hallazgo muy característico."
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 80",
          "texto": "se tratan mediante fijación in situ, sin reducción (por riesgo de necrosis) con un tornillo canulado."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c05",
      "topic": "Ortopedia infantil · Pie zambo",
      "difficulty": "basica",
      "src": "cto_tm",
      "vignette": "Recién nacido con <span class='hy'>pie derecho en equino, varo y aducto</span>, que se corrige parcialmente con la manipulación. ¿Cuándo y cómo inicias el tratamiento?",
      "options": [
        "A los 6 meses, con liberación quirúrgica",
        "Al empezar a caminar, con plantillas",
        "Lo antes posible, con yesos de Ponseti",
        "Solo observación: es un pie plano fisiológico"
      ],
      "correct": 2,
      "whyCorrect": "El tratamiento del pie zambo debe empezar lo antes posible, idealmente el primer día de vida; en los flexibles se usan yesos sucesivos que corrigen el aducto, el varo y el equino (método de Ponseti).",
      "pearl": "La cirugía (6 a 12 meses) queda para los pies rígidos o que no responden a los yesos.",
      "trap": "Confundirlo con el pie plano valgo flexible, que es fisiológico hasta los 7 años.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 83",
          "texto": "El tratamiento de esta deformidad debe comenzarse lo antes posible; si es posible, el primer día de vida. En los pies zambos flexibles, se realiza tratamiento conservador con yesos sucesivos que progresivamente corrigen el aducto, el varo y el equino (“método de Ponseti”)"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c06",
      "topic": "Ortopedia infantil · Osgood-Schlatter",
      "difficulty": "basica",
      "src": "cto_tm",
      "vignette": "Futbolista de 13 años con dolor y <span class='hy'>abultamiento en la tuberosidad anterior de la tibia</span> que empeora al jugar. ¿Cuál es el diagnóstico?",
      "options": [
        "Osteosarcoma de tibia proximal",
        "Enfermedad de Osgood-Schlatter",
        "Rotura del ligamento cruzado anterior",
        "Lesión del menisco interno"
      ],
      "correct": 1,
      "whyCorrect": "El Osgood-Schlatter, la osteocondrosis más frecuente, es una apofisitis de la tuberosidad tibial anterior en niños deportivamente activos hacia los 13 o 14 años.",
      "pearl": "Dolor a la presión local e hinchazón en la tuberosidad tibial de un adolescente deportista.",
      "trap": "Pensar primero en un tumor ante el abultamiento.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 71",
          "texto": "La osteocondrosis más frecuente, el Osgood-Schlatter, es una apofisitis de la tuberosidad tibial anterior en niños deportivamente activos hacia los 13-14 años."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c07",
      "topic": "Traumatología · Fractura del cuello femoral",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Mujer de 82 años que se cae en casa. Tiene <span class='hy'>acortamiento y rotación externa</span> de la pierna. La radiografía muestra una <span class='hy'>fractura subcapital totalmente desplazada</span> (Garden IV). ¿Qué tratamiento indicas?",
      "options": [
        "Osteosíntesis con tornillos canulados",
        "Tracción de partes blandas por 6 semanas",
        "Tratamiento conservador con reposo en cama",
        "Artroplastia (prótesis de cadera)"
      ],
      "correct": 3,
      "whyCorrect": "En el paciente de edad avanzada, la fractura del cuello femoral desplazada se trata con artroplastia; la no desplazada, con osteosíntesis. En los jóvenes se intenta conservar la cabeza femoral.",
      "pearl": "Complicaciones propias del cuello femoral: necrosis isquémica y ausencia de consolidación.",
      "trap": "Fijar con tornillos una fractura desplazada en una anciana.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 21",
          "texto": "Jóvenes: osteosíntesis con tornillos Edad avanzada: • Osteosíntesis, si no está desplazada • Artroplastia, si está desplazada"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c08",
      "topic": "Traumatología · Luxación anterior de hombro",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Hombre de 25 años con <span class='hy'>luxación anterior de hombro</span> tras una caída en bicicleta. Después de reducirla refiere <span class='hy'>adormecimiento en la cara lateral del hombro</span> y le cuesta separar el brazo. ¿Qué nervio está lesionado?",
      "options": [
        "Nervio musculocutáneo del brazo",
        "Nervio supraescapular",
        "Nervio radial",
        "Nervio axilar (circunflejo)"
      ],
      "correct": 3,
      "whyCorrect": "La lesión neurológica característica de la luxación anterior de hombro es la del nervio axilar o circunflejo, que inerva el deltoides y el redondo menor: da hipoestesia lateral del hombro y dificultad para la abducción.",
      "pearl": "Siempre radiografía antes de reducir, para no manipular una fractura-luxación.",
      "trap": "Confundirlo con el radial, que es el de la fractura de la diáfisis humeral.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 33",
          "texto": "El nervio axilar o circunflejo se encarga de inervar al deltoides y al redondo menor, por lo que su lesión producirá un área de hipoestesia en la cara lateral del hombro y una dificultad a la abducción."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c09",
      "topic": "Traumatología · Fractura de diáfisis humeral",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Hombre de 35 años con <span class='hy'>fractura cerrada de la diáfisis del húmero</span> tras un accidente. Al examen <span class='hy'>no puede extender la muñeca</span> («mano caída»). ¿Qué esperas y qué haces?",
      "options": [
        "Neuroapraxia radial: inmovilizar y vigilar",
        "Explorar el nervio ya: es una sección completa",
        "Lesión del mediano: liberar el túnel del carpo",
        "Lesión del cubital: transposición del nervio"
      ],
      "correct": 0,
      "whyCorrect": "La lesión del nervio radial es la complicación aguda típica de la fractura diafisaria de húmero. Suele ser una neuroapraxia que se recupera en 3 o 4 meses; solo se opera si empeora con el tratamiento conservador o si la fractura es abierta.",
      "pearl": "Es más frecuente en la fractura oblicua del tercio distal (Holstein-Lewis).",
      "trap": "Operar de entrada una mano caída en una fractura cerrada.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 14",
          "texto": "La lesión del radial suele ser una neuroapraxia que normalmente se recupera en 3 o 4 meses, y que solo requiere abordaje quirúrgico si empeora al intentar la inmovilización con tratamiento conservador o en las fracturas abiertas"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c10",
      "topic": "Traumatología · Embolia grasa",
      "difficulty": "dificil",
      "src": "cto_tm",
      "vignette": "Hombre de 22 años con <span class='hy'>fractura de diáfisis femoral</span> aún no fijada. A las 36 horas, después de estar estable, presenta <span class='hy'>disnea, confusión y petequias en el tórax y las conjuntivas</span>. PaO2 de 52 mmHg. ¿Qué cuadro presenta?",
      "options": [
        "Síndrome de embolia grasa",
        "Tromboembolismo pulmonar por TVP",
        "Neumonía por aspiración",
        "Síndrome compartimental del muslo"
      ],
      "correct": 0,
      "whyCorrect": "Tras un intervalo lúcido, la tríada de insuficiencia respiratoria, alteración neurológica cambiante y petequias en tórax, axila, cuello y conjuntiva define la embolia grasa; la fractura más asociada es la de diáfisis femoral.",
      "pearl": "La fijación precoz de la fractura reduce el riesgo; diferirla lo aumenta.",
      "trap": "Pensar en TEP sin notar las petequias y la alteración neurológica.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 10",
          "texto": "La fractura más frecuentemente asociada a síndrome de embolia grasa es la de la diáfisis femoral."
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 10",
          "texto": "1. Insuficiencia respiratoria a raíz de un síndrome de distrés respiratorio del adulto (SDRA). 2. Sintomatología neurológica cambiante (con predominio de afectación del nivel de consciencia). 3. Petequias en tórax, axila, raíz del cuello y conjuntiva."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c11",
      "topic": "Traumatología · Rotura del tendón de Aquiles",
      "difficulty": "basica",
      "src": "cto_tm",
      "vignette": "Hombre de 45 años que sintió un <span class='hy'>golpe en el talón</span> al saltar jugando tenis. Boca abajo, al <span class='hy'>apretar la pantorrilla el pie no hace flexión plantar</span>. ¿Qué maniobra hiciste y qué indica?",
      "options": [
        "Lachman positivo: rotura del cruzado",
        "Thompson: rotura del Aquiles",
        "McMurray positivo: lesión del menisco",
        "Cajón anterior: esguince del tobillo"
      ],
      "correct": 1,
      "whyCorrect": "La maniobra de Thompson se hace en decúbito prono comprimiendo la masa gemelar: si no hay flexión plantar pasiva, el tendón de Aquiles está roto.",
      "pearl": "El tratamiento quirúrgico reduce el riesgo de nueva rotura frente al ortopédico.",
      "trap": "Confundir la maniobra de Thompson con las de la rodilla.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 49",
          "texto": "La maniobra de Thompson ayuda en el diagnóstico y se realiza colocando al paciente en decúbito prono y comprimiendo la masa gemelar, sin obtener una flexión plantar pasiva, al estar roto el tendón de Aquiles"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-c12",
      "topic": "Traumatología · Ligamento cruzado anterior",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Futbolista de 24 años que <span class='hy'>giró sobre la rodilla</span> y sintió un chasquido; la rodilla se hinchó en 1 a 2 horas. ¿Qué maniobra es la más sensible para la lesión que sospechas?",
      "options": [
        "Cajón posterior a 90° de flexión",
        "Bostezo en varo con la rodilla a 30°",
        "Maniobra de Lachman a 30° de flexión",
        "Maniobra de McMurray en flexión forzada"
      ],
      "correct": 2,
      "whyCorrect": "Giro con hemartros rápido sugiere rotura del cruzado anterior; la traslación anterior de la tibia a 30° de flexión (Lachman) es la maniobra más sensible.",
      "pearl": "El cajón anterior se hace a 90° y es menos sensible que el Lachman.",
      "trap": "Usar el cajón posterior, que explora el cruzado posterior.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 43",
          "texto": "tanto a 30° de flexión (maniobra de Lachman, más sensible), como a 90° de flexión (test del cajón anterior, especialmente llamativo con la pierna en rotación externa)"
        }
      ],
      "verificado": "2026-11-25"
    }
  ],
  "fichas": [
    {
      "id": "ort-f01",
      "title": "Cadera infantil según la edad",
      "badge": "Ortopedia infantil",
      "thresholds": [
        {
          "label": "Sinovitis transitoria",
          "val": "3 a 8 años; tras infección respiratoria viral; autolimitada en 1 a 4 semanas"
        },
        {
          "label": "Perthes",
          "val": "4 a 8 años, varón, talla baja; limita abducción y rotación interna"
        },
        {
          "label": "Epifisiólisis",
          "val": "Adolescente obeso; rotación externa al flexionar la cadera (Drehmann); fijación in situ"
        },
        {
          "label": "Artritis séptica",
          "val": "Lactante séptico con seudoparálisis; artrotomía urgente"
        }
      ],
      "trap": "Dar por sinovitis transitoria un cuadro con fiebre y compromiso sistémico.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "es la causa más frecuente de dolor coxofemoral en niños de 3 a 8 años"
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 80",
          "texto": "Es la causa más frecuente de dolor, claudicación de la marcha y limitación de la movilidad de la cadera del adolescente."
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 78",
          "texto": "Clínicamente, cursa con un cuadro séptico sistémico, acompañado de inmovilidad (seudoparálisis) del miembro afectado"
        }
      ],
      "src": "cto_tm",
      "area": "Ortopedia infantil",
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-f02",
      "title": "Nervio en riesgo según la fractura",
      "badge": "Traumatología",
      "thresholds": [
        {
          "label": "Húmero proximal / luxación anterior de hombro",
          "val": "Nervio axilar (circunflejo)"
        },
        {
          "label": "Diáfisis humeral",
          "val": "Nervio radial (mano caída)"
        },
        {
          "label": "Monteggia",
          "val": "Nervio interóseo posterior (rama del radial)"
        },
        {
          "label": "Radio distal",
          "val": "Nervio mediano"
        }
      ],
      "trap": "Asociar la mano caída con la luxación de hombro: es del radial, en la diáfisis humeral.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 19",
          "texto": "Fracturas húmero proximal → nervio axilar o circunflejo. • Fracturas diáfisis humeral → nervio radial. • Fractura-luxación de Monteggia → nervio interóseo posterior (rama del nervio radial). • Fractura distal radio → nervio mediano."
        }
      ],
      "src": "cto_tm",
      "area": "Traumatología",
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-f03",
      "title": "Fractura de cadera: cuello femoral",
      "badge": "Traumatología",
      "thresholds": [
        {
          "label": "Clínica",
          "val": "Acortamiento, rotación externa e impotencia funcional"
        },
        {
          "label": "Garden",
          "val": "I incompleta impactada en valgo · II completa no desplazada · III desplazada parcialmente · IV totalmente desplazada"
        },
        {
          "label": "Tratamiento en jóvenes",
          "val": "Osteosíntesis con tornillos: conservar la cabeza femoral"
        },
        {
          "label": "Tratamiento en edad avanzada",
          "val": "Osteosíntesis si no está desplazada; artroplastia si está desplazada"
        }
      ],
      "trap": "Poner prótesis a un joven con fractura del cuello femoral: se intenta conservar su cabeza femoral.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 22",
          "texto": "tipo I (incompleta, no desplazada, impactada en valgo), tipo II (completa, no desplazada ni impactada), tipo III (completa, desplazada parcialmente en varo) y tipo IV (completa, totalmente desplazada)."
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 22",
          "texto": "Por tanto, en los pacientes jóvenes hay que intentar conservar su propia cabeza femoral y evitar la artroplastia"
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 1",
          "texto": "La fractura de cadera cursa con acortamiento y rotación externa e impotencia funcional."
        }
      ],
      "src": "cto_tm",
      "area": "Traumatología",
      "verificado": "2026-11-25"
    },
    {
      "id": "ort-f04",
      "title": "Síndrome de embolia grasa",
      "badge": "Traumatología",
      "thresholds": [
        {
          "label": "Cuándo",
          "val": "Fracturas de huesos largos de miembros inferiores (sobre todo diáfisis femoral), tras un intervalo lúcido"
        },
        {
          "label": "Tríada",
          "val": "Insuficiencia respiratoria (SDRA), alteración neurológica cambiante y petequias en tórax, axila, cuello y conjuntiva"
        },
        {
          "label": "Laboratorio",
          "val": "Hipoxemia (PO2 < 60 mmHg), anemia y trombocitopenia"
        },
        {
          "label": "Radiografía de tórax",
          "val": "Imagen en «tormenta de nieve»"
        }
      ],
      "trap": "Diferir la fijación de la fractura: aumenta el riesgo.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 10",
          "texto": "El parámetro analítico de mayor valor es la presencia de hipoxemia (generalmente PO2 < 60 mmHg), habitualmente acompañada de anemia y trombocitopenia. La radiografía de tórax presenta característicamente una imagen en “tormenta de nieve” progresiva"
        },
        {
          "donde": "Manual CTO 14.ª ed., Traumatología, p. 10",
          "texto": "y aumenta si se difiere la fijación quirúrgica definitiva."
        }
      ],
      "src": "cto_tm",
      "area": "Traumatología",
      "verificado": "2026-11-25"
    }
  ],
  "tarjetas": [],
  "revision": "verificada"
});
