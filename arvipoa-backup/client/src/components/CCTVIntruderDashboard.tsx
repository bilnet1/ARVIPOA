import { useEffect, useState } from 'react';
import { Eye, ShieldAlert, Siren, Video, Bell, Camera, Archive, Clock, AlertTriangle, Monitor, Wifi, Signal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertLog {
  id: string;
  timestamp: string;
  type: 'motion' | 'intruder' | 'manual';
  severity: 'low' | 'medium' | 'high';
  location: string;
  snapshot?: string;
}

interface SnapshotArchive {
  id: string;
  timestamp: string;
  filename: string;
  motionTrigger: boolean;
  thumbnail: string;
}

export default function CCTVIntruderDashboard() {
  const [status, setStatus] = useState({
    motionDetected: false,
    intruderDetected: false,
    lastCapture: 'None',
    alertSent: false,
    systemOnline: true,
    signalStrength: 85
  });

  const [alertLogs, setAlertLogs] = useState<AlertLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      type: 'motion',
      severity: 'low',
      location: 'Front Gate',
      snapshot: 'motion_001.jpg'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:12',
      type: 'intruder',
      severity: 'high',
      location: 'Perimeter Fence',
      snapshot: 'intruder_001.jpg'
    }
  ]);

  const [snapshotArchive, setSnapshotArchive] = useState<SnapshotArchive[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      filename: 'motion_001.jpg',
      motionTrigger: true,
      thumbnail: '/placeholder-snapshot.jpg'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:12',
      filename: 'intruder_001.jpg',
      motionTrigger: true,
      thumbnail: '/placeholder-snapshot.jpg'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:08',
      filename: 'routine_001.jpg',
      motionTrigger: false,
      thumbnail: '/placeholder-snapshot.jpg'
    }
  ]);

  const [activeTab, setActiveTab] = useState('live');

  useEffect(() => {
    const interval = setInterval(() => {
      const intruder = Math.random() > 0.92;
      const motion = Math.random() > 0.85;
      
      if (intruder || motion) {
        const newTimestamp = new Date().toLocaleString();
        const newAlert: AlertLog = {
          id: Date.now().toString(),
          timestamp: newTimestamp,
          type: intruder ? 'intruder' : 'motion',
          severity: intruder ? 'high' : 'medium',
          location: intruder ? 'Perimeter Fence' : 'Front Gate',
          snapshot: `${intruder ? 'intruder' : 'motion'}_${Date.now()}.jpg`
        };

        const newSnapshot: SnapshotArchive = {
          id: Date.now().toString(),
          timestamp: newTimestamp,
          filename: newAlert.snapshot!,
          motionTrigger: true,
          thumbnail: '/placeholder-snapshot.jpg'
        };

        setAlertLogs(prev => [newAlert, ...prev.slice(0, 9)]);
        setSnapshotArchive(prev => [newSnapshot, ...prev.slice(0, 19)]);
      }

      setStatus(prev => ({
        ...prev,
        motionDetected: motion,
        intruderDetected: intruder,
        lastCapture: intruder || motion ? `${intruder ? 'Intruder' : 'Motion'}_${Date.now()}.jpg` : prev.lastCapture,
        alertSent: intruder || prev.alertSent,
        signalStrength: 80 + Math.random() * 20
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const sendManualAlert = () => {
    const newAlert: AlertLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      type: 'manual',
      severity: 'high',
      location: 'Manual Trigger',
      snapshot: `manual_${Date.now()}.jpg`
    };
    setAlertLogs(prev => [newAlert, ...prev.slice(0, 9)]);
    setStatus(prev => ({ ...prev, alertSent: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Monitor className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">CCTV & Intrusion Monitoring</h1>
                <p className="text-gray-300 mt-1">Real-time security surveillance system</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">{Math.round(status.signalStrength)}%</span>
              </div>
              <a 
                href="/air-pilot"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-white no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Dispatch Drones
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'live', label: 'Live Feed', icon: Video },
              { id: 'alerts', label: 'Alert Logs', icon: Bell },
              { id: 'archive', label: 'Snapshot Archive', icon: Archive },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-blue-400'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Live Feed */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Live CCTV Feed</h2>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${status.systemOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                    <span className="text-sm text-gray-300">{status.systemOnline ? 'LIVE' : 'OFFLINE'}</span>
                  </div>
                </div>
                
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <Video className="text-gray-400 w-20 h-20" />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                      REC
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Eye className={`w-5 h-5 ${status.motionDetected ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <span className="text-sm">Motion: {status.motionDetected ? 'DETECTED' : 'Clear'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Auto-capture: ON</span>
                  </div>
                </div>
              </div>

              {/* Intruder Response Panel */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Intruder Response Panel</h2>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${
                    status.intruderDetected 
                      ? 'bg-red-500/20 border-red-500 animate-pulse' 
                      : 'bg-green-500/20 border-green-500'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <ShieldAlert className={`w-6 h-6 ${status.intruderDetected ? 'text-red-400' : 'text-green-400'}`} />
                      <div>
                        <div className="font-semibold">
                          Intruder Status: {status.intruderDetected ? '🚨 DETECTED' : '✅ CLEAR'}
                        </div>
                        {status.intruderDetected && (
                          <div className="text-sm text-red-300">High priority threat detected</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    status.alertSent 
                      ? 'bg-green-500/20 border-green-500' 
                      : 'bg-gray-700/50 border-gray-600'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Bell className={`w-6 h-6 ${status.alertSent ? 'text-green-400' : 'text-gray-400'}`} />
                      <div>
                        <div className="font-semibold">
                          Alert Status: {status.alertSent ? '✅ SENT' : 'Standby'}
                        </div>
                        <div className="text-sm text-gray-300">
                          {status.alertSent ? 'AIR Support notified' : 'Ready to alert AIR Support'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-600 bg-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <Siren className="w-6 h-6 text-orange-400" />
                      <div>
                        <div className="font-semibold">Last Snapshot</div>
                        <div className="text-sm text-gray-300">{status.lastCapture}</div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={sendManualAlert}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    <span>Manual Alert to AIR</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Alert Logs</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Real-time monitoring</span>
                </div>
              </div>

              <div className="space-y-3">
                {alertLogs.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      alert.severity === 'high' 
                        ? 'bg-red-500/20 border-red-500' 
                        : alert.severity === 'medium'
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : 'bg-blue-500/20 border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {alert.type === 'intruder' && <ShieldAlert className="w-5 h-5 text-red-400" />}
                        {alert.type === 'motion' && <Eye className="w-5 h-5 text-yellow-400" />}
                        {alert.type === 'manual' && <AlertTriangle className="w-5 h-5 text-orange-400" />}
                        <div>
                          <div className="font-semibold capitalize">{alert.type} Alert</div>
                          <div className="text-sm text-gray-300">{alert.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono">{alert.timestamp}</div>
                        {alert.snapshot && (
                          <div className="text-xs text-blue-400 mt-1">📸 {alert.snapshot}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'archive' && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Snapshot Archive</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Archive className="w-4 h-4" />
                  <span>{snapshotArchive.length} snapshots</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {snapshotArchive.map((snapshot, index) => (
                  <motion.div
                    key={snapshot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-700/50 rounded-xl overflow-hidden border border-gray-600 hover:border-blue-400 transition-colors"
                  >
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{snapshot.filename}</span>
                        {snapshot.motionTrigger && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                            Motion
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{snapshot.timestamp}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}