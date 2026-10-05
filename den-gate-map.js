/* No fetches or polling: dashboard.js passes its existing cached flight data. */
(() => {
  'use strict';
  const root = document.getElementById('denGateMap');
  if (!root) return;
  const svg = document.getElementById('denMapSVG');
  const details = document.getElementById('denMapDetails');
  const unplaced = document.getElementById('denMapUnplaced');
  const ns = 'http://www.w3.org/2000/svg';
  let payload = {flights: []}, filter = 'all', selected = '', signature = '';
  // Relative positions transcribed from DEN's public A-East / Level 1 map.
  // Marker cards use outward leader lines so paired doors remain readable.
  const denGates = [
    {gate:'A54', x:430,y:480, ax:430,ay:388},
    {gate:'A56', x:665,y:480, ax:655,ay:405},
    {gate:'A71', x:440,y:88, ax:470,ay:175},
    {gate:'A73', x:510,y:88, ax:495,ay:175},
    {gate:'A75', x:685,y:88, ax:720,ay:175},
    {gate:'A77', x:755,y:88, ax:745,ay:175},
    {gate:'A79', x:825,y:88, ax:770,ay:175},
    {gate:'A81', x:965,y:88, ax:985,ay:175},
    {gate:'A83', x:1035,y:88, ax:1010,ay:175},
    {gate:'A76', x:835,y:310, ax:835,ay:245},
    {gate:'A78', x:925,y:310, ax:925,ay:245},
    {gate:'A80', x:1015,y:310, ax:1010,ay:245},
    {gate:'A82', x:1160,y:150, ax:1110,ay:212},
    {gate:'A84', x:1160,y:310, ax:1110,ay:240}
  ];
  const airportMaps = {
    DEN: {city:'Denver', timezone:'America/Denver', gates:denGates, focus:'A54–A84',
      caption:'A-East · A54–A84 · approximate concourse proportions', source:'https://maps.flydenver.com/',
      sourceName:'DEN’s official interactive map',
      description:'Approximate footprint of DEN’s A-East Level 1: the longer north corridor and shorter south spur.'},
    ATL: {city:'Atlanta', timezone:'America/New_York', focus:'concourses T and A–F',
      caption:'T · A · B · C · D · E · F · schematic gate positions, not to scale', source:'https://www.atl.com/maps/',
      sourceName:'ATL’s official interactive map',
      description:'Slim vertical concourses T and A through F connected by the Plane Train. Reported gates are positioned schematically by gate number, not exact door coordinates.', gates:[]},
    LAS: {city:'Las Vegas', timezone:'America/Los_Angeles', focus:'D and E gates',
      caption:'D satellite + E gates · approximate footprint and gate positions', source:'https://www.harryreidairport.com/map',
      sourceName:'LAS’s official airport maps',
      description:'X-shaped D satellite and linear Terminal 3 E concourse, connected by tram context. Gate doors, relative scale, and building separation are schematic.', gates:[]},
    MCO: {city:'Orlando', timezone:'America/New_York', focus:'Airside 1 · gates 1–29',
      caption:'Airside 1 · gates 1–29 · schematic positions', source:'https://flymco.com/terminal-maps/',
      sourceName:'MCO’s official terminal maps',
      description:'Three-arm Airside 1 satellite for gates 1 through 29 with terminal and Gate Link context. Orientation and gate-door spacing are simplified. Occasional common-use assignments outside this area are listed below.', gates:[]},
    PHX: {city:'Phoenix', timezone:'America/Phoenix', focus:'Terminal 3 · F1–F15',
      caption:'Terminal 3 · F1–F15 · schematic positions', source:'https://www.skyharbor.com/maps-directions/',
      sourceName:'PHX’s official airport maps',
      description:'Terminal 3 south F concourse, gates F1 through F15, with bridge and terminal core context. Other reported assignments remain in the flight list below. Gate-door positions are approximate.', gates:[]}

  };
  let layout = airportMaps.DEN, gates = layout.gates;
  const normalizeGate = value => {
    const raw = String(value || '').trim().toUpperCase();
    // MCO uses numeric gate IDs, unlike the letter-prefixed airports.
    if (payload.airport === 'MCO') {
      const numeric = raw.match(/^(?:GATE\s*)?0*(\d{1,3})$/);
      return numeric ? String(Number(numeric[1])) : '';
    }
    const match = raw.match(/^(?:GATE\s*)?([A-Z])\s*0*(\d{1,2})([A-Z]?)$/);
    return match ? `${match[1]}${Number(match[2])}${match[3]}` : '';
  };
  function el(tag, attrs = {}, content) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k, String(v)));
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function text(tag, cls, content) {
    const node = document.createElement(tag); node.className = cls; node.textContent = content; return node;
  }
  function card(f) {
    const box = text('div', 'den-map-flight' + (f.delayed ? ' den-map-amber' : ''), '');
    box.append(text('strong', '', `${f.flight} · ${f.kind === 'arrival' ? 'From' : 'To'} ${f.route}`));
    const clock = Number.isFinite(f.instant) ? new Intl.DateTimeFormat('en-US', {timeZone:layout.timezone, month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}).format(new Date(f.instant)) + ` ${payload.airport} time`
      : `Arrival time unavailable · leaves ${f.origin} at ${f.originTime} (origin local time)`;
    box.append(text('span', '', `${f.kind === 'arrival' ? 'Arrival' : 'Departure'} · ${clock}`));
    box.append(text('span', '', `${f.gate ? 'Gate ' + f.gate : (f.kind === 'arrival' ? 'Arrival gate unavailable' : 'Gate unavailable')} · ${f.status}${f.gate && !f.fresh ? ' · gate unconfirmed' : ''}`));
    if (f.status === 'Estimated boarding') box.append(text('small', '', 'Aircraft fill shows time elapsed, not passengers onboard.'));
    return box;
  }
  function showDetails() {
    details.replaceChildren();
    if (!selected) { details.append(text('p', '', 'Select a gate to see its scheduled and cached flight activity.')); return; }
    const flights = payload.flights.filter(f => normalizeGate(f.gate) === selected && (filter === 'all' || f.kind === filter));
    details.append(text('h4', '', `${selected} · ${flights.length} flight${flights.length === 1 ? '' : 's'}`));
    if (!flights.length) details.append(text('p', '', 'No matching flight with a known gate. This does not confirm the gate is empty.'));
    flights.forEach(f => details.append(card(f)));
  }
  function select(gate) { selected = gate; signature = ''; draw(); }
  function draw() {
    const flights = payload.flights.filter(f => filter === 'all' || f.kind === filter);
    const next = JSON.stringify([payload.airport, filter, selected, payload.loading, payload.missing, flights.map(f => ({...f, progress: Math.floor(f.progress * 25)/25}))]);
    if (next === signature) return;
    signature = next;
    const focusedGate = document.activeElement?.getAttribute('data-gate');
    svg.replaceChildren(el('title', {}, `Frontier ${payload.airport} gate activity`), el('desc', {}, layout.description + ' Gate marker cards connect to approximate doors. Activity is not aircraft tracking; no rotations are inferred.'));
    const compact = payload.airport !== 'DEN';
    svg.setAttribute('viewBox', payload.airport === 'LAS' ? '0 0 1200 820' : payload.airport === 'MCO' ? '0 0 1200 760' : payload.airport === 'PHX' ? '0 0 1200 530' : compact ? '0 0 1200 600' : '0 0 1200 565');
    const defs = el('defs'); svg.append(defs);
    if (payload.airport === 'DEN') {
    // A-East has an offset north wing reached by a diagonal connector,
    // plus a shorter south spur. One common scale preserves their proportions.
    const body = {fill:'#e5ede6',stroke:'#bac9be','stroke-width':2};
    svg.append(el('path', {...body, d:'M 35 298 L 265 298 L 345 187 L 390 187 L 390 175 L 1110 175 L 1110 245 L 1060 245 L 1060 232 L 1025 232 L 1025 245 L 955 245 L 955 232 L 900 232 L 900 245 L 815 245 L 815 232 L 760 232 L 760 245 L 600 245 L 600 232 L 390 232 L 390 215 L 362 215 L 281 326 L 35 326 Z'}));
    svg.append(el('path', {...body, d:'M 35 326 L 125 326 L 125 346 L 275 346 L 275 335 L 300 335 L 300 346 L 545 346 L 545 337 L 565 337 L 565 350 L 660 350 L 660 375 L 677 375 L 677 405 L 655 405 L 655 438 L 535 438 L 535 411 L 510 411 L 510 388 L 300 388 L 300 399 L 275 399 L 275 388 L 125 388 L 125 405 L 35 405 Z'}));
    svg.append(el('text', {x:720,y:208,'text-anchor':'middle',class:'den-map-concourse'}, 'NORTH CORRIDOR · A71–A84'));
    svg.append(el('text', {x:720,y:225,'text-anchor':'middle',class:'den-map-subtext'}, 'A-East ground boarding · Level 1'));
    svg.append(el('text', {x:400,y:369,'text-anchor':'middle',class:'den-map-concourse'}, 'SOUTH CORRIDOR'));
    svg.append(el('text', {x:165,y:455,'text-anchor':'middle',class:'den-map-subtext den-map-outside'}, '← Concourse core / train'));
    svg.append(el('text', {x:165,y:475,'text-anchor':'middle',class:'den-map-subtext den-map-outside'}, 'A54 and A56 · south corridor'));
    svg.append(el('path',{d:'M 72 116 L 72 68 M 64 80 L 72 68 L 80 80',fill:'none',stroke:'#66766c','stroke-width':2}));
    svg.append(el('text',{x:72,y:55,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},'N'));
    } else if (payload.airport === 'ATL') {
      // Whole-airport overview. Numeric positions are schematic, not surveyed doors.
      const concourses = [{name:'T',max:21,split:8},{name:'A',max:34,split:18},
        {name:'B',max:36,split:18},{name:'C',max:57,split:22},
        {name:'D',max:46,split:20},{name:'E',max:42,split:18},{name:'F',max:14,split:10}];
      gates = [];
      svg.append(el('path',{d:'M 68 284 H 1120',stroke:'#bac9be','stroke-width':18,fill:'none'}));
      svg.append(el('text',{x:595,y:550,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'PLANE TRAIN · Domestic terminal ← T — A — B — C — D — E — F → International terminal'));
      svg.append(el('text',{x:595,y:572,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Only reported flight gates are marked. An unmarked concourse does not mean it is empty.'));
      svg.append(el('text',{x:48,y:60,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},'N ↑'));
      for (const [i,c] of concourses.entries()) {
        const x = 100 + i*155;
        svg.append(el('rect',{x:x-15,y:92,width:30,height:390,rx:10,fill:'#e5ede6',stroke:'#bac9be','stroke-width':2,'data-concourse':c.name}));
        svg.append(el('text',{x,y:68,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},c.name));
        const assigned = [...new Set(flights.map(f => normalizeGate(f.gate)))].filter(gate => {
          const m=gate.match(/^([A-Z])(\d+)([A-Z]?)$/);
          return m && m[1]===c.name && Number(m[2])>=1 && Number(m[2])<=c.max;
        });
        const placed = assigned.map(gate => {
          const n=Number(gate.match(/\d+/)[0]);
          const north=n>c.split;
          const ay=north ? 252-145*(n-c.split)/(c.max-c.split) : 315+145*(c.split-n)/Math.max(1,c.split-1);
          return {gate,x:x+64,y:ay,ax:x+15,ay,north};
        });
        // Spread labels within each arm; leader lines retain their approximate anchors.
        for (const north of [true,false]) {
          const arm=placed.filter(g=>g.north===north).sort((a,b)=>a.ay-b.ay);
          const lo=north?107:315, hi=north?252:460;
          const spacing=Math.min(38,(hi-lo)/Math.max(1,arm.length-1));
          arm.forEach((g,j)=>g.y=Math.max(g.ay,j?arm[j-1].y+spacing:lo));
          if(arm.length && arm[arm.length-1].y>hi) {
            const overflow=arm[arm.length-1].y-hi;
            arm.forEach(g=>g.y-=overflow);
            if(arm[0].y<lo) arm.forEach((g,j)=>g.y=lo+j*spacing);
          }
        }
        gates.push(...placed);
        const count=flights.filter(f=>assigned.includes(normalizeGate(f.gate))).length;
        svg.append(el('text',{x,y:509,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},`${count} flight${count===1?'':'s'}`));
      }
    } else if (payload.airport === 'LAS') {
      const body = {fill:'#e5ede6',stroke:'#bac9be','stroke-width':2};
      // Preserve the four-arm D silhouette and separate E building.
      svg.append(el('path',{d:'M 285 108 L 895 432 M 285 432 L 895 108',fill:'none',stroke:'#bac9be','stroke-width':58,'stroke-linecap':'round','data-concourse':'D'}));
      svg.append(el('path',{d:'M 285 108 L 895 432 M 285 432 L 895 108',fill:'none',stroke:'#e5ede6','stroke-width':54,'stroke-linecap':'round'}));
      svg.append(el('circle',{cx:590,cy:270,r:58,...body}));
      svg.append(el('text',{x:590,y:260,'text-anchor':'middle',class:'den-map-concourse'},'D GATES'));
      svg.append(el('text',{x:590,y:283,'text-anchor':'middle',class:'den-map-subtext'},'Satellite core'));
      svg.append(el('text',{x:300,y:63,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'D50–D59'));
      svg.append(el('text',{x:880,y:63,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'D16–D26'));
      svg.append(el('text',{x:300,y:490,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'D32–D43'));
      svg.append(el('text',{x:880,y:490,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'D1–D14'));
      svg.append(el('path',{d:'M 590 328 V 605',fill:'none',stroke:'#bac9be','stroke-width':3,'stroke-dasharray':'8 8'}));
      svg.append(el('text',{x:604,y:552,class:'den-map-subtext den-map-outside'},'Tram to Terminal 3 · schematic link'));
      svg.append(el('rect',{x:155,y:605,width:890,height:46,rx:12,...body,'data-concourse':'E'}));
      svg.append(el('text',{x:590,y:634,'text-anchor':'middle',class:'den-map-concourse'},'TERMINAL 3 · E GATES'));
      svg.append(el('text',{x:590,y:794,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Assigned flight gates only · select a marker for details · not a navigation map'));
      const range=(lo,hi)=>Array.from({length:hi-lo+1},(_,i)=>lo+i);
      const arms=[{numbers:[50,51,52,53,54,55,56,57,58,59],dx:-305,dy:-162},
        {numbers:[16,17,18,19,20,21,22,24,25,26],dx:305,dy:-162},
        {numbers:range(32,43),dx:-305,dy:162},
        {numbers:[1,...range(3,12),14],dx:305,dy:162}];
      const doorPositions=[];
      arms.forEach((arm,armIndex)=>arm.numbers.forEach((n,i)=>{
        const t=.27+.68*i/Math.max(1,arm.numbers.length-1);
        const side=i%2?1:-1;
        const ax=590+arm.dx*t+side*12,ay=270+arm.dy*t+side*22;
        doorPositions.push({gate:`D${n}`,ax,ay,armIndex});
        svg.append(el('circle',{cx:ax,cy:ay,r:3,fill:'#a5b8ab'}));
      }));
      const eNumbers=[15,14,12,11,10,9,8,7,6,5,4,3,2,1];
      eNumbers.forEach((n,i)=>{
        const ax=180+i*62,ay=651;
        doorPositions.push({gate:`E${n}`,ax,ay,eIndex:i});
        svg.append(el('circle',{cx:ax,cy:ay,r:3,fill:'#a5b8ab'}));
      });
      const assigned = new Set(flights.map(f=>normalizeGate(f.gate)));
      gates=doorPositions.filter(g=>assigned.has(g.gate));
      for(const west of [true,false]) {
        const lane=gates.filter(g=>g.armIndex!==undefined && (g.ax<590)===west).sort((a,b)=>a.ay-b.ay);
        const step=Math.min(40,380/Math.max(1,lane.length-1));
        lane.forEach((g,i)=>{g.x=west?100:1090;g.y=90+i*step;});
      }
      gates.filter(g=>g.eIndex!==undefined).forEach(g=>{g.x=g.ax;g.y=700+(g.eIndex%2)*50;});
    } else if (payload.airport === 'MCO') {
      const body = {fill:'#e5ede6',stroke:'#bac9be','stroke-width':2};
      const assigned=new Set(flights.map(f=>normalizeGate(f.gate)));
      gates=[];
      svg.append(el('rect',{x:430,y:622,width:340,height:65,rx:18,...body}));
      svg.append(el('text',{x:600,y:659,'text-anchor':'middle',class:'den-map-concourse'},'TERMINALS A / B · CONTEXT'));
      for (const area of [{name:'Airside 1',cx:600,start:1}]) {
        const {cx,start}=area;
        svg.append(el('text',{x:cx,y:64,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},`${area.name.toUpperCase()} · ${start}–${start===1?29:99}`));
        const arms=[{lo:start,hi:start===1?9:79,dx:-140,dy:-130},
          {lo:start===1?10:80,hi:start===1?19:89,dx:140,dy:-130},
          {lo:start===1?20:90,hi:start===1?29:99,dx:0,dy:190}];
        for(const arm of arms) {
          const d=`M ${cx} 300 L ${cx+arm.dx} ${300+arm.dy}`;
          svg.append(el('path',{d,fill:'none',stroke:'#bac9be','stroke-width':54,'stroke-linecap':'round','data-concourse':area.name}));
          svg.append(el('path',{d,fill:'none',stroke:'#e5ede6','stroke-width':50,'stroke-linecap':'round'}));
          for(let n=arm.lo;n<=arm.hi;n++) {
            const t=.3+.62*(n-arm.lo)/Math.max(1,arm.hi-arm.lo),side=(n-arm.lo)%2?1:-1;
            const length=Math.hypot(arm.dx,arm.dy);
            const ax=cx+arm.dx*t-side*arm.dy/length*25,ay=300+arm.dy*t+side*arm.dx/length*25;
            svg.append(el('circle',{cx:ax,cy:ay,r:3,fill:'#a5b8ab'}));
            if(assigned.has(String(n))) gates.push({gate:String(n),ax,ay,cx});
          }
        }
        svg.append(el('circle',{cx,cy:300,r:44,...body}));
        svg.append(el('text',{x:cx,y:305,'text-anchor':'middle',class:'den-map-subtext'},'Gate Link'));
        svg.append(el('path',{d:`M ${cx+50} 310 V 580 L 600 622`,fill:'none',stroke:'#bac9be','stroke-width':2,'stroke-dasharray':'8 8'}));
        for(const west of [true,false]) {
          const lane=gates.filter(g=>g.cx===cx && (g.ax<cx)===west).sort((a,b)=>a.ay-b.ay);
          const step=Math.min(40,420/Math.max(1,lane.length-1));
          lane.forEach((g,i)=>{g.x=cx+(west?-215:215);g.y=120+i*step;});
        }
      }
      svg.append(el('text',{x:600,y:724,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Occasional common-use gates outside 1–29 (including 70–99) are listed below.'));
    } else if (payload.airport === 'PHX') {
      const body = {fill:'#e5ede6',stroke:'#bac9be','stroke-width':2};
      const assigned=new Set(flights.map(f=>normalizeGate(f.gate)));
      gates=[];
      svg.append(el('text',{x:600,y:49,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},'TERMINAL 3 · SOUTH CONCOURSE · F1–F15'));
      svg.append(el('rect',{x:510,y:75,width:180,height:60,rx:15,...body}));
      svg.append(el('text',{x:600,y:110,'text-anchor':'middle',class:'den-map-concourse'},'TERMINAL CORE'));
      svg.append(el('path',{d:'M 600 135 V 240',fill:'none',stroke:'#e5ede6','stroke-width':28}));
      svg.append(el('text',{x:622,y:194,class:'den-map-subtext den-map-outside'},'Concourse bridge'));
      svg.append(el('rect',{x:100,y:240,width:1000,height:60,rx:12,...body,'data-concourse':'F'}));
      svg.append(el('text',{x:600,y:275,'text-anchor':'middle',class:'den-map-concourse'},'F GATES'));
      for(let n=1;n<=15;n++) {
        const ax=145+65*(n-1),ay=n%2?240:300;
        svg.append(el('circle',{cx:ax,cy:ay,r:3,fill:'#a5b8ab'}));
        if(assigned.has(`F${n}`))gates.push({gate:`F${n}`,ax,ay,x:ax,y:n%2?170:365});
      }
      svg.append(el('text',{x:600,y:449,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Assignments outside F1–F15 are shown in the flight list below.'));
      svg.append(el('text',{x:600,y:484,'text-anchor':'middle',class:'den-map-subtext den-map-outside'},'Phoenix local time (Arizona) · approximate gate positions'));
    }
    for (const [index,g] of gates.entries()) {
      const at = flights.filter(f => normalizeGate(f.gate) === g.gate).sort((a,b) => (a.instant ?? Infinity) - (b.instant ?? Infinity));
      // Show one representative icon; all flights at this gate remain in details.
      const f = at.find(f => f.status === 'Estimated boarding') || at.find(f => !f.finished) || at[0];
      svg.append(el('line', {x1:g.ax,y1:g.ay,x2:g.x,y2:g.y,stroke:'#bac9be','stroke-width':1.5}));
      svg.append(el('circle',{cx:g.ax,cy:g.ay,r:4,fill:'#66766c'}));
      const group = el('g', {role:'button',tabindex:0,'data-gate':g.gate,'aria-label': `${g.gate}, ${at.length} flight${at.length === 1 ? '' : 's'}${f ? ', ' + f.flight + ', ' + f.status : ', gate activity unknown'}`, 'aria-pressed':selected === g.gate, class:'den-map-gate'});
      group.append(el('rect', {x:g.x-(compact?46:27),y:g.y-(compact?17:48),width:compact?98:54,height:compact?34:96,rx:compact?9:15,fill:selected === g.gate ? '#e0ece2' : '#fff',stroke:selected === g.gate ? '#66766c' : '#d5dfd7','stroke-width':selected === g.gate ? 2 : 1}));
      if (f) {
        group.append(el('title',{},`${g.gate}: ${at.map(item=>`${item.flight} · ${item.kind==='arrival'?'from':'to'} ${item.route} · ${item.status}`).join('; ')}`));
        const plane = 'M 0 -22 C -3 -22 -4 -18 -4 -12 L -4 -3 L -20 7 L -20 12 L -4 7 L -4 17 L -10 22 L -10 25 L 0 22 L 10 25 L 10 22 L 4 17 L 4 7 L 20 12 L 20 7 L 4 -3 L 4 -12 C 4 -18 3 -22 0 -22 Z';
        const shape = el('g', {transform:`translate(${compact?g.x-31:g.x} ${compact?g.y:g.y-20}) scale(${compact?.42:.76})`, class:f.finished ? 'den-map-left' : f.kind === 'arrival' ? 'den-map-incoming' : ''});
        const color = f.delayed ? '#a66e22' : '#66766c';
        shape.append(el('path', {d:plane,fill:'#f7faf7',stroke:color,'stroke-width':2.2}));
        if (f.progress > 0) {
          const clip = el('clipPath', {id:`den-plane-${index}`}); clip.append(el('path',{d:plane})); defs.append(clip);
          shape.append(el('rect',{x:-22,y:25-47*f.progress,width:44,height:47*f.progress,fill:color,'clip-path':`url(#den-plane-${index})`}));
          shape.append(el('path',{d:plane,fill:'none',stroke:color,'stroke-width':2.2}));
        }
        group.append(shape);
        group.append(el('text',{x:compact?g.x+13:g.x,y:g.y+(compact?10:33),'text-anchor':'middle',class:'den-map-count'}, at.length > 1 ? `${at.length} flights` : f.status === 'Gate closed' ? 'CLOSED' : f.kind === 'arrival' ? '↓ IN' : '↑ OUT'));
      } else group.append(el('circle',{cx:g.x,cy:g.y-9,r:7,fill:'#fff',stroke:'#c4d0c7','stroke-width':2}));
      group.append(el('text',{x:compact?g.x+13:g.x,y:g.y+(compact?-3:15),'text-anchor':'middle',class:'den-map-gate-name'},g.gate));
      const label = f ? `${f.flight} · ${f.route}` : '—';
      if (!compact) svg.append(el('text',{x:g.x,y:g.y+61,'text-anchor':'middle',class:'den-map-flight-label'},label));
      group.addEventListener('click', () => select(g.gate));
      group.addEventListener('keydown', e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); select(g.gate);}});
      svg.append(group);
    }
    const offMap = flights.filter(f => !gates.some(g => g.gate === normalizeGate(f.gate)));
    unplaced.replaceChildren(); offMap.forEach(f => unplaced.append(card(f)));
    if (!offMap.length) unplaced.append(text('p','','All displayed flights have gates in this schematic.'));
    document.getElementById('denMapUnplacedTitle').textContent = `${offMap.length} flight${offMap.length === 1 ? '' : 's'} without a mapped gate`;
    document.getElementById('denMapSummary').textContent = payload.loading ? 'Loading the existing schedule…' : `${flights.length - offMap.length} flight${flights.length - offMap.length === 1 ? '' : 's'} with mapped gates · ${offMap.length} awaiting gate details or outside ${layout.focus}.${payload.missing ? ' Some schedule snapshots are unavailable.' : ''}`;
    showDetails();
    if (focusedGate) svg.querySelector(`[data-gate="${focusedGate}"]`)?.focus({preventScroll:true});
  }
  root.querySelectorAll('[data-map-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.mapFilter;
    root.querySelectorAll('[data-map-filter]').forEach(b => b.setAttribute('aria-pressed', b === button ? 'true' : 'false'));
    draw();
  }));
  // Keep the existing file/API names so installed DEN integrations remain compatible.
  window.FrontierDENGateMap = {update(next) {
    const airportChanged = payload.airport !== next.airport;
    payload = next;
    root.hidden = !airportMaps[next.airport];
    if (root.hidden) return;
    layout = airportMaps[next.airport]; gates = layout.gates;
    if (airportChanged) {
      selected = ''; filter = 'all'; signature = '';
      root.querySelectorAll('[data-map-filter]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mapFilter === 'all' ? 'true' : 'false'));
      // Collapse on airport changes; preserve disclosure state on regular data refreshes.
      root.open = false;
    }
    document.getElementById('denMapTitle').textContent = `${layout.city} gate activity`;
    document.getElementById('gateMapDescription').textContent = `Explore Frontier arrivals, departures, and estimated boarding at ${layout.city}’s gates.`;
    document.getElementById('gateMapCaption').textContent = layout.caption;
    const source = document.getElementById('gateMapSource'); source.href = layout.source; source.textContent = layout.sourceName;
    svg.setAttribute('aria-label', `${layout.city} gate area focused on ${layout.focus}. Select a gate for flight details.`);
    draw();
  }};
})();
