import {GameObject} from '../../engine';
import {Vector2} from '../../engine/math';
import {Player} from '../Player';
import {FadeMesh} from '../../engine/graphics/FadeMesh';
import {isNullOrUndefined} from 'util';

export class FloorPool extends GameObject {
  private _pool: GameObject[] = [];
  private _diameter: number;
  private _poolSize: number;
  private _itemSize: number;
  private _fadeSecs: number = 1.0;
  private _realRadius: number;

  private _player: GameObject;

  private static arg_pow = 4 / 5;

  private _freeItems: GameObject[] = [];
  private _vacantIndices: number[] = [];

  private _maxExp: number;

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

    const maxDist = new Vector2(this.radius, this.radius).magnitude();
    this._maxExp = Math.exp(Math.pow(maxDist, FloorPool.arg_pow));
  }

  awake() {
    for (let x = -this.radius; x <= this.radius; x++) {
      for (let y = -this.radius; y <= this.radius; y++) {

        const idx = this.getIdx(x, y);

        const item = this.prototype.clone();
        item.position = new Vector2(
            this.center.x + (item.size.x) * x,
            this.center.y + (item.size.y) * y
        );
        this._engine.addGameObject(item);
        if (this.getExistenceProbability(new Vector2(x, y))) {
          this._pool[idx] = item;
        } else {
          item.enabled = false;
          this._freeItems.push(item);
        }
      }
    }
    for(let i = 0; i < this._poolSize * 20; i++){
      const item = this.prototype.clone();
      this._engine.addGameObject(item);
      item.enabled = false;
      this._freeItems.push(item);
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
      const direction = playerPos.subtract(this.center).unitized();
      this.center = this.center.add(direction.multiply(this._itemSize));
      this.reindex(direction);
    }
    this.fillGaps();

    super.update(deltaTime);
  }

  private reindex(change: Vector2) {
    this._vacantIndices = [];
    const newPool: GameObject[] = new Array(this._poolSize);
    for (let i = 0; i < this._poolSize; i++) {
      const item = this._pool[i];
      if (!item) continue;
      const colRow = this.getColRowOffset(i);
      const newColRow = colRow.subtract(change);
      const newIdx = this.getIdx(newColRow.x, newColRow.y);
      if (this.outbound(newColRow)) {
        this.fadeItem(item);
      } else {
        if (this.getExistenceProbability(newColRow)) {
          newPool[newIdx] = item;
        } else {
          this.fadeItem(item);
        }
      }
    }
    for (let i = 0; i < this._poolSize; i++) {
      if (!newPool[i]) {
        this._vacantIndices.push(i);
      }
    }
    this._pool = newPool;
  }

  private fillGaps() {
    let idx = this._vacantIndices.pop();
    while (!isNullOrUndefined(idx)) {
      let item = this._freeItems.pop();
      if (!isNullOrUndefined(item)) {
        const offset = this.getColRowOffset(idx);
        if (this.getExistenceProbability(offset)) {
          item.enabled = true;
          item.position = new Vector2(
              this.center.x + (item.size.x) * offset.x,
              this.center.y + (item.size.y) * offset.y
          );
          this._pool[idx] = item;
        } else {
          this._freeItems.push(item);
        }
      } else {
        this._vacantIndices.push(idx);
        break;
      }
      idx = this._vacantIndices.pop();
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

  private getColRowOffset(idx: number): Vector2 {
    return new Vector2(
        Math.floor(idx / this._diameter) - this.radius,
        Math.floor(idx % this._diameter) - this.radius
    );
  }

  private outbound(offset: Vector2): boolean {
    return Math.abs(offset.x) > this.radius || Math.abs(offset.y) > this.radius;
  }

  private getExistenceProbability(offset: Vector2): boolean {
    const dist = new Vector2(Math.abs(offset.x), Math.abs(offset.y)).magnitude();
    return Math.random() <= 1 - Math.exp(Math.pow(dist, FloorPool.arg_pow)) / this._maxExp;
  }

  private fadeItem(item: GameObject) {
    item.mesh = new FadeMesh(this._fadeSecs, this._freeItems);
  }
}