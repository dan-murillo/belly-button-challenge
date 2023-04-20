const myURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(myURL).then(({names}) => {

    names.forEach(id => {
        d3.select('select').append('option').text(id)
    });

    optionChanged();
});

const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json(myURL).then(({metadata, samples}) => {

        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h6').text(`${key.toUpperCase()}: ${val}`)
        });
        console.log(sample);

        let {otu_ids, sample_values, otu_labels} = sample;

        var data = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        Plotly.newPlot('bar', data);

        
        // Plotly.newPlot('bubble', bubbles);
    })
}





// let xl = []

// let yl = []

// Plotly.d3.json(myURL, function(figure){
//     let data = figure.samples

//     let groupedData = d3.nest().key((d) => d.id).entries(data)

//     let row = "940"

    

//     // // let selectedID = 940

//     // let selectedData = groupedData[0]

//     console.log(eachID)
    
//     // let trace = {
//     //     x: xl,
//     //     y: yl
//     // }

//     // Plotly.newPlot('bar', [trace])
// })





// const data = d3.json(myURL) //.then(

    // let participant = Object.filter()
    
    // let xValuesBar = Object.values(samples.otu_ids);

    // let yValuesBar = Object.values(myObj.samples.sample_values);

    // let traceTop10OTUs = {
    //     x: xValuesBar,
    //     y: yValuesBar,
    //     type: 'bar'
    // }
    
    // let layout = {
    //     title: ''
    // }
    
    // Plotly.newPlot('bar', traceTop10OTUs, layout)





// function init() {

//     data = [{
//         x: ['uno', 'dos', 'tres', 'cuatro', 'cinco'],
//         y: [1, 2, 4, 8, 16]
//     }];
    
//     Plotly.newPlot('bar', data)
// }

// init();





// const myObj = JSON.parse(myURL)





// function selectedSample(a) {
//     let 
// }





//     let dropdownMenu = d3.select("#selDataset");

//     let dataset1 = dropdownMenu.property("value")

//     if (dataset === 'dataset1') {
//         x = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
//         y = [1, 2, 4, 8, 16];
//     }
    
//     else if (dataset === 'dataset2') {
//         x = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta'];
//         y = [1, 10, 100, 1000, 10000];
//     }




// GETS ONLY THE IDS:
// let eachID = d3.values(groupedData).map(function(f) {
//     return f.values.map(function(g) {
//         return g.id;
//     }).join(', ');
// });




