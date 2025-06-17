import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingPaymentPanel from '@/components/FloatingPaymentPanel';
import smartPillarDashboard from '@assets/SMART PILLAR DASHBOARD.png';
import arvipoaLogo from '@assets/arvipoa upgraded logo.png';
import smartPillarGround from '@assets/smart pillar on ground.png';
import rdbCropped from '@assets/RDB CROPPED.png';
import chatgptImage1 from '@assets/ChatGPT Image Jun 5, 2025, 09_40_46 PM.png';
import chatgptImage2 from '@assets/ChatGPT Image Jun 5, 2025, 09_46_11 PM.png';
import chatgptImage3 from '@assets/ChatGPT Image Jun 5, 2025, 09_55_53 PM.png';
import chatgptImage4 from '@assets/ChatGPT Image Jun 5, 2025, 10_02_49 PM.png';
import chatgptImage5 from '@assets/ChatGPT Image Jun 5, 2025, 10_13_46 PM.png';
import chatgptImage6 from '@assets/ChatGPT Image Jun 5, 2025, 10_24_36 PM.png';
import chatgptImage7 from '@assets/ChatGPT Image Jun 5, 2025, 10_33_12 PM.png';
import chatgptImage8 from '@assets/ChatGPT Image Jun 5, 2025, 10_38_43 PM.png';
import chatgptImage9 from '@assets/ChatGPT Image Jun 5, 2025, 10_41_09 PM.png';
import chatgptImage10 from '@assets/ChatGPT Image Jun 5, 2025, 10_45_46 PM.png';
import chatgptImage11 from '@assets/ChatGPT Image Jun 5, 2025, 11_11_57 PM.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Building2, 
  MapPin, 
  Target, 
  Rabbit,
  MessageCircle,
  Video,
  Phone,
  AlertTriangle,
  ShoppingCart,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from 'lucide-react';

