let singapore = [ 1.29,103.85]; // Singapore latlng
let map = L.map('map').setView(singapore, 5);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// placing the api
window.addEventListener("DOMContentLoaded", async function(){
    const quakeData = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson");
    const quakeResponse = quakeData.data;
    

    // just checking if it's spitting out data
    // console.log(quakeResponse.features[0].geometry.coordinates[1]);


    // create marker cluster
    let markerClusterLayer = L.markerClusterGroup();

    for (let i = 0; i < quakeResponse.features.length; i++) {
        let pos = quakeResponse.features[i];
        // console.log(pos);
        L.marker([pos.geometry.coordinates[1],pos.geometry.coordinates[0]]).bindPopup(`Lat:${pos.geometry.coordinates[1]}, Lon: ${pos.geometry.coordinates[0]}, Location: ${pos.properties.place}`).addTo(markerClusterLayer);
        // L.marker([pos.geometry.coordinates[1],pos.geometry.coordinates[0]]).addTo(markerClusterLayer);
    }

    markerClusterLayer.addTo(map);
});


