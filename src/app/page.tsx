import GameWrapper from '@/components/game-wrapper';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-900">
      <div id="game-container" className="w-full h-full">
        <GameWrapper />
      </div>
    </main>
  );
}