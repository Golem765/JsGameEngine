import {Vector2} from '../math';

export class Transform {
  private _position: Vector2;
  private _rotation: number;
  private _size: Vector2;

  constructor(position: Vector2 = Vector2.zero,
              rotation: number = 0,
              size: Vector2 = Vector2.zero) {
    this._position = position;
    this._rotation = rotation;
    this._size = size;
  }

  // readonly
  get position(): Vector2 {
    return this._position.clone();
  }

  set position(value: Vector2) {
    this._position = value.clone();
  }

  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
  }

// readonly
  get size(): Vector2 {
    return this._size.clone();
  }

  set size(value: Vector2) {
    this._size = value.clone();
  }
}