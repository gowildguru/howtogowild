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

  loadDepartureBoard(airport);

  updateWeather(
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


    if (
      daysFromToday > 1 &&
      dayStatus === "active"
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
  const near = flight.instant <= now + 3600000;
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
  if (now >= departure - 45 * 60000 && now <= departure) return {label: 'Boarding', kind: 'boarding', visible: true};
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
    if (flight.instant > now + 3600000) return false;
    const entry = boardStatuses.get(boardStatusKey(state.airport, flight));
    if (['departed','arrived','cancelled'].includes(entry?.data?.statusCode)) return false;
    const delayed = boardStatusDelayed(entry, flight, state.airport);
    return (flight.instant > now - 4 * 3600000 || delayed) && (!entry || now - entry.checkedAt >= 60000);
  });
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
      if (live.kind === 'boarding') booking.title = 'Boarding label uses the 45-minute timing rule.';
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
    const state = {airport, flights, missing, missingKeys, loadedKeys, loading: true, limit: 8, dayKey: bookingKey(today)};
    departureState = state;
    await Promise.allSettled(days.map(async day => {
      try {
        const data = await departureSnapshot(bookingKey(day.date));
        loadedKeys.add(bookingKey(day.date));
        if (request !== departureRequest) return;
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


initializeWeatherEnhancements();
initializeDashboard();
