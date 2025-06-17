import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import GoogleMap from '@/components/GoogleMap';
import DigitalSignature from '@/components/DigitalSignature';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Home, 
  Building, 
  Zap, 
  Droplets, 
  Wifi, 
  Shield, 
  Camera, 
  QrCode, 
  Upload, 
  Scan, 
  FileText, 
  Check, 
  AlertTriangle, 
  Globe, 
  Satellite, 
  Map,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Archive,
  Ruler,
  Palette,
  Eye,
  Lock,
  Key,
  Smartphone,
  Video,
  Image,
  Download,
  Share,
  Save,
  RotateCcw,
  CheckCircle,
  Clock,
  User,
  Building2,
  TreePine,
  Car,
  Waves,
  Flame,
  Gauge,
  Receipt,
  Phone,
  Mail,
  FileCheck,
  Award,
  Briefcase,
  Target,
  Cpu,
  Lightbulb,
  Rocket,
  ShieldCheck
} from 'lucide-react';

interface PropertyData {
  landData: {
    address: string;
    houseNumber: string;
    locality: string;
    town: string;
    district: string;
    region: string;
    digitalAddress: string;
    longitude: string;
    latitude: string;
    pmbNumber: string;
    sitePlanNumber: string;
    landSize: string;
    usageCategory: string;
    usagePurpose: string;
    rules: string[];
  };
  buildingData: {
    permitNumber: string;
    floors: number;
    rooms: number;
    buildingStatus: string;
    exteriorColor: string;
    interiorColor: string;
    utilities: {
      electricity: string;
      water: string;
      gas: string;
      internet: string;
      sanitation: string;
      security: string;
    };
    architect: {
      name: string;
      id: string;
      email: string;
      phone: string;
    };
  };
  rooms: Array<{
    id: string;
    name: string;
    floor: string;
    digitalAddress: string;
    size: string;
    color: string;
    floorType: string;
    roofType: string;
    ceilingType: string;
    facilities: string[];
  }>;
}

