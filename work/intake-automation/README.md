# Lead intake automation — Harbor Street HVAC

**Label:** DEMO PROJECT / SAMPLE BUILD  
**Not a client system.** Harbor Street HVAC is fictional. Data is synthetic.

## What this demonstrates

A small business workflow with a visible path:

Trigger → validate → score → CRM match → route → ticket or decline

Plus fixture tests that exercise the same engine as the form.

## How to run

1. Serve the site locally (see repository README).
2. Open `work/intake-automation/index.html`.
3. Choose a fixture and click **Process lead**, or click **Run fixture tests**.

From this folder, with Node:

```bash
node run-tests.mjs
```

## Technical architecture

- `engine.js` — pure functions, no network.
- `fixtures/crm.json` — two synthetic customers, matched by 10-digit phone.
- `fixtures/leads.json` — five authored enquiries and the ZIP allow-list.
- `fixtures/expected.json` — expected route, emergency flag, ticket type.
- `tests.js` — compares engine output to expected.json.

Urgency is keyword-based. That is deliberate and documented. It is not presented as machine learning.

## Test evidence

| Fixture | Expected | Notes |
| --- | --- | --- |
| lead-01 | same-day dispatch, new customer | “No heat” |
| lead-02 | schedule / maintenance, customer HS-1044 | Phone match |
| lead-03 | out-of-area, no ticket | ZIP 02601 |
| lead-04 | validate fail on phone | Empty phone |
| lead-05 | same-day + emergency | Gas smell |

CLI evidence is produced by `node run-tests.mjs` during QA.

## Assumptions

- Service area is a ZIP list.
- One phone number maps to at most one CRM row.
- A human still places the actual dispatch call.
- Voicemail “transcripts” are pre-written fixtures, not live speech-to-text.

## Limitations

- Keyword scoring misses odd phrasing.
- No SMS, no calendar, no payment.
- Not connected to a real board.
- Do not enter real customer information.

## What was automated

Validation, scoring, match, routing, ticket JSON, draft customer/owner copy, and the test runner.

## What was manually reviewed

Fixture wording vs expected routes; that emergency copy mentions the gas utility / 911; that out-of-area does not invent a referral partner.

## Screenshots

See `screenshots/` after QA capture.
