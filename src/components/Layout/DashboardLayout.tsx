
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FiltersSheet } from '../Filters/FiltersSheet';
import { AIChatSheet } from '../Dashboard/AIChatSheet';
import { useLocation } from 'react-router-dom';
import { DateRangeSelector } from '../DateFilters/DateRangeSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, description }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="flex-shrink-0 transition-all duration-300 ease-in-out">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      
      <div className="flex flex-col flex-1 w-full min-w-0 transition-all duration-300 ease-in-out">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 flex-shrink-0">
          {/* Top header with toggle and title */}
          <div className="flex items-center justify-between p-2 sm:p-3">
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
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h1>
                  {description && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 sm:py-2 pl-8 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <AIChatSheet>
                <Button variant="outline" className="text-sm py-1 px-3 h-auto">
                  Ask AI
                </Button>
              </AIChatSheet>
              
              <FiltersSheet>
                <Button variant="outline" className="text-sm py-1 px-3 h-auto flex items-center">
                  <Filter size={14} className="mr-1" />
                  Filter
                </Button>
              </FiltersSheet>
            </div>
          </div>
          
          {/* Date range filter section */}
          <div className="px-3 pb-2">
            <DateRangeSelector />
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-2 sm:p-3 flex flex-col min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
};
