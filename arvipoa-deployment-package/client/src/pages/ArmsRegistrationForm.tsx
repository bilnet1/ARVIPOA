import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Target, Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArmsRegistrationForm() {
  const [formData, setFormData] = useState<{
    type: string;
    name: string;
    manufacturer: string;
    serialNumber: string;
    barrel: string;
    boreCalibr: string;
    buttNumber: string;
    licenseNo: string;
    issueDate: string;
    expiryDate: string;
    placeOfIssue: string;
    regionalNo: string;
    colour: string;
    iwomsId: string;
    productImage: File | null;
  }>({
    type: '',
    name: '',
    manufacturer: '',
    serialNumber: '',
    barrel: '',
    boreCalibr: '',
    buttNumber: '',
    licenseNo: '',
    issueDate: '',
    expiryDate: '',
    placeOfIssue: '',
    regionalNo: '',
    colour: '',
    iwomsId: '',
    productImage: null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, productImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arms registration data:', formData);
    // Implementation for form submission
  };

  const colours = ['BLACK', 'BLUE', 'BROWN', 'RED', 'WHITE', 'GREY'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Arms Registration Form</h1>
          </div>
          <p className="text-gray-600 mt-2">Register firearms and weapons with ARVIPOA security system</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6" />
              <span>Firearm Registration Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    placeholder="Enter firearm type"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter firearm name"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Manufacturer and Serial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                    placeholder="Enter manufacturer"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    placeholder="Enter serial number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Barrel and Bore */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="barrel">Barrel</Label>
                  <Input
                    id="barrel"
                    value={formData.barrel}
                    onChange={(e) => handleInputChange('barrel', e.target.value)}
                    placeholder="Enter barrel details"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="boreCalibr">Bore/Calibre</Label>
                  <Input
                    id="boreCalibr"
                    value={formData.boreCalibr}
                    onChange={(e) => handleInputChange('boreCalibr', e.target.value)}
                    placeholder="Enter bore/calibre"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Butt Number and License */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="buttNumber">Butt Number</Label>
                  <Input
                    id="buttNumber"
                    value={formData.buttNumber}
                    onChange={(e) => handleInputChange('buttNumber', e.target.value)}
                    placeholder="Enter butt number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNo">License Number</Label>
                  <Input
                    id="licenseNo"
                    value={formData.licenseNo}
                    onChange={(e) => handleInputChange('licenseNo', e.target.value)}
                    placeholder="Enter license number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Place and Regional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="placeOfIssue">Place of Issue</Label>
                  <Input
                    id="placeOfIssue"
                    value={formData.placeOfIssue}
                    onChange={(e) => handleInputChange('placeOfIssue', e.target.value)}
                    placeholder="Enter place of issue"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="regionalNo">Regional Number</Label>
                  <Input
                    id="regionalNo"
                    value={formData.regionalNo}
                    onChange={(e) => handleInputChange('regionalNo', e.target.value)}
                    placeholder="Enter regional number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Colour and IWOMS ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="colour">Colour</Label>
                  <Select value={formData.colour} onValueChange={(value) => handleInputChange('colour', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select colour" />
                    </SelectTrigger>
                    <SelectContent>
                      {colours.map((colour) => (
                        <SelectItem key={colour} value={colour}>
                          {colour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="iwomsId">IWOMS ID</Label>
                  <Input
                    id="iwomsId"
                    value={formData.iwomsId}
                    onChange={(e) => handleInputChange('iwomsId', e.target.value)}
                    placeholder="Enter IWOMS ID"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Product Image Upload */}
              <div>
                <Label htmlFor="productImage">Product Image Attachment</Label>
                <div className="mt-1 flex items-center space-x-4">
                  <Input
                    id="productImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </Button>
                </div>
                {formData.productImage && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {formData.productImage.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Register Firearm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}