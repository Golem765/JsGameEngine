import {Engine, GameObject} from './engine';
import {Vector2} from './engine/math';
import {BorderMesh, CircleMesh, ColorMesh, RandomColorMesh, RectangleMesh} from './engine/graphics';
import {Movable} from './components/Movable';
import {Velocity} from './components/Velocity';
import {FloorPool} from './components/floor/FloorPool';

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
  const radius = 4;
  const squareWidth: number = 30;
  const squareHeight: number = 30;

  const floorItem = new GameObject(new Vector2(squareWidth, squareHeight));
  floorItem.mesh = new RandomColorMesh();
  floorItem.mesh = new RectangleMesh();
  const floor = new FloorPool(radius, center, floorItem);
  engine.addGameObject(floor);

  const player = new GameObject(
      new Vector2(squareWidth, squareHeight),
      new Vector2(center.x, center.y),
      100
  );

  player.mesh = new ColorMesh('white');
  player.mesh = new BorderMesh('black');
  player.mesh = new CircleMesh();
  player.addComponent(new Velocity());
  player.addComponent(new Movable());
  engine.addGameObject(player);
  engine.launch();
  return engine;
}

function log(text: string) {
  document.getElementById('info').innerText = text;
}
