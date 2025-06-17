import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Target, Shield, Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const armColors = ['BLACK', 'BLUE', 'BROWN', 'RED', 'WHITE', 'GREY', 'SILVER', 'GOLD'];
const armTypes = ['Pistol', 'Rifle', 'Shotgun', 'Hunting Rifle', 'Sports Rifle'];

export default function CleanArmsRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    manufacturer: '',
    serialNumber: '',
    barrel: '',
    boreCallibre: '',
    buttNumber: '',
    licenseNo: '',
    issueDate: '',
    expiryDate: '',
    placeOfIssue: '',
    regionalNo: '',
    colour: '',
    iwomsId: '',
    productImage: null as File | null
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, productImage: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arms Registration Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6" />
                <span>Arms Registration Form</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/property-registration')}
                className="text-white border-white hover:bg-white hover:text-red-600"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">Arms Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select arms type" />
                    </SelectTrigger>
                    <SelectContent>
                      {armTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="name">Arms Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter arms name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturer">Manufacturer *</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="Enter manufacturer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="serialNumber">Serial Number *</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    placeholder="Enter serial number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="barrel">Barrel Length</Label>
                  <Input
                    id="barrel"
                    value={formData.barrel}
                    onChange={(e) => setFormData({ ...formData, barrel: e.target.value })}
                    placeholder="Enter barrel length"
                  />
                </div>

                <div>
                  <Label htmlFor="boreCallibre">Bore Calibre</Label>
                  <Input
                    id="boreCallibre"
                    value={formData.boreCallibre}
                    onChange={(e) => setFormData({ ...formData, boreCallibre: e.target.value })}
                    placeholder="Enter bore calibre"
                  />
                </div>

                <div>
                  <Label htmlFor="colour">Color *</Label>
                  <Select value={formData.colour} onValueChange={(value) => setFormData({ ...formData, colour: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {armColors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="buttNumber">Butt Number</Label>
                  <Input
                    id="buttNumber"
                    value={formData.buttNumber}
                    onChange={(e) => setFormData({ ...formData, buttNumber: e.target.value })}
                    placeholder="Enter butt number"
                  />
                </div>
              </div>

              {/* License Information */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    License Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="licenseNo">License Number *</Label>
                      <Input
                        id="licenseNo"
                        value={formData.licenseNo}
                        onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                        placeholder="Enter license number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="issueDate">Issue Date *</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="placeOfIssue">Place of Issue *</Label>
                      <Input
                        id="placeOfIssue"
                        value={formData.placeOfIssue}
                        onChange={(e) => setFormData({ ...formData, placeOfIssue: e.target.value })}
                        placeholder="Enter place of issue"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="regionalNo">Regional Number</Label>
                      <Input
                        id="regionalNo"
                        value={formData.regionalNo}
                        onChange={(e) => setFormData({ ...formData, regionalNo: e.target.value })}
                        placeholder="Enter regional number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="iwomsId">IWOMS ID</Label>
                      <Input
                        id="iwomsId"
                        value={formData.iwomsId}
                        onChange={(e) => setFormData({ ...formData, iwomsId: e.target.value })}
                        placeholder="Enter IWOMS ID"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Product Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Take Photo</span>
                    </Button>
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </Button>
                    </div>
                  </div>
                  
                  {formData.productImage && (
                    <p className="text-sm text-gray-600">
                      Selected: {formData.productImage.name}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-between">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                
                <div className="flex space-x-4">
                  <Button type="button" variant="outline">
                    Preview
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Register Arms
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