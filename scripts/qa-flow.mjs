import puppeteer from "puppeteer-core";

const origin = "http://127.0.0.1:8080";
const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const errors = [];
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox"]
});

function onPage(page, label) {
  page.on("pageerror", (err) => errors.push(`${label} pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`${label} console: ${msg.text()}`);
  });
}

const home = await browser.newPage();
onPage(home, "home");
await home.setViewport({ width: 390, height: 844 });
await home.goto(origin + "/", { waitUntil: "networkidle0" });
const overflow = await home.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
);
if (overflow) throw new Error("Horizontal overflow on mobile home");
const toggle = await home.$("[data-nav-toggle]");
if (!toggle) throw new Error("Missing mobile menu toggle");
await toggle.click();
const expanded = await home.$eval("[data-nav-toggle]", (el) => el.getAttribute("aria-expanded"));
const navOpen = await home.$eval("#site-nav", (el) => el.classList.contains("is-open"));
if (expanded !== "true" || !navOpen) throw new Error("Mobile nav did not open");
await home.keyboard.press("Escape");
const closed = await home.$eval("#site-nav", (el) => el.classList.contains("is-open"));
if (closed) throw new Error("Escape did not close nav");
if (await home.$("a.work-card")) throw new Error("Work cards must be static, not links");
const homeText = await home.$eval("body", (el) => el.innerText);
if (/view project/i.test(homeText)) throw new Error("View Project still on the public home page");
if (await home.$("#lead-form")) throw new Error("Public home must not include intake controls");
await home.close();
console.log("PASS  mobile nav");

const intake = await browser.newPage();
onPage(intake, "intake");
await intake.setViewport({ width: 1280, height: 800 });
await intake.goto(origin + "/work/intake-automation/", { waitUntil: "networkidle0" });
if (await intake.$("#lead-form")) throw new Error("Public intake walkthrough still has process-lead controls");
const walkthrough = await intake.$eval("body", (el) => el.innerText);
if (!/what it is/i.test(walkthrough) || !/technical details/i.test(walkthrough)) {
  throw new Error("Intake walkthrough missing expected sections");
}
await intake.close();
console.log("PASS  intake walkthrough is passive");

const tech = await browser.newPage();
onPage(tech, "intake-notes");
await tech.goto(origin + "/work/intake-automation/technical.html", { waitUntil: "networkidle0" });
await tech.waitForSelector("#fixture-select option[value='lead-01']");
await tech.select("#fixture-select", "lead-05");
await tech.click("#lead-form button[type='submit']");
await tech.waitForFunction(() => document.getElementById("output").textContent.includes("emergency"));
await tech.click("#run-tests");
await tech.waitForSelector(".status-pass");
const summary = await tech.$eval("#test-results", (el) => el.textContent);
if (!summary.includes("5 / 5 passed")) throw new Error("Fixture tests did not report 5 / 5: " + summary);
await tech.close();
console.log("PASS  intake technical notes still testable");

const dash = await browser.newPage();
onPage(dash, "dash");
await dash.setViewport({ width: 1280, height: 800 });
await dash.goto(origin + "/work/ops-dashboard/", { waitUntil: "networkidle0" });
if (await dash.$("#jobs-table")) throw new Error("Walkthrough page should not be the live board");
await dash.goto(origin + "/work/ops-dashboard/board.html", { waitUntil: "networkidle0" });
await dash.select("#filter-status", "blocked");
const blocked = await dash.$$eval("#jobs-table tbody tr", (rows) => rows.map((r) => r.innerText));
if (blocked.length !== 1 || !blocked[0].includes("NF-2394")) {
  throw new Error("Blocked filter failed: " + JSON.stringify(blocked));
}
await dash.click("#jobs-table button[data-id='NF-2394']");
const drawer = await dash.$eval("#drawer", (el) => el.hidden);
if (drawer) throw new Error("Job drawer did not open");
await dash.close();
console.log("PASS  dashboard example board");

const after = await browser.newPage();
onPage(after, "after");
await after.goto(origin + "/work/website-rescue/after.html", { waitUntil: "networkidle0" });
await after.type("[name='name']", "Test Owner");
await after.type("[name='email']", "owner@example.com");
await after.click("button[type='submit']");
const status = await after.$eval("#visit-status", (el) => el.textContent);
if (!/Request recorded/.test(status)) throw new Error("After form confirmation missing");
await after.close();
console.log("PASS  repaired visit form");

const contact = await browser.newPage();
onPage(contact, "contact");
await contact.goto(origin + "/", { waitUntil: "networkidle0" });
await contact.click("#contact-form button[type='submit']");
const formStatus = await contact.$eval("#form-status", (el) => el.textContent);
if (!/complete name/i.test(formStatus)) throw new Error("Empty contact form did not warn");
await contact.close();
console.log("PASS  contact validation");

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("PASS  interactive QA");
