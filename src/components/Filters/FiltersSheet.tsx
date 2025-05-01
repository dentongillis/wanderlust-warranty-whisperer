
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterCard } from './FilterCard';
import { useToast } from "@/hooks/use-toast";
import { getPageFilterConfig } from '@/utils/filterConfigs';

interface FiltersSheetProps {
  children: React.ReactNode;
}

export function FiltersSheet({ children }: FiltersSheetProps) {
  const location = useLocation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Filter states for all pages - each page will use only what it needs
  const [dateRange, setDateRange] = useState('last30days');
  const [model, setModel] = useState('all');
  const [dealer, setDealer] = useState('all');
  const [component, setComponent] = useState('all');
  const [floorplan, setFloorplan] = useState('all');
  const [componentMfr, setComponentMfr] = useState('all');
  const [region, setRegion] = useState('all');
  const [customerType, setCustomerType] = useState('all');
  const [ownerLength, setOwnerLength] = useState('all');
  const [timeRange, setTimeRange] = useState('6months');
  const [status, setStatus] = useState('all');
  
  // Reset filters when route changes
  useEffect(() => {
    // Reset to default values when page changes
    setDateRange('last30days');
    setModel('all');
    setDealer('all');
    setComponent('all');
    setFloorplan('all');
    setComponentMfr('all');
    setRegion('all');
    setCustomerType('all');
    setOwnerLength('all');
    setTimeRange('6months');
    setStatus('all');
  }, [location.pathname]);
  
  const filterStates = {
    dateRange, setDateRange,
    model, setModel,
    dealer, setDealer,
    component, setComponent,
    floorplan, setFloorplan,
    componentMfr, setComponentMfr,
    region, setRegion,
    customerType, setCustomerType,
    ownerLength, setOwnerLength,
    timeRange, setTimeRange,
    status, setStatus
  };

  const pageConfig = getPageFilterConfig(location.pathname, filterStates);
  
  const handleApplyFilters = () => {
    if (!pageConfig) return;
    
    toast({
      title: "Filters Applied",
      description: `Filters applied for ${pageConfig.title}`,
      duration: 3000,
    });
    
    setOpen(false);
    
    // Generate a summary of the active filters
    const activeFilters = pageConfig.filters
      .filter(filter => filter.value && filter.value !== 'all' && filter.value !== '')
      .map(filter => `${filter.label}: ${filter.options.find(o => o.value === filter.value)?.label}`);
    
    console.log(`Applied filters for ${pageConfig.id}:`, activeFilters.length > 0 ? activeFilters : "No active filters");
  };
  
  const handleResetFilters = () => {
    if (!pageConfig) return;
    
    // Reset only the filters for the current page
    pageConfig.filters.forEach(filter => {
      if (filter.onChange && typeof filter.onChange === 'function') {
        const defaultValue = filter.label.includes('Date') ? 'last30days' : 'all';
        filter.onChange(defaultValue);
      }
    });
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values",
      duration: 2000,
    });
  };
  
  if (!pageConfig) {
    return null; // Don't render anything if no filters for this page
  }
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{pageConfig.title}</SheetTitle>
          <SheetDescription>
            {pageConfig.description}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <FilterCard 
            filters={pageConfig.filters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
