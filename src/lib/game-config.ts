import { AUTO, Scale, Types } from 'phaser';

export const gameConfig: Types.Core.GameConfig = {
    type: AUTO,
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Scale.RESIZE, // Menggunakan RESIZE untuk fullscreen dinamis
        autoCenter: Scale.CENTER_BOTH,
        width: '100%',
        height: '100%',
        min: {
            width: 800,
            height: 600
        },
        expandParent: true,
        fullscreenTarget: 'game-container'
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
        pixelArt: true,
        powerPreference: 'high-performance' // Optimasi performa
    }
};