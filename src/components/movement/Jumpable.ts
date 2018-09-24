import {GameComponent, Input} from '../../engine';
import {Velocity} from '../Velocity';
import {Vector2} from '../../engine/math';

export class Jumpable extends GameComponent {

  private _velocityComponent: Velocity;

  constructor(private force: number = 20) {
    super();
  }

  onStart() {
  }

  update() {
    if (Input.getKey('Space')) {
      this._velocityComponent.velocity = new Vector2(
          this._velocityComponent.velocity.x,
          -this.force
      );
    }
  }
}