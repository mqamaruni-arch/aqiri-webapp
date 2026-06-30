(() => {
  const records = [
    ["About AQIRI", "Institute", "/index.html#about", "who we are mission Islamic research institute scholarship"],
    ["Vision and Objectives", "Institute", "/index.html#vision-objectives", "vision objectives research publication training ethics collaboration access"],
    ["Institute Administration", "Institute", "/index.html#administration", "administration governance leadership oversight board director general chief administrative officer"],
    ["Board of Governors", "Administration", "/board-of-governors.html", "board governors academic guidance members"],
    ["Director General", "Administration", "/director-general.html", "director general leadership"],
    ["Prof. Dr. Shahbaz Khan Manj", "People", "/administration/prof-dr-shahbaz-khan-manj.html", "shahbaz khan manj professor prof doctor director general aqiri university of education lahore Islamic studies academic leadership theological theorist"],
    ["Prof. Dr. Qibla Ayaz", "People", "/administration/prof-dr-qibla-ayaz.html", "qibla ayaz professor prof doctor board governor member supreme court shariat appellate bench council of Islamic ideology Islamic law public policy"],
    ["Prof. Dr. Muhammad Khalid Masud", "People", "/administration/prof-dr-muhammad-khalid-masud.html", "muhammad khalid masud masood professor prof doctor board governor member international Islamic university Islamabad Islamic law jurisprudence Muslim thought"],
    ["Prof. Dr. Abu Sufyan Islahi", "People", "/administration/prof-dr-abu-sufyan-islahi.html", "abu sufyan islahi professor prof doctor board governor member aligarh Muslim university India Arabic Islamic studies literature editor reviewer"],
    ["Prof. Dr. Mohd Roslan bin Mohd Nor", "People", "/administration/prof-dr-mohd-roslan-bin-mohd-nor.html", "mohd mohd. mohammed roslan bin nor professor prof doctor board governor member university malaya Malaysia Islamic history civilization"],
    ["Prof. Dr. Arshad Munir Laghari", "People", "/administration/prof-dr-arshad-munir-laghari.html", "arshad munir laghari professor prof doctor board governor member ghazi university dera ghazi khan Islamic studies"],
    ["Dr. Bilal Masud", "People", "/administration/dr-bilal-masud.html", "bilal masud masood doctor board governor member university Punjab Lahore Oxford physics science philosophy metaphysics"],
    ["Fields of Inquiry", "Research", "/index.html#departments", "quran hadith sunnah seerah fiqh law thought history culture religion interfaith research areas"],
    ["Editorial & Acquisitions", "Department", "/departments/editorial-and-acquisitions.html", "editorial manuscripts books acquisitions peer review"],
    ["Production & Publishing Operations", "Department", "/departments/production-and-publishing-operations.html", "production publishing books journals typesetting"],
    ["Communications & Public Relations", "Department", "/departments/communications-and-public-relations.html", "communications media outreach public relations"],
    ["Digital Platform Technology", "Department", "/departments/digital-platform-technology.html", "technology website digital platforms ojs"],
    ["Compliance & Human Resource", "Department", "/departments/compliance-and-human-resource.html", "compliance human resource finance legal policy"],
    ["Academic Contributors", "People", "/departments/academic-contributors.html", "academic contributors reviewers editors scholars"],
    ["Technology Contributors", "People", "/departments/technology-contributors.html", "technology contributors developers"],
    ["Production Contributors", "People", "/departments/production-contributors.html", "copyeditors proofreaders typesetters layout designers cover designers indexers print technical consultants"],
    ["Communications Contributors", "People", "/departments/communications-contributors.html", "content writers media public relations campaigns social media designers event contributors"],
    ["Compliance Contributors", "People", "/departments/compliance-contributors.html", "human resources hr compliance finance legal documentation training administrative contributors"],
    ["Publications", "Publishing", "/index.html#publications", "journals publications al qamar al nasr al muaz issn"],
    ["Al-Qamar", "Journal", "/index.html#publications", "al qamar quarterly journal Islamic studies"],
    ["Al-Nasr", "Journal", "/index.html#publications", "al nasr journal research publication"],
    ["Qur’anic Studies", "Research", "/index.html#departments", "quran quranic tafsir sciences contemporary guidance field inquiry"],
    ["Hadith & Sunnah", "Research", "/index.html#departments", "hadith sunnah prophetic guidance classical literature sciences field inquiry"],
    ["Seerah & Islamic Civilization", "Research", "/index.html#departments", "seerah sirah Islamic civilization Muslim history leadership institutions field inquiry"],
    ["Fiqh & Islamic Law", "Research", "/index.html#departments", "fiqh Islamic law jurisprudence legal theory maqasid contemporary questions field inquiry"],
    ["Manuscript Submission", "Publishing", "/manuscripts.html", "submit manuscript author guidelines review publication"],
    ["Academic Programs", "Admissions", "/index.html#programs", "programs fellowships diplomas training"],
    ["Postdoctoral Fellowships", "Admissions", "/postdoctoral-fellowships.html", "postdoctoral fellowship phd research visiting non resident"],
    ["Advanced Diplomas", "Admissions", "/advanced-diplomas.html", "advanced diploma arabic Islamic texts academic research scholarly writing"],
    ["Diploma Admission Form", "Admissions", "/diploma-admission-form.html", "apply online diploma admission application"],
    ["News & Notices", "Updates", "/index.html#news", "news notices calls programs admissions announcements"],
    ["Call for Papers", "Updates", "/index.html#news", "call papers journal issue chapters conference publication"],
    ["Careers & Internships", "Opportunities", "/careers.html", "careers jobs internships vacancies work aqiri"],
    ["Digital Platform and Technology Assistant", "Career", "/careers.html#openings", "job opening internship entry level remote hybrid website wordpress ojs metadata"],
    ["Social Media and Digital Communications Assistant", "Career", "/careers.html#openings", "job opening internship entry level remote hybrid communications content social media"],
    ["Report Copyright Infringement", "Policy", "/report-copyright-infringement.html", "copyright infringement report permissions ownership complaint takedown"],
    ["Report Security Issue", "Policy", "/report-security-issue.html", "security issue report vulnerability privacy data exposure support"],
    ["Brand and Trademark Notice", "Policy", "/brand-and-trademark-notice.html", "brand trademark logo permissions institutional identity aqiri"],
    ["Accessibility", "Policy", "/accessibility.html", "accessibility support readable forms links navigation assistance"],
    ["Digital Accessibility", "Policy", "/digital-accessibility.html", "digital accessibility pdf forms website files public information"],
    ["Privacy Statement", "Policy", "/privacy-statement.html", "privacy statement data personal information cookies records"],
    ["Academic Collaboration", "Contact", "/index.html#contact", "collaboration universities scholars libraries publishers"],
    ["Contact AQIRI", "Contact", "/contact-aqiri.html", "contact aqiri email lahore pakistan office address programs admissions support careers"],
    ["Location and Directions", "Contact", "/location-and-directions.html", "location directions map office lahore marghazar colony multan road 54500 office hours monday saturday"],
    ["Office Address", "Contact", "/location-and-directions.html", "60 d block marghazar colony multan road lahore 54500 pakistan office hours 9 to 6"]
  ].map(([title, category, url, keywords]) => ({ title, category, url, keywords }));

  const normalize = (value) => value.toLowerCase().normalize("NFKD").replace(/[^\w\s&-]/g, " ").replace(/\s+/g, " ").trim();
  const score = (record, query) => {
    const words = normalize(query).split(" ").filter(Boolean);
    const title = normalize(record.title);
    const haystack = `${title} ${normalize(record.category)} ${normalize(record.keywords)}`;
    if (!words.every((word) => haystack.includes(word))) return 0;
    return words.reduce((total, word) => total + (title.startsWith(word) ? 8 : title.includes(word) ? 5 : 2), 0);
  };

  document.querySelectorAll(".nav-search").forEach((form) => {
    const input = form.querySelector("input");
    const panel = document.createElement("div");
    panel.className = "search-results";
    panel.setAttribute("role", "listbox");
    form.append(panel);
    let results = [];
    let selected = -1;

    const close = () => {
      panel.classList.remove("open");
      panel.innerHTML = "";
      selected = -1;
    };

    const select = (index) => {
      selected = Math.max(-1, Math.min(index, results.length - 1));
      panel.querySelectorAll("a").forEach((item, itemIndex) => item.classList.toggle("selected", itemIndex === selected));
      panel.querySelector("a.selected")?.scrollIntoView({ block: "nearest" });
    };

    const render = () => {
      const query = input.value.trim();
      if (query.length < 2) return close();
      results = records.map((record) => ({ ...record, score: score(record, query) }))
        .filter((record) => record.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 10);
      panel.innerHTML = results.length
        ? results.map((record) => `<a role="option" href="${record.url}"><span>${record.title}</span><small>${record.category}</small></a>`).join("")
        : '<p>No AQIRI results found. Try a person, role, department, program, journal, or research topic.</p>';
      panel.classList.add("open");
      selected = -1;
    };

    input.addEventListener("input", render);
    input.addEventListener("focus", render);
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { event.preventDefault(); select(selected + 1); }
      if (event.key === "ArrowUp") { event.preventDefault(); select(selected - 1); }
      if (event.key === "Escape") close();
      if (event.key === "Enter" && selected >= 0) {
        event.preventDefault();
        window.location.href = results[selected].url;
      }
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!results.length) render();
      if (results[0]) window.location.href = results[Math.max(selected, 0)].url;
    });
    document.addEventListener("pointerdown", (event) => {
      if (!form.contains(event.target)) close();
    });
  });
})();
