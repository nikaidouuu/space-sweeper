import Player from './player';
import Shot from './shot';
import Enemy from './enemy';
import playerPath from '../assets/images/player/Ship_LVL_1.png';
import shotPath from '../assets/images/player/effects/Fire_Shot_5_2.png';
import enemyPath from '../assets/images/ufo/ships/Ship_04.png';
import bgPath from '../assets/images/bg/Space_BG_01.png';

const CANVAS_WIDTH = 540;
const CANVAS_HEIGHT = 688;
const BG_HEIGHT = 960;

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemy: Enemy;
  private bgImage: HTMLImageElement;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;
    this.player = new Player(this.ctx, 0, 0, 80, 64, playerPath);
    this.enemy = new Enemy(this.ctx, 0, 0, 48, 48, enemyPath);
    this.bgImage = new Image();
    this.bgImage.src = bgPath;

    this.setUp();
    this.render();
  }

  private setUp() {
    this.player.setComing(
      this.canvas.width / 2,
      this.canvas.height + 20,
      this.canvas.width / 2,
      this.canvas.height - 100
    );

    this.player.setShotList(
      Array
        .from({ length: 10 })
        .map(() => new Shot(this.ctx, 0, 0, 16, 36, shotPath))
    );
  }

  private render() {
    this.ctx.drawImage(this.bgImage, 0, 0, CANVAS_WIDTH, BG_HEIGHT);
    this.player.update();
    this.player.shotList.forEach(shot => shot.update());
    this.enemy.update();

    requestAnimationFrame(() => this.render());
  }
}

new Game();
