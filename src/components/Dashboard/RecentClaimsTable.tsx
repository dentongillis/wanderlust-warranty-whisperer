
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

// Sample data - in a real app this would come from an API
const initialClaimsData = [
  { 
    date: '04/07/25',
    claimId: 'CLM-2567',
    model: 'Model I',
    dealer: 'Camping World',
    dealerAddress: '123 RV Way, Denver, CO 80202',
    dealerContact: '(303) 555-1234',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    customerPhone: '(720) 555-9876',
    issue: 'Water damage on ceiling panel',
    warranty: 'Premium - 5 Year',
    status: 'pending',
    total: '$1,742'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2566',
    model: 'Model Z Air',
    dealer: 'General RV',
    dealerAddress: '456 Highway Dr, Detroit, MI 48201',
    dealerContact: '(313) 555-4321',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '(248) 555-7890',
    issue: 'Electrical system malfunction',
    warranty: 'Standard - 3 Year',
    status: 'pending',
    total: '$1,401'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2565',
    model: 'Model G',
    dealer: "Pete's RV Center",
    dealerAddress: '789 Camper Lane, Burlington, VT 05401',
    dealerContact: '(802) 555-6543',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@example.com',
    customerPhone: '(802) 555-3210',
    issue: 'Slide mechanism failure',
    warranty: 'Premium - 5 Year',
    status: 'approved',
    total: '$1,525'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2564',
    model: 'Model Z',
    dealer: 'General RV',
    dealerAddress: '456 Highway Dr, Detroit, MI 48201',
    dealerContact: '(313) 555-4321',
    customerName: 'Emily Williams',
    customerEmail: 'emily.w@example.com',
    customerPhone: '(313) 555-9876',
    issue: 'HVAC not functioning properly',
    warranty: 'Extended - 4 Year',
    status: 'pending',
    total: '$2,343'
  },
  { 
    date: '04/06/25',
    claimId: 'CLM-2563',
    model: 'Model X',
    dealer: 'Lazydays Tampa',
    dealerAddress: '234 Sunny Blvd, Tampa, FL 33607',
    dealerContact: '(813) 555-7890',
    customerName: 'Robert Garcia',
    customerEmail: 'rob.garcia@example.com',
    customerPhone: '(813) 555-1234',
    issue: 'Generator failure',
    warranty: 'Standard - 3 Year',
    status: 'denied',
    total: '$1,890'
  },
  { 
    date: '04/06/25',
    claimId: 'CLM-2562',
    model: 'Model T',
    dealer: 'Motor Home Specialist',
    dealerAddress: '567 Motorhome Pkwy, Alvarado, TX 76009',
    dealerContact: '(817) 555-8765',
    customerName: 'Jennifer Martinez',
    customerEmail: 'j.martinez@example.com',
    customerPhone: '(817) 555-4321',
    issue: 'Refrigerator cooling issue',
    warranty: 'Premium - 5 Year',
    status: 'in-progress',
    total: '$2,156'
  },
  { 
    date: '04/05/25',
    claimId: 'CLM-2561',
    model: 'Model I',
    dealer: 'Bill Plemmons RV',
    dealerAddress: '891 RV Drive, Rural Hall, NC 27045',
    dealerContact: '(336) 555-9012',
    customerName: 'David Wilson',
    customerEmail: 'dwilson@example.com',
    customerPhone: '(336) 555-5678',
    issue: 'Plumbing leak under sink',
    warranty: 'Extended - 4 Year',
    status: 'approved',
    total: '$1,450'
  }
];

export const RecentClaimsTable: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [claimsData, setClaimsData] = useState(initialClaimsData);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sort data when sort config changes
  useEffect(() => {
    if (sortConfig !== null) {
      const sortedItems = [...claimsData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setClaimsData(sortedItems);
    }
  }, [sortConfig]);

  // Filter data based on search term
  useEffect(() => {
    const filteredData = initialClaimsData.filter(claim => 
      claim.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.dealer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setClaimsData(filteredData);
  }, [searchTerm]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
    <>
      <div className="mb-2 px-2">
        <Input
          placeholder="Search claims by ID, model, dealer, status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-xs"
        />
      </div>
      <ScrollArea className="h-full">
        <div className="min-w-full">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  className={`px-2 py-2 text-left font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('date')}`}
                  onClick={() => requestSort('date')}
                >
                  Date
                </th>
                <th 
                  className={`px-2 py-2 text-left font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('claimId')}`}
                  onClick={() => requestSort('claimId')}
                >
                  Claim ID
                </th>
                <th 
                  className={`px-2 py-2 text-left font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('model')}`}
                  onClick={() => requestSort('model')}
                >
                  Model
                </th>
                <th 
                  className={`px-2 py-2 text-left font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('dealer')}`}
                  onClick={() => requestSort('dealer')}
                >
                  Dealer
                </th>
                <th 
                  className={`px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('status')}`}
                  onClick={() => requestSort('status')}
                >
                  Status
                </th>
                <th 
                  className={`px-2 py-2 text-left font-medium text-gray-600 dark:text-gray-300 ${getClassNamesFor('total')}`}
                  onClick={() => requestSort('total')}
                >
                  Total
                </th>
                <th className="px-2 py-2 text-right font-medium text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {claimsData.map((claim, index) => (
                <tr key={index} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-2 py-1.5 text-gray-600 dark:text-gray-300">{claim.date}</td>
                  <td className="px-2 py-1.5 font-medium text-gray-800 dark:text-gray-200">{claim.claimId}</td>
                  <td className="px-2 py-1.5 text-gray-600 dark:text-gray-300">{claim.model}</td>
                  <td className="px-2 py-1.5 text-gray-600 dark:text-gray-300">{claim.dealer}</td>
                  <td className="px-2 py-1.5 text-center">
                    {claim.status === 'approved' && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 text-[10px] px-1 py-0">
                        Approved
                      </Badge>
                    )}
                    {claim.status === 'pending' && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800 text-[10px] px-1 py-0">
                        Pending
                      </Badge>
                    )}
                    {claim.status === 'denied' && (
                      <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 text-[10px] px-1 py-0">
                        Denied
                      </Badge>
                    )}
                    {claim.status === 'in-progress' && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 text-[10px] px-1 py-0">
                        In Progress
                      </Badge>
                    )}
                  </td>
                  <td className="px-2 py-1.5 font-medium text-gray-800 dark:text-gray-200">{claim.total}</td>
                  <td className="px-2 py-1.5 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 dark:text-blue-400 h-6 px-1 py-0 text-xs"
                      onClick={() => handleViewDetails(claim)}
                    >
                      <Eye size={12} className="mr-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>

      {/* Claim Details Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-xl">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle>{selectedClaim?.claimId} - {selectedClaim?.model}</SheetTitle>
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
                    className={`ml-1 ${selectedClaim?.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedClaim?.status === 'denied' 
                        ? 'bg-red-100 text-red-800'
                        : selectedClaim?.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {selectedClaim?.status.charAt(0).toUpperCase() + selectedClaim?.status.slice(1)}
                  </Badge></p>
                  <p className="text-xs"><span className="font-medium">Total Amount:</span> {selectedClaim?.total}</p>
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
                  <p className="text-xs"><span className="font-medium">Name:</span> {selectedClaim?.customerName}</p>
                  <p className="text-xs"><span className="font-medium">Email:</span> {selectedClaim?.customerEmail}</p>
                  <p className="text-xs"><span className="font-medium">Phone:</span> {selectedClaim?.customerPhone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button size="sm" onClick={() => navigate('/claims-report')}>
                View Full Claim Report
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
