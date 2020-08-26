// import data from sqlite database on flask server
d3.json('/data').then(function(data){
  console.log(data);
  console.log(data[0][0].covid_cases);

  // collect covid_cases and population data by zip code and store in barData
  var barData = [];

  for (var i = 0; i <10; i++) {
      
      for (var j = 0; j < data[2].length; j++) {

        for (var k = 0; k <data[1].length; k++) {

          if (data[0][49-i].zipcode === data[2][j].zipcode & data[0][49-i].zipcode === data[1][k].zipcode) {
            barData.push({"zipcode": "_" + data[0][49-i].zipcode + "_", 
            "covid_cases": data[0][49-i].covid_cases,
            "population": data[2][j].population,
            "crime": data[1][k].crime_cases});
          }
        }
      }
  };

  // isolate x and y variables for bar charts
  console.log(barData);
  zipcode = barData.map(({ zipcode }) => zipcode)
  console.log(zipcode);
  covid_cases = barData.map(({ covid_cases }) => covid_cases)
  console.log(covid_cases);
  population = barData.map(({ population }) => population)
  console.log(population);
  crime = barData.map(({ crime }) => crime)
  console.log(crime);

  // construct chart using plotly react
  const Plot = createPlotlyComponent(Plotly);

  ReactDOM.render(
    React.createElement(Plot, {
    
      data: [
        {
          type: 'bar',
          x: zipcode,
          y: covid_cases,
          name: 'Covid-19 Cases'
        },
        
        {type: 'bar',
          x: zipcode,
          y: crime,
          marker: {color: 'green'},
          name: 'Crime Cases'},

        {
          type: 'scatter',
          mode: 'lines+points',
          x: zipcode,
          y: population,
          marker: {color: 'red'},
          yaxis: 'y2',
          name: 'Population'
        }
      ],
      layout: {
        title: '10 Highest Covid Cases by Zipcode with Crime and Population',
        legend: {
          orientation:"h",
          yanchor:"bottom",
          y:1.02,
          xanchor:"right",
          x:1
          },
        yaxis: {title: 'Covid Cases and Crime',
          range: [0, 4000]},
        yaxis2: {
          title: 'Population',
          titlefont: {color: 'rgb(148, 103, 189)'},
          tickfont: {color: 'rgb(148, 103, 189)'},
          overlaying: 'y',
          side: 'right',
          range: [0, 50000],
        legend: {
          orientation:"h",
          yanchor:"bottom",
          y:1.02,
          xanchor:"right",
          x:1
          },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
        }
      }
    }),
    document.getElementById('img2')
  );
 })