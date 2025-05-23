
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WideBarChartProps {
  data: { name: string; value: number; color?: string; floorplans?: Array<{name: string, value: number}> }[];
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
      <div className="flex flex-col h-full">
        {/* The actual bar chart */}
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
                    {/* Model name and value in center of each segment - increased font size */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="truncate whitespace-nowrap text-sm font-medium">{item.name}</span>
                      <div className="flex items-center text-xs">
                        <span className="font-semibold">{item.value}</span>
                        <span className="ml-1 opacity-75 text-[10px]">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-0 rounded-lg w-64">
                  {item.floorplans ? (
                    <div className="text-xs">
                      {/* Header with blue background */}
                      <div className="bg-blue-600 text-white p-2 font-medium rounded-t-lg">
                        {item.name}: {item.value} claims
                      </div>
                      <div className="p-2">
                        <div className="font-medium mb-1">Claims by Floorplan:</div>
                        {/* Use ScrollArea to enable scrolling for many floorplans */}
                        <ScrollArea className="max-h-60">
                          <div className="space-y-1.5 pr-2">
                            {item.floorplans.map(fp => (
                              <div key={fp.name} className="flex flex-col">
                                <div className="flex justify-between text-xs">
                                  <span>{fp.name}</span>
                                  <span>{fp.value}</span>
                                </div>
                                <div className="mt-0.5 h-2 bg-gray-100 dark:bg-gray-700 w-full rounded">
                                  <div 
                                    className="h-2 bg-blue-500 rounded" 
                                    style={{
                                      width: `${(fp.value / Math.max(...item.floorplans!.map(f => f.value))) * 100}%`
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs p-2">
                      <div className="bg-blue-600 text-white p-2 font-medium rounded-t-lg -mt-2 -mx-2 mb-2">
                        {item.name}
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Claims:</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Share:</span>
                        <span className="font-bold">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
