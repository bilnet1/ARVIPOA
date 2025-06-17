import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer,
  Eye,
  AlertTriangle,
  CloudSnow,
  Zap
} from "lucide-react";

interface WeatherCondition {
  type: "clear" | "cloudy" | "rain" | "storm" | "snow" | "fog";
  intensity: number; // 0-100
  visibility: number; // meters
  windSpeed: number; // km/h
  temperature: number; // celsius
  humidity: number; // percentage
}

interface WeatherSystemProps {
  onWeatherChange: (condition: WeatherCondition) => void;
  isActive: boolean;
}

export default function DroneWeatherSystem({ onWeatherChange, isActive }: WeatherSystemProps) {
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>({
    type: "clear",
    intensity: 0,
    visibility: 10000,
    windSpeed: 5,
    temperature: 22,
    humidity: 45
  });

  const [isAutoWeather, setIsAutoWeather] = useState(false);

  const weatherPresets = [
    { 
      name: "Clear Skies", 
      condition: { type: "clear" as const, intensity: 0, visibility: 10000, windSpeed: 3, temperature: 25, humidity: 40 },
      icon: Sun,
      color: "from-yellow-400 to-orange-400"
    },
    { 
      name: "Partly Cloudy", 
      condition: { type: "cloudy" as const, intensity: 30, visibility: 8000, windSpeed: 8, temperature: 20, humidity: 55 },
      icon: Cloud,
      color: "from-gray-400 to-gray-500"
    },
    { 
      name: "Light Rain", 
      condition: { type: "rain" as const, intensity: 40, visibility: 5000, windSpeed: 12, temperature: 18, humidity: 80 },
      icon: CloudRain,
      color: "from-blue-400 to-blue-600"
    },
    { 
      name: "Heavy Storm", 
      condition: { type: "storm" as const, intensity: 85, visibility: 2000, windSpeed: 35, temperature: 16, humidity: 90 },
      icon: Zap,
      color: "from-purple-600 to-gray-800"
    },
    { 
      name: "Dense Fog", 
      condition: { type: "fog" as const, intensity: 70, visibility: 500, windSpeed: 2, temperature: 12, humidity: 95 },
      icon: Eye,
      color: "from-gray-300 to-gray-600"
    },
    { 
      name: "Snow", 
      condition: { type: "snow" as const, intensity: 60, visibility: 3000, windSpeed: 15, temperature: -2, humidity: 85 },
      icon: CloudSnow,
      color: "from-blue-200 to-white"
    }
  ];

  // Auto weather simulation
  useEffect(() => {
    if (!isAutoWeather || !isActive) return;

    const interval = setInterval(() => {
      const randomWeather = weatherPresets[Math.floor(Math.random() * weatherPresets.length)];
      const variation = {
        ...randomWeather.condition,
        intensity: Math.max(0, Math.min(100, randomWeather.condition.intensity + (Math.random() - 0.5) * 20)),
        windSpeed: Math.max(0, randomWeather.condition.windSpeed + (Math.random() - 0.5) * 10),
        temperature: randomWeather.condition.temperature + (Math.random() - 0.5) * 6
      };
      setCurrentWeather(variation);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoWeather, isActive]);

  // Notify parent component of weather changes
  useEffect(() => {
    onWeatherChange(currentWeather);
  }, [currentWeather, onWeatherChange]);

  const setWeatherPreset = (condition: WeatherCondition) => {
    setCurrentWeather(condition);
    setIsAutoWeather(false);
  };

  const getWeatherIcon = () => {
    switch (currentWeather.type) {
      case "clear": return Sun;
      case "cloudy": return Cloud;
      case "rain": return CloudRain;
      case "storm": return Zap;
      case "fog": return Eye;
      case "snow": return CloudSnow;
      default: return Sun;
    }
  };

  const getFlightRisk = () => {
    if (currentWeather.visibility < 1000 || currentWeather.windSpeed > 30 || currentWeather.intensity > 80) {
      return { level: "high", color: "text-red-400", message: "Flight operations not recommended" };
    } else if (currentWeather.visibility < 3000 || currentWeather.windSpeed > 20 || currentWeather.intensity > 50) {
      return { level: "medium", color: "text-yellow-400", message: "Caution advised for flight operations" };
    } else {
      return { level: "low", color: "text-green-400", message: "Optimal conditions for flight" };
    }
  };

  const WeatherIcon = getWeatherIcon();
  const flightRisk = getFlightRisk();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-semibold flex items-center gap-2">
          <WeatherIcon className="w-5 h-5 text-blue-400" />
          Weather System
        </h4>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoWeather(!isAutoWeather)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              isAutoWeather 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Auto
          </button>
        </div>
      </div>

      {/* Current Weather Display */}
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
              weatherPresets.find(w => w.condition.type === currentWeather.type)?.color || 'from-gray-400 to-gray-500'
            } flex items-center justify-center`}>
              <WeatherIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold capitalize">
                {currentWeather.type === "clear" ? "Clear Skies" : currentWeather.type}
              </div>
              <div className={`text-sm ${flightRisk.color}`}>
                {flightRisk.message}
              </div>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded text-xs font-semibold ${
            flightRisk.level === "high" ? "bg-red-900 text-red-200" :
            flightRisk.level === "medium" ? "bg-yellow-900 text-yellow-200" :
            "bg-green-900 text-green-200"
          }`}>
            {flightRisk.level.toUpperCase()} RISK
          </div>
        </div>

        {/* Weather Parameters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Visibility</span>
              <span className="text-white">{(currentWeather.visibility / 1000).toFixed(1)}km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Wind Speed</span>
              <span className="text-white">{Math.round(currentWeather.windSpeed)} km/h</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Temperature</span>
              <span className="text-white">{Math.round(currentWeather.temperature)}°C</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Humidity</span>
              <span className="text-white">{Math.round(currentWeather.humidity)}%</span>
            </div>
          </div>
        </div>

        {/* Intensity Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Intensity</span>
            <span>{Math.round(currentWeather.intensity)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <motion.div 
              className={`h-2 rounded-full ${
                currentWeather.intensity > 70 ? 'bg-red-500' :
                currentWeather.intensity > 40 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${currentWeather.intensity}%` }}
              animate={{ width: `${currentWeather.intensity}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Weather Presets */}
      <div className="space-y-2">
        <div className="text-sm text-gray-400 mb-2">Quick Weather Presets</div>
        {weatherPresets.map((preset, index) => {
          const PresetIcon = preset.icon;
          const isActive = currentWeather.type === preset.condition.type;
          
          return (
            <motion.button
              key={index}
              onClick={() => setWeatherPreset(preset.condition)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-6 h-6 rounded bg-gradient-to-r ${preset.color} flex items-center justify-center flex-shrink-0`}>
                <PresetIcon className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">{preset.name}</span>
              
              {preset.condition.windSpeed > 25 && (
                <AlertTriangle className="w-3 h-3 text-yellow-400 ml-auto" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Weather Effects Warning */}
      {(currentWeather.visibility < 2000 || currentWeather.windSpeed > 25) && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg"
        >
          <div className="flex items-center gap-2 text-yellow-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold">Weather Advisory</span>
          </div>
          <div className="text-xs text-yellow-200 mt-1">
            Current conditions may affect drone performance and navigation accuracy.
          </div>
        </motion.div>
      )}
    </div>
  );
}