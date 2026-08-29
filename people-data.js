const aqiriPeople = [
  ["dr-hafiz-muhammad-hassan", "Dr. Hafiz Muhammad Hassan", "Academic Associate", "Assistant Professor, Department of Islamic Studies", "University of Sargodha, Sargodha, Pakistan"],
  ["dr-hafiz-abdul-jalil-tabassum", "Dr. Hafiz Abdul Jalil Tabassum", "Editorial Officer", "Editorial & Acquisitions Department", "Al-Qamar Islamic Research Institute (AQIRI)"],
  ["prof-dr-mohd-roslan-bin-mohd-nor", "Prof. Dr. Mohd Roslan Bin Mohd Nor", "Academic Associate", "Professor of Islamic History and Civilization", "University of Malaya, Kuala Lumpur, Malaysia"],
  ["prof-dr-ibrahim-muhammad-ibrahim", "Prof. Dr. Ibrahim Muhammad Ibrahim", "Academic Associate", "Chairman and Professor, Department of Urdu", "Al-Azhar University, Cairo, Egypt"],
  ["prof-dr-muhammad-ijaz", "Prof. Dr. Muhammad Ijaz", "Academic Associate", "Professor and Director, Shaikh Zayed Islamic Centre", "University of the Punjab, Lahore, Pakistan"],
  ["dr-muhammad-iqbal", "Dr. Muhammad Iqbal", "Academic Associate", "Assistant Professor, Department of Arabic", "National University of Modern Languages, Islamabad, Pakistan"],
  ["dr-hafiz-zakariya", "Dr. Hafiz Zakariya", "Academic Associate", "Deputy Vice-Chancellor for Student Affairs and Alumni", "University of Malaysia Terengganu, Malaysia"],
  ["prof-dr-muhammad-saad-siddiqui", "Prof. Dr. Muhammad Saad Siddiqui", "Academic Associate", "Professor and Director, Institute of Islamic Studies", "University of the Punjab, Lahore, Pakistan"],
  ["dr-hafiz-muhammad-naeem", "Dr. Hafiz Muhammad Naeem", "Academic Associate", "Chairman, Department of Islamic Studies", "Government College University, Lahore, Pakistan"],
  ["muhammad-raza", "Muhammad Raza", "Independent Graphic & UI/UX Designer", "Graphic & UI/UX Designer", "Independent Professional"],
  ["hafiz-awais-qaisar", "Hafiz Awais Qaisar", "Visual Communication Designer", "Graphic Design and Visual Communication Professional", "Independent Professional"],
  ["mariam-khalid", "Mariam Khalid", "Senior Graphic Designer", "Graphic Designer and UI/UX Specialist", "Independent Professional"],
  ["ahmed-shaheer", "Ahmed Shaheer", "Independent Graphic Design Contractor", "Branding, social media graphics, marketing materials, and digital publications", "Independent Professional"],
  ["haider-ali", "Haider Ali", "Graphic Designer / Independent Contractor", "Graphic Design, Video Editing, Branding, and Digital Content", "Independent Professional"],
  ["saqib-hameed", "Saqib Hameed", "Senior Graphic Designer", "Graphic Design, Branding, Print, Video, 2D/3D Design, and Architectural Rendering", "Independent Professional"],
  ["owais-imran", "Owais Imran", "Product Listing & Data Entry Executive", "Product listings, data entry, and digital content", "MJS Traders"],
  ["muhammad-areeb-mirza", "Muhammad Areeb Mirza", "Freelance Video Editor | Motion Graphics Designer", "Video editing, motion graphics, graphic design, and digital content", "Independent Professional"],
  ["imran-khan", "Imran Khan", "Motion Graphics Artist / Editor", "Motion graphics, design, and creative production", "Independent Professional"],
  ["dr-loqman-ahmad", "Dr. Loqman Ahmad", "Senior Research Associate", "Lecturer", "Bacha Khan University, Charsadda, Pakistan"],
  ["dr-amjad-hussain", "Dr. Amjad Hussain", "Research Associate", "Assistant Professor, Department of Social Sciences and Humanities", "Riphah International University, Faisalabad Campus, Pakistan"],
  ["dr-memoona-rafi-bajwa", "Dr. Memoona Rafi Bajwa", "Research Associate", "Former Lecturer", "GIFT University, Gujranwala, Pakistan"],
  ["dr-abdul-basit", "Dr. Abdul Basit", "Senior Editorial Associate", "Faculty Member, Department of Islamic Studies; Director, Al-Raza Kulliat-ul-Islamia; CEO, Muslim Research Scholars Organization", "Pakistan"],
  ["ayesha-shafique", "Ayesha Shafique", "Editorial Associate", "MPhil Scholar in Islamic Studies", "The Islamia University of Bahawalpur, Pakistan"],
  ["tuba-gul", "Ms. Tuba Gul", "Editorial Associate", "PhD Scholar in Islamic Studies", "University of Education, Lahore, Pakistan"],
  ["moqadus-habiba", "Ms. Moqadus Habiba", "Senior Copyediting Associate", "MPhil Scholar in Islamic Studies", "The University of Lahore, Lahore, Pakistan"],
  ["amna-nazar", "Ms. Amna Nazar", "Copyediting Associate", "MPhil Scholar in Islamic Studies", "University of the Punjab, Lahore, Pakistan"],
  ["iqra-bibi", "Ms. Iqra Bibi", "Copyediting Associate", "MPhil Scholar in Islamic Studies", "University of Southern Punjab, Multan, Pakistan"],
  ["noor-ul-ain", "Ms. Noor ul Ain", "Senior Publication Associate", "Publication Associate", "Al-Qamar Islamic Research Institute (AQIRI)"],
  ["zainab-arshad-mughal", "Ms. Zainab Arshad Mughal", "Publication Associate", "MPhil Scholar", "Government College University, Lahore, Pakistan"]
];

const peopleGrid = document.querySelector("#people-grid");
if (peopleGrid) {
  peopleGrid.innerHTML = aqiriPeople.map(([slug, name, role, title, affiliation]) => `
    <article class="staff-card">
      <div class="staff-photo-placeholder">Photo forthcoming</div>
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
    const [, name, role, title, affiliation] = person;
    document.title = `${name} | AQIRI`;
    profileRoot.innerHTML = `<p class="eyebrow dark"><span></span>${role}</p><h1>${name}</h1><p class="profile-role">${title}</p><p class="profile-affiliation">${affiliation}</p><p>This profile records ${name}'s contribution to Al-Qamar Islamic Research Institute.</p><a class="button button-green" href="people.html">Back to People <span>←</span></a>`;
  } else {
    profileRoot.innerHTML = `<p class="eyebrow dark"><span></span>People</p><h1>Profile unavailable</h1><p>The requested profile could not be found.</p><a class="button button-green" href="people.html">Back to People <span>←</span></a>`;
  }
}
