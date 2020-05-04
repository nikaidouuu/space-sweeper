import Player from './player';
import Pillbug from './pillbug';
import Shot from './shot';
import SceneController from './sceneController';
import shotPath from '../assets/images/player/effects/Fire_Shot_5_2.png';
import bgPath from '../assets/images/bg/Space_BG_01.png';

const CANVAS_WIDTH = 540;
const CANVAS_HEIGHT = 688;
const BG_HEIGHT = 960;

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemyList: Array<Pillbug>;
  private scene: SceneController;
  private bgImage: HTMLImageElement;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;
    this.player = new Player(this.ctx, 0, 0);
    this.enemyList = [];
    this.scene = new SceneController();
    this.bgImage = new Image();
    this.bgImage.src = bgPath;

    for (let i = 0; i < 10; i++) {
      this.enemyList.push(new Pillbug(this.ctx, 0, 0));
    }

    this.setUp();
    this.setUpScene();
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
        .map(() => {
          const shot = new Shot(this.ctx, 0, 0, 16, 36, shotPath);
          shot.setTargetList(this.enemyList);

          return shot;
        })
    );

    this.enemyList.forEach(enemy => {
      enemy.setTarget(this.player);

      enemy.setShotList(
        Array
          .from({ length: 10 })
          .map(() => {
            const shot = new Shot(this.ctx, 0, 0, 16, 36, shotPath);
            shot.setTargetList([this.player]);

            return shot;
          })
      );
    });
  }

  private setUpScene() {
    this.scene.add('coming', () => {
      if (this.scene.frame === 60) {
        this.scene.use('scene_01');
      }
    });

    this.scene.add('scene_01', () => {
      if (this.scene.frame % 30 === 0) {
        for (const enemy of this.enemyList) {
          if (enemy.life <= 0) {
            if (this.scene.frame % 60 === 0) {
              enemy.set(-enemy.width, 0, 1);
              enemy.setVectorFromAngle(30 * (Math.PI / 180));
            } else {
              enemy.set(this.canvas.width + enemy.width, 0, 1);
              enemy.setVectorFromAngle(150 * (Math.PI / 180));
            }

            break;
          }
        }
      }
    });

    this.scene.use('coming');
  }

  private render() {
    this.ctx.globalAlpha = 1.0;
    this.ctx.drawImage(this.bgImage, 0, 0, CANVAS_WIDTH, BG_HEIGHT);

    this.ctx.font = 'bold 24px Sans-serif';
    this.ctx.fillStyle = '#333333';
    this.ctx.fillText(String('0').padStart(5, '0'), 30, 50);

    this.scene.update();
    this.player.update();
    this.player.shotList.forEach(shot => shot.update());
    this.enemyList.forEach(enemy => {
      enemy.update();
      enemy.shotList.forEach(shot => shot.update());
    });

    requestAnimationFrame(() => this.render());
  }
}

new Game();
