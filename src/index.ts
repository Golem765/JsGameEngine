import {Engine, GameObject} from './engine';
import {Vector2} from './engine/math';
import {RandomColorMesh, RectangleMesh} from './engine/graphics';
import {FloorPool} from './objects/floor/FloorPool';
import {Player} from './objects/Player';

let engine: Engine;
let width: number;
let height: number;

try {
  engine = init();
  log('running...');

  document.getElementById('restart').addEventListener('click', () => {
    engine.clear();
    engine = init();
    log('running...');
  });

  document.getElementById('start').addEventListener('click', () => {
    engine.resume();
    log('running...');
  });

  document.getElementById('stop').addEventListener('click', () => {
    engine.stop();
    log('stopped...');
  });

  window.addEventListener('resize', () => {
    engine.stop();
    engine = init();
  });
} catch (e) {
  console.error(e);
  log(e);
}

function init(): Engine {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  width = window.innerWidth - 60;
  height = window.innerHeight - 80;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  const engine = new Engine(context, width, height);
  const center: Vector2 = new Vector2(width / 2, height / 2);
  const radius = 6;
  const squareWidth: number = 30;
  const squareHeight: number = 30;

  const floorItem = new GameObject(new Vector2(squareWidth / 2, squareHeight / 2));
  floorItem.mesh = new RandomColorMesh();
  floorItem.mesh = new RectangleMesh();
  const floor = new FloorPool(radius, center, floorItem);
  engine.addGameObject(floor);

  const player = new Player(
      new Vector2(squareWidth, squareHeight),
      new Vector2(center.x, center.y),
  );

  engine.addGameObject(player);
  engine.launch();
  return engine;
}

function log(text: string) {
  document.getElementById('info').innerText = text;
}
