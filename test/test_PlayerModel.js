import PlayerModel from "../src/models/PlayerModel.js";

let chai = require("chai");
    let sinon = require("sinon");

    let assert = chai.assert;
    let expect = chai.expect;


describe("Player Model", function () {
    

    it("Can be created", function () {
        let model = new PlayerModel();
        assert.isOk(true);
    });

    it('Can be created with a specified starting health and maximum health', function () {
        let model = new PlayerModel(50, 200);
        assert.equal(model.health, 50);
        assert.equal(model.max_health, 200);
    });

    it("Starts out with a max speed of 200", function () {
        let model = new PlayerModel();
        assert.equal(model.max_speed, 200);
    });

    it('can change max speed', function () {
        let model = new PlayerModel();
        model.change_max_speed(500);
        assert.equal(model.max_speed, 500);
    });

    it('can not set a negative max speed', function () {
        let model = new PlayerModel();
        model.change_max_speed(-5);
        assert.equal(model.max_speed, 0);
    });

    it('throws an error if you choose a non-number for speed', function () {
        let model = new PlayerModel();
        expect(model.change_max_speed.bind(model, "a")).to.throw('Speed in PlayerModel.change_speed must be a number.');
    });

    it("Can store and retrieve integer speeds", function () {
        let model = new PlayerModel();
        model.speed = 5;
        assert.equal(model.speed, 5);
    });

    it('Default starts with a health of 100', function () {
        let model = new PlayerModel();
        assert.equal(model.health, 100);
    });

    it('Default starts with a max health of 100', function () {
        let model = new PlayerModel();
        assert.equal(model.max_health, 100);
    });

    it('can be damaged by a specified amount', function () {
        let model = new PlayerModel();
        model.damage(10);
        assert.equal(model.health, 90);
    });

    it('can not be damaged by a negative amount', function () {
        let model = new PlayerModel();
        expect(model.damage.bind(model, -1)).to.throw('Negative damage not allowed in PlayerModel.');
    });

    it('can be healed by a specified amount when there is room to heal', function () {
        let model = new PlayerModel(50, 100);
        model.heal(10);
        assert.equal(model.health, 60);
    });

    it('when healing more than the maximum amount of health, it simply fills to the maximum level', function () {
        let model = new PlayerModel(95, 100);
        model.heal(10);
        assert.equal(model.health, 100);
    });

    it('can not heal a negative amount', function () {
        let model = new PlayerModel();
        expect(model.heal.bind(model, -1)).to.throw('Negative heal not allowed in PlayerModel.');
    });

    it('starts with a default gun model', function () {
        let model = new PlayerModel();
        assert.equal(model.gun.constructor.name, 'GunModel');
    });
    //toggle test
    it('starts with the default weapon', function () {
        let model = new PlayerModel(100,100);
        model.fireType = 0;
        assert.equal(model.fireType, 0);
    });
    it('toggle adds one', function () {
        let model = new PlayerModel();
        model.fireType = 1;
        model.toggleFireMode();
        assert.equal(model.fireType, 1);
        console.log(model.fireType);
    });
    it('toggleFireMode cannot be used directly after being used', function () {
        let model = new PlayerModel();
        model.toggleFireMode();
        assert.equal(model.canBeToggled(), false);
        console.log(model.fireType);
    });
    it('toggleFireMode can be used 500 ms after being used', function () {
        let clock = sinon.useFakeTimers();
        let model = new PlayerModel();
        model.toggleFireMode();
        clock.tick(500);
        assert.equal(model.canBeToggled(), true);
        console.log(model.fireType);
    });
    it('toggleFireMode cannot be used 499 ms after being used', function () {
        let clock = sinon.useFakeTimers();
        let model = new PlayerModel();
        model.toggleFireMode();
        clock.tick(499);
        assert.equal(model.canBeToggled(), false);
        console.log(model.fireType);
    });

    
    


});
