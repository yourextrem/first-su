'use client';

import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { gameConfig } from '@/lib/game-config';
import { RPGScene } from '@/lib/RPGScene';

export default function GameComponent() {
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ...gameConfig,
                scene: RPGScene,
                parent: 'game-container'
            };

            gameRef.current = new Game(config);

            return () => {
                if (gameRef.current) {
                    gameRef.current.destroy(true);
                    gameRef.current = null;
                }
            };
        }
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div id="game-container" className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg" />
            <div className="mt-4 text-white text-center">
                <h2 className="text-xl font-bold mb-2">RPG Game Controls</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h3 className="font-semibold mb-1">Movement</h3>
                        <p>Arrow Keys: Move</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Combat</h3>
                        <p>Space: Attack (3 combos)</p>
                        <p>Shift: Block</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold mb-1">Orb Effects</h3>
                    <p><span className="text-red-500">Red</span>: Damage</p>
                    <p><span className="text-green-500">Green</span>: Heal</p>
                    <p><span className="text-blue-500">Blue</span>: Experience</p>
                </div>
            </div>
        </div>
    );
}
