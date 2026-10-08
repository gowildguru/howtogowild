/* =====================================================
   HOW TO GOWILD — DASHBOARD
   STAGES 1–4
   Airport + Network + City Photo + Weather + GoWild Booking
   ===================================================== */


/* =====================================================
   FRONTIER NETWORK SNAPSHOT
   Checked September 29, 2026
   ===================================================== */

const routeCounts = {
  MCO:51, DEN:52, ATL:41, DFW:36, LAS:36, PHL:23, SJU:21,
  IAH:20, TPA:20, PHX:18, FLL:16, LAX:16, MIA:16, CLE:15,
  DTW:15, ORD:15, RDU:14, BWI:11, CUN:11, CVG:11, SFO:11,
  CLT:10, IAD:9, ONT:9, STL:7, AUS:6, BNA:6, GUA:6, LGA:6,
  MSP:6, MSY:6, PUJ:6, RSW:6, SLC:6, IND:5, PDX:5, SAL:5,
  SAN:5, SNA:5, BOS:4, BUF:4, CMH:4, EWR:4, SAT:4, SDQ:4,
  SEA:4, SMF:4, MCI:4, DSM:3, GRR:3, JAX:3, MDW:3, SAP:3,
  SJO:3, BDL:2, ELP:2, ISP:2, MBJ:2, MEM:2, OAK:2, OKC:2,
  ORF:2, PNS:2, SJC:2, TTN:2, BOI:2, BOG:0, BQN:1, BUR:1,
  CTG:1, DCA:1, FAR:1, FSD:1, JFK:0, MDE:1, MKE:1, MSN:1,
  MYR:1, OMA:1, DJT:1, PIT:1, PSE:1, RIC:1, RNO:1, STI:1,
  SYR:1, XNA:1
};


const frontierRoutes = {

  ATL:["AUS","BOS","BUF","BWI","CLE","CMH","CUN","CVG","DEN","DFW","DTW","EWR","FLL","GUA","IAD","IAH","IND","JAX","LAS","LAX","LGA","MBJ","MCI","MCO","MDW","MIA","MSP","MSY","ORD","ORF","PHL","PHX","PUJ","RDU","SAL","SFO","SJO","SJU","STL","TPA"],

  AUS:["ATL","CLE","DEN","LAS","MCO","PHX"],

  BDL:["MCO","SJU"],

  BNA:["DEN","DFW","LAS","MCO","PHL","TPA"],

  BOI:["DEN","LAS"],

  BOS:["ATL","MCO","RDU","SJU"],

  BQN:["MCO"],

  BUF:["ATL","MCO","RDU","TPA"],

  BUR:["LAS"],

  BWI:["ATL","CLT","DFW","DTW","FLL","IAH","MCO","MIA","ORD","SJU","TPA"],

  CLE:["ATL","AUS","CUN","DEN","DFW","FLL","LAS","MCO","MIA","PHX","PUJ","RDU","RSW","SJU","TPA"],

  CLT:["BWI","DEN","DFW","FLL","IAH","LGA","MCO","MIA","PHL","SJU"],

  CMH:["ATL","DEN","FLL","MCO"],

  CTG:["MCO"],

  CUN:["ATL","CLE","CVG","DEN","DFW","DTW","IAH","MCO","ORD","PHL","STL"],

  CVG:["ATL","CUN","DEN","DFW","FLL","LAS","MCO","MIA","PUJ","RSW","TPA"],

  DCA:["DEN"],

  DEN:["ATL","AUS","BNA","BOI","CID","CLE","CLT","CMH","CUN","CVG","DCA","DFW","DSM","DTW","ELP","FAR","FLL","FSD","GRR","IAH","IND","LAS","LAX","LIT","MCI","MCO","MEM","MIA","MSN","MSP","MSY","OKC","OMA","ONT","ORD","PDX","PHL","PHX","PNS","RDU","RIC","RSW","SAN","SAT","SEA","SFO","SLC","SMF","SNA","STL","TPA","XNA"],

  DFW:["ATL","BNA","BWI","CLE","CLT","CUN","CVG","DEN","DTW","EWR","FLL","GUA","IAD","IND","LAS","LAX","LGA","MCO","MDW","MIA","MSP","MSY","ONT","ORD","PHL","PHX","RDU","SAL","SAN","SFO","SJO","SJU","SLC","SNA","STL","TPA"],

  DJT:["PHL"],

  DSM:["DEN","MCO","PHX"],

  DTW:["ATL","BWI","CUN","DEN","DFW","FLL","IAH","LAS","LAX","MCO","PHL","PHX","RDU","RSW","TPA"],

  ELP:["DEN","LAS"],

  EWR:["ATL","DFW","MCO","SJU"],

  FAR:["DEN"],

  FLL:["ATL","BWI","CLE","CLT","CMH","CVG","DEN","DFW","DTW","IAD","IAH","IND","ORD","PHL","RDU","SJU"],

  FSD:["DEN"],

  GRR:["DEN","MCO","TPA"],

  GUA:["ATL","DFW","IAH","LAX","MCO","MIA"],

  IAD:["ATL","DFW","FLL","LAS","MCO","MIA","SAL","SJU","TPA"],

  IAH:["ATL","BWI","CLT","CUN","DEN","DTW","FLL","GUA","LAS","LAX","MCO","MIA","ONT","ORD","PHX","RDU","SAL","SAP","SJU","TPA"],

  IND:["ATL","DEN","DFW","FLL","MCO"],

  ISP:["MCO","TPA"],

  JAX:["ATL","PHL","SJU"],

  JFK:[],

  LAS:["ATL","AUS","BNA","BOI","BUR","CLE","CVG","DEN","DFW","DTW","ELP","IAD","IAH","LAX","MCI","MCO","MIA","MSP","MSY","OAK","OKC","ONT","ORD","PDX","PHL","PHX","RNO","SAN","SAT","SEA","SFO","SJC","SLC","SMF","SNA","STL"],

  LAX:["ATL","DEN","DFW","DTW","GUA","IAH","LAS","MCO","ORD","PDX","PHX","SEA","SFO","SJC","SLC","SMF"],

  LGA:["ATL","CLT","DFW","MCO","MIA","SJU"],

  LIT:["DEN"],

  MBJ:["ATL","PHL"],

  MCI:["ATL","DEN","LAS","MCO"],

  MCO:["ATL","AUS","BDL","BNA","BOS","BQN","BUF","BWI","CLE","CLT","CMH","CUN","CVG","DEN","DFW","DSM","DTW","EWR","GRR","GUA","IAD","IAH","IND","ISP","LAS","LAX","LGA","MCI","MDW","MEM","MKE","MSP","MSY","ORD","ORF","PHL","PHX","PIT","PNS","PSE","RDU","RIC","SAL","SAP","SAT","SDQ","SJO","SJU","STL","SYR","TTN"],

  MDE:["MCO"],

  MDW:["ATL","DFW","MCO"],

  MEM:["DEN","MCO"],

  MIA:["ATL","BWI","CLE","CLT","CVG","DEN","DFW","GUA","IAD","IAH","LAS","LGA","PHL","RDU","SAP","SJU"],

  MKE:["MCO"],

  MSN:["DEN"],

  MSP:["ATL","DEN","DFW","LAS","MCO","PHX"],

  MSY:["ATL","DEN","DFW","LAS","MCO","TPA"],

  MYR:["PHL"],

  OAK:["LAS","ONT"],

  OKC:["DEN","LAS"],

  OMA:["DEN"],

  ONT:["DEN","DFW","IAH","LAS","OAK","PDX","SEA","SFO","SMF"],

  ORD:["ATL","BWI","CUN","DEN","DFW","FLL","IAH","LAS","LAX","MCO","PHL","PHX","RSW","SJU","TPA"],

  ORF:["ATL","MCO"],

  PDX:["DEN","LAS","LAX","ONT","SFO"],

  PHL:["ATL","BNA","CLT","CUN","DEN","DFW","DJT","DTW","FLL","JAX","LAS","MBJ","MCO","MIA","MYR","ORD","PUJ","RDU","RSW","SDQ","SJU","STI","TPA"],

  PHX:["ATL","AUS","CLE","DEN","DFW","DSM","DTW","IAH","LAS","LAX","MCO","MSP","ORD","SAN","SAT","SFO","SLC","SNA"],

  PIT:["MCO"],

  PNS:["DEN","MCO"],

  PSE:["MCO"],

  PUJ:["ATL","CLE","CVG","PHL","SJU","STL"],

  RDU:["ATL","BOS","BUF","CLE","DEN","DFW","DTW","FLL","IAH","MCO","MIA","PHL","SJU","TPA"],

  RIC:["MCO"],

  RNO:["LAS"],

  RSW:["CLE","CVG","DEN","DTW","ORD","PHL"],

  SAL:["ATL","DFW","IAD","IAH","MCO"],

  SAN:["DEN","DFW","LAS","PHX","SFO"],

  SAP:["IAH","MCO","MIA"],

  SAT:["DEN","LAS","MCO","PHX"],

  SDQ:["MCO","PHL","SJU","TPA"],

  SEA:["DEN","LAS","LAX","ONT"],

  SFO:["ATL","DEN","DFW","LAS","LAX","ONT","PDX","PHX","SAN","SLC","SNA"],

  SJC:["LAS","LAX"],

  SJO:["ATL","DFW","MCO"],

  SJU:["ATL","BDL","BOS","BWI","CLE","CLT","DFW","EWR","FLL","IAD","IAH","JAX","LGA","MCO","MIA","ORD","PHL","PUJ","RDU","SDQ","TPA"],

  SLC:["DEN","DFW","LAS","LAX","PHX","SFO"],

  SMF:["DEN","LAS","LAX","ONT"],

  SNA:["DEN","DFW","LAS","PHX","SFO"],

  STI:["PHL"],

  STL:["ATL","CUN","DEN","DFW","LAS","MCO","PUJ"],

  SYR:["MCO"],

  TPA:["ATL","BNA","BUF","BWI","CLE","CVG","DEN","DFW","DTW","GRR","IAD","IAH","ISP","MSY","ORD","PHL","RDU","SDQ","SJU","TTN"],

  TTN:["MCO","TPA"],

  XNA:["DEN"]
};


/* =====================================================
   POSSIBLE ONE-STOP CONNECTIONS
   ===================================================== */

function possibleConnections(airport) {

  const direct =
    new Set(
      frontierRoutes[airport.code] || []
    );

  const via =
    new Map();


  for (const gateway of direct) {

    for (
      const destination of
      frontierRoutes[gateway] || []
    ) {

      if (
        destination !== airport.code &&
        !direct.has(destination) &&
        !via.has(destination)
      ) {

        via.set(
          destination,
          gateway
        );

      }

    }

  }


  return via;

}


/* =====================================================
   TRAVELER-FACING CITY NAMES
   ===================================================== */

const cityOverrides = {

  ATL:"Atlanta",
  AUS:"Austin",
  BDL:"Hartford",
  BNA:"Nashville",
  BOG:"Bogotá",
  BOI:"Boise",
  BOS:"Boston",
  BQN:"Aguadilla",
  BUF:"Buffalo",
  BUR:"Burbank",
  BWI:"Baltimore",
  CLE:"Cleveland",
  CLT:"Charlotte",
  CMH:"Columbus",
  CTG:"Cartagena",
  CUN:"Cancún",
  CVG:"Cincinnati",
  DCA:"Washington, D.C.",
  DEN:"Denver",
  DFW:"Dallas / Fort Worth",
  DSM:"Des Moines",
  DTW:"Detroit",
  ELP:"El Paso",
  EWR:"Newark",
  FAR:"Fargo",
  FLL:"Fort Lauderdale",
  FSD:"Sioux Falls",
  GRR:"Grand Rapids",
  GUA:"Guatemala City",
  IAD:"Washington, D.C.",
  IAH:"Houston",
  IND:"Indianapolis",
  ISP:"Long Island / Islip",
  JAX:"Jacksonville",
  JFK:"New York City",
  LAS:"Las Vegas",
  LAX:"Los Angeles",
  LGA:"New York City",
  MBJ:"Montego Bay",
  MCI:"Kansas City",
  MCO:"Orlando",
  MDE:"Medellín",
  MDW:"Chicago",
  MEM:"Memphis",
  MIA:"Miami",
  MKE:"Milwaukee",
  MSP:"Minneapolis / St. Paul",
  MSN:"Madison",
  MSY:"New Orleans",
  MYR:"Myrtle Beach",
  OAK:"Oakland",
  OKC:"Oklahoma City",
  OMA:"Omaha",
  ONT:"Ontario",
  ORD:"Chicago",
  ORF:"Norfolk",
  DJT:"West Palm Beach",
  PDX:"Portland",
  PHL:"Philadelphia",
  PHX:"Phoenix",
  PIT:"Pittsburgh",
  PNS:"Pensacola",
  PSE:"Ponce",
  PUJ:"Punta Cana",
  RDU:"Raleigh / Durham",
  RIC:"Richmond",
  RNO:"Reno",
  RSW:"Fort Myers",
  SAL:"San Salvador",
  SAN:"San Diego",
  SAP:"San Pedro Sula",
  SAT:"San Antonio",
  SDQ:"Santo Domingo",
  SEA:"Seattle",
  SFO:"San Francisco",
  SJC:"San Jose",
  SJO:"San José",
  SJU:"San Juan",
  SLC:"Salt Lake City",
  SMF:"Sacramento",
  SNA:"Orange County / Santa Ana",
  STI:"Santiago",
  STL:"St. Louis",
  SYR:"Syracuse",
  TPA:"Tampa",
  TTN:"Trenton",
  XNA:"Bentonville / Fayetteville"

};


/* =====================================================
   CONNECTION SCORES
   ===================================================== */

function makeScores() {

  const airportList =
    Object.entries(routeCounts)

      .map(
        ([code, count]) => ({
          code,
          count
        })
      )

      .sort(
        (a, b) =>
          b.count - a.count
      );


  let previousCount = null;
  let rank = 0;


  airportList.forEach(
    (airport, index) => {

      if (
        airport.count !==
        previousCount
      ) {

        rank =
          index + 1;

      }


      airport.rank =
        rank;


      airport.score =
        101 - rank;


      previousCount =
        airport.count;

    }
  );


  return new Map(

    airportList.map(
      airport => [
        airport.code,
        airport
      ]
    )

  );

}


const scores =
  makeScores();


/* =====================================================
   AIRPORT DATABASE
   ===================================================== */

const airportSnapshot = [["ATL","Hartsfield Jackson Atlanta International Airport","Atlanta",33.6367,-84.4281,"America/New_York"],["AUS","Austin Bergstrom International Airport","Austin",30.1945,-97.6699,"America/Chicago"],["BDL","Bradley International Airport","Hartford",41.9389,-72.6832,"America/New_York"],["BNA","Nashville International Airport","Nashville",36.1245,-86.6782,"America/Chicago"],["BOG","El Dorado International Airport","Bogota",4.70159,-74.1469,"America/Bogota"],["BOI","Boise Air Terminal/Gowen field","Boise",43.5644,-116.223,"America/Boise"],["BOS","General Edward Lawrence Logan International Airport","Boston",42.3643,-71.0052,"America/New_York"],["BQN","Rafael Hernandez Airport","Aguadilla",18.4949,-67.1294,"America/Puerto_Rico"],["BUF","Buffalo Niagara International Airport","Buffalo",42.9405,-78.7322,"America/New_York"],["BUR","Bob Hope Airport","Burbank",34.2007,-118.359,"America/Los_Angeles"],["BWI","Baltimore/Washington International Thurgood Marshal Airport","Baltimore",39.1754,-76.6683,"America/New_York"],["CLE","Cleveland Hopkins International Airport","Cleveland",41.4117,-81.8498,"America/New_York"],["CLT","Charlotte Douglas International Airport","Charlotte",35.214,-80.9431,"America/New_York"],["CMH","John Glenn Columbus International Airport","Columbus",39.998,-82.8919,"America/New_York"],["CTG","Rafael Nunez International Airport","Cartagena",10.4424,-75.513,"America/Bogota"],["CUN","Cancun International Airport","Cancun",21.0365,-86.8771,"America/Cancun"],["CVG","Cincinnati Northern Kentucky International Airport","Hebron",39.0488,-84.6678,"America/New_York"],["DCA","Ronald Reagan Washington National Airport","Washington",38.8521,-77.0377,"America/New_York"],["DEN","Denver International Airport","Denver",39.8617,-104.673,"America/Denver"],["DFW","Dallas Fort Worth International Airport","Dallas-Fort Worth",32.8968,-97.038,"America/Chicago"],["DSM","Des Moines International Airport","Des Moines",41.534,-93.6631,"America/Chicago"],["DTW","Detroit Metropolitan Wayne County Airport","Detroit",42.2124,-83.3534,"America/Detroit"],["ELP","El Paso International Airport","El Paso",31.8072,-106.378,"America/Denver"],["EWR","Newark Liberty International Airport","Newark",40.6925,-74.1687,"America/New_York"],["FAR","Hector International Airport","Fargo",46.9207,-96.8158,"America/Chicago"],["FLL","Fort Lauderdale Hollywood International Airport","Fort Lauderdale",26.0726,-80.1527,"America/New_York"],["FSD","Joe Foss Field Airport","Sioux Falls",43.582,-96.7419,"America/Chicago"],["GRR","Gerald R. Ford International Airport","Grand Rapids",42.8808,-85.5228,"America/Detroit"],["GUA","La Aurora Airport","Guatemala City",14.5833,-90.5275,"America/Guatemala"],["IAD","Washington Dulles International Airport","Dulles",38.9445,-77.4558,"America/New_York"],["IAH","George Bush Intercontinental Houston Airport","Houston",29.9844,-95.3414,"America/Chicago"],["IND","Indianapolis International Airport","Indianapolis",39.7173,-86.2944,"America/Indiana/Indianapolis"],["ISP","Long Island Mac Arthur Airport","Islip",40.7952,-73.1002,"America/New_York"],["JAX","Jacksonville International Airport","Jacksonville",30.4941,-81.6879,"America/New_York"],["JFK","John F Kennedy International Airport","New York",40.6398,-73.7789,"America/New_York"],["LAS","Harry Reid International Airport","Las Vegas",36.0801,-115.152,"America/Los_Angeles"],["LAX","Los Angeles International Airport","Los Angeles",33.9425,-118.408,"America/Los_Angeles"],["LGA","La Guardia Airport","New York",40.7772,-73.8726,"America/New_York"],["MBJ","Sangster International Airport","Montego Bay",18.5037,-77.9134,"America/Jamaica"],["MCI","Kansas City International Airport","Kansas City",39.2976,-94.7139,"America/Chicago"],["MCO","Orlando International Airport","Orlando",28.4294,-81.309,"America/New_York"],["MDE","Jose Maria Cordova International Airport","Rionegro",6.16454,-75.4231,"America/Bogota"],["MDW","Chicago Midway International Airport","Chicago",41.786,-87.7524,"America/Chicago"],["MEM","Memphis International Airport","Memphis",35.0424,-89.9767,"America/Chicago"],["MIA","Miami International Airport","Miami",25.7932,-80.2906,"America/New_York"],["MKE","General Mitchell International Airport","Milwaukee",42.9472,-87.8966,"America/Chicago"],["MSN","Dane County Regional Truax Field","Madison",43.1399,-89.3375,"America/Chicago"],["MSP","Minneapolis-St Paul International/Wold-Chamberlain Airport","Minneapolis",44.882,-93.2218,"America/Chicago"],["MSY","Louis Armstrong New Orleans International Airport","New Orleans",29.9934,-90.258,"America/Chicago"],["MYR","Myrtle Beach International Airport","Myrtle Beach",33.6797,-78.9283,"America/New_York"],["OAK","Metropolitan Oakland International Airport","Oakland",37.7213,-122.221,"America/Los_Angeles"],["OKC","Will Rogers World Airport","Oklahoma City",35.3931,-97.6007,"America/Chicago"],["OMA","Eppley Airfield","Omaha",41.3032,-95.8941,"America/Chicago"],["ONT","Ontario International Airport","Ontario",34.056,-117.601,"America/Los_Angeles"],["ORD","Chicago O'Hare International Airport","Chicago",41.9786,-87.9048,"America/Chicago"],["ORF","Norfolk International Airport","Norfolk",36.8946,-76.2012,"America/New_York"],["DJT","President Donald J. Trump International Airport (formerly: Palm Beach International Airport)","West Palm Beach",26.6832,-80.0956,"America/New_York"],["PDX","Portland International Airport","Portland",45.5887,-122.598,"America/Los_Angeles"],["PHL","Philadelphia International Airport","Philadelphia",39.8719,-75.2411,"America/New_York"],["PHX","Phoenix Sky Harbor International Airport","Phoenix",33.4343,-112.012,"America/Phoenix"],["PIT","Pittsburgh International Airport","Pittsburgh",40.4915,-80.2329,"America/New_York"],["PNS","Pensacola Regional Airport","Pensacola",30.4734,-87.1866,"America/Chicago"],["PSE","Mercedita Airport","Ponce",18.0083,-66.563,"America/Puerto_Rico"],["PUJ","Punta Cana International Airport","Punta Cana",18.5674,-68.3634,"America/Santo_Domingo"],["RDU","Raleigh Durham International Airport","Raleigh/Durham",35.8776,-78.7875,"America/New_York"],["RIC","Richmond International Airport","Richmond",37.5052,-77.3197,"America/New_York"],["RNO","Reno Tahoe International Airport","Reno",39.4991,-119.768,"America/Los_Angeles"],["RSW","Southwest Florida International Airport","Fort Myers",26.5362,-81.7552,"America/New_York"],["SAL","El Salvador International Airport","Santa Clara",13.4409,-89.0557,"America/El_Salvador"],["SAN","San Diego International Airport","San Diego",32.7336,-117.19,"America/Los_Angeles"],["SAP","Ramon Villeda Morales International Airport","La Mesa",15.4526,-87.9236,"America/Tegucigalpa"],["SAT","San Antonio International Airport","San Antonio",29.5337,-98.4698,"America/Chicago"],["SDQ","Las Americas International Airport","Santo Domingo",18.4297,-69.6689,"America/Santo_Domingo"],["SEA","Seattle Tacoma International Airport","Seattle",47.449,-122.309,"America/Los_Angeles"],["SFO","San Francisco International Airport","San Francisco",37.619,-122.375,"America/Los_Angeles"],["SJC","Norman Y. Mineta San Jose International Airport","San Jose",37.3626,-121.929,"America/Los_Angeles"],["SJO","Juan Santamaria International Airport","San Jose",9.99386,-84.2088,"America/Costa_Rica"],["SJU","Luis Munoz Marin International Airport","San Juan",18.4394,-66.0018,"America/Puerto_Rico"],["SLC","Salt Lake City International Airport","Salt Lake City",40.7884,-111.978,"America/Denver"],["SMF","Sacramento International Airport","Sacramento",38.6954,-121.591,"America/Los_Angeles"],["SNA","John Wayne Airport-Orange County Airport","Santa Ana",33.6757,-117.868,"America/Los_Angeles"],["STI","Cibao International Airport","Santiago",19.4061,-70.6047,"America/Santo_Domingo"],["STL","Lambert St Louis International Airport","St Louis",38.7487,-90.37,"America/Chicago"],["SYR","Syracuse Hancock International Airport","Syracuse",43.1112,-76.1063,"America/New_York"],["TPA","Tampa International Airport","Tampa",27.9755,-82.5332,"America/New_York"],["TTN","Trenton Mercer Airport","Trenton",40.2767,-74.8135,"America/New_York"],["XNA","Northwest Arkansas Regional Airport","Fayetteville/Springdale/",36.2819,-94.3068,"America/Chicago"]];


