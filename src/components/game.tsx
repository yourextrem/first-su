'use client';

import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { gameConfig } from '@/lib/game-config';
import { RPGScene } from '@/lib/RPGScene';

export default function GameComponent() {
    const gameRef = useRef<Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initGame = () => {
            try {
                if (typeof window !== 'undefined' && !gameRef.current && containerRef.current) {
                    // Make sure Phaser is loaded
                    if (typeof window.Phaser === 'undefined') {
                        console.warn('Phaser is not loaded yet, waiting...');
                        setTimeout(initGame, 100);
                        return;
                    }

                    const config = {
                        ...gameConfig,
                        scene: RPGScene,
                        parent: containerRef.current
                    };

                    console.log('Creating game with config:', config);
                    gameRef.current = new Game(config);
                }
            } catch (error) {
                console.error('Error initializing game:', error);
            }
        };

        // Start initialization
        initGame();

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div 
                ref={containerRef}
                className="w-[800px] h-[600px] border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg"
            />
            <div className="mt-4 text-white text-center">
                <h2 className="text-xl font-bold mb-2">Game Controls</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h3 className="font-semibold mb-1">Movement</h3>
                        <p>W: Up</p>
                        <p>S: Down</p>
                        <p>A: Left</p>
                        <p>D: Right</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Combat</h3>
                        <p>Space: Attack (3 combos)</p>
                        <p>Shift: Block</p>
                    </div>
                </div>
            </div>
        </div>
    );
}