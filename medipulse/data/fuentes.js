// Fuentes del contenido incluido
// Fuentes del contenido incluido. Vigencia revisada en noviembre de 2026.
// v: nota de vigencia que se muestra en la biblioteca (vacía = versión más reciente publicada).
const SOURCES_CHECKED = "noviembre de 2026";
const SOURCES = [
  {id:"acc_acs",  t:"2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes", r:"Circulation / JACC, 2025", y:2025, k:"guideline"},
  {id:"ssc26",    t:"Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026", r:"Critical Care Medicine, 2026", y:2026, k:"guideline"},
  {id:"ada_cri",  t:"Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (ADA/EASD/JBDS/AACE/DTS)", r:"Diabetes Care, 2024", y:2024, k:"guideline"},
  {id:"ada_soc",  t:"ADA Standards of Care in Diabetes—2026", r:"Diabetes Care, 2026", y:2026, k:"guideline"},
  {id:"acog_htn", t:"ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia", r:"Obstetrics & Gynecology, 2020", y:2020, k:"guideline", v:"Sigue vigente (reafirmado); complementado por la actualización de ACOG 2024 sobre biomarcadores"},
  {id:"cps_croup",t:"Acute management of croup in the emergency department (Canadian Paediatric Society, practice point)", r:"CPS, 2017 · actualizado en 2026", y:2026, k:"guideline"},
  {id:"tg18",     t:"Tokyo Guidelines 2018 (TG18): colecistitis y colangitis agudas", r:"J Hepatobiliary Pancreat Sci, 2018", y:2018, k:"guideline", v:"Es la edición más reciente de las guías de Tokio"},
  {id:"aha_acv",  t:"2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA)", r:"Stroke, 2026", y:2026, k:"guideline"},
  {id:"apap",     t:"Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement (Dart RC et al.)", r:"JAMA Network Open, 2023", y:2023, k:"guideline"},
  {id:"who_men",  t:"WHO guidelines on meningitis diagnosis, treatment and care", r:"OMS, 2025", y:2025, k:"guideline"},
  {id:"atls11",   t:"ATLS: Advanced Trauma Life Support, 11ª edición", r:"American College of Surgeons, 2025", y:2025, k:"book"},
  {id:"who_dia",  t:"Guideline on management of pneumonia and diarrhoea in children up to 10 years of age (y manual OMS de planes A/B/C de hidratación)", r:"OMS, 2024", y:2024, k:"guideline"},
  {id:"who_hpp",  t:"WHO/FIGO/ICM consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage", r:"OMS, 2025", y:2025, k:"guideline"},
  {id:"ukka_k",   t:"UKKA Clinical Practice Guideline: Management of Hyperkalaemia in Adults", r:"UK Kidney Association, 2023 · actualizada en julio de 2026", y:2026, k:"guideline"},
  {id:"ga2len",   t:"Anaphylaxis definition, overview, and clinical support tool: 2024 consensus report (GA²LEN)", r:"Journal of Allergy and Clinical Immunology, 2025", y:2025, k:"guideline"},
  {id:"wses_app", t:"2025 WSES Jerusalem Guidelines on acute appendicitis (Podda M et al.)", r:"JAMA Surgery, 2026", y:2026, k:"guideline"},
  {id:"aha_tep",  t:"2026 AHA/ACC Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults", r:"Circulation, 2026", y:2026, k:"guideline"},
  {id:"aap_bq",   t:"AAP Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis", r:"Pediatrics, 2014", y:2014, k:"guideline", v:"Antigua, pero la AAP no ha publicado una versión más nueva"},
  {id:"acog_ect", t:"ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy", r:"Obstetrics & Gynecology, 2018 · reafirmado en 2025", y:2025, k:"guideline"},
  {id:"gordis",   t:"Gordis Epidemiología, 7ª edición (Celentano DD, Szklo M, Farag Y)", r:"Elsevier, 2025", y:2025, k:"book"},
  {id:"acc_fa",   t:"2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation", r:"Circulation, 2023", y:2023, k:"guideline", v:"Guía estadounidense vigente"},
  {id:"esc_fa",   t:"Guías ESC 2024 para el manejo de la fibrilación auricular (ESC/EACTS)", r:"European Heart Journal, 2024", y:2024, k:"guideline"},
  {id:"aha_kaw",  t:"Update on Diagnosis and Management of Kawasaki Disease: A Scientific Statement From the AHA", r:"Circulation, 2024", y:2024, k:"guideline"},
  {id:"rcog_pp",  t:"RCOG Green-top Guideline No. 27a: Placenta Praevia and Placenta Accreta", r:"BJOG, 2018", y:2018, k:"guideline", v:"Sigue siendo la versión vigente del RCOG"},
  {id:"eu_hna",   t:"Clinical practice guideline on diagnosis and treatment of hyponatraemia (ESE/ESICM/ERA-EDTA)", r:"European Journal of Endocrinology, 2014", y:2014, k:"guideline", v:"Antigua, pero sigue siendo la guía europea de referencia"},
  {id:"aha_rcp",  t:"2025 AHA Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care", r:"Circulation, 2025", y:2025, k:"guideline"},
  {id:"goldf",    t:"Goldfrank's Toxicologic Emergencies, 12ª edición", r:"McGraw-Hill", y:2024, k:"book"},
  {id:"nice_nm",  t:"NICE guideline NG250: Pneumonia: diagnosis and management", r:"NICE, 2025", y:2025, k:"guideline"},
  {id:"aap_fs",   t:"AAP Clinical Practice Guideline: Febrile Seizures", r:"Pediatrics, 2011", y:2011, k:"guideline", v:"Antigua, pero la AAP no ha publicado una versión más nueva"},
  {id:"aap_oma",  t:"AAP Clinical Practice Guideline: The Diagnosis and Management of Acute Otitis Media", r:"Pediatrics, 2013", y:2013, k:"guideline", v:"Antigua, pero la AAP no ha publicado una versión más nueva"},
  {id:"aap_bili", t:"AAP Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn ≥ 35 Weeks", r:"Pediatrics, 2022", y:2022, k:"guideline"},
  {id:"acog_cort",t:"ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy for Fetal Maturation", r:"Obstetrics & Gynecology, 2017 · con actualización focalizada", y:2017, k:"guideline", v:"Sigue vigente con actualizaciones focalizadas"},
  {id:"williams", t:"Williams Obstetricia, 27ª edición", r:"McGraw-Hill", y:2025, k:"book"}
];
const SRC_BY_ID = Object.fromEntries(SOURCES.map(s=>[s.id,s]));
