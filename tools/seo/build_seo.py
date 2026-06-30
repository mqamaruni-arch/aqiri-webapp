#!/usr/bin/env python3
import json
import re
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SITE_URL = "https://aqiri.org"
SITE_NAME = "AQIRI | Al-Qamar Islamic Research Institute"
ORG_NAME = "Al-Qamar Islamic Research Institute"
DEFAULT_IMAGE = "/assets/al-qamar-seal-transparent-v3.png"
ICON_DIR = "assets/icons"
FONT_PRECONNECTS = [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap" rel="stylesheet">',
]


CUSTOM = {
    "index.html": {
        "title": "AQIRI | Al-Qamar Islamic Research Institute",
        "description": "AQIRI advances Islamic research, publishing, scholarly training, and academic collaboration through dedicated departments, journals, fellowships, and institutional leadership.",
        "page_type": "WebPage",
        "og_type": "website",
        "breadcrumbs": [],
    },
    "board-of-governors.html": {
        "description": "Meet the Board of Governors of AQIRI, including senior scholars and institutional leaders guiding research standards, governance, and long-term academic direction.",
        "page_type": "CollectionPage",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html")],
    },
    "director-general.html": {
        "description": "Read the Director General page of AQIRI, featuring the message, academic leadership role, and institutional direction of Prof. Dr. Shahbaz Khan Manj.",
        "page_type": "AboutPage",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Director General", "/director-general.html")],
        "image": "/assets/prof-dr-shahbaz-khan-manj.jpg",
    },
    "manuscripts.html": {
        "description": "Submission guidance for AQIRI manuscripts, journals, editorial review, publication standards, and scholarly publishing requirements.",
        "breadcrumbs": [("Home", "/"), ("Manuscripts", "/manuscripts.html")],
    },
    "advanced-diplomas.html": {
        "description": "Explore AQIRI advanced diploma programs, academic structure, eligibility, study focus, and admissions-related information.",
        "breadcrumbs": [("Home", "/"), ("Programs & Admissions", "/#programs"), ("Advanced Diplomas", "/advanced-diplomas.html")],
    },
    "postdoctoral-fellowships.html": {
        "description": "Learn about AQIRI postdoctoral fellowships, research opportunities, eligibility, and institutional support for advanced scholars.",
        "breadcrumbs": [("Home", "/"), ("Programs & Admissions", "/#programs"), ("Postdoctoral Fellowships", "/postdoctoral-fellowships.html")],
    },
    "diploma-admission-form.html": {
        "description": "AQIRI diploma admission form page for applicants seeking advanced diploma study and institutional enrollment guidance.",
        "breadcrumbs": [("Home", "/"), ("Programs & Admissions", "/#programs"), ("Diploma Admission Form", "/diploma-admission-form.html")],
    },
    "contact-aqiri.html": {
        "description": "Contact AQIRI for research collaboration, admissions, publication correspondence, and institutional communication.",
        "page_type": "ContactPage",
        "breadcrumbs": [("Home", "/"), ("Contact AQIRI", "/contact-aqiri.html")],
    },
    "location-and-directions.html": {
        "description": "Location and directions for AQIRI in Lahore, including access details for visitors, applicants, and academic collaborators.",
        "breadcrumbs": [("Home", "/"), ("Location & Directions", "/location-and-directions.html")],
    },
    "careers.html": {
        "description": "Career opportunities at AQIRI across research support, publishing, administration, and institutional operations.",
        "breadcrumbs": [("Home", "/"), ("Careers", "/careers.html")],
    },
    "privacy-statement.html": {
        "description": "AQIRI privacy statement covering information handling, website use, and institutional communication practices.",
        "breadcrumbs": [("Home", "/"), ("Privacy Statement", "/privacy-statement.html")],
    },
    "accessibility.html": {
        "description": "AQIRI accessibility information outlining inclusive access commitments across the website and institutional resources.",
        "breadcrumbs": [("Home", "/"), ("Accessibility", "/accessibility.html")],
    },
    "digital-accessibility.html": {
        "description": "Digital accessibility practices at AQIRI, including website access and usability commitments for online visitors.",
        "breadcrumbs": [("Home", "/"), ("Digital Accessibility", "/digital-accessibility.html")],
    },
    "brand-and-trademark-notice.html": {
        "description": "AQIRI brand and trademark notice covering institutional marks, logo usage, and protected identity assets.",
        "breadcrumbs": [("Home", "/"), ("Brand and Trademark Notice", "/brand-and-trademark-notice.html")],
    },
    "report-copyright-infringement.html": {
        "description": "Report copyright infringement related to AQIRI publications, website materials, or institutional content.",
        "breadcrumbs": [("Home", "/"), ("Report Copyright Infringement", "/report-copyright-infringement.html")],
    },
    "report-security-issue.html": {
        "description": "Report a security issue related to AQIRI digital platforms, forms, or website infrastructure.",
        "breadcrumbs": [("Home", "/"), ("Report Security Issue", "/report-security-issue.html")],
    },
    "administration/prof-dr-shahbaz-khan-manj.html": {
        "title": "Prof. Dr. Shahbaz Khan Manj | Director General | AQIRI",
        "description": "Profile of Prof. Dr. Shahbaz Khan Manj, Director General of AQIRI, covering his academic leadership, research supervision, and institutional role.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/prof-dr-shahbaz-khan-manj.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Director General", "/director-general.html"), ("Prof. Dr. Shahbaz Khan Manj", "/administration/prof-dr-shahbaz-khan-manj.html")],
        "person": {
            "name": "Prof. Dr. Shahbaz Khan Manj",
            "jobTitle": "Director General",
            "affiliation": "Al-Qamar Islamic Research Institute",
            "image": "/assets/prof-dr-shahbaz-khan-manj.jpg",
        },
    },
    "administration/prof-dr-qibla-ayaz.html": {
        "title": "Prof. Dr. Qibla Ayaz | Board Member | AQIRI",
        "description": "Profile of Prof. Dr. Qibla Ayaz, Board Member of AQIRI and senior scholar of Islamic law, public policy, and contemporary Muslim thought.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-qibla-ayaz.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Prof. Dr. Qibla Ayaz", "/administration/prof-dr-qibla-ayaz.html")],
        "person": {
            "name": "Prof. Dr. Qibla Ayaz",
            "jobTitle": "Board Member",
            "affiliation": "Supreme Court Shariat Appellate Bench",
            "image": "/assets/dr-qibla-ayaz.jpg",
        },
    },
    "administration/prof-dr-muhammad-khalid-masud.html": {
        "title": "Prof. Dr. Muhammad Khalid Masud | Board Member | AQIRI",
        "description": "Profile of Prof. Dr. Muhammad Khalid Masud, Board Member of AQIRI and internationally recognized scholar of Islamic law, jurisprudence, and Muslim thought.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-khalid-masood.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Prof. Dr. Muhammad Khalid Masud", "/administration/prof-dr-muhammad-khalid-masud.html")],
        "person": {
            "name": "Prof. Dr. Muhammad Khalid Masud",
            "jobTitle": "Board Member",
            "affiliation": "International Islamic University, Islamabad",
            "image": "/assets/dr-khalid-masood.jpg",
        },
    },
    "administration/prof-dr-abu-sufyan-islahi.html": {
        "title": "Prof. Dr. Abu Sufyan Islahi | Board Member | AQIRI",
        "description": "Profile of Prof. Dr. Abu Sufyan Islahi, Board Member of AQIRI, with expertise in Arabic, Islamic studies, academic editing, and publication quality.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-abu-sufyan-islahi.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Prof. Dr. Abu Sufyan Islahi", "/administration/prof-dr-abu-sufyan-islahi.html")],
        "person": {
            "name": "Prof. Dr. Abu Sufyan Islahi",
            "jobTitle": "Board Member",
            "affiliation": "Aligarh Muslim University, India",
            "image": "/assets/dr-abu-sufyan-islahi.jpg",
        },
    },
    "administration/prof-dr-mohd-roslan-bin-mohd-nor.html": {
        "title": "Prof. Dr. Mohd Roslan bin Mohd Nor | Board Member | AQIRI",
        "description": "Profile of Prof. Dr. Mohd Roslan bin Mohd Nor, Board Member of AQIRI, focused on Islamic history, civilization, Muslim societies, and academic collaboration.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-mohd-roslan-bin-mohd-nor.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Prof. Dr. Mohd Roslan bin Mohd Nor", "/administration/prof-dr-mohd-roslan-bin-mohd-nor.html")],
        "person": {
            "name": "Prof. Dr. Mohd Roslan bin Mohd Nor",
            "jobTitle": "Board Member",
            "affiliation": "University of Malaya, Malaysia",
            "image": "/assets/dr-mohd-roslan-bin-mohd-nor.jpg",
        },
    },
    "administration/prof-dr-arshad-munir-laghari.html": {
        "title": "Prof. Dr. Arshad Munir Laghari | Board Member | AQIRI",
        "description": "Profile of Prof. Dr. Arshad Munir Laghari, Board Member of AQIRI and scholar of Islamic studies, higher education, curriculum development, and research supervision.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-arshad-munir-laghari.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Prof. Dr. Arshad Munir Laghari", "/administration/prof-dr-arshad-munir-laghari.html")],
        "person": {
            "name": "Prof. Dr. Arshad Munir Laghari",
            "jobTitle": "Board Member",
            "affiliation": "Ghazi University, Dera Ghazi Khan",
            "image": "/assets/dr-arshad-munir-laghari.jpg",
        },
    },
    "administration/dr-bilal-masud.html": {
        "title": "Dr. Bilal Masud | Board Member | AQIRI",
        "description": "Profile of Dr. Bilal Masud, Board Member of AQIRI, with interdisciplinary expertise spanning science, philosophy, metaphysics, and Muslim intellectual thought.",
        "page_type": "ProfilePage",
        "og_type": "profile",
        "image": "/assets/dr-bilal-masud.jpg",
        "breadcrumbs": [("Home", "/"), ("Administration", "/#administration"), ("Board of Governors", "/board-of-governors.html"), ("Dr. Bilal Masud", "/administration/dr-bilal-masud.html")],
        "person": {
            "name": "Dr. Bilal Masud",
            "jobTitle": "Board Member",
            "affiliation": "University of the Punjab, Lahore",
            "image": "/assets/dr-bilal-masud.jpg",
        },
    },
}


