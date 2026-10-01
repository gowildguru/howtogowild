/* =========================================
   HELPFUL TOOLS MODAL CONTROLLER
   ========================================= */

const toolModal = document.getElementById("toolModal");
const toolModalTitle = document.getElementById("toolModalTitle");
const toolModalContent = document.getElementById("toolModalContent");
const toolButtons = document.querySelectorAll("[data-open-tool]");
const toolCloseButtons = document.querySelectorAll("[data-close-tool]");

const toolTitles = {
  "elite-status": "Elite Status Calculator",
  "award-booking": "Award Booking Calculator",
  "booking-timeline": "Booking Timeline Tool",
  "card-analyzer": "Frontier Card Analyzer"
};

const toolDefinitions = {
  "elite-status": { template: "eliteStatusTemplate", initialize: initializeEliteStatus },
  "award-booking": { template: "awardBookingTemplate", initialize: initializeAwardBooking },
  "booking-timeline": { template: "bookingTimelineTemplate", initialize: initializeBookingTimeline },
  "card-analyzer": { template: "cardAnalyzerTemplate", initialize: initializeCardAnalyzer }
};

let activeToolCleanup = null;
let lastFocusedToolButton = null;

function cleanupActiveTool() {
  if (typeof activeToolCleanup === "function") {
    try { activeToolCleanup(); } catch (error) { console.warn("Tool cleanup failed", error); }
  }
  activeToolCleanup = null;
}

function openToolModal(toolName, triggerButton = null) {
  if (!toolModal || !toolModalContent || !toolModalTitle) return;

  const definition = toolDefinitions[toolName];
  if (!definition) return;

  cleanupActiveTool();
  toolModalContent.replaceChildren();
  toolModalTitle.textContent = toolTitles[toolName] || "Helpful Tool";

  const template = document.getElementById(definition.template);
  if (!template) {
    toolModalContent.innerHTML = '<div class="tool-loading-message">This tool could not be loaded.</div>';
    return;
  }

  toolModalContent.appendChild(template.content.cloneNode(true));

  const root = toolModalContent.firstElementChild;
  if (root && typeof definition.initialize === "function") {
    activeToolCleanup = definition.initialize(root) || null;
  }

  lastFocusedToolButton = triggerButton || document.activeElement;
  toolModal.dataset.activeTool = toolName;
  toolModal.classList.add("is-open");
  toolModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("tool-modal-open");

  const closeButton = toolModal.querySelector(".tool-modal-close");
  if (closeButton) closeButton.focus({ preventScroll: true });
}

function closeToolModal() {
  if (!toolModal) return;

  cleanupActiveTool();
  toolModal.classList.remove("is-open");
  toolModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("tool-modal-open");
  delete toolModal.dataset.activeTool;
  toolModalContent.replaceChildren();

  if (lastFocusedToolButton && typeof lastFocusedToolButton.focus === "function") {
    lastFocusedToolButton.focus({ preventScroll: true });
  }
}

toolButtons.forEach(button => {
  button.addEventListener("click", function() {
    openToolModal(this.dataset.openTool, this);
  });
});

toolCloseButtons.forEach(button => {
  button.addEventListener("click", closeToolModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && toolModal?.classList.contains("is-open")) {
    closeToolModal();
  }
});


function initializeCardAnalyzer(root) {
  const get = id => {
    const category = id.replace(/(Slider|Input|MilesDisplay)$/, "");

    if (id.endsWith("Slider")) {
      return root.querySelector(`[data-slider="${category}"]`);
    }

    if (id.endsWith("Input")) {
      return root.querySelector(`[data-input="${category}"]`);
    }

    if (id.endsWith("MilesDisplay")) {
      return root.querySelector(`[data-miles-display="${category}"]`);
    }

    return root.querySelector(`[data-result="${id}"]`);
  };
/* =========================
   CONSTANTS
   ========================= */

const RATES = {

  frontier:5,

  restaurant:3,

  other:1

};

const SAVER_AWARD_PRICE = 5000;


/* =========================
   ELEMENTS
   ========================= */

const sliders = {

  frontier:
    get("frontierSlider"),

  restaurant:
    get("restaurantSlider"),

  other:
    get("otherSlider")

};


const inputs = {

  frontier:
    get("frontierInput"),

  restaurant:
    get("restaurantInput"),

  other:
    get("otherInput")

};


const previewDisplays = {

  frontier:
    get("frontierMilesDisplay"),

  restaurant:
    get("restaurantMilesDisplay"),

  other:
    get("otherMilesDisplay")

};


/* =========================
   FORMATTERS
   ========================= */

function integer(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits:0
    }
  ).format(
    Math.max(0,value)
  );

}


function money(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style:"currency",
      currency:"USD",
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ).format(
    Math.max(0,value)
  );

}


/* =========================
   READ VALUES
   ========================= */

function spendFor(category) {

  return Math.max(
    0,
    Number(
      inputs[category].value
    ) || 0
  );

}


/* =========================
   STYLE SLIDER
   ========================= */

function styleSlider(category) {

  const slider =
    sliders[category];


  const max =
    Number(
      slider.max
    ) || 1;


  const value =
    Number(
      slider.value
    ) || 0;


  const percent =
    Math.max(
      0,
      Math.min(
        100,
        (
          value /
          max
        ) * 100
      )
    );


  slider.style.setProperty(
    "--pct",
    `${percent}%`
  );

}


/* =========================
   CALCULATE
   ========================= */

function render() {

  const frontierSpend =
    spendFor(
      "frontier"
    );


  const restaurantSpend =
    spendFor(
      "restaurant"
    );


  const otherSpend =
    spendFor(
      "other"
    );


  const frontierMiles =
    frontierSpend *
    RATES.frontier;


  const restaurantMiles =
    restaurantSpend *
    RATES.restaurant;


  const otherMiles =
    otherSpend *
    RATES.other;


  const totalMiles =
    frontierMiles +
    restaurantMiles +
    otherMiles;


  const totalSpend =
    frontierSpend +
    restaurantSpend +
    otherSpend;


  /*
  1 Elite Status Point
  per $1 in eligible card spend
  */

  const elitePoints =
    totalSpend;


  /*
  Whole saver flights only
  */

  const flights =
    Math.floor(
      totalMiles /
      SAVER_AWARD_PRICE
    );


  const remainder =
    totalMiles %
    SAVER_AWARD_PRICE;


  /* CATEGORY PREVIEWS */

  previewDisplays.frontier.textContent =
    `${integer(frontierMiles)} miles`;


  previewDisplays.restaurant.textContent =
    `${integer(restaurantMiles)} miles`;


  previewDisplays.other.textContent =
    `${integer(otherMiles)} miles`;


  /* MAIN RESULT */

  get(
    "totalMiles"
  ).textContent =
    `${integer(totalMiles)} Travel Miles`;


  get(
    "awardFlights"
  ).textContent =
    flights === 1
      ? `✈️ That's 1 saver award flight every year!`
      : `✈️ That's ${integer(flights)} saver award flights every year!`;


  get(
    "awardRemainder"
  ).textContent =
    remainder === 0 && totalMiles > 0
      ? `Perfectly divisible by a 5,000-mile saver award.`
      : `${integer(remainder)} miles toward your next award.`;


  get(
    "totalSpend"
  ).textContent =
    money(
      totalSpend
    );


  get(
    "elitePoints"
  ).textContent =
    integer(
      elitePoints
    );


  /* SLIDER APPEARANCE */

  Object.keys(
    sliders
  ).forEach(
    styleSlider
  );

}


/* =========================
   SLIDER → INPUT
   ========================= */

Object.keys(
  sliders
).forEach(
  category => {

    sliders[category]
    .addEventListener(
      "input",
      function() {

        inputs[category].value =
          this.value;

        render();

      }
    );

  }
);


/* =========================
   INPUT → SLIDER
   ========================= */

Object.keys(
  inputs
).forEach(
  category => {

    inputs[category]
    .addEventListener(
      "input",
      function() {

        let value =
          Math.max(
            0,
            Number(
              this.value
            ) || 0
          );


        const max =
          Number(
            sliders[
              category
            ].max
          );


        /*
        If someone types more than the
        slider max, expand the slider so
        their value still works.
        */

        if(
          value >
          max
        ) {

          sliders[
            category
          ].max =
            Math.ceil(
              value /
              1000
            ) * 1000;

        }


        sliders[
          category
        ].value =
          value;


        render();

      }
    );

  }
);


/* =========================
   INITIALIZE
   ========================= */

render();
}

