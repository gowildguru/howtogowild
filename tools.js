/* =========================================
   HELPFUL TOOLS MODAL
   ========================================= */

const toolModal = document.getElementById("toolModal");
const toolModalTitle = document.getElementById("toolModalTitle");
const toolModalContent = document.getElementById("toolModalContent");

const toolButtons = document.querySelectorAll("[data-open-tool]");
const toolCloseButtons = document.querySelectorAll("[data-close-tool]");


/* -----------------------------------------
   TOOL TITLES
   ----------------------------------------- */

const toolTitles = {
  "elite-status": "Elite Status Calculator",
  "award-booking": "Award Booking Calculator",
  "booking-timeline": "Booking Timeline Tool",
  "connection-finder": "Connection Finder",
  "card-analyzer": "Frontier Card Analyzer"
};


/* -----------------------------------------
   OPEN MODAL
   ----------------------------------------- */

function openToolModal(toolName) {

  if (!toolModal) {
    return;
  }

  toolModalTitle.textContent =
    toolTitles[toolName] || "Helpful Tool";

  /*
    Temporary content.

    We'll replace this with the real widget
    content as we connect each tool.
  */

  toolModalContent.innerHTML = `
    <div class="tool-loading-message">
      Loading tool...
    </div>
  `;

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


/* -----------------------------------------
   CLOSE MODAL
   ----------------------------------------- */

function closeToolModal() {

  if (!toolModal) {
    return;
  }

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


/* -----------------------------------------
   TOOL BUTTONS
   ----------------------------------------- */

toolButtons.forEach(button => {

  button.addEventListener(
    "click",
    function() {

      const toolName =
        this.dataset.openTool;

      openToolModal(toolName);

    }
  );

});


/* -----------------------------------------
   CLOSE BUTTON + BACKDROP
   ----------------------------------------- */

toolCloseButtons.forEach(button => {

  button.addEventListener(
    "click",
    closeToolModal
  );

});


/* -----------------------------------------
   ESC KEY
   ----------------------------------------- */

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
