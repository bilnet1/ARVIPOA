import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Car, 
  Plane, 
  Ship, 
  Train,
  Bike,
  Upload,
  Camera,
  QrCode,
  FileText,
  Calendar,
  MapPin,
  User,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Award,
  CreditCard
} from 'lucide-react';

interface VehicleData {
  transportMode: string;
  vehicleType: string;
  make: string;
  model: string;
  year: string;
  color: string;
  engineNumber: string;
  chassisNumber: string;
  registrationNumber: string;
  ownerInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    licenseNumber: string;
  };
  vehicleUse: string;
  insuranceInfo: {
    company: string;
    policyNumber: string;
    expiryDate: string;
  };
}

export default function VehicleRegistration() {
  const [activeTab, setActiveTab] = useState('transport-mode');
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    transportMode: '',
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    color: '',
    engineNumber: '',
    chassisNumber: '',
    registrationNumber: '',
    ownerInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
      licenseNumber: ''
    },
    vehicleUse: '',
    insuranceInfo: {
      company: '',
      policyNumber: '',
      expiryDate: ''
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vehicle makes comprehensive list from document
  const vehicleMakes = [
    '9ff', 'Abarth', 'AC', 'ACM', 'Acura', 'Aiways', 'Aixam', 'Alba Mobility', 
    'Alfa Romeo', 'Alpina', 'Alpine', 'Amphicar', 'Angelelli Automobili', 'Ariel Motor',
    'Artega', 'Aspark', 'Aspid', 'Aston Martin', 'Audi', 'Aurus', 'Austin', 
    'Austin-Healey', 'Autobianchi', 'BAIC', 'Bedford', 'Bellier', 'Bentley', 'BMW',
    'Boldmen', 'Bolloré', 'Borgward', 'Brilliance', 'Bristol', 'Brute', 'Bugatti',
    'Buick', 'BYD', 'Cadillac', 'Caravans-Wohnm', 'Carver', 'Casalini', 'Caterham',
    'Cenntro', 'Changhe', 'Chatenet', 'Chery', 'Chevrolet', 'Chrysler', 'Cirelli',
    'Citroen', 'CityEL', 'Corvette', 'CUPRA', 'Dacia', 'Daewoo', 'DAF', 'Daihatsu',
    'Daimler', 'Dallara', 'Dangel', 'De la Chapelle', 'De Tomaso', 'Delorean',
    'Devinci Cars', 'DFSK', 'Dodge', 'Donkervoort', 'DR Automobiles', 'DS Automobiles',
    'Dutton', 'e.GO', 'Econelo', 'Edran', 'Elaris', 'Embuggy', 'EMC', 'Estrima',
    'Evetta', 'EVO', 'Ferrari', 'Fiat', 'FISKER', 'Ford', 'Forthing', 'Foton',
    'Gac Gonow', 'Galloper', 'Gappy', 'GAZ', 'GEM', 'GEMBALLA', 'Genesis', 'Giana',
    'Gillet', 'Giotti Victoria', 'GMC', 'Goupil', 'Great Wall', 'Grecav', 'GTA',
    'GWM', 'Haima', 'Hamann', 'Haval', 'Hiphi', 'Holden', 'Honda', 'Hongqi',
    'Hummer', 'Hurtan', 'Hyundai', 'ICH-X', 'Ineos', 'Infiniti', 'Innocenti',
    'Iso Rivolta', 'Isuzu', 'Iveco', 'IZH', 'JAC', 'Jaguar', 'Jeep', 'Jensen',
    'Karma', 'KG Mobility', 'Kia', 'Koenigsegg', 'KTM', 'Lada', 'Lamborghini',
    'Lancia', 'Land Rover', 'LDV', 'LEVC', 'Lexus', 'Lifan', 'Ligier', 'Lincoln',
    'Linzda', 'Lorinser', 'Lotus', 'Lucid', 'Lynk & Co', 'M-Ero', 'Mahindra',
    'MAN', 'Mansory', 'Martin', 'Martin Motors', 'Maserati', 'Matra', 'Maxus',
    'Maybach', 'Mazda', 'McLaren', 'Mega', 'Melex', 'Mercedes-Benz', 'Mercury',
    'MG', 'Micro', 'Microcar', 'Militem', 'Minari', 'Minauto', 'MINI', 'Mitsubishi',
    'Mitsuoka', 'Morgan', 'Moskvich', 'MP Lafer', 'MPM Motors', 'NIO', 'Nissan',
    'NSU', 'Oldsmobile', 'Oldtimer', 'Omoda', 'Opel', 'Ora', 'Pagani',
    'Panther Westwinds', 'Peugeot', 'PGO', 'Piaggio', 'Plymouth', 'Polestar',
    'Pontiac', 'Porsche', 'Proton', 'Puch', 'RAM', 'Regis', 'Reliant', 'Renault',
    'Rolls-Royce', 'Rover', 'Ruf', 'Saab', 'Santana', 'SEAT', 'Segway', 'Selvo',
    'Seres', 'Sevic', 'SGS', 'Shelby', 'Shuanghuan', 'Silence', 'Singer', 'Skoda',
    'Skywell', 'smart', 'SpeedArt', 'Sportequipe', 'Spyker', 'SsangYong', 'Stormborn',
    'StreetScooter', 'Studebaker', 'Subaru', 'Suzuki', 'Talbot', 'Tasso', 'Tata',
    'Tazzari EV', 'TECHART', 'Tesla', 'Togg', 'Town Life', 'TOYOTA', 'Trabant',
    'Trailer-Anhänger', 'Triumph', 'Trucks-Lkw', 'TVR', 'UAZ', 'Vanden Plas',
    'Vanderhall', 'VAZ', 'VEM', 'VinFast', 'Volkswagen', 'Volvo', 'Voyah',
    'Wartburg', 'Weltmeister', 'Wenckstern', 'Westfield', 'Wey', 'Wiesmann',
    'XBus', 'XEV', 'Xpeng', 'Zastava', 'Zaz', 'Zeekr', 'Zhidou', 'Zotye'
  ];

  // Vehicle models by make (sample for key brands)
  const vehicleModels: { [key: string]: string[] } = {
    'TOYOTA': [
      'Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Tacoma', 'Tundra',
      'Sienna', 'Avalon', 'C-HR', 'Venza', 'Land Cruiser', 'Sequoia', 'Supra',
      '4Runner', 'Yaris', 'Others'
    ],
    'Honda': [
      'Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V', 'Passport', 'Ridgeline',
      'Insight', 'Clarity', 'Others'
    ],
    'BMW': [
      '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series',
      '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
      'Z3', 'Z4', 'Z8', 'i3', 'i4', 'i8', 'iX', 'Others'
    ],
    'Mercedes-Benz': [
      'A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS',
      'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'SL', 'SLC', 'AMG GT',
      'EQA', 'EQB', 'EQC', 'EQS', 'Others'
    ],
    'Audi': [
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q1', 'Q2', 'Q3',
      'Q4 e-tron', 'Q5', 'Q6', 'Q7', 'Q8', 'TT', 'R8', 'e-tron GT', 'Others'
    ],
    'Ford': [
      'Fiesta', 'Focus', 'Mustang', 'Explorer', 'F-150', 'Escape', 'Edge',
      'Expedition', 'Ranger', 'Bronco', 'Transit', 'Others'
    ],
    'Chevrolet': [
      'Spark', 'Sonic', 'Cruze', 'Malibu', 'Impala', 'Camaro', 'Corvette',
      'Trax', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Silverado', 'Others'
    ]
  };

  // Transport modes and vehicle types
  const transportModes = [
    { id: 'land', name: 'LAND TRANSPORT', icon: Car, vehicles: ['Car', 'Motorcycle', 'Tipper', 'Truck', 'Transporter/Trailer'] },
    { id: 'air', name: 'AIR TRANSPORT', icon: Plane, vehicles: ['Helicopter', 'Drone/UAV', 'Jet'] },
    { id: 'water', name: 'WATER TRANSPORT', icon: Ship, vehicles: ['Vessel', 'Tugboat', 'Submarine', 'Speedboat', 'Skijet', 'Underwater Drone'] },
    { id: 'rail', name: 'RAIL TRANSPORT', icon: Train, vehicles: ['Train', 'Metro', 'Tram'] }
  ];

  const vehicleUseTypes = [
    'Private/Personal', 'Commercial', 'Taxi/Ride Share', 'Delivery/Logistics',
    'Emergency Services', 'Government', 'Educational', 'Agricultural', 'Construction',
    'Tourism', 'Others'
  ];

  const colors = [
    'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow',
    'Orange', 'Brown', 'Purple', 'Pink', 'Gold', 'Maroon', 'Navy', 'Others'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Vehicle/Machine Registration Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive registration for all types of vehicles and machines
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="transport-mode">Transport Mode</TabsTrigger>
            <TabsTrigger value="vehicle-details">Vehicle Details</TabsTrigger>
            <TabsTrigger value="owner-info">Owner Information</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
          </TabsList>

          {/* Transport Mode Selection */}
          <TabsContent value="transport-mode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">SELECT TRANSPORT MODE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {transportModes.map((mode) => {
                    const IconComponent = mode.icon;
                    return (
                      <Card 
                        key={mode.id} 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          vehicleData.transportMode === mode.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setVehicleData(prev => ({ 
                          ...prev, 
                          transportMode: mode.id,
                          vehicleType: '' // Reset vehicle type when transport mode changes
                        }))}
                      >
                        <CardContent className="p-6 text-center">
                          <IconComponent className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                          <h3 className="font-bold text-lg mb-2">{mode.name}</h3>
                          <div className="space-y-1">
                            {mode.vehicles.slice(0, 3).map((vehicle, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {vehicle}
                              </Badge>
                            ))}
                            {mode.vehicles.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{mode.vehicles.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {vehicleData.transportMode && (
                  <Card className="mt-6 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg">VEHICLE/MACHINE TYPE</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {transportModes
                          .find(mode => mode.id === vehicleData.transportMode)
                          ?.vehicles.map((vehicle) => (
                            <Card
                              key={vehicle}
                              className={`cursor-pointer transition-colors ${
                                vehicleData.vehicleType === vehicle
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setVehicleData(prev => ({ ...prev, vehicleType: vehicle }))}
                            >
                              <CardContent className="p-4 text-center">
                                <span className="font-medium text-sm">{vehicle}</span>
                              </CardContent>
                            </Card>
                          ))
                        }
                      </div>

                      {vehicleData.transportMode !== 'rail' && (
                        <div className="mt-4">
                          <Label htmlFor="otherVehicleType">Others: Please specify</Label>
                          <Input
                            id="otherVehicleType"
                            placeholder="Click here to enter text"
                            className="mt-2"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => setActiveTab('vehicle-details')}
                    disabled={!vehicleData.transportMode || !vehicleData.vehicleType}
                    className="w-48"
                  >
                    Continue to Vehicle Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicle Details */}
          <TabsContent value="vehicle-details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">VEHICLE/MACHINE DETAILS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Make and Model Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="make">VEHICLE/MACHINE MAKE *</Label>
                    <Select 
                      value={vehicleData.make} 
                      onValueChange={(value) => setVehicleData(prev => ({ 
                        ...prev, 
                        make: value,
                        model: '' // Reset model when make changes
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select make (e.g., Toyota)" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {vehicleMakes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-600 mt-1">
                      Will be selected from the list (example: Toyota)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="model">MODEL *</Label>
                    <Select 
                      value={vehicleData.model} 
                      onValueChange={(value) => setVehicleData(prev => ({ ...prev, model: value }))}
                      disabled={!vehicleData.make}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model (e.g., Corolla)" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleData.make && vehicleModels[vehicleData.make] ? 
                          vehicleModels[vehicleData.make].map((model) => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                          )) :
                          <SelectItem value="others">Others</SelectItem>
                        }
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-600 mt-1">
                      Will be selected from the list (example: Corolla)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="year">Year of Manufacture *</Label>
                    <Select 
                      value={vehicleData.year} 
                      onValueChange={(value) => setVehicleData(prev => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <Select 
                      value={vehicleData.color} 
                      onValueChange={(value) => setVehicleData(prev => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vehicleUse">Vehicle Use *</Label>
                    <Select 
                      value={vehicleData.vehicleUse} 
                      onValueChange={(value) => setVehicleData(prev => ({ ...prev, vehicleUse: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select use type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleUseTypes.map((use) => (
                          <SelectItem key={use} value={use}>{use}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="engineNumber">Engine Number *</Label>
                    <Input
                      id="engineNumber"
                      placeholder="Enter engine number"
                      value={vehicleData.engineNumber}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, engineNumber: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="chassisNumber">Chassis/VIN Number *</Label>
                    <Input
                      id="chassisNumber"
                      placeholder="Enter chassis/VIN number"
                      value={vehicleData.chassisNumber}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, chassisNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Current Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Enter current registration number (if any)"
                    value={vehicleData.registrationNumber}
                    onChange={(e) => setVehicleData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('transport-mode')}>
                    Back to Transport Mode
                  </Button>
                  <Button onClick={() => setActiveTab('owner-info')}>
                    Continue to Owner Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Owner Information */}
          <TabsContent value="owner-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">OWNER INFORMATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerName">Full Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Enter full name"
                      value={vehicleData.ownerInfo.name}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        ownerInfo: { ...prev.ownerInfo, name: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="licenseNumber">Driver's License Number *</Label>
                    <Input
                      id="licenseNumber"
                      placeholder="Enter license number"
                      value={vehicleData.ownerInfo.licenseNumber}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        ownerInfo: { ...prev.ownerInfo, licenseNumber: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerAddress">Address *</Label>
                  <Textarea
                    id="ownerAddress"
                    placeholder="Enter complete address"
                    value={vehicleData.ownerInfo.address}
                    onChange={(e) => setVehicleData(prev => ({
                      ...prev,
                      ownerInfo: { ...prev.ownerInfo, address: e.target.value }
                    }))}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerPhone">Phone Number *</Label>
                    <Input
                      id="ownerPhone"
                      placeholder="Enter phone number"
                      value={vehicleData.ownerInfo.phone}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        ownerInfo: { ...prev.ownerInfo, phone: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerEmail">Email Address</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      placeholder="Enter email address"
                      value={vehicleData.ownerInfo.email}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        ownerInfo: { ...prev.ownerInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('vehicle-details')}>
                    Back to Vehicle Details
                  </Button>
                  <Button onClick={() => setActiveTab('documentation')}>
                    Continue to Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">REQUIRED DOCUMENTATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Vehicle Purchase Receipt', required: true },
                    { title: 'Driver\'s License', required: true },
                    { title: 'National ID/Passport', required: true },
                    { title: 'Proof of Address', required: true },
                    { title: 'Vehicle Inspection Certificate', required: true },
                    { title: 'Import/Customs Documents', required: false }
                  ].map((doc, index) => (
                    <Card key={index} className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <CardContent className="p-6 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                        <h4 className="font-semibold mb-2">{doc.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {doc.required ? 'Required Document' : 'Optional Document'}
                        </p>
                        <Button className="w-full" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                          Document Requirements
                        </h4>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                          <li>• All documents must be clear and legible</li>
                          <li>• Accepted formats: PDF, JPG, PNG (max 5MB each)</li>
                          <li>• Documents must be current and valid</li>
                          <li>• Foreign documents may require translation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('owner-info')}>
                    Back to Owner Information
                  </Button>
                  <Button onClick={() => setActiveTab('insurance')}>
                    Continue to Insurance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance */}
          <TabsContent value="insurance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">INSURANCE INFORMATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="insuranceCompany">Insurance Company *</Label>
                    <Input
                      id="insuranceCompany"
                      placeholder="Enter insurance company name"
                      value={vehicleData.insuranceInfo.company}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        insuranceInfo: { ...prev.insuranceInfo, company: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="policyNumber">Policy Number *</Label>
                    <Input
                      id="policyNumber"
                      placeholder="Enter policy number"
                      value={vehicleData.insuranceInfo.policyNumber}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        insuranceInfo: { ...prev.insuranceInfo, policyNumber: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="expiryDate">Policy Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={vehicleData.insuranceInfo.expiryDate}
                      onChange={(e) => setVehicleData(prev => ({
                        ...prev,
                        insuranceInfo: { ...prev.insuranceInfo, expiryDate: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button className="w-full" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Insurance Certificate
                    </Button>
                  </div>
                </div>

                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Insurance Requirements
                        </h4>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Minimum third-party liability coverage required</li>
                          <li>• Policy must be valid for at least 30 days from registration</li>
                          <li>• Commercial vehicles require commercial insurance</li>
                          <li>• Coverage must match vehicle specifications</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('documentation')}>
                    Back to Documentation
                  </Button>
                  <Button onClick={() => setActiveTab('completion')}>
                    Continue to Completion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completion */}
          <TabsContent value="completion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">REGISTRATION SUMMARY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Vehicle Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Transport Mode:</span>
                        <span className="font-medium capitalize">{vehicleData.transportMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehicle Type:</span>
                        <span className="font-medium">{vehicleData.vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Make:</span>
                        <span className="font-medium">{vehicleData.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Model:</span>
                        <span className="font-medium">{vehicleData.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-medium">{vehicleData.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span className="font-medium">{vehicleData.color}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Registration Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Vehicle details completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Owner information provided</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm">Documents pending verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Insurance information provided</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Award className="h-16 w-16 mx-auto text-green-600" />
                      <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                        Registration Application Submitted
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        Your vehicle registration application has been submitted successfully. 
                        You will receive updates on the verification process via email and SMS.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Application Receipt
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Registration Fees
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Inspection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}