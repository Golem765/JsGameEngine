import {GameObject} from '../../engine';
import {Vector2} from '../../engine/math';
import {Collider} from '../../engine/physics/colliders/Collider';
import {FillSprite, RectangleSprite} from '../../engine/graphics';

export class Rectangle extends GameObject {

  constructor(size: Vector2, position: Vector2) {
    super(size, position, 0, 1024);
    this._tag = 'Rectangle';
  }

  public onAwake() {
    this.sprites = new FillSprite('green');
    this.sprites = new RectangleSprite();

    const collider = new Collider();
    collider.onCollisionDelegate = (other) => {

    };
    this.addComponent(collider);
  }
}