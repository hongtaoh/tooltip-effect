const w = 680;
const h = 560;
const tooltips = {"Heart disease":false, "Cancer":false, "Suicide":false, "Car accident":false, "Gun violence":false}
const margin = ({
    top: 80,
    right: 120,
    bottom: 100,
    left: 80
});

const scaleBarGap = 35;

const svg = d3.select('#vis')
    .append('svg')
    .attr('width', w)
    .attr('height', h)


const dataset = [{
        "cause": "Heart disease",
        "value": 0.231
    },
    {
        "cause": "Cancer",
        "value": 0.210
    },
    {
        "cause": "Suicide",
        "value": 0.017
    },
    {
        "cause": "Car accident",
        "value": 0.013
    },
    {
        "cause": "Gun violence",
        "value": 0.005
    }
]


let xScale = d3.scaleBand()
    .domain(dataset.map((s) => s.cause))
    .range([margin.left + scaleBarGap, w - margin.right])
    .paddingInner(0.12);

let yScale = d3.scaleLinear()
    .domain([0, 0.25])
    .range([h - margin.bottom, margin.top]);

let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d3.format("~%"))
    .ticks(6);

let xAxis = d3.axisBottom()
    .scale(xScale);

svg.append('text')
    .attr('x', xScale(dataset[1].cause))
    .attr('y', 20)
    .text('Death Causes in the US in 2019')
    .attr('font-weight', 'bold')
    .attr('font-size', '17px')
    .attr('font-family', "Helvetica Neue")


svg.append('text')
    .attr('x', margin.left)
    .attr('y', margin.top - 20)
    .attr('text-anchor', 'middle')
    .text('Percentage')


svg.append('text')
    .attr('x', w / 2 + 40)
    .attr('y', h - margin.top + 30)
    .attr('text-anchor', 'middle')
    .text('Death causes')
    .style('font-size', "18px")

svg.append('text')
    .attr('x', w - margin.right - margin.left - scaleBarGap)
    .attr('y', h - 5)
    .attr('text-anchor', 'middle')
    .text('Sources: CDC, Dept. of Transportation, & Gun Violence Archive')

let bars = svg.selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('x', d => xScale(d.cause))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => h - margin.bottom - yScale(d.value))
    .attr('fill', 'steelblue')
    .on("mouseover", function(e, d) {
        // d: 
        // {cause: "Cancer", value: 0.21}
        // {cause: "Heart disease", value: 0.231}
        
        let xPosition = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() * 0.5;
        let yPosition = parseFloat(d3.select(this).attr('y')) - 10;
        tooltips[d.cause] = true
        // console.log(tooltips)
        svg.append('text')
            .attr("id", "tooltip")
            .attr('x', xPosition)
            .attr('y', yPosition)
            .text(d.cause + ": " + d3.format(".1%")(d.value))
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '15px')
            .attr('fill', 'black');

    })
    .on("mouseout", function() {

        d3.select("#tooltip").remove();
    });


svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + (h - margin.bottom) + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .call(wrap, xScale.bandwidth())

svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin.left + ', 0)')
    .call(yAxis);


function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
        while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(" "))
            if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(" "))
                line = [word]
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr(
                        "dy", `${++lineNumber * lineHeight + dy}em`)
                    .text(word)
            }
        }
    })
}