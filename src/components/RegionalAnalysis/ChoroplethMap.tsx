
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Filter } from 'lucide-react';

// Mock data for the choropleth map
const usStatesData = [
  { id: 'CA', state: 'California', value: 780, change: '+12%' },
  { id: 'TX', state: 'Texas', value: 680, change: '+8%' },
  { id: 'FL', state: 'Florida', value: 520, change: '+15%' },
  { id: 'NY', state: 'New York', value: 470, change: '-5%' },
  { id: 'OH', state: 'Ohio', value: 420, change: '+2%' },
  { id: 'PA', state: 'Pennsylvania', value: 380, change: '+4%' },
  { id: 'IL', state: 'Illinois', value: 360, change: '+1%' },
  { id: 'MI', state: 'Michigan', value: 340, change: '+7%' },
  { id: 'GA', state: 'Georgia', value: 320, change: '+10%' },
  { id: 'NC', state: 'North Carolina', value: 310, change: '+6%' },
  { id: 'WA', state: 'Washington', value: 290, change: '+9%' },
  { id: 'VA', state: 'Virginia', value: 285, change: '+3%' },
  { id: 'MA', state: 'Massachusetts', value: 270, change: '+2%' },
  { id: 'AZ', state: 'Arizona', value: 260, change: '+11%' },
  { id: 'IN', state: 'Indiana', value: 250, change: '+1%' },
  { id: 'TN', state: 'Tennessee', value: 240, change: '+4%' },
  { id: 'MO', state: 'Missouri', value: 230, change: '+2%' },
  { id: 'MD', state: 'Maryland', value: 225, change: '+3%' },
  { id: 'WI', state: 'Wisconsin', value: 220, change: '+5%' },
  { id: 'MN', state: 'Minnesota', value: 215, change: '+7%' },
  { id: 'CO', state: 'Colorado', value: 205, change: '+9%' },
  { id: 'AL', state: 'Alabama', value: 200, change: '+1%' },
  { id: 'SC', state: 'South Carolina', value: 195, change: '+5%' },
  { id: 'LA', state: 'Louisiana', value: 190, change: '-2%' },
  { id: 'KY', state: 'Kentucky', value: 180, change: '+3%' },
  { id: 'OR', state: 'Oregon', value: 175, change: '+8%' },
  { id: 'OK', state: 'Oklahoma', value: 170, change: '+2%' },
  { id: 'CT', state: 'Connecticut', value: 165, change: '+1%' },
  { id: 'IA', state: 'Iowa', value: 160, change: '+4%' },
  { id: 'MS', state: 'Mississippi', value: 155, change: '+1%' },
  { id: 'AR', state: 'Arkansas', value: 150, change: '+3%' },
  { id: 'KS', state: 'Kansas', value: 145, change: '+2%' },
  { id: 'UT', state: 'Utah', value: 140, change: '+7%' },
  { id: 'NV', state: 'Nevada', value: 135, change: '+9%' },
  { id: 'NM', state: 'New Mexico', value: 130, change: '+5%' },
  { id: 'WV', state: 'West Virginia', value: 125, change: '-1%' },
  { id: 'NE', state: 'Nebraska', value: 120, change: '+2%' },
  { id: 'ID', state: 'Idaho', value: 115, change: '+6%' },
  { id: 'HI', state: 'Hawaii', value: 110, change: '+4%' },
  { id: 'ME', state: 'Maine', value: 105, change: '+1%' },
  { id: 'NH', state: 'New Hampshire', value: 100, change: '+3%' },
  { id: 'RI', state: 'Rhode Island', value: 95, change: '+1%' },
  { id: 'MT', state: 'Montana', value: 90, change: '+5%' },
  { id: 'DE', state: 'Delaware', value: 85, change: '+2%' },
  { id: 'SD', state: 'South Dakota', value: 80, change: '+4%' },
  { id: 'ND', state: 'North Dakota', value: 75, change: '+3%' },
  { id: 'AK', state: 'Alaska', value: 70, change: '+7%' },
  { id: 'VT', state: 'Vermont', value: 65, change: '+1%' },
  { id: 'WY', state: 'Wyoming', value: 60, change: '+2%' },
  { id: 'DC', state: 'District of Columbia', value: 55, change: '+6%' },
];

