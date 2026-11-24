import { chromium } from "playwright";
import fs from "node:fs";

const base = process.env.SITE_URL || "http://127.0.0.1:4187";
const browserPath = [
  "/home/urielk/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome",
  "/home/urielk/.cache/ms-playwright/chromium-1248/chrome-linux/chrome",
].find(p => fs.existsSync(p));
const browser = await chromium.launch({ headless: true, executablePath: browserPath || undefined, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.locator('input[name="nombre"]').fill("Persona de prueba");
  await page.locator('input[name="whatsapp"]').fill("+58 412 000 0000");
  await page.locator('input[name="negocio"]').fill("Tienda de prueba");
  await page.locator('select[name="servicio"]').selectOption("Edición y postproducción");
  await page.locator('select[name="plazo"]').selectOption("En las próximas dos semanas");
  await page.locator('input[name="email"]').fill("ejemplo@ejemplo.test");
  await page.locator('textarea[name="descripcion"]').fill("Videos breves para redes");
  await page.locator('input[name="consentimiento_contacto"]').check();
  // Do not send to Netlify; capture using a sandboxed DOM submit event.
  const captured = await page.locator('form[name="laura-consultas-audiovisuales"]').evaluate(el => {
    el.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    return window.sessionStorage.getItem("laura:consulta:whatsapp");
  });
  if (!captured || JSON.parse(captured).negocio !== "Tienda de prueba") throw Error("Session capture failed");
  await page.goto(base + "/gracias/", { waitUntil: "domcontentloaded" });
  const link = page.locator(".thanks-whatsapp-cta");
  await link.waitFor();
  await page.waitForFunction(() => {
    const a = document.querySelector(".thanks-whatsapp-cta");
    return a && a.href.includes("Tienda%20de%20prueba");
  });
  const href = await link.getAttribute("href");
  const parsed = new URL(href);
  const message = parsed.searchParams.get("text") || "";
  for (const part of ["Persona de prueba","Tienda de prueba","Edición y postproducción","En las próximas dos semanas","Videos breves para redes"]) {
    if (!message.includes(part)) throw Error("Missing form field in WhatsApp draft: " + part);
  }
  if (!href.startsWith("https://wa.me/584242196550?text=")) throw Error("Incorrect WhatsApp recipient");
  const storage = await page.evaluate(() => window.sessionStorage.getItem("laura:consulta:whatsapp"));
  if (storage) throw Error("Session data should be consumed on thank-you page");
  if (new URL(page.url()).search) throw Error("Personal data in the success URL");
  const ctaHeight = await link.evaluate(e => e.getBoundingClientRect().height);
  if (ctaHeight < 60) throw Error("CTA is not prominent enough");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (overflow || errors.length) throw Error("Responsive errors: " + errors.join("; "));
  await page.reload();
  const fallback = await link.getAttribute("href");
  if (fallback.includes("Persona%20de%20prueba")) throw Error("Form data leaked into reloaded page");
  console.log("THANKS_WHATSAPP_PASS", JSON.stringify({ url: base, ctaHeight, messageFields: 5, noPIIInSuccessUrl: true, clearsSession: true, noOverflow: true }));
  await page.close();
} finally { await browser.close(); }
