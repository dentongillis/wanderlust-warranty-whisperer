
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Expanded dealer data for scrolling demonstration
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
  { name: 'Happy Camper RV', value: 18 },
  { name: 'Sunshine RV Center', value: 14 },
  { name: 'Mountain View RV', value: 12 },
  { name: 'Adventure Motors', value: 19 },
  { name: 'Freedom RV Sales', value: 15 },
  { name: 'Valley RV Center', value: 11 },
  { name: 'Roadtrek Paradise', value: 16 },
  { name: 'Traveler\'s Corner', value: 14 },
  { name: 'Highway Haven RV', value: 17 },
  { name: 'Frontier Motors', value: 13 }
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
        return '#8b5cf6'; // purple
      case 'component':
        return '#10b981'; // green
      case 'issue':
        return '#f97316'; // orange
      default:
        return '#3b82f6'; // blue as default
    }
  };

  // Find the maximum value for scaling the bars
  const maxValue = Math.max(...getActiveData().map(item => item.value));

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header - with tabs below title */}
      <div className="mb-2">
        <h3 className="text-sm font-medium">Claims Analysis</h3>
        <div className="flex justify-between items-center">
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

      {/* Scrollable chart container */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="min-h-[400px] pr-2">
          <TooltipProvider>
            <div className="flex flex-col space-y-2">
              {getActiveData().map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center group">
                      <div className="w-24 min-w-24 truncate text-xs text-gray-600 dark:text-gray-300 pr-2">
                        {item.name}
                      </div>
                      <div className="h-7 relative w-full bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                        <div 
                          className="h-full transition-all duration-300"
                          style={{ 
                            width: `${(item.value / maxValue) * 100}%`, 
                            backgroundColor: getBarColor(),
                            borderRadius: '0 4px 4px 0'
                          }}
                        >
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-white font-medium">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-2 rounded-lg">
                    <div className="text-xs font-medium">
                      <div className="font-medium mb-1">{item.name}</div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Count:</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Share:</span>
                        <span>{((item.value / maxValue) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};
