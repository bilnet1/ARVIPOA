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
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Import assets
import arviPoaNetflix1 from "@assets/ARVIPOA FREE NETFLIX.png";
import arviPoaNetflix2 from "@assets/ARVIPOA FREE NETFLIX 2.png";
import arviPoaNetflix3 from "@assets/ARVIPOA FREE NETFLIX  3.png";

export default function SimpleHomepage() {
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  
  // Force cache refresh
  console.log("SimpleHomepage loaded - Version 2024.06.08.17:15");

  const regions = [
    "Greater Accra", "Ashanti", "Northern", "Western", "Central", "Eastern",
    "Volta", "Brong-Ahafo", "Upper East", "Upper West", "Western North",
    "Ahafo", "Bono East", "North East", "Savannah", "Oti"
  ];

  const peopleYouMayKnow = [
    { name: "Kwame Asante", type: "Property Owner", location: "East Legon", avatar: "👨‍💼" },
    { name: "Ama Sarpong", type: "Business Owner", location: "Osu", avatar: "👩‍💼" },
    { name: "Kojo Mensah", type: "Developer", location: "Airport City", avatar: "👨‍💻" },
    { name: "Efua Owusu", type: "Contractor", location: "Tema", avatar: "👷‍♀️" },
    { name: "Kofi Boateng", type: "Agent", location: "Kumasi", avatar: "🏠" },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
      color: "white"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        
        {/* Hero Search Section */}
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Input 
              placeholder="Search properties, services, or locations..." 
              className="max-w-md bg-white/10 border-white/30 text-white placeholder-gray-300"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  Search by Location
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700 text-white max-h-60 overflow-y-auto">
                {regions.map((region, index) => (
                  <DropdownMenuItem key={index} className="hover:bg-slate-800">
                    <MapPin className="w-4 h-4 mr-2" />
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showPeopleModal} onOpenChange={setShowPeopleModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Users className="w-4 h-4 mr-2" />
                  People & Businesses
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>People & Businesses You May Know</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {peopleYouMayKnow.map((person, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                      <div className="text-2xl">{person.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-gray-400">{person.type} • {person.location}</div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to ARVIPOA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Africa's Revolutionary Property Management & Protection Platform
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Secure your assets with blockchain technology, AI-powered verification, and IoT monitoring systems
          </p>
        </div>

        {/* Platform Features Grid - Reduced Size */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Smart Security</h4>
              <p className="text-gray-300 text-xs">IoT monitoring & AI detection</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Building2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Property Management</h4>
              <p className="text-gray-300 text-xs">Registration & solutions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Community Engagement</h4>
              <p className="text-gray-300 text-xs">Social & live streaming</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Digital Platform</h4>
              <p className="text-gray-300 text-xs">Complete ecosystem</p>
            </CardContent>
          </Card>
        </div>

        {/* Large Animated Blog Modal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* ARVIPOA Services & Local Stores Modal */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-white/20 overflow-hidden group">
            <CardContent className="p-0 relative h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              
              {/* Swivel Animation Content */}
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-6 transform group-hover:rotate-y-12 transition-all duration-700 animate-pulse">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Store className="w-8 h-8 text-orange-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Local Stores</h5>
                      <p className="text-gray-300 text-xs">Fresh products daily</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Briefcase className="w-8 h-8 text-blue-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">ARVIPOA Services</h5>
                      <p className="text-gray-300 text-xs">Professional solutions</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <ShoppingCart className="w-8 h-8 text-green-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Community</h5>
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

          {/* Property Listings & News Modal */}
          <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm border-white/20 overflow-hidden group">
            <CardContent className="p-0 relative h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20"></div>
              
              {/* Swivel Animation Content */}
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-6 transform group-hover:-rotate-y-12 transition-all duration-700 animate-bounce">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <Home className="w-8 h-8 text-blue-400 mb-2" />
                      <h5 className="text-white font-semibold text-sm">Property Listings</h5>
                      <p className="text-gray-300 text-xs">Find your dream home</p>
                    </div>
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

        {/* Horizontal Scrolling Media Section */}
        <div className="mb-16 overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Content</h3>
          <div className="relative">
            <div className="flex animate-scroll space-x-6">
              {/* ARVIMEDIA Netflix Streaming Content */}
              {[
                { image: arviPoaNetflix1, title: 'ARVIMEDIA Free Streaming', description: 'Netflix, Amazon Prime & YouTube Extra access' },
                { image: arviPoaNetflix2, title: 'Ghanaian Subtitles', description: 'Content subtitled in local languages' },
                { image: arviPoaNetflix3, title: 'Premium Entertainment', description: 'HD quality streaming for ARVIPOA members' },
                { image: arviPoaNetflix1, title: 'Multi-Platform Access', description: 'Watch on any device, anywhere' },
                { image: arviPoaNetflix2, title: 'Family Friendly', description: 'Content for all ages and preferences' },
                { image: arviPoaNetflix3, title: 'Live Events', description: 'Exclusive live streams and premieres' }
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
                          <Link to="/arvimedia">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                              Watch Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                      <div className="mt-3 text-center">
                        <span className="text-yellow-400 text-xs font-bold bg-yellow-400/20 px-2 py-1 rounded">
                          FREE FOR ARVIPOA MEMBERS
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mb-16">
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-white/20">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Future?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of property owners who trust ARVIPOA for comprehensive security and management solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/arvimedia">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                    Watch ARVIMEDIA
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2024 ARVIPOA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}