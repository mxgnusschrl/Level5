import { flattenDiagnosticMessageText } from "../../node_modules/typescript/lib/typescript";

export default class Level5 extends Phaser.Scene {

    Coinszahl: Phaser.GameObjects.Text;
    Coinscounter = 0;
    Coin: Phaser.GameObjects.Image; 
    Distance: Phaser.GameObjects.Text;
    Distancezahl: Phaser.GameObjects.Text;
    Distancecounter = 0;
    Tutorialtext: Phaser.GameObjects.Text;
    Tutorialsubtitletext: Phaser.GameObjects.Text;
    Fullscreenevent;
    soundbutton: Phaser.GameObjects.Image;
    muted = true;
    clicksound;
    backgroundmusic;
    hearts;
    heartscounter = 1;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;;
    keyA;
    keyD;
    keyJump;
    map:  Phaser.Tilemaps.Tilemap;
    hasjumped;
    jumpcounter;
    spawnpoint;

    private paralaxbackgrounds: {ratioX: number, sprite: Phaser.GameObjects.TileSprite} [] = []


    constructor() {

        super("Level5")

    }
    preload() {
        this.load.spritesheet("hearts", "/htdocs/assets/images/hearts.png", {frameWidth: 128, frameHeight: 128})
        this.load.spritesheet("soundbutton", "/htdocs/assets/images/sound.png", {frameWidth: 395, frameHeight: 275});
        this.load.spritesheet("player", "/htdocs/assets/images/player.png", {frameWidth: 28, frameHeight: 53})
        this.load.spritesheet("playerjump", "/htdocs/assets/images/playerjump.png", {frameWidth: 33, frameHeight: 54})
        this.load.audio("click", ["/htdocs/assets/sounds/click.mp3", "/htdocs/assets/sounds/click.ogg"]);
        this.load.audio("backgroundmusic", ["/htdocs/assets/sounds/backgroundmusic.mp3", "/htdocs/assets/sounds/backgroundmusic.ogg"]);
        this.load.image("coin", "/htdocs/assets/images/coin.png");

        this.load.image("spritesheet5", "/htdocs/assets/images/spritesheet5.png")
        this.load.image("spritesheet_objects", "/htdocs/assets/images/spritesheet_objects.png")
        this.load.tilemapTiledJSON("map5", "/htdocs/assets/maps/level5.json")

        this.load.image("background", "/htdocs/assets/images/background.png")
        this.load.image("mountains", "/htdocs/assets/images/mountains.png")

    }

