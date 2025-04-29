import React from 'react';
import {
  FileText,
  DollarSign,
  Clock,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, description }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <div className="p-2 rounded-lg bg-rv-blue-50 text-rv-blue-500">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <span className={`ml-2 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {trend.value}%
            </span>
          )}
        </div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      <StatCard
        title="Active Claims"
        value="245"
        icon={<FileText size={18} />}
        trend={{ value: 12, isPositive: true }}
        description="Up from last month"
      />
      <StatCard
        title="Total Cost"
        value="$534,290"
        icon={<DollarSign size={18} />}
        trend={{ value: 8, isPositive: false }}
        description="Compared to previous period"
      />
      <StatCard
        title="Average Processing Time"
        value="5.2 days"
        icon={<Clock size={18} />}
        trend={{ value: 23, isPositive: true }}
        description="Faster than previous month"
      />
      <StatCard
        title="Warranty Coverage"
        value="86%"
        icon={<ShieldCheck size={18} />}
        trend={{ value: 3, isPositive: true }}
        description="Of all registered RVs"
      />
    </div>
  );
};
