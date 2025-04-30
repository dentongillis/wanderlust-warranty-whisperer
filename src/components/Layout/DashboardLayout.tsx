
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FiltersSheet } from '../Filters/FiltersSheet';
import { AIChatSheet } from '../Dashboard/AIChatSheet';

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
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="mr-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
              {title && (
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h1>
                  {description && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-52 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <AIChatSheet>
                <Button variant="outline" className="text-sm h-9 px-4">
                  Ask AI
                </Button>
              </AIChatSheet>
              
              <FiltersSheet>
                <Button variant="default" className="text-sm h-9 px-4 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-2">
                  <Filter size={14} />
                  Filter
                </Button>
              </FiltersSheet>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-3 sm:p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
