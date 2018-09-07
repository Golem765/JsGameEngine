import {Engine} from './engine/Engine';
import {Input} from './engine/Input';
import {Vector2} from './math/Vector2';
import {GameObject} from './engine/GameObject';
import {RectangleMesh} from './graphics/Mesh';
import * as chroma from 'chroma-js';

let engine: Engine;
let width: number;
let height: number;

try {
  Input.init();
  engine = init();
  create();
  engine.start();
  log('running...');

  document.getElementById('restart').addEventListener('click', () => {
    create();
    engine.start();
    log('running...');
  });

  document.getElementById('start').addEventListener('click', () => {
    engine.start();
    log('running...');
  });

  document.getElementById('stop').addEventListener('click', () => {
    engine.stop();
    log('stopped...');
  });

  window.addEventListener('resize', () => {
    engine.stop();
    engine = init();
    create();
    engine.start();
  });
} catch (e) {
  console.error(e);
}

function init(): Engine {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  width = window.innerWidth - 60;
  height = window.innerHeight - 80;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  return new Engine(context, width, height);
}

function log(text: string) {
  document.getElementById('info').innerText = text;
}

function create() {
  const center: Vector2 = new Vector2(width / 2, height / 2);
  const radius = 1;
  const squareWidth: number = 30;
  const squareHeight: number = 30;

  engine.clear();
  for (let x = -radius; x <= radius; x++) {
    const yRadius = radius - Math.abs(x);
    for (let y = -yRadius; y <= yRadius; y++) {
      const square = new GameObject(
          new Vector2(squareWidth, squareHeight),
          new Vector2(center.x + (squareWidth) * x,
              center.y + (squareHeight) * y)
      );
      square.mesh = new RectangleMesh(chroma.random().css());
      console.log(square);
      engine.addGameObject(square);
    }
  }
}