def strip_tags(value):
    text = re.sub(r"<[^>]+>", " ", value)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract(pattern, text, default=""):
    match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
    return match.group(1).strip() if match else default


def to_site_url(path):
    clean = path.replace("\\", "/")
    if clean == "index.html":
        return SITE_URL + "/"
    return f"{SITE_URL}/{clean}"


def rel_prefix(path):
    depth = len(Path(path).parts) - 1
    return "../" * depth


def clean_title(value):
    value = strip_tags(value)
    replacements = {
        "| Al-Qamar Islamic Research Institute | AQIRI": "| AQIRI",
        "| Al-Qamar | AQIRI": "| AQIRI",
        "| Al-Qamar Islamic Research Institute": "| AQIRI",
        "| Al-Qamar": "| AQIRI",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    if value == SITE_NAME or "AQIRI" in value:
        return value
    return f"{value} | AQIRI"


def extract_long_paragraph(html):
    paragraphs = re.findall(r"<p[^>]*>(.*?)</p>", html, re.IGNORECASE | re.DOTALL)
    for paragraph in paragraphs:
        text = strip_tags(paragraph)
        if len(text) < 70 or len(text) > 320:
            continue
        if "/" in text or text.lower().startswith("home "):
            continue
        if "skip to content" in text.lower():
            continue
        return text
    return ""


def auto_breadcrumbs(path, title):
    if path == "index.html":
        return []
    label = title.split("|")[0].strip()
    if path.startswith("departments/"):
        return [("Home", "/"), ("Departments", "/#departments"), (label, f"/{path}")]
    if path.startswith("administration/"):
        return [("Home", "/"), ("Administration", "/#administration"), (label, f"/{path}")]
    if path in {"advanced-diplomas.html", "postdoctoral-fellowships.html", "diploma-admission-form.html"}:
        return [("Home", "/"), ("Programs & Admissions", "/#programs"), (label, f"/{path}")]
    return [("Home", "/"), (label, f"/{path}")]


def infer_page_type(path):
    if path == "index.html":
        return "WebSite"
    if path.startswith("administration/"):
        return "ProfilePage"
    if path == "contact-aqiri.html":
        return "ContactPage"
    if path.startswith("departments/") or path == "board-of-governors.html":
        return "CollectionPage"
    if path == "director-general.html":
        return "AboutPage"
    return "WebPage"


def infer_image(path):
    if path.startswith("administration/"):
        return CUSTOM[path]["image"]
    if path == "director-general.html":
        return "/assets/prof-dr-shahbaz-khan-manj.jpg"
    if path == "index.html":
        return "/assets/hero-mosque-interior.jpg"
    return DEFAULT_IMAGE


def build_breadcrumb_schema(items):
    if not items:
        return None
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": index,
                "name": label,
                "item": SITE_URL + url,
            }
            for index, (label, url) in enumerate(items, start=1)
        ],
    }


