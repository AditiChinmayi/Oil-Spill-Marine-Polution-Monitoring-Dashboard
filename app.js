// KMPS — Kerala Marine Pollution Surveillance
// app.js

const INC = [
  { id:"KL-001", location:"Kochi Harbour",           lat:9.9644,  lng:76.2437, type:"Oil Spill",          sev:"High",   date:"2024-01-14", area:42, desc:"Large tanker discharge near Willingdon Island. Heavy crude oil detected on surface.",           dist:"Kochi" },
  { id:"KL-002", location:"Alappuzha Beach",          lat:9.4981,  lng:76.3388, type:"Plastic Waste",      sev:"Medium", date:"2024-02-03", area:8,  desc:"Mass plastic accumulation post-monsoon flush from inland waterways.",                          dist:"Alappuzha" },
  { id:"KL-003", location:"Kollam Port",              lat:8.8932,  lng:76.6141, type:"Oil Spill",          sev:"High",   date:"2024-02-19", area:35, desc:"Bunkering vessel spill. Thick oil slick spreading southward along coast.",                     dist:"Kollam" },
  { id:"KL-004", location:"Kozhikode Beypore",        lat:11.1764, lng:75.8022, type:"Chemical Pollution", sev:"High",   date:"2024-03-08", area:18, desc:"Industrial effluent discharge. Elevated pH and heavy metals detected.",                        dist:"Kozhikode" },
  { id:"KL-005", location:"Varkala Cliff Coast",      lat:8.7379,  lng:76.7163, type:"Algal Bloom",        sev:"Medium", date:"2024-03-22", area:12, desc:"Noctiluca scintillans bloom causing hypoxic zones. Fish kill reported.",                       dist:"Kollam" },
  { id:"KL-006", location:"Kannur Mappila Bay",       lat:11.8745, lng:75.3704, type:"Oil Spill",          sev:"Medium", date:"2024-04-05", area:22, desc:"Fishing trawler engine malfunction. Diesel and bilge water contamination.",                    dist:"Kannur" },
  { id:"KL-007", location:"Thrissur Ponnani Coast",   lat:10.7767, lng:75.9131, type:"Plastic Waste",      sev:"Low",    date:"2024-04-17", area:5,  desc:"Routine shoreline accumulation. Micro-plastics found in tidal zone.",                         dist:"Thrissur" },
  { id:"KL-008", location:"Kochi Vypeen Island",      lat:10.0869, lng:76.1717, type:"Oil Spill",          sev:"High",   date:"2024-05-09", area:55, desc:"Pipeline breach at offshore platform. Satellite confirmed 55 sq km slick.",                   dist:"Kochi" },
  { id:"KL-009", location:"Kasaragod Bekal Coast",    lat:12.3970, lng:75.0298, type:"Chemical Pollution", sev:"Medium", date:"2024-05-25", area:9,  desc:"Pesticide runoff from cashew plantations detected in coastal waters.",                        dist:"Kasaragod" },
  { id:"KL-010", location:"Alappuzha Kumarakom",      lat:9.6158,  lng:76.4311, type:"Algal Bloom",        sev:"Low",    date:"2024-06-12", area:7,  desc:"Green algal bloom in backwaters due to high nutrient runoff.",                               dist:"Alappuzha" },
  { id:"KL-011", location:"Kollam Thangassery",       lat:8.9028,  lng:76.5850, type:"Plastic Waste",      sev:"High",   date:"2024-07-04", area:14, desc:"Ghost fishing nets and large debris stranded on coast after storm.",                          dist:"Kollam" },
  { id:"KL-012", location:"Kozhikode Kappad Beach",   lat:11.3112, lng:75.7264, type:"Oil Spill",          sev:"High",   date:"2024-07-28", area:31, desc:"Cargo vessel bilge pumping in restricted zone. Confirmed by coast guard.",                    dist:"Kozhikode" },
  { id:"KL-013", location:"Thrissur Munambam Harbour",lat:10.1982, lng:76.1726, type:"Chemical Pollution", sev:"Low",    date:"2024-08-14", area:4,  desc:"Low-level antifouling paint leeching from boat hulls in marina.",                            dist:"Thrissur" },
  { id:"KL-014", location:"Kochi Cherai Beach",       lat:10.1417, lng:76.1886, type:"Plastic Waste",      sev:"Medium", date:"2024-09-03", area:6,  desc:"Tourist season litter. Single-use plastics in inter-tidal zone.",                            dist:"Kochi" },
  { id:"KL-015", location:"Kannur Dharmadom",         lat:11.8611, lng:75.3730, type:"Oil Spill",          sev:"Medium", date:"2024-10-16", area:16, desc:"Boat fuel spill during heavy monsoon. Oil-water emulsion over 16 sq km.",                     dist:"Kannur" },
];

