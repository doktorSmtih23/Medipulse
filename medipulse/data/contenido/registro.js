// Registro del contenido incluido. Cada archivo de especialidad llama a MP_CONTENIDO.agregar({...}).
// Se carga antes que los archivos de especialidad; armar.js (después) junta todo para la app.
const MP_CONTENIDO = {
  especialidades: [],
  agregar(datos){ this.especialidades.push(datos); }
};
