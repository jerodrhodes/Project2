// d3.json('/data').then(function(data){
//     console.log(data)
//     console.log(data[0][0].covid_cases)

//     covid_x = []
//     zip_y = []

//     for (var i = 0; i <10; i++) {
//         covid_x.push(data[0][49-i].covid_cases)
//         zip_y.push(data[0][49-i].zipcode)
//     }

//     console.log(covid_x)
//     console.log(zip_y)

//     var trace1 = {
//         x: data[0][0].covid_x,
//         y: data[0][0].zip_y,
//         type: 'bar'

//     };

//     // var trace2 = {
//     //     x: data[0][2].zipcode,
//     //     y: data[0][2].population,
//     //     type: 'bar'
//     // };

//     var data = [trace1];

//     var layout = {
//         barmode: 'group'
//     }

//     Plotly.newPlot('bar', data, layout);

// // function buildPlot() {
// //     // Read in json data
// //     d3.json("samples.json").then(bellydata => {
// //         console.log(bellydata)
// //         // Get OTU ids from sample file
// //         var otuIds = bellydata.samples[0].otu_ids;
// //         console.log(otuIds)
// //         // Get # of samples for top ten ids, reverse so h bar chart is correct
// //         var sampleValues = bellydata.samples[0].sample_values.slice(0,10).reverse();
// //         console.log(sampleValues)
// //         // Get labels for top 10 otu ids.
// //         var otuLabels = bellydata.samples[0].otu_labels.slice(0,10).reverse();
// //         console.log(`OTU labels: ${otuLabels}`)
// //         // get top 10 otu ids for the bar plot and reverse it
// //         var topOtuIds = bellydata.samples[0].otu_ids.slice(0,10).reverse();
// //         var otuIdLabels = topOtuIds.map(d => "OTU " + d);
// //         console.log(`OTU ids: ${otuIdLabels}`)

// // // Bubble Chart
// // var trace2 = {
// //     x: bellydata.samples[i].otu_ids,
// //     y: bellydata.samples[i].sample_values,
// //     mode: "markers",
// //     marker:{
// //         size: bellydata.samples[i].sample_values,
// //         color: bellydata.samples[i].otu_ids
// //     },
// //     text: bellydata.samples[i].otu_labels
// // };

// // var data2 = [trace2];
// // var layout1 = {
// //     title: "Patient OTU Counts",
// //     xaxis: {title: "OTU ID"},
// //     height: 600,
// //     width: 1200
// // };


// })
d3.json('/data').then(function(data){
    console.log(data);
    console.log(data[0][0].covid_cases);

    // covid_y = [];
    // zip_x = [];

    var barData = [];

    for (var i = 0; i <10; i++) {
        
        for (var j = 0; j < data[2].length; j++) {
            if (data[0][49-i].zipcode === data[2][j].zipcode) {
                barData.push({"zipcode": "_" + data[0][49-i].zipcode + "_", 
                "covid_cases": data[0][49-i].covid_cases,
                "population": data[2][j].population});
            }
        }
    };

    console.log(barData);
    zipcode = barData.map(({ zipcode }) => zipcode)
    console.log(zipcode);
    covid_cases = barData.map(({ covid_cases }) => covid_cases)
    console.log(covid_cases);
    population = barData.map(({ population }) => population)
    console.log(population);
    // console.log(zip_x);

    // population - {};
    
    // pop_y = [];
    // pop_x = [];


    
    // for (var i = 0; i < data[2].length; i++) {
    //     for (var j = 0; j < zip_x.length; j++){
    //         if (zip_x[j] === data[2][i].zipcode) {
    //             pop_y.push(data[2][i].population),
    //             pop_x.push(data[2][i].zipcode);
    //         };
    //     };
    // };

    // console.log(pop_y);
    // console.log(pop_x);

    var trace1 = {
        x: zipcode,
        y: covid_cases,
        type: 'bar',
        name: 'Covid-19 Cases',
        text: covid_cases.map(String),
        textposition: 'auto',
        hoverinfo: 'none'

    };

    var trace2 = {
        x: zipcode,
        y: population,
        type: 'bar',
        name: 'Populations',
        text: population.map(String),
        textposition: 'auto',
        hoverinfo: 'none'
    };

    var data = [trace1, trace2];

    var layout = {
        // barmode: 'group',
        title: 'Covid-19 Cases and Population by Zipcode',
        xaxis: {tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }},
        yaxis: {
          title: 'Covid Cases and Population',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
    }

    Plotly.newPlot('img2', data, layout);

// function buildPlot() {
//     // Read in json data
//     d3.json("samples.json").then(bellydata => {
//         console.log(bellydata)
//         // Get OTU ids from sample file
//         var otuIds = bellydata.samples[0].otu_ids;
//         console.log(otuIds)
//         // Get # of samples for top ten ids, reverse so h bar chart is correct
//         var sampleValues = bellydata.samples[0].sample_values.slice(0,10).reverse();
//         console.log(sampleValues)
//         // Get labels for top 10 otu ids.
//         var otuLabels = bellydata.samples[0].otu_labels.slice(0,10).reverse();
//         console.log(`OTU labels: ${otuLabels}`)
//         // get top 10 otu ids for the bar plot and reverse it
//         var topOtuIds = bellydata.samples[0].otu_ids.slice(0,10).reverse();
//         var otuIdLabels = topOtuIds.map(d => "OTU " + d);
//         console.log(`OTU ids: ${otuIdLabels}`)

// // Bubble Chart
// var trace2 = {
//     x: bellydata.samples[i].otu_ids,
//     y: bellydata.samples[i].sample_values,
//     mode: "markers",
//     marker:{
//         size: bellydata.samples[i].sample_values,
//         color: bellydata.samples[i].otu_ids
//     },
//     text: bellydata.samples[i].otu_labels
// };

// var data2 = [trace2];
// var layout1 = {
//     title: "Patient OTU Counts",
//     xaxis: {title: "OTU ID"},
//     height: 600,
//     width: 1200
// };


})