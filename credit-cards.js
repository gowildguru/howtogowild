/* =========================================
   HOWTOGOWILD
   CREDIT CARD CAROUSEL
   ========================================= */

(() => {
  "use strict";

  const carousel = document.querySelector(".credit-card-carousel");

  // Exit quietly if the carousel is not on this page yet.
  if (!carousel) return;

  const slides = Array.from(
    carousel.querySelectorAll(".credit-card-panel")
  );

  const dots = Array.from(
    carousel.querySelectorAll(".credit-card-dot")
  );

  const previousButton = carousel.querySelector(
    ".credit-card-arrow-prev"
  );

  const nextButton = carousel.querySelector(
    ".credit-card-arrow-next"
  );

  if (!slides.length) return;


  /* =========================================
     SETTINGS
     ========================================= */

  const AUTOPLAY_DELAY = 6000;
  const SWIPE_THRESHOLD = 45;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


  /* =========================================
     STATE
     ========================================= */

  let currentIndex = 0;
  let autoplayTimer = null;

  let pointerStartX = null;
  let pointerStartY = null;

  let isHovered = false;
  let hasFocus = false;


  /* =========================================
     SHOW SLIDE
     ========================================= */

  function showSlide(index) {
    if (!slides.length) return;

    currentIndex =
      (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === currentIndex;

      slide.classList.toggle("is-active", active);

      slide.setAttribute(
        "aria-hidden",
        active ? "false" : "true"
      );

      /*
        Prevent keyboard users from tabbing into links
        inside hidden slides.
      */
      const interactiveElements = slide.querySelectorAll(
        "a, button, input, select, textarea, [tabindex]"
      );

      interactiveElements.forEach((element) => {
        if (active) {
          if (element.dataset.carouselTabindex !== undefined) {
            const originalTabIndex =
              element.dataset.carouselTabindex;

            if (originalTabIndex === "") {
              element.removeAttribute("tabindex");
            } else {
              element.setAttribute(
                "tabindex",
                originalTabIndex
              );
            }

            delete element.dataset.carouselTabindex;
          }
        } else {
          if (
            element.dataset.carouselTabindex === undefined
          ) {
            element.dataset.carouselTabindex =
              element.getAttribute("tabindex") || "";
          }

          element.setAttribute("tabindex", "-1");
        }
      });
    });


    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentIndex;

      dot.classList.toggle("is-active", active);

      dot.setAttribute(
        "aria-current",
        active ? "true" : "false"
      );
    });
  }


  /* =========================================
     NAVIGATION
     ========================================= */

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function previousSlide() {
    showSlide(currentIndex - 1);
  }


  /* =========================================
     AUTOPLAY
     ========================================= */

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    /*
      Do not automatically animate for people who
      have Reduce Motion enabled.
    */
    if (prefersReducedMotion.matches) return;

    /*
      Pause while the user is actively interacting.
    */
    if (isHovered || hasFocus) return;

    autoplayTimer = window.setInterval(
      nextSlide,
      AUTOPLAY_DELAY
    );
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }


  /* =========================================
     ARROWS
     ========================================= */

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      previousSlide();
      restartAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });
  }


  /* =========================================
     DOTS
     ========================================= */

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartAutoplay();
    });
  });


  /* =========================================
     PAUSE ON HOVER
     ========================================= */

  carousel.addEventListener("mouseenter", () => {
    isHovered = true;
    stopAutoplay();
  });

  carousel.addEventListener("mouseleave", () => {
    isHovered = false;
    startAutoplay();
  });


  /* =========================================
     PAUSE WHILE KEYBOARD FOCUS IS INSIDE
     ========================================= */

  carousel.addEventListener("focusin", () => {
    hasFocus = true;
    stopAutoplay();
  });

  carousel.addEventListener("focusout", (event) => {
    /*
      Only resume if focus actually left
      the entire carousel.
    */
    if (
      event.relatedTarget &&
      carousel.contains(event.relatedTarget)
    ) {
      return;
    }

    hasFocus = false;
    startAutoplay();
  });


  /* =========================================
     KEYBOARD ARROWS
     ========================================= */

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      previousSlide();
      restartAutoplay();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      nextSlide();
      restartAutoplay();
    }
  });


  /* =========================================
     MOBILE SWIPE
     ========================================= */

  carousel.addEventListener(
    "pointerdown",
    (event) => {
      /*
        Only track primary mouse/touch/pen input.
      */
      if (!event.isPrimary) return;

      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    }
  );

  carousel.addEventListener(
    "pointerup",
    (event) => {
      if (
        pointerStartX === null ||
        pointerStartY === null
      ) {
        return;
      }

      const distanceX =
        event.clientX - pointerStartX;

      const distanceY =
        event.clientY - pointerStartY;

      pointerStartX = null;
      pointerStartY = null;

      /*
        Ignore mostly-vertical gestures so normal
        page scrolling still feels natural.
      */
      if (
        Math.abs(distanceY) >
        Math.abs(distanceX)
      ) {
        return;
      }

      if (
        Math.abs(distanceX) <
        SWIPE_THRESHOLD
      ) {
        return;
      }

      if (distanceX < 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      restartAutoplay();
    }
  );

  carousel.addEventListener(
    "pointercancel",
    () => {
      pointerStartX = null;
      pointerStartY = null;
    }
  );


  /* =========================================
     PAGE VISIBILITY
     ========================================= */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    }
  );


  /* =========================================
     REDUCE MOTION CHANGES
     ========================================= */

  const handleMotionPreferenceChange = () => {
    if (prefersReducedMotion.matches) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  if (
    typeof prefersReducedMotion.addEventListener ===
    "function"
  ) {
    prefersReducedMotion.addEventListener(
      "change",
      handleMotionPreferenceChange
    );
  } else if (
    typeof prefersReducedMotion.addListener ===
    "function"
  ) {
    /*
      Older Safari fallback.
    */
    prefersReducedMotion.addListener(
      handleMotionPreferenceChange
    );
  }


  /* =========================================
     INITIALIZE
     ========================================= */

  showSlide(0);
  startAutoplay();

})();