let airports = [];


/* =====================================================
   LOAD AIRPORTS
   ===================================================== */

function loadAirports() {

  airports =
    airportSnapshot

      .map(
        ([code, name, city, lat, lon, timezone]) => {

          const network =
            scores.get(code);


          return {

            code,

            name,

            city:
              cityOverrides[code] ||
              city ||
              name,

            lat,

            lon,

            timezone:
              timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,

            routes:
              network?.count || 0,

            rank:
              network?.count
                ? network.rank
                : null,

            score:
              network?.count
                ? network.score
                : 0

          };

        }
      )

      .sort(
        (a, b) =>
          a.city.localeCompare(
            b.city
          )
      );


  populateSelector();

}


/* =====================================================
   AIRPORT SELECTOR
   ===================================================== */

function populateSelector() {

  const select =
    document.getElementById(
      "airportSelect"
    );


  if (!select)
    return;


  select.innerHTML =
    '<option value="">Select Frontier airport...</option>';


  airports.forEach(
    airport => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        airport.code;


      option.textContent =
        `${airport.city} (${airport.code})`;


      select.appendChild(
        option
      );

    }
  );

}


/* =====================================================
   DISTANCE
   ===================================================== */

function distanceMiles(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R =
    3958.8;


  const radians =
    value =>
      value *
      Math.PI /
      180;


  const dLat =
    radians(
      lat2 - lat1
    );


  const dLon =
    radians(
      lon2 - lon1
    );


  const a =

    Math.sin(
      dLat / 2
    ) ** 2 +

    Math.cos(
      radians(lat1)
    ) *

    Math.cos(
      radians(lat2)
    ) *

    Math.sin(
      dLon / 2
    ) ** 2;


  return (

    R *
    2 *

    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )

  );

}


/* =====================================================
   FIND NEAREST AIRPORT
   ===================================================== */

function nearestAirport(
  lat,
  lon
) {

  let nearest =
    null;


  airports.forEach(
    airport => {

      const distance =
        distanceMiles(

          lat,
          lon,

          airport.lat,
          airport.lon

        );


      if (
        !nearest ||
        distance <
        nearest.distance
      ) {

        nearest = {
          ...airport,
          distance
        };

      }

    }
  );


  return nearest;

}


/* =====================================================
   APPROXIMATE LOCATION
   ===================================================== */

async function approximateLocation() {

  const response =
    await fetch(
      "https://ipapi.co/json/"
    );


  if (!response.ok) {

    throw new Error(
      "Location unavailable"
    );

  }


  const data =
    await response.json();


  const lat =
    Number(
      data.latitude
    );


  const lon =
    Number(
      data.longitude
    );


  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon)
  ) {

    throw new Error(
      "Invalid location"
    );

  }


  return {
    lat,
    lon
  };

}


/* =====================================================
   CITY PHOTO FALLBACKS
   ===================================================== */

const cityImages = {

  DEN:
    "https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?auto=format&fit=crop&w=1400&q=80",

  LAS:
    "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1400&q=80",

  SFO:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80",

  LAX:
    "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1400&q=80",

  JFK:
    "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1400&q=80",

  LGA:
    "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1400&q=80",

  MIA:
    "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=1400&q=80"

};


const defaultCityImage =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80";


/* =====================================================
   WIKIPEDIA CITY PHOTO LOOKUP
   ===================================================== */

const wikipediaCityPages = {

  AUS:"Austin, Texas",

  BOG:"Bogotá",

  BQN:"Aguadilla, Puerto Rico",

  BUF:"Buffalo, New York",

  BUR:"Burbank, California",

  CLT:"Charlotte, North Carolina",

  CMH:"Columbus, Ohio",

  CTG:"Cartagena, Colombia",

  CUN:"Cancún",

  DCA:"Washington, D.C.",

  DFW:"Dallas",

  EWR:"Newark, New Jersey",

  FAR:"Fargo, North Dakota",

  IAD:"Washington, D.C.",

  ISP:"Long Island",

  JFK:"New York City",

  LGA:"New York City",

  MCO:"Orlando, Florida",

  MDE:"Medellín",

  MDW:"Chicago",

  MEM:"Memphis, Tennessee",

  MSN:"Madison, Wisconsin",

  MSP:"Minneapolis",

  ONT:"Ontario, California",

  ORD:"Chicago",

  PDX:"Portland, Oregon",

  PHX:"Phoenix, Arizona",

  PSE:"Ponce, Puerto Rico",

  RDU:"Raleigh, North Carolina",

  RIC:"Richmond, Virginia",

  SAL:"San Salvador",

  SAP:"San Pedro Sula",

  SJC:"San Jose, California",

  SJO:"San José, Costa Rica",

  SJU:"San Juan, Puerto Rico",

  SNA:"Santa Ana, California",

  STI:"Santiago de los Caballeros",

  SYR:"Syracuse, New York",

  TTN:"Trenton, New Jersey",

  XNA:"Fayetteville, Arkansas"

};


const wikipediaCityCache =
  new Map();


let cityPhotoRequest =
  0;


function plainText(html) {

  return new DOMParser()

    .parseFromString(
      html || "",
      "text/html"
    )

    .body
    .textContent

    .replace(
      /\s+/g,
      " "
    )

    .trim();

}


async function photoJSON(url) {

  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      "City photo unavailable"
    );

  }


  return response.json();

}


async function commonsPhotoInfo(
  filename,
  host
) {

  const params =
    new URLSearchParams({

      action:"query",

      format:"json",

      origin:"*",

      prop:"imageinfo",

      iiprop:
        "url|extmetadata",

      iiurlwidth:"1400",

      titles:
        "File:" + filename

    });


  const data =
    await photoJSON(

      host +
      "/w/api.php?" +
      params

    );


  return Object.values(
    data.query?.pages || {}
  )[0]
    ?.imageinfo?.[0] ||
    null;

}


function wikipediaCityPhoto(
  airport
) {

  const title =
    wikipediaCityPages[
      airport.code
    ] ||
    airport.city;


  if (
    wikipediaCityCache.has(
      title
    )
  ) {

    return wikipediaCityCache.get(
      title
    );

  }


  const task =
    (async () => {

      const summary =
        await photoJSON(

          "https://en.wikipedia.org/api/rest_v1/page/summary/" +

          encodeURIComponent(
            title
          )

        );


      if (
        summary.type ===
        "disambiguation"
      ) {

        return null;

      }


      const source =
        summary.originalimage
          ?.source;


      if (!source)
        return null;


      const parts =
        new URL(source)

          .pathname

          .split("/")

          .filter(Boolean);


      const filename =
        decodeURIComponent(

          parts.includes("thumb")

            ? parts.at(-2)

            : parts.at(-1)

        );


      if (
        /\.svg$/i.test(
          filename
        )
      ) {

        return null;

      }


      const info =

        await commonsPhotoInfo(

          filename,

          "https://commons.wikimedia.org"

        ) ||

        await commonsPhotoInfo(

          filename,

          "https://en.wikipedia.org"

        );


      if (
        !info?.extmetadata ||
        !info.descriptionurl ||
        !(info.thumburl || info.url)
      ) {

        return null;

      }


      const author =
        plainText(
          info.extmetadata
            .Artist
            ?.value
        ) ||
        "Wikimedia contributor";


      const license =
        plainText(
          info.extmetadata
            .LicenseShortName
            ?.value
        ) ||
        "Image details";


      return {

        url:
          info.thumburl ||
          info.url,

        credit:
          `Photo: ${author} · ${license}`,

        source:
          info.descriptionurl

      };

    })()

    .catch(
      () => null
    );


  wikipediaCityCache.set(
    title,
    task
  );


  return task;

}


/* =====================================================
   UPDATE CITY PHOTO
   ===================================================== */

function updateCityPhoto(
  airport
) {

  const request =
    ++cityPhotoRequest;


  const background =
    document.getElementById(
      "heroBackground"
    );


  const credit =
    document.getElementById(
      "heroPhotoCredit"
    );


  if (!background)
    return;


  background.style.backgroundImage =

    `url("${
      cityImages[airport.code] ||
      defaultCityImage
    }")`;


  if (credit)
    credit.hidden = true;


  wikipediaCityPhoto(
    airport
  )

  .then(
    photo => {

      if (
        !photo ||
        request !== cityPhotoRequest
      ) {

        return;

      }


      const image =
        new Image();


      image.onload =
        () => {

          if (
            request !==
            cityPhotoRequest
          ) {

            return;

          }


          background.style.backgroundImage =
            `url("${photo.url}")`;


          if (credit) {

            credit.textContent =
              photo.credit;

            credit.href =
              photo.source;

            credit.hidden =
              false;

          }

        };


      image.src =
        photo.url;

    }
  );

}


/* =====================================================
   NETWORK DESCRIPTION
   ===================================================== */

function networkCopy(
  airport
) {

  if (
    airport.routes === 0
  ) {

    return (
      `No Frontier nonstops are listed from ${airport.code} ` +
      `in this route snapshot. Seasonal service may return.`
    );

  }


  const connections =
    possibleConnections(
      airport
    );


  return (
    `${connections.size} additional ` +
    `${connections.size === 1 ? "destination is" : "destinations are"} ` +
    `potentially reachable with one Frontier stop, excluding destinations ` +
    `already served nonstop. Route snapshot checked September 2026.`
  );

}


/* =====================================================
   DISPLAY SELECTED AIRPORT
   ===================================================== */

function showAirport(
  airport
) {

  document.getElementById(
    "airportCode"
  ).textContent =
    airport.code;


  document.getElementById(
    "airportCity"
  ).textContent =
    airport.city;


  document.getElementById(
    "airportName"
  ).textContent =
    airport.name;


  const scoreElement =
    document.getElementById(
      "score"
    );

  if (scoreElement) {
    scoreElement.textContent =
      airport.score;
  }


  const connections =
    possibleConnections(
      airport
    );


  const routeLabel =
    document.getElementById(
      "routeLabel"
    );

  if (routeLabel) {

    routeLabel.textContent =

      `${airport.routes} ` +

      `${airport.routes === 1
        ? "nonstop destination"
        : "nonstop destinations"
      } · ` +

      `${connections.size} possible one-stop`;

  }


  document.getElementById(
    "airportSelect"
  ).value =
    airport.code;


  updateCityPhoto(
    airport
  );

  /* Booking uses the airport's embedded timezone and
     remains independent from the weather request. */
  try {
    setBookingAirport(
      airport
    );
  } catch (bookingError) {
    console.warn(
      "Booking dashboard could not update:",
      bookingError
    );
  }

selectSecurityAirport(airport);
loadDepartureBoard(airport);

updateWeather(
  airport
);

updateRadar(
  airport
);

updateLiveCam(
  airport
);

}


/* =====================================================
   LOOKUP
   ===================================================== */

function airportByCode(
  code
) {

  return airports.find(

    airport =>
      airport.code === code

  );

}


/* =====================================================
   EVENTS
   ===================================================== */

document
  .getElementById(
    "changeAirport"
  )
  ?.addEventListener(
    "click",
    () => {

      const chooser =
        document.getElementById(
          "airportChooser"
        );


      chooser.style.display =

        chooser.style.display ===
        "block"

          ? "none"

          : "block";

    }
  );


document
  .getElementById(
    "airportSelect"
  )
  ?.addEventListener(
    "change",
    function () {

      const airport =
        airportByCode(
          this.value
        );


      if (airport) {

        showAirport(
          airport
        );

      }

    }
  );

/* =====================================================
   STAGE 2 — WEATHER
   ===================================================== */
/* =====================================================
   AIRPORT COMMAND CENTER — LIVE CAMERAS
   ===================================================== */

const airportLiveCams = {

  LAS: {
    label: "LIVE AT LAS",
    provider: "Flightradar24",
    type: "youtube",
    videoId: "V7_orOtu-oo",
    source:
      "https://www.youtube.com/watch?v=V7_orOtu-oo"
  },

  LGA: {
    label: "LIVE AT LGA",
    provider: "Flightradar24",
    type: "youtube",
    videoId: "OUBslrCqREs",
    source:
      "https://www.youtube.com/watch?v=OUBslrCqREs"
  },

  MSY: {
    label: "LIVE AT MSY",
    provider: "Flightradar24",
    type: "embed",
    embed:
      "https://camstreamer.com/embed/RsO6gPW2odaFam0VSW33AaHj5spi00OL7z85crl0?rel=0",
    source:
      "https://www.youtube.com/watch?v=MH0_mPt-VXE"
  },

  RNO: {
    label: "LIVE AT RNO",
    provider: "Flightradar24",
    type: "embed",
    embed:
      "https://camstreamer.com/embed/DXT3Lse8aEQDJol8f0KjKaS4iMBaAQeDVkzB3Dmk?rel=0",
    source:
      "https://camstreamer.com/live/stream/837936405-rno-reno-airport-live-24-7"
  },

  LAX: {
    label: "LIVE AT LAX",
    provider: "Airline Videos Live",
    type: "youtube",
    videoId: "69lhJSzgfK8",
    source:
      "https://www.youtube.com/watch?v=69lhJSzgfK8"
  }

};


let liveCamAirport = null;
let liveCamDefinition = null;
let liveCamLoadedCode = "";


function liveCamDesktopEnabled() {

  return window.matchMedia(
    "(min-width: 701px)"
  ).matches;

}


function liveCamIsActive() {

  return (
    liveCamDesktopEnabled() &&
    !document.hidden &&
    weatherCardVisible
  );

}


function unloadLiveCam() {

  const frame =
    document.getElementById(
      "airportLiveCamFrame"
    );

  if (frame) {
    frame.replaceChildren();
  }

  liveCamLoadedCode = "";

}


function loadLiveCam() {

  if (
    !liveCamAirport ||
    !liveCamDefinition ||
    !liveCamIsActive()
  ) {
    return;
  }


  if (
    liveCamLoadedCode ===
    liveCamAirport.code
  ) {
    return;
  }


  const frame =
    document.getElementById(
      "airportLiveCamFrame"
    );


  if (!frame) {
    return;
  }


  unloadLiveCam();


  const iframe =
    document.createElement(
      "iframe"
    );


  iframe.title =
    `Live camera at ${liveCamAirport.code}`;


  iframe.loading =
    "lazy";


  iframe.referrerPolicy =
    "strict-origin-when-cross-origin";


  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";


  iframe.allowFullscreen =
    true;


  if (
    liveCamDefinition.type ===
    "youtube"
  ) {

    iframe.src =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(
        liveCamDefinition.videoId
      ) +
      "?autoplay=1&mute=1&playsinline=1&rel=0";

  } else {

    iframe.src =
      liveCamDefinition.embed;

  }


  frame.appendChild(
    iframe
  );


  liveCamLoadedCode =
    liveCamAirport.code;

}


function updateLiveCam(
  airport
) {

  liveCamAirport =
    airport;


  liveCamDefinition =
    airportLiveCams[
      airport.code
    ] ||
    null;


  const container =
    document.getElementById(
      "airportLiveCam"
    );


  const label =
    document.getElementById(
      "airportLiveCamLabel"
    );


  const source =
    document.getElementById(
      "airportLiveCamSource"
    );


  unloadLiveCam();


  if (
    !container ||
    !liveCamDefinition ||
    !liveCamDesktopEnabled()
  ) {

    if (container) {
      container.hidden =
        true;
    }

    return;

  }


  if (label) {

    label.textContent =
      liveCamDefinition.label;

  }


  if (source) {

    source.href =
      liveCamDefinition.source;


    source.textContent =
      `${liveCamDefinition.provider} ↗`;


    source.hidden =
      false;

  }


  container.hidden =
    false;


  loadLiveCam();

}


function syncLiveCamActivity() {

  const container =
    document.getElementById(
      "airportLiveCam"
    );


  if (
    !liveCamDefinition ||
    !liveCamDesktopEnabled()
  ) {

    unloadLiveCam();

    if (container) {
      container.hidden =
        true;
    }

    return;

  }


  if (container) {
    container.hidden =
      false;
  }


  if (
    liveCamIsActive()
  ) {

    loadLiveCam();

  } else {

    unloadLiveCam();

  }

}


window
  .matchMedia(
    "(min-width: 701px)"
  )
  .addEventListener?.(
    "change",
    () => {

      if (
        liveCamAirport
      ) {

        updateLiveCam(
          liveCamAirport
        );

      }

    }
  );


/* =====================================================
   AIRPORT WEATHER RADAR — STATIC MAP + RAINVIEWER
   Existing HTML IDs and weather activity hooks are retained.
   No Leaflet, basemap tiles, API key, or external CSS required.
   ===================================================== */

const radarManifestURL =
  "https://api.rainviewer.com/public/weather-maps.json";
const radarRefreshMilliseconds = 300000;
const radarImageWidth = 640;
const radarImageHeight = 360;
const radarZoom = 6;
const radarWorldPixels = 256 * (2 ** radarZoom);
const radarWorldMeters = 2 * Math.PI * 6378137;

