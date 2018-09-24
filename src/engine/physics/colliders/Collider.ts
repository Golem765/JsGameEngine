import {GameComponent} from '../../GameComponent';

export class Collider extends GameComponent {

  private _delegateSet: boolean = false;
  private _onCollisionDelegate: (other: Collider, direction: CollisionDirection) => void;

  set onCollisionDelegate(value: (other: Collider, direction: CollisionDirection) => void) {
    if (!this._delegateSet) {
      this._onCollisionDelegate = value;
      this._delegateSet = true;
    } else {
      throw 'Trying to overwrite delegate for collider, this behavior is not allowed';
    }
  }

  start() {
    this.gameObject.engine.physics.registerCollider(this);
  }

  onDestroy() {
    this.gameObject.engine.physics.deregisterCollider(this);
  }

  public onCollision(other: Collider, direction: CollisionDirection) {
    if (this._onCollisionDelegate) {
      this._onCollisionDelegate(other, direction);
    }
  }
}

export enum CollisionDirection {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}