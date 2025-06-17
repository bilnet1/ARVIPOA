import { motion } from "framer-motion";
import { ShieldAlert, Droplets, Eye, AlertTriangle, Battery, Wifi, Zap, Cpu, Flame, Fingerprint, Lock, Building, Users } from "lucide-react";
import Footer from "@/components/ui/Footer";
import riverDefenseBarricade1 from "@assets/image_1749596398548.png";
import riverDefenseBarricade2 from "@assets/ChatGPT Image Jun 10, 2025, 02_26_54 AM_1749596630538.png";
import rdb4 from "@assets/RDB 4.png";
import rdb9 from "@assets/RDB 9.png";
import rdb10 from "@assets/RDB 10.png";
import rdb11 from "@assets/RDB 11.png";
import rdbCropped from "@assets/RDB CROPPED.png";

export default function RiverDefenseBarricade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold text-white mb-6 leading-tight"
          >
            ARVIPOA River Defense
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {" "}Barricade System
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Advanced flood protection infrastructure that blocks rising river levels from entering user premises. 
            Our autonomous barricade system provides comprehensive flood defense with biometric access control, 
            drone surveillance, solar power generation, and emergency response protocols.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <span className="text-blue-200">Flood Barrier Protection</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-200">Drone Surveillance</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Battery className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-200">Solar Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
              <Fingerprint className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200">Biometric Access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            River Defense Barricade in Action
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                src="https://drive.google.com/file/d/1ARDEfGezgEEv69AwIFZHpkk11WcY8Llx/preview" 
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="ARVIPOA River Defense Barricade System Demonstration"
              ></iframe>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-300 mt-6 text-lg"
            >
              Watch the ARVIPOA River Defense Barricade system protecting properties from rising water levels 
              with autonomous deployment, biometric access control, and comprehensive monitoring capabilities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* River Defense Barricade System */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Advanced Flood Protection Infrastructure
          </motion.h2>

          {/* Primary River Defense System */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white">
                River Defense Barricade System
              </h3>
              <p className="text-gray-300 text-lg">
                Advanced flood protection barricade blocks rising river levels from entering user premises. 
                The system features biometric access control for authorized personnel only, autonomous monitoring, drone surveillance, and emergency response protocols for comprehensive flood defense.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Flood Barrier</span>
                </div>
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Biometric Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300">Water Level Monitor</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Drone Surveillance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-red-400" />
                  <span className="text-gray-300">Secure Entry</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Emergency Alert</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">Autonomous Flood Protection</h4>
                <p className="text-gray-300 text-sm">
                  Smart barricade system automatically deploys flood defenses when rising water levels are detected, 
                  protecting properties from river overflow and storm surge with real-time monitoring and drone oversight.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={riverDefenseBarricade1} 
                alt="ARVIPOA River Defense Barricade Flood Protection" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Enhanced River Defense Platform */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-2 lg:order-1"
            >
              <img 
                src={riverDefenseBarricade2} 
                alt="ARVIPOA Enhanced River Defense Barricade System" 
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h3 className="text-3xl font-bold text-white">
                Enhanced Flood Defense Platform
              </h3>
              <p className="text-gray-300 text-lg">
                Reinforced defense platform with solar power generation and advanced monitoring capabilities. 
                The system provides sustainable operation during extended flood conditions with continuous surveillance and communication.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Battery className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">Solar Powered</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Communication Hub</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">360° Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                  <span className="text-gray-300">Emergency Power</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/30">
                <h4 className="font-bold text-cyan-400 mb-2">Resilient Flood Infrastructure</h4>
                <p className="text-gray-300 text-sm">
                  Self-sustaining defense platform operates independently during flood emergencies, 
                  maintaining communication links and monitoring capabilities while providing physical barrier protection against rising waters.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biometric Access Control */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Biometric Access Control System
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white">
                Authorized Personnel Only Access
              </h3>
              <p className="text-gray-300 text-lg">
                Advanced biometric authentication system ensures only authorized personnel can access the River Defense Barricade controls. 
                Multi-factor security including fingerprint, facial recognition, and access card validation provides maximum security.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Fingerprint Scan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Facial Recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-red-400" />
                  <span className="text-gray-300">Access Control</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Security Protocol</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-2">Multi-Layer Security Authentication</h4>
                <p className="text-gray-300 text-sm">
                  Three-tier biometric verification system prevents unauthorized access to critical flood defense controls, 
                  ensuring only qualified emergency responders and maintenance personnel can operate the barricade system.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdb10} 
                  alt="ARVIPOA River Defense Barricade Model 10 - Biometric Access Control" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-bold text-lg mb-1">RDB Model 10</h4>
                  <p className="text-gray-300 text-sm">Advanced biometric access control with multi-factor authentication</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
                  <Fingerprint className="w-12 h-12 text-purple-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Fingerprint Authentication</h4>
                  <p className="text-gray-300 text-sm">Advanced fingerprint scanning technology with liveness detection</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                  <Eye className="w-12 h-12 text-blue-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Facial Recognition</h4>
                  <p className="text-gray-300 text-sm">AI-powered facial recognition with anti-spoofing measures</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30">
                  <Lock className="w-12 h-12 text-red-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Access Cards</h4>
                  <p className="text-gray-300 text-sm">Encrypted RFID access cards with time-based authentication</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
                  <ShieldAlert className="w-12 h-12 text-green-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Security Audit</h4>
                  <p className="text-gray-300 text-sm">Complete access logging and security audit trails</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Barricade Gallery */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            River Defense Barricade Gallery
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdb4} 
                  alt="ARVIPOA River Defense Barricade - Model 4" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Model 4</h3>
                  <p className="text-gray-300 text-sm">Advanced flood protection with integrated monitoring systems</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdb9} 
                  alt="ARVIPOA River Defense Barricade - Model 9" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Model 9</h3>
                  <p className="text-gray-300 text-sm">Enhanced biometric access control and solar power integration</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdb10} 
                  alt="ARVIPOA River Defense Barricade - Model 10" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Model 10</h3>
                  <p className="text-gray-300 text-sm">Autonomous deployment with drone surveillance capabilities</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdb11} 
                  alt="ARVIPOA River Defense Barricade - Model 11" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Model 11</h3>
                  <p className="text-gray-300 text-sm">Heavy-duty flood barrier with emergency communication hub</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={rdbCropped} 
                  alt="ARVIPOA River Defense Barricade - Cropped View" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Detail View</h3>
                  <p className="text-gray-300 text-sm">Close-up view of advanced barricade construction and features</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={riverDefenseBarricade1} 
                  alt="ARVIPOA River Defense Barricade - Operational View" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">RDB Operational</h3>
                  <p className="text-gray-300 text-sm">Fully operational barricade system during flood conditions</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Each River Defense Barricade model is designed for specific flood conditions and property requirements, 
              featuring modular construction, biometric access control, and autonomous operation capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            System Capabilities & Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Flood Barrier Protection</h3>
              </div>
              <p className="text-gray-300">
                Physical barrier system designed to withstand high water pressure and debris impact, 
                automatically deploying when water levels reach critical thresholds.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Water Level Monitoring</h3>
              </div>
              <p className="text-gray-300">
                Advanced sensor network continuously monitors water levels, flow rates, and weather conditions 
                to predict and prepare for flood events before they occur.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Drone Surveillance</h3>
              </div>
              <p className="text-gray-300">
                Autonomous drone fleet provides aerial monitoring and assessment of flood conditions, 
                enabling real-time situational awareness and emergency response coordination.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Battery className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Solar Power System</h3>
              </div>
              <p className="text-gray-300">
                Integrated solar panels ensure continuous operation during extended flood events, 
                providing reliable power for monitoring systems and emergency communications.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">Communication Hub</h3>
              </div>
              <p className="text-gray-300">
                Multi-channel communication system maintains contact with emergency services and property owners, 
                ensuring coordinated response during flood emergencies.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Biometric Access Control</h3>
              </div>
              <p className="text-gray-300">
                Multi-factor biometric authentication ensures only authorized personnel can access critical flood defense controls, 
                with fingerprint scanning, facial recognition, and encrypted access card validation.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl p-6 border border-orange-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-8 h-8 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Balcony System</h3>
              </div>
              <p className="text-gray-300">
                Elevated observation platform with reinforced railings provides secure vantage point for monitoring flood conditions, 
                equipped with weather protection and emergency communication systems.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Bridge Connection System</h3>
              </div>
              <p className="text-gray-300">
                Modular bridge connections enable secure passage between barricade units during flood events, 
                featuring anti-slip surfaces and emergency handrails for safe personnel movement.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Waiting Room System</h3>
              </div>
              <p className="text-gray-300">
                Climate-controlled waiting area with emergency supplies, first aid facilities, and communication equipment 
                provides safe shelter for personnel during extended flood monitoring operations.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">Emergency Protocols</h3>
              </div>
              <p className="text-gray-300">
                Automated emergency response system triggers evacuation alerts, coordinates with authorities, 
                and activates backup systems when flood conditions reach dangerous levels.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Protect Your Property from Flood Risks
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Deploy ARVIPOA's River Defense Barricade System to safeguard your premises 
            from rising water levels and flood emergencies with autonomous protection.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
              Request Installation
            </button>
            <button className="border border-blue-400 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}