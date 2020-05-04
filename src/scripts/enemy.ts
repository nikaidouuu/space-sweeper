import Character from './character';
import Shot from './shot';

abstract class Enemy extends Character {
  protected speed: number;
  protected target: Character;
  public shotList: Shot[];

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.speed = 2.5;
    this.shotList = null;
  }

  public set(x: number, y: number, life: number) {
    this.point.set(x, y);
    this.life = life;
    this.frame = 0;
  }

  public setShotList(shotList: Shot[]) {
    this.shotList = shotList;
  }

  public setTarget(target: Character) {
    this.target = target;
  }

  protected fire(x = 0.0, y = 1.0, speed = 5.0) {
    for (const shot of this.shotList) {
      if (shot.life <= 0) {
        shot.set(this.point.x, this.point.y, speed);
        shot.setVector(x, y);

        break;
      }
    }
  }

  protected abstract update(): void;
}

export default Enemy;
