
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { OverviewCards } from '@/components/Dashboard/OverviewCards';
import { WarrantyChart } from '@/components/Dashboard/WarrantyChart';
import { TopModels } from '@/components/Dashboard/TopModels';
import { RecentClaims } from '@/components/Dashboard/RecentClaims';
import { AIChatAssistant } from '@/components/Dashboard/AIChatAssistant';

const Index = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your RV warranty analysis dashboard"
    >
      <div className="space-y-4 lg:space-y-6">
        <section className="grid gap-4">
          <OverviewCards />
        </section>
        
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 h-[400px]">
            <WarrantyChart />
          </div>
          <div className="xl:col-span-1 h-[400px]">
            <AIChatAssistant />
          </div>
        </section>
        
        <section className="grid gap-4">
          <TopModels />
        </section>
        
        <section className="grid gap-4">
          <RecentClaims />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
