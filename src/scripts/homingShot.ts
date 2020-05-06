import Shot from './shot';
import Vector from './vector';

class HomingShot extends Shot {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, imagePath);

    this.power = 2;
  }

  public update() {
    super.update();

    const target = this.targetList.find(target => target.life >= 1);

    if (this.frame < 150 && target) {
      const unitVector = Vector.calcUnitVector(
        target.point.x - this.point.x,
        target.point.y - this.point.y
      );

      this.vector = Vector.calcUnitVector(
        this.vector.x,
        this.vector.y
      );

      const crossProduct = this.vector.calcCrossProduct(unitVector);
      const radian = Math.PI / 90.0;

      if (crossProduct > 0.0) {
        this.vector.rotate2D(radian);
      } else if (crossProduct < 0.0) {
        this.vector.rotate2D(-radian);
      }
    }

    this.angle = Math.atan2(this.vector.y, this.vector.x);
    this.frame++;
  }
}

export default HomingShot;
