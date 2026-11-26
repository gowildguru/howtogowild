import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const dashboard = fs.readFileSync(new URL('../dashboard.js', import.meta.url), 'utf8');
const builder = fs.readFileSync(new URL('../scripts/build-schedule.mjs', import.meta.url), 'utf8');
const airport = {code:'DEN', timezone:'America/Denver'};
const key = '2026-11-26';
const date = {year:2026,month:11,day:26};
const flight = {destination:'LAS',flightNumber:'2015',departureTime:'06:42 AM',arrivalTime:'07:50 AM',duration:'2 hrs 8 min'};
const published = (flights=[{...flight}]) => ({date:key,airports:{DEN:flights}});
const shared = (flights=[{...flight}]) => ({schemaVersion:1,airport:'DEN',date:key,available:true,complete:true,partial:false,refreshNeeded:false,flights,fetchedAt:new Date().toISOString()});

function scheduleContext({file=published(),data=shared(),fileError=false}={}) {
  const counts={published:0,shared:0,fill:0};
  const context=vm.createContext({Date,Map,Set,AbortController,URL,setTimeout,clearTimeout,
    document:{baseURI:'https://example.com/'},boardStatusURL:'https://example.com/worker',
    bookingKey:d=>typeof d==='string'?d:key,bookingDate:()=>date,bookingParts:()=>date,
    fetch:async(url,options={})=>{
      if(options.method==='POST') {
        const action=JSON.parse(options.body).action;
        counts[action==='airport-schedule'?'fill':'shared']++;
        return {ok:true,json:async()=>data};
      }
      counts.published++;
      return {ok:!fileError,status:fileError?404:200,json:async()=>file};
    }
  });
  const minutes=dashboard.slice(dashboard.indexOf('function departureMinutes('),dashboard.indexOf('function departureInstant('));
  const functions=dashboard.slice(dashboard.indexOf('// Shared D1 schedule data'),dashboard.indexOf('function departureText('));
  vm.runInContext('const departureCache=new Map();\n'+minutes+functions,context);
  return {context,counts,load:()=>context.departureAirportSnapshot(airport,date)};
}

test('complete published schedule uses zero D1 requests, including an empty day',async()=>{
  for(const file of [published(),published([])]) {
    const s=scheduleContext({file});
    const result=await s.load();
    assert.equal(result,file);
    assert.deepEqual(s.counts,{published:1,shared:0,fill:0});
  }
});

test('legacy files missing arrivals still receive shared arrival details',async()=>{
  const legacy=published([{...flight,arrivalTime:null,duration:null}]);
  const s=scheduleContext({file:legacy});
  const result=await s.load();
  assert.equal(result.airports.DEN[0].arrivalTime,flight.arrivalTime);
  assert.equal(s.counts.shared,1);
  await s.load();
  assert.equal(s.counts.shared,1,'complete shared schedules are reused');
});

test('published departures survive shared-cache outages',async()=>{
  const file=published([{...flight,arrivalTime:null}]);
  const s=scheduleContext({file,data:{error:'Unavailable'}});
  assert.equal(await s.load(),file);
});

test('missing airport and failed route lookups do not become empty complete days',async()=>{
  for(const file of [{date:key,airports:{}},{...published(),incompleteAirports:['DEN']}]) {
    const s=scheduleContext({file,data:{...shared([]),available:false,complete:false}});
    await assert.rejects(s.load(),/No complete published schedule/);
  }
});

test('parallel calendar and board loads share one fallback request',async()=>{
  const s=scheduleContext({fileError:true});
  const results=await Promise.all([s.load(),s.load(),s.load()]);
  assert.equal(results[0],results[1]);
  assert.deepEqual(s.counts,{published:1,shared:1,fill:0});
});

test('a failed lookup can be retried, and missing dates still support calendar fills',async()=>{
  const s=scheduleContext({fileError:true,data:{...shared(),available:false,complete:false}});
  await assert.rejects(s.load());
  s.context.fetch=async(url,options)=>({ok:true,json:async()=>shared()});
  const result=await s.context.lookupAirportDateSchedule(airport,key);
  assert.equal(result.partial,false);
  assert.equal(result.airports.DEN[0].flightNumber,flight.flightNumber);
  await s.load();
});

