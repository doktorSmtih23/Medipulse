// Cirugía: contenido incluido en la app · paquete "starter" (versión gratuita, una de las 4 básicas).
// Cómo agregar o corregir contenido: AGENTS.md → "Contenido médico".
// Los "id" nunca se cambian ni se reutilizan: el progreso de cada usuario se guarda con ellos.
// Los nuevos usan el prefijo de la especialidad: cir-c01 (casos), cir-f01 (fichas), cir-t01 (tarjetas).
MP_CONTENIDO.agregar({
  "especialidad": "Cirugía",
  "prefijo": "cir",
  "paquete": "starter",
  "actualizado": "2026-11-15",
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
        "Antibioticoterapia IV + colecistectomía laparoscópica temprana (< 72 h)",
        "Colangiorresonancia obligatoria para descartar colangitis aguda"
      ],
      "correct": 2,
      "whyCorrect": "Cumple criterios de Tokio para colecistitis aguda (Murphy +, fiebre/leucocitosis, engrosamiento parietal y líquido pericolecístico) sin signos de colangitis ni coledocolitiasis (bilirrubinas/FA normales). El tratamiento definitivo es colecistectomía laparoscópica temprana.",
      "pearl": "Colecistitis aguda no complicada → Colecistectomía laparoscópica temprana (primeras 72 h) reduce estancia y complicaciones.",
      "trap": "Pedir CPRE sin dilatación de vía biliar ni colestasis expone innecesariamente a pancreatitis post-CPRE."
    },
    {
      "id": 10,
      "topic": "Trauma · Tórax",
      "difficulty": "Nivel 3",
      "src": "atls11",
      "vignette": "Joven sufre herida por arma blanca en hemitórax derecho. Llega con <span class='hy'>disnea severa, PA 70/40 mmHg, ingurgitación yugular, desviación traqueal a la izquierda y abolición del murmullo vesicular derecho</span>. ¿Acción inmediata?",
      "options": [
        "Descompresión torácica inmediata (toracostomía con aguja o descompresión digital) seguida de tubo a tórax",
        "Solicitar radiografía de tórax portátil urgente para confirmar diagnóstico",
        "Pericardiocentesis subxifoidea guiada por ecografía",
        "Intubación orotraqueal con presión positiva antes de descomprimir el tórax"
      ],
      "correct": 0,
      "whyCorrect": "Cuadro clínico clásico de neumotórax a tensión (choque obstructivo + ingurgitación yugular + ausencia de ruidos respiratorios + desviación traqueal contralateral). El diagnóstico es clínico y la descompresión es inmediata sin esperar radiografía.",
      "pearl": "Neumotórax a tensión: NUNCA se toma radiografía. Descompresión en 4°-5° EIC línea axilar anterior/media (adultos, ATLS) o 2° EIC LMC.",
      "trap": "Pedir Rx de tórax o intubar con presión positiva sin descomprimir colapsa aún más el retorno venoso."
    },
    {
      "id": 15,
      "topic": "Abdomen Agudo · Apendicitis",
      "difficulty": "Nivel 2",
      "src": "wses_app",
      "vignette": "Hombre de 21 años con <span class='hy'>dolor periumbilical que migró a fosa ilíaca derecha</span> hace 14 horas, anorexia, náuseas, T° 37.9°C, Blumberg positivo y leucocitos 14.500/mm³ con neutrofilia. ¿Puntaje aproximado de Alvarado y conducta?",
      "options": [
        "Alvarado bajo (≤ 3) · Alta con analgésicos",
        "Alvarado intermedio · Colonoscopia diagnóstica",
        "Manejo exclusivo con metronidazol oral ambulatorio",
        "Alvarado alto (≥ 7) · Apendicectomía sin necesidad obligatoria de TAC en hombre joven típico"
      ],
      "correct": 3,
      "whyCorrect": "Migración (1) + Anorexia (1) + Náuseas (1) + Dolor FID (2) + Rebote (1) + Fiebre (1) + Leucocitosis (2) + Desviación izquierda (1) = 9-10 puntos. En hombre joven con cuadro típico y Alvarado ≥ 7, la conducta es quirúrgica directa.",
      "pearl": "Escala de Alvarado (MANTRELS): ≥ 7 alta probabilidad quirúrgica; 5-6 requiere imagen (ecografía o TAC).",
      "trap": "Diferir la cirugía para pedir múltiples imágenes en un hombre joven con presentación clásica."
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
      "whyCorrect": "Tríada de Charcot más hipotensión y alteración de conciencia es la péntada de Reynolds: colangitis grave. Requiere reanimación, antibiótico IV y descompresión biliar urgente, idealmente por CPRE.",
      "pearl": "Charcot: fiebre + ictericia + dolor en HCD. Reynolds: Charcot + choque + confusión.",
      "trap": "Ir directo a colecistectomía: la urgencia es drenar la vía biliar, no quitar la vesícula."
    }
  ],
  "fichas": [
    {
      "id": "hy6",
      "title": "Neumotórax a Tensión",
      "badge": "ATLS Trauma",
      "src": "atls11",
      "accent": "#f43f5e",
      "thresholds": [
        {
          "label": "Diagnóstico",
          "val": "100% Clínico"
        },
        {
          "label": "Tríada",
          "val": "Choque + IY + MV abolido"
        },
        {
          "label": "Acción",
          "val": "Descompresión ya"
        }
      ],
      "redFlag": "Hipotensión + ingurgitación yugular + desviación traqueal contralateral.",
      "trap": "Solicitar radiografía de tórax para confirmar: el paciente muere en la sala de rayos X."
    }
  ],
  "tarjetas": [
    {
      "id": 22,
      "src": "atls11",
      "front": "Glasgow que indica asegurar la vía aérea",
      "back": "≤ 8"
    },
    {
      "id": 23,
      "src": "atls11",
      "front": "Regla de los 9 (adulto): tronco anterior",
      "back": "18 %"
    },
    {
      "id": 24,
      "src": "atls11",
      "front": "Fórmula de Parkland",
      "back": "4 mL × kg × % SCQ (2° y 3°): la mitad en las primeras 8 h"
    },
    {
      "id": 25,
      "src": "tg18",
      "front": "Tríada de Charcot",
      "back": "Fiebre + ictericia + dolor en HCD → colangitis"
    },
    {
      "id": 26,
      "src": "tg18",
      "front": "Péntada de Reynolds",
      "back": "Charcot + hipotensión + alteración de conciencia"
    },
    {
      "id": 27,
      "src": "wses_app",
      "front": "Signo de Rovsing",
      "back": "Dolor en FID al presionar la FII (apendicitis)"
    },
    {
      "id": 28,
      "src": "wses_app",
      "front": "Alvarado que sugiere cirugía",
      "back": "≥ 7 puntos"
    },
    {
      "id": 50,
      "src": "atls11",
      "front": "ATLS 11ª ed.: secuencia de la evaluación primaria",
      "back": "xABCDE: la “x” es controlar primero la hemorragia exanguinante"
    },
    {
      "id": 52,
      "src": "wses_app",
      "front": "Antibiótico tras apendicectomía por apendicitis complicada con buen control del foco (WSES 2025)",
      "back": "2–3 días"
    }
  ]
});
