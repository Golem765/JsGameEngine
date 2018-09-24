import {Sprite} from './Sprite';
import * as chroma from 'chroma-js';
import {Viewport} from '../Viewport';

export class FadeSprite extends Sprite {

  private time: number;
  private color: string;

  constructor(private fadeTime: number, private onComplete: () => void) {
    super(2);
    this.time = new Date().getTime();
  }

  clone(): Sprite {
    const clone = new FadeSprite(this.fadeTime, this.onComplete);
    clone.color = this.color;
    return clone;
  }

  render(context: CanvasRenderingContext2D, viewport: Viewport): void {
    if (!this.color) {
      this.color = <string>context.fillStyle;
    }
    const passed = (new Date().getTime() - this.time) / 1000;
    let progression = passed / this.fadeTime;
    if (progression >= 1) {
      progression = 1;
    }
    context.fillStyle = chroma(this.color).alpha(1 - progression).css();
    if (progression >= 1) {
      this.gameObject.removeSprite(this);
      this.onComplete();
    }
  }
}