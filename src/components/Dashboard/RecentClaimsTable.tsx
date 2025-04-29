
import React from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recentClaimsData = [
  { 
    date: '04/07/25',
    claimId: 'CLM-2567',
    model: 'Model I',
    dealer: 'Camping World',
    status: 'pending',
    total: '$1,742.21'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2566',
    model: 'Model Z Air',
    dealer: 'General RV',
    status: 'pending',
    total: '$1,400.88'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2565',
    model: 'Model G',
    dealer: "Pete's RV Center",
    status: 'approved',
    total: '$1,525.42'
  },
  { 
    date: '04/07/25',
    claimId: 'CLM-2564',
    model: 'Model Z',
    dealer: 'General RV',
    status: 'pending',
    total: '$2,342.67'
  },
  { 
    date: '04/06/25',
    claimId: 'CLM-2563',
    model: 'Model Z Air',
    dealer: 'Blue Compass',
    status: 'in-progress',
    total: '$1,742.21'
  },
  { 
    date: '04/06/25',
    claimId: 'CLM-2562',
    model: 'Model I',
    dealer: 'Camping World',
    status: 'approved',
    total: '$1,400.88'
  },
  { 
    date: '04/06/25',
    claimId: 'CLM-2561',
    model: 'Model G',
    dealer: 'Funtown RV',
    status: 'denied',
    total: '$1,525.42'
  }
];

export const RecentClaimsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Date</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Claim ID</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Model</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Dealer</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Total</th>
            <th className="px-4 py-2 text-right font-medium text-gray-600 dark:text-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {recentClaimsData.map((claim, index) => (
            <tr key={index} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{claim.date}</td>
              <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{claim.claimId}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{claim.model}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{claim.dealer}</td>
              <td className="px-4 py-2">
                {claim.status === 'approved' && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 text-xs px-2 py-0.5 rounded-full">
                    Approved
                  </Badge>
                )}
                {claim.status === 'pending' && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    Pending
                  </Badge>
                )}
                {claim.status === 'denied' && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 text-xs px-2 py-0.5 rounded-full">
                    Denied
                  </Badge>
                )}
                {claim.status === 'in-progress' && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 text-xs px-2 py-0.5 rounded-full">
                    In Progress
                  </Badge>
                )}
              </td>
              <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{claim.total}</td>
              <td className="px-4 py-2 text-right">
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 h-6 px-2 py-0 text-xs">
                  <Eye size={12} className="mr-1" /> Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
