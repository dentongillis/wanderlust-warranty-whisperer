
import React from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  },
  { 
    id: 5,
    model: 'Model X',
    claims: 385,
    avgCost: '$1,890',
    trend: 'up',
    risk: 'normal'
  },
  { 
    id: 6,
    model: 'Model T',
    claims: 295,
    avgCost: '$2,156',
    trend: 'down',
    risk: 'low'
  }
];

export const ModelsTable: React.FC = () => {
  return (
    <ScrollArea className="h-[250px]">
      <div className="w-full">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Model</th>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Claims</th>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Avg. Cost</th>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Trend</th>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Risk Level</th>
              <th className="px-2 py-2 text-center font-medium text-gray-600 dark:text-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {modelsData.map((model) => (
              <tr key={model.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-200">{model.model}</td>
                <td className="px-2 py-2 text-center text-gray-600 dark:text-gray-300">{model.claims}</td>
                <td className="px-2 py-2 text-center text-gray-600 dark:text-gray-300">{model.avgCost}</td>
                <td className="px-2 py-2 text-center">
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
                <td className="px-2 py-2 text-center">
                  {model.risk === 'high' ? (
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 text-xs px-1 py-0">
                      High
                    </Badge>
                  ) : model.risk === 'normal' ? (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800 text-xs px-1 py-0">
                      Normal
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 text-xs px-1 py-0">
                      Low
                    </Badge>
                  )}
                </td>
                <td className="px-2 py-2 text-center">
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 h-6 px-1 py-0 text-xs">
                    <Eye size={12} className="mr-1" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
};
