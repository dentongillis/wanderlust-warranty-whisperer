
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for each tab type
const dealerData = [
  { name: 'Camping World Denver', value: 12 },
  { name: 'RV One Superstores', value: 15 },
  { name: 'Lazydays Tampa', value: 10 },
  { name: 'General RV Wixom', value: 17 },
  { name: 'Motor Home Specialist', value: 14 },
  { name: 'Bill Plemmons RV', value: 16 },
  { name: 'Dixie RV Superstores', value: 9 },
  { name: 'Campers Inn RV', value: 13 },
  { name: 'Giant RV', value: 11 },
  { name: 'PleasureLand RV', value: 8 }
];

const floorplanData = [
  { name: 'Full Profile', value: 29 },
  { name: 'Bunkhouse', value: 27 },
  { name: 'Mid-Bath', value: 24 },
  { name: 'Standard Layout', value: 23 },
  { name: 'Half Profile', value: 22 },
  { name: 'Front Living', value: 21 },
  { name: 'Open Concept', value: 19 },
  { name: 'Rear Living', value: 18 },
  { name: 'Front Kitchen', value: 16 },
  { name: 'Fifth Wheel', value: 14 }
];

const componentData = [
  { name: 'HVAC', value: 34 },
  { name: 'Brakes', value: 31 },
  { name: 'Transmission', value: 29 },
  { name: 'Slide Out', value: 28 },
  { name: 'Generator', value: 27 },
  { name: 'Suspension', value: 26 },
  { name: 'Electrical System', value: 25 },
  { name: 'Appliances', value: 24 },
  { name: 'Plumbing', value: 23 },
  { name: 'Engine', value: 18 }
];

const issueData = [
  { name: 'Mechanical Failure', value: 36 },
  { name: 'Faulty Wiring', value: 32 },
  { name: 'Material Defects', value: 29 },
  { name: 'Water Damage', value: 28 },
  { name: 'Poor Installation', value: 25 },
  { name: 'Routine Wear', value: 26 },
  { name: 'Design Flaws', value: 23 },
  { name: 'Accident Damage', value: 20 },
  { name: 'Weather Damage', value: 18 },
  { name: 'User Error', value: 15 }
];

type TabType = 'dealer' | 'floorplan' | 'component' | 'issue';

export const HorizontalLineChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('floorplan');

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
        return floorplanData;
    }
  };

  // Get color based on active tab
  const getDotColor = () => {
    switch (activeTab) {
      case 'dealer':
        return '#3b82f6'; // blue
      case 'floorplan':
        return '#8b5cf6'; // purple - matching the image
      case 'component':
        return '#10b981'; // green
      case 'issue':
        return '#f97316'; // orange
      default:
        return '#8b5cf6'; // purple as default
    }
  };

  // Custom tooltip component that matches the style in the image
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700 rounded">
          <p className="font-medium text-sm">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium">Claims Analysis</h3>
          <p className="text-xs text-muted-foreground">By Category & Cost</p>
        </div>
        <Tabs 
          value={activeTab} 
          onValueChange={(val) => setActiveTab(val as TabType)}
          className="h-8"
        >
          <TabsList className="h-8 bg-gray-50 dark:bg-gray-800 p-0.5">
            <TabsTrigger 
              value="dealer" 
              className="text-xs h-7 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Dealer
            </TabsTrigger>
            <TabsTrigger 
              value="floorplan" 
              className="text-xs h-7 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Floorplan
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="text-xs h-7 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Component
            </TabsTrigger>
            <TabsTrigger 
              value="issue" 
              className="text-xs h-7 px-3 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Issue
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chart with scroll area */}
      <ScrollArea className="flex-1 w-full pr-1">
        <div className="h-[300px] min-w-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              layout="vertical"
              data={getActiveData()}
              margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                domain={[0, 'dataMax + 5']}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={80}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getDotColor()} 
                strokeWidth={1.5}
                dot={{ 
                  stroke: getDotColor(), 
                  strokeWidth: 1, 
                  r: 4, 
                  fill: getDotColor() 
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: getDotColor(), 
                  strokeWidth: 1, 
                  fill: getDotColor() 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ScrollArea>
    </div>
  );
};
