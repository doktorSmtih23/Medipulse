# Instrucciones para agentes de IA (Claude, Gemini y otros)

Este repositorio contiene **MediPulse** (`medipulse/`), una app web de estudio para el examen de residencia médica, publicada en GitHub Pages. Este archivo es la referencia común para cualquier IA o persona que cambie el código: léelo completo antes de hacer cambios.

> La raíz del repo solo redirige a `medipulse/`. La app Flutter antigua (exam_checker_app) se eliminó; quedan `build/web/` y `web/` con un service worker que la desinstala de los dispositivos que la tenían. No los borres.

**Antes de proponer una función, lee [PRODUCTO.md](PRODUCTO.md):** define para quién es MediPulse, qué promete, qué NO es y cómo decidir si algo entra.

## Principios

1. **Una sola fuente de verdad:** este repositorio. Nada de versiones paralelas de la app completa: los cambios son incrementales, sobre los archivos existentes, y entran por pull request a `main`.
2. **Un cambio, un módulo** cuando se pueda. Cada PR dice qué módulo toca y por qué.
3. **Sin frameworks ni paso de compilación.** HTML, CSS y JavaScript planos, cargados con `<script src>` clásicos.
4. **Funciona sin internet.** Nada de CDNs nuevos: las librerías van en `medipulse/vendor/`. Las únicas funciones que necesitan red son las de IA.
5. **Los datos del usuario se quedan en su dispositivo** (`localStorage` e IndexedDB). No se envían a ningún servidor propio ni de terceros, salvo el texto que el usuario manda a la API de Claude al usar la IA y, en la beta, **el correo con el que inicia sesión** (Supabase Auth, ver `medipulse/SERVIDOR.md`). La cuenta solo controla quién entra; no guarda datos de estudio.
6. **Contenido médico verificable:** cada caso, tarjeta y ficha cita su fuente (`src`); no se inventan cifras; se usa la versión vigente de las guías.

## Cómo trabaja el autor (léelo antes de proponer o entregar)

El autor es médico, no programador: prueba la app como usuario real y decide el producto. Estas reglas salen de sus pruebas y valen para cualquier IA que trabaje aquí.

**Antes de abrir un pull request**
- Muestra **capturas** de cómo se ve el cambio en el celular (390 px de ancho) y espera su visto bueno. No abras el PR sin ellas.
- Corre todas las pruebas (`npm test`) y di cuántas pasan. Cada hallazgo del autor se vuelve una prueba automática. `npm test` incluye el revisor automático (`tests/revisor.spec.js`); para verlo solo: `npm run revisar`.
- Cuenta lo hecho y lo que falta, en español claro, sin jerga técnica. Si algo no se pudo verificar, dilo.

**Interfaz**
- **Pantallas limpias:** nada de listas largas a la vista. Toda lista va plegada con `plegable()` (título y número) y se abre con un toque.
- Los controles van **donde se usan**: un filtro debe estar junto al botón que lo usa y a la cantidad, no en otra tarjeta.
- Cuida el espaciado: un campo nunca pegado a su texto.
- En el texto: «fichas», no «tarjetas»; «Epidemiología y Estadística», no «Salud Pública».
- Nombres que digan qué hace la función («Resume lo que leíste», no «Destilador»). Las herramientas sueltas (calculadoras) van plegadas y dicen qué hacen; los avisos dicen lo que la función hace, no lo que no hace, y nunca nombran algo que el usuario quizá no tiene («tu PDF»).
- La app no lleva firma ni nombre de autor.

