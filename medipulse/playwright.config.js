// Pruebas de MediPulse con Playwright Test.
//   npm test              → corre todas las pruebas
//   npm run test:ui       → modo visual (ver cada paso, repetir una prueba)
//   En VS Code: extensión "Playwright Test for VSCode" (ms-playwright.playwright); las pruebas aparecen
//   en el panel de pruebas (ícono del matraz) y se pueden correr o depurar una por una.
// Ninguna prueba usa la API real de Claude ni internet: las respuestas de la IA se simulan.
const { defineConfig } = require("@playwright/test");

const PORT = 4173;
module.exports = defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}/`,
    viewport: {width: 360, height: 800},   // primero celular: sin desplazamiento horizontal a 360 px
    trace: "off",
    // Las pruebas corren en modo de prueba (sin los candados del diagnóstico); las del diagnóstico
    // lo apagan para probar los candados (tests/diagnostico.spec.js). La pregunta de confianza en la práctica
    // está apagada para que un toque en una opción muestre la respuesta; tests/practica-diaria.spec.js la prende.
    storageState: {cookies: [], origins: [{origin: `http://localhost:${PORT}`, localStorage: [{name: "medipulse_prueba", value: "1"}, {name: "medipulse_bienvenida", value: "1"}, {name: "medipulse_confianza", value: "0"}]}]}
  },
  webServer: {
    command: `node tests/servidor.js ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI
  },
  projects: [{name: "celular", use: {browserName: "chromium"}}]
});
