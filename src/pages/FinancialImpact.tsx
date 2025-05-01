
import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ChartCard } from '@/components/Charts/ChartCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp } from 'lucide-react';

// Sample data for total warranty costs over time
const totalCostsData = [
  { month: 'Jan', cost: 124000 },
  { month: 'Feb', cost: 115000 },
  { month: 'Mar', cost: 132000 },
  { month: 'Apr', cost: 143000 },
  { month: 'May', cost: 152000 },
  { month: 'Jun', cost: 165000 },
  { month: 'Jul', cost: 178000 },
  { month: 'Aug', cost: 172000 },
  { month: 'Sep', cost: 159000 },
  { month: 'Oct', cost: 148000 },
  { month: 'Nov', cost: 138000 },
  { month: 'Dec', cost: 129000 },
];

// Sample data for cost breakdown
const costBreakdownData = [
  { name: 'Parts', value: 58 },
  { name: 'Labor', value: 32 },
  { name: 'Shipping', value: 7 },
  { name: 'Admin', value: 3 },
];

// Sample data for most costly components
const costlyComponentsData = [
  { name: 'Air Conditioners', cost: 285000 },
  { name: 'Slide Mechanisms', cost: 245000 },
  { name: 'Refrigerators', cost: 198000 },
  { name: 'Roofing Systems', cost: 175000 },
  { name: 'Generators', cost: 162000 },
  { name: 'Inverters', cost: 128000 },
  { name: 'Water Heaters', cost: 105000 },
  { name: 'Entertainment Systems', cost: 92000 },
];

// Sample data for average cost per claim by model
const costPerClaimData = [
  { name: 'Freedom Deluxe 3200', cost: 2850 },
  { name: 'Traveler XL 2800', cost: 2450 },
  { name: 'Voyager Elite 2500', cost: 1980 },
  { name: 'Expedition 3600', cost: 3150 },
  { name: 'Nomad 1800', cost: 1580 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// KPIs
const kpiData = {
  totalCost: '$1,747,000',
  averageCost: '$1,928',
  reserveBalance: '$3,245,000',
  yearOverYearChange: '+8.2%'
};

const FinancialImpact = () => {
  return (
    <DashboardLayout
      title="Financial Impact"
      description="Analyze warranty costs, trends, and financial impact"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Warranty Cost</p>
                  <p className="text-2xl font-bold">{kpiData.totalCost}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Year to date
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Cost Per Claim</p>
                  <p className="text-2xl font-bold">{kpiData.averageCost}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                All models
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warranty Reserve Balance</p>
                  <p className="text-2xl font-bold">{kpiData.reserveBalance}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Current balance
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">YoY Cost Change</p>
                  <p className="text-2xl font-bold">{kpiData.yearOverYearChange}</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Compared to previous year
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Total Warranty Costs Over Time" 
            infoText="Monthly warranty costs trend"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={totalCostsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#0066FF" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                    name="Monthly Cost"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Cost Breakdown" 
            infoText="Distribution of warranty costs by category"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Top Costly Components" 
            infoText="Components with the highest total warranty costs"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costlyComponentsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Cost']} />
                  <Bar 
                    dataKey="cost" 
                    fill="#FF8042" 
                    name="Total Cost"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Average Cost Per Claim by Model" 
            infoText="Comparison of average warranty claim cost by RV model"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costPerClaimData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Average Cost']} />
                  <Bar 
                    dataKey="cost" 
                    fill="#8884d8" 
                    name="Avg. Cost per Claim"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialImpact;
