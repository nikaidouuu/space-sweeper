import Position from './position';

abstract class Character {
  protected ctx: CanvasRenderingContext2D;
  protected point: Position;
  protected vector: Position;
  protected width: number;
  protected height: number;
  protected life: number;
  protected image: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, life: number, imagePath: string) {
    this.ctx = ctx;
    this.point = new Position(x, y);
    this.vector = new Position(0.0, -1.0);
    this.width = w;
    this.height = h;
    this.life = life;
    this.image = new Image();
    this.image.src = imagePath;
  }

  protected setVector(x: number, y: number) {
    this.vector.set(x, y);
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

  protected abstract update(): void;
}

export default Character;
