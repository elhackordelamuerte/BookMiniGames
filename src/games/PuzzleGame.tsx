import React, { useState, useEffect } from 'react';
import puzzleImg from '../assets/page5.jpg';

const PuzzleGame = ({}) => {
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const initialPieces = Array.from({ length: 9 }, (_, index) => index);
    setPieces(initialPieces);
    setShuffledPieces(shuffleArray(initialPieces));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    if (isAdjacent(draggedIndex, index)) {
      const newShuffledPieces = [...shuffledPieces];
      [newShuffledPieces[draggedIndex], newShuffledPieces[index]] = [newShuffledPieces[index], newShuffledPieces[draggedIndex]];
      setShuffledPieces(newShuffledPieces);
      setEmptyIndex(draggedIndex);
      checkIfComplete(newShuffledPieces);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
  };

  const checkIfComplete = (pieces) => {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i] !== i) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="grid grid-cols-3 gap-1 w-64 h-64">
        {shuffledPieces.map((piece, index) => (
          <div
            key={index}
            className={`piece ${piece === 8 ? 'empty' : ''}`}
            draggable={piece !== 8}
            onDragStart={handleDragStart(index)}
            onDrop={handleDrop(index)}
            onDragOver={handleDragOver}
            style={{
              backgroundImage: `url(${puzzleImg})`,
              backgroundPosition: `${(piece % 3) * -100}% ${(Math.floor(piece / 3)) * -100}%`,
              backgroundSize: '300% 300%',
            }}
          />
        ))}
      </div>
      {isComplete && <div className="mt-4 text-green-500">Puzzle Complete!</div>}
    </div>
  );
};

export default PuzzleGame;