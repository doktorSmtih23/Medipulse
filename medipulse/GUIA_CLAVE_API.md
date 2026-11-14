# Cómo conseguir tu clave de API de Claude para MediPulse

> Esta misma guía está dentro de la app: **📚 Fuentes → 🤖 Generación con IA → 📖 Guía paso a paso**. Funciona sin internet.

La clave es **opcional**. Sin ella, MediPulse funciona completo: estudio por nivel de energía, repaso espaciado, simulacros, fichas y tarjetas de completar generadas desde tus PDF.

Con la clave, además puedes:
- **Generar casos clínicos tipo examen** (con explicación, perla y trampa) desde tus PDF.
- **Revisar si tus fuentes siguen vigentes** (Claude busca en la web si hay versiones nuevas).
- **Actualizar las preguntas** cuando sale una guía nueva.

---

## Antes de empezar

- **Es un servicio aparte de Claude.ai.** Aunque pagues Claude Pro o Max, la API se paga por separado.
- **Se paga por uso, con saldo prepagado.** Recargas crédito (lo habitual es empezar con US$5) y cada uso se descuenta. El crédito vence al año y no es reembolsable.
- **Necesitas** un correo y una tarjeta de crédito o débito internacional.

| Acción en MediPulse | Costo aprox. |
|---|---|
| Generar 10 casos + 10 tarjetas desde un PDF | US$0.10–0.40 |
| Revisar la vigencia de 5 fuentes | ~US$0.25 |
| Actualizar las preguntas de una fuente | US$0.10–0.30 |
| Estudiar, repasar, simulacros, tarjetas de completar | Gratis |

*Precios estimados a noviembre de 2026. La app muestra el costo aproximado antes de cada acción que usa la API.*

---

## Paso a paso

