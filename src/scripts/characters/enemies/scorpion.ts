import Enemy from './enemy';
import Vector from '../../vector';
import imagePath from '../../../assets/images/ufo/Ships_Sprites/Explosion/Ship_03_Explosion_000.png';
import destroyedPath1 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_007.png';
import destroyedPath2 from '../../../assets/images/ufo/Ships_Sprites/Explosion/Explosion_008.png';
import explosionSoundPath from '../../../assets/sounds/Explosion2.mp3';

class Scorpion extends Enemy {
  private imageList: HTMLImageElement[];

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 80, 64, imagePath, explosionSoundPath, 2.0);

    this.imageList = [imagePath, destroyedPath1, destroyedPath2].map(path => {
      const image = new Image();
      image.src = path;

      return image;
    });
  }

  public render() {
    this.update();
    this.shotList.forEach(shot => shot.render());
  }

  private update() {
    if (this.isDestroyed) {
      if (this.frame === 0) {
        this.explosionSound.play();
        this.setImage(80, 64, this.imageList[1]);
      } else if (this.frame >= 8 && this.frame < 16) {
        this.setImage(80, 64, this.imageList[2]);
      } else if (this.frame >= 16) {
        this.setImage(80, 64, this.imageList[0]);
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

    if (this.point.y - this.height > this.ctx.canvas.height) {
      this.life = 0;
    }

    this.point.x += Math.sin(this.frame / 10);
    this.point.y += this.speed;

    this.frame++;
    this.draw();
  }
}

export default Scorpion;
