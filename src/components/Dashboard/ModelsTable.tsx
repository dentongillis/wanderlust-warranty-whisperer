
import React from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const modelsData = [
  { 
    id: 1,
    model: 'Model I',
    claims: 325,
    avgCost: '$1,742',
    trend: 'down',
    risk: 'low'
  },
  { 
    id: 2,
    model: 'Model Z Air',
    claims: 662,
    avgCost: '$1,401',
    trend: 'up',
    risk: 'high'
  },
  { 
    id: 3,
    model: 'Model Z',
    claims: 725,
    avgCost: '$1,525',
    trend: 'up',
    risk: 'normal'
  },
  { 
    id: 4,
    model: 'Model G',
    claims: 470,
    avgCost: '$2,343',
    trend: 'down',
    risk: 'normal'
  }
];

export const ModelsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Model</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Claims</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Avg. Cost</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Trend</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Risk Level</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Details</th>
          </tr>
        </thead>
        <tbody>
          {modelsData.map((model) => (
            <tr key={model.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-3 py-2.5 text-center font-medium text-gray-800 dark:text-gray-200">{model.model}</td>
              <td className="px-3 py-2.5 text-center text-gray-600 dark:text-gray-300">{model.claims}</td>
              <td className="px-3 py-2.5 text-center text-gray-600 dark:text-gray-300">{model.avgCost}</td>
              <td className="px-3 py-2.5 text-center">
                {model.trend === 'up' ? (
                  <div className="flex items-center justify-center text-red-500 text-xs">
                    <TrendingUp size={12} className="mr-1" /> Up
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-green-500 text-xs">
                    <TrendingDown size={12} className="mr-1" /> Down
                  </div>
                )}
              </td>
              <td className="px-3 py-2.5 text-center">
                {model.risk === 'high' ? (
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/30 text-xs px-1.5 py-0">
                    High
                  </Badge>
                ) : model.risk === 'normal' ? (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/30 text-xs px-1.5 py-0">
                    Normal
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/30 text-xs px-1.5 py-0">
                    Low
                  </Badge>
                )}
              </td>
              <td className="px-3 py-2.5 text-center">
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 h-6 px-1.5 py-0 text-xs">
                  <Eye size={12} className="mr-1" /> View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
