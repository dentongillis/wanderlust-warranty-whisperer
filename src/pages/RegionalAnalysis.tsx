
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { KPICards } from '@/components/RegionalAnalysis/KPICards';
import { ChoroplethMap } from '@/components/RegionalAnalysis/ChoroplethMap';
import { RegionRankingsTable } from '@/components/RegionalAnalysis/RegionRankingsTable';
import { RegionalDonutChart } from '@/components/RegionalAnalysis/RegionalDonutChart';
import { ClaimTypesByRegionChart } from '@/components/RegionalAnalysis/ClaimTypesByRegionChart';

const RegionalAnalysis: React.FC = () => {
  return (
    <DashboardLayout
      title="Regional Analysis"
      description="Geographic distribution of warranty claims"
    >
      <div className="h-full flex flex-col gap-3">
        {/* KPI Cards */}
        <div className="w-full">
          <KPICards />
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
          {/* Left column - Map and Region Rankings */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-3 h-full min-h-0">
            {/* Choropleth Map */}
            <div className="h-[450px]">
              <ChoroplethMap />
            </div>
            
            {/* Region Rankings Table */}
            <div className="flex-grow min-h-0">
              <RegionRankingsTable />
            </div>
          </div>
          
          {/* Right column - Charts */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 h-full">
            {/* Donut Chart */}
            <div className="flex-1">
              <RegionalDonutChart />
            </div>
            
            {/* Bar Chart */}
            <div className="flex-1">
              <ClaimTypesByRegionChart />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegionalAnalysis;
