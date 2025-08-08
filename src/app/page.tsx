import dynamic from 'next/dynamic';

// Dynamically import the game component with no SSR
const GameComponent = dynamic(() => import('@/components/game'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading game...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-900">
      <GameComponent />
    </main>
  );
}