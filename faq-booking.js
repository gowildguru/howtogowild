(() => {
  const root = document.getElementById('faq');
  if (!root) return;
  const tickets = Array.from(root.querySelectorAll('.gw-faq-trigger'), button => {
    const card = button.closest('.gw-faq-card');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    return { button, card, panel };
  }).filter(ticket => ticket.card && ticket.panel && root.contains(ticket.panel));
  if (!tickets.length) return;

  function setOpen(ticket, open) {
    // Return focus before removing an answer's controls from the tab order.
    if (!open && ticket.panel.contains(document.activeElement)) {
      ticket.button.focus({ preventScroll: true });
    }
    ticket.button.setAttribute('aria-expanded', String(open));
    ticket.card.classList.toggle('is-open', open);
    ticket.panel.inert = !open;
    ticket.panel.setAttribute('aria-hidden', String(!open));
  }

  tickets.forEach(ticket => {
    setOpen(ticket, false);
    ticket.button.addEventListener('click', () => {
      const open = ticket.button.getAttribute('aria-expanded') !== 'true';
      tickets.forEach(other => { if (other !== ticket) setOpen(other, false); });
      setOpen(ticket, open);
    });
    ticket.card.addEventListener('keydown', event => {
      if (event.key === 'Escape' && ticket.card.classList.contains('is-open')) {
        event.preventDefault();
        setOpen(ticket, false);
        ticket.button.focus({ preventScroll: true });
      }
    });
  });
  // Without JavaScript the answers remain visible and the calculator keeps its markup.
  root.classList.add('gw-faq-ready');
})();
(() => {
"use strict";
const widget = document.querySelector("#faq .gw-booking-widget");
if (!widget) return;


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

const formView = widget.querySelector("#gw-formView");
const resultView = widget.querySelector("#gw-resultView");
const originSelect = widget.querySelector("#gw-origin");
const connectionSelect = widget.querySelector("#gw-connection");
const destinationSelect = widget.querySelector("#gw-destination");
const nonstopCheck = widget.querySelector("#gw-nonstopCheck");
const nextDayCheck = widget.querySelector("#gw-nextDayCheck");
const connectionField = widget.querySelector("#gw-connectionField");
const errorMessage = widget.querySelector("#gw-errorMessage");
const blackoutMessage = widget.querySelector("#gw-blackoutMessage");
const unpublishedMessage = widget.querySelector("#gw-unpublishedMessage");
const statusMessage = widget.querySelector("#gw-statusMessage");
const countdownWrap = widget.querySelector("#gw-countdownWrap");
const countdownDisplay = widget.querySelector("#gw-countdownDisplay");
const segmentResults = widget.querySelector("#gw-segmentResults");
const detailsButton = widget.querySelector("#gw-detailsButton");

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

  detailsButton.setAttribute("aria-expanded", String(!open));
  detailsButton.textContent =
    open ? "Show details" : "Hide details";
});


/* ================= CALCULATE ================= */

widget.querySelector("#gw-calculateButton")
.addEventListener("click",()=>{

  stopCountdown();

  countdownWrap.style.display = "none";
  segmentResults.style.display = "none";
  detailsButton.textContent = "Show details";
  detailsButton.setAttribute("aria-expanded", "false");

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
    widget.querySelector("#gw-firstDate").value;

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

  widget.querySelector("#gw-routeSummary").textContent =
    nonstop
      ? `${origin.code} → ${destination.code}`
      : `${origin.code} → ${connection.code} → ${destination.code}`;

  widget.querySelector("#gw-mainResult").textContent =
    formatTime(finalOpen,userTZ);

  widget.querySelector("#gw-windowType").textContent =
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

  widget.querySelector("#gw-segment1Result").innerHTML =
    `<strong>${origin.code} segment opens:</strong> ${formatTime(firstOpen,origin.tz)}`;

  const segment2Result =
    widget.querySelector("#gw-segment2Result");

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
  widget.querySelector("#gw-mainResult").focus();

});


/* ================= EDIT TRIP ================= */

widget.querySelector("#gw-editButton")
.addEventListener("click",()=>{

  stopCountdown();

  resultView.style.display = "none";
  formView.style.display = "";
  widget.querySelector("#gw-calculateButton").focus();

});


updateNonstop();


})();
