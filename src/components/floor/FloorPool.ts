import {GameObject} from '../../engine';
import {Vector2} from '../../engine/math';

export class FloorPool extends GameObject {
  private _pool: GameObject[] = [];
  private _diameter: number;
  private _poolSize: number;

  private _freeItems: GameObject[] = [];
  private _vacantIndices: number[] = [];

  constructor(private radius: number,
              private center: Vector2,
              private prototype: GameObject) {
    super(
        new Vector2(radius * prototype.size.x + prototype.size.x, radius * prototype.size.y + prototype.size.y),
        center
    );
    this._diameter = this.radius * 2 + 1;
    this._poolSize = Math.ceil(Math.pow(this._diameter, 2));
    this._pool.length = this._poolSize;
  }

  innerAwake() {
    const maxDist = new Vector2(this.radius, this.radius).magnitude();
    const maxExp = Math.exp(maxDist);
    for (let x = -this.radius; x <= this.radius; x++) {
      for (let y = -this.radius; y <= this.radius; y++) {
        const dist = new Vector2(Math.abs(x), Math.abs(y)).magnitude();
        const probability = 1 - Math.exp(dist) / maxExp;

        const random = Math.random();
        const idx = (this._diameter + x - this.radius - 1) * (this._diameter) + (this._diameter + y - this.radius - 1);

        const item = this.prototype.clone();
        item.position = new Vector2(
            this.center.x + (item.size.x) * x,
            this.center.y + (item.size.y) * y
        );
        this._engine.addGameObject(item);
        if (random <= probability) {
          this._pool[idx] = item;
        } else {
          item.enabled = false;
          this._freeItems.push(item);
          this._vacantIndices.push(idx);
        }
      }
    }
  }
}