import Point from '../point';
import Vector from '../vector';

// enum CharacterType {
//   PILLBUG,
//   SHOT
// }

// class Character {
//   public static CharacterFactory(type: CharacterType) {
//     switch (type) {
//       case CharacterType.PILLBUG:
//         Enemy.EnemyFactory(EnemyType.PILLBUG)
//       case CharacterType.SHOT:
//         return new Shot();
//       default:
//         break;
//     }
//   }
// }

// Character.CharacterFactory(CharacterType.ENEMY)

abstract class Character {
  public point: Point;
  public vector: Vector;
  public width: number;
  public height: number;
  public life: number;
  public frame: number;
  protected readonly ctx: CanvasRenderingContext2D;
  protected angle: number;
  protected speed: number;
  private readonly image: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string, speed: number, life: number) {
    this.point = new Point(x, y);
    this.vector = new Vector(0.0, -1.0);
    this.width = w;
    this.height = h;
    this.life = life;
    this.frame = 0;
    this.ctx = ctx;
    this.angle = 270 * (Math.PI / 180);
    this.speed = speed;
    this.image = new Image();
    this.image.src = imagePath;
  }

  public setVector(x: number, y: number) {
    this.vector.set(x, y);
  }

  public setVectorFromAngle(angle: number) {
    this.angle = angle;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.vector.set(cos, sin);
  }

  protected setImage(w: number, h: number, imagePath: string) {
    this.width = w;
    this.height = h;
    this.image.src = imagePath;
  }

  protected draw() {
    const offsetX = this.width / 2;
    const offsetY = this.height / 2;

    this.ctx.drawImage(
      this.image,
      this.point.x - offsetX,
      this.point.y - offsetY
    );
  }

  protected drawWithAngle() {
    const offsetX = this.width / 2;
    const offsetY = this.height / 2;

    this.ctx.save();

    this.ctx.translate(this.point.x, this.point.y);
    this.ctx.rotate(this.angle - (Math.PI * 1.5));
    this.ctx.drawImage(
      this.image,
      -offsetX,
      -offsetY
    );

    this.ctx.restore();
  }

  protected abstract set(...args: any): void;

  protected abstract render(): void;
}

export default Character;
