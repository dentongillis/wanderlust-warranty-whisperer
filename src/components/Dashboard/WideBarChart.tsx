
import React from 'react';

interface WideBarChartProps {
  data: { name: string; value: number }[];
  colorScheme?: 'blue' | 'green' | 'purple';
}

export const WideBarChart: React.FC<WideBarChartProps> = ({ 
  data,
  colorScheme = 'blue'
}) => {
  const max = Math.max(...data.map(item => item.value));
  
  const getColorClasses = (index: number): string => {
    switch (colorScheme) {
      case 'green':
        return index % 2 === 0 ? 'bg-green-500' : 'bg-green-400';
      case 'purple':
        return index % 2 === 0 ? 'bg-purple-500' : 'bg-purple-400';
      case 'blue':
      default:
        return index % 2 === 0 ? 'bg-blue-500' : 'bg-blue-400';
    }
  };

  return (
    <div className="mt-2 flex-1 flex items-end gap-0.5">
      {data.map((item, index) => {
        const percentage = (item.value / max) * 100;
        const color = getColorClasses(index);
        
        return (
          <div 
            key={item.name} 
            className="flex-1 flex flex-col items-center"
            title={`${item.name}: ${item.value}`}
          >
            <div 
              className={`w-full ${color} rounded-t-sm transition-all duration-300 ease-in-out hover:opacity-80`} 
              style={{ height: `${percentage}%` }}
            ></div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate w-full text-center">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
