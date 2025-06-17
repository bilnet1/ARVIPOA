import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Home, 
  Car,
  Building,
  Shield,
  Bell,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Camera,
  Upload,
  Edit,
  Save,
  Plus,
  Target,
  Award,
  CreditCard,
  FileText,
  Globe,
  Smartphone,
  Users
} from 'lucide-react';

export default function EnhancedProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+233 24 123 4567',
      dateOfBirth: '1990-05-15',
      nationality: 'Ghanaian',
      idNumber: 'GHA-123456789-0',
      address: 'East Legon, Accra, Ghana',
      occupation: 'Software Engineer',
      profileImage: null
    },
    properties: [
      {
        id: 1,
        type: 'Land',
        address: 'East Legon, Accra',
        digitalAddress: 'GM-456-7890',
        status: 'Registered'
      },
      {
        id: 2,
        type: 'Building',
        address: 'Tema Community 25',
        digitalAddress: 'GM-789-1234',
        status: 'Pending Verification'
      }
    ],
    vehicles: [
      {
        id: 1,
        type: 'Car',
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        registrationNumber: 'GR-1234-20'
      }
    ],
    notifications: {
      email: true,
      sms: true,
      push: true,
      propertyAlerts: true,
      securityAlerts: true
    }
  });

  const quickActions = [
    {
      id: 'register-property',
      title: 'Register Your Property',
      description: 'Add a new property to your portfolio',
      icon: Home,
      color: 'green',
      action: () => navigate('/registration-hub')
    },
    {
      id: 'register-vehicle',
      title: 'Register Vehicle',
      description: 'Add a new vehicle to your account',
      icon: Car,
      color: 'blue',
      action: () => navigate('/vehicle-registration')
    },
    {
      id: 'view-properties',
      title: 'My Properties',
      description: 'Manage your registered properties',
      icon: Building,
      color: 'purple',
      action: () => setActiveTab('properties')
    },
    {
      id: 'security-settings',
      title: 'Security Settings',
      description: 'Update your security preferences',
      icon: Shield,
      color: 'red',
      action: () => setActiveTab('security')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        {/* Profile Header */}
        <Card className="mb-8 border-gold bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.personalInfo.profileImage ? (
                    <img 
                      src={profileData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    profileData.personalInfo.fullName.split(' ').map(n => n[0]).join('')
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {profileData.personalInfo.fullName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {profileData.personalInfo.occupation}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {profileData.personalInfo.email}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {profileData.personalInfo.phone}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profileData.personalInfo.nationality}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 md:mt-0"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <Card 
                        key={action.id}
                        className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-${action.color}-300`}
                        onClick={action.action}
                      >
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 bg-${action.color}-100 rounded-full flex items-center justify-center`}>
                            <IconComponent className={`h-8 w-8 text-${action.color}-600`} />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Property Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    My Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profileData.properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium">{property.type}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{property.address}</div>
                        </div>
                        <Badge variant={property.status === 'Registered' ? 'default' : 'secondary'}>
                          {property.status}
                        </Badge>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/registration-hub')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Register New Property
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-600" />
                    My Vehicles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profileData.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{vehicle.registrationNumber}</div>
                        </div>
                        <Badge variant="default">Registered</Badge>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/vehicle-registration')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Register New Vehicle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.personalInfo.fullName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.personalInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.personalInfo.dateOfBirth}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={profileData.personalInfo.nationality}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      value={profileData.personalInfo.idNumber}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, idNumber: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={profileData.personalInfo.occupation}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, occupation: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profileData.personalInfo.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, address: e.target.value }
                    }))}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Properties</CardTitle>
                <Button onClick={() => navigate('/registration-hub')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Register New Property
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.properties.map((property) => (
                    <Card key={property.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <Building className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{property.type}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{property.address}</p>
                              <p className="text-sm text-blue-600">{property.digitalAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={property.status === 'Registered' ? 'default' : 'secondary'}>
                              {property.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Manage
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Password & Authentication</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Login Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'Accra, Ghana', time: '2 hours ago', current: true },
                      { device: 'Safari on iPhone', location: 'Tema, Ghana', time: '1 day ago', current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-gray-600">{session.location} • {session.time}</div>
                        </div>
                        {session.current ? (
                          <Badge variant="default">Current Session</Badge>
                        ) : (
                          <Button variant="outline" size="sm">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'sms', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
                  { key: 'push', label: 'Push Notifications', description: 'Receive browser push notifications' },
                  { key: 'propertyAlerts', label: 'Property Alerts', description: 'Alerts about your properties' },
                  { key: 'securityAlerts', label: 'Security Alerts', description: 'Security-related notifications' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{setting.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</div>
                    </div>
                    <Button
                      variant={profileData.notifications[setting.key as keyof typeof profileData.notifications] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setProfileData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          [setting.key]: !prev.notifications[setting.key as keyof typeof prev.notifications]
                        }
                      }))}
                    >
                      {profileData.notifications[setting.key as keyof typeof profileData.notifications] ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}