**Funciones**
- **Toda función debe servir también sin IA.** Lo que dependa de la IA debe tener un camino sin clave (guías, ideas, edición a mano, «Pegar de otra IA»). Pruébala siempre sin clave.
- **Nada se guarda sin mostrar qué cambió:** comparar con el original, aceptar cambio por cambio y no guardar copias iguales ni repetidas.
- **Lo que se edita o crea se puede probar** antes de guardarlo, sin que cuente en el progreso.
- **No dar pistas antes de responder:** ni el tema ni la fuente en las listas de casos sin responder (sesgo de anclaje).
- **MediPulse no audita lo que aporta el usuario:** se rotula («Importada», «Editada por ti», «Elaboración propia») y se aclara que la responsabilidad es de quien lo aporta.
- **No afirmar sin datos:** si aún no hay respuestas, no se declara un «punto débil»; se dice qué falta para saberlo.
- **No gastar IA donde otro módulo lo hace mejor:** los estudios originales van a MBE; Estudio es para revisiones de tema.
- **La app evidencia vulnerabilidades**, no vende contenido: prioriza que el usuario vea dónde y por qué falla.

**Al trabajar con él**
- Sé directo y honesto; si algo que dijiste era incorrecto, corrígelo aunque nadie lo haya notado.
- Si manda varios hallazgos a la vez, anótalos todos y al final di cuáles quedaron hechos.
- Lo pendiente se anota en la lista de trabajo antes de la beta.

## Estructura de `medipulse/`

Los scripts se cargan **en este orden** (ver el final de `index.html`). Comparten variables globales: lo que declara un archivo lo usan los siguientes. **Si agregas un archivo, respeta el orden y añádelo también a `FILES` en `sw.js`.**