let radarAirport = null;
let radarView = null;
let radarRefreshTimer = null;
let radarRequestSequence = 0;
let radarController = null;
let radarManifestCache = null;
let radarManifestFetchedAt = 0;
let radarLastAttemptAt = 0;
const radarBaseCache = new Map();

function radarDesktopEnabled() {
  return window.matchMedia("(min-width: 701px)").matches;
}

function radarIsActive() {
  return radarDesktopEnabled() && !document.hidden && weatherCardVisible;
}

function radarAirportKey(airport) {
  return `${airport.code}:${airport.lat}:${airport.lon}`;
}

function radarTimeLabel(frame, airport) {
  const date = new Date(frame.time * 1000);
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: airport.timezone,
      hour: "numeric", minute: "2-digit", timeZoneName: "short"
    }).format(date);
  } catch (_) {
    return date.toLocaleTimeString("en-US", {
      timeZone: "UTC", hour: "numeric", minute: "2-digit", timeZoneName: "short"
    });
  }
}

/* Fixed logical geometry avoids measuring a hidden/transitioning card.
 * Both layers share this exact EPSG:3857 extent and centered crop.
 */
function radarGeometry(airport) {
  const lat = Number(airport.lat);
  const lon = Number(airport.lon);
  if (airport.lat == null || airport.lon == null ||
      !Number.isFinite(lat) || !Number.isFinite(lon) ||
      Math.abs(lat) > 85.05112878 || Math.abs(lon) > 180) {
    throw new Error("Airport map coordinates are unavailable.");
  }
  const sin = Math.sin(lat * Math.PI / 180);
  const x = (lon + 180) / 360 * radarWorldPixels;
  const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * radarWorldPixels;
  const metersPerPixel = radarWorldMeters / radarWorldPixels;
  const centerX = (x / radarWorldPixels - 0.5) * radarWorldMeters;
  const centerY = (0.5 - y / radarWorldPixels) * radarWorldMeters;
  const halfWidth = radarImageWidth * metersPerPixel / 2;
  const halfHeight = radarImageHeight * metersPerPixel / 2;
  return {
    left: x - radarImageWidth / 2,
    top: y - radarImageHeight / 2,
    bbox: [centerX - halfWidth, centerY - halfHeight,
      centerX + halfWidth, centerY + halfHeight].join(",")
  };
}

function installRadarStyles() {
  if (document.getElementById("dashboardStaticRadarStyles")) return;
  const style = document.createElement("style");
  style.id = "dashboardStaticRadarStyles";
  style.textContent = `
    #weatherRadar { min-width: 0; max-width: 100%; }
    #weatherRadar[hidden] { display: none !important; }
    #weatherRadarMap {
      position: relative !important; display: block !important;
      width: 100% !important; max-width: 100% !important; min-width: 0 !important;
      height: 240px !important; min-height: 240px !important; max-height: 240px !important;
      flex: 0 0 240px !important; aspect-ratio: auto !important;
      padding: 0 !important; box-sizing: border-box !important;
      overflow: hidden !important; isolation: isolate;
      background: #e6e9e2 !important; border-radius: 12px;
    }
    #weatherRadarMap .dashboard-radar-static-layer {
      position: absolute !important; display: block !important;
      left: 50% !important; top: 50% !important; right: auto !important; bottom: auto !important;
      width: 100% !important; height: 100% !important;
      min-width: 0 !important; max-width: none !important;
      min-height: 0 !important; max-height: none !important;
      margin: 0 !important; padding: 0 !important;
      transform: translate(-50%, -50%) !important;
      object-fit: cover !important; object-position: center !important;
      pointer-events: none;
    }
    #weatherRadarMap .dashboard-radar-static-base { z-index: 0; }
    #weatherRadarMap .dashboard-radar-static-overlay { z-index: 1; opacity: .82; }
    #weatherRadarMap .dashboard-radar-static-marker {
      position: absolute; left: 50%; top: 50%; z-index: 2;
      width: 14px; height: 14px; box-sizing: border-box;
      transform: translate(-50%, -50%); border: 3px solid white;
      border-radius: 50%; background: #234d37; box-shadow: 0 0 0 2px #234d37, 0 2px 7px #0007;
    }
    #weatherRadarMap .dashboard-radar-static-message {
      position: absolute; inset: 0; display: grid; place-items: center;
      padding: 20px; text-align: center; color: #33463b; font-size: 13px;
    }
    #weatherRadarMap .dashboard-radar-static-credit {
      position: absolute; bottom: 0; right: 0; z-index: 3;
      max-width: 100%; padding: 3px 6px; background: #ffffffeb;
      color: #26352d; font: 10px/1.3 sans-serif; text-align: right;
    }
    #weatherRadarMap .dashboard-radar-static-credit a { color: #26352d; text-decoration: underline; }
  `;
  document.head.appendChild(style);
}

function radarLink(label, url) {
  const link = document.createElement("a");
  link.textContent = label;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function prepareRadarView(airport) {
  const map = document.getElementById("weatherRadarMap");
  if (!map) return null;
  const key = radarAirportKey(airport);
  if (radarView?.key === key && radarView.map === map) return radarView;
  installRadarStyles();
  map.replaceChildren();
  map.setAttribute("role", "group");
  map.setAttribute("aria-label", `Weather radar map centered on ${airport.code}`);
  const message = document.createElement("div");
  message.className = "dashboard-radar-static-message";
  message.textContent = "Loading airport map…";
  const marker = document.createElement("div");
  marker.className = "dashboard-radar-airport-marker dashboard-radar-static-marker";
  marker.title = `${airport.code} airport`;
  marker.setAttribute("aria-label", `${airport.code} airport location`);
  const credit = document.createElement("div");
  credit.className = "dashboard-radar-static-credit";
  credit.append(
    radarLink("Map: Esri & contributors", "https://goto.arcgisonline.com/maps/World_Street_Map"),
    document.createTextNode(" · "),
    radarLink("Radar: RainViewer", "https://www.rainviewer.com/")
  );
  map.append(message, marker, credit);
  const source = document.getElementById("weatherRadarSource");
  if (source?.tagName === "A") {
    source.href = "https://www.rainviewer.com/";
    source.textContent = "RainViewer ↗";
    source.hidden = false;
  }
  radarView = {key, map, message, marker, credit, base: null, overlay: null, framePath: ""};
  return radarView;
}

function radarStatus(text) {
  const time = document.getElementById("weatherRadarTime");
  if (time) time.textContent = text;
  if (radarView) radarView.map.title = text;
}

/* Decode an image before displaying it. No cross-origin pixel reads are
 * needed: the radar canvas is displayed directly, never exported.
 */
function loadRadarImage(url, signal) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.referrerPolicy = "strict-origin-when-cross-origin";
    let finished = false;
    const timer = setTimeout(() => finish(new Error("Map image timed out.")), 15000);
    const abort = () => finish(new DOMException("Radar request canceled.", "AbortError"));
    function finish(error) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      image.onload = image.onerror = null;
      if (error) { image.removeAttribute("src"); reject(error); }
      else resolve(image);
    }
    image.onload = () => {
      if (!image.naturalWidth || !image.naturalHeight) {
        finish(new Error("Map image was empty."));
        return;
      }
      // onload already guarantees image decoding; avoid decode() incompatibilities.
      finish();
    };
    image.onerror = () => finish(new Error("Map image could not load."));
    signal.addEventListener("abort", abort, {once: true});
    if (signal.aborted) abort();
    else image.src = url;
  });
}

async function loadRadarBase(geometry, key, signal) {
  if (radarBaseCache.has(key)) return radarBaseCache.get(key).cloneNode();
  const parameters = new URLSearchParams({
    bbox: geometry.bbox, bboxSR: "3857", imageSR: "3857",
    size: `${radarImageWidth},${radarImageHeight}`,
    format: "png32", transparent: "false", dpi: "96", f: "image"
  });
  // Each service returns ONE complete image; no browser basemap tile grid.
  for (const service of ["World_Street_Map", "World_Topo_Map"]) {
    try {
      const image = await loadRadarImage(
        `https://services.arcgisonline.com/ArcGIS/rest/services/${service}/MapServer/export?${parameters}`,
        signal
      );
      image.className = "dashboard-radar-static-layer dashboard-radar-static-base";
      image.alt = "";
      image.dataset.mapService = service;
      radarBaseCache.set(key, image);
      if (radarBaseCache.size > 12) radarBaseCache.delete(radarBaseCache.keys().next().value);
      return image;
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  throw new Error("Static map services are unavailable.");
}

async function getRadarManifest(signal) {
  if (radarManifestCache && Date.now() - radarManifestFetchedAt < radarRefreshMilliseconds) {
    return radarManifestCache;
  }
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal.addEventListener("abort", abort, {once: true});
  if (signal.aborted) controller.abort();
  const timer = setTimeout(abort, 12000);
  try {
    const response = await fetch(radarManifestURL, {signal: controller.signal, cache: "no-cache"});
    if (!response.ok) throw new Error(`Radar API returned HTTP ${response.status}`);
    const data = await response.json();
    if (!data?.host || !Array.isArray(data?.radar?.past)) {
      throw new Error("Radar API response was invalid.");
    }
    const host = new URL(data.host);
    if (host.protocol !== "https:" ||
        !(host.hostname === "rainviewer.com" || host.hostname.endsWith(".rainviewer.com"))) {
      throw new Error("Radar image host was invalid.");
    }
    radarManifestCache = data;
    radarManifestFetchedAt = Date.now();
    return data;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", abort);
  }
}

async function loadRadarOverlay(manifest, frame, geometry, signal) {
  const canvas = document.createElement("canvas");
  canvas.width = radarImageWidth;
  canvas.height = radarImageHeight;
  canvas.className = "dashboard-radar-static-layer dashboard-radar-static-overlay";
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Radar image rendering is unavailable.");
  const jobs = [];
  const count = 2 ** radarZoom;
  for (let y = Math.floor(geometry.top / 256);
       y <= Math.floor((geometry.top + radarImageHeight - 1) / 256); y++) {
    for (let x = Math.floor(geometry.left / 256);
         x <= Math.floor((geometry.left + radarImageWidth - 1) / 256); x++) {
      if (y < 0 || y >= count) continue;
      const wrappedX = ((x % count) + count) % count;
      const url = `${manifest.host.replace(/\/$/, "")}${frame.path}/256/${radarZoom}/${wrappedX}/${y}/2/1_1.png`;
      jobs.push(loadRadarImage(url, signal).then(image => {
        context.drawImage(image, x * 256 - geometry.left, y * 256 - geometry.top, 256, 256);
      }));
    }
  }
  // Atomic commit: one failed radar tile leaves the COMPLETE base visible.
  await Promise.all(jobs);
  return canvas;
}

async function refreshRadar() {
  if (!radarAirport || !radarView || !radarIsActive() || radarController) return;
  const airport = radarAirport;
  const view = radarView;
  const sequence = ++radarRequestSequence;
  const controller = new AbortController();
  radarController = controller;
  radarLastAttemptAt = Date.now();
  const current = () => sequence === radarRequestSequence && radarView === view && radarIsActive();
  try {
    const geometry = radarGeometry(airport);
    if (!view.base) {
      const image = await loadRadarBase(geometry, view.key, controller.signal);
      if (!current()) return;
      view.map.prepend(image);
      view.base = image;
      view.message.remove();
      view.credit.firstChild.href = `https://goto.arcgisonline.com/maps/${image.dataset.mapService}`;
      radarStatus("Map ready · Loading radar…");
    }
    const manifest = await getRadarManifest(controller.signal);
    if (!current()) return;
    const frame = manifest.radar.past
      .filter(item => Number.isFinite(item.time) && /^\/v2\/radar\/[^?#]+$/.test(item.path))
      .reduce((latest, item) => !latest || item.time > latest.time ? item : latest, null);
    if (!frame) throw new Error("No radar frames available.");
    // Do not present an old feed as current weather.
    if (Date.now() - frame.time * 1000 > 1800000 || frame.time * 1000 > Date.now() + 300000) {
      throw new Error("Latest radar frame is stale.");
    }
    if (view.framePath !== frame.path || !view.overlay) {
      const overlay = await loadRadarOverlay(manifest, frame, geometry, controller.signal);
      if (!current()) return;
      view.overlay?.remove();
      view.map.insertBefore(overlay, view.marker);
      view.overlay = overlay;
      view.framePath = frame.path;
    }
    radarStatus(`Latest radar · ${radarTimeLabel(frame, airport)}`);
  } catch (error) {
    if (!current()) return;
    controller.abort();
    view.overlay?.remove();
    view.overlay = null;
    view.framePath = "";
    if (view.base) radarStatus("Radar unavailable · Static map");
    else {
      view.message.textContent = "Airport map temporarily unavailable. It will retry automatically.";
      radarStatus("Map unavailable");
    }
    console.info("Airport radar:", error.message);
  } finally {
    if (radarController === controller) radarController = null;
  }
}

function stopRadarAnimation() {
  clearInterval(radarRefreshTimer);
  radarRefreshTimer = null;
  if (radarController) {
    radarRequestSequence++;
    radarController.abort();
    radarController = null;
    // An interrupted request should resume immediately on activation.
    radarLastAttemptAt = 0;
  }
}

function syncRadarActivity() {
  const container = document.getElementById("weatherRadar");
  if (!container || !radarAirport) return;
  container.hidden = !radarDesktopEnabled();
  if (!radarIsActive()) { stopRadarAnimation(); return; }
  if (!radarView) radarView = prepareRadarView(radarAirport);
  if (!radarView) return;
  if (!radarLastAttemptAt || Date.now() - radarLastAttemptAt >= radarRefreshMilliseconds) {
    void refreshRadar();
  }
  if (!radarRefreshTimer) {
    radarRefreshTimer = setInterval(() => {
      if (radarIsActive()) void refreshRadar();
      else stopRadarAnimation();
    }, radarRefreshMilliseconds);
  }
}

function updateRadar(airport) {
  stopRadarAnimation();
  radarRequestSequence++;
  radarAirport = airport;
  radarLastAttemptAt = 0;
  const container = document.getElementById("weatherRadar");
  if (!container) return;
  const label = document.getElementById("weatherRadarLabel");
  if (label) label.textContent = `RADAR · ${airport.code}`;
  // Clear old airport imagery even if its replacement is currently inactive.
  radarView = prepareRadarView(airport);
  if (radarView && !radarView.base) radarStatus("Loading airport map…");
  syncRadarActivity();
}

window.matchMedia("(min-width: 701px)").addEventListener?.("change", syncRadarActivity);


const weatherImages = {

  clearDay:
    "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?q=80&w=1400&auto=format&fit=crop",

  partlyCloudyDay:
    "https://images.unsplash.com/photo-1595865749889-b37a43c4eba4?q=80&w=1400&auto=format&fit=crop",

  cloudyDay:
    "https://images.unsplash.com/photo-1591552265137-99c59d9f4927?q=80&w=1400&auto=format&fit=crop",

  rainDay:
    "https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?q=80&w=1400&auto=format&fit=crop",

  storm:
    "https://images.unsplash.com/photo-1560928863-e140ee0fc733?q=80&w=1400&auto=format&fit=crop",

  snowDay:
    "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1400&auto=format&fit=crop",

  snowNight:
    "https://images.unsplash.com/photo-1637765435788-11281303943a?q=80&w=1400&auto=format&fit=crop",

  fogDay:
    "https://plus.unsplash.com/premium_photo-1669612905191-48c67547f9a0?q=80&w=1400&auto=format&fit=crop",

  fogNight:
    "https://images.unsplash.com/photo-1619204715997-1367fe5812f1?q=80&w=1400&auto=format&fit=crop",

  clearNight:
    "https://images.unsplash.com/photo-1472552944129-b035e9ea3744?q=80&w=1400&auto=format&fit=crop",

  partlyCloudyNight:
    "https://images.unsplash.com/photo-1647941953367-6ff24a0e5857?q=80&w=1400&auto=format&fit=crop",

  cloudyNight:
    "https://images.unsplash.com/photo-1724147127863-cbe02527966b?q=80&w=1400&auto=format&fit=crop",

  rainNight:
    "https://images.unsplash.com/photo-1619256291575-d98d823a2c4a?w=1400&auto=format&fit=crop&q=75"

};


function weatherLabel(code) {

  code = Number(code);

  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";

  if (code === 45 || code === 48)
    return "Fog";

  if (code >= 51 && code <= 57)
    return "Drizzle";

  if (code >= 61 && code <= 67)
    return "Rain";

  if (code >= 71 && code <= 77)
    return "Snow";

  if (code >= 80 && code <= 82)
    return "Showers";

  if (code >= 85 && code <= 86)
    return "Snow showers";

  if (code >= 95)
    return "Thunderstorms";

  return "Mixed conditions";

}


function weatherImage(code, isDay) {

  code = Number(code);

  if (code >= 95)
    return weatherImages.storm;

  if (
    (code >= 71 && code <= 77) ||
    (code >= 85 && code <= 86)
  ) {
    return isDay
      ? weatherImages.snowDay
      : weatherImages.snowNight;
  }

  if (code === 45 || code === 48) {
    return isDay
      ? weatherImages.fogDay
      : weatherImages.fogNight;
  }

  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return isDay
      ? weatherImages.rainDay
      : weatherImages.rainNight;
  }

  if (code === 3) {
    return isDay
      ? weatherImages.cloudyDay
      : weatherImages.cloudyNight;
  }

  if (code === 2) {
    return isDay
      ? weatherImages.partlyCloudyDay
      : weatherImages.partlyCloudyNight;
  }

  return isDay
    ? weatherImages.clearDay
    : weatherImages.clearNight;

}


/* Weather video backgrounds and FAA notices. */
function weatherVideo(code, isDay) {
  code = Number(code);
  if ([95, 96, 99].includes(code)) return isDay ? "stormydaywv.mp4" : null;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return isDay ? "snowydaywv.mp4" : "snowynightwv.mp4";
  // Fog and freezing precipitation retain their existing still images.
  if ([45, 48, 56, 57, 66, 67].includes(code)) return null;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return isDay ? "rainydaywv.mp4" : "rainynightwv.mp4";
  if (code === 3) return isDay ? "cloudydaywv.mp4" : null;
  if (code === 2) return isDay ? "partlycloudydaywv.mp4" : null;
  if ([0, 1].includes(code)) return isDay ? "cleardaywv.mp4" : "clearnightwv.mp4";
  return null;
}

let weatherRequestSequence = 0;
const weatherMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let weatherVideoFile = null;
let weatherVideoSequence = 0;
let weatherVideoFailed = false;
let weatherCardVisible = true;
let faaAirport = null;
let faaController = null;
let faaSequence = 0;
const faaResults = new Map();

function weatherIsActive() {
  return !document.hidden && weatherCardVisible;
}

function clearWeatherVideo() {
  weatherVideoSequence++;
  const video = document.getElementById("weatherVideo");
  if (!video) return;
  video.onplaying = null;
  video.onerror = null;
  video.pause();
  video.classList.remove("is-playing");
  if (video.hasAttribute("src")) {
    video.removeAttribute("src");
    video.load();
  }
}

function syncWeatherVideo() {
  const video = document.getElementById("weatherVideo");
  if (!video) return;
  if (!weatherVideoFile || weatherVideoFailed || weatherMotionPreference.matches || navigator.connection?.saveData) {
    clearWeatherVideo();
    return;
  }
  if (!weatherIsActive()) {
    weatherVideoSequence++;
    video.pause();
    video.classList.remove("is-playing");
    return;
  }
  const token = ++weatherVideoSequence;
  const url = new URL(`videos/${weatherVideoFile}`, document.baseURI).href;
  video.muted = true;
  video.onplaying = () => {
    if (token === weatherVideoSequence && weatherIsActive()) video.classList.add("is-playing");
  };
  video.onerror = () => {
    if (token !== weatherVideoSequence) return;
    weatherVideoFailed = true;
    clearWeatherVideo();
  };
  if (video.src !== url) {
    video.classList.remove("is-playing");
    video.src = url;
    video.load();
  }
  video.play().catch(() => {
    if (token !== weatherVideoSequence) return;
    weatherVideoFailed = true;
    clearWeatherVideo();
  });
}

function setWeatherBackground(code, isDay) {
  const photo = document.getElementById("weatherBackground");
  if (photo) photo.style.backgroundImage = `url("${weatherImage(code, isDay)}")`;
  const next = weatherVideo(code, isDay);
  if (next !== weatherVideoFile) clearWeatherVideo();
  weatherVideoFile = next;
  weatherVideoFailed = false;
  syncWeatherVideo();
}

function hideFAA() {
  const panel = document.getElementById("faaNotice");
  if (panel) { panel.hidden = true; panel.replaceChildren(); }
  const assessment = document.getElementById("weatherMessage");
  if (assessment) assessment.style.display = "";
}

function renderFAA(data, airport) {
  const panel = document.getElementById("faaNotice");
  if (!panel) return;
  hideFAA();
  if (!Array.isArray(data.events) || !data.events.length) return;
  for (const event of data.events) {
    const item = document.createElement("div");
    item.className = "dashboard-faa-event";
    const heading = document.createElement("strong");
    heading.textContent = `FAA ${event.title} · ${airport.code}`;
    item.append(heading);
    const reason = document.createElement("span");
    reason.textContent = event.reason || "Reason not provided by FAA.";
    item.append(reason);
    const details = [];
    if (event.averageDelay) details.push(`Average delay: ${event.averageDelay}`);
    if (event.minimumDelay) details.push(`Minimum delay: ${event.minimumDelay}`);
    if (event.maximumDelay) details.push(`Maximum delay: ${event.maximumDelay}`);
    if (event.endTime) details.push(`Until ${event.endTime} (FAA estimate)`);
    if (event.startTime) details.push(`Starts: ${event.startTime}`);
    if (event.reopenTime) details.push(`Reopens: ${event.reopenTime}`);
    if (event.trend) details.push(`Trend: ${event.trend}`);
    if (details.length) {
      const detail = document.createElement("span");
      detail.textContent = details.join(" · ");
      item.append(detail);
    }
    if (event.type === "ground_stop" || event.type === "ground_delay") {
      const scope = document.createElement("span");
      scope.textContent = "Affects covered flights headed to this airport; check your airline for your flight’s status.";
      item.append(scope);
    }
    panel.append(item);
  }
  const foot = document.createElement("div");
  foot.className = "dashboard-faa-source";
  const link = document.createElement("a");
  link.href = "https://nasstatus.faa.gov/";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "FAA airport status";
  const updated = new Intl.DateTimeFormat("en-US", {timeZone: airport.timezone,
    hour: "numeric", minute: "2-digit", timeZoneName: "short"}).format(new Date(data.updatedAt));
  foot.append(link, document.createTextNode(` · Updated ${updated}`));
  panel.append(foot);
  panel.hidden = false;
  // The active FAA notice takes precedence over the separate forecast assessment.
  const assessment = document.getElementById("weatherMessage");
  if (assessment) assessment.style.display = "none";
}

function selectFAAAirport(airport) {
  faaSequence++;
  faaController?.abort();
  faaController = null;
  faaAirport = airport;
  hideFAA();
  refreshFAA();
}

async function refreshFAA() {
  if (!faaAirport || !weatherIsActive() || !document.getElementById("faaNotice")) return;
  const airport = faaAirport;
  const cached = faaResults.get(airport.code);
  const now = Date.now();
  if (cached && now - cached.receivedAt < 300000 && now - Date.parse(cached.data.updatedAt) < 900000) {
    renderFAA(cached.data, airport);
    return;
  }
  if (faaController) return;
  hideFAA();
  const sequence = ++faaSequence;
  const controller = new AbortController();
  faaController = controller;
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(boardStatusURL, {method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "airport-status", airport: airport.code}), signal: controller.signal});
    if (!response.ok) throw new Error(`FAA lookup returned HTTP ${response.status}`);
    const data = await response.json();
    if (sequence !== faaSequence || faaAirport?.code !== airport.code || !weatherIsActive()) return;
    if (!Array.isArray(data.events) || data.airport !== airport.code || !Number.isFinite(Date.parse(data.updatedAt)) ||
        Date.now() - Date.parse(data.updatedAt) > 900000) throw new Error("FAA feed unavailable or stale");
    faaResults.set(airport.code, {data, receivedAt: Date.now()});
    renderFAA(data, airport);
  } catch (error) {
    if (sequence === faaSequence) {
      hideFAA();
      if (error.name !== "AbortError") console.info("FAA notice unavailable:", error.message);
    }
  } finally {
    clearTimeout(timer);
    if (faaController === controller) faaController = null;
  }
}

