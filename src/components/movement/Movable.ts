import {Velocity} from '../Velocity';
import {GameComponent, Input, Time} from '../../engine';
import {Vector2} from '../../engine/math';

export class Movable extends GameComponent {

  private _velocityComponent: Velocity;
  private _speed: number;

  constructor(speed: number = 100) {
    super();
    this._speed = speed;
  }

  onStart() {
    this._velocityComponent = this.gameObject.getComponent(Velocity.name);
  }

  update() {
    this._velocityComponent.velocity = new Vector2(
        Input.horizontal * this._speed,
        this._velocityComponent.velocity.y
    );
    this.gameObject.transform.rotation = this.gameObject.transform.rotation + Time.UPDATE_TIME * Math.PI / 2 * Input.vertical;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
