/**
 * Set up the canvas and load the JSON data URL
 * */
function setup() {
    var canvas = createCanvas(210, 200);
    canvas.parent('radar-canvas');
    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
    setInterval(askJSON, 30000);
}

function askJSON() {
    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
}

/**
 *  Create a function to store the data brought in from the JSON mesh feed data
 * */
function getData(data) {
    console.log(data);
    dataFeed = data;
    console.log("Connection Count:", data[0].probe_requests[0].count);

    var displayCount = document.getElementById('displayCount');

    displayCount.innerHTML = data[0].probe_requests[0].count;
}

/** Create a global variable to store the data. */
var dataFeed;

/**
 *  Function to draw on the canvas
 */
function draw() {
    fill('#000000');
    stroke('#00ff03');
    strokeWeight(4);
    ellipse(105, 100, 260, 260);
    ellipse(105, 100, 200, 200);
    ellipse(105, 100, 140, 140);
    ellipse(105, 100, 80, 80);
    ellipse(105, 100, 20, 20);
    line(105, 0, 105, 210);
    line(0, 100, 210, 100);
    /**
     *
     *  Display the count data using ellipses randomly placed on the canvas
     *
     */
    if (dataFeed) {
        randomSeed(1);
        for (var i = 0; i < dataFeed[0].probe_requests[0].count; i++) {
            /** if Variable i equals 0 and is less than the first dataFeed & probe request count array then increment i by 1  */
            fill('rgba(255, 255, 255, 1)');
            noStroke();
            ellipse(random(0, width), random(0, height), 10, 10);
            /** Draw an ellispe with random x & y coordinates */

        }

    }


}

