(() => {
  const root = document.querySelector("#people-category-grid");
  if (!root || typeof aqiriPeople === "undefined") return;
  const category = document.body.dataset.peopleCategory;
  const filters = {
    research: ([, , role]) => /Academic Associate|Research Associate/.test(role),
    administrative: ([, , role]) => /Editorial|Copyediting|Publication Associate|Product Listing/.test(role)
  };
  const people = (filters[category] ? aqiriPeople.filter(filters[category]) : []);
  root.innerHTML = people.length ? people.map(([slug, name, role, title, affiliation]) => `<article class="staff-card"><span>${role}</span><h4>${name}</h4><p>${title}<br>${affiliation}</p><a href="person-profile.html?person=${encodeURIComponent(slug)}">View profile <b>→</b></a></article>`).join("") : '<p class="directory-empty">Current appointments will be announced by AQIRI.</p>';
})();