function syncWeatherActivity() {
  syncWeatherVideo();
  syncRadarActivity();
  syncLiveCamActivity();
  if (weatherIsActive()) refreshFAA();
  else {
    faaSequence++;
    faaController?.abort();
    faaController = null;
  }
}

function initializeWeatherEnhancements() {
  const card = document.querySelector(".dashboard-weather");
  if (card && "IntersectionObserver" in window) {
    weatherCardVisible = false;
    const observer = new IntersectionObserver(entries => {
      weatherCardVisible = entries[0].isIntersecting;
      syncWeatherActivity();
    }, {threshold: 0});
    observer.observe(card);
  }
  document.addEventListener("visibilitychange", syncWeatherActivity);
  if (weatherMotionPreference.addEventListener) weatherMotionPreference.addEventListener("change", syncWeatherVideo);
  else weatherMotionPreference.addListener(syncWeatherVideo);
  // No background cron: these checks do nothing when the card/tab is not visible.
  setInterval(() => { if (weatherIsActive()) refreshFAA(); }, 60000);
}


async function getWeather(airport) {

  const currentVars = [
    "temperature_2m",
    "weather_code",
    "is_day",
    "wind_speed_10m",
    "wind_gusts_10m"
  ].join(",");

  const hourlyVars = [
    "visibility",
    "weather_code",
    "precipitation_probability",
    "precipitation",
    "snowfall",
    "wind_gusts_10m"
  ].join(",");

  const dailyVars = [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max"
  ].join(",");

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + encodeURIComponent(airport.lat) +
    "&longitude=" + encodeURIComponent(airport.lon) +
    "&current=" + currentVars +
    "&hourly=" + hourlyVars +
    "&daily=" + dailyVars +
    "&temperature_unit=fahrenheit" +
    "&wind_speed_unit=mph" +
    "&precipitation_unit=inch" +
    "&timezone=auto" +
    "&forecast_days=3";

  const response =
    await fetch(url);

  if (!response.ok)
    throw new Error("Weather unavailable");

  return response.json();

}


function analyzeWeather(weather, airport) {

  const hourly = weather.hourly;
  const current = weather.current;

  if (!hourly?.time?.length)
    return null;

  let startIndex =
    hourly.time.findIndex(
      time =>
        time >= current.time
    );

  if (startIndex < 0)
    startIndex = 0;

  const endIndex =
    Math.min(
      hourly.time.length,
      startIndex + 37
    );

  const upcoming = [];

  for (
    let i = startIndex;
    i < endIndex;
    i++
  ) {

    upcoming.push({

      code:
        Number(
          hourly.weather_code[i]
        ),

      visibility:
        Number(
          hourly.visibility[i]
        ) / 1609.344,

      precip:
        Number(
          hourly.precipitation[i]
        ) || 0,

      precipChance:
        Number(
          hourly.precipitation_probability[i]
        ) || 0,

      snow:
        Number(
          hourly.snowfall[i]
        ) || 0,

      gust:
        Number(
          hourly.wind_gusts_10m[i]
        ) || 0

    });

  }

  const maxGust =
    Math.max(
      Number(
        current.wind_gusts_10m
      ) || 0,

      ...upcoming.map(
        hour => hour.gust
      )
    );

  const minVisibility =
    upcoming.length
      ? Math.min(
          ...upcoming.map(
            hour => hour.visibility
          )
        )
      : 999;

  const thunderHours =
    upcoming.filter(
      hour =>
        hour.code >= 95
    );

  const snowHours =
    upcoming.filter(
      hour =>
        hour.snow >= 0.1 ||
        (hour.code >= 71 && hour.code <= 77) ||
        (hour.code >= 85 && hour.code <= 86)
    );

  const heavyRainHours =
    upcoming.filter(
      hour =>
        hour.precipChance >= 70 &&
        hour.precip >= 0.10
    );

  const showGusts =
    maxGust >= 30;

  const showVisibility =
    minVisibility <= 5;

  let message;

  if (thunderHours.length) {

    message = {
      concern: true,
      title: "Thunderstorms may affect operations",
      text:
        `Storms are forecast around ${airport.code} during the next 36 hours. ` +
        `Airport slowdowns, ground stops, or reroutes are possible.`
    };

  } else if (maxGust >= 45) {

    message = {
      concern: true,
      title: "Strong winds are forecast",
      text:
        `Gusts may reach about ${Math.round(maxGust)} mph. ` +
        `Strong winds can contribute to slower airport operations.`
    };

  } else if (snowHours.length) {

    message = {
      concern: true,
      title: "Snow may affect operations",
      text:
        "Snow is forecast during the next 36 hours. " +
        "Deicing or runway conditions may contribute to slower operations."
    };

  } else if (minVisibility <= 2) {

    message = {
      concern: true,
      title: "Low visibility is possible",
      text:
        `Visibility may fall to around ${Math.max(
          0.1,
          Math.round(minVisibility * 10) / 10
        )} miles. Reduced visibility can lower airport capacity.`
    };

  } else if (heavyRainHours.length >= 2) {

    message = {
      concern: true,
      title: "Heavy rain is possible",
      text:
        "Periods of heavier rain may contribute to slower airport operations."
    };

  } else if (maxGust >= 35) {

    message = {
      concern: true,
      title: "Breezy conditions worth watching",
      text:
        `Gusts may reach about ${Math.round(maxGust)} mph during the next 36 hours.`
    };

  } else {

    message = {
      concern: false,
      title: "No major weather concerns",
      text:
        `No significant weather concerns are apparent at ${airport.code} during the next 36 hours.`
    };

  }

  return {
    maxGust,
    minVisibility,
    showGusts,
    showVisibility,
    message
  };

}


async function updateWeather(airport) {
  const requestSequence = ++weatherRequestSequence;
  clearWeatherVideo();
  weatherVideoFile = null;
  const weatherPhoto = document.getElementById("weatherBackground");
  if (weatherPhoto) weatherPhoto.style.backgroundImage = "";
  selectFAAAirport(airport);


  const condition =
    document.getElementById(
      "condition"
    );

  if (!condition)
    return;

  condition.textContent =
    "Loading...";

  try {

    const weather =
      await getWeather(
        airport
      );

    if (requestSequence !== weatherRequestSequence) return;
    const current =
      weather.current;

    const isDay =
      Number(
        current.is_day
      ) === 1;


    document.getElementById(
      "temperature"
    ).textContent =
      `${Math.round(
        current.temperature_2m
      )}°`;


    condition.textContent =
      weatherLabel(
        current.weather_code
      );


    document.getElementById(
      "wind"
    ).textContent =
      Math.round(
        current.wind_speed_10m
      );


    setWeatherBackground(current.weather_code, isDay);


    const analysis =
      analyzeWeather(
        weather,
        airport
      );


    const concerns =
      document.getElementById(
        "weatherConcerns"
      );

    const gustChip =
      document.getElementById(
        "gustConcern"
      );

    const visibilityChip =
      document.getElementById(
        "visibilityConcern"
      );


    gustChip.classList.remove(
      "show"
    );

    visibilityChip.classList.remove(
      "show"
    );


    if (
      analysis?.showGusts
    ) {

      gustChip.classList.add(
        "show"
      );

      document.getElementById(
        "gusts"
      ).textContent =
        `${Math.round(
          analysis.maxGust
        )} mph`;

    }


    if (
      analysis?.showVisibility
    ) {

      visibilityChip.classList.add(
        "show"
      );

      document.getElementById(
        "visibility"
      ).textContent =
        `${Math.max(
          0.1,
          Math.round(
            analysis.minVisibility *
            10
          ) / 10
        )} mi`;

    }


    concerns.style.display =
      analysis &&
      (
        analysis.showGusts ||
        analysis.showVisibility
      )

        ? "flex"

        : "none";


    const message =
      analysis?.message || {
        concern:false,
        title:
          "Weather forecast available",
        text:
          "No operational weather assessment is currently available."
      };


    document.getElementById(
      "weatherIcon"
    ).textContent =
      message.concern
        ? "!"
        : "✓";


    document.getElementById(
      "weatherTitle"
    ).textContent =
      message.title;


    document.getElementById(
      "weatherText"
    ).textContent =
      message.text;


    if (
      weather.daily?.time?.length > 1
    ) {

      const i = 1;

      document.getElementById(
        "tomorrowCondition"
      ).textContent =
        weatherLabel(
          weather.daily
            .weather_code[i]
        );

      const low =
        Math.round(
          weather.daily
            .temperature_2m_min[i]
        );

      const high =
        Math.round(
          weather.daily
            .temperature_2m_max[i]
        );

      const rain =
        Math.round(
          weather.daily
            .precipitation_probability_max[i] ||
          0
        );

      document.getElementById(
        "tomorrowSummary"
      ).textContent =
        `${low}°–${high}° · ${rain}% precip.`;

    }
  } catch (error) {
    if (requestSequence !== weatherRequestSequence) return;
    clearWeatherVideo();

    condition.textContent =
      "Weather unavailable";

    document.getElementById(
      "weatherTitle"
    ).textContent =
      "Weather temporarily unavailable";

    document.getElementById(
      "weatherText"
    ).textContent =
      "Frontier network information is still available.";

    document.getElementById(
      "weatherIcon"
    ).textContent =
      "–";

    document.getElementById(
      "weatherConcerns"
    ).style.display =
      "none";

  }

}
/* =====================================================
   INITIALIZE
   ===================================================== */
/* =====================================================
   STAGE 3 — GOWILD BOOKING CALENDAR
   ===================================================== */
const goWildAdvancedBookingEnd = {
  year: 2027,
  month: 4,
  day: 4
};

const goWildBlackouts = {

  2026: {
    1:[1,3,4,15,16,19],
    2:[12,13,16],
    3:[13,14,15,20,21,22,27,28,29],
    4:[3,4,5,6,10,11,12],
    5:[21,22,25],
    6:[25,26,27,28],
    7:[2,3,4,5,6],
    9:[3,4,7],
    10:[8,9,11,12],
    11:[24,25,28,29],
    12:[19,20,21,22,23,24,26,27,28,29,30,31]
  },

  2027: {
    1:[1,2,3,14,15,18],
    2:[11,12,15],
    3:[12,13,14,19,20,21,26,27,28,29],
    4:[2,3,4]
  }

};


const goWildSlugs = {
  DCA:"washington",
  IAD:"washington",
  DFW:"dallas",
  JFK:"new-york",
  LGA:"new-york",
  MDW:"chicago",
  ORD:"chicago",
  ONT:"ontario-ca",
  SNA:"orange-county",
  MSP:"minneapolis",
  ISP:"long-island",
  RDU:"raleigh",
  XNA:"fayetteville"
};


let bookingAirport = null;
let bookingTarget = null;
let bookingDayKey = "";
let bookingCalendarOffset = 0;
let bookingCalendarSignature = "";


const bookingPad =
  number =>
    String(number).padStart(2, "0");


function bookingSlug(airport) {

  return (

    goWildSlugs[airport.code] ||

    airport.city
      .split("/")[0]
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

  );

}


function bookingParts(
  date,
  timezone
) {

  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
      }
    )
    .formatToParts(date);


  const values =
    Object.fromEntries(
      parts.map(
        part => [
          part.type,
          Number(part.value)
        ]
      )
    );


  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second
  };

}


function bookingDate(
  parts,
  addDays
) {

  const date =
    new Date(
      Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day + addDays
      )
    );


  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    weekday: date.getUTCDay()
  };

}


function bookingKey(date) {

  return (
    `${date.year}-` +
    `${bookingPad(date.month)}-` +
    `${bookingPad(date.day)}`
  );

}


function bookingKnown(date) {

  return (
    date.year === 2026 ||
    (
      date.year === 2027 &&
      date.month <= 4
    )
  );

}


function bookingBlackout(date) {

  return (
    goWildBlackouts[
      date.year
    ]?.[
      date.month
    ] || []
  ).includes(
    date.day
  );

}


function bookingLabel(date) {

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


  return (
    `${days[date.weekday]} ` +
    `${bookingPad(date.month)}/` +
    `${bookingPad(date.day)}/` +
    `${date.year}`
  );

}


function bookingShortLabel(date) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    }
  ).format(
    new Date(
      Date.UTC(
        date.year,
        date.month - 1,
        date.day
      )
    )
  );

}


/* Convert midnight in the selected airport's
   timezone into a real instant. */

function bookingMidnight(
  date,
  timezone
) {

  const desired =
    Date.UTC(
      date.year,
      date.month - 1,
      date.day
    );


  let instant =
    desired;


  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const parts =
      bookingParts(
        new Date(instant),
        timezone
      );


    const shown =
      Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day,
        parts.hour,
        parts.minute,
        parts.second
      );


    instant +=
      desired - shown;

  }


  return instant;

}


/* =====================================================
   CALENDAR MONTH HELPERS
   ===================================================== */

function bookingMonth(
  today,
  offset = 0
) {

  const date =
    new Date(
      Date.UTC(
        today.year,
        today.month - 1 + offset,
        1
      )
    );


  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1
  };

}


function bookingMonthName(
  year,
  month
) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }
  ).format(
    new Date(
      Date.UTC(
        year,
        month - 1,
        1
      )
    )
  );

}


function bookingDaysInMonth(
  year,
  month
) {

  return new Date(
    Date.UTC(
      year,
      month,
      0
    )
  ).getUTCDate();

}


/* =====================================================
   DEPARTURE-DAY CALENDAR STATUS
   Uses the same 3-day schedule already loaded by
   the departure board. No additional request.
   ===================================================== */

function bookingDepartureDayStatus(
  date
) {

  if (
    !departureState ||
    !bookingAirport ||
    departureState.airport.code !== bookingAirport.code
  ) {
    return null;
  }


  const key =
    bookingKey(date);


  const localToday =
    bookingDate(
      bookingParts(
        new Date(),
        bookingAirport.timezone
      ),
      0
    );


  const knownRollingKeys =
    new Set(
      [0, 1, 2].map(
        offset =>
          bookingKey(
            bookingDate(
              localToday,
              offset
            )
          )
      )
    );


  if (!knownRollingKeys.has(key)) {
    return null;
  }


  if (
    departureState.missingKeys?.has(key)
  ) {
    return "unknown";
  }


  if (
    !departureState.loadedKeys?.has(key)
  ) {
    return "loading";
  }


  const dayFlights =
    departureState.flights.filter(
      flight =>
        bookingKey(flight.date) === key
    );


  if (!dayFlights.length) {
    return "none";
  }


  const now =
    Date.now();


  const activeFlights =
    dayFlights.filter(
      flight => {

        const live =
          boardStatusInfo(
            departureState.airport,
            flight,
            now
          );


        if (
          live?.kind === "departed" ||
          live?.kind === "cancelled"
        ) {
          return false;
        }


        if (live) {
          return live.visible;
        }


        return flight.instant > now;

      }
    );


  return activeFlights.length
    ? "active"
    : "finished";

}


/* =====================================================
   RENDER BOOKING CALENDAR
   ===================================================== */

