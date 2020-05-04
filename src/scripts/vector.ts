import Point from './point';

class Vector extends Point {
  static calcDistance(x: number, y: number) {
    return Math.sqrt(x * x + y * y);
  }

  static calcUnitVector(x: number, y: number) {
    const length = Vector.calcDistance(x, y);

    return new Vector(x / length, y / length);
  }

  public rotate2D(radian: number) {
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);

    this.x = (this.x * cos) + (this.y * -sin);
    this.y = (this.x * sin) + (this.y * cos);
  }

  public calcCrossProduct(target: Vector) {
    return (this.x * target.y) - (this.y * target.x);
  }
}

export default Vector;