| Archivo | Qué contiene |
|---|---|
| `index.html` | Solo la estructura de las pantallas (vistas `v-*`) y la barra inferior |
| `css/app.css` | Todos los estilos. Colores como variables (`--bg`, `--accent`…) con tema claro y oscuro |
| `data/servidor.js` | Dirección y clave pública (publishable) del servidor de la beta. Solo se activa en https fuera de `localhost`: en el computador y en las pruebas se entra sin correo. Nunca la clave secreta |
| `data/especialidades.js` | `SPECS` y `SPEC_COLOR` |
| `data/fuentes.js` | Referencias (`SOURCES`), vigencia y a qué caso corresponde cada una |
| `data/contenido/registro.js` | Registro `MP_CONTENIDO` (se carga antes que las especialidades) |
| `data/contenido/<especialidad>.js` | **Contenido incluido de cada especialidad** (casos, fichas HY y tarjetas): `medicina-interna`, `cirugia`, `pediatria`, `ginecologia` (paquete `starter`, las 4 básicas) y `salud-publica` (módulo aparte). Una urgencia va en la especialidad del paciente |
| `data/contenido/armar.js` | Junta todo en `BUILTIN_Q`, `HY_CARDS` y `BUILTIN_F` (va después de las especialidades) |
| `js/estado.js` | Estado `S` (localStorage, clave `medipulse_v2`), repaso espaciado (`grade`, cajas Leitner), selección de ítems |
| `js/ui.js` | Utilidades de interfaz (`$`, `esc`, `toast`, navegación `go`) y `plegable()`: las listas van plegadas y recuerdan si el usuario las abrió (`PLEG`) |
| `js/hoy.js` | Pantalla Hoy, modos por energía |
| `js/sesion.js` | Motor de sesión: casos, tarjetas, simulacro, resumen, atajos |
| `js/banco.js` | Banco de casos: «Arma tu práctica» (varias especialidades, 1 a 100 casos, al azar / mis vulnerabilidades / con filtros, modo examen) y «Explorar el banco» (búsqueda, tipo, estado, lista sin tema ni fuente) |
| `js/vulnerabilidades.js` | Registro de respuestas (`S.resp`, con el motivo del fallo que marca el usuario), rendimiento por tipo × especialidad, casos que se fallan una y otra vez, patrón de error auditoría a ciegas del modo examen (`CONFIANZA`, `marcarConfianza`: un acierto sin certeza vuelve mañana al repaso; nota real, aciertos frágiles y errores con seguridad) y elección de casos por vulnerabilidad (`elegirVulnerables`) o al azar balanceado (`elegirAlAzar`). Todo se calcula en el dispositivo |
| `js/fichas-hy.js` | Fichas high-yield: estudio, editor y pestaña High Yield (buscador, filtros por especialidad, área y estado, lista compacta que abre cada ficha con un toque; «Repasar» usa lo filtrado) |
| `js/simulacro.js` | Pantalla antigua del simulacro (ya no está en la barra; el simulacro se arma en el banco con «Modo examen») |
| `js/progreso.js` | Progreso y borrado |
| `js/fuentes.js` | Biblioteca, PDFs (IndexedDB, pdf.js), clave de API y guía |
| `js/compromiso.js` | Compromiso con los PDF: estado de cada documento (sin abrir, en estudio, estudiado, en espera), pendientes en Hoy, meta semanal que elige el usuario (`S.metaPdf`) y pregunta al subir uno más con la meta llena |
| `js/taller.js` | Detalle de una fuente: taller de preguntas (lector, datos clave, IA), revisión y guardado |
| `js/vigencia.js` | Llamadas a la API de Claude (`callForTool`, `apiErr`), revisión de vigencia y actualización de ítems |
| `js/analisis.js` | Analizar un documento: visor de la página original, mapa por capítulos, auditoría MBE, revisión de tema y pase de revista |
| `js/perfil.js` | Enfoque de estudio por tipo de pregunta (`FOCUS`, `qKind`, `focusLine`) y diagnóstico rápido |
| `js/reportes.js` | Reportes de errores en preguntas |
| `js/mbe.js` | Laboratorio de lectura crítica, destilador y calculadoras |
| `js/crear-y-compartir.js` | Crear preguntas y fichas a mano, texto pegado y packs JSON |
| `js/ia-costo.js` | Costo de la IA: nivel (Calidad máxima / Equilibrado / Económico), modelo de cada llamada, estimación antes, costo real después y total del mes. Toda llamada a la API usa `aiParams()` y registra su uso con `aiRecord()` |
| `js/indice.js` | Estudiar por temas: índice del documento (marcadores del PDF → secciones numeradas → títulos filtrados → IA), tema elegido como alcance de todo (`temaSel()`) y Recomendaciones sin IA (enunciados completos con clase/nivel y cifras con unidad) |
| `js/maqueta.js` | Lectura del PDF sin IA por su maqueta: líneas con fuente y tamaño (`lineasDelPdf`), índice por estilos de título (`indiceDeMaqueta`: sin encabezados de página, rótulos de figuras, encabezados de tablas ni afiliaciones; preguntas PICO acortadas), título y año de la primera página. Medido con `tools/banco-pdf.js` |
| `js/recomendaciones.js` | Recomendaciones por grado sin IA (`recsPorGrado`): AHA/ACC (COR/LOE), ESC, GRADE en español e inglés, NICE y puntos de buena práctica, agrupadas en lo que se hace, lo que puede considerarse y lo que no. Sin sistema de grados no inventa: remite a Leer o a la IA. En estudios originales, `resultadosConCifras` |
| `js/lector.js` | Lector del PDF real en «Leer y crear»: página con pdf.js y capa de texto seleccionable, ✂️ recortar una zona, 📷 subir captura, imágenes guardadas en IndexedDB (`img:…`) y adjuntas a fichas y preguntas |
| `js/corregir.js` | Corregir a mano preguntas y fichas: en la revisión antes de guardar y ya guardadas (✏️ Corregir). Lo incluido en la app se corrige en `S.over`; avisa los datos con «verificar el signo en el PDF» |
| `js/apuntes.js` | 📓 Mis apuntes: libretas por semana o rotación, entradas por día y puntos numerados; atajos al escribir (`->` → →, `SatO2` → SatO₂), Enter sigue la numeración, `??` marca «por verificar». Cada punto → ficha a mano (`apFicha` separa título y datos) o preguntas con IA; la libreta se estudia como documento (`apSync`: fuente `kind:"text"` con `apunte`, un punto por parte y un tema por día). El área de la libreta es libre: si no es una de `SPECS`, los ítems van a Medicina Interna con el área como etiqueta |
| `js/cuenta.js` | Inicio de sesión de la beta con Supabase Auth, sin librerías (`fetch` a `/auth/v1`): correo con enlace y código de 6 dígitos, solo invitados (`create_user: false`), sesión guardada en `medipulse_sesion`, entra sin internet con la sesión guardada y, si le quitan el acceso, vuelve a pedir el correo. Configuración: `SERVIDOR.md` |
| `js/editar.js` | ✏️ Editar un caso: el usuario crea su versión de una pregunta del banco, importada o suya (el original no cambia; `editada`, `baseId`). Primero las ya respondidas y aviso antes de ver la respuesta de otra. Ideas para hacerla más difícil, «🤖 Hazla más difícil» y «🤖 Revisar mi versión» con IA (`T_DIFICIL`, `T_REVISION`, `revisionHTML`) |
| `js/duplicados.js` | Repetidos: antes de guardar compara con el banco (palabras en común sin tildes ni palabras vacías, las cifras pesan doble). ≥ 72 % «repetida» (se desmarca y se pliega al revisar, o se pregunta al guardar a mano); 50–72 % «parecida» (solo aviso). A la IA se le pasan los temas que ya existen del documento (`dupYaExiste`) |
| `js/estudio.js` | 🧠 Sesión de estudio (reemplaza a Simulacro en la barra; el simulacro es el modo examen del banco): pre-test con casos del tema o «¿qué sabes ya?», lectura por bloques con pomodoro (25/5, 50/10, 15/3) y plantilla de qué extraer, recuerdo activo al final de cada bloque (con «Revisión de tema» de la IA para comparar), cierre con ficha y post-test. La sesión vive en `S.estudio.actual` (el reloj usa marcas de tiempo). «📊 Cómo estudias»: métricas y consejos sin IA, e informe con IA que solo recibe cifras (`estMetricas`) |
| `js/diagnostico.js` | Diagnóstico inicial: parte 1 (50 casos, 10 por área, en bloques de 10 en modo examen con auditoría), parte 2 (cómo estudias) y parte 3 (expediente de juicio clínico). No bloquea la app: lo personalizado (casos sin límite, simulacro, vulnerabilidades, A tope, análisis en Progreso) se abre al terminar la parte 1 (`diagHecho`). Modo de prueba sin candados con `?prueba=1` (localStorage `medipulse_prueba`); las pruebas automáticas corren con él. Resultado: perfil (mapa área × tipo, errores con seguridad, hábitos, juicio clínico) y plan semanal; `diagFocoHoy` alimenta «Tu siguiente paso» en Hoy |
| `data/expedientes.js` | Los 3 expedientes de juicio clínico de la parte 3 (señal y ruido, ideas clave, problema con ancla y decisiones con fuente) |
| `js/datos.js` | Proteger los datos: copia de seguridad (descargar/cargar/deshacer), recordatorio de copia, aviso de iPhone, alerta si no se pudo guardar, ítems archivados |
| `js/instalar.js` | Pantalla «Instalar en tu celular»: detecta iPhone, Android o computador y muestra sus pasos; botón «Instalar» del navegador (`beforeinstallprompt`) y aviso en Hoy si no está instalada. Íconos PNG (`icon-192`, `icon-512`, `icon-maskable-512`, `apple-touch-icon`) |
| `js/inicio.js` | Arranque (va siempre al final) |
| `vendor/` | pdf.js 3.11.174 y `@anthropic-ai/sdk` 1.2.0 (no editar a mano) |
| `sw.js` | Caché sin conexión |
| `tests/*.spec.js` | Pruebas automáticas (Playwright Test): `app` (flujos principales), `analisis`, `ia-taller` (IA simulada), `documento` (limpieza del texto y capítulos), `vista-previa` (archivo único) |
| `tests/fixtures/` | PDF de prueba inventado (`articulo-prueba.pdf`) y el script que lo crea |
| `tools/un-archivo.js` | Genera `medipulse-un-archivo.html` (la app en un solo archivo, no se sube al repo) |
| `tools/globales.js` | Lista los nombres globales de cada script (en el orden de `index.html`) y avisa si dos archivos declaran el mismo |
| `eslint.config.js` | Revisor automático del código (ESLint): nombres que no existen, `${…}` entre comillas normales, variables sin usar, código inalcanzable |
| `tools/regla-dueno-estado.js` | Regla del revisor: cada parte del progreso (`S`) tiene un archivo dueño (tabla `DUENOS`) y solo ese archivo la escribe; los demás usan sus funciones |
| `tools/banco-pdf.js` | Banco de PDF de referencia: mide tipo, título, año e índice sin IA contra `tools/banco-pdf.json`. Uso: `node tools/banco-pdf.js <carpeta con los PDF>` (los PDF no se suben al repo). Córrelo antes y después de tocar `maqueta.js`, `indice.js` o `detectDesign` |

