
// Creating map object
var myMap = L.map("map", {
    center: [39.0997, -94.5786],
    zoom: 5
  });
  
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(myMap);

geoData = '../../Data/Zip Code.geojson'

// Grab the data with d3
d3.json(geoData, function(data) {

    // Create a new choropleth layer
    choroplethLayer = L.choropleth(data, {
      valueProperty: 'covid',
      scale: ['lightyellow', 'gold', 'goldenrod', 'darkgoldenrod', 'sienna', 'saddlebrown'],
      steps: 5,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('State: ' + feature.properties.NAME+ "<br> Breweries: " + feature.properties.brewery_count)
      }
    }).addTo(myMap)

    var legend = L.control({ position: 'bottomright' })
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend')
      var limits = choroplethLayer.options.limits
      var colors = choroplethLayer.options.colors
      var labels = []
  
      // Add min & max
      div.innerHTML = '<h2>Number of COVID Cases</h2> <div class="labels"><div class="min">' + limits[0] + 
      '</div> <div class="max">' + limits[limits.length - 1] + '</div></div>'
  
      limits.forEach(function (limit, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
      })
  
      div.innerHTML += '<ul>' + labels.join('') + '</ul>'
      return div
    }
    legend.addTo(myMap)
  });
  

