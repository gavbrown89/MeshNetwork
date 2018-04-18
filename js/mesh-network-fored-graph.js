var star = [];
var mouseStar;

length = 1000;
breadth = 500;

innerLength = length / 10 + 5;
innerBreadth = breadth / 10 + 5;

number = 15;

function setup() {
    var meshCanvas = createCanvas(length, breadth);
    meshCanvas.parent('mesh-network');
    loadJSON("https://lukenelson.co.uk/wifi-tracking/track.php?callback=eggs", getData, 'jsonp');
    setInterval(askJSON, 30000);
    for (i = 0; i < number; i++) {
        star[i] = new stars()
    }
}

function draw() {
    background('#272c32');

    for (i = 0; i < (number - 1); i++) {
        star[i].randMove();
        star[i].display();

        for (j = 0; j < i / 3; j++) {
            stroke('#00ff03');
            line(star[i].x, star[i].y, star[j].x, star[j].y)
            // line(star[i].x,star[i].y,mouseX,mouseY)
            // line(mouseX,mouseY,star[j].x,star[j].y)
            // line(mouseX + 50,mouseY +30,star[j].x,star[j].y)
        }
    }

}

function stars() {

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
        noStroke();
        ellipse(this.x, this.y, 11, 11);
    }
}