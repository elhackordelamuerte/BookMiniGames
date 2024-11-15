import React, { useState, useEffect, useRef } from 'react';
import puzzleImg from '../assets/page5_basic.jpg';
import page5 from '../assets/page5_basic.jpg';

const PuzzleGame = ({}) => {
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initialPieces = Array.from({ length: 9 }, (_, index) => index);
    setPieces(initialPieces);
    setShuffledPieces(shuffleArray(initialPieces));
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isComplete) {
      clearInterval(intervalRef.current);
    }
  }, [isComplete]);

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
        <div className="mb-4" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', fontSize: '16px', color: '#333' }}>
          Temps: {timer} secondes
        </div>
      {isComplete ? (
        <img src={page5} alt="Complete Puzzle" className="w-64 h-64" />
      ) : (
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
      )}
      {isComplete && (
        <div className="mt-4 p-4 border border-green-500 rounded-lg shadow-lg text-green-500 bg-green-100">
          Tu as completé le puzzle ! Tu as désormais accés à la suite de l'histoire.
        </div>
      )}    </div>
  );
};

export default PuzzleGame;