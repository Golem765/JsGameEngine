import {Vector2} from '../math';
import {GameObject} from '..';
import * as chroma from 'chroma-js';

export abstract class Mesh {
  protected _gameObject: GameObject;
  private _order: number;

  protected constructor(order: number) {
    this._order = order;
  }

  abstract render(context: CanvasRenderingContext2D, offset: Vector2): void;

  get gameObject(): GameObject {
    return this._gameObject;
  }

  set gameObject(value: GameObject) {
    this._gameObject = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  abstract clone(): Mesh;
}

export class ColorMesh extends Mesh {
  protected _color: string;

  constructor(color: string) {
    super(0);
    this._color = color;
  }

  render(context: CanvasRenderingContext2D, offset: Vector2) {
    context.fillStyle = this._color;
  }

  clone(): Mesh {
    return new ColorMesh(this._color);
  }
}

export class RandomColorMesh extends ColorMesh {
  constructor() {
    super(chroma.random().css());
  }
}

export class RandomChangeColorMesh extends ColorMesh {
  private _time: number;
  private _random: number;

  constructor(color: string) {
    super(color);
    this._time = new Date().getTime();
    this._random = Math.random();
  }

  render(context: CanvasRenderingContext2D, offset: Vector2): void {
    const newTime = new Date().getTime();
    if ((newTime - this._time) / 1000 > this._random) {
      this._color = chroma.random().css();
      this._time = newTime;
      this._random = Math.random();
    }
    super.render(context, offset);
  }

  clone(): Mesh {
    const clone: RandomChangeColorMesh = <RandomChangeColorMesh> super.clone();
    clone._time = this._time;
    clone._random = this._random;
    return clone;
  }
}

export class RectangleMesh extends Mesh {

  constructor() {
    super(1);
  }

  render(context: CanvasRenderingContext2D, offset: Vector2): void {
    context.fillRect(
        this._gameObject.position.x - offset.x - this._gameObject.size.x / 2,
        this._gameObject.position.y - offset.y - this._gameObject.size.y / 2,
        this._gameObject.size.x,
        this._gameObject.size.y
    );
  }

  clone(): Mesh {
    return new RectangleMesh();
  }
}

export class BorderMesh extends Mesh {
  protected _color: string;

  constructor(color: string) {
    super(0);
    this._color = color;
  }

  render(context: CanvasRenderingContext2D, offset: Vector2) {
    context.strokeStyle = this._color;
  }

  clone(): Mesh {
    return new BorderMesh(this._color);
  }
}

export class CircleMesh extends Mesh {

  constructor() {
    super(1);
  }

  render(context: CanvasRenderingContext2D, offset: Vector2): void {
    context.beginPath();
    context.arc(this._gameObject.position.x - offset.x, this._gameObject.position.y - offset.y, this._gameObject.size.x / 2, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }

  clone(): Mesh {
    return new CircleMesh();
  }
}
