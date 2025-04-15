
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white border-b border-border shadow-sm z-10">
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
              <h1 className="text-xl font-semibold text-gray-800">RV Warranty Analysis</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">Help</Button>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        
        <footer className="py-3 px-6 border-t bg-white text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span>RV Warranty Dashboard</span>
            <span>© {new Date().getFullYear()} All rights reserved</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
