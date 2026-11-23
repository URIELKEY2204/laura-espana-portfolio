import { chromium } from "playwright";
import fs from "node:fs";

const site = process.env.SITE_URL || "http://127.0.0.1:4187";
const cands = [
  "/home/urielk/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome",
  "/home/urielk/.cache/ms-playwright/chromium-1248/chrome-linux/chrome",
];
const path = cands.find(p => fs.existsSync(p));
const browser = await chromium.launch({ headless: true, executablePath: path || undefined, args: ["--no-sandbox"] });
const results = [];
try {
  for (const { width, reduceMotion } of [
    { width: 375, reduceMotion: false },
    { width: 1280, reduceMotion: false },
    { width: 375, reduceMotion: true },
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 850 }, reducedMotion: reduceMotion ? "reduce" : "no-preference" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(site + "/portafolio/", { waitUntil: "domcontentloaded", timeout: 30000 });
    if (response?.status() !== 200) throw Error("portfolio HTTP " + response?.status());
    const vids = page.locator("video.project-preview-motion");
    if (await vids.count() !== 6) throw Error("Expected six animated previews");
    if (await page.locator(".project-preview-poster").count() !== 6) throw Error("Expected six fallback images");
    const first = vids.first();
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    const preview = await first.evaluate(v => ({
      source: new URL(v.src).pathname,
      muted: v.muted,
      loop: v.loop,
      duration: v.duration,
      paused: v.paused,
      currentTime: v.currentTime,
      readyState: v.readyState,
    }));
    if (!preview.source.startsWith("/videos/previews/")) throw Error("Incorrect preview URL " + preview.source);
    if (!preview.muted || !preview.loop) throw Error("Previews must be muted and looped");
    if (!reduceMotion) {
      await page.waitForFunction(() => {
        const v = document.querySelector("video.project-preview-motion");
        return v && !v.paused && v.readyState >= 2 && v.currentTime > 0;
      }, null, { timeout: 10000 });
      const dur = await first.evaluate(v => v.duration);
      if (dur > 2.05 || dur < 1.9) throw Error("Preview duration is not two seconds: " + dur);
    } else {
      if (!preview.paused) throw Error("Reduced-motion setting must not autoplay");
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) throw Error("Horizontal overflow at " + width);
    const original = "/videos/projects/extractor-de-jugo.mp4";
    await page.getByRole("button", { name: "Reproducir video completo de Extractor de jugo" }).click();
    const full = page.locator("video.project-full-video");
    await full.waitFor();
    const playback = await full.evaluate(v => ({
      src: new URL(v.src).pathname, controls: v.controls, full: v.duration, muted: v.muted,
    }));
    if (playback.src !== original || !playback.controls) throw Error("Full-video action is broken");
    await page.getByRole("button", { name: "Cerrar video completo de Extractor de jugo" }).click();
    if (await page.locator(".project-full-video").count()) throw Error("Full video did not close");
    if (errors.length) throw Error("JS page errors: " + errors.join("; "));
    results.push({ width, reduceMotion, previews: await vids.count(), preview, fullVideo: playback.src, overflow });
    await page.close();
  }
  console.log("VIDEO_PREVIEW_TESTS_PASS", JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
