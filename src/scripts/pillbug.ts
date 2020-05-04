import Enemy from './enemy';
import imagePath from '../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_000.png';
import destroyedPath1 from '../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_007.png';
import destroyedPath2 from '../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_008.png';

class Pillbug extends Enemy {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, imagePath);
  }

  public update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.setImage(80, 64, destroyedPath1);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(80, 64, destroyedPath2);
      } else if (this.frame >= 16) {
        this.setImage(80, 64, imagePath);
        this.isDestroyed = false;

        return;
      }

      this.frame++;
      this.draw();
    }

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
