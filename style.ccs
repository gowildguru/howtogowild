/* =========================================
   HOW TO GOWILD!
   Global Design System
   ========================================= */

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

:root {
  --green: #66766c;
  --green-dark: #354d3d;
  --green-deep: #293e31;
  --green-light: #e9eeeb;

  --white: #ffffff;
  --off-white: #f7f8f6;
  --text: #26332b;
  --text-light: #6b756e;
  --border: #d9dfdb;

  --radius-small: 12px;
  --radius: 20px;
  --radius-large: 30px;

  --shadow:
    0 8px 30px rgba(31, 49, 38, 0.08);

  --shadow-hover:
    0 14px 38px rgba(31, 49, 38, 0.14);

  --page-width: 1180px;
}


/* =========================================
   RESET
   ========================================= */

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  color: var(--text);
  background: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
}

button,
input,
select {
  font: inherit;
}


/* =========================================
   PAGE CONTAINER
   ========================================= */

.container {
  width: min(calc(100% - 40px), var(--page-width));
  margin: 0 auto;
}

.section {
  padding: 72px 0;
}

.section-green {
  background: var(--green-dark);
  color: var(--white);
}

.section-soft {
  background: var(--off-white);
}


/* =========================================
   TYPOGRAPHY
   ========================================= */

h1,
h2,
h3,
h4 {
  margin-top: 0;
  line-height: 1.15;
}

