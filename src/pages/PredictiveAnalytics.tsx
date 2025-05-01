
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ChartCard } from '@/components/Charts/ChartCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for forecasted claim volume
const forecastedClaimData = [
  { month: 'May', actual: 87, forecast: null },
  { month: 'Jun', actual: 93, forecast: null },
  { month: 'Jul', actual: 105, forecast: null },
  { month: 'Aug', actual: 110, forecast: null },
  { month: 'Sep', actual: 98, forecast: null },
  { month: 'Oct', actual: 92, forecast: null },
  { month: 'Nov', actual: 88, forecast: null },
  { month: 'Dec', actual: 78, forecast: null },
  { month: 'Jan', actual: 72, forecast: null },
  { month: 'Feb', actual: 80, forecast: null },
  { month: 'Mar', actual: 85, forecast: null },
  { month: 'Apr', actual: 95, forecast: null },
  { month: 'May', actual: null, forecast: 102 },
  { month: 'Jun', actual: null, forecast: 108 },
  { month: 'Jul', actual: null, forecast: 112 },
  { month: 'Aug', actual: null, forecast: 118 },
  { month: 'Sep', actual: null, forecast: 105 },
  { month: 'Oct', actual: null, forecast: 98 },
];

// Sample data for at-risk components
const atRiskComponentsData = [
  { name: 'Slide Motors', riskScore: 85, threshold: 70 },
  { name: 'Roof Seals', riskScore: 78, threshold: 70 },
  { name: 'Water Pump', riskScore: 72, threshold: 70 },
  { name: 'Inverter', riskScore: 68, threshold: 70 },
  { name: 'Air Conditioner', riskScore: 65, threshold: 70 },
  { name: 'Refrigerator', riskScore: 58, threshold: 70 },
  { name: 'Furnace', riskScore: 52, threshold: 70 },
  { name: 'Water Heater', riskScore: 45, threshold: 70 },
];

// Sample data for warranty cost projection
const costProjectionData = [
  { month: 'May', actual: 87000, forecast: null },
  { month: 'Jun', actual: 93000, forecast: null },
  { month: 'Jul', actual: 105000, forecast: null },
  { month: 'Aug', actual: 110000, forecast: null },
  { month: 'Sep', actual: 98000, forecast: null },
  { month: 'Oct', actual: 92000, forecast: null },
  { month: 'Nov', actual: 88000, forecast: null },
  { month: 'Dec', actual: 78000, forecast: null },
  { month: 'Jan', actual: 72000, forecast: null },
  { month: 'Feb', actual: 80000, forecast: null },
  { month: 'Mar', actual: 85000, forecast: null },
  { month: 'Apr', actual: 95000, forecast: null },
  { month: 'May', actual: null, forecast: 102000 },
  { month: 'Jun', actual: null, forecast: 108000 },
  { month: 'Jul', actual: null, forecast: 115000 },
  { month: 'Aug', actual: null, forecast: 122000 },
  { month: 'Sep', actual: null, forecast: 110000 },
  { month: 'Oct', actual: null, forecast: 105000 },
];

// Sample data for ML model insights - claim likelihood
const claimLikelihoodData = [
  { model: 'Freedom Deluxe 3200', likelihood: 85 },
  { model: 'Traveler XL 2800', likelihood: 62 },
  { model: 'Voyager Elite 2500', likelihood: 48 },
  { model: 'Expedition 3600', likelihood: 73 },
  { model: 'Nomad 1800', likelihood: 37 },
];

const PredictiveAnalytics = () => {
  const [showTrainingInfo, setShowTrainingInfo] = useState(true);
  
  // Reset notification visibility when revisiting the page
  useEffect(() => {
    setShowTrainingInfo(true);
  }, []);

  return (
    <DashboardLayout
      title="Predictive Analytics"
      description="AI-powered forecasting and predictive insights for warranty trends"
    >
      <div className="space-y-6">
        {showTrainingInfo && (
          <Alert className="bg-yellow-50 border-yellow-200 relative">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-800 font-medium">Model Training Information</AlertTitle>
            <AlertDescription className="text-yellow-700 text-sm">
              Predictive models were last trained on April 10, 2025, using 24 months of historical data. Current forecast accuracy: 89%.
              Models are retrained every 30 days to incorporate the latest data and improve accuracy.
            </AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 p-0 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-900"
              onClick={() => setShowTrainingInfo(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Forecasted Claim Volume" 
            infoText="Projected warranty claims for the next 6 months"
            description="Based on 24-month historical data + seasonal patterns"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={forecastedClaimData}
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
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Claims" 
                    stroke="#0066FF" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    name="Forecasted Claims" 
                    stroke="#FF8042" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="At-Risk Components" 
            infoText="Components with high predicted failure rates"
            description="Risk score threshold: 70 (high risk)"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={atRiskComponentsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => [`${value} / 100`, 'Risk Score']} />
                  <Bar dataKey="riskScore" name="Risk Score">
                    {atRiskComponentsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.riskScore >= entry.threshold ? '#ff0000' : '#00C49F'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Warranty Cost Projection" 
            infoText="Forecasted warranty costs for the next 6 months"
            description="Financial impact forecast for budget planning"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={costProjectionData}
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
                  <Tooltip formatter={(value) => [`$${(value).toLocaleString()}`, 'Cost']} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Cost" 
                    stroke="#0066FF" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    name="Forecasted Cost" 
                    stroke="#FF8042" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Claim Likelihood by Model/Floorplan" 
            infoText="Machine learning model predictions for claim probability"
            description="Next 90-day projection period"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={claimLikelihoodData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="model" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    label={{ value: 'Likelihood (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Claim Likelihood']} />
                  <Bar dataKey="likelihood" name="Claim Likelihood" fill="#8884d8">
                    {claimLikelihoodData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.likelihood > 70 ? '#ff0000' : entry.likelihood > 50 ? '#ffbb28' : '#00C49F'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PredictiveAnalytics;
