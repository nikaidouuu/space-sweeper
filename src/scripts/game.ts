import Player from './player';
import playerPath from '../assets/images/player/dd.png';
import bgPath from '../assets/images/bg/Space_BG_01.png';

const CANVAS_WIDTH = 540;
const CANVAS_HEIGHT = 688;
const BG_HEIGHT = 960;

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private bgImage: HTMLImageElement;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;
    this.player = new Player(this.ctx, 0, 0, 80, 64, playerPath);
    this.bgImage = new Image();
    this.bgImage.src = bgPath;

    this.setUpPlayer();
    this.render();
  }

  private setUpPlayer() {
    this.player.setComing(
      this.canvas.width / 2,
      this.canvas.height + 20,
      this.canvas.width / 2,
      this.canvas.height - 100
    );
  }

  private render() {
    this.ctx.drawImage(this.bgImage, 0, 0, CANVAS_WIDTH, BG_HEIGHT);
    this.player.update();

    requestAnimationFrame(() => this.render());
  }
}

new Game();
