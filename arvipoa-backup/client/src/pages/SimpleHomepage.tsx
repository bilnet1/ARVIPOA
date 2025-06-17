import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Users, 
  Globe, 
  Building2, 
  Shield, 
  Play, 
  ChevronDown,
  Store,
  Briefcase,
  ShoppingCart,
  Heart,
  Home,
  Bot,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  QrCode,
  Camera,
  ChevronUp,
  X,
  Gavel,
  Building,
  FileText,
  UserCheck,
  Hospital,
  Pill,
  Dumbbell,
  Heart as HeartIcon,
  Headphones,
  School,
  Zap,
  GraduationCap,
  Truck,
  Clock,
  Store as StoreIcon,
  MailIcon,
  Church,
  DollarSign,
  CreditCard,
  Banknote,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import assets
import arviPoaNetflix1 from "@assets/ARVIPOA FREE NETFLIX.png";
import arviPoaNetflix2 from "@assets/ARVIPOA FREE NETFLIX 2.png";
import arviPoaNetflix3 from "@assets/ARVIPOA FREE NETFLIX  3.png";

export default function SimpleHomepage() {
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [typedPrice, setTypedPrice] = useState<string>("1000");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("GHS");
  const [selectedAcquisitionPlan, setSelectedAcquisitionPlan] = useState<string>("");
  const [selectedDurationPlan, setSelectedDurationPlan] = useState<string>("");
  
  // Force cache refresh
  console.log("SimpleHomepage loaded - Version 2024.06.08.17:15");

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(expandedFooterSection === section ? null : section);
  };

  const propertyTypes = [
    { value: "Land", icon: "🏞️" },
    { value: "Building/House", icon: "🏠" },
    { value: "Vehicle/Auto", icon: "🚗" },
    { value: "Electronics", icon: "📱" },
    { value: "Arms/Firearms", icon: "🔫" },
    { value: "Livestock/Animals", icon: "🐄" },
    { value: "Trees/Plants", icon: "🌳" },
    { value: "Marine Vessels", icon: "🚢" },
    { value: "Aircraft", icon: "✈️" },
    { value: "Machinery", icon: "⚙️" }
  ];

  const regionsWithDistricts = {
    "Greater Accra": [
      "Accra Metropolitan", "Tema Metropolitan", "La Nkwantanang Madina Municipal",
      "Ledzokuku Municipal", "Kpone Katamanso Municipal", "Ashaiman Municipal",
      "Adentan Municipal", "Ga West Municipal", "Ga East Municipal", "Ga Central Municipal"
    ],
    "Ashanti": [
      "Kumasi Metropolitan", "Obuasi Municipal", "Ejisu Municipal", "Bekwai Municipal",
      "Mampong Municipal", "Asante Akim North Municipal", "Asante Akim South Municipal"
    ],
    "Western": [
      "Sekondi-Takoradi Metropolitan", "Tarkwa-Nsuaem Municipal", "Prestea Huni-Valley Municipal",
      "Wassa East District", "Wassa Amenfi West Municipal"
    ],
    "Central": [
      "Cape Coast Metropolitan", "Elmina Municipal", "Komenda Edina Eguafo Abreim Municipal",
      "Awutu Senya East Municipal", "Effutu Municipal"
    ],
    "Eastern": [
      "New Juaben South Municipal", "New Juaben North Municipal", "Akuapem North Municipal",
      "Akuapem South Municipal", "Suhum Municipal"
    ],
    "Northern": [
      "Tamale Metropolitan", "Yendi Municipal", "Savelugu Municipal", 
      "Gushegu Municipal", "Karaga District"
    ],
    "Volta": [
      "Ho Municipal", "Hohoe Municipal", "Keta Municipal",
      "Anloga District", "South Tongu District"
    ],
    "Upper East": [
      "Bolgatanga Municipal", "Bawku Municipal", "Navrongo Municipal",
      "Kassena Nankana West District", "Builsa North District"
    ],
    "Upper West": [
      "Wa Municipal", "Lawra Municipal", "Jirapa Municipal",
      "Nadowli Kaleo District", "Sissala East Municipal"
    ],
    "Brong-Ahafo": [
      "Sunyani Municipal", "Techiman Municipal", "Berekum Municipal",
      "Dormaa Municipal", "Kintampo Municipal"
    ]
  };

  const townsAndCommunities = {
    "Accra Metropolitan": [
      "Osu", "Labone", "Airport Residential", "East Legon", "Cantonments", "Ridge", "Adabraka", 
      "Asylum Down", "Kokomlemle", "Dansoman", "Achimota", "Tesano", "North Kaneshie"
    ],
    "Tema Metropolitan": [
      "Community 1", "Community 2", "Community 3", "Community 4", "Community 5", "Community 6", 
      "Community 7", "Community 8", "Community 9", "Community 10", "Community 11", "Community 12"
    ],
    "La Nkwantanang Madina Municipal": [
      "Madina", "Ashongman", "Pantang", "Adenta", "Frafraha", "Oyarifa", "Abokobi", "Haatso"
    ],
    "Kumasi Metropolitan": [
      "Adum", "Asokwa", "Bantama", "Kwadaso", "Suame", "Tafo", "Asawase", "Nhyiaeso", 
      "Atonsu", "Ayigya", "Bomso", "Dichemso"
    ],
    "Sekondi-Takoradi Metropolitan": [
      "Sekondi", "Takoradi", "Effia", "Kwesimintsim", "New Takoradi", "Anaji", "Kojokrom", 
      "Fijai", "Windy Ridge", "Beach Road"
    ],
    "Cape Coast Metropolitan": [
      "Cape Coast Central", "Pedu", "Abura", "Amamoma", "Kwaprow", "Adisadel", "University of Cape Coast"
    ],
    "Tamale Metropolitan": [
      "Tamale Central", "Kalpohin", "Choggu", "Vittin", "Lamashegu", "Gumani", "Zogbeli", "Dungu"
    ]
  };

  const currencies = [
    { code: "GHS", symbol: "₵", name: "Ghana Cedi" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" }
  ];

  const acquisitionPlans = ["Book/Rent", "Buy", "Lease", "Mortgage", "Caretaking"];
  const durationPlans = ["Hourly", "Daily", "Weekly", "Monthly", "Annually"];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
      color: "white"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to ARVIPOA
          </h1>
          <p className="text-2xl text-gray-300 mb-8 font-light">
            Africa's Revolutionary Property Management & Protection Platform
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Secure your assets with blockchain technology, AI-powered verification, and IoT monitoring systems
          </p>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Smart Security</h4>
                <p className="text-gray-300 text-xs">IoT monitoring & AI detection</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <Home className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Property Management</h4>
                <p className="text-gray-300 text-xs">Registration & valuation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Community Engagement</h4>
                <p className="text-gray-300 text-xs">Social & live streaming</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Digital Platform</h4>
                <p className="text-gray-300 text-xs">Complete ecosystem</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Search Section with QR Code */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 mb-8 border border-green-400/30">
            {/* Search Bar with QR and Camera */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Input 
                  placeholder="Scan QR Codes, take photos of properties here and get quick results - your property search just got better, explore more"
                  className="bg-white/90 border-white/30 text-gray-800 placeholder-gray-500 pr-20 pl-4 py-3"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 p-2">
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 p-2">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Property Search Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Property Type */}
              <Card className="bg-white/90 border-0">
                <CardContent className="p-4">
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="bg-white/90 border-0">
                <CardContent className="p-4">
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Location</label>
                  <div className="space-y-2">
                    <Select value={selectedRegion} onValueChange={(value) => {
                      setSelectedRegion(value);
                      setSelectedDistrict("");
                      setSelectedTown("");
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(regionsWithDistricts).map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedRegion && (
                      <Select value={selectedDistrict} onValueChange={(value) => {
                        setSelectedDistrict(value);
                        setSelectedTown("");
                      }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {regionsWithDistricts[selectedRegion as keyof typeof regionsWithDistricts]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {selectedDistrict && townsAndCommunities[selectedDistrict as keyof typeof townsAndCommunities] && (
                      <Select value={selectedTown} onValueChange={setSelectedTown}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Town/Community" />
                        </SelectTrigger>
                        <SelectContent>
                          {townsAndCommunities[selectedDistrict as keyof typeof townsAndCommunities]?.map((town) => (
                            <SelectItem key={town} value={town}>
                              {town}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card className="bg-white/90 border-0">
                <CardContent className="p-4">
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Price Range</label>
                  <div className="space-y-3">
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="px-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>1</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Current:</span>
                          <Input
                            type="number"
                            min="1"
                            max="10000000"
                            value={typedPrice}
                            onChange={(e) => {
                              const value = e.target.value;
                              setTypedPrice(value);
                              const numValue = Number(value);
                              if (numValue >= 1 && numValue <= 10000000) {
                                setPriceRange(numValue);
                              }
                            }}
                            className="w-20 h-6 text-xs p-1 text-center"
                            placeholder="0"
                          />
                          <span className="text-xs font-medium">
                            {currencies.find(c => c.code === selectedCurrency)?.symbol}
                          </span>
                        </div>
                        <span>10M+</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10000000"
                        value={priceRange}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setPriceRange(value);
                          setTypedPrice(value.toString());
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(priceRange / 10000000) * 100}%, #e5e7eb ${(priceRange / 10000000) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="text-center mt-2">
                        <span className="text-lg font-bold text-blue-600">
                          {currencies.find(c => c.code === selectedCurrency)?.symbol}{priceRange.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acquisition and Duration Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Acquisition Plan */}
              <Card className="bg-white/90 border-0">
                <CardContent className="p-4">
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Acquisition Plan</label>
                  <Select value={selectedAcquisitionPlan} onValueChange={setSelectedAcquisitionPlan}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Acquisition Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {acquisitionPlans.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Duration Plan */}
              <Card className="bg-white/90 border-0">
                <CardContent className="p-4">
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Duration Plan</label>
                  <Select value={selectedDurationPlan} onValueChange={setSelectedDurationPlan}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Duration Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationPlans.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Search Button and AI Assistant */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 px-8 py-3 text-lg">
                <Bot className="w-5 h-5" />
                ARVIPOA AI Assistant
              </Button>
            </div>
          </div>
        </div>



        {/* Main Content Grid - Two Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* ARVIPOA Services & Local Stores */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardContent className="p-0 relative h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
              
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Store className="w-8 h-8 text-orange-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Local Stores</h5>
                      <p className="text-gray-300 text-xs">Find products nearby</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Briefcase className="w-8 h-8 text-blue-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">ARVIPOA Services</h5>
                      <p className="text-gray-300 text-xs">Professional services</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <ShoppingCart className="w-8 h-8 text-green-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Marketplace</h5>
                      <p className="text-gray-300 text-xs">Buy & sell locally</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Heart className="w-8 h-8 text-red-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Community</h5>
                      <p className="text-gray-300 text-xs">Connect & share</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">ARVIPOA Services & Local Stores</h3>
                <p className="text-gray-200 text-sm">Discover local businesses and professional services</p>
              </div>
            </CardContent>
          </Card>

          {/* Property Listings & News */}
          <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardContent className="p-0 relative h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20"></div>
              
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <Link to="/property-listing-advert">
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                        <Home className="w-8 h-8 text-blue-400 mb-2" />
                        <h5 className="text-white font-semibold text-sm">Property Listings</h5>
                        <p className="text-gray-300 text-xs">Find your dream home</p>
                      </div>
                    </Link>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Globe className="w-8 h-8 text-green-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">News & Blogs</h5>
                      <p className="text-gray-300 text-xs">Stay informed daily</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Play className="w-8 h-8 text-purple-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Video Content</h5>
                      <p className="text-gray-300 text-xs">Entertainment hub</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <MapPin className="w-8 h-8 text-yellow-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Location Services</h5>
                      <p className="text-gray-300 text-xs">Find nearby places</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">Property Listings & News</h3>
                <p className="text-gray-200 text-sm">Latest properties and trending news updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Content */}
        <div className="mb-16 overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Content</h3>
          <div className="relative">
            <div className="flex animate-scroll space-x-6">
              {[
                { image: arviPoaNetflix1, title: 'ARVIMEDIA Free Streaming', description: 'Netflix, Amazon Prime & YouTube Extra access', type: 'streaming' },
                { image: arviPoaNetflix2, title: 'Ghanaian Subtitles', description: 'Content subtitled in local languages', type: 'streaming' },
                { 
                  image: arviPoaNetflix3, 
                  title: 'River Barricade Protection System', 
                  description: 'Advanced flood control and water management infrastructure for property protection',
                  type: 'video',
                  videoUrl: 'https://drive.google.com/file/d/1ARDEfGezgEEv69AwIFZHpkk11WcY8Llx/view?usp=sharing'
                },
                { image: arviPoaNetflix1, title: 'Multi-Platform Access', description: 'Watch on any device, anywhere', type: 'streaming' },
                { image: arviPoaNetflix2, title: 'Family Friendly', description: 'Content for all ages and preferences', type: 'streaming' }
              ].map((item, index) => (
                <Card key={index} className="flex-shrink-0 w-80 bg-gradient-to-br from-red-900/50 to-black/50 backdrop-blur-sm border-red-500/30 overflow-hidden group hover:scale-105 transition-transform">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/320/200';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          {item.type === 'video' && item.videoUrl ? (
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                              onClick={() => window.open(item.videoUrl, '_blank')}
                            >
                              Watch Video
                            </Button>
                          ) : (
                            <Link to="/arvimedia">
                              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                                Watch Now
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Places & Public Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Explore Places & Public Services</h3>
          
          {/* Law Enforcement */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Gavel className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-blue-400">Law Enforcement</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Police Station</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Court</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Law Offices</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <UserCheck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Commissioner of Oath</h5>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Health & Wellbeing */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HeartIcon className="w-5 h-5 text-green-400" />
              <h4 className="text-lg font-semibold text-green-400">Health & Wellbeing</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Hospital className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Hospital</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Pill className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Pharmacy</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Dumbbell className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Gym</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Yoga Centres</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Headphones className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Online Counselling</h5>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <School className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-yellow-400">Wisd♧m</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Local School</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Talent Engineering</h5>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RBFS (Religious Buildings and Faith Services) */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-purple-400">RBFS (Religious Buildings & Faith Services)</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Churches</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Building className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Mosques</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Building className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Temples & Shrines</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Building className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Other RBF Centres</h5>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Local Services */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-orange-400" />
              <h4 className="text-lg font-semibold text-orange-400">Local Services</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Filling Stations</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Lorry Stations</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <StoreIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Local Stores</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <MailIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Post Office</h5>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Foreign Bird */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-cyan-400">Foreign Bird</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Banks</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Banknote className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Loan Facility Centre</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Forex</h5>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-800/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <ShoppingBag className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h5 className="text-white font-semibold text-sm">Market</h5>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <Card key={i} className="bg-white/90 border-0">
                <CardContent className="p-6">
                  <div className="h-12"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">10,000+</div>
              <div className="text-gray-300">Properties Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">50,000+</div>
              <div className="text-gray-300">Users Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Security Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-gray-300">System Uptime</div>
            </div>
          </div>
        </div>

        {/* Collapsible Footer */}
        <footer className="mt-16 pt-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">ARVIPOA</h3>
            <p className="text-gray-300 text-sm">Property Protection</p>
          </div>

          {/* Collapsible Footer Sections */}
          <div className="space-y-4">
            {/* HOME Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('home')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">HOME</span>
                </div>
                {expandedFooterSection === 'home' ? 
                  <ChevronUp className="w-5 h-5 text-blue-400" /> : 
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                }
              </button>
              {expandedFooterSection === 'home' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/" className="block hover:text-blue-400">Homepage</Link>
                  <Link to="/about" className="block hover:text-blue-400">About Us</Link>
                </motion.div>
              )}
            </div>

            {/* SERVICES Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('services')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">SERVICES</span>
                </div>
                {expandedFooterSection === 'services' ? 
                  <ChevronUp className="w-5 h-5 text-green-400" /> : 
                  <ChevronDown className="w-5 h-5 text-green-400" />
                }
              </button>
              {expandedFooterSection === 'services' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/services" className="block hover:text-green-400">All Services</Link>
                  <Link to="/property-registration" className="block hover:text-green-400">Property Registration</Link>
                  <Link to="/river-defense-barricade" className="block hover:text-green-400">River Defense Barricade</Link>
                  <Link to="/smart-pillar" className="block hover:text-green-400">Smart Pillar System</Link>
                  <Link to="/health-intelligence" className="block hover:text-green-400">Health Intelligence</Link>
                  <Link to="/pmb-email-center" className="block hover:text-green-400">Private Mailbox</Link>
                  <Link to="/monitoring" className="block hover:text-green-400">Live Monitoring</Link>
                </motion.div>
              )}
            </div>

            {/* LEGAL Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('legal')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">LEGAL</span>
                </div>
                {expandedFooterSection === 'legal' ? 
                  <ChevronUp className="w-5 h-5 text-yellow-400" /> : 
                  <ChevronDown className="w-5 h-5 text-yellow-400" />
                }
              </button>
              {expandedFooterSection === 'legal' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/privacy-policy" className="block hover:text-yellow-400">Privacy Policy</Link>
                  <Link to="/terms" className="block hover:text-yellow-400">Terms of Use</Link>
                  <Link to="/property-owners-terms" className="block hover:text-yellow-400">Property Owners Terms</Link>
                  <Link to="/buyers-tenants-terms" className="block hover:text-yellow-400">Buyers & Tenants Terms</Link>
                  <Link to="/cookie-policy" className="block hover:text-yellow-400">Cookie Policy</Link>
                  <Link to="/eula" className="block hover:text-yellow-400">EULA</Link>
                  <Link to="/legal-hub" className="block hover:text-yellow-400">Legal Hub</Link>
                  <Link to="/property-law" className="block hover:text-yellow-400">Property Law</Link>
                </motion.div>
              )}
            </div>

            {/* PARTNERSHIPS Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('partnerships')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">PARTNERSHIPS</span>
                </div>
                {expandedFooterSection === 'partnerships' ? 
                  <ChevronUp className="w-5 h-5 text-purple-400" /> : 
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                }
              </button>
              {expandedFooterSection === 'partnerships' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/members" className="block hover:text-purple-400">Members</Link>
                  <Link to="/partners" className="block hover:text-purple-400">Partners</Link>
                  <Link to="/clients" className="block hover:text-purple-400">Clients</Link>
                  <Link to="/affiliates" className="block hover:text-purple-400">Affiliates</Link>
                  <div className="text-purple-300 text-xs mt-2">Business Relations</div>
                  <div className="text-purple-300 text-xs">Become a Partner</div>
                  <div className="text-purple-300 text-xs">Success Program</div>
                  <div className="text-purple-300 text-xs">Business Program</div>
                </motion.div>
              )}
            </div>

            {/* PLATFORM Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('platform')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">PLATFORM</span>
                </div>
                {expandedFooterSection === 'platform' ? 
                  <ChevronUp className="w-5 h-5 text-cyan-400" /> : 
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                }
              </button>
              {expandedFooterSection === 'platform' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/property-advertisements" className="block hover:text-cyan-400">Property Listings</Link>
                  <Link to="/news-portal" className="block hover:text-cyan-400">News Portal</Link>
                  <Link to="/community-social" className="block hover:text-cyan-400">Community Hub</Link>
                  <Link to="/arvicine" className="block hover:text-cyan-400">ARVICINE Videos</Link>
                  <Link to="/smart-pillar" className="block hover:text-cyan-400">Smart Pillar</Link>
                  <Link to="/blog" className="block hover:text-cyan-400">Innovation Blog</Link>
                </motion.div>
              )}
            </div>

            {/* CONTACT Section */}
            <div className="border-b border-white/20 pb-4">
              <button
                onClick={() => toggleFooterSection('contact')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">CONTACT</span>
                </div>
                {expandedFooterSection === 'contact' ? 
                  <ChevronUp className="w-5 h-5 text-red-400" /> : 
                  <ChevronDown className="w-5 h-5 text-red-400" />
                }
              </button>
              {expandedFooterSection === 'contact' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <div className="text-gray-300">Contact Us</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>support@arvipoa.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Accra, Ghana</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* CONNECT Section */}
            <div className="pb-4">
              <button
                onClick={() => toggleFooterSection('connect')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">CONNECT</span>
                </div>
                {expandedFooterSection === 'connect' ? 
                  <ChevronUp className="w-5 h-5 text-orange-400" /> : 
                  <ChevronDown className="w-5 h-5 text-orange-400" />
                }
              </button>
              {expandedFooterSection === 'connect' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7"
                >
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10">
                      <X className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      <Instagram className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                      <Youtube className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center py-8 border-t border-white/10 mt-8">
            <p className="text-gray-400 text-sm">© 2024 ARVIPOA. All rights reserved. | Property Protection & Management Platform</p>
          </div>
        </footer>
      </div>
    </div>
  );
}