
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { WideBarChart } from './WideBarChart';
import { Card, CardContent } from '@/components/ui/card';

export const TopStats: React.FC = () => {
  const modelData = [
    { name: 'Model Q', value: 60 },
    { name: 'Model Z', value: 74 },
    { name: 'Model Z Air', value: 70 },
    { name: 'Model I', value: 46 },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Claims</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">2,345</div>
            <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-500 font-medium">
              <TrendingUp size={14} className="mr-1" />
              <span>3.5% Last month</span>
            </div>
            <WideBarChart data={modelData} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Claim Amount</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$15,580</div>
            <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-500 font-medium">
              <TrendingUp size={14} className="mr-1" />
              <span>2.1% Last month</span>
            </div>
            <WideBarChart data={modelData} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Approval Rating</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">89%</div>
            <div className="flex items-center justify-between mt-1 text-xs">
              <span className="text-green-600 dark:text-green-500 font-medium">
                <TrendingUp size={14} className="mr-1 inline" />
                1.9% Last month
              </span>
              <div className="flex gap-2">
                <span className="text-green-600 dark:text-green-500 whitespace-nowrap">Approved: <strong>2,087</strong></span>
                <span className="text-red-600 dark:text-red-500 whitespace-nowrap">Denied: <strong>258</strong></span>
              </div>
            </div>
            <WideBarChart data={modelData} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ask AI</span>
          </div>
          <div className="h-[calc(100%-1.5rem)] flex flex-col">
            <div className="text-sm flex-1 text-gray-600 dark:text-gray-300">
              Need help analyzing warranty data? Ask our AI assistant for insights.
            </div>
            <Button className="mt-2 w-full">
              Ask AI
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
