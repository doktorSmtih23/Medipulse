# MediPulse: estudio para la residencia según tu energía

App web instalable que funciona sin conexión. Es un solo archivo HTML, sin dependencias externas.

Mapa estructural de la app (arquitectura, pantallas, motor de estudio, fuentes, vigencia, datos y pendientes): **[MAPA.html](MAPA.html)**.

## Estructura
La app está dividida por módulos (sin frameworks ni compilación): `index.html` (pantallas), `css/app.css` (estilos), `data/` (contenido médico: casos, fuentes, fichas, tarjetas) y `js/` (un archivo por módulo). El detalle de cada archivo, las reglas y cómo integrar código hecho en otra IA están en **[../AGENTS.md](../AGENTS.md)**.

Ver la app en tu computadora: desde `medipulse/`, `npm start` y abre http://localhost:8080/ (si el puerto está ocupado, usa el siguiente libre y lo indica). No abras `index.html` con doble clic: sin servidor se ve sin estilos.

Pruebas automáticas (Playwright Test, sin API real ni internet): desde `medipulse/`, la primera vez `npm install` y `npx playwright install chromium`; después `npm test` (o `npm run test:ui` para verlas paso a paso). En VS Code, instala la extensión recomendada **Playwright Test for VSCode**: las pruebas aparecen en el panel de pruebas y se corren o depuran una por una. GitHub las corre solas en cada pull request.

Versión de un solo archivo (para visores que abren un solo HTML o para compartirla): `node tools/un-archivo.js` genera `medipulse-un-archivo.html`; con `--watch` se regenera con cada cambio.

## Cómo funciona
Al abrirla eliges cómo te sientes y la app arma la sesión:

| Modo | Duración | Qué hace |
|---|---|---|
| 🛋️ **Sin ganas** | ≤ 5 min | 10 tarjetas, un solo caso o solo leer una ficha. Cuenta para la racha y al final ofrece "otros 5 minutos". |
| 🙂 **Normal** | 25 min | 10 casos (priorizando tu tema débil) + 8 tarjetas, con temporizador. |
| 🔥 **A tope** | ~90 min | 4 bloques con descansos: repaso espaciado → tema más débil → simulacro cronometrado → cierre con tarjetas. |

- **Repaso espaciado (Leitner):** lo que fallas vuelve a los 10 min; lo que sabes, a los 1, 3, 7, 16 y 35 días.
- **Recomendación diaria:** repasos pendientes, cuidar la racha o atacar la especialidad con menos aciertos.
- **Simulacro** sin retroalimentación hasta el final (~72 s por pregunta) y con historial.
- **Progreso:** dominio por especialidad, mapa de calor de 5 semanas y exportar/importar respaldo JSON.
- Funciona sin internet (service worker) y se puede instalar en el celular ("Agregar a pantalla de inicio").

