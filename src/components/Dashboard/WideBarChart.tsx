
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WideBarChartProps {
  data: { name: string; value: number; color?: string }[];
  colorScheme?: 'blue' | 'green' | 'purple';
  showLabels?: boolean;
  useCustomColors?: boolean;
  barHeight?: number;
}

export const WideBarChart: React.FC<WideBarChartProps> = ({ 
  data,
  colorScheme = 'blue',
  showLabels = false,
  useCustomColors = false,
  barHeight = 30
}) => {
  const max = Math.max(...data.map(item => item.value));
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
      <div className="flex h-full">
        <div className="flex-1 flex bg-transparent rounded-lg overflow-hidden" style={{ height: `${barHeight}px` }}>
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
                    className={`${color} relative transition-all duration-300 ease-in-out hover:opacity-90`} 
                    style={style}
                  >
                    {/* Always show model name in the segment with appropriate styling */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                      <span className="truncate px-1 whitespace-nowrap overflow-hidden">{item.name}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-2 rounded-lg">
                  <div className="text-xs font-medium">
                    <div>{item.name}</div>
                    <div className="flex justify-between gap-2">
                      <span>Claims:</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Share:</span>
                      <span className="font-bold">{percentage.toFixed(1)}%</span>
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
