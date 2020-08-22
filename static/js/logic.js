
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
  })

  

