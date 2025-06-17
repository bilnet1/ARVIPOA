import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TreePine, MapPin, Camera, Upload, QrCode, FileText, User, Phone, Mail, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WorkingLandRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    houseNumber: '',
    locality: '',
    town: '',
    district: '',
    region: '',
    digitalAddress: '',
    coordinates: { lat: '', lng: '' },
    landSize: '',
    landUse: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    titleType: '',
    registrationNumber: ''
  });

  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Western', 'Central', 'Volta', 'Eastern', 
    'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo', 'Western North',
    'Ahafo', 'Bono East', 'Oti', 'North East', 'Savannah'
  ];

  const districtsByRegion: { [key: string]: string[] } = {
    'Greater Accra': ['Accra Metropolitan', 'Tema Metropolitan', 'Ga East Municipal', 'Ga West Municipal', 'Ga Central Municipal', 'Ga South Municipal', 'Adentan Municipal', 'Ashaiman Municipal', 'Ledzokuku Municipal', 'Krowor Municipal', 'La Nkwantanang Madina Municipal', 'La Dade Kotopon Municipal', 'Ablekuma North Municipal', 'Ablekuma Central Municipal', 'Ablekuma West Municipal', 'Okaikwei North Municipal', 'Ayawaso East Municipal', 'Ayawaso North Municipal', 'Ayawaso West Municipal', 'Ayawaso Central Municipal'],
    'Ashanti': ['Kumasi Metropolitan', 'Obuasi Municipal', 'Ejisu Municipal', 'Manhyia North Municipal', 'Manhyia South Municipal', 'Subin Municipal', 'Tafo Pankrono Municipal', 'Kwadaso Municipal', 'Old Tafo Municipal', 'Asokwa Municipal', 'Suame Municipal', 'Nhyiaeso Municipal', 'Bantama Municipal', 'Oforikrom Municipal', 'Asawase Municipal'],
    'Western': ['Sekondi-Takoradi Metropolitan', 'Shama Municipal', 'Ahanta West Municipal', 'Nzema East Municipal', 'Ellembelle Municipal', 'Jomoro Municipal', 'Tarkwa-Nsuaem Municipal', 'Prestea Huni-Valley Municipal', 'Wassa East Municipal', 'Wassa Amenfi East Municipal', 'Wassa Amenfi West Municipal', 'Wassa Amenfi Central Municipal', 'Aowin Municipal', 'Suaman Municipal', 'Bodi Municipal', 'Bibiani Anhwiaso Bekwai Municipal'],
    'Central': ['Cape Coast Metropolitan', 'Elmina Municipal', 'Komenda Edina Eguafo Abirem Municipal', 'Abura Asebu Kwamankese Municipal', 'Mfantsiman Municipal', 'Ajumako Enyan Esiam Municipal', 'Gomoa Central Municipal', 'Gomoa East Municipal', 'Gomoa West Municipal', 'Effutu Municipal', 'Awutu Senya East Municipal', 'Awutu Senya West Municipal', 'Agona East Municipal', 'Agona West Municipal', 'Assin Central Municipal', 'Assin North Municipal', 'Assin South Municipal', 'Twifo Atti Morkwa Municipal', 'Twifo Heman Lower Denkyira Municipal', 'Upper Denkyira East Municipal', 'Upper Denkyira West Municipal']
  };

  const townsByDistrict: { [key: string]: string[] } = {
    'Accra Metropolitan': ['Accra', 'Osu', 'Labadi', 'Cantonments', 'Airport Residential', 'East Legon', 'Labone', 'Ringway Estates'],
    'Tema Metropolitan': ['Tema', 'Sakumono', 'Lashibi', 'Michel Camp', 'Community 1', 'Community 2', 'Community 3', 'Community 4'],
    'Kumasi Metropolitan': ['Kumasi', 'Adum', 'Asafo', 'Bantama', 'Dichemso', 'Nhyiaeso', 'North Suntreso', 'Suame'],
    'Cape Coast Metropolitan': ['Cape Coast', 'Elmina', 'Moree', 'Pedu', 'Abura']
  };

  const landUseTypes = [
    'Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use', 'Institutional', 'Recreational', 'Educational', 'Religious'
  ];

  const titleTypes = [
    'Freehold', 'Leasehold', 'Customary', 'Allodial', 'Family Land', 'Stool Land', 'Skin Land', 'Government Land'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Land Registration Data:', formData);
  };

  const generateDigitalAddress = async () => {
    try {
      // Ghana GPS Digital Address Generation Integration
      const region = formData.region.substring(0, 2).toUpperCase();
      const district = formData.district.substring(0, 3).toUpperCase();
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const address = `${region}-${district}-${randomCode}`;
      
      // Simulate Ghana GPS API call (would require actual API integration)
      const ghanaGpsResponse = await fetch('https://ghgps.gov.gh/api/generate-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer GHANA_GPS_API_KEY' // Would need actual API key
        },
        body: JSON.stringify({
          coordinates: formData.coordinates,
          region: formData.region,
          district: formData.district,
          town: formData.town
        })
      }).catch(() => null);

      if (ghanaGpsResponse && ghanaGpsResponse.ok) {
        const data = await ghanaGpsResponse.json();
        handleInputChange('digitalAddress', data.digitalAddress);
      } else {
        // Fallback to local generation if Ghana GPS API unavailable
        handleInputChange('digitalAddress', address);
      }
    } catch (error) {
      // Fallback generation
      const region = formData.region.substring(0, 2).toUpperCase();
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const address = `${region}-${randomCode}-${Math.floor(Math.random() * 1000)}`;
      handleInputChange('digitalAddress', address);
    }
  };

  const getAvailableDistricts = () => {
    return formData.region ? districtsByRegion[formData.region] || [] : [];
  };

  const getAvailableTowns = () => {
    return formData.district ? townsByDistrict[formData.district] || [] : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="w-6 h-6" />
                <span>Enhanced Land Registration Form</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/property-registration')}
                className="text-white border-white hover:bg-white hover:text-green-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Property Registration
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Address Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Property Address Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Property Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter full property address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="min-h-[80px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="houseNumber">House Number *</Label>
                        <Input
                          id="houseNumber"
                          placeholder="Enter house number"
                          value={formData.houseNumber}
                          onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="locality">Locality *</Label>
                        <Input
                          id="locality"
                          placeholder="Enter locality"
                          value={formData.locality}
                          onChange={(e) => handleInputChange('locality', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="region">Region *</Label>
                        <Select value={formData.region} onValueChange={(value) => {
                          handleInputChange('region', value);
                          handleInputChange('district', ''); // Reset district when region changes
                          handleInputChange('town', ''); // Reset town when region changes
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {ghanaRegions.map((region) => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="district">Metro/Municipal/District *</Label>
                        <Select 
                          value={formData.district} 
                          onValueChange={(value) => {
                            handleInputChange('district', value);
                            handleInputChange('town', ''); // Reset town when district changes
                          }}
                          disabled={!formData.region}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDistricts().map((district) => (
                              <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="town">Town/City *</Label>
                      <Select 
                        value={formData.town} 
                        onValueChange={(value) => handleInputChange('town', value)}
                        disabled={!formData.district}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select town/city" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableTowns().map((town) => (
                            <SelectItem key={town} value={town}>{town}</SelectItem>
                          ))}
                          <SelectItem value="other">Other (Please specify in locality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="digitalAddress">Ghana GPS Digital Address</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="digitalAddress"
                          placeholder="Digital address will be generated"
                          value={formData.digitalAddress}
                          onChange={(e) => handleInputChange('digitalAddress', e.target.value)}
                        />
                        <Button type="button" onClick={generateDigitalAddress} variant="outline">
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Land Details */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TreePine className="w-5 h-5" />
                      Land Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="landSize">Land Size (Acres/Hectares) *</Label>
                      <Input
                        id="landSize"
                        placeholder="Enter land size"
                        value={formData.landSize}
                        onChange={(e) => handleInputChange('landSize', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="landUse">Land Use Type *</Label>
                      <Select value={formData.landUse} onValueChange={(value) => handleInputChange('landUse', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select land use type" />
                        </SelectTrigger>
                        <SelectContent>
                          {landUseTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="titleType">Title Type *</Label>
                      <Select value={formData.titleType} onValueChange={(value) => handleInputChange('titleType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select title type" />
                        </SelectTrigger>
                        <SelectContent>
                          {titleTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lat">Latitude</Label>
                        <Input
                          id="lat"
                          placeholder="Enter latitude"
                          value={formData.coordinates.lat}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            coordinates: { ...prev.coordinates, lat: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lng">Longitude</Label>
                        <Input
                          id="lng"
                          placeholder="Enter longitude"
                          value={formData.coordinates.lng}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            coordinates: { ...prev.coordinates, lng: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Owner Information */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Owner Full Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="Enter owner's full name"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerPhone">Owner Phone *</Label>
                      <Input
                        id="ownerPhone"
                        placeholder="Enter phone number"
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerEmail">Owner Email</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Land registration number (if applicable)"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Document Upload Section */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Upload & Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Take Photo</span>
                    </Button>
                    
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Documents</span>
                    </Button>
                    
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <QrCode className="w-4 h-4" />
                      <span>Generate QR Code</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Section */}
              <div className="flex justify-between">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                
                <div className="flex space-x-4">
                  <Button type="button" variant="outline">
                    Preview
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Register Land Property
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}