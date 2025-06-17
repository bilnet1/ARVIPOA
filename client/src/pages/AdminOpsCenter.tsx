import { useState, useEffect } from "react";
import { 
  Shield, 
  Camera, 
  Zap, 
  Plane, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  MapPin,
  Phone,
  Send,
  Settings,
  Activity,
  Battery,
  Signal,
  Thermometer,
  Eye,
  Volume2,
  Navigation,
  RefreshCw,
  Filter,
  Search,
  ExternalLink,
  Target,
  Radio,
  Siren,
  MessageCircle
} from "lucide-react";

interface AlertItem {
  id: string;
  timestamp: string;
  type: 'emergency' | 'warning' | 'info';
  source: 'pillar' | 'cctv' | 'barricade' | 'air_support';
  location: string;
  message: string;
  status: 'new' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  deviceId: string;
  ownerContact?: string;
}

interface PropertyDevice {
  id: string;
  name: string;
  type: 'pillar' | 'cctv' | 'barricade' | 'drone';
  location: string;
  status: 'online' | 'offline' | 'alert' | 'maintenance';
  lastUpdate: string;
  owner: string;
  ownerPhone: string;
  battery: number;
  signal: number;
  temperature: number;
  alerts: string[];
  coordinates: { lat: number; lng: number };
}

interface LiveFeedItem {
  id: string;
  timestamp: string;
  deviceId: string;
  deviceName: string;
  event: string;
  location: string;
  severity: 'high' | 'medium' | 'low';
  details: string;
}

