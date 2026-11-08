<?php
/** Server-render query-based catalogue/person pages without duplicating their data. */
declare(strict_types=1);
const SEO_BASE = 'https://www.aqiri.org';
header('Content-Type: text/html; charset=utf-8');
function seoEscape(string $text): string { return htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); }
function seoJson(array $value): string { return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_THROW_ON_ERROR); }
function seoData(string $file, string $declaration): array {
    $source = file_get_contents(__DIR__ . '/' . $file);
    if ($source === false) throw new RuntimeException('Missing record data.');
    if ($file === 'library-batch.js') {
        $json = trim(explode('window.AQIRILibrary =', $source, 2)[1] ?? '');
        return json_decode(rtrim($json, ";\r\n\t "), true, 512, JSON_THROW_ON_ERROR);
    }
    $pattern = '/const ' . preg_quote($declaration, '/') . ' = (.*?);\s*(?:const |$)/s';
    if (!preg_match($pattern, $source, $match)) throw new RuntimeException('Unrecognized person data format.');
    return json_decode($match[1], true, 512, JSON_THROW_ON_ERROR);
}
function seoDescription(string $text): string {
    $text = preg_replace('/\s+/u', ' ', strip_tags($text));
    if (preg_match('/^.{0,155}(?=\s|$)/us', $text, $match) && strlen($match[0]) < strlen($text)) return rtrim($match[0]) . '…';
    return $text;
}
function seoHead(string $html, string $title, string $description, string $canonical, string $image, array $entity, bool $valid): string {
    preg_match('/<script type="application\/ld\+json">(.*?)<\/script>/s', $html, $old);
    $oldGraph = isset($old[1]) ? json_decode($old[1], true) : [];
    $organization = $oldGraph['@graph'][0] ?? ['@type'=>'Organization','@id'=>SEO_BASE.'/#organization','name'=>'Al-Qamar Islamic Research Institute','url'=>SEO_BASE.'/'];
    $page = ['@type'=>($entity['@type'] ?? '') === 'Person' ? 'ProfilePage' : 'WebPage','@id'=>$canonical.'#webpage','url'=>$canonical,'name'=>$title,'description'=>$description,'inLanguage'=>'en','isPartOf'=>['@id'=>SEO_BASE.'/#website'],'publisher'=>['@id'=>SEO_BASE.'/#organization']];
    if ($valid) $page['mainEntity'] = ['@id'=>$entity['@id']];
    $graph = [$organization, $page];
    if ($valid) {
        $graph[] = $entity;
        $graph[] = ['@type'=>'BreadcrumbList','itemListElement'=>[
            ['@type'=>'ListItem','position'=>1,'name'=>'Home','item'=>SEO_BASE.'/'],
            ['@type'=>'ListItem','position'=>2,'name'=>($entity['@type'] === 'Book' ? 'Library' : 'Institute Leadership'),'item'=>SEO_BASE.($entity['@type'] === 'Book' ? '/library.html' : '/#administration')],
            ['@type'=>'ListItem','position'=>3,'name'=>$entity['name'],'item'=>$canonical]
        ]];
    }
    return preg_replace_callback('/<head>(.*?)<\/head>/s', static function ($match) use ($title,$description,$canonical,$image,$graph,$valid) {
        $head = preg_replace('/<title>.*?<\/title>\s*/s', '', $match[1]);
        $head = preg_replace('/<script\b[^>]*type=["\']application\/ld\+json["\'][^>]*>.*?<\/script>\s*/s', '', $head);
        $head = preg_replace('/<meta\b[^>]*(?:name=["\'](?:description|robots)["\']|property=["\']og:[^"\']+["\']|name=["\']twitter:[^"\']+["\'])[^>]*>\s*/i', '', $head);
        $head = preg_replace('/<link\b[^>]*rel=["\']canonical["\'][^>]*>\s*/i', '', $head);
        $tags = '<title>'.seoEscape($title).'</title><meta name="description" content="'.seoEscape($description).'"><meta name="robots" content="'.($valid ? 'index, follow, max-image-preview:large' : 'noindex, follow').'">';
        if ($valid) $tags .= '<link rel="canonical" href="'.seoEscape($canonical).'">';
        foreach (['og:site_name'=>'Al-Qamar Islamic Research Institute','og:type'=>(($graph[2]['@type'] ?? '') === 'Person' ? 'profile' : (($graph[2]['@type'] ?? '') === 'Book' ? 'book' : 'website')),'og:title'=>$title,'og:description'=>$description,'og:url'=>$canonical,'og:image'=>$image,'og:image:alt'=>$title] as $key=>$value) $tags .= '<meta property="'.$key.'" content="'.seoEscape($value).'">';
        foreach (['twitter:card'=>'summary','twitter:title'=>$title,'twitter:description'=>$description,'twitter:image'=>$image,'twitter:image:alt'=>$title] as $key=>$value) $tags .= '<meta name="'.$key.'" content="'.seoEscape($value).'">';
        return '<head>'.$head.$tags.'<script type="application/ld+json">'.seoJson(['@context'=>'https://schema.org','@graph'=>$graph]).'</script></head>';
    }, $html, 1);
}
try {
    $path = basename(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '');
    if (!in_array($path, ['book.html','person-profile.html'], true)) { http_response_code(404); header('X-Robots-Tag: noindex'); echo 'Page not found.'; exit; }
    $isBook = $path === 'book.html';
    $key = $isBook ? 'record' : 'person';
    $id = isset($_GET[$key]) && is_string($_GET[$key]) ? $_GET[$key] : '';
    $record = null;
    if (preg_match('/^[a-z0-9][a-z0-9-]{0,120}$/', $id)) {
        foreach (seoData($isBook ? 'library-batch.js' : 'people-data.js', $isBook ? '' : 'aqiriPeople') as $entry) {
            if (($isBook ? $entry['file'] : $entry[0]) === $id) { $record = $entry; break; }
        }
    }
    if (!$isBook && $record && is_file(__DIR__.'/administration/'.$id.'.html')) {
        header('Location: '.SEO_BASE.'/administration/'.$id.'.html', true, 301); exit;
    }
    $html = file_get_contents(__DIR__.'/'.$path);
    if ($html === false) throw new RuntimeException('Missing record template.');
    $canonical = SEO_BASE.'/'.$path.'?'.$key.'='.rawurlencode($id);
    $image = SEO_BASE.'/assets/al-qamar-seal-transparent-v3.png';
    $valid = $record !== null;
    if (!$valid) {
        http_response_code(404);header('X-Robots-Tag: noindex');
        $title = ($isBook ? 'Record not found' : 'Profile unavailable').' | AQIRI';
        $description = 'The requested '.($isBook ? 'catalogue record' : 'person profile').' could not be found.';
        $body = '<h1>'.($isBook ? 'Record not found' : 'Profile unavailable').'</h1><p>'.seoEscape($description).'</p><a href="'.($isBook ? 'library.html' : 'index.html').'">'.($isBook ? 'Browse the Library' : 'Return to AQIRI').'</a>';
        $entity=[];
    } elseif ($isBook) {
        $name = $record['title'];$title = $name.' | AQIRI Library';$description = seoDescription($record['description'] ?? $name);
        $cover = $record['cover'] ?? (!empty($record['generatedCover']) ? '' : $id.'-title-page.png');
        $pdf = $record['pdf'] ?? $id.'.pdf';
        $assetBase = (($_SERVER['HTTP_HOST'] ?? '') === 'library.aqiri.org') ? SEO_BASE.'/assets/library/' : 'assets/library/';
        if ($cover) $image = SEO_BASE.'/assets/library/'.rawurlencode($cover);
        $body = '<nav class="simple-breadcrumb" aria-label="Breadcrumb"><a href="./">Home</a><span>/</span><a href="library.html">Library</a><span>/</span><span aria-current="page">Record</span></nav><article class="book-record">';
        if ($cover) $body .= '<div class="book-record-cover"><img src="'.$assetBase.rawurlencode($cover).'" alt="Cover of '.seoEscape($name).'"></div>';
        $body .= '<div class="book-record-content"><p class="open-label">AQIRI Library</p><h1>'.seoEscape($name).'</h1>';
        if (!empty($record['subtitle'])) $body .= '<p class="book-record-subtitle">'.seoEscape($record['subtitle']).'</p>';
        $body .= '<p class="book-record-author">'.seoEscape($record['author'] ?? 'Author information unavailable').(!empty($record['year']) ? ' · '.seoEscape($record['year']) : '').'</p><div class="book-record-description"><h2>Description</h2><p>'.seoEscape($record['description'] ?? '').'</p></div><dl class="book-record-details">';
        $fields=['Author / editor'=>'author','Publisher'=>'publisher','Publication year'=>'year','Subject'=>'category','Language'=>'language','Edition'=>'edition','ISBN'=>'isbn','DOI'=>'doi','Pages'=>'pages','Open-access status'=>'access','Original source'=>'sourceUrl','Suggested citation'=>'citation'];
        foreach ($fields as $label=>$field) {
            if (empty($record[$field])) continue;
            $value = seoEscape((string)$record[$field]);
            if ($field === 'doi') $value = '<a href="https://doi.org/'.rawurlencode($record[$field]).'">'.$value.'</a>';
            if ($field === 'sourceUrl' && preg_match('/^https?:\/\//', $record[$field])) $value = '<a href="'.$value.'">View publisher record ↗</a>';
            $body .= '<div><dt>'.$label.'</dt><dd>'.$value.'</dd></div>';
        }
        $body .= '</dl><section class="book-record-access"><h2>Publication access</h2><div class="book-record-actions"><a class="button button-green" href="'.$assetBase.rawurlencode($pdf).'" target="_blank" rel="noopener">Read Publication <span>↗</span></a><a class="download-pdf" href="'.$assetBase.rawurlencode($pdf).'?download=1" download>Download Publication <span>↓</span></a></div></section></div></article>';
        $entity=['@type'=>'Book','@id'=>$canonical.'#book','name'=>$name,'url'=>$canonical,'description'=>$description,'image'=>$image,'creditText'=>$record['author'] ?? '', 'encoding'=>['@type'=>'MediaObject','contentUrl'=>SEO_BASE.'/assets/library/'.rawurlencode($pdf),'encodingFormat'=>'application/pdf']];
        if (!empty($record['publisher'])) $entity['publisher']=['@type'=>'Organization','name'=>$record['publisher']];
        if (!empty($record['year'])) $entity['datePublished']=$record['year'];
        $isbn=preg_replace('/[^0-9Xx]/','',$record['isbn'] ?? '');
        $isbnValid=false;
        if (preg_match('/^[0-9]{13}$/',$isbn)) {
            $sum=0;for($i=0;$i<13;$i++) $sum+=(int)$isbn[$i]*($i%2===0 ? 1 : 3);$isbnValid=$sum%10===0;
        } elseif (preg_match('/^[0-9]{9}[0-9Xx]$/',$isbn)) {
            $sum=0;for($i=0;$i<10;$i++) $sum+=(strtoupper($isbn[$i])==='X' ? 10 : (int)$isbn[$i])*(10-$i);$isbnValid=$sum%11===0;
        }
        if ($isbnValid) $entity['isbn']=strtoupper($isbn);
        $languages=['English'=>'en','Arabic'=>'ar','Urdu'=>'ur','Persian'=>'fa','Turkish'=>'tr','Russian'=>'ru','Bosnian'=>'bs','Polish'=>'pl','Romanian'=>'ro','Italian'=>'it'];
        if (isset($languages[$record['language'] ?? ''])) $entity['inLanguage']=$languages[$record['language']];
        if (!empty($record['pages']) && preg_match('/^[0-9]+$/',(string)$record['pages'])) $entity['numberOfPages']=(int)$record['pages'];
    } else {
        $name=$record[1];$title=$name.' | AQIRI';$allBios=seoData('people-data.js','aqiriPeopleBios');
        $paragraphs=$allBios[$id] ?? ["This profile records ".$name."'s contribution to Al-Qamar Islamic Research Institute."];
        $description=seoDescription($name.' — '.$record[2].'. '.$record[3].', '.$record[4].'.');
        $photo=$record[5] ?? '';if ($photo) $image=SEO_BASE.'/'.$photo;
        $back = $record[2] === 'Workshop Speaker' ? 'on-work-2026-01.html' : (strpos($record[2],'Research Fellow') !== false ? 'research-contributors.html' : 'administrative-staff.html');
        $body=($photo ? '<img class="profile-page-photo" src="'.seoEscape($photo).'" alt="'.seoEscape($name).'">' : '').'<p class="eyebrow dark"><span></span>'.seoEscape($record[2]).'</p><h1>'.seoEscape($name).'</h1><p class="profile-role">'.seoEscape($record[3]).'</p><p class="profile-affiliation">'.seoEscape($record[4]).'</p>';
        foreach ($paragraphs as $paragraph) $body.='<p>'.seoEscape($paragraph).'</p>';
        $body.='<a class="button button-green" href="'.$back.'">Back to AQIRI <span>←</span></a>';
        $entity=['@type'=>'Person','@id'=>$canonical.'#person','name'=>$name,'url'=>$canonical,'description'=>$description,'jobTitle'=>$record[3],'affiliation'=>['@type'=>'Organization','name'=>$record[4]]];
        if ($photo) $entity['image']=$image;
    }
    $marker=$isBook ? '<div class="shell" id="book-record-content"></div>' : '<div class="shell profile-page-content" id="person-profile"></div>';
    if (strpos($html,$marker) === false) throw new RuntimeException('Record content placeholder is missing.');
    $html=str_replace($marker,str_replace('></div>','>'.$body.'</div>',$marker),$html);
    echo seoHead($html,$title,$description,$canonical,$image,$entity,$valid);
} catch (Throwable $error) {
    error_log('AQIRI record rendering: '.$error->getMessage());http_response_code(500);header('X-Robots-Tag: noindex');
    echo '<!doctype html><html lang="en"><meta charset="utf-8"><title>Record temporarily unavailable | AQIRI</title><meta name="robots" content="noindex"><h1>Record temporarily unavailable</h1><p>Please try again later.</p></html>';
}
