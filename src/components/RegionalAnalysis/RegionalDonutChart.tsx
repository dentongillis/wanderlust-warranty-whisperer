
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Mock data for the donut chart
const chartData = [
  { name: 'Western', value: 1200, color: '#3B82F6' },  // blue
  { name: 'Southern', value: 850, color: '#10B981' },  // green
  { name: 'Northeastern', value: 720, color: '#F97316' }, // orange
  { name: 'Midwestern', value: 940, color: '#8B5CF6' },  // purple
  { name: 'Canadian', value: 555, color: '#EC4899' },    // pink
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 shadow-lg rounded">
        <p className="font-medium">{payload[0].name}: {payload[0].value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {((payload[0].value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export const RegionalDonutChart: React.FC = () => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-full">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Claims by Region</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" align="center" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
