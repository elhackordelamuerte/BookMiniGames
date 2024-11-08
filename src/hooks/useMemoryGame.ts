import { useState, useEffect } from 'react';

export interface Card {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: Card[];
  moves: number;
  matches: number;
  time: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
}

interface GameActions {
  handleCardClick: (index: number) => void;
  initializeGame: () => void;
}

const EMOJIS = ['🇷🇪', '🐱', '🥜', '🌼', '🐈', '🐭', '🐟', '🪶'];
export const TOTAL_PAIRS = EMOJIS.length;

export function useMemoryGame(): [GameState, GameActions] {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    if (isGameStarted && !isGameComplete) {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isGameStarted, isGameComplete]);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map(emoji => ({ emoji, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setIsGameStarted(true);
    setIsGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prev => {
      const newCards = [...prev];
      newCards[index].isFlipped = true;
      return newCards;
    });

    setFlippedIndices(prev => [...prev, index]);

    if (flippedIndices.length === 1) {
      setMoves(m => m + 1);
      
      setTimeout(() => {
        const [firstIndex] = flippedIndices;
        const isMatch = cards[firstIndex].emoji === cards[index].emoji;

        setCards(prev => {
          const newCards = [...prev];
          if (isMatch) {
            newCards[firstIndex].isMatched = true;
            newCards[index].isMatched = true;
            setMatches(m => {
              const newMatches = m + 1;
              if (newMatches === TOTAL_PAIRS) {
                setIsGameComplete(true);
              }
              return newMatches;
            });
          } else {
            newCards[firstIndex].isFlipped = false;
            newCards[index].isFlipped = false;
          }
          return newCards;
        });

        setFlippedIndices([]);
      }, 1000);
    }
  };

  return [
    { cards, moves, matches, time, isGameStarted, isGameComplete },
    { handleCardClick, initializeGame }
  ];
}