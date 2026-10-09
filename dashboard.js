/* =====================================================
   HOW TO GOWILD \u2014 DASHBOARD
   STAGES 1\u20134
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
  BOG:"Bogot\u00e1",
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
  CUN:"Canc\u00fan",
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
  MDE:"Medell\u00edn",
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
  SJO:"San Jos\u00e9",
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

  BOG:"Bogot\u00e1",

  BQN:"Aguadilla, Puerto Rico",

  BUF:"Buffalo, New York",

  BUR:"Burbank, California",

  CLT:"Charlotte, North Carolina",

  CMH:"Columbus, Ohio",

  CTG:"Cartagena, Colombia",

  CUN:"Canc\u00fan",

  DCA:"Washington, D.C.",

  DFW:"Dallas",

  EWR:"Newark, New Jersey",

  FAR:"Fargo, North Dakota",

  IAD:"Washington, D.C.",

  ISP:"Long Island",

  JFK:"New York City",

  LGA:"New York City",

  MCO:"Orlando, Florida",

  MDE:"Medell\u00edn",

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

  SJO:"San Jos\u00e9, Costa Rica",

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
          `Photo: ${author} \u00b7 ${license}`,

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

let airportManualSelection = false;
let airportSearchMatches = [];
let airportSearchActive = -1;
let dashboardSelectedAirport = '';

function closeAirportSearch() {
  const input=document.getElementById('airportSearch'),panel=document.getElementById('airportSearchPanel');
  if(panel)panel.hidden=true;
  if(input){input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');}
  airportSearchActive=-1;
}
function highlightAirportSearch() {
  const results=document.getElementById('airportSearchResults'),input=document.getElementById('airportSearch');
  if(!results||!input)return;
  for(const [index,button] of [...results.children].entries())button.setAttribute('aria-selected',String(index===airportSearchActive));
  const active=results.children[airportSearchActive];
  if(active){input.setAttribute('aria-activedescendant',active.id);active.scrollIntoView?.({block:'nearest'});}
  else input.removeAttribute('aria-activedescendant');
}
function chooseSearchedAirport(airport) {
  if(!airport)return;
  airportManualSelection=true;
  showAirport(airport);
  const input=document.getElementById('airportSearch');
  if(input){input.value='';input.focus({preventScroll:true});}
  closeAirportSearch();
}
function renderAirportSearch() {
  const input=document.getElementById('airportSearch'),panel=document.getElementById('airportSearchPanel'),results=document.getElementById('airportSearchResults');
  if(!input||!panel||!results)return;
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const query=normalize(input.value);
  const rank=airport=>normalize(airport.code)===query?0:normalize(airport.code).startsWith(query)?1:normalize(airport.city).startsWith(query)?2:3;
  airportSearchMatches=airports.filter(airport=>!query||normalize(`${airport.code} ${airport.city} ${airport.name}`).includes(query))
    .sort((a,b)=>(query?rank(a)-rank(b):0)||a.city.localeCompare(b.city)||a.code.localeCompare(b.code));
  airportSearchActive=-1;input.removeAttribute('aria-activedescendant');results.replaceChildren();
  for(const [index,airport] of airportSearchMatches.entries()) {
    const button=document.createElement('button');button.type='button';button.className='airport-picker-result';button.id=`airportSearchOption${index}`;
    button.setAttribute('role','option');button.setAttribute('aria-selected','false');button.tabIndex=-1;
    const code=document.createElement('strong');code.textContent=airport.code;
    const copy=document.createElement('span'),city=document.createElement('strong'),name=document.createElement('span');
    city.textContent=airport.city;name.textContent=airport.name;copy.append(city,name);button.append(code,copy);
    if(airport.code===dashboardSelectedAirport){const badge=document.createElement('span');badge.className='airport-picker-selected';badge.textContent='Selected';button.append(badge);}
    button.onclick=()=>chooseSearchedAirport(airport);results.append(button);
  }
  document.getElementById('airportSearchStatus').textContent=airportSearchMatches.length?`${airportSearchMatches.length} airport${airportSearchMatches.length===1?'':'s'} \u00b7 Select one to update your dashboard`:'No matching airports. Try a code or city name.';
  panel.hidden=false;input.setAttribute('aria-expanded','true');
}
function initializeDashboardRefinements() {
  const input=document.getElementById('airportSearch'),picker=document.getElementById('airportPicker');
  if(input) {
    input.addEventListener('focus',renderAirportSearch);input.addEventListener('input',renderAirportSearch);
    input.addEventListener('keydown',event=>{
      if(event.key==='Escape'){closeAirportSearch();return;}
      if(event.key==='ArrowDown'||event.key==='ArrowUp') {
        event.preventDefault();if(document.getElementById('airportSearchPanel').hidden)renderAirportSearch();
        if(airportSearchMatches.length){airportSearchActive=airportSearchActive<0?(event.key==='ArrowDown'?0:airportSearchMatches.length-1):(airportSearchActive+(event.key==='ArrowDown'?1:-1)+airportSearchMatches.length)%airportSearchMatches.length;highlightAirportSearch();}
      } else if(event.key==='Enter') {
        event.preventDefault();if(document.getElementById('airportSearchPanel').hidden){renderAirportSearch();return;}
        if(airportSearchActive<0&&!input.value.trim())return;
        chooseSearchedAirport(airportSearchMatches[airportSearchActive<0?0:airportSearchActive]);
      }
    });
    picker?.addEventListener('focusout',event=>{if(!picker.contains(event.relatedTarget))closeAirportSearch();});
    document.addEventListener('pointerdown',event=>{if(picker&&!picker.contains(event.target))closeAirportSearch();});
  }
  for(const id of ['departureBoardCard','denGateMap','departureRouteCard'])document.getElementById(id)?.addEventListener('toggle',()=>{
    if(boardStatusLiveActive())void pollBoardStatuses();
  });
  document.addEventListener('visibilitychange',()=>{if(boardStatusLiveActive())void pollBoardStatuses();});
}

function showAirport(
  airport
) {
  dashboardSelectedAirport = airport.code;
  const searchInput=document.getElementById('airportSearch');
  if(searchInput)searchInput.placeholder=`Search airports \u00b7 showing ${airport.code}`;


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
      } \u00b7 ` +

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
   STAGE 2 \u2014 WEATHER
   ===================================================== */
/* =====================================================
   AIRPORT COMMAND CENTER \u2014 LIVE CAMERAS
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
  const card = document.getElementById('airportConditionsCard');
  return card ? card.open : window.matchMedia('(min-width: 701px)').matches;
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
      `${liveCamDefinition.provider} \u2197`;


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
   AIRPORT WEATHER RADAR \u2014 STATIC MAP + RAINVIEWER
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
  const card = document.getElementById('airportConditionsCard');
  return card ? card.open : window.matchMedia('(min-width: 701px)').matches;
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
  message.textContent = "Loading airport map\u2026";
  const marker = document.createElement("div");
  marker.className = "dashboard-radar-airport-marker dashboard-radar-static-marker";
  marker.title = `${airport.code} airport`;
  marker.setAttribute("aria-label", `${airport.code} airport location`);
  const credit = document.createElement("div");
  credit.className = "dashboard-radar-static-credit";
  credit.append(
    radarLink("Map: Esri & contributors", "https://goto.arcgisonline.com/maps/World_Street_Map"),
    document.createTextNode(" \u00b7 "),
    radarLink("Radar: RainViewer", "https://www.rainviewer.com/")
  );
  map.append(message, marker, credit);
  const source = document.getElementById("weatherRadarSource");
  if (source?.tagName === "A") {
    source.href = "https://www.rainviewer.com/";
    source.textContent = "RainViewer \u2197";
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
      radarStatus("Map ready \u00b7 Loading radar\u2026");
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
    radarStatus(`Latest radar \u00b7 ${radarTimeLabel(frame, airport)}`);
  } catch (error) {
    if (!current()) return;
    controller.abort();
    view.overlay?.remove();
    view.overlay = null;
    view.framePath = "";
    if (view.base) radarStatus("Radar unavailable \u00b7 Static map");
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
  if (label) label.textContent = `RADAR \u00b7 ${airport.code}`;
  // Clear old airport imagery even if its replacement is currently inactive.
  radarView = prepareRadarView(airport);
  if (radarView && !radarView.base) radarStatus("Loading airport map\u2026");
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
  const warning = document.getElementById("airportConditionsWarning");
  if (warning) { warning.hidden = true; warning.removeAttribute("title"); }
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
  const warning = document.getElementById("airportConditionsWarning");
  if (warning) { warning.hidden = false; warning.title = data.events.map(event => event.title).join(" \u00b7 "); }
  for (const event of data.events) {
    const item = document.createElement("div");
    item.className = "dashboard-faa-event";
    const heading = document.createElement("strong");
    heading.textContent = `FAA ${event.title} \u00b7 ${airport.code}`;
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
      detail.textContent = details.join(" \u00b7 ");
      item.append(detail);
    }
    if (event.type === "ground_stop" || event.type === "ground_delay") {
      const scope = document.createElement("span");
      scope.textContent = "Affects covered flights headed to this airport; check your airline for your flight\u2019s status.";
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
  foot.append(link, document.createTextNode(` \u00b7 Updated ${updated}`));
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
  document.getElementById('airportConditionsCard')?.addEventListener('toggle', () => {
    syncRadarActivity();
    // Restore the camera source label when opening after an initially closed load.
    if (liveCamAirport) updateLiveCam(liveCamAirport);
    else syncLiveCamActivity();
  });
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


/* Weather-dependent line icon in the collapsed conditions header. */
function setConditionsHeaderIcon(code, isDay) {
  const icon = document.getElementById('airportConditionsHeaderIcon');
  if (!icon) return;
  const cloud = '<path d="M6 17a4 4 0 1 1 1-8 5 5 0 0 1 9 2h1a3 3 0 0 1 0 6H6Z"/>';
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>';
  const moon = '<path d="M20 14a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10Z"/>';
  let body = '<circle cx="12" cy="12" r="8"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 16h.01"/>';
  let kind = 'unavailable';
  const value = code == null ? NaN : Number(code);
  if ([0,1].includes(value)) { body = isDay ? sun : moon; kind = isDay ? 'sun' : 'moon'; }
  else if (value === 2) { body = '<path d="M5 2v2M1 7h2M2 3l1.5 1.5"/><circle cx="5" cy="7" r="3"/>' + cloud; kind = 'partly-cloudy'; }
  else if (value === 3) { body = cloud; kind = 'cloud'; }
  else if ([45,48].includes(value)) { body = '<path d="M4 6h16M2 10h18M4 14h18M2 18h18"/>'; kind = 'fog'; }
  else if ([71,73,75,77,85,86].includes(value)) { body = cloud + '<path d="M7 20v3M5.7 20.7l2.6 1.6M8.3 20.7l-2.6 1.6M16 20v3M14.7 20.7l2.6 1.6M17.3 20.7l-2.6 1.6"/>'; kind = 'snow'; }
  else if ([95,96,99].includes(value)) { body = cloud + '<path d="m12 17-3 3h4l-2 3"/>'; kind = 'storm'; }
  else if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(value)) { body = cloud + '<path d="m7 20-1 2M12 20l-1 2M17 20l-1 2"/>'; kind = 'rain'; }
  icon.dataset.weather = kind;
  icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">' + body + '</svg>';
}

function initializeSecurityConveyor() {
  const card = document.getElementById('airportSecurityCard');
  if (!card) return;
  let visible = !('IntersectionObserver' in window);
  const sync = () => card.classList.toggle('is-belt-active', visible && !document.hidden && !card.hidden);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold:0});
    observer.observe(card);
  }
  document.addEventListener('visibilitychange', sync);
  sync();
}

