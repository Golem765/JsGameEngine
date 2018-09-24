import {Collider} from './colliders/Collider';

export class PhysicsEngine {

  private colliders: Collider[] = [];

  constructor(private _constants: PhysicsConstants = new PhysicsConstants()) {

  }

  public registerCollider(collider: Collider) {
    if (this.colliders.indexOf(collider) === -1) {
      this.colliders.push(collider);
    }
  }

  public deregisterCollider(collider: Collider) {
    const idx = this.colliders.indexOf(collider);
    if (idx !== -1) {
      this.colliders.splice(idx);
    }
  }

  public update() {

  }

  get constants(): PhysicsConstants {
    return this._constants;
  }
}

export class PhysicsConstants {
  airDensity: number = 1;
  gravity: number = 9.8;
}