const aqiriPeople = [
  ["dr-hafiz-muhammad-hassan", "Dr. Hafiz Muhammad Hassan", "Research Fellow", "Assistant Professor, Department of Islamic Studies", "University of Sargodha, Sargodha, Pakistan"],
  ["dr-hafiz-abdul-jalil-tabassum", "Dr. Hafiz Abdul Jalil Tabassum", "Editorial Officer", "Editorial & Acquisitions Department", "Al-Qamar Islamic Research Institute (AQIRI)"],
  ["prof-dr-mohd-roslan-bin-mohd-nor", "Prof. Dr. Mohd Roslan Bin Mohd Nor", "Research Fellow", "Professor of Islamic History and Civilization", "University of Malaya, Kuala Lumpur, Malaysia"],
  ["prof-dr-ibrahim-muhammad-ibrahim", "Prof. Dr. Ibrahim Muhammad Ibrahim", "Research Fellow", "Chairman and Professor, Department of Urdu", "Al-Azhar University, Cairo, Egypt"],
  ["prof-dr-muhammad-ijaz", "Prof. Dr. Muhammad Ijaz", "Research Fellow", "Professor and Director, Shaikh Zayed Islamic Centre", "University of the Punjab, Lahore, Pakistan"],
  ["dr-muhammad-iqbal", "Dr. Muhammad Iqbal", "Research Fellow", "Assistant Professor, Department of Arabic", "National University of Modern Languages, Islamabad, Pakistan"],
  ["dr-hafiz-zakariya", "Dr. Hafiz Zakariya", "Research Fellow", "Deputy Vice-Chancellor for Student Affairs and Alumni", "University of Malaysia Terengganu, Malaysia"],
  ["prof-dr-muhammad-saad-siddiqui", "Prof. Dr. Muhammad Saad Siddiqui", "Research Fellow", "Professor and Director, Institute of Islamic Studies", "University of the Punjab, Lahore, Pakistan"],
  ["dr-hafiz-muhammad-naeem", "Dr. Hafiz Muhammad Naeem", "Research Fellow", "Chairman, Department of Islamic Studies", "Government College University, Lahore, Pakistan"],
  ["emiola-habeeb", "Emiola Habeeb", "Research Fellow", "M.A. candidate in Sociology of Religion", "Necmettin Erbakan University, Türkiye", "assets/emiola-habeeb.jpg"],
  ["abba-a-dandago", "Abba A. Dandago", "Research Fellow", "PhD Candidate", "Yusuf Maitama Sule University, Kano, Nigeria", "assets/abba-a-dandago.png"],
  ["shadeka-jannat", "Shadeka Jannat", "Research Fellow", "Adjunct Lecturer in Islamic Studies; PhD Candidate in Arabic", "International Islamic University Chittagong & University of Chittagong, Bangladesh", "assets/shadeka-jannat.png"],
  ["ibraheem-abdulwahab-abdulkareem", "Ibraheem Abdulwahab Abdulkareem", "Research Fellow", "Academic Researcher in Islamic Jurisprudence and Islamic Finance", "Université Sidi Mohamed Ben Abdellah, Fès, Morocco", "assets/ibraheem-abdulwahab-abdulkareem.png"],
  ["dr-idris-abdur-rahman", "Dr. Idris Abdur-Rahman", "Research Fellow", "Lecturer; Executive Secretary", "Islamic University of Minnesota, USA & Daaru Na‘im Academy for Islamic Sciences, Nigeria", "assets/dr-idris-abdur-rahman.jpg"],
  ["dr-ade-jamarudin", "Dr. Ade Jamarudin", "Research Fellow", "Lecturer in Islamic Family Law, Qur’anic Sciences and Islamic Jurisprudence", "Universitas Islam Negeri Sunan Gunung Djati Bandung, Indonesia", "assets/dr-ade-jamarudin.jpg"],
  ["muhammad-raza", "Muhammad Raza", "Independent Graphic & UI/UX Designer", "Graphic & UI/UX Designer", "Independent Professional"],
  ["hafiz-awais-qaisar", "Hafiz Awais Qaisar", "Visual Communication Designer", "Graphic Design and Visual Communication Professional", "Independent Professional"],
  ["mariam-khalid", "Mariam Khalid", "Senior Graphic Designer", "Graphic Designer and UI/UX Specialist", "Independent Professional"],
  ["ahmed-shaheer", "Ahmed Shaheer", "Independent Graphic Design Contractor", "Branding, social media graphics, marketing materials, and digital publications", "Independent Professional"],
  ["haider-ali", "Haider Ali", "Graphic Designer / Independent Contractor", "Graphic Design, Video Editing, Branding, and Digital Content", "Independent Professional"],
  ["saqib-hameed", "Saqib Hameed", "Senior Graphic Designer", "Graphic Design, Branding, Print, Video, 2D/3D Design, and Architectural Rendering", "Independent Professional"],
  ["owais-imran", "Owais Imran", "Product Listing & Data Entry Executive", "Product listings, data entry, and digital content", "MJS Traders"],
  ["muhammad-areeb-mirza", "Muhammad Areeb Mirza", "Freelance Video Editor | Motion Graphics Designer", "Video editing, motion graphics, graphic design, and digital content", "Independent Professional"],
  ["imran-khan", "Imran Khan", "Motion Graphics Artist / Editor", "Motion graphics, design, and creative production", "Independent Professional"],
  ["dr-loqman-ahmad", "Dr. Loqman Ahmad", "Senior Research Fellow", "Lecturer", "Bacha Khan University, Charsadda, Pakistan"],
  ["dr-amjad-hussain", "Dr. Amjad Hussain", "Research Fellow", "Assistant Professor, Department of Social Sciences and Humanities", "Riphah International University, Faisalabad Campus, Pakistan"],
  ["dr-memoona-rafi-bajwa", "Dr. Memoona Rafi Bajwa", "Research Fellow", "Former Lecturer", "GIFT University, Gujranwala, Pakistan"],
  ["dr-abdul-basit", "Dr. Abdul Basit", "Senior Editorial Associate", "Faculty Member, Department of Islamic Studies; Director, Al-Raza Kulliat-ul-Islamia; CEO, Muslim Research Scholars Organization", "Pakistan"],
  ["ayesha-shafique", "Ayesha Shafique", "Editorial Associate", "MPhil Scholar in Islamic Studies", "The Islamia University of Bahawalpur, Pakistan"],
  ["tuba-gul", "Ms. Tuba Gul", "Editorial Associate", "PhD Scholar in Islamic Studies", "University of Education, Lahore, Pakistan"],
  ["moqadus-habiba", "Ms. Moqadus Habiba", "Senior Copyediting Associate", "MPhil Scholar in Islamic Studies", "The University of Lahore, Lahore, Pakistan"],
  ["amna-nazar", "Ms. Amna Nazar", "Copyediting Associate", "MPhil Scholar in Islamic Studies", "University of the Punjab, Lahore, Pakistan"],
  ["iqra-bibi", "Ms. Iqra Bibi", "Copyediting Associate", "MPhil Scholar in Islamic Studies", "University of Southern Punjab, Multan, Pakistan"],
  ["noor-ul-ain", "Ms. Noor ul Ain", "Senior Publication Associate", "Publication Associate", "Al-Qamar Islamic Research Institute (AQIRI)"],
  ["zainab-arshad-mughal", "Ms. Zainab Arshad Mughal", "Publication Associate", "MPhil Scholar", "Government College University, Lahore, Pakistan"]
];

