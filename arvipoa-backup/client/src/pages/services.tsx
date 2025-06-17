import { motion } from "framer-motion";
import smartPillarImage from "@/assets/images/smart-pillar.png";
import riverBarricadeImage from "@/assets/images/river-barricade.png";
import arvipoaLogo from "@/assets/images/arvipoa-logo.png";
import smartPillarDashboard from "@assets/SMART PILLAR DASHBOARD.png";
import smartPillarInstallation from "@assets/smart pillar installation.png";
import smartPillarEVCharging from "@assets/SMART PILLAR EV CHARGING.png";
import smartPillarSolarCharging from "@assets/SMART PILLAR SOLAR CHARGING.png";
import smartPillarWaterSprinkling from "@assets/SMART PILLAR WATER SPRINKLING OUT.png";
import smartPillarChainsawDetection from "@assets/smart pillar chainsaw detected_1749460281237.png";
import smartPillarBulldozerDetection from "@assets/SMART PILLAR DETECTING BULDOZER_1749463365600.png";
import smartPillarLPG1 from "@assets/SMART PILLAR LPG 1_1749465720051.png";
import smartPillarLPG2 from "@assets/SMART PILLAR LPG 2_1749465720052.png";
import smartPillarLPG3 from "@assets/SMART PILLAR LPG 3_1749465720053.png";
import smartPillarSolarNew from "@assets/SMART PILLAR SOLAR CHARGING_1749465720054.png";
// New enhanced Smart Boundary Pillar images
import smartBoundaryPillarMain from "@assets/SMB EV CHARGE_1749740510051.png";
import smartBoundaryDeliveryBox from "@assets/ARVIPOA SMB DELIVERY BOX_1749668234275.png";
import smartBoundaryHelpDetection from "@assets/ARVIPOA SMB DETECTS HELP NOISE_1749668304091.png";
import smartBoundaryMusicDetection from "@assets/ARVIPOA SMB DETECTS MUSIC_1749668323018.png";
import smartBoundaryGasPurchase from "@assets/ARVIPOA SMB GAS PURCHASE_1749668331156.png";
import pillar2 from "@assets/2.jpg";
import pillar3 from "@assets/3.jpg";
import pillar4 from "@assets/4.jpg";
import pillar5 from "@assets/5.jpg";
import pillar6 from "@assets/6.jpg";
import pillar7 from "@assets/7.jpg";
import pillar8 from "@assets/8.jpg";
import Footer from "@/components/ui/Footer";

