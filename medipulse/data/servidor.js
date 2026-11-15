// Servidor de la beta (Supabase). Con url vacía la app no pide inicio de sesión y funciona como siempre.
// Cómo crearlo y configurarlo: SERVIDOR.md.
// La clave «publishable» (o «anon») es pública por diseño: va en el navegador de todos los usuarios.
// La seguridad está en Supabase: registro cerrado y entrada solo para correos invitados.
// NUNCA pongas aquí la clave «secret» (o «service_role»): da control total del proyecto.
// Solo se pide inicio de sesión en la app publicada (https). En el computador (localhost), en las pruebas
// automáticas y en la vista previa de un solo archivo se entra sin correo.
const MP_SERVIDOR = location.protocol === "https:" && !/^(localhost|127\.|\[::1\])/.test(location.hostname) ? {
  url: "https://emcuteelhckkakzxxuvs.supabase.co",
  anon: "sb_publishable_FqPyXNjPcipWL5LokUvHIQ_Bepsqjf1"
} : {url: "", anon: ""};
