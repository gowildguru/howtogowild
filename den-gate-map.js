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
    {gate:'A54', x:430,y:480, ax:430,ay:388, side:'bottom'},
    {gate:'A56', x:665,y:480, ax:655,ay:405, side:'bottom'},
    {gate:'A71', x:440,y:88, ax:470,ay:175, side:'top'},
    {gate:'A73', x:510,y:88, ax:495,ay:175, side:'top'},
    {gate:'A75', x:685,y:88, ax:720,ay:175, side:'top'},
    {gate:'A77', x:755,y:88, ax:745,ay:175, side:'top'},
    {gate:'A79', x:825,y:88, ax:770,ay:175, side:'top'},
    {gate:'A81', x:965,y:88, ax:985,ay:175, side:'top'},
    {gate:'A83', x:1035,y:88, ax:1010,ay:175, side:'top'},
    {gate:'A76', x:835,y:310, ax:835,ay:245, side:'bottom'},
    {gate:'A78', x:925,y:310, ax:925,ay:245, side:'bottom'},
    {gate:'A80', x:1015,y:310, ax:1010,ay:245, side:'bottom'},
    {gate:'A82', x:1160,y:150, ax:1110,ay:212, side:'top'},
    {gate:'A84', x:1160,y:310, ax:1110,ay:240, side:'bottom'}
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
      description:'D satellite and Terminal 3 E gates. Gate positions are schematic.'
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
      description:'Airside E Frontier area, centered on gates E71 and E73–E75 with adjacent gates for context.'
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
      city:'St. Louis', timezone:'America/Chicago', type:'linear', prefix:'C', gateList:['C17','C18','C19','C20','C21','C22','C23','C24'],
      focus:'Terminal 1 · C19 / C23 area', caption:'Terminal 1 · C concourse · Frontier area',
      source:'https://www.flystl.com/flights-airlines/', sourceName:'STL’s official airline/gate directory',
      description:'Terminal 1 C-concourse view centered on Frontier’s published C19 and C23 gates.'
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
    if (f?.delayed || raw.includes('delay')) return {label:'DELAYED', cls:'is-delayed'};
    if (raw.includes('boarding')) return {label:'BOARDING', cls:'is-boarding'};
    if (raw.includes('closed') || raw.includes('departed') || raw.includes('arrived') || f?.finished) return {label:'CLOSED', cls:'is-closed'};
    return {label:'ON TIME', cls:'is-on-time'};
  }

  function card(f) {
    const box = text('div', 'den-map-flight' + (f.delayed ? ' den-map-amber' : ''), '');
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

  function linearLayout(config, flights) {
    gates = [];
    const base = [...config.gateList];
    const extra = [...new Set(flights.map(f => normalizeGate(f.gate)).filter(Boolean))].filter(g => !base.includes(g));
    const all = [...base, ...extra].sort((a,b) => gateNumber(a)-gateNumber(b) || a.localeCompare(b));

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
    gates = denGates.map(g=>({...g}));
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
    svg.append(el('path',{d:'M 285 108 L 895 432 M 285 432 L 895 108',class:'den-map-terminal-line'}));
    svg.append(el('path',{d:'M 285 108 L 895 432 M 285 432 L 895 108',class:'den-map-terminal-line-inner'}));
    svg.append(el('circle',{cx:590,cy:270,r:58,class:'den-map-terminal-body'}));
    svg.append(el('text',{x:590,y:266,'text-anchor':'middle',class:'den-map-concourse'},'D GATES'));
    svg.append(el('rect',{x:155,y:605,width:890,height:46,rx:12,class:'den-map-terminal-body'}));
    svg.append(el('text',{x:590,y:634,'text-anchor':'middle',class:'den-map-concourse'},'TERMINAL 3 · E GATES'));

    const assigned = [...new Set(flights.map(f=>normalizeGate(f.gate)).filter(Boolean))];
    const expanded = new Set();
    assigned.forEach(g => {
      const m=g.match(/^([DE])(\d+)$/); if(!m) return;
      const n=Number(m[2]); for(let d=-1;d<=1;d++) if(n+d>0) expanded.add(`${m[1]}${n+d}`);
    });
    const ds=[...expanded].filter(g=>g.startsWith('D')).sort((a,b)=>gateNumber(a)-gateNumber(b));
    ds.forEach((g,i)=>{
      const left=i%2===0; const y=105+(i%10)*35; const x=left?105:1095; const ax=left?315:865; const ay=135+(i%10)*30;
      addGate(g,x,y,ax,ay,left?'left':'right');
    });
    const es=[...expanded].filter(g=>g.startsWith('E')).sort((a,b)=>gateNumber(a)-gateNumber(b));
    es.forEach((g,i)=>{const x=210+i*Math.min(90,760/Math.max(1,es.length-1)); addGate(g,x,710,x,651,'bottom');});
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
    else if (layout.type === 'lax') drawLAX(flights);
    else linearLayout(layout, flights);
  }

  function bubblePosition(g) {
    const top = g.y <= g.ay;
    const left = g.x < g.ax - 5;
    const right = g.x > g.ax + 5;
    if (left || right) {
      const x = left ? g.x - 126 : g.x + 8;
      return {x,y:g.y-39,w:118,h:76,lineX:left?g.x-2:g.x+58,lineY:g.y};
    }
    return {x:g.x-59,y:top?g.y-92:g.y+38,w:118,h:76,lineX:g.x,lineY:top?g.y-16:g.y+16};
  }

  function renderGate(g, flightsAtGate) {
    const at = flightsAtGate.sort((a,b)=>(a.instant ?? Infinity)-(b.instant ?? Infinity));
    const f = at.find(item => item.status === 'Estimated boarding') || at.find(item => !item.finished) || at[0];
    const occupied = !!f;
    const markerW = Math.max(58, 32 + String(g.gate).length*9);
    const markerH = 28;

    const group = el('g', {
      role:'button', tabindex:0, 'data-gate':g.gate,
      'aria-label': `${g.gate}, ${at.length} flight${at.length===1?'':'s'}${f?', '+String(f.flight).replace(/\s+/g,'')+', '+conciseStatus(f).label:', no current Frontier activity'}`,
      'aria-pressed':selected===g.gate,
      class:`den-map-gate${occupied?' is-occupied':''}`
    });

    group.append(el('rect',{x:g.x-markerW/2,y:g.y-markerH/2,width:markerW,height:markerH,rx:5,class:'den-map-gate-marker'}));
    group.append(el('text',{x:g.x-markerW/2+12,y:g.y+4,'text-anchor':'middle',class:'den-map-gate-plane'},'✈'));
    group.append(el('text',{x:g.x+8,y:g.y+5,'text-anchor':'middle',class:'den-map-gate-name'},g.gate));

    if (f) {
      const b = bubblePosition(g);
      const status = conciseStatus(f);
      const targetX = Math.max(b.x+12,Math.min(b.x+b.w-12,g.x));
      const targetY = g.y <= g.ay ? b.y+b.h : b.y;
      svg.append(el('line',{x1:g.x,y1:g.y+(g.y<=g.ay?-markerH/2:markerH/2),x2:targetX,y2:targetY,class:'den-map-pin'}));
      svg.append(el('circle',{cx:targetX,cy:targetY,r:2.5,class:'den-map-pin-dot'}));

      const bubble = el('g',{class:f.kind==='arrival'?'den-map-incoming':''});
      bubble.append(el('rect',{x:b.x,y:b.y,width:b.w,height:b.h,rx:13,class:'den-map-flight-bubble'}));
      bubble.append(el('text',{x:b.x+12,y:b.y+21,class:'den-map-flight-number'},String(f.flight).replace(/\s+/g,'')));
      bubble.append(el('text',{x:b.x+12,y:b.y+42,class:'den-map-flight-route'},`${f.kind==='arrival'?'FROM':'TO'} ${f.route}`));
      bubble.append(el('text',{x:b.x+12,y:b.y+62,class:`den-map-flight-status ${status.cls}`},status.label));
      svg.append(bubble);
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

    for (const g of gates) {
      const at = flights.filter(f => normalizeGate(f.gate) === g.gate);
      renderGate(g, at);
    }

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
