// ===================================================================
// RECOMENDACIONES POR GRADO, SIN IA: solo en documentos que gradúan sus recomendaciones. Reconoce
// AHA/ACC (COR y LOE), ESC (clase I, IIa, IIb, III y nivel), GRADE en español e inglés (fuerte o
// débil, a favor o en contra) y NICE (Offer, Consider, Do not), además de los puntos de buena
// práctica. La salida se ordena por lo que significa para la conducta: lo que se hace, lo que puede
// considerarse y lo que no se hace. En un ensayo, metaanálisis u observacional no hay
// recomendaciones: se muestran los resultados con cifras. Sin sistema de grados, la tarea es de la IA.
// ===================================================================
const REC_GRUPOS = {
  hace: {t: "✅ Lo que se hace", d: "Clase I · recomendación fuerte a favor"},
  considerar: {t: "🤔 Puede considerarse", d: "Clase IIa o IIb · recomendación débil o condicional"},
  no: {t: "⛔ Lo que no se hace", d: "Clase III · recomendación en contra"},
  bp: {t: "📌 Puntos de buena práctica", d: "Consenso de expertos, sin grado"}
};
// Texto de un enunciado: sin cortes de palabra, saltos ni las citas numéricas del final («… PE. 1 , 2»).
function recLimpia(t){
  return String(t).replace(/(\p{L})\s?-\s*\n\s*(\p{Ll})/gu, "$1$2").replace(/\s*\n\s*/g, " ").replace(/(\p{Ll}) - (\p{Ll})/gu, "$1$2").replace(/\s+/g, " ")
    .replace(/(\.)\s*\d+(\s*[,–-]\s*\d+)*\s*$/, "$1").replace(/\s+\d+(\s*[,–-]\s*\d+)*\s*$/, "").replace(/\s+([.,;])/g, "$1").trim();
}
const recSubtema = p => { try { return cur() ? subtemaDe(p) : ""; } catch(e) { return ""; } };
const REC_CONTRA = /\b(recomendamos no|no recomendamos|sugerimos no|no sugerimos|se recomienda no|no se recomienda|no se sugiere|recommend against|suggest against|should not|is not recommended)\b/i;
const AHA_COR = "(1|2a|2b|3:\\s?(?:No\\s+Benefit|Harm)|3)", AHA_LOE = "(A|B-R|B-NR|C-LD|C-EO)";

