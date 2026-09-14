(() => {
  const root = document.querySelector("#people-category-grid");
  if (!root || typeof aqiriPeople === "undefined") return;
  const category = document.body.dataset.peopleCategory;
  const filters = {
    // The fellows directory is deliberately limited to the three profiles
    // that are ready to publish with a portrait and full profile.
    research: (person) => /Research Fellow/.test(person[2]) && Boolean(person[5]),
    administrative: ([, , role]) => /Editorial|Copyediting|Publication Associate|Product Listing/.test(role)
  };
  const people = (filters[category] ? aqiriPeople.filter(filters[category]) : []);
  const researchOrder = ["shadeka-jannat", "emiola-habeeb", "abba-a-dandago"];
  if (category === "research") {
    people.sort((a, b) => researchOrder.indexOf(a[0]) - researchOrder.indexOf(b[0]));
  }
  root.innerHTML = people.length ? people.map(([slug, name, role, title, affiliation, photo]) => `<article class="staff-card">${photo ? `<img class="staff-photo" src="${photo}" alt="${name}">` : ""}<span>${role}</span><h4>${name}</h4><p>${title}<br>${affiliation}</p><a href="person-profile.html?person=${encodeURIComponent(slug)}">View full profile <b>→</b></a></article>`).join("") : '<p class="directory-empty">Current appointments will be announced by AQIRI.</p>';
})();
