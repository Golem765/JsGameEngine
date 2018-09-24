import {GameComponent, Time} from '../engine';
import {Vector2} from '../engine/math';

export class Velocity extends GameComponent {
  private _velocity: Vector2 = new Vector2(0, 0);

  public addVelocity(velocity: Vector2) {
    this._velocity = new Vector2(this._velocity.x + velocity.x, this._velocity.y + velocity.y);
  }

  update() {
    this.gameObject.transform.position = new Vector2(
        this.gameObject.transform.position.x + this._velocity.x * Time.UPDATE_TIME,
        this.gameObject.transform.position.y + this._velocity.y * Time.UPDATE_TIME
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
