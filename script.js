function headerPathPrefix(siteHeader) {
  if (window.location.hostname === "library.aqiri.org") return "https://www.aqiri.org/";
  if (siteHeader?.querySelector('a[href^="../"]')) return "../";
  const stylesheet = document.querySelector('link[href*="styles.css"]')?.getAttribute("href");
  return stylesheet?.startsWith("../") ? "../" : "";
}

function renderSharedHeaders() {
  document.querySelectorAll(".site-header").forEach((siteHeader) => {
    const prefix = headerPathPrefix(siteHeader);
    siteHeader.innerHTML = `
      <div class="shell brand-row">
        <a class="brand" href="${prefix || "./"}"><span><strong>Al-Qamar</strong><small>Islamic Research Institute</small></span></a>
      </div>
      <nav id="site-nav" class="main-nav" aria-label="Main navigation"><div class="shell nav-inner"></div></nav>`;
  });
}

renderSharedHeaders();
window.AQIRISharedHeader = true;
const header = document.querySelector(".site-header");

function getOrCreateMenuButton(siteHeader) {
  if (!siteHeader) return null;
  let menuButton = siteHeader.querySelector(".menu-button");
  if (menuButton) {
    // The original control lives inside the desktop brand row. Move it beside
    // the mobile-only controls so it is never hidden with that row on phones.
    if (menuButton.parentElement?.classList.contains("brand-row")) siteHeader.append(menuButton);
    return menuButton;
  }

  menuButton = document.createElement("button");
  menuButton.className = "menu-button";
  menuButton.type = "button";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-controls", "site-nav");
  menuButton.innerHTML = "<span></span><span></span><span></span><b>Menu</b>";
  (siteHeader.querySelector(".brand-row") || siteHeader).append(menuButton);
  return menuButton;
}

function getPathPrefix() {
  return headerPathPrefix(document.querySelector(".site-header"));
}

function installBrandLogo() {
  document.querySelectorAll(".brand").forEach((brand) => {
    if (brand.querySelector("img")) return;
    const prefix = brand.getAttribute("href")?.startsWith("../") ? "../" : "";
    const logo = document.createElement("img");
    logo.src = `${prefix}assets/al-qamar-seal-transparent-v3.png`;
    logo.alt = "AQIRI logo";
    brand.prepend(logo);
  });
}

function buildSharedFooter(prefix = "") {
  return `
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="footer-seal" href="${prefix || "./"}" aria-label="AQIRI home">
          <img src="${prefix}assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal">
        </a>
        <div class="footer-brand-copy">
          <strong>AQIRI</strong>
          <p>Regional Administrative Office<br>Hospital Road, Manga Mandi, Lahore, Pakistan</p>
          <span>Office Hours: 9:00 AM to 8:00 PM, Monday to Saturday</span>
        </div>
      </div>
      <div>
        <h3>Security &amp; Brand</h3>
        <a href="${prefix}report-copyright-infringement.html">Report Copyright Infringement</a>
        <a href="${prefix}report-security-issue.html">Report Security Issue</a>
        <a href="${prefix}brand-and-trademark-notice.html">Brand and Trademark Notice</a>
      </div>
      <div>
        <h3>Website</h3>
        <a href="${prefix}accessibility.html">Accessibility</a>
        <a href="${prefix}digital-accessibility.html">Digital Accessibility</a>
        <a href="${prefix}privacy-statement.html">Privacy Statement</a>
      </div>
      <div>
        <h3>Get In Touch</h3>
        <a href="${prefix}contact-aqiri.html">Contact AQIRI</a>
        <a href="${prefix}location-and-directions.html">Location &amp; Directions</a>
        <a href="${prefix}careers.html">Careers</a>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© <span id="year"></span> AQIRI. All rights reserved.</span>
      <a href="mailto:info@aqiri.org">info@aqiri.org</a>
    </div>`;
}

function renderSharedFooter() {
  const prefix = getPathPrefix();
  document.querySelectorAll("footer").forEach((footer) => {
    if (footer.hasAttribute("data-custom-footer")) return;
    footer.classList.add("site-footer");
    footer.innerHTML = buildSharedFooter(prefix);
  });
}

if (header) getOrCreateMenuButton(header);