### Versión de un solo archivo

Para ver la app en un visor que abre un solo HTML (por ejemplo, el panel de archivos de Claude) o para pasarla completa a otra IA: `node tools/un-archivo.js` (o `--watch` para regenerarla con cada cambio; `--con-librerias` incluye además el lector de PDF y el SDK de IA para usarlos sin internet, pero pesa ~2,8 MB y algunos visores se cuelgan). Ese archivo es una copia generada: **nunca se edita a mano** y los cambios que vengan sobre él se llevan a los módulos.

## Reglas de código

- **Seguridad:** todo texto que venga del usuario, de un PDF, de un pack o de la IA se escapa con `esc()` antes de ponerlo en `innerHTML`. Prohibido `eval`, `new Function` o insertar HTML recibido sin limpiar (ver `sanitizeVig`).
- **Nunca** escribir claves de API ni secretos en el código. La clave la guarda cada usuario en su navegador (`medipulse_api_key`).
- **Compatibilidad de datos:** no cambies la clave de `localStorage` ni el significado de campos existentes de `S`; si agregas campos, ponles valor por defecto en `BLANK()`, y añádelos al respaldo y al borrado de progreso si corresponde.
- **IA:** modelo `claude-opus-5-5`, con `fallbacks: "default"`. Las respuestas se piden con esquema JSON (`output_config.format`) o con herramienta `strict`. Todo lo que genera la IA pasa por una revisión del usuario antes de guardarse y queda marcado como generado con IA.
- **Interfaz:** primero celular (sin desplazamiento horizontal a 360 px), colores solo con variables de `app.css`, textos en español neutro y con verbos que dicen qué pasa.
- **Caché:** cada cambio sube la versión de `CACHE` en `sw.js` (`medipulse-vN`).

