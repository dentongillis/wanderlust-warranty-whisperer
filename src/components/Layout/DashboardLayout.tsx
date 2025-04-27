
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsSheet } from '../Settings/SettingsSheet';
import { HelpSheet } from '../Help/HelpSheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 w-full">
        <header className="bg-background border-b border-border shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="mr-2"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <h1 className="text-xl font-semibold text-foreground hidden sm:block">RV Warranty Analysis</h1>
            </div>
            <div className="flex items-center gap-2">
              <HelpSheet />
              <SettingsSheet />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        
        <footer className="py-2 px-4 border-t text-sm text-muted-foreground flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="hidden sm:inline">RV Warranty Dashboard</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
