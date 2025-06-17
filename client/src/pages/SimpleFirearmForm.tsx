import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Target } from 'lucide-react';

export default function SimpleFirearmForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    manufacturer: '',
    serialNumber: '',
    licenseNumber: '',
    color: ''
  });

  const firearmTypes = ['Pistol', 'Rifle', 'Shotgun', 'Hunting Rifle', 'Sports Rifle'];
  const colors = ['BLACK', 'BLUE', 'BROWN', 'RED', 'WHITE', 'GREY', 'SILVER', 'GOLD'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Firearm Registration:', formData);
    alert('Firearm registration submitted successfully!');
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