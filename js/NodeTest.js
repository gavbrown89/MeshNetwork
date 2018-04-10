function draw(nodes, links) {
    //nodes = nodes.slice(0,10);
    //links = links.slice(0,50);

    var width = 900,
        height = 700;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-180)
        .linkDistance(90)
        .size([width, height]);

    var toolTip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip')
        .attr('style', 'visibility: hidden;')

    var svg = d3.select(".chart").append("svg")
        .attr("width", width)
        .attr("height", height);


    svg.append('clipPath')
        .attr('id', 'clip')
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 25);

    force
        .nodes(nodes)
        .links(links)
        .start();

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", 1);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append('g')
        .attr("class", "node")
        .call(force.drag)


    node.append('circle')
        .style('background', function (d) {
            return 'url("' + d.image + '")'
        })
        .attr("r", function (d) {
            return d.image ? 28 : d.count + 5
        })
        .style("fill", function (d) {
            return color(d.count);
        })

    node.append("svg:image")
        .attr('class', 'avatar')
        .attr("xlink:href", function (d) {
            return d.image;
        })
        .attr("clip-path", "url(#clip)")
        .attr("x", function (d) {
            return -25;
        })
        .attr("y", function (d) {
            return -25;
        })
        .attr("height", function (d) {
            return 50
        })
        .attr("width", function (d) {
            return 50
        });

    node.on('mouseover', function (d) {
        var posX = d3.event.pageX;
        var posY = d3.event.pageY;
        toolTip.attr('style', 'left:' + posX + 'px;top:' + posY + 'px; visibility: visible;')
            .html('<strong>' + d.name + '</strong>');
    }).on('mouseout', function (d) {
        toolTip.attr('style', 'visibility: hidden;');
    });


    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("transform", function (d) {
            return 'translate(' + d.x + ',' + d.y + ')'
        })
    });
}

fetch('//raw.githubusercontent.com/linuxenko/linuxenko.github.io/master/showcase/data/news.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (hotNews) {

        var nodes = [];
        var links = [];


        hotNews.forEach(function (n) {
            var username = n.author.username;
            var image = n.author.picture;
            var domain = url('hostname', n.link);


            /* Usernode */
            var userNodeIdx = null;
            var userNode = nodes.filter(function (a) {
                return a.name === username;
            });
            userNode = userNode.length > 0 ? userNode[0] : null;

            if (userNode === null) {
                nodes.push({
                    name: username,
                    image: image,
                    count: 1
                });
                userNodeIdx = nodes.length - 1;
            } else {
                userNodeIdx = nodes.indexOf(userNode);
                nodes[userNodeIdx].count += 1;
            }

            /* DomainNode */
            var domainNodeIdx = null;
            var domainNode = nodes.filter(function (a) {
                return a.name === domain;
            });
            domainNode = domainNode.length > 0 ? domainNode[0] : null;

            if (domainNode === null) {
                nodes.push({
                    name: domain,
                    count: 1
                });
                domainNodeIdx = nodes.length - 1;
            } else {
                domainNodeIdx = nodes.indexOf(domainNode);
                nodes[domainNodeIdx].count += 1;
            }

            links.push({
                source: userNodeIdx,
                target: domainNodeIdx
            });
        });
        draw(nodes, links);
    });


