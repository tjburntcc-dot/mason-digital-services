import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(fileURLToPath(import.meta.url));
const code = readFileSync(join(root, "data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const data = sandbox.window.NorthfieldData;

const jobs = data.jobs.length;
const techs = new Set(data.jobs.map((j) => j.tech));
const unknown = [...techs].filter((id) => !data.technicians.some((t) => t.id === id));
const open = data.jobs.filter((j) => j.status !== "complete").length;
const overdue = data.invoices.filter((i) => i.status === "overdue").length;

if (unknown.length) {
  console.error("Unknown technician ids", unknown);
  process.exit(1);
}
if (jobs < 8 || data.invoices.length < 5) {
  console.error("Dataset too small");
  process.exit(1);
}

console.log(`PASS  ${jobs} jobs, ${open} open, ${overdue} overdue invoices, ${data.technicians.length} technicians`);
