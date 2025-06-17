import { useEffect, useState } from 'react';
import { Flame, Droplet, Wifi, MapPin, AlertTriangle, Eye, Waves, Settings, Shield, Activity, Thermometer, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface SmartPillarAdminDashboardProps {
  isLimitedAccess?: boolean;
}

export default function SmartPillarAdminDashboard({ isLimitedAccess = false }: SmartPillarAdminDashboardProps) {
  const [status, setStatus] = useState({
    sprinklerActive: false,
    fireDetected: false,
    intrusion: false,
    connection: true,
    location: "06 Lakeside St",
    waterPressure: 78,
    riverLevel: 5.4,
    temperature: 24,
    humidity: 65,
    alerts: [
      { type: 'Distress Call', time: '10:34 AM', location: '06 Lakeside St', severity: 'high' },
      { type: 'Mobile Phone', time: '10:28 AM', location: '123 Main Rd', severity: 'medium' },
      { type: 'Loud Music', time: '10:22 AM', location: '456 Ridge Way', severity: 'low' },
      { type: 'Fire Detected', time: '10:10 AM', location: '456 Ridge Way', severity: 'critical' }
    ],
    utilities: {
      network: 'Normal',
      sensor: 'Normal',
      water: 'Leakage',
      fire: 'Error',
      rfid: 'RFID'
    },
    deviceStats: {
      activePillars: 12,
      totalPillars: 15,
      batteryLevel: 89,
      signalStrength: 95
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        sprinklerActive: Math.random() > 0.85,
        fireDetected: Math.random() > 0.9,
        intrusion: Math.random() > 0.92,
        waterPressure: Math.max(40, Math.min(100, Math.random() * 100)),
        riverLevel: +(Math.random() * 8).toFixed(1),
        temperature: Math.round(20 + Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 40),
        deviceStats: {
          ...prev.deviceStats,
          batteryLevel: Math.max(20, Math.min(100, prev.deviceStats.batteryLevel + (Math.random() - 0.5) * 2)),
          signalStrength: Math.max(60, Math.min(100, prev.deviceStats.signalStrength + (Math.random() - 0.5) * 5))
        }
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleSprinkler = () => {
    if (!isLimitedAccess) {
      setStatus(prev => ({ ...prev, sprinklerActive: !prev.sprinklerActive }));
    }
  };

  const acknowledgeAlert = (index: number) => {
    if (!isLimitedAccess) {
      setStatus(prev => ({
        ...prev,
        alerts: prev.alerts.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              {isLimitedAccess ? 'My Pillar Devices' : 'Smart Pillar Admin Dashboard'}
            </h1>
            <p className="text-gray-300 text-sm">
              {isLimitedAccess ? 'Monitor your connected pillar devices' : 'Comprehensive monitoring and control system'}
            </p>
          </div>
          {!isLimitedAccess && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Active Pillars</div>
                <div className="text-xl font-bold text-green-400">
                  {status.deviceStats.activePillars}/{status.deviceStats.totalPillars}
                </div>
              </div>
              <a 
                href="/air-pilot"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-white no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Dispatch Air Support
              </a>
              
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* Pillar Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 col-span-1"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            PILLAR STATUS
          </h2>
          
          {/* Pillar Image Placeholder */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 mb-4 aspect-square flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">Smart Boundary Pillar</div>
              <div className="text-xs text-gray-400 mt-1">{status.location}</div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${status.fireDetected ? 'text-red-500' : 'text-gray-400'}`} />
                <span className="text-sm">Fire Detection</span>
              </div>
              <span className={`text-sm font-bold ${status.fireDetected ? 'text-red-400' : 'text-green-400'}`}>
                {status.fireDetected ? 'DETECTED' : 'Clear'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Droplet className={`w-5 h-5 ${status.sprinklerActive ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="text-sm">Sprinkler</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${status.sprinklerActive ? 'text-blue-400' : 'text-gray-400'}`}>
                  {status.sprinklerActive ? 'ACTIVE' : 'Off'}
                </span>
                {!isLimitedAccess && (
                  <button
                    onClick={toggleSprinkler}
                    className={`px-2 py-1 text-xs rounded ${
                      status.sprinklerActive 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors`}
                  >
                    {status.sprinklerActive ? 'Stop' : 'Start'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Wifi className={`w-5 h-5 ${status.connection ? 'text-green-400' : 'text-red-500'}`} />
                <span className="text-sm">Connection</span>
              </div>
              <span className={`text-sm font-bold ${status.connection ? 'text-green-400' : 'text-red-400'}`}>
                {status.connection ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-gray-700/30 rounded-lg p-2 text-center">
                <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">Temp</div>
                <div className="text-sm font-bold">{status.temperature}°C</div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2 text-center">
                <Gauge className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">Humidity</div>
                <div className="text-sm font-bold">{status.humidity}%</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 col-span-2"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-green-400" />
            LIVE MAP
          </h2>
          
          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg h-64 mb-4 flex items-center justify-center border border-gray-600">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <div className="text-gray-300">Interactive Map View</div>
              <div className="text-sm text-gray-400 mt-1">Real-time pillar locations and status</div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-lime-400" />
              <span className="font-medium">{status.location}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Waves className="w-4 h-4 text-blue-400" />
                <span>River Level: {status.riverLevel}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4 text-yellow-400" />
                <span>Pressure: {Math.round(status.waterPressure)}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts - Hidden in limited access */}
        {!isLimitedAccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              ALERTS ({status.alerts.length})
            </h2>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {status.alerts.map((alert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-gray-900/50 p-3 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500' :
                    alert.severity === 'high' ? 'border-orange-500' :
                    alert.severity === 'medium' ? 'border-yellow-500' :
                    'border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className={`w-4 h-4 ${
                          alert.severity === 'critical' ? 'text-red-500' :
                          alert.severity === 'high' ? 'text-orange-500' :
                          alert.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <span className="text-sm font-medium">{alert.type}</span>
                      </div>
                      <div className="text-xs text-gray-400">{alert.location}</div>
                      <div className="text-xs text-gray-500">{alert.time}</div>
                    </div>
                    <button
                      onClick={() => acknowledgeAlert(i)}
                      className="bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded transition-colors"
                    >
                      Ack
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Utilities System */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${isLimitedAccess ? 'col-span-3' : 'col-span-2'} bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700`}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-400" />
            UTILITIES SYSTEM
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(status.utilities).map(([label, value], i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="text-sm text-gray-300 capitalize mb-2">{label}</div>
                <div className={`font-bold text-lg ${
                  value === 'Normal' ? 'text-green-400' : 
                  value === 'Leakage' ? 'text-yellow-400' : 
                  value === 'RFID' ? 'text-blue-400' :
                  'text-red-500'
                }`}>
                  {value}
                </div>
                {!isLimitedAccess && value !== 'Normal' && (
                  <button className="mt-2 bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded transition-colors">
                    Fix
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Device Statistics for Limited Access */}
          {isLimitedAccess && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Battery</div>
                <div className="text-lg font-bold text-green-400">{Math.round(status.deviceStats.batteryLevel)}%</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Wifi className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Signal</div>
                <div className="text-lg font-bold text-green-400">{Math.round(status.deviceStats.signalStrength)}%</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Uptime</div>
                <div className="text-lg font-bold text-purple-400">24/7</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Status</div>
                <div className="text-lg font-bold text-green-400">Active</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}