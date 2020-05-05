import Enemy from './enemy';
import HomingShot from './homingShot';
import Vector from './vector';
import imagePath from '../assets/images/boss/boss_sprites/Attack_01_000.png';
import explosionSoundPath from '../assets/sounds/Explosion2.mp3';
import destroyedPath1 from '../assets/images/boss/effects_sprites/Explosion_005.png';
import destroyedPath2 from '../assets/images/boss/effects_sprites/Explosion_006.png';
import destroyedPath3 from '../assets/images/boss/effects_sprites/Explosion_007.png';
import destroyedPath4 from '../assets/images/boss/effects_sprites/Explosion_008.png';

type Mode = 'coming' | 'fighting';

class Boss extends Enemy {
  private mode: Mode;
  public homingShotList: HomingShot[];

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 120, 132, imagePath, 3);

    this.mode = 'coming';
    this.homingShotList = null;
    this.explosionSound = new Audio(explosionSoundPath);
  }

  public setHomingShotList(homingShotList: HomingShot[]) {
    this.homingShotList = homingShotList;
  }

  public fireHoming(x = 0.0, y = 1.0, speed = 3.0) {
    for (const homingShot of this.homingShotList) {
      if (homingShot.life <= 0) {
        homingShot.set(this.point.x, this.point.y, speed);
        homingShot.setVector(x, y);

        break;
      }
    }
  }

  public update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
        this.setImage(120, 132, destroyedPath1);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(120, 132, destroyedPath2);
      } else if (this.frame >= 16 && this.frame < 24) {
        this.setImage(120, 132, destroyedPath3);
      } else if (this.frame >= 24 && this.frame < 32) {
        this.setImage(120, 132, destroyedPath4);
      } else if (this.frame >= 32) {
        this.setImage(120, 132, imagePath);
        this.isDestroyed = false;

        return;
      }

      this.frame++;
      this.draw();
    }

    if (this.life <= 0) return;

    switch (this.mode) {
      case 'coming':
        this.point.y += this.speed;

        if (this.point.y >= 102) {
          this.point.y = 102;
          this.mode = 'fighting';
          this.frame = 0;
        }

        break;
      case 'fighting':
        if (this.frame % 1000 < 500) {
          if (this.frame % 12 === 0) {
            const tx = this.target.point.x - this.point.x;
            const ty = this.target.point.y - this.point.y;
            const tv = Vector.calcUnitVector(tx, ty);

            this.fire(tv.x, tv.y);
          }
        } else if (this.frame % 50 === 0) {
          this.fireHoming(0, 1);
        }

        this.point.x += Math.cos(this.frame / 90) * 2;

        break;
      default:
        break;
    }

    this.frame++;
    this.draw();
  }
}

export default Boss;