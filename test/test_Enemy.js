import Enemy from "../src/prefabs/Enemy.js";

describe("Enemy", function () {
    let assert = chai.assert;
    let enemy;
//Test fixture, create the same kind of player before each test
    

    let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();
	let frame = sinon.stub();
	this.bounceTick = Math.random() * 2;


        enemy = new Enemy(game, 0, 0, bullets, frame);


    it("Enemy can be created", function () {
        //We now build the enemy before each test case
        assert.isOk(true);
    });

    it("can be updated without any keys being pressed", function () {
        enemy.update();
        assert.isOk(true);
    });

    it("Enemy path 1 is valid with velocity change", function () {
    	enemy.enemyPath = 1;
	enemy.bouceTick = .02;
	enemy.y = 0;
	enemy.x = 350;
	enemy.update();
	assert.equal(enemy.body.velocity.x, -200);
	assert.equal(enemy.y,  Math.sin(enemy.bounceTick) * 1);
    });

    it("Enemy path 1 is valid with reverse velocity change", function () {
    	enemy.enemyPath = 1;
	enemy.bouceTick = .02;
	enemy.y = 0;
	enemy.x = 1050;
	enemy.update();
	assert.equal(enemy.body.velocity.x, -175);
	assert.equal(enemy.y,  Math.sin(enemy.bounceTick) * 1);
    });


    it("Enemy path 2 is valid", function () {
    	enemy.enemyPath = 2;
	enemy.bounceTick = .02;
	enemy.y = Math.sin(enemy.bounceTick) * 1 + Math.cos(enemy.bounceTick) * 1;
	enemy.update
	assert.equal(enemy.y, 1.019798673359911);
    });

    it("Enemy path 3 is valid", function () {
    	enemy.enemyPath = 3;
	enemy.body.velocity.x = -200;
	assert.equal(enemy.body.velocity.x, -200);
    });

    it("Enemy path 4 is valid", function () {
    	enemy.enemyPath = 4;
	enemy.bounceTick = .02;
        enemy.y = 0;
	enemy.update();
	assert.equal(enemy.y, 0.03998933418663416);
    });


});
