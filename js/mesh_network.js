/**
 * Set up the canvas and load the JSON data URL
 * */
function setup() {
    createCanvas(210, 210);
    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
}
/**
 *  Get the data from the URL and display it
 * */
var dataFeed;
function getData(data) {
    console.log(data);
    dataFeed = data;
}

/**
 *  Function to draw on the canvas
 * */
function draw() {
    background('#000000');
    fill('#000000');
    stroke('#01ff02');
    strokeWeight(4);
    ellipse(105, 100, 200, 200);
    ellipse(105, 100, 170, 170);
    ellipse(105, 100, 140, 140);
    ellipse(105, 100, 110, 110);
    ellipse(105, 100, 80, 80);
    ellipse(105, 100, 50, 50);
    ellipse(105, 100, 20, 20);
    line(105, 0, 105, 210);
    line(0, 100, 210, 100);
    if (dataFeed) {
        randomSeed(4);
        for (var i = 0; i < dataFeed.length; i++) {
            fill('#ffffff');
            stroke('#ffffff');
            ellipse(random(width), random(height), 10, 10);

        }
    }
}