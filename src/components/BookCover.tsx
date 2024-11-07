import React from 'react';
import { Crown } from 'lucide-react';

interface BookCoverProps {
  onOpen: () => void;
}

export function BookCover({ onOpen }: BookCoverProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 
                    flex items-center justify-center p-4">
      <div 
        onClick={onOpen}
        className="bg-blue-900 rounded-lg shadow-2xl p-8 max-w-2xl w-full
                   cursor-pointer transform hover:scale-105 transition-transform
                   border-4 border-gold"
      >
        <div className="text-center">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-serif text-white mb-4">Le Roi Martin</h1>
          <p className="text-blue-200 text-lg mb-8">Un livre interactif</p>
          <div className="text-yellow-500 text-sm animate-bounce">
            Cliquez pour ouvrir
          </div>
        </div>
      </div>
    </div>
  );
}