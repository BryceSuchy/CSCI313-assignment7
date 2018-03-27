import HealthPowerUp from "../src/prefabs/HealthPowerUp.js";
import AmmoPowerUp from "../src/prefabs/AmmoPowerUp.js";
import SpeedPowerUp from "../src/prefabs/SpeedPowerUp.js";

describe("HealthPowerUp", function () {
    let chai = require("chai");
    let sinon = require("sinon");

    let assert = chai.assert;
    let health;
    
    let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        health = new HealthPowerUp(game, 0, 0, bullets);


    it("Health PowerUp can be created", function () {
        //We now build the player before each test case
        assert.isOk(true);
    });

    it("Health can be updated", function () {
    	health.bounceTick = .03;
	health.y = 0;
    	health.update();
    	assert.equal(health.y, 0.04997916927067833);    
    });

});

describe("AmmoPowerUp", function () {
    let assert = chai.assert;
    let ammo;
    
    let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        ammo = new AmmoPowerUp(game, 0, 0, bullets);


    it("Ammo PowerUp can be created", function () {
        //We now build the player before each test case
        assert.isOk(true);
    });

    it("Ammo Power Up can be updated", function () {
        ammo.bounceTick = .03;
	ammo.y = 0;
        ammo.update();
        assert.equal(ammo.y, 0.04997916927067833);
    });

});

describe("SpeedPowerUp", function () {
    let assert = chai.assert;
    let speed;
    
    let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        speed = new SpeedPowerUp(game, 0, 0, bullets);


    it("Speed PowerUp can be created", function () {
        //We now build the player before each test case
        assert.isOk(true);
    });

    it("Speed Power Up can be updated", function () {
        speed.bounceTick = .03;
	speed.y = 0;
        speed.update();
        assert.equal(speed.y, 0.04997916927067833);
    });


});
