import SceneController from './sceneController';
import Player from './characters/player';
import PowerUp from './characters/powerUp';
import Shot from './characters/shots/shot';
import HomingShot from './characters/shots/homingShot';
import Boss from './characters/enemies/boss';
import Pillbug from './characters/enemies/pillbug';
import Scorpion from './characters/enemies/scorpion';
import bgImagePath from '../assets/images/bg/Space_BG_04.png';
import shotPath from '../assets/images/player/effects/Fire_Shot_5_2.png';
import missilePath from '../assets/images/object/props/Missile_01.png';
import bossShotPath from '../assets/images/boss/effects/Shot_02.png';
import bossMissilePath from '../assets/images/boss/effects/Missile.png';
import enemyShotPath from '../assets/images/ufo/ship_effects/Fire_Shot_1_4.png';

const CANVAS_WIDTH = 540;
const CANVAS_HEIGHT = 688;

class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly scene: SceneController;
  private readonly player: Player;
  private readonly powerUp: PowerUp;
  private readonly boss: Boss;
  private readonly pillbugList: Pillbug[];
  private readonly scorpionList: Scorpion[];
  private readonly bgImage: HTMLImageElement;
  private isGameStart: boolean;
  private isPaused: boolean;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;
    this.scene = new SceneController();
    this.player = new Player(this.ctx, 0, 0);
    this.powerUp = new PowerUp(this.ctx, 0, 0);
    this.boss = new Boss(this.ctx, 0, 0);
    this.pillbugList = Array.from({ length: 50 }).map(() => new Pillbug(this.ctx, 0, 0));
    this.scorpionList = Array.from({ length: 10 }).map(() => new Scorpion(this.ctx, 0, 0));
    this.bgImage = new Image();
    this.bgImage.src = bgImagePath;
    this.isGameStart = false;
    this.isPaused = false;
    window.score = 0;
    window.keyDown = {};

    this.setUp();
    this.setUpEvent();
    this.setUpScene();
    this.render();
  }

  private setUp() {
    const enemies = [...this.pillbugList, ...this.scorpionList, this.boss];

    this.player.setShotList(
      Array
        .from({ length: 15 })
        .map(() => {
          const shot = new Shot(this.ctx, 0, 0, 16, 36, shotPath);
          shot.setTargetList(enemies);

          return shot;
        }),
      Array
        .from({ length: 30 })
        .map(() => {
          const shot = new Shot(this.ctx, 0, 0, 16, 36, shotPath);
          shot.setTargetList(enemies);

          return shot;
        }),
      Array
        .from({ length: 30 })
        .map(() => {
          const homingShot = new HomingShot(this.ctx, 0, 0, 16, 36, missilePath);
          homingShot.setTargetList(enemies);

          return homingShot;
        })
    );

    this.powerUp.setPlayer(this.player);

    this.pillbugList.forEach(pillbug => {
      pillbug.setTarget(this.player);

      pillbug.setShotList(
        Array
          .from({ length: 15 })
          .map(() => {
            const shot = new Shot(this.ctx, 0, 0, 24, 24, enemyShotPath);
            shot.setTargetList([this.player]);

            return shot;
          })
      );
    });

    this.scorpionList.forEach(scorpion => {
      scorpion.setTarget(this.player);

      scorpion.setShotList(
        Array
          .from({ length: 15 })
          .map(() => {
            const shot = new Shot(this.ctx, 0, 0, 24, 24, enemyShotPath);
            shot.setTargetList([this.player]);

            return shot;
          })
      );
    });

    this.boss.setTarget(this.player);

    this.boss.setShotList(
      Array
        .from({ length: 15 })
        .map(() => {
          const shot = new Shot(this.ctx, 0, 0, 24, 24, bossShotPath);
          shot.setTargetList([this.player]);

          return shot;
        })
    );

    this.boss.setHomingShotList(
      Array
        .from({ length: 20 })
        .map(() => {
          const homingShot = new HomingShot(this.ctx, 0, 0, 26, 36, bossMissilePath);
          homingShot.setTargetList([this.player]);

          return homingShot;
        })
    );
  }

  private setUpEvent() {
    window.addEventListener('keydown', e => {
      window.keyDown[e.key] = true;

      if (e.key === 'Enter' && this.player.life <= 0) {
        this.isGameStart = true;
      }

      if (e.key === 'Escape') {
        if (this.isPaused) {
          this.isPaused = false;
          this.render();
        } else {
          this.isPaused = true;
        }
      }
    });

    window.addEventListener('keyup', e => {
      window.keyDown[e.key] = false;
    });
  }

  private setUpScene() {
    this.scene.add('waiting', () => {
      if (this.isGameStart) {
        this.player.set(
          this.canvas.width / 2,
          this.canvas.height + 20,
          this.canvas.width / 2,
          this.canvas.height - 100
        );
        this.isGameStart = false;
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        window.score = 0;

        this.scene.use('coming');
      }

      this.isPaused = false;
      this.ctx.font = 'bold 48px sans-serif';
      this.ctx.fillStyle = 'red';
      this.ctx.fillText('Press The Enter Key', CANVAS_WIDTH / 5.5, CANVAS_HEIGHT / 2, CANVAS_WIDTH / 1.5);
    });

    this.scene.add('coming', () => {
      if (this.scene.frame === 120) {
        this.scene.use('scene_01');
      }
    });

    this.scene.add('scene_01', () => {
      if (this.scene.frame <= 200 && this.scene.frame % 25 === 0) {
        for (const pillbug of this.pillbugList) {
          if (pillbug.life <= 0) {
            pillbug.set(CANVAS_WIDTH * 0.4, -pillbug.height, 1);
            pillbug.setVector(0, 1);
            pillbug.setMode('left');

            break;
          }
        }

        for (const pillbug of this.pillbugList) {
          if (pillbug.life <= 0) {
            pillbug.set(CANVAS_WIDTH * 0.6, -pillbug.height, 1);
            pillbug.setVector(0, 1);
            pillbug.setMode('right');

            break;
          }
        }
      }

      if (this.scene.frame === 350) {
        this.scene.use('scene_02');
      }

      if (this.player.life <= 0) {
        for (const pillbug of this.pillbugList) {
          if (pillbug.life > 0) {
            pillbug.life = 0;
          }
        }

        this.scene.use('waiting');
      }
    });

    this.scene.add('scene_02', () => {
      if (this.scene.frame <= 600 && this.scene.frame % 60 === 0) {
        for (const scorpion of this.scorpionList) {
          if (scorpion.life <= 0) {
            if (this.scene.frame % 120 === 0) {
              scorpion.set(this.canvas.width * 0.2, -scorpion.height, 1);
            } else {
              scorpion.set(this.canvas.width * 0.8, -scorpion.height, 1);
            }

            break;
          }
        }
      }

      if (this.scene.frame === 650) {
        this.scene.use('scene_03');
      }

      if (this.player.life <= 0) {
        for (const scorpion of this.scorpionList) {
          if (scorpion.life > 0) {
            scorpion.life = 0;
          }
        }

        this.scene.use('waiting');
      }
    });

    this.scene.add('scene_03', () => {
      if (this.scene.frame === 0) {
        this.boss.set(this.canvas.width / 2, -this.boss.height, 100);
        this.boss.setMode('coming');
      }

      if (this.scene.frame % 500 === 0) {
        this.powerUp.set(
          Math.random() * (this.canvas.width - this.powerUp.width) + this.powerUp.width / 2,
          0,
          1
        );
        this.powerUp.setVector(0, 1);
      }

      if (this.boss.life <= 0) {
        this.scene.use('scene_01');
      }

      if (this.player.life <= 0) {
        this.boss.life = 0;

        this.scene.use('waiting');
      }
    });

    this.scene.use('waiting');
  }

  private render() {
    this.ctx.globalAlpha = 1.0;
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ctx.font = 'bold 25px sans-serif';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(String(window.score).padStart(7, '0'), 25, 40);

    this.scene.render();
    this.player.render();
    this.boss.render();
    this.powerUp.render();
    this.pillbugList.forEach(pillbug => pillbug.render());
    this.scorpionList.forEach(scorpion => scorpion.render());

    if (this.isPaused) {
      this.ctx.font = 'bold 48px sans-serif';
      this.ctx.fillText('Paused', CANVAS_WIDTH / 2.8, CANVAS_HEIGHT / 2, CANVAS_WIDTH / 2);
    } else {
      requestAnimationFrame(() => this.render());
    }
  }
}

new Game();
