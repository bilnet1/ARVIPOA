import { motion } from "framer-motion";
import { Shield, Waves, Eye, Zap, Camera, AlertTriangle, Wifi, Battery } from "lucide-react";
import rdb9 from "@assets/RDB 9.png";
import rdb10 from "@assets/RDB 10.png";
import rdb11 from "@assets/RDB 11.png";

export default function RiverDefenseBarricade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ARVIPOA River Defense Barricade
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced aquatic security system with AI-powered facial recognition, solar energy, 
              and comprehensive monitoring for waterway protection and access control
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            System Overview
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700"
            >
              <img src={rdb9} alt="RDB Control Station" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Mobile Control Station</h3>
                <p className="text-gray-400">
                  Solar-powered floating platform with advanced monitoring capabilities and life safety equipment
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700"
            >
              <img src={rdb10} alt="RDB Facial Recognition" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">AI Facial Recognition</h3>
                <p className="text-gray-400">
                  Advanced biometric identification system with real-time processing and security database integration
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700"
            >
              <img src={rdb11} alt="RDB Access Control" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Secure Access Control</h3>
                <p className="text-gray-400">
                  Biometric verification with instant approval/denial and emergency alert capabilities
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Advanced Features & Capabilities
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Security Features */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-8 border border-blue-700/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Security Systems</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">AI-powered facial recognition with 99.7% accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">360° surveillance cameras with night vision</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Real-time threat detection and alert system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Secure wireless communication with command center</span>
                </div>
              </div>
            </motion.div>

            {/* Technical Specs */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 rounded-xl p-8 border border-cyan-700/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Aquatic Design</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Solar panel array with 72-hour battery backup</span>
                </div>
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Weather-resistant marine-grade construction</span>
                </div>
                <div className="flex items-center gap-3">
                  <Waves className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Stabilized floating platform with anchoring system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Emergency life safety equipment included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Key Applications
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Port Security</h3>
              <p className="text-sm text-gray-400">Maritime facility access control and monitoring</p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Border Control</h3>
              <p className="text-sm text-gray-400">Waterway border monitoring and illegal crossing prevention</p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Critical Infrastructure</h3>
              <p className="text-sm text-gray-400">Protection of water treatment plants and dams</p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Emergency Response</h3>
              <p className="text-sm text-gray-400">Rapid deployment for disaster relief and rescue operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Secure Your Waterways with ARVIPOA RDB
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Deploy advanced aquatic security solutions with AI-powered monitoring and solar sustainability
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Request Deployment Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}