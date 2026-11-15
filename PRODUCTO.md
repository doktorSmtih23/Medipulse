# MediPulse: definición del producto

Esta es la referencia para decidir qué se construye y qué no. Cualquier función nueva, venga de Claude, de Gemini o de una persona, debe servir a lo que dice este documento.

## En una frase
MediPulse convierte el material que un médico ya tiene (guías, artículos, apuntes y notas a mano) en un plan de estudio eficiente, y le avisa cuando ese material deja de estar vigente.

## Para quién
1. **Quien prepara el examen de residencia** (usuario principal). Tiene poco tiempo, mucho temario y una fecha límite.
2. **El residente**, que no quiere quedar mal en el pase de visita y necesita repasar un tema rápido y al día.

Es el mismo usuario en dos momentos: si MediPulse lo ayuda a entrar a la residencia, ahí descubre que la sigue necesitando. **El objetivo es acompañarlo de aspirante a residente**, no solo hasta el examen.

## El problema
- Se lee mucho y se recuerda poco.
- No se sabe qué es lo importante (high-yield) de cada documento.
- Las guías cambian y uno no se entera. **Estudiar con una guía vieja es perder puntos en el examen.**
- El material está disperso: PDF, cuadernos, tarjetas a mano, GoodNotes.
- Hay días sin energía en los que no se estudia nada.

## La promesa
- **Estudia lo importante:** extrae lo high-yield de cualquier documento, y cada dato cita su página.
- **Recuérdalo:** repaso espaciado, preguntas tipo examen y simulacros.
- **Adáptate a tu energía:** desde 5 minutos sin ganas hasta un bloque de 90 a tope.
- **Sigue vigente:** avisa cuando una fuente tiene una versión nueva y qué de lo estudiado cambió.
- **Llega preparado al pase de visita:** revisión de tema y pase de revista desde la guía o el artículo.

## Diferenciador
1. **La vigencia.** Ninguna alternativa (bancos de preguntas, Anki, resúmenes en PDF, grupos de WhatsApp) avisa cuando lo que estudiaste quedó desactualizado.
2. **Estudiar desde el material propio, incluidas las notas a mano.** Muchos colegas todavía estudian con cuadernos, tarjetas de papel o GoodNotes. MediPulse debe poder importar esas notas (fotos o PDF exportados de GoodNotes) y convertirlas en fichas high-yield y preguntas.

## Idioma
MediPulse vende un método, y el método no depende del idioma.
- **El material del usuario en cualquier idioma:** documentos, notas a mano o de GoodNotes, incluso mezclando idiomas (por ejemplo, español con términos en inglés). Las fichas y preguntas salen en el idioma que el usuario elija.
- **La interfaz:** en español para la beta. Traducirla a otros idiomas está previsto para después; por eso los textos nuevos de la interfaz deben escribirse de forma que se puedan traducir sin reescribir la lógica.

## Qué NO es
- **No vende contenido:** ni guías, ni resúmenes, ni bancos de preguntas propios. El contenido lo trae el usuario.
- No reemplaza el juicio clínico; es una herramienta de estudio.
- No es un curso de un examen en particular. Orienta por tipo de pregunta (conducta, diagnóstico, lectura crítica, datos duros), porque los exámenes cambian sin aviso.

## Lo que trae incluido
Una **demostración corta del método**: pocos casos y fichas de las 4 básicas (Medicina Interna, Pediatría, Ginecología y Obstetricia, Cirugía General), todos verificados contra la versión vigente de su guía y con la cita textual. Sirve para que el usuario entienda cómo estudiar con la app; no es un banco para preparar todo el examen. Salud Pública, si se incluye, va como módulo aparte.

## Modelo económico
**No es un negocio para enriquecerse con el estudiante.** Preparar la residencia ya es caro (pines de los exámenes, viajes, cursos). MediPulse cobra solo lo necesario para:
- cubrir los costos de operación (servidor y uso de la IA);
- un margen modesto por el tiempo invertido.

Consecuencias para el diseño:
- **Cuidar el costo de cada acción con IA:** hacer con IA solo lo que aporta, sin IA lo que se puede (lectura, datos clave, repaso, simulacros), y avisar cuánto cuesta antes de usarla.
- **Infraestructura mínima:** la app funciona en el dispositivo y sin internet; el servidor solo para lo indispensable.
- **Sin funciones pensadas para cobrar más:** nada de muros de pago en lo básico del estudio.
- El modelo exacto (por ejemplo, una suscripción baja que incluya los créditos de IA) se define después de la beta.

## Cómo decidir si algo entra
Una función nueva entra si responde que sí a alguna de estas preguntas, y no rompe lo de "Qué NO es":
1. ¿Ayuda a aprobar el examen con menos tiempo?
2. ¿Ayuda al residente a llegar preparado al pase de visita?
3. ¿Mantiene al usuario al día con la versión vigente?
4. ¿Convierte material que el usuario ya tiene en estudio útil?
