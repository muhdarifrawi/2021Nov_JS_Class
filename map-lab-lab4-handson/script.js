let singapore = [ 1.3521,103.8198]; // Singapore latlng
let map = L.map('map').setView(singapore, 12);

let hdbData;
let mallsData;
let natureData;
// const can't be in global unless declared with the data values

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

window.addEventListener("DOMContentLoaded", async function(){
    hdbData = await axios.get("../json/hdb.json");
    mallsData = await axios.get("../json/malls.json");
    natureData = await axios.get("../json/nature.json");

    // just checking if it's spitting out data
    console.log(hdbData.data[0]);

    addLayers();

});


function addLayers(){
    let group1= L.layerGroup(); 
    for (let i = 0; i < hdbData.data.length; i++) {
        L.circle(hdbData.data[i]["coordinates"], {
        color: 'green',
        fillColor:"green",
        fillOpacity:0.5,
        radius: 250
    }).addTo(group1);
    }

    group1.addTo(map);

    let group2= L.layerGroup(); 
    for (let i = 0; i < mallsData.data.length; i++) {
        L.circle(mallsData.data[i]["coordinates"], {
        color: 'orange',
        fillColor:"orange",
        fillOpacity:0.5,
        radius: 250
    }).addTo(group2);
    }

    let group3= L.layerGroup(); 
    for (let i = 0; i < natureData.data.length; i++) {
        L.circle(natureData.data[i]["coordinates"], {
        color: 'blue',
        fillColor:"blue",
        fillOpacity:0.5,
        radius: 250
    }).addTo(group3);
    }

    let layers = {
        "HDB": group1,
        "Malls": group2,
        "Parks": group3
    }

    L.control.layers({}, layers).addTo(map);
};
