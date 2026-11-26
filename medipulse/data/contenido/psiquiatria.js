// Psiquiatría: contenido incluido en la app · paquete "psiquiatria" (módulo aparte; aún no entra al diagnóstico).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Psiquiatría",
  "prefijo": "psq",
  "paquete": "psiquiatria",
  "actualizado": "2026-11-26",
  "casos": [
    {
      "id": "psq-c01",
      "topic": "Estrés postraumático · Tratamiento de primera línea",
      "difficulty": "basica",
      "src": "nice_tept",
      "vignette": "Mujer de 29 años que fue asaltada con arma hace <span class='hy'>6 semanas</span>. Tiene recuerdos intrusivos, pesadillas, evita salir sola y está hipervigilante. ¿Qué le ofreces?",
      "options": [
        "Una sesión de debriefing psicológico",
        "Benzodiacepina en la noche por 3 meses",
        "Esperar 6 meses: suele resolverse solo",
        "TCC individual centrada en el trauma"
      ],
      "correct": 3,
      "whyCorrect": "A los adultos con TEPT o síntomas clínicamente importantes que consultan más de 1 mes después del trauma se les ofrece una intervención individual de terapia cognitivo-conductual centrada en el trauma.",
      "pearl": "Más de 3 meses tras un trauma no relacionado con combate también se ofrece EMDR.",
      "trap": "Ofrecer debriefing o benzodiacepinas.",
      "cita": [
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.16",
          "texto": "Offer an individual trauma-focused CBT intervention to adults with a diagnosis of PTSD or clinically important symptoms of PTSD who have presented more than 1 month after a traumatic event."
        },
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.19",
          "texto": "Offer EMDR to adults with a diagnosis of PTSD or clinically important symptoms of PTSD who have presented more than 3 months after a non-combat-related trauma."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: NICE indica no ofrecer debriefing para prevenir ni tratar el TEPT.",
        "No: no es lo que NICE ofrece; el tratamiento de primera línea es la TCC centrada en el trauma.",
        "No: con síntomas más de 1 mes después del trauma se ofrece tratamiento, no espera.",
        "Correcta: TCC individual centrada en el trauma, por presentarse más de 1 mes después."
      ]
    },
    {
      "id": "psq-c02",
      "topic": "Estrés postraumático · Debriefing tras un desastre",
      "difficulty": "residencia",
      "src": "nice_tept",
      "vignette": "Tras una avalancha en un municipio, la brigada de salud propone hacer <span class='hy'>debriefing psicológico a todos los sobrevivientes</span> en la primera semana para prevenir el estrés postraumático. ¿Qué opinas?",
      "options": [
        "No: no se ofrece para prevenir ni para tratar el TEPT",
        "Sí: si se hace en las primeras 72 horas lo previene",
        "Sí, sumando una benzodiacepina a quien no duerma",
        "Solo a quienes tengan síntomas intensos de ansiedad"
      ],
      "correct": 0,
      "whyCorrect": "NICE recomienda no ofrecer debriefing centrado en lo psicológico para prevenir ni para tratar el TEPT, y no ofrecer fármacos, incluidas las benzodiacepinas, para prevenirlo.",
      "pearl": "En niños y adolescentes de 7 a 17 años expuestos a un trauma colectivo en el último mes se puede considerar una TCC grupal centrada en el trauma.",
      "trap": "Creer que el debriefing temprano previene el TEPT.",
      "cita": [
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.5",
          "texto": "Do not offer psychologically-focused debriefing for the prevention or treatment of PTSD."
        },
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.24",
          "texto": "Do not offer drug treatments, including benzodiazepines, to prevent PTSD in adults."
        },
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.7",
          "texto": "Consider a group trauma-focused CBT intervention for children and young people aged 7 to 17 years if there has been an event within the last month leading to large‑scale shared trauma."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "Correcta: NICE indica no ofrecer debriefing para prevenir ni tratar el TEPT.",
        "No: el debriefing no se ofrece para prevenir el TEPT, sea cual sea el momento.",
        "No: tampoco se ofrecen fármacos, incluidas las benzodiacepinas, para prevenir el TEPT.",
        "No: la recomendación de no ofrecer debriefing incluye el tratamiento, no solo la prevención."
      ]
    },
    {
      "id": "psq-c03",
      "topic": "Estrés postraumático · Si prefiere fármacos",
      "difficulty": "residencia",
      "src": "nice_tept",
      "vignette": "Hombre de 40 años con TEPT desde hace 5 meses tras un accidente de tránsito. Conoce las psicoterapias, pero <span class='hy'>prefiere un tratamiento farmacológico</span>. ¿Qué consideras?",
      "options": [
        "Alprazolam en dosis bajas por tiempo indefinido",
        "Sertralina o venlafaxina, con revisión periódica",
        "Haloperidol en la noche para las pesadillas",
        "Ningún fármaco: el TEPT solo se trata con psicoterapia"
      ],
      "correct": 1,
      "whyCorrect": "Si el adulto con TEPT prefiere un tratamiento farmacológico, NICE indica considerar venlafaxina o un ISRS, como la sertralina, y revisar el tratamiento con regularidad.",
      "pearl": "Las benzodiacepinas no se ofrecen para prevenir el TEPT.",
      "trap": "Usar benzodiacepinas o negar el tratamiento farmacológico a quien lo prefiere.",
      "cita": [
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.25",
          "texto": "Consider venlafaxine or a selective serotonin reuptake inhibitor (SSRI), such as sertraline, for adults with a diagnosis of PTSD if the person has a preference for drug treatment. Review this treatment regularly."
        },
        {
          "donde": "NICE NG116 Post-traumatic stress disorder (2018), recomendación 1.6.24",
          "texto": "Do not offer drug treatments, including benzodiazepines, to prevent PTSD in adults."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: el fármaco que NICE considera es venlafaxina o un ISRS como la sertralina, no una benzodiacepina.",
        "Correcta: venlafaxina o un ISRS como la sertralina, revisando el tratamiento con regularidad.",
        "No: no es lo que indica NICE; la opción es venlafaxina o un ISRS.",
        "No: si la persona prefiere fármacos, NICE indica considerar venlafaxina o un ISRS."
      ]
    },
    {
      "id": "psq-c04",
      "topic": "Psicosis · Primer episodio",
      "difficulty": "residencia",
      "src": "nice_psicosis",
      "vignette": "Joven de 22 años con <span class='hy'>primer episodio psicótico</span>: alucinaciones auditivas e ideas delirantes de persecución desde hace 2 meses, sin consumo de sustancias ni causa orgánica. Vive con sus padres. ¿Qué tratamiento le ofreces?",
      "options": [
        "Solo terapia cognitivo-conductual hasta ver si cede",
        "Antipsicótico de depósito intramuscular desde el inicio",
        "Antipsicótico oral con intervención familiar y TCC",
        "Benzodiacepina por 4 semanas y luego reevaluar"
      ],
      "correct": 2,
      "whyCorrect": "En el primer episodio psicótico NICE indica ofrecer un antipsicótico oral junto con intervenciones psicológicas: intervención familiar y TCC individual. Las intervenciones psicológicas son más efectivas con el antipsicótico.",
      "pearl": "En atención primaria no se inicia el antipsicótico ante un primer cuadro psicótico sin consultar con un psiquiatra.",
      "trap": "Ofrecer solo psicoterapia como si fuera igual de efectiva, o empezar con depósito.",
      "cita": [
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.4.1",
          "texto": "For people with first episode psychosis offer: oral antipsychotic medication (see the section on how to use antipsychotic medication) in conjunction with psychological interventions (family intervention and individual CBT, delivered as described in the section on how to deliver psychological interventions)."
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.4.2",
          "texto": "Advise people who want to try psychological interventions alone that these are more effective when delivered in conjunction with antipsychotic medication."
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.2.1",
          "texto": "Do not start antipsychotic medication for a first presentation of sustained psychotic symptoms in primary care unless it is done in consultation with a consultant psychiatrist."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: las intervenciones psicológicas son más efectivas junto con el antipsicótico.",
        "No: NICE indica un antipsicótico oral en el primer episodio.",
        "Correcta: antipsicótico oral junto con intervención familiar y TCC individual.",
        "No: no es el tratamiento que NICE indica para el primer episodio psicótico."
      ]
    },
    {
      "id": "psq-c05",
      "topic": "Psicosis · Antes de iniciar el antipsicótico",
      "difficulty": "dificil",
      "src": "nice_psicosis",
      "vignette": "Vas a iniciar un antipsicótico en un hombre de 30 años con esquizofrenia. Tiene presión arterial alta. ¿Qué registras antes de empezar?",
      "options": [
        "Peso, cintura, PA, glucemia o HbA1c, lípidos, prolactina y ECG",
        "Solo hemograma, porque el riesgo principal es la agranulocitosis",
        "Electroencefalograma y tomografía de cráneo a todos",
        "Nada antes; el control metabólico empieza a los 3 meses"
      ],
      "correct": 0,
      "whyCorrect": "Antes de iniciar un antipsicótico se registran peso, perímetro de cintura, pulso y presión arterial, glucemia en ayunas o HbA1c, perfil lipídico y prolactina, trastornos del movimiento y estado nutricional. Se ofrece un ECG si hay riesgo cardiovascular específico, como la hipertensión.",
      "pearl": "Efectos que se discuten al elegir el antipsicótico: metabólicos, extrapiramidales, cardiovasculares (QT) y hormonales (prolactina).",
      "trap": "Iniciar sin línea de base metabólica o pedir estudios que no cambian la conducta.",
      "cita": [
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.6.1",
          "texto": "Before starting antipsychotic medication, undertake and record the following baseline investigations: weight (plotted on a chart) waist circumference pulse and blood pressure fasting blood glucose or glycosylated haemoglobin (HbA1c) blood lipid profile and prolactin levels assessment of any movement disorders assessment of nutritional status, diet and level of physical activity."
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.6.2",
          "texto": "Before starting antipsychotic medication, offer the person with psychosis or schizophrenia an electrocardiogram (ECG) if: specified in the summary of product characteristics (SPC) a physical examination has identified specific cardiovascular risk (such as diagnosis of high blood pressure)"
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.3.5.1",
          "texto": "Provide information and discuss the likely benefits and possible side effects of each drug, including: metabolic (including weight gain and diabetes) extrapyramidal (including akathisia, dyskinesia and dystonia) cardiovascular (including prolonging the QT interval) hormonal (including increasing plasma prolactin)"
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "Correcta: línea de base metabólica, prolactina y ECG porque tiene hipertensión.",
        "No: la línea de base de NICE es metabólica, cardiovascular y de prolactina, no solo un hemograma.",
        "No: no están en la línea de base que indica NICE antes del antipsicótico.",
        "No: las mediciones se hacen y se registran antes de empezar."
      ]
    },
    {
      "id": "psq-c06",
      "topic": "Esquizofrenia · Resistente al tratamiento",
      "difficulty": "residencia",
      "src": "nice_psicosis",
      "vignette": "Mujer de 35 años con esquizofrenia que <span class='hy'>no respondió a dos antipsicóticos</span> en dosis y tiempo adecuados; uno de ellos era de segunda generación. ¿Qué le ofreces?",
      "options": [
        "Un tercer antipsicótico de primera generación",
        "Clozapina",
        "Dos antipsicóticos juntos desde ahora",
        "Terapia electroconvulsiva como siguiente paso"
      ],
      "correct": 1,
      "whyCorrect": "Si la esquizofrenia no responde pese al uso secuencial de al menos 2 antipsicóticos en dosis adecuadas, al menos uno de segunda generación distinto de la clozapina, NICE indica ofrecer clozapina.",
      "pearl": "Dejar de fumar cambia el metabolismo de la clozapina y la olanzapina: hay que vigilar sus efectos.",
      "trap": "Seguir rotando antipsicóticos o combinarlos antes de la clozapina.",
      "cita": [
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.5.7.2",
          "texto": "Offer clozapine to people with schizophrenia whose illness has not responded adequately to treatment despite the sequential use of adequate doses of at least 2 different antipsychotic drugs. At least 1 of the drugs should be a non-clozapine second-generation antipsychotic."
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.1.2.3",
          "texto": "Be aware of the potential significant impact of reducing cigarette smoking on the metabolism of other drugs, particularly clozapine and olanzapine."
        },
        {
          "donde": "NICE CG178 Psychosis and schizophrenia in adults (2014, actualizada en 2026), recomendación 1.5.7.3",
          "texto": "For people with schizophrenia whose illness has not responded adequately to clozapine at an optimised dose, healthcare professionals should consider recommendation 1.5.7.1 (including measuring therapeutic drug levels) before adding a second antipsychotic to augment treatment with clozapine."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: tras 2 antipsicóticos sin respuesta, NICE indica clozapina.",
        "Correcta: esquizofrenia resistente tras 2 antipsicóticos adecuados: clozapina.",
        "No: un segundo antipsicótico se considera para aumentar la clozapina cuando esta no basta, no antes.",
        "No: lo que NICE indica en esta situación es la clozapina."
      ]
    },
    {
      "id": "psq-c07",
      "topic": "TOC · Deterioro moderado",
      "difficulty": "residencia",
      "src": "nice_toc",
      "vignette": "Hombre de 26 años con <span class='hy'>obsesiones de contaminación y lavado de manos</span> de 3 horas al día que ya le afectan el trabajo (deterioro funcional moderado). ¿Qué le ofreces?",
      "options": [
        "Benzodiacepina para la ansiedad",
        "Psicoanálisis de largo plazo",
        "Antipsicótico atípico de inicio",
        "ISRS o TCC intensiva con exposición"
      ],
      "correct": 3,
      "whyCorrect": "En el adulto con TOC y deterioro funcional moderado se ofrece elegir entre un ISRS o una TCC más intensiva que incluya exposición y prevención de respuesta (más de 10 horas de terapeuta), porque su eficacia parece comparable.",
      "pearl": "TOC con deterioro grave: ISRS más TCC con exposición y prevención de respuesta, combinados.",
      "trap": "Dar benzodiacepinas o antipsicóticos de primera línea.",
      "cita": [
        {
          "donde": "NICE CG31 Obsessive-compulsive disorder and body dysmorphic disorder (2005), recomendación 1.5.1.3",
          "texto": "Adults with OCD with moderate functional impairment should be offered the choice of either a course of an SSRI or more intensive CBT (including ERP; more than 10 therapist hours per patient), because these treatments appear to be comparably efficacious."
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: el tratamiento que indica NICE es un ISRS o una TCC con exposición y prevención de respuesta.",
        "No: la psicoterapia indicada es la TCC con exposición y prevención de respuesta.",
        "No: NICE ofrece de inicio un ISRS o TCC intensiva, no un antipsicótico.",
        "Correcta: con deterioro moderado se elige entre un ISRS o TCC intensiva con exposición."
      ]
    },
    {
      "id": "psq-c08",
      "topic": "TOC · Deterioro grave",
      "difficulty": "dificil",
      "src": "nice_toc",
      "vignette": "Mujer de 34 años con TOC: rituales de verificación de más de 6 horas al día; <span class='hy'>dejó de trabajar y casi no sale de casa</span> (deterioro funcional grave). ¿Qué le ofreces?",
      "options": [
        "Solo TCC de baja intensidad",
        "Solo un ISRS y control en 6 meses",
        "ISRS y TCC con exposición, combinados",
        "Una benzodiacepina hasta que mejore"
      ],
      "correct": 2,
      "whyCorrect": "En el adulto con TOC y deterioro funcional grave se ofrece el tratamiento combinado: ISRS más TCC con exposición y prevención de respuesta.",
      "pearl": "La TCC de baja intensidad (hasta 10 horas) es para el deterioro leve o si la persona la prefiere.",
      "trap": "Quedarse con un solo tratamiento en el TOC grave.",
      "cita": [
        {
          "donde": "NICE CG31 Obsessive-compulsive disorder and body dysmorphic disorder (2005), recomendación 1.5.1.4",
          "texto": "Adults with OCD with severe functional impairment should be offered combined treatment with an SSRI and CBT (including ERP)."
        },
        {
          "donde": "NICE CG31 Obsessive-compulsive disorder and body dysmorphic disorder (2005), recomendación 1.5.1.1",
          "texto": "In the initial treatment of adults with OCD, low intensity psychological treatments (including exposure and response prevention [ERP]; up to 10 therapist hours per patient) should be offered if the patient's degree of functional impairment is mild"
        }
      ],
      "verificado": "2026-11-26",
      "porOpcion": [
        "No: la TCC de baja intensidad es para el deterioro leve.",
        "No: con deterioro grave se ofrece el tratamiento combinado, no un solo fármaco.",
        "Correcta: con deterioro grave, ISRS más TCC con exposición y prevención de respuesta.",
        "No: el tratamiento que indica NICE en el TOC grave es ISRS más TCC."
      ]
    }
  ],
  "fichas": [],
  "tarjetas": [],
  "revision": "verificada"
});
