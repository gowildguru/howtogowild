/* =========================================
   HELPFUL TOOLS
   ========================================= */

const toolModal = document.getElementById("toolModal");
const toolModalTitle = document.getElementById("toolModalTitle");
const toolModalContent = document.getElementById("toolModalContent");

const toolButtons =
  document.querySelectorAll("[data-open-tool]");

const toolCloseButtons =
  document.querySelectorAll("[data-close-tool]");


const toolTitles = {
  "elite-status": "Elite Status Calculator",
  "award-booking": "Award Booking Calculator",
  "booking-timeline": "Booking Timeline Tool",
  "connection-finder": "Connection Finder",
  "card-analyzer": "Frontier Card Analyzer"
};


/* =========================================
   OPEN TOOL
   ========================================= */

function openToolModal(toolName) {

  if (!toolModal) return;

  toolModalTitle.textContent =
    toolTitles[toolName] || "Helpful Tool";

  toolModalContent.innerHTML = "";

  /*
    FRONTIER CARD ANALYZER
  */

  if (toolName === "card-analyzer") {

    const template =
      document.getElementById(
        "cardAnalyzerTemplate"
      );

    if (template) {

      toolModalContent.appendChild(
        template.content.cloneNode(true)
      );

      initializeCardAnalyzer();

    }

  }

  /*
    TOOLS WE HAVEN'T MOVED YET
  */

  else {

    toolModalContent.innerHTML = `
      <div class="tool-loading-message">
        This tool is coming next.
      </div>
    `;

  }


  toolModal.dataset.activeTool = toolName;

  toolModal.classList.add("is-open");

  toolModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "tool-modal-open"
  );

}


/* =========================================
   CLOSE TOOL
   ========================================= */

function closeToolModal() {

  if (!toolModal) return;

  toolModal.classList.remove("is-open");

  toolModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "tool-modal-open"
  );

  delete toolModal.dataset.activeTool;

}


/* =========================================
   BUTTON EVENTS
   ========================================= */

toolButtons.forEach(button => {

  button.addEventListener(
    "click",
    function() {

      openToolModal(
        this.dataset.openTool
      );

    }
  );

});


toolCloseButtons.forEach(button => {

  button.addEventListener(
    "click",
    closeToolModal
  );

});


document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape" &&
      toolModal &&
      toolModal.classList.contains("is-open")
    ) {

      closeToolModal();

    }

  }
);


/* =========================================
   FRONTIER CARD ANALYZER
   ========================================= */

function initializeCardAnalyzer() {

  const analyzer =
    toolModalContent.querySelector(
      ".f9-card-miles-tool"
    );

  if (!analyzer) return;


  const rates = {
    frontier: 5,
    restaurant: 3,
    other: 1
  };

  const saverAwardPrice = 5000;


  const sliders = {
    frontier:
      analyzer.querySelector(
        '[data-slider="frontier"]'
      ),

    restaurant:
      analyzer.querySelector(
        '[data-slider="restaurant"]'
      ),

    other:
      analyzer.querySelector(
        '[data-slider="other"]'
      )
  };


  const inputs = {
    frontier:
      analyzer.querySelector(
        '[data-input="frontier"]'
      ),

    restaurant:
      analyzer.querySelector(
        '[data-input="restaurant"]'
      ),

    other:
      analyzer.querySelector(
        '[data-input="other"]'
      )
  };


  const displays = {
    frontier:
      analyzer.querySelector(
        '[data-miles-display="frontier"]'
      ),

    restaurant:
      analyzer.querySelector(
        '[data-miles-display="restaurant"]'
      ),

    other:
      analyzer.querySelector(
        '[data-miles-display="other"]'
      )
  };


  function integer(value) {

    return new Intl.NumberFormat(
      "en-US",
      {
        maximumFractionDigits: 0
      }
    ).format(
      Math.max(0, value)
    );

  }


  function money(value) {

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    ).format(
      Math.max(0, value)
    );

  }


  function spendFor(category) {

    return Math.max(
      0,
      Number(inputs[category].value) || 0
    );

  }


  function styleSlider(category) {

    const slider = sliders[category];

    const max =
      Number(slider.max) || 1;

    const value =
      Number(slider.value) || 0;

    const percent =
      Math.max(
        0,
        Math.min(
          100,
          (value / max) * 100
        )
      );

    slider.style.setProperty(
      "--pct",
      `${percent}%`
    );

  }


  function render() {

    const frontierSpend =
      spendFor("frontier");

    const restaurantSpend =
      spendFor("restaurant");

    const otherSpend =
      spendFor("other");


    const frontierMiles =
      frontierSpend * rates.frontier;

    const restaurantMiles =
      restaurantSpend * rates.restaurant;

    const otherMiles =
      otherSpend * rates.other;


    const totalMiles =
      frontierMiles +
      restaurantMiles +
      otherMiles;

    const totalSpend =
      frontierSpend +
      restaurantSpend +
      otherSpend;

    const elitePoints =
      totalSpend;


    const flights =
      Math.floor(
        totalMiles /
        saverAwardPrice
      );

    const remainder =
      totalMiles %
      saverAwardPrice;


    displays.frontier.textContent =
      `${integer(frontierMiles)} miles`;

    displays.restaurant.textContent =
      `${integer(restaurantMiles)} miles`;

    displays.other.textContent =
      `${integer(otherMiles)} miles`;


    analyzer.querySelector(
      '[data-result="totalMiles"]'
    ).textContent =
      `${integer(totalMiles)} Travel Miles`;


    analyzer.querySelector(
      '[data-result="awardFlights"]'
    ).textContent =
      flights === 1
        ? "✈️ That's 1 saver award flight every year!"
        : `✈️ That's ${integer(flights)} saver award flights every year!`;


    analyzer.querySelector(
      '[data-result="awardRemainder"]'
    ).textContent =
      remainder === 0 && totalMiles > 0
        ? "Perfectly divisible by a 5,000-mile saver award."
        : `${integer(remainder)} miles toward your next award.`;


    analyzer.querySelector(
      '[data-result="totalSpend"]'
    ).textContent =
      money(totalSpend);


    analyzer.querySelector(
      '[data-result="elitePoints"]'
    ).textContent =
      integer(elitePoints);


    Object.keys(sliders).forEach(
      styleSlider
    );

  }


  /*
    SLIDER → INPUT
  */

  Object.keys(sliders).forEach(
    category => {

      sliders[category].addEventListener(
        "input",
        function() {

          inputs[category].value =
            this.value;

          render();

        }
      );

    }
  );


  /*
    INPUT → SLIDER
  */

  Object.keys(inputs).forEach(
    category => {

      inputs[category].addEventListener(
        "input",
        function() {

          const value =
            Math.max(
              0,
              Number(this.value) || 0
            );

          const currentMax =
            Number(
              sliders[category].max
            );


          if (value > currentMax) {

            sliders[category].max =
              Math.ceil(
                value / 1000
              ) * 1000;

          }


          sliders[category].value =
            value;

          render();

        }
      );

    }
  );


  render();

}
