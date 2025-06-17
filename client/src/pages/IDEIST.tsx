import { motion } from "framer-motion";
import { Zap, Shield, Wifi, Eye, Phone, Lock, AlertTriangle, Activity, Globe, Users, DollarSign, Cpu } from "lucide-react";
import Footer from "@/components/ui/Footer";

// IDEIST Evolution Images
const ideistTransponder = "/attached_assets/ChatGPT Image Jun 12, 2025, 03_04_59 AM_1749745349111.png";
const ideistPowerPort = "/attached_assets/ChatGPT Image Jun 12, 2025, 10_42_02 AM_1749745723350.png";

export default function IDEIST() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              IDEIST + EFUFA
            </h1>
            <p className="text-xl text-cyan-300 max-w-3xl mx-auto mb-4">
              Intelligent Digital Electricity Internet Service Transponder
            </p>
            <p className="text-gray-300 max-w-4xl mx-auto">
              Revolutionary energy distribution system combining smart electricity management with 
              internet connectivity to eliminate power theft and optimize energy distribution across West Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Power Theft Crisis Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-red-400" />
              The Power Theft Crisis
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black border-l-4 border-red-500 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Ghana and many West African nations suffer from rampant electricity theft. Illegal rerouting, 
              bypassing meters, and inside-job collaborations result in massive losses for utility companies 
              and the economy. Traditional power distribution systems lack the intelligence and security 
              measures needed to prevent unauthorized access and ensure fair billing.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Revenue Loss</h4>
                <p className="text-gray-300 text-sm">Billions lost annually due to power theft</p>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Unfair Distribution</h4>
                <p className="text-gray-300 text-sm">Legitimate users suffer from power shortages</p>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
                <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Limited Monitoring</h4>
                <p className="text-gray-300 text-sm">Traditional systems lack real-time oversight</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IDEIST Features Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-cyan-400" />
              IDEIST: Energy Reinvented
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Intelligent pole-mounted transponders that revolutionize power distribution with AI-powered monitoring
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-black border border-cyan-400 rounded-2xl p-1">
                <div className="bg-black rounded-xl p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Key Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Elevated Installation</h4>
                        <p className="text-gray-300 text-sm">Mounted on power poles above human reach for tamper-proof operation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Eye className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Motion Detection</h4>
                        <p className="text-gray-300 text-sm">Advanced sensors detect human presence near restricted infrastructure</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Activity className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Pre-Delivery Logging</h4>
                        <p className="text-gray-300 text-sm">Records consumption data before power reaches households</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Cpu className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Drone Integration</h4>
                        <p className="text-gray-300 text-sm">Automatically coordinates with surveillance drones for rapid response</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Globe className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Dual Distribution</h4>
                        <p className="text-gray-300 text-sm">Supplies both electricity and internet via Ethernet & WiFi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Representation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">IDEIST Unit</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <Wifi className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Internet Access</p>
                  </div>
                  
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Power Supply</p>
                  </div>
                  
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">AI Monitoring</p>
                  </div>
                  
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Theft Prevention</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EFUFA Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Globe className="w-10 h-10 text-green-400" />
              EFUFA: Smart Socket, Smarter Security
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Advanced endpoint devices that provide secure, authenticated access to electricity and internet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Biometric Authentication</h3>
              <p className="text-gray-300">
                Voice and face verification required before granting power access, ensuring only authorized users can consume electricity
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tamper Detection</h3>
              <p className="text-gray-300">
                Advanced sensors detect and immediately block any unauthorized tampering attempts with automatic system shutdown
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Individual Tracking</h3>
              <p className="text-gray-300">
                Precisely tracks energy usage per individual user, enabling fair billing and consumption monitoring
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Voltage Switching</h3>
              <p className="text-gray-300">
                Automatically switches between 220V and 110V as needed, accommodating different device requirements
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Remote Control</h3>
              <p className="text-gray-300">
                Mobile app or SMS command-based access control, allowing users to manage power remotely and securely
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-black border border-green-500 rounded-2xl p-6 hover:bg-green-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integrated Connectivity</h3>
              <p className="text-gray-300">
                Provides high-speed internet access alongside power delivery, creating a comprehensive utility solution
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internet + Energy Distribution */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Globe className="w-10 h-10 text-blue-400" />
              Internet + Energy Distribution
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-black border-l-4 border-blue-500 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              SIDEIST units at transformers transmit secure digital energy and internet bundles through RJ45 
              connections to chained IDEIST units. This revolutionary approach creates a mesh network that 
              benefits both registered users and provides smart roaming WiFi coverage for the community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">SIDEIST Transformers</h4>
                <p className="text-gray-300 text-sm">Central distribution hubs converting and securing energy flow</p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">RJ45 Distribution</h4>
                <p className="text-gray-300 text-sm">Secure digital transmission through standardized connections</p>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Community WiFi</h4>
                <p className="text-gray-300 text-sm">Smart roaming coverage for public internet access</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Shield className="w-10 h-10 text-yellow-400" />
              Benefits to Government & Utilities
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Transforming energy distribution with unprecedented transparency and security
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black border border-yellow-400 rounded-2xl p-1 max-w-4xl mx-auto"
          >
            <div className="bg-black rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Live Monitoring</h4>
                      <p className="text-gray-300 text-sm">Real-time detection of illegal tapping attempts with immediate alerts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <DollarSign className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Revenue Recovery</h4>
                      <p className="text-gray-300 text-sm">Higher collection rates with accurate per-user tracking and billing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Cpu className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">AI Response</h4>
                      <p className="text-gray-300 text-sm">Faster incident response via automated drone dispatch systems</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Tamper-Proof Security</h4>
                      <p className="text-gray-300 text-sm">Digital conversion prevents physical tampering and unauthorized access</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Activity className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Transparent Billing</h4>
                      <p className="text-gray-300 text-sm">Verified usage data linked to authenticated users for fair billing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Infrastructure Efficiency</h4>
                      <p className="text-gray-300 text-sm">Dual-purpose distribution reduces costs and improves service delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-cyan-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Transform Your Energy Infrastructure</h2>
            <p className="text-gray-300 text-lg">
              Join the revolution in smart energy distribution. Contact ARVIPOA to deploy IDEIST + EFUFA 
              technology and eliminate power theft while improving service delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Consultation
              </motion.button>
              
              <motion.button
                className="px-8 py-3 border-2 border-cyan-500 rounded-xl text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Specifications
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}