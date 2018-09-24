import {GameObject} from '../engine';
import {Velocity} from '../components/Velocity';
import {Vector2} from '../engine/math';
import {Movable} from '../components/movement/Movable';
import {Jumpable} from '../components/movement/Jumpable';
import {FillSprite, RectangleSprite} from '../engine/graphics';

export class Player extends GameObject {

  constructor(size: Vector2, position: Vector2) {
    super(size, position, 0, 1024);
    this._tag = 'Player';
  }

  public onAwake() {
    this.sprites = new FillSprite('white');
    this.sprites = new RectangleSprite();
    this.addComponent(new Velocity());
    this.addComponent(new Movable(100));
    this.addComponent(new Jumpable());
  }
}