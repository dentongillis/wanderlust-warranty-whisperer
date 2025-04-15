
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';

// Sample data - would be replaced with real data from API
const topModelsData = [
  { 
    id: 1, 
    model: 'Freedom Deluxe 3200', 
    claims: 45, 
    avgCost: '$3,280',
    trend: 'up',
    status: 'high' 
  },
  { 
    id: 2, 
    model: 'Traveler XL 2800', 
    claims: 32, 
    avgCost: '$2,150',
    trend: 'down',
    status: 'normal' 
  },
  { 
    id: 3, 
    model: 'Voyager Elite 2500', 
    claims: 28, 
    avgCost: '$1,920',
    trend: 'up',
    status: 'normal' 
  },
  { 
    id: 4, 
    model: 'Expedition 3600', 
    claims: 24, 
    avgCost: '$4,150',
    trend: 'up',
    status: 'high' 
  },
  { 
    id: 5, 
    model: 'Nomad 1800', 
    claims: 19, 
    avgCost: '$1,280',
    trend: 'down',
    status: 'low' 
  },
];

export const TopModels: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top RV Models by Claims</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Claims</th>
                <th>Avg. Cost</th>
                <th>Trend</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topModelsData.map((model) => (
                <tr key={model.id}>
                  <td className="font-medium">{model.model}</td>
                  <td>{model.claims}</td>
                  <td>{model.avgCost}</td>
                  <td>
                    {model.trend === 'up' ? (
                      <div className="flex items-center text-red-500">
                        <TrendingUp size={16} className="mr-1" /> Increasing
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <TrendingDown size={16} className="mr-1" /> Decreasing
                      </div>
                    )}
                  </td>
                  <td>
                    {model.status === 'high' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle size={12} className="mr-1" /> High Risk
                      </span>
                    ) : model.status === 'normal' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Normal
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" /> Low Risk
                      </span>
                    )}
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
