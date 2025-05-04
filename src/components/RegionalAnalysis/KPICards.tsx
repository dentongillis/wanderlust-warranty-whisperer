
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, MapPin, Navigation } from 'lucide-react';

export const KPICards: React.FC = () => {
  // Mock data for KPIs
  const kpis = [
    {
      title: "Total Regional Claims",
      value: "4,265",
      change: "+12.5%",
      trend: "up",
      description: "vs. last period",
      icon: MapPin
    },
    {
      title: "Average Claims per Region",
      value: "142",
      change: "-3.2%",
      trend: "down",
      description: "vs. last period",
      icon: Navigation
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {kpis.map((kpi, index) => (
        <Card key={index} className="border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                <div className="flex items-center mt-1">
                  <span className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.trend === 'up' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                    {kpi.change}
                  </span>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{kpi.description}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                {React.createElement(kpi.icon, { size: 20, className: "text-blue-600 dark:text-blue-400" })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
