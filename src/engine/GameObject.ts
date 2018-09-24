import {Vector2} from './math';
import {GameComponent} from './GameComponent';
import {Engine} from './Engine';
import {Sprite} from './graphics';
import {Transform} from './transform';
import {Lifecycle} from './Lifecycle';
import {Viewport} from './Viewport';

export class GameObject extends Lifecycle {
  private _engine: Engine;

  protected readonly _transform: Transform;
  protected _tag: string = 'GO';
  protected readonly _sprites: Sprite[] = [];

  protected readonly _components: Map<string, GameComponent> = new Map();
  protected _enabled = true;
  protected _z: number;

  private _awakened: boolean = false;

  constructor(size: Vector2 = Vector2.zero,
              position: Vector2 = Vector2.zero,
              rotation: number = 0,
              z: number = 0) {
    super();
    this._transform = new Transform(position, rotation, size);
    this._z = z;
  }

  public addComponent(component: GameComponent) {
    const oldComponent = this._components.get(component.constructor.name);
    if (oldComponent) {
      console.log('Overriding component', oldComponent);
      oldComponent.gameObject = null;
    }
    this._components.set(component.constructor.name, component);
    component.gameObject = this;
  }

  public removeComponent(component: GameComponent) {
    const oldComponent = this._components.get(component.constructor.name);
    if (oldComponent) {
      oldComponent.gameObject = null;
      this._components.delete(component.constructor.name);
    }
  }

  public getComponent<T extends GameComponent>(name: string): T {
    return this._components.get(name) as T;
  }

  public callAwake() {
    if (!this._awakened) {
      this._awakened = true;
      this.onAwake();
    }
  }

  public onStart() {
    this._components.forEach((value) => {
      value.onStart();
    });
  }

  public update() {
    this._components.forEach((value) => {
      value.update();
    });
  }

  public render(context: CanvasRenderingContext2D, viewport: Viewport, alpha: number) {
    if (!this._sprites.length || !this._enabled) {
      return;
    }
    for (const m of this._sprites) {
      m.render(context, viewport, alpha);
    }
  }

  public clone(): GameObject {
    const clone = new GameObject();
    clone.engine = this._engine;
    for (const m of this._sprites) {
      const cloneMesh = m.clone();
      cloneMesh.gameObject = this;
      clone.sprites = cloneMesh;
    }
    return clone;
  }

  public onDestroy() {
    this._components.forEach((value) => {
      value.onDestroy();
    });
  }

  public addSprite(value: Sprite) {
    value.gameObject = this;

    const idx = this._sprites.findIndex(m => m.constructor.name === value.constructor.name);
    if (idx !== -1) {
      this._sprites[idx].gameObject = null;
      this._sprites[idx] = value;
    } else {
      this._sprites.push(value);
    }
    this._sprites.sort((a, b) => a.order - b.order);
  }

  set sprites(value: Sprite) {
    this.addSprite(value);
  }

  public removeSprite(value: Sprite) {
    this.removeSpriteByName(value.constructor.name);
  }

  public removeSpriteByName(name: string) {
    const idx = this._sprites.findIndex(m => m.constructor.name === name);
    if (idx !== -1) {
      this._sprites[idx].gameObject = null;
      this._sprites.splice(idx, 1);
      this._sprites.sort((a, b) => a.order - b.order);
    }
  }

  set engine(value: Engine) {
    this._engine = value;
  }

  get engine(): Engine {
    return this._engine;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
  }

  get tag(): string {
    return this._tag;
  }

  get transform(): Transform {
    return this._transform;
  }
}
