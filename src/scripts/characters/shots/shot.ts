import Character from '../character';
import Player from '../player';
import Vector from '../../vector';
import Enemy from '../enemies/enemy';
import Boss from '../enemies/boss';
import Pillbug from '../enemies/pillbug';
import Fly from '../enemies/fly';
import Scorpion from '../enemies/scorpion';

class Shot extends Character {
  protected power: number;
  protected targetList: Array<Player | Enemy>;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, imagePath, 5.0, 0);

    this.power = 1;
    this.targetList = [];
  }

  public set(x: number, y: number, speed: number = 5.0, power: number = 1) {
    this.point.set(x, y);
    this.speed = speed;
    this.power = power;
    this.life = 1;
    this.frame = 0;
  }

  public setTargetList(targetList: Array<Player | Enemy>) {
    this.targetList = targetList;
  }

  public render() {
    this.update();
  }

  private update() {
    if (this.life <= 0) return;

    if (
      this.point.x + this.width < 0 ||
      this.point.x - this.width > this.ctx.canvas.width ||
      this.point.y + this.height < 0 ||
      this.point.y - this.height > this.ctx.canvas.height
    ) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;

    this.targetList.forEach(target => {
      if (this.life <= 0 || target.life <= 0) return;

      const distance = Vector.calcDistance(
        this.point.x - target.point.x,
        this.point.y - target.point.y
      );

      if (distance <= (this.width + target.width) / 4) {
        if (target instanceof Player) {
          if (target.coming.isComing) return;
        }

        target.life -= this.power;
        this.life = 0;

        if (target.life <= 0) {
          target.isDestroyed = true;
          target.frame = 0;

          if (target instanceof Pillbug) {
            window.score = Math.min(window.score + 500, 9999999);
          } else if (target instanceof Fly) {
            window.score = Math.min(window.score + 1000, 9999999);
          } else if (target instanceof Scorpion) {
            window.score = Math.min(window.score + 1500, 9999999);
          } else if (target instanceof Boss) {
            window.score = Math.min(window.score + 3000, 9999999);
          }
        }
      }
    });

    this.drawWithAngle();
  }
}

export default Shot;
