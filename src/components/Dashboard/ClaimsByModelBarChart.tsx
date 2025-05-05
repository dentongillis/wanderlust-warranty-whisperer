
import React from 'react';
import { WideBarChart } from './WideBarChart';

// Sample data - expanded with more floorplans data to test scrolling
const models = [
  { 
    name: 'Model I', 
    value: 42, 
    color: '#8B5CF6',
    floorplans: [
      { name: 'Full Profile', value: 15 },
      { name: 'Bunkhouse', value: 12 },
      { name: 'Mid-Bath', value: 8 },
      { name: 'Standard Layout', value: 7 },
      { name: 'Front Living', value: 6 },
      { name: 'Rear Kitchen', value: 5 },
      { name: 'Side Kitchen', value: 4 },
      { name: 'Toy Hauler', value: 3 }
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
      { name: 'Rear Living', value: 6 },
      { name: 'Triple Slide', value: 5 },
      { name: 'Quad Slide', value: 4 },
      { name: 'Corner Bath', value: 3 },
      { name: 'Travel Edition', value: 2 }
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
      { name: 'Open Concept', value: 5 },
      { name: 'Premium Edition', value: 4 },
      { name: 'Two Bedroom', value: 3 },
      { name: 'Double Slide', value: 2 },
      { name: 'Family Suite', value: 1 }
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
      { name: 'Mid-Bath', value: 4 },
      { name: 'Mountain Edition', value: 3 },
      { name: 'Double Entry', value: 2 },
      { name: 'Outdoor Kitchen', value: 1 },
      { name: 'Luxury Package', value: 1 }
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
