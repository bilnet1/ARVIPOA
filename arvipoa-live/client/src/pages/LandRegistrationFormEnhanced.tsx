import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  MapPin, 
  Camera, 
  Plus, 
  Upload,
  Video,
  RotateCcw, 
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  QrCode,
  Map,
  Satellite,
  Layers,
  Users,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Globe,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Home,
  Tractor,
  UserCheck,
  Gavel,
  Gift,
  Building,
  DollarSign,
  Clock,
  Camera as CameraIcon,
  Info,
  Target
} from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

export default function LandRegistrationFormEnhanced() {
  const [activeSection, setActiveSection] = useState('location');
  const [formData, setFormData] = useState<any>({});
  const [openSections, setOpenSections] = useState({
    location: true,
    sitePlan: false,
    pillars: false,
    contract: false,
    title: false,
    usage: false
  });
  const [mapView, setMapView] = useState('map');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [selectedLocalities, setSelectedLocalities] = useState<string[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [parties, setParties] = useState<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Ghana Regions
  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Northern', 'Upper East', 
    'Upper West', 'Western', 'Western North', 'Volta', 'Oti', 'Brong Ahafo', 
    'Ahafo', 'Bono East', 'North East', 'Savannah'
  ];

  // Districts/Metros by Region
  const districtsByRegion: { [key: string]: string[] } = {
    'Greater Accra': [
      'Accra Metropolitan', 'Tema Metropolitan', 'Ga East Municipal', 'Ga West Municipal',
      'Ga Central Municipal', 'Ga South Municipal', 'Ga North Municipal', 'Ledzokuku Municipal',
      'Krowor Municipal', 'Adentan Municipal', 'Ashaiman Municipal', 'La Nkwantanang Madina Municipal',
      'La Dade Kotopon Municipal', 'Ablekuma North Municipal', 'Ablekuma Central Municipal',
      'Ablekuma West Municipal', 'Okaikwei North Municipal', 'Ayawaso East Municipal',
      'Ayawaso North Municipal', 'Ayawaso West Municipal', 'Ayawaso Central Municipal'
    ],
    'Ashanti': [
      'Kumasi Metropolitan', 'Obuasi Municipal', 'Ejisu Municipal', 'Juaben Municipal',
      'Bosomtwe District', 'Atwima Kwanwoma District', 'Atwima Nwabiagya South Municipal',
      'Atwima Nwabiagya North District', 'Atwima Mponua District', 'Afigya Kwabre South District',
      'Afigya Kwabre North District', 'Kwabre East Municipal', 'Asante Akim North Municipal',
      'Asante Akim South Municipal', 'Asante Akim Central Municipal', 'Adansi North District',
      'Adansi South District', 'Adansi Asokwa District', 'Amansie West District',
      'Amansie Central District', 'Amansie South District', 'Ahafo Ano North Municipal',
      'Ahafo Ano South West District', 'Ahafo Ano South East District', 'Sekyere Central District',
      'Sekyere South District', 'Sekyere East District', 'Sekyere Afram Plains District',
      'Mampong Municipal', 'Offinso Municipal', 'Offinso North District'
    ],
    'Central': [
      'Cape Coast Metropolitan', 'Elmina Municipal', 'Komenda Edina Eguafo Abirem Municipal',
      'Abura Asebu Kwamankese District', 'Mfantsiman Municipal', 'Awutu Senya East Municipal',
      'Awutu Senya West District', 'Effutu Municipal', 'Gomoa East District',
      'Gomoa West District', 'Gomoa Central District', 'Agona East District',
      'Agona West Municipal', 'Assin Central Municipal', 'Assin North Municipal',
      'Assin South District', 'Twifo Hemang Lower Denkyira District', 'Twifo Atti Morkwa District',
      'Upper Denkyira East Municipal', 'Upper Denkyira West District', 'Ekumfi District'
    ],
    'Eastern': [
      'New Juaben South Municipal', 'New Juaben North Municipal', 'Nsawam Adoagyir Municipal',
      'Akuapim North Municipal', 'Akuapim South District', 'Okere District',
      'Yilo Krobo Municipal', 'Lower Manya Krobo Municipal', 'Upper Manya Krobo District',
      'Akyemansa District', 'Atiwa East District', 'Atiwa West District',
      'Kwaebibirem Municipal', 'Suhum Municipal', 'Akwatia District',
      'Denkyembour District', 'Fanteakwa North District', 'Fanteakwa South District',
      'Abuakwa North Municipal', 'Abuakwa South Municipal', 'West Akim Municipal',
      'East Akim Municipal', 'Birim North District', 'Birim Central Municipal',
      'Birim South District', 'Kwahu East District', 'Kwahu West Municipal',
      'Kwahu South District', 'Kwahu Afram Plains South District', 'Kwahu Afram Plains North District'
    ],
    'Northern': [
      'Tamale Metropolitan', 'Sagnarigu Municipal', 'Savelugu Municipal',
      'Nanton Municipal', 'Kumbungu District', 'Tolon District',
      'Zabzugu District', 'Tatale Sangule District', 'Yendi Municipal',
      'Mion District', 'Gushegu Municipal', 'Karaga District',
      'Mamprugu Moagduri District', 'Kpandai District', 'East Mamprusi Municipal',
      'West Mamprusi Municipal', 'Chereponi District', 'Yunyoo District',
      'Nanumba North Municipal', 'Nanumba South District', 'Bunkpurugu Nakpanduri District'
    ],
    'Upper East': [
      'Bolgatanga Municipal', 'Talensi District', 'Nabdam District',
      'Kassena Nankana West District', 'Kassena Nankana Municipal', 'Builsa North Municipal',
      'Builsa South District', 'Bawku Municipal', 'Bawku West District',
      'Garu District', 'Tempane District', 'Binduri District',
      'Pusiga District'
    ],
    'Upper West': [
      'Wa Municipal', 'Wa East District', 'Wa West District',
      'Nadowli Kaleo District', 'Jirapa Municipal', 'Lambussie District',
      'Lawra Municipal', 'Nandom Municipal', 'Sissala East Municipal',
      'Sissala West District', 'Daffiama Bussie Issa District'
    ],
    'Western': [
      'Sekondi Takoradi Metropolitan', 'Shama District', 'Ahanta West Municipal',
      'Nzema East Municipal', 'Ellembelle District', 'Jomoro Municipal',
      'Tarkwa Nsuaem Municipal', 'Prestea Huni Valley Municipal', 'Wassa East District',
      'Wassa Amenfi West Municipal', 'Wassa Amenfi Central Municipal', 'Wassa Amenfi East Municipal',
      'Mpohor District', 'Kwesimintim Municipal'
    ],
    'Western North': [
      'Sefwi Wiawso Municipal', 'Sefwi Akontombra District', 'Bibiani Anhwiaso Bekwai Municipal',
      'Suaman District', 'Bodi District', 'Juaboso District'
    ],
    'Volta': [
      'Ho Municipal', 'Ho West District', 'Adaklu District',
      'Agotime Ziope District', 'South Dayi District', 'North Dayi District',
      'Kpando Municipal', 'Biakoye District', 'Hohoe Municipal',
      'Jasikan District', 'Kadjebi District', 'Nkwanta South Municipal',
      'Keta Municipal', 'Anloga District', 'Some District',
      'Ketu North Municipal', 'Ketu South Municipal', 'Akatsi North District',
      'Akatsi South District', 'Central Tongu District', 'North Tongu District',
      'South Tongu District'
    ],
    'Oti': [
      'Nkwanta North District', 'Nkwanta South Municipal', 'Krachi East Municipal',
      'Krachi West Municipal', 'Krachi Nchumuru District', 'Biakoye District',
      'Jasikan District', 'Kadjebi District'
    ],
    'Brong Ahafo': [
      'Sunyani Municipal', 'Sunyani West District', 'Berekum Municipal',
      'Dormaa Central Municipal', 'Dormaa West District', 'Dormaa East District',
      'Jaman South Municipal', 'Jaman North District', 'Tano South Municipal',
      'Tano North District', 'Asutifi North District', 'Asutifi South District',
      'Asunafo North Municipal', 'Asunafo South Municipal', 'Techiman Municipal',
      'Techiman North District', 'Nkoranza North District', 'Nkoranza South Municipal',
      'Kintampo North Municipal', 'Kintampo South District', 'Wenchi Municipal',
      'Tain District', 'Banda District', 'Atebubu Amantin Municipal',
      'Sene East District', 'Sene West District', 'Pru East District',
      'Pru West District'
    ],
    'Ahafo': [
      'Goaso Municipal', 'Asutifi North District', 'Asutifi South District',
      'Asunafo North Municipal', 'Asunafo South Municipal', 'Tano North Municipal',
      'Tano South Municipal'
    ],
    'Bono East': [
      'Techiman Municipal', 'Techiman North District', 'Nkoranza North District',
      'Nkoranza South Municipal', 'Kintampo North Municipal', 'Kintampo South District',
      'Atebubu Amantin Municipal', 'Sene East District', 'Sene West District',
      'Pru East District', 'Pru West District'
    ],
    'North East': [
      'Nalerigu Municipal', 'East Mamprusi Municipal', 'West Mamprusi Municipal',
      'Mamprugu Moagduri District', 'Yunyoo District', 'Chereponi District'
    ],
    'Savannah': [
      'Damongo Municipal', 'Salaga South District', 'Salaga North District',
      'East Gonja Municipal', 'West Gonja Municipal', 'Central Gonja District',
      'North Gonja District', 'Sawla Tuna Kalba District', 'Bole District'
    ]
  };

  // Sample towns by district (you would expand this with real data)
  const townsByDistrict: { [key: string]: string[] } = {
    'Accra Metropolitan': [
      'Osu', 'Labadi', 'Cantonments', 'Airport Residential Area', 'East Legon',
      'Labone', 'Adabraka', 'Dzorwulu', 'North Ridge', 'West Ridge',
      'Roman Ridge', 'Asylum Down', 'Kokomlemle', 'Tesano', 'Achimota',
      'Dansoman', 'Kaneshie', 'Abossey Okai', 'Bubuashie', 'Santa Maria',
      'New Town', 'Zongo', 'Nima', 'Maamobi', 'Pig Farm', 'Alajo',
      'Kotobabi', 'Darkuman', 'Odorkor', 'Sowutuom'
    ],
    'Tema Metropolitan': [
      'Tema New Town', 'Community 1', 'Community 2', 'Community 3', 'Community 4',
      'Community 5', 'Community 6', 'Community 7', 'Community 8', 'Community 9',
      'Community 10', 'Community 11', 'Community 12', 'Community 18', 'Community 19',
      'Community 20', 'Community 21', 'Community 22', 'Community 25', 'Sakumono',
      'Klagon', 'Afienya', 'Dawhenya', 'Prampram', 'Newtown'
    ],
    'Kumasi Metropolitan': [
      'Adum', 'Asafo', 'Bantama', 'Suame', 'Tafo', 'Dichemso', 'Manhyia',
      'Ashtown', 'Atonsu', 'Kwadaso', 'Bomso', 'Ayeduase', 'Ayigya',
      'Kotei', 'Emena', 'Boadi', 'Dakodwom', 'Oforikrom', 'Patasi',
      'Sokoban', 'Abrepo', 'Asokwa', 'Ampabame', 'Bohyen', 'Fanti New Town'
    ]
  };

  // Sample localities by town
  const localitiesByTown: { [key: string]: string[] } = {
    'Osu': ['Osu Re', 'Osu Alata', 'Osu Klottey', 'Kinbu', 'Christiansborg'],
    'Labadi': ['La Town', 'La Dadekotopon', 'Teshie-Nungua'],
    'East Legon': ['East Legon Hills', 'American House Area', 'A&C Mall Area', 'Adjiringanor'],
    'Achimota': ['Achimota New Town', 'Achimota School Area', 'Achimota Mile 7'],
    'Dansoman': ['Dansoman Estate', 'Round About', 'Last Stop', 'Keep Fit Club'],
    'Tema New Town': ['Site 1', 'Site 2', 'Harbour Area', 'Industrial Area'],
    'Community 1': ['Valco Flats', 'STC', 'Shell', 'Tema Station'],
    'Adum': ['Kejetia', 'Central Market', 'Prempeh Assembly Hall', 'Adum Spot'],
    'Asafo': ['Asafo Market', 'Golden Tulip Area', 'Millennium City'],
    'Bantama': ['Bantama Market', 'Bantama High Street', 'Stadium Area']
  };

  const landSizeOptions = [
    '50ft x 100ft', '100ft x 100ft', '200ft x 100ft', '100ft x 200ft',
    '1 plot (100ft x 100ft)', '2 plots', '3 plots', '4 plots', '5 plots',
    '1 acre', '2 acres', '5 acres', '10 acres', 'Custom size'
  ];

  const titleTypes = [
    { name: 'Basic', duration: '12 months', fee: 'GH¢500.00', color: 'blue' },
    { name: 'Standard', duration: '6 months', fee: 'GH¢2,500.00', color: 'green' },
    { name: 'Fast Track', duration: '3 months', fee: 'GH¢2,500.00', color: 'yellow' },
    { name: 'Gold', duration: '1 month', fee: 'GH¢10,000.00', color: 'yellow' },
    { name: 'Prestige', duration: 'Contact for ETC', fee: 'Contact for Cost', color: 'purple' }
  ];

  const usageOptions = [
    { id: 'building', name: 'Add House/Building', icon: Home },
    { id: 'agriculture', name: 'Agricultural Project', icon: Tractor },
    { id: 'personal', name: 'Personal Use', icon: UserCheck },
    { id: 'nothing', name: 'Nothing for now', icon: Clock },
    { id: 'sell', name: 'Sell', icon: DollarSign },
    { id: 'lease', name: 'Lease', icon: FileText },
    { id: 'mortgage', name: 'Mortgage', icon: Building },
    { id: 'rent', name: 'Rent', icon: Home },
    { id: 'collateral', name: 'Collateral', icon: Shield },
    { id: 'gift', name: 'Gift', icon: Gift },
    { id: 'will', name: 'Will', icon: Gavel },
    { id: 'caretaking', name: 'Caretaking', icon: Users }
  ];

  useEffect(() => {
    // Load Google Maps
    const loadGoogleMaps = () => {
      if (window.google) {
        setMapLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (formData.region) {
      setSelectedDistricts(districtsByRegion[formData.region] || []);
      setSelectedTowns([]);
      setSelectedLocalities([]);
      setFormData((prev: any) => ({ ...prev, district: '', town: '', locality: '' }));
    }
  }, [formData.region]);

  useEffect(() => {
    if (formData.district) {
      setSelectedTowns(townsByDistrict[formData.district] || []);
      setSelectedLocalities([]);
      setFormData((prev: any) => ({ ...prev, town: '', locality: '' }));
    }
  }, [formData.district]);

  useEffect(() => {
    if (formData.town) {
      setSelectedLocalities(localitiesByTown[formData.town] || []);
      setFormData((prev: any) => ({ ...prev, locality: '' }));
    }
  }, [formData.town]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generateDigitalAddress = () => {
    if (mapLoaded && window.google) {
      // Simulate GhanaPostGPS integration
      const mockDigitalAddress = `GA-${Math.random().toString(36).substr(2, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const mockLat = 5.6037 + (Math.random() - 0.5) * 0.1;
      const mockLng = -0.1870 + (Math.random() - 0.5) * 0.1;
      
      handleInputChange('digitalAddress', mockDigitalAddress);
      handleInputChange('latitude', mockLat.toFixed(6));
      handleInputChange('longitude', mockLng.toFixed(6));
      
      alert(`Digital Address Generated!\nAddress: ${mockDigitalAddress}\nCoordinates: ${mockLat.toFixed(6)}, ${mockLng.toFixed(6)}`);
    } else {
      window.open('https://www.ghanapostgps.com/map/', '_blank');
    }
  };

  const addPillar = () => {
    const newPillar = {
      id: pillars.length + 1,
      number: `Pillar ${pillars.length + 1}`,
      digitalAddress: '',
      images: []
    };
    setPillars([...pillars, newPillar]);
  };

  const addParty = () => {
    const newParty = {
      id: parties.length + 1,
      representing: '',
      capacity: '',
      title: '',
      name: '',
      phone: '',
      email: '',
      isLiving: true,
      verified: false
    };
    setParties([...parties, newParty]);
  };

  const saveDraft = () => {
    localStorage.setItem('landRegistrationDraft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const previewForm = () => {
    alert('Form preview will open in a new window');
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    alert('Land registration form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">LAND REGISTRATION FORM (ARVIPOA)</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={saveDraft} className="text-blue-400 border-blue-400">
                <Save className="w-4 h-4 mr-1" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={previewForm} className="text-green-400 border-green-400">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button onClick={submitForm} className="bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4 mr-1" />
                Submit
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Form Progress</span>
            <span>60% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Section A: Property Location */}
        <Card className="mb-6 bg-slate-800/50 border-blue-500/30">
          <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-blue-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Section A: Property Location
                  </div>
                  {openSections.location ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address" className="text-white flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      Address/House No
                    </Label>
                    <Input
                      id="address"
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter address or house number"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="locality" className="text-white">Locality *</Label>
                    <Select value={formData.locality || ''} onValueChange={(value) => handleInputChange('locality', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select locality" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {selectedLocalities.map((locality) => (
                          <SelectItem key={locality} value={locality} className="text-white hover:bg-slate-700">{locality}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="town" className="text-white">Town *</Label>
                    <Select value={formData.town || ''} onValueChange={(value) => handleInputChange('town', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select town" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {selectedTowns.map((town) => (
                          <SelectItem key={town} value={town} className="text-white hover:bg-slate-700">{town}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="district" className="text-white">Municipal/District *</Label>
                    <Select value={formData.district || ''} onValueChange={(value) => handleInputChange('district', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select district/municipal" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {selectedDistricts.map((district) => (
                          <SelectItem key={district} value={district} className="text-white hover:bg-slate-700">{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="region" className="text-white">Region *</Label>
                    <Select value={formData.region || ''} onValueChange={(value) => handleInputChange('region', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {ghanaRegions.map((region) => (
                          <SelectItem key={region} value={region} className="text-white hover:bg-slate-700">{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="digitalAddress" className="text-white flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      Digital Address *
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="digitalAddress"
                        value={formData.digitalAddress || ''}
                        onChange={(e) => handleInputChange('digitalAddress', e.target.value)}
                        placeholder="GA-XXX-XXXX"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                      <Button 
                        variant="outline" 
                        onClick={generateDigitalAddress}
                        className="text-green-400 border-green-400 hover:bg-green-400/10"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="longitude" className="text-white">Longitude</Label>
                    <Input
                      id="longitude"
                      value={formData.longitude || ''}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                      placeholder="Auto-filled from GPS"
                      className="bg-slate-700/50 border-slate-600 text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="latitude" className="text-white">Latitude</Label>
                    <Input
                      id="latitude"
                      value={formData.latitude || ''}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                      placeholder="Auto-filled from GPS"
                      className="bg-slate-700/50 border-slate-600 text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="poBox" className="text-white">P.O. Box/PMB Number</Label>
                    <Input
                      id="poBox"
                      value={formData.poBox || ''}
                      onChange={(e) => handleInputChange('poBox', e.target.value)}
                      placeholder="Optional"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sitePlanNumber" className="text-white">Site Plan Number</Label>
                    <Input
                      id="sitePlanNumber"
                      value={formData.sitePlanNumber || ''}
                      onChange={(e) => handleInputChange('sitePlanNumber', e.target.value)}
                      placeholder="Enter site plan number"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="landSize" className="text-white">Land Size</Label>
                    <Select value={formData.landSize || ''} onValueChange={(value) => handleInputChange('landSize', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select or enter custom size" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {landSizeOptions.map((size) => (
                          <SelectItem key={size} value={size} className="text-white hover:bg-slate-700">{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Section B: Site Plan Upload + OCR */}
        <Card className="mb-6 bg-slate-800/50 border-green-500/30">
          <Collapsible open={openSections.sitePlan} onOpenChange={() => toggleSection('sitePlan')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-green-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Upload className="w-6 h-6 mr-2" />
                    Section B: Site Plan Upload + OCR
                  </div>
                  {openSections.sitePlan ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Site Plan Upload */}
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1 text-blue-400 border-blue-400">
                        <QrCode className="w-4 h-4 mr-2" />
                        Scan QR Code
                      </Button>
                      <Button variant="outline" className="flex-1 text-green-400 border-green-400">
                        <CameraIcon className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Drop site plan files here or click to upload</p>
                      <p className="text-gray-500 text-sm">Supports JPG, PNG, PDF</p>
                      <Button variant="outline" className="mt-4">
                        Choose Files
                      </Button>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">OCR Data Preview</h4>
                      <div className="text-sm text-gray-400">
                        <p>Scale: 1:500</p>
                        <p>Area: 0.25 acres</p>
                        <p>Surveyor: Licensed Surveyor Name</p>
                        <p>Date: Auto-detected</p>
                      </div>
                    </div>
                  </div>

                  {/* Map View */}
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Button 
                        variant={mapView === 'map' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMapView('map')}
                      >
                        <Map className="w-4 h-4 mr-1" />
                        Map
                      </Button>
                      <Button 
                        variant={mapView === 'satellite' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMapView('satellite')}
                      >
                        <Satellite className="w-4 h-4 mr-1" />
                        Satellite
                      </Button>
                      <Button 
                        variant={mapView === 'terrain' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMapView('terrain')}
                      >
                        <Layers className="w-4 h-4 mr-1" />
                        Terrain
                      </Button>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg h-64 flex items-center justify-center">
                      {mapLoaded ? (
                        <div id="map" className="w-full h-full rounded-lg">
                          <p className="text-gray-400 text-center">Interactive Google Map will load here</p>
                          <p className="text-gray-500 text-sm text-center mt-2">Click on map to mark land coordinates</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400">Loading Google Maps...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Section C: Add Pillars */}
        <Card className="mb-6 bg-slate-800/50 border-purple-500/30">
          <Collapsible open={openSections.pillars} onOpenChange={() => toggleSection('pillars')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="w-6 h-6 mr-2" />
                    Section C: Add Smart Pillars
                  </div>
                  {openSections.pillars ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={addPillar} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Smart Pillar
                  </Button>

                  {pillars.map((pillar, index) => (
                    <Card key={pillar.id} className="bg-slate-700/30 border-slate-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Pillar {index + 1} Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white">Pillar Number</Label>
                            <Input
                              value={pillar.number}
                              className="bg-slate-700/50 border-slate-600 text-white"
                              readOnly
                            />
                          </div>
                          <div>
                            <Label className="text-white">Digital Address</Label>
                            <div className="flex space-x-2">
                              <Input
                                value={pillar.digitalAddress}
                                placeholder="Generate pillar address"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                              <Button variant="outline" size="sm" className="text-green-400 border-green-400">
                                Generate
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label className="text-white">Pillar Images</Label>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" className="text-blue-400 border-blue-400">
                              <Camera className="w-4 h-4 mr-2" />
                              Take Photo 1
                            </Button>
                            <Button variant="outline" className="text-blue-400 border-blue-400">
                              <Camera className="w-4 h-4 mr-2" />
                              Take Photo 2
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Section D: Contract/Agreement */}
        <Card className="mb-6 bg-slate-800/50 border-yellow-500/30">
          <Collapsible open={openSections.contract} onOpenChange={() => toggleSection('contract')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-yellow-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Section D: Contract/Indenture/Agreement
                  </div>
                  {openSections.contract ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <Button onClick={addParty} className="bg-yellow-600 hover:bg-yellow-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Representing Party
                  </Button>

                  {parties.map((party, index) => (
                    <Card key={party.id} className="bg-slate-700/30 border-slate-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Party {index + 1} Representation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-white">Representing as</Label>
                            <Select>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="seller">Seller/Lessor</SelectItem>
                                <SelectItem value="buyer">Buyer/Lessee</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                                <SelectItem value="witness">Witness</SelectItem>
                                <SelectItem value="deponent">Deponent</SelectItem>
                                <SelectItem value="solicitor">Solicitor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-white">Representing for</Label>
                            <Select>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="organization">Organization</SelectItem>
                                <SelectItem value="stool">Stool Community</SelectItem>
                                <SelectItem value="clan">Clan</SelectItem>
                                <SelectItem value="family">Family</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-white">Name</Label>
                            <Input className="bg-slate-700/50 border-slate-600 text-white" />
                          </div>

                          <div>
                            <Label className="text-white">Phone</Label>
                            <Input className="bg-slate-700/50 border-slate-600 text-white" />
                          </div>

                          <div>
                            <Label className="text-white">Email</Label>
                            <Input type="email" className="bg-slate-700/50 border-slate-600 text-white" />
                          </div>

                          <div className="flex items-center space-x-4">
                            <Button variant="outline" className="text-blue-400 border-blue-400">
                              Send OTP
                            </Button>
                            <Button variant="outline" className="text-green-400 border-green-400">
                              Verify OTP
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Indenture Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">Term (Years)</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 5, 10, 25, 50, 99].map(year => (
                              <SelectItem key={year} value={year.toString()}>{year} years</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Start Date</Label>
                        <Input type="date" className="bg-slate-700/50 border-slate-600 text-white" />
                      </div>
                      <div>
                        <Label className="text-white">End Date</Label>
                        <Input type="date" className="bg-slate-700/50 border-slate-600 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Section E: Title, Concurrence & Yellow Card */}
        <Card className="mb-6 bg-slate-800/50 border-red-500/30">
          <Collapsible open={openSections.title} onOpenChange={() => toggleSection('title')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-red-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Section E: Title, Concurrence & Yellow Card
                  </div>
                  {openSections.title ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  {/* Title/Concurrence/Yellow Card Selection */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Required Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="needTitle"
                          checked={formData.needTitle || false}
                          onChange={(e) => handleInputChange('needTitle', e.target.checked)}
                          className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600 rounded"
                        />
                        <Label htmlFor="needTitle" className="text-white">Add Title</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="needConcurrence"
                          checked={formData.needConcurrence || false}
                          onChange={(e) => handleInputChange('needConcurrence', e.target.checked)}
                          className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600 rounded"
                        />
                        <Label htmlFor="needConcurrence" className="text-white">Add Concurrence</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="needYellowCard"
                          checked={formData.needYellowCard || false}
                          onChange={(e) => handleInputChange('needYellowCard', e.target.checked)}
                          className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600 rounded"
                        />
                        <Label htmlFor="needYellowCard" className="text-white">Add Yellow Card</Label>
                      </div>
                    </div>

                    {/* Document Status Selection */}
                    {(formData.needTitle || formData.needConcurrence || formData.needYellowCard) && (
                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Document Status</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusHave"
                                name="documentStatus"
                                value="have"
                                checked={formData.documentStatus === 'have'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusHave" className="text-white">I have</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusDontHave"
                                name="documentStatus"
                                value="dontHave"
                                checked={formData.documentStatus === 'dontHave'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusDontHave" className="text-white">I don't have yet</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusNotApplied"
                                name="documentStatus"
                                value="notApplied"
                                checked={formData.documentStatus === 'notApplied'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusNotApplied" className="text-white">I haven't applied yet</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusDontNeed"
                                name="documentStatus"
                                value="dontNeed"
                                checked={formData.documentStatus === 'dontNeed'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusDontNeed" className="text-white">I don't need yet</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusApplyLater"
                                name="documentStatus"
                                value="applyLater"
                                checked={formData.documentStatus === 'applyLater'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusApplyLater" className="text-white">I will apply later on</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="statusApplied"
                                name="documentStatus"
                                value="applied"
                                checked={formData.documentStatus === 'applied'}
                                onChange={(e) => handleInputChange('documentStatus', e.target.value)}
                                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600"
                              />
                              <Label htmlFor="statusApplied" className="text-white">I have applied on date and will be ready on date</Label>
                            </div>
                          </div>

                          {/* Conditional Date and Reminder Options */}
                          <div className="space-y-4">
                            {(formData.documentStatus === 'have') && (
                              <div className="bg-slate-700/30 p-4 rounded-lg space-y-4">
                                <h5 className="text-white font-medium">Document Details</h5>
                                
                                {/* Document Number Fields for each selected document type */}
                                {formData.needTitle && (
                                  <div className="space-y-2">
                                    <Label className="text-white">TITLE NUMBER:</Label>
                                    <Input 
                                      value={formData.titleNumber || ''}
                                      onChange={(e) => handleInputChange('titleNumber', e.target.value)}
                                      placeholder="Enter title number"
                                      className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center">
                                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                      <p className="text-gray-400 text-xs">Add title document attachment</p>
                                      <Button variant="outline" className="mt-1" size="sm">
                                        Choose File
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {formData.needConcurrence && (
                                  <div className="space-y-2">
                                    <Label className="text-white">CONCURRENCE NUMBER:</Label>
                                    <Input 
                                      value={formData.concurrenceNumber || ''}
                                      onChange={(e) => handleInputChange('concurrenceNumber', e.target.value)}
                                      placeholder="Enter concurrence number"
                                      className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center">
                                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                      <p className="text-gray-400 text-xs">Add concurrence document attachment</p>
                                      <Button variant="outline" className="mt-1" size="sm">
                                        Choose File
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {formData.needYellowCard && (
                                  <div className="space-y-2">
                                    <Label className="text-white">YELLOW CARD NUMBER:</Label>
                                    <Input 
                                      value={formData.yellowCardNumber || ''}
                                      onChange={(e) => handleInputChange('yellowCardNumber', e.target.value)}
                                      placeholder="Enter yellow card number"
                                      className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-3 text-center">
                                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                      <p className="text-gray-400 text-xs">Add yellow card document attachment</p>
                                      <Button variant="outline" className="mt-1" size="sm">
                                        Choose File
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {(formData.documentStatus === 'applyLater') && (
                              <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
                                <Label className="text-white">Remind me to apply on:</Label>
                                <Input 
                                  type="date"
                                  value={formData.remindApplyDate || ''}
                                  onChange={(e) => handleInputChange('remindApplyDate', e.target.value)}
                                  className="bg-slate-700/50 border-slate-600 text-white"
                                />
                                <div className="space-y-2">
                                  <Label className="text-white text-sm">Reminder Methods:</Label>
                                  <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="remindSMS"
                                        checked={formData.remindMethods?.sms || false}
                                        onChange={(e) => handleInputChange('remindMethods', {...(formData.remindMethods || {}), sms: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="remindSMS" className="text-white text-sm">SMS</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="remindEmail"
                                        checked={formData.remindMethods?.email || false}
                                        onChange={(e) => handleInputChange('remindMethods', {...(formData.remindMethods || {}), email: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="remindEmail" className="text-white text-sm">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="remindCall"
                                        checked={formData.remindMethods?.call || false}
                                        onChange={(e) => handleInputChange('remindMethods', {...(formData.remindMethods || {}), call: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="remindCall" className="text-white text-sm">Call</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="remindApp"
                                        checked={formData.remindMethods?.app || false}
                                        onChange={(e) => handleInputChange('remindMethods', {...(formData.remindMethods || {}), app: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="remindApp" className="text-white text-sm">App Notification/Google Reminder</Label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(formData.documentStatus === 'applied') && (
                              <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-white">I have applied on:</Label>
                                    <Input 
                                      type="date"
                                      value={formData.appliedDate || ''}
                                      onChange={(e) => handleInputChange('appliedDate', e.target.value)}
                                      placeholder="9/12/2024"
                                      className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-white">and will be ready on:</Label>
                                    <Input 
                                      type="date"
                                      value={formData.readyDate || ''}
                                      onChange={(e) => handleInputChange('readyDate', e.target.value)}
                                      placeholder="9/12/2024"
                                      className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-white text-sm">so remind me on this date with:</Label>
                                  <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="readyRemindSMS"
                                        checked={formData.readyRemindMethods?.sms || false}
                                        onChange={(e) => handleInputChange('readyRemindMethods', {...(formData.readyRemindMethods || {}), sms: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="readyRemindSMS" className="text-white text-sm">SMS</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="readyRemindEmail"
                                        checked={formData.readyRemindMethods?.email || false}
                                        onChange={(e) => handleInputChange('readyRemindMethods', {...(formData.readyRemindMethods || {}), email: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="readyRemindEmail" className="text-white text-sm">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="readyRemindCall"
                                        checked={formData.readyRemindMethods?.call || false}
                                        onChange={(e) => handleInputChange('readyRemindMethods', {...(formData.readyRemindMethods || {}), call: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="readyRemindCall" className="text-white text-sm">Call</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <input 
                                        type="checkbox" 
                                        id="readyRemindApp"
                                        checked={formData.readyRemindMethods?.app || false}
                                        onChange={(e) => handleInputChange('readyRemindMethods', {...(formData.readyRemindMethods || {}), app: e.target.checked})}
                                        className="w-3 h-3"
                                      />
                                      <Label htmlFor="readyRemindApp" className="text-white text-sm">App Notification</Label>
                                    </div>
                                  </div>
                                </div>

                                {/* Document Number and Attachment - Only shows when status is "applied" */}
                                <div className="space-y-3 border-t border-slate-600 pt-4">
                                  <Label className="text-white">TITLE/CONCURRENCE/YELLOW CARD NUMBER:</Label>
                                  <Input 
                                    value={formData.documentNumber || ''}
                                    onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                                    placeholder="____________________"
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">Add attachment</p>
                                    <Button variant="outline" className="mt-2" size="sm">
                                      Choose File
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Section F: Final Usage Declaration */}
        <Card className="mb-6 bg-slate-800/50 border-cyan-500/30">
          <Collapsible open={openSections.usage} onOpenChange={() => toggleSection('usage')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-cyan-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Section F: Final Usage Declaration
                  </div>
                  {openSections.usage ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">What do you want to do with this registered land?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {usageOptions.map((option) => (
                      <Card 
                        key={option.id} 
                        className="bg-slate-700/30 border-slate-600 hover:border-cyan-500/50 cursor-pointer transition-colors"
                      >
                        <CardContent className="p-4 text-center">
                          <option.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                          <p className="text-white text-sm">{option.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Post-Registration Media Views */}
        <Card className="mb-6 bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <CameraIcon className="w-6 h-6 mr-2" />
              Post-Registration Media Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-slate-700/30 rounded-lg p-6 mb-4">
                  <CameraIcon className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium">Aerial View</h4>
                  <p className="text-gray-400 text-sm">Drone capture of property from above</p>
                </div>
                <Button variant="outline" className="text-purple-400 border-purple-400">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Aerial View
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-slate-700/30 rounded-lg p-6 mb-4">
                  <Video className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium">Side View</h4>
                  <p className="text-gray-400 text-sm">Ground-level perspective shots</p>
                </div>
                <Button variant="outline" className="text-purple-400 border-purple-400">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Side View
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-slate-700/30 rounded-lg p-6 mb-4">
                  <RotateCcw className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium">360° View</h4>
                  <p className="text-gray-400 text-sm">Interactive panoramic capture</p>
                </div>
                <Button variant="outline" className="text-purple-400 border-purple-400">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload 360° View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Submit Section - Fixed text visibility */}
        <Card className="bg-slate-800/90 border-green-500/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Ready to Submit?</h2>
            <p className="text-white mb-6">
              Please review all sections before submitting your land registration form.
              Once submitted, you will receive a confirmation email and tracking number.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={previewForm} className="text-green-400 border-green-400 hover:bg-green-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Final Review
              </Button>
              <Button onClick={submitForm} className="bg-green-600 hover:bg-green-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Submit Land Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}