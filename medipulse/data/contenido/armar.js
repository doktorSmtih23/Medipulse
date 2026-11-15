// Junta el contenido de todas las especialidades en las listas que usa la app.
// La especialidad de cada ítem la da su archivo; no se repite en cada ítem.
const BUILTIN_Q = [], HY_CARDS = [], BUILTIN_F = [];
MP_CONTENIDO.especialidades.forEach(e => {
  const specialty = e.especialidad;
  (e.casos || []).forEach(q => BUILTIN_Q.push(Object.assign({specialty}, q)));
  (e.fichas || []).forEach(h => HY_CARDS.push(Object.assign({specialty, accent: SPEC_COLOR[specialty]}, h)));
  (e.tarjetas || []).forEach(c => BUILTIN_F.push(Object.assign({specialty}, c)));
});
let QUESTIONS = BUILTIN_Q;
let FLASH = BUILTIN_F;
