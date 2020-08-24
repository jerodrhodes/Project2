function buildPlot() {
    // Read in json 
    d3.json('/data').then( function(data) {
        console.log(data)
        // Get covid cases and crime cases from file
        var covid = data[0].covid_cases;
        var crime = data[1].crime_cases;
    })

}


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