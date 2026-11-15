// Pediatría: contenido incluido en la app (starter pack de la versión gratuita).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: ped-c01 (casos), ped-f01 (fichas), ped-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Pediatría",
  "prefijo": "ped",
  "actualizado": "2026-11-15",
  "casos": [
    {
      "id": 5,
      "topic": "Vía Aérea · Laringotraqueítis",
      "difficulty": "Nivel 2",
      "src": "cps_croup",
      "vignette": "Niño de 2 años con cuadro de 2 días de rinorrea y febrícula, quien presenta esta noche <span class='hy'>tos perruna (metálica), disfonía y estridor inspiratorio en reposo</span> sin babeo ni posición en trípode. ¿Cuál es la terapia inicial más efectiva?",
      "options": [
        "Nebulización con salbutamol y amoxicilina oral",
        "Intubación endotraqueal inmediata en quirófano bajo sospecha de epiglotitis",
        "Dexametasona dosis única + adrenalina racémica nebulizada",
        "Azitromicina oral y vapor frío domiciliario"
      ],
      "correct": 2,
      "whyCorrect": "Es un Crup (laringotraqueítis viral) moderado-severo por presentar estridor en reposo. Todo crup recibe dexametasona (0.15–0.6 mg/kg) y, al tener estridor en reposo, se añade adrenalina nebulizada para reducir rápido el edema subglótico.",
      "pearl": "Crup = Parainfluenza, tos perruna, estridor inspiratorio. Epiglotitis = H. influenzae, babeo, disfagia, aspecto tóxico, signo del pulgar.",
      "trap": "Confundir Crup con bronquiolitis (sibilancias en < 2 años) o con epiglotitis (babeo + toxicidad)."
    },
    {
      "id": 11,
      "topic": "Deshidratación · Diarrea Aguda",
      "difficulty": "Nivel 2",
      "src": "who_dia",
      "vignette": "Lactante de 10 meses (peso 9 kg) con diarrea acuosa abundante. Está <span class='hy'>irritable, con ojos hundidos, boca seca, bebe con avidez</span> y el pliegue cutáneo vuelve lentamente (&lt; 2 s). Tolera vía oral. ¿Plan de hidratación?",
      "options": [
        "Plan B: Sales de Rehidratación Oral (SRO) de baja osmolaridad ≈ 75 mL/kg en 4 horas",
        "Plan A: líquidos caseros a libre demanda y zinc",
        "Plan C: Bolo de lactato de Ringer 20 mL/kg IV inmediato",
        "Suspender lactancia materna y administrar loperamida"
      ],
      "correct": 0,
      "whyCorrect": "Presenta deshidratación leve-moderada ('algún grado de deshidratación': irritable, ojos hundidos, bebe con avidez, pliegue lento). Si tolera la vía oral, se indica Plan B con SRO de baja osmolaridad (≈ 75 mL/kg en 4 h según la OMS) más zinc. La guía OMS 2024 desaconseja antibióticos en la diarrea acuosa aguda.",
      "pearl": "Plan B = deshidratación sin choque → SRO ≈ 75 mL/kg en 4 h (otras guías usan 50–100 mL/kg). Plan C = choque o intolerancia oral grave → IV rápido.",
      "trap": "Pasar directamente a líquidos IV en un niño que bebe con avidez o suspender la lactancia materna."
    },
    {
      "id": 17,
      "topic": "Neumología · Bronquiolitis",
      "difficulty": "Nivel 2",
      "src": "aap_bq",
      "vignette": "Lactante de 4 meses previamente sano con coriza hace 3 días, ahora con <span class='hy'>taquipnea, tirajes subcostales, sibilancias espiratorias difusas y SatO2 89%</span>. Sin fiebre alta ni consolidación. ¿Manejo indicado?",
      "options": [
        "Prednisolona oral 2 mg/kg + amoxicilina-clavulanato",
        "Salbutamol horario programado + nebulización con solución hipertónica obligatoria",
        "Ribavirina intravenosa de rutina",
        "Oxígeno suplementario (meta SatO2 ≥ 90-92%), aspiración nasal suave e hidratación"
      ],
      "correct": 3,
      "whyCorrect": "Primer episodio de sibilancias en < 2 años precedido de infección viral respiratoria = Bronquiolitis (VSR #1). El manejo es estrictamente de soporte: oxígeno si SatO2 < 90-92%, hidratación y limpieza nasal.",
      "pearl": "En bronquiolitis NO están indicados de rutina: corticoides, antibióticos ni broncodilatadores.",
      "trap": "Tratar una bronquiolitis como si fuera una crisis asmática con corticoides y salbutamol programado."
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
      "whyCorrect": "Fiebre ≥ 5 días más ≥ 4 de 5 criterios (conjuntivitis, cambios orales, exantema, cambios en extremidades, adenopatía cervical ≥ 1.5 cm) define la enfermedad de Kawasaki. La IGIV dentro de los primeros 10 días reduce los aneurismas coronarios.",
      "pearl": "Kawasaki: ecocardiograma al diagnóstico. Es la principal causa de cardiopatía adquirida en niños de países desarrollados.",
      "trap": "Confundirlo con escarlatina o con una infección viral y retrasar la IGIV más allá del día 10."
    }
  ],
  "fichas": [
    {
      "id": "hy5",
      "title": "Crup vs. Epiglotitis",
      "badge": "Estridor Agudo",
      "src": "cps_croup",
      "accent": "#06b6d4",
      "thresholds": [
        {
          "label": "Crup",
          "val": "Tos perruna + disfonía"
        },
        {
          "label": "Manejo Crup",
          "val": "Dexametasona + Adren."
        },
        {
          "label": "Epiglotitis",
          "val": "Babeo + Trípode"
        }
      ],
      "redFlag": "Niño tóxico con babeo y boca abierta = Epiglotitis. NO explorar garganta con bajalenguas.",
      "trap": "Dar salbutamol en crup (no actúa en edema subglótico) o pedir Rx antes de asegurar vía aérea en epiglotitis."
    }
  ],
  "tarjetas": [
    {
      "id": 29,
      "src": "aap_bq",
      "front": "Agente más común de bronquiolitis",
      "back": "Virus sincitial respiratorio (VSR)"
    },
    {
      "id": 30,
      "src": "cps_croup",
      "front": "Agente más común de crup",
      "back": "Parainfluenza"
    },
    {
      "id": 31,
      "src": "aha_kaw",
      "front": "Kawasaki: tratamiento",
      "back": "IGIV 2 g/kg + AAS, idealmente antes del día 10"
    },
    {
      "id": 32,
      "src": "aap_fs",
      "front": "Convulsión febril simple",
      "back": "6 m–5 años, generalizada, < 15 min, una sola en 24 h"
    },
    {
      "id": 33,
      "src": "aap_bili",
      "front": "Ictericia neonatal en las primeras 24 h de vida",
      "back": "Siempre patológica"
    },
    {
      "id": 34,
      "src": "who_dia",
      "front": "Plan B de hidratación (OMS)",
      "back": "SRO de baja osmolaridad ≈ 75 mL/kg en 4 h + zinc"
    },
    {
      "id": 35,
      "src": "aap_oma",
      "front": "Antibiótico de primera línea en otitis media aguda",
      "back": "Amoxicilina a dosis altas (80–90 mg/kg/día)"
    }
  ]
});