document.querySelectorAll(".nav-inner").forEach((nav) => {
  if (nav.parentElement && !nav.parentElement.id) nav.parentElement.id = "site-nav";
  const prefix = getPathPrefix();
  const path = window.location.pathname;
  let active = "";
  if (/board-of-governors|director-general|advisory-council|\/administration\//.test(path)) active = "Institute Leadership";
  else if (/advanced-diplomas|postdoctoral-fellowships|diploma-admission-form/.test(path)) active = "Programs";
  else if (/people|research-contributors|postdoctoral-fellows|administrative-staff|person-profile/.test(path)) active = "People";
  else if (/on-work-2026-01|conferences|news-and-events/.test(path)) active = "News & Events";
  else if (path.includes("careers")) active = "Careers";
  else if (path.includes("manuscripts")) active = "Publications";
  else if (path.includes("library") || path.includes("book.html")) active = "Library";
  else if ((path.endsWith("/") || path.endsWith("/index.html")) && !location.hash) active = "Home";
  const item = (label, href) => `<a href="${href}"${active === label ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  const group = (label, href, children) => `<div class="nav-dropdown">${item(label, href)}<div class="nav-submenu">${children.map(([name, url]) => `<a href="${url}">${name}</a>`).join("")}</div></div>`;
  nav.innerHTML = [
    item("Home", `${prefix || "./"}`),
    item("About AQIRI", `${prefix || "./"}#about`),
    group("Institute Leadership", `${prefix || "./"}#administration`, [
      ["Director General", `${prefix}director-general.html`],
      ["Board of Governors", `${prefix}board-of-governors.html`],
      ["Advisory Council", `${prefix}advisory-council.html`]
    ]),
    item("Research", `${prefix || "./"}#departments`),
    item("Publications", "https://publications.aqiri.org"),
    group("Programs", `${prefix}advanced-diplomas.html`, [
      ["Diploma Programs", `${prefix}advanced-diplomas.html`],
      ["Postdoctoral Fellowships", `${prefix}postdoctoral-fellowships.html`]
    ]),
    item("Library", `${prefix}library.html`),
    item("News & Events", `${prefix}news-and-events.html`),
    group("People", "#", [
      ["Board of Governors", `${prefix}board-of-governors.html`],
      ["Advisory Council", `${prefix}advisory-council.html`],
      ["Director General", `${prefix}director-general.html`],
      ["Research Fellows", `${prefix}research-contributors.html`],
      ["Postdoctoral Fellows", `${prefix}postdoctoral-fellows.html`],
      ["Administrative Staff", `${prefix}administrative-staff.html`]
    ]),
    item("Careers", `${prefix}careers.html`),
    item("Contact", `${prefix}contact-aqiri.html`)
  ].join("");
});

if (!document.querySelector(".site-update-ticker")) {
  const ticker = document.createElement("aside");
  ticker.className = "site-update-ticker";
  ticker.setAttribute("role", "status");
    ticker.innerHTML = '<span>Update</span><p>Our website is currently undergoing improvements, and some content is being updated. Thank you for your patience.</p>';
  document.querySelector(".site-header")?.insertAdjacentElement("afterend", ticker);
}

renderSharedFooter();
installBrandLogo();

document.querySelectorAll(".site-header").forEach((siteHeader) => {
  const menuButton = getOrCreateMenuButton(siteHeader);
  const nav = siteHeader.querySelector(".nav-inner");
  const prefix = getPathPrefix();
  if (!siteHeader.querySelector(".header-seal")) {
    const seal = document.createElement("a");
    seal.className = "header-seal";
    seal.href = `${prefix || "./"}`;
    seal.setAttribute("aria-label", "AQIRI home");
    seal.innerHTML = `<img src="${prefix}assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal"><span class="header-wordmark-copy"><strong>Al-Qamar Islamic Research Institute</strong><small>Publishing Excellence, Inspiring Thought</small></span>`;
    siteHeader.append(seal);
  }
  if (!siteHeader.querySelector(".mobile-brand-name")) {
    const brandName = document.createElement("a");
    brandName.className = "mobile-brand-name";
    brandName.href = `${prefix || "./"}`;
    brandName.innerHTML = "<strong>Al-Qamar</strong><span>Islamic Research Institute</span>";
    siteHeader.append(brandName);
  }
  if (!siteHeader.querySelector(".mobile-search-trigger")) {
    const searchTrigger = document.createElement("button");
    searchTrigger.className = "mobile-search-trigger";
    searchTrigger.type = "button";
    searchTrigger.setAttribute("aria-label", "Open menu and search");
    searchTrigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="5.8"></circle><path d="m15.2 15.2 4.4 4.4"></path></svg>';
    searchTrigger.addEventListener("click", () => {
      siteHeader.classList.add("open");
      document.body.classList.add("menu-open");
      menuButton?.setAttribute("aria-expanded", "true");
      menuButton?.setAttribute("aria-label", "Close navigation menu");
      requestAnimationFrame(() => siteHeader.querySelector(".nav-search input")?.focus());
    });
    siteHeader.append(searchTrigger);
  }
});

