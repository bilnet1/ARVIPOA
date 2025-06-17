import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Square, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";

// Import mockup design images
import mockup1 from "@assets/ChatGPT Image Jun 5, 2025, 09_40_46 PM.png";
import mockup2 from "@assets/ChatGPT Image Jun 5, 2025, 09_46_11 PM.png";
import mockup3 from "@assets/ChatGPT Image Jun 5, 2025, 09_55_53 PM.png";
import mockup4 from "@assets/ChatGPT Image Jun 5, 2025, 10_02_49 PM.png";
import mockup5 from "@assets/ChatGPT Image Jun 5, 2025, 10_13_46 PM.png";
import mockup6 from "@assets/ChatGPT Image Jun 5, 2025, 10_24_36 PM.png";
import mockup7 from "@assets/ChatGPT Image Jun 5, 2025, 10_33_12 PM.png";
import mockup8 from "@assets/ChatGPT Image Jun 5, 2025, 10_38_43 PM.png";
import mockup9 from "@assets/ChatGPT Image Jun 5, 2025, 10_41_09 PM.png";
import mockup10 from "@assets/ChatGPT Image Jun 5, 2025, 10_45_46 PM.png";
import mockup11 from "@assets/ChatGPT Image Jun 5, 2025, 11_11_57 PM.png";
import mockup12 from "@assets/ChatGPT Image Jun 6, 2025, 01_03_19 PM.png";
import mockup13 from "@assets/ChatGPT Image Jun 6, 2025, 01_08_23 PM.png";
import mockup14 from "@assets/ChatGPT Image Jun 6, 2025, 01_26_55 PM.png";
import mockup15 from "@assets/ChatGPT Image Jun 6, 2025, 01_57_07 PM.png";
import mockup16 from "@assets/ChatGPT Image Jun 6, 2025, 11_38_27 AM.png";
import mockup17 from "@assets/ChatGPT Image Jun 6, 2025, 11_48_21 AM.png";
import mockup18 from "@assets/ChatGPT Image Jun 6, 2025, 11_54_25 AM.png";
import mockup19 from "@assets/ChatGPT Image Jun 6, 2025, 12_24_21 PM.png";
import mockup20 from "@assets/ChatGPT Image Jun 6, 2025, 12_59_44 PM.png";

interface PropertyListing {
  id: string;
  title: string;
  images: string[];
  price: number;
  priceType: 'sale' | 'rent';
  duration?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  size: number;
  propertyType: string;
  amenities: string[];
  rules: string[];
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  datePosted: string;
  views: number;
  rating: number;
  verified: boolean;
  featured: boolean;
}

