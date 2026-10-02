(() => {
  const form = document.getElementById("guideSearchForm");
  const input = document.getElementById("guideSearchInput");
  const results = document.getElementById("guideSearchResults");
  const status = document.getElementById("guideSearchStatus");

  if (!form || !input || !results || !status) return;

  const entries = [];

  const normalize = text =>
    text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

  function addEntry(title, text, target, open) {
    if (!target.id) {
      target.id = `guide-search-target-${entries.length}`;
    }

    entries.push({
      type: "local",
      title,
      text: text.replace(/\s+/g, " ").trim(),
      searchable: normalize(`${title} ${text}`),
      target,
      open
    });
  }

  function addPageEntry(title, text, url) {
    entries.push({
      type: "page",
      title,
      text: text.replace(/\s+/g, " ").trim(),
      searchable: normalize(`${title} ${text}`),
      url
    });
  }

  /*
   * =========================================
   * CURRENT PAGE CONTENT
   * =========================================
   */

  // Search FAQ questions and answers.
  document.querySelectorAll("#faq .gw-faq-copy").forEach(copy => {
    const heading = copy.querySelector("h4");
    const card = copy.closest(".gw-faq-card");
    const trigger = card?.querySelector(".gw-faq-trigger");

    if (!heading) return;

    addEntry(heading.textContent, copy.textContent, heading, () => {
      if (trigger?.getAttribute("aria-expanded") === "false") {
        trigger.click();
      }
    });
  });

  // Search tools and open the matching calculator.
  document.querySelectorAll("[data-open-tool]").forEach(button => {
    const title = button.querySelector(".simple-tool-title");

    if (!title) return;

    addEntry(
      title.textContent.trim(),
      button.textContent,
      button,
      () => button.click()
    );
  });

  // Search credit card descriptions.
  document.querySelectorAll(".credit-card-panel").forEach(panel => {
    const heading = panel.querySelector("h3");
    const carousel = panel.closest(".credit-card-carousel");

    if (!heading || !carousel) return;

    const panels = [...carousel.querySelectorAll(".credit-card-panel")];
    const index = panels.indexOf(panel);
    const dot = carousel.querySelectorAll(".credit-card-dot")[index];

    addEntry(
      heading.textContent,
      panel.textContent,
      carousel,
      () => dot?.click()
    );
  });

  // Any other current-page section marked searchable.
  document.querySelectorAll("[data-search-topic]").forEach(section => {
    const heading = section.querySelector("h2, h3, h4");

    if (!heading) return;

    addEntry(
      heading.textContent,
      section.textContent,
      section
    );
  });

  /*
   * =========================================
   * SITE-WIDE GUIDE PAGES
   * =========================================
   *
   * Add each separate HTML page here.
   * The text/keywords don't have to appear
   * word-for-word in the visible page.
   */

  addPageEntry(
    "GoWild! Availability",
    `
      GoWild availability
      flight availability
      empty seats
      when can I book
      booking window
      midnight
      day before departure
      domestic booking
      international booking
      ten days before departure
      10 days
      blackout dates
      peak days
      availability changes
      keep checking
      sold out
      flights
      pass availability
      GoWild seats
      early booking
      GWEF
    `,
    "gowild-availability.html"
  );

  addPageEntry(
    "GoWild! Pricing",
    `
      GoWild pricing
      ticket price
      fares
      taxes
      fees
      international pricing
      domestic pricing
      cost
      how much
      Mexico
      Colombia
      Costa Rica
      Dominican Republic
      El Salvador
      Guatemala
      Jamaica
      Puerto Rico
      international taxes
      government taxes
      GoWild fare
      pass fare
      peak day charge
    `,
    "gowild-pricing.html"
  );

  /*
   * Add more pages below using the same format:
   *
   * addPageEntry(
   *   "Page Name",
   *   `
   *     keyword
   *     keyword
   *     phrase
   *   `,
   *   "page-name.html"
   * );
   */

  /*
   * =========================================
   * SEARCH
   * =========================================
   */

  function search() {
    const words = normalize(input.value)
      .split(/\s+/)
      .filter(Boolean);

    results.replaceChildren();

    if (!words.length) {
      results.hidden = true;
      status.textContent = "";
      return;
    }

    const matches = entries.filter(entry =>
      words.every(word => entry.searchable.includes(word))
    );

    results.hidden = matches.length === 0;

    status.textContent = matches.length
      ? `${matches.length} result${matches.length === 1 ? "" : "s"} found.`
      : "No matches yet. Try booking, availability, miles, pricing, or credit cards.";

    matches.forEach(entry => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const title = document.createElement("strong");
      const preview = document.createElement("span");

      title.textContent = entry.title;

      preview.textContent =
        entry.text.length > 160
          ? `${entry.text.slice(0, 160)}…`
          : entry.text;

      /*
       * SITE-WIDE PAGE RESULT
       */
      if (entry.type === "page") {
        link.href = entry.url;

        link.append(title, preview);
        item.append(link);
        results.append(item);

        return;
      }

      /*
       * CURRENT PAGE RESULT
       */
      link.href = `#${entry.target.id}`;

      link.append(title, preview);
      item.append(link);
      results.append(item);

      link.addEventListener("click", event => {
        event.preventDefault();

        entry.open?.();

        entry.target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "instant"
            : "smooth",
          block: "center"
        });

        if (
          !entry.target.matches(
            "button, a, input, select, textarea"
          )
        ) {
          entry.target.setAttribute("tabindex", "-1");
        }

        entry.target.focus({
          preventScroll: true
        });
      });
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    search();
  });

  input.addEventListener("input", search);
})();