def build_schema(path, title, description, breadcrumbs, image):
    absolute_url = to_site_url(path)
    page_type = CUSTOM.get(path, {}).get("page_type", infer_page_type(path))
    graph = [
        {
            "@type": "Organization",
            "@id": f"{SITE_URL}/#organization",
            "name": ORG_NAME,
            "url": SITE_URL + "/",
            "logo": {
                "@type": "ImageObject",
                "url": SITE_URL + DEFAULT_IMAGE,
            },
            "image": SITE_URL + DEFAULT_IMAGE,
        }
    ]

    if path == "index.html":
        graph.append(
            {
                "@type": "WebSite",
                "@id": f"{SITE_URL}/#website",
                "url": SITE_URL + "/",
                "name": ORG_NAME,
                "description": description,
                "publisher": {"@id": f"{SITE_URL}/#organization"},
            }
        )
    page = {
        "@type": page_type,
        "@id": f"{absolute_url}#webpage",
        "url": absolute_url,
        "name": title,
        "description": description,
        "isPartOf": {"@id": f"{SITE_URL}/#website"},
        "about": {"@id": f"{SITE_URL}/#organization"},
        "primaryImageOfPage": {"@type": "ImageObject", "url": SITE_URL + image},
    }

    custom = CUSTOM.get(path, {})
    person = custom.get("person")
    if person:
        person_schema = {
            "@type": "Person",
            "@id": f"{absolute_url}#person",
            "name": person["name"],
            "url": absolute_url,
            "image": SITE_URL + person["image"],
            "jobTitle": person["jobTitle"],
            "worksFor": {"@id": f"{SITE_URL}/#organization"},
            "affiliation": {
                "@type": "Organization",
                "name": person["affiliation"],
            },
        }
        graph.append(person_schema)
        page["mainEntity"] = {"@id": f"{absolute_url}#person"}

    breadcrumb_schema = build_breadcrumb_schema(breadcrumbs)
    if breadcrumb_schema:
        page["breadcrumb"] = {"@id": f"{absolute_url}#breadcrumb"}

    graph.append(page)

    if breadcrumb_schema:
        breadcrumb_schema["@id"] = f"{absolute_url}#breadcrumb"
        graph.append(breadcrumb_schema)

    return {"@context": "https://schema.org", "@graph": graph}


