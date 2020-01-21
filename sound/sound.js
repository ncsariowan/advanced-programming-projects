var Direction;
(function (Direction) {
    Direction["Up"] = "w";
    Direction["Down"] = "s";
    Direction["Left"] = "a";
    Direction["Right"] = "d";
    Direction["None"] = "";
})(Direction || (Direction = {}));
class Player {
    constructor(x, y, width, height, imagePath, sounds) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imagePath = imagePath;
        this.sounds = sounds;
        this.keyboardDirection = Direction.None;
        document.addEventListener("keydown", (event) => this.handleKeyDown(event, this), true);
        document.addEventListener("keyup", (event) => this.handleKeyUp(event, this), true);
    }
    handleKeyDown(event, player) {
        for (const key in Direction) {
            if (Direction[key] && Direction[key] === event.key) {
                player.keyboardDirection = Direction[key];
                break;
            }
        }
    }
    handleKeyUp(event, player) {
        for (const key in Direction) {
            if (Direction[key] && Direction[key] === event.key) {
                player.keyboardDirection = Direction.None;
                break;
            }
        }
    }
    move(e, speed) {
        switch (this.keyboardDirection) {
            case (Direction.Up): {
                this.y -= speed;
                console.log(this.y);
                if (e.detectCollision(this)) {
                    this.playSoundFromFile(this.sounds[0]);
                    this.y += speed;
                }
                break;
            }
            case (Direction.Down): {
                this.y += speed;
                if (e.detectCollision(this)) {
                    this.playSoundFromFile(this.sounds[1]);
                    this.y -= speed;
                }
                break;
            }
            case (Direction.Right): {
                this.x += speed;
                if (e.detectCollision(this)) {
                    this.playSoundFromFile(this.sounds[2]);
                    this.x -= speed;
                }
                break;
            }
            case (Direction.Left):
                {
                    this.x -= speed;
                    if (e.detectCollision(this)) {
                        this.playSoundFromFile(this.sounds[3]);
                        this.x += speed;
                    }
                }
                break;
        }
    }
    playSound() {
        var sound = document.createElement("audio");
        var index = Math.floor(Math.random() * (this.sounds.length));
        console.log(index);
        sound.src = this.sounds[index];
        // sound.src = this.sounds[0];
        sound.play();
    }
    playSoundFromFile(file) {
        var sound = document.createElement("audio");
        sound.src = file;
        sound.play();
    }
    draw(context) {
        context.save();
        let img = document.createElement("img");
        img.src = this.imagePath;
        context.drawImage(img, this.x, this.y, this.width, this.height);
        context.restore();
    }
}
class Environment {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    detectCollision(player) {
        return player.x + player.width >= this.width
            || player.x <= 0
            || player.y + player.height >= this.height
            || player.y <= 0;
    }
}
class AnimationHandler {
    constructor(canvasId, callback) {
        this.callback = callback;
        this.canvasId = canvasId;
        console.log(this);
    }
    startAnimating() {
        setInterval(() => this.animate(this.canvasId), 30);
    }
    animate(id) {
        var canvas = document.getElementById(id);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var context = canvas.getContext("2d");
        context.globalCompositeOperation = 'destination-over';
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.callback(context);
    }
}
window.onload = function () {
    let player = new Player(100, 100, 100, 100, "https://media.team254.com/2019/03/8d8d079d-backlash-icon-retina.png", ["assets/sounds/1.wav", "assets/sounds/2.mp3", "assets/sounds/3.wav", "assets/sounds/4.wav"]);
    let animationHandler = new AnimationHandler("canvas", (ctx) => {
        player.move(new Environment(window.innerWidth, window.innerHeight), 5);
        player.draw(ctx);
    });
    animationHandler.startAnimating();
};
//# sourceMappingURL=sound.js.map