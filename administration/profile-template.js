document.querySelector("#profile-shell").innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell brand-row"><a class="brand" href="../index.html"><img src="../assets/al-qamar-seal-transparent-v3.png" alt="AQIRI logo"><span><strong>Al-Qamar</strong><small>Islamic Research Institute</small></span></a></div>
    <nav class="main-nav"><div class="shell nav-inner"><a href="../index.html">Home</a><a href="../index.html#about">About</a><a href="../board-of-governors.html" data-board-nav>Board of Governors</a><a href="../director-general.html" data-director-nav>Director General</a><a href="../index.html#departments">Departments</a><a href="../index.html#publications">Publications</a><a href="../index.html#contact">Contact</a></div></nav>
  </header>
  <main id="main">
    <section class="profile-hero"><div class="shell">
      <p class="crumb"><a href="../index.html">Home</a><span>/</span><a href="../board-of-governors.html" data-profile-parent>Board of Governors</a><span>/</span><span data-name></span></p>
      <div class="profile-hero-grid"><div><p class="eyebrow"><span></span> Board Member</p><h1 data-name></h1><p class="profile-institution" data-institution></p></div><img data-photo alt=""></div>
    </div></section>
    <section class="section profile-content"><div class="shell profile-content-grid">
      <article><p class="eyebrow dark"><span></span> Profile</p><div class="profile-prose" data-bio></div>
        <h2>Contribution to AQIRI</h2><div class="profile-prose" data-contribution></div>
      </article>
      <aside><h2>Fields of Guidance</h2><ol data-fields></ol><a class="profile-back" href="../board-of-governors.html" data-profile-back>← Back to Board</a></aside>
    </div></section>
  </main>
  <footer></footer>`;
