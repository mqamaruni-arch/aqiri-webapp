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
  menuButton.setAttribute("aria-controls", "site-nav");
  menuButton.innerHTML = "<span></span><span></span><span></span><b>Menu</b>";
  (siteHeader.querySelector(".brand-row") || siteHeader).append(menuButton);
  return menuButton;
}

function getPathPrefix() {
  return document.querySelector(".nav-inner a")?.getAttribute("href")?.startsWith("../") ? "../" : "";
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
        <a class="footer-seal" href="${prefix}index.html" aria-label="AQIRI home">
          <img src="${prefix}assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal">
        </a>
        <div class="footer-brand-copy">
          <strong>AQIRI</strong>
          <p>60-D Block, Marghazar Colony, Multan Road<br>Lahore, 54500, Pakistan</p>
          <span>Office Hours: 9:00 AM to 6:00 PM, Monday to Saturday</span>
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
      <a href="${prefix}contact-aqiri.html">info@aqiri.org</a>
    </div>`;
}

function renderSharedFooter() {
  const prefix = getPathPrefix();
  document.querySelectorAll("footer").forEach((footer) => {
    footer.classList.add("site-footer");
    footer.innerHTML = buildSharedFooter(prefix);
  });
}

if (header) getOrCreateMenuButton(header);

document.querySelectorAll(".nav-inner").forEach((nav) => {
  if (nav.parentElement && !nav.parentElement.id) nav.parentElement.id = "site-nav";
  const nested = nav.querySelector("a")?.getAttribute("href")?.startsWith("../");
  const prefix = nested ? "../" : "";
  const path = window.location.pathname;
  let active = "";
  if (path.includes("/departments/")) active = "Research";
  else if (/board-of-governors|director-general|advisory-council|research-contributors|postdoctoral-fellows|administrative-staff|people/.test(path)) active = "People";
  else if (/advanced-diplomas|postdoctoral-fellowships|diploma-admission-form/.test(path)) active = "Programs";
  else if (path.includes("people")) active = "People";
  else if (path.includes("careers")) active = "Careers";
  else if (path.includes("manuscripts")) active = "Publications";
  else if (path.includes("library") || path.includes("book.html")) active = "Library";
  const item = (label, href) => `<a href="${href}"${active === label ? ' class="active"' : ""}>${label}</a>`;
  nav.innerHTML = [
    item("About", `${prefix}index.html#about`),
    item("Research", `${prefix}departments/editorial-and-acquisitions.html`),
    '<a href="https://publications.aqiri.org">Publications</a>',
    item("Programs", `${prefix}advanced-diplomas.html`),
    item("Library", `${prefix}library.html`),
    item("News & Events", `${prefix}index.html#news`),
    item("People", `${prefix}people.html`),
    item("Careers", `${prefix}careers.html`),
    item("Contact", `${prefix}index.html#contact`)
  ].join("");
});

renderSharedFooter();
installBrandLogo();

document.querySelectorAll(".site-header").forEach((siteHeader) => {
  const menuButton = getOrCreateMenuButton(siteHeader);
  const nav = siteHeader.querySelector(".nav-inner");
  const nested = nav.querySelector("a")?.getAttribute("href")?.startsWith("../");
  const prefix = nested ? "../" : "";
  if (!siteHeader.querySelector(".header-seal")) {
    const seal = document.createElement("a");
    seal.className = "header-seal";
    seal.href = `${prefix}index.html`;
    seal.setAttribute("aria-label", "AQIRI home");
    seal.innerHTML = `<img src="${prefix}assets/al-qamar-seal-transparent-v3.png" alt="AQIRI seal">`;
    siteHeader.append(seal);
  }
  if (!siteHeader.querySelector(".mobile-brand-name")) {
    const brandName = document.createElement("a");
    brandName.className = "mobile-brand-name";
    brandName.href = `${prefix}index.html`;
    brandName.innerHTML = "<strong>Al Qamar</strong><span>Islamic Research Institute</span>";
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
    if (!open) {
      siteHeader.querySelectorAll(".nav-dropdown.is-open").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
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
  searchScript.src = `${document.querySelector(".nav-inner a")?.getAttribute("href")?.startsWith("../") ? "../" : ""}site-search.js`;
  searchScript.dataset.siteSearch = "true";
  document.body.append(searchScript);
}

document.querySelectorAll(".nav-inner > a").forEach((link) => {
  if (["Home", "Manuscripts"].includes(link.textContent.trim())) link.remove();
});

function installAboutSubnav() {
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "About") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    const prefix = link.getAttribute("href")?.startsWith("../") ? "../" : "";
    submenu.innerHTML = `
      <a href="${prefix}index.html#about">Institutional Profile</a>
      <a href="${prefix}index.html#vision-objectives">Vision &amp; Objectives</a>
      <a href="${prefix}index.html#administration">Institute Administration</a>
      <a href="${prefix}board-of-governors.html">Board of Governors</a>
      <a href="${prefix}director-general.html">Director General</a>
      <a href="${prefix}index.html#cao">Chief Administrative Officer</a>`;
    wrapper.append(submenu);
  });
}

