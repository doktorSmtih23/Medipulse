// Ginecología: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: gin-c01 (casos), gin-f01 (fichas), gin-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Ginecología",
  "prefijo": "gin",
  "paquete": "starter",
  "actualizado": "2026-11-15",
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
        "Metotrexato 50 mg/m² IM en dosis única",
        "Repetir β-hCG en 48 horas para verificar duplicación",
        "Legrado uterino obstétrico por aborto incompleto",
        "Reanimación con cristaloides + laparoscopia (o laparotomía) quirúrgica urgente"
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
