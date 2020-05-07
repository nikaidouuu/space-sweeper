import Character from '../character';
import Shot from '../shots/shot';

abstract class Enemy extends Character {
  public isDestroyed: boolean;
  protected shotList: Shot[];
  protected mode: string;
  protected target: Character;
  protected readonly explosionSound: HTMLAudioElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string, explosionSoundPath: string, speed: number) {
    super(ctx, x, y, w, h, imagePath, speed, 0);

    this.speed = speed;
    this.isDestroyed = false;
    this.shotList = null;
    this.mode = '';
    this.target = null;
    this.explosionSound = new Audio(explosionSoundPath);
  }

  public set(x: number, y: number, life = 1) {
    this.point.set(x, y);
    this.life = life;
    this.frame = 0;
  }

  public setShotList(shotList: Shot[]) {
    this.shotList = shotList;
  }

  public setMode(mode: string) {
    this.mode = mode;
  }

  public setTarget(target: Character) {
    this.target = target;
  }

  protected fire(x = 0.0, y = 1.0, speed = 5.0) {
    for (const shot of this.shotList) {
      if (shot.life <= 0) {
        shot.set(this.point.x, this.point.y + 25.0, speed);
        shot.setVector(x, y);

        break;
      }
    }
  }

  protected abstract render(): void;
}

export default Enemy;
