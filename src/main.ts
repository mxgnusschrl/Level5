import Startscreen from "./scenes/Startscreen.js"
import Tutorial from "./scenes/Tutorial.js"
import Level1 from "./scenes/Level1.js"
import Level2 from "./scenes/Level2.js"
import Level3 from "./scenes/Level3.js"
import Level4 from "./scenes/Level4.js"
import Level5 from "./scenes/Level5.js"
import Leveloverview from "./scenes/Leveloverview.js"


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	audio: {
        disableWebAudio: true
    },
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: {
				y: 550
			}
		}
	},
	scene: [Level5, Tutorial, Level1, Level2, Level3, Level4, Startscreen, Leveloverview]
}

export default new Phaser.Game(config)