const SH = {
  all: null,
  fishermen: {
    tag:"FISHERMEN", ttl:"Fishing Safety & Impact",
    txt:"Safety zones, income loss, and days-at-sea restrictions. Red zones indicate active Coast Guard advisories.",
    pills:["4 RESTRICTED ZONES","38 LOST FISHING DAYS","3 FISH KILL EVENTS"],
    metrics:[
      { lbl:"RESTRICTED ZONES", val:"4",  sub:"Active no-fish advisories",   pct:40 },
      { lbl:"DAYS LOST",        val:"38", sub:"Across all affected fleets",  pct:63 },
      { lbl:"FISH KILL EVENTS", val:"3",  sub:"Hypoxia / oil exposure",      pct:30 },
    ],
    col:"Fishing",
    fn: i => {
      if (i.type === "Oil Spill" && i.sev === "High") return "RESTRICTED";
      if (i.type === "Algal Bloom") return "FISH KILL";
      if (i.sev === "Medium") return "CAUTION";
      return "MONITOR";
    },
    cls: i => {
      const v = SH.fishermen.fn(i);
      return v === "RESTRICTED" ? "danger" : (v === "FISH KILL" || v === "CAUTION") ? "caution" : "safe";
    },
  },
  government: {
    tag:"GOVERNMENT", ttl:"Regulatory & Response View",
    txt:"Response status, cleanup costs, violations, and repeat-offender districts for regulatory action.",
    pills:["5 ACTIVE INCIDENTS","3 CONTAINED","7 RESOLVED","RS 24CR EST."],
    metrics:[
      { lbl:"ACTIVE INCIDENTS",   val:"5",     sub:"Requiring immediate response", pct:33 },
      { lbl:"AVG RESPONSE TIME",  val:"4.2d",  sub:"Detection to containment",     pct:42 },
      { lbl:"EST. CLEANUP COST",  val:"₹24Cr", sub:"Across 2024 incidents",        pct:72 },
    ],
    col:"Response",
    fn: i => {
      if (i.sev === "High" && ["KL-001","KL-008","KL-012"].includes(i.id)) return "ACTIVE";
      if (i.sev === "High" || i.sev === "Medium") return "CONTAINED";
      return "RESOLVED";
    },
    cls: i => {
      const v = SH.government.fn(i);
      return v === "ACTIVE" ? "danger" : v === "CONTAINED" ? "caution" : "safe";
    },
  },
  tourism: {
    tag:"TOURISM", ttl:"Beach Safety & Visitor Impact",
    txt:"Safety ratings based on proximity to active incidents. Red triggers visitor advisories.",
    pills:["3 RED-RATED BEACHES","4 AMBER WARNINGS","6 BEACHES CLEAR"],
    metrics:[
      { lbl:"BEACHES AFFECTED", val:"7",    sub:"Within 10km of active incident", pct:54 },
      { lbl:"EST. TOURIST LOSS",val:"₹9Cr", sub:"Monthly revenue impact",         pct:45 },
      { lbl:"CLEAR BEACHES",    val:"6",    sub:"Currently safe for visitors",     pct:46 },
    ],
    col:"Beach",
    fn: i => {
      if (i.type === "Oil Spill" && i.sev === "High") return "DANGER";
      if (i.type === "Chemical Pollution" || i.sev === "High") return "WARNING";
      if (i.sev === "Medium") return "ADVISORY";
      return "CLEAR";
    },
    cls: i => {
      const v = SH.tourism.fn(i);
      return v === "DANGER" ? "danger" : (v === "WARNING" || v === "ADVISORY") ? "caution" : "safe";
    },
  },
  residents: {
    tag:"RESIDENTS", ttl:"Community Health Risk View",
    txt:"Health risk by district. Chemical and algal incidents pose elevated water and respiratory risks.",
    pills:["2 AIR QUALITY ALERTS","3 WATER ADVISORIES","KOCHI: HIGH RISK"],
    metrics:[
      { lbl:"HIGH-RISK DISTRICTS", val:"3",   sub:"Kochi, Kollam, Kozhikode",    pct:43 },
      { lbl:"WATER ADVISORIES",    val:"3",   sub:"Boil-water notices active",   pct:30 },
      { lbl:"AVG HEALTH INDEX",    val:"6.4", sub:"Out of 10 — lower is safer",  pct:64 },
    ],
    col:"Health",
    fn: i => {
      if (i.type === "Chemical Pollution") return "HIGH RISK";
      if (i.type === "Algal Bloom") return "MODERATE";
      if (i.type === "Oil Spill" && i.sev === "High") return "MODERATE";
      return "LOW";
    },
    cls: i => {
      const v = SH.residents.fn(i);
      return v === "HIGH RISK" ? "danger" : v === "MODERATE" ? "caution" : "safe";
    },
  },
};

