
// an "enumerator"; #usetypescript
Directions = {
    NONE: "NONE",
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
}

directionKeys = ["w", "a", "s", "d"]

keyboardDirection = Directions.NONE;

circle = new Circle(10, 10, 100, "blue");

square = new Square(10, 10, 100, 100, "red");

// walls = [];
// walls.push(new Wall(window.innerWidth, 0, 10, window.innerHeight));

document.addEventListener("keydown", handleKeyDown, true);
document.addEventListener("keyup", handleKeyUp, true);

window.onload = function () {
    window.requestAnimationFrame(animate);
};

var speedCircle = 3;

var speedSquare = 13;

function animate() {

    var canvas = document.getElementById("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext("2d");
    context.globalCompositeOperation = 'destination-over';

    context.clearRect(0, 0, canvas.width, canvas.height);

    circle.x = canvas.width / 2;

    square.y = canvas.height / 2;

    speedCircle += Math.random() - 0.5;
    speedSquare += Math.random() - 0.5;

    circle.move(speedCircle, canvas.height);

    square.move(speedSquare, canvas.width);

    if (hasCollision(square, circle)) {
        square.movingRight = !square.movingRight;
        circle.movingUp = !circle.movingUp
        circle.move(speedCircle, canvas.height);
        square.move(speedSquare, canvas.width);
    }


    circle.draw(context)
    square.draw(context);

    console.log("Speed Square ", speedSquare, "Speed Circle", speedCircle);


    window.requestAnimationFrame(animate);
}


function hasCollision(square, circle) {
    var testX;
    var testY;

    if (circle.x < square.x) {
        testX = square.x;
    } else if (circle.x > square.x) {
        testX = square.x + (square.width);
    }

    if (circle.y < square.y) {
        testY = square.y;
    } else if (circle.y > square.y) {
        testY = square.y + (square.height);
    }

    var distX = circle.x - testX;
    var distY = circle.y - testY;

    var distance = Math.sqrt((distX * distX) + (distY * distY));

    if (distance <= circle.radius) {
        return true;
    }
    return false;
}

function handleKeyUp(event) {
    if (directionKeys.includes(event.key)) {
        keyboardDirection = Directions.NONE;
    }
}


function handleKeyDown(event) {
    switch (event.key) {
        case "w":
            keyboardDirection = Directions.UP;
            break;
        case "a":
            keyboardDirection = Directions.LEFT;
            break;
        case "s":
            keyboardDirection = Directions.DOWN;
            break;
        case "d":
            keyboardDirection = Directions.RIGHT;
            break;
    }
}

function Square(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movingRight = true;
    this.color = color;

    this.draw = function (context) {

        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }

    this.move = function (speed, limit) {

        if (this.movingRight) {
            if (this.x >= (limit - this.width)) {
                this.movingRight = false;
                this.x -= speed;
            } else {
                this.x += speed;
            }
        } else {
            if (this.x <= 0) {
                this.movingRight = true;
                this.x += speed;
            } else {
                this.x -= speed;
            }
        }

    }
}


function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.movingUp = true;
    this.color = color;

    this.draw = function (context, speed, limit) {
        context.save();
        context.fillStyle = this.color;

        context.beginPath();
        context.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }

    this.move = function (speed, limit) {


        if (this.movingUp) {
            if (this.y <= this.radius) {
                this.movingUp = false;
                this.y += speed;
            } else {
                this.y -= speed;
            }
        } else {
            if (this.y >= limit - this.radius) {
                this.movingUp = true;
                this.y -= speed;
            } else {
                this.y += speed;
            }
        }

    }
}