function renderBookingCalendar() {

  if (
    !bookingAirport ||
    !bookingAirport.timezone
  ) {
    return;
  }


  const container =
    document.getElementById(
      "bookingCalendarDays"
    );


  const heading =
    document.getElementById(
      "bookingCalendarMonth"
    );


  if (
    !container ||
    !heading
  ) {
    return;
  }


  const today =
    bookingDate(
      bookingParts(
        new Date(),
        bookingAirport.timezone
      ),
      0
    );


  const tomorrow =
    bookingDate(
      today,
      1
    );


  const internationalEnd =
    bookingDate(
      today,
      10
    );


  const displayedMonth =
    bookingMonth(
      today,
      bookingCalendarOffset
    );


  const year =
    displayedMonth.year;


  const month =
    displayedMonth.month;


  const firstWeekday =
    new Date(
      Date.UTC(
        year,
        month - 1,
        1
      )
    ).getUTCDay();


  const totalDays =
    bookingDaysInMonth(
      year,
      month
    );


  const departureSignature =
    departureState &&
    departureState.airport.code === bookingAirport.code

      ? departureState.flights.map(
          flight => {

            const live =
              boardStatusInfo(
                departureState.airport,
                flight
              );

            return [
              bookingKey(flight.date),
              flight.flightNumber,
              live?.kind || "",
              live?.label || ""
            ];

          }
        )

      : [];


  const signature =
    JSON.stringify({
      airport: bookingAirport.code,
      month: `${year}-${month}`,
      today: bookingKey(today),
      loaded:
        departureState?.loadedKeys
          ? [...departureState.loadedKeys]
          : [],
      missing:
        departureState?.missingKeys
          ? [...departureState.missingKeys]
          : [],
      flights: departureSignature
    });


  if (
    bookingCalendarSignature === signature
  ) {
    return;
  }


  bookingCalendarSignature =
    signature;


  heading.textContent =
    bookingMonthName(
      year,
      month
    );


  container.replaceChildren();


  for (
    let i = 0;
    i < firstWeekday;
    i++
  ) {

    const blank =
      document.createElement(
        "span"
      );

    blank.className =
      "booking-calendar-day is-empty";

    blank.setAttribute(
      "aria-hidden",
      "true"
    );

    container.appendChild(
      blank
    );

  }


  for (
    let dayNumber = 1;
    dayNumber <= totalDays;
    dayNumber++
  ) {

    const date =
      bookingDate(
        {
          year,
          month,
          day: dayNumber
        },
        0
      );


    const key =
      bookingKey(date);


    const cell =
      document.createElement(
        "div"
      );


    cell.className =
      "booking-calendar-day";


    const number =
      document.createElement(
        "span"
      );


    number.className =
      "booking-calendar-number";


    number.textContent =
      dayNumber;


    cell.appendChild(
      number
    );


    if (
      key === bookingKey(today)
    ) {

      cell.classList.add(
        "is-today"
      );

    }


    if (
      key === bookingKey(today) ||
      key === bookingKey(tomorrow)
    ) {

      cell.classList.add(
        "is-standard"
      );

    }


    if (
      key >= bookingKey(today) &&
      key <= bookingKey(internationalEnd)
    ) {

      cell.classList.add(
        "is-international"
      );

    }


    const dayStatus =
      bookingDepartureDayStatus(
        date
      );


    const daysFromToday =
      Math.round(
        (
          Date.UTC(
            date.year,
            date.month - 1,
            date.day
          ) -
          Date.UTC(
            today.year,
            today.month - 1,
            today.day
          )
        ) /
        86400000
      );

const advancedEndKey =
  bookingKey(
    goWildAdvancedBookingEnd
  );

if (
  daysFromToday > 1 &&
  key <= advancedEndKey
) {

  cell.classList.add(
    "is-advanced"
  );

}


    if (
      bookingKnown(date) &&
      bookingBlackout(date)
    ) {

      cell.classList.add(
        "is-blackout"
      );

    }


    if (
      dayStatus === "none" ||
      dayStatus === "finished"
    ) {

      cell.classList.add(
        "no-departures"
      );


      const x =
        document.createElement(
          "span"
        );


      x.className =
        "booking-calendar-no-departures";


      x.textContent =
        "×";


      x.setAttribute(
        "aria-hidden",
        "true"
      );


      cell.appendChild(
        x
      );

    }


    const descriptions = [];


    if (
      key === bookingKey(today)
    ) {
      descriptions.push(
        "today"
      );
    }


    if (
      cell.classList.contains(
        "is-standard"
      )
    ) {
      descriptions.push(
        "standard domestic booking window"
      );
    }


    if (
      cell.classList.contains(
        "is-international"
      )
    ) {
      descriptions.push(
        "international booking window"
      );
    }


    if (
      cell.classList.contains(
        "is-advanced"
      )
    ) {
      descriptions.push(
        "advanced booking"
      );
    }


    if (
      cell.classList.contains(
        "is-blackout"
      )
    ) {
      descriptions.push(
        "GoWild blackout date"
      );
    }


    if (
      dayStatus === "none"
    ) {
      descriptions.push(
        "no Frontier departures scheduled"
      );
    }


    if (
      dayStatus === "finished"
    ) {
      descriptions.push(
        "no departures remaining"
      );
    }


    cell.setAttribute(
      "aria-label",
      `${bookingLabel(date)}${
        descriptions.length
          ? `: ${descriptions.join(", ")}`
          : ""
      }`
    );


    container.appendChild(
      cell
    );

  }

}


/* =====================================================
   UPDATE BOOKING SUMMARY
   ===================================================== */

function updateBookingDashboard() {

  if (
    !bookingAirport ||
    !bookingAirport.timezone
  ) {
    return;
  }


  const timezone =
    bookingAirport.timezone;


  const now =
    Date.now();


  const today =
    bookingDate(
      bookingParts(
        new Date(now),
        timezone
      ),
      0
    );


  const tomorrow =
    bookingDate(
      today,
      1
    );


  const internationalEnd =
    bookingDate(
      today,
      10
    );


  const key =
    `${bookingAirport.code}:${bookingKey(today)}`;


  if (
    key !== bookingDayKey
  ) {

    bookingDayKey =
      key;


    bookingCalendarSignature =
      "";


    const standardStatus =
      document.getElementById(
        "bookingStandardStatus"
      );


    const standardDate =
      document.getElementById(
        "bookingStandardDate"
      );


    if (standardStatus) {

      standardStatus.textContent =

        !bookingKnown(tomorrow)

          ? "Check Frontier"

          : bookingBlackout(tomorrow)

            ? "Tomorrow is a blackout"

            : "Open now";

    }


    if (standardDate) {

      standardDate.textContent =
        bookingBlackout(tomorrow)

          ? `${bookingShortLabel(tomorrow)} · Peak Day Charge may apply`

          : `Departing ${bookingShortLabel(tomorrow)}`;

    }


    const internationalStatus =
      document.getElementById(
        "bookingInternationalStatus"
      );


    const internationalDate =
      document.getElementById(
        "bookingInternationalDate"
      );


    if (internationalStatus) {
      internationalStatus.textContent =
        "Open now";
    }


    if (internationalDate) {
      internationalDate.textContent =
        `Through ${bookingShortLabel(internationalEnd)}`;
    }


    let offset =
      2;


    let departure =
      bookingDate(
        today,
        offset
      );


    while (
      bookingKnown(departure) &&
      bookingBlackout(departure) &&
      offset < 370
    ) {

      offset++;

      departure =
        bookingDate(
          today,
          offset
        );

    }


    const opensOn =
      bookingDate(
        today,
        offset - 1
      );


    bookingTarget =
      bookingMidnight(
        opensOn,
        timezone
      );


    const nextDate =
      document.getElementById(
        "bookingNextDate"
      );


    if (nextDate) {

      nextDate.textContent =
        bookingKnown(departure)

          ? `For ${bookingShortLabel(departure)}`

          : `Expected ${bookingShortLabel(departure)}`;

    }

  }


  const remaining =
    Math.max(
      0,
      Math.ceil(
        (
          bookingTarget -
          now
        ) /
        1000
      )
    );


  const hours =
    Math.floor(
      remaining /
      3600
    );


  const minutes =
    Math.floor(
      remaining /
      60
    ) % 60;


  const seconds =
    remaining %
    60;


  const timer =
    document.getElementById(
      "bookingCountdown"
    );


  if (timer) {

    timer.textContent =
      `${bookingPad(hours)}:` +
      `${bookingPad(minutes)}:` +
      `${bookingPad(seconds)}`;

  }


  renderBookingCalendar();

}


/* =====================================================
   SET SELECTED BOOKING AIRPORT
   ===================================================== */

function setBookingAirport(
  airport
) {

  if (
    !airport ||
    !airport.timezone
  ) {
    return;
  }


  bookingAirport =
    airport;


  bookingDayKey =
    "";


  bookingCalendarOffset =
    0;


  bookingCalendarSignature =
    "";


  const zone =
    document.getElementById(
      "bookingZone"
    );


  const link =
    document.getElementById(
      "bookingLink"
    );


  if (zone) {

    zone.textContent =
      `Dates and countdown use ${airport.city} (${airport.code}) local time.`;

  }


  if (link) {

    link.href =
      "https://flights.flyfrontier.com/en/flights-from-" +
      bookingSlug(airport);


    link.setAttribute(
      "aria-label",
      `Explore Frontier flights from ${airport.city}`
    );

  }


  updateBookingDashboard();

}


/* =====================================================
   CALENDAR NAVIGATION
   ===================================================== */

document
  .getElementById(
    "bookingCalendarPrevious"
  )
  ?.addEventListener(
    "click",
    () => {

      bookingCalendarOffset--;

      bookingCalendarSignature =
        "";

      renderBookingCalendar();

    }
  );


document
  .getElementById(
    "bookingCalendarNext"
  )
  ?.addEventListener(
    "click",
    () => {

      bookingCalendarOffset++;

      bookingCalendarSignature =
        "";

      renderBookingCalendar();

    }
  );


setInterval(
  updateBookingDashboard,
  1000
);
/* Scheduled nonstop departures from the rolling, dated JSON cache. */
const departureCache = new Map();
const departureInternational = new Set(['BOG','CTG','MDE','CUN','GUA','SAL','SAP','SJO','MBJ','PUJ','SDQ','STI']);
let departureState = null;
let departureRequest = 0;

function departureMinutes(time) {
  const match = String(time).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match || +match[1] < 1 || +match[1] > 12 || +match[2] > 59) return null;
  return (+match[1] % 12 + (match[3].toUpperCase() === 'PM' ? 12 : 0)) * 60 + +match[2];
}

function departureInstant(date, minutes, timezone) {
  const desired = Date.UTC(date.year, date.month - 1, date.day, Math.floor(minutes / 60), minutes % 60);
  let instant = desired;
  for (let i = 0; i < 4; i++) {
    const p = bookingParts(new Date(instant), timezone);
    instant += desired - Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  }
  return instant;
}

async function departureSnapshot(key) {
  if (!departureCache.has(key)) {
    const pending = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(new URL(`data/${key}.json`, document.baseURI), {signal: controller.signal, cache: "no-cache"});
        if (!response.ok) throw new Error(`Schedule ${key}: HTTP ${response.status}`);
        const data = await response.json();
        if (data.date !== key || !data.airports || typeof data.airports !== 'object') {
          throw new Error(`Invalid schedule for ${key}`);
        }
        return data;
      } finally {
        clearTimeout(timer);
      }
    })();
    departureCache.set(key, pending);
    pending.catch(() => departureCache.delete(key));
  }
  return departureCache.get(key);
}

function departureText(tag, className, value) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = value;
  return element;
}

function departureBookingURL(airport, flight) {
  const url = new URL('https://booking.flyfrontier.com/external/flightselect');
  url.search = new URLSearchParams({
    o1: airport.code, d1: flight.destination, dd1: bookingKey(flight.date),
    r: 'false', ADT: '1', inl: '0', mon: 'true'
  }).toString();
  return url.href;
}

function updateDepartureCountdowns() {
  const rows = document.getElementById('departureRows');
  if (!rows) return;
  for (const element of rows.querySelectorAll('[data-opens-at]')) {
    const seconds = Math.max(0, Math.ceil((Number(element.dataset.opensAt) - Date.now()) / 1000));
    element.textContent = `(Standard in ${bookingPad(Math.floor(seconds / 3600))}:${bookingPad(Math.floor(seconds % 3600 / 60))}:${bookingPad(seconds % 60)})`;
  }
}

const boardStatusURL = 'https://frontier-flight-times.jacob-brown-6700.workers.dev/';
const boardStatuses = new Map();
let boardStatusPolling = false;

function boardStatusKey(airport, flight) {
  return `${airport.code}:${flight.destination}:${bookingKey(flight.date)}:${flight.flightNumber}`;
}

function boardStatusTime(time, flight, airport) {
  const minutes = departureMinutes(time);
  if (minutes === null) return null;
  let instant = departureInstant(flight.date, minutes, airport.timezone);
  if (instant < flight.instant - 12 * 3600000) instant = departureInstant(bookingDate(flight.date, 1), minutes, airport.timezone);
  if (instant > flight.instant + 12 * 3600000) instant = departureInstant(bookingDate(flight.date, -1), minutes, airport.timezone);
  return instant;
}

function boardStatusDelayed(entry, flight, airport) {
  return entry?.data?.statusCode === 'delayed' || (entry?.data?.departure?.estimated &&
    boardStatusTime(entry.data.departure.estimated, flight, airport) > flight.instant + 60000);
}

function boardStatusInfo(airport, flight, now = Date.now()) {
  const entry = boardStatuses.get(boardStatusKey(airport, flight));
  const data = entry?.data;
  const fresh = data && (now - Date.parse(data.fetchedAt) < 180000 || ['departed','arrived','cancelled'].includes(data.statusCode) || data.departure.actual);
  const near = flight.instant <= now + 2 * 3600000;
  if (!fresh) return near ? {label: entry?.error ? 'Status unavailable' : 'Checking status…', kind: 'live', visible: flight.instant > now - 4 * 3600000 || boardStatusDelayed(entry, flight, airport)} : null;
  const actual = boardStatusTime(data.departure.actual, flight, airport);
  const estimate = boardStatusTime(data.departure.estimated, flight, airport);
  const terminal = ['departed', 'arrived'].includes(data.statusCode) || actual !== null;
  if (terminal) return {label: 'Departed' + (data.departure.actual ? ` · ${data.departure.actual}` : ''), kind: 'departed',
    visible: now < (actual ?? flight.instant) + 3600000};
  if (data.statusCode === 'cancelled') return {label: 'Cancelled', kind: 'cancelled', visible: flight.instant > now - 3600000};
  if (!near) return null;
  if (data.statusCode === 'delayed' || (estimate !== null && estimate > flight.instant + 60000)) {
    return {label: data.departure.estimated ? `Delayed · ${data.departure.estimated}` : 'Delayed', kind: 'delayed', visible: true};
  }
  const departure = estimate ?? flight.instant;
  if (now >= flight.instant - 20 * 60000) return {label: 'Gate closed', kind: 'gate-closed', visible: true};
  if (now >= flight.instant - 45 * 60000) return {label: 'Boarding', kind: 'boarding', visible: true};
  if (now > departure) return {label: 'Awaiting departure update', kind: 'live', visible: true};
  return {label: data.status || 'On Time', kind: 'live', visible: true};
}

function boardFlightVisible(airport, flight, now) {
  const info = boardStatusInfo(airport, flight, now);
  return info ? info.visible : flight.instant > now;
}

async function pollBoardStatuses() {
  if (boardStatusPolling || !departureState || document.hidden) return;
  boardStatusPolling = true;
  const state = departureState;
  const now = Date.now();
  const candidates = state.flights.filter(flight => {
    if (flight.instant > now + 2 * 3600000) return false;
    const entry = boardStatuses.get(boardStatusKey(state.airport, flight));
    if (['departed','arrived','cancelled'].includes(entry?.data?.statusCode)) return false;
    const delayed = boardStatusDelayed(entry, flight, state.airport);
    return (flight.instant > now - 4 * 3600000 || delayed) && (!entry || now - entry.checkedAt >= 60000);
  }).sort((a, b) => a.instant - b.instant); // Earliest scheduled departure first.
  try {
    let cursor = 0;
    await Promise.all(Array.from({length: Math.min(3, candidates.length)}, async () => {
      while (cursor < candidates.length) {
        const flight = candidates[cursor++];
        if (departureState !== state) break;
        const key = boardStatusKey(state.airport, flight);
        const previous = boardStatuses.get(key);
        const entry = {...previous, checkedAt: Date.now(), error: false};
        boardStatuses.set(key, entry);
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 35000);
        try {
          const response = await fetch(boardStatusURL, {method: 'POST', headers: {'Content-Type':'application/json'},
            signal: controller.signal, body: JSON.stringify({action:'status', origin:state.airport.code,
              destination:flight.destination, departDate:bookingKey(flight.date), flightNumber:String(flight.flightNumber)})});
          const data = await response.json();
          if (!response.ok || data.error) throw new Error(data.error || `HTTP ${response.status}`);
          if (data.origin !== state.airport.code || data.destination !== flight.destination || data.departDate !== bookingKey(flight.date) || String(data.flightNumber) !== String(flight.flightNumber) || !data.departure || !Number.isFinite(Date.parse(data.fetchedAt))) {
            throw new Error('Flight status did not match this row.');
          }
          entry.data = data;
        } catch (error) { entry.error = true; }
        finally { clearTimeout(timer); }
        if (departureState === state) renderDepartureBoard();
      }
    }));
  } finally { boardStatusPolling = false; }
}

setInterval(pollBoardStatuses, 10000);

function renderDepartureBoard() {
  renderFrontierGateMap();
  if (!departureState) return;
  const {airport, flights, missing} = departureState;
  const now = Date.now();
  const rows = document.getElementById('departureRows');
  const more = document.getElementById('departureShowMore');
  if (!rows) return;
  const visible = flights.filter(flight => boardFlightVisible(airport, flight, now));
  const signature = JSON.stringify([missing, departureState.loading,
    visible.map(f => [f.destination, f.flightNumber, f.instant, boardStatusInfo(airport, f, now)?.label, boardStatuses.get(boardStatusKey(airport, f))?.data?.departure?.gate,
      Date.now() >= bookingMidnight(bookingDate(f.date, -1), airport.timezone)])]);
  if (departureState.renderSignature === signature) { updateDepartureCountdowns(); return; }
  departureState.renderSignature = signature;
  rows.replaceChildren();
  for (const flight of visible) {
    const row = departureText('a', 'departure-row', '');
    row.href = departureBookingURL(airport, flight);
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
    row.style.textDecoration = 'none';
    row.style.color = 'inherit';
    row.setAttribute('aria-label', `View Frontier flights from ${airport.code} to ${flight.destination} on ${bookingKey(flight.date)} in a new tab`);
    const hour = Math.floor(flight.minutes / 60);
    const time = `${hour % 12 || 12}:${bookingPad(flight.minutes % 60)}${hour < 12 ? 'AM' : 'PM'}`;
    const localToday = bookingDate(bookingParts(new Date(), airport.timezone), 0);
    const flightDate = bookingKey(flight.date);
    const day = flightDate === bookingKey(localToday) ? 'Today'
      : flightDate === bookingKey(bookingDate(localToday, 1)) ? 'Tomorrow'
      : flightDate === bookingKey(bookingDate(localToday, -1)) ? 'Yesterday'
      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][flight.date.weekday];
    const dayCell = departureText('div', 'departure-day', day);
    dayCell.title = day;
    row.append(dayCell, departureText('div', 'departure-time', time));
    const destination = departureText('div', 'departure-destination', '');
    const target = airportByCode(flight.destination);
    const airportName = (target?.name || target?.city || flight.destination)
      .replace(/International Airport/gi, 'Intl')
      .replace(/International/gi, 'Intl')
      .replace(/ Airport/gi, '');
    destination.title = `${flight.destination} - ${target?.name || airportName}`;
    destination.append(departureText('strong', '', flight.destination));
    destination.append(departureText('span', '', `- ${airportName}`));
    const departureGate = boardStatuses.get(boardStatusKey(airport, flight))?.data?.departure?.gate;
    const flightCell = departureText('div', 'departure-flight', `F9${flight.flightNumber}${departureGate ? '·' + departureGate : ''}`);
    flightCell.title = `Flight F9${flight.flightNumber}${departureGate ? ' · Departure gate ' + departureGate : ''}`;
    row.append(destination, flightCell);
    const booking = departureText('div', 'departure-booking', '');
    const live = boardStatusInfo(airport, flight, now);
    const international = departureInternational.has(airport.code) || departureInternational.has(flight.destination);
    const blackout = bookingBlackout(flight.date);
    const standard = international || now >= bookingMidnight(bookingDate(flight.date, -1), airport.timezone);
    if (live) {
      const prefix = live.booking ? (blackout ? 'Blackout' : standard ? 'Standard Window' : 'Advanced Booking') + ' · ' : '';
      booking.append(departureText('span', 'departure-booking-status ' + live.kind, prefix + live.label));
      if (live.kind === 'boarding' || live.kind === 'gate-closed') booking.title = 'Estimated timing: boarding begins 45 minutes before scheduled departure; gate closes 20 minutes before scheduled departure.';
    } else {
    booking.append(departureText('span', `departure-booking-status ${blackout ? 'blackout' : standard ? 'standard' : 'advance'}`,
      blackout ? 'Blackout · peak day charge may apply' : standard ? 'Standard Window' : 'Advanced Booking'));
    if (!standard && !blackout) {
      const countdown = departureText('span', 'departure-booking-countdown', '');
      countdown.dataset.opensAt = String(bookingMidnight(bookingDate(flight.date, -1), airport.timezone));
      booking.append(countdown);
    }
    }
    row.append(booking);
    rows.append(row);
  }
  if (!visible.length) {
    rows.append(departureText('div', 'departure-board-empty', departureState.loading ? 'Loading the remaining schedule snapshots...' : missing.length
      ? 'No departures to display from the available snapshots. Missing schedules may still be building.'
      : 'No upcoming nonstop departures are listed for this airport in these three days.'));
  }
  if (more) {
    more.hidden = true;
    more.onclick = null;
  }
  const subtitle = document.getElementById('departuresSubtitle');
  if (subtitle) subtitle.textContent = `Times are local to ${airport.city} (${airport.code}).` +
    (missing.length ? ` ${missing.join(' and ')} schedule unavailable; showing the available days.` : departureState.loading ? ' Loading the remaining days...' : ' Today, tomorrow, and upcoming.');
  updateDepartureCountdowns();
  bookingCalendarSignature = "";
  renderBookingCalendar();
}

