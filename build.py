#!/usr/bin/env python3
"""Build the PartnerPress static site.

Combines each page in src/pages/ with the shared partials in src/partials/,
copies static/ as-is, and writes the finished site to public/ along with
sitemap.xml. Uses only the Python standard library.

    python3 build.py
"""
import datetime
import json
import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
STATIC = ROOT / "static"
OUT = ROOT / "public"
SITE_URL = "https://partnerpress.net"
LIVE_HOST = "partnerpress.net"


def is_indexable():
    """Allow search engines only on the live production site.

    Netlify sets CONTEXT (production, deploy-preview, branch-deploy) and URL
    (the site's primary address). Until partnerpress.net is connected, URL is
    the netlify.app address, so every build stays hidden from search engines.
    Set SITE_INDEXABLE=true or false to override, e.g. for a local build.
    """
    override = os.environ.get("SITE_INDEXABLE", "").strip().lower()
    if override in ("true", "1", "yes"):
        return True
    if override in ("false", "0", "no"):
        return False
    url = os.environ.get("URL", "")
    return os.environ.get("CONTEXT") == "production" and LIVE_HOST in url and "netlify.app" not in url

PHONES = {
    "marin": ("+14153906563", "(415) 390-6563"),
    "nm": ("+15755174795", "(575) 517-4795"),
}

BUSINESS = {
    "marin": {
        "@type": "ProfessionalService",
        "@id": SITE_URL + "/marin-county/#business",
        "name": "PartnerPress",
        "url": SITE_URL + "/marin-county/",
        "telephone": "+1-415-390-6563",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "309 Verandah Ave",
            "addressLocality": "Novato",
            "addressRegion": "CA",
            "postalCode": "94945",
            "addressCountry": "US",
        },
        "areaServed": "Marin County, CA",
    },
    "nm": {
        "@type": "ProfessionalService",
        "@id": SITE_URL + "/las-cruces/#business",
        "name": "PartnerPress",
        "url": SITE_URL + "/las-cruces/",
        "telephone": "+1-575-517-4795",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "3749 Golden Echo Loop",
            "addressLocality": "Las Cruces",
            "addressRegion": "NM",
            "postalCode": "88012",
            "addressCountry": "US",
        },
        "areaServed": "Doña Ana County, NM",
    },
}
COMMON = {
    "description": "WordPress design, WordPress care plans, Local SEO and Google Ads for local service businesses.",
    "founder": {"@type": "Person", "name": "Shane Barnes"},
    "foundingDate": "2010",
    "openingHours": "Mo-Fr 09:00-17:00",
}


def schema_for(kind):
    if kind == "both":
        graph = [dict(BUSINESS["marin"], **COMMON), dict(BUSINESS["nm"], **COMMON)]
    elif kind in BUSINESS:
        graph = [dict(BUSINESS[kind], **COMMON)]
    else:
        return ""
    data = {"@context": "https://schema.org", "@graph": graph}
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + "</script>"


def read_page(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"<!--meta\n(.*?)\n-->\n", text, re.S)
    if not m:
        raise SystemExit(f"{path.name}: missing <!--meta ... --> block")
    return json.loads(m.group(1)), text[m.end():]


def fill(template, values):
    return re.sub(r"\{\{(\w+)\}\}", lambda m: values.get(m.group(1), m.group(0)), template)


def mark_current(header, nav):
    if not nav:
        return header
    header = header.replace(f'data-nav="{nav}" href=', f'data-nav="{nav}" aria-current="page" href=')
    return header.replace(f'<summary data-nav="{nav}">', f'<summary data-nav="{nav}" class="is-current">')


def build():
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(STATIC, OUT)
    indexable = is_indexable()
    if not indexable:
        # Header covers every file, including the sitemap and images. robots.txt
        # stays open on purpose: crawlers must fetch pages to see the noindex.
        (OUT / "_headers").write_text("/*\n  X-Robots-Tag: noindex, nofollow\n", encoding="utf-8")

    head = (SRC / "partials" / "head.html").read_text(encoding="utf-8")
    header = (SRC / "partials" / "header.html").read_text(encoding="utf-8")
    footer = (SRC / "partials" / "footer.html").read_text(encoding="utf-8")
    year = str(datetime.date.today().year)
    sitemap = []

    for page in sorted((SRC / "pages").glob("*.html")):
        meta, body = read_page(page)
        tel, label = PHONES[meta.get("phone", "marin")]
        values = {
            "title": meta["title"],
            "description": meta["description"],
            "canonical": SITE_URL + meta["path"],
            "robots": '<meta name="robots" content="noindex">' if meta.get("noindex") or not indexable else "",
            "schema": schema_for(meta.get("schema", "")),
            "call_tel": tel,
            "call_label": label,
            "year": year,
        }
        html = fill(head, values) + mark_current(header, meta.get("nav", "")) + body + fill(footer, values)
        html = re.sub(r"\n{3,}", "\n\n", html)

        target = OUT / meta["out"] if "out" in meta else OUT / meta["path"].strip("/") / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        if not meta.get("noindex"):
            sitemap.append(SITE_URL + meta["path"])
        print(f"built {target.relative_to(ROOT)}")

    today = datetime.date.today().isoformat()
    urls = "".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n" for u in sorted(sitemap))
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "</urlset>\n",
        encoding="utf-8",
    )
    print(f"built public/sitemap.xml ({len(sitemap)} URLs)")
    print("search engines: " + ("allowed (live site)" if indexable else "blocked with noindex (not the live site)"))


if __name__ == "__main__":
    build()
