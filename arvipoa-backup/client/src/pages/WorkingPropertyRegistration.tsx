import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Building2, Car, Target, Zap, TreePine, Rabbit, Home } from 'lucide-react';

// Main Property Registration Portal
export function PropertyRegistrationPortal() {
  const navigate = useNavigate();

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
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Land Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register land with Ghana GPS</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Property Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register buildings and structures</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Vehicle Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register cars and vehicles</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Firearm Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register firearms and weapons</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Electronics Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register electronic devices</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Tree/Plantation Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register trees and plantations</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Rabbit className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Animal Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register animals and livestock</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">PMB Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Register Private Mail Bag</p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/registration-hub')}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Land Registration Form
export function LandRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    region: '',
    district: '',
    town: '',
    titleType: '',
    gpsAddress: '',
    plotNumber: '',
    area: ''
  });

  const regions = ['Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Northern', 'Upper East', 'Upper West', 'Western', 'Volta', 'Brong Ahafo'];
  const titleTypes = ['Freehold', 'Leasehold', 'Stool Land', 'Family Land', 'Government Land'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Land Registration:', formData);
    alert('Land registration submitted successfully!');
    navigate('/property-registration');
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">District/Municipal</Label>
                <Input 
                  id="district"
                  type="text"
                  placeholder="Enter district/municipal"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="town">Town/City</Label>
                <Input 
                  id="town"
                  type="text"
                  placeholder="Enter town/city"
                  value={formData.town}
                  onChange={(e) => setFormData({...formData, town: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="titleType">Title Type</Label>
                <Select value={formData.titleType} onValueChange={(value) => setFormData({...formData, titleType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Title Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {titleTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gpsAddress">Ghana GPS Digital Address</Label>
                <Input 
                  id="gpsAddress"
                  type="text"
                  placeholder="e.g., GA-123-4567"
                  value={formData.gpsAddress}
                  onChange={(e) => setFormData({...formData, gpsAddress: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="plotNumber">Plot Number</Label>
                <Input 
                  id="plotNumber"
                  type="text"
                  placeholder="Enter plot number"
                  value={formData.plotNumber}
                  onChange={(e) => setFormData({...formData, plotNumber: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="area">Area (acres/hectares)</Label>
                <Input 
                  id="area"
                  type="text"
                  placeholder="Enter area"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
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

// Firearm Registration Form
export function FirearmRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    manufacturer: '',
    serialNumber: '',
    licenseNumber: '',
    color: '',
    caliber: ''
  });

  const firearmTypes = ['Pistol', 'Rifle', 'Shotgun', 'Hunting Rifle', 'Sports Rifle'];
  const colors = ['BLACK', 'BLUE', 'BROWN', 'RED', 'WHITE', 'GREY', 'SILVER', 'GOLD'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Firearm Registration:', formData);
    alert('Firearm registration submitted successfully!');
    navigate('/property-registration');
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Firearm Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {firearmTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input 
                  id="manufacturer"
                  type="text"
                  placeholder="Enter manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input 
                  id="serialNumber"
                  type="text"
                  placeholder="Enter serial number"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="caliber">Caliber</Label>
                <Input 
                  id="caliber"
                  type="text"
                  placeholder="Enter caliber"
                  value={formData.caliber}
                  onChange={(e) => setFormData({...formData, caliber: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="color">Color</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({...formData, color: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input 
                  id="licenseNumber"
                  type="text"
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