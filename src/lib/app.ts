"use strict"

class Game extends Phaser.Game {

    constructor() {

        super(800, 600, Phaser.AUTO, 'content', null);

        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }
}

class GameState extends Phaser.State {

    private map: Phaser.Tilemap;
    private layer: Phaser.TilemapLayer;
    private player: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;

    public preload(): void {

        this.game.load.tilemap('map', 'tilemaps/csv/catastrophi_level2.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tilemaps/tiles/catastrophi_tiles_16.png');
        this.game.load.image('player', 'sprites/tinycar.png');
    }

    public create(): void {

        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.map = this.game.add.tilemap('map', 16, 16);
        this.map.addTilesetImage('tiles');

        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

        this.map.setCollisionBetween(54, 83);
        this.game.physics.p2.convertTilemap(this.map, this.layer);

        this.player = this.game.add.sprite(48, 48, 'player');

        this.game.physics.p2.enable(this.player);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    public update(): void {

        if (this.cursors.left.isDown) {
            this.player.body.rotateLeft(100);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.rotateRight(100);
        }
        else {
            this.player.body.setZeroRotation();
        }

        if (this.cursors.up.isDown) {
            this.player.body.thrust(400);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.reverse(400);
        }
    }
}

new Game();