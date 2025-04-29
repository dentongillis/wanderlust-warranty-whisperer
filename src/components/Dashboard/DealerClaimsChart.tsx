
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { x: 22, y: 65 },
  { x: 23, y: 85 },
  { x: 24, y: 70 },
  { x: 25, y: 92 },
  { x: 26, y: 75 },
  { x: 27, y: 88 },
  { x: 28, y: 68 },
  { x: 29, y: 74 },
  { x: 30, y: 80 },
  { x: 31, y: 72 },
  { x: 32, y: 62 }
];

export const DealerClaimsChart: React.FC = () => {
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            name="Claims"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            dataKey="y" 
            name="Cost" 
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => [`${value}`, '']}
            labelFormatter={() => ''}
            contentStyle={{ fontSize: '12px', padding: '8px', borderRadius: '4px' }}
          />
          <Scatter 
            name="Claims" 
            data={data} 
            fill="#3b82f6" 
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
