# Instrucciones para agentes de IA (Claude, Gemini y otros)

Este repositorio contiene **MediPulse** (`medipulse/`), una app web de estudio para el examen de residencia médica, publicada en GitHub Pages. Este archivo es la referencia común para cualquier IA o persona que cambie el código: léelo completo antes de hacer cambios.

> La raíz del repo también tiene una app Flutter antigua (`lib/`, `build/web/`, etc.). No se toca salvo que se pida explícitamente.

## Principios

1. **Una sola fuente de verdad:** este repositorio. Nada de versiones paralelas de la app completa: los cambios son incrementales, sobre los archivos existentes, y entran por pull request a `main`.
2. **Un cambio, un módulo** cuando se pueda. Cada PR dice qué módulo toca y por qué.
3. **Sin frameworks ni paso de compilación.** HTML, CSS y JavaScript planos, cargados con `<script src>` clásicos.
4. **Funciona sin internet.** Nada de CDNs nuevos: las librerías van en `medipulse/vendor/`. Las únicas funciones que necesitan red son las de IA.
5. **Los datos del usuario se quedan en su dispositivo** (`localStorage` e IndexedDB). No se envían a ningún servidor propio ni de terceros, salvo el texto que el usuario manda a la API de Claude al usar la IA.
6. **Contenido médico verificable:** cada caso, tarjeta y ficha cita su fuente (`src`); no se inventan cifras; se usa la versión vigente de las guías.

## Estructura de `medipulse/`

Los scripts se cargan **en este orden** (ver el final de `index.html`). Comparten variables globales: lo que declara un archivo lo usan los siguientes. **Si agregas un archivo, respeta el orden y añádelo también a `FILES` en `sw.js`.**

| Archivo | Qué contiene |
|---|---|
| `index.html` | Solo la estructura de las pantallas (vistas `v-*`) y la barra inferior |
| `css/app.css` | Todos los estilos. Colores como variables (`--bg`, `--accent`…) con tema claro y oscuro |
| `data/especialidades.js` | `SPECS` y `SPEC_COLOR` |
| `data/preguntas.js` | Casos clínicos incluidos (`QUESTIONS_BASE`, `QUESTIONS_EXTRA`) |
| `data/fuentes.js` | Referencias (`SOURCES`), vigencia y a qué caso corresponde cada una |
| `data/fichas-hy.js` | Fichas high-yield incluidas (`HY_CARDS`) y sus fuentes |
| `data/tarjetas.js` | Tarjetas rápidas incluidas (`BUILTIN_F`) y sus fuentes |
| `js/estado.js` | Estado `S` (localStorage, clave `medipulse_v2`), repaso espaciado (`grade`, cajas Leitner), selección de ítems |
| `js/ui.js` | Utilidades de interfaz (`$`, `esc`, `toast`, navegación `go`) |
| `js/hoy.js` | Pantalla Hoy, modos por energía |
| `js/sesion.js` | Motor de sesión: casos, tarjetas, simulacro, resumen, atajos |
| `js/banco.js` | Banco de casos y filtros |
| `js/fichas-hy.js` | Fichas high-yield: estudio, editor y pestaña High Yield |
| `js/simulacro.js` | Configuración del simulacro |
| `js/progreso.js` | Progreso, respaldo y borrado |
| `js/fuentes.js` | Biblioteca, PDFs (IndexedDB, pdf.js), clave de API y guía |
| `js/taller.js` | Detalle de una fuente: taller de preguntas (lector, datos clave, IA), revisión y guardado |
| `js/vigencia.js` | Llamadas a la API de Claude (`callForTool`, `apiErr`), revisión de vigencia y actualización de ítems |
| `js/perfil.js` | Meta de examen y diagnóstico rápido |
| `js/reportes.js` | Reportes de errores en preguntas |
| `js/mbe.js` | Laboratorio de lectura crítica, destilador y calculadoras |
| `js/crear-y-compartir.js` | Crear preguntas y fichas a mano, texto pegado y packs JSON |
| `js/inicio.js` | Arranque (va siempre al final) |
| `vendor/` | pdf.js 3.11.174 y `@anthropic-ai/sdk` 1.2.0 (no editar a mano) |
| `sw.js` | Caché sin conexión |
| `tests/smoke.js` | Prueba automática de los flujos principales |

## Reglas de código

- **Seguridad:** todo texto que venga del usuario, de un PDF, de un pack o de la IA se escapa con `esc()` antes de ponerlo en `innerHTML`. Prohibido `eval`, `new Function` o insertar HTML recibido sin limpiar (ver `sanitizeVig`).
- **Nunca** escribir claves de API ni secretos en el código. La clave la guarda cada usuario en su navegador (`medipulse_api_key`).
- **Compatibilidad de datos:** no cambies la clave de `localStorage` ni el significado de campos existentes de `S`; si agregas campos, ponles valor por defecto en `BLANK()`, y añádelos al respaldo y al borrado de progreso si corresponde.
- **IA:** modelo `claude-opus-5-5`, con `fallbacks: "default"`. Las respuestas se piden con esquema JSON (`output_config.format`) o con herramienta `strict`. Todo lo que genera la IA pasa por una revisión del usuario antes de guardarse y queda marcado como generado con IA.
- **Interfaz:** primero celular (sin desplazamiento horizontal a 360 px), colores solo con variables de `app.css`, textos en español neutro y con verbos que dicen qué pasa.
- **Caché:** cada cambio sube la versión de `CACHE` en `sw.js` (`medipulse-vN`).

## Contenido médico

- Formato de un caso: `specialty`, `topic`, `vignette` (puede marcar datos clave con `<span class='hy'>…</span>`), `options` (4), `correct` (0–3), `whyCorrect`, `pearl`, `trap`, y su fuente en `Q_SRC`.
- Formato de una ficha HY: `title`, `badge`, `specialty`, `thresholds` (`[{label, val}]`), `redFlag`, `trap`, `src`.
- Toda fuente nueva va en `SOURCES` con título, revista u organización y año reales. Si una guía tiene versión más nueva, se usa la nueva.
- Cifras, dosis y umbrales se verifican contra la fuente antes de entrar al repo.

## Cómo integrar código hecho en otra IA (por ejemplo, Gemini)

1. **Traer el código a una rama** nueva desde `main`, nunca directo a `main`.
2. **Identificar qué módulo cambia** y llevar el código a ese archivo. No se reemplaza la app completa ni se duplican funciones existentes.
3. **Revisar con esta lista:**
   - [ ] Sin CDNs ni servicios externos nuevos; sin claves ni secretos.
   - [ ] Texto externo escapado con `esc()`; sin `eval` ni HTML sin limpiar.
   - [ ] Usa el estado `S` existente sin romper datos guardados.
   - [ ] Contenido médico con fuente vigente y cifras verificadas.
   - [ ] Funciona sin internet (salvo IA) y en tema claro y oscuro.
   - [ ] Sin desplazamiento horizontal a 360 px.
   - [ ] No duplica algo que la app ya hace; si lo mejora, reemplaza la versión anterior.
4. **Probar:** `node tests/smoke.js` (desde `medipulse/`) y probar a mano el flujo cambiado.
5. **Subir `CACHE` en `sw.js`**, actualizar `README.md` y `MAPA.html` si cambia lo que ve el usuario, y abrir el PR explicando qué se tomó, qué se adaptó y qué se descartó.
