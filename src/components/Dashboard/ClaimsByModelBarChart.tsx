
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - this would be replaced with real data in a production app
const models = [
  { name: 'Model I', value: 520, color: '#8B5CF6' },
  { name: 'Model Z Air', value: 480, color: '#10B981' },
  { name: 'Model Z', value: 410, color: '#F97316' },
  { name: 'Model G', value: 390, color: '#0EA5E9' }
];

export const ClaimsByModelBarChart: React.FC = () => {
  return (
    <div className="h-[40px] bg-transparent"> 
      <WideBarChart 
        data={models} 
        showLabels={true} 
        useCustomColors={true}
        barHeight={40} 
      />
    </div>
  );
};
