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
      "src": "acog_htn",
      "vignette": "Gestante de 34 semanas consulta por <span class='hy'>cefalea frontal intensa, fosfenos y epigastralgia</span>. PA 168/112 mmHg en dos tomas, proteinuria en tira +++, plaquetas 88.000/mm³, AST 145 U/L. ¿Cuál es el manejo farmacológico prioritario para prevención de eclampsia y control tensional?",
      "options": [
        "Diazepam IV en infusión + losartán oral 50 mg",
        "Alfamelildopa oral 500 mg cada 8 horas y control ambulatorio en 48 horas",
        "Sulfato de magnesio (esquema Zuspan) + labetalol o nifedipino oral de acción rápida",
        "Furosemida IV + inducción del parto diferida hasta las 37 semanas"
      ],
      "correct": 2,
      "whyCorrect": "Presenta preeclampsia con criterios de severidad (PA ≥ 160/110, síntomas neurológicos, trombocitopenia < 100.000, elevación de transaminasas). Requiere sulfato de magnesio para neuroprotección/profilaxis de eclampsia y antihipertensivo agudo (labetalol IV o nifedipino oral).",
      "pearl": "Sulfato de magnesio es el fármaco de elección para prevenir y tratar convulsiones eclámpticas (vigilar reflejo patelar, FR y diuresis).",
      "trap": "Los IECA/ARA-II (losartán) están contraindicados en embarazo, y las benzodiacepinas no reemplazan al sulfato de magnesio."
    },
    {
      "id": 12,
      "topic": "Hemorragia Obstétrica · Código Rojo",
      "difficulty": "Nivel 3",
      "src": "who_hpp",
      "vignette": "Puérpera inmediata tras parto vaginal prolongado presenta <span class='hy'>sangrado vaginal abundante (&gt; 1000 mL), PA 82/50 mmHg, FC 122 lpm y útero blando por encima del ombligo</span>. ¿Causa más probable y primera medida farmacológica?",
      "options": [
        "Atonía uterina · Masaje uterino bimanual + oxitocina IV + ácido tranexámico",
        "Desgarro cervical · Sutura inmediata sin uterotónicos",
        "Acretismo placentario · Histerectomía inmediata sin reanimación",
        "Coagulopatía primaria · Transfusión aislada de plaquetas"
      ],
      "correct": 0,
      "whyCorrect": "El útero blando/atónico sobre el ombligo es signo cardinal de atonía uterina (causa #1 de hemorragia posparto, ~70-80%). Se activa Código Rojo: masaje uterino, cristaloides tibios, oxitocina IV y ácido tranexámico (1 g IV en < 3 h).",
      "pearl": "Las 4 T de la HPP: Tono (70-80%), Trauma (20%), Tejido (10%), Trombina (<1%). OMS/FIGO 2025: diagnosticar con ≥ 500 mL, o ≥ 300 mL con signos vitales anormales, y aplicar el paquete MOTIVE (masaje, oxitócico, ácido tranexámico en < 3 h, líquidos IV, revisión del tracto genital, escalar).",
      "trap": "Olvidar el ácido tranexámico temprano o buscar primero coagulopatía antes de tratar el tono."
    },
    {
      "id": 18,
      "topic": "Ginecología · Embarazo Ectópico",
      "difficulty": "Nivel 3",
      "src": "acog_ect",
      "vignette": "Mujer de 27 años con amenorrea de 6 semanas, <span class='hy'>dolor en fosa ilíaca izquierda, sangrado vaginal escaso y PA 84/52 mmHg, FC 120 lpm</span>. β-hCG positiva, ecografía transvaginal: útero vacío y líquido libre abundante en fondo de saco de Douglas. ¿Conducta?",
      "options": [
        "Metotrexato 50 mg/m² IM en dosis única",
        "Repetir β-hCG en 48 horas para verificar duplicación",
        "Legrado uterino obstétrico por aborto incompleto",
        "Reanimación con cristaloides + laparoscopia (o laparotomía) quirúrgica urgente"
      ],
      "correct": 3,
      "whyCorrect": "Tiene embarazo ectópico roto con inestabilidad hemodinámica y hemoperitoneo (líquido libre abundante). El metotrexato está absolutamente contraindicado en inestabilidad hemodinámica; requiere cirugía urgente.",
      "pearl": "Metotrexato en ectópico SOLO si: paciente estable, sin líquido libre abundante, β-hCG < 5000 (ideal), sin embriocardia y con seguimiento garantizado.",
      "trap": "Indicar metotrexato o esperar 48 h en una paciente hipotensa con hemoperitoneo."
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
      "trap": "Hacer tacto vaginal de rutina ante cualquier sangrado del tercer trimestre."
    }
  ],
  "fichas": [
    {
      "id": "hy3",
      "title": "Preeclampsia con Severidad",
      "badge": "Obstetricia Crítica",
      "src": "acog_htn",
      "accent": "#f43f5e",
      "thresholds": [
        {
          "label": "PA Severa",
          "val": "≥ 160/110 mmHg"
        },
        {
          "label": "Plaquetas",
          "val": "< 100.000/mm³"
        },
        {
          "label": "Neuroprotección",
          "val": "Sulfato de Mg"
        }
      ],
      "redFlag": "Cefalea persistente, fosfenos, epigastralgia o clonus = riesgo inminente de eclampsia.",
      "trap": "Usar losartán o enalapril en embarazo (teratogénicos) o bajar la PA demasiado rápido (< 130/80 compromete perfusión placentaria)."
    }
  ],
  "tarjetas": [
    {
      "id": 36,
      "src": "williams",
      "front": "Regla de Naegele",
      "back": "FUM + 7 días − 3 meses (+ 1 año)"
    },
    {
      "id": 37,
      "src": "acog_htn",
      "front": "Dosis de impregnación de sulfato de Mg (Zuspan)",
      "back": "4 g IV en 15–20 min, luego 1 g/h"
    },
    {
      "id": 38,
      "src": "acog_htn",
      "front": "Antídoto de la toxicidad por sulfato de Mg",
      "back": "Gluconato de calcio 10 %"
    },
    {
      "id": 39,
      "src": "acog_cort",
      "front": "Maduración pulmonar fetal",
      "back": "Betametasona 12 mg IM c/24 h × 2 dosis (24–34 sem)"
    },
    {
      "id": 40,
      "src": "rcog_pp",
      "front": "Placenta previa vs DPPNI",
      "back": "Previa: indolora, útero blando · DPPNI: dolor + hipertonía"
    },
    {
      "id": 41,
      "src": "who_hpp",
      "front": "Causa más frecuente de hemorragia posparto",
      "back": "Atonía uterina (las 4 T: Tono, Trauma, Tejido, Trombina)"
    },
    {
      "id": 51,
      "src": "who_hpp",
      "front": "Diagnóstico de hemorragia posparto (OMS/FIGO 2025)",
      "back": "Pérdida ≥ 500 mL, o ≥ 300 mL con signos vitales anormales; medir con bolsa colectora calibrada"
    }
  ]
});
