
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ChartCard } from '@/components/Charts/ChartCard';
import { FilterCard } from '@/components/Filters/FilterCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

// Sample data for claims by customer state/region
const claimsByStateData = [
  { name: 'Florida', value: 125 },
  { name: 'Texas', value: 98 },
  { name: 'California', value: 86 },
  { name: 'Arizona', value: 72 },
  { name: 'Michigan', value: 65 },
  { name: 'Colorado', value: 58 },
  { name: 'Ohio', value: 52 },
  { name: 'New York', value: 48 },
  { name: 'Pennsylvania', value: 43 },
  { name: 'North Carolina', value: 39 },
];

// Sample data for claims by customer demographics
const customerDemographicsData = [
  { name: 'New Owners (0-1 year)', value: 35 },
  { name: 'Experienced (1-3 years)', value: 28 },
  { name: 'Veteran (3+ years)', value: 22 },
  { name: 'Second Owner', value: 15 },
];

// Sample data for top customer-reported issues
const topCustomerIssuesData = [
  { name: 'Water Leakage', value: 78 },
  { name: 'Electrical Failures', value: 65 },
  { name: 'Slide Operation', value: 52 },
  { name: 'HVAC Issues', value: 45 },
  { name: 'Plumbing Problems', value: 38 },
  { name: 'Appliance Malfunctions', value: 32 },
  { name: 'Exterior Damage', value: 28 },
  { name: 'Interior Finishes', value: 22 },
];

// Sample data for customer satisfaction
const satisfactionData = [
  { name: 'Very Satisfied', value: 35 },
  { name: 'Satisfied', value: 42 },
  { name: 'Neutral', value: 15 },
  { name: 'Unsatisfied', value: 8 },
  { name: 'Very Unsatisfied', value: 5 },
];

// Colors for the pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const SATISFACTION_COLORS = ['#00C49F', '#82ca9d', '#FFBB28', '#ff8042', '#ff0000'];

const CustomerImpact = () => {
  // Filter state
  const [customerType, setCustomerType] = useState('');
  const [ownerLength, setOwnerLength] = useState('');
  const [dateRange, setDateRange] = useState('last-12-months');

  const handleApplyFilters = () => {
    console.log("Applying filters:", { customerType, ownerLength, dateRange });
    // In a real app, this would update the charts with filtered data
  };

  const handleResetFilters = () => {
    setCustomerType('');
    setOwnerLength('');
    setDateRange('last-12-months');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Impact</h1>
          <p className="text-muted-foreground">
            Analyze how warranty claims affect different customer segments.
          </p>
        </div>

        <FilterCard 
          filters={[
            {
              label: "Customer Type",
              options: [
                { value: "private", label: "Private Owner" },
                { value: "commercial", label: "Commercial" },
                { value: "rental", label: "Rental Fleet" },
              ],
              value: customerType,
              onChange: setCustomerType
            },
            {
              label: "Owner Length",
              options: [
                { value: "new", label: "New (0-1 year)" },
                { value: "experienced", label: "Experienced (1-3 years)" },
                { value: "veteran", label: "Veteran (3+ years)" },
                { value: "second", label: "Second Owner" },
              ],
              value: ownerLength,
              onChange: setOwnerLength
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
            title="Claims by Customer State/Region" 
            infoText="Geographic distribution of warranty claims by customer location"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={claimsByStateData}
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
            title="Claims by Customer Demographics" 
            infoText="Distribution of warranty claims by ownership experience"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDemographicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerDemographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} claims`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Top Customer-Reported Issues" 
            infoText="Most common issues reported by customers in warranty claims"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topCustomerIssuesData}
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
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#319795" 
                    name="Number of Reports"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Customer Satisfaction After Claim" 
            infoText="Survey results from customers after warranty claim resolution"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[index % SATISFACTION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerImpact;
