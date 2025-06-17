import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, Car, Rabbit, Beef, TreePine, Smartphone, Mail, 
  Upload, Phone, MapPin, Clock, ArrowLeft, Building2, Shield, Wifi, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationHub() {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

  const registrationTypes = [
    { id: 'land', name: 'Land/Property Registration', icon: MapPin, color: 'green' },
    { id: 'building', name: 'Building Registration', icon: Building2, color: 'blue' },
    { id: 'arms', name: 'Arms/Firearms Registration', icon: Target, color: 'red' },
    { id: 'vehicle', name: 'Vehicle/Machine Registration', icon: Car, color: 'blue' },
    { id: 'mobile', name: 'Mobile Phone Protection', icon: Smartphone, color: 'purple' },
    { id: 'animal', name: 'Animal/Pet Registration', icon: Rabbit, color: 'orange' },
    { id: 'slaughtering', name: 'Slaughtering Registration', icon: Beef, color: 'red' },
    { id: 'tree', name: 'Tree/Plantation Registration', icon: TreePine, color: 'green' },
    { id: 'electronics', name: 'Electronics Registration', icon: Smartphone, color: 'purple' },
    { id: 'pmb', name: 'PMB Registration', icon: Mail, color: 'indigo' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', { type: selectedForm, data: formData });
    alert(`${selectedForm.toUpperCase()} registration submitted successfully!`);
  };

  const renderArmsForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="weaponType">Weapon Type</Label>
          <Select value={formData.weaponType || ''} onValueChange={(value) => handleInputChange('weaponType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select weapon type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pistol">Pistol</SelectItem>
              <SelectItem value="rifle">Rifle</SelectItem>
              <SelectItem value="shotgun">Shotgun</SelectItem>
              <SelectItem value="revolver">Revolver</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer || ''}
            onChange={(e) => handleInputChange('manufacturer', e.target.value)}
            placeholder="Enter manufacturer"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber || ''}
            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
            placeholder="Enter serial number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="caliber">Caliber</Label>
          <Input
            id="caliber"
            value={formData.caliber || ''}
            onChange={(e) => handleInputChange('caliber', e.target.value)}
            placeholder="Enter caliber"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="licenseNumber">License Number</Label>
        <Input
          id="licenseNumber"
          value={formData.licenseNumber || ''}
          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
          placeholder="Enter license number"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderVehicleForm = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="transportMode">Transport Mode</Label>
        <Select value={formData.transportMode || ''} onValueChange={(value) => handleInputChange('transportMode', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select transport mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="air">Air</SelectItem>
            <SelectItem value="water">Water</SelectItem>
            <SelectItem value="rail">Rail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="vehicleMake">Vehicle Make</Label>
          <Select value={formData.vehicleMake || ''} onValueChange={(value) => handleInputChange('vehicleMake', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Input
            id="vehicleModel"
            value={formData.vehicleModel || ''}
            onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
            placeholder="Enter model"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderAnimalForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="animalName">Animal Name</Label>
          <Input
            id="animalName"
            value={formData.animalName || ''}
            onChange={(e) => handleInputChange('animalName', e.target.value)}
            placeholder="Enter animal name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="animalType">Animal Type</Label>
          <Select value={formData.animalType || ''} onValueChange={(value) => handleInputChange('animalType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select animal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="cow">Cow</SelectItem>
              <SelectItem value="goat">Goat</SelectItem>
              <SelectItem value="sheep">Sheep</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="date"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="vaccineType">Vaccine Type</Label>
          <Input
            id="vaccineType"
            value={formData.vaccineType || ''}
            onChange={(e) => handleInputChange('vaccineType', e.target.value)}
            placeholder="Enter vaccine type"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderElectronicsForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="deviceType">Device Type</Label>
          <Select value={formData.deviceType || ''} onValueChange={(value) => handleInputChange('deviceType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smartphone">Smartphone</SelectItem>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="camera">Camera</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            placeholder="Enter brand"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          value={formData.serialNumber || ''}
          onChange={(e) => handleInputChange('serialNumber', e.target.value)}
          placeholder="Enter serial number"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderTreeForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="treeType">Tree Type</Label>
          <Select value={formData.treeType || ''} onValueChange={(value) => handleInputChange('treeType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select tree type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coconut">Coconut</SelectItem>
              <SelectItem value="palm">Palm</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
              <SelectItem value="avocado">Avocado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter location"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="plantingDate">Planting Date</Label>
        <Input
          id="plantingDate"
          type="date"
          value={formData.plantingDate || ''}
          onChange={(e) => handleInputChange('plantingDate', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderPmbForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="pmbNumber">PMB Number</Label>
          <Input
            id="pmbNumber"
            value={formData.pmbNumber || ''}
            onChange={(e) => handleInputChange('pmbNumber', e.target.value)}
            placeholder="Enter PMB number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter location"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson || ''}
          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
          placeholder="Enter contact person name"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderSlaughteringForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={formData.ownerName || ''}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
            placeholder="Enter owner name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="slaughterDate">Slaughter Date</Label>
          <Input
            id="slaughterDate"
            type="datetime-local"
            value={formData.slaughterDate || ''}
            onChange={(e) => handleInputChange('slaughterDate', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="slaughterHouse">Slaughter House</Label>
        <Input
          id="slaughterHouse"
          value={formData.slaughterHouse || ''}
          onChange={(e) => handleInputChange('slaughterHouse', e.target.value)}
          placeholder="Enter slaughter house address"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="meatWeight">Meat Weight (KG)</Label>
        <Input
          id="meatWeight"
          type="number"
          value={formData.meatWeight || ''}
          onChange={(e) => handleInputChange('meatWeight', e.target.value)}
          placeholder="Enter weight in KG"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'arms': return renderArmsForm();
      case 'vehicle': return renderVehicleForm();
      case 'animal': return renderAnimalForm();
      case 'electronics': return renderElectronicsForm();
      case 'tree': return renderTreeForm();
      case 'pmb': return renderPmbForm();
      case 'slaughtering': return renderSlaughteringForm();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ARVIPOA Registration Hub</h1>
          <p className="text-gray-600 mt-2">Complete registration portal for all ARVIPOA services</p>
        </div>

        {!selectedForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200"
                  onClick={() => setSelectedForm(type.id)}
                >
                  <CardHeader className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 text-white`}>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="w-6 h-6" />
                      <span className="text-lg">{type.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600">
                      Register your {type.name.toLowerCase()} with ARVIPOA monitoring system
                    </p>
                    <Button className={`mt-4 w-full bg-${type.color}-600 hover:bg-${type.color}-700`}>
                      Start Registration
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center justify-between">
                <span>{registrationTypes.find(t => t.id === selectedForm)?.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-white hover:bg-white/10"
                  onClick={() => {
                    setSelectedForm('');
                    setFormData({});
                  }}
                >
                  Change Form
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderSelectedForm()}
                
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedForm('');
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}