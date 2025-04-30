
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Dealer claims data - each dot is a dealer
const dealerData = [
  { x: 12, y: 24, cost: 2400, name: 'Camping World Denver' },
  { x: 15, y: 32, cost: 3200, name: 'RV One Superstores' },
  { x: 10, y: 28, cost: 2800, name: 'Lazydays Tampa' },
  { x: 17, y: 35, cost: 3500, name: 'General RV Wixom' },
  { x: 14, y: 29, cost: 2900, name: 'Motor Home Specialist' },
  { x: 16, y: 33, cost: 3300, name: 'Bill Plemmons RV' },
  { x: 9, y: 26, cost: 2600, name: 'Dixie RV Superstores' },
  { x: 13, y: 30, cost: 3000, name: 'Campers Inn RV' },
  { x: 11, y: 31, cost: 3100, name: 'Giant RV' },
  { x: 8, y: 27, cost: 2700, name: 'PleasureLand RV' }
];

// Component claims data - each dot is a component
const componentData = [
  { x: 18, y: 18, cost: 1800, name: 'Engine' },
  { x: 29, y: 29, cost: 2900, name: 'Transmission' },
  { x: 25, y: 25, cost: 2500, name: 'Electrical System' },
  { x: 34, y: 34, cost: 3400, name: 'HVAC' },
  { x: 26, y: 26, cost: 2600, name: 'Suspension' },
  { x: 31, y: 31, cost: 3100, name: 'Brakes' },
  { x: 23, y: 23, cost: 2300, name: 'Plumbing' },
  { x: 27, y: 27, cost: 2700, name: 'Generator' },
  { x: 28, y: 28, cost: 2800, name: 'Slide Out' },
  { x: 24, y: 24, cost: 2400, name: 'Appliances' }
];

// Model claims data - each dot is a model
const modelData = [
  { x: 21, y: 21, cost: 2100, name: 'Model I' },
  { x: 28, y: 28, cost: 2800, name: 'Model Z Air' },
  { x: 32, y: 32, cost: 3200, name: 'Model Z' },
  { x: 29, y: 29, cost: 2900, name: 'Model G' },
  { x: 25, y: 25, cost: 2500, name: 'Model X Pro' },
  { x: 34, y: 34, cost: 3400, name: 'Model Y' },
  { x: 27, y: 27, cost: 2700, name: 'Model T' },
  { x: 31, y: 31, cost: 3100, name: 'Model S' },
  { x: 24, y: 24, cost: 2400, name: 'Model R' },
  { x: 29, y: 29, cost: 2900, name: 'Model W' }
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

  // Function to get the appropriate axis domains based on active tab
  const getAxisDomains = () => {
    const data = getActiveData();
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    
    return {
      xDomain: [xMin - 1, xMax + 1],
      yDomain: [yMin - 1, yMax + 1]
    };
  };

  const domains = getAxisDomains();
  const data = getActiveData();

  // Function to get entity type label
  const getEntityTypeLabel = () => {
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-sm font-medium">Claims Analysis</h3>
          <p className="text-xs text-muted-foreground">By Total Claims & Cost</p>
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
      <div className="flex-1 min-h-0 pt-2">
        <ChartContainer 
          config={{
            [activeTab]: { color: getDotColor() }
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="x" 
                type="number" 
                name="Total Claims"
                tick={{ fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Total Claims', position: 'insideBottom', offset: -5, fontSize: 10 }}
                domain={domains.xDomain}
              />
              <YAxis 
                dataKey="y" 
                name="Total Cost" 
                tick={{ fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Total Cost ($k)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10 }}
                domain={domains.yDomain}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value, name, props) => {
                      if (name === 'Total Claims') return [`${value}`, name];
                      if (name === 'Total Cost') return [`$${value}k`, name];
                      return [value, name];
                    }}
                    labelFormatter={(value) => {
                      // Find the item by x value
                      const item = data.find(item => item.x === value);
                      return item ? item.name : '';
                    }}
                  />
                }
              />
              <Scatter 
                name={getEntityTypeLabel()}
                data={data} 
                fill={getDotColor()}
                shape="circle"
                opacity={0.8}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
