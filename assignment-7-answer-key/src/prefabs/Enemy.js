export default class Enemy extends Phaser.Sprite {

    constructor(game, x, y, bulletLayer, frame) {
        super(game, x, y, 'enemy', frame);

        // initialize your prefab here
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.velocity.x = -175;
        this.bounceTick = Math.random() * 2;
	this.enemyPath = Math.floor((Math.random() * 4) + 1);

        this.bulletLayer = bulletLayer;

        this.outOfBoundsKill = true;

        this.willFire = Phaser.Utils.chanceRoll(50);

        console.log(this.willFire);

        if (this.willFire) {
            this.fireTimer = this.game.time.create(false);
            this.fireTimer.add(3500, this.fireShot, this);
            this.fireTimer.start();
        }
    }

    fireShot() {
        let bullet = this.bulletLayer.create(this.x, this.y, "enemyBullet");
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.x = -250;
    }

    update() {
	//this.enemyPath = Math.floor((Math.random() * 3) + 1);
	if(this.enemyPath == 1) {
		//this.x = this.x;
		this.bounceTick += .02;
		this.y += Math.sin(this.bounceTick) * 1;
		if(this.x <= 300) {
			this.body.velocity.x = 175;	
		}else if(this.x >= 1024) {
			this.body.velocity.x = -175;
		}
		 
		//this.y = Math.floor((Math.random() * 10) - 10);
	}else if(this.enemyPath == 2) { 
		this.y += Math.sin(this.bounceTick) * 1 + Math.cos(this.bounceTick) * 1;

	}else if(this.enemyPath == 3) {
		this.body.velocity.x = -200;
		this.x = this.x;

	}else {
		this.bounceTick += .02;
        	this.y += Math.sin(this.bounceTick) * 1;
	}
    }
}