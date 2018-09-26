# About
This is a project of personal interest in building a Game Engine to understand one's internals

It consists of two parts:
1) Game engine built with typescript (all files in the `src/engine` folder)
2) The game itself

# Quick start

#### 1. Create html with canvas element:
      
     <html>
         <head></head>
         <body>
             <canvas id="canvas"></canvas>
         </body>
     </html>
     
#### 2. Acquire canvas element and init it's width and height:
       
     const canvas = document.getElementById('canvas');
     const width = window.innerWidth;
     const height = window.innerHeight;
     
     canvas.width = width;
     canvas.height = height;

#### 3. Acquire canvas context and create game engine:

    const context = canvas.getContext('2d');
      
    const engine = new Engine(context, width, height);
      
#### 4. Create movable player and start engine:

    const player = new Player(
          new Vector2(20, 20),
          new Vector2(100, 50),
    );
      
    engine.addGameObject(player);
    
    engine.launch();
    
#### 5. Enjoy your game and extend it further!
Full example can be found in the `src/index.ts` file.

# How it works
It implements a simple [Game Loop](http://gameprogrammingpatterns.com/game-loop.html) and [Update Method](http://gameprogrammingpatterns.com/update-method.html) patterns, as well as [Component](http://gameprogrammingpatterns.com/component.html).

As a rendering field it uses canvas.

Inputs are read from keyboard.

Physics uses rigid bodies.

## GameObject
### Lifecycle
#### Awake
`onAwake()` Guaranteed to be called once and only once on each `GameObject` before `onStart` and after addition to game engine.

Internally calls `onAwake` for every attached `GameComponent`.

#### Start
`onStart()` Called once on each `GameObject` after `Engine` launch or immediately after addition if `Engine` is already running. 

Internally calls `onStart` for every attached `GameComponent`.

*(For some strange reasons it sometimes get's called twice, working on solution)*

#### Update
`update()` Called each frame for every `GameObject` (even disabled).

Internally calls `update` for every attached `GameComponent`.

#### Destroy

`onDestroy()` Called before object removal from the game engine.

## GameComponent
Represents a piece of behavior of the `GameObject`
### Lifecycle
#### Awake
`onAwake()` Guaranteed to be called once and only once on each `GameComponent` by the owner `GameObject` before `onStart` and after addition to game engine.

This method is where one should init some internal properties that don't rely on other components.

#### Start
`onStart()` Called once on each `GameComponent` by the owning `GameObject` after `Engine` launch or immediately after `GameObject` addition to `Engine` if `Engine` is already running. 

This method is where one should init connections between components, as all components should be already attached prior to `onStart` call. Though it is possible to attach components afterwards, it is not an advised behavior.

It is responsibility of developer to make sure that all required `GameComponents` are attached to `GameObject` prior to `onStart`.

####Update
`update()` Called each frame for every `GameComponent`.

#### Destroy
`onDestroy()` Called before owner `GameObject` removal from the game engine.

*It will not be called when `GameComponent` is being removed from `GameObject`*

## Time

All time is managed using static class `Time`.
#### Fields
1) `time` contains time passed since engine launch.
2) `renderLag` at the beginning of the frame contains time since last frame and then decremented until it is lower than `UPDATE_TIME`. It is designed 
for internal engine's use and generally should not be accessed by user.
3) `UPDATE_TIME` time between update calls. It is always a constant and correctness of such behavior is maintained by the engine. This is the value you would like to use in order to set absolute speeds and etc.
 
## Sprite
Represents a drawable object and generally is just a bunch of instruction for canvas on how to draw element.

Sprites are attached to `GameObject` and are ordered, so that Sprite with lower order got executed first.

Think of combining sprites as of ordered method call, for example to draw a green rectangle one would do: 
     
     context.fillStyle = 'green';
     context.fillRect(x, y, sizeX, sizeY);
     
With presented Sprite system this is equivalent to adding first a `ColorSprite` and then a `RectangleSprite`
### Methods
#### Render
`render(context: CanvasRenderingContext2D, viewport: Viewport, alpha: number)` This method will be called each frame if the owner `GameObject` is enabled and visible in the current viewport.

`context` is canvas Context

`viewport` is current viewport of the canvas, it is used to draw meshes in relation to current canvas' virtual offset.

`alpha` part of the frame that was not executed by the game loop in order to synchronize update's timing. It is bound to [0,1) where 0 means that there is no time left for the current frame.
Should be used for graphical extrapolation.

### PolygonSprite
TODO

## Rigidbody

Represents an object that is affected by physical forces. 

Currently supports rotation and gravity.