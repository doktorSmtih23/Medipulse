// Utilidades compartidas por las pruebas.
const path = require("path");
const { expect } = require("@playwright/test");

const PDF_PRUEBA = path.join(__dirname, "fixtures", "articulo-prueba.pdf");

// Junta los errores de JavaScript de la página. Al final de cada prueba: expect(errores).toEqual([]).
function vigilarErrores(page, {ignorar = []} = {}){
  const errores = [];
  const ok = m => ignorar.some(r => r.test(m));
  page.on("pageerror", e => { if (!ok(e.message)) errores.push(e.message); });
  page.on("console", m => { if (m.type() === "error" && !ok(m.text())) errores.push(m.text()); });
  page.on("dialog", d => d.accept());
  return errores;
}

// Simula la API de Claude. `responder(body)` devuelve:
//   {tool: "nombre", input: {...}}  → respuesta con herramienta (callForTool)
//   {json: {...}}                    → respuesta de texto JSON (output_config.format)
//   {status: 500}                    → error del servicio
// Devuelve la lista de peticiones recibidas para revisar qué se envió.
async function simularIA(page, responder){
  const peticiones = [];
  const ev = (t, d) => `event: ${t}\ndata: ${JSON.stringify(d)}\n\n`;
  await page.route("https://api.anthropic.com/**", async route => {
    const body = route.request().postDataJSON(); peticiones.push(body);
    const r = await responder(body);
    if (r.status) return route.fulfill({status: r.status, headers: {"content-type": "application/json", "access-control-allow-origin": "*"},
      body: JSON.stringify({type: "error", error: {type: "api_error", message: "simulado"}})});
    const block = r.tool ? {type: "tool_use", id: "toolu_1", name: r.tool, input: {}} : {type: "text", text: ""};
    const delta = r.tool ? {type: "input_json_delta", partial_json: JSON.stringify(r.input)} : {type: "text_delta", text: JSON.stringify(r.json)};
    const sse = ev("message_start", {type: "message_start", message: {id: "msg_1", type: "message", role: "assistant", model: "simulado", content: [], stop_reason: null, stop_sequence: null, usage: {input_tokens: 1, output_tokens: 1}}})
      + ev("content_block_start", {type: "content_block_start", index: 0, content_block: block})
      + ev("content_block_delta", {type: "content_block_delta", index: 0, delta})
      + ev("content_block_stop", {type: "content_block_stop", index: 0})
      + ev("message_delta", {type: "message_delta", delta: {stop_reason: r.tool ? "tool_use" : "end_turn", stop_sequence: null}, usage: {output_tokens: 5}})
      + ev("message_stop", {type: "message_stop"});
    await route.fulfill({status: 200, headers: {"content-type": "text/event-stream", "access-control-allow-origin": "*"}, body: sse});
  });
  return peticiones;
}

async function abrirConClave(page){
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("medipulse_api_key", "sk-ant-prueba"));
  await page.reload();
}

// Sube el PDF de prueba desde Fuentes y espera a que abra su detalle.
async function subirPdf(page, archivo = PDF_PRUEBA){
  await page.click("nav [data-go=lib]");
  await page.setInputFiles("#pdfIn", archivo);
  await expect(page.locator("#anCard")).toBeVisible({timeout: 30_000});
}

// Sin desplazamiento horizontal en la pantalla actual.
const sinDesborde = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);

module.exports = { PDF_PRUEBA, vigilarErrores, simularIA, abrirConClave, subirPdf, sinDesborde };
