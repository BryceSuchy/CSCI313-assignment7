import GunModel from "../src/models/GunModel.js";
import PlayerModel from "../src/models/PlayerModel.js";

describe("Gun Model", function () {
    let chai = require("chai");
    let sinon = require("sinon");
    let assert = chai.assert;

    it("Can be created", function () {
        let model = new GunModel();
        assert.isOk(true);
    });

    it('initially has 100 bullets with maximum capacity of 100', function () {
        let model = new GunModel();
        assert.equal(model.bullets, 100);
        assert.equal(model.max_bullets, 10);
    });

    it('can be created with a specified number of bullets and maximum capacity', function () {
        let model = new GunModel(12, 25);
        assert.equal(model.bullets, 12);
        assert.equal(model.max_bullets, 25);
    });

    it('has a method to check to see if it can be fired', function () {
        let model = new GunModel();
        assert.equal(model.canBeFired(), false);
    });
    
    //cannot shoot if bullets = 0
    it ('bullet cannot be fired if bullet = 0', function () {
        let model = new GunModel();
        model.bullets = 0;
        assert.equal(model.canBeFired(), false);
    });
    //cannot shoot if max_bullets = 0
    it ('bullet cannot be fired if max_bullet = 0', function () {
        let model = new GunModel();
        model.max_bullets = 0;
        assert.equal(model.canBeFired(), false);
    });
    
});