const canadianProvincesData = [
  { id: 'ON', province: 'Ontario', value: 320, change: '+8%' },
  { id: 'QC', province: 'Quebec', value: 280, change: '+5%' },
  { id: 'BC', province: 'British Columbia', value: 240, change: '+12%' },
  { id: 'AB', province: 'Alberta', value: 210, change: '-2%' },
  { id: 'MB', province: 'Manitoba', value: 180, change: '+4%' },
  { id: 'NS', province: 'Nova Scotia', value: 120, change: '+1%' },
  { id: 'SK', province: 'Saskatchewan', value: 110, change: '+3%' },
  { id: 'NB', province: 'New Brunswick', value: 100, change: '+2%' },
  { id: 'NL', province: 'Newfoundland and Labrador', value: 90, change: '+1%' },
  { id: 'PE', province: 'Prince Edward Island', value: 80, change: '+4%' },
  { id: 'YT', province: 'Yukon', value: 40, change: '+2%' },
  { id: 'NT', province: 'Northwest Territories', value: 35, change: '+1%' },
  { id: 'NU', province: 'Nunavut', value: 30, change: '+3%' },
];

const getColorByValue = (value: number) => {
  if (value >= 600) return '#0b5394'; // Darkest blue for high values
  if (value >= 400) return '#3d85c6'; // Darker blue
  if (value >= 200) return '#6fa8dc'; // Medium blue
  if (value >= 100) return '#9fc5e8'; // Medium light blue
  return '#cfe2f3'; // Light blue for low values
};

