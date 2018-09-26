import {GameObject} from '../engine';
import {Vector2} from '../engine/math';
import {FillSprite, RectangleSprite} from '../engine/graphics';
import {Rigidbody} from '../engine/physics/Rigidbody';
import {Movement} from '../components/movement/Movement';

export class Player extends GameObject {

  constructor(size: Vector2, position: Vector2) {
    super(size, position, 0, 1024);
    this._tag = 'Player';
  }

  public onAwake() {
    this.sprites = new FillSprite('red');
    this.sprites = new RectangleSprite();
    this.addComponent(new Rigidbody());
    this.addComponent(new Movement());
  }
}