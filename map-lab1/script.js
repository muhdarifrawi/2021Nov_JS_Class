let singapore = [ 1.29,103.85]; // #1 Singapore latlng
let map = L.map('map').setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

let singaporeMarker = L.marker([1.29, 103.85]);
singaporeMarker.addTo(map);
singaporeMarker.bindPopup("<p>Singapore</p>")
// singaporeMarker.addEventListener('click', function(){
//     alert("Singapore");
// })

let circle = L.circle([1.35166526, 103.773663572], {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 500
})

// add it to the map
circle.addTo(map);

// show lat long
map.on('click', function(e) {
    console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});

let mapLoc = {
    "sg-zoo": ["Singapore Zoo",[1.4043, 103.7930]],
    "sg-birdpark":["Jurong Bird Park",[1.3187, 103.7064]],
    "sg-discvoery":["Singapore Discovery Center",[1.3327, 103.6789]]

};

function addMarkers(){
    let marker;
    for(key in mapLoc){
        console.log(`${key}:${mapLoc[key][1]}`);
        marker = L.marker(mapLoc[key][1]);
        marker.addTo(map);
        marker.bindPopup(`<p>${mapLoc[key][0]}</p>`)
    }
};

addMarkers();