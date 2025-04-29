
import React from 'react';

interface WideBarChartProps {
  data: { name: string; value: number }[];
}

export const WideBarChart: React.FC<WideBarChartProps> = ({ data }) => {
  const max = Math.max(...data.map(item => item.value));
  
  return (
    <div className="mt-2 flex-1 flex items-end gap-0.5">
      {data.map((item, index) => {
        const percentage = (item.value / max) * 100;
        const color = index % 2 === 0 ? 'bg-blue-500' : 'bg-blue-400';
        
        return (
          <div 
            key={item.name} 
            className="flex-1 flex flex-col items-center"
            title={`${item.name}: ${item.value}`}
          >
            <div 
              className={`w-full ${color} rounded-t-sm`} 
              style={{ height: `${percentage}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
