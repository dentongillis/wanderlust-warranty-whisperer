
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { TrendingUp } from 'lucide-react';

// Sample data for all claims - daily view
const claimsData = [
  { day: '01 May', claims: 65 },
  { day: '08 May', claims: 68 },
  { day: '14 May', claims: 88 },
  { day: '20 May', claims: 82 },
  { day: '27 May', claims: 88 },
  { day: '30 May', claims: 78 }
];

// Sample data for claims by model - daily view
const modelClaimsData = [
  { day: '01 May', "Model I": 30, "Model Z": 25, "Model G": 10 },
  { day: '08 May', "Model I": 30, "Model Z": 23, "Model G": 15 },
  { day: '14 May', "Model I": 38, "Model Z": 29, "Model G": 21 },
  { day: '20 May', "Model I": 35, "Model Z": 27, "Model G": 20 },
  { day: '27 May', "Model I": 40, "Model Z": 29, "Model G": 19 },
  { day: '30 May', "Model I": 38, "Model Z": 25, "Model G": 15 }
];

// Enhanced model colors with more professional and distinct color palette
const modelColors = {
  "Model I": "#8B5CF6", // Vivid Purple
  "Model Z": "#F97316", // Bright Orange
  "Model G": "#10B981"  // Emerald Green
};

// Custom line chart tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md">
        <p className="font-medium text-sm mb-1">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs font-medium">
                {entry.name}: {entry.value} claims
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const WarrantyTrendsChart: React.FC = () => {
  const [showModelData, setShowModelData] = useState(false);
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* Clean header with title and toggle */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Warranty Trends</h3>
          <div className="flex items-center gap-1">
            <TrendingUp className="text-green-600 h-3.5 w-3.5" />
            <span className="text-xs font-medium text-green-600">4.8% Growth (May 2025)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs ${!showModelData ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            All Claims
          </span>
          
          <Switch
            id="claims-toggle"
            checked={showModelData}
            onCheckedChange={setShowModelData}
            className="h-4 w-8 mx-1 data-[state=checked]:bg-blue-600"
          />
          
          <span className={`text-xs ${showModelData ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            Model Claims
          </span>
        </div>
      </div>
      
      {/* Model-specific legend that appears only when Model Claims is selected - positioned directly under the toggle */}
      {showModelData && (
        <div className="flex items-center justify-center gap-6 mb-6">
          {Object.entries(modelColors).map(([model, color]) => (
            <div key={model} className="flex items-center gap-1.5">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-medium">{model}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Clean chart without grid lines for a more modern look */}
      <div className="flex-grow overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={showModelData ? modelClaimsData : claimsData}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            {/* Remove CartesianGrid for cleaner look */}
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6B7280' }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6B7280' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              width={30}
              tickCount={5}
              tickFormatter={(value) => value === 0 ? '' : value}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none' }}
            />
            
            {showModelData ? (
              // Model-specific lines with enhanced styling
              Object.keys(modelColors).map((model) => (
                <Line 
                  key={model}
                  type="monotone" 
                  dataKey={model} 
                  name={model}
                  stroke={modelColors[model as keyof typeof modelColors]} 
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ 
                    r: 5, 
                    stroke: modelColors[model as keyof typeof modelColors], 
                    strokeWidth: 1, 
                    fill: '#fff' 
                  }}
                />
              ))
            ) : (
              // All claims line with enhanced styling
              <Line 
                type="monotone" 
                dataKey="claims" 
                name="Claims"
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 5, 
                  stroke: '#2563eb', 
                  strokeWidth: 1, 
                  fill: '#fff' 
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
