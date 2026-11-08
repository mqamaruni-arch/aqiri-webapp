"""Refresh metadata and crawlable HTML while preserving page styles/scripts.
Run after changing public content, people data, or catalogue records.
"""
from pathlib import Path
from html import escape, unescape
import json, re, hashlib, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.aqiri.org'
ORG = 'Al-Qamar Islamic Research Institute'
LOGO = BASE + '/assets/al-qamar-seal-transparent-v3.png'
NOINDEX = {'book.html','person-profile.html','on-work-2026-01-registration.html','diploma-admission-form.html','report-security-issue.html','report-copyright-infringement.html','conferences.html','advisory-council.html','postdoctoral-fellows.html'}
COPY = {
 'who-owns-the-sky.html': ('Who Owns the Sky? Islamic Jurisprudence Research | AQIRI', 'Research Fellow Emiola Habeeb explores Islamic jurisprudence and celestial commons at AQIRI. Research begins 15 November 2026.'),
 'index.html': ('AQIRI | Islamic Research Institute in Lahore', 'Al-Qamar Islamic Research Institute (AQIRI), Lahore, supports Islamic Studies through research, scholarly publications, advanced diplomas, and online workshops.'),
 'advanced-diplomas.html': ('Advanced Diplomas: Fall 2026 Admissions | AQIRI', 'Apply by 30 November 2026 for AQIRI advanced diplomas in Arabic language and Islamic texts, or academic research and scholarly writing. Spring and Fall intakes.'),
 'on-work-2026-01.html': ('Research Methods in Islamic Studies Workshop | AQIRI', 'Join AQIRI’s online Islamic Studies research workshop on 21–22 November 2026, 8–11 p.m. Pakistan time. Topic selection, proposals, theses, and articles. PKR 2,000.'),
 'on-work-2026-01-registration.html': ('Workshop Registration: Research Methods | AQIRI', 'Register for AQIRI’s Research Methods in Islamic Studies online workshop, 21–22 November 2026. Fee: PKR 2,000 for both days.'),
 'news-and-events.html': ('News & Events | AQIRI, Lahore', 'Explore upcoming AQIRI workshops and academic events, followed by the latest admissions news and publishing announcements from Lahore.'),
 'director-general.html': ('Director General: Prof. Dr. Muhammad Shahbaz Khan Manj | AQIRI', 'Read the message from Prof. Dr. Muhammad Shahbaz Khan Manj, Director General of AQIRI, Lahore, on Islamic scholarship, research, teaching, and publication.'),
 'board-of-governors.html': ('Board of Governors | AQIRI Institute Leadership', 'Meet the AQIRI Board of Governors and read the profiles of scholars guiding academic policy, institutional standards, and long-term development.'),
 'research-contributors.html': ('Research Fellows | AQIRI', 'Meet AQIRI research fellows and explore their academic backgrounds, research interests, and contributions to Islamic Studies.'),
 'administrative-staff.html': ('Administrative Staff | AQIRI', 'Meet the administrative and editorial staff supporting research, scholarly publishing, and institutional work at AQIRI, Lahore.'),
 'book.html': ('Library Record | AQIRI', 'View publication details, author and publisher information, and available PDF access for a selected AQIRI Library catalogue record.'),
 'person-profile.html': ('Person Profile | AQIRI', 'Read the academic background, institutional role, and research interests of a selected AQIRI researcher, staff member, or workshop speaker.'),
 'advisory-council.html': ('Advisory Council | AQIRI Institute Leadership', 'Learn about the AQIRI Advisory Council and its independent academic guidance. Council appointments will be published once formally announced.'),
 'postdoctoral-fellows.html': ('Postdoctoral Fellows | AQIRI', 'Information about AQIRI postdoctoral fellows and research projects. Current fellowship appointments will be published once formally announced.'),
 'library.html': ('Islamic Studies Library: Books & Publications | AQIRI', 'Browse 172 scholarly books and open-access publications in the AQIRI Library. Search by title or author, read catalogue records, and access available PDFs.'),
 'postdoctoral-fellowships.html': ('Postdoctoral Fellowships in Islamic Studies | AQIRI', 'Explore AQIRI postdoctoral fellowships, including research expectations, eligibility, application guidance, and opportunities for scholarly collaboration.'),
 'careers.html': ('Careers & Academic Opportunities | AQIRI', 'Explore AQIRI career opportunities, academic appointments, internships, and ways to contribute to Islamic research and scholarly publishing.'),
 'manuscripts.html': ('Submit a Manuscript: Author Guidelines | AQIRI', 'Read AQIRI manuscript submission guidelines, journal options, editorial review procedures, citation requirements, and publication ethics.'),
 'contact-aqiri.html': ('Contact AQIRI | Al-Qamar Islamic Research Institute, Lahore', 'Contact AQIRI in Lahore about academic collaboration, publications, admissions, or institutional enquiries. Find the appropriate office and contact details.'),
 'location-and-directions.html': ('Location & Directions | AQIRI, Lahore', 'Find AQIRI’s Regional Administrative Office on Hospital Road, Manga Mandi, Lahore. Office hours: 9 AM to 8 PM, Monday to Saturday.'),
}