### 1. Crea tu cuenta
Entra a [console.anthropic.com](https://console.anthropic.com) (la Consola de Claude) y regístrate con tu correo. Confirma el correo y completa los datos que te pida.
*Si la página te lleva a platform.claude.com, es el mismo servicio con otra dirección.*

### 2. Agrega saldo
En el menú, entra a **Settings → Billing** (Facturación), registra tu tarjeta y compra crédito. Con **US$5** alcanza para mucho uso en MediPulse.
*Sin saldo, la clave no funciona aunque esté bien copiada.*

### 3. Pon un límite de gasto
En **Settings → Limits** define un **límite mensual**, por ejemplo US$5. Es tu red de seguridad: aunque alguien obtuviera tu clave, nunca se gastaría más de eso en el mes.

### 4. Activa la búsqueda web
Solo es necesario para **revisar la vigencia de las fuentes**. En la configuración de tu organización en la Consola (normalmente en la sección de **privacidad** o de funciones), activa la **búsqueda web** (*web search*).
*Si no la activas, todo lo demás funciona y la app te avisará cuando intentes revisar la vigencia.*

### 5. Crea la clave
Entra a **API Keys** → **Create Key**. Ponle un nombre que reconozcas, por ejemplo `MediPulse celular`, y deja el espacio de trabajo (*workspace*) en **Default**.

> ⚠️ **Cópiala en ese momento.** La clave empieza con `sk-ant-` y la Consola la muestra **una sola vez**. Si la pierdes, no se puede recuperar: crea otra.

### 6. Pégala en MediPulse
En la app: **📚 Fuentes → 🤖 Generación con IA** → pega la clave → **Guardar clave**. Verás “✓ Clave guardada” con sus últimos 4 caracteres.

### 7. Pruébala
Abre un PDF tuyo en Fuentes, elige **🤖 Casos clínicos + tarjetas (IA)**, selecciona 1–3 páginas y 5 casos, y toca **Generar**. Si en 1–3 minutos aparecen las preguntas para revisar, todo está listo.

---

## 🔒 Cuida tu clave

- **Dónde se guarda:** solo en el navegador de ese dispositivo (`localStorage`). MediPulse solo la envía a Anthropic, nunca a otro servidor, y no la incluye en el respaldo exportado.
- **Quién puede verla:** cualquiera que use ese navegador. No la guardes en una computadora compartida o pública.
- **No la compartas** ni la pegues en chats, correos, capturas de pantalla o código. Quien la tenga puede gastar tu saldo.
- **Si crees que alguien la vio:** en la Consola, entra a **API Keys**, elimínala y crea otra. La anterior deja de funcionar al instante.
- **Para quitarla de la app:** Fuentes → Generación con IA → **Quitar clave**.
- **Varios dispositivos:** crea una clave distinta para cada uno (ej. “MediPulse laptop”); así puedes desactivar una sin afectar las demás.

---

## 🛠️ Si algo falla

| Mensaje en la app | Qué hacer |
|---|---|
| “La clave debe empezar con sk-ant-” | Se copió mal o incompleta. Vuelve a copiarla, sin espacios. Si ya no la ves en la Consola, crea una nueva. |
| “La clave de API no es válida” | Fue eliminada o tiene un error. Crea una nueva en **API Keys** y vuelve a guardarla. |
| “La API rechazó la solicitud: … credit balance …” | Te quedaste sin saldo. Recarga en **Settings → Billing**. |
| “La API rechazó la solicitud: … usage limit …” | Llegaste a tu límite mensual. Súbelo en **Settings → Limits** o espera al próximo mes. |
| “Llegaste al límite de uso de la API” | Hiciste muchas solicitudes seguidas. Espera un minuto y vuelve a intentarlo. |
| “La búsqueda web no está activada para tu cuenta” | Haz el paso 4. |
| “Tu clave no tiene permiso…” | Revisa en la Consola que la clave pertenezca al espacio de trabajo **Default** y que tu cuenta esté activa. |
| “Sin conexión con la API” | Las funciones con IA necesitan internet. El resto de la app funciona sin conexión. |
| “La respuesta quedó incompleta” | Pediste demasiado de una vez. Elige menos páginas o menos preguntas. |
| “Error del servicio de IA (5xx)” | Falla temporal de Anthropic. Inténtalo en unos minutos. |

---

## Preguntas frecuentes

**¿Puedo usar mi suscripción de Claude Pro o Max?**
No. La suscripción es para usar Claude en claude.ai y sus apps; la API se paga aparte, por uso.

**¿Cuánto me va a costar al mes?**
Depende de cuánto generes. Un uso típico (algunos PDF por semana y una revisión de vigencia al mes) suele quedar en pocos dólares. Con el límite del paso 3 nunca pagas más de lo que decides.

**¿Qué datos se envían a Anthropic?**
Solo lo necesario para cada acción: el texto de las páginas que eliges de tu PDF, los nombres de tus fuentes o las preguntas que vas a actualizar. Tu progreso, tu racha y tus estadísticas nunca salen del dispositivo.

**¿Qué modelo usa la app?**
Claude Opus 5.5 (`claude-opus-5-5`), con respaldo automático a otro modelo si el primero no puede responder una solicitud.

**¿La IA puede equivocarse?**
Sí. Por eso nada entra a tu banco sin que lo revises, cada pregunta indica su fuente y página, y las preguntas actualizadas llevan la marca “verifícalo”.

**¿Y si no quiero pagar nada?**
No necesitas la clave. Puedes crear tarjetas de completar desde tus PDF gratis y revisar la vigencia de las fuentes a mano con el botón 🔗 de cada una.

---

## Referencias
- [Documentación de la herramienta de búsqueda web (Anthropic)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)
- [Activar y usar la búsqueda web (soporte de Anthropic)](https://support.anthropic.com/en/articles/10684626-enabling-and-using-web-search)
- [Cómo pagar el uso de la API (soporte de Anthropic)](https://support.anthropic.com/id/articles/8977456-bagaimana-cara-saya-membayar-penggunaan-api-saya)
- [Límites de uso y niveles (soporte de Anthropic)](https://support.anthropic.com/en/articles/10366389-how-can-i-advance-my-api-usage-to-tier-2)

*Los nombres de los menús de la Consola pueden cambiar. Si no encuentras una opción, búscala en la ayuda de la Consola.*
