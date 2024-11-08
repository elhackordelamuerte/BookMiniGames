import React, { useState } from 'react';
import { Book, ChevronLeft, ChevronRight } from 'lucide-react';
import { MemoryGame } from './games/MemoryGame';
import { FishingGame } from './games/FishingGame';
import PuzzleGame from './games/PuzzleGame';
import { BookCover } from './components/BookCover';
import { TableOfContents } from './components/TableOfContents';
import Fluppybird from './games/fluppyBird';
import {FlyGamePage} from './games/FlyGamePage'; 
import { TestLib } from './games/FirstPage';
import WriteGame from './games/WriteGame';

const games = [
  { id: 1, title: "Hors de la cage", component: TestLib },
  { id: 2, title: "Envole", component: FlyGamePage },
  { id: 3, title: "Parole", component: PuzzleGame},
  { id: 4, title: "Memory", component: MemoryGame },
  { id: 5, title: "La Pêche", component: FishingGame },
  { id: 6, title: "Fluppybird", component: Fluppybird },
  { id: 7, title: "Ecris", component: WriteGame },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, games.length));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  if (!isBookOpen) {
    return <BookCover onOpen={() => setIsBookOpen(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Book className="text-blue-800 w-8 h-8" />
          <h1 className="text-3xl font-serif text-blue-900">Le Roi Martin</h1>
          <div className="w-8" />
        </header>

        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-lg shadow-2xl transform -skew-x-1" />
          <div className="relative bg-white rounded-lg shadow-xl p-8 min-h-[600px]
                        border-l-8 border-blue-900/20">
            {currentPage === 0 ? (
              <TableOfContents games={games} onSelectGame={setCurrentPage} />
            ) : (
              <div className="h-full">
                {React.createElement(games[currentPage - 1].component)}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-700
                     transition-colors disabled:opacity-50"
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-700
                     transition-colors disabled:opacity-50"
            disabled={currentPage >= games.length}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;