export default function AdminOpsCenter() {
  const [activeTab, setActiveTab] = useState<'pillar' | 'cctv' | 'barricade' | 'air_support'>('pillar');
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [devices, setDevices] = useState<PropertyDevice[]>([]);
  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<PropertyDevice | null>(null);
  const [alertFilter, setAlertFilter] = useState<'all' | 'new' | 'acknowledged'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Generate live data
  useEffect(() => {
    const generateLiveData = () => {
      // Generate devices
      const deviceTypes = [
        { type: 'pillar' as const, count: 8 },
        { type: 'cctv' as const, count: 12 },
        { type: 'barricade' as const, count: 6 },
        { type: 'drone' as const, count: 4 }
      ];

      const locations = [
        "Accra Central", "East Legon", "Airport Area", "Tema Industrial",
        "Osu Castle", "Labone", "Cantonments", "Spintex Road",
        "Adenta", "Madina", "Nungua", "Ashaiman"
      ];

      const newDevices: PropertyDevice[] = [];
      let deviceCounter = 1;

      deviceTypes.forEach(({ type, count }) => {
        for (let i = 0; i < count; i++) {
          const location = locations[Math.floor(Math.random() * locations.length)];
          const status = Math.random() > 0.8 ? 'alert' : Math.random() > 0.1 ? 'online' : 'offline';
          
          newDevices.push({
            id: `${type}_${deviceCounter}`,
            name: `${type.toUpperCase()} ${deviceCounter}`,
            type,
            location,
            status,
            lastUpdate: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            owner: `Property Owner ${deviceCounter}`,
            ownerPhone: `+233${Math.floor(Math.random() * 900000000) + 100000000}`,
            battery: Math.floor(Math.random() * 100),
            signal: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 15) + 20,
            alerts: status === 'alert' ? ['Motion Detected', 'Unauthorized Access'] : [],
            coordinates: {
              lat: 5.6037 + (Math.random() - 0.5) * 0.5,
              lng: -0.1870 + (Math.random() - 0.5) * 0.5
            }
          });
          deviceCounter++;
        }
      });

      setDevices(newDevices);

      // Generate alerts
      const alertTypes = ['Motion detected', 'Battery low', 'Signal lost', 'Unauthorized access', 'System error'];
      const newAlerts: AlertItem[] = [];

      for (let i = 0; i < 15; i++) {
        const device = newDevices[Math.floor(Math.random() * newDevices.length)];
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        newAlerts.push({
          id: `alert_${i + 1}`,
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          type: Math.random() > 0.7 ? 'emergency' : Math.random() > 0.4 ? 'warning' : 'info',
          source: device.type as any,
          location: device.location,
          message: `${alertType} at ${device.name}`,
          status: Math.random() > 0.6 ? 'new' : Math.random() > 0.3 ? 'acknowledged' : 'resolved',
          priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          deviceId: device.id,
          ownerContact: device.ownerPhone
        });
      }

      setAlerts(newAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

      // Generate live feed
      const events = ['Motion detected', 'Access granted', 'Patrol completed', 'Maintenance check', 'Alert triggered'];
      const newLiveFeed: LiveFeedItem[] = [];

      for (let i = 0; i < 20; i++) {
        const device = newDevices[Math.floor(Math.random() * newDevices.length)];
        const event = events[Math.floor(Math.random() * events.length)];
        
        newLiveFeed.push({
          id: `feed_${i + 1}`,
          timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
          deviceId: device.id,
          deviceName: device.name,
          event,
          location: device.location,
          severity: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
          details: `${event} reported from ${device.location} sector`
        });
      }

      setLiveFeed(newLiveFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    };

    generateLiveData();
    
    if (autoRefresh) {
      const interval = setInterval(generateLiveData, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'pillar': return <Zap className="w-5 h-5" />;
      case 'cctv': return <Camera className="w-5 h-5" />;
      case 'barricade': return <Shield className="w-5 h-5" />;
      case 'air_support': return <Plane className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getDevicesByType = (type: string) => {
    return devices.filter(device => 
      type === 'air_support' ? device.type === 'drone' : device.type === type
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500 bg-green-100';
      case 'alert': return 'text-red-500 bg-red-100';
      case 'offline': return 'text-gray-500 bg-gray-100';
      case 'maintenance': return 'text-yellow-500 bg-yellow-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'text-red-600 bg-red-100 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleQuickAction = (action: string, device?: PropertyDevice) => {
    switch (action) {
      case 'dispatch_drone':
        alert(`Dispatching drone to ${device?.location || 'selected location'}...`);
        break;
      case 'sound_alarm':
        alert(`Sounding alarm at ${device?.name || 'selected device'}...`);
        break;
      case 'contact_owner':
        if (device?.ownerPhone) {
          alert(`Contacting owner at ${device.ownerPhone}...`);
        } else {
          alert('Owner contact information not available');
        }
        break;
      case 'emergency_response':
        alert('Emergency response team dispatched...');
        break;
      default:
        alert(`Executing ${action}...`);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => 
    alertFilter === 'all' || alert.status === alertFilter
  );

  const filteredDevices = getDevicesByType(activeTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">ARVIPOA Operations Center</h1>
                <p className="text-white/80">Real-time monitoring and control dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{devices.filter(d => d.status === 'online').length}</div>
                    <div className="text-white/80 text-sm">Online</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{devices.filter(d => d.status === 'alert').length}</div>
                    <div className="text-white/80 text-sm">Alerts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{devices.filter(d => d.status === 'offline').length}</div>
                    <div className="text-white/80 text-sm">Offline</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{devices.length}</div>
                    <div className="text-white/80 text-sm">Total</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-3 rounded-xl transition-colors ${
                  autoRefresh ? 'bg-green-500/20 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <RefreshCw className={`w-6 h-6 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {(['pillar', 'cctv', 'barricade', 'air_support'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-[#D4AF37] text-[#D4AF37]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {getTabIcon(tab)}
                      <span className="capitalize">{tab.replace('_', ' ')}</span>
                      <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full text-xs">
                        {getDevicesByType(tab).length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Device Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDevices.map(device => (
                    <div
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-[#D4AF37]/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(device.status)}`}>
                            {getTabIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                            <p className="text-sm text-gray-500">{device.location}</p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : device.status === 'alert' ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500">Battery</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{device.battery}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Signal</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{device.signal}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Temp</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{device.temperature}°C</div>
                        </div>
                      </div>

                      {device.alerts.length > 0 && (
                        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                            {device.alerts.length} Active Alert{device.alerts.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      )}

                      <div className="mt-3 text-xs text-gray-500">
                        Last update: {new Date(device.lastUpdate).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Property Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Property Feed</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {liveFeed.map(item => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        item.severity === 'high' ? 'bg-red-500' :
                        item.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.event}</h4>
                          <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.details}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{item.location}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{item.deviceName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alert Log Panel */}
          <div className="col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alert Log</h2>
                  <Bell className="w-6 h-6 text-[#D4AF37]" />
                </div>
                
                <div className="flex space-x-2">
                  {(['all', 'new', 'acknowledged'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setAlertFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        alertFilter === filter
                          ? 'bg-[#D4AF37] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                {filteredAlerts.map(alert => (
                  <div key={alert.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
                          {alert.type.toUpperCase()}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mt-2">{alert.message}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        
                        {alert.status === 'new' && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="mt-2 text-xs text-[#D4AF37] hover:text-[#B8860B] font-medium"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                      
                      <div className={`w-2 h-2 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-500' :
                        alert.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleQuickAction('dispatch_drone', selectedDevice)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Plane className="w-4 h-4" />
                    <span>Dispatch Drone</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('sound_alarm', selectedDevice)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <Siren className="w-4 h-4" />
                    <span>Sound Alarm</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('contact_owner', selectedDevice)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Owner</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('emergency_response')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    <span>Emergency Response</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${getStatusColor(selectedDevice.status)}`}>
                    {getTabIcon(selectedDevice.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDevice.name}</h2>
                    <p className="text-gray-500">{selectedDevice.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              {/* Device Status Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${getStatusColor(selectedDevice.status).split(' ')[1]}`}></div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="font-semibold text-gray-900 dark:text-white capitalize">{selectedDevice.status}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Battery className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-sm text-gray-500">Battery</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.battery}%</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Signal className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-500">Signal</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.signal}%</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-sm text-gray-500">Temperature</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedDevice.temperature}°C</div>
                </div>
              </div>

              {/* Active Alerts */}
              {selectedDevice.alerts.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-red-900 dark:text-red-400 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Active Alerts
                  </h3>
                  <div className="space-y-2">
                    {selectedDevice.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-red-700 dark:text-red-400">{alert}</span>
                        <span className="text-xs text-gray-500">Now</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Property Owner</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.ownerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coordinates:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedDevice.coordinates.lat.toFixed(4)}, {selectedDevice.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions for Selected Device */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleQuickAction('sound_alarm', selectedDevice)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Sound Alarm</span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('contact_owner', selectedDevice)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Owner</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}