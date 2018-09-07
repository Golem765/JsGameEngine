import { GameComponent } from '../engine/GameComponent';
import { Input } from '../engine/Input';
import { Vector2 } from '../math/Vector2';
import { Velocity, VELOCITY_NAME } from './Velocity';

export class Movable extends GameComponent {

  private _velocityComponent: Velocity;
  private _speed: number;

  constructor(speed: number = 100) {
    super();
    this._speed = speed;
  }

  start() {
    super.start();
    this._velocityComponent = this.gameObject.getComponent(VELOCITY_NAME);
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this._velocityComponent.velocity = new Vector2(
      Input.horizontal * this._speed,
      this._velocityComponent.velocity.y
    );
    this._velocityComponent.velocity = new Vector2(
      this._velocityComponent.velocity.x,
      -Input.vertical * this._speed,
    );
  }

  getName() {
    return 'Movable';
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
