"""Build the library UI without duplicating the main site's PDF/cover library."""
import argparse
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATIC_FILES = ('styles.css', 'navigation.css', 'script.js', 'site-search.js',
                'library.css', 'library-batch.js', 'library-ui.js', 'book.html', 'seo-record.php', 'site.webmanifest')

def build(output):
    catalogue_source = (ROOT / 'library-batch.js').read_text()
    records = json.loads(catalogue_source.split('window.AQIRILibrary =', 1)[1].strip().removesuffix(';'))
    for record in records:
        names = [record.get('pdf') or record['file'] + '.pdf']
        cover = record.get('cover') or ('' if record.get('generatedCover') else record['file'] + '-title-page.png')
        if cover:
            names.append(cover)
        for name in names:
            if not (ROOT / 'assets' / 'library' / name).is_file():
                raise FileNotFoundError(f'Missing active library asset: {name}')
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        raise ValueError('Build output must be empty; use a fresh output directory.')
    for name in STATIC_FILES:
        shutil.copy2(ROOT / name, output / name)
    shutil.copytree(ROOT / 'assets' / 'icons', output / 'assets' / 'icons')
    shutil.copy2(ROOT / 'assets' / 'al-qamar-seal-transparent-v3.png', output / 'assets' / 'al-qamar-seal-transparent-v3.png')
    markup = (ROOT / 'library.html').read_text()
    markup = markup.replace('href="./"', 'href="https://www.aqiri.org/"')
    markup = markup.replace('href="library.html"', 'href="https://library.aqiri.org/"')
    (output / 'index.html').write_text(markup)
    (output / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: https://www.aqiri.org/sitemap.xml\n')
    (output / '.htaccess').write_text('<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteRule ^book\\.html$ seo-record.php [END]\n</IfModule>\n<IfModule mod_headers.c>\n  <FilesMatch "\\.(css|js)$">\n    Header set Cache-Control "no-cache, must-revalidate"\n  </FilesMatch>\n</IfModule>\n')
    print(f'Built library interface for {len(records)} records. PDFs and covers are served once from https://www.aqiri.org/assets/library/.')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    build(parser.parse_args().output.resolve())
