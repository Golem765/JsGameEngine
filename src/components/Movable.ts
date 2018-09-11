import {GameComponent, Input} from '../engine';
import {Vector2} from '../engine/math';
import {Velocity} from './Velocity';

export class Movable extends GameComponent {

  private _velocityComponent: Velocity;
  private _speed: number;

  constructor(speed: number = 100) {
    super();
    this._speed = speed;
  }

  start() {
    super.start();
    this._velocityComponent = this.gameObject.getComponent(Velocity.name);
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

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
