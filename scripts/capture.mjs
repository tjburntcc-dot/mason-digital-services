import puppeteer from "puppeteer-core";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "http://127.0.0.1:8080";
const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const pages = [
  { path: "/", file: "assets/img/screenshots/home-fold-desktop.png", width: 1280, height: 800, full: false },
  { path: "/", file: "assets/img/screenshots/home-desktop.png", width: 1280, height: 800, full: true },
  { path: "/", file: "assets/img/screenshots/home-mobile.png", width: 390, height: 844, full: true },
  { path: "/work/", file: "assets/img/screenshots/work-desktop.png", width: 1280, height: 800, full: true },
  { path: "/work/website-rescue/", file: "work/website-rescue/screenshots/repair-log-desktop.png", width: 1280, height: 800, full: true },
  { path: "/work/website-rescue/before.html", file: "work/website-rescue/screenshots/before-desktop.png", width: 1280, height: 800, full: false },
  { path: "/work/website-rescue/after.html", file: "work/website-rescue/screenshots/after-desktop.png", width: 1280, height: 800, full: true },
  { path: "/work/intake-automation/", file: "work/intake-automation/screenshots/workflow-desktop.png", width: 1280, height: 900, full: true },
  { path: "/work/ops-dashboard/board.html", file: "work/ops-dashboard/screenshots/dashboard-desktop.png", width: 1280, height: 900, full: true },
  { path: "/work/ops-dashboard/board.html", file: "work/ops-dashboard/screenshots/dashboard-mobile.png", width: 390, height: 844, full: true },
  { path: "/privacy.html", file: "assets/img/screenshots/privacy-desktop.png", width: 1280, height: 800, full: false },
  { path: "/terms.html", file: "assets/img/screenshots/terms-desktop.png", width: 1280, height: 800, full: false }
];

const errors = [];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox"]
});

async function shot(spec, after) {
  const page = await browser.newPage();
  page.on("pageerror", (err) => errors.push(`${spec.path} pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`${spec.path} console: ${msg.text()}`);
  });
  await page.setViewport({ width: spec.width, height: spec.height, deviceScaleFactor: 1 });
  const res = await page.goto(origin + spec.path, { waitUntil: "networkidle0", timeout: 30000 });
  if (!res || res.status() >= 400) errors.push(`HTTP ${res && res.status()} ${spec.path}`);
  // Let reveal-on-scroll settle (real users see this immediately on scroll;
  // a full-page capture renders the whole document in one frame with no
  // scroll events, so give the IntersectionObserver/timeout fallback a beat).
  await new Promise((r) => setTimeout(r, 250));
  if (spec.full) {
    await page.evaluate(() => document.querySelectorAll(".js-reveal").forEach((el) => el.classList.add("is-visible")));
  }
  if (after) await after(page);
  const out = join(root, spec.file);
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, fullPage: spec.full });
  await page.close();
}

async function clipRatio(urlPath, selector, file, from = "start") {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page.goto(origin + urlPath, { waitUntil: "networkidle0", timeout: 30000 });
  const el = await page.$(selector);
  if (!el) throw new Error("Missing " + selector + " on " + urlPath);
  await el.evaluate((node) => node.scrollIntoView({ block: "center" }));
  const box = await el.boundingBox();
  const width = Math.min(Math.round(box.width), 1280);
  const height = Math.round(width * 10 / 16);
  const x = Math.max(0, box.x + (box.width - width) / 2);
  const y = from === "start"
    ? Math.max(0, box.y)
    : Math.max(0, box.y + box.height / 2 - height / 2);
  const out = join(root, file);
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, clip: { x, y, width, height } });
  await page.close();
}

await shot(
  {
    path: "/work/intake-automation/",
    file: "work/intake-automation/screenshots/intake-card.png",
    width: 1280,
    height: 800,
    full: false
  },
  async (page) => {
    await page.addStyleTag({
      content: `
        .demo-banner,
        .site-header,
        .site-footer,
        .quiet,
        .section h2,
        .section .wrap > p:first-of-type { display: none !important; }
        .page-hero { padding: 2.2rem 0 0.3rem; }
        .page-hero p { display: none; }
        .section { padding-top: 0.3rem !important; }
        .intake-flow { margin-top: 1.1rem !important; }
        .intake-row { padding: 1.3rem 1.4rem; }
        .intake-text { font-size: 1.05rem; }
      `
    });
  }
);
await clipRatio("/work/ops-dashboard/board.html", ".dash-shell", "work/ops-dashboard/screenshots/dashboard-card.png", "start");
await shot({ path: "/work/website-rescue/after.html", file: "work/website-rescue/screenshots/after-card.png", width: 1280, height: 800, full: false });

for (const spec of pages) {
  await shot(spec);
}

await shot(
  {
    path: "/work/intake-automation/technical.html",
    file: "work/intake-automation/screenshots/tests-passed.png",
    width: 1280,
    height: 900,
    full: true
  },
  async (page) => {
    await page.click("#run-tests");
    await page.waitForSelector(".status-pass, .status-fail", { timeout: 5000 });
  }
);

const ogPage = await browser.newPage();
await ogPage.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const svg = readFileSync(join(root, "assets/img/og.svg"), "utf8");
await ogPage.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`);
await ogPage.screenshot({ path: join(root, "assets/img/og.png") });
await ogPage.close();

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS  screenshots captured, no console/page errors");
}
