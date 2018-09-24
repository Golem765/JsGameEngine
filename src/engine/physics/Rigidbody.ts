import {Vector2} from '../math';
import {GameComponent} from '../GameComponent';

export class Rigidbody extends GameComponent {
  private _acceleration: Vector2 = Vector2.zero;
  private _mass: number = 1;
  private _volume: number = 1;

  private _restitution: number;

  private _forces: Vector2 = Vector2.zero;

  constructor(private mass : number = 1,
              private restitution: number = 1) {
    super();
  }

  update() {
    let Fy = this._mass

  }
}