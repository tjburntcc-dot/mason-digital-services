# Hemmer Digital

Personal/business site for **Mason Hemmer** — websites, automation, and software for small businesses.

This is a static site. There is no application server and no API key in the frontend.

Public brand: **Hemmer Digital**. Do not publish until a human has approved the site.

## Local preview

Python 3:

```bash
python -m http.server 8080
```

Then open http://127.0.0.1:8080/

Or Node:

```bash
npx --yes serve -l 8080
```

Do not open `index.html` as a `file://` URL if you want the automation demo fixtures to load (`fetch` is blocked on some browsers for local files).

## Tests

```bash
npm test
npm run qa          # requires the local server and Chrome
npm run capture     # screenshots
```

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md). Do not publish to a buyer-facing domain until a human has approved copy, contact details, and the public origin.

## Site map

| Path | Purpose |
| --- | --- |
| `index.html` | Main sales page |
| `work/` | Demo projects (labeled sample builds) |
| `privacy.html` / `terms.html` | Legal |
| `404.html` | Missing routes |

## Contact form

The public form drafts a `mailto:` message. The address lives in `assets/js/site-config.js`. To switch to a domain mailbox, change `contactEmail` there and run `node scripts/apply-site-config.mjs`. Optional server-side delivery is documented in `docs/DEPLOY.md`.

## Copy

Facts on the public pages are limited to the name, email, and services already present, plus honest labels on sample work. See `docs/COPY_NOTES.md` and `CLAIM_AUDIT.md`.
