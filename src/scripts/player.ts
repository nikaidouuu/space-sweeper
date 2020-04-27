import Position from './position';
import Character from './character';

interface IComing {
  isComing: boolean;
  startTime: number;
  startPosition: Position;
  endPosition: Position;
}

class Player extends Character {
  private speed: number;
  private coming: IComing;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, imagePath: string) {
    super(ctx, x, y, w, h, 1, imagePath);

    this.speed = 2;
    this.coming = {
      isComing: false,
      startTime: null,
      startPosition: null,
      endPosition: null
    };
  }

  public setComing(startX: number, startY: number, endX: number, endY: number) {
    this.coming.isComing = true;
    this.coming.startTime = Date.now();
    this.coming.startPosition = new Position(startX, startY);
    this.coming.endPosition = new Position(endX, endY);
    this.point.set(startX, startY);
  }

  public update() {
    if (this.coming.isComing) {
      const comingTime = (Date.now() - this.coming.startTime) / 1000;
      let y = this.coming.startPosition.y - comingTime * 50;

      if (y <= this.coming.endPosition.y) {
        this.coming.isComing = false;
        y = this.coming.endPosition.y;
      }

      if (Date.now() % 100 < 30) {
        this.ctx.globalAlpha = 0.5;
      }

      this.point.set(this.point.x, y);
    } else {
    }

    this.draw();
    this.ctx.globalAlpha = 1.0;
  }
}

export default Player;
