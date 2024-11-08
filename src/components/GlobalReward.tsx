import React from 'react';
import { Trophy } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

export function GlobalReward() {
  const { totalPoints } = useRewards();

  return (
    <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full 
                    px-4 py-2 shadow-lg border border-gold flex items-center gap-2
                    animate-[fadeIn_0.5s_ease-out]">
      <Trophy className="w-5 h-5 text-yellow-500" />
      <span className="font-serif text-blue-900 font-bold">
        {totalPoints} points
      </span>
    </div>
  );
}