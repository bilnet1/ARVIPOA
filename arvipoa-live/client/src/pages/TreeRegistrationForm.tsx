import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trees, Upload, ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TreeRegistrationForm() {
  const [formData, setFormData] = useState<{
    treeType: string;
    treeName: string;
    plantedDate: string;
    ageKnown: string;
    treeSmartTagId: string;
    locationDigitalAddress: string;
    treeImages: File[];
  }>({
    treeType: '',
    treeName: '',
    plantedDate: '',
    ageKnown: 'I DON\'T KNOW',
    treeSmartTagId: '',
    locationDigitalAddress: '',
    treeImages: []
  });

  const treeTypes = [
    'Oak', 'Pine', 'Cedar', 'Maple', 'Mahogany', 'Teak', 'Bamboo', 'Palm',
    'Coconut', 'Mango', 'Avocado', 'Citrus', 'Banana', 'Cocoa', 'Coffee',
    'Rubber', 'Eucalyptus', 'Acacia', 'Baobab', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, treeImages: [...prev.treeImages, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      treeImages: prev.treeImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tree registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Trees className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Tree/Plantation Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register trees and plantation properties with ARVIPOA</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Trees className="w-6 h-6" />
              <span>Tree/Plantation Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tree Type and Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="treeType">Tree Type</Label>
                  <Select value={formData.treeType} onValueChange={(value) => handleInputChange('treeType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {treeTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="treeName">Tree Name</Label>
                  <Input
                    id="treeName"
                    value={formData.treeName}
                    onChange={(e) => handleInputChange('treeName', e.target.value)}
                    placeholder="Enter tree name or identifier"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Age/Planting Information */}
              <div>
                <Label>Planted/Age Information</Label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="ageUnknown"
                        name="ageKnown"
                        value="I DON'T KNOW"
                        checked={formData.ageKnown === "I DON'T KNOW"}
                        onChange={(e) => handleInputChange('ageKnown', e.target.value)}
                      />
                      <Label htmlFor="ageUnknown">I Don't Know</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="ageKnown"
                        name="ageKnown"
                        value="KNOWN"
                        checked={formData.ageKnown === 'KNOWN'}
                        onChange={(e) => handleInputChange('ageKnown', e.target.value)}
                      />
                      <Label htmlFor="ageKnown">Know Planting Date</Label>
                    </div>
                  </div>
                  
                  {formData.ageKnown === 'KNOWN' && (
                    <div>
                      <Label htmlFor="plantedDate">Planted Date</Label>
                      <Input
                        id="plantedDate"
                        type="date"
                        value={formData.plantedDate}
                        onChange={(e) => handleInputChange('plantedDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Smart Tag ID */}
              <div>
                <Label htmlFor="treeSmartTagId">Tree Smart Tag ID</Label>
                <Input
                  id="treeSmartTagId"
                  value={formData.treeSmartTagId}
                  onChange={(e) => handleInputChange('treeSmartTagId', e.target.value)}
                  placeholder="Enter smart tag identifier"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Unique identifier for IoT tracking and monitoring
                </p>
              </div>

              {/* Location Digital Address */}
              <div>
                <Label htmlFor="locationDigitalAddress">Tree Location Digital Address</Label>
                <div className="relative mt-1">
                  <Input
                    id="locationDigitalAddress"
                    value={formData.locationDigitalAddress}
                    onChange={(e) => handleInputChange('locationDigitalAddress', e.target.value)}
                    placeholder="Enter GPS coordinates or digital address"
                    className="pl-10"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Precise location for mapping and monitoring purposes
                </p>
              </div>

              {/* Current Images of Tree */}
              <div>
                <Label>Add Current Images of Tree</Label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Images</span>
                    </Button>
                  </div>

                  {formData.treeImages.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Uploaded Images:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.treeImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Tree image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="button" variant="outline">
                  Save & Edit Later
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Register Tree
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}