
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { FilterCard } from '@/components/Filters/FilterCard';
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
import { 
  Download,
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  X 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Sample data for claims
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
  // Filter state
  const [model, setModel] = useState('');
  const [floorplan, setFloorplan] = useState('');
  const [dealer, setDealer] = useState('');
  const [component, setComponent] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState('last-30-days');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Selected claim for detail view (null means no claim is selected)
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  const handleApplyFilters = () => {
    console.log("Applying filters:", { model, floorplan, dealer, component, status, dateRange });
    // In a real app, this would update the table with filtered data
  };

  const handleResetFilters = () => {
    setModel('');
    setFloorplan('');
    setDealer('');
    setComponent('');
    setStatus('');
    setDateRange('last-30-days');
  };
  
  const handleExportCSV = () => {
    console.log("Exporting data to CSV...");
    // In a real app, this would generate a CSV export
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };
  
  const handleViewDetails = (claimId: string) => {
    setSelectedClaim(selectedClaim === claimId ? null : claimId);
  };

  // Filter data based on search term
  const filteredData = claimsData.filter((claim) => {
    return (
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.dealer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detailed Claims Report</h1>
          <p className="text-muted-foreground">
            Comprehensive list of all warranty claims with detailed information and export options.
          </p>
        </div>

        <FilterCard 
          filters={[
            {
              label: "Model",
              options: [
                { value: "freedom-deluxe", label: "Freedom Deluxe" },
                { value: "traveler-xl", label: "Traveler XL" },
                { value: "voyager-elite", label: "Voyager Elite" },
                { value: "expedition", label: "Expedition" },
              ],
              value: model,
              onChange: setModel
            },
            {
              label: "Floorplan",
              options: [
                { value: "3200", label: "3200" },
                { value: "2800", label: "2800" },
                { value: "2500", label: "2500" },
                { value: "3600", label: "3600" },
                { value: "1800", label: "1800" },
              ],
              value: floorplan,
              onChange: setFloorplan
            },
            {
              label: "Dealer",
              options: [
                { value: "camping-world", label: "Camping World" },
                { value: "rv-one", label: "RV One Superstores" },
                { value: "lazydays", label: "Lazydays" },
                { value: "general-rv", label: "General RV" },
              ],
              value: dealer,
              onChange: setDealer
            },
            {
              label: "Component",
              options: [
                { value: "roof-seal", label: "Roof Seal" },
                { value: "inverter", label: "Inverter" },
                { value: "refrigerator", label: "Refrigerator" },
                { value: "slide", label: "Slide Mechanism" },
              ],
              value: component,
              onChange: setComponent
            },
            {
              label: "Status",
              options: [
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
                { value: "in-progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
                { value: "declined", label: "Declined" },
              ],
              value: status,
              onChange: setStatus
            },
            {
              label: "Date Range",
              options: [
                { value: "last-7-days", label: "Last 7 Days" },
                { value: "last-30-days", label: "Last 30 Days" },
                { value: "last-90-days", label: "Last 90 Days" },
                { value: "custom", label: "Custom Range" },
              ],
              value: dateRange,
              onChange: setDateRange
            },
          ]}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Claims Database</CardTitle>
            <Button onClick={handleExportCSV} className="flex items-center gap-2">
              <Download size={16} />
              Export to CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search claims by ID, model, component or dealer..."
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-sm"
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Claim ID</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Floorplan</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Claim Date</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((claim) => (
                    <React.Fragment key={claim.id}>
                      <TableRow>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.model}</TableCell>
                        <TableCell>{claim.floorplan}</TableCell>
                        <TableCell>{claim.component}</TableCell>
                        <TableCell>{claim.dealer}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>{claim.claimDate}</TableCell>
                        <TableCell className="text-right">{claim.cost}</TableCell>
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
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {/* Detailed view row - shown when claim is selected */}
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
                                <div className="mt-4">
                                  <Button size="sm" className="mr-2">View Full Details</Button>
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
            
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{Math.min(filteredData.length, 10)}</span> of{" "}
                <span className="font-medium">{filteredData.length}</span> claims
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous Page</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage(page + 1)}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next Page</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DetailedClaimsReport;
