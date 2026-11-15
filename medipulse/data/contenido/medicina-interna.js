// Medicina Interna: contenido incluido en la app (starter pack de la versión gratuita).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: mi-c01 (casos), mi-f01 (fichas), mi-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Medicina Interna",
  "prefijo": "mi",
  "actualizado": "2026-11-15",
  "casos": [
    {
      "id": 1,
      "topic": "Cardiología · SCA",
      "difficulty": "Nivel 3",
      "src": "acc_acs",
      "vignette": "Hombre de 62 años con HTA y tabaquismo consulta por <span class='hy'>dolor retroesternal opresivo de 90 minutos</span> irradiado a mandíbula y diaforesis. PA 135/85 mmHg, FC 92 lpm, SatO2 96%. ECG muestra <span class='hy'>supradesnivel del ST de 3 mm en V1-V4</span>. El centro cuenta con sala de hemodinamia disponible en 45 minutos. ¿Cuál es la conducta de reperfusión prioritaria?",
      "options": [
        "Administrar alteplasa intravenosa inmediata antes del traslado a sala",
        "Iniciar heparina de bajo peso molecular y esperar troponinas seriadas a las 3 horas",
        "Intervención coronaria percutánea (ICP) primaria dentro de los próximos 90 minutos",
        "Realizar ecocardiograma transtorácico antes de definir terapia antitrombótica"
      ],
      "correct": 2,
      "whyCorrect": "En un IAMCEST con disponibilidad de hemodinamia en menos de 120 minutos desde el primer contacto médico, la ICP primaria es el estándar de oro (meta puerta-balón ≤ 90 min). No se debe retrasar por troponinas ni ecocardiograma.",
      "pearl": "IAMCEST = diagnóstico electrocardiográfico y clínico. Tiempo es miocardio: ICP < 120 min; si no es posible, fibrinólisis en < 10 min.",
      "trap": "Esperar troponinas en un paciente con supradesnivel claro del ST es el error clásico que retrasa la reperfusión y aumenta mortalidad."
    },
    {
      "id": 3,
      "topic": "Endocrinología · Crisis Hiperglucémica",
      "difficulty": "Nivel 3",
      "src": "ada_cri",
      "vignette": "Joven de 22 años con DM1 ingresa por vómitos y respiración de Kussmaul. Glucemia 480 mg/dL, pH arterial 7.14, HCO3 10 mEq/L, cetonuria +++, Na+ 132 mEq/L, <span class='hy'>K+ sérico 3.1 mEq/L</span>. ¿Qué acción es obligatoria ANTES de iniciar la infusión de insulina?",
      "options": [
        "Iniciar reposición de potasio IV junto con hidratación y diferir insulina hasta K+ ≥ 3.3 mEq/L",
        "Administrar bicarbonato de sodio IV para corregir el pH < 7.20",
        "Pasar bolo de insulina regular 0.15 U/kg IV de inmediato",
        "Corregir el sodio sérico con solución salina hipertónica al 3%"
      ],
      "correct": 0,
      "whyCorrect": "En cetoacidosis diabética (CAD), la insulina desplaza potasio al espacio intracelular. Si K+ < 3.3 mEq/L, dar insulina precipita arritmias fatales; se debe reponer potasio primero hasta ≥ 3.3 mEq/L.",
      "pearl": "Regla de oro en CAD: K+ < 3.3 → NO insulina, reponer K+ primero. Bicarbonato solo si pH < 6.9.",
      "trap": "La mayoría cae en dar insulina inmediata por la glucemia de 480 o bicarbonato por el pH de 7.14. Siempre mira el potasio primero."
    },
    {
      "id": 7,
      "topic": "Neurología · ACV Isquémico",
      "difficulty": "Nivel 3",
      "src": "aha_acv",
      "vignette": "Hombre de 68 años llega a urgencias con <span class='hy'>hemiparesia derecha y afasia de inicio súbito hace 2 horas</span>. NIHSS 12. <span class='hy'>TAC cerebral simple sin hemorragia</span> ni signos de infarto extenso. PA 172/94 mmHg, glucemia 118 mg/dL, sin cirugías recientes ni anticoagulación. ¿Conducta inmediata?",
      "options": [
        "Administrar ácido acetilsalicílico 300 mg VO y observar evolución 24 horas",
        "Bajar la presión arterial a < 120/80 mmHg con nitroprusiato antes de trombolizar",
        "Iniciar heparina no fraccionada en infusión continua",
        "Trombólisis intravenosa con alteplasa (o tenecteplasa) de inmediato"
      ],
      "correct": 3,
      "whyCorrect": "Está dentro de la ventana terapéutica (< 4.5 horas), con TAC sin sangrado y PA < 185/110 mmHg. No tiene contraindicaciones, por lo que debe recibir trombólisis IV de inmediato.",
      "pearl": "Meta de PA ANTES de trombólisis en ACV isquémico: < 185/110 mmHg (luego mantener < 180/105). No bajar agresivamente si no se tromboliza.",
      "trap": "Dar aspirina o bajar demasiado la PA antes de decidir trombólisis compromete la penumbra isquémica."
    },
    {
      "id": 9,
      "topic": "Infectología · Meningitis",
      "difficulty": "Nivel 3",
      "src": "who_men",
      "vignette": "Adulto de 35 años con fiebre, cefalea intensa, rigidez de nuca y petequias en tronco. Glasgow 13/15, sin déficit focal ni papiledema. ¿Cuál es la secuencia correcta?",
      "options": [
        "TAC cerebral primero; luego punción lumbar y al tener el resultado iniciar antibióticos",
        "Hemocultivos + dexametasona IV + ceftriaxona + vancomicina de inmediato, y realizar PL",
        "Solo aciclovir IV hasta confirmar etiología bacteriana en LCR",
        "Punción lumbar inmediata sin hemocultivos y observar respuesta a antipiréticos"
      ],
      "correct": 1,
      "whyCorrect": "Ante sospecha de meningitis bacteriana aguda sin indicación de TAC previa (no inmunosuprimido, sin focalización, sin convulsiones recientes ni papiledema), nunca se deben retrasar los antibióticos ni la dexametasona; se toman hemocultivos y se inicia terapia empírica + dexametasona de inmediato.",
      "pearl": "Dexametasona se administra ANTES o CON la primera dosis de antibiótico para reducir inflamación meníngea y secuelas neurológicas (sobre todo S. pneumoniae).",
      "trap": "Esperar a tener una TAC o el citoquímico del LCR antes de dar antibióticos aumenta exponencialmente la mortalidad."
    },
    {
      "id": 13,
      "topic": "Nefrología · Hiperkalemia",
      "difficulty": "Nivel 3",
      "src": "ukka_k",
      "vignette": "Paciente con ERC estadio 5 llega por debilidad muscular. <span class='hy'>K+ sérico 7.1 mEq/L</span> y ECG muestra <span class='hy'>ondas T picudas y ensanchamiento del QRS</span>. ¿Cuál es el primer fármaco a administrar?",
      "options": [
        "Gluconato de calcio al 10% IV para estabilizar membrana miocárdica",
        "Resina de intercambio iónico (poliestireno sulfonato) vía oral",
        "Insulina regular 10 U + dextrosa al 50% como única medida",
        "Furosemida oral y restricción dietética de potasio"
      ],
      "correct": 0,
      "whyCorrect": "Ante hiperkalemia severa con cambios electrocardiográficos (ensanchamiento del QRS, T picudas), la prioridad absoluta en segundos es estabilizar el potencial de membrana cardíaco con gluconato de calcio al 10% IV (no baja el K+, pero evita la fibrilación ventricular).",
      "pearl": "Orden lógico en hiperkalemia grave: 1) Estabilizar (Gluconato de Ca2+), 2) Redistribuir (Insulina+Dextrosa, Salbutamol), 3) Eliminar (Diurético/Diálisis).",
      "trap": "Administrar insulina primero sin proteger el corazón cuando ya hay ensanchamiento del QRS."
    },
    {
      "id": 16,
      "topic": "Neumología · TEP",
      "difficulty": "Nivel 3",
      "src": "aha_tep",
      "vignette": "Mujer de 54 años en posoperatorio de reemplazo de cadera presenta <span class='hy'>disnea súbita, dolor pleurítico, FC 116 lpm, FR 26 rpm y SatO2 88%</span>. PA 115/75 mmHg. Probabilidad clínica por Wells: 7.5 puntos (alta). ¿Estudio diagnóstico de elección?",
      "options": [
        "Solicitar Dímero D y si es negativo descartar TEP",
        "Espirometría forzada con broncodilatador",
        "AngioTAC de tórax (protocolo TEP) e inicio empírico de anticoagulación si no hay contraindicación",
        "Radiografía de tórax normal descarta el diagnóstico"
      ],
      "correct": 2,
      "whyCorrect": "Con probabilidad clínica alta (Wells > 6 o > 4 en modelo dicotomizado), el Dímero D NO se solicita porque un resultado negativo no descarta con seguridad suficiente; se va directo a AngioTAC pulmonar y anticoagulación.",
      "pearl": "Dímero D solo sirve para DESCARTAR TEP en probabilidad baja o intermedia (alto valor predictivo negativo).",
      "trap": "Pedir Dímero D en un paciente con Wells alto es un error clásico de examen que retrasa el diagnóstico."
    },
    {
      "id": 21,
      "topic": "Cardiología · Arritmias",
      "difficulty": "Nivel 2",
      "src": "acc_fa",
      "vignette": "Mujer de 70 años con palpitaciones de 6 horas. FC 168 lpm irregular, <span class='hy'>PA 76/48 mmHg</span>, diaforética y somnolienta. ECG: fibrilación auricular con respuesta ventricular rápida. ¿Conducta inmediata?",
      "options": [
        "Amiodarona IV en infusión y reevaluar en 24 horas",
        "Cardioversión eléctrica sincronizada",
        "Metoprolol IV en bolos para control de frecuencia",
        "Anticoagular 3 semanas y luego cardiovertir"
      ],
      "correct": 1,
      "whyCorrect": "Toda taquiarritmia con inestabilidad hemodinámica (hipotensión, alteración de conciencia, dolor torácico isquémico o insuficiencia cardíaca aguda) se trata con cardioversión eléctrica sincronizada inmediata, sin importar el tiempo de evolución.",
      "pearl": "Inestable = electricidad. Estable = fármacos (control de frecuencia o ritmo). Anticoagular por CHA₂DS₂-VASc ≥ 2 en hombres y ≥ 3 en mujeres.",
      "trap": "Dar betabloqueador IV a una paciente hipotensa: empeora el choque."
    },
    {
      "id": 26,
      "topic": "Nefrología · Hiponatremia",
      "difficulty": "Nivel 3",
      "src": "eu_hna",
      "vignette": "Mujer de 74 años con náuseas y somnolencia leve de 1 semana de evolución tras iniciar tiazida. <span class='hy'>Na⁺ 112 mEq/L</span>, sin convulsiones. Se inicia corrección. ¿Cuál es el límite de corrección en las primeras 24 h?",
      "options": [
        "Hasta normalizar el sodio (135 mEq/L) en 24 horas",
        "Al menos 20 mEq/L en 24 horas para evitar edema cerebral",
        "No importa la velocidad si la paciente está asintomática",
        "No más de 8–10 mEq/L en 24 horas"
      ],
      "correct": 3,
      "whyCorrect": "En la hiponatremia crónica (> 48 h), la corrección rápida causa el síndrome de desmielinización osmótica (mielinólisis pontina). El límite es de 8–10 mEq/L en 24 h; en pacientes de alto riesgo, 8 mEq/L.",
      "pearl": "Síntomas graves (convulsiones, coma): bolo de NaCl 3% para subir 4–6 mEq/L rápido, sin pasar el límite diario.",
      "trap": "Normalizar el sodio en un día porque la paciente se ve bien."
    }
  ],
  "fichas": [
    {
      "id": "hy2",
      "title": "Cetoacidosis Diabética (CAD)",
      "badge": "Emergencia Endocrina",
      "src": "ada_cri",
      "accent": "#f59e0b",
      "thresholds": [
        {
          "label": "Glucemia",
          "val": "> 250 mg/dL"
        },
        {
          "label": "pH / HCO3",
          "val": "< 7.30 / < 18"
        },
        {
          "label": "Regla K+",
          "val": "Si < 3.3 NO insulina"
        }
      ],
      "redFlag": "K+ < 3.3 mEq/L: reponer potasio antes de insulina o habrá paro por hipokalemia.",
      "trap": "Suspender insulina cuando glucemia baja a 200 mg/dL: se debe agregar dextrosa y mantener insulina hasta cerrar brecha aniónica."
    },
    {
      "id": "hy4",
      "title": "Hiperkalemia Grave",
      "badge": "Electrocardiograma",
      "src": "ukka_k",
      "accent": "#10b981",
      "thresholds": [
        {
          "label": "1° Estabilizar",
          "val": "Gluconato Ca 10%"
        },
        {
          "label": "2° Redistribuir",
          "val": "Insulina + Dextrosa"
        },
        {
          "label": "3° Eliminar",
          "val": "Furosemida / Diálisis"
        }
      ],
      "redFlag": "Ondas T picudas → PR largo → QRS ancho → patrón sinusoidal → FV.",
      "trap": "Creer que el gluconato de calcio baja el potasio sérico: solo protege el miocardio por 30-60 minutos."
    }
  ],
  "tarjetas": [
    {
      "id": 1,
      "src": "aha_acv",
      "front": "Meta de PA antes de trombolizar un ACV isquémico",
      "back": "< 185/110 mmHg"
    },
    {
      "id": 2,
      "src": "aha_acv",
      "front": "Ventana para alteplasa IV en ACV isquémico",
      "back": "Hasta 4.5 h desde la última vez que se vio bien al paciente"
    },
    {
      "id": 3,
      "src": "ada_soc",
      "front": "Glucosa en ayunas diagnóstica de diabetes",
      "back": "≥ 126 mg/dL (confirmar en 2 ocasiones)"
    },
    {
      "id": 4,
      "src": "ada_soc",
      "front": "HbA1c diagnóstica de diabetes",
      "back": "≥ 6.5 %"
    },
    {
      "id": 5,
      "src": "eu_hna",
      "front": "Velocidad máxima de corrección de Na⁺ en hiponatremia crónica",
      "back": "8–10 mEq/L en 24 h (riesgo de desmielinización osmótica)"
    },
    {
      "id": 6,
      "src": "atls11",
      "front": "Tríada de Beck",
      "back": "Hipotensión + ingurgitación yugular + ruidos cardíacos apagados → taponamiento"
    },
    {
      "id": 7,
      "src": "acc_fa",
      "front": "FA con inestabilidad hemodinámica",
      "back": "Cardioversión eléctrica sincronizada"
    },
    {
      "id": 8,
      "src": "esc_fa",
      "front": "Umbral para anticoagular en FA",
      "back": "ESC 2024: CHA₂DS₂-VA ≥ 2 (ya no suma el sexo) · ACC/AHA 2023: CHA₂DS₂-VASc ≥ 2 en hombres, ≥ 3 en mujeres"
    },
    {
      "id": 9,
      "src": "nice_nm",
      "front": "CURB-65: riesgo y conducta",
      "back": "0–1 bajo (manejo ambulatorio) · 2 intermedio (valorar ingreso) · 3–5 alto (hospitalizar, valorar UCI)"
    },
    {
      "id": 10,
      "src": "ukka_k",
      "front": "Primer paso en hiperkalemia con cambios en ECG",
      "back": "Gluconato de calcio 10 % IV (estabiliza membrana, no baja K⁺)"
    },
    {
      "id": 11,
      "src": "ada_soc",
      "front": "Hipoglucemia en paciente consciente",
      "back": "15 g de carbohidrato oral, glucemia de control a los 15 min"
    },
    {
      "id": 47,
      "src": "aha_acv",
      "front": "Tenecteplasa en ACV isquémico: dosis",
      "back": "0.25 mg/kg IV en bolo (máx. 25 mg), alternativa a la alteplasa en < 4.5 h"
    },
    {
      "id": 48,
      "src": "aha_acv",
      "front": "PA durante y 24 h después de trombolizar un ACV",
      "back": "< 180/105 mmHg (bajar < 140 de sistólica no aporta beneficio)"
    },
    {
      "id": 53,
      "src": "aha_tep",
      "front": "TEP de alto riesgo / evaluación multidisciplinaria (AHA/ACC 2026)",
      "back": "Activar el equipo PERT; HBPM preferida sobre heparina no fraccionada en la mayoría"
    }
  ]
});
