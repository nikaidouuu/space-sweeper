import Enemy from './enemy';
import imagePath from '../assets/images/ufo/ships/Ship_04.png';

class Pillbug extends Enemy {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 64, 80, imagePath);
  }

  update() {
    if (this.life <= 0) return;

    if (this.frame % 75 === 0) {
      this.fire();
    }

    if (this.point.y - this.height > this.ctx.canvas.height) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;
    this.frame++;

    this.draw();
  }
}

export default Pillbug;
