
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { TopStats } from '@/components/Dashboard/TopStats';
import { WarrantyTrendsChart } from '@/components/Dashboard/WarrantyTrendsChart';
import { DealerClaimsChart } from '@/components/Dashboard/DealerClaimsChart';
import { ModelsTable } from '@/components/Dashboard/ModelsTable';
import { RecentClaimsTable } from '@/components/Dashboard/RecentClaimsTable';
import { ClaimsByModelBarChart } from '@/components/Dashboard/ClaimsByModelBarChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="RV warranty analysis overview"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-3">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-7">
            {/* Top stats */}
            <div className="mb-3">
              <TopStats />
            </div>
            
            {/* Claims by Model Bar - no border */}
            <div className="mb-3">
              <ClaimsByModelBarChart />
            </div>
            
            {/* Warranty Trends Chart - increased height */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm mb-3">
              <CardHeader className="py-2 px-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Warranty Trends</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 px-2 pb-2">
                <WarrantyTrendsChart />
              </CardContent>
            </Card>
            
            {/* Recent claims table */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="py-2 px-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Recent Claims</CardTitle>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="border rounded px-2 py-1 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" 
                    />
                    <button className="bg-gray-100 dark:bg-gray-700 px-2 rounded text-xs flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                      Filter
                    </button>
                    <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">View All Claims</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <RecentClaimsTable />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - adjusted to be a medium width (5/12 columns) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-rows-2 gap-3 h-full">
              {/* Models Table */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-[280px] overflow-hidden">
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-base font-medium">Model Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ModelsTable />
                </CardContent>
              </Card>
              
              {/* Dealer claims chart */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="py-2 px-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">Dealer Claims</CardTitle>
                    <Tabs defaultValue="dealer">
                      <TabsList className="grid grid-cols-3 h-6 text-xs">
                        <TabsTrigger value="dealer" className="text-xs px-2">Dealer</TabsTrigger>
                        <TabsTrigger value="component" className="text-xs px-2">Component</TabsTrigger>
                        <TabsTrigger value="model" className="text-xs px-2">Model</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="p-0 px-2">
                  <DealerClaimsChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
