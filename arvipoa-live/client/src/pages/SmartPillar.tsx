import { motion } from "framer-motion";
import { Cpu, Mic, Volume2, Flame, Droplets, Zap, Wifi, Music, Eye, AlertTriangle, Battery, ShieldAlert } from "lucide-react";
import smartPillarEnhanced from "@assets/smart pillar enhanced with icons.png";
import smartPillarInstallation from "@assets/smart pillar installation by a woman.png";
import smartPillarEVCharging from "@assets/SMART PILLAR EV CHARGING.png";
import smartPillarSolarCharging from "@assets/SMART PILLAR SOLAR CHARGING.png";
import smartPillarWaterSprinkling from "@assets/SMART PILLAR WATER SPRINKLING OUT.png";
import smartBoundaryGunshotDetection from "@assets/SMART BOUNDARY PILLAR gunshot detection.png";
import smartBoundaryWaterLeakage from "@assets/SMART BOUNDARY PILLAR water leakage detection.png";

export default function SmartPillar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ARVIPOA Smart Pillar System
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary IoT boundary monitoring with AI-powered surveillance, environmental sensors, 
              emergency communication, and autonomous threat detection for comprehensive property protection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={smartPillarEnhanced} 
                alt="ARVIPOA Smart Pillar with AI Features" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                Advanced AI-Powered Monitoring
              </h2>
              <p className="text-gray-300 text-lg">
                The ARVIPOA Smart Pillar integrates cutting-edge technology with autonomous drone coordination, 
                environmental monitoring, and real-time communication systems to provide unparalleled property security.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">360° AI Vision</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mic className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Voice Recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-red-400" />
                  <span className="text-gray-300">Fire Detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Wildlife Monitoring</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* EV Charging Integration */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                Smart Pillar EV Charging Station
              </h2>
              <p className="text-gray-300 text-lg">
                Revolutionary integration of electric vehicle charging with comprehensive security monitoring. 
                The Smart Pillar EV Charging Station combines sustainable energy solutions with advanced surveillance technology.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Fast EV Charging</span>
                </div>
                <div className="flex items-center gap-3">
                  <Battery className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Solar Powered</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Charging Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">Smart Grid Integration</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-bold text-green-400 mb-2">Sustainable Charging Solution</h4>
                <p className="text-gray-300 text-sm">
                  Combines renewable energy generation with intelligent charging management, 
                  reducing carbon footprint while maintaining comprehensive security coverage.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src={smartPillarEVCharging} 
                alt="ARVIPOA Smart Pillar EV Charging Station" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Solar Charging Integration */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img 
                src={smartPillarSolarCharging} 
                alt="ARVIPOA Smart Pillar Solar Charging System" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                Smart Pillar Solar Charging System
              </h2>
              <p className="text-gray-300 text-lg">
                Advanced solar panel integration provides autonomous energy generation for continuous operation. 
                The Smart Pillar Solar Charging System ensures 24/7 monitoring capabilities while maintaining environmental sustainability.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Battery className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Autonomous Power</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                  <span className="text-gray-300">Solar Generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Continuous Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Weather Resistant</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/30">
                <h4 className="font-bold text-yellow-400 mb-2">Zero Carbon Footprint Security</h4>
                <p className="text-gray-300 text-sm">
                  Harnesses renewable solar energy to power advanced AI monitoring systems, 
                  providing eco-friendly security solutions that operate independently from traditional power grids.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Water Management Integration */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                Smart Pillar Water Management System
              </h2>
              <p className="text-gray-300 text-lg">
                Advanced water distribution system provides automated irrigation and fire suppression capabilities. 
                The Smart Pillar Water Management integrates environmental monitoring with precision water deployment for optimal property protection.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Smart Irrigation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-red-400" />
                  <span className="text-gray-300">Fire Suppression</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">Moisture Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">AI Water Control</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">Intelligent Water Distribution</h4>
                <p className="text-gray-300 text-sm">
                  Automatically deploys water based on environmental conditions, soil moisture detection, 
                  and fire threat assessment for optimal property maintenance and emergency response.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <img 
                src={smartPillarWaterSprinkling} 
                alt="ARVIPOA Smart Pillar Water Sprinkling System" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Boundary Security Detection */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Smart Boundary Pillar Security Detection
          </motion.h2>

          {/* Gunshot Detection */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={smartBoundaryGunshotDetection} 
                alt="Smart Boundary Pillar Gunshot Detection System" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white">
                Advanced Gunshot Detection System
              </h3>
              <p className="text-gray-300 text-lg">
                Real-time audio analysis and acoustic signature recognition instantly detects gunshots from unlicensed weapons. 
                The system provides immediate alerts to property owners and security authorities when unauthorized firearms are discharged.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                  <span className="text-gray-300">Threat Detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mic className="w-6 h-6 text-orange-400" />
                  <span className="text-gray-300">Audio Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Instant Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Network Response</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/30">
                <h4 className="font-bold text-red-400 mb-2">Security Protocol Activation</h4>
                <p className="text-gray-300 text-sm">
                  Upon detecting gunshot signatures, the system immediately notifies authorities, activates emergency protocols, 
                  and provides real-time location data for rapid response coordination.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Water Leakage Detection */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h3 className="text-3xl font-bold text-white">
                Intelligent Water Leakage Detection
              </h3>
              <p className="text-gray-300 text-lg">
                Advanced sensor network monitors utility water flow and instantly detects pipeline disruptions or leakages. 
                The system automatically stops water flow to prevent wastage and property damage while alerting maintenance teams.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Flow Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">Leak Detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Auto-Shutdown</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Damage Prevention</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">Smart Water Conservation</h4>
                <p className="text-gray-300 text-sm">
                  Continuous monitoring of utility transmission systems ensures immediate response to pipeline damage, 
                  preventing water wastage and maintaining optimal resource management across the property network.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img 
                src={smartBoundaryWaterLeakage} 
                alt="Smart Boundary Pillar Water Leakage Detection System" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Professional Installation & Deployment
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Expert Installation Team</h3>
              <p className="text-gray-300 text-lg">
                Our certified technicians ensure proper deployment and calibration of each Smart Pillar system, 
                providing comprehensive training and ongoing support for optimal performance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Site Assessment</h4>
                    <p className="text-gray-400">Comprehensive property analysis and optimal placement planning</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">System Installation</h4>
                    <p className="text-gray-400">Professional mounting, wiring, and network configuration</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">AI Calibration</h4>
                    <p className="text-gray-400">Advanced sensor tuning and machine learning model deployment</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={smartPillarInstallation} 
                alt="ARVIPOA Smart Pillar Installation by Professional Technician" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Grid */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Comprehensive Feature Set
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">AI Vision System</h3>
              <p className="text-sm text-gray-400">Advanced computer vision with facial recognition and threat detection</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Voice Recognition</h3>
              <p className="text-sm text-gray-400">Multi-language voice commands and emergency communication</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Fire Detection</h3>
              <p className="text-sm text-gray-400">Thermal sensors with automatic fire department notification</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Weather Monitoring</h3>
              <p className="text-sm text-gray-400">Environmental sensors for climate and air quality tracking</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Solar Power</h3>
              <p className="text-sm text-gray-400">Self-sustaining energy with battery backup systems</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Audio System</h3>
              <p className="text-sm text-gray-400">High-quality speakers for announcements and emergency alerts</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Wildlife Detection</h3>
              <p className="text-sm text-gray-400">AI-powered animal recognition for crop and livestock protection</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">IoT Connectivity</h3>
              <p className="text-sm text-gray-400">Seamless integration with ARVIPOA ecosystem and mobile apps</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">EV Charging</h3>
              <p className="text-sm text-gray-400">Integrated electric vehicle charging with smart grid management</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Solar Power</h3>
              <p className="text-sm text-gray-400">Autonomous renewable energy generation for continuous operation</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Water Management</h3>
              <p className="text-sm text-gray-400">Smart irrigation and fire suppression with AI-controlled water distribution</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Deployment Applications
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-xl p-8 border border-green-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Agricultural Protection</h3>
              <p className="text-gray-300 mb-4">
                Comprehensive farm monitoring with wildlife detection, crop surveillance, and environmental tracking.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Crop health monitoring</li>
                <li>• Pest and disease detection</li>
                <li>• Livestock tracking</li>
                <li>• Weather pattern analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Residential Security</h3>
              <p className="text-gray-300 mb-4">
                Advanced home protection with perimeter monitoring, visitor management, and emergency response.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Perimeter breach detection</li>
                <li>• Visitor identification</li>
                <li>• Emergency communication</li>
                <li>• Package delivery monitoring</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-red-900/50 rounded-xl p-8 border border-purple-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Industrial Monitoring</h3>
              <p className="text-gray-300 mb-4">
                Critical infrastructure protection with hazard detection, access control, and safety compliance.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Hazardous material detection</li>
                <li>• Worker safety monitoring</li>
                <li>• Equipment surveillance</li>
                <li>• Compliance reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Transform Your Property with Smart Pillar Technology
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Deploy AI-powered boundary monitoring with comprehensive environmental sensing and autonomous threat detection
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Schedule Installation Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}