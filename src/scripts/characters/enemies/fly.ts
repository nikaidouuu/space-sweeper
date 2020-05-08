import Enemy from './enemy';
import imagePath from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_06_Explosion_000.png';
import destroyedPath1 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_007.png';
import destroyedPath2 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_008.png';
import explosionSoundPath from '../../../assets/sounds/Explosion2.mp3';

class Fly extends Enemy {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 90, 56, imagePath, explosionSoundPath, 3.5);
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
        this.setImage(90, 56, imagePath);
        this.isDestroyed = false;

        return;
      }

      this.frame++;
      this.draw();
    }

    if (this.life <= 0) return;

    if (this.frame === 60) {
      this.setVector(0, 0);
    }

    if (this.frame === 80 || this.frame === 160) {
      const angleList = [0, 45, 90, 135, 180, 225, 315];

      for (const angle of angleList) {
        const radian = angle * (Math.PI / 180);
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);

        this.fire(cos, sin, 3.0);
      }
    }

    if (this.frame === 190) {
      if (this.point.x > this.ctx.canvas.width / 2) {
        this.setVector(1, 0);
      } else {
        this.setVector(-1, 0);
      }
    }

    if (
      this.point.x + this.width < 0 ||
      this.point.x - this.width > this.ctx.canvas.width
    ) {
      this.life = 0;
    }

    this.point.x += this.vector.x * this.speed;
    this.point.y += this.vector.y * this.speed;

    this.frame++;
    this.draw();
  }
}

export default Fly;
