import Shot from './shot';
import Player from './player';
import Pillbug from './pillbug';
import Boss from './boss';
import Vector from './vector';

class HomingShot extends Shot {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, imagePath);

    this.power = 2;
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

    const target = this.targetList[0];

    if (this.frame < 150) {
      const unitVector = Vector.calcUnitVector(
        target.point.x - this.point.x,
        target.point.y - this.point.y
      );

      this.vector = Vector.calcUnitVector(
        this.vector.x,
        this.vector.y
      );

      const crossProduct = this.vector.calcCrossProduct(unitVector);
      const radius = Math.PI / 180.0;

      if (crossProduct > 0.0) {
        this.vector.rotate2D(radius);
      } else if (crossProduct < 0.0) {
        this.vector.rotate2D(-radius);
      }
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;
    this.angle = Math.atan2(this.vector.y, this.vector.x);

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
    this.frame++;
  }
}

export default HomingShot;
