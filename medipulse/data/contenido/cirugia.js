// Cirugía: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: cir-c01 (casos), cir-f01 (fichas), cir-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Cirugía",
  "prefijo": "cir",
  "paquete": "starter",
  "actualizado": "2026-11-25",
  "casos": [
    {
      "id": 6,
      "topic": "Abdomen Agudo · Vesícula",
      "difficulty": "dificil",
      "src": "tg18",
      "vignette": "Mujer de 46 años consulta por dolor en hipocondrio derecho de 36 horas, fiebre de 38.4°C y vómitos. <span class='hy'>Signo de Murphy positivo</span>. Leucocitos 15.200/mm³. Ecografía: litiasis vesicular, pared engrosada de 5 mm y líquido pericolecístico. <span class='hy'>Bilirrubina total y fosfatasa alcalina normales</span>. ¿Conducta?",
      "options": [
        "CPRE urgente antes de cualquier intervención quirúrgica",
        "Colangiorresonancia obligatoria para descartar colangitis aguda",
        "Manejo ambulatorio con analgésicos y colecistectomía electiva en 3 meses",
        "Antibioticoterapia IV + colecistectomía laparoscópica temprana"
      ],
      "correct": 3,
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
      "difficulty": "dificil",
      "src": "nice_tr",
      "vignette": "Joven sufre herida por arma blanca en hemitórax derecho. Llega con <span class='hy'>disnea severa, PA 70/40 mmHg, ingurgitación yugular, desviación traqueal a la izquierda y abolición del murmullo vesicular derecho</span>. ¿Acción inmediata?",
      "options": [
        "Pericardiocentesis subxifoidea guiada por ecografía en la sala de reanimación",
        "Radiografía de tórax portátil urgente para confirmar el diagnóstico antes de actuar",
        "Descompresión torácica inmediata y luego tubo de tórax",
        "Intubación orotraqueal con presión positiva antes de descomprimir el tórax"
      ],
      "correct": 2,
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
      "difficulty": "residencia",
      "src": "wses_app",
      "vignette": "Hombre de 21 años con <span class='hy'>dolor periumbilical que migró a fosa ilíaca derecha</span> hace 14 horas, anorexia, náuseas, T° 37.9°C, Blumberg positivo y leucocitos 14.500/mm³ con neutrofilia. ¿Conducta?",
      "options": [
        "Apendicectomía laparoscópica en las primeras 24 horas",
        "Colonoscopia diagnóstica para descartar enfermedad inflamatoria",
        "Metronidazol oral ambulatorio como única medida, sin cirugía",
        "Alta con analgésicos y control en 24 horas si persiste el dolor"
      ],
      "correct": 0,
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
      "difficulty": "dificil",
      "src": "tg18",
      "vignette": "Hombre de 66 años con fiebre de 39 °C, <span class='hy'>ictericia y dolor en hipocondrio derecho</span>. Además está confuso y con PA 82/50 mmHg. Bilirrubina 6.8 mg/dL. Ecografía: colédoco dilatado de 11 mm con litiasis. ¿Conducta?",
      "options": [
        "Reanimación + antibióticos IV + drenaje biliar urgente (CPRE)",
        "Antibióticos orales y CPRE electiva en 6 semanas",
        "Colecistectomía laparoscópica urgente",
        "Colangiorresonancia antes de cualquier tratamiento"
      ],
      "correct": 0,
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
      "difficulty": "residencia",
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
      "difficulty": "dificil",
      "src": "udea_cir25",
      "vignette": "Mujer de 44 años con colelitiasis sintomática y bilirrubinas elevadas, <span class='hy'>sin colangitis ni pancreatitis</span>. La colangiorresonancia muestra 2 cálculos de 5 mm en el colédoco, que mide <span class='hy'>6 mm</span>, y un cístico de 5 mm. El hospital tiene cirujanos con experiencia en exploración laparoscópica de la vía biliar. ¿Cuál es la mejor conducta?",
      "options": [
        "CPRE preoperatoria y colecistectomía laparoscópica en un segundo tiempo",
        "Colecistectomía laparoscópica sola y CPRE solo si persiste la ictericia",
        "Colecistectomía laparoscópica con coledocotomía para extraer los cálculos",
        "Colecistectomía laparoscópica con exploración transcística de la vía biliar en el mismo acto"
      ],
      "correct": 3,
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
      "difficulty": "dificil",
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
      "difficulty": "dificil",
      "src": "udea_cir25",
      "vignette": "Hombre de 61 años con diabetes mal controlada, 3 días de dolor perineal <span class='hy'>desproporcionado al examen</span>, edema escrotal y crepitación al palpar. Está febril y taquicárdico. El puntaje LRINEC calculado es de 5. Se inicia la reanimación y el antibiótico de amplio espectro. ¿En cuánto tiempo debe hacerse el desbridamiento quirúrgico?",
      "options": [
        "Ninguno por ahora: un LRINEC menor de 6 descarta la fascitis necrosante",
        "Solo si la resonancia confirma gas en la fascia o en el tejido blando",
        "Después de 48 horas de antibiótico, cuando se delimite bien la necrosis",
        "En las primeras 6 a 12 horas, y repetir cada 24 a 72 horas"
      ],
      "correct": 3,
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
      "difficulty": "residencia",
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
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 38 años, día 6 después de una apendicectomía abierta. La herida está eritematosa en sus bordes y drena pus. Al abrirla, la infección <span class='hy'>compromete la piel, el tejido celular subcutáneo y la fascia</span>; la cavidad abdominal no tiene colecciones en la ecografía. ¿Cuál es el diagnóstico?",
      "options": [
        "Infección del sitio operatorio incisional superficial",
        "Infección del sitio operatorio de órgano-espacio",
        "Infección del sitio operatorio incisional profunda",
        "No es infección del sitio operatorio porque ocurrió después del día 5"
      ],
      "correct": 2,
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
      "difficulty": "residencia",
      "src": "udea_urg26",
      "vignette": "Hombre de 58 años, hipertenso, con dolor torácico desgarrante irradiado a la espalda. PA <span class='hy'>186/104 mmHg, FC 108 lpm</span>. La angiotomografía confirma una disección aguda de aorta. Mientras se define la conducta quirúrgica, ¿cuál es el primer fármaco?",
      "options": [
        "Nitroprusiato IV como primera medida, para bajar rápido la presión arterial",
        "Furosemida IV en bolo para reducir el volumen circulante y la presión",
        "Nifedipino sublingual y control de la presión arterial a los 30 minutos",
        "Betabloqueador IV (esmolol, labetalol o metoprolol) hasta FC 60 a 70"
      ],
      "correct": 3,
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
      "difficulty": "residencia",
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
    },
    {
      "id": "cir-c09",
      "topic": "Esófago · Barrett con displasia de bajo grado",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 58 años con reflujo crónico. La endoscopia de alta definición con biopsias muestra <span class='hy'>esófago de Barrett con displasia de bajo grado</span>, confirmada por el patólogo. ¿Cuándo es el siguiente control?",
      "options": [
        "Endoscopia con biopsias en 6 meses",
        "Endoscopia en 3 a 5 años, como en el Barrett sin displasia",
        "Esofagectomía, por el riesgo de cáncer",
        "Solo inhibidor de bomba, sin más endoscopias"
      ],
      "correct": 0,
      "whyCorrect": "Con Barrett y displasia de bajo grado, el Colegio Americano de Gastroenterología recomienda una nueva endoscopia con biopsias a los 6 meses del diagnóstico; si persiste, otra al año y luego anual. La progresión anual a adenocarcinoma es de 0,54 % con displasia de bajo grado, frente a 0,2 a 0,5 % sin displasia y 1,73 % con alto grado.",
      "pearl": "Factores de progresión del Barrett: sexo masculino, displasia de bajo grado y segmento más largo. La endoscopia índice debe ser de alta calidad (alta definición y cromoendoscopia).",
      "trap": "Vigilarlo como un Barrett sin displasia, o saltar a la esofagectomía.",
      "cita": [
        {
          "donde": "Esófago de Barrett desde el consultorio",
          "texto": "Ante el hallazgo de esófago de Barrett con displasia de bajo grado la recomendación del colegio americano de gastroenterología es realizar un nuevo control endoscópico y toma de biopsia en 6 meses desde el diagnóstico."
        },
        {
          "donde": "Esófago de Barrett desde el consultorio",
          "texto": "la tasa anual de progresión a adenocarcinoma de esófago para aquellos pacientes sin displasia era de 0,2 al 0,5 %, con displasia de bajo grado 0,54 % y de alto grado 1,73 %"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c10",
      "topic": "Cirugía pediátrica · Invaginación intestinal",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Niño de 14 meses con episodios de llanto intenso y encogimiento de piernas, vómito y deposición con moco y sangre. La ecografía muestra el <span class='hy'>signo de la dona</span>. Está <span class='hy'>hemodinámicamente estable</span>, sin signos de peritonitis. ¿Cuál es el tratamiento de primera línea?",
      "options": [
        "Laparotomía y reducción manual de inmediato",
        "Colon por enema con bario para confirmar y luego cirugía",
        "Reducción con enema guiado por ecografía",
        "Observar 24 horas: muchas se reducen solas"
      ],
      "correct": 2,
      "whyCorrect": "En el niño estable, la primera línea es la reducción radiológica: un enema de aire, agua o contraste hidrosoluble guiado por imagen, de preferencia ecografía. La cirugía inmediata se reserva para el paciente inestable o con peritonitis o perforación. El colon por enema con bario quedó desplazado por la ecografía, porque es invasivo e irradia.",
      "pearl": "Invaginación: el 75 % ocurre en los primeros 2 años y el 95 % es idiopática. Después de los 3 años, buscar una «cabeza» de invaginación (Meckel, pólipo, linfoma, púrpura de Henoch-Schönlein).",
      "trap": "Ir directo a cirugía en un niño estable.",
      "cita": [
        {
          "donde": "Abdomen agudo del menor de 5 años, todo un reto diagnóstico",
          "texto": "en un paciente estable, la primera línea es la reducción radiológica, que consiste en un enema de aire, agua o contraste hidrosoluble guiado por imagen, ya sea fluoroscopia o ecografía, esta última de elección."
        },
        {
          "donde": "Abdomen agudo del menor de 5 años, todo un reto diagnóstico",
          "texto": "el 75 % ocurre en los primeros dos años de vida y el 90 % en los primeros tres. El 95 % de los casos son idiopáticos"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c11",
      "topic": "Abdomen agudo · Apendicitis no complicada",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Mujer de 25 años operada por apendicitis aguda. En la apendicectomía laparoscópica se encuentra un <span class='hy'>apéndice inflamado sin perforación ni peritonitis</span>. Recibió la profilaxis antes de la cirugía. ¿Qué antibiótico indicas después?",
      "options": [
        "Ninguno en el posoperatorio",
        "Ceftriaxona y metronidazol IV por 5 días",
        "Amoxicilina-clavulanato oral por 7 días",
        "Ciprofloxacino y metronidazol oral por 10 días"
      ],
      "correct": 0,
      "whyCorrect": "En la apendicitis no complicada no se requieren antibióticos en el posoperatorio. La forma complicada, con perforación o peritonitis, sí se beneficia de 4 a 5 días de antibiótico después de la cirugía.",
      "pearl": "Apendicitis no complicada sin apendicolito: el manejo no operatorio con antibióticos es una alternativa que se discute con el paciente (WSES 2025).",
      "trap": "Prolongar el antibiótico en una apendicitis no complicada «por seguridad».",
      "cita": [
        {
          "donde": "¿Qué hay de nuevo en apendicitis aguda?",
          "texto": "En apendicitis no complicada no se requieren antibióticos en el postoperatorio"
        },
        {
          "donde": "¿Qué hay de nuevo en apendicitis aguda?",
          "texto": "estos pacientes si se benefician de tratamiento antibiótico postquirúrgico de 4-5 días"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c12",
      "topic": "Cirugía pediátrica · Cuerpo extraño",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Niña de 3 años que se tragó una moneda hace 3 horas. Está <span class='hy'>asintomática</span>, come y traga bien. La radiografía muestra la moneda <span class='hy'>en el estómago</span>. ¿Qué haces?",
      "options": [
        "Endoscopia hoy para extraerla",
        "Laxante y enema para acelerar la salida",
        "Observar en casa y controlar que salga",
        "Cirugía si no sale en 24 horas"
      ],
      "correct": 2,
      "whyCorrect": "Las monedas suelen pasar solas al estómago y salen espontáneamente en un máximo de 4 semanas. Solo requieren extracción si dan síntomas, si están en el esófago al evaluarlas o si no avanzan en 3 a 4 días.",
      "pearl": "Las pilas y los imanes son distintos: una pila puede producir necrosis por presión, descarga eléctrica y fuga alcalina; varios imanes atrapan asas y las perforan.",
      "trap": "Extraer de rutina una moneda que ya está en el estómago y no da síntomas.",
      "cita": [
        {
          "donde": "Ingesta de cuerpo extraño en pediatría",
          "texto": "Monedas: Por lo general, estas pasan espontáneamente al estómago y en un tiempo máximo de 4 semanas presentan salida espontánea. Sólo requiere extracción vía endoscópica o quirúrgica aquellas que: • Producen síntomas. • Que estén en el esófago al momento de la evaluación. • Si el objeto no avanza durante 3 – 4 días."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c13",
      "topic": "Coloproctología · Absceso anorrectal",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Hombre de 42 años, diabético, con 3 días de dolor anal pulsátil y una masa fluctuante, roja y caliente <span class='hy'>junto al borde anal</span>. Febrícula. ¿Cuál es el tratamiento?",
      "options": [
        "Antibiótico oral por 10 días y control",
        "Baños de asiento, analgésicos y control",
        "Fistulotomía en el mismo acto siempre",
        "Drenaje quirúrgico del absceso"
      ],
      "correct": 3,
      "whyCorrect": "El tratamiento de los abscesos anorrectales es el drenaje quirúrgico, con la incisión sobre el área más fluctuante y lo más cerca posible del borde anal, para que una posible fístula sea corta, sin dañar el esfínter. El empaquetamiento solo se indica si sangra después del drenaje. La fístula se trata en el mismo acto solo si el compromiso del esfínter es mínimo y claro.",
      "pearl": "Recurrencia del absceso: drenaje inadecuado, loculaciones y fístula asociada (un tercio de los casos).",
      "trap": "Tratarlo solo con antibiótico: sin drenaje, el absceso no se resuelve.",
      "cita": [
        {
          "donde": "Urgencias anorrectales",
          "texto": "El tratamiento de los abscesos anorrectales es el drenaje quirúrgico. La incisión debería realizarse sobre el área más fluctuante de la colección y lo más cercano posible al borde anal para minimizar la longitud de una potencial fístula, además se debe evitar el daño al esfínter."
        },
        {
          "donde": "Urgencias anorrectales",
          "texto": "Sólo está indicado el empaquetamiento de las heridas si hay sangrado después del drenaje."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c14",
      "topic": "Cabeza y cuello · Nódulo tiroideo",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Mujer de 45 años con un nódulo tiroideo de 2 cm hallado en el examen. La <span class='hy'>TSH está suprimida</span>. ¿Cuál es el siguiente estudio?",
      "options": [
        "Biopsia por aspiración con aguja fina de inmediato",
        "Repetir la ecografía en un año",
        "Tiroidectomía total diagnóstica",
        "Gammagrafía de tiroides"
      ],
      "correct": 3,
      "whyCorrect": "La gammagrafía con tecnecio no se usa de rutina, pero está indicada cuando la TSH está suprimida o baja, para saber si el nódulo es funcionante. Los nódulos hiperfuncionantes rara vez son malignos; los no funcionantes son los que tienen indicación de biopsia por aspiración.",
      "pearl": "Bethesda, riesgo de malignidad: II benigno < 4 %; III 15–30 %; IV 20–35 %; V 60–75 %; VI > 97 %.",
      "trap": "Puncionar de entrada un nódulo con TSH suprimida, sin saber si es funcionante.",
      "cita": [
        {
          "donde": "Enfoque del paciente adulto con nódulo tiroideo",
          "texto": "se recomienda realizarse cuando se encuentre la TSH sérica suprimida o en límites inferiores para evaluar la funcionalidad del nódulo"
        },
        {
          "donde": "Enfoque del paciente adulto con nódulo tiroideo",
          "texto": "ayuda en la diferenciación de los nódulos no funcionales, que tienen indicación de ACAF, de los nódulos hiperfuncionantes."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c15",
      "topic": "Colon · Diverticulitis no complicada",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 55 años, inmunocompetente, con dolor en fosa ilíaca izquierda y fiebre baja. La tomografía muestra <span class='hy'>diverticulitis del sigmoides con inflamación pericólica, sin absceso ni perforación</span> (Hinchey Ia). Tolera la vía oral. ¿Qué indicas?",
      "options": [
        "Analgesia ambulatoria sin antibiótico",
        "Hospitalizar y dar antibiótico IV por 10 días",
        "Sigmoidectomía electiva tras este primer episodio",
        "Drenaje percutáneo guiado por tomografía"
      ],
      "correct": 0,
      "whyCorrect": "En la diverticulitis no complicada (Hinchey 0 y Ia) la evidencia respalda evitar los antibióticos: no cambian la recurrencia, las complicaciones, la recuperación ni la necesidad de cirugía. El pilar es el manejo del dolor y los cambios en el estilo de vida. El antibiótico se considera en pacientes seleccionados.",
      "pearl": "Diverticulitis complicada: absceso, perforación, fístula u obstrucción.",
      "trap": "Darle antibiótico a toda diverticulitis por reflejo.",
      "cita": [
        {
          "donde": "Estado del arte de la diverticulitis aguda",
          "texto": "El uso racional de antibióticos y los estudios han respaldado evitar el uso de antibióticos en diverticulitis Hinchey 0 y Ia, lo que demuestra que no hay diferencias clínicas en la recurrencia, complicaciones, tiempo de recuperación y necesidad de manejo quirúrgico."
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c16",
      "topic": "Cirugía pediátrica · Criptorquidia",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Lactante de 6 meses con el testículo derecho <span class='hy'>no palpable en el escroto</span> desde el nacimiento; el izquierdo está en su sitio. ¿Qué haces?",
      "options": [
        "Esperar hasta los 2 años por si desciende solo",
        "Gonadotropina coriónica y control en un año",
        "Remitir ya para orquidopexia antes de 18 meses",
        "Ecografía y resonancia antes de cualquier remisión"
      ],
      "correct": 2,
      "whyCorrect": "Después de los 6 meses el descenso espontáneo es poco probable. Las guías de la AUA y la EAU recomiendan la orquidopexia antes de los 18 meses, y la AUA señala que se debe remitir a cirugía pediátrica a los 6 meses. Esperar no aporta beneficio.",
      "pearl": "Criptorquidia: una de las malformaciones congénitas más comunes; afecta la fertilidad y se asocia a mayor riesgo de malignidad.",
      "trap": "Esperar a los 2 años por un descenso que después de los 6 meses es poco probable.",
      "cita": [
        {
          "donde": "Calendario quirúrgico en pediatría",
          "texto": "La actualización de las guías de la AUA (2014) y la EAU (2024) recomiendan que la orquiopexia se realice antes de los 18 meses de edad, y la AUA señala la importancia de derivar al especialista en cirugía pediátrica a los 6 meses."
        },
        {
          "donde": "Calendario quirúrgico en pediatría",
          "texto": "después de los 6 meses, el descenso espontáneo del testículo es poco probable"
        }
      ],
      "verificado": "2026-11-21"
    },
    {
      "id": "cir-c17",
      "topic": "Coloproctología · Fisura anal aguda",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Mujer de 28 años con <span class='hy'>dolor anal cortante al defecar</span> y sangre roja en las heces desde hace 2 semanas. Al separar los glúteos se ve un desgarro en la <span class='hy'>línea media posterior</span>. ¿Qué indicas?",
      "options": [
        "Esfinterotomía interna lateral de urgencia en el mismo ingreso",
        "Antibiótico oral por posible absceso y control en una semana",
        "Tacto rectal y anoscopia para confirmar",
        "Fibra, baños de asiento y diltiazem tópico"
      ],
      "correct": 3,
      "whyCorrect": "Es una fisura anal aguda (menos de 6 semanas, línea media posterior). El manejo médico es de primera línea: 25 a 30 g de fibra al día, agua, analgesia no opioide, baños de asiento y un relajante del esfínter. Los calcioantagonistas tópicos (diltiazem, nifedipino) son la primera opción: igual de eficaces que los nitratos, con menos efectos adversos y recurrencias.",
      "pearl": "Fisuras laterales o múltiples hacen pensar en VIH, Crohn, tuberculosis o sífilis.",
      "trap": "Operar de urgencia: la esfinterotomía es para la falla del manejo médico y no se hace en urgencias.",
      "cita": [
        {
          "donde": "Urgencias anorrectales",
          "texto": "los bloqueadores de canales de calcio como diltiazem y nifedipino tienen eficacia similar a los nitratos, con menor tasa de efectos secundarios y de recurrencias, por lo que son la primera opción de manejo."
        },
        {
          "donde": "Urgencias anorrectales",
          "texto": "La opción de manejo quirúrgico está indicada para pacientes que fallan al manejo médico, esta no se realiza en situaciones de emergencia, y comprende la esfinterotomía interna lateral."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c18",
      "topic": "Trauma · Toracostomía de pequeño calibre",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 34 años, estable, con herida por arma cortopunzante en hemitórax derecho y <span class='hy'>hemotórax</span> en la radiografía. Hay tubo de 14 Fr y de 32 Fr. ¿Qué calibre usas?",
      "options": [
        "Solo el de 32 Fr: el hemotórax exige gran calibre",
        "Ninguno: se observa sin drenaje con radiografía cada 6 horas",
        "Cualquiera: en trauma los resultados son similares",
        "Dos tubos de gran calibre desde el inicio, anterior y posterior"
      ],
      "correct": 2,
      "whyCorrect": "Los estudios que comparan tubos de pequeño (14 Fr o menos) y gran calibre en trauma (neumotórax y hemotórax) no muestran diferencias en falla, complicaciones, empiema, tubos adicionales, estancia ni mortalidad.",
      "pearl": "Se inserta en el triángulo de seguridad (pectoral mayor, dorsal ancho, base de la axila), usualmente en el quinto espacio intercostal; la succión no es rutinaria.",
      "trap": "Creer que el hemotórax siempre exige un tubo grueso.",
      "cita": [
        {
          "donde": "Toracostomía cerrada, Estado del Arte",
          "texto": "se han encontrado similares resultados clínicos, sin diferencias significativas con respecto a falla terapéutica, complicaciones relacionadas con la inserción del tubo, desarrollo de empiema, necesidad de tubos adicionales, tiempo de estancia hospitalaria, admisión UCI, estancia UCI ni mortalidad en el contexto de trauma (neumo/hemotórax)"
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c19",
      "topic": "Trauma · Hígado de alto grado",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Mujer de 25 años tras accidente de moto. <span class='hy'>PA 118/76 mmHg, FC 92</span>, sostenida sin transfusiones. La tomografía muestra una <span class='hy'>lesión hepática AAST grado IV con extravasación de contraste</span>. ¿Qué haces?",
      "options": [
        "Laparotomía inmediata por el grado IV",
        "Alta con control ecográfico ambulatorio en una semana",
        "Empaquetamiento hepático y relaparotomía programada a las 48 horas",
        "Manejo no operatorio con angioembolización"
      ],
      "correct": 3,
      "whyCorrect": "El tratamiento lo decide el estado hemodinámico, no el grado: estable, va a manejo no operatorio aun con lesión de alto grado. La extravasación de contraste indica angioembolización.",
      "pearl": "Inestable (PAS <90 con signos de choque): cirugía obligatoria con empaquetamiento y control de daños.",
      "trap": "Operar por el grado de la lesión en una paciente estable.",
      "cita": [
        {
          "donde": "Abordaje del paciente con trauma hepático complejo",
          "texto": "se considera que el manejo quirúrgico es una medida obligatoria en pacientes inestables, mientras que el manejo no operatorio se realiza en pacientes hemodinámicamente estables incluso en pacientes con lesiones de alto grado."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c20",
      "topic": "Trauma · REBOA",
      "difficulty": "dificil",
      "src": "udea_cir25",
      "vignette": "Hombre de 45 años con <span class='hy'>fractura de pelvis inestable</span> y choque hemorrágico que no responde a la reanimación, sin sangrado en tórax ni abdomen. Se decide REBOA. ¿En qué zona y por cuánto tiempo máximo ideal?",
      "options": [
        "Zona 1, hasta 60 minutos",
        "Zona 2, sobre las arterias renales",
        "Zona 3, idealmente 30 minutos o menos",
        "Zona 1, sin límite mientras haya pulso"
      ],
      "correct": 2,
      "whyCorrect": "La zona 3 (de la arteria renal más distal a la bifurcación) se usa en hemorragia pélvica, con oclusión idealmente de 30 minutos o menos (máximo 59). La zona 1 es para hemorragia abdominal (idealmente 15 minutos o menos) y la zona 2 está contraindicada.",
      "pearl": "Contraindicaciones absolutas: taponamiento cardíaco y sospecha de disección traumática de la aorta.",
      "trap": "Ocluir en zona 1 una hemorragia pélvica: más isquemia visceral sin beneficio.",
      "cita": [
        {
          "donde": "Realidades del REBOA en trauma",
          "texto": "Zona 3: Desde la arteria renal más distal hasta la bifurcación. Utilizada para hemorragias pélvicas."
        },
        {
          "donde": "Realidades del REBOA en trauma",
          "texto": "Zona 3: ≤30 minutos, con un máximo de 59 minutos."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c21",
      "topic": "Trauma · Carótida penetrante",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 22 años con herida por arma blanca en zona II del cuello, <span class='hy'>hematoma pulsátil, PA 80/50 mmHg</span> y hemiparesia izquierda de 1 hora. ¿Qué haces?",
      "options": [
        "Angiotomografía de cuello antes de decidir la conducta",
        "Cirugía inmediata con reparo de la carótida",
        "Ligadura sistemática de la carótida común e interna",
        "Observación en UCI con anticoagulación plena"
      ],
      "correct": 1,
      "whyCorrect": "Inestable y con déficit neurológico agudo por trauma penetrante de carótida: el manejo es quirúrgico inmediato y se busca el reparo primario. La imagen es para pacientes estables con signos de duda.",
      "pearl": "Contraindican la revascularización: coma, ventana mayor de 6 horas y alto riesgo de transformación hemorrágica.",
      "trap": "Llevar a imagen a un paciente inestable con signos duros.",
      "cita": [
        {
          "donde": "Trauma carotídeo",
          "texto": "Pacientes inestables, pacientes con déficit neurológico agudo secundario a un trauma penetrante de carótida, el manejo es netamente quirúrgico y se debería realizar un reparo primario."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c22",
      "topic": "Trauma · Vena cava inferior",
      "difficulty": "dificil",
      "src": "udea_cir25",
      "vignette": "En laparotomía por herida por arma de fuego, el paciente está <span class='hy'>inestable, con sangrado activo y lesión de colon</span>. Se encuentra una lesión compleja de la <span class='hy'>vena cava infrarrenal</span>. ¿Qué opción es válida?",
      "options": [
        "Ligar la cava infrarrenal",
        "Injerto protésico de interposición",
        "Reparo con parche aunque prolongue la cirugía",
        "Trasladar sin control del sangrado"
      ],
      "correct": 0,
      "whyCorrect": "En el segmento infrarrenal la circulación colateral (venas lumbares) hace que la ligadura se tolere. En un paciente inestable con sangrado activo y lesiones asociadas, la ligadura es una opción descrita. En lesiones suprarrenales y retrohepáticas generalmente no se liga.",
      "pearl": "El segmento infrarrenal es el más lesionado (39 %) y el de mejor supervivencia; el retrohepático, el de peor pronóstico.",
      "trap": "Insistir en una reconstrucción larga en un paciente en control de daños, o usar injerto protésico con contaminación intestinal.",
      "cita": [
        {
          "donde": "Trauma de vena cava inferior: se liga o se repara",
          "texto": "Cuando el paciente está hemodinámicamente inestable con sangrado activo, lesiones graves asociadas, o cuando la reparación produce estenosis del vaso, la ligadura es una opción quirúrgica descrita."
        },
        {
          "donde": "Trauma de vena cava inferior: se liga o se repara",
          "texto": "La ligadura de la VCI generalmente no se realiza en lesiones suprarrenales y retrohepáticas."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c23",
      "topic": "Trauma · Isquemia aguda de extremidad",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 30 años con herida por arma de fuego en el muslo y <span class='hy'>pie frío sin pulsos</span>. El cirujano vascular llega en 3 horas. ¿Qué haces mientras tanto?",
      "options": [
        "Esperar al cirujano: la ventana segura de revascularización es de 6 horas",
        "Derivación arterial temporal (shunt) y revascularizar pronto",
        "Amputación primaria por el tiempo de isquemia esperado",
        "Anticoagular con heparina y reevaluar la perfusión en 12 horas"
      ],
      "correct": 1,
      "whyCorrect": "La ventana clásica de 6 horas se está revaluando: el salvamento de la extremidad cae de forma notable después de 3 horas. Las guías priorizan la revascularización temprana y el uso de shunts arteriales cuando la reparación definitiva no es inmediata.",
      "pearl": "Un índice tobillo-brazo mayor de 0,9 se ha usado para descartar lesión arterial, pero esa evidencia viene sobre todo de oclusión no traumática.",
      "trap": "Confiarse en la ventana de 6 horas.",
      "cita": [
        {
          "donde": "Isquemia aguda traumática de miembros inferiores",
          "texto": "Diversos estudios han documentado que la probabilidad de salvamento de la extremidad disminuye progresivamente a medida que aumenta el tiempo de isquemia, con una caída notable después de las 3 horas y un aumento exponencial del riesgo de amputación después de las 6 horas (12–14)."
        },
        {
          "donde": "Isquemia aguda traumática de miembros inferiores",
          "texto": "diversas guías internacionales han recomendado priorizar estrategias de revascularización temprana y utilizar medidas de control temporal como el uso de shunts arteriales en entornos donde la reparación definitiva no es inmediata (6)."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c24",
      "topic": "Esófago · Síndrome de Boerhaave",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 52 años con <span class='hy'>dolor torácico intenso tras vómitos</span> por ingesta de alcohol, enfisema subcutáneo cervical y taquicardia. ¿Qué estudio pides?",
      "options": [
        "Endoscopia digestiva alta urgente para ver el desgarro",
        "Tomografía con contraste o esofagografía por TC",
        "Esofagograma con bario, que da mejor detalle de la mucosa",
        "Troponina seriada y alta si es negativa"
      ],
      "correct": 1,
      "whyCorrect": "Sospecha de Boerhaave (ruptura espontánea tras vómitos, hombre de 40 a 60 años). La tomografía con contraste y la esofagografía por TC son el estudio de elección. Si se usa esofagograma, el contraste debe ser hidrosoluble: el bario causa mediastinitis química.",
      "pearl": "La mortalidad (10 a 20 %) se duplica con 24 horas de retraso en el diagnóstico.",
      "trap": "Usar bario en una sospecha de perforación.",
      "cita": [
        {
          "donde": "Perforación esofágica",
          "texto": "La tomografía computada con contraste y la esofagografía por TC son el examen de imagen de elección en pacientes con sospecha de perforación esofágica."
        },
        {
          "donde": "Perforación esofágica",
          "texto": "Esofagograma: implica el consumo de material de contraste (idealmente hidrosoluble por el riesgo de mediastinitis química con el bario) para visualizar el lumen esofágico y detectar fugas."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c25",
      "topic": "Esófago · Hernia hiatal paraesofágica",
      "difficulty": "basica",
      "src": "udea_cir25",
      "vignette": "Mujer de 74 años con plenitud posprandial y disnea. Al examen hay <span class='hy'>matidez en la base izquierda y ruidos intestinales en el tórax</span>. Sospechas una hernia hiatal grande. ¿Qué estudio la clasifica mejor?",
      "options": [
        "Radiografía contrastada de esófago, estómago y duodeno",
        "Ecografía abdominal con ventana subxifoidea",
        "Manometría esofágica de alta resolución, antes que cualquier imagen",
        "pH-metría de 24 horas con impedancia"
      ],
      "correct": 0,
      "whyCorrect": "La radiografía contrastada de vías digestivas altas es el método de elección: ubica la unión gastroesofágica, clasifica el tipo de hernia (I a IV) y descarta vólvulo.",
      "pearl": "Las tipo I (por deslizamiento) suelen ser asintomáticas; las II a IV dan más síntomas y complicaciones agudas (vólvulo, obstrucción, sangrado).",
      "trap": "Pedir pruebas funcionales (manometría, pH-metría) para clasificar la anatomía.",
      "cita": [
        {
          "donde": "Hernia hiatal",
          "texto": "la radiografía contrastada de las vías digestivas altas (radiografía de esófago, estómago y duodeno) es el método de elección porque permite realizar una clasificación más adecuada del tipo de hernia, ya que se puede visualizar la ubicación de la UGE y descartar la presencia de un vólvulo asociado."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c26",
      "topic": "Perioperatorio · Analgesia multimodal",
      "difficulty": "residencia",
      "src": "udea_cir25",
      "vignette": "Hombre de 48 años con <span class='hy'>consumo crónico de opioides</span> por dolor lumbar, programado para laparotomía. ¿Qué agregas a la analgesia multimodal para controlar el dolor y ahorrar opioides?",
      "options": [
        "Duplicar la dosis de morfina sin otros fármacos",
        "Ketamina en infusión perioperatoria",
        "Suspender los opioides la víspera",
        "Solo acetaminofén, sin AINE"
      ],
      "correct": 1,
      "whyCorrect": "La ketamina en infusión es muy efectiva en cirugía mayor dolorosa y en pacientes con consumo crónico de opioides, en quienes la tolerancia es un reto. En infusión tiene un perfil hemodinámico seguro.",
      "pearl": "Si no hay epidural, la lidocaína en infusión es una alternativa muy efectiva en cirugía abdominal mayor.",
      "trap": "Subir solo el opioide en un paciente con tolerancia.",
      "cita": [
        {
          "donde": "Manejo del dolor perioperatorio: importancia de la analgesia multimodal",
          "texto": "Otro escenario en donde ha demostrado gran impacto es en el manejo de dolor de pacientes con consumo crónico de opioides, que representa un gran reto por el fenómeno de tolerancia en estos pacientes (21,22)."
        }
      ],
      "verificado": "2026-11-22"
    },
    {
      "id": "cir-c31",
      "topic": "Pared abdominal · Hernia inguinal en la mujer",
      "difficulty": "residencia",
      "src": "nrdp_hernia25",
      "vignette": "Mujer de 47 años, sana, con una <span class='hy'>hernia inguinal derecha asintomática</span> que encontró al bañarse. Se reduce fácil. Pregunta si puede esperar sin operarse. ¿Qué le recomiendas?",
      "options": [
        "Espera vigilante con control anual en consulta",
        "Reparación quirúrgica programada",
        "Faja inguinal y control solo si aparece dolor",
        "Ecografía cada 6 meses para medir el defecto"
      ],
      "correct": 1,
      "whyCorrect": "La espera vigilante es segura en hombres sanos y asintomáticos, pero no está validada ni se recomienda en mujeres: en ellas la incarceración y la estrangulación son más frecuentes.",
      "pearl": "En la mujer piensa también en hernia femoral: es más frecuente en ellas y es la que más se estrangula.",
      "trap": "Extender a la mujer la espera vigilante que se acepta en el hombre asintomático.",
      "cita": [
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Manejo",
          "texto": "While watchful waiting has been found to be safe in otherwise healthy and asymptomatic male patients, it is not a validated or recommended option in female patients due to a higher rate of incarceration and strangulation."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c32",
      "topic": "Pared abdominal · Espera vigilante en la hernia inguinal",
      "difficulty": "residencia",
      "src": "nrdp_hernia25",
      "vignette": "Hombre de 63 años, sano, con una <span class='hy'>hernia inguinal izquierda pequeña, sin síntomas</span>, reductible. No quiere operarse por ahora. ¿Qué le explicas?",
      "options": [
        "Debe operarse ya: el riesgo de estrangulación es alto",
        "La espera es segura, pero la mayoría termina operándose",
        "Solo se opera si la hernia mide más de 5 cm",
        "La espera vigilante solo se permite en menores de 50 años"
      ],
      "correct": 1,
      "whyCorrect": "En el hombre sano y asintomático la espera vigilante es segura: el riesgo de complicaciones que obliguen a cirugía urgente es bajo. Pero un tercio se opera a los 3 años y dos tercios a los 10, sobre todo porque aparece dolor.",
      "pearl": "Cirugía urgente frente a programada: la mortalidad a 30 días va de 0 a 11,8 % frente a 0 a 1,7 %.",
      "trap": "Decir que toda hernia asintomática debe operarse ya por riesgo de estrangulación.",
      "cita": [
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Manejo",
          "texto": "Watchful waiting was associated with a low risk of progression to symptomatic hernia or complications requiring emergency surgery for incarceration or strangulation. However, one-third of the patients crossed over to surgery after 3 years and two-thirds after 10 years, mainly owing to pain progression."
        },
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Mortalidad",
          "texto": "A systematic review indicates that emergency hernia repairs have a 30-day mortality rate of 0–11.8%, compared with 0–1.7% for elective repairs, representing a 26-fold increase."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c33",
      "topic": "Pared abdominal · Técnica de reparación abierta",
      "difficulty": "basica",
      "src": "nrdp_hernia25",
      "vignette": "Hombre de 55 años con <span class='hy'>hernia inguinal sintomática</span> que se operará por vía abierta, con anestesia local. ¿Cuál es la técnica abierta de referencia?",
      "options": [
        "Lichtenstein, con malla y sin tensión",
        "Bassini, con sutura de los tejidos",
        "Shouldice, reparación en varios planos",
        "McVay, al ligamento de Cooper"
      ],
      "correct": 0,
      "whyCorrect": "La técnica de Lichtenstein (malla sin tensión) es la técnica abierta mejor evaluada y la preferida: buenos resultados, curva de aprendizaje corta y se puede hacer con anestesia local. Es el patrón con el que se comparan las demás.",
      "pearl": "Las reparaciones sin malla (con tejido propio) se prefieren en niños, adolescentes y en quien tuvo complicaciones por una malla.",
      "trap": "Elegir una reparación con tejido en un adulto sin contraindicación para la malla.",
      "cita": [
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Manejo",
          "texto": "The Lichtenstein technique, popularized by Irving Lichtenstein in the 1980s and refined by Dr Parviz Amid, is the best evaluated and most utilized open mesh-based technique and is the preferred open approach for inguinal hernia repair owing to its favourable outcomes, short learning curve and ability to be performed under local anaesthesia."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c34",
      "topic": "Cirugía pediátrica · Hernia inguinal del prematuro",
      "difficulty": "residencia",
      "src": "nrdp_hernia25",
      "vignette": "Lactante de 2 meses, nacido a las <span class='hy'>32 semanas</span>, con una <span class='hy'>hernia inguinal derecha</span> que se reduce sola. Está asintomático. ¿Qué le dices a la mamá?",
      "options": [
        "Esperar: casi todas cierran solas antes del año",
        "Usar un braguero hasta que cumpla los 2 años",
        "Programar la reparación quirúrgica",
        "Operar solo si llega a incarcerarse"
      ],
      "correct": 2,
      "whyCorrect": "En niños la hernia inguinal se incarcera en 7 % de los casos y en 11 % de los prematuros: casi siempre requiere reparación quirúrgica.",
      "pearl": "En niños y adolescentes se prefiere la reparación con tejido propio, sin malla.",
      "trap": "Esperar a que cierre sola u operar solo si se incarcera.",
      "cita": [
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Epidemiología",
          "texto": "The risk of incarceration is 7% in all paediatric cases, with 11% in preterm children, necessitating surgical repair in nearly all instances."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c35",
      "topic": "Pared abdominal · Diagnóstico de la hernia inguinal",
      "difficulty": "basica",
      "src": "nrdp_hernia25",
      "vignette": "Hombre de 40 años con un <span class='hy'>abultamiento inguinal reductible que aumenta al toser</span>; al examen la hernia es evidente. ¿Qué estudio pides antes de remitirlo a cirugía?",
      "options": [
        "Ecografía inguinal para confirmar el diagnóstico",
        "Tomografía de abdomen y pelvis con contraste",
        "Resonancia magnética de la región inguinal",
        "Ninguno: el diagnóstico es clínico"
      ],
      "correct": 3,
      "whyCorrect": "El examen físico es la base del diagnóstico. Las imágenes se reservan para cuando la clínica no es clara: hernia oculta o masa atípica. Casi la mitad de los pacientes con hernia evidente recibe una ecografía innecesaria.",
      "pearl": "Si hay síntomas pero no se palpa la masa (obesidad, mujer con posible hernia femoral), sí se pide ecografía dinámica o tomografía.",
      "trap": "Pedir ecografía de rutina a una hernia clínicamente evidente.",
      "cita": [
        {
          "donde": "Groin hernia, Nature Reviews Disease Primers 2025;11:47, Diagnóstico",
          "texto": "In 2021, an Australian study revealed that nearly half of the patients referred to a surgeon with clinically apparent inguinal hernias also underwent unnecessary groin ultrasounds. Imaging should be reserved for cases where the clinical presentation is unclear and the surgeon is uncertain of the diagnosis."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c36",
      "topic": "Colon · Diverticulitis perforada con peritonitis purulenta",
      "difficulty": "dificil",
      "src": "suc_divert24",
      "vignette": "Hombre de 59 años con diverticulitis sigmoidea y <span class='hy'>peritonitis purulenta generalizada (Hinchey III)</span>. Está <span class='hy'>hemodinámicamente estable</span> tras la reanimación. ¿Qué cirugía es la más adecuada?",
      "options": [
        "Lavado peritoneal laparoscópico sin resección",
        "Sigmoidectomía con anastomosis primaria",
        "Colostomía en asa, sin resecar el sigmoides",
        "Drenaje percutáneo y antibiótico sin cirugía"
      ],
      "correct": 1,
      "whyCorrect": "En el paciente sin compromiso hemodinámico por la sepsis, la evidencia reciente apoya la resección con anastomosis primaria, con o sin ileostomía de protección, en lugar del Hartmann. El lavado laparoscópico no se recomienda en la peritonitis purulenta o fecaloidea.",
      "pearl": "Las dos opciones de resección son con anastomosis primaria (con o sin ileostomía) o sin anastomosis (Hartmann); la anastomosis se apoya cuando la sepsis no compromete la hemodinamia.",
      "trap": "Hacer lavado laparoscópico: en el ensayo LOLA tuvo más eventos adversos y se detuvo antes de tiempo.",
      "cita": [
        {
          "donde": "Current Management of Diverticulitis, Surg Clin N Am 2024;104:529-543, Manejo quirúrgico",
          "texto": "Recent data have supported primary anastomosis with or without proximal diversion in patients who are not hemodynamically compromised by sepsis."
        },
        {
          "donde": "Current Management of Diverticulitis, Surg Clin N Am 2024;104:529-543, Lavado laparoscópico",
          "texto": "Laparoscopic lavage is not recommended in cases of feculent or purulent peritonitis."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c37",
      "topic": "Colon · Colonoscopia después de la diverticulitis complicada",
      "difficulty": "residencia",
      "src": "suc_divert24",
      "vignette": "Mujer de 62 años que se recupera de una <span class='hy'>diverticulitis complicada con absceso</span>, tratada con drenaje percutáneo y antibiótico. Nunca se ha hecho colonoscopia. ¿Qué sigue?",
      "options": [
        "Colonoscopia a las 6 semanas",
        "Colonoscopia solo si hay sangrado rectal",
        "Tomografía de control cada año por 5 años",
        "Colectomía urgente antes del alta"
      ],
      "correct": 0,
      "whyCorrect": "Tras una diverticulitis complicada se hace colonoscopia a las 6 semanas para descartar un cáncer que acompañe al cuadro: el riesgo es de 11 % frente a 0,7 % en la no complicada. Se omite si tuvo una colonoscopia de buena calidad en el último año.",
      "pearl": "Los abscesos pequeños (menos de 5 cm) que responden a drenaje y antibiótico no siempre requieren colectomía de intervalo.",
      "trap": "Omitir la colonoscopia porque el cuadro ya se resolvió.",
      "cita": [
        {
          "donde": "Current Management of Diverticulitis, Surg Clin N Am 2024;104:529-543, Evaluación tras la recuperación",
          "texto": "After recovery from an episode of acute complicated diverticulitis, patients should be evaluated endoscopically with a colonoscopy at 6 weeks after the initial episode to evaluate for concomitant malignancy."
        },
        {
          "donde": "Current Management of Diverticulitis, Surg Clin N Am 2024;104:529-543, Evaluación tras la recuperación",
          "texto": "Meta-analyses performed showed that the risk of concomitant malignancy in patients with complicated diverticulitis was 11% (vs 0.7% in patients with uncomplicated disease)."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c38",
      "topic": "Trauma · Hemotórax masivo",
      "difficulty": "residencia",
      "src": "wses_torax25",
      "vignette": "Hombre de 24 años con herida por arma cortopunzante en el hemitórax izquierdo. Al pasar el tubo de tórax salen <span class='hy'>1.600 mL de sangre</span> y sigue hipotenso pese a la reanimación. ¿Qué sigue?",
      "options": [
        "Segundo tubo de tórax y observar el drenaje",
        "Tomografía de tórax antes de decidir",
        "Toracotomía para controlar el sangrado",
        "Videotoracoscopia programada al día siguiente"
      ],
      "correct": 2,
      "whyCorrect": "Se opera ante inestabilidad hemodinámica con sangrado intratorácico activo: más de 1.500 mL al poner el tubo, o más de 200 mL/h durante 3 horas seguidas sin otra causa.",
      "pearl": "Hemotórax masivo: más de 1.500 mL de sangre en la cavidad. Se reconoce pronto, se drena y se repone sangre.",
      "trap": "Llevar a tomografía a un paciente inestable que sigue sangrando por el tubo.",
      "cita": [
        {
          "donde": "WSES-AAST, Thoracic trauma, World J Emerg Surg 2025;20:78, Hemotórax",
          "texto": "Surgery should be considered in case of hemodynamic instability and active intrathoracic bleeding (more than 1500 mL of blood or more than 200 mL/h over 3 consecutive hours without other causes of bleeding)."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c39",
      "topic": "Trauma · Neumotórax abierto",
      "difficulty": "basica",
      "src": "wses_torax25",
      "vignette": "Hombre de 30 años con una <span class='hy'>herida soplante en el hemitórax derecho</span> tras un impacto de arma de fuego. Taquipneico, con burbujeo por la herida. ¿Cuál es el manejo inicial?",
      "options": [
        "Cerrar la herida con sutura en urgencias y vigilar",
        "Intubar y esperar la radiografía de tórax",
        "Toracotomía de reanimación inmediata",
        "Apósito oclusivo en 3 lados y tubo de tórax"
      ],
      "correct": 3,
      "whyCorrect": "El neumotórax abierto se maneja primero con un apósito oclusivo sellado en tres lados; después se pone el tubo de tórax y se repara el defecto de la pared.",
      "pearl": "El apósito en 3 lados funciona como válvula: deja salir el aire y no lo deja entrar.",
      "trap": "Cerrar herméticamente la herida sin tubo: convierte el neumotórax abierto en uno a tensión.",
      "cita": [
        {
          "donde": "WSES-AAST, Thoracic trauma, World J Emerg Surg 2025;20:78, Neumotórax",
          "texto": "Open PNX should be initially managed with a three-sided occlusive dressing then tube thoracostomy and chest wall defect repair should be performed."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c40",
      "topic": "Trauma · Tórax inestable",
      "difficulty": "residencia",
      "src": "wses_torax25",
      "vignette": "Mujer de 52 años tras un choque de moto. Tiene <span class='hy'>tórax inestable</span> por fracturas de 5 costillas en dos sitios. Está <span class='hy'>hemodinámicamente estable</span>. ¿Qué tratamiento de las fracturas debe considerarse?",
      "options": [
        "Estabilización quirúrgica de las costillas",
        "Solo analgesia y fisioterapia respiratoria intensiva",
        "Vendaje compresivo del tórax por 6 semanas",
        "Ventilación mecánica como fijación interna"
      ],
      "correct": 0,
      "whyCorrect": "La estabilización quirúrgica de las fracturas costales debe considerarse en todo paciente con tórax inestable que esté hemodinámicamente estable: los estudios muestran mejores resultados que el manejo no operatorio.",
      "pearl": "Si en la misma cirugía hay sospecha de lesión de órganos o un hemotórax o neumotórax que persiste pese al tubo, se considera videotoracoscopia.",
      "trap": "Usar la ventilación mecánica para «fijar» el tórax.",
      "cita": [
        {
          "donde": "WSES-AAST, Thoracic trauma, World J Emerg Surg 2025;20:78, Fracturas costales",
          "texto": "Surgical stabilization of rib fractures should be considered in all hemodynamically stable patients presenting with a flail chest (LoE Moderate, GoR Moderate)."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c41",
      "topic": "Trauma · Neumotórax oculto",
      "difficulty": "residencia",
      "src": "wses_torax25",
      "vignette": "Hombre de 35 años, estable, con trauma cerrado de tórax. La radiografía en decúbito es normal, pero la tomografía muestra un <span class='hy'>neumotórax pequeño, de 2 cm en el ápice</span>. No necesita ventilación mecánica. ¿Qué haces?",
      "options": [
        "Tubo de tórax de inmediato",
        "Observación sin drenaje",
        "Toracotomía exploratoria",
        "Aspiración con aguja cada 6 horas"
      ],
      "correct": 1,
      "whyCorrect": "El neumotórax oculto pequeño (hasta 3,5 cm en el ápice) se puede observar: puede no necesitar drenaje.",
      "pearl": "Se llama oculto porque no se ve en la radiografía en decúbito y aparece en la tomografía o en el EFAST.",
      "trap": "Poner tubo a todo neumotórax que aparece en la tomografía.",
      "cita": [
        {
          "donde": "WSES-AAST, Thoracic trauma, World J Emerg Surg 2025;20:78, Neumotórax",
          "texto": "Small (rim up to 3.5 cm at the pulmonary apex) or lately diagnosed small occult PNX can be observed and may not require drainage."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c42",
      "topic": "Trauma · Lesión de colon",
      "difficulty": "residencia",
      "src": "wses_colon26",
      "vignette": "Hombre de 28 años con herida por arma cortopunzante en el abdomen, <span class='hy'>hemodinámicamente estable</span>. En la laparotomía hay una <span class='hy'>laceración pequeña del colon transverso</span>, no destructiva. ¿Qué haces?",
      "options": [
        "Colostomía en asa de rutina",
        "Reparación primaria del colon",
        "Resección y colostomía terminal",
        "Reparación primaria con ileostomía de protección"
      ],
      "correct": 1,
      "whyCorrect": "En el paciente estable se prefiere la reparación primaria o la resección con anastomosis antes que la derivación de rutina. Si la lesión es de bajo grado, basta la reparación primaria.",
      "pearl": "No se recomienda dejar ileostomía o colostomía de protección de rutina después de reparar o anastomosar.",
      "trap": "Hacer colostomía por costumbre, como se hacía antes.",
      "cita": [
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 3.1",
          "texto": "We recommend primary repair or resection with anastomosis over routine fecal diversion in hemodynamically stable patients with intraperitoneal colon injury; for low-grade injuries, primary repair alone is preferred over resection with anastomosis."
        },
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 4.1",
          "texto": "We suggest against the routine use of protective ileostomy or loop colostomy after primary repair or resection with anastomosis in adult traumatic colon injury."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c43",
      "topic": "Trauma · Antibiótico tras lesión intestinal",
      "difficulty": "basica",
      "src": "wses_colon26",
      "vignette": "Mujer de 33 años operada por una <span class='hy'>herida de colon</span> por arma cortopunzante: se reparó y se cerró sin complicaciones. ¿Hasta cuándo das el antibiótico?",
      "options": [
        "Por 7 días, por la contaminación fecal",
        "Hasta que retiren los puntos de la piel",
        "Máximo 24 horas tras controlar el foco",
        "Por 14 días si hubo heces en la cavidad"
      ],
      "correct": 2,
      "whyCorrect": "El antibiótico posoperatorio se suspende dentro de las 24 horas siguientes al control definitivo del foco y el cierre. Prolongarlo no previene más infecciones del sitio operatorio y aumenta los efectos adversos.",
      "pearl": "Otras recomendaciones de la misma guía: las anastomosis con grapas y manuales son equivalentes, y en pacientes seleccionados se aconseja la nutrición enteral temprana.",
      "trap": "Alargar el antibiótico «por si acaso» porque hubo contaminación.",
      "cita": [
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 15",
          "texto": "We recommend discontinuing postoperative antibiotic regimens within 24 h after definitive source control and closure of traumatic bowel injuries."
        },
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 15",
          "texto": "Continuing antibiotic prophylaxis beyond this 24-h window yields no additional benefit in preventing surgical site infection and increases the risk of adverse effects."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c44",
      "topic": "Trauma · Lesión destructiva del recto",
      "difficulty": "dificil",
      "src": "wses_colon26",
      "vignette": "Hombre de 26 años, <span class='hy'>hemodinámicamente estable</span>, con herida por arma de fuego de alta energía y una <span class='hy'>lesión destructiva del recto</span> que deja bordes sanos y bien perfundidos tras resecar. ¿Qué cirugía sugiere la guía?",
      "options": [
        "Colostomía terminal sin resecar el recto lesionado",
        "Reparación primaria simple de los bordes de la herida",
        "Solo drenaje presacro y lavado del recto distal",
        "Resección y anastomosis, con o sin ostomía"
      ],
      "correct": 3,
      "whyCorrect": "En el paciente estable con lesión destructiva del recto se sugiere resección con anastomosis primaria, con o sin ostomía de derivación, cuando sea posible. La colostomía se reserva para lesiones destructivas de alta energía que no dejan bordes sanos o para la inestabilidad como parte del control de daños.",
      "pearl": "Lesión no destructiva con buena irrigación: reparación primaria si es técnicamente posible en el paciente estable.",
      "trap": "Hacer colostomía a toda lesión destructiva, aunque el paciente esté estable y los bordes queden sanos.",
      "cita": [
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 9.2",
          "texto": "In stable patients with destructive rectal injury, we suggest resection and primary anastomosis with or without diverting ostomy, when feasible."
        },
        {
          "donde": "WSES, Colon and rectal injuries, JAMA Surgery 2026, Recomendación 9.3",
          "texto": "We recommend reserving colostomy for selected cases of destructive high-energy rectal injuries that are difficult to excise leaving healthy, well-perfused edges, or for hemodynamic instability as part of damage-control surgery."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c45",
      "topic": "Trauma · Reanimación de control de daños",
      "difficulty": "residencia",
      "src": "sangre_total26",
      "vignette": "Hombre de 31 años con herida penetrante en el abdomen, <span class='hy'>PA 70/40 y FC 140</span>, en choque hemorrágico. Va para cirugía. ¿Con qué reanimas mientras llega al quirófano?",
      "options": [
        "Hemoderivados balanceados o sangre total",
        "2 litros de cristaloide y después reevaluar",
        "Coloides sintéticos para expandir el volumen",
        "Vasopresor para llegar a PA sistólica de 120"
      ],
      "correct": 0,
      "whyCorrect": "La reanimación de control de daños entiende el trauma como una «falla de la sangre»: se pasó de reanimar con cristaloides a dar temprano hemoderivados balanceados. La sangre total muestra un claro beneficio de supervivencia en el trauma penetrante; en el cerrado los resultados son mixtos.",
      "pearl": "La sangre total reduce el total de transfusiones y simplifica la logística frente a los componentes separados.",
      "trap": "Empezar con litros de cristaloide antes de la sangre.",
      "cita": [
        {
          "donde": "Current Clinical Implications of Whole Blood in Trauma Resuscitation, Curr Anesthesiol Rep 2026;16:12, Introducción",
          "texto": "The Damage Control Resuscitation paradigm, which recognizes trauma as a cause of ‘blood failure,’ has driven a transition from crystalloid-based to early balanced blood product resuscitation as part of a multifaceted approach to management."
        },
        {
          "donde": "Current Clinical Implications of Whole Blood in Trauma Resuscitation, Curr Anesthesiol Rep 2026;16:12, Resumen",
          "texto": "Recent prospective randomized trials and observational studies indicate a pronounced survival advantage in penetrating trauma, whereas blunt trauma phenotypes exhibit mixed outcomes and potential coagulopathy risks."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c46",
      "topic": "Quemaduras · Escisión temprana",
      "difficulty": "residencia",
      "src": "burn_sepsis26",
      "vignette": "Mujer de 40 años con <span class='hy'>quemaduras profundas en el 35 % de la superficie corporal</span>, ya reanimada y estable al tercer día. ¿Qué medida es la que más reduce la mortalidad por sepsis de la quemadura?",
      "options": [
        "Antibiótico profiláctico sistémico hasta el alta",
        "Escisión tangencial temprana e injerto",
        "Curaciones diarias esperando que la escara se desprenda",
        "Cultivos de vigilancia diarios de la herida"
      ],
      "correct": 1,
      "whyCorrect": "El avance más importante para reducir la mortalidad por sepsis de la herida fue la escisión tangencial temprana con injerto: se retira la escara, que es tejido necrótico y avascular donde crecen las bacterias, usualmente en los primeros 7 días.",
      "pearl": "El antibiótico profiláctico para los procedimientos quirúrgicos no debe pasar de 24 a 48 horas.",
      "trap": "Esperar a que la escara se desprenda sola.",
      "cita": [
        {
          "donde": "Sepsis in the major burn patient, Crit Care Sepsis Severe Infect 2026;1:16, Manejo quirúrgico",
          "texto": "The single most important advance in reducing mortality from burn wound sepsis has been the adoption of early tangential excision and grafting."
        },
        {
          "donde": "Sepsis in the major burn patient, Crit Care Sepsis Severe Infect 2026;1:16, Manejo antimicrobiano",
          "texto": "The duration of therapy should be the shortest effective course, and prophylactic antibiotics for surgical procedures should not exceed 24–48 hours."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c47",
      "topic": "Quemaduras · Sospecha de sepsis en el gran quemado",
      "difficulty": "dificil",
      "src": "burn_sepsis26",
      "vignette": "Hombre de 45 años con quemaduras del 50 %, en el día 8. Desde el ingreso tiene <span class='hy'>fiebre, taquicardia y leucocitosis</span>. Hoy aparecen <span class='hy'>trombocitopenia, hiperglucemia nueva e intolerancia a la nutrición enteral</span>. ¿Qué haces?",
      "options": [
        "Nada nuevo: es la respuesta inflamatoria de la quemadura",
        "Esperar a que la procalcitonina pase de 2 ng/mL",
        "Buscar el foco e iniciar antibiótico empírico",
        "Bajar la nutrición enteral a la mitad y vigilar"
      ],
      "correct": 2,
      "whyCorrect": "La fiebre, la taquicardia y la leucocitosis aparecen en muchos quemados sin infección. Por eso la American Burn Association usa criterios propios: con sospecha clínica y 3 o más de sus 6 predictores (temperatura extrema, taquicardia progresiva, taquipnea, trombocitopenia, hiperglucemia, intolerancia enteral) se busca el foco y se inicia antibiótico empírico.",
      "pearl": "Los criterios de respuesta inflamatoria sistémica no sirven en el gran quemado: los cumple sin estar infectado.",
      "trap": "Atribuir todo a la respuesta inflamatoria de la quemadura.",
      "cita": [
        {
          "donde": "Sepsis in the major burn patient, Crit Care Sepsis Severe Infect 2026;1:16, Diagnóstico",
          "texto": "Many burn patients fulfil systemic inflammatory response syndrome criteria (fever, tachycardia, tachypnoea and leukocytosis) in the absence of infection, limiting the specificity of these diagnostic parameters."
        },
        {
          "donde": "Sepsis in the major burn patient, Crit Care Sepsis Severe Infect 2026;1:16, Criterios de la American Burn Association",
          "texto": "A clinical suspicion of infection, in addition to meeting at least 3 of the 6 burn-specific predictors, should prompt an investigation for the infectious source and initiation of empiric systemic antibiotics. These include abnormalities such as extreme temperature changes, progressive tachycardia, tachypnoea, thrombocytopenia, hyperglycaemia, and intolerance to enteral feeding."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c48",
      "topic": "Perioperatorio · Presión negativa en la incisión",
      "difficulty": "dificil",
      "src": "inpwt_ssi26",
      "vignette": "Un metaanálisis de 85 ensayos (16.980 pacientes) compara la <span class='hy'>terapia de presión negativa en la incisión cerrada</span> con el apósito estándar. ¿Qué conclusión es correcta?",
      "options": [
        "Reduce la infección de órgano y espacio y la mortalidad",
        "No cambia la infección superficial ni la profunda",
        "Su beneficio no tiene ningún costo en efectos adversos",
        "NNT 21 para evitar 1 infección; NNH 18 para ampollas"
      ],
      "correct": 3,
      "whyCorrect": "Redujo la infección global, la profunda y la superficial, pero no la de órgano y espacio, los reingresos ni la mortalidad. Hay que tratar 21 pacientes para evitar una infección, y por cada 18 aparece una ampolla en la piel: el beneficio y el daño son de tamaño parecido.",
      "pearl": "Por eso los autores proponen usarla de forma selectiva en pacientes de alto riesgo.",
      "trap": "Leer solo la reducción relativa del riesgo sin mirar el NNT y el NNH.",
      "cita": [
        {
          "donde": "Incisional NPWT for prevention of SSI, JAMA Surgery 2026, Resultados",
          "texto": "The number needed to treat was 21 for SSI; the number needed to harm was 18 for skin blistering and 11 for device-related adverse events."
        },
        {
          "donde": "Incisional NPWT for prevention of SSI, JAMA Surgery 2026, Resultados",
          "texto": "No significant differences were observed for organ-space SSI, readmission, or mortality."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c49",
      "topic": "Trauma · Herida toracoabdominal izquierda en paciente estable",
      "difficulty": "residencia",
      "src": "udea_toracoab22",
      "vignette": "Hombre de 25 años con <span class='hy'>herida por arma cortopunzante toracoabdominal izquierda</span>. Está <span class='hy'>estable, sin irritación peritoneal</span> y la radiografía de tórax es normal. ¿Qué estudio recomiendas para descartar lesión del diafragma?",
      "options": [
        "Tomografía de tórax y abdomen con contraste",
        "Laparoscopia diagnóstica",
        "Ecografía E-FAST y alta si es negativa",
        "Observación 24 horas sin estudios"
      ],
      "correct": 1,
      "whyCorrect": "La laparoscopia es el estándar de referencia: diagnostica y repara en el mismo acto, con valor predictivo negativo de 96 %. La tomografía no basta para descartar la lesión: se le escapan entre 12 y 63 % de las heridas del diafragma.",
      "pearl": "Se prefiere la laparoscopia a la toracoscopia: las lesiones del tórax suelen resolverse con un tubo, pero 53 a 88,9 % de los pacientes estables tienen lesiones abdominales que pueden requerir cirugía.",
      "trap": "Dar de alta con una tomografía o una ecografía normales.",
      "cita": [
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Laparoscopia y toracoscopia",
          "texto": "Debido a una mayor capacidad diagnóstica de la laparoscopia frente a los estudios de imagen disponibles se recomienda recurrir a ella en los pacientes estables hemodinámicamente, sin signos de irritación y trauma penetrante toracoabdominal."
        },
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Tomografía computarizada",
          "texto": "El alto porcentaje de lesiones inadvertidas en la tomografía, que varía del 12 % al 63 % hacen que la TAC no sea suficiente para descartar trauma diafragmático."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c50",
      "topic": "Trauma · Límites del área toracoabdominal",
      "difficulty": "basica",
      "src": "udea_toracoab22",
      "vignette": "Mujer de 30 años con una herida por arma cortopunzante en la <span class='hy'>región lateral izquierda, a nivel del séptimo espacio intercostal</span>. ¿Por qué debes sospechar lesión del diafragma?",
      "options": [
        "La herida está en el área toracoabdominal",
        "Toda herida torácica lesiona el diafragma",
        "El diafragma solo se lesiona por debajo de las costillas",
        "Solo si hay neumotórax en la radiografía"
      ],
      "correct": 0,
      "whyCorrect": "La región toracoabdominal va, por arriba, del cuarto espacio intercostal adelante, el sexto en la región lateral y la punta de la escápula (octavo espacio) atrás. Una herida en esa zona puede lesionar el diafragma y vísceras del tórax y del abdomen.",
      "pearl": "La lesión del diafragma es izquierda en 75 a 80 % de los casos; la bilateral es rara (3 %).",
      "trap": "Manejar como herida solo torácica una lesión por debajo del cuarto espacio anterior o del sexto lateral.",
      "cita": [
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Introducción",
          "texto": "En 1989, Madden describió los límites superiores de la región toracoabdominal así: cuarto espacio intercostal en la zona anterior, sexto espacio intercostal en la región lateral, y a nivel posterior el ángulo inferior de la escápula que corresponde al octavo espacio intercostal."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c51",
      "topic": "Trauma · Herida diafragmática aislada",
      "difficulty": "residencia",
      "src": "udea_toracoab22",
      "vignette": "En la laparoscopia de un paciente estable con herida toracoabdominal izquierda se encuentra una <span class='hy'>laceración de 1 cm del diafragma</span>, sin otras lesiones. ¿Qué haces?",
      "options": [
        "Dejarla: los defectos pequeños cierran solos",
        "Observar y repetir la laparoscopia en 48 h",
        "Reparar la laceración del diafragma",
        "Solo dejar tubo de tórax y antibiótico"
      ],
      "correct": 2,
      "whyCorrect": "Las heridas aisladas del diafragma también se reparan: el movimiento continuo con la respiración hace muy improbable que el defecto cierre solo; al contrario, crece y da complicaciones como la hernia.",
      "pearl": "La diferencia de presión entre abdomen y pleura (7 a 20 cmH2O, y en el trauma cerrado puede pasar de 100) empuja las vísceras por el defecto.",
      "trap": "Pensar que un defecto pequeño del diafragma cicatriza solo.",
      "cita": [
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Enfoque diagnóstico y terapéutico",
          "texto": "Esto también aplica para las heridas diafragmáticas aisladas, ya que su continuo movimiento en relación con la mecánica respiratoria hace muy improbable un cierre espontáneo del defecto, y por el contrario, suelen progresar en tamaño y generar complicaciones."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c52",
      "topic": "Trauma · Hernia diafragmática traumática tardía",
      "difficulty": "dificil",
      "src": "udea_toracoab22",
      "vignette": "Hombre de 38 años con <span class='hy'>herida por arma cortopunzante toracoabdominal izquierda hace 2 años</span>, manejada sin cirugía. Ahora consulta por plenitud temprana, dolor toracoabdominal y vómito. La radiografía muestra un <span class='hy'>nivel hidroaéreo en el hemitórax izquierdo</span>. ¿Qué víscera es la que más se hernia de ese lado?",
      "options": [
        "Bazo",
        "Intestino grueso",
        "Hígado",
        "Estómago"
      ],
      "correct": 3,
      "whyCorrect": "Es una hernia diafragmática traumática que pasó inadvertida. Del lado izquierdo se hernian, en orden: estómago, bazo, colon, hígado, intestino delgado y epiplón. Si se complica, la mortalidad llega a 60 % y a 80 % si la víscera se estrangula.",
      "pearl": "La mayoría de las hernias crónicas se diagnostican en los 3 años siguientes, pero pueden aparecer hasta 20 años después. Del lado derecho el hígado protege y, si hay hernia, suele ser el hígado.",
      "trap": "Atribuir los síntomas a otra causa sin recordar la herida antigua.",
      "cita": [
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Epidemiología",
          "texto": "Los órganos que más frecuentemente se hernian al lado izquierdo son, en orden de frecuencia, el estómago, bazo, intestino grueso, hígado, intestino delgado y omento."
        },
        {
          "donde": "Memorias UdeA 2022, Enfoque del paciente con trauma toracoabdominal, Epidemiología",
          "texto": "Cuando esto ocurre, la mortalidad puede ascender hasta un 60 % y en casos de estrangulamiento de la víscera herniada, puede ser tan alta como del 80 %."
        }
      ],
      "verificado": "2026-11-25"
    },
    {
      "id": "cir-c53",
      "topic": "Perioperatorio · Náusea y vómito posoperatorios",
      "difficulty": "dificil",
      "src": "teas_nvpo26",
      "vignette": "En un ensayo con 232 mujeres con náusea y vómito posoperatorios moderados a graves tras cirugía de tiroides o de columna cervical, la estimulación eléctrica del punto PC6 logró remisión a las 2 h en 77,6 % frente a 55,2 % con metoclopramida. El NNT fue 4,46. ¿Cómo lo interpretas?",
      "options": [
        "Hay que tratar 446 pacientes para lograr 1 mejoría",
        "Cerca de 5 tratadas logran 1 remisión adicional",
        "Sirve igual para hombres y cualquier cirugía",
        "El NNT bajo prueba que no hubo sesgo"
      ],
      "correct": 1,
      "whyCorrect": "Un NNT de 4,46 quiere decir que, por cada 5 pacientes tratadas con estimulación en vez de metoclopramida, 1 más logra alivio importante. La recaída a las 24 h también fue menor: 12,2 % frente a 56,3 %.",
      "pearl": "Límite del estudio: solo incluyó mujeres y cirugías con poco dolor posoperatorio, así que no se puede generalizar.",
      "trap": "Leer el NNT como un número de cientos o asumir que el resultado sirve para cualquier paciente.",
      "cita": [
        {
          "donde": "TEAS vs Metoclopramide for PONV, JAMA Surgery 2026;161(3):268-273, Resultados",
          "texto": "This translated to a 50% reduction in PONV risk with TEAS (risk ratio, 0.50; 95% CI, 0.34-0.73). The attributable risk difference was 22% (95% CI, 11.0%-35.0%), yielding a number needed to treat of 4.46 (95% CI, 2.85-9.42), indicating that 1 additional case of significant relief is achieved per 5 patients treated with TEAS."
        },
        {
          "donde": "TEAS vs Metoclopramide for PONV, JAMA Surgery 2026;161(3):268-273, Limitaciones",
          "texto": "First, the generalizability of our findings is constrained by the gender-restricted sampling strategy for the reason noted above."
        }
      ],
      "verificado": "2026-11-25"
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
