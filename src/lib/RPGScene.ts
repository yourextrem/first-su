import { Scene } from 'phaser';
import { Player } from './Player';

export class RPGScene extends Scene {
    private player!: Player;

    constructor() {
        super({ key: 'RPGScene' });
    }

    preload() {
        // Load character sprite
        this.load.atlas('character', '/assets/sprites/Brightward.png', '/assets/sprites/Brightward.json');
        
        // Load map
        this.load.image('tiles', '/assets/maps/Rodeo.png');
        this.load.tilemapTiledJSON('map', '/assets/maps/Rodeo.json');

        // Log untuk debugging
        console.log('Assets loading started');
    }

    create() {
        try {
            // Log untuk debugging
            console.log('Creating scene...');

            // Create map
            const map = this.make.tilemap({ key: 'map' });
            const tileset = map.addTilesetImage('Rodeo', 'tiles');

            if (!tileset) {
                throw new Error('Failed to load tileset');
            }

            // Create layers
            const baseLayer = map.createLayer('Rodeo', tileset, 0, 0);
            const collisionLayer = map.createLayer('collision', tileset, 0, 0);
            const treeTopLayer = map.createLayer('Toptree', tileset, 0, 0);

            if (!baseLayer || !collisionLayer || !treeTopLayer) {
                throw new Error('Failed to create map layers');
            }

            // Set collision
            collisionLayer.setCollisionByProperty({ collides: true });
            collisionLayer.setVisible(false);

            // Set depth
            baseLayer.setDepth(0);
            
            // Create player
            this.player = new Player(this, 400, 300);
            
            // Set player depth
            this.player.getSprite().setDepth(1);
            
            // Set tree top layer depth
            treeTopLayer.setDepth(2);

            // Add collision between player and collision layer
            this.physics.add.collider(this.player.getSprite(), collisionLayer);

            // Log success
            console.log('Scene created successfully');
        } catch (error) {
            console.error('Error in create():', error);
        }
    }

    update() {
        this.player?.update();
    }
}