const BEACH = [
  { n:"Cherai Beach",       d:"Kochi",     nr:"KL-001", s:"danger"  },
  { n:"Kappad Beach",       d:"Kozhikode", nr:"KL-012", s:"danger"  },
  { n:"Varkala Beach",      d:"Kollam",    nr:"KL-005", s:"caution" },
  { n:"Alappuzha Beach",    d:"Alappuzha", nr:"KL-002", s:"caution" },
  { n:"Mappila Bay",        d:"Kannur",    nr:"KL-006", s:"caution" },
  { n:"Bekal Beach",        d:"Kasaragod", nr:"KL-009", s:"caution" },
  { n:"Thangassery Beach",  d:"Kollam",    nr:null,     s:"safe"    },
  { n:"Muzhappilangad",     d:"Kannur",    nr:null,     s:"safe"    },
  { n:"Marari Beach",       d:"Alappuzha", nr:null,     s:"safe"    },
];

const HEALTH = [
  { d:"Kochi",     s:8.2, c:"var(--crit)" },
  { d:"Kollam",    s:7.6, c:"var(--crit)" },
  { d:"Kozhikode", s:7.1, c:"var(--warn)" },
  { d:"Kannur",    s:5.8, c:"var(--warn)" },
  { d:"Alappuzha", s:4.9, c:"var(--warn)" },
  { d:"Thrissur",  s:3.4, c:"var(--safe)" },
  { d:"Kasaragod", s:4.1, c:"var(--safe)" },
];

const RS = {
  "KL-001":"active",   "KL-002":"resolved",  "KL-003":"contained", "KL-004":"contained",
  "KL-005":"resolved", "KL-006":"resolved",  "KL-007":"resolved",  "KL-008":"active",
  "KL-009":"contained","KL-010":"resolved",  "KL-011":"resolved",  "KL-012":"active",
  "KL-013":"resolved", "KL-014":"resolved",  "KL-015":"contained",
};
const RD = {
  "KL-001":3, "KL-002":7,  "KL-003":5,  "KL-004":4,  "KL-005":6,  "KL-006":8,
  "KL-007":12,"KL-008":2,  "KL-009":9,  "KL-010":14, "KL-011":5,  "KL-012":1,
  "KL-013":18,"KL-014":10, "KL-015":4,
};

const TI = {
  "Oil Spill":          "fa-oil-can",
  "Plastic Waste":      "fa-recycle",
  "Chemical Pollution": "fa-flask",
  "Algal Bloom":        "fa-leaf",
};
const SC = { High:"var(--crit)", Medium:"var(--warn)", Low:"var(--safe)" };
const KC  = [10.2, 76.2];
const KZ  = 7;

let view = "all", filt = "all", mkrs = [], map, osmL, satL, sat = false, tblOpen = false;

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  clock();
  initMap();
  initCharts();
  buildTable(INC);
  buildAlerts();
  buildBeach();
  buildResp();
  buildHealth();
  bind();
  animCnt(INC);
  document.getElementById("last-upd").textContent =
    new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });
});

