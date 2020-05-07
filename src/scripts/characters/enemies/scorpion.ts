import Enemy from './enemy';
import Vector from '../../vector';
import imagePath from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_03_Explosion_000.png';
import destroyedPath1 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_007.png';
import destroyedPath2 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_04_Explosion_008.png';
import explosionSoundPath from '../../../assets/sounds/Explosion2.mp3';

class Scorpion extends Enemy {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, imagePath, explosionSoundPath, 2.0);
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

    if (this.frame % 60 === 0) {
      const tx = this.target.point.x - this.point.x;
      const ty = this.target.point.y - this.point.y;
      const tv = Vector.calcUnitVector(tx, ty);

      this.fire(tv.x, tv.y, 3.5);
    }

    this.point.x += Math.sin(this.frame / 10);
    this.point.y += this.speed;

    if (this.point.y - this.height > this.ctx.canvas.height) {
      this.life = 0;
    }

    this.frame++;
    this.draw();
  }
}

export default Scorpion;
