# partnerpress.net

Static website for PartnerPress, LLC: WordPress design, WordPress care plans, Local SEO and Google Ads for service businesses in Marin County, CA and Las Cruces, NM. Built for Netlify.

## How it's organized

```
src/
  partials/   head.html, header.html, footer.html (shared on every page)
  pages/      one file per page: a <!--meta {...} --> block, then the page body
static/       copied as-is: CSS, JS, logos, favicon, robots.txt, _redirects
build.py      combines partials + pages into public/ and writes sitemap.xml
public/       the finished site (committed, so it can also be uploaded by hand)
netlify.toml  build command, publish folder, security headers
```

| Page | URL | Source |
| --- | --- | --- |
| Home | `/` | `src/pages/index.html` |
| WordPress web design | `/wordpress-web-design/` | `src/pages/wordpress-web-design.html` |
| WordPress care plans | `/wordpress-care-plans/` | `src/pages/wordpress-care-plans.html` |
| Local SEO | `/local-seo/` | `src/pages/local-seo.html` |
| Google Ads | `/google-ads/` | `src/pages/google-ads.html` |
| Marin County | `/marin-county/` | `src/pages/marin-county.html` |
| Las Cruces | `/las-cruces/` | `src/pages/las-cruces.html` |
| About | `/about/` | `src/pages/about.html` |
| Book a call | `/contact/` | `src/pages/contact.html` |
| Thank you (after form) | `/thank-you/` | `src/pages/thank-you.html` |
| Legal pages | `/privacy-policy/` etc. | `src/pages/*.html` |

## Editing

1. Edit a page in `src/pages/`, or the header and footer in `src/partials/`.
2. Run `python3 build.py` (Python 3, no packages needed).
3. Preview: `cd public && python3 -m http.server 8000`, then open http://localhost:8000.
4. Commit `src/` and `public/` together.

Each page's `<!--meta -->` block sets its title, meta description, URL, which menu item is highlighted (`nav`), which phone number the phone call bar uses (`phone`: `marin` or `nm`), and its LocalBusiness schema (`schema`).

## Search engine visibility

The build hides the site from search engines everywhere except the live site. Unless Netlify is building production for partnerpress.net, every page gets `<meta name="robots" content="noindex">` and Netlify sends an `X-Robots-Tag: noindex, nofollow` header (via a generated `public/_headers`). That covers partnerpress.netlify.app, deploy previews and branch deploys, while Huddlekit and visitors can still open the pages.

Once partnerpress.net is the site's primary domain in Netlify, the next production deploy is indexable automatically. To force it either way, set the `SITE_INDEXABLE` environment variable to `true` or `false`. Leave `robots.txt` open: crawlers have to fetch a page to see its noindex.

## Deploying on Netlify

1. Netlify > Add new site > Import from Git > pick this repository. `netlify.toml` already sets the build command (`python3 build.py`) and publish folder (`public`).
2. Point the partnerpress.net domain at Netlify (Domain settings) and turn on HTTPS.
3. Forms > enable form detection, then add an email notification for the `book-a-call` form.
4. Check the deploy log says "search engines: allowed (live site)" after the domain switch.
5. After launch: submit `https://partnerpress.net/sitemap.xml` in Search Console and watch Pages > Not indexed for any old URL that still 404s.

`static/_redirects` 301-redirects every old WordPress URL that appeared in Search Console to its new page, so existing rankings carry over.

## Before launch

- [ ] Fill in every `[PLACEHOLDER]` (prices, timelines, case studies, photos). The full list is the "Fill in placeholders on website redesign" task in Clearview.
- [ ] Paste the Termageddon embed code into each legal page in `src/pages/` (privacy, terms, cookies, disclaimer, accessibility).
- [ ] Add the GA4 measurement ID in `src/partials/head.html` and uncomment the tag. `site.js` already sends `phone_call_click` and `email_click` events.
- [ ] Decide what to do with pages that exist on the WordPress site but not here: the blog posts, and any client pages such as `/support-details/`, `/credit-card-update-request/` and `/account-access-request/`. Old blog URLs currently redirect to the homepage.
- [ ] Confirm the facts flagged in the Clearview checklist (Google Partner status, Ghilotti Bros. in the Marin client list, click fraud protection, About page wording).