export default function PropertyRegistrationPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState('land');
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState<PropertyData>({
    landData: {
      address: '',
      houseNumber: '',
      locality: '',
      town: '',
      district: '',
      region: '',
      digitalAddress: '',
      longitude: '',
      latitude: '',
      pmbNumber: '',
      sitePlanNumber: '',
      landSize: '',
      usageCategory: '',
      usagePurpose: '',
      rules: []
    },
    buildingData: {
      permitNumber: '',
      floors: 1,
      rooms: 1,
      buildingStatus: '',
      exteriorColor: '',
      interiorColor: '',
      utilities: {
        electricity: '',
        water: '',
        gas: '',
        internet: '',
        sanitation: '',
        security: ''
      },
      architect: {
        name: '',
        id: '',
        email: '',
        phone: ''
      }
    },
    rooms: []
  });

  const [isOCRProcessing, setIsOCRProcessing] = useState(false);
  const [ocrProgress, setOCRProgress] = useState(0);
  const [mapMode, setMapMode] = useState<'map' | 'terrain' | 'satellite'>('satellite');
  const [coordinatesFromMap, setCoordinatesFromMap] = useState<{lat: number, lng: number} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ghana regions and districts data
  const ghanaData = {
    regions: [
      'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 'Northern',
      'Upper East', 'Upper West', 'Volta', 'Brong-Ahafo', 'Western North',
      'Savannah', 'North East', 'Ahafo', 'Bono', 'Oti'
    ],
    districts: {
      'Greater Accra': ['Accra Metropolitan', 'Tema Metropolitan', 'Ga West', 'Ga East', 'Ga Central'],
      'Ashanti': ['Kumasi Metropolitan', 'Obuasi Municipal', 'Ejisu Municipal', 'Asante Akim Central'],
      // Add more districts as needed
    }
  };

  // Simulate OCR processing for site plan
  const processOCR = async (file: File) => {
    setIsOCRProcessing(true);
    setOCRProgress(0);

    // Simulate OCR processing
    const interval = setInterval(() => {
      setOCRProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOCRProcessing(false);
          
          // Simulate extracted data from site plan
          setPropertyData(prev => ({
            ...prev,
            landData: {
              ...prev.landData,
              sitePlanNumber: 'SP-2024-001',
              landSize: '100ft x 80ft',
              locality: 'East Legon',
              digitalAddress: 'GM-456-7890'
            }
          }));
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Generate digital address using Ghana GPS
  const generateDigitalAddress = () => {
    // Simulate Ghana GPS API call
    const mockAddress = `GM-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`;
    const mockLat = 5.6037 + (Math.random() - 0.5) * 0.1;
    const mockLng = -0.1870 + (Math.random() - 0.5) * 0.1;
    
    setPropertyData(prev => ({
      ...prev,
      landData: {
        ...prev.landData,
        digitalAddress: mockAddress,
        latitude: mockLat.toFixed(6),
        longitude: mockLng.toFixed(6)
      }
    }));
  };

  // QR Code scanning simulation
  const scanQRCode = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // Simulate QR scan after 3 seconds
      setTimeout(() => {
        const mockQRData = `SITE-PLAN-${Date.now()}`;
        setPropertyData(prev => ({
          ...prev,
          landData: {
            ...prev.landData,
            sitePlanNumber: mockQRData
          }
        }));
        
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }, 3000);
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  // Add room to building
  const addRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: '',
      floor: '1',
      digitalAddress: '',
      size: '',
      color: '',
      floorType: '',
      roofType: '',
      ceilingType: '',
      facilities: []
    };
    
    setPropertyData(prev => ({
      ...prev,
      rooms: [...prev.rooms, newRoom]
    }));
  };

  // Property type categories
  const propertyTypes = [
    { id: 'land', name: 'Land', icon: TreePine, description: 'Register bare land or plots' },
    { id: 'building', name: 'Building', icon: Building, description: 'Residential and commercial buildings' },
    { id: 'auto', name: 'Auto/Machines', icon: Car, description: 'Vehicles and machinery' },
    { id: 'arms', name: 'Arms', icon: Target, description: 'Licensed weapons and security equipment' },
    { id: 'livestock', name: 'Livestock/Pets', icon: Users, description: 'Animals and livestock' },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, description: 'Electronic devices and equipment' },
    { id: 'intellectual', name: 'Intellectual Property', icon: Award, description: 'Patents, trademarks, copyrights' },
    { id: 'domain', name: 'Domain Names', icon: Globe, description: 'Digital domains and web properties' }
  ];

  // Usage categories and purposes
  const usageCategories = [
    { id: 'domestic', name: 'Domestic/Residential', description: 'Personal and family use' },
    { id: 'commercial', name: 'Commercial', description: 'Income-generating activities' },
    { id: 'mixed', name: 'Mixed Use', description: 'Combined personal and commercial use' }
  ];

  const usagePurposes = {
    domestic: [
      { id: 'personal', name: 'Personal Use', description: 'For user and family members only' },
      { id: 'caretaking', name: 'Caretaking', description: 'Property caretaking arrangement' },
      { id: 'will', name: 'Will', description: 'Property transfer through will' },
      { id: 'gift', name: 'Gift', description: 'Property given as gift' },
      { id: 'collateral', name: 'Collateral', description: 'Used as loan security' }
    ],
    commercial: [
      { id: 'rent', name: 'Rent', description: 'Short-term rental income' },
      { id: 'lease', name: 'Lease', description: 'Long-term lease arrangement' },
      { id: 'mortgage', name: 'Mortgage', description: 'Mortgage financing' },
      { id: 'sale', name: 'Sale', description: 'Property for sale' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ARVIPOA Property Registration Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Advanced blockchain-secured property registration with AI-powered validation
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="land">Land Registration</TabsTrigger>
            <TabsTrigger value="building">Building Registration</TabsTrigger>
            <TabsTrigger value="utilities">Utilities & Facilities</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  Property Registration Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Enhanced Land Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300">
                    <CardContent className="p-4 text-center">
                      <TreePine className="h-10 w-10 mx-auto mb-3 text-green-600" />
                      <h3 className="font-semibold text-base mb-2">Enhanced Land Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Complete land registration with indenture and site plans</p>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700" 
                        onClick={() => navigate('/land-registration')}
                      >
                        Register Land
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Vehicle Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
                    <CardContent className="p-4 text-center">
                      <Car className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-base mb-2">Vehicle Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Register cars, motorcycles, and commercial vehicles</p>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        onClick={() => navigate('/vehicle-registration')}
                      >
                        Register Vehicle
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Arms Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-red-300">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-10 w-10 mx-auto mb-3 text-red-600" />
                      <h3 className="font-semibold text-base mb-2">Arms Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Register firearms and security equipment</p>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700" 
                        onClick={() => navigate('/arms-registration')}
                      >
                        Register Arms
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Electronics Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300">
                    <CardContent className="p-4 text-center">
                      <Cpu className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                      <h3 className="font-semibold text-base mb-2">Electronics Property</h3>
                      <p className="text-xs text-gray-600 mb-3">Register electronics and technology assets</p>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700" 
                        onClick={() => navigate('/electronics-registration')}
                      >
                        Register Electronics
                      </Button>
                    </CardContent>
                  </Card>

                  {/* PMB Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-300">
                    <CardContent className="p-4 text-center">
                      <Building className="h-10 w-10 mx-auto mb-3 text-orange-600" />
                      <h3 className="font-semibold text-base mb-2">PMB Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Register Private Mail Box addresses</p>
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700" 
                        onClick={() => navigate('/pmb-registration')}
                      >
                        Register PMB
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Tree/Plantation Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-emerald-300">
                    <CardContent className="p-4 text-center">
                      <FileText className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                      <h3 className="font-semibold text-base mb-2">Tree/Plantation</h3>
                      <p className="text-xs text-gray-600 mb-3">Register trees, plantations, and forestry assets</p>
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700" 
                        onClick={() => navigate('/tree-registration')}
                      >
                        Register Tree
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Animal Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-pink-300">
                    <CardContent className="p-4 text-center">
                      <Lightbulb className="h-10 w-10 mx-auto mb-3 text-pink-600" />
                      <h3 className="font-semibold text-base mb-2">Animal Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Register pets, livestock, and farm animals</p>
                      <Button 
                        className="w-full bg-pink-600 hover:bg-pink-700" 
                        onClick={() => navigate('/animal-registration')}
                      >
                        Register Animal
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Slaughtering Registration */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-rose-300">
                    <CardContent className="p-4 text-center">
                      <Rocket className="h-10 w-10 mx-auto mb-3 text-rose-600" />
                      <h3 className="font-semibold text-base mb-2">Slaughtering Registration</h3>
                      <p className="text-xs text-gray-600 mb-3">Register animal slaughtering and meat processing</p>
                      <Button 
                        className="w-full bg-rose-600 hover:bg-rose-700" 
                        onClick={() => navigate('/slaughtering-registration')}
                      >
                        Register Slaughter
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Professional Systems */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-teal-300">
                    <CardContent className="p-4 text-center">
                      <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-teal-600" />
                      <h3 className="font-semibold text-base mb-2">Professional Systems</h3>
                      <p className="text-xs text-gray-600 mb-3">Vet officers, slaughter houses, marketplaces</p>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm"
                          className="w-full bg-teal-600 hover:bg-teal-700" 
                          onClick={() => navigate('/vet-officer-login')}
                        >
                          Vet Officer
                        </Button>
                        <Button 
                          size="sm"
                          className="w-full bg-teal-600 hover:bg-teal-700" 
                          onClick={() => navigate('/slaughter-house-login')}
                        >
                          Slaughter House
                        </Button>
                        <Button 
                          size="sm"
                          className="w-full bg-teal-600 hover:bg-teal-700" 
                          onClick={() => navigate('/animal-marketplace')}
                        >
                          Animal Market
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Registration Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Process Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Land Registration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Register land with Main Digital Address (MDA) using Ghana GPS</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Building Registration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add buildings with rooms and Sub Digital Addresses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Utilities & Facilities</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Configure utilities, EFA systems, and smart facilities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Usage Rules & Assignment</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Set usage rules and assign to tenants/inhabitants</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Land Registration Tab */}
          <TabsContent value="land" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-6 w-6" />
                  LAND PROPERTY/ASSET ADDRESS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Address Section - Exactly as in document */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className="border-green-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Property Address Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="address">Address *</Label>
                          <Textarea
                            id="address"
                            placeholder="Click here to enter text"
                            value={propertyData.landData.address}
                            onChange={(e) => setPropertyData(prev => ({
                              ...prev,
                              landData: { ...prev.landData, address: e.target.value }
                            }))}
                            className="min-h-[80px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="houseNumber">House Number *</Label>
                            <Input
                              id="houseNumber"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.houseNumber}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, houseNumber: e.target.value }
                              }))}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="locality">Locality *</Label>
                            <Input
                              id="locality"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.locality}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, locality: e.target.value }
                              }))}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="town">Town *</Label>
                            <Select value={propertyData.landData.town} onValueChange={(value) => 
                              setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, town: value }
                              }))
                            }>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an item" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="accra">Accra</SelectItem>
                                <SelectItem value="kumasi">Kumasi</SelectItem>
                                <SelectItem value="takoradi">Takoradi</SelectItem>
                                <SelectItem value="tamale">Tamale</SelectItem>
                                <SelectItem value="cape-coast">Cape Coast</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="district">Municipal/District *</Label>
                            <Select value={propertyData.landData.district} onValueChange={(value) => 
                              setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, district: value }
                              }))
                            }>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an item" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="accra-metro">Accra Metropolitan</SelectItem>
                                <SelectItem value="tema-metro">Tema Metropolitan</SelectItem>
                                <SelectItem value="ga-west">Ga West Municipal</SelectItem>
                                <SelectItem value="kumasi-metro">Kumasi Metropolitan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="region">Region *</Label>
                          <Select value={propertyData.landData.region} onValueChange={(value) => 
                            setPropertyData(prev => ({
                              ...prev,
                              landData: { ...prev.landData, region: value }
                            }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose an item" />
                            </SelectTrigger>
                            <SelectContent>
                              {ghanaData.regions.map((region) => (
                                <SelectItem key={region} value={region}>{region}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Site Plan Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pmbNumber">P.O. Box/PMB Number</Label>
                            <Input
                              id="pmbNumber"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.pmbNumber}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, pmbNumber: e.target.value }
                              }))}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="sitePlanNumber">Site Plan Number</Label>
                            <Input
                              id="sitePlanNumber"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.sitePlanNumber}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, sitePlanNumber: e.target.value }
                              }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="landSize">Land Size</Label>
                          <Input
                            id="landSize"
                            placeholder="100 feet by 100 feet"
                            value={propertyData.landData.landSize}
                            onChange={(e) => setPropertyData(prev => ({
                              ...prev,
                              landData: { ...prev.landData, landSize: e.target.value }
                            }))}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Digital Address & GPS Section */}
                  <div className="space-y-6">
                    <Card className="border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Ghana GPS Digital Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="digitalAddress">Digital Address *</Label>
                          <div className="flex gap-2">
                            <Input
                              id="digitalAddress"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.digitalAddress}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, digitalAddress: e.target.value }
                              }))}
                              className="flex-1"
                            />
                            <Button 
                              onClick={() => window.open('https://www.ghanapostgps.com/map/', '_blank')} 
                              variant="outline"
                              size="sm"
                            >
                              <Globe className="h-4 w-4 mr-1" />
                              GPS
                            </Button>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">
                            Click link to generate Digital Address: https://www.ghanapostgps.com/map/
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="longitude">Longitude No</Label>
                            <Input
                              id="longitude"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.longitude}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, longitude: e.target.value }
                              }))}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="latitude">Latitude No</Label>
                            <Input
                              id="latitude"
                              placeholder="Click here to enter text"
                              value={propertyData.landData.latitude}
                              onChange={(e) => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, latitude: e.target.value }
                              }))}
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                          The link above when clicked generates both longitude and latitude data automatically so the longitude and latitude data automatically fall in their respective boxes
                        </div>

                        <Button 
                          onClick={() => window.open('https://www.ghanapostgps.com/map/', '_blank')} 
                          className="w-full"
                          variant="outline"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Click here to generate Digital Address
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Site Plan Upload and QR Scanning Section - As specified in document */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Site Plan QR Image & Document Upload</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                        <CardContent className="p-6 text-center">
                          <QrCode className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                          <h4 className="font-semibold mb-2">Scan Site Plan QR Image</h4>
                          <p className="text-sm text-gray-600 mb-4">(Open camera to scan QR code and save)</p>
                          <Button onClick={scanQRCode} className="w-full">
                            <Camera className="h-4 w-4 mr-2" />
                            Open Camera
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed border-2 border-gray-300 hover:border-green-400 transition-colors">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-green-600" />
                          <h4 className="font-semibold mb-2">Attach Site Plan</h4>
                          <p className="text-sm text-gray-600 mb-4">(Open camera to snap site plan or attach site plan image)</p>
                          <Button onClick={() => fileInputRef.current?.click()} className="w-full" variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Plan
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed border-2 border-gray-300 hover:border-purple-400 transition-colors">
                        <CardContent className="p-6 text-center">
                          <Scan className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                          <h4 className="font-semibold mb-2">OCR Processing</h4>
                          <p className="text-sm text-gray-600 mb-4">OCR generates data on the site plan attached/scanned/snapped</p>
                          <div className={`w-full h-8 rounded ${isOCRProcessing ? 'bg-purple-100' : 'bg-gray-100'}`}>
                            {isOCRProcessing && (
                              <div className="h-full bg-purple-600 rounded transition-all duration-300" 
                                   style={{ width: `${ocrProgress}%` }} />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {isOCRProcessing && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Scan className="h-5 w-5 animate-pulse text-blue-600" />
                          <span className="font-medium">AI OCR Processing Site Plan...</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          The OCR software will pick all the coordinates on the image and integrate them here.
                        </div>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processOCR(file);
                      }}
                    />

                    <video
                      ref={videoRef}
                      className="w-full h-64 bg-black rounded-lg hidden"
                      autoPlay
                      playsInline
                    />
                  </CardContent>
                </Card>

                {/* Site Plan Details as per Document */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">PLAN OF LAND</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="planFor">FOR:</Label>
                          <Input
                            id="planFor"
                            placeholder="Click here to enter text"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="scale">Scale:</Label>
                          <Input
                            id="scale"
                            placeholder="Click here to enter text"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="area">Area:</Label>
                          <Input
                            id="area"
                            placeholder="Click here to enter text"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="planLocality">LOCALITY:</Label>
                          <Input
                            id="planLocality"
                            placeholder="Click here to enter text"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="planDistrict">DISTRICT/METRO/MUNICIPAL:</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose an item" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="accra-metro">Accra Metropolitan</SelectItem>
                              <SelectItem value="tema-metro">Tema Metropolitan</SelectItem>
                              <SelectItem value="kumasi-metro">Kumasi Metropolitan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="planRegion">REGION:</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose an item" />
                            </SelectTrigger>
                            <SelectContent>
                              {ghanaData.regions.map((region) => (
                                <SelectItem key={region} value={region}>{region}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Licensed Surveyor Certification */}
                    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="text-sm">
                            <p>I, <Input className="inline-block w-48 mx-2" placeholder="Click here to enter text" /> Licensed surveyor hereby certify that this plan is faithfully and correctly executed and accurately shows the land within the limits of the description given to me by my client.</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Date:</Label>
                              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            
                            <div>
                              <Label>Lic. Surveyor's Number:</Label>
                              <Input placeholder="___________" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Regional Surveyor phone:</Label>
                              <Input placeholder="______________" />
                            </div>
                            
                            <div className="text-center">
                              <Label className="block mb-2">Approved Seal</Label>
                              <div className="border-2 border-dashed border-gray-300 h-20 flex items-center justify-center rounded">
                                <span className="text-gray-500">Upload Seal</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Button className="w-full">
                              <FileText className="h-4 w-4 mr-2" />
                              Upload Signature here or click here to digitally sign
                            </Button>
                          </div>
                          
                          <div>
                            <Label>Approved by:</Label>
                            <Input placeholder="Click here to enter text" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Interactive Map */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        Interactive Map Selection
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={mapMode === 'map' ? 'default' : 'outline'}
                          onClick={() => setMapMode('map')}
                        >
                          <Map className="h-4 w-4 mr-1" />
                          Map
                        </Button>
                        <Button
                          size="sm"
                          variant={mapMode === 'terrain' ? 'default' : 'outline'}
                          onClick={() => setMapMode('terrain')}
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Terrain
                        </Button>
                        <Button
                          size="sm"
                          variant={mapMode === 'satellite' ? 'default' : 'outline'}
                          onClick={() => setMapMode('satellite')}
                        >
                          <Satellite className="h-4 w-4 mr-1" />
                          Satellite
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 border rounded-lg overflow-hidden">
                      <GoogleMap
                        center={{ lat: 5.6037, lng: -0.1870 }}
                        zoom={15}
                        markers={coordinatesFromMap ? [{
                          id: 'selected-location',
                          position: coordinatesFromMap,
                          title: 'Selected Location',
                          type: 'property',
                          color: '#FF0000'
                        }] : []}
                        onMapClick={(coords: { lat: number; lng: number }) => {
                          setCoordinatesFromMap(coords);
                          setPropertyData(prev => ({
                            ...prev,
                            landData: {
                              ...prev.landData,
                              latitude: coords.lat.toFixed(6),
                              longitude: coords.lng.toFixed(6)
                            }
                          }));
                        }}
                        mapTypeId={mapMode}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Click on the map to select the exact location of your property
                    </p>
                  </CardContent>
                </Card>

                {/* Site Plan Upload and OCR */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Site Plan Upload & OCR Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="h-24 flex flex-col items-center justify-center"
                        variant="outline"
                      >
                        <Upload className="h-8 w-8 mb-2" />
                        <span>Upload Site Plan</span>
                      </Button>
                      
                      <Button
                        onClick={scanQRCode}
                        className="h-24 flex flex-col items-center justify-center"
                        variant="outline"
                      >
                        <QrCode className="h-8 w-8 mb-2" />
                        <span>Scan QR Code</span>
                      </Button>
                      
                      <Button
                        className="h-24 flex flex-col items-center justify-center"
                        variant="outline"
                      >
                        <Camera className="h-8 w-8 mb-2" />
                        <span>Camera Capture</span>
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processOCR(file);
                      }}
                    />

                    {isOCRProcessing && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Scan className="h-5 w-5 animate-pulse text-blue-600" />
                          <span>AI OCR Processing Site Plan...</span>
                        </div>
                        <Progress value={ocrProgress} className="w-full" />
                      </div>
                    )}

                    {/* Camera preview for QR scanning */}
                    <video
                      ref={videoRef}
                      className="w-full h-64 bg-black rounded-lg"
                      style={{ display: 'none' }}
                    />
                  </CardContent>
                </Card>

                {/* Usage Category and Purpose */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle>Property Usage Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Usage Category *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {usageCategories.map((category) => (
                          <div
                            key={category.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              propertyData.landData.usageCategory === category.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setPropertyData(prev => ({
                              ...prev,
                              landData: { ...prev.landData, usageCategory: category.id }
                            }))}
                          >
                            <h4 className="font-semibold">{category.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {propertyData.landData.usageCategory && (
                      <div>
                        <Label>Usage Purpose *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {usagePurposes[propertyData.landData.usageCategory as keyof typeof usagePurposes]?.map((purpose) => (
                            <div
                              key={purpose.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                propertyData.landData.usagePurpose === purpose.id
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setPropertyData(prev => ({
                                ...prev,
                                landData: { ...prev.landData, usagePurpose: purpose.id }
                              }))}
                            >
                              <h5 className="font-medium">{purpose.name}</h5>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{purpose.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('overview')}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => setActiveTab('building')}>
                    Continue to Building Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Building Registration Tab */}
          <TabsContent value="building" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6" />
                  Building Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Building Permit */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Building Permit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="permitNumber">Building Permit Number</Label>
                        <Input
                          id="permitNumber"
                          placeholder="Enter permit number"
                          value={propertyData.buildingData.permitNumber}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: { ...prev.buildingData, permitNumber: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Apply for New Permit
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Renew Permit
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Property Rate Payment</span>
                      </div>
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                        Pay Property Rate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Building Details */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Building Plan Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="floors">Number of Floors/Storeys</Label>
                        <Select value={propertyData.buildingData.floors.toString()} onValueChange={(value) => 
                          setPropertyData(prev => ({
                            ...prev,
                            buildingData: { ...prev.buildingData, floors: parseInt(value) }
                          }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="rooms">Number of Rooms/Spaces</Label>
                        <Input
                          id="rooms"
                          type="number"
                          min="1"
                          value={propertyData.buildingData.rooms}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: { ...prev.buildingData, rooms: parseInt(e.target.value) || 1 }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="buildingStatus">Building Status</Label>
                        <Select value={propertyData.buildingData.buildingStatus} onValueChange={(value) => 
                          setPropertyData(prev => ({
                            ...prev,
                            buildingData: { ...prev.buildingData, buildingStatus: value }
                          }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed-finished">Completed with Finishes</SelectItem>
                            <SelectItem value="completed-unfinished">Completed without Finishes</SelectItem>
                            <SelectItem value="uncompleted">Uncompleted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Building Plans Files</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Building Plans
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Upload BOQ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Architect Details */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Architect Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="architectName">Full Name</Label>
                        <Input
                          id="architectName"
                          placeholder="Architect's full name"
                          value={propertyData.buildingData.architect.name}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              architect: { ...prev.buildingData.architect, name: e.target.value }
                            }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="architectId">ID Number</Label>
                        <Input
                          id="architectId"
                          placeholder="Professional ID number"
                          value={propertyData.buildingData.architect.id}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              architect: { ...prev.buildingData.architect, id: e.target.value }
                            }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="architectEmail">Email</Label>
                        <Input
                          id="architectEmail"
                          type="email"
                          placeholder="architect@example.com"
                          value={propertyData.buildingData.architect.email}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              architect: { ...prev.buildingData.architect, email: e.target.value }
                            }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="architectPhone">Phone</Label>
                        <Input
                          id="architectPhone"
                          placeholder="+233 XX XXX XXXX"
                          value={propertyData.buildingData.architect.phone}
                          onChange={(e) => setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              architect: { ...prev.buildingData.architect, phone: e.target.value }
                            }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <Button className="mt-4" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Invite to Architect
                    </Button>
                  </CardContent>
                </Card>

                {/* Building Colors */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Building Color Scheme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Exterior Color Scheme</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {['White', 'Yellow', 'Cream', 'Red', 'Blue', 'Brown', 'Black', 'Grey', 'Pink', 'Purple', 'Green'].map((color) => (
                            <Button
                              key={color}
                              size="sm"
                              variant={propertyData.buildingData.exteriorColor === color ? 'default' : 'outline'}
                              onClick={() => setPropertyData(prev => ({
                                ...prev,
                                buildingData: { ...prev.buildingData, exteriorColor: color }
                              }))}
                            >
                              <Palette className="h-4 w-4 mr-1" />
                              {color}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Interior Color Scheme</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {['White', 'Yellow', 'Cream', 'Red', 'Blue', 'Brown', 'Black', 'Grey', 'Pink', 'Purple', 'Green'].map((color) => (
                            <Button
                              key={color}
                              size="sm"
                              variant={propertyData.buildingData.interiorColor === color ? 'default' : 'outline'}
                              onClick={() => setPropertyData(prev => ({
                                ...prev,
                                buildingData: { ...prev.buildingData, interiorColor: color }
                              }))}
                            >
                              <Palette className="h-4 w-4 mr-1" />
                              {color}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('land')}>
                    Back to Land Registration
                  </Button>
                  <Button onClick={() => setActiveTab('utilities')}>
                    Continue to Utilities & Facilities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Utilities & Facilities Tab */}
          <TabsContent value="utilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  Utilities & Smart Facilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Electricity */}
                <Card className="border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Electricity Supply
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Electricity Provider</Label>
                        <Select value={propertyData.buildingData.utilities.electricity} onValueChange={(value) => 
                          setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              utilities: { ...prev.buildingData.utilities, electricity: value }
                            }
                          }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecg">ECG (Electricity Company of Ghana)</SelectItem>
                            <SelectItem value="solar">Solar Power</SelectItem>
                            <SelectItem value="ideist">IDEIST Smart Grid</SelectItem>
                            <SelectItem value="efa">EFA (Energy Facilitator Agent)</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Meter Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meter type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prepaid">Prepaid</SelectItem>
                            <SelectItem value="postpaid">Postpaid</SelectItem>
                            <SelectItem value="smart">Smart Meter</SelectItem>
                            <SelectItem value="qr">QR Code Enabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Meter/Device ID Number</Label>
                      <Input placeholder="Enter meter ID or device number" />
                    </div>
                  </CardContent>
                </Card>

                {/* Water Supply */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      Water Supply
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Water Source</Label>
                        <Select value={propertyData.buildingData.utilities.water} onValueChange={(value) => 
                          setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              utilities: { ...prev.buildingData.utilities, water: value }
                            }
                          }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select water source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gwcl">GWCL (Ghana Water Company Limited)</SelectItem>
                            <SelectItem value="borehole">Borehole</SelectItem>
                            <SelectItem value="well">Well</SelectItem>
                            <SelectItem value="community">Community Water Supply</SelectItem>
                            <SelectItem value="watercar">Water Car Supply</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Meter Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meter type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prepaid">Prepaid</SelectItem>
                            <SelectItem value="postpaid">Postpaid</SelectItem>
                            <SelectItem value="smart">Smart Meter</SelectItem>
                            <SelectItem value="qr">QR Code Enabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gas Supply */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-600" />
                      Gas Supply
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Gas Supply Type</Label>
                      <Select value={propertyData.buildingData.utilities.gas} onValueChange={(value) => 
                        setPropertyData(prev => ({
                          ...prev,
                          buildingData: {
                            ...prev.buildingData,
                            utilities: { ...prev.buildingData.utilities, gas: value }
                          }
                        }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gas supply type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-delivery">Home Delivery</SelectItem>
                          <SelectItem value="smart-pillar">Smart Boundary Pillars</SelectItem>
                          <SelectItem value="domestic">Domestic Gas Supply</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Internet & Communication */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-purple-600" />
                      Internet & Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Internet Type</Label>
                        <Select value={propertyData.buildingData.utilities.internet} onValueChange={(value) => 
                          setPropertyData(prev => ({
                            ...prev,
                            buildingData: {
                              ...prev.buildingData,
                              utilities: { ...prev.buildingData.utilities, internet: value }
                            }
                          }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select internet type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satellite">Satellite</SelectItem>
                            <SelectItem value="broadband">Broadband</SelectItem>
                            <SelectItem value="ideist">IDEIST Smart Network</SelectItem>
                            <SelectItem value="fiber">Fiber Optic</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Service Provider</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mtn">MTN</SelectItem>
                            <SelectItem value="telecel">Telecel</SelectItem>
                            <SelectItem value="at">A&T</SelectItem>
                            <SelectItem value="ideist">IDEIST</SelectItem>
                            <SelectItem value="glo">Glo</SelectItem>
                            <SelectItem value="starlink">Starlink</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Systems */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      Security Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Security Type (Multiple Selection)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {[
                          { id: 'dog', name: 'Guard Dog' },
                          { id: 'fence', name: 'Fence/Wire' },
                          { id: 'police', name: 'Police' },
                          { id: 'cctv', name: 'CCTV' },
                          { id: 'firearms', name: 'Firearms' },
                          { id: 'private', name: 'Private Security' },
                          { id: 'smart', name: 'Smart Security' },
                          { id: 'none', name: 'None' }
                        ].map((security) => (
                          <div key={security.id} className="flex items-center space-x-2">
                            <input type="checkbox" id={security.id} />
                            <label htmlFor={security.id} className="text-sm">{security.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Security Company Name</Label>
                      <Input placeholder="Enter security company name" />
                    </div>
                  </CardContent>
                </Card>

                {/* EFA (Energy Facilitator Agent) System */}
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-green-600" />
                      EFA (Energy Facilitator Agent) Smart System
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                      <h4 className="font-semibold mb-2">Smart Socket Installation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        EFA is an advanced smart socket system that monitors and controls all electronic devices and facilities in your property.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Number of EFA Units Required</Label>
                          <Input type="number" min="0" placeholder="Enter number of units" />
                        </div>
                        
                        <div>
                          <Label>Installation Schedule</Label>
                          <Button variant="outline" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Installation
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Smart energy monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Automated device control</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Real-time usage analytics</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('building')}>
                    Back to Building Registration
                  </Button>
                  <Button onClick={() => setActiveTab('verification')}>
                    Continue to Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-6 w-6" />
                  Document Verification & Approval
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Surveyor & Solicitor Review */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Review System</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Surveyor Review
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Pending Review</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your site plan and land documentation are being reviewed by licensed surveyors.
                          </p>
                          <Button size="sm" variant="outline">
                            Contact Surveyor
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Solicitor Review
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Pending Review</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Legal documentation and property ownership are being verified.
                          </p>
                          <Button size="sm" variant="outline">
                            Contact Solicitor
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Digital Signatures */}
                <div className="space-y-6">
                  <DigitalSignature
                    title="Property Owner Declaration"
                    signerName="Property Owner"
                    onSaveSignature={(signatureData) => {
                      console.log('Property owner signature saved:', signatureData);
                    }}
                  />
                  
                  <DigitalSignature
                    title="Licensed Surveyor Certification"
                    signerName="Licensed Surveyor"
                    onSaveSignature={(signatureData) => {
                      console.log('Surveyor signature saved:', signatureData);
                    }}
                  />
                </div>

                {/* Approval Status */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Approval Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { item: 'Land Documentation', status: 'pending', description: 'Site plan and ownership documents' },
                        { item: 'Building Plans', status: 'pending', description: 'Architectural plans and permits' },
                        { item: 'Utilities Configuration', status: 'completed', description: 'Utility connections and smart systems' },
                        { item: 'Legal Verification', status: 'pending', description: 'Legal ownership and compliance check' }
                      ].map((approval, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {approval.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : approval.status === 'pending' ? (
                              <Clock className="h-5 w-5 text-yellow-600" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            )}
                            <div>
                              <h5 className="font-medium">{approval.item}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{approval.description}</p>
                            </div>
                          </div>
                          <Badge variant={
                            approval.status === 'completed' ? 'default' :
                            approval.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {approval.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('utilities')}>
                    Back to Utilities
                  </Button>
                  <Button onClick={() => setActiveTab('completion')}>
                    Continue to Completion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completion Tab */}
          <TabsContent value="completion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Registration Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Registration Summary */}
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 dark:text-green-200">
                      Registration Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Property Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Digital Address:</span>
                            <span className="font-mono">{propertyData.landData.digitalAddress || 'GM-XXX-XXXX'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Property Type:</span>
                            <span>Land + Building</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Usage Category:</span>
                            <span className="capitalize">{propertyData.landData.usageCategory || 'Not Set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Floors:</span>
                            <span>{propertyData.buildingData.floors}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold">Registration Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Land registered with MDA</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Building configuration completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Utilities and EFA systems configured</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Awaiting professional approval</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                          <h5 className="font-semibold">Professional Verification</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Await approval from licensed surveyors and solicitors</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                          <h5 className="font-semibold">Room Registration</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Add individual rooms with Sub Digital Addresses</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                          <h5 className="font-semibold">Tenant Assignment</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Assign property to users/members according to usage rules</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Registration Certificate
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share Property Details
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Property Settings
                  </Button>
                </div>

                {/* Final Digital Signature */}
                <DigitalSignature
                  title="Property Registration Completion Certificate"
                  signerName="Property Owner"
                  onSaveSignature={(signatureData) => {
                    console.log('Final registration signature saved:', signatureData);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}