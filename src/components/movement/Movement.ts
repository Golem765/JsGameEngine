import {GameComponent, Input, Time} from '../../engine';
import {Vector2} from '../../engine/math';
import {Rigidbody} from '../../engine/physics/Rigidbody';

export class Movement extends GameComponent {

  private _rigidbody: Rigidbody;

  constructor(private speed: number = 100,
              private jumpForce: number = 100) {
    super();
  }

  onStart() {
    this._rigidbody = this.gameObject.getComponent(Rigidbody.name);
  }

  update() {
    this._rigidbody.velocity = new Vector2(
        Input.horizontal * this.speed,
        this._rigidbody.velocity.y
    );
    if (Input.getKey('Space')) {
      this._rigidbody.velocity = new Vector2(
          this._rigidbody.velocity.x,
          -this.jumpForce
      );
    }
    this._rigidbody.angularVelocity = Time.UPDATE_TIME * Math.PI * this.speed * Input.vertical;
  }
}