def build_head(path, html):
    custom = CUSTOM.get(path, {})
    extracted_title = extract(r"<title>(.*?)</title>", html, "AQIRI")
    extracted_description = extract(
        r'<meta\s+name="description"\s+content="(.*?)"\s*/?>',
        html,
        "",
    )
    h1 = strip_tags(extract(r"<h1[^>]*>(.*?)</h1>", html, ""))
    long_paragraph = extract_long_paragraph(html)
    if not extracted_description:
        extracted_description = long_paragraph or h1 or ORG_NAME

    title = custom.get("title") or clean_title(extracted_title)
    description = custom.get("description") or (long_paragraph if len(extracted_description) < 110 and long_paragraph else extracted_description)
    page_type = custom.get("page_type", infer_page_type(path))
    og_type = custom.get("og_type", "website" if path == "index.html" else "article" if page_type == "ProfilePage" else "website")
    image = custom.get("image", infer_image(path))
    url = to_site_url(path)
    prefix = rel_prefix(path)
    breadcrumbs = custom.get("breadcrumbs", auto_breadcrumbs(path, title))
    schema = json.dumps(build_schema(path, title, description, breadcrumbs, image), ensure_ascii=False, separators=(",", ":"))

    lines = [
        "  <meta charset=\"utf-8\">",
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        f"  <title>{escape(title)}</title>",
        f"  <meta name=\"description\" content=\"{escape(description, quote=True)}\">",
        "  <meta name=\"robots\" content=\"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1\">",
        "  <meta name=\"author\" content=\"Al-Qamar Islamic Research Institute\">",
        "  <meta name=\"theme-color\" content=\"#071c32\">",
        "  <meta name=\"format-detection\" content=\"telephone=no\">",
        f"  <link rel=\"canonical\" href=\"{url}\">",
        f"  <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"{prefix}{ICON_DIR}/favicon-32x32.png\">",
        f"  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"{prefix}{ICON_DIR}/apple-touch-icon.png\">",
        f"  <link rel=\"manifest\" href=\"{prefix}site.webmanifest\">",
        f"  <meta property=\"og:site_name\" content=\"{escape(ORG_NAME, quote=True)}\">",
        "  <meta property=\"og:locale\" content=\"en_US\">",
        f"  <meta property=\"og:type\" content=\"{og_type}\">",
        f"  <meta property=\"og:title\" content=\"{escape(title, quote=True)}\">",
        f"  <meta property=\"og:description\" content=\"{escape(description, quote=True)}\">",
        f"  <meta property=\"og:url\" content=\"{url}\">",
        f"  <meta property=\"og:image\" content=\"{SITE_URL + image}\">",
        f"  <meta property=\"og:image:alt\" content=\"{escape(title, quote=True)}\">",
        "  <meta name=\"twitter:card\" content=\"summary_large_image\">",
        f"  <meta name=\"twitter:title\" content=\"{escape(title, quote=True)}\">",
        f"  <meta name=\"twitter:description\" content=\"{escape(description, quote=True)}\">",
        f"  <meta name=\"twitter:image\" content=\"{SITE_URL + image}\">",
    ]
    lines.extend(f"  {line}" for line in FONT_PRECONNECTS)
    lines.append(f"  <link rel=\"stylesheet\" href=\"{prefix}styles.css\">")
    lines.append(f"  <script type=\"application/ld+json\">{schema}</script>")
    return "<head>\n" + "\n".join(lines) + "\n</head>\n"


