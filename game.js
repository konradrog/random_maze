// Phaser 2.12.0
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('block', 'images/block.png');
  game.load.spritesheet('mainCharacter', 'images/main_character.jpg', 64, 64);
}

var mainCharacter;
var cursors;
var customBounds;

function create() {
  game.stage.backgroundColor = '#124184';
  var bounds = new Phaser.Rectangle(150, 100, 400, 400);

  game.physics.startSystem(Phaser.Physics.P2JS);

  game.physics.p2.restitution = 0.9;


  var blocks = game.add.physicsGroup(Phaser.Physics.P2JS);

  // blocks.create(180, 100, 'block').body.static = true;
  // blocks.create(100, 200, 'block').body.static = true;
  // blocks.create(200, 400, 'block').body.static = true;
  // blocks.create(400, 300, 'block').body.static = true;

  mainCharacter = game.add.sprite(bounds.centerX, bounds.centerY, 'mainCharacter');
  mainCharacter.scale.set(1);
  mainCharacter.smoothed = false;
  mainCharacter.animations.add('move', [0,1,2,3,4,5], 10, true);
  mainCharacter.play('move');
  game.physics.p2.enable(mainCharacter);
  mainCharacter.body.setRectangle(64,64,0,0);
  mainCharacter.body.setZeroDamping();
  mainCharacter.body.fixedRotation = true;

  customBounds = { left: null, right: null, top: null, bottom: null };
  createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

  var graphics = game.add.graphics(bounds.x, bounds.y);
  graphics.lineStyle(4, 0xffd900, 1);
  graphics.drawRect(0, 0, bounds.width, bounds.height);

  cursors = game.input.keyboard.createCursorKeys();
}

function createPreviewBounds(x, y, w, h) {
                      // (150, 100, 400, 400);

    var sim = game.physics.p2;

    //  If you want to use your own collision group then set it here and un-comment the lines below
    var mask = sim.boundsCollisionGroup.mask;

    customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(y), sim.pxmi(x) ], angle: 1.5707963267948966 });
    customBounds.left.addShape(new p2.Plane());
    // customBounds.left.shapes[0].collisionGroup = mask;

    customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
    customBounds.right.addShape(new p2.Plane());
    // customBounds.right.shapes[0].collisionGroup = mask;

    customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
    customBounds.top.addShape(new p2.Plane());
    // customBounds.top.shapes[0].collisionGroup = mask;

    customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
    customBounds.bottom.addShape(new p2.Plane());
    // customBounds.bottom.shapes[0].collisionGroup = mask;

    sim.world.addBody(customBounds.left);
    sim.world.addBody(customBounds.right);
    sim.world.addBody(customBounds.top);
    sim.world.addBody(customBounds.bottom);

}


function update() {

    mainCharacter.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
		mainCharacter.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
		mainCharacter.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
    	mainCharacter.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
      mainCharacter.body.moveDown(200);
    }

}
