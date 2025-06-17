import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Square,
  Target, 
  Eye, 
  Home, 
  Zap,
  Activity,
  Camera,
  Crosshair,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Signal,
  Battery,
  Thermometer,
  Wind,
  Navigation,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Settings,
  Radio,
  Wifi,
  Shield
} from "lucide-react";

interface MissionLog {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
}

interface FlightPath {
  lat: number;
  lng: number;
  altitude: number;
  timestamp: number;
}

interface AIStatus {
  mode: "autonomous" | "assisted" | "manual";
  confidence: number;
  processing: boolean;
  threats: number;
  targets: number;
}

export default function AIPilotPanel() {
  const [isActive, setIsActive] = useState(false);
  const [currentMission, setCurrentMission] = useState<string | null>(null);
  const [missionLogs, setMissionLogs] = useState<MissionLog[]>([]);
  const [flightPath, setFlightPath] = useState<FlightPath[]>([]);
  const [videoFeedActive, setVideoFeedActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiStatus, setAiStatus] = useState<AIStatus>({
    mode: "autonomous",
    confidence: 87,
    processing: false,
    threats: 0,
    targets: 2
  });

  const [telemetry, setTelemetry] = useState({
    altitude: 120,
    speed: 15,
    heading: 245,
    battery: 78,
    signal: 92,
    temperature: 22,
    windSpeed: 8,
    gpsLock: true
  });

  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);

  const missionTypes = [
    { id: "patrol", label: "Start Patrol", icon: Eye, color: "bg-blue-600 hover:bg-blue-700" },
    { id: "engage", label: "Engage Target", icon: Target, color: "bg-red-600 hover:bg-red-700" },
    { id: "scan", label: "Scan Zone", icon: Crosshair, color: "bg-purple-600 hover:bg-purple-700" },
    { id: "return", label: "Return to Base", icon: Home, color: "bg-green-600 hover:bg-green-700" }
  ];

  // Simulate telemetry updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        altitude: prev.altitude + (Math.random() - 0.5) * 5,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 3),
        heading: (prev.heading + (Math.random() - 0.5) * 10 + 360) % 360,
        battery: Math.max(0, prev.battery - 0.1),
        signal: Math.max(50, prev.signal + (Math.random() - 0.5) * 5),
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 2)
      }));

      // Simulate flight path
      if (currentMission) {
        setFlightPath(prev => [...prev.slice(-10), {
          lat: 5.6037 + (Math.random() - 0.5) * 0.01,
          lng: -0.1870 + (Math.random() - 0.5) * 0.01,
          altitude: telemetry.altitude,
          timestamp: Date.now()
        }]);
      }

      // Update AI status
      setAiStatus(prev => ({
        ...prev,
        confidence: Math.max(60, Math.min(100, prev.confidence + (Math.random() - 0.5) * 5)),
        threats: Math.floor(Math.random() * 3),
        targets: Math.floor(Math.random() * 5)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentMission, telemetry.altitude]);

  const addMissionLog = (message: string, type: MissionLog['type'] = "info") => {
    const log: MissionLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setMissionLogs(prev => [log, ...prev.slice(0, 9)]);
  };

  const startMission = (missionId: string) => {
    if (currentMission) {
      addMissionLog("Previous mission terminated", "warning");
    }
    
    setCurrentMission(missionId);
    setIsActive(true);
    setVideoFeedActive(true);
    setAiStatus(prev => ({ ...prev, processing: true }));
    
    const mission = missionTypes.find(m => m.id === missionId);
    addMissionLog(`${mission?.label} initiated`, "success");
    addMissionLog("AI pilot system engaged", "info");
    addMissionLog("Video feed activated", "info");
    
    setTimeout(() => {
      setAiStatus(prev => ({ ...prev, processing: false }));
      addMissionLog("Mission parameters confirmed", "success");
    }, 2000);
  };

  const stopMission = () => {
    if (currentMission) {
      addMissionLog("Mission terminated by operator", "warning");
    }
    setCurrentMission(null);
    setIsActive(false);
    setVideoFeedActive(false);
    setFlightPath([]);
    addMissionLog("Systems returning to standby", "info");
  };

  const handleJoystickMove = (event: React.MouseEvent) => {
    if (!joystickRef.current || aiStatus.mode === "autonomous") return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = Math.max(-50, Math.min(50, event.clientX - rect.left - centerX));
    const y = Math.max(-50, Math.min(50, event.clientY - rect.top - centerY));
    
    setJoystickPosition({ x, y });
    
    if (Math.abs(x) > 10 || Math.abs(y) > 10) {
      addMissionLog(`Manual control input: ${x > 0 ? 'Right' : 'Left'} ${y > 0 ? 'Down' : 'Up'}`, "info");
    }
  };

  const resetJoystick = () => {
    setJoystickPosition({ x: 0, y: 0 });
  };

  const generateVideoFeed = () => {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
        {/* Simulated video static */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        {/* Crosshair overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-green-400 rounded-full opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-3 grid-rows-3 h-full border border-green-400">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-green-400/20" />
            ))}
          </div>
        </div>

        {/* Target indicators */}
        {aiStatus.targets > 0 && (
          <motion.div
            className="absolute top-1/4 right-1/3 w-6 h-6 border-2 border-red-400 rounded"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-mono">
              TGT-01
            </div>
          </motion.div>
        )}

        {/* Status overlays */}
        <div className="absolute top-4 left-4 space-y-1">
          <div className="bg-black/50 px-2 py-1 rounded text-xs font-mono text-green-400">
            REC {videoFeedActive && <span className="animate-pulse">●</span>}
          </div>
          <div className="bg-black/50 px-2 py-1 rounded text-xs font-mono text-white">
            ALT: {Math.round(telemetry.altitude)}M
          </div>
          <div className="bg-black/50 px-2 py-1 rounded text-xs font-mono text-white">
            HDG: {Math.round(telemetry.heading)}°
          </div>
        </div>

        <div className="absolute top-4 right-4 text-xs font-mono text-green-400">
          <div className="bg-black/50 px-2 py-1 rounded">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-xs font-mono text-yellow-400">
          <div className="bg-black/50 px-2 py-1 rounded">
            AI CONFIDENCE: {aiStatus.confidence}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-700 overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              AI Pilot Control System
            </h3>
            
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isActive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
              {isActive ? 'ACTIVE' : 'STANDBY'}
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-blue-900 text-blue-300">
              <Radio className="w-3 h-3" />
              {aiStatus.mode.toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                audioEnabled ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Feed & Controls */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Feed */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-400" />
                  Live Video Feed
                </h4>
                
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs ${
                    videoFeedActive ? 'bg-red-900 text-red-200' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {videoFeedActive ? 'LIVE' : 'OFFLINE'}
                  </div>
                  
                  <button
                    onClick={() => setVideoFeedActive(!videoFeedActive)}
                    className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    <Settings className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="aspect-video bg-black">
                {videoFeedActive ? generateVideoFeed() : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <div>Video Feed Offline</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mission Controls */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Mission Control
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {missionTypes.map((mission) => {
                  const IconComponent = mission.icon;
                  const isCurrentMission = currentMission === mission.id;
                  
                  return (
                    <motion.button
                      key={mission.id}
                      onClick={() => isCurrentMission ? stopMission() : startMission(mission.id)}
                      className={`p-3 rounded-lg font-semibold text-sm transition-all flex flex-col items-center gap-2 ${
                        isCurrentMission 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : mission.color + ' text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isCurrentMission && currentMission !== mission.id}
                    >
                      <IconComponent className="w-5 h-5" />
                      {isCurrentMission ? 'ABORT' : mission.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Emergency Stop */}
              <motion.button
                onClick={stopMission}
                className="w-full p-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Square className="w-5 h-5 inline mr-2" />
                EMERGENCY STOP
              </motion.button>
            </div>

            {/* Flight Path Visualization */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-green-400" />
                Flight Path
              </h4>
              
              <div className="relative bg-gray-700 rounded-lg h-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-gray-500" style={{ top: `${i * 20}%` }} />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-gray-500" style={{ left: `${i * 10}%` }} />
                    ))}
                  </div>
                  
                  {/* Flight path */}
                  {flightPath.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full">
                      <polyline
                        points={flightPath.map((point, index) => 
                          `${(index / flightPath.length) * 100},${50 + Math.sin(index * 0.5) * 20}`
                        ).join(' ')}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        className="opacity-80"
                      />
                    </svg>
                  )}
                  
                  {/* Current position */}
                  {isActive && (
                    <motion.div
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{ 
                        left: flightPath.length > 0 ? `${((flightPath.length - 1) / Math.max(flightPath.length - 1, 1)) * 100}%` : '50%',
                        top: '50%'
                      }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
                
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    No active flight path
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* AI Status */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                AI Status
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-white">{aiStatus.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full ${
                        aiStatus.confidence > 80 ? 'bg-green-500' : 
                        aiStatus.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${aiStatus.confidence}%` }}
                      animate={{ width: `${aiStatus.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-700 rounded">
                    <div className="text-gray-400">Threats</div>
                    <div className={`text-lg font-bold ${
                      aiStatus.threats > 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {aiStatus.threats}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 bg-gray-700 rounded">
                    <div className="text-gray-400">Targets</div>
                    <div className="text-lg font-bold text-blue-400">{aiStatus.targets}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {['autonomous', 'assisted', 'manual'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAiStatus(prev => ({ ...prev, mode: mode as any }))}
                      className={`flex-1 py-1 px-2 rounded text-xs font-semibold transition-colors ${
                        aiStatus.mode === mode
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Telemetry
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Alt
                  </span>
                  <span className="text-white">{Math.round(telemetry.altitude)}m</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    Spd
                  </span>
                  <span className="text-white">{Math.round(telemetry.speed)} km/h</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Battery className="w-3 h-3" />
                    Bat
                  </span>
                  <span className={`${telemetry.battery < 20 ? 'text-red-400' : 'text-white'}`}>
                    {Math.round(telemetry.battery)}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    Sig
                  </span>
                  <span className="text-white">{Math.round(telemetry.signal)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    Tmp
                  </span>
                  <span className="text-white">{Math.round(telemetry.temperature)}°C</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    Wnd
                  </span>
                  <span className="text-white">{Math.round(telemetry.windSpeed)} km/h</span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-center">
                <div className={`px-2 py-1 rounded text-xs ${
                  telemetry.gpsLock ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                }`}>
                  GPS: {telemetry.gpsLock ? 'LOCKED' : 'SEARCHING'}
                </div>
              </div>
            </div>

            {/* Manual Controls */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                Manual Controls
              </h4>
              
              <div className="flex justify-center mb-4">
                <div 
                  ref={joystickRef}
                  className="relative w-24 h-24 bg-gray-700 rounded-full border-2 border-gray-600 cursor-pointer"
                  onMouseMove={handleJoystickMove}
                  onMouseLeave={resetJoystick}
                >
                  <motion.div
                    className="absolute w-8 h-8 bg-blue-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      x: joystickPosition.x,
                      y: joystickPosition.y
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 bg-white rounded-full opacity-50" />
                  </div>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-400 mb-3">
                {aiStatus.mode === "autonomous" ? "AI Controlled" : "Manual Override Available"}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold text-white transition-colors">
                  TAKEOFF
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold text-white transition-colors">
                  LAND
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold text-white transition-colors">
                  HOVER
                </button>
                <button className="p-2 bg-red-700 hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors">
                  ABORT
                </button>
              </div>
            </div>

            {/* Mission Log */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Mission Log
              </h4>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <AnimatePresence>
                  {missionLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`text-xs p-2 rounded border-l-2 ${
                        log.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-200' :
                        log.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-200' :
                        log.type === 'error' ? 'bg-red-900/20 border-red-500 text-red-200' :
                        'bg-gray-700 border-gray-500 text-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="flex-1">{log.message}</span>
                        <span className="text-xs opacity-60 ml-2">{log.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {missionLogs.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-4">
                    No mission logs
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}