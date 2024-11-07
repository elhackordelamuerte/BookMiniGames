import React from 'react';

interface GameCompleteProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

export function GameComplete({ moves, time, onRestart }: GameCompleteProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        🎉 Congratulations! 🎉
      </h2>
      <p className="text-purple-600 mb-4">
        You completed the game in {moves} moves and {time} seconds!
      </p>
      <button
        onClick={onRestart}
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}