    create() {

        this.add.image(0, 0, "background").setOrigin(0,0).setScale(2.5).setDepth(-3).setScrollFactor(0)

        this.paralaxbackgrounds.push( {
            ratioX: 0.1,
            sprite: this.add.tileSprite(0, 690, innerWidth, 400, "mountains").setOrigin(0,0).setScrollFactor(0).setDepth(-3)

        })

        
 
        
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.Coin = this.add.image(65, 50, "coin").setOrigin(0.5).setScrollFactor(0).setScale(0.6);

        this.clicksound = this.sound.add("click", {

            volume: 0.5,
            loop: false

        });
        this.backgroundmusic = this.sound.add("backgroundmusic", {

            volume: 0.5,
            loop: true

        });


        this.hearts = this.add.image(50, 1025, "hearts", 0)
        .setScrollFactor(0)
        .setScale(0.6)
        .setOrigin(0.5)

        this.soundbutton = this.add.image(1825, 50, "soundbutton", 1)
        .setInteractive()
        .setScrollFactor(0)
        .setScale(0.25)
        .setOrigin(0.5)

        .on("pointerdown", () => {

            if(this.muted == true) {
                this.soundbutton.setFrame(0);
                this.muted = false;
                this.sound.play("click");
                this.backgroundmusic.play()


            } else if (this.muted == false) {
                this.soundbutton.setFrame(1);
                this.muted = true;
                this.sound.play("click")
                this.backgroundmusic.stop()
            }


        })

        

        this.Distance = this.add.text(screenCenterX, 50, "DISTANCE", {


            stroke: "#ff0000",
            strokeThickness: 5,
            fontFamily: "supermario",
            color: "#ffffff",
            align: "center",
            fontSize: "50px"


        }).setScrollFactor(0).setOrigin(0.5)

                

        this.Tutorialtext = this.add.text(screenCenterX, 300, "", {


            stroke: "#000000",
            strokeThickness: 5,
            fontFamily: "supermario",
            color: "#ffffff",
            align: "center",
            fontSize: "25px"


        }).setScrollFactor(0).setOrigin(0.5)

        this.Tutorialsubtitletext = this.add.text(screenCenterX, 340, "", {


            stroke: "#000000",
            strokeThickness: 5,
            fontFamily: "supermario",
            color: "#ffffff",
            align: "center",
            fontSize: "15px"


        }).setScrollFactor(0).setOrigin(0.5)

        
        this.Distancezahl = this.add.text(screenCenterX, 100, "" + this.Distancecounter, {


            stroke: "#ff0000",
            strokeThickness: 5,
            fontFamily: "supermario",
            color: "#ffffff",
            align: "center",
            fontSize: "45px"


        }).setScrollFactor(0).setOrigin(0.5)


        this.Coinszahl = this.add.text(150, 50, "" + this.Coinscounter, {


            stroke: "#ffffff",
            strokeThickness: 5,
            fontFamily: "supermario",
            color: "#ffffff",
            align: "center",
            fontSize: "55px"


        }).setScrollFactor(0).setOrigin(0.5)

        this.Fullscreenevent = this.input.keyboard.addKey("F");

        this.Fullscreenevent.on("down", function() {
    
    
            if(this.scale.isFullscreen) {
                
                this.scale.stopFullscreen();
                
            } else {
    
                this.scale.startFullscreen();
    
            }
    
        }, this);




        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.anims.create({
            
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7}),
            frameRate: 15,
            repeat: -1
            
        });
        
        this.anims.create({
            
            key: "jump",
            frames: [{ key: "playerjump", frame: "0" }],
            frameRate: 15,
            repeat: -1,
            
        });

        this.anims.create({
            
            key: "idle",
            frames: [{ key: "player", frame: "8" }],
            frameRate: 15,
            repeat: -1
            
        });


        this.map = this.make.tilemap({
            key: "map5"
        })

        const spritesheet5 = this.map.addTilesetImage("spritesheet alienmap 128x128","spritesheet5");
        const spritesheet_objects = this.map.addTilesetImage("spritesheet_objects","spritesheet_objects");
        

        
        const base = this.map.createLayer("boden", spritesheet5).setDepth(-1)
        const lethal_blocks = this.map.createLayer("lethal blocks", spritesheet5).setDepth(-1)
        // const deko = this.map.createLayer("deko", spritesheet_objects).setDepth(-1)
        

        let objectlayer = this.map.getObjectLayer("objects");
        this.spawnpoint = objectlayer.objects.find(o => o.type == "spawnpoint");
        
        let collectables = this.map.getObjectLayer("collectables");
        let coins = collectables.objects.find(o => o.type == "coins");
        let hearts = collectables.objects.find(o => o.type == "hearts");

        var collectableslayer = this.map.createFromObjects("collectables", [{
            gid: 322,
            key: "coin"
        },
        {
            gid: 326,
            key: "hearts"
        }])
        
        this.player = this.physics.add.sprite(this.spawnpoint.x, this.spawnpoint.y, "player").setOrigin(0.5, 1)
        .setScale(2.5).refreshBody()
        this.player.body.bounce.y = 0.2;
        this.cameras.main.startFollow(this.player,true, 0.5, 0.5, 0.5, 0.5)
        this.cameras.main.setRoundPixels(true);
        collectableslayer.forEach( (collectable:Phaser.Physics.Arcade.Sprite) => {
            this.physics.world.enable(collectable);
            //@ts-ignore
            collectable.body.setAllowGravity(false);
            
            this.physics.add.overlap(this.player, collectable, this.collect, null, this)
        })
       
        
   


        

         
        lethal_blocks.setCollisionByProperty({
            collides:true
        })

        this.physics.add.collider(base, collectableslayer, null, null, this)
        this.physics.add.collider(lethal_blocks,this.player,()=>this.damage(),null,this)



        this.physics.world.setBounds(0, 0, this.map.width, this.map.height, false, false, true, true);
        this.physics.add.collider(this.player, base);
        base.setCollisionByProperty({
            collides: true
        });

        
    
    
       
    }

    collect(player: Phaser.Physics.Arcade.Sprite, collectable: Phaser.Physics.Arcade.Sprite) {

        
        if(collectable.texture.key == "coin") {
            
            collectable.destroy(true)
            this.Coinscounter++;
            this.Coinszahl.setText("" + this.Coinscounter)
            
        } else if(collectable.texture.key == "hearts") {
            
            this.hearts.setFrame(1)
            collectable.destroy(true)
            this.heartscounter = 2;

        }


    } 
    damage(){
if(this.heartscounter==2){
    this.heartscounter=1
    this.player.setX(this.spawnpoint.x)
    this.player.setY(this.spawnpoint.y)
    this.Distancecounter=0
    this.hearts.setFrame(0)
}else{
this.die()
}
    }
    die(){
        this.scene.start("Leveloverview");
    }
    

    update() {


        if(this.Distancecounter>150){
            this.scene.start("Leveloverview")
        }
    

        this.jumpcounter++;

        if(!this.cursors) {
    
            return;
        }
        
        if(this.cursors.left.isDown || this.keyA.isDown) {
      
            this.player.setVelocityX(-400)
            if(this.Distancecounter > 0) {
                this.Distancecounter = this.Distancecounter - 0.03
                this.Distancezahl.setText("" + Math.round(this.Distancecounter))
            }
 
            if(this.player.body.blocked.down) {

                this.player.anims.play("walk", true)
            }

            
        } else if (this.cursors.right.isDown || this.keyD.isDown) {

 
            this.player.setVelocityX(400)
            if(this.player.body.blocked.left || this.player.body.blocked.right) {

            } else {
                this.Distancecounter = this.Distancecounter + 0.03
                this.Distancezahl.setText("" + Math.round(this.Distancecounter))
            

            }
            


            if(this.player.body.blocked.down) {
                this.player.anims.play("walk", true)
            }
            
        } else {
            this.player.setVelocityX(0)

            if (this.player.body.blocked.down) {
                this.player.play('idle', true);
              }

            
        }

        if(this.keyJump.isDown) {

            if(this.player.body.blocked.down) {

                this.hasjumped = false;

            
                this.jumpcounter = 0;
                this.player.setVelocityY(-400);
                this.player.anims.play("jump")

                
            }
            
            
        }
        if(this.player.body.blocked.down){
            this.hasjumped=false
        }
        if(this.keyJump.isDown && this.jumpcounter > 30 && this.hasjumped == false) {
            this.player.setVelocityY(-400);
            this.player.anims.play("jump")
            this.jumpcounter = 0;
            this.hasjumped = true;
        }

        if (this.player.body.velocity.x > 0) {
            this.player.setFlipX(false);
          } else if (this.player.body.velocity.x < 0) {
            this.player.setFlipX(true);
          }

        for(let i = 0; i < this.paralaxbackgrounds.length; ++i) {
            const pbg = this.paralaxbackgrounds[i];

            pbg.sprite.tilePositionX = this.cameras.main.scrollX * pbg.ratioX
        }
        if(this.player.y>this.map.heightInPixels-50){   
        this.damage()
        }
        


    }
}