// ── CLOCK ─────────────────────────────────────────────────────────────────────
function clock() {
  const tick = () => {
    const n = new Date();
    document.getElementById("live-time").textContent =
      n.toLocaleTimeString("en-IN", { hour12:false });
    document.getElementById("live-date").textContent =
      n.toLocaleDateString("en-IN", { day:"2-digit", month:"short" }) + " IST";
  };
  tick();
  setInterval(tick, 1000);
}

// ── ANIMATED COUNTERS ─────────────────────────────────────────────────────────
function animCnt(data) {
  const tot  = data.length;
  const hi   = data.filter(i => i.sev === "High").length;
  const area = data.reduce((s, i) => s + i.area, 0);
  const oil  = data.filter(i => i.type === "Oil Spill").length;

  [["s-tot",tot,""],["s-hi",hi,""],["s-area",area," km²"],["s-oil",oil,""],
   ["b-tot",tot,""],["b-hi",hi,""], ["b-area",area," km²"]].forEach(([id, end, sfx]) => {
    const el = document.getElementById(id);
    if (!el) return;
    let c = 0;
    const steps = Math.ceil(700 / 16);
    const tm = setInterval(() => {
      c++;
      const v = Math.round((1 - Math.pow(1 - c / steps, 3)) * end);
      if      (el.querySelector(".u"))         el.childNodes[0].textContent = v;
      else if (el.querySelector(".stat-unit")) el.childNodes[0].textContent = v;
      else                                     el.textContent = v + sfx;
      if (c >= steps) {
        clearInterval(tm);
        if (el.querySelector(".u") || el.querySelector(".stat-unit"))
          el.childNodes[0].textContent = end;
        else
          el.textContent = end + sfx;
      }
    }, 16);
  });
}

// ── MAP ───────────────────────────────────────────────────────────────────────

function initMap() {
  map = L.map("map", {
    center: KC,
    zoom: KZ,
    zoomControl: true
  });

  // OpenStreetMap base layer — no CARTO API key required
  osmL = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }
  ).addTo(map);

  // Satellite layer
  satL = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri",
      maxZoom: 19
    }
  );

  // Add pollution incident markers
  addMkrs(INC);

  // Reset map view
  document.getElementById("btn-fit").onclick = () => {
    map.setView(KC, KZ);
  };

  // Toggle between street map and satellite imagery
  document.getElementById("btn-sat").onclick = () => {
    if (sat) {
      map.removeLayer(satL);
      osmL.addTo(map);
    } else {
      map.removeLayer(osmL);
      satL.addTo(map);
    }

    sat = !sat;

    document.getElementById("btn-sat").style.color =
      sat ? "var(--sh)" : "";
  };
}

function mkIcon(inc) {
  const s  = inc.sev.toLowerCase();
  const ic = TI[inc.type] || "fa-circle";
  return L.divIcon({
    html: `<div class="mk ${s}"><i class="fas ${ic}"></i></div>`,
    className: "", iconSize:[18,18], iconAnchor:[9,9],
  });
}

function mkPop(inc) {
  const s   = inc.sev.toLowerCase();
  const cfg = view !== "all" ? SH[view] : null;
  let sh = "";
  if (cfg) {
    const v = cfg.fn(inc);
    sh = `<div class="pop-sh">${cfg.col}: <strong>${v}</strong></div>`;
  }
  return `<div class="pop">
    <div class="pop-id"><i class="fas ${TI[inc.type]}"></i>${inc.id}</div>
    <div class="pop-row"><span class="pop-k">Location</span><span class="pop-v">${inc.location}</span></div>
    <div class="pop-row"><span class="pop-k">Type</span><span class="pop-v">${inc.type}</span></div>
    <div class="pop-row"><span class="pop-k">Severity</span><span class="pop-sev ${s}">${inc.sev.toUpperCase()}</span></div>
    <div class="pop-row"><span class="pop-k">Area</span><span class="pop-v">${inc.area} km²</span></div>
    <div class="pop-row"><span class="pop-k">Date</span><span class="pop-v">${fmt(inc.date)}</span></div>
    <div class="pop-note">${inc.desc}</div>${sh}
  </div>`;
}

function addMkrs(data) {
  mkrs.forEach(m => map.removeLayer(m.mk));
  mkrs = [];
  data.forEach(inc => {
    const m = L.marker([inc.lat, inc.lng], { icon:mkIcon(inc) });
    m.bindPopup(mkPop(inc), { maxWidth:260 });
    m.on("click", () => updTicker(inc));
    m.addTo(map);
    mkrs.push({ inc, mk:m });
  });
}

