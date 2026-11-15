// Pediatría: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: ped-c01 (casos), ped-f01 (fichas), ped-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Pediatría",
  "prefijo": "ped",
  "paquete": "starter",
  "actualizado": "2026-11-15",
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
        "SRO de baja osmolaridad 50 mL/kg en 4 horas, más los líquidos de mantenimiento",
        "Líquidos caseros a libre demanda, sin SRO",
        "Bolo rápido de solución salina 0.9 % IV",
        "Suspender la lactancia materna y dar loperamida"
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
        "Prednisolona oral 2 mg/kg + amoxicilina-clavulanato",
        "Salbutamol horario programado + nebulización con solución hipertónica obligatoria",
        "Ribavirina intravenosa de rutina",
        "Oxígeno suplementario, hidratación y aspiración de la vía aérea superior solo si las secreciones dificultan la respiración o la alimentación"
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
        "Amoxicilina por probable escarlatina",
        "Inmunoglobulina IV 2 g/kg + ácido acetilsalicílico",
        "Prednisolona oral y observación",
        "Ibuprofeno y control en 48 horas"
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
