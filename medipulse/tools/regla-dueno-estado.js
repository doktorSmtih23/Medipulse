// Regla del revisor: cada parte del progreso del usuario (S, en js/estado.js) tiene un archivo dueño, y solo
// ese archivo la escribe directamente. Los demás usan las funciones del dueño. Así, si mañana cambia cómo se
// guarda algo, se cambia en un solo lugar.
//
// Cuenta como escritura: «S.campo = …», «S.campo.x = …», «S.campo[k] = …», «delete S.campo[k]», «++S.campo»
// y llamar a push, splice, unshift, pop, shift, sort o reverse sobre S.campo. No ve los alias
// («const D = S.diag; D.x = 1»): los dueños los usan dentro de sus propias funciones (diagEst, prac, perlaEst…).
const DUENOS = {
  // js/estado.js: los ítems propios, su repaso, lo archivado, las correcciones y el registro de cada día.
  srs: "estado", hidden: "estado", userQ: "estado", userC: "estado", userH: "estado", seq: "estado", over: "estado", log: "estado",
  sources: "fuentes",
  focus: "perfil",
  sims: "sesion", hints: "sesion",
  theme: "ui",
  check: "vigencia",
  notes: "mbe",
  reports: "reportes",
  tpls: "taller",
  apuntes: "apuntes",
  resp: "vulnerabilidades",
  metaPdf: "compromiso",
  diag: "diagnostico",
  prac: "banco",
  estudio: "estudio",
  perlas: "hoy", metaMin: "hoy",
  lastBackup: "datos", backupSnooze: "datos", iosWarnOk: "datos",
  aiSpend: "ia-costo", aiLevel: "ia-costo",
  exam: "estado"
};
// js/estado.js puede escribir cualquier campo: ahí se carga el progreso y se migran los datos viejos.
const LIBRE = "estado";
const MUTAN = new Set(["push", "splice", "unshift", "pop", "shift", "sort", "reverse"]);

module.exports = {
  DUENOS,
  meta: {type: "problem", docs: {description: "Solo el archivo dueño escribe cada parte del progreso (S)"}, schema: []},
  create(context){
    const archivo = context.filename.replace(/\\/g, "/").match(/js\/([^/]+)\.js$/);
    if (!archivo) return {};
    const yo = archivo[1];
    return {
      MemberExpression(node){
        if (node.object.type !== "Identifier" || node.object.name !== "S" || node.computed || node.property.type !== "Identifier") return;
        const campo = node.property.name;
        // Sube por la cadena S.campo.x[k]… hasta su punta.
        let punta = node;
        while (punta.parent && punta.parent.type === "MemberExpression" && punta.parent.object === punta) punta = punta.parent;
        const p = punta.parent;
        const escribe =
          (p && p.type === "AssignmentExpression" && p.left === punta) ||
          (p && p.type === "UpdateExpression") ||
          (p && p.type === "UnaryExpression" && p.operator === "delete") ||
          (p && p.type === "CallExpression" && p.callee === punta && punta !== node && !punta.computed && MUTAN.has(punta.property.name));
        if (!escribe) return;
        const dueno = DUENOS[campo];
        if (!dueno && yo !== LIBRE) context.report({node, message: `S.${campo} no tiene archivo dueño: agrégalo en tools/regla-dueno-estado.js.`});
        else if (dueno !== yo && yo !== LIBRE) context.report({node, message: `S.${campo} solo se escribe en js/${dueno}.js: usa una de sus funciones.`});
      }
    };
  }
};