function recsPorGrado(sel){
  const out = [], push = (text, page, grupo, clase, sis) => {
    text = recLimpia(text); if (text.length < 25 || text.length > 900) return;
    out.push({text, page, grupo, sis, clase: String(clase).replace(/\s+/g, " ").replace(/(\p{L}) - (\p{Ll})/gu, "$1$2").trim(), cifras: [...new Set((text.match(CIFRA_RE) || []).map(x => x.trim()))].filter(x => !/^(19|20)\d{2}$/.test(x)).slice(0, 4), on: false});
  };
  sel.pages.forEach((txt, i) => {
    const page = sel.nums[i], t = String(txt || "");
    // AHA/ACC: «2a B-R\n3. In adult patients…» hasta el siguiente par COR/LOE o el fin de la tabla.
    const aha = new RegExp(`(?:^|\\n)${AHA_COR}\\s+${AHA_LOE}\\s*\\n\\s*\\d{1,2}\\.\\s+([\\s\\S]+?)(?=\\n${AHA_COR}\\s+${AHA_LOE}\\s*\\n|\\n\\*|\\n(?:Synopsis|Recommendation-Specific|Relevant|Table|Figure)\\b|\\n\\d+(?:\\.\\d+)+\\.\\s|$)`, "g");
    for (const m of t.matchAll(aha)) {
      const cor = m[1].replace(/\s+/g, " "), g = cor === "1" ? "hace" : /^2/.test(cor) ? "considerar" : "no";
      push(m[3], page, g, `COR ${cor} · LOE ${m[2]}`);
    }
    // GRADE en español, en el texto: «Recomendación 1.1 Sugerimos … (Débil, Moderada calidad).»
    const plano = t.replace(/\n/g, " ");
    for (const m of plano.matchAll(/Recomendaci[oó]n\s+(\d+(?:\.\d+)?)\s+(.{20,900}?)\s*\((Fuerte|D[eé]bil|Condicional)\s*,?\s*([^)]{0,30}?calidad|[^)]{0,30}?evidencia)?\s*\)/g)) {
      const fuerte = /fuerte/i.test(m[3]);
      push(m[2], page, REC_CONTRA.test(m[2]) ? "no" : fuerte ? "hace" : "considerar", `${m[3]}${m[4] ? " · " + m[4].trim() : ""} · Rec. ${m[1]}`);
    }
    // GRADE en español, en la tabla resumen: «3.1 Recomendamos no usar … Fuerte Moderada calidad».
    for (const m of plano.matchAll(/(?:^|\s)(\d{1,2}(?:\.\d{1,2})?)\s+((?:Recomendamos|Sugerimos|No recomendamos|No sugerimos|Se recomienda|Se sugiere)\s.{15,700}?)\s+(Fuerte|D[eé]bil)\s+(Alta|Moderada|Baja|Muy baja)\s+calidad/g)) {
      const fuerte = /fuerte/i.test(m[3]);
      push(m[2], page, REC_CONTRA.test(m[2]) ? "no" : fuerte ? "hace" : "considerar", `${m[3]} · ${m[4]} calidad · Rec. ${m[1]}`);
    }
    // GRADE en inglés: «We recommend … (strong recommendation, moderate-quality evidence).»
    for (const m of plano.matchAll(/((?:We|The (?:panel|committee|guideline))\s+(?:recommends?|suggests?)\s.{15,700}?\.)\s*\((strong|weak|conditional)\b([^)]{0,80})\)/gi)) {
      push(m[1], page, REC_CONTRA.test(m[1]) ? "no" : /strong/i.test(m[2]) ? "hace" : "considerar", `${m[2].toLowerCase() === "strong" ? "Fuerte" : "Débil/condicional"}${m[3].trim() ? " · " + m[3].replace(/^[,;\s]+/, "").trim() : ""}`);
    }
    // ESC: «… should be considered. IIa B» al final del enunciado, en la tabla de recomendaciones.
    for (const m of t.matchAll(/(?:^|\n)([A-Z][^\n]{15,}(?:\n(?!(?:I|IIa|IIb|III)\s+[ABC]\s*(?:\n|$))[^\n]+){0,8}?)\s+(I|IIa|IIb|III)\s+([ABC])\s*(?=\n|$)/g)) {
      const c = m[2], g = c === "I" ? "hace" : c === "III" ? "no" : "considerar";
      push(m[1], page, g, `Clase ${c} · Nivel ${m[3]}`, "esc");
    }
    // NICE: «1.2.3 Offer … / Consider … / Do not offer …».
    for (const m of t.matchAll(/(?:^|\n)\d+\.\d+\.\d+\s+((Offer|Consider|Do not|Don't)\b[\s\S]{15,700}?)(?=\n\d+\.\d+\.\d+\s|\n\n|$)/g)) {
      push(m[1], page, /^(Do not|Don't)/.test(m[2]) ? "no" : m[2] === "Offer" ? "hace" : "considerar", "NICE", "nice");
    }
    // Puntos de buena práctica.
    for (const m of plano.matchAll(/(?:Punto de buena pr[aá]ctica|Good practice (?:point|statement)|Best practice statement)\s*:?\s*(.{20,600}?\.)(?=\s+(?:\p{Lu}|$))/gu)) push(m[1], page, "bp", "Buena práctica");
  });
  // Además, el lector de enunciados de siempre (buscarRecomendaciones, indice.js): toma la clase escrita en
  // el mismo renglón («1 B-NR In patients…») o al final del enunciado anterior (tablas AHA a dos columnas).
  buscarRecomendaciones(sel, 300).filter(x => x.clase).forEach(x => {
    const c = x.clase.match(/^(?:COR|Clase)\s+(\S+)/), k = c ? c[1] : "";
    const g = /^(1|I)$/.test(k) ? "hace" : /^(2a|2b|IIa|IIb)$/.test(k) ? "considerar" : "no";
    out.push({text: x.text, page: x.page, grupo: g, sis: /^Clase/.test(x.clase) ? "esc" : "aha", clase: x.clase, cifras: x.cifras, on: false});
  });
  // ESC y NICE se reconocen por un patrón más suelto: cuentan solo si el documento los usa varias veces
  // (una guía real trae decenas; «tipo I C» suelto en una revisión no es una recomendación).
  const n = s => out.filter(x => x.sis === s).length;
  ["esc", "nice"].forEach(s => { if (n(s) < 3) for (let i = out.length - 1; i >= 0; i--) if (out[i].sis === s) out.splice(i, 1); });
  // Sin repetidos (la recomendación del texto y la de la tabla resumen): se queda la primera.
  const vistas = new Set();
  return out.filter(x => { const k = norm(x.text).replace(/[^a-z0-9]/g, "").slice(0, 70); if (vistas.has(k)) return false; vistas.add(k); return true; })
    .map(x => Object.assign(x, {subtema: recSubtema(x.page)}));
}

// En un estudio original: las frases de los resultados que traen el efecto con sus cifras.
const REC_EFECTO = /(hazard ratio|risk ratio|odds ratio|relative risk|rate ratio|raz[oó]n de (riesgos|momios|tasas|odds)|riesgo relativo|\bHR\b[ ,:=]+\d|\bRR\b[ ,:=]+\d|\bOR\b[ ,:=]+\d|95% ?CI|IC (del )?95|NNT|number needed to|absolute (risk )?(difference|reduction)|diferencia absoluta)/i;
function resultadosConCifras(sel, max = 15){
  const out = [];
  sel.pages.forEach((txt, i) => {
    const plano = recLimpia(txt);
    plano.split(/(?<=[.])\s+(?=[A-Z(])/).forEach(f => {
      f = f.replace(/^(Background|Methods|Results|Conclusions?|Resultados|Conclusiones)\s+/, "");
      if (f.length < 40 || f.length > 600 || !REC_EFECTO.test(f) || !/\d\s?%|\d[.,]\d/.test(f) || JUNK.test(f)) return;
      if (/\b(power to detect|we calculated|sample size|would be required|tamaño de (la )?muestra)\b/i.test(f)) return;   // métodos, no resultados
      if (/^(table|figure|fig\.|tabla|figura)\b/i.test(f) || (f.match(/\d/g) || []).length > f.length * 0.25) return;
      out.push({text: f, page: sel.nums[i], grupo: "res", clase: "", cifras: [], on: false});
    });
  });
  const vistas = new Set();
  return out.filter(x => { const k = norm(x.text).slice(0, 60); if (vistas.has(k)) return false; vistas.add(k); return true; }).slice(0, max)
    .map(x => Object.assign(x, {subtema: recSubtema(x.page)}));
}
