import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, BatteryCharging, Eye, Flame, Waves, WifiOff, Wifi, 
  Music, PawPrint, Car, CloudDrizzle, Wind, MapPin, Clock, 
  TrendingUp, TrendingDown, Activity, Shield, Settings
} from 'lucide-react';

interface SensorStatus {
  vibration: boolean;
  gunshot: boolean;
  fire: boolean;
  music: boolean;
  animal: boolean;
  vehicle: boolean;
  gasLeak: boolean;
  smoke: boolean;
  battery: number;
  connection: boolean;
  riverLevel: number;
  cameraMotion: boolean;
  temperature: number;
  humidity: number;
  airQuality: number;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  sensor: string;
}

export default function SmartPillarDashboard() {
  const [status, setStatus] = useState<SensorStatus>({
    vibration: false,
    gunshot: false,
    fire: false,
    music: false,
    animal: false,
    vehicle: false,
    gasLeak: false,
    smoke: false,
    battery: 82,
    connection: true,
    riverLevel: 6.2,
    cameraMotion: false,
    temperature: 28.5,
    humidity: 65,
    airQuality: 85
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = {
        ...status,
        riverLevel: +(Math.random() * 10).toFixed(1),
        vibration: Math.random() > 0.9,
        gunshot: Math.random() > 0.95,
        fire: Math.random() > 0.92,
        music: Math.random() > 0.85,
        animal: Math.random() > 0.8,
        vehicle: Math.random() > 0.88,
        gasLeak: Math.random() > 0.9,
        smoke: Math.random() > 0.9,
        battery: Math.max(10, Math.min(100, status.battery + (Math.random() - 0.5) * 2)),
        connection: Math.random() > 0.03,
        cameraMotion: Math.random() > 0.9,
        temperature: +(25 + Math.random() * 10).toFixed(1),
        humidity: +(60 + Math.random() * 20).toFixed(0),
        airQuality: +(75 + Math.random() * 25).toFixed(0)
      };

      // Generate alerts for critical changes
      const newAlerts: Alert[] = [];
      if (newStatus.gunshot && !status.gunshot) {
        newAlerts.push({
          id: Date.now().toString(),
          type: 'critical',
          message: 'GUNSHOT DETECTED - Emergency response initiated',
          timestamp: new Date(),
          sensor: 'Audio Sensor'
        });
      }
      if (newStatus.fire && !status.fire) {
        newAlerts.push({
          id: Date.now().toString() + '1',
          type: 'critical',
          message: 'FIRE ALERT - Smoke and heat detected',
          timestamp: new Date(),
          sensor: 'Fire Sensor'
        });
      }
      if (newStatus.gasLeak && !status.gasLeak) {
        newAlerts.push({
          id: Date.now().toString() + '2',
          type: 'warning',
          message: 'Gas leak detected in vicinity',
          timestamp: new Date(),
          sensor: 'Gas Sensor'
        });
      }

      setStatus(newStatus);
      setLastUpdate(new Date());
      
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.type === 'warning').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text mb-2">
                Smart Pillar Monitoring
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Kasoa Junction, Ghana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                status.connection 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                {status.connection ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
                <span className={`text-sm ${status.connection ? 'text-green-400' : 'text-red-400'}`}>
                  {status.connection ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                <BatteryCharging className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">{status.battery.toFixed(0)}%</span>
              </div>
              
              {(criticalAlerts > 0 || warningAlerts > 0) && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">
                    {criticalAlerts + warningAlerts} Alert{criticalAlerts + warningAlerts !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Sensor Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {/* Environmental Sensors */}
              <SensorCard
                icon={<Waves className="w-6 h-6" />}
                title="River Level"
                value={`${status.riverLevel}m`}
                status={status.riverLevel > 8 ? 'critical' : status.riverLevel > 6 ? 'warning' : 'normal'}
                trend={status.riverLevel > 7 ? 'up' : 'down'}
              />
              
              <SensorCard
                icon={<Activity className="w-6 h-6" />}
                title="Temperature"
                value={`${status.temperature}°C`}
                status={status.temperature > 35 ? 'warning' : 'normal'}
                trend={status.temperature > 30 ? 'up' : 'down'}
              />
              
              <SensorCard
                icon={<CloudDrizzle className="w-6 h-6" />}
                title="Humidity"
                value={`${status.humidity}%`}
                status={status.humidity > 80 ? 'warning' : 'normal'}
              />

              {/* Security Sensors */}
              <SensorCard
                icon={<AlertTriangle className="w-6 h-6" />}
                title="Vibration"
                value={status.vibration ? 'DETECTED' : 'Normal'}
                status={status.vibration ? 'critical' : 'normal'}
                isActive={status.vibration}
              />
              
              <SensorCard
                icon={<AlertTriangle className="w-6 h-6" />}
                title="Gunshot Alert"
                value={status.gunshot ? 'DETECTED' : 'Clear'}
                status={status.gunshot ? 'critical' : 'normal'}
                isActive={status.gunshot}
              />
              
              <SensorCard
                icon={<Eye className="w-6 h-6" />}
                title="Camera Motion"
                value={status.cameraMotion ? 'Motion' : 'Clear'}
                status={status.cameraMotion ? 'warning' : 'normal'}
                isActive={status.cameraMotion}
              />

              {/* Safety Sensors */}
              <SensorCard
                icon={<Flame className="w-6 h-6" />}
                title="Fire Detection"
                value={status.fire ? 'FIRE ALERT' : 'Safe'}
                status={status.fire ? 'critical' : 'normal'}
                isActive={status.fire}
              />
              
              <SensorCard
                icon={<Wind className="w-6 h-6" />}
                title="Smoke Alert"
                value={status.smoke ? 'DETECTED' : 'Clear'}
                status={status.smoke ? 'critical' : 'normal'}
                isActive={status.smoke}
              />
              
              <SensorCard
                icon={<Shield className="w-6 h-6" />}
                title="Gas Leak"
                value={status.gasLeak ? 'LEAK DETECTED' : 'Safe'}
                status={status.gasLeak ? 'critical' : 'normal'}
                isActive={status.gasLeak}
              />

              {/* Activity Sensors */}
              <SensorCard
                icon={<Music className="w-6 h-6" />}
                title="Music Detection"
                value={status.music ? 'Playing' : 'Quiet'}
                status={status.music ? 'info' : 'normal'}
                isActive={status.music}
              />
              
              <SensorCard
                icon={<PawPrint className="w-6 h-6" />}
                title="Animal Activity"
                value={status.animal ? 'Detected' : 'None'}
                status={status.animal ? 'info' : 'normal'}
                isActive={status.animal}
              />
              
              <SensorCard
                icon={<Car className="w-6 h-6" />}
                title="Vehicle Traffic"
                value={status.vehicle ? 'Detected' : 'Clear'}
                status={status.vehicle ? 'info' : 'normal'}
                isActive={status.vehicle}
              />
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 h-fit"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Recent Alerts
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {alerts.length === 0 ? (
                    <p className="text-gray-400 text-sm">No recent alerts</p>
                  ) : (
                    alerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 rounded-lg border-l-4 ${
                          alert.type === 'critical' 
                            ? 'bg-red-500/20 border-red-500' 
                            : alert.type === 'warning'
                            ? 'bg-yellow-500/20 border-yellow-500'
                            : 'bg-blue-500/20 border-blue-500'
                        }`}
                      >
                        <p className={`text-sm font-medium ${
                          alert.type === 'critical' ? 'text-red-400' : 
                          alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {alert.message}
                        </p>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{alert.sensor}</span>
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* System Status Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">System Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Auto-refresh: 3s</span>
              </div>
            </div>
            <div className="text-gray-400">
              ARVIPOA Smart Infrastructure • Powered by IoT Sensors
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface SensorCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: 'normal' | 'warning' | 'critical' | 'info';
  isActive?: boolean;
  trend?: 'up' | 'down';
}

function SensorCard({ icon, title, value, status, isActive, trend }: SensorCardProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'critical':
        return 'border-red-500 bg-red-500/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/20';
      case 'info':
        return 'border-blue-500 bg-blue-500/20';
      default:
        return 'border-green-500/30 bg-white/10';
    }
  };

  const getTextColors = () => {
    switch (status) {
      case 'critical':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${getStatusColors()}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`${getTextColors()}`}>
          {icon}
        </div>
        {trend && (
          <div className={getTextColors()}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
      <p className={`text-lg font-bold ${getTextColors()}`}>
        {value}
      </p>
      
      {isActive && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`mt-2 w-2 h-2 rounded-full ${
            status === 'critical' ? 'bg-red-400' : 
            status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
          }`}
        />
      )}
    </motion.div>
  );
}