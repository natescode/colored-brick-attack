import nge from '../modules/nge-1.0.3.mjs'
import input from '../modules/Input.mjs'

var stage = new createjs.Stage("canvas");

var circ = new createjs.Shape();
var rect = new createjs.Shape();
var velX = 2;
var velY = 2;
var brick;
var number_of_bricks = 0;
var score = 0;

circ.graphics.beginFill('red');
circ.graphics.drawCircle(0, 0, 8);
circ.radius = 8;
circ.x = 500;
circ.y = 100;
circ.color = "red";
stage.addChild(circ);
stage.update();

rect.graphics.f("red").r(0, 0, 100, 20);
rect.x = 250;
rect.y = 260;
rect.width = 100;
rect.height = 20;
rect.color = "red";
stage.addChild(rect);
stage.update();

/*
 Input.keyboard("Right", function() {
 rect.x += 30;
 stage.update();

 });
 Input.keyboard("Left", function() {
 rect.x -= 30;
 stage.update();

 });
 */
var paddleColor = 1;
Input.keyboard("space", function () {
    if (paddleColor == 1) {
        rect.graphics.clear();
        rect.graphics.f("blue").r(0, 0, 100, 20);
        rect.color = "blue";
        stage.update();
        paddleColor = 2;
    } else {

        rect.graphics.clear();
        rect.graphics.f("red").r(0, 0, 100, 20);
        rect.color = "red";
        stage.update();
        paddleColor = 1;
    }

    stage.onMouseMove = function (e) {
        rect.x = e.clientX - rect.width / 2;
    };
    stage.mouseMoveOutside = true;

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    createBricks();

});

function tick(event) {

    document.getElementById("score").innerHTML = "Score: " + score + "    Bricks: " + number_of_bricks;

    if (number_of_bricks == 0) {
        // WINNER LOGIC
        createjs.Ticker.removeEventListener("tick", tick);
        stage.removeAllChildren();
        stage.update();
        document.getElementById("message").innerHTML = "YOU WON!!!<br>Score: " + score;
        score *= 1.31;

    }

    circ.x += velX * (event.delta) / 10;
    circ.y += velY * (event.delta) / 10;

    for (var i = 1; i <= brick.length; i++) {
        if (nge.boolCircleRectCollision(circ, brick[i])) {

            if (brick[i].alive) {
                if (brick[i].color == circ.color) {
                    stage.removeChild(brick[i]);
                    brick[i].alive = false;
                    number_of_bricks--;
                    score += 100;
                    stage.update();
                }


                if (circ.x > brick[i].x && circ.x < brick[i].x + brick[i].width && circ.y > brick[i].y + brick[i].height / 2) {
                    circ.y = brick[i].y + brick[i].height + circ.radius;
                    velY *= -1;

                }
                if (circ.x > brick[i].x && circ.x < brick[i].x + brick[i].width && circ.y < brick[i].y + brick[i].height / 2) {
                    circ.y = brick[i].y - circ.radius;
                    velY *= -1;

                }

                if (circ.y > brick[i].y && circ.y < brick[i].y + brick[i].height && circ.x < brick[i].x + brick[i].width / 2) {
                    circ.x = brick[i].x + brick[i].width + circ.radius;
                    velX *= -1;

                }
                if (circ.y > brick[i].y && circ.y < brick[i].y + brick[i].height && circ.x > brick[i].x + brick[i].width / 2) {
                    circ.x = brick[i].x - circ.radius;
                    velX *= -1;

                }
                stage.update();
            }
        }
    }

    if (circ.x >= stage.canvas.width) {
        circ.x = stage.canvas.width - circ.radius;
        velX *= -1;
    }
    if (circ.x <= circ.radius) {
        circ.x = circ.radius;
        velX *= -1;
    }
    if (circ.y >= stage.canvas.height) {
        circ.y = stage.canvas.height - circ.radius;
        velY *= -1;
        //velX = 0;
        //velY = 0;
    }
    if (circ.y <= 8) {
        circ.y = circ.radius;
        velY *= -1;
    }

    if (nge.boolCircleRectCollision(circ, rect)) {

        circ.graphics.clear();
        circ.graphics.beginFill(rect.color);
        circ.color = rect.color;
        circ.graphics.drawCircle(0, 0, 8);

        if (circ.x > rect.x && circ.x < rect.x + rect.width && circ.y > rect.y + rect.height / 2) {
            circ.y = rect.y + rect.height + circ.radius;
            velY *= -1;

        }
        if (circ.x > rect.x && circ.x < rect.x + rect.width && circ.y < rect.y + rect.height / 2) {
            circ.y = rect.y - circ.radius;
            velY *= -1;

        }

        if (circ.y > rect.y && circ.y < rect.y + rect.height) {
            velX *= -1;

        }



    }

    stage.update();

}

function createBricks() {

    brick = [];
    var ID = 0;

    for (var i = 0; i <= 9; i++) {
        for (var j = 1; j <= 4; j++) {

            ID++;

            brick[ID] = new createjs.Shape();
            if (i % 2 == 0) {
                brick[ID].graphics.f("blue").r(0, 0, 60, 15);
                brick[ID].color = "blue";
            } else {
                brick[ID].graphics.f("red").r(0, 0, 60, 15);
                brick[ID].color = "red";

            }

            brick[ID].width = 60;
            brick[ID].height = 15;
            brick[ID].x = i * 62;
            brick[ID].y = j * 17;
            brick[ID].alive = true;

            stage.addChild(brick[ID]);
            stage.update();
            number_of_bricks++;
        }

    }

    return brick;
}