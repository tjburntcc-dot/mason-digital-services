# Operations dashboard — Northfield Field Services

**Label:** DEMO PROJECT / SAMPLE BUILD  
**Not a client tool.** Northfield Field Services is fictional. All jobs and invoices are synthetic.

## What this demonstrates

An internal board a dispatcher can actually use:

- KPIs: open jobs, overdue invoices, SLA watch, technicians at 8h+
- Load bars by technician
- Filter, search, sort
- Job detail drawer
- CSV export of the current filter (filename states synthetic)

## Business use case

A small field shop needs one screen for “what is open, what is blocked, who is loaded, what money is aging.” This is that screen, filled with invented records.

## Technical architecture

- `data.js` — static dataset, labeled synthetic
- `index.html` — rendering, filters, sort, export
- No backend, no live telemetry, no charts library

## Test evidence

Manual checks (24 August 2026):

- KPI open-job count equals jobs where status ≠ complete
- Overdue invoice count equals invoices with status `overdue`
- Filter `blocked` shows NF-2394 only
- Search `bakery` returns Wharf Bakery jobs
- Export downloads `northfield-jobs-synthetic.csv`
- Demo banner visible on the page

A tiny integrity script:

```bash
node check-data.mjs
```

## Assumptions

- One technician per job
- Hours are planned/actual mixed in a single field (good enough for a board, not payroll)
- SLA values are authored, not computed from timestamps

## Limitations

- Not multi-user
- Not connected to QuickBooks, ServiceTitan, or a phone system
- CSV is a download, not a scheduled report
- Do not treat totals as real financials

## What was automated

Filtering, sorting, CSV generation, KPI derivation from the static file.

## What was manually reviewed

Copy that states synthetic/demo; contrast on tags; keyboard access to job IDs (buttons in the table).

## Screenshots

See `screenshots/` after QA capture.
