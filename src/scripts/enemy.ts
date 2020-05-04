import Character from './character';

class Enemy extends Character {
  private speed: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.speed = 2.5;
  }

  public set(x: number, y: number, life: number = 1) {
    this.point.set(x, y);
    this.life = life;
  }

  public update() {
    if (this.life <= 0) return;

    if (this.point.y - this.height > this.ctx.canvas.height) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;
    this.draw();
  }
}

export default Enemy;
