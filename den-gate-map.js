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
  const gates = [
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
  const normalizeGate = value => {
    const match = String(value || '').trim().toUpperCase().match(/^(?:GATE\s*)?A\s*0?(\d{2})$/);
    return match ? `A${Number(match[1])}` : '';
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
    const clock = Number.isFinite(f.instant) ? new Intl.DateTimeFormat('en-US', {timeZone:'America/Denver', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}).format(new Date(f.instant)) + ' DEN time'
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
    const next = JSON.stringify([filter, selected, payload.loading, payload.missing, flights.map(f => ({...f, progress: Math.floor(f.progress * 25)/25}))]);
    if (next === signature) return;
    signature = next;
    const focusedGate = document.activeElement?.getAttribute('data-gate');
    svg.replaceChildren(el('title', {}, 'Frontier DEN A-East ground-loading gate activity'), el('desc', {}, 'Approximate footprint of DEN’s A-East Level 1: the longer north corridor and shorter south spur. Gate numbers follow the public airport map; marker cards connect to their approximate doors. Each marker represents cached or scheduled flight activity, not a tracked aircraft. Multiple flights may share a gate; no aircraft rotations are inferred.'));
    const defs = el('defs'); svg.append(defs);
    // A-East has an offset north wing reached by a diagonal connector,
    // plus a shorter south spur. One common scale preserves their proportions.
    const body = {fill:'#e5ede6',stroke:'#bac9be','stroke-width':2};
    svg.append(el('path', {...body, d:'M 35 298 L 265 298 L 345 187 L 390 187 L 390 175 L 1110 175 L 1110 245 L 1060 245 L 1060 232 L 1025 232 L 1025 245 L 955 245 L 955 232 L 900 232 L 900 245 L 815 245 L 815 232 L 760 232 L 760 245 L 600 245 L 600 232 L 390 232 L 390 215 L 362 215 L 281 326 L 35 326 Z'}));
    svg.append(el('path', {...body, d:'M 35 326 L 125 326 L 125 346 L 275 346 L 275 335 L 300 335 L 300 346 L 545 346 L 545 337 L 565 337 L 565 350 L 660 350 L 660 375 L 677 375 L 677 405 L 655 405 L 655 438 L 535 438 L 535 411 L 510 411 L 510 388 L 300 388 L 300 399 L 275 399 L 275 388 L 125 388 L 125 405 L 35 405 Z'}));
    svg.append(el('text', {x:720,y:208,'text-anchor':'middle',class:'den-map-concourse'}, 'NORTH CORRIDOR · A71–A84'));
    svg.append(el('text', {x:720,y:225,'text-anchor':'middle',class:'den-map-subtext'}, 'A-East ground boarding · Level 1'));
    svg.append(el('text', {x:400,y:369,'text-anchor':'middle',class:'den-map-concourse'}, 'SOUTH CORRIDOR'));
    svg.append(el('text', {x:165,y:455,'text-anchor':'middle',class:'den-map-subtext den-map-outside'}, '← Concourse core / train'));
    svg.append(el('text', {x:165,y:475,'text-anchor':'middle',class:'den-map-subtext den-map-outside'}, 'A54 lies west of A56, outside this focus'));
    svg.append(el('path',{d:'M 72 116 L 72 68 M 64 80 L 72 68 L 80 80',fill:'none',stroke:'#66766c','stroke-width':2}));
    svg.append(el('text',{x:72,y:55,'text-anchor':'middle',class:'den-map-concourse den-map-outside'},'N'));
    for (const [index,g] of gates.entries()) {
      const at = flights.filter(f => normalizeGate(f.gate) === g.gate).sort((a,b) => (a.instant ?? Infinity) - (b.instant ?? Infinity));
      // Show one representative icon; all flights at this gate remain in details.
      const f = at.find(f => f.status === 'Estimated boarding') || at.find(f => !f.finished) || at[0];
      svg.append(el('line', {x1:g.ax,y1:g.ay,x2:g.x,y2:g.y,stroke:'#bac9be','stroke-width':1.5}));
      svg.append(el('circle',{cx:g.ax,cy:g.ay,r:4,fill:'#66766c'}));
      const group = el('g', {role:'button',tabindex:0,'data-gate':g.gate,'aria-label': `${g.gate}, ${at.length} flight${at.length === 1 ? '' : 's'}${f ? ', ' + f.flight + ', ' + f.status : ', gate activity unknown'}`, 'aria-pressed':selected === g.gate, class:'den-map-gate'});
      group.append(el('rect', {x:g.x-27,y:g.y-48,width:54,height:96,rx:15,fill:selected === g.gate ? '#e0ece2' : '#fff',stroke:selected === g.gate ? '#66766c' : '#d5dfd7','stroke-width':selected === g.gate ? 2 : 1}));
      if (f) {
        const plane = 'M 0 -22 C -3 -22 -4 -18 -4 -12 L -4 -3 L -20 7 L -20 12 L -4 7 L -4 17 L -10 22 L -10 25 L 0 22 L 10 25 L 10 22 L 4 17 L 4 7 L 20 12 L 20 7 L 4 -3 L 4 -12 C 4 -18 3 -22 0 -22 Z';
        const shape = el('g', {transform:`translate(${g.x} ${g.y-20}) scale(.76)`, class:f.finished ? 'den-map-left' : f.kind === 'arrival' ? 'den-map-incoming' : ''});
        const color = f.delayed ? '#a66e22' : '#66766c';
        shape.append(el('path', {d:plane,fill:'#f7faf7',stroke:color,'stroke-width':2.2}));
        if (f.progress > 0) {
          const clip = el('clipPath', {id:`den-plane-${index}`}); clip.append(el('path',{d:plane})); defs.append(clip);
          shape.append(el('rect',{x:-22,y:25-47*f.progress,width:44,height:47*f.progress,fill:color,'clip-path':`url(#den-plane-${index})`}));
          shape.append(el('path',{d:plane,fill:'none',stroke:color,'stroke-width':2.2}));
        }
        group.append(shape);
        group.append(el('text',{x:g.x,y:g.y+33,'text-anchor':'middle',class:'den-map-count'}, at.length > 1 ? `${at.length} flights` : f.status === 'Gate closed' ? 'CLOSED' : f.kind === 'arrival' ? '↓ IN' : '↑ OUT'));
      } else group.append(el('circle',{cx:g.x,cy:g.y-9,r:7,fill:'#fff',stroke:'#c4d0c7','stroke-width':2}));
      group.append(el('text',{x:g.x,y:g.y+15,'text-anchor':'middle',class:'den-map-gate-name'},g.gate));
      const label = f ? `${f.flight} · ${f.route}` : '—';
      svg.append(el('text',{x:g.x,y:g.y+61,'text-anchor':'middle',class:'den-map-flight-label'},label));
      group.addEventListener('click', () => select(g.gate));
      group.addEventListener('keydown', e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); select(g.gate);}});
      svg.append(group);
    }
    const offMap = flights.filter(f => !gates.some(g => g.gate === normalizeGate(f.gate)));
    unplaced.replaceChildren(); offMap.forEach(f => unplaced.append(card(f)));
    if (!offMap.length) unplaced.append(text('p','','All displayed flights have gates in this schematic.'));
    document.getElementById('denMapUnplacedTitle').textContent = `${offMap.length} flight${offMap.length === 1 ? '' : 's'} without a mapped gate`;
    document.getElementById('denMapSummary').textContent = payload.loading ? 'Loading the existing schedule…' : `${flights.length - offMap.length} flight${flights.length - offMap.length === 1 ? '' : 's'} with mapped gates · ${offMap.length} awaiting gate details or outside A56–A84.${payload.missing ? ' Some schedule snapshots are unavailable.' : ''}`;
    showDetails();
    if (focusedGate) svg.querySelector(`[data-gate="${focusedGate}"]`)?.focus({preventScroll:true});
  }
  root.querySelectorAll('[data-map-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.mapFilter;
    root.querySelectorAll('[data-map-filter]').forEach(b => b.setAttribute('aria-pressed', b === button ? 'true' : 'false'));
    draw();
  }));
  window.FrontierDENGateMap = {update(next) {payload = next; root.hidden = next.airport !== 'DEN'; if (!root.hidden) draw();}};
})();
