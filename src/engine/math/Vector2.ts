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

  public distance(vector: Vector2): number {
    return Vector2.distance(this, vector);
  }

  public magnitude(): number {
    return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
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

  public static zero = new Vector2(0, 0);

  public static distance(a: Vector2, b: Vector2): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
}