function boardContext({open=false,hidden=false}={}) {
  const panels={departureBoardCard:{open},departureRouteCard:{open:false},bookingCalendarCard:{open:false},denGateMap:{open:false}};
  const state={airport,dayKey:key,loading:true};
  const calls=[];
  const context=vm.createContext({document:{hidden,getElementById:id=>panels[id]},
    dashboardSelectedAirport:'DEN',airportByCode:()=>airport,
    bookingKey:()=>key,bookingDate:()=>date,bookingParts:()=>date,Date,
    loadDepartureBoard:a=>{calls.push(a.code);vm.runInContext('departureState=nextState',context);},nextState:state});
  const functions=dashboard.slice(dashboard.indexOf('function departureScheduleVisible()'),dashboard.indexOf('async function loadDepartureBoard('));
  vm.runInContext('let departureState=null;let departureRequest=0;\n'+functions,context);
  return {context,panels,calls};
}

test('collapsed or hidden schedule panels do not start board requests',()=>{
  for(const options of [{},{open:true,hidden:true}]) {
    const b=boardContext(options);
    b.context.ensureDepartureBoard();
    assert.equal(b.calls.length,0);
  }
});

test('opening a schedule panel loads once and ignores duplicate toggles while loading',()=>{
  const b=boardContext();
  b.panels.departureRouteCard.open=true;
  b.context.ensureDepartureBoard();
  b.context.ensureDepartureBoard();
  assert.deepEqual(b.calls,['DEN']);
});

test('changing airport while panels are closed cancels stale board state without fetching',async()=>{
  const b=boardContext();
  const start=dashboard.indexOf('async function loadDepartureBoard(airport) {');
  const end=dashboard.indexOf("  const rows = document.getElementById('departureRows');",start);
  vm.runInContext(dashboard.slice(start,end)+'throw new Error("Unexpected visible branch");}',b.context);
  vm.runInContext('departureState={airport:{code:"LAS"}}',b.context);
  await b.context.loadDepartureBoard(airport);
  assert.equal(vm.runInContext('departureState',b.context),null);
  assert.equal(vm.runInContext('departureRequest',b.context),1);
});

function builderContext(fetch) {
  const context=vm.createContext({fetch,AbortSignal,WORKER_URL:'https://example.com/',departDate:key,
    REQUEST_TIMEOUT_MS:15000,RETRY_DELAY_MS:0,sleep:async()=>{},console:{warn(){},log(){}}});
  const functions=builder.slice(builder.indexOf('async function lookupRoute('),builder.indexOf('/* =====================================================\n   BUILD SNAPSHOT'));
  vm.runInContext(functions,context);
  return context;
}

test('builder retains arrival times and durations and excludes connecting flights',async()=>{
  const b=builderContext(async()=>({ok:true,json:async()=>({flights:[
    {...flight,flights:['2015']},{...flight,flights:['123','456']}
  ]})}));
  const result=await b.lookupRoute('DEN','LAS');
  assert.equal(result.complete,true);
  assert.equal(result.flights.length,1);
  assert.equal(result.flights[0].arrivalTime,flight.arrivalTime);
  assert.equal(result.flights[0].duration,flight.duration);
});

test('builder distinguishes valid no-flights results from errors and malformed responses',async()=>{
  for(const [response,expected] of [
    [{ok:true,json:async()=>({flights:[]})},true],
    [{ok:false,status:503},false],
    [{ok:true,json:async()=>({error:'not a schedule'})},false]
  ]) {
    const b=builderContext(async()=>response);
    const [result]=await b.processInBatches([{origin:'DEN',destination:'LAS'}],1);
    assert.equal(result.complete,expected);
    assert.equal(result.flights.length,0);
    assert.equal(result.origin,'DEN');
  }
});
