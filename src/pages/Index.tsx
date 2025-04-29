
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { TopStats } from '@/components/Dashboard/TopStats';
import { WarrantyTrendsChart } from '@/components/Dashboard/WarrantyTrendsChart';
import { DealerClaimsChart } from '@/components/Dashboard/DealerClaimsChart';
import { ModelsTable } from '@/components/Dashboard/ModelsTable';
import { RecentClaimsTable } from '@/components/Dashboard/RecentClaimsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your RV warranty analysis dashboard"
    >
      <div className="space-y-6">
        {/* Top Stats Cards */}
        <TopStats />
        
        {/* Overview Section */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-base font-medium">Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModelsTable />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Charts Section */}
          <div className="col-span-12 md:col-span-6">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-[300px]">
              <CardHeader className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Warranty Trends</CardTitle>
                  <select className="border rounded px-2 py-1 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <WarrantyTrendsChart />
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-12 md:col-span-6">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-[300px]">
              <CardHeader className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Dealer Claims</CardTitle>
                  <Tabs defaultValue="dealer">
                    <TabsList className="grid grid-cols-3 h-7 text-xs">
                      <TabsTrigger value="dealer" className="text-xs px-2">Dealer</TabsTrigger>
                      <TabsTrigger value="component" className="text-xs px-2">Component</TabsTrigger>
                      <TabsTrigger value="model" className="text-xs px-2">Model</TabsTrigger>
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
          
        {/* Recent Claims Table */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Recent Claims</CardTitle>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border rounded px-2 py-1 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" 
                />
                <button className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                  Filter
                </button>
                <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">
                  View All Claims
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <RecentClaimsTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
