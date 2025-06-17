import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, QrCode, Smartphone, Home, MapPin, Briefcase, GraduationCap, Users, Building } from 'lucide-react';

export default function SmartCardService() {
  const [delivery, setDelivery] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <CreditCard className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl font-bold">ARVIPOA Smart Card</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A secure digital card that stores all your registered properties in one place – land, buildings, vehicles, domains, pets, intellectual property, and more.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Card Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Stores multiple property types securely</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>QR code verification system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Physical & digital copy options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Biometric & OTP access support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Tamper-proof identity binding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Real-time property status updates</span>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-3">
                  <Smartphone className="w-5 h-5" />
                  Smart Features
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-yellow-400" />
                    <span>Instant Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Encrypted Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span>Mobile Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <span>NFC Enabled</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Preview & Apply</h3>
              
              {/* Card Preview */}
              <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl p-6 mb-6 shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                {/* Card Header */}
                <div className="relative flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold">ARVIPOA SMART CARD</h4>
                    <p className="text-sm opacity-80">Digital Property Verification</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <QrCode className="w-8 h-8 mb-1" />
                    <span className="text-xs">Scan Me</span>
                  </div>
                </div>

                {/* Photo Placeholder */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-16 h-20 bg-black/20 rounded border-2 border-black/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-black/40 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <span className="text-xs text-white">👤</span>
                      </div>
                      <span className="text-xs opacity-70">Photo</span>
                    </div>
                  </div>
                  
                  {/* Card Details */}
                  <div className="flex-1 ml-4 space-y-1 text-sm">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>ID:</strong> ARVP-2024-00984</p>
                    <p><strong>Properties:</strong> 3 Registered</p>
                    <p><strong>Issued:</strong> 12 June 2025</p>
                  </div>
                </div>

                {/* Property Icons */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Land">
                      🏞️
                    </div>
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Vehicle">
                      🚗
                    </div>
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Digital Asset">
                      💎
                    </div>
                  </div>
                  <div className="text-xs opacity-70">
                    Land (Kasoa) • Vehicle (Toyota) • NFT
                  </div>
                </div>

                {/* Card Footer */}
                <div className="relative flex justify-between items-center">
                  <div className="text-xs opacity-70">
                    Valid Until: 12/2030
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-black/20 rounded flex items-center justify-center">
                      <div className="w-4 h-3 bg-yellow-200 rounded-sm"></div>
                    </div>
                    <span className="text-xs opacity-70">NFC</span>
                  </div>
                </div>
              </div>



              {/* Application Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-3 font-medium">Delivery Method:</label>
                  <select 
                    value={delivery} 
                    onChange={e => setDelivery(e.target.value)} 
                    className="w-full p-4 rounded-xl text-black bg-white border-0 focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="home">🏠 Home Delivery (3-5 business days)</option>
                    <option value="pickup">🏢 Pickup at Office (Same day)</option>
                    <option value="express">⚡ Express Delivery (24 hours)</option>
                  </select>
                </div>

                {delivery === 'home' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-500/20 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-blue-300">
                      <Home className="w-4 h-4" />
                      <span className="text-sm">Delivery fee: GHS 15.00</span>
                    </div>
                  </motion.div>
                )}

                {delivery === 'pickup' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-green-500/20 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-green-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Pickup Location: ARVIPOA Office, Madina</span>
                    </div>
                  </motion.div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Submit Application
                </motion.button>

                <div className="text-center text-sm text-gray-400">
                  <p>Processing time: 1-2 business days</p>
                  <p>Card fee: GHS 50.00 + delivery charges</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Security Notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-red-500/10 border border-red-500/30 p-6 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">Security Notice</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your ARVIPOA Smart Card contains sensitive property information. Keep it secure and report any loss immediately. 
                  The card uses advanced encryption and biometric binding to prevent unauthorized access. Never share your card details 
                  or verification codes with unauthorized persons.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}