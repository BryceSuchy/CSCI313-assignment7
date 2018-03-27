import Player from "../src/prefabs/Player.js";
import PlayerModel from "../src/models/PlayerModel.js";


describe("Player", function () {
    let chai = require("chai");
    let sinon = require("sinon");

    let assert = chai.assert;
    let expect = chai.expect;
    let player;

    //Test fixture, create the same kind of player before each test
    //beforeEach(function() {
        // Stubbing out the features not used in constructor
        let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        player = new Player(game, 0, 0, bullets);
    //});

    it("Can be created", function () {
        //We now build the player before each test case
        assert.isOk(true);
    });

    it("Plays an animation after being created", function () {
        //We now build the player before each test case
        assert.isOk(player.animations.play.called);
    });

    it("can be updated without any keys being pressed", function () {
        player.update();
        assert.isOk(true);
    });

    it("changes velocity when the left button is pressed", function () {
        player.cursors.left.isDown = true;
        player.update();

        //Not testing the model, so we can use the max_speed
        assert.equal(player.body.velocity.x, -player.playerModel.max_speed);

        //Reverting button push
        player.cursors.left.isDown = false;
    });
//tests by cal
    it('toggle method changes the fireMode to the next one', function () {
        player = new Player(game, 0, 0, bullets);
        model.PlayerModel.fireMode() = 0;
        model.PlayerModel.toggleFireMode();
        assert.equal(model.PlayerModel.fireMode, 1);
    });
    it('removes three bullets while in triple fire mode', function () {
        let model = new PlayerModel();
        model.fireMode() = 2;
        model.fire();
        assert.equal(model.bullets, 99);
    });
//checks to see if firemodes reduce bullets correctly
    it('firing fireMode 1 reduces bullet by one', function () {
        let model = new PlayerModel();
        model.fire1();
        assert.equal(model.bullets, 99);
    });
    it('firing fireMode 2 reduces bullet by one', function () {
        let model = new PlayerModel();
        model.fire2();
        assert.equal(model.bullets, 99);
    });
    it('firing fireMode 3 reduces bullet by 3', function () {
        let model = new PlayerModel();
        model.fire3();
        assert.equal(model.bullets, 97);
    });
    it('firing fireMode 4 reduces bullet by one', function () {
        let model = new PlayerModel();
        model.fire4();
        assert.equal(model.bullets, 99);
    });
    //checks to see if fireModes can be fired directly after being fired
    it('fire1 can not be fired immediatly after being fired', function () {
        let model = new PlayerModel();
        model.fire1();
        assert.equal(model.canBeFired(), false);
    });
    it('fire2 can not be fired immediatly after being fired', function () {
        let model = new PlayerModel();
        model.fire2();
        assert.equal(model.canBeFired(), false);
    });
    it('fire3 can not be fired immediatly after being fired', function () {
        let model = new PlayerModel();
        model.fire3();
        assert.equal(model.canBeFired(), false);
    });
    it('fire4 can not be fired immediatly after being fired', function () {
        let model = new PlayerModel();
        model.fire4();
        assert.equal(model.canBeFired(), false);
    });
    //checks to see if fireModes can be fired N milleseconds after firing
    it('fire1 can be fired 500 milliseconds after the last firing', function () {
        let clock = sinon.useFakeTimers();
        let model = new PlayerModel();
        model.fire1();
        //Stub the clock ahead by 500 milliseconds
        clock.tick(500);

        assert.equal(model.canBeFired(500), true);
        clock.restore()
    });
    it('fire2 can be fired 50 milliseconds after the last firing', function () {
        let clock = sinon.useFakeTimers();
        let model = new PlayerModel();
        model.fire2();
        //Stub the clock ahead by 50 milliseconds
        clock.tick(50);

        assert.equal(model.canBeFired(50), true);
        clock.restore()
    });
    it('fire3 can be fired 500 milliseconds after the last firing', function () {
        let clock = sinon.useFakeTimers();
        let model = new PlayerModel();
        model.fire3();
        //Stub the clock ahead by 500 milliseconds
        clock.tick(500);

        assert.equal(model.canBeFired(500), true);
        clock.restore()
    });
    it('fire4 can be fired 700 milliseconds after the last firing', function () {
        let clock = sinon.useFakeTimers();
        let model = new playerModel();
        model.fire4();
        //Stub the clock ahead by 700 milliseconds
        clock.tick(700);

        assert.equal(model.gun.canBeFired(700), true);
        clock.restore()
    });



    //Tests you could add..
    // 1) What happens when you press the other keys?
    // 2) What happens when combinations of two, three, or four arrow keys are pressed simultaneously?
    //     - Note: Each combo wouldn't count individually in your assignment

    // More difficult because there are some missing stubs in the mock object
    // 1) What happens when the fire button is pressed?

});
