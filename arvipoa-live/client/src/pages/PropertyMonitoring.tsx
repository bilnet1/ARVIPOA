import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Camera,
  Battery,
  Wifi,
  Volume2,
  Car,
  Users,
  Clock
} from "lucide-react";

interface IoTDevice {
  id: string;
  name: string;
  type: "smart_pillar" | "river_barricade" | "security_camera" | "environmental_sensor";
  location: string;
  status: "online" | "offline" | "maintenance";
  batteryLevel: number;
  lastUpdate: string;
  data: {
    temperature?: number;
    humidity?: number;
    waterLevel?: number;
    motionDetected?: boolean;
    soundLevel?: number;
    airQuality?: number;
    vibration?: boolean;
    gunshot?: boolean;
  };
}

interface SecurityAlert {
  id: string;
  type: "motion" | "gunshot" | "intrusion" | "water_level" | "device_offline";
  severity: "low" | "medium" | "high" | "critical";
  deviceId: string;
  deviceName: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  location: string;
}

export default function PropertyMonitoring() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();

  const [devices] = useState<IoTDevice[]>([
    {
      id: "sp001",
      name: "Smart Pillar Alpha",
      type: "smart_pillar",
      location: "Akosombo Riverside Plot - North Boundary",
      status: "online",
      batteryLevel: 87,
      lastUpdate: "2024-02-25T14:23:00Z",
      data: {
        temperature: 28.5,
        humidity: 65,
        motionDetected: false,
        soundLevel: 35,
        vibration: false,
        gunshot: false
      }
    },
    {
      id: "rb001", 
      name: "River Barricade Beta",
      type: "river_barricade",
      location: "Akosombo River Access Point",
      status: "online",
      batteryLevel: 92,
      lastUpdate: "2024-02-25T14:22:30Z",
      data: {
        waterLevel: 2.3,
        temperature: 26.8,
        motionDetected: true,
        soundLevel: 42
      }
    },
    {
      id: "sc001",
      name: "Security Camera Gamma",
      type: "security_camera",
      location: "East Legon Commercial Building - Main Entrance",
      status: "online",
      batteryLevel: 78,
      lastUpdate: "2024-02-25T14:24:15Z",
      data: {
        motionDetected: true,
        soundLevel: 28
      }
    },
    {
      id: "es001",
      name: "Environmental Sensor Delta",
      type: "environmental_sensor",
      location: "Tema Residential House - Garden",
      status: "maintenance",
      batteryLevel: 45,
      lastUpdate: "2024-02-25T13:45:12Z",
      data: {
        temperature: 29.2,
        humidity: 72,
        airQuality: 85,
        soundLevel: 31
      }
    }
  ]);

  const [alerts] = useState<SecurityAlert[]>([
    {
      id: "alert001",
      type: "motion",
      severity: "medium",
      deviceId: "rb001",
      deviceName: "River Barricade Beta",
      message: "Motion detected near river access point. Possible unauthorized entry attempt.",
      timestamp: "2024-02-25T14:20:00Z",
      acknowledged: false,
      location: "Akosombo River Access Point"
    },
    {
      id: "alert002",
      type: "water_level",
      severity: "high",
      deviceId: "rb001",
      deviceName: "River Barricade Beta",
      message: "Water level rising above normal threshold. Potential flooding risk detected.",
      timestamp: "2024-02-25T13:45:00Z",
      acknowledged: false,
      location: "Akosombo River Access Point"
    },
    {
      id: "alert003",
      type: "device_offline",
      severity: "low",
      deviceId: "es001",
      deviceName: "Environmental Sensor Delta",
      message: "Device entered maintenance mode. Scheduled maintenance in progress.",
      timestamp: "2024-02-25T13:30:00Z",
      acknowledged: true,
      location: "Tema Residential House"
    },
    {
      id: "alert004",
      type: "motion",
      severity: "medium",
      deviceId: "sc001",
      deviceName: "Security Camera Gamma",
      message: "Motion detected at main entrance. Multiple individuals identified.",
      timestamp: "2024-02-25T14:15:00Z",
      acknowledged: true,
      location: "East Legon Commercial Building"
    }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smart_pillar":
        return <Zap className="w-6 h-6" />;
      case "river_barricade":
        return <Droplets className="w-6 h-6" />;
      case "security_camera":
        return <Camera className="w-6 h-6" />;
      case "environmental_sensor":
        return <Wind className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-600 bg-green-100";
      case "offline":
        return "text-red-600 bg-red-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "motion":
        return <Users className="w-5 h-5" />;
      case "gunshot":
        return <Volume2 className="w-5 h-5" />;
      case "water_level":
        return <Droplets className="w-5 h-5" />;
      case "device_offline":
        return <Wifi className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const onlineDevices = devices.filter(d => d.status === "online").length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;
  const criticalAlerts = alerts.filter(a => a.severity === "critical" && !a.acknowledged).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-16 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-48 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-green-500/5 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-48 right-1/3 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl animate-float delay-3000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-4xl font-bold text-gradient-gold mb-3">Smart Infrastructure Monitoring</h1>
              <p className="text-gray-600 text-lg">Real-time IoT device monitoring and advanced security analytics</p>
            </div>
            <div className="flex items-center space-x-8 animate-fade-in-right">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-4 text-center hover-lift">
                  <div className="text-3xl font-bold text-green-600 mb-1">{onlineDevices}</div>
                  <div className="text-sm text-gray-500 font-medium">Online Devices</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-4 text-center hover-lift">
                  <div className="text-3xl font-bold text-red-600 mb-1">{activeAlerts}</div>
                  <div className="text-sm text-gray-500 font-medium">Active Alerts</div>
                  <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "devices", label: "Devices", icon: Zap },
              { id: "alerts", label: "Security Alerts", icon: Shield },
              { id: "environmental", label: "Environmental", icon: Thermometer }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeView === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                  {tab.id === "alerts" && activeAlerts > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeAlerts}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeView === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Devices</p>
                    <p className="text-3xl font-bold text-gray-900">{devices.length}</p>
                  </div>
                  <Activity className="w-12 h-12 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">IoT monitoring network</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Online Devices</p>
                    <p className="text-3xl font-bold text-gray-900">{onlineDevices}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Currently active</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                    <p className="text-3xl font-bold text-gray-900">{activeAlerts}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Require attention</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Battery</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(devices.reduce((sum, d) => sum + d.batteryLevel, 0) / devices.length)}%
                    </p>
                  </div>
                  <Battery className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Power levels</p>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Security Events</h2>
              <div className="space-y-4">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)} ${!alert.acknowledged ? 'ring-2 ring-offset-2 ring-red-200' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h3 className="font-medium">{alert.message}</h3>
                          <p className="text-sm opacity-75 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {alert.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm opacity-75">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                        {!alert.acknowledged && (
                          <span className="block text-xs font-medium mt-1">Unacknowledged</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Status Grid */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Device Network Status</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {devices.map((device) => (
                  <div key={device.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(device.status)}`}>
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{device.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {device.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Battery className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{device.batteryLevel}%</span>
                        </div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                          {device.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {device.data.temperature && (
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 text-red-400 mr-2" />
                          <span>{device.data.temperature}°C</span>
                        </div>
                      )}
                      {device.data.humidity && (
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 text-blue-400 mr-2" />
                          <span>{device.data.humidity}%</span>
                        </div>
                      )}
                      {device.data.waterLevel && (
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 text-blue-600 mr-2" />
                          <span>{device.data.waterLevel}m</span>
                        </div>
                      )}
                      {device.data.soundLevel && (
                        <div className="flex items-center">
                          <Volume2 className="w-4 h-4 text-purple-400 mr-2" />
                          <span>{device.data.soundLevel}dB</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Last update: {new Date(device.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "devices" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">IoT Device Management</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Add New Device
              </button>
            </div>

            <div className="grid gap-6">
              {devices.map((device) => (
                <div key={device.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-xl ${getStatusColor(device.status)}`}>
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{device.name}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {device.location}
                          </p>
                        </div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(device.status)}`}>
                          {device.status}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Battery</span>
                            <Battery className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-lg font-bold text-gray-900">{device.batteryLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${device.batteryLevel > 50 ? 'bg-green-500' : device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${device.batteryLevel}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {device.data.temperature && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">Temperature</span>
                              <Thermometer className="w-4 h-4 text-red-400" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">{device.data.temperature}°C</span>
                          </div>
                        )}

                        {device.data.humidity && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">Humidity</span>
                              <Droplets className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">{device.data.humidity}%</span>
                          </div>
                        )}

                        {device.data.waterLevel && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">Water Level</span>
                              <Droplets className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">{device.data.waterLevel}m</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Device ID: {device.id}</span>
                          <span>Last update: {new Date(device.lastUpdate).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "alerts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Security Alert Center</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Mark All Read
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Configure Alerts
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                  alert.severity === "critical" ? "border-red-500" :
                  alert.severity === "high" ? "border-orange-500" :
                  alert.severity === "medium" ? "border-yellow-500" : "border-blue-500"
                } ${!alert.acknowledged ? 'ring-2 ring-gray-200' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900">{alert.type.replace('_', ' ').toUpperCase()}</h3>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          {!alert.acknowledged && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {alert.location}
                          </span>
                          <span className="flex items-center">
                            <Activity className="w-4 h-4 mr-1" />
                            {alert.deviceName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!alert.acknowledged && (
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                          Acknowledge
                        </button>
                      )}
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "environmental" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Environmental Monitoring</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Temperature</h3>
                  <Thermometer className="w-6 h-6 text-red-500" />
                </div>
                <div className="space-y-3">
                  {devices.filter(d => d.data.temperature).map(device => (
                    <div key={device.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{device.name}</span>
                      <span className="font-medium">{device.data.temperature}°C</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Humidity</h3>
                  <Droplets className="w-6 h-6 text-blue-500" />
                </div>
                <div className="space-y-3">
                  {devices.filter(d => d.data.humidity).map(device => (
                    <div key={device.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{device.name}</span>
                      <span className="font-medium">{device.data.humidity}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Water Levels</h3>
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-3">
                  {devices.filter(d => d.data.waterLevel).map(device => (
                    <div key={device.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{device.name}</span>
                      <span className="font-medium">{device.data.waterLevel}m</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}