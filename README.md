#About
This is a project of personal interest in building a Game Engine to understand one's internals

It consists of two parts:
1) Game engine built with typescript (all files in the `src/engine` folder)
2) The game itself

#How it works
It implements a simple [Game Loop](http://gameprogrammingpatterns.com/game-loop.html) and [Update Method](http://gameprogrammingpatterns.com/update-method.html) patterns, as well as [Component](http://gameprogrammingpatterns.com/component.html).

As a rendering field it uses canvas.

Inputs are read from keyboard.

##GameObject
###Lifecycle
####Awake
`awake()` Guaranteed to be called once and only once on each `GameObject` after addition to game engine.

####Start
`start()` Called once on each `GameObject` after `Engine` launch or immediately after addition if `Engine` is already running. 

Internally calls `start` for every attached `GameComponent`.

*(For some strange reasons it sometimes get's called twice, working on solution)*

####Update
`update(deltaTime: number)` Called each frame for every `GameObject` (even disabled).

Internally calls `update` for every attached `GameComponent`.

`deltaTime` is time in seconds that passed since last frame (update call)

####Render
`render(context: CanvasRenderingContext2D)` Called each frame for every GameObject (even disabled).

Internally calls `render` for each attached `Mesh`.

`context` is Canvas context which is acquired as `canvas.getContext('2d')` and passed to engine on construction. Generally one should not bother on how context is acquired as one should never call render himself, this method is called by engine only.

##GameComponent
Represents a piece of behavior of the `GameObject`
###Lifecycle
####Start
`start()` Called once on each `GameComponent` by the owning `GameObject` after `Engine` launch or immediately after `GameObject` addition to `Engine` if `Engine` is already running. 

This method is where one should init connections between components, as all components should be already attached prior to `start` call. Though it is possible to attach components afterwards, it is not an advised behavior.

It is responsibility of developer to make sure that all required `GameComponents` are attached to `GameObject` prior to `start`.

####Update
`update(deltaTime: number)` Called each frame for every `GameComponent`.

`deltaTime` is time in seconds that passed since last frame (update call)

###
##Mesh
Represents a drawable object and generally is just a bunch of instruction for canvas on how to draw element.

Meshes are attached to `GameObject` and are ordered, so that Meshes with lower order got executed first.

Think of combining meshes as of ordered method call, for example to draw a green rectangle one would do: 
     
     context.fillStyle = 'green';
     context.fillRect(x, y, sizeX, sizeY);
     
With presented Mesh system this is equivalent to adding first a `ColorMesh` and then a `RectangleMesh`
###Methods
####Render
`render(context: CanvasRenderingContext2D, offset: Vector2)` Called each frame by owning `GameObject`.

`context` is canvas Context
`offset` is current offset of the viewport, it is used to draw meshes in relation to current canvas 'virtual' offset.

For better example here is how `RectangleMesh` is implemented:

     context.fillRect(
             this._gameObject.position.x - offset.x - this._gameObject.size.x / 2,
             this._gameObject.position.y - offset.y - this._gameObject.size.y / 2,
             this._gameObject.size.x,
             this._gameObject.size.y
     );
It shifts drawing based on offset so that objects will move in relation to viewport without actual move.

Offset is calculated by the owning `GameObject` and passed to all `Meshes` on `render` call.