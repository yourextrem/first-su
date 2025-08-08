import { AUTO, Scale, Types } from 'phaser';

export const gameConfig: Types.Core.GameConfig = {
    type: AUTO,
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        min: {
            width: 800,
            height: 600
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    pixelArt: true,
    roundPixels: true,
    antialias: false,
    // Add more verbose logging
    banner: {
        hidePhaser: false,
        text: '#ffffff',
        background: ['#2d2d2d']
    }
};