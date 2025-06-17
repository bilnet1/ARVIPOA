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
  Smartphone, Shield, ArrowLeftRight, Mic, DollarSign, 
  QrCode, CheckCircle, AlertTriangle, Eye, Lock, Download,
  Upload, Phone, ArrowLeft, Fingerprint, MapPin, Wifi
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobilePropertyDashboard() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Mock registered devices data
  const [registeredDevices, setRegisteredDevices] = useState([
    {
      id: 1,
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      imei: '356052094279651',
      status: 'verified',
      registrationDate: '2025-01-15',
      licenseTag: 'ARV-MOB-2025-A7B9C2D1E5',
      certificateValid: '11/15/2025',
      lastLocation: 'Accra, Ghana',
      purchasePrice: 4500,
      image: '/api/placeholder/phone-image-1'
    },
    {
      id: 2,
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      imei: '356052094279652',
      status: 'pending',
      registrationDate: '2025-06-01',
      licenseTag: 'ARV-MOB-2025-B8C3F6G9',
      certificateValid: '06/01/2026',
      lastLocation: 'Kumasi, Ghana',
      purchasePrice: 4200,
      image: '/api/placeholder/phone-image-2'
    },
    {
      id: 3,
      brand: 'Google',
      model: 'Pixel 8 Pro',
      imei: '356052094279653',
      status: 'flagged',
      registrationDate: '2024-12-10',
      licenseTag: 'ARV-MOB-2024-C9D4H7K2',
      certificateValid: '12/10/2025',
      lastLocation: 'Unknown',
      purchasePrice: 3800,
      image: '/api/placeholder/phone-image-3'
    }
  ]);

  const [newDevice, setNewDevice] = useState({
    brand: '',
    model: '',
    imei: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    proofOfOwnership: null as File | null
  });

  const phoneBrands = [
    { name: 'Apple', logo: '🍎' },
    { name: 'Samsung', logo: 'S' },
    { name: 'Google', logo: 'G' },
    { name: 'Huawei', logo: 'H' },
    { name: 'OnePlus', logo: '1+' },
    { name: 'Oppo', logo: 'O' },
    { name: 'Nokia', logo: 'N' }
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

  const generateLicenseTag = () => {
    const tag = `ARV-MOB-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return tag;
  };

  const handleRegisterDevice = (e: React.FormEvent) => {
    e.preventDefault();
    const licenseTag = generateLicenseTag();
    const newRegistration = {
      id: registeredDevices.length + 1,
      ...newDevice,
      status: 'pending',
      registrationDate: new Date().toISOString().split('T')[0],
      licenseTag,
      certificateValid: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lastLocation: 'Registration Location',
      purchasePrice: parseFloat(newDevice.purchasePrice),
      image: '/api/placeholder/phone-new'
    };
    
    setRegisteredDevices([...registeredDevices, newRegistration]);
    setNewDevice({
      brand: '',
      model: '',
      imei: '',
      serialNumber: '',
      purchaseDate: '',
      purchasePrice: '',
      proofOfOwnership: null
    });
    setShowRegistrationForm(false);
    alert('Mobile device registered successfully! Your ARVIPOA license has been generated.');
  };

  const handleTheftReport = (deviceId: number) => {
    setRegisteredDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'flagged', lastLocation: 'Unknown - Reported Stolen' }
          : device
      )
    );
    alert('Device reported as stolen. ARVIPOA network has been notified and device is now blacklisted.');
  };

  const handleRemoteDisable = (deviceId: number) => {
    alert('Remote disable command sent. Device will be locked when it connects to any network.');
  };

  const generateCertificate = (device: any) => {
    alert(`Smart Ownership Certificate generated for ${device.brand} ${device.model} (IMEI: ${device.imei})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                MOBILE PHONE REGISTRATION AND PROTECTION
              </h1>
              <p className="text-gray-300 mt-2">
                Register and safeguard your mobile phones with ARVIPOA's intelligent asset registry
              </p>
            </div>
            <Button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Register New Device
            </Button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-cyan-400 font-semibold mb-2">THEFT PROTECTION</h3>
              <p className="text-gray-300 text-sm">Blacklist stolen phones, Smart Boundary Pillar detection</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6 text-center">
              <ArrowLeftRight className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-400 font-semibold mb-2">TRANSFER OWNERSHIP</h3>
              <p className="text-gray-300 text-sm">Gift, resell, or inherit mobile devices securely</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Mic className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-purple-400 font-semibold mb-2">VOICE COMMAND</h3>
              <p className="text-gray-300 text-sm">Remotely disable a phone with optional biometric confirmation</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-orange-400 font-semibold mb-2">MARKETPLACE LOCK</h3>
              <p className="text-gray-300 text-sm">Flag stolen devices to prevent resale</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="devices" className="data-[state=active]:bg-cyan-600">
              Registered Devices
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-cyan-600">
              Smart Certificates
            </TabsTrigger>
            <TabsTrigger value="transfers" className="data-[state=active]:bg-cyan-600">
              Transfer History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid gap-6">
              {registeredDevices.map((device) => (
                <Card key={device.id} className="bg-slate-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        {/* Device Mockup */}
                        <div className="relative">
                          <div className="w-20 h-36 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl border-2 border-gray-600 flex items-center justify-center">
                            <div className="w-16 h-28 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                              <Smartphone className="w-8 h-8 text-blue-200" />
                            </div>
                          </div>
                          <Badge className={`absolute -top-2 -right-2 ${getStatusColor(device.status)}`}>
                            {device.status}
                          </Badge>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {device.brand} {device.model}
                            </h3>
                            {device.status === 'verified' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Fingerprint className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300">IMEI:</span>
                              <code className="text-cyan-400 font-mono">{device.imei}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <QrCode className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">License Tag:</span>
                              <code className="text-green-400 font-mono">{device.licenseTag}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Last Location:</span>
                              <span className="text-orange-400">{device.lastLocation}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-300">Certificate Valid Until:</span>
                              <span className="text-yellow-400">{device.certificateValid}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {device.status !== 'flagged' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => generateCertificate(device)}
                              className="text-green-400 border-green-400 hover:bg-green-400/10"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Certificate
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTheftReport(device.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/10"
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Report Stolen
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoteDisable(device.id)}
                              className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
                            >
                              <Lock className="w-4 h-4 mr-1" />
                              Remote Disable
                            </Button>
                          </>
                        )}
                        
                        {device.status === 'flagged' && (
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

          <TabsContent value="certificates" className="space-y-6">
            <div className="text-center py-12">
              <QrCode className="w-24 h-24 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Smart Ownership Certificates</h3>
              <p className="text-gray-400 mb-6">Download and manage your device certificates with QR verification</p>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Download className="w-4 h-4 mr-2" />
                Download All Certificates
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <div className="text-center py-12">
              <ArrowLeftRight className="w-24 h-24 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Transfer History</h3>
              <p className="text-gray-400 mb-6">Track ownership transfers, gifts, and sales</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Initiate Transfer
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Supported Brands */}
        <Card className="bg-slate-800/30 border-gray-700 mt-8">
          <CardContent className="p-6">
            <h3 className="text-center text-white text-lg font-semibold mb-6">Supported Mobile Brands</h3>
            <div className="flex justify-center items-center space-x-8 text-4xl">
              {phoneBrands.map((brand, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-2 text-2xl">
                    {brand.logo}
                  </div>
                  <span className="text-xs text-gray-400">{brand.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRegistrationForm(false);
            }
          }}
        >
          <Card className="bg-slate-800 border-gray-700 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Register New Mobile Device</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterDevice} className="space-y-4">
                <div>
                  <Label className="text-gray-300">Brand</Label>
                  <Select value={newDevice.brand} onValueChange={(value) => setNewDevice({...newDevice, brand: value})}>
                    <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-gray-600">
                      {phoneBrands.map((brand) => (
                        <SelectItem key={brand.name} value={brand.name} className="text-white hover:bg-slate-600">
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Model</Label>
                  <Input
                    value={newDevice.model}
                    onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
                    placeholder="e.g., iPhone 15 Pro"
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-300">IMEI Number</Label>
                  <Input
                    value={newDevice.imei}
                    onChange={(e) => setNewDevice({...newDevice, imei: e.target.value})}
                    placeholder="15-digit IMEI number"
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                    maxLength={15}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Dial *#06# to find your IMEI</p>
                </div>

                <div>
                  <Label className="text-gray-300">Purchase Date</Label>
                  <Input
                    type="date"
                    value={newDevice.purchaseDate}
                    onChange={(e) => setNewDevice({...newDevice, purchaseDate: e.target.value})}
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Purchase Price (₵)</Label>
                  <Input
                    type="number"
                    value={newDevice.purchasePrice}
                    onChange={(e) => setNewDevice({...newDevice, purchasePrice: e.target.value})}
                    placeholder="Enter purchase price"
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Proof of Ownership</Label>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setNewDevice({...newDevice, proofOfOwnership: e.target.files?.[0] || null})}
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Upload receipt, warranty, or purchase document</p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                  >
                    Register Device
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}