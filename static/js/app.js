// Made a const declaration with the URL of the JSON. 
const myURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Read the JSON with D3 and once read, created a function to get the participant ID and to change the data of the dashboard.
d3.json(myURL).then(({names}) => {

    names.forEach(id => {
        d3.select('select').append('option').text(id)
    });

    optionChanged();
});

// Used the function expression 'optionChanged' to limit where the function is available and keep my global scope light whenever the ID is changed.
const optionChanged = () => {
    // Took the first ID.
    let selectedID = d3.select('select').node().value;

    d3.json(myURL).then(({metadata, samples}) => {
        // Declared a variable to hold the 'metadata' object.
        let participantData = metadata.filter(obj => obj.id == selectedID)[0];

        // Declared a variable to hold the 'samples' object.
        let sample = samples.filter(obj => obj.id == selectedID)[0];

        // Selected the HTML 'panel-body' class and appended the participant's metadata.
        d3.select('.panel-body').html('');
        Object.entries(participantData).forEach(([key, val]) => {
            d3.select('.panel-body').append('h6').text(`${key}: ${val}`)
        });

        // Declared a variable for each array to be used in the charts.
        let {otu_ids, otu_labels, sample_values} = sample;

        // Declared a global variable to hold the bar chart data.
        var data = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h',
            type: 'bar'
        }];

        // Plotted the bar chart.
        Plotly.newPlot('bar', data);

        // Declared a global variable to hold the bubble chart data.
        var bubbles = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: 'Rainbow'
            },
            text: otu_labels
        }];

        // Declared a global variable to hold the x axis label of the bubble chart.
        var layout = {
            xaxis: {
                title: 'OTU ID'
            }
        };
        
        // Plotted the bubble chart.
        Plotly.newPlot('bubble', bubbles, layout);
    })
}