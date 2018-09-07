import {Vector2} from '../math/Vector2';
import {GameObject} from './GameObject';

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

  public start() {
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
      const deltaTime = this._time - newTime;
      this._time = newTime;

      this._context.clearRect(0, 0, this._width, this._height);
      for (const object of this._gameObjects) {
        object.update(deltaTime);
        object.render(this._context);
      }
      requestAnimationFrame(this.update.bind(this));
    }
  }

  public stop() {
    this._running = false;
  }

  public addGameObject(go: GameObject) {
    if (!this._gameObjects.find(o => o === go)) {
      this._gameObjects.push(go);
      go.engine = this;
      if (this._running) {
        go.start();
      }
    }
  }

  public removeGameObject(go: GameObject) {
    const idx = this._gameObjects.findIndex(o => o === go);
    if (idx !== -1) {
      go.onDestroy();
      go.engine = null;
      this._gameObjects.splice(idx, 1);
    }
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