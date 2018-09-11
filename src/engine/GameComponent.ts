import {GameObject} from './GameObject';

export abstract class GameComponent {
  private _gameObject: GameObject;

  public start() {

  }

  public update(deltaTime: number) {
  }

  get gameObject(): GameObject {
    return this._gameObject;
  }

  set gameObject(value: GameObject) {
    this._gameObject = value;
  }
}
