export class Input {

  private static _horizontal: number = 0;
  private static _vertical: number = 0;

  private static initialized: boolean = false;

  public static init() {
    if (Input.initialized) {
      throw new Error('Input already initialized');
    }
    document.addEventListener('keydown', event => {
      if (event.keyCode === 37) {
        this._horizontal = -1;
      }
      if (event.keyCode === 38) {
        this._vertical = 1;
      }
      if (event.keyCode === 39) {
        this._horizontal = 1;
      }
      if (event.keyCode === 40) {
        this._vertical = -1;
      }
    });
    document.addEventListener('keyup', event => {
      if (event.keyCode === 37 || event.keyCode === 39) {
        this._horizontal = 0;
      }
      if (event.keyCode === 38 || event.keyCode === 40) {
        this._vertical = 0;
      }
    });
    Input.initialized = true;
  }

  static get horizontal(): number {
    return this._horizontal;
  }

  static get vertical(): number {
    return this._vertical;
  }
}