const aqiriPeopleBios = {
  "emiola-habeeb": [
    "Emiola Habeeb is a Nigerian Islamic Studies scholar, researcher, and social entrepreneur whose work connects Islamic jurisprudence, social finance, and conflict resolution. He earned a First-Class BA in Islamic Studies from Lagos State University (CGPA 4.69/5.00), placing in the top two percent of his cohort. He also holds a Diploma in Islamic Studies from Zad Academy and a Diploma in Peace and Conflict Resolution from Olabisi Onabanjo University.",
    "He is pursuing an MA in Sociology of Religion at Necmettin Erbakan University, Türkiye. His six peer-reviewed publications address Islamic economics, political Islam, social finance, zakat and poverty reduction, digital transformation in Islamic fundraising, Islamic-finance literacy among Nigerian youth, and Muslim clerical involvement in electoral politics.",
    "Habeeb completed research training in takaful, retakaful, and data analytics in Islamic banking at the AlHuda Centre of Islamic Banking and Economics, UAE, and later worked with its team as a Business Development Officer. He is a 2025 Turkish Government Scholarship recipient, a Fellow of the International Institute of Islamic Theology, and a Student Associate of the Chartered Institute of Personnel Management of Nigeria.",
    "Beyond academia, he co-leads the Literal Scholars' Initiative, a Nigerian NGO advancing SDGs 4 and 16 through educational work with children in underserved urban communities. He communicates fluently in English, Arabic, and Turkish."
  ],
  "abba-a-dandago": [
    "Abba A. Dandago is a PhD candidate at Yusuf Maitama Sule University, Kano, Nigeria, as well as a research consultant and educational expert. He holds two master's degrees in Islamic Banking and Finance, a BA in Arabic and Islamic Studies from Bayero University Kano, and a Postgraduate Diploma in Education.",
    "He has completed specialised certifications in Islamic Capital Markets, Sukuk, and the Halal Industry from AlHuda CIBE, as well as certification in Research Methodology and Scientific Writing from MAAUN. His research focuses on non-interest financial systems, Shariah governance standards, regulatory compliance, and risk-management frameworks in financial institutions and takaful operators.",
    "Drawing on experience in departmental leadership, academic administration, and broadcast media production, his scholarly interests also include juristic analysis in Islamic economics, social finance, and economic development. He is ready to begin his research assignment on receipt of the Communication Protocol and Assignment Questionnaire."
  ],
  "shadeka-jannat": [
    "Shadeka Jannat is an educator and researcher with more than six years of university teaching experience. She serves as an Adjunct Lecturer in Islamic Studies at the Centre for General Education, International Islamic University Chittagong, where she has also held ad-hoc and regular faculty appointments. She is pursuing a PhD in Arabic at the University of Chittagong (academic session 2025–2026).",
    "She holds an MA and a BA (Honours) in Da'wah and Islamic Studies from International Islamic University Chittagong, both achieved with first-class, first-position results and Gold Medal recognition. She also holds an MA in Kamil (Hadith) from Islamic University Kushtia, and has received Chancellor and Vice-Chancellor Awards and top NTRCA examination merits.",
    "Her research interests include Islamic ethics and contemporary issues, Islamic education and curriculum development, fiqh and social justice, da'wah methodology, and Islamic history and civilisation. Her peer-reviewed work addresses digital evidence in Islamic law, technology in Arabic teaching, social media in da'wah, and Qur'anic concepts in early-childhood development.",
    "Skilled in curriculum design, outcome-based education principles, and technology-integrated pedagogy, she is committed to supportive learning environments and ethical leadership through education."
  ],
  "ibraheem-abdulwahab-abdulkareem": [
    "Ibraheem Abdulwahab Abdulkareem is an academic researcher specialising in Islamic jurisprudence, Islamic finance, and historical legal frameworks. He holds an MA in Sharia Studies and Islamic Finance and is affiliated with Université Sidi Mohamed Ben Abdellah, Fès.",
    "His postgraduate research examined micro-takaful and its application within the informal sector. His earlier academic work involved comparative textual analysis of classical Islamic commercial jurisprudence (Fiqh al-Mu‘amalat).",
    "His research interests include fiqh, usul al-fiqh, maqasid al-Shariah, Islamic economics, finance, and business ethics. His wider interests cover Islam and governance, political thought, historical systems of economic administration, Qur’anic studies, tafsir, Hadith and Sunnah studies, and the Prophetic biography.",
    "Alongside his research, he has experience in manuscript evaluation, structural formatting, academic proofreading, peer review, and the organisation of academic conferences and seminars. His current work explores connections between classical Islamic texts and contemporary socio-economic questions. At AQIRI, he contributes this interdisciplinary background to research and academic publishing activities in Islamic Studies."
  ],
  "dr-idris-abdur-rahman": [
    "Dr. Idris Abdur-Rahman is an Islamic scholar, researcher, and educator specialising in fiqh and usul al-fiqh. He holds a PhD and a master's degree in fiqh and usul al-fiqh, as well as a bachelor's degree in Islamic Studies (Shari‘ah). He has also completed professional certifications in Islamic finance, maqasid al-Shari‘ah, Islamic estate distribution, waqf, and related areas.",
    "He serves as a Lecturer at the Islamic University of Minnesota, USA, and as Executive Secretary of Daaru Na‘im Academy for Islamic Sciences, Nigeria. His teaching experience covers fiqh, usul al-fiqh, Hadith, usul al-Hadith, Islamic inheritance, Arabic, and other Islamic sciences. He previously worked as a Researcher and Trainer at the Da‘wah Institute of the Islamic Education Trust.",
    "His research interests include Islamic jurisprudence, maqasid al-Shari‘ah, Islamic legal maxims, inheritance and estate distribution, Islamic finance, and contemporary applications of Shari‘ah. He has written and published in English and Arabic on Islamic law, inheritance, usul al-fiqh, logic, Islamic education, Muslim relations, and contemporary social questions."
  ],
  "dr-ade-jamarudin": [
    "Dr. Ade Jamarudin is an Indonesian scholar and university lecturer specialising in Islamic Family Law, Qur’anic Sciences, and Islamic Jurisprudence. He earned his doctorate in Islamic Family Law from Universitas Islam Negeri Sultan Syarif Kasim Riau in 2020 and serves at Universitas Islam Negeri Sunan Gunung Djati Bandung, Indonesia.",
    "His research examines the development and application of Islamic Family Law, with particular attention to Indonesia and Pakistan. He has extensive experience in academic writing and research.",
    "He has contributed to national and international scholarly journals, including Scopus-indexed publications. At AQIRI, he contributes his expertise in Islamic Family Law, Qur’anic studies, and Islamic jurisprudence to research and academic publishing activities."
  ]
};

