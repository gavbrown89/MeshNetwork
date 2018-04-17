d3.json('https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs', {
method: 'get',
    headers: {
    'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json'
},
mode: 'no-cors'
});
console.log(d3.json);

var nodes = [
    {"id": "02:d6:d4:2f:3f:88"},
    {"id": "-93"},
    {"id": "-91"},
    {"id": "-92"},
    {"id": "-91"},
    {"id": "-87"},
    {"id": "-52"}
];

var links = [
    {"source": "02:d6:d4:2f:3f:88", "target": "-93"},
    {"source": "02:d6:d4:2f:3f:88", "target": "-91"},
    {"source": "02:d6:d4:2f:3f:88", "target": "-92"},
    {"source": "02:d6:d4:2f:3f:88", "target": "-87"},
    {"source": "02:d6:d4:2f:3f:88", "target": "-52"}
];

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 8)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

simulation
    .nodes(nodes)
    .on("tick", ticked);

simulation.force("link")
    .links(links);

function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}


function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}