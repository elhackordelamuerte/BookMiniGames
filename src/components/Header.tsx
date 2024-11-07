import React from 'react';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
        <Sparkles className="text-yellow-500" />
        Memory Match
        <Sparkles className="text-yellow-500" />
      </h1>
      <p className="text-purple-600">Match the pairs of cute animals!</p>
    </div>
  );
}