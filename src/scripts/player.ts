import Point from './point';
import Character from './character';
import Shot from './shot';

interface IComing {
  isComing: boolean;
  startTime: number;
  startPosition: Point;
  endPosition: Point;
}

type KeyBoardEventKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'z';
type KeyDown<T> = { [key in KeyBoardEventKey]?: T };

class Player extends Character {
  private speed: number;
  private coming: IComing;
  public shotList: Shot[];
  private shotChecker: number;
  private shotDelay: number;
  public keyDown: KeyDown<boolean>;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 1, imagePath);

    this.speed = 2.5;
    this.coming = {
      isComing: false,
      startTime: null,
      startPosition: null,
      endPosition: null
    };
    this.shotList = null;
    this.shotChecker = 0;
    this.shotDelay = 10;
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

  public setShotList(shotList: Shot[]) {
    this.shotList = shotList;
  }

  public update() {
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
          for (const shot of this.shotList) {
            if (shot.life <= 0) {
              shot.set(this.point.x, this.point.y);
              this.shotChecker = -this.shotDelay;

              break;
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
