# Namecheap deployment

The GitHub workflow `.github/workflows/namecheap-deploy.yml` deploys the site by FTP to `ftp.aqiri.org`. It requires the repository secrets `NAMECHEAP_FTP_USERNAME` and `NAMECHEAP_FTP_PASSWORD`. The configured remote directory is `./`, relative to that FTP account's root; ensure the account is scoped to the website directory.

## Main website

The first job uploads the working website, excluding Git/editor files, development tools, local build output, this document, and workshop registration CSV files. Source PDFs and covers remain in `assets/library/` on the main domain.

## Library subdomain

After the main deployment succeeds, `tools/build_library_site.py` builds the library interface for `library.aqiri.org`. It validates the 172 active catalogue records before packaging. PDFs and covers are served from `https://www.aqiri.org/assets/library/`; the subdomain package does not copy the library asset directory.

To inspect a package locally, build into a new, empty directory:

```sh
python3 tools/build_library_site.py --output /tmp/aqiri-library-preview
```

The script intentionally refuses a nonempty output directory. Shared PDFs use `?download=1` for download links; the main site's `.htaccess` sets the attachment response header for those requests. Verify this Apache behaviour on hosting after deployment.

## Workshop registration

`on-work-2026-01.html` links to `on-work-2026-01-registration.html`, which posts to `workshop-register.php` (PHP 7.4+). The `private-workshop-data` directory must be writable by PHP and contain its browser-access-denying `.htaccess`. Use normal hosting ownership and permissions, not world-writable permissions.

Applications append to `private-workshop-data/workshop-2026-01-registrations.csv`, created after the first successful application. Retrieve it through cPanel File Manager or FTP. It is excluded from Git and deployment synchronization. Never upload applicant records into source control.

Before opening registration on the deployed server, submit a test application, check its saved row in cPanel, and confirm a direct browser request to the CSV returns HTTP 403. Static preview servers do not process PHP or apply Apache access/download rules. The form does not collect payment. It saves registrations for office follow-up; it does not automatically send email or phone messages.

The current form collects name, email, phone with country code, optional institution, optional academic role, and consent. If the existing CSV uses the older fields, the handler preserves those rows and columns while adding the new role and registration-reference columns. A protected lock file coordinates writes; retries with the same reference do not add duplicate rows. Success is shown only after the CSV write completes.

## Local checks

```sh
python3 -B tools/audit_site.py
```

This checks HTML structure, local file targets, shared navigation styles, and homepage anchors. The People main tab is a menu control; the retired `people.html` URL redirects to the Research Fellows subpage. Person profiles and other People subtabs remain available.


## SEO updates

Run `python3 -B tools/update_seo.py` after changing public copy, person data, or catalogue records. The generator is repeatable and uses content hashes for CSS/JavaScript versions. It preserves stylesheet/script links while updating metadata, initial HTML content, robots.txt, and the canonical sitemap. The preferred main host is `https://www.aqiri.org/`; the workshop URL remains `/on-work-2026-01.html`.

Apache/LiteSpeed rewrites `book.html?record=…` and `person-profile.html?person=…` internally to `seo-record.php` so valid records have indexable content and metadata before JavaScript runs. Missing/invalid records return HTTP 404 with noindex. The empty templates, submission/report forms, and not-yet-announced placeholder directories are excluded from the sitemap. The library subdomain uses main-site canonical URLs for shared catalogue content.

After deployment, verify the host/HTTPS redirects and query-page rewrites on hosting, inspect the sitemap in Google Search Console, and test representative URLs with URL Inspection. No Google verification tokens or analytics IDs have been fabricated; Search Console verification and sitemap submission require the site's owner account.


SEO validation commands:

```sh
python3 -B tools/audit_seo.py
python3 -B tools/audit_site.py
```

`audit_seo.py --server http://127.0.0.1:PORT` additionally checks every sitemap URL on a local PHP preview that routes book/person URLs to `seo-record.php`. Apache/LiteSpeed applies that routing from `.htaccess` on hosting. Empty record templates, forms/report endpoints, and unannounced placeholder directories are deliberately not indexed; remove a placeholder from `NOINDEX` in the generator once real content is published.

The online workshop has accurate EducationEvent metadata, but Google currently excludes purely virtual events from its event rich-result experience. The markup makes no guarantee of a rich result or ranking.
