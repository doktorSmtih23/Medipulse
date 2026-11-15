# Servidor de la beta (Supabase): cómo ponerlo a funcionar

La cuenta de MediPulse en la beta **solo controla quién entra**. El progreso, las fichas, los apuntes y la clave de IA siguen en el dispositivo de cada persona; al servidor solo va el correo. Mientras `data/servidor.js` esté vacío, la app funciona como siempre, sin pedir inicio de sesión.

> Los nombres de los menús son los del panel de Supabase a la fecha de escribir esto. Si alguno cambió, busca la opción por su nombre en inglés (entre paréntesis).

## 1. Crear el proyecto
1. Entra a supabase.com y crea una cuenta (con GitHub es lo más rápido).
2. **New project**: nombre `medipulse-beta`, una contraseña de base de datos (guárdala; la app no la usa) y la región más cercana a tus usuarios (para Colombia, **South America (São Paulo)**). Plan gratis.

## 2. Cerrar el registro: solo entran invitados
1. **Authentication → Sign In / Providers** (Sign In / Providers): desactiva **Allow new users to sign up**.
2. En el mismo lugar, en **Email**, deja activado el proveedor de correo. Si ves **Email OTP Length**, déjalo en 6; **Email OTP Expiration** en 3600 segundos (1 hora) está bien.

## 3. A dónde vuelve el enlace del correo
**Authentication → URL Configuration** (URL Configuration):
- **Site URL:** `https://doktorsmtih23.github.io/Medipulse/medipulse/`
- **Redirect URLs:** agrega la misma dirección. Si pruebas en tu computador, agrega también `http://localhost:4173/`.

## 4. El correo en español, con enlace y código
**Authentication → Emails → Templates** (Email Templates):

**Magic Link** (asunto: `Tu acceso a MediPulse`):
```html
<h2>Entra a MediPulse</h2>
<p><a href="{{ .ConfirmationURL }}">Toca aquí para entrar</a> (ábrelo en el mismo dispositivo donde pediste el correo).</p>
<p>O escribe este código en la app: <b style="font-size:20px;letter-spacing:3px">{{ .Token }}</b></p>
<p>Vence en una hora. Si no lo pediste, ignora este correo.</p>
```
**Invite user** (asunto: `Te invitaron a la beta de MediPulse`):
```html
<h2>Te invitaron a la beta de MediPulse</h2>
<p>MediPulse es una app de estudio para el examen de residencia.</p>
<p><a href="{{ .ConfirmationURL }}">Toca aquí para entrar por primera vez</a>.</p>
<p>Después, para entrar desde otro dispositivo, abre la app y escribe este mismo correo: te llegará un enlace y un código.</p>
```
El código (`{{ .Token }}`) es importante en iPhone: si la app está instalada en la pantalla de inicio, el enlace se abre en Safari y no en la app; con el código se entra desde la app.

## 5. Un servicio de correo propio (necesario para invitar a otras personas)
El correo que trae Supabase por defecto es solo para pruebas: envía muy pocos correos por hora y, en los proyectos nuevos, solo a los correos del equipo del proyecto. Para la beta configura uno propio:
1. Crea una cuenta gratis en un servicio de correo (por ejemplo **Resend**, **Brevo** o **Amazon SES**) y verifica un dominio o el remitente que te pida.
2. Copia sus datos SMTP (servidor, puerto, usuario y contraseña).
3. En Supabase: **Authentication → Emails → SMTP Settings** (SMTP Settings): activa **Enable custom SMTP**, pega los datos y pon como remitente `MediPulse <acceso@tu-dominio>`.
4. En **Authentication → Rate Limits** puedes subir el número de correos por hora si hace falta.

## 6. Invitar a los probadores
**Authentication → Users → Add user → Send invitation** (Invite user): escribe el correo de la persona. Le llega el correo de invitación; con el enlace entra la primera vez.
Para quitarle el acceso: en **Users**, elimina a la persona. La próxima vez que su app se conecte a internet, le pedirá el correo de nuevo y no podrá entrar. Sus datos de estudio no se borran de su dispositivo.

## 7. Conectar la app
**Project Settings → API Keys** (API Keys) y **Project Settings → Data API** (o **API**):
- Copia la **Project URL** (`https://xxxx.supabase.co`).
- Copia la clave **publishable** (`sb_publishable_…`) o, si tu proyecto muestra las antiguas, la **anon**.
- **Nunca** uses la **secret** (`sb_secret_…`) ni la **service_role**: dan control total del proyecto. Si se pone por error, la app no la usa y lo avisa en la consola.

Ponlas en `data/servidor.js` (o pásaselas a Claude para que abra el PR):
```js
const MP_SERVIDOR = {
  url: "https://xxxx.supabase.co",
  anon: "sb_publishable_…"
};
```
La clave publishable es pública por diseño (va en el navegador de todos). La seguridad está en que el registro está cerrado.

El inicio de sesión solo se pide en la app publicada (https). En el computador (`localhost`), en las pruebas automáticas y en la vista previa de un solo archivo se entra sin correo.

## 8. Probar
1. Invítate a ti mismo (paso 6) y abre el enlace: debes entrar directo.
2. En otro navegador, escribe tu correo en la pantalla de entrada y usa el **código**.
3. Escribe un correo no invitado: debe decir «Ese correo no está invitado a la beta».
4. Elimina tu usuario en Supabase, abre la app con internet: debe pedir el correo de nuevo.

## Política de tratamiento de datos (Ley 1581 de 2012)
- La política está en `privacidad.html`. **Antes de invitar probadores, completa el punto 1** (nombre, identificación, ciudad y correo de contacto del responsable).
- Para entrar, cada persona marca «Leí y acepto la política». Quien entra con el enlace de invitación la acepta en una pantalla antes de empezar.
- **Prueba de la autorización:** queda en la cuenta de cada persona en Supabase. En **Authentication → Users**, abre el usuario y mira **raw user meta data**: `privacidad_version` y `privacidad_aceptada` (fecha y hora).
- Si cambias la política, sube `PRIV_VERSION` en `js/cuenta.js` y la fecha en `privacidad.html`: la app la pide de nuevo a todos.
- Si alguien pide que borren sus datos, elimínalo en **Users** y responde dentro de los plazos de la política (10 días hábiles las consultas, 15 los reclamos).

## Qué protege y qué no
- **Protege:** que solo los invitados usen la app publicada y que se pueda quitar el acceso.
- **No protege:** el código y el contenido incluido siguen siendo públicos en GitHub (el repositorio y GitHub Pages). Para cerrarlos haría falta un servidor que entregue la app solo a quien tiene sesión; eso se decide después de la beta, junto con el modelo de cobro.
