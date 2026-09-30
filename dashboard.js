/* =====================================================
   HOW TO GOWILD — DASHBOARD
   STAGE 1
   Airport + Network + City Photo
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
  CTG:1, DCA:1, FAR:1, FSD:1, JFK:1, MDE:1, MKE:1, MSN:1,
  MYR:1, OMA:1, DJT:1, PIT:1, PSE:1, RIC:1, RNO:1, STI:1,
  SYR:1, XNA:1
};


const frontierRoutes = {

  ATL:["AUS","BOS","BUF","BWI","CLE","CMH","CUN","CVG","DEN","DFW","DTW","EWR","FLL","GUA","IAD","IAH","IND","JAX","JFK","LAS","LAX","LGA","MBJ","MCI","MCO","MDW","MIA","MSP","MSY","ORD","ORF","PHL","PHX","PUJ","RDU","SAL","SFO","SJO","SJU","STL","TPA"],

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

  JFK:["ATL"],

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

const airportSnapshot = [

["ATL","Hartsfield Jackson Atlanta International Airport","Atlanta",33.6367,-84.4281],
["AUS","Austin Bergstrom International Airport","Austin",30.1945,-97.6699],
["BDL","Bradley International Airport","Hartford",41.9389,-72.6832],
["BNA","Nashville International Airport","Nashville",36.1245,-86.6782],
["BOG","El Dorado International Airport","Bogota",4.70159,-74.1469],
["BOI","Boise Air Terminal/Gowen field","Boise",43.5644,-116.223],
["BOS","General Edward Lawrence Logan International Airport","Boston",42.3643,-71.0052],
["BQN","Rafael Hernandez Airport","Aguadilla",18.4949,-67.1294],
["BUF","Buffalo Niagara International Airport","Buffalo",42.9405,-78.7322],
["BUR","Bob Hope Airport","Burbank",34.2007,-118.359],
["BWI","Baltimore/Washington International Thurgood Marshall Airport","Baltimore",39.1754,-76.6683],
["CLE","Cleveland Hopkins International Airport","Cleveland",41.4117,-81.8498],
["CLT","Charlotte Douglas International Airport","Charlotte",35.214,-80.9431],
["CMH","John Glenn Columbus International Airport","Columbus",39.998,-82.8919],
["CTG","Rafael Nunez International Airport","Cartagena",10.4424,-75.513],
["CUN","Cancun International Airport","Cancun",21.0365,-86.8771],
["CVG","Cincinnati Northern Kentucky International Airport","Hebron",39.0488,-84.6678],
["DCA","Ronald Reagan Washington National Airport","Washington",38.8521,-77.0377],
["DEN","Denver International Airport","Denver",39.8617,-104.673],
["DFW","Dallas Fort Worth International Airport","Dallas-Fort Worth",32.8968,-97.038],
["DSM","Des Moines International Airport","Des Moines",41.534,-93.6631],
["DTW","Detroit Metropolitan Wayne County Airport","Detroit",42.2124,-83.3534],
["ELP","El Paso International Airport","El Paso",31.8072,-106.378],
["EWR","Newark Liberty International Airport","Newark",40.6925,-74.1687],
["FAR","Hector International Airport","Fargo",46.9207,-96.8158],
["FLL","Fort Lauderdale Hollywood International Airport","Fort Lauderdale",26.0726,-80.1527],
["FSD","Joe Foss Field Airport","Sioux Falls",43.582,-96.7419],
["GRR","Gerald R. Ford International Airport","Grand Rapids",42.8808,-85.5228],
["GUA","La Aurora Airport","Guatemala City",14.5833,-90.5275],
["IAD","Washington Dulles International Airport","Dulles",38.9445,-77.4558],
["IAH","George Bush Intercontinental Houston Airport","Houston",29.9844,-95.3414],
["IND","Indianapolis International Airport","Indianapolis",39.7173,-86.2944],
["ISP","Long Island Mac Arthur Airport","Islip",40.7952,-73.1002],
["JAX","Jacksonville International Airport","Jacksonville",30.4941,-81.6879],
["JFK","John F Kennedy International Airport","New York",40.6398,-73.7789],
["LAS","Harry Reid International Airport","Las Vegas",36.0801,-115.152],
["LAX","Los Angeles International Airport","Los Angeles",33.9425,-118.408],
["LGA","La Guardia Airport","New York",40.7772,-73.8726],
["MBJ","Sangster International Airport","Montego Bay",18.5037,-77.9134],
["MCI","Kansas City International Airport","Kansas City",39.2976,-94.7139],
["MCO","Orlando International Airport","Orlando",28.4294,-81.309],
["MDE","Jose Maria Cordova International Airport","Rionegro",6.16454,-75.4231],
["MDW","Chicago Midway International Airport","Chicago",41.786,-87.7524],
["MEM","Memphis International Airport","Memphis",35.0424,-89.9767],
["MIA","Miami International Airport","Miami",25.7932,-80.2906],
["MKE","General Mitchell International Airport","Milwaukee",42.9472,-87.8966],
["MSN","Dane County Regional Truax Field","Madison",43.1399,-89.3375],
["MSP","Minneapolis-St Paul International Airport","Minneapolis",44.882,-93.2218],
["MSY","Louis Armstrong New Orleans International Airport","New Orleans",29.9934,-90.258],
["MYR","Myrtle Beach International Airport","Myrtle Beach",33.6797,-78.9283],
["OAK","Metropolitan Oakland International Airport","Oakland",37.7213,-122.221],
["OKC","Will Rogers World Airport","Oklahoma City",35.3931,-97.6007],
["OMA","Eppley Airfield","Omaha",41.3032,-95.8941],
["ONT","Ontario International Airport","Ontario",34.056,-117.601],
["ORD","Chicago O'Hare International Airport","Chicago",41.9786,-87.9048],
["ORF","Norfolk International Airport","Norfolk",36.8946,-76.2012],
["DJT","Palm Beach International Airport","West Palm Beach",26.6832,-80.0956],
["PDX","Portland International Airport","Portland",45.5887,-122.598],
["PHL","Philadelphia International Airport","Philadelphia",39.8719,-75.2411],
["PHX","Phoenix Sky Harbor International Airport","Phoenix",33.4343,-112.012],
["PIT","Pittsburgh International Airport","Pittsburgh",40.4915,-80.2329],
["PNS","Pensacola International Airport","Pensacola",30.4734,-87.1866],
["PSE","Mercedita Airport","Ponce",18.0083,-66.563],
["PUJ","Punta Cana International Airport","Punta Cana",18.5674,-68.3634],
["RDU","Raleigh Durham International Airport","Raleigh/Durham",35.8776,-78.7875],
["RIC","Richmond International Airport","Richmond",37.5052,-77.3197],
["RNO","Reno Tahoe International Airport","Reno",39.4991,-119.768],
["RSW","Southwest Florida International Airport","Fort Myers",26.5362,-81.7552],
["SAL","El Salvador International Airport","Santa Clara",13.4409,-89.0557],
["SAN","San Diego International Airport","San Diego",32.7336,-117.19],
["SAP","Ramon Villeda Morales International Airport","La Mesa",15.4526,-87.9236],
["SAT","San Antonio International Airport","San Antonio",29.5337,-98.4698],
["SDQ","Las Americas International Airport","Santo Domingo",18.4297,-69.6689],
["SEA","Seattle Tacoma International Airport","Seattle",47.449,-122.309],
["SFO","San Francisco International Airport","San Francisco",37.619,-122.375],
["SJC","Norman Y. Mineta San Jose International Airport","San Jose",37.3626,-121.929],
["SJO","Juan Santamaria International Airport","San Jose",9.99386,-84.2088],
["SJU","Luis Munoz Marin International Airport","San Juan",18.4394,-66.0018],
["SLC","Salt Lake City International Airport","Salt Lake City",40.7884,-111.978],
["SMF","Sacramento International Airport","Sacramento",38.6954,-121.591],
["SNA","John Wayne Airport-Orange County Airport","Santa Ana",33.6757,-117.868],
["STI","Cibao International Airport","Santiago",19.4061,-70.6047],
["STL","Lambert St Louis International Airport","St Louis",38.7487,-90.37],
["SYR","Syracuse Hancock International Airport","Syracuse",43.1112,-76.1063],
["TPA","Tampa International Airport","Tampa",27.9755,-82.5332],
["TTN","Trenton Mercer Airport","Trenton",40.2767,-74.8135],
["XNA","Northwest Arkansas Regional Airport","Fayetteville",36.2819,-94.3068]

];


let airports = [];


/* =====================================================
   LOAD AIRPORTS
   ===================================================== */

function loadAirports() {

  airports =
    airportSnapshot

      .map(
        ([code, name, city, lat, lon]) => {

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


  document.getElementById(
    "score"
  ).textContent =
    airport.score;


  document.getElementById(
    "routeCount"
  ).textContent =
    airport.routes;


  const connections =
    possibleConnections(
      airport
    );


  document.getElementById(
    "routeLabel"
  ).textContent =

    `${airport.routes} ` +

    `${airport.routes === 1
      ? "nonstop destination"
      : "nonstop destinations"
    } · ` +

    `${connections.size} possible one-stop`;


  document.getElementById(
    "rank"
  ).textContent =

    airport.rank === null

      ? "—"

      : `#${airport.rank}`;


  document.getElementById(
    "scoreBar"
  ).style.width =
    `${airport.score}%`;


  document.getElementById(
    "networkDescription"
  ).textContent =
    networkCopy(
      airport
    );


  document.getElementById(
    "airportSelect"
  ).value =
    airport.code;


  updateCityPhoto(
    airport
  );

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


    document.getElementById(
      "weatherBackground"
    ).style.backgroundImage =
      `url("${weatherImage(
        current.weather_code,
        isDay
      )}")`;


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


initializeDashboard();