def update_html_files():
    html_files = sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)
    for file_path in html_files:
        rel = file_path.relative_to(ROOT).as_posix()
        original = file_path.read_text(encoding="utf-8")
        updated = re.sub(r"<head>.*?</head>\s*", build_head(rel, original), original, count=1, flags=re.DOTALL | re.IGNORECASE)
        file_path.write_text(updated, encoding="utf-8")
        print(f"updated {rel}")


def write_manifest():
    manifest = {
        "name": ORG_NAME,
        "short_name": "AQIRI",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#f7f9f8",
        "theme_color": "#071c32",
        "icons": [
            {"src": "/assets/icons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/assets/icons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (ROOT / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def write_robots_and_sitemap():
    html_files = sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)
    urls = [to_site_url(path.relative_to(ROOT).as_posix()) for path in html_files]
    sitemap_lines = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ]
    for url in urls:
        sitemap_lines.extend([
            "  <url>",
            f"    <loc>{escape(url)}</loc>",
            "  </url>",
        ])
    sitemap_lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sitemap_lines) + "\n", encoding="utf-8")
    robots = "\n".join([
        "User-agent: *",
        "Allow: /",
        "",
        f"Sitemap: {SITE_URL}/sitemap.xml",
        "",
    ])
    (ROOT / "robots.txt").write_text(robots, encoding="utf-8")


if __name__ == "__main__":
    write_manifest()
    update_html_files()
    write_robots_and_sitemap()