function initializeBookingTimeline(root) {
  const get = id => root.querySelector(`#${id}`);
/* ================= BLACKOUT DATES ================= */

const blackoutDates = new Set([
  "2026-01-01","2026-01-03","2026-01-04","2026-01-15","2026-01-16","2026-01-19",
  "2026-02-12","2026-02-13","2026-02-16",
  "2026-03-13","2026-03-14","2026-03-15","2026-03-20","2026-03-21","2026-03-22","2026-03-27","2026-03-28","2026-03-29",
  "2026-04-03","2026-04-04","2026-04-05","2026-04-06","2026-04-10","2026-04-11","2026-04-12",
  "2026-05-21","2026-05-22","2026-05-25",
  "2026-06-25","2026-06-26","2026-06-27","2026-06-28",
  "2026-07-02","2026-07-03","2026-07-04","2026-07-05","2026-07-06",
  "2026-09-03","2026-09-04","2026-09-07",
  "2026-10-08","2026-10-09","2026-10-11","2026-10-12",
  "2026-11-24","2026-11-25","2026-11-28","2026-11-29","2026-11-30",
  "2026-12-19","2026-12-20","2026-12-21","2026-12-22","2026-12-23","2026-12-24","2026-12-26","2026-12-27","2026-12-28","2026-12-29","2026-12-30","2026-12-31",

  "2027-01-01","2027-01-02","2027-01-03","2027-01-14","2027-01-15","2027-01-18",
  "2027-02-11","2027-02-12","2027-02-15",
  "2027-03-12","2027-03-13","2027-03-14","2027-03-19","2027-03-20","2027-03-21","2027-03-26","2027-03-27","2027-03-28","2027-03-29",
  "2027-04-02","2027-04-03","2027-04-04"
]);

const blackoutUnknownAfter = "2027-04-30";


/* ================= AIRPORTS ================= */

const airports = [
  {city:"Aguadilla",code:"BQN",tz:"America/Puerto_Rico",intl:false},
  {city:"Atlanta",code:"ATL",tz:"America/New_York",intl:false},
  {city:"Austin",code:"AUS",tz:"America/Chicago",intl:false},
  {city:"Baltimore",code:"BWI",tz:"America/New_York",intl:false},
  {city:"Bogotá",code:"BOG",tz:"America/Bogota",intl:true},
  {city:"Boise",code:"BOI",tz:"America/Boise",intl:false},
  {city:"Boston",code:"BOS",tz:"America/New_York",intl:false},
  {city:"Buffalo",code:"BUF",tz:"America/New_York",intl:false},
  {city:"Burbank",code:"BUR",tz:"America/Los_Angeles",intl:false},
  {city:"Cancún",code:"CUN",tz:"America/Cancun",intl:true},
  {city:"Cartagena",code:"CTG",tz:"America/Bogota",intl:true},
  {city:"Charlotte",code:"CLT",tz:"America/New_York",intl:false},
  {city:"Chicago Midway",code:"MDW",tz:"America/Chicago",intl:false},
  {city:"Chicago O'Hare",code:"ORD",tz:"America/Chicago",intl:false},
  {city:"Cincinnati",code:"CVG",tz:"America/New_York",intl:false},
  {city:"Cleveland",code:"CLE",tz:"America/New_York",intl:false},
  {city:"Columbus",code:"CMH",tz:"America/New_York",intl:false},
  {city:"Dallas / Fort Worth",code:"DFW",tz:"America/Chicago",intl:false},
  {city:"Denver",code:"DEN",tz:"America/Denver",intl:false},
  {city:"Des Moines",code:"DSM",tz:"America/Chicago",intl:false},
  {city:"Detroit",code:"DTW",tz:"America/Detroit",intl:false},
  {city:"El Paso",code:"ELP",tz:"America/Denver",intl:false},
  {city:"Fargo",code:"FAR",tz:"America/Chicago",intl:false},
  {city:"Bentonville / Fayetteville",code:"XNA",tz:"America/Chicago",intl:false},
  {city:"Fort Lauderdale",code:"FLL",tz:"America/New_York",intl:false},
  {city:"Fort Myers",code:"RSW",tz:"America/New_York",intl:false},
  {city:"Grand Rapids",code:"GRR",tz:"America/Detroit",intl:false},
  {city:"Guatemala City",code:"GUA",tz:"America/Guatemala",intl:true},
  {city:"Hartford",code:"BDL",tz:"America/New_York",intl:false},
  {city:"Houston",code:"IAH",tz:"America/Chicago",intl:false},
  {city:"Indianapolis",code:"IND",tz:"America/Indiana/Indianapolis",intl:false},
  {city:"Islip / Long Island",code:"ISP",tz:"America/New_York",intl:false},
  {city:"Jacksonville",code:"JAX",tz:"America/New_York",intl:false},
  {city:"Kansas City",code:"MCI",tz:"America/Chicago",intl:false},
  {city:"Las Vegas",code:"LAS",tz:"America/Los_Angeles",intl:false},
  {city:"Los Angeles",code:"LAX",tz:"America/Los_Angeles",intl:false},
  {city:"Madison",code:"MSN",tz:"America/Chicago",intl:false},
  {city:"Medellín",code:"MDE",tz:"America/Bogota",intl:true},
  {city:"Memphis",code:"MEM",tz:"America/Chicago",intl:false},
  {city:"Miami",code:"MIA",tz:"America/New_York",intl:false},
  {city:"Milwaukee",code:"MKE",tz:"America/Chicago",intl:false},
  {city:"Minneapolis / St. Paul",code:"MSP",tz:"America/Chicago",intl:false},
  {city:"Montego Bay",code:"MBJ",tz:"America/Jamaica",intl:true},
  {city:"Myrtle Beach",code:"MYR",tz:"America/New_York",intl:false},
  {city:"Nashville",code:"BNA",tz:"America/Chicago",intl:false},
  {city:"New Orleans",code:"MSY",tz:"America/Chicago",intl:false},
  {city:"New York JFK",code:"JFK",tz:"America/New_York",intl:false},
  {city:"New York LaGuardia",code:"LGA",tz:"America/New_York",intl:false},
  {city:"Newark",code:"EWR",tz:"America/New_York",intl:false},
  {city:"Norfolk",code:"ORF",tz:"America/New_York",intl:false},
  {city:"Oakland / East Bay",code:"OAK",tz:"America/Los_Angeles",intl:false},
  {city:"Oklahoma City",code:"OKC",tz:"America/Chicago",intl:false},
  {city:"Omaha",code:"OMA",tz:"America/Chicago",intl:false},
  {city:"Ontario",code:"ONT",tz:"America/Los_Angeles",intl:false},
  {city:"Orlando",code:"MCO",tz:"America/New_York",intl:false},
  {city:"Pensacola",code:"PNS",tz:"America/Chicago",intl:false},
  {city:"Philadelphia",code:"PHL",tz:"America/New_York",intl:false},
  {city:"Phoenix",code:"PHX",tz:"America/Phoenix",intl:false},
  {city:"Pittsburgh",code:"PIT",tz:"America/New_York",intl:false},
  {city:"Ponce",code:"PSE",tz:"America/Puerto_Rico",intl:false},
  {city:"Portland",code:"PDX",tz:"America/Los_Angeles",intl:false},
  {city:"Punta Cana",code:"PUJ",tz:"America/Santo_Domingo",intl:true},
  {city:"Raleigh / Durham",code:"RDU",tz:"America/New_York",intl:false},
  {city:"Reno",code:"RNO",tz:"America/Los_Angeles",intl:false},
  {city:"Richmond",code:"RIC",tz:"America/New_York",intl:false},
  {city:"Sacramento",code:"SMF",tz:"America/Los_Angeles",intl:false},
  {city:"Salt Lake City",code:"SLC",tz:"America/Denver",intl:false},
  {city:"San Antonio",code:"SAT",tz:"America/Chicago",intl:false},
  {city:"San Diego",code:"SAN",tz:"America/Los_Angeles",intl:false},
  {city:"San Francisco",code:"SFO",tz:"America/Los_Angeles",intl:false},
  {city:"San Jose, CA",code:"SJC",tz:"America/Los_Angeles",intl:false},
  {city:"San José, Costa Rica",code:"SJO",tz:"America/Costa_Rica",intl:true},
  {city:"San Juan",code:"SJU",tz:"America/Puerto_Rico",intl:false},
  {city:"San Pedro Sula",code:"SAP",tz:"America/Tegucigalpa",intl:true},
  {city:"San Salvador",code:"SAL",tz:"America/El_Salvador",intl:true},
  {city:"Santa Ana / Orange County",code:"SNA",tz:"America/Los_Angeles",intl:false},
  {city:"Santiago, Dominican Republic",code:"STI",tz:"America/Santo_Domingo",intl:true},
  {city:"Santo Domingo",code:"SDQ",tz:"America/Santo_Domingo",intl:true},
  {city:"Seattle / Tacoma",code:"SEA",tz:"America/Los_Angeles",intl:false},
  {city:"Sioux Falls",code:"FSD",tz:"America/Chicago",intl:false},
  {city:"St. Louis",code:"STL",tz:"America/Chicago",intl:false},
  {city:"Syracuse",code:"SYR",tz:"America/New_York",intl:false},
  {city:"Tampa",code:"TPA",tz:"America/New_York",intl:false},
  {city:"Trenton",code:"TTN",tz:"America/New_York",intl:false},
  {city:"Washington Dulles",code:"IAD",tz:"America/New_York",intl:false},
  {city:"Washington Reagan",code:"DCA",tz:"America/New_York",intl:false},
  {city:"West Palm Beach",code:"PBI",tz:"America/New_York",intl:false}
];

airports.sort((a,b)=>a.city.localeCompare(b.city));


/* ================= ELEMENTS ================= */

const formView = get("formView");
const resultView = get("resultView");
const originSelect = get("origin");
const connectionSelect = get("connection");
const destinationSelect = get("destination");
const nonstopCheck = get("nonstopCheck");
const nextDayCheck = get("nextDayCheck");
const connectionField = get("connectionField");
const errorMessage = get("errorMessage");
const blackoutMessage = get("blackoutMessage");
const unpublishedMessage = get("unpublishedMessage");
const statusMessage = get("statusMessage");
const countdownWrap = get("countdownWrap");
const countdownDisplay = get("countdownDisplay");
const segmentResults = get("segmentResults");
const detailsButton = get("detailsButton");

let countdownTimer = null;


/* ================= DROPDOWNS ================= */

function populate(select) {
  select.innerHTML = `<option value="">Select airport</option>`;

  airports.forEach((airport,index)=>{
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${airport.city} (${airport.code})`;
    select.appendChild(option);
  });
}

populate(originSelect);
populate(connectionSelect);
populate(destinationSelect);


/* ================= NONSTOP ================= */

function updateNonstop() {
  const nonstop = nonstopCheck.checked;
  connectionField.style.display = nonstop ? "none" : "block";

  if(nonstop) nextDayCheck.checked = false;
}

nonstopCheck.addEventListener("change",updateNonstop);


/* ================= HELPERS ================= */

function parseDate(value) {
  const [y,m,d] = value.split("-").map(Number);
  return {y,m,d};
}

function shiftCalendarDays(date,days) {
  const temp = new Date(Date.UTC(date.y,date.m-1,date.d));
  temp.setUTCDate(temp.getUTCDate()+days);

  return {
    y:temp.getUTCFullYear(),
    m:temp.getUTCMonth()+1,
    d:temp.getUTCDate()
  };
}

function dateToString(date) {
  return `${date.y}-${String(date.m).padStart(2,"0")}-${String(date.d).padStart(2,"0")}`;
}

function zonedMidnight(date,timeZone) {
  const desired = Date.UTC(date.y,date.m-1,date.d,0,0,0);
  let guess = desired;

  for(let i=0;i<4;i++) {
    const parts = new Intl.DateTimeFormat("en-US",{
      timeZone,
      year:"numeric",
      month:"2-digit",
      day:"2-digit",
      hour:"2-digit",
      minute:"2-digit",
      hourCycle:"h23"
    }).formatToParts(new Date(guess));

    const get = type =>
      Number(parts.find(p=>p.type===type).value);

    const represented = Date.UTC(
      get("year"),
      get("month")-1,
      get("day"),
      get("hour"),
      get("minute"),
      0
    );

    guess += desired-represented;
  }

  return new Date(guess);
}

function formatTime(date,timeZone) {
  return new Intl.DateTimeFormat("en-US",{
    timeZone,
    weekday:"short",
    month:"short",
    day:"numeric",
    hour:"numeric",
    minute:"2-digit",
    timeZoneName:"short"
  }).format(date);
}


/* ================= COUNTDOWN ================= */

function stopCountdown() {
  if(countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function setWindowOpenMessage() {
  statusMessage.className = "status-message status-open";

  statusMessage.innerHTML =
    `<strong>✓ Standard booking window is open</strong><br>
     This itinerary is within the normal GoWild! booking period.`;
}

function startCountdown(targetTime) {
  stopCountdown();

  function updateCountdown() {

    const diff = targetTime.getTime() - Date.now();

    if(diff <= 0) {
      countdownWrap.style.display = "none";
      setWindowOpenMessage();
      stopCountdown();
      return;
    }

    const totalSeconds = Math.floor(diff/1000);

    const days = Math.floor(totalSeconds/86400);
    const hours = Math.floor((totalSeconds%86400)/3600);
    const minutes = Math.floor((totalSeconds%3600)/60);
    const seconds = totalSeconds%60;

    countdownDisplay.textContent =
      `${days}d ${String(hours).padStart(2,"0")}h ` +
      `${String(minutes).padStart(2,"0")}m ${String(seconds).padStart(2,"0")}s`;
  }

  countdownWrap.style.display = "block";

  updateCountdown();

  countdownTimer = setInterval(updateCountdown,1000);
}


/* ================= DETAILS ================= */

detailsButton.addEventListener("click",()=>{

  const open =
    segmentResults.style.display === "block";

  segmentResults.style.display =
    open ? "none" : "block";

  detailsButton.textContent =
    open ? "Show details" : "Hide details";
});


/* ================= CALCULATE ================= */

get("calculateButton")
.addEventListener("click",()=>{

  stopCountdown();

  countdownWrap.style.display = "none";
  segmentResults.style.display = "none";
  detailsButton.textContent = "Show details";

  errorMessage.style.display = "none";

  const nonstop = nonstopCheck.checked;

  if(
    originSelect.value === "" ||
    destinationSelect.value === "" ||
    (!nonstop && connectionSelect.value === "")
  ){
    errorMessage.textContent = "Please select all airports.";
    errorMessage.style.display = "block";
    return;
  }

  const firstDateValue =
    get("firstDate").value;

  if(!firstDateValue){
    errorMessage.textContent = "Please select your first flight date.";
    errorMessage.style.display = "block";
    return;
  }

  const origin =
    airports[originSelect.value];

  const destination =
    airports[destinationSelect.value];

  const connection =
    nonstop ? null : airports[connectionSelect.value];

  const international =
    origin.intl ||
    destination.intl ||
    (!nonstop && connection.intl);

  const bookingDays =
    international ? 10 : 1;

  const firstDeparture =
    parseDate(firstDateValue);

  const firstOpenDate =
    shiftCalendarDays(firstDeparture,-bookingDays);

  const firstOpen =
    zonedMidnight(firstOpenDate,origin.tz);

  let finalOpen = firstOpen;
  let secondOpen = null;
  let secondDeparture = null;

  if(!nonstop){

    secondDeparture = {...firstDeparture};

    if(nextDayCheck.checked){
      secondDeparture =
        shiftCalendarDays(firstDeparture,1);
    }

    const secondOpenDate =
      shiftCalendarDays(secondDeparture,-bookingDays);

    secondOpen =
      zonedMidnight(secondOpenDate,connection.tz);

    if(secondOpen.getTime() > finalOpen.getTime()){
      finalOpen = secondOpen;
    }
  }

  const userTZ =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  get("routeSummary").textContent =
    nonstop
      ? `${origin.code} → ${destination.code}`
      : `${origin.code} → ${connection.code} → ${destination.code}`;

  get("mainResult").textContent =
    formatTime(finalOpen,userTZ);

  get("windowType").textContent =
    international
      ? "International • 10-day window"
      : "Domestic • 1-day window";

  statusMessage.className =
    "status-message";

  if(Date.now() < finalOpen.getTime()){

    statusMessage.classList.add("status-early");

    statusMessage.innerHTML =
      `<strong>Early Booking Period</strong><br>
       Standard booking has not opened yet. An Early Booking charge may apply.`;

    startCountdown(finalOpen);

  } else {

    setWindowOpenMessage();

  }


  /* ===== BLACKOUT CHECK ===== */

  blackoutMessage.style.display = "none";
  unpublishedMessage.style.display = "none";

  const firstDateString =
    dateToString(firstDeparture);

  let hasBlackout =
    blackoutDates.has(firstDateString);

  let hasUnknownBlackout =
    firstDateString > blackoutUnknownAfter;

  if(!nonstop){

    const secondDateString =
      dateToString(secondDeparture);

    if(blackoutDates.has(secondDateString)){
      hasBlackout = true;
    }

    if(secondDateString > blackoutUnknownAfter){
      hasUnknownBlackout = true;
    }
  }

  if(hasBlackout){
    blackoutMessage.style.display = "block";
  }

  if(hasUnknownBlackout && !hasBlackout){
    unpublishedMessage.style.display = "block";
  }


  /* ===== DETAILS ===== */

  get("segment1Result").innerHTML =
    `<strong>${origin.code} segment opens:</strong> ${formatTime(firstOpen,origin.tz)}`;

  const segment2Result =
    get("segment2Result");

  if(!nonstop){

    segment2Result.innerHTML =
      `<strong>${connection.code} segment opens:</strong>
       ${formatTime(secondOpen,connection.tz)}
       ${nextDayCheck.checked ? " • next-day connection" : ""}`;

  } else {

    segment2Result.innerHTML = "";

  }


  /* ===== SWITCH VIEW ===== */

  formView.style.display = "none";
  resultView.style.display = "block";

});


/* ================= EDIT TRIP ================= */

get("editButton")
.addEventListener("click",()=>{

  stopCountdown();

  resultView.style.display = "none";
  formView.style.display = "block";

});


updateNonstop();
  return () => stopCountdown();
}

function initializeEliteStatus(root) {
  const get = id => root.querySelector(`#${id}`);
/* =========================
   PROGRAM DATA
   ========================= */

const tierOrder = [
  "member",
  "silver",
  "gold",
  "platinum",
  "diamond"
];

const tierNames = {
  member:"Member",
  silver:"Elite Silver",
  gold:"Elite Gold",
  platinum:"Elite Platinum",
  diamond:"Elite Diamond"
};


/* 2026 qualification thresholds */

const thresholds2026 = {
  member:0,
  silver:10000,
  gold:20000,
  platinum:50000,
  diamond:75000
};


/* 2027+ qualification thresholds */

const thresholds2027 = {
  member:0,
  silver:15000,
  gold:25000,
  platinum:50000,
  diamond:75000
};


/* Previous qualification thresholds */

const previousThresholds = {
  member:0,
  silver:10000,
  gold:20000,
  platinum:50000,
  diamond:75000
};


/* =========================
   CURRENT EARNING RATES
   ========================= */

const newRates = {

  regular: {

    basic:{
      member:1,
      silver:3,
      gold:5,
      platinum:7,
      diamond:11
    },

    bundle:{
      member:6,
      silver:8,
      gold:10,
      platinum:12,
      diamond:16
    }

  },

  cardmember: {

    basic:{
      member:4,
      silver:6,
      gold:8,
      platinum:10,
      diamond:14
    },

    bundle:{
      member:12,
      silver:14,
      gold:16,
      platinum:18,
      diamond:22
    }

  }

};


/* Previous earning structure */

const oldRates = {
  member:10,
  silver:12,
  gold:14,
  platinum:16,
  diamond:20
};


/* =========================
   YEAR
   ========================= */

const today = new Date();

const qualificationYear =
  today.getFullYear();

const currentThresholds =
  qualificationYear >= 2027
    ? thresholds2027
    : thresholds2026;


function daysLeftInYear() {

  const todayUTC =
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  const yearEndUTC =
    Date.UTC(
      today.getFullYear(),
      11,
      31
    );

  return (
    Math.floor(
      (yearEndUTC - todayUTC) /
      86400000
    ) + 1
  );

}

const daysRemaining =
  daysLeftInYear();


/* =========================
   ELEMENTS
   ========================= */

const setupView =
  get("setupView");

const mixerView =
  get("mixerView");

const currentStatusSelect =
  get("currentStatus");

const currentPointsInput =
  get("currentPoints");

const targetStatusSelect =
  get("targetStatus");

const cardmemberCheck =
  get("cardmemberCheck");

const cardSpendCard =
  get("cardSpendCard");


const sliders = {

  basic:
    get("basicSlider"),

  bundle:
    get("bundleSlider"),

  card:
    get("cardSlider")

};


const amountInputs = {

  basic:
    get("basicInput"),

  bundle:
    get("bundleInput"),

  card:
    get("cardInput")

};


const dollarDisplays = {

  basic:
    get("basicDollarDisplay"),

  bundle:
    get("bundleDollarDisplay"),

  card:
    get("cardDollarDisplay")

};


const modeLabels = {

  basic:
    get("basicMode"),

  bundle:
    get("bundleMode"),

  card:
    get("cardMode")

};


const maxLabels = {

  basic:
    get("basicMaxLabel"),

  bundle:
    get("bundleMaxLabel"),

  card:
    get("cardMaxLabel")

};


/* =========================
   STATE
   ========================= */

let currentPoints = 0;

let currentStatus = "member";

let targetStatus = "silver";

let targetPoints = 10000;

let cardmember = false;

let spends = {
  basic:0,
  bundle:0,
  card:0
};

let locked = {
  basic:false,
  bundle:false,
  card:false
};

let categoryMaximums = {
  basic:0,
  bundle:0,
  card:0
};


/* =========================
   FORMATTING
   ========================= */

function money(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style:"currency",
      currency:"USD",
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ).format(
    Math.max(0,value)
  );

}


function integer(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits:0
    }
  ).format(
    Math.max(0,value)
  );

}


/* =========================
   TIER HELPERS
   ========================= */

function tierIndex(tier) {
  return tierOrder.indexOf(tier);
}


function tierFromPoints(
  points,
  thresholds
) {

  let earned = "member";

  for(const tier of tierOrder) {

    if(
      points >= thresholds[tier]
    ) {
      earned = tier;
    }

  }

  return earned;
}


function effectiveTier(
  points,
  existingStatus,
  thresholds
) {

  const earned =
    tierFromPoints(
      points,
      thresholds
    );

  return (
    tierIndex(earned) >
    tierIndex(existingStatus)
  )
    ? earned
    : existingStatus;

}


/* =========================
   NEW PROGRAM SIMULATION
   ========================= */

function simulateNewProgram(plan) {

  const totalSpend =
    Math.max(0,plan.basic || 0) +
    Math.max(0,plan.bundle || 0) +
    (
      cardmember
        ? Math.max(0,plan.card || 0)
        : 0
    );


  if(totalSpend <= 0) {
    return currentPoints;
  }


  const steps = 1200;

  let points = currentPoints;


  const rateTable =
    cardmember
      ? newRates.cardmember
      : newRates.regular;


  for(
    let step=0;
    step<steps;
    step++
  ) {

    const tier =
      effectiveTier(
        points,
        currentStatus,
        currentThresholds
      );


    const basicSpend =
      Math.max(
        0,
        plan.basic || 0
      ) / steps;


    const bundleSpend =
      Math.max(
        0,
        plan.bundle || 0
      ) / steps;


    const cardSpend =
      cardmember
        ? Math.max(
            0,
            plan.card || 0
          ) / steps
        : 0;


    points +=
      basicSpend *
      rateTable.basic[tier];


    points +=
      bundleSpend *
      rateTable.bundle[tier];


    points +=
      cardSpend;

  }


  return points;

}


/* =========================
   PREVIOUS PROGRAM
   ========================= */

function simulateOldProgram(plan) {

  const totalFareSpend =
    Math.max(
      0,
      plan.basic || 0
    ) +
    Math.max(
      0,
      plan.bundle || 0
    );


  const cardSpend =
    cardmember
      ? Math.max(
          0,
          plan.card || 0
        )
      : 0;


  if(
    totalFareSpend +
    cardSpend <= 0
  ) {
    return currentPoints;
  }


  const steps = 1200;

  let points = currentPoints;


  for(
    let step=0;
    step<steps;
    step++
  ) {

    const tier =
      effectiveTier(
        points,
        currentStatus,
        previousThresholds
      );


    points +=
      (totalFareSpend / steps) *
      oldRates[tier];


    points +=
      cardSpend / steps;

  }


  return points;

}


/* =========================
   SOLO CATEGORY MAXIMUM
   ========================= */

function findSoloSpendNeeded(category) {

  if(
    category === "card" &&
    !cardmember
  ) {
    return 0;
  }


  if(currentPoints >= targetPoints) {
    return 0;
  }


  let low = 0;

  let high =
    Math.max(
      1000,
      targetPoints -
      currentPoints
    );


  function pointsAtSpend(spend) {

    const plan = {
      basic:0,
      bundle:0,
      card:0
    };

    plan[category] =
      spend;

    return simulateNewProgram(plan);
  }


  let guard = 0;

  while(
    pointsAtSpend(high) <
    targetPoints &&
    guard < 30
  ) {

    high *= 2;
    guard++;

  }


  for(
    let i=0;
    i<50;
    i++
  ) {

    const mid =
      (low + high) / 2;


    if(
      pointsAtSpend(mid) >=
      targetPoints
    ) {

      high = mid;

    } else {

      low = mid;

    }

  }


  return high;

}


/* =========================
   SET CATEGORY MAXIMUMS
   ========================= */

function updateSliderMaximums() {

  categoryMaximums.basic =
    findSoloSpendNeeded("basic");


  categoryMaximums.bundle =
    findSoloSpendNeeded("bundle");


  categoryMaximums.card =
    cardmember
      ? Math.max(
          0,
          targetPoints -
          currentPoints
        )
      : 0;


  ["basic","bundle","card"]
  .forEach(
    key => {

      const max =
        Math.max(
          0,
          categoryMaximums[key]
        );


      sliders[key].max =
        Math.max(
          1,
          Math.ceil(max)
        );


      amountInputs[key].max =
        Math.ceil(max);


      maxLabels[key].textContent =
        `Max ${money(max)}`;

    }
  );

}


/* =========================
   COLOR GRADIENT
   ========================= */

function progressColor(percent) {

  const start = {
    r:184,
    g:79,
    b:79
  };

  const end = {
    r:102,
    g:118,
    b:108
  };


  const t =
    Math.max(
      0,
      Math.min(
        1,
        percent / 100
      )
    );


  const r =
    Math.round(
      start.r +
      (end.r - start.r) * t
    );


  const g =
    Math.round(
      start.g +
      (end.g - start.g) * t
    );


  const b =
    Math.round(
      start.b +
      (end.b - start.b) * t
    );


  return `rgb(${r}, ${g}, ${b})`;

}


/* =========================
   MARGINAL RATE
   ========================= */

function marginalRate(category) {

  const basePoints =
    simulateNewProgram(
      spends
    );


  const test =
    {...spends};


  const testAmount =
    Math.min(
      10,
      Math.max(
        1,
        categoryMaximums[category] -
        spends[category]
      )
    );


  test[category] +=
    testAmount;


  const testPoints =
    simulateNewProgram(
      test
    );


  return Math.max(
    .1,
    (
      testPoints -
      basePoints
    ) /
    testAmount
  );

}


/* =========================
   AUTO BALANCE
   ========================= */

function autoBalance() {

  const categories =
    cardmember
      ? [
          "basic",
          "bundle",
          "card"
        ]
      : [
          "basic",
          "bundle"
        ];


  const unlocked =
    categories.filter(
      key => !locked[key]
    );


  if(unlocked.length === 0) {

    render();
    return;

  }


  for(
    let iteration=0;
    iteration<45;
    iteration++
  ) {

    const earned =
      simulateNewProgram(
        spends
      );


    const deficit =
      targetPoints -
      earned;


    if(
      Math.abs(deficit) < 1
    ) {
      break;
    }


    if(deficit < 0) {

      const reducible =
        unlocked.filter(
          key =>
            spends[key] > 0
        );


      if(
        reducible.length === 0
      ) {
        break;
      }


      const share =
        deficit /
        reducible.length;


      reducible.forEach(
        key => {

          const rate =
            marginalRate(key);


          const change =
            share / rate;


          spends[key] =
            Math.max(
              0,
              spends[key] +
              change
            );

        }
      );


    } else {

      const available =
        unlocked.filter(
          key =>
            spends[key] <
            categoryMaximums[key]
        );


      if(
        available.length === 0
      ) {
        break;
      }


      const share =
        deficit /
        available.length;


      available.forEach(
        key => {

          const rate =
            marginalRate(key);


          const change =
            share / rate;


          spends[key] =
            Math.min(
              categoryMaximums[key],
              Math.max(
                0,
                spends[key] +
                change
              )
            );

        }
      );

    }

  }


  render();

}


/* =========================
   PREVIOUS PROGRAM COST
   ========================= */

function calculateOldProgramCost() {

  const active =
    cardmember
      ? [
          "basic",
          "bundle",
          "card"
        ]
      : [
          "basic",
          "bundle"
        ];


  const newTotalSpend =
    active.reduce(
      (sum,key) =>
        sum + spends[key],
      0
    );


  const oldTarget =
    previousThresholds[
      targetStatus
    ];


  if(
    currentPoints >=
    oldTarget
  ) {
    return 0;
  }


  if(
    newTotalSpend <= 0
  ) {
    return null;
  }


  const ratios = {};


  active.forEach(
    key => {

      ratios[key] =
        spends[key] /
        newTotalSpend;

    }
  );


  function planAtCost(total) {

    return {

      basic:
        total *
        (ratios.basic || 0),

      bundle:
        total *
        (ratios.bundle || 0),

      card:
        total *
        (ratios.card || 0)

    };

  }


  let low = 0;


  let high =
    Math.max(
      newTotalSpend * 2,
      oldTarget -
      currentPoints,
      1000
    );


  for(
    let i=0;
    i<25;
    i++
  ) {

    if(
      simulateOldProgram(
        planAtCost(high)
      ) >= oldTarget
    ) {
      break;
    }

    high *= 2;

  }


  for(
    let i=0;
    i<50;
    i++
  ) {

    const mid =
      (low + high) / 2;


    if(
      simulateOldProgram(
        planAtCost(mid)
      ) >= oldTarget
    ) {

      high = mid;

    } else {

      low = mid;

    }

  }


  return high;

}


/* =========================
   COMPARISON
   ========================= */

function renderComparison(newCost) {

  const box =
    get(
      "oldProgramWarning"
    );


  box.style.display =
    "none";


  /*
  Only show comparison when the user has
  actually planned enough spend to hit
  the new-program target.
  */

  const newPoints =
    simulateNewProgram(
      spends
    );


  if(
    newPoints <
    targetPoints - 1
  ) {
    return;
  }


  const oldCost =
    calculateOldProgramCost();


  if(
    oldCost === null ||
    oldCost <= 0 ||
    newCost <=
      oldCost + .50
  ) {
    return;
  }


  const extra =
    newCost -
    oldCost;


  const percent =
    (
      extra /
      oldCost
    ) * 100;


  if(percent <= 0) {
    return;
  }


  get(
    "comparisonMain"
  ).textContent =
    `Elite Status will cost approximately ${percent.toFixed(1)}% more to earn under the new program rules.`;


  get(
    "comparisonSub"
  ).textContent =
    `For this spending mix, that's about ${money(extra)} more than under the previous earning structure.`;


  box.style.display =
    "block";

}


/* =========================
   SLIDER VISUAL
   ========================= */

function styleSlider(
  key,
  overallProgress
) {

  const slider =
    sliders[key];


  const max =
    Number(
      slider.max
    ) || 1;


  const value =
    Number(
      slider.value
    ) || 0;


  const sliderPercent =
    Math.max(
      0,
      Math.min(
        100,
        (value / max) * 100
      )
    );


  const color =
    progressColor(
      overallProgress
    );


  slider.style.setProperty(
    "--fill",
    color
  );


  slider.style.setProperty(
    "--pct",
    `${sliderPercent}%`
  );

}


/* =========================
   RENDER
   ========================= */

function render() {

  if(!cardmember) {
    spends.card = 0;
  }


  ["basic","bundle","card"]
  .forEach(
    key => {

      spends[key] =
        Math.max(
          0,
          Math.min(
            spends[key],
            categoryMaximums[key] || 0
          )
        );

    }
  );


  const earnedPoints =
    simulateNewProgram(
      spends
    );


  const plannedPoints =
    Math.max(
      0,
      earnedPoints -
      currentPoints
    );


  const pointsRequired =
    Math.max(
      0,
      targetPoints -
      currentPoints
    );


  const totalSpend =
    spends.basic +
    spends.bundle +
    (
      cardmember
        ? spends.card
        : 0
    );


  const progress =
    pointsRequired > 0
      ? Math.min(
          100,
          (
            plannedPoints /
            pointsRequired
          ) * 100
        )
      : 100;


  ["basic","bundle","card"]
  .forEach(
    key => {

      sliders[key].value =
        Math.min(
          Number(sliders[key].max),
          Math.round(
            spends[key]
          )
        );


      amountInputs[key].value =
        Math.round(
          spends[key]
        );


      dollarDisplays[key].textContent =
        money(
          spends[key]
        );


      modeLabels[key].textContent =
        locked[key]
          ? "LOCKED"
          : "AUTO";


      modeLabels[key]
      .classList.toggle(
        "locked",
        locked[key]
      );


      styleSlider(
        key,
        progress
      );

    }
  );


  get(
    "totalSpend"
  ).textContent =
    money(totalSpend);


  get(
    "progressNumbers"
  ).textContent =
    `${integer(plannedPoints)} / ${integer(pointsRequired)}`;


  const progressFill =
    get(
      "progressFill"
    );


  progressFill.style.width =
    `${progress}%`;


  progressFill.style.background =
    progressColor(
      progress
    );


  const difference =
    earnedPoints -
    targetPoints;


  const progressMessage =
    get(
      "progressMessage"
    );


  progressMessage.classList.remove(
    "short",
    "complete"
  );


  if(
    Math.abs(difference) < 1
  ) {

    progressMessage.textContent =
      `✓ On track for ${tierNames[targetStatus]}`;

    progressMessage.classList.add(
      "complete"
    );


  } else if(
    difference < 0
  ) {

    progressMessage.textContent =
      `${integer(Math.ceil(Math.abs(difference)))} points short`;

    progressMessage.classList.add(
      "short"
    );


  } else {

    progressMessage.textContent =
      `✓ On track for ${tierNames[targetStatus]}`;

    progressMessage.classList.add(
      "complete"
    );

  }


  const rateTier =
    effectiveTier(
      currentPoints,
      currentStatus,
      currentThresholds
    );


  const rates =
    cardmember
      ? newRates.cardmember
      : newRates.regular;


  get(
    "basicRateText"
  ).textContent =
    `Starts at ${rates.basic[rateTier]}x Elite Status Points at your current status`;


  get(
    "bundleRateText"
  ).textContent =
    `Starts at ${rates.bundle[rateTier]}x Elite Status Points at your current status`;


  renderComparison(
    totalSpend
  );

}


/* =========================
   USER CHANGES
   ========================= */

function userChanged(
  category,
  value
) {

  const max =
    categoryMaximums[
      category
    ] || 0;


  const clean =
    Math.max(
      0,
      Math.min(
        max,
        Number(value) || 0
      )
    );


  spends[category] =
    clean;


  locked[category] =
    true;


  autoBalance();

}


/* SLIDERS */

Object.keys(
  sliders
).forEach(
  key => {

    sliders[key]
    .addEventListener(
      "input",
      function() {

        userChanged(
          key,
          this.value
        );

      }
    );


    amountInputs[key]
    .addEventListener(
      "change",
      function() {

        userChanged(
          key,
          this.value
        );

      }
    );

  }
);


/* =========================
   AUTO BALANCE
   ========================= */

get(
  "autoBalanceButton"
)
.addEventListener(
  "click",
  function() {

    /*
    Keep the values the user explicitly
    locked and let remaining categories
    make up the difference.
    */

    autoBalance();

  }
);


/* =========================
   RESET MIX
   ========================= */

get(
  "resetMixButton"
)
.addEventListener(
  "click",
  function() {

    spends = {
      basic:0,
      bundle:0,
      card:0
    };


    locked = {
      basic:false,
      bundle:false,
      card:false
    };


    render();

  }
);


/* =========================
   CALCULATE
   ========================= */

get(
  "calculateButton"
)
.addEventListener(
  "click",
  function() {

    const error =
      get(
        "setupError"
      );


    error.style.display =
      "none";


    currentStatus =
      currentStatusSelect.value;


    currentPoints =
      Math.max(
        0,
        Number(
          currentPointsInput.value
        ) || 0
      );


    targetStatus =
      targetStatusSelect.value;


    targetPoints =
      currentThresholds[
        targetStatus
      ];


    cardmember =
      cardmemberCheck.checked;


    if(
      currentPoints >=
      targetPoints
    ) {

      error.textContent =
        `You already have enough Elite Status Points for ${tierNames[targetStatus]} this qualification year.`;

      error.style.display =
        "block";

      return;

    }


    spends = {
      basic:0,
      bundle:0,
      card:0
    };


    locked = {
      basic:false,
      bundle:false,
      card:false
    };


    cardSpendCard.style.display =
      cardmember
        ? "block"
        : "none";


    get(
      "goalName"
    ).textContent =
      tierNames[
        targetStatus
      ];


    const pointsRemaining =
      targetPoints -
      currentPoints;


    get(
      "pointsNeededText"
    ).textContent =
      `${integer(pointsRemaining)} more Elite Status Points needed`;


    /*
    Calculate each slider's individual
    maximum before displaying the mixer.
    */

    updateSliderMaximums();


    setupView.style.display =
      "none";


    mixerView.style.display =
      "block";


    /*
    IMPORTANT:
    Start everything at zero.
    Do not auto-balance on first load.
    */

    render();

  }
);


/* =========================
   EDIT INPUTS
   ========================= */

get(
  "editSetupButton"
)
.addEventListener(
  "click",
  function() {

    mixerView.style.display =
      "none";


    setupView.style.display =
      "block";

  }
);


/* =========================
   YEAR DISPLAY
   ========================= */

function thresholdText() {

  return (
    `Silver ${integer(currentThresholds.silver)} · ` +
    `Gold ${integer(currentThresholds.gold)} · ` +
    `Platinum ${integer(currentThresholds.platinum)} · ` +
    `Diamond ${integer(currentThresholds.diamond)}`
  );

}


get(
  "qualificationYear"
).textContent =
  `${qualificationYear} Qualification Year`;


get(
  "daysRemaining"
).textContent =
  `${daysRemaining} ${
    daysRemaining === 1
      ? "day"
      : "days"
  } remaining`;


get(
  "thresholdSummary"
).textContent =
  `Thresholds: ${thresholdText()}`;


get(
  "mixerYear"
).textContent =
  `${qualificationYear} qualification year`;


get(
  "mixerDays"
).textContent =
  `${daysRemaining} ${
    daysRemaining === 1
      ? "day"
      : "days"
  } remaining`;


get(
  "mixerThresholds"
).textContent =
  `Using ${qualificationYear} thresholds: ${thresholdText()}`;
}

