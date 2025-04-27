import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ChartCard } from '@/components/Charts/ChartCard';
import { FilterCard } from '@/components/Filters/FilterCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Sample data for Top Warranty Issues
const topIssuesData = [
  { name: 'Water Leaks', value: 145 },
  { name: 'Electrical Issues', value: 112 },
  { name: 'Slide Mechanism Failures', value: 87 },
  { name: 'HVAC Problems', value: 76 },
  { name: 'Plumbing Failures', value: 63 },
  { name: 'Appliance Malfunctions', value: 52 },
  { name: 'Frame/Structure Issues', value: 48 },
  { name: 'Interior Finish', value: 42 },
];

// Sample data for Top Components by Failure
const topComponentsData = [
  { name: 'Roof Seams', value: 78 },
  { name: 'Air Conditioners', value: 65 },
  { name: 'Slide Motors', value: 58 },
  { name: 'Inverter', value: 52 },
  { name: 'Water Heater', value: 43 },
  { name: 'Refrigerator', value: 41 },
  { name: 'Leveling System', value: 38 },
  { name: 'Awning', value: 32 },
];

// Sample data for Root Cause Category Breakdown
const rootCauseData = [
  { name: 'Manufacturing Defect', value: 45 },
  { name: 'Design Flaw', value: 25 },
  { name: 'Material Failure', value: 15 },
  { name: 'User Error', value: 10 },
  { name: 'Environmental Damage', value: 5 },
];

// Sample data for Average Time to Resolution
const resolutionTimeData = [
  { name: 'Manufacturing Defect', time: 6.2 },
  { name: 'Design Flaw', time: 9.5 },
  { name: 'Material Failure', time: 4.8 },
  { name: 'User Error', time: 3.2 },
  { name: 'Environmental Damage', time: 7.1 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RootCauseAnalysis = () => {
  // Filter state
  const [model, setModel] = useState('');
  const [floorplan, setFloorplan] = useState('');
  const [componentMfr, setComponentMfr] = useState('');
  const [dealer, setDealer] = useState('');

  const handleApplyFilters = () => {
    console.log("Applying filters:", { model, floorplan, componentMfr, dealer });
    // In a real app, this would update the charts with filtered data
  };

  const handleResetFilters = () => {
    setModel('');
    setFloorplan('');
    setComponentMfr('');
    setDealer('');
  };

  return (
    <DashboardLayout
      title="Root Cause Analysis"
      description="Analyze warranty issues, components, and root causes"
    >
      <div className="space-y-6">
        <FilterCard 
          filters={[
            {
              label: "Model",
              options: [
                { value: "freedom-deluxe", label: "Freedom Deluxe" },
                { value: "traveler-xl", label: "Traveler XL" },
                { value: "voyager-elite", label: "Voyager Elite" },
                { value: "expedition", label: "Expedition" },
              ],
              value: model,
              onChange: setModel
            },
            {
              label: "Floorplan",
              options: [
                { value: "fp-3200", label: "3200" },
                { value: "fp-2800", label: "2800" },
                { value: "fp-2500", label: "2500" },
                { value: "fp-3600", label: "3600" },
              ],
              value: floorplan,
              onChange: setFloorplan
            },
            {
              label: "Component Manufacturer",
              options: [
                { value: "dometic", label: "Dometic" },
                { value: "lippert", label: "Lippert" },
                { value: "furrion", label: "Furrion" },
                { value: "carefree", label: "Carefree" },
              ],
              value: componentMfr,
              onChange: setComponentMfr
            },
            {
              label: "Dealer",
              options: [
                { value: "camping-world", label: "Camping World" },
                { value: "rv-one", label: "RV One" },
                { value: "lazydays", label: "Lazydays" },
                { value: "general-rv", label: "General RV" },
              ],
              value: dealer,
              onChange: setDealer
            },
          ]}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Top Warranty Issues" 
            infoText="Most commonly reported warranty issues across all models"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topIssuesData}
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
                    fill="#0066FF" 
                    name="Number of Claims"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Top Components by Failure" 
            infoText="Components with the highest failure rates"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topComponentsData}
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
                    name="Number of Failures"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Root Cause Category Breakdown" 
            infoText="Distribution of warranty claims by root cause categories"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rootCauseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {rootCauseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} claims`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Average Time to Resolution by Root Cause" 
            infoText="Average days to resolve warranty claims by cause category"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resolutionTimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => [`${value} days`, 'Resolution Time']} />
                  <Bar 
                    dataKey="time" 
                    fill="#FF8042" 
                    name="Average Days to Resolve"
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

export default RootCauseAnalysis;
