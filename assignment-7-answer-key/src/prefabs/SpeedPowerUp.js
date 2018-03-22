export default class SpeedPowerUp extends Phaser.Sprite {

    constructor(game, x, y, bulletLayer, frame) {
        super(game, x, y, 'speed', frame);

        // initialize your prefab here
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.velocity.x = -175;
        this.bounceTick = Math.random() * 2;
	
        this.bulletLayer = bulletLayer;

        this.outOfBoundsKill = true;

        }

    update() {
	this.bounceTick += .02;
        this.y += Math.sin(this.bounceTick) * 1;
    }
}