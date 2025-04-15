
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - would be replaced with real data from API
const data = [
  { month: 'Jan', claims: 65, cost: 24000 },
  { month: 'Feb', claims: 59, cost: 22000 },
  { month: 'Mar', claims: 80, cost: 29000 },
  { month: 'Apr', claims: 81, cost: 30000 },
  { month: 'May', claims: 56, cost: 25000 },
  { month: 'Jun', claims: 55, cost: 23000 },
  { month: 'Jul', claims: 40, cost: 19000 },
  { month: 'Aug', claims: 50, cost: 21000 },
  { month: 'Sep', claims: 65, cost: 26000 },
  { month: 'Oct', claims: 70, cost: 28000 },
  { month: 'Nov', claims: 62, cost: 24500 },
  { month: 'Dec', claims: 58, cost: 23000 },
];

export const WarrantyChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('year');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Warranty Claims Over Time</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis yAxisId="left" stroke="#888" />
              <YAxis yAxisId="right" orientation="right" stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="claims" 
                name="Number of Claims" 
                stroke="#0066FF" 
                strokeWidth={2}
                dot={{ stroke: '#0066FF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cost" 
                name="Total Cost ($)" 
                stroke="#319795" 
                strokeWidth={2}
                dot={{ stroke: '#319795', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
