import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, Shield, QrCode, MapPin, AlertTriangle, Lock, 
  Upload, Download, UserPlus, ArrowLeft, Eye, Wifi,
  CheckCircle, Clock, Flag, ArrowLeftRight, Fingerprint,
  RadioIcon, Satellite, Cpu, Database, CreditCard,
  Award, KeyRound, Server, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import arvipoaLogo from '@assets/arvipoa upgraded logo.png';

export default function AutoRegistrationModule() {
  const [activeTab, setActiveTab] = useState('register');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    licensePlate: '',
    brand: '',
    model: '',
    vehicleType: '',
    serialNumber: '',
    engineNumber: '',
    usagePurpose: '',
    securityFeatures: [] as string[],
    authorizedUsers: [] as string[],
    proofOfOwnership: null as File | null
  });

  const [registeredVehicles, setRegisteredVehicles] = useState([
    {
      id: 1,
      licensePlate: 'GE-4567-25',
      brand: 'Mercedes-Benz',
      model: 'GLE 450',
      vehicleType: 'SUV',
      status: 'verified',
      licenseTag: 'ARV-AUTO-2025-M7N8P9Q1',
      registrationDate: '2025-01-20',
      usagePurpose: 'Personal',
      securityFeatures: ['GPS Tracker', 'RFID Chip', 'Biometric Lock'],
      authorizedUsers: ['John Doe', 'Jane Doe'],
      lastLocation: 'Accra, Ghana'
    },
    {
      id: 2,
      licensePlate: 'AS-8901-24',
      brand: 'Toyota',
      model: 'Camry',
      vehicleType: 'Sedan',
      status: 'pending',
      licenseTag: 'ARV-AUTO-2024-K3L4M5N6',
      registrationDate: '2024-12-15',
      usagePurpose: 'Commercial',
      securityFeatures: ['GPS Tracker'],
      authorizedUsers: ['Mike Johnson'],
      lastLocation: 'Kumasi, Ghana'
    },
    {
      id: 3,
      licensePlate: 'BA-2345-25',
      brand: 'Volkswagen',
      model: 'Tiguan',
      vehicleType: 'SUV',
      status: 'flagged',
      licenseTag: 'ARV-AUTO-2025-R7S8T9U2',
      registrationDate: '2025-02-01',
      usagePurpose: 'Rental',
      securityFeatures: ['GPS Tracker', 'RFID Chip'],
      authorizedUsers: ['Sarah Wilson'],
      lastLocation: 'Unknown - Reported Stolen'
    }
  ]);

  const vehicleBrands = [
    'Mercedes-Benz', 'BMW', 'Audi', 'Toyota', 'Honda', 'Nissan', 
    'Volkswagen', 'Ford', 'Chevrolet', 'Hyundai', 'Kia', 'Mazda'
  ];

  const vehicleTypes = [
    'Sedan', 'SUV', 'Hatchback', 'Pickup', 'Van', 'Truck', 'Motorcycle', 'Bus'
  ];

  const securityOptions = [
    'GPS Tracker', 'RFID Chip', 'Biometric Lock', 'Alarm System', 
    'Immobilizer', 'Dash Cam', 'Remote Engine Start', 'Smart Boundary Pillar Detection'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-300';
      case 'transferred': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleRegisterVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const licenseTag = `ARV-AUTO-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newVehicle = {
      id: registeredVehicles.length + 1,
      ...formData,
      status: 'pending',
      licenseTag,
      registrationDate: new Date().toISOString().split('T')[0],
      lastLocation: 'Registration Location'
    };
    
    setRegisteredVehicles([...registeredVehicles, newVehicle]);
    setFormData({
      licensePlate: '',
      brand: '',
      model: '',
      vehicleType: '',
      serialNumber: '',
      engineNumber: '',
      usagePurpose: '',
      securityFeatures: [],
      authorizedUsers: [],
      proofOfOwnership: null
    });
    alert('Vehicle registered successfully! Your ARVIPOA license has been generated.');
  };

  const handleReportStolen = (vehicleId: number) => {
    setRegisteredVehicles(vehicles => 
      vehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, status: 'flagged', lastLocation: 'Unknown - Reported Stolen' }
          : vehicle
      )
    );
    alert('Vehicle reported as stolen. ARVIPOA network and IoT towers have been notified.');
  };

  const generateCertificate = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowCertificateModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/registration-hub" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration Hub
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img src={arvipoaLogo} alt="ARVIPOA" className="w-16 h-16" />
              
              {/* Vehicle Visual Mockups */}
              <div className="flex space-x-4">
                <div className="w-24 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center border-2 border-cyan-400">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div className="w-24 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center border-2 border-orange-400">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div className="w-24 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border-2 border-green-400">
                  <Car className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AUTO REGISTRATION
                </h1>
                <p className="text-gray-300 mt-2">
                  Secure your vehicles with ARVIPOA's intelligent asset protection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Security Badges */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 text-sm">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Firebase Enterprise</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <KeyRound className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Server className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">OpenAI Enterprise API</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Blockchain Verified</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="register" className="data-[state=active]:bg-cyan-600">
              Register Vehicle
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-cyan-600">
              My Vehicles
            </TabsTrigger>
            <TabsTrigger value="protection" className="data-[state=active]:bg-cyan-600">
              Theft Protection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Car className="w-6 h-6 mr-2 text-cyan-400" />
                  Auto License Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisterVehicle} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300">License Plate *</Label>
                      <Input
                        value={formData.licensePlate}
                        onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                        placeholder="Enter license plate"
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Vehicle Brand *</Label>
                      <Select value={formData.brand} onValueChange={(value) => setFormData({...formData, brand: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600 max-h-60 overflow-y-auto">
                          {vehicleBrands.map((brand) => (
                            <SelectItem key={brand} value={brand} className="text-white hover:bg-slate-600">
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Model *</Label>
                      <Input
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        placeholder="Enter model"
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Vehicle Type *</Label>
                      <Select value={formData.vehicleType} onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600">
                          {vehicleTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Chassis/VIN Number *</Label>
                      <Input
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                        placeholder="Enter chassis/VIN number"
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Engine Number</Label>
                      <Input
                        value={formData.engineNumber}
                        onChange={(e) => setFormData({...formData, engineNumber: e.target.value})}
                        placeholder="Enter engine number"
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Usage Purpose *</Label>
                      <Select value={formData.usagePurpose} onValueChange={(value) => setFormData({...formData, usagePurpose: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select usage" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600">
                          <SelectItem value="Personal" className="text-white hover:bg-slate-600">Personal</SelectItem>
                          <SelectItem value="Commercial" className="text-white hover:bg-slate-600">Commercial</SelectItem>
                          <SelectItem value="Rental" className="text-white hover:bg-slate-600">Rental</SelectItem>
                          <SelectItem value="Government" className="text-white hover:bg-slate-600">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Proof of Ownership</Label>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, proofOfOwnership: e.target.files?.[0] || null})}
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Security Features</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {securityOptions.map((option) => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.securityFeatures.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, securityFeatures: [...formData.securityFeatures, option]});
                              } else {
                                setFormData({...formData, securityFeatures: formData.securityFeatures.filter(f => f !== option)});
                              }
                            }}
                            className="w-4 h-4 text-cyan-600 bg-slate-700 border-gray-600 rounded"
                          />
                          <span className="text-gray-300 text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      <Car className="w-5 h-5 mr-2" />
                      REGISTER VEHICLE
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles">
            <div className="space-y-6">
              {registeredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="bg-slate-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                          <Car className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {vehicle.brand} {vehicle.model}
                            </h3>
                            <Badge className={getStatusColor(vehicle.status)}>
                              {vehicle.status}
                            </Badge>
                            {vehicle.status === 'verified' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300">License Plate:</span>
                              <code className="text-cyan-400 font-mono">{vehicle.licensePlate}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <QrCode className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">License Tag:</span>
                              <code className="text-green-400 font-mono">{vehicle.licenseTag}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Last Location:</span>
                              <span className="text-orange-400">{vehicle.lastLocation}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300">Security:</span>
                              <span className="text-purple-400">{vehicle.securityFeatures.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {vehicle.status !== 'flagged' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => generateCertificate(vehicle)}
                              className="text-green-400 border-green-400 hover:bg-green-400/10"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Certificate
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReportStolen(vehicle.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/10"
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Report Stolen
                            </Button>
                          </>
                        )}
                        
                        {vehicle.status === 'flagged' && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            STOLEN - BLACKLISTED
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="protection">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-red-500/30">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-red-400 font-semibold mb-2">BLACKLIST</h3>
                  <p className="text-gray-300 text-sm">Prevent stolen vehicle resale</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-yellow-400 font-semibold mb-2">DISABLE</h3>
                  <p className="text-gray-300 text-sm">Remote engine immobilization</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30">
                <CardContent className="p-6 text-center">
                  <Satellite className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-cyan-400 font-semibold mb-2">NOTIFY UHPOA IoT TOWERS</h3>
                  <p className="text-gray-300 text-sm">Alert network infrastructure</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Certificate Modal */}
      {showCertificateModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-gray-700 w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Smart Ownership Certificate</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCertificateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <QrCode className="w-24 h-24 text-cyan-400 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedVehicle.brand} {selectedVehicle.model}</h3>
                  <p className="text-gray-300">License: {selectedVehicle.licensePlate}</p>
                  <p className="text-gray-300">Tag: {selectedVehicle.licenseTag}</p>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}