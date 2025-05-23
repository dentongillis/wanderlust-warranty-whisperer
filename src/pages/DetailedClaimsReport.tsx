
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, Eye, ChevronDown, ChevronRight, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const claimsData = [
  {
    id: 'CLM-1208',
    model: 'Freedom Deluxe 3200',
    floorplan: '3200',
    component: 'Roof Seal',
    dealer: 'Camping World Denver',
    status: 'Pending',
    claimDate: '2025-04-10',
    approvalDate: '',
    daysToResolution: '5',
    cost: '$1,250.00'
  },
  {
    id: 'CLM-1207',
    model: 'Traveler XL 2800',
    floorplan: '2800',
    component: 'Inverter',
    dealer: 'RV One Superstores',
    status: 'Approved',
    claimDate: '2025-04-09',
    approvalDate: '2025-04-12',
    daysToResolution: '3',
    cost: '$2,800.00'
  },
  {
    id: 'CLM-1206',
    model: 'Nomad 1800',
    floorplan: '1800',
    component: 'Refrigerator',
    dealer: 'Lazydays Tampa',
    status: 'In Progress',
    claimDate: '2025-04-08',
    approvalDate: '',
    daysToResolution: '7',
    cost: '$680.00'
  },
  {
    id: 'CLM-1205',
    model: 'Expedition 3600',
    floorplan: '3600',
    component: 'Slide Mechanism',
    dealer: 'General RV Wixom',
    status: 'Completed',
    claimDate: '2025-04-07',
    approvalDate: '2025-04-09',
    daysToResolution: '6',
    cost: '$3,450.00'
  },
  {
    id: 'CLM-1204',
    model: 'Voyager Elite 2500',
    floorplan: '2500',
    component: 'HVAC System',
    dealer: 'Camping World Denver',
    status: 'Declined',
    claimDate: '2025-04-06',
    approvalDate: '2025-04-10',
    daysToResolution: '4',
    cost: '$1,980.00'
  },
  {
    id: 'CLM-1203',
    model: 'Freedom Deluxe 3200',
    floorplan: '3200',
    component: 'Water Pump',
    dealer: 'Motor Home Specialist',
    status: 'Approved',
    claimDate: '2025-04-05',
    approvalDate: '2025-04-08',
    daysToResolution: '3',
    cost: '$520.00'
  },
  {
    id: 'CLM-1202',
    model: 'Traveler XL 2800',
    floorplan: '2800',
    component: 'Awning',
    dealer: 'Lazydays Tampa',
    status: 'Completed',
    claimDate: '2025-04-04',
    approvalDate: '2025-04-07',
    daysToResolution: '8',
    cost: '$1,150.00'
  },
  {
    id: 'CLM-1201',
    model: 'Expedition 3600',
    floorplan: '3600',
    component: 'Generator',
    dealer: 'RV One Superstores',
    status: 'Pending',
    claimDate: '2025-04-03',
    approvalDate: '',
    daysToResolution: '10',
    cost: '$4,250.00'
  },
  {
    id: 'CLM-1200',
    model: 'Nomad 1800',
    floorplan: '1800',
    component: 'Entertainment System',
    dealer: 'Bill Plemmons RV',
    status: 'Approved',
    claimDate: '2025-04-02',
    approvalDate: '2025-04-05',
    daysToResolution: '3',
    cost: '$850.00'
  },
  {
    id: 'CLM-1199',
    model: 'Voyager Elite 2500',
    floorplan: '2500',
    component: 'Leveling System',
    dealer: 'General RV Wixom',
    status: 'In Progress',
    claimDate: '2025-04-01',
    approvalDate: '',
    daysToResolution: '12',
    cost: '$1,780.00'
  },
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'in progress':
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case 'completed':
      return <Badge className="bg-indigo-100 text-indigo-800">Completed</Badge>;
    case 'declined':
      return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
};

const DetailedClaimsReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  
  const handleViewDetails = (claimId: string) => {
    setSelectedClaim(selectedClaim === claimId ? null : claimId);
  };

  const handleExportCSV = () => {
    console.log("Exporting data to CSV...");
  };

  const filteredData = claimsData.filter((claim) => {
    return (
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.dealer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <DashboardLayout
      title="Detailed Claims Report"
      description="Comprehensive list of all warranty claims with detailed information and export options"
    >
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Claims Database</CardTitle>
            <Button onClick={handleExportCSV} className="flex items-center gap-2 w-full sm:w-auto">
              <Download size={16} />
              Export to CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Search claims by ID, model, component or dealer..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-sm"
                />
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Claim ID</TableHead>
                        <TableHead className="hidden sm:table-cell">Model</TableHead>
                        <TableHead className="hidden lg:table-cell">Floorplan</TableHead>
                        <TableHead>Component</TableHead>
                        <TableHead className="hidden md:table-cell">Dealer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Claim Date</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Cost</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((claim) => (
                        <React.Fragment key={claim.id}>
                          <TableRow>
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell className="hidden sm:table-cell">{claim.model}</TableCell>
                            <TableCell className="hidden lg:table-cell">{claim.floorplan}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{claim.component}</TableCell>
                            <TableCell className="hidden md:table-cell">{claim.dealer}</TableCell>
                            <TableCell>{getStatusBadge(claim.status)}</TableCell>
                            <TableCell className="hidden sm:table-cell">{claim.claimDate}</TableCell>
                            <TableCell className="text-right hidden sm:table-cell">{claim.cost}</TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewDetails(claim.id)}
                              >
                                {selectedClaim === claim.id ? (
                                  <ChevronDown size={16} className="mr-1" />
                                ) : (
                                  <ChevronRight size={16} className="mr-1" />
                                )}
                                <span className="hidden sm:inline">Details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          {selectedClaim === claim.id && (
                            <TableRow className="bg-muted/50">
                              <TableCell colSpan={9} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Claim Details</h4>
                                    <p className="text-sm mb-1"><span className="font-medium">Date Filed:</span> {claim.claimDate}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Approval Date:</span> {claim.approvalDate || 'Pending'}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Days to Resolution:</span> {claim.daysToResolution}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Total Cost:</span> {claim.cost}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">RV Information</h4>
                                    <p className="text-sm mb-1"><span className="font-medium">Model:</span> {claim.model}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Floorplan:</span> {claim.floorplan}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Component:</span> {claim.component}</p>
                                    <p className="text-sm mb-1"><span className="font-medium">Serial #:</span> RV-{claim.id.substring(4)}-XYZ</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Status</h4>
                                    <div className="flex items-center mb-2">
                                      {claim.status === 'Approved' ? (
                                        <Check className="h-4 w-4 mr-2 text-green-600" />
                                      ) : claim.status === 'Declined' ? (
                                        <X className="h-4 w-4 mr-2 text-red-600" />
                                      ) : (
                                        <div className="h-4 w-4 rounded-full bg-yellow-400 mr-2" />
                                      )}
                                      <span>{claim.status}</span>
                                    </div>
                                    <div className="mt-4 space-x-2">
                                      <Button size="sm">View Full Details</Button>
                                      <Button size="sm" variant="outline">Download PDF</Button>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                  Showing <span className="font-medium">{Math.min(filteredData.length, 10)}</span> of{" "}
                  <span className="font-medium">{filteredData.length}</span> claims
                </p>
                <div className="flex items-center space-x-2 order-1 sm:order-2">
                  <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DetailedClaimsReport;
