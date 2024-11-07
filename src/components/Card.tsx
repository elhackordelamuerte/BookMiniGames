import React from 'react';

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div
      onClick={!isFlipped && !isMatched ? onClick : undefined}
      className={`relative w-24 h-24 cursor-pointer transform transition-all duration-500 preserve-3d 
        ${isFlipped ? 'rotate-y-180' : ''} 
        ${isMatched ? 'opacity-50' : ''}`}
    >
      <div className="absolute w-full h-full backface-hidden">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
          <div className="text-white text-4xl">❓</div>
        </div>
      </div>
      <div className="absolute w-full h-full backface-hidden rotate-y-180">
        <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-6xl">{emoji}</div>
        </div>
      </div>
    </div>
  );
}