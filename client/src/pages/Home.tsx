import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Menu, User, LogOut, Eye, Settings, MapPin, FileText, Shield, Globe, Phone, Mail } from 'lucide-react';
import arvipoaLogo from "@assets/arvipoa upgraded logo.png";

export default function Home() {
  const [tourModal, setTourModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handlePropertySearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Simulate search functionality - in real implementation, this would call the backend
    console.log('Searching for:', searchQuery);
    // This would be replaced with actual API call to search properties/users
  };

  const navigationPages = [
    { name: 'Home', path: '/', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Settings className="w-4 h-4" /> },
    { name: 'Property Registration', path: '/property-registration', icon: <FileText className="w-4 h-4" /> },
    { name: 'Property Monitoring', path: '/property-monitoring', icon: <Eye className="w-4 h-4" /> },
    { name: 'Smart Card', path: '/smart-card', icon: <Shield className="w-4 h-4" /> },
    { name: 'Profile Details', path: '/profile-details', icon: <User className="w-4 h-4" /> },
    { name: 'Enhanced Profile', path: '/enhanced-profile', icon: <Shield className="w-4 h-4" /> },
    { name: 'Legal Hub', path: '/legal-hub', icon: <Shield className="w-4 h-4" /> },
    { name: 'Services', path: '/services', icon: <Globe className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Register', path: '/register', icon: <FileText className="w-4 h-4" /> },
    { name: 'Sign Up', path: '/signup', icon: <User className="w-4 h-4" /> },
    { name: 'Sign In', path: '/login', icon: <User className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-gradient-to-br from-green-900 via-black to-yellow-700 text-white min-h-screen">
      {/* Header with Logo and Navigation */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors">
              <img src={arvipoaLogo} alt="ARVIPOA Logo" className="h-12 w-12 object-contain" />
              <span className="font-bold text-xl">ARVIPOA</span>
            </Link>
            
            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="text-sm font-medium">Menu</span>
              </button>

              {/* Navigation Dropdown */}
              {isMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl">
                  <div className="p-2">
                    {navigationPages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {page.icon}
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <User className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl">
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOnline(!isOnline);
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    {isOnline ? 'Go Offline' : 'Go Online'}
                  </button>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors text-red-400"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Welcome to ARVIPOA Smart Hub
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl max-w-2xl mx-auto mb-8"
        >
          Secure your assets, monitor land, and access smart civic tools in one platform.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-4"
        >
          <Link to="/property-registration" className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" />
            Register Property
          </Link>
          <Link to="/login" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors">
            <User className="w-4 h-4" />
            Sign In
          </Link>
        </motion.div>
      </section>

      {/* Enhanced Property Search Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-center">Property & User Search</h2>
          <p className="text-gray-300 text-center mb-6">Search by Digital Address, User ID, IMEI, Registration Number, License Number, etc.</p>
          
          <div className="flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 text-black">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 outline-none bg-transparent" 
              placeholder="Enter Digital Address, User ID, IMEI, Registration #, License #..." 
              onKeyPress={(e) => e.key === 'Enter' && handlePropertySearch()}
            />
            <button 
              onClick={handlePropertySearch}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <button className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded-lg text-sm transition-colors">QR Scan</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded-lg text-sm transition-colors">Object Recognition</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg text-sm font-semibold transition-colors">AI Assistant</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">Voice Search</button>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Platform Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <Globe className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Marketplace</h3>
              <p className="text-gray-300">Buy, sell, or discover smart items from verified vendors with secure transactions.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <User className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">People Network</h3>
              <p className="text-gray-300">Connect with verified property owners and businesses in your area.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <Eye className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Media Hub</h3>
              <p className="text-gray-300">Access news, media content, and streaming services in one unified platform.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <MapPin className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Services</h3>
              <p className="text-gray-300">Find groups, RBFS centers, hospitals, auto shops, and legal services nearby.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Assistant and Smart Features */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-8"
          >
            Smart AI-Powered Tools
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Property Assistant</h3>
              <p className="text-gray-300 text-sm">Get instant property valuations and market insights</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recognition</h3>
              <p className="text-gray-300 text-sm">QR codes and object recognition for quick access</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Voice Commands</h3>
              <p className="text-gray-300 text-sm">Control your property management with voice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleverjot Floating Icon */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-600 hover:bg-yellow-500 p-4 rounded-full shadow-lg transition-colors"
        >
          🖊️
        </motion.button>
      </div>

      {/* Direct Property Registration Access */}
      <div className="text-center mt-10">
        <Link
          to="/property-registration"
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow hover:bg-yellow-400 inline-block transition-colors"
        >
          📍 Start Property Registration
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-black bg-opacity-80 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-yellow-500 mb-2">About ARVIPOA</h4>
            <p>Smart Property Protection & Infrastructure Platform.</p>
          </div>
          <div>
            <h4 className="font-bold text-yellow-500 mb-2">Services & Initiatives</h4>
            <ul className="space-y-1">
              <li><Link to="/services">Smart Card</Link></li>
              <li><Link to="/services">Pillar Monitoring</Link></li>
              <li><Link to="/services">River Barricade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-yellow-500 mb-2">Contact</h4>
            <p>Beside GES Madina Office, Presec Accra central<br/>GPS: GM0060328</p>
            <p>📞 +233303981600</p>
            <p>🌐 www.arvipoa.org</p>
            <p>✉️ support@arvipoa.org</p>
          </div>
        </div>
      </footer>
    </div>
  );
}