import {GameObject} from './GameObject';
import {Lifecycle} from './Lifecycle';

export abstract class GameComponent extends Lifecycle {
  private _gameObject: GameObject;

  get gameObject(): GameObject {
    return this._gameObject;
  }

  set gameObject(value: GameObject) {
    this._gameObject = value;
  }
}
