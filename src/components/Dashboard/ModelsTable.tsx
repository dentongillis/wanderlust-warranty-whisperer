
import React from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

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
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th className="pb-2 font-medium text-gray-600">Model</th>
            <th className="pb-2 font-medium text-gray-600">Claims</th>
            <th className="pb-2 font-medium text-gray-600">Avg. Cost</th>
            <th className="pb-2 font-medium text-gray-600">Trend</th>
            <th className="pb-2 font-medium text-gray-600">Risk Level</th>
            <th className="pb-2 font-medium text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {modelsData.map((model) => (
            <tr key={model.id} className="border-t border-gray-100">
              <td className="py-2 font-medium">{model.model}</td>
              <td className="py-2">{model.claims}</td>
              <td className="py-2">{model.avgCost}</td>
              <td className="py-2">
                {model.trend === 'up' ? (
                  <div className="flex items-center text-red-500 text-xs">
                    <TrendingUp size={14} className="mr-1" /> Increasing
                  </div>
                ) : (
                  <div className="flex items-center text-green-500 text-xs">
                    <TrendingDown size={14} className="mr-1" /> Decreasing
                  </div>
                )}
              </td>
              <td className="py-2">
                {model.risk === 'high' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    High Risk
                  </span>
                ) : model.risk === 'normal' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Normal
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Low Risk
                  </span>
                )}
              </td>
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
