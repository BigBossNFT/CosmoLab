
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Users, Sparkles } from 'lucide-react';

interface MatrixPosition {
  id: string;
  level_number: number;
  position_number: number;
  occupied_by: string | null;
  occupied_at: string | null;
}

interface MatrixVisualizationProps {
  level: number;
  positions: MatrixPosition[];
  isUnlocked: boolean;
}

const MatrixVisualization = ({ level, positions, isUnlocked }: MatrixVisualizationProps) => {
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  const levelPositions = positions.filter(p => p.level_number === level);
  const occupiedCount = levelPositions.filter(p => p.occupied_by).length;

  const getPositionIcon = (position: number, occupied: boolean) => {
    if (position === 1) return <User className="w-6 h-6" />;
    if (occupied) return <Users className="w-4 h-4" />;
    return <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-500" />;
  };

  const getPositionStyle = (position: number, occupied: boolean) => {
    const baseStyle = "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer";
    
    if (position === 1) {
      return `${baseStyle} w-16 h-16 ${occupied 
        ? 'bg-gradient-to-r from-neon-green to-neon-blue border-neon-green shadow-lg shadow-neon-green/50' 
        : 'bg-gray-800 border-gray-600'}`;
    }
    
    if (position <= 3) {
      return `${baseStyle} w-12 h-12 ${occupied 
        ? 'bg-neon-blue/30 border-neon-blue shadow-md shadow-neon-blue/30' 
        : 'bg-gray-800 border-gray-600'}`;
    }
    
    return `${baseStyle} w-10 h-10 ${occupied 
      ? 'bg-neon-purple/30 border-neon-purple shadow-sm shadow-neon-purple/30' 
      : 'bg-gray-800 border-gray-600'}`;
  };

  return (
    <Card className="glass-effect border-neon-blue/30 p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h3 className="text-2xl font-orbitron font-bold text-white">
            Уровень {level}
          </h3>
          {isUnlocked && (
            <Badge className="bg-neon-green/20 text-neon-green animate-pulse">
              <Sparkles className="w-4 h-4 mr-1" />
              Активен
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-gray-400">
          Заполнено позиций: {occupiedCount}/7
        </div>
        
        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-neon-blue to-neon-green h-2 rounded-full transition-all duration-500"
            style={{ width: `${(occupiedCount / 7) * 100}%` }}
          />
        </div>
      </div>

      {isUnlocked ? (
        <div className="matrix-visualization">
          {/* Позиция 1 (вверху) */}
          <div className="flex justify-center mb-8">
            <div 
              className={getPositionStyle(1, !!levelPositions[0]?.occupied_by)}
              onMouseEnter={() => setHoveredPosition(1)}
              onMouseLeave={() => setHoveredPosition(null)}
            >
              {getPositionIcon(1, !!levelPositions[0]?.occupied_by)}
              {hoveredPosition === 1 && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cosmos-darker border border-neon-blue/30 rounded-lg px-2 py-1 text-xs whitespace-nowrap z-10">
                  Позиция 1 {levelPositions[0]?.occupied_by ? '(Занята)' : '(Свободна)'}
                </div>
              )}
            </div>
          </div>
          
          {/* Позиции 2-3 */}
          <div className="flex justify-center gap-12 mb-8">
            {[1, 2].map(pos => {
              const position = levelPositions[pos];
              return (
                <div 
                  key={pos}
                  className={getPositionStyle(pos + 1, !!position?.occupied_by)}
                  onMouseEnter={() => setHoveredPosition(pos + 1)}
                  onMouseLeave={() => setHoveredPosition(null)}
                >
                  {getPositionIcon(pos + 1, !!position?.occupied_by)}
                  {hoveredPosition === pos + 1 && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cosmos-darker border border-neon-blue/30 rounded-lg px-2 py-1 text-xs whitespace-nowrap z-10">
                      Позиция {pos + 1} {position?.occupied_by ? '(Занята)' : '(Свободна)'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Позиции 4-7 */}
          <div className="flex justify-center gap-8">
            {[3, 4, 5, 6].map(pos => {
              const position = levelPositions[pos];
              return (
                <div 
                  key={pos}
                  className={getPositionStyle(pos + 1, !!position?.occupied_by)}
                  onMouseEnter={() => setHoveredPosition(pos + 1)}
                  onMouseLeave={() => setHoveredPosition(null)}
                >
                  {getPositionIcon(pos + 1, !!position?.occupied_by)}
                  {hoveredPosition === pos + 1 && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cosmos-darker border border-neon-blue/30 rounded-lg px-2 py-1 text-xs whitespace-nowrap z-10">
                      Позиция {pos + 1} {position?.occupied_by ? '(Занята)' : '(Свободна)'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-400 mb-4">Уровень заблокирован</p>
          <p className="text-sm text-gray-500">
            Разблокируйте этот уровень, чтобы увидеть позиции
          </p>
        </div>
      )}
    </Card>
  );
};

export default MatrixVisualization;
