import { Scene } from 'phaser';
import { Player } from './Player';

export class RPGScene extends Scene {
    private player!: Player;
    private statusText!: Phaser.GameObjects.Text;
    private worldScale: number = 1.2;
    private gameInitialized: boolean = false;
    private cameraZoom: number = 2.5;

    constructor() {
        super({ key: 'RPGScene' });
    }

    preload() {
        try {
            // Load character sprites
            this.load.atlas('character', 
                '/assets/sprites/Brightward.png',
                '/assets/sprites/Brightward.json'
            );

            // Load the tilemap and tileset
            this.load.tilemapTiledJSON('map', '/assets/maps/Rodeo.json');
            this.load.image('tiles', '/assets/maps/Rodeo.png');
            console.log('Assets loaded successfully');
        } catch (error) {
            console.error('Error in preload:', error);
        }
    }

    create() {
        try {
            // Create the tilemap
            const map = this.make.tilemap({ key: 'map' });
            if (!map) {
                throw new Error('Failed to create tilemap');
            }

            // Add the tileset image to the map
            const tileset = map.addTilesetImage('Rodeo', 'tiles');
            if (!tileset) {
                throw new Error('Failed to load tileset');
            }

            // Create the base map layer - named "Rodeo" in the JSON
            const baseLayer = map.createLayer('Rodeo', tileset, 0, 0);
            if (!baseLayer) {
                throw new Error('Failed to create base layer');
            }
            baseLayer.setScale(this.worldScale);
            baseLayer.setDepth(0); // Base layer at the bottom

            // Create the collision layer - named "collision" in the JSON
            const collisionLayer = map.createLayer('collision', tileset, 0, 0);
            if (!collisionLayer) {
                throw new Error('Failed to create collision layer');
            }
            collisionLayer.setScale(this.worldScale);
            collisionLayer.setVisible(false); // Hide collision layer
            
            // Create the top tree layer that will be rendered above the player
            const treeTopLayer = map.createLayer('Toptree', tileset, 0, 0);
            if (!treeTopLayer) {
                throw new Error('Failed to create tree top layer');
            }
            treeTopLayer.setScale(this.worldScale);
            treeTopLayer.setDepth(2); // Tree top layer above player

            // Set collision for specific tiles (35 for walls, 2 for floor borders)
            collisionLayer.setCollision([35, 2]);

            const worldWidth = map.widthInPixels * this.worldScale;
            const worldHeight = map.heightInPixels * this.worldScale;

            // Set world bounds
            this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

            // Create player in the center of the map
            this.player = new Player(
                this,
                worldWidth / 2,
                worldHeight / 2
            );
            
            // Set player scale and depth
            this.player.getSprite().setScale(0.75);
            this.player.getSprite().setDepth(1); // Player between base and tree top layers

            // Add collision between player and collision layer
            this.physics.add.collider(this.player.getSprite(), collisionLayer);

            // Camera setup
            this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
            this.cameras.main.startFollow(
                this.player.getSprite(),
                true,
                0.15,
                0.15
            );
            this.cameras.main.setZoom(this.cameraZoom);
            this.cameras.main.setRoundPixels(true);

            // UI setup
            this.setupUI();
            
            this.gameInitialized = true;
            console.log('Scene created successfully');

        } catch (error) {
            console.error('Error in create():', error);
            this.createBasicScene();
        }
    }

    private createBasicScene() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.physics.world.setBounds(0, 0, width * 2, height * 2);

        this.player = new Player(
            this,
            width / 2,
            height / 2
        );

        this.player.getSprite().setScale(0.75);

        this.cameras.main.startFollow(
            this.player.getSprite(),
            true,
            0.15,
            0.15
        );
        this.cameras.main.setZoom(this.cameraZoom);
        this.cameras.main.setRoundPixels(true);

        this.setupUI();
        this.gameInitialized = true;
    }

    private setupUI() {
        this.statusText = this.add.text(20, 20, '', {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(100);

        this.add.text(20, this.game.canvas.height - 120,
            'Controls:\nWASD: Move\nSpace: Attack\nShift: Block', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(100);
    }

    update() {
        if (!this.gameInitialized) return;

        if (this.player) {
            this.player.update();
            this.updateStatusDisplay();
        }
    }

    private updateStatusDisplay() {
        if (!this.statusText || !this.player) return;

        const stats = this.player.stats;
        this.statusText.setText(
            `Level: ${stats.level}\n` +
            `HP: ${stats.health}/${stats.maxHealth}\n` +
            `EXP: ${stats.experience}/${stats.level * 100}`
        );
    }
}