
import { FilterOption } from '../components/Filters/FilterCard';

// Shared filter options that can be reused across pages
export const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisYear', label: 'This Year' }
];

export const modelOptions = [
  { value: 'all', label: 'All Models' },
  { value: 'freedom-deluxe', label: 'Freedom Deluxe' },
  { value: 'traveler-xl', label: 'Traveler XL' },
  { value: 'voyager-elite', label: 'Voyager Elite' },
  { value: 'expedition', label: 'Expedition' },
  { value: 'skyline-5000', label: 'Skyline 5000' },
  { value: 'pathfinder-x', label: 'Pathfinder X' },
  { value: 'venture-elite', label: 'Venture Elite' },
  { value: 'nomad-trail', label: 'Nomad Trail' },
];

export const dealerOptions = [
  { value: 'all', label: 'All Dealers' },
  { value: 'camping-world', label: 'Camping World' },
  { value: 'rv-one', label: 'RV One Superstores' },
  { value: 'lazydays', label: 'Lazydays' },
  { value: 'general-rv', label: 'General RV' },
  { value: 'adventure-rv', label: 'Adventure RV' },
  { value: 'highway-haven', label: 'Highway Haven' },
  { value: 'mountain-motors', label: 'Mountain Motors' },
  { value: 'cross-country', label: 'Cross Country RVs' }
];

export const componentOptions = [
  { value: 'all', label: 'All Components' },
  { value: 'air-conditioner', label: 'Air Conditioner' },
  { value: 'slide-mechanism', label: 'Slide Mechanism' },
  { value: 'refrigerator', label: 'Refrigerator' },
  { value: 'roof-system', label: 'Roof System' },
  { value: 'engine', label: 'Engine' },
  { value: 'transmission', label: 'Transmission' },
  { value: 'electrical', label: 'Electrical System' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'chassis', label: 'Chassis' },
  { value: 'hvac', label: 'HVAC System' },
  { value: 'water-heater', label: 'Water Heater' }
];

export const floorplanOptions = [
  { value: 'all', label: 'All Floorplans' },
  { value: 'fp-3200', label: '3200' },
  { value: 'fp-2800', label: '2800' },
  { value: 'fp-2500', label: '2500' },
  { value: 'fp-3600', label: '3600' }
];

export const componentMfrOptions = [
  { value: 'all', label: 'All Manufacturers' },
  { value: 'dometic', label: 'Dometic' },
  { value: 'lippert', label: 'Lippert' },
  { value: 'furrion', label: 'Furrion' },
  { value: 'carefree', label: 'Carefree' }
];

export const customerTypeOptions = [
  { value: '', label: 'All Customers' },
  { value: 'private', label: 'Private Owner' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'rental', label: 'Rental Fleet' }
];

export const ownerLengthOptions = [
  { value: '', label: 'All Ownership Lengths' },
  { value: 'new', label: 'New (0-1 year)' },
  { value: 'experienced', label: 'Experienced (1-3 years)' },
  { value: 'veteran', label: 'Veteran (3+ years)' },
  { value: 'second', label: 'Second Owner' }
];

// Define page-specific filter configurations
export interface PageFilterConfig {
  id: string;
  title: string;
  description: string;
  filters: FilterOption[];
}