function initializeAwardBooking(root) {
'use strict';
  const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSe3rWRfZgwLDdXHu4mU1yHkUsMsrRQu83ExVHGjML8dHXBQMg/formResponse';
  const SHEET = 'https://docs.google.com/spreadsheets/d/1tl5kMOTGUCaxeienIq7WNtIWiVVMcPOoRAHvLBiu1bg/gviz/tq?headers=1';
  const ENTRIES = {from:'entry.654721967',to:'entry.1275795336',fare:'entry.41459936',type:'entry.406845966',miles:'entry.1952265478',cash:'entry.2079063321',connection:'entry.414455952',date:'entry.700037851'};
  // NEW FIELD CONFIG: replace null only with real Google Form entry IDs.
  // Existing fare/type store Cash when present, otherwise GoWild! Advanced Booking.
  // With both entered, the second fare and flight details persist only once configured.
  const NEW_ENTRIES = {cashFare:null,goWildFare:null,flightNumbers:null,departureTime:null,stops:null,duration:null};
  const WORKER_URL = 'https://frontier-flight-times.jacob-brown-6700.workers.dev/';
  // Airport data and city photo choices follow the site's September 2026 home-screen widget.
  const AIRPORTS = [["ATL","Hartsfield Jackson Atlanta International Airport","Atlanta",33.6367,-84.4281],["AUS","Austin Bergstrom International Airport","Austin",30.1945,-97.6699],["BDL","Bradley International Airport","Hartford",41.9389,-72.6832],["BNA","Nashville International Airport","Nashville",36.1245,-86.6782],["BOG","El Dorado International Airport","Bogota",4.70159,-74.1469],["BOI","Boise Air Terminal/Gowen field","Boise",43.5644,-116.223],["BOS","General Edward Lawrence Logan International Airport","Boston",42.3643,-71.0052],["BQN","Rafael Hernandez Airport","Aguadilla",18.4949,-67.1294],["BUF","Buffalo Niagara International Airport","Buffalo",42.9405,-78.7322],["BUR","Bob Hope Airport","Burbank",34.2007,-118.359],["BWI","Baltimore/Washington International Thurgood Marshal Airport","Baltimore",39.1754,-76.6683],["CLE","Cleveland Hopkins International Airport","Cleveland",41.4117,-81.8498],["CLT","Charlotte Douglas International Airport","Charlotte",35.214,-80.9431],["CMH","John Glenn Columbus International Airport","Columbus",39.998,-82.8919],["CTG","Rafael Nunez International Airport","Cartagena",10.4424,-75.513],["CUN","Cancun International Airport","Cancun",21.0365,-86.8771],["CVG","Cincinnati Northern Kentucky International Airport","Hebron",39.0488,-84.6678],["DCA","Ronald Reagan Washington National Airport","Washington",38.8521,-77.0377],["DEN","Denver International Airport","Denver",39.8617,-104.673],["DFW","Dallas Fort Worth International Airport","Dallas-Fort Worth",32.8968,-97.038],["DSM","Des Moines International Airport","Des Moines",41.534,-93.6631],["DTW","Detroit Metropolitan Wayne County Airport","Detroit",42.2124,-83.3534],["ELP","El Paso International Airport","El Paso",31.8072,-106.378],["EWR","Newark Liberty International Airport","Newark",40.6925,-74.1687],["FAR","Hector International Airport","Fargo",46.9207,-96.8158],["FLL","Fort Lauderdale Hollywood International Airport","Fort Lauderdale",26.0726,-80.1527],["FSD","Joe Foss Field Airport","Sioux Falls",43.582,-96.7419],["GRR","Gerald R. Ford International Airport","Grand Rapids",42.8808,-85.5228],["GUA","La Aurora Airport","Guatemala City",14.5833,-90.5275],["IAD","Washington Dulles International Airport","Dulles",38.9445,-77.4558],["IAH","George Bush Intercontinental Houston Airport","Houston",29.9844,-95.3414],["IND","Indianapolis International Airport","Indianapolis",39.7173,-86.2944],["ISP","Long Island Mac Arthur Airport","Islip",40.7952,-73.1002],["JAX","Jacksonville International Airport","Jacksonville",30.4941,-81.6879],["JFK","John F Kennedy International Airport","New York",40.6398,-73.7789],["LAS","Harry Reid International Airport","Las Vegas",36.0801,-115.152],["LAX","Los Angeles International Airport","Los Angeles",33.9425,-118.408],["LGA","La Guardia Airport","New York",40.7772,-73.8726],["MBJ","Sangster International Airport","Montego Bay",18.5037,-77.9134],["MCI","Kansas City International Airport","Kansas City",39.2976,-94.7139],["MCO","Orlando International Airport","Orlando",28.4294,-81.309],["MDE","Jose Maria Cordova International Airport","Rionegro",6.16454,-75.4231],["MDW","Chicago Midway International Airport","Chicago",41.786,-87.7524],["MEM","Memphis International Airport","Memphis",35.0424,-89.9767],["MIA","Miami International Airport","Miami",25.7932,-80.2906],["MKE","General Mitchell International Airport","Milwaukee",42.9472,-87.8966],["MSN","Dane County Regional Truax Field","Madison",43.1399,-89.3375],["MSP","Minneapolis-St Paul International/Wold-Chamberlain Airport","Minneapolis",44.882,-93.2218],["MSY","Louis Armstrong New Orleans International Airport","New Orleans",29.9934,-90.258],["MYR","Myrtle Beach International Airport","Myrtle Beach",33.6797,-78.9283],["OAK","Metropolitan Oakland International Airport","Oakland",37.7213,-122.221],["OKC","Will Rogers World Airport","Oklahoma City",35.3931,-97.6007],["OMA","Eppley Airfield","Omaha",41.3032,-95.8941],["ONT","Ontario International Airport","Ontario",34.056,-117.601],["ORD","Chicago O'Hare International Airport","Chicago",41.9786,-87.9048],["ORF","Norfolk International Airport","Norfolk",36.8946,-76.2012],["DJT","President Donald J. Trump International Airport (formerly: Palm Beach International Airport)","West Palm Beach",26.6832,-80.0956],["PDX","Portland International Airport","Portland",45.5887,-122.598],["PHL","Philadelphia International Airport","Philadelphia",39.8719,-75.2411],["PHX","Phoenix Sky Harbor International Airport","Phoenix",33.4343,-112.012],["PIT","Pittsburgh International Airport","Pittsburgh",40.4915,-80.2329],["PNS","Pensacola Regional Airport","Pensacola",30.4734,-87.1866],["PSE","Mercedita Airport","Ponce",18.0083,-66.563],["PUJ","Punta Cana International Airport","Punta Cana",18.5674,-68.3634],["RDU","Raleigh Durham International Airport","Raleigh/Durham",35.8776,-78.7875],["RIC","Richmond International Airport","Richmond",37.5052,-77.3197],["RNO","Reno Tahoe International Airport","Reno",39.4991,-119.768],["RSW","Southwest Florida International Airport","Fort Myers",26.5362,-81.7552],["SAL","El Salvador International Airport","Santa Clara",13.4409,-89.0557],["SAN","San Diego International Airport","San Diego",32.7336,-117.19],["SAP","Ramon Villeda Morales International Airport","La Mesa",15.4526,-87.9236],["SAT","San Antonio International Airport","San Antonio",29.5337,-98.4698],["SDQ","Las Americas International Airport","Santo Domingo",18.4297,-69.6689],["SEA","Seattle Tacoma International Airport","Seattle",47.449,-122.309],["SFO","San Francisco International Airport","San Francisco",37.619,-122.375],["SJC","Norman Y. Mineta San Jose International Airport","San Jose",37.3626,-121.929],["SJO","Juan Santamaria International Airport","San Jose",9.99386,-84.2088],["SJU","Luis Munoz Marin International Airport","San Juan",18.4394,-66.0018],["SLC","Salt Lake City International Airport","Salt Lake City",40.7884,-111.978],["SMF","Sacramento International Airport","Sacramento",38.6954,-121.591],["SNA","John Wayne Airport-Orange County Airport","Santa Ana",33.6757,-117.868],["STI","Cibao International Airport","Santiago",19.4061,-70.6047],["STL","Lambert St Louis International Airport","St Louis",38.7487,-90.37],["SYR","Syracuse Hancock International Airport","Syracuse",43.1112,-76.1063],["TPA","Tampa International Airport","Tampa",27.9755,-82.5332],["TTN","Trenton Mercer Airport","Trenton",40.2767,-74.8135],["XNA","Northwest Arkansas Regional Airport","Fayetteville/Springdale/",36.2819,-94.3068]];
  const TIMEZONES = {"ATL":"America/New_York","AUS":"America/Chicago","BDL":"America/New_York","BNA":"America/Chicago","BOG":"America/Bogota","BOI":"America/Boise","BOS":"America/New_York","BQN":"America/Puerto_Rico","BUF":"America/New_York","BUR":"America/Los_Angeles","BWI":"America/New_York","CLE":"America/New_York","CLT":"America/New_York","CMH":"America/New_York","CTG":"America/Bogota","CUN":"America/Cancun","CVG":"America/New_York","DCA":"America/New_York","DEN":"America/Denver","DFW":"America/Chicago","DSM":"America/Chicago","DTW":"America/Detroit","ELP":"America/Denver","EWR":"America/New_York","FAR":"America/Chicago","FLL":"America/New_York","FSD":"America/Chicago","GRR":"America/Detroit","GUA":"America/Guatemala","IAD":"America/New_York","IAH":"America/Chicago","IND":"America/Indiana/Indianapolis","ISP":"America/New_York","JAX":"America/New_York","JFK":"America/New_York","LAS":"America/Los_Angeles","LAX":"America/Los_Angeles","LGA":"America/New_York","MBJ":"America/Jamaica","MCI":"America/Chicago","MCO":"America/New_York","MDE":"America/Bogota","MDW":"America/Chicago","MEM":"America/Chicago","MIA":"America/New_York","MKE":"America/Chicago","MSN":"America/Chicago","MSP":"America/Chicago","MSY":"America/Chicago","MYR":"America/New_York","OAK":"America/Los_Angeles","OKC":"America/Chicago","OMA":"America/Chicago","ONT":"America/Los_Angeles","ORD":"America/Chicago","ORF":"America/New_York","DJT":"America/New_York","PDX":"America/Los_Angeles","PHL":"America/New_York","PHX":"America/Phoenix","PIT":"America/New_York","PNS":"America/Chicago","PSE":"America/Puerto_Rico","PUJ":"America/Santo_Domingo","RDU":"America/New_York","RIC":"America/New_York","RNO":"America/Los_Angeles","RSW":"America/New_York","SAL":"America/El_Salvador","SAN":"America/Los_Angeles","SAP":"America/Tegucigalpa","SAT":"America/Chicago","SDQ":"America/Santo_Domingo","SEA":"America/Los_Angeles","SFO":"America/Los_Angeles","SJC":"America/Los_Angeles","SJO":"America/Costa_Rica","SJU":"America/Puerto_Rico","SLC":"America/Denver","SMF":"America/Los_Angeles","SNA":"America/Los_Angeles","STI":"America/Santo_Domingo","STL":"America/Chicago","SYR":"America/New_York","TPA":"America/New_York","TTN":"America/New_York","XNA":"America/Chicago","PVR":"America/Mexico_City","SJD":"America/Mazatlan"};
  const EXTRA = [['PVR','Licenciado Gustavo Díaz Ordaz International Airport','Puerto Vallarta',20.6801,-105.2542],['SJD','Los Cabos International Airport','San José del Cabo',23.1518,-109.721]];
  const COUNTRY = {BOG:'CO',CTG:'CO',MDE:'CO',CUN:'MX',PVR:'MX',SJD:'MX',GUA:'GT',MBJ:'JM',PUJ:'DO',SDQ:'DO',STI:'DO',SAL:'SV',SAP:'HN',SJO:'CR',BQN:'PR',PSE:'PR',SJU:'PR'};
  const CITY = {BOG:'Bogotá',CTG:'Cartagena',CUN:'Cancún',DEN:'Denver',DJT:'West Palm Beach',MDW:'Chicago Midway',ORD:'Chicago O’Hare',MCO:'Orlando',SJO:'San José',SJU:'San Juan',MBJ:'Montego Bay',MDE:'Medellín',SAL:'San Salvador',SAP:'San Pedro Sula',STI:'Santiago'};
  const PHOTO_FALLBACK = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=75';
  const PHOTO = {DEN:'https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?auto=format&fit=crop&w=900&q=75',LAS:'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=900&q=75',SFO:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=75',LAX:'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=900&q=75',MIA:'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=900&q=75'};
  const WIKI_TITLE = {
  AUS:'Austin, Texas', BOG:'Bogotá', BQN:'Aguadilla, Puerto Rico',
  BUF:'Buffalo, New York', BUR:'Burbank, California',
  CLT:'Charlotte, North Carolina', CMH:'Columbus, Ohio',
  CTG:'Cartagena, Colombia', CUN:'Cancún', DCA:'Washington, D.C.',
  DFW:'Dallas', EWR:'Newark, New Jersey', FAR:'Fargo, North Dakota',
  IAD:'Washington, D.C.', ISP:'Long Island', JFK:'New York City',
  LGA:'New York City', MCO:'Orlando, Florida', MDE:'Medellín',
  MDW:'Chicago', MEM:'Memphis, Tennessee', MSN:'Madison, Wisconsin',
  MSP:'Minneapolis', ONT:'Ontario, California', ORD:'Chicago',
  PDX:'Portland, Oregon', PHX:'Phoenix, Arizona', PSE:'Ponce, Puerto Rico',
  RDU:'Raleigh, North Carolina', RIC:'Richmond, Virginia',
  SAL:'San Salvador', SAP:'San Pedro Sula', SJC:'San Jose, California',
  SJO:'San José, Costa Rica', SJU:'San Juan, Puerto Rico',
  SNA:'Santa Ana, California', STI:'Santiago de los Caballeros',
  SYR:'Syracuse, New York', TTN:'Trenton, New Jersey',
  XNA:'Fayetteville, Arkansas'
};
  // [US/PR outbound, return to US/PR], in dollars. No international-to-international inference.
  const TAXES = {MX:[63.08,80.53],CO:[20.60,109.68],CR:[30.28,67.41],DO:[55.52,88.15],SV:[7.10,57.36],GT:[5.60,50.85],HN:[5.60,66.67],JM:[49.60,98.75]};
  const $ = id => root.querySelector(`#${id}`);
  const map = new Map([...AIRPORTS,...EXTRA].map(([code,name,city,lat,lon]) => [code,{code,name,city:CITY[code]||city,lat,lon,country:COUNTRY[code]||'US'}]));
  let latest = null, lastSubmitted = '', recentRows = [], loaded = false, homeChanged = false, rotationPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches, hovering = false, pauseUntil = 0;
  let rotationTimer = null, relativeTimer = null;
  const money = x => '$'+x.toFixed(2);
  const html = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function dist(a,b){const rad=Math.PI/180, dLat=(b.lat-a.lat)*rad,dLon=(b.lon-a.lon)*rad, q=Math.sin(dLat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)**2;return 3958.8*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q))}
  function classAward(v){return v<.6?['Terrible',1]:v<.9?['Okay',2]:v<1.2?['Decent',3]:v<1.5?['Good',4]:v<2?['Great',5]:['Phenomenal',6]}
  // Editorial Frontier bargain scale: a modest fixed trip cost plus a per-mile
  // allowance. These are deal ratings, not an official airline price standard.
  function classCash(fare,distance){return fare<20+.025*distance?['Phenomenal',6]:fare<30+.04*distance?['Great',5]:fare<50+.05*distance?['Good',4]:fare<55+.06*distance?['Decent',3]:fare<60+.11*distance?['Okay',2]:['Terrible',1]}
  let flights=[],requestId=0,flightController=null;
  const optionalNumber=id=>$(id).value.trim()===''?null:Number($(id).value);
  function awardTax(from,to,longLayover=false){
    const a=map.get(from),b=map.get(to);if(!a||!b||from===to)return null;
    const domestic=c=>['US','PR'].includes(c);
    const base=domestic(a.country)&&domestic(b.country)?5.60:domestic(a.country)?TAXES[b.country]?.[0]:domestic(b.country)?TAXES[a.country]?.[1]:null;
    return base==null?null:Math.round((base+(longLayover?5.60:0))*100)/100;
  }
  function selectedFlight(){return $('flight').value===''?null:flights[Number($('flight').value)]||null}
  function updateTax(){const tax=awardTax($('from').value,$('to').value,$('connection').checked);$('award-tax').textContent=tax===null?'Unavailable':money(tax);$('taxhint').textContent=tax===null?'No award-tax rule for this route. Cash fares can still be evaluated.':'Calculated automatically'+($('connection').checked?' · includes $5.60 for Long Layover.':'.')}
  function syncConnection(){const f=selectedFlight(),show=!!f&&f.flights.length>1;$('connection-field').hidden=!show;$('connection').disabled=!show;$('connection').checked=false;updateTax()}
  function timeMinutes(value){const m=String(value).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);if(!m)return NaN;let h=+m[1],min=+m[2];if(min>59||h>(m[3]?12:23)||(m[3]&&h<1))return NaN;if(m[3])h=h%12+(/pm/i.test(m[3])?12:0);return h*60+min}
  function normalizeFlights(data){if(!Array.isArray(data.flights))throw Error('Unexpected schedule response');const seen=new Set();return data.flights.filter(f=>f&&Array.isArray(f.flights)&&f.flights.length>0&&f.flights.every(n=>/^(?:F9\s*)?\d+$/i.test(String(n)))&&Number.isFinite(timeMinutes(f.departureTime))).map(f=>({...f,flights:f.flights.map(n=>'F9 '+String(n).replace(/^F9\s*/i,''))})).filter(f=>{const k=JSON.stringify([f.departureTime,f.flights,f.duration]);if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>timeMinutes(a.departureTime)-timeMinutes(b.departureTime))}
  function flightLabel(f){return `${f.departureTime} · ${f.flights.join(' → ')} · ${f.flights.length===1?'Nonstop':f.flights.length-1+' stop'+(f.flights.length>2?'s':'')}${f.duration?' · '+f.duration:''}`}
  async function loadFlights(){
    const id=++requestId;flightController?.abort();flights=[];invalidate();$('flight').replaceChildren(new Option('Choose airports and date first…',''));$('flight').disabled=true;$('flight-retry').hidden=true;syncConnection();
    const origin=$('from').value,destination=$('to').value,departDate=$('departuredate').value;
    $('flight-status').textContent='Departure times are local to the departure airport.';
    if(!map.has(origin)||!map.has(destination)||origin===destination||!validDateKey(departDate))return;
    if(dayNumber(departDate)<dayNumber(todayKey(origin))){$('flight-status').textContent='Choose today or a future date.';return}
    $('flight').options[0].textContent='Loading Frontier flights…';$('flight-status').textContent='Finding departures…';
    flightController=new AbortController();const controller=flightController,timer=setTimeout(()=>controller.abort(),20000);
    try{const r=await fetch(WORKER_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({origin,destination,departDate}),signal:controller.signal});if(!r.ok)throw Error('Schedule unavailable');const data=await r.json();if(id!==requestId)return;flights=normalizeFlights(data);$('flight').replaceChildren(new Option(flights.length?'Choose exact flight…':'No flights returned for this route/date',''));flights.forEach((f,i)=>$('flight').append(new Option(flightLabel(f),String(i))));$('flight').disabled=!flights.length;$('flight-status').textContent=flights.length?`${flights.length} itineraries · departure times local to ${origin}.`:'No scheduled itineraries returned. Try another date or route.';$('flight-retry').hidden=!!flights.length;
    }catch{if(id!==requestId)return;$('flight').replaceChildren(new Option('Flight lookup unavailable',''));$('flight-status').textContent='Could not load flights. Retry or choose another date.';$('flight-retry').hidden=false}finally{clearTimeout(timer)}
  }
  function bookingURL(row){if(!map.has(row.from)||!map.has(row.to)||!validDateKey(row.date))return null;return 'https://booking.flyfrontier.com/external/flightselect?'+new URLSearchParams({o1:row.from,d1:row.to,dd1:row.date,r:'false',ADT:'1',inl:'0',mon:'true'})}
  function scoreCard(tag,value,grade,copy,cash=false){const e=document.createElement('div');e.className='score-card'+(cash?' cash':'');e.innerHTML=`<div class="tag">${html(tag)}</div><strong>${html(value)}</strong><div class="grade">${html(grade[0])}</div><div class="rating">${Array.from({length:6},(_,i)=>'<span'+(i<grade[1]?' class="on"':'')+'></span>').join('')}</div><p>${html(copy)}</p>`;return e}
  function calculate(){
    invalidate();$('feedback').textContent='';const a=map.get($('from').value),b=map.get($('to').value),date=$('departuredate').value,f=selectedFlight();
    const fail=text=>{$('feedback').textContent=text};
    if(!a||!b||a.code===b.code||!validDateKey(date))return fail('Choose two different airports and a departure date.');
    if(dayNumber(date)<dayNumber(todayKey(a.code)))return fail('Choose today or a future departure date.');
    if(!f)return fail('Choose an exact Frontier flight first.');
    const fare=optionalNumber('fare'),gowild=optionalNumber('gowild'),miles=optionalNumber('miles');
    for(const [label,value] of [['Cash fare',fare],['GoWild! fare',gowild]])if(value!==null&&(!Number.isFinite(value)||value<=0))return fail(label+' must be a positive amount.');
    if(miles!==null&&(!Number.isSafeInteger(miles)||miles<=0))return fail('Miles must be a positive whole number.');
    if(fare===null&&gowild===null)return fail('Enter Cash or GoWild! fare; add Miles for a mileage valuation.');
    const tax=awardTax(a.code,b.code,$('connection').checked),distance=dist(a,b),cards=$('result-cards');cards.replaceChildren();
    for(const [label,value] of [['cash',fare],['GoWild!',gowild]]){if(value===null)continue;
      if(miles!==null&&tax!==null){const cpp=(value-tax)*100/miles;cards.append(scoreCard('Value vs '+label,cpp.toFixed(2)+'¢ / mile',classAward(cpp),`${money(value)} fare − ${money(tax)} award taxes, divided by ${miles.toLocaleString()} miles.`))}
      cards.append(scoreCard(label+' fare',money(value),classCash(value,distance),`${(value*100/distance).toFixed(2)}¢ per route mile. At this distance, under ${money(50+.05*distance)} earns at least Good.`,true));
    }
    const rec=$('recommendation');rec.hidden=false;rec.classList.remove('wait');
    if(miles!==null&&tax!==null){const cheapest=Math.min(...[fare,gowild].filter(x=>x!==null)),cpp=(cheapest-tax)*100/miles,choice=cpp>=1.2?'Miles meet the 1.2¢ target against your lowest entered fare.':'Your lowest entered fare offers better value than redeeming at our 1.2¢ target.';rec.textContent=choice}
    else rec.textContent=miles!==null?'Mileage valuation unavailable: this direction has no configured award-tax rule.':'Add Miles required to compare redemption value.';
    if(fare!==null&&gowild!==null)rec.textContent+=gowild<=fare?` GoWild! saves ${money(fare-gowild)} versus cash.`:` Cash saves ${money(gowild-fare)} versus GoWild!.`;
    $('result-meta').textContent=`${a.code} → ${b.code} · ${date} · ${flightLabel(f)} · about ${Math.round(distance).toLocaleString()} straight-line miles${miles!==null&&tax!==null?' · '+miles.toLocaleString()+' miles + '+money(tax)+' award taxes':''}`;$('result').classList.add('show');
    // Existing Google Form requires an award comparison. Cash-only evaluations stay local.
    if(miles===null||tax===null)return fail('Value checked. Add miles with supported award taxes to share a community find.');
    latest={from:a.code,to:b.code,date,fare:(fare??gowild).toFixed(2),type:fare!==null?'Standard':'GoWild! Advanced Booking',miles:String(miles),cash:tax.toFixed(2),connection:$('connection').checked?'Yes':'No',cashFare:fare===null?'':fare.toFixed(2),goWildFare:gowild===null?'':gowild.toFixed(2),flightNumbers:f.flights.join(' → '),departureTime:f.departureTime,stops:String(f.flights.length-1),duration:f.duration||''};submit();
  }
  function invalidate(){latest=null;$('result').classList.remove('show');$('feedback').textContent=''}
  function submissionFields(find){const fields=[];for(const [key,value] of Object.entries(find)){const entry=ENTRIES[key]||NEW_ENTRIES[key];if(!entry||value==='')continue;if(key==='date'){const [year,month,day]=value.split('-');for(const [part,v] of [['year',year],['month',month],['day',day]])fields.push([entry+'_'+part,v])}else fields.push([entry,value])}return fields}
  function submit(){if(!latest)return;const signature=JSON.stringify(latest);if(signature===lastSubmitted){$('feedback').textContent='Already sent this exact find.';return}const form=document.createElement('form');form.action=FORM;form.method='POST';form.target='frontiermiles-form-target';form.hidden=true;for(const [name,value] of submissionFields(latest)){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.append(input)}document.body.append(form);try{form.submit();lastSubmitted=signature;$('feedback').textContent='Submission sent. Google does not confirm receipt here; check the recent list shortly.';setTimeout(loadRecent,3500)}catch{$('feedback').textContent='Could not send this find. Please try again.'}finally{form.remove()}}
  function initAirports(){const sorted=[...map.values()].sort((a,b)=>a.city.localeCompare(b.city)||a.code.localeCompare(b.code));for(const a of sorted){for(const id of ['from','to','home']){const o=document.createElement('option');o.value=a.code;o.textContent=`${a.city} (${a.code})`;$(id).append(o)}}}
  // The response Sheet's timezone is America/Denver. Google Charts supplies a
  // timezone-less wall-clock Date, so convert that wall time to an instant.
  function parseTime(value,formatted){if(value instanceof Date){const wall=Date.UTC(value.getFullYear(),value.getMonth(),value.getDate(),value.getHours(),value.getMinutes(),value.getSeconds());const getOffset=utc=>{const name=new Intl.DateTimeFormat('en-US',{timeZone:'America/Denver',timeZoneName:'shortOffset'}).formatToParts(new Date(utc)).find(p=>p.type==='timeZoneName')?.value||'GMT-6';const m=name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);return m?(m[1]==='-'?-1:1)*(+m[2]*60+(+m[3]||0))*60000:-21600000};let instant=wall-getOffset(wall);instant=wall-getOffset(instant);return instant}if(typeof value==='number')return value;const t=Date.parse(formatted||value);return Number.isFinite(t)?t:0}
  function relative(t){const s=Math.max(0,Math.floor((Date.now()-t)/1000));if(s<90)return 'just now';if(s<3600)return `${Math.floor(s/60)} minutes ago`;if(s<7200)return '1 hour ago';if(s<86400)return `${Math.floor(s/3600)} hours ago`;if(s<172800)return '1 day ago';return `${Math.floor(s/86400)} days ago`}
  const photoCache=new Map();
  async function photo(code){if(photoCache.has(code))return photoCache.get(code);const a=map.get(code);if(!a)return null;const promise=(async()=>{try{const title=WIKI_TITLE[code]||a.city;const r=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title));if(!r.ok)throw Error('photo');const data=await r.json(),source=data.originalimage?.source;if(!source)throw Error('photo');const parts=new URL(source).pathname.split('/').filter(Boolean);const filename=decodeURIComponent(parts.includes('thumb')?parts.at(-2):parts.at(-1));if(/\.svg$/i.test(filename))throw Error('photo');for(const host of ['https://commons.wikimedia.org','https://en.wikipedia.org']){const q=new URLSearchParams({action:'query',format:'json',origin:'*',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'900',titles:'File:'+filename});const response=await fetch(host+'/w/api.php?'+q);if(!response.ok)continue;const info=Object.values((await response.json()).query?.pages||{})[0]?.imageinfo?.[0];if(!info?.extmetadata||!info.descriptionurl)continue;const plain=s=>new DOMParser().parseFromString(s||'','text/html').body.textContent.replace(/\s+/g,' ').trim();return {url:info.thumburl||info.url,credit:info.descriptionurl,label:`Photo: ${plain(info.extmetadata.Artist?.value)||'Wikimedia contributor'} · ${plain(info.extmetadata.LicenseShortName?.value)||'image details'}`}}throw Error('photo')}catch{return {url:PHOTO[code]||PHOTO_FALLBACK,credit:null}}})();photoCache.set(code,promise);return promise}
  function validDateKey(key){if(!/^\d{4}-\d{2}-\d{2}$/.test(key))return false;const [y,m,d]=key.split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d}
  function dayNumber(key){const [y,m,d]=key.split('-').map(Number);return Date.UTC(y,m-1,d)/86400000}
  function todayKey(code){const parts=new Intl.DateTimeFormat('en-US',{timeZone:TIMEZONES[code]||'America/Denver',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=Object.fromEntries(parts.map(p=>[p.type,p.value]));return `${v.year}-${v.month}-${v.day}`}
  function dateKey(value,formatted){if(value instanceof Date){const key=`${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,'0')}-${String(value.getDate()).padStart(2,'0')}`;return validDateKey(key)?key:''}const text=String(value||formatted||'');let m=text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);let key=m?`${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`:'';if(!m){m=text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(m)key=`${m[3]}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`}return validDateKey(key)?key:''}
  function departureState(row){if(!row.date)return {show:Date.now()-row.t<14*86400000,departed:false,label:'Departure date not provided'};const days=dayNumber(todayKey(row.from))-dayNumber(row.date);const [y,m,d]=row.date.split('-').map(Number);const date=new Date(Date.UTC(y,m-1,d));const text=new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(date);return {show:days<=7,departed:days>0,label:(days>0?'Departed ':'Departs ')+text}}
  function flightPage(a){const special={DCA:'washington',IAD:'washington',DFW:'dallas',JFK:'new-york',LGA:'new-york',MDW:'chicago',ORD:'chicago',ONT:'ontario-ca',SNA:'orange-county',MSP:'minneapolis',ISP:'long-island',RDU:'raleigh',XNA:'fayetteville',CVG:'cincinnati',SAL:'san-salvador',SAP:'san-pedro-sula',SJD:'cabo-san-lucas',SJO:'san-jose-3'};const slug=special[a.code]||a.city.split('/')[0].trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return 'https://flights.flyfrontier.com/en/flights-from-'+slug}
  const recentCredits = new Map();
  function addPhotoCredit(a,p){if(!p.credit)return;recentCredits.set(a.code,{airport:a.city+' ('+a.code+')',...p});const footer=$('recent-photo-credits');footer.replaceChildren(document.createTextNode('Photo credits: '));for(const [i,entry] of [...recentCredits.values()].entries()){if(i)footer.append(document.createTextNode(' · '));const link=document.createElement('a');link.href=entry.credit;link.target='_blank';link.rel='noopener noreferrer';link.textContent=entry.airport+' — '+entry.label.replace(/^Photo: /,'');footer.append(link)}footer.hidden=false}
  function cityPhotoPanel(a,card){const head=document.createElement('div');head.className='find-photo';head.style.backgroundImage=`url("${PHOTO[a.code]||PHOTO_FALLBACK}")`;const name=document.createElement('div');name.className='find-city';name.append(document.createTextNode(a.city));const code=document.createElement('span');code.textContent=a.code;name.append(code);head.append(name);photo(a.code).then(p=>{if(!p||!card.isConnected)return;head.style.backgroundImage=`url("${p.url}")`;addPhotoCredit(a,p)});return head}
  function renderRecent(){const home=$('home').value;const current=recentRows.filter(r=>r.t&&departureState(r).show).sort((a,b)=>b.t-a.t);const chosen=(home?[...current.filter(r=>r.from===home),...current.filter(r=>r.from!==home)]:current).slice(0,20);const box=$('recent');box.replaceChildren();recentCredits.clear();$('recent-photo-credits').replaceChildren();$('recent-photo-credits').hidden=true;box.scrollLeft=0;if(!chosen.length){box.textContent=loaded?'No community finds yet. Share the first one!':'Could not load recent finds. Try refreshing the page.';return}
    for(const row of chosen){const a=map.get(row.from),b=map.get(row.to);if(!a||!b)continue;const awardGrade=classAward(row.value);const state=departureState(row),card=document.createElement('article');card.className='find';card.dataset.departure=row.date;card.dataset.origin=row.from;const link=document.createElement('a');link.className='find-link';link.href=bookingURL(row)||flightPage(a);link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`${a.city} to ${b.city}; view Frontier results for ${a.code} to ${b.code}${row.date?' on '+row.date:' (date unavailable)'}, opens in a new tab`);const photos=document.createElement('div');photos.className='route-photos';photos.append(cityPhotoPanel(a,card),cityPhotoPanel(b,card));const plane=document.createElement('span');plane.className='route-plane';plane.setAttribute('aria-hidden','true');plane.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-.55-.45-1-1-1h-7L9 3H7l2 8H4L2 8H1l1 4-1 4h1l2-3h5l-2 8h2l5-8h7c.55 0 1-.45 1-1z"/></svg>';photos.append(plane);const body=document.createElement('div');body.className='find-body';body.innerHTML=`<div class="find-route">${html(a.city)} (${a.code}) → ${html(b.city)} (${b.code})</div><div class="find-value"><span>${row.value.toFixed(2)}¢ <small>per Frontier mile vs ${/GoWild/i.test(row.type)?'GoWild!':'cash'}</small></span><span class="find-rating" data-level="${awardGrade[1]}">${awardGrade[0]} value</span></div><div class="find-departure${state.departed?' departed':''}">${html(state.label)}</div><div class="find-time" data-found="${row.t}">Found ${relative(row.t)}</div><div class="find-fare">${money(row.fare)} ${html(row.type)} fare · View flights ↗</div>`;link.append(photos,body);card.append(link);box.append(card)}
  }
  function moveRecent(direction=1){const box=$('recent'),card=box.querySelector('.find');if(!card)return;const step=card.getBoundingClientRect().width+12,max=Math.max(0,box.scrollWidth-box.clientWidth);if(max<5)return;const next=direction>0?(box.scrollLeft>=max-5?0:Math.min(max,box.scrollLeft+step)):(box.scrollLeft<=5?max:Math.max(0,box.scrollLeft-step));box.scrollTo({left:next,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  function setupRotation(){const box=$('recent');$('recent-pause').textContent=rotationPaused?'Resume rotation':'Pause rotation';$('recent-pause').setAttribute('aria-pressed',String(rotationPaused));$('recent-pause').addEventListener('click',()=>{rotationPaused=!rotationPaused;$('recent-pause').textContent=rotationPaused?'Resume rotation':'Pause rotation';$('recent-pause').setAttribute('aria-pressed',String(rotationPaused))});$('recent-prev').addEventListener('click',()=>{pauseUntil=Date.now()+12000;moveRecent(-1)});$('recent-next').addEventListener('click',()=>{pauseUntil=Date.now()+12000;moveRecent(1)});box.addEventListener('mouseenter',()=>hovering=true);box.addEventListener('mouseleave',()=>hovering=false);['pointerdown','wheel','keydown'].forEach(event=>box.addEventListener(event,()=>pauseUntil=Date.now()+12000,{passive:true}));rotationTimer=setInterval(()=>{if(!rotationPaused&&!hovering&&Date.now()>pauseUntil&&!document.hidden&&!box.contains(document.activeElement))moveRecent()},6000)}
  function loadRecent(){if(typeof google==='undefined'||!google.visualization){$('recent').textContent='Recent finds are unavailable right now.';return}const q=new google.visualization.Query(SHEET);q.send(response=>{if(response.isError()){$('recent').textContent='Could not read recent finds right now.';return}const data=response.getDataTable();const rows=[];let dateColumn=-1;for(let j=0;j<data.getNumberOfColumns();j++){if(/^(departure date|date)$/i.test(data.getColumnLabel(j).trim()))dateColumn=j}for(let i=0;i<data.getNumberOfRows();i++){const val=j=>j<data.getNumberOfColumns()?data.getValue(i,j):null;const fmt=j=>j<data.getNumberOfColumns()?data.getFormattedValue(i,j):'';const from=String(val(1)||'').trim().toUpperCase(),to=String(val(2)||'').trim().toUpperCase();if(!map.has(from)||!map.has(to)||from===to)continue;const fare=Number(val(3)),miles=Number(val(5)),cash=Number(val(6));if(!Number.isFinite(fare)||fare<=0||!Number.isFinite(miles)||miles<=0||!Number.isFinite(cash)||cash<0)continue;const t=parseTime(val(0),fmt(0));if(!t)continue;rows.push({from,to,fare,miles,cash,type:String(val(4)||'Standard'),value:(fare-cash)*100/miles,t,date:dateColumn>=0?dateKey(val(dateColumn),fmt(dateColumn)):''})}recentRows=rows;loaded=true;renderRecent()})}
  async function inferHome(){try{const response=await fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout(5000)});if(!response.ok)return;const d=await response.json(),lat=Number(d.latitude),lon=Number(d.longitude);if(!Number.isFinite(lat)||!Number.isFinite(lon)||homeChanged)return;const point={lat,lon};let nearest=null;for(const a of map.values()){if(!['US','PR'].includes(a.country))continue;const miles=dist(point,a);if(!nearest||miles<nearest.miles)nearest={code:a.code,miles}}if(nearest){$('home').value=nearest.code;if(!$('from').value){$('from').value=nearest.code;loadFlights()}renderRecent()}}catch{}}
  initAirports();
  ['from','to','departuredate'].forEach(id=>$(id).addEventListener('change',loadFlights));
  $('flight').addEventListener('change',()=>{syncConnection();invalidate()});
  $('flight-retry').addEventListener('click',loadFlights);
  $('connection').addEventListener('change',()=>{updateTax();invalidate()});
  ['fare','gowild','miles'].forEach(id=>$(id).addEventListener('input',invalidate));
  $('calculate').addEventListener('click',calculate);$('home').addEventListener('change',()=>{homeChanged=true;renderRecent()});setupRotation();
  if(typeof google!=='undefined'){google.charts.load('current',{packages:['table']});google.charts.setOnLoadCallback(loadRecent)}else $('recent').textContent='Recent finds are unavailable right now.';
  inferHome();let lastDay=todayKey('DEN');setInterval(()=>{root.querySelectorAll('[data-found]').forEach(e=>e.textContent='Found '+relative(Number(e.dataset.found)));const day=todayKey('DEN');if(day!==lastDay){lastDay=day;renderRecent()}},60000);
  return () => {
    if (rotationTimer) clearInterval(rotationTimer);
    if (relativeTimer) clearInterval(relativeTimer);
    if (flightController) flightController.abort();
  };
}
