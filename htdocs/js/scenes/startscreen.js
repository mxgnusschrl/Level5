export default class Startscreen extends Phaser.Scene {
    constructor() {
        super("Startsceen");
        this.muted = true;
    }
    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.Starttext.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 350
        });
    }
    preload() {
        this.load.audio("click", ["/htdocs/assets/sounds/click.mp3", "/htdocs/assets/sounds/click.ogg"]);
        this.load.spritesheet("soundbutton", "/htdocs/assets/images/sound.png", { frameWidth: 395, frameHeight: 275 });
        this.load.audio("backgroundmusic", ["/htdocs/assets/sounds/backgroundmusic.mp3", "/htdocs/assets/sounds/backgroundmusic.ogg"]);
        this.load.image("background", "/htdocs/assets/images/background.png");
        this.load.image("mountains", "/htdocs/assets/images/mountains.png");
    }
    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0).setScale(2.5).setDepth(-3).setScrollFactor(0);
        this.add.image(0, 0, "mountains").setOrigin(0, 0).setScale(2.5).setDepth(-3).setScrollFactor(0);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.clicksound = this.sound.add("click", {
            volume: 0.5,
            loop: false
        });
        this.backgroundmusic = this.sound.add("backgroundmusic", {
            volume: 0.5,
            loop: true
        });
        this.soundbutton = this.add.image(50, 50, "soundbutton", 1)
            .setInteractive()
            .setScrollFactor(0)
            .setScale(0.25)
            .setOrigin(0.5)
            .on("pointerdown", () => {
            if (this.muted == true) {
                this.soundbutton.setFrame(0);
                this.muted = false;
                this.sound.play("click");
                this.backgroundmusic.play();
            }
            else if (this.muted == false) {
                this.soundbutton.setFrame(1);
                this.muted = true;
                this.sound.play("click");
                this.backgroundmusic.stop();
            }
        });
        this.Bigtext = this.add.text(screenCenterX, 275, "SUPER", {
            fontFamily: "supermario",
            fontSize: "75px",
            color: "#FFFFFF",
            align: "center",
            stroke: "#000000",
            strokeThickness: 10
        })
            .setOrigin(0.5).setScrollFactor(0);
        this.Smalltext = this.add.text(screenCenterX, 400, "DARIO RUN", {
            fontFamily: "supermario",
            fontSize: "120px",
            color: "#FFFFFF",
            align: "center",
            stroke: "#000000",
            strokeThickness: 10
        })
            .setOrigin(0.5).setScrollFactor(0);
        this.Starttext = this.add.text(screenCenterX, 650, "", {
            fontSize: "70px",
            color: "#FFFFFF",
            align: "center",
        })
            .setOrigin(0.5).setScrollFactor(0).setRotation(-0.15);
        this.typewriteText("start");
        this.underline = this.add.rectangle(screenCenterX + 5, 680, 195, 3, 0xffffff, 1).setRotation(-0.15);
        this.add.tween({
            targets: [this.Starttext, this.underline],
            alpha: 0.1,
            yoyo: true,
            repeat: -1,
            duration: 1250
        });
        this.Enterevent = this.input.keyboard.addKey("enter");
        this.Enterevent.on("down", function () {
            this.sound.play("click");
            this.scene.start("Level5");
        }, this);
        this.Fullscreenevent = this.input.keyboard.addKey("F");
        this.Fullscreenevent.on("down", function () {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);
    }
    update() {
    }
}
//# sourceMappingURL=Startscreen.js.map