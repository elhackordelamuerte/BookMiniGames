import React from 'react';
import { Trophy, Timer } from 'lucide-react';
import { TOTAL_PAIRS } from '../hooks/useMemoryGame';

interface ScoreBoardProps {
  moves: number;
  matches: number;
  time: number;
}

export function ScoreBoard({ moves, matches, time }: ScoreBoardProps) {
  return (
    <div className="flex gap-6 mb-8">
      <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-2">
        <Trophy className="text-yellow-500 w-6 h-6" />
        <div>
          <p className="text-sm text-gray-600">Matches</p>
          <p className="font-bold">{matches}/{TOTAL_PAIRS}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-2">
        <Timer className="text-blue-500 w-6 h-6" />
        <div>
          <p className="text-sm text-gray-600">Time</p>
          <p className="font-bold">{time}s</p>
        </div> 
      </div>
      <div className="bg-white rounded-xl p-4 shadow-md">
        <p className="text-sm text-gray-600">Moves</p>
        <p className="font-bold">{moves}</p>
      </div>
    </div>
  );
}