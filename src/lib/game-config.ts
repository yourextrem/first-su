import { AUTO, Scale, Types } from 'phaser';

export const gameConfig: Types.Core.GameConfig = {
    type: AUTO,
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Scale.FIT,
        parent: 'game-container',
        autoCenter: Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    pixelArt: true,
    roundPixels: true,
    render: {
        antialias: false,
        pixelArt: true
    }
};