// Casos clínicos incluidos. Cada uno: specialty, topic, vignette (admite <span class='hy'>dato</span>), options (4), correct (0-3), whyCorrect, pearl, trap.
const QUESTIONS_BASE = [
      {
        id: 1,
        specialty: "Medicina Interna",
        topic: "Cardiología · SCA",
        difficulty: "Nivel 3",
        vignette: "Hombre de 62 años con HTA y tabaquismo consulta por <span class='hy'>dolor retroesternal opresivo de 90 minutos</span> irradiado a mandíbula y diaforesis. PA 135/85 mmHg, FC 92 lpm, SatO2 96%. ECG muestra <span class='hy'>supradesnivel del ST de 3 mm en V1-V4</span>. El centro cuenta con sala de hemodinamia disponible en 45 minutos. ¿Cuál es la conducta de reperfusión prioritaria?",
        options: [
          "Administrar alteplasa intravenosa inmediata antes del traslado a sala",
          "Intervención coronaria percutánea (ICP) primaria dentro de los próximos 90 minutos",
          "Iniciar heparina de bajo peso molecular y esperar troponinas seriadas a las 3 horas",
          "Realizar ecocardiograma transtorácico antes de definir terapia antitrombótica"
        ],
        correct: 1,
        whyCorrect: "En un IAMCEST con disponibilidad de hemodinamia en menos de 120 minutos desde el primer contacto médico, la ICP primaria es el estándar de oro (meta puerta-balón ≤ 90 min). No se debe retrasar por troponinas ni ecocardiograma.",
        pearl: "IAMCEST = diagnóstico electrocardiográfico y clínico. Tiempo es miocardio: ICP < 120 min; si no es posible, fibrinólisis en < 10 min.",
        trap: "Esperar troponinas en un paciente con supradesnivel claro del ST es el error clásico que retrasa la reperfusión y aumenta mortalidad."
      },
      {
        id: 2,
        specialty: "Urgencias",
        topic: "Sepsis · Reanimación",
        difficulty: "Nivel 3",
        vignette: "Mujer de 71 años ingresa por fiebre, disuria y confusión. PA 78/46 mmHg, FC 124 lpm, FR 28 rpm, T° 39.1°C, <span class='hy'>lactato sérico 4.4 mmol/L</span>. Ya recibió 30 mL/kg de cristaloides balanceados en la primera hora, pero persiste con <span class='hy'>PAM en 54 mmHg</span>. ¿Cuál es el siguiente paso inmediato?",
        options: [
          "Administrar un segundo bolo de 30 mL/kg de solución salina al 0.9%",
          "Iniciar norepinefrina en infusión titulada a la PAM objetivo",
          "Iniciar dopamina como vasopresor de primera línea por vía periférica",
          "Indicar hidrocortisona 200 mg IV en bolo único antes de vasopresores"
        ],
        correct: 1,
        whyCorrect: "Si tras el bolo inicial de cristaloides persiste la hipotensión, se trata de choque séptico y se inicia norepinefrina (primera línea) sin esperar más bolos. La SSC 2026 sugiere en adultos ≥ 65 años, como esta paciente, una PAM objetivo inicial de 60–65 mmHg.",
        pearl: "Choque séptico = sepsis + vasopresor para mantener la PAM + lactato > 2 mmol/L tras reanimación hídrica. SSC 2026: PAM ≥ 65 en general, 60–65 en ≥ 65 años.",
        trap: "Seguir encharcando al paciente con bolos repetidos sin iniciar norepinefrina empeora el edema pulmonar y la mortalidad."
      },
      {
        id: 3,
        specialty: "Medicina Interna",
        topic: "Endocrinología · Crisis Hiperglucémica",
        difficulty: "Nivel 3",
        vignette: "Joven de 22 años con DM1 ingresa por vómitos y respiración de Kussmaul. Glucemia 480 mg/dL, pH arterial 7.14, HCO3 10 mEq/L, cetonuria +++, Na+ 132 mEq/L, <span class='hy'>K+ sérico 3.1 mEq/L</span>. ¿Qué acción es obligatoria ANTES de iniciar la infusión de insulina?",
        options: [
          "Administrar bicarbonato de sodio IV para corregir el pH < 7.20",
          "Iniciar reposición de potasio IV junto con hidratación y diferir insulina hasta K+ ≥ 3.3 mEq/L",
          "Pasar bolo de insulina regular 0.15 U/kg IV de inmediato",
          "Corregir el sodio sérico con solución salina hipertónica al 3%"
        ],
        correct: 1,
        whyCorrect: "En cetoacidosis diabética (CAD), la insulina desplaza potasio al espacio intracelular. Si K+ < 3.3 mEq/L, dar insulina precipita arritmias fatales; se debe reponer potasio primero hasta ≥ 3.3 mEq/L.",
        pearl: "Regla de oro en CAD: K+ < 3.3 → NO insulina, reponer K+ primero. Bicarbonato solo si pH < 6.9.",
        trap: "La mayoría cae en dar insulina inmediata por la glucemia de 480 o bicarbonato por el pH de 7.14. Siempre mira el potasio primero."
      },
      {
        id: 4,
        specialty: "Ginecología",
        topic: "Obstetricia · Trastornos Hipertensivos",
        difficulty: "Nivel 3",
        vignette: "Gestante de 34 semanas consulta por <span class='hy'>cefalea frontal intensa, fosfenos y epigastralgia</span>. PA 168/112 mmHg en dos tomas, proteinuria en tira +++, plaquetas 88.000/mm³, AST 145 U/L. ¿Cuál es el manejo farmacológico prioritario para prevención de eclampsia y control tensional?",
        options: [
          "Sulfato de magnesio (esquema Zuspan) + labetalol o nifedipino oral de acción rápida",
          "Diazepam IV en infusión + losartán oral 50 mg",
          "Alfamelildopa oral 500 mg cada 8 horas y control ambulatorio en 48 horas",
          "Furosemida IV + inducción del parto diferida hasta las 37 semanas"
        ],
        correct: 0,
        whyCorrect: "Presenta preeclampsia con criterios de severidad (PA ≥ 160/110, síntomas neurológicos, trombocitopenia < 100.000, elevación de transaminasas). Requiere sulfato de magnesio para neuroprotección/profilaxis de eclampsia y antihipertensivo agudo (labetalol IV o nifedipino oral).",
        pearl: "Sulfato de magnesio es el fármaco de elección para prevenir y tratar convulsiones eclámpticas (vigilar reflejo patelar, FR y diuresis).",
        trap: "Los IECA/ARA-II (losartán) están contraindicados en embarazo, y las benzodiacepinas no reemplazan al sulfato de magnesio."
      },
      {
        id: 5,
        specialty: "Pediatría",
        topic: "Vía Aérea · Laringotraqueítis",
        difficulty: "Nivel 2",
        vignette: "Niño de 2 años con cuadro de 2 días de rinorrea y febrícula, quien presenta esta noche <span class='hy'>tos perruna (metálica), disfonía y estridor inspiratorio en reposo</span> sin babeo ni posición en trípode. ¿Cuál es la terapia inicial más efectiva?",
        options: [
          "Nebulización con salbutamol y amoxicilina oral",
          "Dexametasona dosis única + adrenalina racémica nebulizada",
          "Intubación endotraqueal inmediata en quirófano bajo sospecha de epiglotitis",
          "Azitromicina oral y vapor frío domiciliario"
        ],
        correct: 1,
        whyCorrect: "Es un Crup (laringotraqueítis viral) moderado-severo por presentar estridor en reposo. Todo crup recibe dexametasona (0.15–0.6 mg/kg) y, al tener estridor en reposo, se añade adrenalina nebulizada para reducir rápido el edema subglótico.",
        pearl: "Crup = Parainfluenza, tos perruna, estridor inspiratorio. Epiglotitis = H. influenzae, babeo, disfagia, aspecto tóxico, signo del pulgar.",
        trap: "Confundir Crup con bronquiolitis (sibilancias en < 2 años) o con epiglotitis (babeo + toxicidad)."
      },
      {
        id: 6,
        specialty: "Cirugía",
        topic: "Abdomen Agudo · Vesícula",
        difficulty: "Nivel 3",
        vignette: "Mujer de 46 años consulta por dolor en hipocondrio derecho de 36 horas, fiebre de 38.4°C y vómitos. <span class='hy'>Signo de Murphy positivo</span>. Leucocitos 15.200/mm³. Ecografía: litiasis vesicular, pared engrosada de 5 mm y líquido pericolecístico. <span class='hy'>Bilirrubina total y fosfatasa alcalina normales</span>. ¿Conducta?",
        options: [
          "CPRE urgente antes de cualquier intervención quirúrgica",
          "Antibioticoterapia IV + colecistectomía laparoscópica temprana (< 72 h)",
          "Manejo ambulatorio con analgésicos y colecistectomía electiva en 3 meses",
          "Colangiorresonancia obligatoria para descartar colangitis aguda"
        ],
        correct: 1,
        whyCorrect: "Cumple criterios de Tokio para colecistitis aguda (Murphy +, fiebre/leucocitosis, engrosamiento parietal y líquido pericolecístico) sin signos de colangitis ni coledocolitiasis (bilirrubinas/FA normales). El tratamiento definitivo es colecistectomía laparoscópica temprana.",
        pearl: "Colecistitis aguda no complicada → Colecistectomía laparoscópica temprana (primeras 72 h) reduce estancia y complicaciones.",
        trap: "Pedir CPRE sin dilatación de vía biliar ni colestasis expone innecesariamente a pancreatitis post-CPRE."
      },
      {
        id: 7,
        specialty: "Medicina Interna",
        topic: "Neurología · ACV Isquémico",
        difficulty: "Nivel 3",
        vignette: "Hombre de 68 años llega a urgencias con <span class='hy'>hemiparesia derecha y afasia de inicio súbito hace 2 horas</span>. NIHSS 12. <span class='hy'>TAC cerebral simple sin hemorragia</span> ni signos de infarto extenso. PA 172/94 mmHg, glucemia 118 mg/dL, sin cirugías recientes ni anticoagulación. ¿Conducta inmediata?",
        options: [
          "Administrar ácido acetilsalicílico 300 mg VO y observar evolución 24 horas",
          "Trombólisis intravenosa con alteplasa (o tenecteplasa) de inmediato",
          "Bajar la presión arterial a < 120/80 mmHg con nitroprusiato antes de trombolizar",
          "Iniciar heparina no fraccionada en infusión continua"
        ],
        correct: 1,
        whyCorrect: "Está dentro de la ventana terapéutica (< 4.5 horas), con TAC sin sangrado y PA < 185/110 mmHg. No tiene contraindicaciones, por lo que debe recibir trombólisis IV de inmediato.",
        pearl: "Meta de PA ANTES de trombólisis en ACV isquémico: < 185/110 mmHg (luego mantener < 180/105). No bajar agresivamente si no se tromboliza.",
        trap: "Dar aspirina o bajar demasiado la PA antes de decidir trombólisis compromete la penumbra isquémica."
      },
      {
        id: 8,
        specialty: "Urgencias",
        topic: "Toxicología · Antídotos",
        difficulty: "Nivel 2",
        vignette: "Paciente de 19 años traído por ingesta intencional de <span class='hy'>25 tabletas de acetaminofén (12.5 g) hace 3 horas</span>. Asintomático, signos vitales normales. ¿Cuál es la conducta más apropiada en urgencias?",
        options: [
          "Dar de alta con signos de alarma porque está asintomático y con signos normales",
          "Carbón activado (si < 4 h) + medir acetaminofén sérico a las 4 horas para nomograma de Rumack-Matthew",
          "Iniciar N-acetilcisteína solo si aparecen náuseas o ictericia a las 24 horas",
          "Realizar lavado gástrico con sonda de gran calibre y administrar flumazenilo"
        ],
        correct: 1,
        whyCorrect: "La intoxicación por acetaminofén es inicialmente asintomática (Fase I, 0-24 h). En ingesta < 4 horas se considera carbón activado y se toma nivel sérico a las 4 horas post-ingesta para ubicarlo en el nomograma de Rumack-Matthew e iniciar N-acetilcisteína.",
        pearl: "El nomograma de Rumack-Matthew solo es válido a partir de las 4 horas post-ingesta aguda. NAC es más efectiva si se inicia en las primeras 8 horas.",
        trap: "Confiarse porque el paciente está asintomático a las 3 horas: la necrosis hepática aparece entre las 24 y 72 horas."
      },
      {
        id: 9,
        specialty: "Medicina Interna",
        topic: "Infectología · Meningitis",
        difficulty: "Nivel 3",
        vignette: "Adulto de 35 años con fiebre, cefalea intensa, rigidez de nuca y petequias en tronco. Glasgow 13/15, sin déficit focal ni papiledema. ¿Cuál es la secuencia correcta?",
        options: [
          "TAC cerebral primero; luego punción lumbar y al tener el resultado iniciar antibióticos",
          "Hemocultivos + dexametasona IV + ceftriaxona + vancomicina de inmediato, y realizar PL",
          "Solo aciclovir IV hasta confirmar etiología bacteriana en LCR",
          "Punción lumbar inmediata sin hemocultivos y observar respuesta a antipiréticos"
        ],
        correct: 1,
        whyCorrect: "Ante sospecha de meningitis bacteriana aguda sin indicación de TAC previa (no inmunosuprimido, sin focalización, sin convulsiones recientes ni papiledema), nunca se deben retrasar los antibióticos ni la dexametasona; se toman hemocultivos y se inicia terapia empírica + dexametasona de inmediato.",
        pearl: "Dexametasona se administra ANTES o CON la primera dosis de antibiótico para reducir inflamación meníngea y secuelas neurológicas (sobre todo S. pneumoniae).",
        trap: "Esperar a tener una TAC o el citoquímico del LCR antes de dar antibióticos aumenta exponencialmente la mortalidad."
      },
      {
        id: 10,
        specialty: "Cirugía",
        topic: "Trauma · Tórax",
        difficulty: "Nivel 3",
        vignette: "Joven sufre herida por arma blanca en hemitórax derecho. Llega con <span class='hy'>disnea severa, PA 70/40 mmHg, ingurgitación yugular, desviación traqueal a la izquierda y abolición del murmullo vesicular derecho</span>. ¿Acción inmediata?",
        options: [
          "Solicitar radiografía de tórax portátil urgente para confirmar diagnóstico",
          "Descompresión torácica inmediata (toracostomía con aguja o descompresión digital) seguida de tubo a tórax",
          "Pericardiocentesis subxifoidea guiada por ecografía",
          "Intubación orotraqueal con presión positiva antes de descomprimir el tórax"
        ],
        correct: 1,
        whyCorrect: "Cuadro clínico clásico de neumotórax a tensión (choque obstructivo + ingurgitación yugular + ausencia de ruidos respiratorios + desviación traqueal contralateral). El diagnóstico es clínico y la descompresión es inmediata sin esperar radiografía.",
        pearl: "Neumotórax a tensión: NUNCA se toma radiografía. Descompresión en 4°-5° EIC línea axilar anterior/media (adultos, ATLS) o 2° EIC LMC.",
        trap: "Pedir Rx de tórax o intubar con presión positiva sin descomprimir colapsa aún más el retorno venoso."
      },
      {
        id: 11,
        specialty: "Pediatría",
        topic: "Deshidratación · Diarrea Aguda",
        difficulty: "Nivel 2",
        vignette: "Lactante de 10 meses (peso 9 kg) con diarrea acuosa abundante. Está <span class='hy'>irritable, con ojos hundidos, boca seca, bebe con avidez</span> y el pliegue cutáneo vuelve lentamente (< 2 s). Tolera vía oral. ¿Plan de hidratación?",
        options: [
          "Plan A: líquidos caseros a libre demanda y zinc",
          "Plan B: Sales de Rehidratación Oral (SRO) de baja osmolaridad ≈ 75 mL/kg en 4 horas",
          "Plan C: Bolo de lactato de Ringer 20 mL/kg IV inmediato",
          "Suspender lactancia materna y administrar loperamida"
        ],
        correct: 1,
        whyCorrect: "Presenta deshidratación leve-moderada ('algún grado de deshidratación': irritable, ojos hundidos, bebe con avidez, pliegue lento). Si tolera la vía oral, se indica Plan B con SRO de baja osmolaridad (≈ 75 mL/kg en 4 h según la OMS) más zinc. La guía OMS 2024 desaconseja antibióticos en la diarrea acuosa aguda.",
        pearl: "Plan B = deshidratación sin choque → SRO ≈ 75 mL/kg en 4 h (otras guías usan 50–100 mL/kg). Plan C = choque o intolerancia oral grave → IV rápido.",
        trap: "Pasar directamente a líquidos IV en un niño que bebe con avidez o suspender la lactancia materna."
      },
      {
        id: 12,
        specialty: "Ginecología",
        topic: "Hemorragia Obstétrica · Código Rojo",
        difficulty: "Nivel 3",
        vignette: "Puérpera inmediata tras parto vaginal prolongado presenta <span class='hy'>sangrado vaginal abundante (> 1000 mL), PA 82/50 mmHg, FC 122 lpm y útero blando por encima del ombligo</span>. ¿Causa más probable y primera medida farmacológica?",
        options: [
          "Desgarro cervical · Sutura inmediata sin uterotónicos",
          "Atonía uterina · Masaje uterino bimanual + oxitocina IV + ácido tranexámico",
          "Acretismo placentario · Histerectomía inmediata sin reanimación",
          "Coagulopatía primaria · Transfusión aislada de plaquetas"
        ],
        correct: 1,
        whyCorrect: "El útero blando/atónico sobre el ombligo es signo cardinal de atonía uterina (causa #1 de hemorragia posparto, ~70-80%). Se activa Código Rojo: masaje uterino, cristaloides tibios, oxitocina IV y ácido tranexámico (1 g IV en < 3 h).",
        pearl: "Las 4 T de la HPP: Tono (70-80%), Trauma (20%), Tejido (10%), Trombina (<1%). OMS/FIGO 2025: diagnosticar con ≥ 500 mL, o ≥ 300 mL con signos vitales anormales, y aplicar el paquete MOTIVE (masaje, oxitócico, ácido tranexámico en < 3 h, líquidos IV, revisión del tracto genital, escalar).",
        trap: "Olvidar el ácido tranexámico temprano o buscar primero coagulopatía antes de tratar el tono."
      },
      {
        id: 13,
        specialty: "Medicina Interna",
        topic: "Nefrología · Hiperkalemia",
        difficulty: "Nivel 3",
        vignette: "Paciente con ERC estadio 5 llega por debilidad muscular. <span class='hy'>K+ sérico 7.1 mEq/L</span> y ECG muestra <span class='hy'>ondas T picudas y ensanchamiento del QRS</span>. ¿Cuál es el primer fármaco a administrar?",
        options: [
          "Resina de intercambio iónico (poliestireno sulfonato) vía oral",
          "Gluconato de calcio al 10% IV para estabilizar membrana miocárdica",
          "Insulina regular 10 U + dextrosa al 50% como única medida",
          "Furosemida oral y restricción dietética de potasio"
        ],
        correct: 1,
        whyCorrect: "Ante hiperkalemia severa con cambios electrocardiográficos (ensanchamiento del QRS, T picudas), la prioridad absoluta en segundos es estabilizar el potencial de membrana cardíaco con gluconato de calcio al 10% IV (no baja el K+, pero evita la fibrilación ventricular).",
        pearl: "Orden lógico en hiperkalemia grave: 1) Estabilizar (Gluconato de Ca2+), 2) Redistribuir (Insulina+Dextrosa, Salbutamol), 3) Eliminar (Diurético/Diálisis).",
        trap: "Administrar insulina primero sin proteger el corazón cuando ya hay ensanchamiento del QRS."
      },
      {
        id: 14,
        specialty: "Urgencias",
        topic: "Anafilaxia · Vía Aérea",
        difficulty: "Nivel 2",
        vignette: "Mujer de 28 años desarrolla <span class='hy'>urticaria generalizada, estridor laríngeo, sibilancias y PA 80/50 mmHg</span> 10 minutos después de recibir penicilina IM. ¿Tratamiento de primera línea?",
        options: [
          "Difenhidramina 50 mg IV + hidrocortisona 200 mg IV",
          "Adrenalina 0.3–0.5 mg IM en cara anterolateral del muslo",
          "Adrenalina 1 mg IV en bolo rápido",
          "Salbutamol nebulizado seguido de observación"
        ],
        correct: 1,
        whyCorrect: "La adrenalina intramuscular (0.01 mg/kg, máx 0.5 mg en adultos, concentración 1:1000) en la cara anterolateral del muslo es el único tratamiento de primera línea que revierte el broncoespasmo, edema laríngeo y vasodilatación.",
        pearl: "Antihistamínicos y corticoides son adyuvantes (no salvan la vida en agudo). La vía IM en muslo es más segura y rápida que IV en bolo.",
        trap: "Dar adrenalina 1 mg IV en bolo (dosis de paro) en un paciente con pulso causa crisis hipertensiva y arritmias letales."
      },
      {
        id: 15,
        specialty: "Cirugía",
        topic: "Abdomen Agudo · Apendicitis",
        difficulty: "Nivel 2",
        vignette: "Hombre de 21 años con <span class='hy'>dolor periumbilical que migró a fosa ilíaca derecha</span> hace 14 horas, anorexia, náuseas, T° 37.9°C, Blumberg positivo y leucocitos 14.500/mm³ con neutrofilia. ¿Puntaje aproximado de Alvarado y conducta?",
        options: [
          "Alvarado bajo (≤ 3) · Alta con analgésicos",
          "Alvarado alto (≥ 7) · Apendicectomía sin necesidad obligatoria de TAC en hombre joven típico",
          "Alvarado intermedio · Colonoscopia diagnóstica",
          "Manejo exclusivo con metronidazol oral ambulatorio"
        ],
        correct: 1,
        whyCorrect: "Migración (1) + Anorexia (1) + Náuseas (1) + Dolor FID (2) + Rebote (1) + Fiebre (1) + Leucocitosis (2) + Desviación izquierda (1) = 9-10 puntos. En hombre joven con cuadro típico y Alvarado ≥ 7, la conducta es quirúrgica directa.",
        pearl: "Escala de Alvarado (MANTRELS): ≥ 7 alta probabilidad quirúrgica; 5-6 requiere imagen (ecografía o TAC).",
        trap: "Diferir la cirugía para pedir múltiples imágenes en un hombre joven con presentación clásica."
      },
      {
        id: 16,
        specialty: "Medicina Interna",
        topic: "Neumología · TEP",
        difficulty: "Nivel 3",
        vignette: "Mujer de 54 años en posoperatorio de reemplazo de cadera presenta <span class='hy'>disnea súbita, dolor pleurítico, FC 116 lpm, FR 26 rpm y SatO2 88%</span>. PA 115/75 mmHg. Probabilidad clínica por Wells: 7.5 puntos (alta). ¿Estudio diagnóstico de elección?",
        options: [
          "Solicitar Dímero D y si es negativo descartar TEP",
          "AngioTAC de tórax (protocolo TEP) e inicio empírico de anticoagulación si no hay contraindicación",
          "Espirometría forzada con broncodilatador",
          "Radiografía de tórax normal descarta el diagnóstico"
        ],
        correct: 1,
        whyCorrect: "Con probabilidad clínica alta (Wells > 6 o > 4 en modelo dicotomizado), el Dímero D NO se solicita porque un resultado negativo no descarta con seguridad suficiente; se va directo a AngioTAC pulmonar y anticoagulación.",
        pearl: "Dímero D solo sirve para DESCARTAR TEP en probabilidad baja o intermedia (alto valor predictivo negativo).",
        trap: "Pedir Dímero D en un paciente con Wells alto es un error clásico de examen que retrasa el diagnóstico."
      },
      {
        id: 17,
        specialty: "Pediatría",
        topic: "Neumología · Bronquiolitis",
        difficulty: "Nivel 2",
        vignette: "Lactante de 4 meses previamente sano con coriza hace 3 días, ahora con <span class='hy'>taquipnea, tirajes subcostales, sibilancias espiratorias difusas y SatO2 89%</span>. Sin fiebre alta ni consolidación. ¿Manejo indicado?",
        options: [
          "Oxígeno suplementario (meta SatO2 ≥ 90-92%), aspiración nasal suave e hidratación",
          "Prednisolona oral 2 mg/kg + amoxicilina-clavulanato",
          "Salbutamol horario programado + nebulización con solución hipertónica obligatoria",
          "Ribavirina intravenosa de rutina"
        ],
        correct: 0,
        whyCorrect: "Primer episodio de sibilancias en < 2 años precedido de infección viral respiratoria = Bronquiolitis (VSR #1). El manejo es estrictamente de soporte: oxígeno si SatO2 < 90-92%, hidratación y limpieza nasal.",
        pearl: "En bronquiolitis NO están indicados de rutina: corticoides, antibióticos ni broncodilatadores.",
        trap: "Tratar una bronquiolitis como si fuera una crisis asmática con corticoides y salbutamol programado."
      },
      {
        id: 18,
        specialty: "Ginecología",
        topic: "Ginecología · Embarazo Ectópico",
        difficulty: "Nivel 3",
        vignette: "Mujer de 27 años con amenorrea de 6 semanas, <span class='hy'>dolor en fosa ilíaca izquierda, sangrado vaginal escaso y PA 84/52 mmHg, FC 120 lpm</span>. β-hCG positiva, ecografía transvaginal: útero vacío y líquido libre abundante en fondo de saco de Douglas. ¿Conducta?",
        options: [
          "Metotrexato 50 mg/m² IM en dosis única",
          "Reanimación con cristaloides + laparoscopia (o laparotomía) quirúrgica urgente",
          "Repetir β-hCG en 48 horas para verificar duplicación",
          "Legrado uterino obstétrico por aborto incompleto"
        ],
        correct: 1,
        whyCorrect: "Tiene embarazo ectópico roto con inestabilidad hemodinámica y hemoperitoneo (líquido libre abundante). El metotrexato está absolutamente contraindicado en inestabilidad hemodinámica; requiere cirugía urgente.",
        pearl: "Metotrexato en ectópico SOLO si: paciente estable, sin líquido libre abundante, β-hCG < 5000 (ideal), sin embriocardia y con seguimiento garantizado.",
        trap: "Indicar metotrexato o esperar 48 h en una paciente hipotensa con hemoperitoneo."
      }
    ];

