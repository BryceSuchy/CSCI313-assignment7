export default class GameOver {


    create() {
	this.gameOver = this.add.tileSprite(0, 0, 1024, 768, 'gameOver');
    }

    update() {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game');
        }
    }

}