import Character from './character';
import Vector from './vector';
import Player from './player';

class Shot extends Character {
  private speed: number;
  private power: number;
  private targetList: Character[];

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
  }

  public setTargetList(targetList: Character[]) {
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

      const distance = Vector.calcDistance(this.point.x - target.point.x, this.point.y - target.point.y);

      if (distance <= (this.width + target.width) / 4) {
        if (target instanceof Player) {
          if (target.coming.isComing) return;
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
