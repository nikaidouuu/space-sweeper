import Point from './point';
import Character from './character';
import Shot from './shot';
import imagePath1 from '../assets/images/player/explosion/Explosion_1_000.png';
import imagePath2 from '../assets/images/player/explosion/Explosion_2_000.png';
import destroyedPath1 from '../assets/images/player/explosion/Explosion_1_005.png';
import destroyedPath2 from '../assets/images/player/explosion/Explosion_1_006.png';
import destroyedPath3 from '../assets/images/player/explosion/Explosion_1_008.png';
import shotSoundPath from '../assets/sounds/Shot.mp3';
import explosionSoundPath from '../assets/sounds/Explosion1.mp3';

type Coming = {
  isComing: boolean;
  startTime: number;
  startPosition: Point;
  endPosition: Point;
};

type KeyBoardEventKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'z';
type KeyDown<T> = { [key in KeyBoardEventKey]?: T };

class Player extends Character {
  public level: number;
  private speed: number;
  public coming: Coming;
  public shotList: Shot[];
  public levelTwoShotList: Shot[];
  private shotChecker: number;
  private shotDelay: number;
  private shotSound: HTMLAudioElement;
  private explosionSound: HTMLAudioElement;
  public isDestroyed: boolean;
  public keyDown: KeyDown<boolean>;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, 1, imagePath1);

    this.level = 1;
    this.speed = 2.5;
    this.coming = {
      isComing: false,
      startTime: null,
      startPosition: null,
      endPosition: null
    };
    this.shotList = null;
    this.levelTwoShotList = null;
    this.shotChecker = 0;
    this.shotDelay = 10;
    this.shotSound = new Audio(shotSoundPath);
    this.explosionSound = new Audio(explosionSoundPath);
    this.isDestroyed = false;
    this.keyDown = {};

    window.addEventListener('keydown', e => {
      this.keyDown[e.key] = true;
    });

    window.addEventListener('keyup', e => {
      this.keyDown[e.key] = false;
    });
  }

  public setComing(startX: number, startY: number, endX: number, endY: number) {
    this.coming.isComing = true;
    this.coming.startTime = Date.now();
    this.coming.startPosition = new Point(startX, startY);
    this.coming.endPosition = new Point(endX, endY);
    this.point.set(startX, startY);
  }

  public setShotList(shotList: Shot[], levelTwoShotList: Shot[]) {
    this.shotList = shotList;
    this.levelTwoShotList = levelTwoShotList;
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
      default:
        break;
    }
  }

  public update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
        this.setImage(80, 64, destroyedPath1);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(80, 64, destroyedPath2);
      } else if (this.frame >= 16 && this.frame < 24) {
        this.setImage(80, 64, destroyedPath3);
      } else if (this.frame >= 24) {
        this.isDestroyed = false;

        return;
      }

      this.frame++;
      this.draw();
    }

    if (this.life <= 0) return;

    if (this.coming.isComing) {
      const comingTime = (Date.now() - this.coming.startTime) / 1000;
      let y = this.coming.startPosition.y - comingTime * 50;

      if (y <= this.coming.endPosition.y) {
        this.coming.isComing = false;
        y = this.coming.endPosition.y;
      }

      if (Date.now() % 100 < 30) {
        this.ctx.globalAlpha = 0.5;
      }

      this.point.set(this.point.x, y);
    } else {
      if (this.keyDown.ArrowLeft) {
        this.point.x -= this.speed;
      }

      if (this.keyDown.ArrowRight) {
        this.point.x += this.speed;
      }

      if (this.keyDown.ArrowUp) {
        this.point.y -= this.speed;
      }

      if (this.keyDown.ArrowDown) {
        this.point.y += this.speed;
      }

      if (this.keyDown.z) {
        if (this.shotChecker >= 0) {
          this.shotSound.play();
          if (this.shotSound.currentTime > 0) {
            this.shotSound.currentTime = 0;
          }

          for (const shot of this.shotList) {
            if (shot.life <= 0) {
              shot.set(this.point.x, this.point.y);
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
                leftShot.set(this.point.x, this.point.y);
                leftShot.setVectorFromAngle(CCW);
                rightShot.set(this.point.x, this.point.y);
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
