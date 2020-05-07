type Scene = { [scene: string]: () => void };
type ValueOf<T> = T[keyof T];

class SceneController {
  public frame: number;
  private readonly scene: Scene;
  private activeScene: ValueOf<Scene>;

  constructor() {
    this.scene = {};
    this.activeScene = null;
    this.frame = null;
  }

  public add(name: string, callback: () => void) {
    this.scene[name] = callback;
  }

  public use(name: string) {
    if (!this.scene[name]) return;

    this.activeScene = this.scene[name];
    this.frame = -1;
  }

  public render() {
    this.activeScene();
    this.frame++;
  }
}

export default SceneController;
