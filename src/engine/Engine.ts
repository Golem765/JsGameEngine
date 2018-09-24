import {GameObject} from './GameObject';
import {Input} from './Input';
import {PhysicsEngine} from './physics/PhysicsEngine';
import {Time} from './Time';
import {Viewport} from './Viewport';

export class Engine {
  private _running: boolean;

  private readonly _context: CanvasRenderingContext2D;

  private _width: number;
  private _height: number;
  private _gameObjects: GameObject[] = [];

  private _physics: PhysicsEngine;
  private _viewport: Viewport;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this._width = width;
    this._height = height;
    this._context = context;

    this._physics = new PhysicsEngine();
    this._viewport = new Viewport(width, height);
  }

  public launch() {
    Input.init();

    Time.time = new Date().getTime();

    this._running = true;

    for (const go of this._gameObjects) {
      go.onStart();
    }

    this.update();
  }

  private update() {
    if (this._running) {
      const newTime = new Date().getTime();
      let deltaTime = (newTime - Time.time) / 1000;

      Time.time = newTime;
      Time.renderLag += deltaTime;

      while (Time.renderLag >= Time.UPDATE_TIME) {
        for (const object of this._gameObjects) {
          object.update();
        }
        this._physics.update();
        Time.renderLag = Time.renderLag - Time.UPDATE_TIME;
      }

      this._context.clearRect(0, 0, this._width, this._height);

      this._context.save();
      const alpha = Time.renderLag / Time.UPDATE_TIME;
      for (const object of this._gameObjects) {
        object.render(this._context, this._viewport, alpha);
        this._context.restore();
      }

      requestAnimationFrame(this.update.bind(this));
    }
  }

  public resume() {
    this._running = true;
    Time.time = new Date().getTime();

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
        go.onStart();
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

  public findObjects<T extends GameObject>(name: string): T[] {
    return <T[]>this._gameObjects.filter(o => o.constructor.name === name);
  }

  public clear() {
    for (const go of this._gameObjects) {
      go.engine = null;
    }
    this._gameObjects = [];
    this._physics = new PhysicsEngine();
  }

  get physics(): PhysicsEngine {
    return this._physics;
  }
}