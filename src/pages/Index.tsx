
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
import { ChevronDown } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="RV warranty analysis overview"
    >
      <div className="space-y-4">
        {/* Top stats cards */}
        <div className="mb-4">
          <TopStats />
        </div>
        
        {/* Middle section with models bar and charts */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left column - wider */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Claims by Model Bar */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <h3 className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">Claims by Model</h3>
              <ClaimsByModelBarChart />
            </div>
            
            {/* Warranty Trends Chart - increased height */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Warranty Trends</CardTitle>
                  <div className="relative">
                    <select className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 pr-8 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <WarrantyTrendsChart />
              </CardContent>
            </Card>
            
            {/* Recent claims table */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <CardTitle className="text-base font-medium">Recent Claims</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-[180px] h-8 border rounded px-3 py-1 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" 
                      />
                    </div>
                    <button className="h-8 bg-gray-100 dark:bg-gray-700 px-3 rounded text-xs flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                      Filter
                    </button>
                    <button className="h-8 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-0 text-xs rounded hover:bg-blue-100 dark:hover:bg-blue-900/50">View All Claims</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <RecentClaimsTable />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Models Table */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="text-base font-medium">Model Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ModelsTable />
              </CardContent>
            </Card>
            
            {/* Dealer claims chart */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Dealer Claims</CardTitle>
                  <Tabs defaultValue="dealer" className="h-8">
                    <TabsList className="grid grid-cols-3 h-7 bg-gray-100 dark:bg-gray-800 p-0.5">
                      <TabsTrigger value="dealer" className="text-xs px-3 h-6 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Dealer</TabsTrigger>
                      <TabsTrigger value="component" className="text-xs px-3 h-6 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Component</TabsTrigger>
                      <TabsTrigger value="model" className="text-xs px-3 h-6 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Model</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <DealerClaimsChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
