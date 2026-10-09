/* =========================================================
   HOWTOGOWILD — FRONTIER GATE ACTIVITY MAP
   Full replacement for gatemap.js · refined gate neighborhoods

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
  let mapWidthRatio = 1;
  let geometryReservations = [];
  const originalSVGWidth = svg.style.width;

  /* Keep SVG units at their original scale when any airport needs extra space.
     Restore the stylesheet width first so responsive sizing still applies. */
  function resizeExpandedMap() {
    svg.style.width = originalSVGWidth;
    if (mapWidthRatio <= 1 || !root.open) return;
    const baseWidth = svg.getBoundingClientRect().width;
    if (baseWidth > 0) svg.style.width = `${baseWidth * mapWidthRatio}px`;
  }

  if (scroller && 'ResizeObserver' in window) {
    new ResizeObserver(resizeExpandedMap).observe(scroller);
  } else {
    window.addEventListener('resize', resizeExpandedMap);
  }

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
      city:'Atlanta', timezone:'America/New_York', type:'atl', focus:'reported Frontier concourses',
      caption:'Frontier gate neighborhoods · spacing expanded for readable flight cards',
      source:'https://www.atl.com/maps/', sourceName:'ATL’s official airport maps',
      description:'Only concourses with reported Frontier activity are expanded. Other concourses appear in a small Plane Train overview. Gate spacing is schematic and expanded for readability.'
    },
    LAS: {
      city:'Las Vegas', timezone:'America/Los_Angeles', type:'las', focus:'D and E gates',
      caption:'D satellite / Terminal 3 · Frontier gate neighborhoods',
      source:'https://www.harryreidairport.com/map', sourceName:'LAS’s official airport maps',
      description:'D satellite and Terminal 3 are distinct gate areas connected by tram. Only reported Frontier wings and nearby gates are labeled.'
    },
    MCO: {
      city:'Orlando', timezone:'America/New_York', type:'linear', prefix:'', gateList:Array.from({length:29},(_,i)=>String(i+1)),
      focus:'Airside 1 · gates 1–29', caption:'Airside 1 · three gate wings · approximate positions',
      source:'https://flymco.com/terminal-maps/', sourceName:'MCO’s official terminal maps',
      description:'Airside 1 three-wing footprint, with only reported Frontier gate neighborhoods labeled. Gate positions are approximate.'
    },
    PHX: {
      city:'Phoenix', timezone:'America/Phoenix', type:'linear', prefix:'F', gateList:range('F',1,15),
      focus:'Terminal 3 · F1–F15', caption:'Terminal 3 · south F concourse · Frontier gate neighborhoods',
      source:'https://www.skyharbor.com/maps-directions/', sourceName:'PHX’s official airport maps',
      description:'Terminal 3 south F concourse with its widened west end and gates on their approximate terminal edges.'
    },
    DFW: {
      city:'Dallas / Fort Worth', timezone:'America/Chicago', type:'linear', prefix:'E', gateList:range('E',2,38,[19]),
      focus:'Terminal E · E2–E38', caption:'Terminal E · curved main concourse + separate satellite',
      source:'https://www.dfwairport.com/map/', sourceName:'DFW’s official interactive map',
      description:'Terminal E is represented by a curved main concourse and a separate E22–E30 satellite. Gate neighborhoods follow reported Frontier assignments. Relative positions are approximate.'
    },
    TPA: {
      city:'Tampa', timezone:'America/New_York', type:'linear', prefix:'E', gateList:['E69','E70','E71','E72','E73','E74','E75'],
      focus:'Airside E · Frontier area', caption:'Airside E · Frontier gate area · schematic positions',
      source:'https://www.tampaairport.com/airport-maps', sourceName:'TPA’s official airport maps',
      description:'Airside E Frontier area, centered on gates E71 and E73–E75 with adjacent gates for context.',
      preferredGates:['E71','E73','E74','E75'], contextRadius:1
    },
    SJU: {
      city:'San Juan', timezone:'America/Puerto_Rico', type:'linear', prefix:'C', gateList:range('C',1,10),
      focus:'Terminal C · C gates', caption:'Terminal C · widened gate pier · approximate positions',
      source:'https://aeropuertosju.com/mapas/', sourceName:'SJU airport maps',
      description:'Terminal C gate pier with a wider outer end. Known gate positions are approximate; unknown assignments remain in the flight list.'
    },
    ORD: {
      city:'Chicago O’Hare', timezone:'America/Chicago', type:'linear', prefix:'M', gateList:range('M',20,40),
      focus:'Terminal 5 · M gates', caption:'Terminal 5 · bent M concourse · approximate positions',
      source:'https://www.flychicago.com/ohare/map/Pages/default.aspx', sourceName:'O’Hare’s official maps',
      description:'Terminal 5 has a bent west concourse and widened far end. Reported Frontier gates and nearby context gates are shown.'
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
      focus:'Tom Bradley International Terminal', caption:'Terminal B · main / West Gates · approximate positions',
      source:'https://www.flylax.com/terminals/tom-bradley-international-terminal', sourceName:'LAX’s official TBIT information',
      description:'TBIT main and West Gates are separate buildings joined by a passenger tunnel. Only buildings with mapped Frontier activity are expanded.'
    },
    SFO: {
      city:'San Francisco', timezone:'America/Los_Angeles', type:'linear', prefix:'B', gateList:range('B',1,27),
      focus:'Harvey Milk Terminal 1 · B gates', caption:'Harvey Milk Terminal 1 · B gates · approximate positions',
      source:'https://www.flysfo.com/maps/static-maps', sourceName:'SFO’s official terminal maps',
      description:'Boarding Area B has a diagonal approach and long gate pier. Only reported Frontier gates and their immediate neighbors are labeled.'
    },
    IAH: {
      city:'Houston', timezone:'America/Chicago', type:'linear', prefix:'A', gateList:range('A',1,30),
      focus:'Terminal A', caption:'Terminal A · north / south piers · approximate positions',
      source:'https://www.fly2houston.com/iah/map/', sourceName:'IAH’s official terminal maps',
      description:'Terminal A north and south gate piers are separate. Only reported Frontier neighborhoods are labeled; unverified gate positions remain in the flight list.'
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

    if (['IAH','DFW','TPA','PHX','SJU','ORD','SFO','STL'].includes(payload.airport)) {
      const numeric = raw.match(/^(?:GATE)?0*(\d{1,2})$/);
      if (numeric) {
        const prefix = {IAH:'A',DFW:'E',TPA:'E',PHX:'F',SJU:'C',ORD:'M',SFO:'B',STL:'C'}[payload.airport];
        return `${prefix}${Number(numeric[1])}`;
      }
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
      if (!max) { centerPending = false; return; }
      scroller.scrollTo({left:max / 2, behavior:smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'});
      centerPending = false;
    }));
  }

  function addGate(gate, x, y, ax, ay, side) {
    gates.push({gate, x, y, ax, ay, side: side || (y < ay ? 'top' : 'bottom')});
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

  /* Fixed footprints. Coordinates are illustrative, not surveyed distances.
     Gate hiding never redistributes the remaining gates along a line.
     Each neighborhood includes at most two closest context gates on its pier.
     Unknown gates are deliberately left in the existing unplaced-flight list. */
  const footprint = {};
  const point = (gate,x,y,side='top',pier='main') => ({gate,ax:x,ay:y,x,y,side,pier});
  function edge(prefix,numbers,x1,y1,x2,y2,side,pier='main') {
    return numbers.map((n,i) => {
      const t = numbers.length === 1 ? .5 : i/(numbers.length-1);
      return point(`${prefix}${n}`,x1+(x2-x1)*t,y1+(y2-y1)*t,side,pier);
    });
  }
  function path(d,opacity=1) {
    svg.append(el('path',{d,class:'den-map-terminal-body',opacity}));
  }
  function note(x,y,label) {
    svg.append(el('text',{x,y,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},label));
  }
  function neighborhood(all,flights,preferred=[]) {
    const names=new Set([...flights.map(f=>normalizeGate(f.gate)).filter(Boolean),...preferred]);
    const seeds=all.filter(g=>names.has(g.gate));
    const keep=new Set(seeds.map(g=>g.gate));
    seeds.forEach(seed=>{
      all.filter(g=>g.gate!==seed.gate && g.pier===seed.pier)
        .map(g=>({g,d:Math.hypot(g.ax-seed.ax,g.ay-seed.ay)}))
        .sort((a,b)=>a.d-b.d).slice(0,2).forEach(({g})=>keep.add(g.gate));
    });
    return all.filter(g=>keep.has(g.gate)).map(g=>({...g}));
  }

  footprint.DFW = {
    label:'TERMINAL E',
    gates:[
      ...[2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,31,32,33,34,35,36,37,38].map((n,i,arr)=>{
        const a=(-90+180*i/(arr.length-1))*Math.PI/180;
        return point(`E${n}`,300+480*Math.cos(a),570+420*Math.sin(a),a<-.6?'top':a>.6?'bottom':'right','main');
      }),
      ...edge('E',[22,23,24,25],980,1010,1130,830,'left','satellite'),
      ...edge('E',[30,29,28,27,26],1030,1060,1210,845,'right','satellite')
    ],
    draw() {
      path('M 300 150 A 480 420 0 0 1 300 990 L 300 918 A 395 348 0 0 0 300 222 Z');
      if(gates.some(g=>g.pier==='satellite')) {
        path('M 1000 1070 L 950 1015 L 1150 795 L 1215 850 Z');
        svg.append(el('path',{d:'M 678 846 L 968 1020',class:'den-map-connector'}));
      }
    }
  };
  footprint.PHX = {
    label:'TERMINAL 3 · F CONCOURSE',
    gates:[point('F1',1150,310,'right'),point('F2',1150,366,'right'),
      ...edge('F',[3,4,5,6,7,8,9,10],1060,398,160,398,'bottom'),
      point('F11',100,310,'left'),...edge('F',[12,13,14,15],140,215,350,215,'top')],
    draw(){path('M 100 270 L 120 270 L 120 215 L 400 215 L 400 288 L 940 288 L 940 255 L 1020 255 L 1020 288 L 1150 288 L 1150 398 L 100 398 Z');
      svg.append(el('path',{d:'M 980 255 V 120',class:'den-map-connector'}));}
  };
  footprint.SFO = {
    label:'TERMINAL 1 · BOARDING AREA B',
    gates:[point('B1',340,700,'right','approach'),point('B2',340,600,'right','approach'),
      point('B3',230,440,'top','approach'),point('B4',340,510,'right','approach'),point('B5',340,560,'right','approach'),
      point('B6',340,330,'top'),point('B7',420,225,'top'),point('B8',470,225,'top'),
      ...edge('B',[9,12,13,14,17,18,21,22],600,225,1440,225,'top'),
      ...edge('B',[10,11,15,16,19,20,26,27],700,330,1440,330,'bottom'),
      point('B23',1500,255,'right'),point('B24',1500,290,'right'),point('B25',1500,325,'right')],
    draw(){path('M 270 730 L 270 510 L 180 460 L 400 225 L 1500 225 L 1500 330 L 440 330 L 270 495 L 340 545 L 340 730 Z');}
  };
  footprint.SJU = {
    label:'TERMINAL C',
    // The airport's older PDF repeats C3 at the C5 position; C5 is kept
    // unplaced rather than silently correcting the published ambiguity.
    gates:[point('C2',320,350,'bottom'),point('C3',590,260,'top'),point('C4',530,350,'bottom'),
      point('C6',740,350,'bottom'),point('C7',900,205,'top'),point('C8',960,350,'bottom'),
      point('C9',1090,250,'right'),point('C10',1090,320,'right')],
    draw(){path('M 130 430 L 130 260 L 730 260 L 730 205 L 1090 205 L 1090 350 L 210 350 L 210 430 Z');}
  };
  footprint.TPA = {
    label:'AIRSIDE E · FRONTIER AREA',
    gates:[point('E62',710,180,'top'),point('E64',540,150,'top'),point('E65',390,120,'top'),
      ...edge('E',[66,67,68,69,70,71,72],250,160,250,720,'left'),
      ...edge('E',[73,74,75],410,740,720,680,'bottom')],
    draw(){path('M 250 160 L 390 120 L 710 180 L 750 660 L 720 680 L 410 740 L 250 720 Z');
      svg.append(el('path',{d:'M 750 420 H 940',class:'den-map-connector'}));}
  };
  footprint.ORD = {
    label:'TERMINAL 5 · M CONCOURSE',
    gates:[...edge('M',[1,2,3,4,5,6,7,8],1470,360,980,240,'top','east'),
      ...edge('M',[9,10,11,13,14,15],960,225,850,95,'right','core'),
      point('M16',760,95,'top','core'),point('M17',715,145,'left','core'),point('M18',630,200,'left','west'),
      ...edge('M',[19,20,21,24,25,26,27,28,29,30],590,255,125,810,'left','west'),
      ...edge('M',[32,33,34,35,36,37,38,39,40],100,865,260,1025,'bottom','west')],
    draw(){path('M 1470 360 L 960 290 L 820 155 L 680 245 L 190 835 L 185 900 L 275 990 L 260 1025 L 175 1000 L 95 900 L 110 810 L 590 240 L 700 175 L 760 95 L 850 95 L 855 175 L 980 240 L 1470 335 Z');}
  };
  footprint.LAX = {
    label:'TERMINAL B · TOM BRADLEY',
    gates:[...edge('',[159,157,155,153,151],130,820,680,820,'bottom','main-south'),
      ...edge('',[156,154,152,150],210,745,650,745,'top','main-south'),
      ...edge('',[130,132,134],1030,745,1360,745,'top','main-north'),
      ...edge('',[131,133,135],1030,820,1300,820,'bottom','main-north'),
      point('148',850,710,'top','main-south'),point('141',1450,810,'right','main-north'),point('139',1450,890,'right','main-north'),
      ...edge('',[202,204,206,208,210,212],650,200,1450,200,'top','west-north'),
      ...edge('',[201,203,205,207,209,211],650,290,1450,290,'bottom','west-north'),
      ...edge('',[225,221],190,310,430,310,'bottom','west-south'),
      ...edge('',[224,222,220],100,200,390,200,'top','west-south'),
      ...edge('',[231,233,235,237],100,310,390,310,'bottom','west-south')],
    draw(){path('M 130 745 H 740 L 740 710 H 960 L 960 745 H 1450 V 900 H 1300 V 820 H 960 V 960 H 740 V 820 H 130 Z');
      path('M 100 200 H 1450 V 290 H 560 V 310 H 100 Z');
      svg.append(el('path',{d:'M 850 710 V 290',class:'den-map-connector'}));}
  };
  // Only named sub-gates confirmed in the TBIT directory are included.
  ['201','209','210','211','221','225'].forEach(n=>{
    const g=footprint.LAX.gates.find(g=>g.gate===n);
    const suffixes={201:['B'],209:['A','B'],210:['A'],211:['A','B'],221:[],225:[]}[n];
    if(g) suffixes.forEach((s,i)=>footprint.LAX.gates.push({...g,gate:n+s,ax:g.ax+(i?40:-40)}));
  });
  footprint.IAH = {
    label:'TERMINAL A · NORTH / SOUTH PIERS',
    gates:[...edge('A',[1,2,3],900,170,1100,170,'top','north'),
      ...edge('A',[7,8,9,10,11,12,14,15],1100,270,280,270,'bottom','north'),
      ...edge('A',[17,18,19,20],280,540,800,540,'top','south'),
      ...edge('A',[24,25,26,27,29,30],1100,640,280,640,'bottom','south')],
    draw(){path('M 200 170 H 1100 V 270 H 290 V 540 H 1100 V 640 H 200 Z');}
  };
  footprint.MCO = {
    label:'AIRSIDE 1 · THREE GATE WINGS',
    gates:[...edge('',[1,2,3,4,5],210,215,530,215,'top','1-9'),
      ...edge('',[9,8,7,6],210,300,530,300,'bottom','1-9'),
      ...edge('',[10,11,12,13,14],640,205,640,-115,'left','10-19'),
      ...edge('',[19,18,17,16,15],740,205,740,-115,'right','10-19'),
      ...edge('',[20,21,22,23,24],850,215,1200,215,'top','20-29'),
      ...edge('',[29,28,27,26,25],850,300,1200,300,'bottom','20-29')],
    draw(){path('M 210 215 H 600 V -115 H 780 V 215 H 1200 V 300 H 780 V 340 H 600 V 300 H 210 Z');
      svg.append(el('path',{d:'M 690 340 V 470',class:'den-map-connector'}));}
  };

  function drawFootprint(code,flights) {
    const data=footprint[code];
    gates=neighborhood(data.gates,flights,layout.preferredGates||[]);
    const all=gates.length?gates:data.gates;
    const minX=Math.min(...all.map(g=>g.ax))-190,minY=Math.min(...all.map(g=>g.ay))-165;
    const w=Math.max(820,Math.max(...all.map(g=>g.ax))-minX+210);
    const h=Math.max(460,Math.max(...all.map(g=>g.ay))-minY+175);
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    const first=svg.children.length;
    data.draw();
    const body=el('g',{transform:`translate(${-minX} ${-minY})`});
    while(svg.children.length>first) body.append(svg.children[first]);
    svg.append(body);
    gates.forEach(g=>{g.ax-=minX;g.ay-=minY;g.x=g.ax;g.y=g.ay;});
    note(w/2,35,data.label);
    geometryReservations.push({x:0,y:12,w,h:40});
    if (!gates.length) {
      body.setAttribute('opacity','.35');
      note(w/2,h-26,'Waiting for mapped Frontier gate assignments · overview only');
    }
    // A tiny outline preserves DFW's recognizable curve when the activity
    // view is cropped to a short gate neighborhood.
    if(code==='DFW') {
      const key=el('g',{transform:`translate(${w-132} 62) scale(.085)`,opacity:'.6','aria-hidden':'true'});
      key.append(el('path',{d:'M 300 150 A 480 420 0 0 1 300 990 L 300 918 A 395 348 0 0 0 300 222 Z',class:'den-map-terminal-body'}));
      key.append(el('path',{d:'M 1000 1070 L 950 1015 L 1150 795 L 1215 850 Z',class:'den-map-terminal-body'}));
      svg.append(key);geometryReservations.push({x:w-125,y:56,w:125,h:110});
    }
  }

  function drawATL(flights) {
    gates=[];
    const codes=['T','A','B','C','D','E','F'];
    const max={T:21,A:34,B:36,C:57,D:46,E:42,F:14};
    const assigned=[...new Set(flights.map(f=>normalizeGate(f.gate)).filter(Boolean))];
    const active=codes.filter(c=>assigned.some(g=>g.startsWith(c)&&gateNumber(g)>=1&&gateNumber(g)<=max[c]));
    // Horizontal detail panels are rotated relative to the airport overview.
    // ATL's odd and even sides are preserved and spacing is deliberately
    // expanded: 150 units per gate pair, rather than 30-pixel-wide concourses.
    const rows=[];
    active.forEach(c=>{
      const all=range(c,1,max[c]).map(g=>point(g,100+Math.floor((gateNumber(g)-1)/2)*150,gateNumber(g)%2?0:90,gateNumber(g)%2?'top':'bottom',c));
      if(c==='D') ['D1A','D8A','D9A'].forEach(name=>{
        const original=all.find(g=>g.gate===name.slice(0,-1));
        if(original) all.push({...original,gate:name,ax:original.ax+70});
      });
      const visible=neighborhood(all,flights);
      if(!visible.length) return;
      const left=Math.min(...visible.map(g=>g.ax))-170;
      const width=Math.max(800,Math.max(...visible.map(g=>g.ax))-left+180);
      rows.push({c,visible,left,width});
    });
    const w=Math.max(1000,...rows.map(r=>r.width)),h=Math.max(440,270+rows.length*390);
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    // Whole-airport context occupies one small header, not seven full concourses.
    note(w/2,28,'PLANE TRAIN OVERVIEW · expanded Frontier concourses below');
    const keyWidth=630,keyX=(w-keyWidth)/2;
    svg.append(el('path',{d:`M ${keyX} 75 H ${keyX+keyWidth}`,stroke:'#a1b4a6','stroke-width':5,fill:'none',opacity:'.5'}));
    codes.forEach((c,i)=>{
      const x=keyX+45+i*90,hot=active.includes(c);
      svg.append(el('rect',{x:x-7,y:hot?48:62,width:14,height:hot?52:26,rx:4,class:'den-map-terminal-body',opacity:hot?1:.25}));
      svg.append(el('text',{x,y:hot?119:110,'text-anchor':'middle',class:'den-map-subtext den-map-outside',opacity:hot?1:.4},c));
    });
    geometryReservations.push({x:0,y:0,w,h:132});
    rows.forEach(({c,visible,left,width},i)=>{
      const y=360+i*390;
      path(`M 70 ${y} H ${width-65} V ${y+90} H 70 Z`);
      note(width/2,y+51,`CONCOURSE ${c} · FRONTIER GATE NEIGHBORHOOD`);
      geometryReservations.push({x:70,y:y+22,w:width-135,h:46});
      visible.forEach(g=>addGate(g.gate,g.ax-left,y+g.ay,g.ax-left,y+g.ay,g.side));
      // The ends denote a crop, not invented walls at the boundary.
      note(90,y+122,'…');note(width-85,y+122,'…');
    });
    if(!rows.length) note(w/2,260,'Waiting for Frontier gate assignments · concourses expand when reported');
  }

  function drawLAS(flights) {
    const arms=[
      {id:'NW',x:170,y:120,nums:[50,51,52,53,54,55,56,57,58,59]},
      {id:'NE',x:1050,y:120,nums:[16,17,18,19,20,21,22,24,25,26]},
      {id:'SW',x:170,y:600,nums:[32,33,34,35,36,37,38,39,40,41,42,43]},
      {id:'SE',x:1050,y:600,nums:[1,2,3,4,5,6,7,8,9,10,11,12,14]}
    ];
    const all=[];
    arms.forEach(arm=>arm.nums.forEach((n,i)=>{
      const t=.25+.72*i/Math.max(1,arm.nums.length-1),dx=arm.x-610,dy=arm.y-360,len=Math.hypot(dx,dy),s=i%2?1:-1;
      const x=610+dx*t-dy/len*38*s,y=360+dy*t+dx/len*38*s;
      all.push(point(`D${n}`,x,y,y<360?'top':'bottom',arm.id));
    }));
    all.push(...edge('E',[15,14,12,11,10,9,8,7,6,5,4,3,2,1],160,830,1080,830,'bottom','E'));
    gates=neighborhood(all,flights);
    svg.setAttribute('viewBox','0 0 1220 1050');
    const livePiers=new Set(gates.map(g=>g.pier));
    arms.forEach(a=>{
      const hot=livePiers.has(a.id);
      // Unused wings are shortened and faint; their gate labels are omitted.
      const t=hot?1:.32,x=610+(a.x-610)*t,y=360+(a.y-360)*t;
      svg.append(el('path',{d:`M 610 360 L ${x} ${y}`,class:'den-map-terminal-line',opacity:hot?1:.2}));
      if(hot) svg.append(el('path',{d:`M 610 360 L ${x} ${y}`,class:'den-map-terminal-line-inner'}));
    });
    svg.append(el('circle',{cx:610,cy:360,r:65,class:'den-map-terminal-body'}));
    note(610,362,'D SATELLITE');
    geometryReservations.push({x:540,y:310,w:140,h:100});
    if(livePiers.has('E')) {
      path('M 120 765 H 1120 V 830 H 120 Z');note(610,802,'TERMINAL 3 · E GATES');
      geometryReservations.push({x:380,y:777,w:460,h:38});
      svg.append(el('path',{d:'M 610 425 V 720',class:'den-map-connector'}));
      note(690,620,'TRAM');
    } else {
      svg.setAttribute('viewBox','0 0 1220 790');
      note(610,742,gates.length?'Other D wings / Terminal 3 omitted from detail':'Waiting for mapped Frontier gate assignments');
    }
  }

  function buildGeometry(flights) {
    geometryReservations=[];
    if(layout.type==='den') drawDEN();
    else if(layout.type==='atl') drawATL(flights);
    else if(layout.type==='las') drawLAS(flights);
    else if(layout.type==='stl') drawSTL();
    else drawFootprint(payload.airport,flights);
  }

  function spreadGateSigns() {
    const occupied=[];
    const box=(g,x,y)=>({x:x-Math.max(54,28+g.gate.length*9)/2,y:y-13,w:Math.max(54,28+g.gate.length*9),h:26});
    for(const g of gates) {
      const vertical=g.side==='left'||g.side==='right';
      for(let step=0;;step++) {
        const shift=step===0?0:(step%2?1:-1)*Math.ceil(step/2)*72;
        const x=g.ax+(vertical?0:shift),y=g.ay+(vertical?shift:0);
        const b=box(g,x,y),{w,h}=viewBoxSize();
        if(b.x<8||b.y<64||b.x+b.w>w-8||b.y+b.h>h-8) continue;
        if(occupied.some(o=>overlaps(b,o,8))||geometryReservations.some(o=>overlaps(b,o,2))) continue;
        g.x=x;g.y=y;occupied.push(b);break;
      }
    }
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
    const {w:vw,h:vh}=viewBoxSize(),w=118,h=74,x=g.x,y=g.y;
    const side=g.side==='auto'?'top':g.side;
    const blocked=[...placed,...reserved];
    const candidates=[];
    // Generate nearby outward positions first and rank by pin length. This
    // avoids the former far-left scan when a crowded gate runs out of space.
    for(let row=0;row<4;row++) {
      for(let offset=-5;offset<=5;offset++) {
        let cx,cy;
        if(side==='left'||side==='right') {
          cx=side==='left'?x-w-32-row*(w+14):x+32+row*(w+14);
          cy=y-h/2+offset*(h+14);
        } else {
          cx=x-w/2+offset*(w+14);
          cy=side==='bottom'?y+32+row*(h+14):y-h-32-row*(h+14);
        }
        if(cx<8||cy<8||cx+w>vw-8||cy+h>vh-8) continue;
        const distance=Math.hypot(Math.max(cx-x,0,x-cx-w),Math.max(cy-y,0,y-cy-h));
        candidates.push({x:cx,y:cy,w,h,distance});
      }
    }
    candidates.sort((a,b)=>a.distance-b.distance);
    for(const c of candidates) if(!blocked.some(b=>overlaps(c,b,10))) return c;
    // Extend the right edge at the nearest viable row, for every airport.
    // Unlike the old fallback this never returns an overlapping card.
    const cy=Math.max(8,Math.min(vh-h-8,side==='bottom'?y+32:side==='top'?y-h-32:y-h/2));
    for(let step=0;;step++) {
      const c={x:Math.max(8,x+32)+step*(w+14),y:cy,w,h};
      if(blocked.some(b=>overlaps(c,b,10))) continue;
      const width=Math.max(vw,c.x+w+12);
      svg.setAttribute('viewBox',`0 0 ${width} ${vh}`);
      return c;
    }
  }


  function representativeFlight(at) {
    const sorted=[...at].sort((a,b)=>(a.instant??Infinity)-(b.instant??Infinity));
    return sorted.find(f=>/boarding|gate closed/i.test(String(f.status))) || sorted.find(f=>!f.finished) || sorted[sorted.length-1] || null;
  }

  function renderGate(g, at, bubbleBox) {
    const f=representativeFlight(at), occupied=!!f;
    const markerX=g.x, markerY=g.y;
    const markerW=Math.max(54,28+String(g.gate).length*9), markerH=26;
    const group=el('g',{
      role:'button',tabindex:0,'data-gate':g.gate,
      'aria-label':`${g.gate}, ${at.length} flight${at.length===1?'':'s'}${f?', '+String(f.flight).replace(/\s+/g,'')+', '+conciseStatus(f).label:', no current Frontier activity'}`,
      'aria-pressed':selected===g.gate,class:`den-map-gate${occupied?' is-occupied':''}`
    });
    if (Math.hypot(markerX-g.ax,markerY-g.ay)>1) {
      group.append(el('line',{x1:g.ax,y1:g.ay,x2:markerX,y2:markerY,class:'den-map-pin'}));
    }
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

    buildGeometry(payload.flights);
    spreadGateSigns();
    const baseMapWidth = viewBoxSize().w;

    const gateData = gates.map(g => ({g, at:flights.filter(f => normalizeGate(f.gate) === g.gate)}));

    /* Reserve every gate sign before placing any information card. This means
       a flight card is never allowed to cover a neighboring gate number. */
    const reserved = gateData.map(({g}) => {
      const markerW=Math.max(54,28+String(g.gate).length*9), markerH=26;
      return {x:g.x-markerW/2,y:g.y-markerH/2,w:markerW,h:markerH};
    });

    const placed = [];
    const bubbleByGate = new Map();
    for (const item of gateData.filter(item => representativeFlight(item.at))) {
      const box = chooseBubble(item.g, placed, [...reserved, ...geometryReservations]);
      placed.push(box);
      bubbleByGate.set(item.g.gate, box);
    }
    mapWidthRatio = viewBoxSize().w / Math.min(baseMapWidth, 1200);
    resizeExpandedMap();
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
      resizeExpandedMap();
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
