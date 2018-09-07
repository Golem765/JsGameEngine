import { GameComponent } from '../engine/GameComponent';
import { Vector2 } from '../math/Vector2';
import { Velocity, VELOCITY_NAME } from './Velocity';

export class RandomSpeedObject extends GameComponent {

  private _velocityComponent: Velocity;
  private _baseSpeed: number;

  constructor(baseSpeed?: number) {
    super();
    this._baseSpeed = baseSpeed || 200;
  }

  start() {
    this._velocityComponent = this.gameObject.getComponent<Velocity>(VELOCITY_NAME);
    this._velocityComponent.velocity = new Vector2(this._baseSpeed * (Math.random() * 2 - 1), this._baseSpeed * (Math.random() * 2 - 1));
  }

  update(deltaTime: number) {
    if (this.gameObject.horizontalBound.y > this.gameObject.offset[0].y) {
      this._velocityComponent.velocity = new Vector2(-this._baseSpeed * Math.random(), this._velocityComponent.velocity.y);
    }
    if (this.gameObject.horizontalBound.x < this.gameObject.offset[0].x) {
      this._velocityComponent.velocity = new Vector2(this._baseSpeed * Math.random(), this._velocityComponent.velocity.y);
    }
    if (this.gameObject.verticalBound.x < this.gameObject.offset[1].x) {
      this._velocityComponent.velocity = new Vector2(this._velocityComponent.velocity.x, this._baseSpeed * Math.random());
    }
    if (this.gameObject.verticalBound.y > this.gameObject.offset[1].y) {
      this._velocityComponent.velocity = new Vector2(this._velocityComponent.velocity.x, -this._baseSpeed * Math.random());
    }
  }

  getName() {
    return 'RandomSpeedObject';
  }
}
