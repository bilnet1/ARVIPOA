import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Flame, Waves, Music, Droplet, Lock, Video, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DeviceData {
  icon: JSX.Element;
  label: string;
  value: string;
  status: 'active' | 'warning' | 'error';
}

interface Device {
  id: string;
  name: string;
  type: 'smart_pillar' | 'river_barricade';
  location: string;
  lastUpdate: string;
  data: DeviceData[];
}

export default function MyDevicesLimitedView() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'SP-001',
      name: 'Smart Pillar Alpha',
      type: 'smart_pillar',
      location: 'North Gate Entrance',
      lastUpdate: '2 minutes ago',
      data: [
        { icon: <Flame className="w-5 h-5" />, label: 'Fire Alert', value: 'Clear', status: 'active' },
        { icon: <Music className="w-5 h-5" />, label: 'Music Detection', value: 'None', status: 'active' },
        { icon: <Waves className="w-5 h-5" />, label: 'River Level', value: '3.5m', status: 'active' },
        { icon: <Eye className="w-5 h-5" />, label: 'CCTV', value: 'Active', status: 'active' }
      ]
    },
    {
      id: 'RB-001',
      name: 'River Barricade Beta',
      type: 'river_barricade',
      location: 'Main River Channel',
      lastUpdate: '1 minute ago',
      data: [
        { icon: <Droplet className="w-5 h-5" />, label: 'River Level', value: '3.8m', status: 'warning' },
        { icon: <Lock className="w-5 h-5" />, label: 'Biometric Gate', value: 'Active', status: 'active' },
        { icon: <Video className="w-5 h-5" />, label: 'Underwater Cam', value: 'Online', status: 'active' }
      ]
    }
  ]);

  const [isAuthorized, setIsAuthorized] = useState(true); // In real app, check user permissions

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          lastUpdate: 'Just now',
          data: device.data.map(item => {
            if (item.label === 'River Level') {
              const newValue = (parseFloat(item.value) + (Math.random() - 0.5) * 0.2).toFixed(1) + 'm';
              return { ...item, value: newValue };
            }
            return item;
          })
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-gray-300">Only verified landowners or registered Smart Pillar/Barricade owners can access this dashboard.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            My Devices Overview
          </h1>
          <p className="text-gray-400">Real-time monitoring of your Smart Pillars and River Barricades</p>
        </motion.div>

        {/* Devices Grid */}
        <div className="space-y-8">
          {devices.map((device, deviceIndex) => (
            <motion.div
              key={device.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: deviceIndex * 0.1 }}
            >
              {/* Device Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    device.type === 'smart_pillar' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                  }`}>
                    {device.type === 'smart_pillar' ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <Waves className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{device.name}</h2>
                    <p className="text-gray-400 text-sm">{device.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Last update: {device.lastUpdate}
                </div>
              </div>

              {/* Device Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {device.data.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: deviceIndex * 0.1 + itemIndex * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        device.type === 'smart_pillar' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.icon}
                      </div>
                      {getStatusIcon(item.status)}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-1">{item.label}</p>
                      <p className={`text-lg font-bold ${getStatusColor(item.status)}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Device Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <motion.button
                  className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-4 h-4" />
                  Live Feed
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Total Devices', value: devices.length.toString(), color: 'text-green-400' },
            { label: 'Active Monitoring', value: devices.filter(d => d.data.some(item => item.status === 'active')).length.toString(), color: 'text-blue-400' },
            { label: 'Alerts', value: devices.reduce((acc, d) => acc + d.data.filter(item => item.status === 'warning' || item.status === 'error').length, 0).toString(), color: 'text-yellow-400' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-600/30">
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm">
            Real-time data updates every 5 seconds. For detailed analytics and controls, upgrade to full dashboard access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}