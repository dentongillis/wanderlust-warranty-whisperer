
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

// Sample data for all claims - daily view
const claimsData = [
  { day: '01 May', claims: 65 },
  { day: '02 May', claims: 68 },
  { day: '03 May', claims: 72 },
  { day: '04 May', claims: 75 },
  { day: '05 May', claims: 75 },
  { day: '06 May', claims: 72 },
  { day: '07 May', claims: 70 },
  { day: '08 May', claims: 68 },
  { day: '09 May', claims: 65 },
  { day: '10 May', claims: 68 },
  { day: '11 May', claims: 75 },
  { day: '12 May', claims: 82 },
  { day: '13 May', claims: 87 },
  { day: '14 May', claims: 88 },
  { day: '15 May', claims: 90 },
  { day: '16 May', claims: 88 },
  { day: '17 May', claims: 85 },
  { day: '18 May', claims: 83 },
  { day: '19 May', claims: 82 },
  { day: '20 May', claims: 82 },
  { day: '21 May', claims: 84 },
  { day: '22 May', claims: 87 },
  { day: '23 May', claims: 91 },
  { day: '24 May', claims: 93 },
  { day: '25 May', claims: 95 },
  { day: '26 May', claims: 92 },
  { day: '27 May', claims: 88 },
  { day: '28 May', claims: 84 },
  { day: '29 May', claims: 80 },
  { day: '30 May', claims: 78 }
];

// Sample data for claims by model - daily view
const modelClaimsData = [
  { day: '01 May', "Model I": 30, "Model Z": 25, "Model G": 10 },
  { day: '02 May', "Model I": 31, "Model Z": 24, "Model G": 13 },
  { day: '03 May', "Model I": 33, "Model Z": 23, "Model G": 16 },
  { day: '04 May', "Model I": 34, "Model Z": 22, "Model G": 19 },
  { day: '05 May', "Model I": 35, "Model Z": 20, "Model G": 20 },
  { day: '06 May', "Model I": 34, "Model Z": 21, "Model G": 17 },
  { day: '07 May', "Model I": 32, "Model Z": 22, "Model G": 16 },
  { day: '08 May', "Model I": 30, "Model Z": 23, "Model G": 15 },
  { day: '09 May', "Model I": 29, "Model Z": 22, "Model G": 14 },
  { day: '10 May', "Model I": 28, "Model Z": 22, "Model G": 18 },
  { day: '11 May', "Model I": 31, "Model Z": 24, "Model G": 20 },
  { day: '12 May', "Model I": 34, "Model Z": 26, "Model G": 22 },
  { day: '13 May', "Model I": 36, "Model Z": 28, "Model G": 23 },
  { day: '14 May', "Model I": 38, "Model Z": 29, "Model G": 21 },
  { day: '15 May', "Model I": 40, "Model Z": 30, "Model G": 20 },
  { day: '16 May', "Model I": 38, "Model Z": 30, "Model G": 20 },
  { day: '17 May', "Model I": 37, "Model Z": 29, "Model G": 19 },
  { day: '18 May', "Model I": 36, "Model Z": 28, "Model G": 19 },
  { day: '19 May', "Model I": 35, "Model Z": 28, "Model G": 19 },
  { day: '20 May', "Model I": 35, "Model Z": 27, "Model G": 20 },
  { day: '21 May', "Model I": 36, "Model Z": 28, "Model G": 20 },
  { day: '22 May', "Model I": 37, "Model Z": 29, "Model G": 21 },
  { day: '23 May', "Model I": 39, "Model Z": 30, "Model G": 22 },
  { day: '24 May', "Model I": 41, "Model Z": 32, "Model G": 20 },
  { day: '25 May', "Model I": 42, "Model Z": 33, "Model G": 20 },
  { day: '26 May', "Model I": 41, "Model Z": 31, "Model G": 20 },
  { day: '27 May', "Model I": 40, "Model Z": 29, "Model G": 19 },
  { day: '28 May', "Model I": 39, "Model Z": 27, "Model G": 18 },
  { day: '29 May', "Model I": 38, "Model Z": 26, "Model G": 16 },
  { day: '30 May', "Model I": 38, "Model Z": 25, "Model G": 15 }
];

// Colors for model lines
const modelColors = {
  "Model I": "#8B5CF6",
  "Model Z": "#F97316",
  "Model G": "#0EA5E9"
};

export const WarrantyTrendsChart: React.FC = () => {
  const [showModelData, setShowModelData] = useState(false);
  
  return (
    <div className="h-[280px]">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-medium">Warranty Trends</h3>
          <div className="flex items-center gap-1">
            <TrendingUp className="text-green-600 h-3 w-3" />
            <span className="text-sm font-medium text-green-600">4.8% Growth</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${!showModelData ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>All Claims</span>
          <Switch
            id="claims-toggle"
            checked={showModelData}
            onCheckedChange={setShowModelData}
            className="h-4 w-8 data-[state=checked]:bg-primary"
          />
          <span className={`text-xs ${showModelData ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>Model Claims</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={showModelData ? modelClaimsData : claimsData}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
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
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              fontSize: '11px', 
              padding: '6px', 
              borderRadius: '4px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }} 
          />
          {showModelData ? (
            <>
              <Legend 
                align="right"
                verticalAlign="top"
                height={25}
                iconSize={8}
                wrapperStyle={{ fontSize: '10px', paddingBottom: '8px' }}
              />
              {Object.keys(modelColors).map((model) => (
                <Line 
                  key={model}
                  type="monotone" 
                  dataKey={model} 
                  stroke={modelColors[model as keyof typeof modelColors]} 
                  strokeWidth={2}
                  dot={{ stroke: modelColors[model as keyof typeof modelColors], strokeWidth: 2, r: 3, fill: '#fff' }}
                  activeDot={{ r: 4, stroke: modelColors[model as keyof typeof modelColors], strokeWidth: 2 }}
                />
              ))}
            </>
          ) : (
            <Line 
              type="monotone" 
              dataKey="claims" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 3, fill: '#fff' }}
              activeDot={{ r: 4, stroke: '#2563eb', strokeWidth: 2, fill: '#3b82f6' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
