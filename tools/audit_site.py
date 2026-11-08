"""Check published HTML for missing local assets, duplicate IDs, and missing shared UI."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'.git', '.vscode', 'catalogue-upload-package', 'private-workshop-data'}

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.references = [], []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src', 'action'):
            if key in attrs:
                self.references.append((tag, attrs[key]))

def audit():
    issues = []
    pages = [p for p in ROOT.rglob('*.html') if not EXCLUDED.intersection(p.relative_to(ROOT).parts)]
    for path in pages:
        source = path.read_text()
        page = Page()
        page.feed(source)
        label = str(path.relative_to(ROOT))
        if not source.lstrip().lower().startswith('<!doctype html>'):
            issues.append([label, 'Missing or malformed HTML doctype'])
        if len(page.ids) != len(set(page.ids)):
            issues.append([label, 'Duplicate HTML IDs'])
        if 'script.js' in source and 'navigation.css' not in source:
            issues.append([label, 'Missing shared navigation stylesheet'])
        for tag, reference in page.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc or not url.path:
                continue
            target = (ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else path.parent / unquote(url.path)).resolve()
            if not target.exists():
                issues.append([label, f'Missing {tag} target: {reference}'])
            elif target.name == 'index.html' and url.fragment:
                destination = Page()
                destination.feed(target.read_text())
                if url.fragment not in destination.ids:
                    issues.append([label, f'Missing homepage anchor: {reference}'])
    return {'pages_checked': len(pages), 'issues': issues}

if __name__ == '__main__':
    result = audit()
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['issues']))