async function loadDepartureBoard(airport) {
  const rows = document.getElementById('departureRows');
  if (!rows) return;
  const request = ++departureRequest;
  const previousBoardState = departureState;
  departureState = null;
  window.FrontierDENGateMap?.update({airport: airport.code, loading: true, flights: []});
  rows.replaceChildren(departureText('div', 'departure-board-loading', 'Loading upcoming Frontier departures...'));
  const more = document.getElementById('departureShowMore');
  if (more) more.hidden = true;
  const title = document.getElementById('departuresTitle');
  if (title) title.textContent = `Upcoming nonstop departures from ${airport.code}`;
  try {
    const today = bookingDate(bookingParts(new Date(), airport.timezone), 0);
    const days = [0, 1, 2].map(offset => ({date: bookingDate(today, offset), label: ['Today','Tomorrow','Upcoming'][offset]}));
    const flights = previousBoardState?.airport.code === airport.code
      ? previousBoardState.flights.filter(flight => bookingKey(flight.date) < bookingKey(today) && boardFlightVisible(airport, flight, Date.now()))
      : [];
    const missing = [];
    const missingKeys = new Set();
    const loadedKeys = new Set();
    const state = {airport, flights, snapshots: new Map(), missing, missingKeys, loadedKeys, loading: true, limit: 8, dayKey: bookingKey(today)};
    departureState = state;
    await Promise.allSettled(days.map(async day => {
      try {
        const data = await departureSnapshot(bookingKey(day.date));
        loadedKeys.add(bookingKey(day.date));
        if (request !== departureRequest) return;
        state.snapshots.set(bookingKey(day.date), data);
        const source = data.airports[airport.code] || [];
        const seen = new Set();
        for (const item of source) {
          const minutes = departureMinutes(item.departureTime);
          if (minutes === null || !/^[A-Z]{3}$/.test(item.destination) || !/^\d+$/.test(String(item.flightNumber))) continue;
          const key = `${item.destination}:${item.flightNumber}:${minutes}`;
          if (seen.has(key)) continue;
          seen.add(key);
          flights.push({...item, ...day, minutes, instant: departureInstant(day.date, minutes, airport.timezone)});
        }
      } catch (error) {
        if (request !== departureRequest) return;
        missing.push(day.label);
        missingKeys.add(bookingKey(day.date));
        console.info(`Departure snapshot unavailable: ${bookingKey(day.date)}`, error);
      }
      if (request !== departureRequest) return;
      flights.sort((a, b) => a.instant - b.instant || a.destination.localeCompare(b.destination));
      renderDepartureBoard();
    }));
    if (request !== departureRequest) return;
    state.loading = false;
    renderDepartureBoard();
    pollBoardStatuses();
  } catch (error) {
    if (request !== departureRequest) return;
    rows.replaceChildren(departureText('div', 'departure-board-empty', 'The schedule could not load. Please refresh to try again.'));
    window.FrontierDENGateMap?.update({airport: airport.code, flights: [], missing: true});
    console.warn('Departure board unavailable:', error);
  }
}

setInterval(() => {
  if (!departureState) return;
  const airport = departureState.airport;
  const today = bookingKey(bookingDate(bookingParts(new Date(), airport.timezone), 0));
  if (today !== departureState.dayKey) loadDepartureBoard(airport);
  else renderDepartureBoard();
}, 1000);


async function initializeDashboard() {

  loadAirports();


  /* Show Denver immediately so the
     dashboard never appears empty. */

  const defaultAirport =
    airportByCode(
      "DEN"
    );


  if (defaultAirport) {

    showAirport(
      defaultAirport
    );

  }


  /* Then try to personalize it using
     approximate IP location. */

  try {

    const location =
      await approximateLocation();


    const airport =
      nearestAirport(

        location.lat,
        location.lon

      );


    if (airport) {

      showAirport(
        airport
      );

    }

  }

  catch (error) {

    console.info(
      "Automatic airport detection unavailable. Using Denver.",
      error
    );

  }

}


/* Dashboard boot follows the security module initialization below. */

/* DEN/ATL/LAS/MCO/PHX map is a read-only consumer of the existing schedule and status caches. */
function renderFrontierGateMap() {
  const widget = window.FrontierDENGateMap;
  if (!widget || !departureState) return;
  const {airport, flights, snapshots, loading, missing} = departureState;
  if (!['DEN','ATL','LAS','MCO','PHX','DFW','TPA','SJU','ORD','STL','LAX','SFO','IAH'].includes(airport.code)) { widget.update({airport: airport.code, flights: []}); return; }
  const now = Date.now();
  const today = bookingKey(bookingDate(bookingParts(new Date(now), airport.timezone), 0));
  const models = [];
  const add = (flight, origin, kind) => {
    const originAirport = airportByCode(origin);
    if (!originAirport) return;
    const entry = boardStatuses.get(boardStatusKey(originAirport, flight));
    const data = entry?.data;
    const endpoint = kind === 'departure' ? data?.departure : data?.arrival;
    const fresh = !!data && !entry.error && now - Date.parse(data.fetchedAt) < 180000;
    const finished = kind === 'departure' ? !!data?.departure?.actual || ['departed','arrived'].includes(data?.statusCode)
      : !!data?.arrival?.actual || data?.statusCode === 'arrived';
    const cancelled = data?.statusCode === 'cancelled';
    const inAir = kind === 'arrival' && !finished && !cancelled && (
      !!data?.departure?.actual ||
      /^(departed|in[ _-]?air|airborne)$/i.test(String(data?.statusCode || '')) ||
      /^(departed|in air|airborne)$/i.test(String(data?.status || ''))
    );
    const delayed = data?.statusCode === 'delayed' || boardStatusDelayed(entry, flight, originAirport);
    let instant = flight.instant;
    if (kind === 'arrival') {
      const minutes = departureMinutes(endpoint?.scheduled || flight.arrivalTime);
      instant = minutes === null ? null : departureInstant(flight.date, minutes, airport.timezone);
      // Arrival clocks belong to the selected airport; anchor the date to the origin departure.
      if (instant !== null && instant < flight.instant) instant = departureInstant(bookingDate(flight.date, 1), minutes, airport.timezone);
    }
    if (!finished && !delayed && instant !== null && (instant < now - 4*3600000 || instant > now + 6*3600000)) return;
    if (kind === 'arrival' && instant === null && bookingKey(flight.date) !== today) return;
    if (finished) {
      const actualMinutes = departureMinutes(endpoint?.actual);
      const actual = actualMinutes === null || instant === null ? entry?.checkedAt : (() => {
        let result = departureInstant(flight.date, actualMinutes, airport.timezone);
        if (result < instant - 12*3600000) result = departureInstant(bookingDate(flight.date, 1), actualMinutes, airport.timezone);
        return result;
      })();
      if (!Number.isFinite(actual) || now - actual > 60*60000) return;
    }
    const explicitOnTime = /^(on[ _-]?time|scheduled)$/i.test(String(data?.statusCode || '')) || /^on time$/i.test(String(data?.status || ''));
    const eligible = kind === 'departure' && fresh && explicitOnTime && !delayed && !cancelled && !finished;
    const gateClosed = eligible && now >= instant - 20*60000;
    const boarding = eligible && now >= instant - 45*60000 && now < instant - 20*60000;
    const status = finished ? (kind === 'arrival' ? 'Arrived' : 'Departed')
      : cancelled ? 'Cancelled'
      : inAir ? 'In Air'
      : delayed ? 'Delayed'
      : gateClosed ? 'Gate closed'
      : boarding ? 'Estimated boarding'
      : fresh ? (data.status || 'Scheduled')
      : data ? 'Status stale / unavailable'
      : 'Scheduled · status unavailable';
    models.push({id: `${origin}:${flight.destination}:${bookingKey(flight.date)}:${flight.flightNumber}:${kind}`,
      flight: `F9 ${flight.flightNumber}`, kind, route: kind === 'arrival' ? origin : flight.destination,
      gate: endpoint?.gate || (kind === 'departure' ? flight.gate : flight.arrivalGate), instant,
      originTime: flight.departureTime, origin, status, fresh, delayed: !!delayed || cancelled, finished,
      progress: gateClosed ? 1 : boarding ? Math.max(0, Math.min(1, (now - (instant - 45*60000))/(25*60000))) : 0});
  };
  flights.forEach(f => add(f, airport.code, 'departure'));
  const seen = new Set();
  for (const [key, snapshot] of snapshots || []) {
    const [year, month, day] = key.split('-').map(Number);
    const date = {year, month, day};
    for (const [origin, inbound] of Object.entries(snapshot.airports)) {
      if (origin === airport.code) continue;
      const originAirport = airportByCode(origin);
      if (!originAirport) continue;
      for (const item of inbound) {
        if (item.destination !== airport.code) continue;
        const minutes = departureMinutes(item.departureTime);
        if (minutes === null) continue;
        const id = `${origin}:${key}:${item.flightNumber}:${minutes}`;
        if (seen.has(id)) continue;
        seen.add(id);
        add({...item, date, instant: departureInstant(date, minutes, originAirport.timezone)}, origin, 'arrival');
      }
    }
  }
  widget.update({airport: airport.code, flights: models, loading, missing: missing.length > 0});
}

/* Airport security: one selected airport, demand-driven; no airport sweep. */
const securityEndpoint = 'https://frontier-flight-times.jacob-brown-6700.workers.dev/security';
const securityResults = new Map();
let securityAirport = null;
let securityController = null;
let securitySequence = 0;
let securityVisible = !('IntersectionObserver' in window);
let securityLane = 'standard';
const securityLabels = {standard:'Standard',precheck:'TSA PreCheck',clear:'CLEAR',clear_precheck:'CLEAR + PreCheck',combined:'Checkpoint estimates',priority:'Priority'};

function securityText(tag,className,value) {
  const el=document.createElement(tag);el.className=className;el.textContent=value;return el;
}
function securityActive() {
  const dashboard=document.getElementById('dashboardMain');
  return !document.hidden && securityVisible && dashboard && dashboard.getClientRects().length>0;
}
function securityAge(iso) {
  const ms=Date.parse(iso);if(!Number.isFinite(ms))return '';
  const minutes=Math.max(0,Math.floor((Date.now()-ms)/60000));
  return minutes<1?'just now':`${minutes} min ago`;
}
function securityHide() {
  const card=document.getElementById('airportSecurity');if(card){card.hidden=true;card.replaceChildren();}
}
function securityWaitDisplay(l) {
  const raw=String(l?.wait?.display ?? '').trim();
  if(!raw)return '';
  // Some airport feeds (including DEN) publish capped waits such as "35+".
  // Treat these as valid values rather than falling through to "not published".
  const capped=raw.match(/^(\d+)\s*\+\s*(?:min(?:ute)?s?)?$/i);
  if(capped)return `${capped[1]}+ min`;
  const numeric=raw.match(/^(\d+)\s*(?:min(?:ute)?s?)?$/i);
  if(numeric)return `${numeric[1]} min`;
  return raw;
}
function securityWaitCurrent(l) {
  const display=securityWaitDisplay(l);
  const capped=/^\d+\+ min$/i.test(display);
  return !l.stale && l.status!=='closed' && display &&
    (capped || !['closed','unknown','stale'].includes(l.wait?.kind)) &&
    (!l.validUntil||Date.now()<Date.parse(l.validUntil)) &&
    (l.timestampKind!=='source'||Date.now()-Date.parse(l.updatedAt)<900000);
}
function securitySchedule(schedule,timezone) {
  if(!schedule?.intervals?.length||!timezone)return null;
  try { new Intl.DateTimeFormat('en-US',{timeZone:timezone}); } catch { return null; }
  const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:timezone,hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
  const minute=+p.hour*60 + +p.minute,day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday);
  let closing=Infinity;
  for(const i of schedule.intervals){
    const start=+i.open.slice(0,2)*60 + +i.open.slice(3),end=+i.close.slice(0,2)*60 + +i.close.slice(3);
    const today=!i.days||i.days.includes(day),yesterday=!i.days||i.days.includes((day+6)%7);
    if(start===end&&today&&schedule.open24h)return {status:'open',closingInMinutes:null};
    if(start<end&&today&&minute>=start&&minute<end)closing=Math.min(closing,end-minute);
    if(start>end&&((today&&minute>=start)||(yesterday&&minute<end)))closing=Math.min(closing,minute>=start?1440-minute+end:end-minute);
  }
  return Number.isFinite(closing)?{status:'open',closingInMinutes:closing}:{status:'closed',closingInMinutes:null};
}
/* Curated airport guidance, reviewed 2026-10-07.
 * Airport source links are data, not live operational status.
 * Airline lists are known examples with access, not exhaustive checkpoint assignments.
 * Geographic priorities are HowToGoWild editorial choices.
 */
