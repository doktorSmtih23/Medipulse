# MediPulse: definición del producto

Esta es la referencia para decidir qué se construye y qué no. Cualquier función nueva, venga de Claude, de Gemini o de una persona, debe servir a lo que dice este documento.

## En una frase
MediPulse convierte el material que un médico ya tiene (guías, artículos y sus propios apuntes) en un plan de estudio eficiente, y le da una herramienta para revisar rápido artículos y guías y estar al día.

## Para quién
1. **Quien prepara el examen de residencia** (usuario principal). Tiene poco tiempo, mucho temario y una fecha límite.
2. **El residente**, que no quiere quedar mal en el pase de visita y necesita repasar un tema rápido y al día.

Es el mismo usuario en dos momentos: si MediPulse lo ayuda a entrar a la residencia, ahí descubre que la sigue necesitando. **El objetivo es acompañarlo de aspirante a residente**, no solo hasta el examen.

## El problema
- Se lee mucho y se recuerda poco.
- No se sabe qué es lo importante (high-yield) de cada documento.
- Las guías cambian y uno no se entera. **Estudiar con una guía vieja es perder puntos en el examen.**
- El material está disperso: PDF, cuadernos, tarjetas a mano, GoodNotes. Y lo que se anota a mano casi nunca se vuelve repaso.
- Hay días sin energía en los que no se estudia nada.

## La promesa
- **Estudia lo importante:** extrae lo high-yield de cualquier documento, y cada dato cita su página.
- **Recuérdalo:** repaso espaciado, preguntas tipo examen y simulacros.
- **Adáptate a tu energía:** desde 5 minutos sin ganas hasta un bloque de 90 a tope.
- **Revisa rápido:** audita un artículo o una guía en minutos (veredicto, algoritmo, qué hacer y qué no, umbrales), cada dato con su página.
- **Llega preparado al pase de visita:** revisión de tema y pase de revista desde la guía o el artículo.

## Diferenciador
1. **Revisión rápida de artículos y guías.** En minutos se ve el veredicto, el algoritmo, qué hacer y qué no y los umbrales, cada uno con su página, y lo revisado se vuelve ficha o caso. MediPulse **no avisa** cuando una guía cambia de versión: vigilar cada fuente sería demasiado para el alcance de la app.
2. **Estudiar desde el material propio, incluidos los apuntes.** Muchos colegas toman nota en cuadernos o en GoodNotes, y esas notas se quedan ahí. En MediPulse los apuntes se escriben en **📓 Mis apuntes** (una libreta por semana o rotación, una entrada por día, puntos numerados) y cada punto se vuelve ficha high-yield o preguntas con un toque.

**La app no lee escritura a mano** (fotos de cuaderno ni PDF de GoodNotes o Notability). Se probó con notas reales: la IA lee bien la mayoría, pero confunde abreviaturas, palabras sueltas y cifras, y un error en una dosis o un umbral es justo lo que no puede pasar. Además, el PDF de GoodNotes trae un texto reconocido automáticamente que sale muy dañado. Por eso: los apuntes se escriben en la app (con atajos de teclado y el dictado del celular) o se pega el texto; las capturas que se aceptan son de texto impreso (algoritmos, tablas, gráficas).

## Idioma
MediPulse vende un método, y el método no depende del idioma.
- **El material del usuario en cualquier idioma:** documentos y apuntes, incluso mezclando idiomas (por ejemplo, español con términos en inglés). Las fichas y preguntas salen en el idioma que el usuario elija.
- **La interfaz:** en español para la beta. Traducirla a otros idiomas está previsto para después; por eso los textos nuevos de la interfaz deben escribirse de forma que se puedan traducir sin reescribir la lógica.

## Qué NO es
- **No vende contenido:** ni guías, ni resúmenes, ni bancos de preguntas propios. El contenido lo trae el usuario.
- No reemplaza el juicio clínico; es una herramienta de estudio.
- No es un curso de un examen en particular. Orienta por tipo de pregunta (conducta, diagnóstico, lectura crítica, datos duros), porque los exámenes cambian sin aviso.

## Lo que trae incluido
Una **demostración del método con casos suficientes para el diagnóstico**: casos y fichas de las 4 básicas (Medicina Interna, Pediatría, Ginecología y Obstetricia, Cirugía General), todos verificados contra la versión vigente de su guía o de las memorias de los cursos de actualización de la Universidad de Antioquia, con la cita textual. Alcanza para el diagnóstico inicial (50 casos) y deja casos sin ver para practicar; no pretende ser un banco para preparar todo el examen. Epidemiología y Estadística va como módulo aparte y más completo (35 fichas): es el tema que casi nadie disfruta estudiar, y MediPulse lo regala en un formato de datos clave y trampas.

## Modelo económico
**No es un negocio para enriquecerse con el estudiante.** Preparar la residencia ya es caro (pines de los exámenes, viajes, cursos). MediPulse cobra solo lo necesario para:
- cubrir los costos de operación (servidor y uso de la IA);
- un margen modesto por el tiempo invertido.

Consecuencias para el diseño:
- **Cuidar el costo de cada acción con IA:** hacer con IA solo lo que aporta, sin IA lo que se puede (lectura, datos clave, repaso, simulacros), y avisar cuánto cuesta antes de usarla.
- **Infraestructura mínima:** la app funciona en el dispositivo y sin internet; el servidor solo para lo indispensable. En la beta, el servidor (Supabase, plan gratis) solo controla quién entra: los datos de estudio no salen del dispositivo.
- **Sin funciones pensadas para cobrar más:** nada de muros de pago en lo básico del estudio.
- El modelo exacto (por ejemplo, una suscripción baja que incluya los créditos de IA) se define después de la beta.

## Cómo decidir si algo entra
Una función nueva entra si responde que sí a alguna de estas preguntas, y no rompe lo de "Qué NO es":
1. ¿Ayuda a aprobar el examen con menos tiempo?
2. ¿Ayuda al residente a llegar preparado al pase de visita?
3. ¿Ayuda a revisar rápido un artículo o una guía para estar al día?
4. ¿Convierte material que el usuario ya tiene en estudio útil?
