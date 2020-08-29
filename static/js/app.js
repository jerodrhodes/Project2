function buildPlot() {
    // Read in json 
    d3.json('/data').then(function(data) {
        console.log(data)
        // Get covid cases and crime cases from file
        var scatterData = [];
        for (var i = 0; i <data[0].length; i++) {
            for (var j = 0; j < data[1].length; j++) {
                for (var k = 0; k < data[2].length; k++) {
                    if (data[0][i].zipcode === data[1][j].zipcode & data[0][i].zipcode === data[2][k].zipcode) {
                        scatterData.push({"zipcode": "_" + data[0][i].zipcode + "_", 
                        "covid_cases": data[0][i].covid_cases,
                        "crime_cases": data[1][j].crime_cases,
                        "population": data[2][k].population});
                    }
                }    
            }
        };
        console.log(scatterData);
        zipcode = scatterData.map(({ zipcode }) => zipcode)
        console.log(zipcode);
        covid_cases = scatterData.map(({ covid_cases }) => covid_cases)
        console.log(covid_cases);
        crime_cases = scatterData.map(({ crime_cases }) => crime_cases)
        console.log(crime_cases);
        population = scatterData.map(({ population }) => population)
        console.log(population);

        var trace1 = {
            x: covid_cases,
            y: crime_cases,
            mode: "markers",
            type: "scatter",
            text: zipcode,
            name: "Crime"
          };

        var trace2 = {
            x: covid_cases,
            y: population,
            yaxis: 'y2',
            mode: "markers",
            type: "scatter",
            color: "red",
            text: zipcode,
            name: "Pop."
          };
    
        var data1 = [trace1, trace2];
        var layout1 = {
                title: "Covid Cases vs. Crime Cases & Population by Zipcode",
                xaxis: {title: "Covid Cases"},
                yaxis: {title: "Crime Cases"},
                yaxis2: {
                    title: "Population",
                    overlaying: 'y',
                    side: 'right'
                },
                legend: {
                    orientation:"h",
                    yanchor:"bottom",
                    y:1.05,
                    xanchor:"center",
                    x:0.5
                    }
            }
        Plotly.newPlot("img1", data1, layout1)
    
    });

    
      
}

buildPlot();