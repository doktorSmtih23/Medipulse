// Cirugía: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: cir-c01 (casos), cir-f01 (fichas), cir-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Cirugía",
  "prefijo": "cir",
  "paquete": "starter",
  "actualizado": "2026-11-21",
  "casos": [
    {
      "id": 6,
      "topic": "Abdomen Agudo · Vesícula",
      "difficulty": "Nivel 3",
      "src": "tg18",
      "vignette": "Mujer de 46 años consulta por dolor en hipocondrio derecho de 36 horas, fiebre de 38.4°C y vómitos. <span class='hy'>Signo de Murphy positivo</span>. Leucocitos 15.200/mm³. Ecografía: litiasis vesicular, pared engrosada de 5 mm y líquido pericolecístico. <span class='hy'>Bilirrubina total y fosfatasa alcalina normales</span>. ¿Conducta?",
      "options": [
        "CPRE urgente antes de cualquier intervención quirúrgica",
        "Manejo ambulatorio con analgésicos y colecistectomía electiva en 3 meses",
        "Antibioticoterapia IV + colecistectomía laparoscópica temprana",
        "Colangiorresonancia obligatoria para descartar colangitis aguda"
      ],
      "correct": 2,
      "whyCorrect": "Tiene un signo local (Murphy), signos sistémicos (fiebre, leucocitosis) e imagen característica: colecistitis aguda definitiva según TG18, sin colestasis. Es leve (grado I) y la paciente tolera la cirugía, así que TG18 indica colecistectomía laparoscópica pronto tras el inicio.",
      "pearl": "TG18 propone la cirugía temprana en quien la tolera, sin importar exactamente cuánto tiempo pasó desde el inicio (ya no exige el límite estricto de 72 h).",
      "trap": "Diferir la colecistectomía varias semanas en una paciente que tolera la cirugía.",
      "cita": [
        {
          "donde": "TG18, criterios diagnósticos de colecistitis aguda (tabla 1)",
          "texto": "A. Local signs of inflammation etc. (1) Murphy’s sign, (2) RUQ mass/pain/tenderness B. Systemic signs of inflammation etc. (1) Fever, (2) elevated CRP, (3) elevated WBC count C. Imaging findings Imaging findings characteristic of acute cholecystitis Suspected diagnosis: one item in A + one item in B Definite diagnosis: one item in A + one item in B + C"
        },
        {
          "donde": "TG18, algoritmo de manejo: grado I",
          "texto": "Grade I (mild) AC: Lap-C should ideally be performed soon after onset if the CCI and ASA-PS scores suggest the patient can withstand surgery."
        },
        {
          "donde": "TG18, algoritmo de manejo: pregunta 3 (recomendación 2, nivel B)",
          "texto": "If a patient is deemed capable of withstanding surgery for AC, we propose early surgery regardless of exactly how much time has passed since onset."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 10,
      "topic": "Trauma · Tórax",
      "difficulty": "Nivel 3",
      "src": "nice_tr",
      "vignette": "Joven sufre herida por arma blanca en hemitórax derecho. Llega con <span class='hy'>disnea severa, PA 70/40 mmHg, ingurgitación yugular, desviación traqueal a la izquierda y abolición del murmullo vesicular derecho</span>. ¿Acción inmediata?",
      "options": [
        "Descompresión torácica inmediata y luego tubo de tórax",
        "Radiografía de tórax portátil urgente para confirmar el diagnóstico antes de actuar",
        "Pericardiocentesis subxifoidea guiada por ecografía en la sala de reanimación",
        "Intubación orotraqueal con presión positiva antes de descomprimir el tórax"
      ],
      "correct": 0,
      "whyCorrect": "Es un neumotórax a tensión con inestabilidad hemodinámica (hipotensión, ingurgitación yugular, desviación traqueal y murmullo abolido). NICE indica descomprimir antes de cualquier imagen, con toracostomía abierta seguida de tubo de tórax.",
      "pearl": "NICE: preferir la toracostomía abierta a la descompresión con aguja si hay experiencia, y vigilar la recurrencia después de descomprimir.",
      "trap": "Pedir una radiografía antes de descomprimir a un paciente inestable.",
      "cita": [
        {
          "donde": "Recomendación 1.4.1",
          "texto": "In patients with tension pneumothorax, perform chest decompression before imaging only if they have either haemodynamic instability or severe respiratory compromise."
        },
        {
          "donde": "Recomendación 1.4.2",
          "texto": "Perform chest decompression using open thoracostomy followed by a chest drain in patients with tension pneumothorax."
        },
        {
          "donde": "Recomendaciones 1.3.5 y 1.3.6 (prehospitalario)",
          "texto": "Use open thoracostomy instead of needle decompression if the expertise is available, followed by a chest drain via the thoracostomy in patients who are breathing spontaneously. · Observe patients after chest decompression for signs of recurrence of the tension pneumothorax."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 15,
      "topic": "Abdomen Agudo · Apendicitis",
      "difficulty": "Nivel 2",
      "src": "wses_app",
      "vignette": "Hombre de 21 años con <span class='hy'>dolor periumbilical que migró a fosa ilíaca derecha</span> hace 14 horas, anorexia, náuseas, T° 37.9°C, Blumberg positivo y leucocitos 14.500/mm³ con neutrofilia. ¿Conducta?",
      "options": [
        "Alta con analgésicos y control en 24 horas si persiste el dolor",
        "Colonoscopia diagnóstica para descartar enfermedad inflamatoria",
        "Metronidazol oral ambulatorio como única medida, sin cirugía",
        "Apendicectomía laparoscópica en las primeras 24 horas"
      ],
      "correct": 3,
      "whyCorrect": "Es un cuadro típico de apendicitis aguda no complicada. La WSES 2025 recomienda la apendicectomía laparoscópica dentro de las 24 horas del ingreso, con una sola dosis de antibiótico profiláctico antes de la cirugía y sin antibiótico posoperatorio.",
      "pearl": "WSES 2025: el antibiótico sin cirugía es una alternativa en el adulto con apendicitis no complicada, con vigilancia clínica y decisión compartida. Para estratificar el riesgo recomienda las escalas AIR, AAS y PAS.",
      "trap": "Dejar antibiótico después de operar una apendicitis no complicada: la WSES 2025 lo desaconseja.",
      "cita": [
        {
          "donde": "Recomendación 9.1 (fuerte, certeza moderada)",
          "texto": "We recommend performing laparoscopic appendectomy within 24 hours of hospital admission in adult patients with uncomplicated acute appendicitis who have been selected for surgical management."
        },
        {
          "donde": "Recomendación 15.1 (fuerte, certeza moderada)",
          "texto": "We recommend administering a single dose of preoperative prophylactic antibiotics to adult patients with uncomplicated acute appendicitis undergoing laparoscopic appendectomy to reduce the risk of surgical site infections and postoperative intra-abdominal abscess."
        },
        {
          "donde": "Recomendación 17.1 (condicional, certeza baja)",
          "texto": "In adult patients with uncomplicated acute appendicitis undergoing laparoscopic appendectomy, we suggest against administering postoperative antibiotics."
        },
        {
          "donde": "Recomendación 5.1 (condicional, certeza moderada)",
          "texto": "We suggest the use of antibiotics as an alternative to appendectomy for the treatment of uncomplicated appendicitis in adult patients, provided there is appropriate clinical monitoring and shared decision-making."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 24,
      "topic": "Vía biliar · Colangitis",
      "difficulty": "Nivel 3",
      "src": "tg18",
      "vignette": "Hombre de 66 años con fiebre de 39 °C, <span class='hy'>ictericia y dolor en hipocondrio derecho</span>. Además está confuso y con PA 82/50 mmHg. Bilirrubina 6.8 mg/dL. Ecografía: colédoco dilatado de 11 mm con litiasis. ¿Conducta?",
      "options": [
        "Colecistectomía laparoscópica urgente",
        "Reanimación + antibióticos IV + drenaje biliar urgente (CPRE)",
        "Antibióticos orales y CPRE electiva en 6 semanas",
        "Colangiorresonancia antes de cualquier tratamiento"
      ],
      "correct": 1,
      "whyCorrect": "Es una colangitis aguda definitiva (fiebre, ictericia y dilatación biliar con litiasis) con alteración de la conciencia, que es disfunción neurológica: grado III (grave) según TG18. El tratamiento es soporte, antibiótico y drenaje biliar temprano; la CPRE drena la vía y trata la causa.",
      "pearl": "La tríada de Charcot es muy específica pero poco sensible; TG18 no la usa como criterio diagnóstico. Antibiótico de 4 a 7 días una vez controlado el foco.",
      "trap": "Ir directo a la colecistectomía: la urgencia es drenar la vía biliar, no quitar la vesícula.",
      "cita": [
        {
          "donde": "TG18, criterios diagnósticos de colangitis aguda (tabla 2)",
          "texto": "A. Systemic inflammation A-1. Fever and/or shaking chills A-2. Laboratory data: evidence of inflammatory response B. Cholestasis B-1. Jaundice B-2. Laboratory data: abnormal liver function tests C. Imaging C-1. Biliary dilatation C-2. Evidence of the etiology on imaging (stricture, stone, stent etc.) Suspected diagnosis: one item in A + one item in either B or C Definite diagnosis: one item in A, one item in B and one item in C"
        },
        {
          "donde": "TG18, gravedad de la colangitis (tabla 4)",
          "texto": "“Grade III” acute cholangitis is defined as acute cholangitis that is associated with the onset of dysfunction at least in any one of the following organs/systems: 1. Cardiovascular dysfunction: hypotension requiring dopamine ≥5 µg/kg per min, or any dose of norepinephrine 2. Neurological dysfunction: disturbance of consciousness 3. Respiratory dysfunction: PaO2/FiO2 ratio <300 …"
        },
        {
          "donde": "TG18, gravedad de la colangitis",
          "texto": "Early diagnosis, early biliary drainage and/or treatment for etiology, and antimicrobial administration are fundamental treatment for acute cholangitis classified not only “Grade III (severe)” and “Grade II (moderate)” but also “Grade I (mild)”."
        },
        {
          "donde": "TG18, terapia antimicrobiana (recomendación 1, nivel C)",
          "texto": "Once the source of infection is controlled, antimicrobial therapy for patients with acute cholangitis is recommended for the duration of 4 to 7 days."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-c01",
      "topic": "Páncreas · Pancreatitis aguda",
      "difficulty": "Nivel 2",
      "src": "nice_pan",
      "vignette": "Hombre de 52 años, bebedor social, con dolor epigástrico intenso irradiado a la espalda y vómitos desde hace 30 horas. Lipasa 6 veces el valor normal; la ecografía muestra colelitiasis. Al tercer día persiste con <span class='hy'>falla orgánica y criterios de pancreatitis grave</span>, sin fiebre ni signos de infección. ¿Qué indica la guía NICE?",
      "options": [
        "Iniciar meropenem profiláctico para evitar la infección de la necrosis",
        "Ayuno estricto y nutrición parenteral total hasta que mejore el dolor",
        "Nutrición enteral iniciada dentro de las 72 horas, sin antibiótico profiláctico",
        "Atribuir el cuadro al alcohol y no estudiar otras causas"
      ],
      "correct": 2,
      "whyCorrect": "En la pancreatitis aguda grave o moderadamente grave, NICE indica ofrecer nutrición enteral, iniciada dentro de las 72 horas del ingreso; la parenteral solo si la enteral falla o está contraindicada. No se ofrecen antimicrobianos profilácticos.",
      "pearl": "Necrosis pancreática infectada o sospechada: abordaje endoscópico cuando sea anatómicamente posible; si no, percutáneo.",
      "trap": "Dar antibiótico «profiláctico» en la pancreatitis grave sin infección: NICE lo desaconseja. Tampoco se asume que la causa es el alcohol solo porque el paciente bebe.",
      "cita": [
        {
          "donde": "Recomendaciones 1.2.6 y 1.2.7",
          "texto": "Offer enteral nutrition to anyone with severe or moderately severe acute pancreatitis. Start within 72 hours of presentation and aim to meet their nutritional requirements as soon as possible. · Offer anyone with severe or moderately severe acute pancreatitis parenteral nutrition only if enteral nutrition has failed or is contraindicated."
        },
        {
          "donde": "Recomendación 1.2.3",
          "texto": "Do not offer prophylactic antimicrobials to people with acute pancreatitis."
        },
        {
          "donde": "Recomendaciones 1.2.8 y 1.2.9",
          "texto": "Offer people with acute pancreatitis an endoscopic approach for managing infected or suspected infected pancreatic necrosis when anatomically possible. · Offer a percutaneous approach when an endoscopic approach is not anatomically possible."
        },
        {
          "donde": "Recomendación 1.2.1",
          "texto": "Do not assume that a person's acute pancreatitis is alcohol-related just because they drink alcohol."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-c02",
      "topic": "Vía biliar · Coledocolitiasis",
      "difficulty": "Nivel 3",
      "src": "udea_cir25",
      "vignette": "Mujer de 44 años con colelitiasis sintomática y bilirrubinas elevadas, <span class='hy'>sin colangitis ni pancreatitis</span>. La colangiorresonancia muestra 2 cálculos de 5 mm en el colédoco, que mide <span class='hy'>6 mm</span>, y un cístico de 5 mm. El hospital tiene cirujanos con experiencia en exploración laparoscópica de la vía biliar. ¿Cuál es la mejor conducta?",
      "options": [
        "CPRE preoperatoria y colecistectomía laparoscópica en un segundo tiempo",
        "Colecistectomía laparoscópica con exploración transcística de la vía biliar en el mismo acto",
        "Colecistectomía laparoscópica con coledocotomía para extraer los cálculos",
        "Colecistectomía laparoscópica sola y CPRE solo si persiste la ictericia"
      ],
      "correct": 1,
      "whyCorrect": "Con experiencia local, la exploración laparoscópica de la vía biliar en el mismo acto que la colecistectomía resuelve todo en un solo procedimiento, con eficacia similar a la CPRE previa y menos estancia. El abordaje transcístico es el preferido; la coledocotomía se evita cuando el colédoco mide menos de 7 mm por el riesgo de estenosis. La CPRE preoperatoria se prefiere en colangitis o pancreatitis, que esta paciente no tiene.",
      "pearl": "Coledocotomía laparoscópica: preferida con cístico < 4 mm, cálculos intrahepáticos o > 6 mm; evitarla si el colédoco mide < 7 mm (estenosis).",
      "trap": "Elegir la coledocotomía porque «limpia mejor»: con un colédoco de 6 mm aumenta el riesgo de estenosis. Y la CPRE previa no es obligatoria si no hay colangitis ni pancreatitis.",
      "cita": [
        {
          "donde": "Manejo de la coledocolitiasis por laparoscopia",
          "texto": "se debe evitar cuando hay un conducto biliar común (CBC) menor de 7 mm para reducir el riesgo de estenosis"
        },
        {
          "donde": "Manejo de la coledocolitiasis por laparoscopia",
          "texto": "excepto los pacientes con pancreatitis aguda y colangitis en los que se opta por la CPRE preoperatoria"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "cir-c03",
      "topic": "Trauma · Recto",
      "difficulty": "Nivel 3",
      "src": "udea_cir25",
      "vignette": "Hombre de 27 años con herida por arma de fuego de trayectoria transpélvica, <span class='hy'>hemodinámicamente estable</span> y sin irritación peritoneal. La tomografía y la proctoscopia rígida muestran una lesión del recto <span class='hy'>extraperitoneal que compromete menos del 25 % de la circunferencia</span>. ¿Cuál es la conducta?",
      "options": [
        "Colostomía derivativa, drenaje presacro y lavado del recto distal",
        "Resección del segmento lesionado y anastomosis primaria",
        "Laparotomía exploratoria y colostomía terminal",
        "Manejo conservador o reparación primaria, sin colostomía ni lavado distal"
      ],
      "correct": 3,
      "whyCorrect": "La lesión extraperitoneal no destructiva (< 25 % de la circunferencia) se maneja de forma conservadora o con reparación primaria; las guías favorecen no hacer ostomía. Las «cuatro D» (desbridamiento, derivación, drenaje y lavado distal) ya no son la regla: el lavado distal se asocia a más morbilidad infecciosa y el drenaje presacro no se recomienda de rutina en lesiones no destructivas.",
      "pearl": "Recto extraperitoneal: > 25 % de la circunferencia (destructiva) → colostomía; < 25 % (no destructiva) → conservador o reparación primaria, sin ostomía.",
      "trap": "Aplicar las «cuatro D» de la guerra: el lavado del recto distal puede aumentar la mortalidad y la morbilidad infecciosa.",
      "cita": [
        {
          "donde": "Trauma de recto, abordaje inicial para el cirujano general",
          "texto": "En caso de que la lesión afecte menos del 25 % de la circunferencia (lesión no destructiva), se puede optar por un manejo conservador o una reparación primaria (1). Actualmente, las guías favorecen la no realización de ostomías en lesiones no destructivas"
        },
        {
          "donde": "Trauma de recto, abordaje inicial para el cirujano general",
          "texto": "el lavado rectal puede estar asociado a mayor mortalidad y morbilidad infecciosa en comparación con la no realización de lavado"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "cir-c04",
      "topic": "Infecciones · Gangrena de Fournier",
      "difficulty": "Nivel 3",
      "src": "udea_cir25",
      "vignette": "Hombre de 61 años con diabetes mal controlada, 3 días de dolor perineal <span class='hy'>desproporcionado al examen</span>, edema escrotal y crepitación al palpar. Está febril y taquicárdico. El puntaje LRINEC calculado es de 5. Se inicia la reanimación y el antibiótico de amplio espectro. ¿En cuánto tiempo debe hacerse el desbridamiento quirúrgico?",
      "options": [
        "Ninguno por ahora: un LRINEC menor de 6 descarta la fascitis necrosante",
        "En las primeras 6 a 12 horas, y repetir cada 24 a 72 horas",
        "Después de 48 horas de antibiótico, cuando se delimite bien la necrosis",
        "Solo si la resonancia confirma gas en la fascia o en el tejido blando"
      ],
      "correct": 1,
      "whyCorrect": "La gangrena de Fournier es una emergencia quirúrgica: el desbridamiento agresivo en las primeras 6 a 12 horas, repetido cada 24 a 72 horas hasta no encontrar más necrosis, junto con antibiótico de amplio espectro temprano, es lo que reduce la mortalidad. Un LRINEC menor de 6 no la descarta (sensibilidad cercana al 68 %) y las imágenes no deben demorar la cirugía.",
      "pearl": "Fournier: reanimación + antibiótico de amplio espectro + desbridamiento en 6 a 12 h, repetido cada 24 a 72 h. Las escalas y las imágenes apoyan, no deciden ni retrasan.",
      "trap": "Confiarse de un LRINEC bajo: con probabilidad pretest del 50 %, un puntaje menor de 6 deja una probabilidad postest cercana al 27 %. Es una escala para sumar sospecha, no para descartar.",
      "cita": [
        {
          "donde": "Gangrena de Fournier, ¿qué hay de nuevo en su manejo?",
          "texto": "Se recomienda realizar la intervención quirúrgica en las primeras 6 a 12 horas del diagnóstico, la cirugía debe ser agresiva, con retiro de todo el tejido necrótico presente, y repetida cada 24 a 72 horas hasta que no haya tejido necrótico adicional"
        },
        {
          "donde": "Gangrena de Fournier, ¿qué hay de nuevo en su manejo?",
          "texto": "un puntaje menor de 6 no reduce significativamente la probabilidad post- test de fascitis necrosante en pacientes con moderado riesgo, en la medida que un paciente pre-test tiene probabilidad de 50 % y con LRINEC continúa con riesgo del 27,3 %"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "cir-c05",
      "topic": "Tórax · Nódulo pulmonar solitario",
      "difficulty": "Nivel 2",
      "src": "udea_cir25",
      "vignette": "Mujer de 56 años, no fumadora, a quien se le hizo una tomografía de abdomen por dolor lumbar. En la base pulmonar derecha aparece un <span class='hy'>nódulo sólido de 7 mm, de bordes lisos</span>, sin otros hallazgos. ¿Qué conducta es la adecuada?",
      "options": [
        "PET-CT para definir si es metabólicamente activo",
        "Biopsia percutánea guiada por tomografía",
        "Seguimiento con tomografía de tórax, sin PET ni biopsia",
        "Resección quirúrgica diagnóstica y terapéutica"
      ],
      "correct": 2,
      "whyCorrect": "Los nódulos sólidos de 8 mm o menos son difícilmente accesibles a la biopsia y el PET tiene muy baja sensibilidad en ese tamaño, por lo que la Sociedad de Fleischner propone observación con tomografía. Además, el riesgo de malignidad de un nódulo de 6 a 8 mm es de apenas 1 a 2 %.",
      "pearl": "Nódulo sólido ≤ 8 mm → vigilancia con TC. > 8 mm → según la probabilidad de malignidad: baja, seguimiento; intermedia, PET (o biopsia); alta, cirugía previa biopsia.",
      "trap": "Pedir un PET a un nódulo pequeño: en ≤ 8 mm su sensibilidad es muy baja y un resultado negativo no tranquiliza.",
      "cita": [
        {
          "donde": "Nódulo pulmonar solitario: enfoque diagnóstico",
          "texto": "Los NPS sólidos ≤8 mm son difícilmente accesibles a las técnicas de biopsia y el PET tiene muy baja sensibilidad, por lo que se propone según las recomendaciones de la Sociedad de Fleischner una pauta de observación"
        },
        {
          "donde": "Nódulo pulmonar solitario: enfoque diagnóstico",
          "texto": "La probabilidad de malignidad es inferior a 1 % para los NP menores de 6 mm y del 1 - 2 % para los de 6 - 8 mm"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "cir-c06",
      "topic": "Infecciones · Sitio operatorio",
      "difficulty": "Nivel 2",
      "src": "udea_cir25",
      "vignette": "Hombre de 38 años, día 6 después de una apendicectomía abierta. La herida está eritematosa en sus bordes y drena pus. Al abrirla, la infección <span class='hy'>compromete la piel, el tejido celular subcutáneo y la fascia</span>; la cavidad abdominal no tiene colecciones en la ecografía. ¿Cuál es el diagnóstico?",
      "options": [
        "Infección del sitio operatorio incisional superficial",
        "Infección del sitio operatorio incisional profunda",
        "Infección del sitio operatorio de órgano-espacio",
        "No es infección del sitio operatorio porque ocurrió después del día 5"
      ],
      "correct": 1,
      "whyCorrect": "La infección del sitio operatorio se define dentro de los primeros 30 días de la cirugía (90 si hay material protésico). Es incisional superficial si afecta solo piel y tejido celular subcutáneo; si compromete tejidos superficiales y profundos, como la fascia, es incisional profunda. Es de órgano-espacio cuando afecta el órgano o la cavidad manipulada.",
      "pearl": "ISO superficial: abrir y lavar la herida; antibiótico solo si hay celulitis importante o signos sistémicos (fiebre, leucocitos > 12.000). Profunda u órgano-espacio: control del foco y antibiótico dirigido.",
      "trap": "Clasificarla como superficial porque «la herida drena pus»: lo que define la clase es la capa más profunda comprometida.",
      "cita": [
        {
          "donde": "¿Qué hay de nuevo en infección de sitio operatorio?",
          "texto": "dentro de los primeros 30 días después de la cirugía o 90 días en caso de implantación de material protésico"
        },
        {
          "donde": "¿Qué hay de nuevo en infección de sitio operatorio?",
          "texto": "Si se evidencia que la infección involucra tejidos superficiales y profundos, se considera ISO incisional profunda."
        },
        {
          "donde": "¿Qué hay de nuevo en infección de sitio operatorio?",
          "texto": "los antibióticos están indicados únicamente cuando hay eritema considerable de la piel u otros signos de celulitis o cuando hay signos sistémicos de infección como fiebre o leucocitosis (mayor a 12.000 cel/mm3)"
        }
      ],
      "verificado": "2026-11-17"
    },
    {
      "id": "cir-c07",
      "topic": "Vascular · Disección aguda de aorta",
      "difficulty": "Nivel 2",
      "src": "udea_urg26",
      "vignette": "Hombre de 58 años, hipertenso, con dolor torácico desgarrante irradiado a la espalda. PA <span class='hy'>186/104 mmHg, FC 108 lpm</span>. La angiotomografía confirma una disección aguda de aorta. Mientras se define la conducta quirúrgica, ¿cuál es el primer fármaco?",
      "options": [
        "Nitroprusiato IV como primera medida, para bajar rápido la presión arterial",
        "Betabloqueador IV (esmolol, labetalol o metoprolol) hasta FC 60 a 70",
        "Nifedipino sublingual y control de la presión arterial a los 30 minutos",
        "Furosemida IV en bolo para reducir el volumen circulante y la presión"
      ],
      "correct": 1,
      "whyCorrect": "En la disección aórtica lo que mata es el impulso del ventrículo sobre la pared, no el valor aislado de la presión: el manejo es antiimpulso. Primero un betabloqueador IV para llevar la FC a 60 a 70 lpm; si persiste la hipertensión, se añade un vasodilatador IV, evitando la taquicardia refleja. Meta de PAS: 100 a 120 mmHg. La analgesia IV potente es parte del manejo.",
      "pearl": "Disección aórtica: primero frecuencia (betabloqueador, FC 60–70), después presión (vasodilatador, PAS 100–120), y analgesia potente.",
      "trap": "Empezar con un vasodilatador solo: la taquicardia refleja aumenta el estrés sobre la pared aórtica.",
      "cita": [
        {
          "donde": "Manejo médico emergente de la disección aguda de aorta",
          "texto": "En la disección aguda de aorta, lo que mata al paciente es el impulso del ventrículo sobre la pared aórtica, no el valor aislado de la presión arterial, por esto el objetivo es el manejo antiimpulso, no solo “antihipertensivo”."
        },
        {
          "donde": "Manejo médico emergente de la disección aguda de aorta",
          "texto": "se debe iniciar beta-bloqueadores intravenosos como primera medida, si persiste hipertensión tras el control de la frecuencia, se pueden añadir vasodilatadores intravenosos, evitando la taquicardia refleja."
        },
        {
          "donde": "Manejo médico emergente de la disección aguda de aorta",
          "texto": "Metas: Frecuencia Cardiaca: 60 a 70 lpm Presión arterial sistólica 100 - 120 mmHg"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c08",
      "topic": "Vascular · Isquemia aguda de extremidades",
      "difficulty": "Nivel 2",
      "src": "udea_urg26",
      "vignette": "Mujer de 74 años con fibrilación auricular sin anticoagulación. Desde hace 4 horas tiene dolor y frialdad en la pierna derecha. Hay <span class='hy'>pérdida sensitiva por encima de los dedos y debilidad leve</span> del pie; el Doppler arterial es inaudible. ¿Cuál es la conducta?",
      "options": [
        "Heparina no fraccionada IV y revascularización urgente",
        "Ácido acetilsalicílico, analgesia y Doppler programado en 48 horas",
        "Ejercicio supervisado y cilostazol, como en la claudicación intermitente",
        "Amputación primaria por pérdida irreversible del tejido"
      ],
      "correct": 0,
      "whyCorrect": "Es una isquemia aguda Rutherford IIb: pérdida sensitiva por encima de los dedos y debilidad leve a moderada, con la extremidad salvable si se trata urgentemente. Se anticoagula de inmediato con heparina no fraccionada (bolo de 80 UI/kg e infusión de 18 UI/kg/h) y se revasculariza. La amputación se plantea en el estadio III (anestesia y parálisis completas).",
      "pearl": "Rutherford: I sin amenaza; IIa salvable si se trata rápido; IIb salvable si se trata urgente (pérdida sensitiva más allá de los dedos, debilidad); III daño irreversible.",
      "trap": "Tratarla como una claudicación crónica o esperar estudios: el tiempo define si la extremidad se salva.",
      "cita": [
        {
          "donde": "Manejo médico de la isquemia aguda de extremidades",
          "texto": "Es una urgencia vascular que requiere reconocimiento rápido e implementación temprana de terapias de revascularización inmediata para preservar la viabilidad de la extremidad."
        },
        {
          "donde": "Manejo médico de la isquemia aguda de extremidades",
          "texto": "IIb Extremidad salvable si se trata urgentemente Pérdida sensorial (por encima de los dedos), debilidad motora leve o moderada. Doppler usualmente inaudible."
        },
        {
          "donde": "Manejo médico de la isquemia aguda de extremidades",
          "texto": "Bolo inicial: 80 UI/kg IV Infusión continua: 18 UI/kg/h, ajustada según TPTa"
        }
      ],
      "verificado": "2026-11-21"
    }
  ],
  "fichas": [
    {
      "id": "hy6",
      "title": "Neumotórax a tensión",
      "badge": "NICE NG39",
      "src": "nice_tr",
      "accent": "#f43f5e",
      "thresholds": [
        {
          "label": "Descomprimir antes de imagen",
          "val": "Solo con inestabilidad o compromiso respiratorio grave"
        },
        {
          "label": "Técnica",
          "val": "Toracostomía abierta + tubo de tórax"
        },
        {
          "label": "Con aguja",
          "val": "Solo si no hay experiencia en toracostomía abierta"
        },
        {
          "label": "Después",
          "val": "Vigilar la recurrencia"
        }
      ],
      "redFlag": "Neumotórax a tensión con inestabilidad hemodinámica: descomprimir sin esperar imagen.",
      "trap": "Descomprimir antes de la imagen a un paciente estable: NICE lo reserva para inestabilidad o compromiso respiratorio grave.",
      "cita": [
        {
          "donde": "Recomendación 1.4.1",
          "texto": "In patients with tension pneumothorax, perform chest decompression before imaging only if they have either haemodynamic instability or severe respiratory compromise."
        },
        {
          "donde": "Recomendación 1.4.2",
          "texto": "Perform chest decompression using open thoracostomy followed by a chest drain in patients with tension pneumothorax."
        },
        {
          "donde": "Recomendaciones 1.3.5 y 1.3.6 (prehospitalario)",
          "texto": "Use open thoracostomy instead of needle decompression if the expertise is available, followed by a chest drain via the thoracostomy in patients who are breathing spontaneously. · Observe patients after chest decompression for signs of recurrence of the tension pneumothorax."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-f01",
      "title": "Colangitis aguda (TG18)",
      "badge": "Tokio 2018",
      "src": "tg18",
      "thresholds": [
        {
          "label": "Sospecha",
          "val": "A (fiebre o inflamación) + B o C"
        },
        {
          "label": "Definitiva",
          "val": "A + B (ictericia o PFH alteradas) + C (dilatación o causa en imagen)"
        },
        {
          "label": "Grado III",
          "val": "Falla de un órgano: vasopresor, alteración de conciencia, PaO₂/FiO₂ < 300…"
        },
        {
          "label": "Tratamiento",
          "val": "Antibiótico + drenaje biliar temprano"
        },
        {
          "label": "Antibiótico",
          "val": "4–7 días tras controlar el foco"
        }
      ],
      "redFlag": "Alteración de la conciencia o hipotensión que requiere vasopresor: colangitis grave (grado III).",
      "trap": "Diagnosticar colangitis solo con la tríada de Charcot: es poco sensible.",
      "cita": [
        {
          "donde": "TG18, criterios diagnósticos de colangitis aguda (tabla 2)",
          "texto": "A. Systemic inflammation A-1. Fever and/or shaking chills A-2. Laboratory data: evidence of inflammatory response B. Cholestasis B-1. Jaundice B-2. Laboratory data: abnormal liver function tests C. Imaging C-1. Biliary dilatation C-2. Evidence of the etiology on imaging (stricture, stone, stent etc.) Suspected diagnosis: one item in A + one item in either B or C Definite diagnosis: one item in A, one item in B and one item in C"
        },
        {
          "donde": "TG18, gravedad de la colangitis (tabla 4)",
          "texto": "“Grade III” acute cholangitis is defined as acute cholangitis that is associated with the onset of dysfunction at least in any one of the following organs/systems: 1. Cardiovascular dysfunction: hypotension requiring dopamine ≥5 µg/kg per min, or any dose of norepinephrine 2. Neurological dysfunction: disturbance of consciousness 3. Respiratory dysfunction: PaO2/FiO2 ratio <300 …"
        },
        {
          "donde": "TG18, gravedad de la colangitis",
          "texto": "Early diagnosis, early biliary drainage and/or treatment for etiology, and antimicrobial administration are fundamental treatment for acute cholangitis classified not only “Grade III (severe)” and “Grade II (moderate)” but also “Grade I (mild)”."
        },
        {
          "donde": "TG18, terapia antimicrobiana (recomendación 1, nivel C)",
          "texto": "Once the source of infection is controlled, antimicrobial therapy for patients with acute cholangitis is recommended for the duration of 4 to 7 days."
        },
        {
          "donde": "TG18, criterios diagnósticos de colangitis",
          "texto": "Although Charcot’s triad provides highly specific diagnostic criteria, studies have reported its sensitivity to be on the order of 50 to 70%. … due to the low sensitivity, it is not applicable in using as diagnosis criteria for acute cholangitis."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-f02",
      "title": "Apendicitis aguda (WSES 2025)",
      "badge": "WSES 2025",
      "src": "wses_app",
      "thresholds": [
        {
          "label": "Escalas",
          "val": "AIR, AAS y PAS (pediátrica)"
        },
        {
          "label": "Imagen preferida (adulto)",
          "val": "TC de baja dosis (< 2–3 mSv)"
        },
        {
          "label": "No complicada operada",
          "val": "Laparoscopia < 24 h; profilaxis única, sin antibiótico posoperatorio"
        },
        {
          "label": "Complicada operada",
          "val": "Antibiótico 2–3 días tras controlar el foco"
        },
        {
          "label": "Absceso, < 35 años",
          "val": "Apendicectomía laparoscópica temprana"
        },
        {
          "label": "Absceso, ≥ 35 años",
          "val": "Manejo no operatorio + apendicectomía de intervalo a las 6–12 semanas"
        }
      ],
      "redFlag": "Absceso apendicular en mayores de 35 años: no operar de entrada; riesgo de neoplasia apendicular de hasta 14,3 %.",
      "trap": "Dar antibiótico después de operar una apendicitis no complicada: la WSES 2025 lo desaconseja.",
      "cita": [
        {
          "donde": "Recomendación 2 (condicional, certeza baja)",
          "texto": "We suggest using risk stratification scores based on clinical and laboratory findings (AIR score, AAS, and PAS) to identify patients at low probability for acute appendicitis and to guide the need for further imaging or observation."
        },
        {
          "donde": "Recomendación 3.1",
          "texto": "Where available, low-dose CT (protocol <2-3 mSv) should be considered the preferred imaging modality."
        },
        {
          "donde": "Recomendación 9.1 (fuerte, certeza moderada)",
          "texto": "We recommend performing laparoscopic appendectomy within 24 hours of hospital admission in adult patients with uncomplicated acute appendicitis who have been selected for surgical management."
        },
        {
          "donde": "Recomendación 15.1 (fuerte, certeza moderada)",
          "texto": "We recommend administering a single dose of preoperative prophylactic antibiotics to adult patients with uncomplicated acute appendicitis undergoing laparoscopic appendectomy to reduce the risk of surgical site infections and postoperative intra-abdominal abscess."
        },
        {
          "donde": "Recomendación 17.1 (condicional, certeza baja)",
          "texto": "In adult patients with uncomplicated acute appendicitis undergoing laparoscopic appendectomy, we suggest against administering postoperative antibiotics."
        },
        {
          "donde": "Recomendación 19.1 (condicional, certeza moderada)",
          "texto": "We suggest using a short course of postoperative antibiotics (2-3 days) instead of a longer course (5-7 days) after adequate source control in adult patients with complicated acute appendicitis submitted to laparoscopic appendectomy."
        },
        {
          "donde": "Recomendación 13.1 (condicional, certeza moderada)",
          "texto": "We suggest early laparoscopic appendectomy in adult patients younger than 35 years with complicated acute appendicitis and periappendicular abscess. … Conversely, in patients aged 35 years or older, we suggest against early appendectomy because of the increased risk of underlying appendiceal neoplasm (up to 14.3%)."
        },
        {
          "donde": "Recomendación 14.1 (fuerte, certeza moderada)",
          "texto": "We recommend performing interval appendectomy between 6 and 12 weeks after initial nonoperative management in adult patients 35 years or older with complicated acute appendicitis and periappendicular abscess to reduce the risk of missed appendiceal neoplasm."
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "tarjetas": [
    {
      "id": 22,
      "src": "nice_tce",
      "front": "Trauma craneoencefálico: Glasgow que obliga a intubar (NICE)",
      "back": "≤ 8 (coma): intubar y ventilar de inmediato",
      "cita": [
        {
          "donde": "Recomendación 1.8.8 [2003, modificada 2007]",
          "texto": "Intubate and ventilate the person immediately when there is: coma, that is, they are not obeying commands, not speaking and not eye opening (a GCS score of 8 or less) · loss of protective laryngeal reflexes · ventilatory insufficiency, as judged by blood gases: hypoxaemia (PaO2 less than 13 kPa on oxygen) or hypercarbia (PaCO2 more than 6 kPa) · irregular respirations."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 23,
      "src": "atls11",
      "front": "Regla de los 9 (adulto): tronco anterior",
      "back": "18 %",
      "estado": "pendiente"
    },
    {
      "id": 24,
      "src": "atls11",
      "front": "Fórmula de Parkland",
      "back": "4 mL × kg × % SCQ (2° y 3°): la mitad en las primeras 8 h",
      "estado": "pendiente"
    },
    {
      "id": 25,
      "src": "tg18",
      "front": "Tríada de Charcot: ¿sirve para diagnosticar colangitis? (TG18)",
      "back": "Es muy específica, pero su sensibilidad es baja (50–70 %); TG18 no la usa como criterio diagnóstico",
      "cita": [
        {
          "donde": "TG18, criterios diagnósticos de colangitis",
          "texto": "Although Charcot’s triad provides highly specific diagnostic criteria, studies have reported its sensitivity to be on the order of 50 to 70%. … due to the low sensitivity, it is not applicable in using as diagnosis criteria for acute cholangitis."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 26,
      "src": "tg18",
      "front": "Péntada de Reynolds",
      "back": "Charcot + hipotensión + alteración de conciencia",
      "estado": "pendiente"
    },
    {
      "id": 27,
      "src": "wses_app",
      "front": "Signo de Rovsing",
      "back": "Dolor en FID al presionar la FII (apendicitis)",
      "estado": "pendiente"
    },
    {
      "id": 28,
      "src": "wses_app",
      "front": "Escalas de riesgo para apendicitis recomendadas por la WSES 2025",
      "back": "AIR, AAS y PAS (pediátrica): identifican baja probabilidad y guían la necesidad de imagen",
      "cita": [
        {
          "donde": "Recomendación 2 (condicional, certeza baja)",
          "texto": "We suggest using risk stratification scores based on clinical and laboratory findings (AIR score, AAS, and PAS) to identify patients at low probability for acute appendicitis and to guide the need for further imaging or observation."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 50,
      "src": "nice_tr",
      "front": "Trauma mayor: orden de la evaluación (NICE)",
      "back": "<C>ABCDE: primero la hemorragia catastrófica; luego vía aérea con inmovilización espinal, respiración, circulación, déficit neurológico y exposición",
      "cita": [
        {
          "donde": "Recomendación 1.8.1",
          "texto": "Record the following in patients with major trauma in pre‑hospital settings: catastrophic haemorrhage · airway with in‑line spinal immobilisation · breathing · circulation · disability (neurological) · exposure and environment (<C>ABCDE)"
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": 52,
      "src": "wses_app",
      "front": "Antibiótico tras apendicectomía por apendicitis complicada con buen control del foco (WSES 2025)",
      "back": "2–3 días",
      "cita": [
        {
          "donde": "Recomendación 19.1 (condicional, certeza moderada)",
          "texto": "We suggest using a short course of postoperative antibiotics (2-3 days) instead of a longer course (5-7 days) after adequate source control in adult patients with complicated acute appendicitis submitted to laparoscopic appendectomy."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-t01",
      "src": "nice_tr",
      "front": "Ácido tranexámico en trauma mayor (NICE)",
      "back": "IV lo antes posible si hay sangrado activo o sospechado",
      "cita": [
        {
          "donde": "Recomendación 1.5.4",
          "texto": "Use intravenous tranexamic acid as soon as possible in patients with major trauma and active or suspected active bleeding."
        }
      ],
      "verificado": "2026-11-15"
    },
    {
      "id": "cir-t02",
      "src": "nice_pan",
      "front": "Pancreatitis aguda grave: ¿antibiótico profiláctico? (NICE)",
      "back": "No. Nutrición enteral dentro de las 72 h; parenteral solo si la enteral falla o está contraindicada",
      "cita": [
        {
          "donde": "Recomendación 1.2.3",
          "texto": "Do not offer prophylactic antimicrobials to people with acute pancreatitis."
        },
        {
          "donde": "Recomendaciones 1.2.6 y 1.2.7",
          "texto": "Offer enteral nutrition to anyone with severe or moderately severe acute pancreatitis. Start within 72 hours of presentation and aim to meet their nutritional requirements as soon as possible. · Offer anyone with severe or moderately severe acute pancreatitis parenteral nutrition only if enteral nutrition has failed or is contraindicated."
        }
      ],
      "verificado": "2026-11-15"
    }
  ],
  "revision": "verificada"
});
