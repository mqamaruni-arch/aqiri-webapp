"""Audit static SEO and, optionally, canonical record URLs on a local PHP server."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import urlopen
from urllib.error import HTTPError
from concurrent.futures import ThreadPoolExecutor
import argparse,json,xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
BASE='https://www.aqiri.org'
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.metas={};self.canonicals=[];self.titles=[];self.h1=0;self.schemas=[];self.in_title=False;self.in_schema=False;self.buffer=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.metas.setdefault(a.get('name',a.get('property','')),[]).append(a.get('content',''))
  if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a['href'])
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True;self.buffer=''
  if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True;self.buffer=''
 def handle_data(self,text):
  if self.in_title or self.in_schema:self.buffer+=text
 def handle_endtag(self,tag):
  if tag=='title' and self.in_title:self.titles.append(self.buffer);self.in_title=False
  if tag=='script' and self.in_schema:self.schemas.append(json.loads(self.buffer));self.in_schema=False

def check(source,label,indexable=False,canonical=None):
 p=Page();p.feed(source);errors=[]
 if len(p.titles)!=1 or not p.titles[0].strip():errors.append('Missing/duplicate title')
 for key in ['description','robots','og:title','og:description','og:url','og:image','twitter:card']:
  if len(p.metas.get(key,[]))!=1 or not p.metas[key][0].strip():errors.append('Missing/duplicate '+key)
 if canonical is not None and p.canonicals!=[canonical]:errors.append('Canonical mismatch')
 if indexable:
  if p.h1!=1:errors.append(f'Expected one H1, found {p.h1}')
  if any('noindex' in x for x in p.metas.get('robots',[])):errors.append('Unexpected noindex')
 if len(p.schemas)!=1:errors.append('Missing/duplicate schema graph')
 else:
  for node in p.schemas[0].get('@graph',[]):
   if '@type' not in node:errors.append('Schema node missing type')
 return {'page':label,'errors':errors}

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--server',help='Optional local PHP server origin, such as http://127.0.0.1:5515');args=parser.parse_args()
 sitemap=ET.parse(ROOT/'sitemap.xml');urls=[x.text for x in sitemap.findall('{*}url/{*}loc')]
 assert len(urls)==len(set(urls)), 'Duplicate sitemap URLs'
 assert all(u.startswith(BASE+'/') for u in urls), 'Noncanonical sitemap host'
 results=[];styles_ok=True
 for path in sorted(ROOT.rglob('*.html')):
  if {'.git','library-site','private-workshop-data'}.intersection(path.relative_to(ROOT).parts):continue
  rel=path.relative_to(ROOT).as_posix();canonical=BASE+'/' if rel=='index.html' else BASE+'/'+rel
  indexed=canonical in urls
  results.append(check(path.read_text(),rel,indexed,canonical if rel not in ['book.html','person-profile.html'] else None))
 if args.server:
  def request(url):
   part=urlsplit(url);target=args.server.rstrip('/')+part.path+('?' + part.query if part.query else '')
   try:
    with urlopen(target,timeout=20) as response:
     return check(response.read().decode(),url,True,url)
   except Exception as e:return {'page':url,'errors':[str(e)]}
  with ThreadPoolExecutor(max_workers=4) as pool:results+=list(pool.map(request,urls))
  for query in ['book.html?record=missing-record','person-profile.html?person=missing-person','book.html','person-profile.html']:
   try:urlopen(args.server+'/'+query);results.append({'page':query,'errors':['Missing record did not return 404']})
   except HTTPError as e:
    if e.code!=404:results.append({'page':query,'errors':['Expected 404, got '+str(e.code)]})
 failures=[x for x in results if x['errors']]
 print(json.dumps({'sitemap_urls':len(urls),'pages_checked':len(results),'failures':failures},indent=2))
 raise SystemExit(bool(failures))
if __name__=='__main__':main()
