
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

interface MapboxToken {
  token: string;
}

export const ChoroplethMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [activeTab, setActiveTab] = useState('usa');
  const [loading, setLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  const initializeMap = (token: string) => {
    if (!mapRef.current || !token) return;
    
    try {
      mapboxgl.accessToken = token;
      
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
      
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: activeTab === 'usa' ? 3 : 2.5,
        center: activeTab === 'usa' ? [-98, 39] : [-95, 55],
        interactive: true,
        attributionControl: false
      });
      
      mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      mapInstance.current.on('load', () => {
        setLoading(false);
        
        // Add source and layer for the map
        if (activeTab === 'usa') {
          addUsMapLayers();
        } else {
          addCanadaMapLayers();
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  };
  
  const addUsMapLayers = () => {
    if (!mapInstance.current) return;
    
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson')
      .then(response => response.json())
      .then(statesData => {
        // Join our data with GeoJSON
        const features = statesData.features.map((feature: any) => {
          const stateData = usStatesData.find(state => state.id === feature.properties.STATE_ABBR);
          if (stateData) {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                value: stateData.value,
                change: stateData.change,
                name: stateData.state
              }
            };
          }
          return feature;
        });
        
        const sourceData = {
          type: 'FeatureCollection',
          features
        };
        
        const map = mapInstance.current;
        if (map) {
          // Add source for states
          if (map.getSource('states')) {
            (map.getSource('states') as mapboxgl.GeoJSONSource).setData(sourceData);
          } else {
            map.addSource('states', {
              type: 'geojson',
              data: sourceData
            });
          
            // Add fill layer
            map.addLayer({
              id: 'states-fill',
              type: 'fill',
              source: 'states',
              paint: {
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'value'],
                  50, '#cfe2f3',  // Light blue for low values
                  200, '#9fc5e8',  // Medium light blue
                  400, '#6fa8dc',  // Medium blue
                  600, '#3d85c6',  // Darker blue
                  800, '#0b5394'   // Darkest blue for high values
                ],
                'fill-opacity': 0.8
              }
            });
          
            // Add border layer
            map.addLayer({
              id: 'states-borders',
              type: 'line',
              source: 'states',
              paint: {
                'line-color': '#ffffff',
                'line-width': 0.5
              }
            });
            
            // Add tooltip interaction
            map.on('click', 'states-fill', (e) => {
              if (e.features && e.features[0]) {
                const props = e.features[0].properties;
                if (props) {
                  new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`
                      <strong>${props.name}</strong><br/>
                      Claims: ${props.value}<br/>
                      Change: <span style="color:${props.change.startsWith('+') ? 'green' : 'red'}">${props.change}</span>
                    `)
                    .addTo(map);
                }
              }
            });
            
            map.on('mouseenter', 'states-fill', () => {
              map.getCanvas().style.cursor = 'pointer';
            });
            
            map.on('mouseleave', 'states-fill', () => {
              map.getCanvas().style.cursor = '';
            });
          }
        }
      })
      .catch(err => console.error('Error loading US states data:', err));
  };
  
  const addCanadaMapLayers = () => {
    if (!mapInstance.current) return;
    
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson')
      .then(response => response.json())
      .then(provincesData => {
        // Join our data with GeoJSON
        const features = provincesData.features.map((feature: any) => {
          const provinceCode = feature.properties.code;
          const provinceData = canadianProvincesData.find(province => province.id === provinceCode);
          if (provinceData) {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                value: provinceData.value,
                change: provinceData.change,
                name: provinceData.province
              }
            };
          }
          return feature;
        });
        
        const sourceData = {
          type: 'FeatureCollection',
          features
        };
        
        const map = mapInstance.current;
        if (map) {
          // Add source for provinces
          if (map.getSource('provinces')) {
            (map.getSource('provinces') as mapboxgl.GeoJSONSource).setData(sourceData);
          } else {
            map.addSource('provinces', {
              type: 'geojson',
              data: sourceData
            });
          
            // Add fill layer
            map.addLayer({
              id: 'provinces-fill',
              type: 'fill',
              source: 'provinces',
              paint: {
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'value'],
                  30, '#cfe2f3',   // Light blue for low values
                  100, '#9fc5e8',  // Medium light blue
                  200, '#6fa8dc',  // Medium blue
                  300, '#3d85c6',  // Darker blue
                  350, '#0b5394'   // Darkest blue for high values
                ],
                'fill-opacity': 0.8
              }
            });
          
            // Add border layer
            map.addLayer({
              id: 'provinces-borders',
              type: 'line',
              source: 'provinces',
              paint: {
                'line-color': '#ffffff',
                'line-width': 0.5
              }
            });
            
            // Add tooltip interaction
            map.on('click', 'provinces-fill', (e) => {
              if (e.features && e.features[0]) {
                const props = e.features[0].properties;
                if (props) {
                  new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`
                      <strong>${props.name}</strong><br/>
                      Claims: ${props.value}<br/>
                      Change: <span style="color:${props.change.startsWith('+') ? 'green' : 'red'}">${props.change}</span>
                    `)
                    .addTo(map);
                }
              }
            });
            
            map.on('mouseenter', 'provinces-fill', () => {
              map.getCanvas().style.cursor = 'pointer';
            });
            
            map.on('mouseleave', 'provinces-fill', () => {
              map.getCanvas().style.cursor = '';
            });
          }
        }
      })
      .catch(err => console.error('Error loading Canadian provinces data:', err));
  };
  
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };
  
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
      initializeMap(savedToken);
    }
  }, []);
  
  useEffect(() => {
    if (!showTokenInput && mapboxToken) {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      initializeMap(mapboxToken);
    }
  }, [activeTab, showTokenInput]);
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-full overflow-hidden">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Regional Claims Distribution</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info size={16} />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="usa">United States</TabsTrigger>
              <TabsTrigger value="canada">Canada</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 h-[400px]">
          {showTokenInput ? (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Mapbox API Token Required</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  To display the interactive map, please enter your Mapbox public token. 
                  You can get one from your Mapbox account dashboard.
                </p>
                <form onSubmit={handleTokenSubmit}>
                  <input
                    type="text"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="Enter your Mapbox public token"
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <Button type="submit" className="w-full">
                    Submit Token
                  </Button>
                </form>
              </div>
            </div>
          ) : loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading map data...</div>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="h-full w-full rounded-md border border-gray-200 dark:border-gray-700"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
