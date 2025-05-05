
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

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
      return 'sortable hover:text-blue-600 dark:hover:text-blue-400';
    }
    return sortConfig.key === name 
      ? `sorted-${sortConfig.direction} text-blue-600 dark:text-blue-400 sortable` 
      : 'sortable hover:text-blue-600 dark:hover:text-blue-400';
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
      <div className="px-3 flex items-center justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs h-6 max-w-full"
          />
        </div>
      </div>
      <div className="h-full overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className={getClassNamesFor('date')} onClick={() => requestSort('date')}>
                Date
              </TableHead>
              <TableHead className={getClassNamesFor('claimId')} onClick={() => requestSort('claimId')}>
                Claim ID
              </TableHead>
              <TableHead className={getClassNamesFor('model')} onClick={() => requestSort('model')}>
                Model
              </TableHead>
              <TableHead className={getClassNamesFor('dealer')} onClick={() => requestSort('dealer')}>
                Dealer
              </TableHead>
              <TableHead className={`text-center ${getClassNamesFor('status')}`} onClick={() => requestSort('status')}>
                Status
              </TableHead>
              <TableHead className={getClassNamesFor('total')} onClick={() => requestSort('total')}>
                Total
              </TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claimsData.map((claim, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="text-gray-600 dark:text-gray-300 text-xs">{claim.date}</TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-200 text-xs">{claim.claimId}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 text-xs">{claim.model}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 text-xs">{claim.dealer}</TableCell>
                <TableCell className="text-center">
                  {claim.status === 'approved' && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 text-[8px] px-1 py-0">
                      Approved
                    </Badge>
                  )}
                  {claim.status === 'pending' && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800 text-[8px] px-1 py-0">
                      Pending
                    </Badge>
                  )}
                  {claim.status === 'denied' && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 text-[8px] px-1 py-0">
                      Denied
                    </Badge>
                  )}
                  {claim.status === 'in-progress' && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 text-[8px] px-1 py-0">
                      In Progress
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-200 text-xs">{claim.total}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 dark:text-blue-400 h-6 px-1 py-0 text-xs"
                    onClick={() => handleViewDetails(claim)}
                  >
                    <Eye size={12} className="mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Claim Details Sheet - Redesigned to be more compact */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent side="bottom" className="h-[50vh] p-0 rounded-t-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-base font-semibold">{selectedClaim?.claimId} - {selectedClaim?.model}</h3>
              <p className="text-xs text-gray-500">Filed on {selectedClaim?.date}</p>
            </div>
            <SheetClose className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </SheetClose>
          </div>
          
          <div className="p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Claim Details</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Issue</span>
                      <p className="text-xs">{selectedClaim?.issue}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Warranty</span>
                      <p className="text-xs">{selectedClaim?.warranty}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Status</span>
                      <div className="mt-1">
                        {selectedClaim?.status === 'approved' && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                            Approved
                          </Badge>
                        )}
                        {selectedClaim?.status === 'pending' && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                            Pending
                          </Badge>
                        )}
                        {selectedClaim?.status === 'denied' && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs">
                            Denied
                          </Badge>
                        )}
                        {selectedClaim?.status === 'in-progress' && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Total Amount</span>
                      <p className="text-xs font-semibold">{selectedClaim?.total}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Dealer Information</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Name</span>
                      <p className="text-xs">{selectedClaim?.dealer}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Address</span>
                      <p className="text-xs">{selectedClaim?.dealerAddress}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Contact</span>
                      <p className="text-xs">{selectedClaim?.dealerContact}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Customer Information</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Name</span>
                      <p className="text-xs">{selectedClaim?.customerName}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Email</span>
                      <p className="text-xs">{selectedClaim?.customerEmail}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Phone</span>
                      <p className="text-xs">{selectedClaim?.customerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                onClick={() => {
                  setIsDetailOpen(false);
                  navigate('/claims-report');
                }}
              >
                View Full Claim Report
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