async function updateWeather(airport) {
  const requestSequence = ++weatherRequestSequence;
  setConditionsHeaderIcon(null, true);
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
      )}\u00b0`;


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
    setConditionsHeaderIcon(current.weather_code, isDay);


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
        : "\u2713";


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
        `${low}\u00b0\u2013${high}\u00b0 \u00b7 ${rain}% precip.`;

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
      "\u2013";

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
   STAGE 3 \u2014 GOWILD BOOKING CALENDAR
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
        "\u00d7";


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

          ? `${bookingShortLabel(tomorrow)} \u00b7 Peak Day Charge may apply`

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
  if (!fresh) return near ? {label: entry?.error ? 'Status unavailable' : 'Checking status\u2026', kind: 'live', visible: flight.instant > now - 4 * 3600000 || boardStatusDelayed(entry, flight, airport)} : null;
  const actual = boardStatusTime(data.departure.actual, flight, airport);
  const estimate = boardStatusTime(data.departure.estimated, flight, airport);
  const terminal = ['departed', 'arrived'].includes(data.statusCode) || actual !== null;
  if (terminal) return {label: 'Departed' + (data.departure.actual ? ` \u00b7 ${data.departure.actual}` : ''), kind: 'departed',
    visible: now < (actual ?? flight.instant) + 3600000};
  if (data.statusCode === 'cancelled') return {label: 'Cancelled', kind: 'cancelled', visible: flight.instant > now - 3600000};
  if (!near) return null;
  if (data.statusCode === 'delayed' || (estimate !== null && estimate > flight.instant + 60000)) {
    return {label: data.departure.estimated ? `Delayed \u00b7 ${data.departure.estimated}` : 'Delayed', kind: 'delayed', visible: true};
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

function boardStatusLiveActive() {
  return !document.hidden && ['departureBoardCard','denGateMap','departureRouteCard'].some(id=>{
    const card=document.getElementById(id);return card && card.open && !card.hidden;
  });
}

async function pollBoardStatuses() {
  if (boardStatusPolling || !departureState || !boardStatusLiveActive()) return;
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
        if (departureState !== state || !boardStatusLiveActive()) break;
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

/* Dashboard route map. The basemap is embedded; schedules/statuses reuse the board cache. */
const departureRouteLand = [[[-122.84,49],[-125.62,50.42],[-127.44,50.83],[-127.99,51.72],[-127.85,52.33],[-129.13,52.76],[-129.31,53.56],[-130.51,54.29],[-130.54,54.8],[-130.54,54.8],[-129.98,55.28],[-130.01,55.92],[-131.71,56.55],[-132.73,57.69],[-133.36,58.41],[-134.27,58.86],[-134.94,59.27],[-135.48,59.79],[-136.48,59.46],[-137.45,58.91],[-138.34,59.56],[-139.04,60],[-140.01,60.28],[-141.0,60.31],[-140.99,66.0],[-140.99,69.71],[-136.5,68.9],[-135.63,69.32],[-134.41,69.63],[-132.93,69.51],[-131.43,69.94],[-129.79,70.19],[-129.11,69.78],[-128.36,70.01],[-128.14,70.48],[-127.45,70.38],[-125.76,69.48],[-124.42,70.16],[-124.29,69.4],[-123.06,69.56],[-122.68,69.86],[-121.47,69.8],[-119.94,69.38],[-117.6,69.01],[-116.23,68.84],[-115.25,68.91],[-113.9,68.4],[-115.3,67.9],[-113.5,67.69],[-110.8,67.81],[-109.95,67.98],[-108.88,67.38],[-107.79,67.89],[-108.81,68.31],[-108.17,68.65],[-106.95,68.7],[-106.15,68.8],[-105.34,68.56],[-104.34,68.02],[-103.22,68.1],[-101.45,67.65],[-99.9,67.81],[-98.44,67.78],[-98.56,68.4],[-97.67,68.58],[-96.12,68.24],[-96.13,67.29],[-95.49,68.09],[-94.69,68.06],[-94.23,69.07],[-95.3,69.69],[-96.47,70.09],[-96.39,71.19],[-95.21,71.92],[-93.89,71.76],[-92.88,71.32],[-91.52,70.19],[-92.41,69.7],[-90.55,69.5],[-90.55,68.47],[-89.22,69.26],[-88.02,68.62],[-88.32,67.87],[-87.35,67.2],[-86.31,67.92],[-85.58,68.78],[-85.52,69.88],[-84.1,69.81],[-82.62,69.66],[-81.28,69.16],[-81.22,68.67],[-81.96,68.13],[-81.26,67.6],[-81.39,67.11],[-83.34,66.41],[-84.74,66.26],[-85.77,66.56],[-87.32,64.78],[-88.48,64.1],[-89.91,64.03],[-90.7,63.61],[-90.77,62.96],[-91.93,62.84],[-93.16,62.02],[-94.24,60.9],[-94.63,60.11],[-94.68,58.95],[-93.22,58.78],[-92.76,57.85],[-92.3,57.09],[-90.9,57.28],[-89.04,56.85],[-88.04,56.47],[-87.32,56.0],[-86.07,55.72],[-85.01,55.3],[-83.36,55.24],[-82.27,55.15],[-82.44,54.28],[-82.13,53.28],[-81.4,52.16],[-79.91,51.21],[-79.14,51.53],[-78.6,52.56],[-79.12,54.14],[-79.83,54.67],[-78.23,55.14],[-77.1,55.84],[-76.54,56.53],[-76.62,57.2],[-77.3,58.05],[-78.52,58.8],[-77.34,59.85],[-77.77,60.76],[-78.11,62.32],[-77.41,62.55],[-75.7,62.28],[-74.67,62.18],[-73.84,62.44],[-72.91,62.11],[-71.68,61.53],[-71.37,61.14],[-69.59,61.06],[-69.62,60.22],[-69.29,58.96],[-68.37,58.8],[-67.65,58.21],[-66.2,58.77],[-65.25,59.87],[-64.58,60.34],[-61.4,56.97],[-61.8,56.34],[-60.47,55.78],[-59.57,55.2],[-57.98,54.95],[-57.33,54.63],[-56.94,53.78],[-56.16,53.65],[-55.76,53.27],[-55.68,52.15],[-56.41,51.77],[-57.13,51.42],[-58.77,51.06],[-60.03,50.24],[-61.72,50.08],[-63.86,50.29],[-65.36,50.3],[-66.4,50.23],[-67.24,49.51],[-68.51,49.07],[-69.95,47.74],[-71.1,46.82],[-70.26,46.99],[-68.65,48.3],[-66.55,49.13],[-65.06,49.23],[-64.17,48.74],[-65.12,48.07],[-64.8,46.99],[-64.47,46.24],[-63.17,45.74],[-61.52,45.88],[-60.52,47.01],[-60.45,46.28],[-59.8,45.92],[-61.04,45.27],[-63.25,44.67],[-64.25,44.27],[-65.36,43.55],[-66.12,43.62],[-66.16,44.47],[-64.43,45.29],[-66.03,45.26],[-67.14,45.14],[-67.79,45.7],[-67.79,47.07],[-68.23,47.35],[-68.91,47.19],[-69.24,47.45],[-70.0,46.69],[-70.31,45.91],[-70.66,45.46],[-71.08,45.31],[-71.41,45.26],[-71.51,45.01],[-73.35,45.01],[-74.87,45.0],[-76.5,44.02],[-76.82,43.63],[-77.74,43.63],[-78.72,43.63],[-79.17,43.47],[-78.94,42.86],[-80.25,42.37],[-81.28,42.21],[-82.44,41.68],[-83.14,41.98],[-82.14,43.57],[-82.34,44.44],[-82.55,45.35],[-83.59,45.82],[-83.47,45.99],[-83.62,46.12],[-83.89,46.12],[-84.09,46.28],[-84.14,46.51],[-84.34,46.41],[-84.6,46.44],[-84.88,46.9],[-88.38,48.3],[-89.27,48.02],[-89.6,48.01],[-90.83,48.27],[-91.64,48.14],[-94.33,48.67],[-94.64,48.84],[-94.82,49.39],[-95.16,49.38],[-95.16,49],[-122.84,49]],[[-83.99,62.45],[-83.25,62.91],[-81.88,62.9],[-81.9,62.71],[-83.07,62.16],[-83.77,62.18],[-83.99,62.45]],[[-79.78,72.8],[-80.88,73.33],[-80.83,73.69],[-80.35,73.76],[-78.06,73.65],[-76.34,73.1],[-76.25,72.83],[-79.78,72.8]],[[-80.32,62.09],[-79.93,62.39],[-79.52,62.36],[-79.27,62.16],[-79.66,61.63],[-80.1,61.72],[-80.36,62.02],[-80.32,62.09]],[[-93.61,74.98],[-94.16,74.59],[-95.61,74.67],[-96.82,74.93],[-96.29,75.38],[-94.85,75.65],[-93.98,75.3],[-93.61,74.98]],[[-88.15,74.39],[-89.76,74.52],[-92.42,74.84],[-92.77,75.39],[-92.89,75.88],[-93.89,76.32],[-95.96,76.44],[-97.12,76.75],[-96.75,77.16],[-94.68,77.1],[-93.57,76.78],[-91.61,76.78],[-90.74,76.45],[-90.97,76.07],[-89.82,75.85],[-89.19,75.61],[-87.84,75.57],[-86.38,75.48],[-84.79,75.7],[-82.75,75.78],[-81.13,75.71],[-80.06,75.34],[-79.83,74.92],[-80.46,74.66],[-81.95,74.44],[-83.23,74.56],[-86.1,74.41],[-88.15,74.39]],[[-55.6,51.32],[-56.13,50.69],[-56.8,49.81],[-56.14,50.15],[-55.47,49.94],[-55.82,49.59],[-54.94,49.31],[-54.47,49.56],[-53.48,49.25],[-53.79,48.52],[-53.09,48.69],[-52.96,48.16],[-52.65,47.54],[-53.07,46.66],[-53.52,46.62],[-54.18,46.81],[-53.96,47.63],[-54.24,47.75],[-55.4,46.88],[-56.0,46.92],[-55.29,47.39],[-56.25,47.63],[-57.33,47.57],[-59.27,47.6],[-59.42,47.9],[-58.8,48.25],[-59.23,48.52],[-58.39,49.13],[-57.36,50.72],[-56.74,51.29],[-55.87,51.63],[-55.41,51.59],[-55.6,51.32]],[[-83.88,65.11],[-82.79,64.77],[-81.64,64.46],[-81.55,63.98],[-80.82,64.06],[-80.1,63.73],[-80.99,63.41],[-82.55,63.65],[-83.11,64.1],[-84.1,63.57],[-85.52,63.05],[-85.87,63.64],[-87.22,63.54],[-86.35,64.04],[-86.22,64.82],[-85.88,65.74],[-85.16,65.66],[-84.98,65.22],[-84.46,65.37],[-83.88,65.11]],[[-78.77,72.35],[-77.82,72.75],[-75.61,72.24],[-74.23,71.77],[-74.1,71.33],[-72.24,71.56],[-71.2,70.92],[-68.79,70.53],[-67.91,70.12],[-66.97,69.19],[-68.81,68.72],[-66.45,68.07],[-64.86,67.85],[-63.42,66.93],[-61.85,66.86],[-62.16,66.16],[-63.92,65.0],[-65.15,65.43],[-66.72,66.39],[-68.02,66.26],[-68.14,65.69],[-65.32,64.38],[-64.67,63.39],[-65.01,62.67],[-66.28,62.95],[-68.78,63.75],[-67.37,62.88],[-66.33,62.28],[-66.17,61.93],[-68.88,62.33],[-71.02,62.91],[-72.24,63.4],[-71.89,63.68],[-73.38,64.19],[-74.83,64.68],[-74.82,64.39],[-77.71,64.23],[-78.56,64.57],[-77.9,65.31],[-76.02,65.33],[-73.96,65.45],[-74.29,65.81],[-73.94,66.31],[-72.65,67.28],[-72.93,67.73],[-73.31,68.07],[-74.84,68.55],[-76.87,68.89],[-76.23,69.15],[-77.29,69.77],[-78.17,69.83],[-78.96,70.17],[-79.49,69.87],[-81.31,69.74],[-88.68,70.41],[-89.51,70.76],[-88.47,71.22],[-89.89,71.22],[-90.21,72.24],[-89.44,73.13],[-88.41,73.54],[-85.83,73.8],[-86.56,73.16],[-85.77,72.53],[-84.85,73.34],[-82.32,73.75],[-80.6,72.72],[-80.75,72.06],[-78.77,72.35]],[[-94.5,74.13],[-92.42,74.1],[-90.51,73.86],[-92.0,72.97],[-93.2,72.77],[-94.27,72.02],[-95.41,72.06],[-96.03,72.94],[-96.02,73.44],[-95.5,73.86],[-94.5,74.13]],[[-132.71,54.04],[-131.75,54.12],[-132.05,52.98],[-131.18,52.18],[-131.58,52.18],[-132.18,52.64],[-132.55,53.1],[-133.05,53.41],[-133.24,53.85],[-133.18,54.17],[-132.71,54.04]],[[-123.51,48.51],[-124.01,48.37],[-125.66,48.83],[-125.95,49.18],[-126.85,49.53],[-127.03,49.81],[-128.06,49.99],[-128.44,50.54],[-128.36,50.77],[-125.76,50.3],[-125.42,49.95],[-124.92,49.48],[-123.92,49.06],[-123.51,48.51]],[[-121.54,74.45],[-120.11,74.24],[-117.56,74.19],[-116.58,73.9],[-115.51,73.48],[-116.77,73.22],[-119.22,72.52],[-120.46,71.82],[-120.46,71.38],[-123.09,70.9],[-123.62,71.34],[-125.93,71.87],[-123.94,73.68],[-124.92,74.29],[-121.54,74.45]],[[-107.82,75.85],[-106.93,76.01],[-105.88,75.97],[-105.7,75.48],[-106.31,75.01],[-109.7,74.85],[-112.22,74.42],[-113.74,74.39],[-113.87,74.72],[-111.79,75.16],[-116.31,75.04],[-117.71,75.22],[-116.35,76.2],[-115.4,76.48],[-112.59,76.14],[-110.81,75.55],[-109.07,75.47],[-110.5,76.43],[-109.58,76.79],[-108.55,76.68],[-108.21,76.2],[-107.82,75.85]],[[-106.52,73.08],[-105.4,72.67],[-104.77,71.7],[-104.46,70.99],[-102.79,70.5],[-100.98,70.02],[-101.09,69.58],[-102.73,69.5],[-102.09,69.12],[-102.43,68.75],[-104.24,68.91],[-105.96,69.18],[-107.12,69.12],[-109,68.78],[-111.53,68.63],[-113.31,68.54],[-113.85,69.01],[-115.22,69.28],[-116.11,69.17],[-117.34,69.96],[-116.67,70.07],[-115.13,70.24],[-113.72,70.19],[-112.42,70.37],[-114.35,70.6],[-116.49,70.52],[-117.9,70.54],[-118.43,70.91],[-116.11,71.31],[-117.66,71.3],[-119.4,71.56],[-118.56,72.31],[-117.87,72.71],[-115.19,73.31],[-114.17,73.12],[-114.67,72.65],[-112.44,72.96],[-111.05,72.45],[-109.92,72.96],[-109.01,72.63],[-108.19,71.65],[-107.69,72.07],[-108.4,73.09],[-107.52,73.24],[-106.52,73.08]],[[-100.44,72.71],[-101.54,73.36],[-100.36,73.84],[-99.16,73.63],[-97.38,73.76],[-97.12,73.47],[-98.05,72.99],[-96.54,72.56],[-96.72,71.66],[-98.36,71.27],[-99.32,71.36],[-100.01,71.74],[-102.5,72.51],[-102.48,72.83],[-100.44,72.71]],[[-106.6,73.6],[-105.26,73.64],[-104.5,73.42],[-105.38,72.76],[-106.94,73.46],[-106.6,73.6]],[[-98.5,76.72],[-97.74,76.26],[-97.7,75.74],[-98.16,75],[-99.81,74.9],[-100.88,75.06],[-100.86,75.64],[-102.5,75.56],[-102.57,76.34],[-101.49,76.31],[-99.98,76.65],[-98.58,76.59],[-98.5,76.72]],[[-75.22,67.44],[-75.87,67.15],[-76.99,67.1],[-77.24,67.59],[-76.81,68.15],[-75.9,68.29],[-75.11,68.01],[-75.1,67.58],[-75.22,67.44]],[[-96.26,69.49],[-95.65,69.11],[-96.27,68.76],[-97.62,69.06],[-98.43,68.95],[-99.8,69.4],[-98.92,69.71],[-98.22,70.14],[-96.26,69.49]],[[-64.52,49.87],[-64.17,49.96],[-62.86,49.71],[-61.84,49.29],[-61.81,49.11],[-62.29,49.09],[-63.59,49.4],[-64.52,49.87]],[[-64.01,47.04],[-63.66,46.55],[-62.94,46.42],[-62.01,46.44],[-62.5,46.03],[-62.87,45.97],[-64.14,46.39],[-64.39,46.73],[-64.01,47.04]],[[-122.84,49],[-95.16,49],[-95.16,49.38],[-94.82,49.39],[-94.64,48.84],[-94.33,48.67],[-91.64,48.14],[-90.83,48.27],[-89.6,48.01],[-89.27,48.02],[-88.38,48.3],[-84.88,46.9],[-84.6,46.44],[-84.34,46.41],[-84.14,46.51],[-84.09,46.28],[-83.89,46.12],[-83.62,46.12],[-83.47,45.99],[-83.59,45.82],[-82.55,45.35],[-82.34,44.44],[-82.14,43.57],[-83.12,42.08],[-82.69,41.68],[-78.94,42.86],[-79.17,43.47],[-78.72,43.63],[-77.74,43.63],[-76.82,43.63],[-76.5,44.02],[-74.87,45.0],[-73.35,45.01],[-71.51,45.01],[-71.41,45.26],[-71.08,45.31],[-70.66,45.46],[-70.31,45.91],[-70.0,46.69],[-69.24,47.45],[-68.91,47.19],[-68.23,47.35],[-67.79,47.07],[-67.79,45.7],[-67.14,45.14],[-66.96,44.81],[-70.12,43.68],[-70.65,43.09],[-70.81,42.87],[-70.83,42.34],[-70.5,41.8],[-70.08,41.78],[-70.19,42.15],[-69.88,41.92],[-69.97,41.64],[-72.88,41.22],[-73.71,40.93],[-72.24,41.12],[-71.94,40.93],[-73.34,40.63],[-73.98,40.63],[-73.95,40.75],[-74.26,40.47],[-73.96,40.43],[-74.18,39.71],[-74.91,38.94],[-74.98,39.2],[-75.2,39.25],[-75.53,39.5],[-75.32,38.96],[-75.07,38.78],[-75.06,38.4],[-75.38,38.02],[-75.94,37.22],[-76.03,37.26],[-75.72,37.94],[-76.23,38.32],[-76.35,39.15],[-76.54,38.72],[-76.33,38.08],[-76.99,38.24],[-76.3,37.92],[-76.26,36.97],[-75.97,36.9],[-75.87,36.55],[-75.73,35.55],[-76.36,34.81],[-77.4,34.51],[-78.05,33.93],[-78.55,33.86],[-79.06,33.49],[-79.2,33.16],[-80.3,32.51],[-80.86,32.03],[-81.34,31.44],[-81.49,30.73],[-81.31,30.04],[-80.98,29.18],[-80.54,28.47],[-80.53,28.04],[-80.06,26.88],[-80.09,26.21],[-80.13,25.82],[-80.38,25.21],[-80.68,25.08],[-81.17,25.2],[-81.33,25.64],[-81.71,25.87],[-82.86,27.89],[-82.65,28.55],[-82.93,29.1],[-83.71,29.94],[-84.1,30.09],[-85.11,29.64],[-86.4,30.4],[-87.53,30.27],[-88.42,30.38],[-89.18,30.32],[-89.59,30.16],[-89.22,29.29],[-89.41,29.16],[-89.78,29.31],[-90.15,29.12],[-90.88,29.15],[-91.63,29.68],[-92.5,29.55],[-93.23,29.78],[-93.85,29.71],[-94.69,29.48],[-97.14,27.83],[-97.37,27.38],[-97.38,26.69],[-97.33,26.21],[-97.14,25.87],[-97.53,25.84],[-98.24,26.06],[-99.02,26.37],[-99.3,26.84],[-99.52,27.54],[-100.96,29.38],[-101.66,29.78],[-102.48,29.76],[-103.11,28.97],[-103.94,29.27],[-104.46,29.57],[-104.71,30.12],[-105.04,30.64],[-106.51,31.75],[-108.24,31.75],[-108.24,31.34],[-109.03,31.34],[-111.02,31.33],[-113.3,32.04],[-114.81,32.53],[-114.72,32.72],[-115.99,32.61],[-117.13,32.54],[-117.3,33.05],[-117.94,33.62],[-118.41,33.74],[-118.52,34.03],[-120.62,34.61],[-120.74,35.16],[-121.71,36.16],[-122.55,37.55],[-122.51,37.78],[-122.95,38.11],[-123.73,38.95],[-123.87,39.77],[-124.4,40.31],[-124.18,41.14],[-124.21,42.0],[-124.53,42.77],[-124.14,43.71],[-124.02,44.62],[-123.9,45.52],[-124.08,46.86],[-124.4,47.72],[-124.69,48.18],[-124.57,48.38],[-123.12,48.04],[-122.59,47.1],[-122.34,47.36],[-122.5,48.18],[-122.84,49]],[[-155.4,20.08],[-154.83,19.45],[-155.69,18.92],[-155.94,19.06],[-155.91,19.34],[-156.07,19.7],[-156.02,19.81],[-155.85,19.98],[-155.92,20.17],[-155.4,20.08]],[[-156.0,20.76],[-156.08,20.64],[-156.41,20.57],[-156.59,20.78],[-156.7,20.86],[-156.71,20.93],[-156.61,21.01],[-156.26,20.92],[-156.0,20.76]],[[-156.76,21.18],[-156.79,21.07],[-157.33,21.1],[-157.25,21.22],[-156.76,21.18]],[[-158.03,21.72],[-157.94,21.65],[-157.65,21.32],[-157.71,21.26],[-157.78,21.28],[-158.13,21.31],[-158.25,21.54],[-158.29,21.58],[-158.03,21.72]],[[-159.37,22.21],[-159.35,21.98],[-159.46,21.88],[-159.8,22.07],[-159.37,22.21]],[[-166.47,60.38],[-165.67,60.29],[-165.58,59.91],[-166.19,59.75],[-166.85,59.94],[-167.46,60.21],[-166.47,60.38]],[[-153.23,57.97],[-152.56,57.9],[-152.14,57.59],[-153.01,57.12],[-154.01,56.73],[-154.52,56.99],[-154.67,57.46],[-153.76,57.82],[-153.23,57.97]],[[-140.99,69.71],[-141.0,60.31],[-140.01,60.28],[-139.04,60],[-138.34,59.56],[-137.45,58.91],[-136.48,59.46],[-135.48,59.79],[-134.94,59.27],[-134.27,58.86],[-133.36,58.41],[-132.73,57.69],[-131.71,56.55],[-130.01,55.92],[-129.98,55.28],[-130.54,54.8],[-131.09,55.18],[-131.97,55.5],[-132.25,56.37],[-133.54,57.18],[-134.08,58.12],[-135.04,58.19],[-136.63,58.21],[-137.8,58.5],[-139.87,59.54],[-140.83,59.73],[-142.57,60.08],[-143.96,60.0],[-145.93,60.46],[-147.11,60.88],[-148.22,60.67],[-148.02,59.98],[-151.72,59.16],[-151.86,59.74],[-151.41,60.73],[-150.35,61.03],[-150.62,61.28],[-151.9,60.73],[-152.58,60.06],[-154.02,59.35],[-153.29,58.86],[-154.23,58.15],[-155.31,57.73],[-156.31,57.42],[-156.56,56.98],[-158.12,56.46],[-158.43,55.99],[-159.6,55.57],[-160.29,55.64],[-163.07,54.69],[-164.79,54.4],[-164.94,54.57],[-161.8,55.89],[-160.56,56.01],[-160.07,56.42],[-157.72,57.57],[-157.55,58.33],[-157.04,58.92],[-158.19,58.62],[-158.52,58.79],[-159.06,58.42],[-159.71,58.93],[-159.98,58.57],[-160.36,59.07],[-161.36,58.67],[-161.97,58.67],[-162.05,59.27],[-161.87,59.63],[-162.52,59.99],[-163.82,59.8],[-164.66,60.27],[-165.35,60.51],[-165.35,61.07],[-166.12,61.5],[-165.73,62.07],[-164.92,62.63],[-164.56,63.15],[-163.75,63.22],[-163.07,63.06],[-162.26,63.54],[-161.53,63.46],[-160.77,63.77],[-160.96,64.22],[-161.52,64.4],[-160.78,64.79],[-161.39,64.78],[-162.45,64.56],[-162.76,64.34],[-163.55,64.56],[-164.96,64.45],[-166.43,64.69],[-166.85,65.09],[-168.11,65.67],[-166.71,66.09],[-164.47,66.58],[-163.65,66.58],[-163.79,66.08],[-161.68,66.12],[-162.49,66.74],[-163.72,67.12],[-164.43,67.62],[-165.39,68.04],[-166.76,68.36],[-166.2,68.88],[-164.43,68.92],[-163.17,69.37],[-162.93,69.86],[-161.91,70.33],[-160.93,70.45],[-159.04,70.89],[-158.12,70.82],[-156.58,71.36],[-155.07,71.15],[-154.34,70.7],[-153.9,70.89],[-152.21,70.83],[-152.27,70.6],[-150.74,70.43],[-149.72,70.53],[-144.92,69.99],[-143.59,70.15],[-140.99,69.71]],[[-171.73,63.78],[-168.69,63.3],[-168.77,63.19],[-169.53,62.98],[-170.29,63.19],[-170.67,63.38],[-171.55,63.32],[-171.79,63.41],[-171.73,63.78]],[[-69.59,-17.58],[-69.1,-18.26],[-68.97,-18.98],[-68.44,-19.41],[-68.76,-20.37],[-68.22,-21.49],[-67.83,-22.87],[-67.11,-22.74],[-66.99,-22.99],[-67.33,-24.03],[-68.42,-24.52],[-68.39,-26.19],[-68.59,-26.51],[-68.3,-26.9],[-69.0,-27.52],[-69.66,-28.46],[-70.01,-29.37],[-69.92,-30.34],[-70.54,-31.37],[-70.07,-33.09],[-69.81,-33.27],[-69.82,-34.19],[-70.39,-35.17],[-70.36,-36.01],[-71.12,-36.66],[-71.12,-37.58],[-70.81,-38.55],[-71.41,-38.92],[-71.68,-39.81],[-71.92,-40.83],[-71.75,-42.05],[-72.15,-42.25],[-71.92,-43.41],[-71.46,-43.79],[-71.79,-44.21],[-71.33,-44.41],[-71.22,-44.78],[-71.66,-44.97],[-71.55,-45.56],[-71.92,-46.88],[-72.45,-47.74],[-72.33,-48.24],[-72.65,-48.88],[-73.42,-49.32],[-73.33,-50.38],[-72.98,-50.74],[-72.31,-50.68],[-72.33,-51.43],[-71.91,-52.01],[-69.5,-52.14],[-68.57,-52.3],[-69.46,-52.29],[-69.94,-52.54],[-70.85,-52.9],[-71.01,-53.83],[-71.43,-53.86],[-72.56,-53.53],[-74.95,-52.26],[-75.26,-51.63],[-74.98,-51.04],[-75.48,-50.38],[-75.61,-48.67],[-75.18,-47.71],[-74.13,-46.94],[-75.64,-46.65],[-74.69,-45.76],[-74.35,-44.1],[-73.24,-44.45],[-72.72,-42.38],[-73.39,-42.12],[-73.7,-43.37],[-74.33,-43.22],[-74.02,-41.79],[-73.68,-39.94],[-73.22,-39.26],[-73.51,-38.28],[-73.59,-37.16],[-73.17,-37.12],[-71.44,-32.42],[-71.67,-30.92],[-71.37,-30.1],[-71.49,-28.86],[-70.91,-27.64],[-70.09,-21.39],[-70.16,-19.76],[-70.37,-18.35],[-69.86,-18.09],[-69.59,-17.58]],[[-71.71,19.71],[-71.62,19.17],[-71.7,18.79],[-71.95,18.62],[-71.69,18.32],[-71.71,18.04],[-73.45,18.22],[-73.92,18.03],[-74.46,18.34],[-74.37,18.66],[-73.45,18.53],[-72.69,18.45],[-72.33,18.67],[-72.79,19.1],[-72.78,19.48],[-73.42,19.64],[-73.19,19.92],[-72.58,19.87],[-71.71,19.71]],[[-71.71,18.04],[-71.69,18.32],[-71.95,18.62],[-71.7,18.79],[-71.59,19.88],[-69.95,19.65],[-69.77,19.29],[-69.22,19.31],[-69.25,19.02],[-68.81,18.98],[-68.32,18.61],[-68.69,18.21],[-69.16,18.42],[-69.62,18.38],[-69.95,18.43],[-70.13,18.25],[-70.52,18.18],[-70.67,18.43],[-71.0,18.28],[-71.4,17.6],[-71.66,17.76],[-71.71,18.04]],[[-174.93,67.21],[-175.01,66.58],[-174.34,66.34],[-174.57,67.06],[-171.86,66.91],[-169.9,65.98],[-170.89,65.54],[-172.53,65.44],[-172.56,64.46],[-172.96,64.25],[-173.89,64.28],[-174.65,64.63],[-175.98,64.92],[-176.21,65.36],[-177.22,65.52],[-178.36,65.39],[-178.9,65.74],[-178.69,66.11],[-179.88,65.87],[-179.43,65.4],[-180,64.98],[-180,68.96],[-177.55,68.2],[-174.93,67.21]],[[-78.98,26.79],[-78.51,26.87],[-77.85,26.84],[-77.82,26.58],[-78.91,26.42],[-78.98,26.79]],[[-77.79,27.04],[-77,26.59],[-77.17,25.88],[-77.36,26.01],[-77.34,26.53],[-77.79,26.93],[-77.79,27.04]],[[-78.19,25.21],[-77.89,25.17],[-77.54,24.34],[-77.53,23.76],[-77.78,23.71],[-78.03,24.29],[-78.41,24.58],[-78.19,25.21]],[[-46.76,82.63],[-43.41,83.23],[-39.9,83.18],[-38.62,83.55],[-35.09,83.65],[-27.1,83.52],[-20.85,82.73],[-22.69,82.34],[-26.52,82.3],[-31.9,82.2],[-31.4,82.02],[-27.86,82.13],[-24.84,81.79],[-22.9,82.09],[-22.07,81.73],[-23.17,81.15],[-20.62,81.52],[-15.77,81.91],[-12.77,81.72],[-12.21,81.29],[-16.29,80.58],[-16.85,80.35],[-20.05,80.18],[-17.73,80.13],[-18.9,79.4],[-19.7,78.75],[-19.67,77.64],[-18.47,76.99],[-20.04,76.94],[-21.68,76.63],[-19.83,76.1],[-19.6,75.25],[-20.67,75.16],[-19.37,74.3],[-21.59,74.22],[-20.43,73.82],[-20.76,73.46],[-22.17,73.31],[-23.57,73.31],[-22.31,72.63],[-22.3,72.18],[-24.28,72.6],[-24.79,72.33],[-23.44,72.08],[-22.13,71.47],[-21.75,70.66],[-23.54,70.47],[-24.31,70.86],[-25.54,71.43],[-25.2,70.75],[-26.36,70.23],[-23.73,70.18],[-22.35,70.13],[-25.03,69.26],[-27.75,68.47],[-30.67,68.13],[-31.78,68.12],[-32.81,67.74],[-34.2,66.68],[-36.35,65.98],[-39.81,65.46],[-40.67,64.84],[-40.68,64.14],[-41.19,63.48],[-42.82,62.68],[-42.42,61.9],[-42.87,61.07],[-43.38,60.1],[-44.79,60.04],[-46.26,60.85],[-48.26,60.86],[-49.23,61.41],[-49.9,62.38],[-51.63,63.63],[-52.14,64.28],[-52.28,65.18],[-53.66,66.1],[-53.3,66.84],[-53.97,67.19],[-52.98,68.36],[-51.48,68.73],[-51.08,69.15],[-50.87,69.93],[-53.46,69.28],[-54.68,69.61],[-54.75,70.29],[-54.36,70.82],[-53.43,70.84],[-51.39,70.57],[-53.11,71.2],[-54.0,71.55],[-55,71.41],[-55.83,71.65],[-54.72,72.59],[-57.32,74.71],[-58.6,75.1],[-58.59,75.52],[-61.27,76.1],[-68.5,76.06],[-69.66,76.38],[-71.4,77.01],[-68.78,77.32],[-66.76,77.38],[-71.04,77.64],[-73.3,78.04],[-73.16,78.43],[-69.37,78.91],[-65.71,79.39],[-65.32,79.76],[-68.02,80.12],[-67.15,80.52],[-63.69,81.21],[-62.23,81.32],[-62.65,81.77],[-60.28,82.03],[-57.21,82.19],[-54.13,82.2],[-53.04,81.89],[-50.39,82.44],[-44.52,81.66],[-46.9,82.2],[-46.76,82.63]],[[-117.13,32.54],[-115.99,32.61],[-114.72,32.72],[-114.81,32.53],[-113.3,32.04],[-111.02,31.33],[-109.03,31.34],[-108.24,31.34],[-108.24,31.75],[-106.51,31.75],[-105.04,30.64],[-104.71,30.12],[-104.46,29.57],[-103.94,29.27],[-103.11,28.97],[-102.48,29.76],[-101.66,29.78],[-100.96,29.38],[-99.52,27.54],[-99.3,26.84],[-99.02,26.37],[-98.24,26.06],[-97.53,25.84],[-97.14,25.87],[-97.53,24.99],[-97.7,24.27],[-97.78,22.93],[-97.87,22.44],[-97.7,21.9],[-97.39,21.41],[-97.19,20.64],[-95.9,18.83],[-94.84,18.56],[-94.43,18.14],[-91.41,18.88],[-90.77,19.28],[-90.28,21.0],[-89.6,21.26],[-88.54,21.49],[-87.66,21.46],[-87.05,21.54],[-86.81,21.33],[-86.85,20.85],[-87.38,20.26],[-87.62,19.65],[-87.44,19.47],[-87.59,19.04],[-87.84,18.26],[-88.09,18.52],[-88.3,18.5],[-88.49,18.49],[-88.85,17.88],[-89.03,18.0],[-89.15,17.96],[-89.14,17.81],[-90.07,17.82],[-91.0,17.82],[-91.0,17.25],[-91.45,17.25],[-90.44,16.41],[-90.46,16.07],[-91.75,16.07],[-92.23,15.25],[-92.09,15.06],[-92.2,14.83],[-92.23,14.54],[-93.36,15.62],[-93.88,15.94],[-94.69,16.2],[-96.56,15.65],[-100.83,17.17],[-101.67,17.65],[-101.92,17.92],[-102.48,17.98],[-103.5,18.29],[-103.92,18.75],[-104.99,19.32],[-105.49,19.95],[-105.73,20.43],[-105.4,20.53],[-105.5,20.82],[-105.27,21.08],[-105.27,21.42],[-106.03,22.77],[-108.4,25.17],[-109.26,25.58],[-109.44,25.82],[-109.29,26.44],[-109.8,26.68],[-110.39,27.16],[-110.64,27.86],[-111.18,27.94],[-111.76,28.47],[-112.23,28.95],[-113.16,30.79],[-113.15,31.17],[-114.78,31.8],[-114.94,31.39],[-114.77,30.91],[-114.67,30.16],[-113.27,28.75],[-113.14,28.41],[-112.96,28.43],[-112.76,27.78],[-111.62,26.66],[-110.71,24.83],[-110.66,24.3],[-110.17,24.27],[-109.77,23.81],[-109.41,23.36],[-110.03,22.82],[-110.3,23.43],[-112.18,24.74],[-112.15,25.47],[-112.3,26.01],[-112.78,26.32],[-113.46,26.77],[-113.6,26.64],[-113.85,26.9],[-114.47,27.14],[-115.06,27.72],[-114.98,27.8],[-114.57,27.74],[-114.2,28.12],[-114.16,28.57],[-114.93,29.28],[-115.52,29.56],[-117.13,32.54]],[[-53.37,-33.77],[-53.65,-33.2],[-53.21,-32.73],[-53.79,-32.05],[-54.57,-31.49],[-55.6,-30.85],[-55.97,-30.88],[-56.98,-30.11],[-57.63,-30.22],[-56.29,-28.85],[-55.16,-27.88],[-54.49,-27.47],[-53.65,-26.92],[-53.63,-26.12],[-54.13,-25.55],[-54.63,-25.74],[-54.29,-24.02],[-54.65,-23.84],[-55.03,-24.0],[-55.4,-23.96],[-55.8,-22.36],[-56.47,-22.09],[-56.88,-22.28],[-57.94,-22.09],[-57.87,-20.73],[-58.17,-20.18],[-57.85,-19.97],[-57.95,-19.4],[-57.68,-18.96],[-57.5,-18.17],[-57.73,-17.55],[-58.28,-17.27],[-58.39,-16.88],[-58.24,-16.3],[-60.16,-16.26],[-60.54,-15.09],[-60.25,-15.08],[-60.5,-13.78],[-61.08,-13.48],[-61.71,-13.49],[-62.13,-13.2],[-62.8,-13.0],[-63.2,-12.63],[-64.32,-12.46],[-65.4,-11.57],[-65.34,-9.76],[-66.65,-9.93],[-67.17,-10.31],[-68.05,-10.71],[-68.27,-11.01],[-70.55,-11.01],[-70.48,-9.49],[-71.3,-10.08],[-72.18,-10.05],[-72.56,-9.52],[-73.23,-9.46],[-73.02,-9.03],[-73.57,-8.42],[-73.99,-7.52],[-73.72,-7.34],[-73.72,-6.92],[-73.12,-6.63],[-73.22,-6.09],[-72.96,-5.74],[-72.89,-5.27],[-70.79,-4.25],[-69.89,-4.3],[-69.44,-1.56],[-69.42,-1.12],[-69.58,-0.55],[-70.02,-0.19],[-70.02,0.54],[-69.45,0.71],[-69.25,0.6],[-69.22,0.99],[-69.8,1.09],[-69.82,1.71],[-67.87,1.69],[-67.54,2.04],[-67.26,1.72],[-67.07,1.13],[-66.88,1.25],[-66.33,0.72],[-65.55,0.79],[-65.35,1.1],[-64.61,1.33],[-64.2,1.49],[-64.08,1.92],[-63.37,2.2],[-63.42,2.41],[-64.27,2.5],[-64.41,3.13],[-64.37,3.8],[-64.82,4.06],[-64.63,4.15],[-63.89,4.02],[-63.09,3.77],[-62.8,4.01],[-62.09,4.16],[-60.97,4.54],[-60.6,4.92],[-60.73,5.2],[-60.21,5.24],[-59.98,5.01],[-60.11,4.57],[-59.77,4.42],[-59.54,3.96],[-59.82,3.61],[-59.97,2.76],[-59.72,2.25],[-59.65,1.79],[-59.03,1.32],[-58.54,1.27],[-57.34,1.95],[-56.0,1.82],[-55.97,2.51],[-55.57,2.42],[-55.1,2.52],[-54.52,2.31],[-54.09,2.11],[-53.78,2.38],[-53.55,2.33],[-53.42,2.05],[-52.94,2.12],[-52.56,2.5],[-52.25,3.24],[-51.66,4.16],[-51.32,4.2],[-51.07,3.65],[-50.51,1.9],[-49.97,1.74],[-49.95,1.05],[-50.7,0.22],[-50.39,-0.08],[-48.62,-0.24],[-48.58,-1.24],[-47.82,-0.58],[-46.57,-0.94],[-44.91,-1.55],[-44.42,-2.14],[-44.58,-2.69],[-43.42,-2.38],[-41.47,-2.91],[-39.98,-2.87],[-38.5,-3.7],[-37.22,-4.82],[-36.45,-5.11],[-35.6,-5.15],[-35.24,-5.46],[-34.9,-6.74],[-34.73,-7.34],[-35.13,-9.0],[-35.64,-9.65],[-37.05,-11.04],[-37.68,-12.17],[-38.42,-13.04],[-38.67,-13.06],[-38.95,-13.79],[-38.88,-15.67],[-39.16,-17.21],[-39.27,-17.87],[-39.58,-18.26],[-39.76,-19.6],[-40.77,-20.9],[-40.94,-21.94],[-41.75,-22.37],[-41.99,-22.97],[-43.07,-22.97],[-44.65,-23.35],[-45.35,-23.8],[-46.47,-24.09],[-47.65,-24.89],[-48.5,-25.88],[-48.64,-26.62],[-48.47,-27.18],[-48.66,-28.19],[-48.89,-28.67],[-49.59,-29.22],[-50.7,-30.98],[-51.58,-31.78],[-52.26,-32.25],[-52.71,-33.2],[-53.37,-33.77]],[[-69.53,-10.95],[-68.79,-11.04],[-68.27,-11.01],[-68.05,-10.71],[-67.17,-10.31],[-66.65,-9.93],[-65.34,-9.76],[-65.4,-11.57],[-64.32,-12.46],[-63.2,-12.63],[-62.8,-13.0],[-62.13,-13.2],[-61.71,-13.49],[-61.08,-13.48],[-60.5,-13.78],[-60.25,-15.08],[-60.54,-15.09],[-60.16,-16.26],[-58.24,-16.3],[-58.39,-16.88],[-58.28,-17.27],[-57.73,-17.55],[-57.5,-18.17],[-57.68,-18.96],[-57.95,-19.4],[-57.85,-19.97],[-58.17,-20.18],[-58.18,-19.87],[-59.12,-19.36],[-60.04,-19.34],[-61.79,-19.63],[-62.27,-20.51],[-62.29,-21.05],[-62.69,-22.25],[-62.85,-22.03],[-63.99,-21.99],[-64.38,-22.8],[-64.96,-22.08],[-66.27,-21.83],[-67.11,-22.74],[-67.83,-22.87],[-68.22,-21.49],[-68.76,-20.37],[-68.44,-19.41],[-68.97,-18.98],[-69.1,-18.26],[-69.59,-17.58],[-68.96,-16.5],[-69.39,-15.66],[-69.16,-15.32],[-69.34,-14.95],[-68.95,-14.45],[-68.93,-13.6],[-68.88,-12.9],[-68.67,-12.56],[-69.53,-10.95]],[[-69.89,-4.3],[-70.79,-4.25],[-72.89,-5.27],[-72.96,-5.74],[-73.22,-6.09],[-73.12,-6.63],[-73.72,-6.92],[-73.72,-7.34],[-73.99,-7.52],[-73.57,-8.42],[-73.02,-9.03],[-73.23,-9.46],[-72.56,-9.52],[-72.18,-10.05],[-71.3,-10.08],[-70.48,-9.49],[-70.55,-11.01],[-70.09,-11.12],[-69.53,-10.95],[-68.67,-12.56],[-68.88,-12.9],[-68.93,-13.6],[-68.95,-14.45],[-69.34,-14.95],[-69.16,-15.32],[-69.39,-15.66],[-68.96,-16.5],[-69.59,-17.58],[-69.86,-18.09],[-70.37,-18.35],[-71.38,-17.77],[-71.46,-17.36],[-73.44,-16.36],[-75.24,-15.27],[-76.01,-14.65],[-76.42,-13.82],[-76.26,-13.54],[-79.76,-7.19],[-80.54,-6.54],[-81.25,-6.14],[-80.93,-5.69],[-81.41,-4.74],[-81.1,-4.04],[-80.3,-3.4],[-80.18,-3.82],[-80.47,-4.06],[-80.44,-4.43],[-80.03,-4.35],[-79.62,-4.45],[-79.21,-4.96],[-78.64,-4.55],[-78.45,-3.87],[-77.84,-3.0],[-76.64,-2.61],[-75.54,-1.56],[-75.23,-0.91],[-75.37,-0.15],[-75.11,-0.06],[-73.66,-1.26],[-73.07,-2.31],[-72.33,-2.43],[-71.77,-2.17],[-71.41,-2.34],[-70.81,-2.26],[-70.05,-2.73],[-70.69,-3.74],[-70.39,-3.77],[-69.89,-4.3]],[[-66.88,1.25],[-67.07,1.13],[-67.26,1.72],[-67.54,2.04],[-67.87,1.69],[-69.82,1.71],[-69.8,1.09],[-69.22,0.99],[-69.25,0.6],[-69.45,0.71],[-70.02,0.54],[-70.02,-0.19],[-69.58,-0.55],[-69.42,-1.12],[-69.44,-1.56],[-69.89,-4.3],[-70.39,-3.77],[-70.69,-3.74],[-70.05,-2.73],[-70.81,-2.26],[-71.41,-2.34],[-71.77,-2.17],[-72.33,-2.43],[-73.07,-2.31],[-73.66,-1.26],[-75.11,-0.06],[-75.37,-0.15],[-75.8,0.08],[-76.29,0.42],[-76.58,0.26],[-77.42,0.4],[-77.67,0.83],[-77.86,0.81],[-78.86,1.38],[-78.99,1.69],[-78.62,1.77],[-78.66,2.27],[-78.43,2.63],[-77.93,2.7],[-77.51,3.33],[-77.13,3.85],[-77.5,4.09],[-77.31,4.67],[-77.53,5.58],[-77.32,5.85],[-77.48,6.69],[-77.88,7.22],[-77.75,7.71],[-77.43,7.64],[-77.24,7.94],[-77.47,8.52],[-77.35,8.67],[-76.84,8.64],[-76.09,9.34],[-75.67,9.44],[-75.66,9.77],[-75.48,10.62],[-74.91,11.08],[-74.28,11.1],[-74.2,11.31],[-73.41,11.23],[-71.75,12.44],[-71.4,12.38],[-71.14,12.11],[-71.33,11.78],[-71.97,11.61],[-72.91,10.45],[-73.03,9.74],[-73.3,9.15],[-72.79,9.09],[-72.66,8.63],[-72.44,8.41],[-72.44,7.42],[-72.2,7.34],[-71.96,6.99],[-70.67,7.09],[-70.09,6.96],[-69.39,6.1],[-67.7,6.27],[-67.34,6.1],[-67.52,5.56],[-67.74,5.22],[-67.82,4.5],[-67.3,3.32],[-67.81,2.82],[-67.45,2.6],[-67.18,2.25],[-66.88,1.25]],[[-77.35,8.67],[-77.47,8.52],[-77.24,7.94],[-77.43,7.64],[-77.75,7.71],[-77.88,7.22],[-78.21,7.51],[-78.43,8.05],[-78.18,8.32],[-79.12,9.0],[-79.56,8.93],[-79.76,8.58],[-80.16,8.33],[-80.38,8.3],[-80.48,8.09],[-80.0,7.55],[-80.28,7.42],[-80.42,7.27],[-80.89,7.22],[-81.06,7.82],[-81.19,7.65],[-81.52,7.71],[-81.72,8.11],[-82.13,8.18],[-82.39,8.29],[-82.82,8.29],[-82.85,8.07],[-82.97,8.23],[-82.72,8.93],[-82.93,9.07],[-82.93,9.48],[-82.55,9.57],[-82.19,9.21],[-82.21,9.0],[-81.81,8.95],[-81.71,9.03],[-81.44,8.79],[-79.91,9.31],[-79.57,9.61],[-79.02,9.55],[-78.06,9.25],[-77.73,8.95],[-77.35,8.67]],[[-82.55,9.57],[-82.93,9.48],[-82.93,9.07],[-82.72,8.93],[-82.97,8.23],[-83.51,8.45],[-83.71,8.66],[-83.6,8.83],[-83.63,9.05],[-84.65,9.62],[-84.71,9.91],[-84.98,10.09],[-84.91,9.8],[-85.11,9.56],[-85.8,10.13],[-85.79,10.44],[-85.66,10.75],[-85.94,10.9],[-85.71,11.09],[-85.56,11.22],[-84.9,10.95],[-84.67,11.08],[-84.36,11.0],[-84.19,10.79],[-83.9,10.73],[-83.66,10.94],[-83.4,10.4],[-83.02,9.99],[-82.55,9.57]],[[-83.66,10.94],[-83.9,10.73],[-84.67,11.08],[-84.9,10.95],[-85.56,11.22],[-85.71,11.09],[-87.67,12.91],[-87.56,13.06],[-87.39,12.91],[-87.32,12.98],[-87.01,13.03],[-86.88,13.25],[-86.73,13.26],[-86.76,13.75],[-86.52,13.78],[-86.31,13.77],[-86.1,14.04],[-85.8,13.84],[-85.17,14.35],[-84.92,14.79],[-84.45,14.62],[-83.15,15.0],[-83.23,14.9],[-83.28,14.68],[-83.18,14.31],[-83.41,13.97],[-83.52,13.57],[-83.47,12.42],[-83.86,11.37],[-83.81,11.1],[-83.66,10.94]],[[-83.15,15.0],[-84.45,14.62],[-84.92,14.79],[-85.8,13.84],[-86.1,14.04],[-86.31,13.77],[-86.52,13.78],[-86.76,13.75],[-86.73,13.26],[-86.88,13.25],[-87.01,13.03],[-87.32,12.98],[-87.49,13.3],[-87.79,13.38],[-87.72,13.79],[-87.86,13.89],[-88.07,13.96],[-88.5,13.85],[-89.35,14.42],[-89.15,14.68],[-89.23,14.87],[-87.9,15.86],[-86.9,15.76],[-86.0,16.01],[-84.98,16.0],[-84.53,15.86],[-84.37,15.84],[-83.15,15.0]],[[-89.35,14.42],[-88.5,13.85],[-88.07,13.96],[-87.86,13.89],[-87.72,13.79],[-87.79,13.38],[-87.9,13.15],[-88.48,13.16],[-90.1,13.74],[-89.35,14.42]],[[-92.23,14.54],[-92.2,14.83],[-92.09,15.06],[-92.23,15.25],[-91.75,16.07],[-90.46,16.07],[-90.44,16.41],[-91.45,17.25],[-91.0,17.25],[-91.0,17.82],[-90.07,17.82],[-89.14,17.81],[-89.15,17.02],[-89.23,15.89],[-88.93,15.89],[-88.23,15.73],[-88.68,15.35],[-89.15,15.07],[-89.23,14.87],[-89.15,14.68],[-90.1,13.74],[-90.61,13.91],[-91.23,13.93],[-91.69,14.13],[-92.23,14.54]],[[-89.14,17.81],[-89.15,17.96],[-89.03,18.0],[-88.85,17.88],[-88.49,18.49],[-88.3,18.5],[-88.3,18.35],[-88.11,18.35],[-88.2,17.49],[-88.36,16.53],[-88.93,15.89],[-89.23,15.89],[-89.15,17.02],[-89.14,17.81]],[[-60.73,5.2],[-60.6,4.92],[-60.97,4.54],[-62.09,4.16],[-62.8,4.01],[-63.09,3.77],[-63.89,4.02],[-64.63,4.15],[-64.82,4.06],[-64.37,3.8],[-64.41,3.13],[-64.27,2.5],[-63.42,2.41],[-63.37,2.2],[-64.08,1.92],[-64.2,1.49],[-64.61,1.33],[-65.35,1.1],[-65.55,0.79],[-66.33,0.72],[-66.88,1.25],[-67.18,2.25],[-67.45,2.6],[-67.81,2.82],[-67.3,3.32],[-67.82,4.5],[-67.74,5.22],[-67.52,5.56],[-67.34,6.1],[-67.7,6.27],[-69.39,6.1],[-70.09,6.96],[-70.67,7.09],[-71.96,6.99],[-72.2,7.34],[-72.44,7.42],[-72.44,8.41],[-72.66,8.63],[-72.79,9.09],[-73.3,9.15],[-73.03,9.74],[-72.91,10.45],[-71.97,11.61],[-71.33,11.78],[-71.36,11.54],[-71.95,11.42],[-71.62,10.97],[-71.63,10.45],[-72.07,9.87],[-71.7,9.07],[-71.26,9.14],[-71.04,9.86],[-71.35,10.21],[-71.4,10.97],[-70.16,11.38],[-70.29,11.85],[-69.94,12.16],[-69.58,11.46],[-68.88,11.44],[-68.23,10.89],[-68.19,10.55],[-67.3,10.55],[-66.23,10.65],[-65.66,10.2],[-64.89,10.08],[-64.33,10.39],[-64.32,10.64],[-63.08,10.7],[-61.88,10.72],[-62.73,10.42],[-62.39,9.95],[-61.59,9.87],[-60.83,9.38],[-60.67,8.58],[-60.15,8.6],[-59.76,8.37],[-60.55,7.78],[-60.64,7.42],[-60.3,7.04],[-60.54,6.86],[-61.16,6.7],[-61.14,6.23],[-61.41,5.96],[-60.73,5.2]],[[-56.54,1.9],[-56.78,1.86],[-57.34,1.95],[-58.54,1.27],[-59.03,1.32],[-59.65,1.79],[-59.72,2.25],[-59.97,2.76],[-59.82,3.61],[-59.54,3.96],[-59.77,4.42],[-60.11,4.57],[-59.98,5.01],[-60.21,5.24],[-60.73,5.2],[-61.41,5.96],[-61.14,6.23],[-61.16,6.7],[-60.54,6.86],[-60.3,7.04],[-60.64,7.42],[-60.55,7.78],[-59.76,8.37],[-59.1,8.0],[-58.48,7.35],[-58.45,6.83],[-58.08,6.81],[-57.54,6.32],[-57.15,5.97],[-57.31,5.07],[-57.91,4.81],[-57.86,4.58],[-58.04,4.06],[-57.6,3.33],[-57.28,3.33],[-57.15,2.77],[-56.54,1.9]],[[-54.52,2.31],[-55.1,2.52],[-55.57,2.42],[-55.97,2.51],[-56.0,1.82],[-56.54,1.9],[-57.15,2.77],[-57.28,3.33],[-57.6,3.33],[-58.04,4.06],[-57.86,4.58],[-57.91,4.81],[-57.31,5.07],[-57.15,5.97],[-55.95,5.77],[-55.84,5.95],[-55.03,6.03],[-53.96,5.76],[-54.48,4.9],[-54.4,4.21],[-54.01,3.62],[-54.52,2.31]],[[-51.66,4.16],[-52.25,3.24],[-52.56,2.5],[-52.94,2.12],[-53.42,2.05],[-53.55,2.33],[-53.78,2.38],[-54.09,2.11],[-54.52,2.31],[-54.27,2.73],[-54.18,3.19],[-54.01,3.62],[-54.4,4.21],[-54.48,4.9],[-53.96,5.76],[-53.62,5.65],[-52.88,5.41],[-51.82,4.57],[-51.66,4.16]],[[-75.37,-0.15],[-75.23,-0.91],[-75.54,-1.56],[-76.64,-2.61],[-77.84,-3.0],[-78.45,-3.87],[-78.64,-4.55],[-79.21,-4.96],[-79.62,-4.45],[-80.03,-4.35],[-80.44,-4.43],[-80.47,-4.06],[-80.18,-3.82],[-80.3,-3.4],[-79.77,-2.66],[-79.99,-2.22],[-80.37,-2.69],[-80.97,-2.25],[-80.76,-1.97],[-80.93,-1.06],[-80.58,-0.91],[-80.4,-0.28],[-80.02,0.36],[-80.09,0.77],[-79.54,0.98],[-78.86,1.38],[-77.86,0.81],[-77.67,0.83],[-77.42,0.4],[-76.58,0.26],[-76.29,0.42],[-75.8,0.08],[-75.37,-0.15]],[[-66.28,18.51],[-65.77,18.43],[-65.59,18.23],[-65.85,17.98],[-66.6,17.98],[-67.18,17.95],[-67.24,18.37],[-67.1,18.52],[-66.28,18.51]],[[-77.57,18.49],[-76.9,18.4],[-76.37,18.16],[-76.2,17.89],[-76.9,17.87],[-77.21,17.7],[-77.77,17.86],[-78.34,18.23],[-78.22,18.45],[-77.8,18.52],[-77.57,18.49]],[[-82.27,23.19],[-81.4,23.12],[-80.62,23.11],[-79.68,22.77],[-79.28,22.4],[-78.35,22.51],[-76.52,21.21],[-76.19,21.22],[-75.6,21.02],[-75.67,20.74],[-74.93,20.69],[-74.18,20.28],[-74.3,20.05],[-74.96,19.92],[-77.76,19.86],[-77.09,20.41],[-77.49,20.67],[-78.14,20.74],[-78.48,21.03],[-78.72,21.6],[-79.28,21.56],[-82.17,22.39],[-81.8,22.64],[-82.78,22.69],[-83.49,22.17],[-83.91,22.15],[-84.05,21.91],[-84.55,21.8],[-84.97,21.9],[-83.78,22.79],[-82.27,23.19]],[[-58.17,-20.18],[-57.87,-20.73],[-57.94,-22.09],[-56.88,-22.28],[-56.47,-22.09],[-55.8,-22.36],[-55.4,-23.96],[-55.03,-24.0],[-54.65,-23.84],[-54.29,-24.02],[-54.79,-26.62],[-55.7,-27.39],[-56.49,-27.55],[-57.61,-27.4],[-58.62,-27.12],[-57.63,-25.6],[-57.78,-25.16],[-58.81,-24.77],[-60.03,-24.03],[-60.85,-23.88],[-62.69,-22.25],[-62.29,-21.05],[-62.27,-20.51],[-61.79,-19.63],[-60.04,-19.34],[-59.12,-19.36],[-58.18,-19.87],[-58.17,-20.18]],[[-61.68,10.76],[-61.1,10.89],[-60.9,10.86],[-60.94,10.11],[-61.77,10],[-61.95,10.09],[-61.66,10.37],[-61.68,10.76]]];
const departureRouteWeekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let departureRouteDay = 0;
let departureRouteDestination = '';
let departureRouteSignature = '';
let departureRoutePlanes = [];

// Native booking/tracking links and a persistent SVG viewport for each airport/day.
const departureRouteViews = new Map();
function departureFlightAwareURL(flight) {
  const number = String(flight.flightNumber).replace(/^F9\s*/i,'');
  return /^\d+$/.test(number) ? 'https://www.flightaware.com/live/flight/FFT' + Number(number) : null;
}
function departureRouteLink(href, label, className) {
  return departureRouteSVG('a', {href, target:'_blank', rel:'noopener noreferrer',
    'aria-label':label, class:className||'route-booking-link'});
}
function installDepartureRouteNavigation(svg, host, key) {
  let view = {...(departureRouteViews.get(key)||{x:0,y:0,width:1000,height:520})};
  const toolbar = departureText('div','departure-route-map-controls','');
  toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Route map zoom controls');
  const level = departureText('span','departure-route-zoom-level','');
  const clamp = () => {
    view.width = Math.max(1000/6,Math.min(1000,view.width));view.height=view.width*.52;
    view.x=Math.max(0,Math.min(1000-view.width,view.x));view.y=Math.max(0,Math.min(520-view.height,view.y));
  };
  const apply = () => {
    clamp();svg.setAttribute('viewBox',`${view.x} ${view.y} ${view.width} ${view.height}`);
    departureRouteViews.set(key,{...view});
    if(departureRouteViews.size>12)departureRouteViews.delete(departureRouteViews.keys().next().value);
    level.textContent=Math.round(1000/view.width*100)+'%';
    minus.disabled=view.width>=1000;plus.disabled=view.width<=1000/6;
  };
  const point = (x,y,base=view) => {
    const rect=svg.getBoundingClientRect();
    return {x:base.x+(x-rect.left)/rect.width*base.width,y:base.y+(y-rect.top)/rect.height*base.height};
  };
  const zoom = (factor,clientX,clientY) => {
    const rect=svg.getBoundingClientRect();
    const x=clientX??rect.left+rect.width/2,y=clientY??rect.top+rect.height/2;
    const anchor=point(x,y),next=Math.max(1000/6,Math.min(1000,view.width/factor));
    view={x:anchor.x-(x-rect.left)/rect.width*next,y:anchor.y-(y-rect.top)/rect.height*next*.52,width:next,height:next*.52};apply();
  };
  const control = (text,label,action) => {const button=departureText('button','departure-route-map-control',text);button.type='button';button.setAttribute('aria-label',label);button.onclick=action;toolbar.append(button);return button;};
  const minus=control('-','Zoom out',()=>zoom(1/1.35));
  const plus=control('+','Zoom in',()=>zoom(1.35));
  control('Reset','Reset map to show all routes',()=>{view={x:0,y:0,width:1000,height:520};apply();});toolbar.append(level);host.append(toolbar);
  svg.classList.add('route-map-interactive');svg.setAttribute('tabindex','0');svg.setAttribute('role','group');
  svg.setAttribute('aria-label','Interactive departure routes. Drag to pan, scroll or pinch to zoom. Use arrow keys to pan, plus or minus to zoom, and zero to reset. Destination links open booking; airplane links open FlightAware.');
  svg.addEventListener('wheel',event=>{event.preventDefault();zoom(Math.exp(-Math.max(-200,Math.min(200,event.deltaY))*.002),event.clientX,event.clientY);},{passive:false});
  svg.addEventListener('keydown',event=>{
    if(event.target!==svg)return;
    if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))event.preventDefault();else return;
    if(event.key==='+'||event.key==='=')zoom(1.35);else if(event.key==='-')zoom(1/1.35);
    else if(event.key==='0'){view={x:0,y:0,width:1000,height:520};apply();}
    else {view.x+=(event.key==='ArrowLeft'?-1:event.key==='ArrowRight'?1:0)*view.width*.1;view.y+=(event.key==='ArrowUp'?-1:event.key==='ArrowDown'?1:0)*view.height*.1;apply();}
  });
  const pointers=new Map();let gesture=null,suppressClickUntil=0;
  const begin = () => {
    const values=[...pointers.values()];
    gesture=values.length?{view:{...view},points:values.map(p=>({...p})),moved:false}:null;
  };
  svg.addEventListener('pointerdown',event=>{if(event.button!==0)return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});begin();});
  svg.addEventListener('pointermove',event=>{
    if(!pointers.has(event.pointerId)||!gesture)return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const values=[...pointers.values()],start=gesture.points;
    if(values.length!==start.length){begin();return;}
    const dx=values[0].x-start[0].x,dy=values[0].y-start[0].y;
    if(!gesture.moved&&values.length===1&&Math.hypot(dx,dy)<5)return;
    gesture.moved=true;suppressClickUntil=Date.now()+500;svg.classList.add('is-dragging');
    try{svg.setPointerCapture(event.pointerId);}catch(_){}
    event.preventDefault();const rect=svg.getBoundingClientRect(),base=gesture.view;
    if(values.length>1) {
      const distance=Math.hypot(values[1].x-values[0].x,values[1].y-values[0].y);
      const initial=Math.max(1,Math.hypot(start[1].x-start[0].x,start[1].y-start[0].y));
      const center={x:(values[0].x+values[1].x)/2,y:(values[0].y+values[1].y)/2};
      const anchor=point((start[0].x+start[1].x)/2,(start[0].y+start[1].y)/2,base);
      const width=Math.max(1000/6,Math.min(1000,base.width*initial/Math.max(1,distance)));
      view={x:anchor.x-(center.x-rect.left)/rect.width*width,y:anchor.y-(center.y-rect.top)/rect.height*width*.52,width,height:width*.52};
    } else view={...base,x:base.x-dx/rect.width*base.width,y:base.y-dy/rect.height*base.height};
    apply();
  });
  const finish = event => {
    if(!pointers.has(event.pointerId))return;
    if(gesture?.moved)suppressClickUntil=Date.now()+500;
    pointers.delete(event.pointerId);try{svg.releasePointerCapture(event.pointerId);}catch(_){}svg.classList.remove('is-dragging');begin();
  };
  svg.addEventListener('pointerup',finish);svg.addEventListener('pointercancel',finish);
  svg.addEventListener('lostpointercapture',event=>{if(pointers.has(event.pointerId))finish(event);});
  svg.addEventListener('click',event=>{if(Date.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}},{capture:true});
  svg.addEventListener('dragstart',event=>event.preventDefault());apply();
}

function departureRouteSVG(tag, attributes = {}, text) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
  if (text !== undefined) node.textContent = text;
  return node;
}

// Arrival clocks are destination-local. Resolve the date across overnight flights/time zones.
function departureRouteArrival(time, flight, destination, anchor = flight.instant) {
  if (!time || !destination) return null;
  if (/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(String(time))) {
    const stamp = Date.parse(time);
    return Number.isFinite(stamp) && stamp > anchor && stamp - anchor <= 18 * 3600000 ? stamp : null;
  }
  const minutes = departureMinutes(time);
  if (minutes === null) return null;
  const local = bookingParts(new Date(anchor), destination.timezone);
  const candidates = [-1, 0, 1, 2].map(offset => departureInstant(bookingDate(local, offset), minutes, destination.timezone));
  return candidates.find(stamp => stamp > anchor && stamp - anchor <= 18 * 3600000) ?? null;
}

function departureRouteTiming(airport, flight, now) {
  const destination = airportByCode(flight.destination);
  const entry = boardStatuses.get(boardStatusKey(airport, flight));
  const data = entry?.data;
  const code = String(data?.statusCode || '').toLowerCase();
  if (code === 'cancelled' || code === 'arrived' || data?.arrival?.actual) return {airborne: false, label: code === 'cancelled' ? 'Cancelled' : 'Arrived'};
  const confirmed = !!data?.departure?.actual || ['departed','in_air','in-air','airborne'].includes(code);
  const delayed = boardStatusDelayed(entry, flight, airport);
  if (delayed && !confirmed) return {airborne: false, label: 'Delayed \u00b7 awaiting departure'};
  const scheduledArrival = departureRouteArrival(flight.arrivalTime || data?.arrival?.scheduled, flight, destination);
  let start = flight.instant;
  const departureTime = data?.departure?.actual || data?.departure?.estimated;
  if (departureTime) {
    const iso = /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(String(departureTime));
    const stamp = iso ? Date.parse(departureTime) : boardStatusTime(departureTime, flight, airport);
    if (Number.isFinite(stamp)) start = stamp;
  }
  let end = departureRouteArrival(data?.arrival?.estimated, flight, destination, start);
  if (end === null && scheduledArrival !== null) end = scheduledArrival + Math.max(0, start - flight.instant);
  const airborne = end !== null && now >= start && now < end;
  return {start, end, confirmed, airborne, progress: airborne ? (now - start) / (end - start) : 0,
    label: airborne ? (confirmed ? 'In air \u00b7 estimated position' : 'Estimated in air \u00b7 schedule timing')
      : now < start ? 'Scheduled' : end === null ? 'Arrival time unavailable' : 'Estimated flight complete'};
}

// Great-circle interpolation keeps the aircraft on the same geographic route as its line.
function departureRoutePoint(origin, destination, progress) {
  const rad = Math.PI / 180;
  const vector = a => [Math.cos(a.lat * rad) * Math.cos(a.lon * rad), Math.cos(a.lat * rad) * Math.sin(a.lon * rad), Math.sin(a.lat * rad)];
  const a = vector(origin), b = vector(destination);
  const angle = Math.acos(Math.max(-1, Math.min(1, a.reduce((sum, value, i) => sum + value * b[i], 0))));
  if (angle < 1e-8) return [origin.lon, origin.lat];
  const w1 = Math.sin((1 - progress) * angle) / Math.sin(angle), w2 = Math.sin(progress * angle) / Math.sin(angle);
  const v = a.map((value, i) => value * w1 + b[i] * w2);
  return [Math.atan2(v[1], v[0]) / rad, Math.atan2(v[2], Math.hypot(v[0], v[1])) / rad];
}

function updateDepartureRoutePlanes(now = Date.now()) {
  if (!departureState || document.hidden) return;
  for (const plane of departureRoutePlanes) {
    const timing = departureRouteTiming(departureState.airport, plane.flight, now);
    plane.node.style.display = timing.airborne ? '' : 'none';
    if (!timing.airborne) continue;
    const point = plane.project(departureRoutePoint(departureState.airport, plane.destination, timing.progress));
    const next = plane.project(departureRoutePoint(departureState.airport, plane.destination, Math.min(1, timing.progress + .001)));
    const rotation = Math.atan2(next[1] - point[1], next[0] - point[0]) * 180 / Math.PI;
    plane.node.setAttribute('transform', `translate(${point[0]} ${point[1]}) rotate(${rotation})`);
    plane.title.textContent = `F9${plane.flight.flightNumber} to ${plane.destination.code} \u00b7 ${timing.label} \u00b7 ${Math.round(timing.progress * 100)}% of estimated flight time`;
  }
}

function renderDepartureRouteMap() {
  const host = document.getElementById('departureRouteCanvas');
  const summary = document.getElementById('departureRouteSummary');
  const details = document.getElementById('departureRouteDetails');
  const tabs = document.getElementById('departureRouteTabs');
  if (!host || !summary || !details || !tabs) return;
  if (!departureState) {
    departureRouteSignature = ''; departureRoutePlanes = [];
    host.replaceChildren(departureText('p', 'departure-route-empty', 'Loading departure routes\u2026'));
    details.replaceChildren(); summary.textContent = 'Loading your airport schedule\u2026';
    return;
  }
  const state = departureState, airport = state.airport, now = Date.now();
  const today = bookingDate(bookingParts(new Date(now), airport.timezone), 0);
  const date = bookingDate(today, departureRouteDay), key = bookingKey(date);
  const flights = state.flights.filter(flight => bookingKey(flight.date) === key);
  const signature = JSON.stringify([airport.code, key, state.loading, [...state.loadedKeys], [...state.missingKeys], departureRouteDestination,
    flights.map(f => [f.destination, f.flightNumber, f.instant, f.arrivalTime, boardStatuses.get(boardStatusKey(airport,f))?.data,
      departureRouteTiming(airport,f,now).label])]);
  if (signature === departureRouteSignature) { updateDepartureRoutePlanes(now); return; }
  departureRouteSignature = signature;
  // Keep the focused native control during the one-second board refresh.
  for (let offset = 0; offset < 3; offset++) {
    let button = tabs.children[offset];
    if (!button) {
      button = departureText('button', 'departure-route-tab', ''); button.type = 'button';
      button.onclick = () => { departureRouteDay = offset; departureRouteDestination = ''; renderDepartureRouteMap(); };
      tabs.append(button);
    }
    const day = bookingDate(today, offset), label = offset < 2 ? ['Today','Tomorrow'][offset] : departureRouteWeekdays[day.weekday];
    button.textContent = label;
    button.setAttribute('aria-pressed', String(offset === departureRouteDay));
    button.setAttribute('aria-label', `${label}, ${bookingKey(day)} departures`);
  }
  const focusedDestination = details.contains(document.activeElement) ? document.activeElement.dataset.routeDestination : undefined;
  const focusedRouteTag = document.activeElement?.tagName;
  host.replaceChildren(); details.replaceChildren(); departureRoutePlanes = [];
  const groups = new Map();
  for (const flight of flights) {
    if (!groups.has(flight.destination)) groups.set(flight.destination, []);
    groups.get(flight.destination).push(flight);
  }
  const targets = [...groups.keys()].map(airportByCode).filter(Boolean).sort((a,b) => a.code.localeCompare(b.code));
  const unknown = [...groups.keys()].filter(code => !airportByCode(code));
  if (departureRouteDestination && !groups.has(departureRouteDestination)) departureRouteDestination = '';
  const label = departureRouteDay < 2 ? ['Today','Tomorrow'][departureRouteDay] : departureRouteWeekdays[date.weekday];
  const airborne = departureRouteDay === 0 ? flights.filter(f => departureRouteTiming(airport,f,now).airborne).length : 0;
  summary.textContent = `${label} \u00b7 ${airport.code} \u00b7 ${flights.length} departure${flights.length === 1 ? '' : 's'} \u00b7 ${groups.size} destination${groups.size === 1 ? '' : 's'}` +
    (airborne ? ` \u00b7 ${airborne} estimated in air` : '') + (state.loading && !state.loadedKeys.has(key) ? ' \u00b7 Loading\u2026' : state.missingKeys.has(key) ? ' \u00b7 Schedule unavailable' : '') +
    (unknown.length ? ` \u00b7 Map coordinates unavailable for ${unknown.join(', ')}` : '');
  if (!targets.length) {
    host.append(departureText('p', 'departure-route-empty', state.missingKeys.has(key) ? 'This day\u2019s schedule is unavailable. Choose another day.'
      : !state.loadedKeys.has(key) && state.loading ? 'Loading this day\u2019s routes\u2026' : flights.length ? 'Coordinates are unavailable for these destinations.' : 'No nonstop departures are listed for this day.'));
  } else {
    const svg = departureRouteSVG('svg', {viewBox: '0 0 1000 520', role: 'group', 'aria-label': `Scheduled routes from ${airport.code} on ${key}. Choose a destination below to see its flights.`});
    svg.append(departureRouteSVG('title', {}, `Frontier routes from ${airport.city}`));
    // Mercator projection, fitted to this day's great-circle routes with a minimum context area.
    const mercator = lat => Math.log(Math.tan(Math.PI / 4 + Math.max(-75, Math.min(75, lat)) * Math.PI / 360)) * 180 / Math.PI;
    const wrap = lon => airport.lon + ((lon - airport.lon + 540) % 360 - 180);
    const points = [airport, ...targets].map(a => [wrap(a.lon), mercator(a.lat)]);
    for (const target of targets) for (let step = 0; step <= 32; step++) {
      const p = departureRoutePoint(airport,target,step/32); points.push([wrap(p[0]),mercator(p[1])]);
    }
    let minX = Math.min(...points.map(p=>p[0])), maxX = Math.max(...points.map(p=>p[0]));
    let minY = Math.min(...points.map(p=>p[1])), maxY = Math.max(...points.map(p=>p[1]));
    const middleX = (minX+maxX)/2, middleY=(minY+maxY)/2;
    const width = Math.max(22, maxX-minX+12), height = Math.max(16, maxY-minY+10);
    const scale = Math.min(880/width, 400/height);
    const project = p => [500 + (wrap(p[0])-middleX)*scale, 260 - (mercator(p[1])-middleY)*scale];
    const defs = departureRouteSVG('defs');
    const clip = departureRouteSVG('clipPath',{id:'departureRouteClip'});
    clip.append(departureRouteSVG('rect',{width:1000,height:520,rx:18})); defs.append(clip); svg.append(defs);
    const layers = departureRouteSVG('g',{'clip-path':'url(#departureRouteClip)'});
    layers.append(departureRouteSVG('rect',{width:1000,height:520,class:'route-ocean'}));
    for (let lon = -180; lon < 180; lon+=10) {
      const a=project([lon,-75]), b=project([lon,75]);
      layers.append(departureRouteSVG('path',{d:`M${a.join(',')}L${b.join(',')}`,class:'route-grid'}));
    }
    for (let lat=-60;lat<=70;lat+=10) {
      const y=project([airport.lon,lat])[1]; layers.append(departureRouteSVG('path',{d:`M0,${y}H1000`,class:'route-grid'}));
    }
    for (const ring of departureRouteLand) {
      const projected = ring.map(project);
      if (!projected.some(p=>p[0]>-300 && p[0]<1300 && p[1]>-300 && p[1]<820)) continue;
      layers.append(departureRouteSVG('path',{d:projected.map((p,i)=>(i?'L':'M')+p.map(n=>n.toFixed(1)).join(',')).join('')+'Z',class:'route-land'}));
    }
    for (const target of targets) {
      const path = Array.from({length:49},(_,i)=>project(departureRoutePoint(airport,target,i/48)));
      const selected = target.code===departureRouteDestination;
      const d=path.map((p,i)=>(i?'L':'M')+p.map(n=>n.toFixed(2)).join(',')).join('');
      const route=departureRouteSVG('path',{d,class:'route-line'+(selected?' is-selected':'')+(departureRouteDestination&&!selected?' is-muted':'')});
      layers.append(route);
      const hit=departureRouteSVG('path',{d,class:'route-hit'});
      hit.append(departureRouteSVG('title',{},`${target.code} \u00b7 ${target.city} \u00b7 ${groups.get(target.code).length} flights`));
      const booking=departureRouteLink(departureBookingURL(airport,{destination:target.code,date}),`Book ${airport.code} to ${target.code} on ${key}, opens in a new tab`);booking.append(hit);layers.append(booking);
    }
    const occupied = [];
    // Place origin first; avoid overlapping airport labels in dense metros.
    for (const target of [airport,...targets]) {
      const [x,y]=project([target.lon,target.lat]), origin=target.code===airport.code;
      const marker=origin?departureRouteSVG('g'):departureRouteLink(departureBookingURL(airport,{destination:target.code,date}),`Book ${airport.code} to ${target.code} on ${key}, opens in a new tab`);
      layers.append(marker);marker.append(departureRouteSVG('circle',{cx:x,cy:y,r:origin?8:6,class:origin?'route-origin':'route-airport'}));
      let box;
      const options = [[12,-24],[12,8],[-55,-24],[-55,8],[12,-48],[-55,32],[12,32],[-55,-48],[30,-10],[-73,-10]];
      for (const [dx,dy] of options) {
        const candidate={x:x+dx,y:y+dy,w:43,h:22};
        if(candidate.x<8||candidate.y<8||candidate.x+43>992||candidate.y+22>512)continue;
        if(!occupied.some(b=>candidate.x<b.x+b.w+5&&candidate.x+43+5>b.x&&candidate.y<b.y+b.h+3&&candidate.y+22+3>b.y)){box=candidate;break;}
      }
      if (!box) continue; // All destinations remain available as native buttons below.
      occupied.push(box);
      marker.append(departureRouteSVG('path',{d:`M${x},${y}L${box.x+21.5},${box.y+11}`,class:'route-leader'}));
      marker.append(departureRouteSVG('rect',{x:box.x,y:box.y,width:43,height:22,rx:6,class:origin?'route-label-box is-origin':'route-label-box'}));
      marker.append(departureRouteSVG('text',{x:box.x+21.5,y:box.y+15.5,'text-anchor':'middle',class:origin?'route-label is-origin':'route-label'},target.code));
    }
    if (departureRouteDay === 0) for (const flight of flights) {
      const destination=airportByCode(flight.destination); if(!destination)continue;
      const node=departureRouteSVG('a',{href:departureFlightAwareURL(flight),target:'_blank',rel:'noopener noreferrer','aria-label':`Track Frontier flight ${flight.flightNumber} on FlightAware, opens in a new tab`,class:'route-plane'+(departureRouteDestination&&destination.code!==departureRouteDestination?' is-muted':'')}), title=departureRouteSVG('title'); node.append(title);
      node.append(departureRouteSVG('circle',{r:14,class:'route-plane-halo'}));
      // Plane silhouette points east; rotation follows the route tangent.
      node.append(departureRouteSVG('path',{d:'M12 0 L2 -3 L-4 -11 L-7 -11 L-4 -3 L-10 -3 L-13 -6 L-15 -6 L-13 0 L-15 6 L-13 6 L-10 3 L-4 3 L-7 11 L-4 11 L2 3 Z',class:'route-plane-icon'}));
      layers.append(node); departureRoutePlanes.push({node,title,flight,destination,project});
    }
    svg.append(layers); host.append(svg); installDepartureRouteNavigation(svg,host,airport.code+":"+key); updateDepartureRoutePlanes(now);
  }
  const choices=departureText('div','departure-route-destinations','');
  const all=departureText('button','departure-route-chip','All destinations'); all.type='button';
  all.dataset.routeDestination='';
  all.setAttribute('aria-pressed',String(!departureRouteDestination));
  all.onclick=()=>{departureRouteDestination='';renderDepartureRouteMap();}; choices.append(all);
  for(const code of [...groups.keys()].sort()) {
    const button=departureText('a','departure-route-chip',`${code} \u00b7 ${groups.get(code).length}`);button.href=departureBookingURL(airport,{destination:code,date});button.target='_blank';button.rel='noopener noreferrer';
    button.dataset.routeDestination=code;
    button.setAttribute('aria-label',`Book ${airport.code} to ${code} on ${key}, opens in a new tab`);button.title=airportByCode(code)?.city||code;
    const group=departureText('span','departure-route-destination-choice','');const flightsButton=departureText('button','departure-route-chip departure-route-show-flights','Flights');flightsButton.type='button';flightsButton.setAttribute('aria-label',`Show flights to ${code}`);flightsButton.setAttribute('aria-pressed',String(code===departureRouteDestination));flightsButton.dataset.routeDestination=code;flightsButton.onclick=()=>{departureRouteDestination=code;renderDepartureRouteMap();};group.append(button,flightsButton);choices.append(group);
  }
  if (groups.size) details.append(choices);
  if (departureRouteDestination) {
    const destination=airportByCode(departureRouteDestination);
    details.append(departureText('h5','departure-route-detail-title',`${airport.code} \u2192 ${departureRouteDestination} \u00b7 ${destination?.city || departureRouteDestination}`));
    const list=departureText('div','departure-route-flight-list','');
    for(const flight of groups.get(departureRouteDestination)||[]) {
      const link=departureText('a','departure-route-flight',''); const inAir=departureRouteDay===0&&departureRouteTiming(airport,flight,now).airborne;link.href=inAir?departureFlightAwareURL(flight):departureBookingURL(airport,flight);link.target='_blank';link.rel='noopener noreferrer';
      link.append(departureText('strong','',`F9${flight.flightNumber}`),departureText('span','',`${flight.departureTime} ${airport.code} \u2192 ${flight.arrivalTime || 'Time unavailable'} ${flight.destination}`));
      if(departureRouteDay===0)link.append(departureText('span','departure-route-flight-status',departureRouteTiming(airport,flight,now).label));
      link.setAttribute('aria-label',`${inAir?'Track on FlightAware':'Book'} F9${flight.flightNumber} to ${flight.destination}, departing ${flight.departureTime}, in a new tab`);list.append(link);
    }
    details.append(list,departureText('p','departure-route-local-note','Departure and arrival clocks are local to their respective airports. Select a flight to book, or track it on FlightAware when it is in the air.'));
  }
  if(focusedDestination !== undefined) {
    const control=[...details.querySelectorAll('[data-route-destination]')].find(button=>button.dataset.routeDestination===focusedDestination&&button.tagName===focusedRouteTag);
    control?.focus({preventScroll:true});
  }
}


function renderDepartureBoard() {
  renderDepartureRouteMap();
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
    const flightCell = departureText('div', 'departure-flight', `F9${flight.flightNumber}${departureGate ? '\u00b7' + departureGate : ''}`);
    flightCell.title = `Flight F9${flight.flightNumber}${departureGate ? ' \u00b7 Departure gate ' + departureGate : ''}`;
    row.append(destination, flightCell);
    const booking = departureText('div', 'departure-booking', '');
    const live = boardStatusInfo(airport, flight, now);
    const international = departureInternational.has(airport.code) || departureInternational.has(flight.destination);
    const blackout = bookingBlackout(flight.date);
    const standard = international || now >= bookingMidnight(bookingDate(flight.date, -1), airport.timezone);
    if (live) {
      const prefix = live.booking ? (blackout ? 'Blackout' : standard ? 'Standard Window' : 'Advanced Booking') + ' \u00b7 ' : '';
      booking.append(departureText('span', 'departure-booking-status ' + live.kind, prefix + live.label));
      if (live.kind === 'boarding' || live.kind === 'gate-closed') booking.title = 'Estimated timing: boarding begins 45 minutes before scheduled departure; gate closes 20 minutes before scheduled departure.';
    } else {
    booking.append(departureText('span', `departure-booking-status ${blackout ? 'blackout' : standard ? 'standard' : 'advance'}`,
      blackout ? 'Blackout \u00b7 peak day charge may apply' : standard ? 'Standard Window' : 'Advanced Booking'));
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
  departureRouteDay = 0; departureRouteDestination = "";
  renderDepartureRouteMap();
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
    renderDepartureRouteMap();
    const routeError = document.getElementById('departureRouteCanvas');
    if (routeError) routeError.replaceChildren(departureText('p', 'departure-route-empty', 'Departure routes could not load. Please refresh to try again.'));
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


    if (airport && !airportManualSelection) {

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
      : 'Scheduled \u00b7 status unavailable';
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
const securityLastEstimates = new Map();
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
  const wrapper=document.getElementById('airportSecurityCard');if(wrapper)wrapper.hidden=true;
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
// Keep the main security view compact; alternates stay in the user's dropdown.
function securityFeaturedModels(models,data) {
  const primary=models.filter(cp=>!cp.aggregate&&cp.priority==='recommended');
  const featured=primary.slice(0,2);
  const missingLane=cp=>cp.live&&!cp.lanes.some(l=>l.type===securityLane||l.type==='combined');
  const needsAlternate=!featured.length||featured.every(cp=>securityCheckpointState(cp,data)==='closed'||missingLane(cp));
  if(needsAlternate) {
    let alternatives=models.filter(cp=>!cp.aggregate&&cp.priority==='alternate'&&!cp.guidance?.conditional&&securityCheckpointState(cp,data)==='open');
    if(data.airport==='DFW') {
      // Prefer a published open Terminal E entrance before a Skylink alternative.
      const terminalE=alternatives.filter(cp=>/\be\d+\b/i.test(cp.name||'')||/^Terminal E alternatives$/i.test(cp.name||''));
      const allKnownEClosed=models.filter(cp=>cp.priority==='recommended'||(cp.priority==='alternate'&&/\be\d+\b/i.test(cp.name||'')))
        .every(cp=>securityCheckpointState(cp,data)==='closed');
      alternatives=terminalE.length?terminalE:allKnownEClosed?alternatives:[];
    }
    if(alternatives.length) {
      if(featured.length>=2)featured.pop();
      featured.push(alternatives[0]);
    }
  }
  // Airports without curated recommendations retain a small published-information view.
  if(!featured.length&&!securityAirportGuidance[data.airport])featured.push(...models.filter(cp=>!cp.aggregate).slice(0,2));
  return new Set(featured);
}

function securityLink(label,url,className='security-source') {
  try{const u=new URL(url);if(u.protocol!=='https:')return null;
    const a=securityText('a',className,label);a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';return a;
  }catch{return null;}
}
const securityAirlineNames={F9:'Frontier',AA:'American',AC:'Air Canada',AS:'Alaska',B6:'JetBlue',DL:'Delta',WN:'Southwest',UA:'United',NK:'Spirit',G4:'Allegiant',MX:'Breeze',SY:'Sun Country',FI:'Icelandair',PD:'Porter',AM:'Aeromexico',AF:'Air France',BA:'British Airways',BW:'Caribbean',CM:'Copa',EK:'Emirates',F8:'Flair',LA:'LATAM',LH:'Lufthansa',RJ:'Royal Jordanian',TK:'Turkish',VB:'Viva',WS:'WestJet',XP:'Avelo',Y4:'Volaris'};
function securityAirlineChip(code) {
  const name=`${securityAirlineNames[code]||code} (${code})`;
  const chip=securityText('span','security-airline','');
  chip.title=name;chip.setAttribute('role','img');chip.setAttribute('aria-label',name);
  const logo=document.createElement('img');logo.src=`/images/airlines/${code.toUpperCase()}.svg`;logo.alt='';logo.width=38;logo.height=26;logo.loading='lazy';
  const fallback=securityText('span','security-airline-fallback',code);fallback.hidden=true;
  logo.addEventListener('error',()=>{logo.hidden=true;fallback.hidden=false;},{once:true});
  chip.append(logo,fallback);return chip;
}
function securityAirlines(codes,key) {
  codes=[...new Set(codes||[])].filter(c=>/^[A-Z0-9]{2}$/.test(c));
  if(!codes.length)return null;
  const first=codes.includes('F9')?'F9':codes[0],others=codes.filter(c=>c!==first);
  const wrap=securityText('div','security-airlines','');
  if(!others.length){wrap.append(securityAirlineChip(first));return wrap;}
  const details=securityText('details','security-airline-details','');details.dataset.securityKey='airlines:'+key;
  const summary=securityText('summary','','');
  const stack=securityText('span','security-airline-stack','');stack.append(securityAirlineChip(first));
  const list=securityText('span','security-airline-list','');others.forEach(code=>list.append(securityAirlineChip(code)));stack.append(list);
  const pill=securityText('span','security-airline-pill',`+${others.length}`);
  pill.title=`Show or hide ${others.length} other ${others.length===1?'airline':'airlines'}`;
  summary.append(stack,pill);details.append(summary);wrap.append(details);return wrap;
}
// Keep the last successful published waits visible during a refresh or outage.
// Snapshot display values at receipt; never relabel them as current live waits.
function securityRememberEstimate(data) {
  if (!data.available || !data.checkpoints?.some(cp => cp.lanes?.some(securityWaitCurrent))) {
    securityLastEstimates.delete(data.airport); return;
  }
  securityLastEstimates.set(data.airport, {...data, checkpoints:data.checkpoints.map(cp => ({...cp,
    lanes:(cp.lanes||[]).map(lane => ({...lane, lastEstimateDisplay:securityWaitCurrent(lane)?securityWaitDisplay(lane):null}))
  }))});
}
function securityEstimateFallback(airport, state, failureMessage) {
  const previous = securityLastEstimates.get(airport);
  return previous ? {...previous, lastEstimate:true, updateState:state, failureMessage} : null;
}
function securityVisibleWait(lane, data) {
  if (lane.status === 'closed') return null;
  if (data.lastEstimate) return lane.lastEstimateDisplay ? 'Last estimate: ' + lane.lastEstimateDisplay : null;
  return securityWaitCurrent(lane) ? securityWaitDisplay(lane) : null;
}
function securityRetryButton(airport) {
  const retry = securityText('button','security-lane-button','Retry live waits'); retry.type='button';
  retry.onclick=()=>{securityResults.delete(airport);refreshSecurity();}; return retry;
}

function securityLaneRows(box,cp,data) {
  if(cp.hours?.display)box.append(securityText('p','security-hours',`Checkpoint hours: ${cp.hours.display} \u00b7 airport local time`));
  const lanes=cp.lanes.filter(l=>l.type===securityLane||l.type==='combined');
  if(!lanes.length)box.append(securityText('p','security-note',cp.live?`${securityLabels[securityLane]||'Selected lane'} information not published for this checkpoint.`:'Live lane information unavailable.'));
  for(const l of lanes){
    const line=securityText('div','security-lane-row',''),current=securityWaitCurrent(l);
    const value=l.status==='closed'?'Closed':securityVisibleWait(l,data)|| (l.stale?'Wait temporarily unavailable':l.status==='open'?'Open \u00b7 wait not published':'Wait not published');
    line.append(securityText('span','security-lane-name',l.label||securityLabels[l.type]),securityText('strong','security-wait'+(l.status==='closed'?' is-closed':''),value));box.append(line);
    if(l.hours?.display)box.append(securityText('p','security-hours',`${l.hours.display} \u00b7 airport local time`));
    if(l.status==='closed'&&l.statusMessage)box.append(securityText('p','security-hours',l.statusMessage));
    if(Number.isFinite(l.closingInMinutes)&&l.closingInMinutes<=45&&l.status==='open')box.append(securityText('p','security-closing',`Closes in ${l.closingInMinutes} min`));
    if(!data.lastEstimate&&current&&l.timestampKind==='source')box.append(securityText('p','security-lane-updated',`Updated ${securityAge(l.updatedAt)}`));
    if(!data.lastEstimate&&current&&l.timestampKind!=='source'&&l.sourceUpdatedText)box.append(securityText('p','security-lane-updated',l.sourceUpdatedText));
    if(l.notes)box.append(securityText('p','security-note',l.notes));
  }
}
function renderSecurityCompactPreview(featured,data) {
  const preview=document.getElementById('securityCompactPreview');if(!preview)return;
  preview.replaceChildren();
  for(const cp of featured) {
    const row=securityText('span','security-compact-row','');
    row.append(securityText('strong','security-compact-checkpoint',cp.name));
    const lanes=cp.lanes.filter(l=>['standard','precheck'].includes(l.type));
    if(!lanes.length) {
      const selected=cp.lanes.filter(l=>l.type===securityLane||l.type==='combined');lanes.push(...selected);
    }
    if(!lanes.length)row.append(securityText('span','security-compact-wait',data.reason==='loading'?'Checking live waits\u2026':'Live waits unavailable'));
    for(const lane of lanes) {
      const schedule=securitySchedule(lane.hours||cp.hours,data.timezone||securityAirport?.timezone);
      const closed=lane.status==='closed'||schedule?.status==='closed';
      const wait=closed?'Closed':securityVisibleWait(lane,data)||'Wait unavailable';
      const value=securityText('span','security-compact-wait','');
      if(lane.type==='precheck') {
        const logo=document.createElement('img');logo.src='images/precheck.jpg';logo.alt='TSA PreCheck';logo.width=72;logo.height=18;
        logo.className='security-lane-logo security-logo-precheck';
        logo.style.display='inline-block';logo.style.verticalAlign='middle';logo.style.marginRight='5px';
        const fallback=securityText('span','','TSA PreCheck');fallback.hidden=true;
        logo.addEventListener('error',()=>{logo.remove();fallback.hidden=false;},{once:true});
        value.append(logo,fallback,document.createTextNode(`: ${wait}`));
      } else value.textContent=`${securityLabels[lane.type]||lane.label}: ${wait}`;
      row.append(value);
    }
    preview.append(row);
  }
  if(!preview.childElementCount)preview.textContent='Expand for published security information and checkpoint hours.';
  if(data.available&&Number.isFinite(Date.parse(data.fetchedAt))) {
    const updated=securityText('span','security-compact-age',`${data.lastEstimate?'Last estimate checked':'Updated'} ${securityAge(data.fetchedAt)}${data.lastEstimate ? (data.updateState==='updating'?' \u00b7 Updating...':' \u00b7 Update unavailable') : ''}`);
    updated.title='Last successful live security response';preview.append(updated);
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
  if(!guidance&&!models.some(c=>c.hours||c.lanes.some(l=>securityVisibleWait(l,data)||l.hours||l.status==='closed'))){securityHide();return;}
  const open=new Set([...card.querySelectorAll('details[open][data-security-key]')].map(el=>el.dataset.securityKey));
  card.replaceChildren();card.hidden=false;
  const wrapper=document.getElementById('airportSecurityCard');if(wrapper)wrapper.hidden=false;
  const heading=securityText('div','security-heading',''),copy=securityText('div','security-heading-copy','');
  copy.append(securityText('div','dashboard-booking-kicker','AIRPORT SECURITY'),securityText('h3','',`${data.airport} security checkpoints`));heading.append(copy);
  const links=securityText('div','security-source-links','');
  const source=securityLink('Live airport source \u2197',data.source?.url);if(source)links.append(source);
  const guideLink=securityLink('Airport guidance \u2197',guidance?.sourceUrls[0]);if(guideLink)links.append(guideLink);
  heading.append(links);card.append(heading);
  if(guidance?.note)card.append(securityText('p','security-guidance-note',guidance.note));
  if(data.lastEstimate) {
    const status=securityText('div','security-unavailable',''); status.setAttribute('role','status');
    status.append(securityText('strong','',data.updateState==='updating'?'Updating live waits...':'Live update unavailable'),
      securityText('p','',`Showing the last published estimates, checked ${securityAge(data.fetchedAt)}. ${data.updateState==='updating'?'New waits will appear when the update finishes.':data.failureMessage||'Try again for current waits.'}`));
    if(data.updateState!=='updating')status.append(securityRetryButton(data.airport)); card.append(status);
  }
  const hasWait=models.some(c=>c.lanes.some(l=>securityVisibleWait(l,data)));
  if(!hasWait){
    const message=data.reason==='loading'?'Checking live waits\u2026':data.reason==='no_public_source'?'No public live wait times':data.available?'Live waits not currently published':'Live waits temporarily unavailable';
    const status=securityText('div','security-unavailable','');status.setAttribute('role','status');
    status.append(securityText('strong','',message),securityText('p','',data.failureMessage || (guidance?'Checkpoint guidance is shown below. Confirm your gate and follow airport signs.':'Published checkpoint information is shown below.')));
    if(data.reason==='source_unavailable') {
      const retry=securityText('button','security-lane-button','Retry live waits');retry.type='button';
      retry.onclick=()=>{securityResults.delete(data.airport);refreshSecurity();};status.append(retry);
    }
    card.append(status);
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
  const featured=securityFeaturedModels(models,data);
  renderSecurityCompactPreview(featured,data);
  const recommendation=data.recommendations?.find(r=>r.lane===securityLane);
  if(recommendation&&!data.lastEstimate){const cp=models.find(c=>c.live&&c.name===recommendation.checkpoint);
    // Keep the Worker's wait comparison, but never suggest a wrong or gate-dependent entrance.
    if(cp&&featured.has(cp)&&(!guidance||(cp.guidance&&cp.priority!=='other'&&!cp.guidance.conditional))&&cp.lanes.some(l=>l.type===securityLane&&securityWaitCurrent(l)))
      card.append(securityText('p','security-recommendation',`${recommendation.label}: ${cp.name} \u00b7 ${recommendation.displayWait}. ${recommendation.note||''}`));
  }
  const grid=securityText('div','security-checkpoints',''),estimates=securityText('div','security-checkpoints security-estimates',''),rest=securityText('div','security-checkpoints','');
  for(const cp of models){
    const key=(cp.live?'live:':'guide:')+(cp.id||cp.name),box=securityText('section','security-checkpoint security-priority-'+cp.priority,'');
    const g=cp.guidance,state=securityCheckpointState(cp,data);
    box.classList.toggle('security-checkpoint-closed',state==='closed');
    if(g&&!guidance.single&&g.priority!=='other'){
      const badge=state==='closed'?'Selected lane closed \u00b7 '+(g.priority==='recommended'?'normally recommended':'alternate'):
        state==='open'&&g.priority==='alternate'&&!g.conditional?'Open alternate for Frontier':g.badge||(g.priority==='recommended'?'\u2605 Recommended for Frontier':'Alternate for Frontier');
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
    (cp.aggregate?estimates:featured.has(cp)?grid:rest).append(box);
  }
  card.append(grid);
  if(estimates.childElementCount){card.append(securityText('h4','security-section-label','Airport-published estimates / arrival information'),estimates);}
  if(rest.childElementCount){
    if(document.getElementById('airportSecurityCard')) {
      card.append(securityText('h4','security-section-label',`Alternate and other checkpoints (${rest.childElementCount})`),rest);
    } else {
      const more=securityText('details','security-more','');more.dataset.securityKey='other:'+data.airport;
      more.append(securityText('summary','',`Alternate and other checkpoints (${rest.childElementCount})`),rest);card.append(more);
    }
  }
  const fetched=securityAge(data.fetchedAt);
  card.append(securityText('p','security-footer',`${data.lastEstimate?'Last published estimates':data.type==='estimate'?'Airport-published estimate':'Published checkpoint information'}${fetched?' \u00b7 Checked '+fetched:''}${guidance?' \u00b7 Guidance reviewed '+guidance.reviewed:''} \u00b7 Times and gates can change. Confirm your boarding pass.`));
  for(const el of card.querySelectorAll('details[data-security-key]'))el.open=open.has(el.dataset.securityKey);
}

function selectSecurityAirport(airport) {
  securitySequence++;securityController?.abort();securityController=null;securityAirport=airport;securityHide();refreshSecurity();
}
async function refreshSecurity() {
  if(!securityAirport||!securityActive()||securityController)return;
  const airport=securityAirport,sequence=securitySequence,cached=securityResults.get(airport.code);
  if(cached&&cached.expires>Date.now()){renderSecurity(cached.data);return;}
  renderSecurity(securityEstimateFallback(airport.code,'updating') || {airport:airport.code,available:false,reason:'loading'});
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
    securityRememberEstimate(data);
    securityResults.set(airport.code,{data,expires:Number.isFinite(expires)?expires:Date.now()+300000});renderSecurity(data);
  }catch(error){
    if(sequence===securitySequence && securityAirport?.code===airport.code && securityActive() && (error.name!=='AbortError'||timedOut)){
      const failureMessage=timedOut?'The live security request timed out. Try again.':error.message==='Expired security response'?
        'The feed returned expired data or its timestamps do not match this device. Try again.':error.message==='Invalid security response'?
        'The live security response could not be validated. Try again.':error instanceof TypeError?
        'This browser could not connect to the live security feed. Try again.':'The live security source could not be loaded. Try again.';
      console.warn('Live security request failed:',airport.code,error);
      const fallback=securityEstimateFallback(airport.code,'failed',failureMessage) || {airport:airport.code,available:false,reason:'source_unavailable',failureMessage};
      securityResults.set(airport.code,{data:fallback,expires:Date.now()+15000});renderSecurity(fallback);
    }
  }finally{clearTimeout(timeout);if(securityController===controller)securityController=null;}
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){securitySequence++;securityController?.abort();securityController=null;}else refreshSecurity();});
if('IntersectionObserver' in window){const target=document.getElementById('dashboardMain');if(target){
  const observer=new IntersectionObserver(entries=>{securityVisible=entries[0].isIntersecting;
    if(securityVisible)refreshSecurity();else{securitySequence++;securityController?.abort();securityController=null;}},{threshold:0});observer.observe(target);
}}
setInterval(()=>{if(securityActive())refreshSecurity();},60000);

initializeDashboardRefinements();
initializeWeatherEnhancements();
initializeSecurityConveyor();
initializeDashboard();
