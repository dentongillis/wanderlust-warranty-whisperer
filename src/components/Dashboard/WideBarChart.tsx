
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WideBarChartProps {
  data: { name: string; value: number; color?: string }[];
  colorScheme?: 'blue' | 'green' | 'purple';
  showLabels?: boolean;
  useCustomColors?: boolean;
}

export const WideBarChart: React.FC<WideBarChartProps> = ({ 
  data,
  colorScheme = 'blue',
  showLabels = false,
  useCustomColors = false
}) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  const getColorClasses = (index: number): string => {
    if (useCustomColors && data[index].color) {
      return '';
    }
    
    switch (colorScheme) {
      case 'green':
        return index % 2 === 0 ? 'bg-green-500' : 'bg-green-400';
      case 'purple':
        return index % 2 === 0 ? 'bg-purple-500' : 'bg-purple-400';
      case 'blue':
      default:
        return index % 2 === 0 ? 'bg-blue-600' : 'bg-blue-500';
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full items-center">
        <div className="flex-1 flex bg-transparent rounded-full overflow-hidden">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const color = getColorClasses(index);
            const style: React.CSSProperties = {
              width: `${percentage}%`,
              ...(useCustomColors && item.color ? { backgroundColor: item.color } : {})
            };
            
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <div 
                    className={`${color} relative transition-all duration-300 ease-in-out hover:opacity-80`} 
                    style={style}
                  >
                    {showLabels && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                        <span className="truncate px-1">{item.name}</span>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-sm border-none shadow-lg">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground text-xs">Claims:</span>
                      <span className="font-mono">{item.value}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground text-xs">Share:</span>
                      <span className="font-mono">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
