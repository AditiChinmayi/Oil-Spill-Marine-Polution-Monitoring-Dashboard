
function updateDateTime()
{
    const now = new Date();
    const el = document.getElementById("dateTime");
    if(el) el.innerText = now.toLocaleString();
}
setInterval(updateDateTime, 1000);


let map = null;   



function initMap()
{
    if(map !== null) return;   
    map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '© OpenStreetMap contributors' }
    ).addTo(map);

  L.marker([13.0827, 80.2707]).addTo(map)
.bindPopup("Plastic Waste detected – Chennai Coast");

L.marker([19.0760, 72.8777]).addTo(map)
.bindPopup("Oil Spill detected – Mumbai Coast");

L.marker([8.5241, 76.9366]).addTo(map)
.bindPopup("Algal Bloom – Kerala Coast");

const indiaBounds = [
    [6.0, 68.0],   
    [37.0, 97.0]   
];

map.setMaxBounds(indiaBounds);

  
    setTimeout(function()
    {
        map.invalidateSize();
    }, 200);

map = L.map('map', {
    minZoom: 5,
    maxZoom: 18
}).setView([20.5937, 78.9629], 5);


}






document.addEventListener("DOMContentLoaded", function()
{
    const toggleBtn = document.getElementById("toggleAlert");
    const alertPanel = document.getElementById("alertPanel");

    if(toggleBtn)
    {
        toggleBtn.addEventListener("click", function()
        {
            if(alertPanel.style.display === "block")
                alertPanel.style.display = "none";
            else
                alertPanel.style.display = "block";
        });
    }
});




function enterDashboard()
{
    const role = document.getElementById("authorityRole").value;

    if(role === "")
    {
        alert("Select a role");
        return;
    }

    document.getElementById("roleScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    showActionPlan(role);

    initMap();   // create map AFTER dashboard visible
}




function showActionPlan(role)
{
    const plan = document.getElementById("actionPlan");

    if(role === "authority")
    {
        plan.innerHTML =
        "<li>Assess severity of pollution incident</li>" +
        "<li>Deploy containment and cleanup teams</li>" +
        "<li>Issue public safety advisories</li>" +
        "<li>Coordinate with national and regional agencies</li>" +
        "<li>Monitor real-time environmental data</li>";
    }

    else if(role === "resource")
    {
        plan.innerHTML =
        "<li>Evaluate impact on marine ecosystems</li>" +
        "<li>Protect sensitive habitats and coral reefs</li>" +
        "<li>Track affected wildlife populations</li>" +
        "<li>Recommend conservation and recovery actions</li>";
    }

    else if(role === "emergency")
    {
        plan.innerHTML =
        "<li>Dispatch emergency response vessels</li>" +
        "<li>Activate spill containment booms</li>" +
        "<li>Secure affected coastal zones</li>" +
        "<li>Coordinate rescue and evacuation if needed</li>";
    }

    else if(role === "fishing")
    {
        plan.innerHTML =
        "<li>Avoid affected fishing zones</li>" +
        "<li>Report oil sightings to authorities</li>" +
        "<li>Secure fishing equipment and vessels</li>" +
        "<li>Follow government safety advisories</li>";
    }

    else if(role === "media")
    {
        plan.innerHTML =
        "<li>Broadcast verified incident updates</li>" +
        "<li>Inform public about safety measures</li>" +
        "<li>Coordinate with authorities for accurate information</li>" +
        "<li>Avoid spreading unverified reports</li>";
    }

    else if(role === "community")
    {
        plan.innerHTML =
        "<li>Avoid polluted beaches and coastal areas</li>" +
        "<li>Follow evacuation instructions if issued</li>" +
        "<li>Report unusual pollution sightings</li>" +
        "<li>Protect drinking water sources</li>";
    }

    else if(role === "public")
    {
        plan.innerHTML =
        "<li>Stay informed through official alerts</li>" +
        "<li>Avoid travel to affected regions</li>" +
        "<li>Follow environmental safety guidelines</li>" +
        "<li>Support cleanup efforts if authorized</li>";
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    const btn = document.getElementById("wildlifeBtn");
    const panel = document.getElementById("wildlifePanel");

    if(btn)
    {
        btn.addEventListener("click", function()
        {
            if(panel.style.display === "none")
                panel.style.display = "block";
            else
                panel.style.display = "none";
        });
    }
});