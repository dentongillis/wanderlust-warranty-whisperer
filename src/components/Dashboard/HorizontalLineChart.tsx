
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for each tab type
const dealerData = [
  { name: 'Camping World Denver', value: 12, cost: 24 },
  { name: 'RV One Superstores', value: 15, cost: 32 },
  { name: 'Lazydays Tampa', value: 10, cost: 28 },
  { name: 'General RV Wixom', value: 17, cost: 35 },
  { name: 'Motor Home Specialist', value: 14, cost: 29 },
  { name: 'Bill Plemmons RV', value: 16, cost: 33 },
  { name: 'Dixie RV Superstores', value: 9, cost: 26 },
  { name: 'Campers Inn RV', value: 13, cost: 30 },
  { name: 'Giant RV', value: 11, cost: 31 },
  { name: 'PleasureLand RV', value: 8, cost: 27 }
];

const floorplanData = [
  { name: 'Standard Layout', value: 23, cost: 48 },
  { name: 'Open Concept', value: 19, cost: 42 },
  { name: 'Bunkhouse', value: 27, cost: 56 },
  { name: 'Front Living', value: 21, cost: 46 },
  { name: 'Rear Living', value: 18, cost: 38 },
  { name: 'Mid-Bath', value: 24, cost: 49 },
  { name: 'Front Kitchen', value: 16, cost: 33 },
  { name: 'Full Profile', value: 29, cost: 61 },
  { name: 'Half Profile', value: 22, cost: 45 },
  { name: 'Fifth Wheel', value: 31, cost: 64 }
];

const componentData = [
  { name: 'Engine', value: 18, cost: 46 },
  { name: 'Transmission', value: 29, cost: 62 },
  { name: 'Electrical System', value: 25, cost: 54 },
  { name: 'HVAC', value: 34, cost: 72 },
  { name: 'Suspension', value: 26, cost: 58 },
  { name: 'Brakes', value: 31, cost: 64 },
  { name: 'Plumbing', value: 23, cost: 49 },
  { name: 'Generator', value: 27, cost: 57 },
  { name: 'Slide Out', value: 28, cost: 59 },
  { name: 'Appliances', value: 24, cost: 51 }
];

const issueData = [
  { name: 'Faulty Wiring', value: 32, cost: 68 },
  { name: 'Water Damage', value: 28, cost: 59 },
  { name: 'Mechanical Failure', value: 36, cost: 75 },
  { name: 'Poor Installation', value: 25, cost: 53 },
  { name: 'Material Defects', value: 29, cost: 61 },
  { name: 'Design Flaws', value: 23, cost: 48 },
  { name: 'Weather Damage', value: 18, cost: 42 },
  { name: 'User Error', value: 15, cost: 32 },
  { name: 'Accident Damage', value: 20, cost: 43 },
  { name: 'Routine Wear', value: 26, cost: 55 }
];

type TabType = 'dealer' | 'floorplan' | 'component' | 'issue';

export const HorizontalLineChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dealer');

  const getActiveData = () => {
    switch (activeTab) {
      case 'dealer':
        return dealerData;
      case 'floorplan':
        return floorplanData;
      case 'component':
        return componentData;
      case 'issue':
        return issueData;
      default:
        return dealerData;
    }
  };

  // Function to get the line color based on active tab
  const getLineColor = () => {
    switch (activeTab) {
      case 'dealer':
        return '#3b82f6'; // blue
      case 'floorplan':
        return '#8b5cf6'; // purple
      case 'component':
        return '#10b981'; // green
      case 'issue':
        return '#f97316'; // orange
      default:
        return '#3b82f6';
    }
  };
  
  // Function to get the cost line color
  const getCostLineColor = () => {
    switch (activeTab) {
      case 'dealer':
        return '#93c5fd'; // light blue
      case 'floorplan':
        return '#c4b5fd'; // light purple
      case 'component':
        return '#6ee7b7'; // light green
      case 'issue':
        return '#fdba74'; // light orange
      default:
        return '#93c5fd';
    }
  };

  const data = getActiveData().sort((a, b) => b.value - a.value);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="font-medium text-sm mb-2">{payload[0].payload.name}</p>
          <div className="space-y-1 text-xs">
            <p><span className="font-medium text-gray-500">Total Claims:</span> {payload[0].value}</p>
            <p><span className="font-medium text-gray-500">Total Cost:</span> ${payload[1].value}k</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-medium">Claims Analysis</h3>
          <p className="text-xs text-muted-foreground">By Category & Cost</p>
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
              value="floorplan" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Floorplan
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Component
            </TabsTrigger>
            <TabsTrigger 
              value="issue" 
              className="text-xs h-6 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Issue
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chart with scroll area */}
      <ScrollArea className="flex-1 w-full">
        <div className="h-[350px] min-w-[600px] pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 'dataMax + 5']} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={80}
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Total Claims" 
                stroke={getLineColor()} 
                strokeWidth={2.5}
                dot={{ stroke: getLineColor(), strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: getLineColor(), strokeWidth: 2, fill: getLineColor() }} 
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                name="Total Cost ($k)" 
                stroke={getCostLineColor()} 
                strokeWidth={2}
                dot={{ stroke: getCostLineColor(), strokeWidth: 2, r: 3, fill: 'white' }}
                activeDot={{ r: 5, stroke: getCostLineColor(), strokeWidth: 2, fill: getCostLineColor() }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ScrollArea>
    </div>
  );
};
