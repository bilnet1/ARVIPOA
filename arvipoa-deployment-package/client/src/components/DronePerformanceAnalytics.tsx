import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Battery,
  Wifi,
  Thermometer,
  Wind
} from "lucide-react";

interface PerformanceMetric {
  timestamp: number;
  missionSuccess: boolean;
  duration: number;
  batteryUsed: number;
  averageSpeed: number;
  signalStrength: number;
  weatherImpact: number;
}

interface FlightAnalytics {
  totalFlights: number;
  successRate: number;
  averageDuration: number;
  averageBatteryUsage: number;
  totalFlightTime: number;
  weatherDelays: number;
}

interface PerformanceAnalyticsProps {
  isActive: boolean;
  currentMetrics: {
    speed: number;
    battery: number;
    signal: number;
    thermal: number;
  };
  weatherConditions: {
    windSpeed: number;
    visibility: number;
    intensity: number;
  };
}

export default function DronePerformanceAnalytics({ 
  isActive, 
  currentMetrics, 
  weatherConditions 
}: PerformanceAnalyticsProps) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [analytics, setAnalytics] = useState<FlightAnalytics>({
    totalFlights: 0,
    successRate: 0,
    averageDuration: 0,
    averageBatteryUsage: 0,
    totalFlightTime: 0,
    weatherDelays: 0
  });

  // Simulate performance data collection
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const weatherImpact = (weatherConditions.windSpeed / 50) + 
                           (weatherConditions.intensity / 100) + 
                           ((10000 - weatherConditions.visibility) / 10000);

      const newMetric: PerformanceMetric = {
        timestamp: Date.now(),
        missionSuccess: Math.random() > weatherImpact * 0.3,
        duration: 45 + Math.random() * 30,
        batteryUsed: 15 + weatherImpact * 10 + Math.random() * 10,
        averageSpeed: currentMetrics.speed * (1 - weatherImpact * 0.2),
        signalStrength: currentMetrics.signal,
        weatherImpact: weatherImpact * 100
      };

      setMetrics(prev => [...prev.slice(-9), newMetric]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, currentMetrics, weatherConditions]);

  // Calculate analytics
  useEffect(() => {
    if (metrics.length === 0) return;

    const successfulFlights = metrics.filter(m => m.missionSuccess).length;
    const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);
    const totalBattery = metrics.reduce((sum, m) => sum + m.batteryUsed, 0);
    const weatherDelayCount = metrics.filter(m => m.weatherImpact > 50).length;

    setAnalytics({
      totalFlights: metrics.length,
      successRate: (successfulFlights / metrics.length) * 100,
      averageDuration: totalDuration / metrics.length,
      averageBatteryUsage: totalBattery / metrics.length,
      totalFlightTime: totalDuration,
      weatherDelays: weatherDelayCount
    });
  }, [metrics]);

  const getPerformanceColor = (value: number, type: 'success' | 'battery' | 'speed') => {
    switch (type) {
      case 'success':
        return value >= 90 ? 'text-green-400' : value >= 70 ? 'text-yellow-400' : 'text-red-400';
      case 'battery':
        return value <= 20 ? 'text-green-400' : value <= 35 ? 'text-yellow-400' : 'text-red-400';
      case 'speed':
        return value >= 15 ? 'text-green-400' : value >= 10 ? 'text-yellow-400' : 'text-red-400';
    }
  };

  const getCurrentPerformanceScore = () => {
    const batteryScore = Math.max(0, 100 - currentMetrics.battery);
    const speedScore = Math.min(100, (currentMetrics.speed / 20) * 100);
    const signalScore = currentMetrics.signal;
    const weatherScore = Math.max(0, 100 - weatherConditions.intensity);

    return Math.round((batteryScore + speedScore + signalScore + weatherScore) / 4);
  };

  const performanceScore = getCurrentPerformanceScore();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-400" />
        Performance Analytics
      </h4>

      {/* Current Performance Score */}
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-sm">Current Performance</span>
          <span className={`text-lg font-bold ${
            performanceScore >= 80 ? 'text-green-400' : 
            performanceScore >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {performanceScore}%
          </span>
        </div>
        
        <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
          <motion.div 
            className={`h-2 rounded-full ${
              performanceScore >= 80 ? 'bg-green-500' : 
              performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${performanceScore}%` }}
            animate={{ width: `${performanceScore}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="text-xs text-gray-400">
          Based on battery efficiency, speed, signal strength, and weather conditions
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Speed</span>
          </div>
          <div className={`text-lg font-bold ${getPerformanceColor(currentMetrics.speed, 'speed')}`}>
            {currentMetrics.speed} km/h
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Battery className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Battery</span>
          </div>
          <div className={`text-lg font-bold ${getPerformanceColor(100 - currentMetrics.battery, 'battery')}`}>
            {Math.round(currentMetrics.battery)}%
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Signal</span>
          </div>
          <div className="text-lg font-bold text-white">
            {Math.round(currentMetrics.signal)}%
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Weather</span>
          </div>
          <div className={`text-lg font-bold ${
            weatherConditions.intensity < 30 ? 'text-green-400' :
            weatherConditions.intensity < 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {Math.round(weatherConditions.intensity)}%
          </div>
        </div>
      </div>

      {/* Flight Analytics Summary */}
      {analytics.totalFlights > 0 && (
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Flight Analytics
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-400">Total Flights</div>
              <div className="text-white font-semibold">{analytics.totalFlights}</div>
            </div>
            
            <div>
              <div className="text-gray-400">Success Rate</div>
              <div className={`font-semibold ${getPerformanceColor(analytics.successRate, 'success')}`}>
                {Math.round(analytics.successRate)}%
              </div>
            </div>
            
            <div>
              <div className="text-gray-400">Avg Duration</div>
              <div className="text-white font-semibold">{Math.round(analytics.averageDuration)}s</div>
            </div>
            
            <div>
              <div className="text-gray-400">Battery Usage</div>
              <div className="text-white font-semibold">{Math.round(analytics.averageBatteryUsage)}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Performance Chart */}
      {metrics.length > 0 && (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            Recent Performance
          </div>
          
          <div className="flex items-end gap-1 h-16">
            {metrics.slice(-8).map((metric, index) => {
              const height = Math.max(10, (metric.averageSpeed / 20) * 100);
              const color = metric.missionSuccess ? 'bg-green-500' : 'bg-red-500';
              
              return (
                <motion.div
                  key={metric.timestamp}
                  className={`flex-1 ${color} rounded-t opacity-70 hover:opacity-100 transition-opacity`}
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                  title={`Flight ${index + 1}: ${metric.missionSuccess ? 'Success' : 'Failed'} - ${Math.round(metric.averageSpeed)} km/h`}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Speed Performance</span>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                <span>Success</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded"></div>
                <span>Failed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Recommendations */}
      {analytics.totalFlights > 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg"
        >
          <div className="flex items-center gap-2 text-blue-300 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-semibold">Performance Insights</span>
          </div>
          
          <div className="text-xs text-blue-200 space-y-1">
            {analytics.successRate < 70 && (
              <div>• Consider reducing mission complexity in adverse weather</div>
            )}
            {analytics.averageBatteryUsage > 30 && (
              <div>• Optimize flight paths to reduce battery consumption</div>
            )}
            {analytics.weatherDelays > analytics.totalFlights * 0.3 && (
              <div>• Weather significantly impacts performance - consider scheduling</div>
            )}
            {performanceScore >= 85 && (
              <div>• Excellent performance - current settings are optimal</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}