(() => {
  const form = document.getElementById("guideSearchForm");
  const input = document.getElementById("guideSearchInput");
  const results = document.getElementById("guideSearchResults");
  const status = document.getElementById("guideSearchStatus");

  if (!form || !input || !results || !status) return;

  const entries = [];
  let siteIndexReady = false;
  let siteIndexBuilding = false;

  const normalize = text =>
    String(text || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();

  const cleanText = text =>
    String(text || "")
      .replace(/\s+/g, " ")
      .trim();

  /*
   * =====================================================
   * ENTRY HELPERS
   * =====================================================
   */

  function addLocalEntry(title, text, target, open) {
    if (!target) return;

    if (!target.id) {
      target.id = `guide-search-target-${entries.length}`;
    }

    const cleanedTitle = cleanText(title);
    const cleanedText = cleanText(text);

    if (!cleanedTitle) return;

    entries.push({
      type: "local",
      title: cleanedTitle,
      text: cleanedText,
      searchable: normalize(`${cleanedTitle} ${cleanedText}`),
      target,
      open
    });
  }

  function addRemoteEntry(title, text, url, pageTitle = "") {
    const cleanedTitle = cleanText(title);
    const cleanedText = cleanText(text);

    if (!cleanedTitle || !url) return;

    entries.push({
      type: "remote",
      title: cleanedTitle,
      pageTitle: cleanText(pageTitle),
      text: cleanedText,
      searchable: normalize(
        `${cleanedTitle} ${pageTitle} ${cleanedText}`
      ),
      url
    });
  }

  /*
   * =====================================================
   * CURRENT PAGE — SPECIAL INTERACTIVE RESULTS
   * =====================================================
   */

  function indexCurrentPageInteractiveContent() {

    /*
     * FAQ questions + answers
     */
    document
      .querySelectorAll("#faq .gw-faq-copy")
      .forEach(copy => {
        const heading = copy.querySelector("h4");
        const card = copy.closest(".gw-faq-card");
        const trigger = card?.querySelector(".gw-faq-trigger");

        if (!heading) return;

        addLocalEntry(
          heading.textContent,
          copy.textContent,
          heading,
          () => {
            if (
              trigger?.getAttribute("aria-expanded") === "false"
            ) {
              trigger.click();
            }
          }
        );
      });


    /*
     * Helpful tools
     */
    document
      .querySelectorAll("[data-open-tool]")
      .forEach(button => {
        const title =
          button.querySelector(".simple-tool-title");

        if (!title) return;

        addLocalEntry(
          title.textContent,
          button.textContent,
          button,
          () => button.click()
        );
      });


    /*
     * Credit cards
     */
    document
      .querySelectorAll(".credit-card-panel")
      .forEach(panel => {
        const heading = panel.querySelector("h3");
        const carousel =
          panel.closest(".credit-card-carousel");

        if (!heading || !carousel) return;

        const panels = [
          ...carousel.querySelectorAll(".credit-card-panel")
        ];

        const panelIndex =
          panels.indexOf(panel);

        const dot =
          carousel.querySelectorAll(".credit-card-dot")[
            panelIndex
          ];

        addLocalEntry(
          heading.textContent,
          panel.textContent,
          carousel,
          () => dot?.click()
        );
      });


    /*
     * Any manually searchable homepage section
     */
    document
      .querySelectorAll("[data-search-topic]")
      .forEach(section => {
        const heading =
          section.querySelector("h2, h3, h4");

        if (!heading) return;

        addLocalEntry(
          heading.textContent,
          section.textContent,
          section
        );
      });
  }

  /*
   * =====================================================
   * FIND SITE PAGES AUTOMATICALLY
   * =====================================================
   */

  function discoverSitePages() {
    const urls = new Set();

    /*
     * Always include homepage.
     */
    urls.add(
      new URL("index.html", window.location.href).href
    );

    /*
     * Discover same-site HTML pages from links.
     */
    document
      .querySelectorAll("a[href]")
      .forEach(link => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("javascript:")
        ) {
          return;
        }

        let url;

        try {
          url =
            new URL(
              href,
              window.location.href
            );
        } catch {
          return;
        }

        /*
         * Only index your own site.
         */
        if (
          url.origin !==
          window.location.origin
        ) {
          return;
        }

        /*
         * Ignore query strings and fragments.
         */
        url.hash = "";
        url.search = "";

        const path =
          url.pathname.toLowerCase();

        /*
         * Accept homepage, folders, and HTML pages.
         */
        if (
          path.endsWith("/") ||
          path.endsWith(".html") ||
          !path.split("/").pop()?.includes(".")
        ) {
          urls.add(url.href);
        }
      });

    return [...urls];
  }

  /*
   * =====================================================
   * INDEX ONE REMOTE PAGE
   * =====================================================
   */

  async function indexPage(pageUrl) {
    let response;

    try {
      response =
        await fetch(
          pageUrl,
          {
            cache: "no-cache"
          }
        );
    } catch (error) {
      console.info(
        `Search could not load ${pageUrl}`,
        error
      );

      return;
    }

    if (!response.ok) {
      console.info(
        `Search skipped ${pageUrl}: ${response.status}`
      );

      return;
    }

    const html =
      await response.text();

    const parser =
      new DOMParser();

    const doc =
      parser.parseFromString(
        html,
        "text/html"
      );

    /*
     * Remove things that should not become search text.
     */
    doc
      .querySelectorAll(
        [
          "script",
          "style",
          "noscript",
          "svg",
          "header",
          "footer",
          ".site-header",
          ".site-footer",
          ".nav-links",
          ".mobile-menu-button"
        ].join(",")
      )
      .forEach(element => element.remove());


    const pageHeading =
      doc.querySelector("h1");

    const pageTitle =
      cleanText(
        pageHeading?.textContent ||
        doc.title ||
        "Guide"
      );


    /*
     * Index meaningful headings individually.
     */
    const headings = [
      ...doc.querySelectorAll(
        "main h2, main h3, main h4, section h2, section h3, section h4"
      )
    ];


    headings.forEach(heading => {
      const title =
        cleanText(
          heading.textContent
        );

      if (!title) return;

      /*
       * Prefer the surrounding content block.
       */
      const container =
        heading.closest(
          [
            "[data-search-topic]",
            ".gw-faq-copy",
            ".content-card",
            ".guide-card",
            "article",
            "section"
          ].join(",")
        ) ||
        heading.parentElement;

      const text =
        cleanText(
          container?.textContent ||
          heading.textContent
        );

      /*
       * Use an existing ID when possible.
       */
      const target =
        heading.id
          ? heading
          : heading.closest("[id]");

      const hash =
        target?.id
          ? `#${encodeURIComponent(target.id)}`
          : "";

      const url =
        `${pageUrl}${hash}`;

      addRemoteEntry(
        title,
        text,
        url,
        pageTitle
      );
    });


    /*
     * If the page has no useful subheadings,
     * index the page itself.
     */
    if (!headings.length) {
      const main =
        doc.querySelector("main") ||
        doc.body;

      addRemoteEntry(
        pageTitle,
        main?.textContent || "",
        pageUrl,
        pageTitle
      );
    }
  }

  /*
   * =====================================================
   * BUILD SITE-WIDE INDEX
   * =====================================================
   */

  async function buildSiteIndex() {
    if (
      siteIndexReady ||
      siteIndexBuilding
    ) {
      return;
    }

    siteIndexBuilding = true;

    const pages =
      discoverSitePages();

    await Promise.all(
      pages.map(indexPage)
    );

    siteIndexReady = true;
    siteIndexBuilding = false;

    /*
     * If the user already typed something while
     * the index was loading, rerun the search.
     */
    if (input.value.trim()) {
      search();
    }
  }

  /*
   * =====================================================
   * RANK RESULTS
   * =====================================================
   */

  function scoreEntry(entry, words) {
    const normalizedTitle =
      normalize(entry.title);

    let score = 0;

    words.forEach(word => {
      /*
       * Heading matches are much more useful.
       */
      if (
        normalizedTitle === word
      ) {
        score += 100;
      } else if (
        normalizedTitle.startsWith(word)
      ) {
        score += 40;
      } else if (
        normalizedTitle.includes(word)
      ) {
        score += 25;
      }

      if (
        entry.searchable.includes(word)
      ) {
        score += 5;
      }
    });

    /*
     * Favor interactive homepage answers slightly.
     */
    if (
      entry.type === "local"
    ) {
      score += 2;
    }

    return score;
  }

  /*
   * =====================================================
   * REMOVE DUPLICATE RESULTS
   * =====================================================
   */

  function uniqueMatches(matches) {
    const seen =
      new Set();

    return matches.filter(entry => {
      const key =
        entry.type === "remote"
          ? `${entry.url}|${normalize(entry.title)}`
          : `local|${entry.target.id}|${normalize(entry.title)}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  /*
   * =====================================================
   * SEARCH
   * =====================================================
   */

  function search() {
    const words =
      normalize(input.value)
        .split(/\s+/)
        .filter(Boolean);

    results.replaceChildren();

    if (!words.length) {
      results.hidden = true;
      status.textContent = "";
      return;
    }

    let matches =
      entries
        .filter(entry =>
          words.every(word =>
            entry.searchable.includes(word)
          )
        )
        .map(entry => ({
          ...entry,
          score:
            scoreEntry(
              entry,
              words
            )
        }))
        .sort(
          (a, b) =>
            b.score - a.score
        );

    matches =
      uniqueMatches(matches)
        .slice(0, 12);

    results.hidden =
      matches.length === 0;

    if (!siteIndexReady) {
      status.textContent =
        matches.length
          ? `${matches.length} result${matches.length === 1 ? "" : "s"} found. Searching the rest of the guide…`
          : "Searching the rest of the guide…";
    } else {
      status.textContent =
        matches.length
          ? `${matches.length} result${matches.length === 1 ? "" : "s"} found.`
          : "No matches yet. Try a different word or phrase.";
    }

    matches.forEach(entry => {
      const item =
        document.createElement("li");

      const link =
        document.createElement("a");

      const title =
        document.createElement("strong");

      const preview =
        document.createElement("span");

      title.textContent =
        entry.title;

      let previewText =
        entry.text;

      /*
       * Remove the heading from the beginning of
       * its own preview when possible.
       */
      if (
        normalize(previewText)
          .startsWith(
            normalize(entry.title)
          )
      ) {
        previewText =
          previewText
            .slice(
              entry.title.length
            )
            .trim();
      }

      if (entry.pageTitle) {
        previewText =
          `${entry.pageTitle} · ${previewText}`;
      }

      preview.textContent =
        previewText.length > 150
          ? `${previewText.slice(0, 150)}…`
          : previewText;

      /*
       * REMOTE PAGE RESULT
       */
      if (
        entry.type === "remote"
      ) {
        link.href =
          entry.url;

        link.append(
          title,
          preview
        );

        item.append(link);
        results.append(item);

        return;
      }

      /*
       * CURRENT PAGE INTERACTIVE RESULT
       */
      link.href =
        `#${entry.target.id}`;

      link.append(
        title,
        preview
      );

      item.append(link);
      results.append(item);

      link.addEventListener(
        "click",
        event => {
          event.preventDefault();

          entry.open?.();

          entry.target.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
            block: "center"
          });

          if (
            !entry.target.matches(
              "button, a, input, select, textarea"
            )
          ) {
            entry.target.setAttribute(
              "tabindex",
              "-1"
            );
          }

          entry.target.focus({
            preventScroll: true
          });
        }
      );
    });
  }

  /*
   * =====================================================
   * EVENTS
   * =====================================================
   */

  form.addEventListener(
    "submit",
    event => {
      event.preventDefault();
      search();
    }
  );

  input.addEventListener(
    "input",
    search
  );

  /*
   * Build local entries immediately.
   */
  indexCurrentPageInteractiveContent();

  /*
   * Then quietly index linked pages.
   */
  buildSiteIndex();
})();
