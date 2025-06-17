import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { 
  Eye, 
  MapPin, 
  Video, 
  Camera, 
  Map, 
  Plane, 
  UserCheck, 
  MessageCircle, 
  Phone, 
  MessageSquare, 
  Mail, 
  DollarSign, 
  Edit, 
  Send, 
  X, 
  Check, 
  AlertCircle,
  Home,
  Bed,
  Bath,
  Car,
  Wifi,
  Shield,
  Zap
} from "lucide-react";

interface PropertyData {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  status: "available" | "unavailable";
  transactionType: "rent" | "buy" | "caretaking_lease";
  mainImage: string;
  additionalImages: string[];
  details: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    parking: number;
    amenities: string[];
  };
  rules: string[];
  description: string;
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

// Sample property data
const sampleProperty: PropertyData = {
  id: "ARV001",
  title: "Luxury Smart Villa with ARVIPOA Security",
  price: "$850,000",
  location: "Accra, Ghana",
  type: "Villa",
  status: "available",
  transactionType: "buy",
  mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  additionalImages: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80"
  ],
  details: {
    bedrooms: 4,
    bathrooms: 3,
    area: "2,500 sq ft",
    parking: 2,
    amenities: ["Smart Pillar Security", "Solar Power", "Swimming Pool", "Garden", "24/7 Security"]
  },
  rules: [
    "No smoking indoors",
    "No pets allowed",
    "Maximum 6 occupants",
    "Quiet hours: 10 PM - 7 AM",
    "No commercial activities"
  ],
  description: "Experience luxury living with cutting-edge ARVIPOA security technology. This stunning villa features smart pillar protection, biometric access control, and comprehensive monitoring systems.",
  owner: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
    verified: true
  }
};

