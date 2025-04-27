import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ChartCard } from '@/components/Charts/ChartCard';
import { FilterCard } from '@/components/Filters/FilterCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ScatterChart, Scatter, ZAxis,
  Legend, Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";

// Sample data for top dealers by claims volume
const topDealersData = [
  { name: 'Camping World Denver', value: 87 },
  { name: 'RV One Superstores', value: 75 },
  { name: 'Lazydays Tampa', value: 68 },
  { name: 'General RV Wixom', value: 62 },
  { name: 'Motor Home Specialist', value: 58 },
  { name: 'Bill Plemmons RV', value: 45 },
  { name: 'Dixie RV Superstores', value: 42 },
  { name: 'Campers Inn RV', value: 38 },
];

// Sample data for dealer approval rate
const dealerApprovalData = [
  { name: 'Camping World Denver', claims: 87, approval: 82 },
  { name: 'RV One Superstores', claims: 75, approval: 78 },
  { name: 'Lazydays Tampa', claims: 68, approval: 92 },
  { name: 'General RV Wixom', claims: 62, approval: 75 },
  { name: 'Motor Home Specialist', claims: 58, approval: 88 },
  { name: 'Bill Plemmons RV', claims: 45, approval: 94 },
  { name: 'Dixie RV Superstores', claims: 42, approval: 72 },
  { name: 'Campers Inn RV', claims: 38, approval: 89 },
  { name: 'Giant RV', claims: 35, approval: 68 },
  { name: 'PleasureLand RV', claims: 32, approval: 87 },
  { name: 'Wilkins RV', claims: 29, approval: 90 },
  { name: 'Vogt RV Centers', claims: 27, approval: 76 },
];

// Sample data for average days to repair
const daysToRepairData = [
  { name: 'Camping World Denver', days: 8.2 },
  { name: 'RV One Superstores', days: 7.5 },
  { name: 'Lazydays Tampa', days: 5.8 },
  { name: 'General RV Wixom', days: 6.9 },
  { name: 'Motor Home Specialist', days: 6.2 },
  { name: 'Bill Plemmons RV', days: 5.1 },
  { name: 'Dixie RV Superstores', days: 9.3 },
  { name: 'Campers Inn RV', days: 6.5 },
];

// Sample data for dealer details table
const dealerDetailsData = [
  { id: 1, name: 'Camping World Denver', region: 'West', claims: 87, approval: 82, days: 8.2 },
  { id: 2, name: 'RV One Superstores', region: 'Southeast', claims: 75, approval: 78, days: 7.5 },
  { id: 3, name: 'Lazydays Tampa', region: 'Southeast', claims: 68, approval: 92, days: 5.8 },
  { id: 4, name: 'General RV Wixom', region: 'Midwest', claims: 62, approval: 75, days: 6.9 },
  { id: 5, name: 'Motor Home Specialist', region: 'Southwest', claims: 58, approval: 88, days: 6.2 },
  { id: 6, name: 'Bill Plemmons RV', region: 'Southeast', claims: 45, approval: 94, days: 5.1 },
  { id: 7, name: 'Dixie RV Superstores', region: 'Southeast', claims: 42, approval: 72, days: 9.3 },
  { id: 8, name: 'Campers Inn RV', region: 'Northeast', claims: 38, approval: 89, days: 6.5 },
];

const DealerPerformance = () => {
  // Filter state
  const [dealer, setDealer] = useState('');
  const [region, setRegion] = useState('');
  const [dateRange, setDateRange] = useState('last-12-months');

  const handleApplyFilters = () => {
    console.log("Applying filters:", { dealer, region, dateRange });
    // In a real app, this would update the charts with filtered data
  };

  const handleResetFilters = () => {
    setDealer('');
    setRegion('');
    setDateRange('last-12-months');
  };

  return (
    <DashboardLayout
      title="Dealer Performance"
      description="Analyze dealer-specific warranty handling and metrics"
    >
      <div className="space-y-6">
        <FilterCard 
          filters={[
            {
              label: "Dealer Name",
              options: [
                { value: "camping-world", label: "Camping World" },
                { value: "rv-one", label: "RV One Superstores" },
                { value: "lazydays", label: "Lazydays" },
                { value: "general-rv", label: "General RV" },
              ],
              value: dealer,
              onChange: setDealer
            },
            {
              label: "Dealer Region",
              options: [
                { value: "northeast", label: "Northeast" },
                { value: "southeast", label: "Southeast" },
                { value: "midwest", label: "Midwest" },
                { value: "southwest", label: "Southwest" },
                { value: "west", label: "West" },
              ],
              value: region,
              onChange: setRegion
            },
            {
              label: "Date Range",
              options: [
                { value: "last-30-days", label: "Last 30 Days" },
                { value: "last-90-days", label: "Last 90 Days" },
                { value: "last-6-months", label: "Last 6 Months" },
                { value: "last-12-months", label: "Last 12 Months" },
              ],
              value: dateRange,
              onChange: setDateRange
            }
          ]}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Top Dealers by Claims Volume" 
            infoText="Dealers with the highest number of warranty claims processed"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topDealersData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#0066FF" 
                    name="Number of Claims"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Dealer Approval Rate (%)" 
            infoText="Percentage of claims approved vs. total claims submitted by dealer"
            description="Bubble size indicates claim volume"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="claims" 
                    name="Total Claims" 
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="approval" 
                    name="Approval Rate (%)" 
                    domain={[50, 100]}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="claims" 
                    range={[50, 400]} 
                    name="Claims Volume" 
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name, props) => {
                      if (name === "Approval Rate (%)") return [`${value}%`, name];
                      return [value, name];
                    }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p>Claims: {payload[0].payload.claims}</p>
                            <p>Approval Rate: {payload[0].payload.approval}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Scatter 
                    name="Dealers" 
                    data={dealerApprovalData} 
                    fill="#319795"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Average Days to Repair by Dealer" 
            infoText="Average time taken by dealers to complete warranty repairs"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={daysToRepairData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} days`, 'Average Repair Time']} />
                  <Bar 
                    dataKey="days" 
                    fill="#FF8042" 
                    name="Average Days to Repair"
                  >
                    {daysToRepairData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.days > 8 ? '#ff0000' : entry.days > 6 ? '#ffbb28' : '#00C49F'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Detailed Dealer Performance" 
            infoText="Comprehensive dealer metrics table"
          >
            <div className="h-[350px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-center">Claims</TableHead>
                    <TableHead className="text-center">Approval %</TableHead>
                    <TableHead className="text-center">Avg. Days</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealerDetailsData.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell>{dealer.region}</TableCell>
                      <TableCell className="text-center">{dealer.claims}</TableCell>
                      <TableCell className="text-center">{dealer.approval}%</TableCell>
                      <TableCell className="text-center">{dealer.days}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DealerPerformance;