document.querySelectorAll(".site-header").forEach((siteHeader) => {
  const menuButton = getOrCreateMenuButton(siteHeader);
  menuButton?.addEventListener("click", () => {
    const open = siteHeader.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (open) siteHeader.querySelector(".nav-search input")?.focus();
    if (!open) {
      siteHeader.querySelectorAll(".nav-dropdown.is-open").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-label", `Show ${dropdown.querySelector(":scope > a").textContent.trim()} links`);
        dropdown.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
        const submenu = dropdown.querySelector(".nav-submenu");
        if (submenu) submenu.hidden = true;
      });
    }
  });
});

document.querySelectorAll(".nav-inner").forEach((nav) => {
  if (nav.querySelector(".nav-search")) return;
  const search = document.createElement("form");
  search.className = "nav-search";
  search.setAttribute("role", "search");
  search.innerHTML = '<label><span class="sr-only">Search AQIRI</span><input type="search" name="q" placeholder="Search AQIRI" aria-label="Search AQIRI" required></label><button type="submit" aria-label="Submit search">⌕</button>';
  nav.prepend(search);
});

if (!document.querySelector('script[data-site-search]')) {
  const searchScript = document.createElement("script");
  searchScript.src = `${getPathPrefix()}site-search.js?v=3fc114a749ad`;
  searchScript.dataset.siteSearch = "true";
  document.body.append(searchScript);
}

// Parent controls expand groups; only child links navigate to pages.
document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  if (dropdown.querySelector(".nav-dropdown-toggle")) return;
  const parentLink = dropdown.querySelector(":scope > a");
  const submenu = dropdown.querySelector(":scope > .nav-submenu");
  if (!parentLink || !submenu) return;
  const toggle = document.createElement("button");
  toggle.className = "nav-dropdown-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", `Show ${parentLink.textContent.trim()} links`);
  const submenuId = `nav-group-${[...document.querySelectorAll(".nav-dropdown")].indexOf(dropdown)}`;
  submenu.id = submenuId;
  submenu.hidden = true;
  toggle.setAttribute("aria-controls", submenuId);
  toggle.innerHTML = '<span aria-hidden="true">→</span>';
  toggle.addEventListener("click", () => {
    const willOpen = !dropdown.classList.contains("is-open");
    dropdown.parentElement?.querySelectorAll(":scope > .nav-dropdown.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-label", `Show ${item.querySelector(":scope > a").textContent.trim()} links`);
      item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
      const childMenu = item.querySelector(".nav-submenu");
      if (childMenu) childMenu.hidden = true;
    });
    dropdown.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", `${willOpen ? "Hide" : "Show"} ${parentLink.textContent.trim()} links`);
    submenu.hidden = !willOpen;
    parentLink.setAttribute("aria-expanded", String(willOpen));
  });
  dropdown.insertBefore(toggle, submenu);
  parentLink.removeAttribute("href");
  parentLink.dataset.navParent = "true";
  parentLink.setAttribute("role", "button");
  parentLink.setAttribute("tabindex", "0");
  parentLink.removeAttribute("aria-current");
  parentLink.setAttribute("aria-controls", submenuId);
  parentLink.setAttribute("aria-expanded", "false");
  parentLink.addEventListener("click", (event) => {
    event.preventDefault();
    toggle.click();
  });
  parentLink.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle.click();
    }
  });
});

const calligraphyCanvas = document.querySelector("[data-calligraphy]");
if (calligraphyCanvas) {
  const source = new Image();
  source.addEventListener("load", () => {
    const context = calligraphyCanvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(source, 0, 0, calligraphyCanvas.width, calligraphyCanvas.height);
    const image = context.getImageData(0, 0, calligraphyCanvas.width, calligraphyCanvas.height);
    for (let i = 0; i < image.data.length; i += 4) {
      const luminance = (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3;
      image.data[i] = 255;
      image.data[i + 1] = 255;
      image.data[i + 2] = 255;
      image.data[i + 3] = 255 - luminance;
    }
    context.clearRect(0, 0, calligraphyCanvas.width, calligraphyCanvas.height);
    context.putImageData(image, 0, 0);
    calligraphyCanvas.classList.add("ready");
  });
  source.src = "assets/hero-calligraphy-source.png";
}

function resetNavigationGroups(siteHeader) {
  siteHeader.querySelectorAll(".nav-dropdown").forEach((group) => {
    group.classList.remove("is-open");
    const button = group.querySelector(".nav-dropdown-toggle");
    const submenu = group.querySelector(".nav-submenu");
    group.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
    button?.setAttribute("aria-expanded", "false");
    button?.setAttribute("aria-label", `Show ${group.querySelector(":scope > a").textContent.trim()} links`);
    if (submenu) submenu.hidden = true;
  });
}

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.hasAttribute("data-nav-parent")) return;
    document.querySelectorAll(".site-header.open").forEach((siteHeader) => {
      siteHeader.classList.remove("open");
      resetNavigationGroups(siteHeader);
      siteHeader.querySelector(".menu-button")?.setAttribute("aria-expanded", "false");
      siteHeader.querySelector(".menu-button")?.setAttribute("aria-label", "Open navigation menu");
    });
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  const openHeader = document.querySelector(".site-header.open");
  if (event.key !== "Escape" || !openHeader) return;
  openHeader.classList.remove("open");
  resetNavigationGroups(openHeader);
  document.body.classList.remove("menu-open");
  const menuButton = openHeader.querySelector(".menu-button");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation menu");
  menuButton?.focus();
});

