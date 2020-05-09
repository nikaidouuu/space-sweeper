import Enemy from './enemy';
import HomingShot from '../shots/homingShot';
import Vector from '../../vector';
import imagePath from '../../../assets/images/boss/boss_sprites/Attack_01_000.png';
import explosionSoundPath from '../../../assets/sounds/Explosion2.mp3';
import destroyedPath1 from '../../../assets/images/boss/effects_sprites/Explosion_005.png';
import destroyedPath2 from '../../../assets/images/boss/effects_sprites/Explosion_006.png';
import destroyedPath3 from '../../../assets/images/boss/effects_sprites/Explosion_007.png';
import destroyedPath4 from '../../../assets/images/boss/effects_sprites/Explosion_008.png';

type BossMode = 'coming' | 'fighting';

class Boss extends Enemy {
  private imageList: HTMLImageElement[];
  private homingShotList: HomingShot[];
  private mode: BossMode;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 120, 132, imagePath, explosionSoundPath, 2.0);

    this.imageList = [
      imagePath,
      destroyedPath1,
      destroyedPath2,
      destroyedPath3,
      destroyedPath4
    ].map(path => {
      const image = new Image();
      image.src = path;

      return image;
    });
    this.homingShotList = null;
    this.mode = null;
  }

  public setHomingShotList(homingShotList: HomingShot[]) {
    this.homingShotList = homingShotList;
  }

  public setMode(mode: BossMode) {
    this.mode = mode;
  }

  public render() {
    this.update();
    this.shotList.forEach(shot => shot.render());
    this.homingShotList.forEach(homingShot => homingShot.render());
  }

  private fireHoming(x = 0.0, y = 1.0, speed = 3.0) {
    for (const homingShot of this.homingShotList) {
      if (homingShot.life <= 0) {
        homingShot.set(this.point.x, this.point.y + 25.0, speed);
        homingShot.setVector(x, y);

        break;
      }
    }
  }

  private update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
        this.setImage(120, 132, this.imageList[1]);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(120, 132, this.imageList[2]);
      } else if (this.frame >= 16 && this.frame < 24) {
        this.setImage(120, 132, this.imageList[3]);
      } else if (this.frame >= 24 && this.frame < 32) {
        this.setImage(120, 132, this.imageList[4]);
      } else if (this.frame >= 32) {
        this.setImage(120, 132, this.imageList[0]);
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

        if (this.point.y >= 100.0) {
          this.point.y = 100.0;
          this.mode = 'fighting';
          this.frame = 0;
        }

        break;
      case 'fighting':
        if (this.frame % 1000 < 500) {
          if (this.frame % 120 > 60 && this.frame % 10 === 0) {
            const tx = this.target.point.x - this.point.x;
            const ty = this.target.point.y - this.point.y;
            const tv = Vector.calcUnitVector(tx, ty);

            this.fire(tv.x, tv.y, 3.0);
          }
        } else if (this.frame % 80 === 0) {
          this.fireHoming();
        }

        this.point.x += Math.cos(this.frame / 90) * this.speed;

        break;
      default:
        break;
    }

    this.frame++;
    this.draw();
  }
}

export default Boss;