export const getPageFilterConfig = (pathname: string, filterStates: Record<string, any>): PageFilterConfig | null => {
  const configs: Record<string, PageFilterConfig> = {
    '/': {
      id: 'dashboard',
      title: 'Dashboard Filters',
      description: 'Filter dashboard data to focus on specific insights',
      filters: [
        {
          label: "Date Range",
          options: dateRangeOptions,
          value: filterStates.dateRange || 'last30days',
          onChange: filterStates.setDateRange
        },
        {
          label: "Model",
          options: modelOptions,
          value: filterStates.model || 'all',
          onChange: filterStates.setModel
        },
        {
          label: "Dealer",
          options: dealerOptions,
          value: filterStates.dealer || 'all',
          onChange: filterStates.setDealer
        },
        {
          label: "Component",
          options: componentOptions,
          value: filterStates.component || 'all',
          onChange: filterStates.setComponent
        }
      ]
    },
    '/root-cause': {
      id: 'root-cause',
      title: 'Root Cause Analysis Filters',
      description: 'Filter root cause data by model, floorplan and more',
      filters: [
        {
          label: "Model",
          options: modelOptions,
          value: filterStates.model || '',
          onChange: filterStates.setModel
        },
        {
          label: "Floorplan",
          options: floorplanOptions,
          value: filterStates.floorplan || '',
          onChange: filterStates.setFloorplan
        },
        {
          label: "Component Manufacturer",
          options: componentMfrOptions,
          value: filterStates.componentMfr || '',
          onChange: filterStates.setComponentMfr
        },
        {
          label: "Dealer",
          options: dealerOptions,
          value: filterStates.dealer || '',
          onChange: filterStates.setDealer
        }
      ]
    },
    '/predictive': {
      id: 'predictive',
      title: 'Predictive Analytics Filters',
      description: 'Filter predictive data to focus on specific forecasts',
      filters: [
        {
          label: "Model",
          options: modelOptions,
          value: filterStates.model || 'all',
          onChange: filterStates.setModel
        },
        {
          label: "Component",
          options: componentOptions,
          value: filterStates.component || 'all',
          onChange: filterStates.setComponent
        },
        {
          label: "Time Range",
          options: [
            { value: '3months', label: '3 Months' },
            { value: '6months', label: '6 Months' },
            { value: '12months', label: '12 Months' },
          ],
          value: filterStates.timeRange || '6months',
          onChange: filterStates.setTimeRange
        }
      ]
    },
    '/dealer-performance': {
      id: 'dealer-performance',
      title: 'Dealer Performance Filters',
      description: 'Filter dealer performance metrics by region and more',
      filters: [
        {
          label: "Dealer",
          options: dealerOptions,
          value: filterStates.dealer || 'all',
          onChange: filterStates.setDealer
        },
        {
          label: "Region",
          options: [
            { value: 'all', label: 'All Regions' },
            { value: 'northeast', label: 'Northeast' },
            { value: 'southeast', label: 'Southeast' },
            { value: 'midwest', label: 'Midwest' },
            { value: 'southwest', label: 'Southwest' },
            { value: 'west', label: 'West' },
          ],
          value: filterStates.region || 'all',
          onChange: filterStates.setRegion
        },
        {
          label: "Date Range",
          options: dateRangeOptions,
          value: filterStates.dateRange || 'last30days',
          onChange: filterStates.setDateRange
        }
      ]
    },
    '/customer-impact': {
      id: 'customer-impact',
      title: 'Customer Impact Filters',
      description: 'Filter customer impact data by customer segments',
      filters: [
        {
          label: "Customer Type",
          options: customerTypeOptions,
          value: filterStates.customerType || '',
          onChange: filterStates.setCustomerType
        },
        {
          label: "Owner Length",
          options: ownerLengthOptions,
          value: filterStates.ownerLength || '',
          onChange: filterStates.setOwnerLength
        },
        {
          label: "Date Range",
          options: [
            { value: 'last-30-days', label: 'Last 30 Days' },
            { value: 'last-90-days', label: 'Last 90 Days' },
            { value: 'last-6-months', label: 'Last 6 Months' },
            { value: 'last-12-months', label: 'Last 12 Months' },
          ],
          value: filterStates.dateRange || 'last-12-months',
          onChange: filterStates.setDateRange
        }
      ]
    },
    '/financial-impact': {
      id: 'financial-impact',
      title: 'Financial Impact Filters',
      description: 'Filter financial impact data by cost categories',
      filters: [
        {
          label: "Model",
          options: modelOptions,
          value: filterStates.model || '',
          onChange: filterStates.setModel
        },
        {
          label: "Component",
          options: componentOptions,
          value: filterStates.component || '',
          onChange: filterStates.setComponent
        },
        {
          label: "Dealer",
          options: dealerOptions,
          value: filterStates.dealer || '',
          onChange: filterStates.setDealer
        }
      ]
    },
    '/claims-report': {
      id: 'claims-report',
      title: 'Claims Report Filters',
      description: 'Filter detailed claims data by date and status',
      filters: [
        {
          label: "Date Range",
          options: dateRangeOptions,
          value: filterStates.dateRange || 'last30days',
          onChange: filterStates.setDateRange
        },
        {
          label: "Status",
          options: [
            { value: 'all', label: 'All Status' },
            { value: 'open', label: 'Open' },
            { value: 'closed', label: 'Closed' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ],
          value: filterStates.status || 'all',
          onChange: filterStates.setStatus
        },
        {
          label: "Model",
          options: modelOptions,
          value: filterStates.model || 'all',
          onChange: filterStates.setModel
        },
        {
          label: "Dealer",
          options: dealerOptions,
          value: filterStates.dealer || 'all',
          onChange: filterStates.setDealer
        }
      ]
    }
  };

  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return configs[normalizedPath] || null;
};

export interface FilterState {
  [key: string]: string | null;
}

export interface FilterActions {
  [key: string]: (value: string) => void;
}
