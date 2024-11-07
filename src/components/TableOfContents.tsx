import React from 'react';
import { BookOpen } from 'lucide-react';

interface TableOfContentsProps {
  games: Array<{ id: number; title: string }>;
  onSelectGame: (index: number) => void;
}

export function TableOfContents({ games, onSelectGame }: TableOfContentsProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif text-blue-900 mb-8 text-center">
        Table des Matières
      </h2>
      <div className="space-y-4">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(index + 1)}
            className="w-full text-left p-4 rounded-lg hover:bg-blue-50
                     transition-colors flex items-center gap-4 group"
          >
            <BookOpen className="text-blue-800 w-6 h-6 
                              group-hover:text-blue-600" />
            <div>
              <h3 className="text-xl font-serif text-blue-900">
                {game.title}
              </h3>
              <p className="text-blue-600 text-sm">
                Page {index + 1}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}