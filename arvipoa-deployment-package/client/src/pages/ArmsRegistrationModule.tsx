import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, QrCode, AlertTriangle, Lock, Upload, Download, 
  UserPlus, ArrowLeft, Eye, CheckCircle, Clock, Flag,
  ArrowLeftRight, Fingerprint, Award, KeyRound, Server, 
  Globe, Database, Cpu, Target, Zap, Camera, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import arvipoaLogo from '@assets/arvipoa upgraded logo.png';

export default function ArmsRegistrationModule() {
  const [activeTab, setActiveTab] = useState('register');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<any>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  const [formData, setFormData] = useState({
    licenseNumber: '',
    make: '',
    model: '',
    weaponClass: '',
    serialNumber: '',
    usagePurpose: '',
    securityFeatures: [] as string[],
    authorizedUsers: [] as string[],
    proofOfOwnership: null as File | null,
    permitDocument: null as File | null
  });

  const [registeredWeapons, setRegisteredWeapons] = useState([
    {
      id: 1,
      licenseNumber: '0385734',
      make: 'Smith & Wesson',
      model: 'M&P9 Shield',
      weaponClass: 'Domestic',
      serialNumber: 'JEH6739',
      status: 'verified',
      licenseTag: 'ARV-ARMS-2025-W7X8Y9Z1',
      registrationDate: '2025-01-15',
      usagePurpose: 'Personal use',
      securityFeatures: ['IWAMOS (Biometric Lock, RFID Chip, GPS Tracker)'],
      authorizedUsers: ['John Doe'],
      lastLocation: 'Accra, Ghana'
    },
    {
      id: 2,
      licenseNumber: '0472819',
      make: 'Glock',
      model: 'G19',
      weaponClass: 'Domestic',
      serialNumber: 'ABC1234',
      status: 'pending',
      licenseTag: 'ARV-ARMS-2025-A2B3C4D5',
      registrationDate: '2025-02-01',
      usagePurpose: 'Security',
      securityFeatures: ['IWAMOS (Biometric Lock)'],
      authorizedUsers: ['Security Team Lead'],
      lastLocation: 'Kumasi, Ghana'
    }
  ]);

  const weaponMakes = [
    'Smith & Wesson', 'Glock', 'Sig Sauer', 'Beretta', 'Colt', 
    'Ruger', 'Springfield', 'Taurus', 'Walther', 'H&K', 'Adler', 'Pardus'
  ];

  const weaponClasses = [
    'Domestic', 'Commercial', 'Law Enforcement', 'Military', 'Sport/Competition'
  ];

  const securityOptions = [
    'Biometric Lock', 'RFID Chip', 'GPS Tracker', 'Smart Safe', 
    'Trigger Lock', 'Cable Lock', 'Alarm System', 'Smart Boundary Pillar Detection',
    'IWAMOS (Intelligent Weapon & Arms Monitoring and Observation System)'
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

  const handleRegisterWeapon = (e: React.FormEvent) => {
    e.preventDefault();
    const licenseTag = `ARV-ARMS-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newWeapon = {
      id: registeredWeapons.length + 1,
      ...formData,
      status: 'pending',
      licenseTag,
      registrationDate: new Date().toISOString().split('T')[0],
      lastLocation: 'Registration Location'
    };
    
    setRegisteredWeapons([...registeredWeapons, newWeapon]);
    setFormData({
      licenseNumber: '',
      make: '',
      model: '',
      weaponClass: '',
      serialNumber: '',
      usagePurpose: '',
      securityFeatures: [],
      authorizedUsers: [],
      proofOfOwnership: null,
      permitDocument: null
    });
    alert('Weapon registered successfully! Your ARVIPOA license has been generated.');
  };

  const handleReportStolen = (weaponId: number) => {
    setRegisteredWeapons(weapons => 
      weapons.map(weapon => 
        weapon.id === weaponId 
          ? { ...weapon, status: 'flagged', lastLocation: 'Unknown - Reported Stolen' }
          : weapon
      )
    );
    alert('Weapon reported as stolen. ARVIPOA network and law enforcement have been notified.');
  };

  const generateCertificate = (weapon: any) => {
    setSelectedWeapon(weapon);
    setShowCertificateModal(true);
  };

  const addAuthorizedUser = (weaponId: number, userName: string) => {
    setRegisteredWeapons(weapons => 
      weapons.map(weapon => 
        weapon.id === weaponId 
          ? { ...weapon, authorizedUsers: [...weapon.authorizedUsers, userName] }
          : weapon
      )
    );
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
              
              {/* Weapon Visual Mockup */}
              <div className="w-32 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg border-2 border-gray-500 flex items-center justify-center relative">
                <div className="w-24 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-sm"></div>
                <div className="w-6 h-4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-sm absolute right-2"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full absolute left-1"></div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  REGISTER ARMS
                </h1>
                <p className="text-gray-300 mt-2">
                  Secure weapon registration with ARVIPOA's intelligent asset protection
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
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-gray-300">Law Enforcement Certified</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="register" className="data-[state=active]:bg-cyan-600">
              Register Weapon
            </TabsTrigger>
            <TabsTrigger value="weapons" className="data-[state=active]:bg-cyan-600">
              My Weapons
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-cyan-600">
              Security Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-8">
                <form onSubmit={handleRegisterWeapon} className="space-y-6">
                  {/* License Number */}
                  <div className="text-center mb-8">
                    <Label className="text-gray-300 text-lg">LICENSE NUMBER*</Label>
                    <div className="relative mt-2">
                      <Input
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                        placeholder="0385734"
                        className="text-center text-2xl font-bold bg-slate-700 border-gray-600 text-white h-16"
                        required
                      />
                    </div>
                  </div>

                  {/* Weapon Image Placeholder */}
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-32 bg-slate-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                      <Target className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300">Weapon Class *</Label>
                      <Select value={formData.weaponClass} onValueChange={(value) => setFormData({...formData, weaponClass: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white h-12">
                          <SelectValue placeholder="Domestic" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600">
                          {weaponClasses.map((weaponClass) => (
                            <SelectItem key={weaponClass} value={weaponClass} className="text-white hover:bg-slate-600">
                              {weaponClass}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Usage Purpose *</Label>
                      <Select value={formData.usagePurpose} onValueChange={(value) => setFormData({...formData, usagePurpose: value})}>
                        <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white h-12">
                          <SelectValue placeholder="Personal use" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-gray-600">
                          <SelectItem value="Personal use" className="text-white hover:bg-slate-600">Personal use</SelectItem>
                          <SelectItem value="Security" className="text-white hover:bg-slate-600">Security</SelectItem>
                          <SelectItem value="Law Enforcement" className="text-white hover:bg-slate-600">Law Enforcement</SelectItem>
                          <SelectItem value="Sport/Competition" className="text-white hover:bg-slate-600">Sport/Competition</SelectItem>
                          <SelectItem value="Hunting" className="text-white hover:bg-slate-600">Hunting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 text-lg">MAKE</Label>
                    <Select value={formData.make} onValueChange={(value) => setFormData({...formData, make: value})}>
                      <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white h-16 text-xl">
                        <SelectValue placeholder="SMITH & WESSON" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-gray-600">
                        {weaponMakes.map((make) => (
                          <SelectItem key={make} value={make} className="text-white hover:bg-slate-600 text-lg">
                            {make.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300 text-lg">MODEL</Label>
                    <Input
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      placeholder="M&P9 SHIELD"
                      className="mt-1 bg-slate-700 border-gray-600 text-white h-16 text-xl"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Label className="text-gray-300 text-lg">SERIAL NUMBER*</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                        placeholder="JEH6739"
                        className="mt-1 bg-slate-700 border-gray-600 text-white h-16 text-xl flex-1"
                        required
                      />
                      <Button
                        type="button"
                        className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-6"
                        onClick={() => setShowAddUserModal(true)}
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        ADD USER
                      </Button>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-300">Proof of Ownership</Label>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, proofOfOwnership: e.target.files?.[0] || null})}
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Permit Document</Label>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, permitDocument: e.target.files?.[0] || null})}
                        className="mt-1 bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-xl font-bold rounded-lg"
                    >
                      REGISTER
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weapons">
            <div className="space-y-6">
              {registeredWeapons.map((weapon) => (
                <Card key={weapon.id} className="bg-slate-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                          <Target className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {weapon.make} {weapon.model}
                            </h3>
                            <Badge className={getStatusColor(weapon.status)}>
                              {weapon.status}
                            </Badge>
                            {weapon.status === 'verified' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Fingerprint className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-300">License:</span>
                              <code className="text-cyan-400 font-mono">{weapon.licenseNumber}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <QrCode className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">Serial:</span>
                              <code className="text-green-400 font-mono">{weapon.serialNumber}</code>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300">Security:</span>
                              <span className="text-purple-400">{weapon.securityFeatures.join(', ')}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-300">Authorized Users:</span>
                              <span className="text-blue-400">{weapon.authorizedUsers.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {weapon.status !== 'flagged' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => generateCertificate(weapon)}
                              className="text-green-400 border-green-400 hover:bg-green-400/10"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Certificate
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReportStolen(weapon.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/10"
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Report Stolen
                            </Button>

                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowAddUserModal(true)}
                              className="text-orange-400 border-orange-400 hover:bg-orange-400/10"
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Add User
                            </Button>

                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert('PANIC ALERT ACTIVATED! Emergency services and ARVIPOA response team have been notified. IWAMOS monitoring activated with dual camera recording.')}
                              className="text-red-500 border-red-500 hover:bg-red-500/10"
                            >
                              <Zap className="w-4 h-4 mr-1" />
                              PANIC
                            </Button>
                          </>
                        )}
                        
                        {weapon.status === 'flagged' && (
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

          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-red-500/30">
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-red-400 font-semibold mb-2">BIOMETRIC LOCK</h3>
                  <p className="text-gray-300 text-sm">Fingerprint-secured access control</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-blue-400 font-semibold mb-2">RFID TRACKING</h3>
                  <p className="text-gray-300 text-sm">Real-time location monitoring</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-400 font-semibold mb-2">SMART SAFE</h3>
                  <p className="text-gray-300 text-sm">Secure storage verification</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Camera className="w-6 h-6 text-purple-400" />
                    <Monitor className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-purple-400 font-semibold mb-2">IWAMOS MONITORING</h3>
                  <p className="text-gray-300 text-sm">Dual camera system with laser targeting and torch display</p>
                </CardContent>
              </Card>
            </div>

            {/* IWOMS Visual Interface */}
            <Card className="bg-slate-800/50 border-purple-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Monitor className="w-6 h-6 mr-2" />
                  IWAMOS - Intelligent Weapon & Arms Monitoring and Observation System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rifle Holder Camera */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-green-400" />
                      Rifle Holder Camera (Live)
                    </h4>
                    <div className="w-full h-40 bg-gradient-to-br from-slate-600 to-slate-800 rounded border-2 border-green-400 flex items-center justify-center">
                      <div className="text-green-400 text-center">
                        <Eye className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Monitoring User</p>
                        <p className="text-xs text-gray-400">Biometric: Verified</p>
                      </div>
                    </div>
                  </div>

                  {/* Target Camera */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-red-400" />
                      Target Camera (Live)
                    </h4>
                    <div className="w-full h-40 bg-gradient-to-br from-slate-600 to-slate-800 rounded border-2 border-red-400 flex items-center justify-center relative">
                      <div className="text-red-400 text-center">
                        <div className="w-16 h-16 border-2 border-red-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-sm">Laser Targeting Active</p>
                        <p className="text-xs text-gray-400">Torch: ON</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Monitor className="w-4 h-4 mr-2" />
                    View Full Interface
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-400 border-red-400 hover:bg-red-400/10"
                    onClick={() => alert('PANIC ALERT ACTIVATED! Emergency services and ARVIPOA response team have been notified. IWAMOS dual camera recording initiated.')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Emergency Panic
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Certificate Modal */}
      {showCertificateModal && selectedWeapon && (
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
                  <h3 className="text-xl font-bold text-white">{selectedWeapon.make} {selectedWeapon.model}</h3>
                  <p className="text-gray-300">License: {selectedWeapon.licenseNumber}</p>
                  <p className="text-gray-300">Serial: {selectedWeapon.serialNumber}</p>
                  <p className="text-gray-300">Tag: {selectedWeapon.licenseTag}</p>
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
                <div>
                  <Label className="text-gray-300">Relationship</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-slate-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-gray-600">
                      <SelectItem value="spouse" className="text-white hover:bg-slate-600">Spouse</SelectItem>
                      <SelectItem value="family" className="text-white hover:bg-slate-600">Family Member</SelectItem>
                      <SelectItem value="employee" className="text-white hover:bg-slate-600">Employee</SelectItem>
                      <SelectItem value="partner" className="text-white hover:bg-slate-600">Business Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
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