def data(name, declaration):
    text=(ROOT/name).read_text(); text=text[text.index('=',text.index(declaration))+1:].lstrip()
    return json.JSONDecoder().raw_decode(text)[0]

people=data('people-data.js','const aqiriPeople')
bios=data('people-data.js','const aqiriPeopleBios')
books=data('library-batch.js','window.AQIRILibrary')
text=(ROOT/'administration/profile.js').read_text().split('const profile =')[0].split('=',1)[1].strip().removesuffix(';')
leaders=json.loads(re.sub(r'(\n\s*)([A-Za-z_]\w*):',r'\1"\2":',text))

def plain(text):
    return ' '.join(unescape(re.sub('<[^>]+>',' ',text)).split())

def short(text, limit=160):
    text=plain(text)
    return text if len(text)<=limit else text[:limit-1].rsplit(' ',1)[0]+'…'

def url(path):
    return BASE+'/' if path=='index.html' else BASE+'/'+path

def organization():
    return {'@type':'Organization','@id':BASE+'/#organization','name':ORG,'alternateName':'AQIRI','url':BASE+'/', 'logo':{'@type':'ImageObject','url':LOGO},'email':'info@aqiri.org','address':{'@type':'PostalAddress','name':'Regional Administrative Office','streetAddress':'Hospital Road, Manga Mandi','addressLocality':'Lahore','addressCountry':'PK'}}

def navigation(prefix):
    home=prefix or './'
    def link(label,target):
        destination=home+target.removeprefix('index.html') if target.startswith('index.html') else prefix+target
        return f'<a href="{destination}">{escape(label)}</a>'
    groups=[('Programs',[('Diploma Programs','advanced-diplomas.html'),('Postdoctoral Fellowships','postdoctoral-fellowships.html')]),('People',[('Board of Governors','board-of-governors.html'),('Advisory Council','advisory-council.html'),('Director General','director-general.html'),('Research Fellows','research-contributors.html'),('Postdoctoral Fellows','postdoctoral-fellows.html'),('Administrative Staff','administrative-staff.html')])]
    group={label:'<div class="nav-dropdown"><span>'+label+'</span><div class="nav-submenu">'+''.join(link(*item) for item in items)+'</div></div>' for label,items in groups}
    return f'<header class="site-header"><div class="shell brand-row"><a class="brand" href="{home}"><span><strong>Al-Qamar</strong><small>Islamic Research Institute</small></span></a></div><nav id="site-nav" class="main-nav" aria-label="Main navigation"><div class="shell nav-inner">'+link('Home','index.html')+link('About','index.html#about')+link('Research','index.html#departments')+'<a href="https://publications.aqiri.org/">Publications</a>'+group['Programs']+link('Library','library.html')+link('News & Events','news-and-events.html')+group['People']+link('Careers','careers.html')+link('Contact','contact-aqiri.html')+'</div></nav></header>'

