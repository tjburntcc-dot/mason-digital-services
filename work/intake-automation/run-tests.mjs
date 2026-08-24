import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = dirname(fileURLToPath(import.meta.url));
require("./engine.js");
require("./tests.js");

const crm = JSON.parse(readFileSync(join(root, "fixtures/crm.json"), "utf8"));
const leadsFile = JSON.parse(readFileSync(join(root, "fixtures/leads.json"), "utf8"));
const expected = JSON.parse(readFileSync(join(root, "fixtures/expected.json"), "utf8"));

const results = globalThis.HarborIntakeTests.runTests(
  leadsFile.leads,
  expected,
  crm,
  leadsFile.serviceZips
);

const failed = results.filter((row) => !row.pass);
results.forEach((row) => {
  console.log(`${row.pass ? "PASS" : "FAIL"}  ${row.id}  ${row.detail}`);
});

if (failed.length) {
  console.error(`\n${failed.length} failed`);
  process.exit(1);
}

console.log(`\n${results.length} passed`);
