export class Input {

  private static _horizontal: number = 0;
  private static _vertical: number = 0;
  private static _keys: Set<string> = new Set<string>();

  private static initialized: boolean = false;

  public static init() {
    if (Input.initialized) {
      return;
    }
    document.addEventListener('keydown', event => {
      if (event.keyCode === 37) {
        this._horizontal = -1;
      } else if (event.keyCode === 38) {
        this._vertical = 1;
      } else if (event.keyCode === 39) {
        this._horizontal = 1;
      } else if (event.keyCode === 40) {
        this._vertical = -1;
      } else {
        this._keys.add(event.code);
      }
    });
    document.addEventListener('keyup', event => {
      if (event.keyCode === 37 || event.keyCode === 39) {
        this._horizontal = 0;
      } else if (event.keyCode === 38 || event.keyCode === 40) {
        this._vertical = 0;
      } else {
        this._keys.delete(event.code);
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

  static getKey(name: string): boolean {
    return this._keys.has(name);
  }
}
