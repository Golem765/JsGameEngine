import {Vector2} from '../math/Vector2';
import {GameObject} from '../engine/GameObject';

export class Mesh {
  protected _color: string;
  protected _gameObject: GameObject;

  constructor(color: string) {
    this._color = color;
  }

  render(context: CanvasRenderingContext2D, offset: Vector2) {
    context.fillStyle = this._color;
  }

  get gameObject(): GameObject {
    return this._gameObject;
  }

  set gameObject(value: GameObject) {
    this._gameObject = value;
  }
}

export class RectangleMesh extends Mesh {
  render(context: CanvasRenderingContext2D, offset: Vector2): void {
    super.render(context, offset);
    context.fillRect(
        this._gameObject.position.x - offset.x - this._gameObject.size.x / 2,
        this._gameObject.position.y - offset.y - this._gameObject.size.y / 2,
        this._gameObject.size.x,
        this._gameObject.size.y
    );
  }
}
