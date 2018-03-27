/**
 * Set up the canvas and load the JSON data URL
 * */
function setup() {
    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
}
/**
 *  Get the data from the URL and display it
 * */
function getData(data) {
    console.log(data);
}

/**
 *  Function to draw on the canvas
 * */
function draw() {

}