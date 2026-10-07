/* =========================================================
   HOWTOGOWILD — FRONTIER GATE ACTIVITY MAP
   Full replacement for gatemap.js

   No fetches or polling here: dashboard.js passes its existing
   cached schedule/status data into this read-only renderer.
   ========================================================= */
(() => {
  'use strict';

  const root = document.getElementById('denGateMap');
  if (!root) return;

  const svg = document.getElementById('denMapSVG');
  const details = document.getElementById('denMapDetails');
  const unplaced = document.getElementById('denMapUnplaced');
  const scroller = root.querySelector('.den-map-scroll');
  const ns = 'http://www.w3.org/2000/svg';

  let payload = {flights: []};
  let filter = 'all';
  let selected = '';
  let signature = '';
  let layout = null;
  let gates = [];
  let centerPending = true;

  /* -----------------------------
     CONFIGURATION
     ----------------------------- */

  const denGates = [
    /* Gate signs sit at the approximate door positions on the terminal edge.
       They are intentionally spread farther apart than the old label-card layout. */
    {gate:'A54', ax:430, ay:388, side:'bottom'},
    {gate:'A56', ax:650, ay:405, side:'bottom'},

    {gate:'A71', ax:430, ay:175, side:'top'},
    {gate:'A73', ax:520, ay:175, side:'top'},
    {gate:'A75', ax:620, ay:175, side:'top'},
    {gate:'A77', ax:720, ay:175, side:'top'},
    {gate:'A79', ax:820, ay:175, side:'top'},
    {gate:'A81', ax:920, ay:175, side:'top'},
    {gate:'A83', ax:1020,ay:175, side:'top'},

    {gate:'A76', ax:780, ay:245, side:'bottom'},
    {gate:'A78', ax:870, ay:245, side:'bottom'},
    {gate:'A80', ax:960, ay:245, side:'bottom'},
    {gate:'A82', ax:1050,ay:245, side:'bottom'},
    {gate:'A84', ax:1110,ay:245, side:'bottom'}
  ];

  const range = (prefix, lo, hi, omit = []) => {
    const blocked = new Set(omit.map(String));
    return Array.from({length: hi - lo + 1}, (_, i) => lo + i)
      .filter(n => !blocked.has(String(n)))
      .map(n => `${prefix}${n}`);
  };

  const airportMaps = {
    DEN: {
      city:'Denver', timezone:'America/Denver', type:'den', gates:denGates,
      focus:'A54–A84', caption:'A-East · A54–A84 · approximate concourse proportions',
      source:'https://maps.flydenver.com/', sourceName:'DEN’s official interactive map',
      description:'Approximate footprint of DEN’s A-East Level 1. Gate positions are schematic.'
    },
    ATL: {
      city:'Atlanta', timezone:'America/New_York', type:'atl', focus:'concourses T and A–F',
      caption:'T · A · B · C · D · E · F · schematic positions, not to scale',
      source:'https://www.atl.com/maps/', sourceName:'ATL’s official airport maps',
      description:'Whole-airport concourse schematic. Only reported Frontier gate neighborhoods are labeled.'
    },
    LAS: {
      city:'Las Vegas', timezone:'America/Los_Angeles', type:'las', focus:'D and E gates',
      caption:'D satellite + E gates · approximate footprint',
      source:'https://www.harryreidairport.com/map', sourceName:'LAS’s official airport maps',
      description:'D satellite and Terminal 3 E gates. Gate markers sit on approximate real gate positions on the concourse footprint.'
    },
    MCO: {
      city:'Orlando', timezone:'America/New_York', type:'linear', prefix:'', gateList:Array.from({length:29},(_,i)=>String(i+1)),
      focus:'Airside 1 · gates 1–29', caption:'Airside 1 · gates 1–29 · schematic positions',
      source:'https://flymco.com/terminal-maps/', sourceName:'MCO’s official terminal maps',
      description:'Airside 1 is shown as a simplified linear gate activity strip for readability.'
    },
    PHX: {
      city:'Phoenix', timezone:'America/Phoenix', type:'linear', prefix:'F', gateList:range('F',1,15),
      focus:'Terminal 3 · F1–F15', caption:'Terminal 3 · F gates · schematic positions',
      source:'https://www.skyharbor.com/maps-directions/', sourceName:'PHX’s official airport maps',
      description:'Terminal 3 F-gate activity strip. Gate positions are schematic.'
    },
    DFW: {
      city:'Dallas / Fort Worth', timezone:'America/Chicago', type:'linear', prefix:'E', gateList:range('E',2,38,[19]),
      focus:'Terminal E · E2–E38', caption:'Terminal E · gate activity · schematic positions',
      source:'https://www.dfwairport.com/map/', sourceName:'DFW’s official interactive map',
      description:'Terminal E gate activity. DFW publishes Terminal E gates E2–E38; this is a simplified strip, not a navigation map.'
    },
    TPA: {
      city:'Tampa', timezone:'America/New_York', type:'linear', prefix:'E', gateList:['E69','E70','E71','E72','E73','E74','E75'],
      focus:'Airside E · Frontier area', caption:'Airside E · Frontier gate area · schematic positions',
      source:'https://www.tampaairport.com/maps', sourceName:'TPA’s official airport maps',
      description:'Airside E Frontier area, centered on gates E71 and E73–E75 with adjacent gates for context.',
      preferredGates:['E71','E73','E74','E75'], contextRadius:1
    },
    SJU: {
      city:'San Juan', timezone:'America/Puerto_Rico', type:'linear', prefix:'C', gateList:range('C',1,10),
      focus:'Terminal C · C gates', caption:'Terminal C · Frontier gate activity · schematic positions',
      source:'https://www.aeropuertosju.com/en/maps/', sourceName:'SJU airport maps',
      description:'Terminal C gate activity. Gate positions are schematic and live assignments can vary.'
    },
    ORD: {
      city:'Chicago O’Hare', timezone:'America/Chicago', type:'linear', prefix:'M', gateList:range('M',20,40),
      focus:'Terminal 5 · M gates', caption:'Terminal 5 · M gates · schematic positions',
      source:'https://www.flychicago.com/ohare/map/Pages/default.aspx', sourceName:'O’Hare’s official maps',
      description:'Terminal 5 M-gate activity. Frontier can occasionally use another terminal; those assignments remain listed below.'
    },
    STL: {
      city:'St. Louis', timezone:'America/Chicago', type:'stl', prefix:'C', gateList:['C1','C2','C3','C5','C6','C7','C8','C9','C10','C12','C15','C16','C17','C18','C19','C23','C24','C27','C28','C29','C30'],
      focus:'Terminal 1 · C19 / C23 area', caption:'Terminal 1 · C concourse · Frontier area',
      source:'https://www.flystl.com/flights-airlines/', sourceName:'STL’s official airline/gate directory',
      description:'Terminal 1 C Concourse focused on Frontier’s C19/C23 area and the immediately surrounding gates.',
      preferredGates:['C19','C23'], contextRadius:1
    },
    LAX: {
      city:'Los Angeles', timezone:'America/Los_Angeles', type:'lax', prefix:'',
      gateList:Array.from({length:30},(_,i)=>String(130+i)),
      focus:'Tom Bradley International Terminal', caption:'Tom Bradley International Terminal · main gates 130–159',
      source:'https://www.flylax.com/terminals/tom-bradley-international-terminal', sourceName:'LAX’s official TBIT information',
      description:'Frontier checks in at Terminal 1 and passengers are bused to Terminal B. This view focuses on TBIT gate activity; West Gates are added when reported.'
    },
    SFO: {
      city:'San Francisco', timezone:'America/Los_Angeles', type:'linear', prefix:'B', gateList:range('B',1,27),
      focus:'Harvey Milk Terminal 1 · B gates', caption:'Harvey Milk Terminal 1 · Boarding Area B',
      source:'https://www.flysfo.com/maps/static-maps', sourceName:'SFO’s official terminal maps',
      description:'Harvey Milk Terminal 1 Boarding Area B, one of Frontier’s current SFO gate areas. Positions are schematic.'
    },
    IAH: {
      city:'Houston', timezone:'America/Chicago', type:'linear', prefix:'A', gateList:range('A',1,30),
      focus:'Terminal A', caption:'Terminal A · gate activity · schematic positions',
      source:'https://www.fly2houston.com/iah/maps', sourceName:'IAH’s official terminal maps',
      description:'Terminal A gate activity. Numeric live gate values are normalized to A-gates in this view.'
    }
  };

  /* -----------------------------
     HELPERS
     ----------------------------- */

  function el(tag, attrs = {}, content) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k, String(v)));
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function text(tag, cls, content) {
    const node = document.createElement(tag);
    node.className = cls;
    node.textContent = content;
    return node;
  }

  function normalizeGate(value) {
    const raw = String(value || '').trim().toUpperCase().replace(/\s+/g,'');
    if (!raw) return '';

    if (payload.airport === 'MCO' || payload.airport === 'LAX') {
      const simple = raw.match(/^(?:GATE)?(\d{1,3}[A-Z]?)$/);
      return simple ? simple[1].replace(/^0+(?=\d)/,'') : raw.replace(/^GATE/,'');
    }

    if (payload.airport === 'IAH') {
      const numeric = raw.match(/^(?:GATE)?0*(\d{1,2})$/);
      if (numeric) return `A${Number(numeric[1])}`;
    }

    const match = raw.match(/^(?:GATE)?([A-Z])0*(\d{1,3})([A-Z]?)$/);
    return match ? `${match[1]}${Number(match[2])}${match[3]}` : '';
  }

  function gateNumber(gate) {
    const m = String(gate).match(/(\d+)/);
    return m ? Number(m[1]) : 0;
  }

  function conciseStatus(f) {
    const raw = String(f?.status || '').toLowerCase();
    if (raw.includes('cancel')) return {label:'CANCELLED', cls:'is-cancelled'};
    if (raw.includes('arrived')) return {label:'ARRIVED', cls:'is-arrived'};
    if (raw.includes('in air') || raw.includes('airborne')) return {label:'IN AIR', cls:'is-in-air'};
    if (raw.includes('departed')) return {label:'DEPARTED', cls:'is-departed'};
    if (f?.delayed || raw.includes('delay')) return {label:'DELAYED', cls:'is-delayed'};
    if (raw.includes('boarding')) return {label:'BOARDING', cls:'is-boarding'};
    if (raw.includes('closed')) return {label:'CLOSED', cls:'is-closed'};
    if (raw.includes('stale') || raw.includes('unavailable')) return {label:'STATUS PENDING', cls:'is-pending'};
    return {label:'ON TIME', cls:'is-on-time'};
  }

  function flightAwareUrl(f) {
    const digits = String(f?.flight || '').match(/(?:F9|FFT)?\s*(\d{1,4})/i)?.[1];
    return digits ? `https://www.flightaware.com/live/flight/FFT${digits}` : '';
  }

  function openFlightAware(f) {
    const url = flightAwareUrl(f);
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function card(f) {
    const box = document.createElement('a');
    box.className = 'den-map-flight' + (f.delayed ? ' den-map-amber' : '');
    box.href = flightAwareUrl(f) || '#';
    box.target = '_blank';
    box.rel = 'noopener noreferrer';
    box.setAttribute('aria-label', `Open ${String(f.flight).replace(/\s+/g,'')} on FlightAware`);
    box.append(text('strong', '', `${String(f.flight).replace(/\s+/g,'')} · ${f.kind === 'arrival' ? 'From' : 'To'} ${f.route}`));
    const clock = Number.isFinite(f.instant)
      ? new Intl.DateTimeFormat('en-US', {timeZone:layout.timezone, month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}).format(new Date(f.instant)) + ` ${payload.airport} time`
      : `Arrival time unavailable · leaves ${f.origin} at ${f.originTime} (origin local time)`;
    box.append(text('span', '', `${f.kind === 'arrival' ? 'Arrival' : 'Departure'} · ${clock}`));
    box.append(text('span', '', `${f.gate ? 'Gate ' + normalizeGate(f.gate) : (f.kind === 'arrival' ? 'Arrival gate unavailable' : 'Gate unavailable')} · ${f.status}${f.gate && !f.fresh ? ' · gate unconfirmed' : ''}`));
    return box;
  }

  function showDetails() {
    details.replaceChildren();
    if (!selected) {
      details.append(text('p', '', 'Select a gate marker to see its scheduled and cached Frontier activity.'));
      return;
    }
    const flights = payload.flights.filter(f => normalizeGate(f.gate) === selected && (filter === 'all' || f.kind === filter));
    details.append(text('h4', '', `${selected} · ${flights.length} flight${flights.length === 1 ? '' : 's'}`));
    if (!flights.length) details.append(text('p', '', 'No matching Frontier flight is currently attached to this gate.'));
    flights.forEach(f => details.append(card(f)));
  }

  function select(gate) {
    selected = gate;
    signature = '';
    draw();
  }

  function centerMap(smooth = false) {
    if (!scroller || !root.open) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      if (!max) return;
      scroller.scrollTo({left:max / 2, behavior:smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'});
      centerPending = false;
    }));
  }

  function addGate(gate, x, y, ax, ay, side) {
    gates.push({gate, x, y, ax, ay, side: side || (y < ay ? 'top' : 'bottom')});
  }

  function ensureLiveGates(baseGates, flights) {
    const map = new Map(baseGates.map(g => [g.gate, g]));
    const missing = [...new Set(flights.map(f => normalizeGate(f.gate)).filter(Boolean))].filter(g => !map.has(g));
    return {map, missing};
  }

  function focusedGateList(base, flights, preferred = [], radius = 1) {
    const active = [...new Set(flights.map(f => normalizeGate(f.gate)).filter(Boolean))];
    const seeds = [...new Set([...active.filter(g => base.includes(g)), ...preferred.filter(g => base.includes(g))])];
    if (!seeds.length) return [...base];
    const keep = new Set();
    seeds.forEach(seed => {
      const index = base.indexOf(seed);
      if (index < 0) return;
      for (let i = Math.max(0, index - radius); i <= Math.min(base.length - 1, index + radius); i++) keep.add(base[i]);
    });
    active.filter(g => !base.includes(g)).forEach(g => keep.add(g));
    return [...keep].sort((a,b) => gateNumber(a)-gateNumber(b) || a.localeCompare(b));
  }

  function linearLayout(config, flights) {
    gates = [];
    const base = [...config.gateList];
    const all = focusedGateList(base, flights, config.preferredGates || [], config.contextRadius ?? 1);

    const width = 1260;
    const left = 90, right = 1170, centerY = 300;
    svg.setAttribute('viewBox', `0 0 ${width} 600`);
    svg.append(el('rect',{x:65,y:centerY-34,width:1130,height:68,rx:18,class:'den-map-terminal-body'}));
    svg.append(el('text',{x:630,y:centerY+5,'text-anchor':'middle',class:'den-map-concourse'}, config.focus.toUpperCase()));
    svg.append(el('text',{x:630,y:566,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Schematic gate activity · not a navigation map'));

    const span = right-left;
    all.forEach((gate,i) => {
      const x = all.length === 1 ? 630 : left + span*i/(all.length-1);
      const top = i % 2 === 0;
      const ay = top ? centerY-34 : centerY+34;
      const y = top ? 210 : 390;
      svg.append(el('circle',{cx:x,cy:ay,r:3,class:'den-map-door'}));
      addGate(gate,x,y,x,ay,top?'top':'bottom');
    });
  }

  function drawDEN() {
    gates = denGates.map(g=>({...g, x:g.ax, y:g.ay}));
    svg.setAttribute('viewBox','0 0 1200 565');
    const body = {class:'den-map-terminal-body'};
    svg.append(el('path', {...body, d:'M 35 298 L 265 298 L 345 187 L 390 187 L 390 175 L 1110 175 L 1110 245 L 1060 245 L 1060 232 L 1025 232 L 1025 245 L 955 245 L 955 232 L 900 232 L 900 245 L 815 245 L 815 232 L 760 232 L 760 245 L 600 245 L 600 232 L 390 232 L 390 215 L 362 215 L 281 326 L 35 326 Z'}));
    svg.append(el('path', {...body, d:'M 35 326 L 125 326 L 125 346 L 275 346 L 275 335 L 300 335 L 300 346 L 545 346 L 545 337 L 565 337 L 565 350 L 660 350 L 660 375 L 677 375 L 677 405 L 655 405 L 655 438 L 535 438 L 535 411 L 510 411 L 510 388 L 300 388 L 300 399 L 275 399 L 275 388 L 125 388 L 125 405 L 35 405 Z'}));
    svg.append(el('text',{x:720,y:208,'text-anchor':'middle',class:'den-map-concourse'},'NORTH CORRIDOR · A71–A84'));
    svg.append(el('text',{x:720,y:225,'text-anchor':'middle',class:'den-map-subtext'},'A-East ground boarding · Level 1'));
    svg.append(el('text',{x:400,y:369,'text-anchor':'middle',class:'den-map-concourse'},'SOUTH CORRIDOR'));
    svg.append(el('text',{x:165,y:455,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'← Concourse core / train'));
  }

  function drawATL(flights) {
    gates = [];
    svg.setAttribute('viewBox','0 0 1200 620');
    const concourses = [{name:'T',max:21,split:8},{name:'A',max:34,split:18},{name:'B',max:36,split:18},{name:'C',max:57,split:22},{name:'D',max:46,split:20},{name:'E',max:42,split:18},{name:'F',max:14,split:10}];
    svg.append(el('path',{d:'M 68 300 H 1120',stroke:'rgba(186,201,190,.95)','stroke-width':18,fill:'none'}));
    svg.append(el('text',{x:595,y:585,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'PLANE TRAIN · Domestic terminal ← T — A — B — C — D — E — F → International terminal'));
    concourses.forEach((c,i) => {
      const x = 100 + i*155;
      svg.append(el('rect',{x:x-15,y:92,width:30,height:410,rx:10,class:'den-map-terminal-body'}));
      svg.append(el('text',{x,y:68,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},c.name));
      const assigned = [...new Set(flights.map(f=>normalizeGate(f.gate)))].filter(g => g.startsWith(c.name));
      const nums = new Set();
      assigned.forEach(g => { const n=gateNumber(g); for(let d=-1;d<=1;d++) if(n+d>=1 && n+d<=c.max) nums.add(n+d); });
      [...nums].sort((a,b)=>a-b).forEach((n,j,arr) => {
        const top = n > c.split;
        const ay = top ? 250 - 135*(n-c.split)/Math.max(1,c.max-c.split) : 330 + 150*(c.split-n)/Math.max(1,c.split-1);
        const xOut = x + (j%2===0 ? 58 : -58);
        addGate(`${c.name}${n}`,xOut,ay,x+(xOut>x?15:-15),ay,xOut>x?'right':'left');
      });
    });
  }

  function drawLAS(flights) {
    gates = [];
    svg.setAttribute('viewBox','0 0 1200 820');
    svg.append(el('path',{d:'M 590 270 L 255 105 M 590 270 L 925 105 M 590 270 L 255 435 M 590 270 L 925 435',class:'den-map-terminal-line'}));
    svg.append(el('path',{d:'M 590 270 L 255 105 M 590 270 L 925 105 M 590 270 L 255 435 M 590 270 L 925 435',class:'den-map-terminal-line-inner'}));
    svg.append(el('circle',{cx:590,cy:270,r:62,class:'den-map-terminal-body'}));
    svg.append(el('text',{x:590,y:266,'text-anchor':'middle',class:'den-map-concourse'},'D GATES'));
    svg.append(el('text',{x:590,y:286,'text-anchor':'middle',class:'den-map-subtext'},'Satellite core'));
    svg.append(el('path',{d:'M 590 332 V 565',class:'den-map-connector'}));
    svg.append(el('rect',{x:160,y:605,width:880,height:54,rx:12,class:'den-map-terminal-body'}));
    svg.append(el('text',{x:600,y:638,'text-anchor':'middle',class:'den-map-concourse'},'TERMINAL 3 · E GATES'));

    const activeLAS = new Set(flights.map(f => normalizeGate(f.gate)).filter(Boolean));
    const focusNumbers = (prefix, numbers) => {
      const names = numbers.map(n => `${prefix}${n}`);
      const active = names.filter(g => activeLAS.has(g));
      if (!active.length) return numbers;
      const keep = new Set();
      active.forEach(g => {
        const idx = names.indexOf(g);
        for (let j=Math.max(0,idx-1); j<=Math.min(names.length-1,idx+1); j++) keep.add(numbers[j]);
      });
      return numbers.filter(n => keep.has(n));
    };

    const addArm = (numbers, x2, y2, startSide = 1) => {
      numbers.forEach((n,i) => {
        const t = .28 + .66 * i / Math.max(1, numbers.length - 1);
        const cx = 590 + (x2 - 590) * t;
        const cy = 270 + (y2 - 270) * t;
        const dx = x2 - 590, dy = y2 - 270;
        const len = Math.hypot(dx,dy) || 1;
        const side = ((i + startSide) % 2 ? 1 : -1);
        const nx = -dy / len, ny = dx / len;
        const ax = cx + nx * 28 * side;
        const ay = cy + ny * 28 * side;
        addGate(`D${n}`, ax, ay, ax, ay, 'auto');
      });
    };
    addArm(focusNumbers('D',[50,51,52,53,54,55,56,57,58,59]),255,105,0);
    addArm(focusNumbers('D',[16,17,18,19,20,21,22,24,25,26]),925,105,1);
    addArm(focusNumbers('D',[32,33,34,35,36,37,38,39,40,41,42,43]),255,435,1);
    addArm(focusNumbers('D',[1,2,3,4,5,6,7,8,9,10,11,12,14]),925,435,0);

    const eNumsBase=[15,14,12,11,10,9,8,7,6,5,4,3,2,1];
    const eNums=focusNumbers('E',eNumsBase);
    eNums.forEach((n)=>{
      const baseIndex=eNumsBase.indexOf(n);
      const x=190+baseIndex*(820/(eNumsBase.length-1));
      const top=baseIndex%2===0;
      addGate(`E${n}`,x,top?605:659,x,top?605:659,top?'top':'bottom');
    });
  }

  function drawSTL() {
    gates = [];
    svg.setAttribute('viewBox','0 0 820 430');

    /* Current STL Terminal 1 map: C16/C18/C24 are on the upper side of
       this section; C15/C17/C19/C23 are on the lower side. We crop to
       Frontier C19/C23 plus immediate neighbors so the activity is readable. */
    svg.append(el('path',{d:'M 85 215 H 735',class:'den-map-terminal-line-stl'}));
    svg.append(el('path',{d:'M 85 215 H 735',class:'den-map-terminal-line-stl-inner'}));
    svg.append(el('text',{x:410,y:222,'text-anchor':'middle',class:'den-map-concourse'},'C CONCOURSE · FRONTIER AREA'));
    svg.append(el('text',{x:92,y:165,'text-anchor':'start',class:'den-map-subtext den-map-outside'},'← TO MAIN TERMINAL'));

    addGate('C17',230,247,230,247,'bottom');
    addGate('C18',315,183,315,183,'top');
    addGate('C19',405,247,405,247,'bottom');
    addGate('C23',545,247,545,247,'bottom');
    addGate('C24',630,183,630,183,'top');

    svg.append(el('text',{x:410,y:395,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Frontier gates C19 and C23 · adjacent gates shown for context'));
  }

  function drawLAX(flights) {
    linearLayout(layout, flights);
    svg.querySelector('.den-map-concourse').textContent='TOM BRADLEY INTERNATIONAL TERMINAL · MAIN GATES 130–159';
    const west = [...new Set(flights.map(f=>normalizeGate(f.gate)).filter(g=>/^2\d\d[A-Z]?$/.test(g)))];
    if (west.length) {
      svg.append(el('text',{x:630,y:70,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},'WEST GATES AT TOM BRADLEY · LIVE REPORTED ASSIGNMENTS'));
      west.forEach((g,i)=>{
        const x=250+i*(760/Math.max(1,west.length-1));
        addGate(g,x,112,x,145,'top');
      });
    }
  }

  function buildGeometry(flights) {
    if (layout.type === 'den') drawDEN();
    else if (layout.type === 'atl') drawATL(flights);
    else if (layout.type === 'las') drawLAS(flights);
    else if (layout.type === 'stl') drawSTL();
    else if (layout.type === 'lax') drawLAX(flights);
    else linearLayout(layout, flights);
  }

  const PLANE_PATH = 'M 0 -22 C -3 -22 -4 -18 -4 -12 L -4 -3 L -20 7 L -20 12 L -4 7 L -4 17 L -10 22 L -10 25 L 0 22 L 10 25 L 10 22 L 4 17 L 4 7 L 20 12 L 20 7 L 4 -3 L 4 -12 C 4 -18 3 -22 0 -22 Z';
  const AIRBORNE_PLANE_PATH = 'M -22 2 L -7 2 L 3 -6 L 8 -6 L 4 2 L 18 2 C 21 2 23 4 24 6 C 20 8 15 9 10 9 L 3 9 L -3 15 L -7 15 L -4 9 L -17 9 Z';

  function viewBoxSize() {
    const parts=(svg.getAttribute('viewBox')||'0 0 1200 600').split(/\s+/).map(Number);
    return {w:parts[2]||1200,h:parts[3]||600};
  }

  function overlaps(a,b,pad=7) {
    return !(a.x+a.w+pad<=b.x || b.x+b.w+pad<=a.x || a.y+a.h+pad<=b.y || b.y+b.h+pad<=a.y);
  }

  function chooseBubble(g, placed, reserved) {
    const {w:vw,h:vh}=viewBoxSize();
    const w=118,h=74,x=g.ax,y=g.ay;

    /* The bubble should open AWAY from the terminal edge:
       top-side gate -> bubble above; bottom-side gate -> bubble below.
       Left/right are used on a few schematic concourses. */
    let candidates;
    if (g.side === 'bottom') {
      candidates=[
        {x:x-w/2,y:y+36},
        {x:x-w-24,y:y+36}, {x:x+24,y:y+36},
        {x:x-w/2,y:y+h+48},
        {x:x-w-34,y:y-h/2}, {x:x+34,y:y-h/2},
        {x:x-w/2,y:y-h-36}
      ];
    } else if (g.side === 'left') {
      candidates=[
        {x:x-w-36,y:y-h/2},
        {x:x-w-36,y:y-h-28},{x:x-w-36,y:y+28},
        {x:x+36,y:y-h/2},
        {x:x-w/2,y:y-h-36},{x:x-w/2,y:y+36}
      ];
    } else if (g.side === 'right') {
      candidates=[
        {x:x+36,y:y-h/2},
        {x:x+36,y:y-h-28},{x:x+36,y:y+28},
        {x:x-w-36,y:y-h/2},
        {x:x-w/2,y:y-h-36},{x:x-w/2,y:y+36}
      ];
    } else {
      /* top and auto default upward */
      candidates=[
        {x:x-w/2,y:y-h-36},
        {x:x-w-24,y:y-h-36}, {x:x+24,y:y-h-36},
        {x:x-w/2,y:y-h*2-48},
        {x:x-w-34,y:y-h/2}, {x:x+34,y:y-h/2},
        {x:x-w/2,y:y+36}
      ];
    }

    const blocked = [...placed, ...reserved];
    for(let ring=0;ring<8;ring++){
      for(let i=0;i<candidates.length;i++){
        const c={...candidates[i],w,h};
        if(ring){
          /* Nudge primarily along the terminal so cards spread horizontally
             before they jump to the opposite side of the map. */
          if (g.side === 'left' || g.side === 'right') c.y += (ring%2?1:-1)*ring*34;
          else c.x += (ring%2?1:-1)*ring*38;
        }
        c.x=Math.max(8,Math.min(vw-w-8,c.x));
        c.y=Math.max(8,Math.min(vh-h-8,c.y));
        if(!blocked.some(p=>overlaps(c,p,9)))return c;
      }
    }

    /* Last resort: scan the preferred half of the map instead of covering
       another gate marker. */
    const startY = g.side === 'bottom' ? Math.min(vh-h-10, y+36) : 10;
    const endY = g.side === 'bottom' ? vh-h-10 : Math.max(10,y-h-36);
    for(let y0=startY; y0<=endY; y0+=h+10){
      for(let x0=10;x0<=vw-w-10;x0+=w+10){
        const c={x:x0,y:y0,w,h};
        if(!blocked.some(p=>overlaps(c,p,9)))return c;
      }
    }
    return {x:Math.max(8,Math.min(vw-w-8,x-w/2)),y:Math.max(8,Math.min(vh-h-8,g.side==='bottom'?y+36:y-h-36)),w,h};
  }

  function representativeFlight(at) {
    const sorted=[...at].sort((a,b)=>(a.instant??Infinity)-(b.instant??Infinity));
    return sorted.find(f=>/boarding|gate closed/i.test(String(f.status))) || sorted.find(f=>!f.finished) || sorted[sorted.length-1] || null;
  }

  function renderGate(g, at, bubbleBox) {
    const f=representativeFlight(at), occupied=!!f;
    const markerX=g.ax, markerY=g.ay;
    const markerW=Math.max(54,28+String(g.gate).length*9), markerH=26;
    const group=el('g',{
      role:'button',tabindex:0,'data-gate':g.gate,
      'aria-label':`${g.gate}, ${at.length} flight${at.length===1?'':'s'}${f?', '+String(f.flight).replace(/\s+/g,'')+', '+conciseStatus(f).label:', no current Frontier activity'}`,
      'aria-pressed':selected===g.gate,class:`den-map-gate${occupied?' is-occupied':''}`
    });
    group.append(el('rect',{x:markerX-markerW/2,y:markerY-markerH/2,width:markerW,height:markerH,rx:5,class:'den-map-gate-marker'}));
    group.append(el('text',{x:markerX-markerW/2+11,y:markerY+4,'text-anchor':'middle',class:'den-map-gate-plane'},'✈'));
    group.append(el('text',{x:markerX+8,y:markerY+5,'text-anchor':'middle',class:'den-map-gate-name'},g.gate));

    if(f&&bubbleBox){
      const b=bubbleBox,status=conciseStatus(f);
      const tx=Math.max(b.x+8,Math.min(b.x+b.w-8,markerX));
      const ty=Math.max(b.y+8,Math.min(b.y+b.h-8,markerY));
      group.append(el('line',{x1:markerX,y1:markerY,x2:tx,y2:ty,class:'den-map-pin'}));
      group.append(el('circle',{cx:tx,cy:ty,r:2.3,class:'den-map-pin-dot'}));
      const bubble=el('g',{
        class:`den-map-info-card${f.kind==='arrival'&&!f.finished?' den-map-incoming':''}`,
        role:'link',tabindex:0,'aria-label':`Open ${String(f.flight).replace(/\s+/g,'')} on FlightAware`
      });
      bubble.append(el('title',{},`Open ${String(f.flight).replace(/\s+/g,'')} on FlightAware`));
      bubble.append(el('rect',{x:b.x,y:b.y,width:b.w,height:b.h,rx:13,class:'den-map-flight-bubble'}));
      bubble.append(el('text',{x:b.x+11,y:b.y+20,class:'den-map-flight-number'},String(f.flight).replace(/\s+/g,'')));
      bubble.append(el('text',{x:b.x+11,y:b.y+40,class:'den-map-flight-route'},`${f.kind==='arrival'?'FROM':'TO'} ${f.route}`));
      bubble.append(el('text',{x:b.x+11,y:b.y+61,class:`den-map-flight-status ${status.cls}`},status.label));

      const px=b.x+b.w-22,py=b.y+b.h/2;
      if (status.cls === 'is-in-air') {
        const airborne=el('g',{transform:`translate(${px} ${py-1}) scale(.58)`,class:'den-map-airborne-icon'});
        airborne.append(el('circle',{cx:-13,cy:11,r:6,class:'den-map-cloud'}));
        airborne.append(el('circle',{cx:-6,cy:8,r:8,class:'den-map-cloud'}));
        airborne.append(el('circle',{cx:2,cy:11,r:6,class:'den-map-cloud'}));
        airborne.append(el('path',{d:AIRBORNE_PLANE_PATH,class:'den-map-airborne-plane'}));
        bubble.append(airborne);
      } else {
        const plane=el('g',{transform:`translate(${px} ${py}) scale(.52)`,class:f.finished?'den-map-left':''});
        plane.append(el('path',{d:PLANE_PATH,class:'den-map-plane-outline'}));
        if((f.progress||0)>0){
          const amount=Math.max(0,Math.min(1,f.progress));
          const clipId=`gate-plane-${payload.airport}-${String(g.gate).replace(/[^A-Z0-9]/g,'')}`;
          let defs=svg.querySelector('defs');if(!defs){defs=el('defs');svg.insertBefore(defs,svg.firstChild);}
          const clip=el('clipPath',{id:clipId});clip.append(el('path',{d:PLANE_PATH}));defs.append(clip);
          plane.append(el('rect',{x:-22,y:25-47*amount,width:44,height:47*amount,class:'den-map-plane-fill','clip-path':`url(#${clipId})`}));
          plane.append(el('path',{d:PLANE_PATH,class:'den-map-plane-outline is-top'}));
        }
        bubble.append(plane);
      }
      const open = e => {e.stopPropagation();openFlightAware(f);};
      bubble.addEventListener('click', open);
      bubble.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(e);}});
      group.append(bubble);
    }
    group.addEventListener('click',()=>select(g.gate));
    group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(g.gate);}});
    svg.append(group);
  }

  /* -----------------------------
     DRAW
     ----------------------------- */

  function draw() {
    const flights = payload.flights.filter(f => filter === 'all' || f.kind === filter);
    const next = JSON.stringify([
      payload.airport, filter, selected, payload.loading, payload.missing,
      flights.map(f=>({...f,progress:Math.floor((f.progress||0)*25)/25}))
    ]);
    if (next === signature) return;
    signature = next;

    const focusedGate = document.activeElement?.getAttribute('data-gate');
    svg.replaceChildren(
      el('title',{},`Frontier ${payload.airport} gate activity`),
      el('desc',{},layout.description+' Yellow gate signs have current mapped Frontier activity; sage signs do not. Activity is not aircraft tracking.')
    );

    buildGeometry(flights);

    const gateData = gates.map(g => ({g, at:flights.filter(f => normalizeGate(f.gate) === g.gate)}));

    /* Reserve every gate sign before placing any information card. This means
       a flight card is never allowed to cover a neighboring gate number. */
    const reserved = gateData.map(({g}) => {
      const markerW=Math.max(54,28+String(g.gate).length*9), markerH=26;
      return {x:g.ax-markerW/2,y:g.ay-markerH/2,w:markerW,h:markerH};
    });

    const placed = [];
    const bubbleByGate = new Map();
    for (const item of gateData.filter(item => representativeFlight(item.at))) {
      const box = chooseBubble(item.g, placed, reserved);
      placed.push(box);
      bubbleByGate.set(item.g.gate, box);
    }
    for (const {g,at} of gateData) renderGate(g, at, bubbleByGate.get(g.gate));

    const offMap = flights.filter(f => !gates.some(g => g.gate === normalizeGate(f.gate)));
    unplaced.replaceChildren();
    offMap.forEach(f => unplaced.append(card(f)));
    if (!offMap.length) unplaced.append(text('p','','All displayed flights have gates in this schematic.'));

    const title = document.getElementById('denMapUnplacedTitle');
    if (title) title.textContent = `${offMap.length} flight${offMap.length===1?'':'s'} without a mapped gate`;

    const mapped = flights.length - offMap.length;
    const summary = document.getElementById('denMapSummary');
    if (summary) summary.textContent = payload.loading
      ? 'Loading the existing schedule…'
      : `${mapped} flight${mapped===1?'':'s'} with mapped gates · ${offMap.length} awaiting gate details or outside ${layout.focus}.${payload.missing?' Some schedule snapshots are unavailable.':''}`;

    showDetails();
    if (focusedGate) svg.querySelector(`[data-gate="${focusedGate}"]`)?.focus({preventScroll:true});
    if (centerPending && root.open) centerMap(false);
  }

  root.querySelectorAll('[data-map-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.mapFilter;
    root.querySelectorAll('[data-map-filter]').forEach(b => b.setAttribute('aria-pressed', b === button ? 'true' : 'false'));
    signature = '';
    draw();
  }));

  root.addEventListener('toggle',()=>{
    if (root.open) {
      centerPending = true;
      centerMap(false);
    }
  });

  /* Keep the historical global name so the existing dashboard integration remains compatible. */
  window.FrontierDENGateMap = {
    update(next) {
      const airportChanged = payload.airport !== next.airport;
      payload = next;
      root.hidden = !airportMaps[next.airport];
      if (root.hidden) return;

      layout = airportMaps[next.airport];
      gates = [];

      if (airportChanged) {
        selected = '';
        filter = 'all';
        signature = '';
        centerPending = true;
        root.querySelectorAll('[data-map-filter]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mapFilter === 'all' ? 'true' : 'false'));
        root.open = false;
      }

      const mapTitle = document.getElementById('denMapTitle');
      if (mapTitle) mapTitle.textContent = `${layout.city} gate activity`;
      const desc = document.getElementById('gateMapDescription');
      if (desc) desc.textContent = `Explore Frontier arrivals, departures, and gate activity at ${layout.city}.`;
      const caption = document.getElementById('gateMapCaption');
      if (caption) caption.textContent = layout.caption;
      const source = document.getElementById('gateMapSource');
      if (source) { source.href = layout.source; source.textContent = layout.sourceName; }
      svg.setAttribute('aria-label', `${layout.city} gate area focused on ${layout.focus}. Select a gate for flight details.`);
      draw();
    }
  };
})();
