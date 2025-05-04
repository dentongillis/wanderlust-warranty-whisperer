
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data for the bar chart
const chartData = [
  {
    region: 'Western',
    Mechanical: 450,
    Electrical: 320,
    Structural: 240,
    Cosmetic: 190
  },
  {
    region: 'Southern',
    Mechanical: 380,
    Electrical: 220,
    Structural: 150,
    Cosmetic: 100
  },
  {
    region: 'Northeastern',
    Mechanical: 320,
    Electrical: 180,
    Structural: 130,
    Cosmetic: 90
  },
  {
    region: 'Midwestern',
    Mechanical: 400,
    Electrical: 280,
    Structural: 180,
    Cosmetic: 80
  },
  {
    region: 'Canadian',
    Mechanical: 250,
    Electrical: 150,
    Structural: 100,
    Cosmetic: 55
  }
];

export const ClaimTypesByRegionChart: React.FC = () => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-full">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Claim Types by Region</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Mechanical" fill="#3B82F6" />
            <Bar dataKey="Electrical" fill="#10B981" />
            <Bar dataKey="Structural" fill="#F97316" />
            <Bar dataKey="Cosmetic" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
