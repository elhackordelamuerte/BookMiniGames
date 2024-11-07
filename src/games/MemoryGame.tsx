import React from 'react';
import { useMemoryGame } from '../hooks/useMemoryGame';
import { Card } from '../components/Card';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameComplete } from '../components/GameComplete';

export function MemoryGame() {
  const [
    { cards, moves, matches, time, isGameComplete },
    { handleCardClick, initializeGame }
  ] = useMemoryGame();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-serif text-blue-900 mb-2">
          Memory
        </h2>
        <p className="text-blue-600">
          Aide Martin Triste !
        </p>
      </div>

      <ScoreBoard moves={moves} matches={matches} time={time} />

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <Card
            key={index}
            emoji={card.emoji}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {isGameComplete && (
        <GameComplete
          moves={moves}
          time={time}
          onRestart={initializeGame}
        />
      )}
    </div>
  );
}