# MediPulse: estudio para la residencia según tu energía

App web instalable que funciona sin conexión. Es un solo archivo HTML, sin dependencias externas.

Mapa estructural de la app (arquitectura, pantallas, motor de estudio, fuentes, vigencia, datos y pendientes): **[MAPA.html](MAPA.html)**.

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

- **Laboratorio MBE:** cómo leer una guía, un ECA, un metaanálisis, un observacional o una revisión (método en 5 pasos, trampa, ejemplo real), destilador de lectura que crea tarjetas, y calculadoras de NNT y de prueba diagnóstica 2×2.
- **Meta y diagnóstico:** examen objetivo del estudiante (también orienta a la IA) y diagnóstico rápido de 5 preguntas, una por área.
- **Banco y simulacro:** filtros de fallos y sin responder, pistas, tachar opciones, marcar para revisar y mapa del simulacro.
- **Reportes:** 🚩 en cada pregunta o tarjeta; se revisan en Fuentes → Reportes (corregir con IA o archivar).
- **Crear y compartir:** preguntas y tarjetas a mano, fuentes de texto pegado y packs de estudio en JSON para compartir con colegas.
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
En `index.html`:
- `QUESTIONS_BASE` / `QUESTIONS_EXTRA`: casos clínicos (`specialty`, `topic`, `vignette`, `options`, `correct`, `whyCorrect`, `pearl`, `trap`).
- `FLASH`: tarjetas `[especialidad, frente, reverso]`.
- `HY_CARDS`: fichas con umbrales, bandera roja y trampa.
- `SOURCES` + `Q_SRC` / `F_SRC` / `HY_SRC`: referencias y a qué ítem corresponde cada una.

Si cambias archivos, sube la versión de `CACHE` en `sw.js` para que los celulares descarguen la nueva versión.
