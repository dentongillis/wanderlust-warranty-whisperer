
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 w-full">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
              {title && (
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h1>
                  {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-8 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button variant="outline" className="hidden sm:flex">
                Ask AI
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell size={20} />
              </Button>
              <HelpSheet>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <HelpCircle size={20} />
                </Button>
              </HelpSheet>
              <SettingsSheet>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={20} />
                </Button>
              </SettingsSheet>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
