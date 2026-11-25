// Mastología: contenido incluido en la app · paquete "mastologia" (módulo aparte; aún no entra al diagnóstico).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
MP_CONTENIDO.agregar({
  "especialidad": "Mastología",
  "prefijo": "mas",
  "paquete": "mastologia",
  "actualizado": "2026-11-25",
  "casos": [
    {
      "id": "mas-c01",
      "topic": "Lesiones con atipia · Hiperplasia ductal atípica",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 52 años. La mamografía de tamizaje muestra <span class='hy'>microcalcificaciones agrupadas con distorsión de la arquitectura</span>. La biopsia con aguja gruesa, concordante con la imagen, informa <span class='hy'>hiperplasia ductal atípica</span>, confirmada por dos patólogos. ¿Qué haces?",
      "options": [
        "Mastectomía simple por el alto riesgo de cáncer invasor",
        "Escisión diagnóstica, sin exigir márgenes negativos",
        "Resonancia magnética de mama para decidir si se opera",
        "Solo control con mamografía anual, sin más estudios"
      ],
      "correct": 1,
      "whyCorrect": "La mayoría de las hiperplasias ductales atípicas en biopsia con aguja gruesa se extirpan para descartar algo más grave. A diferencia del CLIS pleomórfico y florido, no se exige margen negativo. Esta paciente no cumple los criterios para observar, porque hay distorsión.",
      "pearl": "Se puede observar sin cirugía solo si cumple todo: no palpable, solo calcificaciones (sin masa, asimetría ni distorsión), lesión focal, más del 50 % de las calcificaciones muestreadas y concordancia.",
      "trap": "Pedir resonancia para decidir: no debe cambiar la indicación de escisión.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "Currently available evidence supports the need to diagnostically excise most ADH, P-LCIS, and F-LCIS cases identified on core biopsy, although some ADH cases fulfilling strict criteria and multidisciplinary consensus can be observed. P-LCIS and F-LCIS require a negative margin, but ADH does not."
        },
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 2, enunciado 3b",
          "texto": "Calcifications alone seen on mammogram with no associated mass, asymmetry, or distortion"
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c02",
      "topic": "Lesiones con atipia · Carcinoma lobulillar in situ clásico",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 46 años, sin antecedente de cáncer de mama. La biopsia con aguja gruesa de unas calcificaciones informa <span class='hy'>carcinoma lobulillar in situ clásico</span>, <span class='hy'>concordante</span> con la imagen. ¿Cuál es la conducta?",
      "options": [
        "Escisión quirúrgica de toda la zona con márgenes negativos",
        "Mastectomía bilateral profiláctica como primera opción de manejo",
        "Observación, asesoría de riesgo y ofrecer quimioprevención",
        "Radioterapia sobre la mama afectada después de la biopsia"
      ],
      "correct": 2,
      "whyCorrect": "El CLIS clásico y la hiperplasia lobulillar atípica concordantes no requieren escisión. Sí aumentan el riesgo de cáncer de por vida: se asesora a la paciente y se ofrecen estrategias de reducción del riesgo, incluida la quimioprevención.",
      "pearl": "Los modelos de Gail, Tyrer-Cuzick (v7 y v8) y del BCSC sobreestiman el riesgo en estas pacientes: no se usan para calcularlo.",
      "trap": "Operar el CLIS clásico como si fuera un carcinoma ductal in situ.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "ALH and C-LCIS can be safely observed if the core biopsy diagnosis is concordant with imaging features (ie, radiographic-pathologic concordance is established)."
        },
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 3, enunciado 1a",
          "texto": "Patients diagnosed with ALH and C-LCIS with no personal history of breast cancer should be counseled about their increased lifetime risk of breast cancer and should be offered risk-reducing strategies, including chemoprevention."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c03",
      "topic": "Lesiones con atipia · CLIS pleomórfico",
      "difficulty": "dificil",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 58 años. La biopsia con aguja gruesa de una lesión mamográfica informa <span class='hy'>carcinoma lobulillar in situ pleomórfico</span>. ¿Qué conducta quirúrgica corresponde?",
      "options": [
        "Observación con una mamografía de control a los 6 meses",
        "Solo quimioprevención, sin cirugía en ningún caso",
        "Escisión diagnóstica sin importar el estado de los márgenes",
        "Escisión con margen negativo"
      ],
      "correct": 3,
      "whyCorrect": "El CLIS pleomórfico y el florido se extirpan siempre, sea cual sea el estudio que los detectó, y requieren margen negativo (sin lesión en la tinta).",
      "pearl": "Margen negativo: sí en CLIS pleomórfico y florido; no en hiperplasia ductal atípica; no hace falta reoperar por HLA o CLIS clásico en el margen.",
      "trap": "Manejarlo como un CLIS clásico, que se puede observar.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "P-LCIS and F-LCIS require a negative margin, but ADH does not."
        },
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 3, enunciado 3b",
          "texto": "P-LCIS and F-LCIS identified on core biopsy should be followed by diagnostic excision regardless of the imaging modality of diagnosis."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c04",
      "topic": "Lesiones con atipia · Atipia epitelial plana",
      "difficulty": "basica",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 49 años. La biopsia con aguja gruesa de unas calcificaciones informa <span class='hy'>atipia epitelial plana</span> como único hallazgo, <span class='hy'>concordante</span> con la imagen. No tiene otros factores de riesgo. ¿Qué le indicas?",
      "options": [
        "Volver al tamizaje que le corresponde por su edad",
        "Escisión diagnóstica de toda la zona que se biopsió",
        "Quimioprevención con tamoxifeno durante cinco años",
        "Resonancia magnética de mama cada año de por vida"
      ],
      "correct": 0,
      "whyCorrect": "Con concordancia confirmada, la atipia epitelial plana sola no suele requerir escisión y no hay evidencia de que aumente el riesgo de cáncer de mama: vuelve al tamizaje habitual para su edad.",
      "pearl": "Segunda lectura de patología: se recomienda en la hiperplasia ductal atípica, se considera en la atipia epitelial plana y no hace falta en HLA ni CLIS.",
      "trap": "Tratarla como hiperplasia ductal atípica (escisión o quimioprevención).",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "Provided radiologic-pathologic concordance is confirmed, diagnostic excision is generally not indicated after a diagnosis of FEA alone."
        },
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "There is no evidence that FEA is associated with an elevated future breast cancer risk."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c05",
      "topic": "Lesiones con atipia · Segunda lectura de patología",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "En una biopsia de mama con aguja gruesa, ¿en cuál de estos diagnósticos se recomienda <span class='hy'>confirmar con un segundo patólogo</span>?",
      "options": [
        "Hiperplasia lobulillar atípica",
        "Carcinoma lobulillar in situ clásico",
        "Hiperplasia ductal atípica",
        "Carcinoma lobulillar in situ florido"
      ],
      "correct": 2,
      "whyCorrect": "La hiperplasia ductal atípica tiene mucho desacuerdo diagnóstico, incluso entre expertos, porque se confunde con el carcinoma ductal in situ de bajo grado: se confirma siempre. En la HLA y el CLIS no hace falta.",
      "pearl": "Segunda lectura: siempre en HDA, considerarla en la atipia epitelial plana, no necesaria en HLA ni CLIS.",
      "trap": "Pedir segunda lectura para toda lesión lobulillar.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Resumen",
          "texto": "A second pathology review confirmation is recommended for ADH, should be considered for FEA, and is not necessary for ALH or LCIS."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c06",
      "topic": "Lesiones con atipia · Atipia en el margen de resección",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 55 años operada con <span class='hy'>cirugía conservadora por un carcinoma ductal in situ</span>. El tumor salió con márgenes negativos, pero la patología informa <span class='hy'>hiperplasia ductal atípica en un margen</span>. ¿Qué haces con ese margen?",
      "options": [
        "Reoperar para ampliar ese margen hasta dejarlo libre",
        "No reoperar por la hiperplasia atípica en el margen",
        "Completar con una mastectomía total de esa mama",
        "Radioterapia adicional dirigida solo a ese margen"
      ],
      "correct": 1,
      "whyCorrect": "Cuando se opera por un cáncer in situ o invasor, encontrar hiperplasia ductal atípica en el margen no obliga a reoperar. Lo mismo pasa con la atipia epitelial plana, la hiperplasia lobulillar atípica y el CLIS clásico.",
      "pearl": "La excepción: si en el margen queda CLIS pleomórfico o florido, se puede considerar reoperar.",
      "trap": "Ampliar márgenes por atipia como si fuera el carcinoma.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 2, enunciado 3d",
          "texto": "In patients undergoing surgery for in situ or invasive breast cancer, re-excision is not required for ADH identified at the margin of resection."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c07",
      "topic": "Lesiones con atipia · Resonancia tras hiperplasia ductal atípica",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 50 años con <span class='hy'>hiperplasia ductal atípica</span> en biopsia con aguja gruesa de calcificaciones, concordante. Le indicarán escisión diagnóstica. ¿Pides resonancia antes para buscar un cáncer oculto?",
      "options": [
        "Sí, y si es normal se cancela la cirugía",
        "Sí, para decidir la extensión de la mastectomía",
        "Sí, siempre se pide con toda atipia",
        "No: no es necesaria ni cambia la decisión"
      ],
      "correct": 3,
      "whyCorrect": "Con un diagnóstico concordante de HDA en mamografía no hace falta más imagen. La resonancia para buscar cáncer oculto no es necesaria y no debe cambiar la decisión de hacer la escisión diagnóstica.",
      "pearl": "Tampoco se indica una resección más amplia ni mastectomía por una HDA, aunque la zona en la imagen sea extensa.",
      "trap": "Usar la resonancia para decidir si se opera.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 2, enunciado 2a",
          "texto": "No additional diagnostic imaging workup is necessary for concordant, mammographic diagnosis of ADH on core biopsy. The use of MRI to assess for the presence of occult malignancy after a core needle biopsy showing ADH is not necessary and should not influence the decision for diagnostic excision."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c08",
      "topic": "Lesiones con atipia · Cálculo del riesgo",
      "difficulty": "dificil",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 45 años con diagnóstico reciente de <span class='hy'>hiperplasia lobulillar atípica</span>, sin antecedente de cáncer. Quieres estimar su riesgo de cáncer de mama para asesorarla. ¿Qué tienes en cuenta?",
      "options": [
        "Gail y Tyrer-Cuzick sobreestiman su riesgo",
        "El modelo de Gail es el indicado en atipia",
        "Tyrer-Cuzick v8 es el único modelo validado aquí",
        "Su riesgo es el de la población general"
      ],
      "correct": 0,
      "whyCorrect": "Los modelos de Gail, Tyrer-Cuzick (v7 y v8) y del Breast Cancer Screening Consortium no deben usarse en HLA ni CLIS clásico: sobreestiman el riesgo. Se recomienda una evaluación integral del riesgo con un profesional con experiencia.",
      "pearl": "Sí tiene un riesgo aumentado de por vida: se asesora y se ofrecen estrategias de reducción, incluida la quimioprevención.",
      "trap": "Calcular el riesgo con Gail y asesorar con esa cifra.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 3, enunciado 1c",
          "texto": "The Gail breast cancer risk-assessment model, Tyrer-Cuzick Risk Calculator v.7 and v.8 model, and Breast Cancer Screening Consortium risk model should not be used to estimate breast cancer risk in patients with ALH or C-LCIS as they overestimate risk for women with these diagnoses."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c09",
      "topic": "Lesiones con atipia · Seguimiento de la HDA observada",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 57 años con <span class='hy'>hiperplasia ductal atípica focal</span> en calcificaciones, sin masa ni distorsión, más de la mitad de las calcificaciones muestreadas y concordancia. El equipo decide <span class='hy'>observar sin escisión</span>. ¿Qué seguimiento propones?",
      "options": [
        "Resonancia de mama cada 6 meses durante 5 años",
        "Mamografía a los 6 meses y luego tamizaje",
        "Biopsia repetida cada año",
        "Ninguno: vuelve al tamizaje habitual en 2 años"
      ],
      "correct": 1,
      "whyCorrect": "Si cumple los criterios para no operar, se puede considerar una mamografía a los 6 meses antes de volver al tamizaje según la edad. La resonancia anual se considera después de una evaluación integral del riesgo.",
      "pearl": "Los criterios para observar sin escisión son: no palpable, solo calcificaciones, HDA focal, más del 50 % muestreado y concordancia.",
      "trap": "Pedir resonancia seriada a toda paciente observada.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 2, enunciado 7a",
          "texto": "For those patients with ADH who met the aforementioned selection criteria for omission of diagnostic excision, a 6-mo follow-up mammogram may be considered before returning to age-appropriate screening. Annual MRI surveillance may be considered after a comprehensive risk assessment and a discussion of the risks and benefits."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "mas-c10",
      "topic": "Lesiones con atipia · Quimioprevención en el CLIS pleomórfico",
      "difficulty": "residencia",
      "src": "asbrs_atipia26",
      "vignette": "Mujer de 52 años, sin antecedente de cáncer, con <span class='hy'>carcinoma lobulillar in situ pleomórfico, receptor de estrógeno positivo</span>, ya extirpado con margen negativo. ¿Qué más le ofreces?",
      "options": [
        "Mastectomía bilateral como única opción",
        "Radioterapia de toda la mama de rutina",
        "Quimioprevención y asesoría del riesgo",
        "Nada más: la escisión fue curativa"
      ],
      "correct": 2,
      "whyCorrect": "Con CLIS pleomórfico o florido se asesora sobre el riesgo aumentado de por vida. Si el receptor de estrógeno es positivo, se ofrece quimioprevención; si no se conoce, se considera en todas.",
      "pearl": "En el CLIS pleomórfico y florido la magnitud del riesgo futuro aún es incierta, pero se trata como lesión de alto riesgo.",
      "trap": "Dar de alta sin hablar de quimioprevención porque el margen quedó negativo.",
      "cita": [
        {
          "donde": "ASBrS/SBI/CAP 2026, JAMA Surgery 2026;161(10), Tabla 3, enunciado 1b",
          "texto": "Patients diagnosed with P-LCIS or F-LCIS with no personal history of breast cancer should be counseled about their increased lifetime risk of breast cancer. If estrogen receptor status is available, chemoprevention should be offered to those with estrogen receptor–positive P-LCIS or F-LCIS; otherwise, chemoprevention should be considered for all patients."
        }
      ],
      "verificado": "2026-11-25"
    }
  ],
  "fichas": [],
  "tarjetas": [],
  "revision": "verificada"
});
