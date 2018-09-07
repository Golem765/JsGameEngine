export class Vector2 {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public multiply(value: number) {
    this._x = this._x * value;
    this._y = this._y * value;
  }

  public substract(vector: Vector2) {
    this._x = this._x - vector._x;
    this._y = this._y - vector._y;
  }

  public clone() {
    return new Vector2(this._x, this._y);
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}
