import {Vector2} from '../math';
import {GameObject} from '..';
import {Viewport} from '../Viewport';

export abstract class Sprite {
  protected _gameObject: GameObject;
  private _order: number;

  protected constructor(order: number) {
    this._order = order;
  }

  render(context: CanvasRenderingContext2D, viewport: Viewport, alpha: number): void {
  }

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

  abstract clone(): Sprite;
}

export class FillSprite extends Sprite {
  protected _color: string;

  constructor(color: string) {
    super(0);
    this._color = color;
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this._color;
  }

  clone(): Sprite {
    return new FillSprite(this._color);
  }
}

export class PolygonSprite extends Sprite {
  protected _vertices: Vector2[] = [];
  protected _previousVertices: Vector2[] = [];

  constructor(vertices: Vector2[]) {
    super(10);
    this._vertices = vertices.map(v => v.clone());
    this._previousVertices = vertices.map(v => v.clone());
  }

  clone(): Sprite {
    return new PolygonSprite(this._vertices);
  }

  render(context: CanvasRenderingContext2D, viewport: Viewport, alpha: number): void {
    const frameVertices = this._vertices.map(v => v.clone());
    for (let i = 0; i < frameVertices.length; i++) {
      frameVertices[i] = this._vertices[i].rotate(this.gameObject.transform.rotation, this.gameObject.transform.position);
    }
    context.beginPath();

    context.moveTo(frameVertices[0].x - viewport.x, frameVertices[0].y - viewport.y);
    for (let i = 1; i < frameVertices.length; i++) {
      context.lineTo(frameVertices[i].x - viewport.x, frameVertices[i].y - viewport.y);
    }
    context.lineTo(frameVertices[0].x - viewport.x, frameVertices[0].y - viewport.y);

    context.fill();
    context.stroke();

    context.closePath();

    this._previousVertices = frameVertices.map(v => v.clone());
  }
}

export class RectangleSprite extends PolygonSprite {

  constructor() {
    super([]);
  }

  render(context: CanvasRenderingContext2D, viewport: Viewport, alpha: number): void {
    this.setVertices();
    super.render(context, viewport, alpha);
  }

  private setVertices(): void {
    const position = this.gameObject.transform.position;
    const radius = this.gameObject.transform.size.multiply(0.5);

    this._vertices = [
      new Vector2(position.x - radius.x, position.y - radius.y),
      new Vector2(position.x + radius.x, position.y - radius.y),
      new Vector2(position.x + radius.x, position.y + radius.y),
      new Vector2(position.x - radius.x, position.y + radius.y)
    ];
  }

  clone(): Sprite {
    return new RectangleSprite();
  }
}
