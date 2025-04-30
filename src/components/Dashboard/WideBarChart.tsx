
import React from 'react';

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
    <div className="flex h-full">
      <div className="flex-1 flex bg-transparent">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const color = getColorClasses(index);
          const style: React.CSSProperties = {
            width: `${percentage}%`,
            ...(useCustomColors && item.color ? { backgroundColor: item.color } : {})
          };
          
          return (
            <div 
              key={item.name} 
              className={`${color} relative transition-all duration-300 ease-in-out hover:opacity-90`} 
              style={style}
              title={`${item.name}: ${item.value}`}
            >
              {showLabels && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium flex-col">
                  <span className="truncate px-1">{item.name}</span>
                  <span>{item.value}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
