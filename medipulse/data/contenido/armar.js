// Junta el contenido de todas las especialidades en las listas que usa la app.
// La especialidad de cada ítem la da su archivo; no se repite en cada ítem.
// Los ítems con estado "pendiente" (sin verificar o fuera de la demostración) no se muestran,
// pero se conservan en el archivo con su id para no perder el progreso de quien ya los estudió.
const BUILTIN_Q = [], HY_CARDS = [], BUILTIN_F = [];
const mpVisible = x => x.estado !== "pendiente";
MP_CONTENIDO.especialidades.forEach(e => {
  const specialty = e.especialidad;
  (e.casos || []).filter(mpVisible).forEach(q => BUILTIN_Q.push(Object.assign({specialty}, q)));
  (e.fichas || []).filter(mpVisible).forEach(h => HY_CARDS.push(Object.assign({specialty}, h)));
  (e.tarjetas || []).filter(mpVisible).forEach(c => BUILTIN_F.push(Object.assign({specialty}, c)));
});
let QUESTIONS = BUILTIN_Q;
let FLASH = BUILTIN_F;