function enhanceBreadcrumbs() {
  document.querySelectorAll(".crumb").forEach((source) => {
    if (source.matches("nav")) return;
    const items = [];

    source.childNodes.forEach((node) => {
      const text = node.textContent.trim();
      if (!text || text === "/") return;
      if (node.nodeType === Node.ELEMENT_NODE && node.matches("a")) {
        items.push({ label: text, href: node.getAttribute("href") });
      } else {
        items.push({ label: text });
      }
    });

    if (!items.length) return;
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
        entry.setAttribute("aria-current", "page");
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
}

enhanceBreadcrumbs();

const now = new Date();
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = now.getFullYear();
const dateElement = document.querySelector("#current-date");
if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll("a, button").forEach((control) => {
  control.classList.add("interactive-control");

  control.addEventListener("pointerdown", (event) => {
    const rect = control.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.35;

    ripple.className = "click-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    control.querySelector(".click-ripple")?.remove();
    control.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// Keep keyboard focus inside the open navigation drawer.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const openHeader = document.querySelector(".site-header.open");
  if (!openHeader || matchMedia("(min-width: 1100px)").matches) return;
  const focusable = [...openHeader.querySelectorAll('a[href], a[data-nav-parent], button:not([disabled]), input:not([disabled])')].filter((node) => node.getClientRects().length && getComputedStyle(node).visibility !== "hidden");
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});

// Desktop dropdowns dismiss on Escape or a click outside the header.
document.addEventListener("click", (event) => {
  if (!matchMedia("(min-width: 1100px)").matches || event.target.closest(".site-header")) return;
  document.querySelectorAll(".site-header").forEach(resetNavigationGroups);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !matchMedia("(min-width: 1100px)").matches) return;
  const expanded = document.querySelector('.nav-dropdown-toggle[aria-expanded="true"]');
  if (!expanded) return;
  document.querySelectorAll(".site-header").forEach(resetNavigationGroups);
  expanded.focus();
});
matchMedia("(min-width: 1100px)").addEventListener("change", () => {
  document.querySelectorAll(".site-header").forEach((siteHeader) => {
    siteHeader.classList.remove("open");
    siteHeader.querySelector(".menu-button")?.setAttribute("aria-expanded", "false");
    siteHeader.querySelector(".menu-button")?.setAttribute("aria-label", "Open navigation menu");
    resetNavigationGroups(siteHeader);
  });
  document.body.classList.remove("menu-open");
});

// Preserve the original desktop navigation labels and order.
function restoreDesktopNavigation() {
  const desktop = matchMedia("(min-width: 1100px)").matches;
  document.querySelectorAll(".nav-inner").forEach((nav) => {
    const entries = [...nav.children].filter((node) => !node.classList.contains("nav-search"));
    entries.forEach((entry) => {
      const link = entry.matches("a") ? entry : entry.querySelector(":scope > a");
      if (!link) return;
      const label = link.dataset.navigationLabel || link.textContent.trim();
      link.dataset.navigationLabel = label;
      entry.classList.toggle("nav-mobile-only", ["Home", "Institute Leadership"].includes(label));
      if (label === "About AQIRI") link.textContent = desktop ? "About" : "About AQIRI";
      const order = ["Home", "About AQIRI", "Institute Leadership", "Research", "Publications", "Programs", "Library", "News & Events", "People", "Careers", "Contact"];
      entry.style.order = order.indexOf(label);
    });
  });
}
restoreDesktopNavigation();
matchMedia("(min-width: 1100px)").addEventListener("change", restoreDesktopNavigation);
