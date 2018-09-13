import {GameObject} from '../engine';
import {BorderMesh, CircleMesh, ColorMesh} from '../engine/graphics';
import {Velocity} from '../components/Velocity';
import {Movable} from '../components/Movable';
import {Vector2} from '../engine/math';
import {RandomSpeedObject} from '../components/RandomSpeedObject';

export class Player extends GameObject {

  constructor(size: Vector2, position: Vector2) {
    super(size, position, 1024);
  }

  protected awake() {
    this.mesh = new ColorMesh('white');
    this.mesh = new BorderMesh('black');
    this.mesh = new CircleMesh();
    this.addComponent(new Velocity());
    this.addComponent(new RandomSpeedObject(1000));
  }
}