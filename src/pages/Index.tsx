
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { TopStats } from '@/components/Dashboard/TopStats';
import { WideBarChart } from '@/components/Dashboard/WideBarChart';
import { WarrantyTrendsChart } from '@/components/Dashboard/WarrantyTrendsChart';
import { DealerClaimsChart } from '@/components/Dashboard/DealerClaimsChart';
import { ModelsTable } from '@/components/Dashboard/ModelsTable';
import { RecentClaimsTable } from '@/components/Dashboard/RecentClaimsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your RV warranty analysis dashboard"
    >
      <div className="h-[calc(100vh-10rem)] grid grid-cols-12 gap-4 overflow-hidden">
        {/* Top stats row */}
        <div className="col-span-12">
          <TopStats />
        </div>
        
        {/* Main content grid */}
        <div className="col-span-8 grid grid-cols-1 gap-4">
          {/* Models table */}
          <div className="bg-white rounded-lg border shadow-sm p-4 h-[210px] overflow-hidden">
            <h2 className="text-lg font-medium mb-2">Overview</h2>
            <ModelsTable />
          </div>
          
          {/* Recent claims */}
          <div className="bg-white rounded-lg border shadow-sm p-4 h-[255px] overflow-hidden">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-medium">Recent Claims</h2>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border rounded px-2 py-1 text-xs" 
                />
                <button className="bg-gray-100 px-2 rounded text-xs flex items-center">
                  Filter
                </button>
                <button className="text-blue-600 text-xs">View All Claims</button>
              </div>
            </div>
            <RecentClaimsTable />
          </div>
        </div>
        
        {/* Right column charts */}
        <div className="col-span-4 grid grid-cols-1 gap-4">
          {/* Warranty Trends chart */}
          <div className="bg-white rounded-lg border shadow-sm p-4 h-[210px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Warranty Trends</h2>
              <select className="border rounded px-2 py-1 text-xs">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>
            
            <div className="mb-2">
              <Tabs defaultValue="totalClaims">
                <TabsList className="grid grid-cols-3 h-7 text-xs">
                  <TabsTrigger value="totalClaims">Total Claims</TabsTrigger>
                  <TabsTrigger value="totalCosts">Total Costs</TabsTrigger>
                  <TabsTrigger value="byModel">By Model</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <WarrantyTrendsChart />
          </div>
          
          {/* Dealer Claims chart */}
          <div className="bg-white rounded-lg border shadow-sm p-4 h-[255px]">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-medium">Dealer Claims</h2>
              <div>
                <Tabs defaultValue="dealer">
                  <TabsList className="grid grid-cols-3 h-7 text-xs">
                    <TabsTrigger value="dealer" className="text-xs px-2">Dealer</TabsTrigger>
                    <TabsTrigger value="component" className="text-xs px-2">Component</TabsTrigger>
                    <TabsTrigger value="model" className="text-xs px-2">Model</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <DealerClaimsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