const peopleGrid = document.querySelector("#people-grid");
if (peopleGrid) {
  peopleGrid.innerHTML = aqiriPeople.map(([slug, name, role, title, affiliation, photo]) => `
    <article class="staff-card" data-person="${slug}">
      ${photo ? `<img class="staff-photo" src="${photo}" alt="${name}">` : '<div class="staff-photo-placeholder">Photo forthcoming</div>'}
      <span>${role}</span>
      <h4>${name}</h4>
      <p>${title}<br>${affiliation}</p>
      <a href="person-profile.html?person=${encodeURIComponent(slug)}">View full profile <b>→</b></a>
    </article>`).join("");
}

const profileRoot = document.querySelector("#person-profile");
if (profileRoot) {
  const slug = new URLSearchParams(window.location.search).get("person");
  const person = aqiriPeople.find(([id]) => id === slug);
  if (person) {
    const [id, name, role, title, affiliation, photo] = person;
    const bio = aqiriPeopleBios[id];
    document.title = `${name} | AQIRI`;
    profileRoot.innerHTML = `${photo ? `<img class="profile-page-photo" src="${photo}" alt="${name}">` : ""}<p class="eyebrow dark"><span></span>${role}</p><h1>${name}</h1><p class="profile-role">${title}</p><p class="profile-affiliation">${affiliation}</p>${bio ? bio.map((paragraph) => `<p>${paragraph}</p>`).join("") : `<p>This profile records ${name}'s contribution to Al-Qamar Islamic Research Institute.</p>`}<a class="button button-green" href="people.html">Back to People <span>←</span></a>`;
  } else {
    profileRoot.innerHTML = `<p class="eyebrow dark"><span></span>People</p><h1>Profile unavailable</h1><p>The requested profile could not be found.</p><a class="button button-green" href="people.html">Back to People <span>←</span></a>`;
  }
}
