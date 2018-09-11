import {GameComponent} from '../engine';
import {Vector2} from '../engine/math';

export class Velocity extends GameComponent {
  private _velocity: Vector2 = new Vector2(0, 0);

  public addVelocity(velocity: Vector2) {
    this._velocity = new Vector2(this._velocity.x + velocity.x, this._velocity.y + velocity.y);
  }

  update(deltaTime: number) {
    this.gameObject.position = new Vector2(
        this.gameObject.position.x + this._velocity.x * deltaTime,
        this.gameObject.position.y + this._velocity.y * deltaTime
    );
  }

  get velocity(): Vector2 {
    return this._velocity.clone();
  }

  set velocity(value: Vector2) {
    this._velocity.x = value.x;
    this._velocity.y = value.y;
  }
}
