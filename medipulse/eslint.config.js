// Revisor automático del código (ESLint). Se corre con `npm run revisar`, que también busca nombres repetidos
// entre archivos (tools/globales.js). Solo reglas que encuentran errores reales, no de estilo.
const globals = require("globals");
const { mapa } = require("./tools/globales.js");
const dueno = require("./tools/regla-dueno-estado.js");

// Cada archivo usa lo que declaran los demás: todos los nombres de la app son globales conocidos.
const deLaApp = Object.fromEntries(Object.keys(mapa()).map(n => [n, "writable"]));

module.exports = [
  {
    files: ["js/**/*.js", "data/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...deLaApp,
        pdfjsLib: "readonly",     // vendor/pdf.min.mjs (módulo; queda en window.pdfjsLib)
        Anthropic: "readonly"     // vendor/anthropic-sdk.mjs, cuando se carga
      }
    },
    linterOptions: { reportUnusedDisableDirectives: "error" },
    plugins: { medipulse: { rules: { "dueno-del-estado": dueno } } },
    rules: {
      "medipulse/dueno-del-estado": "error",   // cada parte del progreso (S) la escribe solo su archivo dueño
      "no-undef": "error",              // un nombre que no existe en ningún archivo (p. ej. un error al escribirlo)
      "no-redeclare": ["error", {builtinGlobals: false}],   // el mismo nombre declarado dos veces en un archivo
      "no-dupe-keys": "error",          // la misma clave dos veces en un objeto
      "no-dupe-args": "error",
      "no-duplicate-case": "error",
      "no-unreachable": "error",        // código que nunca se ejecuta
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-cond-assign": ["error", "except-parens"],
      "no-constant-condition": ["error", {checkLoops: false}],
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      "no-template-curly-in-string": "error",   // «${…}» dentro de comillas normales: se vería el código en pantalla
      "no-unused-vars": ["error", {vars: "local", args: "none", caughtErrors: "none"}]
    }
  },
  {
    // El service worker: otro ámbito, sin los nombres de la app.
    files: ["sw.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "script", globals: { ...globals.serviceworker } },
    rules: { "no-undef": "error", "no-unused-vars": ["error", {args: "none", caughtErrors: "none"}] }
  },
  {
    // Herramientas y configuración: Node.
    files: ["tools/**/*.js", "eslint.config.js", "playwright.config.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "commonjs", globals: { ...globals.node } },
    rules: { "no-undef": "error", "no-unused-vars": ["error", {args: "none", caughtErrors: "none"}] }
  },
  {
    // Herramientas que corren código dentro de la app (page.evaluate): también ven los nombres de la app.
    files: ["tools/banco-pdf.js"],
    languageOptions: { globals: { ...globals.browser, ...deLaApp, pdfjsLib: "readonly" } }
  }
];
