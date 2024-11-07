import React, { useState, useRef, useEffect } from 'react';
import { Fish } from 'lucide-react';

const FISH_TYPES = [
  { name: 'Petit Poisson', points: 1, speed: 2, icon: '🐟' },
  { name: 'Poisson Moyen', points: 3, speed: 3, icon: '🐠' },
  { name: 'Gros Poisson', points: 5, speed: 4, icon: '🐡' },
];

export function FishingGame() {
  const [score, setScore] = useState(0);
  const [isReeling, setIsReeling] = useState(false);
  const [fishPosition, setFishPosition] = useState(50);
  const [currentFish, setCurrentFish] = useState(FISH_TYPES[0]);
  const [gameTime, setGameTime] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const animationRef = useRef<number>();

  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setGameTime(30);
  };

  useEffect(() => {
    if (isGameActive && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (gameTime === 0) {
      setIsGameActive(false);
    }
  }, [isGameActive, gameTime]);

  useEffect(() => {
    if (!isGameActive) return;

    const animate = () => {
      setFishPosition((prev) => {
        const newPosition = prev + Math.sin(Date.now() / 1000) * currentFish.speed;
        return Math.max(0, Math.min(100, newPosition));
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameActive, currentFish.speed]);

  const tryToCatch = () => {
    if (!isGameActive) return;
    
    setIsReeling(true);
    const catchZone = Math.abs(fishPosition - 50);
    
    setTimeout(() => {
      setIsReeling(false);
      if (catchZone < 10) {
        setScore((prev) => prev + currentFish.points);
        setCurrentFish(FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)]);
      }
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-serif text-blue-900 mb-2">
          La Pêche du Roi
        </h2>
        <p className="text-blue-600">
          Aide Martin triste à pécher du poisson !
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-blue-50 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-serif text-blue-800">
            Score: {score}
          </div>
          <div className="text-lg font-serif text-blue-800">
            Temps: {gameTime}s
          </div>
        </div>

        {!isGameActive && gameTime === 30 ? (
          <button
            onClick={startGame}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors font-serif text-lg"
          >
            Commencer la pêche
          </button>
        ) : !isGameActive ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-serif text-blue-900">
              Partie terminée !
            </h3>
            <p className="text-blue-800">Score final : {score}</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                       transition-colors font-serif"
            >
              Rejouer
            </button>
          </div>
        ) : (
          <div className="relative h-48 bg-blue-200 rounded-lg overflow-hidden">
            <div
              className="absolute left-1/2 top-0 h-full w-1 bg-blue-400"
              style={{ transform: 'translateX(-50%)' }}
            />
            
            <div
              className="absolute transition-all duration-300"
              style={{
                left: `${fishPosition}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-4xl">{currentFish.icon}</div>
            </div>

            <div
              className={`absolute left-1/2 bottom-0 transform -translate-x-1/2 
                       transition-transform ${isReeling ? '-translate-y-16' : 'translate-y-0'}`}
            >
              <Fish className="w-8 h-8 text-blue-800" />
            </div>
          </div>
        )}

        {isGameActive && (
          <button
            onClick={tryToCatch}
            disabled={isReeling}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors font-serif text-lg disabled:opacity-50"
          >
            Attraper !
          </button>
        )}

        <div className="text-sm text-blue-600 text-center">
          Attrapez le poisson quand il passe au centre !
        </div>
      </div>
    </div>
  );
}