
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Sample data - would be replaced with real data from API
const recentClaimsData = [
  { 
    id: 'CLM-1208',
    customer: 'John Doe',
    model: 'Freedom Deluxe 3200',
    issue: 'Water damage to ceiling panel',
    date: '2025-04-10',
    status: 'pending',
    amount: '$1,250'
  },
  { 
    id: 'CLM-1207',
    customer: 'Sarah Smith',
    model: 'Traveler XL 2800',
    issue: 'Electrical system failure',
    date: '2025-04-09',
    status: 'approved',
    amount: '$2,800'
  },
  { 
    id: 'CLM-1206',
    customer: 'Michael Johnson',
    model: 'Nomad 1800',
    issue: 'Refrigerator not cooling',
    date: '2025-04-08',
    status: 'in-progress',
    amount: '$680'
  },
  { 
    id: 'CLM-1205',
    customer: 'Emily Brown',
    model: 'Expedition 3600',
    issue: 'Slide out mechanism broken',
    date: '2025-04-07',
    status: 'completed',
    amount: '$3,450'
  },
  { 
    id: 'CLM-1204',
    customer: 'Robert Wilson',
    model: 'Voyager Elite 2500',
    issue: 'HVAC system repair',
    date: '2025-04-06',
    status: 'declined',
    amount: '$1,980'
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
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Claims</CardTitle>
        <Button variant="outline" size="sm">View All Claims</Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Customer</th>
                <th>Model</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentClaimsData.map((claim) => (
                <tr key={claim.id}>
                  <td className="font-medium">{claim.id}</td>
                  <td>{claim.customer}</td>
                  <td>{claim.model}</td>
                  <td className="max-w-[200px] truncate">{claim.issue}</td>
                  <td>{claim.date}</td>
                  <td>
                    <Badge className={getStatusColor(claim.status)} variant="outline">
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </td>
                  <td>{claim.amount}</td>
                  <td>
                    <Button variant="ghost" size="sm">
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
    </Card>
  );
};