def metadata(path, source):
    old_title=re.search(r'<title>(.*?)</title>',source,re.S)
    old_desc=re.search(r'<meta name="description" content="([^"]*)"',source)
    title,desc=COPY.get(path,(plain(old_title.group(1)) if old_title else Path(path).stem.replace('-',' ').title()+' | AQIRI', unescape(old_desc.group(1)) if old_desc else 'Information from '+ORG+', Lahore.'))
    if path=='library.html':desc=desc.replace('172',str(len(books)))
    canonical=url(path); image=LOGO; page_type='WebPage'; more=[]
    if path.startswith('administration/'):
        slug=re.search(r'data-profile="([^"]+)"',source).group(1); record=leaders[slug]
        if slug=='shahbaz-khan-manj':record['name']='Prof. Dr. Muhammad Shahbaz Khan Manj'
        title=record['name']+' | AQIRI';desc=short(record['bio'][0]);image=BASE+'/'+record['image'].removeprefix('../');page_type='ProfilePage'
        person={'@type':'Person','@id':canonical+'#person','name':record['name'],'description':desc,'image':image,'affiliation':{'@type':'Organization','name':record['institution']},'url':canonical}
        more.append(person)
    elif path in ['board-of-governors.html','research-contributors.html','administrative-staff.html','library.html','news-and-events.html']:page_type='CollectionPage'
    elif path in ['contact-aqiri.html','location-and-directions.html']:page_type='ContactPage'
    elif path=='director-general.html':image=BASE+'/assets/prof-dr-shahbaz-khan-manj.jpg'
    elif path=='who-owns-the-sky.html':image=BASE+'/assets/research-celestial-commons-pegasus.webp'
    graph=[organization()]
    if path=='index.html':graph.append({'@type':'WebSite','@id':BASE+'/#website','url':BASE+'/','name':ORG,'alternateName':'AQIRI','publisher':{'@id':BASE+'/#organization'}})
    webpage={'@type':page_type,'@id':canonical+'#webpage','url':canonical,'name':title,'description':desc,'isPartOf':{'@id':BASE+'/#website'},'publisher':{'@id':BASE+'/#organization'},'inLanguage':'en','primaryImageOfPage':{'@type':'ImageObject','url':image}}
    if more:webpage['mainEntity']={'@id':canonical+'#person'}
    if path!='index.html':
        crumbs=[{'@type':'ListItem','position':1,'name':'Home','item':BASE+'/'}]
        if path.startswith('administration/'):
            director='shahbaz-khan-manj' in path
            crumbs.append({'@type':'ListItem','position':2,'name':'Director General' if director else 'Board of Governors','item':BASE+('/director-general.html' if director else '/board-of-governors.html')})
        elif path in ['board-of-governors.html','director-general.html']:
            crumbs.append({'@type':'ListItem','position':2,'name':'Institute Leadership','item':BASE+'/#administration'})
        crumbs.append({'@type':'ListItem','position':len(crumbs)+1,'name':title.split(' | ')[0],'item':canonical})
        graph.append({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb','itemListElement':crumbs});webpage['breadcrumb']={'@id':canonical+'#breadcrumb'}
    if path=='on-work-2026-01.html':
        graph.append({'@type':'EducationEvent','@id':canonical+'#workshop','name':'Research Methods in Islamic Studies','url':canonical,'description':desc,'startDate':'2026-11-21T20:00:00+05:00','endDate':'2026-11-22T23:00:00+05:00','eventAttendanceMode':'https://schema.org/OnlineEventAttendanceMode','eventStatus':'https://schema.org/EventScheduled','location':{'@type':'VirtualLocation','url':canonical},'organizer':{'@id':BASE+'/#organization'},'image':image,'offers':{'@type':'Offer','price':'2000','priceCurrency':'PKR','url':BASE+'/on-work-2026-01-registration.html'},'eventSchedule':{'@type':'Schedule','startDate':'2026-11-21','endDate':'2026-11-22','startTime':'20:00:00','endTime':'23:00:00','repeatFrequency':'P1D','scheduleTimezone':'Asia/Karachi'}})
        webpage['mainEntity']={'@id':canonical+'#workshop'}
    graph.extend([webpage]+more)
    return title,desc,canonical,image,{'@context':'https://schema.org','@graph':graph}

def refresh_head(path,source):
    head=re.search(r'<head>(.*?)</head>',source,re.S|re.I).group(1)
    head=re.sub(r'<title>.*?</title>\s*','',head,flags=re.S|re.I)
    head=re.sub(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>\s*','',head,flags=re.S|re.I)
    head=re.sub(r'<meta\b[^>]*(?:name=["\'](?:description|robots|author|theme-color)["\']|property=["\']og:[^"\']+["\']|name=["\']twitter:[^"\']+["\'])[^>]*>\s*','',head,flags=re.I)
    head=re.sub(r'<link\b[^>]*rel=["\']canonical["\'][^>]*>\s*','',head,flags=re.I)
    title,desc,canonical,image,schema=metadata(path,source)
    robots='noindex, follow' if path in NOINDEX else 'index, follow, max-image-preview:large'
    prefix='../' if '/' in path else ''
    extra=[]
    if 'rel="icon"' not in head:extra.append(f'<link rel="icon" type="image/png" sizes="32x32" href="{prefix}assets/icons/favicon-32x32.png">')
    if 'rel="apple-touch-icon"' not in head:extra.append(f'<link rel="apple-touch-icon" sizes="180x180" href="{prefix}assets/icons/apple-touch-icon.png">')
    if 'rel="manifest"' not in head:extra.append(f'<link rel="manifest" href="{prefix}site.webmanifest">')
    tags=[f'<title>{escape(title)}</title>',f'<meta name="description" content="{escape(desc,quote=True)}">',f'<meta name="robots" content="{robots}">',f'<meta name="author" content="{ORG}">','<meta name="theme-color" content="#071c32">']
    if path not in ['book.html','person-profile.html']:tags.append(f'<link rel="canonical" href="{canonical}">')
    for prop,value in [('og:site_name',ORG),('og:locale','en_US'),('og:type','profile' if path.startswith('administration/') else 'website'),('og:title',title),('og:description',desc),('og:url',canonical),('og:image',image),('og:image:alt',title)]:tags.append(f'<meta property="{prop}" content="{escape(value,quote=True)}">')
    for name,value in [('twitter:card','summary'),('twitter:title',title),('twitter:description',desc),('twitter:image',image),('twitter:image:alt',title)]:tags.append(f'<meta name="{name}" content="{escape(value,quote=True)}">')
    payload=json.dumps(schema,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
    tags+=extra+['<script type="application/ld+json">'+payload+'</script>']
    return re.sub(r'<head>.*?</head>','<head>'+head.rstrip()+'\n  '+'\n  '.join(tags)+'\n</head>',source,count=1,flags=re.S|re.I)

def person_card(person,category):
    slug,name,role,title,affiliation,*photos=person
    photo=photos[0] if photos else ''
    image=f'<img class="staff-photo" src="{escape(photo)}" alt="{escape(name)}" loading="lazy">' if photo else ''
    label='' if category=='research' else '<span>'+escape('Editorial Associate' if slug!='vk-muhammad-qamar-khan' else role)+'</span>'
    return f'<article class="staff-card" data-person="{slug}">{image}{label}<h4>{escape(name)}</h4><p>{escape(title)}<br>{escape(affiliation)}</p><a href="person-profile.html?person={slug}">View profile <b>→</b></a></article>'

def render_static(path,source):
    prefix='../' if '/' in path else ''
    if path.startswith('administration/'):
        template=(ROOT/'administration/profile-template.js').read_text();body=template.split('`',1)[1].rsplit('`',1)[0]
        record=leaders[re.search(r'data-profile="([^"]+)"',source).group(1)]
        body=re.sub(r'(<h1 data-name>).*?(</h1>)',lambda m:m[1]+escape(record['name'])+m[2],body)
        body=body.replace('<span data-name></span>','<span data-name>'+escape(record['name'])+'</span>')
        body=body.replace('<p class="profile-institution" data-institution></p>','<p class="profile-institution" data-institution>'+escape(record['institution'])+'</p>')
        body=body.replace('<img data-photo alt="">',f'<img data-photo src="{escape(record["image"])}" alt="{escape(record["name"])}">')
        for key,attr in [('bio','data-bio'),('contribution','data-contribution')]:body=body.replace(f'<div class="profile-prose" {attr}></div>',f'<div class="profile-prose" {attr}>'+''.join('<p>'+escape(x)+'</p>' for x in record[key])+'</div>')
        body=body.replace('<ol data-fields></ol>','<ol data-fields>'+''.join(f'<li><span>{i:02d}</span>{escape(x)}</li>' for i,x in enumerate(record['fields'],1))+'</ol>')
        if 'shahbaz-khan-manj' in path:
            body=body.replace('Board Member</p>','Director General</p>').replace('href="../board-of-governors.html" data-profile-parent>Board of Governors','href="../director-general.html" data-profile-parent>Director General').replace('href="../board-of-governors.html" data-profile-back>← Back to Board','href="../director-general.html" data-profile-back>← Back to Director General')
        source=re.sub(r'<div id="profile-shell">.*?</div>(?=<script)',lambda _: '<div id="profile-shell">'+body+'</div>',source,flags=re.S)
    if path in ['research-contributors.html','administrative-staff.html']:
        category='research' if path.startswith('research') else 'administrative'
        ids=['vk-muhammad-qamar-khan','dr-abdul-basit','moqadus-habiba','dr-loqman-ahmad','dr-amjad-hussain','dr-memoona-rafi-bajwa']
        order=['shadeka-jannat','emiola-habeeb','dr-ade-jamarudin','dr-idris-abdur-rahman','ibraheem-abdulwahab-abdulkareem','abba-a-dandago']
        selected=[x for x in people if 'Research Fellow' in x[2] and len(x)>5] if category=='research' else [x for x in people if x[0] in ids]
        if category=='research':selected.sort(key=lambda p:order.index(p[0]) if p[0] in order else -1)
        source=re.sub(r'(<div[^>]*id="people-category-grid"[^>]*>).*?(</div>\s*</div>\s*</section>)',lambda m:m[1]+''.join(person_card(x,category) for x in selected)+m[2],source,flags=re.S)
    if path=='library.html':
        cards=[]
        for book in sorted(books,key=lambda b:b['title'].lower()):
            record='book.html?record='+book['file'];cover=book.get('cover') or ('' if book.get('generatedCover') else book['file']+'-title-page.png')
            image=f'<a class="catalogue-cover" href="{record}" aria-label="View record for {escape(book["title"])}"><img src="assets/library/{escape(cover)}" alt="Cover of {escape(book["title"])}" loading="lazy"></a>' if cover else ''
            cards.append(f'<article class="catalogue-card">{image}<div class="catalogue-card-copy"><p class="catalogue-year">{escape(book.get("year", ""))}</p><h2><a href="{record}">{escape(book["title"])}</a></h2><p class="catalogue-author">{escape(book.get("author", ""))}</p><a class="catalogue-record-link" href="{record}">View publication record <b>→</b></a></div></article>')
        source=re.sub(r'(<div id="library-results"[^>]*>).*?(</div><p id="library-empty")',lambda m:m[1]+''.join(cards)+m[2],source,flags=re.S)
        source=re.sub(r'(<p id="library-count"[^>]*>).*?(</p>)',lambda m:m[1]+f'{len(books)} titles available'+m[2],source,flags=re.S)
    source=re.sub(r'<header class="site-header">.*?</header>',lambda _:navigation(prefix),source,count=1,flags=re.S)
    return source

def update():
    search=ROOT/'site-search.js'
    search_version=hashlib.sha256(search.read_bytes()).hexdigest()[:12]
    shared=ROOT/'script.js'
    shared.write_text(re.sub(r'site-search\.js\?v=[A-Za-z0-9-]+', 'site-search.js?v='+search_version, shared.read_text()))
    pages=sorted(p for p in ROOT.rglob('*.html') if not {'.git','library-site','private-workshop-data'}.intersection(p.relative_to(ROOT).parts))
    for path in pages:
        rel=path.relative_to(ROOT).as_posix();source=path.read_text();source=render_static(rel,source)
        if rel=='index.html':source=source.replace('<h2>Islamic Research &amp; Publication <em>Since 2014</em></h2>','<h1>Islamic Research &amp; Publication <em>Since 2014</em></h1>')
        source=refresh_head(rel,source)
        def version_asset(match):
            asset=(path.parent/match.group(2)).resolve()
            if not asset.is_file():return match.group(0)
            return match.group(1)+match.group(2)+'?v='+hashlib.sha256(asset.read_bytes()).hexdigest()[:12]+'\"'
        source=re.sub(r'((?:href|src)=\")((?:\.\./)?[A-Za-z0-9_./-]+\.(?:css|js))(?:\?[^\"]*)?\"',version_asset,source)
        path.write_text(source)
    ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns);sitemap=ET.Element('{'+ns+'}urlset')
    urls=[url(p.relative_to(ROOT).as_posix()) for p in pages if p.relative_to(ROOT).as_posix() not in NOINDEX]
    urls += [BASE+'/person-profile.html?person='+person[0] for person in people if not (ROOT/'administration'/(person[0]+'.html')).exists()]
    urls += [BASE+'/book.html?record='+book['file'] for book in books]
    for item in sorted(set(urls)):
        node=ET.SubElement(sitemap,'{'+ns+'}url');ET.SubElement(node,'{'+ns+'}loc').text=item
    tree=ET.ElementTree(sitemap);ET.indent(tree,space='  ');tree.write(ROOT/'sitemap.xml',encoding='UTF-8',xml_declaration=True)
    with (ROOT/'sitemap.xml').open('a') as f:f.write('\n')
    (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /private-workshop-data/\nDisallow: /workshop-register.php\nDisallow: /seo-record.php\nDisallow: /tools/\nDisallow: /.git/\nDisallow: /.github/\nDisallow: /.vscode/\n\nSitemap: '+BASE+'/sitemap.xml\n')
    print(f'Updated {len(pages)} HTML pages; sitemap contains {len(set(urls))} canonical URLs.')

if __name__=='__main__':update()
