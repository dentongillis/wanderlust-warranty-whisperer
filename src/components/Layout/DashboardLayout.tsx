
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu, Search, Settings, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsSheet } from '../Settings/SettingsSheet';
import { HelpSheet } from '../Help/HelpSheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, description }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 w-full">
        <header className="bg-white border-b shadow-sm z-10 flex-shrink-0">
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
              {title && (
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 rounded-md border border-gray-200 py-2 pl-8 text-sm outline-none focus:border-gray-300 focus:ring-0"
                />
              </div>
              <Button variant="outline" className="hidden sm:flex">
                Ask AI
              </Button>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <HelpSheet>
                <Button variant="ghost" size="icon">
                  <HelpCircle size={20} />
                </Button>
              </HelpSheet>
              <SettingsSheet>
                <Button variant="ghost" size="icon">
                  <Settings size={20} />
                </Button>
              </SettingsSheet>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden p-2 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