export default function Services() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="bg-gradient-to-br from-[#002b1d] to-black text-white py-20"
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-4">
          {/* Text Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 mb-10 lg:mb-0"
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={arvipoaLogo} alt="ARVIPOA Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">
                  ARVIPOA Services
                </h1>
                <p className="text-lg text-[#D4AF37] font-medium">Smart Protection for Land, River & Community</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 mb-6">
              ARVIPOA uses AI-powered civic-tech and smart infrastructure to secure, register, and enforce property and environmental safety.
            </p>
          </motion.div>

          {/* Smart Pillar Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1"
          >
            <img
              src={smartPillarImage}
              alt="ARVIPOA Smart Pillar - Advanced boundary protection system with AI technology"
              className="rounded-lg shadow-lg max-w-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* RIVER BARRICADE SPOTLIGHT SECTION */}
      <section className="bg-[#001b14] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <img
              src={riverBarricadeImage}
              alt="ARVIPOA River Defense Barricade - Smart surveillance and protection system for waterways"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">River Defense Barricade</h2>
            <p className="text-gray-300 text-lg mb-4">
              As part of our intelligent civic-tech network, ARVIPOA's River Defense Barricade serves as a physical deterrent and a smart surveillance hub. It prevents unauthorized entry into the river, detects activity, and syncs with Smart Pillars for rapid alerts.
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-400 space-y-2">
              <li>Prevents land and water encroachment</li>
              <li>Equipped with state of the art technology</li>
              <li>Detects Rising level of the water and sends Rapid alert</li>
              <li>Real-time sync with central monitoring system</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Smart Boundary Pillar Gallery */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">Smart Boundary Pillar Gallery</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our advanced smart pillar technology deployed across various locations, 
              providing comprehensive property protection and monitoring capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: smartBoundaryPillarMain, title: "ARVIPOA Smart Boundary Pillar with EV Charging", description: "Revolutionary multi-sensor pillar with integrated EV quick charge station - combining property protection with sustainable transportation infrastructure" },
              { image: smartBoundaryDeliveryBox, title: "Smart Delivery Box Integration", description: "Secure package delivery system built into the pillar - revolutionizing last-mile logistics with smart authentication" },
              { image: smartBoundaryHelpDetection, title: "Emergency Help Detection System", description: "AI-powered audio detection instantly recognizes distress calls and deploys air support for immediate emergency response" },
              { image: smartBoundaryMusicDetection, title: "Intelligent Audio Monitoring", description: "Advanced Shazam-integrated music detection with automated air support deployment for event security and noise control" },
              { image: smartBoundaryGasPurchase, title: "Smart Gas Subscription Service", description: "Seamless LPG subscription and purchase system with digital payment integration - making gas supply smart and efficient" },
              { image: smartPillarDashboard, title: "Smart Pillar Command Dashboard", description: "Centralized monitoring interface providing real-time analytics and comprehensive system control capabilities" },
              { image: smartPillarInstallation, title: "Professional Installation Service", description: "Expert technician deployment ensuring optimal pillar positioning and system integration for maximum protection coverage" },
              { image: smartPillarChainsawDetection, title: "Forest Protection System", description: "Advanced chainsaw detection preventing illegal logging and forest degradation with instant alert mechanisms" },
              { image: smartPillarBulldozerDetection, title: "Land Encroachment Prevention", description: "Sophisticated vibration sensors detecting heavy machinery intrusion and unauthorized land development activities" },
              { image: smartPillarLPG1, title: "Residential Gas Safety Network", description: "Comprehensive LPG distribution system with integrated safety monitoring and automated leak detection protocols" },
              { image: smartPillarLPG2, title: "Smart Gas Management Hub", description: "Intelligent gas delivery coordination with predictive analytics for supply optimization and safety compliance" },
              { image: smartPillarSolarNew, title: "Sustainable Energy Integration", description: "Self-powered solar energy system ensuring continuous operation with zero carbon footprint and grid independence" }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{pillar.title}</h3>
                  <p className="text-gray-300 text-sm">{pillar.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#D4AF37]/20 to-blue-600/20 rounded-xl p-8 border border-[#D4AF37]/30"
            >
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
                Smart Pillar Technology Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>AI-Powered Threat Detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Solar Energy Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Wireless IoT Connectivity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Environmental Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Real-time Data Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Emergency Response System</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES SECTION */}
      <section className="bg-white text-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">Additional Services</h2>
            <p className="mt-2 text-lg text-gray-600">
              ARVIPOA provides innovative property and infrastructure solutions using smart tech and AI-assisted processes.
            </p>
          </div>

          {/* Smart Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Property Registration</h3>
              <p className="text-sm text-gray-700">Secure and verify your property assets with trusted legal and technical teams.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Virtual Address Assignment</h3>
              <p className="text-sm text-gray-700">Assign verifiable virtual addresses backed by AI tracking and GPS encoding.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Secure Documentation</h3>
              <p className="text-sm text-gray-700">Digitize and encrypt important property and ownership files in our secure cloud.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">AI Property Analysis</h3>
              <p className="text-sm text-gray-700">Get intelligent property insights and market analysis powered by advanced AI technology.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Drone Inspections</h3>
              <p className="text-sm text-gray-700">Professional aerial surveys and property boundary mapping using advanced drone technology.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Digital Property Cards</h3>
              <p className="text-sm text-gray-700">Secure smart cards for property management and verification across multiple asset types.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Environmental Monitoring</h3>
              <p className="text-sm text-gray-700">Real-time water level tracking, air quality monitoring, and environmental threat detection.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Smart Security Network</h3>
              <p className="text-sm text-gray-700">Integrated surveillance system with gunshot detection and perimeter breach alerts.</p>
            </div>

            <div className="bg-gray-100 rounded-lg shadow hover:scale-105 transition p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">EV Charging Infrastructure</h3>
              <p className="text-sm text-gray-700">Electric vehicle charging stations integrated into smart pillar network for sustainable transport.</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow hover:scale-105 transition p-6 border-2 border-yellow-400">
              <h3 className="text-xl font-bold text-orange-700 mb-2">Foreign Bird Payment System</h3>
              <p className="text-sm text-gray-700">Multi-currency payment platform with escrow functionality, encrypted transactions, and contractual agreements for secure financial operations.</p>
              <div className="mt-3">
                <a href="/foreign-bird-payment" className="text-orange-600 hover:text-orange-800 font-medium text-sm">Launch Payment System →</a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow hover:scale-105 transition p-6 border-2 border-blue-400">
              <h3 className="text-xl font-bold text-purple-700 mb-2">RBFS Religious Platform</h3>
              <p className="text-sm text-gray-700">Comprehensive religious organization management with member registration, donation processing, live streaming, and smart membership cards.</p>
              <div className="mt-3">
                <a href="/rbfs-platform" className="text-purple-600 hover:text-purple-800 font-medium text-sm">Access RBFS Platform →</a>
              </div>
            </div>
          </div>

          {/* Smart Technology Features */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">AI-Powered Analytics</h3>
              <p className="text-sm text-gray-600">Machine learning algorithms analyze property data and environmental patterns</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Solar Power Integration</h3>
              <p className="text-sm text-gray-600">Renewable energy systems powering smart infrastructure with battery backup</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">IoT Connectivity</h3>
              <p className="text-sm text-gray-600">Seamless wireless communication between all smart infrastructure components</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Blockchain Security</h3>
              <p className="text-sm text-gray-600">Immutable property records and transaction verification using distributed ledger</p>
            </div>
          </div>
        </div>
      </section>

      {/* ARVIPOA Smart Police Barrier Section */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              ARVIPOA Smart Police Barrier
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary automated barrier system with AI-powered vehicle detection, license plate recognition, and intelligent access control for enhanced security
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Barrier Technology */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Smart Barrier Technology</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Advanced automated barrier system with AI-powered vehicle detection and access control for maximum security efficiency.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Automated vehicle detection and license plate recognition</li>
                <li>• Real-time access control with security database integration</li>
                <li>• Emergency override and manual control capabilities</li>
                <li>• Weather-resistant design with solar power backup</li>
              </ul>
            </motion.div>

            {/* Demo Video */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Live Demonstration</h3>
              </div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://drive.google.com/file/d/1JLrA0q560TT9n9dTRrt7jpnws57-uPpj/preview"
                  className="w-full h-full"
                  allow="autoplay"
                  title="ARVIPOA Smart Police Barrier Demo"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Watch the ARVIPOA Smart Police Barrier in action - demonstrating automated vehicle detection and intelligent access control.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Automated Security</h3>
              <p className="text-sm text-gray-600">AI-powered vehicle recognition with instant access control decisions</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Emergency Response</h3>
              <p className="text-sm text-gray-600">Instant emergency override with direct police communication</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Data Analytics</h3>
              <p className="text-sm text-gray-600">Real-time traffic analysis and security reporting dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Energy Solutions */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Complete Smart Pillar Ecosystem
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary Smart Pillar technology with integrated EV charging, solar power generation, and intelligent water management for comprehensive environmental security
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* EV Charging Station */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <img 
                src={smartPillarEVCharging} 
                alt="Smart Pillar EV Charging Station"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-3">Smart Pillar EV Charging Station</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Revolutionary integration of electric vehicle charging with comprehensive security monitoring.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Fast EV Charging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Smart Grid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Security Monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">IoT Connected</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solar Charging System */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <img 
                src={smartPillarSolarCharging} 
                alt="Smart Pillar Solar Charging System"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-3">Smart Pillar Solar Charging System</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Advanced solar panel integration provides autonomous energy generation for continuous operations.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Autonomous Power</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Solar Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Zero Carbon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Weather Resistant</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Water Management System */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <img 
                src={smartPillarWaterSprinkling} 
                alt="Smart Pillar Water Management System"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-3">Smart Pillar Water Management</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Intelligent water distribution system with automated irrigation and fire suppression capabilities.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Smart Irrigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Fire Suppression</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Moisture Monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">AI Water Control</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sustainability Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-green-800/50 to-emerald-800/50 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-8">Environmental Impact</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300">Renewable Energy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">0</div>
                <div className="text-gray-300">Carbon Emissions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-400 mb-2">24/7</div>
                <div className="text-gray-300">Autonomous Operation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">365</div>
                <div className="text-gray-300">Days per Year</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IDEIST Energy Solutions Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              IDEIST Energy Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Intelligent Digital Electricity Internet Service Transponder - Revolutionary energy distribution 
              system eliminating power theft while providing dual electricity and internet connectivity
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Smart Energy Distribution */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Smart Energy Distribution</h3>
              </div>
              <p className="text-gray-300 mb-4">
                IDEIST units mounted on power poles provide tamper-proof electricity distribution with real-time monitoring and theft prevention.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Elevated installation above human reach prevents tampering</li>
                <li>• Motion detection alerts for unauthorized access attempts</li>
                <li>• Pre-delivery consumption logging ensures accurate billing</li>
                <li>• Automatic drone coordination for rapid incident response</li>
              </ul>
            </motion.div>

            {/* EFUFA Smart Sockets */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-green-500/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">EFUFA Smart Sockets</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Advanced endpoint devices with biometric authentication and intelligent power management for secure energy access.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Voice and face verification before power access</li>
                <li>• Individual user tracking for transparent billing</li>
                <li>• Automatic voltage switching (220V ↔ 110V)</li>
                <li>• Mobile app and SMS command control</li>
              </ul>
            </motion.div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Theft Prevention</h4>
              <p className="text-gray-200">Real-time monitoring eliminates unauthorized power access and revenue loss</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Dual Connectivity</h4>
              <p className="text-gray-200">Simultaneous electricity and internet distribution through single infrastructure</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Revenue Recovery</h4>
              <p className="text-gray-200">Accurate billing and transparent tracking increase utility company revenues</p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="text-center bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Transform Energy Infrastructure</h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Deploy IDEIST + EFUFA technology to eliminate power theft, improve service delivery, 
              and provide dual connectivity for communities across West Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/ideist"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore IDEIST Solutions
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Request Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARVIPOA Air Support Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ARVIPOA Air Support Command
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced aerial protection with AI-powered UAVs, thermal imaging, facial recognition, and automated emergency response systems
            </p>
          </motion.div>

          {/* Main Features Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Real-Time Surveillance */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Real-Time Surveillance</h3>
              </div>
              <p className="text-gray-300 mb-4">
                ARVIPOA monitoring, observation fairness and security starts from the air with ARVIPOA Air support system.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• UAVs equipped with thermal imaging to monitor and secure properties</li>
                <li>• 24/7 for security and get solution and notification to members</li>
                <li>• Police patrols equipped with face recognition tools (MR VIEW)</li>
                <li>• Neighborhoods remain safe through intelligent monitoring</li>
              </ul>
            </motion.div>

            {/* MeFoCaPrIS Privacy System */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">MeFoCaPrIS Privacy Logic</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Media Footage Capturing Privacy Infringement System (MeFoCaPrIS) - a functionality in the Aerial support that secures the privacy of properties.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Protects properties not in ongoing aerial transactions</li>
                <li>• Intelligent privacy zone detection and masking</li>
                <li>• Automated compliance with privacy regulations</li>
                <li>• Secure data handling and encrypted storage</li>
              </ul>
            </motion.div>
          </div>

          {/* Technology Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Advanced Technology Stack</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* DJI Mavic 3T */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">DJI MAVIC 3T</h4>
                <p className="text-sm text-gray-400">Professional thermal imaging drone with advanced flight capabilities</p>
              </div>

              {/* Thermal Detection */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Thermal Vision</h4>
                <p className="text-sm text-gray-400">Advanced thermal sensors for fire detection and heat signature monitoring</p>
              </div>

              {/* AI Command */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">AI Task Scheduling</h4>
                <p className="text-sm text-gray-400">Intelligent mission planning and automated response protocols</p>
              </div>
            </div>
          </motion.div>

          {/* Emergency Response Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-red-900/20 border border-red-700 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2 text-red-300">Fire Fighting</h4>
              <p className="text-sm text-gray-400">Immediate fire detection and emergency response coordination</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-blue-900/20 border border-blue-700 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2 text-blue-300">Drone Patrol</h4>
              <p className="text-sm text-gray-400">Automated perimeter patrols with intelligent route optimization</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2 text-yellow-300">Emergency Dispatch</h4>
              <p className="text-sm text-gray-400">Instant communication with emergency services and property owners</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-green-900/20 border border-green-700 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2 text-green-300">Sanitation Check</h4>
              <p className="text-sm text-gray-400">Environmental monitoring and health compliance verification</p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Ready for Aerial Protection?</h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Deploy ARVIPOA Air Support Command for comprehensive property protection with AI-powered UAVs, 
              thermal imaging, and intelligent threat response systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/air-pilot"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Activate Drone Coverage
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Air Command
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Latest Updates & Innovations
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Stay informed with the latest developments in smart security technology, 
              product launches, and ARVIPOA innovations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Featured Blog Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-gray-400 text-sm">Commercial Video</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  ARVIPOA Smart Pillar Commercial
                </h3>
                
                <p className="text-gray-300 mb-6">
                  Watch our revolutionary Smart Pillar technology in action. Discover how AI-powered 
                  surveillance, environmental monitoring, and autonomous threat detection are transforming 
                  property security across Africa.
                </p>
                
                <motion.a
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m4-10V8a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2z" />
                  </svg>
                  Visit Blog & Watch Video
                </motion.a>
              </div>
            </motion.div>

            {/* Blog Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid gap-4">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Technology Showcases</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Watch product demonstrations and learn about cutting-edge features
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Industry Insights</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Expert analysis on smart security trends and innovations
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Product Updates</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Stay updated with new features and enhancement releases
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
