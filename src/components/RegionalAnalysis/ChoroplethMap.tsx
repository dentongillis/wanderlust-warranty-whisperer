
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info } from 'lucide-react';

// Mock data for the choropleth map
const usStatesData = [
  { id: 'CA', state: 'California', value: 780, change: '+12%' },
  { id: 'TX', state: 'Texas', value: 680, change: '+8%' },
  { id: 'FL', state: 'Florida', value: 520, change: '+15%' },
  { id: 'NY', state: 'New York', value: 470, change: '-5%' },
  { id: 'OH', state: 'Ohio', value: 420, change: '+2%' },
  { id: 'PA', state: 'Pennsylvania', value: 380, change: '+4%' },
  { id: 'IL', state: 'Illinois', value: 360, change: '+1%' },
  { id: 'MI', state: 'Michigan', value: 340, change: '+7%' },
  { id: 'GA', state: 'Georgia', value: 320, change: '+10%' },
  { id: 'NC', state: 'North Carolina', value: 310, change: '+6%' },
  // Add more states
];

const canadianProvincesData = [
  { id: 'ON', province: 'Ontario', value: 320, change: '+8%' },
  { id: 'QC', province: 'Quebec', value: 280, change: '+5%' },
  { id: 'BC', province: 'British Columbia', value: 240, change: '+12%' },
  { id: 'AB', province: 'Alberta', value: 210, change: '-2%' },
  { id: 'MB', province: 'Manitoba', value: 180, change: '+4%' },
  { id: 'NS', province: 'Nova Scotia', value: 120, change: '+1%' },
  // Add more provinces
];

export const ChoroplethMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('usa');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // This is where we would normally initialize a real map with D3 or a mapping library
      // For this example, we'll just show a placeholder with styled divs
      if (mapRef.current) {
        renderMapPlaceholder(mapRef.current, activeTab === 'usa' ? usStatesData : canadianProvincesData);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  const renderMapPlaceholder = (container: HTMLElement, data: any[]) => {
    // In a real implementation, this would be replaced with actual D3 code or a mapping library
    container.innerHTML = '';
    
    const maxValue = Math.max(...data.map(d => d.value));
    
    // Create a simple visualization to represent the map
    const wrapper = document.createElement('div');
    wrapper.className = 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-2';
    
    data.forEach(region => {
      const intensity = Math.max(0.2, region.value / maxValue);
      
      const regionEl = document.createElement('div');
      regionEl.className = 'p-2 rounded-md text-center cursor-pointer hover:scale-105 transition-transform';
      regionEl.style.backgroundColor = `rgba(59, 130, 246, ${intensity})`;
      regionEl.style.color = intensity > 0.6 ? 'white' : 'black';
      
      const idEl = document.createElement('div');
      idEl.className = 'font-bold';
      idEl.textContent = region.id;
      
      const valueEl = document.createElement('div');
      valueEl.className = 'text-sm';
      valueEl.textContent = region.value.toString();
      
      const changeEl = document.createElement('div');
      changeEl.className = region.change.startsWith('+') ? 'text-xs text-green-500' : 'text-xs text-red-500';
      changeEl.textContent = region.change;
      
      regionEl.appendChild(idEl);
      regionEl.appendChild(valueEl);
      regionEl.appendChild(changeEl);
      
      wrapper.appendChild(regionEl);
    });
    
    container.appendChild(wrapper);
  };
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-full overflow-hidden">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Regional Claims Distribution</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info size={16} />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="usa">United States</TabsTrigger>
              <TabsTrigger value="canada">Canada</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 h-[400px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading map data...</div>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="h-full w-full"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
