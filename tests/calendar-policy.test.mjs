import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const source=fs.readFileSync(new URL('dashboard.js',root),'utf8');
const extract=name=>{const start=source.indexOf('function '+name+'(');assert.ok(start>=0,name);return source.slice(start,source.indexOf('\n}',start)+2);};
const policy=source.slice(source.indexOf('const goWildPeakTravelDates ='),source.indexOf('const goWildSlugs ='));
const functions=['bookingKey','bookingKnown','bookingPeakTravelDay','bookingDateState','bookingDateIcon','bookingDateDescription','bookingDate','bookingLabel','bookingShortLabel','bookingMonth','bookingMonthName','bookingDaysInMonth'];
const context=vm.createContext({Date,Intl,Math,bookingPad:n=>String(n).padStart(2,'0')});
vm.runInContext(policy+functions.map(extract).join('\n'),context);
const date=key=>{const [year,month,day]=key.split('-').map(Number);return{year,month,day};};
const state=(key,today)=>context.bookingDateState(date(key),date(today));

test('peak fees persist as the same date moves from advanced to standard booking',()=>{
  const advance=state('2026-11-30','2026-11-26');
  const standard=state('2026-11-30','2026-11-29');
  assert.ok(advance.peak&&advance.advanced&&!advance.standard);
  assert.ok(standard.peak&&standard.standard&&!standard.advanced);
  assert.match(context.bookingDateDescription(standard).join(' '),/fee applies regardless of when you book/);
});
test('domestic day-before window and international ten-day window have distinct boundaries',()=>{
  assert.ok(state('2026-12-02','2026-12-01').standard);
  assert.equal(state('2026-12-03','2026-12-01').standard,false);
  assert.ok(state('2026-12-11','2026-12-01').international);
  assert.equal(state('2026-12-12','2026-12-01').international,false);
  assert.ok(state('2026-12-11','2026-12-01').advanced);
  assert.equal(state('2026-11-30','2026-12-01').international,false);
});
test('published peak dates include the expanded 2026–2028 calendar and Christmas exceptions',()=>{
  for(const key of ['2026-11-30','2026-12-25','2027-05-31','2027-07-04','2027-11-29','2028-02-21','2028-07-09','2028-08-31','2028-12-31'])assert.equal(context.bookingPeakTravelDay(date(key)),true,key);
  for(const key of ['2027-12-25','2028-12-25','2027-06-15','2028-02-29'])assert.equal(context.bookingPeakTravelDay(date(key)),false,key);
  assert.equal(context.bookingKnown(date('2028-12-31')),true);
  assert.equal(context.bookingKnown(date('2029-01-01')),false);
});
test('both timeline tools use exactly the same peak dates as the calendar',()=>{
  const dates=vm.runInContext('Object.entries(goWildPeakTravelDates).flatMap(([y,months])=>Object.entries(months).flatMap(([m,days])=>days.map(d=>`${y}-${bookingPad(m)}-${bookingPad(d)}`))).sort()',context);
  for(const file of ['tools.js','faq-booking.js']) {
    const code=fs.readFileSync(new URL(file,root),'utf8');
    const list=JSON.parse(code.match(/const peakTravelDates = new Set\((\[[^;]+\])\);/)[1]);
    assert.deepEqual(list.sort(),Array.from(dates),file);
  }
});
test('the next standard opening never skips a peak travel date',()=>{
  const nodes=new Map();
  context.document={getElementById:id=>{if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);}};
  context.bookingParts=()=>date('2026-11-27');
  context.bookingMidnight=d=>Date.UTC(d.year,d.month-1,d.day);
  context.renderBookingCalendar=()=>{};
  vm.runInContext('let bookingAirport={code:"DEN",timezone:"America/Denver"};let bookingDayKey="";let bookingCalendarSignature="";let bookingTarget=null;'+extract('updateBookingDashboard'),context);
  context.updateBookingDashboard();
  assert.equal(nodes.get('bookingStandardStatus').textContent,'Open now');
  assert.match(nodes.get('bookingStandardDate').textContent,/Nov 28.*Peak Travel Day/);
  assert.equal(nodes.get('bookingNextDate').textContent,'For Nov 29');
});
test('advanced and peak icons use the same circled extra-charge symbol and are decorative',()=>{
  context.document={createElementNS:(ns,tag)=>({tag,attributes:{},children:[],setAttribute(k,v){this.attributes[k]=v;},appendChild(e){this.children.push(e);}})};
  const advanced=context.bookingDateIcon('advanced'),peak=context.bookingDateIcon('peak');
  assert.equal(advanced.children[0].attributes.d,peak.children[0].attributes.d);
  assert.match(peak.children[0].attributes.d,/M14 12h5M16.5 9.5v5/);
  assert.equal(peak.attributes['aria-hidden'],'true');
});
function htmlFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?htmlFiles(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
test('all pages share one navigation/search, valid relative page links, and a skip target',()=>{
  const dir=path.resolve(new URL('../',import.meta.url).pathname);
  const pages=htmlFiles(dir);
  assert.equal(pages.length,23);
  for(const file of pages){
    const html=fs.readFileSync(file,'utf8');
    assert.equal((html.match(/id="site-navigation"/g)||[]).length,1,file);
    assert.equal((html.match(/id="guideSearchForm"/g)||[]).length,1,file);
    assert.equal((html.match(/src="[^\"]*search\.js/g)||[]).length,1,file);
    const nav=html.match(/<header id="site-navigation"[\s\S]*?<\/header>/)[0];
    assert.ok(!/button-primary/.test(nav),file+' has no special white link');
    const target=nav.match(/site-nav-skip" href="#([^\"]+)/)[1];
    assert.ok(html.includes(`id="${target}"`),file+' skip target');
    for(const match of nav.matchAll(/href="([^\"]+\.html)(?:#[^\"]*)?"/g))assert.ok(fs.existsSync(path.resolve(path.dirname(file),match[1])),file+' '+match[1]);
  }
});
test('homepage replaces announcement and hero navigation with the story link',()=>{
  const html=fs.readFileSync(new URL('index.html',root),'utf8');
  const hero=html.slice(html.indexOf('<!-- HERO -->'),html.indexOf('<!-- DASHBOARD'));
  assert.ok(hero.includes('Read the story'));
  assert.equal(hero.includes('about-announcement'),false);
  assert.equal(hero.includes('aria-label="Guide topics"'),false);
  assert.ok(html.includes('International — 10-day window'));
});
