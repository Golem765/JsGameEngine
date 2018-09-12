import {Vector2} from './math';
import {GameObject} from './GameObject';
import {Input} from './Input';

export class Engine {
  private _offsetX: Vector2;
  private _offsetY: Vector2;

  private _time: number;
  private _running: boolean;

  private readonly _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _gameObjects: GameObject[] = [];

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this._width = width;
    this._height = height;
    this._context = context;

    this._offsetX = new Vector2(0, width);
    this._offsetY = new Vector2(0, height);
  }

  public launch() {
    Input.init();

    this._time = new Date().getTime();
    this._running = true;

    for (const go of this._gameObjects) {
      go.start();
    }

    this.update();
  }

  private update() {
    if (this._running) {
      const newTime = new Date().getTime();
      const deltaTime = (newTime - this._time) / 1000;
      this._time = newTime;

      this._context.clearRect(0, 0, this._width, this._height);
      for (const object of this._gameObjects) {
        object.update(deltaTime);
        object.render(this._context);
      }
      requestAnimationFrame(this.update.bind(this));
    }
  }

  public resume() {
    this._running = true;
    this._time = new Date().getTime();

    this.update();
  }

  public stop() {
    this._running = false;
  }

  public addGameObject(go: GameObject) {
    if (!this._gameObjects.find(o => o === go)) {
      this._gameObjects.push(go);
      go.engine = this;
      go.callAwake();
      if (this._running) {
        go.start();
      }
    }
    this._gameObjects.sort(((a, b) => a.z - b.z));
  }

  public removeGameObject(go: GameObject) {
    const idx = this._gameObjects.findIndex(o => o === go);
    if (idx !== -1) {
      go.onDestroy();
      go.engine = null;
      this._gameObjects.splice(idx, 1);
    }
    this._gameObjects.sort(((a, b) => a.z - b.z));
  }

  public findObject<T extends GameObject>(name: string): T {
    return <T>this._gameObjects.find(o => o.constructor.name === name);
  }

  public clear() {
    for (const go of this._gameObjects) {
      go.engine = null;
    }
    this._gameObjects = [];
  }

  get offsetX(): Vector2 {
    return this._offsetX.clone();
  }

  get offsetY(): Vector2 {
    return this._offsetY.clone();
  }
}