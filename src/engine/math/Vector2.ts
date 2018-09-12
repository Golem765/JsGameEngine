export class Vector2 {
  private _x: number;
  private _y: number;

  public static eps: number = 0.00001;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public multiply(value: number): Vector2 {
    return new Vector2(this._x * value, this._y * value);
  }

  public add(vector: Vector2): Vector2 {
    return new Vector2(this._x + vector._x, this._y + vector._y);
  }

  public subtract(vector: Vector2): Vector2 {
    return new Vector2(this._x - vector._x, this._y - vector._y);
  }

  public distance(vector: Vector2): number {
    return Vector2.distance(this, vector);
  }

  public normalized(): Vector2 {
    const magnitude = Math.abs(this.magnitude());
    if (magnitude < Vector2.eps) {
      return Vector2.zero;
    }
    return new Vector2(this._x / magnitude, this._y / magnitude);
  }

  public unitized(): Vector2 {
    const absX = Math.abs(this._x);
    const absY = Math.abs(this._y);

    return new Vector2(
        absX > Vector2.eps ? this._x / Math.abs(this._x) : 0,
        absY > Vector2.eps ? this._y / Math.abs(this._y) : 0);
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

  public static get zero() {
    return new Vector2(0, 0);
  }

  public static distance(a: Vector2, b: Vector2): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
}