## Contenido médico

El contenido incluido es una **demostración del método con casos suficientes para el diagnóstico** (ver `PRODUCTO.md`): casos y fichas por básica, todos verificados. Vive en `data/contenido/`, un archivo por especialidad, con este formato (JSON dentro de `MP_CONTENIDO.agregar({...})`):

```js
MP_CONTENIDO.agregar({
  "especialidad": "Epidemiología y Estadística",     // igual que en SPECS
  "prefijo": "sp",                     // para los id nuevos
  "paquete": "salud-publica",          // "starter" (las 4 básicas, versión gratuita) o el módulo al que pertenece
  "actualizado": "2026-11-15",         // cámbialo cada vez que edites el archivo
  "revision": "verificada",            // solo cuando todo lo visible del archivo tiene su cita textual
  "casos":    [{ "id": "sp-c01", "topic": "…", "difficulty": "Nivel 2", "src": "gordis", "vignette": "…", "options": ["…","…","…","…"], "correct": 0, "whyCorrect": "…", "pearl": "…", "trap": "…" }],
  "fichas":   [{ "id": "sp-f01", "title": "…", "badge": "…", "src": "gordis", "thresholds": [{ "label": "…", "val": "…" }], "redFlag": "…", "trap": "…" }],
  "tarjetas": [{ "id": "sp-t01", "src": "gordis", "front": "…", "back": "…" }]
});
```

