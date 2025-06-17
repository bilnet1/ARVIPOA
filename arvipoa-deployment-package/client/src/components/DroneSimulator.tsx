import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DroneWeatherSystem from "./DroneWeatherSystem";
import DroneMissionPlanner from "./DroneMissionPlanner";
import DronePerformanceAnalytics from "./DronePerformanceAnalytics";
import Drone3DVisualization from "./Drone3DVisualization";
import { 
  Plane, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Target, 
  Eye, 
  Thermometer,
  Camera,
  Battery,
  Wifi,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Settings,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

interface DronePosition {
  x: number;
  y: number;
  rotation: number;
}

interface Mission {
  id: string;
  type: "patrol" | "investigate" | "thermal_scan" | "emergency_response";
  target: { x: number; y: number };
  status: "pending" | "active" | "completed";
  duration: number;
}

interface SensorData {
  thermal: number;
  battery: number;
  altitude: number;
  speed: number;
  signal: number;
}

interface WeatherCondition {
  type: "clear" | "cloudy" | "rain" | "storm" | "snow" | "fog";
  intensity: number;
  visibility: number;
  windSpeed: number;
  temperature: number;
  humidity: number;
}

export default function DroneSimulator() {
  const [isActive, setIsActive] = useState(false);
  const [dronePosition, setDronePosition] = useState<DronePosition>({ x: 50, y: 50, rotation: 0 });
  const [missions, setMissions] = useState<Mission[]>([
    { id: "M001", type: "patrol", target: { x: 80, y: 30 }, status: "pending", duration: 45 },
    { id: "M002", type: "thermal_scan", target: { x: 20, y: 70 }, status: "pending", duration: 30 },
    { id: "M003", type: "investigate", target: { x: 60, y: 80 }, status: "pending", duration: 60 }
  ]);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [sensorData, setSensorData] = useState<SensorData>({
    thermal: 22,
    battery: 87,
    altitude: 120,
    speed: 0,
    signal: 95
  });
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isManualControl, setIsManualControl] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>({
    type: "clear",
    intensity: 0,
    visibility: 10000,
    windSpeed: 5,
    temperature: 22,
    humidity: 45
  });
  const [activeView, setActiveView] = useState<"2d" | "3d">("2d");
  const simulationRef = useRef<HTMLDivElement>(null);

  // Simulate drone movement towards target
  useEffect(() => {
    if (!isActive || !activeMission || isManualControl) return;

    const interval = setInterval(() => {
      setDronePosition(prev => {
        const target = activeMission.target;
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          // Mission completed
          setMissions(prevMissions => 
            prevMissions.map(m => 
              m.id === activeMission.id ? { ...m, status: "completed" } : m
            )
          );
          setActiveMission(null);
          setAlerts(prev => [...prev, `Mission ${activeMission.id} completed successfully`]);
          return prev;
        }

        // Weather affects drone speed and performance
        const weatherSpeedModifier = Math.max(0.1, 1 - (currentWeather.windSpeed / 100) - (currentWeather.intensity / 200));
        const speed = 0.5 * weatherSpeedModifier;
        
        const newX = prev.x + (dx / distance) * speed;
        const newY = prev.y + (dy / distance) * speed;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

        // Update sensor data based on movement and weather
        setSensorData(prevData => ({
          ...prevData,
          speed: Math.round(distance * 2 * weatherSpeedModifier),
          thermal: currentWeather.temperature + Math.random() * 8,
          signal: Math.max(10, 95 - (currentWeather.intensity / 2) - ((10000 - currentWeather.visibility) / 100))
        }));

        return { x: newX, y: newY, rotation };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, activeMission, isManualControl]);

  // Battery drain simulation
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSensorData(prev => {
        const newBattery = Math.max(0, prev.battery - 0.1);
        if (newBattery < 20 && prev.battery >= 20) {
          setAlerts(prevAlerts => [...prevAlerts, "Low battery warning - Return to base recommended"]);
        }
        return { ...prev, battery: newBattery };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const startMission = (mission: Mission) => {
    if (activeMission) {
      setAlerts(prev => [...prev, "Another mission is already active"]);
      return;
    }

    setActiveMission(mission);
    setMissions(prev => prev.map(m => 
      m.id === mission.id ? { ...m, status: "active" } : m
    ));
    setAlerts(prev => [...prev, `Mission ${mission.id} started - ${mission.type}`]);
  };

  const handleManualControl = (direction: "up" | "down" | "left" | "right") => {
    if (!isManualControl) return;

    setDronePosition(prev => {
      const step = 2;
      let newX = prev.x;
      let newY = prev.y;
      let newRotation = prev.rotation;

      switch (direction) {
        case "up":
          newY = Math.max(5, prev.y - step);
          newRotation = -90;
          break;
        case "down":
          newY = Math.min(95, prev.y + step);
          newRotation = 90;
          break;
        case "left":
          newX = Math.max(5, prev.x - step);
          newRotation = 180;
          break;
        case "right":
          newX = Math.min(95, prev.x + step);
          newRotation = 0;
          break;
      }

      setSensorData(prev => ({ ...prev, speed: 15 }));
      
      return { x: newX, y: newY, rotation: newRotation };
    });
  };

  const handlePlannedMissionCreate = (plannedMission: any) => {
    // Convert planned mission to standard mission format
    if (plannedMission.waypoints && plannedMission.waypoints.length > 0) {
      const firstWaypoint = plannedMission.waypoints[0];
      const newMission: Mission = {
        id: plannedMission.id,
        type: firstWaypoint.action === "thermal" ? "thermal_scan" : 
              firstWaypoint.action === "scan" ? "investigate" : "patrol",
        target: { x: firstWaypoint.x, y: firstWaypoint.y },
        status: "pending",
        duration: plannedMission.estimatedDuration
      };
      
      setMissions(prev => [...prev, newMission]);
      setAlerts(prev => [...prev, `Custom mission ${plannedMission.name} created`]);
    }
  };

  const handleFlightZoneClick = (event: React.MouseEvent) => {
    if (!simulationRef.current) return;
    
    const rect = simulationRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // This will be handled by the mission planner if it's in creation mode
    // For now, just add a basic mission target
    console.log('Flight zone clicked at:', { x, y });
  };

  const resetSimulation = () => {
    setIsActive(false);
    setDronePosition({ x: 50, y: 50, rotation: 0 });
    setActiveMission(null);
    setMissions(prev => prev.map(m => ({ ...m, status: "pending" })));
    setSensorData({
      thermal: 22,
      battery: 87,
      altitude: 120,
      speed: 0,
      signal: 95
    });
    setAlerts([]);
    setIsManualControl(false);
  };

  const handleWeatherChange = (weather: WeatherCondition) => {
    setCurrentWeather(weather);
    
    // Add weather-related alerts
    if (weather.windSpeed > 25 && currentWeather.windSpeed <= 25) {
      setAlerts(prev => [...prev, "High wind warning - Mission performance may be affected"]);
    }
    if (weather.visibility < 1000 && currentWeather.visibility >= 1000) {
      setAlerts(prev => [...prev, "Low visibility conditions detected"]);
    }
  };

  const getWeatherVisualEffects = () => {
    const effects = [];
    
    // Rain effects
    if (currentWeather.type === "rain" || currentWeather.type === "storm") {
      for (let i = 0; i < currentWeather.intensity / 5; i++) {
        effects.push(
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, 50],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        );
      }
    }
    
    // Snow effects
    if (currentWeather.type === "snow") {
      for (let i = 0; i < currentWeather.intensity / 8; i++) {
        effects.push(
          <motion.div
            key={`snow-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, 100],
              x: [0, Math.random() * 20 - 10],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        );
      }
    }
    
    return effects;
  };

  const getMissionIcon = (type: Mission['type']) => {
    switch (type) {
      case "patrol": return <Eye className="w-4 h-4" />;
      case "thermal_scan": return <Thermometer className="w-4 h-4" />;
      case "investigate": return <Target className="w-4 h-4" />;
      case "emergency_response": return <AlertTriangle className="w-4 h-4" />;
      default: return <Plane className="w-4 h-4" />;
    }
  };

  const getMissionColor = (type: Mission['type']) => {
    switch (type) {
      case "patrol": return "from-blue-500 to-cyan-500";
      case "thermal_scan": return "from-red-500 to-orange-500";
      case "investigate": return "from-purple-500 to-pink-500";
      case "emergency_response": return "from-yellow-500 to-red-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-white">Drone Interaction Simulator</h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isActive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={resetSimulation}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsManualControl(!isManualControl)}
            className={`p-2 rounded-lg transition-colors ${
              isManualControl 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Simulation Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Flight Zone
              </h4>
              
              <div 
                ref={simulationRef}
                className={`relative bg-gradient-to-br rounded-lg border-2 border-dashed border-gray-600 aspect-video overflow-hidden cursor-crosshair ${
                  currentWeather.type === "storm" ? "from-purple-900/40 to-gray-900/60" :
                  currentWeather.type === "rain" ? "from-blue-900/30 to-gray-800/40" :
                  currentWeather.type === "snow" ? "from-blue-200/10 to-white/20" :
                  currentWeather.type === "fog" ? "from-gray-700/50 to-gray-900/70" :
                  "from-blue-900/20 to-purple-900/20"
                }`}
                onClick={handleFlightZoneClick}
              >
                {/* Weather Visual Effects */}
                {getWeatherVisualEffects()}
                
                {/* Fog/Visibility Overlay */}
                {currentWeather.visibility < 5000 && (
                  <motion.div 
                    className="absolute inset-0 bg-gray-400 pointer-events-none"
                    style={{ 
                      opacity: Math.max(0, (5000 - currentWeather.visibility) / 5000 * 0.6)
                    }}
                    animate={{ 
                      opacity: [
                        Math.max(0, (5000 - currentWeather.visibility) / 5000 * 0.6),
                        Math.max(0, (5000 - currentWeather.visibility) / 5000 * 0.8),
                        Math.max(0, (5000 - currentWeather.visibility) / 5000 * 0.6)
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
                {/* Mission Targets */}
                {missions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    className={`absolute w-8 h-8 rounded-full border-2 ${
                      mission.status === "completed" 
                        ? "border-green-500 bg-green-500/20" 
                        : mission.status === "active"
                        ? "border-yellow-500 bg-yellow-500/20 animate-pulse"
                        : "border-gray-500 bg-gray-500/20"
                    } flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110 transition-transform`}
                    style={{ 
                      left: `${mission.target.x}%`, 
                      top: `${mission.target.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => !isActive && startMission(mission)}
                    whileHover={{ scale: 1.2 }}
                  >
                    {getMissionIcon(mission.type)}
                  </motion.div>
                ))}

                {/* Drone */}
                <motion.div
                  className="absolute w-12 h-12 flex items-center justify-center"
                  style={{ 
                    left: `${dronePosition.x}%`, 
                    top: `${dronePosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{ 
                    rotate: dronePosition.rotation,
                    scale: isActive ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ 
                    rotate: { duration: 0.3 },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className={`w-10 h-10 rounded-full ${
                    isActive ? 'bg-green-500' : 'bg-gray-600'
                  } flex items-center justify-center shadow-lg`}>
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Drone Trail */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Range Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute border border-green-500/30 rounded-full"
                    style={{ 
                      left: `${dronePosition.x}%`, 
                      top: `${dronePosition.y}%`,
                      width: '200px',
                      height: '200px',
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Manual Controls */}
              {isManualControl && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex justify-center"
                >
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-center text-white text-sm mb-2">Manual Control</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div></div>
                      <button
                        onClick={() => handleManualControl("up")}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <ArrowUp className="w-4 h-4 text-white" />
                      </button>
                      <div></div>
                      
                      <button
                        onClick={() => handleManualControl("left")}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                      <div className="p-3 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Plane className="w-4 h-4 text-gray-400" />
                      </div>
                      <button
                        onClick={() => handleManualControl("right")}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                      
                      <div></div>
                      <button
                        onClick={() => handleManualControl("down")}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <ArrowDown className="w-4 h-4 text-white" />
                      </button>
                      <div></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 3D Visualization Panel */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-semibold">Visualization Mode</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveView("2d")}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      activeView === "2d" ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    2D View
                  </button>
                  <button
                    onClick={() => setActiveView("3d")}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      activeView === "3d" ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    3D View
                  </button>
                </div>
              </div>
              
              {activeView === "3d" && (
                <Drone3DVisualization
                  dronePosition={dronePosition}
                  isActive={isActive}
                  altitude={sensorData.altitude}
                  missions={missions}
                />
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Mission Planner */}
            <DroneMissionPlanner
              onMissionCreate={handlePlannedMissionCreate}
              isActive={isActive}
            />
            
            {/* Weather System */}
            <DroneWeatherSystem 
              onWeatherChange={handleWeatherChange}
              isActive={isActive}
            />

            {/* Performance Analytics */}
            <DronePerformanceAnalytics
              isActive={isActive}
              currentMetrics={{
                speed: sensorData.speed,
                battery: sensorData.battery,
                signal: sensorData.signal,
                thermal: sensorData.thermal
              }}
              weatherConditions={{
                windSpeed: currentWeather.windSpeed,
                visibility: currentWeather.visibility,
                intensity: currentWeather.intensity
              }}
            />
            
            {/* Sensor Data */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Telemetry
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Battery className="w-4 h-4" />
                    Battery
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${
                          sensorData.battery > 50 ? 'bg-green-500' : 
                          sensorData.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${sensorData.battery}%` }}
                        animate={{ width: `${sensorData.battery}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{Math.round(sensorData.battery)}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Thermal
                  </span>
                  <span className="text-white text-sm">{sensorData.thermal.toFixed(1)}°C</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Speed
                  </span>
                  <span className="text-white text-sm">{sensorData.speed} km/h</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Signal
                  </span>
                  <span className="text-white text-sm">{Math.round(sensorData.signal)}%</span>
                </div>
              </div>
            </div>

            {/* Mission List */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Missions
              </h4>
              
              <div className="space-y-2">
                {missions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      mission.status === "completed" 
                        ? "bg-green-900/20 border-green-700" 
                        : mission.status === "active"
                        ? "bg-yellow-900/20 border-yellow-700"
                        : "bg-gray-700 border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => mission.status === "pending" && startMission(mission)}
                    whileHover={{ scale: mission.status === "pending" ? 1.02 : 1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{mission.id}</span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        mission.status === "completed" 
                          ? "bg-green-700 text-green-200" 
                          : mission.status === "active"
                          ? "bg-yellow-700 text-yellow-200"
                          : "bg-gray-600 text-gray-300"
                      }`}>
                        {mission.status === "completed" && <CheckCircle className="w-3 h-3" />}
                        {mission.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className={`w-6 h-6 rounded bg-gradient-to-r ${getMissionColor(mission.type)} flex items-center justify-center`}>
                        {getMissionIcon(mission.type)}
                      </div>
                      <span>{mission.type.replace('_', ' ')}</span>
                      <span>• {mission.duration}s</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                System Alerts
              </h4>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <AnimatePresence>
                  {alerts.slice(-3).map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-sm text-gray-300 bg-gray-700 p-2 rounded"
                    >
                      {alert}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {alerts.length === 0 && (
                  <div className="text-sm text-gray-500 italic">No alerts</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}