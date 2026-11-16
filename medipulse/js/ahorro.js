// ===================================================================
// GUÍA «GASTA MENOS CON LA IA»: cómo cobra la IA (cada botón es una llamada que vuelve a leer el texto
// enviado) y 7 reglas para obtener lo mismo por menos. Los ejemplos de costo se calculan con el nivel
// de IA elegido (ia-costo.js).
// ===================================================================
function renderAhorro(){
  const box = $("#ahorroBox"); if (!box) return;
  const L = AI_LEVELS[aiLevel()], gen = {outTokens: 5 * 700 + 3 * 400 + 4000};
  const ej = [["Un tema de 3 páginas", 9000], ["Un artículo de 15 páginas", 80000], ["Una guía de 40 páginas", 150000]];
  const fila = (t, c) => `<tr><td>${t}</td><td><b>≈ ${usd(aiEstimate(c, gen))}</b></td></tr>`;
  const regla = (n, t, d) => `<div class="regla"><span class="pnum">${n}</span><div><b>${t}</b><div class="small muted" style="margin-top:2px">${d}</div></div></div>`;
  box.innerHTML = `
    <div class="card stack">
      <h3 style="font-size:16px">Cómo se cobra</h3>
      <p class="small" style="margin:0">Cada botón con IA es <b>una llamada</b>, y en cada llamada la IA <b>vuelve a leer el texto que le envías</b>: no recuerda la anterior. Pagas por <b>lo que lee</b> (tu documento) y por <b>lo que escribe</b> (preguntas, fichas, análisis). Cada palabra que escribe cuesta unas 5 veces más que una que lee: en un documento largo pesa lo que lee; en un tema corto, lo que pides que escriba.</p>
      <p class="xs muted" style="margin:0">Ejemplo con tu nivel actual (<b>${esc(L.name)}</b>): generar 5 casos y 3 fichas de…</p>
      <table class="tabla small">${ej.map(([t, c]) => fila(t, c)).join("")}</table>
      <p class="xs muted" style="margin:0">Valores aproximados. Antes de cada acción ves su costo estimado, y después, el real.</p>
    </div>
    <div class="card stack">
      <h3 style="font-size:16px">7 reglas para gastar menos</h3>
      ${regla(1, "Elige un tema del índice antes de usar la IA", "Se envían solo esas páginas, no el documento entero. En documentos largos es lo que más ahorra (mira la tabla), y el resultado sale más enfocado.")}
      ${regla(2, "Pide lo que vas a usar, y todo junto", "Cada caso que la IA escribe se paga: pide la cantidad que de verdad vas a estudiar. Y pídelos juntos en «⚙️ Personalizar»: cinco generaciones de 2 casos leen el documento cinco veces.")}
      ${regla(3, "Haz las acciones seguidas, en menos de 5 minutos", "El documento queda guardado unos minutos en la memoria de la IA y la segunda lectura cuesta unas 10 veces menos. Sirve al repetir la misma acción sobre el mismo texto y entre Auditoría MBE, Revisión del tema y Pase de revista.")}
      ${regla(4, "Corrige a mano en vez de volver a generar", "Si a una pregunta le falta algo, edítala (✏️) al revisar o después. Regenerar vuelve a leer todo el documento.")}
      ${regla(5, "Usa el nivel según la tarea", "Equilibrado sirve para el día a día y cuesta la mitad que Calidad máxima. Calidad máxima, para documentos difíciles o cuando la calidad no te convence. Económico cuesta unas 40 veces menos, pero se equivoca más: revisa con más cuidado.")}
      ${regla(6, "Lo que no lee el documento cuesta centavos", "«🤖 Hazla más difícil», «Revisar mi versión» y «Revisar mi ficha» solo envían la pregunta o la ficha, no el PDF.")}
      ${regla(7, "Aprovecha lo gratis", "Estudiar, repasar, el banco, tus vulnerabilidades, «📖 Leer y crear», las Recomendaciones sin IA y editar a mano no usan la API. Y si ya pagas Gemini, ChatGPT o Claude, «📥 Pegar de otra IA» te deja traer preguntas hechas allá sin gastar de tu clave.")}
    </div>
    <div class="card stack">
      <h3 style="font-size:16px">Ten el gasto bajo control</h3>
      <ul class="small" style="margin:0;padding-left:18px">
        <li>Gastado este mes en este dispositivo: <b>≈ ${usd(aiSpendMonth())}</b>. El valor exacto está en tu cuenta de Anthropic.</li>
        <li>En tu cuenta de Anthropic (console.anthropic.com) puedes <b>fijar un límite de gasto mensual</b>: al llegar a él, la IA deja de responder hasta el mes siguiente.</li>
        <li>Recarga poco saldo al principio, por ejemplo US$5, y mira cuánto te dura.</li>
        <li>Los PDF escaneados (fotos de páginas) no tienen texto: la IA no puede leerlos y gastarías en vano. Si la app avisa «casi no tiene texto», busca la versión digital.</li>
      </ul>
    </div>`;
}
