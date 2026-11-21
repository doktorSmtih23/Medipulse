// Pediatría: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: ped-c01 (casos), ped-f01 (fichas), ped-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Pediatría",
  "prefijo": "ped",
  "paquete": "starter",
  "actualizado": "2026-11-21",
  "casos": [
    {
      "id": 5,
      "topic": "Vía Aérea · Laringotraqueítis",
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 2",
      "src": "nice_bq",
      "vignette": "Lactante de 4 meses previamente sano con coriza hace 3 días, ahora con <span class='hy'>taquipnea, tirajes subcostales, sibilancias espiratorias difusas y SatO2 89%</span>. Sin fiebre alta ni consolidación. ¿Manejo indicado?",
      "options": [
        "Prednisolona oral 2 mg/kg más amoxicilina-clavulanato por 7 días",
        "Salbutamol horario programado más nebulización con solución salina hipertónica",
        "Ribavirina intravenosa de rutina por la gravedad del cuadro",
        "Oxígeno, hidratación y aspirar secreciones solo si estorban"
      ],
      "correct": 3,
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
      "difficulty": "Nivel 2",
      "src": "aha_kaw",
      "vignette": "Niño de 3 años con <span class='hy'>fiebre de 6 días</span> sin respuesta a antipiréticos, conjuntivitis bilateral sin secreción, labios rojos y fisurados, lengua en fresa, exantema polimorfo, edema de manos y adenopatía cervical de 2 cm. ¿Tratamiento indicado?",
      "options": [
        "Amoxicilina por probable escarlatina y control en 48 horas",
        "Inmunoglobulina IV 2 g/kg más ácido acetilsalicílico",
        "Prednisolona oral y observación hospitalaria por 72 horas",
        "Ibuprofeno a horario y control en 48 horas si sigue la fiebre"
      ],
      "correct": 1,
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
      "difficulty": "Nivel 3",
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
      "difficulty": "Nivel 2",
      "src": "aha_kaw",
      "vignette": "Niño de 3 años con Kawasaki tratado con IGIV 2 g/kg y aspirina. <span class='hy'>40 horas después de terminar la infusión</span> sigue con fiebre de 39 °C. ¿Cómo se interpreta y qué haces?",
      "options": [
        "Es esperable después de la IGIV: observar 72 horas más sin cambios",
        "Resistencia a la IGIV: segunda dosis de IGIV o infliximab",
        "Subir la aspirina a dosis alta como único tratamiento adicional",
        "Fiebre por la infusión de IGIV: solo antipiréticos y control"
      ],
      "correct": 1,
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 1",
      "src": "aha_kaw",
      "vignette": "Un niño recibió IGIV por enfermedad de Kawasaki. ¿Cuánto tiempo deben diferirse las vacunas vivas (triple viral y varicela)?",
      "options": [
        "11 meses",
        "1 mes",
        "3 meses",
        "6 meses"
      ],
      "correct": 0,
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
      "difficulty": "Nivel 3",
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
      "difficulty": "Nivel 1",
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 1",
      "src": "afp_tinea",
      "vignette": "Niño de 6 años con una placa redonda descamativa en el cuero cabelludo, con <span class='hy'>pelos quebrados y puntos negros</span>, de 6 semanas. Ya usó una crema antimicótica sin mejoría. ¿Conducta?",
      "options": [
        "Seguir con la crema antimicótica 4 semanas más",
        "Terbinafina oral",
        "Crema de clotrimazol con betametasona",
        "Champú de ketoconazol como único tratamiento"
      ],
      "correct": 1,
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
          "texto": "Combination antifungal-corticosteroid products, such as clotrimazole- betamethasone, generally should be avoided."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "ped-c10",
      "topic": "Endocrinología · Hipotiroidismo subclínico",
      "difficulty": "Nivel 2",
      "src": "udea_ped26",
      "vignette": "Niña de 9 años, asintomática, con crecimiento normal. En un chequeo le pidieron pruebas tiroideas: <span class='hy'>TSH de 7,2 mU/L con T4 libre normal</span>. No tiene bocio. ¿Cuál es la conducta?",
      "options": [
        "Iniciar levotiroxina a dosis plena por superficie corporal",
        "Repetir TSH y T4 libre en 2 a 3 meses antes de tratar",
        "Pedir ecografía tiroidea y gammagrafía de inmediato",
        "Remitir a endocrinología pediátrica como prioritaria"
      ],
      "correct": 1,
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 3",
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
      "difficulty": "Nivel 1",
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
      "difficulty": "Nivel 2",
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
      "difficulty": "Nivel 3",
      "src": "udea_ped26",
      "vignette": "Niño de 7 años con anemia de células falciformes, asintomático, en su control anual. La ecografía Doppler transcraneal muestra una <span class='hy'>velocidad de 195 cm/s en la arteria cerebral media</span>. Examen neurológico normal. ¿Qué sigue?",
      "options": [
        "Repetir el Doppler en un año, porque está asintomático y sin déficit",
        "Resonancia o angiorresonancia y repetir el Doppler en una semana",
        "Iniciar ácido acetilsalicílico y control en 3 meses",
        "Hidroxiurea y repetir el Doppler en 6 meses"
      ],
      "correct": 1,
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
      "difficulty": "Nivel 1",
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
      "difficulty": "Nivel 2",
      "src": "udea_ped26",
      "vignette": "Recién nacido de 5 días con microcefalia, ictericia, hepatoesplenomegalia, petequias y trombocitopenia. La ecografía transfontanelar muestra <span class='hy'>calcificaciones periventriculares</span>. ¿Cómo confirmas el diagnóstico y cómo lo tratas?",
      "options": [
        "IgM para CMV a los 2 meses; sin tratamiento antiviral",
        "PCR para CMV en orina antes de los 21 días; valganciclovir por 6 meses",
        "PCR para CMV en saliva; aciclovir intravenoso por 14 días",
        "Serología materna para CMV y ganciclovir intravenoso solo si aparece hipoacusia"
      ],
      "correct": 1,
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
      "difficulty": "Nivel 1",
      "src": "udea_ped26",
      "vignette": "Recién nacido a término, sano, que va a salir de alta a las <span class='hy'>20 horas de vida</span>. La madre pregunta cuándo deben tomarle la muestra de sangre del talón para el tamizaje neonatal ampliado. ¿Qué le respondes?",
      "options": [
        "Ahora mismo, antes de salir, para no perder la oportunidad",
        "De la sangre del cordón, que ya se tomó al nacer",
        "Entre las 48 y 72 horas de vida, cuando ya haya comido",
        "Al mes de vida, en el primer control"
      ],
      "correct": 2,
      "whyCorrect": "La tamización neonatal debe hacerse entre las 48 y 72 horas de vida, cuando el neonato ya recibió alimentación, con consentimiento informado de los padres. Una muestra muy temprana puede dar falsos negativos en enfermedades metabólicas que dependen de la ingesta.",
      "pearl": "Tamizaje metabólico de talón: 48 a 72 horas, después de alimentarse. Si el alta es antes, hay que garantizar la toma después.",
      "trap": "Tomar la muestra antes del alta temprana «por comodidad»: puede no detectar la enfermedad.",
      "cita": [
        {
          "donde": "Lo que deberíamos saber sobre el tamizaje neonatal ampliado",
          "texto": "La tamización neonatal debe realizarse entre las 48 y 72 horas de vida, una vez el neonato haya recibido alimentación se tomará la muestra para la tamización metabólica de sangre del talón"
        }
      ],
      "verificado": "2026-11-21",
      "tipo": "datos"
    },
    {
      "id": "ped-c19",
      "topic": "Cardiología · El atleta pediátrico",
      "difficulty": "Nivel 1",
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
      "difficulty": "Nivel 1",
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
