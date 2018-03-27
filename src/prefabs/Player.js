import PlayerModel from "../models/PlayerModel.js";

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, bullets) {
        super(game, x, y, 'player', 0);

        this.playerModel = new PlayerModel(10, 10);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;
        this.playerModel.fireMode = 0;
        this.playerModel.fireRate = 500;

        this.bulletSpites = bullets;
        //this.fireRate = 500;
        this.playerModel.lastToggle = Date.now() - 500; //So that we can switch fire modes


        this.fireposition = {
            x: 160,
            y: 100
        };
        var style = { font: "25px Comic Sans MS", fill: "#FFFFFF" };
        var text = "'T' to Change Weapon	Type: Default      Ammo: " + this.playerModel.gun.bullets
        this.display_Text = this.game.add.text(400, 25, text, style);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.toggleButton = this.game.input.keyboard.addKey(Phaser.Keyboard.T);

        this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
        this.fireAnimation = this.animations.add("fire", [11, 12, 13]);
        this.fireAnimation.onComplete.add(this.playFly, this);
        this.animations.play("fly", 14, true);
        
    

    }

    update() {
        this.displayWeaponStats(this.playerModel.fireMode);
        // write your prefab's specific update code here
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.playerModel.max_speed;
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.playerModel.max_speed;
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.playerModel.max_speed;
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.playerModel.max_speed;
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0;
        }

        if (this.fireButton.isDown) {
            if (this.playerModel.fireMode == 0) {
                this.fire1();
            } else if (this.playerModel.fireMode == 1) {
                this.fire2();
            }  else if (this.playerModel.fireMode == 2) {
                this.fire3();
            } else if (this.playerModel.fireMode == 3) {
               this.fire4();
            }

        }

        if (this.toggleButton.isDown) {
            this.playerModel.toggleFireMode();
            console.log(this.playerModel.fireMode);
        }

    }

    setValue(val) {
        this.txtValue.text = val.toString();
    }
    //canBeToggled() {
    //    if (Date.now() - this.lastToggle >= 500) {
    //        return true;
    //    } else {
     //       return false;
     //   }
    //}
   // toggleFireMode() {

    //    if (this.canBeToggled()) {
    //        if (this.fireMode == 3) {
    //            this.fireMode = 0;
     //       } else if (this.fireMode != 3) {
     //           this.fireMode += 1;
     //       }
     //       if (this.fireMode == 0) {
     //           console.log("0");
     //       } else if (this.fireMode == 1) {
     //           console.log("1");
    //        } else if (this.fireMode == 2) {
    //            console.log("2");
     //       } else if (this.fireMode == 3) {
     //           console.log("3");
     //       } else {
     //           text.setText("ERROR")
     //       }
    //        this.lastToggle = Date.now();
            
    //    }

    //}

//default fireMode
fire1() {
    this.playerModel.fireRate = 500;
    if (this.playerModel.gun.canBeFired(this.playerModel.fireRate)) {
        this.playerModel.gun.fire();
        let bullet = this.bulletSpites.getFirstDead();

                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;

            this.animations.play("fire");
        }
}
//spray fireMode
fire2() {
    this.playerModel.fireRate = 50;
    if (this.playerModel.gun.canBeFired(this.playerModel.fireRate)) {
        this.playerModel.gun.fire();
        let bullet = this.bulletSpites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");
        }
}
//triple fireMode
fire3() {
    this.playerModel.fireRate = 500;
    if (this.playerModel.gun.canBeFired(this.playerModel.fireRate) && this.playerModel.gun.bullets >=3) {
        this.playerModel.gun.fire();
        this.playerModel.gun.bullets -= 2;
        let bullet = this.bulletSpites.getFirstDead(); //top bullet
           // if (bullet) {
           //     bullet.x = this.x + this.fireposition.x;
           //     bullet.y = this.y + this.fireposition.y-15;
            //    bullet.revive();
           // } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y - 15 +this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
                bullet.body.velocity.y = -50;
            //}
        let bullet2 = this.bulletSpites.getFirstDead(); //middle bullet
            //if (bullet2) {
            //    bullet2.x = this.x + this.fireposition.x;
            //    bullet2.y = this.y + this.fireposition.y;
            //    bullet2.revive();
            //} else {
                bullet2 = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet2, Phaser.Physics.ARCADE);
                bullet2.outOfBoundsKill = true;
                bullet2.checkWorldBounds = true;
                bullet2.body.velocity.x = 200;
            //}
        let bullet3 = this.bulletSpites.getFirstDead(); //bottom bullet
            //if (bullet3) {
            //    bullet3.x = this.x + this.fireposition.x;
            //    bullet3.y = this.y + 15 + this.fireposition.y;
            //    bullet3.revive();
            //} else {
                bullet3 = this.bulletSpites.create(this.x + this.fireposition.x, this.y + 15 + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet3, Phaser.Physics.ARCADE);
                bullet3.outOfBoundsKill = true;
                bullet3.checkWorldBounds = true;
                bullet3.body.velocity.x = 200;
                bullet3.body.velocity.y = 50;
            //}

            this.animations.play("fire");
        }
}
//fast fireMode
fire4() {
    this.playerModel.fireRate = 700;
    if (this.playerModel.gun.canBeFired(this.playerModel.fireRate)) {
        this.playerModel.gun.fire();
        let bullet = this.bulletSpites.getFirstDead();

            bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.outOfBoundsKill = true;
            bullet.checkWorldBounds = true;
            bullet.body.velocity.x = 1000;
            

            this.animations.play("fire");
        }
}

displayWeaponStats(value) {
    if (value == 0) {
        this.display_Text.setText("'T' to Change Weapon		Type: Default      Ammo: "+ this.playerModel.gun.bullets);
    } else if (value == 1) {
        this.display_Text.setText("'T' to Change Weapon		Type: Spray      Ammo: "+ this.playerModel.gun.bullets);
    } else if (value == 2) {
        this.display_Text.setText("'T' to Change Weapon		Type: Triple      Ammo: "+ this.playerModel.gun.bullets);
    } else if (value == 3) {
        this.display_Text.setText("'T' to Change Weapon		Type: Fast      Ammo: "+ this.playerModel.gun.bullets);
    } else {
        this.display_Text.setText("'T' to Change Weapon		Type: ERROR      Ammo: "+ this.playerModel.gun.bullets);
    }  
    //this.display_Text.setText("Hi");
}
damage(amt) {
    this.playerModel.damage(amt);
}

playFly() {
    this.animations.play("fly", 14, true);
}
}