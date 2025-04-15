
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { OverviewCards } from '@/components/Dashboard/OverviewCards';
import { WarrantyChart } from '@/components/Dashboard/WarrantyChart';
import { TopModels } from '@/components/Dashboard/TopModels';
import { RecentClaims } from '@/components/Dashboard/RecentClaims';
import { AIChatAssistant } from '@/components/Dashboard/AIChatAssistant';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your RV warranty analysis dashboard.
          </p>
        </div>
        
        <section className="dashboard-section">
          <OverviewCards />
        </section>
        
        <section className="dashboard-section grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WarrantyChart />
          </div>
          <div className="lg:col-span-1">
            <AIChatAssistant />
          </div>
        </section>
        
        <section className="dashboard-section">
          <TopModels />
        </section>
        
        <section className="dashboard-section">
          <RecentClaims />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
