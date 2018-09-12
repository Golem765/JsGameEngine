import {Mesh} from './Mesh';
import {Vector2} from '../math';
import * as chroma from 'chroma-js';

export class FadeMesh extends Mesh {

  private time: number;
  private color: string;

  constructor(private fadeTime: number) {
    super(2);
    this.time = new Date().getTime();
  }

  clone(): Mesh {
    const clone = new FadeMesh(this.fadeTime);
    clone.color = this.color;
    return clone;
  }

  render(context: CanvasRenderingContext2D, offset: Vector2): void {
    if (!this.color) {
      this.color = <string>context.fillStyle;
    }
    const passed = (new Date().getTime() - this.time) / 1000;
    let progression = passed / this.fadeTime;
    if (progression >= 1) {
      progression = 1;
    }
    context.fillStyle = chroma(this.color).alpha(1 - progression).css();
    if (progression === 1) {
      this.gameObject.removeMesh(this);
    }
  }
}