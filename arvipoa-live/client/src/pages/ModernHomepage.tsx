import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  MapPin, 
  Building2, 
  Smartphone, 
  Car, 
  Target, 
  Heart,
  Users,
  ChevronRight,
  Play,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Lock,
  Eye,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GeneralMarketModal from './GeneralMarketModal';

export default function ModernHomepage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero slider content
  const heroSlides = [
    {
      title: "The Smart Future of Property Protection",
      subtitle: "Welcome to ARVIPOA – Africa's Revolutionary Property Management & Protection Platform",
      description: "Secure your assets with blockchain technology, AI-powered verification, and IoT monitoring systems",
      primaryAction: "Start Registration",
      secondaryAction: "Watch Demo",
      primaryRoute: "/property-registration",
      backgroundGradient: "from-blue-900 via-purple-900 to-indigo-900",
      image: "/api/placeholder/800/600" // Replace with your PSD converted image
    },
    {
      title: "Advanced Asset Protection",
      subtitle: "Comprehensive Registration for All Your Valuable Assets",
      description: "From land properties to mobile devices - protect everything that matters with cutting-edge technology",
      primaryAction: "Explore Services",
      secondaryAction: "Learn More",
      primaryRoute: "/navigation",
      backgroundGradient: "from-emerald-900 via-teal-900 to-cyan-900",
      image: "/api/placeholder/800/600"
    },
    {
      title: "Real-Time Monitoring",
      subtitle: "24/7 IoT Surveillance & Smart Alerts",
      description: "Monitor your properties with Smart Pillars, receive instant notifications, and ensure maximum security",
      primaryAction: "View Dashboard",
      secondaryAction: "Contact Us",
      primaryRoute: "/command-center",
      backgroundGradient: "from-orange-900 via-red-900 to-pink-900",
      image: "/api/placeholder/800/600"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Featured services
  const featuredServices = [
    {
      icon: MapPin,
      title: "Land Management",
      description: "Manage land with Ghana GPS integration",
      route: "/land-registration-enhanced",
      color: "green",
      popular: true
    },
    {
      icon: Building2,
      title: "Property Management",
      description: "Complete building management system",
      route: "/building-registration",
      color: "blue",
      popular: true
    },
    {
      icon: Smartphone,
      title: "Mobile Protection",
      description: "Advanced phone theft protection",
      route: "/mobile-property",
      color: "purple",
      popular: false
    },
    {
      icon: Car,
      title: "Vehicle Management",
      description: "Track and protect your vehicles",
      route: "/auto-registration",
      color: "indigo",
      popular: false
    },
    {
      icon: Target,
      title: "Arms Management",
      description: "Secure firearm management",
      route: "/arms-registration",
      color: "red",
      popular: false
    },

  ];

  // Statistics
  const stats = [
    { number: "50,000+", label: "Properties Protected", icon: Shield },
    { number: "25,000+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
    { number: "24/7", label: "Monitoring", icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Navigation Header */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ARVIPOA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/property-registration" className="text-gray-300 hover:text-white transition-colors">
                Property Registration
              </Link>
              <Link to="/navigation" className="text-gray-300 hover:text-white transition-colors">
                All Services
              </Link>
              <Link to="/command-center" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/user-dashboard" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/property-registration" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Property Registration
                </Link>
                <Link to="/navigation" className="block px-3 py-2 text-gray-300 hover:text-white">
                  All Services
                </Link>
                <Link to="/command-center" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/user-dashboard" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section className="relative overflow-hidden">
        <div className={`min-h-screen bg-gradient-to-br ${heroSlides[currentSlide].backgroundGradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  {heroSlides[currentSlide].subtitle}
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  {heroSlides[currentSlide].description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                    onClick={() => navigate(heroSlides[currentSlide].primaryRoute)}
                  >
                    {heroSlides[currentSlide].primaryAction}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {heroSlides[currentSlide].secondaryAction}
                  </Button>
                </div>
              </div>

              {/* Hero Image/Visual */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  {/* Placeholder for PSD converted content */}
                  <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Shield className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg opacity-75">Your PSD Design Here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our comprehensive range of property registration and protection services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} to={service.route}>
                  <Card className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-${service.color}-900/20 to-${service.color}-800/30 border-${service.color}-500/30 hover:border-${service.color}-400/60 relative overflow-hidden`}>
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 bg-yellow-600 text-white">
                        Popular
                      </Badge>
                    )}
                    <CardContent className="p-8">
                      <Icon className={`w-12 h-12 text-${service.color}-400 mb-6 group-hover:scale-110 transition-transform`} />
                      <h3 className={`text-xl font-bold text-${service.color}-400 mb-3`}>
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center text-white opacity-75 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Learn More</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate('/navigation')}
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Assets?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust ARVIPOA to protect their valuable properties and assets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/property-registration">
              <Button 
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Start Registration
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ARVIPOA</span>
              </div>
              <p className="text-gray-400">
                Africa's leading property registration and protection platform
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/property-registration" className="hover:text-white transition-colors">Property Registration</Link></li>
                <li><Link to="/mobile-property" className="hover:text-white transition-colors">Mobile Protection</Link></li>
                <li><Link to="/auto-registration" className="hover:text-white transition-colors">Vehicle Registration</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARVIPOA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* General Market Modal */}
      <GeneralMarketModal 
        isOpen={isMarketModalOpen} 
        onClose={() => setIsMarketModalOpen(false)} 
      />
    </div>
  );
}