import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  type: 'smart_pillar' | 'cctv' | 'barricade' | 'alert';
  status: 'online' | 'offline' | 'alert';
  info: {
    location: string;
    owner: string;
    lastUpdate: string;
    alerts?: string[];
  };
}

interface GoogleMapProps {
  height?: string;
  markers?: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleMap({ 
  height = "400px", 
  markers = [], 
  center = { lat: 5.6037, lng: -0.1870 }, // Accra, Ghana
  zoom = 12,
  onMarkerClick 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<any[]>([]);

  const createMarkerContent = (type: string, status: string) => {
    let color = '#4CAF50'; // Green for online
    let iconSymbol = '📍';
    
    if (status === 'alert') color = '#F44336'; // Red for alert
    if (status === 'offline') color = '#9E9E9E'; // Gray for offline
    
    switch (type) {
      case 'smart_pillar':
        iconSymbol = '🏛️';
        break;
      case 'cctv':
        iconSymbol = '📹';
        break;
      case 'barricade':
        iconSymbol = '🛡️';
        break;
      default:
        iconSymbol = '📍';
    }

    return `
      <div style="
        width: 32px;
        height: 32px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transform: scale(1);
        transition: transform 0.2s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        ${iconSymbol}
      </div>
    `;
  };

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"]
        });

        const { Map } = await loader.importLibrary("maps");
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");

