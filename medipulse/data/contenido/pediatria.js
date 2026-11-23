// Pediatría: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: ped-c01 (casos), ped-f01 (fichas), ped-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Pediatría",
  "prefijo": "ped",
  "paquete": "starter",
  "actualizado": "2026-11-23",
  "casos": [
    {
      "id": 5,
      "topic": "Vía Aérea · Laringotraqueítis",
      "difficulty": "residencia",
      "src": "afp_croup",
      "vignette": "Niño de 2 años con cuadro de 2 días de rinorrea y febrícula, quien presenta esta noche <span class='hy'>tos perruna (metálica), disfonía y estridor inspiratorio en reposo</span> sin babeo ni posición en trípode. ¿Cuál es la terapia inicial más efectiva?",
      "options": [
        "Nebulización con salbutamol y amoxicilina oral",
        "Intubación endotraqueal inmediata en quirófano bajo sospecha de epiglotitis",
        "Dexametasona dosis única + adrenalina racémica nebulizada",
        "Azitromicina oral y vapor frío domiciliario"
      ],
      "correct": 2,
      "whyCorrect": "Es un crup con estridor en reposo, es decir, moderado a grave: se trata con corticoide más adrenalina nebulizada. La dosis estándar es dexametasona oral única de 0.6 mg/kg (máximo 12 mg). Tras la adrenalina se vigila 2 a 4 horas por el riesgo de recaída.",
      "pearl": "Todo crup recibe corticoide, sea cual sea su gravedad. La adrenalina nebulizada se suma en el crup moderado a grave.",
      "trap": "Confundir crup con epiglotitis: la epiglotitis da babeo, dificultad respiratoria grave y posición en trípode, y se sospecha en niños sin vacunación completa contra Hib.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "A single oral dose of dexamethasone (0.6 mg/kg, maximum 12 mg) is standard. Moderate to severe croup should be treated with nebulized epinephrine and corticosteroids."
        },
        {
          "donde": "Recomendaciones clave (SORT A)",
          "texto": "Corticosteroids are first-line treatment for croup and should be administered regardless of severity."
        },
        {
          "donde": "Recomendaciones clave (SORT A)",
          "texto": "Nebulized epinephrine should be used to treat moderate to severe croup. Children should be monitored for 2 to 4 hours after treatment due to its short half-life and the risk of symptom recurrence."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 11,
      "topic": "Deshidratación · Gastroenteritis",
      "difficulty": "residencia",
      "src": "nice_ge",
      "vignette": "Lactante de 10 meses (peso 9 kg) con diarrea acuosa abundante. Está <span class='hy'>irritable, con ojos hundidos, boca seca, bebe con avidez</span> y el pliegue cutáneo vuelve lentamente (&lt; 2 s). Tolera vía oral. ¿Cómo se rehidrata?",
      "options": [
        "SRO de baja osmolaridad 50 mL/kg en 4 horas, más mantenimiento",
        "Líquidos caseros a libre demanda, sin sales de rehidratación oral",
        "Bolo rápido de solución salina 0.9 % IV a 20 mL/kg y reevaluar",
        "Suspender la lactancia materna y dar loperamida para frenar la diarrea"
      ],
      "correct": 0,
      "whyCorrect": "Tiene signos de deshidratación clínica, sin choque, y tolera la vía oral. NICE indica SRO de baja osmolaridad: 50 mL/kg en 4 horas para reponer el déficit, más los líquidos de mantenimiento, en tomas pequeñas y frecuentes. La vía IV se reserva para el choque, el deterioro pese a la SRO o el vómito persistente de la SRO.",
      "pearl": "Choque: bolo rápido de 10 mL/kg de solución salina 0.9 %. Durante la rehidratación se continúa la lactancia materna. No dar antibióticos de rutina.",
      "trap": "Pasar a líquidos IV a un niño que bebe y tolera la vía oral, o suspender la lactancia materna.",
      "cita": [
        {
          "donde": "Recomendación 1.3.2.2",
          "texto": "In children with clinical dehydration, including hypernatraemic dehydration: use low-osmolarity ORS solution (240–250 mOsm/l) for oral rehydration therapy … give 50 ml/kg for fluid deficit replacement over 4 hours as well as maintenance fluid · give the ORS solution frequently and in small amounts"
        },
        {
          "donde": "Recomendación 1.3.3.1",
          "texto": "Use intravenous fluid therapy for clinical dehydration if: shock is suspected or confirmed · a child with red flag symptoms or signs shows clinical evidence of deterioration despite oral rehydration therapy · a child persistently vomits the ORS solution, given orally or via a nasogastric tube."
        },
        {
          "donde": "Manejo nutricional",
          "texto": "During rehydration therapy: continue breastfeeding"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 17,
      "topic": "Neumología · Bronquiolitis",
      "difficulty": "residencia",
      "src": "nice_bq",
      "vignette": "Lactante de 4 meses previamente sano con coriza hace 3 días, ahora con <span class='hy'>taquipnea, tirajes subcostales, sibilancias espiratorias difusas y SatO2 89%</span>. Sin fiebre alta ni consolidación. ¿Manejo indicado?",
      "options": [
        "Oxígeno, hidratación y aspirar secreciones solo si estorban",
        "Salbutamol horario programado más nebulización con solución salina hipertónica",
        "Ribavirina intravenosa de rutina por la gravedad del cuadro",
        "Prednisolona oral 2 mg/kg más amoxicilina-clavulanato por 7 días"
      ],
      "correct": 0,
      "whyCorrect": "Es una bronquiolitis: menor de 2 años con pródromo catarral, tos, tiraje y sibilancias. El manejo es de soporte. Con 4 meses de edad, NICE indica oxígeno si la saturación es persistentemente menor de 90 %; la aspiración de la vía aérea superior no es de rutina, solo si las secreciones causan dificultad respiratoria o para alimentarse.",
      "pearl": "NICE: en la bronquiolitis no se usan antibióticos, solución salina hipertónica, adrenalina nebulizada, salbutamol, montelukast, ipratropio ni corticoides.",
      "trap": "Tratar una bronquiolitis como una crisis de asma con salbutamol y corticoides.",
      "cita": [
        {
          "donde": "Recomendación 1.4.4 [2021]",
          "texto": "Give oxygen supplementation to babies and children with bronchiolitis if their oxygen saturation is: persistently less than 90%, for children aged 6 weeks and over · persistently less than 92%, for babies under 6 weeks or children of any age with underlying health conditions."
        },
        {
          "donde": "Recomendación 1.4.3 [2015]",
          "texto": "Do not use any of the following to treat bronchiolitis in babies or children: antibiotics · hypertonic saline · adrenaline (nebulised) · salbutamol · montelukast · ipratropium bromide · systemic or inhaled corticosteroids · a combination of systemic corticosteroids and nebulised adrenaline."
        },
        {
          "donde": "Recomendaciones 1.4.6 y 1.4.7 [2015]",
          "texto": "Do not routinely perform upper airway suctioning in babies or children with bronchiolitis. · Consider upper airway suctioning in babies and children who have respiratory distress or feeding difficulties because of upper airway secretions."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 22,
      "topic": "Vasculitis · Kawasaki",
      "difficulty": "residencia",
      "src": "aha_kaw",
      "vignette": "Niño de 3 años con <span class='hy'>fiebre de 6 días</span> sin respuesta a antipiréticos, conjuntivitis bilateral sin secreción, labios rojos y fisurados, lengua en fresa, exantema polimorfo, edema de manos y adenopatía cervical de 2 cm. ¿Tratamiento indicado?",
      "options": [
        "Inmunoglobulina IV 2 g/kg más ácido acetilsalicílico",
        "Amoxicilina por probable escarlatina y control en 48 horas",
        "Prednisolona oral y observación hospitalaria por 72 horas",
        "Ibuprofeno a horario y control en 48 horas si sigue la fiebre"
      ],
      "correct": 0,
      "whyCorrect": "Con fiebre y 4 o más criterios clínicos principales es una enfermedad de Kawasaki completa; la AHA 2024 permite diagnosticarla desde el día 4 de fiebre. El tratamiento estándar es IGIV 2 g/kg en 8 a 12 horas, más aspirina. Tratar dentro de los 10 días de fiebre reduce la dilatación y los aneurismas coronarios.",
      "pearl": "Kawasaki es la principal causa de cardiopatía adquirida en niños de países desarrollados; sin tratamiento, el 25 % desarrolla dilatación o aneurismas coronarios.",
      "trap": "Confundirlo con escarlatina o con una infección viral y retrasar la IGIV más allá del día 10 de fiebre.",
      "cita": [
        {
          "donde": "Puntos clave, diagnóstico",
          "texto": "In the presence of ≥4 principal clinical features, the diagnosis of complete KD can be made with 4 days of fever."
        },
        {
          "donde": "Tratamiento inicial",
          "texto": "IVIg at 2 g/kg infused over 8 to 12 hours remains the standard of care for patients with acute KD to reduce inflammation."
        },
        {
          "donde": "Diagnóstico",
          "texto": "Treatment within 10 days of fever onset is strongly associated with a lower risk of CA dilation or aneurysms."
        },
        {
          "donde": "Resumen",
          "texto": "Kawasaki disease (KD), an acute self-limited febrile illness that primarily affects children <5 years old, is the leading cause of acquired heart disease in developed countries, with the potential of leading to coronary artery dilation and coronary artery aneurysms in 25% of untreated patients."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c01",
      "topic": "Vasculitis · Kawasaki de alto riesgo",
      "difficulty": "dificil",
      "src": "aha_kaw",
      "vignette": "Lactante de <span class='hy'>4 meses</span> con 6 días de fiebre, conjuntivitis bilateral sin secreción, labios rojos y edema de manos y pies. Se diagnostica enfermedad de Kawasaki. El ecocardiograma muestra la descendente anterior con <span class='hy'>Z score 3,1</span>. ¿Tratamiento inicial?",
      "options": [
        "IGIV 2 g/kg sola y ecocardiograma de control al alta",
        "Esperar 36 horas para ver si responde antes de decidir la terapia",
        "IGIV 2 g/kg y aspirina, más un adyuvante como corticoide",
        "Infliximab en lugar de IGIV por tener ya una dilatación coronaria"
      ],
      "correct": 2,
      "whyCorrect": "Edad < 6 meses y Z score ≥ 2,5 al diagnóstico son rasgos de alto riesgo de aneurismas. A estos pacientes se les debe considerar intensificar el tratamiento primario: IGIV más un antiinflamatorio adyuvante (terapia dual). En el ensayo RAISE, IGIV más prednisolona redujo las anomalías coronarias frente a IGIV sola (3 % vs 23 %).",
      "pearl": "Los menores de 6 meses tienen aneurismas coronarios en el 68 % de los casos: sospecha Kawasaki incompleto en todo lactante con fiebre prolongada.",
      "trap": "Tratar igual que un Kawasaki de riesgo estándar y esperar a la resistencia para intensificar.",
      "cita": [
        {
          "donde": "Puntos clave, diagnóstico (5)",
          "texto": "substantial data indicate that right CA or left anterior descending Z score ≥2.5 at diagnosis and age <6 months are high-risk features in multiple racial and ethnic groups, and these patients should be considered for intensification of primary therapy."
        },
        {
          "donde": "Puntos clave, tratamiento (1)",
          "texto": "Intensification of primary therapy with adjunctive anti-inflammatory therapy (dual therapy) may benefit high-risk patients with KD."
        },
        {
          "donde": "Tratamiento inicial",
          "texto": "IVIg at 2 g/kg infused over 8 to 12 hours remains the standard of care for patients with acute KD to reduce inflammation."
        },
        {
          "donde": "Tratamiento: corticosteroides (RAISE)",
          "texto": "RAISE (Randomized Controlled Trial to Assess Immunoglobulin Plus Steroid Efficacy for Kawasaki Disease; https://www.umin.ac.jp/ctr; unique identifier: UMIN000000940) demonstrated that IVIg plus prednisolone (2 mg/kg per day) for 5 days followed by an oral taper resulted in a lower incidence of CA abnormalities than IVIg alone (4 patients [3%] versus 28 patients [23%]; risk difference, 0.20 [95% CI, 0.12–0.28]; P<0.0001)."
        },
        {
          "donde": "Diagnóstico: riesgo por edad",
          "texto": "Children <1 year of age are at higher risk of developing CAA than older patients, as documented in the prevalence of CAAs in patients between 6 and 12 months of age (40%) and those <6 months of age (68%)."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c02",
      "topic": "Vasculitis · Kawasaki resistente a IGIV",
      "difficulty": "residencia",
      "src": "aha_kaw",
      "vignette": "Niño de 3 años con Kawasaki tratado con IGIV 2 g/kg y aspirina. <span class='hy'>40 horas después de terminar la infusión</span> sigue con fiebre de 39 °C. ¿Cómo se interpreta y qué haces?",
      "options": [
        "Resistencia a la IGIV: segunda dosis de IGIV o infliximab",
        "Es esperable después de la IGIV: observar 72 horas más sin cambios",
        "Subir la aspirina a dosis alta como único tratamiento adicional",
        "Fiebre por la infusión de IGIV: solo antipiréticos y control"
      ],
      "correct": 0,
      "whyCorrect": "Fiebre persistente o que reaparece ≥ 36 horas después de terminar la IGIV define la resistencia, que aumenta el riesgo de aneurismas. Las opciones incluyen una segunda dosis de IGIV, infliximab o corticoides. En el ensayo KIDCARE, infliximab (10 mg/kg IV) frente a una segunda IGIV acortó la fiebre, redujo la necesidad de más tratamiento y la estancia.",
      "pearl": "Tras la IGIV, la VSG sube por la propia inmunoglobulina: no sirve para seguir la inflamación.",
      "trap": "Esperar más días: cada día de inflamación sin control aumenta el riesgo coronario.",
      "cita": [
        {
          "donde": "Tratamiento inicial: definición de resistencia",
          "texto": "Patients with persistent or recrudescent fever ≥36 hours after the completion of the initial IVIg infusion are defined as IVIg resistant."
        },
        {
          "donde": "Tratamiento de la resistencia",
          "texto": "These patients are at increased risk for developing CAA compared with those who respond to IVIg. Multiple anti-inflammatory therapies have been evaluated to varying degrees for treatment resistance, including corticosteroids, tumor necrosis factor α inhibitors (infliximab and etanercept), interleukin-1 inhibition (anakinra), and cyclosporine"
        },
        {
          "donde": "Tratamiento de la resistencia: infliximab",
          "texto": "The KIDCARE trial (Kawasaki Disease Comparative Effectiveness; https://www.clinicaltrials.gov; unique identifier: NCT03065244) compared infliximab (10 mg/ kg IV), a monoclonal antibody against tumor necrosis factor α, with a second IVIg infusion in IVIg-resistant patients. This study showed shorter duration of fever, reduced need for additional therapy, less severe anemia, and shorter hospitalization in the infliximab group."
        },
        {
          "donde": "Tratamiento inicial: efectos de la IGIV",
          "texto": "The erythrocyte sedimentation rate is increased after IVIg treatment; therefore, erythrocyte sedimentation rate is not a reliable marker of inflammation after IVIg infusion."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c03",
      "topic": "Vasculitis · Kawasaki vs MIS-C",
      "difficulty": "residencia",
      "src": "aha_kaw",
      "vignette": "Niña de 9 años con 5 días de fiebre, <span class='hy'>dolor abdominal intenso, vómitos y diarrea</span>, cefalea e hipotensión. Plaquetas 98.000, linfopenia y troponina elevada. Ecocardiograma: <span class='hy'>función sistólica del ventrículo izquierdo disminuida y derrame pericárdico</span>, coronarias normales. Sin cambios en la mucosa oral. ¿Diagnóstico más probable?",
      "options": [
        "Enfermedad de Kawasaki completa con afectación miocárdica",
        "Escarlatina con miocarditis estreptocócica",
        "Gastroenteritis con deshidratación y choque hipovolémico",
        "Síndrome inflamatorio multisistémico pediátrico (MIS-C)"
      ],
      "correct": 3,
      "whyCorrect": "Los síntomas gastrointestinales prominentes, la cefalea, la trombocitopenia, la linfopenia, la troponina elevada y la disfunción ventricular con derrame pericárdico son más propios del MIS-C. El exantema, la conjuntivitis, los cambios de la mucosa oral y las alteraciones coronarias son más comunes en Kawasaki.",
      "pearl": "El MIS-C entró al diagnóstico diferencial del Kawasaki desde 2020, aunque su frecuencia bajó mucho desde 2022.",
      "trap": "Diagnosticar Kawasaki por la fiebre y la inflamación sin mirar el compromiso gastrointestinal y miocárdico.",
      "cita": [
        {
          "donde": "Diagnóstico: diferencial con MIS-C",
          "texto": "Certain clinical characteristics (eg, prominent gastrointestinal symptoms [abdominal pain, vomiting, diarrhea], headache), laboratory findings (eg, thrombocytopenia, lymphopenia, elevated troponin or BNP [B-type natriuretic peptide] levels), and cardiac findings (eg, decreased left ventricular systolic function, pericardial effusion) are more prominent in patients with MISC."
        },
        {
          "donde": "Diagnóstico: diferencial con MIS-C",
          "texto": "Rash, conjunctival injection, oral mucosal changes, and CA abnormalities are more common in patients with KD."
        },
        {
          "donde": "Puntos clave, diagnóstico (4)",
          "texto": "MIS-C should be added to the differential diagnosis of KD, although the prevalence of this condition has decreased markedly since 2022."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c04",
      "qtype": "directa",
      "topic": "Vasculitis · Kawasaki: vacunas tras IGIV",
      "difficulty": "basica",
      "src": "aha_kaw",
      "vignette": "Un niño recibió IGIV por enfermedad de Kawasaki. ¿Cuánto tiempo deben diferirse las vacunas vivas (triple viral y varicela)?",
      "options": [
        "1 mes",
        "3 meses",
        "6 meses",
        "11 meses"
      ],
      "correct": 3,
      "whyCorrect": "Todas las vacunas vivas, incluidas sarampión, paperas, rubéola y varicela, se difieren 11 meses después de la IGIV, porque la inmunoglobulina puede reducir su eficacia.",
      "pearl": "La IGIV puede reducir la eficacia de las vacunas vivas: por eso se difieren.",
      "trap": "Aplicar la triple viral en el control de los 12 meses si recibió IGIV pocos meses antes.",
      "cita": [
        {
          "donde": "Tratamiento inicial: efectos de la IGIV",
          "texto": "All live vaccines, including measles, mumps, rubella, and varicella vaccines, should be deferred for 11 months after IVIg administration, as administered IVIg may reduce efficacy of those live vaccines."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c05",
      "topic": "Vasculitis · Kawasaki con aneurisma gigante",
      "difficulty": "dificil",
      "src": "aha_kaw",
      "vignette": "Niño de 5 años con Kawasaki y aneurisma de la descendente anterior con <span class='hy'>Z score 12</span> (diámetro 8,5 mm). ¿Qué tratamiento antitrombótico corresponde?",
      "options": [
        "Aspirina en dosis baja más anticoagulación",
        "Aspirina en dosis baja por 6 semanas y luego suspender",
        "Clopidogrel solo como antiagregante de mantenimiento",
        "Ninguno si está asintomático y sin trombo en el ecocardiograma"
      ],
      "correct": 0,
      "whyCorrect": "Z score ≥ 10 o diámetro ≥ 8 mm es un aneurisma grande o gigante, con alto riesgo de trombosis. Requiere antiagregación (aspirina, o aspirina más clopidogrel) y anticoagulación con warfarina o heparina de bajo peso molecular; los anticoagulantes orales directos pueden ser una alternativa más cómoda y segura.",
      "pearl": "El riesgo de infarto es máximo en los primeros 2 a 3 meses tras el inicio del Kawasaki.",
      "trap": "Tratar un aneurisma gigante como si fuera solo dilatación: aspirina 6 semanas y alta.",
      "cita": [
        {
          "donde": "Tabla 1: clasificación de las arterias coronarias por Z score",
          "texto": "1. No involvement: always Z <2 2. Dilation only: 2 to <2.5 3. Small aneurysm: ≥2.5 to <5 4. Medium aneurysm: ≥5 to <10, and absolute dimension <8 mm 5. Large or giant aneurysm: ≥10 or absolute dimension ≥8 mm"
        },
        {
          "donde": "Puntos clave, tratamiento (2)",
          "texto": "Patients with large CAAs require antiplatelet and anticoagulation therapy."
        },
        {
          "donde": "Tromboprofilaxis",
          "texto": "Patients with large CAAs traditionally receive both antiplatelet medication (typically aspirin 81 mg daily or dual antiplatelet [aspirin and clopidogrel] agents) and anticoagulation with either warfarin or low molecular weight heparin (LMWH)."
        },
        {
          "donde": "Puntos clave, tratamiento (4)",
          "texto": "DOACs may provide a more convenient and safer alternative than warfarin or LMWH."
        },
        {
          "donde": "Manejo del infarto",
          "texto": "The risk of MI in patients with KD with CAA is highest in the first 2 to 3 months after KD onset."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c06",
      "topic": "Neurología · Síndrome de Tourette",
      "difficulty": "basica",
      "src": "nrdp_ts",
      "vignette": "Niño de 9 años con <span class='hy'>parpadeo, muecas y sacudidas del hombro</span>, y <span class='hy'>carraspeo</span> frecuente, varias veces al día, desde hace <span class='hy'>2 años</span>. Dice que antes de cada tic siente una «necesidad» que se alivia al hacerlo, y puede contenerlos un rato. ¿Cuál es el diagnóstico más probable?",
      "options": [
        "Trastorno de tics provisional",
        "Trastorno de tics motor crónico",
        "Síndrome de Tourette",
        "Trastorno obsesivo-compulsivo"
      ],
      "correct": 2,
      "whyCorrect": "El síndrome de Tourette requiere varios tics motores y al menos un tic fónico, que empiezan en el periodo del desarrollo (antes de los 18 años según el DSM-5-TR) y duran más de 1 año. La urgencia premonitoria y la supresión voluntaria son típicas de los tics.",
      "pearl": "Ciclo «urgencia → tic → alivio»: romperlo es la base de la terapia conductual (CBIT).",
      "trap": "Llamarlo trastorno de tics motor crónico: ese tiene solo tics motores o solo fónicos, no ambos.",
      "cita": [
        {
          "donde": "Diagnóstico",
          "texto": "Diagnosis of TS requires the presence of multiple motor tics and one or more phonic tics that begin during the developmental period and are present for more than 1 year"
        },
        {
          "donde": "Diagnóstico",
          "texto": "define TS as the presence of multiple motor tics and at least one vocal tic that begin during the developmental period (defined in the DSM-5-TR as prior to the age of 18 years) and occur multiple times a day."
        },
        {
          "donde": "Diagnóstico",
          "texto": "The term provisional tic disorder (PTD) is used in those with tics for less than 1 year, whereas chronic (persistent) tic disorder is used to refer to those with the presence of either motor or vocal tic (but not both) for more than 1 year"
        },
        {
          "donde": "Características de los tics",
          "texto": "The characteristic features of tics include a premonitory urge (like the sensations felt prior to a sneeze or itch) preceding the onset of the tic, voluntary suppression of tics with effort, suggestibility and sensitivity to potential environmental triggers."
        },
        {
          "donde": "Fisiopatología de los tics",
          "texto": "Increasing awareness of the premonitory urge and training aimed at breaking the urge–tic–relief cycle forms the basis of CBIT"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c07",
      "topic": "Neurología · Tics de menos de 1 año",
      "difficulty": "residencia",
      "src": "nrdp_ts",
      "vignette": "Niña de 7 años con <span class='hy'>parpadeo repetido y carraspeo</span> varias veces al día, que empezaron hace <span class='hy'>4 meses</span>. Examen neurológico normal. ¿Cuál es el diagnóstico más probable?",
      "options": [
        "Trastorno de tics provisional",
        "Síndrome de Tourette",
        "Trastorno de tics vocal crónico",
        "Epilepsia de ausencias"
      ],
      "correct": 0,
      "whyCorrect": "Con tics de menos de 1 año se usa el término trastorno de tics provisional. Para Tourette se necesitan más de 1 año de tics motores múltiples y al menos uno fónico; el trastorno de tics crónico (persistente) tiene solo motores o solo fónicos por más de 1 año.",
      "pearl": "Lo que define la categoría es el tiempo (menos o más de 1 año) y el tipo de tics (motores, fónicos o ambos).",
      "trap": "Diagnosticar Tourette antes de que los tics cumplan 1 año.",
      "cita": [
        {
          "donde": "Diagnóstico",
          "texto": "The term provisional tic disorder (PTD) is used in those with tics for less than 1 year, whereas chronic (persistent) tic disorder is used to refer to those with the presence of either motor or vocal tic (but not both) for more than 1 year"
        },
        {
          "donde": "Diagnóstico",
          "texto": "Diagnosis of TS requires the presence of multiple motor tics and one or more phonic tics that begin during the developmental period and are present for more than 1 year"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c08",
      "topic": "Neurología · Tourette: tratamiento",
      "difficulty": "residencia",
      "src": "nrdp_ts",
      "vignette": "Adolescente de 13 años con síndrome de Tourette cuyos tics le causan burlas en el colegio y afectan su desempeño. Sin comorbilidades graves. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Haloperidol en dosis bajas como primera opción",
        "Estimulación cerebral profunda por el impacto escolar",
        "Aripiprazol desde el diagnóstico para reducir los tics",
        "Terapia conductual: CBIT o reversión del hábito"
      ],
      "correct": 3,
      "whyCorrect": "Se recomiendan como primera línea 3 estrategias conductuales: CBIT, entrenamiento en reversión del hábito y exposición con prevención de respuesta, sin que una supere a las otras. Entre los medicamentos del segundo escalón, varios reportes ponen al aripiprazol como primera opción. La estimulación cerebral profunda queda para casos graves refractarios.",
      "pearl": "CBIT entrena a reconocer la urgencia premonitoria y a romper el ciclo urgencia–tic–alivio.",
      "trap": "Empezar con un antipsicótico típico antes de ofrecer terapia conductual.",
      "cita": [
        {
          "donde": "Manejo",
          "texto": "Three major behavioural strategies are recommended as first-line treatment for TS: CBIT, habit reversal training (HRT) and exposure with response prevention (ERP) therapy"
        },
        {
          "donde": "Manejo: medicamentos",
          "texto": "several reports have ranked aripiprazole as the first-line tier 2 treatment for TS"
        },
        {
          "donde": "Manejo",
          "texto": "in individuals with severe refractory TS, deep brain stimulation (DBS)"
        },
        {
          "donde": "Fisiopatología de los tics",
          "texto": "Increasing awareness of the premonitory urge and training aimed at breaking the urge–tic–relief cycle forms the basis of CBIT"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c09",
      "topic": "Dermatología · Tiña de la cabeza",
      "difficulty": "basica",
      "src": "afp_tinea",
      "vignette": "Niño de 6 años con una placa redonda descamativa en el cuero cabelludo, con <span class='hy'>pelos quebrados y puntos negros</span>, de 6 semanas. Ya usó una crema antimicótica sin mejoría. ¿Conducta?",
      "options": [
        "Seguir con la crema antimicótica 4 semanas más",
        "Crema de clotrimazol con betametasona",
        "Terbinafina oral",
        "Champú de ketoconazol como único tratamiento"
      ],
      "correct": 2,
      "whyCorrect": "La tiña de la cabeza compromete el folículo piloso y necesita antimicótico oral: los tópicos no bastan. La terbinafina es la preferida, con cursos más cortos que la griseofulvina. Si el cuadro es típico, a menudo se trata sin pruebas.",
      "pearl": "Kerion: tratarlo pronto para evitar cicatriz y alopecia permanente.",
      "trap": "Usar una crema que combina antimicótico y corticoide: generalmente se deben evitar.",
      "cita": [
        {
          "donde": "Tratamiento",
          "texto": "Tinea corporis, tinea cruris, and tinea pedis generally respond to inexpensive topical antifungal agents, but oral antifungal agents may be indicated for patients with extensive disease, lack of response to topical treatment, immunocompromise, or hair follicle involvement (eg, tinea capitis)."
        },
        {
          "donde": "Recomendaciones clave (A)",
          "texto": "Terbinafine is preferred for the treatment of tinea capitis, with shorter treatment courses than griseofulvin."
        },
        {
          "donde": "Tiña de la cabeza: pruebas",
          "texto": "Tinea capitis is often treated empirically without diagnostic testing when the clinical presentation is typical."
        },
        {
          "donde": "Tiña de la cabeza",
          "texto": "Prompt treatment of kerion is critical to prevent scarring and permanent hair loss."
        },
        {
          "donde": "Tiña de la cabeza",
          "texto": "In the United States, tinea capitis is most common among Black children aged 3 to 9 years."
        },
        {
          "donde": "Recomendaciones clave (C)",
          "texto": "Combination antifungal-corticosteroid products, such as clotrimazole-betamethasone, generally should be avoided."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c10",
      "topic": "Endocrinología · Hipotiroidismo subclínico",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Niña de 9 años, asintomática, con crecimiento normal. En un chequeo le pidieron pruebas tiroideas: <span class='hy'>TSH de 7,2 mU/L con T4 libre normal</span>. No tiene bocio. ¿Cuál es la conducta?",
      "options": [
        "Iniciar levotiroxina a dosis plena por superficie corporal",
        "Remitir a endocrinología pediátrica como prioritaria",
        "Pedir ecografía tiroidea y gammagrafía de inmediato",
        "Repetir TSH y T4 libre en 2 a 3 meses antes de tratar"
      ],
      "correct": 3,
      "whyCorrect": "Es un hipotiroidismo subclínico (TSH elevada con T4 libre normal). Se repite la medición en 2 a 3 meses para descartar fluctuaciones transitorias o errores de laboratorio. Hay consenso en tratar si la TSH supera 10 mU/L en una segunda medición; entre 4,5 y 10 se individualiza.",
      "pearl": "Hipotiroidismo subclínico: confirmar antes de tratar. TSH > 10 mU/L en dos mediciones → levotiroxina, más aún con anticuerpos antitiroideos positivos.",
      "trap": "Tratar con una sola TSH levemente alta: puede ser transitoria o un error de laboratorio.",
      "cita": [
        {
          "donde": "Patología tiroidea en niños y adolescentes: aspectos esenciales",
          "texto": "Se recomienda repetir la medición en 2 a 3 meses para descartar fluctuaciones transitorias o errores de laboratorio."
        },
        {
          "donde": "Patología tiroidea en niños y adolescentes: aspectos esenciales",
          "texto": "TSH mayor de 10 mU/L confirmado con una segunda medición, más aún en presencia de anticuerpos antitiroperoxidasa o antitiroglobulina."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c11",
      "topic": "Maltrato infantil · Equimosis en el lactante",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Lactante de 3 meses llevado a urgencias porque «se golpeó con la baranda de la cuna». Al examen tiene una <span class='hy'>equimosis en el pabellón auricular izquierdo</span>, sin otras lesiones visibles. Está alerta y come bien. ¿Qué haces?",
      "options": [
        "Explicar a los padres medidas de seguridad en la cuna y dar de alta",
        "Pedir hemograma y tiempos de coagulación, y dar de alta si son normales",
        "Serie esquelética completa y activar la ruta de protección",
        "Observar en casa y control por consulta externa en 48 horas"
      ],
      "correct": 2,
      "whyCorrect": "Una sola equimosis en un menor de 4 meses, en cualquier lugar, debe generar sospecha inmediata de maltrato físico; además, la oreja es una zona TEN-4 FACESp. En menores de 2 años, la serie esquelética completa es el estudio de elección para buscar fracturas ocultas.",
      "pearl": "TEN-4 FACESp: torso, oreja, cuello; frenillo, ángulo mandibular, mejillas, párpados, subconjuntival; y cualquier equimosis en menores de 4 meses.",
      "trap": "Aceptar el mecanismo contado: un lactante de 3 meses no se moviliza lo suficiente para golpearse así.",
      "cita": [
        {
          "donde": "Maltrato físico infantil: aspectos clínicos, epidemiológicos e imagenológicos",
          "texto": "La presencia de una sola equimosis en cualquiera de las áreas descritas en un niño menor de 4 años o en cualquier lugar en un menor de 4 meses debe generar sospecha inmediata de maltrato físico."
        },
        {
          "donde": "Maltrato físico infantil: aspectos clínicos, epidemiológicos e imagenológicos",
          "texto": "La serie esquelética inicial es el estudio de elección en la evaluación del maltrato físico infantil, especialmente en niños menores de 2 años."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c12",
      "topic": "Cuidado crítico · Choque séptico",
      "difficulty": "dificil",
      "src": "udea_ped26",
      "vignette": "Niño de 4 años con neumonía y choque séptico. Recibió <span class='hy'>40 mL/kg de cristaloides</span> en bolos de 10 mL/kg. Sigue con llenado capilar de 5 segundos, extremidades frías, pulsos débiles y oliguria. Tiene dos accesos periféricos; el catéter central se colocará en una hora. ¿Qué haces ahora?",
      "options": [
        "Iniciar adrenalina por la vía periférica, con monitorización estricta",
        "Un quinto bolo de 10 mL/kg y esperar el catéter central para vasoactivos",
        "Dopamina por vía periférica como primera línea",
        "Noradrenalina cuando esté el catéter central, por ser choque frío"
      ],
      "correct": 0,
      "whyCorrect": "Si después de 30 a 40 mL/kg persiste la hipoperfusión, se inicia soporte vasoactivo sin esperar un acceso central: puede darse por vía periférica o intraósea con monitorización estricta. En el choque frío se prefiere la adrenalina; la noradrenalina, en el caliente. La dopamina no se recomienda como primera línea.",
      "pearl": "Choque pediátrico: bolos de 10 mL/kg hasta 30 a 40 mL/kg. Frío → adrenalina; caliente → noradrenalina. La hipotensión es tardía: mira perfusión, estado mental y diuresis.",
      "trap": "Retrasar el vasoactivo por no tener catéter central, o seguir dando líquidos sin límite.",
      "cita": [
        {
          "donde": "Vasoactivos en pediatría",
          "texto": "Si después de una reanimación hídrica de 30-40 mL/ kg persiste la hipoperfusión o se evidencian datos de sobrecarga, se debe iniciar soporte vasoactivo de manera oportuna, sin esperar un acceso central."
        },
        {
          "donde": "Vasoactivos en pediatría",
          "texto": "La adrenalina se prefiere en choque frío, mientras que la noradrenalina se prefiere en choque caliente La dopamina no se recomienda como primera línea por mayor riesgo de arritmias y menor beneficio clínico"
        },
        {
          "donde": "Vasoactivos en pediatría",
          "texto": "no se debe demorar el inicio de estos medicamentos por ausencia de un acceso central, ya que se puede utilizar una vía periférica o intraósea, con monitorización estricta."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c13",
      "topic": "Genética · Síndrome de Down: crecimiento",
      "difficulty": "basica",
      "src": "udea_ped26",
      "vignette": "Niño de 2 años con síndrome de Down, activo y sin síntomas. En las curvas de la OMS su peso y talla están por <span class='hy'>debajo del percentil 3</span>; en las curvas específicas para síndrome de Down están en el percentil 40 y siguen su canal. ¿Cuál es la interpretación correcta?",
      "options": [
        "Falla de medro: hay que estudiar malabsorción",
        "Talla baja: hay que pedir hormona de crecimiento",
        "Desnutrición crónica: hay que aumentar las calorías",
        "Crecimiento adecuado según las curvas específicas"
      ],
      "correct": 3,
      "whyCorrect": "Los niños con síndrome de Down deben evaluarse con curvas específicas: usarlas es mandatorio para no diagnosticar por error falla de medro o enmascarar la obesidad. En su curva, este niño crece bien y sigue su canal.",
      "pearl": "Síndrome de Down: curvas específicas para el crecimiento y evaluación del desarrollo longitudinal, comparando al niño consigo mismo.",
      "trap": "Aplicar las curvas de la OMS y pedir estudios innecesarios por una «talla baja» esperada.",
      "cita": [
        {
          "donde": "Seguimiento integral del niño y la niña con síndrome de Down",
          "texto": "El uso de curvas de crecimiento específicas para SD es mandatorio para evitar diagnósticos erróneos de fallo de medro o enmascarar la obesidad."
        }
      ],
      "verificado": "2026-11-21",
      "tipo": "diagnostico"
    },
    {
      "id": "ped-c14",
      "topic": "Neurología · Síndrome de West",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Lactante de 6 meses con episodios de flexión brusca del tronco y los brazos, de menos de 2 segundos, <span class='hy'>en salvas al despertar</span>. Desde hace 3 semanas dejó de sostener la cabeza. El EEG muestra hipsarritmia. ¿Cuál es la conducta?",
      "options": [
        "Prednisolona o ACTH, o vigabatrina, en los primeros 7 días",
        "Carbamazepina y control por consulta externa en un mes",
        "Esperar la resonancia y los estudios genéticos antes de tratar",
        "Ácido valproico y control del EEG en 3 meses"
      ],
      "correct": 0,
      "whyCorrect": "Espasmos epilépticos más hipsarritmia más regresión del neurodesarrollo es el síndrome de West, una urgencia neurológica: el tratamiento debe iniciarse idealmente en los primeros 7 días, con prednisolona o ACTH y vigabatrina. El pronóstico depende de la etiología, pero no se espera a conocerla para tratar.",
      "pearl": "West: espasmos en salvas + hipsarritmia + regresión. Inicio usual entre 3 y 12 meses. Tratar en 7 días.",
      "trap": "Confundir los espasmos con cólicos o reflujo, o dar un bloqueador de canales de sodio.",
      "cita": [
        {
          "donde": "Epilepsia en pediatría: Aspectos claves para su abordaje y tratamiento",
          "texto": "Síndrome de West: triada de espasmos epilépticos+hipsarritmia en el EEG+ compromiso del neurodesarrollo."
        },
        {
          "donde": "Epilepsia en pediatría: Aspectos claves para su abordaje y tratamiento",
          "texto": "Urgencia neurológica: Inicio de tratamiento idealmente en los primeros 7 días. Prednisolona o ACTH y vigabatrina."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c15",
      "topic": "Hematología · Anemia de células falciformes",
      "difficulty": "dificil",
      "src": "udea_ped26",
      "vignette": "Niño de 7 años con anemia de células falciformes, asintomático, en su control anual. La ecografía Doppler transcraneal muestra una <span class='hy'>velocidad de 195 cm/s en la arteria cerebral media</span>. Examen neurológico normal. ¿Qué sigue?",
      "options": [
        "Resonancia o angiorresonancia y repetir el Doppler en una semana",
        "Repetir el Doppler en un año, porque está asintomático y sin déficit",
        "Iniciar ácido acetilsalicílico y control en 3 meses",
        "Hidroxiurea y repetir el Doppler en 6 meses"
      ],
      "correct": 0,
      "whyCorrect": "Un Doppler transcraneal anormal (más de 180 cm/s en carótida interna o cerebral media) obliga a pedir resonancia o angiorresonancia preferente y a repetir el Doppler en una semana. Si se confirma, hematología evalúa el régimen hipertransfusional para prevenir el ictus.",
      "pearl": "Doppler transcraneal anual de los 2 a los 16 años. < 150 cm/s normal; 150 a 180 condicional (repetir en 3 meses); > 180 anormal.",
      "trap": "Tranquilizarse porque el niño está asintomático: el Doppler sirve justamente para prevenir el primer ictus.",
      "cita": [
        {
          "donde": "Enfermedad de células falciforme, más allá de la urgencia",
          "texto": "Se recomienda realizar la ecografía Doppler transcraneal (EcoDTC) anual a todos los pacientes desde los 2 hasta los 16 años"
        },
        {
          "donde": "Enfermedad de células falciforme, más allá de la urgencia",
          "texto": "Anormal: >180 cm/seg en alguna medición en carótida interna o cerebral media. Se debe solicitar RM/Angio RM preferente y repetir DTC en 1 semana."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c16",
      "topic": "Nutrición · Alimentación complementaria",
      "difficulty": "basica",
      "src": "udea_ped26",
      "vignette": "Lactante de 6 meses, sano, que va a iniciar la alimentación complementaria. La madre no quiere darle huevo porque al hijo de una amiga «le produjo un brote». <span class='hy'>No hay antecedentes de alergia</span> en la familia. ¿Qué le recomiendas?",
      "options": [
        "Esperar hasta el año para dar huevo, cuando el intestino ya madura",
        "Pedir pruebas de alergia antes de dar huevo",
        "Dar solo la clara después de los 2 años",
        "Incluir huevo cocido desde ya, al menos 2 veces por semana"
      ],
      "correct": 3,
      "whyCorrect": "La introducción temprana y regular de alérgenos es segura y promueve la tolerancia; no debe retrasarse. Huevo cocido, pescado y maní pueden darse desde que se inicia la alimentación complementaria, con exposición frecuente, al menos dos veces por semana.",
      "pearl": "Alérgenos: no retrasar. La exposición frecuente mantiene la tolerancia.",
      "trap": "Retrasar el huevo «por seguridad»: aumenta el riesgo de alergia en lugar de reducirlo.",
      "cita": [
        {
          "donde": "Fundamentos de la alimentación complementaria: estableciendo las bases para una vida saludable",
          "texto": "La introducción temprana y el consumo regular de alérgenos alimentarios se ha demostrado que es seguro y promueve el desarrollo de la tolerancia. La introducción de alimentos potencialmente alergénicos no debe retrasarse."
        },
        {
          "donde": "Fundamentos de la alimentación complementaria: estableciendo las bases para una vida saludable",
          "texto": "La exposición debe ser frecuente, al menos dos veces a la semana"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c17",
      "topic": "Infecciones perinatales · Citomegalovirus congénito",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Recién nacido de 5 días con microcefalia, ictericia, hepatoesplenomegalia, petequias y trombocitopenia. La ecografía transfontanelar muestra <span class='hy'>calcificaciones periventriculares</span>. ¿Cómo confirmas el diagnóstico y cómo lo tratas?",
      "options": [
        "IgM para CMV a los 2 meses; sin tratamiento antiviral",
        "PCR para CMV en saliva; aciclovir intravenoso por 14 días",
        "PCR para CMV en orina antes de los 21 días; valganciclovir por 6 meses",
        "Serología materna para CMV y ganciclovir intravenoso solo si aparece hipoacusia"
      ],
      "correct": 2,
      "whyCorrect": "El diagnóstico de CMV congénito se hace con PCR antes de los 21 días de vida, para diferenciarlo de la infección postnatal; la PCR en orina es la prueba de elección. Un recién nacido sintomático o con compromiso del sistema nervioso central recibe valganciclovir oral o ganciclovir intravenoso por 6 meses, lo que reduce la progresión de la hipoacusia.",
      "pearl": "CMV congénito: microcefalia, calcificaciones periventriculares, hepatoesplenomegalia y trombocitopenia. La PCR en saliva sirve de tamizaje, pero se confirma en orina.",
      "trap": "Diagnosticar después de los 21 días: ya no se puede distinguir de una infección adquirida después del parto.",
      "cita": [
        {
          "donde": "Claves diagnósticas en infecciones perinatales: enfoque sindromático: SCORTCH",
          "texto": "El diagnóstico definitivo se realiza mediante PCR antes de los 21 días de vida, para diferenciar infección congénita de postnatal. La PCR en orina es la prueba de elección por su alta sensibilidad y especificidad"
        },
        {
          "donde": "Claves diagnósticas en infecciones perinatales: enfoque sindromático: SCORTCH",
          "texto": "El tratamiento antiviral se reserva para recién nacidos sintomáticos o con compromiso del sistema nervioso central, con valganciclovir oral o ganciclovir intravenoso durante seis meses"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c18",
      "topic": "Neonatología · Tamizaje neonatal ampliado",
      "difficulty": "basica",
      "src": "res117_26",
      "vignette": "Recién nacido a término, sano, que va a salir de alta a las <span class='hy'>20 horas de vida</span>. La madre pregunta cuándo deben tomarle la muestra de sangre del talón para el tamizaje neonatal ampliado. ¿Qué le respondes?",
      "options": [
        "Ahora mismo, antes de salir, para no perder la oportunidad",
        "De la sangre del cordón, que ya se tomó al nacer",
        "Entre las 48 y 72 horas de vida, cuando ya haya comido",
        "Al mes de vida, en el primer control"
      ],
      "correct": 2,
      "whyCorrect": "La muestra de talón del tamizaje endocrino metabólico se toma idealmente entre las 48 y 72 horas de vida, ya alimentado: una sola muestra en papel filtro para las 7 patologías. Si en un parto vaginal no se puede garantizar ese momento, se puede tomar desde las 24 horas con tres tomas completas de alimentación, registrando el motivo. A las 20 horas aún es muy pronto.",
      "pearl": "Resolución 117 de 2026: talón ideal a las 48–72 h; excepción desde las 24 h con 3 tomas completas; tiempo máximo, 5 días de vida (la fenilalanina acumulada daña el cerebro). La sangre de cordón se usa para la TSH (hipotiroidismo congénito).",
      "trap": "Tomar la muestra antes del alta temprana «por comodidad»: puede no detectar la enfermedad.",
      "cita": [
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Toma de muestra",
          "texto": "La toma de la muestra de tamizaje neonatal endocrino metabólico básico debe realizarse mediante punción capilar de talón idealmente entre las 48 y 72 horas de vida (una muestra en papel filtro para procesar las pruebas de las 7 patologías)"
        },
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Toma de muestra",
          "texto": "se podrá tomar la muestra de sangre de talón si se cumplen las siguientes condiciones: mínimo 24 horas del nacimiento y tres tomas completas de alimentación"
        }
      ],
      "verificado": "2026-11-23",
      "tipo": "datos"
    },
    {
      "id": "ped-c19",
      "topic": "Cardiología · El atleta pediátrico",
      "difficulty": "basica",
      "src": "udea_ped26",
      "vignette": "Nadador de 12 años que entrena 10 horas por semana. En el club le encuentran <span class='hy'>frecuencia cardiaca en reposo de 59 lpm</span>. No tiene síntomas, el examen físico es normal y el ECG solo muestra bradicardia sinusal. ¿Cuál es la conducta?",
      "options": [
        "Suspender el deporte hasta tener un Holter de 24 horas",
        "Pedir ecocardiograma y prueba de esfuerzo antes de seguir",
        "Dar el aval: es una adaptación al entrenamiento",
        "Remitir a electrofisiología por enfermedad del nodo sinusal"
      ],
      "correct": 2,
      "whyCorrect": "La bradicardia sinusal es un hallazgo frecuente en atletas con alto volumen de entrenamiento. Con interrogatorio y examen físico normales y un ECG sin otras alteraciones, se da el aval para continuar. Impedir el deporte por este hallazgo es un error común.",
      "pearl": "Cambios esperados en el ECG del atleta: bradicardia sinusal, repolarización precoz, bloqueo AV de primer grado, bloqueo incompleto de rama derecha y voltaje de hipertrofia del VI.",
      "trap": "Restringir el deporte por una bradicardia aislada en un niño asintomático y entrenado.",
      "cita": [
        {
          "donde": "Tamizaje cardiovascular en el niño deportista",
          "texto": "Los cambios eléctricos inducidos por el ejercicio que se observan comúnmente en atletas pediátricos incluyen intervalos PR más largos y una mayor prevalencia de bradicardia sinusal, repolarización precoz, bloqueo auriculoventricular de primer grado, bloqueo incompleto de rama derecha y criterios de voltaje de hipertrofia del ventrículo izquierdo"
        },
        {
          "donde": "Tamizaje cardiovascular en el niño deportista",
          "texto": "este paciente tiene una bradicardia sinusal, el cual es uno de los hallazgos que normalmente se encuentran en atletas con alto volumen de entrenamiento"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c20",
      "topic": "Neurología · Convulsión febril simple",
      "difficulty": "basica",
      "src": "udea_neuro26",
      "vignette": "Niña de 18 meses con fiebre de 39 °C por un resfriado. Tuvo una <span class='hy'>crisis tónico-clónica generalizada de 2 minutos</span>, única, y a los 30 minutos está alerta, juega y el examen neurológico es normal. ¿Qué estudios pides?",
      "options": [
        "Electroencefalograma y resonancia cerebral ambulatorios",
        "Punción lumbar de rutina por la edad",
        "Hemograma, electrolitos y glucemia de rutina",
        "Ninguno de rutina: observar y educar a la familia"
      ],
      "correct": 3,
      "whyCorrect": "Es una convulsión febril simple. Con buen estado general y recuperación completa no se indican de rutina análisis de sangre, neuroimagen ni electroencefalograma: no cambian el manejo ni predicen recurrencia o epilepsia. Se observa al menos 6 horas y se educa a la familia.",
      "pearl": "Convulsión febril simple: observar mínimo 6 horas (las complejas, hasta 24). Riesgo de meningitis cerca del 3 %, y del 9 % en las complejas.",
      "trap": "Pedir EEG o neuroimagen «para descartar epilepsia»: no la predicen y generan costos y ansiedad.",
      "cita": [
        {
          "donde": "Convulsiones febriles",
          "texto": "en un niño con convulsión febril simple, buen estado general y recuperación completa, no se indican de rutina análisis de sangre, neuroimagen ni electroencefalograma"
        },
        {
          "donde": "Convulsiones febriles",
          "texto": "Aunque el riesgo de meningitis bacteriana en una convulsión febril simple es bajo (aproximadamente 3%), este riesgo aumenta hasta cerca del 9% en las convulsiones febriles complejas."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "ped-c21",
      "topic": "Neurología · Perímetro cefálico",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Lactante de 5 meses cuyo perímetro cefálico estaba en el percentil 25 y hoy está en el <span class='hy'>percentil 90</span>, con <span class='hy'>fontanela abombada</span>. El desarrollo va bien. ¿Qué haces?",
      "options": [
        "Tranquilizar: el percentil 90 es normal",
        "Solo pedir el perímetro cefálico de los padres",
        "Medir de nuevo en 6 meses",
        "Neuroimagen (ecografía transfontanelar o RM)"
      ],
      "correct": 3,
      "whyCorrect": "Lo alarmante es la trayectoria, no el valor aislado: cruzar dos o más líneas de percentil indica que se sobrepasaron los mecanismos de compensación del volumen intracraneal. Con fontanela abombada hay que estudiar con neuroimagen; la ecografía transfontanelar tamiza ventriculomegalia.",
      "pearl": "Un crecimiento estable, aunque sea en percentiles altos o bajos, suele ser tranquilizador; la microcefalia es un perímetro por debajo del percentil 3.",
      "trap": "Quedarse tranquilo porque el valor está dentro del rango normal.",
      "cita": [
        {
          "donde": "El perímetro cefálico en la práctica pediátrica",
          "texto": "Un perímetro cefálico que se desvía de la curva de crecimiento del paciente (p. ej., cruzar dos o más líneas de percentil) es a menudo el signo de alarma más significativo que una medición aislada en un percentil bajo o alto"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c22",
      "topic": "Dolor · Analgesia en dolor intenso",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Niño de 7 años con <span class='hy'>fractura desplazada de antebrazo</span>; en la escala numérica califica el dolor en <span class='hy'>9/10</span>. ¿Qué analgesia indicas?",
      "options": [
        "Codeína oral cada 6 horas",
        "Solo acetaminofén y esperar a yesar",
        "Tramadol oral como opioide de elección",
        "Acceso venoso y morfina titulada"
      ],
      "correct": 3,
      "whyCorrect": "En dolor moderado a intenso se canaliza una vena y se titulan opioides potentes: la morfina es la primera elección. Los beneficios de los opioides potentes superan a los «débiles»; la codeína tiene problemas de seguridad por su metabolismo variable y el tramadol tiene poca evidencia en niños.",
      "pearl": "La escala numérica sirve desde los 7 a 8 años; en menores o no verbales, la FLACC o las caras.",
      "trap": "Usar codeína por creerla más segura en niños.",
      "cita": [
        {
          "donde": "Manejo multimodal del dolor agudo en pediatría: De la teoría a la práctica",
          "texto": "La diferencia con la estrategia de tres peldaños radica en que hay estudios demuestran que los beneficios de los opioides potentes superan a los de potencia intermedia o “débiles”, como la codeína o tramadol (7)."
        },
        {
          "donde": "Manejo multimodal del dolor agudo en pediatría: De la teoría a la práctica",
          "texto": "La morfina es el opioide potente recomendado como primera elección en caso de dolor moderado a grave"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c23",
      "topic": "Trauma · Choque hipovolémico en niños",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Niño de 6 años tras atropello. <span class='hy'>FC 150, llenado capilar de 4 segundos, pulsos distales débiles</span>; PA 98/60 mmHg (normal para la edad). ¿Cómo lo interpretas?",
      "options": [
        "Choque compensado: la hipotensión es tardía",
        "Estable, porque la presión es normal",
        "Taquicardia solo por dolor y ansiedad",
        "Choque descompensado que ya requiere vasoactivos"
      ],
      "correct": 0,
      "whyCorrect": "En niños la taquicardia y la mala perfusión distal son signos tempranos de hipovolemia; la hipotensión y la oliguria son tardías. Esperar a la hipotensión es llegar tarde.",
      "pearl": "Ácido tranexámico en las primeras 3 horas: 15 mg/kg (máximo 1 g) y luego 2 mg/kg/h por 8 horas.",
      "trap": "Descartar el choque porque la presión es normal.",
      "cita": [
        {
          "donde": "Politrauma en pediatría un abordaje inicial más allá del reconocimiento",
          "texto": "En los niños la taquicardia y la disminución de la perfusión distal son signos tempranos de hipovolemia, otro signo sutil es la disminución progresiva de los pulsos periféricos, entre los signos tardíos se encuentra la hipotensión y la reducción del gasto urinario (Tabla 8)."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c24",
      "topic": "Trauma · Ácido tranexámico en niños",
      "difficulty": "dificil",
      "src": "udea_ped26",
      "vignette": "Niña de 8 años, <span class='hy'>25 kg</span>, con trauma abdominal y hemorragia; lleva <span class='hy'>1 hora</span> del evento. ¿Qué dosis de ácido tranexámico?",
      "options": [
        "1 g fijo en bolo, igual que en los adultos",
        "Solo si ya pasaron más de 3 horas del trauma",
        "No se usa en menores de 12 años por riesgo de convulsiones",
        "375 mg y luego 50 mg/h por 8 horas"
      ],
      "correct": 3,
      "whyCorrect": "En las primeras 3 horas: 15 mg/kg (máximo 1 g) → 375 mg, y luego 2 mg/kg/h por 8 horas → 50 mg/h.",
      "pearl": "Glóbulos rojos 10 a 20 mL/kg; en hemorragia masiva, proporción 1:1:1 con plasma y plaquetas.",
      "trap": "Dar la dosis fija de adulto o usarlo después de 3 horas.",
      "cita": [
        {
          "donde": "Politrauma en pediatría un abordaje inicial más allá del reconocimiento",
          "texto": "Otra medida para prevenir la coagulopatía asociada a trauma es el uso de ácido tranexámico en las primeras 3 horas del trauma, a una dosis 15mg/kg (máx. 1 gr) y continuar con 2 mg/kg/h por 8 horas."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c25",
      "topic": "Cuidado crítico · Delirium",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Niño de 4 años en UCI, día 5 de ventilación con midazolam, está <span class='hy'>agitado, desconectado y con sueño invertido</span>; la escala CAPD es positiva. ¿Cuál es la medida inicial?",
      "options": [
        "Tratar la causa y medidas no farmacológicas",
        "Aumentar el midazolam para sedarlo más profundamente",
        "Haloperidol IV de entrada a todos los niños con CAPD positiva",
        "Quetiapina como primera línea con eficacia probada en niños"
      ],
      "correct": 0,
      "whyCorrect": "Lo primero es tratar la causa (incluida la revisión de medicamentos como las benzodiacepinas) y aplicar medidas no farmacológicas: más del 80 % de los niños responden a ellas. Los antipsicóticos quedan para casos refractarios; su eficacia en niños no está establecida.",
      "pearl": "Las benzodiacepinas, los opioides, los anticolinérgicos y los corticoides favorecen el delirium.",
      "trap": "Subir la benzodiacepina, que perpetúa el delirium.",
      "cita": [
        {
          "donde": "Delirium en pediatría: Detección temprana y manejo eficaz",
          "texto": "La medida inicial para el manejo del delirium es tratar la etiología de este y la aplicación de medidas no farmacológicas."
        },
        {
          "donde": "Delirium en pediatría: Detección temprana y manejo eficaz",
          "texto": "Más del 80 % de los niños con delirium responden a las intervenciones no farmacológicas."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c26",
      "topic": "Hematología · Anemia ferropénica",
      "difficulty": "basica",
      "src": "udea_ped26",
      "vignette": "Niña de 2 años con palidez. Hb <span class='hy'>9,2 g/dL, VCM 68 fL, RDW aumentado</span>, reticulocitos bajos y <span class='hy'>ferritina 8 ng/mL</span>. Sin pérdidas de sangre. ¿Qué indicas?",
      "options": [
        "Hierro elemental oral 3 mg/kg/día y orientación nutricional",
        "Transfusión de glóbulos rojos a 10 mL/kg hoy mismo",
        "Electroforesis de hemoglobina para descartar talasemia antes de tratar",
        "Hierro IV de entrada para corregir más rápido el déficit"
      ],
      "correct": 0,
      "whyCorrect": "Es anemia microcítica hipocrómica por déficit de hierro (ferritina baja). Se trata con hierro elemental oral a 3 mg/kg/día y orientación nutricional, con control a los 3 meses.",
      "pearl": "Un RDW aumentado apoya la ferropenia: la anisocitosis es típica.",
      "trap": "Transfundir a una niña estable o pedir estudios de talasemia antes de tratar una ferropenia clara.",
      "cita": [
        {
          "donde": "Lectura sistemática del hemograma",
          "texto": "Con estos hallazgos se confirma anemia microcítica hipocrómica compatible con ferropenia. Se solicita ferritina sérica, que resulta disminuida (8 ng/mL), y se descartan pérdidas sanguíneas evidentes."
        },
        {
          "donde": "Lectura sistemática del hemograma",
          "texto": "La paciente inicia tratamiento con suplementación oral de hierro elemental a dosis de 3 mg/kg/día y orientación nutricional."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c27",
      "topic": "Dermatología · Acné",
      "difficulty": "basica",
      "src": "udea_ped26",
      "vignette": "Adolescente de 15 años con <span class='hy'>acné inflamatorio moderado</span> en la cara. Otro médico le dejó <span class='hy'>clindamicina tópica sola</span> hace 4 meses. ¿Qué cambias?",
      "options": [
        "Nada: seguir con la clindamicina sola otros 6 meses",
        "Isotretinoína oral de inmediato, sin pasar por tópicos",
        "Agregar peróxido de benzoilo o un retinoide",
        "Cambiar a eritromicina tópica sola por resistencia"
      ],
      "correct": 2,
      "whyCorrect": "Los antibióticos tópicos solo se usan combinados con peróxido de benzoilo o un retinoide, para reducir la resistencia bacteriana. El peróxido no genera resistencia. Los retinoides son el pilar del mantenimiento.",
      "pearl": "La terapia sistémica es para acné moderado a severo, noduloquístico o resistente a los tópicos.",
      "trap": "Dejar un antibiótico tópico en monoterapia por meses.",
      "cita": [
        {
          "donde": "Acné en pediatría",
          "texto": "Antibióticos tópicos (clindamicina, eritromicina): indicados solo en combinación con peróxido de benzoilo o algún retinoide para reducir resistencia bacteriana."
        },
        {
          "donde": "Acné en pediatría",
          "texto": "Recomendación clave: evitar el uso prolongado de antibióticos tópicos en monoterapia, y mantener los retinoides como pilar de mantenimiento post-tratamiento activo."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c28",
      "topic": "Neumología · Lesión pulmonar por vapeo",
      "difficulty": "residencia",
      "src": "udea_ped26",
      "vignette": "Adolescente de 17 años que <span class='hy'>vapea cartuchos de THC</span>, con tos, dolor torácico, disnea, fiebre y vómito de una semana. Opacidades bilaterales y saturación de 89 %. Sin otra causa. ¿Qué es lo indispensable del manejo?",
      "options": [
        "Azitromicina por neumonía atípica, sin preguntar más",
        "Esperar el cultivo antes de cualquier medida",
        "Broncodilatador y alta ambulatoria",
        "Soporte, oxígeno y suspender ya el vapeo"
      ],
      "correct": 3,
      "whyCorrect": "Es una probable EVALI, ligada sobre todo al acetato de vitamina E de cartuchos de THC. El manejo es de soporte con oxígeno; en los graves, corticoides y ventilación. Suspender de inmediato el vapeo es indispensable.",
      "pearl": "Los síntomas son inespecíficos (respiratorios, fiebre y gastrointestinales), por eso hay que preguntar por el vapeo.",
      "trap": "No preguntar por el vapeo ante una neumonitis en un adolescente.",
      "cita": [
        {
          "donde": "Vapeadores en Pediatría: un fenómeno emergente",
          "texto": "El tratamiento para EVALI es principalmente de soporte, e incluye oxígeno suplementario y en los casos más graves, se ha recurrido al uso de corticosteroides sistémicos y soporte ventilatorio mecánico, además es indispensable, la suspensión inmediata del uso de vapeadores (14)."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c29",
      "topic": "Cardiología · Falla cardíaca aguda",
      "difficulty": "dificil",
      "src": "udea_ped26",
      "vignette": "Niña de 5 años con miocarditis probable: <span class='hy'>crépitos bibasales, hepatomegalia e ingurgitación yugular</span>, pero extremidades tibias y buen llenado capilar. ¿Qué terapia requiere primero?",
      "options": [
        "Bolos de cristaloides de 20 mL/kg",
        "Dobutamina de entrada por ser miocarditis",
        "Diurético (furosemida)",
        "Antibiótico empírico por posible sepsis"
      ],
      "correct": 2,
      "whyCorrect": "Perfil «caliente y húmedo»: perfusión conservada con congestión. Requiere diurético. Los perfiles fríos tienen peor pronóstico y pueden necesitar inotrópicos.",
      "pearl": "Toma BNP o proBNP al ingreso para seguir la respuesta; la troponina, si sospechas miocarditis.",
      "trap": "Dar bolos de líquidos a un niño congestivo por confundirlo con sepsis.",
      "cita": [
        {
          "donde": "Del diagnóstico a la estabilización: enfoque inicial de falla cardíaca aguda en el paciente pediátrico",
          "texto": "Los pacientes “calientes y secos” pueden manejarse ambulatoriamente; los “calientes y húmedos” van a requerir terapia diurética"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "ped-c30",
      "topic": "Neonatología · Cardiopatía congénita: tamizaje con pulsooximetría",
      "difficulty": "dificil",
      "src": "res117_26",
      "vignette": "Recién nacido de 26 horas, sano, en Bogotá (2.600 m s. n. m.). Pulsooximetría: <span class='hy'>preductal 93 %, postductal 92 %</span>. ¿Cómo se interpreta el tamizaje de cardiopatía congénita compleja?",
      "options": [
        "Positivo: está por debajo de 95 %, el corte que fija la norma",
        "Repetir en una hora: la diferencia de 1 % es dudosa",
        "Negativo: sobre 92 % a esa altitud y diferencia menor de 4 %",
        "Positivo: requiere ecocardiograma antes del alta"
      ],
      "correct": 2,
      "whyCorrect": "Por encima de 1.500 m s. n. m. el punto de corte es 92 % (95 % por debajo). Con 92–93 % y una diferencia pre-postductal menor de 4 %, el tamizaje es negativo. Es positivo si la saturación es menor de 90 % en cualquier momento, o si la diferencia es de 4 % o más en la medición repetida.",
      "pearl": "Un tamizaje negativo no descarta del todo una cardiopatía congénita: si hay signos clínicos, se estudia igual.",
      "trap": "Usar el corte de 95 % del nivel del mar en una ciudad de altura.",
      "cita": [
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Tamizaje de cardiopatía congénita compleja",
          "texto": "El niño o la niña presente una saturación mayor o igual al punto de corte según la altitud en la primera o en la segunda medición (95% por debajo de los 1.500 m.s.n.m. y 92% por encima de los 1.500 m.s.n.m.) y no tenga una diferencia de 4% o más entre la pulsooximetría pre y postductal en ninguna de las mediciones"
        },
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Tamizaje de cardiopatía congénita compleja",
          "texto": "El resultado del tamizaje será positivo cuando: 1) El niño o la niña presente una saturación menor a 90% en cualquier momento del tamizaje y a cualquier altitud, y 2) Cuando presente una diferencia de 4% o más entre la pulsooximetría pre y postductal (independiente de cuál sea la mayor) en la medición repetida y a cualquier altitud."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c31",
      "topic": "Neonatología · Hipotiroidismo congénito",
      "difficulty": "residencia",
      "src": "res117_26",
      "vignette": "Recién nacido a término de 60 horas. El tamizaje de talón reporta <span class='hy'>TSH de 14 µUI/mL</span>. Está asintomático. ¿Qué sigue?",
      "options": [
        "Nada: el corte en el talón es 20 µUI/mL",
        "Repetir el talón al mes de vida",
        "Levotiroxina sin más pruebas por el riesgo",
        "TSH y T4 libre en suero para confirmar"
      ],
      "correct": 3,
      "whyCorrect": "En el recién nacido a término, una TSH de talón mayor de 10 µUI/mL (mayor de 6 en el prematuro) es un caso probable de hipotiroidismo congénito. El diagnóstico se confirma con TSH y T4 libre en suero (sangre venosa o arterial).",
      "pearl": "Cortes del tamizaje: cordón ≥ 15 µUI/mL; talón > 10 en el término y > 6 en el prematuro.",
      "trap": "Tranquilizarse porque el bebé está asintomático: el hipotiroidismo congénito casi nunca da síntomas al nacer.",
      "cita": [
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Definiciones",
          "texto": "o 6 uUI/ml en muestra de sangre de talón en RN prematuros y > 10 uUI/ml en muestra de sangre de talón en RN a término), los cuales son considerados casos probables de hipotiroidismo congénito."
        },
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Definiciones",
          "texto": "Diagnóstico de hipotiroidismo congénito: evaluación de los niveles de TSH y de T4L en muestra de suero (de sangre venosa o arterial)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c32",
      "topic": "Neonatología · Fenilcetonuria: plazo del tamizaje de talón",
      "difficulty": "basica",
      "src": "res117_26",
      "vignette": "Una madre llega con su bebé de 4 días: salieron del hospital antes de tomar la muestra de talón. ¿Qué le dices sobre el plazo?",
      "options": [
        "Ya no sirve: pasaron las 72 horas que fija la norma",
        "Basta con la TSH del cordón que se tomó al nacer",
        "Esperar al control del mes para tomarla con las vacunas",
        "Tomarla hoy: el máximo son 5 días de vida"
      ],
      "correct": 3,
      "whyCorrect": "El tamizaje básico se toma idealmente entre las 48 y 72 horas, pero el tiempo máximo es de 5 días de vida: la fenilalanina acumulada en la fenilcetonuria puede causar daño neurológico irreversible desde muy temprano. Con una sola muestra se tamizan 7 patologías.",
      "pearl": "Las 7 del tamizaje básico: hipotiroidismo congénito, fenilcetonuria, galactosemia, fibrosis quística, hiperplasia suprarrenal congénita, déficit de biotinidasa y defectos de la hemoglobina.",
      "trap": "Creer que la TSH del cordón cubre el tamizaje: solo mira el hipotiroidismo.",
      "cita": [
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Fenilcetonuria",
          "texto": "El tiempo máximo para la toma de la muestra debe ser de 5 días de vida, dado que el acumulo de fenilalanina por deficiencia enzimática puede generar daño neurológico irreversible desde etapas muy tempranas."
        },
        {
          "donde": "Resolución 117 de 2026, Anexo Técnico · Tamizaje endocrino metabólico básico",
          "texto": "hipotiroidismo congénito, fenilcetonuria, galactosemia, fibrosis quística, hiperplasia suprarrenal congénita, déficit de biotinidasa o defectos de la hemoglobina"
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c33",
      "topic": "Neumología · Neumonía: tratamiento ambulatorio",
      "difficulty": "residencia",
      "src": "pir_nac26",
      "vignette": "Niña de 3 años, vacunada, con 3 días de fiebre, tos y taquipnea; crépitos en la base derecha. SatO₂ 95 %, sin tirajes, come bien. Se maneja en casa. ¿Qué antibiótico y por cuánto tiempo?",
      "options": [
        "Amoxicilina 40 mg/kg/día en 3 dosis por 10 días completos",
        "Amoxicilina 90 mg/kg/día en 2 dosis, 3 a 5 días si mejora",
        "Azitromicina 5 días como primera línea a esta edad",
        "Ceftriaxona IM diaria por 3 días en casa y luego oral"
      ],
      "correct": 1,
      "whyCorrect": "La amoxicilina en dosis alta (90 mg/kg/día) es el estándar para la neumonía adquirida en la comunidad, para superar la resistencia del neumococo. En mayores de 6 meses que mejoran, un curso corto de 3 a 5 días no es inferior a 10 días y reduce la exposición a antibióticos.",
      "pearl": "En menores de 2 años más del 80 % de las neumonías son virales; el VSR es el germen más común en menores de 5.",
      "trap": "Elegir azitromicina en una preescolar: los atípicos se consideran en mayores de 5 años.",
      "cita": [
        {
          "donde": "Pediatrics in Review 2026, Pneumonia · Tratamiento",
          "texto": "High-dose amoxicillin (90 mg/kg/d) has been the standard treatment dose for CAP with the intention to overcome S. pneumoniae resistance."
        },
        {
          "donde": "Pediatrics in Review 2026, Pneumonia · Tratamiento",
          "texto": "In patients older than age 6 months who are improving with amoxicillin, a shorter course of 3 to 5 days is noninferior to a 10-day regimen for clinical response, treatment failure, or readmissions, and reduces antibiotic exposure and, possibly, resistance."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c34",
      "topic": "Neumología · Neumonía atípica",
      "difficulty": "residencia",
      "src": "pir_nac26",
      "vignette": "Niño de 9 años con 10 días de tos seca, cefalea, malestar y febrícula; crépitos difusos bilaterales. Está estable y se maneja en casa. Se sospecha <span class='hy'>Mycoplasma pneumoniae</span>. ¿Qué indicas?",
      "options": [
        "Amoxicilina en dosis alta y control en 48 horas",
        "Amoxicilina más azitromicina siempre juntas para cubrir todo",
        "Azitromicina sola, con prueba confirmatoria si hay",
        "Levofloxacino oral por 7 días por ser la mejor cobertura"
      ],
      "correct": 2,
      "whyCorrect": "Si hay sospecha clínica de atípicos en mayores de 5 años, se considera cubrirlos: la azitromicina se da como agente único, con prueba confirmatoria cuando esté disponible.",
      "pearl": "Atípicos: Mycoplasma pneumoniae, Chlamydia pneumoniae, Legionella.",
      "trap": "Sumar siempre amoxicilina y azitromicina «por si acaso».",
      "cita": [
        {
          "donde": "Pediatrics in Review 2026, Pneumonia · Tratamiento",
          "texto": "recommended to consider coverage for atypical pathogens, such as Mycoplasma pneumoniae, if clinical suspicion is present in children over age 5 years. Azithromycin should be prescribed as a single agent in these cases with conﬁrmatory testing when available (Table 6)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c35",
      "topic": "Neumología · Neumonía: estudios",
      "difficulty": "basica",
      "src": "pir_nac26",
      "vignette": "Niño de 4 años, con vacunas completas, con neumonía clínica no grave que se tratará en casa. La madre pide radiografía y exámenes de sangre «para estar seguros». ¿Qué le explicas?",
      "options": [
        "Que la radiografía es obligatoria para diagnosticar",
        "Que no se necesitan de rutina en el manejo en casa",
        "Que se necesita procalcitonina para decidir el antibiótico",
        "Que hay que hacer hemograma y PCR en todos"
      ],
      "correct": 1,
      "whyCorrect": "En el niño que se maneja ambulatoriamente, la radiografía de tórax no es necesaria para confirmar la neumonía, y el hemograma, la PCR y la procalcitonina no se recomiendan de rutina en el niño vacunado. El diagnóstico es clínico.",
      "pearl": "La radiografía de control tampoco se pide de rutina: solo si la neumonía es recurrente o persistente, o se sospecha una anomalía anatómica.",
      "trap": "Pedir radiografía y laboratorios a todo niño con neumonía no complicada.",
      "cita": [
        {
          "donde": "Pediatrics in Review 2026, Pneumonia · Diagnóstico",
          "texto": "routine chest radiographs (CXR) are not necessary for the conﬁrmation of pneumonia in patients treated in the outpatient setting."
        },
        {
          "donde": "Pediatrics in Review 2026, Pneumonia · Diagnóstico",
          "texto": "Routine measurement of complete blood cell count (CBC) and acute-phase reactants such as C-reactive protein (CRP) and procalcitonin (PCT) are not recommended in fully immunized children with suspected CAP who are candidates for outpatient management."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c36",
      "topic": "Neumología · Asma: salbutamol solo",
      "difficulty": "residencia",
      "src": "gina26",
      "vignette": "Niño de 8 años con asma: síntomas 2 a 3 veces al mes, que alivia solo con salbutamol inhalado; nunca ha usado corticoide inhalado. ¿Qué cambias?",
      "options": [
        "Nada: con síntomas leves basta el salbutamol cuando lo necesite",
        "Agregar corticoide inhalado: el salbutamol solo no se recomienda",
        "Montelukast diario en lugar del salbutamol a demanda",
        "Prednisolona oral en cada crisis, sin corticoide inhalado diario"
      ],
      "correct": 1,
      "whyCorrect": "GINA no recomienda tratar el asma solo con SABA en adultos, adolescentes ni niños de 6 a 11 años: frente a cualquier corticoide inhalado, el SABA solo aumenta el riesgo de muerte por asma y de atención urgente. En niños de 5 a 15 años, budesonida-formoterol a demanda redujo casi a la mitad las crisis frente al SABA solo (estudio CARE).",
      "pearl": "Todo asmático necesita corticoide inhalado, aunque los síntomas sean leves.",
      "trap": "Considerar el asma «leve» como asma que no necesita antiinflamatorio.",
      "cita": [
        {
          "donde": "GINA 2026 · Tratamiento",
          "texto": "SABA-only treatment is not recommended by GINA for adults, adolescents or children 6–11 years with asthma."
        },
        {
          "donde": "GINA 2026 · Novedades",
          "texto": "Results from the CARE study, in children 5–15 years who were using SABA alone, demonstrated that low-dose budesonide-formoterol, used as-needed for symptom relief, reduced the risk of moderate-severe exacerbations by nearly half, compared with SABA alone."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c37",
      "topic": "Neonatología · Sepsis neonatal temprana",
      "difficulty": "residencia",
      "src": "nrdp_sepsisneo26",
      "vignette": "Recién nacido de 30 horas, hijo de madre con <span class='hy'>ruptura de membranas de 26 horas y fiebre intraparto</span>. Está hipoactivo, succiona mal y tiene 38,4 °C. ¿Cómo la clasificas y qué empiezas?",
      "options": [
        "Tardía: cefalexina oral ambulatoria y control en 48 horas",
        "Temprana: hemocultivo y ampicilina más gentamicina",
        "Temprana: solo observación clínica por 48 horas sin antibiótico",
        "Tardía: ceftriaxona sola sin tomar antes el hemocultivo"
      ],
      "correct": 1,
      "whyCorrect": "La sepsis neonatal temprana aparece en las primeras 72 horas por transmisión vertical (de la madre); la tardía, después de las 72 horas, por transmisión horizontal. El hemocultivo sigue siendo el patrón de oro, y el esquema empírico clásico es ampicilina (o penicilina) más gentamicina.",
      "pearl": "En el mundo, tanto en la temprana como en la tardía predominan los gramnegativos resistentes: el esquema se ajusta a la epidemiología local.",
      "trap": "Esperar a que el hemocultivo salga positivo para iniciar el antibiótico en un neonato sintomático.",
      "cita": [
        {
          "donde": "Nature Reviews Disease Primers 2026, Neonatal sepsis",
          "texto": "EONS occurs with vertical pathogen transfer (mother to infant) within 72 h of birth and LONS arises from horizontal pathogen transfer from the environment or caregivers after 72 h."
        },
        {
          "donde": "Nature Reviews Disease Primers 2026, Neonatal sepsis",
          "texto": "Traditional empirical antibiotic regimens are based on the most likely causative pathogens (namely, ampicillin (or penicillin) plus gentamicin, a third-generation cephalosporin (for example, cefotaxime), or cloxacillin plus amikacin)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c38",
      "topic": "Neonatología · Sepsis: punción lumbar",
      "difficulty": "dificil",
      "src": "nrdp_sepsisneo26",
      "vignette": "Neonato de 5 días con sospecha de sepsis, en <span class='hy'>choque y con apneas</span> que requieren ventilación. Ya se tomaron hemocultivos. ¿Qué haces con la punción lumbar?",
      "options": [
        "Hacerla ya, antes de iniciar cualquier antibiótico",
        "Diferirla hasta estabilizarlo; antibiótico ya",
        "No hacerla nunca en neonatos por el riesgo de herniación",
        "Hacerla solo si el hemocultivo sale negativo"
      ],
      "correct": 1,
      "whyCorrect": "La punción lumbar se hace cuando hay fuerte sospecha de infección o signos de meningitis, pero se pospone en el neonato inestable (apneas, dificultad respiratoria grave, choque) hasta estabilizarlo. El antibiótico no se retrasa.",
      "pearl": "También se considera la punción si no mejora con el antibiótico o si el germen del hemocultivo se asocia a meningitis.",
      "trap": "Retrasar el antibiótico para hacer la punción en un neonato en choque.",
      "cita": [
        {
          "donde": "Nature Reviews Disease Primers 2026, Neonatal sepsis",
          "texto": "However, lumbar puncture should be postponed in clinically unstable infants, such as those experiencing ongoing apnoea, severe respiratory distress, shock or cardiovascular instability, until their condition is adequately stabilized."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c39",
      "topic": "Nefrología · Infección urinaria febril",
      "difficulty": "residencia",
      "src": "aap_ivu26",
      "vignette": "Niña de 14 meses con fiebre de 39 °C e infección urinaria confirmada. Tolera la vía oral, está hidratada y en buen estado general. ¿Qué tratamiento indicas?",
      "options": [
        "Ceftriaxona IV hospitalizada por 3 días y luego oral",
        "Antibiótico oral ambulatorio por 7 días o menos",
        "Antibiótico oral por 14 días",
        "Hospitalizar y esperar el urocultivo para iniciar"
      ],
      "correct": 1,
      "whyCorrect": "La AAP 2026 recomienda en mayores de 28 días y menores de 5 años el antibiótico oral, en lugar del parenteral o secuencial con hospitalización, y sugiere un curso corto de 7 días o menos.",
      "pearl": "Entre 8 y 28 días de vida: parenteral con paso temprano a oral cuando mejore.",
      "trap": "Hospitalizar para antibiótico IV a un lactante estable que tolera la vía oral.",
      "cita": [
        {
          "donde": "AAP 2026, guía de infección urinaria (8 días a 5 años)",
          "texto": "Key Action Statement 3B: In children older than 28 days and younger than 5 years with UTI, the AAP Guideline Panel recommends oral antibiotics rather than parenteral or sequential antibiotics requiring hospitalization (strong recommendation, very low certainty of evidence)."
        },
        {
          "donde": "AAP 2026, guía de infección urinaria (8 días a 5 años)",
          "texto": "Key Action Statement 2: In children with UTI, the AAP Guideline Panel suggests a shorter course of antibiotic therapy (≤7 days) rather than a longer (>7 days) course of antibiotic therapy (conditional recommendation, low certainty of evidence)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c40",
      "topic": "Nefrología · IVU: imágenes",
      "difficulty": "residencia",
      "src": "aap_ivu26",
      "vignette": "Niño de 2 años, no circuncidado, con su <span class='hy'>primera infección urinaria febril</span> por E. coli, que respondió bien. La ecografía renal y de vías urinarias es normal. ¿Pides cistouretrografía miccional?",
      "options": [
        "Sí: siempre tras la primera IVU febril",
        "No de rutina con ecografía normal",
        "Sí, y además gammagrafía DMSA",
        "Solo si la fiebre duró más de 24 horas"
      ],
      "correct": 1,
      "whyCorrect": "La AAP 2026 sugiere no hacer cistouretrografía de rutina tras una primera IVU febril en menores de 5 años con ecografía normal. Es una opción en grupos específicos: menores de 1 mes, germen distinto de E. coli, varones circuncidados, curso complicado o seguimiento poco confiable.",
      "pearl": "La ecografía renal y de vías urinarias es el estándar para buscar anomalías estructurales.",
      "trap": "Pedir cistouretrografía a todo niño con su primera IVU febril.",
      "cita": [
        {
          "donde": "AAP 2026, guía de infección urinaria (8 días a 5 años)",
          "texto": "Key Action Statement 5A: The AAP Guideline Panel suggests against routine VCUG after a ﬁrst febrile UTI in children younger than 5 years who have normal RBUS (conditional recommendation, high certainty of evidence of test accuracy, low certainty of evidence of overall effect)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c41",
      "topic": "Nefrología · IVU en el neonato",
      "difficulty": "dificil",
      "src": "aap_ivu26",
      "vignette": "Recién nacido de <span class='hy'>20 días</span> con infección urinaria confirmada, hospitalizado con antibiótico IV. A las 48 horas está afebril y come bien. ¿Qué haces?",
      "options": [
        "Completar 14 días de antibiótico IV hospitalizado",
        "Pasar a antibiótico oral ya que mejoró",
        "Suspender todo antibiótico porque ya está afebril",
        "Cambiar a profilaxis antibiótica sola por un año"
      ],
      "correct": 1,
      "whyCorrect": "Entre los 8 y 28 días de vida, la AAP 2026 sugiere antibiótico parenteral con paso temprano a la vía oral tras la mejoría clínica, en lugar de solo parenteral.",
      "pearl": "Mayores de 28 días y menores de 5 años: oral desde el inicio.",
      "trap": "Prolongar el antibiótico IV en un neonato que ya mejoró.",
      "cita": [
        {
          "donde": "AAP 2026, guía de infección urinaria (8 días a 5 años)",
          "texto": "Key Action Statement 3A: In children 8 to 28 days of age in whom a UTI has been diagnosed, the AAP Guideline Panel suggests parenteral antibiotics with early transition to oral following clinical improvement rather than parenteral antibiotics alone (conditional recommendation, very low certainty of evidence)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c42",
      "topic": "Ortopedia · Fracturas fisarias (Salter-Harris)",
      "difficulty": "residencia",
      "src": "cto_tm",
      "vignette": "Niño de 11 años con fractura del tobillo que atraviesa la <span class='hy'>fisis y la epífisis (Salter-Harris III)</span>, con 3 mm de desplazamiento. ¿Qué tratamiento?",
      "options": [
        "Yeso cerrado y control radiográfico en 6 semanas",
        "Reducción quirúrgica y fijación",
        "Vendaje elástico y carga inmediata del miembro",
        "Tracción por 3 semanas"
      ],
      "correct": 1,
      "whyCorrect": "Las fracturas que comprometen el cartílago de crecimiento (epifisiólisis) son quirúrgicas en los tipos III y IV con desplazamiento mayor de 2 mm, para evitar la epifisiodesis (cierre prematuro de la fisis), su complicación más frecuente.",
      "pearl": "Salter-Harris tipos I a V; los III y IV son intraarticulares y atraviesan la fisis.",
      "trap": "Tratar con yeso una fractura fisaria intraarticular desplazada.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología",
          "texto": "Las epifisiólisis son las fracturas que interesan al cartílago de crecimiento del niño o fisis; son quirúrgicas las de tipo III y IV con desplazamientos de más de 2 mm, para evitar su complicación más frecuente, la epifisiodesis."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c43",
      "topic": "Ortopedia · Displasia de cadera",
      "difficulty": "basica",
      "src": "cto_tm",
      "vignette": "Recién nacida de 3 semanas, podálica, con <span class='hy'>maniobra de Ortolani positiva</span> en la cadera izquierda. ¿Qué estudio confirma el diagnóstico?",
      "options": [
        "Radiografía de pelvis",
        "Ecografía de caderas",
        "Resonancia de cadera",
        "Tomografía de pelvis"
      ],
      "correct": 1,
      "whyCorrect": "La ecografía es el método de elección para valorar la cadera del recién nacido, aun cuando no se han osificado los elementos articulares. La sospecha clínica surge con limitación de la abducción o maniobras de Ortolani o Barlow positivas.",
      "pearl": "En el lactante mayor, cuando la cabeza femoral ya se osificó, la radiografía gana valor.",
      "trap": "Pedir radiografía en un neonato: la cabeza femoral aún no se ve.",
      "cita": [
        {
          "donde": "Manual CTO 14.ª ed., Traumatología",
          "texto": "La ecografía es el método de elección para valorar la patología de la cadera neonatal, aun cuando todavía no se han osificado los elementos articulares, así como para detectar colecciones de líquido."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c44",
      "topic": "Infectología · Malaria grave en niños",
      "difficulty": "dificil",
      "src": "malj_malaria22",
      "vignette": "Niño de 4 años, 15 kg, de zona endémica, con fiebre alta, postración y <span class='hy'>convulsiones</span>; prueba rápida positiva para P. falciparum. No se puede descartar sepsis. ¿Qué inicias de inmediato?",
      "options": [
        "Solo artesunato IV y esperar el hemocultivo antes de cubrir sepsis",
        "Artesunato IV 3 mg/kg más antibiótico de amplio espectro",
        "Solo antibiótico hasta confirmar con gota gruesa",
        "Quinina oral y antipiréticos con control estricto de la temperatura"
      ],
      "correct": 1,
      "whyCorrect": "En el niño es difícil distinguir la malaria grave de la sepsis, por eso se dan juntos el antimalárico parenteral (artesunato 3 mg/kg en menores de 20 kg; 2,4 mg/kg en los mayores) y un antibiótico de amplio espectro, apenas se sospecha.",
      "pearl": "Cerca de un tercio de los niños diagnosticados con malaria grave tienen en realidad otra causa, sobre todo sepsis.",
      "trap": "Dar solo el antimalárico y no cubrir la sepsis.",
      "cita": [
        {
          "donde": "Malaria Journal 2022, Severe malaria",
          "texto": "the difficulty in distinguishing malaria from sepsis in children means that both parenteral anti-malarials (i.e. artesunate 3 mg/kg stat for children < 20 kg and 2.4 mg/kg for larger patients) and broad-spectrum antibiotics should be given together as soon as the diagnosis is suspected [2, 73]."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c45",
      "topic": "Infectología · Contacto de tuberculosis",
      "difficulty": "residencia",
      "src": "lancet_tbninos20",
      "vignette": "Niño de 3 años que vive con su abuelo, recién diagnosticado de tuberculosis pulmonar bacilífera. El niño está sano, con radiografía normal y <span class='hy'>prueba de infección positiva</span>. ¿Qué haces?",
      "options": [
        "Nada: está sano y la radiografía es normal",
        "Terapia preventiva para tuberculosis",
        "Tratamiento completo con 4 fármacos",
        "Repetir la prueba en un año"
      ],
      "correct": 1,
      "whyCorrect": "Los niños menores de 5 años expuestos e infectados tienen el mayor riesgo: sin terapia preventiva, cerca del 19 % desarrolla tuberculosis en 2 años. La terapia preventiva tuvo una efectividad del 91 % en los niños con infección.",
      "pearl": "En los niños expuestos, la mayoría de los casos aparecen en las primeras semanas: buscar enfermedad activa antes de iniciar la preventiva.",
      "trap": "Dejar sin tratamiento a un niño pequeño infectado porque está asintomático.",
      "cita": [
        {
          "donde": "Lancet 2020, resumen en PubMed",
          "texto": "Children not receiving preventive therapy with a positive result for tuberculosis infection had significantly higher 2-year cumulative tuberculosis incidence than children with a negative result for tuberculosis infection, and this incidence was greatest among children below 5 years of age (19·0% [95% CI 8·4-37·4])."
        },
        {
          "donde": "Lancet 2020, resumen en PubMed",
          "texto": "The effectiveness of preventive therapy was 63% (adjusted HR 0·37 [95% CI 0·30-0·47]) among all exposed children, and 91% (adjusted HR 0·09 [0·05-0·15]) among those with a positive result for tuberculosis infection."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c46",
      "topic": "Infectología · Profilaxis neonatal del VIH: alto riesgo",
      "difficulty": "dificil",
      "src": "gpc_vih_ped",
      "vignette": "Recién nacido de <span class='hy'>39 semanas</span> y 3.100 g. A la madre le diagnosticaron VIH con una <span class='hy'>prueba positiva en el trabajo de parto</span>. ¿Qué profilaxis indicas?",
      "options": [
        "Zidovudina oral sola durante 4 semanas, desde el nacimiento",
        "Zidovudina, lamivudina y raltegravir o nevirapina",
        "Zidovudina sola durante 6 semanas",
        "Ninguna hasta tener la carga viral ARN del recién nacido"
      ],
      "correct": 1,
      "whyCorrect": "Madre con prueba positiva en el intraparto = neonato de alto riesgo. Con más de 37 semanas se usan 3 medicamentos (zidovudina, lamivudina y raltegravir o nevirapina) durante 6 semanas. La profilaxis se inicia sin esperar el resultado del niño.",
      "pearl": "Alto riesgo: madre sin TAR, solo TAR intraparto, carga viral detectable cerca del parto, infección aguda en la gestación o prueba positiva en el intraparto.",
      "trap": "Dar zidovudina sola, que es el esquema del bajo riesgo.",
      "cita": [
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 4",
          "texto": "Se recomienda el uso de la combinación de tres medicamentos (zidovudina, lamivudina y raltegravir o nevirapina) en neonatos expuestos al VIH mayores a 37 semanas de edad gestacional con alto riesgo de transmisión materno infantil del VIH"
        },
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, glosario: neonatos de alto riesgo",
          "texto": "madres con seroestatus desconocido o con prueba positiva en el intraparto"
        },
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, sección 5.1.7.1",
          "texto": "el panel recomienda la profilaxis durante 6 semanas por considerar que el riesgo de eventos adversos no excede el beneficio de evitar un caso de TMI."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c47",
      "topic": "Infectología · Profilaxis neonatal del VIH: bajo riesgo",
      "difficulty": "residencia",
      "src": "gpc_vih_ped",
      "vignette": "Recién nacido a término, hijo de madre con VIH que recibió terapia antirretroviral todo el embarazo, con <span class='hy'>carga viral indetectable a las 37 semanas</span>. ¿Qué profilaxis indicas?",
      "options": [
        "Zidovudina más nevirapina durante 6 semanas",
        "Zidovudina, lamivudina y raltegravir",
        "Zidovudina oral durante 4 semanas",
        "Zidovudina oral durante 2 semanas"
      ],
      "correct": 2,
      "whyCorrect": "Es de bajo riesgo (TAR en la gestación y carga viral indetectable 2 a 4 semanas antes del parto): zidovudina oral 4 mg/kg cada 12 horas durante 4 semanas. No se recomienda agregar nevirapina ni acortar a menos de 4 semanas.",
      "pearl": "Bajo riesgo = madre con TAR y carga viral indetectable 2 a 4 semanas antes del parto.",
      "trap": "Acortar la zidovudina a menos de 4 semanas.",
      "cita": [
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 1",
          "texto": "Se recomienda utilizar la zidovudina oral durante 4 semanas (4 mg/kg/dosis vía oral cada 12 horas) como profilaxis en neonatos de bajo riesgo de transmisión materno infantil del VIH"
        },
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 3",
          "texto": "Se recomienda no usar la profilaxis con zidovudina oral durante menos de 4 semanas en neonatos de bajo riesgo de transmisión materno infantil del VIH."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c48",
      "topic": "Infectología · Diagnóstico del VIH en el lactante expuesto",
      "difficulty": "dificil",
      "src": "gpc_vih_ped",
      "vignette": "Lactante de 7 semanas, hijo de madre con VIH en tratamiento y carga viral indetectable al final del embarazo. <span class='hy'>Terminó la zidovudina hace 2 semanas</span>. En otra institución le hicieron una <span class='hy'>ELISA para VIH que salió reactiva</span>. ¿Qué haces?",
      "options": [
        "Confirmar con Western blot e iniciar tratamiento",
        "Repetir la ELISA a los 6 meses de vida",
        "Pedir carga viral ARN para VIH",
        "Iniciar tratamiento por la ELISA reactiva"
      ],
      "correct": 2,
      "whyCorrect": "En el expuesto perinatal las pruebas serológicas no sirven: detectan los anticuerpos de la madre. En el bajo riesgo se pide carga viral ARN a las 2 semanas de terminar la profilaxis.",
      "pearl": "Menores de 18 meses: el diagnóstico es virológico (carga viral ARN o ADN proviral), no serológico.",
      "trap": "Tomar la ELISA reactiva como diagnóstico de infección.",
      "cita": [
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 15",
          "texto": "No se recomienda utilizar las pruebas presuntivas serológicas (ELISA, quimioluminiscencia, prueba rápida) para el diagnóstico de VIH en niños expuestos perinatalmente al Virus de Inmunodeficiencia Humana."
        },
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 14",
          "texto": "Se recomienda realizar la carga viral ARN para el diagnóstico de infección por VIH en niños de bajo riesgo*, a las 2 semanas de finalizado el manejo profiláctico**."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c49",
      "topic": "Infectología · Alimentación del hijo de madre con VIH",
      "difficulty": "basica",
      "src": "gpc_vih_ped",
      "vignette": "Puérpera con VIH, en terapia antirretroviral y con <span class='hy'>carga viral indetectable</span>, quiere amamantar a su hijo. ¿Qué le recomiendas según la guía colombiana?",
      "options": [
        "Lactancia exclusiva: con carga viral indetectable no transmite",
        "Leche de fórmula hasta los 12 meses, sin leche materna",
        "Lactancia materna mientras el niño reciba profilaxis",
        "Lactancia mixta durante los primeros 6 meses"
      ],
      "correct": 1,
      "whyCorrect": "La guía recomienda leche de fórmula desde el nacimiento hasta los 12 meses y no dar leche materna, aunque la madre esté en tratamiento o el niño en profilaxis.",
      "pearl": "En Colombia, el hijo de madre con VIH recibe fórmula los primeros 12 meses.",
      "trap": "Permitir la lactancia por la carga viral indetectable.",
      "cita": [
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 8",
          "texto": "Dar leche de fórmula* durante todo el periodo de lactancia, desde el nacimiento hasta los 12 meses de edad."
        },
        {
          "donde": "GPC VIH niñas, niños y adolescentes 2021, Recomendación 9",
          "texto": "Independientemente de si la madre recibe tratamiento antirretroviral o si la niña o el niño se encuentra en profilaxis antirretroviral, se recomienda no dar leche materna."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c50",
      "topic": "Neonatología · Ictericia antes de las 24 horas",
      "difficulty": "basica",
      "src": "aap_bili",
      "vignette": "Recién nacido de 39 semanas, con lactancia materna. A las <span class='hy'>18 horas de vida</span> la enfermera nota que está ictérico. ¿Qué haces?",
      "options": [
        "Agua con dextrosa para bajar la bilirrubina",
        "Observar: es ictericia fisiológica",
        "Exponerlo al sol y revisarlo al alta",
        "Medir la bilirrubina lo antes posible"
      ],
      "correct": 3,
      "whyCorrect": "La ictericia en las primeras 24 horas obliga a medir la bilirrubina (sérica o transcutánea) cuanto antes. No se dan agua ni dextrosa para prevenir o bajar la bilirrubina.",
      "pearl": "Todo recién nacido se valora por ictericia al menos cada 12 horas hasta el alta.",
      "trap": "Llamar fisiológica a una ictericia de menos de 24 horas.",
      "cita": [
        {
          "donde": "AAP 2022, KAS 4",
          "texto": "TSB or TcB should be measured as soon as possible for infants noted to be jaundiced <24 hours after birth."
        },
        {
          "donde": "AAP 2022, KAS 2",
          "texto": "Oral supplementation with water or dextrose water should not be provided to prevent hyperbilirubinemia or decrease bilirubin concentrations."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c51",
      "topic": "Neonatología · Bilirrubina transcutánea cerca del umbral",
      "difficulty": "residencia",
      "src": "aap_bili",
      "vignette": "Recién nacido de 38 semanas, sin factores de riesgo de neurotoxicidad. A las 36 horas, la <span class='hy'>bilirrubina transcutánea está 2 mg/dL por debajo</span> del umbral de fototerapia para su edad en horas. ¿Qué haces?",
      "options": [
        "Medir la bilirrubina sérica total",
        "Iniciar fototerapia con ese valor transcutáneo",
        "Dar de alta con control al mes",
        "Repetir la transcutánea en 3 días"
      ],
      "correct": 0,
      "whyCorrect": "Si la transcutánea supera el umbral o está a 3 mg/dL o menos de él (o es de 15 mg/dL o más), se mide la bilirrubina sérica total, que es la prueba que define la fototerapia.",
      "pearl": "La transcutánea tamiza; la sérica total decide el tratamiento.",
      "trap": "Tratar o dar de alta con base solo en la transcutánea.",
      "cita": [
        {
          "donde": "AAP 2022, KAS 6",
          "texto": "TSB should be measured if the TcB exceeds or is within 3 mg/dL of the phototherapy treatment threshold or if the TcB is ≥15 mg/dL."
        },
        {
          "donde": "AAP 2022, KAS 3",
          "texto": "Use TSB as the definitive diagnostic test to guide phototherapy and escalation-of-care decisions, including exchange transfusion."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c52",
      "topic": "Neonatología · Colestasis: ictericia prolongada",
      "difficulty": "residencia",
      "src": "aap_bili",
      "vignette": "Lactante de <span class='hy'>3 semanas y media</span>, alimentado solo con leche materna, que <span class='hy'>sigue ictérico</span>. Gana peso bien. ¿Qué pides?",
      "options": [
        "Bilirrubina total y directa",
        "Suspender la lactancia 48 horas y ver si mejora",
        "Nada: es ictericia por leche materna",
        "Iniciar fototerapia en casa"
      ],
      "correct": 0,
      "whyCorrect": "El amamantado que sigue ictérico a las 3 a 4 semanas (o el alimentado con fórmula a las 2 semanas) necesita bilirrubina total y directa para buscar colestasis patológica, como la atresia de vías biliares.",
      "pearl": "Ictericia prolongada: medir la fracción directa antes de atribuirla a la leche materna.",
      "trap": "Suspender la lactancia o tranquilizar sin medir la bilirrubina directa.",
      "cita": [
        {
          "donde": "AAP 2022, KAS 9",
          "texto": "For breastfed infants who are still jaundiced at 3 to 4 weeks of age, and for formula-fed infants who are still jaundiced at 2 weeks of age, the total and direct-reacting (or conjugated) bilirubin concentrations should be measured to identify possible pathologic cholestasis."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c53",
      "topic": "Neonatología · Encefalopatía bilirrubínica aguda",
      "difficulty": "dificil",
      "src": "aap_bili",
      "vignette": "Recién nacido de 5 días que reingresa por ictericia intensa. Está con <span class='hy'>hipertonía, arqueamiento del tronco y llanto agudo</span>. Ya está en fototerapia intensiva. ¿Qué sigue?",
      "options": [
        "Medir la bilirrubina en 12 horas para ver la tendencia",
        "Inmunoglobulina intravenosa como único tratamiento",
        "Suspender la lactancia y dar fórmula",
        "Exsanguinotransfusión urgente"
      ],
      "correct": 3,
      "whyCorrect": "Los signos de encefalopatía bilirrubínica aguda intermedia o avanzada (hipertonía, arqueamiento, retrocolis, opistótonos, llanto agudo o apneas) indican exsanguinotransfusión urgente.",
      "pearl": "Con signos neurológicos, la exsanguinotransfusión no espera al siguiente valor de bilirrubina.",
      "trap": "Seguir solo con fototerapia y controles espaciados.",
      "cita": [
        {
          "donde": "AAP 2022, KAS 22",
          "texto": "An urgent exchange transfusion should be performed for infants with signs of intermediate or advanced stages of intermediate or advanced stages of acute bilirubin encephalopathy (eg, hypertonia, arching, retrocollis, opisthotonos, high-pitched cry, or recurrent apnea)."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c54",
      "topic": "Vacunación · Rotavirus: edad máxima",
      "difficulty": "residencia",
      "src": "pai_esquema26",
      "vignette": "Lactante de <span class='hy'>4 meses</span>, sano, que nunca ha sido vacunado. La madre pregunta por la vacuna contra el rotavirus. ¿Qué le dices?",
      "options": [
        "Primera dosis hoy y segunda dentro de 2 meses",
        "Una sola dosis hoy, por la edad que tiene",
        "No: ya pasó la edad de la primera dosis",
        "Solo si ha tenido diarrea en el último mes"
      ],
      "correct": 2,
      "whyCorrect": "La primera dosis de rotavirus se aplica como máximo hasta los 3 meses y 21 días; sin primera dosis no hay segunda. A los 4 meses ya no se inicia.",
      "pearl": "Rotavirus: primera dosis hasta 3 meses 21 días; segunda hasta 11 meses 29 días.",
      "trap": "Iniciar el rotavirus tarde para «ponerse al día», como con las demás vacunas.",
      "cita": [
        {
          "donde": "Esquema de vacunación de Colombia (memoficha MinSalud, julio 2026), nota 2",
          "texto": "Rotavirus: Primera dosis entre 2 meses y máximo hasta 3 meses 21 dias y segunda dosis hasta 11 meses 29 dias. Sin primera no hay segunda dosis."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c55",
      "topic": "Vacunación · Influenza: primovacunación",
      "difficulty": "residencia",
      "src": "pai_esquema26",
      "vignette": "Niño de <span class='hy'>2 años</span> que <span class='hy'>nunca ha recibido vacuna contra la influenza</span>. ¿Qué esquema le aplicas?",
      "options": [
        "2 dosis con 4 semanas de intervalo",
        "Una dosis y refuerzo dentro de un año",
        "Una sola dosis, por ser mayor de 1 año",
        "Ninguna: la vacuna es solo hasta los 12 meses"
      ],
      "correct": 0,
      "whyCorrect": "Sin primovacunación previa, entre los 6 y los 35 meses se garantizan 2 dosis con 4 semanas de intervalo. Con primovacunación, basta una dosis anual hasta los 5 años.",
      "pearl": "Primovacunación contra influenza = 2 dosis de la misma cepa.",
      "trap": "Dar una sola dosis a un niño de 6 a 35 meses nunca vacunado.",
      "cita": [
        {
          "donde": "Esquema de vacunación de Colombia (memoficha MinSalud, julio 2026), nota 3",
          "texto": "Influenza: Se considera primovacunación a la aplicación de 2 dosis de la misma cepa. Sin antecedente de primovacunación, entre los 6 a 35 meses se deben garantizar 2 dosis en intervalo de 4 semanas."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c56",
      "topic": "Vacunación · Triple viral: esquema atrasado",
      "difficulty": "basica",
      "src": "pai_jornada26",
      "vignette": "Niña de <span class='hy'>3 años</span> con carné que muestra <span class='hy'>solo una dosis de triple viral</span>, aplicada a los 12 meses. No recibió la de los 18 meses. ¿Qué haces?",
      "options": [
        "Reiniciar el esquema con dos dosis nuevas",
        "Nada: una dosis basta después de los 2 años",
        "Esperar a los 5 años para la segunda dosis",
        "Aplicar hoy la segunda dosis"
      ],
      "correct": 3,
      "whyCorrect": "Todos los niños de 1 a 10 años deben tener 2 dosis de triple viral. No se reinician esquemas: se cuenta la dosis previa y se aplica la que falta.",
      "pearl": "La segunda dosis de triple viral va a los 18 meses; si falta, se aplica en el primer contacto.",
      "trap": "Reiniciar el esquema en lugar de completarlo.",
      "cita": [
        {
          "donde": "Lineamiento de la Primera Jornada Nacional de Vacunación 2026 (MinSalud), consideración técnica 8",
          "texto": "Todos los niños de 1 a 10 años deben tener 2 dosis de triple viral"
        },
        {
          "donde": "Esquema de vacunación de Colombia (memoficha MinSalud, julio 2026)",
          "texto": "No está indicado reiniciar esquemas de vacunación, se debe revisar el antecedente vacunal."
        }
      ],
      "verificado": "2026-11-23"
    },
    {
      "id": "ped-c57",
      "topic": "Vacunación · VPH en inmunosuprimidos",
      "difficulty": "dificil",
      "src": "pai_jornada26",
      "vignette": "Niña de 11 años con <span class='hy'>lupus en tratamiento inmunosupresor</span>. Sus padres preguntan por la vacuna contra el VPH. ¿Qué esquema corresponde?",
      "options": [
        "Una sola dosis, como en las niñas sanas",
        "Dos dosis, a los 0 y 6 meses",
        "Tres dosis, a los 0, 2 y 6 meses",
        "No se aplica mientras esté inmunosuprimida"
      ],
      "correct": 1,
      "whyCorrect": "Las niñas, niños y adolescentes sanos de 9 a 17 años reciben una sola dosis; los inmunosuprimidos de la misma edad reciben 2 dosis, a los 0 y 6 meses.",
      "pearl": "VPH en Colombia: dosis única de 9 a 17 años; 2 dosis si hay inmunosupresión.",
      "trap": "Aplicar la dosis única también a la paciente inmunosuprimida.",
      "cita": [
        {
          "donde": "Lineamiento de la Primera Jornada Nacional de Vacunación 2026 (MinSalud), consideración técnica 7",
          "texto": "se define esquema de una única dosis en niñas niños y adolescentes sanos de 9 a 17 años y 2 dosis en población inmunosuprimida de la misma edad"
        },
        {
          "donde": "Esquema de vacunación de Colombia (memoficha MinSalud, julio 2026), nota 6",
          "texto": "VPH: Personas Inmunocomprometidas deben recibir 2 dosis a los 0 y 6 meses."
        }
      ],
      "verificado": "2026-11-23"
    }
  ],
  "fichas": [
    {
      "id": "hy5",
      "title": "Crup vs. epiglotitis",
      "badge": "Estridor Agudo",
      "src": "afp_croup",
      "accent": "#06b6d4",
      "thresholds": [
        {
          "label": "Crup",
          "val": "Tos perruna, disfonía, estridor inspiratorio"
        },
        {
          "label": "Edad típica",
          "val": "6 meses a 3 años (promedio 2.5)"
        },
        {
          "label": "Todo crup",
          "val": "Dexametasona VO 0.6 mg/kg, dosis única (máx. 12 mg)"
        },
        {
          "label": "Moderado a grave",
          "val": "+ Adrenalina nebulizada; vigilar 2–4 h"
        },
        {
          "label": "Epiglotitis",
          "val": "Babeo, dificultad grave, trípode; Hib en no vacunados"
        }
      ],
      "redFlag": "Babeo con dificultad respiratoria grave y posición en trípode: pensar en epiglotitis.",
      "trap": "Pedir radiografía de rutina: el signo del campanario aparece solo en cerca del 50 % y no se relaciona con la gravedad.",
      "cita": [
        {
          "donde": "Resumen",
          "texto": "A single oral dose of dexamethasone (0.6 mg/kg, maximum 12 mg) is standard. Moderate to severe croup should be treated with nebulized epinephrine and corticosteroids."
        },
        {
          "donde": "Recomendaciones clave (SORT A)",
          "texto": "Nebulized epinephrine should be used to treat moderate to severe croup. Children should be monitored for 2 to 4 hours after treatment due to its short half-life and the risk of symptom recurrence."
        },
        {
          "donde": "Epidemiología",
          "texto": "Croup usually occurs between ages 6 months and 3 years, with an average age of 2.5 years."
        },
        {
          "donde": "Diagnóstico diferencial",
          "texto": "Epiglottitis should be considered in children who are underimmunized because Haemophilus influenzae type b is the most common cause of this condition. … children with epiglottitis present with drooling, severe respiratory distress, and tripoding to promote airway opening."
        },
        {
          "donde": "Pruebas diagnósticas",
          "texto": "Radiography shows narrowing of the subglottic space (ie, steeple sign) only in approximately 50% of children with croup, and findings are often not correlated with severity of illness."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-f01",
      "title": "Bronquiolitis (NICE)",
      "badge": "NICE NG9",
      "src": "nice_bq",
      "thresholds": [
        {
          "label": "Edad",
          "val": "< 2 años; pico entre 3 y 6 meses"
        },
        {
          "label": "Diagnóstico",
          "val": "Catarro 1–3 días → tos + taquipnea o tiraje + sibilancias o crepitantes"
        },
        {
          "label": "Oxígeno (≥ 6 semanas)",
          "val": "SatO₂ persistentemente < 90 %"
        },
        {
          "label": "Oxígeno (< 6 semanas o comorbilidad)",
          "val": "SatO₂ persistentemente < 92 %"
        },
        {
          "label": "No usar",
          "val": "Antibióticos, salbutamol, adrenalina, SSH, corticoides, montelukast, ipratropio"
        }
      ],
      "redFlag": "Agotamiento, apneas recurrentes o saturación que no se mantiene con oxígeno: insuficiencia respiratoria inminente.",
      "trap": "Aspirar la vía aérea de rutina: solo si las secreciones causan dificultad respiratoria o para alimentarse (o si hay apnea).",
      "cita": [
        {
          "donde": "Recomendación 1.1.1 [2015]",
          "texto": "When diagnosing bronchiolitis, take into account that it occurs in babies and children under 2 years of age and most commonly in the first year of life, peaking between 3 and 6 months."
        },
        {
          "donde": "Recomendación 1.1.3 [2015]",
          "texto": "Diagnose bronchiolitis if the baby or child has a coryzal prodrome lasting 1 to 3 days, followed by: persistent cough and either tachypnoea or chest recession (or both) and either wheeze or crackles on chest auscultation (or both)."
        },
        {
          "donde": "Recomendación 1.4.4 [2021]",
          "texto": "Give oxygen supplementation to babies and children with bronchiolitis if their oxygen saturation is: persistently less than 90%, for children aged 6 weeks and over · persistently less than 92%, for babies under 6 weeks or children of any age with underlying health conditions."
        },
        {
          "donde": "Recomendación 1.4.3 [2015]",
          "texto": "Do not use any of the following to treat bronchiolitis in babies or children: antibiotics · hypertonic saline · adrenaline (nebulised) · salbutamol · montelukast · ipratropium bromide · systemic or inhaled corticosteroids · a combination of systemic corticosteroids and nebulised adrenaline."
        },
        {
          "donde": "Recomendación 1.1.10 [2015]",
          "texto": "Suspect impending respiratory failure … if any of the following are present: signs of exhaustion, for example listlessness or decreased respiratory effort · recurrent apnoea · failure to maintain adequate oxygen saturation despite oxygen supplementation."
        },
        {
          "donde": "Recomendaciones 1.4.6 y 1.4.7 [2015]",
          "texto": "Do not routinely perform upper airway suctioning in babies or children with bronchiolitis. · Consider upper airway suctioning in babies and children who have respiratory distress or feeding difficulties because of upper airway secretions."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-f02",
      "title": "Enfermedad de Kawasaki",
      "badge": "AHA 2024",
      "src": "aha_kaw",
      "thresholds": [
        {
          "label": "Diagnóstico completo",
          "val": "≥ 4 criterios principales: desde el día 4 de fiebre"
        },
        {
          "label": "IGIV",
          "val": "2 g/kg en 8–12 h"
        },
        {
          "label": "Ventana",
          "val": "Tratar dentro de los 10 días de fiebre"
        },
        {
          "label": "Aspirina dosis baja",
          "val": "3–5 mg/kg/día hasta 6–8 semanas"
        },
        {
          "label": "Sin tratamiento",
          "val": "25 % con dilatación o aneurismas coronarios"
        }
      ],
      "redFlag": "Fiebre que reaparece en la semana siguiente al alta: ecocardiograma urgente.",
      "trap": "Esperar el día 5 de fiebre: con 4 o más criterios principales, la AHA 2024 permite diagnosticar desde el día 4.",
      "cita": [
        {
          "donde": "Puntos clave, diagnóstico",
          "texto": "In the presence of ≥4 principal clinical features, the diagnosis of complete KD can be made with 4 days of fever."
        },
        {
          "donde": "Tratamiento inicial",
          "texto": "IVIg at 2 g/kg infused over 8 to 12 hours remains the standard of care for patients with acute KD to reduce inflammation."
        },
        {
          "donde": "Diagnóstico",
          "texto": "Treatment within 10 days of fever onset is strongly associated with a lower risk of CA dilation or aneurysms."
        },
        {
          "donde": "Tratamiento inicial: aspirina",
          "texto": "Low-dose aspirin (3–5 mg/kg per day) once a day has been used for its antiplatelet effect after defervescence and is continued until 6 to 8 weeks after onset of illness."
        },
        {
          "donde": "Resumen",
          "texto": "Kawasaki disease (KD), an acute self-limited febrile illness that primarily affects children <5 years old, is the leading cause of acquired heart disease in developed countries, with the potential of leading to coronary artery dilation and coronary artery aneurysms in 25% of untreated patients."
        },
        {
          "donde": "Seguimiento",
          "texto": "Patients with recurrence of fever in the week after discharge need to have an urgent echocardiogram unless there is a clear alternative diagnosis. In patients with no CA involvement during hospitalization, an echocardiogram is repeated within 1 to 2 weeks after discharge"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-f03",
      "title": "Kawasaki: coronarias por Z score",
      "badge": "AHA 2024",
      "src": "aha_kaw",
      "thresholds": [
        {
          "label": "Sin compromiso",
          "val": "Z < 2"
        },
        {
          "label": "Solo dilatación",
          "val": "Z 2 a < 2,5"
        },
        {
          "label": "Aneurisma pequeño",
          "val": "Z ≥ 2,5 a < 5"
        },
        {
          "label": "Aneurisma mediano",
          "val": "Z ≥ 5 a < 10 y < 8 mm"
        },
        {
          "label": "Aneurisma grande o gigante",
          "val": "Z ≥ 10 o ≥ 8 mm: antiagregación + anticoagulación"
        }
      ],
      "redFlag": "El riesgo de infarto es máximo en los primeros 2 a 3 meses tras el inicio.",
      "trap": "El Z score solo no define el daño de la pared: un aneurisma anatómico sí lo confirma.",
      "cita": [
        {
          "donde": "Tabla 1: clasificación de las arterias coronarias por Z score",
          "texto": "1. No involvement: always Z <2 2. Dilation only: 2 to <2.5 3. Small aneurysm: ≥2.5 to <5 4. Medium aneurysm: ≥5 to <10, and absolute dimension <8 mm 5. Large or giant aneurysm: ≥10 or absolute dimension ≥8 mm"
        },
        {
          "donde": "Puntos clave, tratamiento (2)",
          "texto": "Patients with large CAAs require antiplatelet and anticoagulation therapy."
        },
        {
          "donde": "Manejo del infarto",
          "texto": "The risk of MI in patients with KD with CAA is highest in the first 2 to 3 months after KD onset."
        },
        {
          "donde": "Ecocardiografía",
          "texto": "CA dilation does not exclude or confirm that the arterial wall has been damaged, whereas documentation of an anatomic aneurysm does."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-f04",
      "title": "Kawasaki: alto riesgo y resistencia a IGIV",
      "badge": "AHA 2024",
      "src": "aha_kaw",
      "thresholds": [
        {
          "label": "Alto riesgo al diagnóstico",
          "val": "Edad < 6 meses o Z score ≥ 2,5"
        },
        {
          "label": "Conducta en alto riesgo",
          "val": "Intensificar: IGIV + antiinflamatorio adyuvante"
        },
        {
          "label": "Resistencia a IGIV",
          "val": "Fiebre ≥ 36 h después de terminar la infusión"
        },
        {
          "label": "Tratamiento de la resistencia",
          "val": "Infliximab 10 mg/kg IV, segunda IGIV o corticoides"
        },
        {
          "label": "Vacunas vivas",
          "val": "Diferir 11 meses tras la IGIV"
        },
        {
          "label": "VSG tras IGIV",
          "val": "No sirve para seguir la inflamación"
        }
      ],
      "redFlag": "Lactante < 6 meses con fiebre prolongada: piensa en Kawasaki incompleto aunque falten criterios.",
      "trap": "Esperar la resistencia para intensificar en un paciente que ya era de alto riesgo.",
      "cita": [
        {
          "donde": "Puntos clave, diagnóstico (5)",
          "texto": "substantial data indicate that right CA or left anterior descending Z score ≥2.5 at diagnosis and age <6 months are high-risk features in multiple racial and ethnic groups, and these patients should be considered for intensification of primary therapy."
        },
        {
          "donde": "Puntos clave, tratamiento (1)",
          "texto": "Intensification of primary therapy with adjunctive anti-inflammatory therapy (dual therapy) may benefit high-risk patients with KD."
        },
        {
          "donde": "Tratamiento inicial: definición de resistencia",
          "texto": "Patients with persistent or recrudescent fever ≥36 hours after the completion of the initial IVIg infusion are defined as IVIg resistant."
        },
        {
          "donde": "Tratamiento de la resistencia: infliximab",
          "texto": "The KIDCARE trial (Kawasaki Disease Comparative Effectiveness; https://www.clinicaltrials.gov; unique identifier: NCT03065244) compared infliximab (10 mg/ kg IV), a monoclonal antibody against tumor necrosis factor α, with a second IVIg infusion in IVIg-resistant patients. This study showed shorter duration of fever, reduced need for additional therapy, less severe anemia, and shorter hospitalization in the infliximab group."
        },
        {
          "donde": "Tratamiento inicial: efectos de la IGIV",
          "texto": "All live vaccines, including measles, mumps, rubella, and varicella vaccines, should be deferred for 11 months after IVIg administration, as administered IVIg may reduce efficacy of those live vaccines."
        },
        {
          "donde": "Tratamiento inicial: efectos de la IGIV",
          "texto": "The erythrocyte sedimentation rate is increased after IVIg treatment; therefore, erythrocyte sedimentation rate is not a reliable marker of inflammation after IVIg infusion."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-f05",
      "title": "Tics y síndrome de Tourette",
      "badge": "Nat Rev Dis Primers 2026",
      "src": "nrdp_ts",
      "thresholds": [
        {
          "label": "Tourette",
          "val": "Varios tics motores + ≥ 1 fónico, > 1 año, inicio < 18 años"
        },
        {
          "label": "Tics crónicos (persistentes)",
          "val": "Solo motores o solo fónicos, > 1 año"
        },
        {
          "label": "Tics provisionales",
          "val": "Menos de 1 año"
        },
        {
          "label": "Rasgos de un tic",
          "val": "Urgencia premonitoria, supresión voluntaria, sugestionabilidad"
        },
        {
          "label": "Primera línea",
          "val": "Terapia conductual: CBIT, reversión del hábito, exposición con prevención de respuesta"
        },
        {
          "label": "Si se necesita medicamento",
          "val": "Aripiprazol, primera opción del segundo escalón"
        }
      ],
      "redFlag": "Tics graves y refractarios: valorar estimulación cerebral profunda en centro especializado.",
      "trap": "Diagnosticar Tourette sin tic fónico o antes de 1 año de evolución.",
      "cita": [
        {
          "donde": "Diagnóstico",
          "texto": "Diagnosis of TS requires the presence of multiple motor tics and one or more phonic tics that begin during the developmental period and are present for more than 1 year"
        },
        {
          "donde": "Diagnóstico",
          "texto": "define TS as the presence of multiple motor tics and at least one vocal tic that begin during the developmental period (defined in the DSM-5-TR as prior to the age of 18 years) and occur multiple times a day."
        },
        {
          "donde": "Diagnóstico",
          "texto": "The term provisional tic disorder (PTD) is used in those with tics for less than 1 year, whereas chronic (persistent) tic disorder is used to refer to those with the presence of either motor or vocal tic (but not both) for more than 1 year"
        },
        {
          "donde": "Características de los tics",
          "texto": "The characteristic features of tics include a premonitory urge (like the sensations felt prior to a sneeze or itch) preceding the onset of the tic, voluntary suppression of tics with effort, suggestibility and sensitivity to potential environmental triggers."
        },
        {
          "donde": "Manejo",
          "texto": "Three major behavioural strategies are recommended as first-line treatment for TS: CBIT, habit reversal training (HRT) and exposure with response prevention (ERP) therapy"
        },
        {
          "donde": "Manejo: medicamentos",
          "texto": "several reports have ranked aripiprazole as the first-line tier 2 treatment for TS"
        },
        {
          "donde": "Manejo",
          "texto": "in individuals with severe refractory TS, deep brain stimulation (DBS)"
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "tarjetas": [
    {
      "id": 29,
      "src": "aap_bq",
      "front": "Agente más común de bronquiolitis",
      "back": "Virus sincitial respiratorio (VSR)",
      "estado": "pendiente"
    },
    {
      "id": 30,
      "src": "afp_croup",
      "front": "Agente más común de crup",
      "back": "Parainfluenza",
      "cita": [
        {
          "donde": "Epidemiología",
          "texto": "Although there are nonviral causes of croup, most cases are caused by the human parainfluenza virus."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 31,
      "src": "aha_kaw",
      "front": "Kawasaki: tratamiento",
      "back": "IGIV 2 g/kg en 8–12 h + aspirina; tratar dentro de los 10 días de fiebre",
      "cita": [
        {
          "donde": "Tratamiento inicial",
          "texto": "IVIg at 2 g/kg infused over 8 to 12 hours remains the standard of care for patients with acute KD to reduce inflammation."
        },
        {
          "donde": "Diagnóstico",
          "texto": "Treatment within 10 days of fever onset is strongly associated with a lower risk of CA dilation or aneurysms."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 32,
      "src": "aap_fs",
      "front": "Convulsión febril simple",
      "back": "6 m–5 años, generalizada, < 15 min, una sola en 24 h",
      "estado": "pendiente"
    },
    {
      "id": 33,
      "src": "nice_ict",
      "front": "Ictericia neonatal en las primeras 24 h de vida",
      "back": "Medir la bilirrubina sérica con urgencia, dentro de las 2 horas",
      "cita": [
        {
          "donde": "Recomendación 1.2.10 [2010]",
          "texto": "In all babies with suspected or obvious jaundice in the first 24 hours of life, measure and record the serum bilirubin level urgently (within 2 hours)."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 34,
      "src": "who_dia",
      "front": "Plan B de hidratación (OMS)",
      "back": "SRO de baja osmolaridad ≈ 75 mL/kg en 4 h + zinc",
      "estado": "pendiente"
    },
    {
      "id": 35,
      "src": "nice_oma",
      "front": "Antibiótico de primera línea en otitis media aguda",
      "back": "Amoxicilina por 5 a 7 días. Muchos niños no la necesitan: considerar no dar antibiótico o una receta diferida.",
      "cita": [
        {
          "donde": "Recomendación 1.1.8 [2018]",
          "texto": "Consider no antibiotic prescription or a back-up antibiotic prescription …, taking account of: evidence that antibiotics make little difference to symptoms"
        },
        {
          "donde": "Elección del antibiótico (tabla)",
          "texto": "First-choice oral antibiotic Amoxicillin: 1 month to 11 months, 125 mg three times a day for 5 to 7 days · 1 year to 4 years, 250 mg three times a day for 5 to 7 days · 5 years to 17 years, 500 mg three times a day for 5 to 7 days"
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "revision": "verificada"
});
