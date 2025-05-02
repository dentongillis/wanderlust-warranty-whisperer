
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data - this would be replaced with real data in a production app
const data = [
  { name: 'Model I', value: 520, color: '#8B5CF6' },
  { name: 'Model Z Air', value: 480, color: '#10B981' },
  { name: 'Model Z', value: 410, color: '#F97316' },
  { name: 'Model G', value: 390, color: '#0EA5E9' }
];

// Create a single bar data structure where each model is a property
const singleBarData = [{
  'Model I': data[0].value,
  'Model Z Air': data[1].value,
  'Model Z': data[2].value,
  'Model G': data[3].value,
}];

const config = Object.fromEntries(
  data.map(item => [
    item.name,
    { 
      label: item.name, 
      theme: { 
        light: item.color, 
        dark: item.color 
      } 
    }
  ])
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700 rounded">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value} claims`}</p>
      </div>
    );
  }
  return null;
};

export const ClaimsByModelChart: React.FC = () => {
  return (
    <div className="h-[100px] w-full">
      <ChartContainer 
        config={config}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="horizontal"
            data={singleBarData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <XAxis type="number" hide />
            <YAxis type="category" hide />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            {data.map((entry) => (
              <Bar 
                key={entry.name}
                dataKey={entry.name} 
                stackId="a" 
                fill={entry.color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
