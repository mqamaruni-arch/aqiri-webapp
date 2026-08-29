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
    ["Fields of Inquiry", "Research", "/index.html#departments", "quran qur an tafsir hadith sunnah seerah prophetic fiqh jurisprudence usul maqasid aqidah kalam theology philosophy tasawwuf spirituality history civilization culture literature arts arabic texts comparative religion society ethics economics finance business governance political thought education pedagogy peace interfaith humanities social sciences research areas"],
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
    ["Qur’anic Studies & Tafsir", "Research", "/index.html#departments", "quran quranic tafsir sciences interpretation classical contemporary contexts field inquiry"],
    ["Hadith & Sunnah Studies", "Research", "/index.html#departments", "hadith sunnah transmission criticism collections prophetic field inquiry"],
    ["Seerah & Prophetic Studies", "Research", "/index.html#departments", "seerah sirah prophetic muhammad leadership society diplomacy history field inquiry"],
    ["Fiqh & Islamic Jurisprudence", "Research", "/index.html#departments", "fiqh Islamic law jurisprudence schools legal opinions Muslim life field inquiry"],
    ["Usul al-Fiqh & Maqasid al-Shariah", "Research", "/index.html#departments", "usul fiqh maqasid shariah legal reasoning sources objectives field inquiry"],
    ["Aqidah, Kalam & Islamic Theology", "Research", "/index.html#departments", "aqidah kalam theology beliefs doctrine schools debates faith field inquiry"],
    ["Islamic Philosophy & Intellectual Thought", "Research", "/index.html#departments", "philosophy intellectual thought knowledge ethics Muslim traditions field inquiry"],
    ["Tasawwuf & Islamic Spirituality", "Research", "/index.html#departments", "tasawwuf sufi spirituality practice ethics classical texts scholars field inquiry"],
    ["Islamic History & Civilization", "Research", "/index.html#departments", "Muslim history civilization societies dynasties institutions intellectual movements field inquiry"],
    ["Islamic Culture, Literature & Arts", "Research", "/index.html#departments", "culture literature arts arabic persian urdu art aesthetics expression field inquiry"],
    ["Arabic Language & Islamic Texts", "Research", "/index.html#departments", "arabic language linguistics texts manuscripts translation interpretation field inquiry"],
    ["Study of Religions", "Research", "/index.html#departments", "religion religious traditions beliefs practices institutions communities academic historical textual philosophical social scientific field inquiry"],
    ["Anthropology of Religion", "Research", "/index.html#departments", "religion cultural social life ritual symbolism religious identity lived religion sacred spaces indigenous traditions field inquiry"],
    ["Peace & Interfaith Studies", "Research", "/index.html#departments", "peace interfaith religious coexistence peacebuilding conflict transformation reconciliation religious diplomacy dialogue civilizations field inquiry"],
    ["Islam, Society & Contemporary Issues", "Research", "/index.html#departments", "Islam society identity family gender technology social change globalization field inquiry"],
    ["Islamic Ethics & Applied Moral Studies", "Research", "/index.html#departments", "Islamic ethics moral medicine environment professional society field inquiry"],
    ["Islamic Economics, Finance & Business Ethics", "Research", "/index.html#departments", "Islamic economics finance banking business commercial entrepreneurship markets field inquiry"],
    ["Islam, Governance & Political Thought", "Research", "/index.html#departments", "Islam governance political thought institutions leadership citizenship field inquiry"],
    ["Islamic Education & Pedagogy", "Research", "/index.html#departments", "Islamic education pedagogy curriculum teaching learning institutions field inquiry"],
    ["Related Humanities & Social Sciences", "Research", "/index.html#departments", "humanities social sciences history literature philosophy linguistics sociology anthropology political science law education cultural studies field inquiry"],
    ["Manuscript Submission", "Publishing", "/manuscripts.html", "submit manuscript author guidelines review publication"],
    ["AQIRI Library", "Library", "/library.html", "library books monographs open access licensed access Islamic studies research scholarly reading"],
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
