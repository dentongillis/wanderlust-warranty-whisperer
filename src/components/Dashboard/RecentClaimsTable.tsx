
import React from 'react';
import { Eye } from 'lucide-react';

const recentClaimsData = [
  { 
    date: '04/07/25',
    claimId: '04/07/25',
    model: 'Model I',
    dealer: 'Camping World',
    status: 'pending',
    total: '$1,742.21'
  },
  { 
    date: '04/07/25',
    claimId: '04/07/25',
    model: 'Model Z Air',
    dealer: 'General RV',
    status: 'pending',
    total: '$1,400.88'
  },
  { 
    date: '04/07/25',
    claimId: '04/07/25',
    model: 'Model G',
    dealer: "Pete's RV Center",
    status: 'approved',
    total: '$1,525.42'
  },
  { 
    date: '04/07/25',
    claimId: '04/07/25',
    model: 'Model Z',
    dealer: 'General RV',
    status: 'pending',
    total: '$2,342.67'
  },
  { 
    date: '04/07/25',
    claimId: '04/07/25',
    model: 'Model I',
    dealer: 'Camping World',
    status: 'in-progress',
    total: '$1,742.21'
  },
  { 
    date: '04/06/25',
    claimId: '04/06/25',
    model: 'Model G',
    dealer: 'Funtown RV',
    status: 'denied',
    total: '$1,525.42'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'approved':
      return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Approved</span>;
    case 'pending':
      return <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
    case 'denied':
      return <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">Denied</span>;
    case 'in-progress':
      return <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">In Progress</span>;
    default:
      return <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>;
  }
};

export const RecentClaimsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-600">
            <th className="pr-4 pb-2 font-medium">Date</th>
            <th className="pr-4 pb-2 font-medium">Claim ID</th>
            <th className="pr-4 pb-2 font-medium">Model</th>
            <th className="pr-4 pb-2 font-medium">Dealer</th>
            <th className="pr-4 pb-2 font-medium">Status</th>
            <th className="pr-4 pb-2 font-medium">Total</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {recentClaimsData.map((claim, index) => (
            <tr key={index} className="border-t border-gray-100">
              <td className="py-2 text-xs pr-4">{claim.date}</td>
              <td className="py-2 text-xs pr-4">{claim.claimId}</td>
              <td className="py-2 text-xs pr-4">{claim.model}</td>
              <td className="py-2 text-xs pr-4">{claim.dealer}</td>
              <td className="py-2 text-xs pr-4">
                {getStatusBadge(claim.status)}
              </td>
              <td className="py-2 text-xs pr-4">{claim.total}</td>
              <td className="py-2 text-right">
                <button className="text-blue-600 flex items-center text-xs">
                  <Eye size={14} className="mr-1" /> Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
