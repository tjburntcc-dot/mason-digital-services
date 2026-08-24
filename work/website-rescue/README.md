# Website rescue demo — Cedar & Pine Landscaping

**Label:** DEMO PROJECT / SAMPLE BUILD  
**Not a client engagement.** Cedar & Pine is fictional.

## What this demonstrates

Diagnosis and repair of a small-business site whose public path is broken:

- SSL / mixed content blocking a booking script
- WordPress-style plugin fatal on the request form
- Contact nav 404
- Layout collapse on screens narrower than 1400px
- Contrast and missing-asset failures
- A blocking overlay sitting on the critical path

## How to view

1. Open `index.html` for the repair log and before/after switcher.
2. Open `before.html` and `after.html` directly for a full-page view.

## Technical architecture

**Before (modeled):** HTTPS HTML + HTTP plugin script + WordPress plugin checkout that calls `wp_mail()`.

**After:** Static HTML/CSS/JS. Visit requests confirm in-page. No plugin runtime.

A live job might keep WordPress and only remove the failing plugin. That choice is a scope item, not something this demo pretends to have executed on a real host.

## Test evidence

Manual checks recorded 24 August 2026:

| Check | Before | After |
| --- | --- | --- |
| Mixed-content `http://` asset in page | Present | Absent |
| Booking / request control usable | Disabled + fatal message | Form submits, in-page status |
| Contact destination exists | `contact-missing.html` (no file) | `#contact` on the same page |
| Viewport 375px, no forced 1400px canvas | Fail (fixed width hero) | Pass |
| Overlay blocking the form | Present | Absent |

There is no CI pipeline for this demo. Re-run the table by opening both pages.

## Assumptions

- The owner wants a brochure site and a visit request, not a full calendar.
- Content can be rewritten; there is no requirement to preserve a corrupt CMS database.
- Static hosting is acceptable for the repaired public site.

## Limitations

- No real certificate was issued.
- No real WordPress database was migrated.
- The after form does not send email (no backend credentials on the frontend).
- Images are omitted rather than replaced with stock photography.

## What was automated

None of the rescue itself. Pages and this note are authored.

## What was manually reviewed

Repair-log items, after-page contrast and focus states, labels on every page stating this is a demo.

## Screenshots

Place captures in `screenshots/` (see that folder’s README). Generated during QA of this repository.
