# PartnerPress website

The partnerpress.net site, built with [Astro](https://astro.build) as a static site and hosted on Netlify.

## Run it locally

Needs Node 22.23.4 or newer (Node 24 recommended).

```bash
npm install
npm run dev      # local server with live reload at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built dist/ folder
npm run check    # type and template check
```

## Where things live

| What | Where |
| --- | --- |
| Business details (name, phones, addresses, hours, review count) | `src/config/site.ts` |
| Services, care plans, SEO plans | `src/data/services.ts`, `src/data/plans.ts` |
| Client reviews | `src/data/reviews.ts` |
| FAQs | `src/data/faqs.ts` |
| Towns and service areas | `src/data/locations.ts` |
| Blog posts | `src/content/blog/*.md` |
| Legal pages | `src/content/legal/*.md` |
| Pages | `src/pages/` |
| Reusable building blocks | `src/components/` |
| Colors, fonts, spacing | `src/styles/global.css` |
| Logos, favicon, robots.txt, redirects | `public/` |

Change a price or phone number once in `src/config` or `src/data` and every page that shows it updates.

## Blog

Add a Markdown file to `src/content/blog/`. The file name becomes the URL, so `my-post.md` is published at `/blog/my-post/`.

```markdown
---
title: Post title
description: One or two sentences for search results and the blog index.
pubDate: 2026-10-28
tags: [wordpress]
draft: true
---

Post body in Markdown.
```

Set `draft: true` to keep a post off the live site. Drafts still show in `npm run dev` so you can preview them. Remove the line (or set it to `false`) to publish. Posts appear on `/blog/`, in the sitemap and in the RSS feed at `/rss.xml`.

## Environment variables (Netlify)

| Variable | Purpose |
| --- | --- |
| `PUBLIC_GA4_ID` | GA4 measurement ID (for example `G-XXXXXXX`). Analytics only load when this is set. |
| `PUBLIC_FORMSPREE_ID` | Optional. Overrides the Formspree form ID in `src/config/site.ts` (`xjyyobjq`). Set it to an empty value to use Netlify Forms instead. |
| `SITE_INDEXABLE` | Optional override. `true` forces indexing, `false` forces noindex. |

## Search engine visibility

Only the live production deploy on partnerpress.net can be indexed. Every other build (deploy previews, branch deploys, the netlify.app address, local builds) gets a `noindex` robots tag on every page and an `X-Robots-Tag: noindex, nofollow` header. The build log says which mode it used.

## Deploying

Netlify reads `netlify.toml`: it runs `npm run build` on Node 24 and publishes `dist/`. The contact form posts to Formspree (form `xjyyobjq`). Old WordPress URLs are redirected in `public/_redirects`.

## Before launch

- Replace every `[SQUARE BRACKET]` placeholder (highlighted in orange on the site).
- Paste the Termageddon embed code into each file in `src/content/legal/`.
- Add real photos and client screenshots where the placeholder boxes are.
- Review the blog post in `src/content/blog/`.
- Set `PUBLIC_GA4_ID` in Netlify.
- Point partnerpress.net at Netlify and confirm the build log says "search engines: allowed".
- Submit `https://partnerpress.net/sitemap-index.xml` in Google Search Console.
