import React from 'react';
import { Trophy, Star, Crown } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

interface GameRewardProps {
  score: number;
  time?: number;
  moves?: number;
  gameType: 'memory' | 'fishing';
}

export function GameReward({ score, time, moves, gameType }: GameRewardProps) {
  const { addPoints } = useRewards();

  // Calcul immédiat des points au lieu d'utiliser useEffect
  React.useLayoutEffect(() => {
    const calculatedPoints = Math.max(0, score);
    addPoints(calculatedPoints);
    // Cette fonction sera appelée une seule fois lors du démontage du composant
    // pour annuler l'ajout des points si le composant est démonté prématurément
    return () => {};
  }, []); // Dépendances vides pour n'exécuter qu'une seule fois

  const getStars = () => {
    if (gameType === 'memory') {
      const efficiency = moves! / time!;
      if (efficiency < 0.5) return 3;
      if (efficiency < 0.8) return 2;
      return 1;
    } else {
      if (score >= 50) return 3;
      if (score >= 30) return 2;
      return 1;
    }
  };

  const getMessage = () => {
    const stars = getStars();
    switch (stars) {
      case 3:
        return "Magnifique ! Une performance royale !";
      case 2:
        return "Très bien ! Le Roi est content !";
      default:
        return "Bien joué ! Continuez à vous entraîner !";
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg
                    border-4 border-gold animate-[bounce_1s_ease-in-out]">
      <div className="text-center space-y-4">
        <Crown className="w-12 h-12 text-yellow-500 mx-auto" />
        <h3 className="text-2xl font-serif text-blue-900">
          Récompense Royale
        </h3>
        <div className="flex justify-center gap-2">
          {[...Array(getStars())].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        <p className="text-blue-800 font-serif">{getMessage()}</p>
        <div className="flex items-center justify-center gap-4 text-blue-700">
          <Trophy className="w-6 h-6" />
          <span className="font-bold">+{Math.max(0, score)} points</span>
        </div>
      </div>
    </div>
  );
}