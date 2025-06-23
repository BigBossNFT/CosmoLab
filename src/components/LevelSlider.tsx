
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelSliderProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
  unlockedLevels: number[];
}

const LevelSlider = ({ currentLevel, onLevelChange, unlockedLevels }: LevelSliderProps) => {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  const nextLevel = () => {
    if (currentLevel < 10) {
      onLevelChange(currentLevel + 1);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 1) {
      onLevelChange(currentLevel - 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={prevLevel}
        disabled={currentLevel === 1}
        className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="flex items-center space-x-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`
              px-4 py-2 rounded-lg font-orbitron font-bold transition-all duration-300 transform hover:scale-105
              ${level === currentLevel
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/50'
                : unlockedLevels.includes(level)
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/30'
                  : 'bg-gray-800 text-gray-400 border border-gray-600 hover:bg-gray-700'
              }
            `}
          >
            {level}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={nextLevel}
        disabled={currentLevel === 10}
        className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default LevelSlider;