export default function PropertyAdvertisementPage() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock property data - would come from property management system
  useEffect(() => {
    const mockProperties: PropertyListing[] = [
      {
        id: '1',
        title: 'Luxury 3-Bedroom Apartment in East Legon',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
        price: 150000,
        priceType: 'sale',
        location: 'East Legon, Accra',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        size: 1200,
        propertyType: 'Apartment',
        amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Generator', 'WiFi'],
        rules: ['No Pets', 'No Smoking', 'No Loud Music After 10PM'],
        ownerName: 'Dr. Sarah Mensah',
        ownerPhone: '+233 24 123 4567',
        ownerEmail: 'sarah.mensah@email.com',
        datePosted: '2025-01-05',
        views: 245,
        rating: 4.8,
        verified: true,
        featured: true
      },
      {
        id: '2',
        title: 'Modern 4-Bedroom House for Rent in Spintex',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        price: 2500,
        priceType: 'rent',
        duration: 'Monthly',
        location: 'Spintex Road, Accra',
        bedrooms: 4,
        bathrooms: 3,
        parking: 3,
        size: 1800,
        propertyType: 'House',
        amenities: ['Garden', 'Solar Power', 'CCTV', 'Fitted Kitchen'],
        rules: ['Family Preferred', 'No Commercial Use', 'Advance Payment Required'],
        ownerName: 'Mr. Kwame Asante',
        ownerPhone: '+233 20 987 6543',
        ownerEmail: 'kwame.asante@email.com',
        datePosted: '2025-01-04',
        views: 189,
        rating: 4.6,
        verified: true,
        featured: false
      },
      {
        id: '3',
        title: 'Executive Studio Apartment in Airport Residential',
        images: ['/api/placeholder/400/300'],
        price: 1200,
        priceType: 'rent',
        duration: 'Monthly',
        location: 'Airport Residential, Accra',
        bedrooms: 1,
        bathrooms: 1,
        parking: 1,
        size: 500,
        propertyType: 'Studio',
        amenities: ['Air Conditioning', 'Furnished', 'High-Speed Internet'],
        rules: ['Professional Tenants Only', 'No Parties', '6-Month Minimum'],
        ownerName: 'Mrs. Ama Osei',
        ownerPhone: '+233 26 555 1234',
        ownerEmail: 'ama.osei@email.com',
        datePosted: '2025-01-03',
        views: 92,
        rating: 4.4,
        verified: false,
        featured: false
      }
    ];
    
    setProperties(mockProperties);
  }, []);

  // Auto-slide for featured properties
  useEffect(() => {
    const featuredProperties = properties.filter(p => p.featured);
    if (featuredProperties.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [properties]);

  const filteredProperties = properties.filter(property => {
    const matchesType = filterType === 'all' || property.priceType === filterType;
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const featuredProperties = properties.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-blue-500/30 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">ARVIPOA Property Marketplace</h1>
          <p className="text-gray-300">Discover verified properties from trusted owners</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Featured Properties Slider */}
        {featuredProperties.length > 0 && (
          <Card className="bg-slate-800/50 border-blue-500/30 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Star className="w-6 h-6 mr-2 fill-current" />
                Featured Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
                  {featuredProperties[currentSlide] && (
                    <div className="w-full h-full relative">
                      <img 
                        src={featuredProperties[currentSlide].images[0]} 
                        alt={featuredProperties[currentSlide].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/800/400';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {featuredProperties[currentSlide].title}
                            </h3>
                            <div className="flex items-center space-x-4 text-gray-200 mb-3">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {featuredProperties[currentSlide].location}
                              </span>
                              <span className="flex items-center">
                                <Bed className="w-4 h-4 mr-1" />
                                {featuredProperties[currentSlide].bedrooms} Beds
                              </span>
                              <span className="flex items-center">
                                <Bath className="w-4 h-4 mr-1" />
                                {featuredProperties[currentSlide].bathrooms} Baths
                              </span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-400">
                              ${featuredProperties[currentSlide].price.toLocaleString()}
                              {featuredProperties[currentSlide].priceType === 'rent' && 
                                <span className="text-lg text-gray-300">/{featuredProperties[currentSlide].duration}</span>
                              }
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                              View Details
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                              <Phone className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Slider Controls */}
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProperties.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredProperties.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterType('all')}
                  className={filterType === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300'}
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'sale' ? 'default' : 'outline'}
                  onClick={() => setFilterType('sale')}
                  className={filterType === 'sale' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300'}
                >
                  For Sale
                </Button>
                <Button
                  variant={filterType === 'rent' ? 'default' : 'outline'}
                  onClick={() => setFilterType('rent')}
                  className={filterType === 'rent' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300'}
                >
                  For Rent
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-colors">
              <div className="relative">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400/200';
                  }}
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  {property.featured && (
                    <Badge className="bg-yellow-500 text-black">Featured</Badge>
                  )}
                  {property.verified && (
                    <Badge className="bg-green-600 text-white">Verified</Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge className={`${property.priceType === 'sale' ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                    For {property.priceType === 'sale' ? 'Sale' : 'Rent'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </span>
                    <span className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      {property.parking}
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.size}ft²
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    ${property.price.toLocaleString()}
                    {property.priceType === 'rent' && 
                      <span className="text-sm text-gray-400">/{property.duration}</span>
                    }
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{property.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Owner:</span>
                    <span className="text-white">{property.ownerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      Views:
                    </span>
                    <span className="text-white">{property.views}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Posted:
                    </span>
                    <span className="text-white">{new Date(property.datePosted).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedProperty(property)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property Details Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedProperty.title}</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedProperty(null)}
                    className="border-gray-600 text-gray-300"
                  >
                    Close
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedProperty.images[0]} 
                      alt={selectedProperty.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/400/300';
                      }}
                    />
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProperty.amenities.map((amenity, index) => (
                            <Badge key={index} className="bg-blue-600 text-white">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Property Rules</h3>
                        <ul className="space-y-1">
                          {selectedProperty.rules.map((rule, index) => (
                            <li key={index} className="text-gray-300 text-sm">• {rule}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-3xl font-bold text-yellow-400">
                      ${selectedProperty.price.toLocaleString()}
                      {selectedProperty.priceType === 'rent' && 
                        <span className="text-lg text-gray-400">/{selectedProperty.duration}</span>
                      }
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-white">{selectedProperty.bedrooms}</div>
                        <div className="text-gray-400">Bedrooms</div>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-white">{selectedProperty.bathrooms}</div>
                        <div className="text-gray-400">Bathrooms</div>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-white">{selectedProperty.parking}</div>
                        <div className="text-gray-400">Parking</div>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-white">{selectedProperty.size}</div>
                        <div className="text-gray-400">sq ft</div>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">Owner Contact</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-300">
                          <Phone className="w-4 h-4 mr-2" />
                          {selectedProperty.ownerPhone}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-2" />
                          {selectedProperty.ownerEmail}
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Owner
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Design Showcase */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">Property Registration Interface Designs</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our advanced property registration mockup designs featuring intuitive user interfaces 
              and comprehensive form layouts for seamless property management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: mockup1, title: "Property Registration Form", description: "Comprehensive property details input" },
              { image: mockup2, title: "Owner Information Interface", description: "Owner verification and documentation" },
              { image: mockup3, title: "Property Location Mapping", description: "Interactive location selection tool" },
              { image: mockup4, title: "Document Upload Portal", description: "Secure document management system" },
              { image: mockup5, title: "Property Verification Dashboard", description: "Real-time verification status tracking" },
              { image: mockup6, title: "Payment Processing Interface", description: "Secure payment gateway integration" },
              { image: mockup7, title: "Property Search & Filter", description: "Advanced search functionality" },
              { image: mockup8, title: "Mobile Registration App", description: "Responsive mobile interface design" },
              { image: mockup9, title: "Property Analytics Dashboard", description: "Data visualization and insights" },
              { image: mockup10, title: "User Profile Management", description: "Comprehensive user account control" },
              { image: mockup11, title: "Property Listing Gallery", description: "Visual property showcase interface" },
              { image: mockup12, title: "Legal Documentation Portal", description: "Legal form management system" },
              { image: mockup13, title: "Property Valuation Interface", description: "AI-powered property assessment" },
              { image: mockup14, title: "Communication Hub", description: "Integrated messaging platform" },
              { image: mockup15, title: "Property History Tracker", description: "Complete ownership timeline" },
              { image: mockup16, title: "Smart Contract Interface", description: "Blockchain integration dashboard" },
              { image: mockup17, title: "Property Insurance Portal", description: "Insurance management system" },
              { image: mockup18, title: "Maintenance Request System", description: "Property maintenance workflow" },
              { image: mockup19, title: "Financial Management Dashboard", description: "Property finance tracking" },
              { image: mockup20, title: "Report Generation Tool", description: "Automated reporting system" }
            ].map((design, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#D4AF37] mb-1">{design.title}</h3>
                  <p className="text-gray-300 text-xs">{design.description}</p>
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
                Advanced Property Registration Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>AI-Powered Form Validation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Real-time Document Verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Blockchain Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Mobile-First Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Multi-language Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}