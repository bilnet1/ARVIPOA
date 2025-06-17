import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Pill, 
  Video, 
  Phone, 
  Truck, 
  Package,
  User,
  Heart,
  Shield,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  Eye,
  Camera,
  MessageCircle,
  Stethoscope,
  FileText,
  CreditCard,
  CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';
import GoogleMap from '@/components/GoogleMap';

interface PharmacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  dosage: string;
  quantity: number;
  inStock: boolean;
  requiresPrescription: boolean;
  expiryDate: string;
  manufacturer: string;
  image: string;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyLocation: string;
  pharmacyRating: number;
  deliveryTime: string;
}

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  totalReviews: number;
  deliveryTime: string;
  operatingHours: string;
  coordinates: { lat: number; lng: number };
  verified: boolean;
  services: string[];
  specialties: string[];
}

interface InstantConsultation {
  id: string;
  practitionerId: string;
  practitionerName: string;
  specialty: string;
  rating: number;
  price: number;
  availableNow: boolean;
  nextAvailable: string;
  profileImage: string;
  yearsExperience: number;
}

export default function PharmacyMarketplace() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('all');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<InstantConsultation | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [products] = useState<PharmacyProduct[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Pain relief and fever reducer tablets',
      price: 15.50,
      category: 'Pain Relief',
      brand: 'Panadol',
      dosage: '500mg',
      quantity: 20,
      inStock: true,
      requiresPrescription: false,
      expiryDate: '2025-12-31',
      manufacturer: 'GSK',
      image: '/api/placeholder/150/150',
      pharmacyId: '1',
      pharmacyName: 'HealthCare Pharmacy',
      pharmacyLocation: 'East Legon, Accra',
      pharmacyRating: 4.8,
      deliveryTime: '30 minutes'
    },
    {
      id: '2',
      name: 'Lisinopril 10mg',
      description: 'ACE inhibitor for hypertension treatment',
      price: 45.00,
      category: 'Cardiovascular',
      brand: 'Prinivil',
      dosage: '10mg',
      quantity: 30,
      inStock: true,
      requiresPrescription: true,
      expiryDate: '2025-08-15',
      manufacturer: 'Merck',
      image: '/api/placeholder/150/150',
      pharmacyId: '1',
      pharmacyName: 'HealthCare Pharmacy',
      pharmacyLocation: 'East Legon, Accra',
      pharmacyRating: 4.8,
      deliveryTime: '30 minutes'
    },
    {
      id: '3',
      name: 'Vitamin D3 2000IU',
      description: 'Bone health and immune support supplement',
      price: 35.00,
      category: 'Supplements',
      brand: 'Nature Made',
      dosage: '2000IU',
      quantity: 60,
      inStock: true,
      requiresPrescription: false,
      expiryDate: '2026-03-20',
      manufacturer: 'Pharmavite',
      image: '/api/placeholder/150/150',
      pharmacyId: '2',
      pharmacyName: 'Pharmacy Plus',
      pharmacyLocation: 'Tema, Greater Accra',
      pharmacyRating: 4.6,
      deliveryTime: '45 minutes'
    },
    {
      id: '4',
      name: 'Metformin 500mg',
      description: 'Type 2 diabetes medication',
      price: 28.75,
      category: 'Diabetes',
      brand: 'Glucophage',
      dosage: '500mg',
      quantity: 60,
      inStock: true,
      requiresPrescription: true,
      expiryDate: '2025-10-10',
      manufacturer: 'Bristol Myers Squibb',
      image: '/api/placeholder/150/150',
      pharmacyId: '3',
      pharmacyName: 'MediCore Pharmacy',
      pharmacyLocation: 'Kumasi',
      pharmacyRating: 4.9,
      deliveryTime: '25 minutes'
    },
    {
      id: '5',
      name: 'Omega-3 Fish Oil',
      description: 'Heart and brain health supplement',
      price: 42.00,
      category: 'Supplements',
      brand: 'Nordic Naturals',
      dosage: '1000mg',
      quantity: 90,
      inStock: true,
      requiresPrescription: false,
      expiryDate: '2025-07-30',
      manufacturer: 'Nordic Naturals',
      image: '/api/placeholder/150/150',
      pharmacyId: '4',
      pharmacyName: 'WellCare Drugs',
      pharmacyLocation: 'Takoradi',
      pharmacyRating: 4.7,
      deliveryTime: '35 minutes'
    },
    {
      id: '6',
      name: 'Amoxicillin 500mg',
      description: 'Antibiotic for bacterial infections',
      price: 38.50,
      category: 'Antibiotics',
      brand: 'Amoxil',
      dosage: '500mg',
      quantity: 21,
      inStock: false,
      requiresPrescription: true,
      expiryDate: '2025-06-15',
      manufacturer: 'GSK',
      image: '/api/placeholder/150/150',
      pharmacyId: '1',
      pharmacyName: 'HealthCare Pharmacy',
      pharmacyLocation: 'East Legon, Accra',
      pharmacyRating: 4.8,
      deliveryTime: '30 minutes'
    }
  ]);

  const [pharmacies] = useState<Pharmacy[]>([
    {
      id: '1',
      name: 'HealthCare Pharmacy',
      address: 'Liberation Road, East Legon, Accra',
      phone: '+233 24 123 4567',
      email: 'info@healthcarepharmacy.com',
      rating: 4.8,
      totalReviews: 342,
      deliveryTime: '20-35 minutes',
      operatingHours: '24/7',
      coordinates: { lat: 5.6508, lng: -0.1467 },
      verified: true,
      services: ['Home Delivery', 'Online Consultation', 'Prescription Refill', 'Health Screening'],
      specialties: ['General Medicine', 'Chronic Disease Management', 'Pediatrics']
    },
    {
      id: '2',
      name: 'Pharmacy Plus',
      address: 'Tema Station Road, Tema',
      phone: '+233 30 234 5678',
      email: 'contact@pharmacyplus.gh',
      rating: 4.6,
      totalReviews: 198,
      deliveryTime: '30-50 minutes',
      operatingHours: '6:00 AM - 10:00 PM',
      coordinates: { lat: 5.6698, lng: -0.0177 },
      verified: true,
      services: ['Home Delivery', 'Prescription Refill', 'Health Consultation'],
      specialties: ['Diabetes Care', 'Cardiovascular Health', 'Women\'s Health']
    },
    {
      id: '3',
      name: 'MediCore Pharmacy',
      address: 'Kejetia Market Area, Kumasi',
      phone: '+233 32 345 6789',
      email: 'support@medicore.com',
      rating: 4.9,
      totalReviews: 567,
      deliveryTime: '15-30 minutes',
      operatingHours: '7:00 AM - 9:00 PM',
      coordinates: { lat: 6.6885, lng: -1.6244 },
      verified: true,
      services: ['Express Delivery', 'Online Consultation', 'Medical Equipment', 'Laboratory Services'],
      specialties: ['Emergency Medicine', 'Infectious Diseases', 'Mental Health']
    },
    {
      id: '4',
      name: 'WellCare Drugs',
      address: 'Market Circle, Takoradi',
      phone: '+233 31 456 7890',
      email: 'info@wellcaredrugs.gh',
      rating: 4.7,
      totalReviews: 289,
      deliveryTime: '25-40 minutes',
      operatingHours: '8:00 AM - 8:00 PM',
      coordinates: { lat: 4.8845, lng: -1.7554 },
      verified: true,
      services: ['Home Delivery', 'Prescription Refill', 'Health Screening'],
      specialties: ['Geriatric Care', 'Pain Management', 'Respiratory Health']
    }
  ]);

  const [instantConsultants] = useState<InstantConsultation[]>([
    {
      id: '1',
      practitionerId: 'doc1',
      practitionerName: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      price: 150,
      availableNow: true,
      nextAvailable: '',
      profileImage: '/api/placeholder/64/64',
      yearsExperience: 8
    },
    {
      id: '2',
      practitionerId: 'doc2',
      practitionerName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.8,
      price: 200,
      availableNow: true,
      nextAvailable: '',
      profileImage: '/api/placeholder/64/64',
      yearsExperience: 12
    },
    {
      id: '3',
      practitionerId: 'doc3',
      practitionerName: 'Dr. Aisha Mensah',
      specialty: 'Pharmacy Consultation',
      rating: 4.9,
      price: 100,
      availableNow: false,
      nextAvailable: 'Available in 30 minutes',
      profileImage: '/api/placeholder/64/64',
      yearsExperience: 6
    }
  ]);

  const categories = ['All', 'Pain Relief', 'Cardiovascular', 'Supplements', 'Diabetes', 'Antibiotics', 'Vitamins', 'Mental Health'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPharmacy = selectedPharmacy === 'all' || product.pharmacyId === selectedPharmacy;
    
    return matchesSearch && matchesCategory && matchesPharmacy;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const startInstantConsultation = async (consultant: InstantConsultation) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      setSelectedConsultant(consultant);
      setIsVideoCallActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera for video consultation. Please check permissions.');
    }
  };

  const endConsultation = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsVideoCallActive(false);
    setSelectedConsultant(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ARVIPOA Pharmacy Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Authentic medications, instant consultations, and verified pharmacies
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="consultation">Instant Consultation</TabsTrigger>
            <TabsTrigger value="cart">Cart ({Object.keys(cart).length})</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search medications, supplements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pharmacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pharmacies</SelectItem>
                      {pharmacies.map((pharmacy) => (
                        <SelectItem key={pharmacy.id} value={pharmacy.id}>
                          {pharmacy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className={`relative ${!product.inStock ? 'opacity-60' : ''}`}>
                  {product.requiresPrescription && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Prescription Required
                    </Badge>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                      <Pill className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dosage:</span>
                        <span className="font-medium">{product.dosage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Quantity:</span>
                        <span className="font-medium">{product.quantity} tablets</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-bold text-green-600">
                        ₵{product.price}
                      </div>
                      <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {product.pharmacyName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {product.deliveryTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {product.pharmacyRating}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {cart[product.id] ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold">{cart[product.id]}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => addToCart(product.id)}
                            disabled={!product.inStock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="flex-1" 
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pharmacies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pharmacy List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Verified Pharmacies</h3>
                {pharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold flex items-center gap-2">
                            {pharmacy.name}
                            {pharmacy.verified && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {pharmacy.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="font-semibold">{pharmacy.rating}</span>
                            <span className="text-sm text-gray-500">
                              ({pharmacy.totalReviews})
                            </span>
                          </div>
                          <p className="text-sm text-green-600">{pharmacy.deliveryTime}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Operating Hours</p>
                          <p className="font-medium">{pharmacy.operatingHours}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{pharmacy.phone}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Services</p>
                        <div className="flex flex-wrap gap-2">
                          {pharmacy.services.map((service, index) => (
                            <Badge key={index} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {pharmacy.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Shop Now
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline">
                          <MapPin className="h-4 w-4 mr-2" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Map */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Pharmacy Locations</h3>
                <GoogleMap
                  height="600px"
                  center={{ lat: 5.6037, lng: -0.1870 }}
                  zoom={10}
                  markers={pharmacies.map(pharmacy => ({
                    id: pharmacy.id,
                    position: pharmacy.coordinates,
                    title: pharmacy.name,
                    type: 'alert',
                    status: 'online',
                    info: {
                      location: pharmacy.address,
                      owner: pharmacy.name,
                      lastUpdate: 'Now open',
                      alerts: [`Rating: ${pharmacy.rating}⭐`, `Delivery: ${pharmacy.deliveryTime}`]
                    }
                  }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="consultation" className="space-y-6">
            {isVideoCallActive ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Live Consultation with {selectedConsultant?.practitionerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-96 bg-black rounded-lg"
                    />
                    
                    {/* Doctor's Video Window */}
                    <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white">
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <User className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">{selectedConsultant?.practitionerName}</p>
                          <p className="text-xs">{selectedConsultant?.specialty}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Control Panel */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={endConsultation}>
                        End Consultation
                      </Button>
                    </div>
                  </div>
                  
                  {/* Consultation Info */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Session Details</h4>
                        <p className="text-sm">Duration: 00:05:23</p>
                        <p className="text-sm">Type: Pharmacy Consultation</p>
                        <p className="text-sm">Fee: ₵{selectedConsultant?.price}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Request Prescription
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Follow-up
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Notes</h4>
                        <Textarea 
                          placeholder="Add consultation notes..."
                          className="min-h-[80px]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Instant Health Consultations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Connect with verified healthcare professionals for immediate consultation and prescription guidance.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {instantConsultants.map((consultant) => (
                        <Card key={consultant.id} className="relative">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{consultant.practitionerName}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {consultant.specialty}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {consultant.yearsExperience} years experience
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span className="text-sm">Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400" />
                                  <span className="text-sm font-medium">{consultant.rating}</span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Consultation Fee:</span>
                                <span className="font-semibold text-green-600">₵{consultant.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Availability:</span>
                                <Badge variant={consultant.availableNow ? 'default' : 'secondary'}>
                                  {consultant.availableNow ? 'Available Now' : consultant.nextAvailable}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1"
                                onClick={() => startInstantConsultation(consultant)}
                                disabled={!consultant.availableNow}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Video Call
                              </Button>
                              <Button variant="outline" disabled={!consultant.availableNow}>
                                <Phone className="h-4 w-4 mr-2" />
                                Audio
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Browse our pharmacy products to add items to your cart
                    </p>
                    <Button onClick={() => setActiveTab('products')}>
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cart).map(([productId, quantity]) => {
                      const product = products.find(p => p.id === productId);
                      if (!product) return null;
                      
                      return (
                        <div key={productId} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                              <Pill className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {product.brand} - {product.dosage}
                              </p>
                              <p className="text-sm text-gray-500">{product.pharmacyName}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => removeFromCart(productId)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-semibold w-8 text-center">{quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => addToCart(productId)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold">₵{(product.price * quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">₵{product.price} each</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                          ₵{getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Consult Pharmacist
                        </Button>
                        <Button className="flex-1">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 'ORD-001',
                      date: '2024-01-20',
                      items: 3,
                      total: 89.25,
                      status: 'Delivered',
                      pharmacy: 'HealthCare Pharmacy'
                    },
                    {
                      id: 'ORD-002',
                      date: '2024-01-18',
                      items: 1,
                      total: 35.00,
                      status: 'In Transit',
                      pharmacy: 'Pharmacy Plus'
                    },
                    {
                      id: 'ORD-003',
                      date: '2024-01-15',
                      items: 2,
                      total: 67.50,
                      status: 'Processing',
                      pharmacy: 'MediCore Pharmacy'
                    }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.date} • {order.items} items • {order.pharmacy}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">₵{order.total}</p>
                        <Badge variant={
                          order.status === 'Delivered' ? 'default' :
                          order.status === 'In Transit' ? 'secondary' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {order.status === 'In Transit' && (
                          <Button size="sm">
                            <Truck className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}