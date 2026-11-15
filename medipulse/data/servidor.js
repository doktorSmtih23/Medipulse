// Servidor de la beta (Supabase). Con url vacía la app no pide inicio de sesión y funciona como siempre.
// Cómo crearlo y configurarlo: SERVIDOR.md.
// La clave «anon» (o «publishable») es pública por diseño: va en el navegador de todos los usuarios.
// La seguridad está en Supabase: registro cerrado y entrada solo para correos invitados.
// NUNCA pongas aquí la clave «service_role» (o «secret»): da control total del proyecto.
const MP_SERVIDOR = {
  url: "",    // p. ej. "https://abcdefghijkl.supabase.co"
  anon: ""    // Project Settings → API Keys → anon / publishable
};
