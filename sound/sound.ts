enum Direction {
    Up = "w",
    Down = "s",
    Left = "a",
    Right = "d",
    None = "",
}

class Player {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private imagePath: string;
    private sounds: string[];

    private keyboardDirection: Direction;

    constructor(x: number, y: number, width: number, height: number, imagePath: string, sounds: string[]) {
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

    private handleKeyDown(event, player: Player) {
        for (const key in Direction) {
            if (Direction[key] && Direction[key] === event.key) {
                player.keyboardDirection = Direction[key];
                break;
            }
        }
    }

    private handleKeyUp(event, player: Player) {
        for (const key in Direction) {
            if (Direction[key] && Direction[key] === event.key) {
                player.keyboardDirection = Direction.None;
                break;
            }
        }
    }

    public move(e: Environment, speed: number) {
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
            case (Direction.Left): {
                this.x -= speed;
                if (e.detectCollision(this)) {
                    this.playSoundFromFile(this.sounds[3]);
                    this.x += speed;
                }
            }
            break;
        }
    }

    public playSound() {
        var sound = document.createElement("audio");
        var index = Math.floor(Math.random() * (this.sounds.length ) );
        console.log(index);
        sound.src = this.sounds[index];
        // sound.src = this.sounds[0];
        sound.play();
    }

    public playSoundFromFile(file: string) {
        var sound = document.createElement("audio");
        sound.src = file;
        sound.play();
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        let img = document.createElement("img");
        img.src = this.imagePath;
        context.drawImage(img, this.x, this.y, this.width, this.height);
        context.restore();
    }
}

class Environment {
    public width: Number;
    public height: Number;

    constructor(width: Number, height: Number) {
        this.width = width;
        this.height = height;
    }

    public detectCollision(player: Player): boolean {
        return player.x + player.width >= this.width
            || player.x <= 0
            || player.y + player.height >= this.height
            || player.y <= 0;
    }
}

class AnimationHandler {
    private callback: (ctx: CanvasRenderingContext2D) => void;
    private canvasId: string;

    constructor(canvasId: string, callback: (ctx: CanvasRenderingContext2D) => void) {
        this.callback = callback;
        this.canvasId = canvasId;

        console.log(this);
    }

    public startAnimating() {
        setInterval(() => this.animate(this.canvasId), 30);
    }

    public animate(id: string) {

        var canvas : any = document.getElementById(id);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var context = canvas.getContext("2d");
        context.globalCompositeOperation = 'destination-over';

        context.clearRect(0, 0, canvas.width, canvas.height);

        this.callback(context);
    }

}

window.onload = function () {

    let player = new Player(100, 100, 100, 100, "https://media.team254.com/2019/03/8d8d079d-backlash-icon-retina.png",
        ["assets/sounds/1.wav", "assets/sounds/2.mp3", "assets/sounds/3.wav", "assets/sounds/4.wav"]);

    let animationHandler = new AnimationHandler("canvas", (ctx: CanvasRenderingContext2D) => {
        player.move(new Environment(window.innerWidth, window.innerHeight), 5);
        player.draw(ctx);
    });

    animationHandler.startAnimating();
}
