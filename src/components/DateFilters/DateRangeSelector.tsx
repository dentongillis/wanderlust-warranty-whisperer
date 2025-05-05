
import React, { useState } from 'react';
import { format, subDays, subMonths, subYears, isAfter, isBefore, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type DateRangeOption = 
  | 'today'
  | 'last7days' 
  | 'last4weeks'
  | 'last3months'
  | 'last12months'
  | 'monthtodate'
  | 'quartertodate'
  | 'yeartodate'
  | 'alltime'
  | 'custom';

interface DateRangeDisplayProps {
  startDate: Date;
  endDate: Date;
  onClick?: () => void;
}

interface DateRangeDropdownProps {
  value: DateRangeOption;
  onChange: (value: DateRangeOption) => void;
}

interface CustomDateRangeProps {
  startDate: Date;
  endDate: Date;
  onRangeChange: (start: Date, end: Date) => void;
  onApply: () => void;
  customRangeAlwaysVisible?: boolean;
}

const options: { value: DateRangeOption; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'last7days', label: 'Last 7 days' },
  { value: 'last4weeks', label: 'Last 4 weeks' },
  { value: 'last3months', label: 'Last 3 months' },
  { value: 'last12months', label: 'Last 12 months' },
  { value: 'monthtodate', label: 'Month to date' },
  { value: 'quartertodate', label: 'Quarter to date' },
  { value: 'yeartodate', label: 'Year to date' },
  { value: 'alltime', label: 'All time' },
  { value: 'custom', label: 'Custom date range' },
];

// Component to display the date range
const DateRangeDisplay = ({ startDate, endDate, onClick }: DateRangeDisplayProps) => {
  return (
    <div 
      className={cn(
        "flex items-center text-sm text-gray-700 dark:text-gray-300",
        onClick ? "cursor-pointer hover:text-gray-900" : ""
      )}
      onClick={onClick}
    >
      {format(startDate, 'MMM d, yyyy')} – {format(endDate, 'MMM d, yyyy')}
    </div>
  );
};

// Dropdown for date range selection
const DateRangeDropdown = ({ value, onChange }: DateRangeDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2 h-auto">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {options.find(option => option.value === value)?.label || 'Select range'}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange as (value: string) => void}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className="cursor-pointer">
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Custom date range popover with calendar selection
const CustomDateRange = ({ startDate, endDate, onRangeChange, onApply, customRangeAlwaysVisible }: CustomDateRangeProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (selecting === 'start') {
      setSelectedStartDate(date);
      setSelecting('end');
      if (isAfter(date, selectedEndDate)) {
        setSelectedEndDate(date);
      }
    } else {
      if (isBefore(date, selectedStartDate)) {
        setSelectedStartDate(date);
        setSelecting('end');
      } else {
        setSelectedEndDate(date);
        setSelecting('start');
        onRangeChange(selectedStartDate, date);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "border-dashed border-gray-300 dark:border-gray-600 h-9",
            customRangeAlwaysVisible ? "flex items-center" : ""
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="text-sm font-normal">
            {format(selectedStartDate, 'MMM dd, yyyy')} - {format(selectedEndDate, 'MMM dd, yyyy')}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">
              {selecting === 'start' ? 'Select start date' : 'Select end date'}
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs" 
              onClick={() => {
                onRangeChange(selectedStartDate, selectedEndDate);
                onApply();
              }}
            >
              Apply Range
            </Button>
          </div>
          <div className="flex gap-2 text-xs">
            <div 
              className={cn(
                "px-2 py-1 rounded cursor-pointer", 
                selecting === 'start' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}
              onClick={() => setSelecting('start')}
            >
              From: {format(selectedStartDate, 'MMM d, yyyy')}
            </div>
            <div 
              className={cn(
                "px-2 py-1 rounded cursor-pointer", 
                selecting === 'end' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}
              onClick={() => setSelecting('end')}
            >
              To: {format(selectedEndDate, 'MMM d, yyyy')}
            </div>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={selecting === 'start' ? selectedStartDate : selectedEndDate}
          onSelect={handleCalendarSelect}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

interface DateRangeSelectorProps {
  className?: string;
}

export const DateRangeSelector = ({ className }: DateRangeSelectorProps) => {
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('last7days');
  const [startDate, setStartDate] = useState<Date>(() => subDays(new Date(), 7));
  const [endDate, setEndDate] = useState<Date>(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Update date range based on selected option
  const updateDateRange = (option: DateRangeOption) => {
    const today = startOfDay(new Date());
    
    switch (option) {
      case 'today':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'last7days':
        setStartDate(subDays(today, 6));
        setEndDate(today);
        break;
      case 'last4weeks':
        setStartDate(subDays(today, 27));
        setEndDate(today);
        break;
      case 'last3months':
        setStartDate(subMonths(today, 3));
        setEndDate(today);
        break;
      case 'last12months':
        setStartDate(subMonths(today, 12));
        setEndDate(today);
        break;
      case 'monthtodate':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setEndDate(today);
        break;
      case 'quartertodate':
        const quarter = Math.floor(today.getMonth() / 3);
        setStartDate(new Date(today.getFullYear(), quarter * 3, 1));
        setEndDate(today);
        break;
      case 'yeartodate':
        setStartDate(new Date(today.getFullYear(), 0, 1));
        setEndDate(today);
        break;
      case 'alltime':
        setStartDate(subYears(today, 5)); // Arbitrary "all time" setting
        setEndDate(today);
        break;
      case 'custom':
        // Don't change dates, just open the calendar
        setIsCalendarOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDateRangeChange = (option: DateRangeOption) => {
    setDateRangeOption(option);
    updateDateRange(option);
  };

  const handleCustomDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    if (dateRangeOption !== 'custom') {
      setDateRangeOption('custom');
    }
  };

  const handleDateRangeClick = () => {
    setIsCalendarOpen(true);
  };

  const handleApplyCustomDate = () => {
    setIsCalendarOpen(false);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <DateRangeDropdown 
        value={dateRangeOption} 
        onChange={handleDateRangeChange} 
      />
      
      {/* Always show Custom Date Range button */}
      <CustomDateRange 
        startDate={startDate}
        endDate={endDate}
        onRangeChange={handleCustomDateChange}
        onApply={handleApplyCustomDate}
        customRangeAlwaysVisible={true}
      />
    </div>
  );
};
