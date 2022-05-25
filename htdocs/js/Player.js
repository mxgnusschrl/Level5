export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, player);
        this.Distancecounter = 0;
        this.scene = scene;
        this.scene.add.existing(this);
        let that = this;
        this.updateFunction = (time, delta) => {
            that.update();
        };
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.body.bounce.y = 0.2;
        // this.setGravityY(400)
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "jump",
            frames: [{ key: "playerjump", frame: "0" }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "idle",
            frames: [{ key: "player", frame: "8" }],
            frameRate: 10,
            repeat: -1
        });
    }
    ;
    // create() {
    //     console.log("gggg")
    //     this.cursors = this.scene.input.keyboard.createCursorKeys();
    //     this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    //     this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    //     this.keyJump = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //     this.body.bounce.y = 0.2;
    //     this.anims.create({
    //         key: "walk",
    //         frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7}),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     this.anims.create({
    //         key: "jump",
    //         frames: [{ key: "playerjump", frame: "0" }],
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     this.anims.create({
    //         key: "idle",
    //         frames: [{ key: "player", frame: "8" }],
    //         frameRate: 10,
    //         repeat: -1
    //     });
    // }
    update() {
        console.log("test");
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.setVelocityX(-200);
            if (this.Distancecounter > 0) {
                this.Distancecounter = this.Distancecounter - 0.03;
            }
            if (this.body.blocked.down) {
                this.anims.play("walk", true);
            }
        }
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.setVelocityX(200);
            if (this.body.blocked.left || this.body.blocked.right) {
            }
            else {
                this.Distancecounter = this.Distancecounter + 0.03;
            }
            this.anims.play("walk", true);
            if (this.body.blocked.down) {
            }
        }
        else {
            this.setVelocityX(0);
            if (this.body.blocked.down) {
                this.play('idle', true);
            }
        }
        if (this.keyJump.isDown) {
            if (this.body.blocked.down) {
                this.setVelocityY(-500);
                this.anims.play("jump");
            }
        }
        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        }
        else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }
}
//# sourceMappingURL=Player.js.map