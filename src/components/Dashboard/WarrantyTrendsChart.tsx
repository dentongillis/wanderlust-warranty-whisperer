
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent } from '@/components/ui/card';

// Enhanced model colors with more professional and distinct color palette
const modelColors = {
  "Model X": "#8B5CF6", // Vivid Purple
  "Model Y": "#F97316", // Bright Orange
  "Model Z": "#10B981"  // Emerald Green
};

// Sample data for all claims - daily view (simplified for cleaner presentation)
const claimsData = [
  { day: 'Jan', claims: 65 },
  { day: 'Feb', claims: 68 },
  { day: 'Mar', claims: 80 },
  { day: 'Apr', claims: 86 },
  { day: 'May', claims: 75 },
  { day: 'Jun', claims: 78 }
];

// Sample data for claims by model - daily view (simplified for cleaner presentation)
const modelClaimsData = [
  { day: 'Jan', "Model X": 30, "Model Y": 25, "Model Z": 10 },
  { day: 'Feb', "Model X": 32, "Model Y": 22, "Model Z": 14 },
  { day: 'Mar', "Model X": 38, "Model Y": 28, "Model Z": 14 },
  { day: 'Apr', "Model X": 42, "Model Y": 30, "Model Z": 16 },
  { day: 'May', "Model X": 35, "Model Y": 25, "Model Z": 15 },
  { day: 'Jun', "Model X": 32, "Model Y": 26, "Model Z": 20 }
];

// Custom tooltip component for a more professional look
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-3">
          <div className="text-sm font-medium mb-2">{label}</div>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs font-medium text-gray-600">{entry.name}</span>
                </div>
                <span className="text-xs font-semibold tabular-nums">{entry.value} claims</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export const WarrantyTrendsChart: React.FC = () => {
  const [showModelData, setShowModelData] = useState(false);
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header with title and toggle - properly aligned to the edges */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Warranty Trends
        </h3>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs ${!showModelData ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            All Claims
          </span>
          
          <Switch
            id="claims-toggle"
            checked={showModelData}
            onCheckedChange={setShowModelData}
            className="h-4 w-8 data-[state=checked]:bg-blue-600"
          />
          
          <span className={`text-xs ${showModelData ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            Model Claims
          </span>
        </div>
      </div>
      
      {/* Model-specific legend moved directly under the toggle and above the chart */}
      {showModelData && (
        <div className="flex items-center justify-end mb-2 px-1">
          <div className="flex items-center gap-4">
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
        </div>
      )}
      
      {/* Main chart area with full height utilization */}
      <div className="flex-grow overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={showModelData ? modelClaimsData : claimsData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
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
              width={30}
              tickCount={5}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {showModelData ? (
              // Model-specific lines with enhanced styling
              Object.keys(modelColors).map((model) => (
                <Line 
                  key={model}
                  type="monotone" 
                  dataKey={model} 
                  name={model}
                  stroke={modelColors[model as keyof typeof modelColors]} 
                  strokeWidth={2}
                  dot={{ stroke: modelColors[model as keyof typeof modelColors], strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ 
                    r: 6, 
                    stroke: modelColors[model as keyof typeof modelColors], 
                    strokeWidth: 2, 
                    fill: 'white' 
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
                dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ 
                  r: 6, 
                  stroke: '#2563eb', 
                  strokeWidth: 2, 
                  fill: 'white' 
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
