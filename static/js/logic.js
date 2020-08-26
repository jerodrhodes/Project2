
// Creating map object
var myMap = L.map("map", {
    center: [39.0997, -94.5783],
    zoom: 10
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


// // // Grab the data with d3
  d3.json('/data').then( function(data){ 
      console.log(geoData)
      console.log(data)
    // Create a new choropleth layer
    choroplethLayer = L.choropleth(geoData, {
      valueProperty: 'Covid_count',
      scale: ['white', 'red'],
      steps: 5,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('Zipcode: ' + feature.properties.postalcode + "<br> Population: " + feature.properties.Pop_count + "<br> Covid Cases: " + feature.properties.Covid_count)
      }
    }).addTo(myMap)

    // Creating legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = [0, 100,200,300,400,500];
      var colors = ['#ffffff', '#ffd9d9', '#ff9999', '#ff6666', '#ff3333', '#ff0000'];
      var labels = [];
      // Add min & max
      var legendInfo = "<h3>COVID-19 Cases</h3>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
      div.innerHTML = legendInfo;
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
    // Adding legend to the map
    legend.addTo(myMap);
  
    
  
  })
  

