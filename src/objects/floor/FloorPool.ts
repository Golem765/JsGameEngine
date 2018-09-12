import {GameObject} from '../../engine';
import {Vector2} from '../../engine/math';
import {Player} from '../Player';
import {FadeMesh} from '../../engine/graphics/FadeMesh';

export class FloorPool extends GameObject {
  private _pool: GameObject[] = [];
  private _diameter: number;
  private _poolSize: number;
  private _itemSize: number;
  private _fadeSecs: number = 1;
  private _realRadius: number;

  private _player: GameObject;

  private static arg_pow = 4 / 5;

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
    this._itemSize = prototype.size.x;
    this._realRadius = this.radius * this._itemSize;
  }

  awake() {
    const maxDist = new Vector2(this.radius, this.radius).magnitude();
    const maxExp = Math.exp(Math.pow(maxDist, FloorPool.arg_pow));
    for (let x = -this.radius; x <= this.radius; x++) {
      for (let y = -this.radius; y <= this.radius; y++) {
        const dist = new Vector2(Math.abs(x), Math.abs(y)).magnitude();
        const probability = 1 - Math.exp(Math.pow(dist, FloorPool.arg_pow)) / maxExp;

        const random = Math.random();
        const idx = this.getIdx(x, y);

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

  start(): void {
    this._player = this._engine.findObject(Player.name);
    if (!this._player) {
      console.trace('Could not find player');
      throw 'No player in FloorPool';
    }
    super.start();
  }

  update(deltaTime: number): void {
    const playerPos = this._player.position;
    if (Vector2.distance(this.center, playerPos) > this._itemSize) {
      const direction = playerPos.subtract(this.center).normalized();
      this.center = this.center.add(direction.multiply(this._itemSize));
      this.reindex();
    }
    super.update(deltaTime);
  }

  private reindex() {
    for (let i = 0; i < this._poolSize; i++) {
      const item = this._pool[i];
      if (item && Vector2.distance(item.position, this.center) > this._realRadius) {
        item.mesh = new FadeMesh(this._fadeSecs);
        setTimeout(() => {
          item.enabled = false;
          this._freeItems.push(item);
        }, this._fadeSecs * 1000);
        this._vacantIndices.push(i);
        this._pool[i] = null;
      }
    }
  }

  private getIdx(col: number, row: number) {
    return (this._diameter + col - this.radius - 1) * (this._diameter) + (this._diameter + row - this.radius - 1);
  }

  private getColRow(idx: number): Vector2 {
    return new Vector2(
        Math.floor(idx / this._diameter),
        Math.floor(idx % this._diameter)
    );
  }
}