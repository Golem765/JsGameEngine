import {Vector2} from './math';

export class Viewport {
  private _offsetX: Vector2;
  private _offsetY: Vector2;

  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;

    this._offsetX = new Vector2(0, this._width);
    this._offsetY = new Vector2(0, this._height);
  }

  public moveUp() {
    this._offsetY = new Vector2(this._offsetY.x - this._height, this._offsetY.y - this._height);
  }

  public moveDown() {
    this._offsetY = new Vector2(this._offsetY.x + this._height, this._offsetY.y + this._height);
  }

  public moveLeft() {
    this._offsetX = new Vector2(this._offsetX.x - this._width, this._offsetX.y - this._width);
  }

  public moveRight() {
    this._offsetX = new Vector2(this._offsetX.x + this._width, this._offsetX.y + this._width);
  }

  get x(): number {
    return this._offsetX.x;
  }

  get y(): number {
    return this._offsetY.x;
  }
}