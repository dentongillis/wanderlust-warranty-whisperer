import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  { name: 'PleasureLand RV', value: 8 },
  // Adding more dealers to demonstrate scrolling
  { name: 'Happy Camper RV', value: 18 },
  { name: 'Sunshine RV Center', value: 14 },
  { name: 'Mountain View RV', value: 12 },
  { name: 'Adventure Motors', value: 19 },
  { name: 'Freedom RV Sales', value: 15 }
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

  // Get bar color based on active tab
  const getBarColor = () => {
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
        return '#3b82f6'; // blue as default
    }
  };

  // Custom tooltip component that matches the style in the image
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg border border-gray-200 dark:border-gray-700 rounded">
          <p className="font-medium text-sm mb-1">{payload[0].payload.name}</p>
          <div className="text-xs font-medium">
            <div className="flex justify-between gap-2">
              <span className="text-gray-500">Count:</span>
              <span>{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header - moved tabs below title */}
      <div className="mb-4">
        <div>
          <h3 className="text-sm font-medium">Claims Analysis</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">By Category</p>
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
        </div>
      </div>

      {/* Chart with scroll area - enhanced scrolling capabilities */}
      <ScrollArea className="flex-1 w-full overflow-hidden">
        <div className="h-[400px] min-w-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={getActiveData()}
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }} // Reduced left margin from 80 to 40
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#f0f0f0" />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                domain={[0, 'dataMax + 5']}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={80} // Reduced width from 100 to 80
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={getBarColor()} 
                radius={[0, 4, 4, 0]}
                barSize={12}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ScrollArea>
    </div>
  );
};
