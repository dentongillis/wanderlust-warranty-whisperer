
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - daily view of claims by model
const models = [
  { name: 'Model I', value: 42, color: '#8B5CF6' },
  { name: 'Model Z Air', value: 38, color: '#10B981' },
  { name: 'Model Z', value: 34, color: '#F97316' },
  { name: 'Model G', value: 31, color: '#0EA5E9' }
];

export const ClaimsByModelBarChart: React.FC = () => {
  return (
    <div className="h-[35px] bg-transparent">
      <WideBarChart 
        data={models} 
        showLabels={false} 
        useCustomColors={true}
        barHeight={30} // Reduced height for thinner bars
      />
    </div>
  );
};
