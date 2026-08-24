# QA report

**Site:** Hemmer Digital (static)  
**Date:** 24 August 2026  
**Scope:** Local preview at `http://127.0.0.1:8080/` plus Node checks  
**Publish:** Not released. Human approval required (`docs/DEPLOY.md`).

## How this was tested

| Check | Method | Result |
| --- | --- | --- |
| Intake fixtures | `node work/intake-automation/run-tests.mjs` | 5 / 5 passed |
| Dashboard data integrity | `node work/ops-dashboard/check-data.mjs` | 12 jobs, 8 open, 3 overdue, 5 techs |
| Internal links | `node scripts/check-links.mjs` | 14 HTML files, 138 href/src targets exist |
| Console / page errors | Headless Chrome via `scripts/capture.mjs` | None |
| Interactive flows | `scripts/qa-flow.mjs` | Mobile nav, intake walkthrough (passive), technical details still testable, dashboard filter/drawer, repaired visit form, empty contact validation |

Screenshots are in `assets/img/screenshots/` and each demo’s `screenshots/` folder.

## Visual reset (24 August 2026)

Public UI rebuilt as Hemmer Digital: dark, sans-serif, six short sections. Simulated buyer review (20) then repairs: no letter-in-box logo, no pill buttons, no all-caps legal labels, no inverted “sample” tape, no FAQ/verification dossier. Demo engines and tests unchanged.

## Responsive

Reviewed 390×844 and 1280×800 captures of home, selected work, all three demos, privacy, and terms.

- Sticky header and wrapping nav at desktop; Menu toggle at 390px (opens, Escape closes).
- Tables on the rescue log and dashboard scroll horizontally instead of overflowing the viewport.
- Before-page 1400px canvas is intentional (the failure being demonstrated). After-page uses fluid width.

Tablet (≈768px) was not a separate capture; layout uses the same breakpoints as desktop two-column → single column under ~50–64rem. No overlapping text observed in the 390 and 1280 captures.

## Broken links

Internal `href` / `src` targets resolve. `mailto:masonhemmer@icloud.com` is the public address.

Intentional demo “failures” (not site bugs):

- `work/website-rescue/before.html` mixed-content warning and plugin fatal (modeled)
- `work/website-rescue/contact-missing.html` — labeled demo 404 used by the before nav

External: no third-party script CDNs on the marketing pages. Fonts are self-hosted.

## Console errors

None on the captured routes (home, work index, three demos, privacy, terms).

## Accessibility

| Item | Status |
| --- | --- |
| Language | `lang="en"` on pages |
| Skip link | Present on marketing pages and the repaired demo |
| Nav | Button has `aria-expanded` / `aria-controls`; Escape closes |
| Focus | `:focus-visible` outline on interactive controls |
| Images | Work-card screenshots have alt text; decorative SVGs marked where used |
| Forms | Labels wrap controls; required fields called out; live regions on status |
| Contrast | Body and heading ink on warm ground; muted text darkened to `#4a453e` after review |
| Reduced motion | `prefers-reduced-motion` disables smooth scroll / transitions |
| Demo before-page | Intentionally fails contrast, overlay, and semantics — labeled as the broken sample |

Not a full WCAG audit. No automated axe run in this pass. Landmark structure is header / main / footer.

## SEO

Present on the home page: title, meta description, canonical, Open Graph, Twitter card, JSON-LD (`ProfessionalService` + `Person`), favicon, web manifest, `robots.txt`, `sitemap.xml`.

Demo before/after pages are `noindex`.

**Before public launch:** replace `tjburntcc-dot.github.io/mason-digital-services` with the custom domain in canonical, OG, JSON-LD, robots, and sitemap (`docs/DEPLOY.md`). A GitHub user/org in the URL does not match the personal brand.

## Copy consistency

- First person throughout
- Demo / sample-build labeled on selected work (intro once, plus card labels)
- Email from `assets/js/site-config.js`
- No client names, testimonials, or certification badges
- Penfield affiliation in footer and Terms only

Claude final copy was not in the repo. Public copy is conservative; omissions are listed in `docs/COPY_NOTES.md` rather than as on-page TODOs.

## Mobile review

- Hero CTAs: View work and Request a quote
- Menu is a real control, not hover-only
- Dashboard filters and tables remain usable with horizontal scroll
- Contact form fields are full width

## Fake-claim review

| Claim type | On this site? |
| --- | --- |
| Client logos / testimonials | No |
| Named client case studies | No — demos labeled |
| Guaranteed results / “10X” | No |
| Invented certifications | No |
| Fake analytics / live ops | No — synthetic data labeled |
| Affiliation with Mason Digital (Penfield) | Denied in footer and Terms only |
| Domain mailbox | Uses whatever `contactEmail` is set to |
| LinkedIn | Omitted |

## Security

- No API keys in frontend code
- Contact form uses `mailto:` plus a honeypot; it does not POST to a server
- Optional Netlify/Formspree wiring is documented, not enabled with secrets
- Demos tell users not to enter real personal data
- No third-party analytics or trackers

## Trust review (internal)

Visitor simulations (including 25 skeptical-buyer checks on 24 August 2026) were used as a checklist only. Simulated comments are **not** published on the site.

Copy-pass repairs:

- Hero is outcome-led; CTAs are View work and Request a quote
- Removed self-disqualifying copy (missing LinkedIn, missing credentials, “not an agency,” omitted biography)
- Credentials block replaced with Verification: demos, tests, scope, handoff
- Demo / sample-build said once per page, plus the existing card/banner labels
- Penfield affiliation is footer + Terms only
- Email and origin switched from a single config file for a later domain mailbox

Remaining launch tasks: custom domain, matching mailbox. LinkedIn stays omitted until a confirmed URL exists.

## Open items (not blockers for code review)

1. Attach a custom domain before sending this URL to buyers.
2. Set `siteOrigin` / `contactEmail` in `assets/js/site-config.js` and run `node scripts/apply-site-config.mjs`.
3. Optional: server-side form delivery (`docs/DEPLOY.md`).
4. Full Lighthouse run on the production origin.

## 2026-08-24 (simplify)

Public path is walkthroughs plus optional examples. Interactive intake controls are behind Technical notes. Process copy uses can/typically/when useful. See `CLAIM_AUDIT.md`.

## Verdict

The repository is ready for **human copy approval** locally. Do not publish until that approval, a custom domain, and the contact email are confirmed.
