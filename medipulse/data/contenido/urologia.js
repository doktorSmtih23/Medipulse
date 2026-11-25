// Urología: contenido incluido en la app · paquete "urologia" (módulo aparte; aún no entra al diagnóstico).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Urología",
  "prefijo": "uro",
  "paquete": "urologia",
  "actualizado": "2026-11-25",
  "casos": [
    {
      "id": "uro-c01",
      "topic": "Litiasis urinaria · Diagnóstico por imagen",
      "difficulty": "basica",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 38 años con <span class='hy'>dolor lumbar izquierdo súbito, tipo cólico, que irradia a la ingle</span>, con náuseas y hematuria microscópica. No tiene fiebre. ¿Qué estudio es el de referencia para confirmar el cálculo?",
      "options": [
        "Tomografía de abdomen sin contraste",
        "Urografía excretora con medio de contraste",
        "Radiografía simple de abdomen de pie",
        "Ecografía renal y de las vías urinarias"
      ],
      "correct": 0,
      "whyCorrect": "La tomografía sin contraste es el patrón de referencia: muestra el cálculo y los signos secundarios de obstrucción (hidronefrosis, edema perirrenal y aumento del tamaño renal).",
      "pearl": "La ecografía detecta 70 % de los cálculos renales, pero solo 57,3 % de los ureterales: sirve de inicio para ver obstrucción, no para descartar un cálculo en el uréter.",
      "trap": "Quedarse con una ecografía normal o pedir urografía con contraste.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "A non-contrast CT scan is the gold standard for diagnosis of kidney stones and secondary signs of obstruction (hydronephrosis, perinephric stranding and renal engorgement)."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "Ultrasonography has a sensitivity of 70% and specificity of 94% for identifying renal stones, but sensitivity is considerably lower, at 57.3%, for ureteral stones."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "uro-c02",
      "topic": "Litiasis urinaria · Cólico renal en el embarazo",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 27 años con <span class='hy'>embarazo de 24 semanas</span> consulta por dolor lumbar derecho tipo cólico que irradia a la ingle. Signos vitales normales, sin fiebre. ¿Cuál es el primer estudio de imagen?",
      "options": [
        "Tomografía de abdomen con baja dosis",
        "Ecografía renal y de vías urinarias",
        "Resonancia magnética de abdomen y pelvis",
        "Urografía excretora con pocas placas"
      ],
      "correct": 1,
      "whyCorrect": "En embarazadas y niños la ecografía es el estudio de elección; la resonancia es la segunda opción y la tomografía de baja dosis, la tercera.",
      "pearl": "Orden en el embarazo: ecografía → resonancia → tomografía de baja dosis.",
      "trap": "Pedir tomografía de entrada porque es el patrón de referencia en la población general.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Diagnóstico",
          "texto": "Ultrasonography has a sensitivity of 70% and specificity of 94% for identifying renal stones, but sensitivity is considerably lower, at 57.3%, for ureteral stones. This imaging modality can be used initially to detect obstruction. It is the test of choice in sensitive populations, such as pregnant women and children, for whom MRI and low-dose CT are the second-line and third-line options, respectively."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "uro-c03",
      "topic": "Litiasis urinaria · Tratamiento según el tamaño",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 50 años con un <span class='hy'>cálculo de 26 mm en la pelvis renal</span> derecha, sintomático, con función renal normal. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Litotricia extracorpórea con ondas de choque",
        "Ureteroscopia flexible con láser y canastilla",
        "Observación con control de imagen en 6 meses",
        "Nefrolitotomía percutánea"
      ],
      "correct": 3,
      "whyCorrect": "Para cálculos mayores de 20 mm la nefrolitotomía percutánea es la primera línea. Hasta 20 mm se proponen la ureteroscopia o la litotricia extracorpórea.",
      "pearl": "En cálculos de polo inferior de hasta 20 mm, sobre todo con anatomía desfavorable o cálculos duros, puede preferirse la ureteroscopia.",
      "trap": "Ofrecer litotricia extracorpórea a un cálculo de más de 20 mm.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Manejo",
          "texto": "For stones ≤20 mm, both ureteroscopy and SWL are proposed in international guidelines, although for lower pole stones ≤20 mm, especially those with unfavourable anatomy or hard stones, ureteroscopy might be preferred. For stones >20 mm, PCNL is the proposed first-line treatment option."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "uro-c04",
      "topic": "Litiasis urinaria · Prevención: calcio en la dieta",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Hombre de 44 años con su <span class='hy'>primer cálculo de oxalato de calcio</span>, ya expulsado. Leyó que debe dejar los lácteos y pregunta cuánto calcio puede comer. ¿Qué le recomiendas?",
      "options": [
        "Dieta baja en calcio, menos de 400 mg al día",
        "Suspender todos los productos lácteos de por vida",
        "Calcio de 1 a 1,2 g al día, sin restringirlo",
        "Calcio libre, pero solo en suplementos y nunca con comida"
      ],
      "correct": 2,
      "whyCorrect": "Restringir el calcio aumenta el riesgo: el calcio de la comida se une al oxalato en el intestino; si falta, se absorbe más oxalato y se excreta más por la orina. Se recomienda 1 a 1,2 g/día, sin restricción.",
      "pearl": "La sal sí se limita: 4 a 5 g de cloruro de sodio al día (2.000 mg de sodio).",
      "trap": "Indicar dieta baja en calcio a quien forma cálculos de oxalato de calcio.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "Paradoxically, low dietary calcium intake increases stone risk by reducing intestinal binding of oxalate, leading to increased absorption and urinary oxalate excretion."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "Calcium intake should be 1–1.2 g/day and not restricted."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "uro-c05",
      "topic": "Litiasis urinaria · Prevención: líquidos",
      "difficulty": "basica",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 35 años después de su <span class='hy'>primer episodio de litiasis</span>. Quiere saber cuánto líquido debe tomar para no repetir. ¿Qué meta le indicas?",
      "options": [
        "Orinar 2 a 2,5 L al día (tomar 2,5 a 3 L)",
        "Tomar cerca de 1 litro de agua repartido durante el día",
        "Lograr una diuresis de al menos 1 litro diario",
        "Tomar 5 litros de agua al día o incluso más"
      ],
      "correct": 0,
      "whyCorrect": "La meta es producir 2 a 2,5 L de orina al día, lo que exige tomar 2,5 a 3 L. En un ensayo, lograr al menos 2 L/día de orina bajó la recurrencia de 27,0 % a 12,1 % en 5 años.",
      "pearl": "El agua es la base; los jugos cítricos suman porque aumentan el citrato urinario y alcalinizan la orina.",
      "trap": "Dar una meta de líquidos baja (1 L) o expresarla solo como lo que se toma, sin la diuresis.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "A target of producing 2–2.5 l of urine daily, and therefore fluid intake of 2.5–3 l, is advised."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Prevención",
          "texto": "increased water intake to achieve ≥2 l/day urine volume reduced stone recurrence from 27.0% to 12.1% (P = 0.008) over 5 years"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "uro-c06",
      "topic": "Litiasis urinaria · Cálculo de estruvita",
      "difficulty": "residencia",
      "src": "nrdp_litiasis26",
      "vignette": "Mujer de 61 años con <span class='hy'>infecciones urinarias a repetición por Proteus mirabilis</span> y un cálculo coraliforme en el riñón izquierdo. La orina tiene <span class='hy'>pH alcalino</span>. ¿De qué está hecho probablemente el cálculo?",
      "options": [
        "Oxalato de calcio, el tipo más frecuente",
        "Ácido úrico, que precipita en orina ácida",
        "Fosfato de amonio y magnesio (estruvita)",
        "Cistina, por un defecto hereditario"
      ],
      "correct": 2,
      "whyCorrect": "Las bacterias productoras de ureasa (Proteus mirabilis, Klebsiella y algunos estafilococos) hidrolizan la urea a amoníaco y alcalinizan la orina, lo que precipita el fosfato de amonio y magnesio (estruvita) y la carbonato apatita.",
      "pearl": "El pH orienta: menor de 5,5 favorece el ácido úrico; mayor de 6,5, el fosfato de calcio.",
      "trap": "Pensar en ácido úrico ante un cálculo grande: ese precipita en orina ácida, no alcalina.",
      "cita": [
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Fisiopatología",
          "texto": "Urease-producing bacteria, such as Proteus mirabilis, Klebsiella species and some Staphylococcus strains, hydrolyse urea to ammonia and carbon dioxide, generating alkaline urine, which promotes the precipitation of magnesium ammonium phosphate (struvite) and carbonate apatite."
        },
        {
          "donde": "Kidney stones, Nature Reviews Disease Primers 2026;12:74, Fisiopatología",
          "texto": "a persistently low urinary pH (<5.5) favours uric acid precipitation, whereas high urinary pH (>6.5) facilitates calcium phosphate crystallization"
        }
      ],
      "verificado": "2026-11-25"
    }
  ],
  "fichas": [],
  "tarjetas": [],
  "revision": "verificada"
});
