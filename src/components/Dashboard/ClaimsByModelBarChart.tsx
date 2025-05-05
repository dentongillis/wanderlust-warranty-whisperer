
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - daily view of claims by model with floorplan data
const models = [
  { 
    name: 'Model I', 
    value: 42, 
    color: '#8B5CF6',
    floorplans: [
      { name: 'Full Profile', value: 15 },
      { name: 'Bunkhouse', value: 12 },
      { name: 'Mid-Bath', value: 8 },
      { name: 'Standard Layout', value: 7 }
    ]
  },
  { 
    name: 'Model Z Air', 
    value: 38, 
    color: '#10B981',
    floorplans: [
      { name: 'Half Profile', value: 14 },
      { name: 'Front Living', value: 10 },
      { name: 'Open Concept', value: 8 },
      { name: 'Rear Living', value: 6 }
    ]
  },
  { 
    name: 'Model Z', 
    value: 34, 
    color: '#F97316',
    floorplans: [
      { name: 'Front Kitchen', value: 12 },
      { name: 'Fifth Wheel', value: 9 },
      { name: 'Half Profile', value: 8 },
      { name: 'Open Concept', value: 5 }
    ]
  },
  { 
    name: 'Model G', 
    value: 31, 
    color: '#0EA5E9',
    floorplans: [
      { name: 'Bunkhouse', value: 11 },
      { name: 'Rear Living', value: 9 },
      { name: 'Front Living', value: 7 },
      { name: 'Mid-Bath', value: 4 }
    ]
  }
].sort((a, b) => b.value - a.value);

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
