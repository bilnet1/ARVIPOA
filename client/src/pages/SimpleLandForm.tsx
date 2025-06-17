import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin } from 'lucide-react';

export default function SimpleLandForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Land Registration:', formData);
    alert('Land registration submitted successfully!');
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