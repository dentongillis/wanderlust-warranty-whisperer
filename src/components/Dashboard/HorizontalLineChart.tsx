
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Expanded dealer data for scrolling demonstration
const dealerData = [
  { name: 'Camping World Denver', city: 'Denver', state: 'CO', value: 12 },
  { name: 'RV One Superstores', city: 'Tampa', state: 'FL', value: 15 },
  { name: 'Lazydays Tampa', city: 'Tampa', state: 'FL', value: 10 },
  { name: 'General RV Wixom', city: 'Wixom', state: 'MI', value: 17 },
  { name: 'Motor Home Specialist', city: 'Alvarado', state: 'TX', value: 14 },
  { name: 'Bill Plemmons RV', city: 'Rural Hall', state: 'NC', value: 16 },
  { name: 'Dixie RV Superstores', city: 'Hammond', state: 'LA', value: 9 },
  { name: 'Campers Inn RV', city: 'Jacksonville', state: 'FL', value: 13 },
  { name: 'Giant RV', city: 'Montclair', state: 'CA', value: 11 },
  { name: 'PleasureLand RV', city: 'St. Cloud', state: 'MN', value: 8 },
  { name: 'Happy Camper RV', city: 'Charlotte', state: 'NC', value: 18 },
  { name: 'Sunshine RV Center', city: 'Phoenix', state: 'AZ', value: 14 },
  { name: 'Mountain View RV', city: 'Denver', state: 'CO', value: 12 },
  { name: 'Adventure Motors', city: 'Charlotte', state: 'NC', value: 19 },
  { name: 'Freedom RV Sales', city: 'Las Vegas', state: 'NV', value: 15 },
  { name: 'Valley RV Center', city: 'Sacramento', state: 'CA', value: 11 },
  { name: 'Roadtrek Paradise', city: 'Austin', state: 'TX', value: 16 },
  { name: 'Traveler\'s Corner', city: 'Portland', state: 'OR', value: 14 },
  { name: 'Highway Haven RV', city: 'Seattle', state: 'WA', value: 17 },
  { name: 'Frontier Motors', city: 'Nashville', state: 'TN', value: 13 }
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
        return [...dealerData].sort((a, b) => b.value - a.value);
      case 'floorplan':
        return [...floorplanData].sort((a, b) => b.value - a.value);
      case 'component':
        return [...componentData].sort((a, b) => b.value - a.value);
      case 'issue':
        return [...issueData].sort((a, b) => b.value - a.value);
      default:
        return [...dealerData].sort((a, b) => b.value - a.value);
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

  const data = getActiveData();
  
  // Calculate total values for percentage calculation
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  // Find the maximum value for scaling the bars
  const maxValue = Math.max(...data.map(item => item.value));

  // Format the display name for dealers to include city and state
  const getDisplayName = (item: any) => {
    if (activeTab === 'dealer' && item.city && item.state) {
      return `${item.name} - ${item.city}, ${item.state}`;
    }
    return item.name;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header - with tabs in the same row */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-medium">Claims Analysis</h3>
          <p className="text-xs text-muted-foreground">By Category</p>
        </div>
        <Tabs 
          value={activeTab} 
          onValueChange={(val) => setActiveTab(val as TabType)}
          className="h-6"
        >
          <TabsList className="h-6 bg-gray-50 dark:bg-gray-800 p-0.5">
            <TabsTrigger 
              value="dealer" 
              className="text-[10px] h-5 px-2 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Dealer
            </TabsTrigger>
            <TabsTrigger 
              value="floorplan" 
              className="text-[10px] h-5 px-2 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Floorplan
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="text-[10px] h-5 px-2 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Component
            </TabsTrigger>
            <TabsTrigger 
              value="issue" 
              className="text-[10px] h-5 px-2 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Issue
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Scrollable chart container */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="min-h-[400px] pr-2">
          <TooltipProvider>
            <div className="flex flex-col space-y-2">
              {data.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col">
                      {/* Item name above the bar */}
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-0.5 flex justify-between">
                        <span>{getDisplayName(item)}</span>
                      </div>
                      <div className="flex items-center group">
                        <div className="h-7 relative w-full bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300 flex items-center justify-center"
                            style={{ 
                              width: `${(item.value / maxValue) * 100}%`, 
                              backgroundColor: getBarColor(),
                              borderRadius: '4px'
                            }}
                          >
                            <span className="text-xs text-white font-medium">
                              {item.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-2 rounded-lg">
                    <div className="text-xs font-medium">
                      <div className="font-medium mb-1">{getDisplayName(item)}</div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Count:</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Share:</span>
                        <span>{((item.value / totalValue) * 100).toFixed(1)}%</span>
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
