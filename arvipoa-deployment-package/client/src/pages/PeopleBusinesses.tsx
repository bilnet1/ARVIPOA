import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Building, 
  Search, 
  Filter,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Award,
  Briefcase,
  UserCheck,
  Calendar,
  Clock,
  Heart,
  Share2,
  ChevronRight,
  Verified,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Person {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  specialties: string[];
  avatar: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  yearsExperience: number;
  responseTime: string;
}

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  services: string[];
  logo: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  established: number;
  employees: string;
  openHours: string;
}

export default function PeopleBusinesses() {
  const [activeTab, setActiveTab] = useState<'people' | 'businesses'>('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const people: Person[] = [
    {
      id: "1",
      name: "Dr. Kwame Asante",
      title: "Property Law Specialist",
      company: "Asante Legal Associates",
      location: "Accra, Ghana",
      rating: 4.9,
      reviews: 127,
      verified: true,
      specialties: ["Property Law", "Land Registration", "Legal Documentation"],
      avatar: "/api/placeholder/100/100",
      description: "Expert in Ghana property law with 15+ years of experience in land registration and property disputes.",
      contact: {
        phone: "+233 24 567 8901",
        email: "kwame@asantelegal.com",
        website: "asantelegal.com"
      },
      yearsExperience: 15,
      responseTime: "Within 2 hours"
    },
    {
      id: "2",
      name: "Akosua Mensah",
      title: "Real Estate Agent",
      company: "Prime Properties Ghana",
      location: "Kumasi, Ghana",
      rating: 4.8,
      reviews: 89,
      verified: true,
      specialties: ["Residential Sales", "Property Valuation", "Investment Advisory"],
      avatar: "/api/placeholder/100/100",
      description: "Top-performing real estate agent specializing in luxury residential properties and investment opportunities.",
      contact: {
        phone: "+233 24 345 6789",
        email: "akosua@primeproperties.gh"
      },
      yearsExperience: 8,
      responseTime: "Within 1 hour"
    },
    {
      id: "3",
      name: "Engineer Samuel Boateng",
      title: "Smart Technology Consultant",
      company: "ARVIPOA Tech Solutions",
      location: "Tamale, Ghana",
      rating: 5.0,
      reviews: 156,
      verified: true,
      specialties: ["Smart Pillar Installation", "IoT Systems", "Security Technology"],
      avatar: "/api/placeholder/100/100",
      description: "Certified ARVIPOA technology specialist with expertise in smart security system installations.",
      contact: {
        phone: "+233 24 789 0123",
        email: "samuel@arvipoa.com",
        website: "arvipoa.com"
      },
      yearsExperience: 12,
      responseTime: "Within 30 minutes"
    }
  ];

  const businesses: Business[] = [
    {
      id: "1",
      name: "Ghana National Land Registry",
      category: "Government Services",
      location: "Accra, Ghana",
      rating: 4.2,
      reviews: 340,
      verified: true,
      services: ["Land Registration", "Title Verification", "Property Documentation"],
      logo: "/api/placeholder/100/100",
      description: "Official government agency for land registration and property documentation services across Ghana.",
      contact: {
        phone: "+233 30 266 4621",
        email: "info@landregistry.gov.gh",
        website: "landregistry.gov.gh"
      },
      established: 1986,
      employees: "500+",
      openHours: "Mon-Fri 8:00 AM - 5:00 PM"
    },
    {
      id: "2",
      name: "SecureHome Technologies",
      category: "Security Services",
      location: "Accra, Ghana",
      rating: 4.7,
      reviews: 203,
      verified: true,
      services: ["CCTV Installation", "Alarm Systems", "Smart Security", "24/7 Monitoring"],
      logo: "/api/placeholder/100/100",
      description: "Leading security technology provider specializing in residential and commercial security solutions.",
      contact: {
        phone: "+233 24 111 2222",
        email: "info@securehome.gh",
        website: "securehome.gh"
      },
      established: 2015,
      employees: "50-100",
      openHours: "24/7 Emergency Services"
    },
    {
      id: "3",
      name: "EcoEnergy Solutions",
      category: "Renewable Energy",
      location: "Kumasi, Ghana",
      rating: 4.6,
      reviews: 178,
      verified: true,
      services: ["Solar Installation", "EV Charging Stations", "Energy Audits", "Maintenance"],
      logo: "/api/placeholder/100/100",
      description: "Sustainable energy solutions provider with focus on solar power and electric vehicle infrastructure.",
      contact: {
        phone: "+233 24 333 4444",
        email: "info@ecoenergy.gh",
        website: "ecoenergy.gh"
      },
      established: 2018,
      employees: "25-50",
      openHours: "Mon-Sat 8:00 AM - 6:00 PM"
    }
  ];

  const PersonCard = ({ person }: { person: Person }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img 
            src={person.avatar} 
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {person.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Verified className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">{person.name}</h3>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-blue-600 font-medium mb-1">{person.title}</p>
          <p className="text-gray-600 text-sm mb-2">{person.company}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {person.location}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              {person.rating} ({person.reviews})
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {person.responseTime}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{person.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {person.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Award className="w-4 h-4 mr-1" />
              {person.yearsExperience} years experience
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const BusinessCard = ({ business }: { business: Business }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img 
            src={business.logo} 
            alt={business.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          {business.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Verified className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">{business.name}</h3>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-purple-600 font-medium mb-1">{business.category}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {business.location}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              {business.rating} ({business.reviews})
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Est. {business.established}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {business.services.slice(0, 4).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {business.employees}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {business.openHours}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-1" />
                Website
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
            People & Businesses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified professionals and businesses in the ARVIPOA network. 
            Find experts, service providers, and trusted partners for your property needs.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search people, businesses, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'people' | 'businesses')}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="people" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              People ({people.length})
            </TabsTrigger>
            <TabsTrigger value="businesses" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Businesses ({businesses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-6">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </TabsContent>

          <TabsContent value="businesses" className="space-y-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">Join the ARVIPOA Network</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Are you a professional or business owner? Join our verified network and connect with property owners across Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <UserCheck className="w-4 h-4 mr-2" />
              Register as Professional
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Briefcase className="w-4 h-4 mr-2" />
              List Your Business
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}