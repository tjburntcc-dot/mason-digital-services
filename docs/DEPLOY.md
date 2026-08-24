# Deploy

Do not publish until a human has approved this site.

## Recommended host

Any static host: GitHub Pages, Netlify, Cloudflare Pages, or S3 + CloudFront.

This repository already contains `.nojekyll` for GitHub Pages.

### GitHub Pages (project site)

1. Settings → Pages → Deploy from branch `main` / root.
2. Preview at `https://<github-user>.github.io/mason-digital-services/`.
3. Before using the site as a sales asset, attach a **custom domain**.

### Custom domain

1. Point DNS (A/ALIAS/CNAME) at the host.
2. For GitHub Pages, copy `docs/CNAME.example` to a root file named `CNAME` (no extension) and put the hostname in it.
3. Set `siteOrigin` in `assets/js/site-config.js` to `https://your-domain.com` (no trailing slash).
4. Set `contactEmail` to the domain mailbox when it exists.
5. Run `node scripts/apply-site-config.mjs`

That updates canonical, Open Graph, JSON-LD, sitemap, robots, and HTML mailto fallbacks. The visible email also reads from `site-config.js` at runtime.

After the public origin is known, confirm:

- `robots.txt` (`Sitemap:` line)
- `sitemap.xml` (`<loc>` values)
- `rel="canonical"` and `og:url` / `og:image` on HTML pages
- JSON-LD `@id` / `url` on `index.html`

## Contact form (optional server delivery)

The live form uses `mailto:` and does not need secrets.

If you want submissions in a mailbox without the visitor’s email client:

### Netlify Forms

1. Deploy to Netlify.
2. On the form in `index.html`, add `name="contact" data-netlify="true" netlify-honeypot="company_website"`.
3. Add `<input type="hidden" name="form-name" value="contact">`.
4. Keep the existing honeypot field.
5. Disable or bypass the `mailto` JavaScript in `assets/js/contact.js` so the form can POST to Netlify.

No API key belongs in the frontend.

### Formspree

1. Create a form in Formspree.
2. Set the form `action` to the Formspree endpoint.
3. Do not put unrelated secrets in JavaScript. The public Formspree ID is not a private API key, but treat rate limits and spam as your problem.

### Resend / SES / a worker

Requires a server or serverless function. Keep the API key in the host’s environment, never in `assets/js`.

## Checklist before a buyer sees the URL

- [ ] Custom domain connected and HTTPS working
- [ ] `assets/js/site-config.js` origin and email set; `apply-site-config.mjs` run
- [ ] Email still correct
- [ ] LinkedIn added only if a confirmed URL exists (otherwise omit)
- [ ] Demo labels still present
- [ ] `QA_REPORT.md` read