function updTicker(inc) {
  const c = SC[inc.sev];
  document.getElementById("inc-txt").innerHTML =
    `<span style="color:${c};font-weight:600">${inc.id}</span> &nbsp;—&nbsp; ` +
    `<span style="color:var(--sh)">${inc.location}</span> &nbsp;—&nbsp; ` +
    `${inc.type} &nbsp;—&nbsp; ` +
    `<span style="color:${c}">${inc.sev.toUpperCase()}</span> &nbsp;—&nbsp; ` +
    `${inc.area} km²`;
}

// ── STAKEHOLDER VIEW SWITCH ───────────────────────────────────────────────────
function switchView(v) {
  view = v;
  document.body.className = v === "all" ? "" :
    ({ fishermen:"vf", government:"vg", tourism:"vt", residents:"vr" }[v] || "");

  document.querySelectorAll(".vtab").forEach(b => {
    b.classList.remove("active");
    if (b.dataset.view === v) b.classList.add("active");
  });

  const is  = document.getElementById("ins-strip");
  const ms  = document.getElementById("mstrip");
  const cfg = SH[v];

  if (!cfg) {
    is.classList.add("hidden");
    ms.classList.add("hidden");
  } else {
    is.classList.remove("hidden");
    document.getElementById("ins-tag").textContent  = cfg.tag;
    document.getElementById("ins-ttl").textContent  = cfg.ttl;
    document.getElementById("ins-txt").textContent  = cfg.txt;
    document.getElementById("ins-pills").innerHTML  =
      cfg.pills.map(p => `<span class="ins-pill">${p}</span>`).join("");

    ms.classList.remove("hidden");
    ms.innerHTML = cfg.metrics.map(m =>
      `<div class="mrow"><div class="mrow-l">
        <div class="mrow-lbl">${m.lbl}</div>
        <div class="mrow-val">${m.val}</div>
        <div class="mrow-sub">${m.sub}</div>
        <div class="mbar"><div class="mfill" data-pct="${m.pct}" style="width:0"></div></div>
      </div></div>`
    ).join("");
    setTimeout(() =>
      document.querySelectorAll(".mfill").forEach(g => g.style.width = g.dataset.pct + "%"),
      80
    );
  }

  const show = (id, yn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = yn ? "flex" : "none";
    el.classList.toggle("hidden", !yn);
  };

  show("rh-charts",    v === "all" || v === "fishermen");
  show("beach-panel",  v === "tourism");
  show("resp-panel",   v === "government");
  show("health-panel", v === "residents");
  document.getElementById("fish-legend").classList.toggle("hidden", v !== "fishermen");
  document.getElementById("imp-th").style.display = v !== "all" ? "" : "none";

  const fd = filt === "all" ? INC : INC.filter(i => i.type === filt);
  buildTable(fd);
  addMkrs(fd);
  mkrs.forEach(({ inc, mk }) => mk.setPopupContent(mkPop(inc)));
}

// ── FILTER ────────────────────────────────────────────────────────────────────
function applyFilter(type) {
  filt = type;
  const fd = type === "all" ? INC : INC.filter(i => i.type === type);
  addMkrs(fd);
  buildTable(fd);
  animCnt(fd);
  document.getElementById("c-all").textContent = INC.length;
  document.getElementById("c-oil").textContent = fd.filter(i => i.type === "Oil Spill").length;
  document.getElementById("c-pla").textContent = fd.filter(i => i.type === "Plastic Waste").length;
  document.getElementById("c-che").textContent = fd.filter(i => i.type === "Chemical Pollution").length;
  document.getElementById("c-alg").textContent = fd.filter(i => i.type === "Algal Bloom").length;
}

