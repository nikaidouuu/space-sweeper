import Character from './character';
import Player from './player';
import Vector from './vector';
import imagePath from '../assets/images/object/bonus_items/Power_Up.png';
import soundPath from '../assets/sounds/Power_Up.mp3';

class PowerUp extends Character {
  private target: Player;
  private sound: HTMLAudioElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx, x, y, 40, 40, imagePath, 1.0, 0);

    this.target = null;
    this.sound = new Audio(soundPath);
  }

  public set(x: number, y: number, life: number) {
    this.point.set(x, y);
    this.life = life;
  }

  public setTarget(target: Player) {
    this.target = target;
  }

  public update() {
    if (this.life <= 0) return;

    if (this.point.y - this.height > this.ctx.canvas.height) {
      this.life = 0;
    }

    const distance = Vector.calcDistance(
      this.point.x - this.target.point.x,
      this.point.y - this.target.point.y
    );

    if (distance <= (this.width + this.target.width) / 4) {
      if (this.target.coming.isComing) return;

      window.score = Math.min(window.score + 100, 9999999);
      this.life = 0;
      this.target.upgrade();
      this.sound.play();
    }

    this.point.y += this.vector.y * this.speed;

    this.draw();
  }
}

export default PowerUp;
