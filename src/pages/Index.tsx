
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { TopStats } from '@/components/Dashboard/TopStats';
import { WarrantyTrendsChart } from '@/components/Dashboard/WarrantyTrendsChart';
import { ModelsTable } from '@/components/Dashboard/ModelsTable';
import { RecentClaimsTable } from '@/components/Dashboard/RecentClaimsTable';
import { ClaimsByModelBarChart } from '@/components/Dashboard/ClaimsByModelBarChart';
import { HorizontalLineChart } from '@/components/Dashboard/HorizontalLineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Function to navigate to claims report page
  const navigateToClaimsReport = () => {
    navigate('/claims-report');
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="RV warranty analysis overview"
    >
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-12 gap-3 h-full flex-1 min-h-0">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col h-full min-h-0">
            {/* Top stats */}
            <div className="mb-3">
              <TopStats />
            </div>
            
            {/* Claims by Model Bar - no border */}
            <div className="mb-3">
              <ClaimsByModelBarChart />
            </div>
            
            {/* Warranty Trends Chart - make it taller */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm mb-3 min-h-0 h-[350px]">
              <CardContent className="p-4 h-full">
                <WarrantyTrendsChart />
              </CardContent>
            </Card>
            
            {/* Recent claims table */}
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm flex-grow min-h-0 mb-3 lg:mb-0 flex flex-col">
              <CardHeader className="py-2 px-3 flex-shrink-0 pb-0">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-xs font-medium">Recent Claims</CardTitle>
                  <div className="flex-1 max-w-xs">
                    <Input
                      placeholder="Search claims..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-xs h-6 max-w-full"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                <RecentClaimsTable />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column */}
          <div className="col-span-12 lg:col-span-5 flex flex-col h-full min-h-0">
            <div className="flex flex-col h-full gap-3">
              {/* Models Table */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
                <CardHeader className="py-2 px-3 flex-shrink-0">
                  <CardTitle className="text-xs font-medium">Model Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-auto flex-grow">
                  <ModelsTable />
                </CardContent>
              </Card>
              
              {/* Claims Analysis Chart */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm flex-grow min-h-0 flex flex-col">
                <CardContent className="p-3 flex flex-col h-full overflow-hidden">
                  <HorizontalLineChart />
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