// About stays a single, direct link in the primary navigation.

function installDepartmentSubnav() {
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "Departments") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    const prefix = link.getAttribute("href")?.startsWith("../") ? "../" : "";
    submenu.innerHTML = `
      <a href="${prefix}departments/editorial-and-acquisitions.html">Editorial &amp; Acquisitions</a>
      <a href="${prefix}departments/production-and-publishing-operations.html">Production &amp; Publishing Operations</a>
      <a href="${prefix}departments/communications-and-public-relations.html">Communications &amp; Public Relations</a>
      <a href="${prefix}departments/digital-platform-technology.html">Digital Platform Technology</a>
      <a href="${prefix}departments/compliance-and-human-resource.html">Compliance &amp; Human Resource</a>`;
    wrapper.append(submenu);
  });
}

installDepartmentSubnav();

function installProgramsSubnav() {
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "Programs") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    const prefix = link.getAttribute("href")?.startsWith("../") ? "../" : "";
    submenu.innerHTML = `
      <a href="${prefix}advanced-diplomas.html">Diploma Programs</a>
      <a href="${prefix}postdoctoral-fellowships.html">Postdoctoral Fellowships</a>`;
    wrapper.append(submenu);
  });
}

installProgramsSubnav();

function installPeopleSubnav() {
  document.querySelectorAll(".nav-inner > a").forEach((link) => {
    if (link.textContent.trim() !== "People") return;
    const wrapper = document.createElement("div");
    wrapper.className = "nav-dropdown";
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const submenu = document.createElement("div");
    submenu.className = "nav-submenu";
    const prefix = link.getAttribute("href")?.startsWith("../") ? "../" : "";
    submenu.innerHTML = `
      <a href="${prefix}board-of-governors.html">Board of Governors</a>
      <a href="${prefix}advisory-council.html">Advisory Council</a>
      <a href="${prefix}director-general.html">Director General</a>
      <a href="${prefix}research-contributors.html">Research Contributors</a>
      <a href="${prefix}postdoctoral-fellows.html">Postdoctoral Fellows</a>
      <a href="${prefix}administrative-staff.html">Administrative Staff</a>`;
    wrapper.append(submenu);
  });
}

installPeopleSubnav();

// Keep desktop hover menus unchanged. On touch screens a separate control opens
// child links without preventing the parent link from remaining a real link.
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
  toggle.innerHTML = '<span aria-hidden="true">⌄</span>';
  toggle.addEventListener("click", () => {
    const willOpen = !dropdown.classList.contains("is-open");
    dropdown.parentElement?.querySelectorAll(":scope > .nav-dropdown.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
    dropdown.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
  dropdown.insertBefore(toggle, submenu);
});

document.querySelectorAll(".nav-inner").forEach((nav) => {
  if ([...nav.querySelectorAll("a")].some((a) => a.textContent.trim() === "Careers")) return;
  const contact = [...nav.querySelectorAll(":scope > a")].find((a) => a.textContent.trim() === "Contact");
  const careers = document.createElement("a");
  careers.textContent = "Careers";
  const isNested = nav.querySelector("a")?.getAttribute("href")?.startsWith("../");
  careers.href = `${isNested ? "../" : ""}careers.html`;
  nav.insertBefore(careers, contact || null);
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

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".site-header.open").forEach((siteHeader) => {
      siteHeader.classList.remove("open");
      siteHeader.querySelector(".menu-button")?.setAttribute("aria-expanded", "false");
    });
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  const openHeader = document.querySelector(".site-header.open");
  if (event.key !== "Escape" || !openHeader) return;
  openHeader.classList.remove("open");
  document.body.classList.remove("menu-open");
  const menuButton = openHeader.querySelector(".menu-button");
  menuButton?.setAttribute("aria-expanded", "false");
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
