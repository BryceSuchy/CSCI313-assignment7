export default class GunModel {


    constructor(bullets = 100, max_bullets = 10) {
        this.bullets = bullets;
        this.max_bullets = max_bullets;
        this.lastFire = Date.now() - 500; //So that we can fire the gun
    }

    fire() {
        this.lastFire = Date.now();
        if (this.bullets > 0)
        {
            this.bullets -= 1;
        }
    }

    canBeFired() {
        if (Date.now() - this.lastFire >= 500 && this.bullets > 0) {
            return true;
        } else {
            return false;
        }
    }
    //input a value to change fireRate,
    canBeFired(fireRateTime) {
        if (Date.now() - this.lastFire >= fireRateTime && this.bullets > 0) {
            return true;
        } else {
            return false;
        }
    }

    addBullets(bulletAmount) {
        this.bullets += bulletAmount;
    }
}