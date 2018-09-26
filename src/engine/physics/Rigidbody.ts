import {Vector2} from '../math';
import {GameComponent} from '../GameComponent';
import {Time} from '../Time';

export class Rigidbody extends GameComponent {
  private _mass: number = 1; // (m) kg

  private _velocity: Vector2 = Vector2.zero; // (v) m/s
  private _acceleration: Vector2 = Vector2.zero; // (a) m/s^2

  private _angularVelocity: number = 0; // (ω) rad/s
  private _angularAcceleration: number = 0; // (α) rad/s^2

  constructor() {
    super();
  }

  onAwake(): void {
    this._acceleration = new Vector2(0, this._mass * this.gameObject.engine.physics.constants.gravity * 100); // multiply by 100 to convert px/s to m/s
  }

  onStart(): void {
    super.onStart();
  }

  update() {
    // s(t+1) = s(t) + v(t)*T + (a*T^2)/2 : where s is the position, v is velocity, a is acceleration and T is time passed
    this.gameObject.transform.position = this.gameObject.transform.position
        .add(
            this._velocity.multiply(Time.UPDATE_TIME)
                .add(this._acceleration.multiply(Time.UPDATE_TIME * Time.UPDATE_TIME).multiply(0.5))
        );

    // v(t+1) = v(t) + a*T : where v is velocity, a is acceleration and T is time passed
    this._velocity = this._velocity.add(this._acceleration.multiply(Time.UPDATE_TIME));

    // Ω(t+1) = Ω(t) + ω(t)*T + (α*T^2)/2 : where Ω is the rotation, ω is angular velocity, α is angular acceleration and T is time passed
    this.gameObject.transform.rotation = this.gameObject.transform.rotation +
        this._angularVelocity * Time.UPDATE_TIME + (this._angularAcceleration * Time.UPDATE_TIME * Time.UPDATE_TIME);

    // ω(t+1) = ω(t) + α*T : where ω is angular velocity, α is angular acceleration and T is time passed
    this._angularVelocity = this._angularVelocity + this._angularAcceleration * Time.UPDATE_TIME;
  }

  // Readonly
  get velocity(): Vector2 {
    return this._velocity.clone();
  }

  set velocity(value: Vector2) {
    this._velocity = value.clone();
  }

  // Readonly
  get angularVelocity(): number {
    return this._angularVelocity;
  }

  set angularVelocity(value: number) {
    this._angularVelocity = value;
  }
}