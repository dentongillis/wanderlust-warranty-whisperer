
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCcw } from 'lucide-react';

interface FilterOption {
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
  title = "Filters", 
  filters, 
  onApply, 
  onReset 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center">
          <Filter className="mr-2" size={18} />
          {title}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
          >
            <RefreshCcw size={14} className="mr-1" /> Reset
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filters.map((filter, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">
                {filter.label}
              </label>
              <Select value={filter.value} onValueChange={filter.onChange}>
                <SelectTrigger>
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
      </CardContent>
    </Card>
  );
};
