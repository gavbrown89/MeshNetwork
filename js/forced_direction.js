var phone = [];
var mousePhone;
var img;

length = 600;
breadth = 400;

innerLength = length / 10 + 5;
innerBreadth = breadth / 10 + 5;

number = 15;

function preload() {
    img = loadImage('img/mobile.png');
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

function draw() {
    background('#272c32');

    for (i = 0; i < (number - 1); i++) {
        phone[i].randMove();
        phone[i].display();

        for (j = 0; j < i / 3; j++) {
            stroke('#00ff03');
            line(phone[i].x, phone[i].y, phone[j].x, phone[j].y)
            // line(phone[i].x,phone[i].y,mouseX,mouseY)
            // line(mouseX,mouseY,phone[j].x,phone[j].y)
            // line(mouseX + 50,mouseY +30,phone[j].x,phone[j].y)
        }
    }

}

function phones() {

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

    this.display = function () {
        // noStroke();
        imageMode(CENTER);
        image(img, this.x, this.y);
        // rect(this.x, this.y, 11, 21);
    }
}