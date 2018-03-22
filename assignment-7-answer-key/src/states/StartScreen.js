export default class StartScreen {


    create() {
        console.log("Create?");
	this.startScreenBg = this.add.tileSprite(0, 0, 1024, 768, 'startScreenBg');
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game');
        }
    }

}