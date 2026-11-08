(() => {
  const sessionKey = 'aqiri-news-popup-seen';
  const sourceUrl = 'news-and-events.html';
  try { if (sessionStorage.getItem(sessionKey)) return; } catch (_) { /* Storage may be disabled. */ }

  async function showLatestUpdates() {
    try {
      const response = await fetch(sourceUrl, { credentials: 'same-origin' });
      if (!response.ok) return;
      const source = new DOMParser().parseFromString(await response.text(), 'text/html');
      const items = [
        ['Upcoming Event', source.querySelector('#upcoming-events .notice-category')],
        ['Latest News', source.querySelector('#latest-news .notice-category')]
      ].filter(([, article]) => article);
      if (!items.length) return;

      const popup = document.createElement('dialog');
      popup.className = 'news-popup';
      popup.setAttribute('aria-labelledby', 'news-popup-title');
      const heading = document.createElement('div');
      heading.className = 'news-popup-heading';
      const title = document.createElement('h2');
      title.id = 'news-popup-title';
      title.textContent = 'News & Events';
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'news-popup-close';
      close.setAttribute('aria-label', 'Close news and events popup');
      close.textContent = '×';
      heading.append(title, close);
      popup.append(heading);
      const content = document.createElement('div');
      content.className = 'news-popup-content';
      popup.append(content);

      for (const [label, sourceArticle] of items) {
        const article = document.createElement('article');
        const category = document.createElement('span');
        category.className = 'news-popup-category';
        category.textContent = label;
        const itemTitle = document.createElement('h3');
        itemTitle.textContent = sourceArticle.querySelector('h3')?.textContent.trim() || label;
        article.append(category, itemTitle);
        for (const paragraph of [...sourceArticle.querySelectorAll('p')].slice(0, 2)) {
          const summary = document.createElement('p');
          const copy = paragraph.cloneNode(true);
          copy.querySelectorAll("br").forEach((lineBreak) => lineBreak.replaceWith("\n"));
          summary.textContent = copy.textContent.trim();
          article.append(summary);
        }
        const sourceLink = sourceArticle.querySelector('a[href]');
        if (sourceLink) {
          const link = document.createElement('a');
          const destination = new URL(sourceLink.getAttribute('href'), new URL(sourceUrl, location.href));
          if (['http:', 'https:'].includes(destination.protocol)) {
            link.href = destination.href;
            link.textContent = sourceLink.textContent.trim();
            article.append(link);
          }
        }
        content.append(article);
      }
      const allUpdates = document.createElement('a');
      allUpdates.className = 'news-popup-all';
      allUpdates.href = sourceUrl;
      allUpdates.textContent = 'View all News & Events →';
      content.append(allUpdates);
      const previousFocus = document.activeElement;
      document.body.append(popup);
      popup.showModal();
      document.body.classList.add("news-popup-open");
      try { sessionStorage.setItem(sessionKey, 'true'); } catch (_) { /* No storage required. */ }

      let expiry;
      const dismiss = () => {
        clearTimeout(expiry);
        popup.close();
        popup.remove();
        document.body.classList.remove('news-popup-open');
        if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
        document.removeEventListener('keydown', onEscape);
      };
      const onEscape = (event) => { if (event.key === 'Escape') { event.preventDefault(); dismiss(); } };
      popup.addEventListener('cancel', (event) => { event.preventDefault(); dismiss(); });
      popup.addEventListener('click', (event) => {
        const rect = popup.getBoundingClientRect();
        if (event.target === popup && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dismiss();
      });
      close.addEventListener('click', dismiss);
      document.addEventListener('keydown', onEscape);
      expiry = setTimeout(dismiss, 60000);
    } catch (_) {
      // The main News & Events navigation stays available if the request fails.
    }
  }
  showLatestUpdates();
})();