h1 {
  font-size: clamp(2.3rem, 5vw, 4.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

h2 {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.025em;
}

h3 {
  font-size: 1.15rem;
  font-weight: 700;
}

.section-heading {
  margin-bottom: 10px;
}

.section-description {
  color: var(--text-light);
  max-width: 700px;
  margin-top: 0;
  margin-bottom: 32px;
}

.section-green .section-description {
  color: rgba(255,255,255,0.75);
}


/* =========================================
   NAVIGATION
   ========================================= */

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;

  background: rgba(53, 77, 61, 0.96);
  color: white;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom:
    1px solid rgba(255,255,255,0.08);
}

.navbar {
  width: min(calc(100% - 40px), var(--page-width));
  min-height: 66px;

  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;

  text-decoration: none;
  font-weight: 800;
  white-space: nowrap;
}

.brand-mark {
  width: 30px;
  height: 30px;

  border: 2px solid rgba(255,255,255,0.8);
  border-radius: 50%;

  display: grid;
  place-items: center;

  font-size: 0.7rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links a {
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 600;

  padding: 9px 13px;
  border-radius: 999px;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.nav-links a:hover {
  background: rgba(255,255,255,0.12);
}

.mobile-menu-button {
  display: none;

  background: rgba(255,255,255,0.1);
  color: white;

  border: 0;
  border-radius: 999px;

  width: 42px;
  height: 42px;

  cursor: pointer;
}


/* =========================================
   HERO
   ========================================= */

.hero {
  position: relative;
  min-height: 520px;

  display: flex;
  align-items: center;

  color: white;
  overflow: hidden;

  background:
    linear-gradient(
      90deg,
      rgba(24, 42, 31, 0.84),
      rgba(24, 42, 31, 0.45)
    ),
    var(--green-dark);
}

.hero-background {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  z-index: -1;
}

.hero-content {
  width: min(calc(100% - 40px), var(--page-width));
  margin: auto;

  padding: 90px 0;

  position: relative;
  z-index: 2;
}

.hero-copy {
  max-width: 760px;
}

.hero-eyebrow {
  display: inline-flex;

  padding: 8px 14px;
  margin-bottom: 18px;

  border-radius: 999px;

  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.2);

  font-size: 0.78rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero h1 {
  margin-bottom: 18px;
}

.hero p {
  max-width: 670px;

  font-size: 1.05rem;
  color: rgba(255,255,255,0.88);

  margin-bottom: 28px;
}


/* =========================================
   BUTTONS + PILLS
   ========================================= */

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 46px;

  padding: 11px 20px;

  border-radius: 999px;
  border: 0;

  text-decoration: none;

  font-size: 0.88rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: var(--white);
  color: var(--green-dark);
}

.button-green {
  background: var(--green);
  color: white;
}

.button-outline {
  color: white;
  border: 1px solid rgba(255,255,255,0.45);
  background: rgba(255,255,255,0.06);
}


/* =========================================
   HELPFUL TOOLS
   ========================================= */

.tool-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 18px;
}

.tool-card {
  position: relative;

  padding: 26px;

  min-height: 210px;

  background: white;

  border:
    1px solid var(--border);

  border-radius:
    var(--radius);

  text-decoration: none;

  box-shadow:
    0 3px 14px rgba(31,49,38,0.04);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border 0.22s ease;
}

.tool-card:hover {
  transform: translateY(-5px);

  box-shadow:
    var(--shadow-hover);

  border-color:
    rgba(102,118,108,0.45);
}

.tool-icon {
  width: 44px;
  height: 44px;

  margin-bottom: 22px;

  border-radius: 14px;

  display: grid;
  place-items: center;

  background: var(--green-light);
  color: var(--green-dark);

  font-size: 1.25rem;
}

.tool-card h3 {
  margin-bottom: 8px;
}

.tool-card p {
  margin: 0;

  color: var(--text-light);

  font-size: 0.88rem;
  line-height: 1.55;
}


/* =========================================
   DASHBOARD
   ========================================= */

.dashboard-shell {
  background:
    var(--green-dark);

  border-radius:
    var(--radius-large);

  padding: 30px;

  overflow: hidden;
}

.dashboard-placeholder {
  min-height: 260px;

  display: grid;
  place-items: center;

  text-align: center;

  border:
    1px dashed rgba(255,255,255,0.3);

  border-radius:
    var(--radius);

  color:
    rgba(255,255,255,0.72);
}


/* =========================================
   FAQ ACCORDIONS
   ========================================= */

.faq-list {
  max-width: 900px;
}

.faq-item {
  border-bottom:
    1px solid var(--border);
}

.faq-question {
  width: 100%;

  padding: 22px 4px;

  border: 0;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  text-align: left;

  color: var(--text);

  font-weight: 700;

  cursor: pointer;
}

.faq-icon {
  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: var(--green);
  color: white;
}

.faq-chevron {
  transition:
    transform 0.25s ease;
}

.faq-item.open
.faq-chevron {
  transform:
    rotate(180deg);
}

.faq-answer {
  display: none;

  padding:
    0 54px 22px;

  color:
    var(--text-light);
}

.faq-item.open
.faq-answer {
  display: block;
}


/* =========================================
   TOPIC PILLS
   ========================================= */

.topic-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.topic-pill {
  display: inline-flex;
  align-items: center;

  padding: 10px 16px;

  border-radius: 999px;

  background: var(--green);
  color: white;

  text-decoration: none;

  font-size: 0.82rem;
  font-weight: 600;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.topic-pill:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}


/* =========================================
   PROMO / BACKUP PLAN
   ========================================= */

.promo-card {
  display: grid;

  grid-template-columns:
    1.15fr 0.85fr;

  align-items: center;

  gap: 50px;

  padding: 48px;

  border-radius:
    var(--radius-large);

  background:
    var(--off-white);

  overflow: hidden;
}

.promo-card h2 {
  margin-bottom: 14px;
}

.promo-card p {
  color:
    var(--text-light);
}


/* =========================================
   FOOTER
   ========================================= */

.site-footer {
  background:
    var(--green-deep);

  color:
    rgba(255,255,255,0.72);

  padding:
    50px 0 30px;
}

.footer-inner {
  width:
    min(calc(100% - 40px), var(--page-width));

  margin:
    auto;
}

.footer-brand {
  color: white;
  font-weight: 800;

  margin-bottom: 10px;
}

.footer-small {
  font-size: 0.72rem;
  line-height: 1.6;

  max-width: 850px;

  margin-top: 30px;

  color:
    rgba(255,255,255,0.5);
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 900px) {

  .tool-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .promo-card {
    grid-template-columns:
      1fr;
  }

}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 700px) {

  .container {
    width:
      min(calc(100% - 28px), var(--page-width));
  }

  .section {
    padding:
      48px 0;
  }

  .navbar {
    width:
      calc(100% - 28px);

    min-height:
      60px;
  }

  .nav-links {
    display:
      none;
  }

  .mobile-menu-button {
    display:
      grid;

    place-items:
      center;
  }

  .hero {
    min-height:
      500px;
  }

  .hero-content {
    width:
      calc(100% - 32px);

    padding:
      65px 0;
  }

  .hero h1 {
    font-size:
      clamp(2.25rem, 12vw, 3.4rem);
  }

  .hero p {
    font-size:
      0.95rem;
  }

  .button-row {
    width:
      100%;
  }

  .button-row .button {
    flex:
      1 1 auto;
  }

  .tool-grid {
    grid-template-columns:
      1fr 1fr;

    gap:
      12px;
  }

  .tool-card {
    padding:
      18px;

    min-height:
      190px;
  }

  .tool-icon {
    width:
      38px;

    height:
      38px;

    margin-bottom:
      16px;
  }

  .tool-card h3 {
    font-size:
      0.95rem;
  }

  .tool-card p {
    font-size:
      0.76rem;
  }

  .dashboard-shell {
    padding:
      16px;

    border-radius:
      22px;
  }

  .faq-question {
    padding:
      18px 0;
  }

  .faq-answer {
    padding:
      0 0 20px 48px;
  }

  .promo-card {
    padding:
      28px 22px;

    gap:
      24px;
  }

}


/* =========================================
   SMALL PHONES
   ========================================= */

@media (max-width: 430px) {

  .tool-grid {
    grid-template-columns:
      1fr;
  }

  .tool-card {
    min-height:
      auto;
  }

  .button-row {
    flex-direction:
      column;
  }

  .button {
    width:
      100%;
  }

}
