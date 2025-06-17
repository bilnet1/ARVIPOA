import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Camera, 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Maximize,
  Eye,
  Info,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Shield,
  Zap,
  Droplets,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  features: string[];
  rating: number;
  views: number;
  description: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  images: string[];
  virtualTour: string;
}

export default function VirtualPropertyTour() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'tour'>('grid');
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Smart Villa with ARVIPOA Security",
      location: "Accra, Ghana",
      price: "GH₵ 850,000",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      parking: 2,
      features: ["Smart Pillar Security", "Solar Power", "EV Charging", "Water Management", "IoT Connected"],
      rating: 4.8,
      views: 1247,
      description: "Modern luxury villa equipped with ARVIPOA Smart Pillar technology for complete security and environmental management.",
      agent: {
        name: "Sarah Mensah",
        phone: "+233 24 567 8901",
        email: "sarah@arvipoa.com"
      },
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ],
      virtualTour: "/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4"
    },
    {
      id: "2",
      title: "Eco-Friendly Apartment Complex",
      location: "Kumasi, Ghana",
      price: "GH₵ 280,000",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      parking: 1,
      features: ["Solar Charging", "Water Recycling", "Smart Monitoring", "Green Building"],
      rating: 4.6,
      views: 892,
      description: "Sustainable living space with integrated renewable energy and smart environmental controls.",
      agent: {
        name: "Kwame Asante",
        phone: "+233 24 345 6789",
        email: "kwame@arvipoa.com"
      },
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ],
      virtualTour: "/assets/Gen-4 Turbo  4006709044.mp4"
    },
    {
      id: "3",
      title: "Commercial Smart Building",
      location: "Tamale, Ghana",
      price: "GH₵ 1,200,000",
      type: "Commercial",
      bedrooms: 0,
      bathrooms: 8,
      area: 850,
      parking: 20,
      features: ["Multi-Pillar Security", "EV Charging Station", "Advanced CCTV", "Air Support Ready"],
      rating: 4.9,
      views: 2156,
      description: "State-of-the-art commercial facility with comprehensive ARVIPOA security infrastructure.",
      agent: {
        name: "Akosua Boateng",
        phone: "+233 24 789 0123",
        email: "akosua@arvipoa.com"
      },
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ],
      virtualTour: "/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4"
    }
  ];

  const toggleFavorite = (propertyId: string) => {
    setFavoriteProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {property.type}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white"
            onClick={() => toggleFavorite(property.id)}
          >
            <Heart 
              className={`w-4 h-4 ${
                favoriteProperties.includes(property.id) 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600'
              }`} 
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 text-sm"
            onClick={() => {
              setSelectedProperty(property);
              setViewMode('tour');
            }}
          >
            <Play className="w-3 h-3 mr-1" />
            Virtual Tour
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{property.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="text-2xl font-bold text-blue-600 mb-3">{property.price}</div>

        <div className="grid grid-cols-4 gap-2 mb-3 text-sm text-gray-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.area}m²</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-1" />
            <span>{property.parking}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {property.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="w-4 h-4 mr-1" />
            <span>{property.views} views</span>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-1" />
              Details
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const VirtualTourViewer = ({ property }: { property: Property }) => (
    <div className="bg-black rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">Virtual Tour: {property.title}</h3>
          <p className="text-gray-400 mb-4">360° Interactive Property Experience</p>
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause' : 'Play'} Tour
            </Button>
          </div>
        </div>

        {/* Tour Controls */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Property Info Overlay */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="text-sm font-semibold">{property.location}</div>
          <div className="text-lg font-bold">{property.price}</div>
        </div>
      </div>

      {/* Tour Navigation */}
      <div className="p-4 bg-gray-900 text-white">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Tour Sections</h4>
          <Button
            variant="ghost"
            size="sm"
            className="text-white"
            onClick={() => setViewMode('grid')}
          >
            Back to Gallery
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Living Room', 'Kitchen', 'Bedrooms', 'Bathrooms', 'Garden', 'Security Systems'].map((section, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-left justify-start text-white hover:bg-white/20"
            >
              {section}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Property Tours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore properties with immersive 360° virtual tours powered by ARVIPOA technology. 
            Experience homes and commercial spaces from the comfort of your current location.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
            >
              <Building className="w-4 h-4 mr-2" />
              Property Gallery
            </Button>
            <Button
              variant={viewMode === 'tour' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tour')}
              className={viewMode === 'tour' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
              disabled={!selectedProperty}
            >
              <Camera className="w-4 h-4 mr-2" />
              Virtual Tour
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : selectedProperty && (
          <div className="max-w-5xl mx-auto">
            <VirtualTourViewer property={selectedProperty} />
            
            {/* Property Details */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{selectedProperty.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedProperty.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Bed className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedProperty.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedProperty.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedProperty.area} m²</span>
                      </div>
                      <div className="flex items-center">
                        <Car className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedProperty.parking} Parking</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Contact Agent</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{selectedProperty.agent.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{selectedProperty.agent.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{selectedProperty.agent.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}