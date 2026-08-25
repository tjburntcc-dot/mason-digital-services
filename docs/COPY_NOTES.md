# Copy notes (internal)

Public copy rebuilt 24 August 2026 for Hemmer Digital. Short, claim-audited, not defensive.

## Facts in use

- Mason Hemmer / Hemmer Digital
- Email currently `hemmerdigital@gmail.com` (swap in `assets/js/site-config.js`)
- Services and sample builds as built
- Sample-build labels on project pages, plus one sentence in About

## Still omitted (do not invent)

- Phone, city, years, employers, client names, testimonials, certifications
- LinkedIn (omit until a confirmed URL exists — do not mention the absence)
- Domain mailbox until it exists

## Affiliation

Quiet line on Terms only (not the public homepage or footer):

“Hemmer Digital is not affiliated with Mason Digital of Penfield, New York.”

## Domain + email switch

1. Set `contactEmail` and `siteOrigin` in `assets/js/site-config.js`.
2. Run `node scripts/apply-site-config.mjs` to patch canonical, OG, sitemap, robots, and HTML mailto fallbacks.
3. For GitHub Pages, put the host in a root `CNAME` file (see `docs/CNAME.example`).
