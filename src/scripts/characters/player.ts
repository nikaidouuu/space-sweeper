import Character from './character';
import Shot from './shots/shot';
import HomingShot from './shots/homingShot';
import Point from '../point';
import imagePath1 from '../../assets/images/player/explosion/Explosion_1_000.png';
import imagePath2 from '../../assets/images/player/explosion/Explosion_2_000.png';
import imagePath3 from '../../assets/images/player/explosion/Explosion_3_000.png';
import destroyedPath1 from '../../assets/images/player/explosion/Explosion_1_005.png';
import destroyedPath2 from '../../assets/images/player/explosion/Explosion_1_006.png';
import destroyedPath3 from '../../assets/images/player/explosion/Explosion_1_008.png';
import shotSoundPath from '../../assets/sounds/Shot.mp3';
import explosionSoundPath from '../../assets/sounds/Explosion1.mp3';

type Coming = {
  isComing: boolean;
  startTime: number;
  startPoint: Point;
  endPoint: Point;
};

class Player extends Character {
  public coming: Coming;
  public isDestroyed: boolean;
  private level: number;
  private shotList: Shot[];
  private levelTwoShotList: Shot[];
  private levelThreeShotList: HomingShot[];
  private shotChecker: number;
  private shotDelay: number;
  private readonly shotSound: HTMLAudioElement;
  private readonly explosionSound: HTMLAudioElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, imagePath1, 3.0, 0);

    this.coming = {
      isComing: false,
      startTime: null,
      startPoint: null,
      endPoint: null
    };
    this.isDestroyed = false;
    this.level = 1;
    this.shotList = null;
    this.levelTwoShotList = null;
    this.levelThreeShotList = null;
    this.shotChecker = 0;
    this.shotDelay = 10;
    this.shotSound = new Audio(shotSoundPath);
    this.explosionSound = new Audio(explosionSoundPath);
  }

  public set(startX: number, startY: number, endX: number, endY: number) {
    this.point.set(startX, startY);
    this.life = 1;
    this.coming.isComing = true;
    this.coming.startTime = Date.now();
    this.coming.startPoint = new Point(startX, startY);
    this.coming.endPoint = new Point(endX, endY);
  }

  public setShotList(shotList: Shot[], levelTwoShotList: Shot[], levelThreeShotList: HomingShot[]) {
    this.shotList = shotList;
    this.levelTwoShotList = levelTwoShotList;
    this.levelThreeShotList = levelThreeShotList;
  }

  public upgrade() {
    this.level++;

    switch (this.level) {
      case 1:
        this.setImage(80, 64, imagePath1);
        break;
      case 2:
        this.setImage(80, 64, imagePath2);
        break;
      case 3:
        this.setImage(88, 70, imagePath3);
        break;
      default:
        break;
    }
  }

  public render() {
    this.update();
    this.shotList.forEach(shot => shot.render());
    this.levelTwoShotList.forEach(shot => shot.render());
    this.levelThreeShotList.forEach(homingShot => homingShot.render());
  }

  private update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
        this.setImage(80, 64, destroyedPath1);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(80, 64, destroyedPath2);
      } else if (this.frame >= 16 && this.frame < 24) {
        this.setImage(80, 64, destroyedPath3);
      } else if (this.frame >= 24) {
        this.setImage(80, 64, imagePath1);
        this.level = 1;
        this.isDestroyed = false;

        return;
      }

      this.frame++;
      this.draw();
    }

    if (this.life <= 0) return;

    if (this.coming.isComing) {
      const comingTime = (Date.now() - this.coming.startTime) / 1000;
      let y = this.coming.startPoint.y - comingTime * 50;

      if (y <= this.coming.endPoint.y) {
        this.coming.isComing = false;
        y = this.coming.endPoint.y;
      }

      if (Date.now() % 100 < 30) {
        this.ctx.globalAlpha = 0.55;
      }

      this.point.set(this.point.x, y);
    } else {
      if (window.keyDown.ArrowLeft) {
        this.point.x -= this.speed;
      }

      if (window.keyDown.ArrowRight) {
        this.point.x += this.speed;
      }

      if (window.keyDown.ArrowUp) {
        this.point.y -= this.speed;
      }

      if (window.keyDown.ArrowDown) {
        this.point.y += this.speed;
      }

      if (window.keyDown.z) {
        if (this.shotChecker >= 0) {
          this.shotSound.play();

          if (this.shotSound.currentTime > 0) {
            this.shotSound.currentTime = 0;
          }

          for (const shot of this.shotList) {
            if (shot.life <= 0) {
              shot.set(this.point.x, this.point.y - 15, 10.0);
              this.shotChecker = -this.shotDelay;

              break;
            }
          }

          if (this.level >= 2) {
            for (let i = 0; i < this.levelTwoShotList.length; i += 2) {
              const leftShot = this.levelTwoShotList[i];
              const rightShot = this.levelTwoShotList[i + 1];
              const CCW = 260 * (Math.PI / 180);
              const CW = 280 * (Math.PI / 180);

              if (leftShot.life <= 0 && rightShot.life <= 0) {
                leftShot.set(this.point.x, this.point.y - 15, 10.0);
                leftShot.setVectorFromAngle(CCW);
                rightShot.set(this.point.x, this.point.y - 15, 10.0);
                rightShot.setVectorFromAngle(CW);
                this.shotChecker = -this.shotDelay;

                break;
              }
            }
          }

          if (this.level >= 3) {
            for (let i = 0; i < this.levelThreeShotList.length; i += 2) {
              const leftShot = this.levelThreeShotList[i];
              const rightShot = this.levelThreeShotList[i + 1];
              const CCW = 245 * (Math.PI / 180);
              const CW = 295 * (Math.PI / 180);

              if (leftShot.life <= 0 && rightShot.life <= 0) {
                leftShot.set(this.point.x, this.point.y - 15, 12.0);
                leftShot.setVectorFromAngle(CCW);
                rightShot.set(this.point.x, this.point.y - 15, 12.0);
                rightShot.setVectorFromAngle(CW);
                this.shotChecker = -this.shotDelay;

                break;
              }
            }
          }
        }

        this.shotChecker++;
      }

      const tx = Math.min(Math.max(this.point.x, this.width / 2), this.ctx.canvas.width - this.width / 2);
      const ty = Math.min(Math.max(this.point.y, this.height / 2), this.ctx.canvas.height - this.height / 2);
      this.point.set(tx, ty);
    }

    this.draw();
    this.ctx.globalAlpha = 1.0;
  }
}

export default Player;
