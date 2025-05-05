
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

// Sample data - would be replaced with real data from API
const recentClaimsData = [
  { 
    id: 'CLM-1208',
    customer: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '(555) 123-4567',
    model: 'Freedom Deluxe 3200',
    issue: 'Water damage to ceiling panel',
    date: '2025-04-10',
    status: 'pending',
    amount: '$1,250',
    dealer: 'Camping World',
    dealerAddress: '123 RV Parkway, Denver, CO',
    dealerContact: '(303) 555-9876',
    warranty: 'Premium Coverage'
  },
  { 
    id: 'CLM-1207',
    customer: 'Sarah Smith',
    customerEmail: 'sarah.smith@example.com',
    customerPhone: '(555) 234-5678',
    model: 'Traveler XL 2800',
    issue: 'Electrical system failure',
    date: '2025-04-09',
    status: 'approved',
    amount: '$2,800',
    dealer: 'RV One Superstores',
    dealerAddress: '456 Highway Ave, Tampa, FL',
    dealerContact: '(813) 555-4321',
    warranty: 'Standard Coverage'
  },
  { 
    id: 'CLM-1206',
    customer: 'Michael Johnson',
    customerEmail: 'michael.j@example.com',
    customerPhone: '(555) 345-6789',
    model: 'Nomad 1800',
    issue: 'Refrigerator not cooling',
    date: '2025-04-08',
    status: 'in-progress',
    amount: '$680',
    dealer: 'Lazydays RV',
    dealerAddress: '789 Main St, Tucson, AZ',
    dealerContact: '(520) 555-7890',
    warranty: 'Extended Coverage'
  },
  { 
    id: 'CLM-1205',
    customer: 'Emily Brown',
    customerEmail: 'emily.b@example.com',
    customerPhone: '(555) 456-7890',
    model: 'Expedition 3600',
    issue: 'Slide out mechanism broken',
    date: '2025-04-07',
    status: 'completed',
    amount: '$3,450',
    dealer: 'General RV',
    dealerAddress: '321 RV Center Blvd, Wixom, MI',
    dealerContact: '(248) 555-6543',
    warranty: 'Comprehensive Coverage'
  },
  { 
    id: 'CLM-1204',
    customer: 'Robert Wilson',
    customerEmail: 'robert.w@example.com',
    customerPhone: '(555) 567-8901',
    model: 'Voyager Elite 2500',
    issue: 'HVAC system repair',
    date: '2025-04-06',
    status: 'declined',
    amount: '$1,980',
    dealer: 'Camping World',
    dealerAddress: '654 Dealership Row, Orlando, FL',
    dealerContact: '(407) 555-2109',
    warranty: 'Limited Coverage'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-indigo-100 text-indigo-800';
    case 'declined':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const RecentClaims: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(recentClaimsData);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = recentClaimsData.filter(claim => 
      claim.id.toLowerCase().includes(term.toLowerCase()) ||
      claim.customer.toLowerCase().includes(term.toLowerCase()) ||
      claim.model.toLowerCase().includes(term.toLowerCase()) ||
      claim.issue.toLowerCase().includes(term.toLowerCase()) ||
      claim.status.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredData(filtered);
  };

  // Handle column sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    const sortedItems = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredData(sortedItems);
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return 'cursor-pointer';
    }
    return sortConfig.key === name 
      ? `cursor-pointer sorted-${sortConfig.direction}` 
      : 'cursor-pointer';
  };

  const handleViewDetails = (claim: any) => {
    setSelectedClaim(claim);
    setIsDetailOpen(true);
  };

  const navigateToClaimsReport = () => {
    navigate('/claims-report');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Claims</CardTitle>
        <Button variant="outline" size="sm" onClick={navigateToClaimsReport}>View All Claims</Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-3">
          <Input
            placeholder="Search claims by ID, customer, model, or issue..."
            value={searchTerm}
            onChange={handleSearch}
            className="text-xs"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('id')}`}
                  onClick={() => requestSort('id')}
                >
                  Claim ID
                </th>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('customer')}`}
                  onClick={() => requestSort('customer')}
                >
                  Customer
                </th>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('model')}`}
                  onClick={() => requestSort('model')}
                >
                  Model
                </th>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('issue')}`}
                  onClick={() => requestSort('issue')}
                >
                  Issue
                </th>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('date')}`}
                  onClick={() => requestSort('date')}
                >
                  Date
                </th>
                <th 
                  className={`text-center px-3 py-2 ${getClassNamesFor('status')}`}
                  onClick={() => requestSort('status')}
                >
                  Status
                </th>
                <th 
                  className={`text-left px-3 py-2 ${getClassNamesFor('amount')}`}
                  onClick={() => requestSort('amount')}
                >
                  Amount
                </th>
                <th className="text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((claim) => (
                <tr key={claim.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-3 py-2 font-medium">{claim.id}</td>
                  <td className="px-3 py-2">{claim.customer}</td>
                  <td className="px-3 py-2">{claim.model}</td>
                  <td className="px-3 py-2 max-w-[200px] truncate">{claim.issue}</td>
                  <td className="px-3 py-2">{claim.date}</td>
                  <td className="px-3 py-2 text-center">
                    <Badge className={`${getStatusColor(claim.status)} text-[10px]`} variant="outline">
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">{claim.amount}</td>
                  <td className="px-3 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(claim)}
                    >
                      <Eye size={16} className="mr-1" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Claim Details Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-xl">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle>{selectedClaim?.id} - {selectedClaim?.model}</SheetTitle>
            <SheetDescription>
              Filed on {selectedClaim?.date}
            </SheetDescription>
          </SheetHeader>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Claim Details</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-2">
                  <p className="text-xs"><span className="font-medium">Issue:</span> {selectedClaim?.issue}</p>
                  <p className="text-xs"><span className="font-medium">Warranty:</span> {selectedClaim?.warranty}</p>
                  <p className="text-xs"><span className="font-medium">Status:</span> <Badge 
                    variant="outline" 
                    className={`ml-1 ${getStatusColor(selectedClaim?.status)}`}
                  >
                    {selectedClaim?.status.charAt(0).toUpperCase() + (selectedClaim?.status.slice(1) || '')}
                  </Badge></p>
                  <p className="text-xs"><span className="font-medium">Total Amount:</span> {selectedClaim?.amount}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Dealer Information</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-2">
                  <p className="text-xs"><span className="font-medium">Name:</span> {selectedClaim?.dealer}</p>
                  <p className="text-xs"><span className="font-medium">Address:</span> {selectedClaim?.dealerAddress}</p>
                  <p className="text-xs"><span className="font-medium">Contact:</span> {selectedClaim?.dealerContact}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Customer Information</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-2">
                  <p className="text-xs"><span className="font-medium">Name:</span> {selectedClaim?.customer}</p>
                  <p className="text-xs"><span className="font-medium">Email:</span> {selectedClaim?.customerEmail}</p>
                  <p className="text-xs"><span className="font-medium">Phone:</span> {selectedClaim?.customerPhone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button size="sm" onClick={navigateToClaimsReport}>
                View Full Claim Report
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
};
