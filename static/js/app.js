const myURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(myURL).then(({names}) => {

    names.forEach(id => {
        d3.select('select').append('option').text(id)
    });

    optionChanged();
});

// Used the function expression 'optionChanged' to limit where the function is available and keep my global scope light whenever the ID is changed.
const optionChanged = () => {
    let selectedID = d3.select('select').node().value;

    d3.json(myURL).then(({metadata, samples}) => {
        let participantData = metadata.filter(obj => obj.id == selectedID)[0];

        let sample = samples.filter(obj => obj.id == selectedID)[0];

        d3.select('.panel-body').html('');
        Object.entries(participantData).forEach(([key, val]) => {
            d3.select('.panel-body').append('h6').text(`${key}: ${val}`)
        });

        let {otu_ids, otu_labels, sample_values} = sample;

        var data = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h',
            type: 'bar'
        }];

        Plotly.newPlot('bar', data);

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

        var layout = {
            xaxis: {
                title: 'OTU ID'
            }
        };
        
        Plotly.newPlot('bubble', bubbles, layout);
    })
}