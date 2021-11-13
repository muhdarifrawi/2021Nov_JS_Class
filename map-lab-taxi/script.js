let singapore = [ 1.29,103.85]; // Singapore latlng
let map = L.map('map').setView(singapore, 13);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// placing the api
window.addEventListener("DOMContentLoaded", async function(){
    // const taxiData = axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    // const taxiResponse = await taxiData;
    // const taxiCoordinates = taxiResponse.data.features[0].geometry.coordinates

    // shortened
    const taxiData = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    const taxiCoordinates = taxiData.data.features[0].geometry.coordinates

    // just checking if it's spitting out data
    console.log(taxiCoordinates);


    // create marker cluster
    let markerClusterLayer = L.markerClusterGroup();

    for (let i = 0; i < taxiCoordinates.length; i++) {
        let pos = taxiCoordinates[i];
        L.marker([pos[1],pos[0]]).bindPopup(`Lat:${pos[1]}, Lon: ${pos[0]}`).addTo(markerClusterLayer);
    }

    markerClusterLayer.addTo(map);
});