export default function FunctionalHome() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);

  // ARVIPOA promotional images
  const sliderImages = [
    {
      url: smartPillarDashboard,
      title: 'ARVIPOA Smart Pillar Dashboard',
      description: 'Advanced monitoring and control systems for comprehensive property protection'
    },
    {
      url: arvipoaLogo,
      title: 'ARVIPOA - Advanced Property Management',
      description: 'Leading Africa\'s smart infrastructure and property registration platform'
    },
    {
      url: smartPillarGround,
      title: 'Smart Pillar Technology',
      description: 'Innovative ground-based monitoring systems for enhanced security'
    },
    {
      url: rdbCropped,
      title: 'River Defense Barricade',
      description: 'Water-based property protection and monitoring systems'
    },
    {
      url: chatgptImage1,
      title: 'ARVIPOA Smart Infrastructure Platform',
      description: 'Environmental sensors, digital land surveys, and comprehensive monitoring'
    },
    {
      url: chatgptImage2,
      title: 'Upholding Possessions with Sustainable Developments',
      description: 'Protecting your property with advanced technology and community partnership'
    },
    {
      url: chatgptImage3,
      title: 'The ARVIPOA Ecosystem',
      description: 'Smart boundary pillars, digital land registry, and green energy management'
    },
    {
      url: chatgptImage4,
      title: 'How It Works',
      description: 'Smart pillar technology with CCTV, sensors, and monitoring systems'
    },
    {
      url: chatgptImage5,
      title: 'Unique Features',
      description: 'Secure access, wireless connectivity, and multi-purpose ARVIPOA smart card'
    },
    {
      url: chatgptImage6,
      title: 'Advanced Technology Integration',
      description: 'React, Firebase, AI-powered monitoring, and intelligent systems'
    },
    {
      url: chatgptImage7,
      title: '$40B Market Opportunity',
      description: 'Transforming African property management and security infrastructure'
    },
    {
      url: chatgptImage8,
      title: 'ARVIPOA Revenue Model',
      description: 'Smart card services, API integration, rental solutions, and auction platforms'
    },
    {
      url: chatgptImage9,
      title: 'Comprehensive Revenue Streams',
      description: 'Smart card, API, rental, and auction-based business model'
    },
    {
      url: chatgptImage10,
      title: 'Join Us - Smart Property Protection',
      description: 'Be part of the future of African property security and management'
    },
    {
      url: chatgptImage11,
      title: 'Welcome to ARVIPOA',
      description: 'Africa\'s leading smart property protection and management platform'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-[#D4AF37]" />
              <span className="ml-2 text-xl font-bold text-gray-900">ARVIPOA</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300">
                Home
              </Link>
              <Link to="/property-registration" className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300">
                Property Registration
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300">
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300">
                About
              </Link>
            </div>

            {/* Action Icons & User Profile */}
            <div className="flex items-center space-x-3">
              {/* Chat Button */}
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </button>
              
              {/* Video Call Button */}
              <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300 hover:scale-110">
                <Video className="w-5 h-5" />
              </button>
              
              {/* Audio Call Button */}
              <button className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all duration-300 hover:scale-110">
                <Phone className="w-5 h-5" />
              </button>
              
              {/* Emergency Button */}
              <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 hover:scale-110">
                <AlertTriangle className="w-5 h-5" />
              </button>
              
              {/* Market Button */}
              <Link to="/animal-marketplace" className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all duration-300 hover:scale-110">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              
              {/* Health Button */}
              <Link to="/health-intelligence" className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all duration-300 hover:scale-110">
                <Heart className="w-5 h-5" />
              </Link>
              
              {/* Services Button */}
              <Link to="/services" className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-300 hover:scale-110">
                <Settings className="w-5 h-5" />
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">User Profile</p>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#FFD700]/10 transition-all duration-300"
                        to="/enhanced-profile"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                        to="/property-registration"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Building2 className="w-4 h-4 mr-3" />
                        Property Register
                      </Link>
                      <button
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <X className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300 font-medium" to="/login">
                Login
              </Link>
              <Link
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                to="/signup"
              >
                Sign Up
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#D4AF37] hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-[#D4AF37] px-4 py-2">
                  Home
                </Link>
                <Link to="/property-registration" className="text-gray-700 hover:text-[#D4AF37] px-4 py-2">
                  Property Registration
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-[#D4AF37] px-4 py-2">
                  Services
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-[#D4AF37] px-4 py-2">
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Image Slider with Advanced Animations */}
      <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl group">
        <div 
          className="flex transition-all duration-700 ease-in-out h-full"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            filter: 'brightness(1.05) contrast(1.1)'
          }}
        >
          {sliderImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img 
                src={image.url} 
                alt={image.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  index === currentSlide 
                    ? 'scale-105 brightness-110' 
                    : 'scale-100 brightness-90'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                <div className={`text-center text-white transition-all duration-500 ${
                  index === currentSlide 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}>
                  <h2 className="text-4xl font-bold mb-4 animate-pulse">{image.title}</h2>
                  <p className="text-xl opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation buttons with hover effects */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Enhanced Dot indicators with animation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-white w-8 h-3 scale-110 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70 w-3 h-3'
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-700"
            style={{ width: `${((currentSlide + 1) / sliderImages.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ARVIPOA Property Management Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced property and animal management with comprehensive monitoring and registration
          </p>
          <Button 
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
            onClick={() => navigate('/registration-hub')}
          >
            Access Registration Hub
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Land Registration</h3>
              <p className="text-gray-600">Register land properties with Ghana GPS integration</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Firearm Registration</h3>
              <p className="text-gray-600">Secure firearm registration and licensing</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Rabbit className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Animal Registration</h3>
              <p className="text-gray-600">Register animals, pets, and livestock</p>
            </CardContent>
          </Card>

          <Link to="/virtual-tour">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Virtual Property Tour</h3>
                <p className="text-gray-600">Explore properties with immersive 360° virtual experiences</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Payment Trigger Button */}
        <div className="fixed bottom-6 left-6 z-50">
          <Button
            onClick={() => setShowPaymentPanel(!showPaymentPanel)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            size="lg"
          >
            <DollarSign className="w-6 h-6" />
          </Button>
        </div>
      </main>

      {/* Floating Payment Panel */}
      <FloatingPaymentPanel 
        isVisible={showPaymentPanel} 
        onClose={() => setShowPaymentPanel(false)} 
      />
    </div>
  );
}