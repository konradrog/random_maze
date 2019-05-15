
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/walls_1x2.png');
    game.load.image('tiles2', 'assets/tiles2.png');
    game.load.image('mainCharacter', 'assets/thrust_ship2.png');
    game.load.image('bullet', 'assets/thrust_ship3.png');

}

var mainCharacter;
var map;
var layer;
var cursors;
var weapon;

function create() {



    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#2d2d2d';

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2');

    layer = map.createLayer('Tile Layer 1');

    // layer.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 12);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);

    mainCharacter = game.add.sprite(200, 200, 'mainCharacter');

    weapon = game.add.weapon(30, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 100;
    weapon.fireRate = 100;

    weapon.trackSprite(mainCharacter, 0, 0);

    game.physics.p2.enable(mainCharacter);

    game.camera.follow(mainCharacter);

    //  By default the ship will collide with the World bounds,
    //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
    //  you need to rebuild the physics world boundary as well. The following
    //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
    //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
    //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    //  Even after the world boundary is set-up you can still toggle if the ship collides or not with this:
    // ship.body.collideWorldBounds = false;

    cursors = game.input.keyboard.createCursorKeys();
    weapon_directions = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D });

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

  if (weapon_directions.up.isDown) {
    weapon.fireAngle = 270;
    weapon.fire();
  }

  if (weapon_directions.down.isDown) {
    weapon.fireAngle = 90;
    weapon.fire();
  }

  if (weapon_directions.left.isDown) {
    weapon.fireAngle = 180;
    weapon.fire();
  }

  if (weapon_directions.right.isDown) {
    weapon.fireAngle = 0;
    weapon.fire();
  }

}

function render() {

}
