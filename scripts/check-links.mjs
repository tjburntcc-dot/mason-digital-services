/**
 * Lists href/src values that look internal and reports missing files.
 * Usage: node scripts/check-links.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === ".deploy") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (extname(path) === ".html") htmlFiles.push(path);
  }
}

walk(root);

const missing = [];
const checked = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const matches = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)];
  for (const match of matches) {
    let url = match[1];
    if (!url || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("http") || url.startsWith("data:")) continue;
    url = url.split("?")[0].split("#")[0];
    const target = normalize(join(dirname(file), url));
    checked.push(`${file} -> ${url}`);
    if (!existsSync(target)) missing.push(`${file.replace(root, "")} -> ${url}`);
  }
}

if (missing.length) {
  console.error("Missing targets:\n" + missing.join("\n"));
  process.exit(1);
}
console.log(`PASS  ${htmlFiles.length} HTML files, ${checked.length} internal href/src checked`);
