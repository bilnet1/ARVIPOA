import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { 
  CreditCard, 
  Home, 
  Car, 
  Laptop, 
  Smartphone, 
  TreePine, 
  Building, 
  DollarSign, 
  Shield, 
  Zap, 
  Eye, 
  Users, 
  FileText, 
  QrCode, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Wallet, 
  Heart, 
  PawPrint,
  Coins,
  MapPin,
  Clock,
  Award
} from "lucide-react";

interface SmartCardFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface CardType {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
}

const smartCardFeatures: SmartCardFeature[] = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Real Estate Properties",
    description: "Land, houses, apartments, and commercial buildings",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: "Vehicle Assets",
    description: "Cars, motorcycles, boats, and all transportation",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: <Laptop className="w-8 h-8" />,
    title: "Electronic Devices",
    description: "Computers, smartphones, tablets, and gadgets",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Intellectual Property",
    description: "Patents, trademarks, copyrights, and digital assets",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <PawPrint className="w-8 h-8" />,
    title: "Livestock & Pets",
    description: "Animals, livestock, pets, and agricultural assets",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: "Financial Assets",
    description: "Investments, savings, cryptocurrency, and portfolios",
    color: "from-cyan-500 to-blue-500"
  }
];

const cardTypes: CardType[] = [
  {
    id: "landlord",
    name: "Landlord Card",
    description: "Complete property management for landlords and property owners",
    image: "/attached_assets/ChatGPT Image May 29, 2025, 08_27_57 AM_1749607194400.png",
    features: ["Property Portfolio Management", "Tenant Communication", "Rent Collection", "Maintenance Tracking"],
    benefits: ["Centralized Property Control", "Automated Rent Processing", "Tenant Verification", "Property Analytics"]
  },
  {
    id: "occupant",
    name: "Primary Occupant Card",
    description: "Essential card for tenants and primary property occupants",
    image: "/attached_assets/ChatGPT Image May 29, 2025, 08_27_57 AM_1749607194400.png",
    features: ["Access Control", "Utility Management", "Service Requests", "Community Features"],
    benefits: ["Seamless Property Access", "Digital Lease Management", "Emergency Services", "Neighbor Network"]
  },
  {
    id: "premium",
    name: "Premium Smart Card",
    description: "All-inclusive card for comprehensive property and asset management",
    image: "/attached_assets/ChatGPT Image May 29, 2025, 04_31_50 AM_1749607370858.png",
    features: ["Universal Property Access", "Multi-Asset Management", "Priority Support", "Advanced Security"],
    benefits: ["Complete Asset Portfolio", "Premium Features", "24/7 Concierge", "Global Access"]
  }
];

export default function ARVIPOASmartCard() {
  const [selectedCard, setSelectedCard] = useState<string>("premium");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showApplication, setShowApplication] = useState(false);

  const currentCard = cardTypes.find(card => card.id === selectedCard) || cardTypes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/attached_assets/ChatGPT Image May 29, 2025, 07_17_23 AM_1749607155471.png"
                  alt="ARVIPOA Smart Card - One Card All Properties"
                  className="w-96 h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-6">
              ARVIPOA Smart Card
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              One Card, All Properties
            </p>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
              Revolutionary property management solution that consolidates all your assets into a single, 
              secure digital card. Manage land, houses, automobiles, electronics, intellectual property, and more.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => setShowApplication(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CreditCard className="w-5 h-5" />
                Apply for Smart Card
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("features")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-5 h-5" />
                Explore Features
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Card Features Grid */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Comprehensive Asset Management
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartCardFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Choose Your Smart Card Type
          </motion.h2>

          {/* Card Selection Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-2">
              {cardTypes.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCard === card.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {card.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Card Details */}
          <motion.div
            key={selectedCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">{currentCard.name}</h3>
              <p className="text-xl text-gray-300">{currentCard.description}</p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Key Features:</h4>
                <ul className="space-y-2">
                  {currentCard.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Benefits:</h4>
                <ul className="space-y-2">
                  {currentCard.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <Star className="w-5 h-5 text-yellow-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={currentCard.image}
                  alt={currentCard.name}
                  className="w-full max-w-md rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Card Technology */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white">
                Advanced Smart Card Technology
              </h2>
              <p className="text-xl text-gray-300">
                ARVIPOA Smart Cards feature cutting-edge chip technology, QR code integration, 
                and biometric security for seamless property access and management.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                  <QrCode className="w-8 h-8 text-blue-400 mb-3" />
                  <h4 className="font-bold text-white mb-2">QR Code Access</h4>
                  <p className="text-gray-300 text-sm">Instant property verification and access</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl p-4 border border-green-500/30">
                  <Shield className="w-8 h-8 text-green-400 mb-3" />
                  <h4 className="font-bold text-white mb-2">Secure Chip</h4>
                  <p className="text-gray-300 text-sm">Military-grade encryption technology</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                  <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                  <h4 className="font-bold text-white mb-2">NFC Enabled</h4>
                  <p className="text-gray-300 text-sm">Contactless payments and access</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                  <Eye className="w-8 h-8 text-purple-400 mb-3" />
                  <h4 className="font-bold text-white mb-2">Biometric ID</h4>
                  <p className="text-gray-300 text-sm">Fingerprint and facial recognition</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="/attached_assets/ChatGPT Image May 29, 2025, 04_35_25 AM_1749607229519.png"
                alt="ARVIPOA Smart Card Technology"
                className="w-full max-w-lg rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            How to Get Your Smart Card
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Apply Online",
                description: "Complete the digital application form with your property details",
                icon: <FileText className="w-8 h-8" />
              },
              {
                step: "2", 
                title: "Verification",
                description: "Our team verifies your property ownership and documentation",
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Card Production",
                description: "Your personalized smart card is manufactured with your assets",
                icon: <CreditCard className="w-8 h-8" />
              },
              {
                step: "4",
                title: "Activation",
                description: "Receive and activate your card through the ARVIPOA app",
                icon: <CheckCircle className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                  <div className="text-2xl font-bold text-blue-400 mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Revolutionize Your Property Management?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of property owners who have simplified their asset management with ARVIPOA Smart Cards.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => setShowApplication(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CreditCard className="w-5 h-5" />
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplication(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Apply for ARVIPOA Smart Card</h3>
                <p className="text-gray-300">Complete the form below to start your application process</p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Card Type</label>
                  <select className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:border-blue-400 focus:outline-none">
                    <option value="">Select card type</option>
                    <option value="landlord">Landlord Card</option>
                    <option value="occupant">Primary Occupant Card</option>
                    <option value="premium">Premium Smart Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Property Types (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Real Estate", "Vehicles", "Electronics", "Intellectual Property", "Livestock", "Financial Assets"].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" className="rounded" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setShowApplication(false)}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                    Submit Application
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}