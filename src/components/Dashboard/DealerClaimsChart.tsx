
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Dealer claims data
const dealerData = [
  { x: 8, y: 12, cost: 2400, name: 'Camping World Denver' },
  { x: 9, y: 15, cost: 3200, name: 'RV One Superstores' },
  { x: 10, y: 13, cost: 2800, name: 'Lazydays Tampa' },
  { x: 11, y: 17, cost: 3500, name: 'General RV Wixom' },
  { x: 12, y: 14, cost: 2900, name: 'Motor Home Specialist' },
  { x: 13, y: 16, cost: 3300, name: 'Bill Plemmons RV' },
  { x: 14, y: 12, cost: 2600, name: 'Dixie RV Superstores' },
  { x: 15, y: 14, cost: 3000, name: 'Campers Inn RV' },
  { x: 16, y: 15, cost: 3100, name: 'Giant RV' },
  { x: 17, y: 13, cost: 2700, name: 'PleasureLand RV' }
];

// Component claims data
const componentData = [
  { x: 8, y: 10, cost: 1800, name: 'Engine' },
  { x: 9, y: 14, cost: 2900, name: 'Transmission' },
  { x: 10, y: 12, cost: 2500, name: 'Electrical System' },
  { x: 11, y: 16, cost: 3400, name: 'HVAC' },
  { x: 12, y: 13, cost: 2600, name: 'Suspension' },
  { x: 13, y: 15, cost: 3100, name: 'Brakes' },
  { x: 14, y: 11, cost: 2300, name: 'Plumbing' },
  { x: 15, y: 13, cost: 2700, name: 'Generator' },
  { x: 16, y: 14, cost: 2800, name: 'Slide Out' },
  { x: 17, y: 12, cost: 2400, name: 'Appliances' }
];

// Model claims data
const modelData = [
  { x: 8, y: 11, cost: 2100, name: 'Model I' },
  { x: 9, y: 13, cost: 2800, name: 'Model Z Air' },
  { x: 10, y: 15, cost: 3200, name: 'Model Z' },
  { x: 11, y: 14, cost: 2900, name: 'Model G' },
  { x: 12, y: 12, cost: 2500, name: 'Model X Pro' },
  { x: 13, y: 16, cost: 3400, name: 'Model Y' },
  { x: 14, y: 13, cost: 2700, name: 'Model T' },
  { x: 15, y: 15, cost: 3100, name: 'Model S' },
  { x: 16, y: 12, cost: 2400, name: 'Model R' },
  { x: 17, y: 14, cost: 2900, name: 'Model W' }
];

type TabType = 'dealer' | 'component' | 'model';

export const DealerClaimsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dealer');

  // Function to get the appropriate data based on active tab
  const getActiveData = () => {
    switch (activeTab) {
      case 'dealer':
        return dealerData;
      case 'component':
        return componentData;
      case 'model':
        return modelData;
      default:
        return dealerData;
    }
  };

  // Function to get the dot color based on active tab
  const getDotColor = () => {
    switch (activeTab) {
      case 'dealer':
        return '#3b82f6'; // blue
      case 'component':
        return '#10b981'; // green
      case 'model':
        return '#8b5cf6'; // purple
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-sm font-medium">Claims</h3>
          <p className="text-xs text-muted-foreground">Total Cost</p>
        </div>
        <Tabs 
          value={activeTab} 
          onValueChange={(val) => setActiveTab(val as TabType)}
          className="h-7"
        >
          <TabsList className="h-7 bg-gray-50 dark:bg-gray-800 p-0.5">
            <TabsTrigger 
              value="dealer" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Dealer
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Component
            </TabsTrigger>
            <TabsTrigger 
              value="model" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Model
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-0">
        <ChartContainer 
          config={{
            [activeTab]: { color: getDotColor() }
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
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
                domain={[7, 18]} // Set fixed domain
              />
              <YAxis 
                dataKey="y" 
                name="Claims" 
                tick={{ fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Claims', angle: -90, position: 'insideLeft', offset: 5, fontSize: 9 }}
                domain={['dataMin - 1', 'dataMax + 1']} // Dynamic domain based on data
                allowDataOverflow={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value, name, props) => {
                      if (name === 'Claims') return [`${value} claims`, 'Claims'];
                      if (name === 'Hour of Day') return [`${value}:00`, 'Hour'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => {
                      const item = getActiveData().find(item => item.x === label);
                      return item?.name || '';
                    }}
                  />
                }
              />
              <Scatter 
                name={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
                data={getActiveData()} 
                fill={getDotColor()}
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
