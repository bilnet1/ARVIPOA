import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, Building2, MapPin, Car, Target, Zap, TreePine, Rabbit, Home, ArrowLeft } from 'lucide-react';

// Simple Property Registration Portal
function PropertyPortal() {
  const navigate = useNavigate();
  
  const registrationOptions = [
    {
      id: 'land',
      title: 'Land Registration',
      description: 'Register land properties with Ghana GPS integration',
      icon: MapPin,
      route: '/land-form',
      color: 'bg-green-500'
    },
    {
      id: 'property',
      title: 'Property Registration', 
      description: 'Register buildings and structures',
      icon: Building2,
      route: '/property-form',
      color: 'bg-blue-500'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Registration',
      description: 'Register cars, motorcycles, and vehicles',
      icon: Car,
      route: '/vehicle-form',
      color: 'bg-purple-500'
    },
    {
      id: 'arms',
      title: 'Firearm Registration',
      description: 'Register firearms and weapons',
      icon: Target,
      route: '/arms-form',
      color: 'bg-red-500'
    },
    {
      id: 'electronics',
      title: 'Electronics Registration',
      description: 'Register electronic devices',
      icon: Zap,
      route: '/electronics-form',
      color: 'bg-yellow-500'
    },
    {
      id: 'tree',
      title: 'Tree/Plantation Registration',
      description: 'Register trees and plantations',
      icon: TreePine,
      route: '/tree-form',
      color: 'bg-emerald-500'
    },
    {
      id: 'animal',
      title: 'Animal Registration',
      description: 'Register animals, pets, and livestock',
      icon: Rabbit,
      route: '/animal-form',
      color: 'bg-orange-500'
    },
    {
      id: 'pmb',
      title: 'PMB Registration',
      description: 'Register Private Mail Bag addresses',
      icon: Home,
      route: '/pmb-form',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Property Registration Portal
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {registrationOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card key={option.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={option.route}>
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                    <Button className="w-full">Register Now</Button>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Simple Land Registration Form
function LandForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    region: '',
    district: '',
    town: '',
    titleType: '',
    gpsAddress: ''
  });

  const regions = ['Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Northern', 'Upper East', 'Upper West', 'Western', 'Volta', 'Brong Ahafo'];
  const titleTypes = ['Freehold', 'Leasehold', 'Stool Land', 'Family Land', 'Government Land'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="bg-green-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Land Registration Form
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/property-registration')}
                className="text-white border-white hover:bg-white hover:text-green-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                >
                  <option value="">Select Region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">District/Municipal</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter district/municipal"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Town/City</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter town/city"
                  value={formData.town}
                  onChange={(e) => setFormData({...formData, town: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title Type</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.titleType}
                  onChange={(e) => setFormData({...formData, titleType: e.target.value})}
                >
                  <option value="">Select Title Type</option>
                  {titleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ghana GPS Digital Address</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., GA-123-4567"
                  value={formData.gpsAddress}
                  onChange={(e) => setFormData({...formData, gpsAddress: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Register Land Property
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Arms Registration Form
function ArmsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    manufacturer: '',
    serialNumber: '',
    licenseNumber: ''
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="bg-red-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Firearm Registration Form
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/property-registration')}
                className="text-white border-white hover:bg-white hover:text-red-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Firearm Type</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="">Select Type</option>
                  <option value="pistol">Pistol</option>
                  <option value="rifle">Rifle</option>
                  <option value="shotgun">Shotgun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Manufacturer</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Serial Number</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter serial number"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">License Number</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter license number"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Register Firearm
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Homepage
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ARVIPOA</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/property-registration" className="text-gray-700 hover:text-blue-600">Property Registration</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            </div>

            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-gray-600" />
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ARVIPOA Property Management Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced property and animal management with comprehensive monitoring and registration
          </p>
          <Link to="/property-registration">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Property Registration
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Land Registration</h3>
              <p className="text-gray-600">Register land properties with Ghana GPS integration</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Firearm Registration</h3>
              <p className="text-gray-600">Secure firearm registration and licensing</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Rabbit className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Animal Registration</h3>
              <p className="text-gray-600">Register animals, pets, and livestock</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Export individual components for use in main App.tsx
export { HomePage, PropertyPortal, LandForm, ArmsForm };

export default function WorkingApp() {
  return <HomePage />;
}