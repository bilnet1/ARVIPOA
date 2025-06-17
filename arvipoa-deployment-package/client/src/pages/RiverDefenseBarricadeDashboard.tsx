import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Droplets, 
  AlertTriangle, 
  Eye, 
  Thermometer, 
  Wind, 
  Activity, 
  Lock,
  Unlock,
  Users,
  MapPin,
  Clock,
  Battery,
  Wifi,
  Camera,
  Waves,
  Zap
} from 'lucide-react';

interface SensorData {
  waterLevel: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  batteryLevel: number;
  networkStatus: 'online' | 'offline';
}

interface BiometricGate {
  id: string;
  location: string;
  status: 'open' | 'closed' | 'scanning';
  lastAccess: string;
  authorizedPersons: number;
}

interface IntruderAlert {
  id: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  description: string;
  status: 'active' | 'resolved';
}

export default function RiverDefenseBarricadeDashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    waterLevel: 3.2,
    temperature: 28.5,
    windSpeed: 12.3,
    humidity: 65,
    visibility: 8.7,
    batteryLevel: 87,
    networkStatus: 'online'
  });

  const [biometricGates, setBiometricGates] = useState<BiometricGate[]>([
    {
      id: 'BG-001',
      location: 'Main Entrance',
      status: 'closed',
      lastAccess: '2 minutes ago',
      authorizedPersons: 12
    },
    {
      id: 'BG-002',
      location: 'Service Area',
      status: 'scanning',
      lastAccess: 'Just now',
      authorizedPersons: 8
    },
    {
      id: 'BG-003',
      location: 'Emergency Exit',
      status: 'open',
      lastAccess: '15 minutes ago',
      authorizedPersons: 3
    }
  ]);

  const [intruderAlerts, setIntruderAlerts] = useState<IntruderAlert[]>([
    {
      id: 'AL-001',
      location: 'Perimeter Zone 2',
      severity: 'high',
      timestamp: '5 minutes ago',
      description: 'Unauthorized vessel detected approaching barrier',
      status: 'active'
    },
    {
      id: 'AL-002',
      location: 'North Bank',
      severity: 'medium',
      timestamp: '12 minutes ago',
      description: 'Motion detected near restricted area',
      status: 'active'
    },
    {
      id: 'AL-003',
      location: 'South Checkpoint',
      severity: 'low',
      timestamp: '1 hour ago',
      description: 'Unidentified person lingering at checkpoint',
      status: 'resolved'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        waterLevel: Number((prev.waterLevel + (Math.random() - 0.5) * 0.1).toFixed(1)),
        temperature: Number((prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)),
        windSpeed: Number((prev.windSpeed + (Math.random() - 0.5) * 0.5).toFixed(1)),
        humidity: Math.max(40, Math.min(90, prev.humidity + Math.floor((Math.random() - 0.5) * 2))),
        batteryLevel: Math.max(20, Math.min(100, prev.batteryLevel + Math.floor((Math.random() - 0.5) * 1)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getGateStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'scanning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-green-800/50 to-gray-800/50 backdrop-blur-md border-b border-green-500/30 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  River Defense Barricade Dashboard
                </h1>
                <p className="text-gray-400">Akosombo River Defense System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${sensorData.networkStatus === 'online' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-sm text-gray-300">{sensorData.networkStatus}</span>
              </div>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Environmental Sensors Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              title: 'Water Level',
              value: `${sensorData.waterLevel}m`,
              icon: Waves,
              gradient: 'from-blue-500 to-cyan-600',
              trend: sensorData.waterLevel > 3.0 ? 'rising' : 'stable'
            },
            {
              title: 'Temperature',
              value: `${sensorData.temperature}°C`,
              icon: Thermometer,
              gradient: 'from-orange-500 to-red-600',
              trend: 'stable'
            },
            {
              title: 'Wind Speed',
              value: `${sensorData.windSpeed} km/h`,
              icon: Wind,
              gradient: 'from-gray-500 to-blue-600',
              trend: sensorData.windSpeed > 15 ? 'high' : 'normal'
            },
            {
              title: 'Battery Level',
              value: `${sensorData.batteryLevel}%`,
              icon: Battery,
              gradient: 'from-green-500 to-emerald-600',
              trend: sensorData.batteryLevel < 30 ? 'low' : 'good'
            }
          ].map((sensor, index) => {
            const IconComponent = sensor.icon;
            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${sensor.gradient} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    sensor.trend === 'rising' || sensor.trend === 'high' ? 'bg-yellow-900/30 text-yellow-400' :
                    sensor.trend === 'low' ? 'bg-red-900/30 text-red-400' :
                    'bg-green-900/30 text-green-400'
                  }`}>
                    {sensor.trend}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">{sensor.title}</h3>
                <p className="text-3xl font-bold text-white">{sensor.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Biometric Gates and Intruder Alerts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Biometric Gates */}
          <motion.div 
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Lock className="w-6 h-6 text-green-400" />
                Biometric Gates
              </h2>
              <div className="text-sm text-gray-400">
                {biometricGates.filter(gate => gate.status === 'open').length} Active
              </div>
            </div>
            
            <div className="space-y-4">
              {biometricGates.map((gate, index) => (
                <motion.div
                  key={gate.id}
                  className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.4)' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{gate.location}</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{gate.id}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Last access: {gate.lastAccess} • {gate.authorizedPersons} authorized
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {gate.status === 'open' ? (
                        <Unlock className={`w-5 h-5 ${getGateStatusColor(gate.status)}`} />
                      ) : gate.status === 'scanning' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Eye className={`w-5 h-5 ${getGateStatusColor(gate.status)}`} />
                        </motion.div>
                      ) : (
                        <Lock className={`w-5 h-5 ${getGateStatusColor(gate.status)}`} />
                      )}
                      <span className={`text-sm font-medium ${getGateStatusColor(gate.status)}`}>
                        {gate.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Intruder Alerts */}
          <motion.div 
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Intruder Alerts
              </h2>
              <div className="text-sm text-gray-400">
                {intruderAlerts.filter(alert => alert.status === 'active').length} Active
              </div>
            </div>
            
            <div className="space-y-4">
              {intruderAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  className={`rounded-xl p-4 border ${getSeverityColor(alert.severity)}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white">{alert.location}</span>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          alert.status === 'active' 
                            ? 'bg-red-900/30 text-red-400' 
                            : 'bg-green-900/30 text-green-400'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Camera className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MapPin className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div 
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-green-400" />
            System Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                system: 'Perimeter Sensors',
                status: 'Operational',
                uptime: '99.8%',
                color: 'green'
              },
              {
                system: 'Communication Array',
                status: 'Operational',
                uptime: '99.5%',
                color: 'green'
              },
              {
                system: 'Backup Power',
                status: 'Standby',
                uptime: '100%',
                color: 'yellow'
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{system.system}</h3>
                  <div className={`w-3 h-3 rounded-full ${
                    system.color === 'green' ? 'bg-green-400' :
                    system.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                  } animate-pulse`}></div>
                </div>
                <p className={`text-sm mb-1 ${
                  system.color === 'green' ? 'text-green-400' :
                  system.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {system.status}
                </p>
                <p className="text-xs text-gray-400">Uptime: {system.uptime}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}