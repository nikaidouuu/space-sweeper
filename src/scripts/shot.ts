import Character from './character';

class Shot extends Character {
  private speed: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.speed = 6;
  }

  public set(x: number, y: number) {
    this.point.set(x, y);
    this.life = 1;
  }

  public update() {
    if (this.life <= 0) return;

    if (this.point.y + this.height < 0) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;
    this.drawWithAngle();
  }
}

export default Shot;