        const mapInstance = new Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: 'satellite',
          tilt: 45, // 3D view
          heading: 0,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: true
        });

        setMap(mapInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    // Add markers using standard Google Maps markers (compatible with all setups)
    markers.forEach(markerData => {
      // Create custom marker icon based on device type and status
      let iconColor = '#4CAF50'; // Green for online
      let iconSymbol = '';
      
      if (markerData.status === 'alert') iconColor = '#F44336'; // Red for alert
      if (markerData.status === 'offline') iconColor = '#9E9E9E'; // Gray for offline
      
      switch (markerData.type) {
        case 'smart_pillar':
          iconSymbol = 'S';
          break;
        case 'cctv':
          iconSymbol = 'C';
          break;
        case 'barricade':
          iconSymbol = 'B';
          break;
        default:
          iconSymbol = 'P';
      }

      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: iconColor,
          fillOpacity: 0.9,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
          scale: 12,
          labelOrigin: new window.google.maps.Point(0, 0)
        },
        label: {
          text: iconSymbol,
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold'
        }
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(markerData)
      });

      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(m => {
          if (m !== marker && m.infoWindow) {
            m.infoWindow.close();
          }
        });
        
        infoWindow.open(map, marker);
        onMarkerClick?.(markerData);
      });

      marker.infoWindow = infoWindow;
      markersRef.current.push(marker);
    });
  }, [map, markers, onMarkerClick]);

  const createInfoWindowContent = (marker: MapMarker) => {
    const statusColor = marker.status === 'online' ? 'green' : 
                       marker.status === 'alert' ? 'red' : 'gray';
    
    return `
      <div style="padding: 8px; min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; color: #333;">${marker.title}</h3>
        <p style="margin: 4px 0; color: #666;"><strong>Location:</strong> ${marker.info.location}</p>
        <p style="margin: 4px 0; color: #666;"><strong>Owner:</strong> ${marker.info.owner}</p>
        <p style="margin: 4px 0; color: #666;"><strong>Status:</strong> 
          <span style="color: ${statusColor}; font-weight: bold;">${marker.status.toUpperCase()}</span>
        </p>
        <p style="margin: 4px 0; color: #666;"><strong>Last Update:</strong> ${marker.info.lastUpdate}</p>
        ${marker.info.alerts && marker.info.alerts.length > 0 ? 
          `<div style="margin-top: 8px; padding: 4px; background: #ffebee; border-radius: 4px;">
            <strong style="color: #d32f2f;">Active Alerts:</strong><br>
            ${marker.info.alerts.map(alert => `• ${alert}`).join('<br>')}
          </div>` : ''
        }
      </div>
    `;
  };

  if (error) {
    return (
      <div 
        style={{ height }} 
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      >
        {/* Styled fallback map interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-800 to-blue-900/20">
          {/* Ghana map outline overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path 
                d="M50 150 Q100 100 200 120 Q300 140 350 150 Q320 200 250 220 Q150 240 80 200 Z" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
                className="opacity-50"
              />
            </svg>
          </div>
          
          {/* Security Perimeter Zones */}
          <div className="absolute top-1/6 left-1/4 w-32 h-32 border-2 border-red-500 rounded-full opacity-50 animate-pulse">
            <div className="absolute inset-0 bg-red-500/20 rounded-full"></div>
          </div>
          
          <div className="absolute top-1/2 right-1/5 w-40 h-40 border-2 border-green-400 rounded-full opacity-60">
            <div className="absolute inset-0 bg-green-400/10 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-yellow-500 rounded-full opacity-70">
            <div className="absolute inset-0 bg-yellow-500/15 rounded-full"></div>
          </div>

          {/* Property markers fallback */}
          <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-lg animate-pulse">
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              <div className="font-semibold">Alert Zone</div>
              <div className="text-red-400">3 Active Alerts</div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg">
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              <div className="font-semibold">Safe Zone</div>
              <div className="text-green-400">All Clear</div>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-yellow-500 rounded-full border-3 border-white shadow-lg">
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              <div className="font-semibold">Monitoring</div>
              <div className="text-yellow-400">6 Devices</div>
            </div>
          </div>
          
          <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow-lg">
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              <div className="font-semibold">Smart Pillar</div>
              <div className="text-blue-400">Online</div>
            </div>
          </div>
          
          <div className="absolute top-1/6 right-1/6 w-5 h-5 bg-purple-400 rounded-full border-2 border-white shadow-lg">
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              <div className="font-semibold">CCTV Camera</div>
              <div className="text-purple-400">Recording</div>
            </div>
          </div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute border-gray-400" style={{
                left: `${i * 12.5}%`,
                top: 0,
                bottom: 0,
                borderLeft: '1px solid'
              }} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="absolute border-gray-400" style={{
                top: `${i * 16.67}%`,
                left: 0,
                right: 0,
                borderTop: '1px solid'
              }} />
            ))}
          </div>
          
          {/* Map status overlay */}
          <div className="absolute top-4 left-4 bg-black/70 rounded-lg px-3 py-2 border border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium">Connecting to Maps API</span>
            </div>
            <div className="text-xs text-gray-300 mt-1">Enable Maps JavaScript API in Google Cloud Console</div>
          </div>
          
          {/* Coordinates display */}
          <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg px-3 py-2 border border-gray-600">
            <div className="text-xs text-gray-300">
              <div>Center: 5.6037°N, 0.1870°W</div>
              <div>Region: Greater Accra, Ghana</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          style={{ height }} 
          className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden"
        >
          {/* Enhanced loading interface */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-gray-800 to-blue-900/10">
            {/* Loading animation with map grid */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute border-gray-500 animate-pulse" style={{
                  left: `${i * 12.5}%`,
                  top: 0,
                  bottom: 0,
                  borderLeft: '1px solid',
                  animationDelay: `${i * 100}ms`
                }} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute border-gray-500 animate-pulse" style={{
                  top: `${i * 16.67}%`,
                  left: 0,
                  right: 0,
                  borderTop: '1px solid',
                  animationDelay: `${i * 150}ms`
                }} />
              ))}
            </div>
            
            {/* Loading status */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white bg-black/70 rounded-xl p-6 border border-gray-600">
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#D4AF37] mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-[#D4AF37]">Loading Satellite Map</p>
                <p className="text-sm text-gray-300 mt-2">Connecting to Google Maps API</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div 
          ref={mapRef} 
          style={{ height, display: isLoading ? 'none' : 'block' }}
          className="rounded-lg overflow-hidden border border-gray-600"
        />
        
        {/* Map overlay controls when loaded */}
        {!isLoading && !error && (
          <>
            {/* Enhanced Map Controls */}
            <div className="absolute top-4 left-4 space-y-2">
              {/* Map type control */}
              <div className="bg-black/90 rounded-lg border border-gray-600 backdrop-blur-sm">
                <div className="flex space-x-1 p-1">
                  <button className="px-3 py-1 text-xs bg-[#D4AF37] text-black rounded font-medium">
                    Satellite
                  </button>
                  <button className="px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    Street
                  </button>
                  <button className="px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    Hybrid
                  </button>
                </div>
              </div>
              
              {/* View Options */}
              <div className="bg-black/90 rounded-lg border border-gray-600 backdrop-blur-sm p-2">
                <div className="text-xs text-gray-300 mb-2 font-medium">View Options</div>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
                    <span className="text-xs text-gray-300">Heat Map</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
                    <span className="text-xs text-gray-300">Security Zones</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 rounded" />
                    <span className="text-xs text-gray-300">Traffic Layer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
                    <span className="text-xs text-gray-300">3D Buildings</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Enhanced Legend & Analytics */}
            <div className="absolute top-4 right-4 space-y-2">
              {/* Device Legend */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="text-xs text-gray-300 mb-2 font-medium">Device Status</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs">Alert Zone</span>
                    </div>
                    <span className="text-xs text-red-400 font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-xs">Safe Zone</span>
                    </div>
                    <span className="text-xs text-green-400 font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Monitoring</span>
                    </div>
                    <span className="text-xs text-yellow-400 font-medium">6</span>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-xs">Smart Pillars</span>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-xs">CCTV Cameras</span>
                    </div>
                    <span className="text-xs text-purple-400 font-medium">5</span>
                  </div>
                </div>
              </div>
              
              {/* Real-time Analytics */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="text-xs text-gray-300 mb-2 font-medium">Real-time Analytics</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Coverage</span>
                      <span className="text-green-400 font-medium">87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-green-400 h-1 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Response</span>
                      <span className="text-yellow-400 font-medium">2.3s</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-yellow-400 h-1 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Threats</span>
                      <span className="text-red-400 font-medium">Low</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-red-400 h-1 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Status Panel */}
            <div className="absolute bottom-4 left-4 space-y-2">
              {/* Live status indicator */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">LIVE TRACKING</span>
                  <span className="text-xs text-gray-300">16 Devices</span>
                </div>
              </div>
              
              {/* Activity Monitor */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="text-xs text-gray-300 mb-1 font-medium">Recent Activity</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-400">Alert: Lakeside St</span>
                    <span className="text-xs text-gray-500">10:34</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs text-yellow-400">Motion: Spintex Rd</span>
                    <span className="text-xs text-gray-500">10:28</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Clear: Ridge Way</span>
                    <span className="text-xs text-gray-500">10:22</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Coordinates & Region Info */}
            <div className="absolute bottom-4 right-4 space-y-2">
              {/* Weather & Environment */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="text-xs text-gray-300 mb-1 font-medium">Environment</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Temp:</span>
                    <span className="text-white ml-1">28°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Humidity:</span>
                    <span className="text-white ml-1">75%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Wind:</span>
                    <span className="text-white ml-1">12 km/h</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Visibility:</span>
                    <span className="text-white ml-1">10 km</span>
                  </div>
                </div>
              </div>
              
              {/* Coordinates display */}
              <div className="bg-black/90 rounded-lg px-3 py-2 border border-gray-600 backdrop-blur-sm">
                <div className="text-xs text-gray-300">
                  <div className="font-medium mb-1">Greater Accra Region</div>
                  <div className="text-[#D4AF37]">5.6037°N, 0.1870°W</div>
                  <div className="text-gray-400 mt-1">Zoom: 12 • Tilt: 45°</div>
                </div>
              </div>
            </div>
            
            {/* Heat Map Overlay Simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Heat zones for activity visualization */}
              <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-red-500/30 rounded-full blur-lg"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-green-400/15 rounded-full blur-lg"></div>
              <div className="absolute top-3/4 right-1/3 w-14 h-14 bg-blue-400/25 rounded-full blur-lg"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}