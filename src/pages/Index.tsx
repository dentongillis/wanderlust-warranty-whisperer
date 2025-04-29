
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { TopStats } from '@/components/Dashboard/TopStats';
import { WarrantyTrendsChart } from '@/components/Dashboard/WarrantyTrendsChart';
import { DealerClaimsChart } from '@/components/Dashboard/DealerClaimsChart';
import { ModelsTable } from '@/components/Dashboard/ModelsTable';
import { RecentClaimsTable } from '@/components/Dashboard/RecentClaimsTable';
import { FilterCard } from '@/components/Filters/FilterCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  // Filter state and handlers
  const [dateRange, setDateRange] = useState('30days');
  const [dealerFilter, setDealerFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filterOptions = [
    {
      label: "Date Range",
      options: [
        { value: "7days", label: "Last 7 Days" },
        { value: "30days", label: "Last 30 Days" },
        { value: "90days", label: "Last 90 Days" },
        { value: "ytd", label: "Year to Date" },
      ],
      value: dateRange,
      onChange: setDateRange,
    },
    {
      label: "Dealer",
      options: [
        { value: "all", label: "All Dealers" },
        { value: "camping-world", label: "Camping World" },
        { value: "general-rv", label: "General RV" },
        { value: "petes-rv", label: "Pete's RV Center" },
      ],
      value: dealerFilter,
      onChange: setDealerFilter,
    },
    {
      label: "Model",
      options: [
        { value: "all", label: "All Models" },
        { value: "model-i", label: "Model I" },
        { value: "model-z", label: "Model Z" },
        { value: "model-z-air", label: "Model Z Air" },
        { value: "model-g", label: "Model G" },
      ],
      value: modelFilter,
      onChange: setModelFilter,
    },
    {
      label: "Status",
      options: [
        { value: "all", label: "All Statuses" },
        { value: "approved", label: "Approved" },
        { value: "pending", label: "Pending" },
        { value: "denied", label: "Denied" },
        { value: "in-progress", label: "In Progress" },
      ],
      value: statusFilter,
      onChange: setStatusFilter,
    },
  ];

  const handleApplyFilters = () => {
    console.log("Applied filters:", { dateRange, dealerFilter, modelFilter, statusFilter });
    // Here you would implement actual filtering logic
  };

  const handleResetFilters = () => {
    setDateRange('30days');
    setDealerFilter('all');
    setModelFilter('all');
    setStatusFilter('all');
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="RV warranty analysis overview"
    >
      <div className="pb-2">
        <FilterCard 
          filters={filterOptions} 
          onApply={handleApplyFilters} 
          onReset={handleResetFilters}
        />
      </div>
      
      <div className="space-y-3">
        <TopStats />
        
        <div className="grid grid-cols-12 gap-3">
          {/* Models table */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-[300px] overflow-hidden">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-base font-medium">Model Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ModelsTable />
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid grid-rows-2 gap-3 h-[300px]">
              {/* Warranty trends chart */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="py-2 px-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">Warranty Trends</CardTitle>
                    <select className="border rounded px-1 py-0.5 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-0 px-2">
                  <WarrantyTrendsChart />
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
          
          {/* Recent claims table */}
          <div className="col-span-12">
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
