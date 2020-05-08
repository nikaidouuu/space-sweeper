import Enemy from './enemy';
import imagePath from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_000.png';
import destroyedPath1 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_007.png';
import destroyedPath2 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_008.png';
import explosionSoundPath from '../../../assets/sounds/Explosion2.mp3';

class Pillbug extends Enemy {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, imagePath, explosionSoundPath, 3.0);
  }

  public render() {
    this.update();
    this.shotList.forEach(shot => shot.render());
  }

  private update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
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

    if (this.frame === 30) {
      this.fire();
    }

    if (this.frame === 100) {
      if (this.point.x > this.ctx.canvas.width / 2) {
        this.setVectorFromAngle(55.0 * (Math.PI / 180.0));
      } else {
        this.setVectorFromAngle(125.0 * (Math.PI / 180.0));
      }
    }

    if (
      this.point.x + this.width < 0 ||
      this.point.x - this.width > this.ctx.canvas.width ||
      this.point.y - this.height > this.ctx.canvas.height
    ) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;

    this.frame++;
    this.draw();
  }
}

export default Pillbug;