const QUESTIONS_EXTRA = [
  {
    id: 19, specialty: "Salud Pública", topic: "Epidemiología · Pruebas diagnósticas", difficulty: "Nivel 2",
    vignette: "Se evalúa una nueva prueba rápida para VIH con <span class='hy'>sensibilidad 99%</span> y <span class='hy'>especificidad 92%</span>. Un comité quiere usarla en población general. ¿Cuál es el uso más adecuado de esta prueba?",
    options: ["Como prueba confirmatoria única antes de iniciar tratamiento", "Como prueba de tamizaje, confirmando los positivos con una prueba más específica", "No sirve porque su especificidad es menor a 95%", "Solo en población de alto riesgo porque el VPP no depende de la prevalencia"],
    correct: 1,
    whyCorrect: "Una sensibilidad muy alta deja pocos falsos negativos: un resultado negativo descarta la enfermedad (SnNout). Por eso es ideal para tamizaje. Los positivos se confirman con una prueba de alta especificidad (SpPin).",
    pearl: "SnNout: Sensible + Negativo = descarta. SpPin: Específica + Positivo = confirma. Los valores predictivos SÍ cambian con la prevalencia; la sensibilidad y la especificidad no.",
    trap: "Creer que el VPP es fijo. A menor prevalencia, cae el VPP y aumentan los falsos positivos."
  },
  {
    id: 20, specialty: "Salud Pública", topic: "Epidemiología · Diseño de estudios", difficulty: "Nivel 2",
    vignette: "Investigadores identifican a 120 pacientes con <span class='hy'>carcinoma hepatocelular</span> y 240 sin la enfermedad, y revisan <span class='hy'>retrospectivamente</span> su exposición previa a aflatoxinas. ¿Qué diseño es y qué medida de asociación corresponde?",
    options: ["Cohorte prospectiva · Riesgo relativo", "Casos y controles · Odds ratio", "Transversal · Prevalencia", "Ensayo clínico · Número necesario a tratar"],
    correct: 1,
    whyCorrect: "Se parte del desenlace (con y sin enfermedad) y se busca la exposición hacia atrás: eso es un estudio de casos y controles. No permite calcular incidencia, así que la medida es el odds ratio.",
    pearl: "Cohorte: parte de la exposición → RR. Casos y controles: parte de la enfermedad → OR. Útil para enfermedades raras.",
    trap: "Calcular riesgo relativo en un estudio de casos y controles: no se puede porque el investigador fija la proporción de casos."
  },
  {
    id: 21, specialty: "Medicina Interna", topic: "Cardiología · Arritmias", difficulty: "Nivel 2",
    vignette: "Mujer de 70 años con palpitaciones de 6 horas. FC 168 lpm irregular, <span class='hy'>PA 76/48 mmHg</span>, diaforética y somnolienta. ECG: fibrilación auricular con respuesta ventricular rápida. ¿Conducta inmediata?",
    options: ["Amiodarona IV en infusión y reevaluar en 24 horas", "Cardioversión eléctrica sincronizada", "Metoprolol IV en bolos para control de frecuencia", "Anticoagular 3 semanas y luego cardiovertir"],
    correct: 1,
    whyCorrect: "Toda taquiarritmia con inestabilidad hemodinámica (hipotensión, alteración de conciencia, dolor torácico isquémico o insuficiencia cardíaca aguda) se trata con cardioversión eléctrica sincronizada inmediata, sin importar el tiempo de evolución.",
    pearl: "Inestable = electricidad. Estable = fármacos (control de frecuencia o ritmo). Anticoagular por CHA₂DS₂-VASc ≥ 2 en hombres y ≥ 3 en mujeres.",
    trap: "Dar betabloqueador IV a una paciente hipotensa: empeora el choque."
  },
  {
    id: 22, specialty: "Pediatría", topic: "Vasculitis · Kawasaki", difficulty: "Nivel 2",
    vignette: "Niño de 3 años con <span class='hy'>fiebre de 6 días</span> sin respuesta a antipiréticos, conjuntivitis bilateral sin secreción, labios rojos y fisurados, lengua en fresa, exantema polimorfo, edema de manos y adenopatía cervical de 2 cm. ¿Tratamiento indicado?",
    options: ["Amoxicilina por probable escarlatina", "Inmunoglobulina IV 2 g/kg + ácido acetilsalicílico", "Prednisolona oral y observación", "Ibuprofeno y control en 48 horas"],
    correct: 1,
    whyCorrect: "Fiebre ≥ 5 días más ≥ 4 de 5 criterios (conjuntivitis, cambios orales, exantema, cambios en extremidades, adenopatía cervical ≥ 1.5 cm) define la enfermedad de Kawasaki. La IGIV dentro de los primeros 10 días reduce los aneurismas coronarios.",
    pearl: "Kawasaki: ecocardiograma al diagnóstico. Es la principal causa de cardiopatía adquirida en niños de países desarrollados.",
    trap: "Confundirlo con escarlatina o con una infección viral y retrasar la IGIV más allá del día 10."
  },
  {
    id: 23, specialty: "Urgencias", topic: "Toxicología · Organofosforados", difficulty: "Nivel 2",
    vignette: "Agricultor de 40 años traído tras fumigar sin protección. Presenta <span class='hy'>miosis puntiforme, sialorrea, broncorrea, bradicardia</span>, diarrea y fasciculaciones. ¿Antídoto de primera línea?",
    options: ["Naloxona IV", "Atropina IV en dosis crecientes hasta secar las secreciones bronquiales", "Flumazenil IV", "N-acetilcisteína"],
    correct: 1,
    whyCorrect: "El cuadro colinérgico (muscarínico + nicotínico) es típico de los organofosforados. La atropina revierte los efectos muscarínicos; su meta es secar las secreciones bronquiales, no la midriasis. La pralidoxima es un complemento para los efectos nicotínicos.",
    pearl: "DUMBELS: Diarrea, Urination, Miosis, Bradicardia/Broncorrea, Emesis, Lagrimeo, Salivación.",
    trap: "Usar la midriasis o la FC como meta de atropinización: el objetivo es secar los pulmones."
  },
  {
    id: 24, specialty: "Cirugía", topic: "Vía biliar · Colangitis", difficulty: "Nivel 3",
    vignette: "Hombre de 66 años con fiebre de 39 °C, <span class='hy'>ictericia y dolor en hipocondrio derecho</span>. Además está confuso y con PA 82/50 mmHg. Bilirrubina 6.8 mg/dL. Ecografía: colédoco dilatado de 11 mm con litiasis. ¿Conducta?",
    options: ["Colecistectomía laparoscópica urgente", "Reanimación + antibióticos IV + drenaje biliar urgente (CPRE)", "Antibióticos orales y CPRE electiva en 6 semanas", "Colangiorresonancia antes de cualquier tratamiento"],
    correct: 1,
    whyCorrect: "Tríada de Charcot más hipotensión y alteración de conciencia es la péntada de Reynolds: colangitis grave. Requiere reanimación, antibiótico IV y descompresión biliar urgente, idealmente por CPRE.",
    pearl: "Charcot: fiebre + ictericia + dolor en HCD. Reynolds: Charcot + choque + confusión.",
    trap: "Ir directo a colecistectomía: la urgencia es drenar la vía biliar, no quitar la vesícula."
  },
  {
    id: 25, specialty: "Ginecología", topic: "Hemorragia del 3er trimestre", difficulty: "Nivel 2",
    vignette: "Gestante de 32 semanas con <span class='hy'>sangrado vaginal rojo rutilante, indoloro</span>, que empezó en reposo. Útero blando, sin contracciones, FCF 145 lpm. Signos vitales normales. ¿Qué NO debe hacerse hasta tener el diagnóstico por imagen?",
    options: ["Ecografía transabdominal", "Tacto vaginal", "Monitoreo fetal continuo", "Canalizar una vía venosa y pedir hemograma"],
    correct: 1,
    whyCorrect: "Un sangrado indoloro, rojo brillante y con útero relajado sugiere placenta previa. El tacto vaginal puede desencadenar una hemorragia masiva y está contraindicado hasta descartarla por ecografía.",
    pearl: "Placenta previa: indolora, útero blando. DPPNI: dolorosa, útero hipertónico, sufrimiento fetal, a menudo con HTA o trauma.",
    trap: "Hacer tacto vaginal de rutina ante cualquier sangrado del tercer trimestre."
  },
  {
    id: 26, specialty: "Medicina Interna", topic: "Nefrología · Hiponatremia", difficulty: "Nivel 3",
    vignette: "Mujer de 74 años con náuseas y somnolencia leve de 1 semana de evolución tras iniciar tiazida. <span class='hy'>Na⁺ 112 mEq/L</span>, sin convulsiones. Se inicia corrección. ¿Cuál es el límite de corrección en las primeras 24 h?",
    options: ["Hasta normalizar el sodio (135 mEq/L) en 24 horas", "No más de 8–10 mEq/L en 24 horas", "Al menos 20 mEq/L en 24 horas para evitar edema cerebral", "No importa la velocidad si la paciente está asintomática"],
    correct: 1,
    whyCorrect: "En la hiponatremia crónica (> 48 h), la corrección rápida causa el síndrome de desmielinización osmótica (mielinólisis pontina). El límite es de 8–10 mEq/L en 24 h; en pacientes de alto riesgo, 8 mEq/L.",
    pearl: "Síntomas graves (convulsiones, coma): bolo de NaCl 3% para subir 4–6 mEq/L rápido, sin pasar el límite diario.",
    trap: "Normalizar el sodio en un día porque la paciente se ve bien."
  }
];
const BUILTIN_Q = [...QUESTIONS_BASE, ...QUESTIONS_EXTRA];
