
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TopStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Claims Card */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Claims</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">2,345</div>
          <div className="flex items-center text-xs text-green-600 dark:text-green-500 font-medium">
            <TrendingUp size={14} className="mr-1" />
            <span>3.5% Last month</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Claim Amount Card */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Claim Amount</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$15,580</div>
          <div className="flex items-center text-xs text-green-600 dark:text-green-500 font-medium">
            <TrendingUp size={14} className="mr-1" />
            <span>2.1% Last month</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Approval Rating Card */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Approval Rating</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">89%</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-600 dark:text-green-500 font-medium">
              <TrendingUp size={14} className="mr-1 inline" />
              1.9% Last month
            </span>
            <div className="flex gap-2">
              <span className="text-green-600 dark:text-green-500">
                Approved: <strong>2,087</strong>
              </span>
              <span className="text-red-600 dark:text-red-500">
                Denied: <strong>258</strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
