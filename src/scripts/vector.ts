import Point from './point';

class Vector extends Point {
  static calcDistance(x: number, y: number): number {
    return Math.sqrt(x * x + y * y);
  }

  static calcUnitVector(x: number, y: number): Vector {
    const length = Vector.calcDistance(x, y);

    return new Vector(x / length, y / length);
  }

  static calcCrossProduct(unitVector1: Vector, unitVector2: Vector): number {
    return (unitVector1.x * unitVector2.y) - (unitVector1.y * unitVector2.x);
  }

  public rotate2D(radian: number) {
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);

    this.x = (this.x * cos) + (this.y * -sin);
    this.y = (this.x * sin) + (this.y * cos);
  }
}

export default Vector;
