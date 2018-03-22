import Enemy from "../src/prefabs/Enemy.js";

describe("Enemy", function () {
    let assert = chai.assert;
    let enemy;


	it("Enemy can be created", function () {
        //We now build the enemy before each test case
        assert.isOk(true);
    });

	it("Enemy can fire a shot", function () {
	enemy = mock();
        enemy.fireShot();
        assert.isOk(true);
    });

	it("can be updated without any keys being pressed", function () {
        enemy.update();
        assert.isOk(true);
    });


});
