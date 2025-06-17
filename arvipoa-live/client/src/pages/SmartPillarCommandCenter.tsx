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
  MessageCircle,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Map,
  BarChart3,
  Wifi,
  Droplets,
  Flame,
  Home
} from "lucide-react";
import smartPillarImage from "@assets/smart pillar on ground.png";
import smartBoundaryPillar from "@assets/2.jpg";
import intelligentSecurity from "@assets/3.jpg";
import emergencyDetection from "@assets/4.jpg";
import mailDelivery from "@assets/5.jpg";
import weatherMonitoring from "@assets/6.jpg";
import gpsMapping from "@assets/7.jpg";
import evCharging from "@assets/8.jpg";
import GoogleMap from "../components/GoogleMap";

interface AlertItem {
  id: string;
  timestamp: string;
  type: 'distress_call' | 'mobile_phone' | 'loud_music' | 'fire_detected';
  location: string;
  message: string;
  status: 'new' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  time: string;
}

interface UtilityStatus {
  name: string;
  status: 'normal' | 'leakage' | 'error' | 'rfid';
  icon: string;
}

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

export default function SmartPillarCommandCenter() {
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [utilities, setUtilities] = useState<UtilityStatus[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Smart Pillar Product Data
  const smartPillarProducts = [
    {
      id: 1,
      name: "Smart Boundary Pillar Pro",
      image: smartBoundaryPillar,
      price: 2499.99,
      originalPrice: 2999.99,
      rating: 4.8,
      reviews: 234,
      category: "Security",
      features: ["24/7 Monitoring", "GPS Tracking", "Alert System", "Weather Resistant"],
      inStock: true,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Intelligent Security Hub",
      image: intelligentSecurity,
      price: 1899.99,
      originalPrice: 2199.99,
      rating: 4.9,
      reviews: 189,
      category: "Security",
      features: ["AI Detection", "Night Vision", "Mobile Alerts", "Cloud Storage"],
      inStock: true,
      badge: "Editor's Choice"
    },
    {
      id: 3,
      name: "Emergency Detection System",
      image: emergencyDetection,
      price: 3299.99,
      originalPrice: 3799.99,
      rating: 4.7,
      reviews: 156,
      category: "Emergency",
      features: ["Fire Detection", "Gas Sensors", "Emergency Alerts", "Auto Response"],
      inStock: true,
      badge: "Premium"
    },
    {
      id: 4,
      name: "Smart Mail Delivery Hub",
      image: mailDelivery,
      price: 899.99,
      originalPrice: 1099.99,
      rating: 4.6,
      reviews: 298,
      category: "Communication",
      features: ["Secure Delivery", "Digital Notifications", "Package Tracking", "Theft Protection"],
      inStock: true,
      badge: "Popular"
    },
    {
      id: 5,
      name: "Weather Monitoring Station",
      image: weatherMonitoring,
      price: 1599.99,
      originalPrice: 1899.99,
      rating: 4.5,
      reviews: 123,
      category: "Environment",
      features: ["Real-time Data", "Weather Alerts", "Climate Control", "Data Analytics"],
      inStock: false,
      badge: "Coming Soon"
    },
    {
      id: 6,
      name: "GPS Smart Mapping Device",
      image: gpsMapping,
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.8,
      reviews: 267,
      category: "Navigation",
      features: ["Precise Location", "Route Planning", "Geofencing", "Mobile Integration"],
      inStock: true,
      badge: "New"
    },
    {
      id: 7,
      name: "EV Charging Smart Pillar",
      image: evCharging,
      price: 4999.99,
      originalPrice: 5999.99,
      rating: 4.9,
      reviews: 87,
      category: "Energy",
      features: ["Fast Charging", "Multiple Connectors", "Payment System", "Usage Analytics"],
      inStock: true,
      badge: "Eco-Friendly"
    }
  ];

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate alert data matching the mockup
  useEffect(() => {
    const mockAlerts: AlertItem[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'distress_call',
        location: '06 LAKESIDE ST',
        message: 'DISTRESS CALL',
        status: 'new',
        priority: 'high',
        time: '10:34 AM'
      },
      {
        id: '2',
        timestamp: new Date().toISOString(),
        type: 'mobile_phone',
        location: '123 MAIN RD',
        message: 'MOBILE PHONE',
        status: 'new',
        priority: 'medium',
        time: '10:28 AM'
      },
      {
        id: '3',
        timestamp: new Date().toISOString(),
        type: 'loud_music',
        location: '456 RIDGE WAY',
        message: 'LOUD MUSIC',
        status: 'new',
        priority: 'medium',
        time: '10:22 AM'
      },
      {
        id: '4',
        timestamp: new Date().toISOString(),
        type: 'fire_detected',
        location: '456 RIDGE WAY',
        message: 'FIRE DETECTED',
        status: 'new',
        priority: 'high',
        time: '10:10 AM'
      }
    ];

    const mockUtilities: UtilityStatus[] = [
      { name: 'NORMAL', status: 'normal', icon: 'check' },
      { name: 'NORMAL', status: 'normal', icon: 'check' },
      { name: 'LEAKAGE', status: 'leakage', icon: 'warning' },
      { name: 'ERROR', status: 'error', icon: 'x' },
      { name: 'RFID', status: 'rfid', icon: 'radio' }
    ];

    setAlerts(mockAlerts);
    setUtilities(mockUtilities);

    // Generate authentic Ghana property markers
    const mockMapMarkers: MapMarker[] = [
      {
        id: 'pillar_accra_1',
        position: { lat: 5.6037, lng: -0.1870 },
        title: 'Smart Pillar - Accra Central',
        type: 'smart_pillar',
        status: 'alert',
        info: {
          location: '06 Lakeside Street, Accra Central',
          owner: 'Ghana Commercial Bank',
          lastUpdate: '10:34 AM',
          alerts: ['Distress Call Detected', 'Unauthorized Access']
        }
      },
      {
        id: 'cctv_tema_1',
        position: { lat: 5.6698, lng: -0.0140 },
        title: 'CCTV Camera - Tema Port',
        type: 'cctv',
        status: 'online',
        info: {
          location: 'Tema Industrial Area, Port Authority',
          owner: 'Ghana Ports & Harbours Authority',
          lastUpdate: '10:35 AM'
        }
      },
      {
        id: 'barricade_legon_1',
        position: { lat: 5.6507, lng: -0.1866 },
        title: 'Defense Barricade - East Legon',
        type: 'barricade',
        status: 'online',
        info: {
          location: 'East Legon Residential Area',
          owner: 'East Legon Property Owners Association',
          lastUpdate: '10:32 AM'
        }
      },
      {
        id: 'pillar_spintex_1',
        position: { lat: 5.5833, lng: -0.2500 },
        title: 'Smart Pillar - Spintex Road',
        type: 'smart_pillar',
        status: 'alert',
        info: {
          location: '123 Main Road, Spintex',
          owner: 'Spintex Commercial District',
          lastUpdate: '10:28 AM',
          alerts: ['Mobile Phone Detected']
        }
      },
      {
        id: 'cctv_airport_1',
        position: { lat: 5.6167, lng: -0.1667 },
        title: 'CCTV Camera - Airport Residential',
        type: 'cctv',
        status: 'online',
        info: {
          location: 'Airport Residential Area, Accra',
          owner: 'Airport City Property Management',
          lastUpdate: '10:35 AM'
        }
      },
      {
        id: 'pillar_ridge_1',
        position: { lat: 5.5900, lng: -0.2100 },
        title: 'Smart Pillar - Ridge Area',
        type: 'smart_pillar',
        status: 'alert',
        info: {
          location: '456 Ridge Way, Labone',
          owner: 'Ridge Property Holdings',
          lastUpdate: '10:22 AM',
          alerts: ['Loud Music', 'Fire Detected']
        }
      }
    ];

    setMapMarkers(mockMapMarkers);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'distress_call': return '☎';
      case 'mobile_phone': return '📱';
      case 'loud_music': return '🎵';
      case 'fire_detected': return '🔥';
      default: return '⚠';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'distress_call': return 'bg-red-500';
      case 'mobile_phone': return 'bg-red-500';
      case 'loud_music': return 'bg-red-500';
      case 'fire_detected': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getUtilityStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'leakage': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'rfid': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getUtilityIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'leakage': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'rfid': return <Radio className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-400">ARVIPOA</h1>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-sm text-gray-300">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-800/50 border-r border-gray-700/50 min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
              { id: 'marketplace', label: 'Smart Pillar Store', icon: <ShoppingCart className="w-5 h-5" /> },
              { id: 'map', label: 'Map', icon: <Map className="w-5 h-5" /> },
              { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
              { id: 'status', label: 'Status', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'utilities', label: 'Utilities', icon: <Settings className="w-5 h-5" /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  selectedNav === item.id 
                    ? 'bg-green-600/30 text-green-400 border-l-4 border-green-400' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedNav === 'dashboard' && (
            <div className="grid grid-cols-12 gap-6 h-full">
              {/* Left Column - Pillar Status */}
              <div className="col-span-4 space-y-6">
                {/* Pillar Image */}
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                  <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg p-4 flex items-center justify-center mb-4">
                    <img 
                      src={smartPillarImage} 
                      alt="Smart Pillar" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback if image fails */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-48 bg-gradient-to-b from-gray-300 via-white to-red-500 rounded-lg shadow-2xl relative">
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full"></div>
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  <h3 className="text-center text-lg font-bold text-white mb-6">SMART BOUNDARY PILLAR</h3>
                </div>

                {/* Alerts Section */}
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Alerts</h3>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className={`w-8 h-8 ${getAlertColor(alert.type)} rounded-full flex items-center justify-center text-sm`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{alert.message}</div>
                          <div className="text-sm text-gray-400">{alert.location}</div>
                        </div>
                        <div className="text-sm text-gray-400">{alert.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column - Live Map */}
              <div className="col-span-5">
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-4">LIVE MAP - Greater Accra Region</h3>
                  <GoogleMap 
                    height="320px"
                    center={{ lat: 5.6037, lng: -0.1870 }}
                    zoom={12}
                    markers={mapMarkers}
                    onMarkerClick={(marker) => setSelectedMarker(marker)}
                  />

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Alerts</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">☎</div>
                          <div>
                            <div className="text-sm font-medium text-white">DISTRESS CALL</div>
                            <div className="text-xs text-gray-400">06 LAKESIDE ST</div>
                          </div>
                          <div className="text-xs text-gray-400">10:34 AM</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">📱</div>
                          <div>
                            <div className="text-sm font-medium text-white">MOBILE PHONE</div>
                            <div className="text-xs text-gray-400">123 MAIN RD</div>
                          </div>
                          <div className="text-xs text-gray-400">10:28 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Utilities System */}
              <div className="col-span-3">
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-6">Utilities System</h3>
                  <div className="space-y-4">
                    {utilities.map((utility, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={getUtilityStatusColor(utility.status)}>
                            {getUtilityIcon(utility.status)}
                          </div>
                          <span className={`font-medium ${getUtilityStatusColor(utility.status)}`}>
                            {utility.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional status indicators matching mockup */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-medium">NORMAL</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-medium">NORMAL</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">LEAKAGE</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 font-medium">ERROR</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Radio className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 font-medium">RFID</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedNav === 'map' && (
            <div className="grid grid-cols-12 gap-6 h-full">
              {/* Enhanced Map Section */}
              <div className="col-span-8 bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Interactive Satellite Map</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400 font-medium">LIVE TRACKING</span>
                    </div>
                    <button className="px-3 py-1 bg-[#D4AF37] text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors">
                      Fullscreen
                    </button>
                  </div>
                </div>
                
                <GoogleMap 
                  height="500px"
                  center={{ lat: 5.6037, lng: -0.1870 }}
                  zoom={11}
                  markers={mapMarkers}
                  onMarkerClick={(marker) => setSelectedMarker(marker)}
                />
                
                {/* Map Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                      <RefreshCw className="w-4 h-4 text-gray-300" />
                      <span className="text-sm text-gray-300">Refresh</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                      <Target className="w-4 h-4 text-gray-300" />
                      <span className="text-sm text-gray-300">Center</span>
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last Updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              {/* Map Statistics Panel */}
              <div className="col-span-4 space-y-6">
                {/* Zone Statistics */}
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Zone Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                        <span className="text-white font-medium">Safe Zones</span>
                      </div>
                      <span className="text-green-400 font-bold">4</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white font-medium">Alert Areas</span>
                      </div>
                      <span className="text-red-400 font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-white font-medium">Monitoring</span>
                      </div>
                      <span className="text-yellow-400 font-bold">6</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-white font-medium">Smart Pillars</span>
                      </div>
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                  </div>
                </div>
                
                {/* Coverage Analysis */}
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Coverage Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Area Coverage</span>
                        <span className="text-white font-semibold">87%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Device Connectivity</span>
                        <span className="text-white font-semibold">94%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Response Time</span>
                        <span className="text-white font-semibold">2.3s</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selected Marker Info */}
                {selectedMarker && (
                  <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Device Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm">Device:</span>
                        <p className="text-white font-medium">{selectedMarker.title}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Location:</span>
                        <p className="text-white">{selectedMarker.info.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Owner:</span>
                        <p className="text-white">{selectedMarker.info.owner}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Status:</span>
                        <p className={`font-medium ${
                          selectedMarker.status === 'online' ? 'text-green-400' :
                          selectedMarker.status === 'alert' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {selectedMarker.status.toUpperCase()}
                        </p>
                      </div>
                      {selectedMarker.info.alerts && selectedMarker.info.alerts.length > 0 && (
                        <div>
                          <span className="text-gray-400 text-sm">Active Alerts:</span>
                          <div className="mt-1 space-y-1">
                            {selectedMarker.info.alerts.map((alert, index) => (
                              <div key={index} className="text-red-400 text-sm">• {alert}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedNav === 'marketplace' && (
            <div className="space-y-6">
              {/* Marketplace Header */}
              <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">ARVIPOA Smart Pillar Store</h2>
                    <p className="text-orange-100">Premium security solutions for your property protection needs</p>
                  </div>
                  <div className="text-right text-white">
                    <div className="text-sm opacity-90">Free delivery on orders over</div>
                    <div className="text-2xl font-bold">$2,000</div>
                  </div>
                </div>
              </div>

              {/* Product Categories */}
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {['All Products', 'Security', 'Emergency', 'Communication', 'Environment', 'Navigation', 'Energy'].map((category) => (
                  <button
                    key={category}
                    className="px-6 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap border border-gray-600"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {smartPillarProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    {/* Product Badge */}
                    {product.badge && (
                      <div className="absolute z-10 top-3 left-3">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{product.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${(product.originalPrice - product.price).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Stock Status & Actions */}
                      <div className="space-y-2">
                        {product.inStock ? (
                          <>
                            <div className="text-sm text-green-600 font-semibold">✓ In Stock</div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-gray-500">Out of Stock</div>
                            <button className="w-full bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed">
                              Notify When Available
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Reviews Section */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Customer Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "John K.",
                      rating: 5,
                      review: "The Smart Boundary Pillar Pro exceeded our expectations. Installation was seamless and the monitoring capabilities are outstanding.",
                      product: "Smart Boundary Pillar Pro"
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      review: "Great value for money. The emergency detection system has already prevented two potential incidents on our property.",
                      product: "Emergency Detection System"
                    }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white font-semibold ml-2">{review.name}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">"{review.review}"</p>
                      <p className="text-gray-500 text-xs">Verified purchase: {review.product}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedNav === 'alerts' && (
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Alert Management</h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${getAlertColor(alert.type)} rounded-full flex items-center justify-center text-lg`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <div className="text-lg font-bold text-white">{alert.message}</div>
                            <div className="text-gray-400">{alert.location}</div>
                            <div className="text-sm text-gray-500">{alert.time}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Acknowledge
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Respond
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedNav === 'status' && (
            <div className="grid grid-cols-2 gap-6 h-full">
              <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                      <span className="text-white font-medium">Smart Pillars</span>
                    </div>
                    <span className="text-green-400 font-bold">3/3 Online</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <span className="text-white font-medium">CCTV Cameras</span>
                    </div>
                    <span className="text-yellow-400 font-bold">5/6 Online</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                      <span className="text-white font-medium">Alert System</span>
                    </div>
                    <span className="text-red-400 font-bold">2 Alerts</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Performance Metrics</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>Response Time</span>
                      <span>2.3s</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div className="bg-green-400 h-3 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>System Load</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div className="bg-yellow-400 h-3 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>Network Quality</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div className="bg-green-400 h-3 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedNav === 'utilities' && (
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Utilities Management</h2>
                <div className="grid grid-cols-3 gap-6">
                  {utilities.map((utility, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        utility.status === 'normal' ? 'bg-green-500' :
                        utility.status === 'leakage' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {getUtilityIcon(utility.status)}
                      </div>
                      <h3 className={`font-bold text-lg mb-2 ${getUtilityStatusColor(utility.status)}`}>
                        {utility.name}
                      </h3>
                      <p className="text-gray-400 capitalize">{utility.status}</p>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}