export const ChoroplethMap = () => {
  const [activeTab, setActiveTab] = useState('usa');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  
  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
  };
  
  const handleClosePopup = () => {
    setSelectedRegion(null);
  };

  const USAMap = () => (
    <svg 
      viewBox="0 0 959 593" 
      className="w-full h-full"
      style={{ maxHeight: '380px' }}
    >
      <g>
        {/* This is where the US states SVG paths would go */}
        {/* The following is just a simplified representation of a few states */}
        <path 
          id="CA" 
          d="M122.7,385.9l-0.4-1.3l-1.3-0.7l-1.9,0.3l-2.9-0.3l-1.4-1.9l-4.5,0.8l-3.2-1.3l-4.2-0.1l-6.8-0.8l-2.2-1.3l-1.1-1.9l-12.1-26.6V236.2L2,189.7l25.4-36.2l30.6-39l0.6,0.4l0.2,0.2l0.2,0.5l-0.1,0.8l-0.9,1.8l-2.2,1.9v1l0.4,0.7l16.7,8.8l10.3,8.3h0.9l1-1.1l18.6-7l1-2.5l2.7-0.8l3.2-0.4v-0.2l1.2-0.9l0.8-0.9l0.5,0.1l0.5,2.2l0.1,1l-1.2,0.8l-0.6,0.5l0.1,0.2l1.6,1.4l2.4,0.3l2.3-0.3l2.1-2l0.8-1.8l1.3-1.3l1.5-0.8l-0.1-0.2l-0.4-0.9l-0.5-0.3l0.1-0.2l0.9,0.1l1.2-0.5l0.5-0.5l0.1-0.6l-0.2-0.8l0.2-0.5l1.3-0.4l0.5,0.1l0.7,0.6l1.6-0.1l2.6,0.5l0.6-0.1l0.1-0.3l-0.3-0.6l0.3-0.4l1.4-0.2l0.9,0.1l0.8,0.7l0.6,1.1l1.2,0.8l2.2,0.3l0.9,0.6l0.3,1l1.1,1.3l0.1,0.7l-0.7,0.7v0.5l1,1.2l-0.1,0.9l-0.8,0.7l-0.1,0.8l0.8,1l-0.1,1.3l-0.6,0.9l-0.2,0.4l0.1,0.5l0.6,0.5l1.8,0.5l2.9-0.7l0.7-0.6l0.1-0.3l-0.1-0.4l0.3-0.4l1.7-0.8l2.9-0.8l0.7-0.6l1.5-0.4l0.2,0.4l-0.4,0.4v0.6l0.7,0.7l0.7,0.1l1.5-1l3.4,0.7l1.3,0.7l2.1,0.1l0.8-0.3l0.9-0.9v-0.3l-0.6-0.6l-1.5-0.3l-0.5-0.3l0.1-0.7l0.8-1.1l1.1-0.7l2-0.5l3.1,0.8l0.1-0.3l-0.4-0.5v-0.3l0.1-0.3l3.3,0.5l0.6-0.2l0.3-0.6l-0.3-0.8l0.4-0.8l1.8-0.8l1.6-0.3l1.7,0.1l1.4,0.3l1.4,0.9l0.5,0.8l0.1,1.1l-0.3,0.8l-0.6,0.8l-0.7,0.4l-0.6,1.1l-0.9,0.4l-1.3,1.5l-0.1,0.8l0.4,1.4l1.3,0.8l1-0.6l1-0.2l1.5,0.5l1.1,0.9l1.5,0.4l2.4,1.1l1.3,0.4l2.8,1.8l2.9,1.2l3.9,2.1l3.8,1.8l4.2,2.9l3.7,1.6l7.5,4.3l-11.3,33.9l-0.3,0.6l-0.1,0.3l0.2,0.9l-0.4,0.5l-0.1,0.9l0.1,4.7l0.4,1.3l0.8,0.6v0.2l-0.4,0.3l-0.1,0.3l0.2,0.3l-0.2,1.3l-0.5,0.6l-0.3,0.1h-0.4l-0.5,0.2l-0.3,0.4l-0.2,0.7l-0.2,0.1h-0.3l-0.2-0.7l-0.2-0.1l-0.6,0.2l-0.9,1l-0.1,0.3l0.1,0.4l-0.2,0.4l-1.2,2.4l-0.2,0.9v0.3l0.2,0.3l0.7,0.3l0.2,0.2l-0.1,0.5l-1.9,5.1l-1.7,1.5l-1.3,0.9l-0.9,1.3l-1.2,1.2l-0.1,0.7l0.2,0.3l1-0.1l0.3,0.3l-0.1,0.6l-0.4,1.2l-0.2,0.3l-0.4,0.3l-1.9,0.6v0.4l0.2,0.5l0.1,0.2l-0.2,0.5l-0.9,0.2l-0.5,0.5l-0.4,1.3v0.5l1,1.2l0.3,0.5l-0.1,0.4l-1.1,0.5l-0.3,0.3l-0.2,0.9l-0.4,0.2l-0.5,0.1l-0.5,0.4l-0.8,1.3l0.1,0.9l0.6,0.6l0.8,1.6l-0.1,0.9l-1.5,0.5l-0.4,0.3l-0.7,1.1l-0.2,1.3l0.3,3.1l-0.4,0.4v0.3l0.2,0.6l-0.1,0.5l-0.3,0.4l-0.1,0.5l0.3,0.4l-0.5,0.7l-0.9,0.9l-0.1,0.5l0.3,0.4v1l-0.6,0.8l-0.3,1.9l-0.6,0.5l-1.1,0.5l-0.9,0.9l-0.9,0.5l-2.7,0.4l-0.8-0.2l-0.6-0.4l-0.7-0.1l-0.4,0.4l-0.1,0.7l-0.5,0.1v-0.2h-0.1l-0.2,0.2v0.5l0.4,0.3l0.1,0.2l-0.3,0.2l-0.2,0.5l-10.5,1.3z"
          fill={getColorByValue(780)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(usStatesData.find(s => s.id === 'CA'))}
          className="hover:opacity-80 cursor-pointer"
        />
        <path 
          id="TX" 
          d="M462.1,542.4l-1.8-1.5l-1.1,0.2l-0.7-0.7l-3.5,1.2l-0.3,0.9l-0.6,0.1l-2.4-1.5l-0.6-1.8l0.1-2.7l-0.7-1.4l0.8-2.2l-2.7-1.5l-0.7-0.1l-0.6,0.3l-0.7-0.7l0.2-0.4l-0.2-0.5l-0.6-0.2l-0.3-0.2v-0.2l0.2-0.5l0.1-0.3h-0.4l-0.3,0.2l-0.3,0.5l-0.1,0.3l-0.5,0.3l-0.3,0.6l-0.4,0.5l-0.5,0.1l-0.5,0.5l-0.4,0.6l-0.4,0.2l-0.6,0.1l-0.7,0.5l-0.8-0.5l1-0.5l0.3-0.5l0.1-0.5l-0.1-0.2l-0.4-0.1h-0.4l-0.7-0.8v-0.6l-0.9-0.6l-0.1-0.3v-0.3l-0.3-0.1h-0.3v-0.6l-0.4-0.3l-0.6-0.7l-0.4-0.2l-0.3-0.4h-0.4l-0.7-0.6l-0.6-0.2h-0.6l-0.3-0.9l-0.9-0.3v-2.6l-0.3-0.4l-1-0.8l-0.3-0.7l-0.5-0.4l-0.3-0.8l-0.6-0.7l-0.1-0.7l-1-0.5l-0.2-0.3v-0.4l0.3-0.1l0.1-0.2l-0.1-0.6l-0.2-0.2l-1-0.5l-0.3-0.5l-0.1-0.6l-0.8-0.3l-0.7-0.7l-1.1-0.1l-0.3-0.2l-1.9-0.5l-1.8-0.9l-0.5-1.8l-1.2-0.7l-0.2-0.9l-0.9-0.8l0.2-1.3l-0.8-0.7h-0.6l-0.9-1.6l0.4-0.3l0.2-0.4l-0.3-0.5v-0.9l-0.9-0.8l-1.1-0.1l-0.9,0.2l-0.3,0.4l-0.3-0.1l-0.5-1.1l-0.5-0.1h-0.5l-0.8,0.5l-0.6-0.3l-0.5-0.5l-2.3-0.8l-0.5,0.1l-0.2,0.4l-0.3,0.1l-1-0.1l-0.9-0.3l-0.3-0.3l0.1-0.6l-0.2-0.3l-0.4-0.1l-0.7-0.6l-0.7-0.3l-2.1-0.8l-1.4-1.5l-0.6-0.2l-1.3-1.2l-0.4-0.1l-0.5,0.2l-0.4,0.6l-2.4-0.4l-1.1-1l-2.7-0.8l-0.6-0.5l-0.1-0.3l-1.3-0.2l-0.6,0.1l-0.8,0.6l-0.9-0.9l-1.2-0.2l-0.9-0.5l-3.9-0.2l-1.6-1.4l-1.3-0.4l-2.2-1.4l-1.1-0.4L386,469l-0.3-0.9l0.6-0.6l0.2-0.6l-0.2-0.5l-0.6-0.1v-0.3l0.4-0.9l0.9-1l0.9-0.8l0.1-0.8l-0.4-0.6l-2.7-1.2l-0.6-0.1l-0.3,0.1l-0.2,0.4l-0.2,0.1h-0.4l-0.5-0.7l-0.9,0.3l-1.4-0.1l-0.4-0.2l-0.1-0.7l-0.6-0.3l-0.8,0.4l-1.3-0.1l-1-0.3l-0.4-0.7l-0.8-0.3l-0.4,0.1l-0.3,0.4l-0.3,0.1h-0.6l-2-0.8l-0.4-0.6l-0.6-0.3l-0.5-0.8l0.1-0.6l-0.7-1l-0.6-0.3l-1-1.5l-0.7-0.6l-0.4-0.1l-0.4,0.1l-0.5,0.5v0.3l-0.9,0.5l-0.6,0.9l-0.2,0.1h-0.4l-0.8-0.9l-0.7-0.2l-0.3,0.2v0.3l0.4,0.9l0.6,0.5v0.6l-0.3,0.7v0.9l-0.9,1.5l-0.7,0.6l-1.6,0.8l-0.4,0.6v0.5l-0.3,0.3h-0.5l-0.7-0.9l-0.8-0.2l-1.6-1.5l-0.9-0.1l-1.4,0.1l-1.1-0.2l-0.4-0.3l-0.2-0.5l-0.8-0.1l-0.8-0.7l-0.9-0.3l-1.2,0.5l-0.4-0.1l-0.3-0.4l-0.7-0.3l-1-0.7v-0.9l-0.2-0.3h-0.6l-0.9-0.5l-1.3,0.3l-0.4-0.1l-0.3-0.2l-0.9,0.3l-1.7-0.1L323.7,439l-0.8-0.3l-2.3-0.3l-0.3-0.4l-0.2-0.8l-0.4-0.3l-0.9-0.2l-0.8-0.7l-1.4-0.3l-2-1.2l-1.2-0.1l-1-0.6l-1.2,0.3l-0.5-0.2l-1-1.5l-1.5-0.3v57.8l3.3,0.2l88.5,3.1l81.2,1.8l1.3-91.6l0.7-0.2L472,443l0.8-0.1l1.7,1l1.3-0.2l3.3,0.8l0.3,0.3l-0.3,1.2l0.5,0.5l2.3,0.2l-0.1,1.5l-0.5,1.9l0.2,0.6l1,0.7l0.6,0.1l0.5,0.6l0.2,1l0.9,1.2l0.8,0.1l0.3,0.8l0.6,0.3l0.2,0.3l0.1,1.2l1.7,1.5l0.1,2.2l1,1.4l0.8,0.4l0.1,0.7l-0.7,2.1l0.3,0.6l0.5,0.3l0.3,0.8l0.6,0.4h0.6l0.3,0.2l0.4,0.8l1.3,0.8l0.5,0.7l1.1,0.5l0.5,0.7l1.2,0.7l1.4,2.3l1.9,0.8l1,1.1l0.5,0.1l1.3-0.3l0.3-0.2l0.2-0.5l0.6-0.1l2.3,1.2l1,0.2l-0.1,19.1l-0.9,0.7l-0.5,1.6l0.1,0.9l0.7,0.8l-0.7,1.5l0.2,1l-0.5,0.8l0.4,0.5l0.8-0.2l0.1,1.8l0.7,0.2l-0.7,2.1l0.5,0.7l1.5,0.8l-32.4-1.6z"
          fill={getColorByValue(680)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(usStatesData.find(s => s.id === 'TX'))}
          className="hover:opacity-80 cursor-pointer"
        />
        {/* Simplified NY state for demonstration */}
        <path 
          id="NY" 
          d="M750,220l0.5-2.3l-0.9-2.4l-1.5-0.3l-0.4-1.5l0.5-1.3l-1.9-1.8l0.8-2l-0.8-1.6l0.6-1.7l-0.2-1l-1.1-2.9l-1.9-1.1l-0.8-2.2l-2.2-2.7l-1-0.5l-2.3-0.5l-1.7-0.8l-0.5,0.4l-1.4-0.7l-0.7,0.8l-0.9-0.8l0.3-0.5v-1.4l-3-3.9l0.6-1l-0.6-0.6l0.2-0.5l-0.5-0.8l-1.3-1.2h-1l-0.7-0.7l-0.3-1.3l-0.7-0.1l-0.4-0.3l0.7-0.9l-0.2-1.2l-0.8-0.7l-0.1-0.9l-0.9-0.7l-1.1-0.2l-1.1-0.9l-1.5-0.6v-0.6l-0.6-0.7l0.3-1.6l-0.3-0.7l0.2-0.4l-0.1-0.4l-1-0.2l0.1-0.9l-0.3-0.6l-0.8-0.3l-2.1-2.2l-0.7-1.1l-1-0.5l-0.1-0.9l-1.3-0.9l1.7-3.9l0.7-1.1l0.9,0.8l1-0.3l1.7-1.8l0.9-0.3l0.5-0.9l1.3-0.1l0.5-0.4h0.8l0.2-0.5l0.6,0.3l0.6-0.7l1.8,0.2l1-0.8h0.7l0.4-0.5l1-0.2l0.4-0.6l1.8,0.1l0.7-0.3l0.6,0.5l0.5-0.1l0.2-0.9l0.8-0.5l1.4,0.1l0.4-0.2v-0.7l1.4-0.5l0.7,0.8l1.9,0.1v-0.6l0.3-0.9l0.6-0.7l0.1-1l0.6-0.4l0.7-1.2l1.3-0.3l0.5-0.7h0.6l0.6-0.5l0.8,0.2l0.1,0.5l0.7,0.4l-0.5,0.5l0.2,1.1l0.5,0.3l2.3,0.5l0.6,0.6l0.8-0.1l0.6,0.9l0.9,0.1l0.4-0.3l0.8,0.4v0.9l1.1,0.8l0.5,0.8l1.3,0.2l0.7,0.5h0.8l0.8,0.5l0.5-0.1l0.9,0.9l1.1,0.3l0.3,0.6l0.5,0.1l0.8-0.7l1.2,0.5v0.9l0.8,0.2l0.9,0.9l1.2,0.7l0.2,0.7l1.7,0.5l0.4,0.5l0.9,0.2l0.7,0.6l0.9-0.2l2.1,1.3l0.2,0.5l1.6,0.2l1.9,1.1l1.5,0.2l0.8,0.4l0.5-0.1l0.9,0.6l2.1,0.2l2.5,1.6l1.1,0.1l1.2,0.9l0.1,0.6l0.7,0.6l-0.6,0.9l0.4,1.3l-0.1,1.6l0.5,0.7l-0.7,0.7l-0.1,0.9l-0.5,0.2l-1,1l-0.3,0.8l-1.3,0.1l-0.4,0.5l-0.6,0.2v1.1l-0.6,0.6h-0.7l-0.3,0.7l-1,0.4l-0.1,0.4l-0.5,0.2l-0.3,0.6h-0.6l-0.6,0.5l-0.3,0.4l-0.9,0.3l-0.5,0.9l-1.3,0.4l-0.6,0.5l-1.9,0.2l-1.1,0.5l-0.3,0.4l-1,0.2l-0.3,0.4l-0.6,0.3l-0.9,1.3h-0.6l-1,1l-1,0.1l-0.8,0.9l-0.4,0.1l-0.3,0.9l-1.1,0.5v0.7l0.4,0.5l-0.4,0.3l-0.4,1.4l-0.6,0.5l-0.9,1.5l-1.3,1.2l-0.6,2.1l-0.6,0.5l-0.8,0.3v0.4l-2.1,0.9l-1.2,1.8l-0.3,0.9l-0.3,0.1l-0.1,0.5l-0.9,0.9v0.5l-0.6,0.6v0.3l-0.6-0.2l-0.1,0.6l-0.6,0.7l-2.2,2.5l-1,0.4l-0.6,0.8l-0.3,0.1l-0.3,0.7l-1.1,0.9l-1,1.4l-0.8,0.2l-0.2,0.7l-0.9,0.9l-0.8,0.3l-0.8,1.1l-0.1,0.6z"
          fill={getColorByValue(470)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(usStatesData.find(s => s.id === 'NY'))}
          className="hover:opacity-80 cursor-pointer"
        />
        {/* Add more states as needed */}
        <text x="200" y="350" className="text-xs font-bold">CA</text>
        <text x="400" y="450" className="text-xs font-bold">TX</text>
        <text x="750" y="200" className="text-xs font-bold">NY</text>
      </g>
    </svg>
  );
  
  const CanadaMap = () => (
    <svg 
      viewBox="0 0 949 699" 
      className="w-full h-full"
      style={{ maxHeight: '380px' }}
    >
      <g>
        {/* This is where the Canadian provinces SVG paths would go */}
        {/* For demonstration purposes, we'll use simplified shapes for provinces */}
        <path 
          id="ON" 
          d="M520,250 L550,220 L600,200 L650,210 L680,240 L670,280 L640,320 L600,330 L560,310 L530,290 L520,250"
          fill={getColorByValue(320)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(canadianProvincesData.find(p => p.id === 'ON'))}
          className="hover:opacity-80 cursor-pointer"
        />
        <path 
          id="QC" 
          d="M680,240 L710,220 L750,210 L790,220 L820,250 L830,290 L800,320 L770,330 L730,320 L700,300 L670,280 L680,240"
          fill={getColorByValue(280)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(canadianProvincesData.find(p => p.id === 'QC'))}
          className="hover:opacity-80 cursor-pointer"
        />
        <path 
          id="BC" 
          d="M250,200 L290,180 L340,190 L370,230 L360,270 L330,300 L290,310 L260,290 L240,260 L250,200"
          fill={getColorByValue(240)}
          stroke="#ffffff"
          strokeWidth="1"
          onClick={() => handleRegionClick(canadianProvincesData.find(p => p.id === 'BC'))}
          className="hover:opacity-80 cursor-pointer"
        />
        {/* Add more provinces as needed */}
        <text x="550" y="280" className="text-xs font-bold">ON</text>
        <text x="750" y="270" className="text-xs font-bold">QC</text>
        <text x="290" y="250" className="text-xs font-bold">BC</text>
      </g>
    </svg>
  );

  return (
    <Card className="h-full shadow border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl">Regional Claim Distribution</CardTitle>
            <div className="text-muted-foreground">
              <Info size={16} className="inline ml-1" />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="usa" className="text-xs">USA</TabsTrigger>
              <TabsTrigger value="canada" className="text-xs">Canada</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {selectedRegion && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">
                {selectedRegion.state || selectedRegion.province}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClosePopup}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            <p className="text-sm mb-1">Claims: <span className="font-semibold">{selectedRegion.value}</span></p>
            <p className="text-sm">
              Change: <span className={`font-semibold ${selectedRegion.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {selectedRegion.change}
              </span>
            </p>
          </div>
        )}
        
        <div className="relative h-[380px]">
          {/* Wrap content in Tabs component and properly structure TabsContent */}
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="usa" className="m-0 h-full">
              <USAMap />
            </TabsContent>
            <TabsContent value="canada" className="m-0 h-full">
              <CanadaMap />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#0b5394] mr-1"></div>
              <span className="text-xs">600+</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#3d85c6] mr-1"></div>
              <span className="text-xs">400-599</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#6fa8dc] mr-1"></div>
              <span className="text-xs">200-399</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#9fc5e8] mr-1"></div>
              <span className="text-xs">100-199</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#cfe2f3] mr-1"></div>
              <span className="text-xs">0-99</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
