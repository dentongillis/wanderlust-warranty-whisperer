
import React from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const modelsData = [
  { 
    id: 1,
    model: 'Model I',
    claims: 325,
    avgCost: '$1,742.21',
    trend: 'down',
    risk: 'low'
  },
  { 
    id: 2,
    model: 'Model Z Air',
    claims: 662,
    avgCost: '$1,400.88',
    trend: 'up',
    risk: 'high'
  },
  { 
    id: 3,
    model: 'Model Z',
    claims: 725,
    avgCost: '$1,525.42',
    trend: 'up',
    risk: 'normal'
  },
  { 
    id: 4,
    model: 'Model G',
    claims: 470,
    avgCost: '$2,342.67',
    trend: 'down',
    risk: 'normal'
  }
];

export const ModelsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Model</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Claims</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Avg. Cost</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Trend</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Risk Level</th>
            <th className="px-4 py-2 text-right font-medium text-gray-600 dark:text-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {modelsData.map((model) => (
            <tr key={model.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{model.model}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{model.claims}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{model.avgCost}</td>
              <td className="px-4 py-2">
                {model.trend === 'up' ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <TrendingUp size={12} className="mr-1" /> Increasing
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 text-xs">
                    <TrendingDown size={12} className="mr-1" /> Decreasing
                  </div>
                )}
              </td>
              <td className="px-4 py-2">
                {model.risk === 'high' ? (
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 text-xs px-2 py-0.5 rounded-full">
                    High Risk
                  </Badge>
                ) : model.risk === 'normal' ? (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 text-xs px-2 py-0.5 rounded-full">
                    Normal
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 text-xs px-2 py-0.5 rounded-full">
                    Low Risk
                  </Badge>
                )}
              </td>
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
