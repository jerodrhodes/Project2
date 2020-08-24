function buildPlot() {
    // Read in json 
    d3.json('/data').then(function(data) {
        console.log(data)
        // Get covid cases and crime cases from file
        var scatterData = [];
        for (var i = 0; i <data[0].length; i++) {
            for (var j = 0; j < data[1].length; j++) {
                if (data[0][i].zipcode === data[1][j].zipcode) {
                    scatterData.push({"zipcode": "_" + data[0][i].zipcode + "_", 
                    "covid_cases": data[0][i].covid_cases,
                    "crime_cases": data[1][j].crime_cases});
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

        var trace1 = {
            x: covid_cases,
            y: crime_cases,
            mode: "scatter",
            // marker:{
            //         size: crime_cases,
            //         color: covid_cases
            //             },
            text: zipcode
          };
    
        var data1 = [trace1];
        var layout1 = {
              title: "Covid Cases vs. Crime Cases by Zipcode",
              xaxis: {title: "Covid Cases"},
              yaxis: {title: "Crime Cases"},
            //   height: 600,
            //   width: 1200
          };
    
        Plotly.newPlot("img1", data1, layout1);
    });

    
      
}

buildPlot();