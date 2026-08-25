/**
 * Public contact + origin + optional identity fields.
 * After changing these values, run: node scripts/apply-site-config.mjs
 *
 * linkedinUrl: leave "" until a real, confirmed profile exists. Empty means
 * every [data-linkedin] element on the site stays hidden — never a dead link.
 *
 * credentials: leave [] until a credential is actually earned. Do not add a
 * placeholder entry. Each item: { name, issuer, url }. url is optional.
 */
window.MDS = {
  contactEmail: "hemmerdigital@gmail.com",
  siteOrigin: "https://hemmerdigital.com",
  linkedinUrl: "",
  credentials: []
};
