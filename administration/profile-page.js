document.addEventListener("DOMContentLoaded", () => {
  const footerMarkup = `
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="footer-seal" href="../index.html" aria-label="AQIRI home">
          <img src="../assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal">
        </a>
        <div class="footer-brand-copy">
          <strong>AQIRI</strong>
          <p>60-D Block, Marghazar Colony, Multan Road<br>Lahore, 54500, Pakistan</p>
          <span>Office Hours: 9:00 AM to 6:00 PM, Monday to Saturday</span>
        </div>
      </div>
      <div>
        <h3>Security &amp; Brand</h3>
        <a href="../report-copyright-infringement.html">Report Copyright Infringement</a>
        <a href="../report-security-issue.html">Report Security Issue</a>
        <a href="../brand-and-trademark-notice.html">Brand and Trademark Notice</a>
      </div>
      <div>
        <h3>Website</h3>
        <a href="../accessibility.html">Accessibility</a>
        <a href="../digital-accessibility.html">Digital Accessibility</a>
        <a href="../privacy-statement.html">Privacy Statement</a>
      </div>
      <div>
        <h3>Get In Touch</h3>
        <a href="../contact-aqiri.html">Contact AQIRI</a>
        <a href="../location-and-directions.html">Location &amp; Directions</a>
        <a href="../careers.html">Careers</a>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© <span id="year"></span> AQIRI. All rights reserved.</span>
      <a href="../contact-aqiri.html">info@aqiri.org</a>
    </div>`;

  document.querySelectorAll(".nav-inner").forEach((nav) => {
    if (nav.parentElement && !nav.parentElement.id) nav.parentElement.id = "site-nav";
    nav.innerHTML = '<a href="../index.html#about" class="active">About</a><a href="../departments/editorial-and-acquisitions.html">Departments</a><a href="../index.html#publications">Publications</a><a href="../index.html#programs">Admissions</a><a href="../index.html#news">News &amp; Notices</a><a href="../careers.html">Careers</a><a href="../index.html#contact">Contact</a>';
  });
  document.querySelectorAll("footer").forEach((footer) => {
    footer.classList.add("site-footer");
    footer.innerHTML = footerMarkup;
  });
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "About") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    submenu.innerHTML = '<a href="../index.html#about">Institutional Profile</a><a href="../index.html#vision-objectives">Vision &amp; Objectives</a><a href="../index.html#administration">Institute Administration</a><a href="../board-of-governors.html">Board of Governors</a><a href="../director-general.html">Director General</a><a href="../index.html#cao">Chief Administrative Officer</a>';
    wrapper.append(submenu);
  });
  document.querySelectorAll(".site-header").forEach((siteHeader) => {
    let menuButton = siteHeader.querySelector(".menu-button");
    if (!menuButton) {
      menuButton = document.createElement("button");
      menuButton.className = "menu-button";
      menuButton.type = "button";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-controls", "site-nav");
      menuButton.innerHTML = "<span></span><span></span><span></span><b>Menu</b>";
      (siteHeader.querySelector(".brand-row") || siteHeader).append(menuButton);
    }
    if (siteHeader.querySelector(".header-seal")) return;
    const seal = document.createElement("a");
    seal.className = "header-seal";
    seal.href = "../index.html";
    seal.setAttribute("aria-label", "AQIRI home");
    seal.innerHTML = '<img src="../assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal">';
    siteHeader.append(seal);
    const searchTrigger = document.createElement("button");
    searchTrigger.className = "mobile-search-trigger";
    searchTrigger.type = "button";
    searchTrigger.setAttribute("aria-label", "Open search");
    searchTrigger.textContent = "⌕";
    searchTrigger.addEventListener("click", () => {
      siteHeader.classList.add("open");
      document.body.classList.add("menu-open");
      menuButton.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => siteHeader.querySelector(".nav-search input")?.focus());
    });
    siteHeader.append(searchTrigger);
    menuButton.addEventListener("click", () => {
      const open = siteHeader.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
    });
  });
  document.querySelectorAll(".nav-inner").forEach((nav) => {
    [...nav.querySelectorAll(":scope > a")].forEach((link) => {
      if (link.textContent.trim() === "Home") link.remove();
    });
    const search = document.createElement("form");
    search.className = "nav-search";
    search.setAttribute("role", "search");
    search.innerHTML = '<label><span class="sr-only">Search AQIRI</span><input type="search" name="q" placeholder="Search AQIRI" aria-label="Search AQIRI" required></label><button type="submit" aria-label="Submit search">⌕</button>';
    nav.prepend(search);
  });
  if (!document.querySelector('script[data-site-search]')) {
    const searchScript = document.createElement("script");
    searchScript.src = "../site-search.js";
    searchScript.dataset.siteSearch = "true";
    document.body.append(searchScript);
  }
  document.querySelectorAll(".nav-inner").forEach((nav) => {
    if ([...nav.querySelectorAll("a")].some((a) => a.textContent.trim() === "Careers")) return;
    const contact = [...nav.querySelectorAll(":scope > a")].find((a) => a.textContent.trim() === "Contact");
    const careers = document.createElement("a");
    careers.href = "../careers.html";
    careers.textContent = "Careers";
    nav.insertBefore(careers, contact || null);
  });
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "Departments") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    submenu.innerHTML = '<a href="../departments/editorial-and-acquisitions.html">Editorial &amp; Acquisitions</a><a href="../departments/production-and-publishing-operations.html">Production &amp; Publishing Operations</a><a href="../departments/communications-and-public-relations.html">Communications &amp; Public Relations</a><a href="../departments/digital-platform-technology.html">Digital Platform Technology</a><a href="../departments/compliance-and-human-resource.html">Compliance &amp; Human Resource</a>';
    wrapper.append(submenu);
  });
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  document.querySelectorAll("a, button").forEach((control) => {
    control.classList.add("interactive-control");
    control.addEventListener("pointerdown", (event) => {
      const rect = control.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.35;
      ripple.className = "click-ripple";
      Object.assign(ripple.style, {width:`${size}px`,height:`${size}px`,left:`${event.clientX-rect.left-size/2}px`,top:`${event.clientY-rect.top-size/2}px`});
      control.append(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
});
document.querySelectorAll(".crumb").forEach((source) => {
  const items = [];
  source.childNodes.forEach((node) => {
    const text = node.textContent.trim();
    if (!text || text === "/") return;
    items.push(node.nodeType === Node.ELEMENT_NODE && node.matches("a")
      ? { label: text, href: node.getAttribute("href") }
      : { label: text });
  });
  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "crumb page-breadcrumbs";
  breadcrumb.setAttribute("aria-label", "Breadcrumb");
  const list = document.createElement("ol");
  items.forEach((item, index) => {
    const entry = document.createElement("li");
    if (item.href) {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      entry.append(link);
    } else {
      entry.textContent = item.label;
    }
    if (index === items.length - 1) entry.setAttribute("aria-current", "page");
    list.append(entry);
  });
  breadcrumb.append(list);
  source.replaceWith(breadcrumb);
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    breadcrumb.classList.add("global-breadcrumb");
    siteHeader.after(breadcrumb);
  }
});
