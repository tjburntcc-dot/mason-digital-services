import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "assets/js/site-config.js");
const lockPath = join(root, "docs/site-config.lock.json");
const skipDirs = new Set([".git", "node_modules", ".deploy"]);
const skipFiles = new Set(["site-config.js", "site-config.lock.json"]);
const textExt = new Set([".html", ".xml", ".txt", ".md", ".js", ".mjs", ".json", ".webmanifest"]);

const src = readFileSync(configPath, "utf8");
const email = (src.match(/contactEmail:\s*"([^"]+)"/) || [])[1];
const origin = (src.match(/siteOrigin:\s*"([^"]+)"/) || [])[1];
if (!email || !origin) {
  console.error("Could not read contactEmail / siteOrigin from assets/js/site-config.js");
  process.exit(1);
}

const prev = existsSync(lockPath)
  ? JSON.parse(readFileSync(lockPath, "utf8"))
  : {
      contactEmail: "masonhemmer@icloud.com",
      siteOrigin: "https://tjburntcc-dot.github.io/mason-digital-services"
    };

if (prev.contactEmail === email && prev.siteOrigin === origin) {
  console.log("Already applied. Edit assets/js/site-config.js, then run this again.");
  process.exit(0);
}

const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (textExt.has(extname(name)) && !skipFiles.has(name)) files.push(path);
  }
}
walk(root);

let changed = 0;
for (const file of files) {
  let text = readFileSync(file, "utf8");
  const next = text
    .split(prev.contactEmail).join(email)
    .split(prev.siteOrigin).join(origin.replace(/\/$/, ""));
  if (next !== text) {
    writeFileSync(file, next);
    changed += 1;
  }
}

writeFileSync(lockPath, JSON.stringify({ contactEmail: email, siteOrigin: origin.replace(/\/$/, "") }, null, 2) + "\n");
console.log("Updated " + changed + " files → " + email + " · " + origin);
