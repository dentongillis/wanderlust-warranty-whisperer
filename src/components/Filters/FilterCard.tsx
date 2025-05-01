
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

export interface FilterOption {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

interface FilterCardProps {
  title?: string;
  filters: FilterOption[];
  onApply?: () => void;
  onReset?: () => void;
}

export const FilterCard: React.FC<FilterCardProps> = ({ 
  title, 
  filters, 
  onApply = () => {}, 
  onReset = () => {} 
}) => {
  return (
    <div className="space-y-6">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      
      <div className="grid grid-cols-1 gap-4">
        {filters.map((filter, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filter.label}
            </label>
            <Select 
              value={filter.value || 'all'} 
              onValueChange={filter.onChange}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder={`Select ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      
      <div className="flex gap-3 pt-2">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex-1 border-gray-200 dark:border-gray-700"
        >
          <RefreshCcw size={14} className="mr-2" /> Reset Filters
        </Button>
        <Button 
          variant="default" 
          onClick={onApply}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
