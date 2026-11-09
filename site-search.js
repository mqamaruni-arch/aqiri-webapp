(() => {
  const records = [
    ["Research Projects", "Research", "/research.html", "AQIRI research projects Islamic economic resources Ibraheem Emiola Habeeb celestial commons Abba Dandago halal certification Nigeria"],
    ["Halal Certification in Nigeria", "Research", "/halal-certification-nigeria.html", "Abba A Dandago sharia compliant products services regulations awareness economic implications halal governance maqasid"],
    ["Economic Resources of the Islamic State", "Research", "/economic-resources-islamic-state.html", "kharaj siyasah shariyyah comprehensive development Islamic finance public treasury bayt al mal ibraheem abdulwahab abdulkareem"],
    ["Who Owns the Sky?", "Research", "/who-owns-the-sky.html", "Islamic jurisprudence celestial commons space law orbital governance geoengineering istikhlaf hima la darar maslaha Emiola Habeeb"],
    ["Research Methods in Islamic Studies", "Online Workshop", "/on-work-2026-01.html", "AQIRI workshop 21 22 November 2026 research topic proposal thesis journal publication registration PKR 2000"],
    ["About AQIRI", "Institute", "/#about", "who we are mission Islamic research institute scholarship"],
    ["Vision and Objectives", "Institute", "/#vision-objectives", "vision objectives research publication training ethics collaboration access"],
    ["Institute Leadership", "Institute", "/#administration", "administration governance leadership oversight board director general chief administrative officer"],
    ["Board of Governors", "Administration", "/board-of-governors.html", "board governors academic guidance members"],
    ["Director General", "Administration", "/director-general.html", "director general leadership"],
    ["Prof. Dr. Shahbaz Khan Manj", "People", "/administration/prof-dr-shahbaz-khan-manj.html", "shahbaz khan manj professor prof doctor director general aqiri university of education lahore Islamic studies academic leadership theological theorist"],
    ["Prof. Dr. Qibla Ayaz", "People", "/administration/prof-dr-qibla-ayaz.html", "qibla ayaz professor prof doctor board governor member supreme court shariat appellate bench council of Islamic ideology Islamic law public policy"],
    ["Prof. Dr. Muhammad Khalid Masud", "People", "/administration/prof-dr-muhammad-khalid-masud.html", "muhammad khalid masud masood professor prof doctor board governor member international Islamic university Islamabad Islamic law jurisprudence Muslim thought"],
    ["Prof. Dr. Abu Sufyan Islahi", "People", "/administration/prof-dr-abu-sufyan-islahi.html", "abu sufyan islahi professor prof doctor board governor member aligarh Muslim university India Arabic Islamic studies literature editor reviewer"],
    ["Prof. Dr. Mohd Roslan bin Mohd Nor", "People", "/administration/prof-dr-mohd-roslan-bin-mohd-nor.html", "mohd mohd. mohammed roslan bin nor professor prof doctor board governor member university malaya Malaysia Islamic history civilization"],
    ["Prof. Dr. Arshad Munir Laghari", "People", "/administration/prof-dr-arshad-munir-laghari.html", "arshad munir laghari professor prof doctor board governor member ghazi university dera ghazi khan Islamic studies"],
    ["Dr. Bilal Masud", "People", "/administration/dr-bilal-masud.html", "bilal masud masood doctor board governor member university Punjab Lahore Oxford physics science philosophy metaphysics"],
    ["Fields of Inquiry", "Research", "/#fields-of-inquiry", "quran qur an tafsir hadith sunnah seerah prophetic fiqh jurisprudence usul maqasid aqidah kalam theology philosophy tasawwuf spirituality history civilization culture literature arts arabic texts comparative religion society ethics economics finance business governance political thought education pedagogy peace interfaith humanities social sciences research areas"],
    ["Publications", "Publishing", "/#publications", "journals publications al qamar al nasr al muaz issn"],
    ["Al-Qamar", "Journal", "/#publications", "al qamar quarterly journal Islamic studies"],
    ["Al-Nasr", "Journal", "/#publications", "al nasr journal research publication"],
    ["Qur’anic Studies & Tafsir", "Research", "/#fields-of-inquiry", "quran quranic tafsir sciences interpretation classical contemporary contexts field inquiry"],
    ["Hadith & Sunnah Studies", "Research", "/#fields-of-inquiry", "hadith sunnah transmission criticism collections prophetic field inquiry"],
    ["Seerah & Prophetic Studies", "Research", "/#fields-of-inquiry", "seerah sirah prophetic muhammad leadership society diplomacy history field inquiry"],
    ["Fiqh & Islamic Jurisprudence", "Research", "/#fields-of-inquiry", "fiqh Islamic law jurisprudence schools legal opinions Muslim life field inquiry"],
    ["Usul al-Fiqh & Maqasid al-Shariah", "Research", "/#fields-of-inquiry", "usul fiqh maqasid shariah legal reasoning sources objectives field inquiry"],
    ["Aqidah, Kalam & Islamic Theology", "Research", "/#fields-of-inquiry", "aqidah kalam theology beliefs doctrine schools debates faith field inquiry"],
    ["Islamic Philosophy & Intellectual Thought", "Research", "/#fields-of-inquiry", "philosophy intellectual thought knowledge ethics Muslim traditions field inquiry"],
    ["Tasawwuf & Islamic Spirituality", "Research", "/#fields-of-inquiry", "tasawwuf sufi spirituality practice ethics classical texts scholars field inquiry"],
    ["Islamic History & Civilization", "Research", "/#fields-of-inquiry", "Muslim history civilization societies dynasties institutions intellectual movements field inquiry"],
    ["Islamic Culture, Literature & Arts", "Research", "/#fields-of-inquiry", "culture literature arts arabic persian urdu art aesthetics expression field inquiry"],
    ["Arabic Language & Islamic Texts", "Research", "/#fields-of-inquiry", "arabic language linguistics texts manuscripts translation interpretation field inquiry"],
    ["Study of Religions", "Research", "/#fields-of-inquiry", "religion religious traditions beliefs practices institutions communities academic historical textual philosophical social scientific field inquiry"],
    ["Anthropology of Religion", "Research", "/#fields-of-inquiry", "religion cultural social life ritual symbolism religious identity lived religion sacred spaces indigenous traditions field inquiry"],
    ["Peace & Interfaith Studies", "Research", "/#fields-of-inquiry", "peace interfaith religious coexistence peacebuilding conflict transformation reconciliation religious diplomacy dialogue civilizations field inquiry"],
    ["Islam, Society & Contemporary Issues", "Research", "/#fields-of-inquiry", "Islam society identity family gender technology social change globalization field inquiry"],
    ["Islamic Ethics & Applied Moral Studies", "Research", "/#fields-of-inquiry", "Islamic ethics moral medicine environment professional society field inquiry"],
    ["Islamic Economics, Finance & Business Ethics", "Research", "/#fields-of-inquiry", "Islamic economics finance banking business commercial entrepreneurship markets field inquiry"],
    ["Islam, Governance & Political Thought", "Research", "/#fields-of-inquiry", "Islam governance political thought institutions leadership citizenship field inquiry"],
    ["Islamic Education & Pedagogy", "Research", "/#fields-of-inquiry", "Islamic education pedagogy curriculum teaching learning institutions field inquiry"],
    ["Related Humanities & Social Sciences", "Research", "/#fields-of-inquiry", "humanities social sciences history literature philosophy linguistics sociology anthropology political science law education cultural studies field inquiry"],
    ["Manuscript Submission", "Publishing", "/manuscripts.html", "submit manuscript author guidelines review publication"],
    ["AQIRI Library", "Library", "/library.html", "library books monographs open access licensed access Islamic studies research scholarly reading"],
    ["Academic Programs", "Admissions", "/#programs", "programs fellowships diplomas training"],
    ["Postdoctoral Fellowships", "Admissions", "/postdoctoral-fellowships.html", "postdoctoral fellowship phd research visiting non resident"],
    ["Advanced Diplomas", "Admissions", "/advanced-diplomas.html", "advanced diploma arabic Islamic texts academic research scholarly writing"],
    ["Diploma Admission Form", "Admissions", "/diploma-admission-form.html", "apply online diploma admission application"],
    ["News & Events", "Updates", "/news-and-events.html", "news notices calls programs admissions announcements"],
    ["Call for Papers", "Updates", "/#news", "call papers journal issue chapters conference publication"],
    ["Careers & Internships", "Opportunities", "/careers.html", "careers jobs internships vacancies work aqiri"],
    ["Digital Platform and Technology Assistant", "Career", "/careers.html#openings", "job opening internship entry level remote hybrid website wordpress ojs metadata"],
    ["Social Media and Digital Communications Assistant", "Career", "/careers.html#openings", "job opening internship entry level remote hybrid communications content social media"],
    ["Report Copyright Infringement", "Policy", "/report-copyright-infringement.html", "copyright infringement report permissions ownership complaint takedown"],
    ["Report Security Issue", "Policy", "/report-security-issue.html", "security issue report vulnerability privacy data exposure support"],
    ["Brand and Trademark Notice", "Policy", "/brand-and-trademark-notice.html", "brand trademark logo permissions institutional identity aqiri"],
    ["Accessibility", "Policy", "/accessibility.html", "accessibility support readable forms links navigation assistance"],
    ["Digital Accessibility", "Policy", "/digital-accessibility.html", "digital accessibility pdf forms website files public information"],
    ["Privacy Statement", "Policy", "/privacy-statement.html", "privacy statement data personal information cookies records"],
    ["Academic Collaboration", "Contact", "/#contact", "collaboration universities scholars libraries publishers"],
    ["Contact AQIRI", "Contact", "/contact-aqiri.html", "contact aqiri email lahore pakistan office address programs admissions support careers"],
    ["Location and Directions", "Contact", "/location-and-directions.html", "location directions map regional administrative office hospital road manga mandi lahore office hours 9 am 8 pm monday saturday"],
    ["Office Address", "Contact", "/location-and-directions.html", "regional administrative office hospital road manga mandi lahore pakistan office hours 9 am to 8 pm monday to saturday"]
  ].map(([title, category, url, keywords]) => ({ title, category, url: window.location.hostname === "library.aqiri.org" && url.startsWith("/") ? `https://www.aqiri.org${url}` : url, keywords }));

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