export default function PropertyListingAdvert() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editedRules, setEditedRules] = useState(sampleProperty.rules);
  const [priceRequest, setPriceRequest] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [showExtendedDetails, setShowExtendedDetails] = useState(false);

  const handleRuleEdit = (index: number, newRule: string) => {
    const updated = [...editedRules];
    updated[index] = newRule;
    setEditedRules(updated);
  };

  const addRule = () => {
    setEditedRules([...editedRules, ""]);
  };

  const removeRule = (index: number) => {
    setEditedRules(editedRules.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">ARVIPOA Property Listing</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                sampleProperty.status === "available" 
                  ? "bg-green-500/20 border-green-500/30 text-green-400" 
                  : "bg-red-500/20 border-red-500/30 text-red-400"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  sampleProperty.status === "available" ? "bg-green-400" : "bg-red-400"
                } animate-pulse`} />
                <span className="text-sm font-medium capitalize">{sampleProperty.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 p-1">
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <img 
                    src={selectedImage === 0 ? sampleProperty.mainImage : sampleProperty.additionalImages[selectedImage - 1]}
                    alt={sampleProperty.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md ${
                      sampleProperty.status === "available" 
                        ? "bg-green-500/30 border border-green-500/50" 
                        : "bg-red-500/30 border border-red-500/50"
                    }`}>
                      {sampleProperty.status === "available" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-white font-medium text-sm capitalize">
                        {sampleProperty.status}
                      </span>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-md border border-white/20 px-3 py-2 rounded-full">
                      <span className="text-white font-medium text-sm capitalize">
                        For {sampleProperty.transactionType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Property Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{sampleProperty.title}</h2>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{sampleProperty.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Images */}
            <div className="grid grid-cols-4 gap-4">
              <motion.button
                onClick={() => setSelectedImage(0)}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-r p-1 ${
                  selectedImage === 0 
                    ? "from-yellow-400 via-blue-500 to-purple-600" 
                    : "from-gray-600/50 to-gray-700/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={sampleProperty.mainImage}
                  alt="Main view"
                  className="w-full h-20 object-cover rounded-lg"
                />
              </motion.button>
              
              {sampleProperty.additionalImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-r p-1 ${
                    selectedImage === index + 1 
                      ? "from-yellow-400 via-blue-500 to-purple-600" 
                      : "from-gray-600/50 to-gray-700/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image}
                    alt={`View ${index + 2}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                </motion.button>
              ))}
            </div>

            {/* Viewing Preferences */}
            <div className="bg-black border border-green-500 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Viewing Options</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.button 
                  className="flex flex-col items-center gap-2 p-4 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-6 h-6 text-green-400" />
                  <span className="text-white text-sm font-medium">360° Video</span>
                </motion.button>

                <motion.button 
                  className="flex flex-col items-center gap-2 p-4 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-6 h-6 text-green-400" />
                  <span className="text-white text-sm font-medium">Images</span>
                </motion.button>

                <motion.button 
                  className="flex flex-col items-center gap-2 p-4 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Map className="w-6 h-6 text-green-400" />
                  <span className="text-white text-sm font-medium">Map View</span>
                </motion.button>

                <motion.button 
                  className="flex flex-col items-center gap-2 p-4 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-6 h-6 text-green-400" />
                  <span className="text-white text-sm font-medium">Live Virtual property tour</span>
                </motion.button>
              </div>

              {/* Live Virtual Viewing Options */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <motion.button 
                  className="flex items-center gap-3 p-3 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plane className="w-5 h-5 text-green-400" />
                  <span className="text-white text-sm font-medium">Drone Inspection</span>
                </motion.button>

                <motion.button 
                  className="flex items-center gap-3 p-3 bg-black border border-green-500 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserCheck className="w-5 h-5 text-green-400" />
                  <span className="text-white text-sm font-medium">Field officer Live Inspection</span>
                </motion.button>
              </div>
            </div>

            {/* Property Details Tabs */}
            <div className="bg-black border border-white/20 rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/10">
                {["details", "rules", "description"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                        <Bed className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-gray-400 text-xs">Bedrooms</p>
                          <p className="text-white font-semibold">{sampleProperty.details.bedrooms}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                        <Bath className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-gray-400 text-xs">Bathrooms</p>
                          <p className="text-white font-semibold">{sampleProperty.details.bathrooms}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-xl border border-green-500/20">
                        <Home className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-gray-400 text-xs">Area</p>
                          <p className="text-white font-semibold">{sampleProperty.details.area}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                        <Car className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-gray-400 text-xs">Parking</p>
                          <p className="text-white font-semibold">{sampleProperty.details.parking}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {sampleProperty.details.amenities.map((amenity, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-white text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <motion.button
                        onClick={() => setShowExtendedDetails(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        View more details
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === "rules" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">Property Rules</h4>
                      <motion.button
                        onClick={() => setShowRulesModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit className="w-4 h-4" />
                        Request Changes
                      </motion.button>
                    </div>
                    <ul className="space-y-2">
                      {sampleProperty.rules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-black rounded-xl border border-green-500">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-white">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "description" && (
                  <div className="text-gray-300 leading-relaxed">
                    {sampleProperty.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <div className="bg-black border border-white/20 rounded-2xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">{sampleProperty.price}</h3>
                <p className="text-gray-400 capitalize">For {sampleProperty.transactionType.replace('_', ' ')}</p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={() => setShowPriceModal(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-black border border-green-500 rounded-xl text-white font-medium hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Request Price Modification
                </motion.button>

                <motion.button
                  className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 border border-green-500 rounded-xl text-white font-medium hover:bg-green-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DollarSign className="w-4 h-4" />
                  Proceed to Payment
                </motion.button>
              </div>
            </div>

            {/* Owner/Agent Contact */}
            <div className="bg-black border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact Owner</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={sampleProperty.owner.avatar}
                  alt={sampleProperty.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold">{sampleProperty.owner.name}</h4>
                    {sampleProperty.owner.verified && (
                      <Shield className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">Property Owner</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  className="flex items-center justify-center gap-2 p-3 bg-black border border-green-500 rounded-xl text-white hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Chat</span>
                </motion.button>

                <motion.button 
                  className="flex items-center justify-center gap-2 p-3 bg-black border border-green-500 rounded-xl text-white hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Call</span>
                </motion.button>

                <motion.button 
                  className="flex items-center justify-center gap-2 p-3 bg-black border border-green-500 rounded-xl text-white hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <span className="text-sm">SMS</span>
                </motion.button>

                <motion.button 
                  className="flex items-center justify-center gap-2 p-3 bg-black border border-green-500 rounded-xl text-white hover:bg-green-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Email</span>
                </motion.button>
              </div>
            </div>

            {/* ARVIPOA Security Features */}
            <div className="bg-black border border-yellow-400 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-yellow-400" />
                ARVIPOA Protected
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Smart Pillar Security</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Eye className="w-4 h-4 text-green-400" />
                  <span className="text-sm">24/7 Monitoring</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">IoT Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Edit Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRulesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Request Rule Changes</h3>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {editedRules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => handleRuleEdit(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter rule"
                    />
                    <button
                      onClick={() => removeRule(index)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={addRule}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                >
                  Add Rule
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extended Details Modal */}
      <AnimatePresence>
        {showExtendedDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExtendedDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Extended Property Details</h3>
                <button
                  onClick={() => setShowExtendedDetails(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Property Overview */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Property Overview</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Property ID</p>
                      <p className="text-white font-semibold">{sampleProperty.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Property Type</p>
                      <p className="text-white font-semibold">{sampleProperty.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Year Built</p>
                      <p className="text-white font-semibold">2020</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Lot Size</p>
                      <p className="text-white font-semibold">0.5 acres</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Specifications */}
                <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Detailed Specifications</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Floor Count</p>
                      <p className="text-white font-semibold">2 Floors</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Ceiling Height</p>
                      <p className="text-white font-semibold">10 ft</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Flooring</p>
                      <p className="text-white font-semibold">Marble & Hardwood</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Kitchen</p>
                      <p className="text-white font-semibold">Modern, Fully Equipped</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">HVAC System</p>
                      <p className="text-white font-semibold">Central A/C & Heating</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Water System</p>
                      <p className="text-white font-semibold">Borehole + Municipal</p>
                    </div>
                  </div>
                </div>

                {/* ARVIPOA Security Features */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-purple-400" />
                    ARVIPOA Security Integration
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-medium">Smart Pillar Protection</p>
                        <p className="text-gray-400 text-xs">24/7 AI-powered monitoring</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg border border-green-500/30">
                      <Eye className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">Biometric Access Control</p>
                        <p className="text-gray-400 text-xs">Fingerprint & facial recognition</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                      <Wifi className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-medium">IoT Sensor Network</p>
                        <p className="text-gray-400 text-xs">Gas, smoke, motion detection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg border border-red-500/30">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-white font-medium">Emergency Response</p>
                        <p className="text-gray-400 text-xs">Instant alert system</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Utilities & Maintenance */}
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Utilities & Maintenance</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Electricity</p>
                      <p className="text-white font-semibold">Solar + Grid Backup</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Internet</p>
                      <p className="text-white font-semibold">Fiber Optic 100Mbps</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Waste Management</p>
                      <p className="text-white font-semibold">Private Collection Service</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Maintenance</p>
                      <p className="text-white font-semibold">Quarterly Professional Service</p>
                    </div>
                  </div>
                </div>

                {/* Neighborhood Information */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Neighborhood</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Schools Nearby</p>
                      <p className="text-white font-semibold">3 within 2km radius</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Healthcare</p>
                      <p className="text-white font-semibold">Hospital 1.5km away</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Shopping</p>
                      <p className="text-white font-semibold">Mall & Markets nearby</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Transportation</p>
                      <p className="text-white font-semibold">Bus stop 200m away</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Modification Modal */}
      <AnimatePresence>
        {showPriceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPriceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Price Modification Request</h3>
                <button
                  onClick={() => setShowPriceModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Price</label>
                  <div className="px-4 py-2 bg-black/40 border border-white/20 rounded-xl text-white">
                    {sampleProperty.price}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Offer</label>
                  <input
                    type="text"
                    value={priceRequest}
                    onChange={(e) => setPriceRequest(e.target.value)}
                    className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter your price offer"
                  />
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send Price Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Similar Properties Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Similar Properties You May Be Interested In</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-6">
              {[
                {
                  id: "prop-1",
                  title: "Luxury Apartment in East Legon",
                  price: "GHS 450,000",
                  location: "East Legon, Accra",
                  type: "Apartment",
                  image: "/attached_assets/2.jpg",
                  bedrooms: 3,
                  bathrooms: 2,
                  area: "120 sqm"
                },
                {
                  id: "prop-2", 
                  title: "Modern Villa with Pool",
                  price: "GHS 850,000",
                  location: "Airport Residential, Accra",
                  type: "Villa",
                  image: "/attached_assets/3.jpg",
                  bedrooms: 4,
                  bathrooms: 3,
                  area: "250 sqm"
                },
                {
                  id: "prop-3",
                  title: "Executive Bungalow",
                  price: "GHS 320,000", 
                  location: "Tema, Greater Accra",
                  type: "Bungalow",
                  image: "/attached_assets/4.jpg",
                  bedrooms: 2,
                  bathrooms: 2,
                  area: "95 sqm"
                },
                {
                  id: "prop-4",
                  title: "Penthouse with City View",
                  price: "GHS 1,200,000",
                  location: "Cantonments, Accra",
                  type: "Penthouse", 
                  image: "/attached_assets/5.jpg",
                  bedrooms: 5,
                  bathrooms: 4,
                  area: "300 sqm"
                },
                {
                  id: "prop-5",
                  title: "Family Home with Garden",
                  price: "GHS 280,000",
                  location: "Kasoa, Central Region",
                  type: "House",
                  image: "/attached_assets/6.jpg",
                  bedrooms: 3,
                  bathrooms: 2,
                  area: "180 sqm"
                },
                {
                  id: "prop-6",
                  title: "Studio Apartment",
                  price: "GHS 180,000",
                  location: "Adabraka, Accra",
                  type: "Studio",
                  image: "/attached_assets/7.jpg",
                  bedrooms: 1,
                  bathrooms: 1,
                  area: "45 sqm"
                },
                {
                  id: "prop-7",
                  title: "Duplex with Parking",
                  price: "GHS 520,000",
                  location: "Spintex, Accra",
                  type: "Duplex",
                  image: "/attached_assets/8.jpg",
                  bedrooms: 4,
                  bathrooms: 3,
                  area: "200 sqm"
                }
              ].map((property) => (
                <div key={property.id} className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/90 to-blue-900/90 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/320/200';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-semibold rounded-full">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2 text-lg">{property.title}</h4>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms}
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          {property.area}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{property.price}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <MessageCircle className="w-4 h-4 text-green-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}