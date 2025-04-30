
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const data = [
  { x: 22, y: 65, z: 8 },
  { x: 23, y: 85, z: 10 },
  { x: 24, y: 70, z: 6 },
  { x: 25, y: 92, z: 12 },
  { x: 26, y: 75, z: 7 },
  { x: 27, y: 88, z: 9 },
  { x: 28, y: 68, z: 5 },
  { x: 29, y: 74, z: 8 },
  { x: 30, y: 80, z: 11 },
  { x: 31, y: 72, z: 7 },
  { x: 32, y: 62, z: 6 },
  { x: 23, y: 78, z: 8 },
  { x: 25, y: 83, z: 9 },
  { x: 27, y: 64, z: 7 }
];

export const DealerClaimsChart: React.FC = () => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            name="Total Number of Claims"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Claims', position: 'insideBottom', offset: -5, fontSize: 10 }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <YAxis 
            dataKey="y" 
            name="Total Number of Claims" 
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Claims', angle: -90, position: 'insideLeft', offset: 5, fontSize: 10 }}
            domain={[50, 'dataMax + 10']}
          />
          <ZAxis 
            dataKey="z" 
            range={[40, 160]} 
            name="Volume" 
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => [`${value}`, '']}
            labelFormatter={() => ''}
            contentStyle={{ fontSize: '12px', padding: '8px', borderRadius: '6px' }}
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
