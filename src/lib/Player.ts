import { Scene } from 'phaser';

export class Player {
    private sprite: Phaser.Physics.Arcade.Sprite;
    private cursors: {
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        space: Phaser.Input.Keyboard.Key;
        shift: Phaser.Input.Keyboard.Key;
    };
    private scene: Scene;
    private moveSpeed: number = 200;
    private isAttacking: boolean = false;
    private isBlocking: boolean = false;
    private currentAttackCombo: number = 1;
    private lastAttackTime: number = 0;
    
    public stats = {
        health: 100,
        maxHealth: 100,
        level: 1,
        experience: 0
    };

    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'character');
        
        // Perkecil ukuran sprite
        this.sprite.setScale(0.7);

        // Setup WASD controls with proper type checking
        if (!scene.input?.keyboard) {
            throw new Error('Keyboard input is not available');
        }

        const keyboard = scene.input.keyboard;
        
        this.cursors = {
            up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            shift: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        };

        // Set up character physics
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body?.setSize(35, 35);

        // Create animations
        this.createAnimations();
        
        // Start with idle animation
        this.sprite.play('Idle');
    }

    private createAnimations() {
        // Helper function untuk membuat frame names
        const createFrameNames = (tag: string, start: number, end: number) => {
            const frames = [];
            for (let i = start; i <= end; i++) {
                frames.push({ key: 'character', frame: `Brightward #${tag} ${i}.aseprite` });
            }
            return frames;
        };

        // Idle animation
        this.scene.anims.create({
            key: 'Idle',
            frames: createFrameNames('Idle', 0, 5),
            frameRate: 10,
            repeat: -1
        });

        // Walk animation
        this.scene.anims.create({
            key: 'Walk01',
            frames: createFrameNames('Walk01', 0, 7),
            frameRate: 10,
            repeat: -1
        });

        // Attack animations
        const attackConfigs = [
            { name: 'Attack01', end: 6 },
            { name: 'Attack02', end: 7 },
            { name: 'Attack03', end: 9 }
        ];

        attackConfigs.forEach(config => {
            this.scene.anims.create({
                key: config.name,
                frames: createFrameNames(config.name, 0, config.end),
                frameRate: 15,
                repeat: 0
            });
        });

        // Block animation
        this.scene.anims.create({
            key: 'Block',
            frames: createFrameNames('Block', 0, 3),
            frameRate: 15,
            repeat: 0
        });

        // Hurt animation
        this.scene.anims.create({
            key: 'Hurt',
            frames: createFrameNames('Hurt', 0, 3),
            frameRate: 15,
            repeat: 0
        });

        // Death animation
        this.scene.anims.create({
            key: 'Death',
            frames: createFrameNames('Death', 0, 3),
            frameRate: 10,
            repeat: 0
        });
    }

    update() {
        if (!this.sprite.body) return;

        // Handle attack
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const currentTime = Date.now();
            if (currentTime - this.lastAttackTime > 500) {
                this.currentAttackCombo = 1;
            }
            
            this.isAttacking = true;
            const attackAnim = `Attack0${this.currentAttackCombo}`;
            
            this.sprite.play(attackAnim, true);
            this.sprite.once('animationcomplete', () => {
                this.isAttacking = false;
                this.sprite.play('Idle', true);
            });

            this.currentAttackCombo = (this.currentAttackCombo % 3) + 1;
            this.lastAttackTime = currentTime;
            return;
        }

        // Handle block
        if (this.cursors.shift.isDown && !this.isAttacking) {
            if (!this.isBlocking) {
                this.isBlocking = true;
                this.sprite.play('Block', true);
            }
            return;
        } else if (this.isBlocking) {
            this.isBlocking = false;
            this.sprite.play('Idle', true);
        }

        // Handle movement if not attacking or blocking
        if (!this.isAttacking && !this.isBlocking) {
            // Reset velocity
            this.sprite.setVelocity(0);

            let isMoving = false;

            if (this.cursors.left.isDown) {
                this.sprite.setVelocityX(-this.moveSpeed);
                this.sprite.setFlipX(true);
                isMoving = true;
            }
            else if (this.cursors.right.isDown) {
                this.sprite.setVelocityX(this.moveSpeed);
                this.sprite.setFlipX(false);
                isMoving = true;
            }

            if (this.cursors.up.isDown) {
                this.sprite.setVelocityY(-this.moveSpeed);
                isMoving = true;
            }
            else if (this.cursors.down.isDown) {
                this.sprite.setVelocityY(this.moveSpeed);
                isMoving = true;
            }

            // Play appropriate animation
            if (isMoving) {
                if (!this.sprite.anims.isPlaying || this.sprite.anims.currentAnim?.key === 'Idle') {
                    this.sprite.play('Walk01', true);
                }
            } else {
                if (!this.sprite.anims.isPlaying || this.sprite.anims.currentAnim?.key === 'Walk01') {
                    this.sprite.play('Idle', true);
                }
            }
        }
    }

    getSprite() {
        return this.sprite;
    }

    takeDamage(amount: number) {
        if (!this.isBlocking) {
            this.stats.health = Math.max(0, this.stats.health - amount);
            this.sprite.play('Hurt', true);
            this.sprite.once('animationcomplete', () => {
                if (this.stats.health <= 0) {
                    this.sprite.play('Death', true);
                } else {
                    this.sprite.play('Idle', true);
                }
            });
        }
    }

    heal(amount: number) {
        this.stats.health = Math.min(this.stats.maxHealth, this.stats.health + amount);
    }

    gainExperience(amount: number) {
        this.stats.experience += amount;
        if (this.stats.experience >= this.stats.level * 100) {
            this.stats.level++;
            this.stats.experience = 0;
            this.stats.maxHealth += 20;
            this.stats.health = this.stats.maxHealth;
        }
    }
}