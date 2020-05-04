import Point from './point';
import Vector from './vector';

abstract class Character {
  protected ctx: CanvasRenderingContext2D;
  protected point: Point;
  protected vector: Vector;
  protected width: number;
  protected height: number;
  public life: number;
  private image: HTMLImageElement;
  private angle: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, life: number, imagePath: string) {
    this.ctx = ctx;
    this.point = new Point(x, y);
    this.vector = new Vector(0.0, -1.0);
    this.width = w;
    this.height = h;
    this.life = life;
    this.image = new Image();
    this.image.src = imagePath;
    this.angle = 270 * (Math.PI / 180);
  }

  protected setVector(x: number, y: number) {
    this.vector.set(x, y);
  }

  protected setVectorFromAngle(angle: number) {
    this.angle = angle;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.vector.set(cos, sin);
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

  protected abstract update(): void;
}

export default Character;
