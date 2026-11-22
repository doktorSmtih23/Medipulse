// Ginecología: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: gin-c01 (casos), gin-f01 (fichas), gin-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Ginecología",
  "prefijo": "gin",
  "paquete": "starter",
  "actualizado": "2026-11-22",
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
    },
    {
      "id": "gin-c17",
      "topic": "Ginecología · Mola hidatiforme",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 24 años con sangrado en el primer trimestre. La ecografía muestra un patrón en <span class='hy'>«tormenta de nieve» sin embrión</span> y la β-hCG está muy por encima de lo esperado para la edad gestacional. Desea tener hijos. ¿Cómo se evacúa el útero?",
      "options": [
        "Inducción con misoprostol y luego legrado",
        "Aspiración por succión",
        "Histerectomía abdominal total",
        "Metotrexato antes de cualquier evacuación"
      ],
      "correct": 1,
      "whyCorrect": "Es una mola completa. Se evacúa preferiblemente por aspiración por succión. Las prostaglandinas se desaconsejan porque aumentan la hemorragia y, al parecer, la neoplasia trofoblástica posmolar. La histerectomía se reserva para mayores de 40 años o sin deseo reproductivo.",
      "pearl": "Después de evacuar: β-hCG cada 1 a 2 semanas hasta que sea indetectable, y anticoncepción confiable (no DIU) durante la vigilancia.",
      "trap": "Usar misoprostol para «ablandar el cuello» antes de evacuar una mola.",
      "cita": [
        {
          "donde": "Enfermedad Trofoblástica Gestacional",
          "texto": "El tratamiento de la mola hidatiforme se basa en la evacuación uterina, preferiblemente mediante aspiración por succión (legrado por aspiración) (1, 5)."
        },
        {
          "donde": "Enfermedad Trofoblástica Gestacional",
          "texto": "El uso de prostaglandinas está desaconsejado, ya que se asocia con mayor riesgo de hemorragia y parece haber mayor incidencia de neoplasia trofoblástica gestacional (NTG) pos molar (2, 5)."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c18",
      "topic": "Ginecología · Neoplasia trofoblástica posmolar",
      "difficulty": "Nivel 3",
      "src": "udea_gin26",
      "vignette": "Mujer de 30 años a quien se evacuó una mola completa hace 5 semanas. Controles de β-hCG en los días 1, 7, 14 y 21: <span class='hy'>1.850, 1.820, 1.870 y 1.840 UI/L</span>. Radiografía de tórax normal. ¿Qué tiene?",
      "options": [
        "Evolución normal: seguir midiendo cada mes",
        "Un nuevo embarazo intrauterino",
        "Neoplasia trofoblástica por meseta de β-hCG",
        "Restos molares: repetir el legrado de rutina"
      ],
      "correct": 2,
      "whyCorrect": "Cuatro valores consecutivos (días 1, 7, 14 y 21) que varían 10 % o menos cumplen el criterio FIGO de meseta: es una neoplasia trofoblástica gestacional posmolar.",
      "pearl": "Criterios FIGO: meseta (4 valores, variación ≤10 %), aumento ≥10 % en 3 valores (días 1, 7 y 14), β-hCG detectable más de 6 meses después, o histología de coriocarcinoma.",
      "trap": "Esperar a que «baje sola»: una β-hCG que no desciende tras la evacuación ya es neoplasia.",
      "cita": [
        {
          "donde": "Enfermedad Trofoblástica Gestacional",
          "texto": "Meseta de β-hCG Al menos cuatro valores consecutivos medidos en los días 1, 7, 14 y 21, con una variación ≤10%. Aumento de β-hCG Incremento ≥10% en tres valores consecutivos medidos en los días 1, 7 y 14."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c19",
      "topic": "Obstetricia · Hemorragia posparto: definición",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Puérpera de 2 horas tras parto vaginal. En la bolsa colectora calibrada se han medido <span class='hy'>350 mL</span>. FC 108 lpm, PA 98/58 mmHg. ¿Cómo la clasificas?",
      "options": [
        "No es hemorragia porque no llega a 500 mL medidos",
        "Hemorragia posparto, por 300 mL o más con signos anormales",
        "Solo cuenta como hemorragia si supera los 1.000 mL",
        "Sangrado normal del puerperio: revalorar a las 6 horas"
      ],
      "correct": 1,
      "whyCorrect": "La OMS define hemorragia posparto como 300 mL o más medidos con cualquier signo hemodinámico anormal (pulso >100, índice de choque >1, PAS <100 o PAD <60), o 500 mL o más, lo que ocurra primero en las primeras 24 horas.",
      "pearl": "La vigilancia es especialmente estrecha en las 2 primeras horas tras el parto.",
      "trap": "Esperar a los 500 mL cuando ya hay taquicardia o hipotensión.",
      "cita": [
        {
          "donde": "Puntos clave en el manejo de la hemorragia obstétrica grave",
          "texto": "pérdida de sanguínea medida objetivamente de ≥300 mL sumado a cualquier signo hemodinámico anormal (pulso >100 lpm, índice de choque >1, presión arterial sistólica <100 mmHg o presión arterial diastólica <60 mmHg), o sangrado medido objetivamente de ≥500 mL, lo que ocurra primero en las 24 horas posteriores al nacimiento"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c20",
      "topic": "Obstetricia · Hemorragia grave: fibrinógeno",
      "difficulty": "Nivel 3",
      "src": "udea_gin26",
      "vignette": "Puérpera con hemorragia posparto grave en reanimación. Recibió oxitocina y ácido tranexámico. El laboratorio reporta <span class='hy'>fibrinógeno de 140 mg/dL</span>. ¿Qué es lo más adecuado para corregirlo con menos volumen?",
      "options": [
        "Más cristaloides hasta normalizar la presión",
        "Plasma fresco congelado como única fuente de fibrinógeno",
        "Crioprecipitado o concentrado de fibrinógeno",
        "Esperar el control de 6 horas"
      ],
      "correct": 2,
      "whyCorrect": "El fibrinógeno por debajo de 200 mg/dL es el punto crítico para transfundir. El crioprecipitado (15 g/L) y el concentrado (20 g/L) lo reponen con mucho menos volumen que el plasma (2,5 g/L). Además, más líquidos diluyen el fibrinógeno.",
      "pearl": "Ácido tranexámico: 1 g en 10 minutos; si sigue sangrando a los 30 minutos, una segunda dosis de 1 g.",
      "trap": "Reanimar con grandes volúmenes de cristaloides: entre más volumen, menor fibrinógeno.",
      "cita": [
        {
          "donde": "Puntos clave en el manejo de la hemorragia obstétrica grave",
          "texto": "En todos estos casos, el punto de corte crítico indicativo de transfusión es 200 mg/dl. El fibrinógeno puede ser corregido de tres formas que tienen concentraciones distintas: con plasma, que tiene 2,5 g/l; crioprecipitado, que tiene 15 g/l; o también con concentrado de fibrinógeno, que trae 20 g/l."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c21",
      "topic": "Ginecología · Masa anexial",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 63 años, posmenopáusica, con distensión abdominal. La ecografía muestra una <span class='hy'>masa anexial multilocular sólida irregular de 12 cm, con ascitis</span>. ¿Qué haces?",
      "options": [
        "Repetir ecografía en 3 meses",
        "Remitir a ginecología oncológica",
        "Laparoscopia de quistectomía en su hospital",
        "Anticonceptivos orales y nuevo control"
      ],
      "correct": 1,
      "whyCorrect": "Cumple reglas M de IOTA (tumor multilocular sólido irregular de 100 mm o más y ascitis): alto riesgo de malignidad. Las lesiones de alto riesgo, O-RADS 4 o 5, deben operarse por ginecología oncológica para una citorreducción correcta.",
      "pearl": "Índice de riesgo de malignidad (IRM) de 200 o más: punto de corte para remitir.",
      "trap": "Operarla en un centro sin ginecología oncológica o hacer seguimiento expectante.",
      "cita": [
        {
          "donde": "Abordaje de la masa anexial: ¿cuándo observar, cuándo operar?",
          "texto": "M1 Tumor sólido irregular M2 Presencia de ascitis M3 Al menos 4 estructuras papilares M4 Tumor multilocular sólido irregular (diámetro mayor ≥100 mm)"
        },
        {
          "donde": "Abordaje de la masa anexial: ¿cuándo observar, cuándo operar?",
          "texto": "Deben ser operadas específicamente por ginecología oncológica todas las pacientes con lesiones de alto riesgo o quienes tengan evidencia clínica de enfermedad avanzada"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c22",
      "topic": "Anticoncepción · Lactancia y acetato de medroxiprogesterona",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 26 años, lactancia exclusiva, a las <span class='hy'>3 semanas posparto</span>. Pide la inyección trimestral de acetato de medroxiprogesterona. Según los criterios de la OMS 2025, ¿qué categoría tiene?",
      "options": [
        "Categoría 4: contraindicada",
        "Categoría 3: solo si no hay otra opción",
        "Categoría 2: se puede usar",
        "Categoría 1 desde el primer día"
      ],
      "correct": 2,
      "whyCorrect": "La OMS 2025 pasó el acetato de medroxiprogesterona de depósito en lactantes del posparto de categoría 3 a 2: la evidencia no confirmó que afecte la lactogénesis ni al recién nacido.",
      "pearl": "En ese mismo periodo, los métodos combinados con estrógeno siguen en categoría 4; después de las 6 semanas, los de solo progestágeno son categoría 1.",
      "trap": "Aplicar la clasificación anterior (categoría 3) de la OMS.",
      "cita": [
        {
          "donde": "Criterios médicos de elegibilidad OMS 2025, ¿qué cambió?",
          "texto": "el cambio en la clasificación del acetato de medroxiprogesterona de depósito (inyección trimestral) de categoría 3 a categoría 2."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c23",
      "topic": "Anticoncepción · Migraña con aura",
      "difficulty": "Nivel 1",
      "src": "udea_gin26",
      "vignette": "Mujer de 29 años con <span class='hy'>migraña con aura</span>, en manejo por neurología, que usa anticonceptivos orales combinados. ¿Qué le recomiendas?",
      "options": [
        "Seguir con la píldora si el aura dura menos de una hora",
        "Pasar a un anillo vaginal combinado, que tiene menos estrógeno",
        "Cambiar a DIU de cobre o solo progestágeno",
        "Bajar la dosis de etinilestradiol"
      ],
      "correct": 2,
      "whyCorrect": "En migraña con aura, todos los métodos hormonales combinados (píldora, anillo, parche) son categoría 4 por el riesgo de ataque cerebrovascular del estrógeno. Se cambia a un método sin estrógeno.",
      "pearl": "Con trombosis venosa previa en anticoagulación: los de solo progestágeno son categoría 2 y los combinados, categoría 4.",
      "trap": "Creer que el anillo o el parche evitan el riesgo: también llevan estrógeno.",
      "cita": [
        {
          "donde": "Criterios médicos de elegibilidad OMS 2025, ¿qué cambió?",
          "texto": "En mujeres con migraña con aura, los métodos hormonales combinados se clasifican como categoría 4 debido al aumento significativo del riesgo de accidente cerebrovascular asociado al estrógeno."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c24",
      "topic": "Obstetricia · Lesiones ocultas del suelo pélvico",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Primípara de 32 años, 8 semanas después de un <span class='hy'>parto con fórceps</span>, siente «bulto y peso en la vagina». La episiotomía cicatrizó bien. Al tacto, el puborrectal no se ancla en el pubis derecho y el <span class='hy'>hiato mide 5 cm</span>. ¿Qué sigue?",
      "options": [
        "Tranquilizar: el periné está íntegro",
        "Ecografía 3D/4D transperineal",
        "Colporrafia posterior inmediata",
        "Pesario y control en un año"
      ],
      "correct": 1,
      "whyCorrect": "Sospecha de avulsión del elevador del ano, una lesión oculta bajo un periné que se ve sano. Con hiato mayor de 4 cm o falta de contracción, se hace ecografía 3D/4D transperineal, el patrón de oro, y luego fisioterapia de suelo pélvico.",
      "pearl": "Las lesiones ocultas afectan a 1 de cada 3 mujeres tras su primer parto vaginal; fórceps, segunda fase prolongada y feto de más de 4.000 g aumentan el riesgo.",
      "trap": "Descartar lesión porque la episiotomía y el esfínter se ven bien.",
      "cita": [
        {
          "donde": "Lesiones ocultas del suelo pélvico en el posparto: el trauma invisible",
          "texto": "Ecografía 3D/4D transperineal se considera en la actualidad, el \"Gold Standard\" para el tamizaje de lesiones ocultas postparto."
        },
        {
          "donde": "Lesiones ocultas del suelo pélvico en el posparto: el trauma invisible",
          "texto": "¿se observa un hiato >4 cm o falta de contracción voluntaria? - SÍ: realizar Ecografía 3D/4D de suelo pélvico."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c25",
      "topic": "Ginecología · Tamización de mama en alto riesgo",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Mujer de 32 años cuya <span class='hy'>hermana tuvo cáncer de mama a los 39 años</span>. Sin estudio genético. ¿Desde cuándo inicia la mamografía?",
      "options": [
        "A los 50 años, igual que la población general sin riesgo",
        "A los 40 años, cuando haya pasado la edad del caso índice",
        "Ya: 10 años antes del caso índice, no antes de los 30",
        "Solo con ecografía si aparece un nódulo palpable o dolor"
      ],
      "correct": 2,
      "whyCorrect": "En parientes en primer grado se inicia la mamografía 10 años antes de la edad del caso índice (aquí 29), pero no antes de los 30: le corresponde ya. En alto riesgo se complementa con resonancia contrastada anual.",
      "pearl": "También es alto riesgo la radiación a la pared torácica entre los 10 y 30 años (p. ej., linfoma de Hodgkin).",
      "trap": "Esperar a los 40 o 50 años por no tener mutación demostrada.",
      "cita": [
        {
          "donde": "Tamización para cáncer de mama en grupos especiales",
          "texto": "Tradicionalmente se ha recomendado que las parientes inicien tamización mamográfica 10 años antes de la edad de presentación en el caso índice, pero no antes de los 30 años."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c26",
      "topic": "Obstetricia · Anticoagulación periparto",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Gestante con trombosis venosa profunda en este embarazo, con <span class='hy'>enoxaparina en dosis terapéutica</span>. Tiene cesárea programada a las 39 semanas. ¿Cuándo aplica la última dosis?",
      "options": [
        "La mañana de la cesárea",
        "24 horas antes",
        "12 horas antes",
        "Una semana antes, sin puente"
      ],
      "correct": 1,
      "whyCorrect": "Con HBPM en dosis intermedias o terapéuticas, la última dosis es 24 horas antes del procedimiento; con dosis bajas (profilácticas), 12 horas antes.",
      "pearl": "Válvula mecánica con warfarina: pasar a heparina al menos 2 semanas antes del parto y a HNF IV 36 horas antes; suspenderla 4 a 6 horas antes.",
      "trap": "Usar el intervalo de la dosis profiláctica (12 horas) con dosis terapéuticas.",
      "cita": [
        {
          "donde": "Anticoagulación periparto: ¿cuándo suspender, ¿cuándo actuar?",
          "texto": "las pacientes con HBPM en dosis bajas toman su última dosis 12 horas antes del procedimiento; las pacientes con HBPM en dosis intermedias o terapéuticas toman su última dosis 24 horas antes del procedimiento."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "gin-c27",
      "topic": "Ginecología · Terapia hormonal masculinizante",
      "difficulty": "Nivel 2",
      "src": "udea_gin26",
      "vignette": "Hombre transgénero de 27 años, con testosterona hace 2 años. En el control, <span class='hy'>hematocrito de 54 %</span>. ¿Qué efecto adverso es y qué riesgo implica?",
      "options": [
        "Anemia dilucional sin importancia clínica en este momento",
        "Eritrocitosis con riesgo trombótico",
        "Déficit de hierro por menstruación",
        "Hepatotoxicidad por testosterona que obliga a suspenderla"
      ],
      "correct": 1,
      "whyCorrect": "La eritrocitosis (hematocrito mayor de 50 %) es quizá el efecto adverso más frecuente de la testosterona en hombres transgénero y aumenta el riesgo de eventos trombóticos y cardiovasculares.",
      "pearl": "En la terapia feminizante el principal riesgo es tromboembólico; se prefiere estradiol (oral o transdérmico) en lugar del etinilestradiol.",
      "trap": "Ignorar el hematocrito por creer que un valor «masculino» es normal.",
      "cita": [
        {
          "donde": "Terapia Hormonal en la Población Transgénero",
          "texto": "La eritrocitosis (hematocrito >50 %) es tal vez el efecto secundario más frecuente en los hombres transgénero y confieren un mayor riesgo de eventos trombóticos o cardiovasculares."
        }
      ],
      "verificado": "2026-11-22"
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
