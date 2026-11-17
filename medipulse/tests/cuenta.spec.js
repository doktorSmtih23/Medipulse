// Inicio de sesión de la beta (js/cuenta.js) con un Supabase simulado: nunca se usa el servidor real.
const { test, expect } = require("@playwright/test");
const { vigilarErrores } = require("./ayudas");

const URL_SB = "https://prueba.supabase.co";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const token = email => `${b64({alg: "HS256"})}.${b64({email, role: "authenticated"})}.firma`;
const SESION = email => ({access_token: token(email), refresh_token: "r-" + email, expires_in: 3600, user: {email}});
const json = (route, status, body) => route.fulfill({status, headers: {"content-type": "application/json", "access-control-allow-origin": "*", "access-control-allow-headers": "*"}, body: JSON.stringify(body)});

// Activa el servidor en data/servidor.js y simula la API de Supabase Auth. responder(ruta, body) → [status, json]
async function conServidor(page, responder, {anon = "anon-publica"} = {}){
  const llamadas = [];
  await page.route("**/data/servidor.js", r => r.fulfill({contentType: "text/javascript", body: `const MP_SERVIDOR = {url: "${URL_SB}", anon: "${anon}"};`}));
  await page.route(URL_SB + "/auth/v1/**", async r => {
    if (r.request().method() === "OPTIONS") return json(r, 200, {});
    const ruta = r.request().url().slice((URL_SB + "/auth/v1/").length), body = r.request().postDataJSON();
    llamadas.push({ruta, body, apikey: r.request().headers()["apikey"]});
    const [st, d] = await responder(ruta, body); return json(r, st, d);
  });
  return llamadas;
}

let errores;
test.beforeEach(({ page }) => { errores = vigilarErrores(page, {ignorar: [/status of [45]\d\d/]}); });
test.afterEach(() => expect(errores, "errores de JavaScript").toEqual([]));

test("sin servidor configurado la app abre como siempre, sin pedir correo", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#loginGate")).toBeHidden();
  await expect(page.locator("nav.bottom")).toBeVisible();
});

test("una persona invitada entra con el código del correo y ve su sesión en Progreso", async ({ page }) => {
  const llamadas = await conServidor(page, ruta => ruta.startsWith("otp") ? [200, {}] : ruta === "verify" ? [200, SESION("ana@ejemplo.com")] : [404, {}]);
  await page.goto("/");
  await expect(page.locator("#loginGate")).toBeVisible();
  await expect(page.locator("#loginGate")).not.toContainText("Creado por");
  await expect(page.locator("nav.bottom")).toBeHidden();
  await page.fill("#lgMail", "Ana@Ejemplo.com ");
  await page.click("#lgGo");
  await expect(page.locator("#lgCode")).toBeVisible();
  expect(llamadas[0].body).toEqual({email: "ana@ejemplo.com", create_user: false});   // no crea cuentas: solo invitados
  expect(llamadas[0].ruta).toContain("redirect_to=");
  expect(llamadas[0].apikey).toBe("anon-publica");
  await page.fill("#lgTok", "123456");
  await page.click("#lgVer");
  await expect(page.locator("#loginGate")).toBeHidden();
  expect(llamadas[1].body).toEqual({type: "email", email: "ana@ejemplo.com", token: "123456"});
  await page.click("nav [data-go=prog]");
  await expect(page.locator("#cuentaBox")).toContainText("ana@ejemplo.com");
  await page.reload();   // la sesión queda guardada
  await expect(page.locator("#loginGate")).toBeHidden();
});

test("un correo no invitado recibe un mensaje claro", async ({ page }) => {
  await conServidor(page, () => [422, {code: 422, error_code: "otp_disabled", msg: "Signups not allowed for otp"}]);
  await page.goto("/");
  await page.fill("#lgMail", "otro@ejemplo.com");
  await page.click("#lgGo");
  await expect(page.locator("#lgMsg")).toContainText("no está invitado");
  await expect(page.locator("#lgCode")).toBeHidden();
});

test("el enlace del correo abre la sesión y se borra de la dirección", async ({ page }) => {
  await conServidor(page, () => [200, SESION("ana@ejemplo.com")]);
  await page.goto(`/#access_token=${token("ana@ejemplo.com")}&expires_in=3600&refresh_token=r1&token_type=bearer&type=magiclink`);
  await expect(page.locator("#loginGate")).toBeHidden();
  expect(page.url()).not.toContain("access_token");
  expect(await page.evaluate(() => leerSesion().email)).toBe("ana@ejemplo.com");
});

test("un enlace vencido lo dice y pide un correo nuevo", async ({ page }) => {
  await conServidor(page, () => [200, {}]);
  await page.goto("/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired");
  await expect(page.locator("#loginGate")).toContainText("venció");
});

test("si le quitaron el acceso, al renovar la sesión vuelve a pedir el correo sin borrar sus datos", async ({ page }) => {
  await conServidor(page, ruta => ruta.startsWith("token") ? [400, {error_code: "refresh_token_not_found", msg: "Invalid Refresh Token"}] : [200, {}]);
  await page.addInitScript(t => { localStorage.setItem("medipulse_sesion", JSON.stringify({access: t, refresh: "viejo", email: "ana@ejemplo.com", exp: Date.now() - 1000}));
    localStorage.setItem("medipulse_v2", JSON.stringify({apuntes: [{id: "l1", title: "Mi libreta", spec: "Pediatría", entries: []}]})); }, token("ana@ejemplo.com"));
  await page.goto("/");
  await expect(page.locator("#loginGate")).toContainText("Tu sesión terminó");
  expect(await page.evaluate(() => S.apuntes[0].title)).toBe("Mi libreta");
});

test("sin internet o con el servidor caído entra con la sesión guardada", async ({ page }) => {
  await conServidor(page, () => [503, {}]);
  await page.addInitScript(t => localStorage.setItem("medipulse_sesion", JSON.stringify({access: t, refresh: "r", email: "ana@ejemplo.com", exp: Date.now() - 1000})), token("ana@ejemplo.com"));
  await page.goto("/");
  await page.waitForTimeout(300);
  await expect(page.locator("nav.bottom")).toBeVisible();
  await expect(page.locator("#loginGate")).toBeHidden();
});

test("cerrar sesión vuelve a la pantalla de entrada y conserva los datos", async ({ page }) => {
  await conServidor(page, () => [204, {}]);
  await page.addInitScript(t => localStorage.setItem("medipulse_sesion", JSON.stringify({access: t, refresh: "r", email: "ana@ejemplo.com", exp: Date.now() + 36e5})), token("ana@ejemplo.com"));
  await page.goto("/");
  await page.evaluate(() => { S.userH.push({id: "u1", specialty: "Cirugía", title: "Mía", thresholds: [{label: "a", val: "b"}]}); save(); });
  await page.click("nav [data-go=prog]");
  await page.click("#logoutBtn");
  await expect(page.locator("#loginGate")).toContainText("Cerraste sesión");
  expect(await page.evaluate(() => [leerSesion(), S.userH.length])).toEqual([null, 1]);
});

test("si por error se pone la clave secreta, no se usa", async ({ page }) => {
  await conServidor(page, () => [200, {}], {anon: `${b64({alg: "HS256"})}.${b64({role: "service_role"})}.x`});
  errores = vigilarErrores(page, {ignorar: [/service_role/]});
  await page.goto("/");
  await expect(page.locator("#loginGate")).toBeHidden();
});