// ── TABLE ─────────────────────────────────────────────────────────────────────
function buildTable(data) {
  const q   = (document.getElementById("srch").value || "").toLowerCase();
  const cfg = view !== "all" ? SH[view] : null;
  const rows = q
    ? data.filter(i =>
        i.location.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q)     ||
        i.desc.toLowerCase().includes(q)     ||
        i.id.toLowerCase().includes(q))
    : data;

  document.getElementById("drw-meta").textContent = `${rows.length} of ${INC.length} records`;

  const cm = {
    danger:  ["var(--crit)", "var(--crit-d)"],
    caution: ["var(--warn)", "var(--warn-d)"],
    safe:    ["var(--safe)", "var(--safe-d)"],
  };

  document.getElementById("tbl-body").innerHTML = rows.map(inc => {
    const s  = inc.sev.toLowerCase();
    const ic = TI[inc.type] || "fa-circle";
    let imp  = "";
    if (cfg) {
      const v        = cfg.fn(inc);
      const cl       = cfg.cls(inc);
      const [fc, bg] = cm[cl];
      imp = `<td style="display:table-cell">
        <span class="imp" style="color:${fc};background:${bg};border-color:${fc};
          padding:0 5px;border:1px solid;font-family:var(--F3);font-size:8px">${v}</span>
      </td>`;
    }
    return `<tr onclick="jump('${inc.id}')">
      <td style="color:var(--sh);font-family:var(--F3);font-size:9px">${inc.id}</td>
      <td style="color:var(--txt)">${inc.location}</td>
      <td><span class="ttype"><i class="fas ${ic}"></i> ${inc.type}</span></td>
      <td><span class="sev ${s}">${inc.sev.toUpperCase()}</span></td>
      <td style="font-family:var(--F3)">${inc.area} km²</td>
      <td style="font-family:var(--F3)">${fmt(inc.date)}</td>
      ${imp}
    </tr>`;
  }).join("");
}

function jump(id) {
  const f = mkrs.find(m => m.inc.id === id);
  if (f) { map.setView([f.inc.lat, f.inc.lng], 11); f.mk.openPopup(); updTicker(f.inc); }
}

// ── CHARTS ────────────────────────────────────────────────────────────────────
function initCharts() {
  const gc = "rgba(0,229,176,0.06)";
  const tf = { color:"#1a4860", font:{ size:9, family:"DM Mono" } };
  const tt = {
    backgroundColor:"var(--ocean)", borderColor:"#1a4860", borderWidth:1,
    titleColor:"#00e5b0", bodyColor:"#3a7898", padding:8, cornerRadius:0,
    titleFont:{ family:"DM Mono", size:9 }, bodyFont:{ family:"DM Mono", size:10 },
  };

  new Chart(document.getElementById("typeChart"), {
    type:"bar",
    data:{
      labels:["Oil Spill","Plastic","Chemical","Algal"],
      datasets:[{
        data:[6,4,3,2],
        backgroundColor:["rgba(255,58,58,.35)","rgba(0,229,176,.35)","rgba(255,174,0,.35)","rgba(128,255,96,.3)"],
        borderColor:["var(--crit)","var(--safe)","var(--warn)","#80ff60"],
        borderWidth:1, barPercentage:.6,
      }],
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false }, tooltip:tt },
      scales:{
        x:{ ticks:{ ...tf }, grid:{ color:gc } },
        y:{ ticks:{ ...tf, stepSize:1 }, grid:{ color:gc }, beginAtZero:true },
      },
    },
  });

  const mRaw = {};
  INC.forEach(i => { const m = i.date.slice(0,7); mRaw[m] = (mRaw[m] || 0) + 1; });
  const mons = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const mc   = mons.map((_, i) => mRaw[`2024-${String(i+1).padStart(2,"0")}`] || 0);
  const cum  = [];
  mc.reduce((a, v, i) => { cum[i] = a + v; return a + v; }, 0);

  new Chart(document.getElementById("trendChart"), {
    type:"line",
    data:{
      labels:mons,
      datasets:[
        { label:"Monthly",  data:mc,  borderColor:"var(--phon)", backgroundColor:"rgba(0,229,176,0.06)", fill:true, tension:0.3, pointBackgroundColor:"var(--phon)", pointRadius:2, borderWidth:1.5 },
        { label:"Cumul.",   data:cum, borderColor:"var(--warn)", backgroundColor:"transparent", borderDash:[4,3], tension:0.3, pointRadius:1.5, borderWidth:1 },
      ],
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ display:true, labels:{ color:"#1a4860", font:{ size:8, family:"DM Mono" }, boxWidth:8, usePointStyle:true } },
        tooltip:tt,
      },
      scales:{
        x:{ ticks:{ ...tf }, grid:{ color:gc } },
        y:{ ticks:{ ...tf, stepSize:1 }, grid:{ color:gc }, beginAtZero:true },
      },
    },
  });
}

