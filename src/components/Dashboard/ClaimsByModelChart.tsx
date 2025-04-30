
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';

// Sample data - this would be replaced with real data in a production app
const data = [
  { name: 'Adventurer XL', approved: 520, denied: 65 },
  { name: 'Voyager 28', approved: 480, denied: 40 },
  { name: 'Freedom 24', approved: 410, denied: 38 },
  { name: 'Explorer Plus', approved: 390, denied: 45 },
  { name: 'Wanderer', approved: 310, denied: 30 }
];

const config = {
  approved: { label: 'Approved Claims', theme: { light: '#10b981', dark: '#10b981' } },
  denied: { label: 'Denied Claims', theme: { light: '#f43f5e', dark: '#f43f5e' } }
};

export const ClaimsByModelChart: React.FC = () => {
  return (
    <div className="h-[200px] w-full">
      <ChartContainer 
        config={config}
        className="h-full"
      >
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="var(--color-approved)" name="Approved" />
          <Bar dataKey="denied" stackId="a" fill="var(--color-denied)" name="Denied" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
