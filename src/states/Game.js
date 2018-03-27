//require our other components
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import NumberBox from "../prefabs/NumberBox.js";
import HealthBar from "../prefabs/HealthBar.js";
import HealthPowerUp from "../prefabs/HealthPowerUp.js";
import SpeedPowerUp from "../prefabs/SpeedPowerUp.js";
import AmmoPowerUp from "../prefabs/AmmoPowerUp.js";



export default class Game extends Phaser.State {

    constructor() {
        //object level properties
        super();

    }

    create() {

        this.spawnChance = .05;
	this.PUspawnChance = .001;
        this.score = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg');

        this.bullets = this.add.group();
        this.enemyBullets = this.add.group();

        //add player
        this.player = new Player(this.game, 0, 0, this.bullets);
        this.game.add.existing(this.player);

        //add a few enemies..
        this.enemies = this.add.group();
        for (let i = 0; i < 10; i++) {
            let enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy);
        }

	//add a few powerups..
        this.healthpowerups = this.add.group();
	this.speedpowerups = this.add.group();
	this.ammopowerups = this.add.group();
	for (let i = 0; i < 1; i++) {
            let healthpowerup = new HealthPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.healthpowerups.add(healthpowerup);
	    let speedpowerup = new SpeedPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.speedpowerups.add(speedpowerup);
	    let ammopowerup = new AmmoPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.ammopowerups.add(ammopowerup);
        }

        //add the explosions
        this.explosions = this.game.add.emitter(0, 0, 200);
        this.explosions.makeParticles("hexagon");
        this.explosions.setAlpha(1, .2, 2000);

        //add UI
        this.setupUI();

        //wave timer
        this.waveTimer = this.game.time.create(false);
        this.waveTimer.loop(20000, this.incrementWave, this);
        this.waveTimer.start();
    }

    setupUI() {
        this.UILayer = this.add.group();

        this.scoreField = new NumberBox(this.game, "circle", 0);
        this.UILayer.add(this.scoreField);

        this.healthBar = new HealthBar(this.game, 120, 40, "health_bar", "health_holder");
        this.UILayer.add(this.healthBar);
    }

    update() {
        this.bg.tilePosition.x -= .5;

        if (Math.random() < this.spawnChance) {
            let enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy);
        }

        this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);


	if (Math.random() < this.PUspawnChance) {
            let healthpowerup = new HealthPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.healthpowerups.add(healthpowerup);
        } else if(Math.random() < this.PUspawnChance) {
	    let speedpowerup = new SpeedPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.speedpowerups.add(speedpowerup);
	}else if(Math.random() < this.PUspawnChance) {
	    let ammopowerup = new AmmoPowerUp(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.ammopowerups.add(ammopowerup);
	}
	
	this.physics.arcade.overlap(this.player, this.healthpowerups, this.healPlayer, null, this);
	this.physics.arcade.overlap(this.player, this.speedpowerups, this.speedBoost, null, this);
	this.physics.arcade.overlap(this.player, this.ammopowerups, this.addAmmo, null, this);

    }

    incrementWave() {
        this.spawnChance *= 1.2;
    }

    damagePlayer(playerRef, enemyRef) {
        this.player.damage(1);
        this.healthBar.setValue(this.player.playerModel.health / this.player.playerModel.max_health);
        enemyRef.kill();

        if (this.player.playerModel.health <= 0) {
            this.game.state.start('gameOver');
        }
    }

    speedBoost(playerRef, powerUpsRef) {
    	this.player.playerModel.add_max_speed(50);
	powerUpsRef.kill();
    }

    addAmmo(playerRef, powerUpsRef) {
	//this.player.playerModel.bullets += 20;
    this.player.playerModel.gun.addBullets(20);
    powerUpsRef.kill();
    }

    healPlayer(playerRef, powerUpsRef) {
	this.player.playerModel.heal(10);
	this.healthBar.setValue(this.player.playerModel.health / this.player.playerModel.max_health);
        powerUpsRef.kill();	
    }

    damageEnemy(enemy, bullet) {

        this.explosions.x = enemy.x;
        this.explosions.y = enemy.y;

        this.explosions.explode(2000, 4);

        enemy.kill();
        bullet.kill();

        this.score++;
        this.scoreField.setValue(this.score);
    }

}