const securityAirportGuidance = {
  "ATL": {
    "sourceUrls": [
      "https://dev.atl.com/atldev/atlsync/passenger-information/passenger-security/",
      "https://www.atl.com/wp-content/uploads/2018/12/Domestic-Terminal.pdf"
    ],
    "note": "All checkpoints reach all gates. Choose a lane you are eligible to use and allow time to reach your gate.",
    "single": false,
    "checkpoints": [
      {
        "name": "Domestic North Checkpoint",
        "match": "north",
        "gateLabel": "Domestic North \u00b7 all concourses",
        "airlines": [
          "F9",
          "AA",
          "AS",
          "B6",
          "WN",
          "UA"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Domestic Main Checkpoint",
        "match": "main",
        "gateLabel": "Domestic Terminal \u00b7 all concourses",
        "airlines": [
          "F9",
          "AA",
          "AS",
          "B6",
          "DL",
          "WN",
          "UA"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Domestic South Checkpoint",
        "match": "south",
        "gateLabel": "Domestic South \u00b7 all concourses",
        "airlines": [
          "F9",
          "DL"
        ],
        "priority": "alternate",
        "note": "Use the published lane information; this entrance may be restricted to expedited screening.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "International Checkpoint",
        "match": "international",
        "gateLabel": "International Terminal \u00b7 all concourses",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Check bags at Frontier\u2019s Domestic North counter first.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "BNA": {
    "sourceUrls": [
      "https://flynashville.com/flights/airline-information",
      "https://flynashville.com/inside-bna/bna-passport"
    ],
    "note": "Frontier is listed at the T-Gates. Follow your boarding pass; gate assignments can change.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal, Level 3 \u00b7 T-Gates and concourses",
        "airlines": [
          "F9",
          "FI",
          "DL",
          "AA",
          "WN"
        ],
        "priority": "recommended",
        "note": "Satellite gates C4\u2013C11 require the post-security shuttle.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "BWI": {
    "sourceUrls": [
      "https://bwiairport.com/flying-with-us/security-tsa-guidelines/",
      "https://bwiairport.com/wp-content/uploads/wayfinding/maps/112Upper%20Level%20Terminal%20Map.pdf"
    ],
    "note": "Use D/E for Frontier. A/B/C serve a separate gate area.",
    "single": false,
    "checkpoints": [
      {
        "name": "Checkpoint D/E",
        "match": "(?:checkpoint\\s*)?d\\s*[/ &-]?\\s*e",
        "gateLabel": "Concourses D & E",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Follow your assigned D/E gate.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint A",
        "match": "checkpoint A",
        "gateLabel": "Concourses A/B/C",
        "airlines": [
          "WN"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint B",
        "match": "checkpoint B",
        "gateLabel": "Concourses A/B/C",
        "airlines": [
          "WN"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint C",
        "match": "checkpoint C",
        "gateLabel": "Concourses A/B/C",
        "airlines": [
          "AA",
          "WN"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "CHS": {
    "sourceUrls": [
      "https://iflychs.com/passengers/security-checkpoint/",
      "https://iflychs.com/"
    ],
    "note": "The main checkpoint serves the terminal\u2019s concourses.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal \u00b7 concourses A & B",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "CLE": {
    "sourceUrls": [
      "https://www.clevelandairport.com/news-press/security-checkpoints-renamed-cle",
      "https://www.clevelandairport.com/sites/default/files/cle_digital_map_vertical_1_8_2024%20%281%29.pdf"
    ],
    "note": "All checkpoints reach all gates. Choose a lane you are eligible to use and allow time to reach your gate.",
    "single": false,
    "checkpoints": [
      {
        "name": "North Security",
        "match": "north|checkpoint a\\b",
        "gateLabel": "All departing gates \u00b7 Frontier: Concourse A",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Central Security",
        "match": "central|checkpoint b\\b",
        "gateLabel": "All departing gates",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Check the published lane type before choosing this checkpoint.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "South Security",
        "match": "south|checkpoint c\\b",
        "gateLabel": "All departing gates",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "CLT": {
    "sourceUrls": [
      "https://www.cltairport.com/airport-info/security/",
      "https://www.cltairport.com/airport-info/website-maps/"
    ],
    "note": "All checkpoints reach all gates. Choose a lane you are eligible to use and allow time to reach your gate.",
    "single": false,
    "checkpoints": [
      {
        "name": "Checkpoint 1",
        "match": "checkpoint 1\\b",
        "gateLabel": "Main Terminal \u00b7 all concourses",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Concourse A/B side; follow signs to your Frontier gate.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 2",
        "match": "checkpoint 2\\b",
        "gateLabel": "Main Terminal \u00b7 all concourses",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Use the published lane information for PreCheck eligibility.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 3",
        "match": "checkpoint 3\\b",
        "gateLabel": "Main Terminal \u00b7 all concourses",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "CMH": {
    "sourceUrls": [
      "https://flycolumbus.com/passengers/prepare-for-your-flight/",
      "https://flycolumbus.com/passengers/security/"
    ],
    "note": "Use Concourse C security for Frontier. Airport-wide estimates below are not a Concourse C wait.",
    "single": false,
    "checkpoints": [
      {
        "name": "Concourse C Security",
        "match": "concourse c",
        "gateLabel": "Concourse C",
        "airlines": [
          "F9",
          "AC",
          "AS",
          "MX",
          "DL",
          "SY"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Concourse A Security",
        "match": "concourse a",
        "gateLabel": "Concourse A",
        "airlines": [
          "WN"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Concourse B Security",
        "match": "concourse b",
        "gateLabel": "Concourse B",
        "airlines": [
          "AA",
          "NK",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "CVG": {
    "sourceUrls": [
      "https://www.cvgairport.com/accessibility/step-by-step-directions/"
    ],
    "note": "The main checkpoint leads to the transportation tunnel serving Concourses A and B.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal \u00b7 concourses A & B",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "DCA": {
    "sourceUrls": [
      "https://www.flyreagan.com/travel-information/security-information"
    ],
    "note": "Frontier uses Terminal 1. Terminal 2 checkpoints serve a different gate area.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal 1 Security",
        "match": "terminal 1|terminal a\\b",
        "gateLabel": "Terminal 1 \u00b7 gates A1\u2013A9",
        "airlines": [
          "F9",
          "AC",
          "WN"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal 2 North",
        "match": "terminal 2 north",
        "gateLabel": "Terminal 2 \u00b7 gates B10\u2013E59",
        "airlines": [
          "AA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal 2 South",
        "match": "terminal 2 south",
        "gateLabel": "Terminal 2 \u00b7 gates B10\u2013E59",
        "airlines": [
          "AA",
          "AS",
          "DL",
          "B6",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "DEN": {
    "sourceUrls": [
      "https://www.flydenver.com/security/",
      "https://www.flydenver.com/airlines/",
      "https://www.flydenver.com/press-release/holiday-travel-rush-arrives-at-denver-international-airport/"
    ],
    "note": "Frontier checks in on Level 6 East and departs from Concourse A. East and West security both reach all concourses.",
    "single": false,
    "checkpoints": [
      {
        "name": "East Security",
        "match": "east security",
        "gateLabel": "Level 6 East \u00b7 A, B & C gates",
        "airlines": [
          "F9",
          "WN",
          "UA"
        ],
        "priority": "recommended",
        "note": "Convenient after Frontier\u2019s East-side check-in. Allow time to reach your A gate.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "West Security",
        "match": "west security",
        "gateLabel": "Level 6 West \u00b7 A, B & C gates",
        "airlines": [
          "F9",
          "WN",
          "UA"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "DFW": {
    "sourceUrls": [
      "https://www.dfwairport.com/explore/plan/airlines/",
      "https://www.dfwairport.com/security/",
      "https://www.dfwairport.com/explore/plan/connect/"
    ],
    "note": "Frontier is listed at E20; use your boarding pass for the actual gate. Other terminals require extra travel after security.",
    "single": false,
    "checkpoints": [
      {
        "name": "E18",
        "match": "\\be18\\b",
        "gateLabel": "Terminal E \u00b7 near Frontier\u2019s published E20 gate",
        "airlines": [
          "F9",
          "AC",
          "AS",
          "B6",
          "DL",
          "UA"
        ],
        "priority": "recommended",
        "note": "Nearby entrance; use E16 for PreCheck if that is the published eligible lane.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal E alternatives",
        "match": "\\be(?:8|16|20|33)\\b",
        "gateLabel": "Terminal E \u00b7 E gates",
        "airlines": [
          "F9",
          "AC",
          "AS",
          "B6",
          "DL",
          "UA"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Other terminals",
        "match": "\\b[a-d]\\d+\\b",
        "gateLabel": "Terminals A\u2013D \u00b7 Skylink to Terminal E",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Drop bags at Frontier\u2019s counter first; allow time for the post-security Skylink.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "DTW": {
    "sourceUrls": [
      "https://metroairport.com/at-dtw/maps"
    ],
    "note": "Frontier uses the Evans Terminal, formerly North Terminal. McNamara is a separate terminal.",
    "single": false,
    "checkpoints": [
      {
        "name": "Evans Terminal Security",
        "match": "evans|north terminal",
        "gateLabel": "Evans Terminal \u00b7 D gates",
        "airlines": [
          "F9",
          "AC",
          "AS",
          "AA",
          "XP",
          "B6",
          "LH",
          "RJ",
          "WN",
          "SY",
          "TK",
          "Y4",
          "UA"
        ],
        "priority": "recommended",
        "note": "The Worker publishes a terminal estimate; follow local signs for the North/South entrance.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "McNamara Terminal Security",
        "match": "mcnamara",
        "gateLabel": "McNamara Terminal \u00b7 A, B & C gates",
        "airlines": [
          "AM",
          "AF",
          "DL",
          "WS"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "EWR": {
    "sourceUrls": [
      "https://www.newarkairport.com/explore-ewr/terminals/terminal-b/airlines-in-terminal-b"
    ],
    "note": "Frontier uses Terminal B. Its gate piers have separate checkpoints: use the entrance for the gate on your boarding pass.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal B Security",
        "match": "terminal b\\b",
        "gateLabel": "Terminal B \u00b7 match your assigned B gate",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "B40\u201349, B51\u201357 and B60\u201368 are gate-specific entrances, not interchangeable shortcuts.",
        "conditional": true,
        "badge": "Recommended for your assigned B gate"
      },
      {
        "name": "Terminal A Security",
        "match": "terminal a\\b",
        "gateLabel": "Terminal A",
        "airlines": [
          "AC",
          "AA",
          "DL",
          "B6",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal C Security",
        "match": "terminal c\\b",
        "gateLabel": "Terminal C",
        "airlines": [
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "HOU": {
    "sourceUrls": [
      "https://www.fly2houston.com/hou/security/",
      "https://www.fly2houston.com/airport-business/newsroom/press-releases/item/houston-city-council-approves-expansion-plans-for-more-gates-modernized-baggage-experience-at-hobby-airport/"
    ],
    "note": "Use Hobby\u2019s main departures checkpoint after Frontier check-in.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main|hou|central",
        "gateLabel": "Main Terminal \u00b7 departing gates",
        "airlines": [
          "F9",
          "G4",
          "AA",
          "DL",
          "WN"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "IAD": {
    "sourceUrls": [
      "https://www.flydulles.com/travel-information/security-information",
      "https://www.flydulles.com/flight-information/airlines-serving-dulles-international"
    ],
    "note": "Frontier check-in is Zone 3. Follow the main terminal\u2019s signs to your eligible security lane and assigned concourse.",
    "single": false,
    "checkpoints": [
      {
        "name": "East Security",
        "match": "east",
        "gateLabel": "Main Terminal \u00b7 concourses",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "CLEAR is published at the East checkpoint; use live lane information.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "West Security",
        "match": "west",
        "gateLabel": "Main Terminal \u00b7 concourses",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "TSA PreCheck Security",
        "match": "precheck|pre.?\u2713|tsa pre",
        "gateLabel": "Main Terminal \u00b7 between East & West",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Requires PreCheck eligibility except when TSA directs after-hours screening here.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "IAH": {
    "sourceUrls": [
      "https://www.fly2houston.com/iah/security/",
      "https://cdn.fly2houston.com/cdn/ff/m-HPR4m373CEWAL-PYP1_1QB48N1exMlJet4TxRcxts/1638993166/public/2021-12/IAH%20A%20L2%20Terminal%20Map.pdf"
    ],
    "note": "Frontier uses Terminal A. Select the A checkpoint for your gate; follow airport directions for Skyway connections.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal A Security",
        "match": "terminal a\\b",
        "gateLabel": "Terminal A \u00b7 match your assigned A gate",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "North and South are different entrances. Check your gate and local signs before choosing.",
        "conditional": true,
        "badge": "Recommended for your assigned A gate"
      },
      {
        "name": "Other terminal checkpoints",
        "match": "terminal [bcde]\\b",
        "gateLabel": "Terminals B\u2013E",
        "airlines": [],
        "priority": "other",
        "note": "Confirm access and transfer time to your Frontier gate before using.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "JAX": {
    "sourceUrls": [
      "https://www.flyjacksonville.com/Content.aspx?id=432"
    ],
    "note": "The courtyard checkpoint serves the terminal\u2019s concourses.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal \u00b7 courtyard checkpoint",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "JFK": {
    "sourceUrls": [
      "https://www.jfkairport.com/explore-jfk/terminals"
    ],
    "note": "The airport lists Frontier in Terminal 7. Confirm your terminal on the boarding pass during JFK redevelopment.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal 7 Security",
        "match": "terminal 7\\b",
        "gateLabel": "Terminal 7 \u00b7 departing gates",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Other terminals are not routine alternatives for a Terminal 7 departure.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Other terminal checkpoints",
        "match": "terminal (?:1|4|5|8)\\b",
        "gateLabel": "Other JFK terminals",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "LAX": {
    "sourceUrls": [
      "https://www.flylax.com/node/271"
    ],
    "note": "Frontier check-in is at Terminal 1; the airport directs Frontier passengers to an airside bus to Terminal B.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal 1 Security",
        "match": "terminal 1\\b|^t1\\b",
        "gateLabel": "Terminal 1 check-in \u00b7 bus to Terminal B",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Allow time for the bus and walk to your assigned gate.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal B Security",
        "match": "terminal b\\b|tbit|tom bradley",
        "gateLabel": "Terminal B \u00b7 assigned departing gate",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Complete Frontier check-in/bag drop at Terminal 1 first. Confirm direct entry with airport staff.",
        "conditional": true,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "MCO": {
    "sourceUrls": [
      "https://flymco.com/airlines/",
      "https://flymco.com/faq/"
    ],
    "note": "Frontier is listed at gates 1\u201329 and 70\u201399. Use the checkpoint matching your boarding-pass gate; the two sides are not interchangeable.",
    "single": false,
    "checkpoints": [
      {
        "name": "Gates 1\u201359",
        "match": "gates 1\\s*[-\u2013]\\s*59",
        "gateLabel": "Terminals A/B, west \u00b7 gates 1\u201359",
        "airlines": [
          "F9",
          "MX"
        ],
        "priority": "recommended",
        "note": "Use for Frontier gates 1\u201329.",
        "conditional": true,
        "badge": "Recommended for Frontier gates 1\u201329"
      },
      {
        "name": "Gates 70\u2013129",
        "match": "gates 70\\s*[-\u2013]\\s*129",
        "gateLabel": "Terminals A/B, east \u00b7 gates 70\u2013129",
        "airlines": [
          "F9",
          "DL",
          "F8",
          "LA"
        ],
        "priority": "alternate",
        "note": "Use only when your Frontier gate is 70\u201399.",
        "conditional": true,
        "badge": "For Frontier gates 70\u201399"
      },
      {
        "name": "Terminal C Security",
        "match": "c230|terminal c",
        "gateLabel": "Terminal C \u00b7 C gates",
        "airlines": [
          "B6",
          "BA",
          "BW",
          "CM",
          "EK"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "MIA": {
    "sourceUrls": [
      "https://www.miami-airport.com/airline-information.asp",
      "https://www.miami-airport.com/airport-security.asp",
      "https://www.miami-airport.com/images/maps/Directory-terminal-map-with-checkpoints.jpg",
      "https://www.miami-airport.com/CIP_terminal_projects.asp"
    ],
    "note": "Frontier is listed in Concourse F. Use the Concourse F entrance; other concourse checkpoints are not routine Frontier alternatives.",
    "single": false,
    "checkpoints": [
      {
        "name": "Checkpoint 6",
        "match": "^(?:checkpoint\\s*)?6$",
        "gateLabel": "Central Terminal \u00b7 Concourse F, gates F1\u2013F23",
        "airlines": [
          "F9",
          "SY"
        ],
        "priority": "recommended",
        "note": "Follow current signs for F gates after Frontier check-in; the airport has a checkpoint relocation project.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 1",
        "match": "^(?:checkpoint\\s*)?1$",
        "gateLabel": "North Terminal \u00b7 D",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 2",
        "match": "^(?:checkpoint\\s*)?2$",
        "gateLabel": "North Terminal \u00b7 D",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 3",
        "match": "^(?:checkpoint\\s*)?3$",
        "gateLabel": "North Terminal \u00b7 D",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 4",
        "match": "^(?:checkpoint\\s*)?4$",
        "gateLabel": "North Terminal \u00b7 D",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 5",
        "match": "^(?:checkpoint\\s*)?5$",
        "gateLabel": "Central Terminal \u00b7 E",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 7",
        "match": "^(?:checkpoint\\s*)?7$",
        "gateLabel": "Central Terminal \u00b7 G",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 8",
        "match": "^(?:checkpoint\\s*)?8$",
        "gateLabel": "South Terminal",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 9",
        "match": "^(?:checkpoint\\s*)?9$",
        "gateLabel": "South Terminal",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Checkpoint 10",
        "match": "^(?:checkpoint\\s*)?10$",
        "gateLabel": "South Terminal",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "MSP": {
    "sourceUrls": [
      "https://www.mspairport.com/airport/terminal-information",
      "https://www.mspairport.com/airport/security-screening"
    ],
    "note": "Frontier uses Terminal 2. Terminal 1 checkpoints do not serve the same gate area.",
    "single": false,
    "checkpoints": [
      {
        "name": "T2 Checkpoint 1",
        "match": "t2 checkpoint 1|terminal 2.*checkpoint 1",
        "gateLabel": "Terminal 2, Level 2 \u00b7 H gates",
        "airlines": [
          "F9",
          "FI",
          "WN",
          "SY"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "T2 Checkpoint 2",
        "match": "t2 checkpoint 2|terminal 2.*checkpoint 2",
        "gateLabel": "Terminal 2, Level 2 \u00b7 H gates",
        "airlines": [
          "F9",
          "FI",
          "WN",
          "SY"
        ],
        "priority": "alternate",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal 1 checkpoints",
        "match": "t1|terminal 1",
        "gateLabel": "Terminal 1",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "OMA": {
    "sourceUrls": [
      "https://www.flyoma.com/find-your-way-at-oma/",
      "https://www.flyoma.com/flight-information/airline-information/"
    ],
    "note": "During terminal construction, Frontier uses the South Terminal / Concourse A.",
    "single": false,
    "checkpoints": [
      {
        "name": "Concourse A Security",
        "match": "concourse a|south",
        "gateLabel": "South Terminal, Level 2 \u00b7 gates A1\u2013A10",
        "airlines": [
          "F9",
          "AS",
          "G4",
          "AA",
          "DL"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Concourse B Security",
        "match": "concourse b|north",
        "gateLabel": "North Terminal \u00b7 gates B11\u2013B20",
        "airlines": [
          "WN",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "PDX": {
    "sourceUrls": [
      "https://www.flypdx.com/TravelTips",
      "https://flypdx.com/construction"
    ],
    "note": "Use the checkpoint matching your boarding-pass concourse. The concourse connector is open, but using the entrance for your gate saves walking.",
    "single": false,
    "checkpoints": [
      {
        "name": "North Security",
        "match": "north|d/e|d e",
        "gateLabel": "D/E checkpoint \u00b7 concourses D & E",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": true,
        "badge": "Recommended for a D or E gate"
      },
      {
        "name": "South Security",
        "match": "south|b/c|b c",
        "gateLabel": "B/C checkpoint \u00b7 concourses B & C",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Use for a B/C gate, or allow extra walking via the post-security connector.",
        "conditional": true,
        "badge": "For a B or C gate"
      }
    ],
    "reviewed": "2026-10-07"
  },
  "PHL": {
    "sourceUrls": [
      "https://www.phl.org/about/airlines",
      "https://www.phl.org/flights/security-information/checkpoint-hours"
    ],
    "note": "Frontier uses Terminal E. D/E is the nearby security entrance; verify your gate and allow transfer time if using another terminal.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal D/E Security",
        "match": "terminal d\\s*[/ &-]\\s*e",
        "gateLabel": "Terminals D/E \u00b7 Frontier: E gates",
        "airlines": [
          "F9",
          "WN",
          "DL",
          "UA",
          "B6",
          "SY"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Other terminal checkpoints",
        "match": "terminal (?:a|b|c|f)\\b",
        "gateLabel": "Other PHL terminals",
        "airlines": [],
        "priority": "other",
        "note": "Confirm the post-security route and walking/shuttle time to E before using.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "PHX": {
    "sourceUrls": [
      "https://www.skyharbor.com/flights/passenger-airlines",
      "https://www.skyharbor.com/about-phx/news-media/phx-check-in/2024/may-2024/new-service-with-frontier-airlines/"
    ],
    "note": "Frontier normally uses Terminal 3. Airport guidance also lists a Terminal 4 international exception: follow your boarding-pass terminal.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal 3 Security",
        "match": "\\bt3\\b|terminal 3",
        "gateLabel": "Terminal 3 \u00b7 E & F gates",
        "airlines": [
          "F9",
          "AC",
          "AS",
          "G4",
          "DL",
          "B6",
          "PD",
          "UA"
        ],
        "priority": "recommended",
        "note": "Use for a Terminal 3 departure.",
        "conditional": true,
        "badge": "Recommended for Frontier in Terminal 3"
      },
      {
        "name": "Terminal 4 checkpoints",
        "match": "\\bt4\\b|terminal 4",
        "gateLabel": "Terminal 4 \u00b7 A, B, C & D gates",
        "airlines": [
          "F9",
          "AA",
          "WN"
        ],
        "priority": "alternate",
        "note": "Use only for a Frontier departure assigned to Terminal 4; T4 does not connect airside to T3.",
        "conditional": true,
        "badge": "For a Terminal 4 departure"
      }
    ],
    "reviewed": "2026-10-07"
  },
  "PIT": {
    "sourceUrls": [
      "https://flypittsburgh.com/pittsburgh-international-airport/terminal-info/transformed-pit/"
    ],
    "note": "Use the new terminal\u2019s main departures security checkpoint. Follow the Skybridge to your assigned concourse.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "New Terminal \u00b7 departing concourses",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "SAT": {
    "sourceUrls": [
      "https://flysanantonio.com/home/flights/airlines/",
      "https://flysanantonio.com/business/about-saas/terminal-development/terminal-a-b-reconfiguration-renovation-tabrr/"
    ],
    "note": "Frontier uses Terminal A. The proposed post-security A/B connector is a construction project, so do not treat B as a routine alternative.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal A Security",
        "match": "terminal a",
        "gateLabel": "Terminal A \u00b7 A gates",
        "airlines": [
          "F9",
          "AM",
          "AC",
          "AS",
          "MX",
          "DL",
          "WN",
          "SY",
          "VB",
          "Y4"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal B Security",
        "match": "terminal b",
        "gateLabel": "Terminal B \u00b7 B gates",
        "airlines": [
          "AA",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "SLC": {
    "sourceUrls": [
      "https://slcairport.com/airlines-flights/security/",
      "https://slcairport.com/assets/news/Media-Advisory-Concourse-B-Grand-Opening.pdf"
    ],
    "note": "Use Main Security on Level 2. The ground-level checkpoint in International Arrivals also accepts departing passengers when operating. Follow tunnel signs to your Frontier gate in Concourse B.",
    "single": false,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Terminal Level 2 \u00b7 concourses A & B",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "International Arrivals checkpoint",
        "match": "international arrivals",
        "gateLabel": "Terminal ground level \u00b7 departing and connecting passengers",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "This is a TSA screening entrance that also accepts departures, not the customs inspection queue.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "STL": {
    "sourceUrls": [
      "https://www.flystl.com/tsa-security/",
      "https://www.flystl.com/flights-airlines/"
    ],
    "note": "Frontier departs from Terminal 1, Concourse C. The airport-wide estimate is shown separately from checkpoint guidance.",
    "single": false,
    "checkpoints": [
      {
        "name": "Concourse C Security",
        "match": "concourse c|t1.*c gates",
        "gateLabel": "Terminal 1 \u00b7 Frontier listed at C19/C23",
        "airlines": [
          "F9",
          "AS",
          "AA"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Concourse A Security",
        "match": "concourse a|t1.*a gates",
        "gateLabel": "Terminal 1 \u00b7 A gates",
        "airlines": [
          "AC",
          "DL",
          "UA"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal 2 Security",
        "match": "terminal 2|t2|concourse e",
        "gateLabel": "Terminal 2 \u00b7 E/F gates",
        "airlines": [
          "WN"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "LGA": {
    "sourceUrls": [
      "https://www.laguardiaairport.com/explore-lga/terminals"
    ],
    "note": "Frontier uses Terminal B. Terminal A has no commercial flights; Terminal C serves Delta.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal B Security",
        "match": "terminal b",
        "gateLabel": "Terminal B \u00b7 departing gates",
        "airlines": [
          "F9",
          "AC",
          "AA",
          "B6",
          "PD",
          "WN",
          "UA"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Terminal C Security",
        "match": "terminal c",
        "gateLabel": "Terminal C",
        "airlines": [
          "DL"
        ],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "BOS": {
    "sourceUrls": [
      "https://www.massport.com/logan-airport/at-the-airport/security-wait-times",
      "https://www.massport.com/sites/default/files/2023-10/2022a-os.pdf"
    ],
    "note": "Frontier is listed in Terminal E. Confirm your boarding-pass terminal and use an E-gates checkpoint.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal E Security",
        "match": "all e gates|terminal e",
        "gateLabel": "Terminal E \u00b7 E gates",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "The feed may list more than one E checkpoint; follow the published lane type.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "LAS": {
    "sourceUrls": [
      "https://www.harryreidairport.com/security-at-las",
      "https://www.harryreidairport.com/Terminals/T3"
    ],
    "note": "Frontier checks in at Terminal 3 and can depart from D or E gates. Follow the tram signs for a D departure.",
    "single": false,
    "checkpoints": [
      {
        "name": "T3 - D/E Gates",
        "match": "t3.*d/e|terminal 3.*(?:level 2|d.?e)",
        "gateLabel": "Terminal 3, Level 2 \u00b7 D & E gates",
        "airlines": [
          "F9",
          "AS",
          "MX",
          "B6",
          "SY",
          "UA"
        ],
        "priority": "recommended",
        "note": "Check your boarding-pass gate before heading to the concourse.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "T3 Innovation Checkpoint",
        "match": "innovation|level (?:zero|0)",
        "gateLabel": "Terminal 3, Level Zero \u00b7 D-gate access",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Use only if the checkpoint serves your assigned gate and eligible lane.",
        "conditional": true,
        "badge": null
      },
      {
        "name": "Terminal 1 checkpoints",
        "match": "t1|terminal 1",
        "gateLabel": "Terminal 1",
        "airlines": [],
        "priority": "other",
        "note": "Confirm the route to your D/E gate; Frontier check-in is in T3.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "SEA": {
    "sourceUrls": [
      "https://www.portseattle.org/Security",
      "https://www.portseattle.org/airlines/frontier-airlines"
    ],
    "note": "Frontier is listed in Concourse B. All six checkpoints reach all gates; choose an eligible lane.",
    "single": false,
    "checkpoints": [
      {
        "name": "Checkpoint 4",
        "match": "checkpoint 4\\b",
        "gateLabel": "Closest to central terminal \u00b7 B & C gates",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Convenient for Frontier\u2019s published B concourse.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Other SEA checkpoints",
        "match": "checkpoint [12356]\\b",
        "gateLabel": "Main Terminal \u00b7 all gates",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Different screening types operate at each entrance; use the published lane information.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "SFO": {
    "sourceUrls": [
      "https://www.flysfo.com/passengers/flight-info/airlines-sfo/frontier",
      "https://www.flysfo.com/flight-info/security",
      "https://www.flysfo.com/fil/passengers/flight-info/airlines-sfo/frontier"
    ],
    "note": "The English Frontier directory lists Harvey Milk Terminal 1; other airport directory versions list International A. Confirm check-in and gate on your boarding pass. All checkpoints reach all gates.",
    "single": false,
    "checkpoints": [
      {
        "name": "Checkpoint B",
        "match": "checkpoint b\\b",
        "gateLabel": "Harvey Milk Terminal 1 \u00b7 B gates",
        "airlines": [
          "F9"
        ],
        "priority": "recommended",
        "note": "Use for a B-gate departure; departure and mezzanine entrances have different lanes.",
        "conditional": true,
        "badge": "Recommended for a B-gate departure"
      },
      {
        "name": "Checkpoint A",
        "match": "checkpoint a\\b",
        "gateLabel": "International Terminal A \u00b7 A gates",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Use for an A-gate departure; complete check-in at the terminal directed by Frontier first.",
        "conditional": true,
        "badge": "For an A-gate departure"
      },
      {
        "name": "Other SFO checkpoints",
        "match": "checkpoint [dfg]\\b",
        "gateLabel": "Other boarding areas \u00b7 all gates accessible",
        "airlines": [
          "F9"
        ],
        "priority": "alternate",
        "note": "Allow additional walking to your assigned A/B gate.",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "ORD": {
    "sourceUrls": [
      "https://www.flychicago.com/SiteCollectionDocuments/O%27Hare/ArchivedPDFs/Map/T5.pdf"
    ],
    "note": "Frontier uses Terminal 5 / M gates. Complete bag drop there; other terminals require extra transfer planning.",
    "single": false,
    "checkpoints": [
      {
        "name": "Terminal 5 Security",
        "match": "terminal 5\\b|t5\\b",
        "gateLabel": "Terminal 5 \u00b7 M gates",
        "airlines": [
          "F9",
          "DL",
          "WN",
          "SY"
        ],
        "priority": "recommended",
        "note": "Use the eligible Terminal 5 entrance shown in the live feed.",
        "conditional": false,
        "badge": null
      },
      {
        "name": "Other terminal checkpoints",
        "match": "terminal [123]\\b",
        "gateLabel": "Terminals 1\u20133",
        "airlines": [],
        "priority": "other",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "GRR": {
    "sourceUrls": [
      "https://www.grr.org/hubfs/Maps/GFIA_TerminalMap_FINAL_Sep2023.pdf"
    ],
    "note": "The consolidated checkpoint serves both concourses.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal \u00b7 concourses A & B",
        "airlines": [
          "F9",
          "WN",
          "G4",
          "UA",
          "DL",
          "AA"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  },
  "XNA": {
    "sourceUrls": [
      "https://www.flyxna.com/security",
      "https://www.flyxna.com/contact-us"
    ],
    "note": "One security checkpoint serves all airline gates.",
    "single": true,
    "checkpoints": [
      {
        "name": "Main Security",
        "match": "main",
        "gateLabel": "Main Terminal \u00b7 all departing gates",
        "airlines": [
          "F9",
          "G4",
          "AA",
          "MX",
          "DL",
          "UA"
        ],
        "priority": "recommended",
        "note": "",
        "conditional": false,
        "badge": null
      }
    ],
    "reviewed": "2026-10-07"
  }
};

// Curated guidance never supplies live waits, lane availability, hours or closure state.
function securityModels(data) {
  const guidance=securityAirportGuidance[data.airport];
  const rules=guidance?.checkpoints||[], matched=new Set();
  const live=data.available&&Array.isArray(data.checkpoints)?data.checkpoints:[];
  const models=live.map(cp=>{
    const aggregate=/airport[ -]wide|\bfis\b/i.test(cp.name||'');
    const rule=aggregate?null:rules.find(r=>new RegExp(r.match,'i').test(cp.name||''));
    if(rule)matched.add(rule);
    return {...cp,lanes:Array.isArray(cp.lanes)?cp.lanes:[],guidance:rule,
      priority:aggregate?'estimate':rule?.priority||'other',aggregate,live:true};
  });
  for(const rule of rules)if(!matched.has(rule))models.push({id:'guide:'+rule.name,name:rule.name,lanes:[],guidance:rule,priority:rule.priority,live:false});
  return models;
}
function securityCheckpointState(cp,data) {
  if(!cp.live)return 'unknown';
  const selected=cp.lanes.filter(l=>l.type===securityLane);
  const lanes=selected.length?selected:cp.lanes.filter(l=>l.type==='combined');
  if(lanes.some(l=>l.status==='open'))return 'open';
  if(lanes.length&&lanes.every(l=>l.status==='closed'))return 'closed';
  const schedule=securitySchedule(cp.hours,data.timezone||securityAirport?.timezone);
  if(schedule?.status==='closed')return 'closed';
  // An open checkpoint does not prove that a missing selected lane is operating.
  return 'unknown';
}
function securitySortModels(models,data) {
  const group=cp=>cp.priority==='other'?2:cp.aggregate?1:0;
  const stateRank={open:0,unknown:1,closed:2},priorityRank={recommended:0,alternate:1,estimate:2,other:3};
  return [...models].sort((a,b)=>group(a)-group(b)||
    stateRank[securityCheckpointState(a,data)]-stateRank[securityCheckpointState(b,data)]||priorityRank[a.priority]-priorityRank[b.priority]);
}
function securityLink(label,url,className='security-source') {
  try{const u=new URL(url);if(u.protocol!=='https:')return null;
    const a=securityText('a',className,label);a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';return a;
  }catch{return null;}
}
const securityAirlineNames={F9:'Frontier',AA:'American',AC:'Air Canada',AS:'Alaska',B6:'JetBlue',DL:'Delta',WN:'Southwest',UA:'United',NK:'Spirit',G4:'Allegiant',MX:'Breeze',SY:'Sun Country',FI:'Icelandair',PD:'Porter',AM:'Aeromexico',AF:'Air France',BA:'British Airways',BW:'Caribbean',CM:'Copa',EK:'Emirates',F8:'Flair',LA:'LATAM',LH:'Lufthansa',RJ:'Royal Jordanian',TK:'Turkish',VB:'Viva',WS:'WestJet',XP:'Avelo',Y4:'Volaris'};
function securityAirlineChip(code) {
  const chip=securityText('span','security-airline','');
  const logo=document.createElement('img');logo.src=`/images/airlines/${code.toUpperCase()}.svg`;logo.alt='';logo.width=38;logo.height=26;logo.loading='lazy';
  logo.addEventListener('error',()=>{logo.hidden=true;},{once:true});
  chip.append(logo,securityText('span','',`${securityAirlineNames[code]||code} (${code})`));return chip;
}
function securityAirlines(codes,key) {
  codes=[...new Set(codes||[])].filter(c=>/^[A-Z0-9]{2}$/.test(c));
  if(!codes.length)return null;
  const first=codes.includes('F9')?'F9':codes[0],others=codes.filter(c=>c!==first);
  const wrap=securityText('div','security-airlines','');
  wrap.append(securityText('p','security-airline-caption','Known airlines with access'));
  if(!others.length){wrap.append(securityAirlineChip(first));return wrap;}
  const details=securityText('details','security-airline-details','');details.dataset.securityKey='airlines:'+key;
  const summary=securityText('summary','','');summary.append(securityAirlineChip(first),securityText('span','',`+ ${others.length} ${others.length===1?'other':'others'}`));
  const list=securityText('div','security-airline-list','');others.forEach(code=>list.append(securityAirlineChip(code)));
  details.append(summary,list);wrap.append(details);return wrap;
}
function securityLaneRows(box,cp,data) {
  if(cp.hours?.display)box.append(securityText('p','security-hours',`Checkpoint hours: ${cp.hours.display} · airport local time`));
  const lanes=cp.lanes.filter(l=>l.type===securityLane||l.type==='combined');
  if(!lanes.length)box.append(securityText('p','security-note',cp.live?`${securityLabels[securityLane]||'Selected lane'} information not published for this checkpoint.`:'Live lane information unavailable.'));
  for(const l of lanes){
    const line=securityText('div','security-lane-row',''),current=securityWaitCurrent(l);
    const value=l.status==='closed'?'Closed':current?securityWaitDisplay(l):l.stale?'Wait temporarily unavailable':l.status==='open'?'Open · wait not published':'Wait not published';
    line.append(securityText('span','security-lane-name',l.label||securityLabels[l.type]),securityText('strong','security-wait'+(l.status==='closed'?' is-closed':''),value));box.append(line);
    if(l.hours?.display)box.append(securityText('p','security-hours',`${l.hours.display} · airport local time`));
    if(l.status==='closed'&&l.statusMessage)box.append(securityText('p','security-hours',l.statusMessage));
    if(Number.isFinite(l.closingInMinutes)&&l.closingInMinutes<=45&&l.status==='open')box.append(securityText('p','security-closing',`Closes in ${l.closingInMinutes} min`));
    if(current&&l.timestampKind==='source')box.append(securityText('p','security-lane-updated',`Updated ${securityAge(l.updatedAt)}`));
    if(current&&l.timestampKind!=='source'&&l.sourceUpdatedText)box.append(securityText('p','security-lane-updated',l.sourceUpdatedText));
    if(l.notes)box.append(securityText('p','security-note',l.notes));
  }
}
function renderSecurity(data) {
  const card=document.getElementById('airportSecurity');
  if(!card||data.airport!==securityAirport?.code)return;
  const guidance=securityAirportGuidance[data.airport];
  // Reevaluate published hours between refreshes without changing the cached response.
  if(Array.isArray(data.checkpoints))data={...data,checkpoints:data.checkpoints.map(c=>({...c,lanes:(Array.isArray(c.lanes)?c.lanes:[]).map(l=>{
    const state=securitySchedule(l.hours||c.hours,data.timezone||securityAirport?.timezone);
    return state?{...l,status:state.status==='closed'?'closed':l.status==='unknown'?'open':l.status,closingInMinutes:state.closingInMinutes}:l;
  })}))};
  let models=securityModels(data);
  if(!guidance&&!models.some(c=>c.hours||c.lanes.some(l=>securityWaitCurrent(l)||l.hours||l.status==='closed'))){securityHide();return;}
  const open=new Set([...card.querySelectorAll('details[open][data-security-key]')].map(el=>el.dataset.securityKey));
  card.replaceChildren();card.hidden=false;
  const heading=securityText('div','security-heading',''),copy=securityText('div','security-heading-copy','');
  copy.append(securityText('div','dashboard-booking-kicker','AIRPORT SECURITY'),securityText('h3','',`${data.airport} security checkpoints`));heading.append(copy);
  const links=securityText('div','security-source-links','');
  const source=securityLink('Live airport source ↗',data.source?.url);if(source)links.append(source);
  const guideLink=securityLink('Airport guidance ↗',guidance?.sourceUrls[0]);if(guideLink)links.append(guideLink);
  heading.append(links);card.append(heading);
  if(guidance?.note)card.append(securityText('p','security-guidance-note',guidance.note));
  const hasWait=models.some(c=>c.lanes.some(securityWaitCurrent));
  if(!hasWait){
    const message=data.reason==='loading'?'Checking live waits…':data.reason==='no_public_source'?'No public live wait times':data.available?'Live waits not currently published':'Live waits temporarily unavailable';
    const status=securityText('div','security-unavailable','');status.setAttribute('role','status');
    status.append(securityText('strong','',message),securityText('p','',guidance?'Checkpoint guidance is shown below. Confirm your gate and follow airport signs.':'Published checkpoint information is shown below.'));card.append(status);
  }
  const types=[...new Set(models.flatMap(c=>c.lanes.map(l=>l.type)))].filter(t=>securityLabels[t]);
  // Preserve the user's lane preference through outages. Only reset when live types exist.
  if(types.length&&!types.includes(securityLane))securityLane=types.includes('standard')?'standard':types[0];
  models=securitySortModels(models,data);
  const options=securityText('div','security-lane-options','');options.setAttribute('role','group');options.setAttribute('aria-label','Security lane');
  for(const type of ['standard','precheck','clear','clear_precheck','combined','priority'].filter(t=>types.includes(t))){
    const button=securityText('button','security-lane-button',securityLabels[type]);button.type='button';button.dataset.securityLane=type;button.setAttribute('aria-pressed',String(type===securityLane));
    const logos=type==='precheck'?['precheck']:type==='clear'?['clear']:type==='clear_precheck'?['clear','precheck']:[];
    for(const brand of logos.reverse()){const logo=document.createElement('img');logo.className='security-lane-logo security-logo-'+brand;logo.src='images/'+brand+'.jpg';logo.alt='';logo.width=brand==='precheck'?72:50;logo.height=18;logo.addEventListener('error',()=>{logo.hidden=true;});button.prepend(logo);}
    button.addEventListener('click',()=>{securityLane=type;renderSecurity(data);card.querySelector(`[data-security-lane="${type}"]`)?.focus();});options.append(button);
  }
  if(types.length)card.append(options);
  const recommendation=data.recommendations?.find(r=>r.lane===securityLane);
  if(recommendation){const cp=models.find(c=>c.live&&c.name===recommendation.checkpoint);
    // Keep the Worker's wait comparison, but never suggest a wrong or gate-dependent entrance.
    if(cp&&(!guidance||(cp.guidance&&cp.priority!=='other'&&!cp.guidance.conditional))&&cp.lanes.some(l=>l.type===securityLane&&securityWaitCurrent(l)))
      card.append(securityText('p','security-recommendation',`${recommendation.label}: ${cp.name} · ${recommendation.displayWait}. ${recommendation.note||''}`));
  }
  const grid=securityText('div','security-checkpoints',''),estimates=securityText('div','security-checkpoints security-estimates',''),rest=securityText('div','security-checkpoints','');
  for(const cp of models){
    const key=(cp.live?'live:':'guide:')+(cp.id||cp.name),box=securityText('section','security-checkpoint security-priority-'+cp.priority,'');
    const g=cp.guidance,state=securityCheckpointState(cp,data);
    box.classList.toggle('security-checkpoint-closed',state==='closed');
    if(g&&!guidance.single&&g.priority!=='other'){
      const badge=state==='closed'?'Selected lane closed · '+(g.priority==='recommended'?'normally recommended':'alternate'):
        state==='open'&&g.priority==='alternate'&&!g.conditional?'Open alternate for Frontier':g.badge||(g.priority==='recommended'?'★ Recommended for Frontier':'Alternate for Frontier');
      box.append(securityText('span','security-priority',badge));
    }
    if(state==='closed')box.append(securityText('p','security-closing',`${securityLabels[securityLane]||'Selected lane'} closed`));
    box.append(securityText('h4','',g&&(!cp.live||g.name===cp.name)?g.name:cp.name));
    if(g?.gateLabel)box.append(securityText('p','security-gate-label',g.gateLabel));
    if(g?.note)box.append(securityText('p','security-note',g.note));
    if(g){const airlines=securityAirlines(g.airlines,key);if(airlines)box.append(airlines);}
    if(cp.aggregate)box.append(securityText('p','security-note','Airport-wide or arrival-area information; this is not a wait for the recommended departure checkpoint.'));
    if(!g&&cp.priority==='other')box.append(securityText('p','security-note','Frontier access has not been confirmed for this checkpoint. Check your gate and airport signs.'));
    securityLaneRows(box,cp,data);
    (cp.priority==='other'?rest:cp.aggregate?estimates:grid).append(box);
  }
  card.append(grid);
  if(estimates.childElementCount){card.append(securityText('h4','security-section-label','Airport-published estimates / arrival information'),estimates);}
  if(rest.childElementCount){const more=securityText('details','security-more','');more.dataset.securityKey='other:'+data.airport;
    more.append(securityText('summary','',`Other airport checkpoints (${rest.childElementCount})`),rest);card.append(more);}
  const fetched=securityAge(data.fetchedAt);
  card.append(securityText('p','security-footer',`${data.type==='estimate'?'Airport-published estimate':'Published checkpoint information'}${fetched?' · Checked '+fetched:''}${guidance?' · Guidance reviewed '+guidance.reviewed:''} · Times and gates can change. Confirm your boarding pass.`));
  for(const el of card.querySelectorAll('details[data-security-key]'))el.open=open.has(el.dataset.securityKey);
}

function selectSecurityAirport(airport) {
  securitySequence++;securityController?.abort();securityController=null;securityAirport=airport;securityHide();refreshSecurity();
}
async function refreshSecurity() {
  if(!securityAirport||!securityActive()||securityController)return;
  const airport=securityAirport,sequence=securitySequence,cached=securityResults.get(airport.code);
  if(cached&&cached.expires>Date.now()){renderSecurity(cached.data);return;}
  renderSecurity({airport:airport.code,available:false,reason:'loading'});
  const controller=new AbortController();securityController=controller;
  let timedOut=false;
  const timeout=setTimeout(()=>{timedOut=true;controller.abort();},28000);
  try{
    const url=new URL(securityEndpoint);url.searchParams.set('airport',airport.code);
    const response=await fetch(url,{signal:controller.signal,cache:'no-store'});if(!response.ok)throw new Error('Security source unavailable');
    const data=await response.json();if(data.schemaVersion!==1||data.airport!==airport.code||typeof data.available!=='boolean')throw new Error('Invalid security response');
    if(sequence!==securitySequence||securityAirport?.code!==airport.code||!securityActive())return;
    const expires=Date.parse(data.expiresAt);
    if(data.available && (!Number.isFinite(expires)||expires<=Date.now()||expires>Date.now()+301000))throw new Error('Expired security response');
    securityResults.set(airport.code,{data,expires:Number.isFinite(expires)?expires:Date.now()+300000});renderSecurity(data);
  }catch(error){
    if(sequence===securitySequence && securityAirport?.code===airport.code && securityActive() && (error.name!=='AbortError'||timedOut)){
      const fallback={airport:airport.code,available:false,reason:'source_unavailable'};
      securityResults.set(airport.code,{data:fallback,expires:Date.now()+300000});renderSecurity(fallback);
    }
  }finally{clearTimeout(timeout);if(securityController===controller)securityController=null;}
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){securitySequence++;securityController?.abort();securityController=null;}else refreshSecurity();});
if('IntersectionObserver' in window){const target=document.getElementById('dashboardMain');if(target){
  const observer=new IntersectionObserver(entries=>{securityVisible=entries[0].isIntersecting;
    if(securityVisible)refreshSecurity();else{securitySequence++;securityController?.abort();securityController=null;}},{threshold:0});observer.observe(target);
}}
setInterval(()=>{if(securityActive())refreshSecurity();},60000);

initializeWeatherEnhancements();
initializeDashboard();
