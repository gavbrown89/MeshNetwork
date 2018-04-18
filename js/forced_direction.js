var phone = [];
var router = [1];

var mousePhone;
var img;
var imgRouter;

length = 600;
breadth = 400;

innerLength = length / 10 + 5;
innerBreadth = breadth / 10 + 5;

number = 10;


function preload() {
    img = loadImage('img/mobile.svg');
    imgRouter = loadImage('img/router.svg');
}

function setup() {

    var meshCanvas = createCanvas(length, breadth);
    meshCanvas.parent('mesh-network');

    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
    setInterval(askJSON, 30000);

    for (i = 0; i < number; i++) {
        phone[i] = new phones()
    }
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
    console.log("Connection Count:", data[0].probe_requests[0].min_signal);

    var displayMin = document.getElementById('displayMin');
    displayMin.innerHTML = data[0].probe_requests[0].min_signal;

    var displayMax = document.getElementById('displayMax');
    displayMax.innerHTML = data[0].probe_requests[0].max_signal;

    var displayAvg = document.getElementById('displayAvg');
    displayAvg.innerHTML = data[0].probe_requests[0].avg_signal;
}

/** Create a global variable to store the data. */
var dataFeed;

function phones() {

    this.display = function () {
        image(img, this.x, this.y, 18, 32);
        imageMode(CENTER);
    }

    this.x = random(65, length - 60 - 5);
    this.y = random(45, breadth - 40 - 5);


    var set2 = [-0.2, 0.2];

    this.randomX = random(-0.8, 0.8);
    this.randomY = random(-0.8, 0.8);
    this.randMove = function () {

        this.x += this.randomX;
        this.y += this.randomY;

        if (this.x >= length - innerLength || this.y >= breadth - innerBreadth || this.x <= innerLength || this.y <= innerBreadth) {
            this.randomX *= -1;
            this.randomY *= -1
        }
    };


}

function draw() {
    background('#272c32');

    for (i = 0; i < number; i++) {
        for (j = 0; j < i + 1; j++) {
            stroke('#CC123B');
            line(300, 225, phone[i].x, phone[i].y);
        }
        phone[i].display();
        phone[i].randMove();
        image(imgRouter, 300, 200, 75, 78);
    }


}

