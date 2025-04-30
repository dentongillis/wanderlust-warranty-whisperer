
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - this would be replaced with real data in a production app
const models = [
  { name: 'Model I', value: 520 },
  { name: 'Model Z Air', value: 480 },
  { name: 'Model Z', value: 410 },
  { name: 'Model G', value: 390 }
];

export const ClaimsByModelBarChart: React.FC = () => {
  return (
    <div className="h-[80px]">
      <WideBarChart 
        data={models} 
        colorScheme="blue" 
        showLabels={true} 
      />
    </div>
  );
};
