// Crea articulo-prueba.pdf: un artículo inventado de 4 páginas para las pruebas (sin derechos de autor).
// Cada página lleva un encabezado de revista y un pie "Descargado para…" con un correo, para comprobar
// que esos datos no se envían a la IA. Uso: npm run pdf-prueba
const path = require("path");
const { chromium } = require("@playwright/test");
const html = `<html><head><style>
  body{font:12px serif}
  .pg{page-break-after:always}
</style></head><body>
<div class="pg">
<h1>Gene therapy for Parkinson's disease: trials and technical advances</h1>
<p>John A. Smith, Maria L. Perez, Wei Chen</p>
<h2>Abstract</h2>
<p>Parkinson's disease is a progressive neurodegenerative disorder characterized by the loss of dopaminergic neurons in the substantia nigra. Gene therapy aims to restore dopamine synthesis, modulate basal ganglia circuits or provide neurotrophic support.</p>
<h2>Introduction</h2>
<p>Motor symptoms appear when approximately 60% of nigral dopaminergic neurons have been lost [1,2]. Levodopa remains the gold standard of symptomatic therapy, but long-term use leads to motor fluctuations and dyskinesias in up to 50% of patients after 5 years [3].</p>
</div>
<div class="pg">
<h2>Vector platforms</h2>
<p>AAV2 is the serotype used in most clinical trials in Parkinson's disease. Lentiviral vectors can carry larger transgenes, such as the three enzymes of the dopamine synthesis pathway delivered by ProSavin.</p>
<h2>Clinical trials</h2>
<p>In the phase II randomized, sham-controlled trial of AAV2-GAD, bilateral subthalamic delivery improved the UPDRS motor score by 23.1% compared with 12.7% in the sham group at 6 months. The CERE-120 (AAV2-neurturin) phase II trial did not meet its primary endpoint at 12 months.</p>
</div>
<div class="pg">
<h2>Safety</h2>
<p>Serious adverse events were mostly related to the neurosurgical procedure, including intracranial hemorrhage. No vector-related serious adverse events were reported in the AAV2-GAD trial.</p>
</div>
<div>
<h2>References</h2>
<p>1. Fearnley JM, Lees AJ. Ageing and Parkinson's disease. Brain 1991;114:2283-301.</p>
<p>2. LeWitt PA, et al. AAV2-GAD gene therapy for advanced Parkinson's disease. Lancet Neurol 2011;10:309-19.</p>
</div>
</body></html>`;
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  await p.setContent(html);
  const t = s => `<div style="font:10px Arial,sans-serif;width:100%;padding:0 20mm;color:#555">${s}</div>`;
  await p.pdf({path: path.join(__dirname, "articulo-prueba.pdf"), format: "A4", displayHeaderFooter: true, margin: {top: "28mm", bottom: "24mm", left: "20mm", right: "20mm"},
    headerTemplate: t(`Revista de Prueba · Vol 1 · 2026 · pág. <span class="pageNumber"></span>`),
    footerTemplate: t(`Descargado para Dra. Prueba Ejemplo (prueba@correo.com) el 1 de enero de 2026. Solo para uso personal.`)});
  await b.close(); console.log("articulo-prueba.pdf listo");
})();
