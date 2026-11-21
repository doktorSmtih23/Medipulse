// Ginecología: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: gin-c01 (casos), gin-f01 (fichas), gin-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Ginecología",
  "prefijo": "gin",
  "paquete": "starter",
  "actualizado": "2026-11-21",
  "casos": [
    {
      "id": 4,
      "topic": "Obstetricia · Trastornos Hipertensivos",
      "difficulty": "Nivel 3",
      "src": "nice_hta",
      "vignette": "Gestante de 34 semanas consulta por <span class='hy'>cefalea frontal intensa, fosfenos y epigastralgia</span>. PA 168/112 mmHg en dos tomas, proteinuria en tira +++, plaquetas 88.000/mm³, AST 145 U/L. ¿Cuál es el manejo farmacológico prioritario para prevención de eclampsia y control tensional?",
      "options": [
        "Diazepam IV en infusión + losartán oral 50 mg",
        "Alfamelildopa oral 500 mg cada 8 horas y control ambulatorio en 48 horas",
        "Sulfato de magnesio IV (4 g en 5–15 min, luego 1 g/h) + labetalol o nifedipino oral",
        "Furosemida IV + inducción del parto diferida hasta las 37 semanas"
      ],
      "correct": 2,
      "whyCorrect": "Es una preeclampsia con hipertensión grave (más de 160/110 mmHg) y signos de gravedad: cefalea, escotomas, epigastralgia, plaquetas en descenso y transaminasas elevadas. NICE indica considerar el sulfato de magnesio (4 g IV en 5–15 minutos y luego 1 g/h por 24 horas) y tratar de inmediato la hipertensión grave con labetalol (oral o IV), nifedipino oral o hidralazina IV.",
      "pearl": "Con tratamiento antihipertensivo, la meta es una PA de 135/85 mmHg o menos (NICE).",
      "trap": "Usar diazepam o fenitoína en lugar del sulfato de magnesio. Los IECA y ARA-II (losartán) se suspenden en el embarazo.",
      "cita": [
        {
          "donde": "Términos usados en la guía",
          "texto": "Severe hypertension Blood pressure over 160 mmHg systolic or over 110 mmHg diastolic."
        },
        {
          "donde": "Recomendación 1.8.3 [2010, modificada 2019]",
          "texto": "Consider the need for magnesium sulfate treatment, if 1 or more of the following features of severe pre-eclampsia is present: ongoing or recurring severe headaches · visual scotomata · nausea or vomiting · epigastric pain · oliguria and severe hypertension · progressive deterioration in laboratory blood tests (such as rising creatinine or liver transaminases, or falling platelet count)."
        },
        {
          "donde": "Recomendación 1.8.4 [2010, modificada 2019]",
          "texto": "Use the Collaborative Eclampsia Trial regimen for administration of magnesium sulfate: A loading dose of 4 g should be given intravenously over 5 to 15 minutes, followed by an infusion of 1 g/hour maintained for 24 hours."
        },
        {
          "donde": "Recomendación 1.8.6 [2010, modificada 2019]",
          "texto": "Treat women with severe hypertension who are in critical care during pregnancy or after birth immediately with 1 of the following: labetalol (oral or intravenous) · oral nifedipine · intravenous hydralazine."
        },
        {
          "donde": "Recomendación 1.8.5 [2010, modificada 2019]",
          "texto": "Do not use diazepam, phenytoin or other anticonvulsants as an alternative to magnesium sulfate in women with eclampsia."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 12,
      "topic": "Hemorragia posparto · Atonía uterina",
      "difficulty": "Nivel 3",
      "src": "nice_ip",
      "vignette": "Puérpera inmediata tras parto vaginal prolongado presenta <span class='hy'>sangrado vaginal abundante (&gt; 1000 mL), PA 82/50 mmHg, FC 122 lpm y útero blando por encima del ombligo</span>. ¿Causa más probable y primera medida farmacológica?",
      "options": [
        "Atonía uterina · Masaje uterino bimanual + oxitocina IV + ácido tranexámico",
        "Desgarro cervical · Sutura inmediata sin uterotónicos",
        "Acretismo placentario · Histerectomía inmediata sin reanimación",
        "Coagulopatía primaria · Transfusión aislada de plaquetas"
      ],
      "correct": 0,
      "whyCorrect": "Útero blando por encima del ombligo tras un parto prolongado: atonía uterina. NICE indica pedir ayuda, vaciar la vejiga, masaje uterino, uterotónicos y líquidos IV; además de los uterotónicos, ácido tranexámico 1 g IV en 10 minutos, que se repite a los 30 minutos o más si sigue sangrando.",
      "pearl": "El trabajo de parto prolongado, la oxitocina durante el parto, el parto instrumentado, la cesárea y la demora en la salida de la placenta son factores de riesgo de hemorragia posparto.",
      "trap": "Dejar el ácido tranexámico para después: NICE lo indica junto con los uterotónicos.",
      "cita": [
        {
          "donde": "Recomendación 1.10.33 [2014, modificada 2023]",
          "texto": "If a woman has a postpartum haemorrhage: call for help · give immediate clinical treatment: emptying of the bladder and uterine massage and uterotonic drugs and intravenous fluids and controlled cord traction if the placenta has not yet been delivered · continuously assess blood loss and the woman's condition, and identify the source of the bleeding · consider giving supplementary oxygen (starting at 15 L/minute to obtain a target oxygen saturation of 94% to 98%, using a non-rebreathing mask with a reservoir bag)"
        },
        {
          "donde": "Recomendación 1.10.35 [2023]",
          "texto": "In addition to uterotonic drugs, give tranexamic acid (1 g by intravenous injection over 10 minutes). Repeat if necessary after at least 30 minutes for managing continuing postpartum haemorrhage."
        },
        {
          "donde": "Recomendación 1.10.30 [2007, modificada 2023]",
          "texto": "Continue to assess risk factors for postpartum haemorrhage during labour … These can include: induction or augmentation of labour with oxytocin or prostaglandins · prolonged first or second stage of labour · sepsis · oxytocin use during labour · precipitate labour · birth with forceps or ventouse · caesarean birth · shoulder dystocia · delay in delivery of the placenta."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 18,
      "topic": "Ginecología · Embarazo Ectópico",
      "difficulty": "Nivel 3",
      "src": "nice_ect",
      "vignette": "Mujer de 27 años con amenorrea de 6 semanas, <span class='hy'>dolor en fosa ilíaca izquierda, sangrado vaginal escaso y PA 84/52 mmHg, FC 120 lpm</span>. β-hCG positiva, ecografía transvaginal: útero vacío y líquido libre abundante en fondo de saco de Douglas. ¿Conducta?",
      "options": [
        "Metotrexato 50 mg/m² IM en dosis única y control de β-hCG",
        "Repetir β-hCG en 48 horas para verificar si se duplica antes de decidir",
        "Legrado uterino obstétrico por aborto incompleto con sangrado activo",
        "Reanimación y cirugía urgente (laparoscopia o laparotomía)"
      ],
      "correct": 3,
      "whyCorrect": "Es un embarazo ectópico con dolor importante, inestabilidad hemodinámica y hemoperitoneo: se reanima y se opera de urgencia. NICE indica cirugía como primera línea cuando hay dolor significativo, masa anexial de 35 mm o más, latido fetal visible o hCG de 5.000 UI/L o más; el metotrexato es solo para el ectópico no roto, sin dolor importante.",
      "pearl": "Metotrexato (NICE): sin dolor importante, ectópico no roto, masa < 35 mm, sin latido, hCG < 1.500 UI/L, sin embarazo intrauterino y con seguimiento posible. Con hCG entre 1.500 y 4.999 UI/L se puede elegir metotrexato o cirugía.",
      "trap": "Indicar metotrexato o esperar 48 horas en una paciente hipotensa con hemoperitoneo.",
      "cita": [
        {
          "donde": "Recomendación 1.15.2 [2012]",
          "texto": "Offer surgery as a first-line treatment to women who are unable to return for follow-up after methotrexate treatment or who have any of the following: an ectopic pregnancy and significant pain · an ectopic pregnancy with an adnexal mass of 35 mm or larger · an ectopic pregnancy with a fetal heartbeat visible on an ultrasound scan · an ectopic pregnancy and a serum hCG level of 5,000 IU/litre or more."
        },
        {
          "donde": "Recomendación 1.15.1",
          "texto": "Offer systemic methotrexate to women who: have no significant pain and have an unruptured tubal ectopic pregnancy with an adnexal mass smaller than 35 mm with no visible heartbeat and have a serum hCG level less than 1,500 IU/litre and do not have an intrauterine pregnancy (as confirmed on an ultrasound scan) and are able to return for follow-up."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 25,
      "topic": "Hemorragia del 3er trimestre",
      "difficulty": "Nivel 2",
      "src": "rcog_pp",
      "vignette": "Gestante de 32 semanas con <span class='hy'>sangrado vaginal rojo rutilante, indoloro</span>, que empezó en reposo. Útero blando, sin contracciones, FCF 145 lpm. Signos vitales normales. ¿Qué NO debe hacerse hasta tener el diagnóstico por imagen?",
      "options": [
        "Ecografía transabdominal",
        "Tacto vaginal",
        "Monitoreo fetal continuo",
        "Canalizar una vía venosa y pedir hemograma"
      ],
      "correct": 1,
      "whyCorrect": "Un sangrado indoloro, rojo brillante y con útero relajado sugiere placenta previa. El tacto vaginal puede desencadenar una hemorragia masiva y está contraindicado hasta descartarla por ecografía.",
      "pearl": "Placenta previa: indolora, útero blando. DPPNI: dolorosa, útero hipertónico, sufrimiento fetal, a menudo con HTA o trauma.",
      "trap": "Hacer tacto vaginal de rutina ante cualquier sangrado del tercer trimestre.",
      "estado": "pendiente"
    },
    {
      "id": "gin-c01",
      "topic": "Obstetricia · Hemorragia de la segunda mitad",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 31 años, G3P2 con dos cesáreas previas, con 31 semanas de gestación. Consulta por <span class='hy'>sangrado vaginal rojo brillante, abundante e indoloro</span> que empezó en reposo. Está hemodinámicamente estable, el útero está blando y no tiene ecografías del tercer trimestre. ¿Cuál es la conducta inicial?",
      "options": [
        "Tacto vaginal para evaluar la dilatación cervical y el origen del sangrado",
        "Estabilizar y ecografía para ubicar la placenta, sin tacto vaginal",
        "Amniotomía para acelerar el parto y disminuir el sangrado",
        "Uterotónicos y observación ambulatoria con signos de alarma"
      ],
      "correct": 1,
      "whyCorrect": "El sangrado rojo, abundante e indoloro en la segunda mitad del embarazo es típico de placenta previa. Nunca se hace tacto vaginal sin haberla descartado, porque puede desencadenar una hemorragia masiva. La prioridad es estabilizar a la madre y luego la ecografía (transabdominal y, si se sospecha placenta o vasa previa, transvaginal, que es segura).",
      "pearl": "Placenta previa: sangrado rojo, indoloro, recurrente, útero blando. DPPNI: sangrado oscuro y escaso o ausente, con dolor, útero hipertónico y compromiso fetal.",
      "trap": "Hacer el tacto vaginal «para saber cuánto ha dilatado» antes de saber dónde está la placenta.",
      "cita": [
        {
          "donde": "Hemorragias de la segunda mitad del embarazo",
          "texto": "En ninguna circunstancia debe realizarse tacto vaginal sin haber excluido previamente la presencia de placenta previa, debido al riesgo significativo de desencadenar una hemorragia masiva"
        },
        {
          "donde": "Hemorragias de la segunda mitad del embarazo",
          "texto": "La manifestación clínica característica de la placenta previa es el sangrado vaginal de inicio súbito, con sangre roja brillante, generalmente abundante e indoloro"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c02",
      "topic": "Obstetricia · Oligohidramnios",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "tipo": "datos",
      "vignette": "Mujer de 27 años, primigestante, con 36 semanas de embarazo. En la ecografía de control el <span class='hy'>bolsillo vertical máximo mide 1,5 cm</span>; el crecimiento fetal es normal, no hay malformaciones, las membranas están íntegras y la monitoría es reactiva. Según la ACOG, ¿en qué momento se considera terminar este embarazo?",
      "options": [
        "Inmediatamente, por cesárea, por el riesgo de compresión del cordón",
        "A las 41 semanas si persiste el hallazgo en la ecografía",
        "Entre las 36 y las 37 + 6 semanas, por la vía que corresponda",
        "Solo si aparece restricción del crecimiento fetal en el seguimiento"
      ],
      "correct": 2,
      "whyCorrect": "Es un oligohidramnios aislado (idiopático): BVM menor de 2 cm sin malformaciones, restricción del crecimiento ni ruptura de membranas. Por recomendación de la ACOG se considera terminar el embarazo entre las 36 y las 37 + 6 semanas. El oligohidramnios no contraindica el parto vaginal, y en el trabajo de parto se necesita monitoreo fetal continuo por el riesgo de compresión del cordón.",
      "pearl": "Oligohidramnios: BVM < 2 cm o ILA < 5 cm. Se prefiere el BVM porque reduce intervenciones innecesarias sin aumentar los riesgos perinatales.",
      "trap": "Indicar cesárea por el oligohidramnios: la vía la definen las condiciones obstétricas habituales.",
      "cita": [
        {
          "donde": "Oligohidramnios en embarazo único, ¿cómo abordar este hallazgo?",
          "texto": "por recomendación ACOG se considera la terminación entre las 36 y las 37 + 6 semanas de embarazo"
        },
        {
          "donde": "Oligohidramnios en embarazo único, ¿cómo abordar este hallazgo?",
          "texto": "El oligohidramnios no contraindica el parto vaginal, y la vía de finalización del embarazo va a estar determinada por las condiciones obstétricas habituales."
        },
        {
          "donde": "Oligohidramnios en embarazo único, ¿cómo abordar este hallazgo?",
          "texto": "se diagnostica cuando el índice de líquido amniótico (ILA) es <5 cm o cuando el bolsillo vertical máximo (BVM) mide menos de 2 cm"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c03",
      "topic": "Ginecología · Hiperprolactinemia",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 30 años con esquizofrenia en tratamiento con risperidona desde hace 8 meses. Consulta por <span class='hy'>amenorrea de 4 meses y galactorrea</span>. Prueba de embarazo negativa, TSH y creatinina normales. Prolactina: <span class='hy'>85 µg/L</span>. ¿Cuál es la causa más probable de la hiperprolactinemia?",
      "options": [
        "Macroprolactinoma",
        "Hiperprolactinemia por el antipsicótico",
        "Síndrome de ovario poliquístico",
        "Efecto de tallo por un tumor no funcionante"
      ],
      "correct": 1,
      "whyCorrect": "Los antipsicóticos y los antidepresivos son las causas farmacológicas más comunes de hiperprolactinemia. Con valores menores de 200 µg/L se deben considerar causas distintas al prolactinoma (medicamentos, falla renal, enfermedad hepática, hipotiroidismo); la resonancia de silla turca se pide si esas causas se descartaron o si la prolactina supera 200 µg/L.",
      "pearl": "Prolactina > 200 µg/L o causas secundarias descartadas → resonancia de silla turca con contraste. Tratamiento del prolactinoma: agonistas dopaminérgicos (cabergolina).",
      "trap": "Pedir de entrada la resonancia por una prolactina de 85 en una paciente con antipsicótico: primero se buscan las causas secundarias.",
      "cita": [
        {
          "donde": "Hiperprolactinemia: diagnóstico y tratamiento actual",
          "texto": "Los más comunes son los antipsicóticos y los antidepresivos, y su mecanismo principal se debe a la reducción en la transmisión de la dopamina y el aumento de la transmisión de la serotonina"
        },
        {
          "donde": "Hiperprolactinemia: diagnóstico y tratamiento actual",
          "texto": "En aquellos pacientes con valores menores a 200 µg/L deberían considerarse otras causas diferentes a los prolactinomas, incluidos los medicamentos, falla renal, enfermedad hepática, hipotiroidismo, entre otros."
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c04",
      "topic": "Obstetricia · Pérdida gestacional recurrente",
      "difficulty": "Nivel 3",
      "src": "udea_gin26",
      "vignette": "Mujer de 33 años con <span class='hy'>tres pérdidas gestacionales</span> antes de la semana 10. El estudio muestra <span class='hy'>anticoagulante lúpico positivo en dos determinaciones separadas por 12 semanas</span>; útero, TSH y anticuerpos antiperoxidasa normales. Desea un nuevo embarazo. ¿Qué tratamiento le ofreces?",
      "options": [
        "Aspirina antes de la concepción y heparina profiláctica con embarazo viable",
        "Solo progesterona vaginal desde la concepción hasta la semana 12",
        "Prednisona más inmunoglobulina intravenosa durante el primer trimestre",
        "Ningún tratamiento: la aspirina y la heparina no sirven en la pérdida recurrente"
      ],
      "correct": 0,
      "whyCorrect": "Con síndrome antifosfolípido el tratamiento estándar es aspirina en dosis bajas (81 a 100 mg al día), idealmente desde antes de la concepción, más heparina (de bajo peso molecular o no fraccionada) en dosis profilácticas desde que se confirma un embarazo viable.",
      "pearl": "La pérdida gestacional recurrente se define desde 2 pérdidas. Aspirina y heparina NO mejoran los nacidos vivos en la pérdida recurrente inexplicada; sí se usan en el síndrome antifosfolípido.",
      "trap": "Extender la conclusión de los ensayos en pérdida inexplicada (ALIFE2) a la paciente con síndrome antifosfolípido, que sí se beneficia.",
      "cita": [
        {
          "donde": "Pérdida gestacional recurrente: un enfoque basado en la evidencia",
          "texto": "el tratamiento estándar consiste en la combinación de aspirina a dosis bajas (ej. 81 - 100 mg/día), iniciada idealmente antes de la concepción, y heparina (heparina de bajo peso molecular o no fraccionada) a dosis profilácticas, iniciada al confirmar un embarazo viable"
        },
        {
          "donde": "Pérdida gestacional recurrente: un enfoque basado en la evidencia",
          "texto": "ha demostrado de manera concluyente que el uso de aspirina, heparina o su combinación no mejora las tasas de nacidos vivos en mujeres con PGR inexplicada"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c05",
      "topic": "Obstetricia · Hipertensión posparto",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 25 años en el <span class='hy'>día 6 posparto</span> de un parto vaginal sin complicaciones; sus presiones fueron normales durante todo el embarazo. Consulta por cefalea intensa y visión borrosa. PA <span class='hy'>166/108 mmHg</span>, repetida 164/110 mmHg. Plaquetas 168.000, creatinina 0,7. ¿Cuál es el diagnóstico?",
      "options": [
        "Cefalea pospunción dural",
        "Migraña desencadenada por la falta de sueño",
        "Hipertensión crónica no diagnosticada",
        "Preeclampsia posparto con criterios de severidad"
      ],
      "correct": 3,
      "whyCorrect": "La preeclampsia posparto aparece entre las 48 horas y las 6 semanas después del parto, aun sin hipertensión en el embarazo (de novo). Una PA de 160/110 o más con síntomas neurológicos es de severidad: antihipertensivo de acción rápida en 30 a 60 minutos (labetalol IV, hidralazina IV o nifedipino oral) y sulfato de magnesio, obligatorio con síntomas neurológicos.",
      "pearl": "Hasta el 78 % de las eclampsias del posparto ocurren en mujeres sin hipertensión diagnosticada en el embarazo: toma la presión a toda puérpera que consulte, sea por lo que sea.",
      "trap": "Pensar que el riesgo terminó con el parto, o atribuir la cefalea a la anestesia o a la falta de sueño sin tomar la presión.",
      "cita": [
        {
          "donde": "Trastorno hipertensivo de aparición en el posparto",
          "texto": "una cifra de ≥160/110 mmHg, de aparición entre las 48 horas a 6 semanas posparto"
        },
        {
          "donde": "Trastorno hipertensivo de aparición en el posparto",
          "texto": "Sulfato de magnesio: su uso es obligatorio en preeclampsia grave con síntomas neurológicos."
        },
        {
          "donde": "Trastorno hipertensivo de aparición en el posparto",
          "texto": "hasta el 78 % de las mujeres que desarrollan eclampsia en este periodo no presentaron hipertensión diagnosticada durante la gestación"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c06",
      "topic": "Obstetricia · Infección intraamniótica",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 24 años, 39 semanas, en trabajo de parto con 6 cm de dilatación y membranas rotas hace 14 horas. Temperatura oral de <span class='hy'>38,4 °C, que persiste a los 30 minutos</span>, y <span class='hy'>frecuencia cardiaca fetal basal de 168 lpm</span>, sin desaceleraciones. ¿Cuál es la conducta?",
      "options": [
        "Cesárea inmediata por la infección intraamniótica",
        "Acetaminofén y vigilar; antibiótico solo si la fiebre llega a 39 °C",
        "Antibiótico IV y seguir el trabajo de parto; cesárea solo si hay otra indicación",
        "Esperar el parto y dar antibiótico solo al recién nacido si nace con fiebre o taquicardia"
      ],
      "correct": 2,
      "whyCorrect": "Hay fiebre materna (38 a 38,9 °C que persiste a los 30 minutos) con taquicardia fetal: infección intraamniótica sospechada. Se inicia antibiótico intraparto (un esquema es ampicilina con gentamicina). La infección intraamniótica aislada no justifica la cesárea: la vía se individualiza.",
      "pearl": "Infección intraamniótica sospechada: fiebre intraparto + leucocitosis, drenaje cervical purulento o taquicardia fetal. Confirmada: líquido amniótico positivo o histología placentaria.",
      "trap": "Hacer cesárea «para sacar al bebé del ambiente infectado»: no mejora los desenlaces y suma morbilidad materna.",
      "cita": [
        {
          "donde": "Infección e inflamación intraamniótica: enfoque diagnóstico y terapéutico",
          "texto": "La infección intraamniótica sospechada se basa en criterios clínicos e incluye fiebre materna intraparto asociada a uno o más de los siguientes hallazgos: leucocitosis materna, drenaje cervical purulento o taquicardia fetal."
        },
        {
          "donde": "Infección e inflamación intraamniótica: enfoque diagnóstico y terapéutico",
          "texto": "La infección intraamniótica (IAI) aislada no suele justificar la realización de una cesárea, por lo que la vía del parto debe individualizarse según el contexto clínico."
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c07",
      "topic": "Ginecología · Endometriosis",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 26 años con dismenorrea progresiva y dispareunia profunda de 3 años de evolución. No desea embarazo por ahora. La <span class='hy'>ecografía de mapeo para endometriosis</span> muestra un nódulo en el ligamento uterosacro izquierdo, sin endometriomas. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Laparoscopia diagnóstica para confirmar la enfermedad antes de tratar",
        "Análogos de GnRH por 6 meses como tratamiento inicial",
        "Anticonceptivos combinados continuos o progestinas, más analgésicos",
        "Histerectomía con salpingooforectomía bilateral para resolver el dolor"
      ],
      "correct": 2,
      "whyCorrect": "Hoy el diagnóstico se hace con la ecografía de mapeo (sensibilidad 93 %, especificidad 96 %) o con resonancia; no hace falta laparoscopia para empezar a tratar. En la paciente con dolor que no busca embarazo, la primera línea es la supresión hormonal continua con anticonceptivos combinados o solo progestinas; los análogos o antagonistas de GnRH son de segunda línea.",
      "pearl": "Endometriosis con dolor y deseo de embarazo o falla del manejo médico: considerar cirugía con preservación de la fertilidad y asesoría (criopreservación).",
      "trap": "Exigir una laparoscopia diagnóstica antes de tratar: retrasa el tratamiento, y la imagen de mapeo tiene alto rendimiento.",
      "cita": [
        {
          "donde": "Qué hay de nuevo en endometriosis",
          "texto": "Con ecografía de mapeo para endometriosis (sensibilidad de 93 % y especificidad del 96 %) o con resonancia magnética"
        },
        {
          "donde": "Qué hay de nuevo en endometriosis",
          "texto": "para las pacientes con endometriosis y dolor pélvico que no buscan un embarazo, la terapia de primera línea es la supresión hormonal con anticonceptivos combinados de estrógeno y progestina o solo progestinas, de forma continua. También está como segunda línea los análogos o antagonistas de la GnRH."
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "gin-c08",
      "topic": "Salud mental perinatal · Depresión posparto",
      "difficulty": "Nivel 2",
      "src": "udea_psiq26",
      "vignette": "Mujer de 27 años, 5 semanas después del parto. En el control dice que llora a diario, no disfruta nada y no puede cuidar a su bebé; la escala de Edimburgo sale alta y refiere <span class='hy'>pensamientos de hacerse daño</span>. ¿Qué haces?",
      "options": [
        "Tranquilizarla: es tristeza posparto y se resuelve sola",
        "Remitir a salud mental con enfoque perinatal",
        "Repetir la escala de Edimburgo en el próximo control",
        "Suspender la lactancia y empezar un antidepresivo sin control"
      ],
      "correct": 1,
      "whyCorrect": "Hay depresión con deterioro funcional e ideación autolesiva: se remite a salud mental o psiquiatría con enfoque perinatal. El tamizaje con el test de Whooley y la escala de Edimburgo hace parte de la ruta materno perinatal.",
      "pearl": "Remitir con enfoque perinatal: depresión o ansiedad moderada a grave, deterioro funcional, ideación autolesiva o suicida, antecedente psiquiátrico, sustancias o trauma reciente.",
      "trap": "Llamarlo «tristeza posparto» y esperar: con ideación autolesiva hay que actuar hoy.",
      "cita": [
        {
          "donde": "Comenzar bien la vida: salud mental perinatal y prevención de trastornos del neurodesarrollo",
          "texto": "Remitir a salud mental o psiquiatra con enfoque perinatal cuando la mujer presente depresión o ansiedad moderada grave o con deterioro funcional, ideación autolesiva o suicida, antecedente psiquiátrico relevante, uso de sustancias psicoactivas, trauma reciente."
        },
        {
          "donde": "Comenzar bien la vida: salud mental perinatal y prevención de trastornos del neurodesarrollo",
          "texto": "a partir del uso de herramientas como el test de Whooley y la escala de depresión de Edimburgo"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c09",
      "topic": "Obstetricia · Chagas en el embarazo",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 24 años, 22 semanas de gestación, de un municipio priorizado para Chagas. La tamización con prueba rápida y la confirmación son positivas. Está <span class='hy'>asintomática, con ECG normal</span>: es una infección en fase crónica. ¿Qué haces con el tratamiento antiparasitario?",
      "options": [
        "Benznidazol desde ya, para evitar la transmisión congénita",
        "Nifurtimox en el tercer trimestre, cuando ya terminó la organogénesis",
        "No tratar en el embarazo; tratar al terminar la lactancia",
        "No tratarla nunca, porque la fase crónica no tiene tratamiento"
      ],
      "correct": 2,
      "whyCorrect": "La infección crónica no justifica tratamiento durante el embarazo, por riesgos de teratogenicidad inciertos y efectos adversos. Se trata después de la lactancia exclusiva, y el recién nacido expuesto se sigue para confirmar o descartar la transmisión congénita, cuyo tratamiento precoz es altamente efectivo.",
      "pearl": "Chagas en la gestante: tratar en el embarazo solo la fase aguda o la reactivación con compromiso del SNC o miocarditis. Benznidazol 5 a 8 mg/kg/día cada 12 horas por 60 días.",
      "trap": "Tratarla en el embarazo «para proteger al bebé»: en la fase crónica no está indicado.",
      "cita": [
        {
          "donde": "Enfermedad de Chagas: ¿qué hacer?",
          "texto": "No justifica el tratamiento en infección en fase crónica durante el embarazo dado riesgos de teratogenicidad inciertos y efectos adversos."
        },
        {
          "donde": "Enfermedad de Chagas: ¿qué hacer?",
          "texto": "La tamización durante el embarazo en municipios priorizados es una oportunidad para la detección de esta infección y el tratamiento posterior a la lactancia exclusiva."
        },
        {
          "donde": "Enfermedad de Chagas: ¿qué hacer?",
          "texto": "En los recién nacidos expuestos a la enfermedad el seguimiento descartará o confirmará la transmisión congénita para la cual el tratamiento precoz es altamente efectivo."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c10",
      "topic": "Ginecología · Preservación de la fertilidad",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 29 años, sin hijos, a quien acaban de diagnosticar cáncer de mama. La quimioterapia empezará <span class='hy'>en dos semanas</span> y ella quiere tener hijos en el futuro. ¿Qué es lo indicado?",
      "options": [
        "Esperar a terminar la quimioterapia y valorar la reserva ovárica",
        "Solo análogos de la GnRH durante la quimioterapia para proteger los ovarios",
        "Aplazar la quimioterapia hasta completar dos ciclos de estimulación",
        "Remitir ya a reproducción: estimulación y vitrificar ovocitos"
      ],
      "correct": 3,
      "whyCorrect": "La preservación de la fertilidad se discute al momento del diagnóstico, y la ventana hasta el tratamiento oncológico define la estrategia. Con dos semanas, la estimulación en cualquier fase del ciclo (random-start) permite vitrificar ovocitos sin retrasar la quimioterapia. Los análogos de la GnRH son complementarios, no sustitutivos.",
      "pearl": "Ovocitos, embriones y tejido ovárico: métodos bien establecidos. Remitir no obliga a preservar; no preservar es válido si es informado y documentado.",
      "trap": "Confiar solo en los análogos de la GnRH, o retrasar la quimioterapia para preservar.",
      "cita": [
        {
          "donde": "Preservación de la fertilidad en mujeres con cáncer",
          "texto": "La preservación de la fertilidad se debe discutir temprano, idealmente al momento de hacer el diagnóstico de cáncer"
        },
        {
          "donde": "Preservación de la fertilidad en mujeres con cáncer",
          "texto": "La supresión ovárica con análogos de la GnRH puede ser complementaria, no sustitutiva"
        },
        {
          "donde": "Preservación de la fertilidad en mujeres con cáncer",
          "texto": "Dado que el inicio de quimioterapia estaba programado en dos semanas, se inició estimulación ovárica en esquema random-start"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c11",
      "topic": "Cardio-obstetricia · Vía del parto",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 30 años con una cardiopatía congénita corregida, en clase funcional I, con 36 semanas de un embarazo normal. Feto cefálico, sin indicaciones obstétricas de cesárea. ¿Cómo y cuándo planeas el parto?",
      "options": [
        "Cesárea programada a las 37 semanas por la cardiopatía",
        "Parto vaginal a término; cesárea solo por indicación obstétrica",
        "Inducir ya a las 36 semanas para evitar la sobrecarga del tercer trimestre",
        "Cesárea con anestesia general para evitar el pujo"
      ],
      "correct": 1,
      "whyCorrect": "Programar una cesárea solo porque hay cardiopatía es un error común. Se favorece el parto vaginal a término: menos pérdida de sangre y menos sepsis posquirúrgica. La cesárea se reserva para indicaciones obstétricas o situaciones cardíacas específicas, como una aorta de más de 45 mm en Marfan o una falla cardíaca aguda intratable.",
      "pearl": "La mayoría de las cardiópatas pueden tener un embarazo exitoso con estratificación del riesgo (mWHO, CARPREG II).",
      "trap": "Creer que la cardiopatía obliga a un parto prematuro y por cesárea.",
      "cita": [
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "La recomendación actual es favorecer el parto vaginal a término, ya que se asocia con menores pérdidas hemáticas y un menor riesgo de sepsis posquirúrgica."
        },
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "La cesárea queda reservada para indicaciones estrictamente obstétricas o situaciones cardíacas específicas (ej. diámetro aórtico >45 mm en Marfan o falla cardíaca aguda intratable)."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c12",
      "topic": "Cardio-obstetricia · Válvula mecánica",
      "difficulty": "Nivel 3",
      "src": "udea_gin26",
      "vignette": "Mujer de 33 años con válvula mitral mecánica, anticoagulada con <span class='hy'>warfarina 3 mg al día</span> con INR en meta, que tiene 7 semanas de embarazo. En su hospital no miden anti-Xa. ¿Qué haces con la anticoagulación?",
      "options": [
        "Cambiar a enoxaparina en dosis fijas sin control de niveles",
        "Suspender toda anticoagulación en el primer trimestre",
        "Cambiar a aspirina sola hasta la semana 13",
        "Seguir con warfarina, por su dosis menor de 5 mg al día"
      ],
      "correct": 3,
      "whyCorrect": "Los antagonistas de la vitamina K son los más eficaces para prevenir la trombosis valvular, cuya mortalidad supera el 80 %. Con una dosis de warfarina menor de 5 mg al día, el riesgo de embriopatía es bajo (menor de 3 %). La heparina de bajo peso molecular solo es alternativa con niveles de anti-Xa (0,8 a 1,2) y ajuste semanal; sin ese control está contraindicada.",
      "pearl": "Válvula mecánica en el embarazo: la decisión es individualizada y compartida, priorizando la seguridad valvular materna.",
      "trap": "Pasar a heparina en dosis fijas sin anti-Xa: se asocia a altas tasas de trombosis valvular.",
      "cita": [
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "si la dosis de warfarina necesaria para mantener la meta de anticoagulación en estas pacientes es <5 mg/ día, el riesgo de embriopatía es bajo (<3 %)."
        },
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "se contraindica el uso de HBPM si no se dispone de dichos niveles."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c13",
      "topic": "Cardio-obstetricia · Anticoncepción",
      "difficulty": "Nivel 1",
      "src": "udea_gin26",
      "vignette": "Mujer de 27 años con una cardiopatía con riesgo trombótico, en el posparto inmediato de un parto vaginal. No desea otro embarazo por ahora y pide un método. ¿Qué le ofreces?",
      "options": [
        "Anticonceptivo oral combinado desde la semana 3",
        "Parche combinado de estrógeno y progestina",
        "Anillo vaginal combinado mensual",
        "DIU de levonorgestrel desde el posparto"
      ],
      "correct": 3,
      "whyCorrect": "En cardio-obstetricia la planificación familiar es una intervención de seguridad. Se ofrecen métodos de larga duración, como el DIU de levonorgestrel, que evitan el riesgo trombótico de los estrógenos. La asesoría empieza desde el control prenatal e incluye la vasectomía de la pareja.",
      "pearl": "Cardiópata: LARC sin estrógenos (DIU de levonorgestrel, implante).",
      "trap": "Pensar que la anticoncepción es insegura o ineficaz en cardiópatas y no ofrecer nada.",
      "cita": [
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "Se deben ofrecer métodos de larga duración (LARC), como el dispositivo intrauterino (DIU) de levonorgestrel, que evitan los riesgos trombóticos de los estrógenos."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c14",
      "topic": "Cardio-obstetricia · Lactancia",
      "difficulty": "Nivel 1",
      "src": "udea_gin26",
      "vignette": "Puérpera de 31 años con cardiopatía, en tratamiento con metoprolol y warfarina. Quiere amamantar y pregunta si puede. ¿Qué le dices?",
      "options": [
        "Que suspenda la lactancia mientras tome warfarina",
        "Que puede amamantar sin cambiar los fármacos",
        "Que cambie la warfarina por heparina para poder amamantar",
        "Que amamante solo si suspende el metoprolol"
      ],
      "correct": 1,
      "whyCorrect": "La lactancia es posible y debe fomentarse por sus beneficios metabólicos. La mayoría de los betabloqueadores, antihipertensivos y anticoagulantes, incluidas la warfarina y la heparina, pasan muy poco a la leche y son seguros para el lactante.",
      "pearl": "El puerperio es el periodo de mayor inestabilidad hemodinámica en la cardiópata: la vigilancia no termina a las 6 semanas.",
      "trap": "Suspender la lactancia por los medicamentos cardíacos.",
      "cita": [
        {
          "donde": "Desmintiendo mitos en obstetricia: algunos aspectos que se deben saber sobre cardiopatía y embarazo",
          "texto": "La mayoría de los betabloqueadores, antihipertensivos y anticoagulantes (incluyendo la warfarina y la heparina) tienen un paso mínimo a la leche materna y son seguros para el lactante."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c15",
      "topic": "Obstetricia · Ecografía intraparto",
      "difficulty": "Nivel 3",
      "src": "udea_gin26",
      "vignette": "Primigestante en el segundo periodo del parto, con 2 horas de pujo sin descenso claro. La ecografía transperineal muestra un <span class='hy'>ángulo de progresión de 98°</span>. ¿Cómo lo interpretas?",
      "options": [
        "Alto riesgo de fracaso del parto vaginal",
        "Cabeza encajada: aplicar fórceps sin más estudios",
        "Progreso normal: darle una hora más de pujo",
        "El ángulo de progresión no sirve en el segundo periodo"
      ],
      "correct": 0,
      "whyCorrect": "El ángulo de progresión (entre el eje del pubis y la tangente al cráneo fetal) predice el resultado del parto. Un ángulo de 120° a 140° o más suele predecir un parto vaginal exitoso; uno menor de 105° se asocia a alto riesgo de fracaso y necesidad de cesárea. La estación 0 corresponde a unos 116°.",
      "pearl": "Ecografía intraparto: más objetiva que el tacto para la posición y la estación de la cabeza fetal.",
      "trap": "Instrumentar con una cabeza alta: con menos de 105° el riesgo de fracaso es alto.",
      "cita": [
        {
          "donde": "Ecografía intraparto: ¿nueva herramienta para evaluar el progreso del parto?",
          "texto": "Un AoP mayor a 120° - 140° suele predecir un parto vaginal exitoso, mientras que un Un AoP menor a 105° se asocia a un alto riesgo de fracaso en el parto y la necesidad de cesárea"
        },
        {
          "donde": "Ecografía intraparto: ¿nueva herramienta para evaluar el progreso del parto?",
          "texto": "la estación fetal de 0 corresponde a una AoP de 116°"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "gin-c16",
      "topic": "Obstetricia · Cardiopatías fetales",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Gestante de 28 años, sin antecedentes. En la ecografía de las 12 semanas la <span class='hy'>translucencia nucal mide 3,8 mm</span>; el cariotipo resulta normal. ¿Qué estudio cardíaco del feto indicas?",
      "options": [
        "Ninguno, porque el cariotipo es normal",
        "Ecocardiografía fetal especializada",
        "Solo la ecografía de detalle de las 20 semanas",
        "Ecocardiograma al recién nacido"
      ],
      "correct": 1,
      "whyCorrect": "Una translucencia nucal por encima del percentil 99 o de 3,5 mm siempre es indicación de ecocardiografía fetal: se asocia a trisomías 21 y 18 y a cardiopatías, aunque no haya anomalías cromosómicas.",
      "pearl": "Otras indicaciones de ecocardiografía fetal: anomalía en la vista de cuatro cámaras o en los tractos de salida, arritmias fetales, fiebre o ciertas infecciones maternas en el primer trimestre.",
      "trap": "Descartar el riesgo cardíaco porque el cariotipo salió normal.",
      "cita": [
        {
          "donde": "Cardiopatías fetales ¿cuándo sospecharlas?",
          "texto": "Translucencia nucal aumentada: en percentil > 99 o 3.5mm siempre se debe realizar ecocardiografía fetal ya que se asocia a trisomía 21, 18 y alteraciones cardíacas, aunque no presenten anomalías cromosómicas."
        }
      ],
      "verificado": "2026-11-21"
    }
  ],
  "fichas": [
    {
      "id": "hy3",
      "title": "Preeclampsia grave",
      "badge": "NICE NG133",
      "src": "nice_hta",
      "accent": "#f43f5e",
      "thresholds": [
        {
          "label": "Hipertensión grave",
          "val": "> 160/110 mmHg"
        },
        {
          "label": "Signos de gravedad",
          "val": "Cefalea, escotomas, epigastralgia, vómito, oliguria"
        },
        {
          "label": "Sulfato de Mg: impregnación",
          "val": "4 g IV en 5–15 min"
        },
        {
          "label": "Sulfato de Mg: mantenimiento",
          "val": "1 g/h por 24 h"
        },
        {
          "label": "Antihipertensivo agudo",
          "val": "Labetalol, nifedipino VO o hidralazina IV"
        },
        {
          "label": "Meta con tratamiento",
          "val": "≤ 135/85 mmHg"
        }
      ],
      "redFlag": "Cefalea intensa persistente, escotomas o epigastralgia con hipertensión grave: considerar sulfato de magnesio.",
      "trap": "Usar diazepam o fenitoína en lugar del sulfato de magnesio.",
      "cita": [
        {
          "donde": "Términos usados en la guía",
          "texto": "Severe hypertension Blood pressure over 160 mmHg systolic or over 110 mmHg diastolic."
        },
        {
          "donde": "Recomendación 1.8.3 [2010, modificada 2019]",
          "texto": "Consider the need for magnesium sulfate treatment, if 1 or more of the following features of severe pre-eclampsia is present: ongoing or recurring severe headaches · visual scotomata · nausea or vomiting · epigastric pain · oliguria and severe hypertension · progressive deterioration in laboratory blood tests (such as rising creatinine or liver transaminases, or falling platelet count)."
        },
        {
          "donde": "Recomendación 1.8.4 [2010, modificada 2019]",
          "texto": "Use the Collaborative Eclampsia Trial regimen for administration of magnesium sulfate: A loading dose of 4 g should be given intravenously over 5 to 15 minutes, followed by an infusion of 1 g/hour maintained for 24 hours."
        },
        {
          "donde": "Recomendación 1.8.6 [2010, modificada 2019]",
          "texto": "Treat women with severe hypertension who are in critical care during pregnancy or after birth immediately with 1 of the following: labetalol (oral or intravenous) · oral nifedipine · intravenous hydralazine."
        },
        {
          "donde": "Tabla de manejo de la hipertensión",
          "texto": "Target blood pressure once on antihypertensive treatment Aim for BP of 135/85 mmHg or less"
        },
        {
          "donde": "Recomendación 1.8.5 [2010, modificada 2019]",
          "texto": "Do not use diazepam, phenytoin or other anticonvulsants as an alternative to magnesium sulfate in women with eclampsia."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "gin-f01",
      "title": "Hemorragia posparto (NICE)",
      "badge": "NICE NG235",
      "src": "nice_ip",
      "thresholds": [
        {
          "label": "Medidas inmediatas",
          "val": "Pedir ayuda, vaciar la vejiga, masaje uterino"
        },
        {
          "label": "Fármacos",
          "val": "Uterotónicos + líquidos IV"
        },
        {
          "label": "Ácido tranexámico",
          "val": "1 g IV en 10 min; repetir a los ≥ 30 min si persiste"
        },
        {
          "label": "Oxígeno",
          "val": "15 L/min, meta SatO₂ 94–98 %"
        },
        {
          "label": "Factores de riesgo",
          "val": "Parto prolongado, oxitocina, instrumentado, cesárea, demora de la placenta"
        }
      ],
      "redFlag": "Sangrado que continúa pese a los uterotónicos: repetir el ácido tranexámico y escalar el tratamiento.",
      "trap": "Dejar el ácido tranexámico para después: va junto con los uterotónicos.",
      "cita": [
        {
          "donde": "Recomendación 1.10.33 [2014, modificada 2023]",
          "texto": "If a woman has a postpartum haemorrhage: call for help · give immediate clinical treatment: emptying of the bladder and uterine massage and uterotonic drugs and intravenous fluids and controlled cord traction if the placenta has not yet been delivered · continuously assess blood loss and the woman's condition, and identify the source of the bleeding · consider giving supplementary oxygen (starting at 15 L/minute to obtain a target oxygen saturation of 94% to 98%, using a non-rebreathing mask with a reservoir bag)"
        },
        {
          "donde": "Recomendación 1.10.35 [2023]",
          "texto": "In addition to uterotonic drugs, give tranexamic acid (1 g by intravenous injection over 10 minutes). Repeat if necessary after at least 30 minutes for managing continuing postpartum haemorrhage."
        },
        {
          "donde": "Recomendación 1.10.30 [2007, modificada 2023]",
          "texto": "Continue to assess risk factors for postpartum haemorrhage during labour … These can include: induction or augmentation of labour with oxytocin or prostaglandins · prolonged first or second stage of labour · sepsis · oxytocin use during labour · precipitate labour · birth with forceps or ventouse · caesarean birth · shoulder dystocia · delay in delivery of the placenta."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "gin-f02",
      "title": "Embarazo ectópico: metotrexato o cirugía",
      "badge": "NICE NG126",
      "src": "nice_ect",
      "thresholds": [
        {
          "label": "Metotrexato",
          "val": "hCG < 1.500 UI/L, masa < 35 mm, sin latido, sin dolor importante"
        },
        {
          "label": "Metotrexato o cirugía",
          "val": "hCG 1.500–4.999 UI/L con los mismos criterios"
        },
        {
          "label": "Cirugía de primera línea",
          "val": "Dolor importante, masa ≥ 35 mm, latido visible o hCG ≥ 5.000"
        },
        {
          "label": "Requisito del metotrexato",
          "val": "Poder volver al seguimiento"
        }
      ],
      "redFlag": "Dolor importante con inestabilidad hemodinámica: ectópico roto, cirugía urgente.",
      "trap": "Indicar metotrexato con latido fetal visible o con hCG de 5.000 UI/L o más.",
      "cita": [
        {
          "donde": "Recomendación 1.15.1",
          "texto": "Offer systemic methotrexate to women who: have no significant pain and have an unruptured tubal ectopic pregnancy with an adnexal mass smaller than 35 mm with no visible heartbeat and have a serum hCG level less than 1,500 IU/litre and do not have an intrauterine pregnancy (as confirmed on an ultrasound scan) and are able to return for follow-up."
        },
        {
          "donde": "Recomendación 1.15.3",
          "texto": "Offer the choice of either methotrexate or surgical management to women with an ectopic pregnancy who have a serum hCG level of at least 1,500 IU/litre and less than 5,000 IU/litre, who are able to return for follow‑up and who meet all of the following criteria: no significant pain · an unruptured ectopic pregnancy with an adnexal mass smaller than 35 mm with no visible heartbeat · no intrauterine pregnancy (as confirmed on an ultrasound scan)."
        },
        {
          "donde": "Recomendación 1.15.2 [2012]",
          "texto": "Offer surgery as a first-line treatment to women who are unable to return for follow-up after methotrexate treatment or who have any of the following: an ectopic pregnancy and significant pain · an ectopic pregnancy with an adnexal mass of 35 mm or larger · an ectopic pregnancy with a fetal heartbeat visible on an ultrasound scan · an ectopic pregnancy and a serum hCG level of 5,000 IU/litre or more."
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "tarjetas": [
    {
      "id": 36,
      "src": "williams",
      "front": "Regla de Naegele",
      "back": "FUM + 7 días − 3 meses (+ 1 año)",
      "estado": "pendiente"
    },
    {
      "id": 37,
      "src": "nice_hta",
      "front": "Sulfato de magnesio en preeclampsia grave: dosis",
      "back": "4 g IV en 5–15 min, luego 1 g/h por 24 h (régimen del Collaborative Eclampsia Trial)",
      "cita": [
        {
          "donde": "Recomendación 1.8.4 [2010, modificada 2019]",
          "texto": "Use the Collaborative Eclampsia Trial regimen for administration of magnesium sulfate: A loading dose of 4 g should be given intravenously over 5 to 15 minutes, followed by an infusion of 1 g/hour maintained for 24 hours."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 38,
      "src": "acog_htn",
      "front": "Antídoto de la toxicidad por sulfato de Mg",
      "back": "Gluconato de calcio 10 %",
      "estado": "pendiente"
    },
    {
      "id": 39,
      "src": "nice_ppt",
      "front": "Corticoides antenatales para maduración pulmonar: ¿cuándo? (NICE)",
      "back": "Ofrecer entre 24+0 y 33+6 semanas; considerar entre 34+0 y 35+6 semanas (trabajo de parto pretérmino, parto pretérmino planeado o RPM pretérmino)",
      "cita": [
        {
          "donde": "Recomendaciones 1.9.2 y 1.9.3",
          "texto": "Offer maternal corticosteroids to women between 24+0 and 33+6 weeks of pregnancy who are in suspected, diagnosed or established preterm labour, are having a planned preterm birth or have P‑PROM. · Consider maternal corticosteroids for women between 34+0 and 35+6 weeks of pregnancy who are in suspected, diagnosed or established preterm labour, are having a planned preterm birth or have P‑PROM."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 40,
      "src": "rcog_pp",
      "front": "Placenta previa vs DPPNI",
      "back": "Previa: indolora, útero blando · DPPNI: dolor + hipertonía",
      "estado": "pendiente"
    },
    {
      "id": 41,
      "src": "who_hpp",
      "front": "Causa más frecuente de hemorragia posparto",
      "back": "Atonía uterina (las 4 T: Tono, Trauma, Tejido, Trombina)",
      "estado": "pendiente"
    },
    {
      "id": 51,
      "src": "who_hpp",
      "front": "Diagnóstico de hemorragia posparto (OMS/FIGO 2025)",
      "back": "Pérdida ≥ 500 mL, o ≥ 300 mL con signos vitales anormales; medir con bolsa colectora calibrada",
      "estado": "pendiente"
    }
  ],
  "revision": "verificada"
});
