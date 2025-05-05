
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - daily view of claims by model (sorted from highest to lowest)
const models = [
  { name: 'Model I', value: 42, color: '#8B5CF6' },
  { name: 'Model Z Air', value: 38, color: '#10B981' },
  { name: 'Model Z', value: 34, color: '#F97316' },
  { name: 'Model G', value: 31, color: '#0EA5E9' }
].sort((a, b) => b.value - a.value);

export const ClaimsByModelBarChart: React.FC = () => {
  return (
    <div className="h-[40px] bg-transparent">
      <WideBarChart 
        data={models} 
        showLabels={true} 
        useCustomColors={true}
        barHeight={40} // Increased height to fit the two lines of text
      />
    </div>
  );
};
