import { useState, useEffect } from "react";
import { 
  Map, 
  MapPin, 
  Shield, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings,
  Zap,
  Activity,
  Signal,
  Battery,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Navigation,
  Layers,
  Filter,
  Search,
  Maximize2,
  RefreshCw
} from "lucide-react";

interface PropertyDevice {
  id: string;
  type: 'smart_pillar' | 'barricade' | 'cctv';
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'online' | 'offline' | 'alert' | 'maintenance';
  alertLevel: 'green' | 'yellow' | 'red';
  lastUpdate: string;
  owner: string;
  deviceData: {
    battery?: number;
    temperature?: number;
    humidity?: number;
    signal?: number;
    alerts?: string[];
    motionDetected?: boolean;
    intruderCount?: number;
    waterLevel?: number;
    weatherCondition?: string;
    airQuality?: number;
  };
}

interface MapRegion {
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    lat: number;
    lng: number;
  };
}

export default function SmartMapOverlay() {
  const [selectedDevice, setSelectedDevice] = useState<PropertyDevice | null>(null);
  const [mapRegion, setMapRegion] = useState<MapRegion>({
    name: "Greater Accra Region",
    bounds: { north: 5.8, south: 5.3, east: -0.0, west: -0.5 },
    center: { lat: 5.6037, lng: -0.1870 }
  });
  const [devices, setDevices] = useState<PropertyDevice[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'smart_pillar' | 'barricade' | 'cctv'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'alert'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [mapView, setMapView] = useState<'satellite' | 'street' | 'hybrid'>('satellite');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Simulate live property data from Ghana regions
  useEffect(() => {
    const generateLiveDevices = (): PropertyDevice[] => {
      const ghanaLocations = [
        { lat: 5.6037, lng: -0.1870, address: "Accra Central, Greater Accra" },
        { lat: 5.5500, lng: -0.2167, address: "Tema Industrial Area, Greater Accra" },
        { lat: 5.6500, lng: -0.1000, address: "East Legon, Accra" },
        { lat: 5.5833, lng: -0.2500, address: "Spintex Road, Accra" },
        { lat: 5.6167, lng: -0.1667, address: "Airport Residential Area, Accra" },
        { lat: 5.5667, lng: -0.1833, address: "Osu Castle Area, Accra" },
        { lat: 5.6333, lng: -0.1333, address: "Cantonments, Accra" },
        { lat: 5.5900, lng: -0.2100, address: "Labone Beach Resort Area, Accra" },
        { lat: 5.6700, lng: -0.0800, address: "Adenta Municipal, Greater Accra" },
        { lat: 5.5400, lng: -0.2400, address: "Ashaiman Municipality, Greater Accra" },
        { lat: 5.6800, lng: -0.0500, address: "Madina Market Area, Accra" },
        { lat: 5.5200, lng: -0.2800, address: "Nungua Traditional Area, Accra" }
      ];

      const deviceTypes: PropertyDevice['type'][] = ['smart_pillar', 'barricade', 'cctv'];
      const statuses: PropertyDevice['status'][] = ['online', 'offline', 'alert', 'maintenance'];
      const alertLevels: PropertyDevice['alertLevel'][] = ['green', 'yellow', 'red'];
      
      return ghanaLocations.map((location, index) => {
        const deviceType = deviceTypes[index % deviceTypes.length];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const alertLevel = status === 'alert' ? 'red' : 
                          status === 'maintenance' ? 'yellow' : 'green';
        
        return {
          id: `device_${index + 1}`,
          type: deviceType,
          name: `${deviceType.replace('_', ' ').toUpperCase()} ${index + 1}`,
          location,
          status,
          alertLevel,
          lastUpdate: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          owner: `Property Owner ${index + 1}`,
          deviceData: {
            battery: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 15) + 20,
            humidity: Math.floor(Math.random() * 40) + 40,
            signal: Math.floor(Math.random() * 100),
            alerts: status === 'alert' ? ['Motion Detected', 'Unauthorized Access'] : [],
            motionDetected: Math.random() > 0.7,
            intruderCount: deviceType === 'cctv' ? Math.floor(Math.random() * 5) : 0,
            waterLevel: deviceType === 'barricade' ? Math.floor(Math.random() * 100) : undefined,
            weatherCondition: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
            airQuality: Math.floor(Math.random() * 200) + 50
          }
        };
      });
    };

    const updateDevices = () => {
      setDevices(generateLiveDevices());
    };

    updateDevices();
    
    if (autoRefresh) {
      const interval = setInterval(updateDevices, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getDeviceIcon = (type: PropertyDevice['type']) => {
    switch (type) {
      case 'smart_pillar':
        return <Zap className="w-5 h-5" />;
      case 'barricade':
        return <Shield className="w-5 h-5" />;
      case 'cctv':
        return <Camera className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: PropertyDevice['status'], alertLevel: PropertyDevice['alertLevel']) => {
    if (status === 'offline') return 'bg-gray-500';
    if (alertLevel === 'red') return 'bg-red-500';
    if (alertLevel === 'yellow') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getAlertOverlayColor = (alertLevel: PropertyDevice['alertLevel']) => {
    switch (alertLevel) {
      case 'red':
        return 'bg-red-500/20 border-red-500';
      case 'yellow':
        return 'bg-yellow-500/20 border-yellow-500';
      case 'green':
        return 'bg-green-500/20 border-green-500';
    }
  };

  const filteredDevices = devices.filter(device => {
    const typeMatch = filterType === 'all' || device.type === filterType;
    const statusMatch = filterStatus === 'all' || device.status === filterStatus;
    const searchMatch = searchTerm === '' || 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && statusMatch && searchMatch;
  });

  const getStatusCounts = () => {
    return {
      total: devices.length,
      online: devices.filter(d => d.status === 'online').length,
      offline: devices.filter(d => d.status === 'offline').length,
      alerts: devices.filter(d => d.status === 'alert').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className={`bg-white dark:bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-2xl'} overflow-hidden`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Live Property Map</h1>
              <p className="text-white/80">Real-time monitoring of smart devices across Ghana</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-white">{statusCounts.online}</div>
                  <div className="text-white/80 text-sm">Online</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{statusCounts.alerts}</div>
                  <div className="text-white/80 text-sm">Alerts</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-[800px]">
        {/* Control Panel */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 p-6 overflow-y-auto">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Types</option>
                <option value="smart_pillar">Smart Pillars</option>
                <option value="barricade">Barricades</option>
                <option value="cctv">CCTV</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="alert">Alert</option>
              </select>
            </div>
          </div>

          {/* Map Controls */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Map Controls</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">View Mode</label>
                <select
                  value={mapView}
                  onChange={(e) => setMapView(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="satellite">Satellite</option>
                  <option value="street">Street</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600 dark:text-gray-300">Auto Refresh</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-3 py-1 rounded-lg text-sm ${autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                >
                  {autoRefresh ? 'ON' : 'OFF'}
                </button>
              </div>

              {autoRefresh && (
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">Refresh Interval (seconds)</label>
                  <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    min="10"
                    max="300"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Device List */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Active Devices</h3>
              <span className="text-sm text-gray-500">{filteredDevices.length} devices</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredDevices.map(device => (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border-2 ${
                    selectedDevice?.id === device.id 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                      : 'border-gray-200 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg text-white ${getStatusColor(device.status, device.alertLevel)}`}>
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.location.address}</div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status, device.alertLevel)}`}></div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span>
                    <span>{new Date(device.lastUpdate).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100 dark:bg-gray-800">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
            {/* Simulated Map Grid */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute border-gray-300 dark:border-gray-500" style={{
                  left: `${i * 5}%`,
                  top: 0,
                  bottom: 0,
                  borderLeft: '1px solid'
                }} />
              ))}
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="absolute border-gray-300 dark:border-gray-500" style={{
                  top: `${i * 6.25}%`,
                  left: 0,
                  right: 0,
                  borderTop: '1px solid'
                }} />
              ))}
            </div>

            {/* Region Label */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{mapRegion.name}</div>
                  <div className="text-sm text-gray-500">Live Monitoring Active</div>
                </div>
              </div>
            </div>

            {/* Device Markers */}
            {filteredDevices.map(device => {
              const x = ((device.location.lng - mapRegion.bounds.west) / (mapRegion.bounds.east - mapRegion.bounds.west)) * 100;
              const y = ((mapRegion.bounds.north - device.location.lat) / (mapRegion.bounds.north - mapRegion.bounds.south)) * 100;
              
              return (
                <div key={device.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  {/* Alert Overlay */}
                  {device.alertLevel === 'red' && (
                    <div className="absolute -inset-8 rounded-full animate-pulse bg-red-500/30 border-2 border-red-500"></div>
                  )}
                  
                  {/* Device Marker */}
                  <div
                    onClick={() => setSelectedDevice(device)}
                    className={`relative p-3 rounded-xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                      getStatusColor(device.status, device.alertLevel)
                    } text-white shadow-lg`}
                  >
                    {getDeviceIcon(device.type)}
                    
                    {/* Status Indicator */}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      device.status === 'online' ? 'bg-green-400' :
                      device.status === 'alert' ? 'bg-red-400 animate-pulse' :
                      device.status === 'maintenance' ? 'bg-yellow-400' :
                      'bg-gray-400'
                    }`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => {
              setDevices(prev => [...prev]); // Force refresh
            }}
            className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-900/90 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl text-white ${getStatusColor(selectedDevice.status, selectedDevice.alertLevel)}`}>
                    {getDeviceIcon(selectedDevice.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDevice.name}</h2>
                    <p className="text-gray-500">{selectedDevice.location.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              {/* Status Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${getStatusColor(selectedDevice.status, selectedDevice.alertLevel)}`}></div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="font-semibold text-gray-900 dark:text-white capitalize">{selectedDevice.status}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Battery className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-sm text-gray-500">Battery</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.battery}%</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Signal className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-500">Signal</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.signal}%</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm text-gray-500">Last Update</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-xs">
                    {new Date(selectedDevice.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Environmental Data */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Environmental Conditions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-sm text-gray-500">Temperature</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.temperature}°C</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500">Humidity</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.humidity}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Wind className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm text-gray-500">Air Quality</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.airQuality} AQI</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-sm text-gray-500">Weather</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.weatherCondition}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              {selectedDevice.deviceData.alerts && selectedDevice.deviceData.alerts.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-red-900 dark:text-red-400 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Active Alerts
                  </h3>
                  <div className="space-y-2">
                    {selectedDevice.deviceData.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-red-700 dark:text-red-400">{alert}</span>
                        <span className="text-xs text-gray-500">Now</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Device-Specific Information */}
              {selectedDevice.type === 'cctv' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-3">CCTV Monitoring</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Motion Detection</div>
                      <div className={`font-semibold ${selectedDevice.deviceData.motionDetected ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedDevice.deviceData.motionDetected ? 'Active' : 'Clear'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Detected Objects</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.intruderCount} persons</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedDevice.type === 'barricade' && selectedDevice.deviceData.waterLevel !== undefined && (
                <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-cyan-900 dark:text-cyan-400 mb-3">Barricade Status</h3>
                  <div>
                    <div className="text-sm text-gray-500">Water Level</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                        <div 
                          className="bg-cyan-500 h-3 rounded-full transition-all"
                          style={{ width: `${selectedDevice.deviceData.waterLevel}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.deviceData.waterLevel}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Owner Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Property Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Owner:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coordinates:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedDevice.location.lat.toFixed(4)}, {selectedDevice.location.lng.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Device ID:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}