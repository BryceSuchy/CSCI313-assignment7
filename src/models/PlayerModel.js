import GunModel from "./GunModel.js";

export default class PlayerModel {

    constructor(health = 100, max_health = 100) {
        this.max_speed = 200;
        this.health = health;
        this.max_health = max_health;
        this.gun = new GunModel();
        this.fireRate = 500;
        this.lastToggle = Date.now() - 500; //So that we can switch fire modes
        this.fireMode = 0;
    }

    change_max_speed(amount) {
        if ((typeof amount) != "number") {
            throw new Error('Speed in PlayerModel.change_speed must be a number.');
        }
        if (amount < 0) {
            amount = 0;
        }
        this.max_speed = amount;
    }

    add_max_speed(amount) {
    if ((typeof amount) != "number") {
            throw new Error('Speed in PlayerModel.change_speed must be a number.');
        }
        if (amount < 0) {
            amount = 0;
        }
        this.max_speed += amount;
    }


    damage(amount) {
        if (amount < 0) {
            throw new Error('Negative damage not allowed in PlayerModel.');
        }
        this.health -= amount;
    }

    heal(amount) {
        if (amount < 0) {
            throw new Error('Negative heal not allowed in PlayerModel.');
        }
        this.health += amount;
        if (this.health > this.max_health) {
            this.health = this.max_health;
        }
    }
   canBeToggled() {
    
        if (Date.now() - this.lastToggle >= this.fireRate) {
            return true;
        } else {
            return false;
        }
        this.lastToggle = Date.now();
    } 
   toggleFireMode() {

        if (this.canBeToggled()) {
            if (this.fireMode == 3) {
                this.fireMode = 0;
            } else if (this.fireMode != 3) {
                this.fireMode += 1;
            }
            if (this.fireMode == 0) {
                console.log("0");
            } else if (this.fireMode == 1) {
                console.log("1");
            } else if (this.fireMode == 2) {
                console.log("2");
            } else if (this.fireMode == 3) {
                console.log("3");
            } else {
                text.setText("ERROR")
            }
            this.lastToggle = Date.now();
            
        }
   

    }


}