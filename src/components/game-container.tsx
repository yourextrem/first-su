'use client';

import dynamic from 'next/dynamic';

const GameComponent = dynamic(() => import('./game'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white text-xl">Loading game...</div>
    </div>
  ),
});

export default function GameContainer() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <GameComponent />
    </div>
  );
}