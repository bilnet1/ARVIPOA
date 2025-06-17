import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, QrCode, AlertTriangle, Upload, Download, 
  UserPlus, ArrowLeft, Eye, CheckCircle, MapPin,
  Award, KeyRound, Server, Globe, Database, Cpu, 
  Heart, Activity, Beef
} from 'lucide-react';
import { Link } from 'react-router-dom';
import arvipoaLogo from '@assets/arvipoa upgraded logo.png';

export default function LivestockRegistrationModule() {
  const [activeTab, setActiveTab] = useState('register');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  const [formData, setFormData] = useState({
    animalType: '',
    breed: '',
    tagId: '',
    ownerName: '',
    usagePurpose: '',
    healthStatus: '',
    vaccinationRecord: '',
    location: '',
    authorizedUsers: [] as string[],
    proofOfOwnership: null as File | null,
    reportLostStolen: false
  });

  const [registeredAnimals, setRegisteredAnimals] = useState([
    {
      id: 1,
      animalType: 'Cow',
      breed: 'Holstein',
      tagId: '900134',
      ownerName: 'William',
      status: 'verified',
      licenseTag: 'ARV-LIVE-2025-C7D8E9F1',
      registrationDate: '2025-01-20',
      usagePurpose: 'Commercial',
      healthStatus: 'Healthy',
      authorizedUsers: ['William', 'Farm Manager'],
      location: 'Ashanti Region'
    },
    {
      id: 2,
      animalType: 'Goat',
      breed: 'Boer',
      tagId: '800275',
      ownerName: 'Mary',
      status: 'pending',
      licenseTag: 'ARV-LIVE-2025-G3H4I5J6',
      registrationDate: '2025-02-01',
      usagePurpose: 'Personal',
      healthStatus: 'Vaccinated',
      authorizedUsers: ['Mary'],
      location: 'Greater Accra'
    }
  ]);

  const animalTypes = [
    'Cow', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Duck', 'Turkey', 
    'Horse', 'Donkey', 'Buffalo', 'Rabbit', 'Guinea Fowl'
  ];

  const cowBreeds = [
    'Holstein', 'Angus', 'Hereford', 'Brahman', 'Charolais', 'Simmental',
    'Limousin', 'Shorthorn', 'Friesian', 'Jersey', 'Guernsey'
  ];

  const goatBreeds = [
    'Boer', 'Nubian', 'Saanen', 'Alpine', 'LaMancha', 'Oberhasli',
    'Toggenburg', 'Nigerian Dwarf', 'Angora', 'Cashmere'
  ];

  const sheepBreeds = [
    'Merino', 'Suffolk', 'Dorper', 'Romney', 'Leicester', 'Corriedale',
    'Border Leicester', 'Texel', 'Jacob', 'Katahdin'
  ];

  const getBreedOptions = () => {
    switch (formData.animalType) {
      case 'Cow': return cowBreeds;
      case 'Goat': return goatBreeds;
      case 'Sheep': return sheepBreeds;
      default: return ['Mixed Breed', 'Pure Breed', 'Cross Breed'];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleRegisterAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    const licenseTag = `ARV-LIVE-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newAnimal = {
      id: registeredAnimals.length + 1,
      ...formData,
      ownerName: formData.ownerName || 'Current User',
      status: 'pending',
      licenseTag,
      registrationDate: new Date().toISOString().split('T')[0]
    };
    
    setRegisteredAnimals([...registeredAnimals, newAnimal]);
    setFormData({
      animalType: '',
      breed: '',
      tagId: '',
      ownerName: '',
      usagePurpose: '',
      healthStatus: '',
      vaccinationRecord: '',
      location: '',
      authorizedUsers: [],
      proofOfOwnership: null,
      reportLostStolen: false
    });
    alert('Livestock registered successfully! Your ARVIPOA license has been generated.');
  };

  const handleReportStolen = (animalId: number) => {
    setRegisteredAnimals(animals => 
      animals.map(animal => 
        animal.id === animalId 
          ? { ...animal, status: 'flagged', location: 'Unknown - Reported Lost/Stolen' }
          : animal
      )
    );
    alert('Animal reported as lost/stolen. ARVIPOA network has been notified.');
  };

  const generateCertificate = (animal: any) => {
    setSelectedAnimal(animal);
    setShowCertificateModal(true);
  };

  const getAnimalEmoji = (type: string) => {
    const emojiMap: Record<string, string> = {
      'Cow': '🐄', 'Goat': '🐐', 'Sheep': '🐑', 'Pig': '🐷',
      'Chicken': '🐔', 'Duck': '🦆', 'Turkey': '🦃', 'Horse': '🐴',
      'Donkey': '🐴', 'Buffalo': '🐃', 'Rabbit': '🐰', 'Guinea Fowl': '🐓'
    };
    return emojiMap[type] || '🐾';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/registration-hub" className="inline-flex items-center text-green-400 hover:text-green-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration Hub
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img src={arvipoaLogo} alt="ARVIPOA" className="w-16 h-16" />
              
              {/* Livestock Visual */}
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-4xl">
                  🐄
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-4xl">
                  🐐
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-4xl">
                  🐑
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Livestock Registration
                </h1>
                <p className="text-gray-300 mt-2">
                  Secure livestock management with ARVIPOA's intelligent tracking system
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
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-gray-300">Animal Welfare Certified</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="register" className="data-[state=active]:bg-green-600">
              Register Animal
            </TabsTrigger>
            <TabsTrigger value="livestock" className="data-[state=active]:bg-green-600">
              My Livestock
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-green-600">
              Health Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-8">
                <form onSubmit={handleRegisterAnimal} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300 text-lg">Animal Type</Label>
                      <Select value={formData.animalType} onValueChange={(value) => setFormData({...formData, animalType: value, breed: ''})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white h-12">
                          <SelectValue placeholder="Cow" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600 max-h-60 overflow-y-auto">
                          {animalTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                              {getAnimalEmoji(type)} {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-lg">Breed</Label>
                      <Select value={formData.breed} onValueChange={(value) => setFormData({...formData, breed: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white h-12">
                          <SelectValue placeholder="Select breed" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600 max-h-60 overflow-y-auto">
                          {getBreedOptions().map((breed) => (
                            <SelectItem key={breed} value={breed} className="text-white hover:bg-slate-600">
                              {breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300 text-lg">Tag ID</Label>
                      <div className="relative">
                        <Input
                          value={formData.tagId}
                          onChange={(e) => setFormData({...formData, tagId: e.target.value})}
                          placeholder="900134"
                          className="mt-1 bg-slate-700 border-gray-600 text-white h-12 text-lg"
                          required
                        />
                        <Button
                          type="button"
                          className="absolute right-2 top-3 bg-gray-600 hover:bg-gray-700 text-white h-8 px-4 text-sm"
                        >
                          Upload Ownership
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-lg">Owner Name</Label>
                      <Input
                        value={formData.ownerName}
                        onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                        placeholder="William"
                        className="mt-1 bg-slate-700 border-gray-600 text-white h-12 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 text-lg">Usage Purpose</Label>
                    <div className="flex space-x-6 mt-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usagePurpose"
                          value="Personal"
                          checked={formData.usagePurpose === 'Personal'}
                          onChange={(e) => setFormData({...formData, usagePurpose: e.target.value})}
                          className="w-5 h-5 text-green-600"
                        />
                        <span className="text-gray-300 text-lg">Personal</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usagePurpose"
                          value="Rental"
                          checked={formData.usagePurpose === 'Rental'}
                          onChange={(e) => setFormData({...formData, usagePurpose: e.target.value})}
                          className="w-5 h-5 text-green-600"
                        />
                        <span className="text-gray-300 text-lg">Rental</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usagePurpose"
                          value="Commercial"
                          checked={formData.usagePurpose === 'Commercial'}
                          onChange={(e) => setFormData({...formData, usagePurpose: e.target.value})}
                          className="w-5 h-5 text-green-600"
                        />
                        <span className="text-gray-300 text-lg">Commercial</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300">Health Status</Label>
                      <Select value={formData.healthStatus} onValueChange={(value) => setFormData({...formData, healthStatus: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select health status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600">
                          <SelectItem value="Healthy" className="text-white hover:bg-slate-600">Healthy</SelectItem>
                          <SelectItem value="Vaccinated" className="text-white hover:bg-slate-600">Vaccinated</SelectItem>
                          <SelectItem value="Under Treatment" className="text-white hover:bg-slate-600">Under Treatment</SelectItem>
                          <SelectItem value="Quarantined" className="text-white hover:bg-slate-600">Quarantined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Enter farm/location"
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Report Lost or Stolen Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <span className="text-gray-300 text-lg">Report Lost or Stolen</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.reportLostStolen}
                        onChange={(e) => setFormData({...formData, reportLostStolen: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-center space-x-4 pt-6">
                    <Button 
                      type="button"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg"
                      onClick={() => setShowAddUserModal(true)}
                    >
                      Add User
                    </Button>
                    <Button 
                      type="button"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-lg"
                      onClick={() => alert('Connecting to ARVIPOA Slaughter House Network...')}
                    >
                      <Beef className="w-5 h-5 mr-2" />
                      Contact Slaughter House
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-bold rounded-lg"
                    >
                      REGISTER LIVESTOCK
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="livestock">
            <div className="space-y-6">
              {registeredAnimals.map((animal) => (
                <Card key={animal.id} className="bg-slate-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
                          {getAnimalEmoji(animal.animalType)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {animal.breed} {animal.animalType}
                            </h3>
                            <Badge className={getStatusColor(animal.status)}>
                              {animal.status}
                            </Badge>
                            {animal.status === 'verified' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <QrCode className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300">Tag ID:</span>
                              <code className="text-cyan-400 font-mono">{animal.tagId}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">Owner:</span>
                              <span className="text-green-400">{animal.ownerName}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Location:</span>
                              <span className="text-orange-400">{animal.location}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-pink-400" />
                              <span className="text-gray-300">Health:</span>
                              <span className="text-pink-400">{animal.healthStatus}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {animal.status !== 'flagged' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => generateCertificate(animal)}
                              className="text-green-400 border-green-400 hover:bg-green-400/10"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Certificate
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReportStolen(animal.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/10"
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Report Lost
                            </Button>
                          </>
                        )}
                        
                        {animal.status === 'flagged' && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            LOST/STOLEN
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-400 font-semibold mb-2">HEALTH MONITORING</h3>
                  <p className="text-gray-300 text-sm">Track vaccinations and health status</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-blue-400 font-semibold mb-2">ACTIVITY TRACKING</h3>
                  <p className="text-gray-300 text-sm">Monitor movement and behavior patterns</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-purple-400 font-semibold mb-2">BOUNDARY PROTECTION</h3>
                  <p className="text-gray-300 text-sm">Smart Boundary Pillar detection system</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Certificate Modal */}
      {showCertificateModal && selectedAnimal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-gray-700 w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Smart Certificate</CardTitle>
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
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                  {getAnimalEmoji(selectedAnimal.animalType)}
                </div>
                <QrCode className="w-16 h-16 text-cyan-400 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-white">ID: {selectedAnimal.tagId}</h3>
                  <p className="text-gray-300">Owner: {selectedAnimal.ownerName}</p>
                  <p className="text-green-400">Status: {selectedAnimal.status}</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-gray-700 w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Add Authorized User</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">User Name</Label>
                  <Input
                    placeholder="Enter authorized user name"
                    className="mt-1 bg-slate-700 border-gray-600 text-white"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}