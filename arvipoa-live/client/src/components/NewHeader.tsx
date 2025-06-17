import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  User, 
  Video, 
  Phone, 
  MessageCircle, 
  Bell, 
  Edit3,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Calendar,
  Clock,
  ChevronDown,
  Home,
  Info,
  Settings,
  FileText,
  MapPin,
  Building,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export default function NewHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    humidity: 65,
    windSpeed: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'partly-cloudy':
        return <Cloud className="w-4 h-4 text-gray-500" />;
      default:
        return <Cloud className="w-4 h-4 text-gray-500" />;
    }
  };

  const homeMenuItems = [
    { name: "Home", to: "/", icon: Home },
    { name: "About Us", to: "/about", icon: Info },
    { name: "Services", to: "/services", icon: Settings },
    { name: "Smart Pillar", to: "/smart-pillar", icon: Building },
    { name: "River Defense", to: "/river-defense-barricade", icon: MapPin },
    { name: "Foreign Bird Payment", to: "/foreign-bird-payment", icon: Users },
    { name: "RBFS Platform", to: "/rbfs-platform", icon: Building },
    { name: "Blog", to: "/blog", icon: FileText },
    { name: "Register Property", to: "/register", icon: Edit3 },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white shadow-2xl sticky top-0 z-50 border-b border-blue-500/30">
      {/* Top Row: Weather Widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start py-2 border-b border-white/10">
          <div className="flex items-center space-x-4">
            {/* Weather Widget */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[140px] border border-white/20">
              <div className="flex items-center justify-between mb-1">
                {getWeatherIcon(weather.icon)}
                <span className="text-sm font-semibold">{weather.temperature}°C</span>
              </div>
              <div className="text-xs text-gray-300 mb-1">{weather.condition}</div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center">
                  <Wind className="w-3 h-3 mr-1" />
                  {weather.windSpeed}km/h
                </span>
                <span>{weather.humidity}%</span>
              </div>
            </div>

            {/* Time and Date Widget */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[140px] border border-white/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-3 h-3 mr-1 text-blue-400" />
                <span className="text-sm font-mono">{formatTime(currentTime)}</span>
              </div>
              <div className="flex items-center justify-center text-xs text-gray-300">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(currentTime).split(',')[0]}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatDate(currentTime).split(',').slice(1).join(',').trim()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section: User Profile and Communication Icons */}
          <div className="flex items-center space-x-6">
            
            {/* User Profile Section */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                  >
                    <User className="w-6 h-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Communication Icons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-all duration-300"
                title="Video Call"
              >
                <Video className="w-5 h-5 text-green-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300"
                title="Audio Call"
              >
                <Phone className="w-5 h-5 text-blue-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
                title="Chat"
              >
                <MessageCircle className="w-5 h-5 text-purple-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all duration-300"
                title="Emergency Alarm"
              >
                <Bell className="w-5 h-5 text-red-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300"
                title="Notes"
              >
                <Edit3 className="w-5 h-5 text-yellow-400" />
              </Button>
            </div>
          </div>

          {/* Center Section: ARVIPOA Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ARVIPOA
                </h1>
                <p className="text-xs text-gray-400 tracking-widest">DIGITAL PROPERTY PLATFORM</p>
              </motion.div>
            </Link>
          </div>

          {/* Right Section: Home Menu */}
          <div className="flex items-center space-x-4">



            {/* Home Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
                >
                  <Menu className="w-6 h-6 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-gray-800 border-gray-700 text-white mr-4">
                <div className="px-3 py-2 text-sm font-semibold text-gray-300 border-b border-gray-700">
                  Navigation Menu
                </div>
                {homeMenuItems.map((item) => (
                  <Link key={item.name} to={item.to}>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}