
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterCard } from './FilterCard';

interface FiltersSheetProps {
  children: React.ReactNode;
}

const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisYear', label: 'This Year' }
];

const modelOptions = [
  { value: 'all', label: 'All Models' },
  { value: 'skyline-5000', label: 'Skyline 5000' },
  { value: 'pathfinder-x', label: 'Pathfinder X' },
  { value: 'venture-elite', label: 'Venture Elite' },
  { value: 'nomad-trail', label: 'Nomad Trail' }
];

const dealerOptions = [
  { value: 'all', label: 'All Dealers' },
  { value: 'adventure-rv', label: 'Adventure RV' },
  { value: 'highway-haven', label: 'Highway Haven' },
  { value: 'mountain-motors', label: 'Mountain Motors' },
  { value: 'cross-country', label: 'Cross Country RVs' }
];

const componentOptions = [
  { value: 'all', label: 'All Components' },
  { value: 'engine', label: 'Engine' },
  { value: 'transmission', label: 'Transmission' },
  { value: 'electrical', label: 'Electrical System' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'chassis', label: 'Chassis' }
];

export function FiltersSheet({ children }: FiltersSheetProps) {
  const [dateRange, setDateRange] = useState('last30days');
  const [model, setModel] = useState('all');
  const [dealer, setDealer] = useState('all');
  const [component, setComponent] = useState('all');
  
  const filters = [
    {
      label: "Date Range",
      options: dateRangeOptions,
      value: dateRange,
      onChange: setDateRange
    },
    {
      label: "Model",
      options: modelOptions,
      value: model,
      onChange: setModel
    },
    {
      label: "Dealer",
      options: dealerOptions,
      value: dealer,
      onChange: setDealer
    },
    {
      label: "Component",
      options: componentOptions,
      value: component,
      onChange: setComponent
    }
  ];
  
  const handleApplyFilters = () => {
    console.log("Applied filters:", { dateRange, model, dealer, component });
    // Here we would typically update some global state or context
  };
  
  const handleResetFilters = () => {
    setDateRange('last30days');
    setModel('all');
    setDealer('all');
    setComponent('all');
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter dashboard data by various criteria
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <FilterCard 
            title="Dashboard Filters" 
            filters={filters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
