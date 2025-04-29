
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '01 May', claims: 65 },
  { day: '05 May', claims: 75 },
  { day: '10 May', claims: 68 },
  { day: '15 May', claims: 90 },
  { day: '20 May', claims: 82 },
  { day: '25 May', claims: 95 },
  { day: '30 May', claims: 78 }
];

export const WarrantyTrendsChart: React.FC = () => {
  return (
    <div className="h-[130px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              fontSize: '12px', 
              padding: '8px', 
              borderRadius: '4px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="claims" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-right text-xs text-green-600 dark:text-green-500 font-medium mt-1">
        <span>4.8% Growth</span>
      </div>
    </div>
  );
};
