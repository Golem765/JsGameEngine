import {Vector2} from '../math/Vector2';
import {GameComponent} from './GameComponent';
import {Engine} from './Engine';
import {Mesh} from '../graphics/Mesh';

export class GameObject {
  private _engine: Engine;
  private _size: Vector2;
  private _position: Vector2;
  private _components: Map<string, GameComponent> = new Map();
  private _mesh: Mesh[] = [];

  constructor(size: Vector2, position: Vector2) {
    this._size = size;
    this._position = position;
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

  public start() {
    this._components.forEach((value) => {
      value.start();
    });
  }

  public update(deltaTime: number) {
    this._components.forEach((value) => {
      value.update(deltaTime);
    });
  }

  public render(context: CanvasRenderingContext2D) {
    if (!this.visible || !this._mesh) {
      return;
    }
    for (const m of this._mesh) {
      m.render(context, new Vector2(this._engine.offsetX.x, this._engine.offsetY.x));
    }
  }

  public onDestroy() {

  }

  get position(): Vector2 {
    return this._position.clone();
  }

  set position(value: Vector2) {
    this._position.x = value.x;
    this._position.y = value.y;
  }

  get size(): Vector2 {
    return this._size.clone();
  }

  get offset(): Vector2[] {
    return [this._engine.offsetX, this._engine.offsetY];
  }

  public addMesh(value: Mesh) {
    value.gameObject = this;

    const idx = this._mesh.findIndex(m => m.constructor.name === value.constructor.name);
    if (idx !== -1) {
      this._mesh[idx].gameObject = null;
      this._mesh[idx] = value;
    } else {
      this._mesh.push(value);
    }
    this._mesh.sort((a, b) => a.order - b.order);
  }

  set mesh(value: Mesh) {
    this.addMesh(value);
  }

  public removeMesh(value: Mesh) {
    const idx = this._mesh.findIndex(m => m.constructor.name === value.constructor.name);
    if (idx !== -1) {
      this._mesh[idx].gameObject = null;
      this._mesh.splice(idx, 1);
      this._mesh.sort((a, b) => a.order - b.order);
    }
  }

  set size(value: Vector2) {
    this._size.x = value.x;
    this._size.y = value.y;
  }

  set engine(value: Engine) {
    this._engine = value;
  }

  get horizontalBound(): Vector2 {
    return new Vector2(this.position.x - this.size.x / 2, this.position.x + this.size.x / 2);
  }

  get verticalBound(): Vector2 {
    return new Vector2(this.position.y - this.size.y / 2, this.position.y + this.size.y / 2);
  }

  get visible(): boolean {
    return this.horizontalBound.x < this._engine.offsetX.y
        && this.horizontalBound.y > this._engine.offsetX.x
        && this.verticalBound.x < this._engine.offsetY.y
        && this.verticalBound.y > this._engine.offsetY.x;
  }
}
