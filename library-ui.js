(() => {
  const books = window.AQIRILibrary || [];
  const esc = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const recordUrl = (book) => `book.html?record=${encodeURIComponent(book.file)}`;
  const results = document.querySelector("#library-results");
  if (results) {
    const legacySlug = decodeURIComponent(window.location.hash.slice(1));
    const legacyAliases = { "islamic-ethics-trusteeship": "islamic-ethics-trusteeship-paradigm", "handbook-islamic-sects-movements": "9789004435544", "islam-middle-east": "abul-fadl-islam-middle-east-1990", "renaissance-shii-islam": "b-9780755649471", "islam-limits-state": "9789004304864" };
    const legacyBook = books.find((book) => book.file === (legacyAliases[legacySlug] || legacySlug));
    if (legacyBook) { window.location.replace(recordUrl(legacyBook)); return; }
    const search = document.querySelector("#library-search");
    const count = document.querySelector("#library-count");
    const empty = document.querySelector("#library-empty");
    const render = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const matches = books.filter((book) => [book.title, book.author, book.description, book.publisher, book.language, book.year].filter(Boolean).join(" ").toLocaleLowerCase().includes(query)).sort((a, b) => a.title.localeCompare(b.title));
      count.textContent = `${matches.length} ${matches.length === 1 ? "title" : "titles"} available`;
      empty.hidden = matches.length !== 0;
      results.innerHTML = matches.map((book) => {
        const cover = book.cover || (book.generatedCover ? "" : `${book.file}-title-page.png`);
        return `<article class="catalogue-card">${cover ? `<a class="catalogue-cover" href="${recordUrl(book)}" aria-label="View record for ${esc(book.title)}"><img src="assets/library/${esc(cover)}" alt="Cover of ${esc(book.title)}" onerror="this.closest('.catalogue-cover').remove()"></a>` : ""}<div class="catalogue-card-copy"><p class="catalogue-year">${esc(book.year || "")}</p><h2><a href="${recordUrl(book)}">${esc(book.title)}</a></h2><p class="catalogue-author">${esc(book.author || "Author information unavailable")}</p><a class="catalogue-record-link" href="${recordUrl(book)}">View Record <b>→</b></a></div></article>`;
      }).join("");
    };
    search.addEventListener("input", render); render();
  }
  const target = document.querySelector("#book-record-content");
  if (!target) return;
  const book = books.find((entry) => entry.file === new URLSearchParams(window.location.search).get("record"));
  if (!book) { target.innerHTML = `<nav class="simple-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="library.html">Library</a></nav><section class="record-not-found"><h1>Record not found</h1><p>This catalogue record is unavailable. Browse the current AQIRI Library catalogue.</p><a class="button button-green" href="library.html">Browse Library</a></section>`; return; }
  document.title = `${book.title} | AQIRI Library`;
  const fields = [["Author / editor", book.author], ["Publisher", book.publisher], ["Publication year", book.year], ["ISBN", book.isbn], ["Language", book.language], ["DOI", book.doi]].filter(([, value]) => value);
  const cover = book.cover || (book.generatedCover ? "" : `${book.file}-title-page.png`);
  const pdf = book.pdf || `${book.file}.pdf`;
  const description = book.description && book.description.trim().length >= 80 ? book.description : "";
  target.innerHTML = `<nav class="simple-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="library.html">Library</a><span>/</span><span aria-current="page">Record</span></nav><article class="book-record">${cover ? `<div class="book-record-cover"><img src="assets/library/${esc(cover)}" alt="Cover of ${esc(book.title)}" onerror="this.parentElement.remove()"></div>` : ""}<div class="book-record-content"><p class="open-label">AQIRI Library</p><h1>${esc(book.title)}</h1><p class="book-record-author">${esc(book.author || "Author information unavailable")}${book.year ? ` · ${esc(book.year)}` : ""}</p>${description ? `<div class="book-record-description"><h2>Description</h2><p>${esc(description)}</p></div>` : ""}<dl class="book-record-details">${fields.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${label === "DOI" ? `<a href="https://doi.org/${encodeURIComponent(value)}" target="_blank" rel="noopener">${esc(value)} ↗</a>` : esc(value)}</dd></div>`).join("")}</dl><section class="book-record-access"><h2>Publication access</h2><div class="book-record-actions"><a class="button button-green" href="assets/library/${esc(pdf)}" target="_blank" rel="noopener">Read Publication <span>↗</span></a><a class="download-pdf" href="assets/library/${esc(pdf)}" download="${esc(pdf)}">Download Publication <span>↓</span></a></div></section></div></article>`;
})();
