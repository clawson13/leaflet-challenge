let grayMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
  });

// Define a baseMaps object to hold our base layer(s)
let baseMaps = {
    "Grayscale": grayMap
    };

// Create our map, giving it the streetmap and earthquakes layers to display on load
let myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [grayMap]     //default selected layer
    });

// Add grayscale map
grayMap.addTo(myMap);

// Create layer for data
let earthquakes = new L.LayerGroup();

// Create overlay object to hold our overlay layer
let overlayMaps = {
    Earthquakes: earthquakes
  };

// Set data source
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Give each earthquake a popup describing the place, time, and magnitude of the earthquake
function popUpMsg(feature, layer) {
layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p> <b>Date/Time: </b>" + new Date(feature.properties.time) + "</p>" +
    "<p> <b>Magnitude:</b> " + feature.properties.mag + "; <b>Depth:</b> " + feature.geometry.coordinates[2] + "</p>");
}

d3.json(queryUrl).then(function(data) {

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the popUpMsg function once for each piece of data in the array
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            if (feature.geometry.coordinates[2] >= 90) {
                return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#E74C3C",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
          
              } else if (feature.geometry.coordinates[2] >= 70) {
                return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#DC7633",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
          
              } else if (feature.geometry.coordinates[2] >= 50) {
                return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#F39C12",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
                                     
              } else if (feature.geometry.coordinates[2] >= 30) {
                  return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#F1C40F",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
                                     
              } else if (feature.geometry.coordinates[2] >= 10) {
                  return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#DFFF00",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
            
              } else {
                  return L.circleMarker(latlng, {
                  radius: feature.properties.mag * 5,
                  fillColor: "#2ECC71",
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
              } 
        },
        onEachFeature: popUpMsg
    }).addTo(earthquakes);
  
    // Here are some additional examples:  https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/ 
  
    earthquakes.addTo(myMap);
  });

function getColor(d) {
    if (d === '90') {return "#E74C3C"}
    else if (d === '70') {return "#DC7633"}
    else if (d === '50') {return "#F39C12"}
    else if (d === '30') {return "#F1C40F"}
    else if (d === '10') {return "#DFFF00"}
    else if (d === '-10') {return "#2ECC71"}
    else {return "#FFEDA0"};
    }

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {
    
    var div = L.DomUtil.create('div', 'info legend');
    labels = ['-10','10','30', '50','70','90'];

    for (var i = 0; i < labels.length; i++) {
        div.innerHTML += '<i style="background:' + getColor(labels[i]) +
        '"></i> ' + labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
        }
        return div;
        };

legend.addTo(myMap);

