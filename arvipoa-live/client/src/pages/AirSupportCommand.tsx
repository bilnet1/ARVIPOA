import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DroneSimulator from "../components/DroneSimulator";
import AIPilotPanel from "../components/AIPilotPanel";
import { 
  Plane, 
  Eye, 
  Flame, 
  Shield, 
  Camera, 
  Zap, 
  MapPin, 
  Users, 
  Clock, 
  AlertTriangle,
  Play,
  Pause,
  Settings,
  Activity,
  Thermometer,
  Scan,
  PhoneCall,
  CheckCircle,
  ArrowRight,
  Target,
  Wifi,
  Battery
} from "lucide-react";

interface DroneStatus {
  id: string;
  name: string;
  status: "active" | "standby" | "maintenance";
  location: { lat: number; lng: number };
  battery: number;
  altitude: number;
  mission: string;
  lastSeen: string;
}

interface AlertData {
  id: string;
  type: "fire" | "intrusion" | "thermal" | "facial";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  timestamp: string;
  status: "detected" | "dispatched" | "responding" | "resolved";
  droneAssigned?: string;
}

export default function AirSupportCommand() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLive, setIsLive] = useState(true);
  const [drones] = useState<DroneStatus[]>([
    {
      id: "ASC-001",
      name: "Eagle Eye Alpha",
      status: "active",
      location: { lat: 5.6037, lng: -0.1870 },
      battery: 87,
      altitude: 120,
      mission: "Perimeter Patrol",
      lastSeen: "2 min ago"
    },
    {
      id: "ASC-002", 
      name: "Thermal Hawk",
      status: "active",
      location: { lat: 5.6045, lng: -0.1865 },
      battery: 92,
      altitude: 150,
      mission: "Fire Detection",
      lastSeen: "1 min ago"
    },
    {
      id: "ASC-003",
      name: "Guardian Beta",
      status: "standby",
      location: { lat: 5.6040, lng: -0.1875 },
      battery: 100,
      altitude: 0,
      mission: "Ready",
      lastSeen: "5 min ago"
    }
  ]);

  const [alerts] = useState<AlertData[]>([
    {
      id: "ALT-001",
      type: "thermal",
      severity: "high",
      location: "Sector 7-A",
      timestamp: "2 min ago",
      status: "responding",
      droneAssigned: "ASC-002"
    },
    {
      id: "ALT-002",
      type: "intrusion",
      severity: "medium",
      location: "Perimeter Gate 3",
      timestamp: "8 min ago",
      status: "resolved",
      droneAssigned: "ASC-001"
    }
  ]);

  const features = [
    {
      icon: Thermometer,
      title: "Thermal Imaging",
      description: "Advanced thermal detection for fire prevention and human detection",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Scan,
      title: "Facial Recognition",
      description: "AI-powered facial recognition with privacy protection (MR VIEW)",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Flame,
      title: "Fire Response",
      description: "Automated fire detection and emergency dispatch protocols",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "MeFoCaPrIS Privacy",
      description: "Media Footage Capturing Privacy Infringement System protection",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Eye,
      title: "24/7 Surveillance",
      description: "Continuous aerial monitoring with intelligent threat detection",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PhoneCall,
      title: "Emergency Dispatch",
      description: "Instant communication with local authorities and property owners",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const responseFlow = [
    { step: 1, title: "CCTV Detection", icon: Camera, status: "completed" },
    { step: 2, title: "Alert Generated", icon: AlertTriangle, status: "completed" },
    { step: 3, title: "Drone Dispatch", icon: Plane, status: "active" },
    { step: 4, title: "Human Support", icon: Users, status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                <Plane className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Air Support Command
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Advanced aerial protection powered by AI, thermal imaging, and intelligent threat response systems
            </p>
            
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("live")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg flex items-center gap-2"
              >
                <Activity className="w-5 h-5" />
                Activate Drone Coverage
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 hover:border-gray-500 px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Command Center
              </motion.button>
            </div>
          </motion.div>

          {/* Live Status Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="font-semibold">{isLive ? 'LIVE MONITORING' : 'OFFLINE'}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Active Drones: {drones.filter(d => d.status === 'active').length}</span>
                <span>Coverage: 98.7%</span>
                <span>Response Time: 42s avg</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {drones.map((drone, index) => (
                <motion.div
                  key={drone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-3 text-center"
                >
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    drone.status === 'active' ? 'bg-green-600' :
                    drone.status === 'standby' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold">{drone.name}</div>
                  <div className="text-xs text-gray-400">{drone.battery}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alert Response Flow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Intelligent Response Flow
          </motion.h2>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-8">
              {responseFlow.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative text-center"
                  >
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full border-4 flex items-center justify-center relative z-10 ${
                      step.status === 'completed' ? 'bg-green-600 border-green-500' :
                      step.status === 'active' ? 'bg-blue-600 border-blue-500 animate-pulse' :
                      'bg-gray-700 border-gray-600'
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                      step.status === 'completed' ? 'bg-green-900 text-green-300' :
                      step.status === 'active' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {step.status}
                    </div>
                    
                    {index < responseFlow.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-gray-600 absolute top-10 -right-3 hidden md:block" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Advanced Aerial Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Drone Simulator */}
      <section className="py-16 bg-black/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-6"
          >
            Interactive Drone Simulator
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Experience real-time drone operations with our advanced simulator. Control drones, execute missions, 
            and monitor telemetry data in a safe virtual environment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <DroneSimulator />
          </motion.div>
        </div>
      </section>

      {/* Live Dashboard Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Command Dashboard
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">Air Support Control</h3>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  System Operational
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Active Alerts */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Active Alerts
                  </h4>
                  
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            alert.severity === 'critical' ? 'bg-red-900 text-red-300' :
                            alert.severity === 'high' ? 'bg-orange-900 text-orange-300' :
                            alert.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {alert.type.toUpperCase()}
                          </div>
                          <span className="text-xs text-gray-400">{alert.timestamp}</span>
                        </div>
                        
                        <div className="text-sm">
                          <div className="font-medium">{alert.location}</div>
                          <div className="text-gray-400">
                            Status: {alert.status} 
                            {alert.droneAssigned && ` • Drone: ${alert.droneAssigned}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Drone Fleet Status */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-500" />
                    Fleet Status
                  </h4>
                  
                  <div className="space-y-3">
                    {drones.map((drone) => (
                      <div key={drone.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{drone.name}</div>
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            drone.status === 'active' ? 'bg-green-900 text-green-300' :
                            drone.status === 'standby' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {drone.status}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Battery className="w-3 h-3" />
                            {drone.battery}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {drone.altitude}m
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {drone.lastSeen}
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-300">{drone.mission}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Pilot Control System */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-6"
          >
            AI Pilot Control System
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Advanced autonomous drone control with live video feed, mission management, 
            and intelligent AI pilot assistance for comprehensive aerial operations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <AIPilotPanel />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Security?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Deploy ARVIPOA Air Support Command for comprehensive aerial protection 
              with AI-powered threat detection and emergency response.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Plane className="w-6 h-6" />
                Activate Drone Coverage
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-6 h-6" />
                Contact Air Command
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}