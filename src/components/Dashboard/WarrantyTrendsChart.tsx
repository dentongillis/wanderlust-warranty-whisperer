
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

// Sample data for all claims
const claimsData = [
  { day: '01 May', claims: 65 },
  { day: '05 May', claims: 75 },
  { day: '10 May', claims: 68 },
  { day: '15 May', claims: 90 },
  { day: '20 May', claims: 82 },
  { day: '25 May', claims: 95 },
  { day: '30 May', claims: 78 }
];

// Sample data for claims by model
const modelClaimsData = [
  { day: '01 May', "Model I": 30, "Model Z": 25, "Model G": 10 },
  { day: '05 May', "Model I": 35, "Model Z": 20, "Model G": 20 },
  { day: '10 May', "Model I": 28, "Model Z": 22, "Model G": 18 },
  { day: '15 May', "Model I": 40, "Model Z": 30, "Model G": 20 },
  { day: '20 May', "Model I": 35, "Model Z": 27, "Model G": 20 },
  { day: '25 May', "Model I": 42, "Model Z": 33, "Model G": 20 },
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
