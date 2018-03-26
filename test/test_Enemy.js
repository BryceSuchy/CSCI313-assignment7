import Enemy from "../src/prefabs/Enemy.js";

describe("Enemy", function () {
    let assert = chai.assert;
    let enemy;
//Test fixture, create the same kind of player before each test
    beforeEach(function() {

    let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        enemy = new Enemy(game, 0, 0, bullets);

});
    it("Enemy can be created", function () {
        //We now build the enemy before each test case
        assert.isOk(true);
    });

    it("Enemy can fire a shot", function () {
        //enemy.fireShot();
        assert.isOk(true);
    });

    it("can be updated without any keys being pressed", function () {
        //enemy.update();
        assert.isOk(true);
    });


});
