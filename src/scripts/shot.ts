import Character from './character';
import Vector from './vector';
import Player from './player';
import Enemy from './enemy';
import Pillbug from './pillbug';
import Boss from './boss';

class Shot extends Character {
  protected power: number;
  protected targetList: Array<Player | Enemy>;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.speed = 5;
    this.power = 1;
    this.targetList = [];
  }

  public set(x: number, y: number, speed: number = 5, power: number = 1) {
    this.point.set(x, y);
    this.speed = speed;
    this.power = power;
    this.life = 1;
    this.frame = 0;
  }

  public setTargetList(targetList: Array<Player | Enemy>) {
    this.targetList = targetList;
  }

  public update() {
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

        if (target instanceof Pillbug) {
          window.score = Math.min(window.score + 500, 9999999);
        } else if (target instanceof Boss) {
          window.score = Math.min(window.score + 2000, 9999999);
        }

        target.life -= this.power;
        this.life = 0;

        if (target.life <= 0) {
          target.isDestroyed = true;
          target.frame = 0;
        }
      }
    });

    this.drawWithAngle();
  }
}

export default Shot;
