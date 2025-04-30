
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Daily dealer claims data
const data = [
  { x: 8, y: 12 },
  { x: 9, y: 15 },
  { x: 10, y: 13 },
  { x: 11, y: 17 },
  { x: 12, y: 14 },
  { x: 13, y: 16 },
  { x: 14, y: 12 },
  { x: 15, y: 14 },
  { x: 16, y: 15 },
  { x: 17, y: 13 },
  { x: 18, y: 11 }
];

export const DealerClaimsChart: React.FC = () => {
  return (
    <div className="h-[160px]">
      <div className="mb-1">
        <h3 className="text-sm font-medium">Daily Dealer Claims</h3>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            name="Hour of Day"
            tick={{ fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Hour', position: 'insideBottom', offset: -5, fontSize: 9 }}
          />
          <YAxis 
            dataKey="y" 
            name="Number of Claims" 
            tick={{ fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Claims', angle: -90, position: 'insideLeft', offset: 5, fontSize: 9 }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => [`${value}`, '']}
            labelFormatter={() => ''}
            contentStyle={{ fontSize: '11px', padding: '6px', borderRadius: '4px' }}
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