- **Laboratorio MBE:** cómo leer una guía, un ECA, un metaanálisis, un observacional o una revisión (método en 5 pasos, trampa, ejemplo real), «Resume lo que leíste» (de ahí sale una ficha high-yield), y calculadoras de NNT y de prueba diagnóstica 2×2.
- **Enfoque y diagnóstico:** el estudiante elige qué tipo de pregunta reforzar (conducta clínica, diagnóstico, lectura crítica y MBE, datos duros o mixto). No depende de un examen en particular, porque los exámenes cambian sin aviso. El enfoque ordena las sesiones, orienta a la IA y propone práctica en **¿Qué estudiar hoy?**. Además, diagnóstico rápido de 5 preguntas, una por área.
- **Privacidad del texto que se envía a la IA:** antes de enviar un documento se quitan los encabezados, los pies de página y las marcas de agua que se repiten (por ejemplo "Descargado para <nombre> (<correo>)"), así no salen datos personales ni ruido.
- **Analizar un documento** (en el detalle de cada PDF o desde MBE → Auditar un PDF): ver la página original, mapa por capítulos (por los títulos del documento o con IA) y tres análisis con IA que citan su página: **auditoría MBE** (veredicto, algoritmo, qué hacer y qué no, umbrales, qué cambió), **revisión de tema** (fisiopatología, cuadro típico y banderas rojas, algoritmo, diferenciales, perlas) y **pase de revista** (resumen de 60 s, conductas y preguntas del profesor). El resultado se puede convertir en ficha HY o en preguntas, siempre con revisión. Si la IA falla, se muestra el error: nunca un resultado de relleno.
- **Banco y simulacro:** filtros de fallos y sin responder, pistas, tachar opciones, marcar para revisar y mapa del simulacro.
- **Reportes:** 🚩 en cada pregunta o tarjeta; se revisan en Fuentes → Reportes (corregir con IA o archivar).
- **Crear y compartir:** preguntas y tarjetas a mano, fuentes de texto pegado y packs de estudio en JSON para compartir con colegas.
- **Beta con invitación:** inicio de sesión con el correo (enlace o código de 6 dígitos), solo para invitados; los datos de estudio siguen en el dispositivo. Cómo configurar el servidor: [SERVIDOR.md](SERVIDOR.md).
- **📓 Mis apuntes:** libretas por semana o rotación con entradas por día; atajos al escribir, dictado del teclado, datos marcados «por verificar» y cada punto convertido en ficha o preguntas. La app no lee escritura a mano: los apuntes se escriben aquí o se pega el texto.
- **Biblioteca de fuentes:** cada caso, tarjeta y ficha incluida cita su guía o libro de referencia (con enlace de búsqueda en PubMed). Puedes estudiar por fuente.
- **Tus PDF → preguntas:** sube un PDF (guía, resumen, apuntes), elige un rango de páginas y genera:
  - **Tarjetas de completar** (sin internet y gratis): toma las frases con datos clave (dosis, umbrales, fármaco de elección, definiciones) y oculta el dato.
  - **Casos clínicos + tarjetas con IA** (opcional): usa la API de Claude con la clave de API del propio usuario. Solo usa información del PDF e indica la página de origen.
  - Todo pasa por una pantalla de revisión antes de entrar al banco, y cada ítem queda enlazado al PDF y a su página.

- **Vigencia de las fuentes** (Fuentes → Vigencia):
  - Con clave de API, Claude busca en la web si hay una versión más nueva de cada fuente (incluidas y PDFs propios) y resume qué cambió. Sin clave: enlace de búsqueda y marcado manual (vigente / desactualizada).
  - **Actualizar ítems afectados:** Claude compara cada pregunta con la versión nueva, verifica en la web y propone corregir, archivar o mantener. Tú eliges qué aplicar; lo corregido vuelve al repaso como nuevo.
  - **PDF propio:** "Subir versión nueva" reemplaza el PDF; las preguntas viejas quedan marcadas y se pueden revisar con IA contra el texto nuevo, mantener o archivar.
  - En el estudio, cada ítem avisa si su fuente tiene una versión más nueva.

Los datos se guardan solo en el dispositivo: el progreso en `localStorage` y los PDF en IndexedDB. El respaldo exportado no incluye los PDF ni la clave de API.

## Clave de API (opcional)
Las funciones con IA usan la clave de API de Claude del propio usuario. Guía paso a paso para obtenerla, costos, seguridad y solución de problemas: **[GUIA_CLAVE_API.md](GUIA_CLAVE_API.md)** (también dentro de la app: Fuentes → Generación con IA → 📖 Guía paso a paso).

## Archivos de terceros (`vendor/`)
- `pdf.min.js`, `pdf.worker.min.js`: pdf.js 3.11.174 (Mozilla, licencia Apache 2.0).
- `anthropic-sdk.mjs`: SDK oficial `@anthropic-ai/sdk` 1.2.0 (licencia MIT), empaquetado con esbuild para el navegador.

Se incluyen en el repo para que la app no dependa de ningún CDN y funcione sin conexión.

## Agregar contenido
El contenido incluido (starter pack gratuito) está en `data/contenido/`, **un archivo por especialidad** con sus casos, fichas HY y tarjetas. Las referencias están en `data/fuentes.js`. El formato y las reglas (ids que nunca cambian, fuente obligatoria, revisión médica) están en [AGENTS.md → Contenido médico](../AGENTS.md#contenido-médico). `npm test` valida el contenido antes de publicarlo.

Si cambias archivos, sube la versión de `CACHE` en `sw.js` para que los celulares descarguen la nueva versión.