// ── PANEL BUILDERS ────────────────────────────────────────────────────────────
function buildBeach() {
  document.getElementById("beach-list").innerHTML = BEACH.map(b => `
    <div class="rrow">
      <div style="flex:1">
        <div class="rname">${b.n}</div>
        <div class="rsub">${b.d}${b.nr ? ` · ${b.nr}` : ""}</div>
      </div>
      <span class="tag ${b.s}">${b.s === "safe" ? "SAFE" : b.s === "caution" ? "CAUTION" : "DANGER"}</span>
    </div>`).join("");
}

function buildResp() {
  document.getElementById("resp-list").innerHTML = INC.map(i => {
    const st = RS[i.id];
    const d  = RD[i.id];
    return `<div class="rrow">
      <span class="rid">${i.id}</span>
      <span class="rname" style="font-size:10px">${i.location}</span>
      <span class="tag ${st === "active" ? "danger" : st === "contained" ? "caution" : "safe"}">${st.toUpperCase()}</span>
      <span style="font-family:var(--F3);font-size:8px;color:var(--txt3);width:24px;text-align:right;margin-left:4px">
        ${st === "active" ? "—" : d + "D"}
      </span>
    </div>`;
  }).join("");
}

function buildHealth() {
  document.getElementById("health-grid").innerHTML = HEALTH.map(d => {
    const r = d.s >= 7 ? "HIGH RISK" : d.s >= 5 ? "MODERATE" : "LOW";
    return `<div class="hcard">
      <div class="hd">${d.d}</div>
      <div class="hs" style="color:${d.c}">${d.s}</div>
      <div class="hr" style="color:${d.c}">${r}</div>
      <div class="hbar"><div class="hfill" style="width:${d.s * 10}%;background:${d.c}"></div></div>
    </div>`;
  }).join("");
}

function buildAlerts() {
  const hi = INC.filter(i => i.sev === "High");
  const md = INC.filter(i => i.sev === "Medium").slice(0, 2);
  document.getElementById("abadge").textContent = hi.length;
  document.getElementById("ap-list").innerHTML = [...hi, ...md].slice(0, 7).map(inc => {
    const h = inc.sev === "High";
    return `<div class="acard ${h ? "" : "med"}"
      onclick="jump('${inc.id}');document.getElementById('ap').classList.remove('open')">
      <div class="ac-ttl"><i class="fas fa-triangle-exclamation"></i>${inc.sev.toUpperCase()} · ${inc.id}</div>
      <div class="ac-body">
        <strong style="color:var(--txt)">${inc.location}</strong><br>
        ${inc.type} · ${inc.area} km²<br>
        ${inc.desc.slice(0, 80)}…
      </div>
      <div class="ac-time">${fmt(inc.date)}</div>
    </div>`;
  }).join("");
}

// ── EVENT BINDINGS ────────────────────────────────────────────────────────────
function bind() {
  document.querySelectorAll(".frow").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".frow").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    applyFilter(b.dataset.type);
  }));

  document.querySelectorAll(".vtab").forEach(b =>
    b.addEventListener("click", () => switchView(b.dataset.view))
  );

  document.getElementById("alert-bell").onclick =
    () => document.getElementById("ap").classList.toggle("open");
  document.getElementById("ap-close").onclick  =
    () => document.getElementById("ap").classList.remove("open");

  document.getElementById("srch").addEventListener("input", () =>
    buildTable(filt === "all" ? INC : INC.filter(i => i.type === filt))
  );

  const drawer = document.getElementById("drawer");
  const btn    = document.getElementById("tbl-btn");
  btn.onclick  = () => { tblOpen = !tblOpen; drawer.classList.toggle("open", tblOpen); };
  document.getElementById("drw-hdr").onclick = () => {
    tblOpen = false;
    drawer.classList.remove("open");
  };
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fmt(s) {
  return new Date(s + "T00:00:00").toLocaleDateString("en-IN", {
    day:"2-digit", month:"short", year:"numeric",
  });
}