Reglas:
- **Los `id` nunca se cambian ni se reutilizan:** el progreso de cada usuario se guarda con ellos. Los ítems anteriores conservan su id numérico (casos 1–26, tarjetas 1–53) o `hy1`–`hy6`. Los nuevos usan `<prefijo>-c01`, `<prefijo>-f01` y `<prefijo>-t01`, y siguen la numeración del archivo. Para corregir un ítem, se edita su texto; si queda obsoleto, se reemplaza su contenido, sin borrar el id.
- `src` es el `id` de una fuente de `data/fuentes.js`. Toda fuente nueva va ahí, con título, revista u organización y año reales. Si una guía tiene una versión más nueva, se usa la nueva.
- `vignette` admite solo el resaltado `<span class='hy'>…</span>`; los signos `<` y `>` del texto se escriben `&lt;` y `&gt;`.
- 4 opciones distintas y una sola correcta (`correct`, de 0 a 3). Reparte la posición de la correcta entre A, B, C y D.
- Cifras, dosis y umbrales se verifican contra la fuente antes de entrar al repo, y un médico revisa cada especialidad antes de publicarla.
- **El progreso (`S`) tiene dueños:** cada campo de `S` lo escribe un solo archivo (tabla `DUENOS` en `tools/regla-dueno-estado.js`). Los ítems propios, el repaso, lo archivado y las correcciones se cambian con las funciones de `js/estado.js` (`agregarPropio`, `nuevoIdPropio`, `quitarPropio`, `quitarPropiosDeFuente`, `archivar`, `desarchivar`, `olvidarRepaso`, `repasoDe`, `corregirIncluido`); las fuentes, con `agregarFuente` y `quitarFuente` (`js/fuentes.js`); el enfoque, con `elegirEnfoque` (`js/perfil.js`). Un campo nuevo se agrega a esa tabla con su dueño; el revisor falla si alguien más lo escribe.
- **Opciones sin pistas:** la respuesta correcta no debe delatarse por ser la opción más larga o la más detallada. Escribe los distractores con el mismo nivel de detalle y recorta la correcta a lo esencial (la explicación va en `whyCorrect`). La prueba `tests/contenido.spec.js` falla si la correcta mide más de 1,3 veces la siguiente o si es la más larga en más del 30 % de los casos.
- **Temas variados en el diagnóstico:** el diagnóstico elige primero un caso por tema (`diagTema`: la primera palabra después de «·» en `topic`). Escribe el `topic` como «Área · Tema concreto» para que esto funcione.
- **Cita textual:** cada ítem lleva `"cita": [{ "donde": "Recomendación 1.8.1", "texto": "texto literal de la guía" }]` y `"verificado": "AAAA-MM-DD"`. La app la muestra en "Ver la cita textual de la guía"; revisar es comparar el dato con la cita. Se prefieren fuentes de acceso abierto; si la fuente es de suscripción (por ejemplo, una revista), se cita solo el texto breve de la recomendación y el usuario consigue el documento por su cuenta.
- **`"estado": "pendiente"`** saca un ítem de la app sin borrarlo (sin verificar o fuera de la demostración). Se conserva su id para no perder el progreso; al verificarlo se quita el campo.
- `npm test` valida todo esto (`tests/contenido.spec.js`): formato, fuentes, ids repetidos o desaparecidos y posición de las respuestas.

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
4. **Probar:** `npm test` (desde `medipulse/`; la primera vez `npm install` y `npx playwright install chromium`) y probar a mano el flujo cambiado. Si cambias un flujo, agrega o ajusta su prueba en `tests/`. Las pruebas nunca usan la API real: la IA se simula con `simularIA` (`tests/ayudas.js`). En cada PR, GitHub corre las mismas pruebas (`.github/workflows/pruebas.yml`).
5. **Subir `CACHE` en `sw.js`**, actualizar `README.md` y `MAPA.html` si cambia lo que ve el usuario, y abrir el PR explicando qué se tomó, qué se adaptó y qué se descartó.
