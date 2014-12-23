var game = new Phaser.Game(16*36, 16*18, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	this.game.load.tilemap('maze', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('pacman', 'assets/pacman.png');
	this.game.load.spritesheet('man', 'assets/man.png', 16, 16, 8);
}

var player;
var cursors;
var layer;
var map;
var ghost;
var collision;

function create() {

	
	game.stage.backgroundColor = '#FFFFFF';

	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    map = this.game.add.tilemap('maze');
    map.addTilesetImage('pacman', 'pacman');

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    map.setCollisionByExclusion([35], true, 'Tile Layer 1');

    player = this.game.add.sprite(0*16, 16*16, 'man');

    player.frame = 4;
    this.game.physics.arcade.enable(player);
    this.game.physics.arcade.enable(layer);
    player.body.gravity.y = 365;
    //player.body.collideWorldBounds = true;

    // pills = this.game.add.group();
    // pills.enableBody = true;

    this.game.camera.follow(player);



    player.animations.add('left', [3, 2, 1, 0], 10, true);
    player.animations.add('right', [4, 5, 6, 7], 10, true);

    cursors = this.game.input.keyboard.createCursorKeys();

}

function update() {

	this.game.physics.arcade.collide(player, layer);

	if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        //player.body.velocity.y = !player.body.velocity.y;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        //player.body.velocity.y = !player.body.velocity.y;
        player.animations.play('right');
    }
    else
    {
    	player.animations.stop();
    	player.body.velocity.x = !player.body.velocity.x;
    }

    if (cursors.up.isDown && (player.body.touching.down || player.body.onFloor()))
    {
        player.body.velocity.y = -225;
        //player.body.velocity.x = !player.body.velocity.x;
    }

    if(player.body.bottom > this.world.bounds.bottom){
        player.kill();
        msg = game.add.text(game.canvas.width/2-50, game.canvas.height/2-15, 'U Suck!!!', { fontSize: '32px Simplifica', fill: '#FFF' });
        msg.fixedToCamera = true;
    }

}

